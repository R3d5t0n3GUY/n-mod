setTimeout(() => {
    fileLoads.isLocalSavesJS = true;
}, 10);

const localSaveDiv = document.getElementById("localSave-div"), fileStatusDiv = document.getElementById("file-status-div")

const localSaves = {
  clearStatus() {
    fileStatusDiv.innerHTML = ""
  },
  defaultMenu() {
    let text = `<input type="file" id="local-settings-import" accept=".json" onchange="localSaves.onImport(event)" hidden>
<input type="button" value="Import" class="custom-file-button" title="Click to use your save file" onclick="localSaves.loadFile()">
<input type="button" value="Export" class="custom-file-button" title="Click to download your save file" onclick="localSaves.exportSettings()">
<input type="button" value="Wipe" class="custom-file-button" style="color:red;" title="This cannot be undone!" onclick="localSaves.openConfirmation()">`
    localSaveDiv.innerHTML = text
  },
  exportSettings() {
    let jsonString = JSON.stringify({
      fileType: "localSettings",
      data: localSettings
    }, null, 2);
    let blob = new Blob([jsonString], { type: 'application/json' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'localSettings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  },
  loadFile() {
    document.getElementById('local-settings-import').click();
  },
  onImport(oevent) {
    let file = oevent.target.files[0];
    if (file) {
      let reader = new FileReader(), oldSettings = localSettings; //in case something goes wrong during import, keep current settings
      reader.onload = function (e) {
        try {
          let importedSettings = e.target.result
          importedSettings = importedSettings.parseAsJSON();
          if ("fileType" in importedSettings ? importedSettings.fileType === "localSettings" : false) {
            localSettings = {}
            build.resetStorage();
            Object.assign(localSettings, importedSettings);
            if (localSettings.isAllowed) {
              localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            } else {
              console.warn("localSettings is not allowed");
              //throw new Error("localSettings is not allowed");
            }
            e.target.value = ""; // Clear the file input
            localSaves.updateUI()
            console.log("Settings imported successfully!");
            fileStatusDiv.innerHTML = "<strong style='color:#00bf00;'>File imported successfully!</strong>"
            requestAnimFrames(4, () => {
              build.setDarkMode('splash-start')
            })
          } else {
            throw new TypeError("Expecting fileType of 'localSettings'")
          }
        } catch (error) {
          let errorMsg = "Failed to import settings: " + error.message
          fileStatusDiv.innerHTML = "<strong style='color:red;'>ERROR IMPORTING FILE</strong>"
          console.error(errorMsg);
          e.target.value = "";
          localSettings = oldSettings
          localSaves.updateUI()
          window.alert(errorMsg)
        }
      };
      reader.readAsText(file);
    }
  },
  openConfirmation() {
    localSaves.clearStatus()
    let text = `
<strong>This action is <span style='color:red'>IRREVERSIBLE!</span></strong>
<br>
<input type="button" value="Confirm Delete" class="custom-file-button" style="color:red;" onclick='localSaves.wipeSave()'>
<input type="button" value="Cancel" class="custom-file-button" onclick='localSaves.defaultMenu()'>
`
    localSaveDiv.innerHTML = text
  },
  updateUI() { // Update UI elements based on imported settings
    simulation.isCommunityMaps = localSettings.isCommunityMaps
    communityMaps.checked = localSettings.isCommunityMaps;
    hideHUD.checked = localSettings.isHideHUD;
    hideImages.checked = localSettings.isHideImages;
    healthBarMode.checked = localSettings.isDynamicHealthBar;
    bannedLevels.value = localSettings.banList;
  },
  wipeSave() {
    localSaves.defaultMenu()
    let oldSettings = localSettings; //in case something goes wrong during erase, keep current settings
    try {
      localSettings = { //since localSettings is declared with "let" instead of "const", this will not error
        isAllowed: oldSettings.isAllowed || false
      };
      build.resetStorage(true); //force reset. restore to defaults
      if (localSettings.isAllowed) {
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
      } else {
        console.warn("localSettings is not allowed");
      }
      requestAnimFrames(4, () => {
        build.setDarkMode('splash-start')
      }) 
    } catch (error) {
      let errorMsg = "Failed to wipe save file: " + error.message
      console.warn(errorMsg);
      localSettings = oldSettings //restore settings, since erasure failed
      fileStatusDiv.innerHTML = "<strong style='color:red;'>ERROR RESETTING FILE</strong>"
      setTimeout(() =>{window.alert(errorMsg)}, 100);
    }
    localSaves.updateUI()
  }
}
Object.freeze(localSaves) //since localSaves only stores functions

setTimeout(() => {
  localSaves.defaultMenu()
}, 1000)