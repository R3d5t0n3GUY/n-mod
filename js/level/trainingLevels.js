setTimeout(() => {
    fileLoads.isTrainingLevelsJS = true; //for file handling in fileTester.js
}, 10);

const trainingLevels = {
    walk() { //learn to walk
        if (localSettings.isHideHUD) localSettings.isHideHUD = false
        m.addHealth(Infinity)
        document.getElementById("health").style.display = "none" //hide your health bar
        document.getElementById("health-bg").style.display = "none"
        document.getElementById("defense-bar").style.display = "none"
        document.getElementById("damage-bar").style.display = "none"
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        simulation.lastLogTime = 0; //clear previous messages
        let instruction = 0
        level.trainingText(`move <strong>↔</strong> with <strong class="key-input-train">${input.key.left.replace('Key', '').replace('Digit', '')}</strong> and <strong class="key-input-train">${input.key.right.replace('Key', '').replace('Digit', '')}</strong>`)

        level.custom = () => {
            if (instruction === 0 && input.right) {
                instruction++
                level.trainingText(`<s>move <strong>↔</strong> with <strong class="key-input-train">${input.key.left.replace('Key', '').replace('Digit', '')}</strong> and <strong class="key-input-train">${input.key.right.replace('Key', '').replace('Digit', '')}</strong></s>
                <br>exit through the blue door`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
        };
        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 0, 3500, 1800); //floor
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof
        spawn.mapRect(700, -8, 50, 25);
        spawn.mapRect(725, -16, 75, 25);
        spawn.mapRect(1375, -16, 50, 50);
        spawn.mapRect(1400, -8, 50, 25);
        spawn.mapRect(750, -24, 650, 100);
        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    crouch() { //learn to crouch
        if (localSettings.isTrainingNotAttempted) { //after making it to the second training level 
            localSettings.isTrainingNotAttempted = false // this makes the training button less obvious at the start screen
            if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
        }

        m.addHealth(Infinity)
        level.setPosToSpawn(75, -100); //normal spawn
        spawn.mapRect(25, -60, 100, 20); //small platform for player
        spawn.mapRect(0, -50, 150, 25); //stairs
        spawn.mapRect(-25, -40, 200, 25);
        spawn.mapRect(-50, -30, 250, 25);
        spawn.mapRect(-75, -20, 300, 25);
        spawn.mapRect(-100, -10, 350, 25);
        spawn.mapRect(-150, -50, 175, 75);

        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        let instruction = 0
        level.trainingText(`press <strong class="key-input-train">${input.key.down.replace('Key', '').replace('Digit', '')}</strong> to crouch`)
        level.custom = () => {
            if (instruction === 0 && input.down) {
                instruction++
                level.trainingText(`<s>press <strong class="key-input-train">${input.key.down.replace('Key', '').replace('Digit', '')}</strong> to crouch</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1625, -350, 375, 350)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1625, -350, 375, 350)
            //dark
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(500, -100, 1125, 175);
        };

        // spawn.mapRect(1025, -675, 300, 623); //crouch wall
        // spawn.mapRect(625, -650, 1025, 550);
        spawn.mapRect(500, -650, 1125, 550);
        spawn.mapRect(-200, -650, 875, 300);

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof


        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -1200, 500, 850); //exit roof
    },
    jump() { //learn to jump
        m.addHealth(Infinity)
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        let instruction = 0
        level.trainingText(`hold down <strong class="key-input-train">${input.key.up.replace('Key', '').replace('Digit', '')}</strong> longer to jump higher`)

        level.custom = () => {
            if (instruction === 0 && m.pos.x > 300) {
                instruction++
                level.trainingText(`<s>hold down <strong class="key-input-train">${input.key.up.replace('Key', '').replace('Digit', '')}</strong> longer to jump higher</s>`)
            }
            m.health = 1 //can't die
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //dark
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(1000, 0, 450, 1800)
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(275, -350, 200, 375);
        spawn.mapRect(-250, 0, 1250, 1800); //floor
        spawn.mapRect(1450, 0, 1075, 1800); //floor
        spawn.mapRect(-250, -2800, 1250, 2200); //roof
        spawn.mapRect(1450, -2800, 1075, 2200); //roof
        spawn.mapVertex(375, 0, "150 0  -150 0  -100 -50  100 -50"); //base

        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall

        //roof steps
        spawn.mapRect(1000, -650, 25, 25);
        spawn.mapRect(1000, -675, 50, 25);
        spawn.mapRect(1000, -700, 75, 25);
        spawn.mapRect(1000, -725, 100, 25);
        spawn.mapRect(1425, -650, 25, 25);
        spawn.mapRect(1400, -675, 50, 25);
        spawn.mapRect(1375, -700, 75, 25);
        spawn.mapRect(1350, -725, 100, 25);
        spawn.mapRect(1325, -750, 150, 25);
        spawn.mapRect(1300, -775, 150, 25);
        spawn.mapRect(1000, -750, 125, 25);
        spawn.mapRect(1275, -2800, 200, 2025);
        spawn.mapRect(975, -2800, 200, 2025);
        spawn.mapRect(1000, -775, 150, 25);
    },
    hold() { //put block on button to open door
        m.addHealth(Infinity)
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        spawn.bodyRect(1025, -75, 50, 50); //block to go on button
        const buttonDoor = level.button(500, 0)
        const door = level.door(1612.5, -175, 25, 190, 185, 3)

        let instruction = 0
        level.trainingText(`activate your <strong class='color-f'>field</strong> with <strong class="key-input-train">${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong>`)

        level.custom = () => {
            if (instruction === 0 && input.field) {
                instruction++
                level.trainingText(`<s>activate your <strong class='color-f'>field</strong> with <strong class="key-input-train">${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong></s><br>release your <strong class='color-f'>field</strong> on a <strong class='color-block'>block</strong> to pick it up`)
            } else if (instruction === 1 && m.isHolding) {
                instruction++
                level.trainingText(`<s>activate your <strong class='color-f'>field</strong> with <strong class="key-input-train">${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong><br>release your <strong class='color-f'>field</strong> on a <strong class='color-block'>block</strong> to pick it up</s><br>drop the <strong class='color-block'>block</strong> on the red button to open the door`)
            } else if (instruction === 2 && !buttonDoor.isUp && Vector.magnitudeSquared(Vector.sub(body[0].position, buttonDoor.min)) < 10000) {
                instruction++
                level.trainingText(`<s>activate your <strong class='color-f'>field</strong> with <strong class="key-input-train">${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong><br>release your <strong class='color-f'>field</strong> on a <strong class='color-block'>block</strong> to pick it up<br>drop the <strong class='color-block'>block</strong> on the red button to open the door</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();

            //check if blocks are in the exit zone and destroy them
            for (let i = 0; i < body.length; i++) {
                if (body[i].position.x > 1675) {
                    queueRemoval('body', i)
                    break
                }
            }
            //if no blocks left make a new one
            if (body.length < 2) { //< 2 because the door is a body
                spawn.bodyRect(1025, -550, 50, 50);
            }
        };
        level.customTopLayer = () => {
            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    throw() { //throw a block on button to open door
        m.addHealth(Infinity)
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        spawn.bodyRect(1025, -75, 50, 50); //block to go on button
        const buttonDoor = level.button(1635, -400)
        const door = level.door(1612.5, -175, 25, 190, 185, 3)

        // activate your <strong class='color-f'>field</strong> with <strong class="key-input-train">${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong>
        let instruction = 0
        level.trainingText(`pick up the <strong class='color-block'>block</strong> with your <strong class='color-f'>field</strong>`)

        level.custom = () => {
            if (instruction === 0 && m.isHolding) {
                instruction++
                level.trainingText(`<s>pick up the <strong class='color-block'>block</strong> with your <strong class='color-f'>field</strong></s>
                <br>hold your <strong class='color-f'>field</strong> down to charge up then release to throw a <strong class='color-block'>block</strong>`)
            } else if (instruction === 1 && m.throwCharge > 2) {
                instruction++
                level.trainingText(`<s>pick up the <strong class='color-block'>block</strong> with your <strong class='color-f'>field</strong>
                <br>hold your <strong class='color-f'>field</strong> down to charge up then release to throw a <strong class='color-block'>block</strong></s>
                <br>throw the <strong class='color-block'>block</strong> onto the button`)
                // the <strong class='color-block'>block</strong> at the button
            } else if (instruction === 2 && !buttonDoor.isUp && Vector.magnitudeSquared(Vector.sub(body[0].position, buttonDoor.min)) < 10000) {
                instruction++
                level.trainingText(`<s>pick up the <strong class='color-block'>block</strong> with your <strong class='color-f'>field</strong>
                <br>hold your <strong class='color-f'>field</strong> down to charge up then release to throw a <strong class='color-block'>block</strong>
                <br>throw the <strong class='color-block'>block</strong> onto the button</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //check if blocks are in the exit zone and destroy them
            for (let i = 0; i < body.length; i++) {
                if (body[i].position.x > 1675 && body[i].position.y > -350) {
                    queueRemoval('body', i)
                    break
                }
            }
            //if no blocks left make a new one
            if (body.length < 2) { //< 2 because the door is a body
                spawn.bodyRect(1025, -550, 50, 50);
            }
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        // spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1790, -600, 250, 225); //button left wall
        spawn.mapRect(1625, -400, 400, 50);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    throwAt() { //throw a block at mob to open door
        m.addHealth(Infinity)
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        const door = level.door(1612.5, -175, 25, 190, 185, 3)

        let instruction = 0
        level.trainingText(`throw the <strong class='color-block'>block</strong> at the <strong>mobs</strong> to open the door`)

        level.custom = () => {
            if (instruction === 0 && !mob.length) {
                instruction++
                level.trainingText(`<s>throw the <strong class='color-block'>block</strong> at the <strong>mobs</strong> to open the door</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (mob.length > 0) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)

            //check if blocks are in the exit zone and destroy them
            for (let i = 0; i < body.length; i++) {
                if (body[i].position.x > 1675 && body[i].position.y > -350) {
                    queueRemoval('body', i)
                    break
                }
            }
            //if no blocks left make a new one
            if (body.length < 2) { //< 2 because the door is a body
                spawn.bodyRect(1025, -550, 50, 50);
            }
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        // spawn.mapRect(1600, -1200, 500, 850); //exit roof
        // spawn.mapRect(1790, -600, 250, 225); //button left wall
        // spawn.mapRect(1625, -400, 400, 50);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
        spawn.mapRect(1600, -600, 425, 250);

        spawn.bodyRect(1025, -75, 50, 50); //block to go on button
        spawn.starter(425, -350, 35)
        spawn.starter(800, -350, 44)
    },
    fire() { //throw a block at mob to open door
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = 15;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        const door = level.door(1612.5, -125, 25, 190, 185, 3)
        const buttonDoor = level.button(400, 0)

        let instruction = 0
        level.trainingText(`use your <strong class='color-f'>field</strong> to pick up ${powerUps.orb.gun()}`)

        level.custom = () => {
            if (instruction === 0 && simulation.isChoosing) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up ${powerUps.orb.gun()}</s>
                <br>choose a <strong class='color-g'>gun</strong>`)
            } else if (instruction === 1 && !simulation.isChoosing) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up ${powerUps.orb.gun()}
                <br>choose a <strong class='color-g'>gun</strong></s>
                <br>use the <strong>left mouse</strong> button to shoot the <strong>mobs</strong>`)
            } else if (instruction === 2 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up ${powerUps.orb.gun()}
                <br>choose a <strong class='color-g'>gun</strong>
                <br>use the <strong>left mouse</strong> button to shoot the <strong>mobs</strong></s>
                <br>drop a <strong class='color-block'>block</strong> on the red button to open the door`)
            } else if (instruction === 3 && !door.isClosing) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up ${powerUps.orb.gun()}
                <br>choose a <strong class='color-g'>gun</strong>
                <br>use the <strong>left mouse</strong> button to shoot the <strong>mobs</strong>
                <br>put a <strong class='color-block'>block</strong> on the red button to open the door</s>`)
            }
            if (!powerUp.length) {
                //spawn ammo if you run out
                if (b.inventory.length && b.guns[b.activeGun].ammo === 0) powerUps.directSpawn(1300, -2000, "ammo", false);
                //spawn a gun power up if don't have one or a gun
                if (!b.inventory.length && !simulation.isChoosing) powerUps.directSpawn(1300, -2000, "gun", false);

            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -350, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -350, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(1250, -2800, 100, 2200)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(-150, -2800, 1400, 2200); //roof with tunnel for ammo
        spawn.mapRect(1350, -2800, 675, 2200);

        //ceiling steps
        spawn.mapRect(725, -588, 50, 25);
        spawn.mapRect(725, -600, 75, 25);
        spawn.mapRect(750, -612, 75, 25);
        spawn.mapRect(-275, -650, 1025, 87);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);

        spawn.mapRect(1600, -600, 425, 300);
        spawn.mapRect(1600, -400, 50, 275);

        powerUps.directSpawn(1300, -1500, "gun", false);
        spawn.starter(900, -300, 35)
        spawn.starter(1400, -400, 44)
    },
    deflect() { //learn to jump
        m.addHealth(Infinity)
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        let instruction = 0
        // activate your <strong class='color-f'>field</strong> with <strong>${input.key.field.replace('Key', '').replace('Digit', '')}</strong> or <strong>right mouse</strong>
        level.trainingText(`use your <strong class='color-f'>field</strong> to <strong>deflect</strong> the <strong style="color:rgb(215,0,145);">mobs</strong>`)

        level.custom = () => {
            if (instruction === 0 && m.pos.x > 1350) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to <strong>deflect</strong> the <strong style="color:rgb(215,0,145);">mobs</strong></s>`)
            }
            //teleport to start if hit
            if (m.immuneCycle > m.cycle) {
                m.energy = m.maxEnergy
                Matter.Body.setPosition(player, {
                    x: 60,
                    y: -50
                })
            }
            //spawn bullets
            if (!(simulation.cycle % 5)) {
                spawn.sniperBullet(660 + 580 * Math.random(), -2000, 10, 4);
                const who = mob[mob.length - 1]
                Matter.Body.setVelocity(who, {
                    x: 0,
                    y: 8
                });
                who.timeLeft = 300
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //dark
            ctx.fillStyle = "rgba(0,0,0,0.05)"
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //center falling bullets
            ctx.fillStyle = "rgba(255,0,255,0.013)" //pink?
            ctx.fillRect(650, -2800, 600, 2800)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall

        spawn.mapRect(-250, 0, 3000, 1800); //floor
        spawn.mapRect(-250, -2800, 900, 2200); //roof
        spawn.mapRect(1250, -2800, 1275, 2200); //roof
        spawn.mapVertex(950, 0, "400 0  -400 0  -300 -50  300 -50"); //base

        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall

        //spawn bullets on load to avoid rush
        for (let i = 0; i < 32; i++) {
            spawn.sniperBullet(660 + 580 * Math.random(), -2000 + 40 * i, 10, 4);
            const who = mob[mob.length - 1]
            Matter.Body.setVelocity(who, {
                x: 0,
                y: 8
            });
            who.timeLeft = 300
        }
    },
    heal() { //learn to heal
        m.addHealth(Infinity)
        m.health = 0;
        m.addHealth(0.25)
        document.getElementById("health").style.display = "inline" //show your health bar
        document.getElementById("health-bg").style.display = "inline"
        if (!localSettings.isHideHUD) {
            document.getElementById("defense-bar").style.display = "inline"
            document.getElementById("damage-bar").style.display = "inline"
        }
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor

        let instruction = 0
        level.trainingText(`your <strong>health</strong> is displayed in the top left corner
        <br>use your <strong class='color-f'>field</strong> to pick up <div class="heal-circle" style = "border: none;"></div> until your <strong>health</strong> is full`)

        level.custom = () => {
            if (instruction === 0 && m.health === 1) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up <div class="heal-circle" style = "border: none;"></div> until your <strong>health</strong> is full</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (m.health !== 1) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 0, 3500, 1800); //floor

        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof

        spawn.mapRect(700, -8, 50, 25);
        spawn.mapRect(725, -16, 75, 25);
        spawn.mapRect(1375, -16, 50, 50);
        spawn.mapRect(1400, -8, 50, 25);
        spawn.mapRect(750, -24, 650, 100);
        powerUps.directSpawn(875, -40, "heal", false, 15);
        powerUps.directSpawn(1075, -50, "heal", false, 25);
        powerUps.directSpawn(1275, -65, "heal", false, 35);

        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    nailGun() {
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("nail gun")
        b.guns[b.activeGun].ammo = 0
        simulation.updateGunHUD();

        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        let instruction = 0
        level.trainingText(`use your <strong class='color-f'>field</strong> to pick up <div class="ammo-circle" style = "border: none;"></div> for your <strong class='color-g'>nail gun</strong>`)

        level.custom = () => {
            if (instruction === 0 && b.inventory.length && b.guns[b.activeGun].ammo > 0) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up <div class="ammo-circle" style = "border: none;"></div> for your <strong class='color-g'>nail gun</strong></s>
                <br>use the <strong>left mouse</strong> button to shoot the <strong>mobs</strong>`)
            } else if (instruction === 1 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to pick up <div class="ammo-circle" style = "border: none;"></div> for your <strong class='color-g'>nail gun</strong>
                <br>use the <strong>left mouse</strong> button to shoot the <strong>mobs</strong></s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (mob.length > 0) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(1250, -2800, 100, 2200)
        };

        if (m.health < 1) {
            powerUps.directSpawn(1298, -3500, "heal", false, 23);
            powerUps.directSpawn(1305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 2; i++) {
            spawn.spinner(1300 + i, -3000 - 200 * i, 25 + 5 * i)
            const who = mob[mob.length - 1]
            Matter.Body.setVelocity(who, { x: 0, y: 62 });
            who.isDropPowerUp = false
        }

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-150, -2800, 1400, 2200); //roof with tunnel for ammo
        spawn.mapRect(1350, -2800, 675, 2200);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        // spawn.mapRect(1600, -1200, 500, 850); //exit roof
        // spawn.mapRect(1790, -600, 250, 225); //button left wall
        // spawn.mapRect(1625, -400, 400, 50);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
        spawn.mapRect(1600, -600, 425, 250);
    },
    shotGun() {
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("shotgun")
        // b.guns[b.activeGun].ammo = 0
        // simulation.updateGunHUD();
        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        let instruction = 0
        level.trainingText(`use your <strong class='color-g'>shotgun</strong> to clear the room of mobs`)

        level.custom = () => {
            if (instruction === 0 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-g'>shotgun</strong> to clear the room of mobs</s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (mob.length > 0) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(1250, -2800, 100, 2200)
        };

        if (m.health < 1) {
            powerUps.directSpawn(1298, -3500, "heal", false, 23);
            powerUps.directSpawn(1305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 3; i++) {
            spawn.hopper(1300 + i, -3000 - 2000 * i, 25 + 5 * i)
            mob[mob.length - 1].isDropPowerUp = false
            // Matter.Body.setVelocity(mob[mob.length - 1], { x: 0, y: 0 });
        }
        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-150, -2800, 1400, 2200); //roof with tunnel for ammo
        spawn.mapRect(1350, -2800, 675, 2200);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
        spawn.mapRect(1600, -600, 425, 250);
    },
    superBall() {
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("super balls")
        // b.guns[b.activeGun].ammo = 0
        // simulation.updateGunHUD();
        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        let instruction = 0
        level.trainingText(`use <strong class='color-g'>super balls</strong> to clear the room of mobs`)

        level.custom = () => {
            if (instruction === 0 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use <strong class='color-g'>super balls</strong> to clear the room of mobs</s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (mob.length > 0) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            // ctx.fillRect(1225, -2800, 125, 2450)
            ctx.fillRect(-150, -2800, 1500, 2450);
        };

        if (m.health < 1) {
            powerUps.directSpawn(1298, -3500, "heal", false, 23);
            powerUps.directSpawn(1305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 6; i++) {
            spawn.spawner(i * 230, -800)
            mob[mob.length - 1].isDropPowerUp = false
            // Matter.Body.setVelocity(mob[mob.length - 1], { x: 0, y: 0 });
        }
        spawn.mapVertex(510, -430, "725 0  725  80  -650 80 -650 -80  650 -80"); //upper room with mobs
        spawn.mapRect(-225, -2800, 1450, 2000);
        spawn.mapRect(1350, -2800, 675, 2450);

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    matterWave() { //fire wave through the map to kill mosb
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("wave")
        // b.guns[b.activeGun].ammo = 0
        // simulation.updateGunHUD();
        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        let instruction = 0
        level.trainingText(`use <strong class='color-g'>wave</strong> to clear the room of mobs`)

        level.custom = () => {
            if (instruction === 0 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use <strong class='color-g'>wave</strong> to clear the room of mobs</s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            if (mob.length > 0) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            // ctx.fillRect(1225, -2800, 125, 2450)
            ctx.fillRect(-150, -2800, 1500, 2450);
        };

        if (m.health < 1) {
            powerUps.directSpawn(1298, -3500, "heal", false, 23);
            powerUps.directSpawn(1305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 6; i++) {
            spawn.springer(i * 200, -800)
            mob[mob.length - 1].isDropPowerUp = false
            // Matter.Body.setVelocity(mob[mob.length - 1], { x: 0, y: 0 });
        }
        spawn.springer(1825, -330, 20);

        spawn.mapRect(1175, -850, 50, 500); //upper room with mobs
        spawn.mapRect(-225, -400, 1450, 50);
        spawn.mapRect(-225, -2800, 1450, 2000);
        spawn.mapRect(1350, -2800, 675, 2450);

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
    missile() { //fire a missile to kill mobs and trigger button
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 30); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("missiles")
        // b.guns[b.activeGun].ammo = 0
        // simulation.updateGunHUD();
        const buttonDoor = level.button(2500, 50)
        const door = level.door(1612.5, -175, 25, 190, 185, 3)
        let instruction = 0
        level.trainingText(`use <strong class='color-g'>missiles</strong> to drop a <strong class='color-block'>block</strong> on the button`)

        level.custom = () => {
            if (instruction === 0 && mob.length === 0) {
                instruction++
                level.trainingText(`<s>use <strong class='color-g'>missiles</strong> to drop a <strong class='color-block'>block</strong> on the button</s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();
            door.draw();

            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
            //tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(1250, -2800, 100, 2200)
            ctx.fillRect(1550, 25, 475, 25);
        };
        if (m.health < 1) {
            powerUps.directSpawn(1298, -3500, "heal", false, 23);
            powerUps.directSpawn(1305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 10; i++) {
            spawn.springer(2100 + i * 100, -250)
            mob[mob.length - 1].isDropPowerUp = false
            // Matter.Body.setVelocity(mob[mob.length - 1], { x: 0, y: 0 });
        }

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        // spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(3050, -2800, 1550, 4600);
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(-150, -2800, 1400, 2200); //roof with tunnel for ammo
        spawn.mapRect(1350, -2800, 675, 2200);

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        // spawn.mapRect(1350, 0, 675, 30);
        spawn.mapRect(1550, 0, 475, 35);
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
        spawn.mapRect(1600, -600, 425, 250);

        spawn.mapRect(1975, -600, 50, 625);
        spawn.mapRect(2025, -2800, 1075, 2450);
    },
    stack() { //stack blocks to get to exit
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -685;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        let instruction = 0
        level.trainingText(`use your <strong class='color-f'>field</strong> to stack the <strong class='color-block'>blocks</strong>`)

        level.custom = () => {
            if (instruction === 0 && m.pos.x > 1635) {
                instruction++
                level.trainingText(`<s>use your <strong class='color-f'>field</strong> to stack the <strong class='color-block'>blocks</strong></s>`)
            }

            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -1050, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -1050, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(250, -2800, 200, 1800)
        };

        if (m.health < 1) {
            powerUps.directSpawn(298, -3500, "heal", false, 23);
            powerUps.directSpawn(305, -3000, "heal", false, 35);
        }
        for (let i = 0; i < 15; i++) {
            spawn.bodyRect(280, -2000 - 500 * i, 30 + 80 * Math.random(), 30 + 80 * Math.random());
        }
        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 0, 3500, 1800); //floor
        spawn.mapRect(1600, -650, 450, 775);
        spawn.mapRect(-150, -2800, 400, 1800); //roof with tunnel for ammo
        spawn.mapRect(450, -2800, 1675, 1800);
        spawn.mapVertex(1300, 0, "400 0  -500 0  -300 -125  400 -125"); //base
    },
    mine() { //kill mobs and tack their bodies
        level.setPosToSpawn(300, -50); //normal spawn
        spawn.mapRect(250, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -685;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("mine")

        let instruction = 0
        level.trainingText(`press the red <strong>button</strong> to spawn a <strong>mob</strong>`)
        const button = level.button(-100, -200)
        button.isUp = true
        spawn.mapRect(-150, -200, 240, 425);

        level.custom = () => {
            if (instruction === 0 && !button.isUp) {
                instruction++
                level.trainingText(`<s>press the red <strong>button</strong> to spawn a <strong>mob</strong></s><br>turn the <strong>mobs</strong> into <strong class='color-block'>blocks</strong>`)
            } else if (instruction === 1 && body.length > 2) {
                instruction++
                level.trainingText(`<s>press the red <strong>button</strong> to spawn a <strong>mob</strong><br>turn the <strong>mobs</strong> into <strong class='color-block'>blocks</strong></s><br>use your <strong class='color-f'>field</strong> to stack the <strong class='color-block'>blocks</strong>`)
            } else if (instruction === 2 && m.pos.x > 1635) {
                instruction++
                level.trainingText(`<s>press the red <strong>button</strong> to spawn a <strong>mob</strong><br>turn the <strong>mobs</strong> into <strong class='color-block'>blocks</strong><br>use your <strong class='color-f'>field</strong> to stack the <strong class='color-block'>blocks</strong></s>`)
            }
            //spawn ammo if you run out
            let isAmmo = false
            for (let i = 0; i < powerUp.length; i++) {
                if (powerUp[i].name === 'ammo') isAmmo = true
            }
            if (!isAmmo && b.inventory.length && b.guns[b.activeGun].ammo === 0) {
                powerUps.directSpawn(1300, -2000, "ammo", false);
                powerUps.directSpawn(1301, -2200, "ammo", false);
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -1050, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            button.query();
            button.draw();
            if (!button.isUp) {
                if (button.isReady) {
                    button.isReady = false
                    spawn.exploder(335, -1700)
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: 0,
                        y: 20
                    });
                    ctx.fillStyle = "rgba(255,0,0,0.9)"
                    ctx.fillRect(550, -2800, 200, 1800)
                }
            } else {
                button.isReady = true
            }
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -1050, 400, 400)
            //ammo tunnel shadow
            ctx.fillStyle = "rgba(0,0,0,0.4)"
            ctx.fillRect(550, -2800, 200, 1800)
        };

        if (m.health < 1) {
            powerUps.directSpawn(298, -3500, "heal", false, 23);
            powerUps.directSpawn(305, -3000, "heal", false, 35);
        }
        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 0, 3500, 1800); //floor
        spawn.mapRect(1600, -650, 450, 775);
        spawn.mapRect(-150, -2800, 700, 1800); //roof with tunnel for ammo
        spawn.mapRect(750, -2800, 1675, 1800);
        spawn.mapVertex(1300, 0, "400 0  -600 0  -300 -125  400 -125"); //base
    },
    grenades() { //jump at the top of the elevator's path to go extra high
        level.setPosToSpawn(0, -50); //normal spawn
        spawn.mapRect(-50, -10, 100, 20); //small platform for player
        level.exit.x = 1900;
        level.exit.y = -2835;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("grenades")

        const elevator1 = level.elevator(550, -100, 180, 25, -840, 0.003, {
            up: 0.05,
            down: 0.2
        }) // x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        elevator1.addConstraint();
        const toggle1 = level.toggle(275, 0) //(x,y,isOn,isLockOn = true/false)

        const elevator2 = level.elevator(1400, -950, 180, 25, -2400, 0.0025) // x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        elevator2.addConstraint();
        const button2 = level.button(1000, -850)

        let instruction = 0
        level.trainingText(`flip the <strong>switch</strong> to turn on the <strong>elevator</strong>`)
        level.custom = () => {
            if (instruction === 0 && elevator1.isOn) {
                instruction++
                level.trainingText(`<s>flip the <strong>switch</strong> to turn on the <strong>elevator</strong></s>
                <br>put a <strong class='color-block'>block</strong> on the <strong>button</strong> to active the <strong>elevator</strong>`)
            } else if (instruction === 1 && elevator2.isOn) {
                instruction++
                level.trainingText(`<s>flip the <strong>switch</strong> to turn on the <strong>elevator</strong><br>put a <strong class='color-block'>block</strong> on the <strong>button</strong> to active the <strong>elevator</strong></s>
                <br>hold <strong>jump</strong> before the <strong>elevator's</strong> <strong>apex</strong> to reach the <strong>exit</strong>`)
            } else if (instruction === 2 && m.pos.x > 1635) {
                instruction++
                level.trainingText(`<s>flip the <strong>switch</strong> to turn on the <strong>elevator</strong><br>put a <strong class='color-block'>block</strong> on the <strong>button</strong> to active the <strong>elevator</strong><br>hold <strong>jump</strong> before the <strong>elevator's</strong> <strong>apex</strong> to reach the <strong>exit</strong></s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1725, -3100, 375, 300);

            level.enter.draw();
            level.exit.drawAndCheck();
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
            } else {
                ctx.fillStyle = "#aaa"
            }
            ctx.fillRect(640, -825, 1, 745)

            button2.query();
            button2.draw();
            if (button2.isUp) {
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
            ctx.fillRect(1490, -2300, 1, 1375)
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1725, -3100, 375, 300);
            //shadows
            ctx.fillStyle = "rgba(0,0,0,0.05)"
            ctx.fillRect(-150, -250, 300, 250);
            let grd = ctx.createLinearGradient(0, -150, 0, -2300);
            grd.addColorStop(0, "rgba(0,0,0,0.35)");
            grd.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grd //"rgba(0,0,100,0.01)"
            ctx.fillRect(-200, -2300, 1825, 2300);
        };

        if (m.health < 1) {
            powerUps.directSpawn(298, -3500, "heal", false, 23);
            powerUps.directSpawn(305, -3000, "heal", false, 35);
        }
        spawn.mapRect(-2750, -4800, 2600, 6600); //left wall
        spawn.mapRect(1600, -2800, 3000, 4600); //right wall
        spawn.mapRect(-150, -4800, 300, 4550);
        spawn.mapRect(2125, -4775, 2475, 2050);
        spawn.mapRect(-250, 0, 3500, 1800); //floor
        spawn.mapRect(750, -850, 950, 950);
        spawn.mapRect(125, -275, 25, 100);
        spawn.mapRect(2100, -3150, 50, 350);
        spawn.mapRect(1725, -3150, 50, 175);
        spawn.mapRect(1725, -3150, 425, 50);

        spawn.nodeGroup(1200, -1500, "grenadier", 7, 35, 200);
        //     nodeGroup(
        //     x,
        //     y,
        //     spawn = "striker",
        //     nodes = Math.min(2 + Math.ceil(Math.random() * (simulation.difficulty + 2)), 8),
        //     //Math.ceil(Math.random() * 3) + Math.min(4,Math.ceil(simulation.difficulty/2)),
        //     radius = Math.ceil(Math.random() * 10) + 18, // radius of each node mob
        //     sideLength = Math.ceil(Math.random() * 100) + 70, // distance between each node mob
        //     stiffness = Math.random() * 0.03 + 0.005
        // )
    },
    harpoon() { //jump at the top of the elevator's path to go extra high
        level.setPosToSpawn(0, -50); //normal spawn
        spawn.mapRect(-50, -10, 100, 20); //small platform for player
        level.exit.x = 1900;
        level.exit.y = -2835;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor
        b.resetAllGuns();
        b.giveGuns("harpoon")

        let instruction = 0
        level.trainingText(`climb up to the exit`)
        level.custom = () => {
            if (instruction === 0 && m.pos.x > 1635) {
                instruction++
                level.trainingText(`<s>climb up to the exit</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1725, -3100, 375, 300);

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1725, -3100, 375, 300);
            //shadows
            ctx.fillStyle = "rgba(0,90,100,0.05)"
            ctx.fillRect(-150, -250, 300, 250);
            let grd = ctx.createLinearGradient(0, -150, 0, -2300);
            grd.addColorStop(0, "rgba(0,90,100,0.35)");
            grd.addColorStop(1, "rgba(0,90,100,0)");
            ctx.fillStyle = grd //"rgba(0,0,100,0.01)"
            ctx.fillRect(-200, -2300, 1825, 2300);
            vanish1.query();
            vanish2.query();
            vanish3.query();
            vanish4.query();
            vanish5.query();
            vanish6.query();
            vanish7.query();
            vanish8.query();
            vanish9.query();
            vanish10.query();
            vanish11.query();
            vanish12.query();
        };
        const vanish1 = level.vanish(175, -325, 175, 25); //x, y, width, height, hide = { x: 0, y: 100 }  //hide should just be somewhere behind the map so the player can't see it
        const vanish2 = level.vanish(525, -625, 175, 25);
        const vanish3 = level.vanish(1125, -1125, 175, 25);
        const vanish4 = level.vanish(1500, -1450, 100, 25);
        const vanish5 = level.vanish(1125, -1675, 175, 25);
        const vanish6 = level.vanish(750, -1950, 175, 25);
        const vanish7 = level.vanish(550, -1950, 175, 25);
        const vanish8 = level.vanish(350, -1950, 175, 25);
        const vanish9 = level.vanish(150, -1950, 175, 25);
        const vanish10 = level.vanish(325, -2300, 200, 25);
        const vanish11 = level.vanish(725, -2550, 100, 25);
        const vanish12 = level.vanish(1125, -2700, 150, 25);

        if (m.health < 1) {
            powerUps.directSpawn(298, -3500, "heal", false, 23);
            powerUps.directSpawn(305, -3000, "heal", false, 35);
        }
        spawn.mapRect(-2750, -4800, 2600, 6600); //left wall
        spawn.mapRect(1600, -2800, 3000, 4600); //right wall
        spawn.mapRect(-150, -4800, 300, 4550);
        spawn.mapRect(2125, -4775, 2475, 2050);
        spawn.mapRect(-250, 0, 3500, 1800); //floor
        spawn.mapRect(750, -850, 950, 950);
        spawn.mapRect(125, -275, 25, 100);
        spawn.mapRect(2100, -3150, 50, 350);
        spawn.mapRect(1725, -3150, 50, 175);
        spawn.mapRect(1725, -3150, 425, 50);

        spawn.grower(250, -375);
        spawn.grower(1000, -900)
        spawn.grower(1475, -925);
        spawn.grower(275, -2000);
        spawn.grower(650, -2000);
        spawn.grower(1475, -975);
        spawn.grower(1575, -1525);
        spawn.grower(1700, -2850);
    },
    diamagnetism() {
        if (localSettings.isHideHUD) localSettings.isHideHUD = false
        m.addHealth(Infinity)
        document.getElementById("health").style.display = "none" //hide your health bar
        document.getElementById("health-bg").style.display = "none"
        document.getElementById("defense-bar").style.display = "none"
        document.getElementById("damage-bar").style.display = "none"
        const futureGuns = ["harpoon", "shotgun", "nail gun", "super balls", "wave", "foam", "laser"];
        const futureGun = Math.floor(Math.random() * futureGuns.length)
        b.giveGuns(futureGuns[futureGun], Infinity)
        m.setField(2)
        m.fieldRegen = 0;
        level.trainingText(`<strong>diamagnetism</strong> by <span class='color-var'>Richard0820</span><br><strong>Don't get hit.</strong><br> Find the portal to the exit.`)
        const dodge = [];
        const button = level.button(350 - 63, -300)
        const door = level.door(750, -275, 50, 125, 125)
        const door2 = level.door(750, -525, 50, 125, 125);
        const forceOne = forceField(4425, -3925, 525, 3975);
        const forceTwo = forceField(1550, -9950, 275, 3300);
        const forceThree = forceField(4200, -8725, 750, 4450);
        const respawnX = [];
        respawnX.push(setRespawn(-50, -625, 825, 375));
        respawnX.push(setRespawn(3225, -3675, 1200, 1000));
        respawnX.push(setRespawn(3575, -5675, 625, 800));
        respawnX.push(setRespawn(775, -4250, 400, 375));
        respawnX.push(setRespawn(2825, -2975, 250, 300));
        respawnX.push(setRespawn(3675, -1125, 325, 250));
        let respawnPoints = {
            x: 125,
            y: -9575,
        }
        door2.isClosing = true;
        button.isUp = true
        level.setPosToSpawn(125, -9575); //normal spawn
        level.exit.x = -1825;
        level.exit.y = 50;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        alternate(-50, -9050, 425, 100);
        const image = new Image()
        image.src = "https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/Hotpot-removed.png";
        level.chain(-675, 400, -0.4366271598, true, 20)
        level.chain(-1600, 125, 0.5144513131, true, 19)
        const portal = portall({
            x: 3825,
            y: -1000,
        },
            3 * Math.PI, {
            x: 550,
            y: -100,
        },
            3 * Math.PI
        );
        level.custom = () => {
            portal[2].query();
            portal[3].query();
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            forceOne.query()
            forceTwo.query()
            forceThree.query()
            if (input.field && player.position.x < 775 && player.position.x > -50) {
                if (m.energy > 0.02) {
                    m.energy -= 0.01
                } else {
                    input.field = false
                }
            }
            level.exit.drawAndCheck();
            level.enter.draw();
            button.query()
            button.draw()
            if (!button.isUp) {
                door.isClosing = true;
                door2.isClosing = false;
            } else if (button.isUp) {
                door.isClosing = false;
                door2.isClosing = true;
            }
            door.draw()
            door.openClose()
            door2.draw()
            door2.openClose()
            for (let i = 0; i < dodge.length; i++) dodge[i].query();
            for (let i = 0; i < respawnX.length; i++) respawnX[i].query();
            ctx.fillStyle = "gray";
            ctx.fillRect(1175, -6650, 2400, 2375);
            ctx.drawImage(image, 1175 + 1200 - 250, -6650 + (2375 / 2) - 250, 500, 500)
            if (m.immuneCycle > m.cycle) {
                m.energy = m.maxEnergy
                Matter.Body.setPosition(player, {
                    x: respawnPoints.x,
                    y: respawnPoints.y
                })
            }
        };
        level.customTopLayer = () => { };
        spawn.mapRect(-100, 0, 5100, 100);
        spawn.mapRect(-100, -10000, 5100, 100);
        spawn.mapRect(4900, -10000, 100, 10100);
        spawn.mapRect(-100, -10000, 100, 9800);
        spawn.mapRect(-100, -9525, 450, 100);
        spawn.mapRect(725, -300, 100, 400);
        spawn.mapRect(725, -10000, 100, 9500);
        spawn.mapRect(-100, -300, 925, 100);
        spawn.mapRect(800, -675, 3675, 100);
        spawn.mapRect(4375, -1425, 100, 850);
        spawn.mapRect(1350, -1425, 3125, 100);
        spawn.mapRect(1350, -1425, 100, 600);
        spawn.mapRect(1350, -925, 2700, 100);
        spawn.mapRect(1575, -1175, 2475, 100);
        spawn.mapRect(3950, -1175, 100, 350);
        spawn.mapRect(4375, -2725, 100, 1400);
        spawn.mapRect(775, -2725, 2325, 100);
        spawn.mapRect(3200, -2725, 1275, 100);
        spawn.mapRect(3200, -3975, 100, 1350);
        spawn.mapRect(4375, -3950, 100, 1125);
        spawn.mapRect(4375, -3975, 625, 100);
        spawn.mapRect(3200, -4325, 100, 450);
        spawn.mapRect(3200, -4325, 1600, 100);
        spawn.mapRect(4450, -2725, 50, 25);
        spawn.mapRect(1125, -3025, 2175, 100);
        spawn.mapRect(725, -3925, 2175, 100);
        spawn.mapRect(3525, -6700, 100, 2475);
        spawn.mapRect(4150, -6700, 100, 2475);
        spawn.mapRect(1125, -6700, 2500, 105);
        spawn.mapRect(1125, -6700, 100, 2625);
        spawn.mapRect(1500, -8775, 100, 2175);
        spawn.mapRect(4150, -8775, 100, 1900);
        spawn.mapRect(1775, -8775, 2475, 100);
        spawn.mapRect(4225, -6700, 50, 25);
        spawn.mapRect(4150, -8775, 850, 100);
        spawn.mapRect(3600, -2825, 125, 125);
        spawn.mapRect(3275, -3050, 125, 125);
        spawn.mapRect(3600, -3275, 125, 125);
        spawn.mapRect(3300, -3525, 125, 125);
        spawn.mapRect(3575, -3725, 900, 125);
        spawn.mapRect(4075, -3775, 75, 75);
        spawn.mapRect(4225, -3875, 75, 175);
        spawn.mapRect(3600, -6625, 100, 100);
        spawn.mapRect(4075, -6475, 100, 100);
        spawn.mapRect(3600, -6300, 100, 100);
        spawn.mapRect(4075, -6175, 100, 100);
        spawn.mapRect(3600, -6000, 100, 100);
        spawn.mapRect(4075, -5875, 100, 100);
        spawn.mapRect(3600, -5700, 100, 100);
        spawn.mapRect(4075, -5550, 100, 100);
        spawn.mapRect(3600, -5400, 100, 1125);
        spawn.mapRect(3675, -5300, 100, 1025);
        spawn.mapRect(3750, -5225, 100, 950);
        spawn.mapRect(3825, -5150, 100, 875);
        spawn.mapRect(3900, -5075, 100, 800);
        spawn.mapRect(3975, -5000, 100, 725);
        spawn.mapRect(4050, -4925, 125, 650);
        spawn.mapRect(4150, -6925, 75, 125);
        spawn.mapRect(1775, -8775, 100, 1900);
        spawn.mapRect(1775, -9950, 100, 975);
        spawn.mapRect(1500, -9950, 100, 975);
        spawn.mapRect(1275, -8775, 325, 100);
        spawn.mapRect(1200, -7775, 25, 1175);
        spawn.mapRect(1250, -7950, 25, 1350);
        spawn.mapRect(1300, -8175, 25, 1575);
        spawn.mapRect(1350, -8500, 25, 1900);
        spawn.mapRect(1400, -8625, 25, 2025);
        spawn.mapRect(1450, -8700, 25, 2100);
        spawn.mapRect(1150, -7625, 25, 1025);
        spawn.mapRect(1125, -4325, 2175, 100);
        spawn.mapRect(4250, -925, 150, 100);
        spawn.mapRect(575, -225, 175, 50);
        spawn.mapRect(575, -50, 175, 75);
        spawn.mapRect(-25, 50, 125, 100);
        spawn.mapRect(75, 75, 50, 50);
        spawn.sniper(3600, -7300);
        spawn.sniper(3325, -7475);
        spawn.sniper(2825, -7500);
        spawn.sniper(2250, -7450);
        spawn.sniper(4125, -5150);
        spawn.sniper(4100, -5675);
        spawn.sniper(4100, -5950);
        spawn.sniper(4125, -6325);
        spawn.sniper(3875, -6975);
        spawn.stabber(4075, -4075);
        spawn.stabber(3775, -3950);
        spawn.stabber(3500, -3850);
        spawn.stabber(4000, -3500);
        spawn.stabber(3850, -3125);
        spawn.stabber(3450, -3125);
        spawn.stabber(4225, -2900);
        spawn.hopper(4125, -250);
        spawn.hopper(3525, -250);
        spawn.hopper(2925, -325);
        spawn.hopper(2175, -150);
        spawn.hopper(1175, -400);
        spawn.mantisBoss(3425, -9350);
        spawn.pulsarBoss(1725, -6050, 1);
        spawn.pulsarBoss(1800, -4850, 1);
        spawn.pulsarBoss(3000, -4825, 1);
        spawn.pulsarBoss(2975, -6175, 1);
        spawn.spinner(2025, -4050);
        spawn.spinner(2125, -2825);
        spawn.pulsar(2450, -3775);
        spawn.pulsar(2200, -3750);
        spawn.pulsar(1900, -3775);
        spawn.pulsar(1600, -3725);
        spawn.pulsar(1300, -3750);
        spawn.pulsar(925, -3725);
        spawn.focuser(3925, -2375);
        spawn.focuser(1150, -2450);
        spawn.focuser(2450, -1675);
        spawn.mapVertex(-850, 500, "0 0 500 0 250 500");
        spawn.mapVertex(-1775, 250, "0 0 500 0 250 500");
        spawn.bodyRect(25, -375, 50, 50);
        function alternate(x, y, width, height, spacingX = 25, spacingY = 1500, number = 6) {
            for (let i = 0; i < number; i++) {
                if (i % 2 === 0) {
                    dodge.push(back(x, y + i * (height + spacingY), width, height, level.enter.x, level.enter.y))
                } else {
                    dodge.push(back(x + width - spacingX, y + i * (height + spacingY), width, height, level.enter.x, level.enter.y))
                }
            }
        }
        function back(x, y, width, height, x1, y1) {
            return {
                move: { x: x1, y: y1 },
                min: { x: x, y: y },
                max: { x: x + width, y: y + height },
                width: width,
                height: height,
                maxHeight: height,
                isOn: true,
                query() {
                    if (this.isOn) {
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = `hsla(0, 100%, 50%,${0.6 + 0.4 * Math.random()})`
                        ctx.strokeRect(this.min.x, this.min.y, this.width, this.height)
                        if (this.height > 0 && Matter.Query.region([player], this).length) {
                            Matter.Body.setVelocity(player, { x: 0, y: 0 })
                            Matter.Body.setPosition(player, { x: this.move.x, y: this.move.y })
                            m.energy = m.maxEnergy;
                        }
                    }
                },
            }
        }
        function forceField(x, y, width, height) {
            return {
                min: { x: x, y: y },
                max: { x: x + width, y: y + height },
                width: width,
                height: height,
                maxHeight: height,
                isOn: true,
                query() {
                    if (this.isOn) {
                        ctx.fillStyle = `rgba(0, 250, 250, 0.55)`
                        ctx.fillRect(this.min.x, this.min.y, this.width, this.height)
                        if (this.height > 0 && Matter.Query.region([player], this).length && input.field) {
                            player.force.y -= 0.015;
                            m.energy = m.maxEnergy;
                        }
                        ctx.fillStyle = `rgba(0, 250, 250)`
                        ctx.fillRect(this.min.x + this.width * Math.random(), this.min.y, 5, this.height)
                    }
                },
            }
        }
        function setRespawn(x, y, width, height) {
            return {
                min: { x: x, y: y },
                max: { x: x + width, y: y + height },
                width: width,
                height: height,
                maxHeight: height,
                isOn: true,
                query() {
                    if (this.isOn) {
                        ctx.fillStyle = `rgba(0, 250, 0, 0.11)`
                        ctx.fillRect(this.min.x, this.min.y, this.width, this.height)
                        if (this.height > 0 && Matter.Query.region([player], this).length) {
                            m.energy = m.maxEnergy;
                            respawnPoints.x = this.min.x + (this.width / 2);
                            respawnPoints.y = this.min.y + (this.height / 2);
                        }
                    }
                },
            }
        }
        function portall(centerA, angleA, centerB, angleB) {
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
                    if (this.portalPair.angle % (Math.PI / 2)) { //if left, right up or down
                        // if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                        Matter.Body.setPosition(player, this.portalPair.portal.position);
                    } else {
                        // if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                        Matter.Body.setPosition(player, this.portalPair.position);
                    }
                    let mag
                    if (this.portalPair.angle !== 0 && this.portalPair.angle !== Math.PI) { //portal that fires the player up
                        mag = Math.max(10, Math.min(50, player.velocity.y * 0.8)) + 11
                    } else {
                        mag = Math.max(6, Math.min(50, Vector.magnitude(player.velocity)))
                    }
                    let v = Vector.mult(this.portalPair.unit, mag)
                    Matter.Body.setVelocity(player, v);
                    // move bots to player
                    for (let i = 0; i < bullet.length; i++) {
                        if (bullet[i].botType) {
                            // Matter.Body.setPosition(bullet[i], this.portalPair.portal.position);
                            Matter.Body.setPosition(bullet[i], Vector.add(this.portalPair.portal.position, {
                                x: 250 * (Math.random() - 0.5),
                                y: 250 * (Math.random() - 0.5)
                            }));
                            Matter.Body.setVelocity(bullet[i], { x: 0, y: 0 });
                        }
                    }
                    if (tech.isHealAttract) {  //send heals to next portal
                        for (let i = 0; i < powerUp.length; i++) {
                            if (powerUp[i].name === "heal" && Vector.magnitudeSquared(Vector.sub(powerUp[i].position, m.pos)) < 1000000) {
                                Matter.Body.setPosition(powerUp[i], Vector.add(this.portalPair.portal.position, { x: 500 * (Math.random() - 0.5), y: 500 * (Math.random() - 0.5) }));
                            }
                        }
                    }
                }
                // if (body.length) {
                for (let i = 0, len = body.length; i < len; i++) {
                    if (body[i] !== m.holdingTarget) {
                        // body[i].bounds.max.x - body[i].bounds.min.x < 100 && body[i].bounds.max.y - body[i].bounds.min.y < 100
                        if (Matter.Query.collides(this, [body[i]]).length === 0) {
                            if (body[i].isInPortal === this) body[i].isInPortal = null
                        } else if (body[i].isInPortal !== this) { //touching this portal, but for the first time
                            if (isRemoveBlocks) {
                                queueRemoval('body', i)
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
                            if (this.portalPair.angle !== 0 && this.portalPair.angle !== Math.PI) { //portal that fires the player up
                                mag = Math.max(10, Math.min(50, body[i].velocity.y * 0.8)) + 11
                            } else {
                                mag = Math.max(6, Math.min(50, Vector.magnitude(body[i].velocity)))
                            }
                            let v = Vector.mult(this.portalPair.unit, mag)
                            Matter.Body.setVelocity(body[i], v);
                        }
                    }
                }
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
        }
    },
    trainingTemplate() { //learn to crouch
        m.addHealth(Infinity)
        document.getElementById("health").style.display = "none" //hide your health bar
        document.getElementById("health-bg").style.display = "none"
        document.getElementById("defense-bar").style.display = "none"
        document.getElementById("damage-bar").style.display = "none"
        level.setPosToSpawn(60, -50); //normal spawn
        spawn.mapRect(10, -10, 100, 20); //small platform for player
        level.exit.x = 1775;
        level.exit.y = -35;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 100); //exit bump
        simulation.zoomScale = 1400 //1400 is normal
        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom, 1)
        document.body.style.backgroundColor = level.trainingBackgroundColor


        let instruction = 0
        level.trainingText(`press <strong class="key-input-train">${input.key.down.replace('Key', '').replace('Digit', '')}</strong> to crouch`)

        level.custom = () => {
            if (instruction === 0 && input.down) {
                instruction++

                level.trainingText(`<s>press <strong class="key-input-train">${input.key.down.replace('Key', '').replace('Digit', '')}</strong> to crouch</s>`)
            }
            //exit room
            ctx.fillStyle = "#f2f2f2"
            ctx.fillRect(1600, -400, 400, 400)

            level.enter.draw();
            level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            //exit room glow
            ctx.fillStyle = "rgba(0,255,255,0.05)"
            ctx.fillRect(1600, -400, 400, 400)
        };

        spawn.mapRect(-2750, -2800, 2600, 4600); //left wall
        spawn.mapRect(2000, -2800, 2600, 4600); //right wall
        spawn.mapRect(-250, 50, 3500, 1750); //floor
        spawn.mapRect(-200, 0, 950, 100);
        spawn.mapRect(1575, 0, 500, 100);
        spawn.mapRect(-250, -2800, 3500, 2200); //roof

        spawn.mapRect(725, 12, 50, 25);
        spawn.mapRect(725, 25, 75, 25);
        spawn.mapRect(750, 38, 75, 25);
        spawn.mapRect(1525, 25, 75, 50);
        spawn.mapRect(1500, 38, 50, 25);
        spawn.mapRect(1550, 12, 50, 25);
        spawn.mapRect(1600, -1200, 500, 850); //exit roof
        spawn.mapRect(1600, -400, 50, 225); //exit room left upper wall
    },
}