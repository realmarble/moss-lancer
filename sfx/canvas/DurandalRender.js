class DurandalRender extends SFX {
  constructor(context = {
    Mode: "VIDEO", // VIDEO | IMAGE | DEBUG | NOISE | CANVAS
    ResolutionScale: 1,
    Source: "https://mossfoundry.s3.dualstack.eu-north-1.amazonaws.com/LANCER/badapple.mp4",
    BrightColor: 0xccff00,
    MidColor: 0x668800,
    DarkColor: 0x223300,
    BaseTextureSize: 32,
    Duration: 0
  }) {
    super(context);
  }

  async Play() {
    MOSS.Canvas.add("video-render", {
      duration: this.context.Duration,
      setup: (app, container) => {
        const TARGET_WIDTH = 120 * this.context.ResolutionScale;
        const TARGET_HEIGHT = 60 * this.context.ResolutionScale;

        // ==========================================
        // --- 2. CORE PALETTE INITIALIZATION ---
        // ==========================================
        const paletteTextures = [];
        const g = new PIXI.Graphics();

        const symbolGenerators = [
          // Index 0: Completely Empty Black Square
          () => {
            g.beginFill(0x000000);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();
          },
          // Index 1: Tiny Center Dot on a Solid Black Base
          () => {
            g.beginFill(0x000000);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();

            g.beginFill(this.context.BrightColor);
            g.drawCircle(this.context.BaseTextureSize / 2, this.context.BaseTextureSize / 2, 2.5);
            g.endFill();
          },
          // Index 2: Thin Diagonal Line
          // Index 4: 5 Bright Dots (4 Corners + 1 Center Core)
          () => {
            g.beginFill(0x000000);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();

            g.beginFill(this.context.BrightColor);
            const dotRadius = 2.5; 
            const padding = 5; 

            g.drawCircle(padding, padding, dotRadius); // Top-Left
            g.drawCircle(this.context.BaseTextureSize - padding, padding, dotRadius); // Top-Right
            g.drawCircle(padding, this.context.BaseTextureSize - padding, dotRadius); // Bottom-Left
            g.drawCircle(this.context.BaseTextureSize - padding, this.context.BaseTextureSize - padding, dotRadius); // Bottom-Right
            g.drawCircle(this.context.BaseTextureSize / 2, this.context.BaseTextureSize / 2, dotRadius); // Center
            g.endFill();
          },
          () => {
            g.lineStyle(4, this.context.MidColor);
            g.moveTo(6, this.context.BaseTextureSize - 6);
            g.lineTo(this.context.BaseTextureSize - 6, 6);
          },
          // Index 3: X-Shape with Center Core
          () => {
            g.lineStyle(3, this.context.DarkColor);
            g.moveTo(4, 4).lineTo(this.context.BaseTextureSize - 4, this.context.BaseTextureSize - 4);
            g.moveTo(this.context.BaseTextureSize - 4, 4).lineTo(4, this.context.BaseTextureSize - 4);
            g.lineStyle(0);
            g.beginFill(this.context.BrightColor);
            g.drawRect(this.context.BaseTextureSize / 2 - 4, this.context.BaseTextureSize / 2 - 4, 8, 8);
            g.endFill();
          },
          // Index 5: Sharp Outer Border with Center Core Dot
          () => {
            g.beginFill(0x000000);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();

            const strokeWidth = 2;
            g.lineStyle(strokeWidth, this.context.BrightColor);
            g.drawRect(
              strokeWidth / 2,
              strokeWidth / 2,
              this.context.BaseTextureSize - strokeWidth,
              this.context.BaseTextureSize - strokeWidth,
            );
            g.lineStyle(0);

            g.beginFill(this.context.BrightColor);
            g.drawCircle(this.context.BaseTextureSize / 2, this.context.BaseTextureSize / 2, 2.5);
            g.endFill();
          },
          // Index 6: Negative Space Outer Frame ONLY
          () => {
            g.beginFill(this.context.BrightColor);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();

            g.beginFill(0x000000);
            g.drawCircle(
              this.context.BaseTextureSize / 2,
              this.context.BaseTextureSize / 2,
              this.context.BaseTextureSize * 0.48,
            );
            g.endFill();
          },
          // Index 7: Negative Space Outer Frame WITH Core Dot
          () => {
            g.beginFill(this.context.BrightColor);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();

            g.beginFill(0x000000);
            g.drawCircle(
              this.context.BaseTextureSize / 2,
              this.context.BaseTextureSize / 2,
              this.context.BaseTextureSize * 0.48,
            );
            g.endFill();

            g.beginFill(this.context.BrightColor);
            g.drawCircle(this.context.BaseTextureSize / 2, this.context.BaseTextureSize / 2, 2.5);
            g.endFill();
          },
          // Index 8: Solid Block (Brightest)
          () => {
            g.beginFill(this.context.BrightColor);
            g.drawRect(0, 0, this.context.BaseTextureSize, this.context.BaseTextureSize);
            g.endFill();
          },
        ];

        for (let i = 0; i < symbolGenerators.length; i++) {
          g.clear();
          symbolGenerators[i]();
          const texture = app.renderer.generateTexture(g);
          paletteTextures.push(texture);
        }
        g.destroy();

        // ==========================================
        // --- 3. DISPLAY LAYER SETUP ---
        // ==========================================
        const bg = new PIXI.Graphics();
        container.addChild(bg);

        const spriteGrid = [];
        for (let y = 0; y < TARGET_HEIGHT; y++) {
          spriteGrid[y] = [];
          for (let x = 0; x < TARGET_WIDTH; x++) {
            const sprite = new PIXI.Sprite(paletteTextures[0]);
            container.addChild(sprite);
            spriteGrid[y][x] = sprite;
          }
        }

        const resizeLayout = () => {
          const w = app.screen.width, h = app.screen.height;
          bg.clear().beginFill(0x000000).drawRect(0, 0, w, h).endFill();
          for (let y = 0; y < TARGET_HEIGHT; y++) {
            for (let x = 0; x < TARGET_WIDTH; x++) {
              const s = spriteGrid[y][x];
              s.x = x * (w / TARGET_WIDTH);
              s.y = y * (h / TARGET_HEIGHT);
              s.width = w / TARGET_WIDTH;
              s.height = h / TARGET_HEIGHT;
            }
          }
        };
        resizeLayout();
        window.addEventListener("resize", resizeLayout);

        // ==========================================
        // --- 4. INTERNAL PROCESSING ENVIRONMENT ---
        // ==========================================
        const processingCanvas = document.createElement("canvas");
        processingCanvas.width = TARGET_WIDTH;
        processingCanvas.height = TARGET_HEIGHT;
        const ctx = processingCanvas.getContext("2d", { willReadFrequently: true });

        let generatedVideoElement = null;
        if (this.context.Source && this.context.Mode === "VIDEO") {
          generatedVideoElement = document.createElement("video");
          generatedVideoElement.src = this.context.Source;
          generatedVideoElement.crossOrigin = "anonymous";
          generatedVideoElement.loop = true;
          generatedVideoElement.volume = 0.1;
          generatedVideoElement.playsInline = true;
          generatedVideoElement.muted = false;
          generatedVideoElement.autoplay = true;
          generatedVideoElement.style.display = "none";
          document.body.appendChild(generatedVideoElement);

          generatedVideoElement.play().catch((err) => 
            console.warn("Internal autoplay deferred:", err)
          );
        }

        // Initialize Image Source Mode environment
        let generatedImageElement = null;
        if (this.context.Source && this.context.Mode === "IMAGE") {
          generatedImageElement = new Image();
          generatedImageElement.crossOrigin = "anonymous";
          generatedImageElement.src = this.context.Source;
        }

        // Setup plug-and-play noise formula template
        const baseNoiseFn = (x, y, time) => {
          return Math.sin(x * 0.15 + time) * Math.cos(y * 0.15 + time);
        };

        container._matrixState = {
          mode: this.context.Mode,
          ctx,
          TARGET_WIDTH,
          TARGET_HEIGHT,
          paletteTextures,
          spriteGrid,
          VideoSource: generatedVideoElement,
          ImageSource: generatedImageElement,
          externalCanvas: null, 
          noiseFn: baseNoiseFn,
          internalTime: 0,
        };
      },

      update: (container, delta, elapsedMS, progress) => {
        const state = container._matrixState;
        if (!state) return;

        const {
          ctx,
          TARGET_WIDTH,
          TARGET_HEIGHT,
          paletteTextures,
          spriteGrid,
          mode,
        } = state;
        state.internalTime += elapsedMS * 0.001;

        // ==========================================
        // STAGE 1: INPUT MODULAR PROCESSING SWITCH
        // ==========================================
        switch (mode) {
          case "DEBUG": {
            const imgData = ctx.createImageData(TARGET_WIDTH, TARGET_HEIGHT);
            const data = imgData.data;
            const barWidth = TARGET_WIDTH / paletteTextures.length;

            for (let y = 0; y < TARGET_HEIGHT; y++) {
              for (let x = 0; x < TARGET_WIDTH; x++) {
                const currentBar = Math.floor(x / barWidth);
                const grayVal = Math.ceil((currentBar / (paletteTextures.length - 1)) * 255);

                const idx = (y * TARGET_WIDTH + x) * 4;
                data[idx] = data[idx + 1] = data[idx + 2] = grayVal;
                data[idx + 3] = 255;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            break;
          }

          case "VIDEO": {
            if (
              state.VideoSource &&
              !state.VideoSource.paused &&
              state.VideoSource.readyState >= 2
            ) {
              ctx.drawImage(state.VideoSource, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
            }
            break;
          }

          case "IMAGE": {
            if (state.ImageSource && state.ImageSource.complete) {
              ctx.drawImage(state.ImageSource, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
            }
            break;
          }

          case "NOISE": {
            if (!state.noiseFn) break;
            const imgData = ctx.createImageData(TARGET_WIDTH, TARGET_HEIGHT);
            const data = imgData.data;
            for (let y = 0; y < TARGET_HEIGHT; y++) {
              for (let x = 0; x < TARGET_WIDTH; x++) {
                let rawVal = state.noiseFn(x, y, state.internalTime);
                let normVal = (rawVal + 1) / 2;
                let finalBright = Math.max(0, Math.min(255, Math.floor(normVal * 255)));

                const idx = (y * TARGET_WIDTH + x) * 4;
                data[idx] = data[idx + 1] = data[idx + 2] = finalBright;
                data[idx + 3] = 255;
              }
            }
            ctx.putImageData(imgData, 0, 0);
            break;
          }

          case "CANVAS": {
            if (state.externalCanvas) {
              ctx.drawImage(state.externalCanvas, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
            }
            break;
          }
        }

        // ==========================================
        // STAGE 2: ADAPTIVE TEXTURE RENDERING
        // ==========================================
        const frameData = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT).data;

        for (let y = 0; y < TARGET_HEIGHT; y++) {
          for (let x = 0; x < TARGET_WIDTH; x++) {
            const index = (y * TARGET_WIDTH + x) * 4;
            const r = frameData[index];
            const g = frameData[index + 1];
            const b = frameData[index + 2];

            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            const textureIndex = Math.floor((gray / 255) * (paletteTextures.length - 1));

            spriteGrid[y][x].texture = paletteTextures[textureIndex];
          }
        }
      },
    });
  }

  async Clear() {
    MOSS.Canvas.remove("video-render");
  }
}
DurandalRender.register();