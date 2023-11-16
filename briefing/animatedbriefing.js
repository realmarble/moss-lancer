intros = {
  "loadscreen":loadscreen,
  "logo":logo,
  "brigador":brigador
}
layouts ={
  "classic":classic
}
function Briefing(object) {
  introhtml=""
  if (object.Intro = true) {
  try {
    introhtml = intros[object.IntroData.type](object)
  } catch (error) {
    introhtml=`
    <div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">
  <script>
    list=Array.from(document.getElementsByClassName("typed"))
    list.forEach(element => {
      text= element.getAttribute("data-text")
      new TypeIt(element, {
    strings: text,
    speed: 5,
    waitUntilVisible: true,
    cursor: false,
  }).go();
  
    });
    document.getElementById("standby").style.display="none"
  document.getElementById("briefingcontainer").style.display="block"
    </script>
    </div>
    `
  }
  }
    let brief = new Dialog({
        title: "INCOMING REQUEST, STAND BY",
        content: 
        
        intros[object.IntroData.type](object)+classic(object)
        ,
        buttons: {},
        default: "two",
        render: () => {document.getElementById("briefingcontainer").parentElement.nextElementSibling.remove()},
        close: html => {}
    
    },{width:1400, height:700})
    brief.render(true);     
}

function classic(object){
  return `
  <div
  id="briefingcontainer"
  style="
    height: 100%;
    width: 100%;
    font-family: 'Ubuntu Mono', monospace;
    color: ${object.TextColor};
    display:none;
    text-align: center; /* adjust as needed */
    vertical-align: middle;
    background-size: 40px 40px;
    background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};">

  <style>
    .client-container {
      text-align: center;
      border: 1px solid ${object.BorderColor};
      width: 100%;
      margin: 0 auto;
      display: flex;
    }
    .client-logo {
      width: 30%;
      height: inherit;
      border: 1px solid ${object.BorderColor};
      margin: 20px auto;
    }
    .description {
      width: 70%;
      text-align: left;
      overflow-wrap: break-word;
      margin: 20px;
    }
    .reward-information {
          border: 1px solid ${object.BorderColor};
          /* height: 30%; */
          overflow: auto;
        }
    .mission-briefing {
      width: 100%;
            display: flex;
            justify-content: center;
            border: 1px solid ${object.BorderColor};
            padding: 20px;
            margin: 0 auto;
        }
        .briefing-section {
            flex: 1;
            padding: 0 20px;
        }
        .briefing-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            width: 100%;
        }
        .section-title {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .notes {
            font-style: italic;
        }
  </style>
  <div>
    <h1 class="typed" data-text="INCOMING REQUEST"></h1>
    <div class="client-container">
      <div class="client-logo">
        <img
          src="${object.ClientLogo}"
          alt="Client Logo"
        />
        <span style="text-align: center" class="typed" data-text="${object.ClientName}"
          ></span
        >
      </div>
      <div class="description">
        <div style="height: 60%;border: 1px solid ${object.BorderColor};">
          <p class="typed" data-text="${object.ClientDescription}">
          </p>
          <p class="typed" data-text="${object.MissionDescription}">
          </p>
          <p  class="typed" data-text="${object.AdditionalDescription}"></p>
        </div>

        <div class="reward-information">
        <h1 class="typed" data-text="PAYMENT" style="text-align: center"></h1>
        <p  class="typed" data-text="${object.PaymentInfo}"></p>
        <p class="typed" data-text="${object.AdditionalPaymentInfo}"> <span style="float:right; color: gray;">${object.PaymentFlavour}</span></p> 
      </div>
      </div>
    </div>
  </div>


  <div class="mission-briefing">
    <div class="briefing-section">
        <div class="section-title typed" data-text="Deploying Forces:"></div>
        <ul>
        ${(function() {
          text = "";object.DeployedForces.forEach(element => {
              text+=`<li><p class="typed" data-text="${element}"></p></li>`
            });
          return text;
      })()}
        </ul>
    </div>
    <div class="briefing-section">
        <div class="section-title typed" data-text="OBJECTIVE:"></div>
        ${(function() {
          text = "";object.Objectives.forEach(element => {
              text+=`<p class="typed" data-text="${element}"></p>`
            });
          return text;
      })()}
    </div>
    <div class="briefing-section">
    ${(function() {
      text = "";object.Notes.forEach(element => {
          text+=`<p class="notes typed" data-text="${element}"></p>`
        });
      return text;
  })()}
    </div>
</div>

</div>

  `
}

