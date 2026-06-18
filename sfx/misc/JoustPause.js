class JoustPause extends foundry.applications.ui.GamePause {
  /** override */
  async _prepareContext(_options) {
    console.log("JoustPause", context);
    return context;
  }

  /** override */
  _replaceHTML(result, content, _options) {
    super._replaceHTML(result, content, _options);
    content.innerHTML = `<h1 style="font-family: 'Vina Sans', cursive; font-size: 12em; color: darkgray;">JOUST.</h1>`;
    content.style.background = "#000";
    console.log(content);
  }
}