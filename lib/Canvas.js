class CanvasManager {
    constructor(zIndex = 999999) {
        this.id = "sfx-overlay";
        this.zIndex = zIndex;
        this.element = null;
        this.app = null;
        this.effects = new Map();

        this._initCanvas();
    }

    _initCanvas() {
        if (document.getElementById(this.id)) return;
        this.element = document.createElement("canvas");
        this.element.id = this.id;
        
        Object.assign(this.element.style, {
            position: "fixed",
            top: "0", left: "0",
            width: "100vw", height: "100vh",
            zIndex: this.zIndex.toString(),
            pointerEvents: "none",
            display: "block"
        });
        
        document.body.appendChild(this.element);

        this.app = new PIXI.Application({
            view: this.element,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundAlpha: 0,
            resizeTo: window
        });

        this.app.ticker.add((ticker) => this._updateEffects(ticker));
    }

    add(key, config = {}) {
        if (this.effects.has(key)) this.remove(key);

        const effectContainer = new PIXI.Container();
        effectContainer.name = key;
        this.app.stage.addChild(effectContainer);

        if (typeof config.setup === "function") {
            config.setup(this.app, effectContainer);
        }

        this.effects.set(key, {
            container: effectContainer,
            update: config.update || null,
            duration: config.duration || 0,
            elapsed: 0,
            isClosing: false,
            closingDuration: 0,
            closingElapsed: 0
        });
    }

    close(key, closingDuration = 500) {
        const effect = this.effects.get(key);
        if (!effect || effect.isClosing) return;

        effect.isClosing = true;
        effect.closingDuration = closingDuration;
        effect.closingElapsed = 0;
    }

    /**
     * Triggers the closing animation for all active effects.
     * @param {number} [closingDuration=500] - Duration for the animations.
     */
    closeAll(closingDuration = 500) {
        for (const key of this.effects.keys()) {
            this.close(key, closingDuration);
        }
    }

    /**
     * Immediately removes all active effects without playing closing animations.
     */
    clear() {
        const keys = Array.from(this.effects.keys());
        for (const key of keys) {
            this.remove(key);
        }
    }

    remove(key) {
        const effect = this.effects.get(key);
        if (!effect) return;

        this.app.stage.removeChild(effect.container);
        
        if (typeof effect.container.destroy === "function") {
            try {
                effect.container.destroy({ children: true, texture: true, baseTexture: true, style: true });
            } catch(e) {
                effect.container.destroy(true);
            }
        }
        this.effects.delete(key);
    }

    _updateEffects(ticker) {
        const delta = typeof ticker === "number" ? ticker : ticker.deltaTime;
        const elapsedMS = this.app.ticker.elapsedMS;

        for (const [key, effect] of this.effects.entries()) {
            if (effect.isClosing) {
                effect.closingElapsed += elapsedMS;
                const progress = Math.min(effect.closingElapsed / effect.closingDuration, 1);
                
                if (effect.update) {
                    effect.update(effect.container, delta, elapsedMS, progress);
                }

                if (effect.closingElapsed >= effect.closingDuration) {
                    this.remove(key);
                }
                continue;
            }

            if (effect.update) {
                effect.update(effect.container, delta, elapsedMS, 0);
            }

            if (effect.duration > 0) {
                effect.elapsed += elapsedMS;
                if (effect.elapsed >= effect.duration) {
                    this.close(key, 500);
                }
            }
        }
    }
}

Hooks.once("ready", () => { MOSS.Canvas = new CanvasManager() });