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
    class Wire {
        constructor(length = 10, spacing = 30, startX = 0, startY = 0) {
            this.totalPowerUpsUsed = powerUps.totalUsed //used to track if the player has picked up a power up
            this.segments = [];
            this.spacing = spacing;
            this.bendFactor = 2
            this.friction = 0.5;
            this.color = "#000"
            this.gravity = 0.6;
            this.setPhysics()

            for (let i = 0; i < length; i++) {
            // Initialize everything at the start position to prevent the "velocity explosion"
            this.segments.push({ x: startX, y: startY, oldX: startX, oldY: startY });
            }
        }
        setPhysics() {
            this.friction = 0.5;
            this.color = "#000"
            this.gravity = 0.6;
            // this.spacing = 30

            if (tech.isLaserWire) {
            this.gravity = 0
            this.color = tech.laserColor || "rgba(255,0,0,1)"
            }
            if (tech.isMycelium) {
            this.gravity = -0.1
            }
            if (tech.isChitin) {
            this.friction = 0.66 //makes it move aggressively
            this.bendFactor = 1.88 //adds a wiggle to the wire
            }
            // if (tech.isCutTimeStop) { }
        }
        grow() {
            // let last2 = this.segments[this.segments.length - 2];
            // const unit = Vector.normalise(Vector.sub(last, last2))
            // const space = Vector.rotate(Vector.mult(unit, 0.5 * this.spacing), 0 + 1 * Math.random())
            let last = this.segments[this.segments.length - 1];
            this.segments.push({ x: last.x, y: last.y, oldX: last.x, oldY: last.y });
            if (tech.isMycelium && Matter.Query.point(map, this.segments[this.segments.length - 1]).length === 0) {
            b[tech.isSporeFlea ? "flea" : tech.isSporeWorm ? "worm" : "spore"](this.segments[this.segments.length - 1])
            }
        }
        update(anchorX, anchorY) {
            if (powerUps.totalUsed > this.totalPowerUpsUsed) {
            this.totalPowerUpsUsed++
            if (this.segments.length < 200) { //cap max length at 200 for performance
                this.grow()
                if (tech.isCutTimeStop) this.grow()
            }
            }
            if (tech.isMycelium && this.segments.length < 10 && simulation.cycle % 60 === 0 && !m.isTimeDilated && m.fieldCDcycle < m.cycle) this.grow() //
            for (let i = 0; i < this.segments.length; i++) {
            let p = this.segments[i];
            if (i === 0) {
                p.x = anchorX;
                p.y = anchorY;
            } else {
                let vx = (p.x - p.oldX) * this.friction, vy = (p.y - p.oldY) * this.friction;
                p.oldX = p.x;
                p.oldY = p.y;
                p.x += vx;
                p.y += vy + this.gravity;
            }
            }
            // Constraints logic, keeps length constant
            for (let i = 1; i < this.segments.length; i++) {
            let p = this.segments[i], prev = this.segments[i - 1];
            let dx = p.x - prev.x, dy = p.y - prev.y;
            let distance = Math.sqrt(dx * dx + dy * dy) + 0.01;
            let difference = (this.spacing - distance) / distance;

            // We only move the "child" segment, not the "parent" 
            // This keeps the chain moving downward from the head
            p.x += dx * difference;
            p.y += dy * difference;

            // Centripetal Pull: Each segment tries to stay slightly closer to the anchor
            // const pullStrength = 0.05 * (i / this.segments.length);
            // p.x += (anchorX - p.x) * pullStrength * (1 - i / this.segments.length);
            // p.y += (anchorY - p.y) * pullStrength * (1 - i / this.segments.length);
            }

            //prevent sharp bends
            // if (!tech.isCutTimeStop) {
            const rigidity = 0.5; // 0 (loose) to 1 (stiff rod), at 2 it looks cool, like electric, also - numbers are fun
            const bendDist = this.spacing * this.bendFactor;
            for (let i = 2; i < this.segments.length; i++) {
            let p = this.segments[i], pPrev2 = this.segments[i - 2];
            let dx = p.x - pPrev2.x, dy = p.y - pPrev2.y;
            let distance = Math.sqrt(dx * dx + dy * dy) || 1;

            //how far it is from being a straight line
            let difference = (bendDist - distance) / distance;
            p.x += dx * difference * rigidity;
            p.y += dy * difference * rigidity;
            }

            this.draw()

            //fiber optic
            if (tech.isLaserWire && this.segments.length > 4) {
            const ultimate = this.segments[this.segments.length - 1], penultimate = this.segments[this.segments.length - 2]
            const unit = Vector.normalise(Vector.sub(ultimate, penultimate))
            const exit = {
                x: ultimate.x - 10 * unit.x,
                y: ultimate.y - 10 * unit.y
            }
            //if exit in inside map or blocks dont' fire
            if (Matter.Query.ray([...map, ...body], exit, ultimate).length === 0) {
                b.laser(exit, {
                    x: ultimate.x + 5000 * unit.x,
                    y: ultimate.y + 5000 * unit.y
                }, tech.laserDamage, tech.laserReflections, false, 1, (tech.laserColor || "#f00"));

                // laser(where, whereEnd, damage = tech.laserDamage, reflections = tech.laserReflections, isThickBeam = false, push = 1, laserColor = tech.laserColor) {
            }
            }

            // check for collisions with mobs
            if (!m.isTimeDilated) {
            for (let i = 1; i < this.segments.length - 1; i++) {
                let hit = Matter.Query.ray(mob, this.segments[i], this.segments[i + 1])
                if (hit.length && !hit[0].body.isUnblockable) {
                if (tech.isChitin) { //tail segments past the collisions point are made into worms
                    hit = hit[0].body
                    for (let j = Math.max(1, i); j < this.segments.length - 1; j++) {
                    b.worm({ x: this.segments[j].x, y: this.segments[j].y })
                    }
                }
                if (tech.isCutTimeStop) { //pause time
                    m.isTimeDilated = true
                    const cutIndex = Math.min(Math.max(2, i), this.segments.length - 1)
                    const long = this.segments.length - cutIndex
                    simulation.ephemera.push({
                    name: `wireTimer#${simulation.ephemera.length}`,
                    wireArray: tech.wire.segments.slice(cutIndex), //this should be the part of the wire that is recently cut
                    cycle: 10 + 2 * Math.min(100, long),
                    do() {
                        m.immuneCycle = m.cycle + 10;
                        m.isTimeDilated = true;
                        // Draw the background time-stop effect
                        ctx.globalCompositeOperation = "saturation";
                        ctx.fillStyle = "#ccc";
                        ctx.fillRect(-50000, -50000, 100000, 100000);
                        ctx.globalCompositeOperation = "source-over";
                        function sleep(who) {
                        for (let i = 0, len = who.length; i < len; ++i) {
                            if (!who[i].isSleeping) {
                            who[i].storeVelocity = who[i].velocity;
                            who[i].storeAngularVelocity = who[i].angularVelocity;
                            }
                            Matter.Sleeping.set(who[i], true);
                        }
                        }
                        sleep(mob);
                        sleep(body);
                        sleep(bullet);
                        simulation.cycle--;
                        //draw the wire timer
                        ctx.beginPath()
                        ctx.strokeStyle = "#ff0";
                        ctx.lineWidth = 6;
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";
                        ctx.moveTo(this.wireArray[0].x, this.wireArray[0].y);
                        for (let i = 1; i < this.wireArray.length - 1; i++) {
                        const xc = (this.wireArray[i].x + this.wireArray[i + 1].x) / 2;
                        const yc = (this.wireArray[i].y + this.wireArray[i + 1].y) / 2;
                        ctx.quadraticCurveTo(this.wireArray[i].x, this.wireArray[i].y, xc, yc);
                        }
                        ctx.lineTo(this.wireArray[this.wireArray.length - 1].x, this.wireArray[this.wireArray.length - 1].y);
                        ctx.stroke();
                        //shorten the length of the array
                        this.cycle--
                        if (this.cycle < 1 && (this.cycle % 2 === 0)) {
                        this.wireArray.pop()
                        if (this.wireArray.length <= 0) {
                            simulation.removeEphemera(this.name);
                            m.wakeCheck();
                        }
                        }
                    },
                    });
                } else if (!tech.isChitin && tech.wire.segments.length > 3) { //fade out lost tail segments
                    simulation.ephemera.push({
                    name: `wire#${simulation.ephemera.length}`,
                    wireArray: tech.wire.segments.slice(i), //this should be the part of the wire that is recently cut
                    cycle: 60,
                    do() {
                        //draw the wire timer
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0,0,0,${this.cycle / 60})`;
                        ctx.lineWidth = 3;
                        ctx.lineCap = "round";
                        ctx.lineJoin = "round";
                        ctx.moveTo(this.wireArray[0].x, this.wireArray[0].y);
                        for (let i = 1; i < this.wireArray.length - 1; i++) {
                            const xc = (this.wireArray[i].x + this.wireArray[i + 1].x) / 2;
                            const yc = (this.wireArray[i].y + this.wireArray[i + 1].y) / 2;
                            ctx.quadraticCurveTo(this.wireArray[i].x, this.wireArray[i].y, xc, yc);
                        }
                        ctx.lineTo(this.wireArray[this.wireArray.length - 1].x, this.wireArray[this.wireArray.length - 1].y);
                        ctx.stroke();

                        //shorten the length of the array
                        this.cycle--
                        if (this.cycle < 1) simulation.removeEphemera(this.name);
                    },
                    });
                }
                this.segments.length = Math.max(2, i - 1)
                }
            }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.segments[0].x, this.segments[0].y);
            for (let i = 1; i < this.segments.length - 1; i++) {
            const xc = (this.segments[i].x + this.segments[i + 1].x) / 2;
            const yc = (this.segments[i].y + this.segments[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.segments[i].x, this.segments[i].y, xc, yc);
            }
            ctx.lineWidth = 6;
            ctx.strokeStyle = this.color
            ctx.stroke();
        }
    }
};