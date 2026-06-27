 
// MOSS.Canvas.add("example", {
//     duration: 0, 
//     setup: (app, container) => {},
//     update: (container, delta, elapsedMS, progress) => {}
// });   

MOSS.Canvas.add("terminal-read",{
    duration: 0, // 0 means it stays alive indefinitely (or until manual .close())
    
    // Setup initializes any structural variables we need to track
    setup: (app, container) => {
        // The complete script we want to display
        container.fullLines = [
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
            "I see you."
        ];
        container.msPerLine = 150; // How long to wait before showing the next line
        container.totalElapsed = 0; 
        container.lastVisibleCount = 0; 
    },

    // The update loop hooks into Pixi's ticker via your CanvasManager
    update: (container, delta, elapsedMS, progress) => {
        // 1. Accumulate total runtime for this effect
        container.totalElapsed += elapsedMS;

        // 2. Calculate how many lines should be revealed by now
        const linesToReveal = Math.floor(container.totalElapsed / container.msPerLine);
        // Clamp it so it doesn't exceed our total line array length
        const visibleCount = Math.min(linesToReveal + 1, container.fullLines.length);

        // 3. Only redraw if a new line has actually crossed the threshold
        if (visibleCount !== container.lastVisibleCount) {
            container.lastVisibleCount = visibleCount;

            // Clear the previous frame's text objects to prevent overlapping text layers
            container.removeChildren();

            // Slice our full array down to only the currently unlocked lines
            const currentActiveLines = container.fullLines.slice(0, visibleCount);

            // 4. Pass the subset into your existing toolbox method!
            CanvasToolbox.Annotate(
                container, 
                { x: 1700, y: 100 }, 
                "down-right", 
                currentActiveLines, 
                {
                    align: "right",
                    lineSpacing: 0,
                    style: { fontFamily: "PP Fraktion Mono", fill: 0xccff00, fontSize: 8 }
                }
            );
        }
    }
})

MOSS.Canvas.add("corner-crosses-example", {
    duration: 0, 
    setup: (app, container) => {
        // 1. Get the screen dimensions directly from the Pixi app
        const screenWidth = app.screen.width;
        const screenHeight = app.screen.height;

        // 2. Define your styling context
        const crossStyle = {
            thickness: 2,
            color: 0xFFFFFF,
            alpha: 1,
            lineLength: 60,         // Size of cross arms
            CenterRadius: 0   // Center dot radius
        };

        const distanceFromCorners = 200;

        // 3. Create a single graphics object for performance batching
        const crossGraphics = new PIXI.Graphics();

        // 4. Call your static toolbox method to draw all 4 crosses
        // (Assuming these methods live on a class named "Toolbox")
        CanvasToolbox.CornerCrosses(
            crossGraphics, 
            crossStyle, 
            distanceFromCorners, 
            screenWidth, 
            screenHeight
        );

        // 5. Add the finished graphics object to the container so it renders
        container.addChild(crossGraphics);
    },
    update: (container, delta, elapsedMS, progress) => {
        // Left blank since the crosses are static and don't need to animate
    }
});

MOSS.Canvas.add("video", {
    duration: 0, 
    setup: (app, container) => {
        // 1. Create a Pixi texture directly from a video file URL
        const videoTexture = PIXI.Texture.from("path/to/your/effect.mp4");
        const videoSource = videoTexture.baseTexture.resource.source;
        videoSource.loop = false;
        videoSource.muted = true;
        videoSource.playsInline = true;
        const videoSprite = new PIXI.Sprite(videoTexture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        //videoSprite.blendMode = PIXI.BLEND_MODES.ADD; 
        //videoSprite.alpha = 0.8;
        container.addChild(videoSprite);
    },
    update: (container, delta, elapsedMS, progress) => {}
});