setTimeout(() => {
    fileLoads.isCommunityLevelsJS = true; //for file handling in fileTester.js
}, 10);

const communityLevels = {
    stronghold() { // player made level  by    Francois 👑 from discord
        simulation.inGameConsole(`<strong>stronghold</strong> by <span class='color-var'>Francois</span>`);

        const boost1 = level.boost(1470, -250, 1080)
        const boost2 = level.boost(-370, 0, 800)
        const boost3 = level.boost(4865, 0, 1800)
        level.custom = () => {
            boost1.query();
            boost2.query();
            boost3.query();
            ctx.fillStyle = "#edf9f9";
            ctx.fillRect(-500, -1220, 550, -480);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(0, -700, 1050, 700);
            ctx.fillRect(-550, -1170, 550, 1170);
            ctx.fillRect(1150, -1700, 250, 1700);
            ctx.fillRect(1100, -1700, 50, 450);
            ctx.fillRect(1050, -1200, 100, 1200);
            ctx.fillRect(1400, -250, 200, -1500);
            ctx.fillRect(1600, -550, 600, -1150);
            ctx.fillRect(2530, -550, 430, -1450);
            ctx.fillRect(3270, -1700, 80, 600);
            ctx.fillRect(3350, -1350, 700, 230);
            ctx.fillRect(4050, -1700, 600, 1290);
            ctx.fillRect(3650, -110, 1000, 170);
            ctx.fillRect(4865, -55, 100, 55);
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {

        };

        level.setPosToSpawn(1900, -40); //normal spawn
        level.exit.x = -350;
        level.exit.y = -1250;

        level.defaultZoom = 1400
        simulation.zoomTransition(level.defaultZoom)

        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 20); //exit bump
        spawn.debris(3800, -1480, 300, 12);
        spawn.debris(3600, -1130, 200, 2);
        document.body.style.backgroundColor = "#dbdcde";
        // simulation.draw.mapFill = "#444"
        // simulation.draw.bodyFill = "rgba(140,140,140,0.85)"
        // simulation.draw.bodyStroke = "#222"

        // __________________________________________________________________________________________________
        // Spawn Box
        spawn.mapRect(1600, -500, 50, 500); //Left Wall
        spawn.mapRect(1600, -550, 1500, 50); //Roof
        spawn.mapRect(2300, -500, 50, 300); //Right Wall

        spawn.mapRect(-550, 0, 4300, 200); //ground
        spawn.mapRect(3700, 55, 1300, 145); //2nd ground
        spawn.mapRect(5000, 0, 50, 200); //Last small part of the ground
        spawn.mapRect(3100, -1070, 50, 570); // vertical 2nd roof
        spawn.mapRect(3100, -1120, 950, 50); // Horizontal 2nd Roof
        spawn.mapRect(4050, -1750, 600, 50); // Roof after lift 
        spawn.mapRect(4600, -1700, 50, 100); // Petit retour de toit, après ascenseur

        //Spawn "Upstairs" 
        spawn.mapRect(3650, -160, 400, 50); //Thin Walk
        spawn.mapRect(4050, -410, 600, 300); //Large staircase block
        spawn.mapRect(4600, -1120, 50, 710); //Left Wall Wall upstairs
        spawn.mapRect(4550, -1170, 100, 50); //Bloque ascenseur
        spawn.mapVertex(3700, 35, "0 0 450 0 300 -60 150 -60"); //first slope
        spawn.mapVertex(4850, 35, "0 0 370 0 370 -65 150 -65"); //second slope

        spawn.bodyRect(3950, -280, 170, 120); //Bloc Marche Pour Monter À Ascenseur
        // spawn.bodyRect(-2700, 1150, 100, 160, 1, spawn.propsSlide); //weight
        // spawn.bodyRect(-2550, 1150, 200, 100, 1, spawn.propsSlide); //weight
        spawn.bodyRect(4050, -500, 275, 100, 1, spawn.propsSlide); //weight
        spawn.bodyRect(4235, -500, 275, 100, 1, spawn.propsSlide); //weight
        // spawn.bodyRect(-2775, 1300, 400, 100, 1, spawn.propsHoist); //hoist
        spawn.bodyRect(4025, -450, 550, 100, 1, spawn.propsHoist); //hoist
        cons[cons.length] = Constraint.create({
            pointA: {
                x: 4325,
                y: -1700,
            },
            bodyB: body[body.length - 1],
            stiffness: 0.0002, //1217,
            length: 200
        });
        Composite.add(engine.world, cons[cons.length - 1]);

        spawn.bodyRect(2799, -870, 310, 290); //Gros bloc angle toit
        spawn.mapRect(4000, -1750, 50, 400); //Right Wall Cuve
        spawn.mapRect(3400, -1400, 600, 50); // Bottom Cuve
        spawn.mapRect(3350, -1750, 50, 400); // Left Wall Cuve
        spawn.bodyRect(3400, -1470, 110, 70); //Moyen bloc dans la cuve
        spawn.mapRect(3270, -1750, 80, 50); // Rebord gauche cuve

        spawn.mapRect(2530, -2000, 430, 50); //First Plateforme
        spawn.mapRect(1600, -1750, 600, 50); // Middle plateforme
        spawn.mapRect(1100, -1750, 300, 50); //Derniere plateforme // Toit petite boite en [
        spawn.bodyRect(1830, -1980, 190, 230); // Fat bloc plateforme middle 
        spawn.bodyRect(1380, -1770, 250, 20) // Pont last plateforme

        spawn.mapRect(1000, -1250, 400, 50); //Sol de la petite boite en [
        spawn.mapRect(1100, -1550, 50, 190); //Mur gauche petite boite en [
        spawn.bodyRect(1100, -1380, 48, 109); //Bloc-porte petite boite en [

        spawn.mapRect(-100, -750, 1100, 50); //Sol last salle
        spawn.mapRect(1000, -1200, 50, 500) // Mur droit last salle
        spawn.mapRect(50, -1550, 1050, 50); // Toit last salle
        spawn.bodyRect(1, -900, 48, 150); //Bloc porte last salle
        spawn.mapRect(0, -1170, 50, 270); //Mur gauche en bas last salle
        spawn.bodyRect(920, -900, 120, 120); //Gros bloc last salle

        spawn.mapRect(0, -1700, 50, 320); // Mur droit salle exit / Mur gauche last salle
        spawn.mapRect(-550, -1220, 600, 50); // Sol exit room
        spawn.mapRect(-500, -1750, 550, 50); // Toit exit room
        spawn.mapRect(-550, -1750, 50, 530); // Mur gauche exit room
        spawn.bodyRect(-503, -1250, 30, 30); // Petit bloc exit room

        spawn.mapRect(500, -700, 100, 590); //Bloc noir un dessous last salle
        spawn.mapRect(1350, -250, 250, 250); //Black Block left from the spawn


        map[map.length] = Bodies.polygon(2325, -205, 0, 15); //circle above door
        spawn.bodyRect(2325, -180, 15, 170, 1, spawn.propsDoor); // door
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
        spawn.bodyRect(650, 50, 70, 50);
        spawn.bodyRect(300, 0, 100, 60);
        spawn.bodyRect(400, 0, 100, 150);
        spawn.bodyRect(2545, -50, 70, 50);
        spawn.bodyRect(2550, 0, 100, 30);

        spawn.randomSmallMob(200, -1300, 0.5);
        spawn.randomSmallMob(300, -1300, 0.9);
        spawn.randomSmallMob(470, -650, 1);
        spawn.randomSmallMob(1000, -400, 1);
        spawn.randomSmallMob(2550, -560, 1);
        spawn.randomSmallMob(3350, -900, 1);
        spawn.randomSmallMob(3600, -1210, 1);
        spawn.randomSmallMob(700, -1950, 0.2);
        spawn.randomSmallMob(5050, -550);
        spawn.randomMob(-250, -250, 0.8);
        spawn.randomMob(-300, -600, 0.6);
        spawn.randomMob(350, -900, 0.5);
        spawn.randomMob(770, -950, 0.8)
        spawn.randomMob(900, -160, 1);
        spawn.randomMob(2360, -820, 0.8);
        spawn.randomMob(2700, -2020, 0.8);
        spawn.randomMob(3050, -1650, 0.8);
        spawn.randomMob(3350, -600, 0.8);
        spawn.randomMob(4400, -50, 1);
        spawn.randomGroup(1500, -1900, 0.5);
        spawn.randomGroup(2350, -850, 1);
        spawn.randomGroup(100, -450, 0.9);
        spawn.randomLevelBoss(1850, -1400);
        spawn.secondaryBossChance(1850, -1400)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    basement() { // player made level  by    Francois 👑 from discord
        simulation.inGameConsole(`<strong>basement</strong> by <span class='color-var'>Francois</span>`);
        let button, door, buttonDoor, buttonPlateformEnd, doorPlateform
        let isLevelReversed = Math.random();
        if (isLevelReversed < 0.7) {
            isLevelReversed = false;
        } else {
            isLevelReversed = true;
        }
        const elevator = level.elevator(4545, -220, 110, 30, -3000)
        const hazard = level.hazard(1675, -1050, 800, 150);
        const portal = level.portal({
            x: -620,
            y: -257
        }, Math.PI / 2, { //down
            x: 500,
            y: 2025
        }, -Math.PI / 2) //up
        spawn.mapRect(350, 2025, 300, 300); //Bloc portail n°2

        if (isLevelReversed === false) { /// Normal Spawn  
            button = level.button(2700, -1150);
            level.setPosToSpawn(2600, -2050); //normal spawn
            level.exit.x = level.enter.x + 4510;
            level.exit.y = level.enter.y + 600;
            spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        } else { /// Reversed spawn
            button = level.button(1450, -1150);
            buttonPlateformEnd = level.button(3530, -1150);
            buttonDoor = level.button(8033, -3625);
            door = level.door(7700, -3905, 25, 184, 184);
            doorPlateform = level.door(3200, -1225, 299, 80, 525);
            level.setPosToSpawn(7110, -1450); //normal spawn
            level.exit.x = level.enter.x - 4510;
            level.exit.y = level.enter.y - 600;
            spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
            spawn.mapRect(7675, -3935, 75, 25);
            spawn.mapRect(7675, -3715, 75, 25);
            spawn.bodyRect(8075, -3675, 50, 25);
        }
        const boost1 = level.boost(8290, -2100, 1800)
        level.custom = () => {
            boost1.query();

            level.exit.drawAndCheck();
            portal[2].query()
            portal[3].query()
            button.query();
            button.draw();
            if (isLevelReversed === true) { ///Reversed spawn
                buttonDoor.draw();
                buttonDoor.query();
                buttonPlateformEnd.draw();
                buttonPlateformEnd.query();
                // hazard.query(); //bug reported from discord?
                if (buttonDoor.isUp) {
                    door.isClosing = false
                } else {
                    door.isClosing = true
                }
                door.openClose();
                if (buttonPlateformEnd.isUp) {
                    doorPlateform.isClosing = true;
                } else {
                    doorPlateform.isClosing = false;
                }
                door.openClose();
                doorPlateform.openClose();
            }
            hazard.level(button.isUp)


            level.enter.draw();
            elevator.move();
            elevator.drawTrack();
        };

        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(61,62,62,0.95)";
            ctx.fillRect(-750, -900, 750, 450);

            if (isLevelReversed === true) {
                door.draw();
                doorPlateform.draw();
            }
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            hazard.query();
        };

        level.defaultZoom = 1300
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#c7c7c7";

        // GROUND //
        spawn.mapRect(-400, -2000, 400, 1430); //Gros left wall 
        spawn.mapRect(3700, -3000, 700, 2650); //Gros right wall //Puit
        spawn.mapRect(-400, -2000, 3700, 250); //Ground
        spawn.mapRect(2475, -1150, 1225, 250);
        spawn.mapRect(500, -1150, 1175, 250); //Ground level 3
        spawn.mapRect(350, -180, 4600, 1255); // Last ground
        spawn.mapRect(-400, -458, 750, 3337); //mur left sous-sol
        spawn.mapRect(-2850, -3375, 5300, 1375);
        spawn.mapRect(-2850, -4200, 8000, 825);
        spawn.mapRect(3700, -3375, 550, 375);
        spawn.mapRect(-2850, -5200, 10200, 1000);
        spawn.mapRect(5600, -1250, 3550, 2000);
        spawn.mapRect(9150, -5200, 1725, 5800);
        // SPAWN BOX //
        spawn.mapRect(2300, -3375, 950, 1000);
        spawn.mapRect(3550, -3375, 150, 1625);
        spawn.mapVertex(2020, -791, "  250 250  -860 250  -2200 0  250 0"); //map vertex en haut
        spawn.mapVertex(690, -295, "1700 0  -200 0  -200 -284  500 -284"); //map vertex en bas
        spawn.mapRect(2950, -900, 750, 250); //Extension ground apres map vertex
        if (isLevelReversed === false) {
            spawn.mapRect(3250, -1800, 50, 150); //Petit picot en haut, à gauche
            spawn.mapRect(3400, -1800, 50, 150); //Petit picot en haut, à droite
            spawn.mapRect(3150, -1300, 50, 200) //Petit picot en bas, à gauche
            spawn.mapRect(3500, -1300, 50, 200) //Petit picot en bas, à droite
            spawn.mapRect(3050, -3375, 500, 1260);
            spawn.mapRect(3400, -2265, 150, 515); //Mur fond tunnel
            spawn.bodyRect(3625, -1225, 75, 75); //Pitit bloc à droite en bas spawn
        } else {
            spawn.mapRect(3050, -3375, 500, 1000);
            spawn.mapRect(3400, -2400, 150, 650); //Mur fond tunnel
            spawn.bodyRect(3425, -1515, 75, 75); //Petit en bas spawn
            spawn.mapRect(3200, -1275, 300, 175);
        }

        // TRAMPOLING //
        if (isLevelReversed === false) { /// Normal spawn
            spawn.bodyRect(0, -1000, 500, 120, 1, spawn.propsHoist); //hoist
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: 250,
                    y: -1750,
                },
                bodyB: body[body.length - 1],
                stiffness: 0.00014,
                length: 120
            });
            Composite.add(engine.world, cons[cons.length - 1]);
            spawn.bodyRect(0, -1250, 240, 190) //Fat cube ascenseur
        } else { /// Reversed spawn
            spawn.bodyRect(0, -650, 225, 175);
            spawn.mapRect(425, -950, 175, 50);
            spawn.mapRect(-25, -1150, 100, 50);
        }
        // PUIT //
        spawn.mapVertex(4200, -1810, "0 0 450 0 600 -2500 0 -2500")
        spawn.mapVertex(5000, -1809, "0 0 450 0 450 -2500 -150 -2500")
        spawn.mapRect(4800, -3000, 800, 5875); //big right Puit
        // BOSS AREA //
        spawn.mapRect(4800, -3150, 50, 200); //Premiere barriere
        spawn.mapRect(5100, -3530, 50, 380); //2nd barriere
        spawn.mapRect(5100, -3200, 150, 50); //Marche en dessous mapVertex 1
        spawn.mapVertex(5450, -3650, "220 0  200 30  -200 30  -220 0  -200 -30  200 -30");
        spawn.mapVertex(6225, -3350, "275 0  250 50  -250 50  -275 0  -250 -50  250 -50");
        spawn.mapRect(5600, -3000, 1600, 725); //ground Boss Area
        //Ouverture right boss area
        spawn.mapRect(7300, -3325, 50, 50); //petite marche pour accéder à l'ouverture 
        spawn.mapRect(7350, -4075, 850, 50); //Bouche
        spawn.mapRect(7400, -4050, 800, 50); //Bouche
        spawn.mapRect(7450, -4025, 750, 50); //Bouche
        spawn.mapRect(7500, -4000, 700, 50); //Bouche
        spawn.mapRect(7550, -3975, 650, 50); //Bouche
        spawn.mapRect(7350, -3600, 850, 50); //Bouche
        spawn.mapRect(7400, -3625, 800, 50); //Bouche
        spawn.mapRect(7450, -3650, 575, 50); //Bouche
        spawn.mapRect(7500, -3675, 525, 50); //Bouche
        spawn.mapRect(7550, -3700, 475, 50); //Bouche
        //Murs
        spawn.mapRect(7350, -5200, 1800, 1125);
        spawn.mapRect(8475, -4075, 675, 2825);
        spawn.mapRect(7300, -2100, 1175, 850);
        spawn.mapRect(7350, -3550, 850, 1275);
        //Escaliers
        spawn.mapRect(6600, -2100, 200, 75); //escaliers
        spawn.mapRect(6750, -2100, 750, 250); //escaliers
        spawn.mapRect(6950, -1850, 550, 200); //escaliers
        spawn.mapRect(6750, -1400, 750, 150); //escaliers
        spawn.mapRect(6550, -1625, 250, 375); //escaliers
        spawn.mapRect(6350, -1800, 250, 550); //escaliers
        spawn.mapRect(5600, -2275, 800, 1025); //escaliers
        // BLOCS
        if (isLevelReversed === false) { /// Normal spawn
            spawn.bodyRect(1350, -1175, 225, 25);
            spawn.bodyRect(1450, -1200, 25, 25);
        } else { /// Reversed spawn
            spawn.bodyRect(700, -1175, 225, 25);
            spawn.bodyRect(800, -1200, 25, 25);
        }
        spawn.bodyRect(1100, -1375, 225, 225);
        spawn.bodyRect(1775, -925, 75, 25);
        spawn.bodyRect(2225, -950, 75, 50);
        spawn.bodyRect(2000, -1000, 50, 100);
        spawn.bodyRect(3100, -1175, 50, 25);
        spawn.bodyRect(2200, -375, 50, 50);
        spawn.bodyRect(2200, -425, 50, 50);
        spawn.bodyRect(2200, -475, 50, 50);
        spawn.bodyRect(2200, -525, 50, 50);
        spawn.bodyRect(1050, -400, 50, 25);
        spawn.mapRect(2200, -650, 50, 125);
        spawn.mapRect(2200, -325, 50, 150);
        spawn.mapRect(2875, -225, 250, 50);
        spawn.mapRect(2050, -1225, 75, 100); //Plateforme over acid
        // MOBS
        if (isLevelReversed === false) { ///Normal spawn
            if (simulation.difficulty > 1) {
                if (Math.random() < 0.2) {
                    spawn.tetherBoss(7000, -3300, { x: 7300, y: -3300 }) // tether ball
                } else {
                    spawn.randomLevelBoss(6100, -3600, ["shooterBoss", "launcherBoss", "laserTargetingBoss", "spiderBoss", "laserBoss", "pulsarBoss"]);
                }
            }
        } else { /// Reversed spawn
            if (simulation.difficulty > 1) {
                if (Math.random() < 0.2) {
                    spawn.tetherBoss(2300, -1300, { x: 2300, y: -1750 }) // tether ball
                } else {
                    spawn.randomLevelBoss(2300, -1400, ["shooterBoss", "launcherBoss", "laserTargetingBoss", "spiderBoss", "laserBoss", "dragonFlyBoss", "pulsarBoss"]);
                }
            }
        }
        spawn.randomSmallMob(100, -1000, 1);
        spawn.randomSmallMob(1340, -675, 1);
        spawn.randomSmallMob(7000, -3750, 1);
        spawn.randomSmallMob(6050, -3200, 1);
        spawn.randomMob(1970 + 10 * Math.random(), -1150 + 20 * Math.random(), 1);
        spawn.randomMob(3500, -525, 0.8);
        spawn.randomMob(6700, -3700, 0.8);
        spawn.randomMob(2600, -1300, 0.7);
        spawn.randomMob(600, -1250, 0.7);
        spawn.randomMob(2450, -250, 0.6);
        spawn.randomMob(6200, -3200, 0.6);
        spawn.randomMob(900, -700, 0.5);
        spawn.randomMob(1960, -400, 0.5);
        spawn.randomMob(5430, -3520, 0.5);
        spawn.randomMob(400, -700, 0.5);
        spawn.randomMob(6500, -4000, 0.4);
        spawn.randomMob(3333, -400, 0.4);
        spawn.randomMob(3050, -1220, 0.4);
        spawn.randomMob(800, 1200, 0.3);
        spawn.randomMob(7200, -4000, 0.3);
        spawn.randomMob(250, -1550, 0.3);
        spawn.randomGroup(900, -1450, 0.3);
        spawn.randomGroup(2980, -400, 0.3);
        spawn.randomGroup(5750, -3860, 0.4);
        spawn.randomGroup(1130, 1300, 0.1);
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        powerUps.spawn(1900, -940, "heal");
        powerUps.spawn(3000, -230, "heal");
        powerUps.spawn(5450, -3675, "ammo");

        // SECRET BOSS AREA //
        //hidden house
        spawn.mapRect(-850, -2000, 600, 1150); //Toit hidden house
        spawn.mapRect(-2850, -2000, 2150, 4880); //Mur gauche hidden house
        spawn.mapRect(-850, -458, 500, 3340); //Bloc sol hidden house
        //
        spawn.mapRect(-400, 2025, 3450, 850); //Sol secret boss area
        spawn.mapRect(625, 1300, 225, 50); //Plateforme horizontale n°1 
        spawn.mapRect(850, 1775, 470, 50); //Plateforme horizontale n°2
        spawn.mapRect(1000, 1625, 100, 150); //Plateforme vertiale n°1
        spawn.mapRect(1400, 1275, 100, 100); //Plateforme carrée
        spawn.mapRect(1700, 1675, 75, 450); //Plateforme verticale n°2
        spawn.mapRect(2100, 1375, 450, 50); //Plateforme accroche boss
        spawn.mapRect(2900, 900, 175, 325); //Débord de toit droite haut
        spawn.mapRect(2900, 1675, 150, 350); //Muret en bas à droite
        spawn.mapRect(2900, 1225, 75, 100); //Picot haut entrée salle trésor
        spawn.mapRect(2900, 1575, 75, 100); //Picot bas entrée salle trésor
        spawn.mapRect(2800, 1575, 100, 25); //Plongeoir sortie salle trésor
        spawn.mapRect(3050, 1675, 400, 1200); //Sol sallle trésor
        spawn.mapRect(3075, 1075, 375, 150); //Plafond salle trésor
        spawn.mapRect(3300, 1075, 1500, 1800); //Mur droite salle trésor
        // tether ball
        spawn.tetherBoss(2330, 1850, { x: 2330, y: 1425 })
        spawn.secondaryBossChance(2330, 1850)
        powerUps.chooseRandomPowerUp(3100, 1630);
    },
    // detours() { //by Francois from discord
    //     simulation.inGameConsole(`<strong>detours</strong> by <span class='color-var'>Francois</span>`);
    //     level.setPosToSpawn(0, 0); //lower start
    //     level.exit.y = 150;
    //     spawn.mapRect(level.enter.x, 45, 100, 20);
    //     level.exit.x = 10625;
    //     spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
    //     level.defaultZoom = 1400;
    //     simulation.zoomTransition(level.defaultZoom)
    //     document.body.style.backgroundColor = "#d5d5d5";
    //     const BGColor = "rgba(0,0,0,0.1)";
    //     // level.fill.push({
    //     //     x: -150,
    //     //     y: -250,
    //     //     width: 625,
    //     //     height: 325,
    //     //     color: BGColor
    //     // });
    //     // level.fill.push({
    //     //     x: 475,
    //     //     y: -520,
    //     //     width: 5375,
    //     //     height: 875,
    //     //     color: BGColor
    //     // });
    //     // level.fill.push({
    //     //     x: 5850,
    //     //     y: -1275,
    //     //     width: 2800,
    //     //     height: 2475,
    //     //     color: BGColor
    //     // });
    //     // level.fill.push({
    //     //     x: 8650,
    //     //     y: -500,
    //     //     width: 1600,
    //     //     height: 750,
    //     //     color: BGColor
    //     // });
    //     // level.fill.push({
    //     //     x: 10250,
    //     //     y: -700,
    //     //     width: 900,
    //     //     height: 950,
    //     //     color: BGColor
    //     // });
    //     const balance = level.spinner(5500, -412.5, 25, 660) //entrance
    //     const rotor = level.rotor(7000, 580, -0.001);
    //     const doorSortieSalle = level.door(8590, -520, 20, 800, 750)
    //     // let buttonSortieSalle
    //     // let portalEnBas
    //     let portalEnHaut
    //     // let door3isClosing = false;

    //     function drawOnTheMapMapRect(x, y, dx, dy) {
    //         spawn.mapRect(x, y, dx, dy);
    //         len = map.length - 1
    //         map[len].collisionFilter.category = cat.map;
    //         map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
    //         Matter.Body.setStatic(map[len], true); //make static
    //         Composite.add(engine.world, map[len]); //add to world
    //         simulation.draw.setPaths() //update map graphics
    //     }

    //     function drawOnTheMapBodyRect(x, y, dx, dy) {
    //         spawn.bodyRect(x, y, dx, dy);
    //         len = body.length - 1
    //         body[len].collisionFilter.category = cat.body;
    //         body[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
    //         Composite.add(engine.world, body[len]); //add to world
    //         body[len].classType = "body"
    //     }

    //     function spawnCouloirEnHaut() {
    //         // level.fill.push({
    //         //     x: 2575,
    //         //     y: -1150,
    //         //     width: 2550,
    //         //     height: 630,
    //         //     color: BGColor
    //         // });
    //         // level.fill.push({
    //         //     x: 1900,
    //         //     y: -2300,
    //         //     width: 1650,
    //         //     height: 1150,
    //         //     color: BGColor
    //         // });
    //         // level.fill.push({
    //         //     x: 3550,
    //         //     y: -1625,
    //         //     width: 1650,
    //         //     height: 475,
    //         //     color: BGColor
    //         // });
    //         // level.fill.push({
    //         //     x: 1800,
    //         //     y: -1120,
    //         //     width: 775,
    //         //     height: 600,
    //         //     color: BGColor
    //         // });
    //         drawOnTheMapMapRect(3800, -270, 75, 75);
    //         drawOnTheMapMapRect(3900, -895, 500, 75);
    //         drawOnTheMapMapRect(3900, -1195, 75, 375);
    //         drawOnTheMapMapRect(3525, -1195, 450, 75);
    //         drawOnTheMapMapRect(3525, -1995, 50, 1575);
    //         drawOnTheMapMapRect(3325, -1995, 50, 1575);
    //         drawOnTheMapMapRect(3525, -1670, 1675, 75);
    //         drawOnTheMapMapRect(5100, -1670, 100, 1250);
    //         drawOnTheMapMapRect(1800, -1195, 1575, 75);
    //         drawOnTheMapMapRect(1800, -1520, 375, 400);
    //         drawOnTheMapMapRect(1800, -2370, 100, 1250);
    //         drawOnTheMapMapRect(2375, -1845, 375, 250);
    //         drawOnTheMapMapRect(2700, -1745, 650, 75);
    //         drawOnTheMapMapRect(1800, -2370, 1775, 100);
    //         drawOnTheMapMapRect(3525, -2370, 50, 775);
    //         drawOnTheMapMapRect(4650, -1220, 550, 75);
    //         drawOnTheMapBodyRect(3225, -1845, 100, 100);
    //         drawOnTheMapBodyRect(3575, 1255, 125, 25);
    //         drawOnTheMapBodyRect(2450, 2255, 25, 25);
    //         drawOnTheMapBodyRect(3975, -945, 175, 50);
    //         drawOnTheMapBodyRect(4825, -1295, 50, 75);
    //         drawOnTheMapBodyRect(4850, -720, 250, 200);
    //         drawOnTheMapBodyRect(4050, -970, 25, 25);
    //         drawOnTheMapBodyRect(3075, -1245, 50, 50);
    //         portalEnHaut = level.portal({
    //             x: 3650,
    //             y: -1470
    //         }, Math.PI / 2, {
    //             x: 3250,
    //             y: -1473
    //         }, Math.PI / 2)

    //         spawn.randomSmallMob(2500, -2070 + Math.random(), 1);
    //         spawn.randomSmallMob(5000, -1370, 1);
    //         spawn.randomMob(5000, -645, 0.9);
    //         spawn.randomMob(4050, -970, 0.9);
    //         spawn.randomSmallMob(2800, -1620, 0.7);
    //         spawn.randomMob(2400, -1370, 0.5);
    //         spawn.randomMob(3725, -1320, 0.3);
    //         spawn.randomGroup(2115, -2020, 0.1)

    //         powerUps.spawn(5000, -1275, "heal");

    //         levelCustom2();
    //     }
    //     //////////////////////////////////////////
    //     level.custom = () => {
    //         level.exit.drawAndCheck();
    //         rotor.rotate();
    //         // rotor2.rotate()

    //         level.enter.draw();
    //     };
    //     level.customTopLayer = () => {
    //         doorSortieSalle.draw();
    //         ctx.fillStyle = "#233"
    //         ctx.beginPath();
    //         ctx.arc(balance.pointA.x, balance.pointA.y, 9, 0, 2 * Math.PI);
    //         ctx.fill();
    //     };
    //     ////////////////////////////////////////
    //     function levelCustom2() {
    //         level.custom = () => {
    //             portalEnHaut[2].query();
    //             portalEnHaut[3].query();
    //             rotor.rotate();
    //             doorSortieSalle.openClose();
    //             level.exit.drawAndCheck();

    //             level.enter.draw();
    //         };
    //         // //////////////////////////////////////
    //         level.customTopLayer = () => {
    //             doorSortieSalle.draw();
    //             portalEnHaut[0].draw();
    //             portalEnHaut[1].draw();
    //             portalEnHaut[2].draw();
    //             portalEnHaut[3].draw();
    //             ctx.fillStyle = "#233"
    //             ctx.beginPath();
    //             ctx.arc(balance.pointA.x, balance.pointA.y, 9, 0, 2 * Math.PI);
    //             ctx.fill();

    //         };
    //     }
    //     //spawn box
    //     spawn.mapRect(-200, -295, 75, 425);
    //     spawn.mapRect(-200, 55, 700, 75);
    //     spawn.mapRect(-200, -295, 700, 75);
    //     spawn.bodyRect(470, -220, 25, 275); //porte spawn box
    //     //couloir
    //     spawn.mapRect(450, -520, 50, 300); //muret gauche haut
    //     spawn.mapRect(450, 55, 50, 300); //muret gauche bas
    //     spawn.mapRect(1700, -520, 50, 325); //muret 2 haut
    //     spawn.mapRect(1700, 55, 50, 300); //muret 2 bas
    //     spawn.mapRect(4375, 55, 50, 300);
    //     spawn.mapRect(4575, 55, 50, 300);
    //     spawn.bodyRect(4625, 155, 75, 100);
    //     spawn.bodyRect(4725, 230, 50, 25);
    //     if (Math.random() > 0.5) {
    //         powerUps.chooseRandomPowerUp(4500, 200);
    //     } else {
    //         powerUps.chooseRandomPowerUp(8350, -630);
    //     }
    //     //blocs
    //     spawn.bodyRect(7475, 1055, 50, 75);
    //     spawn.bodyRect(7775, 1105, 25, 25);
    //     spawn.bodyRect(6925, 1105, 125, 25);
    //     spawn.bodyRect(6375, 380, 50, 50);
    //     spawn.bodyRect(6425, -220, 125, 150);
    //     spawn.bodyRect(6475, -245, 125, 25);
    //     spawn.bodyRect(7675, -245, 100, 50);
    //     spawn.bodyRect(7075, -520, 50, 100);
    //     spawn.bodyRect(8400, -595, 100, 75);
    //     spawn.bodyRect(1700, 5, 50, 50);
    //     spawn.bodyRect(1700, -45, 50, 50);
    //     spawn.bodyRect(1700, -95, 50, 50);
    //     spawn.bodyRect(1700, -145, 50, 50);
    //     spawn.bodyRect(1700, -195, 50, 50);
    //     spawn.mapRect(450, -520, 1600, 100); //plafond 1
    //     spawn.mapRect(450, 255, 1600, 100); //sol 1
    //     spawn.mapRect(2250, -45, 1450, 75); //entresol
    //     spawn.mapRect(3900, -520, 2000, 100); //plafond 2
    //     spawn.mapRect(3900, 255, 2000, 100); //sol 2
    //     //grande salle
    //     spawn.bodyRect(5900, 830, 325, 300); //bloc en bas à gauche
    //     spawn.mapRect(5775, -1295, 2900, 100);
    //     spawn.mapRect(5775, 1130, 2900, 100); //plancher + sol grande salle
    //     spawn.mapRect(5925, -70, 650, 50); //plateforme middle entrée
    //     spawn.mapRect(7575, -520, 1100, 100); //sol salle en haut à droite
    //     spawn.mapRect(6800, -420, 450, 50); //petite plateforme transition vers salle en haut
    //     spawn.mapRect(7750, -1295, 75, 575); //mur gauche salle en haut à droite
    //     spawn.mapRect(6100, 430, 375, 50); //plateforme en bas, gauche rotor
    //     spawn.mapRect(7450, -195, 1225, 75); //longue plateforme
    //     //murs grande salle
    //     spawn.mapRect(5775, -1295, 125, 875);
    //     spawn.mapRect(5775, 255, 125, 975);
    //     spawn.mapRect(8550, -1295, 125, 875);
    //     spawn.mapRect(8550, 180, 125, 1050);
    //     //couloir 2
    //     spawn.mapRect(8875, -520, 1425, 325);
    //     spawn.mapRect(8550, -520, 1750, 100);
    //     spawn.mapRect(8550, 180, 2625, 100);
    //     spawn.mapRect(10175, -745, 125, 325);
    //     spawn.mapRect(10175, -745, 1000, 125);
    //     spawn.mapRect(11050, -745, 125, 1025);
    //     spawn.mapRect(8875, 80, 1425, 200);
    //     //MOBS
    //     spawn.randomSmallMob(900, -70, 1);
    //     spawn.randomMob(4300, 95, 1);
    //     spawn.randomSmallMob(6250, 630, 1);
    //     spawn.randomMob(6255, -835, 0.9);
    //     spawn.randomMob(8200, -900, 0.7);
    //     spawn.randomMob(5700, -270, 0.7);
    //     spawn.randomMob(8275, -320, 0.7);
    //     spawn.randomMob(2700, -270, 0.7);
    //     spawn.randomMob(7575, 950, 0.5);
    //     spawn.randomMob(7000, -695, 0.4);
    //     spawn.randomMob(1850, -345, 0.3);
    //     spawn.randomMob(3600, -270, 0.3);
    //     spawn.randomMob(1500, -270, 0.2);
    //     spawn.randomMob(1250, 55, 0.2);
    //     spawn.randomMob(8800, -45, 0.2);
    //     spawn.randomGroup(8025, -845, 0.2);

    //     if (simulation.difficulty > 2) {
    //         // if (Math.random() < 0.2) {
    //         //     // tether ball
    //         //     spawn.tetherBoss(8000, 630, { x: 8550, y: 680 })
    //         //     let me = mob[mob.length - 1];
    //         //     me.onDeath = function() { //please don't edit the onDeath function this causes serious bugs
    //         //         this.removeCons(); //remove constraint
    //         //         spawnCouloirEnHaut()
    //         //         doorSortieSalle.isClosing = false;
    //         //     };
    //         //     if (simulation.difficulty > 4) spawn.nodeGroup(8000, 630, "spawns", 8, 20, 105);
    //         // } else {
    //         spawn.randomLevelBoss(8000, 630, ["shooterBoss", "launcherBoss", "laserTargetingBoss", "spiderBoss", "laserBoss", "bomberBoss", "orbitalBoss", "pulsarBoss"]);
    //         spawn.secondaryBossChance(8000, 630)
    //         //find level boss index
    //         let me
    //         for (let i = 0, len = mob.length; i < len; i++) {
    //             if (mob[i].isBoss) me = mob[i]
    //         }
    //         if (me) {
    //             me.onDeath = function() { //please don't edit the onDeath function this causes serious bugs
    //                 spawnCouloirEnHaut()
    //                 doorSortieSalle.isClosing = false;
    //             };
    //         } else {
    //             spawnCouloirEnHaut()
    //             doorSortieSalle.isClosing = false;
    //         }
    //         // }
    //     } else {
    //         spawn.randomLevelBoss(8000, 630, ["shooterBoss"]);
    //         let me
    //         for (let i = 0, len = mob.length; i < len; i++) {
    //             if (mob[i].isBoss) me = mob[i]
    //         }
    //         if (me) {
    //             me.onDeath = function() { //please don't edit the onDeath function this causes serious bugs
    //                 spawnCouloirEnHaut()
    //                 doorSortieSalle.isClosing = false;
    //             };
    //         } else {
    //             spawnCouloirEnHaut()
    //             doorSortieSalle.isClosing = false;
    //         }
    //     }
    // },
    house() { //by Francois from discord
        simulation.inGameConsole(`<strong>house</strong> by <span class='color-var'>Francois</span>`);
        const rotor = level.rotor(4251, -325, 120, 20, 200, 0, 0.01, 0, -0.0001);
        const hazard = level.hazard(4350, -1000, 300, 110);
        const doorBedroom = level.door(1152, -1150, 25, 250, 250);
        const doorGrenier = level.door(1152, -1625, 25, 150, 160);
        const buttonBedroom = level.button(1250, -850);
        const voletLucarne1 = level.door(1401, -2150, 20, 26, 28);
        const voletLucarne2 = level.door(1401, -2125, 20, 26, 53);
        const voletLucarne3 = level.door(1401, -2100, 20, 26, 78);
        const voletLucarne4 = level.door(1401, -2075, 20, 26, 103);
        const voletLucarne5 = level.door(1401, -2050, 20, 26, 128);
        const voletLucarne6 = level.door(1401, -2025, 20, 26, 153);
        let hasAlreadyBeenActivated = false;
        let grd

        level.setPosToSpawn(0, -50); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 3100;
        level.exit.y = -2480;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "rgb(170 170 170)"

        level.custom = () => {
            ctx.fillStyle = "rgb(221, 221, 221)";
            ctx.fillRect(1175, -1425, 4000, 1200);
            ctx.fillStyle = "rgb(170 170 170)";
            ctx.fillRect(1650, -1300, 175, 150);
            ctx.fillStyle = "rgb(77, 76, 76)";
            ctx.fillRect(624, -1150, 28, 1075);
            ctx.fillStyle = "#ababab";
            ctx.fillRect(3420, -380, 285, 40);
            ctx.fillStyle = "#474747";
            ctx.fillRect(3555, -367.5, 15, 15);
            ctx.fillRect(3418, -344, 288, 8);
            ctx.fillRect(3555, -327.5, 15, 15);
            ctx.fillRect(3418, -304, 288, 8);
            ctx.fillRect(3555, -285, 15, 15);
            ctx.fillStyle = "#ababab";
            ctx.fillRect(3420, -340, 285, 40);
            ctx.fillRect(3420, -300, 285, 45);
            ctx.fillStyle = "rgba(141, 141, 141,1)";
            ctx.fillRect(3800, -1275, 250, 425);
            ctx.fillStyle = "#000";
            ctx.fillRect(3800, -1275, 250, 3);
            ctx.fillRect(4048, -1275, 3, 425);
            ctx.fillRect(3800, -1275, 3, 425);
            ctx.fillRect(3830, -1050, 35, 10);
            ctx.fillStyle = "rgba(225, 242, 245,0.6)";
            ctx.fillRect(4050, -1425, 1125, 600);
            ctx.fillStyle = "#444";
            ctx.fillRect(1736, -1300, 3, 150);
            ctx.fillRect(1650, -1224, 175, 3);
            ctx.fillStyle = "#5806ac";
            ctx.fillRect(3375, -625, 375, 175);
            ctx.fillStyle = "rgba(166, 166, 166,0.8)";
            ctx.fillRect(4050, -1425, 1, 600);
            ctx.fillRect(4090, -1425, 1, 600);
            ctx.fillRect(4130, -1425, 1, 600);
            ctx.fillRect(4170, -1425, 1, 600);
            ctx.fillRect(4210, -1425, 1, 600);
            ctx.fillRect(4250, -1425, 1, 600);
            ctx.fillRect(4290, -1425, 1, 600);
            ctx.fillRect(4330, -1425, 1, 600);
            ctx.fillRect(4370, -1425, 1, 600);
            ctx.fillRect(4410, -1425, 1, 600);
            ctx.fillRect(4450, -1425, 1, 600);
            ctx.fillRect(4490, -1425, 1, 600);
            ctx.fillRect(4530, -1425, 1, 600);
            ctx.fillRect(4570, -1425, 1, 600);
            ctx.fillRect(4610, -1425, 1, 600);
            ctx.fillRect(4650, -1425, 1, 600);
            ctx.fillRect(4690, -1425, 1, 600);
            ctx.fillRect(4730, -1425, 1, 600);
            ctx.fillRect(4770, -1425, 1, 600);
            ctx.fillRect(4810, -1425, 1, 600);
            ctx.fillRect(4850, -1425, 1, 600);
            ctx.fillRect(4890, -1425, 1, 600);
            ctx.fillRect(4930, -1425, 1, 600);
            ctx.fillRect(4970, -1425, 1, 600);
            ctx.fillRect(5010, -1425, 1, 600);
            ctx.fillRect(5050, -1425, 1, 600);
            ctx.fillRect(5090, -1425, 1, 600);
            ctx.fillRect(5130, -1425, 1, 600);
            ctx.fillRect(4050, -1425, 1125, 2);
            ctx.fillRect(4050, -1385, 1125, 2);
            ctx.fillRect(4050, -1345, 1125, 2);
            ctx.fillRect(4050, -1305, 1125, 2);
            ctx.fillRect(4050, -1265, 1125, 2);
            ctx.fillRect(4050, -1225, 1125, 2);
            ctx.fillRect(4050, -1185, 1125, 2);
            ctx.fillRect(4050, -1145, 1125, 2);
            ctx.fillRect(4050, -1105, 1125, 2);
            ctx.fillRect(4050, -1065, 1125, 2);
            ctx.fillRect(4050, -1025, 1125, 2);
            ctx.fillRect(4050, -985, 1125, 2);
            ctx.fillRect(4050, -945, 1125, 2);
            ctx.fillRect(4050, -905, 1125, 2);
            ctx.fillRect(4050, -865, 1125, 2);

            buttonBedroom.query();
            buttonBedroom.draw();
            if (buttonBedroom.isUp) {
                if (hasAlreadyBeenActivated == false) {
                    doorBedroom.isClosing = true;
                    doorGrenier.isClosing = true;
                    voletLucarne1.isClosing = true;
                    voletLucarne2.isClosing = true;
                    voletLucarne3.isClosing = true;
                    voletLucarne4.isClosing = true;
                    voletLucarne5.isClosing = true;
                    voletLucarne6.isClosing = true;
                }
            } else {
                doorBedroom.isClosing = false;
                doorGrenier.isClosing = false;
                voletLucarne1.isClosing = false;
                voletLucarne2.isClosing = false;
                voletLucarne3.isClosing = false;
                voletLucarne4.isClosing = false;
                voletLucarne5.isClosing = false;
                voletLucarne6.isClosing = false;
                if (hasAlreadyBeenActivated == false) {
                    hasAlreadyBeenActivated = true;
                }
            }
            doorBedroom.openClose();
            doorGrenier.openClose();
            voletLucarne1.openClose();
            voletLucarne2.openClose();
            voletLucarne3.openClose();
            voletLucarne4.openClose();
            voletLucarne5.openClose();
            voletLucarne6.openClose();
            rotor.rotate();
            ///
            grd = ctx.createRadialGradient(512.5, -1025, 5, 512.5, -1025, 100);
            grd.addColorStop(0, "rgb(255, 199, 43)");
            grd.addColorStop(1, "rgb(170 170 170)");
            ctx.fillStyle = grd;
            ctx.fillRect(450, -1025, 125, 100);
            ///
            grd = ctx.createRadialGradient(762.5, -1025, 5, 762.5, -1025, 100);
            grd.addColorStop(0, "rgb(255, 199, 43, 1)");
            grd.addColorStop(1, "rgb(170 170 170)");
            ctx.fillStyle = grd;
            ctx.fillRect(700, -1025, 125, 100);
            ///
            ctx.lineWidth = 7;
            ctx.strokeStyle = "#444444"
            ctx.strokeRect(1650, -1300, 175, 150);

            chair.force.y += chair.mass * simulation.g;
            chair2.force.y += chair2.mass * simulation.g;
            person.force.y += person.mass * simulation.g;
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(64,64,64,0.97)";
            ctx.fillRect(2800, -400, 275, 175);

            hazard.query();
            doorBedroom.draw();
            doorGrenier.draw();
            voletLucarne1.draw();
            voletLucarne2.draw();
            voletLucarne3.draw();
            voletLucarne4.draw();
            voletLucarne5.draw();
            voletLucarne6.draw();
        };
        //chairs
        const part1 = Matter.Bodies.rectangle(4525, -255, 25, 200, {
            density: 0.0005,
            isNotHoldable: true,
        });
        const part2 = Matter.Bodies.rectangle(4562, -235, 100, 25, {
            density: 0.0005,
            isNotHoldable: true,
        });
        const part3 = Matter.Bodies.rectangle(4600, -202, 25, 91.5, {
            density: 0.0005,
            isNotHoldable: true,
        });
        const part4 = Matter.Bodies.rectangle(5100, -255, 25, 200, {
            density: 0.0005,
            isNotHoldable: true,
        });
        const part5 = Matter.Bodies.rectangle(5063, -235, 100, 25, {
            density: 0.0005,
            isNotHoldable: true,
        });
        const part6 = Matter.Bodies.rectangle(5025, -202, 25, 91.5, {
            density: 0.0005,
            isNotHoldable: true,
        });
        chair = Body.create({
            parts: [part1, part2, part3],
        });
        chair2 = Body.create({
            parts: [part4, part5, part6],
        });
        Composite.add(engine.world, [chair]);
        Composite.add(engine.world, [chair2]);
        composite[composite.length] = chair;
        composite[composite.length] = chair2;
        body[body.length] = part1;
        body[body.length] = part2;
        body[body.length] = part3;
        body[body.length] = part4;
        body[body.length] = part5;
        body[body.length] = part6;
        setTimeout(function () {
            chair.collisionFilter.category = cat.body;
            chair.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map
        }, 1000);
        setTimeout(function () {
            chair2.collisionFilter.category = cat.body;
            chair2.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map
        }, 1000);
        var head = Matter.Bodies.rectangle(300, -200 - 60, 34, 40, {
            isNotHoldable: true,
        });
        var chest = Matter.Bodies.rectangle(300, -200, 55, 80, {
            isNotHoldable: true,
        });
        var rightUpperArm = Matter.Bodies.rectangle(300 + 39, -200 - 15, 20, 40, {
            isNotHoldable: true,
        });
        var rightLowerArm = Matter.Bodies.rectangle(300 + 39, -200 + 25, 20, 60, {
            isNotHoldable: true,
        });
        var leftUpperArm = Matter.Bodies.rectangle(300 - 39, -200 - 15, 20, 40, {
            isNotHoldable: true,
        });
        var leftLowerArm = Matter.Bodies.rectangle(300 - 39, -200 + 25, 20, 60, {
            isNotHoldable: true,
        });
        var leftUpperLeg = Matter.Bodies.rectangle(300 - 20, -200 + 57, 20, 40, {
            isNotHoldable: true,
        });
        var leftLowerLeg = Matter.Bodies.rectangle(300 - 20, -200 + 97, 20, 60, {
            isNotHoldable: true,
        });
        var rightUpperLeg = Matter.Bodies.rectangle(300 + 20, -200 + 57, 20, 40, {
            isNotHoldable: true,
        });
        var rightLowerLeg = Matter.Bodies.rectangle(300 + 20, -200 + 97, 20, 60, {
            isNotHoldable: true,
        });

        //man 
        var person = Body.create({
            parts: [chest, head, leftLowerArm, leftUpperArm,
                rightLowerArm, rightUpperArm, leftLowerLeg,
                rightLowerLeg, leftUpperLeg, rightUpperLeg
            ],
        });
        Composite.add(engine.world, [person]);
        composite[composite.length] = person
        body[body.length] = chest
        body[body.length] = head
        body[body.length] = part3
        body[body.length] = leftLowerLeg
        body[body.length] = leftUpperLeg
        body[body.length] = leftUpperArm
        body[body.length] = leftLowerArm
        body[body.length] = rightLowerLeg
        body[body.length] = rightUpperLeg
        body[body.length] = rightLowerArm
        body[body.length] = rightUpperArm
        setTimeout(function () {
            person.collisionFilter.category = cat.body;
            person.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map
        }, 1000);

        //rez de chaussée
        spawn.mapRect(-200, 0, 5400, 100); //ground
        spawn.mapRect(1150, -255, 4050, 355); //additionnal ground
        spawn.mapRect(800, -255, 400, 90); //1st step
        spawn.mapRect(650, -170, 550, 90); //2nd step
        spawn.mapRect(500, -85, 700, 90); //3rd step
        spawn.mapRect(1150, -850, 50, 175); //porte entrée
        spawn.bodyRect(1162.5, -675, 25, 420) //porte entrée
        spawn.mapRect(1150, -850, 1500, 50); //plafond 1
        spawn.mapRect(3025, -850, 2175, 50); //plafond 2
        spawn.mapRect(5150, -850, 50, 650); //mur cuisine
        //lave-vaisselle
        spawn.mapRect(4225, -400, 25, 150);
        spawn.mapRect(4225, -400, 175, 25);
        spawn.mapRect(4375, -400, 25, 150);
        spawn.bodyRect(4350, -350, 20, 40);
        spawn.bodyRect(4325, -325, 20, 20);
        spawn.bodyRect(4325, -275, 20, 20);
        //escalier
        spawn.mapRect(3025, -850, 50, 225);
        spawn.mapRect(2925, -775, 150, 150);
        spawn.mapRect(2800, -700, 275, 75);
        spawn.mapRect(2575, -400, 175, 175);
        spawn.mapRect(2475, -325, 175, 100);
        spawn.mapRect(2675, -475, 400, 100);
        spawn.mapRect(2675, -475, 150, 250);
        //cuisine
        spawn.mapRect(4025, -850, 50, 175); //porte cuisine
        spawn.mapRect(4025, -375, 50, 125); //porte cuisine

        map[map.length] = Bodies.polygon(4050, -675, 0, 15); //circle above door
        spawn.bodyRect(4040, -650, 20, 260, 1, spawn.propsDoor); // door
        body[body.length - 1].isNotHoldable = true;
        //makes door swing
        consBB[consBB.length] = Constraint.create({
            bodyA: body[body.length - 1],
            pointA: {
                x: 0,
                y: -130
            },
            bodyB: map[map.length - 1],
            stiffness: 1
        });
        Composite.add(engine.world, consBB[consBB.length - 1]);

        //table + chaises
        spawn.mapRect(4025, -850, 50, 175);
        spawn.mapRect(4650, -375, 325, 25);
        spawn.mapRect(4700, -350, 25, 100);
        spawn.mapRect(4900, -350, 25, 100);
        spawn.bodyRect(4875, -400, 75, 25);
        spawn.bodyRect(4700, -400, 75, 25);

        //murs télé
        spawn.mapRect(3400, -400, 20, 150);
        spawn.mapRect(3705, -400, 20, 150);
        spawn.mapRect(3400, -400, 325, 20);
        //socle écran
        spawn.mapRect(3500, -415, 125, 17);
        spawn.mapRect(3550, -450, 25, 50);
        // ???
        spawn.bodyRect(3075, -375, 125, 125);
        spawn.bodyRect(3075, -400, 50, 25);
        spawn.bodyRect(3725, -325, 100, 75);
        spawn.bodyRect(3375, -275, 25, 25);
        // premier étage
        spawn.mapRect(1150, -1450, 4050, 50);
        spawn.mapRect(5150, -1450, 50, 650);
        spawn.mapRect(1150, -1450, 50, 300);
        spawn.mapRect(1150, -900, 50, 100);
        spawn.mapVertex(1066, -730, "-200 60  0 -60  100 -60  100 60")
        //chambre
        spawn.mapRect(2350, -1450, 50, 175); //porte chambre
        //lit
        spawn.mapRect(1475, -1025, 25, 225); //pied de lit 1
        spawn.mapRect(1850, -925, 25, 125); //pied de lit 2
        spawn.mapRect(1475, -925, 400, 50); //sommier
        spawn.bodyRect(1500, -950, 375, 25); //matelat 
        spawn.bodyRect(1500, -1000, 75, 50); //oreiller
        //table
        spawn.bodyRect(1950, -1000, 30, 150); //pied table
        spawn.bodyRect(2250, -1000, 30, 150); //pied table
        spawn.bodyRect(1920, -1025, 390, 25); //table 
        //salle de bain
        spawn.mapRect(4025, -1450, 50, 175); //porte salle de bain
        map[map.length] = Bodies.polygon(5050, -925, 0, 35.4);
        spawn.mapRect(5015, -960, 125, 40);
        spawn.mapRect(5050, -925, 90, 35.4);
        spawn.mapVertex(5086.5, -875, "100 60  -30 60   20 0 100 0")
        spawn.mapRect(5125, -1070, 15, 120)
        spawn.bodyRect(5016, -965, 108, 15)
        //baignoire
        spawn.mapVertex(4316, -965, "30 100  0 100   -80 -50  30 -50") //bord 1
        spawn.mapVertex(4675, -961.5, "30 100  0 100   0 -50  80 -50") //bord 2
        spawn.mapVertex(4400, -860, "0 -20  -20 20   20 20  0 -20") //pied 1
        spawn.mapVertex(4600, -860, "0 -20  -20 20   20 20  0 -20") //pied 2
        spawn.mapRect(4325, -900, 350, 25); //fond baignoire
        spawn.mapRect(4300, -1175, 25, 175);
        spawn.mapRect(4300, -1175, 125, 25);
        spawn.mapRect(4400, -1175, 25, 50); //pied pommeau de douche
        spawn.mapVertex(4412.5, -1105, "-20 -20  -30 40   30 40  20 -20") //pommeau de douche

        //grenier
        spawn.mapRect(1150, -1475, 50, 50);
        spawn.mapRect(1150, -1800, 50, 175);
        spawn.mapRect(5150, -1800, 50, 400); //murs
        spawn.mapVertex(1300, -1900, "-150 200  -200 200   50 0 100 0");
        spawn.mapVertex(1800, -2300, "-150 200  -200 200   175 -100 225 -100");
        spawn.mapRect(1390, -2180, 250, 30); //lucarne
        spawn.mapVertex(5050, -1900, "150 200  200 200   -50 0 -100 0");
        spawn.mapVertex(4550, -2300, "150 200  200 200   -175 -100 -225 -100");
        spawn.mapRect(4710, -2175, 250, 25); //lucarne 2
        spawn.mapRect(5150, -1450, 200, 50);
        //obstacles
        spawn.mapRect(3775, -1800, 99, 50);
        spawn.mapRect(2425, -2150, 50, 425);
        spawn.mapRect(2150, -1775, 325, 50);
        spawn.mapRect(3825, -2150, 50, 750);
        spawn.mapRect(3826, -2150, 149, 50);
        spawn.mapRect(4125, -2150, 149, 50);
        spawn.mapRect(4225, -2150, 50, 450);
        spawn.mapRect(4225, -1750, 250, 50);
        level.chain(2495, -2130, 0, true, 10);

        spawn.bodyRect(2950, -375, 120, 120) //bloc hidden zone
        spawn.bodyRect(2350, -1850, 75, 75);
        spawn.bodyRect(4275, -1900, 75, 100);
        spawn.bodyRect(4825, -1650, 325, 200);
        spawn.bodyRect(5025, -1725, 25, 25);
        spawn.bodyRect(4900, -1700, 200, 75);
        spawn.mapVertex(2950, -2096, "-75 -50  75 -50  75 0  0 100  -75 0")

        /*cheminée + roof*/
        spawn.mapRect(1963, -2450, 2425, 35);
        spawn.mapRect(2925, -2900, 125, 480);
        spawn.mapRect(2900, -2900, 175, 75);
        spawn.mapRect(2900, -2975, 25, 100);
        spawn.mapRect(3050, -2975, 25, 100);
        spawn.mapRect(2875, -3000, 225, 25);
        // lampadaire + jump 
        spawn.mapRect(1000, -1450, 200, 25);
        spawn.mapRect(500, -1150, 275, 25);
        spawn.mapRect(750, -1150, 25, 75);
        spawn.mapRect(500, -1150, 25, 75);
        spawn.mapRect(450, -1075, 125, 50);
        spawn.mapRect(700, -1075, 125, 50);
        spawn.mapRect(2985, -4600, 0.1, 1700)

        //bodyRects ~= debris
        spawn.bodyRect(1740, -475, 80, 220)
        spawn.bodyRect(1840, -290, 38, 23)
        spawn.bodyRect(1200 + 1475 * Math.random(), -350, 15 + 110 * Math.random(), 15 + 110 * Math.random());
        spawn.bodyRect(1200 + 1475 * Math.random(), -350, 15 + 110 * Math.random(), 15 + 110 * Math.random());
        spawn.bodyRect(3070 + 600 * Math.random(), -1100, 20 + 50 * Math.random(), 150 + 100 * Math.random())
        spawn.bodyRect(3050 + 1000 * Math.random(), -920, 30 + 100 * Math.random(), 15 + 65 * Math.random());
        spawn.bodyRect(1600 + 250 * Math.random(), -1540, 80, 220) //boss room
        spawn.debris(3070, -900, 1000, 3); //16 debris per level
        spawn.debris(1200, -350, 1475, 4); //16 debris per level
        spawn.debris(1250, -1550, 3565, 9); //16 debris per level

        powerUps.chooseRandomPowerUp(2860, -270);
        // Mobs

        spawn.randomSmallMob(1385, -600, 1);
        spawn.randomSmallMob(5000, -680, 1);
        spawn.randomSmallMob(4750, -925, 1);
        spawn.randomSmallMob(2300, -1830, 1);
        spawn.randomMob(3170, -720, 0.8);
        spawn.randomMob(3700, -975, 0.8);
        spawn.randomMob(2625, -1150, 0.7);
        spawn.randomMob(4175, -750, 0.7);
        spawn.randomMob(2100, -370, 0.7);
        spawn.randomMob(2000, -1230, 0.7);
        spawn.randomMob(4175, -1075, 0.6);
        spawn.randomMob(3965, -1650, 0.6)
        spawn.randomMob(4650, -1750, 0.6);
        spawn.randomMob(830, -1170, 0.5);
        spawn.randomGroup(3730, -1100, 0.5);
        spawn.randomMob(2650, -2250, 0.3);
        spawn.randomMob(1615, -2270, 0.3);
        spawn.randomMob(1380, -1280, 0.25);
        spawn.randomMob(2280, -650, 0.2);
        spawn.randomGroup(2450, -2650, 0.2);
        spawn.randomMob(3800, -580, 0.2);
        spawn.randomMob(4630, -425, 0.1);
        spawn.randomGroup(630, -1300, -0.1);
        spawn.randomGroup(3450, -2880, -0.2)
        if (simulation.difficulty > 3) {
            spawn.secondaryBossChance(3380, -1775)
            if (Math.random() < 0.16) {
                spawn.tetherBoss(3380, -1775, { x: 3775, y: -1775 })
            } else {
                spawn.randomLevelBoss(3100, -1850, ["shooterBoss", "spiderBoss", "launcherBoss", "laserTargetingBoss", "dragonFlyBoss", "laserBoss"]);
            }
        }
    },
    perplex() { //by Oranger from discord
        simulation.inGameConsole(`<strong>perplex</strong> by <span class='color-var'>Oranger</span>`);
        document.body.style.backgroundColor = "#dcdcde";
        level.setPosToSpawn(-600, 400);
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 550;
        level.exit.y = -2730;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);

        const portal = level.portal({ //main portals
            x: -1000,
            y: 50
        }, -Math.PI / 2, { //up
            x: 1000,
            y: 50
        }, -Math.PI / 2) //up
        const portal2 = level.portal({ //portals in upper right corner
            x: 1400,
            y: -2200
        }, -Math.PI / 2, { //up
            x: 1700,
            y: -1700
        }, -Math.PI / 2) //up
        //    rotor(x, y, width, height, density = 0.001, angle = 0, frictionAir = 0.001, angularVelocity = 0, rotationForce = 0.0005) {
        const rotor = level.rotor(-600, -1950, 800, 50, 0.001, 0, 0.01, 0, -0.001)

        level.custom = () => {
            portal[2].query(true)
            portal[3].query(true)
            portal2[2].query(true)
            portal2[3].query(true)
            rotor.rotate();

            ctx.fillStyle = "#d4f4f4";
            ctx.fillRect(375, -3000, 450, 300);
            level.exit.drawAndCheck();

            level.enter.draw();
        };

        level.customTopLayer = () => {
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
            ctx.fillStyle = "rgba(0,0,0,0.03)";
            ctx.fillRect(-875, -250, 1500, 700);
            ctx.fillRect(-925, -505, 930, 255);
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(725, -1400, 200, 200);
            ctx.fillRect(925, -2150, 150, 2175);
            ctx.fillRect(925, -3400, 150, 850);
            ctx.fillStyle = "rgba(0,0,0,0.03)";
            ctx.fillRect(1800, -2600, 400, 400);
            ctx.fillRect(2200, -2600, 400, 1250);

        };

        level.defaultZoom = 1700 // 4500 // 1400
        simulation.zoomTransition(level.defaultZoom)

        //section 1: before portals
        spawn.mapRect(-925, 450, 1850, 250); //1-1 base
        spawn.mapRect(-925, -300, 55, 755); //1 left wall
        spawn.mapRect(-875, 50, 1100, 50); //1-1 ceiling
        spawn.mapRect(620, -300, 305, 755); //1-1 and 1-2 right wall
        spawn.bodyRect(200, 350, 230, 100);
        spawn.bodyRect(300, 250, 150, 100);
        spawn.mapRect(-875, -300, 580, 50); //1-2 ceiling on left
        spawn.mapRect(0, -300, 625, 50); //1-2 ceiling on right
        spawn.mapRect(0, -650, 150, 350); //1-3 right wall
        spawn.mapRect(-925, -650, 975, 150); //1-3 ceiling
        spawn.mapRect(-1280, 100, 205, 150); //1-4 floor
        spawn.mapRect(-1280, 245, 360, 455); //bottom left corner
        spawn.mapRect(-1600, -200, 200, 50); //1-4 platform 1

        //section 2: lower central room (gone through main portals 1 time)
        spawn.mapRect(920, 245, 160, 455); //below right portal
        spawn.mapRect(1075, -300, 500, 1000); //2-1 right floor
        spawn.bodyRect(100, -1000, 50, 350);
        spawn.bodyRect(100, -1015, 250, 15);
        spawn.mapRect(-925, -1600, 100, 1000); //2-2 left wall
        spawn.mapRect(725, -2150, 200, 750); //2-2 right wall
        spawn.mapRect(725, -1200, 200, 200); //2-2 right wall 2
        spawn.mapRect(300, -1000, 625, 50); //2 central ledge
        //shute
        spawn.mapRect(1075, -2005, 550, 1055); //shute right wall
        spawn.mapRect(875, -1000, 50, 300); //shute left 1
        spawn.mapRect(860, -1030, 50, 300); //shute left 2
        spawn.mapRect(850, -1100, 50, 300); //shute left 3
        spawn.mapRect(830, -980, 50, 50); //shute left 4
        spawn.mapRect(1075, -1000, 50, 300); //shute right 1
        spawn.mapRect(1090, -1030, 50, 300); //shute right 2
        spawn.mapRect(1100, -1100, 50, 300); //shute right 3
        spawn.mapRect(1120, -980, 50, 50); //shute right 4
        spawn.mapRect(1850, -650, 400, 50); //drop from 4-1
        //section 3: upper left room and upper central room (gone through main portals 2 times)
        //3-2 is just the upper part of 2-2
        spawn.mapRect(-1775, -1000, 700, 300); //3-1 floor
        spawn.mapRect(-1900, -2300, 175, 1600); //3-1 left wall
        spawn.mapRect(-1375, -1300, 300, 50); //3-1 platform 1
        spawn.mapRect(-1600, -1650, 300, 50); //3-1 platform 2
        spawn.mapRect(-1775, -2300, 700, 300); //3-1 ceiling
        spawn.mapRect(-830, -1600, 300, 50); //3-2 left ledge
        spawn.mapRect(250, -2150, 675, 50); //3-2 right ledge
        spawn.mapRect(-925, -2300, 100, 300); //3-2 left wall
        spawn.mapRect(-600, -2700, 1525, 150); //3-2 ceiling
        spawn.mapRect(1075, -2150, 250, 150); //next to upper portal
        // level.fill.push({
        //     x: -1730,
        //     y: -2300,
        //     width: 870,
        //     height: 1600,
        //     color: "rgba(0,0,0,0.03)"
        // });

        //section 4: upper right portals
        spawn.mapRect(1475, -2700, 150, 700); //4-1 left wall
        spawn.mapRect(1775, -1650, 250, 150); //4-1 floor-ish
        spawn.mapRect(1575, -1505, 450, 555); //below upper right portal
        spawn.mapRect(1800, -2250, 400, 50); //4-1 platform 2
        spawn.bodyRect(2200, -2250, 15, 300);
        spawn.mapRect(2200, -1950, 400, 50); //4-1 platform 1
        //spawn.bodyRect(2575, -2600, 25, 650);
        spawn.mapRect(2600, -1650, 400, 50); //4-1 platform 0
        spawn.mapRect(2200, -1350, 400, 50); //4-1 platform -1
        spawn.bodyRect(2200, -1900, 15, 550);
        spawn.bodyRect(2585, -1650, 15, 300);

        spawn.mapRect(1800, -4200, 800, 1600); //4-2 right wall
        spawn.mapRect(800, -4200, 1800, -500); //4-2 ceiling
        spawn.mapRect(1075, -3400, 225, 850); //upper shute right wall
        spawn.mapRect(800, -3400, 125, 850); //upper shute left wall

        //section 5: after portals (gone through main portals 3 times)
        spawn.mapRect(-700, -2700, 100, 450); //5-1 right wall
        spawn.mapRect(-1450, -2700, 900, 50); //5-1 ceiling
        spawn.mapRect(-925, -2300, 325, 50); //5-1 right floor
        spawn.mapRect(-1900, -3000, 450, 50); //stair cover
        spawn.bodyRect(-1150, -2950, 150, 250); //5-2 block

        //top left corner stuff    
        spawn.mapRect(-1900, -2450, 250, 450); //
        //exit room
        spawn.mapRect(350, -3000, 50, 100); //exit room left wall
        spawn.mapRect(350, -3000, 450, -1700); //exit room ceiling
        spawn.bodyRect(350, -2900, 50, 50.5); //door
        spawn.bodyRect(350, -2850, 50, 50.5); //door
        spawn.bodyRect(350, -2800, 50, 50.5); //door
        spawn.bodyRect(350, -2750, 50, 50.5); //door

        spawn.debris(-400, 450, 400, 5); //16 debris per level
        spawn.debris(-1650, -2300, 250, 4); //16 debris per level
        spawn.debris(-750, -650, 750, 3); //16 debris per level

        //mobs
        spawn.randomMob(-650, -100, 0.7); //1-2 left
        spawn.randomMob(100, -150, 0.3); //1-2 right
        spawn.randomMob(-100, -400, 0); //1-3 right
        //spawn.randomMob(-1500, -300, 0.3);   //1-4 platform
        spawn.randomMob(1450, -450, 0); //2-1 right
        spawn.randomMob(1700, -800, 1); //2-1 off the edge. chance is 1 because some enemies just fall
        spawn.randomGroup(-550, -900, -0.3); //2-2 
        spawn.randomMob(-1550, -1800, 0.7); //3-1 upper platform
        //spawn.randomMob(-1225, -1400, 0.3);  //3-1 lower platform
        spawn.randomMob(450, -2350, 0.3); //3-2 right ledge
        //spawn.randomMob(1150, -2250, 0);     //3-2 far right
        spawn.randomGroup(2400, -2300, -0.3); //4-1 floating
        spawn.randomMob(2400, -1450, 0); //4-1 platform -1
        spawn.randomMob(2800, -1800, 0.5); //4-1 platform 0
        spawn.randomMob(-1700, -3200, 0.7); //5-2 left platform
        spawn.randomMob(-550, -2800, 0.3); //5-2 middle
        if (simulation.difficulty > 3) {
            if (Math.random() < 0.5) {
                spawn.randomLevelBoss(450, -1350, ["shooterBoss", "launcherBoss", "laserTargetingBoss", "streamBoss", "shieldingBoss", "pulsarBoss", "laserBoss"]);
            } else {
                spawn.randomLevelBoss(-300, -3200, ["shooterBoss", "launcherBoss", "laserTargetingBoss", "streamBoss", "shieldingBoss", "pulsarBoss", "laserBoss"]);
            }
        }
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        spawn.secondaryBossChance(7725, 2275)
    },
    coliseum() {
        simulation.inGameConsole(`<strong>coliseum</strong> by <span class='color-var'>iNoobBoi</span>`);
        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => { };
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#dcdcde";
        //Level
        level.setPosToSpawn(200, 50);
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

        level.exit.x = 8950;
        level.exit.y = 170;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);

        //Map
        spawn.mapRect(-100, -400, 100, 600);
        spawn.mapRect(-100, 100, 700, 100);
        spawn.mapRect(500, 100, 100, 1700);
        spawn.mapRect(500, 1700, 4000, 100);
        spawn.mapRect(4100, 600, 400, 100);
        spawn.mapRect(4400, 600, 100, 1600);
        spawn.mapRect(4400, 2100, 4300, 100);
        spawn.mapRect(8600, 200, 100, 2000);
        spawn.mapRect(8600, 200, 700, 100);
        spawn.mapRect(9200, -300, 100, 600);
        spawn.mapRect(8600, -300, 700, 100);
        spawn.mapRect(8600, -700, 100, 500);
        spawn.mapRect(4400, -700, 4300, 100);
        spawn.mapRect(4400, -700, 100, 900);
        spawn.mapRect(-100, -400, 4600, 100);

        //Platforms
        spawn.mapRect(1100, 400, 300, 100);
        spawn.mapRect(500, 500, 300, 100);
        spawn.mapRect(1050, 800, 300, 100);
        spawn.mapRect(1770, 1050, 300, 100);
        spawn.mapRect(1800, 500, 300, 100);
        spawn.mapRect(2550, 900, 300, 100);
        spawn.mapRect(2800, 1400, 300, 100);
        spawn.mapRect(1250, 1350, 300, 100);
        spawn.mapRect(4750, 850, 300, 100);
        spawn.mapRect(3200, 1050, 300, 100);
        spawn.mapRect(4700, 100, 300, 100);
        spawn.mapRect(5350, 0, 300, 100);
        spawn.mapRect(3800, 900, 300, 100);
        spawn.mapRect(5100, 500, 300, 100);
        spawn.mapRect(5900, -300, 300, 100);
        spawn.mapRect(6500, -700, 300, 1300);
        spawn.mapRect(7900, 0, 300, 100);
        spawn.mapRect(8050, 800, 300, 100);
        spawn.mapRect(7800, 1900, 300, 100);
        spawn.mapRect(8300, 450, 300, 100);
        spawn.mapRect(8400, 1200, 300, 100);
        spawn.mapRect(7570, 1100, 300, 100);
        spawn.mapRect(6700, 1850, 300, 100);
        spawn.mapRect(8000, 1500, 300, 100);
        spawn.mapRect(7120, -100, 300, 100);
        spawn.mapRect(7000, 1500, 300, 100);
        spawn.mapRect(6500, 1000, 300, 1200);
        spawn.mapRect(5800, 1100, 300, 100);
        spawn.mapRect(5900, 1700, 300, 100);
        spawn.mapRect(5300, 1400, 300, 100);
        spawn.mapRect(5200, 1100, 300, 100);
        spawn.mapRect(6700, 1100, 300, 100);
        spawn.mapRect(4800, 1650, 300, 100);

        //Room 1 Spawning
        spawn.randomMob(1000, 700, 0.7);
        spawn.randomGroup(1100, 700, 0.5);
        spawn.randomMob(1900, 400, 0.7);
        spawn.randomGroup(2000, 400, 0.4);
        spawn.randomGroup(1800, 1100, 0.4);
        spawn.randomGroup(2700, 700, 0.5);
        spawn.randomMob(2900, 1200, 0.7);
        spawn.randomSmallMob(3200, 300, 0.9);
        spawn.randomSmallMob(3700, 800, 0.9);
        spawn.randomMob(1100, 700, 0.6);
        spawn.randomGroup(1200, 700, 0.5);
        spawn.randomMob(2000, 400, 0.8);
        spawn.randomGroup(2100, 400, 0.5);
        spawn.randomGroup(1900, 1100, 0.5);
        spawn.randomGroup(2800, 700, 0.5);
        spawn.randomMob(3000, 1200, 0.7);
        spawn.randomSmallMob(3200, 300, 0.9);
        spawn.randomSmallMob(3700, 800, 0.9);
        spawn.randomMob(800, 1500, 0.9);
        spawn.randomMob(1500, 1500, 0.7);
        spawn.randomMob(2200, 1500, 0.6);
        spawn.randomMob(2500, 1500, 0.7);
        spawn.randomMob(2800, 1500, 0.7);
        spawn.randomMob(3300, 1500, 0.6);

        //Room 2 Spawning
        spawn.randomGroup(4700, 2000, 0.9);
        spawn.randomMob(5000, 2000, 0.5);
        spawn.randomSmallMob(5700, 1500, 0.9);
        spawn.randomMob(8500, 2000, 0.6);
        spawn.randomGroup(8000, 1300, 0.9);
        spawn.randomMob(8300, -300, 0.4);
        spawn.randomSmallMob(7600, -200, 0.9);
        spawn.randomMob(5200, -300, 0.5);
        spawn.randomSmallMob(4700, -200, 0.5);
        spawn.randomGroup(4700, 2000, 0.8);
        spawn.randomMob(5000, 2000, 0.5);
        spawn.randomSmallMob(5700, 1500, 0.9);
        spawn.randomGroup(8500, 2000, 0.3);
        spawn.randomSmallMob(8000, 1300, 0.4);
        spawn.randomMob(8300, -300, 0.3);
        spawn.randomGroup(7600, -200, 0.5);
        spawn.randomMob(5200, -300, 0.3);
        spawn.randomGroup(4700, -200, 0.4);
        spawn.randomGroup(8650, -200, 0.9); //end guards
        spawn.randomMob(8650, -200, 0.9); //end guards


        //Boss Spawning 
        if (simulation.difficulty > 3) {
            spawn.randomLevelBoss(6000, 700, ["pulsarBoss", "laserTargetingBoss", "powerUpBoss", "bomberBoss", "historyBoss", "orbitalBoss"]);
            // if (simulation.difficulty > 10) spawn.shieldingBoss(7200, 500);
            // if (simulation.difficulty > 20) spawn.randomLevelBoss(2000, 300, ["historyBoss", "shooterBoss"]);
        }

        //Blocks
        spawn.bodyRect(550, -300, 50, 400); //spawn door
        spawn.bodyRect(4400, 200, 100, 400); //boss door
        spawn.bodyRect(6600, 600, 50, 400); //boss 2 door
        spawn.debris(400, 800, 400, 2);
        spawn.debris(3800, 1600, 1200, 6);
        spawn.debris(7500, 2000, 800, 4);
        spawn.debris(5500, 2000, 800, 4);

        //Powerups
        powerUps.spawnStartingPowerUps(1250, 1500);
        // powerUps.spawnStartingPowerUps(1500, 1500);
        powerUps.spawn(8650, -200, "ammo");
        // powerUps.spawn(8650, -200, "ammo");
        // powerUps.spawn(8650, -200, "ammo");
        // powerUps.spawn(8650, -200, "ammo");
        powerUps.spawn(200, 50, "heal");
        // powerUps.spawn(200, 50, "ammo");
        // powerUps.spawn(200, 50, "ammo");
        // powerUps.spawn(200, 50, "ammo");

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        spawn.secondaryBossChance(6600, 600)
    },
    crossfire() {
        simulation.inGameConsole(`<strong>crossfire</strong> by <span class='color-var'>iNoobBoi</span>`);

        //*1.5
        //Level Setup
        const slimePitOne = level.hazard(0, 850, 3800, 120);
        const slimePitTwo = level.hazard(4600, 430, 2000, 120);
        const slimePitThree = level.hazard(6500, 200, 1000, 170);

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => {
            slimePitOne.query();
            slimePitTwo.query();
            slimePitThree.query();
        };

        level.setPosToSpawn(-500, 550); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

        level.exit.x = 10300;
        level.exit.y = -830;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);

        level.defaultZoom = 3000
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#dcdcde";

        //Map Elements
        spawn.mapRect(-800, -600, 800, 200);
        spawn.mapRect(-200, -600, 200, 800);
        spawn.mapRect(-800, -600, 200, 800);
        spawn.mapRect(-1000, 0, 1000, 200);
        spawn.mapRect(-1000, 0, 200, 800);
        spawn.mapRect(-1000, 600, 1400, 200);
        spawn.mapRect(0, 600, 200, 400);
        spawn.mapRect(0, 950, 4000, 100);
        spawn.mapRect(800, 800, 600, 200);
        spawn.mapRect(1700, 700, 500, 300);
        spawn.mapRect(2500, 600, 400, 400);
        spawn.mapRect(3200, 600, 1200, 200);
        spawn.mapRect(3800, 600, 200, 800); //
        spawn.mapRect(3800, 1200, 800, 200);
        spawn.mapRect(4400, 400, 300, 1000);
        spawn.mapRect(4400, 500, 2000, 100);
        spawn.mapRect(6500, 300, 1000, 100);
        spawn.mapRect(5000, 200, 700, 400);
        spawn.mapRect(6000, 0, 650, 600);
        spawn.mapRect(6900, -300, 700, 100);
        spawn.mapRect(7400, -600, 200, 1100);
        spawn.mapRect(7400, 300, 2600, 200);
        spawn.mapRect(9800, -800, 200, 1300);
        spawn.mapRect(9800, -800, 1000, 200);
        spawn.mapRect(10600, -1400, 200, 800);
        spawn.mapRect(9800, -1400, 200, 400);
        spawn.mapRect(7400, -1400, 3400, 200);
        spawn.mapRect(7400, -1600, 200, 800);
        spawn.mapRect(5400, -1600, 2200, 200);
        spawn.mapRect(6000, -1600, 200, 800);
        spawn.mapRect(5400, -1600, 200, 800);
        spawn.mapRect(4800, -1000, 1400, 200);
        spawn.mapRect(4800, -1000, 200, 600);
        spawn.mapRect(3800, -600, 1200, 200);
        spawn.mapRect(3200, -800, 800, 200);
        spawn.mapRect(3200, -800, 200, 800);
        spawn.mapRect(3800, -800, 200, 800);
        spawn.mapRect(-200, -200, 4200, 200);

        //Boss Room Platforms
        spawn.mapRect(7700, 100, 300, 40);
        spawn.mapRect(8600, 0, 300, 40);
        spawn.mapRect(9200, 100, 300, 40);
        spawn.mapRect(9400, -200, 300, 40);
        spawn.mapRect(8000, -200, 300, 40);
        spawn.mapRect(8500, -400, 300, 40);
        spawn.mapRect(9000, -600, 300, 40);
        spawn.mapRect(9400, -800, 300, 40);
        spawn.mapRect(8600, -1000, 300, 40);
        spawn.mapRect(7900, -800, 300, 40);

        //Mob Spawning
        spawn.randomMob(200, 400, 0.7);
        // spawn.randomMob(1200, 400, 0.7);
        spawn.randomMob(2000, 400, 0.7);
        // spawn.randomMob(3000, 400, 0.7);
        spawn.randomMob(5000, 0, 0.7);
        spawn.randomMob(5600, 0, 0.7);
        spawn.randomMob(6200, -200, 0.7);
        // spawn.randomMob(6600, -200, 0.7);
        spawn.randomMob(7200, -800, 0.7);
        spawn.randomSmallMob(800, 400, 0.9);
        spawn.randomSmallMob(1800, 400, 0.9);
        // spawn.randomSmallMob(2600, 400, 0.9);
        spawn.randomSmallMob(5200, 0, 0.9);
        // spawn.randomSmallMob(5400, 0, 0.9);
        spawn.randomSmallMob(6400, -200, 0.9);
        spawn.randomGroup(3800, 400, 0.5);
        spawn.randomGroup(4200, 400, 0.5);
        // spawn.randomGroup(4400, 200, 0.5);
        spawn.randomGroup(7000, -800, 0.5);
        // spawn.randomGroup(7700, 300, 0.5);
        spawn.randomGroup(9800, 300, 0.5);
        // spawn.randomGroup(7700, -1100, 0.5);
        spawn.randomGroup(9800, -1100, 0.5);

        if (simulation.difficulty > 3) spawn.randomLevelBoss(8600, -600, ["powerUpBoss", "bomberBoss", "dragonFlyBoss", "spiderBoss", "historyBoss"])
        spawn.secondaryBossChance(7900, -400)

        //Boss Spawning
        if (simulation.difficulty > 10) {
            spawn.pulsarBoss(3600, -400);
            powerUps.chooseRandomPowerUp(4006, 400);
            powerUps.chooseRandomPowerUp(4407, 400);
            powerUps.spawnStartingPowerUps(4400, 400);
            if (simulation.difficulty > 30) {
                powerUps.chooseRandomPowerUp(4002, 400);
                powerUps.chooseRandomPowerUp(4004, 400);
                spawn.pulsarBoss(4200, 1000);
                if (simulation.difficulty > 60) {
                    powerUps.chooseRandomPowerUp(4409, 400);
                    spawn.pulsarBoss(5800, -1200);
                    if (simulation.difficulty > 80) {
                        spawn.pulsarBoss(-400, -200);
                        if (simulation.difficulty > 100) {
                            spawn.pulsarBoss(3600, -400);
                            if (simulation.difficulty > 120) {
                                spawn.pulsarBoss(-400, -200);
                            }
                        }
                    }
                }
            }
        }

        //Powerup Spawning
        powerUps.spawnStartingPowerUps(4000, 400);
        powerUps.addResearchToLevel(); //needs to run after mobs are spawned

        //Block Spawning
        // spawn.bodyRect(-100, 200, 100, 400); //spawn door
        spawn.bodyRect(7450, -800, 25, 200); //boss room door
        spawn.bodyRect(9850, -1000, 25, 200); //end door
        spawn.mapRect(-200, 350, 200, 450);

        // spawn.mapRect(3875, -75, 50, 575);
        spawn.mapRect(3800, -75, 200, 525);
        spawn.mapRect(3875, 590, 50, 150);
        spawn.mapRect(3875, 350, 50, 140);

        const debrisCount = 3
        spawn.debris(1050, 700, 400, debrisCount);
        spawn.debris(1900, 600, 400, debrisCount);
        spawn.debris(2700, 500, 400, debrisCount);
        // spawn.debris(3500, 450, 400, debrisCount);
        spawn.debris(4150, 500, 400, debrisCount);
        spawn.debris(5300, 0, 400, debrisCount);
        spawn.debris(6300, -100, 400, debrisCount);
        spawn.debris(7200, -500, 400, debrisCount);
        spawn.debris(8000, -600, 400, debrisCount);
        spawn.debris(8700, -700, 400, debrisCount);
        spawn.debris(9300, -900, 400, debrisCount);
    },
    vats() { // Made by Dablux#6610 on Discord
        simulation.inGameConsole(`<strong>vats</strong> by <span class='color-var'>Dablux</span>`);
        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)
        level.setPosToSpawn(4400, -1060)
        spawn.mapRect(level.enter.x, level.enter.y + 30, 100, 20)
        level.exit.x = 3900;
        level.exit.y = 1060;
        spawn.mapRect(level.exit.x, level.exit.y + 30, 100, 20)
        document.body.style.backgroundColor = "#dcdcde";

        var nextBlockSpawn = simulation.cycle + Math.floor(Math.random() * 60 + 30)
        const door = level.door(475, 900, 50, 200, 201)
        const exitDoor = level.door(3375, 900, 50, 200, 201)
        const deliveryButton = level.button(3500, -410)
        const buttonGreen = level.button(-1600, 1090)
        const buttonYellow = level.button(-1600, -1160)
        const buttonRed = level.button(5874, -2410)
        let g = false;
        let y = false;
        let r = false;
        const deliverySlime = level.hazard(3700, -940, 100, 480)
        const deliverySlime2 = level.hazard(3700, -461, 100, 1141)
        const slimePit = level.hazard(700, 1200, 2500, 1300, 0.004)
        const topSlime = level.hazard(800, -460, 2900, 90, 0.004)
        // const rotor = level.rotor(0, -725, 0.001)
        const rotor = level.rotor(-400, -725, 800, 50, 0.001, 0, 0.01, 0, 0.001)


        const portal = level.portal({
            x: -135,
            y: 800
        }, Math.PI / 2, {
            x: 570,
            y: -395
        }, -Math.PI / 2)
        const portal2 = level.portal({
            x: -1800,
            y: 1900
        }, Math.PI, {
            x: 200,
            y: 1105
        }, -Math.PI / 2)
        const drip1 = level.drip(1875, -660, -400, 70)
        const drip2 = level.drip(3525, -940, -400, 150)
        const drip3 = level.drip(1975, 100, 1200, 100)
        door.isClosing = true;
        exitDoor.isClosing = true;

        // UPPER AREA //
        spawn.mapRect(4500, -2400, 1700, 2050)
        spawn.mapRect(3800, -1000, 700, 650)
        spawn.mapRect(4000, -1310, 50, 60)
        spawn.mapRect(4450, -1310, 50, 60)
        spawn.mapRect(4000, -1320, 500, 20)
        level.chain(4025, -1225, 0.5 * Math.PI, false, 5, 25)
        spawn.mapRect(3650, -460, 50, 90)
        spawn.mapRect(3525, -1000, 325, 20)
        spawn.mapRect(3650, -1000, 50, 440)
        spawn.mapRect(3300, -1000, 50, 450)
        spawn.mapRect(3325, -725, 150, 25)
        spawn.mapRect(3500, -980, 175, 35)
        spawn.mapRect(3325, -980, 50, 35)
        spawn.mapRect(-1800, -1250, 50, 120)
        spawn.mapRect(6150, -2500, 50, 120)
        spawn.bodyRect(3350, -1000, 175, 20, 1, spawn.propsIsNotHoldable) // Cover
        Matter.Body.setMass(body[body.length - 1], 0.7) // Make cover easier to remove
        spawn.mapRect(750, -475, 50, 75);
        for (let i = 1; i < 5; i++) {
            spawn.mapRect(800 + (i * 100) + (500 * (i - 1)), -460 + (i * -120) + (20 * (i - 1)), 500, 20)
        }

        // ARENA //
        spawn.mapRect(400, -400, 2950, 500)
        spawn.mapRect(-1800, -1150, 1800, 1950)
        spawn.mapRect(-1800, 1100, 780, 1800)
        spawn.mapRect(-300, 1100, 1000, 1800)
        //spawn.mapRect(-1800, -1450, 100, 2000)
        spawn.blockDoor(-1800, 1070)
        level.chain(-1000, 1120, 0, true, 18, 20)
        spawn.mapRect(700, 2500, 2500, 900)
        spawn.mapRect(400, 100, 200, 599)
        spawn.mapRect(400, 650, 75, 250)
        spawn.mapRect(525, 650, 75, 250)
        spawn.mapRect(3300, 650, 75, 250)
        spawn.mapRect(3425, 650, 75, 250)
        spawn.mapRect(3200, 1100, 1800, 2200)
        spawn.mapRect(3300, -400, 200, 1099) // STOP CHANGING THIS ONE!!!! 
        spawn.mapRect(3450, -400, 250, 1100)
        spawn.mapRect(3650, 680, 200, 20)
        spawn.mapRect(3800, -400, 1400, 1100)
        spawn.mapRect(4100, 700, 100, 300)
        spawn.mapRect(4900, -400, 1300, 2500)
        spawn.bodyRect(4100, 1000, 100, 100)

        spawn.bodyRect(-2100, 2050, 290, 30) //Portal platform
        let b = body[body.length - 1];
        b.isNotHoldable = true
        cons[cons.length] = Constraint.create({
            pointA: {
                x: -1820,
                y: 2065
            },
            bodyB: b,
            pointB: {
                x: -135,
                y: 0
            },
            stiffness: 1,
            length: 1
        });
        cons[cons.length] = Constraint.create({
            pointA: {
                x: -1800,
                y: 1400
            },
            bodyB: b,
            pointB: {
                x: 135,
                y: 0
            },
            stiffness: 0.005,
            length: 700
        });
        Composite.add(engine.world, [cons[cons.length - 2], cons[cons.length - 1]]);

        spawn.bodyRect(5225, -2525, 300, 75);
        spawn.bodyRect(4700, -2525, 100, 75, 0.5);
        spawn.bodyRect(4900, -2600, 50, 50, 0.4);
        spawn.bodyRect(5050, -2475, 500, 100, 0.4);
        spawn.bodyRect(2950, -950, 175, 75, 0.5);
        spawn.bodyRect(3050, -1000, 75, 50, 0.3);
        spawn.bodyRect(2300, -850, 75, 50, 0.7);
        spawn.bodyRect(2150, -575, 100, 175, 0.6);
        spawn.bodyRect(2500, -550, 400, 150, 0.2);
        spawn.bodyRect(1525, -500, 225, 100, 0.2);
        spawn.bodyRect(1625, -575, 100, 75);
        spawn.bodyRect(1000, -475, 100, 100, 0.8);
        spawn.bodyRect(1225, -450, 125, 50, 0.9);
        spawn.bodyRect(525, -500, 175, 125, 0.75);
        spawn.bodyRect(575, -600, 100, 75, 0.5);
        spawn.bodyRect(-925, -1225, 275, 75, 0.4);
        spawn.bodyRect(-1125, -1300, 200, 150, 0.7);
        spawn.bodyRect(-475, -1250, 200, 100, 0.8);
        spawn.bodyRect(-425, -1300, 100, 50, 0.75);
        spawn.bodyRect(-1225, -1200, 100, 25, 0.45);
        spawn.bodyRect(-1025, -1350, 75, 50, 0.5);
        spawn.bodyRect(-450, 1025, 75, 50, 0.5);
        spawn.bodyRect(-775, 1050, 50, 50, 0.6);
        spawn.bodyRect(-650, 975, 75, 75, 0.2);
        spawn.bodyRect(-475, 1025, 100, 50, 0.7);
        spawn.bodyRect(-450, 1025, 75, 50, 0.6);
        spawn.bodyRect(-800, 1050, 100, 50, 0.5);
        spawn.bodyRect(-600, 950, 75, 75, 0.3);
        spawn.bodyRect(-500, 1000, 75, 25, 0.2);
        spawn.bodyRect(-900, 1025, 150, 50);
        spawn.bodyRect(-1350, 1000, 100, 100, 0.4);
        spawn.bodyRect(-1225, 1075, 100, 25);
        spawn.debris(900, -1000, 2000, 16);

        // MOBS //
        spawn.randomSmallMob(2900, -1000)
        spawn.randomSmallMob(1750, -700)
        spawn.randomMob(4250, -1400)
        spawn.randomMob(4800, -2400, 0.3)
        spawn.randomMob(1000, 600, 0.3)
        spawn.randomMob(1650, 950, 0.2)
        spawn.randomMob(1300, -1250, 0)
        spawn.randomMob(-600, -1250, 0.1)
        spawn.randomMob(1000, -600, 0.4)
        spawn.randomMob(1800, -700, 0.4)
        spawn.randomMob(2200, 950, 0.2)
        spawn.randomMob(-1900, 1400, 0.3)
        spawn.randomMob(-750, -1000, 0.3)
        spawn.randomMob(3250, 1000, 0.1)
        spawn.randomMob(2000, -2800, 0.4)
        spawn.randomMob(2200, -500, 0)
        spawn.randomMob(1800, -450, 0.3)
        spawn.randomGroup(2300, -450, 1)
        spawn.randomGroup(3000, -450, 0.3)
        spawn.randomGroup(6000, -2700, 0)
        spawn.randomGroup(-1200, -1300, -0.3)
        powerUps.addResearchToLevel()

        if (simulation.difficulty > 3) {
            spawn.randomLevelBoss(1900, 400, ["shieldingBoss", "shooterBoss", "launcherBoss", "streamBoss"])
        } else {
            exitDoor.isClosing = false;
        }
        spawn.secondaryBossChance(800, -800)

        powerUps.spawn(4450, 1050, "heal");
        if (Math.random() > (0.2 + (simulation.difficulty / 60))) {
            powerUps.spawn(4500, 1050, "ammo");
            powerUps.spawn(4550, 1050, "ammo");
        } else {
            powerUps.spawn(4500, 1050, "tech");
            spawn.randomMob(4550, 1050, Infinity);
        }
        powerUps.spawnStartingPowerUps(3750, -940)

        const W = 500;
        const H = 20;
        for (let i = 1; i < 5; i++) {
            spawn.bodyRect(700 + (i * 100) + (W * (i - 1)), 1110, W, H, 1, spawn.propsIsNotHoldable)
            let b = body[body.length - 1];
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: b.position.x - (W / 2) + 50,
                    y: b.position.y - 1025
                },
                bodyB: b,
                pointB: {
                    x: -(W / 2) + 50,
                    y: 0
                },
                stiffness: 0.002,
                length: 1000
            });
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: b.position.x + (W / 2) - 50,
                    y: b.position.y - 1025
                },
                bodyB: b,
                pointB: {
                    x: (W / 2) - 50,
                    y: 0
                },
                stiffness: 0.002,
                length: 1000
            });
            Composite.add(engine.world, [cons[cons.length - 1], cons[cons.length - 2]])
        }
        const boost1 = level.boost(4400, -1385, 1200)

        level.custom = () => {
            boost1.query();
            buttonGreen.query()
            buttonYellow.query()
            buttonRed.query()

            if (!buttonGreen.isUp) {
                if (!g) {
                    Matter.Composite.remove(engine.world, cons[1])
                    cons.splice(1, 2)
                }
                g = true;
            }
            if (!buttonYellow.isUp) {
                y = true;
            }
            if (!buttonRed.isUp) {
                r = true;
            }

            if (g && y && r) {
                door.isClosing = false;
            } else {
                door.isClosing = true;
            }

            door.openClose()
            exitDoor.openClose()

            if (m.pos.y > 1600 && 700 < m.pos.x && m.pos.x < 3200) { // Saving player from slime pit
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 200,
                    y: 1000
                });
                // move bots
                for (let i = 0; i < bullet.length; i++) {
                    if (bullet[i].botType) {
                        Matter.Body.setPosition(bullet[i], Vector.add(player.position, {
                            x: 250 * (Math.random() - 0.5),
                            y: 250 * (Math.random() - 0.5)
                        }));
                        Matter.Body.setVelocity(bullet[i], {
                            x: 0,
                            y: 0
                        });
                    }
                }
                m.takeDamage(0.1 * simulation.difficultyMode)
                m.energy -= 0.1 * simulation.difficultyMode
            }

            if (simulation.cycle >= nextBlockSpawn && body.length < 100) {
                var len = body.length;
                body[len] = Matter.Bodies.polygon(Math.floor(Math.random() * 1700) + 1050, 100, Math.floor(Math.random() * 11) + 10, Math.floor(Math.random() * 20) + 15)
                body[len].collisionFilter.category = cat.body;
                body[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet;
                Composite.add(engine.world, body[len])
                nextBlockSpawn = simulation.cycle + Math.floor(Math.random() * 60 + 30)
            }

            if (exitDoor.isClosing) {
                exitDoor.isClosing = false;
                for (i = 0; i < mob.length; i++) {
                    if (mob[i].isBoss && 525 < mob[i].position.x < 3200 && -2500 < mob[i].position.y < 100) {
                        exitDoor.isClosing = true;
                    }
                }
            }

            for (let i = 0, len = body.length; i < len; i++) {
                if (body[i].position.x > 700 && body[i].position.x < 3200 && body[i].position.y > 1200 && !body[i].isNotHoldable) {
                    Matter.Body.scale(body[i], 0.99, 0.99);
                    if (body[i].velocity.y > 3) body[i].force.y -= 0.96 * body[i].mass * simulation.g
                    const slowY = (body[i].velocity.y > 0) ? Math.max(0.3, 1 - 0.0015 * body[i].velocity.y * body[i].velocity.y) : Math.max(0.98, 1 - 0.001 * Math.abs(body[i].velocity.y)) //down : up
                    Matter.Body.setVelocity(body[i], {
                        x: Math.max(0.6, 1 - 0.07 * Math.abs(body[i].velocity.x)) * body[i].velocity.x,
                        y: slowY * body[i].velocity.y
                    });
                    if (body[i].mass < 0.05) {
                        Matter.Composite.remove(engine.world, body[i])
                        body.splice(i, 1)
                        break
                    }
                }
            }

            for (let i = 0, len = mob.length; i < len; ++i) {
                if (mob[i].position.x > 700 && mob[i].position.x < 3200 && mob[i].alive && !mob[i].isShielded && mob[i].position.y > 1200) {
                    mobs.statusDoT(mob[i], 0.005, 30)
                }
            }

            ctx.beginPath()
            ctx.fillStyle = "#666";
            ctx.arc(buttonGreen.min.x - 50, buttonGreen.min.y - 70, 20, 0, 2 * Math.PI)
            ctx.fillRect(buttonGreen.min.x - 55, buttonGreen.max.y + 25, 10, -95)
            ctx.fill()
            ctx.beginPath()
            ctx.arc(buttonYellow.min.x - 50, buttonYellow.min.y - 70, 20, 0, 2 * Math.PI)
            ctx.fillRect(buttonYellow.min.x - 55, buttonYellow.max.y + 25, 10, -95)
            ctx.fill()
            ctx.beginPath()
            ctx.arc(buttonRed.min.x - 50, buttonRed.min.y - 70, 20, 0, 2 * Math.PI)
            ctx.fillRect(buttonRed.min.x - 55, buttonRed.max.y + 25, 10, -95)
            ctx.fill()

            ctx.beginPath()
            ctx.arc(buttonGreen.min.x - 50, buttonGreen.min.y - 70, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (g ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()
            ctx.beginPath()
            ctx.arc(buttonYellow.min.x - 50, buttonYellow.min.y - 70, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (y ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()
            ctx.beginPath()
            ctx.arc(buttonRed.min.x - 50, buttonRed.min.y - 70, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (r ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()

            slimePit.query();
            ctx.shadowColor = 'hsla(160, 100%, 50%, 1)'
            ctx.shadowBlur = 100;
            // slimePit.draw()
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'rgba(0, 0, 0, 0)'

            deliveryButton.query()
            portal[2].query()
            //portal[3].query()
            portal2[2].query()
            //portal2[3].query()

            deliverySlime.level(deliveryButton.isUp)
            topSlime.level(!r)
            rotor.rotate()

            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(3500, 675, 600, 450)
            level.enter.draw()
            level.exit.drawAndCheck()
        }

        level.customTopLayer = () => {
            topSlime.query();
            deliverySlime.query()
            deliverySlime2.query()
            drip1.draw()
            drip2.draw()
            drip3.draw()

            ctx.fillStyle = `rgba(68, 68, 68, ${Math.max(0.3, Math.min((4200 - m.pos.x) / 100, 0.99))})`
            ctx.fillRect(4100, 650, 850, 500)

            ctx.fillStyle = "rgba(0,20,40,0.1)"
            ctx.fillRect(4025, -1300, 475, 300)
            ctx.fillRect(3325, -1000, 375, 600)
            ctx.fillRect(425, 100, 3050, 2400)
            ctx.fillRect(-1775, 800, 1750, 2100)
            ctx.fillStyle = "rgba(0,20,40,0.2)"
            ctx.fillRect(2725, -860, 450, 460)
            ctx.fillRect(2125, -760, 450, 360)
            ctx.fillRect(1525, -660, 450, 260)
            ctx.fillRect(925, -560, 450, 160)
            ctx.fillRect(3700, -980, 100, 1200)

            ctx.fillStyle = `#444`;
            ctx.fillRect(465, 690, 70, 209)
            ctx.fillRect(3365, 690, 70, 209)

            ctx.beginPath()
            ctx.arc(500, 870, 20, 0, 2 * Math.PI)
            ctx.arc(500, 820, 20, 0, 2 * Math.PI)
            ctx.arc(500, 770, 20, 0, 2 * Math.PI)
            ctx.fillStyle = "rgba(0, 0, 0, 0.3";
            ctx.fill()

            ctx.beginPath()
            ctx.arc(500, 870, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (g ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()
            ctx.beginPath()
            ctx.arc(500, 820, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (y ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()
            ctx.beginPath()
            ctx.arc(500, 770, 10, 0, 2 * Math.PI)
            ctx.fillStyle = (r ? `rgba(0, 255, 0, 0.9)` : `rgba(255, 0, 0, 0.9)`);
            ctx.fill()

            deliveryButton.draw()
            // deliverySlime.draw()
            // deliverySlime2.draw()
            // topSlime.draw()
            buttonGreen.draw()
            buttonYellow.draw()
            buttonRed.draw()
            portal[0].draw()
            portal[2].draw()
            portal2[0].draw()
            portal2[2].draw()
        }
    },
    ngon() { //make by Oranger
        simulation.inGameConsole(`<strong>"ngon"</strong> by <span class='color-var'>Oranger</span>`);

        document.body.style.backgroundColor = "#dcdcde";
        let needGravity = [];
        let s = { //mech statue
            x: -200,
            y: -2350,
            angle: 0,
            scale: 15,
            h: { //hip
                x: 12,
                y: 24
            },
            k: { //knee
                x: -30.96, //-17.38
                y: 58.34, //70.49
                //x2: -33.96, //x - 3
                //y2: 58.34 //same as y
            },
            f: { //foot
                x: 0,
                y: 91 //112
            },
            fillColor: "#ccc", //white
            fillColorDark: "#bbb", //25% from white
            lineColor: "#999", //#333
            lineColorLight: "#aaa" //#4a4a4a
        }
        const boost1 = level.boost(2550, 1500, 1700)
        const boost2 = level.boost(-3400, -2050, 2100)

        level.custom = () => {
            boost1.query();
            boost2.query();

            level.exit.drawAndCheck();

            level.enter.draw();
            for (let i = 0; i < needGravity.length; i++) {
                needGravity[i].force.y += needGravity[i].mass * simulation.g;
            }
            ctx.fillStyle = "#444" //light fixtures
            ctx.fillRect(2350, 995, 40, 10)
            //ctx.fillRect(2280, -6005, 40, 10)

            //statue
            ctx.save();
            ctx.translate(s.x, s.y);
            //statueLeg is at the bottom, below the enemies but above the NGON function
            statueLeg(-3, s.lineColorLight);
            statueLeg(0, s.lineColor);
            //head
            ctx.rotate(s.angle);
            ctx.beginPath();
            ctx.arc(0, 0, 30 * s.scale, 0, 2 * Math.PI);
            let grd = ctx.createLinearGradient(-30 * s.scale, 0, 30 * s.scale, 0);
            grd.addColorStop(0, s.fillColorDark);
            grd.addColorStop(1, s.fillColor);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.arc(15 * s.scale, 0, 4 * s.scale, 0, 2 * Math.PI);
            ctx.strokeStyle = s.lineColor;
            ctx.lineWidth = 2 * s.scale;
            ctx.stroke();
            ctx.restore();
        };

        level.customTopLayer = () => {
            //boost chute for lack of a better name
            ctx.fillStyle = "rgba(60,60,60,0.9)";
            ctx.fillRect(-3451, -4000, 202, 1500);
            ctx.fillRect(2499, -170, 202, 1170);

            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath(); //basement
            ctx.moveTo(2360, 1000);
            ctx.lineTo(2120, 900);
            ctx.lineTo(1500, 900);
            ctx.lineTo(1500, 1500);
            ctx.lineTo(3000, 1500);
            ctx.lineTo(3000, 1000);
            ctx.lineTo(2380, 1000);
            ctx.lineTo(2870, 1500);
            ctx.lineTo(1870, 1500);
            ctx.lineTo(2360, 1000);
            ctx.fill();
            // ctx.beginPath(); //exit
            // ctx.moveTo(1600, -6000);
            // ctx.lineTo(1600, -5000);
            // ctx.lineTo(3000, -5000);
            // ctx.lineTo(3000, -6000);
            // ctx.lineTo(2310, -6000);
            // ctx.lineTo(2600, -5000);
            // ctx.lineTo(2000, -5000);
            // ctx.lineTo(2290, -6000);
            // ctx.lineTo(1600, -6000);
            // ctx.fill();

            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fillRect(1600, -1000, 1400, 830);
            ctx.fillRect(1600, -170, 520, 170);
            ctx.fillRect(-1300, -200, 2200, 200); //statue base
            ctx.fillRect(-800, -400, 1200, 200);
            ctx.fillRect(-500, -700, 600, 300);
            //ctx.fillRect(-4000, -6000, 2000, 1000); //left side
            ctx.fillRect(-4000, -2500, 2000, 2500);
        };

        level.setPosToSpawn(1810, 1450);
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 2700;
        level.exit.y = -4030;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 3500
        simulation.zoomTransition(level.defaultZoom)

        // powerUps.spawnStartingPowerUps(1475, -1175);
        spawn.debris(2750, 1500, 200, 4); //16 debris per level
        spawn.debris(1770, -350, 120, 4); //16 debris per level
        spawn.debris(-3200, 0, 1000, 6); //16 debris per level

        //boundaries
        spawn.mapRect(-4100, 1500, 7200, 100); //base floor
        spawn.mapRect(3000, -4000, 100, 5600); //right barrier
        spawn.mapRect(-4100, -4000, 100, 5600); //left barrier
        //spawn.mapRect(1600, -10000, 1500, 4000); //upper right wall
        //spawn.mapRect(-4100, -10000, 2100, 4000); //upper left wall
        spawn.mapRect(1600, -4000, 1500, 3000); //right wall
        spawn.mapRect(-4100, 0, 5600, 1550); //floor

        //starting room  
        spawn.mapRect(1500, 0, 700, 900);
        spawn.mapRect(2120, -170, 380, 1170);
        spawn.mapRect(2700, -170, 400, 1170);
        //spawn.mapVertex(2296, 400, "0 0 0 1200 300 1200 400 0");
        //spawn.mapVertex(2904, 400, "0 0 0 1200 -300 1200 -400 0");

        //left area
        spawn.mapRect(-3500, -300, 300, 400); //floor 1
        spawn.mapRect(-3900, -600, 300, 100);
        spawn.mapRect(-3500, -900, 300, 100);
        spawn.mapRect(-3100, -1150, 1000, 150); //floor 2
        spawn.mapRect(-2200, -2600, 200, 1600);
        spawn.mapRect(-2700, -1450, 300, 100);
        spawn.mapRect(-3100, -1750, 300, 100);
        spawn.mapRect(-3500, -2050, 300, 100);
        spawn.mapRect(-4100, -4000, 650, 1500); //floor 3
        spawn.mapRect(-3250, -4000, 1250, 1500);

        //statue base
        spawn.mapRect(-700, -900, 1000, 200); //top
        //left
        spawn.mapRect(-700, -900, 200, 500);
        spawn.mapRect(-1000, -600, 500, 200);
        spawn.mapRect(-1000, -600, 200, 400);
        spawn.mapRect(-1300, -300, 500, 100);
        //right
        spawn.mapRect(100, -900, 200, 500);
        spawn.mapRect(100, -600, 500, 200);
        spawn.mapRect(400, -600, 200, 400);
        spawn.mapRect(400, -300, 500, 100);

        hangingNGON(-1900, -4000, 1, 1000, 1, false, {
            density: 0.001, //default density is 0.001
            friction: 0.0001,
            frictionAir: 0.001,
            frictionStatic: 0,
            restitution: 0,
            isNotHoldable: true
        });
        hangingNGON(1900, -4600, 0.2, 300, 0.0005, false, {
            density: 0.00005, //default density is 0.001
            friction: 0.0001,
            frictionAir: 0.003,
            frictionStatic: 0,
            restitution: 1,
            isNotHoldable: true
        });

        // // Never gonna give you up
        // spawn.bodyRect(-8000, -10100, 15, 100);
        // // Never gonna let you down
        // spawn.bodyRect(-7915, -10100, 15, 100);
        // // Never gonna run around and desert you
        // body[body.length] = Bodies.polygon(-7950, -10025, 0, 25, { //circle
        //     friction: 0.05,
        //     frictionAir: 0.001
        // });
        // // Never gonna make you cry
        // spawn.bodyRect(6985, -10100, 15, 100);
        // // Never gonna say goodbye
        // spawn.bodyRect(6900, -10100, 15, 100);
        // // Never gonna tell a lie and hurt you
        // body[body.length] = Bodies.polygon(6950, -10025, 0, 25, { //circle
        //     friction: 0.05,
        //     frictionAir: 0.001
        // });

        //pile of blocks
        spawn.bodyRect(1920, -400, 200, 400)
        spawn.bodyRect(1720, -250, 200, 250)
        spawn.bodyRect(1770, -300, 150, 50)
        spawn.bodyRect(2120, -280, 100, 100)
        spawn.bodyRect(1990, -500, 100, 100)

        //doors under statue
        spawn.bodyRect(850, -50, 50, 50)
        spawn.bodyRect(850, -100, 50, 50)
        spawn.bodyRect(850, -150, 50, 50)
        spawn.bodyRect(850, -200, 50, 50)
        spawn.bodyRect(-1300, -50, 50, 50)
        spawn.bodyRect(-1300, -100, 50, 50)
        spawn.bodyRect(-1300, -150, 50, 50)
        spawn.bodyRect(-1300, -200, 50, 50)

        // on the statue base
        spawn.randomMob(700 + Math.random() * 100, -500 + Math.random() * 100, 1);
        spawn.randomMob(400 + Math.random() * 100, -800 + Math.random() * 100, 0.4);
        spawn.randomMob(100 + Math.random() * 100, -1100 + Math.random() * 100, -0.2);
        spawn.randomGroup(-200, -1400, -0.4);
        spawn.randomMob(-600 + Math.random() * 100, -1100 + Math.random() * 100, -0.2);
        spawn.randomMob(-900 + Math.random() * 100, -800 + Math.random() * 100, 0.4);
        spawn.randomMob(-1200 + Math.random() * 100, -500 + Math.random() * 100, 1);

        //in the statue base
        spawn.randomSmallMob(400 + Math.random() * 300, -150 + Math.random() * 100, 0.2);
        spawn.randomSmallMob(-1100 + Math.random() * 300, -150 + Math.random() * 100, 0.2);

        //bottom left
        spawn.randomMob(-2600 + Math.random() * 300, -700 + Math.random() * 300, 0.6);
        spawn.randomSmallMob(-3000 + Math.random() * 300, -400 + Math.random() * 300, 0.2);
        spawn.randomSmallMob(-3000 + Math.random() * 300, -400 + Math.random() * 300, 0);
        spawn.randomMob(-3900 + Math.random() * 100, -200 + Math.random() * 100, 0.6);
        spawn.randomMob(-3400 + Math.random() * 100, -400, 0.4);
        spawn.randomSmallMob(-3800 + Math.random() * 100, -700, -0.4);
        spawn.randomMob(-3400 + Math.random() * 100, -1000, 0.6);
        spawn.randomMob(-3000 + Math.random() * 100, -1850, 0);
        spawn.randomGroup(-2700, -2000, 0.4);

        //top left
        spawn.randomSmallMob(-3800, -5800, -0.2);
        spawn.randomSmallMob(-2400, -5200, 0.2);

        //top right
        spawn.randomGroup(2000, -5700, 0.6);

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
        let bosses = ["shooterBoss", "launcherBoss", "laserTargetingBoss", "streamBoss", "pulsarBoss", "spawnerBossCulture", "laserBoss", "growBossCulture"];
        let abc = Math.random();
        if (simulation.difficulty > 3) {
            if (abc < 0.6) {
                spawn.randomLevelBoss(-1500 + Math.random() * 250, -1100 + Math.random() * 200, bosses);
            } else if (abc < 0.85) {
                spawn.laserBoss(-350 + Math.random() * 300, -600 + Math.random() * 200);
            } else {
                spawn.randomLevelBoss(850 + Math.random() * 250, -1100 + Math.random() * 200, bosses);
            }
        }
        spawn.secondaryBossChance(850 + Math.random() * 250, -1100 + Math.random() * 200)

        //draw leg for statue
        function statueLeg(shift, color) {
            ctx.save();
            ctx.translate(shift, shift);
            //front leg
            let stroke = color;
            ctx.beginPath();
            ctx.moveTo((s.h.x + shift) * s.scale, (s.h.y + shift) * s.scale);
            ctx.lineTo((s.k.x + 2 * shift) * s.scale, (s.k.y + shift) * s.scale);
            ctx.lineTo((s.f.x + shift) * s.scale, (s.f.y + shift) * s.scale);
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 7 * s.scale;
            ctx.stroke();
            //toe lines
            ctx.beginPath();
            ctx.moveTo((s.f.x + shift) * s.scale, (s.f.y + shift) * s.scale);
            ctx.lineTo((s.f.x - 15 + shift) * s.scale, (s.f.y + 5 + shift) * s.scale);
            ctx.moveTo((s.f.x + shift) * s.scale, (s.f.y + shift) * s.scale);
            ctx.lineTo((s.f.x + 15 + shift) * s.scale, (s.f.y + 5 + shift) * s.scale);
            ctx.lineWidth = 4 * s.scale;
            ctx.stroke();
            //hip joint
            ctx.beginPath();
            ctx.arc((s.h.x + shift) * s.scale, (s.h.y + shift) * s.scale, 11 * s.scale, 0, 2 * Math.PI);
            //knee joint
            ctx.moveTo((s.k.x + 7 + 2 * shift) * s.scale, (s.k.y + shift) * s.scale);
            ctx.arc((s.k.x + 2 * shift) * s.scale, (s.k.y + shift) * s.scale, 7 * s.scale, 0, 2 * Math.PI);
            //foot joint
            ctx.moveTo((s.f.x + 6 + shift) * s.scale, (s.f.y + shift) * s.scale);
            ctx.arc((s.f.x + shift) * s.scale, (s.f.y + shift) * s.scale, 6 * s.scale, 0, 2 * Math.PI);
            ctx.fillStyle = s.fillColor;
            ctx.fill();
            ctx.lineWidth = 2 * s.scale;
            ctx.stroke();
            ctx.restore();
        }

        //       | | | | |
        //       n - g o n
        //when s = 1 (scale), it's 3408 long and 800 tall (height of g)
        function hangingNGON(x, y, s, height, stiffness, pin, properties) {
            //makes a compound part of 3 bodyVertex parts
            function compound3Parts(x1, y1, v1, x2, y2, v2, x3, y3, v3, properties) {
                const part1 = Matter.Bodies.fromVertices(x1, y1, Vertices.fromPath(v1), properties);
                const part2 = Matter.Bodies.fromVertices(x2, y2, Vertices.fromPath(v2), properties);
                const part3 = Matter.Bodies.fromVertices(x3, y3, Vertices.fromPath(v3), properties);
                const compoundParts = Body.create({
                    parts: [part1, part2, part3],
                });
                Composite.add(engine.world, [compoundParts]);
                needGravity[needGravity.length] = compoundParts;
                composite[composite.length] = compoundParts;
                body[body.length] = part1;
                body[body.length] = part2;
                body[body.length] = part3;
                setTimeout(function () {
                    compoundParts.collisionFilter.category = cat.body;
                    compoundParts.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map
                }, 1000);
            }

            //for attaching the block to a point
            function addConstraint(x, y, px, py, stiff, body, pin = false) {
                if (pin) {
                    map[map.length] = Bodies.polygon(x, y, 0, 15); //circle above
                }
                cons[cons.length] = Constraint.create({
                    pointA: {
                        x: x,
                        y: y
                    },
                    bodyB: body,
                    pointB: {
                        x: px,
                        y: py
                    },
                    stiffness: stiff
                });
                Composite.add(engine.world, cons[cons.length - 1]);
            }

            //I SINCERELY APOLOGIZE FOR THE ILLEGIBLE BLOCKS OF STRING CONCATENATION
            //s is scale

            //n
            compound3Parts(
                x + 100 * s,
                y + 310 * s,
                ("0 0 " + 200 * s + " 0 " + 200 * s + " " + 620 * s + " 0 " + 620 * s),
                x + 300 * s,
                y + 160 * s,
                (200 * s + " " + 40 * s + " " + 400 * s + " " + 40 * s + " " + 400 * s + " " + 280 * s + " " + 200 * s + " " + 280 * s),
                x + 499 * s,
                y + 333.3 * s,
                (400 * s + " " + 40 * s + " " + 540 * s + " " + 40 * s + " " + 600 * s + " " + 100 * s + " " + 600 * s + " " + 620 * s + " " + 400 * s + " " + 620 * s + " " + 400 * s + " " + 280 * s),
                properties
            );
            addConstraint(x + 300 * s, y - height, 0, -10 * s, stiffness, composite[composite.length - 1], pin);

            //-
            spawn.bodyRect(x + 800 * s, y + 250 * s, 200 * s, 100 * s, 1, properties);
            body[body.length - 1].frictionAir = 0.05 //friction to make jump easier
            addConstraint(x + 900 * s, y - height, 0, -30 * s, stiffness, body[body.length - 1], pin);

            //g
            compound3Parts(
                x + 1400 * s,
                y + 300 * s,
                ("0 0 " + 250 * s + " 0 " + 425 * s + " " + 175 * s + " " + 425 * s + " " + 450 * s + " " + 275 * s + " " + 600 * s + " 0 " + 600 * s + " " + -175 * s + " " + 425 * s + " " + -175 * s + " " + 175 * s),
                x + 1636 * s,
                y + 633 * s,
                (425 * s + " " + 450 * s + " " + 425 * s + " " + 750 * s + " " + 375 * s + " " + 800 * s + " " + 275 * s + " " + 675 * s + " " + 275 * s + " " + 600 * s),
                x + 1398 * s,
                y + 737 * s,
                (375 * s + " " + 800 * s + " " + -75 * s + " " + 800 * s + " " + -75 * s + " " + 675 * s + " " + 275 * s + " " + 675 * s),
                properties
            );
            addConstraint(x + 1500 * s, y - height, 0, -15 * s, stiffness, composite[composite.length - 1], pin);

            //o
            spawn.bodyVertex(
                x + 2300 * s,
                y + 300 * s,
                ("0 0 " + 250 * s + " 0 " + 425 * s + " " + 175 * s + " " + 425 * s + " " + 425 * s + " " + 250 * s + " " + 600 * s + " 0 " + 600 * s + " " + -175 * s + " " + 425 * s + " " + -175 * s + " " + 175 * s),
                properties
            );
            addConstraint(x + 2300 * s, y - height, 0, -10 * s, stiffness, body[body.length - 1], pin);

            //n
            compound3Parts(
                x + 2900 * s,
                y + 310 * s,
                ("0 0 " + 200 * s + " 0 " + 200 * s + " " + 620 * s + " 0 " + 620 * s),
                x + 3100 * s,
                y + 160 * s,
                (200 * s + " " + 40 * s + " " + 400 * s + " " + 40 * s + " " + 400 * s + " " + 280 * s + " " + 200 * s + " " + 280 * s),
                x + 3300 * s,
                y + 333.3 * s,
                (400 * s + " " + 40 * s + " " + 540 * s + " " + 40 * s + " " + 600 * s + " " + 100 * s + " " + 600 * s + " " + 620 * s + " " + 400 * s + " " + 620 * s + " " + 400 * s + " " + 280 * s),
                properties
            );
            addConstraint(x + 3100 * s, y - height, 0, -10 * s, stiffness, composite[composite.length - 1], pin);
        }
    },
    tunnel() { // by Scarlettt
        simulation.inGameConsole(`<strong>tunnel</strong> by <span class='color-var'>Scarlettt</span>`);

        level.custom = () => {
            level.exit.drawAndCheck();

            //enter
            ctx.beginPath();
            ctx.moveTo(level.enter.x, level.enter.y + 30);
            ctx.lineTo(level.enter.x, level.enter.y - 80);
            ctx.bezierCurveTo(level.enter.x, level.enter.y - 170, level.enter.x + 100, level.enter.y - 170, level.enter.x + 100, level.enter.y - 80);
            ctx.lineTo(level.enter.x + 100, level.enter.y + 30);
            ctx.lineTo(level.enter.x, level.enter.y + 30);
            ctx.fillStyle = "#013";
            ctx.fill();

            //exit
            ctx.beginPath();
            ctx.moveTo(level.exit.x, level.exit.y + 30);
            ctx.lineTo(level.exit.x, level.exit.y - 80);
            ctx.bezierCurveTo(level.exit.x, level.exit.y - 170, level.exit.x + 100, level.exit.y - 170, level.exit.x + 100, level.exit.y - 80);
            ctx.lineTo(level.exit.x + 100, level.exit.y + 30);
            ctx.lineTo(level.exit.x, level.exit.y + 30);
            ctx.fillStyle = "#9ff";
            ctx.fill();

            // hiding rooms in path to second floor
            ctx.fillStyle = "#322";
            ctx.fillRect(3750, -1650, 3500, 350);

            // prevent the user from getting into the secreter room without defeating all mobs
            if (m.pos.x > 1500 && m.pos.x < 2500 && m.pos.y > -4000 && m.pos.y < -3500 && mob.reduce((a, i) => {
                return a || ((Math.sqrt((i.position.x - 3600) * (i.position.x - 3600) + (i.position.y + 3600) * (i.position.y + 3600)) < 20000) && i.isDropPowerUp);
            }, false) && !emergencyActivated) {
                Matter.Body.setPosition(player, {
                    x: 2800,
                    y: m.pos.y
                });
            }

            button.query();
            isButtonTapped = isButtonTapped || !button.isUp;
            hazard.level(!isButtonTapped);
            if (Matter.Query.region([player], hazard).length) m.energy -= 0.001;

            buttonSec.query();
            buttonSec.draw();
            if (!buttonSec.isUp && !hasSecretButton) {
                for (var i = 0; i < 5; i++) {
                    powerUps.spawn(3614, -3700, "ammo");
                }
                hasSecretButton = true;
            }
            buttonThird.query();
            buttonThird.draw();
            if (!buttonThird.isUp && !hasSecretButton2) {
                for (var i = 0; i < 1; i++) powerUps.spawn(1614, -3700, "research");
                hasSecretButton2 = true;
            }
            if (!buttonSec.isUp) {
                secretAnimTrans += 2;
                secretAnimTime = 1;
                secretAnimTrans = Math.max(0, Math.min(secretAnimTrans, 60));
            } else {
                secretAnimTrans--;
                if (secretAnimTime) secretAnimTrans += 3;
                secretAnimTrans = Math.min(60, Math.max(secretAnimTrans, 0));
            }
            if (secretAnimTime > 0) {
                secretAnimTime++;
                if (secretAnimTime > 150) secretAnimTime = 0;
            }

            if (emergencyActivated || !buttonThird.isUp) {
                secretAnimTrans2 += 2;
                secretAnimTime2 = 1;
                secretAnimTrans2 = Math.max(0, Math.min(secretAnimTrans2, 60));
            } else {
                secretAnimTrans2--;
                if (secretAnimTime2) secretAnimTrans2 += 3;
                secretAnimTrans2 = Math.min(60, Math.max(secretAnimTrans2, 0));
            }
            if (secretAnimTime2 > 0) {
                secretAnimTime2++;
                if (secretAnimTime2 > 150) secretAnimTime2 = 0;
            }



            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, 200, 0, 2 * Math.PI);
            ctx.fillStyle = "#ff25";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, 400, 0, 2 * Math.PI);
            ctx.fillStyle = "#ff22";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, 700, 0, 2 * Math.PI);
            ctx.fillStyle = "#ff21";
            ctx.fill();
            elevator.move();
            elevator.drawTrack();
        };
        level.customTopLayer = () => {
            hazard.query();
            secretHazard.level(emergencyActivated);
            secretHazard.query();
            button.draw();

            // Fire damage
            let isInRange = flames.reduce((a, i) => a || Math.sqrt((m.pos.x - i[0]) * (m.pos.x - i[0]) + (m.pos.y + 90 - i[1]) * (m.pos.y + 90 - i[1])) < 50, false);

            if (isInRange) {
                fireDmgLevel++;
                fireDmgLevel = Math.min(fireDmgLevel, 100);
            } else {
                fireDmgLevel--;
                fireDmgLevel = Math.max(fireDmgLevel, -8);
            }

            if (fireDmgLevel > -8) {
                ctx.fillStyle = "#fa0b";
                ctx.fillRect(m.pos.x - 50, m.pos.y - 100, Math.min(fireDmgLevel * 12.5 + 100, 100), 15);
            }

            if (fireDmgLevel > 0) {
                ctx.fillStyle = "#f00c";
                ctx.fillRect(m.pos.x - 50, m.pos.y - 100, fireDmgLevel, 15);

                m.takeDamage(0.001 * (1.5 * isInRange + 1));

                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 + 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 + 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 + 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 - 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 - 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#d40", Math.PI / 2 - 1);
                drawFlame(m.pos.x, m.pos.y + 90, "#f70", Math.PI / 2);
                drawFlame(m.pos.x, m.pos.y + 90, "#f70", Math.PI / 2);
                drawFlame(m.pos.x, m.pos.y + 90, "#f70", Math.PI / 2);
            }

            for (let j = 0; j < 5; j++) {
                drawFlame(1130 + j * 10, -1700)
                for (let i = 0; i < 7; i++) drawFlame(2550 + i * 200, -2800);
                for (let i = 0; i < 10; i++) drawFlame(2800 + i * 500, -1650);
                for (let i = 0; i < 9; i++) drawFlame(1595 + i * 95, -3860);
                drawFlame(4850, -1300);
                drawFlame(6350, -1300);
            }
            ctx.fillStyle = "#541";
            for (let i = 0; i < 9; i++) {
                ctx.fillRect(1592 + i * 95, -3860, 6, 70);
            }

            if (m.pos.x > 1500 && m.pos.x < 3750 && m.pos.y > -5000 && m.pos.y < -3300) {
                secretRoomTrans -= 5;
                secretRoomTrans = Math.max(secretRoomTrans, 85);
            } else {
                secretRoomTrans += 5;
                secretRoomTrans = Math.min(secretRoomTrans, 250);
            }


            let hasMob = mob.reduce((a, i) => {
                return a || ((Math.sqrt((i.position.x - 3600) * (i.position.x - 3600) + (i.position.y + 3600) * (i.position.y + 3600)) < 20000) && i.isDropPowerUp);
            }, false) && !emergencyActivated;

            door.isClosing = hasMob;

            door.openClose();
            ctx.fillStyle = "#444444" + secretRoomTrans.toString(16);
            ctx.fillRect(1480, -5000, 2270, 1710);
            if (hasMob) {
                ctx.fillStyle = "#444";
                ctx.fillRect(1480, -5000, 1070, 1710);
            }

            if (secretAnimTrans > 0) {
                drawProject([3614, -3530], [2900, -3900], [3400, -3600], secretAnimTrans, 60);
                if (secretAnimTrans >= 42) {
                    ctx.font = "27px monospace";
                    ctx.textAlign = "start"
                    ctx.fillStyle = "#00ffff" + Math.floor((secretAnimTrans - 40) * 12.75).toString(16);
                    ctx.fillText("Waste Discharge Interruption:", 2910, -3870);
                    ctx.fillText("Owner 'Scarlet' not found", 2910, -3830);
                    ctx.fillText("Detected user: 'm'", 2910, -3790);
                    ctx.fillStyle = (hasMob ? "#ff6644" : "#ffff44") + Math.floor((secretAnimTrans - 40) * 12.75).toString(16);
                    ctx.fillText(hasMob ? "AREA HAS MOBS." : "Area clear.", 2910, -3710);
                    ctx.fillText(hasMob ? "'openDoor' failed." : "'openDoor' complete.", 2910, -3670);
                    ctx.strokeStyle = "#00ff00" + Math.floor((secretAnimTrans - 40) * 6).toString(16);
                    ctx.beginPath();
                    ctx.arc(3300, -3730, 60, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.arc(3330, -3730, 8, 0, 2 * Math.PI);
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#00ffff" + Math.floor((secretAnimTrans - 40) * 12.75).toString(16);
                    ctx.font = "30px monospace";
                    ctx.fillText("n-gon inc", 3300, -3630);

                    ctx.font = "25px Arial";
                }
            }
            if (secretAnimTrans2 > 0) {
                drawProject([1614, -3530], [2050, -3900], [1550, -3600], secretAnimTrans2, 60);
                if (secretAnimTrans2 >= 42) {
                    ctx.font = "27px monospace";
                    ctx.textAlign = "start";
                    ctx.fillStyle = "#00ffff" + Math.floor((secretAnimTrans2 - 40) * 12.75).toString(16);
                    ctx.fillText("SECURITY BREACH DETECTED", 1560, -3870);
                    ctx.fillText("Entity name: m", 1560, -3830);
                    ctx.fillStyle = (tech.totalCount < 25 ? (tech.totalCount < 10 ? "#ffff44" : "#22ff22") : "#ff6644") + Math.floor((secretAnimTrans2 - 40) * 12.75).toString(16);
                    ctx.fillText("Threat level: " + (tech.totalCount < 25 ? (tech.totalCount < 10 ? "Low" : "Medium") : "HIGH"), 1560, -3790);
                    if (tech.totalCount >= 15) ctx.fillText("PROCEDURE ACTIVATED", 1560, -3750);
                    ctx.strokeStyle = "#00ff00" + Math.floor((secretAnimTrans2 - 40) * 6).toString(16);
                    ctx.beginPath();
                    ctx.arc(1950, -3730, 60, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.arc(1980, -3730, 8, 0, 2 * Math.PI);
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#00ffff" + Math.floor((secretAnimTrans2 - 40) * 12.75).toString(16);
                    ctx.font = "30px monospace";
                    ctx.fillText("n-gon inc", 1950, -3630);

                    ctx.font = "25px Arial";
                    if (secretAnimTrans2 >= 60) {
                        if (!emergencyActivated && tech.totalCount >= 10) {
                            for (let i = 0; i < 5; i++) {
                                spawn.exploder(1614, -3900);
                                if (tech.totalCount >= 25) spawn.randomMob(1614, -3900, Infinity);
                            }
                            emergencyActivated = true;
                        }
                    }
                }
            }
        };
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 8500;
        level.exit.y = 680;
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#123";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        // spawn blocks
        spawn.mapRect(-100, 0, 1050, 100);
        spawn.mapRect(900, -300, 50, 300);
        spawn.mapRect(700, -300, 50, 200);

        // first room
        spawn.mapRect(-100, -350, 850, 50);
        spawn.mapRect(900, -350, 850, 50);
        spawn.mapRect(-100, -1550, 50, 1200);
        spawn.mapRect(1700, -1550, 50, 1200);
        spawn.mapRect(-100, -1550, 850, 50);
        spawn.mapRect(900, -1550, 850, 50);
        spawn.bodyRect(700, -400, 50, 50);
        spawn.bodyRect(900, -400, 50, 50);

        spawn.mapRect(500, -650, 650, 25);
        spawn.mapRect(200, -1000, 200, 25);
        spawn.mapRect(1250, -1000, 200, 25);
        spawn.mapRect(600, -1300, 450, 25);

        spawn.mapRect(700, -1650, 50, 100);
        spawn.mapRect(900, -1650, 50, 100);


        // pathway to second room
        spawn.mapRect(950, -1650, 3050, 50);
        spawn.mapRect(1100, -1700, 100, 50);

        // second room
        spawn.mapRect(0, -5000, 1500, 3000);
        spawn.mapRect(1500, -2050, 300, 50);
        spawn.mapRect(2000, -3100, 300, 1100);
        spawn.mapRect(1500, -5000, 2250, 1000);
        spawn.mapRect(1500, -3500, 1050, 225);
        spawn.mapRect(4000, -5000, 500, 3000);
        spawn.mapRect(3748, -5000, 252, 1550);

        spawn.mapRect(1700, -2400, 300, 50);
        spawn.mapRect(1500, -2750, 300, 50);

        spawn.mapRect(2300, -3000, 1700, 50);
        spawn.mapRect(2300, -2800, 1700, 800);
        spawn.mapRect(2450, -3300, 1300, 100);

        // secret room in second room
        spawn.mapRect(2700, -3500, 1050, 50);
        spawn.mapRect(2549, -5000, 1201, 1000);

        const buttonSec = level.button(3550, -3500);
        const buttonThird = level.button(1550, -3500);
        let hasSecretButton = false,
            hasSecretButton2 = false,
            secretAnimTrans = 0,
            secretAnimTime = 0,
            secretAnimTrans2 = 0,
            secretAnimTime2 = 0;
        let emergencyActivated = false;

        const door = level.door(2450, -4000, 100, 500, 490);
        const secretHazard = level.hazard(1500, -4000, 1000, 510, 0.01);

        // hazards
        const button = level.button(3800, -3000);
        const hazard = level.hazard(2300, -3090, 1700, 110, 0.005);
        let isButtonTapped = false;

        // if (b.inventory.length < 5) powerUps.spawn(3800, -3200, "gun");
        powerUps.spawn(3900, -3100, "heal", true, 30);
        powerUps.spawn(3900, -3100, "heal", true, 30);

        // path to the third room
        spawn.mapRect(2000, -1850, 50, 200);
        spawn.mapRect(2200, -2000, 50, 200);
        spawn.mapRect(2400, -1850, 50, 200);

        spawn.mapRect(4200, -1650, 1300, 50);
        spawn.mapRect(5700, -1650, 1300, 50);
        spawn.mapRect(7200, -1650, 750, 50);

        spawn.mapRect(3700, -1600, 50, 350);
        spawn.mapRect(7250, -1600, 50, 350);
        spawn.mapRect(3750, -1300, 3500, 50);
        spawn.mapRect(4500, -2150, 3550, 50)

        // third room
        spawn.mapRect(7900, -1600, 50, 1000);
        spawn.mapRect(8050, -3000, 50, 2400);
        spawn.mapRect(7000, -600, 950, 50);
        spawn.mapRect(8050, -600, 950, 50);
        spawn.mapRect(7000, -600, 50, 1000);
        spawn.mapRect(8950, -600, 50, 1000);
        spawn.mapRect(7000, 400, 950, 50);
        spawn.mapRect(8050, 400, 950, 50);
        spawn.mapRect(7900, 400, 50, 300);
        spawn.mapRect(7900, 700, 1000, 50);

        const elevator = level.elevator(7962.5, 500, 75, 50, -1800)


        // fire damage
        const flames = [];
        flames.push([1150, -1700], [1150, -1770]);
        for (let i = 0; i < 10; i++) flames.push([2800 + i * 500, -1650], [2800 + i * 500, -1720]);
        flames.push([4850, -1300], [6350, -1300], [4850, -1370], [6350, -1370]);

        let fireDmgLevel = -8;

        let secretRoomTrans = 250;

        // mobs
        let mobList1 = [
            [500, -750],
            [1150, -750],
            [825, -1100],
            [300, -1100],
            [1350, -1100]
        ];
        while (mobList1.length > 5 - Math.sqrt(simulation.difficulty * 2.5) && mobList1.length) {
            let rand = Math.floor(Math.random() * mobList1.length);
            spawn[["hopper", "sneaker", "striker"][Math.floor(Math.random() * 3)]](mobList1[rand][0], mobList1[rand][1], 60 + Math.random() * 10);
            mobList1.splice(rand, 1);
        }

        let hasLaser = spawn.pickList.includes("laser");
        if (hasLaser) spawn.pickList.splice(spawn.pickList.indexOf("laser"), 1);
        let mobList2 = [
            [50, -1400],
            [1600, -450],
            [50, -450],
            [1600, -1400]
        ];
        for (let i = 0; i < 10; i++) mobList2.push([2800 + i * 500, -1800]);
        while (mobList2.length && mob.length < -1 + 16 * Math.log10(simulation.difficulty + 1)) {
            let rand = Math.floor(Math.random() * mobList2.length);
            spawn.randomMob(...mobList2[rand]);
            mobList2.splice(rand, 1);
        }

        let groupList = ["spawn.randomGroup(8250, 575);",
            `spawn.randomGroup(3200, -3700);
        if (simulation.difficulty > 15) 
            spawn.randomGroup(3500, -3700, 0.3);`,
            "spawn.randomGroup(7800, -1800, 0.5);"
        ];
        while (groupList.length > 0) {
            let ind = Math.floor(Math.random() * groupList.length);
            Function(groupList[ind])();
            groupList.splice(ind, 1);
        }
        if (hasLaser) spawn.pickList.push("laser");

        spawn.shieldingBoss(3900, -3200, 70);

        let randomBoss = Math.floor(Math.random() * 2);
        if (simulation.difficulty > 5) spawn[["shooterBoss", "launcherBoss"][randomBoss]](7500, -150, 100, false);
        else spawn[["shooter", "launcher"][randomBoss]](7500, -150, 150);
        spawn[["shooter", "launcher"][randomBoss]](8500, -150, 150);

        // canvas stuff
        function drawFlame(x, y, color = "#f81", angle = Math.PI / 2) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            for (let i = 0; i < 3; i++) {
                let randAng = (Math.random() - 0.5) * 2 + angle;
                randLen = 30 + Math.random() * 10;

                x = x + Math.cos(randAng) * randLen;
                y = y - Math.sin(randAng) * randLen;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        function drawProject(startPos, endPos1, endPos2, tValue, tValueM) {
            ctx.strokeStyle = "#003";
            ctx.fillStyle = "#0055aa" + ('0' + (tValue * 60 / tValueM).toString(16)).slice(-2);

            let inter = (tValueM - tValue) / tValueM;
            let endpos1i = endPos1.map((i, j) => (startPos[j] - i) * inter),
                endpos2i = endPos2.map((i, j) => (startPos[j] - i) * inter);

            ctx.beginPath();
            ctx.moveTo(endPos1[0] + endpos1i[0], endPos1[1] + endpos1i[1]);
            ctx.lineTo(...startPos);
            ctx.lineTo(endPos2[0] + endpos2i[0], endPos1[1] + endpos1i[1]);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(endPos1[0] + endpos1i[0], endPos1[1] + endpos1i[1]);
            ctx.lineTo(...startPos);
            ctx.lineTo(endPos1[0] + endpos1i[0], endPos2[1] + endpos2i[1]);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(endPos1[0] + endpos1i[0], endPos2[1] + endpos2i[1]);
            ctx.lineTo(...startPos);
            ctx.lineTo(endPos2[0] + endpos2i[0], endPos2[1] + endpos2i[1]);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(endPos2[0] + endpos2i[0], endPos2[1] + endpos2i[1]);
            ctx.lineTo(...startPos);
            ctx.lineTo(endPos2[0] + endpos2i[0], endPos1[1] + endpos1i[1]);
            ctx.fill();
            ctx.stroke();

            if (tValue >= tValueM * 2 / 3) {
                ctx.fillStyle = "#0055aa" + ('0' + Math.floor((tValue - tValueM * 2 / 3) * 6.25 * 60 / tValueM).toString(16)).slice(-2);
                ctx.strokeStyle = "#000033" + ('0' + Math.floor((tValue - tValueM * 2 / 3) * 12.75 * 60 / tValueM).toString(16)).slice(-2);
                ctx.fillRect(endPos1[0], endPos1[1], endPos2[0] - endPos1[0], endPos2[1] - endPos1[1]);
                ctx.shadowColor = "#00aaaa" + ('0' + Math.floor((tValue - tValueM * 2 / 3) * 12.75 * 60 / tValueM).toString(16)).slice(-2);
                ctx.shadowBlur = 10;
                ctx.strokeRect(endPos1[0], endPos1[1], endPos2[0] - endPos1[0], endPos2[1] - endPos1[1]);
                ctx.shadowBlur = 0;
                ctx.shadowColor = "#0000";
            }
        }
    },
    islands() {
        simulation.inGameConsole(`<strong>islands</strong> by <span class='color-var'>Richard0820</span>`);

        const boost1 = level.boost(58500, -18264, 1300);
        let portal2, portal3;
        // const removeIndex1 = map.length - 1;
        const drip1 = level.drip(59300, -18975, -18250, 100); // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip2 = level.drip(60000, -18953, -18250, 150);
        const drip3 = level.drip(60905, -18652, -18250, 70);
        const slimePit1 = level.hazard(58850, -18300, 2275, 100, 0.01); //hazard(x, y, width, height, damage = 0.003) spawn.mapRect(58850, -18300, 2275, 100);
        const slimePit2 = level.hazard(74400, -18075, 350, 100, 0.01);
        let isSpawnedBoss = false;
        level.custom = () => {
            level.exit.drawAndCheck();
            boost1.query();
            level.enter.draw();
            drip1.draw();
            drip2.draw();
            drip3.draw();
            //      portal[2].query();
            //      portal[3].query();
            //      portal[0].draw();
            //      portal[1].draw();
            //      portal[2].draw();
            //      portal[3].draw();
            portal2[2].query();
            portal2[3].query();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
            portal3[2].query();
            portal3[3].query();
            portal3[0].draw();
            portal3[1].draw();
            portal3[2].draw();
            portal3[3].draw();
        };
        level.customTopLayer = () => {
            slimePit1.query();
            slimePit2.query();
            ctx.fillStyle = `rgba(68, 68, 68, ${Math.max(0.3, Math.min((-17650 - m.pos.y) / 100, 0.99))})`;
            ctx.fillRect(58390, -17655, 1490, 740);
        };
        document.body.style.backgroundColor = "hsl(138, 3%, 74%)";
        level.setPosToSpawn(57680, -18330);
        level.exit.x = 76343;
        level.exit.y = -18020;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 30);
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 30);
        level.defaultZoom = 2000;
        simulation.zoomTransition(level.defaultZoom);
        spawn.mapRect(57800, -18550, 50, 100);
        spawn.mapRect(57500, -18550, 50, 275);
        spawn.mapRect(66900, -18675, 300, 200);
        spawn.mapRect(66925, -19050, 125, 225);
        spawn.mapRect(67825, -16975, 125, 100);
        spawn.mapRect(74900, -18075, 225, 100);
        spawn.mapRect(73925, -18225, 150, 275);
        spawn.mapRect(76200, -18325, 50, 125);
        spawn.mapRect(76525, -18325, 75, 400);
        spawn.mapRect(61325, -18350, 50, 25);
        spawn.mapRect(61450, -18425, 50, 25);
        spawn.mapRect(61475, -18450, 25, 25);
        spawn.mapRect(58725, -18350, 125, 50);
        spawn.mapRect(58675, -18275, 50, 75);
        spawn.mapRect(58600, -18275, 75, 75);
        spawn.mapRect(58675, -18325, 50, 50);
        spawn.mapRect(58250, -16925, 1825, 1050);
        spawn.mapRect(57500, -18200, 4475, 550);
        spawn.mapRect(61500, -18475, 475, 275);
        spawn.mapRect(62175, -18575, 325, 400);
        spawn.mapRect(62900, -18850, 525, 375);
        spawn.mapRect(63900, -18925, 450, 400);
        spawn.mapRect(64725, -19000, 625, 500);
        spawn.mapRect(65825, -19050, 675, 400);
        spawn.mapRect(66800, -18950, 400, 400);
        spawn.mapRect(68775, -18850, 525, 400);
        spawn.mapRect(67375, -16900, 1800, 1450);
        spawn.mapRect(67375, -17475, 325, 575);
        spawn.mapRect(68900, -17500, 250, 500);
        spawn.mapRect(69425, -17050, 500, 475);
        spawn.mapRect(70400, -17150, 425, 175);
        spawn.mapRect(71175, -17325, 450, 325);
        spawn.mapRect(72000, -17425, 325, 300);
        spawn.mapRect(72725, -17450, 350, 275);
        spawn.mapRect(70050, -18800, 550, 350);
        spawn.mapRect(67750, -19400, 375, 1200);
        spawn.mapRect(67750, -18200, 1425, 700);
        spawn.mapRect(66800, -18550, 575, 1650);
        spawn.mapRect(66800, -16900, 575, 1450);
        spawn.mapRect(67350, -18175, 250, 750);
        spawn.mapRect(71050, -18450, 725, 275);
        spawn.mapRect(72100, -18150, 475, 200);
        spawn.mapRect(73325, -17975, 3275, 475);
        spawn.mapRect(73175, -17775, 150, 300);
        spawn.mapRect(72975, -17675, 225, 250);
        spawn.mapRect(76200, -18325, 400, 75);
        spawn.mapRect(76525, -18250, 75, 275);
        spawn.mapRect(76200, -18250, 50, 50);
        spawn.mapRect(57500, -17675, 900, 1800);
        spawn.mapRect(59875, -17675, 1975, 1800);
        spawn.mapRect(57550, -18275, 225, 75);
        spawn.mapRect(61375, -18375, 50, 50);
        spawn.mapRect(61100, -18350, 75, 50);
        spawn.mapRect(61175, -18325, 50, 25);
        spawn.mapRect(61850, -16525, 250, 175);
        spawn.mapRect(57500, -18500, 50, 325);
        spawn.mapRect(57500, -18550, 350, 50);
        spawn.mapRect(57800, -18500, 50, 50);
        spawn.mapRect(61275, -18325, 375, 125);
        spawn.mapRect(61425, -18400, 200, 75);
        spawn.mapRect(62125, -18575, 125, 75);
        spawn.mapRect(62250, -18200, 175, 125);
        spawn.mapRect(62850, -18725, 100, 75);
        spawn.mapRect(63075, -18550, 225, 225);
        spawn.mapRect(62800, -18275, 75, 75);
        spawn.mapRect(62500, -18475, 75, 50);
        spawn.mapRect(63825, -18900, 150, 50);
        spawn.mapRect(63950, -18575, 150, 125);
        spawn.mapRect(64200, -18550, 100, 250);
        spawn.mapRect(64925, -18525, 200, 275);
        spawn.mapRect(64625, -18425, 75, 125);
        spawn.mapRect(65225, -18675, 150, 175);
        spawn.mapRect(65350, -18950, 75, 100);
        spawn.mapRect(65950, -18575, 75, 150);
        spawn.mapRect(66000, -18725, 225, 175);
        spawn.mapRect(66275, -18675, 75, 125);
        spawn.mapRect(66275, -18550, 75, 75);
        spawn.mapRect(66150, -18550, 100, 50);
        spawn.mapRect(66225, -18875, 25, 150);
        spawn.mapRect(66200, -18750, 75, 25);
        spawn.mapRect(66925, -19100, 125, 150);
        spawn.mapRect(66000, -19100, 75, 50);
        spawn.mapRect(65000, -19075, 100, 75);
        spawn.mapRect(66750, -18625, 100, 100);
        spawn.mapRect(68050, -18500, 350, 350);
        spawn.mapRect(68125, -18975, 150, 475);
        spawn.mapRect(69850, -18675, 150, 200);
        spawn.mapRect(70000, -18625, 150, 50);
        spawn.mapRect(68850, -18575, 325, 225);
        spawn.mapRect(69100, -18400, 75, 100);
        spawn.mapRect(70150, -18525, 125, 200);
        spawn.mapRect(70425, -18525, 125, 200);
        spawn.mapRect(70250, -18350, 175, 225);
        spawn.mapRect(70325, -18475, 50, 150);
        spawn.mapRect(70275, -18450, 150, 150);
        spawn.mapRect(71175, -18250, 525, 250);
        spawn.mapRect(71050, -18200, 150, 375);
        spawn.mapRect(70925, -18300, 200, 250);
        spawn.mapRect(71425, -18525, 175, 150);
        spawn.mapRect(70225, -18950, 275, 250);
        spawn.mapRect(70475, -17050, 225, 175);
        spawn.mapRect(70625, -17250, 100, 150);
        spawn.mapRect(71300, -17150, 200, 350);
        spawn.mapRect(71100, -17250, 125, 100);
        spawn.mapRect(71550, -17400, 150, 150);
        spawn.mapRect(67675, -17150, 225, 300);
        spawn.mapRect(68225, -17000, 100, 125);
        spawn.mapRect(67900, -16975, 375, 100);
        spawn.mapRect(68275, -16950, 150, 50);
        spawn.bodyRect(76200, -18200, 50, 200);
        spawn.mapRect(76200, -18000, 50, 25);
        spawn.bodyRect(57800, -18450, 50, 175);
        spawn.mapRect(68725, -17600, 300, 250);
        spawn.mapRect(68625, -17550, 175, 100);
        spawn.mapRect(68850, -17400, 150, 125);
        spawn.mapRect(69325, -16900, 200, 225);
        spawn.mapRect(69575, -16625, 175, 275);
        spawn.mapRect(69850, -16875, 250, 200);
        spawn.mapRect(69875, -16650, 150, 300);
        spawn.mapRect(69825, -16800, 375, 325);
        spawn.mapRect(69650, -16775, 325, 475);
        spawn.mapRect(71975, -17325, 100, 125);
        spawn.mapRect(72075, -17200, 150, 150);
        spawn.mapRect(72275, -17350, 150, 150);
        spawn.mapRect(72325, -17275, 150, 225);
        spawn.mapRect(72225, -18050, 200, 225);
        spawn.mapRect(71925, -18150, 250, 175);
        spawn.mapRect(72075, -18275, 125, 175);
        spawn.mapRect(72500, -18025, 125, 175);
        spawn.mapRect(72400, -17975, 150, 175);
        spawn.mapRect(73925, -18225, 350, 275);
        spawn.mapRect(74750, -18125, 275, 175);
        spawn.mapRect(74250, -18100, 150, 75);
        spawn.mapRect(74275, -18050, 200, 75);
        spawn.mapRect(73750, -18100, 275, 125);
        spawn.mapRect(73075, -17475, 3525, 300);
        spawn.mapRect(73275, -17600, 3325, 225);
        spawn.mapRect(57775, -18250, 150, 50);
        spawn.mapRect(57775, -18275, 75, 25);
        spawn.mapRect(57925, -18225, 50, 25);
        spawn.debris(68300, -17000, 3700, 16);
        spawn.mapRect(62000, -16525, 100, 200);
        spawn.mapRect(59125, -19125, 325, 200);
        spawn.mapRect(59925, -19175, 350, 225);
        spawn.mapRect(60800, -18850, 275, 200);
        spawn.mapRect(75025, -18075, 200, 100);
        spawn.mapRect(75225, -18025, 100, 50);
        spawn.bodyRect(74300, -18150, 50, 25);
        spawn.bodyRect(73850, -18150, 75, 75);
        spawn.bodyRect(74700, -18000, 75, 50);
        spawn.bodyRect(74250, -18325, 25, 25);
        spawn.bodyRect(74275, -18325, 25, 25);
        spawn.bodyRect(74275, -18325, 25, 25);
        spawn.bodyRect(74300, -18325, 100, 25);
        //    portal = level.portal(
        //      {
        //        x: 58625,
        //        y: -16925,
        //      },
        //      1.5 * Math.PI,
        //      {
        //        //right
        //        x: 58625,
        //        y: -17650,
        //      },
        //      2.5 * Math.PI
        //    ); //right
        portal2 = level.portal({
            x: 61920,
            y: -16525,
        },
            1.5 * Math.PI, {
            //right
            x: 58400,
            y: -17325,
        },
            2 * Math.PI
        );
        portal3 = level.portal({
            x: 59865,
            y: -17300,
        },
            3 * Math.PI, {
            //right
            x: 60820,
            y: -31130,
        },
            2.5 * Math.PI
        );

        spawn.mapRect(60275, -32250, 975, 400);
        spawn.mapRect(60375, -31925, 275, 225);
        spawn.mapRect(61025, -31950, 175, 300);
        spawn.mapRect(60825, -31725, 100, 350);
        spawn.mapRect(60675, -31875, 200, 225);
        spawn.mapRect(60225, -31950, 100, 725);
        spawn.mapRect(60250, -31525, 250, 375);
        spawn.mapRect(60675, -31475, 425, 350);
        spawn.mapRect(60625, -32500, 225, 300);
        spawn.mapRect(61025, -32325, 125, 175);
        spawn.mapRect(60375, -32325, 175, 150);
        spawn.mapRect(60250, -19075, 100, 100);
        spawn.randomMob(59850, -18825, Infinity);
        spawn.randomMob(62325, -18800, Infinity);
        spawn.randomMob(61725, -18800, Infinity);
        spawn.randomMob(63050, -19025, Infinity);
        spawn.randomMob(64100, -19200, Infinity);
        spawn.randomMob(64225, -19100, Infinity);
        spawn.randomMob(64875, -19300, Infinity);
        spawn.randomMob(65125, -19325, Infinity);
        spawn.randomMob(65850, -19275, Infinity);
        spawn.randomMob(66200, -19300, Infinity);
        spawn.randomMob(65975, -19425, Infinity);
        spawn.randomMob(67925, -19600, Infinity);
        spawn.randomMob(66975, -19275, Infinity);
        spawn.randomMob(67550, -18750, Infinity);
        spawn.randomMob(69625, -17275, Infinity);
        spawn.randomMob(70550, -17350, Infinity);
        spawn.randomMob(71375, -17475, Infinity);
        spawn.randomMob(72200, -17600, Infinity);
        spawn.randomMob(73000, -18025, Infinity);
        spawn.randomMob(73850, -18350, Infinity);
        spawn.randomMob(75725, -18300, Infinity);
        spawn.randomMob(75875, -18275, Infinity);
        spawn.randomMob(75700, -18200, Infinity);
        spawn.randomMob(75550, -18275, Infinity);
        spawn.randomMob(75825, -18150, Infinity);
        spawn.randomMob(75575, -18150, Infinity);
        spawn.randomGroup(75575, -18150, 0);
        level.chain(67250, -19325, 0, true, 14, 20);
        spawn.mapRect(58725, -18300, 125, 100);
        spawn.mapRect(61100, -18300, 175, 100);
        spawn.mapRect(67175, -19375, 100, 100);
        spawn.mapRect(59125, -19125, 325, 200);
        spawn.mapRect(59925, -19175, 350, 225);
        spawn.mapRect(60800, -18850, 275, 200);
        spawn.mapRect(60850, -18725, 50, 200);
        spawn.mapRect(60950, -18675, 50, 200);
        spawn.mapRect(59975, -19025, 50, 250);
        spawn.mapRect(60125, -19025, 50, 400);
        spawn.mapRect(60075, -19025, 50, 450);
        spawn.mapRect(59425, -19075, 100, 100);
        spawn.mapRect(59175, -19000, 100, 225);
        spawn.mapRect(59325, -19000, 75, 450);
        spawn.mapRect(59050, -19000, 100, 100);
        spawn.mapRect(61050, -18775, 100, 75);
        spawn.mapRect(60725, -18850, 125, 125);
        spawn.bodyRect(61850, -16525, 250, 175);
        if (simulation.difficulty > 1) {
            spawn.randomGroup(75575, -18150, 0);
            spawn.randomLevelBoss(68450, -17300);
        }
        if (!isSpawnedBoss) {
            isSpawnedBoss = true;
            if (Math.random() < 0.33) {
                for (
                    let i = 0, len = Math.min(simulation.difficulty / 20, 6); i < len;
                    ++i
                )
                    spawn.bounceBoss(59025, -17325, 50, false);
            } else if (Math.random() < 0.5) {
                for (
                    let i = 0, len = Math.min(simulation.difficulty / 9, 8); i < len;
                    ++i
                )
                    spawn.sprayBoss(59025, -17325, 50, false);
            } else {
                for (
                    let i = 0, len = Math.min(simulation.difficulty / 6, 10); i < len;
                    ++i
                )
                    spawn.mineBoss(59025, -17325, 50, false);
            }
            powerUps.spawn(59352, -17115, "tech");
            // for (let i = 0, len = 3 + simulation.difficulty / 20; i < len; ++i) spawn.mantisBoss(1487 + 300 * i, -1525, 35, false)
        }
        simulation.fallHeight = -15000;
        powerUps.addResearchToLevel();
        powerUps.spawn(3000, -230, "heal");
    },

    temple() {
        simulation.inGameConsole(`<strong>temple</strong> by <span class='color-var'>Scar1337</span>`);

        const V = Vector;
        const Equation = (function () {
            function Equation(a, b, c) {
                this.a = a;
                this.b = b;
                this.c = c;
            }
            Equation.prototype.getXfromY = function (y) {
                return (-this.b * y - this.c) / this.a;
            }
            Equation.prototype.getYfromX = function (x) {
                return (-this.a * x - this.c) / this.b;
            }
            Equation.fromPoints = function (v1, v2) {
                if (v1.x === v2.x) return new Equation(1, 0, -v1.x);
                if (v1.y === v2.y) return new Equation(0, 1, -v1.y);
                const d = (v2.y - v1.y) / (v2.x - v1.x);
                return new Equation(-d, 1, d * v1.x - v1.y);
            };
            return Equation;
        })();
        const Rect = (function () {
            function Rect(x, y, w, h) {
                this.pos = {
                    x,
                    y
                };
                this.width = w;
                this.height = h;
            }
            Rect.prototype.has = function ({
                x,
                y
            }) {
                return x >= this.pos.x && x <= this.pos.x + this.width &&
                    y >= this.pos.y && y <= this.pos.y + this.height;
            }
            Rect.prototype.hasLine = function (eq) {
                const leftInter = eq.getYfromX(this.pos.x);
                const rightInter = eq.getYfromX(this.pos.x + this.width);
                const topInter = eq.getXfromY(this.pos.y);
                return (leftInter >= this.pos.y && leftInter <= this.pos.y + this.height) ||
                    (rightInter >= this.pos.y && rightInter <= this.pos.y + this.height) ||
                    (topInter >= this.pos.x && topInter <= this.pos.x + this.width);
            }
            Rect.prototype.addToMap = function () {
                spawn.mapRect(this.pos.x, this.pos.y, this.width, this.height);
            }
            Object.defineProperty(Rect.prototype, "midPos", {
                get() {
                    return V.add(this.pos, {
                        x: this.width / 2,
                        y: this.height / 2
                    });
                }
            });
            Rect.fromBounds = function (min, max) {
                return new Rect(min.x, min.y, max.x - min.x, max.y - min.y);
            }
            Rect.prototype.isCollidingWith = function (other) {
                const tc = {
                    p1: [this.pos.x, this.pos.y],
                    p2: [this.pos.x + this.width, this.pos.y + this.height]
                };
                const oc = {
                    p1: [other.pos.x, other.pos.y],
                    p2: [other.pos.x + other.width, other.pos.y + other.height]
                };

                // If one rectangle is on left side of other
                if (tc.p1[0] >= oc.p2[0] || oc.p1[0] >= tc.p2[0])
                    return false;

                // If one rectangle is above other
                if (tc.p1[1] >= oc.p2[1] || oc.p1[1] >= tc.p2[1])
                    return false;

                return true;
            }
            return Rect;
        })();

        function isInBound(bound) {
            return bound.has(player.bounds.min) || bound.has(player.bounds.max);
        }

        function relocateWIMPs(x, y) {
            for (const i of mob) {
                if (i.isWIMP) {
                    setPos(i, {
                        x: x + 300 * (Math.random() - 0.5),
                        y: y + 300 * (Math.random() - 0.5)
                    });
                }
            }
        }

        function secondRoomSuckerBoss(x, y, isDark = false, radius = 25) {
            mobs.spawn(x, y, 12, radius, isDark ? "#000" : "#fff");
            let me = mob[mob.length - 1];
            me.isBoss = true;
            me.isDark = isDark;

            me.stroke = "transparent";
            me.eventHorizon = 500; // How family friendly content much do I have to reduce this
            me.seeAtDistance2 = 5e6; // Basically just see at all times, in the context it's given
            me.accelMag = 0.00003 * simulation.accelScale;
            me.collisionFilter.mask = cat.player | cat.bullet;
            me.memory = 1600;
            me.randomPRNGMult = Math.random() * 500;

            me.attackCycle = 0;
            me.lastAttackCycle = 0;
            Matter.Body.setDensity(me, 0.012); // extra dense, normal is 0.001 // makes effective life much larger
            me.onDeath = function () {
                // applying forces to player doesn't seem to work inside this method, not sure why
                powerUps.spawn(this.position.x + 20, this.position.y, "ammo");
                if (Math.random() > 0.5) powerUps.spawn(this.position.x, this.position.y, "ammo");
                if (Math.random() > 0.3) powerUps.spawn(this.position.x, this.position.y, "heal", true, 30 * (simulation.healScale ** 0.25) * Math.sqrt(tech.largerHeals) * Math.sqrt(0.1 + Math.random() * 0.5));
            };
            me.damageReduction = 0.25
            me.do = function () {
                // keep it slow, to stop issues from explosion knock backs
                if (this.speed > 1) {
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * 0.95,
                        y: this.velocity.y * 0.95
                    });
                }
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (this.distanceToPlayer2() < this.seeAtDistance2) { // ignore cloak for black holes
                        this.locatePlayer();
                        if (!this.seePlayer.yes) this.seePlayer.yes = true;
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
                this.checkStatus();
                if (this.seePlayer.recall) {
                    // accelerate towards the player
                    const forceMag = this.accelMag * this.mass;
                    const dx = this.seePlayer.position.x - this.position.x
                    const dy = this.seePlayer.position.y - this.position.y
                    const mag = Math.sqrt(dx * dx + dy * dy)
                    this.force.x += forceMag * dx / mag;
                    this.force.y += forceMag * dy / mag;

                    // eventHorizon waves in and out
                    const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008));

                    // draw darkness
                    ctx.fillStyle = this.isDark ? "rgba(0,20,40,0.6)" : "rgba(225,215,255,0.6)";
                    DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.2, 0, 2 * Math.PI);
                    ctx.fillStyle = this.isDark ? "rgba(0,20,40,0.4)" : "rgba(225,215,255,0.4)";
                    DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.4, 0, 2 * Math.PI);
                    ctx.fillStyle = this.isDark ? "rgba(0,20,40,0.3)" : "rgba(225,215,255,0.3)";
                    DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.6, 0, 2 * Math.PI);
                    ctx.fillStyle = this.isDark ? "rgba(0,20,40,0.2)" : "rgba(225,215,255,0.2)";
                    DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.8, 0, 2 * Math.PI);
                    ctx.fillStyle = this.isDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";
                    DrawTools.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);
                    // when player is inside event horizon
                    if (distance(this.position, player.position) < eventHorizon) {
                        if (this.isDark) {
                            // Standard black hole stuff
                            if (m.immuneCycle < m.cycle) {
                                if (m.energy > 0) m.energy -= 0.003;
                                if (m.energy < 0.1) m.takeDamage(0.00015 * spawn.dmgToPlayerByLevelsCleared());
                            }
                            const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                            player.force.x -= 0.0005 * Math.cos(angle) * player.mass * (m.onGround ? 1.7 : 1);
                            player.force.y -= 0.0005 * Math.sin(angle) * player.mass;
                            // draw line to player
                            ctx.lineWidth = Math.min(60, this.radius * 2);
                            ctx.strokeStyle = "rgba(0,0,0,0.5)";
                            DrawTools.line([this.position, m.pos]);
                            ctx.fillStyle = "rgba(0,0,0,0.3)";
                            DrawTools.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                        } else {
                            // Lightning attacks
                            this.attackCycle++;
                            if (this.attackCycle >= 30) {
                                this.attackCycle = 0;
                                this.lastAttackCycle = simulation.cycle;
                                Matter.Body.setVelocity(player, V.add(player.velocity, {
                                    x: 0,
                                    y: -10
                                }));
                                if (m.immuneCycle < m.cycle) {
                                    if (m.energy > 0) m.energy -= 0.03;
                                    m.takeDamage(0.005 * spawn.dmgToPlayerByLevelsCleared());
                                }
                            }
                            DrawTools.lightning(this.position, m.pos, this.lastAttackCycle, this.randomPRNGMult);
                            ctx.fillStyle = `rgba(255,240,127,${0.12 * Math.max(15 - simulation.cycle + this.lastAttackCycle, 0)})`;
                            DrawTools.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                        }
                    }
                }
            }
        };

        function secondRoomPlacerBoss(x, y, isDark = false, size = 70) {
            mobs.spawn(x, y, isDark ? 3 : 4, size, isDark ? "#0008" : "#fff8");
            let me = mob[mob.length - 1];
            me.isBoss = true;
            me.isDark = isDark;

            me.stroke = isDark ? "#000" : "#fff";
            me.seeAtDistance2 = 5e6; // Basically just see at all times, in the context it's given
            me.accelMag = 0.0001 * simulation.accelScale;
            me.collisionFilter.mask = cat.player | cat.bullet;
            me.memory = 1600;
            me.randomPRNGMult = Math.random() * 500;

            me.attackCycle = 0;
            me.maxAttackCycle = isDark ? 90 : 240;
            Matter.Body.setDensity(me, 0.006); // extra dense, normal is 0.001 // makes effective life much larger
            me.onDeath = function () {
                powerUps.spawn(this.position.x + 20, this.position.y, "ammo");
                if (Math.random() > 0.5) powerUps.spawn(this.position.x, this.position.y, "ammo");
                if (Math.random() > 0.3) powerUps.spawn(this.position.x, this.position.y, "heal", true, 30 * (simulation.healScale ** 0.25) * Math.sqrt(tech.largerHeals) * Math.sqrt(0.1 + Math.random() * 0.5));
            };
            me.damageReduction = 0.25
            me.do = function () {
                // keep it slow, to stop issues from explosion knock backs
                if (this.speed > 2) {
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * 0.95,
                        y: this.velocity.y * 0.95
                    });
                }
                if (!(simulation.cycle % this.seePlayerFreq)) {
                    if (this.distanceToPlayer2() < this.seeAtDistance2) { // ignore cloak
                        this.locatePlayer();
                        if (!this.seePlayer.yes) this.seePlayer.yes = true;
                    } else if (this.seePlayer.recall) {
                        this.lostPlayer();
                    }
                }
                this.checkStatus();
                if (this.seePlayer.recall) {
                    // accelerate towards the player
                    const forceMag = this.accelMag * this.mass;
                    const dx = this.seePlayer.position.x - this.position.x
                    const dy = this.seePlayer.position.y - this.position.y
                    const mag = Math.sqrt(dx * dx + dy * dy)
                    this.force.x += forceMag * dx / mag;
                    this.force.y += forceMag * dy / mag;
                    this.attackCycle++;
                    if (this.attackCycle > this.maxAttackCycle) {
                        this.attackCycle = 0;
                        secondRoomObstacle(this.position.x, this.position.y, this.isDark, size);
                    }
                }
            }
        };
        function secondRoomObstacle(x, y, isDark = false, size = 70) {
            mobs.spawn(x, y, isDark ? 3 : 4, size, isDark ? "#0004" : "#fff4");
            let me = mob[mob.length - 1];

            me.stroke = isDark ? "#000b" : "#fffb";
            me.collisionFilter.mask = isDark ? cat.player | cat.bullet : 0;
            me.isDropPowerUp = false;
            me.showHealthBar = false;
            me.leaveBody = false;
            me.timeLeft = 1200;
            me.isObstacle = true;
            me.damageReduction = isDark ? 0.5 : 0
            if (!isDark) {
                me.isBadTarget = true;
                me.attackCycle = 0;
                me.maxAttackCycle = 10;
                me.inertia = Infinity;
            }
            me.do = isDark ? function () {
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x * 0.95,
                    y: this.velocity.y * 0.95
                });
            } : function () {
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x * 0.95,
                    y: this.velocity.y * 0.95
                });
                if (Rect.fromBounds(this.bounds.min, this.bounds.max).isCollidingWith(Rect.fromBounds(player.bounds.min, player.bounds.max))) {
                    this.attackCycle++;
                    this.attackCycle = Math.min(this.attackCycle, 10);
                } else {
                    this.attackCycle--;
                    this.attackCycle = Math.max(this.attackCycle, 0);
                }
                if (this.attackCycle > 0) {
                    ctx.beginPath();
                    const vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    if (this.attackCycle >= 10) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = "rgb(255, 210, 64)";
                    }
                    ctx.fillStyle = `rgba(255, 210, 64, ${this.attackCycle / 15})`;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    if (this.attackCycle >= 10) {
                        DrawTools.lightning(this.position, m.pos, simulation.cycle);
                        m.takeDamage(0.003 * spawn.dmgToPlayerByLevelsCleared());
                    }
                }
                this.timeLimit();
            }
        }

        function mobGrenade(...args) {
            spawn.grenade(...args);
            const pulseRadius = args[3] || Math.min(550, 250 + simulation.difficulty * 3)
            let me = mob[mob.length - 1];
            me.fill = "#ace";
            me.damageReduction = 0;
            me.onDeath = function () {
                //damage player if in range
                if (distance(player.position, this.position) < pulseRadius && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage
                    m.takeDamage(0.02 * spawn.dmgToPlayerByLevelsCleared());
                }
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: pulseRadius,
                    color: "rgba(170,204,238,0.3)",
                    time: simulation.drawTime
                });
            };
            me.do = function () {
                this.timeLimit();
                ctx.beginPath(); //draw explosion outline
                ctx.arc(this.position.x, this.position.y, pulseRadius * (1.01 - this.timeLeft / this.lifeSpan), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                ctx.fillStyle = "rgba(170,204,238,0.1)";
                ctx.fill();
            };
        }
        // Todo: nerf ThirdRoomBoss a bit?
        function thirdRoomBoss(x, y) {
            mobs.spawn(x, y, 6, 60, "#000");
            let me = mob[mob.length - 1];
            // Fix in place
            me.constraint = Constraint.create({
                pointA: {
                    x: me.position.x,
                    y: me.position.y
                },
                bodyB: me,
                stiffness: 1,
                damping: 1
            });
            Composite.add(engine.world, me.constraint);
            me.isBoss = true;
            me.name = "templeBoss"

            me.stroke = "transparent";
            me.eventHorizon = 900;
            me.collisionFilter.mask = cat.player | cat.bullet | cat.body;

            me.memory = Infinity;
            me.attackCycle = 0;
            me.lastAttackCycle = 0;
            me.spawnCycle = 0;
            Matter.Body.setDensity(me, 0.08); //extra dense //normal is 0.001 //makes effective life much larger
            me.onDeath = function () {
                for (let j = 0; j < 8; j++) { //in case some mobs leave things after they die
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i] !== this) {
                            if (mob[i].isInvulnerable) { //disable invulnerability
                                mob[i].isInvulnerable = false
                                mob[i].damageReduction = 1
                            }
                            mob[i].damage(Infinity, true);
                        }
                    }
                }
                // You earned it: One more tech
                powerUps.spawn(this.position.x, this.position.y, "tech");
                powerUps.spawnBossPowerUp(this.position.x, this.position.y);
                templePlayer.room3ToEndAnim = 1;
            };
            me.nextHealthThreshold = 0.75;
            me.trapCycle = 0;
            me.onDamage = function () {
                if (this.health < this.nextHealthThreshold) {
                    this.health = this.nextHealthThreshold - 0.01
                    this.nextHealthThreshold = Math.floor(this.health * 4) / 4 //0.75,0.5,0.25
                    this.trapCycle = 1;
                    this.isInvulnerable = true;
                    this.damageReduction = 0;
                }
            };
            me.damageReduction = 0.25
            me.rings = [{
                colour: "#65f",
                radius: 300,
                id: 0
            }, {
                colour: "#0f0",
                radius: 400,
                id: 1
            }, {
                colour: "#f00",
                radius: 500,
                id: 2
            }];
            me.ring = function () {
                if (this.isInvulnerable) return;
                ctx.lineWidth = 10;
                for (const ring of this.rings) {
                    const radius = ring.radius * (1 + 0.3 * Math.sin(simulation.cycle / 60 * (ring.id + 2)));
                    if (Math.abs(distance(player.position, this.position) - radius) < 60 && m.immuneCycle < simulation.cycle) {
                        m.takeDamage(0.4 / radius);
                    }
                    ctx.strokeStyle = ring.colour;
                    DrawTools.arcOut(this.position.x, this.position.y, radius, 0, Math.PI * 2);
                }
            }
            me.horizon = function () {
                if (this.isInvulnerable) return this.fill = "#f00";
                // eventHorizon waves in and out
                const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008));

                const charge = this.attackCycle / 90;
                this.fill = `rgb(${charge * 255},${charge * 255},${charge * 255})`;
                // draw darkness
                ctx.fillStyle = `rgba(${charge * 225},${20 + charge * 195},${40 + charge * 215},0.6)`;
                DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.2, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${charge * 225},${20 + charge * 195},${40 + charge * 215},0.4)`;
                DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.4, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${charge * 225},${20 + charge * 195},${40 + charge * 215},0.3)`;
                DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.6, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${charge * 225},${20 + charge * 195},${40 + charge * 215},0.2)`;
                DrawTools.arc(this.position.x, this.position.y, eventHorizon * 0.8, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${charge * 255},${charge * 255},${charge * 255},0.05)`;
                DrawTools.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);

                // when player is inside event horizon
                if (V.magnitude(V.sub(this.position, player.position)) < eventHorizon) {
                    // Standard black hole stuff
                    if (m.immuneCycle < m.cycle) {
                        if (m.energy > 0) m.energy -= 0.004;
                        if (m.energy < 0.1) m.takeDamage(0.0002 * spawn.dmgToPlayerByLevelsCleared());
                    }
                    const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                    player.force.x -= 0.001 * Math.cos(angle) * player.mass * (m.onGround ? 1.7 : 1);
                    player.force.y -= 0.001 * Math.sin(angle) * player.mass;
                    // draw line to player
                    ctx.lineWidth = Math.min(60, this.radius * 2);
                    ctx.strokeStyle = "rgba(0,0,0,0.5)";
                    DrawTools.line([this.position, m.pos]);
                    ctx.fillStyle = "rgba(0,0,0,0.3)";
                    DrawTools.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                    // Lightning attacks
                    this.attackCycle++;
                    if (this.attackCycle >= 90) {
                        this.attackCycle = 0;
                        this.lastAttackCycle = simulation.cycle;
                        Matter.Body.setVelocity(player, V.add(player.velocity, {
                            x: 0,
                            y: -20
                        }));
                        if (m.immuneCycle < m.cycle) {
                            m.takeDamage(0.012 * spawn.dmgToPlayerByLevelsCleared());
                        }
                    }
                    const lightningCycle = simulation.cycle * 2 / 3 + this.lastAttackCycle / 3;
                    DrawTools.lightning(this.position, m.pos, lightningCycle, 1, 12);
                    DrawTools.lightning(this.position, m.pos, lightningCycle, 2, 12);
                    ctx.fillStyle = `rgba(255,240,127,${0.12 * Math.max(15 - simulation.cycle + this.lastAttackCycle, 0)})`;
                    DrawTools.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                }
            }
            me.periodicSpawns = function () {
                if (this.isInvulnerable) return;
                this.spawnCycle++;
                // Spawn annoying purple thing(s) that chases the player
                if (!(this.spawnCycle % 180)) {
                    spawn.seeker(this.position.x, this.position.y, 15 * (0.7 + 0.5 * Math.random()), 7);
                    spawn.seeker(this.position.x, this.position.y, 4 * (0.7 + 0.5 * Math.random()), 7);
                    spawn.seeker(this.position.x, this.position.y, 4 * (0.7 + 0.5 * Math.random()), 7);
                }
                // Spawn the annoying pink (now blue) exploder that doesn't chase the player
                if (!(this.spawnCycle % 300)) {
                    for (let i = 0; i < 3; i++) {
                        mobGrenade(1100 + 700 * i, -13030, undefined, Math.min(700, 300 + simulation.difficulty * 4), 10);
                        setVel(mob[mob.length - 1], {
                            x: 0,
                            y: -10
                        });
                        mobGrenade(1100 + 700 * i, -14370, undefined, Math.min(700, 300 + simulation.difficulty * 4), 10);
                        setVel(mob[mob.length - 1], {
                            x: 0,
                            y: 10
                        });
                    }
                }
                // Spawn a bunch of mobs
                if (simulation.difficulty > 10 && !(this.spawnCycle % 600)) {
                    // This is just ripped off of spawn.nodeGroup because I don't want the shield
                    const nodes = 3;
                    const radius = Math.ceil(Math.random() * 10) + 18;
                    const sideLength = Math.ceil(Math.random() * 100) + 70;
                    const stiffness = Math.random() * 0.03 + 0.005;
                    spawn.allowShields = false; //don't want shields on individual group mobs
                    const angle = 2 * Math.PI / nodes
                    for (let i = 0; i < nodes; ++i) {
                        spawn.focuser(x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), radius);
                    }
                    spawn.constrainAllMobCombos(nodes, stiffness);
                    spawn.allowShields = true;
                }
            }
            me.invulnerableTrap = function () {
                if (this.trapCycle < 1) return;
                this.trapCycle++;
                // 24 is just an arbitrarily large number
                const spawnCycles = Math.min(24, Math.max(6, 4 + Math.floor(simulation.difficulty / 3)));
                // I have no idea how to balance at all, please help me
                const spawnDelay = Math.floor(5 + 10 / (1 + Math.sqrt(simulation.difficulty) / 5));
                if (this.trapCycle >= 90) {
                    const cycle = this.trapCycle - 90;
                    if (!(cycle % spawnDelay)) {
                        const radius = Math.min(500, 200 + simulation.difficulty * 3);
                        mobGrenade(600, -13050, 30, radius);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: 35,
                            y: 0
                        });
                        mobGrenade(3000, -13050, 30, radius);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: -35,
                            y: 0
                        });
                        mobGrenade(600, -14350, 30, radius);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: 35,
                            y: 0
                        });
                        mobGrenade(3000, -14350, 30, radius);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: -35,
                            y: 0
                        });
                        if (Math.floor(cycle / spawnDelay) >= spawnCycles - 1) {
                            this.trapCycle = 0;
                            this.isInvulnerable = false;
                            this.damageReduction = 0.25
                        }
                    }
                }
                ctx.font = "100px Arial";
                ctx.fillStyle = "#f00";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#f00";
                ctx.textAlign = "center";
                ctx.textBaseLine = "middle";
                ctx.fillText("!", 900, -13050);
                ctx.fillText("!", 900, -14350);
                ctx.fillText("!", 1800, -13050);
                ctx.fillText("!", 1800, -14350);
                ctx.fillText("!", 2700, -13050);
                ctx.fillText("!", 2700, -14350);
                ctx.shadowBlur = 0;
            }
            me.do = function () {
                this.checkStatus();
                this.horizon();
                this.ring();
                this.periodicSpawns();
                this.invulnerableTrap();
            }
        };
        let oldNextLevel = level.nextLevel;
        const oldFallHeight = simulation.fallHeight;
        level.nextLevel = () => {
            color.map = "#444";
            m.death = m.oldDeath;
            canvas.style.filter = "";
            level.nextLevel = oldNextLevel;
            simulation.fallHeight = oldFallHeight;
            oldNextLevel();
        }
        let bounds = [];
        let mobPositionsQueue = Array.from(Array(10), () => []);
        m.oldDeath = m.death;
        m.death = function () {
            if (!tech.isImmortal) {
                requestAnimationFrame(() => color.map = "#444");
                m.death = m.oldDeath;
                canvas.style.filter = "";
                level.nextLevel = oldNextLevel;
                simulation.fallHeight = oldFallHeight;
                m.oldDeath();
            } else {
                m.switchWorlds();
                Matter.Body.setPosition(player, {
                    x: level.enter.x + 50,
                    y: level.enter.y - 20
                });
                makeLore("How did you not die?");
                setTimeout(() => makeLore("I'll let you off this one time."), 2000);
                tech.isImmortal = false;
            }
        }
        let name = "templeBoss"; //"⥟ᘊ5⪊Ыᳪៗⱕ␥ዘᑧ⍗";
        addPartToMap = (len = map.length - 1) => {
            map[len].collisionFilter.category = cat.map;
            map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            Matter.Body.setStatic(map[len], true); // make static
            Composite.add(engine.world, map[len]);
        }
        level.setPosToSpawn(50, -50); // normal spawn
        // Make the level exit really far away so WIMP powerups don't show up at all
        level.exit.x = 1e6;
        level.exit.y = -1e6;
        Promise.resolve().then(() => {
            // Clear all WIMPS and their research
            for (let i = 0; i < mob.length; i++) {
                if (mob[i] && !mob[i].isDarkMatter) {
                    mob[i].isWIMP = true;
                }
            }
            relocateWIMPs(0, -10030);
            for (let i = 0; i < powerUp.length; i++) {
                while (powerUp[i] && powerUp[i].name === "research") {
                    Matter.Composite.remove(engine.world, powerUp[i]);
                    powerUp.splice(i, 1);
                }
            }
            level.exit.x = 1500;
            level.exit.y = -30;
        });
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        spawn.mapRect(1500, -10, 100, 20);
        level.defaultZoom = 1800
        // simulation.setZoom(1200);
        simulation.zoomTransition(1200)


        document.body.style.backgroundColor = "#daa69f";
        color.map = "#600";

        function box(x, y, w, h, s) {
            spawn.mapRect(x, y, w, s);
            spawn.mapRect(x, y, s, h);
            spawn.mapRect(x + w - s, y, s, h);
            spawn.mapRect(x, y + h - s, w, s);
        }

        function diamond(x, y, s) {
            spawn.mapVertex(x, y, `0 -${s}  -${s} 0  0 ${s}  ${s} 0`);
        }

        // Fake level
        bounds.push(new Rect(-200, -500, 2000, 600));
        box(-200, -500, 2000, 600, 100);

        // Actual level, Room 1
        const firstRoomBounds = new Rect(-200, -4000, 5000, 2100);
        bounds.push(firstRoomBounds);

        box(-200, -4000, 5000, 2100, 100);
        spawn.mapRect(-200, -2500, 1300, 100);
        spawn.mapRect(3500, -2500, 1300, 100);
        spawn.mapRect(-200, -4000, 1000, 1600);
        spawn.mapRect(3800, -4000, 1000, 1600);
        // Enter and Exit platforms
        spawn.mapRect(0, -2010, 100, 20);
        spawn.mapRect(4500, -2010, 100, 20);

        // Altar of Room 1
        spawn.mapRect(2100, -2200, 100, 300);
        spawn.mapRect(2400, -2200, 100, 300);
        spawn.mapRect(2070, -2200, 460, 20);

        spawn.debris(1700, -2100, 300, 10);
        spawn.debris(2500, -2100, 300, 10);

        // Actual level, Room 2
        const secondRoomBounds = new Rect(-1500, -10500, 3000, 3600);
        bounds.push(secondRoomBounds);

        box(-1500, -10500, 3000, 3600, 100);
        spawn.mapRect(-2000, -8500, 1600, 1600);
        spawn.mapRect(400, -8500, 1600, 1600);
        // Enter and Exit platforms
        spawn.mapRect(-50, -7010, 100, 20);
        spawn.mapRect(-50, -10010, 100, 20);

        // Hazard traversing
        spawn.mapRect(-300, -7320, 800, 20);
        spawn.mapRect(175, -7600, 325, 20);
        spawn.mapRect(200, -7775, 300, 20);
        spawn.mapRect(-500, -7600, 325, 20);
        spawn.mapRect(-500, -7775, 300, 20);
        spawn.mapRect(-500, -7950, 800, 20);
        spawn.mapRect(-300, -8100, 800, 20);
        spawn.mapRect(-500, -8250, 800, 20);
        for (let i = 0; i < 2; i++) spawn.mapRect(-250, -8400 + 150 * i, 500, 60);
        const room2SlimePit = level.hazard(-400, -8410, 800, 1090);
        room2SlimePit.logic = function () {
            if (this.height > 0 && Matter.Query.region([player], this).length) {
                if (m.immuneCycle < m.cycle) {
                    // Trolled
                    const hasCPT = tech.isRewindAvoidDeath;
                    tech.isRewindAvoidDeath = false;
                    const DRAIN = 0.002 * (tech.isRadioactiveResistance ? 0.2 : 1) + 0.001;
                    if (m.energy > DRAIN && !tech.isEnergyHealth) {
                        m.energy -= DRAIN;
                    }
                    m.takeDamage(0.00015 * (tech.isRadioactiveResistance ? 0.2 : 1));
                    if (tech.isEnergyHealth) {
                        const previousEnergy = m.energy;
                        m.regenEnergy();
                        const energyRegenerated = m.energy - previousEnergy;
                        if (energyRegenerated > 0) {
                            m.energy = previousEnergy;
                            m.takeDamage(energyRegenerated);
                        }
                    }
                    tech.isRewindAvoidDeath = hasCPT;
                }
                player.force.y -= 0.3 * player.mass * simulation.g;
                setVel(player, Vector.sub(player.velocity, {
                    x: 0,
                    y: player.velocity.y * 0.02
                }));
            }
            // Float power ups
            powerUpCollide = Matter.Query.region(powerUp, this)
            for (let i = 0, len = powerUpCollide.length; i < len; i++) {
                const diameter = 2 * powerUpCollide[i].size
                const buoyancy = 1 - 0.2 * Math.max(0, Math.min(diameter, this.min.y - powerUpCollide[i].position.y + powerUpCollide[i].size)) / diameter
                powerUpCollide[i].force.y -= buoyancy * 1.14 * powerUpCollide[i].mass * simulation.g;
                setVel(powerUpCollide[i], {
                    x: powerUpCollide[i].velocity.x,
                    y: 0.96 * powerUpCollide[i].velocity.y
                });
            }
        }
        room2SlimePit.draw = function () {
            if (this.isOn) {
                ctx.fillStyle = "hsla(160, 100%, 35%, 0.75)";
                ctx.fillRect(this.min.x, this.min.y, this.width, this.height);
            }
        }
        // Room 2 spawning bounds
        const secondRoomSpawnBounds = new Rect(-1500, -10500, 3000, 2000);
        spawn.mapRect(-700, -8700, 150, 20);
        spawn.mapRect(550, -8700, 150, 20);
        spawn.mapRect(-400, -8900, 800, 20);
        diamond(-600, -9800, 30);
        diamond(0, -9800, 30);
        diamond(600, -9800, 30);

        spawn.mapRect(-1000, -10000, 2000, 30);

        // Actual level, Room 3 (Final Boss?)
        const thirdRoomBounds = new Rect(-200, -14500, 4000, 1600);
        bounds.push(thirdRoomBounds);
        box(-200, -14500, 4000, 1600, 100);
        spawn.mapRect(-200, -14500, 800, 1100);
        spawn.mapRect(3000, -14500, 800, 1100);
        // Enter and Exit platforms
        spawn.mapRect(0, -13110, 100, 20);
        spawn.mapRect(-200, -13100, 800, 200);
        spawn.mapRect(3500, -13110, 100, 20);
        spawn.mapRect(3000, -13100, 800, 200);
        for (let i = 0; i < 4; i++) spawn.bodyRect(570, -13400 + i * 75, 30, 75);

        for (let i = 0; i < 3; i++) {
            diamond(1100 + 700 * i, -13000, 30, 30);
            diamond(1100 + 700 * i, -14400, 30, 30);
        }

        const Objects = {
            altar: {
                get isHeal() {
                    return simulation.cycle % 600 >= 300;
                },
                pos: {
                    x: 2300,
                    y: -2200
                },
                get isActive() {
                    const roughPlayerCentre = V.add(m.pos, {
                        x: 0,
                        y: 40
                    });
                    return distance(roughPlayerCentre, this.pos) < 240 &&
                        (Math.abs(angle(roughPlayerCentre, this.pos) - Math.PI / 2) < 1);
                },
                logic() {
                    if (!this.isActive) return;
                    if (this.isHeal) {
                        m.energy += 0.005;
                    } else {
                        m.energy = Math.max(m.energy - 0.006, 0);
                        if (m.energy <= 0.01 && m.immuneCycle < m.cycle) m.takeDamage(0.002);
                    }
                },
                drawTop() {
                    if (!isInBound(firstRoomBounds)) return;
                    const colour = this.isHeal ? m.fieldMeterColor : "#f00";
                    DrawTools.flame([2300, -2200, 26, 4, colour], 7);
                    ctx.fillStyle = colour;
                    ctx.fillRect(2200, -2200, 200, 200);
                },
                drawBottom() {
                    ctx.fillStyle = this.isHeal ? "#fff5" : "#0005";
                    for (const radius of [230, 180, 130, 80, 30]) {
                        DrawTools.arc(2300, -2200, radius, 0, Math.PI, true);
                    }
                }
            },
            room2Initiator: {
                pos: {
                    x: 0,
                    y: -9050
                },
                get distance() {
                    return distance(player.position, this.pos);
                },
                range: 120,
                rings: [{
                    colour: [102, 85, 255],
                    radius: 200
                }, {
                    colour: [0, 255, 0],
                    radius: 300
                }, {
                    colour: [255, 0, 0],
                    radius: 400
                }],
                get ringNumber() {
                    return this.rings.length;
                },
                get cap() {
                    return this.ringNumber * 90 + 180;
                },
                get capped() {
                    return templePlayer.room2.spawnInitiatorCycles > this.cap;
                },
                logic() {
                    if (this.distance < this.range) {
                        templePlayer.room2.spawnInitiatorCycles++;
                    }
                },
                draw() {
                    Promise.resolve().then(() => {
                        const cycle = templePlayer.room2.spawnInitiatorCycles;
                        if (!this.capped && this.distance < 400) {
                            ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, (400 - this.distance) / (400 - this.range)) * 0.9})`;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        ctx.save();
                        simulation.camera();
                        if (this.distance < this.range && !this.capped) {
                            DrawTools.lightning(V.sub(this.pos, {
                                x: 300,
                                y: 300
                            }), V.add(this.pos, {
                                x: 300,
                                y: 300
                            }), simulation.cycle - 5);
                            DrawTools.lightning(V.add(this.pos, {
                                x: -300,
                                y: 300
                            }), V.add(this.pos, {
                                x: 300,
                                y: -300
                            }), simulation.cycle - 5);
                        }
                        if (!this.capped && cycle >= this.cap - 180) {
                            const multCoeff = (cycle - this.cap + 180) * 0.4
                            ctx.translate((Math.random() - 0.5) * multCoeff, (Math.random() - 0.5) * multCoeff);
                        }
                        ctx.shadowBlur = 20;
                        ctx.lineWidth = 12;
                        ctx.strokeStyle = (templePlayer.room2.cycles % 60 < 30) ? "#fff" : "#000";
                        ctx.shadowColor = (templePlayer.room2.cycles % 60 < 30) ? "#fff" : "#000";
                        DrawTools.arcOut(this.pos.x, this.pos.y, 100, 0, Math.PI * 2);
                        if (templePlayer.room2.cycles <= 100) {
                            for (let i = 0; i < this.ringNumber; i++) {
                                if (cycle < i * 90) break;
                                const ring = this.rings[i];
                                ctx.shadowColor = `rgb(${ring.colour.join(",")})`;
                                const opacity = this.capped ? 1 - 0.01 * templePlayer.room2.cycles : (cycle / 180 - i / 2);
                                ctx.strokeStyle = `rgba(${ring.colour.join(",")}, ${Math.min(opacity, 1)})`;
                                const radius = (this.capped ? 1 + 0.07 * templePlayer.room2.cycles : Math.sin(Math.min(cycle - i * 90, 45) / 90 * Math.PI)) * ring.radius;
                                DrawTools.arcOut(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
                            }
                        }
                        ctx.restore();
                    });
                }
            },
            room2Lightning: {
                one: [{
                    x: -1400,
                    y: -10400
                }, {
                    x: 1400,
                    y: -8500
                }],
                two: [{
                    x: -1400,
                    y: -8500
                }, {
                    x: 1400,
                    y: -10400
                }],
                get isHeal() {
                    return simulation.cycle % 360 < 180;
                },
                get oneEq() {
                    return Equation.fromPoints(this.one[0], this.one[1]);
                },
                get twoEq() {
                    return Equation.fromPoints(this.two[0], this.two[1]);
                },
                logic() {
                    if (!isInBound(secondRoomSpawnBounds) || !templePlayer.room2.cycles) return;

                    const playerbounds = Rect.fromBounds(player.bounds.min, player.bounds.max);
                    if (playerbounds.hasLine(this.oneEq) || playerbounds.hasLine(this.twoEq)) {
                        if (this.isHeal) {
                            m.energy += 0.003;
                        } else if (m.immuneCycle < m.cycle) {
                            m.energy -= 0.003;
                        }
                    }
                },
                draw() {
                    if (!isInBound(secondRoomBounds) || !templePlayer.room2.cycles) return;

                    const colour = this.isHeal ? undefined : [0, 0, 0];
                    DrawTools.lightning(...this.one, Math.floor(simulation.cycle / 15) * 15, 1, 9, colour);
                    DrawTools.lightning(...this.two, Math.floor(simulation.cycle / 15) * 15, 2, 9, colour);
                }
            },
            room2GeneratedPath: {
                rects: (function () {
                    const rects = [];
                    for (let i = 0; i < 4; i++) {
                        rects.push(new Rect(-1405 + (i & 1) * 200, -9700 + i * 300, 205, 30));
                        rects.push(new Rect(1200 - (i & 1) * 200, -9700 + i * 300, 205, 30));
                    }
                    return rects;
                })(),
                logic() {
                    if (templePlayer.room2.readyPathCycle && simulation.cycle - templePlayer.room2.readyPathCycle === 180) {
                        for (const r of this.rects) {
                            r.addToMap();
                            addPartToMap();
                            simulation.draw.setPaths();
                        }
                    }
                },
                draw() {
                    if (templePlayer.room2.readyPathCycle && simulation.cycle - templePlayer.room2.readyPathCycle < 180) {
                        ctx.fillStyle = "#fe79";
                        for (const r of this.rects) {
                            ctx.fillRect(r.pos.x, r.pos.y, r.width, r.height);
                        }
                    } else if (simulation.cycle - templePlayer.room2.readyPathCycle < 195) {
                        for (const r of this.rects) {
                            DrawTools.lightning(Objects.room2Initiator.pos, r.midPos, templePlayer.room2.readyPathCycle + 180);
                        }
                    }
                }
            },
            room3Rotors: {
                rotor1: (function () {
                    const rotor = level.spinner(900, -13700, 200, 30);
                    rotor.rotate = function () {
                        Matter.Body.setAngularVelocity(this.bodyB, (this.bodyB.angularVelocity + 0.01) * 0.9)
                    }
                    return rotor;
                })(),
                rotor2: (function () {
                    const rotor = level.spinner(2700, -13700, 200, 30);
                    rotor.rotate = function () {
                        Matter.Body.setAngularVelocity(this.bodyB, (this.bodyB.angularVelocity - 0.01) * 0.9)
                    }
                    return rotor;
                })(),
                logic() {
                    this.rotor1.rotate();
                    this.rotor2.rotate();
                }
            },
            room3SlimePits: {
                pit1: level.hazard(-100, -13400, 0, 0, 0.004),
                pit2: level.hazard(3700, -13400, 0, 0, 0.004),
                logic() {
                    if (templePlayer.room2ToRoom3Anim >= 1320 && templePlayer.room2ToRoom3Anim <= 1570) {
                        this.pit1.height = this.pit2.height = 300;
                        this.pit1.max.y = this.pit2.max.y = -13100;
                        this.pit1.width = this.pit2.width = templePlayer.room2ToRoom3Anim * 2 - 2640;
                        this.pit1.max.x = this.pit1.min.x + this.pit1.width;
                        this.pit2.min.x = this.pit2.max.x - this.pit2.width;
                    }
                    if (templePlayer.room3ToEndAnim) {
                        this.pit1.height = this.pit1.width = 0;
                        this.pit2.height = this.pit2.width = 0;
                    }
                },
                draw() {
                    this.pit1.query();
                    this.pit2.query();
                }
            }
        };
        let templePlayer = {
            room1: {
                cycles: 300
            },
            room2: {
                spawnInitiatorCycles: 0,
                cycles: 0,
                readyPathCycle: 0
            },
            stage: 1,
            startAnim: 0,
            room1ToRoom2Anim: 0,
            room2ToRoom3Anim: 0,
            room3ToEndAnim: 0,
            initialTrapY: 0,
            clearedCycle: 0,
            drawExit: true
        };

        const RoomTransitionHandler = {
            room0() {
                if (templePlayer.startAnim <= 0) return;
                templePlayer.startAnim++;
                if (templePlayer.startAnim == 60) {
                    makeLore("Not so fast.");
                }
                if (templePlayer.startAnim < 180) {
                    trapPlayer(1000, templePlayer.initialTrapY);
                } else {
                    level.exit.x = 4500;
                    level.exit.y = -2030;
                    relocateWIMPs(level.exit.x, level.exit.y);
                    relocateTo(50, -2050);
                    simulation.fallHeight = -1000;
                    level.defaultZoom = 1800
                    simulation.zoomTransition(level.defaultZoom)

                    templePlayer.startAnim = -1;
                    templePlayer.drawExit = false;
                }
            },
            room1() {
                const frame = templePlayer.room1ToRoom2Anim;
                if (frame <= 0) return;
                if (frame === 1) {
                    level.exit.x = -50;
                    level.exit.y = -10030;
                    makeLore("Pathetic.");
                }
                if (frame >= 1 && frame <= 360) {
                    const factor = 100 - 100 * Math.cos((frame / 90) * Math.PI);
                    ctx.translate(factor, factor);
                    Promise.resolve().then(() => {
                        ctx.save();
                        ctx.globalCompositeOperation = "color-burn";
                        ctx.fillStyle = DrawTools.randomColours((frame) * (360 - frame) / 32400);
                        DrawTools.updateRandomColours(5);
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.restore();
                    });
                }
                if (frame === 180) {
                    makeLore("You are trying too hard.");
                    relocateTo(0, -7050);
                    simulation.fallHeight = -6000;
                    templePlayer.stage = 2;
                    relocateWIMPs(level.exit.x, level.exit.y - 3000);
                }
                templePlayer.room1ToRoom2Anim++;
            },
            room2() {
                if (templePlayer.room2ToRoom3Anim <= 0) return;
                if (templePlayer.room2ToRoom3Anim === 1) {
                    level.exit.x = 3500;
                    level.exit.y = -13130;
                    makeLore("Do not try me.");
                }
                if (templePlayer.room2ToRoom3Anim >= 1 && templePlayer.room2ToRoom3Anim <= 180) {
                    canvas.style.filter = `sepia(${templePlayer.room2ToRoom3Anim / 180}) invert(${templePlayer.room2ToRoom3Anim / 180})`;
                }
                if (templePlayer.room2ToRoom3Anim === 180) {
                    templePlayer.stage = 3;
                    relocateTo(50, -13150);
                    simulation.fallHeight = -10000;
                    simulation.zoomTransition(1800);
                    templePlayer.startAnim = -1;
                    // Might be a bit harsh to the player if the WIMPs are involved in the third level
                    for (let i = 0; i < mob.length; i++) {
                        while (mob[i] && !mob[i].isWIMP) {
                            mob[i].replace(i);
                        }
                    }
                    templePlayer.drawExit = true;
                    for (let i = 0; i < 7 * tech.wimpCount; i++) {
                        powerUps.spawn(level.exit.x + 100 * (Math.random() - 0.5), level.exit.y - 100 + 100 * (Math.random() - 0.5), "research", false);
                    }
                    canvas.style.filter = "";
                }
                if (templePlayer.room2ToRoom3Anim > 180 && templePlayer.room2ToRoom3Anim <= 360) {
                    canvas.style.filter = `sepia(${(360 - templePlayer.room2ToRoom3Anim) / 180}) invert(${(360 - templePlayer.room2ToRoom3Anim) / 180})`;
                }
                templePlayer.room2ToRoom3Anim++;
            },
            room3() {
                if (templePlayer.room3ToEndAnim <= 0) return;
                if (templePlayer.room3ToEndAnim === 1) {
                    const x = "Nooooooooooo".split("");
                    for (let i = 0; i < x.length / 1.6; i++) {
                        const randomIndex = Math.floor(Math.random() * x.length);
                        if (x[randomIndex] !== " ") {
                            x[randomIndex] = String.fromCharCode(Math.floor(Math.random() * 50) + 192);
                        }
                    };
                    makeLore(x.join(""));
                }
                templePlayer.room3ToEndAnim++;
            },
            end() {
                if (!templePlayer.clearedCycle) return;
                Promise.resolve().then(() => {
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.fillStyle = `rgba(0, 0, 0, ${(simulation.cycle - templePlayer.clearedCycle) / 30})`;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.restore();
                });
                if (simulation.cycle - templePlayer.clearedCycle > 30) level.nextLevel();
            }
        };
        const LogicHandler = {
            bounds() {
                let isInBounds = false;
                for (const b of bounds) {
                    if (isInBound(b)) {
                        isInBounds = true;
                        break;
                    }
                }
                if (!isInBounds) {
                    m.takeDamage(0.1 * simulation.difficultyMode);
                    trapPlayer(level.enter.x, level.enter.y);
                    simulation.inGameConsole("<span style='color: #f00'>" + name + "</span>: &nbsp; You thought I could let you get away with that?");
                }
            },
            room0() {
                // Block the player from entering the first seemingly innocuous exit
                if ((m.pos.x > 1000) && templePlayer.startAnim === 0) {
                    spawn.mapRect(1200, -500, 100, 600);
                    templePlayer.initialTrapY = Math.min(player.position.y, -75);
                    trapPlayer(1000, templePlayer.initialTrapY);

                    addPartToMap();
                    simulation.draw.setPaths();
                    templePlayer.startAnim = 1;
                }
            },
            room1() {
                WaveHandler.room1();
                Objects.altar.logic();
            },
            room2() {
                room2SlimePit.logic();
                Objects.room2Initiator.logic();
                Objects.room2Lightning.logic();
                Objects.room2GeneratedPath.logic();
                WaveHandler.room2();
            },
            room3() {
                Objects.room3Rotors.logic();
                Objects.room3SlimePits.logic();
                WaveHandler.room3();
            },
            exit() {
                if (!templePlayer.drawExit) return;
                if (player.position.x > level.exit.x &&
                    player.position.x < level.exit.x + 100 &&
                    player.position.y > level.exit.y - 150 &&
                    player.position.y < level.exit.y - 40 &&
                    player.velocity.y < 0.1 &&
                    level.exitCount + (input.down ? 8 : 2) > 100) {
                    if (templePlayer.stage === 1) {
                        templePlayer.drawExit = false;
                        level.exitCount = 0;
                        templePlayer.room1ToRoom2Anim = 1;
                    } else if (templePlayer.stage === 2) {
                        templePlayer.drawExit = false;
                        templePlayer.room2ToRoom3Anim = 1;
                        level.exitCount = 0;
                    } else {
                        level.exitCount = 99 - (input.down ? 8 : 2);
                        if (!templePlayer.clearedCycle) templePlayer.clearedCycle = simulation.cycle;
                    }
                }
            }
        };
        const DrawHandler = {
            // Bottom layer
            base() {
                // Draw base red background
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = color.map;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();

                // Draw the normal bg on the bounds
                ctx.fillStyle = "#eab6af";
                for (const b of bounds) {
                    if (isInBound(b)) ctx.fillRect(b.pos.x + 2, b.pos.y + 2, b.width - 4, b.height - 4);
                }
            },
            entrance() {
                ctx.beginPath();
                ctx.moveTo(level.enter.x, level.enter.y + 30);
                ctx.lineTo(level.enter.x, level.enter.y - 80);
                ctx.bezierCurveTo(level.enter.x, level.enter.y - 170, level.enter.x + 100, level.enter.y - 170, level.enter.x + 100, level.enter.y - 80);
                ctx.lineTo(level.enter.x + 100, level.enter.y + 30);
                ctx.lineTo(level.enter.x, level.enter.y + 30);
                ctx.fillStyle = "#fca";
                ctx.fill();
            },
            room1() {
                if (!isInBound(firstRoomBounds)) return;

                // Draw Cross
                ctx.fillStyle = "#fed";
                ctx.fillRect(2200, -3300, 200, 800);
                ctx.fillRect(2000, -3100, 600, 200);

                // Final boss-like spawn fire thing. Was it necessary? No!
                const spawnFlameAngle = Math.min(Math.min(templePlayer.room1.cycles, 2520) % 600, 120) * Math.PI / 30 + Math.PI / 2;
                DrawTools.flame([2300, -3000, 26, 4, "#f60", spawnFlameAngle], 7);

                Objects.altar.drawBottom();
            },
            room2() {
                if (!isInBound(secondRoomBounds)) return;

                if (templePlayer.room2.cycles) {
                    ctx.fillStyle = "#0006";
                    ctx.fillRect(secondRoomBounds.pos.x + 2, secondRoomBounds.pos.y + 2, secondRoomBounds.width - 4, secondRoomBounds.height - 4);
                }
                room2SlimePit.draw();
            },
            room3() {
                if (!isInBound(thirdRoomBounds)) return;
                ctx.fillStyle = "#0006";
                ctx.fillRect(thirdRoomBounds.pos.x + 2, thirdRoomBounds.pos.y + 2, thirdRoomBounds.width - 4, thirdRoomBounds.height - 4);
                Objects.room3SlimePits.draw();
            },
            // Top layer
            mobTrails() {
                if (simulation.cycle % 4 === 0) {
                    let newMobPositions = [];
                    for (const i of mob) {
                        if (!(i.isDarkMatter || i.isWIMP || i.isObstacle)) newMobPositions.push({
                            x: i.position.x,
                            y: i.position.y
                        });
                    }
                    mobPositionsQueue.shift();
                    mobPositionsQueue.push(newMobPositions);
                }
                // Draw "holy" trails for mobs for no particular reason at all
                ctx.strokeStyle = "#bae";
                ctx.lineWidth = 3;
                for (let i = 0; i < 10; i++) {
                    const p = mobPositionsQueue[i];
                    for (const m of p) {
                        DrawTools.holy(m.x, m.y, i / 2 + 10);
                    }
                }
                ctx.shadowBlur = 0;
            },
            waveTimer() {
                const roomConditions = [
                    isInBound(firstRoomBounds) && templePlayer.room1.cycles < 2400,
                    isInBound(secondRoomBounds) && templePlayer.room2.cycles > 0 && templePlayer.room2.cycles < 2160,
                    isInBound(thirdRoomBounds) && templePlayer.room2ToRoom3Anim < 540
                ];
                Promise.resolve(roomConditions).then(roomConditions => {
                    // First Room
                    if (roomConditions[0]) {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.fillStyle = "#0004";
                        ctx.fillRect(canvas.width2 - 288, 50, 576, 20);
                        ctx.fillStyle = "#0cf";
                        ctx.fillRect(canvas.width2 - 288, 50, 0.96 * (600 - templePlayer.room1.cycles % 600), 20);
                        ctx.restore();
                    }
                    // Second Room
                    if (roomConditions[1]) {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.fillStyle = "#0004";
                        ctx.fillRect(canvas.width2 - 288, 50, 576, 20);
                        ctx.fillStyle = (Math.ceil(templePlayer.room2.cycles / 720) & 1) ? "#000" : "#e1d7ff";
                        ctx.fillRect(canvas.width2 - 288, 50, 0.8 * (720 - templePlayer.room2.cycles % 720), 20);
                        ctx.restore();
                    }
                    // Third Room
                    if (roomConditions[2]) {
                        ctx.save();
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        ctx.fillStyle = "#0004";
                        ctx.fillRect(canvas.width2 - 288, 50, 576, 20);
                        ctx.fillStyle = "#000";
                        ctx.fillRect(canvas.width2 - 288, 50, 1.6 * (540 - templePlayer.room2ToRoom3Anim), 20);
                        ctx.restore();
                    }
                });
            },
            room2Top() {
                if (!isInBound(secondRoomBounds)) return;
                Objects.room2Lightning.draw();
                Objects.room2GeneratedPath.draw();
                Objects.room2Initiator.draw();
            }
        };
        const WaveHandler = {
            room1() {
                if (!isInBound(firstRoomBounds)) return;
                if (templePlayer.room1.cycles === 0) powerUps.spawnStartingPowerUps(0, -2050);
                templePlayer.room1.cycles++;
                if (templePlayer.room1.cycles === 2400) {
                    spawn.secondaryBossChance(2300, -2800);
                    powerUps.addResearchToLevel();
                }
                if (templePlayer.room1.cycles % 600 === 0 && templePlayer.room1.cycles <= 2400) {
                    const spawnAmt = Math.min(3 + Math.pow(simulation.difficulty / 1.7, 0.6), 10) + Math.floor(templePlayer.room1.cycles / 720);
                    for (let i = 0; i < spawnAmt; i++) {
                        if (Math.random() < 0.5 + 0.07 * simulation.difficulty) {
                            spawn.randomMob(800 + Math.random() * 3e3, -2400 - Math.random() * 600, Infinity);
                        }
                    }
                    spawn.randomMob(800 + Math.random() * 3e3, -2400 - Math.random() * 600, Infinity);
                }
                if (templePlayer.room1.cycles === 2520) {
                    templePlayer.drawExit = true;
                }
            },
            room2() {
                if (!isInBound(secondRoomBounds)) return;
                if (templePlayer.room2.spawnInitiatorCycles > Objects.room2Initiator.cap) {
                    const randomSecondRoomBoss = [secondRoomSuckerBoss, secondRoomPlacerBoss];
                    if (templePlayer.room2.cycles % 720 === 0 && templePlayer.room2.cycles <= 2160) {
                        const isOdd = Math.floor(templePlayer.room2.cycles / 720) & 1;
                        randomSecondRoomBoss[Math.floor(randomSecondRoomBoss.length * Math.random())](-600, -9800, isOdd);
                        randomSecondRoomBoss[Math.floor(randomSecondRoomBoss.length * Math.random())](600, -9800, isOdd);
                        randomSecondRoomBoss[Math.floor(randomSecondRoomBoss.length * Math.random())](0, -9800, !isOdd);
                    }
                    templePlayer.room2.cycles++;
                    if (templePlayer.room2.cycles === 2400) {
                        templePlayer.drawExit = true;
                        templePlayer.room2.readyPathCycle = simulation.cycle;
                    }
                }
            },
            room3() {
                if (templePlayer.room2ToRoom3Anim === 540) {
                    thirdRoomBoss(1800, -13700);
                    for (let i = 0; i < 3; i++) {
                        powerUps.spawn(m.spawnPos.x, m.spawnPos.y, "heal");
                    }
                }
            }
        };
        const DrawTools = {
            randomColours(alpha = 1) {
                return `rgba(${this._randomColours.join(",")},${alpha})`
            },
            _randomColours: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
            updateRandomColours(x = 0.8) {
                for (let i = 0; i < this._randomColours.length; i++) {
                    this._randomColours[i] = Math.max(Math.min(this._randomColours[i] + (this.randFact() * x * 2) - x, 255), 0);
                }
            },
            randFact() {
                return Math.random() * 0.8 + Math.sin(Date.now() / 300) * 0.2;
            },

            line(vecs) {
                ctx.beginPath();
                ctx.moveTo(vecs[0].x, vecs[0].y);
                for (const v of vecs.slice(1)) ctx.lineTo(v.x, v.y);
                ctx.stroke();
            },
            arc(...x) {
                ctx.beginPath();
                ctx.arc(...x);
                ctx.fill();
            },
            arcOut(...x) {
                ctx.beginPath();
                ctx.arc(...x);
                ctx.stroke();
            },
            flame(props, repeat) {
                for (let i = 0; i < repeat; i++) this.singleFlame(...props);
            },
            singleFlame(x, y, size = 10, repeat = 3, color = "#f00", angle = Math.PI / 2) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                const path = [{
                    x,
                    y
                }];
                for (let i = 0; i < repeat; i++) {
                    const randAng = (Math.random() - 0.5) * 2 + angle;
                    const randLen = 2 * size + Math.random() * size;

                    x += Math.cos(randAng) * randLen;
                    y -= Math.sin(randAng) * randLen;
                    path.push({
                        x,
                        y
                    })
                }
                DrawTools.line(path);
            },
            lightning(from, to, cycle, randomPRNGMult = 1, width = 8, color = [255, 240, 127]) {
                const diff = simulation.cycle - cycle;
                if (diff >= 15) return;
                ctx.strokeStyle = `rgba(${color.join(",")},${(1 - diff / 15) * 255})`;
                ctx.lineWidth = width * (1 - diff / 15);
                ctx.shadowColor = `rgb(${color.join(",")})`;
                ctx.shadowBlur = 20;
                const path = [{
                    x: from.x,
                    y: from.y
                }];
                let vector = {
                    x: from.x,
                    y: from.y
                };
                let distanceLeft = V.magnitude(V.sub(from, to));
                const d = distanceLeft > 800 ? distanceLeft / 40 : 20;
                const normalised = V.normalise(V.sub(to, from));
                while (1) {
                    const randOffset = rotateVector({
                        y: RNG(Math.floor(cycle * randomPRNGMult + distanceLeft)) * 2 * d - d,
                        x: 0
                    }, normalised);
                    const randLen = RNG(Math.floor(cycle * (randomPRNGMult + 1) + distanceLeft)) * d + d;
                    distanceLeft -= randLen;
                    if (distanceLeft <= 0) {
                        path.push({
                            x: to.x,
                            y: to.y
                        });
                        break;
                    }
                    vector = V.add(vector, V.mult(normalised, randLen));
                    path.push({
                        x: vector.x + randOffset.x,
                        y: vector.y + randOffset.y
                    });
                }
                DrawTools.line(path);
                ctx.shadowBlur = 0;
            },
            holy(x, y, size = 12) {
                this.line([{
                    x,
                    y: y - size
                }, {
                    x: x - size,
                    y
                },
                {
                    x,
                    y: y + size
                }, {
                    x: x + size,
                    y
                }, {
                    x,
                    y: y - size
                }
                ]);
            }
        };

        function RNG(x) {
            x += Math.seed;
            let start = Math.pow(x % 97, 4.3) * 232344573;
            const a = 15485863;
            const b = 521791;
            start = (start * a) % b;
            for (let i = 0; i < (x * x) % 90 + 90; i++) {
                start = (start * a) % b;
            }
            return start / b;
        }

        function rotateVector(v, ang) {
            const c = typeof ang === "number" ? {
                x: Math.cos(ang),
                y: Math.sin(ang)
            } : V.normalise(ang);
            return {
                x: v.x * c.x - v.y * c.y,
                y: v.y * c.x + v.x * c.y
            };
        }

        function trapPlayer(x, y) {
            setPosAndFreeze(player, {
                x,
                y
            });
            const bLen = bullet.length;
            for (let i = 0; i < bLen; i++) {
                if (bullet[i].botType) setPosAndFreeze(bullet[i], V.add(player.position, {
                    x: 100 * (RNG(i) - 0.5),
                    y: 100 * (RNG(i + bLen) - 0.5)
                }));
            }
        }

        function relocateTo(x, y) {
            level.setPosToSpawn(x, y);
            trapPlayer(x, y);
            for (let i = 0; i < mob.length; i++) {
                if (mob[i].isDarkMatter) {
                    setPos(mob[i], {
                        x,
                        y
                    });
                    break;
                }
            }
            m.resetHistory();
        }
        const distance = (a, b) => V.magnitude(V.sub(a, b));
        const angle = (a, b) => Math.atan2(b.y - a.y, a.x - b.x);
        const setPos = (a, b) => Matter.Body.setPosition(a, b);
        const setVel = (a, b) => Matter.Body.setVelocity(a, b);
        const freeze = a => setVel(a, {
            x: 0,
            y: 0
        });
        const setPosAndFreeze = (a, b) => {
            setPos(a, b);
            freeze(a);
        };
        const makeLore = (x, t) => simulation.inGameConsole(`<h2 class='color-censored' style='color: #f00; display: inline-block'>${name}:</h2> &nbsp; <h3 style='display: inline-block'>${x}</h3>`, t);
        level.custom = () => {
            // All the logic gets handled here. How nice!
            for (const i in LogicHandler) {
                LogicHandler[i]();
            }

            // Animations and lore for things that seem like exits
            for (const i in RoomTransitionHandler) {
                RoomTransitionHandler[i]();
            }

            // Bottom layer graphics
            DrawHandler.base();
            DrawHandler.room1();
            DrawHandler.room2();
            DrawHandler.room3();
            DrawHandler.entrance();
            if (templePlayer.drawExit) level.exit.drawAndCheck();
        };
        level.customTopLayer = () => {
            // Top layer graphics
            DrawHandler.mobTrails();
            Objects.altar.drawTop();
            DrawHandler.waveTimer();
            DrawHandler.room2Top();
        };
    },
    dripp() {
        simulation.inGameConsole(`<strong>dripp</strong> by <span class='color-var'>M. B.</span>`);

        const door = level.door(780, -350, 15, 400, 265);
        const buttonDoor = level.button(420, -10);
        const boost = level.boost(130, -445);
        const hazard = level.hazard(690, -1050, 10, 700, 0.4)
        const hazard2 = level.hazard(2470, -1515, 162, 14, 0.4)
        const hazard3 = level.hazard(740, -1050, 10, 700, 0.4)
        const hazard4 = level.hazard(3400, -380, 350, 6, 0.2)
        const hazard5 = level.hazard(3425, -1420, 400, 8, 0.2)
        const slimePit = level.hazard(2250, -100, 2700, 200, 0.004)
        const door2 = level.door(3131, -898, 40, 520, 522)
        const buttonDoor2 = level.button(2495, -270)
        const toggle = level.toggle(1463, -708, true)
        const elevator = level.elevator(4310, -150, 200, 50, -1443, 0.0025, {
            up: 0.1,
            down: 0.2
        })
        const portal = level.portal({ //main portals
            x: 2117,
            y: -1560
        }, -2 * Math.PI, { //up
            x: -80,
            y: -475
        }, -Math.PI / 100) //up

        const drip1 = level.drip(4100 + 1000 * Math.random(), -1900, 50, 100) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip2 = level.drip(4100 + 1000 * Math.random(), -1900, 50, 207) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip3 = level.drip(4100 + 1000 * Math.random(), -1900, 50, 133) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {
        const drip4 = level.drip(4100 + 1000 * Math.random(), -1900, 50, 157) // drip(x, yMin, yMax, period = 100, color = "hsla(160, 100%, 35%, 0.5)") {

        level.custom = () => {
            level.exit.drawAndCheck();

            drip1.draw()
            drip2.draw()
            drip3.draw()
            drip4.draw()
            buttonDoor.query();
            buttonDoor.draw();
            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            door.openClose();

            buttonDoor2.query();
            buttonDoor2.draw();
            if (buttonDoor2.isUp) {
                door2.isClosing = true
            } else {
                door2.isClosing = false
            }
            door2.openClose();

            // shadow/shades builds  
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(3169, -900, 891, 580)
            ctx.fillRect(417, -1057, 380, 730)
            ctx.fillRect(930, -515, 207, 520)
            ctx.fillRect(930, -1280, 207, 760)
            ctx.fillRect(1220, -1280, 54, 800)
            ctx.fillRect(1221, -1394, 451, 1398)
            ctx.fillRect(1924, -800, 219, 674)
            ctx.fillRect(2264, -1488, 214, 1550)
            ctx.fillRect(2631, -1488, 201, 1550)
            ctx.fillRect(2889, -930, 237, 1090)
            ctx.fillRect(3124, -311, 957, 360)
            ctx.fillRect(1919, -1480, 220, 700)
            // ctx.fillRect(1768, -1200, 71, 500)
            level.enter.draw();
            elevator.move();
            toggle.query();
        };
        level.customTopLayer = () => {
            boost.query();
            hazard.opticalQuery();
            hazard2.opticalQuery();
            hazard3.opticalQuery();
            hazard4.opticalQuery();
            hazard5.opticalQuery();
            slimePit.query();
            // slimePit.draw();
            hazard.isOn = toggle.isOn
            hazard3.isOn = toggle.isOn
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[2].query()
            portal[3].query()
        };
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 1400;
        level.exit.y = -1500;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";

        //builds   
        spawn.mapRect(-100, 0, 1485, 100);
        spawn.mapRect(-279, -750, 200, 850);
        spawn.mapRect(1781, -125, 375, 75);
        spawn.mapRect(1670, -100, 590, 200);
        spawn.mapRect(2261, 50, 3100, 50);
        spawn.mapRect(2420, -260, 300, 50);
        spawn.bodyRect(235, -240, 50, 50, 1, spawn.propSLide)
        spawn.mapRect(410, -1100, 400, 50);
        spawn.mapRect(1220, -1470, 420, 80)
        spawn.mapRect(927, -1325, 220, 50);
        spawn.mapRect(4950, -200, 425, 375);
        spawn.bodyRect(5200, -300, 100, 100);

        //random builds
        spawn.mapRect(2150, 50, 225, 50);

        //large border walls
        spawn.mapRect(-300, -2375, 6075, 475);
        spawn.mapRect(-951, -2374, 675, 2476);
        spawn.mapRect(-950, 100, 6950, 500);
        spawn.mapRect(5300, -2374, 700, 2700);

        // create enemies
        spawn.randomMob(3000, -300, 0.5);
        spawn.randomMob(1900, -1000, 0.5);
        spawn.randomMob(2960, -800, 0.6)
        spawn.randomMob(3500, -1700, 0.4)
        spawn.randomMob(800, -1700, 0.6)
        spawn.randomMob(100, -1150, 0.6)
        spawn.randomMob(1095, -700, 0.6)

        //powerUps    
        powerUps.spawn(590, -200, "ammo")
        powerUps.spawn(600, -200, "heal")
        // powerUps.spawn(590, -200, "gun")
        powerUps.spawnStartingPowerUps(590, -200);

        // more builds
        spawn.blockDoor(1230, -1490)
        // spawn.blockDoor(728, -1130);
        spawn.mapRect(-100, -380, 900, 50);
        spawn.mapRect(-279, -1400, 200, 650);
        spawn.mapRect(-279, -1900, 200, 650);
        // spawn.mapRect(-100, -1900, 2300, 75);
        // spawn.mapRect(2200, -1900, 1025, 75);
        // spawn.mapRect(2700, -1900, 2000, 75);
        spawn.mapRect(2270, -1530, 199, 50);
        spawn.mapRect(2633, -1530, 199, 50)
        // spawn.mapRect(4570, -1825, 125, 1925);
        spawn.mapRect(3106, -400, 300, 50)
        spawn.mapRect(3750, -400, 330, 50)
        spawn.mapRect(3130, -1030, 930, 130);
        spawn.mapRect(4015, -900, 46, 275);
        spawn.blockDoor(4016, -400)
        spawn.mapRect(3168, -1440, 290, 50);
        spawn.mapRect(3771, -1440, 294, 50);
        spawn.mapRect(3106, -355, 974, 42);
        spawn.mapRect(3228, -1395, 834, 380);
        spawn.mapRect(3129, -1350, 100, 325);
        spawn.mapRect(3129, -1400, 175, 100);
        spawn.mapRect(3129, -1437, 125, 75);
        spawn.mapRect(1382, 0, 295, 100);
        spawn.mapRect(1600, -50, 560, 85);
        spawn.mapRect(2264, -945, 220, 50);
        spawn.mapRect(1925, -800, 220, 50);
        spawn.mapRect(1390, -700, 260, 50);
        spawn.mapRect(927, -520, 220, 50);
        spawn.mapRect(2894, -948, 300, 50)
        spawn.mapRect(1230, -1825, 440, 81);
        spawn.mapRect(1616, -1750, 54, 360);
        spawn.mapRect(3128, -1440, 50, 50);
        spawn.mapRect(1705, -120, 125, 75);
        spawn.mapRect(1550, -25, 150, 50);
        spawn.mapRect(1628, -75, 100, 50);
        spawn.mapRect(1729, -130, 650, 75);
        //ground for blue portal
        spawn.mapRect(1917, -1484, 300, 50);
        spawn.mapRect(1917, -1950, 200, 325);
        spawn.mapRect(1917, -1825, 50, 375);

        //split
        spawn.mapRect(1221, -1420, 57, 465);
        spawn.mapRect(1221, -634, 57, 450);
        spawn.bodyRect(1227, -105, 42, 189, 1, spawn.propSlide)
        // spawn.mapRect(1770, -1900, 70, 750);
        spawn.mapRect(1770, -780, 70, 400)
        spawn.bodyRect(1783, -289, 38, 250, 1, spawn.propSlide)
        if (simulation.difficulty > 1) spawn.randomLevelBoss(4800, -750);
        spawn.secondaryBossChance(4700, -1500)

        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    fortress() {
        simulation.inGameConsole(`<strong>fortress</strong> by <span class='color-var'>Desboot</span>`);
        const boost1 = level.boost(3600, -250, 1000)
        const boost2 = level.boost(60, -604, 1000)
        const boost3 = level.boost(2160, -1260, 1000)
        powerUps.spawnStartingPowerUps(1033.3, -121.4)
        level.custom = () => {
            boost1.query();
            boost2.query();
            boost3.query();
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 3586; //3586.5, -1464.0
        level.exit.y = -1494;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(0,0,0,0.3)"
            ctx.fillRect(-272, -580, 1700, 600)
            ctx.fillRect(1427.5, -487, 1280, 600)
            ctx.fillRect(2707.3, -580, 1200, 600)
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(2752, -1744, 1075, 1164)
            ctx.fillRect(937, -1590, 339, 550)
            ctx.fillRect(1158, -1040, 118, 550)
            ctx.fillRect(3049, -1063, 339, 500)
            ctx.fillRect(1439, -1281, 297, 800)
            ctx.fillRect(2130, -1182, 167, 800)
            ctx.fillRect(1892, -2073, 238, 1593)
            ctx.fillRect(2297, -2073, 238, 1593)
            ctx.fillStyle = "rgba(0,0,0,0.15)"
            ctx.fillRect(483, -1277, 350, 700)
            ctx.fillRect(833, -1000, 325, 450)
            ctx.fillStyle = "rgba(64,64,64,0.97)" //hidden section
            ctx.fillRect(2800, -1712, 730, 300)
        };

        spawn.debris(2700, -120, 180, 3);
        spawn.debris(1350, -100, 280, 3);
        spawn.debris(2300, -700, 380, 5);
        spawn.debris(976, -775, 38, 5);
        spawn.debris(840, -1424, 3080, 5);
        spawn.debris(2300, -700, 3080, 5);

        spawn.mapRect(-272, 0, 4198, 123);
        spawn.mapRect(-272, -581, 132, 581);
        spawn.mapRect(-272, -581, 572, 326);
        spawn.mapRect(1462, -229, 92, 229);
        spawn.mapRect(1462, -229, 352, 57);
        spawn.mapRect(2872, -220, 1056, 330);
        spawn.mapRect(170, -260, 484, 80);
        spawn.mapRect(476, -581, 1162, 75);
        spawn.mapRect(951, -519, 1760, 132);
        spawn.mapRect(1747, -492, 506, 66);
        spawn.mapRect(2462, -581, 1074, 75);
        spawn.mapRect(1136, -616, 510, 100);
        spawn.mapRect(3815.6, -1461, 114, 1300); //far right wall
        spawn.mapRect(480, -1456, 106, 651); //far left wall
        spawn.mapRect(1426, -906, 106, 400);
        spawn.mapRect(480, -1302, 374, 57);
        spawn.mapRect(788, -1302, 75, 308);
        spawn.mapRect(788, -1055, 370, 62);
        spawn.mapRect(3049, -1170, 471, 106);
        spawn.mapRect(3348, -1170, 188, 663);
        spawn.mapRect(2751, -1461, 1088, 53); //roof under the exit
        spawn.mapRect(2751, -1743, 92, 915); //wall on left or far right side
        spawn.mapRect(937, -1667, 339, 84); //upper left platform
        spawn.mapRect(1135, -3239, 119, 1450);
        spawn.mapRect(1440, -1346, 295, 66); //center left platform
        spawn.mapRect(2090, -1240, 242, 57); //center righ platform
        spawn.mapRect(1892, -2214, 88, 220); //vertical part of left L
        spawn.mapRect(1892, -2073, 238, 84); //flat part of left L
        spawn.mapRect(2447, -2214, 88, 220); //vertical part of right L
        spawn.mapRect(2297, -2073, 238, 84); //flat part of right L
        spawn.mapRect(2751, -1743, 1078, 57); //exit roof //3587.2, -1470.0
        spawn.mapRect(3584, -1470, 103, 57); //wall below door3689
        spawn.mapRect(3428, -1735, 103, 173); //wall covering secret

        spawn.mapRect(-11000, -1000, 100, 10); //SAL
        spawn.mapRect(-11000, -1000, 10, 100); //SAL
        spawn.mapRect(-10900, -900, 10, 100); //SAL
        spawn.mapRect(-11000, -900, 100, 10); //SAL
        spawn.mapRect(-11000, -800, 100, 10); //SAL
        spawn.mapRect(-10800, -1000, 10, 200); //SAL
        spawn.mapRect(-10700, -1000, 10, 200); //SAL
        spawn.mapRect(-10800, -1000, 100, 10); //SAL
        spawn.mapRect(-10800, -900, 100, 10); //SAL
        spawn.mapRect(-10600, -1000, 10, 200); //SAL
        spawn.mapRect(-10600, -800, 100, 10); //SAL

        spawn.mapRect(-11000, -91000, 100, 10); //SAL
        spawn.mapRect(-11000, -91000, 10, 100); //SAL
        spawn.mapRect(-10900, -90900, 10, 100); //SAL
        spawn.mapRect(-11000, -90900, 100, 10); //SAL
        spawn.mapRect(-11000, -90800, 100, 10); //SAL
        spawn.mapRect(-10800, -91000, 10, 200); //SAL
        spawn.mapRect(-10700, -91000, 10, 200); //SAL
        spawn.mapRect(-10800, -91000, 100, 10); //SAL
        spawn.mapRect(-10800, -90900, 100, 10); //SAL
        spawn.mapRect(-10600, -91000, 10, 200); //SAL
        spawn.mapRect(-10600, -90800, 100, 10); //SAL
        //mobs
        spawn.randomMob(3104.9, -1284.9, 0.2);
        spawn.randomMob(1784.7, -95.9, 0.2);
        spawn.randomMob(3474.2, -406.7, 0.1);
        spawn.randomMob(1603.2, -1493.5, 0.4);
        spawn.randomMob(772.4, -1505.2, 0.2);
        spawn.randomMob(824.6, -781.3, 0.2);
        spawn.randomMob(818.8, -1468.9, 0.2);
        spawn.randomMob(-124.7, -853, 0.2);
        spawn.randomMob(3011.1, -1978.0, -0.2);
        spawn.randomMob(2428.0, -236.8, 0.1);
        spawn.randomSmallMob(694.3, -385.3);
        spawn.randomSmallMob(1142.0, -808.4);
        spawn.randomSmallMob(791.5, -803.7);
        spawn.randomSmallMob(3175.8, -830.8);
        spawn.randomSmallMob(1558.5, -1940.8);
        spawn.randomSmallMob(2700, -475);
        spawn.randomSmallMob(2700, -475);
        spawn.pulsar(1762.9, -2768.3)
        spawn.pulsar(3821.5, -2373.9)
        let randomBoss = Math.floor(Math.random() * 5);
        spawn[["laserBoss", "blinkBoss", "shooterBoss", "launcherBoss", "pulsarBoss", "beetleBoss", "bladeBoss", "revolutionBoss", "dragonFlyBoss", "spiderBoss"][randomBoss]](2058.5, -711.4, 100, false);

        //spawn powerups
        // powerUps.spawn(3167.6, -1300, "tech")
        powerUps.spawn(3125.8, -1543.4, "tech")
        powerUps.spawn(3125.8, -1543.4, "heal")
        powerUps.spawn(3125.8, -1543.4, "ammo")
        powerUps.spawn(3125.8, -1543.4, "ammo")
        powerUps.spawn(3137.6, -1300, "ammo")
        powerUps.spawn(1605.2, -1436.9, "heal")
        powerUps.spawn(2912.9, -1940.9, "ammo")
        powerUps.spawn(3167.6, -1300, "heal")
        powerUps.spawn(1, 1, "ammo")
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    commandeer() {
        simulation.inGameConsole(`<strong>commandeer</strong> by <span class='color-var'>Desboot</span>`);

        let waterFallWidth = 400
        let waterFallX = 15900
        let waterFallSmoothX = 0
        const elevator = level.elevator(-80.4, -931.6, 180, 50, -1550)
        15900 && player.position.x < 16300 && player.position.y > -960.2
        //const slime = level.hazard(15900, -960, 400, 6000);
        const slime2 = level.hazard(15147.2, -1782.4, 2000, 822);
        const boost1 = level.boost(5950, -20, 700)
        const boost2 = level.boost(21088, -1672, 700)
        const boost3 = level.boost(19390, -31, 1700)
        const boost4 = level.boost(19390, -31, 1700)
        const boost5 = level.boost(17274, -1242, 1000)
        const portal = level.portal({ x: 443, y: -1636 }, Math.PI, { x: 21391.9, y: -1806.3 }, -Math.PI)
        const portal2 = level.portal({ x: 16838.3, y: -626.7 }, Math.PI, { x: 16882.8, y: -2566.5 }, -Math.PI)
        const buttonDoor = level.button(21889, -10)
        const door = level.door(19119, -2133, 110, 510, 480)
        const buttonDoor2 = level.button(18711, -2210)
        const door2 = level.door(17041, -412, 110, 510, 480)
        const buttonDoor3 = level.button(20456.6, -1636.2)
        const door3 = level.door(20238, -781.4, 88, 452, 412)
        const hazard2 = level.hazard(2550, -150, 10, 0.4)               //y=-1485

        // simulation.enableConstructMode()
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 15316;
        level.exit.y = -30;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#001738";
        color.map = "#444" //custom map color



        level.custom = () => {
            //spawn.mapRect(22330, -2688.75, 400, 800);
            //spawn.mapRect(22330, -1793.5, 400, 800);//-46.25*2=-92.5
            //spawn.mapRect(22330, -804.25, 400, 800);//-46.25*3


            ctx.fillStyle = "rgba(250,250,250,0.8)"//lights
            ctx.beginPath()
            ctx.moveTo(1124, -628)
            ctx.lineTo(496, 0)
            ctx.lineTo(1852, 0)
            ctx.lineTo(1224, -628)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(906, -1365)
            ctx.lineTo(206, -690)
            ctx.lineTo(1706, -690)
            ctx.lineTo(1006, -1365)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(3330, -1905)//-700
            ctx.lineTo(2815.6, -1405.8)
            ctx.lineTo(2815.6, -1230)
            ctx.lineTo(4022.9, -1283.9)
            ctx.lineTo(4023.5, -1405.8)
            ctx.lineTo(3430, -1905)

            ctx.fill()




            ctx.fillStyle = "rgba(63,247,251,0.8)"
            ctx.fillRect(22330, -2713.75, 550, 700)//15845.0, -1262.2
            ctx.fillRect(22330, -1743.5, 550, 700)
            ctx.fillRect(22330, -754.25, 550, 700)

            ctx.fillRect(6237, -1830.7, 550, 700)
            ctx.fillRect(6237, -840.4, 550, 700)
            ctx.fillStyle = "rgba(200,200,200,0.8)"
            ctx.fillRect(-192, -1973, 6484, 2071)
            ctx.fillStyle = "rgba(240,240,240,0.8)"

            ctx.fillRect(15109.5, -2867.5, 7284, 2971)
            ctx.fillStyle = "rgba(35,35,35,0.8)"
            ctx.fillRect(15145.9, -960, 200, 25)




            ctx.fillStyle = "rgba(255,255,255,0.9)"





            buttonDoor.query();
            buttonDoor.draw();
            buttonDoor2.query();
            buttonDoor2.draw();
            buttonDoor3.query();
            buttonDoor3.draw();


            //slime.query();
            slime2.query();


            if (buttonDoor.isUp) {
                door.isClosing = true
            } else {
                door.isClosing = false
            }
            if (buttonDoor2.isUp) {
                door2.isClosing = true
            } else {
                door2.isClosing = false
            }
            if (buttonDoor3.isUp) {
                door3.isClosing = true
            } else {
                door3.isClosing = false
            }
            door.openClose();
            door2.openClose();
            door3.openClose();
            portal[2].query()
            portal[3].query()
            portal2[2].query()
            portal2[3].query()

            boost1.query();
            boost2.query();
            boost3.query();
            boost4.query();
            boost5.query();
            level.exit.drawAndCheck();
            level.enter.draw();
            ctx.fillStyle = "rgba(0,0,0,0.2)"//shadows
            ctx.fillRect(2773, -682, 469, 500)
            ctx.fillRect(3947, -851, 469, 700)
            ctx.fillRect(4818, -1006, 400, 400)
            ctx.fillRect(5313, -1309, 1000, 700)

            ctx.fillRect(16705, -2831, 40, 700)
            ctx.fillRect(16140, -2812, 40, 400)
            ctx.fillRect(15559, -2855, 40, 800)
            ctx.fillRect(16530, -2855, 30, 200)


            ctx.beginPath()
            ctx.moveTo(18254.7, -2194.1)
            ctx.lineTo(18554.6, -1952.7)
            ctx.lineTo(18554.6, -1992.7)
            ctx.lineTo(18294.7, -2194.1)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(18154.7, -1004.1)
            ctx.lineTo(18554.6, -762.7)
            ctx.lineTo(18554.6, -802.7)
            ctx.lineTo(18214.7, -1004.1)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(17585.2, -1123.8)
            ctx.lineTo(17151.2, -781.7)
            ctx.lineTo(17151.2, -741.7)
            ctx.lineTo(17625.2, -1123.8)
            ctx.fill()


            ctx.fillRect(20540, -1103, 610, 300)
            ctx.fillRect(20820, -243, 410, 300)
            ctx.fillRect(5772, -609, 469, 700)
            ctx.fillRect(5772, -609, 469, 700)

            ctx.fillStyle = "rgba(48,184,140,255)"
            ctx.fillRect(waterFallX, -960, waterFallWidth, 6000)
            ctx.fillStyle = `hsla(160, 100%, 43%,${0.3 + 0.07 * Math.random()})`
            ctx.fillRect(waterFallX + waterFallWidth * Math.random(), -900 - Math.random() * 400, Math.random() * 5 + 8, 6000)
            ctx.fillRect(waterFallX + waterFallWidth * Math.random(), -900 - Math.random() * 400, Math.random() * 5 + 5, 6000)
            waterFallWidth = 0.995 * waterFallWidth + 4 * Math.random()//4.7
            waterFalSmoothlX = 0.96 * waterFallSmoothX + 20 * Math.random()//3.5
            waterFallX = waterFallSmoothX + 15900


            ctx.fillStyle = "rgba(0,0,0,0.4)"//wires
            ctx.fillRect(20990, -2672, 20, 112)
            ctx.fillRect(21090, -2506, 72, 20)
            ctx.fillRect(21090, -1970, 72, 20)



            ctx.fillRect(16901.8, -2497.7, 25, 100)
            ctx.fillRect(16901.8, -2397.7, 50, 25)
            ctx.fillRect(16951.8, -2397.7, 25, 1640)
            ctx.fillRect(16901.8, -782.7, 50, 25)
            ctx.fillRect(16901.8, -757.7, 25, 100)


            ctx.fillRect(20900, -2666, 500, 9)
            ctx.fillRect(20900, -2651, 1315, 9)
            ctx.fillRect(20900, -2636, 1300, 9)
            ctx.fillRect(20900, -2621, 245, 9)
            ctx.fillRect(20900, -2606, 230, 9)
            ctx.fillRect(20900, -2591, 215, 9)
            ctx.fillRect(20900, -2576, 200, 9)

            ctx.fillRect(21145, -2621, 9, 700)
            ctx.fillRect(21130, -2606, 9, 1000)
            ctx.fillRect(21115, -2591, 9, 1000)
            ctx.fillRect(21100, -2576, 9, 850)

            ctx.fillRect(21400, -3066, 9, 409)


            ctx.fillRect(20900, -1726, 209, 9)
            ctx.fillRect(21145, -1921, 270, 9)
            ctx.fillRect(21415, -1921, 9, 50)

            ctx.fillRect(22200, -2636, 9, 1300)
            ctx.fillRect(22215, -2651, 9, 300)

            ctx.fillRect(22200, -1336, 300, 9)
            ctx.fillRect(22215, -2351, 300, 9)


            //943.9, -1698.0

            ctx.fillRect(916.5, -1725, 80, 80)//+55 // 55/2=27.5
            ctx.fillRect(1204, -1706, 25, 40)//179
            ctx.fillRect(1354, -1706, 25, 40)
            ctx.fillRect(1504, -1885, 25, 40)
            ctx.fillRect(3504, -1885, 25, 40)
            ctx.fillRect(5504, -1885, 25, 40)


            ctx.fillRect(1019, -1718, 9, 20)
            ctx.fillRect(1019, -1674, 9, 20)

            ctx.fillRect(996, -1718, 23, 9)
            ctx.fillRect(996, -1663, 23, 9)




            ctx.fillRect(1019, -1698, 425, 9)
            ctx.fillRect(1444, -1868, 9, 179)
            ctx.fillRect(1444, -1877, 4700, 9)

            ctx.fillRect(1019, -1683, 440, 9)
            ctx.fillRect(1459, -1853, 9, 179)
            ctx.fillRect(1459, -1862, 4670, 9)

            ctx.fillRect(6144, -1877, 9, 100)
            ctx.fillRect(6144, -1777, 100, 9)

            ctx.fillRect(6129, -1862, 9, 1100)
            ctx.fillRect(6129, -762, 150, 9)







        };


        level.customTopLayer = () => {



            door.draw();
            door2.draw();
            door3.draw();

            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
            elevator.move()


            // if (player.position.x > 15900 && player.position.x < 16300 && player.position.y > -1360.2) {
            //     Matter.Body.setVelocity(player, {
            //         x: player.velocity.x,
            //         y: player.velocity.y + 10
            //     });
            // }else{
            //     if (Math.abs(player.velocity.x) > 0.5){
            //         if (m.onGround){
            //     Matter.Body.setVelocity(player, {
            //         x: player.velocity.x + (0.07 * (Math.abs(player.velocity.x) / player.velocity.x)),
            //         y: player.velocity.y - 0.2

            //     });  
            //         }else{
            //             Matter.Body.setVelocity(player, {
            //                 x: player.velocity.x,
            //                 y: player.velocity.y - 0.2   
            //         });
            //         }
            //     }else{
            //         Matter.Body.setVelocity(player, {
            //             x: player.velocity.x,
            //             y: player.velocity.y - 0.2   
            //     });
            //     }
            // }

            if (player.position.x > 15900 && player.position.x < 16300 && player.position.y > -1360.2) {
                Matter.Body.setVelocity(player, {
                    x: player.velocity.x,
                    y: player.velocity.y + 2
                });
            } else {
                if (Math.abs(player.velocity.x) > 0.5) {
                    if (m.onGround) {
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x + (0.07 * (Math.abs(player.velocity.x) / player.velocity.x)),
                            y: player.velocity.y - 0.2

                        });
                    } else {
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x,
                            y: player.velocity.y - 0.2
                        });
                    }
                } else {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: player.velocity.y - 0.2
                    });
                }
            }
            hazard2.opticalQuery();


        };





        //1273.2, -1404.7

        spawn.mapRect(1124, -653, 100, 25);
        spawn.mapRect(906, -1390, 100, 25);
        spawn.mapRect(3330, -1930, 100, 25);


        //first ship base
        spawn.mapRect(-300, 0, 6684, 100);//lower floor
        spawn.mapRect(-300, -2071, 154, 2071);//left right wall
        spawn.mapRect(2511, -300, 1309, 308);//left big block
        spawn.mapRect(3820, -184, 1309, 184);//right big block
        spawn.mapRect(-300, -739, 2549, 100);//upper right floor
        spawn.mapRect(2056, -1309, 2764, 169);//upper center floor
        spawn.mapRect(2056, -1309, 193, 650);//upper left floor wall
        spawn.mapRect(4636, -1309, 193, 793);//upper right floor wall
        spawn.mapRect(4821, -654, 955, 138);//upper right floor
        spawn.mapRect(6237, -2071, 147, 2071);//far right wall
        spawn.mapRect(-300, -2071, 6684, 154);//roof

        //first ship details
        spawn.mapRect(245, -360, 70, 400);//start room wall
        spawn.mapRect(500, -1929, 154, 462);
        spawn.mapRect(185, -1517, 469, 77);
        spawn.mapRect(2773, -682, 469, 77);//walls in 1st room
        spawn.mapRect(3743, -566, 77, 469);
        spawn.mapRect(3947, -851, 469, 77);
        spawn.mapRect(5313, -1309, 1000, 70);//walls in second area
        spawn.mapRect(4818, -1006, 400, 70);
        spawn.mapRect(4768, -1626, 800, 70);
        spawn.mapRect(4760, -1626, 70, 400);
        spawn.mapRect(645.1, -1480.8, 700, 100);//room for shielding boss
        spawn.mapVertex(515, -1447, "0 0   0 100   -400 0");
        spawn.mapRect(1245.1, -1980.8, 100, 500);
        spawn.mapRect(2346.9, -1658.8, 469, 77);
        spawn.mapRect(4023.6, -1723.7, 469, 77);

        //engines //y -2972 -> 0
        spawn.mapRect(6237, -1880.7, 400, 800);
        spawn.mapRect(6237, -890.4, 400, 800);


        //first ship blocks/debris
        spawn.debris(3267.6, -797.1, 700, 5); //16 debris per level
        spawn.debris(1626.0, -372.5, 1700, 8); //16 debris per level
        spawn.debris(1880.1, -1508.9, 3700, 16); //16 debris per level
        spawn.debris(5335.3, -1431.6, 3700, 16); //16 debris per level
        spawn.debris(1563.8, -1087.9, 700, 5); //16 debris per level
        spawn.bodyRect(1540, -1110, 218, 125, 0.9);



        //first ship mobs
        spawn.randomSmallMob(893.5, -120.8);

        // spawn.randomMob(2903.9, -754.5, 0.4);
        // spawn.randomMob(5577.0, -217.0, 0.2);
        // spawn.randomMob(765.8, -1029.7, 0.5);
        // spawn.randomMob(2680.1, -1779.2, 0.6);
        // spawn.randomMob(20079.4, -2219.7, 0.4);
        // spawn.randomMob(3924.9, -1504.1, 0.5);
        // spawn.randomMob(21284.2, -983.1, 0.3);
        // spawn.randomMob(20381.0, -254.2, 0.5);
        // spawn.randomMob(18375.6, -1574.4, 0.6);
        // spawn.randomMob(19448.2, -1323.3, 0.3);
        // spawn.randomMob(18397.7, -711.2, 0.3);
        // spawn.randomMob(15547.2, -2249.6, 0.5);
        // spawn.randomSmallMob(16114.6, -2524.2);
        // spawn.randomSmallMob(15378.9, -2549.6);

        // spawn.randomSmallMob(3266.4, -1578.4);
        // spawn.randomSmallMob(4386.2, -439.6);
        // spawn.randomSmallMob(5667.0, -847.8);
        // spawn.randomSmallMob(3158.5, -1581.8);
        // spawn.randomSmallMob(3866.7, -1483.2);
        // spawn.randomSmallMob(4652.3, -1729.4);
        // spawn.randomSmallMob(1068.7, -106.1);
        // spawn.randomSmallMob(3382.5, -1590.6);//3545.0, -413.0
        // spawn.randomSmallMob(5099.7, -1204.2);
        // spawn.randomSmallMob(1456.4, -1014.8);
        // spawn.randomSmallMob(20432.4, -1374.3);
        // spawn.randomSmallMob(20381.0, -254.2);
        // spawn.randomSmallMob(3505.1, -1531.1);
        // spawn.randomSmallMob(20648.1, -136.8);
        // spawn.randomSmallMob(17502.8, -1520.6);
        // spawn.randomSmallMob(17438.7, -876.7);

        spawn.randomMob(18375.6, -1574.4, 0.2);
        spawn.randomSmallMob(15378.9, -2549.6);
        spawn.randomSmallMob(5820.2, -1545.2);
        spawn.randomMob(765.8, -1029.7, 0.2);
        spawn.randomMob(21284.2, -983.1, 0.3);
        spawn.randomSmallMob(3382.5, -1590.6);
        spawn.randomSmallMob(3545.0, -413.0);
        spawn.randomMob(20381.0, -254.2, 0.6);
        spawn.randomSmallMob(20432.4, -1374.3);
        spawn.randomSmallMob(5667.0, -847.8);
        spawn.randomMob(2903.9, -754.5, 0.2);
        spawn.randomSmallMob(3266.4, -1578.4);
        spawn.randomSmallMob(20648.1, -136.8);
        spawn.randomSmallMob(16114.6, -2524.2);
        spawn.randomSmallMob(20381.0, -254.2);
        spawn.randomMob(5577.0, -217.0, 0.3);
        spawn.randomSmallMob(1456.4, -1014.8);
        spawn.randomSmallMob(1068.7, -106.1);
        spawn.randomSmallMob(5099.7, -1204.2);
        spawn.randomSmallMob(17502.8, -1520.6);
        spawn.randomMob(15547.2, -2249.6, 0.2);
        spawn.randomMob(19448.2, -1323.3, 0.7);
        spawn.randomSmallMob(3158.5, -1581.8);
        spawn.randomSmallMob(17438.7, -876.7);
        spawn.randomMob(20079.4, -2219.7, 0.2);
        spawn.randomMob(2680.1, -1779.2, 0.6);
        spawn.randomMob(3924.9, -1504.1, 0.3);
        spawn.randomSmallMob(4652.3, -1729.4);
        spawn.randomMob(18397.7, -711.2, 0.3);
        spawn.randomSmallMob(4386.2, -439.6);

        spawn.randomSmallMob(3505.1, -1531.1);
        spawn.randomSmallMob(3866.7, -1483.2);




        //second ship mobs
        spawn.debris(17732.3, -550.0, 700, 5); //16 debris per level
        spawn.debris(17827.2, -2357.1, 700, 5); //16 debris per level
        spawn.debris(16108.6, -2621.1, 700, 5); //16 debris per level
        spawn.debris(20823.6, -1332.1, 1300, 5); //16 debris per level
        spawn.debris(21095.5, -423.4, 700, 5); //16 debris per level
        spawn.debris(20534.5, -1282.1, 700, 5); //16 debris per level







        spawn.randomSmallMob(1300, -70);
        spawn.shieldingBoss(943.9, -1698.0)


        //second ship base
        spawn.mapRect(15000, 0, 515, 185);//lower floor 1
        spawn.mapRect(17015, 0, 5500, 185);//lower floor 2
        spawn.mapRect(15000, -2972, 185, 2972);//left wall
        spawn.mapRect(15000, -2972, 7515, 185);//roof
        spawn.mapRect(22330, -2972, 185, 2972);//right wall
        spawn.mapRect(17002, -2972, 169, 2564);//left middle wall
        spawn.mapRect(19089, -2972, 169, 855);//right middle wall upper
        spawn.mapRect(19089, -1625, 169, 1800);//right middle wall lower
        spawn.mapRect(20760, -2972, 169, 1350);//medium wall left of portal
        spawn.mapRect(19720, -1625, 1725, 162);//right room upper floor
        spawn.mapRect(21440, -2325, 169, 863);//medium wall right of portal
        spawn.mapRect(19720, -855, 2725, 162);//right room lower floor

        //engines //y -2972 -> 0
        spawn.mapRect(22330, -2763.75, 400, 800);
        spawn.mapRect(22330, -1793.5, 400, 800);
        spawn.mapRect(22330, -804.25, 400, 800);



        //second ship details
        spawn.mapRect(19904, -1465, 85, 362);//upper L
        spawn.mapRect(19542, -1191, 412, 88);//lower L
        spawn.mapRect(18546, -2199, 600, 82);//2nd room enternce wall
        spawn.mapRect(18546, -2499, 82, 2300);
        spawn.mapRect(18108, -326, 500, 82);//walls/floors in middle room
        spawn.mapRect(17750, -682, 300, 82);
        spawn.mapRect(17156, -468, 500, 60);
        spawn.mapRect(18022, -1082, 600, 82);
        spawn.mapRect(17151, -1196, 500, 82);
        spawn.mapRect(17453, -2060, 500, 82);
        spawn.mapRect(18197, -2269, 400, 82);
        spawn.mapRect(18108, -326, 500, 82);
        spawn.mapRect(20542, -1191, 612, 88);
        spawn.mapRect(20238, -1191, 88, 412);
        spawn.mapRect(21520, -1468, 88, 412);
        spawn.mapRect(20238, -330.2, 88, 412);
        spawn.mapRect(20819, -328.3, 412, 88);
        spawn.mapRect(21532, -708, 88, 412);
        spawn.mapRect(15483.8, 12.5, 388, 30);//broken floor
        spawn.mapRect(15487.6, 76.6, 488, 24);
        spawn.mapRect(15506.5, 134.2, 288, 45);
        spawn.mapVertex(16758.6, 135.3, "400 -30   -350 -40   -400 30   400 30");
        spawn.mapVertex(16758.6, 55.3, "423 -30   -408 -20   -400 20   400 20");
        //tank
        spawn.mapRect(15310, -960, 600, 135);
        spawn.mapRect(16290, -960, 800, 135);
        //in tank
        spawn.mapRect(16524.8, -2726.8, 40, 400);
        spawn.mapRect(16524.8, -2130.9, 400, 40);
        spawn.mapRect(16010.2, -2412.2, 300, 40);
        spawn.mapRect(15379.2, -2055.1, 400, 40);

        spawn.mapVertex(17626.3, -3035, "-245 0   -220 -110   -173 -173   -110 -220   0 -250   110 -220   173 -173   220 -110   245 0");
        spawn.mapRect(17226.3, -3035, 400, 40);

        spawn.mapVertex(17626.3, 225, "-245 0   -220 110   -173 173   -110 220   0 250   110 220   173 173   220 110   245 0");
        spawn.mapRect(17226.3, 225, 400, 40);

        spawn.mapVertex(19626.3, -3035, "-245 0   -220 -110   -173 -173   -110 -220   0 -250   110 -220   173 -173   220 -110   245 0");
        spawn.mapRect(19226.3, -3035, 400, 40);

        spawn.mapVertex(19626.3, 225, "-245 0   -220 110   -173 173   -110 220   0 250   110 220   173 173   220 110   245 0");
        spawn.mapRect(19226.3, 225, 400, 40);

        spawn.mapVertex(21626.3, -3035, "-245 0   -220 -110   -173 -173   -110 -220   0 -250   110 -220   173 -173   220 -110   245 0");
        spawn.mapRect(21226.3, -3035, 400, 40);

        spawn.mapVertex(21626.3, 225, "-245 0   -220 110   -173 173   -110 220   0 250   110 220   173 173   220 110   245 0");
        spawn.mapRect(21226.3, 225, 400, 40);



        //add fuel tanks in the last room


        spawn.mapRect(21531.9, -707.8, 488, 8);

        //22185.5, -114.8
        spawn.mapVertex(22207.8, -103, "325 -200   100 -200   325 -300");
        spawn.mapRect(22056.6, -70, 225, 212);

        spawn.mapVertex(20723.1, -1734, "325 -200   100 -200   325 -300");
        spawn.mapRect(20571.9, -1701.0, 225, 212);

        spawn.mapVertex(22207.8, -103, "325 -200   100 -200   325 -300");
        spawn.mapRect(22056.6, -70, 225, 212);
        //spawn.mapVertex(x,y, "coordinates")
        //the parts in quotes is "x y   x y   x y   x y   x y"  x and y need to be the coordinates of points that define the shape in a concave clockwise direction

        //second ship blocks/debris
        spawn.bodyRect(21525, -113, 50, 50, 9);//first button block 
        spawn.bodyRect(18993, -2283, 50, 50, 9);//second button block
        spawn.bodyRect(20303, -1736, 50, 50, 9);//third button block



        // spawn.randomLevelBoss(17902, -1689, ["blinkBoss", "shooterBoss", "launcherBoss", "pulsarBoss", "blockBoss", "bladeBoss", "revolutionBoss", "spawnerBossCulture", "spiderBoss", "sneakBoss", "snakeSpitBoss"])
        spawn.randomLevelBoss(17902, -1689, ["launcherBoss", "laserTargetingBoss", "blinkBoss", "streamBoss", "historyBoss", "grenadierBoss", "blockBoss", "revolutionBoss", "slashBoss"]);

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
    clock() {
        simulation.inGameConsole(`<strong>clock</strong> by <span class='color-var'>Cornbread 2100</span>`);

        function drawBackgroundGear(x, y, r1, r2, rot, color, speed, numTeeth = 5, toothWidth = 75, linew = 2) {
            var vertices = getGearVertices(x, y, r1, r2, numTeeth, simulation.cycle * speed + rot, toothWidth / 100);

            // draw gear
            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (var i = 1; i < vertices.length; i++) {
                ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.lineTo(vertices[0].x, vertices[0].y);
            ctx.lineWidth = 2;
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = "#3a3f20";
            ctx.lineWidth = linew;
            ctx.stroke();
        }

        function drawFallingBackgroundGear(x, y, r1, r2, rot, color, speed, fallSpeed, startCycle, numTeeth = 5, linew = 2) {
            rot *= speed;
            numTeeth *= 2;

            const gearInc = (2 * Math.PI) / numTeeth;
            ctx.beginPath()
            for (var i = 0; i <= numTeeth; i++) {
                var gear_r = r2;
                if (i % 2 == 1) gear_r = r1;
                ctx.arc(x, y + (simulation.cycle - startCycle) * fallSpeed, gear_r, (i * gearInc) + rot, ((i + 1) * gearInc) + rot);
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = "#3a3f20";
            ctx.lineWidth = linew;
            ctx.stroke();
        }

        function getGearVertices(x, y, r1, r2, numTeeth, rot = 0, teethWidth = 0) {
            if (teethWidth == 0) {
                teethWidth = (2 * Math.PI) / (2 * numTeeth);
            }
            const gearInc = (2 * Math.PI) / numTeeth;
            var vertices = [];

            for (var i = 0; i < numTeeth; i++) {
                //inner vertices of gear teeth
                var distance = i * gearInc + rot;
                var vX = Math.sin(distance + teethWidth / 2) * r1;
                var vY = Math.cos(distance + teethWidth / 2) * r1;

                var point1 = { x: vX, y: vY, point: 1 };

                vX = Math.sin(distance - teethWidth / 2) * r1;
                vY = Math.cos(distance - teethWidth / 2) * r1;

                var point4 = { x: vX, y: vY, point: 4 };

                vX = Math.sin(distance) * r1;
                vY = Math.cos(distance) * r1;

                if (vX == 0) {
                    vX = 0.0001
                }

                var slope = vY / vX;

                var angle = Math.atan2(vY, vX);

                //outer vertices of gear teeth
                var point2 = { x: point1.x, y: point1.y, point: 2 };
                point2.x += Math.cos(angle) * (r2 - r1);
                point2.y += Math.sin(angle) * (r2 - r1);

                var point3 = { x: point4.x, y: point4.y, point: 3 };
                point3.x += Math.cos(angle) * (r2 - r1);
                point3.y += Math.sin(angle) * (r2 - r1);

                vertices.push(point4);
                vertices.push(point3);
                vertices.push(point2);
                vertices.push(point1);
            }

            for (var i = 0; i < vertices.length; i++) {
                vertices[i].x += x;
                vertices[i].y += y;
            }

            return vertices;
        }

        function getGearTeethVertices(x, y, r1, r2, numTeeth, toothIndex, teethWidth = 0) {
            if (teethWidth == 0) {
                teethWidth = (2 * Math.PI) / (2 * numTeeth);
            }

            const gearInc = (2 * Math.PI) / numTeeth;
            var vertices = [];

            for (var i = 0; i < numTeeth; i++) {
                //inner vertices of gear teeth
                var distance = i * gearInc;
                var vX = Math.sin(distance + teethWidth / 2) * r1;
                var vY = Math.cos(distance + teethWidth / 2) * r1;

                var point1 = { x: vX, y: vY, point: 1 };

                vX = Math.sin(distance - teethWidth / 2) * r1;
                vY = Math.cos(distance - teethWidth / 2) * r1;

                var point4 = { x: vX, y: vY, point: 4 };

                vX = Math.sin(distance) * r1;
                vY = Math.cos(distance) * r1;

                if (vX == 0) {
                    vX = 0.0001
                }

                var slope = vY / vX;

                var angle = Math.atan2(vY, vX);

                //outer vertices of gear teeth
                var point2 = { x: point1.x, y: point1.y, point: 2 };
                point2.x += Math.cos(angle) * (r2 - r1);
                point2.y += Math.sin(angle) * (r2 - r1);

                var point3 = { x: point4.x, y: point4.y, point: 3 };
                point3.x += Math.cos(angle) * (r2 - r1);
                point3.y += Math.sin(angle) * (r2 - r1);

                if (i == toothIndex) {
                    vertices.push(point4);
                    vertices.push(point3);
                    vertices.push(point2);
                    vertices.push(point1);
                }
            }

            for (var i = 0; i < vertices.length; i++) {
                vertices[i].x += x;
                vertices[i].y += y;
            }

            return vertices;
        }

        function mapGear(x, y, r1, r2, rot, speed, numTeeth = 5, toothWidth = 50, additionalCircleRadius = 10) {
            const part1 = body[body.length] = Bodies.polygon(x, y, 0, r1 + additionalCircleRadius, {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                isNotHoldable: true,
                frictionAir: 0,
                friction: 1,
                frictionStatic: 1,
                restitution: 0
            });

            var parts = [part1];

            for (var i = 0; i < numTeeth; i++) {
                var toothVertices = getGearTeethVertices(0, 0, r2 - r1, toothWidth + r2 - r1, numTeeth, i, 70); // for some reason the teeth are sideways

                var center = { // the center of the inner line of the gear
                    x: toothVertices[3].x - toothVertices[0].x,
                    y: toothVertices[3].y - toothVertices[0].y
                };

                distanceToCenter = Math.sqrt((center.x ** 2) + (center.y ** 2));

                var radiusScale = (r1 + ((r2 - r1) / 2)) / distanceToCenter;

                gearToothSlope = center.y / center.x;

                var newPart = body[body.length] = Bodies.fromVertices(x + center.x * radiusScale, y + center.y * radiusScale, toothVertices, {
                    collisionFilter: {
                        category: cat.body,
                        mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                    },
                    isNotHoldable: true,
                    frictionAir: 0.01,
                    friction: 1,
                    frictionStatic: 1,
                    restitution: 0
                });

                parts.push(newPart);
            }

            const who = Body.create({
                parts: parts
            });

            Composite.add(engine.world, who);
            composite[composite.length] = who;
            who.collisionFilter.category = cat.body;
            who.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map

            const constraint = Constraint.create({
                pointA: {
                    x: x,
                    y: y
                },
                bodyB: who,
                stiffness: 1,
                damping: 1
            });


            Matter.Body.setDensity(who, 0.0001)
            Composite.add(engine.world, constraint);
            Matter.Body.setAngle(who, 0)
            Matter.Body.setAngularVelocity(who, 0);
            who.center = { x: x, y: y }

            who.rotate = function () {
                var rotation = simulation.cycle * speed + rot;
                Matter.Body.setAngle(who, rotation);
            }

            who.gearSettings = {
                x: x,
                y: y,
                r1: r1,
                r2: r2,
                rot: rot,
                speed: speed,
                numTeeth: numTeeth,
                toothWidth: toothWidth
            }

            return who;
        }

        function clockHand(x, y, width, height, speed = 15 * Math.PI / 180, angle = 0, density = 0.001) {
            var who1 = body[body.length] = Bodies.rectangle(x, y + height / 2, width, height, {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                isNotHoldable: true,
                friction: 1,
                frictionStatic: 1,
                restitution: 0
            });

            const who = Body.create({
                parts: [who1],
                handRotation: 0
            });

            Composite.add(engine.world, who);
            composite[composite.length] = who;
            who.collisionFilter.category = cat.body;
            who.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map

            who.position.y = y;

            const constraint = Constraint.create({
                pointA: {
                    x: who.position.x,
                    y: who.position.y
                },
                bodyB: who,
                stiffness: 1,
                damping: 1
            });

            Matter.Body.setDensity(who, density)
            Composite.add(engine.world, constraint);
            who.center = { x: who.position.x, y: who.position.y }

            who.rotate = function () {
                if (simulation.cycle % 60 == 0) {
                    who.handRotation += speed;
                    if (Math.abs(who.handRotation % (Math.PI * 2) - Math.PI) < 0.2) {
                        // spawn random mob at exit door
                        const pick = spawn.fullPickList[Math.floor(Math.random() * spawn.fullPickList.length)];
                        spawn[pick](300, 600);
                    }
                    if (Matter.Query.collides(player, [this]).length != 0) {
                        var playerAngle = Math.atan((m.pos.y - y) / (m.pos.x - x));
                        if (m.pos.x - x < 0) playerAngle += Math.PI;
                        const playerDistance = Math.sqrt((m.pos.x - x) ** 2 + (m.pos.y - y) ** 2);
                        Matter.Body.setPosition(player, {
                            x: x + Math.cos(playerAngle + speed) * playerDistance,
                            y: y + Math.sin(playerAngle + speed) * playerDistance
                        })
                    }
                }
                Matter.Body.setAngle(who, who.handRotation + angle);
            }

            return who
        }

        function pendulum(x, y, width, height, swingTime = 50, swingDistanceMultiplier = 0.5, bobSides = 0, bobRadius = 200, density = 100, angle = 0, frictionAir = 0, angularVelocity = 0) {
            const who1 = body[body.length] = Bodies.rectangle(x, y + height / 2, width, height, {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                isNotHoldable: true,
                frictionAir: frictionAir,
                friction: 1,
                frictionStatic: 1,
                restitution: 0
            });

            const who2 = body[body.length] = Bodies.polygon(x, y + height, bobSides, bobRadius, {
                collisionFilter: {
                    category: cat.body,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                isNotHoldable: true,
                frictionAir: 0.01,
                friction: 1,
                frictionStatic: 1,
                restitution: 0
            });

            const who = Body.create({
                parts: [who1, who2],
            });

            Composite.add(engine.world, who);
            composite[composite.length] = who;
            who.collisionFilter.category = cat.body;
            who.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mob | cat.mobBullet | cat.map

            who.position.y = y;

            const constraint = Constraint.create({
                pointA: {
                    x: x,
                    y: y
                },
                bodyB: who,
                stiffness: 1,
                damping: 1
            });


            Matter.Body.setDensity(who, density)
            Composite.add(engine.world, constraint);
            Matter.Body.setAngle(who, angle)
            Matter.Body.setAngularVelocity(who, angularVelocity);
            who.center = { x: x, y: y + height / 2 }

            who.rotate = function () {
                var rotation = Math.sin(simulation.cycle / swingTime) * swingDistanceMultiplier;

                if (Matter.Query.collides(player, [this]).length != 0) {
                    var playerAngle = Math.atan((player.position.y - y) / (player.position.x - x)) + rotation - Math.sin((simulation.cycle - 1) / swingTime) * swingDistanceMultiplier;
                    if (player.position.x - x < 0) playerAngle += Math.PI;
                    const playerDistance = Math.sqrt((player.position.x - x) ** 2 + (player.position.y - y) ** 2);
                    Matter.Body.setPosition(player, {
                        x: x + Math.cos(playerAngle) * playerDistance,
                        y: y + Math.sin(playerAngle) * playerDistance
                    })
                }

                Matter.Body.setAngle(who, rotation);
            }

            return who;
        }

        function gearMob(x, y, leaveBody = true, autoFindPlayer = false, radius = Math.floor(25 + 40 * Math.random()), teethRadius = 0) {
            if (teethRadius == 0) {
                teethRadius = radius + 15 + Math.floor(Math.random() * 20);
            }

            mobs.spawn(x, y, 0, teethRadius, "transparent");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";

            me.delay = 100 + 40 * simulation.CDScale;
            me.accelMag = Math.PI / 10000;
            me.memory = 120;
            me.seeAtDistance2 = 2000000; // 140
            Matter.Body.setDensity(me, 0.001);

            me.leaveBody = leaveBody;

            const numTeeth = Math.round(5 + Math.random() * 3);

            me.gearRotation = 0;
            me.gearSpeed = Math.round(-0.1 + Math.random() * 0.2);
            me.gearAccelerating = true;

            me.do = function () {
                if (autoFindPlayer) {
                    me.locatePlayer();
                }

                this.seePlayerByLookingAt();
                this.checkStatus();
                this.attraction();

                if (me.gearAccelerating && (Math.random() > 0.99 || me.gearSpeed >= 0.1)) {
                    me.gearAccelerating = false;
                } else if (!me.gearAccelerating && (Math.random() > 0.99 || me.gearSpeed <= -0.1)) {
                    me.gearAccelerating = true;
                }

                if (me.gearAccelerating) {
                    me.gearSpeed += 0.001;
                } else {
                    me.gearSpeed -= 0.001;
                }

                me.gearRotation += me.gearSpeed;

                var newVertices = getGearVertices(me.position.x, me.position.y, radius, teethRadius, numTeeth, me.gearRotation);
                // draw body
                ctx.beginPath();
                ctx.moveTo(newVertices[0].x, newVertices[0].y);
                for (let i = 1; i < newVertices.length; i++) {
                    ctx.lineTo(newVertices[i].x, newVertices[i].y);
                }
                ctx.lineTo(newVertices[0].x, newVertices[0].y);
                ctx.fillStyle = "#7b3f00";
                ctx.fill();
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        function customDoor(x, y, width, height) {
            x = x + width / 2
            y = y + height / 2
            const doorBlock = body[body.length] = Bodies.rectangle(x, y, width, height, {
                collisionFilter: {
                    category: cat.map,
                    mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet //cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                inertia: Infinity, //prevents rotation
                isNotHoldable: true,
                friction: 1,
                frictionStatic: 1,
                restitution: 0,
                isClosing: false,
                setPos(x, y) {
                    if (y - this.position.y <= 0 || ( // only move down if clear of stuff
                        Matter.Query.ray([player], Matter.Vector.create(this.position.x - width / 2, this.position.y + height / 2), Matter.Vector.create(this.position.x + width / 2, this.position.y + height / 2), 5).length === 0 &&
                        Matter.Query.ray(body, Matter.Vector.create(this.position.x - width / 2, this.position.y + height / 2), Matter.Vector.create(this.position.x + width / 2, this.position.y + height / 2), 5).length <= 1 &&
                        Matter.Query.ray(mob, Matter.Vector.create(this.position.x - width / 2, this.position.y + height / 2), Matter.Vector.create(this.position.x + width / 2, this.position.y + height / 2), 5).length === 0)
                    ) {
                        const position = {
                            x: x,
                            y: y
                        }
                        Matter.Body.setPosition(this, position);
                    }
                },
                draw() {
                    ctx.fillStyle = "#555"
                    ctx.beginPath();
                    const v = this.vertices;
                    ctx.moveTo(v[0].x, v[0].y);
                    for (let i = 1; i < v.length; ++i) {
                        ctx.lineTo(v[i].x, v[i].y);
                    }
                    ctx.lineTo(v[0].x, v[0].y);
                    ctx.fill();
                }
            });
            Matter.Body.setStatic(doorBlock, true); //make static
            Composite.add(engine.world, doorBlock); //add to world
            doorBlock.classType = "body"
            return doorBlock
        }

        function horizontalDoor(x, y, width, height, distance, speed = 1) {
            x = x + width / 2
            y = y + height / 2
            const doorBlock = body[body.length] = Bodies.rectangle(x, y, width, height, {
                collisionFilter: {
                    category: cat.map,
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
                            if (this.position.x > x) { //try to close
                                if ( //if clear of stuff
                                    Matter.Query.collides(this, [player]).length === 0 &&
                                    Matter.Query.collides(this, body).length < 2 &&
                                    Matter.Query.collides(this, mob).length === 0
                                ) {
                                    const position = {
                                        x: this.position.x - speed,
                                        y: this.position.y
                                    }
                                    Matter.Body.setPosition(this, position)
                                }
                            }
                        } else {
                            if (this.position.x < x + distance) { //try to open 
                                const position = {
                                    x: this.position.x + speed,
                                    y: this.position.y
                                }
                                Matter.Body.setPosition(this, position)
                            }
                        }
                    }
                },
                isClosed() {
                    return this.position.x < x + 1
                },
                draw() {
                    ctx.fillStyle = "#555"
                    ctx.beginPath();
                    const v = this.vertices;
                    ctx.moveTo(v[0].x, v[0].y);
                    for (let i = 1; i < v.length; ++i) {
                        ctx.lineTo(v[i].x, v[i].y);
                    }
                    ctx.lineTo(v[0].x, v[0].y);
                    ctx.fill();
                }
            });
            Matter.Body.setStatic(doorBlock, true); //make static
            Composite.add(engine.world, doorBlock); //add to world
            doorBlock.classType = "body"
            return doorBlock
        }

        function drawBelt(circle1, circle2) {
            // circle 1
            const distance = Math.sqrt((circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2);
            const distanceToIntersection = (-circle1.radius * distance) / (-circle1.radius + circle2.radius);
            const slopeAngle = Math.atan((circle2.y - circle1.y) / (circle2.x - circle1.x));
            const angleToTangent = Math.acos(-circle1.radius / distanceToIntersection);
            const tangentIntersection = {
                x: Math.cos(slopeAngle) * distanceToIntersection + circle1.x,
                y: Math.sin(slopeAngle) * distanceToIntersection + circle1.y
            }
            const tangentPoint = {
                x: Math.cos(angleToTangent + slopeAngle) * -circle1.radius + circle1.x,
                y: Math.sin(angleToTangent + slopeAngle) * -circle1.radius + circle1.y
            }
            const invertedTangentPoint = {
                x: Math.cos(-angleToTangent + slopeAngle) * -circle1.radius + circle1.x,
                y: Math.sin(-angleToTangent + slopeAngle) * -circle1.radius + circle1.y
            }

            // circle 2
            const tangentPoint2 = {
                x: Math.cos(angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }
            const invertedTangentPoint2 = {
                x: Math.cos(-angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(-angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }

            // draw
            ctx.beginPath();
            ctx.moveTo(tangentPoint.x, tangentPoint.y);
            ctx.lineTo(tangentPoint2.x, tangentPoint2.y);
            const newAngle = Math.atan((tangentPoint2.y - circle2.y) / (tangentPoint2.x - circle2.x));
            const newAngle2 = Math.atan((invertedTangentPoint2.y - circle2.y) / (invertedTangentPoint2.x - circle2.x));
            ctx.arc(circle2.x, circle2.y, circle2.radius, newAngle, newAngle2 + Math.PI);
            ctx.lineTo(invertedTangentPoint.x, invertedTangentPoint.y);
            const newAngle3 = Math.atan((invertedTangentPoint.y - circle1.y) / (invertedTangentPoint.x - circle1.x));
            const newAngle4 = Math.atan((tangentPoint.y - circle1.y) / (tangentPoint.x - circle1.x));
            ctx.arc(circle1.x, circle1.y, circle1.radius, newAngle3 + Math.PI, newAngle4);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        function drawDiagonalBelt(circle1, circle2) {
            // circle 1
            const distance = Math.sqrt((circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2);
            const distanceToIntersection = (circle1.radius * distance) / (circle1.radius + circle2.radius);
            const slopeAngle = Math.atan((circle2.y - circle1.y) / (circle2.x - circle1.x));
            const angleToTangent = Math.acos(circle1.radius / distanceToIntersection);
            const tangentIntersection = {
                x: Math.cos(slopeAngle) * distanceToIntersection + circle1.x,
                y: Math.sin(slopeAngle) * distanceToIntersection + circle1.y
            }
            const tangentPoint = {
                x: Math.cos(angleToTangent + slopeAngle) * circle1.radius + circle1.x,
                y: Math.sin(angleToTangent + slopeAngle) * circle1.radius + circle1.y
            }
            const invertedTangentPoint = {
                x: Math.cos(-angleToTangent + slopeAngle) * circle1.radius + circle1.x,
                y: Math.sin(-angleToTangent + slopeAngle) * circle1.radius + circle1.y
            }

            // circle 2
            const tangentPoint2 = {
                x: Math.cos(angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }
            const invertedTangentPoint2 = {
                x: Math.cos(-angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(-angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }

            // draw
            ctx.beginPath();
            ctx.moveTo(tangentPoint.x, tangentPoint.y);
            ctx.lineTo(tangentPoint2.x, tangentPoint2.y);
            const newAngle = Math.atan((tangentPoint2.y - circle2.y) / (tangentPoint2.x - circle2.x));
            const newAngle2 = Math.atan((invertedTangentPoint2.y - circle2.y) / (invertedTangentPoint2.x - circle2.x));
            ctx.arc(circle2.x, circle2.y, circle2.radius, newAngle, newAngle2 + Math.PI);
            ctx.lineTo(invertedTangentPoint.x, invertedTangentPoint.y);
            const newAngle3 = Math.atan((invertedTangentPoint.y - circle1.y) / (invertedTangentPoint.x - circle1.x));
            const newAngle4 = Math.atan((tangentPoint.y - circle1.y) / (tangentPoint.x - circle1.x));
            ctx.arc(circle1.x, circle1.y, circle1.radius, newAngle3, newAngle4 + Math.PI, true);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        function getIntersection(v1, v1End, domain) {
            const intersections = getIntersections(v1, v1End, domain);

            var best = {
                x: v1End.x,
                y: v1End.y,
                dist: Math.sqrt((v1End.x - v1.x) ** 2 + (v1End.y - v1.y) ** 2)
            }
            for (const intersection of intersections) {
                const dist = Math.sqrt((intersection.x - v1.x) ** 2 + (intersection.y - v1.y) ** 2);
                if (dist < best.dist) {
                    best = {
                        x: intersection.x,
                        y: intersection.y,
                        dist: dist
                    };
                }
            }

            return best;
        }

        function getIntersections(v1, v1End, domain) {
            const intersections = [];

            for (const obj of domain) {
                for (var i = 0; i < obj.vertices.length - 1; i++) {
                    results = simulation.checkLineIntersection(v1, v1End, obj.vertices[i], obj.vertices[i + 1]);
                    if (results.onLine1 && results.onLine2) intersections.push({ x: results.x, y: results.y });
                }
                results = simulation.checkLineIntersection(v1, v1End, obj.vertices[obj.vertices.length - 1], obj.vertices[0]);
                if (results.onLine1 && results.onLine2) intersections.push({ x: results.x, y: results.y });
            }

            return intersections;
        }

        function circleLoS(pos, radius, domain) {

            function allCircleLineCollisions(c, radius, domain) {
                var lines = [];
                for (const obj of domain) {
                    //const obj = domain[0]
                    for (var i = 0; i < obj.vertices.length - 1; i++) {
                        lines.push(circleLineCollisions(obj.vertices[i], obj.vertices[i + 1], c, radius));
                    }
                    lines.push(circleLineCollisions(obj.vertices[obj.vertices.length - 1], obj.vertices[0], c, radius));
                }

                const collisionLines = [];
                for (const line of lines) {
                    if (line.length == 2) {
                        const distance1 = Math.sqrt((line[0].x - c.x) ** 2 + (line[0].y - c.y) ** 2)
                        const angle1 = Math.atan2(line[0].y - c.y, line[0].x - c.x);
                        const queryPoint1 = {
                            x: Math.cos(angle1) * (distance1 - 1) + c.x,
                            y: Math.sin(angle1) * (distance1 - 1) + c.y
                        }
                        const distance2 = Math.sqrt((line[1].x - c.x) ** 2 + (line[1].y - c.y) ** 2)
                        const angle2 = Math.atan2(line[1].y - c.y, line[1].x - c.x);
                        const queryPoint2 = {
                            x: Math.cos(angle2) * (distance2 - 1) + c.x,
                            y: Math.sin(angle2) * (distance2 - 1) + c.y
                        }

                        collisionLines.push(line)
                    }
                }

                return collisionLines;
            }

            function circleLineCollisions(a, b, c, radius) {
                // calculate distances
                const angleOffset = Math.atan2(b.y - a.y, b.x - a.x);
                const sideB = Math.sqrt((a.x - c.x) ** 2 + (a.y - c.y) ** 2);
                const sideC = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
                const sideA = Math.sqrt((c.x - b.x) ** 2 + (c.y - b.y) ** 2);

                // calculate the closest point on line AB to point C
                const angleA = Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) * (a.x - c.x) / -Math.abs(a.x - c.x)
                const sideAD = Math.cos(angleA) * sideB;
                const d = { // closest point
                    x: Math.cos(angleOffset) * sideAD + a.x,
                    y: Math.sin(angleOffset) * sideAD + a.y
                }
                const distance = Math.sqrt((d.x - c.x) ** 2 + (d.y - c.y) ** 2);
                if (distance == radius) {
                    // tangent
                    return [d];
                } else if (distance < radius) {
                    // secant
                    const angleOffset = Math.atan2(d.y - c.y, d.x - c.x);
                    const innerAngle = Math.acos(distance / radius);
                    const intersection1 = {
                        x: Math.cos(angleOffset + innerAngle) * radius + c.x,
                        y: Math.sin(angleOffset + innerAngle) * radius + c.y
                    }

                    const intersection2 = {
                        x: Math.cos(angleOffset - innerAngle) * radius + c.x,
                        y: Math.sin(angleOffset - innerAngle) * radius + c.y
                    }

                    const distance1 = {
                        a: Math.sqrt((intersection1.x - a.x) ** 2 + (intersection1.y - a.y) ** 2),
                        b: Math.sqrt((intersection1.x - b.x) ** 2 + (intersection1.y - b.y) ** 2)
                    }
                    const distance2 = {
                        a: Math.sqrt((intersection2.x - a.x) ** 2 + (intersection2.y - a.y) ** 2),
                        b: Math.sqrt((intersection2.x - b.x) ** 2 + (intersection2.y - b.y) ** 2)
                    }
                    const result = [];
                    if (Math.abs(sideC - (distance1.a + distance1.b)) < 0.01) {
                        result.push(intersection1);
                    } else {
                        if (distance1.a < distance1.b) {
                            if (sideB <= radius) result.push(a);
                        } else {
                            if (sideA <= radius) result.push(b)
                        }
                    }
                    if (Math.abs(sideC - (distance2.a + distance2.b)) < 0.01) {
                        result.push(intersection2);
                    } else {
                        if (distance2.a <= distance2.b) {
                            if (sideB <= radius) result.push(a);
                        } else {
                            if (sideA <= radius) result.push(b)
                        }
                    }

                    return result;
                } else {
                    // no intersection
                    return [];
                }
            }

            var vertices = [];
            for (const obj of losDomain) {
                for (var i = 0; i < obj.vertices.length; i++) {
                    const vertex = obj.vertices[i];
                    const angleToVertex = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                    const queryPoint = {
                        x: Math.cos(angleToVertex + Math.PI) + vertex.x,
                        y: Math.sin(angleToVertex + Math.PI) + vertex.y
                    }

                    if (Matter.Query.ray(domain, pos, queryPoint).length == 0) {
                        var distance = Math.sqrt((vertex.x - pos.x) ** 2 + (vertex.y - pos.y) ** 2);
                        var endPoint = {
                            x: vertex.x,
                            y: vertex.y
                        }

                        if (distance > radius) {
                            const angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                            endPoint = {
                                x: Math.cos(angle) * radius + pos.x,
                                y: Math.sin(angle) * radius + pos.y
                            }

                            distance = radius
                        }

                        var best = getIntersection(pos, endPoint, domain);

                        if (best.dist >= distance) {
                            best = {
                                x: endPoint.x,
                                y: endPoint.y,
                                dist: distance
                            }
                        }
                        vertices.push(best)


                        var angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                        endPoint = {
                            x: Math.cos(angle + 0.001) * radius + pos.x,
                            y: Math.sin(angle + 0.001) * radius + pos.y
                        }

                        best = getIntersection(pos, endPoint, domain);

                        if (best.dist >= radius) {
                            best = {
                                x: endPoint.x,
                                y: endPoint.y,
                                dist: radius
                            }
                        }
                        vertices.push(best)


                        angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                        endPoint = {
                            x: Math.cos(angle - 0.001) * radius + pos.x,
                            y: Math.sin(angle - 0.001) * radius + pos.y
                        }

                        best = getIntersection(pos, endPoint, domain);

                        if (best.dist >= radius) {
                            best = {
                                x: endPoint.x,
                                y: endPoint.y,
                                dist: radius
                            }
                        }
                        vertices.push(best)
                    }
                }
            }

            const outerCollisions = allCircleLineCollisions(pos, radius, domain);
            const circleCollisions = [];
            for (const line of outerCollisions) {
                for (const vertex of line) {
                    const distance = Math.sqrt((vertex.x - pos.x) ** 2 + (vertex.y - pos.y) ** 2)
                    const angle = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                    const queryPoint = {
                        x: Math.cos(angle) * (distance - 1) + pos.x,
                        y: Math.sin(angle) * (distance - 1) + pos.y
                    }
                    if (Math.abs(distance - radius) < 1 && Matter.Query.ray(domain, pos, queryPoint).length == 0) circleCollisions.push(vertex)
                }
            }

            for (var i = 0; i < circleCollisions.length; i++) {
                const vertex = circleCollisions[i];
                var nextIndex = i + 1;
                if (nextIndex == circleCollisions.length) nextIndex = 0;
                const nextVertex = circleCollisions[nextIndex];
                const angle1 = Math.atan2(vertex.y - pos.y, vertex.x - pos.x);
                const angle2 = Math.atan2(nextVertex.y - pos.y, nextVertex.x - pos.x);
                var newAngle;
                if (Math.abs(angle1) > Math.PI / 2 && Math.abs(angle2) > Math.PI / 2 && angle1 / Math.abs(angle1) != angle2 / Math.abs(angle2)) {
                    // if the arc between the to points crosses over the left side (+/- pi radians)
                    const newAngle1 = (Math.PI - Math.abs(angle1)) * (angle1 / Math.abs(angle1));
                    const newAngle2 = (Math.PI - Math.abs(angle2)) * (angle2 / Math.abs(angle2));
                    newAngle = (newAngle1 + newAngle2) / 2;
                    var multiplier;
                    if (newAngle == 0) {
                        multiplier = 1;
                    } else {
                        multiplier = newAngle / Math.abs(newAngle);
                    }
                    newAngle = Math.PI * multiplier - newAngle * multiplier;
                    test = true;
                } else {
                    newAngle = (angle1 + angle2) / 2;
                }

                // shoot ray between them
                var endPoint = {
                    x: Math.cos(newAngle) * radius + pos.x,
                    y: Math.sin(newAngle) * radius + pos.y
                }

                var best = getIntersection(pos, endPoint, domain);

                vertices.push(vertex);

                if (best.dist <= radius) vertices.push({ x: best.x, y: best.y })
            }

            vertices.sort((a, b) => Math.atan2(a.y - pos.y, a.x - pos.x) - Math.atan2(b.y - pos.y, b.x - pos.x));
            return vertices;
        }

        function compareArrays(array1, array2) {
            for (var i = 0; i < array1.length; i++) {
                if (array1[i] != array2[i]) return false;
            }

            return true;
        }

        function generateIntersectMap() {
            // include intersections in map elements to avoid LoS issues with overlapping
            const intersectMap = [];
            for (var i = 0; i < map.length; i++) {
                const obj = map[i];
                const newVertices = [];
                const restOfMap = [...map].slice(0, i).concat([...map].slice(i + 1))
                for (var j = 0; j < obj.vertices.length - 1; j++) {
                    var intersections = getIntersections(obj.vertices[j], obj.vertices[j + 1], restOfMap);
                    newVertices.push(obj.vertices[j]);
                    for (const vertex of intersections) {
                        newVertices.push({ x: vertex.x, y: vertex.y });
                    }
                }
                intersections = getIntersections(obj.vertices[obj.vertices.length - 1], obj.vertices[0], restOfMap);
                newVertices.push(obj.vertices[obj.vertices.length - 1]);
                for (const vertex of intersections) {
                    newVertices.push({ x: vertex.x, y: vertex.y });
                }

                intersectMap.push({ vertices: newVertices });
            }

            return intersectMap;
        }

        function addPartToMap(len) { // from "run" map
            map[len].collisionFilter.category = cat.map;
            map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            Matter.Body.setStatic(map[len], true);
            Composite.add(engine.world, map[len]);
        }

        level.setPosToSpawn(-500, -50);
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = 250;
        level.exit.y = 720;
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        level.defaultZoom = 1800;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#d8dadf";

        spawn.mapRect(-925, 0, 2650, 100);

        spawn.mapRect(-925, -1700, 325, 1800);
        spawn.mapRect(-650, -325, 325, 50);
        spawn.mapRect(-650, -1400, 325, 50);
        spawn.mapRect(-1700, -1700, 1100, 200);
        spawn.mapRect(-1700, -4600, 300, 3100);
        spawn.mapRect(-1700, -4600, 1250, 200);
        spawn.mapRect(200, -4600, 2750, 200);
        spawn.mapRect(-400, -4225, 200, 50);
        spawn.mapRect(2800, -4600, 150, 1400);

        spawn.mapRect(1350, -325, 100, 50);
        spawn.mapRect(1400, -1500, 325, 1600);
        spawn.mapRect(1400, -1500, 1550, 50);
        spawn.mapRect(1250, -1900, 1050, 50);
        spawn.mapRect(1250, -2900, 100, 1050);

        spawn.mapRect(-600, -2900, 3550, 100);
        spawn.mapRect(2850, -2900, 100, 700);
        spawn.mapRect(2850, -2200, 100, 350);
        map[map.length - 1].fallsOff2 = true; // this piece will fall off in the middle of cutscene

        spawn.mapRect(2300, -1900, 500, 50);
        map[map.length - 1].fallsOff = true; // this piece wall fall off at the start of cutscene

        spawn.mapRect(2800, -1900, 200, 50);
        spawn.mapRect(2900, -1900, 50, 450);
        powerUps.directSpawn(2700, -1675, "tech");

        spawn.mapRect(2800, -3300, 825, 100);
        spawn.mapRect(3525, -3300, 100, 3000);
        spawn.mapRect(3400, -2850, 225, 50);
        spawn.mapRect(2875, -2525, 175, 25);
        spawn.mapRect(3325, -2675, 150, 25);
        spawn.mapRect(3400, -2850, 75, 200);
        spawn.mapRect(3150, -2225, 100, 25);

        spawn.mapRect(-2300, 750, 5450, 100);

        pendulum1 = pendulum(400, -2500, 75, 1700, 50, 0.3, 0, 300);
        const gear1 = mapGear(-1200, -2000, 100, 200, 0, -0.05, 5, 75);
        const gear2 = mapGear(-700, -2500, 150, 270, -0.5, 0.05, 5, 50);
        const gear3 = mapGear(-3500, -1000, 1100, 1500, -0.5, 0.005, 10, 150, 40);
        const piston1 = customDoor(1650, -1850, 100, 350); // x, y, width, height, distance, speed = 1
        const piston2 = customDoor(1950, -1850, 100, 350);
        const piston3 = horizontalDoor(-2000, -4200, 300, 100, 300, 20);
        const piston4 = horizontalDoor(-2000, -3800, 300, 100, 300, 20);
        const piston5 = horizontalDoor(-2000, -3400, 300, 100, 300, 20);
        const piston6 = horizontalDoor(-2000, -3000, 300, 100, 300, 20);
        const piston7 = horizontalDoor(-2000, -2600, 300, 100, 300, 20);
        const hand1 = clockHand(400, -3700, 75, 600);
        const elevator1 = level.elevator(3200, 0, 150, 50, -1750, 0.0025, { up: 0.05, down: 0.2 });
        const lightButton = level.button(1400, -1900);
        lightButton.isUp = true;
        var lightOn = false;
        simulation.ephemera.push({
            name: "lightWire",
            do() {
                if (level.levels[level.onLevel] == "clock") {
                    // light wire
                    ctx.beginPath();
                    ctx.moveTo(1460, -1887);
                    ctx.lineTo(1300, -1887);
                    ctx.lineTo(1300, -2860);
                    ctx.lineTo(400, -2860);
                    ctx.lineTo(400, -2800);
                    ctx.lineWidth = 6;
                    ctx.strokeStyle = lightOn ? "#ffd700" : "000";
                    ctx.stroke();
                } else {
                    simulation.removeEphemera(this.name);
                }
            },
        })

        spawn.debris(-300, 0, 1300, 6);
        spawn.debris(0, -2900, 2500, 8);

        spawn.randomSmallMob(-500, -500, 1);
        spawn.randomMob(190, -1300, 1);
        spawn.randomMob(200, -320, 0.3);
        spawn.randomMob(1000, -1100, 1);
        spawn.randomMob(-160, -2050, 1);
        spawn.randomMob(-1100, -2900, 0.5);
        // spawn.randomLevelBoss(1900, -3800, spawn.randomBossList.splice(0, spawn.randomBossList.indexOf("shieldingBoss"), 1).concat(spawn.randomBossList.splice(spawn.randomBossList.indexOf("shieldingBoss") + 1))); // shieldingBoss lags out the lighting system for some reason
        spawn.randomLevelBoss(1900, -3800, [...spawn.randomBossList].splice(0, spawn.randomBossList.indexOf("shieldingBoss"), 1).concat([...spawn.randomBossList].splice(spawn.randomBossList.indexOf("shieldingBoss") + 1))); // shieldingBoss lags out the lighting system for some reason
        spawn.randomMob(2500, -3500, 0.3);
        spawn.randomMob(1300, -4100, 0.5);
        spawn.randomMob(3400, -2450, 1);
        spawn.randomMob(2850, -2050, 0.4);
        spawn.randomGroup(-150, -2400, 0.5);
        spawn.randomMob(-1250, -5150, 1);
        spawn.randomMob(-2900, -4000, 0.4);
        spawn.randomMob(-1350, -950, 1);
        spawn.randomMob(2700, -850, 0.4);
        spawn.randomMob(2500, -50, 0.4);

        powerUps.addResearchToLevel() // needs to run after mobs are spawned

        var dealtPiston1Damage = false;
        var dealtPiston2Damage = false;
        var dealtPiston1MobDamage = false;
        var dealtPiston2MobDamage = false;
        var lastPistonDirection = false;
        var pistonsLocked = false;
        var finishedGearFight = false;
        var roofReadyToFall = false;
        var roofFallCycle = 0;
        var drawGear = false;
        var gearCycle = simulation.cycle;
        var gearPositions = [];
        var pistonUnlockCycle = 0;

        for (var i = 0; i < 15; i++) {
            gearPositions.push({
                x: 2400 + Math.random() * 200,
                y: -3300 - Math.random() * 3000
            });
        }

        var gearSizes = [];

        for (var i = 0; i < 15; i++) {
            const r1 = 30 + Math.random() * 50;
            gearSizes.push({
                r1: r1,
                r2: r1 + 15 + Math.random() * 30
            })
        }

        var circleHead = Matter.Bodies.polygon(m.pos.x, m.pos.y, 0, 31);
        var losDomain = generateIntersectMap().concat(mob.filter((obj) => { return obj.isNotCloaked == null && (obj.isBoss || obj.label != 'Circle Body') }), [pendulum1, gear1, gear2, player, circleHead]);
        var oldMap = [...map];
        var oldMob = [...mob];
        var spawnGearMobCycle = 0;
        var gearsSpawned = 0;
        var lastSmallGearRot = 0;
        var smallGearRot = 0;
        var smallGearPosRot = 0;
        var bigGearRot = 0;
        var finalGearRot;
        var lastFinalGearRot;
        var startCycle = simulation.cycle; // used to offset simulation.cycle to avoid the swing starting halfway through at the start of the level and messing up syncronization

        level.custom = () => {
            if (lightOn) {
                Matter.Body.setPosition(circleHead, m.pos)
                if (!(compareArrays(oldMap, map) && compareArrays(oldMob, mob))) losDomain = generateIntersectMap().concat(mob.filter((obj) => { return obj.isNotCloaked == null && (obj.isBoss || obj.label != 'Circle Body') }), [pendulum1, gear1, gear2, player, circleHead]);
                oldMap = [...map];
                oldMob = [...mob];
            }
            ctx.fillStyle = "#b0b0b2";
            ctx.fillRect(-600, -1700, 2000, 1700);
            ctx.fillRect(1350, -1851, 1550, 350);
            ctx.fillRect(-1400, -2950, 4250, 1450);
            ctx.fillRect(-1400, -4400, 4350, 1500);
            ctx.fillRect(-450, -4600, 650, 250);
            ctx.fillRect(2750, -3200, 200, 1300);
            ctx.fillRect(2750, -3200, 200, 1300);
            ctx.fillStyle = "#000";
            ctx.fillRect(350, -2800, 100, 25);
            // light
            if (lightOn) {
                var lightPos = { x: 400, y: -2775 };
                var lightRadius = 2950;
                const vertices = circleLoS(lightPos, lightRadius, map.concat(mob.filter((obj) => { return obj.isNotCloaked == null && (obj.isBoss || obj.label != 'Circle Body') }), [pendulum1, gear1, gear2, player, circleHead])); if (vertices.length > 0 && vertices[0].x) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (var i = 1; i < vertices.length; i++) {
                        var currentDistance = Math.sqrt((vertices[i - 1].x - lightPos.x) ** 2 + (vertices[i - 1].y - lightPos.y) ** 2);
                        var newDistance = Math.sqrt((vertices[i].x - lightPos.x) ** 2 + (vertices[i].y - lightPos.y) ** 2);
                        if (Math.abs(currentDistance - lightRadius) < 1 && Math.abs(newDistance - lightRadius) < 1) {
                            const currentAngle = Math.atan2(vertices[i - 1].y - lightPos.y, vertices[i - 1].x - lightPos.x);
                            const newAngle = Math.atan2(vertices[i].y - lightPos.y, vertices[i].x - lightPos.x);
                            ctx.arc(lightPos.x, lightPos.y, lightRadius, currentAngle, newAngle);
                        } else {
                            ctx.lineTo(vertices[i].x, vertices[i].y)
                        }
                    }
                    newDistance = Math.sqrt((vertices[0].x - lightPos.x) ** 2 + (vertices[0].y - lightPos.y) ** 2);
                    currentDistance = Math.sqrt((vertices[vertices.length - 1].x - lightPos.x) ** 2 + (vertices[vertices.length - 1].y - lightPos.y) ** 2);
                    if (Math.abs(currentDistance - lightRadius) < 1 && Math.abs(newDistance - lightRadius) < 1) {
                        const currentAngle = Math.atan2(vertices[vertices.length - 1].y - lightPos.y, vertices[vertices.length - 1].x - lightPos.x);
                        const newAngle = Math.atan2(vertices[0].y - lightPos.y, vertices[0].x - lightPos.x);
                        ctx.arc(lightPos.x, lightPos.y, lightRadius, currentAngle, newAngle);
                    } else {
                        ctx.lineTo(vertices[0].x, vertices[0].y)
                    }
                    ctx.fillStyle = "rgba(216, 218, 223, 0.5)";
                    ctx.fill();
                }
            }

            ctx.beginPath();
            ctx.moveTo(425, -2775);
            ctx.arc(400, -2775, 25, 0, Math.PI);
            ctx.fillStyle = lightOn ? "#ffe245" : "transparent";
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.stroke();
            pendulum1.rotate();
            gear1.rotate();
            gear2.rotate();
            gear3.rotate();
            hand1.rotate();
            drawBackgroundGear(-1200, -2300, 75, 150, 0.3, "#ccc", -0.05);
            drawBackgroundGear(-1010, -2380, 30, 100, -0.1, "#ccc", 0.05);

            // pendulum gears
            if (!m.isTimeDilated) smallGearPosRot += Math.sin((simulation.cycle - startCycle) / 50) * 0.3 - Math.sin((simulation.cycle - startCycle - 1) / 50) * 0.3;
            if (smallGearPosRot > 0.1) smallGearPosRot = 0.1;
            if (smallGearPosRot < -0.1) smallGearPosRot = -0.1;
            var circ = 2 * Math.PI * 150;
            var arcLength = ((smallGearPosRot - Math.sin((simulation.cycle - startCycle) / 50) * 0.2) / (Math.PI * 2)) * circ;
            lastSmallGearRot = smallGearRot;
            smallGearRot = arcLength / (2 * Math.PI * 50) * Math.PI * -2 + 0.6;

            if (Math.abs(smallGearPosRot) == 0.1) {
                bigGearRot += Math.abs((smallGearRot - lastSmallGearRot) * (50 / 75));
            }

            drawBackgroundGear(740, -2625, 270, 330, bigGearRot, "#d2d3d4", 0, 15, 20); // the big one in the background

            drawBackgroundGear(400, -2500, 100, 150, Math.sin((simulation.cycle - startCycle) / 50) * -0.3, "#ccc", 0, 8, 20); // attached to pendulum

            drawBackgroundGear(400 + Math.cos(smallGearPosRot) * 200, -2500 + Math.sin(smallGearPosRot) * 200, 50, 75, smallGearRot, "#ccc", 0, 7, 20);
            ctx.beginPath();
            ctx.arc(400 + Math.cos(smallGearPosRot) * 200, -2500 + Math.sin(smallGearPosRot) * 200, 10, 0, 2 * Math.PI);
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 10;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(400, -2500, 200, -0.1, 0.1);
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 10;
            ctx.stroke();

            drawBackgroundGear(740, -2625, 75, 110, bigGearRot, "#ccc", 0, 8, 20);
            ctx.beginPath();
            ctx.arc(740, -2625, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#bbb";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            drawBackgroundGear(740, -2375, 75, 110, bigGearRot * -1, "#ccc", 0, 8, 20);
            ctx.beginPath();
            ctx.arc(740, -2375, 40, 0, 2 * Math.PI);
            ctx.fillStyle = "#bbb";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();

            drawDiagonalBelt({ x: 740, y: -2625, radius: 40 }, { x: 740, y: -2375, radius: 40 })

            if (finalGearRot != null) lastFinalGearRot = finalGearRot;
            finalGearRot = Math.round((-bigGearRot * 294.72 / 25) * 100) / 100 + Math.PI / 2;

            drawBackgroundGear(1080, -2650, 10, 20, finalGearRot, "#ccc", 0, 5, 50);
            ctx.beginPath();
            ctx.arc(1080, -2650, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "#bbb";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            drawBackgroundGear(1650, -2550, 300, 360, finalGearRot, "#ccc", 0, 6, 50);
            ctx.beginPath();
            ctx.arc(1650, -2550, 100, 0, 2 * Math.PI);
            ctx.fillStyle = "#bbb";
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
            drawBelt({ x: 1080, y: -2650, radius: 10 }, { x: 1650, y: -2550, radius: 100 });
            ctx.beginPath();
            ctx.arc(Math.cos(-finalGearRot) * 294 + 1650, Math.sin(-finalGearRot) * 294 - 2550, 25, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();
            drawBackgroundGear(2300, -2550, 300, 360, -finalGearRot + 0.5, "#ccc", 0, 6, 50);
            ctx.beginPath();
            ctx.arc(Math.cos(finalGearRot) * 294 + 2300, Math.sin(finalGearRot) * 294 - 2550, 25, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(1630, -2215, 15, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(1670, -2215, 15, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(1940, -2250, 15, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(2300, -2215, 15, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();

            if (!finishedGearFight && !pistonsLocked && m.pos.x > 2100 && m.pos.x < 2900 && m.pos.y > -1850 && m.pos.y < -1500) {
                pistonsLocked = true;
                roofFallCycle = simulation.cycle + 250;
                roofReadyToFall = true;
            }

            if (roofReadyToFall && simulation.cycle >= roofFallCycle) {
                // section of roof is deleted
                for (var i = 0; i < map.length; i++) {
                    if (map[i].fallsOff) {
                        Matter.Composite.remove(engine.world, map[i]);
                        map.splice(i, 1);
                    }
                }

                // replace it with a block
                spawn.bodyRect(2310, -1900, 480, 50);
                roofReadyToFall = false;
                drawGear = true;
                gearCycle = simulation.cycle + 100;
            }

            //draw some background gears falling when roof falls
            if (drawGear && simulation.cycle >= gearCycle) {
                for (var i = 0; i < 15; i++) {
                    drawFallingBackgroundGear(gearPositions[i].x, gearPositions[i].y, gearSizes[i].r1, gearSizes[i].r2, simulation.cycle, "#ccc", 0.1, 25, gearCycle);
                }

                if (spawnGearMobCycle == 0) {
                    spawnGearMobCycle = simulation.cycle + 100;
                }
            }

            if (spawnGearMobCycle > 0 && simulation.cycle >= spawnGearMobCycle) {
                if (gearsSpawned < 40) {
                    gearMob(1600 + Math.random() * 1000, -2300 - Math.random() * 300, false, true);
                    gearsSpawned++;
                    spawnGearMobCycle = simulation.cycle + 25 - (simulation.difficulty - simulation.difficultyMode) / 2;
                } else if (pistonUnlockCycle == 0) {
                    pistonUnlockCycle = simulation.cycle + 50;
                }
            }

            if (!finishedGearFight && pistonUnlockCycle > 0 && simulation.cycle > pistonUnlockCycle) {
                pistonsLocked = false;
                finishedGearFight = true;

                for (var i = 0; i < map.length; i++) {
                    if (map[i].fallsOff2) {
                        Matter.Composite.remove(engine.world, map[i]);
                        map.splice(i, 1);
                    }
                }

                spawn.bodyRect(2850, -2180, 100, 280);
                Matter.Body.setAngularVelocity(body[body.length - 1], 0.025);
            }

            if (Math.sin((simulation.cycle + 15) / 25) < 0 && !lastPistonDirection) { // 15 cycles early to line up better with pendulum
                piston3.isClosing = true;
                piston4.isClosing = false;
                piston5.isClosing = true;
                piston6.isClosing = false;
                piston7.isClosing = true;
            } else if (Math.sin((simulation.cycle + 15) / 25) > 0 && lastPistonDirection) {
                piston3.isClosing = false;
                piston4.isClosing = true;
                piston5.isClosing = false;
                piston6.isClosing = true;
                piston7.isClosing = false;
            }

            if (Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) < -0.01) {
                dealtPiston1Damage = false;
                dealtPiston1MobDamage = false;
            }
            if (Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) > 0.01) {
                dealtPiston2Damage = false;
                dealtPiston2MobDamage = false;
            }

            piston3.openClose();
            piston4.openClose();
            piston5.openClose();
            piston6.openClose();
            piston7.openClose();

            if (!pistonsLocked) {
                piston1.isLocked = false;
            }

            if (!pistonsLocked || ((Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) != 0 || piston1.position.y < -1850) && !piston1.isLocked)) {
                piston1.setPos(1650, -1850 + Math.sin(-finalGearRot) * 175);
            } else {
                piston1.isLocked = true;
            }

            piston2.setPos(1950, -1850 + Math.sin(finalGearRot) * 175);
            ctx.beginPath();
            ctx.moveTo(Math.cos(-finalGearRot) * 294 + 1650, Math.sin(-finalGearRot) * 294 - 2550);
            ctx.lineTo(1650, -2230);
            ctx.lineTo(piston1.position.x, piston1.position.y - 175)
            ctx.strokeStyle = "#777";
            ctx.lineWidth = 10;
            ctx.stroke();

            var circle1;
            var circle2;
            if (Math.cos(finalGearRot) * 294 > 0) {
                circle1 = {
                    x: Math.cos(finalGearRot) * 294 + 2300,
                    y: Math.sin(finalGearRot) * 294 - 2550,
                    radius: -25
                }

                circle2 = {
                    x: 2300,
                    y: -2215,
                    radius: -15
                }
            } else {
                circle1 = {
                    x: Math.cos(finalGearRot) * 294 + 2300,
                    y: Math.sin(finalGearRot) * 294 - 2550,
                    radius: 25
                }

                circle2 = {
                    x: 2300,
                    y: -2215,
                    radius: 15
                }
            }

            // same method used in drawBelt()
            var distance = Math.sqrt((circle2.x - circle1.x) ** 2 + (circle2.y - circle1.y) ** 2);
            var distanceToIntersection = (-circle1.radius * distance) / (-circle1.radius + circle2.radius);
            var slopeAngle = Math.atan((circle2.y - circle1.y) / (circle2.x - circle1.x));
            var angleToTangent = Math.acos(-circle1.radius / distanceToIntersection);
            const tangentPoint = {
                x: Math.cos(angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }

            // same method used in drawDiagonalBelt()
            const circle3 = {
                x: 1940,
                y: -2250,
                radius: 15
            }

            distance = Math.sqrt((circle2.x - circle3.x) ** 2 + (circle2.y - circle3.y) ** 2);
            distanceToIntersection = (circle3.radius * distance) / (circle3.radius + circle2.radius);
            slopeAngle = Math.atan((circle2.y - circle3.y) / (circle2.x - circle3.x));
            angleToTangent = Math.acos(circle3.radius / distanceToIntersection);
            const invertedTangentPoint2 = {
                x: Math.cos(-angleToTangent + slopeAngle) * circle3.radius + circle3.x,
                y: Math.sin(-angleToTangent + slopeAngle) * circle3.radius + circle3.y
            }

            const tangentPoint3 = {
                x: Math.cos(angleToTangent + slopeAngle) * -circle2.radius + circle2.x,
                y: Math.sin(angleToTangent + slopeAngle) * -circle2.radius + circle2.y
            }

            distance = Math.sqrt((piston2.position.y - 175 - circle3.y) ** 2 + (piston2.position.x - 50 - circle3.x) ** 2);
            slopeAngle = Math.atan((piston2.position.y - 175 - circle3.y) / (piston2.position.x - 50 - circle3.x));
            angleToTangent = Math.acos(circle3.radius / distance);
            const tangentPoint4 = {
                x: Math.cos(angleToTangent) * distance + circle3.x,
                y: Math.sin(angleToTangent) * distance + circle3.y
            }

            // draw
            ctx.beginPath();
            ctx.moveTo(circle1.x, circle1.y);
            ctx.lineTo(tangentPoint.x, tangentPoint.y);
            const newAngle = Math.atan((tangentPoint.y - circle2.y) / (tangentPoint.x - circle2.x));
            const newAngle2 = Math.atan((tangentPoint3.y - circle2.y) / (tangentPoint3.x - circle2.x));
            ctx.arc(circle2.x, circle2.y, Math.abs(circle2.radius), newAngle, -newAngle2);
            ctx.lineTo(invertedTangentPoint2.x, invertedTangentPoint2.y);
            const newAngle3 = Math.atan((invertedTangentPoint2.y - circle3.y) / (invertedTangentPoint2.x - circle3.x));
            ctx.arc(circle3.x, circle3.y, circle3.radius, newAngle3, Math.PI / 2 + angleToTangent, true);
            ctx.lineTo(tangentPoint4.x, tangentPoint4.y);
            ctx.strokeStyle = '#777';
            ctx.lineWidth = 10;
            ctx.stroke();

            lastPistonDirection = Math.sin((simulation.cycle + 15) / 25) < 0;

            if (Matter.Query.ray([player], Matter.Vector.create(piston1.position.x - 50, piston1.position.y + 175), Matter.Vector.create(piston1.position.x + 50, piston1.position.y + 175), 5).length > 0 && !dealtPiston1Damage && Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) > 0.01) {
                m.takeDamage(0.1);
                dealtPiston1Damage = true;
            }

            var piston1MobCollisions = Matter.Query.ray(mob, Matter.Vector.create(piston1.position.x - 50, piston1.position.y + 175), Matter.Vector.create(piston1.position.x + 50, piston1.position.y + 175), 5);
            if (piston1MobCollisions.length > 0 && !dealtPiston1MobDamage && Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) > 0.01) {
                for (var mobHit of piston1MobCollisions) {
                    mobHit.body.damage(1);
                }
                dealtPiston1MobDamage = true;
            }

            if (Matter.Query.ray([player], Matter.Vector.create(piston2.position.x - 50, piston2.position.y + 175), Matter.Vector.create(piston2.position.x + 50, piston2.position.y + 175), 5).length > 0 && !dealtPiston2Damage && Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) < -0.01) {
                m.takeDamage(0.1);
                dealtPiston2Damage = true;
            }

            var piston2MobCollisions = Matter.Query.ray(mob, Matter.Vector.create(piston2.position.x - 50, piston2.position.y + 175), Matter.Vector.create(piston2.position.x + 50, piston2.position.y + 175), 5);
            if (piston2MobCollisions.length > 0 && !dealtPiston2MobDamage && Math.sin(-finalGearRot) - Math.sin(-lastFinalGearRot) > 0.01) {
                for (var mobHit of piston2MobCollisions) {
                    mobHit.body.damage(1);
                }
                dealtPiston2MobDamage = true;
            }

            // clock
            ctx.beginPath();
            ctx.arc(400, -3700, 600, 0, 2 * Math.PI);
            ctx.fillStyle = "#e9e9e9";
            ctx.fill();
            ctx.strokeStyle = "#3a3f20";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.lineCap = "butt";
            ctx.beginPath();
            ctx.moveTo(350, -4275);
            ctx.lineTo(390, -4150);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 20;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(390, -4275);
            ctx.lineTo(350, -4150);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(420, -4275);
            ctx.lineTo(420, -4150);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(450, -4275);
            ctx.lineTo(450, -4150);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(-Math.PI / 3) * 510,
                y: -3700 + Math.sin(-Math.PI / 3) * 510
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x, numberOffset.y + 63);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(-Math.PI / 6) * 510,
                y: -3700 + Math.sin(-Math.PI / 6) * 510
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 20, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 20, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 20, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 20, numberOffset.y + 63);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(870, -3762);
            ctx.lineTo(870, -3637);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(910, -3762);
            ctx.lineTo(910, -3637);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(950, -3762);
            ctx.lineTo(950, -3637);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI / 6) * 535,
                y: -3700 + Math.sin(Math.PI / 6) * 535
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 50, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 50, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 20, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x, numberOffset.y + 53);
            ctx.lineTo(numberOffset.x + 20, numberOffset.y - 62);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI / 3) * 515,
                y: -3700 + Math.sin(Math.PI / 3) * 515
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 20, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x, numberOffset.y + 53);
            ctx.lineTo(numberOffset.x + 20, numberOffset.y - 62);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI / 2) * 515,
                y: -3700 + Math.sin(Math.PI / 2) * 515
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 35, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 15, numberOffset.y + 53);
            ctx.lineTo(numberOffset.x + 5, numberOffset.y - 62);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 35, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 35, numberOffset.y + 63);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI * 2 / 3) * 500,
                y: -3700 + Math.sin(Math.PI * 2 / 3) * 500
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 65, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 45, numberOffset.y + 53);
            ctx.lineTo(numberOffset.x - 25, numberOffset.y - 62);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 5, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 5, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 35, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 35, numberOffset.y + 63);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI * 5 / 6) * 500,
                y: -3700 + Math.sin(Math.PI * 5 / 6) * 500
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 65, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 45, numberOffset.y + 53);
            ctx.lineTo(numberOffset.x - 25, numberOffset.y - 62);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 5, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 5, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 35, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 35, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x + 65, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 65, numberOffset.y + 63);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(Math.PI) * 500,
                y: -3700 + Math.sin(Math.PI) * 500
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 5, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 35, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 5, numberOffset.y + 63);
            ctx.lineTo(numberOffset.x + 35, numberOffset.y - 62);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 35, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x - 35, numberOffset.y + 63);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(-Math.PI * 5 / 6) * 500,
                y: -3700 + Math.sin(-Math.PI * 5 / 6) * 500
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 25, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 25, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 25, numberOffset.y + 63);
            ctx.lineTo(numberOffset.x + 25, numberOffset.y - 62);
            ctx.stroke();

            var numberOffset = {
                x: 400 + Math.cos(-Math.PI * 2 / 3) * 500,
                y: -3700 + Math.sin(-Math.PI * 2 / 3) * 500
            }
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 10, numberOffset.y - 62);
            ctx.lineTo(numberOffset.x + 40, numberOffset.y + 63);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 10, numberOffset.y + 63);
            ctx.lineTo(numberOffset.x + 40, numberOffset.y - 62);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(numberOffset.x - 40, numberOffset.y + 63);
            ctx.lineTo(numberOffset.x - 40, numberOffset.y - 62);
            ctx.stroke();

            ctx.lineCap = "round";

            level.exit.drawAndCheck();
            level.enter.draw();
        }

        var lastBlock = Math.sin(simulation.cycle / 50) < 0;

        level.customTopLayer = () => {
            if (!lightOn) lightButton.query();
            if (!lightButton.isUp) lightOn = true;
            lightButton.draw();
            elevator1.move();

            ctx.beginPath();
            ctx.moveTo(pendulum1.parts[2].vertices[0].x, pendulum1.parts[2].vertices[0].y);
            for (var i = 0; i < pendulum1.parts[2].vertices.length; i++) {
                ctx.lineTo(pendulum1.parts[2].vertices[i].x, pendulum1.parts[2].vertices[i].y);
            }
            ctx.lineTo(pendulum1.parts[2].vertices[0].x, pendulum1.parts[2].vertices[0].y);
            ctx.fillStyle = "#999";
            ctx.fill();
            ctx.lineWidth = 2
            ctx.strokeStyle = color.blockS;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(gear3.parts[1].vertices[0].x, gear3.parts[1].vertices[0].y);
            for (var i = 0; i < gear3.parts[1].vertices.length; i++) {
                ctx.lineTo(gear3.parts[1].vertices[i].x, gear3.parts[1].vertices[i].y);
            }
            ctx.lineTo(gear3.parts[1].vertices[0].x, gear3.parts[1].vertices[0].y);
            ctx.fillStyle = "#999";
            ctx.fill();
            ctx.lineWidth = 2
            ctx.strokeStyle = color.blockS;
            ctx.stroke();

            ctx.fillStyle = "#444";
            ctx.fillRect(3275, -1750, 1, 1750);

            ctx.fillStyle = "#888";

            if (Math.sin(simulation.cycle / 50) < 0 && !lastBlock) {
                // remove old elements
                for (var i = 0; i < map.length; i++) {
                    if (map[i].isRemove) {
                        Matter.Composite.remove(engine.world, map[i]);
                        map.splice(i, 1);
                    }
                }

                // add new element
                spawn.mapRect(-200, -600, 275, 50);
                addPartToMap(map.length - 1);
                map[map.length - 1].isRemove = true;
            } else if (Math.sin(simulation.cycle / 50) * 0.3 >= 0 && lastBlock) {
                for (var i = 0; i < map.length; i++) {
                    if (map[i].isRemove) {
                        Matter.Composite.remove(engine.world, map[i]);
                        map.splice(i, 1);
                    }
                }

                spawn.mapRect(825, -600, 275, 50);
                addPartToMap(map.length - 1);
                map[map.length - 1].isRemove = true;
            }

            simulation.draw.setPaths();
            lastBlock = Math.sin(simulation.cycle / 50) * 0.3 < 0;
        }
    },
    superNgonBros() {
        simulation.inGameConsole(`<strong>Super N-gon Bros</strong> by <span class='color-var'>DesBoot</span>`);

        let bowserKilled = 0
        let flagY = -750
        let flagReached = 0
        const elevator1 = level.elevator(3975, -11650, 450, 50, -13100, 0.003)
        const elevator2 = level.elevator(5575, -11650, 450, 50, -13100, 0.003)
        let firstElevatorY = -11650

        const portal = level.portal({ x: 3990, y: 100 }, 1.5 * Math.PI, { x: 100, y: -13500 }, -1.5 * Math.PI)
        const portal2 = level.portal({ x: 7135, y: -12270 }, -1 * Math.PI, { x: 12325, y: -2000 }, -1.5 * Math.PI)

        const bowser = function (x, y, radius = 150) { //define the mob the same as spawn mob code
            mobs.spawn(x, y, 5, radius, "rgb(0,200,180)");
            let me = mob[mob.length - 1];
            me.tier = 1
            me.accelMag = 0.05;
            me.g = 0.002; //required if using this.gravity
            me.frictionAir = 0.01;
            me.friction = 1
            me.frictionStatic = 1
            me.restitution = 0;
            me.delay = 80 * simulation.CDScale;
            me.randomHopFrequency = 200 + Math.floor(Math.random() * 150);
            me.randomHopCD = simulation.cycle + me.randomHopFrequency;
            Matter.Body.rotate(me, Math.random() * Math.PI);
            spawn.shield(me, x, y);
            me.do = function () {
                //spawn.grenade(me.position.x, me.position.y);
                // //const v = 5 * simulation.accelScale;
                // Matter.Body.setVelocity(mob[mob.length - 1], {
                //     x: this.velocity.x + this.fireDir.x * v + Math.random(),
                //     y: this.velocity.y + this.fireDir.y * v + Math.random()
                // });
                this.gravity();
                this.seePlayerCheck();
                this.checkStatus();
                if (this.seePlayer.recall) {
                    if (this.cd < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                        this.cd = simulation.cycle + this.delay;
                        const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass;
                        const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                        this.force.x += forceMag * Math.cos(angle) * 0.5;
                        this.force.y += (forceMag * Math.sin(angle) - (Math.random() * 0.07 + 0.1) * this.mass) * 0.7; //antigravity
                        if (Math.random() < 0.5) {
                            spawn.grenade(me.position.x, me.position.y - 250 * Math.random(), this.tier, 500);
                            Matter.Body.setVelocity(mob[mob.length - 1], {
                                x: -5,
                                y: 0
                            });
                        } else {
                            spawn.bullet(this.position.x, this.position.y, 25);
                            Matter.Body.setVelocity(mob[mob.length - 1], {
                                x: -25,
                                y: -25
                            });
                        }
                    }
                } else {
                    //randomly hob if not aware of player
                    if (this.randomHopCD < simulation.cycle && (Matter.Query.collides(this, map).length || Matter.Query.collides(this, body).length)) {
                        this.randomHopCD = simulation.cycle + this.randomHopFrequency;
                        //slowly change randomHopFrequency after each hop
                        this.randomHopFrequency = Math.max(100, this.randomHopFrequency + (0.5 - Math.random()) * 200);
                        const forceMag = (this.accelMag + this.accelMag * Math.random()) * this.mass * (0.1 + Math.random() * 0.3);
                        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
                        this.force.x += forceMag * Math.cos(angle);
                        this.force.y += forceMag * Math.sin(angle) - 0.07 * this.mass; //antigravity
                        spawn.grenade(me.position.x, me.position.y - 250 * Math.random(), this.tier, 500);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: -5,
                            y: 0
                        });
                    }
                }
            };
            me.onDeath = function () {
                powerUps.spawnBossPowerUp(this.position.x, this.position.y)
                bowserKilled = 1
            }

        }

        bowser(20500, -400) //call the mob
        //fire(15300, -200)
        const brick = function (x, y, angle = Math.PI * 0.5, radius = 53) {//credit to Richard0820 for the code
            mobs.spawn(x, y, 4, radius, "#ab6101");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.isDropPowerUp = false;
            me.showHealthBar = false;
            Matter.Body.setDensity(me, 999999)
            me.collisionFilter.mask = cat.player | cat.mob | cat.bullet;
            me.constraint = Constraint.create({
                pointA: {
                    x: me.position.x,
                    y: me.position.y
                },
                bodyB: me,
                stiffness: 0,
                damping: 0
            });
            me.do = function () {
                this.isStunned = true;
                if (this.health < 1) {
                    this.health += 0.001; //regen
                }
                this.checkStatus();
                Matter.Body.setAngle(me, angle);
                if ((player.velocity.y < 0 && player.position.y > me.position.y || player.velocity.y > 30 && player.position.y < me.position.y) && Math.abs(player.position.x - me.position.x) < 50 && Math.abs(player.position.y - me.position.y) < 150) {
                    me.death()
                }
            };

            me.onHit = function () {

                if (player.velocity.y < 0 && player.position.y > me.position.y || player.velocity.y > 30 && player.position.y < me.position.y) {

                    me.death()

                }
            }
            me.onDeath = function () {
                if (Math.random() < 0.1) {
                    spawn.randomSmallMob(me.position.x, me.position.y - 75);
                    simulation.inGameConsole('mob')
                } else {
                    if (Math.random() < 0.07) {
                        powerUps.spawn(me.position.x, me.position.y + (75 * (player.velocity.y / Math.abs(player.velocity.y))), "tech", true);
                        simulation.inGameConsole('tech')
                    } else {
                        if (Math.random() < 0.4) {
                            powerUps.spawn(me.position.x, me.position.y + (75 * (player.velocity.y / Math.abs(player.velocity.y))), "heal", true);
                            simulation.inGameConsole('heal')
                        } else {
                            //if (Math.random() < 0.8){
                            powerUps.spawn(me.position.x, me.position.y + (75 * (player.velocity.y / Math.abs(player.velocity.y))), "ammo", true);
                            simulation.inGameConsole('ammo')
                            //}
                        }
                    }
                }
            }
            Composite.add(engine.world, me.constraint);
        }
        // simulation.enableConstructMode()
        let firstMobsSpawned = 1
        let secondMobsSpawned = 0
        let thirdMobsSpawned = 0
        let fourthMobsSpawned = 0
        let firstMobsReached = 0
        let secondMobsReached = 0
        let thirdMobsReached = 0
        let fourthMobsReached = 0
        let finalRoomReached = 0
        let undergroundMobsSpawned = 0
        let undergroundMobsReached = 0


        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 22100;
        level.exit.y = -40;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#a2a5ff";
        // color.map = "#444" //custom map color

        level.custom = () => {
            if (player.position.x > 14950 && flagReached == 0) {
                flagReached = 1
            }
            if (flagReached == 1 && flagY < -150) {
                flagY += 5
            }
            ctx.fillStyle = "rgba(64,64,64,0.97)"
            ctx.fillRect(4200, -13100, 2, 1450)
            ctx.fillRect(5800, -13100, 2, 1450)
            if (firstElevatorY < -12099) {
                firstElevatorY = -11650
            } else {
                firstElevatorY -= 5
            }

            //simulation.inGameConsole(firstElevatorY)
            elevator1.move();
            elevator2.move();
            if (player.position.x > 0 && player.position.y < -9000 && player.position.y > -10000) {
                m.takeDamage(0.05 * simulation.difficultyMode)
                Matter.Body.setPosition(player, {
                    x: 275,
                    y: -12175
                });
            }

            portal[2].query()
            portal[3].query()
            portal2[2].query()
            portal2[3].query()
            //simulation.inGameConsole(firstBlockBroken)
            level.exit.drawAndCheck();
            if (player.position.x > 4100 && secondMobsReached == 0) {
                secondMobsSpawned = 1
            }
            if (player.position.x > 7000 && thirdMobsReached == 0) {
                thirdMobsSpawned = 1
            }
            if (player.position.x > 14300 && fourthMobsReached == 0) {
                fourthMobsSpawned = 1
            }
            if (player.position.y < -11000 && undergroundMobsReached == 0) {
                undergroundMobsSpawned = 1
            }//player.position.x > 14300 && 
            if (m.onGround) {
                if (Math.abs(player.velocity.x) > 0.3) {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x + (0.1 * (Math.abs(player.velocity.x) / player.velocity.x)),
                        y: player.velocity.y + 0.2
                    });
                } else {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: player.velocity.y + 0.2
                    });
                }
            } else {
                if (input.down) {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: player.velocity.y + 2
                    });
                } else {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: player.velocity.y + 0.2
                    });
                }
            }

            level.enter.draw();
            if (finalRoomReached == 0 && player.position.x > 21150) {
                finalRoomReached = 1
                simulation.inGameConsole('Thank you M, but our techs are in another castle!')
            }
            //mobs
            if (firstMobsSpawned == 1 && firstMobsReached == 0) {
                spawn.randomSmallMob(1260, -75);
                spawn.randomMob(2100, -75, 0.4);
                spawn.randomSmallMob(2400, -75);
                spawn.randomSmallMob(2500, -75);
                spawn.randomMob(2900, -75, 0.2);
                spawn.randomMob(3400, -75, 0.4);
                spawn.randomMob(3400, -75, 0.4);
                firstMobsReached = 1
            }
            if (secondMobsSpawned == 1 && secondMobsReached == 0) {
                spawn.randomSmallMob(4400, -75);
                spawn.randomSmallMob(5500, -75);
                spawn.randomSmallMob(5835.6, -402.4);
                spawn.randomSmallMob(5835.6, -402.4);
                spawn.randomSmallMob(6543.2, -730.0);
                spawn.randomMob(6795.4, -162.4, 0.1);
                spawn.randomMob(6795.4, -162.4, 0.1);
                secondMobsReached = 1
            }
            if (thirdMobsSpawned == 1 && thirdMobsReached == 0) {
                spawn.randomMob(8465.6, -469.9, 0.1);
                spawn.randomMob(9839.6, -444.5, 0.4);
                spawn.randomSmallMob(11033.2, -155.3);
                spawn.randomMob(12161.3, -85.1, 0.3);
                spawn.randomMob(12161.3, -85.1, 0.3);
                spawn.randomMob(13399.8, -93.4, 0.4);
                thirdMobsReached = 1

            }
            if (fourthMobsSpawned == 1 && fourthMobsReached == 0) {
                spawn.randomSmallMob(16500, -400);
                spawn.randomSmallMob(19278.9, -211.1);
                spawn.randomMob(18839.0, -463.2, 0.3);
                spawn.randomMob(18036.9, -205.9, 0.3);
                spawn.randomMob(16950.4, -365.2, 0.4);
                spawn.randomMob(16355.6, -390.8, 0.1);

                fourthMobsReached = 1

            }
            if (undergroundMobsSpawned == 1 && undergroundMobsReached == 0) {
                spawn.randomSmallMob(1140.0, -12228.0);
                spawn.randomSmallMob(2429.9, -12371.2);
                spawn.randomSmallMob(4899.4, -12139.6);
                spawn.randomMob(18839.0, -463.2, 0.3);
                spawn.randomMob(2844.5, -12281.0, 0.2);
                spawn.randomMob(4967.5, -12550.8, 0.4);
                spawn.randomMob(6696.9, -12437.9, 0.1);

                undergroundMobsReached = 1

            }
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
            portal2[0].draw();
            portal2[1].draw();
            portal2[2].draw();
            portal2[3].draw();
        };
        level.customTopLayer = () => {
            //spawn.mapRect(886, firstElevatorY + 10000, 75, 5);

            ctx.fillStyle = "rgba(64,64,64,0.97)"
            ctx.fillRect(3928, -300, 120, 500)
            //6940, -12360, 200, 5
            ctx.fillRect(6940, -12350, 170, 120)
            ctx.fillRect(7090, -12380, 120, 200)
            ctx.fillRect(14980, -750, 10, 750)//flagpole
            ctx.beginPath()
            ctx.moveTo(14980, flagY)
            ctx.lineTo(14905, flagY)
            ctx.lineTo(14980, flagY + 75)
            ctx.fill()

        };



        brick(923.5, -262);
        spawn.mapRect(886, -304, 75, 5);
        spawn.mapRect(886, -229, 75, 5);
        spawn.mapRect(883, -304, 5, 80);
        spawn.mapRect(958, -304, 5, 80);
        brick(1250.5, -262);
        spawn.mapRect(1138, -304, 375, 5);
        spawn.mapRect(1138, -229, 375, 5);
        brick(1400.5, -262);
        brick(1325.5, -562);
        spawn.mapRect(1288, -604, 75, 5);
        spawn.mapRect(1288, -529, 75, 5);
        spawn.mapRect(1285, -604, 5, 80);
        spawn.mapRect(1360, -604, 5, 80);
        brick(5787.5, -262);
        spawn.mapRect(5675, -304, 225, 5);
        spawn.mapRect(5675, -229, 225, 5);
        brick(6987.5, -562);
        spawn.mapRect(6725, -604, 300, 5);
        spawn.mapRect(6725, -529, 300, 5);
        spawn.mapRect(7025, -604, 5, 80);
        brick(7887.5, -262);//4 separated blocks in the middle
        spawn.mapRect(7850, -304, 75, 5);
        spawn.mapRect(7850, -225, 75, 5);
        spawn.mapRect(7850, -304, 5, 80);
        spawn.mapRect(7925, -304, 5, 84);
        brick(8112.5, -262);
        spawn.mapRect(8075, -304, 75, 5);
        spawn.mapRect(8075, -225, 75, 5);
        spawn.mapRect(8075, -304, 5, 80);
        spawn.mapRect(8150, -304, 5, 84);
        brick(8337.5, -262);
        spawn.mapRect(8300, -304, 75, 5);
        spawn.mapRect(8300, -225, 75, 5);
        spawn.mapRect(8300, -304, 5, 80);
        spawn.mapRect(8375, -304, 5, 84);
        brick(8112.5, -562);
        spawn.mapRect(8075, -604, 75, 5);
        spawn.mapRect(8075, -525, 75, 5);
        spawn.mapRect(8075, -604, 5, 80);
        spawn.mapRect(8150, -604, 5, 84);
        brick(9612.5, -562);
        spawn.mapRect(9500, -604, 300, 5);
        spawn.mapRect(9500, -525, 300, 5);
        spawn.mapRect(9647.5, -600, 5, 75);
        brick(9687.5, -562);
        brick(12887.5, -262);
        spawn.mapRect(12700, -304, 300, 5);
        spawn.mapRect(12700, -225, 300, 5);
        brick(5212.5, -12337.5);
        spawn.mapRect(4725, -12377, 525, 5);
        spawn.mapRect(4725, -12303, 525, 5);
        spawn.mapRect(5250, -12377, 5, 79);





        spawn.mapRect(-100, 0, 4033, 2000);
        spawn.mapRect(4043, 0, 882, 2000);
        spawn.mapRect(3909.5, 203.6, 150, 2000);
        spawn.mapRect(1138, -300, 75, 75);
        spawn.mapRect(1288, -300, 75, 75);
        spawn.mapRect(1438, -300, 75, 75);
        spawn.mapRect(1738, -150, 150, 75);//pipe 1
        spawn.mapRect(1753, -150, 120, 150);
        spawn.mapRect(2488, -225, 150, 75);//pipe 2
        spawn.mapRect(2503, -225, 120, 225);
        spawn.mapRect(3088, -300, 150, 75);//pipe 3
        spawn.mapRect(3103, -300, 120, 300);
        spawn.mapRect(3913, -300, 20, 75);//pipe 4
        spawn.mapRect(3928, -300, 5, 300);
        spawn.mapRect(4043, -300, 20, 75);
        spawn.mapRect(4043, -300, 5, 300);

        spawn.mapRect(5225, 0, 1125, 2000);
        spawn.mapRect(6575, 0, 4900, 2000);
        spawn.mapRect(5675, -300, 75, 75);
        spawn.mapRect(5825, -300, 75, 75);
        spawn.mapRect(5900, -600, 600, 75);
        spawn.mapRect(6725, -600, 225, 75);
        spawn.mapRect(6950, -300, 75, 75);
        spawn.mapRect(7400, -300, 150, 75);

        spawn.mapRect(8750, -300, 75, 75);
        spawn.mapRect(8975, -600, 225, 75);//raised platform
        spawn.mapRect(9575, -300, 150, 75);
        spawn.mapRect(9500, -600, 75, 75);//upper block with double bricks
        spawn.mapRect(9725, -600, 75, 75);
        spawn.mapRect(9950, -75, 300, 75);//staircase
        spawn.mapRect(10025, -150, 225, 75);
        spawn.mapRect(10100, -225, 150, 75);
        spawn.mapRect(10175, -300, 75, 75);

        spawn.mapRect(10475, -75, 300, 75);
        spawn.mapRect(10475, -150, 225, 75);
        spawn.mapRect(10475, -225, 150, 75);
        spawn.mapRect(10475, -300, 75, 75);

        spawn.mapRect(11100, -75, 375, 75);//staircase 2
        spawn.mapRect(11175, -150, 300, 75);
        spawn.mapRect(11250, -225, 225, 75);
        spawn.mapRect(11325, -300, 150, 75);

        spawn.mapRect(11725, -75, 300, 75);
        spawn.mapRect(11725, -150, 225, 75);
        spawn.mapRect(11725, -225, 150, 75);
        spawn.mapRect(11725, -300, 75, 75);

        spawn.mapRect(11725, 0, 5975, 2000);//platform after the staircase
        spawn.mapRect(12325, -150, 150, 75);//exit pipe
        spawn.mapRect(12340, -150, 120, 300);
        spawn.mapRect(12700, -300, 150, 75);
        spawn.mapRect(12925, -300, 75, 75);
        spawn.mapRect(13525, -150, 150, 72);//final pipe
        spawn.mapRect(13540, -150, 120, 150);
        spawn.mapRect(13675, -75, 675, 75);//final staircase
        spawn.mapRect(13750, -150, 600, 75);
        spawn.mapRect(13825, -225, 525, 75);
        spawn.mapRect(13900, -300, 450, 75);
        spawn.mapRect(13975, -375, 375, 75);
        spawn.mapRect(14050, -450, 300, 75);
        spawn.mapRect(14125, -525, 225, 75);
        spawn.mapRect(14200, -600, 150, 75);

        //flag
        spawn.mapRect(14950, -75, 75, 75);



        spawn.mapRect(1750, -4600, 500, 25);//loss
        spawn.mapRect(2000, -4850, 25, 500);
        spawn.mapRect(1800, -4800, 25, 150);
        spawn.mapRect(2075, -4800, 25, 150);
        spawn.mapRect(2150, -4775, 25, 125);
        spawn.mapRect(1875, -4550, 25, 150);
        spawn.mapRect(1800, -4550, 25, 150);
        spawn.mapRect(2075, -4550, 25, 150);
        spawn.mapRect(2123, -4430, 100, 25);
        // spawn.mapRect(-250, -600, 500, 25);
        // spawn.mapRect(-250, -600, 500, 25);

        //underground area
        spawn.mapRect(0, -12000, 2025, 2000);
        spawn.mapRect(2325, -12225, 150, 2000);
        spawn.mapRect(2775, -12000, 900, 2000);
        spawn.mapRect(3525, -12300, 150, 300);
        spawn.mapRect(3450, -12225, 75, 300);
        spawn.mapRect(3375, -12150, 75, 300);
        spawn.mapRect(3300, -12075, 75, 300);
        spawn.mapRect(4725, -12375, 450, 75);
        spawn.mapRect(4725, -12000, 600, 2000);
        spawn.mapRect(-100, -13500, 100, 3500);
        spawn.mapRect(-100, -13500, 100, 3500);
        spawn.mapRect(6375, -12225, 1650, 2000);
        spawn.mapRect(7225, -13225, 2850, 3000);
        spawn.mapRect(-100, -13700, 100, 200);//roof
        spawn.mapRect(-100, -13700, 3775, 100);
        spawn.mapRect(6450, -13225, 1000, 100);
        spawn.mapRect(7090, -13225, 120, 885);//pipe
        //spawn.mapRect(6940, -12360, 200, 120);
        spawn.mapRect(6940, -12350, 200, 5);
        spawn.mapRect(6950, -12240, 140, 5);
        spawn.mapRect(6940, -12365, 75, 15);
        spawn.mapRect(6940, -12235, 75, 15);

        //castle
        spawn.mapRect(17700, 0, 4975, 2000);
        spawn.mapRect(18600, -225, 375, 2225);
        spawn.mapRect(19500, -225, 450, 2225);
        spawn.mapRect(19500, -825, 450, 225);
        spawn.mapRect(15924, -1575, 6751, 750);
        spawn.mapRect(19950, -225, 975, 75);
        spawn.mapRect(20925, -300, 225, 300);
        spawn.mapRect(21000, -825, 150, 300);
        spawn.mapRect(15924, -225, 1776, 2225);
        spawn.mapRect(17175, -825, 525, 225);
        spawn.mapRect(22600, -825, 75, 825);



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

    tlinat() { // _Destined_ formerly Richard0820#2652
        simulation.inGameConsole(`<strong>tlinat</strong> by <span class='color-var'>Richard0820</span>`);
        simulation.fallHeight = 1 / 0, level.setPosToSpawn(0, -1e3), level.exit.x = 5100, level.exit.y = 3770, spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20), spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20), level.defaultZoom = 3000, simulation.zoomTransition(level.defaultZoom), document.body.style.backgroundColor = "#d8dadf";
        for (let i = 0; i < 3; i++) {
            powerUps.spawn(level.exit.x, level.exit.y, "tech");
        }
        let e = 0,
            t = 0;
        const boidsFlocking = function (mob, otherMobs) {
            const cohesionFactor = 0.01;
            const separationFactor = 0.0001;
            const alignmentFactor = 0.04;
            let averagePosition = { x: 0, y: 0 };
            let averageVelocity = { x: 0, y: 0 };
            let nearbyMobsCount = 0;
            for (const otherMob of otherMobs) {
                if (otherMob !== mob) {
                    const distanceSquared = Vector.magnitudeSquared(Vector.sub(mob.position, otherMob.position));
                    const boidRangeSquared = 300 * 300; // Adjust boid range as needed
                    if (distanceSquared < boidRangeSquared) {
                        averagePosition = Vector.add(averagePosition, otherMob.position);
                        averageVelocity = Vector.add(averageVelocity, otherMob.velocity);
                        nearbyMobsCount++;
                    }
                }
            }
            if (nearbyMobsCount > 0) {
                averagePosition = Vector.div(averagePosition, nearbyMobsCount);
                averageVelocity = Vector.div(averageVelocity, nearbyMobsCount);
                const cohesionForce = Vector.mult(Vector.sub(averagePosition, mob.position), cohesionFactor);
                mob.force = Vector.add(mob.force, cohesionForce);
                const separationForce = Vector.mult(Vector.sub(mob.position, averagePosition), separationFactor);
                mob.force = Vector.add(mob.force, separationForce);
                const alignmentForce = Vector.mult(Vector.sub(averageVelocity, mob.velocity), alignmentFactor);
                mob.force = Vector.add(mob.force, alignmentForce);
            }
        };
        function ghoster(x, y, radius = 50 + Math.ceil(Math.random() * 90)) {
            mobs.spawn(x, y, 7, radius, "transparent");
            let me = mob[mob.length - 1];
            me.seeAtDistance2 = 300000;
            me.accelMag = 0.00004 + 0.00015 * simulation.accelScale;
            if (map.length) me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position; //required for search
            // Matter.Body.setDensity(me, 0.0015); //normal is 0.001
            me.damageReduction = 0.5
            me.stroke = "transparent";
            me.alpha = 1;
            me.isNotCloaked = false;
            me.isBadTarget = true;
            // me.leaveBody = false;
            me.collisionFilter.mask = cat.bullet //| cat.body
            me.showHealthBar = false;
            me.memory = 600;
            me.do = function () {
                boidsFlocking(me, mob);//Stack, increase power.
                if (this.speed > 7) {
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * 0.8,
                        y: this.velocity.y * 0.8
                    });
                }
                this.seePlayerCheckByDistance();
                this.checkStatus();
                this.attraction();
                this.search();
                //draw
                if (this.distanceToPlayer2() < this.seeAtDistance2) {
                    if (this.alpha < 1) this.alpha += 0.011 * simulation.CDScale; //near player go solid
                } else {
                    if (this.alpha > 0) this.alpha -= 0.05; ///away from player, hide
                }
                if (this.alpha > 0) {
                    if (this.alpha > 0.7 && this.seePlayer.recall) {
                        if (this.seePlayer.recall) this.healthBar1()
                        if (!this.isNotCloaked) {
                            this.isNotCloaked = true;
                            this.isBadTarget = false;
                            this.collisionFilter.mask = cat.player | cat.bullet
                        }
                    }
                    //draw body
                    ctx.beginPath();
                    const vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1, len = vertices.length; j < len; ++j) {
                        ctx.lineTo(vertices[j].x, vertices[j].y);
                    }
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    // ctx.lineWidth = 1;
                    ctx.fillStyle = `rgba(255,255,255,${this.alpha * this.alpha})`;
                    ctx.fill();
                } else if (this.isNotCloaked) {
                    this.isNotCloaked = false;
                    this.isBadTarget = true;
                    this.collisionFilter.mask = cat.bullet; //can't touch player or walls
                }
            };
        }
        function o(e, t, o) {
            const l = {
                J: [" #### ", "    # ", "    # ", "    # ", " #  # ", " #  # ", "  ##  "],
                I: ["  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "  #  "],
                N: [" #  # ", " ## # ", " ## # ", " # ## ", " # ## ", " #  # ", " #  # "],
                " ": ["      ", "      ", "      ", "      ", "      ", "      ", "      "],
                O: ["   ##   ", "  #  #  ", " #    # ", " #    # ", " #    # ", "  #  #  ", "   ##   "],
                U: [" #   # ", " #   # ", " #   # ", " #   # ", " #   # ", " #   # ", "  ###  "],
                R: [" #### ", " #   #", " #### ", " # #  ", " #  # ", " #   #", " #   #"],
                D: [" ###   ", " #  ## ", " #   # ", " #   # ", " #   # ", " #  ## ", " ###   "],
                S: ["  #### ", " #     ", " #     ", "  ###  ", "    ## ", "     # ", " ##### "],
                C: [" ##### ", " #     ", " #     ", " #     ", " #     ", " #     ", " ##### "],
                V: [" #   # ", " #   # ", " #   # ", " #   # ", " #   # ", "  # #  ", "   #   "],
                E: [" ##### ", " #     ", " #     ", " ##### ", " #     ", " #     ", " ##### "],
                ".": ["       ", "       ", "       ", "       ", "       ", "   ##  ", "   ##  "],
                "/": ["      #", "     # ", "    #  ", "   #   ", "  #    ", " #     ", "#      "],
                G: [" ###### ", " #      ", " #      ", " #  ### ", " #    # ", " #    # ", " ###### "],
                Q: ["  ######   ", " #      #  ", " #      #  ", " #      #  ", " #    # #  ", "  #    #   ", "   #### #  ", "         # "],
                8: ["  #####  ", " #     # ", " #     # ", "  #####  ", " #     # ", " #     # ", "  #####  "],
                g: ["  #####  ", " #     # ", " #     # ", "  #####  ", "       # ", "       # ", " ######  "],
                Y: [" #     # ", "  #   #  ", "   # #   ", "    #    ", "    #    ", "    #    ", "    #    "],
                4: [" #       ", " #    #  ", " #    #  ", " #    #  ", "  ###### ", "      #  ", "      #  "],
                W: [" #     # ", " #     # ", " #     # ", " #  #  # ", " # # # # ", " ##   ## ", " #     # "],
                e: ["  ######  ", " #      # ", " #      # ", " #######  ", " #        ", "  #       ", "  ######  "],
                c: [" ###### ", "#       ", "#       ", "#       ", "#       ", "#       ", " ###### ", "        "],
                m: [" #       ", " ### ### ", " #  #  # ", " #  #  # ", " #  #  # ", " #  #  # ", " #  #  # "]
            },
                a = (e, t) => {
                    ctx.fillStyle = "black", ctx.fillRect(e, t, 50, 50)
                },
                n = (e, t, o) => {
                    const n = l[e];
                    if (n)
                        for (let e = 0; e < n.length; e++) {
                            const l = n[e];
                            for (let n = 0; n < l.length; n++) {
                                if ("#" === l[n]) {
                                    a(t + 20 * n, o + 20 * e)
                                }
                            }
                        }
                };
            for (let l = 0; l < o.length; l++) {
                n(o[l], e + 250 * l - Math.abs(1.5 * e), t)
            }
        }
        simulation.inGameConsole(`<img src="https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/Hotpot-removed.png" width="100" height="100" style="background-image: radial-gradient(circle, gray, black, transparent)"><br>Look up<br><em>Walk right to tp to maze</em><br><b>Exit is at the bottom left</b>`), Matter.Body.scale(player.parts[3], 2, 2), level.custom = () => {
            if (level.exit.drawAndCheck(), level.enter.draw(), player.position.y > 1e5 && Matter.Body.setPosition(player, {
                x: 5100,
                y: -5925
            }), player.position.x > 2500 && 0 == e) {
                Matter.Body.setPosition(player, {
                    x: 5100,
                    y: -5925
                }), e++;
                for (let e = 0; e < map.length; e++) Math.random() < .75 && ghoster(map[e].position.x, map[e].position.y);
                simulation.inGameConsole("Watch out for <b>ghosters</b><br>Peace ✌️")
            }
            player.position.x > level.exit.x && player.position.x < level.exit.x + 100 && player.position.y > level.exit.y - 150 && player.position.y < level.exit.y - 0 && player.velocity.y < .15 && 0 == t && (t++, Matter.Body.scale(player.parts[3], .5, .5))
        }, level.customTopLayer = () => {
            player.position.x > -1200 && player.position.x < 4500 && (o(2e3, -3e3, "JOIN OUR DISCORD SERVER"), o(1500, -2700, "DISCORD.GG/Q8gY4WeUcm"))
        }, spawn.mapRect(-1e3, -950, 5950, 100), spawn.mapRect(-1325, -3450, 100, 2575), spawn.mapRect(-1325, -950, 350, 100), spawn.mapRect(4850, -3400, 100, 2550), spawn.mapRect(-1325, -3450, 6275, 100),
            function (e, t, o, l, a) {
                const n = o / a,
                    s = l / a,
                    i = e - o / 2,
                    p = t - l / 2,
                    r = [];
                for (let e = 0; e < a; e++) {
                    r[e] = [];
                    for (let t = 0; t < a; t++) r[e][t] = 1
                }
                const c = [];
                (function e(t, o) {
                    r[t][o] = 0;
                    const l = [{
                        dx: 0,
                        dy: -1
                    }, {
                        dx: 1,
                        dy: 0
                    }, {
                        dx: 0,
                        dy: 1
                    }, {
                        dx: -1,
                        dy: 0
                    }];
                    l.sort((() => Math.random() - .5));
                    for (const n of l) {
                        const l = t + 2 * n.dx,
                            s = o + 2 * n.dy;
                        l >= 0 && l < a && s >= 0 && s < a && 1 === r[l][s] && (r[t + n.dx][o + n.dy] = 0, r[l][s] = 0, c.push({
                            x: t + n.dx,
                            y: o + n.dy
                        }), e(l, s))
                    }
                })(0, 0), r[a - 1][a - 1] = 1;
                for (let e = -1; e < a + 1; e++) {
                    let t = -1,
                        o = -1;
                    for (let l = -1; l < a + 1; l++)
                        if (e >= 0 && e < a && l >= 0 && l < a && 1 === r[e][l]) - 1 === t && (t = l), o = l;
                        else if (-1 !== t) {
                            const l = i + e * n,
                                a = p + t * s,
                                r = n,
                                c = (o - t + 1) * s;
                            c !== s && spawn.mapRect(l, a, r, c), t = -1, o = -1
                        }
                }
                for (let e = -1; e < a + 1; e++) {
                    let t = -1,
                        o = -1;
                    for (let l = -1; l < a + 1; l++)
                        if (l >= 0 && l < a && e >= 0 && e < a && 1 === r[l][e]) - 1 === t && (t = l), o = l;
                        else if (-1 !== t) {
                            const l = i + t * n,
                                a = p + e * s,
                                r = (o - t + 1) * n,
                                c = s;
                            r !== n && spawn.mapRect(l, a, r, c), t = -1, o = -1
                        }
                }
                spawn.mapRect(i - n, p - s, n * a, s), spawn.mapRect(i - n, p - s, n, s * a), spawn.mapRect(i + (a - 1) * n, p - s, n, s * (a + 1)), spawn.mapRect(i - n, p + (a - 1) * s, n * (a + 1), s)
            }(1e4, -1e3, 1e4, 1e4, 50);
    },
    ruins() { // by SiddhUPe
        // simulation.enableConstructMode()
        simulation.inGameConsole(`<strong>ruins</strong> by <span class='color-var'>SiddhUPe</span>`);

        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 19531;
        level.exit.y = 882 + 70;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // color.map = "#444" //custom map color


        level.customTopLayer = () => { };
        spawn.mapRect(875, 0, 1000, 100);
        spawn.mapRect(1825, -400, 50, 225);
        spawn.mapRect(1825, -400, 675, 50);
        spawn.mapRect(1825, 0, 675, 100);
        spawn.mapRect(2500, -575, 50, 225);
        spawn.mapRect(2500, -575, 850, 50);
        spawn.mapRect(2500, -100, 875, 175);
        spawn.mapRect(2500, 75, 875, 25);
        spawn.mapRect(3350, -575, 25, 50);
        spawn.mapRect(2450, -50, 75, 75);
        spawn.mapRect(2425, -25, 25, 25);
        spawn.mapRect(2475, -75, 25, 25);
        spawn.mapRect(3375, -575, 75, 325);
        spawn.mapRect(3375, -100, 75, 300);
        spawn.mapRect(3450, -50, 25, 250);
        spawn.mapRect(3475, -25, 25, 225);
        spawn.mapRect(3500, 0, 25, 200);
        spawn.mapRect(3525, 25, 25, 175);
        spawn.mapRect(3550, 75, 25, 125);
        spawn.mapRect(3550, 50, 25, 150);
        spawn.mapRect(3575, 75, 25, 125);
        spawn.mapRect(3600, 100, 25, 100);
        spawn.mapRect(3625, 150, 25, 50);
        spawn.mapRect(2875, -1375, 350, 75);
        spawn.mapRect(3150, -1375, 75, 350);
        spawn.mapRect(3100, -1300, 50, 50);
        spawn.mapRect(3075, -1300, 25, 25);
        spawn.mapRect(3125, -1250, 25, 25);
        spawn.mapRect(2825, -1375, 50, 125);
        spawn.mapRect(3100, -1025, 125, 50);
        spawn.mapRect(2800, -1350, 25, 75);
        spawn.mapRect(3125, -975, 75, 25);
        spawn.mapRect(3225, -1350, 25, 300);
        spawn.mapRect(2875, -1400, 275, 25);
        spawn.mapRect(2900, -1425, 225, 25);
        spawn.mapRect(3250, -1325, 25, 250);
        spawn.mapRect(2875, -1300, 25, 25);
        spawn.mapRect(3125, -1050, 50, 25);
        spawn.mapRect(5325, 800, 50, 225);
        spawn.mapRect(5325, 975, 300, 50);
        spawn.mapRect(5375, 925, 50, 50);
        spawn.mapRect(5375, 900, 25, 25);
        spawn.mapRect(5425, 950, 25, 25);
        spawn.mapRect(5325, 775, 100, 25);
        spawn.mapRect(5625, 925, 25, 100);
        spawn.mapRect(5350, 800, 50, 25);
        spawn.mapRect(5600, 950, 25, 50);
        spawn.mapRect(5300, 800, 25, 175);
        spawn.mapRect(5400, 1025, 225, 25);
        spawn.mapRect(5450, 1050, 125, 25);
        spawn.mapRect(5275, 850, 25, 100);
        spawn.mapRect(5350, 750, 50, 25);
        spawn.mapRect(5650, 950, 25, 50);
        spawn.mapRect(16775, -975, 275, 50);
        spawn.mapRect(17000, -975, 50, 200);
        spawn.mapRect(16775, -975, 25, 100);
        spawn.mapRect(17000, -775, 50, 50);
        spawn.mapRect(16975, -725, 75, 25);
        spawn.mapRect(16950, -925, 50, 50);
        spawn.mapRect(16925, -925, 75, 25);
        spawn.mapRect(17000, -925, 25, 75);
        spawn.mapRect(16975, -925, 25, 50);
        spawn.mapRect(16975, -925, 25, 75);
        spawn.mapRect(16800, -1000, 200, 25);
        spawn.mapRect(16850, -1025, 100, 25);
        spawn.mapRect(17050, -925, 25, 200);
        spawn.mapRect(17075, -925, 25, 150);
        spawn.mapRect(16775, -925, 50, 25);
        spawn.mapRect(17000, -750, 25, 25);
        spawn.mapRect(16975, -750, 25, 50);
        spawn.mapRect(16950, -725, 75, 25);
        spawn.mapRect(9475, -1150, 50, 200);
        spawn.mapRect(9475, -1150, 25, 25);
        spawn.mapRect(9475, -1150, 300, 50);
        spawn.mapRect(9725, -1150, 25, 25);
        spawn.mapRect(9725, -1150, 50, 200);
        spawn.mapRect(9500, -975, 25, 25);
        spawn.mapRect(9500, -975, 75, 25);
        spawn.mapRect(9700, -975, 25, 25);
        spawn.mapRect(9675, -975, 75, 25);
        spawn.mapRect(9525, -1175, 200, 25);
        spawn.mapRect(9550, -1200, 150, 100);
        spawn.mapRect(9450, -1125, 50, 150);
        spawn.mapRect(9750, -1125, 50, 150);
        spawn.mapRect(9525, -1100, 50, 50);
        spawn.mapRect(9675, -1100, 50, 50);
        spawn.mapRect(9575, -1100, 25, 25);
        spawn.mapRect(9650, -1100, 25, 25);
        spawn.mapRect(9500, -1050, 50, 25);
        spawn.mapRect(9700, -1100, 25, 75);
        spawn.mapRect(11925, -1175, 75, 275);
        spawn.mapRect(11925, -1175, 475, 75);
        spawn.mapRect(12325, -1175, 75, 275);
        spawn.mapRect(11925, -925, 175, 25);
        spawn.mapRect(12225, -925, 175, 25);
        spawn.mapRect(11950, -925, 125, 50);
        spawn.mapRect(12275, -925, 100, 50);
        spawn.mapRect(11925, -1200, 475, 25);
        spawn.mapRect(11975, -1225, 375, 25);
        spawn.mapRect(12000, -1225, 50, 25);
        spawn.mapRect(12000, -1275, 325, 75);
        spawn.mapRect(11900, -1175, 50, 250);
        spawn.mapRect(12375, -1175, 50, 250);
        spawn.mapRect(11900, -1150, 50, 150);
        spawn.mapRect(11875, -1150, 50, 200);
        spawn.mapRect(12375, -1150, 75, 200);
        spawn.mapRect(11975, -1100, 50, 25);
        spawn.mapRect(12300, -1100, 75, 25);
        spawn.mapRect(12300, -950, 25, 50);
        spawn.mapRect(12000, -950, 25, 75);

        spawn.mapRect(3625, 125, 25, 50);
        spawn.mapRect(3650, 150, 25, 50);
        spawn.mapRect(3675, 175, 25, 25);
        spawn.mapRect(3450, -75, 25, 50);
        spawn.mapRect(3475, -50, 25, 125);
        spawn.mapRect(3500, -25, 25, 125);
        spawn.mapRect(3500, 0, 50, 125);
        spawn.mapRect(3550, 25, 25, 125);
        spawn.mapRect(3575, 50, 25, 125);
        spawn.mapRect(3600, 75, 25, 75);
        spawn.mapRect(3600, 100, 50, 75);
        spawn.mapRect(3650, 125, 25, 75);
        spawn.mapRect(3675, 150, 25, 50);
        spawn.mapRect(3675, 150, 75, 450);
        spawn.mapRect(3675, 525, 700, 75);
        spawn.mapRect(4300, 150, 75, 450);
        mover = level.mover(3375, -100, 75, 100);
        pool = level.hazard(3750, 200, 550, 325);
        spawn.mapRect(-150, -225, 75, 325);
        spawn.mapRect(-150, -325, 425, 100);
        spawn.mapRect(-100, -400, 300, 75);
        spawn.mapRect(-25, -475, 150, 75);
        spawn.mapRect(200, -350, 25, 50);
        spawn.mapRect(-50, -425, 25, 100);
        spawn.mapRect(-125, -350, 25, 100);
        spawn.mapRect(100, -425, 50, 125);
        spawn.mapRect(1875, -450, 625, 50);
        spawn.mapRect(1950, -500, 550, 50);
        spawn.mapRect(2025, -525, 475, 25);
        spawn.mapRect(2025, -550, 525, 25);
        spawn.mapRect(2125, -575, 400, 25);
        spawn.mapRect(2125, -600, 1325, 50);
        spawn.mapRect(2475, -550, 950, 200);
        spawn.mapRect(1825, -350, 100, 175);
        spawn.mapRect(3350, -375, 25, 125);
        spawn.mapRect(1850, -425, 50, 25);
        spawn.mapRect(1925, -475, 125, 25);
        spawn.mapRect(2000, -525, 125, 25);
        spawn.mapRect(2100, -575, 200, 25);
        spawn.mapRect(2400, -650, 725, 75);
        spawn.mapRect(2500, -675, 475, 75);
        spawn.mapRect(2625, -725, 225, 100);
        spawn.mapRect(2675, -750, 125, 25);
        spawn.mapRect(2600, -700, 25, 50);
        spawn.mapRect(2850, -700, 25, 75);
        spawn.mapRect(3075, -625, 75, 50);
        spawn.mapRect(2375, -625, 50, 75);
        spawn.mapRect(1900, -350, 100, 75);
        spawn.mapRect(1925, -300, 50, 50);
        spawn.mapRect(1975, -350, 75, 50);
        spawn.mapRect(3325, -350, 50, 25);
        spawn.mapRect(150, -25, 1425, 50);
        spawn.mapRect(175, 75, 1200, 50);
        spawn.mapRect(400, -25, 575, 25);
        spawn.mapRect(425, -50, 750, 75);
        spawn.mapRect(1250, -50, 125, 100);
        spawn.mapRect(1175, -50, 100, 25);
        spawn.mapRect(725, 100, 500, 50);
        spawn.mapRect(625, -75, 300, 50);
        spawn.mapRect(250, -25, 225, 25);
        spawn.mapRect(1400, 75, 225, 50);
        spawn.mapRect(950, -75, 200, 25);
        spawn.mapRect(1200, -75, 125, 25);
        spawn.mapRect(425, -50, 100, 25);
        spawn.mapRect(450, -75, 100, 50);
        spawn.mapRect(250, -50, 125, 50);
        spawn.mapRect(250, 125, 125, 25);
        spawn.mapRect(475, 100, 100, 50);
        spawn.mapRect(650, 125, 25, 25);
        spawn.mapRect(675, 100, 75, 50);
        spawn.mapRect(825, 125, 200, 50);
        spawn.mapRect(-75, 75, 325, 50);
        spawn.mapRect(0, 100, 175, 50);
        spawn.mapRect(775, -100, 275, 50);
        spawn.mapRect(2475, 0, 925, 125);
        spawn.mapRect(2500, 50, 875, 100);
        spawn.mapRect(2550, 100, 775, 75);
        spawn.mapRect(2625, 150, 600, 50);
        spawn.mapRect(3225, 125, 275, 75);
        spawn.mapRect(1750, -225, 150, 50);
        spawn.mapRect(1800, -275, 50, 75);
        spawn.mapRect(1775, -250, 75, 75);
        spawn.mapRect(3200, -625, 250, 50);
        spawn.mapRect(3275, -650, 75, 25);
        spawn.mapRect(3175, -625, 25, 25);
        spawn.mapRect(3250, -700, 100, 100);
        spawn.mapRect(3200, -650, 75, 50);
        spawn.mapRect(3225, -675, 75, 100);
        spawn.mapRect(3325, -675, 50, 100);
        spawn.mapRect(3375, -650, 25, 75);
        spawn.mapRect(1575, -25, 100, 25);
        spawn.mapRect(1450, 100, 125, 50);
        spawn.mapRect(250, -300, 50, 50);
        spawn.mapRect(275, -275, 50, 25);
        spawn.mapRect(200, -275, 125, 50);
        spawn.mapRect(3725, 200, 50, 375);
        spawn.mapRect(3750, 275, 50, 300);
        spawn.mapRect(3800, 350, 25, 200);
        spawn.mapRect(3825, 425, 25, 150);
        spawn.mapRect(3850, 500, 25, 75);
        spawn.mapRect(4275, 250, 50, 325);
        spawn.mapRect(4250, 300, 50, 300);
        spawn.mapRect(4225, 375, 75, 200);
        spawn.mapRect(4200, 450, 75, 150);
        spawn.mapRect(4175, 500, 75, 75);
        spawn.mapRect(3950, 500, 150, 50);
        spawn.mapRect(4000, 500, 50, 25);
        spawn.mapRect(3875, 500, 425, 25);
        spawn.mapRect(3625, 200, 50, 75);
        spawn.mapRect(3575, 200, 50, 25);
        spawn.mapRect(3675, 275, 25, 25);
        spawn.mapRect(3650, 275, 25, 25);
        spawn.mapRect(3600, 200, 25, 50);
        spawn.mapRect(2600, 175, 25, 25);
        spawn.mapRect(2700, 175, 425, 100);
        spawn.mapRect(2650, 200, 75, 50);
        spawn.mapRect(3100, 200, 75, 50);
        spawn.mapRect(2675, 250, 25, 25);
        spawn.mapRect(2625, 200, 100, 25);
        spawn.mapRect(3150, 200, 75, 25);
        spawn.mapRect(3175, 225, 25, 25);
        spawn.mapRect(3775, 250, 25, 50);
        spawn.mapRect(3800, 275, 25, 125);
        spawn.mapRect(3800, 325, 50, 225);
        spawn.mapRect(3875, 400, 25, 200);
        spawn.mapRect(3825, 425, 50, 125);
        spawn.mapRect(3850, 375, 25, 100);
        spawn.mapRect(3900, 450, 25, 75);
        spawn.mapRect(3925, 475, 25, 50);
        spawn.mapRect(3450, -600, 25, 325);
        spawn.mapRect(3475, -575, 25, 275);
        spawn.mapRect(3500, -525, 25, 200);
        spawn.mapRect(3525, -500, 25, 150);
        spawn.mapRect(3550, -475, 25, 100);
        spawn.mapRect(2725, 250, 350, 50);
        spawn.mapRect(2750, 275, 300, 50);
        spawn.mapRect(3150, 250, 25, 25);
        spawn.mapRect(4325, 150, 975, 75);
        spawn.mapRect(4375, 225, 900, 25);
        spawn.mapRect(4375, 175, 875, 100);
        spawn.mapRect(4375, 225, 850, 75);
        spawn.mapRect(4375, 225, 825, 100);
        spawn.mapRect(4375, 275, 800, 75);
        spawn.mapRect(4350, 325, 800, 50);
        spawn.mapRect(4375, 350, 750, 50);
        spawn.mapRect(4375, 350, 725, 75);
        spawn.mapRect(4350, 375, 725, 75);
        spawn.mapRect(4350, 400, 700, 75);
        spawn.mapRect(4350, 425, 675, 75);
        spawn.mapRect(4350, 475, 650, 50);
        spawn.mapRect(4375, 500, 600, 50);
        spawn.mapRect(4375, 500, 575, 75);
        spawn.mapRect(4375, 550, 550, 50);
        spawn.mapRect(4425, 125, 775, 75);
        spawn.mapRect(5300, 175, 75, 50);
        spawn.mapRect(4475, 100, 150, 25);
        spawn.mapRect(4825, 125, 300, 25);
        spawn.mapRect(4800, 100, 250, 25);
        spawn.mapRect(5100, 100, 50, 25);
        spawn.mapRect(4650, 100, 75, 25);
        spawn.mapRect(5475, 225, 125, 300);
        spawn.mapRect(5450, 275, 25, 125);
        spawn.mapRect(5450, 450, 25, 75);
        spawn.mapRect(5425, 325, 25, 75);
        spawn.mapRect(5425, 475, 25, 50);
        spawn.mapRect(5575, 250, 50, 150);
        spawn.mapRect(5575, 450, 50, 50);
        spawn.mapRect(5475, 525, 125, 25);
        spawn.mapRect(5500, 550, 75, 25);
        spawn.mapRect(5525, 575, 25, 25);
        spawn.mapRect(3675, 575, 1050, 50);
        spawn.mapRect(4175, 600, 250, 50);
        spawn.mapRect(3850, 625, 100, 25);
        spawn.mapRect(3700, 625, 75, 25);
        spawn.mapRect(4050, 625, 50, 25);
        spawn.mapRect(4500, 625, 225, 25);
        spawn.mapRect(5725, 150, 75, 225);
        spawn.mapRect(5700, 175, 25, 150);
        spawn.mapRect(5775, 250, 50, 100);
        spawn.mapRect(5950, 325, 75, 75);
        spawn.mapRect(5925, 375, 25, 25);
        spawn.mapRect(6000, 350, 50, 50);
        spawn.mapRect(6125, 425, 1050, 75);
        spawn.mapRect(6425, 0, 750, 75);
        spawn.mapRect(6400, 25, 50, 50);
        spawn.mapRect(6500, -25, 675, 75);
        spawn.mapRect(6550, -25, 275, 25);
        spawn.mapRect(6475, -25, 125, 75);
        spawn.mapRect(6450, -25, 100, 100);
        spawn.mapRect(6475, -75, 700, 75);
        spawn.mapRect(6500, -75, 75, 25);
        spawn.mapRect(6500, -125, 675, 125);
        spawn.mapRect(6525, -150, 650, 125);
        spawn.mapRect(6550, -175, 625, 50);
        spawn.mapRect(6900, -200, 275, 75);
        spawn.mapRect(6925, -250, 250, 175);
        spawn.mapRect(6950, -275, 225, 75);
        spawn.mapRect(6975, -300, 200, 50);
        spawn.mapRect(7025, -325, 125, 125);
        spawn.mapRect(6400, 50, 75, 175);
        spawn.mapRect(6450, 50, 100, 100);
        spawn.mapRect(6475, 150, 25, 25);
        spawn.mapRect(6550, 75, 25, 25);
        spawn.mapRect(6375, 75, 25, 150);
        spawn.mapRect(6350, 100, 25, 75);
        spawn.mapRect(6650, 50, 225, 50);
        spawn.mapRect(6975, 75, 75, 25);
        spawn.mapRect(6625, -175, 225, 25);
        spawn.mapRect(6675, -200, 275, 25);
        spawn.mapRect(6750, -225, 250, 25);
        spawn.mapRect(6200, 475, 575, 50);
        spawn.mapRect(6925, 500, 125, 25);
        spawn.mapRect(6325, 400, 475, 25);
        spawn.mapRect(6950, 400, 200, 25);
        spawn.mapRect(7100, 75, 75, 100);
        spawn.mapRect(7075, 75, 25, 25);
        spawn.mapRect(7175, -300, 1650, 350);
        spawn.mapRect(7325, -700, 100, 450);
        spawn.mapRect(7600, -700, 100, 450);
        spawn.mapRect(7900, -700, 100, 450);
        spawn.mapRect(8200, -700, 100, 425);
        spawn.mapRect(8500, -700, 100, 425);
        spawn.mapRect(7275, -825, 1375, 125);
        spawn.mapRect(7400, -700, 50, 25);
        spawn.mapRect(7575, -700, 50, 25);
        spawn.mapRect(7875, -700, 150, 25);
        spawn.mapRect(8175, -700, 150, 25);
        spawn.mapRect(8475, -700, 150, 25);
        spawn.mapRect(7300, -325, 150, 75);
        spawn.mapRect(7575, -325, 150, 75);
        spawn.mapRect(7875, -325, 150, 75);
        spawn.mapRect(8175, -325, 150, 75);
        spawn.mapRect(8475, -325, 150, 75);
        spawn.mapRect(7700, -700, 25, 25);
        spawn.mapRect(7300, -700, 75, 25);
        spawn.mapRect(7150, 50, 75, 50);
        spawn.mapRect(7175, 100, 25, 25);
        spawn.mapRect(7225, 50, 25, 25);
        spawn.mapRect(7300, -850, 1325, 75);
        spawn.mapRect(7325, -875, 1275, 50);
        spawn.mapRect(7375, -900, 1200, 25);
        spawn.mapRect(7350, -900, 25, 25);
        spawn.mapRect(7375, -900, 200, 25);

        spawn.mapRect(7375, -925, 1175, 25);
        spawn.mapRect(7400, -950, 1125, 25);
        spawn.mapRect(7425, -975, 1075, 25);
        spawn.mapRect(7450, -1000, 1025, 25);
        spawn.mapRect(7675, -1050, 525, 50);
        spawn.mapRect(7700, -1050, 100, 25);
        spawn.mapRect(7700, -1075, 450, 25);
        spawn.mapRect(7725, -1100, 400, 25);
        spawn.mapRect(7775, -1125, 300, 25);
        spawn.mapRect(7650, -1025, 75, 25);
        spawn.mapRect(8200, -1025, 25, 25);
        spawn.mapRect(8825, -275, 25, 300);
        spawn.mapRect(8825, -225, 50, 125);
        spawn.mapRect(8850, -50, 25, 75);
        spawn.mapRect(7150, 425, 100, 425);
        spawn.mapRect(7150, 775, 1600, 100);
        spawn.mapRect(8750, 400, 75, 475);
        spawn.mapRect(8825, 400, 25, 475);
        spawn.mapRect(7225, 450, 50, 325);
        spawn.mapRect(7250, 500, 50, 275);
        spawn.mapRect(7300, 550, 25, 225);
        spawn.mapRect(7325, 600, 25, 175);
        spawn.mapRect(7350, 650, 25, 125);
        spawn.mapRect(7375, 675, 25, 100);
        spawn.mapRect(7400, 700, 25, 75);
        spawn.mapRect(7425, 725, 25, 50);
        spawn.mapRect(7450, 750, 25, 25);
        spawn.mapRect(8725, 425, 50, 375);
        spawn.mapRect(8700, 450, 75, 375);
        spawn.mapRect(8675, 475, 100, 375);
        spawn.mapRect(8650, 500, 125, 375);
        spawn.mapRect(8600, 525, 100, 350);
        spawn.mapRect(8575, 550, 100, 275);
        spawn.mapRect(8550, 575, 150, 250);
        spawn.mapRect(8525, 625, 100, 225);
        spawn.mapRect(8500, 675, 100, 125);
        spawn.mapRect(8625, 825, 25, 25);
        spawn.mapRect(8475, 700, 75, 75);
        spawn.mapRect(8450, 725, 50, 50);
        spawn.mapRect(8425, 750, 100, 25);
        wastepool = level.hazard(7250, 575, 1450, 200);
        spawn.mapRect(7375, 0, 250, 75);
        spawn.mapRect(7700, 0, 725, 75);
        spawn.mapRect(8575, 50, 150, 25);
        spawn.mapRect(7750, 50, 475, 50);
        spawn.mapRect(7425, 50, 175, 50);
        spawn.mapRect(8600, 50, 50, 50);
        spawn.mapRect(7200, 850, 875, 50);
        spawn.mapRect(8225, 850, 125, 50);
        spawn.mapRect(8475, 850, 275, 50);
        spawn.mapRect(7300, 875, 375, 50);
        spawn.mapRect(7925, 875, 100, 50);
        spawn.mapRect(8525, 875, 125, 50);
        spawn.mapRect(8250, 875, 75, 50);
        spawn.mapRect(7800, 900, 50, 25);
        spawn.mapRect(8125, 875, 50, 50);
        spawn.mapRect(8075, 875, 50, 50);
        spawn.mapRect(7125, 500, 25, 325);
        spawn.mapRect(7100, 475, 25, 300);
        spawn.mapRect(7075, 600, 50, 125);
        spawn.mapRect(7075, 500, 50, 25);
        spawn.mapRect(8850, 425, 75, 450);
        spawn.mapRect(8925, 475, 75, 400);
        spawn.mapRect(9000, 550, 75, 325);
        spawn.mapRect(9075, 650, 75, 25);
        spawn.mapRect(9075, 625, 75, 250);
        spawn.mapRect(9150, 675, 75, 200);
        spawn.mapRect(9225, 750, 75, 125);
        spawn.mapRect(8925, 450, 25, 25);
        spawn.mapRect(9000, 500, 25, 75);
        spawn.mapRect(9000, 525, 25, 100);
        spawn.mapRect(9000, 525, 50, 100);
        spawn.mapRect(9050, 575, 50, 100);
        spawn.mapRect(9075, 600, 50, 75);
        spawn.mapRect(9150, 650, 25, 100);
        spawn.mapRect(9225, 725, 50, 100);
        spawn.mapRect(9225, 700, 25, 100);
        spawn.mapRect(9300, 800, 1375, 75);
        spawn.mapRect(9300, 775, 25, 50);
        spawn.mapRect(9425, 775, 200, 25);
        spawn.mapRect(9500, 875, 200, 25);
        spawn.mapRect(9725, 825, 200, 75);
        spawn.mapRect(10000, 850, 125, 50);
        spawn.mapRect(10225, 850, 400, 50);
        spawn.mapRect(9775, 775, 125, 25);
        spawn.mapRect(10100, 775, 75, 75);
        spawn.mapRect(10275, 750, 225, 75);
        spawn.mapRect(9975, 775, 25, 50);
        spawn.mapRect(10000, 775, 25, 50);
        spawn.mapRect(10025, 775, 25, 75);
        spawn.mapRect(10675, 775, 50, 100);
        spawn.mapRect(10725, 725, 50, 150);
        spawn.mapRect(10775, 650, 50, 225);
        spawn.mapRect(10825, 575, 50, 300);
        spawn.mapRect(10875, 500, 50, 375);
        spawn.mapRect(10925, 425, 275, 450);
        spawn.mapRect(11200, 500, 50, 375);
        spawn.mapRect(11250, 575, 50, 300);
        spawn.mapRect(11300, 650, 50, 225);
        spawn.mapRect(11350, 725, 50, 150);
        spawn.mapRect(11400, 775, 50, 100);
        spawn.mapRect(10700, 750, 75, 75);
        spawn.mapRect(10775, 700, 25, 25);
        spawn.mapRect(10750, 700, 75, 75);
        spawn.mapRect(10800, 625, 125, 75);
        spawn.mapRect(10850, 550, 125, 50);
        spawn.mapRect(10900, 475, 150, 75);
        spawn.mapRect(11125, 475, 100, 50);
        spawn.mapRect(11200, 550, 75, 50);
        spawn.mapRect(11275, 625, 50, 75);
        spawn.mapRect(11325, 700, 50, 75);
        spawn.mapRect(11375, 750, 50, 75);
        spawn.mapRect(11550, 225, 1525, 75);
        spawn.mapRect(11450, 825, 1625, 50);
        spawn.mapRect(11450, 800, 1625, 75);
        spawn.mapRect(11525, -350, 50, 650);
        spawn.mapRect(11850, -350, 50, 650);
        spawn.mapRect(12225, -350, 50, 650);
        spawn.mapRect(12600, -350, 50, 650);
        spawn.mapRect(13000, -350, 75, 650);
        spawn.mapRect(11525, -200, 1525, 50);
        spawn.mapRect(11525, 50, 1550, 50);
        spawn.mapRect(11525, -400, 1550, 50);
        spawn.mapRect(11575, -425, 1450, 50);
        spawn.mapRect(11625, -450, 1325, 75);
        spawn.mapRect(11700, -475, 1175, 75);
        spawn.mapRect(11725, -500, 1125, 75);
        spawn.mapRect(11825, -400, 100, 75);
        spawn.mapRect(11825, 200, 100, 75);
        spawn.mapRect(12200, -375, 100, 50);
        spawn.mapRect(12200, 200, 100, 75);
        spawn.mapRect(12575, 200, 100, 75);
        spawn.mapRect(12575, -375, 100, 50);
        spawn.mapRect(11500, 825, 50, 25);
        spawn.mapRect(11550, 775, 175, 25);
        spawn.mapRect(11525, 875, 250, 25);
        spawn.mapRect(11875, 750, 225, 50);
        spawn.mapRect(11950, 850, 375, 50);
        spawn.mapRect(12500, 775, 250, 75);
        spawn.mapRect(12750, 850, 175, 50);


        // books
        spawn.bodyRect(11575, -300, 25, 100);
        spawn.bodyRect(11600, -300, 25, 100);
        spawn.bodyRect(11625, -300, 25, 100);
        spawn.bodyRect(11650, -300, 25, 100);
        spawn.bodyRect(11675, -300, 25, 100);
        spawn.bodyRect(11700, -300, 25, 100);
        spawn.bodyRect(11725, -300, 25, 100);
        spawn.bodyRect(11750, -300, 25, 100);
        spawn.bodyRect(11775, -300, 25, 100);
        spawn.bodyRect(11800, -300, 25, 100);
        spawn.bodyRect(11825, -300, 25, 100);
        spawn.bodyRect(11900, -50, 25, 100);
        spawn.bodyRect(11925, -50, 25, 100);
        spawn.bodyRect(11950, -50, 25, 100);
        spawn.bodyRect(11975, -50, 50, 100);
        spawn.bodyRect(12025, -50, 50, 100);
        spawn.bodyRect(12075, -50, 25, 100);
        spawn.bodyRect(12100, -50, 50, 100);
        spawn.bodyRect(12150, -50, 25, 100);
        spawn.bodyRect(12175, -50, 25, 100);
        spawn.bodyRect(12200, -50, 25, 100);
        spawn.bodyRect(11900, -300, 25, 100);
        spawn.bodyRect(11925, -300, 25, 100);
        spawn.bodyRect(11950, -225, 75, 25);
        spawn.bodyRect(12650, -50, 25, 100);
        spawn.bodyRect(12675, -50, 25, 100);
        spawn.bodyRect(12725, -50, 25, 100);
        spawn.bodyRect(12750, -50, 50, 100);
        spawn.bodyRect(12650, -275, 25, 75);
        spawn.bodyRect(12675, -275, 25, 75);
        spawn.bodyRect(12700, -275, 50, 75);
        spawn.bodyRect(12750, -275, 25, 75);
        spawn.bodyRect(12775, -275, 25, 75);
        spawn.bodyRect(12800, -275, 25, 75);
        spawn.bodyRect(12825, -275, 25, 75);
        spawn.bodyRect(12850, -275, 50, 75);
        spawn.bodyRect(12900, -275, 50, 75);
        spawn.bodyRect(12950, -275, 50, 75);
        spawn.mapRect(12200, 775, 175, 50);
        spawn.mapRect(11550, 250, 1500, 75);
        spawn.mapRect(11575, 275, 1450, 75);
        spawn.mapRect(11600, 325, 1400, 50);
        spawn.mapRect(11625, 350, 1350, 50);
        spawn.mapRect(11725, 375, 1150, 50);
        spawn.mapRect(11900, 400, 800, 50);
        spawn.mapRect(12100, 425, 425, 50);
        spawn.mapRect(12125, 475, 375, 25);
        spawn.mapRect(12200, 475, 225, 50);
        spawn.mapRect(11475, -400, 50, 700);
        spawn.mapRect(11450, -375, 50, 625);
        spawn.mapRect(11425, -350, 100, 600);
        spawn.mapRect(11400, -300, 75, 525);
        spawn.mapRect(11375, -250, 100, 400);
        spawn.mapRect(11350, -150, 50, 200);
        spawn.mapRect(13075, 825, 25, 50);
        spawn.mapRect(13100, 850, 25, 25);
        spawn.mapRect(13200, 700, 100, 225);
        spawn.mapRect(13300, 775, 25, 100);
        spawn.mapRect(13325, 825, 25, 50);
        spawn.mapRect(13175, 775, 25, 125);
        spawn.mapRect(13225, 675, 50, 25);
        spawn.mapRect(13225, 925, 50, 25);
        spawn.mapRect(9250, 75, 1400, 150);
        spawn.mapRect(9250, -225, 150, 300);
        spawn.mapRect(9250, -275, 575, 50);
        spawn.mapRect(9675, -225, 150, 300);
        spawn.mapRect(9325, -325, 400, 50);
        spawn.mapRect(9400, -350, 250, 25);
        spawn.mapRect(9475, -375, 125, 25);
        spawn.mapRect(9825, -225, 150, 300);
        spawn.mapRect(10225, -225, 150, 300);
        spawn.mapRect(9825, -275, 550, 50);
        spawn.mapRect(9900, -325, 375, 50);
        spawn.mapRect(9950, -350, 275, 25);
        spawn.mapRect(10000, -375, 175, 25);
        spawn.mapRect(10350, -275, 50, 375);
        spawn.mapRect(10400, -250, 25, 325);
        spawn.mapRect(10425, -225, 25, 375);
        spawn.mapRect(10450, -200, 25, 325);
        spawn.mapRect(10475, -175, 25, 350);
        spawn.mapRect(10500, -150, 25, 300);
        spawn.mapRect(10525, -125, 25, 300);
        spawn.mapRect(10550, -100, 25, 225);
        spawn.mapRect(10575, -75, 25, 200);
        spawn.mapRect(10600, -50, 25, 150);
        spawn.mapRect(10625, -25, 25, 175);
        spawn.mapRect(9225, -225, 25, 450);
        spawn.mapRect(9200, -175, 25, 400);
        spawn.mapRect(9175, -150, 50, 375);
        spawn.mapRect(9150, -125, 50, 350);
        spawn.mapRect(9400, -175, 25, 275);
        spawn.mapRect(9425, -125, 25, 200);
        spawn.mapRect(9650, -175, 25, 250);
        spawn.mapRect(9625, -125, 25, 275);
        spawn.mapRect(9975, -175, 25, 300);
        spawn.mapRect(10000, -125, 25, 250);
        spawn.mapRect(10200, -175, 25, 300);
        spawn.mapRect(10175, -125, 25, 225);
        spawn.mapRect(9325, 225, 225, 25);
        spawn.mapRect(9675, 225, 250, 50);
        spawn.mapRect(10075, 225, 200, 25);
        spawn.mapRect(10400, 200, 175, 50);
        spawn.mapRect(13425, 675, 1425, 100);
        spawn.mapRect(13450, 725, 375, 75);
        spawn.mapRect(13850, 775, 225, 50);
        spawn.mapRect(14150, 750, 300, 50);
        spawn.mapRect(14575, 750, 200, 75);
        spawn.mapRect(13550, 800, 150, 25);
        spawn.mapRect(14250, 800, 225, 25);
        spawn.mapRect(13425, 275, 1425, 100);
        spawn.mapRect(13475, 250, 1325, 75);
        spawn.mapRect(13550, 225, 1125, 75);
        spawn.mapRect(13600, 200, 1025, 25);
        spawn.mapRect(13650, 150, 925, 50);
        spawn.mapRect(13725, 100, 775, 100);
        spawn.mapRect(13825, 50, 525, 100);
        spawn.mapRect(13900, 0, 350, 75);
        spawn.mapRect(13975, -25, 175, 75);
        spawn.mapRect(13875, 25, 50, 50);
        spawn.mapRect(13800, 75, 75, 50);
        spawn.mapRect(13700, 125, 75, 50);
        spawn.mapRect(13625, 200, 50, 25);
        spawn.mapRect(13650, 175, 25, 25);
        spawn.mapRect(13625, 175, 125, 75);
        spawn.mapRect(14350, 75, 25, 50);
        spawn.mapRect(14250, 0, 25, 75);
        spawn.mapRect(14275, 50, 25, 50);
        spawn.mapRect(14275, 25, 25, 75);
        spawn.mapRect(14500, 125, 25, 75);
        spawn.mapRect(14575, 175, 25, 75);
        spawn.mapRect(13475, 650, 400, 50);
        spawn.mapRect(13975, 675, 75, 25);
        spawn.mapRect(14000, 650, 50, 50);
        spawn.mapRect(14150, 625, 675, 100);
        spawn.mapRect(14325, 625, 100, 25);
        spawn.mapRect(14300, 600, 325, 25);
        spawn.mapRect(13525, 325, 375, 100);
        spawn.mapRect(13975, 375, 400, 25);
        spawn.mapRect(14500, 325, 100, 75);
        spawn.mapRect(14850, 675, 50, 200);
        spawn.mapRect(14875, 700, 50, 175);
        spawn.mapRect(14925, 725, 50, 150);
        spawn.mapRect(14975, 750, 50, 125);
        spawn.mapRect(15025, 775, 50, 100);
        spawn.mapRect(15075, 750, 1150, 100);
        spawn.mapRect(15100, 825, 225, 50);
        spawn.mapRect(15500, 850, 225, 25);
        spawn.mapRect(15925, 775, 275, 100);
        spawn.mapRect(15775, 825, 50, 50);
        spawn.mapRect(15225, 250, 1050, 125);
        spawn.mapRect(15250, 200, 1000, 50);
        spawn.mapRect(15275, 175, 950, 50);
        spawn.mapRect(15300, 150, 900, 50);
        spawn.mapRect(15325, 125, 850, 25);
        spawn.mapRect(15350, 100, 800, 25);
        spawn.mapRect(15375, 75, 750, 25);
        spawn.mapRect(15400, 50, 700, 100);
        spawn.mapRect(15425, 25, 650, 75);
        spawn.mapRect(15450, 0, 600, 50);
        spawn.mapRect(15475, -25, 550, 75);
        spawn.mapRect(15500, -50, 500, 75);
        spawn.mapRect(15525, -75, 450, 75);
        spawn.mapRect(15550, -100, 400, 75);
        spawn.mapRect(15575, -125, 350, 75);
        spawn.mapRect(15600, -150, 300, 50);
        spawn.mapRect(15625, -175, 250, 50);
        spawn.mapRect(15650, -200, 200, 25);
        spawn.mapRect(15675, -225, 150, 75);
        spawn.mapRect(15700, -250, 100, 75);
        spawn.mapRect(16275, 250, 25, 125);
        spawn.mapRect(16250, 225, 25, 25);
        spawn.mapRect(15200, 250, 25, 125);
        spawn.mapRect(15225, 225, 25, 25);
        spawn.mapRect(15275, 350, 175, 50);
        spawn.mapRect(15550, 350, 425, 75);
        spawn.mapRect(16100, 375, 175, 25);
        spawn.mapRect(14700, -375, 50, 325);
        spawn.mapRect(14700, -425, 375, 50);
        spawn.mapRect(14750, -375, 125, 100);
        spawn.mapRect(14750, -275, 75, 75);
        spawn.mapRect(14850, -375, 100, 50);
        spawn.mapRect(14825, -275, 25, 25);
        spawn.mapRect(14950, -375, 25, 25);
        spawn.mapRect(14875, -325, 25, 25);
        spawn.mapRect(14725, -200, 50, 25);
        spawn.mapRect(14700, -75, 100, 25);
        spawn.mapRect(15050, -425, 25, 100);
        spawn.mapRect(14725, -450, 325, 25);
        spawn.mapRect(14775, -475, 225, 25);
        spawn.mapRect(14825, -500, 125, 25);
        spawn.mapRect(14675, -350, 25, 100);
        spawn.mapRect(14675, -175, 25, 75);
        spawn.mapRect(14850, 325, 25, 50);
        spawn.mapRect(5700, -725, 375, 50);
        spawn.mapRect(6025, -725, 50, 325);
        spawn.mapRect(5775, -675, 250, 25);
        spawn.mapRect(6000, -675, 25, 225);
        spawn.mapRect(5950, -650, 50, 75);
        spawn.mapRect(5900, -650, 75, 25);
        spawn.mapRect(6000, -575, 25, 25);
        spawn.mapRect(6050, -700, 50, 275);
        spawn.mapRect(5925, -625, 75, 25);
        spawn.mapRect(5775, -750, 100, 25);
        spawn.mapRect(5950, -750, 100, 25);
        spawn.mapRect(5675, -725, 25, 150);
        spawn.mapRect(5975, -400, 100, 25);
        spawn.mapRect(5650, -700, 25, 75);
        spawn.mapRect(5700, -675, 25, 50);
        spawn.mapRect(5700, -600, 25, 25);
        spawn.mapRect(15275, 750, 225, 25);
        spawn.mapRect(15225, 725, 250, 25);
        spawn.mapRect(15675, 725, 275, 100);
        spawn.mapRect(16075, 725, 125, 50);
        spawn.pulsar(5775.349354333542, -594.9058498351887)
        spawn.pulsar(5852.915433009502, -545.5679375496002)
        spawn.pulsar(5921.99534574469, -480.69487503053097)
        spawn.mapRect(3725, -975, 1525, 100);
        spawn.mapRect(3750, -650, 300, 75);
        spawn.mapRect(4300, -650, 300, 75);
        spawn.mapRect(4950, -650, 300, 75);
        spawn.mapRect(5250, -975, 75, 400);
        spawn.mapRect(3725, -975, 75, 400);
        spawn.mapRect(4325, -600, 250, 50);
        spawn.mapRect(4350, -550, 200, 25);
        spawn.mapRect(3800, -575, 225, 25);
        spawn.mapRect(3825, -550, 175, 25);
        spawn.mapRect(4975, -600, 275, 50);
        spawn.mapRect(5025, -550, 175, 25);
        spawn.mapRect(3800, -1025, 1450, 50);
        spawn.mapRect(3875, -1075, 1275, 50);
        spawn.mapRect(3975, -1125, 1000, 50);
        spawn.mapRect(3950, -1100, 50, 25);
        spawn.mapRect(3850, -1050, 150, 25);
        spawn.mapRect(3775, -1000, 200, 25);
        spawn.mapRect(5225, -975, 75, 25);
        spawn.mapRect(4950, -1100, 75, 125);
        spawn.mapRect(5100, -1050, 75, 75);
        spawn.mapRect(5225, -1000, 50, 100);
        spawn.mapRect(4350, -675, 150, 75);
        spawn.mapRect(4525, -650, 50, 25);
        spawn.mapRect(4550, -675, 50, 75);
        spawn.mapRect(3825, -650, 50, 25);
        spawn.mapRect(3825, -675, 150, 50);
        spawn.mapRect(4025, -675, 25, 100);
        spawn.mapRect(4950, -675, 75, 50);
        spawn.mapRect(5075, -675, 75, 75);
        spawn.mapRect(5200, -675, 75, 50);
        spawn.pulsar(4068.196906578167, -653.550201356403)
        spawn.pulsar(4147.672553167598, -651.0093457935446)
        spawn.pulsar(4228.863663369247, -653.4768859607283)
        spawn.pulsar(4619.092688319791, -657.3942377732394)
        spawn.pulsar(4724.821759138369, -653.4213864043036)
        spawn.pulsar(4873.583205330713, -657.4103118310311)
        spawn.pulsar(3871.920598597728, -804.0595760512573)
        spawn.pulsar(4053.019377134256, -778.0061810623848)
        spawn.pulsar(4211.732836201937, -780.4633597161928)
        spawn.pulsar(4380.7768131190005, -776.3400515412312)
        spawn.pulsar(4533.031170401828, -791.1397513503708)
        spawn.pulsar(4663.577749297493, -789.0488615794887)
        spawn.pulsar(4965.48351658387, -809.0025104385204)
        spawn.pulsar(5122.782442346123, -810.2526936643312)
        spawn.mapRect(3700, -875, 25, 250);
        spawn.mapRect(5325, -900, 25, 250);
        spawn.mapRect(5325, -850, 50, 150);
        spawn.mapRect(5375, -825, 25, 75);
        spawn.pulsar(14786.058375868968, -140.5759223979466)
        spawn.pulsar(14862.320083571307, -177.02507110101413)
        spawn.pulsar(14888.982047411475, -216.4856450590454)
        spawn.pulsar(14950.503812885598, -280.9333882582806)
        spawn.pulsar(15003.202057456116, -316.6767970823471)
        spawn.spinner(759.4093972764956, -356.0541595435453)
        spawn.spinner(1467.1412487475097, -617.4326431210314)
        spawn.mapRect(11850, 775, 50, 50);
        spawn.mapRect(12075, 775, 50, 50);
        spawn.mapRect(16225, 750, 75, 325);
        spawn.mapRect(16300, 775, 50, 325);
        spawn.mapRect(16350, 800, 50, 275);
        spawn.mapRect(16375, 825, 50, 200);
        spawn.mapRect(16450, 875, 25, 150);
        spawn.mapRect(16450, 875, 25, 225);
        spawn.mapRect(16400, 875, 50, 150);
        spawn.mapRect(16225, 1025, 250, 75);
        spawn.mapRect(16475, 925, 25, 175);
        spawn.mapRect(16500, 975, 25, 125);
        spawn.mapRect(16525, 1025, 25, 50);
        spawn.mapRect(16425, 1075, 150, 25);
        spawn.mapRect(16225, 1100, 1175, 75);
        spawn.mapRect(17200, 1050, 25, 50);
        spawn.mapRect(17225, 950, 25, 200);
        spawn.mapRect(17250, 800, 25, 300);
        spawn.mapRect(17275, 725, 25, 400);
        spawn.mapRect(17300, 750, 75, 400);
        spawn.mapRect(17300, 725, 100, 450);
        spawn.mapRect(16300, 250, 1075, 125);
        spawn.mapRect(16450, -75, 100, 400);
        spawn.mapRect(17100, -75, 100, 400);
        spawn.mapRect(16425, 200, 150, 50);
        spawn.mapRect(17075, 200, 150, 50);
        spawn.mapRect(16425, -75, 150, 25);
        spawn.mapRect(17075, -75, 150, 50);
        spawn.mapRect(16425, -50, 150, 50);
        spawn.mapRect(16575, -75, 525, 50);
        spawn.mapRect(17075, -50, 150, 50);
        spawn.mapRect(16550, -100, 550, 25);
        spawn.mapRect(16575, -125, 500, 75);
        spawn.mapRect(16600, -150, 450, 75);
        spawn.mapRect(16625, -175, 400, 75);
        spawn.mapRect(16675, -200, 275, 50);
        spawn.mapRect(16750, -225, 125, 100);
        spawn.mapRect(19700, 675, 50, 325);
        spawn.mapRect(19725, 700, 50, 250);
        spawn.mapRect(19750, 750, 25, 175);
        spawn.mapRect(16775, -25, 100, 275);
        spawn.mapRect(16750, -25, 150, 25);
        spawn.mapRect(16750, 225, 150, 50);
        spawn.pulsar(3037.797768861211, -1242.9871362505041)
        spawn.pulsar(3070.307596879197, -1219.5627538123044)
        spawn.pulsar(3111.2633762820287, -1107.7297980154415)
        spawn.pulsar(5417.516810698634, 842.824851834252)
        spawn.pulsar(5484.672534515589, 883.9519420960905)
        spawn.pulsar(5588.5457723826075, 907.389646857348)
        spawn.pulsar(16845.139047921595, -885.6942536135854)
        spawn.pulsar(16892.187197333486, -849.5235136465661)
        spawn.pulsar(16912.323783455256, -764.5275187038021)
        powerUps.spawn(2571.591711269197, -145.6717604789277, 'heal')
        powerUps.spawn(4415.693974666946, -15.077304620299628, 'heal')
        powerUps.spawn(7505.795753124317, -360.0330849392626, 'heal')
        powerUps.spawn(7809.5145838152075, -388.5517653996709, 'heal')
        powerUps.spawn(8049.726318297545, 534.4543327703304, 'heal')
        powerUps.spawn(8514.444440033667, 551.0268033205841, 'heal')
        powerUps.spawn(8927.146055851512, 407.25359241772685, 'heal')
        powerUps.spawn(9730.170170158563, 463.5594890235955, 'ammo')
        powerUps.spawn(9998.34942087522, 434.9511651200589, 'ammo')
        powerUps.spawn(10119.083720019844, 437.4195779326937, 'ammo')
        powerUps.spawn(10346.197135080345, 423.1868836972815, 'ammo')
        powerUps.spawn(1853.3194789931017, -36.87254038474242, 'ammo')
        powerUps.spawn(4491.396397908616, 40.2862012621236, 'ammo')
        powerUps.spawn(4954.207518897743, 50.27790416201856, 'ammo')
        spawn.mapRect(9125, -50, 75, 275);
        spawn.mapRect(9100, 0, 50, 225);
        spawn.mapRect(9075, 75, 75, 150);
        spawn.mapRect(9050, 150, 125, 50);
        spawn.mapRect(9050, 200, 225, 25);
        mover1 = level.mover(4000, -1125, 975, 25);
        mover2 = level.mover(15675, 725, 275, 25);
        spawn.mapRect(15025, -375, 25, 25);
        spawn.mapRect(12200, -150, 100, 25);
        spawn.mapRect(11825, -150, 100, 25);
        spawn.mapRect(11825, 75, 100, 50);
        spawn.mapRect(12200, 75, 100, 50);
        spawn.mapRect(12575, 100, 75, 25);
        spawn.mapRect(12625, 50, 50, 75);
        spawn.mapRect(12600, -175, 75, 50);
        spawn.mapRect(12575, -175, 75, 50);
        spawn.mapRect(14125, 650, 75, 25);
        spawn.mapRect(13875, 375, 50, 25);
        spawn.mapRect(13300, -525, 325, 50);
        spawn.mapRect(13575, -525, 50, 250);
        spawn.mapRect(13550, -300, 75, 25);
        spawn.mapRect(13300, -525, 25, 75);
        spawn.mapRect(13525, -475, 50, 50);
        spawn.mapRect(13500, -475, 100, 25);
        spawn.mapRect(13550, -475, 25, 100);
        spawn.mapRect(13325, -550, 275, 25);
        spawn.mapRect(13350, -575, 200, 25);
        spawn.mapRect(13625, -500, 25, 175);
        spawn.mapRect(13650, -450, 25, 75);
        spawn.mapRect(13500, 375, 75, 25);
        spawn.mapRect(15550, -950, 50, 225);
        spawn.mapRect(15575, -750, 75, 25);
        spawn.mapRect(15550, -950, 375, 50);
        spawn.mapRect(15925, -950, 50, 225);
        spawn.mapRect(15875, -750, 100, 25);
        spawn.mapRect(15575, -1000, 375, 75);
        spawn.mapRect(15625, -1050, 250, 100);
        spawn.mapRect(15600, -1025, 75, 50);
        spawn.mapRect(15875, -1000, 25, 25);
        spawn.mapRect(15825, -1025, 75, 75);
        spawn.mapRect(15700, -1100, 125, 50);
        spawn.mapRect(15650, -1075, 75, 50);
        spawn.mapRect(15800, -1075, 50, 75);
        spawn.mapRect(15575, -725, 50, 25);
        spawn.mapRect(15900, -725, 50, 25);
        spawn.mapRect(15525, -925, 25, 175);
        spawn.mapRect(15950, -925, 50, 200);
        spawn.mapRect(15500, -875, 25, 75);
        spawn.mapRect(16000, -875, 25, 75);
        spawn.mapRect(15600, -900, 50, 75);
        spawn.mapRect(15650, -900, 25, 25);
        spawn.mapRect(15600, -825, 25, 25);
        spawn.mapRect(15875, -900, 50, 50);
        spawn.mapRect(15850, -925, 75, 50);
        spawn.mapRect(15925, -875, 25, 25);
        spawn.mapRect(15925, -850, 25, 25);
        spawn.mapRect(15900, -875, 50, 50);
        bigpool = level.hazard(9075, 575, 1950, 250);
        spawn.mapRect(16000, -775, 25, 50);
        spawn.mapRect(16000, -800, 25, 25);
        spawn.mapRect(15500, -825, 25, 75);
        spawn.mapRect(15475, -850, 75, 75);
        spawn.mapRect(16000, -850, 50, 100);
        spawn.mapRect(10775, -450, 50, 200);
        spawn.mapRect(10775, -275, 100, 25);
        spawn.mapRect(11100, -450, 50, 200);
        spawn.mapRect(11050, -275, 75, 25);
        spawn.mapRect(10775, -450, 375, 25);
        spawn.mapRect(10825, -475, 275, 25);
        spawn.mapRect(10875, -500, 150, 25);
        spawn.mapRect(10900, -525, 100, 25);
        spawn.mapRect(10750, -425, 25, 150);
        spawn.mapRect(11150, -400, 25, 125);
        spawn.mapRect(10725, -400, 50, 100);
        spawn.mapRect(11150, -375, 50, 75);
        spawn.mapRect(10800, -250, 50, 25);
        spawn.mapRect(10825, -425, 50, 50);
        spawn.mapRect(10875, -425, 25, 25);
        spawn.mapRect(10825, -375, 25, 25);
        spawn.mapRect(11050, -425, 50, 50);
        spawn.mapRect(11025, -425, 25, 25);
        spawn.mapRect(11075, -375, 25, 25);
        spawn.mapRect(950, -1075, 50, 200);
        spawn.mapRect(950, -1125, 300, 50);
        spawn.mapRect(1000, -1075, 50, 50);
        spawn.mapRect(1050, -1075, 25, 25);
        spawn.mapRect(975, -1025, 50, 25);
        spawn.mapRect(975, -1150, 250, 25);
        spawn.mapRect(1000, -1175, 200, 25);
        spawn.mapRect(900, -1075, 50, 175);
        spawn.mapRect(875, -1050, 25, 125);
        spawn.mapRect(950, -875, 125, 25);
        spawn.mapRect(1250, -1125, 25, 125);
        spawn.mapRect(975, -850, 75, 25);
        spawn.mapRect(1250, -1100, 50, 75);
        spawn.mapRect(925, -900, 50, 25);
        spawn.mapRect(1050, -1200, 100, 25);
        spawn.mapRect(1225, -1000, 50, 25);
        spawn.mapRect(16375, 350, 900, 50);
        spawn.mapRect(16400, 375, 850, 50);
        spawn.mapRect(16425, 400, 800, 50);
        spawn.mapRect(16475, 425, 675, 50);
        spawn.mapRect(16625, 475, 375, 25);
        spawn.mapRect(16650, 500, 325, 25);
        spawn.mapRect(16675, 500, 275, 50);
        spawn.mapRect(17400, 775, 25, 325);
        spawn.mapRect(17425, 825, 25, 225);
        spawn.mapRect(16200, 900, 25, 225);
        spawn.mapRect(16175, 925, 25, 125);
        spawn.mapRect(16150, 975, 25, 25);
        spawn.mapRect(16400, 1150, 850, 50);
        spawn.mapRect(16475, 1175, 650, 50);
        spawn.mapRect(16575, 1225, 450, 25);
        spawn.sneaker(7895.471733263175, 257.75477496554186)
        spawn.sneaker(8109.4934675858085, 349.44686618726473)
        spawn.sneaker(7525.886813944122, 391.9511482895349)
        spawn.sneaker(8076.43795816953, 441.14947363958373)
        spawn.pulsar(1064.583377612331, -976.2077284446908)
        spawn.pulsar(1158.3436115513837, -1054.4975368803214)
        spawn.pulsar(10966.055009228428, -373.8481911663377)
        spawn.pulsar(10913.989668763379, -261.59108542627166)
        spawn.pulsar(13454.158594286884, -402.8270664336466)
        spawn.pulsar(13360.079608974078, -246.97797933698774)
        spawn.pulsar(13497.913481830354, -251.68317759640576)
        spawn.pulsar(15687.09056963911, -850.8426925141155)
        spawn.pulsar(15829.058084589731, -785.4134546702737)
        spawn.pulsar(15674.313958480483, -685.0594164868394)
        spawn.pulsar(15819.881465281747, -686.4370174238113)
        spawn.sneakBoss(18189.441342796745, 537.6633241821036)
        thirdpool = level.hazard(16425, 925, 925, 200);
        spawn.mapRect(17675, -525, 75, 725);
        spawn.mapRect(17625, -475, 75, 650);
        spawn.mapRect(17575, -425, 75, 575);
        spawn.mapRect(17700, -525, 1125, 75);
        spawn.mapRect(17675, 175, 1125, 75);
        spawn.mapRect(18775, -525, 75, 775);
        spawn.mapRect(18825, -475, 75, 675);
        spawn.mapRect(18900, -450, 50, 625);
        spawn.mapRect(18950, -400, 50, 500);
        spawn.mapRect(17750, -575, 1000, 50);
        spawn.mapRect(17775, -625, 950, 50);
        spawn.mapRect(17800, -675, 900, 75);
        spawn.mapRect(17825, -725, 850, 125);
        spawn.mapRect(17850, -750, 800, 25);
        spawn.mapRect(17750, 125, 50, 50);
        spawn.mapRect(17750, 100, 25, 25);
        spawn.mapRect(17800, 150, 25, 25);
        spawn.mapRect(17750, -450, 75, 75);
        spawn.mapRect(17750, -400, 25, 50);
        spawn.mapRect(17800, -450, 50, 25);
        spawn.mapRect(18750, -450, 25, 25);
        spawn.mapRect(18725, -450, 50, 50);
        spawn.mapRect(18700, -475, 25, 25);
        spawn.mapRect(18725, -450, 25, 25);
        spawn.mapRect(18700, -450, 75, 25);
        spawn.mapRect(18750, -425, 25, 50);
        spawn.mapRect(18725, 125, 75, 75);
        spawn.mapRect(18700, 150, 50, 50);
        spawn.mapRect(18750, 100, 75, 50);
        spawn.mapRect(17850, 150, 850, 50);
        spawn.mapRect(17825, 150, 25, 50);
        spawn.mapRect(17550, -350, 25, 450);
        spawn.mapRect(19000, -325, 25, 400);
        spawn.mapRect(18000, -775, 475, 25);
        spawn.mapRect(18025, -800, 425, 75);
        spawn.mapRect(18050, -825, 375, 75);
        spawn.mapRect(18075, -850, 325, 50);
        spawn.mapRect(18100, -875, 275, 100);
        spawn.mapRect(18125, -900, 225, 75);
        spawn.mapRect(18150, -925, 175, 75);
        spawn.mapRect(17275, 750, 1775, 125);
        spawn.mapRect(17475, 725, 450, 50);
        spawn.mapRect(18200, 725, 200, 50);
        spawn.mapRect(18650, 725, 225, 75);
        spawn.shieldingBoss(18253.51035871325, -131.1707821125636)
        // spawn.blockBoss(12604.846253470663, 607.6074958800299)
        spawn.mapRect(17725, 250, 1025, 25);
        spawn.mapRect(17775, 275, 925, 25);
        spawn.mapRect(17800, 300, 875, 25);
        spawn.mapRect(17850, 325, 775, 25);
        spawn.mapRect(17375, 275, 25, 75);
        spawn.mapRect(19050, 750, 25, 275);
        spawn.mapRect(19075, 775, 25, 250);
        spawn.mapRect(19100, 800, 25, 225);
        spawn.mapRect(19125, 850, 25, 175);
        spawn.mapRect(19150, 875, 25, 150);
        spawn.mapRect(19175, 925, 25, 100);
        spawn.mapRect(19200, 950, 25, 75);
        spawn.mapRect(19000, 850, 100, 175);
        spawn.mapRect(19050, 975, 650, 50);
        spawn.mapRect(19425, 650, 275, 50);
        spawn.mapRect(19675, 650, 50, 375);
        spawn.mapRect(19050, 1025, 625, 25);
        spawn.mapRect(19075, 1050, 575, 25);
        spawn.mapRect(19250, 1100, 200, 25);
        spawn.mapRect(19175, 1075, 375, 25);
        spawn.mapRect(19450, 625, 225, 25);
        spawn.mapRect(19500, 600, 150, 50);
        spawn.mapRect(19625, 700, 50, 50);
        spawn.mapRect(19600, 700, 25, 25);
        spawn.mapRect(19650, 750, 25, 25);
        spawn.mapRect(19400, 650, 25, 100);
        spawn.mapRect(19375, 675, 25, 50);
        spawn.mapRect(17600, 875, 250, 25);
        spawn.mapRect(18100, 850, 375, 50);
        spawn.mapRect(18650, 875, 325, 25);

        pooldunker = level.mover(7175, 425, 50, 25);
        level.custom = () => {
            level.exit.drawAndCheck();
            pooldunker.VxGoal = 90;
            pooldunker.push();
            mover.VxGoal = 45;
            mover.push();
            level.enter.draw();
            pool.query();
            wastepool.query();
            thirdpool.query();
            mover1.VxGoal = 12;
            mover1.push();
            mover2.VxGoal = 24;
            mover2.push();
            bigpool.query();

            for (i = 0; i < mob.length; i++) { if (mob[i].isBoss == false) { mob[i].damageReduction = 0.13 } }
        };

        spawn.mapRect(-100, 0, 1000, 100);
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    ace() {
        simulation.inGameConsole(`<strong>ace</strong> by <span class='color-var'>Richard0820</span>`);
        let isDestroyed = false;
        const ace = {
            spawnOrbitals(who, radius, chance = Math.min(0.25 + simulation.difficulty * 0.005)) {
                if (Math.random() < chance) {
                    const len = Math.floor(Math.min(15, 3 + Math.sqrt(simulation.difficulty)))
                    const speed = (0.003 + 0.004 * Math.random() + 0.002 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
                    const offSet = 6.28 * Math.random()
                    for (let i = 0; i < len; i++) ace.orbital(who, radius, i / len * 2 * Math.PI + offSet, speed)
                }
            },
            orbital(who, radius, phase, speed) {
                // for (let i = 0, len = 7; i < len; i++) spawn.orbital(me, radius + 250, 2 * Math.PI / len * i)
                mobs.spawn(who.position.x, who.position.y, 8, 12, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                me.stroke = "transparent";
                Matter.Body.setDensity(me, 0.01); //normal is 0.001
                me.leaveBody = false;
                me.isDropPowerUp = false;
                me.isBadTarget = true;
                me.isUnstable = true; //dies when blocked
                me.showHealthBar = false;
                me.isOrbital = true;
                // me.isShielded = true
                me.collisionFilter.category = cat.mobBullet;
                me.collisionFilter.mask = cat.bullet; //cat.player | cat.map | cat.body
                me.do = function () {
                    //if host is gone
                    if (!who || !who.alive) {
                        this.death();
                        return
                    }
                    //set orbit
                    const time = simulation.cycle * speed + phase
                    const orbit = {
                        x: Math.cos(time),
                        y: Math.sin(time)
                    }
                    Matter.Body.setPosition(this, Vector.add(Vector.add(who.position, who.velocity), Vector.mult(orbit, radius)))
                    //damage player
                    if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                        const dmg = 0.03 * spawn.dmgToPlayerByLevelsCleared()
                        m.takeDamage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: this.position.x,
                            y: this.position.y,
                            radius: Math.sqrt(dmg) * 200,
                            color: simulation.mobDmgColor,
                            time: simulation.drawTime
                        });
                        this.death();
                    }
                };
            },
            shield(target, x, y, chance = Math.min(0.02 + simulation.difficulty * 0.005, 0.2) + tech.duplicationChance()) {
                if (this.allowShields && Math.random() < chance) {
                    mobs.spawn(x, y, 9, target.radius + 30, "rgba(255,255,255,0.9)");
                    let me = mob[mob.length - 1];
                    me.stroke = "rgb(0,0,0)";
                    Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
                    me.shield = true;
                    me.damageReduction = 0.05
                    me.isUnblockable = true
                    me.collisionFilter.category = cat.mobShield
                    me.collisionFilter.mask = cat.bullet;
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: target, //attach shield to target
                        stiffness: 0.4,
                        damping: 0.1
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);

                    me.onDamage = function () {
                        //make sure the mob that owns the shield can tell when damage is done
                        this.alertNearByMobs();
                        this.fill = `rgba(255,255,255,${0.3 + 0.6 * this.health})`
                    };
                    me.leaveBody = false;
                    me.isDropPowerUp = false;
                    me.showHealthBar = false;

                    me.shieldTargetID = target.id
                    target.isShielded = true;
                    if (target.shieldCount > 0) {
                        target.shieldCount++
                    } else {
                        target.shieldCount = 1
                    }
                    me.shieldCount = target.shieldCount //used with "bubble fusion"
                    target.shieldID = me.id
                    me.onDeath = function () {
                        //clear isShielded status from target
                        for (let i = 0, len = mob.length; i < len; i++) {
                            if (mob[i].id === this.shieldTargetID) mob[i].isShielded = false;
                        }
                    };
                    me.do = function () {
                        this.checkStatus();
                    };

                    mob.unshift(me); //move shield to the front of the array, so that mob is behind shield graphically

                    //swap order of shield and mob, so that mob is behind shield graphically
                    // mob[mob.length - 1] = mob[mob.length - 2];
                    // mob[mob.length - 2] = me;
                }
            },
            groupShield(targets, x, y, radius, stiffness = 0.4) {
                const nodes = targets.length
                mobs.spawn(x, y, 9, radius, "rgba(255,255,255,0.9)");
                let me = mob[mob.length - 1];
                me.stroke = "rgb(0,0,0)";
                Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
                me.frictionAir = 0;
                me.shield = true;
                me.damageReduction = 0.075
                me.collisionFilter.category = cat.mobShield
                me.collisionFilter.mask = cat.bullet;
                for (let i = 0; i < nodes; ++i) {
                    mob[mob.length - i - 2].isShielded = true;
                    //constrain to all mob nodes in group
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: mob[mob.length - i - 2],
                        stiffness: stiffness,
                        damping: 0.1
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);
                }
                me.onDamage = function () {
                    this.alertNearByMobs(); //makes sure the mob that owns the shield can tell when damage is done
                    this.fill = `rgba(255,255,255,${0.3 + 0.6 * this.health})`
                };
                me.onDeath = function () {
                    //clear isShielded status from target
                    for (let j = 0; j < targets.length; j++) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            if (mob[i].id === targets[j]) mob[i].isShielded = false;
                        }
                    }
                };
                me.leaveBody = false;
                me.isDropPowerUp = false;
                me.showHealthBar = false;
                mob[mob.length - 1] = mob[mob.length - 1 - nodes];
                mob[mob.length - 1 - nodes] = me;
                me.do = function () {
                    this.checkStatus();
                };
            },
            slasher2(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
                mobs.spawn(x, y, 6, radius, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.0009 * simulation.accelScale;
                me.torqueMagnitude = 0.000012 * me.inertia //* (Math.random() > 0.5 ? -1 : 1);
                me.frictionStatic = 0;
                me.friction = 0;
                me.frictionAir = 0.035;
                me.delay = 140 * simulation.CDScale;
                me.cd = 0;
                me.swordRadius = 0;
                me.swordVertex = 1
                me.swordRadiusMax = 275 + 3.5 * simulation.difficulty;
                me.swordRadiusGrowRate = me.swordRadiusMax * (0.011 + 0.0002 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.03 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                const seeDistance2 = 200000
                ace.shield(me, x, y);
                me.onDamage = function () { };
                me.do = function () {
                    this.checkStatus();
                    this.seePlayerByHistory(15);
                    this.attraction();
                    this.sword() //does various things depending on what stage of the sword swing
                };
                me.swordWaiting = function () {
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        this.laserAngle = -Math.PI / 6
                        this.sword = this.swordGrow
                        this.accelMag = 0
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    this.laserSword(this.vertices[0], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[1], this.angle + this.laserAngle + (Math.PI / 3));
                    this.laserSword(this.vertices[2], this.angle + this.laserAngle + (Math.PI * 2 / 3));
                    this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);
                    this.laserSword(this.vertices[4], this.angle + this.laserAngle + (Math.PI * 4 / 3));
                    this.laserSword(this.vertices[5], this.angle + this.laserAngle + (Math.PI * 5 / 3));
                    this.swordRadius += this.swordRadiusGrowRate
                    if (this.swordRadius > this.swordRadiusMax || this.isStunned) {
                        this.sword = this.swordSlash
                        this.spinCount = 0
                    }
                }
                me.swordSlash = function () {
                    this.laserSword(this.vertices[0], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[1], this.angle + this.laserAngle + (Math.PI / 3));
                    this.laserSword(this.vertices[2], this.angle + this.laserAngle + (Math.PI * 2 / 3));
                    this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);
                    this.laserSword(this.vertices[4], this.angle + this.laserAngle + (Math.PI * 4 / 3));
                    this.laserSword(this.vertices[5], this.angle + this.laserAngle + (Math.PI * 5 / 3));

                    this.torque += this.torqueMagnitude;
                    this.spinCount++
                    if (this.spinCount > 100 || this.isStunned) {
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.accelMag = 0.001 * simulation.accelScale;
                        this.cd = simulation.cycle + this.delay;
                    }
                }
                me.laserSword = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                        m.takeDamage(this.swordDamage);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: this.swordDamage * 1500,
                            color: "rgba(80,0,255,0.5)",
                            time: 20
                        });
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // 0 path
                    ctx.lineWidth = 15;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // 0 path
                    ctx.lineWidth = 4;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
            },
            slasher3(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
                const sides = 6
                mobs.spawn(x, y, sides, radius, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.0005 * simulation.accelScale;
                me.frictionStatic = 0;
                me.friction = 0;
                me.frictionAir = 0.02;
                me.delay = 150 * simulation.CDScale;
                me.cd = 0;
                me.cycle = 0;
                me.swordVertex = 1
                me.swordRadiusInitial = radius / 2;
                me.swordRadius = me.swordRadiusInitial;
                me.swordRadiusMax = 750 + 6 * simulation.difficulty;
                me.swordRadiusGrowRateInitial = 1.08
                me.swordRadiusGrowRate = me.swordRadiusGrowRateInitial//me.swordRadiusMax * (0.009 + 0.0002 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.04 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                const seeDistance2 = me.swordRadiusMax * me.swordRadiusMax
                ace.shield(me, x, y);
                me.onDamage = function () { };
                me.do = function () {
                    this.checkStatus();
                    this.seePlayerByHistory(15);
                    this.sword() //does various things depending on what stage of the sword swing
                };
                me.swordWaiting = function () {
                    this.attraction();
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        //find vertex closest to the player
                        let dist = Infinity
                        for (let i = 0, len = this.vertices.length; i < len; i++) {
                            const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                            if (D < dist) {
                                dist = D
                                this.swordVertex = i
                            }
                        }
                        this.laserAngle = this.swordVertex / sides * 2 * Math.PI + Math.PI / sides
                        this.sword = this.swordGrow
                        this.cycle = 0
                        this.swordRadius = this.swordRadiusInitial
                        //slow velocity but don't stop
                        Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.5))
                        //set angular velocity to 50%
                        // Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.5)
                        //gently rotate towards the player with a torque, use cross product to decided clockwise or counterclockwise
                        const laserStartVector = Vector.sub(this.position, this.vertices[this.swordVertex])
                        const playerVector = Vector.sub(this.position, m.pos)
                        const cross = Matter.Vector.cross(laserStartVector, playerVector)
                        this.torque = 0.00002 * this.inertia * (cross > 0 ? 1 : -1)
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSpear(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSpear(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSpear(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))

                    Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.9))
                    // this.swordRadius += this.swordRadiusGrowRate
                    this.cycle++
                    // this.swordRadius = this.swordRadiusMax * Math.sin(this.cycle * 0.03)
                    this.swordRadius *= this.swordRadiusGrowRate

                    if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial
                    // if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = -Math.abs(this.swordRadiusGrowRate)
                    if (this.swordRadius < this.swordRadiusInitial || this.isStunned) {
                        // this.swordRadiusGrowRate = Math.abs(this.swordRadiusGrowRate)
                        this.swordRadiusGrowRate = this.swordRadiusGrowRateInitial
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.cd = simulation.cycle + this.delay;
                    }
                }
                me.laserSpear = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead)) {
                        this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial //!!!! this retracts the sword if it hits the player

                        if (m.immuneCycle < m.cycle) {
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                            m.takeDamage(this.swordDamage);
                            simulation.drawList.push({ //add dmg to draw queue
                                x: best.x,
                                y: best.y,
                                radius: this.swordDamage * 1500,
                                color: "rgba(80,0,255,0.5)",
                                time: 20
                            });
                        }
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // 0 path
                    ctx.lineWidth = 15;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // 0 path
                    ctx.lineWidth = 4;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
            },
            stabber(x, y, radius = 25 + Math.ceil(Math.random() * 12), spikeMax = 7) {
                if (radius > 80) radius = 65;
                mobs.spawn(x, y, 6, radius, "rgb(0,0,0)"); //can't have sides above 6 or collision events don't work (probably because of a convex problem)
                let me = mob[mob.length - 1];
                me.isVerticesChange = true
                me.accelMag = 0.0006 * simulation.accelScale;
                // me.g = 0.0002; //required if using this.gravity
                me.isInvulnerable = false
                me.delay = 360 * simulation.CDScale;
                me.spikeVertex = 0;
                me.spikeLength = 0;
                me.isSpikeGrowing = false;
                me.spikeGrowth = 0;
                me.isSpikeReset = true;
                me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.player //can't touch other mobs
                Matter.Body.rotate(me, Math.PI * 0.1);
                ace.shield(me, x, y);
                // me.onDamage = function () {};
                // me.onHit = function() { //run this function on hitting player
                // };
                me.onDeath = function () {
                    if (this.spikeLength > 4) {
                        this.spikeLength = 4
                        const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), this.radius * this.spikeLength)
                        this.vertices[this.spikeVertex].x = this.position.x + spike.x
                        this.vertices[this.spikeVertex].y = this.position.y + spike.y
                        // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
                    }
                };
                me.do = function () {
                    this.seePlayerByLookingAt();
                    this.checkStatus();
                    this.attraction();
                    if (this.isSpikeReset) {
                        if (this.seePlayer.recall) {
                            const dist = Vector.sub(this.seePlayer.position, this.position);
                            const distMag = Vector.magnitude(dist);
                            if (distMag < radius * spikeMax) {
                                //find nearest vertex
                                let nearestDistance = Infinity
                                for (let i = 0, len = this.vertices.length; i < len; i++) {
                                    //find distance to player for each vertex
                                    const dist = Vector.sub(this.seePlayer.position, this.vertices[i]);
                                    const distMag = Vector.magnitude(dist);
                                    //save the closest distance
                                    if (distMag < nearestDistance) {
                                        this.spikeVertex = i
                                        nearestDistance = distMag
                                    }
                                }
                                this.spikeLength = 1
                                this.isSpikeGrowing = true;
                                this.isSpikeReset = false;
                                Matter.Body.setAngularVelocity(this, 0)
                            }
                            me.isInvulnerable = false
                        }
                    } else {
                        if (this.isSpikeGrowing) {
                            this.spikeLength += Math.pow(this.spikeGrowth += 0.02, 8)
                            // if (this.spikeLength < 2) {
                            //     this.spikeLength += 0.035
                            // } else {
                            //     this.spikeLength += 1
                            // }
                            if (this.spikeLength > spikeMax) {
                                this.isSpikeGrowing = false;
                                this.spikeGrowth = 0
                            }
                        } else {
                            Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.8) //reduce rotation
                            this.spikeLength -= 0.3
                            if (this.spikeLength < 1) {
                                this.spikeLength = 1
                                this.isSpikeReset = true
                                this.radius = radius
                            }
                        }
                        const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), radius * this.spikeLength)
                        this.vertices[this.spikeVertex].x = this.position.x + spike.x
                        this.vertices[this.spikeVertex].y = this.position.y + spike.y
                        me.isInvulnerable = true
                        // this.radius = radius * this.spikeLength;
                    }
                    if (this.isInvulnerable) {
                        ctx.beginPath();
                        let vertices = this.vertices;
                        ctx.moveTo(vertices[0].x, vertices[0].y);
                        for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                        ctx.lineTo(vertices[0].x, vertices[0].y);
                        ctx.lineWidth = 13 + 5 * Math.random();
                        ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                        ctx.stroke();
                        me.damageReduction = 0;
                    } else {
                        me.damageReduction = 1;
                    }
                };
            },
            slash(x, y, radius = 80) {
                let targets = []
                const sides = 6;
                mobs.spawn(x, y, 6, radius, "#000000");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                targets.push(me.id) //add to shield protection
                const nodeBalance = Math.random()
                const nodes2 = Math.min(15, Math.floor(2 + 4 * nodeBalance + 0.75 * Math.sqrt(simulation.difficulty)))
                me.isBoss = true;
                me.name = "aceBoss"

                me.isSlashBoss = true;
                me.showHealthBar = false;
                me.damageReduction = 0.1
                me.startingDamageReduction = me.damageReduction
                me.isInvulnerable = false
                me.frictionAir = 0.02
                me.seeAtDistance2 = 1000000;
                me.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                Matter.Body.setDensity(me, 0.0005); //normal is 0.001
                me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map
                me.memory = Infinity;
                me.seePlayerFreq = 20
                me.lockedOn = null;
                me.laserRange = 500;
                me.torqueMagnitude = 0.00024 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
                me.delay = 70 + 70 * simulation.CDScale;
                me.cd = 0;
                me.swordRadius = 0;
                me.swordVertex = 1
                me.swordRadiusMax = 1100 + 20 * simulation.difficulty;
                me.swordRadiusGrowRate = me.swordRadiusMax * (0.005 + 0.0003 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.07 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                me.eventHorizon = 550;
                const seeDistance2 = 200000
                ace.shield(me, x, y);
                const rangeInnerVsOuter = Math.random()
                let speed = (0.006 + 0.001 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
                let range = radius + 350 + 200 * rangeInnerVsOuter + nodes2 * 7
                for (let i = 0; i < nodes2; i++) ace.orbital(me, range, i / nodes2 * 2 * Math.PI, speed)
                const orbitalIndexes = [] //find indexes for all the current nodes2
                for (let i = 0; i < nodes2; i++) orbitalIndexes.push(mob.length - 1 - i)
                // add orbitals for each orbital
                range = Math.max(60, 100 + 100 * Math.random() - nodes2 * 3 - rangeInnerVsOuter * 80)
                speed = speed * (1.25 + 2 * Math.random())
                const subNodes = Math.max(2, Math.floor(6 - 5 * nodeBalance + 0.5 * Math.sqrt(simulation.difficulty)))
                for (let j = 0; j < nodes2; j++) {
                    for (let i = 0, len = subNodes; i < len; i++) ace.orbital(mob[orbitalIndexes[j]], range, i / len * 2 * Math.PI, speed)
                }
                for (let i = 0, len = 3 + 0.5 * Math.sqrt(simulation.difficulty); i < len; i++) ace.spawnOrbitals(me, radius + 40 + 10 * i, 1);

                const springStiffness = 0.00014;
                const springDampening = 0.0005;

                me.springTarget = {
                    x: me.position.x,
                    y: me.position.y
                };
                const len = cons.length;
                cons[len] = Constraint.create({
                    pointA: me.springTarget,
                    bodyB: me,
                    stiffness: springStiffness,
                    damping: springDampening
                });
                Composite.add(engine.world, cons[cons.length - 1]);
                cons[len].length = 100 + 1.5 * radius;
                me.cons = cons[len];

                me.springTarget2 = {
                    x: me.position.x,
                    y: me.position.y
                };
                const len2 = cons.length;
                cons[len2] = Constraint.create({
                    pointA: me.springTarget2,
                    bodyB: me,
                    stiffness: springStiffness,
                    damping: springDampening,
                    length: 0
                });
                Composite.add(engine.world, cons[cons.length - 1]);
                cons[len2].length = 100 + 1.5 * radius;
                me.cons2 = cons[len2];
                me.onDamage = function () { };
                me.onDeath = function () {
                    isDestroyed = true;
                    this.removeCons();
                    powerUps.spawnBossPowerUp(this.position.x, this.position.y);
                };
                me.do = function () {
                    for (let i = 0; i < this.vertices.length; i++) {
                        this.harmField(this.vertices[i].x, this.vertices[i].y);
                    }
                    this.seePlayerByHistory(40);
                    this.springAttack();
                    this.checkStatus();
                    this.sword() //does various things depending on what stage of the sword swing
                    const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008))
                    me.laserRange = eventHorizon;
                };
                me.swordWaiting = function () {
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        !m.isCloak &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        //find vertex farthest away from player
                        let dist = 0
                        for (let i = 0, len = this.vertices.length; i < len; i++) {
                            const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                            if (D > dist) {
                                dist = D
                                this.swordVertex = i
                            }
                        }
                        this.laserAngle = this.swordVertex / 6 * 2 * Math.PI + 0.6283
                        this.sword = this.swordGrow
                        Matter.Body.setAngularVelocity(this, 0)
                        this.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                        this.damageReduction = 0
                        this.isInvulnerable = true
                        this.frictionAir = 1
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSword(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))
                    this.swordRadius += this.swordRadiusGrowRate
                    if (this.swordRadius > this.swordRadiusMax) {
                        this.sword = this.swordSlash
                        this.spinCount = 0
                    }

                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
                me.swordSlash = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSword(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))
                    this.torque += this.torqueMagnitude;
                    this.spinCount++
                    if (this.spinCount > 80) {
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                        this.cd = simulation.cycle + this.delay;
                        this.damageReduction = this.startingDamageReduction
                        this.isInvulnerable = false
                        this.frictionAir = 0.01
                    }
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
                me.laserSword = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                        m.takeDamage(this.swordDamage);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: this.swordDamage * 1500,
                            color: "rgba(0,0,0,0.5)",
                            time: 20
                        });
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // Black path
                    ctx.lineWidth = 25;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // Black path
                    ctx.lineWidth = 5;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
                me.harmField = function (x, y) {
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                    // ctx.lineDashOffset = 6*(simulation.cycle % 215);
                    if (this.distanceToPlayer3(x, y) < this.laserRange) {
                        if (m.immuneCycle < m.cycle) {
                            m.takeDamage(0.0003 * spawn.dmgToPlayerByLevelsCleared());
                            if (m.energy > 0.1) m.energy -= 0.003
                        }
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(m.pos.x, m.pos.y);
                        ctx.lineTo(m.pos.x + (Math.random() - 0.5) * 3000, m.pos.y + (Math.random() - 0.5) * 3000);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgb(0,0,0)";
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                        ctx.fillStyle = "rgba(0,0,0,0.15)";
                        ctx.fill();
                    }
                    ctx.beginPath();
                    ctx.arc(x, y, this.laserRange * 0.9, 0, 2 * Math.PI);
                    ctx.strokeStyle = "rgba(0,0,0,0.5)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(0,0,0,0.03)";
                    ctx.fill();
                }
                me.distanceToPlayer3 = function (x, y) {
                    const dx = x - player.position.x;
                    const dy = y - player.position.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }
                radius = 22 // radius of each node mob
                const sideLength = 100 // distance between each node mob
                const nodes = 6
                const angle = 2 * Math.PI / nodes

                spawn.allowShields = false; //don't want shields on individual mobs

                for (let i = 0; i < nodes; ++i) {
                    ace.stabber(x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), radius, 12);
                    Matter.Body.setDensity(mob[mob.length - 1], 0.003); //extra dense //normal is 0.001 //makes effective life much larger
                    mob[mob.length - 1].damageReduction = 0.12
                    mob[mob.length - 1].showHealthBar = false;
                    mob[mob.length - 1].isBoss = true;
                    targets.push(mob[mob.length - 1].id) //track who is in the node boss, for shields
                }

                const attachmentStiffness = 0.02
                spawn.constrain2AdjacentMobs(nodes, attachmentStiffness, true); //loop mobs together

                for (let i = 0; i < nodes; ++i) { //attach to center mob
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: mob[mob.length - i - 1],
                        stiffness: attachmentStiffness,
                        damping: 0.03
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);
                }
                //spawn shield around all nodes
                ace.groupShield(targets, x, y, sideLength + 1 * radius + nodes * 5 - 25);
                spawn.allowShields = true;
            },
        }
        level.setPosToSpawn(-625, -100); //normal spawn
        level.exit.x = -23650;
        level.exit.y = 11100;
        simulation.fallHeight = 20000;
        const door = level.door(350, -200, 25, 225, 225, 10)
        const door2 = level.door(6325, -200, 25, 225, 225, 10);
        // spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        ace.stabber(425, -100);
        ace.stabber(725, -100);
        ace.stabber(1000, -100);
        ace.stabber(1300, -100);
        ace.stabber(1550, -100);
        ace.stabber(1850, -100);
        ace.stabber(2125, -100);
        ace.stabber(2400, -100);
        ace.stabber(2675, -100);
        ace.stabber(2975, -100);
        ace.stabber(3225, -100);
        ace.stabber(3525, -100);
        ace.stabber(3800, -100);
        ace.stabber(4100, -100);
        ace.stabber(4375, -100);
        ace.stabber(4650, -100);
        ace.stabber(4925, -100);
        ace.stabber(5200, -100);
        ace.stabber(5500, -100);
        ace.stabber(5775, -100);
        spawn.mapRect(-200, -450, 2825, 75);
        spawn.mapRect(-200, 0, 2825, 75);
        spawn.mapRect(-300, -400, 150, 50);
        spawn.mapRect(-575, -375, 325, 50);
        spawn.mapRect(-1175, 0, 700, 75);
        spawn.mapRect(-1100, 50, 675, 75);
        spawn.mapRect(-1100, -50, 225, 75);
        spawn.mapRect(-1025, -75, 200, 50);
        spawn.mapRect(-875, -50, 150, 75);
        spawn.mapRect(-700, -350, 325, 50);
        spawn.mapRect(-950, -100, 150, 50);
        spawn.mapRect(-675, -50, 125, 25);
        spawn.mapRect(-575, -150, 25, 125);
        spawn.mapRect(-650, -50, 25, 75);
        spawn.mapRect(-600, -50, 25, 75);
        spawn.mapRect(-800, -325, 250, 50);
        spawn.mapRect(-1450, 50, 500, 75);
        spawn.mapRect(-1550, 100, 475, 100);
        spawn.mapRect(-1650, 175, 525, 375);
        spawn.mapRect(-1700, 275, 200, 175);
        spawn.mapRect(-1550, 525, 475, 100);
        spawn.mapRect(-1475, 600, 4125, 100);
        spawn.mapRect(-50, 50, 75, 75);
        level.chain(-450, 75, 0, false, 13)
        level.chain(7475, 600, -0.5498531827, false, 200)
        spawn.mapRect(325, -425, 75, 275);
        spawn.mapRect(-850, -300, 100, 50);
        spawn.mapRect(-900, -125, 75, 50);
        spawn.mapRect(-875, -275, 50, 50);
        spawn.mapRect(425, -400, 125, 100);
        spawn.mapRect(600, -400, 125, 100);
        spawn.mapRect(775, -400, 125, 100);
        spawn.mapRect(950, -400, 125, 100);
        spawn.mapRect(375, -350, 2250, 25);
        spawn.mapRect(1125, -400, 125, 100);
        spawn.mapRect(1300, -400, 125, 100);
        spawn.mapRect(1475, -400, 125, 100);
        spawn.mapRect(1650, -400, 125, 100);
        spawn.mapRect(1825, -400, 125, 100);
        spawn.mapRect(2000, -400, 125, 100);
        spawn.mapRect(2175, -400, 125, 100);
        spawn.mapRect(2350, -400, 125, 100);
        spawn.mapRect(2525, -400, 125, 100);
        spawn.mapRect(-1350, 650, 4000, 150);
        spawn.mapRect(-1400, 675, 125, 75);
        spawn.mapRect(-1325, 25, 200, 50);
        spawn.mapRect(2600, 600, 4350, 200);
        spawn.mapRect(2550, 0, 4400, 75);
        spawn.mapRect(6875, 0, 875, 75);
        spawn.mapRect(2500, -450, 5300, 50);
        spawn.mapRect(7575, -425, 575, 475);
        spawn.mapRect(6825, 600, 650, 125);
        spawn.mapRect(6875, 675, 475, 100);
        spawn.mapRect(7050, -525, 1175, 175);
        spawn.mapRect(7650, -25, 575, 150);
        spawn.mapRect(6075, -500, 1125, 75);
        spawn.mapRect(2550, -350, 3450, 25);
        spawn.mapRect(2700, -400, 125, 100);
        spawn.mapRect(2875, -400, 125, 100);
        spawn.mapRect(3050, -400, 125, 100);
        spawn.mapRect(3225, -400, 125, 100);
        spawn.mapRect(3400, -400, 125, 100);
        spawn.mapRect(3575, -400, 125, 100);
        spawn.mapRect(3750, -400, 125, 100);
        spawn.mapRect(3925, -400, 125, 100);
        spawn.mapRect(4100, -400, 125, 100);
        spawn.mapRect(4275, -400, 125, 100);
        spawn.mapRect(4450, -400, 125, 100);
        spawn.mapRect(4625, -400, 125, 100);
        spawn.mapRect(4800, -400, 125, 100);
        spawn.mapRect(4975, -400, 125, 100);
        spawn.mapRect(5150, -400, 125, 100);
        spawn.mapRect(5325, -400, 125, 100);
        spawn.mapRect(5500, -400, 125, 100);
        spawn.mapRect(5675, -400, 125, 100);
        spawn.mapRect(5850, -400, 125, 100);
        spawn.mapRect(6000, -400, 125, 100);
        spawn.mapRect(6100, -425, 125, 100);
        spawn.mapRect(6150, -450, 200, 75);
        spawn.mapRect(2575, -400, 3575, 25);
        spawn.mapRect(6300, -425, 75, 250);
        spawn.mapRect(-200, -175, 50, 50);
        spawn.bodyRect(-950, 475, 150, 125);
        spawn.bodyRect(-650, 475, 150, 125);
        spawn.bodyRect(-1000, 350, 550, 125);
        spawn.bodyRect(-650, 150, 225, 200);
        spawn.bodyRect(-1050, 150, 400, 200);
        spawn.bodyRect(-1125, 225, 25, 275);
        spawn.bodyRect(-1100, 350, 125, 200);
        spawn.bodyRect(-800, 475, 150, 125);
        spawn.bodyRect(-500, 475, 125, 125);
        spawn.mapRect(-3325, -50, 600, 75);
        spawn.mapRect(-3250, 0, 450, 75);
        spawn.mapRect(-2950, -100, 350, 75);
        spawn.mapRect(-2975, -150, 325, 75);
        spawn.mapRect(-3150, -250, 125, 25);
        spawn.mapRect(-3050, -225, 100, 25);
        spawn.mapRect(-3000, -200, 125, 25);
        spawn.mapRect(-3425, -75, 325, 50);
        spawn.mapRect(-3250, -225, 125, 25);
        spawn.mapRect(-3325, -200, 100, 25);
        spawn.mapRect(-3100, -300, 25, 50);
        spawn.mapRect(-3725, -325, 1300, 25);
        spawn.mapRect(-2925, -175, 125, 25);
        spawn.mapRect(-3375, -175, 100, 25);
        spawn.mapRect(-3550, -150, 250, 75);
        spawn.mapRect(-3725, -150, 250, 50);
        spawn.mapRect(-3725, -200, 125, 75);
        spawn.mapRect(-3625, -175, 50, 25);
        spawn.mapRect(-3750, -125, 50, 25);
        spawn.mapRect(-3750, -50, 125, 50);
        spawn.mapRect(-3650, -125, 75, 100);
        spawn.mapRect(-2750, 0, 100, 75);
        spawn.mapRect(-2675, 25, 175, 25);
        spawn.mapRect(-2850, 0, 150, 50);
        spawn.mapRect(-3150, 50, 25, 75);
        spawn.mapRect(-2900, 50, 25, 75);
        spawn.mapRect(-3300, 100, 575, 25);
        spawn.mapRect(-24300, 11125, 51525, 6250);
        spawn.mapVertex(7900, -675, "0 0 500 -200 500 300 -450 300")
        spawn.mapRect(-24300, 9575, 475, 1750);
        spawn.mapRect(26800, 9575, 425, 1750);
        spawn.hopper(-3100, -150);
        spawn.mapRect(11625, 8375, 11200, 225);
        spawn.mapRect(22600, 8375, 225, 3225);
        spawn.mapRect(11625, 8375, 225, 1800);
        spawn.mapRect(12425, 9825, 225, 875);
        spawn.mapRect(13150, 10725, 225, 575);
        spawn.mapRect(14125, 10450, 5025, 200);
        spawn.mapRect(21775, 10625, 1050, 225);
        spawn.mapRect(20325, 10925, 1300, 200);
        spawn.mapRect(20825, 10250, 750, 225);
        spawn.mapRect(19500, 10000, 1000, 225);


        ace.slasher2(-22725, 10325);
        ace.slasher3(-23425, 10250);
        ace.slasher2(-23350, 10700);
        ace.slasher3(-21725, 11075);
        ace.slasher2(-21525, 10025);
        ace.slasher3(-20950, 9750);
        ace.slasher2(-19975, 9700);
        ace.slasher3(-18850, 9650);
        ace.slasher2(-18675, 9700);
        ace.slasher3(-18250, 9125);
        ace.slasher2(-17775, 8925);
        ace.slasher3(-16975, 8875);
        ace.slasher2(-16475, 9125);
        ace.slasher3(-16125, 9275);
        ace.slasher2(-15650, 9225);
        ace.slasher3(-15200, 9175);
        ace.slasher2(-16800, 9325);
        ace.slasher3(-17450, 9525);
        ace.slasher2(-18375, 9625);
        ace.slasher3(-19650, 9375);
        ace.slasher2(-20600, 9225);
        ace.slasher3(-21625, 9400);
        ace.slasher2(-22450, 9775);
        ace.slasher3(-22900, 10000);
        ace.slasher2(-23275, 9300);
        ace.slasher3(-23125, 9150);
        ace.slasher2(2800, 9350);
        ace.slasher3(4925, 9825);
        ace.slasher2(3725, 10525);
        ace.slasher3(1850, 10450);
        ace.slash(16850, 10075);
        spawn.mapVertex(-14325, 11000, "0 0 4000 -2000 10000 -3000 16000 -2000 20000 0");

        let q = Matter.Bodies.rectangle(7525 + (1100 / 2), 10675 + (150 / 2), 1100, 150, {
            density: 0.05,
            isNotHoldable: false,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qq = Matter.Bodies.rectangle(7375 + (150 / 2), 10550 + (200 / 2), 150, 200, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqq = Matter.Bodies.rectangle(7450 + (1250 / 2), 10500 + (100 / 2), 1250, 100, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqq = Matter.Bodies.rectangle(8625 + (150 / 2), 10550 + (200 / 2), 150, 200, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqq = Matter.Bodies.rectangle(7600 + (100 / 2), 10350 + (200 / 2), 100, 200, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqq = Matter.Bodies.rectangle(8475 + (100 / 2), 10350 + (200 / 2), 100, 200, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqq = Matter.Bodies.rectangle(7650 + (725 / 2), 10325 + (75 / 2), 725, 75, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqqq = Matter.Bodies.rectangle(8000 + 100, 10200 + (150 / 2), 200, 150, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqqqq = Matter.Bodies.rectangle(6975 + (1125 / 2), 10250 + 25, 1125, 50, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqqqqq = Matter.Bodies.rectangle(7600 + 50, 10575 + (125 / 2), 100, 125, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqqqqqq = Matter.Bodies.rectangle(8475 + 50, 10575 + (125 / 2), 100, 125, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let qqqqqqqqqqqq = Matter.Bodies.rectangle(8025 + 50, 10575 + (125 / 2), 100, 125, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);


        wasd = Matter.Body.create({
            parts: [q, qq, qqq, qqqq, qqqqq, qqqqqq, qqqqqqq, qqqqqqqq, qqqqqqqqq, qqqqqqqqqq, qqqqqqqqqqq, qqqqqqqqqqqq]
        });

        body[body.length] = q;
        body[body.length] = qq;
        body[body.length] = qqq;
        body[body.length] = qqqq;
        body[body.length] = qqqqq;
        body[body.length] = qqqqqq;
        body[body.length] = qqqqqqq;
        body[body.length] = qqqqqqqq;
        body[body.length] = qqqqqqqqq;
        body[body.length] = qqqqqqqqqq;
        body[body.length] = qqqqqqqqqqq;
        body[body.length] = qqqqqqqqqqqq;
        // body[body.length] = wasd;

        Matter.Composite.add(engine.world, wasd)
        composite[composite.length] = wasd;
        // wasd.friction -= 0.5
        setTimeout(function () {
            wasd.collisionFilter.category = cat.map;
            wasd.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mobBullet | cat.mob | cat.map
        }, 100);
        let Vx = 0;
        var gradient = ctx.createLinearGradient(0, 0, 10975 / 2, 0);
        gradient.addColorStop(0, "#00000000");
        gradient.addColorStop(1, "#686868");
        level.custom = () => {
            wasd.force.y += simulation.g * wasd.mass;
            if (Matter.Query.collides(wasd, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && input.down && isDestroyed) {
                wasd.force.x += Math.cos(m.angle) * 75;
                Matter.Body.setVelocity(player, wasd.velocity)
                m.Vx = player.velocity.x - wasd.velocity.x;
            }
            for (let i = 0; i < mob.length; i++) {
                if (Matter.Query.collides(wasd, [mob[i]]).length > 0 && !mob[i].isBoss && isDestroyed) {
                    const dmg = 1;
                    mob[i].damage(dmg, true);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: mob[i].position.x,
                        y: mob[i].position.y,
                        radius: Math.sqrt(dmg) * 50,
                        color: simulation.mobDmgColor,
                        time: simulation.drawTime
                    });
                    break
                }
            }
            Vx = wasd.velocity.x / 5;
            level.exit.drawAndCheck();
            drawSeats(475, -50, 5600, 125, 20, "darkgray");
            door.openClose()
            door2.openClose()
            if (player.position.y < 25) {
                door.isClosing = false;
                door2.isClosing = false;
            } else {
                door.isClosing = true;
                door2.isClosing = true;
            }
            ctx.fillStyle = "red";
            ctx.fillRect(-825, -75, 50, 50);

            b.pulse(30, 0, { x: -2500, y: (25 + (25 / 2)) });
            ctx.save()
            ctx.translate(11750, 8475)
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 10975, 2800);
            ctx.restore()
            drawHead(7400, 0, Math.PI * 0.1);
            drawHead(7460, 0, Math.PI * 0.5);
            drawHead(7520, 0, Math.PI * 0.3);
            drawHead(22400, 11125, Math.PI * 0.3);
            drawHead(21925, 10625, Math.PI * 0.5);
            drawHead(21175, 10250, Math.PI * 0.1);
            drawHead(22525, 10625, Math.PI * 0.7);
            drawHead(22525, 11125, Math.PI * 0.9);
            drawHead(22225, 11125, Math.PI * 1.5);
        };
        level.customTopLayer = () => {
            drawSeats(500, -50, 5600, 125);

            ctx.strokeStyle = 'red';
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.setLineDash([40, 40]);
            ctx.lineDashOffset = (-simulation.cycle * Vx) % 80;

            ctx.moveTo(q.vertices[0].x, q.vertices[0].y);
            for (let i = 1; i < q.vertices.length; i++) {
                ctx.lineTo(q.vertices[i].x, q.vertices[i].y);
            }
            ctx.lineTo(q.vertices[0].x, q.vertices[0].y);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([0, 0]);
        };
        function drawSeats(x, y, w, h, num = 20, c = "gray") {
            const seatWidth = w / num;
            const seatHeight = h / num;

            for (let i = 0; i < num; i++) {
                const seatX = x + i * seatWidth;
                const seatY = y;

                // Draw the seat parts
                ctx.fillStyle = c;
                ctx.fillRect(seatX - 100, seatY, 125, 25);
                ctx.fillRect(seatX, seatY - 125, 25, 150);
                ctx.fillRect(seatX - 75, seatY, 25, 75);
                ctx.fillRect(seatX - 25, seatY, 25, 75);
            }
        }
        function drawHead(x, y, angle) {
            ctx.save();
            ctx.translate(x, y - 30);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, 2 * Math.PI);
            ctx.fillStyle = m.bodyGradient
            ctx.fill();
            ctx.arc(15, 0, 4, 0, 2 * Math.PI);
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
        for (let i = 0, len = mob.length; i < len; i++) {
            if (mob[i].isSlashBoss) {
                simulation.ephemera.push({
                    name: "bossBar",
                    do() {
                        if (level.levels[level.onLevel] == "ace" && !isDestroyed) {
                            ctx.save();
                            ctx.setTransform(1, 0, -0.5, 1, 0, 0); //slanted
                            ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                            ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2, 30);
                            ctx.fillStyle = "rgba(0,0,0,0.7)";
                            try {
                                ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2 * mob[i].health, 30);
                            } catch (error) {
                                ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, 0, 30);
                                simulation.inGameConsole(`<strong style="color: red;">ERROR: SCRIPT ERROR: </strong><span style="color:red">${error}</span>`);
                            }
                            ctx.restore();
                        }
                    },
                })
            }
        }
    },
    crimsonTowers() {
        simulation.inGameConsole(`crimsonTowers by Richard0820. Thank you desboot for the video: <a href="https://www.youtube.com/watch?v=hkdY0mDF2SY&feature=youtu.be&ab_channel=DesBoot">Source</a>`)
        const ace = {
            spawnOrbitals(who, radius, chance = Math.min(0.25 + simulation.difficulty * 0.005)) {
                if (Math.random() < chance) {
                    const len = Math.floor(Math.min(15, 3 + Math.sqrt(simulation.difficulty)))
                    const speed = (0.003 + 0.004 * Math.random() + 0.002 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
                    const offSet = 6.28 * Math.random()
                    for (let i = 0; i < len; i++) ace.orbital(who, radius, i / len * 2 * Math.PI + offSet, speed)
                }
            },
            orbital(who, radius, phase, speed) {
                // for (let i = 0, len = 7; i < len; i++) spawn.orbital(me, radius + 250, 2 * Math.PI / len * i)
                mobs.spawn(who.position.x, who.position.y, 8, 12, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                me.stroke = "transparent";
                Matter.Body.setDensity(me, 0.01); //normal is 0.001
                me.leaveBody = false;
                me.isDropPowerUp = false;
                me.isBadTarget = true;
                me.isUnstable = true; //dies when blocked
                me.showHealthBar = false;
                me.isOrbital = true;
                // me.isShielded = true
                me.collisionFilter.category = cat.mobBullet;
                me.collisionFilter.mask = cat.bullet; //cat.player | cat.map | cat.body
                me.do = function () {
                    //if host is gone
                    if (!who || !who.alive) {
                        this.death();
                        return
                    }
                    //set orbit
                    const time = simulation.cycle * speed + phase
                    const orbit = {
                        x: Math.cos(time),
                        y: Math.sin(time)
                    }
                    Matter.Body.setPosition(this, Vector.add(Vector.add(who.position, who.velocity), Vector.mult(orbit, radius)))
                    //damage player
                    if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                        const dmg = 0.03 * spawn.dmgToPlayerByLevelsCleared()
                        m.takeDamage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: this.position.x,
                            y: this.position.y,
                            radius: Math.sqrt(dmg) * 200,
                            color: simulation.mobDmgColor,
                            time: simulation.drawTime
                        });
                        this.death();
                    }
                };
            },
            shield(target, x, y, chance = Math.min(0.02 + simulation.difficulty * 0.005, 0.2) + tech.duplicationChance()) {
                if (this.allowShields && Math.random() < chance) {
                    mobs.spawn(x, y, 9, target.radius + 30, "rgba(255,255,255,0.9)");
                    let me = mob[mob.length - 1];
                    me.stroke = "rgb(0,0,0)";
                    Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
                    me.shield = true;
                    me.damageReduction = 0.05
                    me.isUnblockable = true
                    me.collisionFilter.category = cat.mobShield
                    me.collisionFilter.mask = cat.bullet;
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: target, //attach shield to target
                        stiffness: 0.4,
                        damping: 0.1
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);

                    me.onDamage = function () {
                        //make sure the mob that owns the shield can tell when damage is done
                        this.alertNearByMobs();
                        this.fill = `rgba(255,255,255,${0.3 + 0.6 * this.health})`
                    };
                    me.leaveBody = false;
                    me.isDropPowerUp = false;
                    me.showHealthBar = false;

                    me.shieldTargetID = target.id
                    target.isShielded = true;
                    if (target.shieldCount > 0) {
                        target.shieldCount++
                    } else {
                        target.shieldCount = 1
                    }
                    me.shieldCount = target.shieldCount //used with "bubble fusion"
                    target.shieldID = me.id
                    me.onDeath = function () {
                        //clear isShielded status from target
                        for (let i = 0, len = mob.length; i < len; i++) {
                            if (mob[i].id === this.shieldTargetID) mob[i].isShielded = false;
                        }
                    };
                    me.do = function () {
                        this.checkStatus();
                    };

                    mob.unshift(me); //move shield to the front of the array, so that mob is behind shield graphically

                    //swap order of shield and mob, so that mob is behind shield graphically
                    // mob[mob.length - 1] = mob[mob.length - 2];
                    // mob[mob.length - 2] = me;
                }
            },
            groupShield(targets, x, y, radius, stiffness = 0.4) {
                const nodes = targets.length
                mobs.spawn(x, y, 9, radius, "rgba(255,255,255,0.9)");
                let me = mob[mob.length - 1];
                me.stroke = "rgb(0,0,0)";
                Matter.Body.setDensity(me, 0.00001) //very low density to not mess with the original mob's motion
                me.frictionAir = 0;
                me.shield = true;
                me.damageReduction = 0.075
                me.collisionFilter.category = cat.mobShield
                me.collisionFilter.mask = cat.bullet;
                for (let i = 0; i < nodes; ++i) {
                    mob[mob.length - i - 2].isShielded = true;
                    //constrain to all mob nodes in group
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: mob[mob.length - i - 2],
                        stiffness: stiffness,
                        damping: 0.1
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);
                }
                me.onDamage = function () {
                    this.alertNearByMobs(); //makes sure the mob that owns the shield can tell when damage is done
                    this.fill = `rgba(255,255,255,${0.3 + 0.6 * this.health})`
                };
                me.onDeath = function () {
                    //clear isShielded status from target
                    for (let j = 0; j < targets.length; j++) {
                        for (let i = 0, len = mob.length; i < len; i++) {
                            if (mob[i].id === targets[j]) mob[i].isShielded = false;
                        }
                    }
                };
                me.leaveBody = false;
                me.isDropPowerUp = false;
                me.showHealthBar = false;
                mob[mob.length - 1] = mob[mob.length - 1 - nodes];
                mob[mob.length - 1 - nodes] = me;
                me.do = function () {
                    this.checkStatus();
                };
            },
            slasher2(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
                mobs.spawn(x, y, 6, radius, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.0009 * simulation.accelScale;
                me.torqueMagnitude = 0.000012 * me.inertia //* (Math.random() > 0.5 ? -1 : 1);
                me.frictionStatic = 0;
                me.friction = 0;
                me.frictionAir = 0.035;
                me.delay = 140 * simulation.CDScale;
                me.cd = 0;
                me.swordRadius = 0;
                me.swordVertex = 1
                me.swordRadiusMax = 275 + 3.5 * simulation.difficulty;
                me.swordRadiusGrowRate = me.swordRadiusMax * (0.011 + 0.0002 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.03 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                const seeDistance2 = 200000
                ace.shield(me, x, y);
                me.onDamage = function () { };
                me.do = function () {
                    this.checkStatus();
                    this.seePlayerByHistory(15);
                    this.attraction();
                    this.sword() //does various things depending on what stage of the sword swing
                };
                me.swordWaiting = function () {
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        this.laserAngle = -Math.PI / 6
                        this.sword = this.swordGrow
                        this.accelMag = 0
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    this.laserSword(this.vertices[0], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[1], this.angle + this.laserAngle + (Math.PI / 3));
                    this.laserSword(this.vertices[2], this.angle + this.laserAngle + (Math.PI * 2 / 3));
                    this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);
                    this.laserSword(this.vertices[4], this.angle + this.laserAngle + (Math.PI * 4 / 3));
                    this.laserSword(this.vertices[5], this.angle + this.laserAngle + (Math.PI * 5 / 3));
                    this.swordRadius += this.swordRadiusGrowRate
                    if (this.swordRadius > this.swordRadiusMax || this.isStunned) {
                        this.sword = this.swordSlash
                        this.spinCount = 0
                    }
                }
                me.swordSlash = function () {
                    this.laserSword(this.vertices[0], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[1], this.angle + this.laserAngle + (Math.PI / 3));
                    this.laserSword(this.vertices[2], this.angle + this.laserAngle + (Math.PI * 2 / 3));
                    this.laserSword(this.vertices[3], this.angle + this.laserAngle + Math.PI);
                    this.laserSword(this.vertices[4], this.angle + this.laserAngle + (Math.PI * 4 / 3));
                    this.laserSword(this.vertices[5], this.angle + this.laserAngle + (Math.PI * 5 / 3));

                    this.torque += this.torqueMagnitude;
                    this.spinCount++
                    if (this.spinCount > 100 || this.isStunned) {
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.accelMag = 0.001 * simulation.accelScale;
                        this.cd = simulation.cycle + this.delay;
                    }
                }
                me.laserSword = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                        m.takeDamage(this.swordDamage);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: this.swordDamage * 1500,
                            color: "rgba(80,0,255,0.5)",
                            time: 20
                        });
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // 0 path
                    ctx.lineWidth = 15;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // 0 path
                    ctx.lineWidth = 4;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
            },
            slasher3(x, y, radius = 33 + Math.ceil(Math.random() * 30)) {
                const sides = 6
                mobs.spawn(x, y, sides, radius, "rgb(0,0,0)");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.0005 * simulation.accelScale;
                me.frictionStatic = 0;
                me.friction = 0;
                me.frictionAir = 0.02;
                me.delay = 150 * simulation.CDScale;
                me.cd = 0;
                me.cycle = 0;
                me.swordVertex = 1
                me.swordRadiusInitial = radius / 2;
                me.swordRadius = me.swordRadiusInitial;
                me.swordRadiusMax = 750 + 6 * simulation.difficulty;
                me.swordRadiusGrowRateInitial = 1.08
                me.swordRadiusGrowRate = me.swordRadiusGrowRateInitial//me.swordRadiusMax * (0.009 + 0.0002 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.04 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                const seeDistance2 = me.swordRadiusMax * me.swordRadiusMax
                ace.shield(me, x, y);
                me.onDamage = function () { };
                me.do = function () {
                    this.checkStatus();
                    this.seePlayerByHistory(15);
                    this.sword() //does various things depending on what stage of the sword swing
                };
                me.swordWaiting = function () {
                    this.attraction();
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        //find vertex closest to the player
                        let dist = Infinity
                        for (let i = 0, len = this.vertices.length; i < len; i++) {
                            const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                            if (D < dist) {
                                dist = D
                                this.swordVertex = i
                            }
                        }
                        this.laserAngle = this.swordVertex / sides * 2 * Math.PI + Math.PI / sides
                        this.sword = this.swordGrow
                        this.cycle = 0
                        this.swordRadius = this.swordRadiusInitial
                        //slow velocity but don't stop
                        Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.5))
                        //set angular velocity to 50%
                        // Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.5)
                        //gently rotate towards the player with a torque, use cross product to decided clockwise or counterclockwise
                        const laserStartVector = Vector.sub(this.position, this.vertices[this.swordVertex])
                        const playerVector = Vector.sub(this.position, m.pos)
                        const cross = Matter.Vector.cross(laserStartVector, playerVector)
                        this.torque = 0.00002 * this.inertia * (cross > 0 ? 1 : -1)
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSpear(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSpear(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSpear(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))

                    Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.9))
                    // this.swordRadius += this.swordRadiusGrowRate
                    this.cycle++
                    // this.swordRadius = this.swordRadiusMax * Math.sin(this.cycle * 0.03)
                    this.swordRadius *= this.swordRadiusGrowRate

                    if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial
                    // if (this.swordRadius > this.swordRadiusMax) this.swordRadiusGrowRate = -Math.abs(this.swordRadiusGrowRate)
                    if (this.swordRadius < this.swordRadiusInitial || this.isStunned) {
                        // this.swordRadiusGrowRate = Math.abs(this.swordRadiusGrowRate)
                        this.swordRadiusGrowRate = this.swordRadiusGrowRateInitial
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.cd = simulation.cycle + this.delay;
                    }
                }
                me.laserSpear = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead)) {
                        this.swordRadiusGrowRate = 1 / this.swordRadiusGrowRateInitial //!!!! this retracts the sword if it hits the player

                        if (m.immuneCycle < m.cycle) {
                            m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                            m.takeDamage(this.swordDamage);
                            simulation.drawList.push({ //add dmg to draw queue
                                x: best.x,
                                y: best.y,
                                radius: this.swordDamage * 1500,
                                color: "rgba(80,0,255,0.5)",
                                time: 20
                            });
                        }
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // 0 path
                    ctx.lineWidth = 15;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // 0 path
                    ctx.lineWidth = 4;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
            },
            stabber(x, y, radius = 25 + Math.ceil(Math.random() * 12), spikeMax = 7) {
                if (radius > 80) radius = 65;
                mobs.spawn(x, y, 6, radius, "rgb(0,0,0)"); //can't have sides above 6 or collision events don't work (probably because of a convex problem)
                let me = mob[mob.length - 1];
                me.isVerticesChange = true
                me.accelMag = 0.0006 * simulation.accelScale;
                // me.g = 0.0002; //required if using this.gravity
                me.isInvulnerable = false
                me.delay = 360 * simulation.CDScale;
                me.spikeVertex = 0;
                me.spikeLength = 0;
                me.isSpikeGrowing = false;
                me.spikeGrowth = 0;
                me.isSpikeReset = true;
                me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.player //can't touch other mobs
                Matter.Body.rotate(me, Math.PI * 0.1);
                ace.shield(me, x, y);
                // me.onDamage = function () {};
                // me.onHit = function() { //run this function on hitting player
                // };
                me.onDeath = function () {
                    if (this.spikeLength > 4) {
                        this.spikeLength = 4
                        const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), this.radius * this.spikeLength)
                        this.vertices[this.spikeVertex].x = this.position.x + spike.x
                        this.vertices[this.spikeVertex].y = this.position.y + spike.y
                        // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
                    }
                };
                me.do = function () {
                    this.seePlayerByLookingAt();
                    this.checkStatus();
                    this.attraction();
                    if (this.isSpikeReset) {
                        if (this.seePlayer.recall) {
                            const dist = Vector.sub(this.seePlayer.position, this.position);
                            const distMag = Vector.magnitude(dist);
                            if (distMag < radius * spikeMax) {
                                //find nearest vertex
                                let nearestDistance = Infinity
                                for (let i = 0, len = this.vertices.length; i < len; i++) {
                                    //find distance to player for each vertex
                                    const dist = Vector.sub(this.seePlayer.position, this.vertices[i]);
                                    const distMag = Vector.magnitude(dist);
                                    //save the closest distance
                                    if (distMag < nearestDistance) {
                                        this.spikeVertex = i
                                        nearestDistance = distMag
                                    }
                                }
                                this.spikeLength = 1
                                this.isSpikeGrowing = true;
                                this.isSpikeReset = false;
                                Matter.Body.setAngularVelocity(this, 0)
                            }
                            me.isInvulnerable = false
                        }
                    } else {
                        if (this.isSpikeGrowing) {
                            this.spikeLength += Math.pow(this.spikeGrowth += 0.02, 8)
                            // if (this.spikeLength < 2) {
                            //     this.spikeLength += 0.035
                            // } else {
                            //     this.spikeLength += 1
                            // }
                            if (this.spikeLength > spikeMax) {
                                this.isSpikeGrowing = false;
                                this.spikeGrowth = 0
                            }
                        } else {
                            Matter.Body.setAngularVelocity(this, this.angularVelocity * 0.8) //reduce rotation
                            this.spikeLength -= 0.3
                            if (this.spikeLength < 1) {
                                this.spikeLength = 1
                                this.isSpikeReset = true
                                this.radius = radius
                            }
                        }
                        const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[this.spikeVertex], this.position)), radius * this.spikeLength)
                        this.vertices[this.spikeVertex].x = this.position.x + spike.x
                        this.vertices[this.spikeVertex].y = this.position.y + spike.y
                        me.isInvulnerable = true
                        // this.radius = radius * this.spikeLength;
                    }
                    if (this.isInvulnerable) {
                        ctx.beginPath();
                        let vertices = this.vertices;
                        ctx.moveTo(vertices[0].x, vertices[0].y);
                        for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                        ctx.lineTo(vertices[0].x, vertices[0].y);
                        ctx.lineWidth = 13 + 5 * Math.random();
                        ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                        ctx.stroke();
                        me.damageReduction = 0;
                    } else {
                        me.damageReduction = 1;
                    }
                };
            },
            slash(x, y, radius = 80) {
                let targets = []
                const sides = 6;
                mobs.spawn(x, y, 6, radius, "#000000");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                targets.push(me.id) //add to shield protection
                const nodeBalance = Math.random()
                const nodes2 = Math.min(15, Math.floor(2 + 4 * nodeBalance + 0.75 * Math.sqrt(simulation.difficulty)))
                me.isBoss = true;
                me.name = "aceBoss2"

                me.isSlashBoss = true;
                me.showHealthBar = false;
                me.damageReduction = 0.1
                me.startingDamageReduction = me.damageReduction
                me.isInvulnerable = false
                me.frictionAir = 0.02
                me.seeAtDistance2 = 1000000;
                me.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                Matter.Body.setDensity(me, 0.0005); //normal is 0.001
                me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map
                me.memory = Infinity;
                me.seePlayerFreq = 20
                me.lockedOn = null;
                me.laserRange = 500;
                me.torqueMagnitude = 0.00024 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
                me.delay = 70 + 70 * simulation.CDScale;
                me.cd = 0;
                me.swordRadius = 0;
                me.swordVertex = 1
                me.swordRadiusMax = 1100 + 20 * simulation.difficulty;
                me.swordRadiusGrowRate = me.swordRadiusMax * (0.005 + 0.0003 * simulation.difficulty)
                me.isSlashing = false;
                me.swordDamage = 0.07 * spawn.dmgToPlayerByLevelsCleared()
                me.laserAngle = 3 * Math.PI / 5
                me.eventHorizon = 550;
                const seeDistance2 = 200000
                ace.shield(me, x, y);
                const rangeInnerVsOuter = Math.random()
                let speed = (0.006 + 0.001 * Math.sqrt(simulation.difficulty)) * ((Math.random() < 0.5) ? 1 : -1)
                let range = radius + 350 + 200 * rangeInnerVsOuter + nodes2 * 7
                for (let i = 0; i < nodes2; i++) ace.orbital(me, range, i / nodes2 * 2 * Math.PI, speed)
                const orbitalIndexes = [] //find indexes for all the current nodes2
                for (let i = 0; i < nodes2; i++) orbitalIndexes.push(mob.length - 1 - i)
                // add orbitals for each orbital
                range = Math.max(60, 100 + 100 * Math.random() - nodes2 * 3 - rangeInnerVsOuter * 80)
                speed = speed * (1.25 + 2 * Math.random())
                const subNodes = Math.max(2, Math.floor(6 - 5 * nodeBalance + 0.5 * Math.sqrt(simulation.difficulty)))
                for (let j = 0; j < nodes2; j++) {
                    for (let i = 0, len = subNodes; i < len; i++) ace.orbital(mob[orbitalIndexes[j]], range, i / len * 2 * Math.PI, speed)
                }
                for (let i = 0, len = 3 + 0.5 * Math.sqrt(simulation.difficulty); i < len; i++) ace.spawnOrbitals(me, radius + 40 + 10 * i, 1);

                const springStiffness = 0.00014;
                const springDampening = 0.0005;

                me.springTarget = {
                    x: me.position.x,
                    y: me.position.y
                };
                const len = cons.length;
                cons[len] = Constraint.create({
                    pointA: me.springTarget,
                    bodyB: me,
                    stiffness: springStiffness,
                    damping: springDampening
                });
                Composite.add(engine.world, cons[cons.length - 1]);
                cons[len].length = 100 + 1.5 * radius;
                me.cons = cons[len];

                me.springTarget2 = {
                    x: me.position.x,
                    y: me.position.y
                };
                const len2 = cons.length;
                cons[len2] = Constraint.create({
                    pointA: me.springTarget2,
                    bodyB: me,
                    stiffness: springStiffness,
                    damping: springDampening,
                    length: 0
                });
                Composite.add(engine.world, cons[cons.length - 1]);
                cons[len2].length = 100 + 1.5 * radius;
                me.cons2 = cons[len2];
                me.onDamage = function () { };
                me.onDeath = function () {
                    isDestroyed = true;
                    this.removeCons();
                    powerUps.spawnBossPowerUp(this.position.x, this.position.y);
                };
                me.do = function () {
                    for (let i = 0; i < this.vertices.length; i++) {
                        this.harmField(this.vertices[i].x, this.vertices[i].y);
                    }
                    this.seePlayerByHistory(40);
                    this.springAttack();
                    this.checkStatus();
                    this.sword() //does various things depending on what stage of the sword swing
                    const eventHorizon = this.eventHorizon * (1 + 0.2 * Math.sin(simulation.cycle * 0.008))
                    me.laserRange = eventHorizon;
                };
                me.swordWaiting = function () {
                    if (
                        this.seePlayer.recall &&
                        this.cd < simulation.cycle &&
                        this.distanceToPlayer2() < seeDistance2 &&
                        !m.isCloak &&
                        Matter.Query.ray(map, this.position, this.playerPosRandomY()).length === 0 &&
                        Matter.Query.ray(body, this.position, this.playerPosRandomY()).length === 0
                    ) {
                        //find vertex farthest away from player
                        let dist = 0
                        for (let i = 0, len = this.vertices.length; i < len; i++) {
                            const D = Vector.magnitudeSquared(Vector.sub({ x: this.vertices[i].x, y: this.vertices[i].y }, m.pos))
                            if (D > dist) {
                                dist = D
                                this.swordVertex = i
                            }
                        }
                        this.laserAngle = this.swordVertex / 6 * 2 * Math.PI + 0.6283
                        this.sword = this.swordGrow
                        Matter.Body.setAngularVelocity(this, 0)
                        this.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                        this.damageReduction = 0
                        this.isInvulnerable = true
                        this.frictionAir = 1
                    }
                }
                me.sword = me.swordWaiting //base function that changes during different aspects of the sword swing
                me.swordGrow = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSword(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))
                    this.swordRadius += this.swordRadiusGrowRate
                    if (this.swordRadius > this.swordRadiusMax) {
                        this.sword = this.swordSlash
                        this.spinCount = 0
                    }

                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
                me.swordSlash = function () {
                    const angle = this.angle + this.laserAngle;
                    const end = {
                        x: this.vertices[this.swordVertex].x + this.swordRadiusMax * Math.cos(angle),
                        y: this.vertices[this.swordVertex].y + this.swordRadiusMax * Math.sin(angle)
                    };

                    const dx = end.x - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].x;
                    const dy = end.y - this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1].y;
                    const angle1 = Math.atan2(dy, dx) * (180 / Math.PI);

                    const dx1 = end.x - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].x;
                    const dy1 = end.y - this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1].y;
                    const angle2 = Math.atan2(dy1, dx1) * (180 / Math.PI);

                    this.laserSword(this.vertices[this.swordVertex], this.angle + this.laserAngle);
                    this.laserSword(this.vertices[this.swordVertex + 1 > (sides - 1) ? 0 : this.swordVertex + 1], angle1 * (Math.PI / 180))
                    this.laserSword(this.vertices[this.swordVertex - 1 < 0 ? (sides - 1) : this.swordVertex - 1], angle2 * (Math.PI / 180))
                    this.torque += this.torqueMagnitude;
                    this.spinCount++
                    if (this.spinCount > 80) {
                        this.sword = this.swordWaiting
                        this.swordRadius = 0
                        this.accelMag = 0.0004 + 0.00015 * simulation.accelScale;
                        this.cd = simulation.cycle + this.delay;
                        this.damageReduction = this.startingDamageReduction
                        this.isInvulnerable = false
                        this.frictionAir = 0.01
                    }
                    ctx.beginPath();
                    let vertices = this.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                    ctx.lineWidth = 13 + 5 * Math.random();
                    ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
                    ctx.stroke();
                }
                me.laserSword = function (where, angle) {
                    const vertexCollision = function (v1, v1End, domain) {
                        for (let i = 0; i < domain.length; ++i) {
                            let v = domain[i].vertices;
                            const len = v.length - 1;
                            for (let j = 0; j < len; j++) {
                                results = simulation.checkLineIntersection(v1, v1End, v[j], v[j + 1]);
                                if (results.onLine1 && results.onLine2) {
                                    const dx = v1.x - results.x;
                                    const dy = v1.y - results.y;
                                    const dist2 = dx * dx + dy * dy;
                                    if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[j], v2: v[j + 1] };
                                }
                            }
                            results = simulation.checkLineIntersection(v1, v1End, v[0], v[len]);
                            if (results.onLine1 && results.onLine2) {
                                const dx = v1.x - results.x;
                                const dy = v1.y - results.y;
                                const dist2 = dx * dx + dy * dy;
                                if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: v[0], v2: v[len] };
                            }
                        }
                    };
                    best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                    const look = { x: where.x + this.swordRadius * Math.cos(angle), y: where.y + this.swordRadius * Math.sin(angle) };
                    vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                    vertexCollision(where, look, map);
                    if (!m.isCloak) vertexCollision(where, look, [playerBody, playerHead]);
                    if (best.who && (best.who === playerBody || best.who === playerHead) && m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles + 60 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1); //player is immune to damage for an extra second
                        m.takeDamage(this.swordDamage);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: this.swordDamage * 1500,
                            color: "rgba(0,0,0,0.5)",
                            time: 20
                        });
                    }
                    if (best.dist2 === Infinity) best = look;
                    ctx.beginPath(); //draw beam
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                    ctx.strokeStyle = "rgba(0,0,0,0.1)"; // Black path
                    ctx.lineWidth = 25;
                    ctx.stroke();
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"; // Black path
                    ctx.lineWidth = 5;
                    ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                    ctx.stroke(); // Draw it
                    ctx.setLineDash([]);
                }
                me.harmField = function (x, y) {
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                    // ctx.lineDashOffset = 6*(simulation.cycle % 215);
                    if (this.distanceToPlayer3(x, y) < this.laserRange) {
                        if (m.immuneCycle < m.cycle) {
                            m.takeDamage(0.0003 * spawn.dmgToPlayerByLevelsCleared());
                            if (m.energy > 0.1) m.energy -= 0.003
                        }
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(m.pos.x, m.pos.y);
                        ctx.lineTo(m.pos.x + (Math.random() - 0.5) * 3000, m.pos.y + (Math.random() - 0.5) * 3000);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = "rgb(0,0,0)";
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                        ctx.fillStyle = "rgba(0,0,0,0.15)";
                        ctx.fill();
                    }
                    ctx.beginPath();
                    ctx.arc(x, y, this.laserRange * 0.9, 0, 2 * Math.PI);
                    ctx.strokeStyle = "rgba(0,0,0,0.5)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.fillStyle = "rgba(0,0,0,0.03)";
                    ctx.fill();
                }
                me.distanceToPlayer3 = function (x, y) {
                    const dx = x - player.position.x;
                    const dy = y - player.position.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }
                radius = 22 // radius of each node mob
                const sideLength = 100 // distance between each node mob
                const nodes = 6
                const angle = 2 * Math.PI / nodes

                spawn.allowShields = false; //don't want shields on individual mobs

                for (let i = 0; i < nodes; ++i) {
                    ace.stabber(x + sideLength * Math.sin(i * angle), y + sideLength * Math.cos(i * angle), radius, 12);
                    Matter.Body.setDensity(mob[mob.length - 1], 0.003); //extra dense //normal is 0.001 //makes effective life much larger
                    mob[mob.length - 1].damageReduction = 0.12
                    mob[mob.length - 1].showHealthBar = false;
                    mob[mob.length - 1].isBoss = true;
                    targets.push(mob[mob.length - 1].id) //track who is in the node boss, for shields
                }

                const attachmentStiffness = 0.02
                spawn.constrain2AdjacentMobs(nodes, attachmentStiffness, true); //loop mobs together

                for (let i = 0; i < nodes; ++i) { //attach to center mob
                    consBB[consBB.length] = Constraint.create({
                        bodyA: me,
                        bodyB: mob[mob.length - i - 1],
                        stiffness: attachmentStiffness,
                        damping: 0.03
                    });
                    Composite.add(engine.world, consBB[consBB.length - 1]);
                }
                //spawn shield around all nodes
                ace.groupShield(targets, x, y, sideLength + 1 * radius + nodes * 5 - 25);
                spawn.allowShields = true;
            },
        }
        level.setPosToSpawn(0, -50);
        color.map = "crimson";
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        spawn.mapRect(0, 0, 1, 1);
        level.defaultZoom = 1800;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#d8dadf";
        const isSus = Math.random() < 0.01; //A very lucky person gets rickrolled
        const mediaSource = isSus ? "https://ia801509.us.archive.org/10/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.ogv" : "https://cdn.glitch.me/b559a783-c0cb-4369-92e3-0c0a5556ba01/n-gon%20evangelion%20-%20Made%20with%20Clipchamp%20(8).mp4?v=1692134040246"
        let videoContainer;
        let video = document.createElement("video");
        video.src = mediaSource;
        video.autoPlay = true;
        video.loop = true;
        video.muted = true;
        videoContainer = {
            video: video,
            ready: true,
        };
        if (Math.random() < 0.37) video.play();
        const boost1 = level.boost(8835, -3675, 7500);
        const boost2 = level.boost(-8935, -3675, 7500);
        ace.slash(0, -15000 + 1800);
        function Raindrop(minX, minY, maxX, maxY) {
            this.x = minX + Math.random() * (maxX - minX);
            this.y = minY + Math.random() * (maxY - minY);
            this.speed = Math.random() * 5 + 25;
            this.length = Math.random() * 20 + 30;
        }
        function forceField(x, y, width, height) {
            return {
                min: { x: x, y: y },
                max: { x: x + width, y: y + height },
                width: width,
                height: height,
                maxHeight: height,
                raindrops: [],
                drawRaindrop(drop) {
                    if (Math.sqrt(Math.pow(player.position.x - drop.x, 2) + Math.pow(player.position.y - drop.y, 2)) + Math.PI < 5000) {
                        ctx.beginPath();
                        ctx.moveTo(drop.x, drop.y);
                        ctx.lineTo(drop.x, drop.y + drop.length);
                        ctx.strokeStyle = '#00FFFF';
                        ctx.lineWidth = 10;
                        ctx.lineCap = 'butt';
                        ctx.stroke();
                    }
                },
                updateRaindrop(drop) {
                    drop.y += drop.speed;
                    if ((Matter.Query.ray(map, { x: drop.x, y: drop.y }, { x: drop.x, y: drop.y - drop.length }).length === 0) == false) {
                        simulation.drawList.push({
                            x: drop.x,
                            y: drop.y - drop.length,
                            radius: 10,
                            color: "rgb(0,100,250,0.3)",
                            time: 8
                        });
                        do {
                            drop.y = this.min.y + this.height * Math.random();
                            drop.x = this.min.x + this.width * Math.random();
                        } while (drop.x > this.min.x && drop.x < this.max.x && drop.y > this.min.y && drop.y < this.max.y)
                    }
                },
                isOn: true,
                query() {
                    if (this.isOn) {
                        ctx.fillStyle = `rgba(200, 20, 10, 0.55)`
                        ctx.fillRect(this.min.x, this.min.y, this.width, this.height)
                        if (this.height > 0 && Matter.Query.region([player], this).length) {
                            player.force.y -= 0.015;
                            m.energy = m.maxEnergy;
                        }
                        // if(this.raindrops.length < 300) { // too many (like 900) can cause a little bit of lag minus 5 ~ 10 fps, but it really just depends on your computer
                        //     this.raindrops.push(new Raindrop());
                        // }
                        // for (let i = 0; i < this.raindrops.length; i++) {
                        //     const drop = this.raindrops[i];
                        //     this.drawRaindrop(drop);
                        //     this.updateRaindrop(drop);
                        // }
                    }
                },
            }
        }
        const forceField1 = forceField(-750, -30000, 1500, 20000);
        level.custom = () => {
            if (player.position.y < -20000) {
                level.nextLevel();
            }
            forceField1.query();
            boost1.query();
            boost2.query();
            level.exit.drawAndCheck();
            level.enter.draw();
            ctx.beginPath();
            ctx.strokeStyle = "rgba(220, 20, 10, 0.55)";
            ctx.lineWidth = 1500;
            ctx.lineJoin = "miter"
            ctx.miterLimit = 100;
            ctx.moveTo(map[272].vertices[0].x, map[272].vertices[0].y);
            for (let i = 0; i < map[272].vertices.length; i++) {
                ctx.lineTo(map[272].vertices[i].x, map[272].vertices[i].y);
            }
            ctx.closePath();
            ctx.stroke();
        };
        let checkVid = () => {
            if (simulation.paused && !videoContainer.paused) {
                videoContainer.paused = true;
                video.pause();
            } else if (!simulation.paused && videoContainer.paused) {
                videoContainer.paused = false;
                video.play();
            }
            requestAnimationFrame(checkVid);
        }
        checkVid();
        simulation.ephemera.push({
            name: "vid",
            do() {
                if (level.levels[level.onLevel] !== "crimsonTowers") simulation.removeEphemera(this.name);
                if (mediaSource && !isSus) {
                    ctx.drawImage(videoContainer.video, -1600, -15000, 3200, 1800);
                } else if (mediaSource) {
                    ctx.drawImage(videoContainer.video, -1920 / 2, -15000, 1920, 1080);
                }
            }
        });
        level.customTopLayer = () => {
            ctx.fillStyle = "rgba(220, 20, 10, 0.1)";
            ctx.fillRect(-6725, -3500, 475, 2925);
            ctx.fillRect(-8725, -3700, 450, 2925);
            ctx.fillRect(-4725, -3300, 450, 2925);
            ctx.fillRect(-2725, -3100, 450, 2925);
            ctx.fillRect(-725, -2900, 450, 2925);
            ctx.fillRect(275, -2900, 450, 2925);
            ctx.fillRect(2275, -3100, 450, 2925);
            ctx.fillRect(4275, -3300, 450, 2925);
            ctx.fillRect(6275, -3500, 450, 2925);
            ctx.fillRect(8275, -3700, 450, 2925);
        };
        spawn.mapRect(-10000, 0, 20000, 2000);
        spawn.mapRect(-9050, -3650, 350, 50);
        spawn.mapRect(8700, -3650, 350, 50);
        spawn.mapRect(-275, -2825, 550, 50);
        spawn.mapRect(-225, -500, 450, 50);
        spawn.mapRect(-250, -1575, 500, 50);
        function spawnTower(index, y = 0) {
            const x = index - 1325;
            spawn.mapRect(x + 1025, y + -950, 125, 750);
            spawn.mapRect(x + 1125, y + -225, 50, 50);
            spawn.mapRect(x + 1500, y + -950, 125, 750);
            spawn.mapRect(x + 1475, y + -225, 50, 50);
            spawn.mapRect(x + 1600, y + -225, 50, 50);
            spawn.mapRect(x + 1000, y + -225, 50, 50);
            spawn.mapRect(x + 1475, y + -475, 50, 50);
            spawn.mapRect(x + 1125, y + -750, 50, 50);
            spawn.mapRect(x + 1050, y + -2025, 100, 1125);
            spawn.mapRect(x + 1500, y + -2025, 100, 1125);
            spawn.mapRect(x + 1475, y + -1050, 50, 50);
            spawn.mapRect(x + 1125, y + -1325, 50, 50);
            spawn.mapRect(x + 1475, y + -1550, 50, 50);
            spawn.mapRect(x + 1125, y + -1875, 50, 50);
            spawn.mapRect(x + 1075, y + -2900, 75, 925);
            spawn.mapRect(x + 1500, y + -2900, 75, 925);
            spawn.mapRect(x + 1475, y + -2150, 50, 50);
            spawn.mapRect(x + 1125, y + -2475, 50, 50);
            spawn.mapRect(x + 1475, y + -2800, 50, 50);
            spawn.mapRect(x + 1000, y + -975, 50, 50);
            spawn.mapRect(x + 1025, y + -2050, 50, 50);
            spawn.mapRect(x + 1050, y + -2925, 50, 50);
            spawn.mapRect(x + 1550, y + -2925, 50, 50);
            spawn.mapRect(x + 1600, y + -975, 50, 50);
            spawn.mapRect(x + 1575, y + -2050, 50, 50);
            for (let i = 0; i < 5; i++) {
                if (Math.random() > 0.5) { ace.slasher2(index, y - (i * 500) - 500) } else { ace.slasher3(index, y - (i * 500) - 500) };
            }
        }
        // ace.slash(0, -5000);
        function spawnChain(x, y, x1, y1, length = 39) {
            const angle = Math.atan2(y1 - y, x1 - x);
            chain(x, y, angle, true, length);
        }
        function chain(x, y, angle = 0, isAttached = true, len = 15, radius = 20, stiffness = 1, damping = 1) {
            const gap = 2 * radius
            const unit = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            for (let i = 0; i < len; i++) {
                bullet[bullet.length] = Bodies.polygon(x + gap * unit.x * i, y + gap * unit.y * i, 12, radius, {
                    inertia: Infinity,
                    isNotHoldable: true
                });
                const who = bullet[bullet.length - 1];
                who.do = () => { };
                who.collisionFilter.category = cat.body;
                who.collisionFilter.mask = cat.player | cat.bullet | cat.body | cat.bullet | cat.bullet | cat.bulletBullet
                Composite.add(engine.world, who); //add to world
                who.classType = "bullet"
            }
            for (let i = 1; i < len; i++) {
                consBB[consBB.length] = Constraint.create({
                    bodyA: bullet[bullet.length - i],
                    bodyB: bullet[bullet.length - i - 1],
                    stiffness: stiffness,
                    damping: damping
                });
                Composite.add(engine.world, consBB[consBB.length - 1]);
            }
            cons[cons.length] = Constraint.create({
                pointA: {
                    x: x,
                    y: y
                },
                bodyB: bullet[bullet.length - len],
                stiffness: 1,
                damping: damping
            });
            Composite.add(engine.world, cons[cons.length - 1]);
            if (isAttached) {
                cons[cons.length] = Constraint.create({
                    pointA: {
                        x: x + gap * unit.x * (len - 1),
                        y: y + gap * unit.y * (len - 1)
                    },
                    bodyB: bullet[bullet.length - 1],
                    stiffness: 1,
                    damping: damping
                });
                Composite.add(engine.world, cons[cons.length - 1]);
            }
        }
        spawnChain(-2250, -3100, -750, -2900);
        spawnChain(-4250, -3300, -2750, -3100);
        spawnChain(-6250, -3500, -4750, -3300);
        spawnChain(-8250, -3700, -6750, -3500);
        spawnChain(750, -2900, 2250, -3100);
        spawnChain(2750, -3100, 4250, -3300);
        spawnChain(4750, -3300, 6250, -3500);
        spawnChain(6750, -3500, 8250, -3700);
        // spawnChain(-3000, -30000, -9500, -20400, 291);
        // spawnChain(3000, -30000, 9500, -20400, 291);
        spawnTower(500);
        spawnTower(2500, -200);
        spawn.mapRect(2000, -200, 7000, 300);
        spawnTower(4500, -400);
        spawn.mapRect(4000, -400, 5000, 300);
        spawnTower(6500, -600);
        spawn.mapRect(6000, -600, 5000, 300);
        spawnTower(8500, -800);
        spawn.mapRect(8000, -800, 3000, 300);
        spawnTower(-500);
        spawnTower(-2500, -200);
        spawn.mapRect(-10000, -200, 8000, 300);
        spawnTower(-4500, -400);
        spawn.mapRect(-10000, -400, 6000, 300);
        spawnTower(-6500, -600);
        spawn.mapRect(-10000, -600, 4000, 300);
        spawnTower(-8500, -800);
        spawn.mapRect(-10000, -800, 2000, 300);
        spawn.mapVertex(10000, -9450, "-1000 0 1000 0 1000 -10000 500 -20000 -500 -20000 -1000 -10000");
        spawn.mapVertex(-10000, -9450, "-1000 0 1000 0 1000 -10000 500 -20000 -500 -20000 -1000 -10000");
        spawn.mapRect(-11000, -675, 2000, 2675);
        spawn.mapRect(9000, -675, 2000, 2675);
        spawn.mapVertex(0, -30000, "0 0 3000 -10000 6000 0 3000 10000");
        spawn.mapRect(-8750, -10000, 8000, 100);
        spawn.mapRect(750, -10000, 8000, 100);
        spawn.mapVertex(0, -10020, "-1000 0 -5000 300 5000 300 1000 0");
        spawn.mapRect(-800, -10250, 100, 350);
        spawn.mapRect(700, -10250, 100, 350);
        const a = 200;
        const maxTheta = 10 * Math.PI;
        const spiralX = (theta) => a * theta * Math.cos(theta);
        const spiralY = (theta) => a * theta * Math.sin(theta);
        for (let i = 1; i <= maxTheta; i += 0.2) {
            const x = spiralX(i);
            const y = spiralY(i) + (-15000 + 1800 / 2);
            spawn.mapRect(x, y, 100, 100);
        }
        level.exit.y = map[272].position.y;
        level.exit.x = map[272].position.x;

    },
    LaunchSite() {
        simulation.inGameConsole(`<strong>Launch Site</strong> by <span class='color-var'>Des Boot</span>`);
        simulation.inGameConsole(`The rain stopped...`);
        level.setPosToSpawn(0, -50); //normal spawn
        const elevatortoggle = level.toggle(13650, 3000)
        let newMobsSpawned = false;
        let leverTimer = 0;
        level.exit.x = 11900;
        level.exit.y = -800;
        const boost1 = level.boost(12050, 200, 1000)
        const boost2 = level.boost(13575, 780, 700)
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        const mover = level.mover(5700, 2680, 3800, 25, 10); //x,y,width.height,VxGoal,force

        //spawning debris
        spawn.debris(2700, 2200, 3000, 10); //16 debris per level
        spawn.debris(10055, 483, 1300, 10); //16 debris per level
        spawn.debris(10500, -240, 1000, 10); //16 debris per level
        spawn.debris(9500, 1773.3, 3700, 10); //16 debris per level

        // color.map = "#444" //custom map color
        powerUps.spawn(5400, 850, "heal")
        powerUps.spawn(5400, 850, "heal")
        powerUps.spawn(8650, 2000, "ammo")
        powerUps.spawn(8650, 2000, "ammo")
        powerUps.spawn(8650, 2000, "ammo")
        powerUps.spawn(8650, 2000, "ammo")
        level.custom = () => {

            ctx.fillStyle = `rgba(68, 68, 68)`
            ctx.fillRect(11450, 700, 50, 125);
            ctx.fillRect(11425, 750, 75, 75);
            if (newMobsSpawned) {
                // ctx.fillStyle = `#00FFFF22`;
                ctx.fillStyle = `rgba(0, 255, 255, ${leverTimer / 5})`
                ctx.fillRect(11500, 700, 450, 2375 + 100)
                ctx.fill()
                ctx.fillStyle = `#00f2ff`
                ctx.fillRect(11500 + Math.floor(Math.random() * 450), 700, 5, 2375 + 100)
                ctx.fillRect(11500 + Math.floor(Math.random() * 450), 700, 5, 2375 + 100)
                ctx.fill()

                if (m.pos.x > 11500 && m.pos.x < 11950 && m.pos.y > 800 && m.pos.y < 2700) {
                    player.force.y -= m.mass * simulation.g + (input.down ? 0 : 0.012 * 4);
                }
            }

            //light rain
            ctx.beginPath()
            ctx.fillStyle = "rgba(30,150,117,255)"
            ctx.rect(Math.random() * 1600 - 1500, -5000, Math.random() * 3 + 1.5, 5000)
            ctx.rect(Math.random() * 2400 - 1500, -5000, Math.random() * 3 + 1.5, 5000)
            ctx.rect(Math.random() * 3200 - 1500, -5000, Math.random() * 3 + 1.5, 5000)
            ctx.rect(Math.random() * 3000 - 4500, -5000, Math.random() * 3 + 1.5, 8000)
            ctx.rect(Math.random() * 3000 - 4500, -5000, Math.random() * 3 + 1.5, 8000)
            ctx.rect(Math.random() * 3000 - 4500, -5000, Math.random() * 3 + 1.5, 8000)

            ctx.fill();
            mover.push();
            boost1.query();
            boost2.query();

            elevatortoggle.query();
            if (elevatortoggle.isOn) {
                if (newMobsSpawned == false) {
                    leverTimer += 0.0125;
                    //last room mobs
                    spawn.randomSmallMob(11723.3, -127.5);
                    spawn.randomSmallMob(10525.2, 727.5);
                    spawn.randomSmallMob(11290.5, 556.0);
                    spawn.randomMob(11182.6, 1788.0, 0.8);
                    spawn.randomGroup(10606.7, -248, 0.4);
                    spawn.randomGroup(11066.3, 560.4, 0.4);
                    newMobsSpawned = true;
                }
            };

            if (leverTimer > 0 && leverTimer < 1) {
                leverTimer += 0.0125
            }

            ctx.fillStyle = "rgba(0,0,0,0.3)"
            ctx.beginPath()
            ctx.moveTo(5150, 1050)
            ctx.lineTo(5580, 1480)
            ctx.lineTo(5818, 1203)
            ctx.lineTo(5873.4, 1012.4)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(5150, 1050)
            ctx.lineTo(5580, 1480)
            ctx.lineTo(5818, 1203)
            ctx.lineTo(5873.4, 1012.4)
            ctx.fill()
            ctx.beginPath()
            ctx.moveTo(5700, 2300)
            ctx.lineTo(6100, 2700)
            ctx.lineTo(9600, 2700)
            ctx.lineTo(10000, 2300)
            ctx.fill()
            ctx.fillRect(4400, 2050, 550, 800)
            ctx.fillStyle = "rgba(0,0,0,0.2)"
            ctx.fillRect(4730, 1347, 253, 700)
            ctx.fillRect(4950, 2047, 33, 700)
            ctx.fillRect(11500, 100, 550, 150)
            ctx.moveTo(11800, -700)
            ctx.lineTo(12050, -700)
            ctx.lineTo(12050, -280)
            ctx.lineTo(11950, -280)
            ctx.fill()

            //ladder
            ctx.fillRect(12065, -770, 20, 870)
            ctx.fillRect(12115, -770, 20, 870)
            ctx.fillRect(12055, -770, 90, 15)
            ctx.fillRect(12055, -710, 90, 15)
            ctx.fillRect(12055, -660, 90, 15)
            ctx.fillRect(12055, -600, 90, 15)
            ctx.fillRect(12055, -540, 90, 15)
            ctx.fillRect(12055, -480, 90, 15)
            ctx.fillRect(12055, -420, 90, 15)
            ctx.fillRect(12055, -360, 90, 15)
            ctx.fillRect(12055, -300, 90, 15)
            ctx.fillRect(12055, -240, 90, 15)
            ctx.fillRect(12055, -180, 90, 15)
            ctx.fillRect(12055, -120, 90, 15)
            ctx.fillRect(12055, -60, 90, 15)
            ctx.fillRect(12055, 0, 90, 15)
            ctx.fillRect(12055, 60, 90, 15)

            //post rocket shadows
            ctx.fillStyle = "rgba(0,0,0,0.3)"
            ctx.fillRect(10000, 510, 50, 700)

            //general background shadows
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(9500, -800, 5000, 3100)
            ctx.fillRect(10000, 2300, 5000, 700)
            ctx.moveTo(10000, 2300)
            ctx.lineTo(10000, 2700)
            ctx.lineTo(9600, 2700)
            ctx.fill()
            ctx.moveTo(2500, 500)
            ctx.lineTo(3660, 1660)
            ctx.lineTo(4291.1, 2978.1)
            ctx.lineTo(6100, 2700)
            ctx.lineTo(5700, 2300)
            ctx.lineTo(5884.8, 380.1)
            ctx.fill()

            //boss room shadow
            ctx.fillRect(11950, 2000, 5000, 1100)
            ctx.fillRect(12150, -25, 3000, 250)
            ctx.fillRect(12000, 225, 3000, 750)
            ctx.fillRect(11700, -1200, 600, 400)
            level.exit.drawAndCheck();

            level.enter.draw();
        }

        level.customTopLayer = () => {
            if (12150 < m.pos.x && m.pos.y < 1000) {
                ctx.fillStyle = `rgba(68, 68, 68, ${Math.max(0.3, Math.min((12350 - m.pos.x) / 100, 0.99))})`
            } else {
                ctx.fillStyle = `rgba(68, 68, 68, 68)`
            }

            ctx.fillRect(12150, -30, 1600, 1000)
            mover.draw();

            //vanishing platform
            vanisher.query();

            //rocket
            ctx.fillStyle = "rgba(202,88,0,1)"
            ctx.fillRect(6800, -1000, 600, 2800)
            ctx.beginPath()
            ctx.moveTo(7400, -998)//base right
            ctx.lineTo(7350, -1400)//1/3rd up
            ctx.lineTo(7250, -1700)//2/3rd up
            ctx.lineTo(7100, -1900)//peak
            ctx.lineTo(6950, -1700)//2/3rd down
            ctx.lineTo(6850, -1400)//1/3rd down
            ctx.lineTo(6800, -998)//baseleft
            ctx.fill()


            ctx.fillStyle = "rgba(255,255,255,1)"
            ctx.fillRect(6900, 0, 400, 2000)
            ctx.fillRect(6800, 1700, 600, 300)
            ctx.fillRect(6450, -400, 250, 2100)
            ctx.fillRect(7500, -400, 250, 2100)

            //right engine
            ctx.beginPath()
            ctx.moveTo(6450, -398)//base right
            ctx.lineTo(6575, -900)//peak
            ctx.lineTo(6700, -398)//baseleft
            ctx.fill()

            //right engine
            ctx.beginPath()
            ctx.moveTo(7500, -398)//base right
            ctx.lineTo(7625, -900)//peak
            ctx.lineTo(7750, -398)//baseleft
            ctx.fill()

            //right wing
            ctx.beginPath()
            ctx.moveTo(6910, 450)
            ctx.lineTo(6910, 1710)
            ctx.lineTo(6250, 1700)
            ctx.lineTo(6250, 1600)
            ctx.lineTo(6780, 1030)
            ctx.fill()

            //left wing
            ctx.beginPath()
            ctx.moveTo((7100 - 6910) + 7100, 450)
            ctx.lineTo((7100 - 6910) + 7100, 1710)
            ctx.lineTo((7100 - 6250) + 7100, 1700)
            ctx.lineTo((7100 - 6250) + 7100, 1600)
            ctx.lineTo((7100 - 6780) + 7100, 1030)
            ctx.fill()

            //main rocket tip
            ctx.beginPath()
            ctx.moveTo(7300, 2)//base right
            ctx.lineTo(7250, -300)//1/3rd up
            ctx.lineTo(7175, -500)//2/3rd up
            ctx.lineTo(7100, -600)//peak
            ctx.lineTo(7025, -500)//2/3rd down
            ctx.lineTo(6950, -300)//1/3rd down
            ctx.lineTo(6900, 2)//baseleft
            ctx.fill()

            //right wing outline
            ctx.fillStyle = "rgba(0,0,0,1)"
            ctx.beginPath()
            ctx.moveTo((7100 - 6250) + 7100, 1700)
            ctx.lineTo((7100 - 6250) + 7100, 1600)
            ctx.lineTo((7100 - 6780) + 7100, 1030)
            ctx.lineTo((7100 - 6800) + 7100, 918)
            ctx.lineTo((7100 - 6800) + 7100, 1030)
            ctx.lineTo((7100 - 6290) + 7100, 1600)
            ctx.fill()

            //left wing outline
            ctx.beginPath()
            ctx.moveTo(6250, 1700)
            ctx.lineTo(6250, 1600)
            ctx.lineTo(6780, 1030)
            ctx.lineTo(6800, 918)
            ctx.lineTo(6800, 1030)
            ctx.lineTo(6290, 1600)
            ctx.fill()
            ctx.fillRect(6800, 2000, 600, 50)
            ctx.fillRect(6850, 2050, 500, 150)



            //light
            if (elevatortoggle.isOn) {
                ctx.fillStyle = `rgba(242, 255, 0, ${3 * Math.sqrt(leverTimer) / 10})`
                ctx.beginPath()
                ctx.moveTo(13070, 2012)
                ctx.lineTo(12930, 2012)
                ctx.lineTo(12230, 2700)
                ctx.lineTo(13770, 2700)
                ctx.fill()
            }

            //shadows
            ctx.fillStyle = "rgba(0,0,0,0.3)"
            ctx.beginPath()
            ctx.moveTo(1800, -400)
            ctx.lineTo(2500, 300)
            ctx.lineTo(2854, 21)
            ctx.lineTo(1974.5, -453.5)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(1800, 0)
            ctx.lineTo(3460, 1660)
            ctx.lineTo(1522.9, 2431.8)
            ctx.lineTo(983.5, 887.3)
            ctx.fill()
        };

        //GEOMETRY

        //vanishing platform
        var vanisher = level.vanish(10250, 201, 500, 20);

        //blocks
        spawn.bodyRect(3700, 1210, 200, 300, 0.9);
        spawn.bodyRect(3900, 1210, 220, 150, 0.9);

        //main ground
        spawn.mapRect(-1500, 0, 3300, 3700);
        spawn.mapRect(-1500, 2700, 15000, 700);
        spawn.mapRect(9500, -1500, 2000, 800);
        spawn.mapRect(9500, -1500, 500, 2300);


        spawn.mapRect(2500, 0, 3200, 500);
        spawn.mapRect(5700, 0, 500, 2300);
        spawn.mapRect(1800, 1100, 800, 2600);
        spawn.mapRect(2600, 1660, 1800, 2040);
        spawn.mapRect(1800, -495, 200, 100);
        spawn.mapVertex(2400, -230, "0 10  900 510  800 510  750 510  0 110");

        //stairs
        spawn.mapRect(2600, 1150, 50, 550);
        spawn.mapRect(2650, 1200, 50, 500);
        spawn.mapRect(2700, 1250, 50, 450);
        spawn.mapRect(2750, 1300, 50, 400);
        spawn.mapRect(2800, 1350, 50, 350);
        spawn.mapRect(2850, 1400, 50, 300);
        spawn.mapRect(2900, 1450, 50, 250);
        spawn.mapRect(2950, 1500, 50, 200);
        spawn.mapRect(3000, 1550, 50, 150);
        spawn.mapRect(3050, 1600, 50, 100);
        spawn.mapRect(12100, 1650, 50, 50);

        //platforms in first room
        spawn.mapRect(4435, 1300, 550, 50);
        spawn.mapRect(4685, 1300, 50, 550);
        spawn.mapRect(4400, 2000, 550, 50);
        spawn.mapRect(5150, 1000, 550, 50);
        spawn.mapVertex(5500, 1550, "0 0  -500 600  100 0  -400 600");

        //second room
        spawn.mapRect(8000, 0, 1500, 2300);
        spawn.mapRect(6200, 2200, 1800, 100);

        //stairs after rocket
        spawn.mapRect(10300, 2650, 1000, 50);
        spawn.mapRect(10350, 2600, 950, 50);
        spawn.mapRect(10400, 2550, 900, 50);
        spawn.mapRect(10450, 2500, 850, 50);
        spawn.mapRect(10500, 2450, 800, 50);
        spawn.mapRect(10550, 2400, 750, 50);
        spawn.mapRect(10600, 2350, 700, 50);
        spawn.mapRect(10650, 2300, 650, 50);
        spawn.mapRect(10700, 2250, 600, 50);
        spawn.mapRect(10750, 2200, 550, 50);
        spawn.mapRect(10800, 2150, 500, 50);
        spawn.mapRect(10850, 2100, 450, 50);
        spawn.mapRect(10900, 2050, 400, 50);
        spawn.mapRect(10950, 2000, 550, 700);

        //light
        spawn.mapRect(12925, 2000, 150, 12);

        //roof over stairs
        spawn.mapRect(9500, 1200, 1000, 500);
        spawn.mapRect(9500, 2200, 500, 100);
        spawn.mapRect(9500, 800, 2000, 400);
        spawn.mapRect(11950, 800, 2000, 1200);
        spawn.mapRect(13900, 800, 2000, 2600);
        spawn.mapRect(11950, 2000, 150, 400);

        //last room
        spawn.mapRect(10500, 200, 3000, 80);
        spawn.mapRect(11950, 200, 100, 1000);
        spawn.mapRect(10000, 435, 50, 75);
        spawn.mapRect(11000, -50, 60, 250);
        spawn.mapRect(11500, -1500, 60, 1100);
        spawn.mapRect(11500, 50, 500, 50);
        spawn.mapRect(12000, 260, 155, 1000);

        //exit room
        spawn.mapRect(11500, -1500, 300, 800);
        spawn.mapRect(11950, -280, 100, 380);
        spawn.mapRect(12150, -1500, 100, 1600);
        spawn.mapRect(11800, -770, 250, 70);
        spawn.mapRect(11800, -1500, 350, 400);
        spawn.mapRect(12150, -1500, 3000, 1500);
        spawn.mapRect(13700, 0, 2000, 800);
        spawn.mapRect(13200, 550, 50, 300);

        //MOBS


        //mobs in first room
        spawn.randomSmallMob(4700, 2500);
        spawn.randomMob(4100, 1000, 0.8);
        spawn.randomGroup(5000, 700, 0.4);

        //second room mobs
        spawn.randomSmallMob(9800, 2000);
        spawn.randomMob(10910.6, 1559.8, 0.8);
        spawn.randomMob(12441.5, 2340.6, 0.8);
        spawn.randomMob(11182.6, 1788.0, 0.8);
        spawn.randomMob(13381.7, 2437.2, 0.8);
        spawn.randomGroup(10472.4, 2079.0, 0.4);

        //boss room
        spawn.randomLevelBoss(12786, 2461, ["launcherBoss", "laserTargetingBoss", "blinkBoss", "streamBoss", "historyBoss", "grenadierBoss", "blockBoss", "revolutionBoss", "slashBoss"]);
        spawn.mapRect(13500, 3000, 500, 400);
        spawn.mapRect(13500, 2700, 325, 60);

        //extra boss
        spawn.randomLevelBoss(12808.8, 527.0, ["blinkBoss"]);
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