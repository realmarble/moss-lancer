class SFXEditor extends BaseEditor {
    constructor() {
      super();
      this.config = MOSS.EditorConfigs.SFXEditor;
    }
  }
class SfxEffect {
    constructor(data){
        this.data = data;
    }
    play() {
    }
}
class SecurityOverride extends SfxEffect {
    
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

class LevelUpEffect extends SfxEffect {
constructor(data){
        super(data);
    }
async play(){
    var cleanup =[]
    cleanup.push(await _cornerdisplay(this.data.CornerDisplayText,">"))
    CombatPopup({
        "type":"standard",
        "Stripes":false,
        "Emblem":"",
        "Title":"//SYSTEM//",
        "ActionColor":"yellow",
        "Action":"LEVEL UP",
        "Message":"NEW LICENSE LEVEL"})
    await _timer(10000)
    cleanup.forEach(element => {
        element.style.transition = "1.5s"
        element.style.opacity = "0"
    });
    await _timer(1500)
    cleanup.forEach(element => {
        element.remove()
    });
}
}
function SFX(object){
    //write the parser here
    object.play()
}