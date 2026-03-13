setTimeout(() => {
    fileLoads.isLocalSavesJS = true;
}, 10);

const localSaveDiv = document.getElementById("localSave-div"), fileStatusDiv = document.getElementById("file-status-div")

const localSaves = {
  clearStatus() {
    fileStatusDiv.innerHTML = ""
  },
  defaultMenu() {
    let text = `<input type="file" id="file-import" accept=".json" onchange="localSaves.onImport(event)" hidden>
<input type="button" value="Import" style="cursor:pointer;" title="Click to use your save file" onclick="localSaves.loadFile()">
<input type="button" value="Export" style="cursor:pointer;" title="Click to download your save file" onclick="localSaves.exportSettings()">
<input type="button" value="Wipe" style="color:red;cursor:pointer;" title="This cannot be undone!" onclick="localSaves.openConfirmation()">`
    localSaveDiv.innerHTML = text
  },
  exportSettings() {
    let jsonString = JSON.stringify(localSettings, null, 2);
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
    document.getElementById('file-import').click();
  },
  onImport(oevent) {
    let file = oevent.target.files[0];
    if (file) {
      let reader = new FileReader(), oldSettings = localSettings; //in case something goes wrong during import, keep current settings
      reader.onload = function (e) {
        try {
          let importedSettings = e.target.result
          importedSettings = importedSettings.parseAsJSON();
          localSettings = {}
          build.resetStorage();
          Object.assign(localSettings, importedSettings);
          // Update UI elements based on imported settings
          communityMaps.checked = localSettings.isCommunityMaps;
          hideHUD.checked = localSettings.isHideHUD;
          hideImages.checked = localSettings.isHideImages;
          healthBarMode.checked = localSettings.isDynamicHealthBar;
          bannedLevels.value = localSettings.banList;
          if (localSettings.isAllowed) {
            localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            e.target.value = ""; // Clear the file input
            console.log("Settings imported successfully!");
          } else {
            window.alert("localSettings is not allowed");
            //throw new Error("localSettings is not allowed");
          }
          fileStatusDiv.innerHTML = "<strong style='color:#00bf00;'>File imported successfully!</strong>"
        } catch (error) {
          let errorMsg = "Failed to import settings: " + error.message
          fileStatusDiv.innerHTML = "<strong style='color:red;'>ERROR IMPORTING FILE</strong>"
          console.warn(errorMsg);
          e.target.value = "";
          localSettings = oldSettings
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
<input type="button" value="Confirm Delete" style="color:red;cursor:pointer;" onclick='localSaves.wipeSave()'>
<input type="button" value="Cancel" style="cursor:pointer;" onclick='localSaves.defaultMenu()'>
`
    document.getElementById("localSave-div").innerHTML = text
  },
  wipeSave() {
    localSaves.defaultMenu()
    let oldSettings = localSettings; //in case something goes wrong during erase, keep current settings
    try {
      localSettings = {}; //reset local settings
      build.resetStorage(true); //force reset
      if (localSettings.isAllowed) {
        localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
      } else {
        console.warn("localSettings is not allowed");
      }
    } catch (error) {
      let errorMsg = "Failed to wipe save file: " + error.message
      console.warn(errorMsg);
      localSettings = oldSettings
      fileStatusDiv.innerHTML = "<strong style='color:red;'>ERROR RESETTING FILE</strong>"
      setTimeout(() =>{window.alert(errorMsg)}, 100);
    }
  }
}
Object.freeze(localSaves)

setTimeout(() => {
  localSaves.defaultMenu()
}, 1000)