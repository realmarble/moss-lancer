class CanvasToolbox {
    static Cross(graphics = null, ctx = {
        thickness: 2,
        color: 0x000000,
        alpha: 1,
        lineLength: 45,
        CenterRadius: 45 / 10
    }, pos = { x: 0, y: 0 }) {
        if (!graphics) { graphics = new PIXI.Graphics(); }
        graphics.lineStyle(ctx.thickness, ctx.color, ctx.alpha);
        graphics.moveTo(pos.x - ctx.lineLength, pos.y);
        graphics.lineTo(pos.x + ctx.lineLength, pos.y);
        graphics.moveTo(pos.x, pos.y - ctx.lineLength);
        graphics.lineTo(pos.x, pos.y + ctx.lineLength);
        if (ctx.CenterRadius != 0) {
            graphics.beginFill(ctx.color, ctx.alpha);
            graphics.drawCircle(pos.x, pos.y, ctx.CenterRadius);
            graphics.endFill();
        }
        return graphics;
    }

    static Tint(graphics, ctx = { color: 0x000000, alpha: 0.5 }) {
        graphics.beginFill(ctx.color, ctx.alpha);
        graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);
        graphics.endFill();
        return graphics;
    }

    /**
     * Draws a hollow, colored rectangle defined by two diagonal points.
     * @param {PIXI.Graphics} [graphics=null] - The graphics instance to draw on.
     * @param {Object} p1 - First point {x, y}
     * @param {Object} p2 - Second diagonal point {x, y}
     * @param {Object} [ctx] - Styling properties
     */
    static Mark(graphics = null, p1, p2, ctx = { thickness: 2, color: 0xFF0000, alpha: 1 }) {
        if (!graphics) { graphics = new PIXI.Graphics(); }

        // Find the top-left boundary and dimensions regardless of point positioning
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const width = Math.abs(p1.x - p2.x);
        const height = Math.abs(p1.y - p2.y);

        graphics.lineStyle(ctx.thickness, ctx.color, ctx.alpha);
        graphics.drawRect(x, y, width, height);

        return graphics;
    }

/**
     * Spawns text lines sequentially starting from a position, shifting based on vertical and horizontal direction.
     * @param {PIXI.Container} container - The Pixi container to append the text children to.
     * @param {Object} pos - Starting origin position {x, y}
     * @param {string} direction - Stacking direction: "down-right", "down-left", "up-right", "up-left"
     * @param {string[]} lines - Array of text strings to print
     * @param {Object} [ctx] - Layout and text styling configuration
     */
    static Annotate(container, pos = { x: 0, y: 0 }, direction = "down-right", lines = [], ctx = {}) {
        if (!container) return;

        const lineSpacing = ctx.lineSpacing !== undefined ? ctx.lineSpacing : 4;
        
        // Setup text alignment context (Defaults to direction rules if not explicitly passed)
        const textAlignment = ctx.align || (direction.includes("left") ? "right" : "left");

        const textStyle = Object.assign({
            fontFamily: "Arial",
            fontSize: 14,
            fill: 0xffffff,
            align: textAlignment // For multi-line wrapped text blocks
        }, ctx.style || {});

        const isUp = direction.includes("up");
        const isLeft = direction.includes("left");

        // 1. Dynamic horizontal anchor override based on text layout alignment rules
        let anchorX = isLeft ? 1 : 0; // Default spatial anchoring
        if (textAlignment === "right") anchorX = 1;
        if (textAlignment === "center") anchorX = 0.5;

        // Vertical anchoring remains pinned to layout direction
        const anchorY = isUp ? 1 : 0; 

        let currentY = pos.y;

        lines.forEach((lineText) => {
            const pixiText = new PIXI.Text(lineText, textStyle);
            pixiText.anchor.set(anchorX, anchorY);
            
            pixiText.position.set(pos.x, currentY);

            if (isUp) {
                currentY -= (pixiText.height + lineSpacing);
            } else {
                currentY += (pixiText.height + lineSpacing);
            }

            container.addChild(pixiText);
        });
    }

 static CornerCrosses(graphics = null, ctx = {
    thickness: 2,
    color: 0x000000,
    alpha: 1,
    lineLength: 45,
    CenterRadius: 45 / 10
}, distance = 50, screenWidth = 800, screenHeight = 600) {
    
    // If no graphics object is provided, initialize a single one to batch the draws
    if (!graphics) { graphics = new PIXI.Graphics(); }

    // Define the 4 corner positions based on screen dimensions and variable distance
    const corners = [
        { x: distance, y: distance },                        // Top-Left
        { x: screenWidth - distance, y: distance },           // Top-Right
        { x: distance, y: screenHeight - distance },          // Bottom-Left
        { x: screenWidth - distance, y: screenHeight - distance } // Bottom-Right
    ];

    // Loop through each corner position and draw the cross using your method
    corners.forEach(pos => {
        this.Cross(graphics, ctx, pos);
    });

    return graphics;
}
}