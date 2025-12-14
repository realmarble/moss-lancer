class WarningAirforce extends SFX{
  constructor(context = {
    Callsigns : [
      "ROMMEL",
      "MANNERHEIM",
      "SALADIN",
      "ARMINIUS",
      "ATTILA"
    ],
    TeamName : "THE 5 HERALDS",
    EmployerName : "GRAND GENERAL O/S",
    Stripes: false
  }){
    super(context)
  }
  async Play(){
    if (this.context.Stripes){new WarningStripes().Play()}
    let style = _addstyle(`@import url(https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap);@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap);.centered{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#fff;border:16px solid #000;font-family:'Ubuntu Mono',monospace}`)
    let container = document.createElement("div");
    container.classList.add("centered");
    container.style.borderWidth = "0px"; //clean unnecessary border
    let employerstring = document.createElement("h1");
    let teamstring = document.createElement("h1");
    teamstring.style.fontSize = "4em";
    let teamcontainer = document.createElement("div");
    container.appendChild(employerstring);
    employerstring.style.textAlign = "center";
    teamstring.style.textAlign = "center";
    container.appendChild(teamstring);
    container.appendChild(teamcontainer);
    teamcontainer.style.display = "flex";
    teamcontainer.style.justifyContent = "space-evenly";
    this.context.Callsigns.forEach((element) => {
      let p = document.createElement("p");
      p.style.padding = "10px";
      new TypeIt(p, {
        strings: element,
        speed: 15,
        waitUntilVisible: true,
        cursor: false,
      }).go();
      teamcontainer.appendChild(p);
    });
    new TypeIt(teamstring, {
      strings: this.context.TeamName,
      speed: 15,
      waitUntilVisible: true,
      cursor: false,
    }).go();
    new TypeIt(employerstring, {
      strings: this.context.EmployerName,
      speed: 15,
      waitUntilVisible: true,
      cursor: false,
    }).go();
    document.body.appendChild(container);
    container.style.transition = "1.5s";
    await _timer(5000);
    container.style.opacity = "0";
    await _timer(1500);
    container.remove();
    style.remove()
  }
}
WarningAirforce.register()