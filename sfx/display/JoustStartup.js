//calculate time spent in JOUST: Lines*LineTime
class JoustStartup extends SFX {
  constructor(
    context = {
      Speed: 0,
      Title: "JOUST.",
      FontSize: "0.9rem",
      Lines: [
          "Initializing JOUST... [JOUST TERMINAL v3.4]",
          "Provider: [JOUST Corporation]",
          "Corpro Daemon Integration Check:",
          "[SSC_HADES]: [OK]",
          "[IPSN_RANGEFINDER]: [OK]",
          "[HA_ALLFATHER]: [OK]",
          "Checking system integrity... [OK]",
          "Loading modules... [OK]",
          "Active Union Cooperation Directive: [2390-WVFP-3]",
           `Initiating Tier 2 HUD...`,
          `${game.user.name.toUpperCase()}@JOUST:~$`,
        ],
      Duration: 7000,
      LineTime: 150
    }
  ) {
    super(context);
  }
  
  async Play() {
    const id = `jouststartup-${Math.floor(Math.random() * 10000)}`;
    const overlay = document.createElement("div");
    overlay.id = id;
    overlay.className = "joust-startup-overlay";

    overlay.innerHTML = `
      <div class="joust-startup-body">
        <div class="joust-background"><h1>${this.context.Title}</h1></div>
        <div class="joust-text-container">
          <div id="${id}-text" class="joust-text"></div>
        </div>
        <div id="${id}-grid-overlay" class="joust-grid-overlay"></div>
      </div>
      <div class="joust-crt-overlay"></div>
    `;

    this.addStyle(`
      #${id} { position: fixed; inset: 0; background: transparent; color: #fff; z-index: 150; font-family: "JetBrains Mono", monospace; overflow: hidden; }
      #${id} .joust-startup-body { position: relative; width: 100%; height: 100%; background: #000; transition: background-color 0s; }
      #${id} .joust-background h1 { font-family: "Vina Sans", cursive; margin: 0; padding: 0; font-size: 2em; }
      #${id} .joust-background { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.2; pointer-events: none; user-select: none; font-size: 8rem; font-weight: 400; line-height: 1; text-transform: uppercase; transition: opacity 0.2s ease; }
      #${id} .joust-text-container { position: absolute; top: 0; left: 0; display: flex; flex-direction: column; transition: opacity 0.2s ease; }
      #${id} .joust-text { white-space: pre-wrap; font-size: ${this.context.FontSize}; max-width: 72ch; }
      #${id} .joust-grid-overlay { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat(9, 1fr); pointer-events: none; z-index: 5; }
      #${id} .joust-cube { background-color: #000; opacity: 0; }
      #${id} .joust-startup-body.is-shattering { background-color: transparent; }
      #${id} .joust-startup-body.is-shattering .joust-background,
      #${id} .joust-startup-body.is-shattering .joust-text-container { opacity: 0; }
      #${id} .joust-cube.active-shatter { animation: joustCubeFade 0.4s ease forwards; opacity: 1; }
      #${id} .joust-crt-overlay { position: fixed; inset: 0; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 255, 0, 0.03)); background-size: 100% 3px, 3px 100%; pointer-events: none; z-index: 10; opacity: 1; transition: opacity 500ms ease; }
      #${id} .joust-crt-overlay.fade-out { opacity: 0; }

      @keyframes joustCubeFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.92); }
      }
    `);

    document.body.appendChild(overlay);

    const textElement = document.getElementById(`${id}-text`);

    const duration = Number(this.context.Duration) || 7000;

    const runShatter = () => {
      const bodyContainer = overlay.querySelector('.joust-startup-body');
      const gridContainer = document.getElementById(`${id}-grid-overlay`);
      const crtElement = overlay.querySelector('.joust-crt-overlay');
      
      const cols = 16;
      const rows = 9;
      const totalCubes = cols * rows;
      const staggerDelay = 0.04; // Seconds between column steps (lower = faster sweep)
      
      // Populate screen array with cubes
      for (let i = 0; i < totalCubes; i++) {
        const cube = document.createElement('div');
        cube.classList.add('joust-cube');
        
        const colIndex = i % cols;
        const reverseCol = (cols - 1) - colIndex;
        const delay = reverseCol * staggerDelay;
        
        cube.style.animationDelay = `${delay}s`;
        gridContainer.appendChild(cube);
      }
      void gridContainer.offsetWidth;

      bodyContainer.classList.add('is-shattering');
      const cubes = gridContainer.querySelectorAll('.joust-cube');
      cubes.forEach(cube => cube.classList.add('active-shatter'));
      const blocksAnimationDuration = ((cols - 1) * staggerDelay) + 0.4;
    
      setTimeout(() => {
        if (crtElement) {
          crtElement.classList.add('fade-out');
        }
      }, blocksAnimationDuration * 1000);
      
      setTimeout(() => {
        overlay.remove();
      }, (blocksAnimationDuration + 0.5) * 1000);
    };

    const ti = new TypeIt(textElement, {
      speed: this.context.Speed,
      cursor: false,
      waitUntilDone: true,
      afterComplete: () => {
        if (this.context.OnEnd) {
          this.context.OnEnd();
        } else {
          setTimeout(runShatter, duration);
        }
      }
    });

    this.context.Lines.forEach((line) => {
      ti.type(line).pause(this.context.LineTime).break();
    });
    ti.go();
  }
}

JoustStartup.register();
