class Timeline {
  constructor() {
    this.actions = [];
    this.timeouts = [];
    this.state = {};
    this.cursor = 0;
    this._nextActionId = 0;
    this._playId = 0;
  }

  /**
   * Schedules an action to run at a specific timestamp (in milliseconds).
   * @param {Function} callback - The anonymous function to execute.
   * @param {number} timestamp - The time from start (in ms) when it should run.
   * @returns {Timeline} - Returns the instance for chaining.
   */
  Action(callback, timestamp) {
    return this._schedule(callback, timestamp, "Action");
  }

  /**
   * Schedules an action at an absolute timestamp.
   * @param {number} timestamp - The time from start (in ms) when it should run.
   * @param {Function} callback - The function to execute.
   * @returns {Timeline}
   */
  At(timestamp, callback) {
    this.cursor = this._validateTimestamp(timestamp, "At");
    return this._schedule(callback, this.cursor, "At");
  }

  /**
   * Schedules an action at the current relative cursor.
   * @param {Function} callback - The function to execute.
   * @returns {Timeline}
   */
  Do(callback) {
    return this._schedule(callback, this.cursor, "Do");
  }

  /**
   * Advances the relative scheduling cursor.
   * @param {number} ms - Milliseconds to advance.
   * @returns {Timeline}
   */
  Wait(ms) {
    this.cursor += this._validateDuration(ms, "Wait");
    return this;
  }

  /**
   * Advances the cursor, then schedules an action.
   * @param {number} ms - Milliseconds to advance.
   * @param {Function} callback - The function to execute.
   * @returns {Timeline}
   */
  After(ms, callback) {
    return this.Wait(ms).Do(callback);
  }

  /**
   * Builds a named, scene-relative section of the timeline.
   * @param {string} name - Friendly scene name used for diagnostics.
   * @param {Function} buildFn - Receives a scoped timeline builder.
   * @returns {Timeline}
   */
  Scene(name, buildFn) {
    if (typeof buildFn !== "function") {
      throw new Error("Scene requires a valid build function.");
    }

    const sceneName = typeof name === "string" && name.length ? name : "scene";
    const sceneStart = this.cursor;
    const scene = this._createSceneScope(sceneName, sceneStart);
    buildFn(scene);
    this.cursor = Math.max(this.cursor, sceneStart + scene.cursor);
    return this;
  }

  /**
   * Schedules a batch preload for Foundry audio and Pixi video assets.
   * @param {{audio?: Array<string|{src: string, push?: boolean}>, video?: Array<{alias: string, src: string, data?: object}>}} assets
   * @returns {Timeline}
   */
  Preload(assets = {}) {
    return this.Do(() => this._preloadAssets(assets));
  }

  /**
   * Schedules cleanup at the current cursor, usually after all scenes have advanced it.
   * @param {Function} callback - The cleanup function to execute.
   * @returns {Timeline}
   */
  Cleanup(callback) {
    return this._schedule(callback, this.cursor, "Cleanup");
  }

  /**
   * Starts the timeline and triggers the actions at their scheduled times.
   * @returns {Timeline} - Returns the instance for chaining.
   */
  Play() {
    // Clear any existing timeouts in case .Play() is called multiple times
    this.Stop();
    this.state = {};
    const playId = ++this._playId;

    this.actions
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp || a.id - b.id)
      .forEach((action) => {
        const timerId = setTimeout(() => {
          this.timeouts = this.timeouts.filter((id) => id !== timerId);
          if (playId !== this._playId) return;
          this._runAction(action);
        }, action.timestamp);

        this.timeouts.push(timerId);
      });

    return this;
  }

  Stop() {
    this._playId++;
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    return this;
  }

  _schedule(callback, timestamp, source) {
    if (typeof callback !== "function") {
      throw new Error(`${source} requires a valid callback function.`);
    }

    this.actions.push({
      id: this._nextActionId++,
      callback,
      timestamp: this._validateTimestamp(timestamp, source),
      source
    });
    return this;
  }

  _runAction(action) {
    try {
      const result = action.callback(this.state);
      if (result && typeof result.then === "function") {
        result.catch((error) => this._logActionError(action, error));
      }
    } catch (error) {
      this._logActionError(action, error);
    }
  }

  _logActionError(action, error) {
    console.error(
      `Timeline ${action.source} failed at ${action.timestamp}ms:`,
      error
    );
  }

  _validateTimestamp(timestamp, source) {
    if (!Number.isFinite(timestamp) || timestamp < 0) {
      throw new Error(`${source} requires a non-negative timestamp.`);
    }

    return timestamp;
  }

  _validateDuration(ms, source) {
    if (!Number.isFinite(ms) || ms < 0) {
      throw new Error(`${source} requires a non-negative duration.`);
    }

    return ms;
  }

  _createSceneScope(name, start) {
    const timeline = this;
    const scope = {
      name,
      cursor: 0,
      Do(callback) {
        timeline._schedule(callback, start + this.cursor, `Scene(${name}).Do`);
        return this;
      },
      Wait(ms) {
        this.cursor += timeline._validateDuration(ms, `Scene(${name}).Wait`);
        return this;
      },
      After(ms, callback) {
        return this.Wait(ms).Do(callback);
      },
      At(timestamp, callback) {
        this.cursor = timeline._validateTimestamp(
          timestamp,
          `Scene(${name}).At`
        );
        timeline._schedule(callback, start + this.cursor, `Scene(${name}).At`);
        return this;
      },
      Preload(assets = {}) {
        return this.Do(() => timeline._preloadAssets(assets));
      }
    };

    return scope;
  }

  async _preloadAssets(assets = {}) {
    const audio = this._normalizeAudioPreloads(assets.audio || []);
    const video = this._normalizeVideoPreloads(assets.video || []);
    const jobs = [];

    for (const entry of video) {
      PIXI.Assets.add({
        alias: entry.alias,
        src: entry.src,
        data: {
          preload: true,
          autoPlay: false,
          ...(entry.data || {})
        }
      });
      jobs.push(PIXI.Assets.load(entry.alias));
    }

    for (const entry of audio) {
      jobs.push(game.audio.preload(entry.src, entry.push));
    }

    await Promise.all(jobs);
  }

  _normalizeAudioPreloads(entries) {
    if (!Array.isArray(entries)) {
      throw new Error("Preload audio must be an array.");
    }

    return entries.map((entry) => {
      if (typeof entry === "string") {
        return { src: entry, push: true };
      }

      if (entry && typeof entry.src === "string") {
        return { src: entry.src, push: entry.push ?? true };
      }

      throw new Error("Preload audio entries require a src.");
    });
  }

  _normalizeVideoPreloads(entries) {
    if (!Array.isArray(entries)) {
      throw new Error("Preload video must be an array.");
    }

    return entries.map((entry) => {
      if (
        entry &&
        typeof entry.alias === "string" &&
        typeof entry.src === "string"
      ) {
        return entry;
      }

      throw new Error("Preload video entries require alias and src.");
    });
  }
}
