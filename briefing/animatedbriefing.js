intros = {
  "loadscreen":loadscreen,
  "logo":logo
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
        
        introhtml+
        
        `
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
      
        `,
        buttons: {},
        default: "two",
        render: () => {document.getElementById("briefingcontainer").parentElement.nextElementSibling.remove()},
        close: html => {}
    
    },{width:1400, height:700})
    brief.render(true);     
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

function briefcontroller() {
  let briefcontroller = new Dialog({
      title: "Briefing Controller",
      content: `
      <div
      id="container"
      style="height: 100%; width: 100%; background-color: slategray"
    >
      <textarea
        id="briefingtextarea"
        name=""
        rows="4"
        cols="50"
        style="width: 100%; height: 90%;background-color: azure;"
      ></textarea>
      <button
        style="width: 100%; height: 10%; bottom: 0; position: absolute; left: 0"
        onclick="CallBrief(JSON.parse(document.getElementById('briefingtextarea').value))"
      >
        OPEN BRIEF
      </button>
    </div>
    
      `,
      buttons: {},
      default: "two",
      render: () => {
  },
      close: html => {}
  
  },{width:500, height:800})
  briefcontroller.render(true);
}

function briefingeditor(){
  let briefeditor = new Dialog({
    title: "Briefing Editor",
    content: `<div style="width: 50%;position:absolute;left: 0;overflow-y:scroll;height: 100%;">

  
    <h3>Intro Options:</h3>
    <select id="introtype">
        <option value="none">None</option>
        <option value="loadscreen">Loading Screen</option>
        <option value="logo">Logo</option>
    </select>
    <div id="introoptions">
    
    </div>
    <h3>Briefing Options:</h3>
    <div id="briefingoptions">
        <input type="text" name="ClientName" placeholder="Name of the Client">
        <input type="text" name="ClientLogo" placeholder="Logo of the Client">
        <textarea name="ClientDescription" placeholder="Description of the Client" style="width: 100%;height: 150px;"></textarea>
        <textarea name="MissionDescription" placeholder="Description of the Mission" style="width: 100%;height: 150px;"></textarea>
        <textarea name="AdditionalDescription" placeholder="Complementary Mission Info" style="width: 100%;height: 150px;"></textarea>
        <textarea name="PaymentInfo" placeholder="Payment Information" style="width: 100%;height: 150px;"></textarea>
        <textarea name="AdditionalPaymentInfo" placeholder="Additional Payment Information" style="width: 100%;height: 150px;"></textarea>
        <input type="text" name="PaymentFlavour" placeholder="Payment Flavour Text">
        <textarea name="DeployedForces" placeholder="Deployed Forces" style="width: 100%;height: 150px;"></textarea>
        <textarea name="Objectives" placeholder="Mission Objectives" style="width: 100%;height: 150px;"></textarea>
        <textarea name="Notes" placeholder="Mission Notes" style="width: 100%;height: 150px;"></textarea>
        Background Color:<input type="color" name="BackgroundColor" value="#0c0c1d"><br>
        Background Accent:<input type="color" name="BackgroundAccent" value="#1E1E48"><br>
        Text Color:<input type="color" name="TextColor" value="#FFFFFF"><br>
        Border Color:<input type="color" name="BorderColor" value="#C0C0C0">    
    </div>
    <button id="briefgenbutton" style="width: 100%;">Generate Brief</button>
</div>
<div style="width: 50%;position:absolute;right: 0;height:100%;">
<textarea id="brieftextdisplay" style="width:100%;height:94%;resize: none;">This is where the code for your briefing will show.</textarea>
<button style="width: 50%;height:5%;" onclick="navigator.clipboard.writeText(document.getElementById('brieftextdisplay').value);">Copy</button><button style="width: 50%;height:5%;" onclick="Briefing(JSON.parse(document.getElementById('brieftextdisplay').value))">Preview</button>
</div>
<script>
briefobject = {}
    document.getElementById("introtype").addEventListener("change", function(){
        introptions = document.getElementById("introoptions")
        switch (this.value) {
            case "none":
            introptions.innerHTML = '';
                break;
            case "logo":
            introptions.innerHTML = '<input type="text" placeholder="A Path to your logo." name="LogoPath">';
                break;
            case "loadscreen":
                introptions.innerHTML = '<input type="text" name="LoadScreenTitle" placeholder="A Title for the loadscreen."><textarea name="LoadScreenFluff"cols="30" rows="10" placeholder="The fluff that shows during the animation. Defined as an Array."></textarea>';
                break;
            default:
            introptions.innerHTML = '';
                break;
        }
         })
         document.getElementById("briefgenbutton").onclick = function(){
//build a list of the inputs and sort them into the object
briefingoptions = Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("briefingoptions").getElementsByTagName("textarea")))
briefingoptions.forEach(element => {
    try {
        briefobject[element.name] = JSON.parse(element.value)
} catch (error) {
    briefobject[element.name] = element.value
}

});
if (document.getElementById("introtype").value != "none") {
    briefobject.intro = true
    briefobject.IntroData = {}
    briefobject["IntroData"].type = document.getElementById("introtype").value
    introoptions = Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("input")).concat(Array.prototype.slice.call(document.getElementById("introoptions").getElementsByTagName("textarea")))
    introoptions.forEach(element => {
        try {
            briefobject["IntroData"][element.name] = JSON.parse(element.value)
} catch (error) {
    briefobject["IntroData"][element.name] = element.value
}
});
}
document.getElementById("brieftextdisplay").value = JSON.stringify(briefobject, null, 3)
         }
    </script>




    `,
    buttons: {},
    default: "two",
    render: () => {document.getElementsByClassName("window-content")[0].getElementsByClassName("dialog-buttons")[0].remove()},
    close: html => {}

},{width:1400, height:700})
briefeditor.render(true);
}