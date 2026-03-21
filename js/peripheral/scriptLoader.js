setTimeout(() => {
  fileLoads.isScriptLoaderJS = true; //for file handling in fileTester.js
}, 10);

//load script loader
const scripts = [
  { 
    name: 'Minimap',
    url: 'js/peripheral/userscripts/minimap.js',
    loaded: false,
    attempt: 0,
    afterLoad() {},
    title: `This adds a minimap to the game, showing the player's position and the layout of the level.`
  },
  {
    name: 'c-gon maps',
    url: null, /* was thinking about adding a separate file that allows the user to load c-gon's cool maps,
    but then realized that CoalDeficit was probably still mad at me for adding them without asking first,
    so I decided that this would instead throw a message without loading anything external.
    If you want to try the maps out, play c-gon instead.
    And maybe follow CoalDeficit on GitHub (and anywhere else) while you're at it! :)
      -R3d5t0ne_GUY
    */
    loaded: false,
    attempt: 0,
    afterLoad() {
      window.alert(`NOTICE: C-GON MAPS HAVE BEEN REMOVED BY THE REQUEST OF CoalDeficit\n
If you want to play in them, check out c-gon, an awesome n-gon mod they made!`)
    },
    title: `Throws a message about c-gon's maps. Does nothing else.`
  },
  {
    name: 'Console',
    afterLoad() {
      eruda.init();
    },
    title: `Opens a browser console for those without Dev Tool access`
  },
  {
    name: 'n-spider',
    afterLoad() {
      requestAnimFrames(10, spiderInit)
    },
    title: `hopefully you don't have arachniphobia`
  }
];
const container = document.createElement('div');
container.id = 'scriptLoaderContainer';
container.style.position = 'fixed';
container.style.height = "fit-content"
container.style.top = '20px';
container.style.right = '20px';
container.style.width = '300px';
container.style.backgroundColor = '#1e1e1e';
container.style.border = '1px solid #444';
container.style.borderRadius = '8px';
container.style.boxShadow = '0 0 15px rgba(0,0,0,0.5)';
container.style.zIndex = '999999';
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.overflow = 'hidden';
container.style.fontFamily = document.body.style.fontFamily;
container.style.color = '#e0e0e0';
container.style.userSelect = 'none';
container.style.cursor = 'auto';

const header = document.createElement('div');
header.style.padding = '10px';
header.style.backgroundColor = '#333';
header.style.color = 'white';
header.style.cursor = 'grab';
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.alignItems = 'center';
header.style.userSelect = 'none';

const title = document.createElement('span');
title.textContent = 'Script Loader';
title.style.fontWeight = 'bold';
header.appendChild(title);

const controls = document.createElement('div');
controls.style.display = 'flex';
controls.style.gap = '8px';

const closeBtn = document.createElement('button');
closeBtn.textContent = '×';
closeBtn.style.background = 'transparent';
closeBtn.style.border = 'none';
closeBtn.style.color = 'white';
closeBtn.style.cursor = 'pointer';
closeBtn.style.fontSize = '18px';
closeBtn.style.lineHeight = '1';
closeBtn.title = `Click to close\nthe script loader`;
closeBtn.onclick = function() {
  document.body.removeChild(container);
};
controls.appendChild(closeBtn);
header.appendChild(controls);

