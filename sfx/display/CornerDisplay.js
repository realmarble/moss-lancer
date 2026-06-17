class CornerDisplay extends SFX {
  constructor(
    context = {
      Lines: ["EXAMPLE LINE 1", "EXAMPLE LINE 2", "EXAMPLE LINE 3"],
      Prefix: "//",
      Speed : 15
    }
  ) {
    super(context);
  }
  async Play() {
    var id = `cornerdisplay${Math.floor(Math.random() * 100)}`;
    var overlay = document.createElement("div");
    overlay.id = id;
    overlay.style.cssText = `position: absolute;top: 0px;left:0px;`;
    document.body.appendChild(overlay);
    await this.timer(40);
    for (const element of this.context.Lines) {
      this.#displaytype(this.context.Prefix + element, id);
      await this.timer(500);
    }
    await this.timer(4000);
    document.getElementById(id).remove();
  }

  #displaytype(text, id) {
    let el = document.createElement("p");
    el.style.marginTop = "2px"
    el.style.marginBottom = "2px"
    document.getElementById(id).appendChild(el);
    new TypeIt(el, {
      strings: text,
      speed: this.context.Speed,
      waitUntilVisible: true,
      cursor: false,
    }).go();
  }
}
CornerDisplay.register()