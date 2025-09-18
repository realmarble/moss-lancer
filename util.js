Hooks.on("init", function() {
//two handlebar helpers for switch cases
Handlebars.registerHelper("switch", function(value, options) {
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
  });
  
  Handlebars.registerHelper("case", function(value, options) {
    if (value == this._switch_value_) {
      return options.fn(this);
    }
  });
})

function addFilePicker(elem) {
    button = document.createElement('button')
    button.classList.add("file-picker")
    idiomatic = document.createElement('i')
    idiomatic.classList.add("fas","fa-file-import","fa-fw")
    button.appendChild(idiomatic)
    button.title = "Browse Files"
    button.style.cssText = `
    height: 32px;
    width: 36px;
    margin-left: 5px;
    margin-right: 1px;
    display: inline;`
    button.addEventListener("click", (event) => {
        fp = new FilePicker({ //thanks ipso
            type: "imagevideo",
            current: elem.value,
            callback: path => {
                elem.value = path;
            }
        });
        return fp.browse();
    });
   elem.insertAdjacentElement("afterend",button)
}
  function OpenFrameViewer(obj){
      new FrameViewer(obj.link,{title:obj.title||"Incoming Transmission..."}).render(true);
  }
async function _timer(ms) {return new Promise(res => setTimeout(res, ms))}
async function _cornerdisplay(lines, prefix = "//"){
    var id = foundry.utils.randomID(10)
    function _displaytype(text){
        el = document.createElement("p")
        document.getElementById(id).appendChild(el);
        new TypeIt(el, {
            strings: text,
            speed: 15,
            waitUntilVisible: true,
            cursor: false,
          }).go();
        }
    var overlay = document.createElement("div");
    overlay.id = id;
    overlay.style.position = "fixed";
    overlay.style.top = "40px";
    overlay.style.right = "0";
    overlay.style.color = "white";
    overlay.style.padding = "10px";
    overlay.style.zIndex = "99";
    overlay.style.height = "400px";
    overlay.style.left = "80px";
    document.body.appendChild(overlay);
    await _timer(40)
    lines.forEach(async element => {
        _displaytype(prefix+element)
        await _timer(1500)   
    });
    return overlay
}
function InteractiveMessage(msg){ //whatever you send through this will be received only by the GM.
  if (game.user.isGM) {
    ui.notifications.info(`Message Callback: ${msg}`) //this allows GM to check locally whether message works
  } else {
    game.socket.emit("module.moss-lancer", {
      type:"interactivemsg",
      content:msg
    }) 
  }
}