// MOSS.Canvas.add("tracker-crosshairs", {
//     duration: 0, // 0 = Runs permanently until explicitly removed
//     setup: (app, container) => {
//         const w = app.screen.width;
//         const h = app.screen.height;
//         const inset = 80;       // Distance from the screen edges
//         const lineLength = 45;  // Length of each crosshair line
//         const thickness = 2;    // Thickness of the lines
//         const color = 0x000000; // White overlay elements (Change to 0x00FF00 for green)
//         const alpha = 1;     // Opacity of the HUD elements

//         const graphics = new PIXI.Graphics();
//         console.log(graphics);
//         graphics.lineStyle(thickness, color, alpha);

//         // Define the target center points for the four corners
//         const positions = [
//             { x: inset, y: inset },         // Top-Left
//             { x: w - inset, y: inset },     // Top-Right
//             { x: inset, y: h - inset },     // Bottom-Left
//             { x: w - inset, y: h - inset }  // Bottom-Right
//         ];

//         // Draw each crosshair
//         positions.forEach(pos => {
//             CanvasToolbox.Cross(graphics, { thickness, color, alpha, lineLength }, pos);
//         });

//         container.addChild(graphics);
        
//         // Optional: Save crosshair reference for animations in the update block
//         container.hudGraphics = graphics;
//     },
//     update: (container, delta, elapsedMS) => {}
// });

