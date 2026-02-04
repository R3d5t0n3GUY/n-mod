setTimeout(() => {
    fileLoads.isOnLoadEndJS = true; //for file handling in fileTester.js
}, 10);

fileLoads.onLoadEnd = function () {
    document.title = 'n-mod'
    startBtn.innerHTML = `<text x="10" y="32">start</text>`
    trainBtn.innerHTML = `<text x="10" y="32">training</text>`
    experimentBtn.innerHTML = `<text stroke='none' fill='#333' stroke-width="2" font-size="15px",
            	sans-serif" x="10" y="32">experiment</text>`
    startBtn.style.cursor = "pointer"
    trainBtn.style.cursor = "pointer"
    experimentBtn.style.cursor = "pointer"
    splashStart.innerHTML = `
            <g class="fade-in" transform="translate(100,210) scale(34)" fill='#afafaf' stroke='none'>
        <path d="M0 0  h1  v0.2  h1.7  l0.3 0.3  v2.6  h-1  v-1.7  h-1  v1.7  h-1 z" /><!--N (fill)--> 
        <rect x="4" y="1.25" width="1" height="0.5" rx='0.03' /><!--Hyphen (fill)-->
        <path class="draw-lines" transform="translate(6,0)" d="M0 0 h1  v0.2  h1  l0.3 0.3 0.3 -0.3 1.3 0 0.3 0.3 v2.6 h-.8 v-1.8 h-0.8 v1.8 h-.8 v-1.8 h-.8 v1.8 h-1 z " stroke-width='0.0875' /><!--M (fill)-->
        <path transform="translate(11.9,0) scale(1.25)" d="M0 0  h1  l 0.7 0.7  v1  l -0.7 0.7  h-1  l -0.7 -0.7  v-1  l 0.7 -0.7 Z" /><!--O (fill)-->
        <path transform="translate(15.9,0) scale(1.25)" d="M0 0  h1  l 0.3 0.3  v-2 h0.8 v4.1 h-.8 v -0.3 l -.3 .3 h-1  l -0.7 -0.7  v-1  l 0.7 -0.7 Z" /><!--D (fill)-->
      </g>
      <g transform="translate(100,210) scale(34)" fill='none' stroke='#333' stroke-linejoin="round" stroke-linecap="round">
        <path class="draw-lines-n" d="M0 0  h1  v0.2  h1.7  l0.3 0.3  v2.6  h-1  v-1.7  h-1  v1.7  h-1 z" stroke-width='0.0875' /><!--N (outline)-->
        <rect class="draw-lines-dash" x="4" y="1.25" width="1" height="0.5" stroke-width='0.0875' rx='0.03' /><!--Hyphen (outline)-->
        <path class="draw-lines-m" transform="translate(6,0)" d="M0 0  h1  v0.2  h1  l0.3 0.3 0.3 -0.3 1.3 0 0.3 0.3 v2.6 h-.8 v-1.8 h-0.8 v1.8 h-.8 v-1.8 h-.8 v1.8 h-1 z " stroke-width='0.0875' /><!--M (trace)-->
        <path class="draw-lines-o" transform="translate(11.9,0) scale(1.25)" d="M0 0  h1  l 0.7 0.7  v1  l -0.7 0.7  h-1  l -0.7 -0.7  v-1  l 0.7 -0.7 Z" stroke-width='0.07' /><!--O (outline)-->
        <path class="draw-lines-d" transform="translate(15.9,0) scale(1.25)" d="M0 0  h1  l 0.3 0.3  v-2 h0.8 v4.1 h-.8 v -0.3 l -.3 .3 h-1  l -0.7 -0.7  v-1  l 0.7 -0.7 Z" stroke-width='0.07' /><!--D (outline)-->
      </g>
        <!-- mouse -->
        <g class="draw-lines3" transform="translate(290,430) scale(0.28)" stroke-linecap="round" stroke-linejoin="round" stroke-width="10px" stroke="#333" fill="none">
            <path class="fade-in" stroke="none" fill="#fff" d="M827,112 h30 a140,140,0,0,1,140,140 v268 a140,140,0,0,1-140,140 h-60 a140,140,0,0,1-140-140v-268 a140,140,0,0,1,140-140h60" />
            <path class="fade-in" d="M832.41,106.64 V322 H651.57 V255 c0-82,67.5-148,150-148 Z" fill="rgb(0, 200, 255)" stroke="none" />
            <path d="M827,112 h30 a140,140,0,0,1,140,140 v268 a140,140,0,0,1-140,140 h-60 a140,140,0,0,1-140-140v-268 a140,140,0,0,1,140-140h60" />
            <path d="M657 317 h340 h-170 v-25 m0 -140 v-42 s 21 -59, -5 -59 S 807 7, 807 7" />
            <ellipse fill="none" cx="827.57" cy="218.64" rx="29" ry="68" />
            <ellipse fill="#fff" class="fade-in-fast" cx="827.57" cy="218.64" rx="29" ry="68" />
        </g>

        <!-- keys -->
        <g transform="translate(195,480) scale(0.8)">
            <!-- fade in background -->
            <g fill='#fff' stroke='none' class="fade-in">
                <path d="M0 60 h60 v-60 h-60 v60" class="draw-lines-box-1" />
                <path d="M70 60 h60 v-60 h-60 v60" class="draw-lines-box-2" />
                <path d="M140 60 h60 v-60 h-60 v60" class="draw-lines-box-3" />
                <path d="M0 70 h60 v60 h-60 v-60" class="draw-lines-box-1" />
                <path d="M70 70 h60 v60 h-60 v-60" class="draw-lines-box-2" />
                <path d="M140 70 h60 v60 h-60 v-60" class="draw-lines-box-3" />
            </g>
            <g fill='none' stroke='#333' stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
                <path d="M0 60 h60 v-60 h-60 v60" class="draw-lines-box-1" />
                <!-- <rect x="0" y="0" width="60" height="60" rx="10" ry="10" class="draw-lines-box-1" /> -->
                <path d="M70 60 h60 v-60 h-60 v60" class="draw-lines-box-2" />
                <path d="M140 60 h60 v-60 h-60 v60" class="draw-lines-box-3" />
                <path d="M0 70 h60 v60 h-60 v-60" class="draw-lines-box-1" />
                <path d="M70 70 h60 v60 h-60 v-60" class="draw-lines-box-2" />
                <path d="M140 70 h60 v60 h-60 v-60" class="draw-lines-box-3" />
            </g>
            <g class="draw-lines4" text-anchor="middle" stroke='#000' fill='none' stroke-width="2" font-size="38px">
                <text x="30" y="45" id="splash-previous-gun" stroke-width="2">Q</text>
                <text x="100" y="45" id="splash-up">W</text>
                <text x="170" y="45" id="splash-next-gun" stroke-width="2">E</text>
                <text x="30" y="113" id="splash-left">A</text>
                <text x="100" y="113" id="splash-down">S</text>
                <text x="170" y="113" id="splash-right">D</text>
            </g>
        </g>
        <g class="fade-in" fill="none" stroke="#aaa" stroke-width="1">
            <path d="M 254 433.5 h-35.5 v40" />
            <path d="M 295 433.5 h36.5 v40" />
            <path d="M 274 625 v-35" />
            <path d="M 430.5 442 v50 h38" />
            <path d="M 612.5 442 v50 h-38" />
        </g>
        <g class="fade-in" stroke="none" fill="#aaa" font-size="16px">
            <text x="253" y="422">switch</text>
            <text x="257" y="438">guns</text>
            <text x="255" y="638">move</text>
            <text x="420" y="438">fire</text>
            <text x="599" y="438">field</text>
        </g>
            `//when game finishes loading, start splash screen animation

    //Object.assign(fullLevelList, mainLevels, trainingLevels, communityLevels, removedLevels, modLevels, loreLevels); //populate level list
    if (localSettings) {
        communityMaps.checked = localSettings.isCommunityMaps
        hideHUD.checked = localSettings.isHideHUD
        hideImages.checked = localSettings.isHideImages
        bannedLevels.innerHTML = localSettings.banList
    }
    document.getElementById("fps-select").addEventListener("input", () => {
        let value = document.getElementById("fps-select").value
        if (value === 'max') {
            simulation.fpsCapDefault = 999999999;
        } else {
            simulation.fpsCapDefault = Number(value)
        }
        localSettings.fpsCapDefault = value
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    });

    bannedLevels.addEventListener("input", () => {
        localSettings.banList = document.getElementById("banned").value
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    });

    communityMaps.addEventListener("input", () => {
        simulation.isCommunityMaps = document.getElementById("community-maps").checked
        localSettings.isCommunityMaps = simulation.isCommunityMaps
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    });

    infoDiv.style.visibility = 'visible'
    startBtn.onclick = function () { tryRunning.start() }
    trainBtn.onclick = function () { tryRunning.training() }
    experimentBtn.onclick = function () { tryRunning.experiment() }
    splashStart.onclick = function () { tryRunning.start() }
    document.body.appendChild(container); //append script loader (created in scriptLoader.js)
};