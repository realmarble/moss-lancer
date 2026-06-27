class WarningStripes extends SFX {
  constructor(context = {
    WordCount: 20,
    Word : "Warning",
    Time : 3550,
    Background: "#ffff00ff",
    Text: "#000000ff"
  }) {
    super(context)
  }
  async Play() {
    let style = document.createElement("style");
    style.innerHTML = `@import url(https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap);body{overflow:hidden}.top{position:fixed;top:-1000px;left:0}.bottom{position:fixed;bottom:-1000px;left:0}.strip{font-family:'Ubuntu Mono',monospace;margin:0;padding:0;box-sizing:border-box;width:200vw;height:fit-content;display:flex;align-items:center;justify-content:space-evenly;background-color:${this.context.Background};padding:10px 0;border-top:3px solid ${this.context.Text};border-bottom:3px solid ${this.context.Text};position:absolute;left:50%;transform:translate(-50%,0%);overflow:hidden;transition:0.5s;z-index:100}.word{color:${this.context.Text};padding:0 10px;font-family:var(--font-fam);text-transform:uppercase;font-size:4vmin;font-weight:600;animation:strapmove 5s linear infinite;user-select:none;text-wrap:nowrap}.bottom>.word{animation:strapmovereversed 5s linear infinite}@keyframes strapmove{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}@keyframes strapmovereversed{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}`
    document.head.appendChild(style);
    let stripe1 = document.createElement("div");
    stripe1.innerHTML = `<div class="top strip">${`<div class="word">${this.context.Word}</div>\n`.repeat(this.context.WordCount)}</div>`;
    let stripe2 = document.createElement("div");
    stripe2.innerHTML = `<div class="bottom strip">${`<div class="word">${this.context.Word}</div>\n`.repeat(this.context.WordCount)}</div>`;
    document.body.appendChild(stripe1);
    document.body.appendChild(stripe2);
    await this.timer(250);
      var htmlcollection = document.getElementsByClassName("strip");
      var stripes = Array.prototype.slice.call(htmlcollection);
      stripes[0].style.top = 0;
      stripes[1].style.bottom = 0;
      await this.timer(this.context.Time);
      stripes[0].style.top = "-100px";
      stripes[1].style.bottom = "-100px";
      await this.timer(500);
      stripe1.remove();
      stripe2.remove();
      style.remove();
  }
}
WarningStripes.register()