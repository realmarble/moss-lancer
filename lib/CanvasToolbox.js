class CanvasToolbox {
    static Cross(graphics = null,ctx = {
        thickness: 2,
        color: 0x000000,
        alpha: 1,
        lineLength: 45
    },pos = {x: 0, y: 0}) {
        if (!graphics) {graphics = new PIXI.Graphics();}
        graphics.lineStyle(ctx.thickness, ctx.color, ctx.alpha);
        graphics.moveTo(pos.x - ctx.lineLength, pos.y);
        graphics.lineTo(pos.x + ctx.lineLength, pos.y);
        graphics.moveTo(pos.x, pos.y - ctx.lineLength);
        graphics.lineTo(pos.x, pos.y + ctx.lineLength);
        graphics.beginFill(ctx.color, ctx.alpha);
        graphics.drawCircle(pos.x, pos.y, ctx.lineLength/10);
        graphics.endFill();
        return graphics;
    }
    static Tint(graphics, ctx = { color: 0x000000, alpha: 0.5 }) {
        graphics.beginFill(ctx.color, ctx.alpha);
        // Draws across the full viewport
        graphics.drawRect(0, 0, window.innerWidth, window.innerHeight);
        graphics.endFill();
        return graphics;
    }
}