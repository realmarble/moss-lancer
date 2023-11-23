function ShowTips(tiplist) {
  let tips = new Dialog(
    {
      title: "Buffering...",
      content: `
      <div
      id="container"
      style="
        height: 100%;
        width: 100%;
        background-color: #0c0c1d;
        font-family: 'Ubuntu Mono', monospace;
        color: white;
        text-align: center; /* adjust as needed */
        vertical-align: middle;
      "
      >
      <h1 id="tipstext"></h1>
      <button onclick="newtip()" style="width: 100%;bottom: 0;position:absolute;left: 0;">Next Tip</button>
      <script>
      tipslist=${JSON.stringify(tiplist)}
      function newtip(){
         document.getElementById("tipstext").childNodes[0].textContent = tipslist[Math.floor(Math.random()*tipslist.length)];
      }
      newtip()
      </script>
      </div>
      `,
      buttons: {},
      default: "two",
      render: () => {},
      close: (html) => {},
    },
    { width: 350, height: 200 }
  );
  tips.render(true);    
}

