function loadTypeIt() {

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/typeit@6.1.0/dist/typeit.min.js";
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
    window.typeitloaded=true;})
  }
function Briefing(object) {
  if (!window.typeitloaded) {
    loadTypeIt();
  }
    let brief = new Dialog({
        title: "INCOMING REQUEST, STAND BY",
        content: `
        <div id="standby" style="width:100%;height:100%;background-size: 40px 40px;
        background-image: radial-gradient(circle, #1E1E48 1px, rgba(0, 0, 0, 0) 1px);background-color: #0c0c1d;font-family: 'Ubuntu Mono', monospace;
        color: white;">
      
        <h1 style="text-align: center;color:white;font-size:4em;">${object.LoadScreenTitle}</h1>
        <div id="fluffmessages">
          
<script>
lines=${JSON.stringify(object.LoadScreenFluff)}
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
        </div>
        
        <div
        id="briefingcontainer"
        style="
          height: 100%;
          width: 100%;
          background-color: #0c0c1d;
          font-family: 'Ubuntu Mono', monospace;
          color: white;
          display:none;
          text-align: center; /* adjust as needed */
          vertical-align: middle;
          background-size: 40px 40px;
        background-image: radial-gradient(circle, #1E1E48 1px, rgba(0, 0, 0, 0) 1px);
      ">
      
        <style>
          .client-container {
            text-align: center;
            border: 1px solid #ddd;
            width: 100%;
            margin: 0 auto;
            display: flex;
          }
          .client-logo {
            width: 30%;
            height: inherit;
            border: 1px solid #ddd;
            margin: 20px auto;
          }
          .description {
            width: 70%;
            text-align: left;
            overflow-wrap: break-word;
            margin: 20px;
          }
          .reward-information {
                border: 1px solid #ddd;
                /* height: 30%; */
                overflow: auto;
              }
          .mission-briefing {
            width: 100%;
                  display: flex;
                  justify-content: center;
                  border: 1px solid #ddd;
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
              <div style="height: 60%;border: 1px solid #ddd;">
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
        onclick="game.socket.emit('system.lancer', {message:document.getElementById('briefingtextarea').value,TYPE:'BRIEFING'});Briefing(JSON.parse(document.getElementById('briefingtextarea').value));"
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
