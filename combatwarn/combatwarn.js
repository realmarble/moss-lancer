warningtypes = {
  standard:standard,
  airforce:airforce,
  meltdown:meltdown
}

function standard(object){
  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
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
  
  
  if (object.Emblem != "") {
    emblemanim()
    }
  if (object.Stripes == true) {
  stripeanim()
  }
  popupanim()
  cleanup()
}
function airforce(object){ //this is fine but it could be better, i think it's fine personally
sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const mainanim = async() => {
  container = document.createElement("div")
container.classList.add("centered");
container.style.borderWidth = "0px"//clean unnecessary border
employerstring = document.createElement("h1")
teamstring = document.createElement("h1")
teamstring.style.fontSize = "4em"
teamcontainer = document.createElement("div")
container.appendChild(employerstring);
employerstring.style.textAlign = "center"
teamstring.style.textAlign = "center"
container.appendChild(teamstring);
container.appendChild(teamcontainer);
teamcontainer.style.display="flex"
teamcontainer.style.justifyContent="space-evenly"
object.Callsigns.forEach(element => {
p = document.createElement("p")
p.style.padding="10px"
new TypeIt(p, {
  strings: element,
  speed: 15,
  waitUntilVisible: true,
  cursor: false,
}).go();
teamcontainer.appendChild(p);
});
new TypeIt(teamstring, {
  strings: object.TeamName,
  speed: 15,
  waitUntilVisible: true,
  cursor: false,
}).go();
new TypeIt(employerstring, {
  strings: object.EmployerName,
  speed: 15,
  waitUntilVisible: true,
  cursor: false,
}).go();
document.body.appendChild(container);
container.style.transition = "1.5s"
await sleep(5000);
container.style.opacity = "0";
await sleep(1500);
container.remove()
  }
mainanim()

}
async function meltdown(object){
  timer = ms => new Promise(res => setTimeout(res, ms))
  cleanup = []
  function displaytype(text){
  el = document.createElement("p")
  document.getElementById("cinematic-overlay1").appendChild(el);
  new TypeIt(el, {
      strings: text,
      speed: 15,
      waitUntilVisible: true,
      cursor: false,
    }).go();
  }
  
  async function cornerdisplay(){
      var overlay = document.createElement("div");
      cleanup.push(overlay)
      overlay.id = "cinematic-overlay1";
      overlay.style.position = "fixed";
      overlay.style.top = "40px";
      overlay.style.right = "0";
      overlay.style.color = "white";
      overlay.style.padding = "10px";
      overlay.style.zIndex = "99";
      overlay.style.height = "400px";
      overlay.style.left = "80px";
      document.body.appendChild(overlay);
      await timer(40)
      object.CornerDisplayText.forEach(async element => {
          displaytype("//"+element)
          await timer(1500)   
      });
      }
      async function horizontaloverlay(){
          items = object.HorizontalScrollText
          var overlay = document.createElement("div");
          cleanup.push(overlay)
          overlay.id = "cinematic-overlay2";
          overlay.style.position = "absolute"
          overlay.style.color = "#0715cd"
          overlay.style.top = "0px";
          overlay.style.left = "0px";
          overlay.style.zIndex = "9";
          overlay.style.height = "100%";
          overlay.style.width = "100%";
          document.body.appendChild(overlay);
          for (let i = 0; i < 20; i++) {
              var text = document.createElement("p");
              text.style.left="-100%"
              text.style.transition="15s"
              text.style.position="absolute"
              text.style.whiteSpace ="nowrap"
              text.style.bottom = (200 + (Math.random()*900))+"px"
              new TypeIt(text, {
                  strings: "["+items[Math.floor(Math.random()*items.length)]+"]",
                  speed: 15,
                  waitUntilVisible: true,
                  cursor: false,
                }).go();
               overlay.appendChild(text);
               await timer(450)
               text.style.left="100%"
          }
          }
  cornerdisplay() //shows the white text in the corner
  horizontaloverlay() // scrolling text in blue
  CombatPopup({
  "type":"standard",
  "Stripes":false,
  "Emblem":"",
  "Title":object.Title,
  "ActionColor":object.ActionColor,
  "Action":object.Action,
  "Message":object.Message})
  await timer(30000)
  console.log("cleanup")
  cleanup.forEach(element => {
      element.style.transition = "1.5s"
      element.style.opacity = "0"
  });
  await timer(1500)
  cleanup.forEach(element => {
      element.remove()
  });
  }

function CombatPopup(object) {
try {
  warningtypes[object.type](object)
} catch (error) {
  console.log(error)
}
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
//This works but the template it uses doesn't
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