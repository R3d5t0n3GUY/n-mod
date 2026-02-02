setTimeout(() => {
    fileLoads.isMainLevelsJS = true; //for file handling in fileTester.js
}, 10);

const mainLevels = {
    initial() {
        if (level.levelsCleared === 0) { //if this is the 1st level of the game
            level.initialPowerUps()
            if (level.levelsCleared === 0) powerUps.directSpawn(-60, -950, "difficulty", false);

            if (!simulation.isCheating && !m.isShipMode && !build.isExperimentRun) {
                spawn.wireFoot();
                spawn.wireFootLeft();
                spawn.wireKnee();
                spawn.wireKneeLeft();
                spawn.wireHead();
            } else {
                simulation.isCheating = true;
            }

            if (localSettings.levelsClearedLastGame < 3) {
                //powerUps.spawn(2095 + 2 * Math.random(), -1270, "heal", false);
            } else if (!build.isExperimentRun) {
                simulation.trails(70)
                //bonus power ups for clearing runs in the last game
                if (!simulation.isCheating && localSettings.levelsClearedLastGame > 1) {
                    let entangled = false
                    for (let i = 0; i < Math.ceil(localSettings.levelsClearedLastGame / 1.5); i++) {
                        if (Math.random() < 0.25 && localSettings.entanglement && !entangled) {
                            if (Math.random() < 0.37) entangled = true
                            powerUps.spawn(2095 + 2 * Math.random(), -1270 - 50 * i, "entanglement", false); //chance to spawn entanglement
                        } else {
                            powerUps.spawn(2095 + 2 * Math.random(), -1270 - 50 * i, "tech", false); //spawn a tech for levels cleared in last game
                        }
                    }
                    simulation.inGameConsole(`for (let i <span class='color-symbol'>=</span> 0; i <span class='color-symbol'><</span> localSettings.levelsClearedLastGame <span class='color-symbol'>/</span> 2; i<span class='color-symbol'>++</span>)`);
                    simulation.inGameConsole(`{ powerUps.spawn(m.pos.x, m.pos.y, "tech") <em>//simulation superposition</em>}`);
                    localSettings.levelsClearedLastGame = 0 //after getting bonus power ups reset run history
                    if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
                }
            }
            spawn.mapRect(2025, 0, 150, 50); //lid to floor hole
        } else {
            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    if (level.levels[level.onLevel] === "initial") spawn.sneaker(2100, -1500 - 50 * i);
                }, 2000 + 500 * i);
            }
        }

        const wires = new Path2D() //pre-draw the complex lighting path to save processing
        wires.moveTo(-150, -275)
        wires.lineTo(80, -275)
        wires.lineTo(80, -1000)
        wires.moveTo(-150, -265)
        wires.lineTo(90, -265)
        wires.lineTo(90, -1000)
        wires.moveTo(-150, -255)
        wires.lineTo(100, -255)
        wires.lineTo(100, -1000)
        wires.moveTo(-150, -245)
        wires.lineTo(1145, -245)
        wires.lineTo(1145, 0)
        wires.moveTo(-150, -235)
        wires.lineTo(1135, -235)
        wires.lineTo(1135, 0)
        wires.moveTo(-150, -225)
        wires.lineTo(1125, -225)
        wires.lineTo(1125, 0)
        wires.moveTo(-150, -215)
        wires.lineTo(460, -215)
        wires.lineTo(460, 0)
        wires.moveTo(-150, -205)
        wires.lineTo(450, -205)
        wires.lineTo(450, 0)
        wires.moveTo(-150, -195)
        wires.lineTo(440, -195)
        wires.lineTo(440, 0)

        wires.moveTo(1155, 0)
        wires.lineTo(1155, -450)
        wires.lineTo(1000, -450)
        wires.lineTo(1000, -1000)
        wires.moveTo(1165, 0)
        wires.lineTo(1165, -460)
        wires.lineTo(1010, -460)
        wires.lineTo(1010, -1000)
        wires.moveTo(1175, 0)
        wires.lineTo(1175, -470)
        wires.lineTo(1020, -470)
        wires.lineTo(1020, -1000)
        wires.moveTo(1185, 0)
        wires.lineTo(1185, -480)
        wires.lineTo(1030, -480)
        wires.lineTo(1030, -1000)
        wires.moveTo(1195, 0)
        wires.lineTo(1195, -490)
        wires.lineTo(1040, -490)
        wires.lineTo(1040, -1000)

        wires.moveTo(1625, -1000)
        wires.lineTo(1625, 0)
        wires.moveTo(1635, -1000)
        wires.lineTo(1635, 0)
        wires.moveTo(1645, -1000)
        wires.lineTo(1645, 0)
        wires.moveTo(1655, -1000)
        wires.lineTo(1655, 0)
        wires.moveTo(1665, -1000)
        wires.lineTo(1665, 0)

        wires.moveTo(1675, -465)
        wires.lineTo(2325, -465)
        wires.lineTo(2325, 0)
        wires.moveTo(1675, -455)
        wires.lineTo(2315, -455)
        wires.lineTo(2315, 0)
        wires.moveTo(1675, -445)
        wires.lineTo(2305, -445)
        wires.lineTo(2305, 0)
        wires.moveTo(1675, -435)
        wires.lineTo(2295, -435)
        wires.lineTo(2295, 0)

        wires.moveTo(2335, 0)
        wires.lineTo(2335, -710)
        wires.lineTo(2600, -710)
        wires.moveTo(2345, 0)
        wires.lineTo(2345, -700)
        wires.lineTo(2600, -700)
        wires.moveTo(2355, 0)
        wires.lineTo(2355, -690)
        wires.lineTo(2600, -690)

        let isSpawnedWarp = false
        level.custom = () => {
            if (!isSpawnedWarp && simulation.testing) {
                isSpawnedWarp = true
                powerUps.directSpawn(m.pos.x, -900, "warp")
                // powerUps.directSpawn(2100, -1200, "warp")
            }
            //working on a message using text
            // ctx.font = "50px Arial";
            // ctx.fillStyle = "rgba(0,0,0,0.3)"
            // for (let i = 0; i < 5; i++) {
            //     const wiggle = 2
            //     ctx.fillText("move", 500 + wiggle * Math.random(), -500 + wiggle * Math.random());
            //     ctx.fillText("move", 500, -400);
            // }

            //push around power ups stuck in the tube wall
            if (!(simulation.cycle % 30) && level.onLevel === 0) {
                for (let i = 0, len = powerUp.length; i < len; i++) {
                    if (powerUp[i].name === "instructions") {
                        if (simulation.isCheating) {
                            Matter.Composite.remove(engine.world, powerUp[i]);
                            powerUp.splice(i, 1);
                            break
                        }
                    } else if (powerUp[i].position.y < -1000) {
                        powerUp[i].force.x += 0.01 * (Math.random() - 0.5) * powerUp[i].mass
                    }

                }
            }
            //draw binary number
            const binary = (localSettings.runCount >>> 0).toString(2)
            const height = 20
            const width = 8
            const yOff = -40 //-580
            let xOff = -130 //2622
            ctx.strokeStyle = "#bff"
            ctx.lineWidth = 1.5;
            ctx.beginPath()
            for (let i = 0; i < binary.length; i++) {
                if (binary[i] === "0") {
                    ctx.moveTo(xOff, yOff)
                    ctx.lineTo(xOff, yOff + height)
                    ctx.lineTo(xOff + width, yOff + height)
                    ctx.lineTo(xOff + width, yOff)
                    ctx.lineTo(xOff, yOff)
                    xOff += 10 + width
                } else {
                    ctx.moveTo(xOff, yOff)
                    ctx.lineTo(xOff, yOff + height)
                    xOff += 10
                }
            }
            ctx.stroke();

            ctx.beginPath()
            ctx.strokeStyle = "#ccc"
            ctx.lineWidth = 5;
            ctx.stroke(wires);

            //squares that look like they keep the wires in place
            ctx.beginPath()
            ctx.rect(1600, -500, 90, 100)
            ctx.rect(-55, -285, 12, 100)
            ctx.rect(1100, -497, 8, 54)
            ctx.rect(2285, -200, 80, 10)
            ctx.rect(1110, -70, 100, 10)
            ctx.fillStyle = "#ccc"
            ctx.fill()

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(2600, -600, 400, 300)

            // level.enter.draw();
            level.exit.drawAndCheck();
        };

        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(2600, -600, 400, 300)
            //draw shade for ceiling tech
            ctx.fillStyle = "rgba(68, 68, 68,0.95)"
            ctx.fillRect(2030, -2800, 150, 1800);
            ctx.fillRect(2030, 0, 150, 1800);
            ctx.fillStyle = "rgba(68, 68, 68,0.98)"
            // ctx.fillRect(-2750, -300, 2600, 125);
            ctx.fillRect(-2925, -2800, 2775, 2650);
        };
        level.setPosToSpawn(460, -100); //normal spawn
        // level.enter.x = -1000000; //hide enter graphic for first level by moving to the far left
        level.exit.x = 2800;
        level.exit.y = -335;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1000 //1400 is normal
        level.defaultZoom = 1600
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = "#e1e1e1";

        // spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(-2750, -2800, 2600, 2515);
        spawn.mapRect(-3275, -185, 3125, 1985);
        requestAnimationFrame(() => { powerUps.directSpawn(-2315, -3050, "instructions", false); });
        spawn.mapRect(-3275, -2800, 400, 3250);
        spawn.mapRect(-2775, -575, 50, 25);
        spawn.mapRect(-2775, -950, 50, 25);
        spawn.mapRect(-2775, -1325, 50, 25);
        spawn.mapRect(-2775, -1700, 50, 25);
        spawn.mapRect(-2775, -2075, 50, 25);
        spawn.mapRect(-2775, -2450, 50, 25);

        spawn.mapRect(3000, -2800, 2600, 4600); //right wall
        // spawn.mapRect(-250, 0, 3600, 1800); //ground
        spawn.mapRect(-250, 0, 2300, 1800); //ground

        // Matter.Body.setVelocity(map[map.length - 1], { x: 10, y: -10 });
        spawn.mapRect(2150, 0, 1200, 1800); //ground
        spawn.mapRect(2025, -3, 25, 15); //lip on power up chamber
        spawn.mapRect(2150, -3, 25, 15); //lip on power up chamber

        // spawn.mapRect(-250, -2800, 3600, 1800); //roof
        spawn.mapRect(-250, -2800, 2300, 1800); //split roof        
        map[map.length - 1].friction = 0
        map[map.length - 1].frictionStatic = 0
        spawn.mapRect(2150, -2800, 1200, 1800); //split roof
        map[map.length - 1].friction = 0
        map[map.length - 1].frictionStatic = 0
        spawn.mapRect(2025, -1010, 25, 13); //lip on power up chamber
        spawn.mapRect(2150, -1010, 25, 13); //lip on power up chamber

        spawn.mapRect(2600, -300, 500, 500); //exit shelf
        spawn.mapRect(2600, -1200, 500, 600); //exit roof
        spawn.mapRect(-95, -1100, 80, 110); //wire source
        spawn.mapRect(410, -10, 90, 20); //small platform for player

        spawn.bodyRect(2425, -120, 70, 50);
        spawn.bodyRect(2400, -100, 100, 60);
        spawn.bodyRect(2500, -150, 100, 130); //exit step
    },
    final() {
        // color.map = "rgba(0,0,0,0.8)"
        const slime = level.hazard(simulation.isHorizontalFlipped ? 150 - 860 : -150, -360, 880, 259) //x, y, width, height, damage = 0.002) {
        slime.height -= slime.maxHeight - 150 //start slime at zero
        slime.min.y += slime.maxHeight
        slime.max.y = slime.min.y + slime.height
        level.custom = () => {
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            slime.query();
            slime.levelRise(0.1)

            ctx.fillStyle = "rgba(0,255,255,0.1)"
            ctx.fillRect(5385, -550, 300, 250)
        };

        level.setPosToSpawn(0, -250); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        spawn.mapRect(5500, -330 + 20, 100, 20); //spawn this because the real exit is in the wrong spot
        level.exit.x = 0;
        level.exit.y = -8000;

        level.defaultZoom = 2500
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#ddd";

        for (let i = 0; i < 16; i++) powerUps.spawn(4600 + 40 * i, -30, "ammo");
        if (simulation.difficultyMode > 5) for (let i = 0; i < 8; i++) powerUps.spawn(4600 + 40 * i, -30, "ammo"); //extra ammo on why difficulty

        spawn.mapRect(-1950, 0, 8200, 1800); //ground
        spawn.mapRect(-1950, -1500, 1800, 1900); //left wall
        spawn.mapRect(-1950, -3300, 8200, 1800); //roof
        spawn.mapRect(-250, -200, 1000, 300); // shelf
        spawn.mapRect(-250, -1700, 1000, 1250); // shelf roof
        spawn.mapRect(705, -210, 25, 50);
        spawn.mapRect(725, -220, 25, 50);
        spawn.bodyRect(750, -125, 125, 125);
        spawn.bodyRect(875, -50, 50, 50);

        spawn.mapRect(5400, -1700, 400, 1150); //right wall
        spawn.mapRect(5400, -300, 400, 400); //right wall
        spawn.mapRect(5700, -3300, 1800, 5100); //right wall
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 100); //exit bump
        spawn.mapRect(5403, -650, 400, 450); //blocking exit
        if (mobs.mobDeaths < level.levelsCleared && !simulation.isCheating) { //pacifist run
            for (let i = 0; i < 250; i++) spawn.starter(1000 + 4000 * Math.random(), -1500 * Math.random())
        } else {
            spawn.finalBoss(3000, -750)
        }

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit

            level.setPosToSpawn(0, -250);
            level.custom = () => {
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                slime.query();
                slime.levelRise(0.1)
                ctx.fillStyle = "rgba(0,255,255,0.1)"
                ctx.fillRect(-5385 - 300, -550, 300, 250)
            };
        }
        if (mobs.mobDeaths < level.levelsCleared && localSettings.loreCount > 5 && !simulation.isCheating) {
            //open door for pacifist run on final lore chapter
            if (simulation.isHorizontalFlipped) {
                level.exit.x = -5500 - 100;
            } else {
                level.exit.x = 5500;
            }
            level.exit.y = -330;
            Matter.Composite.remove(engine.world, map[map.length - 1]);
            map.splice(map.length - 1, 1);
            simulation.draw.setPaths(); //redraw map draw path
            level.levels.push("unknown")
        }
    },
    gauntlet() {
        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,255,255,0.1)"
            ctx.fillRect(6400, -550, 300, 350)
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(-175, -975, 900, 575)
        };
        level.setPosToSpawn(0, -475); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 6500;
        level.exit.y = -230;
        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#ddd";

        // spawn.mapRect(-300, -1050, 300, 200);
        // Matter.Body.setAngle(map[map.length - 1], -Math.PI / 4)


        spawn.mapRect(-950, 0, 8200, 800); //ground
        spawn.mapRect(-950, -1200, 800, 1400); //left wall
        spawn.mapRect(-950, -1800, 8200, 800); //roof
        spawn.mapRect(175, -700, 575, 950);
        spawn.mapRect(-250, -425, 600, 650);
        spawn.mapRect(-250, -1200, 1000, 250); // shelf roof
        powerUps.spawnStartingPowerUps(600, -800);
        spawn.blockDoor(710, -710);
        spawn.mapRect(2500, -1200, 200, 750); //right wall
        spawn.blockDoor(2585, -210)
        spawn.mapRect(2500, -200, 200, 300); //right wall

        spawn.mapRect(4500, -1200, 200, 750); //right wall
        spawn.blockDoor(4585, -210)
        spawn.mapRect(4500, -200, 200, 300); //right wall

        spawn.mapRect(6400, -1200, 400, 750); //right wall
        spawn.mapRect(6400, -200, 400, 300); //right wall
        spawn.mapRect(6700, -1800, 800, 2600); //right wall
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 100); //exit bump


        if (mobs.mobDeaths < level.levelsCleared && !simulation.isCheating) { //pacifist run
            spawn.pickList.splice(0, 1);
            spawn.pickList.push('starter');
            spawn.pickList.splice(0, 1);
            spawn.pickList.push('starter');
            spawn.starter(1500, -200, 150 + Math.random() * 30);
            spawn.nodeGroup(3500, -200, 'starter');
            spawn.lineGroup(5000, -200, 'starter');
            for (let i = 0; i < 3; ++i) {
                if (simulation.difficulty * Math.random() > 15 * i) spawn.nodeGroup(2000 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), 'starter');
                if (simulation.difficulty * Math.random() > 10 * i) spawn.lineGroup(3500 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), 'starter');
                if (simulation.difficulty * Math.random() > 7 * i) spawn.nodeGroup(5000 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), 'starter');
            }
        } else {
            spawn[spawn.pickList[0]](1500, -200, 150 + Math.random() * 30);
            for (let i = 0; i < 3; ++i) {
                if (simulation.difficulty * Math.random() > 15 * i) spawn.randomGroup(2000 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), Infinity);
                if (simulation.difficulty * Math.random() > 10 * i) spawn.randomGroup(3500 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), Infinity);
                if (simulation.difficulty * Math.random() > 7 * i) spawn.randomGroup(5000 + 500 * (Math.random() - 0.5), -800 + 200 * (Math.random() - 0.5), Infinity);
            }
        }

        spawn.randomLevelBoss(5750, -600);
        spawn.secondaryBossChance(4125, -350)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            level.setPosToSpawn(0, -475);
            level.custom = () => {
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                ctx.fillStyle = "rgba(0,255,255,0.1)"
                ctx.fillRect(-6400 - 300, -550, 300, 350)
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(175 - 900, -975, 900, 575)
            };
        }
    },
    subway() {
        // simulation.enableConstructMode() //tech.giveTech('motion sickness')  //used to build maps in testing mode
        // m.maxHealth = m.health = 100
        // color.map = "#333" //custom map color
        document.body.style.backgroundColor = "#e3e3e3"//"#e3e3e3"//color.map//"#333"//"#000"
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom)
        level.setPosToSpawn(450 * (Math.random() < 0.5 ? 1 : -1), -300); //normal spawn
        // spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //entrance bump disabled for performance
        level.exit.x = 0;
        level.exit.y = -9000;
        // spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 100); //exit bump disabled for performance
        const stationWidth = 9000
        let stationNumber = 0;
        let stationCustom = () => { }
        let stationCustomTopLayer = () => { }
        const train = []
        train.push(level.transport(1475, -200, 500, 25, 30))
        train[train.length - 1].isMoving = false
        train[train.length - 1].stops = { left: 1725, right: 7225 }
        train.push(level.transport(-1475 - 500, -200, 500, 25, -30))
        train[train.length - 1].isMoving = false
        train[train.length - 1].stops = { left: -7225, right: -1725 }

        const stationList = [] //use to randomize station order
        for (let i = 1, totalNumberOfStations = 10; i < totalNumberOfStations; ++i) stationList.push(i) //!!!! update station number when you add a new station
        stationList.sort(() => Math.random() - 0.5);
        stationList.splice(0, simulation.difficultyMode > 4 ? 4 : 5); //remove some stations to keep it to 4 stations
        stationList.unshift(0) //add index zero to the front of the array

        let isExitOpen = false
        let isTechSpawned = false
        let gatesOpenRight = -1
        let gatesOpenLeft = -1
        const infrastructure = (x, isInProgress = true) => {
            if (isInProgress) {

                //randomize the mobs for each station
                spawn.pickList.splice(0, 2);
                let array = simulation.difficultyMode > 3 ? spawn.tier[4] : spawn.tier[3]
                spawn.pickList.push(array[Math.floor(Math.random() * array.length)]);
                array = spawn.tier[4]
                spawn.pickList.push(array[Math.floor(Math.random() * array.length)]);

                function removeAll(array) {
                    for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
                }
                removeAll(map);
                map = [];
                removeAll(composite);
                composite = []
                //remove any powerUp that is too far from player
                for (let i = 0; i < powerUp.length; ++i) {
                    if (Vector.magnitudeSquared(Vector.sub(player.position, powerUp[i].position)) > 9000000) { //remove any powerUp farther then 3000 pixels from player
                        Matter.Composite.remove(engine.world, powerUp[i]);
                        powerUp.splice(i--, 1)
                    }
                }
                //remove any mob that is too far from player
                for (let i = 0; i < mob.length; ++i) {
                    if (Vector.magnitudeSquared(Vector.sub(player.position, mob[i].position)) > 4000000 && !mob[i].isDarkMatter) { //remove any mob farther then 2000 pixels from player
                        mob[i].removeConsBB()
                        mob[i].removeCons()
                        mob[i].leaveBody = false
                        mob[i].alive = false
                        Matter.Composite.remove(engine.world, mob[i]);
                        mob.splice(i--, 1)
                    }
                }
            }
            const checkGate = (gate, gateButton) => {
                if (gate) { //check status of buttons and gates
                    gate.isClosing = gateButton.isUp
                    gate.openClose(true);
                    if (gateButton.isUp) {
                        gateButton.query();
                        if (!gateButton.isUp) {
                            simulation.inGameConsole(`station gate opened`, 360);
                            if (stationNumber > 0) {
                                if (!isExitOpen && gatesOpenRight < stationNumber) level.newLevelOrPhase() //run some new level tech effects
                                gatesOpenRight = stationNumber
                            } else if (stationNumber < 0) {
                                if (!isExitOpen && gatesOpenLeft > stationNumber) level.newLevelOrPhase() //run some new level tech effects
                                gatesOpenLeft = stationNumber
                            } else { //starting station both doors open
                                gatesOpenLeft = stationNumber
                                gatesOpenRight = stationNumber
                            }
                            if (Math.abs(stationNumber) > 0 && ((Math.abs(stationNumber) + 1) % stationList.length) === 0) {
                                simulation.inGameConsole(`level exit opened`, 360);
                                isExitOpen = true;
                            }
                        }
                    }
                    // gateButton.draw();
                    if (gateButton.isUp) {
                        //aura around button
                        ctx.beginPath();
                        ctx.ellipse(gateButton.min.x + gateButton.width * 0.5, gateButton.min.y + 6, 0.75 * gateButton.width, 0.5 * gateButton.width, 0, Math.PI, 0); //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)
                        ctx.fillStyle = `hsla(345, 100%, 80%,${0.1 + 0.4 * Math.random()})`
                        ctx.fill();
                        ctx.fillStyle = "hsl(345, 100%, 75%)"
                        ctx.fillRect(gateButton.min.x, gateButton.min.y - 10, gateButton.width, 25)
                        ctx.strokeStyle = "#000"//"rgba(255,255,255,0.2)"
                        ctx.lineWidth = 2
                        ctx.strokeRect(gateButton.min.x, gateButton.min.y - 10, gateButton.width, 25)
                    } else {
                        ctx.fillStyle = "hsl(345, 100%, 75%)"
                        ctx.fillRect(gateButton.min.x, gateButton.min.y, gateButton.width, 10)
                        ctx.strokeStyle = "#000"//"rgba(255,255,255,0.2)"
                        ctx.lineWidth = 2
                        ctx.strokeRect(gateButton.min.x, gateButton.min.y, gateButton.width, 10)
                    }
                }
            }
            const stations = [ //update totalNumberOfStations as you add more stations 
                () => { //empty starting station                    
                    if (isExitOpen) {
                        level.exit.x = x - 50;
                        level.exit.y = -260;
                        if (simulation.difficultyMode < 7 && !isTechSpawned) {
                            isTechSpawned = true
                            powerUps.spawn(level.exit.x, level.exit.y - 100, "tech");
                        }
                    } else {
                        var gateButton = level.button(x - 62, -237, 125, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber === 0 && gatesOpenRight === -1 && gatesOpenLeft === -1) {
                            var gateR = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                            var gateL = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                            for (let i = 0; i < 10; ++i) powerUps.chooseRandomPowerUp(x + 800 * (Math.random() - 0.5), -300 - 100 * Math.random())//only spawn heal or ammo once at the first station
                        }
                    }

                    spawn.mapRect(x + -1400, -750, 3375, 100); //roof
                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    // spawn.mapRect(x + -550, -220, 1125, 100); //floor
                    // spawn.mapRect(x + -475, -230, 975, 150);//floor
                    spawn.mapVertex(x + 0, -200, "400 0  -400 0  -300 -80  300 -80"); //hexagon but wide

                    // spawn.mapRect(x + -1350, -550, 50, 150);
                    // spawn.mapRect(x + 1300, -550, 50, 150);
                    stationCustom = () => { };
                    stationCustomTopLayer = () => {
                        checkGate(gateR, gateButton)
                        checkGate(gateL, gateButton)
                    };
                },
                () => { //portal maze
                    const buttonsCoords = [{ x: x + 50, y: -1595 }, { x: x + 637, y: -2195 }, { x: x - 1487, y: -2145 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }
                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -1775, -1600, 3400, 1000); //center pillar
                    spawn.mapRect(x + -4100, -3325, 8000, 700); //roof
                    spawn.mapRect(x + -4100, -3325, 325, 1500);
                    spawn.mapRect(x + 3500, -3325, 400, 1500);
                    spawn.mapRect(x + -225, -700, 450, 600); //lower portal blocks

                    //upper parts
                    spawn.mapRect(x + -1425, -2400, 1900, 50);
                    spawn.mapRect(x + -775, -2750, 575, 1045);
                    spawn.mapRect(x + 475, -1900, 450, 375);
                    spawn.mapRect(x + 2225, -2300, 125, 350);
                    spawn.mapRect(x + 2550, -2350, 700, 50);
                    spawn.mapRect(x + 1375, -2850, 125, 650);
                    spawn.mapRect(x + 600, -2200, 200, 195);
                    spawn.mapRect(x + -3500, -2275, 825, 75);
                    spawn.mapRect(x + -1550, -2150, 250, 250);
                    spawn.mapRect(x + -2575, -2450, 275, 345);

                    if (!isExitOpen) {
                        if (Math.random() < 0.5) {
                            spawn.randomMob(x + 2850, -2425, 0);
                            spawn.randomMob(x + 2275, -2425, 0);
                            spawn.randomMob(x + 2000, -2150, 0);
                            spawn.randomMob(x + 1650, -2150, 0);
                            spawn.randomMob(x + 1000, -2475, 0);
                            spawn.randomMob(x + 725, -2450, 0);
                            spawn.randomMob(x + 525, -2175, 0);
                            spawn.randomMob(x + 200, -1950, 0);
                            spawn.randomMob(x + -25, -1825, 0);
                            spawn.randomMob(x + -975, -2000, 0);
                            spawn.randomMob(x + -1500, -2225, 0);
                            spawn.randomMob(x + 1850, -2125, 0);
                            spawn.randomMob(x + 225, -1975, 0);
                            spawn.randomMob(x + 25, -1950, 0);
                            spawn.randomMob(x + 25, -1950, 0);
                        } else {
                            spawn.randomMob(x + 250, -1850, 0);
                            spawn.randomMob(x + 225, -1950, 0);
                            spawn.randomMob(x + 125, -2000, 0);
                            spawn.randomMob(x + 0, -1800, 0);
                            spawn.randomMob(x + -1725, -2300, 0);
                            spawn.randomMob(x + -2025, -2175, 0);
                            spawn.randomMob(x + -2050, -2250, 0);
                            spawn.randomMob(x + -2000, -2350, 0);
                            spawn.randomMob(x + -2950, -2400, 0);
                            spawn.randomMob(x + -2775, -2400, 0);
                            spawn.randomMob(x + -2425, -2550, 0);
                            spawn.randomMob(x + 1950, -2225, 0);
                            spawn.randomMob(x + -2700, -2100, 0);
                            spawn.randomMob(x + -1925, -2175, 0);
                            spawn.randomMob(x + -825, -2050, 0);
                        }
                        //spawn.randomHigherTierMob(x + 1732, -2267)
                    }

                    const portal1 = level.portal({ x: x - 250, y: -310 }, Math.PI,
                        { x: x + -3750, y: -2100 }, 0)
                    const portal2 = level.portal({ x: x + 250, y: -310 }, 0,
                        { x: x + 3475, y: -2100 }, Math.PI)
                    const portal3 = level.portal({ x: x - 800, y: -2500 }, Math.PI,
                        { x: x - 175, y: -2500 }, 0)
                    const portal4 = level.portal({ x: x + 1275, y: -1700 }, Math.PI,
                        { x: x - 1275, y: -1700 }, 0)
                    stationCustom = () => {
                        portal1[2].query()
                        portal1[3].query()
                        portal2[2].query()
                        portal2[3].query()
                        portal3[2].query()
                        portal3[3].query()
                        portal4[2].query()
                        portal4[3].query()
                    }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        portal1[0].draw();
                        portal1[1].draw();
                        portal1[2].draw();
                        portal1[3].draw();
                        portal2[0].draw();
                        portal2[1].draw();
                        portal2[2].draw();
                        portal2[3].draw();
                        portal3[0].draw();
                        portal3[1].draw();
                        portal3[2].draw();
                        portal3[3].draw();
                        portal4[0].draw();
                        portal4[1].draw();
                        portal4[2].draw();
                        portal4[3].draw();
                    }
                },
                () => { //opening and closing doors
                    const buttonsCoords = [{ x: x - 800, y: -2245 }, { x: x + 250, y: -870 }, { x: x + 1075, y: -1720 }, { x: x - 1600, y: -1995 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }

                    if (!isExitOpen) {
                        if (Math.random() < 0.5) {
                            spawn.randomMob(x + 1125, -650, 0);
                            spawn.randomMob(x + 150, -950, 0);
                            spawn.randomMob(x + 100, -975, 0);
                            spawn.randomMob(x + 75, -975, 0);
                            spawn.randomMob(x + 275, -1225, 0);
                            spawn.randomMob(x + 825, -975, 0);
                            spawn.randomMob(x + -50, -1625, 0);
                            spawn.randomMob(x + -950, -1550, 0);
                            spawn.randomMob(x + -975, -1550, 0);
                            spawn.randomMob(x + -900, -2500, 0);
                            spawn.randomMob(x + -975, -2550, 0);
                            spawn.randomMob(x + 675, -1950, 0);
                            spawn.randomMob(x + 675, -2550, 0);
                            spawn.randomMob(x + 1225, -1825, 0);
                            spawn.randomMob(x + -750, -2450, 0);
                            spawn.randomMob(x + -700, -825, 0);
                        } else {
                            spawn.randomMob(x + -675, -675, 0);
                            spawn.randomMob(x + -575, -925, 0);
                            spawn.randomMob(x + -425, -1100, 0);
                            spawn.randomMob(x + -225, -1225, 0);
                            spawn.randomMob(x + -650, -1250, 0);
                            spawn.randomMob(x + -675, -775, 0);
                            spawn.randomMob(x + 75, -1000, 0);
                            spawn.randomMob(x + -1100, -1575, 0);
                            spawn.randomMob(x + -1250, -1850, 0);
                            spawn.randomMob(x + -1625, -2100, 0);
                            spawn.randomMob(x + -700, -2500, 0);
                            spawn.randomMob(x + -375, -2550, 0);
                            spawn.randomMob(x + 250, -2025, 0);
                            spawn.randomMob(x + 675, -2175, 0);
                            spawn.randomMob(x + -1000, -2000, 0);
                            spawn.randomMob(x + -1550, -2325, 0);
                            spawn.randomMob(x + -1725, -2425, 0);
                        }
                        //spawn.randomHigherTierMob(x + 393, -1280)
                    }

                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -2550, -3200, 425, 1375);//roof left wall
                    spawn.mapRect(x + 2125, -3175, 450, 1375);//roof right wall
                    spawn.mapRect(x + -2550, -3200, 5125, 225);//roof

                    spawn.mapRect(x + -1325, -550, 1375, 50);//first floor roof/ground
                    spawn.mapRect(x + 775, -550, 675, 50);
                    spawn.mapRect(x + -200, -875, 1300, 50); //2nd floor roof/ground
                    spawn.mapRect(x + -125, -1125, 50, 275);
                    spawn.mapRect(x + -125, -1150, 800, 50); //3rd floor roof/ground
                    spawn.mapRect(x + -1450, -1475, 1600, 50);
                    spawn.mapRect(x + -1325, -1725, 800, 50); //4th floor roof/ground
                    spawn.mapRect(x + 50, -1725, 1350, 50);
                    spawn.mapRect(x + -1125, -2250, 700, 50);

                    spawn.mapRect(x, -525, 50, 150); //door cap for ground at ground y = -210
                    const door1 = level.doorMap(x + 12, -380, 25, 170, 140, 20, false) //x, y, width, height, distance, speed = 20
                    spawn.mapRect(x - 200, -525 - 340, 50, 150); //door cap for ground at ground y = -210
                    const door2 = level.doorMap(x - 188, -380 - 340, 25, 170, 140, 20, false) //x, y, width, height, distance, speed = 20
                    spawn.mapRect(x + 100, -525 - 940, 50, 150); //door cap for ground at ground y = -210
                    const door3 = level.doorMap(x + 112, -380 - 940, 25, 170, 140, 20, false) //x, y, width, height, distance, speed = 20
                    spawn.mapRect(x + 450, -3050, 50, 775);
                    const door4 = level.doorMap(x + 462, -2300, 25, 575, 520, 30, false) //x, y, width, height, distance, speed = 20

                    const portal1 = level.portal({
                        x: x + 2100,
                        y: -2100
                    }, Math.PI, { //right
                        x: x + -1275,
                        y: -650
                    }, 2 * Math.PI) //right

                    stationCustom = () => {
                        door1.isClosing = (simulation.cycle % 240) < 120
                        door1.openClose(true);
                        door2.isClosing = (simulation.cycle % 240) > 120
                        door2.openClose(true);
                        door3.isClosing = (simulation.cycle % 240) < 120
                        door3.openClose(true);
                        door4.isClosing = (simulation.cycle % 240) > 120
                        door4.openClose(true);
                        portal1[2].query()
                        portal1[3].query()
                    }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        portal1[0].draw();
                        portal1[1].draw();
                        portal1[2].draw();
                        portal1[3].draw();
                    }
                },
                () => { //slime
                    const buttonsCoords = [{ x: x - 675, y: -895 }, { x: x - 750, y: -70 }, { x: x + 75, y: -570 },]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }


                    spawn.mapRect(x + -1575, -2000, 3025, 100); //roof
                    // spawn.mapRect(x + -1575, -2200, 3025, 300); //roof
                    // spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -1500, -210, 500, 350); //station floor left
                    spawn.mapRect(x + 1000, -210, 500, 350); //station floor right
                    spawn.mapRect(x + 900, -1250, 125, 1250);
                    spawn.mapRect(x - 1025, -1550, 125, 1625);
                    spawn.mapRect(x - 50, -1900, 100, 1500);
                    spawn.mapRect(x + -975, -1250, 200, 25);
                    spawn.mapRect(x + -950, -625, 150, 25);
                    spawn.mapRect(x - 925, -400, 250, 175);
                    spawn.mapRect(x - 725, -900, 225, 300);
                    spawn.mapRect(x + 325, -225, 325, 75);
                    spawn.mapRect(x + 400, -950, 275, 25);
                    spawn.mapRect(x + 775, -575, 200, 25);
                    spawn.mapRect(x + 0, -1225, 125, 25);
                    spawn.mapRect(x + 0, -575, 225, 175);
                    spawn.mapRect(x - 925, -75, 875, 150);
                    spawn.mapRect(x + 475, -1400, 75, 1250);

                    if (!isExitOpen) {
                        if (Math.random() < 0.5) {
                            spawn.randomMob(x + -850, -450, 0);
                            spawn.randomMob(x + -850, -125, 0);
                            spawn.randomMob(x + -725, -100, 0);
                            spawn.randomMob(x + 0, -100, 0);
                            spawn.randomMob(x + 800, -50, 0);
                            spawn.randomMob(x + 50, -275, 0);
                            spawn.randomMob(x + -300, -425, 0);
                            spawn.randomMob(x + -750, -475, 0);
                            spawn.randomMob(x + -850, -775, 0);
                            spawn.randomMob(x + -650, -1000, 0);
                            spawn.randomMob(x + -150, -1325, 0);
                            spawn.randomMob(x + -825, -1350, 0);
                            spawn.randomMob(x + -375, -150, 0);
                        } else {
                            spawn.randomMob(x + 350, -350, 0);
                            spawn.randomMob(x + 175, -700, 0);
                            spawn.randomMob(x + 350, -1175, 0);
                            spawn.randomMob(x + 200, -1600, 0);
                            spawn.randomMob(x + 500, -1675, 0);
                            spawn.randomMob(x + 425, -50, 0);
                            spawn.randomMob(x + 725, -75, 0);
                            spawn.randomMob(x + 650, -700, 0);
                            spawn.randomMob(x + 775, -1150, 0);
                            spawn.randomMob(x + 500, -1675, 0);
                            spawn.randomMob(x + -150, -175, 0);
                            spawn.randomMob(x + -800, -150, 0);
                        }
                        //spawn.randomHigherTierMob(x + -452, -453)
                    }

                    const boost1 = level.boost(x - 1185, -225, 1400)
                    const boost2 = level.boost(x + 1100, -225, 1100)
                    const hazard1 = level.hazard(x - 900, -1225, 1800, 1225)
                    let isSlimeRiseUp = false
                    const drip = []
                    drip.push(level.drip(x - 900 + 1800 * Math.random(), -1900, 0, 100)) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
                    drip.push(level.drip(x - 900 + 1800 * Math.random(), -1900, 0, 150))
                    drip.push(level.drip(x - 900 + 1800 * Math.random(), -1900, 0, 70))
                    // drip.push(level.drip(x - 900 + 1800 * Math.random(), -1900, 0, 210))
                    // drip.push(level.drip(x - 900 + 1800 * Math.random(), -1900, 0, 67))
                    stationCustom = () => {
                        for (let i = 0; i < drip.length; i++) drip[i].draw()
                        // drip1.draw();
                        // drip2.draw();
                        // drip3.draw();
                    }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)

                        hazard1.query();
                        hazard1.level(isSlimeRiseUp, 1.5)
                        if (!(hazard1.height < hazard1.maxHeight)) {
                            isSlimeRiseUp = false
                        } else if (!(hazard1.height > 0)) {
                            isSlimeRiseUp = true
                        }
                        boost1.query();
                        boost2.query();
                    }
                },
                () => { //portal fling
                    const buttonsCoords = [{ x: x + 775, y: -1695 }, { x: x - 775, y: -800 }, { x: x - 375, y: -2080 },]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }
                    spawn.mapRect(x + -1600, -3450, 300, 1475); //roof
                    spawn.mapRect(x + -1600, -3450, 3225, 100);
                    spawn.mapRect(x + 1300, -3450, 325, 1525);

                    spawn.mapVertex(x + 400, -180, "-300 0   -300 -100   300 -100   400 0");
                    spawn.mapVertex(x - 400, -180, "300 0   300 -100   -300 -100   -400 0");
                    spawn.mapRect(x + -1500, -210, 1425, 350); //station floor left
                    spawn.mapRect(x + 75, -210, 1425, 350); //station floor right
                    spawn.mapRect(x + 75, -950, 50, 450);
                    spawn.mapRect(x + 125, -700, 1225, 200);
                    spawn.mapRect(x + -1325, -1775, 775, 175);
                    spawn.mapVertex(x + 445, -800, "-200 0   -200 -300   100 -300   185 0");
                    spawn.mapVertex(x - 310, -1880, "-185 0   -100 -400   400 -400   400 0");
                    spawn.mapVertex(x + -675, -725, "325 0  250 80  -250 80  -325 0  -250 -80  250 -80");
                    spawn.mapRect(x + 625, -1700, 750, 500);

                    if (!isExitOpen) {
                        spawn.randomMob(x + -750, -1925, 0);
                        spawn.randomMob(x + -425, -2300, 0);
                        spawn.randomMob(x + -350, -2200, 0);
                        spawn.randomMob(x + -275, -2175, 0);
                        spawn.randomMob(x + -375, -2175, 0);
                        spawn.randomMob(x + 1075, -1850, 0);
                        spawn.randomMob(x + 925, -1775, 0);
                        spawn.randomMob(x + 1150, -1800, 0);
                        spawn.randomMob(x + 1400, -2150, 0);
                        spawn.randomMob(x + 925, -850, 0);
                        spawn.randomMob(x + 800, -800, 0);
                        spawn.randomMob(x + 875, -825, 0);
                        spawn.randomMob(x + 1050, -900, 0);
                        spawn.randomMob(x + 19050, -2925, 0);
                        spawn.randomMob(x + 17150, -3150, 0);
                        spawn.randomMob(x + 17700, -3300, 0);
                        //spawn.randomHigherTierMob(x - 711, -895)
                    }
                    const portal1 = level.portal({
                        x: x + 0,
                        y: -200
                    }, -Math.PI / 2, { //up
                        x: x + 200,
                        y: -900
                    }, -Math.PI / 2) //up
                    const portal2 = level.portal({
                        x: x + 1275,
                        y: -800
                    }, Math.PI, { //right
                        x: x + -1275,
                        y: -1875
                    }, 2 * Math.PI) //right

                    stationCustom = () => {
                        portal1[2].query(true)
                        portal1[3].query(true)
                        portal2[2].query()
                        portal2[3].query()
                    }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        portal1[0].draw();
                        portal1[1].draw();
                        portal1[2].draw();
                        portal1[3].draw();
                        portal2[0].draw();
                        portal2[1].draw();
                        portal2[2].draw();
                        portal2[3].draw();
                    }
                },
                () => { //tower levels and squares
                    const buttonsCoords = [{ x: x - 300, y: -3120 }, { x: x + 600, y: -3020 }, { x: x - 575, y: -1770 }, { x: x - 450, y: -2370 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }

                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -1625, -3950, 3225, 350);//roof
                    spawn.mapRect(x + 1300, -3850, 300, 2150); //roof wall
                    spawn.mapRect(x + -1625, -3950, 325, 2250); //roof wall
                    spawn.mapRect(x + -1050, -575, 1000, 75);
                    spawn.mapRect(x + 175, -575, 975, 75);
                    spawn.mapRect(x + -1050, -825, 150, 275);
                    spawn.mapRect(x + -900, -1200, 2275, 75);
                    spawn.mapRect(x + 125, -1425, 1250, 300);
                    spawn.mapRect(x + -925, -1775, 2100, 75);
                    spawn.mapRect(x + -100, -2050, 950, 350);
                    spawn.mapRect(x + -925, -2100, 100, 400);
                    spawn.mapRect(x + -700, -2375, 1225, 75);
                    spawn.mapRect(x + 650, -2375, 575, 75);
                    spawn.mapRect(x + -25, -2750, 350, 269);
                    spawn.mapRect(x + -950, -3125, 975, 75);
                    spawn.mapRect(x + 325, -3025, 900, 75);
                    spawn.bodyRect(x + -125, -1325, 225, 125, 0.3);
                    spawn.bodyRect(x + -225, -2100, 300, 50, 0.3);
                    spawn.bodyRect(x + -225, -2575, 100, 200, 0.3);
                    spawn.bodyRect(x + 850, -2575, 150, 200, 0.3);
                    spawn.bodyRect(x + 850, -1875, 75, 100, 0.3);
                    spawn.bodyRect(x + 500, -725, 175, 150, 0.3);
                    spawn.bodyRect(x + -925, -2250, 100, 150, 0.3);
                    spawn.bodyRect(x + -1050, -950, 150, 125, 0.3);

                    const mobPlacement = [
                        () => { //1st floor
                            spawn.randomMob(x + -775, -725, 0);
                            spawn.randomMob(x + -575, -700, 0);
                            spawn.randomMob(x + -275, -700, 0);
                            spawn.randomMob(x + -125, -650, 0);
                            spawn.randomMob(x + 250, -675, 0);
                            spawn.randomMob(x + 425, -650, 0);
                            spawn.randomMob(x + 775, -650, 0);
                            spawn.randomMob(x + 1050, -675, 0);
                            spawn.randomMob(x + 675, -950, 0);
                            spawn.randomMob(x + -625, -900, 0);
                            spawn.randomMob(x + -750, -1400, 0);
                            spawn.randomMob(x + -500, -2025, 0);
                            spawn.randomMob(x + -125, -3225, 0);
                        },
                        () => { //2nd floor
                            spawn.randomMob(x + -950, -925, 0);
                            spawn.randomMob(x + -775, -1325, 0);
                            spawn.randomMob(x + -450, -1500, 0);
                            spawn.randomMob(x + -325, -1250, 0);
                            spawn.randomMob(x + 0, -1500, 0);
                            spawn.randomMob(x + 375, -1525, 0);
                            spawn.randomMob(x + 750, -1550, 0);
                            spawn.randomMob(x + 1175, -1550, 0);
                            spawn.randomMob(x + -875, -1350, 0);
                            spawn.randomMob(x + -875, -2375, 0);
                            spawn.randomMob(x + 175, -2850, 0);
                            spawn.randomMob(x + 750, -2475, 0);
                        },
                        () => {//3rd floor
                            spawn.randomMob(x + 1075, -2000, 0);
                            spawn.randomMob(x + 725, -2125, 0);
                            spawn.randomMob(x + 350, -2125, 0);
                            spawn.randomMob(x + -325, -2000, 0);
                            spawn.randomMob(x + -675, -1875, 0);
                            spawn.randomMob(x + -725, -2200, 0);
                            spawn.randomMob(x + -675, -2575, 0);
                            spawn.randomMob(x + -425, -2675, 0);
                            spawn.randomMob(x + -50, -2875, 0);
                            spawn.randomMob(x + 425, -2725, 0);
                            spawn.randomMob(x + 1150, -2550, 0);
                            spawn.randomMob(x + 1150, -2175, 0);
                            spawn.randomMob(x + 1000, -1900, 0);
                            spawn.randomMob(x + 500, -2550, 0);
                            spawn.randomMob(x + 125, -2900, 0);
                        },
                        () => {//all floors
                            spawn.randomMob(x + 1000, -850, 0);
                            spawn.randomMob(x + 300, -850, 0);
                            spawn.randomMob(x + -450, -825, 0);
                            spawn.randomMob(x + -1025, -1125, 0);
                            spawn.randomMob(x + -750, -1375, 0);
                            spawn.randomMob(x + -225, -1375, 0);
                            spawn.randomMob(x + 625, -1525, 0);
                            spawn.randomMob(x + 1025, -1925, 0);
                            spawn.randomMob(x + -425, -2100, 0);
                            spawn.randomMob(x + -400, -2650, 0);
                            spawn.randomMob(x + 150, -3000, 0);
                            spawn.randomMob(x + 675, -3200, 0);
                            spawn.randomMob(x + -550, -3300, 0);

                        },
                    ]
                    if (!isExitOpen) {
                        mobPlacement[Math.floor(Math.random() * mobPlacement.length)]()//different random mob placements, with mobs clustered to surprise player
                        //spawn.randomHigherTierMob(x + 51, -419)
                    }
                    stationCustom = () => { }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                    }
                },
                () => { //jump pads and 6 sided platforms
                    const buttonsCoords = [{ x: x + 278, y: -1814 }, { x: x + 778, y: -1814 }, { x: x + 2025, y: -1995 }, { x: x - 2025, y: -2425 }, { x: x - 2100, y: -1995 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }

                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -3200, -3200, 300, 1400); //roof left wall
                    spawn.mapRect(x + 2600, -3200, 300, 1400);//roof right wall
                    spawn.mapRect(x + -3175, -3200, 6175, 225);//roof
                    if (Math.random() < 0.3) spawn.mapRect(x + -1350, -550, 150, 50); //wall ledge
                    if (Math.random() < 0.3) spawn.mapRect(x + 1175, -550, 200, 50); //wall ledge
                    spawn.mapVertex(x + 600, -900, "490 0  350 80  -350 80  -490 0  -350 -80  350 -80"); //hexagon but wide
                    spawn.mapVertex(x - 600, -750, "490 0  350 80  -350 80  -490 0  -350 -80  350 -80"); //hexagon but wide
                    spawn.mapVertex(x - 100, -1850, "-100 -300  0 -350  100 -300  100 300  0 350  -100 300"); //hexagon but tall
                    spawn.mapVertex(x + -600, -2000, "-150 -450 150 -450  150 450  0 525  -150 450"); //hexagon but big and tall and flat
                    spawn.mapVertex(x + 350, -1575, "-150 0  150 0  150 450  0 525  -150 450"); //hexagon but tall and flat top
                    spawn.mapVertex(x + 850, -1575, "-150 0  150 0  150 450  0 525  -150 450"); //hexagon but tall and flat top
                    spawn.mapVertex(x + -2050, -2350, "490 0  350 80  -350 80  -490 0  -350 -80  350 -80"); //left top corner hexagon but wide
                    spawn.mapVertex(x + 1700, -2450, "-100 -300  0 -350  100 -300  100 300  0 350  -100 300"); //hexagon but tall

                    const mobPlacement = [
                        () => { //rightish
                            spawn.randomMob(x + 2250, -2375, 0);
                            spawn.randomMob(x + 1950, -2825, 0);
                            spawn.randomMob(x + 1275, -2775, 0);
                            spawn.randomMob(x + 1450, -2200, 0);
                            spawn.randomMob(x + 825, -1950, 0);
                            spawn.randomMob(x + 400, -1875, 0);
                            spawn.randomMob(x + -75, -2275, 0);
                            spawn.randomMob(x + -650, -2550, 0);
                            spawn.randomMob(x + 1500, -2075, 0);
                            spawn.randomMob(x + 2125, -2650, 0);
                            spawn.randomMob(x + 2075, -2250, 0);
                            spawn.randomMob(x + 1000, -2850, 0);
                            spawn.randomMob(x + 750, -950, 0);
                            spawn.randomMob(x + -750, -1125, 0);
                            spawn.randomMob(x + -1575, -2050, 0);
                        },
                        () => { //leftish
                            spawn.randomMob(x + -2225, -2125, 0);
                            spawn.randomMob(x + -2675, -2125, 0);
                            spawn.randomMob(x + -2600, -2600, 0);
                            spawn.randomMob(x + -2100, -2725, 0);
                            spawn.randomMob(x + -1425, -2600, 0);
                            spawn.randomMob(x + -1375, -2050, 0);
                            spawn.randomMob(x + -575, -2575, 0);
                            spawn.randomMob(x + -125, -2300, 0);
                            spawn.randomMob(x + 350, -1925, 0);
                            spawn.randomMob(x + -350, -1050, 0);
                            spawn.randomMob(x + -1000, -1000, 0);
                            spawn.randomMob(x + -700, -1300, 0);
                            spawn.randomMob(x + 350, -1150, 0);
                            spawn.randomMob(x + -575, -2525, 0);
                            spawn.randomMob(x + -1075, -2525, 0);
                        },
                        () => {//centerish
                            spawn.randomMob(x + 25, -2275, 0);
                            spawn.randomMob(x + 300, -1975, 0);
                            spawn.randomMob(x + 700, -1950, 0);
                            spawn.randomMob(x + 325, -1200, 0);
                            spawn.randomMob(x + -225, -950, 0);
                            spawn.randomMob(x + -925, -975, 0);
                            spawn.randomMob(x + -675, -2575, 0);
                            spawn.randomMob(x + -1425, -2175, 0);
                            spawn.randomMob(x + 1575, -2075, 0);
                            spawn.randomMob(x + 2300, -2075, 0);
                            spawn.randomMob(x + 425, -1925, 0);
                            spawn.randomMob(x + 125, -2175, 0);
                            spawn.randomMob(x + -325, -2150, 0);
                            spawn.randomMob(x + -350, -950, 0);
                            spawn.randomMob(x + 600, -325, 0);
                            spawn.randomMob(x + -600, -375, 0);
                        },
                    ]
                    if (!isExitOpen) {
                        mobPlacement[Math.floor(Math.random() * mobPlacement.length)]()//different random mob placements, with mobs clustered to surprise player
                        //spawn.randomHigherTierMob(x + 378, -1905)
                    }
                    const boost1 = level.boost(x - 50, -225, 790)
                    const boost2 = level.boost(x + 550, -985, 900)
                    const boost3 = level.boost(x + -850, -835, 1900)
                    stationCustom = () => { }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        boost1.query();
                        boost2.query();
                        boost3.query();
                    }
                },
                () => { //crouch tunnels
                    const buttonsCoords = [{ x: x + 625, y: -1395 }, { x: x - 15, y: -1595 }, { x: x - 800, y: -1295 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array 
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }
                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    spawn.mapRect(x + -1575, -2200, 3025, 300); //roof
                    spawn.mapRect(x + -1100, -925, 100, 425);
                    spawn.mapRect(x + -1100, -575, 375, 75);
                    spawn.mapRect(x + -925, -1300, 375, 125);
                    spawn.mapRect(x + -300, -1300, 620, 125);
                    spawn.mapRect(x + 450, -1400, 500, 225);
                    spawn.mapRect(x + 900, -550, 500, 50);
                    spawn.mapRect(x + 950, -925, 400, 270);
                    spawn.mapRect(x + 1250, -1250, 150, 75);
                    spawn.mapRect(x + -225, -525, 800, 210);
                    spawn.mapRect(x + -100, -1600, 300, 193);
                    spawn.mapRect(x + 925, -1250, 75, 75);
                    spawn.bodyRect(x + 200, -1475, 75, 175, 0.3);
                    spawn.bodyRect(x + -25, -625, 225, 100, 0.3);
                    spawn.bodyRect(x + -1000, -750, 125, 175, 0.3);
                    spawn.bodyRect(x + -625, -1450, 75, 150, 0.3);
                    spawn.bodyRect(x + -650, -300, 300, 75, 0.3);
                    if (!isExitOpen) {
                        spawn.randomMob(x + -750, -1425, 0);
                        spawn.randomMob(x + -1050, -1100, 0);
                        spawn.randomMob(x + -825, -750, 0);
                        spawn.randomMob(x + -500, -400, 0);
                        spawn.randomMob(x + 450, -650, 0);
                        spawn.randomMob(x + 0, -725, 0);
                        spawn.randomMob(x + 300, -1350, 0);
                        spawn.randomMob(x + 550, -1500, 0);
                        spawn.randomMob(x + 725, -1650, 0);
                        spawn.randomMob(x + 900, -1550, 0);
                        spawn.randomMob(x + 1100, -1300, 0);
                        spawn.randomMob(x + -1050, -1050, 0);
                        spawn.randomMob(x + -925, -350, 0);
                        spawn.randomMob(x + 75, -1750, 0);
                        spawn.randomMob(x + 1000, -375, 0);
                        //spawn.randomHigherTierMob(x + 89, -632)
                    }
                    stationCustom = () => { }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        ctx.fillStyle = "rgba(0,0,0,0.08)"
                        ctx.fillRect(x + -225, -325, 800, 125);
                        ctx.fillRect(x + -100, -1425, 300, 125);
                        ctx.fillRect(x + 950, -675, 400, 125);
                    }
                },
                () => { //angled jumps
                    const buttonsCoords = [{ x: x + 50, y: -1395 }, { x: x - 625, y: -2945 }, { x: x + 900, y: -2945 }]
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array

                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    boosts = []
                    boosts.push(level.boost(x - 311, -218, 1200, 1.85))
                    spawn.mapRect(x + -225, -525, 675, 375);
                    spawn.mapRect(x + -1350, -1175, 400, 675);
                    spawn.mapRect(x + -225, -2125, 675, 400);

                    // spawn.mapRect(x + -225, -1325, 675, 550);
                    spawn.mapRect(x + -225, -1400, 675, 650);

                    boosts.push(level.boost(x - 1335, -1200, 1800, 1))
                    boosts.push(level.boost(x + 1272, -1300, 1550, 2.75)) //far right
                    //high up walls
                    boosts.push(level.boost(x + 1455, -2048, 1450, 2.5))
                    spawn.mapRect(x + 1500, -3825, 325, 1900);
                    boosts.push(level.boost(x - 1555, -2048, 1450, 0.64))
                    // spawn.mapRect(x + -1625, -3975, 3450, 325);
                    spawn.mapRect(x + -1825, -4000, 325, 2150);
                    spawn.mapRect(x + -1825, -4070, 3650, 375);//roof

                    spawn.randomMob(x + 100, -2125, 0);
                    boosts.push(level.boost(x + 75, -2175, 2800))
                    spawn.mapRect(x + -100, -3900, 400, 400);
                    Matter.Body.setAngle(map[map.length - 1], map[map.length - 1].angle - Math.PI / 4);

                    spawn.mapRect(x + 225, -2950, 1100, 150);
                    spawn.mapRect(x + -1325, -2950, 1325, 150);

                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }

                    if (!isExitOpen) {
                        spawn.randomMob(x + 350, -600, 0);
                        spawn.randomMob(x + -25, -600, 0);
                        spawn.randomMob(x + 600, -300, 0);
                        spawn.randomMob(x + 1050, -300, 0);
                        spawn.randomMob(x + 350, -1525, 0);
                        spawn.randomMob(x + -75, -1525, 0);
                        spawn.randomMob(x + -1075, -1275, 0);
                        spawn.randomMob(x + -1350, -2050, 0);
                        spawn.randomMob(x + -50, -2250, 0);
                        spawn.randomMob(x + -200, -3050, 0);
                        spawn.randomMob(x + -925, -3150, 0);
                        spawn.randomMob(x + 450, -3125, 0);
                        spawn.randomMob(x + 1075, -3025, 0);
                        spawn.randomMob(x + 750, -3125, 0);
                        spawn.randomMob(x + -725, -3125, 0);
                        //spawn.randomHigherTierMob(x + 64, -1514)
                    }
                    stationCustom = () => {
                        for (let i = 0; i < boosts.length; i++) {
                            boosts[i].query()
                        }
                    }
                    stationCustomTopLayer = () => {
                        checkGate(gate, gateButton)
                        ctx.fillStyle = "rgba(0,0,0,0.08)"
                        ctx.fillRect(x - 225, -775, 675, 275);
                        ctx.fillRect(x - 225, -1750, 675, 375);
                    }
                },
                () => { //people movers
                    simulation.removeEphemera("zoom")//stop previous zooms
                    simulation.zoomTransition(2000)
                    const buttonsCoords = [{ x: x - 65, y: -2045 }] //only one button location?
                    const buttonsCoordsIndex = Math.floor(Math.random() * buttonsCoords.length) //pick a random element from the array
                    const moverDirection = stationNumber > 0 ? 1 : -1
                    // console.log(stationNumber)
                    if (isExitOpen) {
                        level.exit.x = buttonsCoords[buttonsCoordsIndex].x;
                        level.exit.y = buttonsCoords[buttonsCoordsIndex].y - 25;
                    } else {
                        var gateButton = level.button(buttonsCoords[buttonsCoordsIndex].x, buttonsCoords[buttonsCoordsIndex].y, 126, false) //x, y, width = 126, isSpawnBase = true
                        gateButton.isUp = true
                        if (stationNumber > gatesOpenRight) {
                            var gate = level.doorMap(x + 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20                        
                        } else if (stationNumber < gatesOpenLeft) {
                            var gate = level.doorMap(x - 1375, -525, 50, 375, 300, 20, false) //x, y, width, height, distance, speed = 20
                        }
                    }

                    //floor 0
                    spawn.mapRect(x + -1500, -210, 3000, 400);//station floor
                    const movers = []
                    movers.push(level.mover(x + -1200, -220, 900, 50, 3 * moverDirection))
                    movers.push(level.mover(x + 300, -220, 900, 50, 3 * moverDirection))
                    spawn.mapRect(x + -4700, -7000, 700, 5200);//Left wall
                    spawn.mapRect(x + 4000, -7000, 500, 5200);//Right wall
                    const portals = []
                    portals.push(level.portal({ x: x - 315, y: -310 }, Math.PI, { x: x - 3985, y: -2110 }, 0))
                    spawn.mapRect(x - 1375, -1100, 2750, 300);
                    spawn.mapRect(x + -300, -525, 600, 550);

                    //floor 1 fast with jump in middle
                    movers.push(level.mover(x - 4000, -2025, 2700, 50, 30 * moverDirection))
                    movers.push(level.mover(x + 1300, -2025, 2700, 50, 30 * moverDirection))
                    portals.push(level.portal({ x: x + 3985, y: -2110 }, Math.PI, { x: x - 3985, y: -3410 }, 0))
                    spawn.mapRect(x + -500, -2050, 1000, 150);
                    spawn.mapRect(x + -4200, -2300, 1225, 125);
                    spawn.mapRect(x + 2675, -2350, 1625, 150);
                    //up mode triggered by player contact
                    const elevator0 = level.elevator(x - 1300, -1175, 175, 50, -1600, 0.011, { up: 0.01, down: 0.7 })
                    const elevator1 = level.elevator(x + 1125, -1175, 175, 50, -1600, 0.011, { up: 0.01, down: 0.7 })

                    //floor 2  slow with some things to jump on and mobs
                    portals.push(level.portal({ x: x + 3985, y: -3410 }, Math.PI, { x: x - 3985, y: -5110 }, 0))
                    movers.push(level.mover(x - 4000, -3325, 8000, 50, 7 * moverDirection))
                    if (Math.random() < 0.5) {
                        spawn.mapRect(x + 1125, -3625, 325, 200);
                        spawn.mapRect(x - 1350, -3600, 375, 175);
                        spawn.mapRect(x + 325, -3825, 325, 100);
                        spawn.mapRect(x - 675, -3800, 450, 75);
                        spawn.mapRect(x - 1775, -3900, 175, 400);
                        spawn.mapRect(x - 2100, -4275, 325, 775);
                        spawn.mapRect(x + 2625, -3700, 450, 125);
                        spawn.mapRect(x - 3350, -3335, 175, 50);
                        spawn.mapRect(x - 200, -3335, 500, 50);
                        spawn.mapRect(x + 3200, -3335, 325, 50);
                    } else {
                        spawn.mapRect(x + -325, -3550, 425, 125);
                        spawn.mapRect(x + -1100, -3750, 425, 75);
                        spawn.mapRect(x + -2175, -3500, 200, 200);
                        spawn.mapRect(x + 675, -3700, 175, 75);
                        spawn.mapRect(x + 2375, -3425, 275, 125);
                        spawn.mapRect(x + 1750, -3650, 275, 75);
                        spawn.mapRect(x + 1125, -3850, 175, 550);
                        spawn.mapRect(x + -3300, -4175, 675, 550);
                    }
                    spawn.mapRect(x + 3550, -3625, 550, 100);
                    spawn.mapRect(x + -4100, -3650, 325, 100);
                    if (!isExitOpen) {
                        spawn.randomMob(x + 3900, -3725, 0);
                        spawn.randomMob(x + 3675, -3700, 0);
                        spawn.randomMob(x + 2075, -3400, 0);
                        spawn.randomMob(x + 2500, -3500, 0);
                        spawn.randomMob(x + 1975, -3700, 0);
                        spawn.randomMob(x + 1250, -3900, 0);
                        spawn.randomMob(x + 800, -3750, 0);
                        spawn.randomMob(x + 2700, -4700, 0);
                        spawn.randomMob(x + -75, -3650, 0);
                        spawn.randomMob(x + 575, -3500, 0);
                        spawn.randomMob(x + -850, -3900, 0);
                        spawn.randomMob(x + -2725, -4350, 0);
                        spawn.randomMob(x + -2975, -4300, 0);
                        spawn.randomMob(x + -3950, -3675, 0);
                        spawn.randomMob(x + -2950, -3450, 0);
                        spawn.randomMob(x + -2075, -3575, 0);
                        spawn.randomMob(x + -1650, -3450, 0);
                        spawn.randomMob(x + -2825, -4400, 0);
                        spawn.randomMob(x + -900, -4475, 0);
                        spawn.randomMob(x + -75, -3575, 0);
                        spawn.randomMob(x + 3900, -3775, 0);
                        spawn.randomMob(x + 2825, -3375, 0);
                        spawn.randomMob(x + 2075, -3425, 0);
                        spawn.randomMob(x + 1525, -3425, 0);
                        spawn.randomMob(x + 350, -3500, 0);
                        spawn.randomMob(x + -1675, -3650, 0);
                        spawn.randomMob(x + -3025, -3450, 0);
                        spawn.randomMob(x + -3850, -3750, 0);
                        //spawn.randomHigherTierMob(x + 1201, -4110)
                    }

                    //floor 3 fast with bumps
                    spawn.mapRect(x + -4250, -7000, 8475, 325);//roof
                    portals.push(level.portal({ x: x + 3985, y: -5110 }, Math.PI, { x: x + 320, y: -310 }, 0))
                    movers.push(level.mover(x - 4000, -5025, 8000, 50, 50 * moverDirection))
                    if (Math.random() < 0.5) {
                        spawn.mapVertex(x - 2100, -5050, "-150 0   150 0   5 -150   -5 -150")
                        spawn.mapVertex(x - 0, -5100, "-500 0   500 0   25 -300   -25 -300")
                        spawn.mapVertex(x + 2100, -5050, "-300 0   300 0   100 -100   -100 -100")
                    } else {
                        spawn.mapVertex(x - 2100, -5050, "-100 0   100 0   25 -100   -25 -100")
                        spawn.mapVertex(x - 0, -5050, "-400 0   400 0   100 -100   -100 -100")
                        spawn.mapVertex(x + 2100, -5050, "-400 0   400 0   100 -100   -100 -100")
                    }
                    spawn.mapRect(x + 2000, -6700, 200, 1250);
                    spawn.mapRect(x + -100, -6700, 200, 1075);
                    spawn.mapRect(x + -2125, -6700, 50, 925);
                    // spawn.mapRect(x + -4150, -5325, 975, 125); //portal over hang
                    // spawn.mapRect(x + 3325, -5300, 850, 100);//portal over hang

                    stationCustom = () => {
                        for (let i = 0; i < movers.length; i++) movers[i].push();
                        for (let i = 0; i < portals.length; i++) {
                            portals[i][2].query()
                            portals[i][3].query()
                        }
                    }
                    stationCustomTopLayer = () => {
                        for (let i = 0; i < portals.length; i++) {
                            portals[i][0].draw()
                            portals[i][1].draw()
                            portals[i][2].draw()
                            portals[i][3].draw()
                        }
                        elevator0.moveOnTouch()
                        elevator1.moveOnTouch()

                        //custom draw so you can see the mover tracks on subway map with the Line of sight graphics
                        ctx.strokeStyle = "#000"
                        ctx.lineWidth = 4;
                        ctx.setLineDash([40, 40]);
                        for (let i = 0; i < movers.length; i++) {
                            ctx.beginPath();
                            ctx.moveTo(movers[i].vertices[0].x + 2, movers[i].vertices[0].y - 3);
                            ctx.lineTo(movers[i].vertices[1].x - 2, movers[i].vertices[1].y - 3);
                            ctx.lineDashOffset = (-simulation.cycle * movers[i].VxGoal) % 80;
                            ctx.stroke();
                        }
                        ctx.setLineDash([0, 0]);
                        checkGate(gate, gateButton)
                    }
                },
            ]
            //update totalNumberOfStations to a higher number when adding new maps
            simulation.zoomTransition(level.defaultZoom)
            // spawn.randomHigherTierMob(1732, -2267)
            // stations[10]() //for testing a specific station
            stations[stationList[Math.abs(stationNumber % stationList.length)]]() //*************** run this one when uploading
            //add in standard station map infrastructure
            spawn.mapRect(x + -8000, 0, 16000, 800);//tunnel floor
            spawn.mapRect(x + 1500 - 200, -2000, 6400, 1500); //tunnel roof
            spawn.mapRect(x + -1500 - 6400 + 200, -2000, 6400, 1500); //tunnel roof

            // add debris so you can see how fast the train moves
            const debrisCount = 4
            const size = 18 + Math.random() * 25;
            const wide = 6400
            if (isInProgress) {
                //adds new map elements to the level while the level is already running 
                for (let i = 0; i < map.length; ++i) {
                    map[i].collisionFilter.category = cat.map;
                    map[i].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                    Matter.Body.setStatic(map[i], true); //make static
                    Composite.add(engine.world, map[i]); //add to world
                }
                simulation.draw.setPaths()
                simulation.draw.lineOfSightPrecalculation() //required precalculation for line of sight


                //shift trains left/right, as you move left or right a train will jump over and become the train needed at the next station
                let repositionTrain
                let playerOnTrain
                if (Math.abs(train[0].position.x - m.pos.x) > Math.abs(train[1].position.x - m.pos.x)) { //figure out which train the player is farthest from and move it
                    repositionTrain = train[0]
                    playerOnTrain = train[1]
                } else {
                    repositionTrain = train[1]
                    playerOnTrain = train[0]
                }
                repositionTrain.isMoving = false
                if (repositionTrain.position.x > playerOnTrain.position.x) { //decide if the train is moving left or right
                    Matter.Body.setPosition(repositionTrain, { x: -1725 + x, y: repositionTrain.position.y });
                    repositionTrain.changeDirection(false) //go left
                    repositionTrain.stops = { right: -1725 + x, left: -7225 + x }
                    for (let i = 0; i < debrisCount; ++i) spawn.bodyRect(x + -1500 - 6400 + 200 + Math.random() * wide, -35, size * (0.6 + Math.random()), size * (0.6 + Math.random()), 1);
                } else {
                    Matter.Body.setPosition(repositionTrain, { x: 1725 + x, y: repositionTrain.position.y });
                    repositionTrain.changeDirection(true) //go right
                    repositionTrain.stops = { left: 1725 + x, right: 7225 + x }
                    for (let i = 0; i < debrisCount; ++i) spawn.bodyRect(x + 1500 - 200 + Math.random() * wide, -35, size * (0.6 + Math.random()), size * (0.6 + Math.random()), 1);
                }
            } else {
                for (let i = 0; i < debrisCount; ++i) spawn.bodyRect(x + -1500 - 6400 + 200 + Math.random() * wide, -35, size * (0.6 + Math.random()), size * (0.6 + Math.random()), 1);
                for (let i = 0; i < debrisCount; ++i) spawn.bodyRect(x + 1500 - 200 + Math.random() * wide, -35, size * (0.6 + Math.random()), size * (0.6 + Math.random()), 1);
            }
        }
        infrastructure(0, false) //if this is run before the level starts, it needs a false

        level.custom = () => {
            for (let i = 0; i < train.length; i++)  train[i].trainStop()
            ctx.fillStyle = "rgba(0,0,0,0.1)"//"#ddd"
            ctx.fillRect(m.pos.x - 4000, m.pos.y - 4000, 8000, 8000)
            level.exit.drawAndCheck();
            // level.enter.draw();

            //track what station the player is in
            if (m.pos.x > 0.55 * stationWidth + stationNumber * stationWidth) {
                stationNumber++
                // if ((stationNumber % stationList.length) == 0) stationNumber++ //skip the stationNumber that is the modulus of the length of the stationList
                infrastructure(stationNumber * stationWidth)
            } else if (m.pos.x < -0.55 * stationWidth + stationNumber * stationWidth) {
                stationNumber--
                // if ((stationNumber % stationList.length) == 0) stationNumber--//skip the stationNumber that is the modulus of the length of the stationList
                infrastructure(stationNumber * stationWidth)
            }
            stationCustom()
        };
        level.customTopLayer = () => {
            for (let i = 0; i < train.length; i++) train[i].draw()
            stationCustomTopLayer()
        };
        level.isProcedural = true //only used in generating text for the level builder
        simulation.draw.lineOfSightPrecalculation() //required precalculation for line of sight
        simulation.draw.drawMapPath = simulation.draw.drawMapSight
    },
    reservoir() {
        level.announceMobTypes()
        level.exit.x = 1700;
        level.exit.y = -4510;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 25);
        level.setPosToSpawn(-500, 850); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 2300
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        color.map = "#3d4240"
        powerUps.spawnStartingPowerUps(-575, -2925)
        //walls
        spawn.mapRect(-3500, -5000, 1500, 6500);
        spawn.mapRect(2000, -5000, 1500, 6500);
        spawn.mapRect(-2500, 1100, 5000, 400); //slime floor
        spawn.mapRect(-3500, -5475, 7000, 600); //top
        spawn.mapRect(-1925, -4900, 175, 375); //pipe
        spawn.mapRect(-1950, -4550, 225, 25); //pipe
        //top floor exit
        spawn.mapRect(1475, -4900, 50, 250);
        spawn.mapRect(1400, -4475, 650, 50);
        // ground
        spawn.mapVertex(-687, 1060, "700 0  -700 0  -450 -300  450 -300"); //left base
        spawn.mapVertex(863, 1060, "700 0  -700 0  -450 -300  450 -300"); //right base
        //entrance
        spawn.mapRect(-730, 525, 475, 50);
        spawn.mapRect(-730, 550, 50, 150);
        spawn.mapRect(-305, 550, 50, 500);
        spawn.bodyRect(-717, 700, 25, 100); //door
        spawn.bodyRect(-717, 800, 25, 100); //door
        //1st floor            //left
        spawn.mapVertex(-1125 + 437, -50, "490 0  350 80  -350 80  -490 0  -350 -80  350 -80");
        spawn.mapRect(-1225, -100, 1070, 100);
        if (Math.random() < 0.33) {
            spawn.mapVertex(-687, -1000, "-100 -300  0 -350  100 -300  100 300  0 350  -100 300");
        } else if (Math.random() < 0.5) {
            spawn.mapVertex(-687, -1000, "-150 -450  0 -525  150 -450  150 450  0 525  -150 450");
        } else {
            spawn.mapVertex(-687, -700, "-150 0  150 0  150 450  0 525  -150 450");
        }
        //right
        spawn.mapVertex(425 + 437, -50, "490 0  350 80  -350 80  -490 0  -350 -80  350 -80");
        spawn.mapRect(325, -100, 1070, 100);
        spawn.mapRect(175, 675, 425, 25);
        spawn.mapRect(1125, 225, 425, 25);
        spawn.mapRect(650, 450, 425, 25);
        if (Math.random() < 0.33) {
            spawn.mapVertex(855, -1000, "-100 -300  0 -350  100 -300  100 300  0 350  -100 300");
        } else if (Math.random() < 0.5) {
            spawn.mapVertex(855, -1000, "-150 -450  0 -525  150 -450  150 450  0 525  -150 450");
        } else {
            spawn.mapVertex(855, -700, "-150 0  150 0  150 450  0 525  -150 450");
        }
        //2nd floor
        spawn.mapVertex(-687, -1936, "-625 50  0 100  625 50  625 -50 -625 -50");
        spawn.mapVertex(855, -1936, "-625 50  0 100  625 50  625 -50 -625 -50");
        //2nd floor right building
        spawn.mapRect(550, -3050, 600, 75);
        spawn.bodyRect(-125, -2025, 475, 25);
        spawn.mapRect(-925, -2350, 675, 50);
        spawn.mapRect(-825, -2825, 425, 50);
        spawn.mapRect(-450, -3125, 50, 350);
        spawn.mapRect(-750, -3150, 350, 50);
        spawn.mapRect(-650, -3400, 250, 300);
        spawn.mapRect(-650, -3675, 200, 50);
        spawn.bodyRect(-375, -2150, 100, 150, 0.2);
        //2nd floor left pillar
        spawn.mapRect(-1400, -2625, 325, 25);
        spawn.mapRect(-1450, -3225, 425, 25);
        spawn.mapRect(-1512.5, -3825, 550, 25);

        spawn.randomMob(1000, -275, 0.2);
        spawn.randomMob(950, -1725, 0.1);
        spawn.randomMob(-725, -1775, 0.1);
        spawn.randomMob(-200, -2075, 0);
        spawn.randomMob(-550, -3500, -0.2);
        spawn.randomMob(375, -2125, 0);
        spawn.randomMob(-700, -2450, -0.1);
        spawn.randomMob(-1175, -2775, -0.1);
        spawn.randomMob(1025, -3200, -0.2);
        spawn.randomMob(-525, -3750, -0.2);
        spawn.randomMob(1350, -2075, -0.3);
        spawn.randomMob(1775, 1000, -0.4);
        spawn.randomSmallMob(-575, -2925);
        spawn.randomGroup(-400, -4400, 0);
        spawn.randomLevelBoss(825, -3500);
        spawn.secondaryBossChance(75, -1350)
        //spawn.randomHigherTierMob(955, -208)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        const slime = level.hazard(-2000, -5000, 4000, 6060); //    hazard(x, y, width, height, damage = 0.003)
        slime.height -= slime.maxHeight - 60 //start slime at zero
        slime.min.y += slime.maxHeight
        slime.max.y = slime.min.y + slime.height
        const elevator1 = level.elevator(-1625, -90, 310, 800, -2000, 0.0025, { up: 0.1, down: 0.2 }) //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        const elevator2 = level.elevator(1175, -3050, 200, 250, -4475, 0.0025, { up: 0.12, down: 0.2 }) //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        let waterFallWidth = 0
        let waterFallX = 0
        let waterFallSmoothX = 0
        let isWaterfallFilling = false
        const riseRate = 0.30 + Math.min(1, simulation.difficulty * 0.005)
        const spinnerArray = []
        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            spawn.mapVertex(584, -2500, "0 0  300 0  150 600  0 600");
            spawn.mapVertex(1116, -2500, "0 0  300 0  300 600  150 600");
            spawn.bodyRect(-200, -125, 625, 25);
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            elevator1.holdX = -elevator1.holdX // flip the elevator horizontally
            elevator2.holdX = -elevator2.holdX // flip the elevator horizontally
            spinnerArray.push(level.spinner(-110, -3325, 45, 600, 0.003, 0, 0, 0.01)) //    spinner(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0) {
            const boost1 = level.boost(-900, -2000, 790)
            level.setPosToSpawn(500, 850); //normal spawn
            level.custom = () => {
                ctx.fillStyle = "#c0c3c9" ///!!!!!!!!!!   for flipped x:  newX = -oldX - width
                ctx.fillRect(1468, -1975, 2, 1915) //elevator track
                ctx.fillRect(-1274, -4460, 2, 1425) //elevator track
                ctx.fillRect(1225, -3825, 25, 1850); //small pillar background
                ctx.fillStyle = "#d0d4d6"
                ctx.fillRect(275, -1925, 825, 2925) //large pillar background
                ctx.fillRect(-1275, -1925, 825, 2925) //large pillar background
                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(-2000, -4900, 525, 425)
                level.exit.drawAndCheck();
                level.enter.draw();
            };
            level.customTopLayer = () => {
                boost1.query();
                elevator1.move();
                elevator2.move();
                ctx.fillStyle = "#233"
                ctx.beginPath(); //central dot on spinners
                ctx.arc(spinnerArray[0].pointA.x, spinnerArray[0].pointA.y, 9, 0, 2 * Math.PI);
                for (let i = 0, len = spinnerArray.length; i < len; i++) {
                    ctx.moveTo(spinnerArray[i].pointA.x, spinnerArray[i].pointA.y)
                    ctx.arc(spinnerArray[i].pointA.x, spinnerArray[i].pointA.y, 9, 0, 2 * Math.PI);
                }
                ctx.fill();
                //shadow
                ctx.fillStyle = "rgba(0,10,30,0.1)"
                ctx.fillRect(-1150, -3000, 600, 1025);
                ctx.fillRect(450, -3100, 300, 275);
                ctx.fillRect(450, -3625, 200, 225);
                ctx.fillRect(400, -2775, 425, 450);
                ctx.fillRect(250, -2300, 675, 300);
                slime.query();
                if (isWaterfallFilling) {
                    if (slime.height < 5500) {
                        //draw slime fill
                        ctx.fillStyle = `hsla(160, 100%, 43%,${0.3 + 0.07 * Math.random()})`
                        ctx.fillRect(waterFallX, -5050, waterFallWidth, 6175 - slime.height)
                        if (!m.isTimeDilated) {
                            waterFallWidth = 0.98 * waterFallWidth + 4.7 * Math.random()
                            waterFallSmoothX = 0.98 * waterFallSmoothX + 3.5 * Math.random()
                            waterFallX = 1857 - waterFallSmoothX
                            ctx.fillRect(waterFallX + waterFallWidth * Math.random(), -5050, 4, 6175 - slime.height)
                            //push player down if they go under waterfall
                            if (player.position.x > waterFallX && player.position.x < waterFallX + waterFallWidth && player.position.y < slime.height) {
                                Matter.Body.setVelocity(player, {
                                    x: player.velocity.x,
                                    y: player.velocity.y + 2
                                });
                            }
                        }
                        slime.levelRise(riseRate)
                    }
                } else if (Vector.magnitudeSquared(Vector.sub(player.position, level.enter)) > 100000) {
                    isWaterfallFilling = true
                }
            };
        } else { //not flipped
            spawn.mapVertex(1116, -2500, "0 0  300 0  150 600  0 600");
            spawn.mapVertex(584, -2500, "0 0  300 0  300 600  150 600");
            if (Math.random() < 0.1) {
                spinnerArray.push(level.spinner(65, -300, 40, 450, 0.003, Math.PI / 2))
            } else if (Math.random() < 0.25) {
                spinnerArray.push(level.spinner(65, -500, 40, 500, 0.003, 0, 0, -0.015)) //    spinner(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0) {
                const r = 250
                const hexagon = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0     ${r * Math.cos(2.0944)} ${r * Math.sin(2.0944)}      ${r * Math.cos(1.0472)} ${r * Math.sin(1.0472)}  `
                Matter.Body.setVertices(spinnerArray[spinnerArray.length - 1].bodyB, Vertices.fromPath(hexagon))
            } else {
                const W = 410;
                const H = 30;
                spawn.bodyRect(-120, -75, W, H, 1, spawn.propsIsNotHoldable)
                let b = body[body.length - 1];
                cons[cons.length] = Constraint.create({
                    pointA: {
                        x: b.position.x - (W / 2) + 50 - 211,
                        y: b.position.y - 1825
                    },
                    bodyB: b,
                    pointB: {
                        x: -(W / 2) + 50,
                        y: 0
                    },
                    damping: 0.01,
                    stiffness: 0.002,
                    length: 1800
                });
                cons[cons.length] = Constraint.create({
                    pointA: {
                        x: b.position.x + (W / 2) - 50 + 211,
                        y: b.position.y - 1825
                    },
                    bodyB: b,
                    pointB: {
                        x: (W / 2) - 50,
                        y: 0
                    },
                    damping: 0.01,
                    stiffness: 0.002,
                    length: 1800
                });
                Composite.add(engine.world, [cons[cons.length - 1], cons[cons.length - 2]])
            }

            spinnerArray.push(level.spinner(50, -3325, 45, 600, 0.003, 0, 0, 0.01)) //    spinner(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0) {
            if (Math.random() < 0.5) {
                const r = 200
                const hexagon = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0     ${r * Math.cos(2.0944)} ${r * Math.sin(2.0944)}      ${r * Math.cos(1.0472)} ${r * Math.sin(1.0472)}  `
                Matter.Body.setVertices(spinnerArray[spinnerArray.length - 1].bodyB, Vertices.fromPath(hexagon))
            }

            const boost1 = level.boost(800, -2000, 790)

            level.custom = () => {
                ctx.fillStyle = "#c0c3c9"
                ctx.fillRect(-1470, -1975, 2, 1915) //elevator track
                ctx.fillRect(1276, -4460, 2, 1425) //elevator track
                ctx.fillRect(-1250, -3825, 25, 1850); //small pillar background
                ctx.fillStyle = "#d0d4d6"
                ctx.fillRect(-1100, -1925, 825, 2925) //large pillar background
                ctx.fillRect(450, -1925, 825, 2925) //large pillar background
                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(1475, -4900, 525, 425)
                level.exit.drawAndCheck();

                level.enter.draw();
            };

            level.customTopLayer = () => {
                boost1.query();
                elevator1.move();
                elevator2.move();

                ctx.fillStyle = "#233"
                ctx.beginPath(); //central dot on spinners
                ctx.arc(spinnerArray[0].pointA.x, spinnerArray[0].pointA.y, 9, 0, 2 * Math.PI);
                for (let i = 0, len = spinnerArray.length; i < len; i++) {
                    ctx.moveTo(spinnerArray[i].pointA.x, spinnerArray[i].pointA.y)
                    ctx.arc(spinnerArray[i].pointA.x, spinnerArray[i].pointA.y, 9, 0, 2 * Math.PI);
                }
                ctx.fill();
                //shadow
                ctx.fillStyle = "rgba(0,10,30,0.1)"
                ctx.fillRect(550, -3000, 600, 1025);
                ctx.fillRect(-750, -3100, 300, 275);
                ctx.fillRect(-650, -3625, 200, 225);
                ctx.fillRect(-825, -2775, 425, 450);
                ctx.fillRect(-925, -2300, 675, 300);

                slime.query();
                if (isWaterfallFilling) {
                    if (slime.height < 5500) {
                        //draw slime fill
                        ctx.fillStyle = `hsla(160, 100%, 43%,${0.3 + 0.07 * Math.random()})`
                        ctx.fillRect(waterFallX, -5050, waterFallWidth, 6175 - slime.height)
                        if (!m.isTimeDilated) {
                            waterFallWidth = 0.98 * waterFallWidth + 4.7 * Math.random()
                            waterFallSmoothX = 0.98 * waterFallSmoothX + 3.5 * Math.random()
                            waterFallX = waterFallSmoothX - 1985
                            ctx.fillRect(waterFallX + waterFallWidth * Math.random(), -5050, 4, 6175 - slime.height)
                            //push player down if they go under waterfall
                            if (player.position.x > waterFallX && player.position.x < waterFallX + waterFallWidth && player.position.y < slime.height) {
                                Matter.Body.setVelocity(player, {
                                    x: player.velocity.x,
                                    y: player.velocity.y + 2
                                });
                            }
                        }
                        slime.levelRise(riseRate)
                    }
                } else if (Vector.magnitudeSquared(Vector.sub(player.position, level.enter)) > 100000) {
                    isWaterfallFilling = true
                }
            };
        }
    },
    reactor() {
        level.exit.x = 3500;
        level.exit.y = -42;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 25);
        level.defaultZoom = 2000
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#c3d6df" //"#d8dadf";
        color.map = "#303639";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        spawn.bodyRect(250, -70, 100, 70, 1);
        spawn.mapRect(-425, 0, 4500, 2100);
        spawn.mapRect(-475, -2825, 4500, 1025);
        // spawn.mapRect(1200, -1300, 600, 800);
        const a = 400 //side length
        const c = 100 //corner offset
        spawn.mapVertex(1487, -900, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        //entrance
        spawn.mapRect(-2025, -2825, 1250, 4925);
        spawn.mapRect(-900, -2825, 1125, 1725);
        spawn.mapRect(-900, -750, 1125, 2850);
        spawn.mapRect(-325, -1250, 550, 300);
        //exit
        spawn.mapRect(3800, -2825, 1225, 4925);
        spawn.mapRect(2750, -2150, 1325, 1775);
        spawn.mapRect(2750, -475, 550, 300);
        spawn.mapRect(2750, -7, 1050, 150); //exit room floor

        const doorIn = level.door(-313, -950, 525, 200, 190, 2) //x, y, width, height, distance, speed = 1
        const doorOut = level.door(2762, -175, 525, 200, 190, 2) //x, y, width, height, distance, speed = 1
        doorIn.collisionFilter.category = cat.map;
        doorOut.collisionFilter.category = cat.map; // to prevent boson composite from letting the player skip the level
        // doorOut.isClosing = true
        let isDoorsLocked = false
        let isFightOver = false
        let isSpawnedBoss = false

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            level.setPosToSpawn(550, -800); //normal spawn
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

            const button = level.button(-1500, 0)
            button.isUp = true

            level.custom = () => {
                if (isDoorsLocked) {
                    if (player.position.x > 300) { //if player gets trapped inside starting room open up again
                        isDoorsLocked = false
                        doorIn.isClosing = false
                    }
                }
                doorIn.openClose();
                doorOut.openClose();
                ctx.fillStyle = "#d5ebef"
                ctx.fillRect(-3800, -375, 1050, 375)
                level.enter.draw();
                level.exit.drawAndCheck();
                button.draw();
                if (button.isUp) {
                    button.query();
                } else if (!isSpawnedBoss) {
                    if (player.position.x < 0) {
                        if (!doorOut.isClosed() || !doorIn.isClosed()) {
                            doorIn.isClosing = true
                            doorOut.isClosing = true
                            //block caught in a door
                            if (Matter.Query.collides(doorOut, body).length > 1 || Matter.Query.collides(doorIn, body).length > 1) {
                                button.isUp = true
                                doorIn.isClosing = false
                                doorOut.isClosing = false
                            }
                        } else {
                            isSpawnedBoss = true
                            isDoorsLocked = true
                            for (let i = 0; i < 12; ++i) powerUps.spawn(-1800 + 550 * Math.random(), -1800, "ammo")
                            for (let i = 0; i < 5; ++i) powerUps.spawn(-1800 + 550 * Math.random(), -1700, "heal");
                            for (let i = 0; i < 1; ++i) powerUps.spawn(-1800 + 550 * Math.random(), -1750, "research");
                            if (mobs.mobDeaths < level.levelsCleared && !simulation.isCheating) {
                                for (let i = 0; i < 250; i++) spawn.starter(-2700 + 2400 * Math.random(), -1300 - 500 * Math.random())
                            } else {
                                const bossNumber = level.levelsCleared / 7 + simulation.difficultyMode / 2
                                if (Math.random() < 0.25) {
                                    for (let i = 0, len = bossNumber; i < len; ++i) spawn.timeBoss(-1327 - 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                                } else if (Math.random() < 0.33) {
                                    for (let i = 0, len = bossNumber * 0.5; i < len; ++i) spawn.bounceBoss(-1327 - 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                                } else if (Math.random() < 0.5) {
                                    for (let i = 0, len = bossNumber * 0.5; i < len; ++i) spawn.sprayBoss(-1327 - 200 * i, -1525, 30, false) //spawn 2-3 at difficulty 15 
                                } else {
                                    for (let i = 0, len = bossNumber; i < len; ++i) spawn.mineBoss(-1327 - 200 * i, -1525, 50, false); //spawn 3-4 at difficulty 15 
                                }
                            }
                            // const scale = Math.pow(simulation.difficulty, 0.7)
                            // if (mobs.mobDeaths < level.levelsCleared && !simulation.isCheating) {
                            //     for (let i = 0; i < 250; i++) spawn.starter(-2700 + 2400 * Math.random(), -1300 - 500 * Math.random())
                            // } else {
                            //     if (Math.random() < 0.07 && simulation.difficulty > 35) {
                            //         for (let i = 0, len = scale * 0.22 / 6; i < len; ++i) spawn.timeBoss(-1327 - 200 * i, -1525, 60, false); //spawn 1-2 at difficulty 15 
                            //         for (let i = 0, len = scale * 0.1 / 6; i < len; ++i) spawn.bounceBoss(-1327 - 200 * i, -1525, 80, false);
                            //         for (let i = 0, len = scale * 0.13 / 6; i < len; ++i) spawn.sprayBoss(-1327 - 200 * i, -1525, 30, false)
                            //         for (let i = 0, len = scale * 0.25 / 6; i < len; ++i) spawn.mineBoss(-1327 - 200 * i, -1525, 50, false);
                            //     } else {
                            //         if (Math.random() < 0.25) {
                            //             for (let i = 0, len = scale * 0.22; i < len; ++i) spawn.timeBoss(-1327 - 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                            //         } else if (Math.random() < 0.33) {
                            //             for (let i = 0, len = scale * 0.1; i < len; ++i) spawn.bounceBoss(-1327 - 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                            //         } else if (Math.random() < 0.5) {
                            //             for (let i = 0, len = scale * 0.13; i < len; ++i) spawn.sprayBoss(-1327 - 200 * i, -1525, 30, false) //spawn 2-3 at difficulty 15 
                            //         } else {
                            //             for (let i = 0, len = scale * 0.25; i < len; ++i) spawn.mineBoss(-1327 - 200 * i, -1525, 50, false); //spawn 3-4 at difficulty 15 
                            //         }
                            //     }
                            // }
                        }
                    } else {
                        doorIn.isClosing = false
                    }
                } else if (!isFightOver && !(simulation.cycle % 180)) {
                    let isFoundBoss = false
                    for (let i = 0; i < mob.length; i++) {
                        let who = mob[i], where = who.position
                        if (who.isReactorBoss) {
                            isFoundBoss = true
                            if (where.x > -170 || where.x < -2800 || where.y < -2000 || where.y > 500) { //check if reactorBoss is outside of bounds
                                who.damage(Infinity, true) //kill them if so. fixes softlocking issue
                            }
                        }
                    }
                    if (!isFoundBoss) {
                        isFightOver = true
                        doorIn.isClosing = false
                        doorOut.isClosing = false
                        // powerUps.spawnBossPowerUp(-3600, -100)
                        powerUps.spawn(-3650, -50, "tech")
                        powerUps.spawn(-3650, -150, "tech")
                        if (simulation.difficultyMode < 7) powerUps.spawn(-3650, -300, "tech")
                    }
                }
            };

            level.customTopLayer = () => {
                doorIn.draw();
                doorOut.draw();
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-225, -1100, 1000, 350);
            };
        } else {
            level.setPosToSpawn(-550, -800); //normal spawn
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

            const button = level.button(1400, 0)
            button.isUp = true

            level.custom = () => {
                if (isDoorsLocked) {
                    if (player.position.x < -300) { //if player gets trapped inside starting room open up again
                        isDoorsLocked = false
                        doorIn.isClosing = false
                    }
                }
                doorIn.openClose();
                doorOut.openClose();
                ctx.fillStyle = "#d5ebef"
                ctx.fillRect(2750, -375, 1050, 375)
                level.enter.draw();
                level.exit.drawAndCheck();
                button.draw();
                if (button.isUp) {
                    button.query();
                } else if (!isSpawnedBoss) {
                    if (player.position.x > 0) {
                        if (!doorOut.isClosed() || !doorIn.isClosed()) {
                            doorIn.isClosing = true
                            doorOut.isClosing = true
                            //block caught in a door
                            if (Matter.Query.collides(doorOut, body).length > 1 || Matter.Query.collides(doorIn, body).length > 1) {
                                button.isUp = true
                                doorIn.isClosing = false
                                doorOut.isClosing = false
                            }
                        } else {
                            isSpawnedBoss = true
                            isDoorsLocked = true
                            for (let i = 0; i < 9; ++i) powerUps.spawn(1200 + 550 * Math.random(), -1700, "ammo")
                            for (let i = 0; i < 3; ++i) powerUps.spawn(1200 + 550 * Math.random(), -1700, "heal");
                            if (simulation.difficultyMode > 5) for (let i = 0; i < 8; i++) powerUps.spawn(1200 + 550 * Math.random(), -1700, "ammo"); //extra ammo on why difficulty
                            const scale = Math.pow(simulation.difficulty, 0.7) //hard around 30, why around 54
                            if (mobs.mobDeaths < level.levelsCleared && !simulation.isCheating) {
                                for (let i = 0; i < 250; i++) spawn.starter(300 + 2400 * Math.random(), -1300 - 500 * Math.random())
                            } else {
                                if (Math.random() < 0.07 && simulation.difficulty > 35) {
                                    for (let i = 0, len = scale * 0.25 / 6; i < len; ++i) spawn.timeBoss(1487 + 200 * i, -1525, 60, false); //spawn 1-2 at difficulty 15 
                                    for (let i = 0, len = scale * 0.1 / 6; i < len; ++i) spawn.bounceBoss(1487 + 200 * i, -1525, 80, false);
                                    for (let i = 0, len = scale * 0.15 / 6; i < len; ++i) spawn.sprayBoss(1487 + 200 * i, -1525, 30, false)
                                    for (let i = 0, len = scale * 0.26 / 6; i < len; ++i) spawn.mineBoss(1487 + 200 * i, -1525, 50, false);
                                } else {
                                    if (Math.random() < 0.25) {
                                        for (let i = 0, len = scale * 0.25; i < len; ++i) spawn.timeBoss(1487 + 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                                    } else if (Math.random() < 0.33) {
                                        for (let i = 0, len = scale * 0.1; i < len; ++i) spawn.bounceBoss(1487 + 200 * i, -1525, 80, false); //spawn 1-2 at difficulty 15 
                                    } else if (Math.random() < 0.5) {
                                        for (let i = 0, len = scale * 0.15; i < len; ++i) spawn.sprayBoss(1487 + 200 * i, -1525, 30, false) //spawn 2-3 at difficulty 15 
                                    } else {
                                        for (let i = 0, len = scale * 0.26; i < len; ++i) spawn.mineBoss(1487 + 200 * i, -1525, 50, false); //spawn 3-4 at difficulty 15 
                                    }
                                }
                            }
                            // spawn.secondaryBossChance(2200, -800)
                        }
                    } else {
                        doorIn.isClosing = false
                    }
                } else if (!isFightOver && !(simulation.cycle % 180)) {
                    let isFoundBoss = false
                    for (let i = 0; i < mob.length; i++) {
                        let who = mob[i], where = who.position
                        if (who.isReactorBoss) {
                            isFoundBoss = true
                            if (where.x < 170 || where.x > 2800 || where.y < -2000 || where.y > 500) { //check if reactorBoss is outside of bounds
                                who.damage(Infinity, true) //kill them if so. fixes softlocking issue
                            }
                        }
                    }
                    if (!isFoundBoss) {
                        isFightOver = true
                        doorIn.isClosing = false
                        doorOut.isClosing = false
                        // powerUps.spawnBossPowerUp(3600, -100)
                        powerUps.spawn(3650, -50, "tech")
                        powerUps.spawn(3650, -150, "tech")
                        powerUps.spawn(3650, -300, "tech")
                        // if (player.position.x < 2760 && player.position.x > 210) {}
                    }
                }
            };

            level.customTopLayer = () => {
                doorIn.draw();
                doorOut.draw();
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-775, -1100, 1000, 350);
            };
        }
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    towers() {
        // simulation.isHorizontalFlipped = true
        level.announceMobTypes()
        const isFlippedHorizontal = (simulation.isHorizontalFlipped && Math.random() < 0.33) ? true : false
        if (isFlippedHorizontal) {
            level.setPosToSpawn(9150 + 50, -2230 - 25);
            level.exit.x = 400 - 50;
            level.exit.y = -50 + 25;
            leftRoomColor = "#cff"
            rightRoomColor = "rgba(0,0,0,0.13)"
        } else {
            level.setPosToSpawn(400, -50);
            level.exit.x = 9150;
            level.exit.y = -2230;
        }

        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        level.fallMode = "position"; //must set level.fallModeBounds in this mode to prevent player getting stuck left or right
        level.fallModeBounds = { left: level.enter.x, right: level.exit.x } //used with level.fallMode = "position";
        if (isFlippedHorizontal) level.fallModeBounds = { left: level.exit.x, right: level.enter.x } //used with level.fallMode = "position";
        simulation.fallHeight = 5000 //level.enter.y - 4000
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 2300
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#cdd9df";
        powerUps.spawnStartingPowerUps(6300, 1025)

        const boost1 = level.boost(7560, 1480, 1700, 1.75)
        const boost2 = level.boost(7098, 0, 1250, Math.PI / 3)  //x,y,push,angle radians
        const boost3 = level.boost(9700, -730, 1050, 1.95)
        const boost4 = level.boost(4300, -720, 1500, 1.25)
        const boost5 = level.boost(3000, -1215, 3000, 1.25)
        const boost6 = level.boost(8251, -619, 1200, 2.7)
        const boost7 = level.boost(7750, -1540, 1050, 1.2)
        // const boost6 = level.boost(8235, -619, 3500, 2.9)

        const train1 = level.transport(3650, 100, 415, 500, 8); //x,y,width.height,VxGoal,force
        const train2 = level.transport(1250, 100, 415, 500, -8); //x,y,width.height,VxGoal,force
        const train3 = level.transport(4050, 100, 415, 500, 8); //x,y,width.height,VxGoal,force

        let portal1, portal2
        portal1 = level.portal({
            x: 3675,
            y: -2225 + 1025
        }, -Math.PI / 2, { //up
            x: 3675,
            y: -375
        }, Math.PI / 2) //down

        portal2 = level.portal({
            x: 6300,
            y: -1225
        }, -Math.PI / 2, { //up
            x: 6300,
            y: -375
        }, Math.PI / 2) //down
        level.custom = () => {
            boost1.query();
            boost2.query();
            boost3.query();
            boost4.query();
            boost5.query();
            boost6.query();
            boost7.query();
            //trains oscillate back and forth and act like they are bouncing off each other
            if (train1.position.x < 2850) {
                train1.changeDirection(true) //go right
            } else if (train1.position.x > 3850) {
                train1.changeDirection(false) //go left
            }
            if (train2.position.x < 1450) {
                train2.changeDirection(true) //go right
            } else if (train2.position.x > 2450) {
                train2.changeDirection(false) //go left
            }
            if (train3.position.x < 4250) {
                train3.changeDirection(true) //go right
            } else if (train3.position.x > 5250) {
                train3.changeDirection(false) //go left
            }
            train1.move();
            train2.move();
            train3.move();
            ctx.fillStyle = "rgba(0,0,0,0.25)"
            ctx.fillRect(1250, 121, 4200, 6)
            ctx.fillStyle = "rgba(50,70,100,0.04)"
            ctx.fillRect(2500, -10000, 1800, 30000);
            ctx.fillRect(8300, -10000, 1800, 30000);
            ctx.fillRect(-500, -10000, 1800, 30000);
            ctx.fillRect(5400, -10000, 1800, 30000);

            portal1[2].query()
            portal1[3].query()
            portal2[2].query()
            portal2[3].query()

            ctx.fillStyle = "#cff"
            if (isFlippedHorizontal) {
                ctx.fillRect(150, -300, 525, 325);  //entrance typically
            } else {
                ctx.fillRect(8925, -2575, 525, 400) //exit typically
            }

            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.13)"
            ctx.fillRect(8300, -1950, 1550, 1275);
            ctx.fillRect(5400, 875, 1800, 650);
            ctx.fillRect(2950, -2200, 875, 1050);
            ctx.fillRect(5900, -1025, 800, 450);
            if (isFlippedHorizontal) {
                ctx.fillRect(8925, -2575, 575, 400) //exit typically
            } else {
                ctx.fillRect(150, -300, 525, 325);  //entrance typically
            }

            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(7175, -1515, 125, 180);
            portal1[0].draw();
            portal1[1].draw();
            portal1[2].draw();
            portal1[3].draw();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
        };

        // four large rounded squares
        let a = 900 //side length
        let c = 100 //corner offset
        // spawn.mapVertex(3400, -1300, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        // spawn.mapVertex(9200, -1300, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        // spawn.mapVertex(6300, 900, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        spawn.mapVertex(400, 900, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        //lower 1st zone entrance /exit
        spawn.mapRect(100, -350, 575, 75);
        spawn.mapRect(100, -300, 75, 375);
        spawn.mapRect(600, -325, 75, 175);
        spawn.mapRect(600, -10, 75, 50);


        //2nd zone upper hollow square
        spawn.mapVertex(5650 - 2900, 900 - 2200, `${-a} ${-a + c}  ${-a + c} ${-a}   ${-400} ${-a}           ${-400} ${a}          ${-a + c} ${a}  ${-a} ${a - c}`); //1/2 square with edges cut off
        spawn.mapVertex(6950 - 2900, 900 - 2200, `${400} ${-a}        ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}       ${400} ${a}`); //1/2 square with edges cut off
        // spawn.mapRect(5600 - 2900, 1400 - 2200, 1350, 400);
        spawn.mapRect(2950, -1175, 650, 775);
        spawn.mapRect(3750, -1175, 100, 775);
        spawn.mapRect(3575, -1025, 200, 475);


        //4th zone   far right hollow square near exit
        spawn.mapVertex(9200, -2050, `${-a} ${-a + c}  ${-a + c} ${-a}     ${a - c} ${-a}  ${a} ${-a + c}       ${a} ${-600}          ${-a} ${-600}`); //square with edges cut off --- hollow top
        spawn.mapVertex(9200, -550, `${-a} ${600}   ${a} ${600}      ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off --- hollow bottom
        spawn.mapRect(9800, -2100, 300, 1600);  //hollow left wall
        spawn.mapVertex(8175, -1425, "-1400 -90  350 -90 400 -40   400 40   350 90  -1400 90");
        spawn.mapVertex(6856, -1425, "300 -90  -350 -90 -400 -40   -400 40   -350 90  300 90");
        //exit housing
        spawn.mapRect(8925, -2575, 575, 75);
        if (isFlippedHorizontal) {
            spawn.mapRect(8925, -2550, 75, 400);
            spawn.mapRect(9425, -2550, 75, 125);
            spawn.mapRect(9425, -2215, 75, 50);
            spawn.bodyRect(9425, -2425, 75, 210);
        } else {
            spawn.mapRect(9425, -2550, 75, 400);
            spawn.mapRect(8925, -2550, 75, 125);
            spawn.mapRect(8925, -2215, 75, 50);
        }



        //lower 3rd zone
        spawn.mapVertex(6300, 450, `${-a} ${-a + c}  ${-a + c} ${-a}     ${a - c} ${-a}  ${a} ${-a + c}       ${a} ${0}          ${-a} ${0}`); //square with edges cut off --- hollow top
        spawn.mapVertex(6300, 1200, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapVertex(6450, 1650, `${-a} ${600}      ${a + 700} ${600}        ${a + 700} ${a - c}      ${a - c + 700} ${a}         ${-a + c} ${a}      ${-a} ${a - c}`); //square with edges cut off --- hollow bottom

        //upper 3rd zone
        a = 400 //side length
        c = 50 //corner offset
        // spawn.mapVertex(6300, -800, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        spawn.mapVertex(6300, -1100, `${-a} ${-a + c}  ${-a + c} ${-a}   ${a - c} ${-a}  ${a} ${-a + c}     ${a} ${-200}      ${-a} ${-200}`); //square with edges cut off
        spawn.mapVertex(6300, -500, `${-a} ${200}     ${a} ${200}   ${a} ${a - c}  ${a - c} ${a}  ${-a + c} ${a}  ${-a} ${a - c}`); //square with edges cut off
        spawn.mapVertex(5800, -1425, "-300 -40  -250 -90   250 -90 300 -40   300 40 250 90  -250 90 -300 40");
        spawn.mapVertex(5485, -1850, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapVertex(7115, -1850, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40"); //long
        spawn.mapVertex(6300, -2175, "-300 -40  -250 -90   250 -90 300 -40   300 40 250 90  -250 90 -300 40");  //highest
        spawn.mapVertex(4450, -1850, "-200 -40  -150 -90   150 -90 200 -40   200 40 150 90  -150 90 -200 40");
        // spawn.mapVertex(5300, -300, "-300 -60  -270 -90   270 -90 300 -60   300 60 270 90  -270 90 -300 60");
        spawn.mapVertex(5300, -300, "-300 -40  -250 -90   250 -90 300 -40   300 40 250 90  -250 90 -300 40");
        spawn.mapVertex(4500, -590, "-300 -90   250 -90 300 -40   300 40 250 90  -300 90");
        // spawn.mapVertex(4600, -590, "-500 -90   170 -90 200 -60   200 60 170 90  -500 90");

        //no debris on this level, so spawn some heals and ammo
        powerUps.chooseRandomPowerUp(6275, 1425);
        powerUps.chooseRandomPowerUp(6300, -650);
        powerUps.chooseRandomPowerUp(9550, -750);

        //random blocks
        spawn.bodyRect(7725, -2200, 150, 250, 0.2);
        spawn.bodyRect(4625, -825, 75, 125, 0.2);
        spawn.bodyRect(3250, -1200, 25, 25, 0.2);
        spawn.bodyRect(3375, -1275, 25, 75, 0.2);
        spawn.bodyRect(3450, -1200, 50, 25, 0.2);
        spawn.bodyRect(2825, -2225, 25, 25, 0.2);
        spawn.bodyRect(4075, -2225, 50, 25, 0.2);
        spawn.bodyRect(8850, -800, 75, 100, 0.2);
        spawn.bodyRect(6900, -100, 75, 100, 0.2);
        spawn.bodyRect(8975, -1575, 50, 50, 0.2);
        spawn.bodyRect(5725, -1700, 125, 175, 0.2);
        spawn.bodyRect(6850, -1725, 150, 200, 0.2);
        spawn.bodyRect(500, -400, 100, 50, 0.3);
        spawn.bodyRect(6025, 1050, 100, 50, 0.2);
        spawn.bodyRect(6000, -800, 75, 200, 0.2);
        spawn.bodyRect(6775, -75, 125, 75, 0.5);
        spawn.bodyRect(7200, 1300, 50, 200, 0.5);


        //mobs
        spawn.randomMob(5700, -75, 0);
        spawn.randomMob(6200, -100, 0);
        spawn.randomMob(6900, -100, 0.1);
        spawn.randomMob(5550, -500, 0.1);
        spawn.randomMob(4675, -850, 0.1);
        spawn.randomMob(4450, -2050, 0.1);
        spawn.randomMob(4050, -2325, 0.1);
        spawn.randomMob(3350, -1325, 0.2);
        spawn.randomMob(5300, -2050, 0.2);
        spawn.randomMob(5675, -2050, 0.2);
        spawn.randomMob(5850, -1625, 0.3);
        spawn.randomMob(6775, -1600, 0.3);
        spawn.randomMob(7700, -1625, 0.4);
        spawn.randomMob(7850, -2000, 0.4);
        spawn.randomMob(7225, -2000, 0.4);
        spawn.randomMob(6350, -2400, 0.5);
        spawn.randomMob(8850, -1650, 0.5);
        spawn.randomMob(9500, -1300, 0.5);
        spawn.randomMob(9250, -900, 0.5);
        spawn.randomMob(8600, -875, 0.6);
        spawn.randomMob(5575, 1350, 0.6);
        spawn.randomMob(6075, 1025, 0.6);
        spawn.randomMob(6300, 1025, 0.7);
        spawn.randomMob(6525, 1425, 0.8);
        spawn.randomMob(7125, 1450, 0.9);
        spawn.randomGroup(4925, -2850, 1);
        spawn.randomLevelBoss(7275, -2475);
        spawn.secondaryBossChance(8400, -1025)
        //spawn.randomHigherTierMob(6644, -682)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    factory() {
        level.announceMobTypes()
        // simulation.enableConstructMode() //remove this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        level.setPosToSpawn(2235, -1375); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        level.exit.x = 7875;
        level.exit.y = -2480;

        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d2d4";
        // color.map = "#262a2f"
        let isPowerLeft = true
        const movers = []
        //left side
        movers.push(level.mover(125, -140, 925, 35, -5))
        movers.push(level.mover(1100, -437, 1100, 35, -5))
        movers.push(level.mover(2000, -600, 850, 35, -5))
        //right side
        const moveSpeedStopGo = 8
        movers.push(level.mover(2700, -200, 3600, 35, 0))
        movers.push(level.mover(7175, -215, 2275, 50, 3))
        movers.push(level.mover(6475, -215, 275, 100, -3))
        movers.push(level.mover(6725, -500, 500, 375, 3))
        movers.push(level.mover(7675, -725, 500, 410, 0))
        movers.push(level.mover(6775, -1075, 375, 50, 0))
        movers.push(level.mover(5525, -1075, 450, 50, 0))
        movers.push(level.mover(6775, -2100, 375, 50, 0))
        movers.push(level.mover(5450, -1900, 525, 50, 0))

        function setMoverDirection(VxGoal) {
            for (let i = 7; i < movers.length; i++) movers[i].VxGoal = VxGoal
        }
        setMoverDirection(0)

        const buttonRight = level.button(7735, -1825)
        buttonRight.isUp = true
        const buttonLeft = level.button(5275, -1900)

        const lasers = []
        const laserX = 3390 //3882 - 1130 / 2
        const laserGap = 1295 //1130
        lasers.push(level.hazard(laserX, -500, 6, 300, 0.4))
        lasers.push(level.hazard(laserX + laserGap, -500, 6, 300, 0.4))
        lasers.push(level.hazard(laserX + laserGap * 2, -500, 6, 300, 0.4))
        for (let i = 0; i < lasers.length; i++) {
            lasers[i].isOn = false;
            spawn.mapRect(lasers[i].min.x - 55, -550, 110, 50);
            spawn.mapRect(lasers[i].min.x - 10, -500, 25, 20);
        }
        const button1 = level.button(2235, -200)
        button1.isUp = true
        let bonusAmmoCount = 0
        level.custom = () => {
            if (isPowerLeft) {
                if (!(simulation.cycle % 90)) spawn.bodyRect(2730, -1600, 50, 50);
            } else {
                // for (let i = 0; i < trains.length; i++) {
                //     //oscillate back and forth
                //     if (trains[i].position.x < 5275) {
                //         trains[i].changeDirection(true) //go right
                //     } else if (trains[i].position.x > 7875) {
                //         trains[i].changeDirection(false) //go left
                //     }
                //     trains[i].move();
                // }

                const rate = 160 //multiples of 32!
                if ((simulation.cycle % rate) === 80) {
                    for (let i = 0; i < lasers.length; i++) lasers[i].isOn = false;
                    movers[3].VxGoal = moveSpeedStopGo;
                    movers[3].force = 0.0005
                    movers[2].VxGoal = moveSpeedStopGo;
                    movers[2].force = 0.0005
                } else if ((simulation.cycle % rate) === 0) {
                    movers[3].VxGoal = 0;
                    movers[3].force = 0
                    movers[2].VxGoal = 0;
                    movers[2].force = 0
                    spawn.bodyRect(2730, -1600, 50, 50);
                    if ((simulation.cycle % (rate * 3)) === 0) {
                        if (bonusAmmoCount < 3 && Math.random() < 0.5) { //some extra ammo because of all the extra mobs that don't drop ammo
                            bonusAmmoCount++
                            powerUps.spawn(2760, -1550, Math.random() < 0.5 ? "heal" : "ammo", false);
                        }

                        for (let i = 0; i < lasers.length; i++) lasers[i].isOn = true;
                        const block2Mob = (laserIndex) => { //convert block into mob
                            const laserHit = Matter.Query.ray(body, lasers[laserIndex].min, lasers[laserIndex].max) //check for collisions with 3rd laser
                            if (laserHit.length) {
                                for (let i = 0; i < body.length; i++) {
                                    if (laserHit[0].body.id === body[i].id) { //need to find the block id so it can be removed
                                        const list = ["flutter", "flutter", "flutter", "hopper", "slasher", "slasher", "slasher", "stabber", "springer", "striker", "sneaker", "launcher", "launcherOne", "exploder", "sucker", "spinner", "grower", "beamer", "spawner", "ghoster"]
                                        const pick = list[Math.floor(Math.random() * list.length)]
                                        spawn[pick](lasers[laserIndex].max.x, lasers[laserIndex].max.y - 20);
                                        const who = mob[mob.length - 1]
                                        Matter.Body.setVelocity(who, { x: (8 + 5 * Math.random()), y: -(14 + 10 * Math.random()) });
                                        who.locatePlayer()
                                        who.leaveBody = false;
                                        who.isDropPowerUp = false
                                        //remove block
                                        Matter.Composite.remove(engine.world, body[i]);
                                        body.splice(i, 1);
                                        break
                                    }
                                }
                            }
                        }
                        if (mob.length < 100 && !m.isTimeDilated) {
                            block2Mob(0)
                            block2Mob(1)
                            block2Mob(2)
                        }
                    }
                }
            }
            if (buttonLeft.isUp) {
                buttonLeft.query();
                if (!buttonLeft.isUp) {
                    setMoverDirection(7)
                    buttonRight.isUp = true //flip the other button up

                    //remove any blocks on top of right button
                    const badBlocks = Matter.Query.region(body, buttonRight)
                    //figure out block's index
                    for (let j = 0; j < badBlocks.length; j++) {
                        let index = null
                        for (let i = 0; i < body.length; i++) {
                            if (badBlocks[j] === body[i]) index = i
                        }
                        //remove block
                        // console.log(index, j)
                        if (index) {
                            Matter.Composite.remove(engine.world, badBlocks[j]);
                            body.splice(index, 1);
                        }
                    }

                }
            } else if (buttonRight.isUp) {
                buttonRight.query();
                if (!buttonRight.isUp) {
                    setMoverDirection(-7)
                    //check for blocks and remove them
                    const list = Matter.Query.region(body, buttonLeft) //are any blocks colliding with this
                    buttonLeft.isUp = true //flip the other button up
                    if (list.length > 0) {
                        list[0].isRemoveMeNow = true
                        for (let i = 1; i < body.length; i++) { //find which index in body array it is and remove from array
                            if (body[i].isRemoveMeNow) {
                                Matter.Composite.remove(engine.world, list[0]);
                                body.splice(i, 1);
                                break
                            }
                        }
                    }
                }
            }

            if (button1.isUp) { //opens up secondary zone
                button1.query();
                if (!button1.isUp) {
                    isPowerLeft = false
                    for (let i = 0; i < 3; i++) {
                        movers[i].VxGoal = 0;
                        movers[i].force = movers[i].VxGoal > 0 ? 0.0005 : -0.0005
                    }
                    powerUps.spawnStartingPowerUps(2760, -1550);
                    spawn.randomMob(2700, -350, 0.2);
                    spawn.randomMob(6975, -650, 0.2);
                    spawn.randomMob(6550, -325, 0.3);
                    spawn.randomMob(7350, -350, 0.3);
                    spawn.randomMob(7925, -975, 0.5);
                    spawn.randomMob(7950, -1725, 0.5);
                    spawn.randomMob(7000, -1375, 0.3);
                    spawn.randomMob(5700, -1350, 0.5);
                    spawn.randomMob(5250, -1575, 0.5);
                    spawn.randomMob(6325, -75, 0.3);
                    spawn.randomMob(7900, -1925, 0.1);
                    spawn.randomMob(5300, -1975, 0.3);
                    spawn.randomMob(7875, -1900, 0.3);
                    spawn.randomMob(5325, -1975, 0.4);

                    spawn.randomGroup(3900, -725, 0.4);
                    spawn.randomLevelBoss(6501, -1771);
                    spawn.secondaryBossChance(6063, -661)
                    powerUps.addResearchToLevel() //needs to run after mobs are spawned
                }
            }
            buttonRight.draw();
            buttonLeft.draw();
            button1.draw();
            for (let i = 0; i < movers.length; i++) movers[i].push();
            level.exit.drawAndCheck();
            level.enter.draw();
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(6937, -2075, 50, 1775); //6937, -1050, 50, 675);
            ctx.fillStyle = "rgba(0,255,255,0.15)" //            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(7675, -2875, 500, 425); //exit room
        };
        level.customTopLayer = () => {
            if (isPowerLeft) {
                ctx.fillStyle = "rgba(0,0,0,0.2)"
                ctx.fillRect(2400, -1650, 7050, 2750) //right side
                ctx.fillRect(4950, -3075, 3225, 1425);
                ctx.beginPath()
                ctx.moveTo(2407, -576);
                ctx.lineTo(2000, -573)
                ctx.lineTo(1950, -439)
                ctx.lineTo(1100, -432)
                ctx.lineTo(1020, -143)
                ctx.lineTo(125, -137)
                ctx.lineTo(-109, 300)
                ctx.lineTo(-125, 1089)
                ctx.lineTo(2372, 1081)
                ctx.lineTo(2452, 65)
                ctx.fill();
            } else {
                // for (let i = 0; i < trains.length; i++) trains[i].draw()
                ctx.beginPath()
                ctx.moveTo(2526, -589);
                ctx.lineTo(2531, -597)
                ctx.lineTo(2506, -594)
                ctx.lineTo(2850, -600)
                ctx.lineTo(2890, -193)
                ctx.lineTo(6300, -200)
                ctx.lineTo(6618, 857)
                ctx.lineTo(6622, 1100)
                ctx.lineTo(2521, 1100)
                ctx.fillStyle = "rgba(0,0,0,0.2)"
                ctx.fill();
                ctx.fillRect(-100, -1650, 2625, 2750) //left side
                for (let i = 0; i < lasers.length; i++) lasers[i].opticalQuery()
            }
            ctx.fillStyle = "rgba(0,0,0,0.07)"
            ctx.fillRect(7675, -2200, 1775, 2025);
            ctx.fillRect(4950, -2075, 500, 1000);
            ctx.fillRect(2050, -1650, 350, 325) //entrance room
            for (let i = 0; i < movers.length; i++) movers[i].draw();
        };
        spawn.mapRect(-1550, -3050, 1450, 4150); //left wall
        spawn.mapRect(-1550, -3050, 6525, 1400); //ceiling
        spawn.mapRect(-1550, -3050, 6525, 1400);
        spawn.mapRect(3000, -1700, 1975, 675); //ceiling center

        spawn.mapRect(3800, -4000, 5650, 950);
        spawn.mapRect(3800, -4000, 1175, 2975);
        spawn.mapRect(8175, -4000, 1275, 3685); //right wall
        spawn.mapRect(8175, -200, 1275, 1300); //right wall

        spawn.mapRect(75, 0, 6275, 1100); //ground
        spawn.mapRect(6475, -200, 2750, 1300);
        spawn.mapRect(4975, -1087, 550, 62);
        spawn.mapRect(4975, -1100, 500, 75);

        spawn.mapRect(7875, -1100, 175, 25); //right 3 hop stairs
        spawn.mapRect(8075, -1450, 200, 25);
        spawn.mapRect(7675, -1825, 375, 25);
        spawn.mapRect(7675, -1800, 250, 725);

        spawn.mapRect(5125, -1275, 200, 25); //left 3 hop stairs
        spawn.mapRect(4900, -1575, 175, 25);
        spawn.mapRect(5125, -1900, 325, 25);
        spawn.mapRect(5225, -1875, 225, 625);
        spawn.mapRect(4950, -3075, 500, 1000);

        //exit
        spawn.mapRect(7675, -2450, 525, 250);
        spawn.mapRect(7675, -3050, 550, 175);
        spawn.mapRect(7675, -2925, 50, 175);

        spawn.mapRect(1925, -1325, 550, 50); //entrance
        spawn.mapRect(2050, -1675, 50, 175); //entrance
        spawn.mapRect(1700, -200, 750, 275); //button shelf
        if (Math.random() < 0.5) { //left side
            spawn.mapRect(625, -1100, 425, 300);
            spawn.mapRect(1375, -1100, 425, 300);
            spawn.mapRect(1750, -835, 100, 35);
            spawn.mapRect(-200, -525, 150, 35);
        } else {
            spawn.mapRect(800, -1125, 925, 400);
            spawn.mapRect(75, -775, 400, 50);
            spawn.mapRect(1700, -760, 75, 35);
            spawn.mapRect(-200, -425, 150, 35);
        }
        spawn.mapRect(2400, -600, 125, 675);
        spawn.mapRect(2400, -1750, 125, 1050);
        spawn.mapRect(2700, -1700, 125, 85);

        spawn.randomMob(350, -325, 0.5);
        spawn.randomMob(875, -375, 0.5);
        spawn.randomMob(1250, -575, 0.5);
        spawn.randomMob(1550, -600, 0.5);
        spawn.randomSmallMob(1250, -175);
        spawn.randomSmallMob(1500, -229);
        spawn.randomSmallMob(1850, -300);
        //spawn.randomHigherTierMob(1491, -150)
        powerUps.spawn(5200, -1300, "ammo");
    },
    labs() {
        level.announceMobTypes()
        level.isProcedural = true //used in generating text for the level builder
        level.defaultZoom = 1700
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d9d9de" //"#d3d3db" //"#dcdcdf";
        let isDoorLeft, isDoorRight, x, y
        doCustom = []
        doCustomTopLayer = []
        offset = { x: 0, y: 0 }
        const mobSpawnChance = 0 // Math.random() < chance + 0.07 * simulation.difficulty
        enterOptions = [
            (x = offset.x, y = offset.y) => { //lasers
                level.setPosToSpawn(x + 1750, y - 800);
                spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
                spawn.mapRect(x + 1450, y - 1350, 50, 450); //entrance left wall
                spawn.bodyRect(x + 1460, y - 900, 30, 150); //entrance door
                spawn.mapRect(x + 1600, y - 350, 500, 100); //toggle shelf
                const toggle = level.toggle(x + 1650, y - 350, true) //(x,y,isOn,isLockOn = true/false)
                let hazard1
                if (Math.random() > 0.5) {
                    spawn.mapRect(x + 550, y - 750, 1500, 50); //entrance shelf
                    // hazard1 = level.hazard(x + 850, y - 920, 600, 10, 0.4) //laser
                    hazard1 = level.laser({ x: x + 870, y: y - 915 }, { x: x + 1450, y: y - 915 })
                    spawn.mapRect(x + 860, y - 925, 10, 20); //laser nose
                    spawn.mapRect(x + 660, y - 975, 200, 120); //laser body
                } else {
                    spawn.mapRect(x + 1350, y - 750, 700, 50); //entrance shelf
                    // hazard1 = level.hazard(x + 1040, y - 660, 1000, 10, 0.4) //laser
                    hazard1 = level.laser({ x: x + 1060, y: y - 655 }, { x: x + 2000, y: y - 655 })
                    spawn.mapRect(x + 1050, y - 665, 10, 20); //laser nose
                    spawn.mapRect(x + 650, y - 705, 400, 100); //laser body
                }
                // const hazard2 = level.hazard(x, y - 330, 450, 10, 0.4) //laser
                const hazard2 = level.laser({ x: x + 5, y: y - 325 }, { x: x + 455, y: y - 325 })
                spawn.mapRect(x + 440, y - 335, 10, 20); //laser nose
                spawn.mapRect(x + 450, y - 375, 400, 100); //laser body
                const Xoffset = Math.floor(400 * Math.random())
                //level.hazard(x + Xoffset, y - 1300, 10, 1300, 0.4) //laser
                const hazard3 = level.laser({ x: x + Xoffset + 5, y: y - 1290 }, { x: x + Xoffset + 5, y: y })
                spawn.mapRect(x + Xoffset - 5, y - 1310, 20, 20); //laser nose
                const Xoffset2 = 1650 + Math.floor(300 * Math.random())
                // const hazard4 = level.hazard(x + Xoffset2, y - 240, 10, 250, 0.4) //laser
                hazard4 = level.laser({ x: x + Xoffset2 + 5, y: y - 230 }, { x: x + Xoffset2 + 5, y: y - 230 + 250 })

                spawn.mapRect(x + Xoffset2 - 5, y - 250, 20, 20); //laser nose
                spawn.randomMob(x + 150, y + -1100, mobSpawnChance);
                spawn.randomMob(x + 175, y + -775, mobSpawnChance);
                spawn.randomMob(x + 150, y + -350, mobSpawnChance);
                spawn.randomMob(x + 150, y + -75, mobSpawnChance);
                spawn.randomMob(x + 650, y + -125, mobSpawnChance);
                spawn.randomMob(x + 1200, y + -75, mobSpawnChance);
                // let isSpawnedMobs = false
                doCustomTopLayer.push(
                    () => {
                        toggle.query();
                        if (toggle.isOn) {
                            if ((simulation.cycle % 120) > 60) {
                                hazard1.query();
                                hazard2.query();
                            } else {
                                hazard3.query();
                                hazard4.query()
                            }
                        }
                    }
                )
            },
        ]
        exitOptions = [
            (x = offset.x, y = offset.y) => {
                level.exit.x = x + 1725;
                level.exit.y = y - 980;
                spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
                spawn.mapRect(x + 1500, y - 950, 500, 25); //exit platform
                spawn.mapRect(x + 1550, y - 1300, 25, 175); //exit side wall
                spawn.mapVertex(x + 1300, y - 125, "-400 0   -250 -400  250 -400   400 0");

                spawn.bodyRect(x + 1075, y - 475, 125, 125, 0.25);
                spawn.bodyRect(x + 500, y - 100, 125, 100, 0.25);
                spawn.bodyRect(x + 200, y - 150, 100, 150, 0.25);
                spawn.bodyRect(x + 1075, y - 1075, 100, 125, 0.25);
                const density = 0.0015
                const angle = Math.PI / 2
                const variance = 0 //Math.PI
                const frictionAir = 0.03
                const angularVelocity = 0 //0.01
                const spinVariance = 0 //0.02
                balance1 = level.spinner(x + 200, y - 500, 30, 400, density, angle + variance * (Math.random() - 0.5), frictionAir, angularVelocity + spinVariance * (Math.random() - 0.5)) //    spinner(x, y, width, height, density = 0.001, angle=0,frictionAir=0.001,angularVelocity=0) {
                balance2 = level.spinner(x + 200, y - 950, 30, 400, density, angle + variance * (Math.random() - 0.5), frictionAir, angularVelocity + spinVariance * (Math.random() - 0.5))
                balance3 = level.spinner(x + 650, y - 750, 30, 400, density, angle + variance * (Math.random() - 0.5), frictionAir, angularVelocity + spinVariance * (Math.random() - 0.5))
                balance4 = level.spinner(x + 1250, y - 1000, 30, 400, density, angle + variance * (Math.random() - 0.5), frictionAir, angularVelocity + spinVariance * (Math.random() - 0.5))

                let isInRoom = false
                doCustom.push(
                    () => {
                        if (!isInRoom && m.pos.x > x - 100 && m.pos.x < x + 2700 && m.pos.y > y - 1300 && m.pos.y < y) { //check if player is in this room and run code once
                            isInRoom = true
                            spawn.randomMob(x + 1175, y - 725, mobSpawnChance);
                            spawn.randomMob(x + 1450, y - 725, mobSpawnChance);
                            spawn.randomMob(x + 425, y - 100, mobSpawnChance);
                            spawn.randomMob(x + 1700, y - 300, mobSpawnChance);
                            spawn.randomMob(x + 1300, y - 375, mobSpawnChance);
                            //spawn.randomHigherTierMob(x + 800, y - 1000);
                        }
                        ctx.fillStyle = "#d4f4f4"
                        ctx.fillRect(x + 1550, y - 1300, 450, 350)
                    }
                )
                doCustomTopLayer.push(
                    () => {
                        ctx.fillStyle = "#233"
                        ctx.beginPath();
                        ctx.arc(balance1.pointA.x, balance1.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance2.pointA.x, balance2.pointA.y)
                        ctx.arc(balance2.pointA.x, balance2.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance3.pointA.x, balance3.pointA.y)
                        ctx.arc(balance3.pointA.x, balance3.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance4.pointA.x, balance4.pointA.y)
                        ctx.arc(balance4.pointA.x, balance4.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                )
            },
            (x = offset.x, y = offset.y) => {
                level.exit.x = x + 1750;
                level.exit.y = y - 980;
                spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
                spawn.mapRect(x + 1550, y - 950, 500, 25); //exit platform
                spawn.mapRect(x + 1600, y - 1300, 25, 175); //exit side wall
                spawn.bodyRect(x + 1275, y - 475, 125, 125, 0.25);
                spawn.bodyRect(x + 500, y - 100, 125, 100, 0.25);
                spawn.bodyRect(x + 800, y - 150, 100, 150, 0.25);
                spawn.bodyRect(x + 875, y + -50, 50, 50);
                spawn.bodyRect(x + 1025, y + -50, 50, 50);

                if (Math.random() > 0.5) {
                    const density = 0.0012
                    const angle = Math.PI / 2
                    const variance = 0.2 //Math.PI
                    const frictionAir = 0.015
                    const height = 35
                    balance1 = level.spinner(x + 1300, y - 425, height, 410, density, angle + variance * (Math.random() - 0.5), frictionAir) //    spinner(x, y, width, height, density = 0.001, angle=0,frictionAir=0.001,angularVelocity=0) {
                    balance3 = level.spinner(x + 750, y - 650, height, 410, density, angle + variance * (Math.random() - 0.5), frictionAir)
                    balance2 = level.spinner(x + 300, y - 425, height, 410, density, angle + variance * (Math.random() - 0.5), frictionAir)
                    balance4 = level.spinner(x + 1250, y - 950, 50, 550, density, angle, 0.1)
                    const rotatingBlock = body[body.length - 1]
                    doCustom.push(
                        () => {
                            if (!isInRoom && m.pos.x > x - 100 && m.pos.x < x + 2700 && m.pos.y > y - 1300 && m.pos.y < y) { //check if player is in this room and run code once
                                isInRoom = true
                                spawn.randomMob(x + 1175, y - 725, mobSpawnChance);
                                spawn.randomMob(x + 1450, y - 725, mobSpawnChance);
                                spawn.randomMob(x + 425, y - 100, mobSpawnChance);
                                spawn.randomMob(x + 1200, y - 125, mobSpawnChance);
                                spawn.randomMob(x + 1300, y - 375, mobSpawnChance);
                                //spawn.randomHigherTierMob(x + 800, y - 1000);
                            }
                            ctx.fillStyle = "#d4f4f4"
                            ctx.fillRect(x + 1600, y - 1300, 400, 350)
                            rotatingBlock.torque += rotatingBlock.inertia * 0.000005
                        }
                    )
                } else {
                    const density = 0.001
                    const angle = Math.PI / 2
                    const variance = Math.PI
                    const frictionAir = 0.015
                    const width = 200
                    const height = 200
                    const spinVariance = 0.05
                    balance1 = level.spinner(x + 175, y - 300, height, width, density, angle + variance * (Math.random() - 0.5), frictionAir, spinVariance * (Math.random() - 0.5)) //    spinner(x, y, width, height, density = 0.001, angle=0,frictionAir=0.001,angularVelocity=0) {
                    balance2 = level.spinner(x + 500, y - 525, height, width, density, angle + variance * (Math.random() - 0.5), frictionAir, spinVariance * (Math.random() - 0.5))
                    balance3 = level.spinner(x + 850, y - 700, height, width, density, angle + variance * (Math.random() - 0.5), frictionAir, spinVariance * (Math.random() - 0.5))
                    balance4 = level.spinner(x + 1250, y - 850, height, width, density, angle + variance * (Math.random() - 0.5), frictionAir, spinVariance * (Math.random() - 0.5))
                    doCustom.push(
                        () => {
                            if (!isInRoom && m.pos.x > x - 100 && m.pos.x < x + 2700 && m.pos.y > y - 1300 && m.pos.y < y) { //check if player is in this room and run code once
                                isInRoom = true
                                spawn.randomMob(x + 1175, y - 725, mobSpawnChance);
                                spawn.randomMob(x + 1450, y - 725, mobSpawnChance);
                                spawn.randomMob(x + 425, y - 100, mobSpawnChance);
                                spawn.randomMob(x + 1200, y - 125, mobSpawnChance);
                                spawn.randomMob(x + 1300, y - 375, mobSpawnChance);
                                //spawn.randomHigherTierMob(x + 800, y - 1000);
                            }
                            ctx.fillStyle = "#d4f4f4"
                            ctx.fillRect(x + 1600, y - 1300, 400, 350)
                        }
                    )
                }
                let isInRoom = false
                doCustomTopLayer.push(
                    () => {
                        ctx.fillStyle = "#233"
                        ctx.beginPath();
                        ctx.arc(balance1.pointA.x, balance1.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance2.pointA.x, balance2.pointA.y)
                        ctx.arc(balance2.pointA.x, balance2.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance3.pointA.x, balance3.pointA.y)
                        ctx.arc(balance3.pointA.x, balance3.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.moveTo(balance4.pointA.x, balance4.pointA.y)
                        ctx.arc(balance4.pointA.x, balance4.pointA.y, 9, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                )
            }
        ]
        emptyOptions = [ //nothing good here except the starting power up, and duplicated bosses
            (x = offset.x, y = offset.y) => { //pulse
                if (!isDoorLeft && isDoorRight) { //flipped, entering from the right
                    powerUps.spawnStartingPowerUps(x + 2000 - 1650, y + -400);
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1525 - 250, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 2000 - 245 - 300, y + -200, 300, 100); //gun
                    spawn.mapRect(x + 2000 - 530 - 25, y + -190, 25, 80); //gun nose
                    const button = level.button(x + 2000 - 290 - 140, y - 200)
                    button.isReadyToFire = true
                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 2000 - 255 - 280, y + -100, 280, 100);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                b.pulse(90, Math.PI, {
                                    x: x + 2000 - 560,
                                    y: y - 150
                                })
                            }
                        }
                    )
                    spawn.randomMob(x + 2000 - 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 2000 - 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                } else {
                    powerUps.spawnStartingPowerUps(x + 1650, y + -400);
                    spawn.mapRect(x + 1575, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 1575, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 1525, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 245, y + -200, 300, 100); //gun
                    spawn.mapRect(x + 530, y + -190, 25, 80); //gun nose
                    const button = level.button(x + 290, y - 200)
                    button.isReadyToFire = true

                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 255, y + -100, 280, 100);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                b.pulse(90, 0, { x: x + 560, y: y - 150 })
                            }
                        }
                    )
                    spawn.randomMob(x + 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                }
            },
            (x = offset.x, y = offset.y) => { //spawn block and fire it
                if (!isDoorLeft && isDoorRight) {
                    powerUps.spawnStartingPowerUps(x + 1650, y + -400);
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1525 - 250, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 2000 - 245 - 300, y + -200, 300, 100); //gun
                    spawn.mapRect(x + 2000 - 530 - 25, y + -190, 25, 80);
                    const button = level.button(x + 2000 - 290 - 140, y - 200)
                    button.isReadyToFire = true
                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 2000 - 255 - 280, y + -100, 280, 100);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                fireBlock = function (xPos, yPos) {
                                    const index = body.length
                                    spawn.bodyRect(xPos, yPos, 35 + 50 * Math.random(), 35 + 50 * Math.random());
                                    const bodyBullet = body[body.length - 1]
                                    Matter.Body.setVelocity(body[index], { x: -120, y: -5 });
                                    body[index].isAboutToBeRemoved = true;
                                    setTimeout(() => { //remove block
                                        for (let i = 0; i < body.length; i++) {
                                            if (body[i] === bodyBullet) {
                                                Matter.Composite.remove(engine.world, body[i]);
                                                body.splice(i, 1);
                                            }
                                        }
                                    }, 1000);
                                }
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 140);
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 160);
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 180);
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 200);
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 220);
                                fireBlock(x + 2000 - 90 - 560 + 30 * Math.random(), y - 240);
                            }
                        }
                    )
                    spawn.randomMob(x + 2000 - 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 2000 - 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                } else {
                    powerUps.spawnStartingPowerUps(x + 1650, y + -400);
                    spawn.mapRect(x + 1575, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 1575, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 1525, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 245, y + -200, 300, 100); //gun
                    spawn.mapRect(x + 530, y + -190, 25, 80);
                    const button = level.button(x + 290, y - 200)
                    button.isReadyToFire = true
                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 255, y + -100, 280, 100);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                fireBlock = function (xPos, yPos) {
                                    const index = body.length
                                    spawn.bodyRect(xPos, yPos, 35 + 50 * Math.random(), 35 + 50 * Math.random());
                                    const bodyBullet = body[body.length - 1]
                                    Matter.Body.setVelocity(body[index], { x: 120, y: -5 });
                                    body[index].isAboutToBeRemoved = true;

                                    setTimeout(() => { //remove block
                                        for (let i = 0; i < body.length; i++) {
                                            if (body[i] === bodyBullet) {
                                                Matter.Composite.remove(engine.world, body[i]);
                                                body.splice(i, 1);
                                            }
                                        }
                                    }, 1000);
                                }
                                fireBlock(x + 560 + 30 * Math.random(), y - 140);
                                fireBlock(x + 560 + 30 * Math.random(), y - 160);
                                fireBlock(x + 560 + 30 * Math.random(), y - 180);
                                fireBlock(x + 560 + 30 * Math.random(), y - 200);
                                fireBlock(x + 560 + 30 * Math.random(), y - 220);
                                fireBlock(x + 560 + 30 * Math.random(), y - 240);
                            }
                        }
                    )
                    spawn.randomMob(x + 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                }
            },
            (x = offset.x, y = offset.y) => { //fire an "ammo clip" of blocks
                if (!isDoorLeft && isDoorRight) { //flipped, entering from the right
                    powerUps.spawnStartingPowerUps(x + 2000 - 1650, y + -400);
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1575 - 25, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 2000 - 1525 - 250, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 2000 - 175 - 370, y + -200, 370, 100); //gun
                    spawn.mapRect(x + 2000 - 530 - 25, y + -190, 25, 80);
                    spawn.mapRect(x + 2000 - 545 - 10, y + -770, 10, 325); //block loader for gun //walls
                    spawn.mapRect(x + 2000 - 620 - 10, y + -770, 10, 325); //walls
                    spawn.mapRect(x + 2000 + 50 - 150, y + -425, 150, 50);
                    spawn.mapRect(x + 2000 - 175 - 370, y + -650, 370, 50);
                    spawn.mapRect(x + 2000 - 540 - 95, y + -460, 95, 15); //bottom that opens and closes
                    const bulletDoor = map[map.length - 1] //keep track of this body so it can be make non-collide later
                    for (let i = 0; i < 6; i++) spawn.bodyRect(x + 2000 - 60 - 555 + Math.floor(Math.random() * 10), y + -520 - 50 * i, 50, 50); //bullets for gun
                    spawn.bodyRect(x + 2000 - 250 - 40, y + -700, 40, 50); //extra bullets 
                    spawn.bodyRect(x + 2000 - 350 - 30, y + -700, 30, 35);
                    spawn.bodyRect(x + 2000 - 425 - 40, y + -700, 40, 70);
                    const button = level.button(x + 2000 - 280 - 140, y - 200) //trigger for gun
                    button.isReadyToFire = true
                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 2000 - 200 - 325, y + -625, 325, 650);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                                bulletDoor.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                bulletDoor.collisionFilter.mask = 0 //cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
                            } else if (!button.isUp) {
                                const bounds = {
                                    min: {
                                        x: x + 2000 - 580,
                                        y: y - 125
                                    },
                                    max: {
                                        x: x + 2000 - 530,
                                        y: y - 110
                                    }
                                }
                                const list = Matter.Query.region(body, bounds)
                                for (let i = 0, len = list.length; i < len; i++) {
                                    Matter.Body.setVelocity(list[i], {
                                        x: -120,
                                        y: -5
                                    });
                                }
                                if (Matter.Query.region([player], bounds).length) {
                                    Matter.Body.setVelocity(player, {
                                        x: -100,
                                        y: -5
                                    });
                                }
                                ctx.fillStyle = `rgba(255,0,255,${0.2 + 0.7 * Math.random()})`
                                ctx.fillRect(bounds.min.x, y - 185, 38, 70);
                            }
                        }
                    )
                    spawn.randomMob(x + 2000 - 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 2000 - 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 2000 - 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                } else {
                    powerUps.spawnStartingPowerUps(x + 1650, y + -400);
                    spawn.mapRect(x + 1575, y + -625, 25, 375); //wall on top of wall
                    spawn.mapRect(x + 1575, y + -1325, 25, 525); //wall on top of wall
                    spawn.mapRect(x + 1525, y + -350, 250, 450); //wall
                    spawn.mapRect(x + 175, y + -200, 370, 100); //gun
                    spawn.mapRect(x + 530, y + -190, 25, 80);
                    spawn.mapRect(x + 545, y + -770, 10, 325); //block loader for gun //walls
                    spawn.mapRect(x + 620, y + -770, 10, 325); //walls
                    spawn.mapRect(x - 50, y + -425, 150, 50);
                    spawn.mapRect(x + 175, y + -650, 370, 50);
                    spawn.mapRect(x + 540, y + -460, 95, 15); //bottom that opens and closes
                    const bulletDoor = map[map.length - 1] //keep track of this body so it can be make non-collide later
                    for (let i = 0; i < 6; i++) spawn.bodyRect(x + 555 + Math.floor(Math.random() * 10), y + -520 - 50 * i, 50, 50); //bullets for gun
                    spawn.bodyRect(x + 250, y + -700, 40, 50); //extra bullets 
                    spawn.bodyRect(x + 350, y + -700, 30, 35);
                    spawn.bodyRect(x + 425, y + -700, 40, 70);
                    const button = level.button(x + 280, y - 200) //trigger for gun
                    button.isReadyToFire = true
                    doCustom.push(
                        () => {
                            ctx.fillStyle = "rgba(0,0,0,0.05)"; //"rgba(0,0,0,0.1)";
                            ctx.fillRect(x + 200, y + -625, 325, 650);
                            button.query();
                            button.draw();
                            if (!button.isReadyToFire && button.isUp) {
                                button.isReadyToFire = true
                                bulletDoor.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
                            } else if (button.isReadyToFire && !button.isUp) {
                                button.isReadyToFire = false
                                bulletDoor.collisionFilter.mask = 0 //cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
                            } else if (!button.isUp) {
                                const bounds = {
                                    min: {
                                        x: x + 530,
                                        y: y - 125
                                    },
                                    max: {
                                        x: x + 580,
                                        y: y - 110
                                    }
                                }
                                const list = Matter.Query.region(body, bounds)
                                for (let i = 0, len = list.length; i < len; i++) {
                                    Matter.Body.setVelocity(list[i], {
                                        x: 120,
                                        y: -5
                                    });
                                }
                                if (Matter.Query.region([player], bounds).length) {
                                    Matter.Body.setVelocity(player, {
                                        x: 100,
                                        y: -5
                                    });
                                }
                                ctx.fillStyle = `rgba(255,0,255,${0.2 + 0.7 * Math.random()})`
                                ctx.fillRect(bounds.min.x, y - 185, 38, 70);
                            }
                        }
                    )
                    spawn.randomMob(x + 1600, y + -425, mobSpawnChance);
                    spawn.randomMob(x + 1725, y + -1250, mobSpawnChance);
                    spawn.randomMob(x + 1250, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 300, y + -1200, mobSpawnChance);
                    spawn.randomMob(x + 800, y + -125, mobSpawnChance);
                    let pick = spawn.pickList[Math.floor(Math.random() * spawn.pickList.length)];
                    spawn[pick](x + 1275, y + -150, 90 + Math.random() * 40); //one extra large mob
                }
            }
        ]
        lootOptions = [ //has some power up reward //field, ammo, research, gun
            (x = offset.x, y = offset.y) => {
                spawn.mapRect(x + 1925, y + -325, 125, 150); //4 wall ledges
                spawn.mapRect(x + 1925, y + -865, 125, 150); //4 wall ledges
                spawn.mapRect(x + -50, y + -325, 125, 150); //4 wall ledges
                spawn.mapRect(x + -50, y + -865, 125, 150); //4 wall ledges
                spawn.mapRect(x + 1700, y + -500, 200, 25);
                spawn.mapRect(x + 75, y + -500, 200, 25);

                let chamberY = -650
                if (Math.random() > 0.5) { //upper chamber
                    chamberY = -650 - 640
                    spawn.mapRect(x + 550, y + -10 - 640, 900, 25); //raised floor 
                    spawn.mapRect(x + 450, y + -20 - 640, 1100, 25);
                    spawn.mapRect(x + 450, y + -675 - 640, 1100, 25); //chamber ceiling
                    powerUps.spawn(x + 998, y - 333 - 640, "tech", false);
                    spawn.mapVertex(x + 1000, y + -0, "575 0  -575 0  -450 -100  450 -100"); //base
                } else { //lower chamber
                    spawn.mapRect(x + 400, y + -10, 1200, 50); //raised floor 
                    spawn.mapRect(x + 450, y + -20, 1100, 50);
                    spawn.mapRect(x + 450, y + -675, 1100, 25); //chamber ceiling
                    spawn.mapRect(x + 550, y + -685, 900, 25);
                    powerUps.spawn(x + 998, y - 333, "tech", false);
                }
                const powerUp1 = powerUp[powerUp.length - 1]
                if (powerUp1) powerUp1.holdPosition = { x: powerUp1.position.x, y: powerUp1.position.y }
                let isSpawnedMobs = false
                doCustom.push(
                    () => {
                        ctx.fillStyle = "#e4e4e9" //"rgba(255,255,255,1)";
                        ctx.fillRect(x + 450, y + chamberY, 1100, 650); //chamber background
                        // if (!isInRoom && m.pos.x > x - 100 && m.pos.x < x + 2000 && m.pos.y > y - 1300 && m.pos.y < y) { //is player inside this room?
                        //     isInRoom = true
                        // } else 
                        if (powerUp1 && powerUp1.velocity.y !== 0) { //don't run this code if power up is gone //hack:  powerUp1.velocity.y !== 0 seems to only be true if the power up doesn't exist and is no longer being affected by gravity
                            ctx.strokeStyle = "#f0f"
                            ctx.lineWidth = 2;
                            if (Vector.magnitudeSquared(Vector.sub(m.pos, powerUp1.position)) < 90000) { //zone radius is 300
                                //damage player and drain energy
                                if (m.immuneCycle < m.cycle) {
                                    if (m.energy < 0.02) {
                                        //push out
                                        // const force = Vector.mult(Vector.normalise(Vector.sub(player.position, powerUp1.position)), 0.02 * player.mass)
                                        // player.force.x += force.x
                                        // player.force.y += force.y
                                        player.force.x += (player.position.x > powerUp1.position.x) ? 0.02 * player.mass : - 0.02 * player.mass

                                    } else {
                                        m.energy -= 0.01
                                        //friction
                                        Matter.Body.setVelocity(player, {
                                            x: player.velocity.x * 0.45,
                                            y: player.velocity.y * 0.98
                                        });
                                    }
                                }

                                //draw electricity going towards player
                                const unit = Vector.normalise(Vector.sub(m.pos, powerUp1.position))
                                let xElec = powerUp1.position.x + 40 * unit.x;
                                let yElec = powerUp1.position.y + 40 * unit.y;
                                ctx.beginPath();
                                ctx.moveTo(xElec, yElec);
                                const step = 40
                                for (let i = 0; i < 6; i++) {
                                    xElec += step * (unit.x + 1.5 * (Math.random() - 0.5))
                                    yElec += step * (unit.y + 1.5 * (Math.random() - 0.5))
                                    ctx.lineTo(xElec, yElec);
                                }
                            } else {
                                //draw electricity going in random directions
                                const angle = Math.random() * 2 * Math.PI
                                const Dx = Math.cos(angle);
                                const Dy = Math.sin(angle);
                                let xElec = powerUp1.position.x + 40 * Dx;
                                let yElec = powerUp1.position.y + 40 * Dy;
                                ctx.beginPath();
                                ctx.moveTo(xElec, yElec);
                                const step = 40
                                for (let i = 0; i < 6; i++) {
                                    xElec += step * (Dx + 1.5 * (Math.random() - 0.5))
                                    yElec += step * (Dy + 1.5 * (Math.random() - 0.5))
                                    ctx.lineTo(xElec, yElec);
                                }
                            }
                            ctx.lineWidth = 2 * Math.random();
                            ctx.stroke(); //draw electricity

                            ctx.beginPath(); //outline damage zone
                            ctx.arc(powerUp1.position.x, powerUp1.position.y, 300, 0, 2 * Math.PI);
                            ctx.stroke();
                            //float power up in the air
                            Matter.Body.setPosition(powerUp1, {
                                x: powerUp1.holdPosition.x + 4 * Math.random(), //1300 -2
                                y: powerUp1.holdPosition.y + 4 * Math.random() //335 -2
                            });
                            Matter.Body.setVelocity(powerUp1, { x: 0, y: 0 });
                        } else if (!isSpawnedMobs) {
                            isSpawnedMobs = true
                            if (chamberY === -650) { //lower chamber
                                spawn.randomMob(x + 250, y + -650, mobSpawnChance);
                                spawn.randomMob(x + 1825, y + -600, mobSpawnChance);
                                spawn.randomGroup(x + 275, y + -1050, mobSpawnChance);
                                spawn.randomGroup(x + 675, y + -975, mobSpawnChance);
                                spawn.randomGroup(x + 1225, y + -975, Infinity);
                            } else { //upper chamber
                                spawn.randomMob(x + 250, y + -650, mobSpawnChance);
                                spawn.randomMob(x + 1800, y + -625, mobSpawnChance);
                                spawn.randomGroup(x + 300, y + -300, mobSpawnChance);
                                spawn.randomGroup(x + 650, y + -275, mobSpawnChance);
                                spawn.randomGroup(x + 1125, y + -300, Infinity);
                            }
                        }
                    }
                )
            }
        ]
        upDownOptions = [ //extra tall vertical section 3000x3000  //this is where the level boss is
            (x = offset.x, y = offset.y) => { //mover
                const button = level.button(x + 935, y + 0)
                button.isUp = true
                doCustomTopLayer.push(
                    () => {
                        button.draw();
                        if (button.isUp) {
                            button.query();
                            if (!button.isUp) {
                                const mapStartingLength = map.length //track this so you know how many you added when running addMapToLevelInProgress
                                addMapToLevelInProgress = (who) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
                                    who.collisionFilter.category = cat.map;
                                    who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                                    Matter.Body.setStatic(who, true); //make static
                                    Composite.add(engine.world, who); //add to world
                                }
                                //map elements go here
                                //box around portals
                                spawn.mapRect(x + -50, y + -2700, 150, 110);
                                spawn.mapRect(x + -50, y + -2440, 150, 25);
                                spawn.mapRect(x + 1900, y + -2715, 150, 550);
                                spawn.mapRect(x + 1900, y + -2015, 150, 50);
                                spawn.mapRect(x + 1900, y + -1115, 150, 150);
                                spawn.mapRect(x + 1900, y + -815, 150, 50);
                                spawn.mapRect(x + -50, y + -340, 150, 50);
                                // spawn.mapRect(x + -50, y + -640, 150, 150);
                                spawn.mapRect(x + 1975, y - 1015, 50, 225);
                                spawn.mapRect(x + 1975, y - 2190, 50, 200);
                                spawn.mapRect(x + -25, y - 2615, 50, 200);
                                spawn.mapRect(x + -25, y - 515, 75, 200);

                                //ledge to get to upper left door
                                // spawn.mapRect(x + -50, y - 1400, 100, 25);
                                spawn.mapRect(x + -25, y - 1075, 250, 25);
                                spawn.mapRect(x + -50, y - 1075, 150, 590);


                                const rampSpeed = 8 //+ Math.floor(4 * Math.random())
                                const mover4 = level.mover(x, y + -2425, 1000, 50, rampSpeed)
                                const mover3 = level.mover(x + 1000, y + -2000, 1000, 50, rampSpeed)
                                const mover2 = level.mover(x + 1000, y + -800, 1000, 50, -rampSpeed)
                                const mover1 = level.mover(x, y + -325, 1000, 50, -rampSpeed)
                                const portal1 = level.portal({
                                    x: x + 125,
                                    y: y - 415
                                }, 2 * Math.PI, { //right
                                    x: x + 125,
                                    y: y - 2515
                                }, 2 * Math.PI) //right

                                const portal2 = level.portal({
                                    x: x + 1875,
                                    y: y - 890
                                }, Math.PI, { //left
                                    x: x + 1875,
                                    y: y - 2090
                                }, Math.PI) //left

                                doCustom.push(() => {
                                    portal1[2].query()
                                    portal1[3].query()
                                    portal2[2].query()
                                    portal2[3].query()
                                    mover1.push();
                                    mover2.push();
                                    mover3.push();
                                    mover4.push();
                                })
                                doCustomTopLayer.push(() => {
                                    portal1[0].draw();
                                    portal1[1].draw();
                                    portal1[2].draw();
                                    portal1[3].draw();
                                    portal2[0].draw();
                                    portal2[1].draw();
                                    portal2[2].draw();
                                    portal2[3].draw();
                                    mover1.draw();
                                    mover2.draw();
                                    mover3.draw();
                                    mover4.draw();
                                })
                                for (let i = 0, numberOfMapElementsAdded = map.length - mapStartingLength; i < numberOfMapElementsAdded; i++) addMapToLevelInProgress(map[map.length - 1 - i])
                                simulation.draw.setPaths() //update map graphics

                                //blocks that ride the movers and portals
                                spawn.bodyRect(x + 175, y + -2525, 50, 75);
                                spawn.bodyRect(x + 300, y + -2525, 50, 50);
                                spawn.bodyRect(x + 500, y + -2525, 80, 75);

                                //mobs go here
                                spawn.randomMob(x + 175, y + -125, 0);
                                spawn.randomMob(x + 1775, y + -125, 0);
                                // spawn.randomMob(x + 1750, y + -525, 0);
                                spawn.randomMob(x + 225, y + -1000, 0);
                                spawn.randomMob(x + 1675, y + -1075, 0);
                                // spawn.randomMob(x + 1575, y + -2450, 0);
                                spawn.randomMob(x + 425, y + -1850, 0);
                                spawn.randomMob(x + 1425, y + -1200, 0);
                                spawn.randomMob(x + 350, y + -1000, 0);
                                spawn.randomLevelBoss(x + 475, y + -1475);
                                spawn.secondaryBossChance(x + 1425, y + -1425);
                            }
                        }
                    }
                )
            },
            (x = offset.x, y = offset.y) => { //hopBoss2
                const button = level.button(x + 935, y + 0)
                button.isUp = true
                // spawn.mapVertex(x + 5, y + -1318, "0 0  0 -250  125 -250"); //left ledges
                // spawn.mapVertex(x + 1995, y + -1318, "0 0  0 -250  -125 -250"); // right ledges
                doCustomTopLayer.push(
                    () => {
                        button.draw();
                        if (button.isUp) {
                            button.query();
                            if (!button.isUp) {
                                const mapStartingLength = map.length //track this so you know how many you added when running addMapToLevelInProgress
                                addMapToLevelInProgress = (who) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
                                    who.collisionFilter.category = cat.map;
                                    who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                                    Matter.Body.setStatic(who, true); //make static
                                    Composite.add(engine.world, who); //add to world
                                }
                                //map elements go here
                                spawn.mapRect(x + 150, y + -1400, 750, 50);
                                spawn.mapRect(x + 1100, y + -1400, 750, 50);
                                spawn.mapRect(x + 1825, y + -1050, 200, 50);
                                spawn.mapRect(x + -25, y + -1050, 200, 50);
                                spawn.mapRect(x + 1825, y + -325, 200, 50);
                                spawn.mapRect(x + -25, y + -325, 200, 50);
                                spawn.mapRect(x + 275, y + -700, 525, 50);
                                spawn.mapRect(x + 1200, y + -700, 525, 50);
                                spawn.mapRect(x + -25, y + -1400, 125, 1125); //side walls
                                spawn.mapRect(x + 1900, y + -1400, 150, 1125);
                                spawn.mapRect(x + 1900, y + -2700, 125, 1000);
                                spawn.mapRect(x + -50, y + -2725, 150, 1025);
                                spawn.mapRect(x + -25, y + -1750, 450, 50);
                                spawn.mapRect(x + 1575, y + -1750, 450, 50);
                                spawn.mapRect(x + 525, y + -1750, 950, 50);
                                for (let i = 0, numberOfMapElementsAdded = map.length - mapStartingLength; i < numberOfMapElementsAdded; i++) addMapToLevelInProgress(map[map.length - 1 - i])
                                simulation.draw.setPaths() //update map graphics
                                //mobs go here
                                powerUps.spawn(x + 50, y - 1525, "ammo");
                                powerUps.spawn(x + 1950, y - 1525, "ammo");
                                powerUps.spawn(x + 1900, y - 1525, "ammo");
                                if (simulation.difficultyMode > 1 || level.levelsCleared > 1) {
                                    spawn.hopMotherBoss(x + 800, y + -2200)
                                } else {
                                    powerUps.spawnBossPowerUp(2800, -1400)
                                }
                                for (let i = 0; i < 4; ++i) spawn.hopBullet(x + 150 + 750 * Math.random(), y + -1600)
                                for (let i = 0; i < 4; ++i) spawn.hopBullet(x + 1100 + 750 * Math.random(), y + -1600)
                                spawn.hopper(x + 1550, y + -775);
                                spawn.hopper(x + 500, y + -775);
                                spawn.hopper(x + 500, y + -2200);
                                spawn.hopper(x + 1100, y + -2200);
                                spawn.hopMother(x + 1400, y + -775);
                                spawn.hopMother(x + 550, y + -775);
                                spawn.hopMother(x + 525, y + -1475);
                                spawn.hopMother(x + 1550, y + -1500);
                            }
                        }
                    }
                )
            },
            (x = offset.x, y = offset.y) => {
                // const toggle = level.toggle(x + 950, y + 0, false, true) //    toggle(x, y, isOn = false, isLockOn = false) {
                // toggle.isAddedElements = false

                const button = level.button(x + 935, y + 0)
                button.isUp = true


                spawn.mapVertex(x + 5, y + -1318, "0 0  0 -250  125 -250"); //left ledges
                spawn.mapVertex(x + 1995, y + -1318, "0 0  0 -250  -125 -250"); // right ledges
                doCustomTopLayer.push(
                    () => {
                        button.draw();
                        if (button.isUp) {
                            button.query();
                            if (!button.isUp) {
                                // toggle.isAddedElements = true //only do this once
                                addMapToLevelInProgress = (who) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
                                    who.collisionFilter.category = cat.map;
                                    who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                                    Matter.Body.setStatic(who, true); //make static
                                    Composite.add(engine.world, who); //add to world
                                }
                                let r = 150
                                let hexagon = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0     ${r * Math.cos(2.0944)} ${r * Math.sin(2.0944)}      ${r * Math.cos(1.0472)} ${r * Math.sin(1.0472)}  `
                                //450 horizontal spread //  -130-130-130 = 390 vertical
                                if (Math.random() < 0.5) {
                                    spawn.mapVertex(x + 775, y + -260, hexagon);
                                    spawn.mapVertex(x + 1225, y + -260, hexagon);

                                    spawn.mapVertex(x + 550, y + -650, hexagon);
                                    spawn.mapVertex(x + 1000, y + -650, hexagon);
                                    spawn.mapVertex(x + 1450, y + -650, hexagon);

                                    spawn.mapVertex(x + 325, y + -1040, hexagon);
                                    spawn.mapVertex(x + 775, y + -1040, hexagon);
                                    spawn.mapVertex(x + 1225, y + -1040, hexagon);
                                    spawn.mapVertex(x + 1675, y + -1040, hexagon);

                                    spawn.mapVertex(x + 550, y + -1430, hexagon);
                                    spawn.mapVertex(x + 1000, y + -1430, hexagon);
                                    spawn.mapVertex(x + 1450, y + -1430, hexagon);

                                    const numberOfMapElementsAdded = 12
                                    for (let i = 0; i < numberOfMapElementsAdded; i++) addMapToLevelInProgress(map[map.length - 1 - i])
                                    spawn.randomMob(x + 225, y + -1775, mobSpawnChance);
                                    spawn.randomMob(x + 700, y + -1750, mobSpawnChance);
                                    spawn.randomMob(x + 1175, y + -1725, mobSpawnChance);
                                    spawn.randomMob(x + 1700, y + -1700, mobSpawnChance);
                                    spawn.randomMob(x + 1750, y + -250, mobSpawnChance);
                                    spawn.randomMob(x + 125, y + -250, mobSpawnChance);
                                } else {
                                    spawn.mapVertex(x + 775, y + -260, hexagon);
                                    spawn.mapVertex(x + 1225, y + -260, hexagon);

                                    spawn.mapVertex(x + 550, y + -650, hexagon);
                                    spawn.mapVertex(x + 1000, y + -650, hexagon);
                                    spawn.mapVertex(x + 1450, y + -650, hexagon);

                                    spawn.mapVertex(x + 775, y + -1040, hexagon);
                                    spawn.mapVertex(x + 1225, y + -1040, hexagon);

                                    spawn.mapVertex(x + 550, y + -1430, hexagon);
                                    spawn.mapVertex(x + 1000, y + -1430, hexagon);
                                    spawn.mapVertex(x + 1450, y + -1430, hexagon);

                                    spawn.mapVertex(x + 775, y + -1820, hexagon);
                                    spawn.mapVertex(x + 1225, y + -1820, hexagon);
                                    const numberOfMapElementsAdded = 12
                                    for (let i = 0; i < numberOfMapElementsAdded; i++) addMapToLevelInProgress(map[map.length - 1 - i])

                                    spawn.randomMob(x + 225, y + -1025, mobSpawnChance);
                                    spawn.randomMob(x + 250, y + -1025, mobSpawnChance);
                                    spawn.randomMob(x + 200, y + -675, mobSpawnChance);
                                    spawn.randomMob(x + 225, y + -200, mobSpawnChance);
                                    spawn.randomMob(x + 1750, y + -1075, mobSpawnChance);
                                    spawn.randomMob(x + 1700, y + -650, mobSpawnChance);
                                    spawn.randomMob(x + 1725, y + -650, mobSpawnChance);
                                    spawn.randomMob(x + 1675, y + -175, mobSpawnChance);
                                }
                                simulation.draw.setPaths() //update map graphics
                                spawn.randomGroup(x + 300, y + -2200);
                                spawn.randomGroup(x + 1625, y + -2200);
                                spawn.randomLevelBoss(x + 700, y + -2300);
                                spawn.secondaryBossChance(x + 1250, y + -2300)
                            }
                        }
                    }
                )
            },
            (x = offset.x, y = offset.y) => {
                // const toggle = level.toggle(x + 950, y + 0, false, true) //    toggle(x, y, isOn = false, isLockOn = false) {
                // toggle.isAddedElements = false
                const button = level.button(x + 935, y + 0)
                button.isUp = true
                //left ledges
                spawn.mapVertex(x + 5, y + -1868, "0 0  0 -250  125 -250");
                spawn.mapVertex(x + 5, y + -1318, "0 0  0 -250  125 -250"); //door
                spawn.mapVertex(x + 5, y + -768, "0 0  0 -250  125 -250");
                // right ledges
                spawn.mapVertex(x + 2000, y + -1868, "0 0  0 -250  -125 -250");
                spawn.mapVertex(x + 2000, y + -1318, "0 0  0 -250  -125 -250"); //door
                spawn.mapVertex(x + 2000, y + -768, "0 0  0 -250  -125 -250");

                doCustomTopLayer.push(
                    () => {
                        button.draw();
                        if (button.isUp) {
                            button.query();
                            if (!button.isUp) {
                                addMapToLevelInProgress = (who) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
                                    who.collisionFilter.category = cat.map;
                                    who.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                                    Matter.Body.setStatic(who, true); //make static
                                    Composite.add(engine.world, who); //add to world
                                }
                                //right side hexagons
                                let r = 300
                                let hexagon = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0     ${r * Math.cos(2.0944)} ${r * Math.sin(2.0944)}      ${r * Math.cos(1.0472)} ${r * Math.sin(1.0472)}  `
                                spawn.mapVertex(x + 1640, y + -365, hexagon);
                                // r = 275
                                // let hexagonHalf = `${r} 0   ${r*Math.cos(5.236)} ${r*Math.sin(5.236)}    ${r*Math.cos(4.189)} ${r*Math.sin(4.189)}     ${-r} 0 `
                                // spawn.mapVertex(x + 2300, y + -75, hexagonHalf);
                                r = 150
                                const hexagon150 = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0     ${r * Math.cos(2.0944)} ${r * Math.sin(2.0944)}      ${r * Math.cos(1.0472)} ${r * Math.sin(1.0472)}  `
                                // spawn.mapVertex(x + 1750, y + -550, hexagon150);
                                spawn.mapVertex(x + 1750, y + -1100, hexagon150);
                                spawn.mapVertex(x + 1750, y + -1650, hexagon150);
                                spawn.mapVertex(x + 1750, y + -2200, hexagon150);

                                //left side
                                r = 350
                                let hexagonHalf = `${r} 0   ${r * Math.cos(5.236)} ${r * Math.sin(5.236)}    ${r * Math.cos(4.189)} ${r * Math.sin(4.189)}     ${-r} 0 `
                                spawn.mapVertex(x + 425, y + -90, hexagonHalf);

                                spawn.mapVertex(x + 850, y + -500, hexagon150);
                                spawn.mapVertex(x + 550, y + -850, hexagon150);
                                spawn.mapVertex(x + 250, y + -1200, hexagon150);
                                spawn.mapVertex(x + 250, y + -1700, hexagon150);
                                spawn.mapVertex(x + 725, y + -1950, hexagon150);
                                spawn.mapVertex(x + 1200, y + -2200, hexagon150);
                                const numberOfMapElementsAdded = 11
                                for (let i = 0; i < numberOfMapElementsAdded; i++) addMapToLevelInProgress(map[map.length - 1 - i])

                                spawn.randomMob(x + 1050, y + -1500, mobSpawnChance);
                                spawn.randomMob(x + 1075, y + -1500, mobSpawnChance);
                                spawn.randomMob(x + 325, y + -550, mobSpawnChance);
                                spawn.randomMob(x + 800, y + -925, mobSpawnChance);
                                spawn.randomMob(x + 1400, y + -1250, mobSpawnChance);
                                spawn.randomMob(x + 1325, y + -1725, mobSpawnChance);
                                spawn.randomMob(x + 1350, y + -1725, mobSpawnChance);
                                spawn.randomMob(x + 575, y + -1375, mobSpawnChance);
                                spawn.randomMob(x + 225, y + -2275, mobSpawnChance);
                                spawn.randomMob(x + 875, y + -2450, mobSpawnChance);
                                spawn.randomMob(x + 1550, y + -2525, mobSpawnChance);
                                spawn.randomMob(x + 1525, y + -2525, mobSpawnChance);
                                spawn.randomLevelBoss(x + 1075, y + -1500);
                                spawn.secondaryBossChance(x + 1200, y + -1000)
                                simulation.draw.setPaths() //update map graphics
                            }
                        }
                    }
                )
            },
        ]
        //pick which type of room spawns
        enter = enterOptions[Math.floor(Math.random() * enterOptions.length)];
        exit = exitOptions[Math.floor(Math.random() * exitOptions.length)];
        empty = emptyOptions[Math.floor(Math.random() * emptyOptions.length)];
        loot = lootOptions[Math.floor(Math.random() * lootOptions.length)];
        upDown = upDownOptions[Math.floor(Math.random() * upDownOptions.length)];
        // upDown = upDownOptions[0] //controls what level spawns for map designing building //********************************* DO   !NOT!  RUN THIS LINE IN THE FINAL VERSION ***************************************
        //3x2:  4 short rooms (3000x1500),  1 double tall room (3000x3000)
        //rooms
        let rooms = ["exit", "loot", "enter", "empty"]
        rooms.sort(() => Math.random() - 0.5);
        //look... you and I both know there is a better way to do this, but it works so I'm gonna focus on other things
        while ( //makes sure that the exit and entrance aren't both on the same floor
            (rooms[0] === "enter" && rooms[2] === "exit") ||
            (rooms[2] === "enter" && rooms[0] === "exit") ||
            (rooms[1] === "enter" && rooms[3] === "exit") ||
            (rooms[3] === "enter" && rooms[1] === "exit")
        ) rooms.sort(() => Math.random() - 0.5);
        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i] === "enter") rooms[i] = enter
            if (rooms[i] === "exit") rooms[i] = exit
            if (rooms[i] === "empty") rooms[i] = empty
            if (rooms[i] === "loot") rooms[i] = loot
        }
        // rooms = [enter, exit, loot, empty, ] //controls what level spawns for map designing building //********************************* DO   !NOT!  RUN THIS LINE IN THE FINAL VERSION ***************************************

        outline = (isLower = true) => {
            spawn.mapRect(offset.x - 100, offset.y - 1400, 2100, 100); //ceiling
            if (isLower) spawn.mapRect(offset.x - 100, offset.y, 2200, 100); //only draw floor if on the lower level
            if (!isDoorLeft) spawn.mapRect(offset.x - 100, offset.y - 1400, 100, 1500); //left wall
            if (isDoorRight) { //if door only add wall on right side
                spawn.mapRect(offset.x + 2000, offset.y - 1400, 100, 1225); //right wall
                spawn.mapRect(offset.x + 2000, offset.y - 10, 100, 20); //right doorstep
                const doorWidth = 15 + Math.floor(100 * Math.random() * Math.random())
                spawn.bodyRect(offset.x + 2050 - doorWidth / 2, offset.y - 175, doorWidth, 165); //block door
            } else {
                spawn.mapRect(offset.x + 2000, offset.y - 1400, 100, 1500); //right wall
            }
        }
        outlineUpDown = () => {
            spawn.mapRect(offset.x - 100, offset.y + 0, 2100, 100); //floor
            spawn.mapRect(offset.x - 100, offset.y - 2800, 2100, 100); //ceiling
            if (!isDoorLeft) spawn.mapRect(offset.x - 100, offset.y - 2800, 100, 2900); //left wall
            if (isDoorRight) { //if door only add wall on right side
                //upper door
                spawn.mapRect(offset.x + 2000, offset.y - 2800, 100, 1225); //right wall
                spawn.mapRect(offset.x + 2000, offset.y - 1410, 100, 20); //right doorstep
                const doorWidth = 15 + Math.floor(100 * Math.random() * Math.random())
                spawn.bodyRect(offset.x + 2050 - doorWidth / 2, offset.y - 1575, doorWidth, 165); //block door
                //lower door
                spawn.mapRect(offset.x + 2000, offset.y - 1400, 100, 1225); //right wall
                spawn.mapRect(offset.x + 2000, offset.y - 10, 100, 20); //right doorstep
                const doorWidth2 = 15 + Math.floor(100 * Math.random() * Math.random())
                spawn.bodyRect(offset.x + 2050 - doorWidth2 / 2, offset.y - 175, doorWidth2, 165); //block door
            } else {
                spawn.mapRect(offset.x + 2000, offset.y - 2800, 100, 2900); //right wall
            }
        }

        let columns = [
            () => {
                offset.y = 0
                outlineUpDown()
                upDown()
            },
            () => {
                offset.y = 0
                outline()
                rooms[0]()

                offset.y = -1400
                outline(false)
                rooms[1]()
            },
            () => {
                offset.y = 0
                outline()
                rooms[2]()

                offset.y = -1400
                outline(false)
                rooms[3]()
            },
        ]
        columns.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                isDoorLeft = false
                isDoorRight = true
            } else if (i === 1) {
                isDoorLeft = true
                isDoorRight = true
            } else {
                isDoorLeft = true
                isDoorRight = false
            }
            offset.x = i * 2100
            columns[i]()
        }
        level.custom = () => {
            for (let i = 0, len = doCustom.length; i < len; i++) doCustom[i]() //runs all the active code from each room
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            for (let i = 0, len = doCustomTopLayer.length; i < len; i++) doCustomTopLayer[i]() //runs all the active code from each room
        };
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    pavilion() {
        level.announceMobTypes()
        level.fallMode = "start";
        const vanish = []
        level.exit.x = -850;
        level.exit.y = -1485;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 25);
        level.setPosToSpawn(-900, 225); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#dcdcde";
        // spawn.debris(-150, -775, 1425, 3); //16 debris per level
        // spawn.debris(1525, -25, 950, 3); //16 debris per level
        // spawn.debris(-650, -2100, 575, 2); //16 debris per level
        powerUps.chooseRandomPowerUp(2075, -1525);
        powerUps.chooseRandomPowerUp(2550, -1825);
        powerUps.chooseRandomPowerUp(1975, 250);
        //bottom floor
        //entrance
        spawn.mapRect(-200, -750, 1500, 100);
        // spawn.mapRect(-575, 0, 2150, 500);
        spawn.mapRect(-575, 0, 2150, 165);
        const mover = level.mover(-525, 270, 2050, 75, 15 * (simulation.isHorizontalFlipped ? -1 : 1))
        spawn.bodyRect(-1050, -75, 75, 75);
        spawn.bodyRect(-573, 170, 30, 105);

        // spawn.mapRect(-1275, 275, 875, 225);
        spawn.mapRect(-1300, 275, 4025, 3300);
        // spawn.mapRect(-1275, 275, 3975, 225);
        spawn.mapRect(-1050, 0, 325, 50);
        spawn.mapRect(-775, 0, 50, 140);
        vanish.push(level.vanish(-725, 13, 150, 25))
        spawn.mapRect(-200, -750, 100, 600);
        vanish.push(level.vanish(-525, -150, 425, 150))
        vanish.push(level.vanish(-475, -300, 275, 150))
        vanish.push(level.vanish(-425, -450, 225, 150))
        vanish.push(level.vanish(-375, -600, 175, 150))
        vanish.push(level.vanish(-325, -750, 125, 150))
        spawn.mapRect(2475, -1800, 250, 2300);
        spawn.mapRect(1200, -750, 100, 450);
        spawn.mapRect(1200, -375, 250, 75);
        powerUps.spawnStartingPowerUps(550, -100);
        spawn.mapRect(125, -12, 850, 50);
        spawn.mapRect(175, -25, 750, 50);
        spawn.bodyRect(1350, -175, 150, 175, 0.5);
        spawn.bodyRect(1350, -600, 125, 225, 0.2);

        spawn.bodyRect(1575, 50, 50, 225);
        vanish.push(level.vanish(1900, -25, 325, 25))
        vanish.push(level.vanish(1925, -375, 275, 25))
        vanish.push(level.vanish(1950, -725, 225, 25))
        vanish.push(level.vanish(1950, -1075, 225, 25))
        spawn.mapRect(1950, -1500, 225, 25);
        vanish.push(level.vanish(1350, -1075, 225, 25))
        vanish.push(level.vanish(1637, -1300, 225, 25))

        //middle floor
        spawn.bodyRect(215, -1175, 100, 100, 0.3);
        spawn.mapRect(-1300, -1800, 250, 2300);
        if (Math.random() < 0.5) {
            spawn.mapRect(500, -1350, 525, 425);
            spawn.mapRect(25, -1050, 300, 198);
        } else {
            spawn.mapRect(500, -1350, 525, 497);
            spawn.mapRect(25, -1050, 300, 150);
        }
        spawn.bodyRect(225, -850, 50, 100, 0.4);
        // spawn.mapRect(600, -1800, 325, 225);
        spawn.mapRect(650, -1800, 225, 225);
        vanish.push(level.vanish(600, -1575, 100, 225))
        vanish.push(level.vanish(825, -1575, 100, 225))

        spawn.bodyRect(1050, -1825, 250, 20, 0.2);

        vanish.push(level.vanish(1125, -1800, 625, 25))
        vanish.push(level.vanish(-50, -1800, 450, 25))
        //exit
        spawn.mapRect(-575, -1800, 50, 200);
        spawn.mapRect(-1050, -1800, 525, 75);
        spawn.mapRect(-1050, -1450, 700, 75);

        spawn.randomMob(-1175, -1975, -0.4);
        spawn.randomMob(275, -1500, -0.3);
        spawn.randomMob(700, -1875, -0.2);
        spawn.randomMob(2000, -800, -0.2);
        spawn.randomMob(2600, -1850, 0);
        spawn.randomMob(1425, -525, 0.1);
        spawn.randomMob(2025, -1600, 0.3);
        spawn.randomMob(1625, -1875, 0.3);
        spawn.randomMob(-150, -1975, 0.4);
        spawn.randomSmallMob(900, -825);
        spawn.randomSmallMob(1050, -50);
        spawn.randomGroup(750, -2150, -0.8)
        spawn.randomLevelBoss(2050, -2025)
        spawn.secondaryBossChance(100, -1500)
        //spawn.randomHigherTierMob(1232, -803)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            level.setPosToSpawn(900, 225); //normal spawn
            level.custom = () => {
                ctx.fillStyle = "rgba(0, 10, 30, 0.04)"//"#d0d3d9"
                ctx.fillRect(-2500, -1800, 3575, 2100);
                ctx.fillStyle = "#c0c3c9"
                ctx.fillRect(-2075, -1475, 25, 1800);
                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(550, -1800, 525, 350)

                level.exit.drawAndCheck();
                level.enter.draw();
                mover.push();
            };
            level.customTopLayer = () => {
                mover.draw();
                //shadow
                ctx.fillStyle = "rgba(0,10,30,0.1)"
                ctx.fillRect(-1450, -300, 150, 325);
                ctx.fillRect(-1300, -650, 1500, 650)
                ctx.fillRect(725, 50, 325, 225)
                ctx.fillRect(-325, -950, 300, 225)
                ctx.fillRect(-1025, -1000, 525, 275);
                ctx.fillRect(-875, -1600, 225, 275);
                ctx.fillStyle = "rgba(68,68,68,0.93)"
                ctx.fillRect(-1575, 150, 2150, 150);
                for (let i = 0, len = vanish.length; i < len; i++) vanish[i].query()
            };

        } else {
            level.custom = () => {
                ctx.fillStyle = "rgba(0, 10, 30, 0.04)"//"#d0d3d9"
                ctx.fillRect(-1075, -1800, 3575, 2100);
                ctx.fillStyle = "#c0c3c9"
                ctx.fillRect(2050, -1475, 25, 1800);
                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(-1050, -1800, 525, 350)

                level.exit.drawAndCheck();
                level.enter.draw();
                mover.push();
            };
            level.customTopLayer = () => {
                mover.draw();
                //shadow
                ctx.fillStyle = "rgba(0,10,30,0.1)"
                ctx.fillRect(1300, -300, 150, 325);
                ctx.fillRect(-200, -675, 1500, 700)
                ctx.fillRect(500, -950, 525, 225);
                ctx.fillRect(650, -1600, 225, 275);
                ctx.fillRect(-1050, 50, 325, 225)
                ctx.fillRect(25, -950, 300, 225)
                ctx.fillStyle = "rgba(68,68,68,0.93)"
                ctx.fillRect(-575, 150, 2150, 150);
                for (let i = 0, len = vanish.length; i < len; i++) vanish[i].query()
            };
        }
    },
    testChamber() {
        level.announceMobTypes()
        level.setPosToSpawn(0, -50); //lower start
        level.exit.y = level.enter.y - 550;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = level.enter.x;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 2200
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d5d5";
        color.map = "#444"
        spawn.mapRect(0, -1955, 175, 30);
        const removeIndex1 = map.length - 1 //so much work to catch blocks caught at the bottom of the vertical portals
        spawn.mapRect(1225, -1955, 175, 30);
        const removeIndex2 = map.length - 1 //so much work to catch blocks caught at the bottom of the vertical portals
        let portal, portal2, portal3
        // const hazard = level.hazard((simulation.isHorizontalFlipped ? -350 - 700 : 350), -2025, 700, 10, 0.4) //laser
        // const hazard2 = level.hazard((simulation.isHorizontalFlipped ? -1775 - 150 : 1775), -2550, 150, 10, 0.4) //laser
        // const hazard = level.laser({ x: (simulation.isHorizontalFlipped ? -350 - 700 : 350), y: -2025 }, { x: 700 + (simulation.isHorizontalFlipped ? -350 - 700 : 350), y: -2025 }) ////x, y, width, height, damage = 0.002)
        // const hazard2 = level.laser({ x: 145 + (simulation.isHorizontalFlipped ? -1775 - 150 : 1775), y: -2545 }, { x: (simulation.isHorizontalFlipped ? -1775 - 150 : 1775), y: -2545 }) ////x, y, width, height, damage = 0.002)
        let hazard, hazard2
        if (simulation.isHorizontalFlipped) {
            hazard = level.laser({ x: -360, y: -2020 }, { x: -1050, y: -2020 }) ////x, y, width, height, damage = 0.002)
            hazard2 = level.laser({ x: - 1920, y: -2545 }, { x: -1775, y: -2545 }) ////x, y, width, height, damage = 0.002)
        } else {
            hazard = level.laser({ x: 360, y: -2020 }, { x: 700 + 360, y: -2020 }) ////x, y, width, height, damage = 0.002)
            hazard2 = level.laser({ x: 145 + 1775, y: -2545 }, { x: 1775, y: -2545 }) ////x, y, width, height, damage = 0.002)
        }
        spawn.mapRect(340, -2032.5, 20, 25); //laser nose
        spawn.mapRect(1920, -2557.5, 20, 25); //laser nose
        const button = level.button(2100, -2600)
        const buttonDoor = level.button(600, -550)
        const door = level.door(312, -750, 25, 190, 185)

        level.custom = () => {
            if (!(m.cycle % 60)) { //so much work to catch blocks caught at the bottom of the vertical portals
                let touching = Matter.Query.collides(map[removeIndex1], body)
                if (touching.length) {
                    Matter.Composite.remove(engine.world, touching[0].bodyB);
                    for (let i = 0, len = body.length; i < len; i++) {
                        if (body[i].id === touching[0].bodyB.id) {
                            body.splice(i, 1);
                            break
                        }
                    }
                }
                touching = Matter.Query.collides(map[removeIndex2], body)
                if (touching.length) {
                    Matter.Composite.remove(engine.world, touching[0].bodyB);
                    for (let i = 0, len = body.length; i < len; i++) {
                        if (body[i].id === touching[0].bodyB.id) {
                            body.splice(i, 1);
                            break
                        }
                    }
                }
            }

            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();

            portal[2].query()
            portal[3].query()
            portal2[2].query()
            portal2[3].query()
            portal3[2].query()
            portal3[3].query()
            button.query();
            button.draw();

            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(-300, -1000, 650, 500)
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            door.draw();
            if (!button.isUp) {
                hazard.query();
                hazard2.query();
            }

            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
            portal3[0].draw();
            portal3[1].draw();
            portal3[2].draw();
            portal3[3].draw();
        };
        powerUps.spawnStartingPowerUps(1875, -3075);

        const powerUpPos = [{ //no debris on this level but 2 random spawn instead
            x: -150,
            y: -1775
        }, {
            x: 2400,
            y: -2650
        }, {
            x: -175,
            y: -1375
        }, {
            x: 1325,
            y: -150
        }];
        powerUpPos.sort(() => Math.random() - 0.5);
        powerUps.chooseRandomPowerUp(powerUpPos[0].x, powerUpPos[0].y);
        powerUps.chooseRandomPowerUp(powerUpPos[1].x, powerUpPos[1].y);
        //outer wall
        spawn.mapRect(2500, -3700, 1200, 3800); //right map wall
        spawn.mapRect(-1400, -3800, 1100, 3900); //left map wall
        spawn.mapRect(-1400, -4800, 5100, 1200); //map ceiling
        spawn.mapRect(-1400, 0, 5100, 1200); //floor
        //lower entrance /exit
        spawn.mapRect(300, -375, 50, 225);
        spawn.bodyRect(312, -150, 25, 140);
        spawn.mapRect(300, -10, 50, 50);
        spawn.mapVertex(1555, 0, "625 0   75 0   200 -100   500 -100"); //entrance ramp
        //upper entrance / exit
        spawn.mapRect(-400, -1050, 750, 50);
        spawn.mapRect(300, -1050, 50, 300);
        // spawn.bodyRect(312, -750, 25, 190);
        spawn.mapRect(300, -560, 50, 50);
        spawn.bodyRect(750, -725, 125, 125);
        spawn.mapRect(1150, -1050, 250, 575);
        spawn.mapRect(1725, -550, 50, 200); //walls around portal 3
        spawn.mapRect(1925, -550, 500, 200);
        spawn.mapRect(1750, -390, 200, 40);
        spawn.mapRect(-400, -550, 1800, 200);
        spawn.mapRect(-200, -1700, 150, 25); //platform above exit room
        spawn.mapRect(-200, -1325, 350, 25);
        //portal 3 angled
        spawn.mapRect(2425, -450, 100, 100);
        //portal 1 bottom
        spawn.mapRect(2290, -12, 375, 100);
        spawn.mapRect(2350, -24, 375, 100);
        spawn.mapRect(2410, -36, 375, 100);
        //portal 1 top
        spawn.mapRect(2290, -3012, 375, 50);
        spawn.mapRect(2350, -3024, 375, 50);
        spawn.mapRect(2410, -3036, 375, 50);
        spawn.mapRect(1400, -3000, 1300, 50); //floor
        spawn.mapRect(1750, -3050, 250, 75);
        spawn.mapRect(1400, -3625, 50, 200);
        spawn.mapRect(350, -3625, 50, 225);
        spawn.mapRect(350, -3260, 50, 60);
        spawn.mapRect(200, -3250, 1240, 50);
        spawn.mapRect(1400, -3260, 50, 310);
        spawn.bodyRect(1412, -3425, 25, 165);
        spawn.mapRect(-150, -2925, 150, 25);
        //portal 2
        spawn.mapRect(-300, -2600, 300, 675); //left platform
        spawn.mapRect(1400, -2600, 375, 675); //right platform
        spawn.mapRect(1925, -2600, 775, 675); //far right platform
        spawn.bodyRect(2130, -2660, 50, 50); //button's block
        spawn.mapRect(150, -2100, 200, 175);
        spawn.mapRect(1050, -2100, 200, 175);
        //mobs
        spawn.randomMob(1075, -3500, -0.3);
        spawn.randomMob(2175, -700, -0.2);
        spawn.randomMob(-75, -850, -0.1);
        spawn.randomMob(550, -3400, 0);
        spawn.randomMob(0, -1175, 0.5);
        spawn.randomMob(-75, -1150, 0.5);
        spawn.randomMob(1075, -625, 0.5);
        spawn.randomMob(800, -3400, -0.3);
        spawn.randomMob(1225, -3375, -0.2);
        spawn.randomMob(1200, -1125, -0.1);
        spawn.randomMob(2050, -950, 0.5);
        spawn.randomMob(2300, -2775, -0.5);
        spawn.randomMob(600, -925, -0.5);
        spawn.randomMob(1550, -2750, -0.5);
        spawn.randomMob(1350, -1150, -0.5);
        spawn.randomMob(-75, -1475, 0);

        if (Math.random() < 0.5) {
            spawn.randomLevelBoss(700, -1550);
        } else {
            spawn.randomLevelBoss(675, -2775);
        }

        spawn.secondaryBossChance(1925, -1250)
        //spawn.randomHigherTierMob(87, -1421)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            // level.setPosToSpawn(0, -50); //-x  // no need since 0
            button.min.x = -button.min.x - 126 // flip the button horizontally
            button.max.x = -button.max.x + 126 // flip the button horizontally
            buttonDoor.min.x = -buttonDoor.min.x - 126 // flip the button horizontally
            buttonDoor.max.x = -buttonDoor.max.x + 126 // flip the button horizontally

            //this makes the hazard draw, but not collide for reasons I don't understand
            //so don't use it, instead just call the hazard differently based on this flip flag
            // hazard.min.x = -hazard.min.x - hazard.width //-x-width
            // hazard.max.x = -hazard.max.x - hazard.width //-x-width
            // hazard2.min.x = -hazard2.min.x - hazard2.width //-x-width
            // hazard2.max.x = -hazard2.max.x - hazard2.width //-x-width
            portal = level.portal({
                x: -2475,
                y: -140
            }, 2 * Math.PI, { //right
                x: -2475,
                y: -3140
            }, 2 * Math.PI) //right

            portal2 = level.portal({
                x: -75,
                y: -2150
            }, -Math.PI / 2, { //up
                x: -1325,
                y: -2150
            }, -Math.PI / 2) //up

            portal3 = level.portal({
                x: -1850,
                y: -585
            }, -Math.PI / 2, { //up
                x: -2425,
                y: -600
            }, -1 * Math.PI / 3) //up left

            // level.custom = () => { };
            // level.customTopLayer = () => {};

        } else {
            portal = level.portal({
                x: 2475,
                y: -140
            }, Math.PI, { //left
                x: 2475,
                y: -3140
            }, Math.PI) //left
            portal2 = level.portal({
                x: 75,
                y: -2150
            }, -Math.PI / 2, { //up
                x: 1325,
                y: -2150
            }, -Math.PI / 2) //up
            portal3 = level.portal({
                x: 1850,
                y: -585
            }, -Math.PI / 2, { //up
                x: 2425,
                y: -600
            }, -2 * Math.PI / 3) //up left
        }

    },
    interferometer() {
        level.isVerticalFLipLevel = true
        mobs.maxMobBody = 20 //normally 40, but set to 10 to avoid too much clutter
        simulation.fallHeight = 4000
        level.announceMobTypes()
        level.setPosToSpawn(-1825, 1950); //lower start
        level.exit.x = -1875
        level.exit.y = 1355
        level.defaultZoom = 2300
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d5d5";
        color.map = "#444"
        powerUps.chooseRandomPowerUp(-1550, 300);
        powerUps.chooseRandomPowerUp(200, 50);
        powerUps.chooseRandomPowerUp(-975, -1475);
        powerUps.chooseRandomPowerUp(2150, -750);
        powerUps.chooseRandomPowerUp(1850, 1925);

        let buttons = []
        let lasers = []
        let balance = []
        level.isFlipped = false;
        let isFlipping = false;
        let isSpawned = false
        const flipAnimationCycles = 120

        let elevator = body[body.length] = Bodies.rectangle(800, 500, 300, 50, {
            collisionFilter: {
                category: cat.body, //cat.map,
                mask: cat.player | cat.body | cat.bullet | cat.mob | cat.mobBullet //| cat.powerUp
            },
            density: 0.1,
            inertia: Infinity, //prevents rotation
            isNotHoldable: true,
            friction: 1,
            frictionStatic: 1,
            restitution: 0,
            frictionAir: 1,
            classType: "body",
            holdX: 1762,
            maxHeight: -1580,
            minHeight: 90,
            verticalForce: 0.02,
            isUp: false,
            drag: 0.01,
            move() {
                this.force.y -= this.mass * simulation.g; //undo gravity
                if (!m.isTimeDilated) {
                    if (level.isFlipped) {
                        ctx.fillStyle = "#ccc"
                        ctx.fillRect(this.holdX, -this.maxHeight, 5, this.maxHeight - this.minHeight) //draw path

                        if (elevator.isUp) {
                            elevator.force.y += elevator.verticalForce * elevator.mass
                            if (elevator.position.y > -elevator.maxHeight) {
                                elevator.isUp = false
                                Matter.Body.setPosition(elevator, { x: elevator.holdX, y: -elevator.maxHeight });
                                Matter.Body.setVelocity(elevator, { x: 0, y: 0 });
                            }
                        } else {
                            elevator.force.y -= (elevator.verticalForce) * elevator.mass
                            if (elevator.position.y < -elevator.minHeight) {
                                elevator.isUp = true
                                Matter.Body.setPosition(elevator, { x: elevator.holdX, y: -elevator.minHeight });
                                Matter.Body.setVelocity(elevator, { x: 0, y: 0 });
                            }
                        }
                        //vertical position limits 
                        if (this.position.y > -elevator.maxHeight) {
                            Matter.Body.setPosition(elevator, { x: elevator.holdX, y: -elevator.maxHeight });
                        } else if (this.position.y < -elevator.minHeight) {
                            Matter.Body.setPosition(elevator, { x: elevator.holdX, y: -elevator.minHeight });
                        }
                    } else {
                        ctx.fillStyle = "#ccc"
                        ctx.fillRect(this.holdX, this.maxHeight, 5, this.minHeight - this.maxHeight) //draw path

                        if (elevator.isUp) {
                            elevator.force.y -= elevator.verticalForce * elevator.mass
                            if (elevator.position.y < elevator.maxHeight) {
                                elevator.isUp = false
                                Matter.Body.setPosition(elevator, { x: elevator.holdX, y: elevator.maxHeight });
                                Matter.Body.setVelocity(elevator, { x: 0, y: 0 });
                            }
                        } else {
                            elevator.force.y += (elevator.verticalForce) * elevator.mass
                            if (elevator.position.y > elevator.minHeight) {
                                elevator.isUp = true
                                Matter.Body.setPosition(elevator, { x: elevator.holdX, y: elevator.minHeight });
                                Matter.Body.setVelocity(elevator, { x: 0, y: 0 });
                            }
                        }
                        //vertical position limits 
                        if (this.position.y < elevator.maxHeight) {
                            Matter.Body.setPosition(elevator, { x: elevator.holdX, y: elevator.maxHeight });
                        } else if (this.position.y > elevator.minHeight) {
                            Matter.Body.setPosition(elevator, { x: elevator.holdX, y: elevator.minHeight });
                        }
                    }
                }
                Matter.Body.setVelocity(elevator, { x: 0, y: elevator.velocity.y * this.drag }); //zero horizontal velocity and drag
                Matter.Body.setPosition(elevator, { x: elevator.holdX, y: elevator.position.y }); //hold horizontal position
            },
        });
        Composite.add(engine.world, elevator); //add to world

        let buildMapOutline = function () {
            //boxes center on zero,zero with deep walls to hide background
            spawn.mapRect(2225, -2000, 1775, 4000); //right map wall
            spawn.mapRect(-4000, -2000, 2000, 4000); //left map wall
            spawn.mapRect(-4000, -5000, 8000, 3000); //map ceiling
            spawn.mapRect(-4000, 2000, 8000, 3000); //floor
        }
        let buildNormalMap = function () {
            buttons.push(level.button(-1895, -1600, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons[buttons.length - 1].isUp = false
            spawn.mapRect(-1675, -2025, 50, 250);

            simulation.ephemera.push({
                name: "buttons up",
                count: flipAnimationCycles + 30,
                do() {
                    this.count--
                    if (this.count < 0) {
                        for (let i = 0; i < buttons.length; i++) buttons[i].isUp = true
                        simulation.removeEphemera(this.name);
                        isFlipping = false
                    }
                },
            })

            lasers.push(level.laser({ x: -1100, y: 1990 }, { x: -1100, y: -2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-1112, 1990, 25, 25); //laser entrance
            lasers.push(level.laser({ x: -600, y: 1990 }, { x: -600, y: -2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-612, 1990, 25, 25); //laser entrance
            lasers.push(level.laser({ x: -100, y: 1990 }, { x: -100, y: -2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-112, 1990, 25, 25); //laser entrance

            balance.push(level.rotor(-1250, 1755, 400, 25, 0.01, 0, 0.5)) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            balance.push(level.rotor(-750, 1755, 400, 25, 0.01, Math.PI / 2, 0.5))
            balance.push(level.rotor(-275, 1675, 550, 32, 0.01, 0, 0.5))

            lasers.push(level.laser({ x: 1610, y: -850 }, { x: -1625, y: -850 })) ////x, y, width, height, damage = 0.002)
            // spawn.mapRect(1980, -862, 25, 25); //laser entrance
            // balance.push(level.rotor(1000, -910, 550, 32, 0.01, 0, 0.5))

            //left side
            //level entrance
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
            spawn.mapRect(level.exit.x, level.exit.y - 40, 100, 20);
            spawn.mapRect(-2025, 1650, 400, 50);
            spawn.mapRect(-2100, -1600, 475, 2925);
            spawn.mapRect(-1675, 1500, 50, 325);

            // spawn.mapRect(-1625, 365, 500, 950);
            // spawn.mapRect(-1075, 390, 450, 900);
            // spawn.mapRect(-575, 415, 500, 850);

            spawn.mapVertex(-1375, 835, "-250 -475  0 -500  250 -475   250 475  -250 475");
            spawn.mapVertex(-850, 840, "-225 -475  0 -500  225 -475   225 475  -225 475");
            spawn.mapVertex(-350, 840, "-225 -475  0 -500  225 -475   225 475  -225 475");

            //lower right side
            //far right wall ledges
            spawn.mapRect(1925, -1700, 400, 200);
            spawn.mapRect(1925, -1200, 400, 200);
            spawn.mapRect(1925, -700, 400, 200);
            spawn.mapRect(1925, -200, 400, 200);
            spawn.mapRect(1925, 300, 400, 200);
            spawn.mapRect(1925, 800, 400, 200);
            spawn.mapRect(1925, 1300, 400, 200);

            spawn.mapRect(1250, 1650, 500, 25);
            spawn.mapRect(1300, 1125, 400, 25);
            spawn.mapRect(1350, 600, 300, 25);
            spawn.mapRect(1400, 75, 200, 25);

            spawn.mapRect(650, 1287, 475, 50);
            spawn.mapRect(650, 800, 500, 125);
            spawn.mapRect(650, 150, 500, 225);
            spawn.mapRect(350, 1300, 800, 375);
            spawn.mapRect(350, 950, 150, 400);
            spawn.mapRect(-25, 950, 525, 100);
            spawn.mapRect(-75, 525, 575, 200);
            spawn.mapRect(-75, 75, 575, 200);
            spawn.mapRect(475, 1987, 550, 50);

            //ceiling zone
            spawn.mapRect(1200, -1600, 400, 25);
            spawn.mapRect(-75, -1725, 1075, 25);
            spawn.mapRect(-575, -1625, 450, 25);
            spawn.mapRect(-1075, -1850, 450, 25);
            spawn.mapRect(-1075, -1425, 450, 25);
            spawn.mapRect(-1675, -1588, 550, 25);
        }
        let buildVerticalFLippedMap = function () { // flip Y with this -> spawn.mapRect(x, -y - h, w, h);
            buttons.push(level.button(-1895, 1600, 126, true, true, "hsl(330, 100%, 50%)"))
            buttons[buttons.length - 1].isUp = false
            spawn.mapRect(-1675, 2025 - 250, 50, 250);

            simulation.ephemera.push({
                name: "buttons up",
                count: flipAnimationCycles + 30,
                do() {
                    this.count--
                    if (this.count < 0) {
                        for (let i = 0; i < buttons.length; i++) buttons[i].isUp = true
                        simulation.removeEphemera(this.name);
                        isFlipping = false
                    }
                },
            })

            lasers.push(level.laser({ x: -1100, y: -1990 }, { x: -1100, y: 2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-1112, -1990 - 25, 25, 25); //laser entrance
            lasers.push(level.laser({ x: -600, y: -1990 }, { x: -600, y: 2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-612, -1990 - 25, 25, 25); //laser entrance
            lasers.push(level.laser({ x: -100, y: -1990 }, { x: -100, y: 2000 })) ////x, y, width, height, damage = 0.002)
            spawn.mapRect(-112, -1990 - 25, 25, 25); //laser entrance

            balance.push(level.rotor(-1250, -1755 - 25, 400, 25, 0.01, 0, 0.5)) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            balance.push(level.rotor(-750, -1755 - 25, 400, 25, 0.01, Math.PI / 2, 0.5))
            balance.push(level.rotor(-250, -1675 - 32, 500, 32, 0.01, 0, 0.5))

            lasers.push(level.laser({ x: 1610, y: 850 }, { x: -1625, y: 850 })) ////x, y, width, height, damage = 0.002)
            // spawn.mapRect(1980, 862 - 25, 25, 25); //laser entrance
            // balance.push(level.rotor(1000, 910 - 32, 550, 32, 0.01, 0, 0.5))

            //left side
            //level entrance
            spawn.mapRect(level.enter.x, level.enter.y - 20 - 20, 100, 20);
            spawn.mapRect(level.exit.x, level.exit.y + 40 - 20, 100, 20);
            spawn.mapRect(-2025, -1650 - 50, 400, 50);
            spawn.mapRect(-2100, +1600 - 2925, 475, 2925);
            spawn.mapRect(-1675, -1500 - 325, 50, 325);

            spawn.mapVertex(-1375, -835, "-250 -475   250 -475   250 475  0 500  -250 475");
            spawn.mapVertex(-850, -835, "-225 -475   225 -475   225 475  0 500  -225 475");
            spawn.mapVertex(-350, -835, "-225 -475   225 -475   225 475  0 500  -225 475");

            //far right wall ledges
            spawn.mapRect(1925, 1700 - 200, 400, 200);
            spawn.mapRect(1925, 1200 - 200, 400, 200);
            spawn.mapRect(1925, 700 - 200, 400, 200);
            spawn.mapRect(1925, 200 - 200, 400, 200);
            spawn.mapRect(1925, -300 - 200, 400, 200);
            spawn.mapRect(1925, -800 - 200, 400, 200);
            spawn.mapRect(1925, -1300 - 200, 400, 200);

            spawn.mapRect(1250, -1650 - 25, 500, 25);
            spawn.mapRect(1300, -1125 - 25, 400, 25);
            spawn.mapRect(1350, -600 - 25, 300, 25);
            spawn.mapRect(1400, -75 - 25, 200, 25);

            spawn.mapRect(650, -1287 - 50, 475, 50);
            spawn.mapRect(650, -800 - 125, 500, 125);
            spawn.mapRect(650, -150 - 225, 500, 225);
            spawn.mapRect(350, -1300 - 375, 800, 375);
            spawn.mapRect(350, -950 - 400, 150, 400);
            spawn.mapRect(-25, -950 - 100, 525, 100);
            spawn.mapRect(-75, -525 - 200, 575, 200);
            spawn.mapRect(-75, -75 - 200, 575, 200);
            spawn.mapRect(475, -1987 - 50, 550, 50);
            //ceiling zone
            spawn.mapRect(1200, 1575, 400, 25);
            spawn.mapRect(-75, 1700, 1075, 25);
            spawn.mapRect(-575, 1625 - 25, 450, 25);
            spawn.mapRect(-1075, 1850 - 25, 450, 25);

            spawn.mapRect(-1075, 1425 - 25, 450, 25);
            spawn.mapRect(-1675, 1588 - 25, 550, 25);
        }
        let flipAndRemove = function () {
            simulation.translatePlayerAndCamera({ x: player.position.x, y: -player.position.y })
            level.enter.y = -level.enter.y
            level.exit.y = -level.exit.y
            for (let i = body.length - 1; i > -1; i--) {
                if (body[i].isRotor) body.splice(i, 1);
            }

            function removeAll(array) {
                for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
            }
            removeAll(map);
            map = [];
            removeAll(balance);
            balance = []
            removeAll(buttons);
            buttons = []
            lasers = []

            function invertVertical(array) {
                for (let i = 0; i < array.length; ++i) {
                    Matter.Body.setPosition(array[i], { x: array[i].position.x, y: -array[i].position.y })
                }
            }
            invertVertical(body);
            invertVertical(powerUp);
            invertVertical(bullet);
            invertVertical(mob);
            //fields
            if (m.fieldMode === 9 && m.hole.isOn) {
                m.hole.pos1.y *= -1
                m.hole.pos2.y *= -1
            } else if (m.fieldMode === 2) {
                m.fieldPosition.y *= -1
                m.fieldAngle *= -1
            }
            //history
            for (let i = 0; i < m.history.length; i++) {
                m.history[i].position.y *= -1
                m.history[i].angle *= -1
                m.history[i].velocity.y *= -1
            }
            for (let i = 0; i < mob.length; i++) {
                //stun to wipe history of all mobs, so they don't get confused about player position vertical swap
                mobs.statusStun(mob[i], 1)
                //edge cases
                if (mob[i].history) {
                    for (let j = 0; j < mob[i].history.length; j++) mob[i].history[j].y *= -1
                }
                if (mob[i].laserArray) {
                    for (let j = 0; j < mob[i].laserArray.length; j++) {
                        mob[i].laserArray[j].a.y *= -1
                        mob[i].laserArray[j].b.y *= -1
                    }
                }
                if (mob[i].springTarget2) {
                    mob[i].springTarget.y *= -1
                    mob[i].springTarget2.y *= -1
                }
            }
            if (tech.wire && tech.wire.segments.length) {
                for (let i = 0; i < tech.wire.segments.length; i++) {
                    tech.wire.segments[i].y *= -1
                    tech.wire.segments[i].oldY *= -1
                }
            }
        }
        buildMapOutline()
        buildNormalMap()
        level.custom = () => {
            elevator.move()
            // console.log(elevator)
            lasers[lasers.length - 1].look.y = elevator.position.y
            lasers[lasers.length - 1].position.y = elevator.position.y

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].draw()
                if (buttons[i].isUp && !isFlipping) {
                    // buttons[i].query();
                    buttons[i].queryPlayer();
                    if (!buttons[i].isUp) {
                        isFlipping = true
                        if (level.isFlipped) {
                            const normalMap = function () {
                                level.isFlipped = false
                                flipAndRemove()
                                buildMapOutline()
                                buildNormalMap(); //rewrite flipped version of map
                                simulation.draw.setPaths() //update map graphics
                                level.addToWorld()
                            }
                            simulation.unFlipCameraVertical(flipAnimationCycles, normalMap)
                        } else {
                            const flipMap = function () {
                                level.isFlipped = true
                                flipAndRemove()
                                buildMapOutline()
                                buildVerticalFLippedMap(); //rewrite flipped version of map
                                simulation.draw.setPaths() //update map graphics
                                level.addToWorld()
                                if (!isSpawned) {
                                    isSpawned = true
                                    //spawn second wave of flipped mobs only once
                                    spawn.randomMob(-1500, -1425, 0);
                                    spawn.randomMob(-950, -1425, 0);
                                    spawn.randomMob(-800, -1475, 0);
                                    spawn.randomMob(-425, -1425, 0);
                                    spawn.randomMob(850, -1750, 0.1);
                                    spawn.randomMob(325, -850, 0.1);
                                    spawn.randomMob(400, -400, 0.2);
                                    spawn.randomMob(825, -475, 0.2);
                                    spawn.randomMob(875, -1050, 0.3);
                                    spawn.randomMob(1425, 1425, 0.4);
                                    spawn.randomMob(675, 1450, 0.5);
                                    spawn.randomMob(225, 1475, 0.6);
                                    spawn.randomMob(-275, 1425, 1);
                                    spawn.randomMob(-800, 1375, 1);

                                    spawn.secondaryBossChance(700, 1100)
                                }
                            }
                            simulation.flipCameraVertical(flipAnimationCycles, flipMap)
                        }
                        break
                    }
                }
            }

            if (level.isFlipped) {
                //background structure
                ctx.fillStyle = "#c3c7c7"
                ctx.fillRect(1487, -75 - 1925, 25, 1925);
                ctx.fillRect(1925, -2050, 300, 4100);

                //exit room
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(-2000, -1325 - 350, 375, 350)
                level.exit.drawAndCheck();
                //draw flipped entrance
                // ctx.translate(0, -3940)
                ctx.beginPath();
                ctx.moveTo(level.enter.x, level.enter.y - 30);
                ctx.lineTo(level.enter.x, level.enter.y + 80);
                ctx.bezierCurveTo(level.enter.x, level.enter.y + 170, level.enter.x + 100, level.enter.y + 170, level.enter.x + 100, level.enter.y + 80);
                ctx.lineTo(level.enter.x + 100, level.enter.y - 30);
                ctx.lineTo(level.enter.x, level.enter.y - 30);
                ctx.fillStyle = "#ccc";
                ctx.fill();
                // ctx.translate(0, 3940)
            } else {
                //background structure
                ctx.fillStyle = "#c5c9c9"
                ctx.fillRect(1487, 75, 25, 1925);
                ctx.fillRect(1925, -2050, 300, 4100);

                //draw flipped exit
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(-2000, 1325, 375, 350)
                ctx.beginPath();
                ctx.moveTo(level.exit.x, level.exit.y - 30);
                ctx.lineTo(level.exit.x, level.exit.y + 80);
                ctx.bezierCurveTo(level.exit.x, level.exit.y + 170, level.exit.x + 100, level.exit.y + 170, level.exit.x + 100, level.exit.y + 80);
                ctx.lineTo(level.exit.x + 100, level.exit.y - 30);
                ctx.lineTo(level.exit.x, level.exit.y - 30);
                ctx.fillStyle = "#0ff";
                ctx.fill();
                level.enter.draw();
            }
        };
        level.customTopLayer = () => {
            for (let i = 0; i < lasers.length; i++) lasers[i].query()
            ctx.fillStyle = "#233" //balances center dot
            ctx.beginPath();
            for (let i = 0; i < balance.length; i++) {
                ctx.moveTo(balance[i].center.x, balance[i].center.y)
                ctx.arc(balance[i].center.x, balance[i].center.y, 9, 0, 2 * Math.PI);
                //rotor spins and stops at vertical and horizontal angles
                if ((simulation.cycle % 140) < 15) {
                    balance[i].torque = 0.0002 * balance[i].inertia
                } else if (Math.floor(10 * (balance[i].angle % (Math.PI / 2))) === 0) {
                    Matter.Body.setAngularVelocity(balance[i], balance[i].angularVelocity * 0.1)
                }
            }
            ctx.fill();
            ctx.fillStyle = `rgba(255,255,255,${0 + 0.3 * Math.random()})`
            if (level.isFlipped) {
                ctx.fillRect(-2025, 2025 - 450, 400, 450);
                //shadows
                ctx.fillStyle = "rgba(0,0,0,0.08)"
                ctx.fillRect(-2025, -2075, 900, 775);
                ctx.fillRect(-1075, -2025, 450, 725);
                ctx.fillRect(-575, -2025, 450, 725);

                ctx.fillRect(-25, -250 - 725, 525, 725);
                ctx.fillRect(650, -350 - 975, 475, 975);
                ctx.fillRect(375, -1650 - 400, 750, 400);
                //ceiling
                ctx.fillStyle = "rgba(0,0,0,0.04)"
                ctx.fillRect(1225, 2025 - 450, 350, 450);
                ctx.fillRect(-50, 1700, 1025, 325);
                ctx.fillRect(-550, 2025 - 425, 400, 425);
                ctx.fillRect(-1050, 2025 - 625, 400, 625);
                ctx.fillRect(-1625, 2025 - 450, 475, 450);
            } else {
                ctx.fillRect(-2025, -2025, 400, 450);
                //shadows
                ctx.fillStyle = "rgba(0,0,0,0.08)"
                ctx.fillRect(-2025, 1300, 900, 775);
                ctx.fillRect(-1075, 1300, 450, 725);
                ctx.fillRect(-575, 1300, 450, 725);

                ctx.fillRect(-25, 250, 525, 725);
                ctx.fillRect(650, 350, 475, 975);
                ctx.fillRect(375, 1650, 750, 400);
                //ceiling
                ctx.fillStyle = "rgba(0,0,0,0.04)"
                ctx.fillRect(1225, -2025, 350, 450);
                ctx.fillRect(-50, -2025, 1025, 325);
                ctx.fillRect(-550, -2025, 400, 425);
                ctx.fillRect(-1050, -2025, 400, 625);
                ctx.fillRect(-1625, -2025, 475, 450);
            }
        };
        spawn.bodyRect(1325, -1775, 175, 175);
        spawn.bodyRect(-375, -1725, 100, 75, 0.5);
        spawn.bodyRect(-900, -1625, 125, 200, 0.5);
        spawn.bodyRect(875, -25, 200, 175);


        spawn.bodyRect(-1662, 1325, 25, 175);
        spawn.bodyRect(-1662, 1825, 25, 175);
        // spawn.bodyRect(-1662, -1825, 25, 225);

        spawn.bodyRect(1900, 1875, 100, 125, 0.5);
        spawn.bodyRect(400, 1925, 225, 50, 0.1);
        spawn.bodyRect(950, 750, 75, 50, 0.1);
        spawn.bodyRect(200, -25, 150, 100, 0.1);
        spawn.bodyRect(300, 900, 75, 50, 0.1);
        spawn.bodyRect(1475, 1025, 100, 100, 0.1);
        spawn.bodyRect(250, 450, 75, 75, 0.1);
        spawn.bodyRect(775, 75, 75, 75, 0.1);
        spawn.bodyRect(1200, 1900, 125, 100, 0.1);

        spawn.randomMob(125, -1900, 0);
        spawn.randomMob(-375, -1875, 0);
        spawn.randomMob(-1350, -1750, 0);
        spawn.randomMob(-875, -1575, 0);
        spawn.randomMob(500, -1875, 0);
        spawn.randomMob(350, 825, 0);
        spawn.randomMob(375, 400, 0);
        spawn.randomMob(1500, -25, 0.1);
        spawn.randomMob(650, -1950, 0.2);
        spawn.randomMob(775, 700, 0.2);
        spawn.randomMob(275, -50, 0.3);
        spawn.randomMob(75, -1750, 0.3);
        spawn.randomMob(1750, -1425, 0.4);
        spawn.randomMob(950, 50, 0.4);
        spawn.randomMob(-1375, 175, 0.4);
        spawn.randomMob(-350, 175, 0.5);
        spawn.randomMob(725, 1175, 0.5);
        spawn.randomMob(-850, -1950, 0.6);
        spawn.randomMob(-1400, -1725, 0.7);
        spawn.randomMob(1400, -1700, 0.7);
        spawn.randomMob(-800, 200, 0.7);
        spawn.randomMob(1475, 1550, 0.8);
        spawn.randomMob(1475, 500, 0.8);

        powerUps.spawnStartingPowerUps(-875, -1925);

        spawn.randomLevelBoss(-875, -200);
        //spawn.randomHigherTierMob(821, 705)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    gravitron() {
        mobs.maxMobBody = 25 //normally 40, but set lower to avoid too much clutter

        level.isVerticalFLipLevel = true
        simulation.fallHeight = 4000
        level.announceMobTypes()
        level.setPosToSpawn(-2375, 950);
        level.exit.x = 3750
        level.exit.y = 165
        level.defaultZoom = 2600
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#c3d6e1";
        color.map = "#444"
        powerUps.chooseRandomPowerUp(-1825, 975);
        powerUps.chooseRandomPowerUp(-3975, 975);
        powerUps.chooseRandomPowerUp(3900, 925);

        let buttons = []
        // level.isFlipped = false;
        if (simulation.isInvertedVertical) {
            level.isFlipped = true
        } else {
            level.isFlipped = false
        }
        let isFlipping = false;
        const flipAnimationCycles = 60

        let buildMapOutline = function () {
            //boxes center on zero,zero with deep walls to hide background
            spawn.mapRect(4000, -2000, 2000, 4000); //right map wall
            spawn.mapRect(-6000, -2000, 2000, 4000); //left map wall
            spawn.mapRect(-6000, -4000, 12000, 3000); //map ceiling
            spawn.mapRect(-6000, 1000, 12000, 3000); //floor
        }
        let buildNormalMap = function () {
            buttons.push(level.button(-3350, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(-3350, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(150, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(150, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(3725, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(3725, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            for (let i = 0; i < buttons.length; i++) buttons[i].isUp = false
            simulation.ephemera.push({
                name: "buttons up",
                count: flipAnimationCycles,
                do() {
                    this.count--
                    if (this.count < 0) {
                        for (let i = 0; i < buttons.length; i++) buttons[i].isUp = true
                        simulation.removeEphemera(this.name);
                        isFlipping = false
                    }
                },
            })
            //far left zone
            spawn.mapRect(-2575, 987, 375, 100);
            spawn.mapRect(-2575, -600, 600, 1325);
            spawn.mapRect(-2200, 650, 225, 475);
            spawn.mapRect(-2575, 700, 35, 125);
            spawn.mapRect(-3500, -1050, 425, 63);
            spawn.mapRect(-3500, 987, 425, 50);
            spawn.mapVertex(-2275, -1000, "-400 0  -300 150  300 150  400 0");

            spawn.mapVertex(-3287, 0, "-213 -500  0 -550  213 -500  213 500  0 550  -213 500");
            spawn.mapVertex(-3750, -100, "-100 -200  -50 -250   50 -250 100 -200   100 200 50 250  -50 250 -100 200");
            spawn.mapVertex(-2825, 0, "-100 -400  -50 -450   50 -450 100 -400   100 400 50 450  -50 450 -100 400");

            //dense center left zone
            spawn.mapVertex(-1150, -750, "400 -75   425 0  400 75  -400 75  -425 0 -400 -75");
            spawn.mapVertex(-550, -450, "400 -75   425 0  400 75  -400 75  -425 0 -400 -75");

            spawn.mapVertex(-1685, 153, "-150 -500  0 -550  150 -500  150 750  -150 450");
            spawn.mapVertex(-1106, 707, "500 -150   550 0  500 150  -500 150  -800 -150");
            spawn.mapRect(-1645, 470, 200, 200);
            Matter.Body.setAngle(map[map.length - 1], Math.PI / 4)
            spawn.mapRect(-2085, 910, 200, 200);
            Matter.Body.setAngle(map[map.length - 1], Math.PI / 4)

            //open center right area with both bosses
            // spawn.mapRect(0, -450, 425, 1100);
            spawn.mapVertex(213, 0, "-213 -700  0 -650  213 -600  213 700  0 650  -213 600");
            spawn.mapRect(0, -1050, 425, 63);
            spawn.mapRect(0, 987, 425, 50);
            spawn.mapVertex(1700, -1000, "-600 0  -400 400  400 400  600 0");
            spawn.mapVertex(2800, -1000, "-500 0  -400 150  400 150  500 0");
            spawn.mapVertex(1700, 700, "-400 -100  -450 0  -400 100  400 100  450 0  400 -100");
            spawn.mapVertex(2800, 375, "-400 -100  -450 0  -400 100  400 100  450 0  400 -100");

            //far right exit structure
            spawn.mapRect(3575, -1050, 425, 63);
            spawn.mapRect(3575, 987, 425, 50);
            spawn.mapVertex(3840, 450, "-250 -300   250 -300   250 300   -250 100");
            spawn.mapVertex(3840, -450, "-250 300   250 300   250 -300   -250 -100");
            spawn.mapRect(3750, 185, 100, 25);
        }
        let buildVerticalFLippedMap = function () { // flip Y with this -> spawn.mapRect(x, -y - h, w, h);
            buttons.push(level.button(-3350, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(-3350, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(150, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(150, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(3725, 985, 126, true, false, "hsl(330, 100%, 50%)"))
            buttons.push(level.button(3725, -985, 126, true, true, "hsl(330, 100%, 50%)"))
            for (let i = 0; i < buttons.length; i++) buttons[i].isUp = false

            simulation.ephemera.push({
                name: "buttons up",
                count: flipAnimationCycles,
                do() {
                    this.count--
                    if (this.count < 0) {
                        for (let i = 0; i < buttons.length; i++) buttons[i].isUp = true
                        simulation.removeEphemera(this.name);
                        isFlipping = false
                    }
                },
            })

            //far left zone
            spawn.mapRect(-2575, -1087, 375, 100);
            spawn.mapRect(-2575, 600 - 1325, 600, 1325);
            spawn.mapRect(-2200, -650 - 475, 225, 475);
            spawn.mapRect(-2575, -700 - 125, 35, 125);
            spawn.mapRect(-3500, 1050 - 63, 425, 63);
            spawn.mapRect(-3500, -987 - 50, 425, 50);
            spawn.mapVertex(-2275, 1000, "-300 0  -400 150  400 150  300 0");

            spawn.mapVertex(-3287, 0, "-213 -500  0 -550  213 -500  213 500  0 550  -213 500");
            spawn.mapVertex(-3750, 100, "-100 -200  -50 -250   50 -250 100 -200   100 200 50 250  -50 250 -100 200");
            spawn.mapVertex(-2825, 0, "-100 -400  -50 -450   50 -450 100 -400   100 400 50 450  -50 450 -100 400");

            //dense center left zone
            spawn.mapVertex(-1150, 750, "400 -75   425 0  400 75  -400 75  -425 0 -400 -75");
            spawn.mapVertex(-550, 450, "400 -75   425 0  400 75  -400 75  -425 0 -400 -75");

            spawn.mapVertex(-1685, -153, "-150 500  0 550  150 500  150 -750  -150 -450");
            spawn.mapVertex(-1106, -707, "500 150   550 0  500 -150  -500 -150  -800 150");
            spawn.mapRect(-1645, -470 - 200, 200, 200);
            Matter.Body.setAngle(map[map.length - 1], Math.PI / 4)
            spawn.mapRect(-2085, -910 - 200, 200, 200);
            Matter.Body.setAngle(map[map.length - 1], Math.PI / 4)

            //open center right area with both bosses
            spawn.mapVertex(213, 0, "-213 -600  0 -650  213 -700  213 600  0 650  -213 700");
            spawn.mapRect(0, 1050 - 63, 425, 63);
            spawn.mapRect(0, -987 - 50, 425, 50);
            spawn.mapVertex(1700, 1000, "-400 0  -600 400  600 400  400 0");
            spawn.mapVertex(2800, 1000, "-400 0  -500 150  500 150  400 0");
            spawn.mapVertex(1700, -700, "-400 -100  -450 0  -400 100  400 100  450 0  400 -100");
            spawn.mapVertex(2800, -375, "-400 -100  -450 0  -400 100  400 100  450 0  400 -100");
            //far right building like exit structure
            spawn.mapRect(3575, 1050 - 63, 425, 63);
            spawn.mapRect(3575, -987 - 50, 425, 50);
            spawn.mapVertex(3840, 450, "-250 -300   250 -300   250 300   -250 100");
            spawn.mapVertex(3840, -450, "-250 300   250 300   250 -300   -250 -100");
            spawn.mapRect(3750, -210, 100, 25);
        }
        let flipAndRemove = function () {

            level.enter.y = -level.enter.y
            level.exit.y = -level.exit.y
            for (let i = body.length - 1; i > -1; i--) {
                if (body[i].isRotor) body.splice(i, 1);
            }

            function removeAll(array) {
                for (let i = 0; i < array.length; ++i) Matter.Composite.remove(engine.world, array[i]);
            }
            removeAll(map);
            map = [];
            removeAll(buttons);
            buttons = []

            simulation.translatePlayerAndCamera({ x: player.position.x, y: -player.position.y }, false)
            function invertVertical(array) {
                for (let i = 0; i < array.length; ++i) {
                    Matter.Body.setPosition(array[i], { x: array[i].position.x, y: -array[i].position.y })
                }
            }
            invertVertical(body);
            invertVertical(powerUp);
            invertVertical(bullet);
            invertVertical(mob);

            //fields
            if (m.fieldMode === 9 && m.hole.isOn) {
                m.hole.pos1.y *= -1
                m.hole.pos2.y *= -1
            } else if (m.fieldMode === 2) {
                m.fieldPosition.y *= -1
                m.fieldAngle *= -1
            }
            //history
            for (let i = 0; i < m.history.length; i++) {
                m.history[i].position.y *= -1
                m.history[i].angle *= -1
                m.history[i].velocity.y *= -1
            }
            for (let i = 0; i < mob.length; i++) {
                //stun to wipe history of all mobs, so they don't get confused about player position vertical swap
                mobs.statusStun(mob[i], 1)
                //edge cases
                if (mob[i].history) {
                    for (let j = 0; j < mob[i].history.length; j++) mob[i].history[j].y *= -1
                }
                if (mob[i].laserArray) {
                    for (let j = 0; j < mob[i].laserArray.length; j++) {
                        mob[i].laserArray[j].a.y *= -1
                        mob[i].laserArray[j].b.y *= -1
                    }
                }
                if (mob[i].springTarget2) {
                    mob[i].springTarget.y *= -1
                    mob[i].springTarget2.y *= -1
                }
            }
        }
        buildMapOutline()
        buildNormalMap()
        level.custom = () => {
            //stuff floats near buttons
            // if ((player.position.x > -3505 && player.position.x < -3075) ||
            //     (player.position.x > 0 && player.position.x < 425) ||
            //     (player.position.x > 3575)) {
            //     if (player.position.y > 0) {
            //         player.force.y -= 0.8 * simulation.g * player.mass
            //     }
            // }
            for (let i = 0; i < body.length; i++) {
                if ((body[i].position.x > -3505 && body[i].position.x < -3075) ||
                    (body[i].position.x > 0 && body[i].position.x < 425) ||
                    (body[i].position.x > 3575)
                ) {
                    if (body[i].position.y > 0) {
                        body[i].force.y -= 1.04 * simulation.g * body[i].mass
                    } else {
                        body[i].force.y += 1.04 * simulation.g * body[i].mass
                    }
                }
            }
            for (let i = 0; i < powerUp.length; i++) {
                if ((powerUp[i].position.x > -3505 && powerUp[i].position.x < -3075) ||
                    (powerUp[i].position.x > 0 && powerUp[i].position.x < 425) ||
                    (powerUp[i].position.x > 3575)
                ) {
                    if (powerUp[i].position.y > 0) {
                        powerUp[i].force.y -= 1.04 * simulation.g * powerUp[i].mass
                    } else {
                        powerUp[i].force.y += 1.04 * simulation.g * powerUp[i].mass
                    }
                }
            }
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].draw()
                if (buttons[i].isUp && !isFlipping) {
                    // buttons[i].query();
                    buttons[i].queryPlayer();
                    if (!buttons[i].isUp) {
                        isFlipping = true
                        if (level.isFlipped) {
                            const normalMap = function () {
                                level.isFlipped = false
                                flipAndRemove()
                                buildMapOutline()
                                buildNormalMap(); //rewrite flipped version of map
                                simulation.draw.setPaths() //update map graphics
                                level.addToWorld()
                            }
                            simulation.unFlipCameraVertical(flipAnimationCycles, normalMap)
                        } else {
                            const flipMap = function () {
                                level.isFlipped = true
                                flipAndRemove()
                                buildMapOutline()
                                buildVerticalFLippedMap(); //rewrite flipped version of map
                                simulation.draw.setPaths() //update map graphics
                                level.addToWorld()
                            }
                            simulation.flipCameraVertical(flipAnimationCycles, flipMap)
                        }
                        break
                    }
                }
            }
            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(3575, -300, 475, 575);
            if (level.isFlipped) {
                //draw flipped entrance
                ctx.beginPath();
                ctx.moveTo(level.enter.x, level.enter.y - 30);
                ctx.lineTo(level.enter.x, level.enter.y + 80);
                ctx.bezierCurveTo(level.enter.x, level.enter.y + 170, level.enter.x + 100, level.enter.y + 170, level.enter.x + 100, level.enter.y + 80);
                ctx.lineTo(level.enter.x + 100, level.enter.y - 30);
                ctx.lineTo(level.enter.x, level.enter.y - 30);
                ctx.fillStyle = "#ccc";
                ctx.fill();
                //draw flipped exit
                ctx.fillStyle = "#d4f4f4"
                // ctx.fillRect(-2000, 1325, 375, 350)
                ctx.beginPath();
                ctx.moveTo(level.exit.x, level.exit.y - 30);
                ctx.lineTo(level.exit.x, level.exit.y + 80);
                ctx.bezierCurveTo(level.exit.x, level.exit.y + 170, level.exit.x + 100, level.exit.y + 170, level.exit.x + 100, level.exit.y + 80);
                ctx.lineTo(level.exit.x + 100, level.exit.y - 30);
                ctx.lineTo(level.exit.x, level.exit.y - 30);
                ctx.fillStyle = "#0ff";
                ctx.fill();
            } else {
                level.exit.drawAndCheck();
                level.enter.draw();
            }
        };
        level.customTopLayer = () => {
            ctx.fillStyle = `rgba(255,255,255,${0 + 0.3 * Math.random()})`
            ctx.fillRect(-3500, -1075, 425, 2100);
            ctx.fillRect(0, -1075, 425, 2100);
            ctx.fillRect(3575, -1075, 425, 2100);
            ctx.fillStyle = "rgba(0,0,0,0.08)"
            ctx.fillRect(-2575, -1025, 600, 2050);
            ctx.fillRect(1300, -1050, 800, 2100);
            ctx.fillRect(2400, -1050, 800, 2100);
        };

        // spawn.bodyRect(1900, 1875, 100, 125, 0.5);
        spawn.bodyRect(-2569, 825, 25, 165);

        spawn.randomMob(-2275, -675, 0);
        spawn.randomMob(-1200, 475, 0);
        spawn.randomMob(525, 875, 0.1);
        spawn.randomMob(1975, 900, 0.2);
        spawn.randomMob(2800, 875, 0.2);
        spawn.randomMob(-3275, -600, 0.3);
        spawn.randomMob(-1250, -900, 0.3);
        spawn.randomMob(-475, -600, 0.3);
        spawn.randomMob(-1750, 850, 0.4);
        spawn.randomMob(1700, 525, 0.4);
        spawn.randomMob(2925, 175, 0.5);
        spawn.randomMob(-2300, -825, 0.5);
        spawn.randomMob(-1625, -450, 0.6);
        spawn.randomMob(-225, 900, 0.6);
        spawn.randomMob(275, -775, 0.7);
        spawn.randomMob(2800, 875, 0.8);
        spawn.randomMob(3825, -750, 0.9);
        spawn.randomMob(2825, 150, 1);
        spawn.randomMob(-1900, 875, 1);
        //spawn.randomHigherTierMob(-1296, 407)
        powerUps.spawnStartingPowerUps(-825, -600);
        spawn.randomLevelBoss(1550, 200);
        spawn.secondaryBossChance(2675, -125)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    substructure() {
        // simulation.fallHeight = 4000
        level.announceMobTypes()
        level.setPosToSpawn(-3800, -750);
        level.exit.x = 3750
        level.exit.y = -625
        level.defaultZoom = 2000
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d5d5";
        color.map = "#444"

        const boost1 = level.boost(-2225, 1000, 1750)
        const boost2 = level.boost(3400, 1000, 1750)

        const lasers = []
        const center = { x: 2800, y: 200 }
        map[map.length] = Matter.Bodies.polygon(center.x, center.y, 20, 100) //center circle with lasers
        lasers.push(level.laser({ x: center.x, y: center.y }, { x: center.x, y: center.y })) //oscillating laser
        lasers[lasers.length - 1].oscillate = function () {
            const angle = -0.45 + Math.PI / 2 - 1.47 * Math.sin(0.02 * simulation.cycle) //oscillate around circle
            this.position = {
                x: center.x + 102 * Math.cos(angle),
                y: center.y + 102 * Math.sin(angle)
            }
            this.look = {
                x: center.x + 2000 * Math.cos(angle),
                y: center.y + 2000 * Math.sin(angle)
            }
        }
        lasers.push(level.laser({ x: center.x, y: center.y }, { x: center.x, y: center.y })) //oscillating laser
        lasers[lasers.length - 1].oscillate = function () {
            const angle = -0.45 + -Math.PI / 2 + 1.47 * Math.sin(0.02 * simulation.cycle) //oscillate around circle
            this.position = {
                x: center.x + 102 * Math.cos(angle),
                y: center.y + 102 * Math.sin(angle)
            }
            this.look = {
                x: center.x + 2000 * Math.cos(angle),
                y: center.y + 2000 * Math.sin(angle)
            }
        }

        lasers.push(level.laser({ x: -1500, y: -963 }, { x: -1500, y: 0 })) //oscillating laser
        lasers[lasers.length - 1].oscillate = function () {
            // if (this.countDown === 0) {}
            const angle = Math.PI / 2 + 0.6 * Math.sin(simulation.cycle * 0.02) //oscillate around down
            this.look = {
                x: this.position.x + 600 * Math.cos(angle),
                y: this.position.y + 600 * Math.sin(angle)
            }
        }

        lasers.push(level.laser({ x: 600, y: 580 }, { x: 600, y: 1000 })) //scrolling laser
        lasers[lasers.length - 1].oscillate = function () {
            this.position.x = 600 + 200 * Math.sin(simulation.cycle * 0.03)
            this.look.x = 600 + 400 * Math.sin(simulation.cycle * 0.03)
        }

        lasers.push(level.laser({ x: -115, y: -853 }, { x: 600, y: -50 }))
        if (Math.random() < 0.33) {
            lasers[lasers.length - 1].oscillate = function () { this.look.x = 300 + Math.abs(600 * Math.sin(simulation.cycle * 0.017)) }
        } else if (Math.random() < 0.5) {
            lasers[lasers.length - 1].oscillate = function () { this.look.x = 600 + 300 * Math.sin(simulation.cycle * 0.017) }
        } else {
            lasers[lasers.length - 1].oscillate = function () { this.look.x = 300 + (4 * simulation.cycle % 600) }
        }
        lasers.push(level.laser({ x: 2375, y: -876 }, { x: 2375, y: -300 })) //exit top
        lasers[lasers.length - 1].oscillate = function () {
            const angle = 1.4 + 1.15 * Math.sin(simulation.cycle * 0.021) //oscillate around down
            this.look = {
                x: this.position.x + 2000 * Math.cos(angle),
                y: this.position.y + 2000 * Math.sin(angle)
            }
        }
        lasers.push(level.laser({ x: 2375, y: -876 }, { x: 2375, y: -876 })) //exit top
        lasers[lasers.length - 1].oscillate = function () {
            const angle = 1.4 + 1.15 * Math.cos(simulation.cycle * 0.021) //oscillate around down
            this.look = {
                x: this.position.x + 2000 * Math.cos(angle),
                y: this.position.y + 2000 * Math.sin(angle)
            }
        }

        lasers.push(level.laser({ x: -3565, y: -915 }, { x: -3565, y: -710 })) //entrance door
        lasers.push(level.laser({ x: 3535, y: -915 }, { x: 3535, y: -575 })) //exit door

        if (Math.random() < 0.33) {
            lasers.push(level.laser({ x: -400, y: -713 }, { x: -400, y: -295 })) //pillar top
        } else if (Math.random() < 0.5) {
            lasers.push(level.laser({ x: -400, y: -250 }, { x: -400, y: 200 })) //pillar mid
        } else {
            lasers.push(level.laser({ x: -400, y: 250 }, { x: -400, y: 750 })) //pillar low
        }

        level.custom = () => {
            boost1.query();
            boost2.query();

            ctx.fillStyle = "#cacfcf"
            ctx.fillRect(2787, -425, 25, 650);
            ctx.fillRect(-600, -1050, 400, 1800);

            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,255,255,0.1)" //"#d4f4f4" //exit
            ctx.fillRect(3535, -1050, 500, 475);

            //shadows
            ctx.fillStyle = "rgba(0,20,60,0.09)"
            ctx.fillRect(-4025, -1050, 1750, 2275);
            ctx.fillRect(-2025, -1050, 1050, 2175);
            ctx.fillRect(200, 0, 800, 975);
            ctx.fillRect(1400, -150, 650, 1175);
            ctx.fillRect(2200, -425, 1175, 1475);

            //rotate angle of lasers
            for (let i = 0; i < 7; i++) lasers[i].oscillate()
            for (let i = 0; i < lasers.length; i++) {
                lasers[i].motionQuery()
            }
        };
        //boxes center on zero,zero with deep walls to hide background
        spawn.mapRect(4000, -2000, 2000, 4000); //right map wall
        spawn.mapRect(-6000, -2000, 2000, 4000); //left map wall
        spawn.mapRect(-6000, -4000, 12000, 3000); //map ceiling
        spawn.mapRect(-6000, 1000, 12000, 3000); //floor
        //entrance
        spawn.mapRect(-4000, -710, 450, 1800);
        spawn.mapVertex(-3565, -1013, "-140 0    -8 150   8 150   140 0"); //entrance door
        spawn.mapVertex(-3975, -975, "0 0    100 0   0 100"); //triangle at corner
        spawn.mapVertex(-2900, 268, "-650 0   0 -40   650 0    650 2000   -650 2000 ");  //angled floating structure
        spawn.mapVertex(-2900, -990, "-600 0  0 40  600 0"); //wide ceiling triangle
        //pillar 1
        spawn.mapVertex(-1500, -350, "-550 0   0 -40   550 0    550 350   0 390  -550 350 ");
        spawn.mapVertex(-1500, 535, "-550 0   0 -40   550 0    550 500   0 540  -550 500 ");
        spawn.mapVertex(-1500, -990, "-600 0  0 40  600 0");
        spawn.mapVertex(-1500, 990, "-550 0  0 -40  550 0   550 20   -550 20");
        //pillar 2
        spawn.mapVertex(-400, -875, "225 0  -225 0  -350 -300  350 -300");
        spawn.mapRect(-600, 200, 400, 50);
        spawn.mapRect(-600, -300, 400, 50);
        spawn.mapVertex(-400, 900, "350 0  -350 0  -225 -300  225 -300");
        //pillar 3
        spawn.mapVertex(600, 1000, "575 0  -575 0  -450 -100  450 -100");
        spawn.mapVertex(600, 500, "325 0  250 80  -250 80  -325 0  -250 -80  250 -80");
        spawn.mapRect(175, 450, 850, 100);
        spawn.mapVertex(600, 0, "425 -20  425 20  390 50  -390 50  -425 20  -425 -20  -390 -50  390 -50");
        //far right building
        spawn.mapRect(1600, 990, 450, 100);
        spawn.mapRect(2200, 990, 1175, 100);
        spawn.mapVertex(1500, 1015, "200 0  -200 0  -100 -100  100 -100");
        spawn.mapVertex(1500, 200, "-100 100  0 0   100 0   100 1000   -100 1000"); //left wall
        spawn.mapRect(1550, -300, 500, 200);
        spawn.mapVertex(2303.5, -350, "-100 100  0 0   100 0   100 500   -100 500"); //left wall
        spawn.mapRect(2350, -600, 1025, 200);
        spawn.mapVertex(2375, -975, "-140 0    -8 150   8 150   140 0");  //laser mount
        //exit
        spawn.mapRect(3525, -600, 550, 1675);
        spawn.mapRect(3750, -610, 100, 50);
        spawn.mapVertex(3535, -1013, "-140 0    -8 150   8 150   140 0"); //entrance door
        spawn.mapVertex(3975, -990, "0 0    100 0   100 100"); //triangle at corner

        spawn.randomMob(-1150, 900, 0.1);
        spawn.randomMob(675, 750, 0.1);
        spawn.randomMob(3100, 875, 0.2);
        spawn.randomMob(2975, -775, 0.2);
        spawn.randomMob(1675, -550, 0.3);
        spawn.randomMob(700, -300, 0.3);
        spawn.randomMob(-325, -425, 0.4);
        spawn.randomMob(-1375, -675, 0.4);
        spawn.randomMob(-1425, 100, 0.5);
        spawn.randomMob(-500, 75, 0.6);
        spawn.randomMob(625, 250, 0.7);
        spawn.randomMob(2125, 375, 0.7);
        spawn.randomMob(-500, 600, 0.8);
        spawn.randomMob(-1950, 875, 0.8);
        spawn.randomMob(800, -400, 0.9);
        spawn.randomMob(1675, -600, 0.9);
        spawn.randomMob(2825, 75, 0.9);
        spawn.randomLevelBoss(2400, 600);
        spawn.secondaryBossChance(800, -300)
        //spawn.randomHigherTierMob(-1499, 122)
        powerUps.chooseRandomPowerUp(600, 375);
        powerUps.chooseRandomPowerUp(600, 925);
        powerUps.spawnStartingPowerUps(1750, -325);
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        powerUps.chooseRandomPowerUp(2825, 175);
        powerUps.chooseRandomPowerUp(2475, -650);
        powerUps.chooseRandomPowerUp(2100, 925);
        powerUps.chooseRandomPowerUp(625, -100);
    },
    corridor() {
        // simulation.fallHeight = 4000
        level.announceMobTypes()
        level.defaultZoom = 2400
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d5d5";
        color.map = "#444"

        powerUps.chooseRandomPowerUp(5925, -2125);
        powerUps.chooseRandomPowerUp(75, -4225);
        powerUps.chooseRandomPowerUp(2950, -1450);

        // level.isHorizontalFlipped = true
        if (level.isHorizontalFlipped) {
            level.setPosToSpawn(14075, -625);
            level.exit.x = -350
            level.exit.y = 505
            spawn.bodyRect(13525, -675, 50, 100);
            var color1 = "rgba(0,20,60,0.09)"
            var color2 = "rgba(0,255,255,0.1)"
        } else {
            level.setPosToSpawn(-350, 475);
            level.exit.x = 14025
            level.exit.y = -600
            spawn.bodyRect(-225, 475, 50, 50);
            var color1 = "rgba(0,255,255,0.1)"
            var color2 = "rgba(0,20,60,0.09)"
        }
        spawn.mapRect(14015, -585, 120, 75); //exit/entrance platform

        const buttonLeft = level.button(-4100, 991)
        const buttonRight = level.button(4050, 991)
        buttonLeft.isUp = true
        // const buttonCamera = level.button(940, -1545)
        // buttonRight.isUp = false
        const boosts = []
        boosts.push(level.boost(-3650, 990, 2700, 1.45))
        boosts.push(level.boost(3325, 990, 1600, 1.4))
        boosts.push(level.boost(7960, -1110, 1650, 2.3))
        boosts.push(level.boost(13345, -460, 2070, 2.35))

        const fizzlers = []
        fizzlers.push(level.fizzler({ x: -135, y: 265 }, { x: -135, y: 535 }))
        fizzlers.push(level.fizzler({ x: -3850, y: 650 }, { x: -3850, y: 1025 }))
        fizzlers.push(level.fizzler({ x: 3875, y: 675 }, { x: 3875, y: 1025 }))
        fizzlers.push(level.fizzler({ x: 13425, y: -1275 }, { x: 13425, y: -550 }))

        const movers = []
        const baseMoverSpeed = 15
        movers.push(level.mover(-3550, 995, 6875, 150, -baseMoverSpeed))
        movers.push(level.mover(225, -1190, 2450, 50, -baseMoverSpeed))
        movers.push(level.mover(-3000, -1190, 3000, 50, baseMoverSpeed))
        movers.push(level.mover(4000, -2025, 2000, 150, -23))
        movers.push(level.mover(8000, -1125, 2000, 150, -23))
        movers.push(level.mover(3775, -425, 1650, 150, 20))
        movers.push(level.mover(5425, -425, 1925, 150, 40))
        movers.push(level.mover(7350, -425, 6000, 150, 60))

        function setMoverDirection(index, VxGoal, force) {
            movers[index].VxGoal = VxGoal
            movers[index].force = force
        }
        level.custom = () => {
            // buttonCamera.query()
            // if (!buttonCamera.isUp) {
            //     simulation.setCameraPosition(100, -1000, 0.29)
            //     //block spawner
            //     spawn.mapRect(0, -2375, 200, 100);
            //     if (!(simulation.cycle % 10) && !m.isTimeDilated && body.length < 200) {
            //         const where = { x: 112, y: -3800 }
            //         // simulation.drawList.push({ x: where.x + 100 * (Math.random() - 0.5), y: where.y + 100 * (Math.random() - 0.5), radius: 11, color: "rgba(0,160,255,0.5)", time: 10 });

            //         let makeBlock = function (where, size) {
            //             const sides = Math.floor(4 + 6 * Math.random() * Math.random())
            //             body[body.length] = Matter.Bodies.polygon(where.x, where.y, sides, size, {
            //                 friction: 0.05,
            //                 frictionAir: 0.001,
            //                 collisionFilter: {
            //                     category: cat.body,
            //                     mask: cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
            //                 },
            //                 classType: "body",
            //                 density: 0.001,
            //             });
            //             const who = body[body.length - 1]
            //             Composite.add(engine.world, who); //add to world
            //         }
            //         makeBlock({ x: where.x, y: where.y }, Math.floor(20 + 35 * Math.random() * Math.random()))
            //     }
            // }
            ctx.fillStyle = "#c8cccc"//background color is "#d0d5d5"
            ctx.fillRect(-2150, 675, 500, 400);
            ctx.fillRect(-1050, 675, 500, 400);
            ctx.fillRect(750, 675, 500, 400);
            ctx.fillRect(1850, 675, 500, 400);
            ctx.fillRect(-2250, -2425, 700, 1325);
            ctx.fillRect(-1150, -2400, 700, 1300);
            ctx.fillRect(650, -2375, 700, 1325);
            ctx.fillRect(1750, -2375, 700, 1350);
            ctx.fillRect(8000, -2425, 2000, 2225);
            ctx.fillRect(4000, -2375, 2000, 2100);
            ctx.fillRect(11125, -2425, 1000, 2150)
            level.exit.drawAndCheck();
            level.enter.draw();
            if (buttonRight.isUp) {
                buttonRight.query();
                if (!buttonRight.isUp) {
                    requestAnimationFrame(() => buttonLeft.isUp = true);
                    setMoverDirection(0, -baseMoverSpeed, -0.0005)
                    const list = Matter.Query.region(body, buttonLeft) //are any blocks colliding with this
                    if (list.length > 0) Matter.Body.setVelocity(list[0], { x: baseMoverSpeed, y: -20 });
                }
            } else if (buttonLeft.isUp) {
                buttonLeft.query();
                if (!buttonLeft.isUp) {
                    requestAnimationFrame(() => buttonRight.isUp = true);
                    setMoverDirection(0, 20, 0.0005)
                    const list = Matter.Query.region(body, buttonRight) //are any blocks colliding with this
                    if (list.length > 0) Matter.Body.setVelocity(list[0], { x: -15, y: -20 });
                }
            }
            buttonRight.draw();
            buttonLeft.draw();
            for (let i = 0; i < movers.length; i++) movers[i].push();
            for (let i = 0; i < boosts.length; i++) boosts[i].query();
        };
        level.customTopLayer = () => {
            for (let i = 0; i < fizzlers.length; i++) fizzlers[i].query();
            ctx.fillStyle = color1 //exit
            ctx.fillRect(13400, -1325, 1000, 825);
            //shadows
            ctx.fillStyle = color2
            ctx.fillRect(-500, 225, 494, 350);
            ctx.fillStyle = "rgba(0,5,10,0.06)"
            ctx.beginPath();
            ctx.moveTo(0, -1180)
            ctx.lineTo(225, -1180)
            ctx.lineTo(3220, 669)
            ctx.lineTo(3180, 1010)
            ctx.lineTo(-2960, 1010)
            ctx.lineTo(-2995, 674)
            ctx.fill()
            ctx.beginPath();
            //right button room
            ctx.beginPath();
            ctx.moveTo(3780, 720)
            ctx.lineTo(4325, 720)
            ctx.lineTo(4325, 1010)
            ctx.lineTo(3810, 1010)
            ctx.fill()
            //left button room
            ctx.beginPath();
            ctx.moveTo(-3755, 675)
            ctx.lineTo(-3785, 1010)
            ctx.lineTo(-4250, 1010)
            ctx.lineTo(-4250, 675)
            ctx.fill()
            ctx.fillStyle = "rgba(68, 68, 68,0.9)"
            ctx.fillRect(-50, -4300, 325, 1950);
            for (let i = 0; i < movers.length; i++) movers[i].draw();
        };
        spawn.mapRect(-6000, 1000, 12000, 3000); //floor
        spawn.mapRect(-6000, -4300, 6020, 1950);
        spawn.mapRect(205, -4300, 15120, 1950);
        spawn.mapVertex(-250, 602.5, "-200 0  235 0 400 50  400 150  -200 150");
        spawn.mapVertex(-3675, -2275, "0 0  500 0  0 500");
        spawn.mapVertex(13275, -2275, "0 0  -500 0  0 500");
        spawn.mapRect(-525, -1175, 525, 1450);
        spawn.mapRect(225, -1175, 3000, 1850);
        spawn.mapRect(-3000, -1175, 2525, 1850);
        spawn.mapRect(-4350, -2500, 600, 3175);
        spawn.mapRect(-6000, -2350, 1775, 3350);
        spawn.mapVertex(-1900, 675, "-350 0  -250 100  250 100  350 0");
        spawn.mapVertex(-800, 675, "-350 0  -250 100  250 100  350 0");
        spawn.mapVertex(1000, 675, "-350 0  -250 100  250 100  350 0");
        spawn.mapVertex(2100, 675, "-350 0  -250 100  250 100  350 0");

        spawn.mapVertex(-1900, -1450, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapVertex(-800, -1450, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapVertex(1000, -1450, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapVertex(2100, -1450, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");

        spawn.mapVertex(-1900, -2350, "-450 0  -350 100  350 100  450 0");
        spawn.mapVertex(-800, -2350, "-450 0  -350 100  350 100  450 0");
        spawn.mapVertex(1000, -2350, "-450 0  -350 100  350 100  450 0");
        spawn.mapVertex(2100, -2350, "-450 0  -350 100  350 100  450 0");
        spawn.mapRect(-1500, 840, 300, 20);
        spawn.mapRect(1400, 840, 300, 20);
        //ramp to catch blocks
        spawn.mapVertex(3001, -1260, "0 0  400 -200  550 -200  550 75  0 75");
        spawn.mapVertex(4100, -1100, "-625 0  -600 -60  600 -60  625 0  600 60  -600 60");
        spawn.mapVertex(5550, -750, "-625 0  -600 -60  600 -60  625 0  600 60  -600 60");
        spawn.mapVertex(11625, -900, "-525 0  -500 -50  500 -50  525 0  500 50  -500 50");
        //base for mover
        spawn.mapVertex(5000, -1935, "-1050 0  -1000 -90  1000 -90  1050 0  1000 90  -1000 90");
        spawn.mapVertex(9000, -1035, "-1050 0  -1000 -90  1000 -90  1050 0  1000 90  -1000 90");
        spawn.mapVertex(5000, -2370, "-1200 0  -1000 100  1000 100  1200 0");
        spawn.mapVertex(9000, -2310, "-1200 0  -1000 100  1000 100  1200 0");
        spawn.mapVertex(11625, -2310, "-600 0  -500 100  500 100  600 0");
        spawn.mapRect(3775, -400, 675, 1125);
        spawn.mapRect(4300, -400, 11025, 4400);
        //exit
        spawn.mapRect(13400, -575, 1925, 300);
        spawn.mapRect(14275, -2375, 1050, 2050);
        spawn.mapRect(13400, -2375, 900, 1125);


        //blocks on movers
        spawn.bodyRect(-200, 950, 50, 50);
        spawn.bodyRect(-1100, 925, 65, 75);
        spawn.bodyRect(-2275, 975, 70, 25);
        spawn.bodyRect(-3325, 925, 75, 75);
        spawn.bodyRect(-2950, -1225, 90, 25);
        spawn.bodyRect(-1425, -1275, 45, 75);
        spawn.bodyRect(600, -1275, 70, 75);
        spawn.bodyRect(1900, -1225, 90, 50);
        spawn.bodyRect(4250, -2100, 115, 50);
        spawn.bodyRect(2175, 900, 100, 65);
        spawn.bodyRect(4075, -450, 75, 20);
        spawn.bodyRect(8350, -1175, 90, 50);
        spawn.bodyRect(6525, -525, 70, 100);
        spawn.bodyRect(12025, -475, 130, 50);
        spawn.bodyRect(625, 950, 55, 45);
        spawn.bodyRect(6250, -450, 55, 25);
        spawn.bodyRect(3950, -475, 46, 53);
        //other blocks
        spawn.bodyRect(3525, -1300, 100, 125, 0.6);
        spawn.bodyRect(11550, -1150, 100, 200, 0.4);

        spawn.randomMob(-1775, -1650, 0);
        spawn.randomMob(950, -1775, 0);
        spawn.randomMob(1550, 775, 0);
        spawn.randomMob(4500, -1250, 0);
        spawn.randomMob(11400, -1300, 0);
        spawn.randomMob(-800, -1675, 0);
        spawn.randomMob(-1325, 775, 0.1);
        spawn.randomMob(2050, -1625, 0.1);
        spawn.randomMob(3100, -1475, 0.2);
        spawn.randomMob(5400, -900, 0.2);
        spawn.randomMob(11950, -1025, 0.3);
        spawn.randomMob(-925, -1700, 0.3);
        spawn.randomMob(2025, -1725, 0.4);
        spawn.randomMob(1575, 775, 0.4);
        spawn.randomMob(-1350, 775, 0.6);
        spawn.randomMob(11925, -1275, 0.6);
        spawn.randomMob(4325, -1425, 0.6);
        spawn.randomMob(5425, -950, 0.6);
        spawn.randomMob(3575, 375, 0.6);
        spawn.randomGroup(5300, -1400, 1.3);
        if (simulation.difficultyMode > 1 || level.levelsCleared > 1) {
            if (level.levelsCleared > 7) { //T3
                spawn.randomLevelBoss(2025, -1825, ["laserLayerBoss"]);
                spawn.secondaryBossChance(-1900, -1800, ["historyBoss"]);
            } else if (level.levelsCleared > 3) { //T2
                spawn.randomLevelBoss(2025, -1825, ["pulsarBoss", "spawnerBossCulture"]);
                spawn.secondaryBossChance(-1900, -1800, ["blockBoss"]);
            } else {  //T1
                spawn.randomLevelBoss(2025, -1825, ["shieldingBoss"]);
                spawn.secondaryBossChance(-1900, -1800, ["shooterBoss"]);
            }
        } else {
            powerUps.spawnBossPowerUp(2800, -1400)
        }
        //spawn.randomHigherTierMob(4245, -1245)
        // spawn.randomLevelBoss(2025, -1825, ["pulsarBoss", "shieldingBoss", "laserLayerBoss", "shooterBoss"]);
        // spawn.secondaryBossChance(-1900, -1800, ["historyBoss", "spawnerBossCulture", "blockBoss"]);
        powerUps.spawnStartingPowerUps(11750, -1000);
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    lock() {
        level.announceMobTypes()
        level.setPosToSpawn(0, -65); //lower start
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.y = 2010;
        level.exit.x = 2625;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 2200
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "hsl(138, 5%, 82%)";
        color.map = "#444"
        powerUps.spawnStartingPowerUps(1768, 870); //on left side
        const portal = level.portal({ x: 1070, y: -1485 }, -0.9, { x: 475, y: 50 }, -Math.PI / 2)
        const doorCenterRight = level.door(2787, 775, 25, 225, 195, 5) //x, y, width, height, distance, speed = 1
        const doorCenterLeft = level.door(2537, 775, 25, 225, 195, 5)
        const doorButtonRight = level.door(4462, 1010, 25, 225, 195, 5)
        const doorLeft = level.door(2538, 1825, 25, 225, 195, 5)
        const buttonLeft = level.button(4565, 1235)
        const buttonRight = level.button(4142, -355)
        // spawn.mapRect(4000, -350, 700, 125); //button platform
        spawn.mapRect(4000, -350, 600, 75);
        buttonLeft.isUp = true
        buttonRight.isUp = true
        const hazardSlimeLeft = level.hazard(900, -300, 1638, 2450) //hazard(x, y, width, height, damage = 0.002) {
        const hazardSlimeRight = level.hazard(2812, -300, 1650, 2450) //hazard(x, y, width, height, damage = 0.002) {
        const balance = []
        level.custom = () => {
            ctx.fillStyle = "hsl(175, 35%, 76%)" //exit
            ctx.fillRect(2537, 1775, 275, 275)
            level.exit.drawAndCheck();
            level.enter.draw();

            doorButtonRight.isClosing = hazardSlimeRight.min.y < 1275
            doorCenterRight.isClosing = hazardSlimeRight.min.y < 1000
            doorCenterLeft.isClosing = hazardSlimeLeft.min.y < 1000
            doorLeft.isClosing = hazardSlimeLeft.min.y < 2050
            doorButtonRight.openClose();
            doorCenterRight.openClose();
            doorCenterLeft.openClose();
            doorLeft.openClose();
            if (buttonRight.isUp) {
                buttonRight.query();
                if (!buttonRight.isUp) spawnRightMobs()
            }
            if (buttonLeft.isUp) {
                buttonLeft.query();
                if (!buttonLeft.isUp) spawnLeftMobs()
            }
            buttonRight.draw();
            buttonLeft.draw();
            if (hazardSlimeLeft.min.y < 2050) {
                const drainRate = Math.min(Math.max(0.25, 4 - hazardSlimeLeft.min.y / 500), 4)
                hazardSlimeLeft.level(buttonLeft.isUp, drainRate)
            }
            if (hazardSlimeRight.min.y < 2050) {
                const drainRate = Math.min(Math.max(0.25, 4 - hazardSlimeRight.min.y / 500), 4)
                hazardSlimeRight.level(buttonRight.isUp, drainRate)
            }
            portal[2].query()
            portal[3].query()
        };
        level.customTopLayer = () => {
            doorButtonRight.draw();
            doorCenterRight.draw();
            doorCenterLeft.draw();
            doorLeft.draw();
            hazardSlimeLeft.query();
            hazardSlimeRight.query();
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            ctx.fillStyle = color.map //below portal
            ctx.fillRect(375, 150, 200, 2525);
            ctx.fillStyle = "rgba(0,0,0,0.1)" //shadows
            ctx.fillRect(-250, -1550, 1250, 1575);
            ctx.fillRect(2537, -350, 275, 2425);
            ctx.fillStyle = "rgba(0,0,0,0.05)" //exit
            ctx.fillRect(-175, -300, 375, 300)
            ctx.fillRect(4460, 950, 350, 325);
            ctx.fillStyle = "#233" //balances center dot
            ctx.beginPath();
            for (let i = 0; i < balance.length; i++) {
                ctx.arc(balance[i].center.x, balance[i].center.y, 9, 0, 2 * Math.PI);
            }
            ctx.fill();
            // for (let i = 0, len = vanish.length; i < len; i++) vanish[i].query()
        };
        //entrance and outer walls
        spawn.mapRect(-1400, 0, 1800, 2675);
        spawn.mapRect(-1400, -1025, 1225, 1500);
        spawn.mapRect(-325, -15, 525, 225);
        spawn.mapRect(150, -350, 50, 175);

        spawn.mapRect(-1400, -3525, 1600, 3225);
        spawn.mapRect(550, 0, 450, 2675);

        spawn.mapRect(550, -1550, 450, 125);
        spawn.mapRect(150, -1550, 250, 125);
        spawn.mapRect(750, -1425, 1100, 175);
        spawn.mapRect(750, -1400, 250, 825);
        spawn.mapRect(750, -350, 250, 575);
        spawn.mapRect(625, 2100, 4300, 575); //floor
        spawn.mapRect(-1400, -4425, 7250, 1000); //ceiling
        //left button room  (on the far right in the
        spawn.mapRect(4450, -3525, 1400, 4500);
        spawn.mapRect(4450, 1235, 1400, 1440);
        spawn.mapRect(4775, 750, 1075, 825);
        spawn.mapRect(4450, 950, 50, 75);

        //right side
        if (Math.random() < 1) {
            spawn.mapVertex(3350, 350, "-100 0  100 0  100 700  0 750  -100 700");
            balance.push(level.rotor(3463, 150, 300, 25, 0.001, 0)) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            balance.push(level.rotor(3463, 500, 300, 25, 0.001, 0))
            spawn.mapVertex(3875, 350, "-100 0  100 0  100 700  0 750  -100 700");

            spawn.mapVertex(2900, 1743, "-100 0  70 0  100 30   100 1000   -100 1000");
            spawn.mapVertex(3025, 1811, "-150 0  120 0  150 30   150 600   -150 600");
            spawn.mapVertex(3200, 2079, "-150 0  120 0  150 30   150 600   -150 600");
            spawn.mapVertex(4425, 1743, "-150 30 -120 0  150 0   150 1000   -150 1000");
            spawn.mapVertex(4250, 1811, "-150 30 -120 0  150 0   150 600   -150 600");
            spawn.mapVertex(4075, 2079, "-150 30 -120 0  150 0   150 600   -150 600");

            //escape ledge when drowning
            spawn.mapRect(2750, 525, 100, 25);
            spawn.mapRect(2750, 125, 100, 25);
            spawn.mapRect(4425, 800, 75, 25);
            spawn.mapRect(4425, 325, 75, 25);
        }
        //left side
        if (Math.random() < 1) {
            // spawn.mapVertex(2325, 1325, "-150 0  150 0  150 150  0 225  -150 150");
            spawn.mapVertex(1285, 1275, "-150 0  150 0  150 150  0 225  -150 150");
            spawn.mapVertex(1033, 1750, "0 200  200 200  300 50  300 -50  200 -200  0 -200");
            spawn.mapVertex(1575, 1750, "0 200  -200 200  -300 50  -300 -50  -200 -200  0 -200  100 -50  100 50"); //larger "0 400  -250 400  -400 100  -400 -100  -250 -400  0 -400"

            spawn.mapVertex(1287, 2185, "-100 30   -80 0   80 0  100 30   100 300   -100 300");
            spawn.mapVertex(2050, 2050, "-150 30   -120 0   120 0  150 30   150 300   -150 300");

            // spawn.mapRect(1700, 1550, 275, 25);
            // spawn.mapRect(2175, 1275, 325, 25);
            spawn.mapRect(1600, 950, 375, 25);

            spawn.mapRect(1025, -50, 50, 25);
            spawn.mapRect(1025, 275, 175, 25);
            spawn.mapRect(1025, 600, 325, 25);
            spawn.mapRect(2450, -50, 50, 25);
            spawn.mapRect(2325, 275, 175, 25);
            spawn.mapRect(2175, 600, 325, 25);
            // spawn.mapVertex(3400, 1250, "-100 -300  0 -350  100 -300  100 300  0 350  -100 300");
        }

        //left button room in center divider
        spawn.mapRect(2525, -350, 300, 1100);
        spawn.mapRect(2525, 975, 300, 800);
        spawn.mapRect(2775, 650, 50, 125);
        spawn.mapRect(2525, 650, 50, 125);

        //exit room
        spawn.mapRect(2475, 2040, 350, 200);
        spawn.mapRect(2800, 1750, 25, 325);
        spawn.mapRect(2525, 1750, 50, 75);

        //safety edge blocks  //maybe remove?
        // spawn.mapRect(2525, -375, 25, 50);
        // spawn.mapRect(2800, -375, 25, 50);
        // spawn.mapRect(1825, -1450, 25, 50);
        // spawn.mapRect(4000, -375, 25, 50);

        //blocks
        spawn.bodyRect(150, -175, 50, 165, 0.2); //block at entrance
        spawn.bodyRect(1275, 825, 100, 100, 0.2);
        spawn.bodyRect(2600, -425, 150, 50, 0.2);
        spawn.bodyRect(3900, -150, 50, 100, 0.2);
        spawn.bodyRect(3350, 1950, 75, 100, 0.2);
        spawn.bodyRect(3850, 1975, 75, 75, 0.2);
        spawn.bodyRect(1600, 1950, 75, 100, 0.2);
        spawn.bodyRect(725, -1650, 150, 100, 0.2);
        spawn.bodyRect(800, -1700, 75, 50, 0.2);

        const spawnRightMobs = () => {
            spawn.randomMob(4200, 100, 1);
            spawn.randomMob(4200, 600, 1);
            spawn.randomMob(2975, 625, 0.5);
            spawn.randomMob(3050, 100, 0.5);
            spawn.randomMob(3400, -100, 0.4);
            spawn.randomMob(3825, -100, 0.4);
            spawn.randomMob(3625, 1950, 0.4);
            spawn.randomMob(3275, 1650, 0.4);
            spawn.randomMob(3075, 1375, 0.3);
            spawn.randomMob(4000, 1650, 0.1);
            spawn.randomMob(4100, 1425, 0);
            spawn.randomGroup(3025, 325, 1);
            spawn.secondaryBossChance(3520, 1169)
        }

        const spawnLeftMobs = () => {
            spawn.randomMob(2375, 1900, 1);
            spawn.randomMob(1825, 1325, 0.5);
            spawn.randomMob(2250, 1050, 0.5);
            spawn.randomMob(1675, 825, 0.4);
            spawn.randomMob(1250, 575, 0.4);
            spawn.randomMob(2400, 575, 0.4);
            spawn.randomMob(1250, 1575, 0.3);
            spawn.randomMob(1075, -100, 0.3);
            spawn.randomMob(2450, -100, 0.2);
            spawn.randomGroup(1350, -775, 1);
            spawn.randomLevelBoss(1491, 495);
        }
        spawn.randomMob(2650, -750, 0.4);
        spawn.randomMob(300, -1725, 0.4);
        spawn.randomMob(750, -1775, 0.4);
        spawn.randomMob(550, -2225, 0.4);
        spawn.randomMob(2700, -475, 0.4);
        spawn.randomMob(2375, -200, 0.2);
        spawn.randomMob(3350, -225, 0.3);
        //spawn.randomHigherTierMob(2676, -424)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    sewers() {
        level.announceMobTypes()
        const button1 = level.button(6600, 2675)
        // const hazard = level.hazard(4550, 2750, 4550, 150)
        const hazard = level.hazard(simulation.isHorizontalFlipped ? -4550 - 4550 : 4550, 2750, 4550, 150)
        let balance1, balance2, balance3, balance4, rotor

        const drip1 = level.drip(6100, 1900, 2900, 100) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip2 = level.drip(7300, 1900, 2900, 150)
        const drip3 = level.drip(8750, 1900, 2900, 70)
        level.custom = () => {
            drip1.draw();
            drip2.draw();
            drip3.draw();
            button1.query();
            button1.draw();
            ctx.fillStyle = "hsl(175, 15%, 76%)"
            ctx.fillRect(9100, 2200, 800, 400)
            ctx.fillStyle = "rgba(0,0,0,0.03)" //shadows
            ctx.fillRect(6250, 2025, 700, 650)
            ctx.fillRect(8000, 2025, 600, 575)
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            rotor.rotate();

            ctx.fillStyle = "#233"
            ctx.beginPath();
            ctx.arc(balance1.center.x, balance1.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance2.center.x, balance2.center.y)
            ctx.arc(balance2.center.x, balance2.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance3.center.x, balance3.center.y)
            ctx.arc(balance3.center.x, balance3.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance4.center.x, balance4.center.y)
            ctx.arc(balance4.center.x, balance4.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance5.center.x, balance5.center.y)
            ctx.arc(balance5.center.x, balance5.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(rotor.center.x, rotor.center.y)
            ctx.arc(rotor.center.x, rotor.center.y, 9, 0, 2 * Math.PI);
            ctx.fill();
            hazard.query();
            hazard.level(button1.isUp)
        };

        level.setPosToSpawn(0, -50); //normal spawn

        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 9700;
        level.exit.y = 2560;
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "hsl(138, 3%, 74%)";
        color.map = "#3d4240"
        powerUps.spawnStartingPowerUps(3475, 1775);
        spawn.debris(4575, 2550, 1600, 9); //16 debris per level
        spawn.debris(7000, 2550, 2000, 7); //16 debris per level

        spawn.mapRect(-500, -600, 200, 800); //left entrance wall
        spawn.mapRect(-400, -600, 3550, 200); //ceiling
        spawn.mapRect(-400, 0, 3000, 200); //floor
        // spawn.mapRect(300, -500, 50, 400); //right entrance wall
        // spawn.bodyRect(312, -100, 25, 100);
        spawn.bodyRect(1450, -300, 150, 50);

        const xPos = [600, 1250, 2000];
        xPos.sort(() => Math.random() - 0.5);
        spawn.mapRect(xPos[0], -200, 300, 100);
        spawn.mapRect(xPos[1], -250, 300, 300);
        spawn.mapRect(xPos[2], -150, 300, 200);

        spawn.bodyRect(3100, 410, 75, 100);
        spawn.bodyRect(2450, -25, 250, 25);

        spawn.mapRect(3050, -600, 200, 800); //right down tube wall
        spawn.mapRect(3100, 0, 1200, 200); //tube right exit ceiling
        spawn.mapRect(4200, 0, 200, 1900);
        spawn.mapVertex(3500, 1000, "-500 -500  -400 -600   400 -600 500 -500   500 500 400 600  -400 600 -500 500");
        spawn.mapVertex(3600, 1940, "-400 -40  -350 -90   350 -90 400 -40   400 40 350 90  -350 90 -400 40");
        spawn.mapRect(3925, 2288, 310, 50);
        spawn.mapRect(3980, 2276, 200, 50);

        spawn.mapRect(2625, 2288, 650, 50);
        spawn.mapRect(2700, 2276, 500, 50);

        spawn.mapRect(2400, 0, 200, 1925); //left down tube wall
        spawn.mapRect(600, 2300, 3750, 200);
        spawn.bodyRect(3800, 275, 125, 125);

        spawn.mapRect(4200, 1700, 5000, 200);
        spawn.mapRect(4150, 2300, 200, 400);

        spawn.mapRect(600, 1700, 2000, 200); //bottom left room ceiling
        spawn.mapRect(500, 1700, 200, 800); //left wall
        spawn.mapRect(675, 1875, 325, 150, 0.5);

        spawn.mapRect(4450, 2900, 4900, 200); //boss room floor
        spawn.mapRect(4150, 2600, 400, 500);
        spawn.mapRect(6250, 2675, 700, 325);
        spawn.mapRect(8000, 2600, 600, 400);
        spawn.bodyRect(5875, 2725, 200, 200);
        spawn.bodyRect(6800, 2490, 50, 50);
        spawn.bodyRect(6800, 2540, 50, 50);
        spawn.bodyRect(6800, 2590, 50, 50);
        spawn.bodyRect(8225, 2225, 100, 100);
        spawn.mapRect(6250, 1875, 700, 150);
        spawn.mapRect(8000, 1875, 600, 150);

        spawn.mapRect(9100, 1700, 900, 500); //exit
        spawn.mapRect(9100, 2600, 900, 500);
        spawn.mapRect(9900, 1700, 200, 1400); //back wall
        // spawn.mapRect(9300, 2150, 50, 250);
        spawn.mapRect(9300, 2590, 650, 25);
        spawn.mapRect(9700, 2580, 100, 50);


        spawn.randomGroup(1300, 2100, 0.1);
        spawn.randomMob(8300, 2100, 0.1);
        spawn.randomSmallMob(2575, -75, 0.1); //entrance
        spawn.randomMob(8125, 2450, 0.1);
        spawn.randomSmallMob(3200, 250, 0.1);
        spawn.randomMob(2425, 2150, 0.1);
        spawn.randomSmallMob(3500, 250, 0.2);
        spawn.randomMob(3800, 2175, 0.2);
        spawn.randomSmallMob(2500, -275, 0.2); //entrance
        spawn.randomMob(4450, 2500, 0.2);
        spawn.randomMob(6350, 2525, 0.2);
        spawn.randomGroup(9200, 2400, 0.3);
        spawn.randomSmallMob(1900, -250, 0.3); //entrance
        spawn.randomMob(1500, 2100, 0.4);
        spawn.randomSmallMob(1700, -150, 0.4); //entrance
        spawn.randomMob(8800, 2725, 0.5);
        spawn.randomMob(7300, 2200, 0.5);
        spawn.randomMob(2075, 2025, 0.5);
        spawn.randomMob(3475, 2175, 0.5);
        spawn.randomMob(8900, 2825, 0.5);
        spawn.randomMob(9600, 2425, 0.9);
        spawn.randomMob(3600, 1725, 0.9);
        spawn.randomMob(4100, 1225, 0.9);
        spawn.randomMob(2825, 400, 0.9);
        spawn.randomLevelBoss(6000, 2300);
        spawn.secondaryBossChance(7725, 2275)
        //spawn.randomHigherTierMob(2431, 2086)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            // rotor(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            // rotor = level.rotor(-5100, 2475, 0.001) //rotates other direction because flipped
            rotor = level.rotor(-5600, 2390, 850, 50, 0.001, 0, 0.01, 0, 0.001) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            balance1 = level.rotor(-300 - 25, -395, 25, 390, 0.001) //entrance
            balance2 = level.rotor(-2605 - 390, 500, 390, 25, 0.001) //falling
            balance3 = level.rotor(-2608 - 584, 1900, 584, 25, 0.001) //falling
            balance4 = level.rotor(-9300 - 25, 2205, 25, 380, 0.001) //exit
            balance5 = level.rotor(-2605 - 390, 1100, 390, 25, 0.001) //falling
            // boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            // boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            // level.setPosToSpawn(300, -700); //-x  // no need since 0
            button1.min.x = -button1.min.x - 126 // flip the button horizontally
            button1.max.x = -button1.max.x + 126 // flip the button horizontally
            drip1.x *= -1
            drip2.x *= -1
            drip3.x *= -1
            level.custom = () => {
                drip1.draw();
                drip2.draw();
                drip3.draw();

                button1.query();
                button1.draw();
                rotor.rotate();

                ctx.fillStyle = "hsl(175, 15%, 76%)"
                ctx.fillRect(-9900, 2200, 800, 400)
                ctx.fillStyle = "rgba(0,0,0,0.03)" //shadows
                ctx.fillRect(-6950, 2025, 700, 650)
                ctx.fillRect(-8600, 2025, 600, 575)
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            // level.customTopLayer = () => {};
        } else {
            // rotor = level.rotor(5100, 2475, -0.001)
            rotor = level.rotor(4700, 2390, 850, 50, 0.001, 0, 0.01, 0, -0.001) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            balance1 = level.rotor(300, -395, 25, 390, 0.001) //entrance
            balance2 = level.rotor(2605, 500, 390, 25, 0.001) //falling
            balance3 = level.rotor(2608, 1900, 584, 25, 0.001) //falling
            balance4 = level.rotor(9300, 2205, 25, 380, 0.001) //exit
            balance5 = level.rotor(2605, 1100, 390, 25, 0.001) //falling
        }

    },
    flocculation() {
        level.announceMobTypes()
        const button0 = level.button(1125, 795)
        const button1 = level.button(6538, 2670)
        const button2 = level.button(1225, -100)
        button0.isUp = true
        button1.isUp = true
        button2.isUp = true
        // const hazard = level.hazard(4550, 2750, 4550, 150)
        const hazard = level.hazard(simulation.isHorizontalFlipped ? -7200 : 675, 50, 7500, 3000) //1869
        // hazard.min.y = 3000 //REMOVE THIS IN LIVE VERSION!!!!!   set slime to lowest level
        let balance1, balance2, balance3, rotor1, rotor2

        const drip1 = level.drip(6100, 1900, 2900, 100) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip2 = level.drip(7300, 1900, 2900, 150)
        const drip3 = level.drip(8750, 1900, 2900, 70)

        //up mode triggered by player contact
        const elevator0 = level.elevator(700, 1865, 200, 490, 1400, 0.011, { up: 0.01, down: 0.7 })
        const elevator1 = level.elevator(3995, 2335, 210, 150, 1700, 0.011, { up: 0.01, down: 0.7 })

        level.custom = () => {
            drip1.draw();
            drip2.draw();
            drip3.draw();
            if (button0.isUp) {
                button0.query();
                if (!button0.isUp) {  //summon second set of mobs
                    //1 boss, 1-2 groups, 11 mobs (all on lower ground level, where the slime is leaving)
                    spawn.randomMob(918, 2695, 0);
                    spawn.randomMob(1818, 2719, 0.1);
                    spawn.randomMob(2530, 2460, 0.1);
                    spawn.randomMob(3109, 2665, 0.2);
                    spawn.randomMob(3909, 2191, 0.2);
                    spawn.randomMob(4705, 2711, 0.3);
                    spawn.randomMob(5800, 2796, 0.3);
                    spawn.randomMob(7287, 2757, 0.4);
                    spawn.randomMob(5759, 2691, 0.4);
                    spawn.randomMob(5675, 2225, 0.5);
                    spawn.randomMob(7450, 2775, 0.5);
                    spawn.randomGroup(6600, 2400, 0.1);
                    spawn.randomLevelBoss(6076, 2341);
                }
            }
            button0.draw();
            if (button1.isUp) button1.query();
            button1.draw();
            if (button2.isUp) button2.query();
            button2.draw();
            ctx.fillStyle = "hsl(175, 15%, 76%)"
            ctx.fillRect(7625, 2625, 400, 300)
            ctx.fillStyle = "rgba(0,0,0,0.03)" //shadows
            ctx.fillRect(6250, 1875, 700, 875)
            ctx.fillRect(900, 1200, 600, 1725) //900, 1350, 600, 1600);
            ctx.fillRect(3000, 1200, 1000, 1750);
            ctx.fillRect(2200, 625, 400, 2050);

            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            elevator0.moveOnTouch()
            elevator1.moveOnTouch()
            rotor1.rotate();
            rotor2.rotate();

            ctx.fillStyle = "#233"
            ctx.beginPath();
            ctx.arc(balance1.center.x, balance1.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance2.center.x, balance2.center.y)
            ctx.arc(balance2.center.x, balance2.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance3.center.x, balance3.center.y)
            ctx.arc(balance3.center.x, balance3.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(balance5.center.x, balance5.center.y)
            ctx.arc(balance5.center.x, balance5.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(rotor1.center.x, rotor1.center.y)
            ctx.arc(rotor1.center.x, rotor1.center.y, 9, 0, 2 * Math.PI);
            ctx.moveTo(rotor2.center.x, rotor2.center.y)
            ctx.arc(rotor2.center.x, rotor2.center.y, 9, 0, 2 * Math.PI);
            ctx.fill();
            hazard.query();
            const drainRate = Math.max(1, 4 - hazard.min.y / 800)
            hazard.level(
                (button2.isUp || hazard.height < 1150) &&
                (button0.isUp || hazard.height < 350) &&
                button1.isUp
                , drainRate) //true = hold,  false = lower
            exitDoor.isClosing = hazard.min.y < 2900
            exitDoor.openClose();
            exitDoor.draw();
        };

        level.setPosToSpawn(0, -50); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 7800;
        level.exit.y = 2865;
        const exitDoor = level.door(7637, 2680, 25, 225, 195, 5)

        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "hsl(138, 3%, 74%)";
        color.map = "#3d4240"
        powerUps.spawnStartingPowerUps(3475, 1775);
        spawn.debris(4575, 2550, 1600, 6); //16 debris per level
        spawn.debris(750, 2550, 2250, 6); //16 debris per level

        spawn.mapRect(-500, -600, 200, 800); //left entrance wall
        spawn.mapRect(-400, -600, 3550, 200); //ceiling
        spawn.mapRect(-400, 0, 1400, 600);

        spawn.mapRect(575, 475, 250, 250);
        Matter.Body.setAngle(map[map.length - 1], map[map.length - 1].angle - Math.PI / 4);
        spawn.mapRect(4075, 75, 250, 250);
        Matter.Body.setAngle(map[map.length - 1], map[map.length - 1].angle - Math.PI / 4);
        spawn.mapRect(4259, 1559, 282.5, 282.5);
        Matter.Body.setAngle(map[map.length - 1], map[map.length - 1].angle - Math.PI / 4);

        spawn.mapRect(3140, -600, 200, 800); //right down tube wall
        spawn.mapRect(3150, 0, 1200, 200); //tube right exit ceiling
        spawn.mapVertex(2400, 500, "-200 -100  -100 -200   100 -200 200 -100   200 200   -200 200");
        spawn.mapVertex(2400, 1200, "-200  -200  200 -200    200 100 100 200  -100 200 -200 100");
        spawn.mapVertex(1200, 2150, "-300 -300   300 -300   300 200 200 300  -200 300 -300 200");
        spawn.mapVertex(1200, 1100, "-300 -200  -200 -300   200 -300 300 -200   300 300  -300 300");
        spawn.mapVertex(3500, 950, "-500 -450  -400 -550   400 -550 500 -450   500 450 400 550  -400 550 -500 450");
        spawn.mapVertex(3500, 1990, "-300 -40  -230 -110   230 -110 300 -40   300 40 230 110  -230 110 -300 40");
        // spawn.mapVertex(2400, 1940, "-200 -40  -150 -90   150 -90 200 -40   200 40 150 90  -150 90 -200 40");
        spawn.mapRect(2200, 1850, 400, 200);
        spawn.bodyRect(3825, 2240, 150, 75, 0.5);

        spawn.mapVertex(3500, 2452, "-500 -135    500 -135    500 35 400 135  -400 135 -500 35");
        spawn.mapVertex(1200, 2850, "-500 -100 -550 -50     500 -100 550 -50   550 300   -550 300");
        // spawn.mapVertex(1200, 2875, "-400 0  -300 -100   300 -100   400 0");

        spawn.mapVertex(1317, 275, "-500 0  -300 -200     300 -200 550 50     550  500    -500 500");
        spawn.mapVertex(1300, -357, "-300 0  -400 -100     400 -100 300 0");
        spawn.bodyRect(1550, -308, 50, 208, 0.5);
        spawn.bodyRect(2000, 965, 525, 25, 0.5);
        spawn.mapVertex(2400, 2850, "-350 -50  -300 -100     300 -100 350 -50   350 300   -350 300");
        spawn.mapVertex(6600, 1925, "-350 0  -450 -100     450 -100 350 0");
        spawn.mapVertex(6600, 2875, "-400 -50  -350 -100     350 -100 400 -50   400 300   -400 300");

        spawn.bodyRect(2375, 300, 100, 100, 0.6);
        spawn.bodyRect(1025, 1775, 100, 75, 0.6);
        spawn.bodyRect(1250, 1825, 50, 25, 0.6);
        spawn.bodyRect(3700, 275, 125, 125, 0.6);
        spawn.bodyRect(5875, 2725, 200, 200, 0.6);
        spawn.bodyRect(6900, 2590, 50, 50, 0.6);
        spawn.mapRect(4200, 2325, 250, 625);
        spawn.mapRect(-500, 50, 1200, 3050);
        spawn.mapRect(-500, 2900, 9600, 775);

        spawn.mapRect(4400, 0, 4700, 1900);
        spawn.mapRect(4200, 0, 200, 1700);
        // spawn.mapRect(6250, 2675, 700, 325);
        // spawn.mapRect(6250, 1875, 700, 150);

        //exit room
        spawn.mapRect(8000, 1775, 1100, 1375);
        spawn.mapRect(7625, 1825, 450, 825);
        spawn.mapRect(7625, 2625, 50, 75);
        spawn.mapRect(7625, 2890, 400, 25);
        spawn.mapRect(7800, 2880, 100, 25);

        spawn.randomMob(2450, 250, 0);
        spawn.randomMob(3250, 325, 0);
        spawn.randomMob(3625, 350, 0.1);
        spawn.randomMob(1750, -25, 0.1);
        spawn.randomMob(1300, 1750, 0.2);
        spawn.randomMob(2350, 1725, 0.2);
        spawn.randomMob(3350, 1775, 0.2);
        spawn.randomMob(1025, 750, 0.3);
        spawn.randomMob(2400, 1775, 0.3);
        spawn.randomMob(1250, 1725, 0.3);
        spawn.randomMob(775, 1775, 0.4);
        spawn.secondaryBossChance(1822, 1336)
        //spawn.randomHigherTierMob(6577, 2511)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            rotor1 = level.rotor(-5600, 2390, 850, 50, 0.001, 0, 0.01, 0, 0.001) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            rotor2 = level.rotor(-2175, 1900, 650, 50, 0.001, 0, 0.01, 0, 0.0007)

            balance1 = level.rotor(-800 - 25, -395, 25, 390, 0.001) //entrance
            balance2 = level.rotor(-2605 - 390, 500, 390, 25, 0.001) //falling
            balance3 = level.rotor(-2608 - 400, 1950, 400, 25, 0.001) //falling
            balance5 = level.rotor(-2605 - 390, 1020, 390, 25, 0.001) //falling

            button1.min.x = -button1.min.x - 126
            button1.max.x = -button1.max.x + 126
            button0.min.x = -button0.min.x - 126
            button0.max.x = -button0.max.x + 126
            button2.min.x = -button2.min.x - 126
            button2.max.x = -button2.max.x + 126 // flip the button horizontally
            drip1.x *= -1
            drip2.x *= -1
            drip3.x *= -1
            elevator0.holdX *= -1
            elevator1.holdX *= -1
            // console.log(hazard)
            hazard.min.x -= 840
            hazard.max.x -= 840

            level.custom = () => {
                drip1.draw();
                drip2.draw();
                drip3.draw();

                if (button0.isUp) {
                    button0.query();
                    if (!button0.isUp) {  //summon second set of mobs
                        //1 boss, 1-2 groups, 11 mobs (all on lower ground level, where the slime is leaving)
                        spawn.randomMob(-7475, 2800, 0);
                        spawn.randomMob(-6475, 2500, 0.1);
                        spawn.randomMob(-4575, 2775, 0.2);
                        spawn.randomMob(-7575, 2850, 0.2);
                        spawn.randomMob(-6425, 2575, 0.2);
                        spawn.randomMob(-5750, 2775, 0.3);
                        spawn.randomMob(-4675, 2800, 0.3);
                        spawn.randomMob(-3425, 2800, 0.4);
                        spawn.randomMob(-2475, 2475, 0.4);
                        spawn.randomMob(-3350, 2250, 0.5);
                        spawn.randomMob(-1275, 2725, 0.5);
                        spawn.randomGroup(-6225, 2400, 0.1);
                        spawn.randomLevelBoss(-6250, 2350);
                    }
                }
                button0.draw();
                if (button1.isUp) button1.query();
                button1.draw();
                if (button2.isUp) button2.query();
                button2.draw();
                rotor1.rotate();
                rotor2.rotate();
                ctx.fillStyle = "hsl(175, 15%, 76%)"
                ctx.fillRect(-8025, 2625, 400, 300)
                ctx.fillStyle = "rgba(0,0,0,0.03)" //shadows
                ctx.fillRect(-6950, 1875, 700, 875)
                ctx.fillRect(-4000, 1400, 1000, 1550);
                ctx.fillRect(-2600, 675, 400, 2025);
                ctx.fillRect(-1500, 1375, 600, 1500);

                level.exit.drawAndCheck();
                level.enter.draw();
            };
            // level.customTopLayer = () => {};
        } else {
            rotor1 = level.rotor(4700, 2390, 850, 50, 0.001, 0, 0.01, 0, -0.001) //balance(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
            rotor2 = level.rotor(1525, 1900, 650, 50, 0.001, 0, 0.01, 0, -0.0007)
            balance1 = level.rotor(800, -395, 25, 390, 0.001) //entrance
            balance2 = level.rotor(2605, 500, 390, 25, 0.001) //falling
            balance3 = level.rotor(2608, 1950, 400, 25, 0.001) //falling
            balance5 = level.rotor(2605, 1020, 390, 25, 0.001) //falling
        }

    },
    satellite() {
        level.announceMobTypes()
        level.fallMode = "start";
        const boost1 = level.boost(5825, 235, 1400)
        const elevator = level.elevator(4210, -1265, 380, 50, -3450) //, 0.003, { up: 0.01, down: 0.2 }
        level.custom = () => {
            boost1.query();

            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(-250, -750, 420, 450)
            ctx.fillStyle = "#d0d4d6"
            ctx.fillRect(-300, -1900, 500, 1100)
            ctx.fillRect(900, -2450, 450, 2050)
            ctx.fillRect(2000, -2800, 450, 2500)
            ctx.fillRect(3125, -3100, 450, 3300)
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,20,40,0.25)"
            ctx.fillRect(-250, -400, 1800, 775)
            ctx.fillRect(1800, -275, 850, 775)
            ctx.fillRect(5200, 125, 450, 200)
            ctx.fillStyle = "rgba(0,20,40,0.1)"
            ctx.fillRect(4000, -1200, 1050, 1500)
            ctx.fillRect(4100, -3450, 600, 2250)
            elevator.move()
        };

        level.setPosToSpawn(-100, 210); //normal spawn
        spawn.mapRect(-150, 240, 100, 30);
        level.exit.x = -100;
        level.exit.y = -425;
        spawn.mapRect(level.exit.x, level.exit.y + 15, 100, 50); //exit bump

        level.defaultZoom = 1700 // 4500 // 1400
        simulation.zoomTransition(level.defaultZoom)

        powerUps.spawnStartingPowerUps(4900, -500); //1 per level
        spawn.debris(1000, 20, 1800, 6); //16 debris per level
        // spawn.debris(4830, -1330, 850, 3); //16 debris per level
        // spawn.debris(3035, -3900, 1500, 3); //16 debris per level

        document.body.style.backgroundColor = "#dbdcde";

        //spawn start building
        spawn.mapRect(-350, -800, 100, 1100);
        // spawn.mapRect(-300, -10, 500, 50);
        spawn.mapRect(150, -510, 50, 365);
        spawn.bodyRect(170, -140, 20, 163, 1, spawn.propsFriction); //door to starting room
        spawn.mapVertex(175, 200, "625 0   300 0   425 -300   500 -300"); //entrance ramp
        // spawn.mapRect(-300, 0, 1000, 300); //ground
        spawn.mapRect(-350, 250, 6350, 300); //deeper ground
        spawn.bodyRect(2100, 50, 80, 80);
        spawn.bodyRect(2000, 50, 60, 60);
        // spawn.bodyRect(1650, 50, 300, 200);
        // spawn.mapRect(1800, Math.floor(Math.random() * 200), 850, 300); //stops above body from moving to right
        spawn.mapVertex(2225, 250, "575 0  -575 0  -450 -100  450 -100"); //base

        //exit building
        // spawn.mapRect(-100, -410, 100, 30);
        spawn.mapRect(-350, -850, 550, 100);
        spawn.mapRect(150, -800, 50, 110);
        spawn.bodyRect(170, -690, 14, 180, 1, spawn.propsFriction); //door to exit room
        spawn.mapRect(-300, -400, 500, 150); //far left starting ceiling

        //tall platform above exit
        spawn.mapRect(-500, -1900, 400, 50); //super high shade
        spawn.mapRect(0, -1900, 400, 50); //super high shade
        spawn.mapRect(-150, -1350, 200, 25); //super high shade
        spawn.bodyRect(140, -2100, 150, 200); //shield from laser

        //tall platform
        spawn.mapVertex(1125, -450, "325 0  250 80  -250 80  -325 0  -250 -80  250 -80"); //base
        spawn.mapRect(150, -500, 1410, 100); //far left starting ceiling
        spawn.mapRect(625, -2450, 1000, 50); //super high shade
        spawn.bodyRect(1300, -3600, 150, 150); //shield from laser
        //tall platform
        spawn.mapVertex(2225, -250, "325 0  250 80  -250 80  -325 0  -250 -80  250 -80"); //base
        spawn.mapRect(1725, -2800, 1000, 50); //super high shade
        spawn.mapRect(1790, -300, 870, 100); //far left starting ceiling
        spawn.bodyRect(2400, -2950, 150, 150); //shield from laser

        //tall platform
        spawn.mapVertex(3350, 175, "425 0  -425 0  -275 -300  275 -300"); //base
        spawn.bodyRect(3350, -150, 200, 120);
        spawn.mapRect(2850, -3150, 1000, 50); //super high shade
        spawn.bodyRect(3675, -3470, 525, 20); //plank
        spawn.bodyRect(3600, -3450, 200, 300); //plank support block

        //far right structure
        spawn.mapRect(5200, -725, 100, 870);
        spawn.mapRect(5300, -1075, 350, 1220);

        //structure bellow tall stairs
        spawn.mapRect(3900, -300, 450, 50);
        spawn.mapRect(4675, -375, 450, 50);

        // spawn.mapRect(4000, -1300, 1050, 100);
        spawn.mapRect(4000, -1300, 200, 100);
        spawn.mapRect(4600, -1300, 450, 100);

        //steep stairs
        spawn.mapRect(4100, -2250, 100, 650);
        spawn.mapRect(4100, -3450, 100, 850); //left top shelf
        spawn.mapRect(4600, -3450, 100, 1850);

        //steps up and down
        spawn.mapVertex(4525, 250, "-650 0  -625 -20  625 -20  650 0");
        spawn.mapVertex(4525, 237, "-550 0  -525 -20  525 -20  550 0");
        // spawn.mapVertex(4525, 225, "-400 0  -375 -20  375 -20  400 0");

        spawn.randomSmallMob(4400, -3500);
        spawn.randomSmallMob(4800, -800);
        spawn.randomMob(800, -2600);
        spawn.randomMob(700, -600, 0.3);
        spawn.randomMob(3100, -3600, 0.3);
        spawn.randomMob(3300, -1000, 0.3);
        spawn.randomMob(4200, -250, 0.3);
        spawn.randomMob(4900, -1500, 0.3);
        spawn.randomMob(3800, 175, 0.4);
        spawn.randomMob(5750, 125, 0.4);
        spawn.randomMob(5900, -1500, 0.4);
        spawn.randomMob(4700, -800, 0.4);
        spawn.randomMob(1400, 200, 0.3);
        spawn.randomMob(2850, 175, 0.4);
        spawn.randomMob(2000, -2800, 0.4);
        spawn.randomMob(2400, -400, 0.4);
        spawn.randomMob(4475, -3550, 0.3);
        spawn.randomGroup(5000, -2150, 1);
        spawn.randomGroup(3700, -4100, 0.3);
        spawn.randomGroup(2700, -1600, 0.1);
        spawn.randomGroup(1600, -100, 0);
        spawn.randomGroup(5000, -3900, -0.3);


        if (simulation.difficultyMode > 1 || level.levelsCleared > 1) {
            if (Math.random() < 0.25) {
                spawn.randomLevelBoss(2800, -1400);
            } else if (Math.random() < 0.25) {
                spawn.laserBoss(2900 + 300 * Math.random(), -2950 + 150 * Math.random());
            } else if (Math.random() < 0.33) {
                spawn.laserBoss(1800 + 250 * Math.random(), -2600 + 150 * Math.random());
            } else if (Math.random() < 0.5) {
                spawn.laserBoss(3500 + 250 * Math.random(), -2600 + 1000 * Math.random());
            } else {
                spawn.laserBoss(600 + 200 * Math.random(), -2150 + 250 * Math.random());
            }
        } else {
            powerUps.spawnBossPowerUp(2800, -1400)
        }

        spawn.secondaryBossChance(3950, -850)
        //spawn.randomHigherTierMob(5038, 100)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            level.setPosToSpawn(100, 210); //-x
            elevator.holdX = -elevator.holdX // flip the elevator horizontally
            level.custom = () => {
                boost1.query();
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(250 - 420, -750, 420, 450)
                ctx.fillStyle = "#d0d4d6"
                ctx.fillRect(300 - 500, -1900, 500, 1100)
                ctx.fillRect(-900 - 450, -2450, 450, 2050)
                ctx.fillRect(-2000 - 450, -2800, 450, 2500)
                ctx.fillRect(-3125 - 450, -3100, 450, 3300)
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                elevator.move()
                ctx.fillStyle = "rgba(0,20,40,0.25)"
                ctx.fillRect(250 - 1800, -400, 1800, 775)
                ctx.fillRect(-1800 - 850, -275, 850, 775)
                ctx.fillRect(-5200 - 450, 125, 450, 200)
                ctx.fillStyle = "rgba(0,20,40,0.1)"
                ctx.fillRect(-4000 - 1050, -1200, 1050, 1500)
                ctx.fillRect(-4100 - 600, -3450, 600, 2250)
            };
        }
    },
    rooftops() {
        level.announceMobTypes()

        // level.fallPosition = { x: 5000, y:-4000}
        const elevator = level.elevator(1450, -990, 235, 45, -2000)
        const boost1 = level.boost(4950, 0, 1100)

        level.custom = () => {
            boost1.query();
            elevator.move();
            elevator.drawTrack();
            ctx.fillStyle = "#d4f4f4"
            if (isBackwards) {
                ctx.fillRect(-650, -2300, 440, 300)
            } else {
                ctx.fillRect(3460, -700, 1090, 800)
            }
            level.exit.drawAndCheck();
            level.enter.draw();
        };

        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(710, -2225, 580, 225)
            ctx.fillRect(3510, -1550, 330, 300)
            ctx.fillRect(1735, -900, 1515, 1900)
            ctx.fillRect(1735, -1550, 1405, 550)
            ctx.fillRect(1860, -1950, 630, 350)
            ctx.fillRect(-700, -1950, 2100, 2950)
            ctx.fillRect(3400, 100, 2150, 900)
            ctx.fillRect(4550, -725, 900, 725)
            ctx.fillRect(3460, -1250, 1080, 550)
            if (isBackwards) {
                ctx.fillRect(3460, -700, 1090, 800)
            } else {
                ctx.fillRect(-650, -2300, 440, 300)
            }
        };

        level.defaultZoom = 1700
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#dcdcde";



        // level.fallMode = "start";
        let isBackwards = false
        if (Math.random() < 0.75) {
            //normal direction start in top left
            level.setPosToSpawn(-450, -2060);
            level.exit.x = 3600;
            level.exit.y = -300;
            spawn.mapRect(3600, -285, 100, 50); //ground bump wall
            //mobs that spawn in exit room
            spawn.bodyRect(4850, -750, 300, 25, 0.6); //
            spawn.randomSmallMob(4100, -100);
            spawn.randomSmallMob(4600, -100);
            spawn.randomMob(3765, -450, 0.3);
        } else {
            isBackwards = true
            //reverse direction, start in bottom right
            level.setPosToSpawn(3650, -325);
            level.exit.x = -550;
            level.exit.y = -2030;
            spawn.mapRect(-550, -2015, 100, 50); //ground bump wall
        }
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

        spawn.debris(1650, -1800, 3800, 16); //16 debris per level
        powerUps.spawnStartingPowerUps(2450, -1675);

        //spawn.mapRect(-700, 0, 6250, 100); //ground
        spawn.mapRect(3400, 0, 2150, 100); //ground
        spawn.mapRect(-700, -2000, 2125, 50); //Top left ledge
        spawn.bodyRect(1300, -2125, 50, 125, 0.8);
        spawn.bodyRect(1307, -2225, 50, 100, 0.8);
        spawn.mapRect(-700, -2350, 50, 400); //far left starting left wall
        spawn.mapRect(-700, -2010, 500, 50); //far left starting ground
        spawn.mapRect(-700, -2350, 500, 50); //far left starting ceiling
        spawn.mapRect(-250, -2350, 50, 200); //far left starting right part of wall
        spawn.bodyRect(-240, -2150, 30, 36); //door to starting room
        spawn.bodyRect(-240, -2115, 30, 36); //door to starting room
        spawn.bodyRect(-240, -2080, 30, 35); //door to starting room
        spawn.bodyRect(-240, -2045, 30, 35); //door to starting room
        spawn.mapRect(1850, -2000, 650, 50);
        spawn.bodyRect(200, -2150, 80, 220, 0.8);
        spawn.mapRect(700, -2275, 600, 50);
        spawn.mapRect(1000, -1350, 410, 50);
        spawn.bodyRect(1050, -2350, 30, 30, 0.8);
        // spawn.bodyRect(1625, -1100, 100, 75);
        // spawn.bodyRect(1350, -1025, 400, 25); // ground plank
        spawn.mapRect(-725, -1000, 2150, 100); //lower left ledge
        spawn.bodyRect(350, -1100, 200, 100, 0.8);
        spawn.bodyRect(370, -1200, 100, 100, 0.8);
        spawn.bodyRect(360, -1300, 100, 100, 0.8);
        spawn.bodyRect(950, -1050, 300, 50, 0.8);
        spawn.bodyRect(-575, -1150, 125, 150, 0.8);
        spawn.mapRect(1710, -1000, 1565, 100); //middle ledge
        spawn.mapRect(3400, -1000, 75, 25);
        spawn.bodyRect(2600, -1950, 100, 250, 0.8);
        spawn.bodyRect(2700, -1125, 125, 125, 0.8);
        spawn.bodyRect(2710, -1250, 125, 125, 0.8);
        spawn.bodyRect(2705, -1350, 75, 100, 0.8);
        spawn.mapRect(3500, -1600, 350, 50);
        spawn.mapRect(1725, -1600, 1435, 50);
        spawn.bodyRect(3100, -1015, 375, 15);
        spawn.bodyRect(3500, -850, 75, 125, 0.8);
        spawn.mapRect(3450, -1000, 50, 580); //left building wall
        spawn.bodyRect(3460, -420, 30, 144);
        spawn.mapRect(5450, -775, 100, 875); //right building wall
        spawn.bodyRect(3925, -1400, 100, 150, 0.8);
        spawn.mapRect(3450, -1250, 1090, 50);
        // spawn.mapRect(3450, -1225, 50, 75);
        spawn.mapRect(4500, -1250, 50, 415);
        spawn.mapRect(3450, -725, 1500, 50);
        spawn.mapRect(5100, -725, 400, 50);
        spawn.mapRect(4500, -735, 50, 635);
        spawn.bodyRect(4500, -100, 50, 100);
        spawn.mapRect(4500, -885, 100, 50);
        spawn.spawnStairs(3800, 0, 3, 150, 206); //stairs top exit
        spawn.mapRect(3400, -275, 450, 275); //exit platform

        spawn.randomSmallMob(2200, -1775);
        spawn.randomSmallMob(4000, -825);
        spawn.randomSmallMob(-350, -3400);
        spawn.randomMob(4250, -1350, 0.8);
        spawn.randomMob(2550, -1350, 0.8);
        spawn.randomMob(1875, -1075, 0.3);
        spawn.randomMob(1120, -1200, 0.3);
        spawn.randomMob(3000, -1150, 0.2);
        spawn.randomMob(3200, -1150, 0.3);
        spawn.randomMob(3300, -1750, 0.3);
        spawn.randomMob(3650, -1350, 0.3);
        spawn.randomMob(3600, -1800, 0.1);
        spawn.randomMob(5200, -100, 0.3);
        spawn.randomMob(5275, -900, 0.2);
        spawn.randomMob(0, -1075, 0.3);
        spawn.randomGroup(600, -1575, 0);
        spawn.randomGroup(2225, -1325, 0.4);
        spawn.randomGroup(4900, -1200, 0);
        spawn.randomLevelBoss(3200, -1900);
        spawn.secondaryBossChance(2175, -2425)
        //spawn.randomHigherTierMob(4425, -1400);

        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit

            boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            elevator.holdX = -elevator.holdX // flip the elevator horizontally

            if (isBackwards) {
                level.setPosToSpawn(-3650, -325); //-x
            } else {
                level.setPosToSpawn(450, -2060); //-x
            }
            level.custom = () => {
                boost1.query();
                elevator.move();
                elevator.drawTrack();

                ctx.fillStyle = "#d4f4f4"
                if (isBackwards) {
                    ctx.fillRect(650 - 440, -2300, 440, 300)
                } else {
                    ctx.fillRect(-3460 - 1090, -700, 1090, 800)
                }
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-710 - 580, -2225, 580, 225)
                ctx.fillRect(-3510 - 330, -1550, 330, 300)
                ctx.fillRect(-1735 - 1515, -900, 1515, 1900)
                ctx.fillRect(-1735 - 1405, -1550, 1405, 550)
                ctx.fillRect(-1860 - 630, -1950, 630, 350)
                ctx.fillRect(700 - 2100, -1950, 2100, 2950)
                ctx.fillRect(-3400 - 2150, 100, 2150, 900)
                ctx.fillRect(-4550 - 900, -725, 900, 725)
                ctx.fillRect(-3460 - 1080, -1250, 1080, 550)
                if (isBackwards) {
                    ctx.fillRect(-3460 - 1090, -700, 1090, 800)
                } else {
                    ctx.fillRect(650 - 440, -2300, 440, 300)
                }
            };
        }
        level.fallMode = "position"; //must set level.fallModeBounds in this mode to prevent player getting stuck left or right
        if (level.enter.x > level.exit.x) {
            level.fallModeBounds = { left: level.exit.x, right: level.enter.x } //used with level.fallMode = "position";
        } else {
            level.fallModeBounds = { left: level.enter.x, right: level.exit.x } //used with level.fallMode = "position";
        }
    },
    aerie() {
        level.announceMobTypes()
        level.fallMode = "start";
        const boost1 = level.boost(-425, 100, 1400)
        const boost2 = level.boost(5350, 275, 2850);

        level.custom = () => {
            boost1.query();
            boost2.query();
            if (backwards) {
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(-275, -1275, 425, 300)
            } else {
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(3750, -3650, 550, 400)
            }
            ctx.fillStyle = "#c7c7ca"
            ctx.fillRect(4200, -2200, 100, 2600)
            // ctx.fillStyle = "#c7c7ca"
            ctx.fillRect(-100, -1000, 1450, 1400)
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            if (backwards) {
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(3750, -3650, 550, 400)
            } else {
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-275, -1275, 425, 300)
            }
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(3700, -3150, 1100, 950)
            ctx.fillRect(2000, -1110, 450, 1550)

            ctx.fillStyle = "rgba(0,0,0,0.04)"
            ctx.beginPath()
            ctx.moveTo(-100, -900)
            ctx.lineTo(300, -900)
            ctx.lineTo(150, 100)
            ctx.lineTo(-100, 100)

            ctx.moveTo(600, -900)
            ctx.lineTo(1350, -900)
            ctx.lineTo(1350, 100)
            ctx.lineTo(750, 100)
            ctx.fill()
        };

        level.defaultZoom = 2100
        simulation.zoomTransition(level.defaultZoom)

        const backwards = (Math.random() < 0.25 && simulation.difficulty > 8) ? true : false;
        if (backwards) {
            level.setPosToSpawn(4000, -3300); //normal spawn
            level.exit.x = -100;
            level.exit.y = -1025;
        } else {
            level.setPosToSpawn(-50, -1050); //normal spawn
            level.exit.x = 3950;
            level.exit.y = -3275;
        }

        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        spawn.mapRect(level.exit.x, level.exit.y + 15, 100, 20);

        powerUps.spawnStartingPowerUps(1075, -550);
        document.body.style.backgroundColor = "#dcdcde";

        // starting room
        spawn.mapRect(-300, -1000, 600, 100);
        spawn.mapRect(-300, -1300, 450, 50);
        spawn.mapRect(-300, -1300, 50, 350);
        if (!backwards) spawn.bodyRect(100, -1250, 200, 240); //remove on backwards
        //left building
        spawn.mapRect(-100, -975, 100, 975);
        spawn.mapRect(-500, 100, 1950, 400);
        spawn.mapRect(600, -1000, 750, 100);
        spawn.mapRect(900, -500, 550, 100);
        spawn.mapRect(1250, -975, 100, 375);
        spawn.bodyRect(1250, -600, 100, 100, 0.7);
        spawn.mapRect(1250, -450, 100, 450);
        spawn.bodyRect(1250, -1225, 100, 200, 0.7); //remove on backwards
        spawn.bodyRect(1200, -1025, 350, 35); //remove on backwards
        //middle super tower
        if (backwards) {
            spawn.bodyRect(2000, -800, 700, 35);
        } else {
            spawn.bodyRect(1750, -800, 700, 35);
        }
        spawn.mapVertex(2225, -2100, "0 0 450 0 300 -2500 150 -2500")
        spawn.mapRect(2000, -700, 450, 300);
        spawn.bodyRect(2360, -450, 100, 300, 0.6);
        spawn.mapRect(2000, -75, 450, 275);
        spawn.bodyRect(2450, 150, 150, 150, 0.4);
        spawn.mapRect(1550, 300, 4600, 200); //ground
        // spawn.mapRect(6050, -700, 450, 1200);
        spawn.mapRect(6050, -1060, 450, 1560);
        spawn.mapVertex(6275, -2100, "0 0 450 0 300 -2500 150 -2500")

        //right tall tower
        spawn.mapRect(3700, -3200, 100, 800);
        spawn.mapRect(4700, -2910, 100, 510);
        spawn.mapRect(3700, -2600, 300, 50);
        spawn.mapRect(4100, -2900, 900, 50);
        spawn.mapRect(3450, -2300, 750, 100);
        spawn.mapRect(4300, -2300, 750, 100);
        spawn.mapRect(4150, -1600, 200, 25);
        spawn.mapRect(4150, -700, 200, 25);
        //exit room on top of tower
        spawn.mapRect(3700, -3700, 600, 50);
        spawn.mapRect(3700, -3700, 50, 500);
        spawn.mapRect(4250, -3700, 50, 300);
        spawn.mapRect(3700, -3250, 1100, 100);

        spawn.randomGroup(350, -500, 1)
        spawn.randomSmallMob(-225, 25);
        spawn.randomSmallMob(2100, -900);

        spawn.randomSmallMob(4000, -250);
        spawn.randomSmallMob(4450, -3000);
        spawn.randomSmallMob(5600, 100);
        spawn.randomMob(4275, -2600, 0.8);
        spawn.randomMob(1050, -700, 0.8)
        spawn.randomMob(6050, -850, 0.7);
        spawn.randomMob(2150, -300, 0.6)
        spawn.randomMob(3900, -2700, 0.8);
        spawn.randomMob(3600, -500, 0.8);
        spawn.randomMob(3400, -200, 0.8);
        // spawn.randomMob(1650, -1300, 0.7)
        spawn.randomMob(425, 0, 0.7);
        spawn.randomMob(4100, -50, 0.7);
        spawn.randomMob(4100, -50, 0.5);
        spawn.randomMob(1700, -50, 0.3)
        spawn.randomMob(2350, -900, 0.3)
        spawn.randomMob(4700, -150, 0.2);
        spawn.randomGroup(4000, -350, 0.6);
        spawn.randomGroup(2750, -550, 0.1);
        spawn.randomMob(2175, -925, 0.5);
        spawn.randomMob(2750, 100, 0.5);
        spawn.randomMob(4250, -1725, 0.5);
        spawn.randomMob(3575, -2425, 0.5);
        spawn.randomMob(3975, -3900, 0.5);
        spawn.randomMob(1725, 125, 0.5);


        if (simulation.difficultyMode > 1 || level.levelsCleared > 1) {
            if (Math.random() < 0.5) {
                spawn.randomLevelBoss(4250, -250);
                spawn.debris(-250, 50, 1650, 2); //16 debris per level
                spawn.debris(2475, 0, 750, 2); //16 debris per level
                spawn.debris(3450, 0, 2000, 16); //16 debris per level
                spawn.debris(3500, -2350, 1500, 2); //16 debris per level
            } else {
                powerUps.chooseRandomPowerUp(4000, 200);
                powerUps.chooseRandomPowerUp(4000, 200);
                //floor below right tall tower
                spawn.bodyRect(3000, 50, 150, 250, 0.9);
                spawn.bodyRect(4500, -500, 300, 250, 0.7);
                spawn.bodyRect(3500, -100, 100, 150, 0.7);
                spawn.bodyRect(4200, -500, 110, 30, 0.7);
                spawn.bodyRect(3800, -500, 150, 130, 0.7);
                spawn.bodyRect(4000, 50, 200, 150, 0.9);
                spawn.bodyRect(4500, 50, 300, 200, 0.9);
                spawn.bodyRect(4200, -350, 200, 50, 0.9);
                spawn.bodyRect(4700, -350, 50, 200, 0.9);
                spawn.bodyRect(4900, -100, 300, 300, 0.7);
                spawn.suckerBoss(4500, -400);
            }
        } else {
            powerUps.spawnBossPowerUp(2800, -1400)
        }

        spawn.secondaryBossChance(5350, -325)
        //spawn.randomHigherTierMob(4437, -2466)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit

            boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            boost2.boostBounds.min.x = -boost2.boostBounds.min.x - 100
            boost2.boostBounds.max.x = -boost2.boostBounds.max.x + 100


            if (backwards) {
                level.setPosToSpawn(-4000, -3300); //-x
            } else {
                level.setPosToSpawn(50, -1050); //-x
            }
            level.custom = () => {
                boost1.query();
                boost2.query();
                if (backwards) {
                    ctx.fillStyle = "#d4f4f4"
                    ctx.fillRect(275 - 425, -1275, 425, 300)
                } else {
                    ctx.fillStyle = "#d4f4f4"
                    ctx.fillRect(-3750 - 550, -3650, 550, 400)
                }
                ctx.fillStyle = "#c7c7ca"
                ctx.fillRect(-4200 - 100, -2200, 100, 2600)
                // ctx.fillStyle = "#c7c7ca"
                ctx.fillRect(100 - 1450, -1000, 1450, 1400)
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                if (backwards) {
                    ctx.fillStyle = "rgba(0,0,0,0.1)"
                    ctx.fillRect(-3750 - 550, -3650, 550, 400)
                } else {
                    ctx.fillStyle = "rgba(0,0,0,0.1)"
                    ctx.fillRect(275 - 425, -1275, 425, 300)
                }
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-3700 - 1100, -3150, 1100, 950)
                ctx.fillRect(-2000 - 450, -1110, 450, 1550)
                ctx.fillStyle = "rgba(0,0,0,0.04)"
                ctx.beginPath()
                ctx.moveTo(100, -900)
                ctx.lineTo(-300, -900)
                ctx.lineTo(-150, 100)
                ctx.lineTo(100, 100)
                ctx.moveTo(-600, -900)
                ctx.lineTo(-1350, -900)
                ctx.lineTo(-1350, 100)
                ctx.lineTo(-750, 100)
                ctx.fill()
            };
        }
    },
    skyscrapers() {
        level.announceMobTypes()
        level.fallMode = "start";
        const boost1 = level.boost(475, 0, 1300)
        const boost2 = level.boost(4450, 0, 1300);
        level.custom = () => {
            boost1.query();
            boost2.query();
            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(1350, -2100, 400, 250)
            ctx.fillStyle = "#d4d4d7"
            ctx.fillRect(3350, -1300, 50, 1325)
            ctx.fillRect(1300, -1800, 750, 1800)
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(2500, -1100, 450, 250)
            ctx.fillRect(2400, -550, 600, 150)
            ctx.fillRect(2550, -1650, 250, 200)
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(700, -110, 400, 110)
            ctx.fillRect(3800, -110, 400, 110)
            ctx.fillStyle = "rgba(0,0,0,0.15)"
            ctx.fillRect(-250, -300, 450, 300)
        };
        level.setPosToSpawn(-50, -60); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 1500;
        level.exit.y = -1875;
        level.defaultZoom = 2000
        simulation.zoomTransition(level.defaultZoom)
        powerUps.spawnStartingPowerUps(1475, -1175);
        spawn.debris(750, -2200, 3700, 16); //16 debris per level
        document.body.style.backgroundColor = "#dcdcde";

        spawn.mapRect(-300, 0, 5100, 300); //***********ground
        spawn.mapRect(-300, -350, 50, 400); //far left starting left wall
        spawn.mapRect(-300, -10, 500, 50); //far left starting ground
        spawn.mapRect(-300, -350, 500, 50); //far left starting ceiling
        spawn.mapRect(150, -350, 50, 200); //far left starting right part of wall
        spawn.bodyRect(170, -130, 14, 140, 1, spawn.propsFriction); //door to starting room
        spawn.mapRect(700, -1100, 400, 990); //far left building
        spawn.mapRect(1600, -400, 1500, 500); //long center building
        spawn.mapRect(1345, -1100, 250, 25); //left platform
        spawn.mapRect(1755, -1100, 250, 25); //right platform
        spawn.mapRect(1300, -1850, 800, 50); //left higher platform
        spawn.mapRect(1300, -2150, 50, 350); //left higher platform left edge wall
        spawn.mapRect(1300, -2150, 450, 50); //left higher platform roof
        spawn.mapRect(1500, -1860, 100, 50); //ground bump wall
        spawn.mapRect(2400, -850, 600, 300); //center floating large square
        //spawn.bodyRect(2500, -1100, 25, 250); //wall before chasers
        spawn.mapRect(2500, -1450, 450, 350); //higher center floating large square
        spawn.mapRect(2500, -1675, 50, 300); //left wall on higher center floating large square
        spawn.mapRect(2500, -1700, 300, 50); //roof on higher center floating large square
        spawn.mapRect(3275, -750, 200, 25); //ledge by far right building
        spawn.mapRect(3275, -1300, 200, 25); //higher ledge by far right building
        spawn.mapRect(3800, -1100, 400, 990); //far right building

        spawn.bodyRect(3200, -1375, 300, 25, 0.9);
        spawn.bodyRect(1825, -1875, 400, 25, 0.9);
        // spawn.bodyRect(1800, -575, 250, 150, 0.8);
        spawn.bodyRect(1800, -600, 110, 150, 0.8);
        spawn.bodyRect(2557, -450, 35, 55, 0.7);
        spawn.bodyRect(2957, -450, 30, 15, 0.7);
        spawn.bodyRect(2900, -450, 60, 45, 0.7);
        spawn.bodyRect(915, -1200, 60, 100, 0.95);
        spawn.bodyRect(925, -1300, 50, 100, 0.95);
        if (Math.random() < 0.9) {
            spawn.bodyRect(2300, -1720, 400, 20);
            spawn.bodyRect(2590, -1780, 80, 80);
        }
        spawn.bodyRect(2925, -1100, 25, 250, 0.8);
        spawn.bodyRect(3325, -1550, 50, 200, 0.3);
        if (Math.random() < 0.8) {
            spawn.bodyRect(1400, -75, 200, 75); //block to get up ledge from ground
            spawn.bodyRect(1525, -125, 50, 50); //block to get up ledge from ground
        }
        spawn.bodyRect(1025, -1110, 400, 25, 0.9); //block on far left building
        spawn.bodyRect(1425, -1110, 115, 25, 0.9); //block on far left building
        spawn.bodyRect(1540, -1110, 300, 25, 0.9); //block on far left building

        spawn.randomMob(-100, -1300, 0.5);
        spawn.randomSmallMob(1850, -600);
        spawn.randomSmallMob(3200, -100);
        spawn.randomSmallMob(4450, -100);
        spawn.randomSmallMob(2700, -475);
        spawn.randomMob(2650, -975, 0.8);
        spawn.randomMob(2650, -1550, 0.8);
        spawn.randomMob(4150, -200, 0.15);
        spawn.randomMob(1700, -1300, 0.2);
        spawn.randomMob(1850, -1950, 0.25);
        spawn.randomMob(2610, -1880, 0.25);
        spawn.randomMob(3350, -950, 0.25);
        spawn.randomMob(1690, -2250, 0.25);
        spawn.randomMob(2200, -600, 0.2);
        spawn.randomMob(850, -1300, 0.25);
        spawn.randomMob(-100, -1700, -0.2);
        spawn.randomGroup(3700, -1500, 0.4);
        spawn.randomGroup(1700, -900, 0.4);
        spawn.randomLevelBoss(2800 + 200 * Math.random(), -2200 + 200 * Math.random());
        spawn.secondaryBossChance(4000, -1825)
        //spawn.randomHigherTierMob(1675, -728)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            boost2.boostBounds.min.x = -boost2.boostBounds.min.x - 100
            boost2.boostBounds.max.x = -boost2.boostBounds.max.x + 100

            level.setPosToSpawn(50, -60); //-x
            level.custom = () => {
                boost1.query();
                boost2.query();
                ctx.fillStyle = "#d4f4f4"
                ctx.fillRect(-1350 - 400, -2100, 400, 250)
                ctx.fillStyle = "#d4d4d7"
                ctx.fillRect(-3350 - 50, -1300, 50, 1325)
                ctx.fillRect(-1300 - 750, -1800, 750, 1800)

                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-2500 - 450, -1100, 450, 250)
                ctx.fillRect(-2400 - 600, -550, 600, 150)
                ctx.fillRect(-2550 - 250, -1650, 250, 200)
                ctx.fillStyle = "rgba(0,0,0,0.2)"
                ctx.fillRect(-700 - 400, -110, 400, 110)
                ctx.fillRect(-3800 - 400, -110, 400, 110)
                ctx.fillStyle = "rgba(0,0,0,0.15)"
                ctx.fillRect(250 - 450, -300, 450, 300)
            };
        }
    },
    superstructure() {
        level.announceMobTypes()
        level.setPosToSpawn(0, 930);
        level.exit.x = 600
        level.exit.y = -2080
        spawn.mapRect(600, -2060, 100, 25);

        level.defaultZoom = 2400
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d0d5d5"
        color.map = "#41424b"

        const boosts = []
        const blocks = []

        level.custom = () => {
            ctx.fillStyle = "#c1c7c7ff" //building backgrounds
            ctx.fillRect(-2500, -4900, 775, 6325);
            ctx.fillRect(-1000, -4900, 2000, 6375);
            ctx.fillRect(-1380, -1700, 50, 2775);
            ctx.fillRect(1400, -4900, 1475, 4200);
            //exit
            ctx.fillStyle = "#cff"
            ctx.fillRect(275, -2400, 725, 375);
            level.exit.drawAndCheck();
            level.enter.draw();

            for (let i = 0; i < boosts.length; i++) boosts[i].query();

            //give player some horizontal traction and proper leg animation on specific moving blocks
            if (m.onGround) {
                for (let i = 0; i < blocks.length; i++) {
                    if (m.standingOn === blocks[i]) {
                        m.moverX = blocks[i].velocity.x //helps sync leg movements
                        m.Vx = player.velocity.x - blocks[i].velocity.x //adds blocks velocity to player
                    }
                }
            }
            ctx.beginPath();
            for (let i = 0, len = blocks.length; i < len; i++) {
                let vertices = blocks[i].vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j += 1) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
            }
            ctx.strokeStyle = "#000"
            ctx.lineWidth = 10
            ctx.stroke();


            const rate = 0.015
            //combination of a horizontal force on the block and changing the length of constraints keeps the block form rotating as it swings
            //these parameters need fine tuning, mostly amplitude
            blocks[0].force.x = 0.002 * Math.sin(simulation.cycle * rate + 0.2) * blocks[0].mass
            cons[0].length = 1300 + 450 * Math.sin(simulation.cycle * rate)
            cons[1].length = 1300 + 450 * Math.sin(simulation.cycle * rate + Math.PI)
        };
        level.customTopLayer = () => {
            //shadows
            ctx.fillStyle = "rgba(0,20,40,0.1)"
            ctx.fillRect(-1000, 700, 1700, 325);
            ctx.fillRect(-2125, 875, 400, 125);
            ctx.fillRect(-115, 250, 630, 150);
            ctx.fillRect(2425, -1575, 450, 375);
            ctx.fillRect(1900, -1200, 975, 475);
            ctx.fillRect(-2500, -550, 775, 1575);
            ctx.fillRect(-2500, -2225, 450, 875);
            ctx.fillRect(-2050, -1900, 325, 575);
            ctx.fillStyle = "rgba(0,0,0,0.06)"
            ctx.fillRect(-625, -2050, 825, 350);
        };
        spawn.mapRect(-2500, 1000, 3500, 3375);//ground
        // spawn.mapRect(-2125, -175, 400, 1062);//left wall
        // spawn.mapVertex(-1925, 360, "225 -500  225 500  200 525  -200 525  -225 500  -225 -500  -200 -525  200 -525");
        spawn.bodyRectCorner(-1925, 360, 500, 1050, 50)

        //left tower
        spawn.mapRect(-2125, 990, 400, 100); //tunnel
        boosts.push(level.boost(-2460, 990, 1250, 1.57 - 0.1)) //slight right angle
        // spawn.mapRect(-2500, -1375, 775, 875);//left wall
        spawn.mapVertex(-2397.5, -400, "0 0   300 0   50 300   0 300");
        spawn.mapRect(-2500, -225, 50, 650);
        spawn.bodyRect(-1850, -250, 125, 75, 0.7);

        //entrance
        spawn.mapRect(-1000, 990, 1700, 75);
        // spawn.mapRect(-1000, 400, 1700, 300);
        const h = 128
        // spawn.mapVertex(0, 550, `1025 -150  1025 150  1000 175  -1000 175  -1025 150  -1025 -150  -1000 -175  1000 -175`);
        spawn.mapVertex(-150, 550, `875 -${h}  875 ${h}  850 ${h + 25}  -850 ${h + 25}  -875 ${h}  -875 -${h}  -850 -${h + 25}  850 -${h + 25}`);


        spawn.mapRect(-225, 687, 450, 25);
        // spawn.mapRect(-225, 675, 450, 35);
        spawn.mapRect(-225, 980, 450, 125);
        spawn.mapRect(-175, 970, 350, 125);


        spawn.bodyRect(-995, 825, 15, 165); //door
        spawn.bodyRect(680, 825, 15, 165);//door
        spawn.mapRect(675, 650, 25, 175);
        spawn.mapRect(-1000, 675, 25, 150);
        boosts.push(level.boost(860, 965, 1500, 1.57 - 0.4)) //slight right angle
        boosts.push(level.boost(1357, 80, 1000, 1.57 + 1.08)) //angled left on side of right tower

        //above entrance
        spawn.bodyRect(-375, 275, 125, 125, 0.7);
        spawn.bodyRectCorner(200, 150, 700, 200, 35)

        //scafolding on left
        spawn.mapRect(-1485, 675, 250, 25);
        spawn.mapRect(-1485, 75, 250, 25);
        spawn.mapRect(-1485, -525, 250, 25);
        spawn.mapRect(-1485, -1125, 250, 25);
        spawn.mapRect(-1485, -1700, 250, 25);
        //floor 2
        boosts.push(level.boost(-800, 400, 1300))

        // spawn.mapRect(-525, -400, 1225, 275);
        //right tower
        spawn.mapRect(1400, -750, 1475, 5125);

        //floor 5
        //far right tower
        spawn.mapVertex(1750, -907, "350 -100  350 175  -350 175   -350 -100  -275 -175    275 -175");
        spawn.mapVertex(2725, -865, "150 -150  150 175  -150 175   -150 -150  -125 -175    125 -175");
        spawn.bodyRect(2775, -1175, 75, 125, 0.7);
        spawn.bodyRect(2100, -825, 175, 75, 0.7);
        spawn.bodyRect(2750, -1975, 125, 150, 0.7);


        spawn.mapVertex(2200, -1310, "325 -100  325 100  300 125  -300 125  -325 100  -325 -100  -300 -125  300 -125");
        spawn.mapVertex(2650, -1700, "250 -100  250 100  225 125  -225 125  -250 100  -250 -100  -225 -125  225 -125");

        spawn.mapRect(1400, -2050, 250, 25);
        spawn.mapRect(1900, -2050, 300, 25);
        spawn.bodyRect(925, -2075, 525, 25);
        spawn.bodyRect(1600, -2075, 375, 25);
        spawn.bodyRect(1450, -2075, 150, 25);
        spawn.bodyRect(1975, -2100, 125, 50);
        spawn.bodyRect(2100, -2125, 100, 75);

        //far left tower
        spawn.mapVertex(-2114, -975, "387 -350  387 500  -387 500   -387 -425    312 -425");
        spawn.bodyRect(-2175, -1425, 125, 75, 0.7);
        spawn.mapVertex(-2350, -1500, "150 -225  150 175  -150 175   -150 -225  -125 -250    125 -250");
        // spawn.mapVertex(-1850, -1925, "150 -100  150 100  125 125  -125 125  -150 100  -150 -100  -125 -125  125 -125");
        spawn.bodyRectCorner(-1900, -1925, 400, 200, 25) //centerX,centerY, w, h, c
        spawn.bodyRectCorner(-2275, -2300, 500, 200, 25) //centerX,centerY, w, h, c

        //exit
        spawn.mapVertex(600, -1875, "425 -150  425 150  400 175  -425 175             -425 -175             400 -175"); //right
        spawn.mapVertex(-800, -1875, "225 -175  225 175          -200 175  -225 150  -225 -150  -200 -175           ");//left
        spawn.mapRect(-350, -2050, 250, 25);
        spawn.mapRect(-600, -1725, 250, 25);
        spawn.mapRect(-100, -1725, 300, 25);
        spawn.bodyRect(-650, -2075, 450, 25);
        spawn.bodyRect(-200, -2075, 525, 25);
        spawn.bodyRectCorner(637.5, -2500, 795.3, 250, 35) //centerX,centerY, w, h, c
        spawn.mapRect(275, -2375, 25, 150);
        spawn.mapRect(975, -2375, 25, 150);




        // spawn.bodyVertex(0, -1500, "600 -100  600 100  550 150  -550 150  -600 100  -600 -100  -550 -150  550 -150");
        const shape = "300 -50  300 50  275 75  -275 75  -300 50  -300 -50  -275 -75  275 -75"

        //force on block to make gentle swinging motion
        spawn.bodyVertex(0, -500, shape, {
            density: 0.0002,
            friction: 1,
            frictionStatic: 1,
            frictionAir: 0.2,
            isNotHoldable: true,
        });
        blocks.push(body[body.length - 1]) //saved to blocks array to give player traction in level.custom
        //apply heavy damping for just a second on spawn to prevent crazy shakes

        simulation.ephemera.push({
            name: "blockFriction",
            count: 25, //cycles before it self removes
            do() {
                this.count--
                if (this.count < 0) {
                    simulation.removeEphemera(this.name)
                    blocks[0].frictionAir = 0.02
                }
            },
        })
        cons[cons.length] = Constraint.create({
            pointA: { x: -980, y: -1700 },
            pointB: { x: -300, y: -50 }, //offset from bodyB
            bodyB: body[body.length - 1],
            stiffness: 0.001,
            // damping: 0, //I don't know why but this needs to be 0 or not included to properly transfer traction to the player
            // length: 1000,
        });
        Composite.add(engine.world, cons[cons.length - 1]);
        cons[cons.length] = Constraint.create({
            pointA: { x: 980, y: -1700 },
            pointB: { x: 300, y: -50 }, //offset from bodyB
            bodyB: body[body.length - 1],
            stiffness: 0.001,
            // length: 1000,
        });
        Composite.add(engine.world, cons[cons.length - 1]);

        spawn.randomMob(-2000, -250, 0);
        spawn.randomMob(-1400, 625, 0);
        spawn.randomMob(-875, 225, 0.1);
        spawn.randomMob(50, -50, 0.1);
        spawn.randomMob(1750, -1150, 0.1);
        spawn.randomMob(2425, -1050, 0.2);
        spawn.randomMob(2200, -1550, 0.2);
        spawn.randomMob(1550, -2175, 0.2);
        spawn.randomMob(300, -2700, 0.2);
        spawn.randomMob(-750, -2150, 0.2);
        spawn.randomMob(-2250, -2450, 0.3);
        spawn.randomMob(-2300, -1800, 0.3);
        spawn.randomMob(-1900, -225, 0.3);
        spawn.randomMob(-1400, -1175, 0.3);
        spawn.randomMob(2200, -1500, 0.4);
        spawn.randomMob(1600, -2175, 0.4);
        spawn.randomMob(-700, -2175, 0.4);
        spawn.randomMob(-2425, -2550, 0.5);

        spawn.randomLevelBoss(1675, -1675);
        if (Math.random() < 0.33) {
            spawn.secondaryBossChance(-1375, -2250);
        } else if (Math.random() < 0.5) {
            spawn.secondaryBossChance(2275, -2575);
        } else {
            spawn.secondaryBossChance(-225, -2525);
        }
        spawn.randomGroup(2775, -2275, 0.1);

        powerUps.spawnStartingPowerUps(2350, -825)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        powerUps.chooseRandomPowerUp(125, -1750);
        powerUps.chooseRandomPowerUp(650, -2675);
        powerUps.chooseRandomPowerUp(800, -2675);
    },
    highrise() {
        level.announceMobTypes()
        level.fallMode = "start";
        const elevator1 = level.elevator(-790, -190, 180, 25, -1150, 0.0025, { up: 0.01, down: 0.2 }, true) //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        elevator1.addConstraint();
        // const button1 = level.button(-500, -200)
        const toggle1 = level.toggle(-300, -200) //(x,y,isOn,isLockOn = true/false)

        const elevator2 = level.elevator(-3630, -970, 180, 25, -1740, 0.004) //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        elevator2.addConstraint();
        // const button2 = level.button(-3100, -1330) 
        const toggle2 = level.toggle(-3100, -1330) //(x,y,isOn, isLockOn = true/false)


        level.custom = () => {
            // ctx.fillStyle = "#d0d0d2"
            // ctx.fillRect(-2475, -2450, 25, 750)
            // ctx.fillRect(-2975, -2750, 25, 600)
            // ctx.fillRect(-3375, -2875, 25, 725)
            ctx.fillStyle = "#cff" //exit
            ctx.fillRect(-4425, -3050, 425, 275)
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            // button1.draw();
            toggle1.query();
            if (!toggle1.isOn) {
                if (elevator1.isOn) {
                    elevator1.isOn = false
                    elevator1.frictionAir = 0.2
                    elevator1.addConstraint();
                }
            } else if (!elevator1.isOn) {
                elevator1.isOn = true
                elevator1.isUp = false
                elevator1.removeConstraint();
                elevator1.frictionAir = 0.2 //elevator.isUp ? 0.01 : 0.2
            }
            if (elevator1.isOn) {
                elevator1.move();
                ctx.fillStyle = "#444"
            } else {
                ctx.fillStyle = "#aaa"
            }
            ctx.fillRect(-700, -1140, 1, 975)

            toggle2.query();
            // button2.draw();
            if (!toggle2.isOn) {
                if (elevator2.isOn) {
                    elevator2.isOn = false
                    elevator2.frictionAir = 0.2
                    elevator2.addConstraint();
                }
            } else if (!elevator2.isOn) {
                elevator2.isOn = true
                elevator2.isUp = false
                elevator2.removeConstraint();
                elevator2.frictionAir = 0.2 //elevator.isUp ? 0.01 : 0.2                    
            }

            if (elevator2.isOn) {
                elevator2.move();
                ctx.fillStyle = "#444"
            } else {
                ctx.fillStyle = "#aaa"
            }
            ctx.fillRect(-3540, -1720, 1, 770)

            ctx.fillStyle = "rgba(64,64,64,0.97)" //hidden section
            ctx.fillRect(-4450, -750, 800, 200)
            ctx.fillStyle = "rgba(0,0,0,0.12)"
            ctx.fillRect(-2500, -1975, 150, 300);
            ctx.fillRect(-1830, -1150, 2030, 1150)
            ctx.fillRect(-3410, -2150, 495, 1550)
            ctx.fillRect(-2585, -1675, 420, 1125)
            ctx.fillRect(-1650, -1575, 750, 450)
        };

        level.setPosToSpawn(-300, -700); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = -4275;
        level.exit.y = -2805;

        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)

        powerUps.spawnStartingPowerUps(-2550, -700);
        document.body.style.backgroundColor = "#dcdcde" //"#fafcff";

        spawn.debris(-2325, -1825, 2400); //16 debris per level
        spawn.debris(-2625, -600, 600, 5); //16 debris per level
        spawn.debris(-2000, -60, 1200, 5); //16 debris per level

        //3 platforms that lead to exit
        // spawn.mapRect(-3440, -2875, 155, 25);
        // spawn.mapRect(-3025, -2775, 125, 25);
        // spawn.mapRect(-2525, -2475, 125, 25);
        // spawn.bodyRect(-2600, -2500, 225, 20, 0.7);
        // spawn.bodyRect(-3350, -2900, 25, 25, 0.5);
        // spawn.bodyRect(-3400, -2950, 50, 75, 0.5);

        powerUps.spawn(-4300, -700, "heal");
        powerUps.spawn(-4200, -700, "ammo");
        powerUps.spawn(-4000, -700, "ammo");
        spawn.mapRect(-4450, -1000, 100, 500);
        spawn.bodyRect(-3300, -750, 150, 150);

        //building 1
        spawn.bodyRect(-1000, -675, 25, 25);
        spawn.mapRect(-2225, 0, 2475, 150);
        spawn.mapRect(175, -1000, 75, 1100);
        spawn.mapRect(-600, -1075, 50, 475);
        spawn.mapRect(-600, -650, 625, 50);
        spawn.mapRect(-1300, -650, 500, 50);
        spawn.bodyRect(-75, -300, 50, 50);

        spawn.mapRect(-600, -200, 500, 250); //ledge for boarding elevator
        spawn.bodyRect(-500, -300, 100, 100, 0.6); //a nice block near the elevator

        spawn.bodyRect(-425, -1375, 400, 225);
        spawn.mapRect(-925, -1575, 50, 475);
        spawn.bodyRect(-1475, -1275, 250, 125);

        // spawn.mapRect(-1650, -1575, 600, 50);
        // spawn.mapRect(-1875, -1575, 850, 50);
        spawn.mapRect(-1675, -1575, 650, 50);
        spawn.mapRect(-600, -1150, 850, 175);
        spawn.mapRect(-1850, -1150, 1050, 175);
        spawn.bodyRect(-1907, -1600, 550, 25);
        if (simulation.difficulty < 4) {
            spawn.bodyRect(-1600, -125, 125, 125);
            spawn.bodyRect(-1560, -200, 75, 75);
        } else {
            spawn.bodyRect(-1200, -125, 125, 125);
            spawn.bodyRect(-1160, -200, 75, 75);
        }
        //building 2
        spawn.mapRect(-4450, -600, 2300, 750);
        spawn.mapRect(-2225, -450, 175, 550);
        // spawn.mapRect(-2600, -975, 450, 50);
        spawn.mapRect(-3425, -1325, 525, 75);
        spawn.mapRect(-3425, -2200, 525, 50);
        spawn.mapRect(-2600, -1700, 450, 50);
        // spawn.mapRect(-2600, -2450, 450, 50);
        spawn.bodyRect(-2275, -2700, 50, 60);

        // spawn.bodyRect(-2560, -1925, 250, 225);
        // spawn.mapRect(-2525, -2025, 125, 25);
        // spawn.mapRect(-2525, -1900, 125, 225);
        // spawn.mapRect(-2600, -1975, 250, 25);
        spawn.mapRect(-2515, -2000, 180, 50);

        spawn.bodyRect(-3410, -1425, 50, 50);
        spawn.bodyRect(-3390, -1525, 40, 60);
        // spawn.bodyRect(-3245, -1425, 100, 100);
        //building 3
        spawn.mapRect(-4450, -1750, 800, 1050);
        // spawn.mapRect(-3850, -2000, 125, 400);
        spawn.mapRect(-4000, -2390, 200, 800);
        // spawn.mapRect(-4450, -2650, 475, 1000);
        spawn.mapRect(-4450, -2775, 475, 1125);
        spawn.bodyRect(-3715, -2050, 50, 50);
        // spawn.bodyRect(-3570, -1800, 50, 50);
        spawn.bodyRect(-2970, -2250, 50, 50);
        spawn.bodyRect(-3080, -2250, 40, 40);
        spawn.bodyRect(-3420, -650, 50, 50);

        //exit
        spawn.mapRect(-4450, -3075, 25, 300);
        spawn.mapRect(-4450, -3075, 450, 25);
        spawn.mapRect(-4025, -3075, 25, 100);
        spawn.mapRect(-4275, -2785, 100, 25);
        spawn.bodyRect(-3900, -2400, 50, 50);

        //mobs
        spawn.randomMob(-2500, -2700, 1);
        spawn.randomMob(-3200, -750, 1);
        spawn.randomMob(-1875, -775, 0.2);
        spawn.randomMob(-950, -1675, 0.2);
        spawn.randomMob(-1525, -1750, 0.2);
        spawn.randomMob(-1375, -1400, 0.2);
        spawn.randomMob(-1625, -1275, 0.2);
        spawn.randomMob(-1900, -1250, 0.2);
        spawn.randomMob(-2250, -1850, 0.2);
        spawn.randomMob(-2475, -2200, 0.2);
        spawn.randomMob(-3000, -1475, 0.2);
        spawn.randomMob(-3850, -2500, 0.2);
        spawn.randomMob(-3650, -2125, 0.2);
        spawn.randomMob(-4010, -3200, 0.2);
        spawn.randomMob(-3500, -1825, 0.2);
        spawn.randomMob(-975, -100, 0);
        spawn.randomMob(-1050, -725, 0.2);
        spawn.randomMob(-1525, -100, 0);
        spawn.randomMob(-525, -1700, -0.1);
        spawn.randomMob(-125, -1500, -0.1);
        spawn.randomMob(-325, -1900, -0.1);
        spawn.randomMob(-550, -100, -0.1);
        spawn.randomGroup(-3250, -2700, 0.2);
        spawn.randomGroup(-2450, -1100, 0);
        spawn.randomLevelBoss(-2400, -2650);
        spawn.secondaryBossChance(-1825, -1975)
        //spawn.randomHigherTierMob(-2938, -830)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            // boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            // boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            level.setPosToSpawn(300, -700); //-x
            elevator1.holdX = -elevator1.holdX // flip the elevator horizontally
            elevator1.removeConstraint();
            elevator1.addConstraint();
            elevator2.holdX = -elevator2.holdX // flip the elevator horizontally
            elevator2.removeConstraint();
            elevator2.addConstraint();

            level.custom = () => {
                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(4425 - 425, -3050, 425, 275)
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                toggle1.query();
                if (!toggle1.isOn) {
                    if (elevator1.isOn) {
                        elevator1.isOn = false
                        elevator1.frictionAir = 0.2
                        elevator1.addConstraint();
                    }
                } else if (!elevator1.isOn) {
                    elevator1.isOn = true
                    elevator1.isUp = false
                    elevator1.removeConstraint();
                    elevator1.frictionAir = 0.2 //elevator.isUp ? 0.01 : 0.2
                }
                if (elevator1.isOn) {
                    elevator1.move();
                    ctx.fillStyle = "#444"
                    ctx.fillRect(700 - 1, -1140, 1, 975)
                } else {
                    ctx.fillStyle = "#aaa"
                    ctx.fillRect(700 - 1, -1140, 1, 975)
                }

                toggle2.query();
                if (!toggle2.isOn) {
                    if (elevator2.isOn) {
                        elevator2.isOn = false
                        elevator2.frictionAir = 0.2
                        elevator2.addConstraint();
                    }
                } else if (!elevator2.isOn) {
                    elevator2.isOn = true
                    elevator2.isUp = false
                    elevator2.removeConstraint();
                    elevator2.frictionAir = 0.2 //elevator.isUp ? 0.01 : 0.2                    
                }

                if (elevator2.isOn) {
                    elevator2.move();
                    ctx.fillStyle = "#444"
                    ctx.fillRect(3540 - 1, -1720, 1, 740)
                } else {
                    ctx.fillStyle = "#aaa"
                    ctx.fillRect(3540 - 1, -1720, 1, 740)
                }

                ctx.fillStyle = "rgba(64,64,64,0.97)" //hidden section
                ctx.fillRect(4450 - 800, -750, 800, 200)
                ctx.fillStyle = "rgba(0,0,0,0.12)"
                ctx.fillRect(2500 - 150, -1975, 150, 300);
                ctx.fillRect(1830 - 2030, -1150, 2030, 1150)
                ctx.fillRect(3410 - 495, -2150, 495, 1550)
                ctx.fillRect(2585 - 420, -1675, 420, 1125)
                ctx.fillRect(1650 - 750, -1575, 750, 450)
            };
        }
    },
    warehouse() {
        level.announceMobTypes()
        level.fallMode = "start";
        level.custom = () => {
            ctx.fillStyle = "#444" //light fixtures
            ctx.fillRect(-920, -505, 40, 10)
            ctx.fillRect(-920, 95, 40, 10)
            ctx.fillRect(180, 95, 40, 10)
            ctx.fillRect(-20, 695, 40, 10)
            ctx.fillRect(-2320, 945, 40, 10)

            ctx.fillStyle = "#cff" //exit
            ctx.fillRect(300, -250, 350, 250)
            level.exit.drawAndCheck();

            level.enter.draw();
        };

        const lightingPath = new Path2D() //pre-draw the complex lighting path to save processing
        lightingPath.moveTo(-1800, -500)
        lightingPath.lineTo(-910, -500) //3rd floor light
        lightingPath.lineTo(-1300, 0)
        lightingPath.lineTo(-500, 0)
        lightingPath.lineTo(-890, -500)
        lightingPath.lineTo(-175, -500)
        lightingPath.lineTo(-175, -250)
        lightingPath.lineTo(175, -250)
        lightingPath.lineTo(175, 0)
        lightingPath.lineTo(-910, 100) //2nd floor light left
        lightingPath.lineTo(-1300, 600)
        lightingPath.lineTo(-500, 600)
        lightingPath.lineTo(-890, 100)
        lightingPath.lineTo(190, 100) //2nd floor light right
        lightingPath.lineTo(-200, 600)
        lightingPath.lineTo(600, 600)
        lightingPath.lineTo(210, 100)
        lightingPath.lineTo(1100, 100)
        lightingPath.lineTo(1100, 1400)
        lightingPath.lineTo(600, 1400) //1st floor light right
        lightingPath.lineTo(10, 700)
        lightingPath.lineTo(-10, 700)
        lightingPath.lineTo(-600, 1400)
        lightingPath.lineTo(-1950, 1400) //1st floor light left
        lightingPath.lineTo(-2290, 950)
        lightingPath.lineTo(-2310, 950)
        lightingPath.lineTo(-2650, 1400)
        lightingPath.lineTo(-3025, 1400)
        lightingPath.lineTo(-3025, 150)
        lightingPath.lineTo(-2590, 150)
        lightingPath.lineTo(-2600, -150)
        lightingPath.lineTo(-1800, -150)
        lightingPath.lineTo(-1800, -500) //top left end/start of path

        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.15)"; //shadows and lights
            ctx.fill(lightingPath);
        };

        level.setPosToSpawn(25, -55); //normal spawn
        level.exit.x = 425;
        level.exit.y = -30;

        level.defaultZoom = 1300
        simulation.zoomTransition(level.defaultZoom)

        spawn.debris(-2250, 1330, 3000, 6); //16 debris per level
        spawn.debris(-3000, -800, 3280, 6); //16 debris per level
        spawn.debris(-1400, 410, 2300, 5); //16 debris per level
        powerUps.spawnStartingPowerUps(25, 500);
        document.body.style.backgroundColor = "#dcdcde" //"#f2f5f3";

        spawn.mapRect(-1500, 0, 2750, 100);
        spawn.mapRect(175, -270, 125, 300);
        spawn.mapRect(-1900, -600, 1775, 100);
        spawn.mapRect(-1900, -550, 100, 1250);
        //house
        spawn.mapRect(-225, -550, 100, 400);
        spawn.mapRect(-225, -10, 400, 50);
        spawn.mapRect(-25, -20, 100, 50);

        //exit house
        spawn.mapRect(300, -10, 350, 50);
        spawn.mapRect(-150, -350, 800, 100);
        spawn.mapRect(600, -275, 50, 75);
        spawn.mapRect(425, -20, 100, 25);
        // spawn.mapRect(-1900, 600, 2700, 100);
        spawn.mapRect(1100, 0, 150, 1500);
        spawn.mapRect(-3150, 1400, 4400, 100);
        spawn.mapRect(-2375, 875, 1775, 75);
        spawn.mapRect(-1450, 865, 75, 435);
        spawn.mapRect(-1450, 662, 75, 100);
        spawn.bodyRect(-1418, 773, 11, 102, 1, spawn.propsFriction); //blocking path
        spawn.mapRect(-3150, 50, 125, 1450);
        spawn.mapRect(-2350, 600, 3150, 100);
        spawn.mapRect(-2125, 400, 250, 275);
        // spawn.mapRect(-1950, -400, 100, 25);
        spawn.mapRect(-3150, 50, 775, 100);
        spawn.mapRect(-2600, -250, 775, 100);

        let isElevators = false
        let elevator1, elevator2, elevator3
        if (Math.random() < 0.5) {
            isElevators = true
            elevator1 = level.elevator(-1780, 500, 260, 40, 7, 0.0003) //    x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
            elevator2 = level.elevator(820, 1300, 260, 40, 607, 0.0003)
            elevator3 = level.elevator(-2850, 1250, 160, 40, 600, 0.007)
            if (simulation.isHorizontalFlipped) {
                spawn.mapVertex(-2900, 225, "0 0  0 -500  -500 -500")
            } else {
                spawn.mapVertex(-2900, 225, "0 0  0 -500  500 -500")
            }
            spawn.mapRect(-3050, 1175, 175, 300);
            spawn.bodyRect(-2375, 1300, 100, 100);
            spawn.bodyRect(-2325, 1250, 50, 50);
            spawn.bodyRect(-2275, 1350, 125, 50);


            level.custom = () => {
                elevator1.move();
                elevator1.drawTrack();
                elevator2.move();
                elevator2.drawTrack();
                elevator3.move();
                elevator3.drawTrack();

                ctx.fillStyle = "#444" //light fixtures
                ctx.fillRect(-920, -505, 40, 10)
                ctx.fillRect(-920, 95, 40, 10)
                ctx.fillRect(180, 95, 40, 10)
                ctx.fillRect(-20, 695, 40, 10)
                ctx.fillRect(-2320, 945, 40, 10)

                ctx.fillStyle = "#cff" //exit
                ctx.fillRect(300, -250, 350, 250)
                level.exit.drawAndCheck();

                level.enter.draw();
            };
        } else {
            spawn.mapRect(-2950, 1250, 175, 250);
            spawn.mapRect(-3050, 1100, 150, 400);

            spawn.bodyRect(-1450, -125, 125, 125, 1, spawn.propsSlide); //weight
            spawn.bodyRect(-1800, 0, 300, 100, 1, spawn.propsHoist); //hoist
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: -1650,
                    y: -500
                },
                bodyB: body[body.length - 1],
                stiffness: 0.0001815,
                length: 1
            });
            Composite.add(engine.world, cons[cons.length - 1]);

            spawn.bodyRect(600, 525, 125, 125, 1, spawn.propsSlide); //weight
            spawn.bodyRect(800, 600, 300, 100, 1, spawn.propsHoist); //hoist
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: 950,
                    y: 100
                },
                bodyB: body[body.length - 1],
                stiffness: 0.0001815,
                length: 1
            });
            Composite.add(engine.world, cons[cons.length - 1]);

            spawn.bodyRect(-2700, 1150, 100, 160, 1, spawn.propsSlide); //weight
            spawn.bodyRect(-2550, 1200, 150, 150, 1, spawn.propsSlide); //weight
            spawn.bodyRect(-2763, 1300, 350, 100, 1, spawn.propsHoist); //hoist
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: -2575,
                    y: 150
                },
                bodyB: body[body.length - 1],
                stiffness: 0.0004,
                length: 566
            });
            Composite.add(engine.world, cons[cons.length - 1]);
        }
        //blocks
        spawn.bodyRect(-212, -150, 30, 35, 1);
        spawn.bodyRect(-212, -115, 30, 35, 1);
        spawn.bodyRect(-212, -80, 30, 35, 1);
        spawn.bodyRect(-212, -45, 30, 35, 1);

        spawn.bodyRect(-750, 400, 150, 150, 0.5);
        spawn.bodyRect(-400, 1175, 100, 250, 1); //block to get to top path on bottom level

        spawn.bodyRect(-2525, -50, 145, 100, 0.5);
        spawn.bodyRect(-2325, -300, 150, 100, 0.5);
        spawn.bodyRect(-1275, -750, 200, 150, 0.5); //roof block
        spawn.bodyRect(-525, -700, 125, 100, 0.5); //roof block

        //mobs
        spawn.randomSmallMob(-1125, 550);
        spawn.randomSmallMob(-2950, -50);
        spawn.randomMob(-2025, 175, 0.5);
        spawn.randomMob(-2325, 450, 0.5);
        spawn.randomMob(-2925, 675, 0.4);
        spawn.randomMob(-2700, 300, 0.3);
        spawn.randomMob(-2500, 300, 0.3);
        spawn.randomMob(-2075, -425, 0.3);
        spawn.randomMob(-1550, -725, 0.3);
        spawn.randomMob(375, 1100, 0.2);
        spawn.randomMob(-1575, 1100, 0.3);
        spawn.randomSmallMob(825, 300);
        spawn.randomMob(-800, -1750, 0.3);
        spawn.randomMob(400, -750, 0.5);
        spawn.randomMob(650, 1300, 0.5);
        spawn.randomMob(-2450, 1050, 0.5);
        spawn.randomMob(500, 400, 0.5);
        spawn.randomMob(-75, -1700, 0.5);
        spawn.randomMob(900, -800, 0.6);
        spawn.randomGroup(-75, 1050, 0);
        spawn.randomGroup(-900, 1000, 0.2);
        spawn.randomGroup(-1300, -1100, 0);
        spawn.randomSmallMob(-2325, 800);
        spawn.randomSmallMob(-900, 825);
        spawn.randomLevelBoss(-800, -1300)
        spawn.secondaryBossChance(300, -800)
        //spawn.randomHigherTierMob(- 98, 1044)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit

            // boost1.boostBounds.min.x = -boost1.boostBounds.min.x - 100
            // boost1.boostBounds.max.x = -boost1.boostBounds.max.x + 100
            level.setPosToSpawn(-25, -55); //-x

            if (isElevators) {
                elevator1.holdX = -elevator1.holdX // flip the elevator horizontally
                elevator2.holdX = -elevator2.holdX // flip the elevator horizontally
                elevator3.holdX = -elevator3.holdX // flip the elevator horizontally
                level.custom = () => {
                    elevator1.move();
                    elevator1.drawTrack();
                    elevator2.move();
                    elevator2.drawTrack();
                    elevator3.move();
                    elevator3.drawTrack();

                    ctx.fillStyle = "#444" //light fixtures
                    ctx.fillRect(920 - 40, -505, 40, 10)
                    ctx.fillRect(920 - 40, 95, 40, 10)
                    ctx.fillRect(-180 - 40, 95, 40, 10)
                    ctx.fillRect(20 - 40, 695, 40, 10)
                    ctx.fillRect(2320 - 40, 945, 40, 10)

                    ctx.fillStyle = "#cff" //exit
                    ctx.fillRect(-300 - 350, -250, 350, 250)
                    level.exit.drawAndCheck();

                    level.enter.draw();
                };
            } else {
                level.custom = () => {
                    ctx.fillStyle = "#444" //light fixtures
                    ctx.fillRect(920 - 40, -505, 40, 10)
                    ctx.fillRect(920 - 40, 95, 40, 10)
                    ctx.fillRect(-180 - 40, 95, 40, 10)
                    ctx.fillRect(20 - 40, 695, 40, 10)
                    ctx.fillRect(2320 - 40, 945, 40, 10)

                    ctx.fillStyle = "#cff" //exit
                    ctx.fillRect(-300 - 350, -250, 350, 250)
                    level.exit.drawAndCheck();

                    level.enter.draw();
                };
            }
            level.customTopLayer = () => {
                ctx.fillStyle = "rgba(0,0,0,0.15)"; //shadows and lights
                ctx.beginPath()
                ctx.moveTo(1800, -500)
                ctx.lineTo(910, -500) //3rd floor light
                ctx.lineTo(1300, 0)
                ctx.lineTo(500, 0)
                ctx.lineTo(890, -500)
                ctx.lineTo(175, -500)
                ctx.lineTo(175, -250)
                ctx.lineTo(-175, -250)
                ctx.lineTo(-175, 0)
                ctx.lineTo(910, 100) //2nd floor light left
                ctx.lineTo(1300, 600)
                ctx.lineTo(500, 600)
                ctx.lineTo(890, 100)
                ctx.lineTo(-190, 100) //2nd floor light right
                ctx.lineTo(200, 600)
                ctx.lineTo(-600, 600)
                ctx.lineTo(-210, 100)
                ctx.lineTo(-1100, 100)
                ctx.lineTo(-1100, 1400)
                ctx.lineTo(-600, 1400) //1st floor light right
                ctx.lineTo(-10, 700)
                ctx.lineTo(10, 700)
                ctx.lineTo(600, 1400)
                ctx.lineTo(1950, 1400) //1st floor light left
                ctx.lineTo(2290, 950)
                ctx.lineTo(2310, 950)
                ctx.lineTo(2650, 1400)
                ctx.lineTo(3025, 1400)
                ctx.lineTo(3025, 150)
                ctx.lineTo(2590, 150)
                ctx.lineTo(2600, -150)
                ctx.lineTo(1800, -150)
                ctx.lineTo(1800, -500) //top left end/start of path
                ctx.fill()
            };
        }
    },
    office() {
        level.announceMobTypes()
        let button, door
        let isReverse = false
        if (Math.random() < 0.75) { //normal direction start in top left
            button = level.button(525, 0)
            door = level.door(1362, -400, 25, 400, 355, 1.5) //door(x, y, width, height, distance, speed = 1) {
            level.setPosToSpawn(1375, -1550); //normal spawn
            level.exit.x = 3088;
            level.exit.y = -630;
        } else { //reverse direction, start in bottom right
            isReverse = true
            button = level.button(3800, 0)
            door = level.door(3012, -400, 25, 400, 355, 1.5)
            level.setPosToSpawn(3137, -650); //normal spawn
            level.exit.x = 1375;
            level.exit.y = -1530;
        }
        level.custom = () => {
            button.query();
            button.draw();
            if (button.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            ctx.fillStyle = "#ccc"
            ctx.fillRect(2495, -500, 10, 525)
            ctx.fillStyle = "#dff"
            if (isReverse) {
                ctx.fillRect(725, -1950, 825, 450)
            } else {
                ctx.fillRect(3050, -950, 625, 500)
            }
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(3650, -1300, 1300, 1300)
            ctx.fillRect(3000, -1000, 650, 1000)
            ctx.fillRect(750, -1950, 800, 450)
            ctx.fillRect(750, -1450, 650, 1450)
            ctx.fillRect(-550, -1700, 1300, 1700)
            // ctx.fillRect(0, 0, 0, 0)
            door.draw();
        };
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom)
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 50); //ground bump wall
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        document.body.style.backgroundColor = "#e0e5e0";

        spawn.debris(-300, -200, 1000, 6); //ground debris //16 debris per level
        spawn.debris(3500, -200, 800, 5); //ground debris //16 debris per level
        spawn.debris(-300, -650, 1200, 5); //1st floor debris //16 debris per level
        powerUps.spawnStartingPowerUps(-525, -700);

        spawn.mapRect(-600, 0, 2000, 325); //ground
        spawn.mapRect(1400, 25, 1600, 300); //ground
        spawn.mapRect(3000, 0, 2000, 325); //ground
        spawn.mapRect(-600, -1700, 50, 2000 - 100); //left wall
        spawn.bodyRect(-295, -1540, 40, 40); //center block under wall
        spawn.bodyRect(-298, -1580, 40, 40); //center block under wall
        spawn.bodyRect(1500, -1540, 30, 30); //left of entrance
        spawn.mapRect(1550, -2000, 50, 550); //right wall
        // spawn.mapRect(1350, -2000 + 505, 50, 1295); 
        spawn.mapRect(1350, -1500, 50, 1125); //right wall
        spawn.mapRect(-600, -2000 + 250, 2000 - 700, 50); //roof left
        spawn.mapRect(-600 + 1300, -2000, 50, 300); //right roof wall
        spawn.mapRect(-600 + 1300, -2000, 900, 50); //center wall

        map[map.length] = Bodies.polygon(725, -1700, 0, 15); //circle above door
        spawn.bodyRect(720, -1675, 15, 170, 1, spawn.propsDoor); // door
        body[body.length - 1].isNotHoldable = true;
        //makes door swing
        consBB[consBB.length] = Constraint.create({
            bodyA: body[body.length - 1],
            pointA: {
                x: 0,
                y: -90
            },
            bodyB: map[map.length - 1],
            stiffness: 1
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);

        spawn.mapRect(-600 + 300, -2000 * 0.75, 1900, 50); //3rd floor
        spawn.mapRect(-600 + 2000 * 0.7, -2000 * 0.74, 50, 375); //center wall
        spawn.bodyRect(-600 + 2000 * 0.7, -2000 * 0.5 - 106, 50, 106); //center block under wall
        spawn.mapRect(-600, -1000, 1100, 50); //2nd floor
        spawn.mapRect(600, -1000, 500, 50); //2nd floor
        spawn.spawnStairs(-600, -1000, 4, 250, 350); //stairs 2nd
        spawn.mapRect(375, -600, 350, 150); //center table
        spawn.mapRect(-300, -2000 * 0.25, 1690, 50); //1st floor
        spawn.spawnStairs(-610 + 2000 - 50, -500, 4, 250, 350, true); //stairs
        spawn.spawnStairs(-600, 0, 4, 250, 350); //stairs ground
        spawn.bodyRect(700, -200, 100, 100); //center block under wall
        spawn.bodyRect(700, -300, 100, 100); //center block under wall
        spawn.bodyRect(700, -400, 100, 100); //center block under wall
        spawn.mapRect(1390, 13, 30, 20); //step left
        spawn.mapRect(2980, 13, 30, 20); //step right
        spawn.bodyRect(4250, -700, 50, 100);
        spawn.mapRect(3000, -1000, 50, 625); //left wall
        spawn.mapRect(3000 + 2000 - 50, -1300, 50, 1100); //right wall
        spawn.mapRect(4150, -600, 350, 150); //table
        spawn.mapRect(3650, -1300, 50, 700); //exit wall
        spawn.mapRect(3650, -1300, 1350, 50); //exit wall
        spawn.bodyRect(3665, -600, 20, 100); //door

        spawn.mapRect(3025, -600, 250, 125);
        spawn.mapRect(3175, -550, 175, 75);
        // spawn.mapVertex(3160, -525, "625 0   300 0   300 -140   500 -140"); //entrance/exit ramp

        spawn.mapRect(3000, -2000 * 0.5, 700, 50); //exit roof
        spawn.mapRect(3010, -2000 * 0.25, 1690, 50); //1st floor
        spawn.spawnStairs(3000 + 2000 - 50, 0, 4, 250, 350, true); //stairs ground
        spawn.randomSmallMob(4575, -560, 1);
        spawn.randomSmallMob(1315, -880, 1);
        spawn.randomSmallMob(800, -600);
        spawn.randomMob(4100, -225, 0.8);
        spawn.randomMob(-250, -700, 0.8);
        spawn.randomMob(4500, -225, 0.15);
        spawn.randomMob(3250, -225, 0.15);
        spawn.randomMob(-100, -225, 0.1);
        spawn.randomMob(1150, -225, 0.15);
        spawn.randomMob(2000, -225, 0.15);
        spawn.randomMob(450, -225, 0.15);
        spawn.randomMob(100, -1200, 1);
        spawn.randomMob(950, -1150, -0.1);
        spawn.randomGroup(1800, -800, -0.2);
        spawn.randomGroup(4150, -1000, 0.6);

        if (simulation.difficultyMode > 1 || level.levelsCleared > 1) {
            if (Math.random() < 0.5) {
                spawn.tetherBoss(2850, -80, { x: 2500, y: -500 })
            } else {
                spawn.randomLevelBoss(2200, -450)
            }
        } else {
            powerUps.spawnBossPowerUp(2800, -1400)
        }

        spawn.secondaryBossChance(1875, -675)
        //spawn.randomHigherTierMob(-139, -610)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        if (simulation.isHorizontalFlipped) { //flip the map horizontally
            level.flipHorizontal(); //only flips map,body,mob,powerUp,cons,consBB, exit
            level.setPosToSpawn(50, -60);

            if (!isReverse) { //normal direction start in top left
                level.setPosToSpawn(-1375, -1550); //normal spawn //-x
            } else { //reverse direction, start in bottom right
                level.setPosToSpawn(-3137, -650); //normal spawn
            }
            button.min.x = -button.min.x - 126 // flip the button horizontally
            button.max.x = -button.max.x + 126 // flip the button horizontally
            level.custom = () => {
                button.query();
                button.draw();
                if (button.isUp) {
                    door.isClosing = true
                } else {
                    door.isClosing = false
                }
                door.openClose();
                ctx.fillStyle = "#ccc"
                ctx.fillRect(-2495 - 10, -500, 10, 525)
                ctx.fillStyle = "#dff"
                if (isReverse) {
                    ctx.fillRect(-725 - 825, -1950, 825, 450)
                } else {
                    ctx.fillRect(-3050 - 625, -950, 625, 500)
                }
                level.exit.drawAndCheck();

                level.enter.draw();
            };
            level.customTopLayer = () => {
                ctx.fillStyle = "rgba(0,0,0,0.1)"
                ctx.fillRect(-3650 - 1300, -1300, 1300, 1300)
                ctx.fillRect(-3000 - 650, -1000, 650, 1000)
                ctx.fillRect(-750 - 800, -1950, 800, 450)
                ctx.fillRect(-750 - 650, -1450, 650, 1450)
                ctx.fillRect(550 - 1300, -1700, 1300, 1700)
                // ctx.fillRect(0, 0, 0, 0)
                door.draw();
            };
        }

    },
}