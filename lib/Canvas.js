class CanvasManager {
    constructor(zIndex = 999999) {
        this.id = "sfx-overlay";
        this.zIndex = zIndex;
        this.element = null;
        this.app = null;
        this.effects = new Map();
        

        this.layerNames = ["background", "default", "foreground-bonus","subtitles"];
        this.layers = {};

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
            resizeTo: window,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            antialias: false
        });

        // 2. Initialize and stack the layers on the stage
        this.layerNames.forEach(name => {
            const layerContainer = new PIXI.Container();
            layerContainer.name = `layer-${name}`;
            this.app.stage.addChild(layerContainer);
            this.layers[name] = layerContainer;
        });

        this.app.ticker.add((ticker) => this._updateEffects(ticker));
    }

    add(key, config = {}) {
        if (this.effects.has(key)) this.remove(key);

        // 3. Determine which layer to use (defaults to 'default')
        const targetLayerName = config.layer || "default";
        const targetLayer = this.layers[targetLayerName];
        
        if (!targetLayer) {
            console.warn(`Layer "${targetLayerName}" not found. Defaulting to "default".`);
        }
        const layerToAttach = targetLayer || this.layers["default"];

        const effectContainer = new PIXI.Container();
        effectContainer.name = key;
        
        // 4. Add the effect container to the specific layer instead of the root stage
        layerToAttach.addChild(effectContainer);

        if (typeof config.setup === "function") {
            config.setup(this.app, effectContainer);
        }

        this.effects.set(key, {
            container: effectContainer,
            parentLayer: layerToAttach, // Track parent layer for clean removal
            update: config.update || null,
            duration: config.duration || 0,
            elapsed: 0,
            isClosing: false,
            closingDuration: 0,
            closingElapsed: 0
        });
    }
    get(key) {
        const effect = this.effects.get(key);
        // Returns the PIXI.Container so that other systems can directly modify its properties/children
        return effect ? effect.container : null;
    }

    close(key, closingDuration = 500) {
        const effect = this.effects.get(key);
        if (!effect || effect.isClosing) return;

        effect.isClosing = true;
        effect.closingDuration = closingDuration;
        effect.closingElapsed = 0;
    }

    closeAll(closingDuration = 500) {
        for (const key of this.effects.keys()) {
            this.close(key, closingDuration);
        }
    }

    clear() {
        const keys = Array.from(this.effects.keys());
        for (const key of keys) {
            this.remove(key);
        }
    }

    remove(key) {
        const effect = this.effects.get(key);
        if (!effect) return;

        effect.parentLayer.removeChild(effect.container);
        
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