const content = document.createElement('div');
content.style.padding = '15px';
content.style.display = 'flex';
content.style.flexDirection = 'column';
content.style.gap = '10px';
scripts.forEach(script => {
  script.loaded = false;
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.alignItems = 'center';
  btnContainer.style.gap = '10px';

  const btn = document.createElement('button');
  btn.textContent = script.name;
  btn.style.flex = '1';
  btn.style.padding = '8px';
  btn.style.backgroundColor = '#3a3a4a';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '4px';
  btn.style.cursor = 'pointer';
  btn.style.transition = 'all 0.2s';
  btn.title = script.title;

  const statusIcon = document.createElement('span');
  statusIcon.style.width = '20px';
  statusIcon.style.textAlign = 'center';

  btn.onmouseover = () => btn.style.backgroundColor = '#4a4a4a';
  btn.onmouseout = () => btn.style.backgroundColor = '#3a3a4a';

  btn.onclick = function() {
    if (!btn.disabled) {
      btn.disabled = true;
      btn.style.backgroundColor = '#2a2a2a';
      statusIcon.textContent = '⏳';
      btn.style.cursor = 'wait';
      let isLocal = false;
      let r = undefined;
      try {
        r = document.createElement('script');
        r.src = script.url;
        isLocal = true;
      } catch (err) {
        r = new XMLHttpRequest();
        r.open("GET", script.url, true);
      }
      if (script.url && script.url) {
        if (isLocal) {
          if (script.attempt < 1) {
            try {
              document.body.appendChild(r);
              r.onload = () => {
                statusIcon.textContent = '✓';
                statusIcon.style.color = '#4CAF50';
                btn.style.cursor = 'not-allowed';
                script.loaded = true;
                btn.disabled = true;
                if (script.afterLoad) {
                  script.afterLoad();
                }
                setTimeout(() => {
                  try {
                    btnContainer.removeChild(btn);
                    btnContainer.removeChild(statusIcon);
                    content.removeChild(btnContainer);
                  } catch (err) {
                    console.error("Error removing button:", err);
                  }
                }, 500);
                setTimeout(() => {
                  let areAllLoaded = true; //initialize as true
                  for (let i = 0, len = scripts.length; i < len; i++) {
                    if (!scripts[i].loaded) { //if any scripts aren't loaded, set to false
                      areAllLoaded = false;
                    }
                  }
                  if (areAllLoaded) { //only auto-close window if all scripts are loaded
                    document.body.removeChild(container);
                  }
                }, 500);
              }
            } catch (e) {
              statusIcon.textContent = '✗';
              statusIcon.style.color = '#F44336';
              console.error('Error executing script:', e);
              window.alert(`Error executing script:
${e.message}`);
              btn.style.cursor = 'pointer';
              script.attempt++;
            }
            btn.disabled = false;
            btn.style.backgroundColor = '#3a3a3a';
          } else {
            script.loaded = true;
          }
        } else {
          r.onloadend = function(oEvent) {
            if (script.attempt < 1) {
              if (r.status === 200) {
                try {
                  new Function(r.responseText)();
                  statusIcon.textContent = '✓';
                  statusIcon.style.color = '#4CAF50';
                  btn.style.cursor = 'not-allowed';
                  script.loaded = true;
                  btn.disabled = true;
                  if (script.afterLoad) {
                    script.afterLoad();
                  }
                  setTimeout(() => {
                    try {
                      btnContainer.removeChild(btn);
                      btnContainer.removeChild(statusIcon);
                      content.removeChild(btnContainer);
                    } catch (err) {
                      console.error("Error removing button:", err);
                    }
                  }, 500);
                  setTimeout(() => {
                    let areAllLoaded = true; //initialize as true
                    for (let i = 0, len = scripts.length; i < len; i++) {
                      if (!scripts[i].loaded) { //if any scripts aren't loaded, set to false
                        areAllLoaded = false;
                      }
                    }
                    if (areAllLoaded) { //only auto-close window if all scripts are loaded
                      document.body.removeChild(container);
                    }
                  }, 500);
                } catch (e) {
                  statusIcon.textContent = '✗';
                  statusIcon.style.color = '#F44336';
                  console.error('Error executing script:', e);
                  btn.style.cursor = 'pointer';
                  script.attempt++;
                }
              } else {
                statusIcon.textContent = '✗';
                statusIcon.style.color = '#F44336';
                console.error('Failed to load script:', script.url);
                btn.style.cursor = 'pointer';
                script.attempt++;
              }
              btn.disabled = false;
              btn.style.backgroundColor = '#3a3a3a';
            } else {
              script.loaded = true;
            }
          };
          r.onerror = function() {
            statusIcon.textContent = '✗';
            statusIcon.style.color = '#F44336';
            btn.disabled = false;
            btn.style.backgroundColor = '#3a3a3a';
          };
          r.send();
          //btn.style.cursor = 'pointer';
          //}

        }
      } else {
        if (script.afterLoad) {
          script.loaded = true
          script.afterLoad();
        }
        setTimeout(() => {
          try {
            btnContainer.removeChild(btn);
            btnContainer.removeChild(statusIcon);
            content.removeChild(btnContainer);
          } catch (err) {
            console.error("Error removing button:", err);
          }
        }, 500);
      }
    }
  };
  btnContainer.appendChild(btn);
  btnContainer.appendChild(statusIcon);
  content.appendChild(btnContainer);

});
const footer = document.createElement('div');
footer.style.padding = '10px';
footer.style.backgroundColor = '#252525';
footer.style.fontSize = '12px';
footer.style.color = '#aaa';
footer.style.textAlign = 'center';
footer.textContent = 'Click buttons to load scripts';
container.appendChild(header);
container.appendChild(content);
container.appendChild(footer);

let isDragging = false;
let offsetX, offsetY;
header.addEventListener('mousedown', function(e) {
  isDragging = true;
  offsetX = e.clientX - container.getBoundingClientRect().left;
  offsetY = e.clientY - container.getBoundingClientRect().top;
  header.style.cursor = 'grabbing';
  e.preventDefault();
});
document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;

  container.style.left = (e.clientX - offsetX) + 'px';
  container.style.top = (e.clientY - offsetY) + 'px';
});
document.addEventListener('mouseup', function() {
  isDragging = false;
  header.style.cursor = 'grab';
});