setTimeout(() => {
    fileLoads.isCommandListJS = true; //for file handling in fileTester.js
}, 10);

const cmdList = {
    run: {
      checkSyntax(input) {
        let pos = [input.indexOf("{"), input.lastIndexOf("}")];
        if (input.replace(/\s/g, "").startsWith("function(){")) {
          let trailing = input.slice(pos[1] + 1), evalString = trailing.replace(/\s/g, "")
          if (evalString === "" || evalString.startsWith("//") || trailing.trim().startsWith("/*")) {
            let invalidPhrases = ["document", "EventListener", "innerHTML", "outerHTML", "getElementsBy", "getElementBy", "prototype", "createElement",
              "appendChild", "removeChild", "eval", "runTemp", "const ", "cmdList", "resetStorage", "defaultGameVars", "resetGame", "eruda", "localSaves",
            ], isInvalid = false, regExpTest = /cmdConsole(?!\.history)/;
            //this command should NOT access or alter HTML DOM, nor should it alter JS prototypes or request other commands, for security reasons
            isInvalid = regExpTest.test(input) || invalidPhrases.some(i => input.includes(i))
            if (isInvalid) {
              return [false, `<strong class='color-var'>/run</strong> should NOT access any of the following:
              <ul>
              	<li>HTML DOM</li> <li>JS Prototypes</li> <li>Command Execution</li> <li>Event Listeners</li> <li>Declaring const</li>
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
        ((f, x1, x2) => {
          return eval(f.substring(x1, x2));
        })(input, input.indexOf("{") + 1, input.lastIndexOf("}"));
      },
      description: `Allows the user to run JavaScript without needing to open their Dev Tools.
      <br><strong>SYNTAX:</strong> /run function() {<br><em>//input code to run here</em><br>}
      `
    },
    help: {
      checkSyntax(input) {
        cmdConsole.params = input.split(/\s+/)
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
          result += "</ul><br>Click each of the command names above to view their info (must be in pause menu to do this)"
          simulation.inGameConsole(result, 600)
        } else {
          let item = cmdList[input] || cmdList.help
          if (item) {
            let helpText = (item.descriptionFunction ? item.descriptionFunction() : item.description)
            if (helpText) {
              simulation.clearConsole();
              simulation.inGameConsole(helpText, 600)
            } else {
              throw new ReferenceError(`<strong class='color-var'>${input}</strong>.description is not defined`)
            }
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
        cmdConsole.params = input.split(/\s+/)
        if (cmdConsole.params.length === 4) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>spawn</strong> requires exactly four parameters"]
        }
      },
      effect(input) {
        cmdConsole.params = input.split(/\s+/)
        let types = ["mob", "boss", "powerUp"], fullMobList = spawn.tier.flat(),
          fullBossList = spawn.bossTier.flat().concat(spawn.reactorBossList), fullPowerUpList = powerUps.fullPowerUpList.flat(),
          what = cmdConsole.params[1], fullCatalog = [fullMobList, fullBossList, fullPowerUpList]
        if (types.includes(cmdConsole.params[0])) {
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
      <br><strong>SYNTAX:</strong> /spawn <em>&lt;type (mob|boss|powerUp)&gt; &lt;name&gt; &lt;where (x &amp; y)&gt;</em>`
    },
    give: {
      checkSyntax(input) {
        cmdConsole.params = input.split(/\s+/)
        if (0 < cmdConsole.params.length && cmdConsole.params.length < 4) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>give</strong> requires between one and three parameters"]
        }
      },
      effect(input) {
        cmdConsole.params = input.split(/\s+/)
        let what = cmdConsole.params[0], qnty = 0;
        if (what === "tech") {
          if (cmdConsole.params.length > 1) {
            qnty = Math.max(1, parseInt(eval(cmdConsole.params[2]) || 0))
            let techName = cmdConsole.params[1].replaceAll("_", " ")
            if (tech.tech.findIndex(i => i.name === techName) > -1) {
              for (let i = 0; i < qnty; i++) tech.giveTech(techName)
            } else {
              throw new ReferenceError(`<strong>${techName}</strong> is not a known <strong class='color-var'>tech</strong> name`)
            }
          } else {
            throw new ArgumentError(`<strong class='color-var'>give</strong> can have no less than two parameters for this case`)
          }
        } else if (["ammo", "coupling", "research"].includes(what)) {
          qnty = Math.max(1, parseInt(eval(cmdConsole.params[1]) || 0))
          if (cmdConsole.params.length < 3) {
            switch (what) {
              case "ammo":
                let munitionType = b.guns[b.activeGun].ammoType
                if (b.inventory.length > 0 && ((munitionType != "health" && munitionType != "energy") ? (b.guns[b.activeGun][munitionType] !== Infinity) : false)) {
                  b.guns[b.activeGun][munitionType] += qnty
                }
                break;
              case "coupling":
                m.couplingChange(qnty)
                break;
              case "research":
                powerUps.research.changeRerolls(qnty)
                break;
              default:
                break;
            }
          } else {
            throw new ArgumentError(`<strong class='color-var'>give</strong> can have no more than two parameters for this case`)
          } 
        } else {
          throw new ReferenceError(`<strong class='color-var'>${what}</strong> is not a known object`)
        }
      },
      description: `Gives the player ammo, research, coupling, or tech
      <br><strong>SYNTAX:</strong> /give <em>&lt;what (ammo|coupling|research|tech)&gt; {&lt;name (if tech)&gt; | [quantity (if not tech)]} [quantity (if tech)]</em>`
    },
    warp: {
      checkSyntax(input) {
        cmdConsole.params = input.split(/\s+/)
        if (cmdConsole.params.length < 2) {
          return [true, ""]
        } else {
          return [false, "<strong class='color-var'>warp</strong> requires no more than one parameter"]
        }
      },
      effect(input) {
        cmdConsole.params = input.split(/\s+/)
        let newLevel = cmdConsole.params[0]
        if (!newLevel || level.fullLevelList[newLevel]) {
          powerUps.warp[newLevel ? 'load' : 'effect'](newLevel)
        } else {
          throw new ReferenceError(`<strong class='color-var'>${newLevel}</strong> is not a known level`);
        }
      },
      description: `If a level name is provided, takes the player to that level.
      <br>Otherwise, opens the <strong class='color-warp'>warp</strong> menu
      <br><strong>SYNTAX:</strong> /warp <em>[levelName]</em>`
    }
  } //will expand the list