class CornerDisplay_Midnight extends SFX {
  constructor(
    context = {
      Lines: [],
      Barcode: "",
      Overlay: false,
      Title:"",
      LingerTime: 700
    }
  ) {
    super(context);
  }
  async Play() {
    let style = _addstyle(`#textbox p{font-size:.5em;margin:0;margin-block-start:0px!important;margin-block-end:0px!important}.intro_redacted{left:0;position:relative;display:inline-block;cursor:zoom-in}.intro_redacted::before{left:0;content:"";position:absolute;width:100%;height:100%;background-color:currentColor;transform:scaleX(0);transform-origin:left;animation:1s cubic-bezier(0,0,.2,1) forwards redact}@keyframes redact{from{transform:scaleX(0)}to{transform:scaleX(1)}}#introbarcode{position:absolute;bottom:10px;right:10px}`)
    let overlay = document.createElement("div");
    let h1 = document.createElement("h1");
    h1.style.cssText = `position: absolute; top: 0;width:100%;text-align: center;z-index: 101;font-size:5em;color:white;margin-top:0px;`
    h1.innerHTML = this.context.Title
    overlay.style.cssText = `position: absolute;top: 0;left: 0;width: 100%;height: 100%;${this.context.Overlay ? "background-color: black;" : ""}z-index: 100;`;
    document.body.appendChild(overlay);
    let textbox = document.createElement("div");
    textbox.id = "textbox";
    textbox.style.cssText = `position: fixed;top: 0;left: 0;height: 50%;z-index: 101;color: white;font-family: 'Courier New', Courier, monospace;padding: 5px;`;
    overlay.appendChild(textbox);
    overlay.appendChild(h1)
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "introbarcode";
    overlay.appendChild(svg);
    JsBarcode("#introbarcode", this.context.Barcode, {
      background: "black",
      lineColor: "white",
      displayValue: false,
    });

    this.#displayLines().then(() => {
      setTimeout(() => {
        overlay.remove();
        style.remove();
      }, this.context.LingerTime);
    });
  }
  async #displayLines() {
    for (const line of this.context.Lines) {
      let p = document.createElement("p");
      p.innerHTML = line;
      textbox.appendChild(p);
      setTimeout(() => {
        const spans = p.querySelectorAll("span");
        spans.forEach((span) => {
          span.classList.add("intro_redacted"); // lowk so annoying that i had to redefine redacting because of how i wanted it to go the other way
        });
      }, 300);

      // Random delay
      const delay = Math.random() * 150 + 50;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
CornerDisplay_Midnight.register()