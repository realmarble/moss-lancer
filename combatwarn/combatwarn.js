object = {

}
function CombatPopup(object) {
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
if (object.Stripes == true) {
  stripe1 = document.createElement("div")
  stripe1.innerHTML = `<div class="top strip">
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  </div>` 
  stripe2 = document.createElement("div")
  stripe2.innerHTML = `
  <div class="bottom strip">
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  <div class="word">Warning</div>
  </div>`
document.body.appendChild(stripe1);
document.body.appendChild(stripe2); 
}


emblem = document.createElement("div")
emblem.innerHTML = `<img id="emblem" class="centered" src = "${object.Emblem}" alt="My Happy SVG" style="z-index: 10;border: 0;animation: flicker 2s;display: none;height:40%"/>`
popup = document.createElement("div")
popup.innerHTML = `<div id="animation" class="centered" style="height: 1px;width: 30px;border: 1px solid #000000;transition: .75s;z-index: 20;padding:1em;">
<h4  id="systempopuptitle" style="transition: .75s;animation: flicker 2s;display:none;">${object.Title}</h4>
<h1  id="systempopupaction" style="color:${object.ActionColor};transition: .75s;animation: flicker 2s;display:none;" >${object.Action}</h1>
<h1  id="systempopupmessage" style="transition: .75s;animation: flicker 2s;display:none;" >${object.Message}</h1>

</div>`

document.body.appendChild(popup);
document.body.appendChild(emblem);
elem = document.getElementById("animation")
function setTransition(time){
    elem.style.transition = time
}
const emblemanim = async() => {
emblem = document.getElementById("emblem")
await sleep(250)
emblem.style.display = "block"
await sleep(3550)
emblem.style.animation = "flicker-out 2s 1"
await sleep(2000)
emblem.style.display = "none"
}
const stripeanim = async() => {
  await sleep(250)
htmlcollection =  document.getElementsByClassName("strip")
stripes = Array.prototype.slice.call(htmlcollection); 
stripes[0].style.top=0;
stripes[1].style.bottom=0;
await sleep(3550)
stripes[0].style.top="-100px";
stripes[1].style.bottom="-100px";
}
const popupanim = async() => {
    await sleep(250)
    setTransition("0.2s")
  elem.style.width="33%"
  await sleep(250)
  elem.style.height="25%"
  await sleep(250)
  setTransition("0.1s")
  elem.style.borderWidth = "16px"
  await sleep(50)
  document.getElementById("systempopuptitle").style.display="block"
  await sleep(250)
  document.getElementById("systempopupaction").style.display="block"
  await sleep(250)
  document.getElementById("systempopupmessage").style.display="block"
  await sleep(2500)
  document.getElementById("systempopuptitle").style.animation = "flicker-out 1s 1"
  document.getElementById("systempopupaction").style.animation = "flicker-out 1s 1"
  document.getElementById("systempopupmessage").style.animation = "flicker-out 1s 1"
  await sleep(250)
  elem.style.borderWidth = "1px"
  elem.style.height="1px"
  await sleep(250)
  elem.style.width="0px"
  elem.style.display="none"
}
const cleanup = async()=>{
await sleep(15000)
emblem.remove()
if (object.Stripes == true) {
  stripes[0].remove()
  stripes[1].remove()
}

popup.remove()
console.log('anim cleaned')
}
emblemanim()
if (object.Stripes == true) {
stripeanim()
}
popupanim()
cleanup()
}
function AnnouncementController() {
  let announcementcontroller = new Dialog({
      title: "Announcement Controller",
      content: `
      <div
      id="container"
      style="height: 100%; width: 100%; background-color: slategray"
    >
      <textarea
        id="announcementtextarea"
        name=""
        rows="4"
        cols="50"
        style="width: 100%; height: 90%;background-color: azure;"
      ></textarea>
      <button
        style="width: 100%; height: 10%; bottom: 0; position: absolute; left: 0"
        onclick="CallAnnouncement(JSON.parse(document.getElementById('announcementtextarea').value))"
      >
        SHOW ANIMATION
      </button>
    </div>
    
      `,
      buttons: {},
      default: "two",
      render: () => {
  },
      close: html => {}
  
  },{width:500, height:800})
  announcementcontroller.render(true);   
}
//DONT USE THIS. NOT FINISHED
class AnnouncementEditor extends Application{
  constructor(){
    super();
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes:["no-padding"],
      popOut: true,
      template:"modules/moss-lancer/templates/warningeditor.html",
      width:1400,
      height:720,
      baseApplication: "WarningEditor",
      title:"Combat Announcement Editor"
    });
  }
  }