class Video extends SFX {
    constructor(context = {
        id: "VideoEffect",
        layer: "background",
        duration: 5000, // Default duration of 5 seconds
        assetAlias: "",
        tint: null // Default tint color
    }) {
        super(context);
    }

    async Play() {
        MOSS.Canvas.add(this.context.id, {
        layer: this.context.layer,
        duration: this.context.duration,
        setup: (app, container) => {
          const videoTexture = PIXI.Assets.get(this.context.assetAlias);
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
          if (this.context.tint !== null) {
            videoSprite.tint = this.context.tint;
          }

          container.addChild(videoSprite);
          container._videoSprite = videoSprite;
        },
        update: (container, delta, elapsedMS, progress) => {
          if (progress >= 1 && container._videoSource) {
            container._videoSource.pause();
          }
        }
      });
    }
}
Video.register();