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
    level.customTopLayer = () => {};
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
    spawn.mapRect(650, -1850, 1000, 25); //ending platform
    spawn.mapRect(625, -1850, 25, 25);
    spawn.mapRect(-500, -1425, 50, 150);
    spawn.mapRect(1650, -1925, 25, 100); //to keep reward from falling off map
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
    level.customTopLayer = () => {};
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
  congregation() {
     simulation.inGameConsole(`<strong>congregation</strong> adaptation by <em>R3d5t0n3GUY</em>
            <br>WORK IN PROGRESS`)
    level.setPosToSpawn(0, -100); //normal spawn
    level.exit.x = 1500;
    level.exit.y = 0;
    simulation.fallHeight = 1500
    spawn.physicsBodyFromShape(level.enter.x + 120, level.enter.y + 172.5, "0 0 250 0 250 250 0 250", {
      isNotHoldable: true,
      isInvulnerable: true,
      inertia: Infinity,
      isStatic: true,
      density: 0.01,
      style: {
        fillStyle: "#ff5f00",
        lineWidth: 25,
        strokeStyle: "#f73",
        lineJoin: "bevel",
        composition: {
          strokeStyle: "lighter"
        }
      }
    }) //starting block
    spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
    level.defaultZoom = 1800
    simulation.zoomTransition(level.defaultZoom)
    document.body.style.backgroundColor = "#d8dadf";
    // color.map = "#444" //custom map color

    level.custom = () => {
      level.exit.drawAndCheck();

      level.enter.draw();
    };
    level.customTopLayer = () => {};
    spawn.physicsBodyFromShape(600, -100, "0 0 -400 200 0 200", {
      restitution: 0.1,
      isNotHoldable: true,
      isInvulnerable: true,
      inertia: Infinity,
      isStatic: true,
      friction: 0.1,
      density: 0.01,
      style: {
        fillStyle: "#c70"
      }
    })
  },
  arena() {
    simulation.inGameConsole(`<strong>arena</strong> by <span class='color-var'>Whyisthisnotavalable</span>
      <br>made for n-scythe`)
    let genisis, genisisJumpSensor, genisisBody, genisisHead, genisisHeadSensor, genisisBodySensor;
    let control = {
      left: false,
      right: false,
      up: false,
      down: false
    };
    const g = {
      spawn() {
        //load genisis in matter.js physic engine
        // let vector = Vertices.fromPath("0 40  50 40   50 115   0 115   30 130   20 130"); //genisis as a series of vertices
        let vertices = Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"); //genisis as a series of vertices
        genisisBody = Bodies.fromVertices(0, 0, vertices);
        genisisJumpSensor = Bodies.rectangle(0, 46, 36, 6, {
          //this sensor check if the genisis is on the ground to enable jumping
          sleepThreshold: 99999999999,
          isSensor: true
        });
        vertices = Vertices.fromPath("16 -82  2 -66  2 -37  43 -37  43 -66  30 -82");
        genisisHead = Bodies.fromVertices(0, -55, vertices); //this part of the genisis lowers on crouch
        genisisHeadSensor = Bodies.rectangle(0, -57, 48, 45, {
          //senses if the genisis's head is empty and can return after crouching
          sleepThreshold: 99999999999,
          isSensor: true
        });
        genisisBodySensor = Bodies.rectangle(0, 0, 70, 45, {
          sleepThreshold: 99999999999,
          isSensor: true
        });
        genisis = Body.create({
          //combine genisisJumpSensor and genisisBody
          parts: [genisisBody, genisisHead, genisisJumpSensor, genisisHeadSensor, genisisBodySensor],
          inertia: Infinity, //prevents genisis rotation
          friction: 0.002,
          frictionAir: 0.001,
          //frictionStatic: 0.5,
          restitution: 0,
          sleepThreshold: Infinity,
          collisionFilter: {
            group: 0,
            category: cat.mob,
            mask: cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield | cat.player | cat.bullet
          },
          // death() {
          //     g.death();
          // }
        });
        Matter.Body.setMass(genisis, g.mass);
        Composite.add(engine.world, [genisis]);
      },
      health: 1000,
      maxHealth: 1000, //set in simulation.reset()
      cycle: 600, //starts at 600 cycles instead of 0 to prevent bugs with g.history
      lastKillCycle: 0,
      lastHarmCycle: 0,
      width: 50,
      radius: 30,
      eyeFillColor: null,
      fillColor: null, //set by setFillColors
      fillColorDark: null, //set by setFillColors
      bodyGradient: null, //set by setFillColors
      color: {
        hue: 0,
        sat: 0,
        light: 50,
      },
      setFillColors() {
        g.fillColor = `hsl(${g.color.hue},${g.color.sat}%,${g.color.light}%)`
        g.fillColorDark = `hsl(${g.color.hue},${g.color.sat}%,${g.color.light - 25}%)`
        let grd = ctx.createLinearGradient(-30, 0, 30, 0);
        grd.addColorStop(0, g.fillColorDark);
        grd.addColorStop(1, g.fillColor);
        g.bodyGradient = grd
      },
      setFillColorsAlpha(alpha = 0.5) {
        g.fillColor = `hsla(${g.color.hue},${g.color.sat}%,${g.color.light}%,${alpha})`
        g.fillColorDark = `hsla(${g.color.hue},${g.color.sat}%,${g.color.light - 25}%,${alpha})`
        let grd = ctx.createLinearGradient(-30, 0, 30, 0);
        grd.addColorStop(0, g.fillColorDark);
        grd.addColorStop(1, g.fillColor);
        g.bodyGradient = grd
      },
      height: 42,
      yOffWhen: {
        crouch: 22,
        stand: 49,
        jump: 70
      },
      defaultMass: 5,
      mass: 5,
      FxNotHolding: 0.015,
      Fx: 0.016, //run Force on ground //
      jumpForce: 0.64,
      setMovement() {
        // g.Fx = 0.08 / mass * tech.squirrelFx 
        // g.FxAir = 0.4 / mass / mass 
        g.Fx = tech.baseFx * g.fieldFx * tech.squirrelFx * (tech.isFastTime ? 1.5 : 1) / genisis.mass //base genisis mass is 5
        g.jumpForce = tech.baseJumpForce * g.fieldJump * tech.squirrelJump * (tech.isFastTime ? 1.13 : 1) / genisis.mass / genisis.mass //base genisis mass is 5
      },
      FxAir: 0.032, // 0.4/5/5  run Force in Air
      yOff: 70,
      yOffGoal: 70,
      onGround: false, //checks if on ground or in air
      lastOnGroundCycle: 0, //use to calculate coyote time
      standingOn: undefined,
      numTouching: 0,
      crouch: false,
      // isHeadClear: true,
      spawnPos: {
        x: 0,
        y: 0
      },
      spawnVel: {
        x: 0,
        y: 0
      },
      pos: {
        x: 0,
        y: 0
      },
      yPosDifference: 24.2859, //genisis.position.y - g.pos.y  //24.285923217549026
      // yPosDifferenceCrouched: -2.7140767824453604,
      Sy: 0, //adds a smoothing effect to vertical only
      Vx: 0,
      Vy: 0,
      friction: {
        ground: 0.01,
        air: 0.0025
      },
      airSpeedLimit: 125, // 125/mass/mass = 5
      angle: 0,
      walk_cycle: 0,
      stepSize: 0,
      flipLegs: -1,
      hip: {
        x: 12,
        y: 24
      },
      knee: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 0
      },
      foot: {
        x: 0,
        y: 0
      },
      legLength1: 55,
      legLength2: 45,
      transX: 0,
      transY: 0,
      history: new Array(600), //[], //tracks the last second of genisis position
      rewindCount: 0, //used with CPT
      resetHistory() {
        const set = {
          position: {
            x: genisis.position.x,
            y: genisis.position.y,
          },
          velocity: {
            x: genisis.velocity.x,
            y: genisis.velocity.y
          },
          yOff: g.yOff,
          angle: g.angle,
          health: g.health,
          energy: g.energy,
          activeGun: b.activeGun
        }
        for (let i = 0; i < 600; i++) { //reset history
          g.history[i] = set
        }
      },
      move() {
        g.pos.x = genisis.position.x;
        g.pos.y = genisisBody.position.y - g.yOff;
        g.Vx = genisis.velocity.x;
        g.Vy = genisis.velocity.y;

        //tracks the last 10s of genisis information
        g.history.splice(g.cycle % 600, 1, {
          position: {
            x: genisis.position.x,
            y: genisis.position.y,
          },
          velocity: {
            x: genisis.velocity.x,
            y: genisis.velocity.y
          },
          yOff: g.yOff,
          angle: g.angle,
          health: g.health,
          energy: g.energy,
          activeGun: b.activeGun
        });
        // const back = 59  // 59 looks at 1 second ago //29 looks at 1/2 a second ago
        // historyIndex = (g.cycle - back) % 600
      },
      targetX: 0,
      targetY: 0,
      transSmoothX: 0,
      transSmoothY: 0,
      lastGroundedPositionY: 0,
      // mouseZoom: 0,
      lookSmoothing: 0.07, //1 is instant jerky,  0.001 is slow smooth zoom, 0.07 is standard
      look() {}, //set to lookDefault()
      lookDefault() {
        g.angle = Math.atan2(
          g.targetY - g.pos.y,
          g.targetX - g.pos.x
        );
        // //smoothed mouse look translations
        const scale = 0.8;
        g.transSmoothX = canvas.width2 - g.pos.x - (simulation.mouse.x - canvas.width2) * scale;
        g.transSmoothY = canvas.height2 - g.pos.y - (simulation.mouse.y - canvas.height2) * scale;

        g.transX += (g.transSmoothX - g.transX) * g.lookSmoothing;
        g.transY += (g.transSmoothY - g.transY) * g.lookSmoothing;
      },
      doCrouch() {
        if (!g.crouch) {
          g.crouch = true;
          g.yOffGoal = g.yOffWhen.crouch;
          if ((genisisHead.position.y - genisis.position.y) < 0) {
            Matter.Body.setPosition(genisisHead, {
              x: genisis.position.x,
              y: genisis.position.y + 9.1740767
            })
          }
        }
      },
      undoCrouch() {
        if (g.crouch) {
          g.crouch = false;
          g.yOffGoal = g.yOffWhen.stand;
          if ((genisisHead.position.y - genisis.position.y) > 0) {
            Matter.Body.setPosition(genisisHead, {
              x: genisis.position.x,
              y: genisis.position.y - 30.28592321
            })
          }
        }
      },
      hardLandCD: 0,
      checkHeadClear() {
        if (Matter.Query.collides(headSensor, map).length > 0) {
          return false
        } else {
          return true
        }
      },
      buttonCD_jump: 0, //cool down for genisis buttons
      jump() {
        // if (!g.onGround) g.lastOnGroundCycle = 0 //g.cycle - tech.coyoteTime
        g.buttonCD_jump = g.cycle + 20; //can't jump again until 20 cycles pass
        //apply a fraction of the jump force to the body the genisis is jumping off of
        Matter.Body.applyForce(g.standingOn, g.pos, {
          x: 0,
          y: g.jumpForce * 0.12 * Math.min(g.standingOn.mass, 5)
        });

        genisis.force.y = -g.jumpForce; //genisis jump force
        Matter.Body.setVelocity(genisis, { //zero genisis y-velocity for consistent jumps
          x: genisis.velocity.x,
          y: Math.max(-10, Math.min(g.standingOn.velocity.y, 10)) //cap velocity contribution from blocks you are standing on to 10 in the vertical
        });
      },
      groundControl() {
        //check for crouch or jump
        if (g.crouch) {
          if (!(control.down) && g.checkHeadClear() && g.hardLandCD < g.cycle) g.undoCrouch();
        } else if (control.down || g.hardLandCD > g.cycle) {
          g.doCrouch(); //on ground && not crouched and pressing s or down
        } else if (control.up && g.buttonCD_jump + 20 < g.cycle && g.yOffWhen.stand > 23) {
          g.jump()
        }
        if (simulation.testing) {
          genisis.force.x = 0;
          genisis.velocity.x = 0;
        } else {
          if (control.left) {
            if (genisis.velocity.x > -2) {
              genisis.force.x -= g.Fx * 1.5
            } else {
              genisis.force.x -= g.Fx
            }
            // }
          } else if (control.right) {
            if (genisis.velocity.x < 2) {
              genisis.force.x += g.Fx * 1.5
            } else {
              genisis.force.x += g.Fx
            }
          } else {
            const stoppingFriction = 0.92; //come to a stop if no move key is pressed
            Matter.Body.setVelocity(genisis, {
              x: genisis.velocity.x * stoppingFriction,
              y: genisis.velocity.y * stoppingFriction
            });
          }
        }
        //come to a stop if fast 
        if (genisis.speed > 4) {
          const stoppingFriction = (g.crouch) ? 0.65 : 0.89; // this controls speed when crouched
          Matter.Body.setVelocity(genisis, {
            x: genisis.velocity.x * stoppingFriction,
            y: genisis.velocity.y * stoppingFriction
          });
        }
      },
      airControl() {
        //check for coyote time jump
        // if (control.up && g.buttonCD_jump + 20 + tech.coyoteTime < g.cycle && g.yOffWhen.stand > 23 && g.lastOnGroundCycle + tech.coyoteTime > g.cycle) g.jump()
        if (control.up && g.buttonCD_jump + 20 < g.cycle && g.yOffWhen.stand > 23 && g.lastOnGroundCycle + 5 > g.cycle) g.jump()

        //check for short jumps   //moving up   //recently pressed jump  //but not pressing jump key now
        if (g.buttonCD_jump + 60 > g.cycle && !(control.up) && g.Vy < 0) {
          Matter.Body.setVelocity(genisis, {
            //reduce genisis y-velocity every cycle
            x: genisis.velocity.x,
            y: genisis.velocity.y * 0.94
          });
        }
        if (simulation.testing) {
          genisis.force.x = 0;
          genisis.velocity.x = 0;
        } else {
          if (control.left) {
            if (genisis.velocity.x > -g.airSpeedLimit / genisis.mass / genisis.mass) genisis.force.x -= g.FxAir; // move genisis   left / a
          } else if (control.right) {
            if (genisis.velocity.x < g.airSpeedLimit / genisis.mass / genisis.mass) genisis.force.x += g.FxAir; //move genisis  right / d
          }
        }
      },
      alive: true,
      defaultFPSCycle: 0, //tracks when to return to normal fps
      immuneCycle: 0, //used in engine
      collisionImmuneCycles: 30,
      buttonCD: 0, //cool down for genisis buttons
      drawLeg(stroke) {
        // if (simulation.mouseInGame.x > g.pos.x) {
        if (g.angle > -Math.PI / 2 && g.angle < Math.PI / 2) {
          g.flipLegs = 1;
        } else {
          g.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(g.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(g.hip.x, g.hip.y);
        ctx.lineTo(g.knee.x, g.knee.y);
        ctx.lineTo(g.foot.x, g.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 7;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(g.foot.x, g.foot.y);
        ctx.lineTo(g.foot.x - 15, g.foot.y + 5);
        ctx.moveTo(g.foot.x, g.foot.y);
        ctx.lineTo(g.foot.x + 15, g.foot.y + 5);
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(g.hip.x, g.hip.y, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(g.knee.x + 7, g.knee.y);
        ctx.arc(g.knee.x, g.knee.y, 7, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(g.foot.x + 6, g.foot.y);
        ctx.arc(g.foot.x, g.foot.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = g.fillColor;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      },
      calcLeg(cycle_offset, offset) {
        g.hip.x = 12 + offset;
        g.hip.y = 24 + offset;
        //stepSize goes to zero if Vx is zero or not on ground (make m transition cleaner)
        g.stepSize = 0.8 * g.stepSize + 0.2 * (7 * Math.sqrt(Math.min(9, Math.abs(g.Vx))) * g.onGround);
        //changes to stepsize are smoothed by adding only a percent of the new value each cycle
        const stepAngle = 0.034 * g.walk_cycle + cycle_offset;
        g.foot.x = 2.2 * g.stepSize * Math.cos(stepAngle) + offset;
        g.foot.y = offset + 1.2 * g.stepSize * Math.sin(stepAngle) + g.yOff + g.height;
        const Ymax = g.yOff + g.height;
        if (g.foot.y > Ymax) g.foot.y = Ymax;

        //calculate knee position as intersection of circle from hip and foot
        const d = Math.sqrt((g.hip.x - g.foot.x) * (g.hip.x - g.foot.x) + (g.hip.y - g.foot.y) * (g.hip.y - g.foot.y));
        const l = (g.legLength1 * g.legLength1 - g.legLength2 * g.legLength2 + d * d) / (2 * d);
        const h = Math.sqrt(g.legLength1 * g.legLength1 - l * l);
        g.knee.x = (l / d) * (g.foot.x - g.hip.x) - (h / d) * (g.foot.y - g.hip.y) + g.hip.x + offset;
        g.knee.y = (l / d) * (g.foot.y - g.hip.y) + (h / d) * (g.foot.x - g.hip.x) + g.hip.y;
      },
      draw() {},
      drawDefault() {
        ctx.fillStyle = g.fillColor;
        g.walk_cycle += g.flipLegs * g.Vx;
        ctx.save();
        ctx.globalAlpha = (g.immuneCycle < g.cycle) ? 1 : 0.5 //|| (g.cycle % 40 > 20)
        ctx.translate(g.pos.x, g.pos.y);
        g.calcLeg(Math.PI, -3);
        g.drawLeg("#FFFFFF");
        g.calcLeg(0, 0);
        g.drawLeg("#FFFFFF");
        ctx.rotate(g.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = g.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        g.yOff = g.yOff * 0.85 + g.yOffGoal * 0.15; //smoothly move leg height towards height goal
      },
      drawDamage() {
        ctx.fillStyle = "red";
        g.walk_cycle += g.flipLegs * g.Vx;
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.translate(g.pos.x, g.pos.y);
        g.calcLeg(Math.PI, -3);
        g.drawLeg("#FF0000");
        g.calcLeg(0, 0);
        g.drawLeg("#FF0000");
        ctx.rotate(g.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = g.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        g.yOff = g.yOff * 0.85 + g.yOffGoal * 0.15; //smoothly move leg height towards height goal
      },
      damage(dmg) {
        g.health -= dmg;
      },
      rebirth() {
        g.health = g.maxHealth;
        genisis.collisionFilter.mask = cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield | cat.player | cat.bullet
      },
      lastHealth: 1000,
      drawHealth() {
        let interpolated = this.lastHealth + (g.health - this.lastHealth) * 0.1;

        ctx.save();
        ctx.setTransform(1, 0, 0.2, 1, 0, 0); //slanted
        ctx.fillStyle = "rgba(250, 100, 100, 0.3)";
        ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2, 30);
        const grad = ctx.createLinearGradient(0, 0, canvas.width2, 0);
        grad.addColorStop(0, "lightblue");
        grad.addColorStop(1, "crimson");

        ctx.fillStyle = grad;
        ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2 * interpolated / 1000, 30);
        ctx.restore();

        this.lastHealth = interpolated;
      },
      genisisOnGroundCheck(event) {
        //runs on collisions events
        function enter() {
          g.numTouching++;
          if (!g.onGround) {
            g.onGround = true;
            if (g.crouch) {
              if (g.checkHeadClear()) {
                g.undoCrouch();
              } else {
                g.yOffGoal = g.yOffWhen.crouch;
              }
            } else {
              //sets a hard land where genisis stays in a crouch for a bit and can't jump
              //crouch is forced in groundControl below
              const momentum = genisis.velocity.y * genisis.mass //genisis mass is 5 so this triggers at 26 down velocity, unless the genisis is holding something
              if (momentum > 130) {
                g.doCrouch();
                g.yOff = g.yOffWhen.jump;
                g.hardLandCD = g.cycle + Math.min(momentum / 6.5 - 6, 40)
                //falling damage
                if (tech.isFallingDamage && g.immuneCycle < g.cycle && momentum > 150) {
                  g.damage(Math.min(Math.sqrt(momentum - 133) * 0.01, 0.25));
                  if (g.immuneCycle < g.cycle + g.collisionImmuneCycles) g.immuneCycle = g.cycle + g.collisionImmuneCycles; //genisis is immune to damage for 30 cycles
                }
              } else {
                g.yOffGoal = g.yOffWhen.stand;
              }
            }
          }
        }
        const pairs = event.pairs;
        for (let i = 0, j = pairs.length; i != j; ++i) {
          let pair = pairs[i];
          if (pair.bodyA === genisisJumpSensor) {
            g.standingOn = pair.bodyB; //keeping track to correctly provide recoil on jump
            if (g.standingOn.alive !== true) enter();
          } else if (pair.bodyB === genisisJumpSensor) {
            g.standingOn = pair.bodyA; //keeping track to correctly provide recoil on jump
            if (g.standingOn.alive !== true) enter();
          }
        }
        g.numTouching = 0;
      },
      genisisOffGroundCheck(event) {
        //runs on collisions events
        const pairs = event.pairs;
        for (let i = 0, j = pairs.length; i != j; ++i) {
          if (pairs[i].bodyA === genisisJumpSensor || pairs[i].bodyB === genisisJumpSensor) {
            if (g.onGround && g.numTouching === 0) {
              g.onGround = false;
              g.lastOnGroundCycle = g.cycle;
              g.hardLandCD = 0 // disable hard landing
              if (g.checkHeadClear()) {
                if (g.crouch) {
                  g.undoCrouch();
                }
                g.yOffGoal = g.yOffWhen.jump;
              }
            }
          }
        }
      }
    };

    function GenisisCollisionChecks(event) {
      const pairs = event.pairs;
      for (let i = 0, j = pairs.length; i != j; i++) {
        for (let k = 0; k < bullet.length; k++) {
          if (pairs[i].bodyA === bullet[k]) {
            collideBullet(pairs[i].bodyB);
            break;
          } else if (pairs[i].bodyB === bullet[k]) {
            collideBullet(pairs[i].bodyA);
            break;
          }

          function collideBullet(obj) {
            if (
              g.immuneCycle < g.cycle &&
              (obj === genisisBody || obj === genisisHead)
            ) {
              let dmg = Math.abs(0.0025 * Math.sqrt((bullet[k].mass + Math.sqrt(Vector.magnitude(bullet[k].velocity)) * 0.00125))) * (bullet[k].dmg || 1);
              //simulation.inGameConsole(dmg);  
              g.damage(dmg);
              return;
            }
          }
        }
        for (let k = 0; k < mob.length; k++) {
          if (mob[k].alive) {
            if (pairs[i].bodyA === mob[k]) {
              collideMob(pairs[i].bodyB);
              break;
            } else if (pairs[i].bodyB === mob[k]) {
              collideMob(pairs[i].bodyA);
              break;
            }

            function collideMob(obj) {
              //genisis + mob collision
              if (
                g.immuneCycle < g.cycle &&
                (obj === genisisBody || obj === genisisHead) &&
                !mob[k].isSlowed && !mob[k].isStunned
              ) {
                let dmg = Math.max(0.025 * Math.sqrt(mob[k].mass), 0.05);
                // if (g.isCloak) dmg *= 0.5
                if (tech.isRewindAvoidDeath && g.energy > 0.85 * Math.min(1, g.maxEnergy) && dmg > 0.01) { //CPT reversal runs in g.damage, but it stops the rest of the collision code here too
                  g.damage(dmg);
                  return
                }
                g.damage(dmg);

                if (tech.isCollisionRealitySwitch && g.alive) {
                  g.switchWorlds()
                  simulation.trails()
                  simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> ${Math.random()}`);
                }
                if (tech.isPiezo) g.energy += 20.48;
                if (tech.isCouplingNoHit && g.coupling > 0) {
                  g.couplingChange(-3)

                  const unit = Vector.rotate({
                    x: 1,
                    y: 0
                  }, 6.28 * Math.random())
                  let where = Vector.add(g.pos, Vector.mult(unit, 17))
                  simulation.drawList.push({ //add dmg to draw queue
                    x: where.x,
                    y: where.y,
                    radius: 22,
                    color: 'rgba(0, 171, 238, 0.33)',
                    time: 8
                  });
                  where = Vector.add(g.pos, Vector.mult(unit, 60))
                  simulation.drawList.push({ //add dmg to draw queue
                    x: where.x,
                    y: where.y,
                    radius: 18,
                    color: 'rgba(0, 171, 238, 0.5)',
                    time: 16
                  });
                  where = Vector.add(g.pos, Vector.mult(unit, 100))
                  simulation.drawList.push({ //add dmg to draw queue
                    x: where.x,
                    y: where.y,
                    radius: 14,
                    color: 'rgba(0, 171, 238, 0.6)',
                    time: 24
                  });
                  where = Vector.add(g.pos, Vector.mult(unit, 135))
                  simulation.drawList.push({ //add dmg to draw queue
                    x: where.x,
                    y: where.y,
                    radius: 10,
                    color: 'rgba(0, 171, 238, 0.7)',
                    time: 32
                  });
                  // simulation.drawList.push({ //add dmg to draw queue
                  //     x: g.pos.x,
                  //     y: g.pos.y,
                  //     radius: 150,
                  //     color: 'rgba(0, 171, 238, 0.33)',
                  //     time: 6
                  // });
                  // simulation.drawList.push({ //add dmg to draw queue
                  //     x: g.pos.x,
                  //     y: g.pos.y,
                  //     radius: 75,
                  //     color: 'rgba(0, 171, 238, 0.5)',
                  //     time: 16
                  // });
                  // simulation.drawList.push({ //add dmg to draw queue
                  //     x: g.pos.x,
                  //     y: g.pos.y,
                  //     radius: 25,
                  //     color: 'rgba(0, 171, 238, 0.75)',
                  //     time: 25
                  // });
                }
                if (mob[k].onHit) mob[k].onHit();
                if (g.immuneCycle < g.cycle + g.collisionImmuneCycles) g.immuneCycle = g.cycle + g.collisionImmuneCycles; //genisis is immune to damage for 30 cycles
                //extra kick between genisis and mob              //this section would be better with forces but they don't work...
                let angle = Math.atan2(genisis.position.y - mob[k].position.y, genisis.position.x - mob[k].position.x);
                Matter.Body.setVelocity(genisis, {
                  x: genisis.velocity.x + 8 * Math.cos(angle),
                  y: genisis.velocity.y + 8 * Math.sin(angle)
                });
                Matter.Body.setVelocity(mob[k], {
                  x: mob[k].velocity.x - 8 * Math.cos(angle),
                  y: mob[k].velocity.y - 8 * Math.sin(angle)
                });

                if (tech.isAnnihilation && !mob[k].shield && !mob[k].isShielded && !mob[k].isBoss && mob[k].isDropPowerUp && g.energy > 0.08 && mob[k].damageReduction > 0) {
                  g.energy -= 0.08 //* Math.max(g.maxEnergy, g.energy) //0.33 * g.energy
                  if (g.immuneCycle === g.cycle + g.collisionImmuneCycles) g.immuneCycle = 0; //genisis doesn't go immune to collision damage
                  mob[k].death();
                  simulation.drawList.push({ //add dmg to draw queue
                    x: pairs[i].activeContacts[0].vertex.x,
                    y: pairs[i].activeContacts[0].vertex.y,
                    radius: Math.sqrt(dmg) * 500,
                    color: "rgba(255,0,255,0.2)",
                    time: simulation.drawTime
                  });
                } else {
                  simulation.drawList.push({ //add dmg to draw queue
                    x: pairs[i].activeContacts[0].vertex.x,
                    y: pairs[i].activeContacts[0].vertex.y,
                    radius: Math.sqrt(dmg) * 200,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                  });
                }
                // return;
                // }
              }
            }
          }
        }
      }
    }
    g.spawn();
    Matter.Body.setPosition(genisis, {
      x: 7875,
      y: -2530
    })
    let isUsingSwordMod = false;
    for (let i = 0; i < tech.tech.length; i++) {
      if (tech.tech[i].name === 'size-weight illusion') { //to detect if the player is using the sword mod so that it won't mess up their mod. The sword mod adds this tech so if it is detected then the sword won't be removed from the gun array //Landgreen, don't add a tech with the same name
        isUsingSwordMod = true;
      }
    }
    if (!isUsingSwordMod) {
      const e = {
        name: "sword",
        descriptionFunction() {
          return `swing a <b>sword</b> that <b style="color: indigo;">lifesteals</b> <strong class='color-h'>health</strong><br>drains <strong class='color-h'>health</strong> instead of ammunition<br>doesn't use <b>ammo</b>`
        },
        ammo: Infinity,
        ammoPack: Infinity,
        defaultAmmoPack: Infinity,
        have: false,
        cycle: 0,
        sword: undefined,
        swordArray: [],
        bladeSegments: undefined,
        bladeTrails: [],
        angle: 0,
        constraint: undefined,
        charge: 0,
        angle2: 0,
        fire() {},
        do() {
          if (this.sword && this.cycle < 1) {
            this.angle2 = Math.atan2(this.sword.position.y - m.pos.y, this.sword.position.x - m.pos.x);
          }
          if (this.sword) {
            this.cycle++;
          }
          this.normalFire();
          this.renderDefault();
          this.collision();
        },
        normalFire() {
          if (this.constraint) {
            this.constraint.pointA = player.position;
          }
          if (tech.isStabSword && !m.crouch && this.cycle > 0 && this.stabStatus) {
            if (this.sword) {
              this.stabStatus = false;
              if (tech.isEnergyHealth) {
                m.energy = 0.01;
                m.immuneCycle = m.cycle + 30 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1);
              }
              this.cycle = 0;
              Matter.Body.setAngularVelocity(this.sword, 0);
              Composite.remove(engine.world, this.sword);
              this.sword.parts.forEach(part => {
                Composite.remove(engine.world, part);
                const index = bullet.indexOf(part);
                if (index !== -1) {
                  bullet.splice(index, 1);
                }
              });
              this.sword = undefined;
              if (this.constraint) {
                Composite.remove(engine.world, this.constraint);
                this.constraint = undefined;
              }
              this.bladeTrails = [];
              m.fireCDcycle = 0;
            }
          }

          if (input.fire && (tech.isEnergyHealth ? m.energy >= 0.11 : m.health >= 0.11)) {
            if (tech.isEnergyHealth) {
              m.energy -= 0.004;
            } else {
              m.health -= 0.001;
              m.displayHealth();
            }
          }
          if (input.fire && (tech.isEnergyHealth ? m.energy >= 0.11 : m.health >= 0.11)) {
            if (!this.sword && b.guns[b.activeGun].name === 'sword') {
              ({
                sword: this.sword,
                bladeSegments: this.bladeSegments
              } = this.createAndSwingSword());
              this.angle = m.angle;
            }
          }
          if (this.sword && !input.fire) {
            this.cycle = 0;
            Matter.Body.setAngularVelocity(this.sword, 0);
            player.force.x *= 0.01;
            player.force.y *= 0.01;
            Composite.remove(engine.world, this.sword);
            this.sword.parts.forEach(part => {
              Composite.remove(engine.world, part);
              const index = bullet.indexOf(part);
              if (index !== -1) {
                bullet.splice(index, 1);
              }
            });
            this.sword = undefined;
            if (this.constraint) {
              Composite.remove(engine.world, this.constraint);
              this.constraint = undefined;
            }
            this.bladeTrails = [];
            m.fireCDcycle = m.cycle + 10;
          } else {
            if (this.sword && (tech.isEnergyHealth ? m.energy >= 0.11 : m.health >= 0.11)) {
              let handle;
              for (let i = 0; i < bullet.length; i++) {
                if (bullet[i].customName == "handle") {
                  handle = bullet[i];
                }
              }
              if (tech.infinityEdge) {
                const newSize = Math.max(0, Math.sqrt(0.5 * m.health) + 1);
                Matter.Body.scale(this.sword, newSize * (1 / (this.sword.scale == undefined ? 1 : this.sword.scale)), newSize * (1 / (this.sword.scale == undefined ? 1 : this.sword.scale)), handle.position);
                this.sword.scale = newSize;
              }
              if (!(this.angle > -Math.PI / 2 && this.angle < Math.PI / 2)) {
                Matter.Body.setAngularVelocity(this.sword, -Math.PI * 0.1);
              } else {
                Matter.Body.setAngularVelocity(this.sword, Math.PI * 0.1);
              }
              if (tech.sizeIllusion) {
                player.force.x += Math.cos(m.angle) * player.mass / 500;
                player.force.y += Math.sin(m.angle) * player.mass / 500;
              }
              if (!this.constraint && (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) {
                this.constraint = Constraint.create({
                  pointA: player.position,
                  bodyB: this.sword,
                  pointB: {
                    x: -9,
                    y: ((handle.position.y - this.sword.position.y))
                  },
                  stiffness: (tech.infinityEdge ? 0.05 : 0.1),
                  damping: 0.001815,
                  length: 0,

                });
                Composite.add(engine.world, this.constraint);
              } else if (!this.constraint) {
                this.constraint = Constraint.create({
                  pointA: player.position,
                  bodyB: this.sword,
                  pointB: {
                    x: 9,
                    y: ((handle.position.y - this.sword.position.y))
                  },
                  stiffness: (tech.infinityEdge ? 0.05 : 0.1),
                  damping: 0.001815,
                  length: 0,
                });
                Composite.add(engine.world, this.constraint);
              }
            } else if (this.sword) {
              if (tech.isEnergyHealth) {
                m.energy = 0.01;
                m.immuneCycle = m.cycle + 30 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1);
              }
              this.cycle = 0;
              Matter.Body.setAngularVelocity(this.sword, 0);
              player.force.x *= 0.01;
              player.force.y *= 0.01;
              Composite.remove(engine.world, this.sword);
              this.sword.parts.forEach(part => {
                Composite.remove(engine.world, part);
                const index = bullet.indexOf(part);
                if (index !== -1) {
                  bullet.splice(index, 1);
                }
              });
              this.sword = undefined;
              if (this.constraint) {
                Composite.remove(engine.world, this.constraint);
                this.constraint = undefined;
              }
              this.bladeTrails = [];
              m.fireCDcycle = 0;
            }
          }
        },
        createAndSwingSword(x = player.position.x, y = player.position.y, angle = m.angle) {
          const handleWidth = 20;
          const handleHeight = 150;
          const handle = Bodies.rectangle(x, y, handleWidth, handleHeight, spawn.propsIsNotHoldable);
          bullet[bullet.length] = handle;
          handle.customName = "handle";
          bullet[bullet.length - 1].do = () => {};
          const pommelWidth = 30;
          const pommelHeight = 40;
          const pommelVertices = [{
              x: x,
              y: y + handleHeight / 2 + pommelHeight / 2
            },
            {
              x: x + pommelWidth / 2,
              y: y + handleHeight / 2
            },
            {
              x: x,
              y: y + handleHeight / 2 - pommelHeight / 2
            },
            {
              x: x - pommelWidth / 2,
              y: y + handleHeight / 2
            },
          ];
          const pommel = Bodies.fromVertices(x, y + handleHeight / 2, pommelVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = pommel;
          bullet[bullet.length - 1].do = () => {};
          if (tech.soundSword) {
            bullet[bullet.length - 1].draw = () => {};
          }
          // Blade setup
          const bladeWidth = 100 * (tech.soundSword ? 3 : 1);
          const bladeHeight = 20 * (tech.soundSword ? 3 : 1);
          const numBlades = 15;
          const extensionFactor = 5;
          const bladeSegments = [];

          if ((angle > -Math.PI / 2 && angle < Math.PI / 2)) {
            for (let i = 0; i < numBlades; i++) {
              const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
              const bladeX = x + i * (bladeWidth / 20);
              const bladeY = y - handleHeight / 2 - i * (bladeHeight / 4.5) * extensionFactor;

              const vertices = [{
                  x: bladeX,
                  y: bladeY - bladeHeight / 2
                },
                {
                  x: bladeX + bladeWidth / 2,
                  y: bladeY + bladeHeight / 2
                },
                {
                  x: bladeX - bladeWidth / 2,
                  y: bladeY + bladeHeight / 2
                },
                {
                  x: bladeX,
                  y: bladeY - bladeHeight / 2 + 10
                },
              ];

              const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
              bullet[bullet.length] = blade;
              bullet[bullet.length - 1].do = () => {};
              if (tech.soundSword) {
                bullet[bullet.length - 1].draw = () => {};
              }
              Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 270) * 15));
              bladeSegments.push(blade);
            }
          } else {
            for (let i = 0; i < numBlades; i++) {
              const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
              const mirroredBladeX = x - i * (bladeWidth / 20);
              const mirroredBladeY = y - handleHeight / 2 - i * (bladeHeight / 4.5) * extensionFactor;
              const mirroredVertices = [{
                  x: mirroredBladeX,
                  y: mirroredBladeY - bladeHeight / 2
                },
                {
                  x: mirroredBladeX + bladeWidth / 2,
                  y: mirroredBladeY + bladeHeight / 2
                },
                {
                  x: mirroredBladeX - bladeWidth / 2,
                  y: mirroredBladeY + bladeHeight / 2
                },
                {
                  x: mirroredBladeX,
                  y: mirroredBladeY - bladeHeight / 2 + 10
                },
              ];
              const mirroredBlade = Bodies.fromVertices(mirroredBladeX, mirroredBladeY, mirroredVertices, spawn.propsIsNotHoldable);
              bullet[bullet.length] = mirroredBlade;
              bullet[bullet.length - 1].do = () => {};
              if (tech.soundSword) {
                bullet[bullet.length - 1].draw = () => {};
              }
              Matter.Body.rotate(mirroredBlade, Math.sin(i * (Math.PI / 270) * 15));
              bladeSegments.push(mirroredBlade);
            }
          }
          bladeSegments.push(pommel);
          const sword = Body.create({
            parts: [handle, ...bladeSegments],
          });

          Composite.add(engine.world, sword);
          Matter.Body.setPosition(sword, {
            x,
            y
          });

          sword.collisionFilter.category = cat.bullet;
          sword.collisionFilter.mask = cat.mobBullet | cat.powerup | cat.mob;
          Body.scale(sword, -1, 1, {
            x,
            y
          });

          return {
            sword,
            bladeSegments
          };
        },
        renderDefault() {
          if (this.sword) {
            for (let i = 0; i < this.bladeSegments.length; i++) {
              const blade = this.bladeSegments[i];
              const trail = this.bladeTrails[i] || [];
              const vertices = blade.vertices.map(vertex => ({
                x: vertex.x,
                y: vertex.y
              }));
              trail.push(vertices);
              if (trail.length > 10) {
                trail.shift();
              }
              this.bladeTrails[i] = trail;
            }

            for (let i = 0; i < this.bladeTrails.length; i++) {
              const trail = this.bladeTrails[i];

              const alphaStep = 1 / trail.length;
              let alpha = 0;

              for (let j = 0; j < trail.length; j++) {
                const vertices = trail[j];
                ctx.beginPath();
                ctx.moveTo(vertices[0].x, vertices[0].y);

                for (let k = 1; k < vertices.length; k++) {
                  ctx.lineTo(vertices[k].x, vertices[k].y);
                };

                alpha += alphaStep;
                ctx.closePath();
                if (tech.isEnergyHealth) {
                  const eyeColor = m.fieldMeterColor;
                  const r = eyeColor[1];
                  const g = eyeColor[2];
                  const b = eyeColor[3];
                  const color = `#${r}${r}${g}${g}${b}${b}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
                  ctx.fillStyle = color;
                } else {
                  ctx.fillStyle = `rgba(220, 20, 60, ${alpha})`;
                }
                ctx.fill();
              }
            }
            for (let i = 0; i < this.bladeSegments.length; i++) {
              ctx.beginPath();
              ctx.lineJoin = "miter";
              ctx.miterLimit = 100;
              ctx.strokeStyle = tech.isEnergyHealth ? m.fieldMeterColor : tech.isAmmoSword ? "#c0c0c0" : "crimson";
              ctx.lineWidth = 5;
              ctx.fillStyle = "black";
              ctx.moveTo(this.bladeSegments[i].vertices[0].x, this.bladeSegments[i].vertices[0].y);
              for (let j = 0; j < this.bladeSegments[i].vertices.length; j++) {
                ctx.lineTo(this.bladeSegments[i].vertices[j].x, this.bladeSegments[i].vertices[j].y)
              };
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
              ctx.lineJoin = "round";
              ctx.miterLimit = 10;
            }
          }
        },
        collision() {
          if (this.sword) {
            for (let i = 0; i < mob.length; i++) {
              if (Matter.Query.collides(this.sword, [mob[i]]).length > 0) {
                const dmg = Math.sqrt(this.sword.speed) * (tech.sizeIllusion ? 1.1 : 1) * (tech.isStabSword ? 1.5 : 1) * (tech.infinityEdge ? 1.1 : 1);
                if (!tech.soundSword) {
                  if (m.health < m.maxHealth) {
                    if (tech.isEnergyHealth) {
                      m.energy += 0.04;
                    } else {
                      m.health += 0.01 * (dmg - mob[i].health);
                      m.displayHealth();
                    }
                  } else {
                    if (tech.isEnergyHealth) {
                      m.energy += 0.04;
                    } else {
                      m.health = m.maxHealth;
                      m.displayHealth();
                    }
                  }
                }
                mob[i].damage(dmg, true);
                simulation.drawList.push({
                  x: mob[i].position.x,
                  y: mob[i].position.y,
                  radius: Math.abs(Math.log(dmg * this.sword.speed) * 40 * mob[i].damageReduction + 3),
                  color: (tech.soundSword ? "rgba(0, 0, 0, 0.3)" : simulation.mobDmgColor),
                  time: simulation.drawTime
                });
                break
              }
            }
            if (Matter.Query.collides(this.sword, [genisis]).length > 0) {
              m.takeDamage(-0.0142) //balanced!
            }
          }
        }
      };
      b.guns.push(e);
      const gunArray = b.guns.filter(
        (obj, index, self) =>
        index === self.findIndex((item) => item.name === obj.name)
      );
      b.guns = gunArray;
    } else {
      /*
                  simulation.inGameConsole(`Thank you for using my sword mod<br>I'll save you the trouble of killing genisis<br><div style="font-family: monospace;">g.<span style="color: crimson;">damage</span>(Infinity)</div>`);
                  g.damage(Infinity);*/
    }
    simulation.inGameConsole(`<strong>ALSO</strong> made by <span class='color-var'>Richard0820</span>`);
    let index = 0;
    let index2 = 0;
    let {
      sword: sword,
      bladeSegments: bladeSegments
    } = createSword();
    const door = level.door(-950, -3000, 400, 4000, 2000, 10);
    const door2 = level.door(550, -3000, 400, 4000, 2000, 10);
    level.setPosToSpawn(-7900, -2550); //normal spawn
    level.exit.x = 7875;
    level.exit.y = -2530;
    spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
    spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
    level.defaultZoom = 2000
    simulation.zoomTransition(level.defaultZoom)
    document.body.style.backgroundColor = "#987654";
    color.map = "#765432" //custom map color
    color.block = "#876543";
    door.isClosing = true;
    door2.isClosing = true;
    for (let i = 0; i < 5; i++) {
      powerUps.spawn(-6075, -2000, "heal");
    }
    let bladeTrails = [];
    let isOwned = false;
    class Particle {
      constructor() {
        this.x = player.position.x + Math.random() * 10000 - 5000;
        this.y = player.position.y + Math.random() * 10000 - 5000;
        this.vx = 0;
        this.vy = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.life = 2000;
        this.alpha = 1;
        this.size = 8;
      }

      update() {
        this.vx += this.accelX;
        this.vy += this.accelY;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < player.position.x - 5000 || this.x > player.position.x + 5000 ||
          this.y < player.position.y - 5000 || this.y > player.position.y + 5000) {
          this.reset();
        }
      }

      reset() {
        this.x = player.position.x + Math.random() * 10000 - 5000;
        this.y = player.position.y + Math.random() * 10000 - 5000;
        this.vx = 0;
        this.vy = 0;
        this.life = Math.random() * 1000 + 1000;
        this.maxLife = this.life;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }

      isAlive() {
        return this.life >= 0;
      }
    }
    class ParticleSystem {
      constructor() {
        this.particles = [];
        this.updateHandler = undefined;
      }

      addParticle(particle) {
        this.particles.push(particle);
      }

      update(deltaTime = 0) {
        this.particles.forEach(particle => {
          particle.update(deltaTime);
          this.updateHandler && this.updateHandler(particle);
        });
      }

      onUpdate(fn) {
        this.updateHandler = fn;
      }
    }
    let system = new ParticleSystem();
    for (let i = 0; i < 200; i++) {
      let particle = new Particle();
      system.addParticle(particle);
    }
    system.onUpdate((particle) => {
      if (!particle.isAlive()) {
        particle.reset();
      }

      particle.life -= 10;
      particle.accelX = (Math.random() - 0.5) * 0.02;
      particle.accelY = (Math.random() - 0.5) * 0.02;

      if (particle.life >= particle.maxLife / 2) {
        particle.alpha = 1 - (particle.life / particle.maxLife);
      } else {
        particle.alpha = particle.life / particle.maxLife;
      }

      particle.update();
    });

    function update() {
      system.update();
    }

    function draw() {
      system.particles.forEach(particle => particle.draw());
    }
    for (let i = 0; i < system.particles.length; i++) {
      system.particles[i].life = 0;
    }
    level.custom = () => {
      update();
      draw();
      for (let i = 0, len = b.guns.length; i < len; i++) {
        if (b.guns[i].name === "sword" && b.guns[i].have) {
          isOwned = true;
        }
      }
      Matter.Body.setPosition(sword, {
        x: -3950,
        y: -275 - (Math.sin(simulation.cycle / 100) * 50)
      });
      Matter.Body.setAngularVelocity(sword, 0);
      door.openClose();
      door2.openClose();
      if (Matter.Collision.collides(sword, player) && index <= 0 || isOwned) {
        bladeTrails = [];
        bladeSegments = [];
        Composite.remove(engine.world, sword);
        sword.parts.forEach(part => {
          Composite.remove(engine.world, part);
          const index = bullet.indexOf(part);
          if (index !== -1) {
            bullet.splice(index, 1);
          }
        });
        b.giveGuns("sword");
        door.isClosing = false;
        door2.isClosing = false;
        index++;
      }
      const oldLevel = level.onLevel;

      level.exit.drawAndCheck();

      level.enter.draw();
      if (tech.isEnergyHealth) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(-3950, 0, 5, -3950, 0, 350 + Math.sin(simulation.cycle * 0.15) * 0.1);
        gradient.addColorStop(0, m.fieldMeterColor);
        gradient.addColorStop(0.9, "transparent");
        // gradient.addColorStop(1, "darkgray");
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "transparent";
        ctx.fillRect(-4000, -350, 100, 350);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(-3500, 0, -3500, -350 + Math.sin(simulation.cycle * 0.15) * 0.1);
        gradient.addColorStop(0, "crimson");
        gradient.addColorStop(0.9, "transparent");
        // gradient.addColorStop(1, "darkgray");
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "transparent";
        ctx.fillRect(-4000, -350, 100, 350);
        ctx.fill();
        ctx.stroke();
      }
      if (player.position.x > -4000 && player.position.x < -3900 && player.position.y > -350 && player.position.y < 0) {
        player.force.y -= 0.03;
      }

      // if (player.position.x > level.exit.x && player.position.x < level.exit.x + 100 && player.position.y > level.exit.y - 150 && player.position.y < level.exit.y - 0 && player.velocity.y < .15 && index2 == 0 && !isUsingSwordMod) {
      if (level.onLevel !== oldLevel && simulation.clearNow && !isUsingSwordMod) {
        b.removeGun("sword"); //completely removing the stuff (if you leave properly through the door)
        for (let i = 0, len = b.guns.length; i < len; i++) {
          if (b.guns[i].name === "sword") {
            b.guns.splice(i, 1);
            break;
          }
        }
        index2++;
        setTimeout(() => {
          simulation.inGameConsole(`If you want to keep this sword, visit <a href="https://github.com/Whyisthisnotavalable/n-scythe">https://github.com/Whyisthisnotavalable/n-scythe</a>. The sword is there.`)
        }, 1000)
      }
      for (let i = 0; i < bladeSegments.length; i++) {
        const blade = bladeSegments[i];
        const trail = bladeTrails[i] || [];
        const vertices = blade.vertices.map(vertex => ({
          x: vertex.x,
          y: vertex.y
        }));
        trail.push(vertices);
        if (trail.length > 10) {
          trail.shift();
        }
        bladeTrails[i] = trail;
      }

      for (let i = 0; i < bladeTrails.length; i++) {
        const trail = bladeTrails[i];

        const alphaStep = 1 / trail.length;
        let alpha = 0;

        for (let j = 0; j < trail.length; j++) {
          const vertices = trail[j];
          ctx.beginPath();
          ctx.moveTo(vertices[0].x, vertices[0].y);

          for (let k = 1; k < vertices.length; k++) {
            ctx.lineTo(vertices[k].x, vertices[k].y);
          };

          alpha += alphaStep;
          ctx.closePath();
          if (tech.isEnergyHealth) {
            const eyeColor = m.fieldMeterColor;
            const r = eyeColor[1];
            const g = eyeColor[2];
            const b = eyeColor[3];
            const color = `#${r}${r}${g}${g}${b}${b}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.fillStyle = color;
          } else {
            ctx.fillStyle = `rgba(220, 20, 60, ${alpha})`;
          }
          ctx.fill();
        }
      }
      for (let i = 0; i < bladeSegments.length; i++) {
        ctx.beginPath();
        ctx.lineJoin = "miter";
        ctx.miterLimit = 100;
        ctx.strokeStyle = tech.isEnergyHealth ? m.fieldMeterColor : tech.isAmmoSword ? "#c0c0c0" : "crimson";
        ctx.lineWidth = 5;
        ctx.fillStyle = "black";
        ctx.moveTo(bladeSegments[i].vertices[0].x, bladeSegments[i].vertices[0].y);
        for (let j = 0; j < bladeSegments[i].vertices.length; j++) {
          ctx.lineTo(bladeSegments[i].vertices[j].x, bladeSegments[i].vertices[j].y)
        };
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.lineJoin = "round";
        ctx.miterLimit = 10;
      }
      if (bladeSegments.length) {
        ctx.beginPath();
        ctx.lineJoin = "miter";
        ctx.miterLimit = 100;
        ctx.strokeStyle = tech.isEnergyHealth ? m.fieldMeterColor : tech.isAmmoSword ? "#c0c0c0" : "crimson";
        ctx.lineWidth = 5;
        ctx.fillStyle = "black";
        ctx.moveTo(sword.parts[1].vertices[0].x, sword.parts[1].vertices[0].y);
        for (let j = 0; j < sword.parts[1].vertices.length; j++) {
          ctx.lineTo(sword.parts[1].vertices[j].x, sword.parts[1].vertices[j].y)
        };
        ctx.closePath();
        ctx.fill();
        ctx.lineJoin = "round";
        ctx.miterLimit = 10;
      }
    };
    level.customTopLayer = () => {};
    simulation.ephemera.push({
      name: "genesis",
      death: false,
      pwuspawn: 0,
      do() {
        if (this.death === true) {
          b.explosion(g.pos, 200 * Math.random(), "#000000")
          setTimeout(() => {
            if (this.pwuspawn === 0) {
              powerUps.spawnBossPowerUp(g.pos.x, g.pos.y)
              this.pwuspawn++;
            }
            simulation.removeEphemera(this.name);
            simulation.removeEphemera("genisisScythe");
          }, 1000);
        }
        if (g.health >= 0) {
          if (g.health < g.maxHealth) {
            g.health++;
          }
          const dist = Matter.Vector.magnitudeSquared(Matter.Vector.sub(genisis.position, player.position));
          const time = Math.sqrt(dist) / 60;
          g.alive = true;
          if (simulation.testing) {
            g.targetX = g.pos.x;
            g.targetY = g.pos.y;
          } else {
            g.targetX = m.pos.x + player.velocity.x * time;
            g.targetY = m.pos.y + player.velocity.y * time;
          }
        } else {
          this.death = true;
          g.alive = false;
        }
        if (g.alive) {
          if (!simulation.testing) {
            g.cycle++;
            g.lookDefault();
            g.drawDefault();
          }
          g.move();
          g.drawHealth();
          genisis.force.y += g.mass * simulation.g
          g.setFillColors();
          if (!simulation.testing) {
            control.right = g.angle > -Math.PI * 2 / 5 && g.angle < Math.PI * 2 / 5;
            control.left = g.angle > Math.PI * 3 / 5 || g.angle < -Math.PI * 3 / 5;
            control.down = g.angle > Math.PI * 3 / 10 && g.angle < Math.PI * 7 / 10;
            if (Matter.Query.collides(genisis, body).length || Matter.Query.collides(genisisHead, map).length || Matter.Query.collides(genisisBodySensor, map).length && !control.down) {
              if (g.buttonCD_jump < g.cycle) {
                g.jump();
              }
            }
            control.up = g.angle > -Math.PI * 6 / 10 && g.angle < -Math.PI * 4 / 10;
          }
          if (g.onGround) {
            g.groundControl()
          } else {
            g.airControl()
          }
          if (g.pos.y > simulation.fallHeight) {
            Matter.Body.setPosition(genisis, {
              x: level.exit.x,
              y: level.exit.y
            })
          }
        } else {
          genisis.collisionFilter.mask = cat.map | cat.body;
          Matter.Body.setPosition(genisis, {
            x: 0,
            y: 0
          })
        }
        if (simulation.testing) {
          //genisis.force.x /= 2;
          genisis.velocity.x -= 10;
          //g.Vx *= -1;
          ctx.beginPath();
          let bodyDraw = genisisJumpSensor.vertices;
          ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
          for (let j = 1; j < bodyDraw.length; ++j) {
            ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
          }
          ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
          ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          ctx.fill();

          ctx.beginPath();
          bodyDraw = genisisBody.vertices;
          ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
          for (let j = 1; j < bodyDraw.length; ++j) {
            ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
          }
          ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
          ctx.fillStyle = "rgba(0, 255, 255, 0.25)";
          ctx.fill();

          ctx.beginPath();
          bodyDraw = genisisHead.vertices;
          ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
          for (let j = 1; j < bodyDraw.length; ++j) {
            ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
          }
          ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
          ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
          ctx.fill();

          ctx.beginPath();
          bodyDraw = genisisHeadSensor.vertices;
          ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
          for (let j = 1; j < bodyDraw.length; ++j) {
            ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
          }
          ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
          ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
          ctx.fill();

          ctx.beginPath();
          bodyDraw = genisisBodySensor.vertices;
          ctx.moveTo(bodyDraw[0].x, bodyDraw[0].y);
          for (let j = 1; j < bodyDraw.length; ++j) {
            ctx.lineTo(bodyDraw[j].x, bodyDraw[j].y);
          }
          ctx.lineTo(bodyDraw[0].x, bodyDraw[0].y);
          ctx.fillStyle = "rgba(255, 0, 255, 0.25)";
          ctx.fill();
        }

        Events.on(engine, "collisionStart", function(event) {
          g.genisisOnGroundCheck(event);
          GenisisCollisionChecks(event);
        });
        Events.on(engine, "collisionActive", function(event) {
          g.genisisOnGroundCheck(event);
        });
        Events.on(engine, "collisionEnd", function(event) {
          g.genisisOffGroundCheck(event);
        });
      }
    })
    let evo = {
      isLongBlade: true,
      isScytheRange: true,
      scytheRange: 3,
      isScytheRad: false,
      scytheRad: 0,
      isDoubleScythe: false,
      isPhaseScythe: false,
      isMeleeScythe: false,
      isStunScythe: false,
    };
    simulation.ephemera.push({
      name: "genisisScythe",
      cycle: 0,
      scythe: undefined,
      bladeSegments: undefined,
      bladeTrails: [],
      angle: 0,
      constraint: undefined,
      fireCD: 0,
      do() {
        if (isOwned) {
          if (g.health < 500 && g.health > 200) {
            evo = {
              isLongBlade: true,
              isScytheRange: true,
              scytheRange: 3,
              isScytheRad: false,
              scytheRad: 1,
              isDoubleScythe: true,
              isPhaseScythe: false,
              isMeleeScythe: false,
              isStunScythe: false,
            };
          } else if (g.health < 200 && g.health > 50) {
            evo = {
              isLongBlade: true,
              isScytheRange: true,
              scytheRange: 3,
              isScytheRad: true,
              scytheRad: 1,
              isDoubleScythe: true,
              isPhaseScythe: true,
              isMeleeScythe: true,
              isStunScythe: true,
            };
          } else if (g.health < 50) {
            evo = {
              isLongBlade: true,
              isScytheRange: true,
              scytheRange: 9,
              isScytheRad: true,
              scytheRad: 6,
              isDoubleScythe: true,
              isPhaseScythe: true,
              isMeleeScythe: true,
              isStunScythe: true,
            };
          }
          if (g.cycle > this.fireCD && !this.scythe) {
            this.fireCD = g.cycle + 30;
            if (!this.scythe) {
              ({
                scythe: this.scythe,
                bladeSegments: this.bladeSegments
              } = this.createAndSwingScythe());
              this.angle = g.angle;
            }
          }
          if (this.scythe && g.cycle > this.cycle + 30 || !g.alive && this.scythe) {
            Composite.remove(engine.world, this.scythe);
            this.scythe.parts.forEach(part => {
              Composite.remove(engine.world, part);
              const index = bullet.indexOf(part);
              if (index !== -1) {
                bullet.splice(index, 1);
              }
            });
            this.scythe = undefined;
            this.bladeTrails = [];
          } else {
            if (this.scythe && !evo.isMeleeScythe) {
              if (!(this.angle > -Math.PI / 2 && this.angle < Math.PI / 2)) {
                Matter.Body.setAngularVelocity(this.scythe, -Math.PI * 0.15 - (evo.scytheRad ? evo.scytheRad * 0.1 : 0));
              } else {
                Matter.Body.setAngularVelocity(this.scythe, Math.PI * 0.15 + (evo.scytheRad ? evo.scytheRad * 0.1 : 0));
              }
              Matter.Body.setVelocity(this.scythe, {
                x: Math.cos(this.angle) * 30,
                y: Math.sin(this.angle) * 30
              });
            } else if (this.scythe && evo.isMeleeScythe) {
              if (!(this.angle > -Math.PI / 2 && this.angle < Math.PI / 2)) {
                Matter.Body.setAngularVelocity(this.scythe, -Math.PI * 0.1 + (evo.isStunScythe ? 0.1 : 0));
              } else {
                Matter.Body.setAngularVelocity(this.scythe, Math.PI * 0.1 - (evo.isStunScythe ? 0.1 : 0));
              }
              Matter.Body.setPosition(this.scythe, genisis.position);
            }
          }
          if (this.scythe) {
            for (let i = 0; i < this.bladeSegments.length; i++) {
              const blade = this.bladeSegments[i];
              const trail = this.bladeTrails[i] || [];
              const vertices = blade.vertices.map(vertex => ({
                x: vertex.x,
                y: vertex.y
              }));
              trail.push(vertices);
              if (trail.length > 10) {
                trail.shift();
              }
              this.bladeTrails[i] = trail;
            }
            for (let i = 0; i < this.bladeTrails.length; i++) {
              const trail = this.bladeTrails[i];

              const alphaStep = 1 / trail.length;
              let alpha = 0;

              for (let j = 0; j < trail.length; j++) {
                const vertices = trail[j];
                ctx.beginPath();
                ctx.moveTo(vertices[0].x, vertices[0].y);

                for (let k = 1; k < vertices.length; k++) {
                  ctx.lineTo(vertices[k].x, vertices[k].y);
                };

                alpha += alphaStep;
                ctx.closePath();
                ctx.fillStyle = `rgba(100, 20, 255, ${alpha})`;
                ctx.fill();
              }
            }
            for (let i = 0; i < this.bladeSegments.length; i++) {
              ctx.beginPath();
              ctx.lineJoin = "miter";
              ctx.miterLimit = 100;
              ctx.strokeStyle = `rgb(100, 20, 255)`;
              ctx.lineWidth = 5;
              ctx.fillStyle = "black";
              ctx.moveTo(this.bladeSegments[i].vertices[0].x, this.bladeSegments[i].vertices[0].y);
              for (let j = 0; j < this.bladeSegments[i].vertices.length; j++) {
                ctx.lineTo(this.bladeSegments[i].vertices[j].x, this.bladeSegments[i].vertices[j].y)
              };
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
              ctx.lineJoin = "round";
              ctx.miterLimit = 10;
            }
          }
          if (this.scythe) {
            for (let i = 0; i < mob.length; i++) {
              if (Matter.Query.collides(this.scythe, [mob[i]]).length > 0) {
                const dmg = 0.12 * 2.73 * (evo.isLongBlade ? 1.3 : 1) * (evo.scytheRange ? evo.scytheRange * 1.15 : 1) * (evo.isDoubleScythe ? 0.9 : 1) * (evo.scytheRad ? evo.scytheRad * 1.5 : 1);
                mob[i].damage(dmg, true);
                simulation.drawList.push({
                  x: mob[i].position.x,
                  y: mob[i].position.y,
                  radius: Math.sqrt(dmg) * 50,
                  color: simulation.mobDmgColor,
                  time: simulation.drawTime
                });
                if (!evo.isMeleeScythe) {
                  const angle = Math.atan2(mob[i].position.y - this.scythe.position.y, mob[i].position.x - this.scythe.position.x);
                  this.scythe.force.x += Math.cos(angle) * 2;
                  this.scythe.force.y += Math.sin(angle) * 2;
                }
                if (evo.isStunScythe) {
                  mobs.statusStun(mob[i], 90);
                }
                break
              }
            }
            if (Matter.Query.collides(this.scythe, [player]).length > 0 && m.immuneCycle < m.cycle) {
              const dmg = 0.02 * (evo.isLongBlade ? 1.3 : 1) * (evo.scytheRange ? evo.scytheRange * 1.15 : 1) * (evo.isDoubleScythe ? 0.9 : 1) * (evo.scytheRad ? evo.scytheRad * 1.5 : 1); // actual scythe scallings one tap the player so this is nerfed for genisis
              m.takeDamage(dmg);
              m.immuneCycle = m.cycle + 10 * ((m.fieldMode === 0 || m.fieldMode === 14) ? m.immuneBoostCouple : 1);
              simulation.drawList.push({
                x: player.position.x,
                y: player.position.y,
                radius: Math.sqrt(dmg) * 50,
                color: simulation.mobDmgColor,
                time: simulation.drawTime
              });
              if (!evo.isMeleeScythe) {
                const angle = Math.atan2(player.position.y - this.scythe.position.y, player.position.x - this.scythe.position.x);
                this.scythe.force.x += Math.cos(angle) * 2;
                this.scythe.force.y += Math.sin(angle) * 2;
              }
            }
          }
        }
      },
      createAndSwingScythe(x = genisis.position.x, y = genisis.position.y, angle = g.angle) {
        this.cycle = g.cycle + 60 + (evo.scytheRange * 6);
        const handleWidth = 20;
        const handleHeight = 200 + (evo.isLongBlade ? 30 : 0) + (evo.isMeleeScythe ? 200 : 0);
        const handle = Bodies.rectangle(x, y, handleWidth, handleHeight, spawn.propsIsNotHoldable);
        bullet[bullet.length] = handle;
        bullet[bullet.length - 1].do = () => {};
        const bladeWidth = 100;
        const bladeHeight = 20;
        const numBlades = 10 + (evo.isLongBlade ? 1 : 0) + (evo.isMeleeScythe ? 3 : 0);
        const extensionFactor = 5.5;
        const bladeSegments = [];
        if (!evo.isDoubleScythe) {
          for (let i = 0; i < numBlades; i++) {
            const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
            const bladeX = x - handleWidth / 2 + i * (bladeWidth / 2) - extensionFactorFraction * (bladeWidth / 2);
            const bladeY = y + handleHeight / 2 - i * (bladeHeight / (3 ** i));

            const vertices = [{
                x: bladeX,
                y: bladeY - bladeHeight / 2
              },
              {
                x: bladeX + bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX - bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX,
                y: bladeY - bladeHeight / 2 + 10
              },
            ];

            const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
            bullet[bullet.length] = blade;
            bullet[bullet.length - 1].do = () => {};
            Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5));
            bladeSegments.push(blade);
          }
        } else {
          for (let i = 0; i < numBlades; i++) {
            const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
            const bladeX = x - handleWidth / 2 + i * (bladeWidth / 2) - extensionFactorFraction * (bladeWidth / 2);
            const bladeY = y + handleHeight / 2 - i * (bladeHeight / (3 ** i));

            const vertices = [{
                x: bladeX,
                y: bladeY - bladeHeight / 2
              },
              {
                x: bladeX + bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX - bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX,
                y: bladeY - bladeHeight / 2 + 10
              },
            ];

            const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
            bullet[bullet.length] = blade;
            bullet[bullet.length - 1].do = () => {};
            Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5));
            bladeSegments.push(blade);
          }

          for (let i = 0; i < numBlades; i++) {
            const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
            const bladeX = x + handleWidth / 2 - i * (bladeWidth / 2) + extensionFactorFraction * (bladeWidth / 2);
            const bladeY = y - handleHeight / 2 - i * (bladeHeight / (3 ** i));

            const vertices = [{
                x: bladeX,
                y: bladeY - bladeHeight / 2
              },
              {
                x: bladeX + bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX - bladeWidth / 2,
                y: bladeY + bladeHeight / 2
              },
              {
                x: bladeX,
                y: bladeY - bladeHeight / 2 + 10
              },
            ];

            const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
            bullet[bullet.length] = blade;
            bullet[bullet.length - 1].do = () => {};
            Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5) + Math.PI);
            bladeSegments.push(blade);
          }
        }
        const scythe = Body.create({
          parts: [handle, ...bladeSegments],
        });
        Composite.add(engine.world, scythe);
        Matter.Body.setPosition(scythe, {
          x,
          y
        });

        scythe.collisionFilter.category = cat.body;
        scythe.collisionFilter.mask = cat.mobBullet | cat.player;
        if (!evo.isMeleeScythe) {
          setTimeout(() => {
            scythe.collisionFilter.mask = cat.mobBullet | cat.mob | cat.player;
          }, 1000)
        }
        if ((angle > -Math.PI / 2 && angle < Math.PI / 2)) {
          Body.scale(scythe, -1, 1, {
            x,
            y
          });
        }

        scythe.frictionAir -= 0.01;

        return {
          scythe,
          bladeSegments
        };
      },
    })
    spawn.mapRect(-10000, 0, 20000, 2000);
    spawn.mapRect(-10000, -10000, 2000, 10000);
    spawn.mapRect(8000, -10000, 2000, 10000);
    spawn.mapRect(-10000, -10000, 20000, 2000);
    spawn.spawnStairs(8000, 0, 15, 2500, 2500, true);
    spawn.spawnStairs(-8000, 0, 15, 2500, 2500, false);

    spawn.mapRect(-4000, -10, 100, 20);
    spawn.mapRect(4000, -10, 100, 20);

    spawn.mapRect(-1000, -10000, 2000, 8000);
    // spawn.mapRect(-500, -10000, 1000, 9700);
    function createSword(x = 0, y = 0) { //sword asthetic
      const handleWidth = 20;
      const handleHeight = 150;
      const handle = Bodies.rectangle(x, y, handleWidth, handleHeight, spawn.propsIsNotHoldable);
      bullet[bullet.length] = handle;
      handle.customName = "handle";
      bullet[bullet.length - 1].do = () => {};
      const pommelWidth = 30;
      const pommelHeight = 40;
      const pommelVertices = [{
          x: x,
          y: y + handleHeight / 2 + pommelHeight / 2
        },
        {
          x: x + pommelWidth / 2,
          y: y + handleHeight / 2
        },
        {
          x: x,
          y: y + handleHeight / 2 - pommelHeight / 2
        },
        {
          x: x - pommelWidth / 2,
          y: y + handleHeight / 2
        },
      ];
      const pommel = Bodies.fromVertices(x, y + handleHeight / 2, pommelVertices, spawn.propsIsNotHoldable);
      bullet[bullet.length] = pommel;
      bullet[bullet.length - 1].do = () => {};
      if (tech.soundSword) {
        bullet[bullet.length - 1].draw = () => {};
      }
      // Blade setup
      const bladeWidth = 100 * (tech.soundSword ? 3 : 1);
      const bladeHeight = 20 * (tech.soundSword ? 3 : 1);
      const numBlades = 15;
      const extensionFactor = 5;
      const bladeSegments = [];
      for (let i = 0; i < numBlades; i++) {
        const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
        const mirroredBladeX = x - i * (bladeWidth / 20);
        const mirroredBladeY = y - handleHeight / 2 - i * (bladeHeight / 4.5) * extensionFactor;
        const mirroredVertices = [{
            x: mirroredBladeX,
            y: mirroredBladeY - bladeHeight / 2
          },
          {
            x: mirroredBladeX + bladeWidth / 2,
            y: mirroredBladeY + bladeHeight / 2
          },
          {
            x: mirroredBladeX - bladeWidth / 2,
            y: mirroredBladeY + bladeHeight / 2
          },
          {
            x: mirroredBladeX,
            y: mirroredBladeY - bladeHeight / 2 + 10
          },
        ];
        const mirroredBlade = Bodies.fromVertices(mirroredBladeX, mirroredBladeY, mirroredVertices, spawn.propsIsNotHoldable);
        bullet[bullet.length] = mirroredBlade;
        bullet[bullet.length - 1].do = () => {};
        if (tech.soundSword) {
          bullet[bullet.length - 1].draw = () => {};
        }
        Matter.Body.rotate(mirroredBlade, Math.sin(i * (Math.PI / 270) * 15));
        bladeSegments.push(mirroredBlade);
      }
      bladeSegments.push(pommel);
      const sword = Body.create({
        parts: [handle, ...bladeSegments],
      });

      Composite.add(engine.world, sword);
      Matter.Body.setPosition(sword, {
        x,
        y
      });

      sword.collisionFilter.category = cat.bullet;
      sword.collisionFilter.mask = cat.mobBullet | cat.powerup | cat.mob;
      Body.scale(sword, -1, 1, {
        x,
        y
      });
      Body.rotate(sword, Math.PI + Math.PI / 15)

      return {
        sword,
        bladeSegments
      };
    }
  },
  zenith() {
    simulation.inGameConsole(`<strong>zenith</strong> by <b style='color: crimson;'>WhyIsThisNotAvailable</b>
      <br>made for n-scythe`);
    level.setPosToSpawn(0, -50); //normal spawn
    level.exit.x = 5288;
    level.exit.y = 145;
    spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
    spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
    spawn.mapRect(-7800, 488, 100, 25);
    level.defaultZoom = 1800
    simulation.zoomTransition(level.defaultZoom)
    document.body.style.backgroundColor = "#d8dadf";
    const boost = level.boost(4975, 175, 2250);
    const cL = {
      x: -7800,
      y: 470,
      exitCount: 0,
      drawAndCheck() {
        if ( //check
          player.position.x > this.x &&
          player.position.x < this.x + 100 &&
          player.position.y > this.y - 150 &&
          player.position.y < this.y - 0 &&
          player.velocity.y < 0.15
        ) {
          this.exitCount += m.health < 0 ? 0.5 : 3
        } else if (this.exitCount > 0) {
          this.exitCount -= 3
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 30);
        ctx.lineTo(this.x, this.y - 80);
        ctx.bezierCurveTo(this.x, this.y - 170, this.x + 100, this.y - 170, this.x + 100, this.y - 80);
        ctx.lineTo(this.x + 100, this.y + 30);
        ctx.lineTo(this.x, this.y + 30);
        ctx.fillStyle = "rgb(210, 45, 45)";
        ctx.fill();

        if (this.exitCount > 0) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y + 40);
          ctx.lineTo(this.x, this.y - 80);
          ctx.bezierCurveTo(this.x, this.y - 148, this.x + 50, this.y - 148, this.x + 50, this.y - 148);
          ctx.moveTo(this.x + 100, this.y + 40);
          ctx.lineTo(this.x + 100, this.y - 80);
          ctx.bezierCurveTo(this.x + 100, this.y - 148, this.x + 50, this.y - 148, this.x + 50, this.y - 148);
          ctx.setLineDash([200, 200]);
          ctx.lineDashOffset = Math.max(-15, 185 - 2.1 * this.exitCount)
          if (m.health < 0) {
            ctx.strokeStyle = "#f00"
            ctx.lineWidth = 6 + 0.1 * (this.exitCount)
          } else {
            ctx.strokeStyle = "#444"
            ctx.lineWidth = 2
          }
          ctx.stroke();
          ctx.setLineDash([0, 0]);

          if (this.exitCount > 100) {
            this.exitCount = 0
            simulation.translatePlayerAndCamera({
              x: -4650,
              y: -14925
            });
            simulation.inGameConsole(`<b style="color: crimson;">Destiny:</b> How foolish. I have seen the future. This is where you will meet your ${Math.random() < 0.33 ? "demise" : Math.random() > 0.5 ? "death" : "end"}.`);
          }
        }
      }
    }

    const gradient = ctx.createRadialGradient(4400, -2939, 10000, 4400, -2939, 0);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.2, "#ff850110")
    gradient.addColorStop(0.96, "#ff01e733");
    gradient.addColorStop(1, "#ff850122");
    level.custom = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(-9100, -4675, 18250, 5375);
      ctx.beginPath();
      ctx.fillStyle = "#aaa";
      ctx.moveTo(500, 0)
      ctx.lineTo(1100, -1100);
      ctx.lineTo(2275, -1675);
      ctx.lineTo(2900, -2575);
      ctx.lineTo(3950, -2850);
      ctx.lineTo(4950, -2900);
      ctx.lineTo(6925, -1700);
      ctx.lineTo(7350, -650);
      ctx.lineTo(7525, -225);
      ctx.lineTo(8125, -25);
      ctx.lineTo(8900, 500);
      ctx.lineTo(5950, 675);
      ctx.lineTo(1550, 425);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#888";
      ctx.moveTo(-6300, 350);
      ctx.lineTo(-5525, -550);
      ctx.lineTo(-4675, -725);
      ctx.lineTo(-4000, -400);
      ctx.lineTo(-3100, 175);
      ctx.lineTo(-4475, 450);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#aaa";
      ctx.moveTo(-1800, 50);
      ctx.lineTo(-2550, -500);
      ctx.lineTo(-3550, -325);
      ctx.lineTo(-4275, 200);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#999";
      ctx.moveTo(750, 150);
      ctx.lineTo(1975, -875);
      ctx.lineTo(3000, -1825);
      ctx.lineTo(4350, -1800);
      ctx.lineTo(5075, -2075);
      ctx.lineTo(6675, -1025);
      ctx.lineTo(7625, -500);
      ctx.lineTo(8325, 300);
      ctx.lineTo(8700, 600);
      ctx.lineTo(4900, 625);
      ctx.lineTo(1500, 450);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = "#999";
      ctx.moveTo(-8500, 550);
      ctx.lineTo(-7300, 250);
      ctx.lineTo(-6225, -375);
      ctx.lineTo(-5500, -100);
      ctx.lineTo(-5125, -200);
      ctx.lineTo(-4475, 125);
      ctx.lineTo(-4475, 575);
      ctx.closePath();
      ctx.fill();

      cL.drawAndCheck();

      ctx.fillStyle = `rgba(68, 68, 68, ${(m.pos.x >= -8600 &&
                m.pos.x <= -8600 + 1675 &&
                m.pos.y >= 200 &&
                m.pos.y <= 200 + 425)
                ? Math.max(
                    0.3,
                    0.99 - (
                        Math.min(
                            (m.pos.x - (-8600)),
                            ((-8600 + 1675) - m.pos.x),
                            (m.pos.y - 200),
                            ((200 + 425) - m.pos.y)
                        )
                        /
                        Math.min(1675 / 2, 425 / 2)
                    )
                )
                : 1
                })`;

      ctx.fillRect(-8600, 200, 1675, 425);
      level.exit.drawAndCheck();
      level.enter.draw();

      ctx.fillStyle = "rgb(150, 150, 150)";
      ctx.fillRect(-3400, -16150, 300, 1475);
      ctx.fillRect(-1400, -16150, 300, 1575);
      ctx.fillRect(-4450, -17400, 300, 1650);
      ctx.fillRect(-2475, -17400, 300, 1675);
      ctx.fillRect(-675, -17400, 300, 1625);
      ctx.fillRect(-1475, -18675, 300, 1575);
      ctx.fillRect(-3625, -18750, 300, 1675);
      ctx.fillRect(-5900, -16775, 6825, 300);
    };
    level.customTopLayer = () => {
      ctx.save()
      ctx.font = "bold 200px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "crimson";
      ctx.fillText("IX", -2325, -16550);
      ctx.restore();
      boost.query();
    };
    spawn.mapRect(-2700, -25, 2050, 625);
    spawn.mapRect(675, 50, 2225, 575);
    spawn.mapRect(-1450, 200, 2825, 275);
    spawn.mapRect(2150, 325, 4600, 375);
    spawn.mapRect(2500, 175, 3875, 300);
    spawn.mapRect(-4625, 75, 2900, 775);
    spawn.mapRect(-2500, 425, 5750, 500);
    spawn.mapRect(-9275, 500, 5750, 525);
    spawn.mapRect(-7050, 300, 2875, 275);
    spawn.mapRect(4025, 500, 5150, 525);
    spawn.mapRect(6625, 225, 1825, 350);
    spawn.mapRect(-725, 0, 1525, 300);
    spawn.mapRect(1250, -750, 100, 575);
    spawn.mapRect(1250, -750, 900, 100);
    spawn.mapRect(2050, -750, 100, 575);
    spawn.mapRect(2650, -1850, 100, 1675);
    spawn.mapRect(2050, -1250, 700, 100);
    spawn.mapRect(2050, -1450, 100, 450);
    spawn.mapRect(1475, -1100, 400, 100);
    spawn.mapRect(1475, -1325, 100, 400);
    spawn.mapRect(2375, -1575, 375, 100);
    spawn.mapRect(1500, -275, 400, 100);
    spawn.mapRect(2250, -275, 300, 100);
    spawn.mapRect(2050, -500, 200, 100);
    spawn.mapRect(2550, -500, 200, 100);
    spawn.mapRect(2250, -750, 300, 100);
    spawn.mapRect(2650, -875, 1000, 100);
    spawn.mapRect(3550, -875, 100, 1075);
    spawn.mapRect(2875, -275, 100, 500);
    spawn.mapRect(2875, -50, 525, 100);
    spawn.mapRect(3100, -875, 100, 650);
    spawn.mapRect(1650, -250, 100, 350);
    spawn.mapRect(3550, -650, 725, 100);
    spawn.mapRect(4025, -1875, 100, 2075);
    spawn.mapRect(2900, -1475, 100, 100);
    spawn.mapRect(2650, -1300, 200, 100);
    spawn.mapRect(2650, -1075, 375, 100);
    spawn.mapRect(2925, -1075, 100, 300);
    spawn.mapRect(3725, -1375, 400, 100);
    spawn.mapRect(3400, -1175, 725, 100);
    spawn.mapRect(3750, -875, 375, 100);
    spawn.mapRect(3950, -1575, 175, 100);
    spawn.mapRect(4275, -1975, 625, 100);
    spawn.mapRect(4275, -1725, 625, 100);
    spawn.mapRect(4275, -1475, 625, 100);
    spawn.mapRect(4025, -1275, 250, 100);
    spawn.mapRect(4275, -975, 625, 100);
    spawn.mapRect(4800, -1975, 100, 2050);
    spawn.mapRect(4650, -2850, 100, 975);
    spawn.mapRect(4500, -2275, 250, 100);
    spawn.mapRect(3625, -2550, 100, 1000);
    spawn.mapRect(3525, -1950, 300, 100);
    spawn.mapRect(4450, -650, 100, 725);
    spawn.mapRect(4225, -350, 675, 100);
    spawn.mapRect(4025, -50, 200, 100);
    spawn.mapRect(5125, -1875, 100, 2100);
    spawn.mapRect(5125, -1875, 550, 100);
    spawn.mapRect(5450, -2500, 100, 1525);
    spawn.mapRect(5300, -2150, 425, 100);
    spawn.mapRect(5675, -1650, 450, 100);
    spawn.mapRect(5450, -1075, 675, 100);
    spawn.mapRect(5875, -1650, 100, 350);
    spawn.mapRect(6375, -1750, 100, 2150);
    spawn.mapRect(5700, -700, 425, 100);
    spawn.mapRect(5875, -675, 100, 725);
    spawn.mapRect(5875, -1025, 100, 150);
    spawn.mapRect(5450, -700, 100, 625);
    spawn.mapRect(5450, 75, 100, 175);
    spawn.mapRect(6375, -1250, 425, 100);
    spawn.mapRect(6375, -900, 700, 100);
    spawn.mapRect(6375, -550, 925, 100);
    spawn.mapRect(6750, -900, 100, 1175);
    spawn.mapRect(7125, -550, 100, 875);
    spawn.mapRect(6375, -175, 1250, 100);
    spawn.mapRect(7600, 50, 425, 100);
    spawn.mapRect(5875, -50, 400, 100);
    spawn.mapRect(6375, -1550, 225, 100);

    spawn.mapRect(-5450, -14750, 5900, 450);
    spawn.mapRect(-1650, -14850, 2400, 300);
    spawn.mapRect(-4050, -14875, 1475, 300);
    spawn.mapRect(-5775, -14525, 1650, 300);
    spawn.mapRect(-5175, -14825, 775, 225);
    spawn.mapRect(-6300, -14825, 1025, 400);
    spawn.mapRect(-6475, -15375, 900, 725);
    spawn.mapRect(-6300, -15725, 575, 450);
    spawn.mapRect(200, -15300, 1000, 475);
    spawn.mapRect(325, -14975, 700, 550);
    spawn.mapRect(525, -15850, 500, 700);
    spawn.mapRect(325, -16100, 375, 550);
    spawn.mapRect(850, -16275, 475, 1100);
    spawn.mapRect(650, -16700, 275, 975);
    spawn.mapRect(-6125, -16125, 475, 875);
    spawn.mapRect(-6525, -16550, 575, 1000);
    spawn.mapRect(-6250, -18100, 475, 1725);
    spawn.mapRect(-6425, -18525, 325, 700);
    spawn.mapRect(-6875, -18900, 2450, 575);
    spawn.mapRect(-4850, -19125, 2250, 525);
    spawn.mapRect(-2150, -18925, 1975, 200);
    spawn.mapRect(-3125, -18775, 3475, 225);
    spawn.mapRect(175, -18825, 1450, 600);
    spawn.mapRect(775, -18575, 325, 1075);
    spawn.mapRect(875, -19150, 450, 550);
    spawn.mapRect(975, -18250, 300, 2075);
    spawn.mapRect(750, -17200, 375, 1075);
    spawn.mapRect(-4575, -18750, 525, 325);
    spawn.mapRect(-5875, -19075, 1225, 375);
    spawn.mapRect(100, -15075, 150, 250);
    spawn.mapRect(-2775, -18900, 925, 250);
    spawn.mapRect(-425, -18850, 1625, 250);
    spawn.mapRect(350, -18950, 975, 250);
    spawn.mapRect(-6350, -18400, 325, 1100);
    spawn.mapRect(-6125, -16525, 250, 525);

    spawn.randomMob(1475, -475, Infinity);
    spawn.randomMob(1950, -450, Infinity);
    spawn.randomMob(2475, -25, Infinity);
    spawn.randomMob(1825, -75, Infinity);
    spawn.randomMob(1650, -1150, Infinity);
    spawn.randomMob(2200, -1050, Infinity);
    spawn.randomMob(3000, -1150, Infinity);
    spawn.randomMob(2600, -1300, Infinity);
    spawn.randomMob(2950, -1675, Infinity);
    spawn.randomMob(3950, -1725, Infinity);
    spawn.randomMob(3700, -725, Infinity);
    spawn.randomMob(4350, -75, Infinity);
    spawn.randomMob(4425, -725, Infinity);
    spawn.randomMob(4750, -500, Infinity);
    spawn.randomMob(4600, -1225, Infinity);
    spawn.randomMob(4700, -1550, Infinity);
    spawn.randomMob(4700, -1800, Infinity);
    spawn.randomMob(4550, -2450, Infinity);
    spawn.randomMob(3825, -2100, Infinity);
    spawn.randomMob(5350, -1975, Infinity);
    spawn.randomMob(5725, -1350, Infinity);
    spawn.randomMob(5350, -1600, Infinity);
    spawn.randomMob(6150, -175, Infinity);
    spawn.randomMob(5775, -50, Infinity);
    spawn.randomLevelBoss(3275, -1400, [...spawn.randomBossList]);
    // powerUps.spawnStartingPowerUps(1475, -1175);
    // spawn.debris(750, -2200, 3700, 16); //16 debris per level
    spawn.secondaryBossChance(5050, -2525)
    powerUps.addResearchToLevel() //needs to run after mobs are spawned
    const trainedApostleBrain = {
      insane: { //gen 5784, score 348839
        "w1": [
          [
            1.0107741580140481,
            1.6405922486486255,
            0.6689332849443462,
            2.109121338374435,
            3.8811510242152987,
            0.3656312329030813,
            4.119813436684,
            2.620349912291586,
            -1.2782289776865658,
            -0.5054917670985816,
            0.12058050530431116,
            1.95260191638431
          ],
          [
            -1.1778610572791146,
            -3.739556363735192,
            -0.559379212489948,
            -1.7235035057740367,
            -0.027840856445243478,
            -4.68533136471135,
            -0.9836359293312531,
            1.2313167716063897,
            -0.7355971421543316,
            -1.5559737946928387,
            2.3290619085656026,
            4.16119519905748
          ],
          [
            -5.096900353961505,
            -3.8169232746222033,
            0.5045810823239948,
            3.117198039796733,
            1.644708680056572,
            -0.045101357534030134,
            -4.03133973749829,
            -0.6919745386680425,
            1.3526344693016115,
            -3.3497221940494937,
            0.8916922638679268,
            0.33505409628745514
          ],
          [
            -1.9185518501883283,
            -4.553252527831314,
            0.6539470986297921,
            -4.6342302726663664,
            4.695297475195215,
            3.2924874300640363,
            5.683844854478426,
            -5.044726874528701,
            0.39677446271947536,
            3.098444382805514,
            -0.12485253214285383,
            6.868466295741337
          ],
          [
            0.20191756441585296,
            -2.70272060396242,
            2.4577140914851676,
            0.2441997778909038,
            -0.45523987101191693,
            0.7453206023289262,
            0.3026121860540312,
            0.1776934148073996,
            0.13469496304526835,
            1.9944486336512002,
            -1.1394327407445366,
            1.6523105891364467
          ],
          [
            -2.4564247536790917,
            1.3121432365770502,
            -1.5260241288599943,
            -1.0603947729624943,
            -2.514616629682733,
            -0.01263334400999444,
            0.19718242110257567,
            0.1992603829243929,
            -0.27303131441593015,
            -1.0107234525446822,
            -3.155016216583595,
            -2.4527659291420396
          ],
          [
            -0.9283726907044405,
            -1.1094591605923365,
            3.6496966774404678,
            0.21427578926206797,
            0.8016536219843113,
            1.1658380309519312,
            -1.6824596626305568,
            0.8097073909989034,
            -0.05331431934493122,
            0.008840935944150495,
            0.6120139046452393,
            2.056865659538457
          ],
          [
            0.9188885320700508,
            0.4047739347287341,
            3.3047001931534545,
            -0.0002465443053510444,
            0.1191739138972403,
            0.07281829656645623,
            -1.2640422307911847,
            -0.062380998281617195,
            0.06913998229736797,
            0.6034828951116511,
            0.8019924441344377,
            -1.2259173668239973
          ]
        ],
        "b1": [
          1.9393615300032097,
          0.501761483835824,
          7.917605269778354,
          2.2162081279541805,
          1.8033858016765238,
          2.0385020004678975,
          -3.269569988615886,
          0.3387847604835964,
          0.2518563946800626,
          6.454990612130803,
          4.887461535914162,
          -3.136691317764802
        ],
        "w2": [
          [
            0.03869011237288447,
            -0.02846159941593379
          ],
          [
            -0.08154175405818018,
            -0.11185202692384971
          ],
          [
            -0.07999832546076238,
            -0.8396421553064053
          ],
          [
            0.4755225454154779,
            0.7052670049179486
          ],
          [
            0.37880549959508325,
            0.5644426748476907
          ],
          [
            0.4207754666965438,
            -0.4190195371847939
          ],
          [
            0.217394771026685,
            -0.03315086421062248
          ],
          [
            0.20910798180911147,
            -0.778146455363912
          ],
          [
            -0.287120832405081,
            -0.08846024384272694
          ],
          [
            0.030589831145997115,
            0.16609033583129534
          ],
          [
            0.8087758693099841,
            0.4297319392528762
          ],
          [
            -0.029927006115343102,
            0.008496823201882747
          ]
        ],
        "b2": [
          -1.2423357300385658,
          0.00475393147162539
        ]
      },
      defensive: { //gen 8993, score 350412
        "w1": [
          [
            -3.538708680127564,
            -1.533435583107573,
            6.206332354179441,
            4.7009890156179805,
            7.845875330057734,
            0.6411783901984294,
            0.060184160963688504,
            2.0505913754203147,
            0.7426608411242368,
            1.952365069234044,
            -0.6745147776123697,
            -0.302301376835528
          ],
          [
            1.9951275975494631,
            1.0018802884478633,
            -2.473043634649521,
            0.6024943892199512,
            6.137087718468953,
            0.30571005570174187,
            2.2422030220021223,
            -1.095586163140287,
            -2.642876780925116,
            -0.2841185995349489,
            -5.935844888423477,
            -1.6335660186947414
          ],
          [
            6.216850006283522,
            -5.960203975128297,
            1.1615662609782573,
            -6.063502490004947,
            -2.967971680161667,
            -0.045711333263670884,
            -0.2971503156819469,
            0.7142880303379925,
            -0.5179034252226092,
            -4.41806885008837,
            6.586577882686874,
            -3.2035679003563686
          ],
          [
            2.2634266052224365,
            12.41595018384559,
            0.45277734742337616,
            -1.0399570486693217,
            2.253800801137623,
            0.5994527464485409,
            -1.1169352661920728,
            1.3996521033990739,
            5.233322755883423,
            -2.837600711570764,
            2.394931047706293,
            7.384871436355633
          ],
          [
            0.5641667739538041,
            -0.2207419021815057,
            -0.05431534639620175,
            4.077315311518576,
            0.3873910312331656,
            5.476384142205219,
            -0.8763150813164547,
            0.292804866069567,
            -0.03285755479210664,
            1.5061296232663441,
            1.2008903035254126,
            -2.2551940128236385
          ],
          [
            1.6252704226492578,
            1.107233485803807,
            -0.7893418455193887,
            -1.5969882729201756,
            0.4872224115373106,
            2.125133523166871,
            4.112597232608914,
            -0.32658514770201125,
            -1.5247198128147186,
            -1.9378734180376005,
            1.450987586435562,
            -5.7873498664654335
          ],
          [
            -3.3800409160374714,
            -0.10324274425270796,
            -0.33696320918261724,
            3.613664527391448,
            -1.4544355663068105,
            0.7356624469069459,
            -5.262653688938516,
            4.180120639137544,
            -0.5207295662747214,
            1.0103926852203087,
            0.7222092620830239,
            -4.181611803431373
          ],
          [
            0.34342704834093557,
            -0.42878394144655296,
            0.09211658397334022,
            -8.295194486063757,
            0.007484513769189882,
            -0.2971493814609567,
            -0.10273898064704509,
            2.356233504029775,
            6.982488674519462,
            -4.908926494662126,
            4.610963511777213,
            0.2571686784499663
          ]
        ],
        "b1": [
          3.97616991146225,
          0.05314323173549329,
          -0.23021007069831556,
          -7.1447502248395445,
          0.3195440353216286,
          -3.026197977487044,
          -6.547437491113055,
          7.049694363239756,
          5.701752769489467,
          -6.54932540956349,
          5.757298540188049,
          -3.1575147552849674
        ],
        "w2": [
          [
            -2.067791149780024,
            -2.716119620058775
          ],
          [
            -0.01514523171592519,
            0.2232173753325823
          ],
          [
            0.44614047920432165,
            -0.7747576906193436
          ],
          [
            -1.2410061804635242,
            3.879734846795383
          ],
          [
            0.42028583371988876,
            0.7264875139637318
          ],
          [
            0.04870868171928466,
            -0.031240100661309514
          ],
          [
            0.685406396905695,
            0.9004888205038389
          ],
          [
            -2.8711616087093015,
            0.9070821540166024
          ],
          [
            0.47804612328079366,
            0.8680220107035032
          ],
          [
            0.9910142998836645,
            -5.7445268643499166
          ],
          [
            3.4495544884732166,
            -0.03259725016972641
          ],
          [
            0.037863253846468325,
            -0.0467973920832748
          ]
        ],
        "b2": [
          1.4746405562504836,
          0.046471643898658016
        ]
      },
    };
    apostleBoss(-2375, -16200);

    function apostleBoss(x, y, radius = 50) {
      mobs.spawn(x, y, 6, radius, "rgb(220,90,90)");
      let me = mob[mob.length - 1];
      me.tier = 5
      me.isBoss = true;
      me.frictionAir = 0.01;
      me.memory = Infinity;
      me.cycle = 1;
      Matter.Body.setDensity(me, 0.2);
      me.seeAtDistance2 = 15000000;
      me.damageReduction = 0.14;
      me.invulnerableCount = 0;
      me.isInvulnerable = false;
      me.isApostle = true;
      me.maxDamage = 0;
      me.damageThreshold = 0.3;
      me.damageSinceLastInvuln = 0;
      me.originalHealth = me.health;
      me.hoverElevation = 460 + (Math.random() - 0.5) * 200; //squared
      me.hoverXOff = (Math.random() - 0.5) * 100;
      me.accelMag = Math.floor(10 * (Math.random() + 4.5)) * 0.00002 * simulation.accelScale;
      me.g = 0.0002; //required if using this.gravity   // gravity called in hoverOverPlayer
      me.frictionStatic = 0;
      me.friction = 0;
      me.frictionAir = 0.01;
      me.lookTorque = 0.0000025 * (Math.random() > 0.5 ? -1 : 1);
      me.fill = "rgb(220,90,90)";
      me.rememberFill = me.fill;
      me.cd = 0;
      me.burstDir = {
        x: 0,
        y: 0
      };
      me.secondPhase = false;
      me.brain = trainedApostleBrain.defensive;
      spawn.shield(me, x, y, 1);
      const len = Math.floor(Math.min(15, 3 + Math.sqrt(simulation.difficulty)))
      const speed = (0.007 + 0.003 * Math.random() + 0.004 * Math.sqrt(simulation.difficulty))
      let radiusOrbitals = radius + 125 + 350 * Math.random()
      for (let i = 0; i < len; i++) spawn.orbital(me, radiusOrbitals, i / len * 2 * Math.PI, speed)
      radiusOrbitals = radius + 125 + 350 * Math.random()
      for (let i = 0; i < len; i++) spawn.orbital(me, radiusOrbitals, i / len * 2 * Math.PI, -speed)
      me.mouseCoords = {
        x: 0,
        y: 0
      }
      me.gun = {
        name: "spear",
        orbitals: [],
        bladeSegments: undefined,
        bladeTrails: [],
        spear: undefined,
        angle: undefined,
        constraint1: undefined,
        constraint2: undefined,
        cycle: 0,
        durability: Infinity,
        maxDurability: Infinity,
        upgrades: {
          spearEye: false,
          spearHeart: false,
          spearArc: false,
          shockSpear: false,
        },
        fire() {},
        do() {
          this.cycle++;
          if (me.seePlayer) {
            if (!this.spear) {
              ({
                spear: this.spear,
                bladeSegments: this.bladeSegments
              } = this.createSpear(me.position));
              this.angle = me.angle;
            }
          }
          if (this.spear) {
            // Matter.Body.setVelocity(this.spear, {x: this.spear.velocity.x * 0.99, y: this.spear.velocity.y * 0.99})
            if (!this.constraint1) {
              this.constraint1 = Constraint.create({
                pointA: me.position,
                bodyB: this.spear,
                pointB: {
                  x: Math.cos(me.angle) * -100,
                  y: Math.sin(me.angle) * -100
                },
                stiffness: 0.1,
                damping: 0.0000001815,
                length: 0,

              });
              Composite.add(engine.world, this.constraint1);
            }
            if (!this.constraint2) {
              this.constraint2 = Constraint.create({
                pointA: me.mouseCoords,
                bodyB: this.spear,
                pointB: {
                  x: Math.cos(me.angle) * 100,
                  y: Math.sin(me.angle) * 100
                },
                stiffness: 0.1,
                damping: 0.0000001815,
                length: 0,

              });
              Composite.add(engine.world, this.constraint2);
            } else {
              this.constraint2.pointA = me.mouseCoords;
            }
          }
          if (this.spear && !me.seePlayer) {
            this.cycle = 0;
            if (this.constraint1) {
              Composite.remove(engine.world, this.constraint1);
              this.constraint1 = undefined;
            }
            if (this.constraint2) {
              Composite.remove(engine.world, this.constraint2);
              this.constraint2 = undefined;
            }
            Composite.remove(engine.world, this.spear);
            this.spear.parts.forEach(part => {
              Composite.remove(engine.world, part);
              const index = bullet.indexOf(part);
              if (index !== -1) {
                bullet.splice(index, 1);
              }
            });
            this.spear = undefined;
            this.bladeTrails = [];
          }
          this.collision();
          //this.drawDurability();
          if (this.upgrades.shockSpear) {
            this.renderLightning();
          } else {
            this.renderDefault();
          }
          if (this.upgrades.spearArc && this.spear) {
            const dmg = 0.0001;
            const damageRadius = 1000;
            const sub = Vector.magnitude(Vector.sub(this.spear.position, player.position))
            if (sub < damageRadius + 30) {
              Matter.Body.setVelocity(player, {
                x: player.velocity.x * 0.95,
                y: player.velocity.y * 0.95
              })
              if (this.upgrades.spearArc * 0.1 > Math.random()) {
                m.takeDamage(dmg * 4);
                const sub = Vector.sub(player.position, this.spear.position)
                const unit = Vector.normalise(sub)
                let len = 12
                const step = Vector.magnitude(sub) / (len + 2)
                let x = this.spear.position.x
                let y = this.spear.position.y
                ctx.beginPath();
                ctx.moveTo(x, y);
                for (let i = 0; i < len; i++) {
                  x += step * (unit.x + (Math.random() - 0.5))
                  y += step * (unit.y + (Math.random() - 0.5))
                  ctx.lineTo(x, y);
                }
                ctx.lineTo(player.position.x, player.position.y);
                ctx.strokeStyle = "rgb(220, 20, 220)";
                ctx.lineWidth = 4 + 3 * Math.random();
                ctx.stroke();
              }
            }
          }
        },
        createSpear(position) {
          let x = position.x;
          let y = position.y;
          const handleWidth = 20;
          const handleHeight = 500;

          const handle = Bodies.rectangle(x, y, handleWidth, handleHeight, spawn.propsIsNotHoldable);
          bullet[bullet.length] = handle;
          bullet[bullet.length - 1].do = () => {};

          const pommelWidth = 30;
          const pommelHeight = 40;
          const pommelVertices = [{
              x: x,
              y: y + handleHeight / 2 + pommelHeight / 2
            },
            {
              x: x + pommelWidth / 2,
              y: y + handleHeight / 2
            },
            {
              x: x,
              y: y + handleHeight / 2 - pommelHeight / 2
            },
            {
              x: x - pommelWidth / 2,
              y: y + handleHeight / 2
            },
          ];
          const pommel = Bodies.fromVertices(x, y + handleHeight / 2, pommelVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = pommel;
          bullet[bullet.length - 1].do = () => {};
          const prongWidth = 20;
          const prongHeight = 300;
          const prongOffsetX = 30;

          const leftOuterProngVertices = [{
              x: x - prongOffsetX,
              y: y - handleHeight / 2 - prongHeight
            },
            {
              x: x - prongOffsetX - prongWidth,
              y: y - handleHeight / 2 - prongHeight / 2
            },
            {
              x: x - prongOffsetX - prongWidth,
              y: y - handleHeight / 2
            },
            {
              x: x - prongOffsetX,
              y: y - handleHeight / 2 - prongHeight / 10
            },
          ];
          const leftOuterProng = Bodies.fromVertices(x - prongOffsetX, y - handleHeight / 2, leftOuterProngVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = leftOuterProng;
          bullet[bullet.length - 1].do = () => {};
          const leftInnerProngVertices = [{
              x: x - prongOffsetX / 2,
              y: y - handleHeight / 2 - prongHeight / 1.5
            },
            {
              x: x - prongOffsetX / 2 - prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
            {
              x: x - prongOffsetX / 2 + prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
          ];
          const leftInnerProng = Bodies.fromVertices(x - prongOffsetX / 2, y - handleHeight / 2, leftInnerProngVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = leftInnerProng;
          bullet[bullet.length - 1].do = () => {};
          const rightOuterProngVertices = [{
              x: x + prongOffsetX,
              y: y - handleHeight / 2 - prongHeight
            },
            {
              x: x + prongOffsetX + prongWidth,
              y: y - handleHeight / 2 - prongHeight / 2
            },
            {
              x: x + prongOffsetX + prongWidth,
              y: y - handleHeight / 2
            },
            {
              x: x + prongOffsetX,
              y: y - handleHeight / 2 - prongHeight / 10
            },
          ];
          const rightOuterProng = Bodies.fromVertices(x + prongOffsetX, y - handleHeight / 2, rightOuterProngVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = rightOuterProng;
          bullet[bullet.length - 1].do = () => {};
          const rightInnerProngVertices = [{
              x: x + prongOffsetX / 2,
              y: y - handleHeight / 2 - prongHeight / 1.5
            },
            {
              x: x + prongOffsetX / 2 - prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
            {
              x: x + prongOffsetX / 2 + prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
          ];
          const rightInnerProng = Bodies.fromVertices(x + prongOffsetX / 2, y - handleHeight / 2, rightInnerProngVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = rightInnerProng;
          bullet[bullet.length - 1].do = () => {};
          const middleSmallProngVertices = [{
              x: x,
              y: y - handleHeight / 2 - prongHeight / 2
            },
            {
              x: x - prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
            {
              x: x + prongWidth / 2,
              y: y - handleHeight / 2 - prongHeight / 3
            },
          ];
          const middleSmallProng = Bodies.fromVertices(x, y - handleHeight / 2, middleSmallProngVertices, spawn.propsIsNotHoldable);
          bullet[bullet.length] = middleSmallProng;
          bullet[bullet.length - 1].do = () => {};
          const spear = Body.create({
            parts: [handle, pommel, leftOuterProng, leftInnerProng, rightOuterProng, rightInnerProng, middleSmallProng],
          });

          Composite.add(engine.world, spear);
          Matter.Body.setAngle(spear, -me.angle - Math.PI / 2);
          Matter.Body.setPosition(spear, {
            x: x,
            y: y
          });
          Matter.Body.setVelocity(spear, {
            x: 0,
            y: 0
          });
          spear.collisionFilter.category = cat.body;
          spear.collisionFilter.mask = cat.mobBullet | cat.powerup | cat.body | cat.player | cat.bullet;
          Body.scale(spear, -1, 1, {
            x,
            y
          });
          return {
            spear,
            bladeSegments: [leftOuterProng, leftInnerProng, rightOuterProng, rightInnerProng, middleSmallProng, pommel]
          };
        },
        renderDefault() {
          if (this.spear) {
            for (let i = 0; i < this.bladeSegments.length; i++) {
              const blade = this.bladeSegments[i];
              const trail = this.bladeTrails[i] || [];
              const vertices = blade.vertices.map(vertex => ({
                x: vertex.x,
                y: vertex.y
              }));
              trail.push(vertices);
              if (trail.length > 10) {
                trail.shift();
              }
              this.bladeTrails[i] = trail;
            }
            for (let i = 0; i < this.bladeTrails.length; i++) {
              const trail = this.bladeTrails[i];

              const alphaStep = 1 / trail.length;
              let alpha = 0;

              for (let j = 0; j < trail.length; j++) {
                const vertices = trail[j];
                ctx.beginPath();
                ctx.moveTo(vertices[0].x, vertices[0].y);

                for (let k = 1; k < vertices.length; k++) {
                  ctx.lineTo(vertices[k].x, vertices[k].y);
                };

                alpha += alphaStep;
                ctx.closePath();
                if (this.upgrades.isEnergyHealth) {
                  const eyeColor = me.fieldMeterColor;
                  const r = eyeColor[1];
                  const g = eyeColor[2];
                  const b = eyeColor[3];
                  const color = `#${r}${r}${g}${g}${b}${b}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
                  ctx.fillStyle = color;
                } else {
                  ctx.fillStyle = `rgba(220, 20, 60, ${alpha})`;
                }
                ctx.fill();
              }
            }
            for (let i = 0; i < this.bladeSegments.length; i++) {
              ctx.beginPath();
              ctx.lineJoin = "miter";
              ctx.miterLimit = 100;
              ctx.strokeStyle = "crimson";
              ctx.lineWidth = 5;
              ctx.fillStyle = "black";
              ctx.moveTo(this.bladeSegments[i].vertices[0].x, this.bladeSegments[i].vertices[0].y);
              for (let j = 0; j < this.bladeSegments[i].vertices.length; j++) {
                ctx.lineTo(this.bladeSegments[i].vertices[j].x, this.bladeSegments[i].vertices[j].y)
              };
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
              ctx.lineJoin = "round";
              ctx.miterLimit = 10;
            }
          }
        },
        renderLightning() {
          if (this.spear) {
            let shock = 20;
            for (let i = 0; i < this.bladeSegments.length; i++) {
              const blade = this.bladeSegments[i];
              const trail = this.bladeTrails[i] || [];
              const vertices = blade.vertices.map(vertex => ({
                x: vertex.x,
                y: vertex.y
              }));
              trail.push(vertices);
              if (trail.length > 10) {
                trail.shift();
              }
              this.bladeTrails[i] = trail;
            }
            for (let i = 0; i < this.bladeTrails.length; i++) {
              const trail = this.bladeTrails[i];
              const alphaStep = 1 / trail.length;
              let alpha = 0;
              for (let j = 0; j < trail.length; j++) {
                const vertices = trail[j];
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(vertices[0].x + shock * Math.random() - shock * Math.random(), vertices[0].y + shock * Math.random() - shock * Math.random());
                for (let k = 1; k < vertices.length; k++) {
                  ctx.lineTo(vertices[k].x + shock * Math.random() - shock * Math.random(), vertices[k].y + shock * Math.random() - shock * Math.random());
                };
                alpha += alphaStep;
                ctx.closePath();
                ctx.strokeStyle = `rgba(220, 20, 220, ${alpha})`;
                ctx.fillStyle = `rgba(250, 250, 250, ${alpha})`;
                ctx.fill();
                ctx.stroke();
              }
            }
            for (let i = 0; i < this.bladeSegments.length; i++) {
              ctx.beginPath();
              ctx.lineJoin = "miter";
              ctx.miterLimit = 100;
              ctx.strokeStyle = "rgb(220, 20, 220)";
              ctx.lineWidth = 10;
              ctx.fillStyle = "white";
              ctx.moveTo(this.bladeSegments[i].vertices[0].x + shock * Math.random() - shock * Math.random(), this.bladeSegments[i].vertices[0].y + shock * Math.random() - shock * Math.random());
              for (let j = 0; j < this.bladeSegments[i].vertices.length; j++) {
                ctx.lineTo(this.bladeSegments[i].vertices[j].x + shock * Math.random() - shock * Math.random(), this.bladeSegments[i].vertices[j].y + shock * Math.random() - shock * Math.random())
              };
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
              ctx.lineJoin = "round";
              ctx.miterLimit = 10;
            }
            for (let i = 0; i < this.bladeSegments.length - 1; i++) {
              this.lightning(this.bladeSegments[i].position.x, this.bladeSegments[i].position.y, this.bladeSegments[i + 1].position.x, this.bladeSegments[i + 1].position.y)
            }
          }
        },
        lightning(x1, y1, x2, y2, strokeColor = 'rgb(220, 20, 220)', lineWidth = 5) {
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const boltCount = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < boltCount; i++) {
            let currentX = x1;
            let currentY = y1;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            while (Math.hypot(currentX - x1, currentY - y1) < distance) {
              const segmentLength = Math.random() * 10 + 5;
              const offsetAngle = angle + (Math.random() - 0.5) * 0.4;
              const nextX = currentX + Math.cos(offsetAngle) * segmentLength;
              const nextY = currentY + Math.sin(offsetAngle) * segmentLength;
              if (Math.hypot(nextX - x1, nextY - y1) >= distance) break;
              ctx.lineTo(nextX, nextY);
              currentX = nextX;
              currentY = nextY;
            }
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        },
        collision() {
          if (this.spear) {
            if (Matter.Query.collides(this.spear, [player]).length > 0) {
              const dmg = Math.sqrt(Math.sqrt(this.spear.speed)) / 200;
              m.takeDamage(dmg);
              simulation.drawList.push({
                x: player.position.x,
                y: player.position.y,
                radius: Math.abs(Math.log(dmg * this.spear.speed) * 40),
                color: simulation.mobDmgColor,
                time: simulation.drawTime
              });
            }
          }
        },
      };
      me.invulnerable = function() {
        if (this.isInvulnerable) {
          this.invulnerableCount--
          if (this.invulnerableCount < 0) {
            this.isInvulnerable = false;
            this.damageSinceLastInvuln = 0;
          }
          ctx.beginPath();
          let vertices = this.vertices;
          ctx.moveTo(vertices[0].x, vertices[0].y);
          for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
          ctx.lineTo(vertices[0].x, vertices[0].y);
          ctx.lineWidth = 15 + 6 * Math.random();
          ctx.strokeStyle = `rgba(255,255,255,${0.5 + 0.2 * Math.random()})`;
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, 120 / (this.invulnerableCount + 60))})`;
          ctx.fill()
        } else {
          ctx.beginPath();
          let vertices = this.vertices;
          ctx.moveTo(vertices[0].x, vertices[0].y);
          for (let j = 1; j < vertices.length; j++) ctx.lineTo(vertices[j].x, vertices[j].y);
          ctx.lineTo(vertices[0].x, vertices[0].y);
          ctx.lineWidth = 15 + 6 * Math.random();
          ctx.strokeStyle = `rgba(100,0,0,${0.5 + 0.2 * Math.random()})`;
          ctx.stroke();
        }
      }
      me.prevTarget = {
        x: 0,
        y: 0
      };
      me.hitRecently = 0;
      me.lastHitTime = 0;
      me.sometimes = function() {};
      me.do = function() {
        if (!(simulation.cycle % (this.health > 0.5 ? 600 : 160))) {
          this.isInvulnerable = true;
          this.invulnerableCount += 100;
          Matter.Body.setVelocity(this, {
            x: 0,
            y: 0
          });
          if (this.seePlayer.recall && this.cd < simulation.cycle) {
            this.burstDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
            this.cd = simulation.cycle + 40;
            this.sometimes = this.spin;
          }
        }
        this.seePlayerCheckByDistance();
        this.checkStatus();
        this.cycle++;
        this.invulnerable();
        this.gun.do();
        if (this.health < 0.5 && !this.secondPhase) {
          this.secondPhase = true;
          simulation.inGameConsole(`<b style="color:crimson;">Destiny</b>: Impressive. But you won't last much longer.`);
          this.brain = trainedApostleBrain.insane;
          this.gun.upgrades = {
            spearEye: true,
            spearHeart: true,
            spearArc: 9,
            shockSpear: true,
          }
        }
        if (this.seePlayer.recall) {
          this.hoverOverPlayer();
          if (Matter.Query.collides(me.gun.spear, [player]).length > 0) {
            this.hitRecently = 1;
            this.lastHitTime = this.cycle;
          } else if (this.cycle - this.lastHitTime > 30) {
            this.hitRecently = 0;
          }

          let target = think(
            this.brain,
            this.position.x,
            this.position.y,
            player.position.x,
            player.position.y,
            this.prevTarget,
            this.hitRecently
          );

          this.mouseCoords = target;
          this.prevTarget = target;
        }
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(this.position.x, this.position.y, 30, 0, 2 * Math.PI);
        ctx.stroke();
        this.sometimes();
      }
      me.onDamage = function(dmg) {
        if (!this.isInvulnerable) {
          this.damageSinceLastInvuln += dmg;
          let damagePercent = this.damageSinceLastInvuln / this.originalHealth;
          if (damagePercent >= this.damageThreshold) {
            this.isInvulnerable = true;
            this.invulnerableCount += 240;
            this.damageSinceLastInvuln = 0;
          }
        }
        if (dmg > me.maxDamage) {
          me.maxDamage = dmg;
        }
      }
      me.onDeath = function() {
        powerUps.spawnBossPowerUp(this.position.x, this.position.y);
        if (level.levels[level.onLevel] == "zenith") {
          level.exit.x = 375
          level.exit.y = -15338
          spawn.mapRectNow(375, -15313, 100, 25);
        }
        if (this.gun.constraint1) {
          Composite.remove(engine.world, this.gun.constraint1);
          this.gun.constraint1 = undefined;
        }
        if (this.gun.constraint2) {
          Composite.remove(engine.world, this.gun.constraint2);
          this.gun.constraint2 = undefined;
        }
        Composite.remove(engine.world, this.gun.spear);
        this.gun.spear.parts.forEach(part => {
          Composite.remove(engine.world, part);
          const index = bullet.indexOf(part);
          if (index !== -1) {
            bullet.splice(index, 1);
          }
        });
        this.gun.spear = undefined;
        simulation.inGameConsole(`<b style="color: crimson;">Destiny</b>: To defy fate itself... how curious.`);
        setTimeout(() => {
          simulation.inGameConsole(`<b style="color: crimson;">Destiny</b>: Many say “Per aspera ad astra.”`);
          setTimeout(() => {
            if (!simulation.isCheating) {
              simulation.inGameConsole(`<b style="color: crimson;">Destiny</b>: Yet here you stand, reaching the stars without permission.`);
            } else {
              simulation.inGameConsole(`<b style="color: crimson;">Destiny</b>: You... per exploitum ad astra.`);
            }
          }, 1500)
        }, 1500);
      };
      me.spin = function() {
        this.torque += 0.000035 * this.inertia;
        const mag = this.radius * 2.5 + 50;
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 3;
        const start = this.position;
        const dir = Vector.normalise(this.burstDir);
        for (let d = 0; d < mag; d += 28) {
          const p = Vector.add(start, Vector.mult(dir, d));
          const angle = Math.atan2(dir.y, dir.x);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-20, -20 * 0.6);
          ctx.lineTo(0, 0);
          ctx.lineTo(-20, 20 * 0.6);
          ctx.stroke();
          ctx.restore();
        }
        if (this.cd < simulation.cycle) {
          this.fill = this.rememberFill;
          this.cd = simulation.cycle + 180 * simulation.CDScale
          this.force = Vector.mult(this.burstDir, this.mass * 0.25);
          this.sometimes = function() {};
        }
      }
      simulation.ephemera.push({
        name: "zen",
        goPast: false,
        do() {
          if (player.position.x < -7500) this.goPast = true;
          if (level.levels[level.onLevel] == "zenith" && me && me.alive) {
            if (this.goPast) {
              ctx.save();
              const x = canvas.width2 / 2;
              const y = canvas.height2 / 10;
              const w = canvas.width2;
              const h = 30;
              ctx.setTransform(1, 0, 0.5, 1, 0, 0);
              ctx.fillStyle = "rgba(40,0,0,0.6)";
              ctx.fillRect(x, y, w, h);
              ctx.fillStyle = "rgb(238, 0, 0)"
              ctx.fillRect(x, y, w * me.health, h);
              ctx.fillStyle = "rgb(240, 100, 100)"
              ctx.fillRect(x + 10, y + 10, w * me.health - 20, h - 20);
              ctx.lineWidth = 5;
              ctx.strokeStyle = "rgb(0, 0, 0)"
              ctx.strokeRect(x, y, w, h);
              ctx.restore();
              ctx.save();
              ctx.setTransform(1, 0, 0, 1, 0, 0);
              ctx.font = "bold 20px monospace";
              ctx.textAlign = "left";
              ctx.lineWidth = 4;
              ctx.strokeStyle = "black";
              ctx.strokeText("Apostle of Destiny", x + 20, y - 10);
              ctx.fillStyle = "rgb(240, 50, 50)";
              ctx.fillText("Apostle of Destiny", x + 20, y - 10);
              ctx.restore()

              if (m.pos.x > -7025 && m.pos.x < 1600 && m.pos.y > -19350 && m.pos.y < 14191 && !(simulation.cycle & 300)) {
                if (!m.checkHeadClear()) {
                  Matter.Body.setPosition(player, {
                    x: -4575,
                    y: -15175
                  })
                }
              }
            }
          } else {
            simulation.removeEphemera(this.name, true);
          }
        },
      })
    }

    function think(brain, mobX, mobY, playerX, playerY, prevTarget, hitRecently) {
      let dx = playerX - mobX;
      let dy = playerY - mobY;
      let distance = Math.hypot(dx, dy);
      let angle = Math.atan2(dy, dx);
      let prevDx = prevTarget.x - mobX;
      let prevDy = prevTarget.y - mobY;
      let inputs = [
        dx / 1500,
        dy / 1500,
        Math.min(1, distance / 1500),
        angle / Math.PI,
        (Date.now() % 2000) / 1000 - 1,
        prevDx / 1500,
        prevDy / 1500,
        hitRecently
      ];
      let hidden = Array(12).fill(0);
      for (let i = 0; i < hidden.length; i++) {
        let sum = brain.b1[i];
        for (let j = 0; j < inputs.length; j++) {
          sum += inputs[j] * brain.w1[j][i];
        }
        hidden[i] = Math.tanh(sum);
      }
      let output = Array(2).fill(0);
      for (let i = 0; i < output.length; i++) {
        let sum = brain.b2[i];
        for (let j = 0; j < hidden.length; j++) {
          sum += hidden[j] * brain.w2[j][i];
        }
        output[i] = Math.tanh(sum);
      }

      return {
        x: mobX + output[0] * 1500,
        y: mobY + output[1] * 1500
      };
    }
  },
  archipelago() {
    simulation.inGameConsole(`<strong>archipelago</strong> by <b style='color: crimson;'>Destiny</b>`);
    level.setPosToSpawn(-12500, 200);
    level.exit.x = 14300;
    level.exit.y = 193;
    spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
    spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
    level.defaultZoom = 1800
    simulation.zoomTransition(level.defaultZoom)
    document.body.style.backgroundColor = "#d8dadf";
    const perlin = (() => {
      const p = new Uint8Array(512);
      for (let i = 0; i < 256; i++) p[i] = p[i + 256] = i;

      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [p[i], p[j]] = [p[j], p[i]];
        p[i + 256] = p[i];
      }

      const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
      const lerp = (a, b, t) => a + t * (b - a);
      const grad = (hash, x) => ((hash & 1) === 0 ? x : -x);

      return function(x) {
        const X = Math.floor(x) & 255;
        x -= Math.floor(x);

        const u = fade(x);

        const a = p[X];
        const b = p[X + 1];

        return lerp(grad(a, x), grad(b, x - 1), u);
      };
    })();
    const water = function(x, y, width, height) {
      return {
        min: {
          x: x,
          y: y
        },
        max: {
          x: x + width,
          y: y + height
        },
        width: width,
        height: height,
        maxHeight: height,
        isOn: true,

        query() {
          if (!this.isOn) return;

          ctx.beginPath();
          ctx.moveTo(this.min.x, this.min.y);

          for (let i = 0; i < this.width; i++) {

            const wave =
              perlin(i * 0.002 + simulation.cycle * 0.01) * 20 +
              perlin(i * 0.006 + simulation.cycle * 0.02) * 8 +
              perlin(i * 0.015 + simulation.cycle * 0.05) * 3;

            ctx.lineTo(
              this.min.x + i,
              this.min.y + wave
            );
          }

          ctx.lineTo(this.min.x + this.width, this.min.y + this.height);
          ctx.lineTo(this.min.x, this.min.y + this.height);

          ctx.fillStyle = "hsla(191, 85%, 64%, 0.72)";
          ctx.fill();

          if (this.height > 0 && Matter.Query.region([player], this).length) {
            if (player.velocity.y > 5) player.force.y -= 0.95 * player.mass * simulation.g
            const slowY = (player.velocity.y > 0) ? Math.max(0.8, 1 - 0.002 * player.velocity.y * player.velocity.y) : Math.max(0.98, 1 - 0.001 * Math.abs(player.velocity.y)) //down : up
            Matter.Body.setVelocity(player, {
              x: Math.max(0.95, 1 - 0.036 * Math.abs(player.velocity.x)) * player.velocity.x,
              y: slowY * player.velocity.y
            });
            player.force.y -= (input.up ? 2 : 0.5) * player.mass * simulation.g;
            player.force.x += ((input.right || input.left) ? (input.left ? -1 : 1) * player.mass * 0.0016 : 0);
          }
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
        },
      }
    }
    const water1 = water(-825, 475, 4600, 2150);
    const water2 = water(5750, 475, 7650, 1750);
    const water3 = water(-14550, 475, 10775, 2125);
    const button = level.button(-3200, -375, 125, true, false);
    const toggle = level.toggle(5025, -3325, false);
    const portal = level.portal({
      x: -11325,
      y: 1988
    }, 0, {
      x: 375,
      y: -11325
    }, Math.PI / 2)
    const gradient = ctx.createRadialGradient(-11834, -17646, 50000, -11834, -17646, 0);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.2, "#ff850110")
    gradient.addColorStop(0.96, "#ff01e733");
    gradient.addColorStop(0.98, "#ff850122");
    gradient.addColorStop(1, "#ff8501");
    level.custom = () => {
      ctx.fillStyle = gradient;
      ctx.fillRect(-14550, -20000, 29075, 22500);
      ctx.beginPath();
      ctx.fillStyle = "#aaaaaa88"
      ctx.moveTo(4000, -3175);
      ctx.lineTo(4050, -2900);
      ctx.lineTo(4250, -2775);
      ctx.lineTo(4250, -2550);
      ctx.lineTo(4450, -2525);
      ctx.lineTo(4325, 0);
      ctx.lineTo(4325, 275);
      ctx.lineTo(4975, 275);
      ctx.lineTo(4950, -2775);
      ctx.lineTo(5125, -2900);
      ctx.lineTo(5175, -3175);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-3200, -2075);
      ctx.lineTo(-2900, -1775);
      ctx.lineTo(-2875, -1650);
      ctx.lineTo(-2375, -1725);
      ctx.lineTo(-2475, -2075);
      ctx.lineTo(-2475, -2125);
      ctx.lineTo(-1325, -2125);
      ctx.lineTo(-1300, 150);
      ctx.lineTo(-3250, 150);
      ctx.lineTo(-3525, -75);
      ctx.lineTo(-3775, -375);
      ctx.lineTo(-3625, -1250);
      ctx.lineTo(-3525, -925);
      ctx.lineTo(-3300, -925);
      ctx.lineTo(-3400, -1150);
      ctx.lineTo(-3475, -1400);
      ctx.lineTo(-3425, -1675);
      ctx.lineTo(-2875, -1650);
      ctx.lineTo(-2900, -1775);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-2625, -2075);
      ctx.lineTo(-2500, -1725);
      ctx.lineTo(-3100, -1675);
      ctx.lineTo(-3125, -1750);
      ctx.lineTo(-2875, -1775);
      ctx.lineTo(-3200, -2075);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(4325, -4475);
      ctx.lineTo(4525, -4125);
      ctx.lineTo(4650, -4350);
      ctx.lineTo(4875, -3975);
      ctx.lineTo(4925, -3275);
      ctx.lineTo(4250, -3275);
      ctx.fill();

      button.query();
      button.queryRemove();
      button.queryPlayer();
      button.draw();

      level.exit.drawAndCheck();

      level.enter.draw();
    };
    level.customTopLayer = () => {
      water1.query();
      water2.query();
      water3.query();
      toggle.query();
      portal[0].draw();
      portal[1].draw();
      portal[2].draw();
      portal[3].draw();
      portal[2].query();
      portal[3].query();

      ctx.beginPath();
      ctx.fillStyle = `rgba(68, 68, 68, ${(toggle.isOn && button.isUp) ? 0.5 : 1})`
      ctx.moveTo(-13000, 400);
      ctx.lineTo(-13000, 575);
      ctx.lineTo(-13225, 575);
      ctx.lineTo(-13225, 2600);
      ctx.lineTo(-8550, 2450);
      ctx.lineTo(-8550, 800);
      ctx.lineTo(-9550, 400);
      ctx.fill();
    };

    spawn.mapRect(-14550, 2300, 29075, 875);
    spawn.mapRect(-4475, 2025, 4450, 425);
    spawn.mapRect(-4050, 150, 3400, 2250);
    spawn.mapRect(-875, 800, 525, 1425);
    spawn.mapRect(-450, 1275, 275, 1050);
    spawn.mapRect(-4300, 950, 425, 1375);
    spawn.mapRect(-4175, 425, 750, 975);
    spawn.mapRect(-5200, 2150, 1200, 250);
    spawn.mapRect(-6925, 2175, 1100, 400);
    spawn.mapRect(-6750, 1850, 600, 450);
    spawn.mapRect(-8300, 2150, 925, 375);
    spawn.mapRect(-10025, 2075, 925, 525);
    spawn.mapRect(-9725, 1850, 1050, 575);
    spawn.mapRect(-8800, 2175, 325, 225);
    spawn.mapRect(-7475, 2225, 800, 200);
    spawn.mapRect(-11600, 2175, 1975, 325);
    spawn.mapRect(-12300, 1825, 925, 650);
    spawn.mapRect(-11550, 2075, 875, 350);
    spawn.mapRect(-13925, 2150, 2075, 300);
    spawn.mapRect(-13200, 2000, 1225, 300);
    spawn.mapRect(-125, 2150, 3275, 225);
    spawn.mapRect(3450, 350, 2450, 2025);
    spawn.mapRect(3075, 2225, 950, 125);
    spawn.mapRect(1275, 1975, 800, 300);
    spawn.mapRect(375, 2075, 1450, 225);
    spawn.mapRect(1975, 2050, 1100, 225);
    spawn.mapRect(3275, 2125, 625, 175);
    spawn.mapRect(3325, 1125, 325, 1125);
    spawn.mapRect(3400, 625, 150, 550);
    spawn.mapRect(5800, 525, 625, 2100);
    spawn.mapRect(6250, 1925, 2700, 475);
    spawn.mapRect(6275, 1600, 950, 575);
    spawn.mapRect(6325, 825, 325, 875);
    spawn.mapRect(8725, 2075, 4125, 500);
    spawn.mapRect(10725, 1900, 2050, 500);
    spawn.mapRect(12525, 1650, 2000, 975);
    spawn.mapRect(12850, 525, 1675, 1575);
    spawn.mapRect(13225, 375, 825, 675);
    spawn.mapRect(13925, 225, 600, 375);
    spawn.mapRect(-12175, 25, 2875, 475);
    spawn.mapRect(-12350, 325, 3350, 400);
    spawn.mapRect(-9400, 200, 225, 200);
    spawn.mapRect(-12725, 250, 1125, 200);
    spawn.mapRect(-12250, 150, 225, 225);
    spawn.mapRect(-12575, 375, 450, 200);
    spawn.mapRect(-9225, 475, 725, 400);
    spawn.mapRect(-2475, -2175, 1200, 100);

    spawn.mapRect(14150, -75, 375, 50);
    spawn.mapRect(14475, -75, 50, 350);
    spawn.mapRect(14150, -75, 50, 150);
    spawn.mapRect(-3525, 125, 2275, 50);
    spawn.mapRect(-3525, -575, 125, 500);
    spawn.mapRect(-3525, -375, 1975, 125);
    spawn.mapRect(-1400, -550, 125, 475);
    spawn.mapRect(-2550, -725, 125, 475);
    spawn.mapRect(-2950, -975, 125, 725);
    spawn.mapRect(-3525, -975, 700, 125);
    spawn.mapRect(-1925, -975, 650, 125);
    spawn.mapRect(-2000, -675, 450, 125);
    spawn.mapRect(-2025, -125, 475, 125);
    spawn.mapRect(-1400, -1675, 125, 825);
    spawn.mapRect(-3525, -1725, 125, 575);
    spawn.mapRect(-3525, -1725, 1175, 125);
    spawn.mapRect(-2475, -1725, 125, 275);
    spawn.mapRect(-2125, -1350, 550, 125);
    spawn.mapRect(-2150, -1725, 500, 125);
    spawn.mapRect(-3500, -1825, 75, 200);
    spawn.mapRect(-3200, -1775, 375, 25);
    spawn.mapRect(-3150, -1775, 50, 75);
    spawn.mapRect(-2925, -1775, 50, 75);
    spawn.mapRect(-2850, -1825, 25, 75);
    spawn.bodyRect(-2925, -1800, 75, 25);
    spawn.mapRect(-3200, -2100, 375, 25);
    spawn.mapRect(-3125, -2125, 350, 50);
    spawn.mapRect(-3000, -2150, 375, 75);
    spawn.mapRect(-2675, -2100, 25, 50);
    spawn.mapRect(-2750, -2100, 25, 50);
    spawn.bodyRect(-2725, -2075, 50, 350);
    spawn.mapRect(-1375, -2150, 75, 550);
    spawn.mapRect(-2550, -375, 125, 375);
    spawn.mapRect(-2950, -125, 125, 300);
    spawn.mapRect(-11800, 0, 2175, 75);
    spawn.mapRect(-3775, -1250, 150, 875);
    spawn.mapRect(-1150, -1275, 150, 925);

    spawn.mapRect(4025, 250, 1325, 175);
    spawn.mapRect(4300, -1350, 200, 1375);
    spawn.mapRect(4800, -1350, 200, 1375);
    spawn.mapRect(4475, -25, 75, 50);
    spawn.mapRect(4750, -200, 75, 50);
    spawn.mapRect(4475, -375, 75, 50);
    spawn.mapRect(4725, -550, 100, 50);
    spawn.mapRect(4475, -825, 100, 50);
    spawn.mapRect(4750, -1125, 100, 50);
    spawn.mapRect(4325, -2600, 175, 1450);
    spawn.mapRect(4800, -2600, 175, 1450);
    spawn.mapRect(4475, -1350, 100, 50);
    spawn.mapRect(4725, -1600, 100, 50);
    spawn.mapRect(4475, -1825, 100, 50);
    spawn.mapRect(4750, -2150, 100, 50);
    spawn.mapRect(4475, -2400, 100, 50);
    spawn.mapRect(4200, -2600, 200, 75);
    spawn.mapRect(4800, -2925, 175, 425);
    spawn.mapRect(4200, -2775, 75, 250);
    spawn.mapRect(4000, -2925, 350, 175);
    spawn.mapRect(4800, -2925, 375, 175);
    spawn.mapRect(4000, -3000, 50, 150);
    spawn.mapRect(5125, -3000, 50, 150);
    spawn.mapRect(4000, -3325, 1175, 175);
    spawn.mapRect(4525, -4350, 125, 825);
    spawn.mapRect(4450, -3975, 275, 100);
    spawn.mapRect(4625, -4175, 50, 500);
    spawn.mapRect(4500, -4175, 50, 500);
    spawn.mapRect(4475, -4050, 50, 250);
    spawn.mapRect(4650, -4050, 50, 250);
    spawn.mapRect(4325, -3675, 50, 375);
    spawn.mapRect(4800, -3675, 50, 375);
    spawn.mapRect(4825, -3950, 175, 800);
    spawn.mapRect(4175, -3950, 175, 800);
    spawn.mapRect(4550, -3075, 75, 75);
    spawn.mapRect(4225, -4475, 100, 850);
    spawn.mapRect(4850, -4475, 100, 850);
    spawn.mapRect(-11475, 1825, 775, 75);
    spawn.mapRect(-11825, 1750, 825, 100);

    spawn.mapRect(-150, -10775, 1125, 250);
    spawn.mapRect(100, -10825, 925, 400);
    spawn.mapRect(725, -10750, 1100, 200);
    spawn.mapRect(525, -10650, 1100, 325);
    spawn.mapRect(125, -11650, 700, 200);
    spawn.mapRect(400, -11525, 600, 125);
    spawn.mapRect(-125, -11550, 450, 150);
    spawn.mapRect(-50, -11450, 350, 100);
    spawn.mapRect(450, -11450, 475, 100);
    spawn.mapRect(2200, -10725, 750, 175);
    spawn.mapRect(2500, -10650, 1200, 150);
    spawn.mapRect(2775, -10750, 1400, 150);
    spawn.mapRect(2575, -10850, 850, 200);
    spawn.mapRect(-1200, -10800, 675, 200);
    spawn.mapRect(-1625, -10725, 900, 250);
    spawn.mapRect(-1425, -10775, 450, 125);
    spawn.mapRect(-2150, -10775, 625, 175);
    spawn.mapRect(-1925, -10650, 800, 125);
    spawn.mapRect(-575, -10750, 350, 125);
    spawn.mapRect(-350, -10700, 350, 125);
    spawn.mapRect(1775, -10700, 625, 200);
    spawn.mapRect(-2200, -11800, 200, 1100);
    spawn.mapRect(-2300, -11100, 200, 325);
    spawn.mapRect(-2275, -11525, 150, 350);
    spawn.mapRect(-2075, -11450, 125, 550);
    spawn.mapRect(4100, -11150, 150, 500);
    spawn.mapRect(3975, -11000, 175, 325);
    spawn.mapRect(4150, -11675, 125, 600);
    spawn.mapRect(3725, -10825, 375, 125);
    spawn.mapRect(-11025, 1875, 225, 100);

    spawn.randomMob(-3325, -175);
    spawn.randomMob(-2750, 0);
    spawn.randomMob(-2375, -175);
    spawn.randomMob(-2075, 50);
    spawn.randomMob(-1825, -200);
    spawn.randomMob(-2325, -475);
    spawn.randomMob(-2675, -750);
    spawn.randomMob(-3325, -1475);
    spawn.randomMob(-3200, -700);
    spawn.randomMob(-3000, -1850);
    spawn.randomMob(-1475, -2000);
    spawn.randomMob(-1825, -1475);
    spawn.randomMob(-1475, -1100);
    spawn.randomMob(-1825, -1100);
    spawn.randomMob(4200, -3025);
    spawn.randomMob(4350, -2675);
    spawn.randomMob(4975, -3025);
    spawn.randomMob(-250, 1200);
    spawn.randomMob(-450, 725);
    spawn.randomMob(650, 1025);
    spawn.randomMob(700, 1625);
    spawn.randomMob(1875, 1600);
    spawn.randomMob(2200, 1250);
    spawn.randomMob(2750, 1250);
    spawn.randomMob(3075, 1725);
    spawn.randomMob(3225, 700);
    spawn.randomMob(7200, 900);
    spawn.randomMob(7950, 1450);
    spawn.randomMob(9575, 1325);
    spawn.randomMob(9900, 875);
    spawn.randomMob(11075, 1450);
    spawn.randomMob(12000, 1075);
    spawn.randomMob(12600, 1300);
    spawn.randomMob(-7300, 800);
    spawn.randomMob(-5800, 775);
    spawn.randomMob(-5450, 1075);
    spawn.randomMob(-11425, -125);
    spawn.randomMob(-10650, -100);
    spawn.randomMob(-10150, -325);
    spawn.randomLevelBoss(-2475, -1075);

    spawn.bodyRect(-3325, -450, 50, 50);
    spawn.bodyRect(-2675, -625, 100, 75);
    spawn.bodyRect(-2000, -1800, 100, 75);
    spawn.bodyRect(-1825, -1475, 75, 125);
    spawn.bodyRect(-3175, -1150, 175, 125);
    spawn.bodyRect(-1925, -800, 125, 75);
    spawn.bodyRect(-2375, -650, 75, 100);
    spawn.bodyRect(-3250, 25, 50, 50);
    spawn.bodyRect(-3825, 100, 50, 50);
    spawn.bodyRect(-1225, -25, 75, 75);
    spawn.bodyRect(-1075, -150, 175, 225);
    spawn.bodyRect(-12125, -150, 75, 75);
    spawn.bodyRect(4275, -2675, 75, 75);

    spawn.debris(-2275, -850, 250, 5);
    spawn.debris(-8925, -50, 250, 5);
    spawn.debris(4100, 100, 250, 5);
    spawn.debris(13600, 150, 250, 5);
    spawn.secondaryBossChance(1250, -11075)
    powerUps.addResearchToLevel()
  },
  vents() {
    simulation.inGameConsole(`<strong>vents</strong> by <b style='color: crimson;'>Richard0820</b>`);
    level.setPosToSpawn(-2300, 592.5);
    level.exit.x = -3062.5;
    level.exit.y = 612.5;
    level.defaultZoom = 1800
    simulation.zoomTransition(level.defaultZoom)
    document.body.style.backgroundColor = "#d8dadf";
    const el0 = level.elevator(3350, 600, 300, 50, -1875);
    const sp1 = level.spinner(1700, -1550, 525, 50);
    const sp2 = level.spinner(850, -1550, 525, 50);
    const mo3 = level.mover(-475, -587.5, 3525, 50);
    const bu0 = level.button(-2350, -575);
    const bu1 = level.button(2700, -2400);
    const ro0 = level.rotor(-8350, -400, 125, 1000, 40, 0, 0.5, 0, -2);
    spawn.mapRect(-3500, 650, 7475, 325);
    spawn.mapRect(-3500, 0, 325, 950);
    spawn.mapRect(-3062.5, 637.5, 100, 25);
    spawn.mapRect(-3500, -2400, 325, 1950);
    spawn.mapRect(-3500, -575, 2475, 125);
    spawn.mapRect(-2850, 0, 1075, 125);
    spawn.mapRect(-2850, 25, 125, 725);
    spawn.mapRect(-2350, 637.5, 100, 25);
    spawn.mapRect(-1525, 0, 1525, 125);
    spawn.mapRect(-7600, -675, 4425, 225);
    spawn.mapRect(-7600, 0, 4425, 225);
    spawn.mapRect(-3500, -2400, 2475, 300);
    spawn.mapRect(-600, -575, 3800, 125);
    spawn.mapRect(650, 0, 2550, 125);
    spawn.mapRect(3050, -1875, 300, 2000);
    spawn.mapRect(3650, -2400, 325, 3375);
    spawn.mapRect(-600, -1150, 125, 700);
    spawn.mapRect(-1900, 325, 375, 125);
    spawn.mapRect(-1900, 0, 125, 450);
    spawn.mapRect(-600, -2400, 4575, 300);
    spawn.mapRect(-7600, 0, 200, 875);
    spawn.mapRect(-9250, 650, 1850, 225);
    spawn.mapRect(-9250, -675, 1850, 225);
    spawn.mapRect(-9250, -675, 200, 1550);
    spawn.mapRect(725, -1175, 1625, 125);
    spawn.mapRect(1475, -1675, 125, 875);
    spawn.mapRect(275, 0, 125, 725);
    spawn.mapRect(3650, -3925, 325, 1825);
    spawn.mapRect(-3500, -3925, 325, 1800);
    spawn.mapRect(0, -2725, 300, 575);
    spawn.mapRect(500, -2725, 1450, 150);
    spawn.mapRect(1825, -3350, 1925, 125);
    spawn.mapRect(-2875, -2750, 1650, 150);
    spawn.mapRect(-2875, -3075, 150, 475);
    spawn.mapRect(-1325, -3650, 300, 1050);
    spawn.mapRect(-3200, -2750, 100, 150);
    spawn.mapRect(1825, -3350, 125, 775);
    spawn.bodyRect(1650, -2900, 175, 175);
    spawn.mapRect(-3500, -3925, 2475, 325);
    spawn.mapRect(-600, -3925, 4575, 325);
    spawn.mapRect(0, 325, 400, 125);
    spawn.mapRect(1700, 0, 125, 425);
    spawn.mapRect(275, -925, 2475, 125);
    spawn.mapRect(-600, -925, 425, 125);
    spawn.bodyRect(2450, -2575, 50, 50);
    spawn.bodyRect(2450, -2675, 50, 50);
    spawn.bodyRect(2450, -2725, 50, 50);
    spawn.bodyRect(-2400, -2975, 725, 175);
    spawn.bodyRect(-2650, -3075, 225, 225);
    spawn.bodyRect(-2025, -850, 575, 275);
    spawn.bodyRect(2575, -1075, 150, 125);
    spawn.bodyRect(1200, -1300, 150, 125);
    spawn.bodyRect(1950, 450, 250, 125);
    spawn.bodyRect(1175, 350, 200, 150);
    spawn.bodyRect(2900, -125, 150, 125);
    spawn.bodyRect(-1425, 400, 450, 250);
    spawn.bodyRect(-2675, -625, 50, 50);
    spawn.bodyRect(-2675, -700, 50, 50);
    spawn.bodyRect(-2675, -775, 50, 50);
    spawn.bodyRect(-1150, -550 - 25, 700, 75, 1, spawn.propsDoor); // door
    body[body.length - 1].isNotHoldable = true;
    body[body.length - 1].collisionFilter.mask = cat.player | cat.body | cat.mob | cat.mobBullet | cat.bullet
    cons[cons.length] = Constraint.create({
      bodyB: body[body.length - 1],
      pointB: {
          x: 300,
          y: 0
      },
      pointA: {
          x: -538, 
          y: -512 - 25
      },
      stiffness: 1,
    });
    Composite.add(engine.world, cons[cons.length - 1]);
    const connector = cons[cons.length] = Constraint.create({
      bodyB: body[body.length - 1],
      pointB: {
        x: -300,
        y: 0
      },
      pointA: {
        x: -1150, 
        y: -525 - 25
      },
      stiffness: 0.5,
    });
    Composite.add(engine.world, cons[cons.length - 1]);
    spawn.randomMob(2275, -2875, Infinity);
    spawn.randomMob(3100, -2925, Infinity);
    spawn.randomMob(3425, -2875, Infinity);
    spawn.randomMob(2900, -2775, Infinity);
    spawn.randomMob(2550, -2575, Infinity);
    spawn.randomMob(1550, -2525, Infinity);
    spawn.randomMob(650, -2475, Infinity);
    spawn.randomMob(1400, -3150, Infinity);
    spawn.randomMob(600, -3075, Infinity);
    spawn.randomMob(-2950, -3175, Infinity);
    spawn.randomMob(-1825, -3250, Infinity);
    spawn.randomMob(-2275, -2500, Infinity);
    spawn.randomMob(-2775, -2475, Infinity);
    spawn.randomMob(-1300, -2450, Infinity);
    spawn.randomMob(1250, -1775, Infinity);
    spawn.randomMob(2400, -1525, Infinity);
    spawn.randomMob(2675, -1075, Infinity);
    spawn.randomMob(1825, -1025, Infinity);
    spawn.randomMob(550, -1025, Infinity);
    spawn.randomMob(-225, -1100, Infinity);
    spawn.randomMob(575, -700, Infinity);
    spawn.randomMob(2400, -675, Infinity);
    spawn.randomMob(-2400, -1150, Infinity);
    spawn.randomMob(-2750, -700, Infinity);
    spawn.randomMob(-1900, -950, Infinity);
    spawn.randomMob(-1225, -725, Infinity);
    spawn.randomMob(-900, 275, Infinity);
    spawn.randomMob(-375, 175, Infinity);
    spawn.randomMob(550, 300, Infinity);
    spawn.randomMob(2000, 250, Infinity);
    spawn.randomMob(1575, 225, Infinity);
    spawn.randomMob(3200, 250, Infinity);
    spawn.randomMob(3200, -2000, Infinity);
    const windStreamers = [];
    function spawnStreamer(x, y, angle = 0) {
      windStreamers.push({
        x: x,
        y: y,
        angle: angle,
        speed: 30 + Math.random() * 2,
        life: 1,
        length: 500 + Math.random() * 300,
        width: 5 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2,
        wobble: 10 + Math.random() * 10
      });
    }
    function drawStreamers() {
      windStreamers.forEach((s, i) => {
        s.life -= 0.02;
        if (s.life <= 0) {
          windStreamers.splice(i, 1);
          return;
        }
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.phase += 0.2;
        ctx.lineWidth = s.width;
        ctx.strokeStyle = `rgba(255,255,255,${s.life})`;
        ctx.beginPath();
        for (let j = 0; j < s.length; j += 5) {
          const t = j / s.length;
          let px = s.x - Math.cos(s.angle) * j;
          let py = s.y - Math.sin(s.angle) * j;
          const perpX = -Math.sin(s.angle);
          const perpY = Math.cos(s.angle);
          const wave = Math.sin(s.phase + t * 6) * s.wobble * (1 - t);
          px += perpX * wave;
          py += perpY * wave;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
    }
    const windZones = [
      {
        bounds: { min: { x: -7500, y: -450 }, max: { x: 3050, y: 0 } },
        force: { x: 0.03, y: 0 }
      },
      {
        bounds: { min: { x: -1025, y: -3600 }, max: { x: -600, y: -200 } },
        force: { x: 0, y: -0.023 }
      }
    ];
    function applyWind(zone, bodies) {
      const list = Matter.Query.region(bodies, zone.bounds);
      for (let b of list) {
        if (b.isStatic) continue;
        b.force.x += zone.force.x * (b.position.x > 650 ? 0.5 : 1);
        b.force.y += zone.force.y;
      }
    }
    level.custom = () => {
      level.exit.drawAndCheck();

      level.enter.draw();

      el0.move();
		  el0.drawTrack();
      mo3.push();
      mo3.draw();
      
      bu0.query();
      bu0.queryRemove();
      bu0.draw();

      bu1.query();
      bu1.queryRemove();
      bu1.draw();
      if (bu1.isUp) {
        windZones[0].bounds.max.x = bu0.isUp ? 3050 : -800;
        applyWind(windZones[0], body);
        applyWind(windZones[0], mob);
        applyWind(windZones[0], bullet);
        applyWind(windZones[0], powerUp);
        applyWind(windZones[0], [player]);
        if (!bu0.isUp) {
          applyWind(windZones[1], body);
          applyWind(windZones[1], mob);
          applyWind(windZones[1], bullet);
          applyWind(windZones[1], powerUp);
          applyWind(windZones[1], [player]);
        }
        if (Math.random() < 0.1) spawnStreamer( -7500 + Math.random() * (bu0.isUp ? 10000 : 6400), -300 + Math.random() * 200, 0);
        if (!bu0.isUp && Math.random() < 0.1) spawnStreamer(-1000 + Math.random() * 400, -3700 + Math.random() * 3000, -Math.PI / 2);
        ro0.rotate();
      }
      connector.pointA = {
        x: (bu0.isUp ? -1150 : -1000), 
        y: (bu0.isUp ? -550 : 100)
      }
    };
    level.customTopLayer = () => {
      if(bu1.isUp) {
        if(bu0.isUp) {
            ctx.fillStyle = "rgba(180,200,255, 0.2)"
            ctx.fillRect(-7500, -450, 10675, 450);
        } else {
            ctx.beginPath();
            ctx.fillStyle = "rgba(180,200,255, 0.2)"
            ctx.moveTo(-7500, 0);
            ctx.lineTo(-925, 0);
            ctx.lineTo(-600, -450);
            ctx.lineTo(-600, -3800);
            ctx.lineTo(-1025, -3800);
            ctx.lineTo(-1025, -450);
            ctx.lineTo(-7500, -450);
            ctx.fill();
        }
      }
      drawStreamers();
    };
    spawn.randomLevelBoss(472, -1403);
    spawn.secondaryBossChance(-2056, -3178);
    powerUps.addResearchToLevel();
},
}