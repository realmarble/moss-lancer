class Timeline {
  constructor() {
    // Stores our scheduled actions: { callback, timestamp }
    this.actions = [];
    // Keeps track of active timeouts so we can clear them if needed
    this.timeouts = [];
  }

  /**
   * Schedules an action to run at a specific timestamp (in milliseconds).
   * @param {Function} callback - The anonymous function to execute.
   * @param {number} timestamp - The time from start (in ms) when it should run.
   * @returns {Timeline} - Returns the instance for chaining.
   */
  Action(callback, timestamp) {
    if (typeof callback !== 'function') {
      throw new Error('Action requires a valid callback function.');
    }
    this.actions.push({ callback, timestamp });
    return this;
  }

  /**
   * Starts the timeline and triggers the actions at their scheduled times.
   * @returns {Timeline} - Returns the instance for chaining.
   */
  Play() {
    // Clear any existing timeouts in case .Play() is called multiple times
    this.Stop();

    this.actions.forEach(({ callback, timestamp }) => {
      const timerId = setTimeout(() => {
        callback();
      }, timestamp);
      
      this.timeouts.push(timerId);
    });

    return this;
  }
  Stop() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    return this;
  }
}