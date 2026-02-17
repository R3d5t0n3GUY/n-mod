setTimeout(() => {
    fileLoads.isModLevelsJS = true; //for file handling in fileTester.js
}, 10);

const modLevels = {
    gettingOverIt() {
        // level.announceMobTypes()
        //simulation.enableConstructMode()
        simulation.inGameConsole(`<strong>gettingOverIt</strong> by <em>tbxyd</em>.
        	<br>made for n-hanced`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 1500;
        level.exit.y = -1875;
        simulation.fallHeight = 1500
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // color.map = "#444" //custom map color

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => { };
        spawn.mapRect(1600, -325, 75, 75);
        spawn.mapRect(1025, -375, 25, 25);
        spawn.mapRect(1025, -525, 25, 225);
        spawn.mapRect(1175, 25, 200, 25);
        spawn.mapRect(1625, -350, 25, 25);
        spawn.mapRect(1600, -350, 75, 100);
        spawn.mapRect(1600, -375, 75, 125);
        spawn.mapRect(1000, -850, 50, 25);
        spawn.mapRect(1025, -1025, 25, 175);
        spawn.mapRect(1000, -1050, 50, 25);
        spawn.mapRect(1000, -1200, 50, 150);
        spawn.mapRect(1000, -1425, 50, 225);
        spawn.mapRect(1000, -1050, 25, 75);
        spawn.mapRect(-100, 0, 1000, 100);
        spawn.mapRect(50, -700, 25, 25);
        spawn.mapRect(-425, -700, 25, 25);
        spawn.mapRect(-450, -1075, 25, 400);
        spawn.mapRect(-450, -1050, 25, 25);
        spawn.mapRect(-450, -1075, 150, 25);
        spawn.mapRect(-175, -1200, 25, 250);
        spawn.mapRect(1000, -1825, 50, 400);
        spawn.mapRect(25, -675, 25, 25);
        spawn.mapRect(-200, -525, 25, 25);
        spawn.mapRect(-425, -1225, 25, 25);
        spawn.mapRect(-450, -1225, 25, 25);
        spawn.mapRect(-175, -1450, 25, 250);
        spawn.mapRect(-475, -1075, 50, 25);
        spawn.mapRect(-175, -1650, 25, 200);
        spawn.mapRect(-525, -1350, 25, 100);
        spawn.mapRect(-450, -1450, 25, 250);
        spawn.mapRect(-400, -1525, 25, 25);
        spawn.mapRect(-425, -1500, 50, 50);
        spawn.mapRect(-550, -1500, 25, 150);
        spawn.mapRect(-525, -1450, 25, 100);
        spawn.mapRect(-425, -1600, 50, 100);
        spawn.mapRect(975, -1225, 75, 25);
        spawn.mapRect(-650, -1450, 25, 25);
        spawn.mapRect(-575, -1450, 100, 25);
        spawn.mapRect(-550, -1600, 150, 150);
        spawn.mapRect(-425, -1750, 50, 150);
        spawn.mapRect(-575, -1550, 25, 125);
        spawn.mapRect(-500, -1475, 50, 50);
        spawn.mapRect(-400, -2125, 25, 25);
        spawn.mapRect(-425, -2150, 50, 425);
        spawn.mapRect(-1000, -1900, 150, 25);
        spawn.mapRect(-575, -2125, 50, 50);
        spawn.mapRect(-575, -2150, 175, 75);
        spawn.mapRect(-925, -1950, 75, 50);
        spawn.mapRect(-875, -2000, 27.5, 50);
        spawn.mapRect(-875, -2250, 25, 250);
        spawn.mapRect(-875, -2275, 25, 25);
        spawn.mapRect(-875, -2275, 50, 25);
        spawn.mapRect(-1000, -2300, 125, 400);
        spawn.mapRect(-925, -2300, 125, 25);
        spawn.mapRect(-1000, -2675, 200, 375);
        spawn.mapRect(650, -1850, 950, 25);
        spawn.mapRect(625, -1850, 25, 25);
        spawn.mapRect(-500, -1425, 50, 150);
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level
        // spawn.bodyRect(1540, -1110, 300, 25, 0.9); 
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomMob(2650, -975, 0.8);
        // spawn.randomGroup(1700, -900, 0.4);
        // if (simulation.difficulty > 1) spawn.randomLevelBoss(2200, -1300);
        // spawn.secondaryBossChance(100, -1500)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                powerUps.spawn(level.exit.x - 50 * i - 50, level.exit.y - 5, "tech") //reward for completing the hard challenge
            }, 50);
        }
    },
    movementTech() {
        // level.announceMobTypes()
        //simulation.enableConstructMode()
        simulation.inGameConsole(`<strong>movementTech</strong> by <em>tbxyd</em>.
        	<br>made for n-hanced`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 1500;
        level.exit.y = -1875;
        simulation.fallHeight = 1500
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // color.map = "#444" //custom map color

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => { };
        spawn.mapRect(-150, 0, 1150, 75);
        spawn.mapRect(1800, -25, 775, 125);
        spawn.mapRect(1750, 50, 125, 25);
        spawn.mapRect(1725, 75, 100, 25);
        spawn.mapRect(-325, -725, 225, 825);
        spawn.mapRect(-100, -700, 1000, 150);
        spawn.mapRect(2400, -250, 150, 125);
        spawn.mapRect(2425, -525, 150, 125);
        spawn.mapRect(2450, -375, 25, 50);
        spawn.mapRect(2425, -375, 200, 125);
        spawn.mapRect(2400, -100, 175, 150);
        spawn.mapRect(2425, -175, 175, 175);
        spawn.mapRect(2450, -300, 175, 400);
        spawn.mapRect(2450, -500, 175, 175);
        spawn.mapRect(2450, -525, 175, 75);
        spawn.mapRect(2400, -500, 25, 300);
        spawn.mapRect(2425, -500, 25, 25);
        spawn.mapRect(2400, -525, 25, 25);
        spawn.mapRect(2425, -450, 25, 150);
        spawn.mapRect(2425, -350, 50, 25);
        spawn.mapRect(2400, -350, 75, 225);
        spawn.mapRect(2425, -500, 50, 175);
        spawn.mapRect(2400, -450, 50, 175);
        spawn.mapRect(2425, -100, 25, 50);
        spawn.mapRect(2400, -125, 100, 75);
        spawn.mapRect(2375, -475, 75, 225);
        spawn.mapRect(2375, -200, 100, 175);
        spawn.mapRect(2275, -250, 125, 225);
        spawn.mapRect(2300, -375, 100, 175);
        spawn.mapRect(2350, -425, 25, 75);
        spawn.mapRect(2225, -125, 100, 125);
        spawn.mapRect(2175, -100, 125, 150);
        spawn.mapRect(2225, -200, 75, 100);
        spawn.mapRect(-150, -725, 2250, 175);
        spawn.mapRect(2050, -50, 275, 25);
        spawn.mapRect(2125, -75, 150, 25);
        spawn.mapRect(2175, -125, 100, 50);
        spawn.mapRect(2150, -100, 100, 50);
        spawn.mapRect(2125, -150, 200, 75);
        spawn.mapRect(2050, -75, 125, 25);
        spawn.mapRect(2075, -100, 125, 25);
        spawn.mapRect(2125, -100, 175, 25);
        spawn.mapRect(2075, -125, 150, 25);
        spawn.mapRect(1950, -50, 300, 100);
        spawn.mapRect(2025, -75, 200, 75);
        spawn.mapRect(2000, -50, 150, 100);
        spawn.mapRect(2000, -50, 50, 25);
        spawn.mapRect(1975, -75, 275, 125);
        spawn.mapRect(2000, -100, 200, 75);
        spawn.mapRect(2100, -550, 150, 150);
        spawn.mapRect(2100, -725, 150, 200);
        spawn.mapRect(2425, -725, 200, 75);
        spawn.mapRect(2175, -900, 75, 200);
        spawn.mapRect(2200, -1125, 25, 100);
        spawn.mapRect(2200, -1100, 25, 50);
        spawn.mapRect(2200, -1125, 25, 25);
        spawn.mapRect(2175, -1100, 75, 100);
        spawn.mapRect(2450, -1100, 50, 200);
        spawn.mapRect(2425, -1100, 200, 400);
        spawn.mapRect(150, -425, 225, 25);
        spawn.mapRect(325, -500, 75, 25);
        spawn.mapRect(400, -450, 75, 25);
        spawn.mapRect(375, -400, 50, 25);
        spawn.mapRect(400, -425, 50, 25);
        spawn.mapRect(375, -450, 50, 25);
        spawn.mapRect(350, -475, 100, 25);
        spawn.mapRect(325, -375, 75, 25);
        spawn.mapRect(400, -450, 50, 25);
        spawn.mapRect(375, -425, 25, 50);
        spawn.mapRect(375, -425, 25, 25);
        spawn.mapRect(2150, -1025, 50, 325);
        spawn.mapRect(2575, -675, 50, 175);
        spawn.mapRect(2125, -900, 25, 25);
        spawn.mapRect(2125, -775, 50, 50);
        spawn.mapRect(2150, -1100, 25, 75);
        spawn.mapRect(2125, -1075, 50, 200);
        spawn.mapRect(2125, -1100, 50, 125);
        spawn.mapRect(2400, -1575, 250, 475);
        spawn.mapRect(2100, -750, 50, 25);
        spawn.mapRect(2100, -750, 25, 50);
        spawn.mapRect(2100, -775, 25, 25);
        spawn.mapRect(2125, -825, 25, 50);
        spawn.mapRect(2100, -1100, 50, 225);
        spawn.mapRect(2350, -1975, 300, 400);
        spawn.mapRect(1975, -1325, 125, 25);
        spawn.mapRect(2000, -1175, 100, 25);
        spawn.mapRect(2100, -875, 75, 100);
        spawn.mapRect(1950, -1950, 175, 225);
        spawn.mapRect(1950, -1500, 125, 325);
        spawn.mapRect(1950, -1600, 125, 150);
        spawn.mapRect(2075, -1550, 25, 225);
        spawn.mapRect(175, -1675, 525, 200);
        spawn.mapRect(350, -1450, 25, 175);
        spawn.mapRect(175, -1525, 200, 500);
        spawn.mapRect(175, -1075, 550, 175);
        spawn.mapRect(500, -1300, 225, 100);
        spawn.mapRect(600, -1200, 125, 150);
        spawn.mapRect(1050, -1675, 150, 750);
        spawn.mapRect(1200, -1100, 275, 175);
        spawn.mapRect(2725, -600, 75, 250);
        spawn.mapRect(2725, -600, 200, 75);
        spawn.mapRect(2750, -425, 175, 75);
        spawn.mapRect(2975, -600, 75, 250);
        spawn.mapRect(3000, -600, 175, 75);
        spawn.mapRect(3100, -550, 75, 75);
        spawn.mapRect(3025, -475, 150, 25);
        spawn.mapRect(3050, -450, 25, 25);
        spawn.mapRect(3075, -425, 25, 25);
        spawn.mapRect(3100, -400, 25, 25);
        spawn.mapRect(3125, -375, 50, 25);
        spawn.mapRect(3050, -425, 25, 25);
        spawn.mapRect(3100, -400, 25, 25);
        spawn.mapRect(3050, -400, 75, 25);
        spawn.mapRect(3225, -600, 75, 250);
        spawn.mapRect(3250, -400, 25, 25);
        spawn.mapRect(3225, -425, 225, 75);
        spawn.mapRect(3225, -600, 225, 75);
        spawn.mapRect(3400, -600, 25, 25);
        spawn.mapRect(3375, -600, 75, 250);
        spawn.mapRect(3500, -600, 75, 250);
        spawn.mapRect(3500, -425, 225, 75);
        spawn.mapRect(3650, -600, 75, 175);
        spawn.mapRect(3775, -600, 175, 75);
        spawn.mapRect(3775, -575, 75, 225);
        spawn.mapRect(3800, -425, 150, 75);
        spawn.mapRect(4000, -600, 75, 250);
        spawn.mapRect(4075, -525, 100, 75);
        spawn.mapRect(4150, -600, 75, 250);
        spawn.mapRect(3100, -375, 25, 25);
        spawn.mapRect(3125, -400, 25, 25);
        spawn.mapRect(3100, -425, 25, 25);
        spawn.mapRect(3075, -450, 25, 25);
        spawn.mapRect(1950, -2075, 675, 125);
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level
        // spawn.bodyRect(1540, -1110, 300, 25, 0.9); 
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomMob(2650, -975, 0.8);
        // spawn.randomGroup(1700, -900, 0.4);
        // if (simulation.difficulty > 1) spawn.randomLevelBoss(2200, -1300);
        // spawn.secondaryBossChance(100, -1500)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    /* descent() {
        simulation.inGameConsole(`<strong>descent</strong> by <em>&lt;anonymized by request&gt;</em>.
        	<br>made for j-gon`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 10000;
        level.exit.y = 10000;
        simulation.fallHeight = 9000
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        // section 1 main level geometry
        spawn.mapRect(-975, -225, 875, 225);
        spawn.mapRect(100, -225, 75, 50);
        spawn.mapRect(-975, 0, 1875, 2700 + 1150);
        spawn.mapRect(-975, -475, 1150, 250);
        spawn.mapRect(-975, -3150, 1875, 2675);
        spawn.mapRect(1900, -3150, 1025, 7000);

        // section 1 platforms
        spawn.mapRect(1250, -750, 300, 100);
        spawn.mapRect(900, 0, 300, 100);
        spawn.mapRect(1225, 25, 50, 100);
        spawn.mapRect(1375, 75, 50, 100);
        spawn.mapRect(1300, 50, 50, 100);
        spawn.mapRect(1525, 300, 300, 100);
        spawn.mapRect(1225, 675, 250, 100);
        spawn.mapRect(1125, 350, 100, 425);
        spawn.mapRect(1600, 1000, 300, 100);
        spawn.mapRect(1550, 1025, 25, 100);
        spawn.mapRect(1500, 1050, 25, 100);
        spawn.mapRect(1450, 1075, 25, 100);
        spawn.mapRect(1400, 1100, 25, 100);
        spawn.mapRect(1350, 1125, 25, 100);
        spawn.mapRect(1300, 1150, 25, 100);
        spawn.mapRect(1775, 150, 125, 50);
        spawn.mapRect(900, 875, 325, 25);
        spawn.mapRect(900, 900, 300, 25);
        spawn.mapRect(900, 1350, 250, 100);
        spawn.mapRect(1300, 1450, 300, 150);
        spawn.mapRect(1150, 1750, 300, 150);
        spawn.mapRect(1550, 1600, 50, 50);
        spawn.mapRect(1450, 1850, 300, 150);
        spawn.mapRect(1700, 1250, 50, 150);
        spawn.mapRect(1750, 1325, 150, 75);
        spawn.mapRect(975, 775, 25, 100);
        spawn.mapRect(1000, 825, 25, 50);
        spawn.mapRect(1350, 1900, 100, 600);
        spawn.mapRect(900, 2825, 400, 125);
        spawn.mapRect(1500, 2825, 400, 125);
        spawn.mapRect(900, 3075, 1000, 775);
        spawn.mapRect(1550, 2950, 350, 25);
        spawn.mapRect(1575, 2975, 325, 25);
        spawn.mapRect(1600, 3000, 300, 75);
        spawn.mapRect(900, 2950, 350, 25);
        spawn.mapRect(900, 2975, 325, 25);
        spawn.mapRect(900, 3000, 300, 75);
        spawn.mapRect(1200, -2350, 400, 100);
        spawn.mapRect(-975, -3800, 3900, 650);
        spawn.mapRect(1850, -2075, 25, 75);
        spawn.mapRect(1800, -2050, 25, 75);
        spawn.mapRect(925, -2075, 25, 75);
        spawn.mapRect(975, -2050, 25, 75);
        spawn.mapRect(1025, -2025, 25, 75);
        spawn.mapRect(1075, -2000, 25, 75);
        spawn.mapRect(1750, -2025, 25, 75);
        spawn.mapRect(1700, -2000, 25, 75);
        spawn.mapRect(1650, -1975, 25, 75);
        spawn.mapRect(1125, -1975, 25, 75);
        spawn.mapRect(1375, -1800, 250, 100);
        spawn.mapRect(1725, -1700, 100, 100);
        spawn.mapRect(1725, -1500, 100, 300);
        spawn.mapRect(1525, -1300, 200, 100);
        spawn.mapRect(1525, -1400, 100, 100);
        spawn.mapRect(1700, -1500, 25, 25);
        spawn.mapRect(1850, -1075, 25, 75);
        spawn.mapRect(1800, -1050, 25, 75);
        spawn.mapRect(1700, -1000, 25, 75);
        spawn.mapRect(1650, -975, 25, 75);
        spawn.mapRect(1800, -1825, 100, 75);
        spawn.mapRect(900, -1575, 375, 100);
        spawn.mapRect(1225, -1625, 50, 50);
        spawn.mapRect(1450, -1275, 50, 75);
        spawn.mapRect(1375, -1250, 50, 75);
        spawn.mapRect(1300, -1225, 50, 75);
        spawn.mapRect(1225, -1200, 50, 75);
        spawn.mapRect(1150, -1175, 50, 75);
        spawn.mapRect(1025, -1150, 100, 75);
        spawn.mapRect(1225, -1475, 50, 125);
        spawn.mapRect(1175, -1475, 50, 50);
        spawn.mapRect(900, -950, 125, 75);
        spawn.mapRect(1050, -925, 25, 75);
        spawn.mapRect(1100, -900, 25, 75);
        spawn.mapRect(1150, -875, 25, 75);
        spawn.mapRect(1200, -850, 25, 75);
        spawn.mapRect(1175, -1950, 25, 75);

        // section 1 blocks
        spawn.bodyRect(1750, 850, 150, 150);
        spawn.bodyRect(900, 1275, 50, 75);
        spawn.bodyRect(950, 1300, 50, 50);
        spawn.bodyRect(1825, 1250, 75, 75);
        spawn.bodyRect(1400, 1700, 50, 50);
        spawn.bodyRect(1400, 1650, 50, 50);
        spawn.bodyRect(1400, 1600, 50, 50);
        spawn.bodyRect(1750, 2675, 150, 150);
        spawn.bodyRect(900, 2675, 150, 150);
        spawn.bodyRect(1075, 2725, 50, 100);
        spawn.bodyRect(1675, 2775, 75, 50);
        spawn.bodyRect(1725, 2725, 25, 50);
        spawn.bodyRect(1050, 2750, 25, 75);
        spawn.bodyRect(900, -1750, 150, 175);
        spawn.bodyRect(100, -100, 25, 100);
        spawn.bodyRect(150, -100, 25, 100);
        spawn.bodyRect(100, -175, 75, 75);
        spawn.bodyRect(125, -75, 25, 75);
        spawn.bodyRect(125, -100, 25, 25);

        // section 1a mobs (1b mobs are spawned after the screen wrap to prevent cheesing)
        // small mobs
        spawn.randomSmallMob(1125, -350);
        spawn.randomSmallMob(1675, -350);
        spawn.randomSmallMob(1050, 225);
        spawn.randomSmallMob(1800, 475);
        spawn.randomSmallMob(1825, 1150);
        spawn.randomSmallMob(1800, 1600);
        spawn.randomSmallMob(1525, 1750);
        spawn.randomSmallMob(1025, 1625);
        // normal mobs
        spawn.randomMob(1700, 675);
        spawn.randomMob(1100, 2425, 0.75);
        spawn.randomMob(1675, 2450, 0.75);

        // section 1a powerups
        powerUps.spawn(937.5, 775, "ammo", false);
        powerUps.spawn(1825, 1250, "heal", false);

        // section 2
        spawn.mapRect(2925, -1300, 875, 2275);
        spawn.mapRect(3800, -1300, 500, 750);
        spawn.mapRect(4300, -750, 350, 200);
        spawn.mapRect(4650, -725, 25, 175);
        spawn.mapRect(4875, -725, 25, 175);
        spawn.mapRect(4900, -750, 350, 200);
        spawn.bodyRect(4650, -750, 250, 25);
        spawn.mapRect(5250, -1300, 500, 750);
        spawn.mapRect(5750, -1300, 875, 2275);
        spawn.mapRect(2925, 975, 3700, 800);
        spawn.mapRect(2925, -2075, 3700, 775);
        let bossRoomSlime = level.hazard(3800, 650, 1950, 325);
        let balance = level.rotor(4200, 525, 1150, 25, 0.001);
        let acceptableBosses = spawn.randomBossList
        function removeFromArray(array, ob) {
            const index = array.indexOf(ob);
            if (index > -1) {
                array.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        let unacceptableBosses = ['pulsarBoss', 'shooterBoss', 'historyBoss', 'spiderBoss', 'cellBossCulture',
            'growBossCulture', 'spawnerBossCulture', 'dragonFlyBoss', 'snakeSpitBoss', 'streamBoss', 'sneakBoss',
            'springBoss', 'mantisBoss', 'launcherBoss', 'beetleBoss', 'snakeBoss', 'powerUpBossBaby', 'powerUpBoss']
        for (let boss of unacceptableBosses) { removeFromArray(acceptableBosses, boss) }
        spawn.randomLevelBoss(10000, -10000, acceptableBosses) // spawn boss out of bounds as it will be teleported into the arena later
        spawn.secondaryBossChance(10000, -10500, acceptableBosses) // spawn boss out of bounds as it will be teleported into the arena later

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        let hasWrapped = false
        let isInArena = false
        let isFighting = false
        let isBossDead = false
        addPartToMap = (len) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
            map[len].collisionFilter.category = cat.map;
            map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            Matter.Body.setStatic(map[len], true); //make static
            Composite.add(engine.world, map[len]);
        }
        level.custom = () => {
            level.exit.drawAndCheck();
            level.enter.draw();

            // draw teleports
            function drawTPzone(x, y, width, col = 0) { // col 0 = blue, col 1 = orange
                if (!col) ctx.fillStyle = "#00b7ffb2"; else ctx.fillStyle = "#ff7b00b2"
                ctx.fillRect(x, y - 25, width, 25)
                if (!col) ctx.fillStyle = "#00b7ff66"; else ctx.fillStyle = "#ff7b0066"
                ctx.fillRect(x, y - 50, width, 50)
                if (!col) ctx.fillStyle = "#00b7ff19"; else ctx.fillStyle = "#ff7b0019"
                ctx.fillRect(x, y - 75, width, 75)
            }
            drawTPzone(1200, 3075, 400)
            drawTPzone(1200, -2350, 400, 1)
            if (hasWrapped) drawTPzone(1250, -750, 300)
            if (hasWrapped) drawTPzone(4350, -750, 250, 1)

            function spawnMobs1B() { // spawn mobs for section 1b
                // normal mobs
                spawn.randomMob(1400, -2075, 0.9);
                spawn.randomMob(1475, -1525, 1);
                spawn.randomMob(1375, -950, 0.75);
                // small mobs
                spawn.randomSmallMob(1025, -3025);
                spawn.randomSmallMob(1750, -3025);
                spawn.randomSmallMob(1750, -2175);
                spawn.randomSmallMob(1025, -2175);
                spawn.randomSmallMob(1050, -1300);
                spawn.randomSmallMob(950, -1025);
                spawn.randomSmallMob(1750, -1100);
                spawn.randomSmallMob(1100, -1800);
            }
            if (player.position.y > 3000) { // screen wrap repurposed into a teleporter
                Matter.Body.setPosition(player, {
                    x: player.position.x,
                    y: -2500
                })
                if (!hasWrapped) spawnMobs1B()
                hasWrapped = true
                // move bots to player
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].botType) {
                        Matter.Body.setPosition(bullet[i], {
                            x: player.position.x + (250 * (Math.random() - 0.5)),
                            y: player.position.y + (250 * (Math.random() - 0.5))
                        });
                        Matter.Body.setVelocity(bullet[i], {
                            x: 0,
                            y: 0
                        });
                    }
                }
            }
            if (player.position.y < -750 && !hasWrapped) { // no cheesing allowed
                Matter.Body.setPosition(player, {
                    x: player.position.x,
                    y: -750
                })
            }
            if (player.position.y > -775 - 96.718252306 && player.position.y < -740 - 96.718252306 && player.position.x > 1250 && player.position.x < 1550) { // teleporter to boss room
                Matter.Body.setPosition(player, {
                    x: 4475,
                    y: -846.7182523060455
                })
                isInArena = true
                // move bots to player
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].botType) {
                        Matter.Body.setPosition(bullet[i], {
                            x: player.position.x + (250 * (Math.random() - 0.5)),
                            y: player.position.y + (250 * (Math.random() - 0.5))
                        });
                        Matter.Body.setVelocity(bullet[i], {
                            x: 0,
                            y: 0
                        });
                    }
                }
            }
            if (player.position.y > 0 && isInArena && !isFighting && !isBossDead) {
                isFighting = true
                setTimeout(() => {
                    let bosses = []
                    for (let boss of mob) {
                        if (boss.isBoss && bosses.length < 2) bosses.push(boss)
                    }
                    switch (bosses.length) {
                        case 1:
                            if (simulation.difficulty < 14) {
                                Matter.Body.setPosition(bosses[0], {
                                    x: 4775,
                                    y: -300
                                });
                            } else { // spawn a support boss in the arena on harder difficulties
                                let bossPos = []
                                if (Math.random() < 0.5) bossPos = [4200, 5550]; else bossPos = [5550, 4200]
                                Matter.Body.setPosition(bosses[0], {
                                    x: bossPos[0],
                                    y: -200
                                });
                                spawn.randomLevelBoss(bossPos[1], -200, ["pulsarBoss", "shieldingBoss", "shooterBoss"])
                            }
                            //break;
                            //case 2:
                            Matter.Body.setPosition(bosses[0], {
                                x: 4200,
                                y: -200
                            });
                            Matter.Body.setPosition(bosses[1], {
                                x: 5550,
                                y: -200
                            });
                            if (simulation.difficulty >= 14) { // spawn a support boss in the arena on harder difficulties
                                spawn.randomLevelBoss(4775, -300, ["pulsarBoss", "Boss", "shooterBoss"])
                            }
                        //break;
                        default:
                            console.log('bruh')
                            try {
                                let j = 0, who;
                                for (let i = 0; i < mob.length; i++) {
                                    who = mob[i]
                                    if (who.isBoss) {
                                        Matter.Body.setPosition(who, {
                                            x: 4200 + 1350 * j,
                                            y: -200
                                        });
                                        j++;
                                    }
                                }
                            } catch (err) {
                                simulation.inGameConsole(err);
                            }
                    }
                }, 1000)
            }
            function spawnExit() {
                level.exit.y = 350 - (12.5 / 2)
                if (player.position.x > 4475) {
                    spawn.mapRect(5500, 375, 250, 25);
                    addPartToMap(map.length - 1);
                    spawn.mapRect(5525, 400, 225, 25);
                    addPartToMap(map.length - 1);
                    level.exit.x = 5625 - 50
                } else {
                    spawn.mapRect(3800, 375, 250, 25);
                    addPartToMap(map.length - 1);
                    spawn.mapRect(3800, 400, 225, 25);
                    addPartToMap(map.length - 1);
                    level.exit.x = 3925 - 50
                }
                spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
                addPartToMap(map.length - 1);
                simulation.draw.setPaths()
            }
            if (isFighting && !isBossDead && !(simulation.cycle % 120)) {
                let isFoundBoss = false
                for (let boss of mob) {
                    if (boss.isBoss) isFoundBoss = true
                }
                if (!isFoundBoss) {
                    isFighting = false
                    isBossDead = true
                    spawnExit()
                }
            }
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "#233"
            ctx.beginPath();
            ctx.arc(balance.center.x, balance.center.y, 9, 0, 2 * Math.PI);
            ctx.fill()
            if (isBossDead) bossRoomSlime.level(false, 3)
            bossRoomSlime.query();
        };
    }, */
}