function loadscreen(object){
  return `<div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">

  <h1 style="text-align: center;color:${object.TextColor};font-size:4em;">${object.IntroData.LoadScreenTitle}</h1>
  <div id="fluffmessages">
    
<script>
lines=${JSON.stringify(object.IntroData.LoadScreenFluff)}
div=document.getElementById("fluffmessages")
var logRandomLine = (arr) => {
if (arr.length === 0) {
clearInterval(intervalId);
return;
}

var randomIndex = Math.floor(Math.random() * arr.length);
var randomLine = arr[randomIndex];
arr.splice(randomIndex, 1);
div.innerHTML += '<p>'+randomLine+'</p>'
};

// Set an interval to log a random line every 50ms for ten times
var intervalCount = 0;
var intervalId = setInterval(() => {
logRandomLine(lines);
intervalCount++;
if (intervalCount >= 20) {
document.getElementById("standby").style.display="none"
document.getElementById("briefingcontainer").style.display="block"
list=Array.from(document.getElementsByClassName("typed"))
  list.forEach(element => {
    text= element.getAttribute("data-text")
    new TypeIt(element, {
  strings: text,
  speed: 5,
  waitUntilVisible: true,
  cursor: false,
}).go();

  });

clearInterval(intervalId);
}
}, 35);
</script>
  </div>
  </div>`
}
function logo(object){
  return `<div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">
  <img src="${object.IntroData.LogoPath}" alt="" style="height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-name: flicker;
  animation-iteration-count: 1; 
  animation-duration: 4s;
  ">
  <script>
  delay = ms => new Promise(res => setTimeout(res, ms));

logoanim = async () => {
  list=Array.from(document.getElementsByClassName("typed"))
  list.forEach(element => {
    text= element.getAttribute("data-text")
    new TypeIt(element, {
  strings: text,
  speed: 5,
  waitUntilVisible: true,
  cursor: false,
}).go();

  });
  await delay(5000);
  document.getElementById("standby").style.display="none"
  document.getElementById("briefingcontainer").style.display="block"
};
logoanim()
</script>
  </div>
  
  `
}
function brigador(object){
  return `<div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
  background-image: radial-gradient(circle, ${object.BackgroundAccent} 1px, rgba(0, 0, 0, 0) 1px);background-color: ${object.BackgroundColor};font-family: 'Ubuntu Mono', monospace;
  color: ${object.TextColor};">


  <style>
  .image-container {
    display: flex;
    overflow: hidden;
    width: 250px;
    transition: .75s;
    margin:auto;
    position: relative;
  top: 50%;
  transform: translateY(-50%);

  }
  .half-image {
      height:250px;
      width: 250px;
      background-image: url(${object.IntroData.LogoPath});
      background-size: 250px;
      position: fixed;
      transition: .75s;
  }
  .contractcontainer {
    /* display: none; */
    /* transition: 0.75s; */
    width: 1400px;
    word-wrap: break-word;
    text-align: center;
    margin:auto;
    bottom: -1400px;
    position: absolute;
    left:260px
  }

</style>
</head>
<body>
<div class="image-container">
<div id="left" class="half-image" style="clip-path: inset(0 50% 0 0);left: 835px;"></div>
<div id="right" class="half-image" style="clip-path: inset(0 0 0 50%);right: 835px;"></div>
</div>
<div class="contractcontainer" >
<p class="contract" >
 ${object.IntroData.Paragraph1}
</p>
<p class="contract" >
${object.IntroData.Paragraph2}
</p>
<p class="contract" >
${object.IntroData.Paragraph3}
</p>
<p class="contract" >
${object.IntroData.Paragraph4}
</p>
<p class="contract" >
${object.IntroData.Paragraph5}
</p>

</div>

<script>
list=Array.from(document.getElementsByClassName("typed"))
    list.forEach(element => {
      text= element.getAttribute("data-text")
      new TypeIt(element, {
    strings: text,
    speed: 5,
    waitUntilVisible: true,
    cursor: false,
  }).go();
  left = document.getElementById("left")
  right = document.getElementById("right")
  contract = document.getElementsByClassName("contractcontainer")[0]
  const timer = ms => new Promise(res => setTimeout(res, ms))

  function logoanim(){
left.style.left="0px"
right.style.right="0px"
  }
async function load () { // We need to wrap the loop into an async function for this to work
for (var i = 0; i < 40; i++) {
  await timer(40);
contract.style.bottom = (-1400+i*70)+"px" // then the created Promise can be awaited
if (i % 10 == 0) {await timer(300);}
}
}
const fullanim = async () => {
logoanim()
await timer(1000);
load()
await timer(4000);
document.getElementById("standby").style.display="none"
document.getElementById("briefingcontainer").style.display="block"
}
fullanim()
</script>
    </div>
  `
}
function briefcontroller() {
  let briefcontroller = new BriefingController();
  briefcontroller.render(true);
}

function briefingeditor(){
let briefeditor = new BriefingEditor()
briefeditor.render(true);
}

class BriefingEditor extends Application{
constructor(){
  super();
}
static get defaultOptions() {
  return mergeObject(super.defaultOptions, {
    classes:["no-padding"],
    popOut: true,
    template:"modules/moss-lancer/templates/briefingeditor.html",
    width:1400,
    height:720,
    baseApplication: "BriefingEditor",
    title:"Briefing Editor"
  });
}
}
class BriefingController extends Application{
  constructor(){
    super();
  }
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes:["no-padding"],
      popOut: true,
      template:"modules/moss-lancer/templates/briefingcontroller.html",
      width:500,
      height:800,
      baseApplication: "BriefingController",
      title:"Briefing Controller"
    });
  }
  }
