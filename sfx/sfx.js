class SfxEffect {
    constructor(data){
        this.data = data;
    }
    play() {
    console.log(this.data)
    }
}
class VineThud extends SfxEffect {
    constructor(data){
        super(data);
    }
    play() {
    var container;
    container = document.createElement("div");
    container.classList.add("centered-container")
    AudioHelper.play({src: this.data.soundsource, volume: 1, autoplay: true, loop: false}, false); //play the file only for the current client
    container.innerHTML = `<img src=${this.data.imgsource} style="animation: flashAndFade 4s;">`
    document.body.appendChild(container)
    setTimeout(() => {
        container.remove()
      }, 3500);
}}