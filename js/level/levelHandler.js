setTimeout(() => {
  fileLoads.isLevelHandlerJS = true; //for file handling in fileTester.js
}, 10);

let body = []; //non static bodies
let map = []; //all static bodies
let cons = []; //all constraints between a point and a body
let consBB = []; //all constraints between two bodies
let composite = [] //rotors and other map elements that don't fit 
const level = {
    fallMode: "",
    defaultZoom: 1400,
    onLevel: -1,
    levelsCleared: 0,
    isFlipped: false,
    uniqueLevels: ["initial", "flocculation", "factory", "gravitron", "reactor", "subway", "final"], //see level.populateLevels:   (initial, ... , (flocculation, factory, or gravitron), reactor, ... , subway, final)    added later
    playableLevels: ["labs", "rooftops", "skyscrapers", "warehouse", "superstructure", "highrise", "office",
                    "aerie", "satellite", "sewers", "testChamber", "pavilion", "towers", "substructure",
                     "corridor"],
    communityLevels: ["gauntlet", "stronghold", "basement", "crossfire", "vats", "ngon", "house", "perplex",
                      "coliseum", "tunnel", "islands", "temple", "dripp", "fortress", "commandeer", "clock",
                      "superNgonBros", "tlinat", "ruins", "ace", "crimsonTowers", "LaunchSite"],
    trainingLevels: ["walk", "crouch", "jump", "hold", "throw", "throwAt", "deflect", "heal", "fire",
                     "nailGun", "shotGun", "superBall", "matterWave", "missile", "stack", "mine", "grenades",
                     "harpoon"],
    removedCommunityLevels: ["lock", "reservoir", "interferometer", "diamagnetism", "run", "biohazard", "stereoMadness",
		"yingYang", "staircase", "buttonbutton", "downpour", "underpass", "cantilever", "shipwreck",
		"unchartedCave", "dojo", "arena", "flappyGon", "rings", "trial", "soft", "movers"],
    modSpecificLevels: [ "gettingOverIt", "movementTech", "descent", "split", "boundary", "bifurcate"],
    fullLevelList: {},
    populateLevelList() {
        let levelLists = [mainLevels, trainingLevels, communityLevels, removedLevels, modLevels, loreLevels]
        levelLists.forEach(item => {
            Object.assign(level.fullLevelList, item)
        });
    },
    levels: [],
    start() {
        if (level.levelsCleared === 0) { //this code only runs on the first level
            // simulation.enableConstructMode() //tech.giveTech('motion sickness')  //used to build maps in testing mode
            // simulation.difficultyMode = 1
            // build.isExperimentRun = true

            // simulation.isHorizontalFlipped = true
            // level.levelsCleared = 9
            // level.updateDifficulty()
            // tech.giveTech("performance")
            // m.maxHealth = m.health = 1//10000000
            // m.displayHealth();

            // m.maxEnergy = m.energy = 10000000
            // tech.isRerollDamage = true
            // powerUps.research.changeRerolls(99999)
            // m.immuneCycle = Infinity //you can't take damage
            // tech.tech[297].frequency = 100
            // tech.addJunkTechToPool(0.5)
            // m.couplingChange(10)
            // m.setField(7) //1 standing wave  2 perfect diamagnetism  3 negative mass  4 molecular assembler  5 plasma torch  6 time dilation  7 metamaterial cloaking  8 pilot wave  9 wormhole 10 grappling hook
            // m.energy = 0

            // m.energy = 0
            // powerUps.research.count = 3
            // tech.isHookWire = true
            // m.energy = 0
            // simulation.molecularMode = 2
            // m.takeDamage(0.1);
            // b.giveGuns("nail gun") //0 nail gun  1 shotgun  2 super balls 3 wave 4 missiles 5 grenades  6 spores  7 drones  8 foam  9 harpoon  10 mine  11 laser
            // b.giveGuns("harpoon") //0 nail gun  1 shotgun  2 super balls 3 wave 4 missiles 5 grenades  6 spores  7 drones  8 foam  9 harpoon  10 mine  11 laser
            // b.giveGuns("laser") //0 nail gun  1 shotgun  2 super balls 3 wave 4 missiles 5 grenades  6 spores  7 drones  8 foam  9 harpoon  10 mine  11 laser
            // b.guns[9].ammo = 100000000
            // tech.laserColor = "#fff"
            // tech.laserColorAlpha = "rgba(255, 255, 255, 0.5)"

            // requestAnimationFrame(() => { tech.giveTech("rebar") });
            // tech.giveTech("missile guidance")
            // tech.addJunkTechToPool(0.5)
            // for (let i = 0; i < 1; ++i) tech.giveTech("quantum Zeno effect")
            // for (let i = 0; i < 1; ++i) tech.giveTech("irradiated drones")
            // m.skin.egg();
            // for (let i = 0; i < 1; ++i) tech.giveTech("anthropic principle")
            // requestAnimationFrame(() => { for (let i = 0; i < 1; i++) tech.giveTech("surfing") });
            // requestAnimationFrame(() => { for (let i = 0; i < 1; i++) tech.giveTech("spalling") });
            // for (let i = 0; i < 1; i++) tech.giveTech("wear")
            // m.lastKillCycle = m.cycle
            // for (let i = 0; i < 7; i++) powerUps.directSpawn(450, -50, "field");
            // for (let i = 0; i < 7; i++) powerUps.directSpawn(m.pos.x + 200, m.pos.y - 250, "research", false);
            // spawn.bodyRect(575, -700, 150, 150);  //block mob line of site on testing
            // level.interferometer()
            // level.testing()
            
            level.fullLevelList[simulation.isTraining ? "walk" : "initial"]() //normal starting level **************************************************

            // for (let i = 0; i < 1; i++) spawn.finalBoss(1100 + 100 * i, -100)
            // for (let i = 0; i < 1; i++) spawn.slasher2(1100 + 100 * i, -200, 50)
            // for (let i = 0; i < 3; i++) spawn.freezer(1100 + 100 * i, -300)
            // for (let i = 0; i < 1; i++) spawn.slasher4(1100 + 100 * i, -500, 50)
            // for (let i = 0; i < 1; i++) spawn.laserLayer(1100 + 100 * i, -400, 50)
            // for (let i = 0; i < 1; i++) spawn.slasher4(1100 + 100 * i, -500, 25)
            // for (let i = 0; i < 1; i++) spawn.hopsploder(1100 + 100 * i, -500)
            // for (let i = 0; i < 1; ++i) spawn.spiderBoss(1900, -500)
            // for (let i = 0; i < 1; ++i) powerUps.directSpawn(m.pos.x + 50 * Math.random(), m.pos.y + 50 * Math.random(), "entanglement");
            // for (let i = 0; i < 2; ++i) powerUps.directSpawn(m.pos.x + 450, m.pos.y + 50 * Math.random(), "gun");
            // for (let i = 0; i < 20; ++i) powerUps.directSpawn(m.pos.x + 500 * Math.random(), m.pos.y + 500 * Math.random(), "coupling");
            // for (let i = 0; i < 2; i++) powerUps.spawn(player.position.x + Math.random() * 50, player.position.y - Math.random() * 50, "field", false);
            //lore testing
            // localSettings.isTrainingNotAttempted = true
            // simulation.isCheating = false //true;
            // for (let i = 0; i < 5; i++) tech.giveTech("undefined")
            // lore.techCount = 1
            // level.levelsCleared = 10
            // localSettings.loreCount = 1 //this sets what conversation is heard
            // localSettings.levelsClearedLastGame = 10
            // if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            // level.onLevel = -1 //this sets level.levels[level.onLevel] = undefined which is required to run the conversation
            // level.null()
            // localSettings.isHuman = true
            // tech.isNoDraftPause = false //disable pause
            // mobs.mobDeaths = 200 //to prevent pacifist mode
            // for (let i = 0; i < 13; i++) level.nextLevel(); //jump to final boss
            // lore.unlockTesting();
            // tech.giveTech("tinker"); //show junk tech in experiment mode
            // m.storeTech()
            // powerUps.spawn(m.pos.x, m.pos.y, "entanglement", false);
            // for (let i = 0; i < 4; i++) localSettings.difficultyCompleted[i] = true
            // localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
        } else {
            spawn.setSpawnList(); //picks a couple mobs types for a themed random mob spawns
            // spawn.pickList = ["focuser", "focuser"]
            level.fullLevelList[level.levels[level.onLevel]](); //picks the current map from the the levels array
            if (!simulation.isCheating && !build.isExperimentRun && !simulation.isTraining) {
                localSettings.runCount += level.levelsCleared //track the number of total runs locally
                localSettings.levelsClearedLastGame = level.levelsCleared
                if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
            }
        }
        setupCanvas()
        simulation.setupCamera(player.position);
        simulation.setZoom();
        level.addToWorld(); //add bodies to game engine
        simulation.draw.setPaths();
        b.respawnBots();
        m.resetHistory();

        tech.isDeathTechTriggered = false

        if (m.health < 0 && tech.isNoDeath) { //needed for quantum Zeno effect
            if (tech.isDeathAvoid && powerUps.research.count > 0 &&
               ((tech.deathsAvoidedThisLevel || 0) < (tech.isAnthropicExtended + 1 || 1)) ) {
                tech.deathsAvoidedThisLevel++
                m.health = 0.05
                powerUps.research.changeRerolls(-1)
                simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-r'>research</span><span class='color-symbol'>--</span><br>${powerUps.research.count}`)
                for (let i = 0; i < 16; i++) powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "heal", false);
                if (m.immuneCycle < m.cycle + 300 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1) ) m.immuneCycle = m.cycle + 300 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1) //disable this.immuneCycle bonus seconds
                simulation.wipe = function () { //set wipe to have trails
                    ctx.fillStyle = "rgba(255,255,255,0.03)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                setTimeout(function () {
                    simulation.wipe = function () { //set wipe to normal
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }
                }, 3000);
            } else {
                m.health = 0;
                m.displayHealth();
                m.death();
            }
        }
        tech.deathsAvoidedThisLevel = 0;

        if (tech.isForeverDrones) {
            if (tech.isDroneRadioactive) {
                for (let i = 0; i < tech.isForeverDrones * 0.25; i++) {
                    b.droneRadioactive({ x: m.pos.x + 30 * (Math.random() - 0.5), y: m.pos.y + 30 * (Math.random() - 0.5) }, 5)
                    bullet[bullet.length - 1].endCycle = Infinity
                }
            } else {
                for (let i = 0; i < tech.isForeverDrones; i++) {
                    b.drone({ x: m.pos.x + 30 * (Math.random() - 0.5), y: m.pos.y + 30 * (Math.random() - 0.5) }, 5)
                    bullet[bullet.length - 1].endCycle = Infinity
                }
            }
        }
        if (tech.isDarkMatter) spawn.darkMatter()
        for (let i = 0; i < tech.wimpCount; i++) {
            spawn.WIMP()
            mob[mob.length - 1].isDecoupling = true //so you can find it to remove
            for (let j = 0, len = 7; j < len; j++) powerUps.spawn(level.exit.x + 100 * (Math.random() - 0.5), level.exit.y - 100 + 100 * (Math.random() - 0.5), "research", false)
        }
      
        // if (tech.isFlipFlopLevelReset && !tech.isFlipFlopOn) {
        if ((tech.isRelay || tech.isFlipFlop) && !tech.isFlipFlopOn) {
          tech.isFlipFlopOn = true
          if (tech.isFlipFlopHealth) m.setMaxHealth()
          if (tech.isRelayEnergy) m.setMaxEnergy()
          m.eyeFillColor = m.fieldMeterColor
          simulation.inGameConsole(`tech.isFlipFlopOn <span class='color-symbol'>=</span> true`);
        }
      
        if (m.plasmaBall) m.plasmaBall.fire()
        if (localSettings.entanglement && localSettings.entanglement.levelName === level.levels[level.onLevel]) {
            const flip = localSettings.entanglement.isHorizontalFlipped === simulation.isHorizontalFlipped ? 1 : -1
            powerUps.directSpawn(flip * localSettings.entanglement.position.x, localSettings.entanglement.position.y, "entanglement", false);
        }
        if (m.fieldMode === 8) {
            Matter.Body.setPosition(m.fieldUpgrades[8].collider, m.pos);
            m.fieldPosition = { x: m.pos.x, y: m.pos.y }
            m.lastFieldPosition = { x: m.pos.x, y: m.pos.y }
        }
        if (tech.isBlockDup) {
            tech.blockDupCount = 0
            simulation.inGameConsole(`<span class='color-var'>duplicationChance</span> <span class='color-symbol'>=</span> 0 //for anyon`);
        }
        level.newLevelOrPhase()
        if (simulation.isTraining) {
            simulation.difficultyMode = 1
        } else {
            simulation.inGameConsole(`<span class='color-var'>level</span>.onLevel <span class='color-symbol'>=</span> "<span class='color-text'>${level.levels[level.onLevel]}</span>"`);
            document.title = "n-mod: " + level.levelAnnounce();
        }
        level.setConstraints()
    },
    newLevelOrPhase() { //runs on each new level but also on final boss phases
        //used for generalist and pigeonhole principle
      	if (tech.isCancelTech) {
          tech.cancelGunCount = 0
          tech.cancelFieldCount = 0
          tech.cancelTechCount = 0
          tech.canGunReroll = true
          tech.canFieldReroll = true
          tech.canTechReroll = true
        }
        tech.tokamakHealCount = 0
        tech.buffedGun++
        if (tech.buffedGun > b.inventory.length - 1) tech.buffedGun = 0;
        if ((tech.isGunCycle || tech.isGunChoice) && (b.activeGun !== null && b.activeGun !== undefined) && b.inventory.length) {
            b.inventoryGun = tech.buffedGun;
            simulation.switchGun();
        }
        // if (tech.isGunChoice && Number.isInteger(tech.buffedGun) && b.inventory.length) {
        //     var gun = b.guns[b.inventory[tech.buffedGun]].name
        //     simulation.inGameConsole(`pigeonhole principle: <strong>${(1 + 0.4 * Math.max(0, b.inventory.length)).toFixed(2)}x</strong> <strong class='color-d'>damage</strong> for <strong class="highlight">${gun}</strong>`, 600);
        // }
        if (tech.isSwitchReality && level.levelsCleared !== 0) {
            simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> ${Math.random()}`);
            m.switchWorlds("many-worlds")
            simulation.trails()
            powerUps.spawn(player.position.x + 50, player.position.y - Math.random() * 50, "tech", false);
        }
        if (tech.isHealLowHealth) {
            const len = tech.isEnergyHealth ? 5 * Math.max(0, m.maxEnergy - m.energy) : 5 * Math.max(0, m.maxHealth - m.health)
            for (let i = 0; i < len; i++) powerUps.spawn(player.position.x + 90 * (Math.random() - 0.5), player.position.y + 90 * (Math.random() - 0.5), "heal", false);
        }
        if (tech.interestRate > 0) {
            // const rate = ((level.fullLevelList[level.levels[level.onLevel]].name === "final" || level.fullLevelList[level.levels[level.onLevel]].name === "subway") ? 1 / 3 : 1) * tech.interestRate //this effect triggers extra times on these final levels
            let rate = tech.interestRate
            if (level.onLevel < level.levels.length - 1) {//make sure it's not on the lore level which has an undefined name
                const levelName = level.levels[level.onLevel]
                if (levelName === "final") rate *= 1 / 3
                if (levelName === "subway") rate *= 1 / 5
            }

            // let ammoSum = 0
            // for (let i = 0; i < b.inventory.length; i++) {
            //     if (b.guns[b.inventory[i]].ammo !== Infinity) ammoSum += b.guns[b.inventory[i]].ammo / b.guns[b.inventory[i]].ammoPack
            // }
            // if (ammoSum > 0 && b.inventory.length > 0) {
            //     const amount = Math.ceil(rate * ammoSum / b.inventory.length)
            //     powerUps.spawnDelay("ammo", amount, 4);
            //     simulation.inGameConsole(`${(rate * 100).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-g'>ammo</span> <span class='color-symbol'>=</span> ${amount > 20 ? amount + powerUps.orb.ammo(1) : powerUps.orb.ammo(amount)}`)
            // }

            // if (b.activeGun !== null && b.activeGun !== undefined && b.guns[b.activeGun].ammo !== Infinity) {
            //     const ammoPerOrb = b.guns[b.activeGun].ammoPack
            //     const a = Math.ceil(rate * b.guns[b.activeGun].ammo / ammoPerOrb)
            //     powerUps.spawnDelay("ammo", a, 4);
            //     simulation.inGameConsole(`${(rate * 100).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-g'>ammo</span> <span class='color-symbol'>=</span> ${a > 20 ? a + powerUps.orb.ammo(1) : powerUps.orb.ammo(a)}`)
            // }
            if (powerUps.research.count > 0) {
                const r = Math.ceil(rate * powerUps.research.count)
                simulation.inGameConsole(`${(rate * 100).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-r'>research</span> <span class='color-symbol'>=</span> ${r > 20 ? r + powerUps.orb.research(1) : powerUps.orb.research(r)}`)
                powerUps.spawnDelay("research", r, 4);
            }
            if (m.coupling > 0) {
                const c = Math.ceil(0.5 * rate * m.coupling)
                powerUps.spawnDelay("coupling", c, 4);
                simulation.inGameConsole(`${(rate * 100).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-coupling'>coupling</span> <span class='color-symbol'>=</span> ${c > 20 ? c + powerUps.orb.coupling(1) : powerUps.orb.coupling(c)}`)
            }
            // const healPerOrb = (powerUps.heal.size() / 40 / (simulation.healScale ** 0.25)) ** 2
            // const h = Math.ceil(rate * m.health / healPerOrb)
            // powerUps.spawnDelay("heal", h, 4);
            // simulation.inGameConsole(`${(rate * 100).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-h'>health</span> <span class='color-symbol'>=</span> ${h > 20 ? h + powerUps.orb.heal(1) : powerUps.orb.heal(h)}`)

            // trying to spawn smaller heals
            // const healPerOrb = (powerUps.heal.size() / 40 / (simulation.healScale ** 0.25)) ** 2
            // console.log(healPerOrb)
            // let h = tech.interestRate * m.health / healPerOrb
            // console.log(tech.interestRate, m.health, healPerOrb, h)
            // const overHeal = h - Math.floor(h)
            // powerUps.spawn(m.pos.x, m.pos.y, "heal", true, null, Math.max(0.25, overHeal) * 40 * (simulation.healScale ** 0.25))
            // if (h > healPerOrb) powerUps.spawnDelay("heal", h);
            // simulation.inGameConsole(`${(Math.ceil(tech.interestRate * 100)).toFixed(0)}<span class='color-symbol'>%</span> <span class='color-m'>interest</span> on <span class='color-h'>health</span> <span class='color-symbol'>=</span> ${h > 20 ? h + powerUps.orb.heal(1) : powerUps.orb.heal(h)}`)
        }
        if (tech.isEjectOld) {
            let index = null //find oldest tech that you have
            for (let i = 0; i < tech.tech.length; i++) {
                if (tech.tech[i].count > 0 && !tech.tech[i].isInstant) {
                    index = i
                }
            }
            if (index) { //eject it
                const effect = Math.pow(1.1, tech.tech[index].count)
                simulation.inGameConsole(`<strong>${(effect).toFixed(2)}x</strong> <strong class='color-d'>damage</strong> <em>//from obsolescence</em>`, 360)
                m.damageDone *= effect
                powerUps.ejectTech(index)
            }
        }
    },
    trainingText(say) {
        simulation.lastLogTime = 0; //clear previous messages
        simulation.isTextLogOpen = true
        simulation.inGameConsole(`<span style="font-size: 120%;line-height: 120%;"><span style="color:#51f;">supervised.learning</span>(<span style="color:#777; font-size: 80%;">${(Date.now() / 1000).toFixed(0)} s</span>)<span class='color-symbol'>:</span><br>${say}</span>`, Infinity)
        simulation.isTextLogOpen = false
    },
    trainingBackgroundColor: "#e1e1e1",
    custom() { },
    customTopLayer() { },
    updateDifficulty() {
        simulation.difficulty = level.levelsCleared * simulation.difficultyMode
        if (simulation.isTraining) {
            simulation.difficulty = 1
            simulation.difficultyMode = 1
        } else {
            const scale = simulation.difficultyMode > 3 ? 2 : 1
        }
        simulation.healScale = 1 / (1 + simulation.difficulty * 0.043) //a higher denominator makes for lower heals // m.health += heal * simulation.healScale;
        if (simulation.difficultyMode === 1) {
            simulation.accelScale = 1.1
            simulation.CDScale = 0.9
        } else {
            simulation.accelScale = Math.min(6, Math.pow(1.024, simulation.difficulty))
            simulation.CDScale = Math.max(0.15, Math.pow(0.964, simulation.difficulty))
        }
    },
    constraintIndex: 0,
    constraintPopUp() {
        //pause
        if (!simulation.paused) {
            simulation.paused = true;
            simulation.isChoosing = true; //stops p from un pausing on key down

            document.body.style.cursor = "auto";
            document.getElementById("choose-grid").style.pointerEvents = "auto";
            document.getElementById("choose-grid").style.transitionDuration = "0s";
        }
        //build level info
        document.getElementById("choose-grid").classList.add('choose-grid-no-images')
        document.getElementById("choose-grid").classList.remove('choose-grid')
        document.getElementById("choose-grid").style.gridTemplateColumns = "auto"//"450px"
        let text = `<div class="constraint-module metallic-sparkle">${level.constraintDescription1}</div>`
        if (level.constraintDescription2) text += `<div class="constraint-module metallic-sparkle"><span>${level.constraintDescription2}</div>`
        text += `<div class="choose-grid-module" id = "choose-unPause" style="font-size: 1em;text-align: center;padding: 13px;border-radius:5px;">continue</div>`

        document.getElementById("choose-grid").innerHTML = text
        //show level info
        document.getElementById("choose-grid").style.opacity = "1"
        document.getElementById("choose-grid").style.transitionDuration = "0.25s"; //how long is the fade in on
        document.getElementById("choose-grid").style.visibility = "visible"
        document.getElementById("choose-unPause").addEventListener("click", () => {
            level.unPause()
            document.body.style.cursor = "none";
            //reset hide image style
            if (localSettings.isHideImages) {
                document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                document.getElementById("choose-grid").classList.remove('choose-grid');
            } else {
                document.getElementById("choose-grid").classList.add('choose-grid');
                document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
            }
        });
        requestAnimationFrame(() => {
            ctx.fillStyle = `rgba(150,150,150,0.9)`; //`rgba(221,221,221,0.6)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    },
    setConstraints() {
        //populate array with possible constraints and reset constraints
        level.constraintDescription1 = level.constraintDescription2 = ""
        const possible = []
        for (let i = 0; i < level.constraint.length; i++) {
            level.constraint[i].remove()
            possible.push(i)
        }
        if (level.levels[level.onLevel] !== "final" && level.levels[level.onLevel] !== "unknown" && level.levels[level.onLevel] !== "initial" && !simulation.isTraining && m.alive && level.levelsCleared) {
            if (simulation.difficultyMode > 4 && possible.length) {
                //choose a random constraint from possible array and remove it from that array
                // level.constraintIndex = 0 //REMOVE THIS FROM LIVE GAME
                level.constraint[level.constraintIndex].effect()
                possible.splice(level.constraintIndex, 1)
                //generate text to describe the active constraints for the pause menu
                level.constraintDescription1 = level.constraint[level.constraintIndex].description
                level.constraintIndex++
                if (level.constraintIndex > level.constraint.length - 1) level.constraintIndex = 0
                if (simulation.difficultyMode > 6 && possible.length) {
                    level.constraint[level.constraintIndex].effect()
                    possible.splice(level.constraintIndex, 1)
                    level.constraintDescription2 += level.constraint[level.constraintIndex].description
                    level.constraintIndex++
                    if (level.constraintIndex > level.constraint.length - 1) level.constraintIndex = 0
                }
                document.getElementById("right-HUD-constraint").style.display = "block";
                // level.constraintPopUp()
                //animate making constraint HUD bigger then smaller
                if (!localSettings.isHideHUD) {
                    requestAnimationFrame(() => {
                        //grow and get bright
                        document.getElementById("right-HUD-constraint").style.opacity = 1
                        document.getElementById("right-HUD-constraint").style.fontSize = "23px"
                        document.getElementById("right-HUD-constraint").style.top = simulation.difficultyMode > 6 ? "6px" : "9px"
                        setTimeout(() => {
                            if (m.alive) {
                                //fade to background
                                document.getElementById("right-HUD-constraint").style.opacity = 0.35
                                document.getElementById("right-HUD-constraint").style.fontSize = "20px"
                                document.getElementById("right-HUD-constraint").style.top = "12px"
                            }
                        }, 5000);
                    });
                }
            } else {
                document.getElementById("right-HUD-constraint").style.display = "none";
            }
        } else {
            document.getElementById("right-HUD-constraint").style.display = "none";
        }
        //update HUD with constraints
        let text = `${level.constraintDescription1}`
        if (level.constraintDescription1) simulation.inGameConsole(`level<span class='color-symbol'>.</span>constraint<span class='color-symbol'>.</span>description<span class='color-symbol'>:</span> "<span style="color:#624;background-color: rgba(255, 215, 241, 0.4);border-radius:6px;padding:3px;">${level.constraintDescription1}</span>"`)
        if (simulation.difficultyMode > 6 && level.constraintDescription2) {
            text += `<br>${level.constraintDescription2}`
            if (level.constraintDescription2) simulation.inGameConsole(`level<span class='color-symbol'>.</span>constraint<span class='color-symbol'>.</span>description<span class='color-symbol'>:</span> "<span style="color:#624;background-color: rgba(255, 215, 241, 0.4);border-radius:6px;padding:3px;">${level.constraintDescription2}</span>"`)
        }
        document.getElementById("right-HUD-constraint").innerHTML = text

        if (level.constraintDescription1) {
            if (level.constraintDescription2) {
                document.getElementById("right-HUD").style.top = "80px";
            } else {
                document.getElementById("right-HUD").style.top = "57px"; //make room for tech list in "right-HUD"
            }
        } else {
            document.getElementById("right-HUD").style.top = "15px";
        }
    },
    inGameText(x, y, text, count = 240, color = `rgb(200, 200, 200)`) {  //max width around 900-1000
        let xAdjusted = x - text.length * 29 / 2
        // simulation.draw.font.drawString('abcdefghijklmnopqrstuvwxyzdnasijfnibdiasbfuyabndkjbsdufdbaisfbkadsbfkusbfdkuhbsdfubdsaifbadosifbiousadbfiuasdbfiuasdbifubasi', x, y)
        simulation.draw.font.word = new Path2D()
        simulation.draw.font.drawString(text, xAdjusted, y)
        simulation.ephemera.push({
            name: "in game text",
            onLevel: level.levels[level.onLevel],
            count: count,
            do() {
                count--
                if (count < 0 || !m.alive || this.onLevel !== level.levels[level.onLevel]) simulation.removeEphemera(this.name)
                ctx.strokeStyle = color
                ctx.lineWidth = 3// + Math.random()
                ctx.beginPath()
                ctx.stroke(simulation.draw.font.word)
            },
        })
    },
    constraintDescription1: "", //used in pause menu and console
    constraintDescription2: "",
    constraint: [
        {
            description: "0.5x healing",
            effect() {
                level.isLowHeal = true
            },
            remove() {
                level.isLowHeal = false
            }
        },
        {
            description: "no pause while choosing",
            effect() {
                level.isNoPause = true
            },
            remove() {
                level.isNoPause = false
            }
        },
        {
            description: "no health bar",
            effect() {
                level.isHideHealth = true
                document.getElementById("health").style.display = "none"
                document.getElementById("health-bg").style.display = "none"
            },
            remove() {
                level.isHideHealth = false
                if (tech.isEnergyHealth) {
                    document.getElementById("health").style.display = "none"
                    document.getElementById("health-bg").style.display = "none"
                } else if (!level.isHideHealth) {
                    document.getElementById("health").style.display = "inline"
                    document.getElementById("health-bg").style.display = "inline"
                }
            }
        },
        {
            description: "0.5x energy regen",
            effect() {
                level.isReducedRegen = 0.5
            },
            remove() {
                level.isReducedRegen = 1
            }
        },
        {
            description: "0.5x max health",
            effect() {
                level.isReducedHealth = true
                m.setMaxHealth()
            },
            remove() {
                if (level.isReducedHealth) {
                    level.isReducedHealth = false
                    m.setMaxHealth()
                    m.addHealth(level.reducedHealthLost / simulation.healScale);
                    level.reducedHealthLost = 0
                } else {
                    level.isReducedHealth = false
                }
            }
        },
        {
            description: "after 50 seconds spawn WIMPs",
            effect() {
                simulation.ephemera.push({
                    name: "WIMPS",
                    time: 0,
                    levelName: level.levels[level.onLevel],
                    do() {
                        this.time++
                        if (level.levels[level.onLevel] === this.levelName) {
                            if (this.time > 3000 && !(this.time % 540)) spawn.WIMP(level.enter.x, level.enter.y)
                        } else {
                            simulation.removeEphemera(this.name);
                        }
                    },
                })
            },
            remove() {

            }
        },
        {
            description: "0.3x damage after using power ups",
            effect() {
                level.isNoDamage = true
                level.noDamageCycle = 0
            },
            remove() {
                level.isNoDamage = false
                level.noDamageCycle = 0
            }
        },
        {
            description: "mobs heal after you take damage",
            effect() {
                level.isMobHealPlayerDamage = true
            },
            remove() {
                level.isMobHealPlayerDamage = false
            }
        },
        {
            description: "mob death heals nearby mobs",
            effect() {
                level.isMobDeathHeal = true
            },
            remove() {
                level.isMobDeathHeal = false
            }
        },
        // {
        //     description: "full damage taken after boss dies",
        //     // description: "after boss dies damage taken = 1",
        //     effect() {
        //         level.noDefenseSetting = 1 //defense goes to zero once equal to 2
        //     },
        //     remove() {
        //         level.noDefenseSetting = 0
        //     }
        // },
        {
            description: "4x shielded mobs",
            effect() {
                level.isMobShields = true
            },
            remove() {
                level.isMobShields = false
            }
        },
        {
            description: "40% JUNK chance",
            effect() {
                level.junkAdded = 0.4
            },
            remove() {
                level.junkAdded = 0
            }
        },
        {
            description: "-1 choice",
            effect() {
                level.fewerChoices = true
            },
            remove() {
                level.fewerChoices = false
            }
        },
        {
            description: "power ups in stasis",
            effect() {
                level.isNextLevelPowerUps = true
                //remove all current power ups
                for (let i = powerUp.length - 1; i > -1; i--) {
                    powerUps.powerUpStorage.push({ name: powerUp[i].name, size: powerUp[i].size })
                    Matter.Composite.remove(engine.world, powerUp[i]);
                    powerUp.splice(i, 1)
                }
            },
            remove() {
                level.isNextLevelPowerUps = false
                if (powerUps.powerUpStorage.length) {
                    const delay = 5
                    let i = 0
                    let cycle = () => {
                        if (powerUps.powerUpStorage.length && m.alive && powerUp.length < 300) {
                            requestAnimationFrame(cycle);
                            if (!simulation.paused && !simulation.isChoosing) {
                                if (!(simulation.cycle % delay)) {
                                    const where = { x: m.pos.x + 70 * (Math.random() - 0.5), y: m.pos.y + 70 * (Math.random() - 0.5) }
                                    powerUps.directSpawn(where.x, where.y, powerUps.powerUpStorage[i].name, true, powerUps.powerUpStorage[i].size);
                                    powerUps.powerUpStorage.splice(i, 1);
                                }
                            }
                        } else {
                            powerUps.powerUpStorage = []
                        }
                    }
                    requestAnimationFrame(cycle);
                }
            }
        },
        {
            description: "33% of mobs respawn",
            effect() {
                level.isMobRespawn = true
            },
            remove() {
                level.isMobRespawn = false
            }
        },
        {
            description: "0 duplication",
            effect() {
                level.isNoDuplicate = true
            },
            remove() {
                level.isNoDuplicate = false
            }
        },
        {
            description: "2x ammo cost",
            effect() {
                level.is2xAmmo = true
            },
            remove() {
                level.is2xAmmo = false
            }
        },
        {
            description: "0.5x max energy",
            effect() {
                level.isReducedEnergy = true
                m.setMaxEnergy()
            },
            remove() {
                if (level.isReducedEnergy) {
                    level.isReducedEnergy = false
                    m.setMaxEnergy()
                } else {
                    level.isReducedEnergy = false
                }

            }
        },
        {
            description: "slow bots",
            effect() {
                level.isSlowBots = true
                b.clearPermanentBots();
                b.respawnBots();
            },
            remove() {
                if (level.isSlowBots) {
                    level.isSlowBots = false
                    b.clearPermanentBots();
                    b.respawnBots();
                } else {
                    level.isSlowBots = false
                }

            }
        },
    ],
    isMobShields: false,
    junkAdded: 0,
    isNextLevelPowerUps: false,
    isMobRespawn: false,
    fewerChoices: false,
    isNoDuplicate: false,
    is2xAmmo: false,
    isReducedEnergy: false,
    isSlowBots: false,
    // noDefenseSetting: 0,
    isMobDeathHeal: false,
    isMobHealPlayerDamage: false,
    isNoDamage: false,
    noDamageCycle: 0,
    reducedHealthLost: 0,
    isReducedHealth: false,
    isReducedRegen: 1,
    isHideHealth: false,
    isNoPause: false,
    isLowHeal: false,
    levelAnnounce() {
        const cheating = simulation.isCheating ? "(testing)" : ""
        if (level.levelsCleared === 0) {
            return `initial ${cheating}`;
        } else {
            return `${level.levelsCleared} ${level.levels[level.onLevel]} ${cheating}`
        }
    },
    announceMobTypes() {
        simulation.inGameConsole(`spawn<span class='color-symbol'>.</span>${spawn.pickList[0]}<span class='color-symbol'>(</span>x<span class='color-symbol'>,</span>y<span class='color-symbol'>)</span> //Tier ${spawn.mobTierSpawnOrder[level.levelsCleared - 1]}`)
        simulation.inGameConsole(`spawn<span class='color-symbol'>.</span>${spawn.pickList[1]}<span class='color-symbol'>(</span>x<span class='color-symbol'>,</span>y<span class='color-symbol'>)</span> //Tier ${spawn.mobTierSpawnOrder[level.levelsCleared]}`)
    },
    disableExit: false,
    nextLevel() {
        if (!level.disableExit) {
            level.levelsCleared++;
            level.onLevel++; //cycles map to next level
            level.updateDifficulty()

            if (simulation.isTraining) {
                if (level.onLevel > level.levels.length - 1) { //if all training levels are completed
                    level.disableExit = true
                  try {
                    powerUps.difficulty.effect()
                  } catch (error) {
                    document.getElementById("health").style.display = "none"
                    document.getElementById("health-bg").style.display = "none"
                    document.getElementById("defense-bar").style.display = "none"
                    document.getElementById("damage-bar").style.display = "none"
                    document.getElementById("text-log").style.display = "none"
                    document.getElementById("fade-out").style.opacity = 1; //slowly fades out
                    setTimeout(function () {
                      simulation.paused = true;
                      level.disableExit = false;
                      engine.world.bodies.forEach((body) => {
                        Matter.Composite.remove(engine.world, body)
                      })
                      Engine.clear(engine);
                      simulation.splashReturn();
                    }, 6000);
                  }
                }
            } else {
                if (level.onLevel > level.levels.length - 1) level.onLevel = 0;
            }
            //reset lost tech display
            for (let i = 0; i < tech.tech.length; i++) {
                if (tech.tech[i].isLost) tech.tech[i].isLost = false;
            }
            simulation.updateTechHUD();
            simulation.clearNow = true; //triggers in simulation.clearMap to remove all physics bodies and setup for new map

            //pop up new level info screen for a few seconds    //|| level.levels[level.onLevel] === "subway"
            if (!localSettings.isHideHUD && m.alive && (level.levels[level.onLevel] === "final" || level.levels[level.onLevel] === "reactor")) {
                // if (!localSettings.isHideHUD && m.alive) {
                //pause
                if (!simulation.paused) {
                    simulation.paused = true;
                    simulation.isChoosing = true; //stops p from un pausing on key down
                }

                //build level info
                document.getElementById("choose-grid").style.gridTemplateColumns = "250px"
                let text = `<div class="card-background" style="height:auto; border: none; background-color: transparent; line-height: 160%; background-color: var(--card-color); font-size: 1.15em;"> <div class="card-text">`
                for (let i = 0; i < level.levels.length; i++) {
                    if (i < level.levelsCleared) {
                        text += `<div style="user-select: none;">${level.levels[i]}</div>`
                    } else if (i === level.levelsCleared) {
                        text += `<div class="unblur" style="user-select: none;"><strong>${level.levels[i]}</strong></div>`
                        // ${spawn.mobTypeSpawnOrder[level.levelsCleared]} Tier ${spawn.mobTierSpawnOrder[level.levelsCleared]}
                        // <br>${spawn.mobTypeSpawnOrder[level.levelsCleared - 1]} Tier ${spawn.mobTierSpawnOrder[level.levelsCleared - 1]}`
                    } else {
                        text += `<div class= "blurry-text" style="user-select: none;">${level.levels[i]}</div>` //blurry text
                        // `spawn<span class='color-symbol'>.</span><span class='color-symbol'>(</span>x<span class='color-symbol'>,</span>y<span class='color-symbol'>)</span>`
                    }
                }
                text += `</div></div>`

                document.getElementById("choose-grid").innerHTML = text
                //show level info
                document.getElementById("choose-grid").style.opacity = "1"
                document.getElementById("choose-grid").style.transitionDuration = "0.25s"; //how long is the fade in on
                document.getElementById("choose-grid").style.visibility = "visible"
                simulation.draw.cons();
                simulation.draw.body();
                level.customTopLayer();
                let count = countMax = simulation.testing ? 0 : 240
                let newLevelDraw = () => {
                    count--
                    if (count > 0) {
                        requestAnimationFrame(newLevelDraw);
                    } else { //unpause
                        setTimeout(() => {
                            //document.getElementById("choose-grid").style.visibility = "hidden"
                            powerUps.warp.exit(); //fixing a bug with picking up powerups after entering a new level
                        }, 100);
                    }
                    //draw
                    simulation.wipe();
                    m.look();
                    simulation.camera();
                    const scale = 15
                    ctx.setLineDash([scale * (countMax - count), scale * count]);
                    simulation.draw.wireFrame();
                    ctx.setLineDash([]);
                    ctx.restore();
                    simulation.drawCursor();
                }
                requestAnimationFrame(newLevelDraw);
            }
        }
    },
    unPause() {
        if (m.immuneCycle < m.cycle + 15  * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1) ) m.immuneCycle = m.cycle + 30 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for 30 cycles
        if (simulation.paused) requestAnimationFrame(cycle);
        if (m.alive) simulation.paused = false;
        simulation.isChoosing = false; //stops p from un pausing on key down
        build.unPauseGrid()
        document.getElementById("choose-grid").style.opacity = "0"
        document.getElementById("choose-grid").style.visibility = "hidden"
        // setTimeout(() => {
        // }, 1000);
    },
    populateLevels() { //run a second time if URL is loaded
        if (document.getElementById("banned").value) { //remove levels from ban list in settings
            const banList = document.getElementById("banned").value.replace(/,/g, ' ').replace(/\s\s+/g, ' ').replace(/[^\w\s]/g, '') //replace commas with spaces, replace double spaces with single, remove strange symbols
            const remove = banList.split(" ");
            // console.log('remove these', remove)
            // console.log('community levels before', level.communityLevels)
            for (let i = 0; i < remove.length; i++) {
                const index = level.communityLevels.indexOf(remove[i])
                if (index !== -1) {
                    level.communityLevels.splice(index, 1);
                    // console.log('removed level:', remove[i])
                    requestAnimationFrame(() => { simulation.inGameConsole(`banned level: <strong style="color: '#f00';">${remove[i]}</strong>`); });
                }
            }
            // console.log('community levels after', level.communityLevels)
            // console.log('Landgreen levels before', level.playableLevels)
            for (let i = 0; i < remove.length; i++) {
                if (level.playableLevels.length + level.communityLevels.length * simulation.isCommunityMaps < 10) break //can't remove too many levels
                const index = level.playableLevels.indexOf(remove[i])
                if (index !== -1) {
                    level.playableLevels.splice(index, 1);
                    // console.log('removed level:', remove[i])
                    requestAnimationFrame(() => { simulation.inGameConsole(`banned level: <strong style="color: '#f00';">${remove[i]}</strong>`); });
                }
            }
            // console.log('Landgreen levels after', level.playableLevels)
        }

        if (document.getElementById("seed").value) { //check for player entered seed in settings
            Math.initialSeed = String(document.getElementById("seed").value)
        }
        Math.seed = Math.abs(Math.hash(Math.initialSeed)) //update randomizer seed

        if (simulation.isTraining) {
            simulation.isHorizontalFlipped = false
            level.levels = level.trainingLevels.slice(0) //copy array, not by just by assignment
            //if (simulation.isCommunityMaps) level.trainingLevels.push("diamagnetism")
        } else {
            level.levels = level.playableLevels.slice(0) //copy array, not by just by assignment
            if (simulation.isCommunityMaps) {
                level.levels = level.levels.concat(level.communityLevels)
                simulation.isHorizontalFlipped = false;
            } else {
                simulation.isHorizontalFlipped = (Math.seededRandom() < 0.5) ? true : false //if true, some maps are flipped horizontally
            }
            level.levels = seededShuffle(level.levels); //shuffles order of maps with seeded random
            level.levels.length = 9 //remove any extra levels past 9
            pick = ["gravitron", "factory", "flocculation"]
            // level.levels.splice(Math.floor(Math.seededRandom(level.levels.length * 0.6, level.levels.length)), 0, pick[Math.floor(Math.random() * pick.length)]); //add level to the back half of the randomized levels list
            level.levels.splice(6, 0, "reactor"); //add level to the 7th location of the randomized levels list
            level.levels.push(pick[Math.floor(Math.random() * pick.length)]); //add level to the end of the randomized levels list
            if (!build.isExperimentSelection || (build.hasExperimentalMode && !simulation.isCheating)) { //experimental mode is endless, unless you only have an experiment Tech
                level.levels.unshift("initial"); //add level to the start of the randomized levels list
                level.levels.push("subway"); //add level to the end of the randomized levels list
                level.levels.push("final"); //add level to the end of the randomized levels list
            }
        }
    },
    flipHorizontal() {
        const flipX = (who) => {
            for (let i = 0, len = who.length; i < len; i++) {
                Matter.Body.setPosition(who[i], {
                    x: -who[i].position.x,
                    y: who[i].position.y
                })
            }
        }
        flipX(map)
        flipX(body)
        flipX(mob)
        flipX(powerUp)
        for (let i = 0, len = cons.length; i < len; i++) {
            cons[i].pointA.x *= -1
            cons[i].pointB.x *= -1
        }
        for (let i = 0, len = consBB.length; i < len; i++) {
            consBB[i].pointA.x *= -1
            consBB[i].pointB.x *= -1
        }
        level.exit.x = -level.exit.x - 100 //minus the 100 because of the width of the graphic
    },
    flipVertical() {
        const flipY = (who) => {
            for (let i = 0, len = who.length; i < len; i++) {
                Matter.Body.setPosition(who[i], { x: who[i].position.x, y: -who[i].position.y - player.position.y })
            }
        }
        flipY(map)
        flipY(body)
        flipY(mob)
        flipY(powerUp)
        Matter.Body.setPosition(player, { x: player.position.x, y: -2 * player.position.y })

        // for (let i = 0, len = cons.length; i < len; i++) {
        //     cons[i].pointA.x *= -1
        //     cons[i].pointB.x *= -1
        // }
        // for (let i = 0, len = consBB.length; i < len; i++) {
        //     consBB[i].pointA.x *= -1
        //     consBB[i].pointB.x *= -1
        // }
        // level.exit.x = -level.exit.x - 100 //minus the 100 because of the width of the graphic
    },
    exitCount: 0,
    setPosToSpawn(xPos, yPos) {
        m.spawnPos.x = m.pos.x = xPos;
        m.spawnPos.y = m.pos.y = yPos;
        level.enter.x = m.spawnPos.x - 50;
        level.enter.y = m.spawnPos.y + 20;
        m.transX = m.transSmoothX = canvas.width2 - m.pos.x;
        m.transY = m.transSmoothY = canvas.height2 - m.pos.y;
        m.Vx = m.spawnVel.x;
        m.Vy = m.spawnVel.y;
        player.force.x = 0;
        player.force.y = 0;
        Matter.Body.setPosition(player, m.spawnPos);
        Matter.Body.setVelocity(player, m.spawnVel);
        //makes perfect diamagnetism tech: Lenz's law show up in the right spot at the start of a level
        m.fieldPosition = {
            x: m.pos.x,
            y: m.pos.y
        }
        m.fieldAngle = m.angle
    },
    enter: {
        x: 0,
        y: 0,
        draw() {
            ctx.beginPath();
            ctx.moveTo(level.enter.x, level.enter.y + 30);
            ctx.lineTo(level.enter.x, level.enter.y - 80);
            ctx.bezierCurveTo(level.enter.x, level.enter.y - 170, level.enter.x + 100, level.enter.y - 170, level.enter.x + 100, level.enter.y - 80);
            ctx.lineTo(level.enter.x + 100, level.enter.y + 30);
            ctx.lineTo(level.enter.x, level.enter.y + 30);
            ctx.fillStyle = "#ccc";
            ctx.fill();
        }
    },
    exit: {
        x: 0,
        y: 0,
        drawAndCheck() {
            if ( //check
                player.position.x > level.exit.x &&
                player.position.x < level.exit.x + 100 &&
                player.position.y > level.exit.y - 150 &&
                player.position.y < level.exit.y - 0 &&
                player.velocity.y < 0.15
            ) {
                let countDelta = (m.health < 0 ? 0.5 : 3)
                countDelta *= (m.crouch && input.down ? 2 : 1)
                level.exitCount += countDelta
            } else if (level.exitCount > 0) {
                level.exitCount -= 3
            }

            ctx.beginPath();
            ctx.moveTo(level.exit.x, level.exit.y + 30);
            ctx.lineTo(level.exit.x, level.exit.y - 80);
            ctx.bezierCurveTo(level.exit.x, level.exit.y - 170, level.exit.x + 100, level.exit.y - 170, level.exit.x + 100, level.exit.y - 80);
            ctx.lineTo(level.exit.x + 100, level.exit.y + 30);
            ctx.lineTo(level.exit.x, level.exit.y + 30);
            ctx.fillStyle = "#0ff";
            ctx.fill();

            if (level.exitCount > 0) { //stroke outline of door from 2 sides,  grows with count
                ctx.beginPath();
                ctx.moveTo(level.exit.x, level.exit.y + 40);
                ctx.lineTo(level.exit.x, level.exit.y - 80);
                ctx.bezierCurveTo(level.exit.x, level.exit.y - 148, level.exit.x + 50, level.exit.y - 148, level.exit.x + 50, level.exit.y - 148);
                ctx.moveTo(level.exit.x + 100, level.exit.y + 40);
                ctx.lineTo(level.exit.x + 100, level.exit.y - 80);
                ctx.bezierCurveTo(level.exit.x + 100, level.exit.y - 148, level.exit.x + 50, level.exit.y - 148, level.exit.x + 50, level.exit.y - 148);
                ctx.setLineDash([200, 200]);
                ctx.lineDashOffset = Math.max(-15, 185 - 2.1 * level.exitCount)
                if (m.health < 0) {
                    ctx.strokeStyle = "#f00"
                    ctx.lineWidth = 6 + 0.1 * (level.exitCount)
                } else {
                    ctx.strokeStyle = "#444"
                    ctx.lineWidth = 2
                }
                ctx.stroke();
                ctx.setLineDash([0, 0]);

                if (level.exitCount > 100) {
                    level.exitCount = 0

                    //prompt an option to do the training levels or continue to the normal game
                    if (!simulation.isChoosing && m.alive && !simulation.isTraining && !simulation.isCheating && b.inventory.length === 0 && level.levelsCleared === 0 && localSettings.isTrainingNotAttempted) {
                        //pause
                        if (!simulation.paused) {
                            simulation.paused = true;
                            simulation.isChoosing = true; //stops p from un pausing on key down

                            document.body.style.cursor = "auto";
                            document.getElementById("choose-grid").style.pointerEvents = "auto";
                            document.getElementById("choose-grid").style.transitionDuration = "0s";
                        }
                        //build level info
                        document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                        document.getElementById("choose-grid").classList.remove('choose-grid');
                        document.getElementById("choose-grid").style.gridTemplateColumns = "350px"
                        let text = `
                            <div class="choose-grid-module" id = "choose-training" style = "font-size: 1em; padding:10px;color:#333;">
                                <h2 style="text-align: center;letter-spacing: 5px;">training</h2>
                                Begin the <strong>guided tutorial</strong> that shows you how to use your ${powerUps.orb.field()} and ${powerUps.orb.gun()}.
                            </div>
                            <div class="choose-grid-module" id = "choose-unPause" style = "font-size: 1em; padding:10px;color:#333;">
                                <h2 style="text-align: center; letter-spacing: 7px;">play</h2>
                                Begin the <strong>standard game</strong> where you progress through <strong>13</strong> random levels and beat the final boss.
                            </div>`
                        document.getElementById("choose-grid").innerHTML = text
                        //show level info
                        document.getElementById("choose-grid").style.opacity = "1"
                        document.getElementById("choose-grid").style.transitionDuration = "0.25s"; //how long is the fade in on
                        document.getElementById("choose-grid").style.visibility = "visible"
                        document.getElementById("choose-training").addEventListener("click", () => {
                            level.unPause()
                            document.body.style.cursor = "none";
                            simulation.isTraining = true
                            level.levelsCleared--;
                            level.onLevel--
                            simulation.isHorizontalFlipped = false
                            level.levels = level.trainingLevels.slice(0) //copy array, not by just by assignment
                            level.nextLevel()
                            //reset hide image style
                            if (localSettings.isHideImages) {
                                document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                                document.getElementById("choose-grid").classList.remove('choose-grid');
                            } else {
                                document.getElementById("choose-grid").classList.add('choose-grid');
                                document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
                            }
                        });
                        document.getElementById("choose-unPause").addEventListener("click", () => {
                            level.unPause()
                            document.body.style.cursor = "none";
                            level.nextLevel()
                            //reset hide image style
                            if (localSettings.isHideImages) {
                                document.getElementById("choose-grid").classList.add('choose-grid-no-images');
                                document.getElementById("choose-grid").classList.remove('choose-grid');
                            } else {
                                document.getElementById("choose-grid").classList.add('choose-grid');
                                document.getElementById("choose-grid").classList.remove('choose-grid-no-images');
                            }
                        });
                        requestAnimationFrame(() => {
                            ctx.fillStyle = `rgba(150,150,150,0.9)`; //`rgba(221,221,221,0.6)`;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        });
                    } else { //advance to next level
                        level.nextLevel()
                    }
                }
            }
        },
        // draw() {
        //     ctx.beginPath();
        //     ctx.moveTo(level.exit.x, level.exit.y + 30);
        //     ctx.lineTo(level.exit.x, level.exit.y - 80);
        //     ctx.bezierCurveTo(level.exit.x, level.exit.y - 170, level.exit.x + 100, level.exit.y - 170, level.exit.x + 100, level.exit.y - 80);
        //     ctx.lineTo(level.exit.x + 100, level.exit.y + 30);
        //     ctx.lineTo(level.exit.x, level.exit.y + 30);
        //     ctx.fillStyle = "#0ff";
        //     ctx.fill();
        // }
    },
    addToWorld() { //needs to be run to put bodies into the world
        for (let i = 0; i < map.length; i++) {
            map[i].collisionFilter.category = cat.map;
            map[i].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            Matter.Body.setStatic(map[i], true); //make static
            Composite.add(engine.world, map[i]); //add to world
        }
    },
    spinner(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0) {
        x += width / 2
        y += height / 2
        const who = body[body.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.body,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            isNotHoldable: true,
            frictionAir: frictionAir,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
        });
        Matter.Body.setAngle(who, angle)
        Matter.Body.setAngularVelocity(who, angularVelocity);
        Matter.Body.setDensity(who, density)
        Composite.add(engine.world, who); //add to world
        who.classType = "body"

        const constraint = Constraint.create({ //fix rotor in place, but allow rotation
            pointA: {
                x: who.position.x,
                y: who.position.y
            },
            bodyB: who,
            stiffness: 1,
            damping: 1
        });
        Composite.add(engine.world, constraint);
        return constraint
    },
    rotor(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
        x += width / 2
        y += height / 2
        const who = body[body.length] = Bodies.rectangle(x, y, width, height, {
            isRotor: true,
            collisionFilter: {
                category: cat.body,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            isNotHoldable: true,
            frictionAir: frictionAir,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            rotationForce: rotationForce,
        });
        Matter.Body.setAngle(who, angle)
        Matter.Body.setAngularVelocity(who, angularVelocity);

        Matter.Body.setDensity(who, density)
        const constraint = Constraint.create({ //fix rotor in place, but allow rotation
            pointA: {
                x: who.position.x,
                y: who.position.y
            },
            bodyB: who,
            stiffness: 1,
            damping: 1
        });
        Composite.add(engine.world, constraint);
        who.center = {
            x: who.position.x,
            y: who.position.y
        }
        who.rotate = function () {
            if (!m.isTimeDilated) {
                Matter.Body.applyForce(this, {
                    x: this.position.x + 100,
                    y: this.position.y + 100
                }, {
                    x: this.rotationForce * this.mass,
                    y: 0
                })
            } else {
                Matter.Body.setAngularVelocity(this, 0);
            }
        }
        // if (rotate) {
        //     rotor.rotate = function() {
        //         if (!m.isTimeDilated) {
        //             Matter.Body.applyForce(rotor, {
        //                 x: rotor.position.x + 100,
        //                 y: rotor.position.y + 100
        //             }, {
        //                 x: rotate * rotor.mass,
        //                 y: 0
        //             })
        //         } else {
        //             Matter.Body.setAngularVelocity(rotor, 0);
        //         }
        //     }
        // }

        Composite.add(engine.world, who); //add to world
        who.classType = "body"

        return who
    },
    boost(x, y, speed = 1000, angle = Math.PI / 2) { //height is how high the player will be flung above y
        if (angle !== Math.PI / 2) { //angle !== 3 * Math.PI / 2
            angle *= -1
            who = map[map.length] = Matter.Bodies.fromVertices(x + 50, y + 35, Vertices.fromPath("80 40 -80 40 -50 -40 50 -40"), {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                query() {
                    // check for collisions
                    const rayVector = Vector.add(this.position, Vector.rotate({ x: 100, y: 0 }, angle))
                    query = (who) => {
                        const list = Matter.Query.ray(who, this.position, rayVector, 100)
                        if (list.length > 0) {
                            Matter.Body.setVelocity(list[0].bodyA, Vector.rotate({ x: 1.21 * Math.sqrt(Math.abs(speed)), y: 0 }, angle));
                        }
                    }
                    query(body)
                    query(mob)
                    query(bullet)
                    query(powerUp)
                    //player collision
                    const list = Matter.Query.ray([player], this.position, rayVector, 100)
                    if (list.length > 0) {
                        Matter.Body.setVelocity(player, Vector.rotate({ x: 1.21 * Math.sqrt(Math.abs(speed)), y: 0 }, angle));
                        m.buttonCD_jump = 0; // reset short jump counter to prevent short jumps on boosts
                        m.hardLandCD = 0 // disable hard landing
                    }

                    //draw 
                    const v1 = this.vertices[0]
                    const v2 = this.vertices[1]
                    let unit = Vector.rotate({ x: 60, y: 0 }, angle)
                    let v3 = Vector.add(v2, unit)
                    let v4 = Vector.add(v1, unit)
                    ctx.beginPath();
                    ctx.moveTo(v1.x, v1.y)
                    ctx.lineTo(v2.x, v2.y)
                    ctx.lineTo(v3.x, v3.y)
                    ctx.lineTo(v4.x, v4.y)
                    ctx.fillStyle = "rgba(200,0,255,0.05)";
                    ctx.fill()
                    unit = Vector.rotate({ x: 20, y: 0 }, angle)
                    v3 = Vector.add(v2, unit)
                    v4 = Vector.add(v1, unit)
                    ctx.beginPath();
                    ctx.moveTo(v1.x, v1.y)
                    ctx.lineTo(v2.x, v2.y)
                    ctx.lineTo(v3.x, v3.y)
                    ctx.lineTo(v4.x, v4.y)
                    ctx.fillStyle = "rgba(200,0,255,0.15)";
                    ctx.fill()
                },
            });
            Matter.Body.rotate(who, angle + Math.PI / 2);
            return who
        } else {
            who = map[map.length] = Matter.Bodies.fromVertices(x + 50, y + 35, Vertices.fromPath("120 40 -120 40 -50 -40 50 -40"), {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                boostBounds: {
                    min: {
                        x: x,
                        y: y - 20
                    },
                    max: {
                        x: x + 100,
                        y: y
                    }
                },
                query() {
                    // check for collisions
                    query = (who) => {
                        if (Matter.Query.region(who, this.boostBounds).length > 0) {
                            list = Matter.Query.region(who, this.boostBounds)
                            Matter.Body.setVelocity(list[0], {
                                x: list[0].velocity.x + (Math.random() - 0.5) * 2.5, //add a bit of horizontal drift to reduce endless bounces
                                y: -1.21 * Math.sqrt(Math.abs(speed)) //give a upwards velocity
                            });
                        }
                    }
                    query(body)
                    query(mob)
                    query(bullet)
                    query(powerUp)
                    //player collision
                    if (Matter.Query.region([player], this.boostBounds).length > 0 && !input.down) {
                        m.buttonCD_jump = 0; // reset short jump counter to prevent short jumps on boosts
                        m.hardLandCD = 0 // disable hard landing
                        if (player.velocity.y > 26) {
                            Matter.Body.setVelocity(player, {
                                x: player.velocity.x,
                                y: -15 //gentle bounce if coming down super fast
                            });
                        } else {
                            Matter.Body.setVelocity(player, {
                                x: player.velocity.x + (Math.random() - 0.5) * 2.5,
                                y: -1.21 * Math.sqrt(Math.abs(speed)) //give an upwards velocity that will put the player that the height desired
                            });
                        }
                    }

                    //draw 
                    ctx.fillStyle = "rgba(200,0,255,0.15)";
                    ctx.fillRect(this.boostBounds.min.x, this.boostBounds.min.y - 10, 100, 30);
                    ctx.fillStyle = "rgba(200,0,255,0.05)";
                    ctx.fillRect(this.boostBounds.min.x, this.boostBounds.min.y - 50, 100, 70);
                },
            });
            return who
        }
    },
    elevator(x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }, isAtTop = false) {
        x += width / 2
        y += height / 2
        maxHeight += height / 2
        const yTravel = maxHeight - y
        force += simulation.g
        const who = body[body.length] = Bodies.rectangle(x, isAtTop ? maxHeight : y, width, height, {
            collisionFilter: {
                category: cat.body, //cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.mob | cat.mobBullet //| cat.powerUp
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            frictionAir: 0.001,
            holdX: x,
            move() {
                if (!m.isTimeDilated) {
                    if (this.isUp) { //moving up still with high air friction
                        this.force.y -= force * this.mass //hard force propels up, even with high friction

                        if (this.position.y < maxHeight) { //switch to down mode
                            this.isUp = false
                            this.frictionAir = friction.down
                            //adds a hard jerk at the top of vertical motion because it's fun
                            Matter.Body.setPosition(this, { x: this.holdX, y: maxHeight });
                            Matter.Body.setVelocity(this, { x: 0, y: 0 });
                        }
                    } else if (this.position.y + 10 * this.velocity.y > y) { //free falling down, with only air friction
                        Matter.Body.setVelocity(this, { //slow down early to avoid a jerky stop that can pass through blocks
                            x: 0,
                            y: this.velocity.y * 0.7
                        });
                        if (this.position.y + this.velocity.y > y) { //switch to up mode
                            this.isUp = true
                            this.frictionAir = friction.up
                        }
                    }
                    Matter.Body.setVelocity(this, { x: 0, y: this.velocity.y });
                }
                //edge limits
                if (this.position.y < maxHeight) {
                    Matter.Body.setPosition(this, { x: this.holdX, y: maxHeight });
                } else if (this.position.y > y) {
                    Matter.Body.setPosition(this, { x: this.holdX, y: y });
                }
                // hold horizontal position
                Matter.Body.setPosition(this, { x: this.holdX, y: this.position.y });
            },
            moveOnTouch() {
                if (!m.isTimeDilated) {
                    if (this.isUp) { //moving up still with high air friction
                        this.force.y -= force * this.mass //hard force propels up, even with high friction

                        if (this.position.y < maxHeight) { //switch to down mode
                            this.isUp = false
                            this.frictionAir = friction.down
                            //adds a hard jerk at the top of vertical motion because it's fun
                            Matter.Body.setPosition(this, { x: this.holdX, y: maxHeight });
                            Matter.Body.setVelocity(this, { x: 0, y: 0 });
                        }
                    } else if (this.position.y + 10 * this.velocity.y > y) { //free falling down, with only air friction
                        //slow down early to avoid a jerky stop that can pass through blocks
                        Matter.Body.setVelocity(this, { x: 0, y: this.velocity.y * 0.7 });
                        //switch to up mode
                        // if (this.position.y + this.velocity.y > y) {
                        //     this.isUp = true
                        //     this.frictionAir = friction.up
                        // }
                    }
                    Matter.Body.setVelocity(this, { x: 0, y: this.velocity.y });
                }
                //draw line to show how far to will extend
                ctx.beginPath();
                ctx.moveTo(x, y + height / 2);
                ctx.lineTo(x, maxHeight - height / 2);
                ctx.strokeStyle = `rgba(0,0,0,0.2)`
                ctx.lineWidth = "2"
                ctx.stroke();

                //draw body
                ctx.beginPath();
                ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                for (let j = 1; j < this.vertices.length; j++) {
                    ctx.lineTo(this.vertices[j].x, this.vertices[j].y);
                }
                ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
                ctx.lineWidth = "2"
                ctx.strokeStyle = `#333`
                ctx.fillStyle = `rgba(200,200,200,1)`
                //edge limits
                if (this.position.y < maxHeight) {
                    Matter.Body.setPosition(this, { x: this.holdX, y: maxHeight });
                } else if (this.position.y > y) {
                    ctx.fillStyle = `rgba(255,255,255,${0.5 + 0.15 * Math.random()})`
                    Matter.Body.setPosition(this, { x: this.holdX, y: y });
                    //undoing force of gravity
                    this.force.y -= this.mass * simulation.g;
                    if (Matter.Query.collides(this, [player]).length) {
                        this.isUp = true
                        this.frictionAir = friction.up
                    }
                }
                ctx.fill();
                ctx.stroke();
                // hold horizontal position
                Matter.Body.setPosition(this, { x: this.holdX, y: this.position.y });
            },
            off() {
                Matter.Body.setPosition(this, { x: this.holdX, y: this.position.y });
                Matter.Body.setVelocity(this, { x: 0, y: this.velocity.y });
            },
            constraint: this.null,
            addConstraint() {
                this.constraint = Constraint.create({
                    pointA: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    bodyB: this,
                    stiffness: 0.01,
                    damping: 0.3
                });
                Composite.add(engine.world, this.constraint);
            },
            removeConstraint() {
                Composite.remove(engine.world, this.constraint, true)
            },
            drawTrack() {
                ctx.fillStyle = "#ccc"
                ctx.fillRect(this.holdX, y, 5, yTravel)
            }
        });
        Matter.Body.setDensity(who, 0.01) //10x density for added stability
        Composite.add(engine.world, who); //add to world
        who.classType = "body"
        return who
    },
    // spring(x, y, v = "-100 0  100 0  70 40  0 50  -70 40", force = 0.01, distance = 300, angle = 0) {
    //     const who = body[body.length] = Matter.Bodies.fromVertices(x, y, Vertices.fromPath(v), {
    //         collisionFilter: {
    //             category: cat.body,
    //             mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
    //         },
    //         inertia: Infinity, //prevents rotation
    //         isNotHoldable: true,
    //         friction: 1,
    //         frictionStatic: 1,
    //         restitution: 0,
    //         frictionAir: 1,
    //         density: 0.1,
    //         isReady: true,
    //         isResetting: false,
    //         query() {
    //             if (this.isReady) {
    //                 if (Matter.Query.collides(this, [player]).length) {
    //                     this.isReady = false
    //                     this.constraint.stiffness = 0
    //                     this.constraint.damping = 0 //0.3
    //                     this.frictionAir = 0
    //                     Matter.Body.setVelocity(this, { x: 0, y: 0 });
    //                     //show graphically  being ready?
    //                 }
    //             } else {
    //                 if (this.isResetting) {
    //                     this.constraint.stiffness += 0.0005
    //                     if (this.constraint.stiffness > 0.1) {
    //                         this.isResetting = false
    //                         this.isReady = true
    //                     }
    //                 } else {
    //                     if (Vector.magnitudeSquared(Vector.sub(this.position, {
    //                         x: x,
    //                         y: y
    //                     })) < distance * distance) {
    //                         this.force.y -= force * this.mass
    //                     } else {
    //                         this.constraint.damping = 1
    //                         this.frictionAir = 1
    //                         this.isResetting = true
    //                         Matter.Body.setVelocity(this, {
    //                             x: 0,
    //                             y: 0
    //                         });
    //                     }
    //                 }
    //             }
    //         }
    //     });
    //     who.constraint = Constraint.create({
    //         pointA: {
    //             x: who.position.x,
    //             y: who.position.y
    //         },
    //         bodyB: who,
    //         stiffness: 1,
    //         damping: 1
    //     });
    //     Composite.add(engine.world, who.constraint);
    //     return who
    // },
    // rotor(x, y, rotate = 0, radius = 800, width = 40, density = 0.0005) {
    //     const rotor1 = Matter.Bodies.rectangle(x, y, width, radius, {
    //         density: density,
    //         isNotHoldable: true,
    //         isNonStick: true,
    //         collisionFilter: {
    //             category: cat.map,
    //             mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
    //         },
    //     });
    //     const rotor2 = Matter.Bodies.rectangle(x, y, width, radius, {
    //         angle: Math.PI / 2,
    //         density: density,
    //         isNotHoldable: true,
    //         isNonStick: true,
    //         collisionFilter: {
    //             category: cat.map,
    //             mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
    //         },
    //     });
    //     rotor = Body.create({ //combine rotor1 and rotor2
    //         parts: [rotor1, rotor2],
    //         restitution: 0,
    //         collisionFilter: {
    //             category: cat.map,
    //             mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
    //         },
    //     });
    //     Matter.Body.setPosition(rotor, {
    //         x: x,
    //         y: y
    //     });
    //     Composite.add(engine.world, [rotor]);
    //     body[body.length] = rotor1
    //     body[body.length] = rotor2

    //     // setTimeout(function() {
    //     //     rotor.collisionFilter.category = cat.body;
    //     //     rotor.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet //| cat.map
    //     // }, 1000);

    //     const constraint = Constraint.create({ //fix rotor in place, but allow rotation
    //         pointA: {
    //             x: x,
    //             y: y
    //         },
    //         bodyB: rotor
    //     });
    //     Composite.add(engine.world, constraint);

    //     if (rotate) {
    //         rotor.rotate = function() {
    //             if (!m.isTimeDilated) {
    //                 Matter.Body.applyForce(rotor, {
    //                     x: rotor.position.x + 100,
    //                     y: rotor.position.y + 100
    //                 }, {
    //                     x: rotate * rotor.mass,
    //                     y: 0
    //                 })
    //             } else {
    //                 Matter.Body.setAngularVelocity(rotor, 0);
    //             }
    //         }
    //     }
    //     composite[composite.length] = rotor
    //     return rotor
    // },
    toggle(x, y, isOn = false, isLockOn = false) {
        spawn.mapVertex(x + 65, y + 2, "70 10 -70 10 -40 -10 40 -10"); //toggle platform
        map[map.length - 1].restitution = 0;
        map[map.length - 1].friction = 1; //
        map[map.length - 1].frictionStatic = 1;
        const width = 120
        const height = 15
        body[body.length] = Bodies.rectangle(x + width / 2, y + height / 2, width, height, { friction: 0.05, frictionAir: 0.01 });
        let flip = body[body.length - 1];
        flip.collisionFilter.category = cat.body
        flip.collisionFilter.mask = cat.player | cat.body
        flip.isNotHoldable = true
        flip.restitution = 0
        Matter.Body.setDensity(flip, 0.003)
        if (isOn) {
            Matter.Body.setAngle(flip, (0.25 - 0.5) * Math.PI)
        } else {
            Matter.Body.setAngle(flip, (-0.25 - 0.5) * Math.PI)
        }
        cons[cons.length] = Constraint.create({
            pointA: {
                x: x + 65,
                y: y - 5
            },
            bodyB: flip,
            stiffness: 1,
            length: 0
        });
        Composite.add(engine.world, [cons[cons.length - 1]]);
        Composite.add(engine.world, flip); //add to world
        flip.classType = "body"
        return {
            flip: flip,
            isOn: isOn,
            query() {
                const limit = {
                    right: (-0.25 - 0.5) * Math.PI,
                    left: (0.25 - 0.5) * Math.PI
                }
                if (flip.angle < limit.right) {
                    Matter.Body.setAngle(flip, limit.right)
                    Matter.Body.setAngularVelocity(flip, 0);
                    if (!isLockOn) this.isOn = false
                } else if (flip.angle > limit.left) {
                    Matter.Body.setAngle(flip, limit.left)
                    Matter.Body.setAngularVelocity(flip, 0);
                    this.isOn = true
                }
                if (this.isOn) {
                    ctx.beginPath();
                    ctx.moveTo(flip.vertices[0].x, flip.vertices[0].y);
                    for (let j = 1; j < flip.vertices.length; j++) {
                        ctx.lineTo(flip.vertices[j].x, flip.vertices[j].y);
                    }
                    ctx.lineTo(flip.vertices[0].x, flip.vertices[0].y);
                    ctx.fillStyle = "#3df"
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = color.blockS;
                    ctx.stroke();
                }
            },
        }
    },
    button(x, y, width = 126, isSpawnBase = true, isInvertedVertical = false, color = "hsl(0, 100%, 70%)") {
        if (isSpawnBase) {
            if (isInvertedVertical) {
                spawn.mapVertex(x + 65, y - 3, "100 -10 -100 -10 -70 10 70 10");
            } else {
                spawn.mapVertex(x + 65, y + 2, "100 10 -100 10 -70 -10 70 -10");
            }
            map[map.length - 1].restitution = 0;
            map[map.length - 1].friction = 1;
            map[map.length - 1].frictionStatic = 1;
        }
        // const buttonSensor = Bodies.rectangle(x + 35, y - 1, 70, 20, {
        //   isSensor: true
        // });
        if (isInvertedVertical) {
            return {
                isUp: false,
                min: {
                    x: x + 2,
                    y: y - 1
                },
                max: {
                    x: x + width,
                    y: y
                },
                width: width,
                height: 20,
                query() {
                    if (Matter.Query.region(body, this).length === 0 && Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        if (this.isUp === true) {
                            const list = Matter.Query.region(body, this) //are any blocks colliding with this
                            if (list.length > 0) {
                                if (list[0].bounds.max.x - list[0].bounds.min.x < 150 && list[0].bounds.max.y - list[0].bounds.min.y < 150) { //not too big of a block
                                    Matter.Body.setPosition(list[0], { //teleport block to the center of the button
                                        x: this.min.x + width / 2,
                                        y: list[0].position.y
                                    })
                                }
                                Matter.Body.setVelocity(list[0], { x: 0, y: 0 });
                            }
                        }
                        this.isUp = false;
                    }
                },
                queryRemove() {
                    if (Matter.Query.region(body, this).length === 0 && Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        if (this.isUp === true) {
                            const list = Matter.Query.region(body, this) //are any blocks colliding with this
                            if (list.length > 0) {
                                Matter.Composite.remove(engine.world, list[0]);
                                for (let i = 0; i < body.length; i++) {
                                    if (body[i] === list[0]) {
                                        body.splice(i, 1);
                                        break
                                    }
                                }
                                Matter.Body.setVelocity(list[0], { x: 0, y: 0 });
                            }
                        }
                        this.isUp = false;
                    }
                },
                queryPlayer() {
                    if (Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        this.isUp = false;
                    }
                },
                draw() {
                    ctx.fillStyle = color
                    if (this.isUp) {
                        ctx.fillRect(this.min.x, this.min.y, this.width, 20)
                    } else {
                        ctx.fillRect(this.min.x, this.min.y - 12, this.width, 25)
                    }
                }
            }
        } else {
            return {
                isUp: false,
                min: {
                    x: x + 2,
                    y: y - 11
                },
                max: {
                    x: x + width,
                    y: y - 10
                },
                width: width,
                height: 20,
                query() {
                    if (Matter.Query.region(body, this).length === 0 && Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        if (this.isUp === true) {
                            const list = Matter.Query.region(body, this) //are any blocks colliding with this
                            if (list.length > 0) {
                                if (list[0].bounds.max.x - list[0].bounds.min.x < 150 && list[0].bounds.max.y - list[0].bounds.min.y < 150) { //not too big of a block
                                    Matter.Body.setPosition(list[0], { //teleport block to the center of the button
                                        x: this.min.x + width / 2,
                                        y: list[0].position.y
                                    })
                                }
                                Matter.Body.setVelocity(list[0], { x: 0, y: 0 });
                            }
                        }
                        this.isUp = false;
                    }
                },
                queryRemove() {
                    if (Matter.Query.region(body, this).length === 0 && Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        if (this.isUp === true) {
                            const list = Matter.Query.region(body, this) //are any blocks colliding with this
                            if (list.length > 0) {
                                //delete triggering block
                                Matter.Composite.remove(engine.world, list[0]);
                                for (let i = 0; i < body.length; i++) {
                                    if (body[i] === list[0]) {
                                        body.splice(i, 1);
                                        break
                                    }
                                }
                                Matter.Body.setVelocity(list[0], { x: 0, y: 0 });
                            }
                        }
                        this.isUp = false;
                    }
                },
                queryPlayer() {
                    if (Matter.Query.region([player], this).length === 0) {
                        this.isUp = true;
                    } else {
                        this.isUp = false;
                    }
                },
                draw() {
                    ctx.fillStyle = color
                    if (this.isUp) {
                        ctx.fillRect(this.min.x, this.min.y - 10, this.width, 20)
                    } else {
                        ctx.fillRect(this.min.x, this.min.y - 3, this.width, 25)
                    }
                }
            }
        }
    },
    vanish(x, y, width, height, isVertical = false, hide = {
        x: 0,
        y: 400
    }) {
        x = x + width / 2
        y = y + height / 2
        const vertices = [{
            x: x,
            y: y,
            index: 0,
            isInternal: false
        }, {
            x: x + width,
            y: y,
            index: 1,
            isInternal: false
        }, {
            x: x + width,
            y: y + height,
            index: 4,
            isInternal: false
        }, {
            x: x,
            y: y + height,
            index: 3,
            isInternal: false
        }]
        const block = body[body.length] = Bodies.fromVertices(x, y, vertices, {
            // const block = body[body.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            isNonStick: true, //this keep sporangium from sticking
            isTouched: false,
            fadeTime: 10 + Math.ceil(0.25 * width),
            fadeCount: null,
            isThere: true,
            returnTime: 120,
            returnCount: 0,
            shrinkVertices(size) {
                if (isVertical) {
                    return [{
                        x: x,
                        y: y * size,
                        index: 0,
                        isInternal: false
                    }, {
                        x: x + width,
                        y: y * size,
                        index: 1,
                        isInternal: false
                    }, {
                        x: x + width,
                        y: (y + height) * size,
                        index: 4,
                        isInternal: false
                    }, {
                        x: x,
                        y: (y + height) * size,
                        index: 3,
                        isInternal: false
                    }]
                } else {
                    return [{
                        x: x * size,
                        y: y,
                        index: 0,
                        isInternal: false
                    }, {
                        x: (x + width) * size,
                        y: y,
                        index: 1,
                        isInternal: false
                    }, {
                        x: (x + width) * size,
                        y: y + height,
                        index: 4,
                        isInternal: false
                    }, {
                        x: x * size,
                        y: y + height,
                        index: 3,
                        isInternal: false
                    }]
                }
            },
            query() {
                if (this.isThere) {
                    if (this.isTouched) {
                        if (!m.isTimeDilated) {
                            this.fadeCount--
                            Matter.Body.setVertices(this, this.shrinkVertices(Math.max(this.fadeCount / this.fadeTime, 0.03)))
                        }
                        if (this.fadeCount < 1) {
                            Matter.Body.setPosition(this, hide)
                            this.isThere = false
                            this.isTouched = false
                            this.collisionFilter.mask = 0 //cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                            this.returnCount = this.returnTime
                            Matter.Body.setVertices(this, this.shrinkVertices(1))
                            Matter.Body.setVertices(this, vertices)
                        }
                    } else if (Matter.Query.collides(this, [player]).length) { // || (Matter.Query.collides(this, body).length)) {
                        this.isTouched = true
                        this.fadeCount = this.fadeTime;
                    }
                } else {
                    if (!m.isTimeDilated) {
                        this.returnCount--
                        if (this.returnCount < 1) {
                            Matter.Body.setPosition(this, {
                                x: x,
                                y: y
                            })
                            if (Matter.Query.collides(this, [player]).length) { //|| (Matter.Query.collides(this, body).length)) {
                                Matter.Body.setPosition(this, hide)
                                this.returnCount = 15
                            } else {
                                this.isThere = true
                                this.collisionFilter.mask = cat.player | cat.mob | cat.body | cat.bullet | cat.powerUp | cat.mobBullet
                                this.fadeCount = this.fadeTime
                                //delete any overlapping blocks
                                const blocks = Matter.Query.collides(this, body)
                                for (let i = 0; i < blocks.length; i++) {
                                    if (blocks[i].bodyB !== this && blocks[i].bodyB !== m.holdingTarget) { //dont' delete yourself   <----- bug here maybe...
                                        Matter.Composite.remove(engine.world, blocks[i].bodyB);
                                        blocks[i].bodyB.isRemoveMeNow = true
                                        for (let i = 1; i < body.length; i++) { //find which index in body array it is and remove from array
                                            if (body[i].isRemoveMeNow) {
                                                body.splice(i, 1);
                                                break
                                            }
                                        }
                                    }
                                }
                                //delete any overlapping mobs
                                // const mobsHits = Matter.Query.collides(this, mob)
                                // for (let i = 0; i < mobsHits.length; i++) {
                                //     if (mobsHits[i].bodyB !== this && mobsHits[i].bodyB !== m.holdingTarget) { //dont' delete yourself   <----- bug here maybe...
                                //         Matter.Composite.remove(engine.world, mobsHits[i].bodyB);
                                //         mobsHits[i].bodyB.isRemoveMeNow = true
                                //         for (let i = 1; i < mob.length; i++) { //find which index in body array it is and remove from array
                                //             if (mob[i].isRemoveMeNow) {
                                //                 mob.splice(i, 1);
                                //                 break
                                //             }
                                //         }
                                //     }
                                // }
                            }
                        }
                    }
                }
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x, v[0].y);
                for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[0].x, v[0].y);
                ctx.fillStyle = "#586370"
                ctx.fill();
                // const color = 220 * (1 - this.fadeCount / this.fadeTime)
                // ctx.fillStyle = `rgb(${color},220, 200)`
                // ctx.fillStyle = `rgba(0,220,200,${this.fadeCount/this.fadeTime+0.05})` 
                // ctx.strokeStyle = `#bff`
                // ctx.stroke();
            },
        });
        Matter.Body.setStatic(block, true); //make static
        Composite.add(engine.world, block); //add to world
        // who.classType = "body"
        if (simulation.isHorizontalFlipped) x *= -1
        return block
    },
    door(x, y, width, height, distance, speed = 1) {
        x = x + width / 2
        y = y + height / 2
        const doorBlock = body[body.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.body,//cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            isClosing: false,
            openClose() {
                if (!m.isTimeDilated) {
                    if (this.isClosing) {
                        if (this.position.y < y) { //try to close
                            if ( //if clear of stuff
                                Matter.Query.collides(this, [player]).length === 0 &&
                                Matter.Query.collides(this, body).length < 2 &&
                                Matter.Query.collides(this, mob).length === 0
                            ) {
                                const position = {
                                    x: this.position.x,
                                    y: this.position.y + speed
                                }
                                Matter.Body.setPosition(this, position)
                            }
                        }
                    } else {
                        if (this.position.y > y - distance) { //try to open 
                            const position = {
                                x: this.position.x,
                                y: this.position.y - speed
                            }
                            Matter.Body.setPosition(this, position)
                        }
                    }
                }
            },
            isClosed() {
                return this.position.y > y - 1
            },
            draw() {
                ctx.fillStyle = "#666"
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x, v[0].y);
                for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[0].x, v[0].y);
                ctx.fill();
            }
        });
        Matter.Body.setStatic(doorBlock, true); //make static
        Composite.add(engine.world, doorBlock); //add to world
        doorBlock.classType = "body"
        return doorBlock
    },
    doorMap(x, y, width, height, distance, speed = 20, addToWorld = true) { //for doors that use line of sight
        x = x + width / 2
        y = y + height / 2
        const door = map[map.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet,
                // mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            isClosing: false,
            openClose(isSetPaths = false) {
                if (!m.isTimeDilated) {
                    if (this.isClosing) {
                        if (this.position.y < y) { //try to close
                            if ( //if clear of stuff
                                Matter.Query.collides(this, [player]).length === 0 &&
                                Matter.Query.collides(this, body).length < 2 &&
                                Matter.Query.collides(this, mob).length === 0
                            ) {
                                const position = {
                                    x: this.position.x,
                                    y: this.position.y + speed
                                }
                                Matter.Body.setPosition(this, position)
                                if (isSetPaths) {
                                    simulation.draw.setPaths()
                                    simulation.draw.lineOfSightPrecalculation() //required precalculation for line of sight
                                }
                            }
                        }
                    } else {
                        if (this.position.y > y - distance) { //try to open 
                            const position = {
                                x: this.position.x,
                                y: this.position.y - speed
                            }
                            Matter.Body.setPosition(this, position)
                            if (isSetPaths) {
                                simulation.draw.setPaths()
                                simulation.draw.lineOfSightPrecalculation() //required precalculation for line of sight
                            }
                        }
                    }
                }
            },
            isClosed() {
                return this.position.y > y - 1
            },
            draw() {
                ctx.fillStyle = "#666"
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x, v[0].y);
                for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[0].x, v[0].y);
                ctx.fill();
            }
        });

        Matter.Body.setStatic(door, true); //make static
        if (addToWorld) Composite.add(engine.world, door); //add to world
        door.classType = "map"
        return door
    },
    portal(centerA, angleA, centerB, angleB) {
        const width = 50
        const height = 150
        const mapWidth = 200
        const unitA = Matter.Vector.rotate({ x: 1, y: 0 }, angleA)
        const unitB = Matter.Vector.rotate({ x: 1, y: 0 }, angleB)
        draw = function () {
            ctx.beginPath(); //portal
            let v = this.vertices;
            ctx.moveTo(v[0].x, v[0].y);
            for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
            ctx.fillStyle = this.color
            ctx.fill();
        }
        query = function (isRemoveBlocks = false) {
            if (Matter.Query.collides(this, [player]).length === 0) { //not touching player
                if (player.isInPortal === this) player.isInPortal = null
            } else if (player.isInPortal !== this) { //touching player
                if (m.buttonCD_jump === m.cycle) player.force.y = 0 // undo a jump right before entering the portal
                m.buttonCD_jump = 0 //disable short jumps when letting go of jump key
                player.isInPortal = this.portalPair
                //teleport
                if (this.portalPair.angle % (Math.PI / 2)) { //if left, right up or down
                    if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                    // Matter.Body.setPosition(player, this.portalPair.portal.position);
                    simulation.translatePlayerAndCamera(this.portalPair.portal.position)
                } else { //if at some odd angle
                    if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                    // Matter.Body.setPosition(player, this.portalPair.position);
                    simulation.translatePlayerAndCamera(this.portalPair.position)
                }
                //rotate velocity
                let mag
                if (this.portalPair.angle !== 0 && this.portalPair.angle !== Math.PI) { //portal that fires the player up
                    mag = Math.max(10, Math.min(50, player.velocity.y * 0.8)) + 11
                } else {
                    mag = Math.max(6, Math.min(50, Vector.magnitude(player.velocity)))
                }
                let v = Vector.mult(this.portalPair.unit, mag)
                Matter.Body.setVelocity(player, v);
                // // move bots to player
                // for (let i = 0; i < bullet.length; i++) {
                //     if (bullet[i].botType) {
                //         Matter.Body.setPosition(bullet[i], Vector.sub(bullet[i].position, change));
                //         // Matter.Body.setPosition(bullet[i], this.portalPair.portal.position);
                //         // Matter.Body.setPosition(bullet[i], Vector.add(this.portalPair.portal.position, { x: 250 * (Math.random() - 0.5), y: 250 * (Math.random() - 0.5) }));
                //         // Matter.Body.setVelocity(bullet[i], { x: 0, y: 0 });
                //     }
                // }
                if (tech.isHealAttract) {  //send heals to next portal
                    for (let i = 0; i < powerUp.length; i++) {
                        if (powerUp[i].name === "heal" && Vector.magnitudeSquared(Vector.sub(powerUp[i].position, m.pos)) < 1000000) {
                            Matter.Body.setPosition(powerUp[i], Vector.add(this.portalPair.portal.position, { x: 500 * (Math.random() - 0.5), y: 500 * (Math.random() - 0.5) }));
                        }
                    }
                }
                if (tech.isForeverDrones) { //send drones to next portal
                    for (let i = 0; i < bullet.length; i++) {
                        if (bullet[i].endCycle === Infinity) {
                            Matter.Body.setPosition(bullet[i], Vector.add(this.portalPair.portal.position, { x: 500 * (Math.random() - 0.5), y: 500 * (Math.random() - 0.5) }));
                        }
                    }
                }
              if (tech.isSounds) {
                audioPlayer.requestSound('Teleport');
              }
            }
            for (let i = 0, len = body.length; i < len; i++) {
                if (body[i] !== m.holdingTarget) {
                    // body[i].bounds.max.x - body[i].bounds.min.x < 100 && body[i].bounds.max.y - body[i].bounds.min.y < 100
                    if (Matter.Query.collides(this, [body[i]]).length === 0) {
                        if (body[i].isInPortal === this) body[i].isInPortal = null
                    } else if (body[i].isInPortal !== this) { //touching this portal, but for the first time
                        if (isRemoveBlocks) {
                            Matter.Composite.remove(engine.world, body[i]);
                            body.splice(i, 1);
                            break
                        }
                        body[i].isInPortal = this.portalPair
                        //teleport
                        if (this.portalPair.angle % (Math.PI / 2)) { //if left, right up or down
                            Matter.Body.setPosition(body[i], this.portalPair.portal.position);
                        } else { //if at some odd angle
                            Matter.Body.setPosition(body[i], this.portalPair.position);
                        }
                        //rotate velocity
                        let mag
                        if (this.portalPair.angle !== 0 && this.portalPair.angle !== Math.PI) { //portal that fires up
                            mag = Math.max(10, Math.min(50, body[i].velocity.y * 0.8)) + 11
                            let v = Vector.mult(this.portalPair.unit, mag)
                            //rotate the velocity vector of blocks fired directly up to keep them from getting stuck endlessly in vertical portals
                            Matter.Body.setVelocity(body[i], Vector.rotate(v, 0.5 * (Math.random() - 0.5)));
                        } else {
                            mag = Math.max(6, Math.min(50, Vector.magnitude(body[i].velocity)))
                            let v = Vector.mult(this.portalPair.unit, mag)
                            Matter.Body.setVelocity(body[i], v);
                        }

                    }
                }
            }

            //remove block if touching
            // if (body.length) {
            //   touching = Matter.Query.collides(this, body)
            //   for (let i = 0; i < touching.length; i++) {
            //     if (touching[i].bodyB !== m.holdingTarget) {
            //       for (let j = 0, len = body.length; j < len; j++) {
            //         if (body[j] === touching[i].bodyB) {
            //           body.splice(j, 1);
            //           len--
            //           Matter.Composite.remove(engine.world, touching[i].bodyB);
            //           break;
            //         }
            //       }
            //     }
            //   }
            // }

            // if (touching.length !== 0 && touching[0].bodyB !== m.holdingTarget) {
            //   if (body.length) {
            //     for (let i = 0; i < body.length; i++) {
            //       if (body[i] === touching[0].bodyB) {
            //         body.splice(i, 1);
            //         break;
            //       }
            //     }
            //   }
            //   Matter.Composite.remove(engine.world, touching[0].bodyB);
            // }
        }

        const portalA = composite[composite.length] = Bodies.rectangle(centerA.x, centerA.y, width, height, {
            isSensor: true,
            angle: angleA,
            color: "hsla(197, 100%, 50%,0.7)",
            draw: draw,
        });
        const portalB = composite[composite.length] = Bodies.rectangle(centerB.x, centerB.y, width, height, {
            isSensor: true,
            angle: angleB,
            color: "hsla(29, 100%, 50%, 0.7)",
            draw: draw
        });
        const mapA = composite[composite.length] = Bodies.rectangle(centerA.x - 0.5 * unitA.x * mapWidth, centerA.y - 0.5 * unitA.y * mapWidth, mapWidth, height + 10, {
            collisionFilter: {
                category: cat.map,
                mask: cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            unit: unitA,
            angle: angleA,
            color: color.map,
            draw: draw,
            query: query,
            lastPortalCycle: 0
        });
        Matter.Body.setStatic(mapA, true); //make static
        Composite.add(engine.world, mapA); //add to world

        const mapB = composite[composite.length] = Bodies.rectangle(centerB.x - 0.5 * unitB.x * mapWidth, centerB.y - 0.5 * unitB.y * mapWidth, mapWidth, height + 10, {
            collisionFilter: {
                category: cat.map,
                mask: cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            unit: unitB,
            angle: angleB,
            color: color.map,
            draw: draw,
            query: query,
            lastPortalCycle: 0,
        });
        Matter.Body.setStatic(mapB, true); //make static
        Composite.add(engine.world, mapB); //add to world

        mapA.portal = portalA
        mapB.portal = portalB
        mapA.portalPair = mapB
        mapB.portalPair = mapA
        return [portalA, portalB, mapA, mapB]
    },
    drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        return {
            x: x,
            y: yMin,
            period: period,
            dropCycle: 0,
            speed: 0,
            draw() {
                if (!m.isTimeDilated) {
                    if (this.dropCycle < simulation.cycle) { //reset
                        this.dropCycle = simulation.cycle + this.period + Math.floor(40 * Math.random())
                        this.y = yMin
                        this.speed = 1
                    } else { //fall
                        this.speed += 0.35 //acceleration from gravity
                        this.y += this.speed
                    }
                }
                if (this.y < yMax) { //draw
                    ctx.fillStyle = color //"hsla(160, 100%, 35%,0.75)"
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
    },
    laser(p1, p2, damage = 0.14, color = "#f00") {
        return {
            isOn: true,
            position: p1,
            look: p2,
            color: color,
            query() {
                if (!m.isTimeDilated) {
                    let best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null }
                    best = vertexCollision(this.position, this.look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);
                    // hitting player
                    if ((best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                        const dmg = damage * spawn.dmgToPlayerByLevelsCleared();
                        m.takeDamage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: dmg * 1500,
                            color: "rgba(255,0,0,0.5)",
                            time: 20
                        });
                    }
                    //draw
                    if (best.dist2 === Infinity) best = this.look;
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 5;
                    ctx.setLineDash([50 + 200 * Math.random(), 50 * Math.random()]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            },
            countDown: 0,
            countTotal: 480,
            countDelay: 440,
            motionQuery() {
                if (!m.isTimeDilated) {
                    let best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null }
                    best = vertexCollision(this.position, this.look, m.isCloak ? [map, body] : [map, body, [playerBody, playerHead]]);

                    if (this.countDown === 0) {
                        if ((best.who === playerBody || best.who === playerHead)) this.countDown = this.countTotal // hitting player
                        ctx.strokeStyle = `rgba(255,255,255,0.4)`;
                        ctx.lineWidth = 8 + 3 * Math.sin(simulation.cycle * 0.3);
                    } else if (this.countDown > this.countDelay) {
                        ctx.strokeStyle = `rgba(255,255,255,0.8)`;
                        ctx.lineWidth = 11;
                        this.countDown--
                    } else {
                        this.countDown--
                        if ((best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) { // hitting player
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                            const dmg = damage * spawn.dmgToPlayerByLevelsCleared()
                            m.takeDamage(dmg);
                            simulation.drawList.push({ //add dmg to draw queue
                                x: best.x,
                                y: best.y,
                                radius: dmg * 1500,
                                color: "rgba(255,0,0,0.5)",
                                time: 20
                            });
                        }
                        ctx.strokeStyle = this.color;
                        ctx.lineWidth = 5;
                        ctx.setLineDash([50 + 200 * Math.random(), 50 * Math.random()]);
                    }
                    //draw
                    if (best.dist2 === Infinity) best = this.look;
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            },
        }
    },
    fizzler(p1, p2) {
        return {
            isOn: true,
            position: p1,
            look: p2,
            color: color,
            query() {
                if (!m.isTimeDilated) {
                    // let best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null }
                    // best = vertexCollision(this.position, this.look, [body]);

                    const hits = Matter.Query.ray(body, this.position, this.look, 25)
                    for (let i = hits.length - 1; i > -1; i--) {
                        // console.log(what)
                        const what = hits[i].bodyA
                        simulation.drawList.push({ x: what.position.x, y: what.position.y, radius: 11, color: "rgba(0,160,255,0.7)", time: 10 });
                        if (what === m.holdingTarget) m.drop()
                        for (let i = 0; i < body.length; i++) {
                            if (body[i] === what) {
                                body.splice(i, 1);
                                break
                            }
                        }
                        Matter.Composite.remove(engine.world, what);
                    }
                    //draw
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(this.look.x, this.look.y);
                    // ctx.strokeStyle = "rgba(50,200,255,0.3)";
                    // ctx.lineWidth = 2 + 5 * Math.random()
                    // ctx.stroke();
                    ctx.strokeStyle = "rgba(50,160,255,0.17)";
                    ctx.lineWidth = 35 + 25 * Math.random() * Math.random();
                    ctx.stroke();

                    //draw random dots in the path
                    if (Math.random() < 0.05) {
                        const r = Math.random();
                        const where = {
                            x: this.position.x + r * (this.look.x - this.position.x) + 60 * (Math.random() - 0.5),
                            y: this.position.y + r * (this.look.y - this.position.y) + 60 * (Math.random() - 0.5)
                        };
                        simulation.drawList.push({ x: where.x, y: where.y, radius: 6, color: "rgba(0,160,255,0.7)", time: 5 });
                    }
                }
            },
        }
    },
    isHazardRise: false,
    hazard(x, y, width, height, damage = 0.002) {
        return {
            min: { x: x, y: y },
            max: { x: x + width, y: y + height },
            width: width,
            height: height,
            maxHeight: height,
            isOn: true,
            opticalQuery() {
                if (this.isOn) {
                    //draw
                    ctx.fillStyle = `hsla(0, 100%, 50%,${0.6 + 0.4 * Math.random()})`
                    ctx.fillRect(this.min.x, this.min.y, this.width, this.height)
                    //collision with player
                    if (this.height > 0 && Matter.Query.region([player], this).length && !(m.isCloak)) {
                        if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) {
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles;
                            damage *= spawn.dmgToPlayerByLevelsCleared()
                            m.takeDamage(damage)
                            simulation.drawList.push({ //add dmg to draw queue
                                x: player.position.x,
                                y: player.position.y,
                                radius: damage * 1500,
                                color: simulation.mobDmgColor,
                                time: 20
                            });
                        }
                    }
                }
            },
            query() {
                if (this.isOn) {
                    ctx.fillStyle = "hsla(160, 100%, 35%,0.75)"
                    const offset = 5 * Math.sin(simulation.cycle * 0.015)
                    ctx.fillRect(this.min.x, this.min.y + offset, this.width, this.height - offset)

                    if (this.height > 0 && Matter.Query.region([player], this).length) {
                        if (m.immuneCycle < m.cycle) {
                            const DRAIN = 0.004 * (tech.isRadioactiveResistance ? 0.2 : 1)
                            if (m.energy > DRAIN) {
                                m.energy -= DRAIN
                                if (tech.isEnergyHealth && m.energy < 0) m.death()
                            } else {
                                m.takeDamage(damage * (tech.isRadioactiveResistance ? 0.2 : 1) * spawn.dmgToPlayerByLevelsCleared())
                            }
                        }
                        //float
                        if (player.velocity.y > 5) player.force.y -= 0.95 * player.mass * simulation.g
                        const slowY = (player.velocity.y > 0) ? Math.max(0.8, 1 - 0.002 * player.velocity.y * player.velocity.y) : Math.max(0.98, 1 - 0.001 * Math.abs(player.velocity.y)) //down : up
                        Matter.Body.setVelocity(player, {
                            x: Math.max(0.95, 1 - 0.036 * Math.abs(player.velocity.x)) * player.velocity.x,
                            y: slowY * player.velocity.y
                        });
                        //undo 1/2 of gravity
                        player.force.y -= 0.5 * player.mass * simulation.g;

                    }
                    //float power ups
                    powerUpCollide = Matter.Query.region(powerUp, this)
                    for (let i = 0, len = powerUpCollide.length; i < len; i++) {
                        const diameter = 2 * powerUpCollide[i].size
                        const buoyancy = 1 - 0.2 * Math.max(0, Math.min(diameter, this.min.y - powerUpCollide[i].position.y + powerUpCollide[i].size)) / diameter
                        powerUpCollide[i].force.y -= buoyancy * 1.24 * powerUpCollide[i].mass * simulation.g;
                        Matter.Body.setVelocity(powerUpCollide[i], {
                            x: powerUpCollide[i].velocity.x,
                            y: 0.97 * powerUpCollide[i].velocity.y
                        });
                    }
                }
            },
            // draw() {
            //     if (this.isOn) {
            //         ctx.fillStyle = color
            //         ctx.fillRect(this.min.x, this.min.y, this.width, this.height)
            //     }
            // },
            levelRise(growRate = 1) {
                if (this.height < this.maxHeight && !m.isTimeDilated) {
                    this.height += growRate
                    this.min.y -= growRate
                    this.max.y = this.min.y + this.height
                }
            },
            levelFall(fallRate = 1) {
                if (this.height > 0 && !m.isTimeDilated) {
                    this.height -= fallRate
                    this.min.y += fallRate
                    this.max.y = this.min.y + this.height
                }
            },
            level(isFill, growSpeed = 1) {
                if (!m.isTimeDilated) {
                    if (isFill) {
                        if (this.height < this.maxHeight) {
                            this.height += growSpeed
                            this.min.y -= growSpeed
                            this.max.y = this.min.y + this.height
                        }
                    } else if (this.height > 0) {
                        this.height -= growSpeed
                        this.min.y += growSpeed
                        this.max.y = this.min.y + this.height
                    }
                }
            }
        }
    },
    mover(x, y, width, height, VxGoal = -6, force = VxGoal > 0 ? 0.0005 : -0.0005) {
        //VxGoal below 3 don't move well, maybe try adjusting the force
        x = x + width / 2
        y = y + height / 2
        const rect = map[map.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 0,
            frictionStatic: 0,
            restitution: 0,
            isClosing: false,
            isMover: true,
            VxGoal: VxGoal,
            force: force,
            push() {
                if (!m.isTimeDilated) {
                    const touchingPlayer = Matter.Query.collides(this, [jumpSensor])
                    if (touchingPlayer.length) {
                        m.moverX = this.VxGoal
                        if ((this.VxGoal > 0 && player.velocity.x < this.VxGoal) || (this.VxGoal < 0 && player.velocity.x > this.VxGoal)) {
                            player.force.x += this.force * player.mass
                        }
                        m.Vx = player.velocity.x - this.VxGoal
                    }
                    let pushBlock = (who) => {
                        if (!who.isMover) {
                            if ((this.VxGoal > 0 && who.velocity.x < this.VxGoal) || (this.VxGoal < 0 && who.velocity.x > this.VxGoal)) {
                                who.force.x += this.force * who.mass
                            }
                            const stoppingFriction = 0.5
                            Matter.Body.setVelocity(who, { x: this.VxGoal * (1 - stoppingFriction) + who.velocity.x * stoppingFriction, y: who.velocity.y });
                            Matter.Body.setAngularVelocity(who, who.angularVelocity * 0.9)
                        }
                    }
                    const blocks = Matter.Query.collides(this, body)
                    for (let i = 0; i < blocks.length; i++) {
                        pushBlock(blocks[i].bodyA)
                        pushBlock(blocks[i].bodyB)
                    }
                    const mobTargets = Matter.Query.collides(this, mob)
                    for (let i = 0; i < mobTargets.length; i++) {
                        pushBlock(mobTargets[i].bodyA)
                        pushBlock(mobTargets[i].bodyB)
                    }
                    let pushPowerUp = (who) => {
                        if (!who.isMover) {
                            if ((this.VxGoal > 0 && who.velocity.x < this.VxGoal) || (this.VxGoal < 0 && who.velocity.x > this.VxGoal)) {
                                who.force.x += 2 * this.force * who.mass
                            }
                            const stoppingFriction = 0.5
                            Matter.Body.setVelocity(who, { x: this.VxGoal * (1 - stoppingFriction) + who.velocity.x * stoppingFriction, y: who.velocity.y });
                        }
                    }
                    const powers = Matter.Query.collides(this, powerUp)
                    for (let i = 0; i < powers.length; i++) {
                        pushPowerUp(powers[i].bodyA)
                        pushPowerUp(powers[i].bodyB)
                    }
                }
            },
            draw() {
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x + 2, v[0].y);
                // for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[1].x - 2, v[1].y);
                ctx.strokeStyle = "#000"
                ctx.lineWidth = 4;
                ctx.setLineDash([40, 40]);
                ctx.lineDashOffset = (-simulation.cycle * this.VxGoal) % 80;
                ctx.stroke();
                ctx.setLineDash([0, 0]);
            },
            drawFast() {
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x + 2, v[0].y);
                // for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[1].x - 2, v[1].y);
                ctx.strokeStyle = "#000"
                ctx.lineWidth = 4;
                ctx.setLineDash([60, 60]);
                ctx.lineDashOffset = (-simulation.cycle * this.VxGoal) % 120;
                ctx.stroke();
                ctx.setLineDash([0, 0]);
            }
        });
        Matter.Body.setStatic(rect, true); //make static
        return rect
    },
    transport(x, y, width, height, VxGoal = -6, force = VxGoal > 0 ? 0.0005 : -0.0005) {
        //horizontal moving platform
        //VxGoal below 3 don't move well, maybe try adjusting the force
        x = x + width / 2
        y = y + height / 2
        const rect = body[body.length] = Bodies.rectangle(x, y, width, height, {
            collisionFilter: {
                category: cat.body,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
            },
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 0,
            frictionStatic: 0,
            restitution: 0,
            isClosing: false,
            isMover: true,
            VxGoal: VxGoal,
            force: force,
            move() {
                if (!m.isTimeDilated) {
                    Matter.Body.setPosition(this, { x: this.position.x + this.VxGoal, y: this.position.y }); //horizontal movement
                    const touchingPlayer = Matter.Query.collides(this, [jumpSensor])
                    if (touchingPlayer.length) {
                        m.moverX = this.VxGoal
                        if ((this.VxGoal > 0 && player.velocity.x < this.VxGoal) || (this.VxGoal < 0 && player.velocity.x > this.VxGoal)) {
                            player.force.x += this.force * player.mass
                        }
                        m.Vx = player.velocity.x - this.VxGoal
                    }
                    let pushBlock = (who) => {
                        if (!who.isMover) {
                            if ((this.VxGoal > 0 && who.velocity.x < this.VxGoal) || (this.VxGoal < 0 && who.velocity.x > this.VxGoal)) {
                                who.force.x += this.force * who.mass
                            }
                            const stoppingFriction = 0.5
                            Matter.Body.setVelocity(who, { x: this.VxGoal * (1 - stoppingFriction) + who.velocity.x * stoppingFriction, y: who.velocity.y });
                            Matter.Body.setAngularVelocity(who, who.angularVelocity * 0.8)
                        }
                    }
                    const blocks = Matter.Query.collides(this, body)
                    for (let i = 0; i < blocks.length; i++) {
                        pushBlock(blocks[i].bodyA)
                        pushBlock(blocks[i].bodyB)
                    }
                }
            },
            draw() {
                ctx.beginPath();
                const v = this.vertices;
                ctx.moveTo(v[0].x, v[0].y);
                for (let i = 1; i < v.length; ++i) ctx.lineTo(v[i].x, v[i].y);
                ctx.lineTo(v[0].x, v[0].y);
                ctx.fillStyle = "#586370"
                ctx.fill();
            },
            changeDirection(isRight) {
                if (isRight) {
                    this.VxGoal = Math.abs(this.VxGoal)
                    this.force = Math.abs(this.force)
                    if (Matter.Query.collides(this, [jumpSensor]).length) player.force.x += this.trainKickPlayer * this.force * player.mass
                } else {
                    this.VxGoal = -Math.abs(this.VxGoal)
                    this.force = -Math.abs(this.force)
                    if (Matter.Query.collides(this, [jumpSensor]).length) player.force.x += this.trainKickPlayer * this.force * player.mass
                }
            },
            trainSpeed: Math.abs(VxGoal),
            trainKickPlayer: 12 * Math.abs(force),
            isSensing: false,
            stops: { left: x, right: x + 1000 }, //this should probably be reset in the level code for the actual train stops
            trainStop() {
                if (this.isMoving) {
                    this.move();
                    //oscillate back and forth
                    if (this.position.x < this.stops.left) {//stop
                        this.VxGoal = this.trainSpeed
                        this.force = 0.0005
                        this.isMoving = false
                        this.isSensing = false
                        if (Matter.Query.collides(this, [jumpSensor]).length) player.force.x += this.trainKickPlayer * player.mass * (this.VxGoal > 0 ? 1 : -1)//give player a kick so they don't fall off                        
                    } else if (this.position.x > this.stops.right) {//stop
                        this.VxGoal = -this.trainSpeed
                        this.force = -0.0005
                        this.isMoving = false
                        this.isSensing = false
                        if (Matter.Query.collides(this, [jumpSensor]).length) player.force.x += this.trainKickPlayer * player.mass * (this.VxGoal > 0 ? 1 : -1)//give player a kick so they don't fall off
                    }
                } else if (this.isSensing) {
                    if (Matter.Query.collides(this, [jumpSensor]).length) {
                        this.isMoving = true
                        this.move(); //needs to move out of the stop range
                        // if (Matter.Query.collides(this, [jumpSensor]).length) player.force.x += trainKickPlayer * player.mass * (this.VxGoal > 0 ? 1 : -1)//give player a kick so they don't fall off
                        if (Matter.Query.collides(this, [jumpSensor]).length) {
                            Matter.Body.setVelocity(player, { x: this.VxGoal, y: player.velocity.y });
                        }
                    } else if (this.position.x > this.stops.right && player.position.x < this.stops.left + 500) {//head to other stop if the player is far away
                        this.changeDirection(false) //go left
                        this.isMoving = true
                        this.move(); //needs to move out of the stop range
                    } else if (this.position.x < this.stops.left && player.position.x > this.stops.right - 500) {//head to other stop if the player is far away
                        this.changeDirection(true) //go right
                        this.isMoving = true
                        this.move(); //needs to move out of the stop range
                    }
                } else if (!Matter.Query.collides(this, [jumpSensor]).length) {//wait until player is off the train to start sensing
                    this.isSensing = true
                }
            },
        });
        Matter.Body.setStatic(rect, true); //make static
        Composite.add(engine.world, rect); //add to world
        rect.classType = "body"
        return rect
    },
    chain(x, y, angle = 0, isAttached = true, len = 15, radius = 20, stiffness = 1, damping = 1) {
        const gap = 2 * radius
        const unit = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        for (let i = 0; i < len; i++) {
            body[body.length] = Bodies.polygon(x + gap * unit.x * i, y + gap * unit.y * i, 12, radius, {
                inertia: Infinity,
                isNotHoldable: true
            });
            const who = body[body.length - 1]
            who.collisionFilter.category = cat.body;
            who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
            Composite.add(engine.world, who); //add to world
            who.classType = "body"
        }
        for (let i = 1; i < len; i++) { //attach blocks to each other
            consBB[consBB.length] = Constraint.create({
                bodyA: body[body.length - i],
                bodyB: body[body.length - i - 1],
                stiffness: stiffness,
                damping: damping
            });
            Composite.add(engine.world, consBB[consBB.length - 1]);
        }
        cons[cons.length] = Constraint.create({ //pin first block to a point in space
            pointA: {
                x: x,
                y: y
            },
            bodyB: body[body.length - len],
            stiffness: 1,
            damping: damping
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        if (isAttached) {
            cons[cons.length] = Constraint.create({ //pin last block to a point in space
                pointA: {
                    x: x + gap * unit.x * (len - 1),
                    y: y + gap * unit.y * (len - 1)
                },
                bodyB: body[body.length - 1],
                stiffness: 1,
                damping: damping
            });
            Composite.add(engine.world, cons[cons.length - 1]);
        }
    },
    // softBody(x, y, angle = 0, isAttached = true, len = 15, radius = 20, stiffness = 1, damping = 1) {
    // https://github.com/liabru/matter-js/blob/master/examples/softBody.js
    // https://brm.io/matter-js/docs/classes/Composites.html
    // https://codepen.io/Shokeen/pen/EmOLJO?editors=0010
    // },
    //******************************************************************************************************************
    //******************************************************************************************************************
    //******************************************************************************************************************
    //******************************************************************************************************************
    
    initialPowerUps() {
        //wait to spawn power ups until unpaused
        //power ups don't spawn in experiment mode, so they don't get removed at the start of experiment mode
        const goal = simulation.cycle + 10
        function cycle() {
            if (simulation.cycle > goal) {
                if (localSettings.loreCount === 6) {
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2170, "field", false);
                } else {
                    powerUps.spawnStartingPowerUps(2095 + 20 * (Math.random() - 0.5), -2200);
                }
                if (simulation.difficultyMode === 1) {
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2600, "ammo", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2550, "ammo", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2400, "heal", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2350, "heal", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2350, "heal", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2100, "research", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2060, "research", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2120, "research", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2075, "research", false);
                } else if (simulation.difficultyMode > 4) {

                } else {
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2300, "heal", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2100, "heal", false);
                    powerUps.spawn(2095 + 20 * (Math.random() - 0.5), -2060, "research", false);
                }
                //spin the power ups to prevent them from stacking awkwardly
                for (let i = 0; i < powerUp.length; i++) {
                    Matter.Body.setAngularVelocity(powerUp[i], 5 * (Math.random() - 0.5))
                }
            } else {
                requestAnimationFrame(cycle);
            }
        }
        requestAnimationFrame(cycle);
    },
    
};