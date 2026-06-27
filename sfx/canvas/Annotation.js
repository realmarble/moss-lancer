class Annotation extends SFX {
    constructor(context = {
            lines: [],
            msPerLine: 150,
            pos: { x: 1700, y: 100 },
            direction: "down-left",
            align: "right",
            layer: "default",
            id: "annotation",
            style: {
                fontFamily: "PP Fraktion Mono",
                fill: 0xccff00,
                fontSize: 8
            }
        }) {
        super(context);
    }

    async Play() {
        const ctx = this.context;

        MOSS.Canvas.add(ctx.id, {
            duration: 0, // Remains alive indefinitely or until explicitly removed
            layer: ctx.layer,

            setup: (app, container) => {
                // Initialize the persistent tracking state directly inside the container instance
                container._readoutState = {
                    fullLines: ctx.lines,
                    msPerLine: ctx.msPerLine,
                    pos: ctx.pos,
                    direction: ctx.direction,
                    align: ctx.align,
                    textStyle: ctx.style,
                    
                    totalElapsed: 0,
                    lastVisibleCount: 0
                };
            },

            update: (container, delta, elapsedMS, progress) => {
                const state = container._readoutState;
                if (!state) return;

                // 1. Progress tracking
                state.totalElapsed += elapsedMS;

                // 2. Calculate thresholds matching active run timing limits
                const linesToReveal = Math.floor(state.totalElapsed / state.msPerLine);
                const visibleCount = Math.min(linesToReveal + 1, state.fullLines.length);

                // 3. Conditional rendering block to avoid layout rebuild cycles on every frame tick
                if (visibleCount !== state.lastVisibleCount) {
                    state.lastVisibleCount = visibleCount;
                    
                    // Wipe the active frame node children clean before structural regeneration
                    container.removeChildren();

                    const currentActiveLines = state.fullLines.slice(0, visibleCount);

                    // 4. Delegate structured formatting calculations straight to your pure utility toolbox
                    CanvasToolbox.Annotate(
                        container,
                        state.pos,
                        state.direction,
                        currentActiveLines,
                        {
                            lineSpacing: 0,
                            align: state.align,
                            style: state.textStyle
                        }
                    );
                }
            }
        });
    }
}
Annotation.register()