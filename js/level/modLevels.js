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
    descent() {
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
    },
    split() {
        simulation.inGameConsole(`<strong>split</strong> by <span class='color-var'>CD</span>. made for c-gon`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = -50;
        level.exit.y = 1250;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        let boost1 = level.boost(150, -475, 1250, (Math.PI / 2) - (Math.PI / 16))  //x,y,push,angle radians
        let boost2 = level.boost(-250, -475, 1250, (Math.PI / 2) + (Math.PI / 16))  //x,y,push,angle radians
        spawn.mapRect(-100, 0, 200, 200);
        spawn.mapRect(-400, 75, 800, 275);
        spawn.mapRect(-1050, 175, 2125, 400);
        spawn.mapRect(1075, -1375, 425, 1950);
        spawn.mapRect(-1475, -1375, 425, 1950);
        spawn.mapRect(100, -450, 500, 125);
        spawn.bodyRect(850, 50, 225, 125);
        spawn.bodyRect(-1050, 50, 225, 125);
        spawn.bodyRect(950, -100, 125, 150);
        spawn.bodyRect(-1050, -100, 125, 150);
        spawn.mapRect(-100, -1375, 200, 1050);
        spawn.mapRect(-600, -450, 500, 125);
        spawn.mapRect(600, -1375, 475, 250);
        spawn.mapRect(1000, -1650, 175, 275);
        spawn.mapRect(-100, -2100, 200, 725);
        spawn.mapRect(1175, -1600, 550, 525);
        spawn.mapRect(1725, -1425, 625, 350);
        spawn.mapRect(2350, -1750, 425, 675);
        spawn.mapRect(1975, -250, 1500, 375);
        spawn.mapRect(2375, -1075, 150, 300);
        spawn.mapRect(2075, -1075, 150, 400);
        spawn.mapRect(-1475, 1650, 1375, 600);
        spawn.mapRect(100, 1650, 1500, 600);
        spawn.mapRect(-100, 1850, 200, 400);
        spawn.mapRect(1500, 425, 300, 150);
        spawn.mapRect(2300, 125, 525, 2125);
        spawn.mapRect(1875, 1025, 425, 1225);
        spawn.mapRect(3475, -1925, 475, 2050);

        spawn.mapVertex(966.6666666666666, -1466.6666666666667, '33.33333333333337 -183.33333333333326  33.33333333333337 91.66666666666674  -66.66666666666663 91.66666666666674');
        spawn.mapVertex(1191.6666666666667, -1616.6666666666667, '-16.666666666666742 -33.33333333333326  -16.666666666666742 16.666666666666742  33.33333333333326 16.666666666666742');
        spawn.mapVertex(125, 50, '-25 -50  -25 25  50 25');
        spawn.mapVertex(-125, 50, '25 -50  25 25  -50 25');
        spawn.mapVertex(433.3333333333333, 141.66666666666666, '-33.333333333333314 -66.66666666666666  -33.333333333333314 33.33333333333334  66.66666666666669 33.33333333333334');
        spawn.mapVertex(-433.3333333333333, 141.66666666666666, '33.333333333333314 -66.66666666666666  33.333333333333314 33.33333333333334  -66.66666666666669 33.33333333333334');
        spawn.mapVertex(0, -301, '-300 -25  -250 25  250 25  300 -25');
        spawn.mapVertex(1783.3333333333333, -1483.3333333333333, '-58.33333333333326 -116.66666666666674  -58.33333333333326 58.33333333333326  116.66666666666674 58.33333333333326');
        spawn.mapVertex(610.4166666666666, -387.5, '-10.416666666666629 -62.5  20.83333333333337 0  -10.416666666666629 62.5');
        spawn.mapVertex(-610.4166666666666, -387.5, '10.416666666666629 -62.5  -20.83333333333337 0  10.416666666666629 62.5');
        spawn.mapVertex(579.1666666666666, -1250, '20.83333333333337 -125  -41.66666666666663 0  20.83333333333337 125');
        spawn.mapVertex(2300, -1533.3333333333333, '50 -216.66666666666674  -100 108.33333333333326  50 108.33333333333326');
        spawn.mapVertex(2822, -1412.5, '-50 -337.5  50 -237.5  50 237.5  -50 337.5');
        spawn.mapVertex(2975, -341.6666666666667, '500 -183.33333333333331  500 91.66666666666669  -1000 91.66666666666669');
        spawn.mapVertex(1693, 1684.375, '187.5 -659.375  187.5 565.625  -187.5 565.625  -187.5 -471.875');
        spawn.mapVertex(2450, -755, '-75 -25  -25 25  25 25  75 -25');
        spawn.mapVertex(2150, -655, '-75 -25  -25 25  25 25  75 -25');

        spawn.mapRect(725, 1100, 400, 100);
        spawn.mapRect(-350, 1300, 700, 950);
        spawn.mapRect(-1575, -3400, 1675, 1575);
        spawn.mapRect(-1050, -1375, 450, 250);
        spawn.mapVertex(-1850, -925, '525 -150  -250 -150  -275 -125  -275 125  -250 150  525 150');
        spawn.mapRect(-2075, -1825, 200, 375);
        spawn.mapVertex(-2837.5, -1012.5, '-262.5 -287.5  -287.5 -262.5  -287.5 262.5  -262.5 287.5  262.5 287.5  287.5 262.5  287.5 -262.5  262.5 -287.5');
        spawn.mapRect(-3900, -2300, 2325, 475);
        spawn.mapRect(-3900, -1825, 425, 2800);
        spawn.mapRect(-3250, 475, 1600, 500);
        spawn.mapVertex(-2337.5, -250, '-312.5 -150  -337.5 -125  -337.5 125  -312.5 150  312.5 150  337.5 125  337.5 -125  312.5 -150');
        spawn.mapVertex(-3200, -187.5, '-425 -137.5  200 -137.5  225 -112.5  225 112.5  200 137.5  -425 137.5');
        spawn.mapVertex(-1558.3333333333333, -75, '308.33333333333326 -150  -141.66666666666674 -150  -166.66666666666674 -125  -166.66666666666674 125  -141.66666666666674 150  308.33333333333326 150');

        let mover1 = level.mover(-3250, 450, 1600, 25, -6);
        spawn.mapVertex(-579.1666666666666, -1250, '-20.83333333333337 -125  41.66666666666663 0  -20.83333333333337 125');
        spawn.mapRect(1425, 1400, 100, 275);
        spawn.bodyRect(1275, 1550, 150, 100);
        spawn.bodyRect(2225, 950, 75, 75);
        spawn.bodyRect(2125, 1000, 50, 25);
        spawn.bodyRect(2100, -1475, 75, 50);
        spawn.bodyRect(1425, -1625, 50, 25);
        spawn.bodyRect(-1100, -1450, 125, 75);
        spawn.bodyRect(-2825, -1350, 75, 50);
        spawn.bodyRect(-3225, -375, 50, 50);
        spawn.bodyRect(-1625, -300, 50, 75);
        spawn.bodyRect(775, -1450, 50, 75);
        spawn.mapRect(-2250, 650, 600, 1600);
        spawn.mapRect(-2250, 1650, 925, 600);
        spawn.mapRect(-1650, 1075, 225, 625);
        spawn.mapRect(-1425, 1275, 50, 400);
        spawn.mapRect(-1375, 1400, 125, 300);
        spawn.bodyRect(-1250, 1500, 50, 150);
        spawn.bodyRect(-1150, 1600, 50, 50);
        spawn.bodyRect(-1650, 1000, 50, 75);
        spawn.bodyRect(-1575, 1050, 50, 25);
        spawn.mapVertex(-1975, -1433.3333333333333, '-100 -16.666666666666742  0 33.33333333333326  100 -16.666666666666742');
        spawn.mapVertex(0, 1300, '-250 25  -100 -25  100 -25  250 25');

        let rotor1 = level.rotor(-1050, 1100, 500, 25, 0.004);
        let endRoomSlime = level.hazard(-1650, 1320, 3300, 500);

        spawn.randomSmallMob(-600, -625, 1);
        spawn.randomSmallMob(525, -650, 1);
        spawn.randomSmallMob(-375, 1125, 1);
        spawn.randomSmallMob(400, 1125, 1);
        spawn.randomSmallMob(2300, -750, 1);
        spawn.randomSmallMob(-2400, -575, 1);
        spawn.randomSmallMob(1500, -2000, 1);
        spawn.randomSmallMob(-1450, -1575, 1);

        spawn.randomMob(-1700, -1575, 0.7);
        spawn.randomMob(2025, -1775, 0.7);
        spawn.randomMob(-3275, 225, 0.7);
        spawn.randomMob(1725, -350, 0.7);
        spawn.randomMob(-3275, -500, 0.7);
        spawn.randomMob(2125, 375, 0.7);

        spawn.randomGroup(525, 850, 0.3);
        spawn.randomGroup(-1775, 275, 0.4, 'node');
        spawn.randomGroup(-1300, 850, 0.4);
        spawn.randomGroup(1650, -850, 0.4, 'node');
        spawn.randomGroup(-3150, -1575, 0.4);
        spawn.randomGroup(2225, -2275, 0.4);

        // spawn.bodyRect(1540, -1110, 300, 25, 0.9); 
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomMob(2650, -975, 0.8);
        // spawn.randomGroup(1700, -900, 0.4);
        if (simulation.difficulty > 1) {
            let acceptableBosses = spawn.randomBossList
            let unacceptableBosses = ['powerUpBoss', 'blinkBoss', 'pulsarBoss', 'historyBoss', 'sneakBoss',
                'kingSnakeBoss', 'snakeBoss', 'cellBossCulture', 'snakeSpitBoss']
            acceptableBosses = acceptableBosses.filter((boss) => !unacceptableBosses.includes(boss))
            spawn.randomLevelBoss(0, 860, acceptableBosses);
            spawn.secondaryBossChance(500, 860, acceptableBosses);
        }
        level.custom = () => {
            boost1.query()
            boost2.query()
            mover1.push()
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            mover1.draw()
            endRoomSlime.query();
            ctx.fillStyle = "rgba(0,0,0,0.12)"
            ctx.fillRect(-3600, -2000, 3600, 2975);
            ctx.fillRect(-2000, 975, 4500, 1025);
            ctx.fillRect(0, -387.5, 2800, 1362.5);
            ctx.fillRect(537.5, -1250, 2337.5, 862.5);
        };
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    boundary() {
        simulation.inGameConsole(`<strong>boundary</strong> by <span class='color-var'>coalDeficit</span>.
            <br>made for c-gon`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 4925;
        level.exit.y = 1525 - 30;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#fff";
        color.map = "#a37acc"
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level
        let curSection = 0 // start
        let colorFlips = 0
        let activeButtons = []
        const boundaryBoss = function (x, y, radius = 35) {
            mobs.spawn(x, y + 1025, 6, radius, "hsl(0 100% 50%)");
            let me = mob[mob.length - 1];
            me.isBoss = true;
            me.isBoundaryBossCenter = true
            me.name = "boundaryBoss"

            me.accelMag = 0.001 * simulation.accelScale;
            me.frictionStatic = 0;
            me.friction = 0;
            me.frictionAir = 0.035;
            me.memory = Infinity;
            me.inertia = Infinity
            me.collisionFilter.mask = cat.player | cat.bullet
            Matter.Body.setDensity(me, 0.1); //extra dense //normal is 0.001 //makes effective life much larger
            me.onDeath = function () {
                this.speech('NOOOOOOOOOOOOOOOOO', 0.4, 36);
                for (let i = 0; i < 6; i++) {
                    powerUps.spawn(this.position.x + Math.random(), this.position.y + Math.random(), "tech")
                }
                requestAnimationFrame(() => {
                    for (let i = 0; i < mob.length; i++) {
                        if (mob[i].alive && !mob[i].isZombie) mob[i].damage(Infinity, true)
                    }
                })
                let oldMapLength = map.length
                spawn.mapRect(3150, 1525, 2000, 100);
                spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
                spawn.mapRect(3700, 1175, 500, 100);
                spawn.mapRect(4100, 1175, 100, 450);
                for (let i = 0; i < map.length - oldMapLength; i++) {
                    map[oldMapLength + i].collisionFilter.category = cat.map;
                    map[oldMapLength + i].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                    Matter.Body.setStatic(map[oldMapLength + i], true); //make static
                    Composite.add(engine.world, map[oldMapLength + i]);
                }
                simulation.draw.setPaths()
            }
            me.damageReduction = 0 //.25 / (tech.isScaleMobsWithDuplication ? 1 + tech.duplicationChance() : 1)

            me.introStage = 0
            me.introCycle = 205
            me.introDone = false

            function laser(where, angle) {
                const vertexCollision = function (v1, v1End, domain) {
                    for (let i = 0; i < domain.length; ++i) {
                        let vertices = domain[i].vertices;
                        const len = vertices.length - 1;
                        for (let j = 0; j < len; j++) {
                            results = simulation.checkLineIntersection(v1, v1End, vertices[j], vertices[j + 1]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = {
                                    x: results.x,
                                    y: results.y,
                                    dist2: dist2,
                                    who: domain[i],
                                    v1: vertices[j],
                                    v2: vertices[j + 1]
                                };
                            }
                        }
                        results = simulation.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
                        if (results.onLine1 && results.onLine2) {
                            const dx = v1.x - results.x;
                            const dy = v1.y - results.y;
                            const dist2 = dx * dx + dy * dy;
                            if (dist2 < best.dist2) best = {
                                x: results.x,
                                y: results.y,
                                dist2: dist2,
                                who: domain[i],
                                v1: vertices[0],
                                v2: vertices[len]
                            };
                        }
                    }
                };

                const seeRange = 7000;
                best = {
                    x: null,
                    y: null,
                    dist2: Infinity,
                    who: null,
                    v1: null,
                    v2: null
                };
                const look = {
                    x: where.x + seeRange * Math.cos(angle),
                    y: where.y + seeRange * Math.sin(angle)
                };
                // vertexCollision(where, look, mob);
                vertexCollision(where, look, map);
                vertexCollision(where, look, body);
                if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                    const dmg = 0.14 * spawn.dmgToPlayerByLevelsCleared()
                    m.takeDamage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: best.x,
                        y: best.y,
                        radius: dmg * 1500,
                        color: this.fill,
                        time: 20
                    });
                }
                //draw beam
                if (best.dist2 === Infinity) best = look;
                ctx.moveTo(where.x, where.y);
                ctx.lineTo(best.x, best.y);
            }
            function laserFire() {
                ctx.beginPath();
                laser(this.vertices[3], this.angle);
                ctx.strokeStyle = this.fill;
                ctx.lineWidth = 6;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
                ctx.lineWidth = 80;
                ctx.globalAlpha = 0.07;
                ctx.stroke(); // Draw it
                ctx.globalAlpha = 1
            }
            function gunFire() {
                spawn.seeker(this.vertices[3].x, this.vertices[3].y, 7)
                //give the bullet a rotational velocity as if they were attached to a vertex
                const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[3])), -8)
                Matter.Body.setVelocity(mob[mob.length - 1], {
                    x: velocity.x,
                    y: velocity.y
                });
            }
            function spawnFire() {
                let pick = ['laser', 'focuser', 'laserLayer', 'striker', 'stabber', 'grower', 'springer'] // mob selection where each has a distinct shape
                let spawnType = pick[Math.floor(Math.random() * pick.length)]
                //spawnType = spawn.findIndex(spawnType)
                spawn[spawnType](x, y)
                mob[mob.length - 1].foundPlayer()
                //give the bullet a rotational velocity as if they were attached to a vertex
                const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, this.vertices[3])), -4)
                Matter.Body.setVelocity(mob[mob.length - 1], {
                    x: velocity.x,
                    y: velocity.y
                });
            }
            me.crystals = []
            // filler
            boundaryBossCrystal(x, y + 100)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) + (Math.PI / 8))
            me.crystals.push([mob[mob.length - 1], { x: 2100, y: 2100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y + 100)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) - (Math.PI / 8))
            me.crystals.push([mob[mob.length - 1], { x: -2100, y: 2100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y - 100)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle - (Math.PI / 8))
            me.crystals.push([mob[mob.length - 1], { x: 2130, y: -2100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y - 100)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 8))
            me.crystals.push([mob[mob.length - 1], { x: -2130, y: -2100 }, mob[mob.length - 1].angle])
            // guns
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) - (Math.PI / 8))
            mob[mob.length - 1].fire = gunFire
            me.crystals.push([mob[mob.length - 1], { x: 2240, y: 100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) + (Math.PI / 8))
            mob[mob.length - 1].fire = gunFire
            me.crystals.push([mob[mob.length - 1], { x: -2240, y: 100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) - (Math.PI / 16))
            mob[mob.length - 1].fire = gunFire
            me.crystals.push([mob[mob.length - 1], { x: 2140, y: 300 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2) + (Math.PI / 16))
            mob[mob.length - 1].fire = gunFire
            me.crystals.push([mob[mob.length - 1], { x: -2140, y: 300 }, mob[mob.length - 1].angle])
            // mobs
            boundaryBossCrystal(x, y - 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle - (Math.PI / 2) - (Math.PI / 8))
            mob[mob.length - 1].fire = spawnFire
            me.crystals.push([mob[mob.length - 1], { x: 2260, y: -100 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y - 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle - (Math.PI / 2) + (Math.PI / 8))
            mob[mob.length - 1].fire = spawnFire
            me.crystals.push([mob[mob.length - 1], { x: -2260, y: -100 }, mob[mob.length - 1].angle])
            // lasers
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle + (Math.PI / 2))
            mob[mob.length - 1].fire = laserFire
            me.crystals.push([mob[mob.length - 1], { x: 0, y: 2170 }, mob[mob.length - 1].angle])
            boundaryBossCrystal(x, y + 100, 1)
            Matter.Body.setAngle(mob[mob.length - 1], mob[mob.length - 1].angle - (Math.PI / 2))
            mob[mob.length - 1].fire = laserFire
            me.crystals.push([mob[mob.length - 1], { x: 0, y: -2170 }, mob[mob.length - 1].angle])

            for (let i = 0; i < me.crystals.length; i++) me.crystals[i][0].master = me

            me.originPosition = { x: x, y: y }
            me.releasedGunCrystals = false
            me.lowerFillerOffset = 0
            me.lasersCritical = false
            me.mobsCritical = false
            me.cycle = 0
            me.mode = -1
            me.targetPosition = { x: x, y: y }

            me.do = function () {
                this.foundPlayer();
                this.healthBar4();
                this.checkStatus();
                this.fill = `hsl(${(simulation.cycle * 3) % 360} 100% 50%)`
                if (!this.damageReduction) {
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                    if (!this.crystalCheck('all')) {
                        this.speech("COMBAT SHELL: NULL", 0.18, 26)
                        this.speech("ERROR: CANNOT GENERATE NEW SHELL", 0.3, 24)
                        this.damageReduction = 0.2 / (tech.isScaleMobsWithDuplication ? 1 + tech.duplicationChance() : 1)
                    }
                }
                if (!this.releasedGunCrystals && this.crystalCheck('gun') <= 2) {
                    this.detachGuns()
                }
                if (this.crystals[10][0].health < 0.5 || !this.crystals[11][0].alive) {
                    if (this.lowerFillerOffset < 140) this.lowerFillerOffset += 2
                    if (!this.lasersCritical) {
                        this.lasersCritical = true
                        this.speech("LASERS: CRITICAL", 0.16, 22)
                        if (this.crystals[0][0].alive || this.crystals[1][0].alive) {
                            this.speech("RECONFIGURING COMBAT SHELL", 0.1, 15)
                        } else {
                            this.speech("ERROR: CANNOT RECONFIGURE COMBAT SHELL", 0.3, 24)
                        }
                    }
                } else {
                    if (this.lowerFillerOffset > 0) this.lowerFillerOffset -= 2
                }
                if (!this.mobsCritical && this.crystalCheck('mob') < 2) {
                    this.mobsCritical = true
                    this.speech("SPAWNERS: CRITICAL", 0.3, 28)
                    this.speech("REROUTING POWER", 0.25, 25)
                }
                if (this.introDone) {
                    this.crystals[0][1] = { x: 100 + (Math.cos(this.crystals[0][2]) * this.lowerFillerOffset), y: 100 + (Math.sin(this.crystals[0][2]) * this.lowerFillerOffset) }
                    this.crystals[1][1] = { x: -100 + (Math.cos(this.crystals[1][2]) * this.lowerFillerOffset), y: 100 + (Math.sin(this.crystals[1][2]) * this.lowerFillerOffset) }
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.div(Vector.sub(this.targetPosition, this.position), 30)))
                    switch (this.mode) {
                        case -1:
                            if (this.cycle > 30) {
                                this.cycle = -1
                                this.mode++
                            }
                            break
                        case 0:
                            if (this.crystalCheck('laser')) {
                                if (this.cycle == 0) this.laserDir = player.position.x > this.originPosition.x ? 1 : -1
                                if (this.cycle < 90 * Math.max(0.5, this.crystalCheck('all') / 12)) {
                                    this.targetPosition = { x: this.originPosition.x + (950 * this.laserDir), y: this.originPosition.y }
                                } else {
                                    if ((this.position.x > this.originPosition.x - 700 && this.laserDir == 1) || (this.position.x < this.originPosition.x + 700 && this.laserDir == -1)) {
                                        for (let i = 10; i < 12; i++) {
                                            if (this.crystals[i][0].alive) this.crystals[i][0].fire()
                                        }
                                        this.targetPosition = { x: this.position.x - (140 * this.laserDir), y: this.originPosition.y + (300 * !this.crystals[10][0].alive) + (300 * !(this.crystalCheck('gun') > 2)) }
                                    } else {
                                        this.cycle = -1
                                        this.mode++
                                    }
                                }
                            } else {
                                this.cycle = -1
                                this.mode++
                            }
                            break
                        case 1:
                            if (this.crystalCheck('gun') > 2) {
                                if (!(this.cycle % (120 * Math.max(0.5, this.crystalCheck('all') / 12)))) {
                                    this.targetPosition = { x: this.originPosition.x + (1300 * (Math.random() - 0.5)), y: this.originPosition.y - (750 * Math.random()) }
                                }
                                if (!(this.cycle % 30) && (this.cycle % (120 * Math.max(0.5, this.crystalCheck('all') / 12))) >= 50) {
                                    for (let i = 4; i < 8; i++) {
                                        if (this.crystals[i][0].alive) this.crystals[i][0].fire()
                                    }
                                }
                                if (this.cycle > 360) {
                                    this.cycle = -1
                                    this.mode++
                                }
                            } else {
                                this.cycle = -1
                                this.mode++
                            }
                            break
                        case 2:
                            if (this.crystalCheck('mob')) {
                                this.targetPosition = { x: this.originPosition.x, y: this.originPosition.y - (150 * (this.crystalCheck('gun') > 2)) + (150 * (this.crystalCheck('gun') <= 1)) }
                                if (!(this.cycle % (90 - (60 * this.mobsCritical))) && this.cycle >= 90 && this.cycle <= 180) {
                                    for (let i = 8; i < 10; i++) {
                                        if (this.crystals[i][0].alive) this.crystals[i][0].fire()
                                    }
                                }
                                if (this.cycle > 240) {
                                    this.cycle = -1
                                    this.mode = 0
                                }
                            } else {
                                this.cycle = -1
                                this.mode = this.crystalCheck('laser') + this.crystalCheck('gun') + this.crystalCheck('mob') ? 0 : 3
                            }
                            break
                        case 3:
                            if (!(this.cycle % 130)) {
                                this.targetPosition = { x: this.originPosition.x + (1800 * (Math.random() - 0.5)), y: this.originPosition.y - (750 * (Math.random() - 0.5)) }
                                //fire a bullet from each vertex
                                for (let i = 0, len = this.vertices.length; i < len; i++) {
                                    spawn.seeker(this.vertices[i].x, this.vertices[i].y, 7)
                                    //give the bullet a rotational velocity as if they were attached to a vertex
                                    const velocity = Vector.mult(Vector.perp(Vector.normalise(Vector.sub(this.position, this.vertices[i]))), -8)
                                    Matter.Body.setVelocity(mob[mob.length - 1], {
                                        x: velocity.x,
                                        y: velocity.y
                                    });
                                }
                            }
                            break
                    }
                    this.cycle++
                }
                if (this.introStage < 4) {
                    this.introCycle--
                    switch (this.introStage) {
                        case 0:
                            Matter.Body.setPosition(this, { x: this.originPosition.x, y: this.originPosition.y + (this.introCycle * 5) })
                            break
                        case 1:
                            Matter.Body.setPosition(this, this.originPosition)
                            this.crystals[0][1].x -= 20
                            this.crystals[0][1].y -= 20

                            this.crystals[1][1].x += 20
                            this.crystals[1][1].y -= 20

                            this.crystals[2][1].x -= 20
                            this.crystals[2][1].y += 20

                            this.crystals[3][1].x += 20
                            this.crystals[3][1].y += 20
                            break
                        case 2:
                            Matter.Body.setPosition(this, this.originPosition)
                            this.crystals[10][1].y -= 20
                            this.crystals[11][1].y += 20
                            break
                        case 3:
                            Matter.Body.setPosition(this, this.originPosition)
                            this.crystals[4][1].x -= 20
                            this.crystals[6][1].x -= 20
                            this.crystals[8][1].x -= 20
                            this.crystals[5][1].x += 20
                            this.crystals[7][1].x += 20
                            this.crystals[9][1].x += 20
                            break
                    }
                    if (this.introCycle <= 0) {
                        switch (this.introStage) {
                            case 0:
                                this.speech("INTRUSION DETECTED", 0.1, 16)
                                this.speech("GENERATING COMBAT SHELL", 0.1, 16)
                                break
                            case 1:
                                this.speech("33% DONE", 0.1, 16)
                                break
                            case 2:
                                this.speech("50% DONE", 0.1, 16)
                                break
                            case 3:
                                this.speech("COMBAT SHELL GENERATED", 0.1, 16)
                                this.speech("INITIATING", 0.1, 16)
                                break
                        }
                        this.introStage++
                        this.introCycle = 100
                    }
                } else if (!this.introDone) {
                    this.introDone = true
                    for (let i = 0; i < 12; i++) {
                        this.crystals[i][0].collisionFilter.mask = cat.player | cat.bullet
                        this.crystals[i][0].damageReduction = 0.14 / (tech.isScaleMobsWithDuplication ? 1 + tech.duplicationChance() : 1)
                    }
                }
                for (let i = 0; i < this.crystals.length; i++) {
                    if (!(i >= 4 && i < 8) || !this.releasedGunCrystals) { // gun crystals begin to move independently after 2 go down
                        Matter.Body.setPosition(this.crystals[i][0], Vector.add(this.position, this.crystals[i][1]))
                        Matter.Body.setAngle(this.crystals[i][0], this.crystals[i][2])
                    }
                }
            };
            me.crystalCheck = function (section) {
                let count = 0
                let start = 0
                let end = 12
                switch (section) {
                    case 'filler':
                        start = 0
                        end = 4
                        break
                    case 'gun':
                        start = 4
                        end = 8
                        break
                    case 'mob':
                        start = 8
                        end = 10
                        break
                    case 'laser':
                        start = 10
                        end = 12
                        break
                    case 'all':
                    default:
                        start = 0
                        end = 12
                        break
                }
                for (let i = start; i < end; i++) {
                    if (this.crystals[i][0].alive) count++
                }
                return count
            }
            me.detachGuns = function () {
                this.releasedGunCrystals = true
                for (let i = 4; i < 8; i++) {
                    if (this.crystals[i][0].alive) {
                        this.crystals[i][0].originPosition = this.originPosition
                        this.crystals[i][0].crystalDetach()
                    }
                }
                this.speech("CANNONS: CRITICAL", 0.3, 24)
                this.speech("DETACHING", 0.3, 24)
            }
            me.speech = function (text, chance = 0, distort = 0) {
                const x = text.split("");
                for (let i = 0; i < x.length / 1.6; i++) {
                    const randomIndex = Math.floor(Math.random() * x.length);
                    if (x[randomIndex] !== " " && chance && distort && Math.random() < chance) {
                        x[randomIndex] = String.fromCharCode(Math.floor(Math.random() * distort) + 192);
                    }
                };
                simulation.inGameConsole(`spawn<span class='color-symbol'>.</span>boundaryBoss<span class='color-symbol'>.</span>speech<span class='color-symbol'>(</span>text<span class='color-symbol'>):</span> ${x.join("")}`)
            }
            me.speech("AWOKEN BY DISTURBANCE", 0.1, 8)
        };
        const boundaryBossCrystal = function (x, y, type = 0, radius = 30) {
            mobs.spawn(x, y, 6 - (type * 2), radius + (type * 5), "hsl(0 100% 50%)");
            let me = mob[mob.length - 1];
            me.name = "boundaryBossCrystal"

            me.accelMag = 0.001 * simulation.accelScale;
            me.frictionStatic = 0;
            me.friction = 0;
            me.frictionAir = 0.035;
            me.memory = Infinity;
            me.inertia = Infinity
            me.stroke = "transparent"; //used for drawGhost
            me.collisionFilter.mask = cat.bullet
            Matter.Body.setDensity(me, 0.1); //extra dense //normal is 0.001 //makes effective life much larger
            me.damageReduction = 0
            me.showHealthBar = false
            if (type == 0) {
                me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI / 2, me.position);
            } else {
                me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI / 4, me.position);
            }
            for (let i = 0; i < me.vertices.length; i++) {
                me.vertices[i].x += 60 * (me.vertices[i].x - 2 > me.position.x ? 1 : -1)
            }
            me.onDeath = function () {
                powerUps.spawn(this.position.x + Math.random(), this.position.y + Math.random(), Math.random() < 0.5 || m.health == m.maxHealth ? "ammo" : "heal")
            }
            me.do = function () {
                this.checkStatus();
                if (!this.damageReduction) {
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
            };
            me.crystalDetach = function () {
                this.cycle = 0
                this.damageReduction *= 2
                this.do = function () {
                    this.foundPlayer()
                    this.checkStatus();
                    if (!(this.cycle % 120)) {
                        this.targetPosition = { x: this.originPosition.x + (1300 * (Math.random() - 0.5)), y: this.originPosition.y + (750 * Math.random()) }
                    }
                    if (!(this.cycle % 30) && (this.cycle % 120) >= 50) {
                        if (this.alive) this.fire()
                    }
                    Matter.Body.setPosition(this, Vector.add(this.position, Vector.div(Vector.sub(this.targetPosition, this.position), 30)))
                    Matter.Body.setAngle(this, Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x))
                    this.cycle++
                }
            }
            me.fire = function () { }
        };
        let sections = [() => {
            spawn.mapRect(-350, 0, 1850, 100);
            spawn.mapRect(-350, -800, 100, 900);
            spawn.mapRect(-350, -800, 1250, 100);
            spawn.mapRect(800, -1200, 100, 975);
            spawn.mapRect(1400, -350, 100, 450);
            spawn.mapRect(1400, -200, 675, 100);
            spawn.mapRect(800, -1200, 1025, 100);
            spawn.mapRect(1725, -1200, 100, 525);
            spawn.mapRect(800, -625, 425, 100);
            spawn.mapRect(1725, -775, 1050, 100);
            spawn.mapRect(1975, -775, 100, 350);
            spawn.randomMob(1075, -900, Infinity);
            spawn.randomMob(1500, -575, Infinity);
            activeButtons = [level.button(1062.5 - 63, -625)]
        }, () => {
            //simulation.inGameConsole(`level<span class='color-symbol'>.</span>boundary<span class='color-symbol'>.</span>allowHealing<span class='color-symbol'>(</span>false<span class='color-symbol'>)</span>`)
            spawn.mapRect(2425, -200, 825, 100);
            spawn.mapRect(3150, -2475, 100, 2375);
            spawn.mapRect(2675, -775, 100, 350);
            spawn.mapRect(2425, -200, 100, 475);
            spawn.mapRect(1875, 175, 650, 100);
            spawn.mapRect(2675, -525, 325, 100);
            spawn.mapRect(2075, -1200, 825, 100);
            spawn.mapRect(1725, -875, 200, 200);
            spawn.mapRect(2800, -1525, 100, 425);
            spawn.mapRect(1725, -2475, 1525, 100);
            spawn.mapRect(1725, -2475, 100, 1375);
            spawn.mapRect(2075, -1675, 450, 100);
            spawn.mapRect(2750, -2025, 300, 100);
            spawn.mapRect(2750, -2125, 100, 200);
            spawn.mapRect(2275, -2125, 575, 100);
            spawn.mapRect(1725, -1925, 350, 100);
            spawn.randomMob(2400, -425, Infinity);
            spawn.randomMob(2525, -925, Infinity);
            spawn.randomMob(2375, -1350, Infinity);
            spawn.randomMob(3025, -1725, Infinity);
            spawn.randomMob(2275, -1850, Infinity);
            spawn.randomMob(2525, -2250, Infinity);
            activeButtons = [level.button(2950 - 63, -2025)]
        }, () => {
            spawn.mapRect(2800, -1525, 450, 100);
            spawn.mapRect(1400, 0, 100, 650);
            spawn.mapRect(1400, 550, 300, 100);
            spawn.mapRect(1875, 175, 100, 825);
            spawn.mapRect(2275, -2475, 100, 450);
            spawn.randomMob(2400, -1375, Infinity);
            spawn.randomMob(2300, -1875, Infinity);
            spawn.randomMob(3025, -1300, Infinity);
            spawn.randomMob(2050, -950, Infinity);
            spawn.randomMob(2775, -925, Infinity);
            spawn.randomMob(2350, -450, Infinity);
            spawn.randomMob(1675, 50, Infinity);
            spawn.randomMob(2000, -1400, Infinity);
            spawn.randomMob(2775, -1725, Infinity);
            spawn.randomMob(2425, -925, Infinity);
            spawn.randomMob(2975, -725, Infinity);
            spawn.randomMob(2200, -575, Infinity);
            spawn.randomMob(1600, 200, Infinity);
            activeButtons = [level.button(1600 - 63, 550)]
        }, () => {
            m.spawnPos.x = m.pos.x;
            m.spawnPos.y = m.pos.y;
            level.enter.x = m.spawnPos.x - 50;
            level.enter.y = m.spawnPos.y + 20;
            level.defaultZoom = 2200
            simulation.zoomTransition(level.defaultZoom)
            spawn.mapRect(1875, 900, 100, 500);
            spawn.mapRect(225, 1300, 1750, 100);
            spawn.mapRect(225, 700, 100, 700);
            spawn.mapRect(225, 950, 300, 100);
            spawn.mapRect(-500, 750, 400, 100);
            spawn.mapRect(-375, 750, 100, 575);
            spawn.mapRect(-375, 1000, 175, 100);
            spawn.mapRect(-400, 1175, 25, 100);
            spawn.mapRect(-1400, 525, 600, 100);
            spawn.mapRect(-1250, 525, 100, 600);
            spawn.mapRect(-1250, 750, 350, 100);
            spawn.mapRect(-1075, 700, 100, 850);
            spawn.mapRect(-1225, 1300, 250, 100);
            spawn.mapRect(-1675, -175, 1425, 100);
            spawn.mapRect(1875, -200, 100, 475);
            spawn.randomGroup(900, 700, Infinity, 'node');
            spawn.randomGroup(-325, 400, Infinity, 'node');
            spawn.randomMob(825, 275, Infinity);
            spawn.randomMob(1225, 400, Infinity);
            spawn.randomMob(500, 725, Infinity);
            spawn.randomMob(900, 1150, Infinity);
            spawn.randomMob(-1250, 375, Infinity);
            spawn.randomMob(-1250, 75, Infinity);
            spawn.randomMob(-950, 100, Infinity);
            spawn.randomMob(-950, 325, Infinity);
            activeButtons = [level.button(-1100 - 63, 525)]
        }, () => {
            m.spawnPos.x = m.pos.x;
            m.spawnPos.y = m.pos.y;
            level.enter.x = m.spawnPos.x - 50;
            level.enter.y = m.spawnPos.y + 20;
            simulation.fallHeight = 6000
            spawn.mapRect(-2200, 625, 500, 100);
            spawn.mapRect(-2750, 150, 100, 1275);
            spawn.mapRect(-2750, 150, 650, 100);
            spawn.mapRect(-3300, 1750, 1200, 100);
            spawn.mapRect(-3300, 625, 100, 1225);
            spawn.mapRect(-2200, -175, 100, 425);
            spawn.mapRect(-2200, -175, 625, 100);
            spawn.mapRect(-2425, 850, 325, 100);
            spawn.mapRect(-2975, 1150, 550, 100);
            spawn.mapRect(-2425, 1450, 325, 100);
            spawn.mapRect(-3300, 1450, 325, 100);
            spawn.mapRect(-2200, 150, 100, 375);
            spawn.mapRect(-3300, 850, 325, 100);
            spawn.mapRect(-2275, 425, 175, 100);
            spawn.mapRect(-2200, 625, 100, 925);
            spawn.mapRect(-3300, 1750, 1350, 100);
            spawn.mapRect(-1825, 1500, 400, 100);
            spawn.mapRect(-1675, 1150, 100, 450);
            spawn.mapRect(-2100, 1300, 175, 100);
            spawn.mapRect(-1075, 1450, 350, 100);
            spawn.mapRect(-900, -175, 100, 800);
            spawn.mapRect(-1800, 525, 550, 100);
            spawn.mapRect(-350, 0, 100, 850);
            spawn.mapRect(-750, 1100, 475, 100);
            spawn.mapRect(-1225, 1775, 725, 100);
            spawn.mapRect(-275, 1000, 600, 100);
            spawn.mapRect(-1525, 1500, 100, 900);
            spawn.mapRect(-625, 750, 250, 100);
            spawn.mapRect(-175, 1825, 475, 100);
            spawn.mapRect(-125, 1825, 100, 450);
            spawn.mapRect(-125, 2025, 325, 100);
            spawn.mapRect(50, 2025, 100, 375);
            spawn.mapRect(650, 1300, 100, 975);
            spawn.mapRect(50, 2175, 375, 100);
            spawn.mapRect(250, 2525, 600, 100);
            spawn.mapRect(600, 2525, 100, 725);
            spawn.mapRect(375, 2525, 100, 400);
            spawn.mapRect(325, 2825, 250, 100);
            spawn.mapRect(425, 3075, 375, 100);
            spawn.mapRect(425, 2975, 100, 200);
            spawn.mapRect(600, 2800, 500, 100);
            spawn.randomMob(-2275, 350, Infinity);
            spawn.randomMob(-2500, 700, Infinity);
            spawn.randomMob(-2525, 1025, Infinity);
            spawn.randomMob(-2300, 1225, Infinity);
            spawn.randomMob(-2575, 1525, Infinity);
            spawn.randomMob(-2325, 1625, Infinity);
            spawn.randomMob(-3075, 1650, Infinity);
            spawn.randomMob(-3100, 1050, Infinity);
            spawn.randomGroup(-3100, -300, Infinity, "node");
            spawn.randomMob(-2000, 1150, Infinity);
            spawn.randomMob(-2000, 900, Infinity);
            spawn.randomMob(-1425, 1300, Infinity);
            spawn.randomMob(-1275, 1550, Infinity);
            spawn.randomMob(50, 1650, Infinity);
            spawn.randomMob(0, 1300, Infinity);
            spawn.randomMob(-550, 975, Infinity);
            spawn.randomMob(-850, 975, Infinity);
            spawn.randomMob(-675, 450, Infinity);
            spawn.randomMob(525, 2075, Infinity);
            spawn.randomMob(350, 2400, Infinity);
            spawn.randomGroup(1450, 2175, Infinity);
            spawn.randomGroup(1525, 2700, Infinity);
            activeButtons = [level.button(-3087.5 - 63, 850), level.button(-450 - 63, 750), level.button(800 - 63, 2800)]
        }, () => {
            m.spawnPos.x = m.pos.x;
            m.spawnPos.y = m.pos.y;
            level.enter.x = m.spawnPos.x - 50;
            level.enter.y = m.spawnPos.y + 20;
            level.defaultZoom = 1800
            simulation.zoomTransition(level.defaultZoom)
            //simulation.inGameConsole(`level<span class='color-symbol'>.</span>boundary<span class='color-symbol'>.</span>allowHealing<span class='color-symbol'>(</span>true<span class='color-symbol'>)</span>`)
            simulation.inGameConsole(`for (let i <span class='color-symbol'>=</span> 0; i <span class='color-symbol'><</span> Math.max(1, 6 - simulation.difficultyMode); i<span class='color-symbol'>++</span>)`);
            simulation.inGameConsole(`{ powerUps.spawn(m.pos.x, m.pos.y, "heal") <em>//preparation</em>}`);
            for (let i = 0; i < Math.max(1, 6 - simulation.difficultyMode); i++) { // mercy heal before the boss
                powerUps.spawn(m.pos.x + Math.random(), m.pos.y + Math.random(), "heal")
            }
            document.body.style.backgroundColor = "#fff"
            color.map = "#000"
            spawn.mapRect(-3050, 375, 400, 100);
            spawn.mapRect(-2200, -625, 100, 550);
            spawn.mapRect(-2750, -550, 100, 425);
            spawn.mapRect(-2750, -225, 375, 100);
            spawn.mapRect(-2200, -650, 100, 50);
            spawn.mapRect(-1950, -425, 100, 350);
            spawn.mapRect(-1800, -825, 225, 100);
            spawn.mapRect(-1225, -700, 350, 100);
            spawn.mapRect(-550, -800, 300, 100);
            spawn.mapRect(-550, -950, 100, 250);
            spawn.mapRect(225, -1050, 100, 350);
            spawn.mapRect(800, -1275, 100, 175);
            spawn.mapRect(625, -1275, 275, 100);
            spawn.mapRect(1875, 375, 1375, 100);
            spawn.mapRect(2425, 175, 825, 100);
            spawn.mapRect(2800, -1200, 100, 525);
            spawn.mapRect(2675, -775, 225, 100);
            spawn.mapRect(750, -225, 750, 100);
            spawn.mapRect(1125, -625, 100, 500);
            spawn.mapRect(950, -225, 100, 250);
            spawn.mapRect(1125, -525, 250, 100);
            spawn.mapRect(3150, -200, 100, 475);
            spawn.mapRect(3150, 375, 100, 575);
            spawn.mapRect(3150, 850, 2000, 100);
            spawn.mapRect(3150, -1300, 2000, 100);
            spawn.mapRect(5050, -1300, 100, 2250);
            activeButtons = [level.button(4850 - 63, 850)]
        }, () => {
            m.spawnPos.x = m.pos.x;
            m.spawnPos.y = m.pos.y;
            level.enter.x = m.spawnPos.x - 50;
            level.enter.y = m.spawnPos.y + 20;
            document.body.style.backgroundColor = "#fff"
            spawn.mapRect(4325, 850, 825, 100);
            spawn.mapRect(3150, 850, 825, 100);
            spawn.mapRect(3150, -1300, 825, 100);
            spawn.mapRect(4325, -1300, 825, 100);
            spawn.mapRect(3150, -1300, 100, 2250);
            spawn.mapRect(5050, -1300, 100, 2250);

            try {
                simulation.trails(300)
                boundaryBoss(4150, -175)
            } catch (err) {
                //simulation.inGameConsole(`Error spawning boundary boss: ${err}`);
                spawn.randomLevelBoss(4150, -175);
            }
        }];
        function loadNextSection() {
            level.newLevelOrPhase();
            let oldMapLength = map.length
            let oldMobLength = mob.length
            if (curSection < 5 && curSection) {
                spawn.setSpawnList()
                if (spawn.pickList[1] == 'ghoster') spawn.pickList[1] = 'grower' // goes through walls + literally invisible half the time
                if (spawn.pickList[1] == 'sucker') spawn.pickList[1] = 'springer' // goes through walls
                if (spawn.pickList[1] == 'boidCulture') spawn.pickList[1] = 'stabber' // capable of spawning out of bounds due to limited space
                if (['hopper', 'hopMother', 'striker'].includes(spawn.pickList[1])) spawn.pickList[1] = 'focuser' // gravity affected
                level.announceMobTypes()
            }
            sections[curSection]()
            if (curSection) {
                for (let i = 0; i < body.length; i++) {
                    Matter.Composite.remove(engine.world, body[i]);
                    body.splice(i, 1)
                }
                for (let i = 0; i < map.length - oldMapLength; i++) {
                    map[oldMapLength + i].collisionFilter.category = cat.map;
                    map[oldMapLength + i].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
                    Matter.Body.setStatic(map[oldMapLength + i], true); //make static
                    Composite.add(engine.world, map[oldMapLength + i]);
                }
                if (curSection < 5) {
                    for (let i = 0; i < mob.length - oldMobLength; i++) { // make mobs more massive to buff health and damage
                        if (!mob[oldMobLength + i].isBadTarget) mob[oldMobLength + i].mass *= 1.8 + (Math.max(0, (tech.totalCount - 6) ** 3) * 0.00017) // the exponential increase is to punish duplication chance builds
                    }
                }
                if (curSection == 5) { // remove parts of previous sections for the 6th one
                    Matter.Composite.remove(engine.world, map[7]);
                    map.splice(7, 1)
                    Matter.Composite.remove(engine.world, map[16]);
                    map.splice(16, 1)
                }
                if (curSection == 6) {
                    for (let i = 0; i < oldMapLength; i++) {
                        Matter.Composite.remove(engine.world, map[i]);
                    }
                    map.splice(0, oldMapLength)
                }
                simulation.draw.setPaths()
            }
            curSection++
        }
        loadNextSection()
        let curColor = [270 + ((Math.random() - 0.5) * 120), 45, 64]
        let targetColor = curColor
        let mHealthCap = m.health // do not permit healing even with tech that directly increase health
        let mHealthAtCheckpoint = m.health // heal by 33% of damage taken inbetween buttons
        level.custom = () => {
            if (curSection >= 7) level.exit.drawAndCheck();
            for (let i = 0; i < activeButtons.length; i++) {
                activeButtons[i].draw()
                activeButtons[i].queryPlayer()
                if (!activeButtons[i].isUp) {
                    activeButtons.splice(i, 1)
                    colorFlips++
                    // invert colors
                    let col = [color.map, document.body.style.backgroundColor]
                    document.body.style.backgroundColor = col[0]
                    color.map = col[1]
                    /* if (curSection < 6) {
                        let heal = (mHealthAtCheckpoint-m.health)/4
                        if (heal > 0) {
                            m.health += heal
                            m.displayHealth();
                            mHealthCap = m.health
                            mHealthAtCheckpoint = m.health
                            simulation.inGameConsole(`level<span class='color-symbol'>.</span>boundary<span class='color-symbol'>.</span>undoHarmPercent<span class='color-symbol'>(</span>0.25<span class='color-symbol'>)</span>`)
                        } 
                    }*/
                }
            }
            if (activeButtons.length == 0 && curSection < sections.length) loadNextSection()
            if (curSection != 6 && curSection != 8) {
                if (!(m.cycle % (60 / (1 + (curSection == 7))))) targetColor = [270 + ((Math.random() - 0.5) * 120), 45, 64] // smoothly change colors
                for (let i = 0; i < curColor.length; i++) {
                    curColor[i] += (targetColor[i] - curColor[i]) / (15 / (1 + (curSection == 7)))
                }
                if (colorFlips % 2) {
                    document.body.style.backgroundColor = `hsl(${curColor[0]} ${curColor[1]}% ${curColor[2]}%)`
                } else {
                    color.map = `hsl(${curColor[0]} ${curColor[1]}% ${curColor[2]}%)`
                }
                if (curSection == 7) {
                    for (let i = 0; i < mob.length; i++) {
                        if (!mob[i].isBoundaryBossCenter) mob[i].fill = `hsla(${curColor[0]},${curColor[1]}%,${curColor[2] + 10}%,${(mob[i].health * 0.67) + 0.33})`
                    }
                }
                /* if (curSection < 6 && curSection > 1) {
                    if (m.health > mHealthCap) {
                        m.health = mHealthCap
                        m.displayHealth();
                    }
                    if (m.health < mHealthCap) mHealthCap = m.health
                    for (let i = 0; i < powerUp.length; i++) { // remove all heals before the boss
                        if (powerUp[i].name === "heal") {
                            Matter.Composite.remove(engine.world, powerUp[i]);
                            powerUp.splice(i, 1)
                        }
                    }
                } */
                if (curSection == 7) {
                    for (let i = 0; i < body.length; i++) {
                        Matter.Composite.remove(engine.world, body[i]);
                        body.splice(i, 1)
                    }
                }
            }
            if (curSection < 2) level.enter.draw();
        };
        level.customTopLayer = () => {
            let bossAlive = false
            for (let i = 0; i < mob.length; i++) {
                if (mob[i].isBoss) bossAlive = true
            }
            if (curSection == 7 && bossAlive) {
                if (player.position.y > 900) Matter.Body.setPosition(player, { x: player.position.x, y: -1240 })
                if (player.position.y < -1250) Matter.Body.setPosition(player, { x: player.position.x, y: 890 })
                ctx.beginPath() // hide level exit
                ctx.fillStyle = "#fff"
                ctx.fillRect(150, 1000, 7325, 3275)
            }
        };
    },
    bifurcate() {
        simulation.inGameConsole(`<strong>bifurcate</strong> by <span class='color-var'>doalDeficit</span>.
            <br>made for c-gon`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 875;
        level.exit.y = -3280;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#c3d6df" //"#d8dadf";
        color.map = "#303639";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        spawn.mapRect(-250, -350, 500, 75);
        spawn.mapRect(175, -350, 75, 175);
        spawn.mapRect(-250, 0, 1225, 425);
        spawn.mapRect(950, 100, 125, 325);
        spawn.mapRect(950, 325, 475, 100);
        spawn.mapRect(575, -350, 400, 175);
        spawn.mapRect(800, -1150, 275, 875);
        spawn.mapRect(475, -1275, 475, 150);
        spawn.mapRect(-800, -675, 625, 1100);
        spawn.mapRect(950, -1800, 725, 325);
        spawn.mapRect(650, -1800, 400, 200);
        spawn.mapRect(1275, -1800, 400, 2225);
        spawn.mapVertex(950, -1150, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(1275, -1475, '0 -200  200 0  0 200  -200 0');
        spawn.mapVertex(975, 100, '0 -100  100 0  0 100  -100 0');
        spawn.mapVertex(975, -275, '0 -100  100 0  0 100  -100 0');
        spawn.mapVertex(950, -1600, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(800, -1125, '0 -100  100 0  0 100  -100 0');
        spawn.mapVertex(800, -350, '0 -100  100 0  0 100  -100 0');
        const elevator0 = level.elevator(1075, 100, 200, 225, -700, 0.011, { up: 0.01, down: 0.2 })
        spawn.bodyRect(-250, -1400, 400, 50, 1, spawn.propsHoist); //hoist
        cons[cons.length] = Constraint.create({
            pointA: {
                x: -50,
                y: -1775
            },
            bodyB: body[body.length - 1],
            stiffness: 0.0007,
            length: 200
        });
        Composite.add(engine.world, cons[cons.length - 1]);

        spawn.mapRect(-975, -1350, 350, 50);
        spawn.mapRect(-1425, -350, 650, 775);
        spawn.mapRect(-1425, -1675, 500, 50);
        spawn.mapRect(-1425, -1675, 225, 975);
        spawn.mapRect(-1575, -200, 175, 625);
        spawn.mapRect(-1800, 25, 250, 400);
        spawn.mapRect(-1575, -1675, 175, 825);
        spawn.mapRect(-2125, -1525, 350, 1950);
        spawn.mapRect(-4350, -1675, 2425, 2100);
        const elevator1 = level.elevator(-1775, -200, 200, 225, -1300, 0.011, { up: 0.01, down: 0.1 })
        spawn.mapVertex(-1925, -1525, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(-1425, -200, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(-1425, -850, '0 -150  150 0  0 150  -150 0');
        spawn.mapRect(-1575, -2675, 375, 550);
        spawn.mapRect(-1575, -2800, 3250, 350);
        spawn.mapRect(525, -2800, 1150, 1075);
        spawn.mapRect(-2100, -2800, 325, 675);
        spawn.mapRect(-1900, -2150, 125, 150);
        spawn.mapRect(-2225, -2800, 150, 550);
        spawn.mapRect(-2550, -2800, 775, 50);
        spawn.mapRect(-1450, -2150, 125, 150);
        spawn.mapRect(-1800, -2325, 37.5, 125);
        spawn.mapVertex(650, -1725, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(525, -2450, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1200, -2450, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1325, -2125, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1450, -2125, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1900, -2125, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-2100, -2250, '0 -125  125 0  0 125  -125 0');

        spawn.mapRect(-4350, -5375, 750, 4100);
        spawn.mapRect(-4350, -5375, 2575, 2000);
        spawn.mapRect(-2075, -5375, 1000, 1150);
        spawn.mapRect(-1375, -5375, 2750, 700);
        spawn.mapRect(1175, -5375, 500, 2925);
        spawn.mapRect(-3625, -3400, 1725, 150);
        spawn.mapRect(-1575, -3900, 700, 525);
        spawn.mapRect(-1450, -4025, 575, 775);
        spawn.mapRect(-700, -3000, 450, 225);
        spawn.mapRect(350, -3050, 850, 275);
        spawn.mapRect(700, -3250, 500, 475);
        spawn.mapRect(700, -4200, 150, 725);
        spawn.mapRect(825, -4050, 175, 425);
        spawn.mapVertex(-1775, -4225, '0 -200  200 0  0 200  -200 0');
        spawn.mapVertex(-1450, -3900, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1450, -3375, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-1900, -3375, '0 -125  125 0  0 125  -125 0');
        spawn.mapRect(-1100, -4700, 150, 350);
        spawn.mapRect(-925, -4025, 375, 50);
        spawn.mapRect(375, -4200, 375, 50);
        spawn.mapRect(-200, -3975, 250, 50);
        spawn.mapVertex(-1075, -4350, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(-950, -4675, '0 -125  125 0  0 125  -125 0');
        spawn.mapVertex(1175, -4675, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(1175, -3250, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(850, -4050, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(850, -3625, '0 -150  150 0  0 150  -150 0');
        spawn.mapVertex(-700, -2800, '0 -200  100 0  0 200  -100 0');
        spawn.mapVertex(-250, -2800, '0 -200  100 0  0 200  -100 0');
        spawn.mapVertex(350, -2800, '0 -250  125 0  0 250  -125 0');
        spawn.mapVertex(700, -3050, '0 -200  100 0  0 200  -100 0');

        spawn.mapVertex(-3600, -1675, '0 -300  300 0  0 300  -300 0');
        spawn.mapVertex(-3600, -3250, '0 -300  300 0  0 300  -300 0');
        let boost1 = level.boost(-3525, -1875, 1250, (Math.PI / 2) - (Math.PI / 8))  //x,y,push,angle radians
        spawn.mapVertex(-800, -350, '0 -325  162.5 0  0 325  -162.5 0');
        spawn.bodyRect(600, -400, 75, 50);
        spawn.bodyRect(-175, -450, 100, 100);
        spawn.bodyRect(-175, -475, 50, 25);
        spawn.bodyRect(-975, -1425, 75, 75);
        spawn.bodyRect(525, -1350, 125, 75);
        spawn.bodyRect(-2325, -2875, 100, 75);
        spawn.bodyRect(-2225, -2925, 100, 125);
        spawn.bodyRect(-2125, -2900, 50, 100);
        spawn.bodyRect(-2400, -1750, 150, 75);
        spawn.bodyRect(-2325, -1825, 50, 75);
        spawn.bodyRect(25, -2900, 150, 100);
        spawn.bodyRect(-1150, -2875, 100, 75);
        spawn.bodyRect(-1125, -4075, 50, 50);
        spawn.bodyRect(-1125, -4125, 50, 50);
        spawn.bodyRect(-1125, -4175, 50, 50);
        spawn.bodyRect(-1125, -4225, 50, 50);
        spawn.bodyRect(575, -4250, 150, 50);

        spawn.randomMob(0, -950, 1);
        spawn.randomMob(-775, -2100, 1);
        spawn.randomMob(475, -3300, 1);
        spawn.randomMob(-400, -4275, 1);
        spawn.randomMob(-2700, -2375, 1);
        spawn.randomMob(-550, -3550, 1);
        spawn.randomMob(-1275, -525, 1);
        spawn.randomMob(-400, -2000, 1);
        spawn.randomMob(-675, -1550, 1);
        spawn.randomMob(-3200, -2925, 1);
        spawn.randomMob(100, -4400, 1);
        spawn.randomMob(-2900, -2900, 1);
        spawn.randomSmallMob(75, -2100, Math.max(Math.min(Math.round(Math.random() * simulation.difficulty * 0.5), 6), 0), 16 + Math.ceil(Math.random() * 15), 1.3);
        spawn.randomSmallMob(-850, -1000, Math.max(Math.min(Math.round(Math.random() * simulation.difficulty * 0.5), 6), 0), 16 + Math.ceil(Math.random() * 15), 1.3);
        spawn.randomSmallMob(-1050, -3025, Math.max(Math.min(Math.round(Math.random() * simulation.difficulty * 0.5), 6), 0), 16 + Math.ceil(Math.random() * 15), 1.3);
        spawn.randomSmallMob(600, -4450, Math.max(Math.min(Math.round(Math.random() * simulation.difficulty * 0.5), 6), 0), 16 + Math.ceil(Math.random() * 15), 1.3);
        spawn.randomGroup(-3225, -2400, Infinity);
        if (simulation.difficulty > 1) {
            spawn.randomLevelBoss(0, -3600);
            spawn.secondaryBossChance(-400, -1700);
        }
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        level.custom = () => {
            level.exit.drawAndCheck();
            boost1.query()
            level.enter.draw();
        };
        level.customTopLayer = () => {
            elevator0.moveOnTouch()
            elevator1.moveOnTouch()
        };
    },
}