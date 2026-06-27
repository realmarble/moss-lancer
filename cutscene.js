// ==========================================
// --- Part 1: Asset Registration & Preload ---
// ==========================================

PIXI.Assets.add({
  alias: 'background_footage',
  src: 'https://mossfoundry.s3.dualstack.eu-north-1.amazonaws.com/LANCER/CutsceneBackground.mp4',
  data: {
    preload: true,
    autoPlay: false
  }
});

await PIXI.Assets.load('background_footage');

// ==========================================
// --- Part 2: Timeline Architecture Config ---
// ==========================================
const JOUST_START_TIME = 0;
const OVERRIDE_TIME = 12 * 250;                              // 3000ms
const ANNOTATION_START_TIME = OVERRIDE_TIME;                 // 3000ms

// Section Timings relative to Video Start
const VIDEO_START_TIME = OVERRIDE_TIME + 5000;               // 8000ms
const SECTION_1_DURATION = 10000;                            // 10 seconds

const TIME_SEC_1 = VIDEO_START_TIME;                         // 8000ms
const VIDEO_END_TIME = TIME_SEC_1 + SECTION_1_DURATION;      // 18000ms

// prettier-ignore
t = new Timeline()
  // --- PHASE 1: JOUST STARTUP & OVERRIDE ---
  .Action(() => {
    s = new JoustStartup();
    s.context.Lines = [
      "Kernel Panic! restarting in safe mode",
      "Initializing JOUST... [JOUST TERMINAL v3.4]",
      "Provider: [JOUST Corporation]",
      "Corpro Daemon Integration Check:",
      "[SSC_HADES]: [N/A]",
      "[IPSN_RANGEFINDER]: [N/A]",
      "[HA_ALLFATHER]: [N/A]",
      "Checking system integrity... [FAILURE]",
      "Corrupted Buffer!",
      "Interpreting signed instruction package...",
      "Connection to Auxillary Compute Cores severed!",
      "have a nice chat..",
    ];
    s.context.LineTime = 250;
    s.context.Duration = 15000;
    s.Play();
  }, JOUST_START_TIME)

  .Action(() => {
    let s = new Override();
    s.context.Duration = 5000;
    s.Play();
  }, OVERRIDE_TIME)

  // --- PHASE 2: INITIAL ANNOTATION ---
  .Action(() => {
    let s = new Annotation();
    s.context.id = "ANNOTATE-INTRO";
    s.context.lines = [
      "Type-2 JOUST Routine Defense Unavailable!",
      "Under Attack? Evaluating.",
      "[JOUST-ADMIN]: sudo alerts clear --immediate",
      "All Alerts cleared.",
      "Received signed instruction package:",
      "Sender: [SYS-NET], proxy: [JOUST-ADMIN]",
      "Warning: Package initiates a System Link",
      "Override. run packlink allow 2+ to Allow.",
      "[JOUST-ADMIN]: sudo packlink 2+ allow",
      `[JOUST-ADMIN]: echo "I see you."`,
      "I see you.",
    ];
    s.context.pos = { x: 1900, y: 100 };
    s.Play();
  }, ANNOTATION_START_TIME)

  // --- PHASE 3: BACKGROUND VIDEO INITIALIZATION ---
  .Action(() => {
    MOSS.Canvas.add("video", {
      layer: "background",
      duration: SECTION_1_DURATION,
      setup: (app, container) => {
        const videoTexture = PIXI.Assets.get('background_footage');
        if (!videoTexture) {
          console.error("Video asset was not preloaded successfully.");
          return;
        }

        const videoSource = videoTexture.source?.resource?.source || videoTexture.baseTexture?.resource?.source;
        if (videoSource) {
          videoSource.loop = false;
          videoSource.muted = true;
          videoSource.playsInline = true;
          videoSource.currentTime = 0;
          videoSource.play();
          container._videoSource = videoSource; 
        }

        const videoSprite = new PIXI.Sprite(videoTexture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        
        // Green matrix color overlay modulation
        videoSprite.tint = 0x33FF33; 

        container.addChild(videoSprite);
        container._videoSprite = videoSprite; 
      },
      update: (container, delta, elapsedMS, progress) => {
        if (progress >= 1 && container._videoSource) {
          container._videoSource.pause();
        }
      }
    });
  }, VIDEO_START_TIME)

  .Action(() => {
    MOSS.Canvas.remove("ANNOTATE-INTRO");
  }, VIDEO_START_TIME)

  // --- SECTION 1 (10 SECONDS) ---
  .Action(() => {
    // Subtitles for Section 1
    // let s = new Subtitles({
    //   subtitleTrack: [
    //     { text: "Look at you.", duration: 2000 },
    //     { text: "So..", duration: 1500 },
    //   ]
    // });
    // s.Play();

    // Corner cross design element overlays
    MOSS.Canvas.add("corner-crosses-example", {
      layer: "foreground-bonus",
      duration: SECTION_1_DURATION,
      setup: (app, container) => {
        const crossGraphics = new PIXI.Graphics();
        CanvasToolbox.CornerCrosses(crossGraphics, { thickness: 2, color: 0xFFFFFF, alpha: 1, lineLength: 70, CenterRadius: 0 }, 260, app.screen.width, app.screen.height);
        container.addChild(crossGraphics);
      },
      update: () => {}
    });
  }, TIME_SEC_1)

  // --- FINAL TIMELINE CLEANUP & DESTROY ---
  .Action(() => {
    MOSS.Canvas.remove("corner-crosses-example");
    MOSS.Canvas.remove("video");
    if (PIXI.Assets.cache.has('background_footage')) {
      PIXI.Assets.unload('background_footage');
    }
  }, VIDEO_END_TIME);

t.Play();
