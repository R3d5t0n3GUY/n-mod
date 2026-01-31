setTimeout(() => {
    fileLoads.isCommandListJS = true; //for file handling in fileTester.js
}, 10);

const cmdList = {
    run: {
      checkSyntax(input) {
        let pos = [input.indexOf("{"), input.lastIndexOf("}")];
        if (input.replace(/\s/g, "").startsWith("function(){")) {
          let trailing = input.slice(pos[1] + 1)
          if (trailing.replace(/\s/g, "") === "" || trailing.replace(/\s/g, "").startsWith("//")) {
            let invalidPhrases = ["document", "EventListener", "innerHTML", "outerHTML", "getElementsBy", "getElementBy", "prototype", "createElement",
              "appendChild", "removeChild", "eval", "runTemp", "console.", "const ", "commandList", "resetStorage", "defaultGameVars", "resetGame"], isInvalid = false, regExpTest = /cmdConsole(?!\.history)/;
            //this command should NOT access or alter HTML DOM, nor should it alter JS prototypes or request other commands, for security reasons
            isInvalid = regExpTest.test(input);
            for (let i = 0, len = invalidPhrases.length; i < len; i++) {
              let item = invalidPhrases[i]
              if (input.includes(item)) isInvalid = true
            }
            if (isInvalid) {
              return [false, `<strong class='color-var'>/run</strong> should NOT access any of the following:
              <ul>
              	<li>HTML DOM</li>
                <li>JS Prototypes</li>
                <li>Command Execution</li>
                <li>Event Listeners</li>
              </ul>`]
            } else {
              return [true, ""];
            }
          } else {
            return [false, `at "/run function... ..}&nbsp; <strong>&gt;&gt;&gt;<span style='color:red';>${trailing}</span>&lt;&lt;&lt; here</strong>`]
          }
        } else {
          let fault = input.substring(0, (pos[0] > -1 ? pos[0] + 1 : input.length - 1));
          return [false, `at "/run &nbsp; <strong>&gt;&gt;&gt;<span style='color:red';>${fault}</span>&lt;&lt;&lt; here</strong>`]
        }
      },
      effect(input) {
        let pos = [input.indexOf("{"), input.lastIndexOf("}")];
        let runTemp = () => {
          eval(input.substring(pos[0] + 1, pos[1]));
        };
        /*
        Executing JS code from a string is an EXTREME SECURITY RISK;
        With eval(), malicious code can be executed without your consent,
        and third-party code can see the scope of your application, which can possibly lead to attacks.
            -warning from W3schools.com

        I have put a trust system in place, so, HANDLE eval() WITH CARE HERE, AND DO NOT USE IT IN YOUR WEBSITES!
            -R3d5t0n3_GUY
      */
        runTemp();
      },
      description: `Allows the user to run JavaScript without needing to open their Dev Tools.
      <br><strong>SYNTAX:</strong> /run function() {<br><em>//input code to run here</em><br>}
      `
    },
    help: {
      checkSyntax(input){
        if (cmdConsole.params.length < 2) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>help</strong> can have no more than one parameter"]
        }
      },
      effect(input) {
        if (input.replace(/\s/g, "") === "") {
          let result = "<strong><u>List of available commands:</u></strong><ul>", list = Object.keys(cmdList);
          list.forEach(item => {
            result += `<li><em class='color-var help' onclick='cmdConsole.requestCmd("/help ${item}")'>${item}</em></li>`
          });
          result += "</ul><br>Click each of the command names above to view their info (must be in pause menu)"
          simulation.inGameConsole(result, 600)
        } else {
          let item = cmdList[input] || cmdList.help
          if (item) {
            let helpText = (item.descriptionFunction ? item.descriptionFunction() : item.description)
            simulation.lastLogTime = 0
            simulation.inGameConsole(helpText, 600)
          } else {
            throw new ReferenceError(`<strong class='color-var'>${input}</strong> is not a known command`)
          }
        }
      },
      description: `Explains the functionality and syntax of a given console command.
      <br><strong>SYNTAX:</strong> /help <em>[commandName]</em>`
    },
    spawn: {
      checkSyntax(input) {
        if (cmdConsole.params.length === 4) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>spawn</strong> requires exactly four parameters"]
        }
      },
      effect(input) {
        let types = ["mob", "boss", "powerUp"], fullMobList = spawn.tier.flat(),
          fullBossList = spawn.bossTier.flat(), fullPowerUpList = [], what = cmdConsole.params[1],
          fullCatalog = [], reference = Object.entries(powerUps);
        if (types.includes(cmdConsole.params[0])) {
          if (cmdConsole.params[0] === "powerUp" ) {reference.forEach(item => {
            try {
              if (item[1].name && item[1].effect) fullPowerUpList.push(item[0] || item[1].name)
            } catch (e) {}
          })}
          fullCatalog = [fullMobList, fullBossList, fullPowerUpList]
          if (cmdConsole.params[2].at(0) === "~") {
            cmdConsole.params[2] = m.pos.x + parseFloat(eval(cmdConsole.params[2].slice(1)) || 0)
          } else {
            cmdConsole.params[2] = parseFloat(eval(cmdConsole.params[2]))
          }
          if (cmdConsole.params[3].at(0) === "~") {
            cmdConsole.params[3] = m.pos.y + parseFloat(eval(cmdConsole.params[3].slice(1)) || 0)
          } else {
            cmdConsole.params[3] = parseFloat(eval(cmdConsole.params[3]))
          }
          let where = {
            x: cmdConsole.params[2],
            y: cmdConsole.params[3]
          }
          fullCatalog.forEach((list, i) => {
            if (cmdConsole.params[0] === types[i]) {
              if (list.includes(what)) {
                if (i < 2) {
                  spawn[what](where.x, where.y)
                  simulation.inGameConsole("Object successfully summoned.")
                } else {
                  powerUps.directSpawn(where.x, where.y, what)
                  simulation.inGameConsole("Object successfully summoned.")
                }
              } else {
                throw new ReferenceError(`<strong class='color-var'>${what}</strong> is not a valid ${cmdConsole.params[0]} name`)
              }
            }
          })
        } else {
          throw new ReferenceError(`<strong class='color-var'>${cmdConsole.params[0]}</strong> is not a valid entity type`)
        }
      },
      description: `Spawns an entity at a given position.
      <br><strong>SYNTAX:</strong> /spawn <em>&lt;type (mob|boss|powerUp)&gt; &lt;name&gt; &lt;position (x y)&gt;</em>`
    },
    give: {
      /* checkSyntax(input) {
        if ([2,3].includes(cmdConsole.params.length)) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>give</strong> requires two or three parameters"]
        }
      }, */
      effect(input) {

      }
    }
  } //will expand the list