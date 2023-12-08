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
  function RenderApplication(object){
    object.render(true)
  }