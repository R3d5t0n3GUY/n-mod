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
    }
}