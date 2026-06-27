class Subtitles extends SFX {
    constructor(context = { subtitleTrack: [] }) {
        super(context);
    }

    async Play() {
        MOSS.Canvas.add("subtitles", {
            layer: "subtitles",
            duration: 0, 
            setup: (app, container) => {
                const textStyle = new PIXI.TextStyle({
                    fontFamily: "PP Fraktion Mono", 
                    fontSize: 24,
                    fill: "#FFFFFF",           
                    align: "center",
                    fontWeight: "bold",
                    wordWrap: true,
                    wordWrapWidth: app.screen.width * 0.8 
                });

                const displayField = new PIXI.Text("", textStyle);
                displayField.anchor.set(0.5, 1); 
                container.addChild(displayField);

                const repositionText = () => {
                    displayField.x = app.screen.width / 2;
                    displayField.y = app.screen.height - 50; 
                    displayField.style.wordWrapWidth = app.screen.width * 0.8;
                };
                repositionText();
                window.addEventListener("resize", repositionText);

                // --- READ DIRECTLY FROM THE CONTEXT MATRIX HERE ---
                container._subtitleState = {
                    track: this.context.subtitleTrack || [],
                    displayField,
                    currentIndex: 0,
                    trackTimer: 0, 
                    isActive: (this.context.subtitleTrack || []).length > 0,
                    cleanupListener: repositionText
                };
            },
            
            update: (container, delta, elapsedMS, progress) => {
                const state = container._subtitleState;
                if (!state || !state.isActive) return;

                state.trackTimer += elapsedMS;
                const activeBlock = state.track[state.currentIndex];

                if (activeBlock) {
                    state.displayField.text = activeBlock.text;

                    if (state.trackTimer >= activeBlock.duration) {
                        state.currentIndex++;
                        state.trackTimer = 0; 
                    }
                } else {
                    state.displayField.text = "";
                    state.isActive = false; 

                    if (state.cleanupListener) {
                        window.removeEventListener("resize", state.cleanupListener);
                    }
                    
                    MOSS.Canvas.remove("subtitles");
                }
            }
        });
    }
}
Subtitles.register();