MOSS.Canvas.add("complete-override", {
    duration: 0, // Runs permanently until explicitly removed
    
    setup: (app, container) => {
        const uiColor = 0xFFFF00; // Cyberpunk Yellow
        const textColor = 0x000000; // Black Text / Lines
        const targetFont = "PP Fraktion Mono";
        
        container.runningTime = 0;
        container.targetWidth = 1000;  // Upscaled window width
        container.targetHeight = 420;  // Upscaled window height
        
        // Center the component on screen canvas
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // 1. Structural Graphics layer for solid backgrounds and tabs
        container.frameGraphics = new PIXI.Graphics();
        container.addChild(container.frameGraphics);

        // 2. Telemetry Text Labels with expanded font profiles
        
        // D-777: Prominent upscaled yellow profile above the top-left tab baseline
        const d777Style = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 44,
            fontWeight: "bold",
            fill: uiColor,
            lineHeight: 48
        });
        container.d777Text = new PIXI.Text("D-777", d777Style);
        container.d777Text.anchor.set(0, 1); 
        container.d777Text.x = -container.targetWidth / 2 + 80; 
        container.d777Text.y = -container.targetHeight / 2 - 8; 
        container.d777Text.visible = false;
        container.addChild(container.d777Text);

        // ESTEP: Standardized to perfectly match the right telemetry block
        const estepStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 24,
            fontWeight: "bold",
            fill: textColor,
            lineHeight: 28
        });
        container.estepText = new PIXI.Text("ESTEP", estepStyle);
        container.estepText.anchor.set(0, 0);
        container.estepText.x = -container.targetWidth / 2 + 35; 
        container.estepText.y = -container.targetHeight / 2 + 30; 
        container.estepText.visible = false;
        container.addChild(container.estepText);

        // Center Top Text: "全覆蓋" bold center viewport sub-header
        const centerTextStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 38,
            fontWeight: "bold",
            fill: textColor,
            letterSpacing: 6
        });
        container.topCenterText = new PIXI.Text("全覆蓋", centerTextStyle);
        container.topCenterText.anchor.set(0.5, 0);
        container.topCenterText.x = 0;
        container.topCenterText.y = -container.targetHeight / 2 + 30;
        container.topCenterText.visible = false;
        container.addChild(container.topCenterText);

        // Right Telemetry Block: Equalized size matching ESTEP sequence
        const topRightStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 24,
            fontWeight: "bold",
            fill: textColor,
            lineHeight: 28,
            align: "right"
        });
        container.topRightText = new PIXI.Text("LIMITER OFF\nMARATHON ACCESS\nCOMPLY (non) PH-33", topRightStyle);
        container.topRightText.x = container.targetWidth / 2 - 35;
        container.topRightText.y = -container.targetHeight / 2 + 30;
        container.topRightText.anchor.set(1, 0); 
        container.topRightText.visible = false;
        container.addChild(container.topRightText);

        // 3. Central Intro Typing Text ("全覆蓋")
        const introStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 240,
            fontWeight: "bold",
            fill: textColor,
            letterSpacing: 16
        });
        container.introText = new PIXI.Text("", introStyle);
        container.introText.anchor.set(0.5);
        container.introText.visible = false;
        container.addChild(container.introText);

        // 4. Scrolling Mask System
        container.textMask = new PIXI.Graphics();
        container.addChild(container.textMask);

        // 5. Container for hidden scrolling elements
        container.scrollContainer = new PIXI.Container();
        container.scrollContainer.mask = container.textMask;
        container.addChild(container.scrollContainer);

        // 6. Setup Marquee Elements
        const scrollStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 240,
            fontWeight: "bold",
            fill: textColor,
            letterSpacing: 14
        });

        // Tightly spaced token string to eliminate large void tracking delays
        const baseString = "OVERRIDE  "; 
        const metricText = new PIXI.Text(baseString, scrollStyle);
        container.textWidth = metricText.width;
        metricText.destroy(); 

        // Allocate elements seamlessly with clean array positioning bounds
        container.amountNeeded = Math.ceil(container.targetWidth / container.textWidth) + 2;
        container.scrollingTexts = [];

        for (let i = 0; i < container.amountNeeded; i++) {
            const text = new PIXI.Text(baseString, scrollStyle);
            text.anchor.set(0, 0.5);
            text.y = 50; 
            text.x = (-container.targetWidth / 2) + (i * container.textWidth);
            text.visible = false;
            
            container.scrollContainer.addChild(text);
            container.scrollingTexts.push(text);
        }
    },
    
    update: (container, delta, elapsedMS) => {
        const uiColor = 0xFFFF00;
        const textColor = 0x000000;
        
        container.runningTime += elapsedMS;
        const currentTime = container.runningTime;
        
        // --- TIMELINE STATE MACHINE MILESTONES ---
        const tHorizontalDone = 200; // Explodes open linearly
        const tTabsDone = 350;       // Tabs pop out fast 150ms later
        const tIntroDone = 1750;     // Chinese typing layout finished

        let currentWidth = 0;
        let currentHeight = container.targetHeight; 
        let vProtrude = 0; 
        const hProtrude = 0; 

        // Expanded tab metrics
        const tabW = 65;
        const tabH = 65;
        const maxProtrude = 65;

        // --- PHASE 1: Explosive Linear Expansion to Abrupt Stop ---
        if (currentTime <= tHorizontalDone) {
            const progress = currentTime / tHorizontalDone;
            currentWidth = container.targetWidth * progress;
            vProtrude = 0; 
        } 
        // --- PHASE 2: Fast Tab Protrusion Outwards ---
        else if (currentTime <= tTabsDone) {
            currentWidth = container.targetWidth;
            const progress = (currentTime - tHorizontalDone) / (tTabsDone - tHorizontalDone);
            vProtrude = maxProtrude * progress; 
        }
        // --- PHASE 3 & 4: Fully Open UI Architecture ---
        else {
            currentWidth = container.targetWidth;
            vProtrude = maxProtrude; 
        }

        // --- RENDER SOLID UI MODULE MATRIX ---
        const g = container.frameGraphics;
        g.clear();
        
        // STEP 1: Draw the expanded outer corner tabs FIRST
        if (currentTime > tHorizontalDone) {
            const configurations = [
                { x: -currentWidth / 2 - hProtrude,         y: -currentHeight / 2 - vProtrude },                  // Top-Left
                { x: currentWidth / 2 + hProtrude - tabW,   y: -currentHeight / 2 - vProtrude },                  // Top-Right
                { x: -currentWidth / 2 - hProtrude,         y: currentHeight / 2 + vProtrude - tabH },            // Bottom-Left
                { x: currentWidth / 2 + hProtrude - tabW,   y: currentHeight / 2 + vProtrude - tabH }             // Bottom-Right
            ];

            configurations.forEach(cfg => {
                g.lineStyle(0);
                g.beginFill(uiColor, 1);
                g.drawRect(cfg.x, cfg.y, tabW, tabH);
                g.endFill();

                const centerPos = { x: cfg.x + tabW / 2, y: cfg.y + tabH / 2 };
                const crossCtx = {
                    thickness: 2.5,
                    color: textColor,
                    alpha: 1,
                    lineLength: 32.5
                };
                CanvasToolbox.Cross(g, crossCtx, centerPos);
            });
        }

        // STEP 2: Draw Main Box filled with solid yellow SECOND
        g.lineStyle(0);
        g.beginFill(uiColor, 1);
        g.drawRect(-currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight);
        g.endFill();

        // STEP 3: Draw Decorative Corner Anchor Units
        if (currentWidth > 0) {
            const anchorSize = 20;     
            const circleRadius = 4.5;   
            const corners = [
                { x: -currentWidth / 2 + anchorSize / 2, y: -currentHeight / 2 + anchorSize / 2 }, 
                { x: currentWidth / 2 - anchorSize / 2,  y: -currentHeight / 2 + anchorSize / 2 }, 
                { x: -currentWidth / 2 + anchorSize / 2, y: currentHeight / 2 - anchorSize / 2 },  
                { x: currentWidth / 2 - anchorSize / 2,  y: currentHeight / 2 - anchorSize / 2 }   
            ];

            corners.forEach(pos => {
                g.lineStyle(0);
                g.beginFill(textColor, 1);
                g.drawRect(pos.x - anchorSize / 2, pos.y - anchorSize / 2, anchorSize, anchorSize);
                g.endFill();

                g.beginFill(uiColor, 1);
                g.drawCircle(pos.x, pos.y, circleRadius);
                g.endFill();
            });
        }

        container.textMask.clear();
        container.textMask.beginFill(0xffffff);
        container.textMask.drawRect(-currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight);

        // --- DYNAMIC TEXT TIMELINE ENGINE ---
        
        // 1. Outside Elements: D-777 Timeline Profile
        if (currentTime <= tTabsDone) {
            container.d777Text.visible = false;
        } 
        else if (currentTime > tTabsDone && currentTime <= tTabsDone + 375) {
            container.d777Text.visible = Math.random() > 0.35;
        } 
        else {
            container.d777Text.visible = true;
        }

        // 2. Inside Elements: ESTEP, Center Top, Right Matrix Block
        if (currentTime <= tIntroDone) {
            container.estepText.visible = false;
            container.topCenterText.visible = false;
            container.topRightText.visible = false;
        } 
        else {
            container.estepText.visible = true;
            container.topCenterText.visible = true;
            container.topRightText.visible = true;
        }

        // 3. Center Intro Typing Text ("全覆蓋") Sequential Timing
        if (currentTime > tTabsDone && currentTime <= tIntroDone) {
            container.introText.visible = true;

            const typeProgress = currentTime - tTabsDone;
            if (typeProgress < 400) {
                container.introText.text = "全";
            } else if (typeProgress < 800) {
                container.introText.text = "全覆";
            } else if (typeProgress < 1200) {
                container.introText.text = "全覆蓋";
            } else {
                container.introText.text = Math.random() > 0.35 ? "全覆蓋" : "";
            }
        } 
        else {
            container.introText.visible = false; 
        }

        // 4. Horizontal Seamless Marquee Execution
        if (currentTime > tIntroDone) {
            const scrollSpeed = 8;
            const totalWidth = container.amountNeeded * container.textWidth;
            const leftBoundary = -container.targetWidth / 2 - container.textWidth;
            
            container.scrollingTexts.forEach(text => {
                text.visible = true;
                text.x -= scrollSpeed * delta;

                // Absolute modulo shift wrap prevents any gaps from forming during frame execution drops
                if (text.x <= leftBoundary) {
                    text.x += totalWidth;
                }
            });
        } else {
            container.scrollingTexts.forEach(text => text.visible = false);
        }
    }
});