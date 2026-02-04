const jsSrcs = [
  {
    name: "Initialization",
    src: 'js/loading/init.js'
  },
  {
    name: "On Load Ended",
    src: 'js/loading/onLoadEnd.js'
  },
  {
    name: "Matter",
    src: 'lib/matter.min.js'
  },
  {
    name: "Howler",
    src: 'lib/howler.js'
  },
  {
    name: "Local Saves",
    src: 'js/peripheral/localSaves.js'
  },
  {
    name: "Prototypes",
    src: 'lib/prototypes.js'
  },
  {
    name: "Simulation",
    src: "js/core/simulation.js"
  },
  {
    name: "Player",
    src: "js/entities/player.js"
  },
  {
    name: "PowerUp",
    src: "js/entities/powerup.js"
  },
  {
    name: "Tech",
    src: "js/tech.js"
  },
  /* {
    name: "Wire",
    src: "js/entities/wire.js"
  }, */
  {
    name: "Bullet",
    src: "js/entities/bullet.js"
  },
  {
    name: "Mob",
    src: "js/entities/mob.js"
  },
  {
    name: "Spawn",
    src: "js/entities/spawn.js"
  },
  {
    name: "Level Handler",
    src: "js/level/levelHandler.js"
  },
  {
    name: "Main Levels",
    src: "js/level/mainLevels.js"
  },
  {
    name: "Training Levels",
    src: "js/level/trainingLevels.js"
  },
  {
    name: "Community Levels",
    src: "js/level/communityLevels.js"
  },
  {
    name: "Lore Levels",
    src: "js/level/loreLevels.js"
  },
  {
    name: "Removed Levels",
    src: "js/level/removedLevels.js"
  },
  {
    name: "Mod Levels",
    src: "js/level/modLevels.js"
  },
  {
    name: "Lore",
    src: "js/core/lore.js"
  },
  {
    name: "Engine",
    src: "js/core/engine.js"
  },
  {
    name: "Index",
    src: "js/core/index.js"
  },
  {
    name: "Script Loader",
    src: "js/peripheral/scriptLoader.js"
  },
  {
    name: "Audio Player",
    src: "js/peripheral/audioPlayer.js"
  },
  {
    name: "Command Console",
    src: "js/peripheral/commandConsole.js"
  },
  {
    name: "Command List",
    src: "js/peripheral/commandList.js"
  }
];
const fileLoads = { //these values are each supposed to be set in its respective .js file
  isInitJS: false,
  isOnLoadEndJS: false,
  isMatterMinJS: false,
  isHowlerJS: false,
  isLocalSavesJS: false,
  isPrototypesJS: false,
  isSimulationJS: false,
  isPlayerJS: false,
  isPowerUpJS: false,
  isTechJS: false,
  //isWireJS: false,
  isBulletJS: false,
  isMobJS: false,
  isSpawnJS: false,
  isLevelHandlerJS: false,
  isMainLevelsJS: false,
  isTrainingLevelsJS: false,
  isCommunityLevelsJS: false,
  isLoreLevelsJS: false,
  isRemovedLevelsJS: false,
  isModLevelsJS: false,
  isLoreJS: false,
  isEngineJS: false,
  isIndexJS: false,
  isScriptLoaderJS: false,
  isAudioPlayer: false,
  isCommandConsoleJS: false,
  isCommandListJS: false,
  onLoadEnd: null
};
const defaultGameVars = {}
let startBtn = document.getElementById("start-button"), trainBtn = document.getElementById("training-button"),
  experimentBtn = document.getElementById("experiment-button"), splashStart = document.getElementById("splash"),
  infoDiv = document.getElementById("info"), communityMaps = document.getElementById("community-maps"),
  hideHUD = document.getElementById("hide-hud"), hideImages = document.getElementById("hide-images"),
  bannedLevels = document.getElementById("banned")
