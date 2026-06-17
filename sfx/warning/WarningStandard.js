class WarningStandard extends SFX {
  constructor(context = {
    Stripes:true,
    Emblem:"https://static.wikia.nocookie.net/armoredcore/images/d/d5/V.VII_Swinburne_Emblem.PNG/revision/latest/scale-to-width-down/1000",
    Title:"// SYSTEM //",
    ActionColor:"yellow",
    Action:"-- CAUTION --",
    Message:"ZIGGURAT PRESENT",
    FontSize: "3em"
    }) {
    super(context);
  }
  Play() {
    let salt = Math.floor(Math.random() * 10000);
    let style = document.createElement("style");
    style.innerHTML = `.centered,.centered-container{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}body{overflow:hidden}.centered{text-align:center;color:#fff;border:16px solid #000;font-family:'Ubuntu Mono',monospace}#systempopupaction,#systempopupmessage,#systempopuptitle{animation:2s flicker;font-family:"Ubuntu Mono",monospace;font-size:${this.context.fontsize};margin-top: 15px}#systempopupmessage{white-space:nowrap}@keyframes flicker{0%,13%,9%{opacity:0}10%,20%{opacity:.5}25%{opacity:1}}@keyframes flicker-out{0%{opacity:1}13%,9%{opacity:.5}10%,100%,20%{opacity:0}}`
    document.head.appendChild(style);

    var emblem = document.createElement("div");
    emblem.innerHTML = `<img id="emblem" class="centered" src ="${this.context.Emblem}" style="z-index: 10;border: 0;animation: flicker 2s;display: none;height:40%"/>`;
    var popup = document.createElement("div");
    popup.innerHTML = `<div id="animation${salt}" class="centered" style="height: 1px;width: 30px;border: 1px solid #000000;transition: .75s;z-index: 20;">
      <h1  id="systempopuptitle" style="transition: .75s;animation: flicker 2s;display:none;">${this.context.Title}</h1>
      <h1  id="systempopupaction" style="color:${this.context.ActionColor};transition: .75s;animation: flicker 2s;display:none;" >${this.context.Action}</h1>
      <h1  id="systempopupmessage" style="transition: .75s;animation: flicker 2s;display:none;" >${this.context.Message}</h1>
      </div>`;
    document.body.appendChild(popup);
    document.body.appendChild(emblem);
    var elem = document.getElementById(`animation${salt}`);
    function setTransition(time) {
      elem.style.transition = time;
    }
  const emblemanim = async () => {
    emblem = document.getElementById("emblem");
    await this.timer(250);
    emblem.style.display = "block";
    await this.timer(3550);
    emblem.style.animation = "flicker-out 2s 1";
    await this.timer(2000);
    emblem.style.display = "none";
  };
  const stripeanim = async () => {
    new WarningStripes().Play()
  };
  const popupanim = async () => {
    await this.timer(250);
    setTransition("0.2s");
    elem.style.width = "33%";
    await this.timer(250);
    elem.style.height = "25%";
    await this.timer(250);
    setTransition("0.1s");
    elem.style.borderWidth = "16px";
    await this.timer(50);
    document.getElementById("systempopuptitle").style.display = "block";
    await this.timer(250);
    document.getElementById("systempopupaction").style.display = "block";
    await this.timer(250);
    document.getElementById("systempopupmessage").style.display = "block";
    await this.timer(2500);
    document.getElementById("systempopuptitle").style.animation = "flicker-out 1s 1";
    document.getElementById("systempopupaction").style.animation = "flicker-out 1s 1";
    document.getElementById("systempopupmessage").style.animation = "flicker-out 1s 1";
    await this.timer(250);
    elem.style.borderWidth = "1px";
    elem.style.height = "1px";
    await this.timer(250);
    elem.style.width = "0px";
    elem.style.display = "none";
  };
  const cleanup = async () => {
    await this.timer(5000);
    emblem.remove();
    style.remove()
    popup.remove();
  };

  if (this.context.Emblem != "") {
    emblemanim();
  }
  if (this.context.Stripes == true) {
    stripeanim();
  }
  popupanim();
  cleanup();
}
}
WarningStandard.register()