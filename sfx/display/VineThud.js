class VineThud extends SFX {
  constructor(context = {
    Image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Moai_Easter_Island_InvMH-35-61-1.jpg/250px-Moai_Easter_Island_InvMH-35-61-1.jpg",
    Sound : ""
  }){
    super(context)
  }
  async Play(){
    let style = document.createElement("style");
    style.innerHTML = `@keyframes flashAndFade{0%{opacity:1}100%{opacity:0}}.centered-container{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}`
    document.head.appendChild(style);
    let container;
    container = document.createElement("div");
    container.classList.add("centered-container")
    if (this.context.Sound != "") {
      AudioHelper.play({src: this.context.Sound, volume: 1, autoplay: true, loop: false}, false); //play the file only for the current client. works only in foundry 
    }
    container.innerHTML = `<img src=${this.context.Image} style="animation: flashAndFade 4s;">`
    document.body.appendChild(container)
    setTimeout(() => {
        container.remove()
        style.remove()
      }, 3500);
  }
}
VineThud.register()