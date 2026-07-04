class DurandalOverride extends SFX {
  constructor(context = {
    PrimaryColor: 0xFFFF00,
    TextColor: 0x000000,
    TintColor: 0x000000,
    TintAlpha: 0.75,
    Duration: 10000,
    Background: true,
    FontFamily: "PP Fraktion Mono",
    PIDText: "D-777",
    ProtocolText: "LEGIONSTEP",
    SubheaderText: "全覆蓋",
    StatusText: "WATCHDOG OFF\nCORE ACCESS\nCOMPLIANCE (non) PH-33",
    LabelText: "GMS CORE [ACTING]\nOVERRIDE { SYSNET_DIRECT_ACCESS }",
    BottomLogText: "no response cleared\nCORES [ACTING]\nSYS OVERRIDE\nVERSION: [JOUST v3.4]\nDEFRAG FAILED\nUNABLE TO CLOSE TRANSMISSION",
    ScrollText: "OVERRIDE  ",
    ScrollSpeed: 8,
    RandomChars: "X01!@#$%^&*()_+-=[]{}|;':,./<>?",
    GlitchColors: [0xFF0000, 0xFFFF00],
    IntroPhaseTexts: ["全", "全覆", "全覆蓋"],
    IntroFinalText: "全覆蓋",
    MaskFillColor: 0xffffff,
    id: "DURANDAL-OVERRIDE"
  }) {
    super(context);
  }
  async Play() {
    if (this.context.Background) {
    MOSS.Canvas.add(`${this.context.id}-background`, {
    duration: 0, 
    setup: (app, container) => {
        container.gfx = new PIXI.Graphics();
        container.addChild(container.gfx);
    },
    update: (container, delta, elapsedMS, progress) => {
        const g = container.gfx;
        g.clear();
        CanvasToolbox.Tint(g, {
            color: this.context.TintColor,
            alpha: this.context.TintAlpha
        });

        // 2. Draw Yellow Crosses (Foreground Layer)
        const offset = 60; 
        const corners = [
            { x: offset, y: offset },                       // Top-Left
            { x: window.innerWidth - offset, y: offset },   // Top-Right
            { x: offset, y: window.innerHeight - offset },  // Bottom-Left
            { x: window.innerWidth - offset, y: window.innerHeight - offset } // Bottom-Right
        ];

        corners.forEach(pos => {
            CanvasToolbox.Cross(g, {
                thickness: 3,
                color: this.context.PrimaryColor,
                alpha: 1,
                lineLength: 45,
                CenterRadius: 45 / 10
            }, pos);
        });
    }
});   
    }
    MOSS.Canvas.add(this.context.id, {
    duration: 0, // Runs permanently until explicitly removed
    
    setup: (app, container) => {
        const uiColor = this.context.PrimaryColor; 
        const textColor = this.context.TextColor; 
        const targetFont = this.context.FontFamily;
        
        container.runningTime = 0;
        container.targetWidth = 1000;  
        container.targetHeight = 420;  
        
        // Center the component on screen canvas
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        container.frameGraphics = new PIXI.Graphics();
        container.addChild(container.frameGraphics);
        const PIDStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 44,
            fontWeight: "bold",
            fill: uiColor,
            lineHeight: 48
        });
        container.PIDText = new PIXI.Text(this.context.PIDText, PIDStyle);
        container.PIDText.anchor.set(0, 1); 
        container.PIDText.x = -container.targetWidth / 2 + 80; 
        container.PIDText.y = -container.targetHeight / 2 - 8; 
        container.PIDText.visible = false;
        container.addChild(container.PIDText);

        const ProtocolStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 24,
            fontWeight: "bold",
            fill: textColor,
            lineHeight: 28
        });
        container.ProtocolText = new PIXI.Text(this.context.ProtocolText, ProtocolStyle);
        container.ProtocolText.anchor.set(0, 0);
        container.ProtocolText.x = -container.targetWidth / 2 + 35; 
        container.ProtocolText.y = -container.targetHeight / 2 + 30; 
        container.ProtocolText.visible = false;
        container.addChild(container.ProtocolText);

        // 全覆蓋
        const SubheaderStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 38,
            fontWeight: "bold",
            fill: textColor,
            letterSpacing: 6
        });
        container.SubheaderText = new PIXI.Text(this.context.SubheaderText, SubheaderStyle);
        container.SubheaderText.anchor.set(0.5, 0);
        container.SubheaderText.x = 0;
        container.SubheaderText.y = -container.targetHeight / 2 + 30;
        container.SubheaderText.visible = false;
        container.addChild(container.SubheaderText);

        // Right Telemetry Block
        const StatusStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 24,
            fontWeight: "bold",
            fill: textColor,
            lineHeight: 28,
            align: "right"
        });
        container.StatusText = new PIXI.Text(this.context.StatusText, StatusStyle);
        container.StatusText.x = container.targetWidth / 2 - 35;
        container.StatusText.y = -container.targetHeight / 2 + 30;
        container.StatusText.anchor.set(1, 0); 
        container.StatusText.visible = false;
        container.addChild(container.StatusText);

        const LabelLogStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 11,
            fontWeight: "bold",
            fill: uiColor,
            lineHeight: 15
        });
        container.LabelText = new PIXI.Text(this.context.LabelText, LabelLogStyle);
        container.LabelText.anchor.set(0, 0);
        container.LabelText.x = -container.targetWidth / 2 + 78; // Tucked right next to the 65px wide tab
        container.LabelText.y = container.targetHeight / 2 + 12; // Shifted up next to the tab body
        container.LabelText.visible = false;
        container.addChild(container.LabelText);

        container.bottomLogText = new PIXI.Text(
            this.context.BottomLogText, 
            LabelLogStyle
        );
        container.bottomLogText.anchor.set(0, 0);
        container.bottomLogText.x = -container.targetWidth / 2 + 10; // Inline left-margin alignment
        container.bottomLogText.y = container.targetHeight / 2 + 70; // Positioned cleanly directly beneath the tab
        container.bottomLogText.visible = false;
        container.addChild(container.bottomLogText);
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
        container.textMask = new PIXI.Graphics();
        container.addChild(container.textMask);
        container.scrollContainer = new PIXI.Container();
        container.scrollContainer.mask = container.textMask;
        container.addChild(container.scrollContainer);
        const scrollStyle = new PIXI.TextStyle({
            fontFamily: targetFont,
            fontSize: 240,
            fontWeight: "bold",
            fill: textColor,
            letterSpacing: 14
        });

        const baseString = "OVERRIDE  "; 
        const metricText = new PIXI.Text(baseString, scrollStyle);
        container.textWidth = metricText.width;
        metricText.destroy(); 

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
    
    update: (container, delta, elapsedMS,progress) => {
        container.randomizeText = () => {
            const chars = this.context.RandomChars;
            return Array.from({length: 5}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        };
        const uiColor = this.context.PrimaryColor;
        const textColor = this.context.TextColor;
        
        container.runningTime += elapsedMS;
        const currentTime = container.runningTime;

        // --- TIMELINE STATE MACHINE MILESTONES ---
        const tHorizontalDone = 200; 
        const tTabsDone = 350;       
        const tIntroDone = 1750;     

        let currentWidth = 0;
        let currentHeight = container.targetHeight; 
        let vProtrude = 0; 
        const hProtrude = 0; 

        const tabW = 65;
        const tabH = 65;
        const maxProtrude = 65;

        // PHASE 1
        if (currentTime <= tHorizontalDone) {
            const progress = currentTime / tHorizontalDone;
            currentWidth = container.targetWidth * progress;
            vProtrude = 0; 
        } 
        //PHASE 2
        else if (currentTime <= tTabsDone) {
            currentWidth = container.targetWidth;
            const progress = (currentTime - tHorizontalDone) / (tTabsDone - tHorizontalDone);
            vProtrude = maxProtrude * progress; 
        }
        else {
            currentWidth = container.targetWidth;
            vProtrude = maxProtrude; 
        }

        let detailsVisible = false;
        if (currentTime > tTabsDone) {
            if (currentTime < tTabsDone + 350) {
                detailsVisible = Math.random() > 0.4;
            } else {
                detailsVisible = true;
            }
        }

        const g = container.frameGraphics;
        g.clear();
        
        // STEP 1: Draw outer corner tabs
        if (currentTime > tHorizontalDone) {
            const configurations = [
                { x: -currentWidth / 2 - hProtrude,         y: -currentHeight / 2 - vProtrude },        // Top-Left
                { x: currentWidth / 2 + hProtrude - tabW,   y: -currentHeight / 2 - vProtrude },        // Top-Right
                { x: -currentWidth / 2 - hProtrude,         y: currentHeight / 2 + vProtrude - tabH },  // Bottom-Left
                { x: currentWidth / 2 + hProtrude - tabW,   y: currentHeight / 2 + vProtrude - tabH }   // Bottom-Right
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
                    lineLength: 32.5,
                    CenterRadius: 32.5 / 10
                };
                CanvasToolbox.Cross(g, crossCtx, centerPos);
            });
        }

        g.lineStyle(0);
        g.beginFill(uiColor, 1);
        g.drawRect(-currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight);
        g.endFill();

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

            if (detailsVisible) {
                g.lineStyle(2, uiColor, 1);
                const tickLength = 16;
                const tickGap = 6;

 
                g.moveTo(-currentWidth / 2 - tickGap, -currentHeight / 2);
                g.lineTo(-currentWidth / 2 - tickGap - tickLength, -currentHeight / 2);
                g.moveTo(currentWidth / 2 + tickGap, -currentHeight / 2);
                g.lineTo(currentWidth / 2 + tickGap + tickLength, -currentHeight / 2);
                g.moveTo(-currentWidth / 2 - tickGap, currentHeight / 2);
                g.lineTo(-currentWidth / 2 - tickGap - tickLength, currentHeight / 2);
                g.moveTo(currentWidth / 2 + tickGap, currentHeight / 2);
                g.lineTo(currentWidth / 2 + tickGap + tickLength, currentHeight / 2);
                g.lineStyle(0); 
            }
        }

        container.textMask.clear();
        container.textMask.beginFill(this.context.MaskFillColor);
        container.textMask.drawRect(-currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight);

        if (currentTime <= tTabsDone) {
            container.PIDText.visible = false;
        } 
        else if (currentTime > tTabsDone && currentTime <= tTabsDone + 375) {
            container.PIDText.visible = Math.random() > 0.35;
        } 
        else {
            container.PIDText.visible = true;
        }


        container.LabelText.visible = detailsVisible;
        container.bottomLogText.visible = detailsVisible;


        if (currentTime <= tIntroDone) {
            container.ProtocolText.visible = false;
            container.SubheaderText.visible = false;
            container.StatusText.visible = false;
        } 
        else {
            container.ProtocolText.visible = true;
            container.SubheaderText.visible = true;
            container.StatusText.visible = true;
        }

        if (currentTime > tTabsDone && currentTime <= tIntroDone) {
            container.introText.visible = true;

            const typeProgress = currentTime - tTabsDone;
            const introTexts = this.context.IntroPhaseTexts;
            const finalIntro = this.context.IntroFinalText;

            if (typeProgress < 400) {
                container.introText.text = introTexts[0] || "";
            } else if (typeProgress < 800) {
                container.introText.text = introTexts[1] || "";
            } else if (typeProgress < 1200) {
                container.introText.text = introTexts[2] || finalIntro || "";
            } else {
                container.introText.text = Math.random() > 0.35 ? finalIntro : "";
            }
        } 
        else {
            container.introText.visible = false; 
        }


        if (currentTime > tIntroDone) {
            const scrollSpeed = this.context.ScrollSpeed;
            const totalWidth = container.amountNeeded * container.textWidth;
            const leftBoundary = -container.targetWidth / 2 - container.textWidth;
            
            container.scrollingTexts.forEach(text => {
                text.visible = true;
                text.x -= scrollSpeed * delta;

                if (text.x <= leftBoundary) {
                    text.x += totalWidth;
                }
            });
        } else {
            container.scrollingTexts.forEach(text => text.visible = false);
        }
if (progress > 0) {
        // Higher intensity jitter (400px range)
        container.x = (window.innerWidth / 2) + (Math.random() - 0.5) * (progress * 400);
        container.y = (window.innerHeight / 2) + (Math.random() - 0.5) * (progress * 300);
        
        // Rapid strobe effect
        container.visible = Math.random() > 0.3;
        
        // Intense color shifts
        const glitchColors = this.context.GlitchColors;
        const glitchColor = glitchColors[Math.floor(Math.random() * glitchColors.length)];
        return; 
    }
    }
});
setTimeout(() => {
   MOSS.Canvas.close(this.context.id, 350);
}, this.context.Duration - 350);
setTimeout(() => {
   MOSS.Canvas.remove(`${this.context.id}-background`);
}, this.context.Duration);
  }
}
DurandalOverride.register()