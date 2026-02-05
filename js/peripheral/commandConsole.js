setTimeout(() => {
  fileLoads.isCommandConsoleJS = true; //for file handling in fileTester.js
}, 10);

const cmdConsole = {
  CD_cycle: 200, //on starting the game, enter cooldown for a short time.
  CD_length: 60, //cooldown to reduce spamming
  history: [], //track history
  historyIDX: 0,	//allow cycling through history
  isHistoryInputFocused: false,
  params: [], //parameters for commands
  cmdIDX: 1,
  cachedCmd: "",
  requestCmd(string) {
    simulation.closeChatWindow();
    if (string.replace(/\s/g, "") != "") {
      if (cmdConsole.history[cmdConsole.history.length - 1] !== string) {
        document.getElementById("history").max = cmdConsole.history.length + 2
        cmdConsole.history.push(string)
      }
      document.getElementById('chat-input').value = ``
      cmdConsole.historyIDX = -1
      if (cmdConsole.CD_cycle < m.cycle) {
        cmdConsole.CD_cycle = m.cycle + cmdConsole.CD_length //enter cooldown
        cmdConsole.runCmd(string)
      } else {
        setTimeout(() => {
          simulation.lastLogTime = 0
          simulation.inGameConsole(`<strong><span style="color:red;">WOAH THERE, </span> speedster!</strong>
        <br>We notice you've been quite active in the console lately.
        <br>Please slow down your command logging or you might break our game!`, 420); //show for 7 seconds
        }, 100)
      }
    }
  },
  runCmd(string) {
    let isCommand = (string[0] === "/"), oldHTML = document.getElementById('text-log').innerHTML
    if (isCommand) {
      string = string.sanitize() //clean up whitespacing before processing. [String].sanitize is defined in /lib/prototypes.js
      string = string.slice(1) //now that we know a command was inputted, we won't need the slash at the beginning any more
      cmdConsole.params = string.split(/\s+/)
      let what = cmdConsole.params[0], item = cmdList[what], syntaxCheck = "" //the command to be executed
      if (item) { //run commands here
        try {
          string = string.slice(what.length + 1) //remove the command name from its input
          try {
            syntaxCheck = item.checkSyntax(string)
          } catch (e) {
            syntaxCheck = [false, ""]
          }
          if (syntaxCheck[0]) { //if syntax is correct
            item.effect(string); //this executes the command.
          } else { //try to retrieve SyntaxError message
            try {
              syntaxCheck = new SyntaxError(item.checkSyntax(string)[1])
            } catch (e) { //Syntax logic not defined.
              syntaxCheck = new ReferenceError(`Syntax logic${what ? " for <strong class='color-var'>" + what + "</strong>" : ""} is not defined`)
            }
            throw syntaxCheck; //throw the message
          }
        } catch (err) { //if an error occurs during execution
          document.getElementById('text-log').innerHTML = oldHTML //revert inGameConsole, in case logging occurred during execution
          simulation.lastLogTime = 0 //clear console
          setTimeout(() => {
            simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ${err.name}.
          <u>:${err.message.replaceAll("\n", "<br>")}`, 300)
          }, 100)
        }
      } else { //unknown command. Throw error
        document.getElementById('text-log').innerHTML = oldHTML //revert inGameConsole, in case logging occurred during execution
        simulation.lastLogTime = 0 //clear console
        setTimeout(() => {
          simulation.inGameConsole(`<strong style='color:red;'>ERROR:</strong> ReferenceError.
          <u>:<strong class='color-var'>${what}</strong> is not a known command`, 300)
        }, 100)
      }
    } else {
      setTimeout(() => {
        simulation.inGameConsole(`<span class='color-var'>m</span>.chat( \`${string.replaceAll("\n", "<br>")}\` )`)
      }, 100)
    }
  },
  isUpDnSwitch: false,
  switchCmd(num, setTo = false) {
    let hist = cmdConsole.history, chatInput = document.getElementById('chat-input'), historyInput = document.getElementById("history")
    if (cmdConsole.cachedCmd.replace(/\s/g, "") != "" && cmdConsole.cachedCmd !== hist[hist.length - 1]) hist.push(cmdConsole.cachedCmd);
    if (setTo) {
      cmdConsole.historyIDX = num
    } else {
      cmdConsole.historyIDX += num
    }
    if (cmdConsole.historyIDX < 0) cmdConsole.historyIDX = hist.length + 1
    cmdConsole.historyIDX = (cmdConsole.historyIDX - 1) % hist.length
    chatInput.value = hist[cmdConsole.historyIDX % hist.length] || ""
    historyInput.value = (cmdConsole.historyIDX + 1) % hist.length
  }
}