try {
  let errors = [], dotCount = 0, text = ""
  setTimeout(() => {
    const loadText = setInterval(() => {
      text = "loading"
      text = text.padEnd(dotCount + 7, ".")
      if (dotCount < 3) text += " "
      text = text.padEnd(10, "\u00A0")
      startBtn.innerHTML = `<text x="10" y="32" font-size="12px">${text}</text>`;
      trainBtn.innerHTML = `<text x="10" y="32">${text}</text`;
      experimentBtn.innerHTML = `<text stroke='none' fill='#333' stroke-width="2" font-size="15px",
            	sans-serif" x="10" y="32">${text}</text>`;
      document.title = `n-mod (${text})`
      dotCount = (dotCount + 1) % 4
    }, 250);
    for (let i = 0; i <= jsSrcs.length; i++) {
      if (i < jsSrcs.length) { //load each .js file
        let tag = document.createElement('script'), obj = jsSrcs[i]
        tag.src = obj.src
        tag.onerror = () => { //check for syntax errors
          errors.push(obj)
        }
        setTimeout(() => {
          document.body.append(tag);
        }, 50)
      } else {
        setTimeout(() => {
          let validities = Object.values(fileLoads)
          for (let j = 0; j < validities.length - 1; j++) { //ignore the last element (fileLoads.onLoadEnd function)
            if (!validities[j] && !errors.includes(jsSrcs[j])) { //for each file not properly defined, push its source url to error list
              errors.push(jsSrcs[j]);
            }
          }
          clearInterval(loadText); //stop loading animation for buttons
          if (errors.length > 0) { //if any files are not properly defined, overwrite document with error report
            document.body.style.backgroundColor = "white";
            let text = `<h1 style="color:red"><u>ERROR LOADING THE FOLLOWING FILES:</u></h1><hr><ul>`
            errors.forEach(function (item) { //compile list of error locations
              setTimeout(() => {
                text += `<li><a href="${item.src}" target="_blank">${item.name}</a></li>`
              }, 10);
            });
            setTimeout(() => {
              text += `</ul><hr>Please define and/or fix the files at these source locations.`
              document.body.innerHTML = text
              document.title = "n-mod: FAULTY FILES DETECTED"
              favIcon.href = 'img/Error.png'
            }, 10 * errors.length + 30);
          } else {
            console.clear();
            fileLoads.onLoadEnd();
            level.populateLevelList();
            setTimeout(() => {
              Object.assign(defaultGameVars, {
                audioPlayer: audioPlayer,
                b: b,
                build: build,
                cmdConsole: cmdConsole,
                cmdList: cmdList,
                level: level,
                lore: lore,
                m: m,
                mobs: mobs,
                powerUps: powerUps,
                simulation: simulation,
                spawn: spawn,
                tech: tech,
                resetGame() {
                  let targetObjs = [audioPlayer, b, build, cmdConsole, cmdList, level, lore, m, mobs, powerUps, simulation, spawn, tech];
                  targetObjs.forEach((obj, i) => {
                    Object.assign(obj, Object.values(defaultGameVars)[i]);
                  });
                }
              });
              Object.freeze(defaultGameVars);
            }, 100);
          }
        }, 300 * Object.values(fileLoads).length + 100); //ensure .js files are loaded BEFORE attempting error check
      }
    }
    fileLoads.isFileTesterJS = true
  }, 50); /*protection against reload spamming occasionally throwing error report.
  Not as effective when reloading during bad internet connection or other sources of lag*/
} catch (error) {
  document.body.style.backgroundColor = "white";
  document.body.innerHTML = `<h1 style="color:red">UNCAUGHT ERROR:</h1><hr><u>${error}</u>`
  document.title = "n-mod: UNCAUGHT ERROR"
  favIcon.href = 'img/Error.png'
}
/*

  **************************************************************************************************
  **************************************************************************************************
  ********************************************  NOTES  *********************************************
  **************************************************************************************************
  **************************************************************************************************


  I wrote this file because previously, I kept accidentally overwriting the wrong .js file after making changes to the code.
  And when I went to test the changes made (by refreshing the index.html page in my browser, so n-gon could recognize that
  there were any changes in its code) I wouldn't know that I had saved my changes to the wrong file, until I tried running the
  game and discovered that it wouldn't run. To fix this, I decided to engineer a way for the game to attempt to load its .js
  files, see what code it's missing, and, if it detects that it's missing some of its functional code, overwrite the document
  with an error report containing the locations of the faulty/undefined files. After a couple days of testing, debugging,
  rinse and repeat, it was done. My file tester was working. Now, whenever I save changes for one file, but overwrite another
  file with them, the game will tell me that not only I have overwritten the wrong file, but also what files are faulty.

  This file will also throw the report if there are syntax errors in any of the files.

  Let me know what you think! :)

    -R3d5t0n3_GUY

*/