//global player variables for use in matter.js physics
setTimeout(() => {
  fileLoads.isPlayerJS = true; //for file handling in fileTester.js
}, 10);

let player, jumpSensor, playerBody, playerHead, headSensor;
// player Object Prototype *********************************************
const m = {
  spawn() {
    //load player in matter.js physic engine
    // let vector = Vertices.fromPath("0 40  50 40   50 115   0 115   30 130   20 130"); //player as a series of vertices
    let vertices = Vertices.fromPath("0,40, 50,40, 50,115, 30,130, 20,130, 0,115, 0,40"); //player as a series of vertices
    playerBody = Bodies.fromVertices(0, 0, vertices);
    jumpSensor = Bodies.rectangle(0, 46, 36, 6, {       //(0, 46, 50, 6, { //for wall jumping
      //this sensor check if the player is on the ground to enable jumping
      sleepThreshold: 99999999999,
      isSensor: true
    });
    vertices = Vertices.fromPath("16 -82  2 -66  2 -37  43 -37  43 -66  30 -82");
    playerHead = Bodies.fromVertices(0, -55, vertices); //this part of the player lowers on crouch
    headSensor = Bodies.rectangle(0, -57, 48, 45, {
      //senses if the player's head is empty and can return after crouching
      sleepThreshold: 99999999999,
      isSensor: true
    });
    player = Body.create({
      //combine jumpSensor and playerBody
      parts: [playerBody, playerHead, jumpSensor, headSensor],
      inertia: Infinity, //prevents player rotation
      friction: 0.002,
      frictionAir: 0.001,
      //frictionStatic: 0.5,
      restitution: 0,
      sleepThreshold: Infinity,
      collisionFilter: {
        group: 0,
        category: cat.player,
        mask: cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield
      },
      scale: 1, //can be shrunk, used in drawing and placing bullets/laser/field
    });
    Matter.Body.setMass(player, m.mass);
    Composite.add(engine.world, [player]);
  },
  cycle: 600, //starts at 600 cycles instead of 0 to prevent bugs with m.history
  lastKillCycle: 0,
  lastHarmCycle: 0,
  width: 50,
  radius: 30,
  wasFootOnGround: false, //used to check if player was on ground last cycle
  eyeFillColor: null,
  fillColor: null, //set by setFillColors
  fillColorDark: null, //set by setFillColors
  bodyGradient: null, //set by setFillColors
  color: {
    hue: 0,
    sat: 0,
    light: 100,
  },
  setFillColors() {
    m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
    m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 25}%)`
    let grd = ctx.createLinearGradient(-30, 0, 30, 0);
    grd.addColorStop(0, m.fillColorDark);
    grd.addColorStop(1, m.fillColor);
    m.bodyGradient = grd
  },
  // setFillColorsAlpha(alpha = 0.5) {
  //     m.fillColor = `hsla(${m.color.hue},${m.color.sat}%,${m.color.light}%,${alpha})`
  //     m.fillColorDark = `hsla(${m.color.hue},${m.color.sat}%,${m.color.light - 25}%,${alpha})`
  //     let grd = ctx.createLinearGradient(-30, 0, 30, 0);
  //     grd.addColorStop(0, m.fillColorDark);
  //     grd.addColorStop(1, m.fillColor);
  //     m.bodyGradient = grd
  // },
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
  jumpForce: 0.42,
  setMovement() {
    m.Fx = tech.baseFx * m.fieldFx * m.squirrelFx / player.mass //base player mass is 5
    m.jumpForce = tech.baseJumpForce * m.fieldJump * m.squirrelJump / player.mass / player.mass //base player mass is 5
    if (tech.isFastTime) {
      m.Fx *= Math.pow(1.5, tech.fasterTime);
      m.jumpForce *= Math.pow(1.13, tech.fasterTime);
    }
    if (tech.isFastAir) {
      m.FxAir *= Math.pow(1.5, tech.fasterAir)
      if (((m.fieldMode === 0) || (m.fieldMode === 11)) && (m.coupling > 0)) {
        m.FxAir *= 1 + Math.abs(Math.log(m.coupling + 1)) / 5;
      }
    }
    if (((m.fieldMode === 0) || (m.fieldMode === 11)) && (m.coupling > 0)) {
      m.Fx *= 1 + Math.abs(Math.log(m.coupling + 1)) / 5;
      m.jumpForce *= 1 + Math.abs(Math.log(m.coupling + 1)) / 7;
    }
  },
  FxAir: 0.016, // 0.4/5/5  run Force in Air
  yOff: 70,
  yOffGoal: 70,
  onGround: false, //checks if on ground or in air
  lastOnGroundCycle: 0, //use to calculate coyote time
  coyoteCycles: 5,
  hardLanding: 130,
  squirrelFx: 1,
  squirrelJump: 1,
  velocitySmooth: { x: 0, y: 0 },//use for drawing skin's velocity gel tail
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
  yPosDifference: 24.2859, //player.position.y - m.pos.y  //24.285923217549026
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
  oldFootY: 0,
  legLength1: 55,
  legLength2: 45,
  transX: 0,
  transY: 0,
  history: new Array(600), //[], //tracks the last second of player position
  rewindCount: 0, //used with CPT
  resetHistory() {
    const set = {
      position: {
        x: player.position.x,
        y: player.position.y,
      },
      velocity: {
        x: player.velocity.x,
        y: player.velocity.y
      },
      yOff: m.yOff,
      angle: m.angle,
      health: m.health,
      energy: m.energy,
      activeGun: b.activeGun
    }
    for (let i = 0; i < 600; i++) { //reset history
      m.history[i] = set
    }
  },
  move() {
    m.pos.x = player.position.x;
    m.pos.y = playerBody.position.y - m.yOff;
    if (player.scale !== 1) m.pos.y += m.yOff * (1 - player.scale)// adjusts m.pos due to the new scale for drawing and for other various m.pos.y uses 
    m.Vx = (simulation.isChatMenuOpen ? 0 : player.velocity.x);
    m.Vy = (simulation.isChatMenuOpen ? 0 : player.velocity.y);

    //tracks the last 10s of player information
    m.history.splice(m.cycle % 600, 1, {
      position: {
        x: player.position.x,
        y: player.position.y,
      },
      velocity: {
        x: player.velocity.x,
        y: player.velocity.y
      },
      yOff: m.yOff,
      angle: m.angle,
      health: m.health,
      energy: m.energy,
      activeGun: b.activeGun
    });
    // const back = 59  // 59 looks at 1 second ago //29 looks at 1/2 a second ago
    // historyIndex = (m.cycle - back) % 600
  },
  transSmoothX: 0,
  transSmoothY: 0,
  lastGroundedPositionY: 0,
  // mouseZoom: 0,
  lookSmoothing: 0.07, //1 is instant jerky,  0.001 is slow smooth zoom, 0.07 is standard
  look() { }, //set to lookDefault()
  lookDefault() {
    //always on mouse look
    m.angle = Math.atan2(simulation.mouseInGame.y - m.pos.y, simulation.mouseInGame.x - m.pos.x);
    //smoothed mouse look translations
    const scale = 0.8;
    m.transSmoothX = canvas.width2 - m.pos.x - (simulation.mouse.x - canvas.width2) * scale
    m.transSmoothY = canvas.height2 - m.pos.y - (simulation.mouse.y - canvas.height2) * scale

    m.transX += (m.transSmoothX - m.transX) * m.lookSmoothing;
    m.transY += (m.transSmoothY - m.transY) * m.lookSmoothing;
  },
  doCrouch() {
    if (!m.crouch) {
      m.crouch = true;
      m.yOffGoal = m.yOffWhen.crouch;
      if ((playerHead.position.y - player.position.y) < 0) {
        Matter.Body.setPosition(playerHead, { x: player.position.x, y: player.position.y + 9.1740767 * player.scale })
      }
    }
  },
  undoCrouch() {
    if (m.crouch) {
      m.crouch = false;
      m.yOffGoal = m.yOffWhen.stand;
      if ((playerHead.position.y - player.position.y) > 0) {
        Matter.Body.setPosition(playerHead, { x: player.position.x, y: player.position.y - 30.28592321 * player.scale })
      }
    }
  },
  hardLandCD: 0,
  hardLandCDScale: 1,
  checkHeadClear() {
    if (Matter.Query.collides(headSensor, map).length > 0) {
      return false
    } else {
      return true
    }
  },
  buttonCD_jump: 0, //cool down for player buttons
  jump() {
    m.buttonCD_jump = m.cycle; //can't jump again until 20 cycles pass
    //apply a fraction of the jump force to the body the player is jumping off of
    Matter.Body.applyForce(m.standingOn, m.pos, { x: 0, y: m.jumpForce * 0.12 * Math.min(m.standingOn.mass, 5) });
    player.force.y = -m.jumpForce; //player jump force
    Matter.Body.setVelocity(player, { //zero player y-velocity for consistent jumps
      x: player.velocity.x,
      y: Math.max(-10, Math.min(m.standingOn.velocity.y, 10)) //cap velocity contribution from blocks you are standing on to 10 in the vertical
    });
  },
  moverX: 0, //used to tell the player about moving platform x velocity
  groundControl() {
    //check for crouch or jump
    if (m.crouch) {
      if (!(input.down) && m.checkHeadClear() && m.hardLandCD < m.cycle) m.undoCrouch();
    } else if (input.down || m.hardLandCD > m.cycle) {
      m.doCrouch(); //on ground && not crouched and pressing s or down
    } else if (input.up && m.buttonCD_jump + 20 < m.cycle) {
      m.jump()
    }
    const moveX = player.velocity.x - m.moverX //account for mover platforms
    if (input.left) {
      if (moveX > -2) {
        player.force.x -= m.Fx * 1.5
      } else {
        player.force.x -= m.Fx
      }
    } else if (input.right) {
      if (moveX < 2) {
        player.force.x += m.Fx * 1.5
      } else {
        player.force.x += m.Fx
      }
    } else {
      const stoppingFriction = 0.92; //come to a stop if no move key is pressed
      Matter.Body.setVelocity(player, { x: m.moverX * 0.08 + player.velocity.x * stoppingFriction, y: player.velocity.y * stoppingFriction });
    }

    if (Math.abs(moveX) > 4) { //come to a stop if fast     // if (player.speed > 4) { //come to a stop if fast 
      const stoppingFriction = (m.crouch) ? 0.65 : 0.89; // this controls speed when crouched
      Matter.Body.setVelocity(player, { x: m.moverX * (1 - stoppingFriction) + player.velocity.x * stoppingFriction, y: player.velocity.y * stoppingFriction });
    }
    m.moverX = 0 //reset the level mover offset
  },
  airControl() {
    //check for coyote time jump
    if (input.up && m.buttonCD_jump + 20 < m.cycle && m.lastOnGroundCycle + m.coyoteCycles > m.cycle) m.jump()

    //check for short jumps   //moving up   //recently pressed jump  //but not pressing jump key now
    if (m.buttonCD_jump + 60 > m.cycle && !(input.up) && m.Vy < 0) {
      Matter.Body.setVelocity(player, { x: player.velocity.x, y: player.velocity.y * 0.94 }); //reduce player y-velocity every cycle
    }

    if (input.left) {
      if (player.velocity.x > -m.airSpeedLimit / player.mass / player.mass) player.force.x -= m.FxAir; // move player   left / a
    } else if (input.right) {
      if (player.velocity.x < m.airSpeedLimit / player.mass / player.mass) player.force.x += m.FxAir; //move player  right / d
    }
  },
  printBlock() {
    const sides = Math.floor(4 + 6 * Math.random() * Math.random())
    body[body.length] = Matter.Bodies.polygon(m.pos.x, m.pos.y, sides, 8, {
      friction: 0.05,
      frictionAir: 0.001,
      collisionFilter: { category: 0, mask: 0 }, //no collision because player is holding
      classType: "body",
      isPrinted: true,
      radius: 10, //used to grow and warp the shape of the block
      density: 0.002, //double density for 2x damage
    });
    const who = body[body.length - 1]
    Composite.add(engine.world, who); //add to world
    m.throwCharge = 4;
    m.holdingTarget = who
    m.isHolding = true;
    m.fieldUpgrades[4].endoThermic(0.6)
  },
  alive: false,
  isSwitchingWorlds: false,
  switchWorlds(giveTech = "") {
    let stunning = tech.isStunRealities;
    if (!m.isSwitchingWorlds) {
      let totalTech = 0;
      for (let i = tech.tech.length - 1; i > -1; i--) {
        if (tech.tech[i].count > 0 && !tech.tech[i].isLore && !tech.tech[i].isNonRefundable && !tech.tech[i].isAltRealityTech) {
          totalTech += tech.tech[i].count
        }
      }
      powerUps.boost.endCycle = 0
      simulation.isTextLogOpen = false; //prevent console spam
      tech.resetAllTech()
      if (stunning) tech.giveTech("Breaking the 4th wall")
      if (giveTech) tech.giveTech(giveTech) //give many worlds back

      //remove all bullets
      for (let i = 0; i < bullet.length; ++i) Matter.Composite.remove(engine.world, bullet[i]);
      bullet = [];

      //randomize
      powerUps.research.count = Math.floor(powerUps.research.count * (0.5 + 1.5 * Math.random()))
      m.coupling = Math.floor(m.coupling * (0.5 + 1.5 * Math.random()))
      //randomize health
      m.health = m.health * (1 + 0.5 * (Math.random() - 0.5))
      if (m.health > 1) m.health = 1;
      //randomize field
      m.setField(Math.ceil(Math.random() * (m.fieldUpgrades.length - 1)))
      //removes guns and ammo  
      b.inventory = [];
      b.activeGun = null;
      b.inventoryGun = 0;
      for (let i = 0, len = b.guns.length; i < len; ++i) {
        b.guns[i].have = false;
        if (b.guns[i].ammo !== Infinity) {
          b.guns[i].ammo = 0;
          b.guns[i].ammoPack = b.guns[i].defaultAmmoPack;
        }
      }
      //give random guns
      // const totalGuns = 1 + Math.floor(b.inventory.length * (0.5 + 1.5 * Math.random()))
      const totalGuns = 1 + Math.floor(Math.random() * Math.random() * 7)
      for (let i = 0; i < totalGuns; i++) b.giveGuns()

      //randomize ammo based on ammo/ammoPack count
      for (let i = 0, len = b.inventory.length; i < len; i++) {
        if (b.guns[b.inventory[i]].ammo !== Infinity) b.guns[b.inventory[i]].ammo = Math.floor(b.guns[b.inventory[i]].ammo * (0.25 + Math.random() + Math.random() + Math.random()))
      }

      let loop = () => {
        if (!(m.cycle % 10)) {
          if (stunning) {
            for (let i = 0; i < mob.length; i++) mobs.statusStun(mob[i], 300)
          }
          if (totalTech > 0 && m.alive) {
            totalTech--
            let options = [];
            for (let i = 0, len = tech.tech.length; i < len; i++) {
              if (tech.tech[i].count < tech.tech[i].maxCount && tech.tech[i].allowed() && !tech.tech[i].isBadRandomOption && !tech.tech[i].isLore && !tech.tech[i].isJunk) {
                for (let j = 0; j < tech.tech[i].frequency; j++) options.push(i);
              }
            }
            if (options.length > 0) tech.giveTech(options[Math.floor(Math.random() * options.length)]) //add a new tech from options pool
            requestAnimationFrame(loop);
          } else {
            m.isSwitchingWorlds = false
          }
        } else if (m.alive) {
          requestAnimationFrame(loop);
        } else {
          m.isSwitchingWorlds = false
        }
      }
      requestAnimationFrame(loop);

      b.respawnBots();
      // for (let i = 0; i < randomBotCount; i++) b.randomBot()
      simulation.makeGunHUD(); //update gun HUD
      simulation.updateTechHUD();
      m.displayHealth();
      simulation.isTextLogOpen = true;
      m.drop();
      if (simulation.paused) build.pauseGrid() //update the build when paused
    }
  },
  death() {
    if (tech.isPeriodicRealitySwitch) clearInterval(realitySwitchClock); //stop quantum leaping
    if (tech.isImmortal) { //if player has the immortality buff, spawn on the same level with randomized damage
      //remove immortality tech
      // for (let i = 0; i < tech.tech.length; i++) {
      //     if (tech.tech[i].name === "quantum immortality") tech.removeTech(i)
      // }

      m.setMaxHealth()
      m.health = 1;
      // m.addHealth(1)

      simulation.wipe = function () { //set wipe to have trails
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      level.isFlipped = false
      simulation.clearNow = true; //triggers a map reset

      m.switchWorlds("quantum immortality")
      const swapPeriod = 1000
      for (let i = 0, len = 5; i < len; i++) {
        setTimeout(function () {
          simulation.wipe = function () { //set wipe to have trails
            ctx.fillStyle = "rgba(255,255,255,0)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          // simulation.clearNow = true; //triggers a map reset
          // m.switchWorlds()
          simulation.isTextLogOpen = true;
          simulation.inGameConsole(`simulation.amplitude <span class='color-symbol'>=</span> 0.${len - i - 1}`, swapPeriod);
          simulation.isTextLogOpen = false;
          simulation.wipe = function () { //set wipe to have trails
            ctx.fillStyle = `rgba(255,255,255,${(i + 1) * (i + 1) * 0.006})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }, (i + 1) * swapPeriod);
      }
      setTimeout(function () {
        simulation.wipe = function () { //set wipe to normal
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        simulation.isTextLogOpen = true;
        simulation.inGameConsole("simulation.amplitude <span class='color-symbol'>=</span> null");
        tech.isImmortal = false //disable future immortality
      }, 6 * swapPeriod);
    } else if (m.alive) { //normal death code here            
      m.storeTech()
      m.alive = false;
      simulation.paused = true;
      m.health = 0;
      simulation.ephemera = []
      document.getElementById("defense-bar").style.display = "none"; //hide defense
      document.getElementById("damage-bar").style.display = "none"
      m.displayHealth();
      document.getElementById("text-log").style.display = "none"
      document.getElementById("fade-out").style.opacity = 0.9; //slowly fade to 90% white on top of canvas
      setTimeout(function () {
        Composite.clear(engine.world);
        Engine.clear(engine);
        simulation.splashReturn();
      }, 5000);
    }
  },
  storeTech() { //store a copy of your tech,  it will show up at your location next run in the entanglement power up
    if (localSettings.isAllowed && !simulation.isCheating) {
      const gunList = [] //store gun names
      for (i = 0, len = b.inventory.length; i < len; i++) gunList.push(b.inventory[i])
      const techList = [] //store tech names
      for (let i = 0; i < tech.tech.length; i++) {
        if (tech.tech[i].count > 0 && !tech.tech[i].isNonRefundable) techList.push(tech.tech[i].name)
      }
      if (techList.length) {
        localSettings.entanglement = {
          fieldIndex: m.fieldMode,
          gunIndexes: gunList,
          techIndexes: techList,
          position: {
            x: m.pos.x,
            y: m.pos.y
          },
          levelName: level.levels[level.onLevel],
          isHorizontalFlipped: simulation.isHorizontalFlipped
        }
        if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
      }
    }
  },
  health: 0,
  maxHealth: 1, //set in simulation.reset()
  drawHealth() {
    if (m.health < 1) {
      ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
      ctx.fillRect(m.pos.x - m.radius, m.pos.y - 50, 60, 10);
      ctx.fillStyle = "#f00";
      ctx.fillRect(
        m.pos.x - m.radius,
        m.pos.y - 50,
        60 * m.health,
        10
      );
    }
  },
  displayHealth() {
    id = document.getElementById("health");
    // health display is a x^1.5 rule to make it seem like the player has lower health 
    id.style.width = Math.floor(300 * m.maxHealth * Math.pow(Math.max(0, m.health) / m.maxHealth, 1.4)) + "px";
    if (m.health < 0) {
      id.style.borderRightColor = "#f00"
    } else {
      id.style.borderRightColor = "rgb(51, 162, 125)"
    }
    //css animation blink if health is low
    // if (m.health < 0.3) {
    //     id.classList.add("low-health");
    // } else {
    //     id.classList.remove("low-health");
    // }
  },
  addHealth(heal) {
    if (!tech.isEnergyHealth) {
      m.health += heal * simulation.healScale * (level.isLowHeal ? 0.5 : 1);
      if (m.health > m.maxHealth) m.health = m.maxHealth;
      m.displayHealth();
    }
  },
  baseHealth: 1,
  setMaxHealth(isMessage) {
    m.maxHealth = m.baseHealth + tech.extraMaxHealth + 5 * tech.isFallingDamage
    if (tech.isFlipFlop && tech.isFlipFlopOn && tech.isFlipFlopHealth) m.maxHealth += 4
    m.maxHealth /= m.fieldUpgrades[1].energyHealthRatio
    if (level.isReducedHealth) {
      level.reducedHealthLost = Math.max(0, m.health - m.maxHealth * 0.5)
      m.maxHealth *= 0.5
    }
    document.getElementById("health-bg").style.width = `${Math.floor(300 * m.maxHealth)}px`
    document.getElementById("defense-bar").style.width = Math.floor(300 * m.maxHealth * (1 - m.defense())) + "px";

    if (isMessage) simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-h'>maxHealth</span> <span class='color-symbol'>=</span> ${m.maxHealth.toFixed(2)}`)
    if (m.health > m.maxHealth) m.health = m.maxHealth;
    m.displayHealth();
  },
  defaultFPSCycle: 0, //tracks when to return to normal fps
  immuneCycle: 0, //used in engine
  immuneBoostCouple: 1, //calculated by coupling, if correct field
  lastCalculatedDamage: 0, //used to decided if damage bar needs to be redrawn  (in simulation.checks)
  lastCalculatedDefense: 0, //used to decided if defense bar needs to be redrawn  (in simulation.checks)
  damageDone: 1,
  damageReduction: 1,
  defense() {
    let dmg = m.damageReduction * powerUps.difficulty.damageReduction
    if (tech.energyDefense && m.energy > 1.99) dmg *= 0.1
    if (powerUps.boost.isDefense && powerUps.boost.endCycle > simulation.cycle) dmg *= 0.3
    if (tech.isMaxHealthDefense && (m.health === m.maxHealth || (tech.isEnergyHealth && m.energy > m.maxEnergy - 0.01))) dmg *= 0.1
    if (tech.isDiaphragm) dmg *= 0.55 + 0.35 * Math.sin(m.cycle * 0.0075);
    if (tech.isHarmDarkMatter) dmg *= (tech.isMoveDarkMatter || tech.isNotDarkMatter) ? 0.25 : 0.4
    if (tech.isAnthropicDefense && tech.isDeathAvoidedThisLevel) dmg *= 0.37
    if (tech.isImmortal) dmg *= 0.7
    if (m.fieldMode === 0 || m.fieldMode === 3) dmg *= 0.973 ** m.coupling
    if (tech.isHarmReduceNoKill && m.lastKillCycle + 300 < m.cycle) dmg *= 0.3
    if (tech.isAddBlockMass && m.isHolding) dmg *= 0.1
    if (tech.isSpeedHarm && (tech.speedAdded + player.speed) > 0.1) dmg *= 1 - Math.min((tech.speedAdded + player.speed) * 0.01583, 0.95) //capped at speed of 55
    if (tech.isHarmReduce && input.field) dmg *= 0.1
    if (tech.isNeutronium && input.field && m.fieldCDcycle < m.cycle) dmg *= 0.05
    if (tech.isBotArmor) dmg *= 0.96 ** b.totalBots()
    if (tech.isHarmArmor && m.lastHarmCycle + 600 > m.cycle) dmg *= 0.4;
    if (tech.isNoFireDefense && m.cycle > m.fireCDcycle + 120) dmg *= 0.3
    if (tech.isTurret && m.crouch) dmg *= 0.3;
    if (tech.isFirstDer && b.inventory[0] === b.activeGun) dmg *= 0.85 ** b.inventory.length
    if (tech.isSniperDefense && tech.haveGunCheck("sniper")) dmg *= 0.75
    // if (tech.isLowHealthDefense) dmg *= Math.pow(0.3, Math.max(0, (tech.isEnergyHealth ? m.maxEnergy - m.energy : m.maxHealth - m.health)))
    if (tech.isLowHealthDefense) dmg *= Math.pow(0.2, Math.max(0, 1 - (tech.isEnergyHealth ? m.energy / m.maxEnergy : m.health / m.maxHealth)))
    if (tech.isRemineralize) {
      //reduce mineral percent based on time since last check
      const seconds = (simulation.cycle - tech.mineralLastCheck) / 60
      tech.mineralLastCheck = simulation.cycle
      tech.mineralDamage = 1 + (tech.mineralDamage - 1) * Math.pow(0.9, seconds);
      tech.mineralDamageReduction = 1 - (1 - tech.mineralDamageReduction) * Math.pow(0.9, seconds);
      dmg *= tech.mineralDamageReduction
    }
    if (tech.isInPilot && m.fieldOn && Vector.magnitude(Vector.sub(m.fieldPosition, m.pos)) < m.fieldRadius + 100) dmg *= 0.1
    // return tech.isEnergyHealth ? Math.pow(dmg, 0.7) : dmg //defense has less effect
    // dmg *= m.fieldHarmReduction
    return dmg * m.fieldHarmReduction
  },
  rewind(steps) { // m.rewind(Math.floor(Math.min(599, 137 * m.energy)))
    if (tech.isRewindGrenade) {
      const immunityDuration = 50
      const immunityCycle = m.cycle + immunityDuration + 10 + tech.isPetalsExplode * 30 + tech.isCircleExplode * 21
      if (m.immuneCycle < immunityCycle) m.immuneCycle = immunityCycle; //player is immune to damage until after grenades might explode...

      for (let i = 1, len = Math.floor(4 + steps / 40); i < len; i++) {
        b.grenade(Vector.add(m.pos, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) }), -i * Math.PI / len) //fire different angles for each grenade
        const who = bullet[bullet.length - 1]

        if (tech.isNeutronBomb) {
          Matter.Body.setVelocity(who, { x: who.velocity.x * 0.3, y: who.velocity.y * 0.3 });
        } else if (tech.isVacuumBomb) {
          Matter.Body.setVelocity(who, { x: who.velocity.x * 0.5, y: who.velocity.y * 0.5 });
          who.endCycle = simulation.cycle + immunityDuration

        } else if (tech.isRPG) {
          who.endCycle = simulation.cycle + 10
        } else {
          Matter.Body.setVelocity(who, { x: who.velocity.x * 0.5, y: who.velocity.y * 0.5 });
          who.endCycle = simulation.cycle + immunityDuration
        }
      }
    }

    let history = m.history[(m.cycle - steps) % 600]
    Matter.Body.setPosition(player, history.position);
    Matter.Body.setVelocity(player, { x: history.velocity.x, y: history.velocity.y });
    m.yOff = history.yOff
    if (m.yOff < 48) {
      m.doCrouch()
    } else {
      m.undoCrouch()
    }

    // b.activeGun = history.activeGun
    // for (let i = 0; i < b.inventory.length; i++) {
    //     if (b.inventory[i] === b.activeGun) b.inventoryGun = i
    // }
    // simulation.updateGunHUD();
    // simulation.boldActiveGunHUD();

    // move bots to player's new position
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
    m.energy = Math.max(m.energy - steps / 330, 0.01)
    if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles

    let isDrawPlayer = true
    const shortPause = function () {
      if (m.defaultFPSCycle < m.cycle) { //back to default values
        simulation.fpsCap = simulation.fpsCapDefault
        simulation.fpsInterval = 1000 / simulation.fpsCap;
        document.getElementById("dmg").style.transition = "opacity 1s";
        document.getElementById("dmg").style.opacity = "0";
      } else {
        requestAnimationFrame(shortPause);
        if (isDrawPlayer) {
          isDrawPlayer = false
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          ctx.translate(canvas.width2, canvas.height2); //center
          ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
          ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
          for (let i = 1; i < steps; i++) {
            history = m.history[(m.cycle - i) % 600]
            m.pos.x = history.position.x
            m.pos.y = history.position.y + m.yPosDifference - history.yOff
            m.yOff = history.yOff
            m.draw();
          }
          ctx.restore();
          m.resetHistory()
        }
      }
    };

    if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
    simulation.fpsCap = 3 //1 is longest pause, 4 is standard
    simulation.fpsInterval = 1000 / simulation.fpsCap;
    m.defaultFPSCycle = m.cycle
    if (tech.isRewindBot) {
      const len = steps * 0.05 * tech.isRewindBot
      const botStep = Math.floor(steps / len)
      for (let i = 0; i < len; i++) {
        const where = m.history[Math.abs(m.cycle - i * botStep) % 600].position //spread out spawn locations along past history
        b.randomBot({
          x: where.x + 20 * (Math.random() - 0.5),
          y: where.y + 20 * (Math.random() - 0.5)
        }, false, false)
        bullet[bullet.length - 1].endCycle = simulation.cycle + 440 + Math.floor(120 * Math.random()) //8-10 seconds
      }
    }
  },
  collisionImmuneCycles: 30,
  takeDamage(dmg, isDefense = true) {
    if (tech.isRewindAvoidDeath && (m.energy + 0.05) > Math.min(0.95, m.maxEnergy) && dmg > 0.01) {
      const steps = Math.floor(Math.min(299, 150 * m.energy))
      simulation.inGameConsole(`<span class='color-var'>m</span>.rewind(${steps})`)
      m.rewind(steps)
      return
    }
    m.lastHarmCycle = m.cycle
    if (tech.isDroneOnDamage && bullet.length < 180) { //chance to build a drone on damage from tech
      const len = Math.min((dmg - 0.045 * Math.random()) * 95, 65) / tech.droneEnergyReduction * (tech.isEnergyHealth ? 0.5 : 1)
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) b.drone({
          x: m.pos.x + 30 * Math.cos(m.angle) + 100 * (Math.random() - 0.5),
          y: m.pos.y + 30 * Math.sin(m.angle) + 100 * (Math.random() - 0.5)
        }) //spawn drone
      }
      m.fieldUpgrades[4].endoThermic(Math.min(5 * dmg, 1))
    }
    if (tech.isEnergyHealth) {
      if (isDefense) dmg *= Math.pow(m.defense(), 0.6)
      m.energy -= dmg //scale damage with heal reduction difficulty
      if (m.energy < 0 || isNaN(m.energy)) { //taking deadly damage
        if (tech.isDeathAvoid && powerUps.research.count &&
          ((tech.deathsAvoidedThisLevel || 0) < (tech.isAnthropicExtended + 1 || 1))) {
          let avoids = tech.deathsAvoidedThisLevel
          if (!avoids || isNaN(avoids) || !isFinite(avoids) || avoids < 0) tech.deathsAvoidedThisLevel = 0 //if NaN, set to zero
          tech.deathsAvoidedThisLevel++
          powerUps.research.changeRerolls(-1)
          simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-r'>research</span><span class='color-symbol'>--</span><br>${powerUps.research.count}`)
          for (let i = 0; i < 22 - 3 * (tech.isAnthropicExtended || 0); i++) powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "heal", false);
          m.energy = m.maxEnergy + 0.1
          if (m.immuneCycle < m.cycle + 300) m.immuneCycle = m.cycle + 300 //disable this.immuneCycle bonus seconds
          simulation.wipe = function () { //set wipe to have trails
            ctx.fillStyle = "rgba(255,255,255,0.03)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          if (tech.isSounds) {
            audioPlayer.requestSound('Death Prevented');
          }
          setTimeout(function () {
            simulation.wipe = function () { //set wipe to normal
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }, 3000);
        } else { //death
          m.health = 0;
          m.energy = 0;
          m.death();
        }
        return;
      }
    } else {
      if (isDefense) dmg *= m.defense()
      m.health -= dmg;
      if (m.health < 0 || isNaN(m.health)) {
        if (tech.isDeathAvoid && powerUps.research.count > 0 &&
          ((tech.deathsAvoidedThisLevel || 0) < (tech.isAnthropicExtended + 1 || 1))) { //&& Math.random() < 0.5
          tech.deathsAvoidedThisLevel++
          m.health = 0.05
          powerUps.research.changeRerolls(-1)
          simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-r'>research</span><span class='color-symbol'>--</span><br>${powerUps.research.count}`)
          for (let i = 0; i < 16 - 3 * (tech.isAnthropicExtended || 0); i++) powerUps.spawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "heal", false);
          if (m.immuneCycle < m.cycle + 300) m.immuneCycle = m.cycle + 300 //disable this.immuneCycle bonus seconds
          simulation.wipe = function () { //set wipe to have trails
            ctx.fillStyle = "rgba(255,255,255,0.03)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          if (tech.isSounds) {
            audioPlayer.requestSound('Death Prevented');
          }
          setTimeout(function () {
            simulation.wipe = function () { //set wipe to normal
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }, 3000);
        } else if (tech.isNoDeath) {
          if (tech.isDeathTech && !tech.isDeathTechTriggered) {
            tech.isDeathTechTriggered = true
            powerUps.spawn(player.position.x, player.position.y, "tech");
            // simulation.inGameConsole(`<span class='color-var'>tech</span>.damage *= ${1.05} //Zeno`);
            tech.addJunkTechToPool(0.02)
          }
        } else {
          m.health = 0;
          m.displayHealth();
          m.death();
          return;
        }
      }
      m.displayHealth();
      document.getElementById("dmg").style.transition = "opacity 0s";
      document.getElementById("dmg").style.opacity = 0.1 + Math.min(0.6, dmg * 4);
    }
    if (dmg > 0.03) {
      m.lastHit = dmg;
      if (dmg > 0.06 / m.holdingMassScale) m.drop(); //drop block if holding  // m.holdingMassScale = 0.5 for most fields
      if (m.isCloak) m.fireCDcycle = m.cycle //forced exit cloak
    }
    const normalFPS = function () {
      if (m.defaultFPSCycle < m.cycle) { //back to default values
        simulation.fpsCap = simulation.fpsCapDefault
        simulation.fpsInterval = 1000 / simulation.fpsCap;
        document.getElementById("dmg").style.transition = "opacity 1s";
        document.getElementById("dmg").style.opacity = "0";
      } else {
        requestAnimationFrame(normalFPS);
      }
    };

    if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(normalFPS);
    if (dmg > 0.05) { // freeze game for high damage hits
      simulation.fpsCap = 4 //40 - Math.min(25, 100 * dmg)
      simulation.fpsInterval = 1000 / simulation.fpsCap;
      if (tech.isHarmFreeze) {
        for (let i = 0, len = mob.length; i < len; i++) mobs.statusSlow(mob[i], 480) //freeze all mobs
      }
    } else {
      simulation.fpsCap = simulation.fpsCapDefault
      simulation.fpsInterval = 1000 / simulation.fpsCap;
    }
    m.defaultFPSCycle = m.cycle
    if (level.isMobHealPlayerDamage) {
      for (let i = 0; i < mob.length; i++) {
        if (mob[i].health < 1 && mob[i].isDropPowerUp && mob[i].alive) {
          simulation.drawList.push({
            x: mob[i].position.x,
            y: mob[i].position.y,
            radius: mob[i].radius + 20,
            color: "rgba(0,255,100,0.5)",
            time: 10
          });
          mob[i].health += dmg * 7
          if (mob[i].health > 1) mob[i].health = 1
        }
      }
    }
    // if (tech.isSlowFPS) { // slow game 
    //     simulation.fpsCap = 30 //new fps
    //     simulation.fpsInterval = 1000 / simulation.fpsCap;
    //     //how long to wait to return to normal fps
    //     m.defaultFPSCycle = m.cycle + 20 + Math.min(90, Math.floor(200 * dmg))
    //     if (tech.isHarmFreeze) { //freeze all mobs
    //         for (let i = 0, len = mob.length; i < len; i++) {
    //             mobs.statusSlow(mob[i], 450)
    //         }
    //     }
    // } else {
    //     if (dmg > 0.05) { // freeze game for high damage hits
    //         simulation.fpsCap = 4 //40 - Math.min(25, 100 * dmg)
    //         simulation.fpsInterval = 1000 / simulation.fpsCap;
    //     } else {
    //         simulation.fpsCap = simulation.fpsCapDefault
    //         simulation.fpsInterval = 1000 / simulation.fpsCap;
    //     }
    //     m.defaultFPSCycle = m.cycle
    // }
    // if (!noTransition) {
    //   document.getElementById("health").style.transition = "width 0s ease-out"
    // } else {
    //   document.getElementById("health").style.transition = "width 1s ease-out"
    // }
  },
  buttonCD: 0, //cool down for player buttons
  // *********************************************
  // ****** drawing player and skins *************
  // *********************************************
  drawLeg(stroke) { },
  calcLeg(cycle_offset, offset) {
    m.hip.x = 12 + offset;
    m.hip.y = 24 + offset;
    //stepSize goes to zero if Vx is zero or not on ground (make m transition cleaner)
    m.stepSize = 0.8 * m.stepSize + 0.2 * (7 * Math.sqrt(Math.min(9, Math.abs(m.Vx))) * m.onGround);
    //changes to stepsize are smoothed by adding only a percent of the new value each cycle
    const stepAngle = 0.034 * m.walk_cycle + cycle_offset;
    m.foot.x = 2.2 * m.stepSize * Math.cos(stepAngle) + offset;
    m.foot.y = offset + 1.2 * m.stepSize * Math.sin(stepAngle) + m.yOff + m.height;
    const footYMax = m.yOff + m.height;
    if (m.foot.y > footYMax) m.foot.y = footYMax;
    if (!m.wasFootOnGround) m.wasFootOnGround = false;
    if (m.wasFootOnGround && m.Vx && m.onGround) {
      if (tech.isSounds) {
        audioPlayer.requestSound('Step', m.pos); //play step sound
      }
    }
    m.wasFootOnGround = (Math.cos(stepAngle) < -0.99) && m.onGround;
    //calculate knee position as intersection of circle from hip and foot
    const d = Math.sqrt((m.hip.x - m.foot.x) * (m.hip.x - m.foot.x) + (m.hip.y - m.foot.y) * (m.hip.y - m.foot.y));
    const l = (m.legLength1 * m.legLength1 - m.legLength2 * m.legLength2 + d * d) / (2 * d);
    const h = Math.sqrt(m.legLength1 * m.legLength1 - l * l);
    m.knee.x = (l / d) * (m.foot.x - m.hip.x) - (h / d) * (m.foot.y - m.hip.y) + m.hip.x + offset;
    m.knee.y = (l / d) * (m.foot.y - m.hip.y) + (h / d) * (m.foot.x - m.hip.x) + m.hip.y;
  },
  draw() { },
  isAltSkin: false,
  drawBoost() {

  },
  resetSkin() {
    simulation.isAutoZoom = true;
    m.hardLandCDScale = 1
    m.yOffWhen.jump = 70
    m.yOffWhen.stand = 49
    m.yOffWhen.crouch = 22
    m.isAltSkin = false
    m.coyoteCycles = 5 + 120 * tech.isCoyote
    m.hardLanding = 130
    m.squirrelFx = 1;
    m.squirrelJump = 1;
    m.velocitySmooth = { x: 0, y: 0 }
    requestAnimationFrame(() => { m.setMovement() })
    m.color = {
      hue: 0,
      sat: 0,
      light: 100,
    }
    m.setFillColors();
    m.draw = function () {
      ctx.fillStyle = m.fillColor;
      m.walk_cycle += m.flipLegs * m.Vx;
      ctx.save();
      ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
      ctx.translate(m.pos.x, m.pos.y);
      m.calcLeg(Math.PI, -3);
      m.drawLeg("#4a4a4a");
      m.calcLeg(0, 0);
      m.drawLeg("#333");
      ctx.rotate(m.angle);
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, 2 * Math.PI);
      ctx.fillStyle = m.bodyGradient
      ctx.fill();
      ctx.arc(15, 0, 4, 0, 2 * Math.PI);
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
      powerUps.boost.draw()
    }
    m.drawLeg = function (stroke) {
      // if (simulation.mouseInGame.x > m.pos.x) {
      if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
        m.flipLegs = 1;
      } else {
        m.flipLegs = -1;
      }
      ctx.save();
      ctx.scale(m.flipLegs, 1); //leg lines
      ctx.beginPath();
      ctx.moveTo(m.hip.x, m.hip.y);
      ctx.lineTo(m.knee.x, m.knee.y);
      ctx.lineTo(m.foot.x, m.foot.y);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 5;
      ctx.stroke();

      //toe lines
      ctx.beginPath();
      ctx.moveTo(m.foot.x, m.foot.y);
      if (m.onGround) {
        ctx.lineTo(m.foot.x - 14, m.foot.y + 5);
        ctx.moveTo(m.foot.x, m.foot.y);
        ctx.lineTo(m.foot.x + 14, m.foot.y + 5);
      } else {
        ctx.lineTo(m.foot.x - 12, m.foot.y + 8);
        ctx.moveTo(m.foot.x, m.foot.y);
        ctx.lineTo(m.foot.x + 12, m.foot.y + 8);
      }
      ctx.lineWidth = 4;
      ctx.stroke();

      //hip joint
      ctx.beginPath();
      ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
      //knee joint
      ctx.moveTo(m.knee.x + 5, m.knee.y);
      ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
      //foot joint
      ctx.moveTo(m.foot.x + 4, m.foot.y + 1);
      ctx.arc(m.foot.x, m.foot.y + 1, 4, 0, 2 * Math.PI);
      ctx.fillStyle = m.fillColor;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
  },
  skin: {
    none() {
      m.isAltSkin = true
    },
    favicon() { //used to render the favicon, not actually in game
      m.yOffWhen.jump = 70
      m.yOffWhen.stand = 49
      m.yOffWhen.crouch = 22
      m.isAltSkin = false

      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 10}%)`
      let grd = ctx.createLinearGradient(-30, 0, 30, 0);
      grd.addColorStop(0, m.fillColorDark);
      grd.addColorStop(1, m.fillColor);
      m.bodyGradient = grd

      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        // m.calcLeg(Math.PI, -3);
        // m.drawLeg("#4a4a4a");
        // m.calcLeg(0, 0);
        // m.drawLeg("#333");
        // ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(12, 0, 4.5, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 4.5;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    egg() {
      m.isAltSkin = true
      m.yOffWhen.stand = 52
      m.yOffWhen.jump = 72
      m.squirrelJump = 1.15;
      m.setMovement()

      m.draw = function () {
        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 39
          const mag = 14 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.fillStyle = `rgba(0,0,0,${0.04 + 0.3 * time})`
          ctx.fill()
          // ctx.strokeStyle = "#333"
          // ctx.lineWidth = 1
          // ctx.stroke();
          ctx.restore();
        }

        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -1.25);
        m.drawLeg("#606060");
        m.calcLeg(0, 0);
        m.drawLeg("#444");

        ctx.rotate(m.angle);
        ctx.beginPath();
        // ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.ellipse(0, 0, 0.9 * 31, 1.05 * 31, 0, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        // ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.ellipse(15, 0, 0.8 * 4, 1.1 * 4, 0, 0, 2 * Math.PI);

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.75 + m.yOffGoal * 0.25; //smoothly move leg height towards height goal
      }
      m.drawLeg = function (stroke) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        const hip = { x: m.hip.x - 5, y: m.hip.y + 5 }
        const sub = Vector.sub(m.knee, hip)
        const off = Vector.mult(Vector.rotate(Vector.normalise(sub), Math.PI / 2), 8)
        const kneeBraceHigh = Vector.add(hip, off)
        const kneeBraceLow = Vector.add(kneeBraceHigh, Vector.mult(sub, 0.9))
        const foot = { x: m.foot.x - 10, y: m.foot.y - 15 }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(hip.x, hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(foot.x, foot.y);
        //extra upper leg brace
        ctx.moveTo(kneeBraceHigh.x, kneeBraceHigh.y);
        ctx.lineTo(kneeBraceLow.x, kneeBraceLow.y);
        ctx.lineTo(m.knee.x, m.knee.y);

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;
        ctx.stroke();
        //foot
        ctx.beginPath();
        ctx.moveTo(foot.x, foot.y);
        ctx.quadraticCurveTo(m.foot.x - 30, m.foot.y + 12, m.foot.x + 13, m.foot.y + 3);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y - 2, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 3, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
        //knee brace
        // ctx.moveTo(kneeBraceHigh.x + 4, kneeBraceHigh.y);
        // ctx.arc(kneeBraceHigh.x, kneeBraceHigh.y, 4, 0, 2 * Math.PI);
        ctx.moveTo(kneeBraceLow.x + 2.5, kneeBraceLow.y);
        ctx.arc(kneeBraceLow.x, kneeBraceLow.y, 2.5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(foot.x + 2.5, foot.y);
        ctx.arc(foot.x, foot.y, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#f6f6f6"//m.fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        // ctx.strokeStyle = "#333"
        ctx.stroke();
        ctx.restore();
      }
    },
    jumper() {
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 50}%)`
      m.isAltSkin = true
      m.coyoteCycles = 15 + 120 * tech.isCoyote
      m.hardLandCDScale = 0.1
      m.hardLanding = 100
      m.squirrelJump = 1.4 * m.energy
      m.setMovement();

      m.draw = function () {
        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 40
          const mag = 10 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.fillStyle = `hsla(184,100%,70%,${0.1 + 1.5 * time})`
          ctx.fill()
          ctx.strokeStyle = "#035"//"hsl(184,100%,70%)"
          ctx.lineWidth = 0.2 + 3 * time
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = m.fieldMeterColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#456");
        m.calcLeg(0, 0);
        m.drawLeg("#345");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.strokeStyle = m.fieldMeterColor;
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.fillStyle = 'hsl(0, 0.00%, 12.20%)' //m.fillColor; //"#9ff" //m.bodyGradient
        ctx.fill();

        ctx.beginPath();
        ctx.arc(17, 0, 5.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#357"
        ctx.fill();
        ctx.restore();

        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 8.5;
        ctx.stroke(); //leg part
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = m.fieldMeterColor;
        ctx.lineWidth = 2.75;
        ctx.stroke(); //leg part overlap

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y - 1);
        ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
        ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        ctx.lineTo(m.foot.x, m.foot.y - 1);
        ctx.lineWidth = 4;
        ctx.strokeStyle = stroke;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y - 4, 12, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 6, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 6, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = m.fieldMeterColor;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = stroke
        ctx.stroke();
        ctx.restore();
        m.squirrelJump = (m.energy < 2) ? (1.4 * m.energy) : 2.8
        m.setMovement();
      }
    },
    mech() {
      m.isAltSkin = true
      m.yOffWhen.stand = 52
      m.yOffWhen.jump = 72
      m.coyoteCycles = 11 + 120 * tech.isCoyote
      m.hardLandCDScale = 0.5
      m.hardLanding = 160
      m.squirrelFx = 1.4;
      m.squirrelJump = 1.16;
      m.setMovement()

      m.draw = function () {
        if (input.up &&
          m.buttonCD_jump + 20 < m.cycle &&
          !m.onGround &&
          !Matter.Query.region([...map, ...body], {
            min: { x: m.pos.x - 40, y: m.pos.y - 30 },
            max: { x: m.pos.x + 40, y: m.pos.y - 10 }
          }).length &&
          Matter.Query.region([...map, ...body], {
            min: { x: m.pos.x - 40, y: m.pos.y },
            max: { x: m.pos.x + 40, y: m.pos.y + 95 }
          }).length
        ) {
          // m.jump()

          m.buttonCD_jump = m.cycle; //can't jump again until 20 cycles pass
          player.force.y = -0.85 * m.jumpForce; //player jump force
          Matter.Body.setVelocity(player, { //zero player y-velocity for consistent jumps
            x: player.velocity.x,
            y: 0
          });
        }

        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -1.25);
        m.drawLeg("#606060");
        m.calcLeg(0, 0);
        m.drawLeg("#444");

        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.75 + m.yOffGoal * 0.25; //smoothly move leg height towards height goal

        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 39
          const mag = 14 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.fillStyle = `rgba(0,0,0,${0.04 + 0.3 * time})`
          ctx.fill()
          // ctx.strokeStyle = "#333"
          // ctx.lineWidth = 1
          // ctx.stroke();
          ctx.restore();
        }
      }
      m.drawLeg = function (stroke) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        const hip = { x: m.hip.x - 5, y: m.hip.y + 5 }
        const sub = Vector.sub(m.knee, hip)
        const off = Vector.mult(Vector.rotate(Vector.normalise(sub), Math.PI / 2), 8)
        const kneeBraceHigh = Vector.add(hip, off)
        const kneeBraceLow = Vector.add(kneeBraceHigh, Vector.mult(sub, 0.9))
        const foot = { x: m.foot.x - 10, y: m.foot.y - 15 }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(hip.x, hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(foot.x, foot.y);
        //extra upper leg brace
        ctx.moveTo(kneeBraceHigh.x, kneeBraceHigh.y);
        ctx.lineTo(kneeBraceLow.x, kneeBraceLow.y);
        ctx.lineTo(m.knee.x, m.knee.y);

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 3;
        ctx.stroke();
        //foot
        ctx.beginPath();
        ctx.moveTo(foot.x, foot.y);
        ctx.quadraticCurveTo(m.foot.x - 30, m.foot.y + 12, m.foot.x + 13, m.foot.y + 3);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (m.coyoteCycles > 30 && !m.onGround) {
          ctx.lineWidth = 0.2 * Math.max(0, Math.min(3 * (m.cycle - m.lastOnGroundCycle), Math.min(120, m.lastOnGroundCycle + m.coyoteCycles - m.cycle)))
          ctx.strokeStyle = "rgba(255, 255, 0, 0.3)"
          ctx.stroke()
        }
        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y - 1, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 3, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
        //knee brace
        // ctx.moveTo(kneeBraceHigh.x + 4, kneeBraceHigh.y);
        // ctx.arc(kneeBraceHigh.x, kneeBraceHigh.y, 4, 0, 2 * Math.PI);
        ctx.moveTo(kneeBraceLow.x + 2.5, kneeBraceLow.y);
        ctx.arc(kneeBraceLow.x, kneeBraceLow.y, 2.5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(foot.x + 2.5, foot.y);
        ctx.arc(foot.x, foot.y, 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = m.fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        // ctx.strokeStyle = "#333"
        ctx.stroke();
        ctx.restore();
      }
    },
    polar() {
      m.isAltSkin = true
      // m.setFillColors();
      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
      let grd = ctx.createLinearGradient(-30, 0, 30, 0);
      grd.addColorStop(0, m.fillColorDark);
      grd.addColorStop(0.7, m.fillColor);
      // grd.addColorStop(1, m.fillColor);
      m.bodyGradient = grd

      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);

        const diff = (m.lastKillCycle - m.cycle + tech.isDamageCooldownTime) / tech.isDamageCooldownTime
        const color = diff < 0 ? "#fff" : "#aaa"
        const hue = 220 + 20 * Math.sin(0.01 * m.cycle)
        const colorInverse = diff < 0 ? `hsl(${hue}, 80%, 40%)` : "#fff"
        m.drawLeg(color, colorInverse);
        m.calcLeg(0, 0);
        m.drawLeg(color, colorInverse);

        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = color
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(15, 0)
        ctx.lineTo(28, 0)
        ctx.strokeStyle = colorInverse;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.ellipse(m.pos.x, m.pos.y, 24, 18, 3.14 * Math.random(), 0, 2 * Math.PI)
        ctx.fillStyle = diff < 0 ? `hsl(${hue}, 80%, 40%)` : `rgba(255,255,255,${Math.min(Math.max(0, diff + 0.3), 1)})`
        ctx.fill();

        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke, circles) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 3;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 5, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = circles;
        ctx.fill();
        // ctx.lineWidth = 2;
        // ctx.stroke();
        ctx.restore();
      }
    },
    scaleInvariance() {
      m.isAltSkin = true
      const mass = player.mass
      Matter.Body.scale(player, 2 / player.scale, 2 / player.scale); //undoes old scale and set new scale to be 2
      Matter.Body.setMass(player, mass);
      Matter.Body.setInertia(player, Infinity);
      player.scale = 2
      m.isDown = false


      //different scales can sometimes have trouble with jumps so it's a bit faster and higher jumping
      m.squirrelJump = 1.05;
      m.squirrelFx = 1.05;
      m.setMovement()

      m.damageDone *= 3
      // m.damageReduction *= 0.7

      //increase angle of the floor connection to allow smoothly walking over bumps
      playerBody.vertices[6].y -= 20
      playerBody.vertices[3].y -= 20

      m.draw = function () {
        // simulation.draw.testing();
        if (!m.isDown && input.down && !simulation.paused && !simulation.isChoosing) {
          if (player.scale === 2) {
              m.isDown = true
              // m.fieldCDcycle = m.cycle + 23;
              player.scale = 0.5
              const mass = player.mass
              Matter.Body.scale(player, player.scale * player.scale, player.scale * player.scale);
              Matter.Body.setMass(player, mass);
              Matter.Body.setInertia(player, Infinity);

              m.damageReduction *= 0.7
              m.damageDone /= 3
          } else if (player.scale === 0.5) {
            //check if space about player is clear
            const collides = Matter.Query.ray([...body, ...map], { x: m.pos.x, y: player.bounds.max.y - 30 }, { x: m.pos.x, y: player.bounds.min.y - 150 }, 20)
            if (collides.length === 0 || (m.isHolding && collides.length === 1 && collides[0].body === m.holdingTarget)) {//don't check for collisions with a block you are holding
              m.isDown = true
              if (m.onGround) {
                //move player up
                Matter.Body.setPosition(player, { x: player.position.x, y: player.position.y - 100 });
                m.yOff = m.yOffGoal = m.yOffWhen.crouch
              }
              // m.fieldCDcycle = m.cycle + 23;
              player.scale = 2
              const mass = player.mass
              Matter.Body.scale(player, player.scale * player.scale, player.scale * player.scale);
              Matter.Body.setMass(player, mass);
              Matter.Body.setInertia(player, Infinity);

              m.damageReduction /= 0.7
              m.damageDone *= 3
            }
          }
        } if (!input.down) {
          m.isDown = false
        }
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx / player.scale
        ctx.save();
        ctx.translate(m.pos.x, m.pos.y); //maybe something should be added to the y translate related to player.scale?
        ctx.scale(player.scale, player.scale)
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    scaleInvariance2() {
      m.isAltSkin = true
      const mass = player.mass

      //for some reason adjusting the vertices goes better at large size
      Matter.Body.scale(player, 2 / player.scale, 2 / player.scale); //undoes old scale and set new scale to be 2
      Matter.Body.setMass(player, mass);
      Matter.Body.setInertia(player, Infinity);
      player.scale = 2
      m.isDown = false

      //increase angle of the floor connection to allow smoothly walking over bumps
      playerBody.vertices[6].y -= 20
      playerBody.vertices[3].y -= 20

      //go back to small size because it fits better
      player.scale = 0.3
      Matter.Body.scale(player, player.scale / 2, player.scale / 2);
      Matter.Body.setMass(player, mass);
      Matter.Body.setInertia(player, Infinity);
      // m.damageDone *= 3
      m.damageReduction *= 0.5


      //different scales can sometimes have trouble with jumps so it's a bit faster and higher jumping
      m.squirrelJump = 1.06;
      m.squirrelFx = 1.06;
      m.setMovement()

      m.draw = function () {
        // simulation.draw.testing();
        if (!m.isDown && input.down && !simulation.paused && !simulation.isChoosing) {
          if (player.scale === 3) {
            m.isDown = true
            const scale = 0.3
            const mass = player.mass
            Matter.Body.scale(player, scale / player.scale, scale / player.scale);
            Matter.Body.setMass(player, mass);
            Matter.Body.setInertia(player, Infinity);
            player.scale = scale

            m.damageReduction *= 0.5
            m.damageDone /= 6
          } else if (player.scale === 0.3) {
            //check if space above player is clear
            const collides = Matter.Query.ray([...body, ...map], { x: m.pos.x, y: player.bounds.max.y - 30 }, { x: m.pos.x, y: player.bounds.min.y - 230 }, 10)
            if (collides.length === 0 || (m.isHolding && collides.length === 1 && collides[0].body === m.holdingTarget)) {//don't check for collisions with a block you are holding
              m.isDown = true
              if (m.onGround) {
                //move player up
                Matter.Body.setPosition(player, { x: player.position.x, y: player.position.y - 150 });
                m.yOff = m.yOffGoal = m.yOffWhen.crouch
              }

              const scale = 3
              const mass = player.mass
              Matter.Body.scale(player, scale / player.scale, scale / player.scale);
              Matter.Body.setMass(player, mass);
              Matter.Body.setInertia(player, Infinity);
              player.scale = scale

              m.damageReduction /= 0.5
              m.damageDone *= 6
            }
          }
        } if (!input.down) {
            m.isDown = false
        }
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx / player.scale
        ctx.save();
        ctx.translate(m.pos.x, m.pos.y); //maybe something should be added to the y translate related to player.scale?
        ctx.scale(player.scale, player.scale)
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    strokeGap() {
      m.isAltSkin = true
      m.yOffWhen.stand = 52
      m.yOffWhen.jump = 72
      m.coyoteCycles = 11 + 120 * tech.isCoyote
      m.squirrelFx = 1.28;
      m.setMovement();
      // m.speedSmooth = 0
      // m.smoothAngle = 0
      m.draw = function () {
        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 40
          const mag = 9 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          // ctx.fillStyle = `rgba(255,0,200,${0.4 * time})`
          // ctx.fill()
          // ctx.strokeStyle = "#f09"

          ctx.fillStyle = `rgba(255,255,255,${0.3 + time})`;
          ctx.fill()
          ctx.strokeStyle = "#446"
          ctx.lineWidth = 0.2 + 4 * time
          // ctx.lineWidth = 1
          ctx.stroke();
          ctx.restore();
        }

        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -1.25);
        m.drawLeg("#606080");
        m.calcLeg(0, 0);
        m.drawLeg("#446");

        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        // ctx.arc(0, 0, 30, m.angle + 1, m.angle - 1);
        ctx.fillStyle = "#fff"//m.bodyGradient
        ctx.fill();
        ctx.beginPath();
        const arc = 0.7 + 0.17 * Math.sin(m.cycle * 0.012)
        ctx.arc(0, 0, 30, -arc, arc, true); //- Math.PI / 2
        ctx.strokeStyle = "#446";
        ctx.lineWidth = 2;
        ctx.stroke();

        //fire outline directed opposite player look direction
        // ctx.beginPath();
        // const radius = 40
        // const extend = -50
        // ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
        // ctx.bezierCurveTo(extend, radius, extend, 0, -100, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        // ctx.bezierCurveTo(extend, 0, extend, -radius, 0, -radius);
        // ctx.fillStyle = "rgba(255,0,255,0.3)";
        // ctx.fill()
        ctx.beginPath();
        ctx.moveTo(13, 0)
        ctx.lineTo(20, 0)
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 14, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 14, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 12, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 12, m.foot.y + 8);
        }
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 8, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 4, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 4, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 4, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = m.fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#222"
        ctx.stroke();
        ctx.restore();
      }
    },
    energy() {
      m.isAltSkin = true
      m.color = {
        hue: 184,
        sat: 100,
        light: 85,
      }
      m.setFillColors();
      m.draw = function () {
        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 40
          const mag = 10 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);

          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.fillStyle = `hsla(184,100%,70%,${0.1 + 1.5 * time})`
          ctx.fill()
          ctx.strokeStyle = "#035"//"hsl(184,100%,70%)"
          ctx.lineWidth = 0.2 + 3 * time
          ctx.stroke();
          ctx.restore();
        }

        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#456");
        m.calcLeg(0, 0);
        m.drawLeg("#345");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(0,255,255,0.25)";
        ctx.lineWidth = 15;
        ctx.stroke();
        ctx.fillStyle = 'hsl(184,100%,85%)' //m.fillColor; //"#9ff" //m.bodyGradient
        ctx.fill();

        ctx.beginPath();
        ctx.arc(17, 0, 5.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#357"
        ctx.fill();
        ctx.restore();

        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 3;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 10, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 6, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 6, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y + 1, 5, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(0,255,255,0.25)";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.fillStyle = m.fillColor;
        ctx.fill();
        ctx.restore();
      }
    },
    tungsten() {
      m.hardLandCDScale = 2
      m.hardLanding = 60
      // m.coyoteCycles = 0
      m.isAltSkin = true
      m.color = {
        hue: 210,
        sat: 5,
        light: 75,
      }
      // m.setFillColors();
      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 50}%)`
      const grd = ctx.createLinearGradient(-30, -5, 30, 10);
      grd.addColorStop(0, `#e0e0e0`);
      grd.addColorStop(0.3, `#bbb`);
      grd.addColorStop(0.4, `#b3b3b3`);
      grd.addColorStop(0.5, `#c5c5c5`);
      grd.addColorStop(0.65, `#bbb`);
      grd.addColorStop(0.7, `#b3b3b3`);
      grd.addColorStop(0.75, `#bbb`);
      grd.addColorStop(1, `#e0e0e0`);
      // const grdRad = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      // grdRad.addColorStop(0, `rgba(0,0,0,0.3)`);
      // grdRad.addColorStop(0.5, `rgba(210,210,210,0)`);
      m.bodyGradient = grd

      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(4.2, -3);
        m.drawLeg("#666");
        m.calcLeg(2.1, -1);
        m.drawLeg("#5f5f5f");
        m.calcLeg(0, 1);
        m.drawLeg("#555");
        ctx.rotate(m.angle);

        const size = 33
        ctx.beginPath();
        ctx.lineTo(size * 1, size * 0)
        ctx.lineTo(size * 0.5, size * 0.866)
        ctx.lineTo(size * -0.5, size * 0.866)
        ctx.lineTo(size * -1, size * 0)
        ctx.lineTo(size * -0.5, size * -0.866)
        ctx.lineTo(size * 0.5, size * -0.866)
        ctx.lineTo(size * 1, size * 0)
        ctx.lineTo(size * 0.5, size * 0)
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(15, 0, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "#333"
        ctx.fill();

        ctx.restore();
        m.yOff = m.yOff * 0.9 + m.yOffGoal * 0.1; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 4.5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y - 1);
        ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
        ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        ctx.lineTo(m.foot.x, m.foot.y - 1);
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y - 4, 12, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 6, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 6, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = m.fillColor;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000"
        ctx.stroke();
        ctx.restore();
      }

    },
    anodize() {
      m.isAltSkin = true
      m.color = {
        hue: 210,
        sat: 14,
        light: 65,
      }
      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 50}%)`
      let grd = ctx.createRadialGradient(16, 0, 0, 0, 0, 40), colors = [
        [0, `#c78034`],[0.04, `#bd5235`],[0.08, `#ab554d`],[0.12, `#8f5d8f`],
        [0.16, `#4352ab`],[0.2, `#2058b3`],[0.24, `#1a6fc4`],[0.28, `#1b85cf`],
        [0.32, `#2d9bd7`],[0.4, `#d2d7b4`],[0.44, `#e1cd87`],[0.48, `#f0b955`],
        [0.52, `#ffa050`],[0.56, `#ff8269`],[0.6, `#f5697d`],[0.64, `#e65aaf`],
        [0.68, `#d732d7`],[0.72, `#c846e6`],[0.76, `#c850fa`],[0.8, `#878cf0`],
        [0.84, `#37beeb`],[0.88, `#00d2be`],[0.92, `#00e19b`],[0.96, `#19f5aa`],
        [1, `#aaf5af`]
      ]
      colors.forEach(item => {grd.addColorStop(item[0], item[1])});
      m.bodyGradient = grd

      m.draw = function () {
        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 40
          const mag = 12 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.fillStyle = `hsla(${simulation.cycle},100%,70%,${0.1 + 2 * time})`
          ctx.fill()
          ctx.restore();
        }

        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a5a");
        m.calcLeg(0, 0);
        m.drawLeg("#445");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        // ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 2;
        // ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
        ctx.fillStyle = "#222";
        ctx.fill();
        //knee joint
        ctx.beginPath();
        ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        //foot joint
        ctx.beginPath();
        ctx.arc(m.foot.x, m.foot.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    },
    dilate() {
      m.isAltSkin = true
      simulation.isAutoZoom = false;
      m.squirrelFx = 1.28;
      m.setMovement();
      m.draw = function () {
        const amplitude = 8 + 4 * Math.sin(m.cycle * 0.01)
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#456");
        m.calcLeg(0, 0);
        m.drawLeg("#345");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.strokeStyle = "#345";
        ctx.lineWidth = 2;
        ctx.arc(12, 0, amplitude, 0, 2 * Math.PI); //big eye
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(12, 0, amplitude, 0, 2 * Math.PI); //big eye
        // ctx.fillStyle = `hsl(0,0%,${50+50*Math.sin(m.cycle * 0.0075+Math.PI)}%)` //`hsl(${150+50*Math.sin(m.cycle * 0.0075)},100%,50%)`
        // ctx.fill();
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal

        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 39
          const mag = 6 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
          // ctx.fillStyle = `hsla(${simulation.cycle * 0.5},100%,70%,0.4)`
          // ctx.fill()
          ctx.strokeStyle = "#345"
          // const time = (powerUps.boost.endCycle - m.cycle) / powerUps.boost.duration
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.lineWidth = 0.2 + 4 * time
          ctx.stroke();
          ctx.restore();
        }

        //zoom camera in and out
        simulation.setZoom(1800 + 400 * Math.sin(m.cycle * 0.01))
      }
    },
    dilate2() {
      m.isAltSkin = true
      m.squirrelFx = 1.28;
      m.setMovement();
      m.draw = function () {
        const amplitude = Math.sin(m.cycle * 0.01)

        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#456");
        m.calcLeg(0, 0);
        m.drawLeg("#345");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.strokeStyle = "#345";
        ctx.lineWidth = 3 + 3 * Math.sin(m.cycle * 0.01 + Math.PI);
        ctx.stroke();
        // ctx.arc(12, 0, 8 + 4 * amplitude, 0, 2 * Math.PI); //big eye
        ctx.beginPath();
        ctx.arc(12, 0, 8 + 4 * amplitude, 0, 2 * Math.PI); //big eye
        ctx.fillStyle = "#345"
        // ctx.fillStyle = //`hsl(0,0%,${50+50*Math.sin(m.cycle * 0.0075+Math.PI)}%)` //`hsl(${150+50*Math.sin(m.cycle * 0.0075)},100%,50%)`
        // ctx.fillStyle = `hsl(${150 + 100 * amplitude},100%,50%)`
        ctx.fill();
        // ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal

        if (powerUps.boost.endCycle > simulation.cycle) {
          //gel that acts as if the wind is blowing it when player moves
          ctx.save();
          ctx.translate(m.pos.x, m.pos.y);
          m.velocitySmooth = Vector.add(Vector.mult(m.velocitySmooth, 0.8), Vector.mult(player.velocity, 0.2))
          ctx.rotate(Math.atan2(m.velocitySmooth.y, m.velocitySmooth.x))
          ctx.beginPath();
          const radius = 39
          const mag = 6 * Vector.magnitude(m.velocitySmooth) + radius
          ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2);
          ctx.bezierCurveTo(-radius, radius, -radius, 0, -mag, 0); // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
          ctx.bezierCurveTo(-radius, 0, -radius, -radius, 0, -radius);
          // ctx.fillStyle = `hsla(${simulation.cycle * 0.5},100%,70%,0.4)`
          // ctx.fill()
          const time = Math.min(0.5, (powerUps.boost.endCycle - simulation.cycle) / powerUps.boost.duration)

          ctx.strokeStyle = "#345"
          ctx.lineWidth = 0.2 + 7 * time
          // ctx.lineWidth = (4 + 3 * Math.sin(m.cycle * 0.01 + Math.PI)) * time;
          ctx.stroke();
          ctx.restore();
        }

        simulation.setZoom(1800 + 400 * amplitude)
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 6 + 2 * Math.sin(m.cycle * 0.01 + Math.PI);
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 7, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 7, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 6, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#345";
        ctx.fill();
        ctx.lineWidth = 3 + 3 * Math.sin(m.cycle * 0.01 + Math.PI);
        ctx.stroke();
        ctx.restore();
      }
    },
    CPT() {
      m.isAltSkin = true

      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
      let grd = ctx.createLinearGradient(-20, 0, 15, 0);
      grd.addColorStop(0, m.fillColorDark);
      grd.addColorStop(1, m.fillColor);
      // grd.addColorStop(1, m.fillColor);
      m.bodyGradient = grd
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#eee");
        m.calcLeg(0, 0);
        m.drawLeg("#fff");

        ctx.rotate(0.024 * simulation.cycle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.energy > 0.85 * Math.min(1, m.maxEnergy) ? m.bodyGradient : "#fff"
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(m.pos.x + 15 * Math.cos(m.angle), m.pos.y + 15 * Math.sin(m.angle), 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#000"
        ctx.fill();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 3;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 5, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();
        // ctx.lineWidth = 2;
        // ctx.stroke();
        ctx.restore();
      }
    },
    verlet() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -2);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");

        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        const rate = 0.09
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, rate * (simulation.cycle + 0) % 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, rate * (simulation.cycle + 15 / rate) % 30, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.globalCompositeOperation = "difference";
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(21, 0, 8, 0, 2 * Math.PI);
        ctx.fillStyle = input.fire ? "#0ff" : input.field ? "#d30" : `#fff`
        ctx.fill();
        ctx.restore();

        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        const footDrop = m.onGround ? 5 : 10
        ctx.lineTo(m.foot.x - 15, m.foot.y + footDrop);
        ctx.moveTo(m.foot.x, m.foot.y);
        ctx.lineTo(m.foot.x + 15, m.foot.y + footDrop);
        ctx.lineWidth = 1;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 5, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 3, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();
        // ctx.lineWidth = 2;
        // ctx.stroke();
        ctx.restore();
      }
    },
    stubs() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#555");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y + 5);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.restore();
      }
    },
    Sleipnir() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        for (let i = 0; i < 16; i++) {
          m.calcLeg(Math.PI * i / 8, -3 * i / 16)
          m.drawLeg("#444")
        }
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    diegesis() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;

        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle - (m.fireCDcycle !== Infinity ? m.flipLegs * 0.25 * Math.pow(Math.max(m.fireCDcycle - m.cycle, 0), 0.5) : 0));

        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    cat() {
      m.isAltSkin = true
      m.coyoteCycles = 10
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) {
          ctx.scale(1, -1);
          ctx.rotate(Math.PI);
        }
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.bezierCurveTo(-65, -75,
          -5, 150 + (5 * Math.sin(simulation.cycle / 10)),
          -70 + (10 * Math.sin(simulation.cycle / 10)), 0 + (10 * Math.sin(simulation.cycle / 10)));
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 4;
        ctx.stroke();

        if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) {
          ctx.scale(1, -1);
          ctx.rotate(0 - Math.PI);
        }
        m.calcLeg(0, 0);
        m.drawLeg("#333");

        ctx.rotate(m.angle);
        if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) ctx.scale(1, -1);
        ctx.beginPath();
        ctx.moveTo(5, -30);
        ctx.lineTo(20, -40);
        ctx.lineTo(20, -20);
        ctx.lineWidth = 2;
        ctx.fillStyle = "#f3f";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(19, 0);
        ctx.arc(15, 0, 4, Math.PI, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(24.3, 6, 5, Math.PI * 2, Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(30, 6);
        ctx.lineTo(32, 0);
        ctx.lineTo(26, 0);
        ctx.lineTo(30, 6);
        ctx.fillStyle = "#f3f";
        ctx.fill();
        ctx.stroke();

        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    pareidolia() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) ctx.scale(1, -1); //here is the flip
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(2, -6, 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(25, -6, 7, 0.25 * Math.PI, 1.6 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(2, -10, 9, 1.25 * Math.PI, 1.75 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(25, -10, 9, 1.25 * Math.PI, 1.4 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(18, 13, 10, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(18, 13, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#555";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(3, -6, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(26, -6, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15;
        powerUps.boost.draw()
      }
    },
    trollge() {
      var svg64 = btoa(`<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="55pt" height="55pt" viewBox="0 0 469 428" version="1.1" style="transform: scale(-1,1);">
        <g id="surface1">
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 170.859375 51.269531 C 224.03125 44.988281 277.691406 47.199219 331.011719 49.96875 C 338.058594 49.761719 345.089844 48.421875 352.140625 49.191406 C 358.179688 49.898438 363.589844 53.03125 368.429688 56.539063 C 378.179688 63.738281 386.359375 72.878906 393.308594 82.761719 C 401.53125 94.621094 403.320313 109.660156 411.609375 121.5 C 422.550781 136.730469 440 145.871094 450.398438 161.558594 C 457.421875 171.738281 458.609375 184.789063 457.28125 196.769531 C 456.128906 207.53125 450.488281 217.269531 443.210938 225.078125 C 433.488281 235.398438 422.328125 244.679688 415.070313 257.039063 C 410.289063 265.171875 408.449219 274.628906 403.761719 282.789063 C 392.601563 299.480469 376.308594 311.949219 359.300781 322.238281 C 334.699219 337.019531 307.929688 347.589844 282.238281 360.230469 C 270.171875 366.070313 258.578125 372.890625 246.21875 378.121094 C 234.808594 383.082031 222.320313 384.371094 210.191406 386.570313 C 199.640625 388.179688 189.339844 391.039063 178.929688 393.339844 C 153.398438 398.871094 127.109375 403.167969 100.941406 400.390625 C 83.058594 398.46875 64.878906 392.019531 52.320313 378.679688 C 47.441406 373.179688 42.890625 367.070313 40.339844 360.128906 C 38.859375 339.050781 41.730469 318.019531 44.480469 297.171875 C 47.082031 277.101563 48.648438 256.5 44.308594 236.550781 C 40.101563 220.75 30.121094 207.308594 25.101563 191.808594 C 21.167969 180.078125 20.289063 166.859375 24.910156 155.199219 C 32.390625 141.460938 47.261719 133.460938 54.109375 119.269531 C 58.011719 111.71875 58.78125 103.070313 58.511719 94.710938 C 70.75 82.46875 86.070313 73.730469 102.089844 67.429688 C 124.101563 58.769531 147.46875 54.179688 170.859375 51.269531 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 147.640625 65.691406 C 200.710938 57.988281 254.480469 54.679688 308.078125 56.609375 C 320.71875 57.429688 333.441406 56.628906 346.039063 58.179688 C 356.699219 59.609375 366.320313 65.691406 373.230469 73.78125 C 389.621094 92.839844 394.691406 118.96875 411.429688 137.789063 C 404.238281 138.550781 397.058594 136.511719 389.898438 137.480469 C 387.75 137.671875 385.851563 138.761719 384.128906 139.980469 C 395.019531 138.609375 406.410156 139.011719 416.609375 143.449219 C 430.558594 149.171875 441.96875 161.199219 446.210938 175.75 C 449.480469 187.089844 447.710938 199.628906 441.859375 209.828125 C 435 221.851563 423.78125 230.96875 411.320313 236.710938 C 411.898438 236.980469 412.488281 237.238281 413.078125 237.511719 C 415.339844 236.660156 417.351563 235.320313 419.359375 234.011719 C 419.640625 234.589844 420.199219 235.761719 420.480469 236.339844 C 417.269531 238.441406 413.761719 240.269531 411.390625 243.390625 C 405.789063 250.21875 404.039063 259.101563 400.871094 267.128906 C 397.488281 276.449219 391.011719 284.199219 384.128906 291.160156 C 367.550781 307.199219 347.128906 318.410156 326.710938 328.761719 C 312.109375 335.898438 297.269531 342.539063 282.601563 349.539063 C 269.75 355.53125 257.769531 363.179688 244.878906 369.082031 C 242.019531 370.261719 239.171875 371.679688 236.058594 372 C 231.660156 372.039063 227.308594 370.769531 222.898438 371.28125 C 215.179688 372.101563 208 375.238281 200.730469 377.738281 C 185.671875 383.441406 169.738281 386.261719 153.871094 388.558594 C 136.011719 390.929688 117.851563 392 99.929688 389.699219 C 85.289063 387.71875 69.980469 383.488281 59.21875 372.769531 C 53.488281 366.660156 48.730469 358.589844 49.5 349.917969 C 49.308594 315.089844 58.628906 280.738281 55.769531 245.851563 C 54.570313 235.191406 52.839844 224.171875 47.191406 214.851563 C 42.738281 207.011719 36.378906 200.019531 34.230469 191.070313 C 32.160156 180.429688 31.988281 168.871094 36.851563 158.929688 C 42.949219 146.03125 56.878906 138.980469 62.648438 125.859375 C 65.769531 119.050781 66.03125 111.421875 65.589844 104.078125 C 80.710938 86.421875 101.851563 73.539063 124.808594 69.300781 C 140.480469 66.261719 156.339844 69.570313 172.058594 70.339844 C 203.648438 72.390625 234.441406 61.539063 266.019531 63.058594 C 280.550781 64.019531 294.738281 68.210938 307.878906 74.410156 C 322.378906 81.21875 335.460938 90.570313 348.980469 99.070313 C 353.308594 101.648438 357.558594 104.46875 362.28125 106.320313 C 348.078125 95.109375 333.488281 84.148438 317.539063 75.511719 C 300.789063 66.519531 282.070313 60.988281 263.019531 60.410156 C 231.449219 59.410156 200.550781 68.558594 168.980469 68 C 161.828125 67.769531 154.609375 67.371094 147.640625 65.691406 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 225.140625 75.628906 C 250.378906 72.121094 276.660156 73.5 300.789063 82.148438 C 315.53125 87.410156 329.308594 95.5 340.789063 106.171875 C 344.511719 109.851563 348.449219 113.429688 351.25 117.898438 C 331.488281 100.148438 307.960938 85.941406 281.828125 80.109375 C 265.988281 76.410156 249.550781 75.730469 233.371094 77.199219 C 220.75 78.550781 208.769531 83.550781 196.019531 84.03125 C 172.621094 85.578125 149.210938 83.011719 126 80.171875 C 123.71875 79.949219 121.449219 79.511719 119.160156 79.601563 C 115.140625 81.621094 112.078125 85.308594 107.53125 86.308594 C 110.550781 81.238281 115.96875 77.921875 121.789063 77.230469 C 133.390625 75.871094 144.640625 79.78125 156.058594 81.019531 C 179.230469 83.078125 202.289063 79.03125 225.140625 75.628906 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 242.058594 88.96875 C 265.390625 86.53125 289.769531 88.238281 311.488281 97.628906 C 321.558594 102.210938 331.960938 109.46875 334.828125 120.789063 C 327.558594 107.859375 313.71875 100.421875 299.949219 96.308594 C 278.910156 90.128906 256.640625 89.261719 234.878906 90.339844 C 237.191406 89.539063 239.621094 89.148438 242.058594 88.96875 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 120.898438 97.121094 C 136.539063 92.019531 153.558594 91.789063 169.578125 95.230469 C 172.519531 95.871094 175.789063 95.890625 178.339844 97.671875 C 180.050781 98.589844 178.5 100.441406 178.148438 101.671875 C 163.871094 96 148.078125 94.050781 132.890625 96.449219 C 123.71875 98.101563 114.320313 101.941406 108.53125 109.558594 C 106.019531 112.730469 104.820313 116.609375 103.25 120.269531 C 103.550781 114.589844 105.660156 109.25 108.199219 104.238281 C 111.539063 100.609375 116.339844 98.75 120.898438 97.121094 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 240.300781 94.121094 C 241.871094 92.589844 243.648438 93.929688 245.230469 94.640625 C 240.019531 97.578125 236.121094 102.488281 234.109375 108.109375 C 233.820313 111.460938 234.328125 114.910156 233.28125 118.179688 C 230.949219 113.988281 231.371094 108.980469 231.769531 104.390625 C 235.078125 101.351563 236.859375 97.011719 240.300781 94.121094 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 166.761719 106.96875 C 168.019531 106.609375 169.28125 106.28125 170.558594 105.960938 C 171.878906 108.691406 173.429688 111.320313 175.539063 113.53125 C 175.449219 120.140625 175.628906 126.75 175.449219 133.359375 C 170.148438 128.601563 175.160156 121.058594 173.289063 115.171875 C 171.261719 112.308594 168.308594 110.179688 166.761719 106.96875 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 265.148438 119.160156 C 281.539063 116.191406 299.148438 116.519531 314.609375 123.308594 C 324.46875 127.570313 332.96875 135.988281 335.199219 146.761719 C 332.558594 148.839844 329.53125 150.699219 326.070313 150.78125 C 318.148438 151.140625 310.820313 147.300781 302.988281 146.769531 C 281.289063 145.019531 259.851563 151.851563 241.011719 162.191406 C 236.210938 157.300781 228.089844 155.570313 225.710938 148.550781 C 223.878906 144.160156 227.25 140.171875 229.789063 136.910156 C 238.769531 126.71875 252.171875 121.851563 265.148438 119.160156 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 245.558594 136.609375 C 253.710938 131.609375 263.101563 129.289063 272.121094 126.398438 C 270.980469 131.238281 274.101563 135.339844 274.78125 139.949219 C 268.578125 139.238281 262.410156 140.921875 257.109375 144.101563 C 251.398438 147.339844 245 151.898438 238.128906 149.179688 C 237.460938 143.738281 241.160156 139.21875 245.558594 136.609375 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 122.128906 129.359375 C 134.390625 126.328125 147.378906 128.429688 159.140625 132.53125 C 167.070313 135.558594 175.351563 139.488281 180.089844 146.878906 C 185.050781 145.441406 190.660156 143.28125 195.539063 146.199219 C 195.441406 148.148438 195.511719 150.460938 193.878906 151.839844 C 189.988281 155.699219 183.488281 155.179688 180 159.648438 C 179.988281 166.648438 180.03125 173.648438 179.96875 180.648438 C 173.910156 187.390625 162.46875 188.710938 159.601563 198.261719 C 164.449219 206.660156 170.441406 215.699219 180.121094 218.898438 C 184.019531 219.199219 186.53125 215.609375 189.828125 214.160156 C 191.03125 214.871094 192.230469 215.601563 193.421875 216.339844 C 191.53125 221.011719 189.210938 226.039063 184.648438 228.640625 C 181.660156 230.28125 178.128906 229.210938 175.421875 227.539063 C 165.96875 221.621094 160.480469 211.238281 151.128906 205.199219 C 149.25 207.25 147.140625 210.050781 144.03125 209.761719 C 142.460938 207.699219 141.839844 205.121094 140.710938 202.820313 C 131.929688 205 124.769531 213.71875 115.128906 212.140625 C 136.390625 203.640625 153.039063 187.539063 171 173.890625 C 171 168.519531 171 163.140625 171 157.761719 C 162.570313 152.71875 152.550781 151.730469 142.96875 150.789063 C 130.519531 149.53125 117.589844 149.5 105.890625 144.511719 C 107.601563 136.671875 114.570313 131.128906 122.128906 129.359375 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 310 135.261719 C 314.140625 134.539063 318.75 135.078125 321.910156 138.089844 C 323.308594 139.070313 323.089844 140.871094 323.089844 142.351563 C 320.101563 139.75 316.210938 139.851563 312.519531 139.328125 C 310.460938 139.128906 310.421875 136.789063 310 135.261719 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 121.160156 137.960938 C 126.128906 138.238281 131.050781 137.269531 136.019531 137.25 C 138.410156 137.171875 140.628906 138.210938 142.328125 139.851563 C 138.179688 139.730469 134.050781 140.03125 129.921875 140.421875 C 126.839844 140.660156 123.300781 140.539063 121.160156 137.960938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 339.800781 137.769531 C 346.859375 136.921875 353.179688 141.820313 360.300781 140.269531 C 359.121094 147.320313 348.949219 148.898438 344.089844 144.621094 C 347.328125 144.121094 351.671875 145.601563 353.710938 142.269531 C 348.828125 141.890625 343.519531 141.359375 339.800781 137.769531 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 68.878906 142.710938 C 75.941406 143.839844 82.980469 142.269531 89.941406 141.191406 C 94.050781 140.449219 98.550781 141.390625 101.46875 144.519531 C 88.910156 142.871094 75.800781 143.078125 63.871094 147.769531 C 53.890625 151.46875 44.808594 158.949219 41.089844 169.140625 C 37.691406 178.121094 38.699219 188.140625 41.609375 197.109375 C 42.289063 198.988281 42.761719 201.199219 44.5 202.421875 C 50.480469 206.941406 58.667969 206.96875 64.628906 211.460938 C 66.429688 212.648438 65.949219 214.828125 65.878906 216.671875 C 63.148438 214.910156 60.582031 212.851563 57.539063 211.648438 C 51.800781 209.148438 45.179688 207.949219 40.601563 203.371094 C 36.191406 193.660156 34.820313 182.371094 37.359375 171.949219 C 40.570313 158.429688 51.25 147.308594 64.140625 142.488281 C 65.679688 141.921875 67.308594 142.628906 68.878906 142.710938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 378.488281 143.710938 C 383.808594 142 389.5 142.601563 395.011719 142.460938 C 405.320313 142.378906 416.308594 144.769531 424.089844 151.949219 C 431.101563 158.601563 433.820313 168.460938 434.378906 177.839844 C 434.878906 183.191406 434.140625 188.53125 433.988281 193.871094 C 433.410156 193.21875 432.828125 192.570313 432.25 191.929688 C 433.078125 183.621094 432.859375 175.21875 432.011719 166.929688 C 428.621094 158.671875 422.378906 151.128906 413.878906 147.859375 C 402.621094 143.351563 390.269531 145.019531 378.488281 143.710938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 339.21875 149.199219 C 342.289063 147.589844 345.671875 149.988281 347.089844 152.730469 C 344.03125 152.839844 341.328125 151.28125 339.21875 149.199219 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 366.890625 151.769531 C 379.839844 149.148438 394.058594 151.300781 404.949219 159.050781 C 414.828125 165.929688 421.710938 177.609375 421.070313 189.851563 C 420.878906 200.289063 414.960938 209.789063 407.140625 216.378906 C 404.050781 209.609375 408.140625 202.898438 410.398438 196.628906 C 413.308594 189.5 411.699219 181.371094 408.230469 174.75 C 404.808594 168.058594 398.269531 163.308594 391.089844 161.359375 C 384.699219 159.378906 377.929688 159.640625 371.339844 160.039063 C 364.640625 166.53125 355.691406 169.980469 346.828125 172.371094 C 335.199219 175.300781 322.980469 176.199219 311.109375 174.398438 C 303.121094 173.019531 294.671875 170.148438 289.558594 163.480469 C 286.789063 160.03125 285.898438 155.550781 285.738281 151.230469 C 296.109375 152.75 302.148438 162.800781 311.878906 165.871094 C 320.730469 168.671875 330.539063 167.710938 339.078125 164.261719 C 348.511719 160.460938 356.738281 153.75 366.890625 151.769531 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 51.789063 162.628906 C 56.898438 158.238281 63.378906 156.019531 69.628906 153.800781 C 66.417969 160.589844 56.511719 159.679688 53.859375 166.929688 C 51.730469 173.441406 54.332031 180.578125 51.96875 187.121094 C 51.371094 186.25 50.78125 185.390625 50.167969 184.53125 C 50.28125 177.199219 51.429688 169.941406 51.789063 162.628906 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 69.417969 164.390625 C 77.738281 160.410156 87.371094 162.101563 95.871094 164.609375 C 103.628906 167.050781 111.210938 170.601563 117.21875 176.191406 C 120.621094 174.351563 123.488281 171.578125 127.101563 170.109375 C 129.210938 169.46875 131.171875 170.429688 132.871094 171.578125 C 132.648438 175.75 131.140625 180.238281 127.128906 182.191406 C 119.140625 186.039063 109.980469 184.421875 101.421875 184.820313 C 101.121094 179.710938 98.589844 174.070313 93.210938 172.710938 C 82.25 169.96875 71.601563 175.398438 60.75 176.140625 C 61.917969 171.269531 64.691406 166.519531 69.417969 164.390625 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 372.398438 168.410156 C 373.679688 166.679688 375.980469 166.839844 377.878906 166.570313 C 378.078125 171.339844 378.679688 176.398438 381.671875 180.320313 C 387.769531 188.691406 399.300781 190.53125 405.441406 198.871094 C 400.460938 203.441406 393.738281 199.878906 387.980469 199.519531 C 384.898438 198.96875 384.03125 202.679688 382.761719 204.71875 C 380.820313 207.890625 380.628906 211.699219 382.070313 215.101563 C 383.308594 217.199219 380.449219 218.101563 379.460938 219.449219 C 368.839844 230.191406 361.699219 243.691406 352.769531 255.75 C 345.75 265.53125 337.589844 274.570313 328.039063 281.929688 C 311.679688 294.558594 293.5 304.898438 274.140625 312.160156 C 255.910156 319.101563 236.328125 321.128906 217.019531 322.679688 C 194.75 324.179688 172.378906 324.289063 150.109375 322.699219 C 134.570313 321.421875 118.921875 319.648438 103.988281 314.980469 C 97.917969 312.96875 91.582031 310.601563 87.261719 305.660156 C 80.839844 298.449219 77.378906 289.191406 74.910156 280 C 69.960938 260.140625 69.320313 239.289063 72.128906 219.070313 C 73.429688 209.511719 78.121094 200.960938 82.609375 192.589844 C 84.78125 189.101563 83.628906 184.78125 84.96875 181.070313 C 85.761719 178.921875 88.410156 180.128906 90.082031 179.96875 C 94.082031 188.5 91.679688 198.308594 94.589844 207.078125 C 110.160156 222.578125 131.988281 230.121094 153.429688 232.828125 C 184.429688 236.46875 215.71875 231.679688 245.839844 224.371094 C 289.089844 213.539063 330.679688 196.96875 371 178.121094 C 371.089844 174.878906 370.441406 171.238281 372.398438 168.410156 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 229.570313 191.941406 C 229.859375 186.300781 236 183.890625 240.898438 184.511719 C 247.078125 185.230469 253.808594 186.851563 258.300781 191.449219 C 259.738281 195.03125 259.238281 199.121094 259.160156 202.910156 C 258.570313 208.429688 256.710938 215.070313 251.128906 217.449219 C 248.488281 218.738281 245.648438 217.421875 243.058594 216.679688 C 243.058594 214.949219 242.691406 213.109375 243.5 211.5 C 245.019531 208.210938 249.128906 206.941406 250.300781 203.429688 C 251.21875 200.980469 250.378906 198.410156 249.929688 195.96875 C 243.371094 193.441406 235.980469 194.960938 229.570313 191.941406 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 261.550781 191.609375 C 260.820313 189.5 260.199219 186.359375 262.851563 185.390625 C 263.550781 185.589844 264.929688 185.96875 265.621094 186.171875 C 264.691406 186.871094 263.761719 187.558594 262.828125 188.25 C 263.011719 190.789063 264.890625 192.890625 267.371094 193.421875 C 276.449219 195.671875 285.898438 192.671875 295.019531 194.328125 C 297.019531 194.511719 297.660156 196.339844 297.339844 198.128906 C 288.929688 193.449219 279.109375 197.179688 270.089844 196.320313 C 266.828125 196.109375 262.710938 195.109375 261.550781 191.609375 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 50.378906 187.140625 C 50.871094 187.449219 51.871094 188.078125 52.371094 188.398438 C 55.019531 193.808594 60.820313 196.378906 64.761719 200.671875 C 61.28125 200.25 57.550781 199.609375 54.898438 197.109375 C 52.011719 194.621094 51.03125 190.730469 50.378906 187.140625 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 333.039063 207.609375 C 347.71875 202.730469 359.480469 190.070313 375.550781 189.398438 C 375.800781 198.101563 371.761719 206.578125 365.199219 212.210938 C 356.058594 220.199219 343.988281 223.738281 332.179688 225.378906 C 335.070313 219.769531 332.128906 213.53125 333.039063 207.609375 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 432.039063 192.988281 C 432.601563 193.738281 433.160156 194.5 433.71875 195.25 C 432.660156 202.371094 431.371094 209.460938 429.601563 216.441406 C 423.539063 220.039063 417.890625 224.789063 410.851563 226.300781 C 409.050781 226.859375 407.261719 226.210938 405.539063 225.710938 C 412.300781 224.609375 419.179688 221.988281 423.648438 216.570313 C 429.089844 210 431.449219 201.371094 432.039063 192.988281 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 212.820313 201.730469 C 221.25 199.441406 230.25 200.441406 238.488281 203.03125 C 238.769531 206.789063 238.480469 210.660156 236.460938 213.941406 C 227.390625 205.800781 214.871094 214.660156 204.71875 209.859375 C 205.238281 205.648438 208.898438 202.710938 212.820313 201.730469 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 83.28125 219.039063 C 84.410156 216.488281 85.820313 214.058594 87.75 212.039063 C 87.28125 215.070313 86.410156 218.078125 84.488281 220.539063 C 84.191406 220.160156 83.582031 219.410156 83.28125 219.039063 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 267.980469 227.878906 C 286.730469 223.070313 304.960938 216.351563 323.898438 212.21875 C 323.78125 220.371094 319.851563 228.46875 312.820313 232.820313 C 300.480469 240.648438 285.308594 241.480469 272.238281 247.679688 C 270.589844 241.128906 269.75 234.398438 267.980469 227.878906 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 88.679688 241.808594 C 88.800781 234.25 92.699219 227.351563 96.871094 221.269531 C 99.398438 230.839844 96.980469 240.859375 94.449219 250.171875 C 91.160156 248.691406 88.460938 245.621094 88.679688 241.808594 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 342.03125 235.171875 C 347.378906 232.121094 353.410156 230.328125 359.539063 229.890625 C 349.191406 238.328125 346.710938 254.589844 333.011719 259.160156 C 331.441406 255.691406 330.121094 251.871094 331 248.019531 C 332.261719 242.210938 337.058594 237.980469 342.03125 235.171875 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 108.121094 254.398438 C 107.128906 246.578125 102.71875 236.371094 109.871094 230.21875 C 113.628906 234.011719 118.671875 235.890625 123.75 237.128906 C 124.308594 241.96875 120.800781 245.769531 119.398438 250.121094 C 118.589844 252.558594 119.808594 254.960938 120.761719 257.148438 C 116.679688 255.710938 112.609375 253.371094 108.121094 254.398438 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 217.921875 240.460938 C 231.398438 237.429688 244.898438 234.449219 258.578125 232.398438 C 260.519531 238.949219 261.179688 245.789063 263.011719 252.359375 C 252.511719 253.488281 242.558594 257.328125 232.128906 258.808594 C 226.058594 259.730469 219.890625 259.640625 213.789063 259.160156 C 213.851563 253.339844 213.679688 247.53125 213.839844 241.71875 C 214.980469 240.851563 216.578125 240.878906 217.921875 240.460938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 128.96875 254.960938 C 133.339844 250.730469 130.75 243.761719 134.589844 239.238281 C 144.121094 244.53125 155.558594 241.429688 165.570313 245.109375 C 162.058594 249.070313 164.871094 254.511719 164.308594 259.199219 C 152.460938 259.171875 140.140625 259.539063 128.96875 254.960938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 175.949219 243.828125 C 185.699219 245.171875 195.03125 241.199219 204.71875 241.179688 C 204.769531 247.179688 204.730469 253.191406 204.75 259.191406 C 194.21875 259.210938 183.699219 259.238281 173.171875 259.179688 C 171.789063 253.679688 176.320313 249.25 175.949219 243.828125 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 276.800781 263.980469 C 292.460938 260.179688 307.199219 253.46875 321.460938 246.109375 C 320.160156 254.050781 321.988281 262.660156 328.121094 268.210938 C 313.691406 276.550781 301.238281 288.070313 285.96875 294.988281 C 285.78125 285.910156 277.609375 279.730469 276.710938 270.878906 C 276.359375 268.578125 276.621094 266.269531 276.800781 263.980469 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 222.78125 279.660156 C 238.28125 277.699219 252.910156 271.921875 267.378906 266.300781 C 266.988281 271.5 266.878906 276.96875 269.28125 281.75 C 272.058594 287.519531 275.929688 292.921875 276.738281 299.449219 C 263.148438 302.789063 250.101563 308.53125 236.058594 309.820313 C 231.769531 310.328125 227.449219 309.71875 223.269531 308.78125 C 224.988281 299.109375 221.261719 289.390625 222.78125 279.660156 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 85.550781 281.328125 C 84.628906 279.511719 84.761719 277.449219 85.089844 275.511719 C 87.25 280.578125 90.988281 284.78125 93.140625 289.851563 C 94.28125 292.238281 93.691406 294.921875 92.667969 297.230469 C 91.460938 291.441406 87.941406 286.621094 85.550781 281.328125 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 103.078125 281.621094 C 110.148438 288.109375 113.859375 297.261719 116.769531 306.199219 C 111.269531 304.78125 105.480469 304.140625 100.339844 301.621094 C 98.800781 300.96875 98.320313 299.289063 97.71875 297.910156 C 98.558594 298.648438 99.378906 299.398438 100.199219 300.171875 C 101.960938 299.679688 104.019531 299.488281 105.269531 297.96875 C 107.289063 292.191406 99.371094 287.140625 103.078125 281.621094 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 177.910156 286.46875 C 190.03125 287.53125 202.199219 285.5 213.78125 281.960938 C 214.390625 291.621094 211.519531 301.878906 215.578125 311.050781 C 204.859375 314.640625 193.421875 312.679688 182.359375 313 C 181.261719 304.089844 179.109375 295.359375 177.910156 286.46875 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 119.25 286.179688 C 124.710938 285.800781 129.238281 289.988281 134.78125 289.121094 C 134.5 297.070313 140.21875 303.28125 141.640625 310.820313 C 136.46875 310.070313 130.980469 309.839844 126.480469 306.878906 C 127.070313 305.019531 128.109375 303 127.160156 301.058594 C 125.328125 295.691406 120.960938 291.621094 119.25 286.179688 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.826599%,98.826599%,98.826599%);fill-opacity:1;" d="M 144.121094 288.601563 C 150.839844 287.03125 158.648438 286.121094 164.53125 290.511719 C 171.238281 295.941406 172.109375 305.21875 173.109375 313.191406 C 166.398438 313.46875 159.601563 313.101563 153.191406 310.921875 C 151.390625 303.011719 146.539063 296.289063 144.121094 288.601563 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 305.71875 310.820313 C 316.640625 305.820313 327.878906 300.71875 339.980469 299.601563 C 320.449219 306.589844 302.378906 316.878906 283.609375 325.578125 C 259.351563 336.890625 233.148438 346.371094 206 345.199219 C 195.988281 344.019531 186.011719 346.089844 175.980469 345.988281 C 156.710938 345.761719 137.210938 348.148438 118.121094 344.390625 C 110.21875 342.679688 101.980469 339.648438 96.832031 333.070313 C 94.167969 329.910156 92.78125 325.941406 91.988281 321.941406 C 98.929688 333.601563 112.171875 339.179688 124.859375 342.058594 C 140.628906 345.417969 156.921875 346.53125 173 345.121094 C 194.558594 344.199219 216.398438 344.390625 237.511719 339.300781 C 261.609375 333.441406 283.488281 321.421875 305.71875 310.820313 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 328.058594 313.210938 C 339.019531 307.808594 349.738281 300.640625 362.25 299.699219 C 348.660156 308.851563 333.851563 316.070313 318.960938 322.859375 C 260.339844 348.871094 196.050781 361.191406 132.03125 361.261719 C 119.289063 361.332031 106.300781 360.800781 94.050781 356.960938 C 84.332031 353.917969 75.25 347.808594 70.121094 338.851563 C 69.96875 335.070313 68.460938 330.878906 69.949219 327.300781 C 70.449219 327.011719 71.449219 326.441406 71.949219 326.148438 C 72.050781 330.75 71.980469 335.359375 72 339.960938 C 77.519531 345.53125 84.488281 349.460938 91.832031 352.101563 C 103.101563 356.25 115.101563 357.910156 127.019531 358.78125 C 145.75 359.910156 164.53125 358.75 183.171875 356.78125 C 233.628906 351.480469 282.808594 335.988281 328.058594 313.210938 "/>
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(5.099487%,5.099487%,5.099487%);fill-opacity:1;" d="M 144.640625 331.460938 C 158.761719 331.582031 172.890625 331.238281 186.988281 331.71875 C 196.308594 331.738281 206.351563 329.082031 215.148438 333.21875 C 199.78125 332.550781 184.429688 333.769531 169.058594 333.800781 C 160.910156 333.582031 152.53125 333.789063 144.640625 331.460938 "/>
        </g>
        </svg>        
        `);
      var b64Start = 'data:image/svg+xml;base64,';
      var image64 = b64Start + svg64;
      if (!m.img) m.img = new Image();
      m.img.src = image64;
      simulation.isAutoZoom = true;
      m.hardLandCDScale = 1
      m.yOffWhen.jump = 70
      m.yOffWhen.stand = 49
      m.yOffWhen.crouch = 22
      m.isAltSkin = false
      m.coyoteCycles = 5
      m.hardLanding = 130
      m.squirrelFx = 1;
      m.squirrelJump = 1;
      m.velocitySmooth = { x: 0, y: 0 }
      requestAnimationFrame(() => { m.setMovement() })
      m.color = {
        hue: 0,
        sat: 0,
        light: 100,
      }
      m.setFillColors();
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5 //|| (m.cycle % 40 > 20)
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);

        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        if (!(m.angle > -Math.PI / 2 && m.angle < Math.PI / 2)) ctx.scale(1, -1); //here is the flip
        ctx.drawImage(m.img, -m.img.width / 2, -m.img.height / 2);
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 5;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 14, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 14, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 12, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 12, m.foot.y + 8);
        }
        ctx.lineWidth = 4;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 9, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 5, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 4, m.foot.y + 1);
        ctx.arc(m.foot.x, m.foot.y + 1, 4, 0, 2 * Math.PI);
        ctx.fillStyle = m.fillColor;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    },
    flipFlop() {
      m.isAltSkin = true
      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;

        //draw body
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);

        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");

        ctx.rotate(m.angle);
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, 2 * Math.PI);
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        //draw eye
        ctx.beginPath();
        ctx.arc(15, 0, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = m.eyeFillColor;
        ctx.fill()
        ctx.restore();

        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
    },
    hexagon() {
      m.isAltSkin = true

      m.fillColor = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light}%)`
      m.fillColorDark = `hsl(${m.color.hue},${m.color.sat}%,${m.color.light - 35}%)`
      let grd = ctx.createLinearGradient(-30, 0, 30, 0);
      grd.addColorStop(0, m.fillColorDark);
      grd.addColorStop(0.7, m.fillColor);
      // grd.addColorStop(1, m.fillColor);
      m.bodyGradient = grd

      m.draw = function () {
        ctx.fillStyle = m.fillColor;
        m.walk_cycle += m.flipLegs * m.Vx;
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(m.pos.x, m.pos.y);
        m.calcLeg(Math.PI, -3);
        m.drawLeg("#4a4a4a");
        m.calcLeg(0, 0);
        m.drawLeg("#333");
        ctx.rotate(m.angle);

        const size = 32
        ctx.beginPath();
        ctx.lineTo(size * 1, size * 0)
        ctx.lineTo(size * 0.5, size * 0.866)
        ctx.lineTo(size * -0.5, size * 0.866)
        ctx.lineTo(size * -1, size * 0)
        ctx.lineTo(size * -0.5, size * -0.866)
        ctx.lineTo(size * 0.5, size * -0.866)
        ctx.lineTo(size * 1, size * 0)
        ctx.fillStyle = m.bodyGradient
        ctx.fill();
        ctx.arc(15, 0, 4, 0, 2 * Math.PI);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
        m.yOff = m.yOff * 0.85 + m.yOffGoal * 0.15; //smoothly move leg height towards height goal
        powerUps.boost.draw()
      }
      m.drawLeg = function (stroke) {
        // if (simulation.mouseInGame.x > m.pos.x) {
        if (m.angle > -Math.PI / 2 && m.angle < Math.PI / 2) {
          m.flipLegs = 1;
        } else {
          m.flipLegs = -1;
        }
        ctx.save();
        ctx.scale(m.flipLegs, 1); //leg lines
        ctx.beginPath();
        ctx.moveTo(m.hip.x, m.hip.y);
        ctx.lineTo(m.knee.x, m.knee.y);
        ctx.lineTo(m.foot.x, m.foot.y);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 6;
        ctx.stroke();

        //toe lines
        ctx.beginPath();
        ctx.moveTo(m.foot.x, m.foot.y);
        if (m.onGround) {
          ctx.lineTo(m.foot.x - 15, m.foot.y + 5);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 15, m.foot.y + 5);
        } else {
          ctx.lineTo(m.foot.x - 13, m.foot.y + 8);
          ctx.moveTo(m.foot.x, m.foot.y);
          ctx.lineTo(m.foot.x + 13, m.foot.y + 8);
        }
        ctx.lineWidth = 3;
        ctx.stroke();

        //hip joint
        ctx.beginPath();
        ctx.arc(m.hip.x, m.hip.y, 11, 0, 2 * Math.PI);
        //knee joint
        ctx.moveTo(m.knee.x + 5, m.knee.y);
        ctx.arc(m.knee.x, m.knee.y, 5, 0, 2 * Math.PI);
        //foot joint
        ctx.moveTo(m.foot.x + 5, m.foot.y);
        ctx.arc(m.foot.x, m.foot.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#000";
        ctx.fill();
        // ctx.lineWidth = 2;
        // ctx.stroke();
        ctx.restore();
      }
    },
  },
  // *********************************************
  // **************** fields *********************
  // *********************************************
  closest: {
    dist: 1000,
    index: 0
  },
  isHolding: false,
  isCloak: false,
  throwCharge: 0,
  fireCDcycle: 0,
  fieldCDcycle: 0,
  fieldMode: 0, //basic field mode before upgrades
  maxEnergy: 1, //can be increased by a tech
  holdingTarget: null,
  timeSkipLastCycle: 0,
  coupling: 0,
  // these values are set on reset by setHoldDefaults()
  fieldFx: 1,
  fieldJump: 1,
  blockingRecoil: 4,
  grabPowerUpRange2: 0,
  isFieldActive: false,
  fieldRange: 155,
  fieldShieldingScale: 1,
  fieldDamage: 1,
  isSneakAttack: false,
  lastHit: 0, //stores value of last damage player took above a threshold, in m.damage
  sneakAttackCycle: 0,
  enterCloakCycle: 0,
  duplicateChance: 0,
  energy: 0,
  fieldRegen: 0.001,
  fieldMode: 0,
  fieldFire: false,
  fieldHarmReduction: 1,
  holdingMassScale: 0,
  hole: {
    isOn: false,
    isReady: false,
    pos1: { x: 0, y: 0 },
    pos2: { x: 0, y: 0 },
  },
  fieldArc: 0,
  fieldThreshold: 0,
  calculateFieldThreshold() {
    m.fieldThreshold = Math.cos((m.fieldArc) * Math.PI)
  },
  setHoldDefaults() {
    // if (tech.isFreeWormHole && m.fieldMode !== 9) { //not wormhole
    //     const removed = tech.removeTech("charmed baryon") //neutronum can get player stuck so it has to be removed if player has wrong field
    //     if (removed) powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
    // }
    if (tech.isNeutronium && m.fieldMode !== 3) { //not negative mass field
      const removed = tech.removeTech("neutronium") //neutronum can get player stuck so it has to be removed if player has wrong field
      if (removed) powerUps.directSpawn(m.pos.x, m.pos.y, "tech");
    }
    if (m.energy < m.maxEnergy) m.energy = m.maxEnergy;
    m.fieldMeterColor = "#0cf"
    m.eyeFillColor = m.fieldMeterColor
    m.fieldShieldingScale = 1;
    m.fieldBlockCD = 10;
    m.fieldDamage = 1
    m.fieldHarmReduction = 1;
    m.isSneakAttack = false
    m.duplicateChance = 0
    m.grabPowerUpRange2 = 200000;
    m.blockingRecoil = 4;
    m.fieldRange = 155;
    m.fieldFire = false;
    m.fieldCDcycle = 0;
    m.isCloak = false;
    player.collisionFilter.mask = cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield
    m.airSpeedLimit = 125
    m.fieldFx = 1
    m.fieldJump = 1
    m.setFieldRegen();
    m.setMovement();
    m.drop();
    m.holdingMassScale = 0.5;
    m.fieldArc = 0.2; //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
    m.calculateFieldThreshold(); //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
    m.isTimeDilated = true;
    m.wakeCheck();
    m.setMaxEnergy(false);
    m.setMaxHealth(false);
    m.couplingChange()
    m.hole = {
      isOn: false,
      isReady: false,
      pos1: { x: 0, y: 0 },
      pos2: { x: 0, y: 0 },
    }
  },
  setMaxEnergy(isMessage = true) {
    m.maxEnergy = (tech.isMaxEnergyTech ? 0.5 : 1) + tech.bonusEnergy + tech.healMaxEnergyBonus + tech.harmonicEnergy + 3 * tech.isGroundState + 1.5 * (m.fieldMode === 1) + (m.fieldMode === 0 || m.fieldMode === 1) * 0.05 * m.coupling + 0.77 * tech.isStandingWaveExpand
    if (tech.isRelay && tech.isFlipFlopOn && tech.isRelayEnergy) m.maxEnergy += 3
    m.maxEnergy *= m.fieldUpgrades[1].energyHealthRatio
    if (level.isReducedEnergy) m.maxEnergy *= 0.5
    if (isMessage) simulation.inGameConsole(`<span class='color-var'>m</span>.<span class='color-f'>maxEnergy</span> <span class='color-symbol'>=</span> ${(m.maxEnergy.toFixed(2))}`)
  },
  fieldMeterColor: "#0cf",
  drawRegenEnergy(bgColor = "rgba(0, 0, 0, 0.4)", range = 60) {
    if (m.energy < m.maxEnergy) {
      m.regenEnergy();
      ctx.fillStyle = bgColor;
      const xOff = m.pos.x - m.radius * m.maxEnergy
      const yOff = m.pos.y - 50
      ctx.fillRect(xOff, yOff, range * m.maxEnergy, 10);
      ctx.fillStyle = m.fieldMeterColor;
      ctx.fillRect(xOff, yOff, range * m.energy, 10);

    } else if (m.energy > m.maxEnergy + 0.05) {
      ctx.fillStyle = bgColor;
      const xOff = m.pos.x - m.radius * m.energy
      const yOff = m.pos.y - 50
      // ctx.fillRect(xOff, yOff, range * m.maxEnergy, 10);
      ctx.fillStyle = m.fieldMeterColor;
      ctx.fillRect(xOff, yOff, range * m.energy, 10);
    }
  },
  drawRegenEnergyCloaking: function () {
    if (m.energy < m.maxEnergy) { // replaces m.drawRegenEnergy() with custom code
      m.regenEnergy();
      const xOff = m.pos.x - m.radius * m.maxEnergy
      const yOff = m.pos.y - 50
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)" //
      ctx.fillRect(xOff, yOff, 60 * m.maxEnergy, 10);
      ctx.fillStyle = "#fff" //m.cycle > m.lastKillCycle + 300 ? "#000" : "#fff" //"#fff";
      ctx.fillRect(xOff, yOff, 60 * m.energy, 10);
      ctx.beginPath()
      ctx.rect(xOff, yOff, 60 * m.maxEnergy, 10);
      ctx.strokeStyle = m.fieldMeterColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  },
  setFieldRegen() {
    if (m.fieldMode === 0) {
      m.fieldRegen = 0.00067  //4 energy per second for field emitter
    } else if (m.fieldMode === 6) {
      m.fieldRegen = 0.002  //12 energy per second for time dilation
    } else if (m.fieldMode === 2) {
      m.fieldRegen = 0.000833 //5 energy per second perfect diamagnetism
    } else if (m.fieldMode === 4) {
      m.fieldRegen = 0.002 //12 energy per second molecular assembler
    } else if (m.fieldMode === 5) {
      m.fieldRegen = 0.001667 //10 energy per second  plasma torch
    } else if (m.fieldMode === 8) {
      m.fieldRegen = 0.001667 //10 energy per second pilot wave
    } else if (m.fieldMode === 9) {
      m.fieldRegen = 0.001334 //8 energy per second wormhole
    } else if (m.fieldMode === 10) {
      m.fieldRegen = 0.0015 //9 energy per second grappling hook
    } else {
      m.fieldRegen = 0.001 //6 energy per second
    }
    if (m.fieldMode === 0 || m.fieldMode === 4) m.fieldRegen += 0.0001 * m.coupling
    if (tech.isTimeCrystals) {
      m.fieldRegen *= 2.5
    } else if (tech.isGroundState) {
      m.fieldRegen *= 0.66
    }
  },
  regenEnergy() { //used in drawRegenEnergy  // rewritten by some tech
    if (m.immuneCycle < m.cycle && m.fieldCDcycle < m.cycle) m.energy += m.fieldRegen * level.isReducedRegen;
    if (m.energy < 0) m.energy = 0
  },
  regenEnergyDefault() {
    if (m.immuneCycle < m.cycle && m.fieldCDcycle < m.cycle) m.energy += m.fieldRegen * level.isReducedRegen;
    if (m.energy < 0) m.energy = 0
  },
  lookingAt(who) {
    //calculate a vector from body to player and make it length 1
    const diff = Vector.normalise(Vector.sub(who.position, m.pos));
    //make a vector for the player's direction of length 1
    const dir = { x: Math.cos(m.angle), y: Math.sin(m.angle) };
    //the dot product of diff and dir will return how much over lap between the vectors
    if (Vector.dot(dir, diff) > m.fieldThreshold) {
      return true;
    }
    return false;
  },
  drop() {
    if (m.isHolding) {
      m.fieldCDcycle = m.cycle + 15;
      m.isHolding = false;
      m.throwCharge = 0;
      m.definePlayerMass()
    }
    if (m.holdingTarget) {
      m.holdingTarget.collisionFilter.category = cat.body;
      m.holdingTarget.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
      m.holdingTarget = null;
    }
  },
  definePlayerMass(mass = m.defaultMass) {
    Matter.Body.setMass(player, mass);
    //reduce air and ground move forces
    m.setMovement()
    //make player stand a bit lower when holding heavy masses
    m.yOffWhen.stand = Math.max(m.yOffWhen.crouch, Math.min(49, 49 - (mass - 5) * 6))
    if (m.onGround && !m.crouch) m.yOffGoal = m.yOffWhen.stand;
  },
  drawHold(target, stroke = true) {
    if (target) {
      const eye = 15 * player.scale;
      const len = target.vertices.length - 1;
      ctx.fillStyle = "rgba(110,170,200," + (0.2 + 0.4 * Math.random()) + ")";
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(
        m.pos.x + eye * Math.cos(m.angle),
        m.pos.y + eye * Math.sin(m.angle)
      );
      ctx.lineTo(target.vertices[len].x, target.vertices[len].y);
      ctx.lineTo(target.vertices[0].x, target.vertices[0].y);
      ctx.fill();
      if (stroke) ctx.stroke();
      for (let i = 0; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(
          m.pos.x + eye * Math.cos(m.angle),
          m.pos.y + eye * Math.sin(m.angle)
        );
        ctx.lineTo(target.vertices[i].x, target.vertices[i].y);
        ctx.lineTo(target.vertices[i + 1].x, target.vertices[i + 1].y);
        ctx.fill();
        if (stroke) ctx.stroke();
      }
    }
  },
  holding() {
    if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle - 1
    if (m.holdingTarget) {
      m.energy -= m.fieldRegen;
      if (m.energy < 0) m.energy = 0;
      const r = 30 + 40 * player.scale
      Matter.Body.setPosition(m.holdingTarget, { 
        x: m.pos.x + r * Math.cos(m.angle),
         y: m.pos.y + r * Math.sin(m.angle)
      });
      Matter.Body.setVelocity(m.holdingTarget, player.velocity);
      Matter.Body.rotate(m.holdingTarget, 0.01 / m.holdingTarget.mass); //gently spin the block

      //check for block collisions with mobs and push the mobs
      const collide = Matter.Query.collides(m.holdingTarget, mob)
      if (m.fieldCDcycle < m.cycle && collide.length) {
        let push = function (who) { // similar code to m.pushMobsFacing()
          fieldBlockCost = (0.025 + Math.sqrt(who.mass) * Vector.magnitude(Vector.sub(who.velocity, player.velocity)) * 0.002) * m.fieldShieldingScale
          if (who.isShielded) fieldBlockCost *= 2; //shielded mobs take more energy to block
          m.energy -= fieldBlockCost

          who.locatePlayer();
          const unit = Vector.normalise(Vector.sub(player.position, who.position))
          // if (tech.blockDmg) {
          //     Matter.Body.setVelocity(who, { x: 0.5 * who.velocity.x, y: 0.5 * who.velocity.y });
          //     if (who.isShielded) {
          //         for (let i = 0, len = mob.length; i < len; i++) {
          //             if (mob[i].id === who.shieldID) mob[i].damage(tech.blockDmg * (tech.isBlockRadiation ? 6 : 2), true)
          //         }
          //     } else if (tech.isBlockRadiation) {
          //         if (who.isMobBullet) {
          //             who.damage(tech.blockDmg * 3, true)
          //         } else {
          //             mobs.statusDoT(who, tech.blockDmg * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
          //         }
          //     } else {
          //         who.damage(tech.blockDmg, true)
          //     }
          //     const step = 40
          //     ctx.beginPath(); //draw electricity
          //     for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
          //         let x = m.pos.x - 20 * unit.x;
          //         let y = m.pos.y - 20 * unit.y;
          //         ctx.moveTo(x, y);
          //         for (let i = 0; i < 8; i++) {
          //             x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
          //             y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
          //             ctx.lineTo(x, y);
          //         }
          //     }
          //     ctx.lineWidth = 3;
          //     ctx.strokeStyle = "#f0f";
          //     ctx.stroke();
          // } else {
          //     m.drawHold(who);
          // }

          const massRoot = Math.sqrt(Math.min(12, Math.max(0.15, who.mass))); // masses above 12 can start to overcome the push back
          Matter.Body.setVelocity(who, { x: player.velocity.x - (15 * unit.x) / massRoot, y: player.velocity.y - (15 * unit.y) / massRoot });
          if (who.isUnstable) {
            if (m.fieldCDcycle < m.cycle + 30) m.fieldCDcycle = m.cycle + 10
            who.death();
          }
          const playerPushScale = m.blockingRecoil * massRoot * (5 / player.mass)
          if (m.crouch) {
            Matter.Body.setVelocity(player, { x: player.velocity.x + 0.1 * unit.x * playerPushScale, y: player.velocity.y + 0.1 * unit.y * playerPushScale });
          } else {
            Matter.Body.setVelocity(player, { x: player.velocity.x + unit.x * playerPushScale, y: player.velocity.y + unit.y * playerPushScale });
          }
        }

        for (let i = 0; i < collide.length; i++) {
          if (collide[i].bodyA.alive) {
            push(collide[i].bodyA);
          } else if (collide[i].bodyB.alive) {
            push(collide[i].bodyB);
          }
        }
        if (m.energy < m.minEnergyToDeflect) {
          m.energy = 0;
          m.fieldCDcycle = m.cycle + Math.max(m.fieldBlockCD, 60);
          m.drop()
        } else {
          m.fieldCDcycle = m.cycle + 10;
        }
      }
    } else {
      m.isHolding = false
    }
  },
  throwBlock() { },
  throwBlockDefault() {
    if (m.holdingTarget) {
      if (input.field) {
        if (m.energy > 0.001) {
          if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle
          if (tech.isCapacitor && m.throwCharge < 4) m.throwCharge = 4
          m.throwCharge += 0.5 / m.holdingTarget.mass / b.fireCDscale
          if (m.throwCharge < 6) m.energy -= 0.001 / b.fireCDscale; // m.throwCharge caps at 5 

          //trajectory path prediction
          const eye = 15 * player.scale;
          if (tech.isTokamak) {
            //draw charge            
            const x = m.pos.x + eye * Math.cos(m.angle);
            const y = m.pos.y + eye * Math.sin(m.angle);
            const len = m.holdingTarget.vertices.length - 1;
            const opacity = m.throwCharge > 4 ? 0.65 : m.throwCharge * 0.06
            ctx.fillStyle = `rgba(255,0,255,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
            ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
            ctx.fill();
            for (let i = 0; i < len; i++) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
              ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
              ctx.fill();
            }
            if (tech.isTokamakFly && m.throwCharge > 4 && m.energy > 0.01) {
              player.force.y -= 0.5 * player.mass * simulation.g; //add some reduced gravity
              // const mass = (player.mass + 10) / 3 * simulation.g //this makes it so you fly slower with larger blocks
              let isDrain = false
              const thrust = player.mass * simulation.g * Math.pow(5 / player.mass, 0.1)
              if (input.down) {
                isDrain = true
                player.force.y += 0.9 * thrust;
              } else if (input.up) {
                isDrain = true
                player.force.y -= 0.9 * thrust
              }
              if (!m.onGround) {
                if (input.left) {
                  isDrain = true
                  player.force.x -= 0.4 * thrust
                } else if (input.right) {
                  isDrain = true
                  player.force.x += 0.4 * thrust
                }
                if (isDrain) m.energy -= 0.0017;
              }

            }
          } else {
            if (tech.isGroupThrow) {
              const range = 810000

              for (let i = 0; i < body.length; i++) {
                const sub = Vector.sub(m.pos, body[i].position)
                const dist2 = Vector.magnitudeSquared(sub)
                if (dist2 < range) {
                  body[i].force.y -= body[i].mass * (simulation.g * 1.01); //remove a bit more then standard gravity
                  if (dist2 > 40000) {
                    const f = Vector.mult(Vector.normalise(sub), 0.0008 * body[i].mass)
                    body[i].force.x += f.x
                    body[i].force.y += f.y
                    Matter.Body.setVelocity(body[i], { x: 0.96 * body[i].velocity.x, y: 0.96 * body[i].velocity.y });
                  }
                }
              }
              ctx.beginPath();
              ctx.arc(m.pos.x, m.pos.y, Math.sqrt(range), 0, 2 * Math.PI);
              ctx.fillStyle = "rgba(245,245,255,0.15)";
              ctx.fill();
              // ctx.globalCompositeOperation = "difference";
              // ctx.globalCompositeOperation = "source-over";
            }
            //draw charge
            const eye = 15 * player.scale;        
            const x = m.pos.x + eye * Math.cos(m.angle);
            const y = m.pos.y + eye * Math.sin(m.angle);
            const len = m.holdingTarget.vertices.length - 1;
            const edge = m.throwCharge * m.throwCharge * m.throwCharge;
            const grd = ctx.createRadialGradient(x, y, edge, x, y, edge + 5);
            grd.addColorStop(0, "rgba(255,50,150,0.3)");
            grd.addColorStop(1, "transparent");
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
            ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
            ctx.fill();
            for (let i = 0; i < len; i++) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
              ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
              ctx.fill();
            }
            //trajectory prediction
            const cycles = 30
            const charge = Math.min(m.throwCharge / 5, 1)
            const speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))
            const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }
            ctx.beginPath()
            for (let i = 1, len = 10; i < len + 1; i++) {
              const time = cycles * i / len
              ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
            }
            ctx.strokeStyle = "rgba(68, 68, 68, 0.15)" //color.map
            ctx.lineWidth = 2
            ctx.stroke()
          }
        } else {
          m.drop()
        }
      } else if (m.throwCharge > 0) { //Matter.Query.region(mob, player.bounds)
        if (m.holdingTarget.isPrinted) m.holdingTarget.isPrinted = undefined
        //throw the body
        m.fieldCDcycle = m.cycle + 20;
        m.fireCDcycle = m.cycle + 20;

        m.isHolding = false;

        if (tech.isTokamak && m.throwCharge > 4) { //remove the block body and pulse  in the direction you are facing
          //m.throwCharge > 5 seems to be when the field full colors in a block you are holding
          m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
          if (m.immuneCycle < m.cycle) m.energy += 0.25 * Math.sqrt(m.holdingTarget.mass) * Math.min(5, m.throwCharge) * level.isReducedRegen
          m.throwCharge = 0;
          m.definePlayerMass() //return to normal player mass
          //remove block before pulse, so it doesn't get in the way
          for (let i = 0; i < body.length; i++) {
            if (body[i] === m.holdingTarget) {
              Matter.Composite.remove(engine.world, body[i]);
              body.splice(i, 1);
            }
          }
          b.pulse(60 * Math.pow(m.holdingTarget.mass, 0.25), m.angle)
          if (tech.isTokamakHeal && tech.tokamakHealCount < 5) {
            tech.tokamakHealCount++
            let massScale = Math.min(65 * Math.sqrt(m.maxHealth), 14 * Math.pow(m.holdingTarget.mass, 0.4))
            if (powerUps.healGiveMaxEnergy) massScale = powerUps["heal"].size()
            powerUps.spawn(m.pos.x, m.pos.y, "heal", true, massScale * (simulation.healScale ** 0.25) * Math.sqrt(tech.largerHeals * (tech.isHalfHeals ? 0.5 : 1)))  //    spawn(x, y, target, moving = true, mode = null, size = powerUps[target].size()) {
          }
        } else { //normal throw
          //bullet-like collisions
          m.holdingTarget.collisionFilter.category = cat.bullet
          m.holdingTarget.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield;
          if (tech.isBlockRestitution) {
            m.holdingTarget.restitution = 0.999 //extra bouncy
            m.holdingTarget.friction = m.holdingTarget.frictionStatic = m.holdingTarget.frictionAir = 0.001
          }
          //check every second to see if player is away from thrown body, and make solid
          const solid = function (that) {
            const dx = that.position.x - player.position.x;
            const dy = that.position.y - player.position.y;
            // if (that.speed < 3 && dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
            if (dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
              that.collisionFilter.category = cat.body; //make solid
              that.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet; //can hit player now
            } else {
              setTimeout(solid, 40, that);
            }
          };
          setTimeout(solid, 200, m.holdingTarget);

          const charge = Math.min(m.throwCharge / 5, 1)
          //***** scale throw speed with the first number, 80 *****
          // let speed = 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25));
          let speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))

          if (Matter.Query.collides(m.holdingTarget, map).length !== 0) {
            speed *= 0.7 //drop speed by 30% if touching map
            if (Matter.Query.ray(map, m.holdingTarget.position, m.pos).length !== 0) speed = 0 //drop to zero if the center of the block can't see the center of the player through the map
          }
          m.throwCharge = 0;
          m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
          Matter.Body.setVelocity(m.holdingTarget, {
            x: player.velocity.x * 0.5 + Math.cos(m.angle) * speed,
            y: player.velocity.y * 0.5 + Math.sin(m.angle) * speed
          });
          Matter.Body.setVelocity(player, {
            x: player.velocity.x - Math.cos(m.angle) * speed / (m.crouch ? 30 : 10) * Math.sqrt(m.holdingTarget.mass),
            y: player.velocity.y - Math.sin(m.angle) * speed / 30 * Math.sqrt(m.holdingTarget.mass)
          });
          m.definePlayerMass() //return to normal player mass

          if (tech.isStaticBlock) m.holdingTarget.isStatic = true
          if (tech.isAddBlockMass) {
            const expand = function (that, massLimit) {
              if (that.mass < massLimit) {
                const scale = 1.04;
                Matter.Body.scale(that, scale, scale);
                setTimeout(expand, 20, that, massLimit);
              }
            };
            expand(m.holdingTarget, Math.min(20, m.holdingTarget.mass * 3))
          }
          if (tech.isGroupThrow) {
            const range = 810000
            for (let i = 0; i < body.length; i++) {
              if (body[i] !== m.holdingTarget) {
                const dist2 = Vector.magnitudeSquared(Vector.sub(m.pos, body[i].position))
                if (dist2 < range) {
                  const blockSpeed = 90 * charge * Math.min(0.85, 0.8 / Math.pow(body[i].mass, 0.25)) * Math.pow((range - dist2) / range, 0.2)
                  Matter.Body.setVelocity(body[i], {
                    x: body[i].velocity.x * 0.5 + Math.cos(m.angle) * blockSpeed,
                    y: body[i].velocity.y * 0.5 + Math.sin(m.angle) * blockSpeed
                  });
                }
              }
            }
          }
        }
      }
    } else {
      m.isHolding = false
    }
  },
  throwSelf() {
    if (m.holdingTarget) {
      if (input.field) {
        if (m.energy > 0.001) {
          if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle
          if (tech.isCapacitor && m.throwCharge < 4) m.throwCharge = 4
          m.throwCharge += 0.5 / m.holdingTarget.mass / b.fireCDscale
          if (m.throwCharge < 6) m.energy -= 0.001 / b.fireCDscale; // m.throwCharge caps at 5 

          //trajectory path prediction
          //draw charge
          let eye = 15 * player.scale;        
          const x = m.pos.x + eye * Math.cos(m.angle);
          const y = m.pos.y + eye * Math.sin(m.angle);
          const len = m.holdingTarget.vertices.length - 1;
          const edge = m.throwCharge * m.throwCharge * m.throwCharge;
          const grd = ctx.createRadialGradient(x, y, edge, x, y, edge + 5);
          grd.addColorStop(0, "rgba(255,50,150,0.3)");
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(m.holdingTarget.vertices[len].x, m.holdingTarget.vertices[len].y);
          ctx.lineTo(m.holdingTarget.vertices[0].x, m.holdingTarget.vertices[0].y);
          ctx.fill();
          for (let i = 0; i < len; i++) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(m.holdingTarget.vertices[i].x, m.holdingTarget.vertices[i].y);
            ctx.lineTo(m.holdingTarget.vertices[i + 1].x, m.holdingTarget.vertices[i + 1].y);
            ctx.fill();
          }
          //trajectory prediction
          const cycles = 30
          const charge = Math.min(m.throwCharge / 5, 1)
          const speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))
          const v = { x: speed * Math.cos(m.angle), y: speed * Math.sin(m.angle) }
          ctx.beginPath()
          for (let i = 1, len = 10; i < len + 1; i++) {
            const time = cycles * i / len
            ctx.lineTo(m.pos.x + time * v.x, m.pos.y + time * v.y + 0.34 * time * time)
          }
          ctx.strokeStyle = "rgba(68, 68, 68, 0.15)" //color.map
          ctx.lineWidth = 2
          ctx.stroke()

        } else {
          m.drop()
        }
      } else if (m.throwCharge > 0) { //Matter.Query.region(mob, player.bounds)
        if (m.holdingTarget.isPrinted) m.holdingTarget.isPrinted = undefined
        //throw the body
        m.fieldCDcycle = m.cycle + 20;
        m.fireCDcycle = m.cycle + 20;

        m.isHolding = false;
        //bullet-like collisions
        m.holdingTarget.collisionFilter.category = cat.bullet
        m.holdingTarget.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield;
        if (tech.isBlockRestitution) {
          m.holdingTarget.restitution = 0.999 //extra bouncy
          m.holdingTarget.friction = m.holdingTarget.frictionStatic = m.holdingTarget.frictionAir = 0.001
        }
        //check every second to see if player is away from thrown body, and make solid
        const solid = function (that) {
          const dx = that.position.x - player.position.x;
          const dy = that.position.y - player.position.y;
          // if (that.speed < 3 && dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
          if (dx * dx + dy * dy > 10000 && that !== m.holdingTarget) {
            that.collisionFilter.category = cat.body; //make solid
            that.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet; //can hit player now
          } else {
            setTimeout(solid, 40, that);
          }
        };
        setTimeout(solid, 200, m.holdingTarget);

        const charge = Math.min(m.throwCharge / 5, 1)
        //***** scale throw speed with the first number, 80 *****
        // let speed = 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25));
        let speed = (tech.isPrinter ? 15 + 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.1)) : 80 * charge * Math.min(0.85, 0.8 / Math.pow(m.holdingTarget.mass, 0.25)))


        m.throwCharge = 0;
        m.throwCycle = m.cycle + 180 //used to detect if a block was thrown in the last 3 seconds
        Matter.Body.setVelocity(m.holdingTarget, {
          x: Math.cos(m.angle) * speed / (m.crouch ? 30 : 10) * Math.sqrt(m.holdingTarget.mass),
          y: player.velocity.y - Math.sin(m.angle) * speed / 30 * Math.sqrt(m.holdingTarget.mass)
        });
        Matter.Body.setVelocity(player, {
          x: player.velocity.x - player.velocity.x * 0.5 + Math.cos(m.angle) * speed,
          y: player.velocity.y - player.velocity.y * 0.5 + Math.sin(m.angle) * speed
        });
        m.definePlayerMass() //return to normal player mass

        if (tech.isAddBlockMass) {
          const expand = function (that, massLimit) {
            if (that.mass < massLimit) {
              const scale = 1.04;
              Matter.Body.scale(that, scale, scale);
              setTimeout(expand, 20, that, massLimit);
            }
          };
          expand(m.holdingTarget, Math.min(20, m.holdingTarget.mass * 3))
        }

      }
    } else {
      m.isHolding = false
    }
  },
  drawField() {
    if (m.holdingTarget) {
      ctx.fillStyle = "rgba(110,170,200," + (m.energy * (0.05 + 0.05 * Math.random())) + ")";
      ctx.strokeStyle = "rgba(110, 200, 235, " + (0.3 + 0.08 * Math.random()) + ")" //"#9bd" //"rgba(110, 200, 235, " + (0.5 + 0.1 * Math.random()) + ")"
    } else {
      ctx.fillStyle = "rgba(110,170,200," + (0.02 + m.energy * (0.15 + 0.15 * Math.random())) + ")";
      ctx.strokeStyle = "rgba(110, 200, 235, " + (0.6 + 0.2 * Math.random()) + ")" //"#9bd" //"rgba(110, 200, 235, " + (0.5 + 0.1 * Math.random()) + ")"
    }
    // const off = 2 * Math.cos(simulation.cycle * 0.1)
    const range = m.fieldRange;
    ctx.beginPath();
    ctx.arc(m.pos.x, m.pos.y, range, m.angle - Math.PI * m.fieldArc, m.angle + Math.PI * m.fieldArc, false);
    ctx.lineWidth = 2;
    ctx.stroke();
    let eye = 13 * player.scale;
    let aMag = 0.75 * Math.PI * m.fieldArc
    let a = m.angle + aMag
    let cp1x = m.pos.x + 0.6 * range * Math.cos(a)
    let cp1y = m.pos.y + 0.6 * range * Math.sin(a)
    ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle))
    a = m.angle - aMag
    cp1x = m.pos.x + 0.6 * range * Math.cos(a)
    cp1y = m.pos.y + 0.6 * range * Math.sin(a)
    ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 1 * range * Math.cos(m.angle - Math.PI * m.fieldArc), m.pos.y + 1 * range * Math.sin(m.angle - Math.PI * m.fieldArc))
    ctx.fill();
    // ctx.lineTo(m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle));

    //draw random lines in field for cool effect
    let offAngle = m.angle + 1.7 * Math.PI * m.fieldArc * (Math.random() - 0.5);
    ctx.beginPath();
    eye = 15 * player.scale;
    ctx.moveTo(m.pos.x + eye * Math.cos(m.angle), m.pos.y + eye * Math.sin(m.angle));
    ctx.lineTo(m.pos.x + range * Math.cos(offAngle), m.pos.y + range * Math.sin(offAngle));
    ctx.strokeStyle = "rgba(120,170,255,0.6)";
    ctx.lineWidth = 1;
    ctx.stroke();
  },
  grabPowerUp() { //look for power ups to grab with field
    if (m.fireCDcycle < m.cycle) m.fireCDcycle = m.cycle - 1
    for (let i = 0, len = powerUp.length; i < len; ++i) {
      if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
      const dxP = m.pos.x - powerUp[i].position.x;
      const dyP = m.pos.y - powerUp[i].position.y;
      const dist2 = dxP * dxP + dyP * dyP + 10;
      // float towards player  if looking at and in range  or  if very close to player
      if (
        dist2 < m.grabPowerUpRange2 &&
        (m.lookingAt(powerUp[i]) || dist2 < 10000) &&
        Matter.Query.ray(map, powerUp[i].position, m.pos).length === 0
      ) {
        if (!tech.isHealAttract || powerUp[i].name !== "heal") { //if you have accretion heals are already pulled in a different way
          powerUp[i].force.x += 0.04 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
          powerUp[i].force.y += 0.04 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
          Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 }); //extra friction
        }
        if ( //use power up if it is close enough
          dist2 < 5000 &&
          !simulation.isChoosing &&
          (powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01 || tech.isOverHeal)
        ) {
          powerUps.onPickUp(powerUp[i]);
          let velMult = ((tech.recoilReduction || 0) > 0 ? 0.5 ** tech.recoilReduction : 1); //dynamical billiards reduces powerUp pickup recoil
          Matter.Body.setVelocity(player, { //player knock back, after grabbing power up
            x: player.velocity.x + powerUp[i].velocity.x / player.mass * 4 * powerUp[i].mass * velMult,
            y: player.velocity.y + powerUp[i].velocity.y / player.mass * 4 * powerUp[i].mass * velMult
          });
          powerUp[i].effect();
          Matter.Composite.remove(engine.world, powerUp[i]);
          powerUp.splice(i, 1);
          return; //because the array order is messed up after splice
        }
      }
    }
  },
  grabPowerUpEasy() { //look for power ups to grab with field
    for (let i = 0, len = powerUp.length; i < len; ++i) {
      if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
      const dxP = m.pos.x - powerUp[i].position.x;
      const dyP = m.pos.y - powerUp[i].position.y;
      const dist2 = dxP * dxP + dyP * dyP + 10;
      // float towards player
      if (dist2 < m.grabPowerUpRange2 && Matter.Query.ray(map, powerUp[i].position, m.pos).length === 0) {
        if (!tech.isHealAttract || powerUp[i].name !== "heal") { //if you have accretion heals are already pulled in a different way
          powerUp[i].force.x += 0.05 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
          powerUp[i].force.y += 0.05 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
          Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 }); //extra friction
        }
        if ( //use power up if it is close enough
          dist2 < 20000 &&
          !simulation.isChoosing &&
          (powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01 || tech.isOverHeal)
        ) {
          powerUps.onPickUp(powerUp[i]);
          let velMult = ((tech.recoilReduction || 0) > 0 ? 0.5 ** tech.recoilReduction : 1); //dynamical billiards reduces powerUp pickup recoil
          Matter.Body.setVelocity(player, { //player knock back, after grabbing power up
            x: player.velocity.x + powerUp[i].velocity.x / player.mass * 4 * powerUp[i].mass * velMult,
            y: player.velocity.y + powerUp[i].velocity.y / player.mass * 4 * powerUp[i].mass * velMult
          });
          powerUp[i].effect();
          Matter.Composite.remove(engine.world, powerUp[i]);
          powerUp.splice(i, 1);
          return; //because the array order is messed up after splice
        }
      }
    }
  },
  minEnergyToDeflect: 0.05,
  bulletsToBlocks(who) {
    if (who.isMobBullet && !who.isInvulnerable && who.mass < 10 && body.length < mobs.maxMobBody) {
      // spawn block
      body[body.length] = Matter.Bodies.polygon(who.position.x, who.position.y, who.vertices.length, who.radius, {
        friction: 0.05,
        frictionAir: 0.001,
        collisionFilter: {
          category: cat.bullet,
          mask: cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
        },
        classType: "body",
        isPrinted: true,
        radius: 10, //used to grow and warp the shape of the block
        density: 0.002, //double density for 2x damage
      });
      const block = body[body.length - 1]
      Composite.add(engine.world, block); //add to world
      //reverse velocity and make sure it's above 40
      const unit = Vector.mult(Vector.normalise(who.velocity), -Math.max(40, who.speed))
      Matter.Body.setVelocity(block, unit);

      simulation.ephemera.push({
        name: "remove block",
        count: 120, //cycles before it self removes
        do() {
          this.count--
          if (this.count < 0) {
            simulation.removeEphemera(this.name)
            Matter.Composite.remove(engine.world, block);
            //find block
            for (let i = 0; i < body.length; i++) {
              if (body[i] === block) {
                body.splice(i, 1);
                break
              }
            }

          }
        },
      })
      //remove mob bullet
      Matter.Composite.remove(engine.world, who); //remove from physics early to avoid collisions with block
      who.alive = false
    }
  },
  pushMass(who, fieldBlockCost = (0.025 + Math.sqrt(who.mass) * Vector.magnitude(Vector.sub(who.velocity, player.velocity)) * 0.002) * m.fieldShieldingScale) {
    if (m.energy > m.minEnergyToDeflect) { //shield needs at least some of the cost to block
      if (who.isShielded) fieldBlockCost *= 2; //shielded mobs take more energy to block
      m.energy -= fieldBlockCost
      if (m.energy < m.minEnergyToDeflect) {
        m.energy = 0;
        m.fieldCDcycle = m.cycle + Math.max(m.fieldBlockCD, 60);
        if (tech.isLaserField) {
          simulation.ephemera.push({
            name: "laser field", //used to find this array element in simulation.removeEphemera()
            count: 20 + Math.floor(m.maxEnergy * 30 * 0.0018 / tech.laserDrain), //how many cycles the ephemera lasts, scales with max energy
            do() {
              this.count--
              if (this.count < 0) simulation.removeEphemera(this.name)
              for (let i = 0, num = 12; i < num; i++) { //draw random lasers
                const angle = 6.28 * i / num + m.cycle * 0.04
                b.laser({ x: m.pos.x + 30 * Math.cos(angle), y: m.pos.y + 30 * Math.sin(angle) }, { x: m.pos.x + 3000 * Math.cos(angle), y: m.pos.y + 3000 * Math.sin(angle) }, tech.laserDamage * 2.5)//dmg = tech.laserDamage, reflections = tech.laserReflections, isThickBeam = false, push = 1
              }
            },
          })
        }
      } else {
        m.fieldCDcycle = m.cycle + m.fieldBlockCD;
      }
      if (!who.isInvulnerable && (m.coupling && m.fieldMode === 0) && bullet.length < 200) { //for field emitter iceIX
        for (let i = 0; i < m.coupling; i++) {
          if (0.1 * m.coupling - i > 1.25 * Math.random()) {
            const sub = Vector.mult(Vector.normalise(Vector.sub(who.position, m.pos)), (m.fieldRange * m.harmonicRadius) * (0.4 + 0.3 * Math.random())) //m.harmonicRadius should be 1 unless you are standing wave expansion
            const rad = Vector.rotate(sub, 1 * (Math.random() - 0.5))
            const angle = Math.atan2(sub.y, sub.x)
            b.iceIX(6 + 6 * Math.random(), angle + 3 * (Math.random() - 0.5), Vector.add(m.pos, rad))
          }
        }
      }
      m.bulletsToBlocks(who)
      const unit = Vector.normalise(Vector.sub(player.position, who.position))
      if (tech.blockDmg) {
        Matter.Body.setVelocity(who, { x: 0.5 * who.velocity.x, y: 0.5 * who.velocity.y });
        if (who.isShielded) {
          for (let i = 0, len = mob.length; i < len; i++) {
            if (mob[i].id === who.shieldID) mob[i].damage(tech.blockDmg * (tech.isBlockRadiation ? 6 : 2), true)
          }
        } else if (tech.isBlockRadiation) {
          if (who.isMobBullet) {
            who.damage(tech.blockDmg * 3, true)
          } else {
            mobs.statusDoT(who, tech.blockDmg * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
          }
        } else {
          who.damage(tech.blockDmg, true)
        }
        const step = 40
        ctx.beginPath(); //draw electricity
        for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
          let x = m.pos.x - 20 * unit.x;
          let y = m.pos.y - 20 * unit.y;
          ctx.moveTo(x, y);
          for (let i = 0; i < 8; i++) {
            x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
            y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
            ctx.lineTo(x, y);
          }
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#f0f";
        ctx.stroke();
      } else {
        m.drawHold(who);
      }
      let coupleStun = ((m.coupling > 0 && (m.fieldMode === 0 || m.fieldMode === 13)) ? 60 * Math.pow(1.25, m.coupling / 16) : 0) //deflecting with field emitter or Einsteins shield has coupling effects
      if (tech.isStunField) {
        mobs.statusStun(who, tech.isStunField + coupleStun)
      } else if (m.coupling > 0 && (m.fieldMode === 0 || m.fieldMode === 13)) {
        mobs.statusStun(who, coupleStun)
      }
      //knock backs
      const massRoot = Math.sqrt(Math.min(12, Math.max(0.15, who.mass))); // masses above 12 can start to overcome the push back
      Matter.Body.setVelocity(who, { x: player.velocity.x - (15 * unit.x) / massRoot, y: player.velocity.y - (15 * unit.y) / massRoot });
      if (who.isUnstable) {
        if (m.fieldCDcycle < m.cycle + 30) m.fieldCDcycle = m.cycle + 10
        who.death();
      }
      if (m.crouch) {
        Matter.Body.setVelocity(player, { x: player.velocity.x + 0.1 * m.blockingRecoil * unit.x * massRoot, y: player.velocity.y + 0.1 * m.blockingRecoil * unit.y * massRoot });
      } else {
        Matter.Body.setVelocity(player, { x: player.velocity.x + m.blockingRecoil * unit.x * massRoot, y: player.velocity.y + m.blockingRecoil * unit.y * massRoot });
      }
    }
  },
  pushMobsFacing() { // find mobs in range and in direction looking
    for (let i = 0, len = mob.length; i < len; ++i) {
      if (
        Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < m.fieldRange &&
        m.lookingAt(mob[i]) &&
        !mob[i].isUnblockable &&
        Matter.Query.ray(map, mob[i].position, m.pos).length === 0
      ) {
        mob[i].locatePlayer();
        m.pushMass(mob[i]);

        if (tech.deflectEnergy && !mob[i].isInvulnerable && !mob[i].isShielded) {
          m.energy += tech.deflectEnergy * level.isReducedRegen
        }
      }
    }
  },
  lookForBlock() { //find body to pickup
    const grabbing = {
      targetIndex: null,
      targetRange: 80 + 70 * Math.max(1, player.scale),
      // lookingAt: false //false to pick up object in range, but not looking at
    };
    for (let i = 0, len = body.length; i < len; ++i) {
      if (Matter.Query.ray(map, body[i].position, m.pos).length === 0) {
        //is m next body a better target then my current best
        const dist = Vector.magnitude(Vector.sub(body[i].position, m.pos));
        const looking = m.lookingAt(body[i]);
        // if (dist < grabbing.targetRange && (looking || !grabbing.lookingAt) && !body[i].isNotHoldable) {
        if (dist < grabbing.targetRange + 30 && looking && !body[i].isNotHoldable) {
          grabbing.targetRange = dist;
          grabbing.targetIndex = i;
          // grabbing.lookingAt = looking;
        }
      }
    }
    // set pick up target for when mouse is released
    if (body[grabbing.targetIndex]) {
      m.holdingTarget = body[grabbing.targetIndex];
      ctx.beginPath(); //draw on each valid body
      let vertices = m.holdingTarget.vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      ctx.fillStyle = "rgba(190,215,230," + (0.3 + 0.7 * Math.random()) + ")";
      ctx.fill();

      ctx.globalAlpha = 0.2;
      m.drawHold(m.holdingTarget);
      ctx.globalAlpha = 1;
    } else {
      m.holdingTarget = null;
    }
  },
  pickUp() {
    //triggers when a hold target exits and field button is released
    m.isHolding = true;
    //conserve momentum when player mass changes
    totalMomentum = Vector.add(Vector.mult(player.velocity, player.mass), Vector.mult(m.holdingTarget.velocity, m.holdingTarget.mass))
    Matter.Body.setVelocity(player, Vector.mult(totalMomentum, 1 / (m.defaultMass + m.holdingTarget.mass)));

    m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
    //make block collide with nothing
    m.holdingTarget.collisionFilter.category = 0;
    m.holdingTarget.collisionFilter.mask = 0;
  },
  wakeCheck() {
    if (m.isTimeDilated) {
      m.isTimeDilated = false;

      function wake(who) {
        for (let i = 0, len = who.length; i < len; ++i) {
          Matter.Sleeping.set(who[i], false)
          if (who[i].storeVelocity) {
            Matter.Body.setVelocity(who[i], {
              x: who[i].storeVelocity.x,
              y: who[i].storeVelocity.y
            })
            Matter.Body.setAngularVelocity(who[i], who[i].storeAngularVelocity)
          }
        }
      }
      // if (tech.isFreezeMobs) {
      //     for (let i = 0, len = mob.length; i < len; ++i) {
      //         const ICE_DRAIN = 0.0005
      //         if (m.energy > ICE_DRAIN) m.energy -= ICE_DRAIN;
      //         Matter.Sleeping.set(mob[i], false)
      //         mobs.statusSlow(mob[i], 60)
      //     }
      // } else {
      //     wake(mob);
      // }
      wake(mob);
      wake(body);
      wake(bullet);
      for (let i = 0, len = cons.length; i < len; i++) {
        if (cons[i].stiffness === 0) {
          cons[i].stiffness = cons[i].storeStiffness
        }
      }
      // wake(powerUp);
    }
  },
  hold() { },
  couplingDescription(couple = m.coupling) {
    switch (m.fieldMode) {
      case 0: //field emitter
        return `<strong>all</strong> effects`
      case 1: //standing wave
        // return `<span style = 'font-size:95%;'><strong>deflecting</strong> condenses +${couple.toFixed(1)} <strong class='color-s'>ice IX</strong></span>`
        return `+${(couple * 5).toFixed(0)} maximum <strong class='color-f'>energy</strong>`
      case 2: //perfect diamagnetism
        return `<span style = 'font-size:95%;'><strong>deflecting</strong> condenses ${(0.1 * couple).toFixed(2)} <strong class='color-s'>ice IX</strong></span>`
      // return `<span style = 'font-size:89%;'><strong>invulnerable</strong> <strong>+${2*couple}</strong> seconds post collision</span>`
      case 3: //negative mass
        return `<strong>${(0.973 ** couple).toFixed(2)}x</strong> <strong class='color-defense'>damage taken</strong>`
      case 4: //assembler
        return `<strong>+${(0.6 * couple).toFixed(1)}</strong> <strong class='color-f'>energy</strong> per second`
      case 5: //plasma
        return `<strong>${(1 + 0.015 * couple).toFixed(3)}x</strong> <strong class='color-d'>damage</strong>`
      case 6: //time dilation
        return `<strong>+${(1 + 0.05 * couple).toFixed(2)}x</strong> longer <strong style='letter-spacing: 2px;'>stopped time</strong>` //<strong>movement</strong>, <strong>jumping</strong>, and 
      case 7: //cloaking
        // return `<strong>${(1 + 3.3 * couple).toFixed(3)}x</strong> ambush <strong class='color-d'>damage</strong>`
        return `<strong>${(1 + 0.05 * couple).toFixed(3)}x</strong> ambush <strong class='color-d'>damage</strong>`
      case 8: //pilot wave
        return `<strong>${(1 + 0.05 * couple).toFixed(2)}x</strong> <strong class='color-block'>block</strong> collision <strong class='color-d'>damage</strong>`
      case 9: //wormhole
        return `<span style = 'font-size:89%;'>after eating <strong class='color-block'>blocks</strong> <strong>+${(2 * couple).toFixed(0)}</strong> <strong class='color-f'>energy</strong></span>`
      case 10: //grappling hook
        return `<span style="opacity: 1;">${powerUps.orb.ammo(1)}</span> give ${(4 * couple).toFixed(1)}% more ammo`
      case 11: //tachyonic field
        return `<strong>${(1 + Math.abs(Math.log(m.coupling + 1)) / 5).toFixed(3)}x</strong> <strong class='color-speed'>movement</strong> and <strong>jumping</strong>`
      case 12: //energy condenser
        return `<strong>${(1 + 0.05 * couple).toFixed(3)}x</strong> healing from <span style="opacity: 1">${powerUps.orb.heal(1)}</span>`
      case 13: //Einstein's shield
        return `<strong>deflecting</strong> <strong class='color-stun'>stuns</strong> mobs for ${Math.pow(1.25, couple / 16).toFixed(3)} seconds`
      case 14: //matter displacement
        return `<strong>${(1 + Math.abs(Math.log(m.coupling + 1)) / 5).toFixed(3)}x longer</strong> <strong class="color-invulnerable">immunity</strong>`
      default: //any new fields until a coupling effect is added to them
        return `no effect`
    }
  },
  couplingChange(change = 0) {
    if (change > 0 && level.onLevel !== -1) simulation.inGameConsole(`<div class="coupling-circle"></div> m.coupling <span class='color-symbol'>+=</span> ${change}`, 60); //level.onLevel !== -1  means not on lore level
    m.coupling += change
    if (m.coupling < 0) {
      //look for coupling power ups on this level and remove them to prevent exploiting tech ejections
      for (let i = powerUp.length - 1; i > -1; i--) {
        if (powerUp[i].name === "coupling") {
          Matter.Composite.remove(engine.world, powerUp[i]);
          powerUp.splice(i, 1);
          m.coupling += 1
          if (!(m.coupling < 0)) break
        }
      }
      m.coupling = 0 //can't go negative
    }
    m.setMaxEnergy(false);
    // m.setMaxHealth();
    m.setFieldRegen()
    mobs.setMobSpawnHealth();
    powerUps.setPowerUpMode();
    if (m.fieldMode === 0 || m.fieldMode === 12) {
      for (let i = 0; i < powerUp.length; i++) {
        if (powerUp[i].name === "heal") {
          const oldSize = powerUp[i].size
          powerUp[i].size = powerUps.heal.size() //update current heals
          const scale = powerUp[i].size / oldSize
          Matter.Body.scale(powerUp[i], scale, scale); //grow    
        }
      }
    }
    m.setMovement();
    if (m.fieldMode === 0 || m.fieldMode === 14) {
      m.collisionImmuneCycles /= (m.immuneBoostCouple || 1) //don't divide by zero, null, or undefined
      m.immuneBoostCouple = 1 + Math.abs(Math.log(m.coupling + 1)) / 5
      m.collisionImmuneCycles *= (m.immuneBoostCouple || 1)
    }
    // if ((m.fieldMode === 0 || m.fieldMode === 9) && !build.isExperimentSelection && !simulation.isTextLogOpen) simulation.circleFlare(0.4);
  },
  setField(index) {
    let oldIndex = m.fieldMode
    // console.log("field mode: ", index)
    window.removeEventListener("keydown", m.fieldEvent);
    if (m.fieldUpgrades[8].collider) {
      Matter.Composite.remove(engine.world, m.fieldUpgrades[8].collider);
      m.fieldUpgrades[8].collider = null
    }

    if (isNaN(index)) { //find index by name
      let found = false
      for (let i = 0; i < m.fieldUpgrades.length; i++) {
        if (index === m.fieldUpgrades[i].name) {
          index = i;
          found = true;
          break;
        }
      }
      if (!found) index = 0 //if you can't find the field, default to field emitter
    }
    if (index === 12 && tech.isEnergyHealth) index = 0 //if attempting to switch to energy condenser with mass-energy, switch to field emitter instead
    index = Math.min(m.fieldUpgrades.length, Math.max(index, 0))
    m.fieldMode = index;
    document.getElementById("field").innerHTML = m.fieldUpgrades[index].name
    m.setHoldDefaults();
    m.fieldUpgrades[index].effect();
    if (index !== oldIndex) {
      simulation.inGameConsole(`<div class="circle-grid field"></div> &nbsp; <span class='color-var'>m</span>.setField("<strong class='color-text'>${m.fieldUpgrades[m.fieldMode].name}</strong>")<br>input.key.field<span class='color-symbol'>:</span> ["<span class='color-text'>MouseRight</span>"]`);
      if (m.fieldMode === 0) {
        simulation.inGameConsole(`powerUps<span class='color-symbol'>.</span>directSpawn<span class='color-symbol'>(</span>
      	m<span class='color-symbol'>.</span>pos<span class='color-symbol'>.</span>x<span class='color-symbol'>, </span> 
        m<span class='color-symbol'>.</span>pos<span class='color-symbol'>.</span>y<span class='color-symbol'>, </span> 
        "settings"<span class='color-symbol'>)</span>
        &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑↓ ← → ↑↓ ← →</em>`)
      } else if (m.fieldMode === 1) { //standing wave
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldUpgrades<span class='color-symbol'>[1]</span>energyHealthRatio <span class='color-symbol'>=</span> ${m.fieldUpgrades[1].energyHealthRatio} 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//←←↓→→↓</em>`);
      } else if (m.fieldMode === 2) { //perfect diamagnetism
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldPosition<span class='color-symbol'>+=</span>10 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//← → ← → ↧</em>`);
      } else if (m.fieldMode === 3) { //negative mass
        simulation.inGameConsole(`body<span class='color-symbol'>[i].</span>force <span class='color-symbol'>=</span> push 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//←↑→↑↑</em>`);
      } else if (m.fieldMode === 4) { //molecular assembler
        simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>molecularMode <span class='color-symbol'>=</span> ${m.fieldUpgrades[4].modeText()} 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//↓→↓←↑↑↓</em>`);
      } else if (m.fieldMode === 5) { //plasma torch
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>energy <span class='color-symbol'>+=</span> 0.05 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//←↓→→↧</em>`);
      } else if (m.fieldMode === 6) { //time dilation
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>history<span class='color-symbol'>[(</span>m<span class='color-symbol'>.</span>cycle <span class='color-symbol'>-</span> 200 <span class='color-symbol'>)</span> <span class='color-symbol'>%</span> 600 <span class='color-symbol'>]</span> 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 0.9rem;color: #055;">//←↓→↑←↓→↑</em>`);
      } else if (m.fieldMode === 7) { //metamaterial cloaking
        simulation.inGameConsole(`<strong>4.5</strong><span class='color-symbol'>→</span><strong>6x</strong> <strong class='color-cloaked'>decloaking</strong> <strong class='color-d'>damage</strong> 
      	&nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">//↑↓←↓→</em>`);
      } else if (m.fieldMode === 8) { //pilot wave
        simulation.inGameConsole(`Composite<span class='color-symbol'>.</span>add<span class='color-symbol'>(</span>engine.world<span class='color-symbol'>,</span> block<span class='color-symbol'>)</span> 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↓↓→↓←↓↓</em>`);
      } else if (m.fieldMode === 9) { //wormhole
        simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>({</span> x<span class='color-symbol'>:</span> 0<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> <span class='color-var'>Math</span><span class='color-symbol'>.</span>random() <span class='color-symbol'>})</span> 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↓↓↓↑↓</em>`);
      } else if (m.fieldMode === 10) { //grappling hook
        simulation.inGameConsole(`Matter<span class='color-symbol'>.</span>Body<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>(</span>player<span class='color-symbol'>, {</span> x<span class='color-symbol'>:</span> 0<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> 0 <span class='color-symbol'>})</span> 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑↑↓↓</em>`);
      } else if (m.fieldMode === 11) { //tachyonic field
        simulation.inGameConsole(`<span class='color-var'>m</span>.<strong class='color-f'>energy</strong> <span class='color-symbol'>=</span> 
        <span class='color-var'>m</span>.<strong class='color-f'>maxEnergy</strong>
        &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//←↑→↓↓</em>`)
      } else if (m.fieldMode === 12) { //energy condenser
        simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health <span class='color-symbol'>=</span> <span class='color-var'>m</span>.maxHealth 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//→↓←↓↓</em>`)
      } else if (m.fieldMode === 13) { //Einstein's shield
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldAngle <span class='color-symbol'>±=</span> ${Math.sqrt(4 / Vector.magnitude(Vector.sub(m.pos, m.fieldPosition))).toFixed(3)} 
       	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑←↓→↧</em>`)
      } else if (m.fieldMode === 14) { //matter displacement
        simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>({</span> x<span class='color-symbol'>:</span> <span class='color-var'>Math</span><span class='color-symbol'>.</span>random()<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> 0 <span class='color-symbol'>})</span> 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↓↓↑↑↓</em>`)
      } else { //all other fields
        simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldEvent <span class='color-symbol'>=</span> <strong>undefined</strong> 
      	&nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//not set</em>`)
      }
    }
  },
  fieldEvent: null,
  fieldUpgrades: [
    {
      name: "field emitter",
      description: `<em>initial field</em><br>use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs and <strong>throw</strong> <strong class='color-block'>blocks</strong>
          <br><strong>4</strong> <strong class='color-f'>energy</strong> per second
          <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↑↓ ← → ↑↓ ← →</em>`, //            <br><strong>100</strong> max <strong class='color-f'>energy</strong>
      keyLog: [null, null, null, null, null, null, null, null],
      effect: () => {
        m.fieldEvent = function (event) {
          m.fieldUpgrades[m.fieldMode].keyLog.shift() //remove first element
          m.fieldUpgrades[m.fieldMode].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
          const patternB = [input.key.up, input.key.down, input.key.left, input.key.right, input.key.up, input.key.down, input.key.left, input.key.right]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternA) || arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternB)) {
            m.fieldUpgrades[m.fieldMode].keyLog = [null, null, null, null, null, null, null, null]
            /*let text = `<strong class='lore-text'>LOCAL SETTINGS:</strong><hr>`,
                keys = Object.keys(localSettings), values = Object.values(localSettings)
            for (let i = 0; i < keys.length; i++) {
              if (values[i].length === undefined && typeof(values[i]) === "object"){ //if a value is an object, display its properties, instead of '[object Object]'
                text += `<br>•<u>${keys[i]}</u>:`  
                let subkeys = Object.keys(values[i]), subvalues = Object.values(values[i])
                for (let j = 0; j < subkeys.length; j++) {
                  if (subvalues[j].length !== undefined || typeof(subvalues[j]) !== "object"){ //if a value is an array, display its items, instead of '[object Object]'
                    text += `<br>&nbsp; &nbsp; &nbsp; &nbsp;◦<u>${subkeys[j]}</u>: ${subvalues[j]}`
                  } else {
                    text += `<br>&nbsp; &nbsp; &nbsp; &nbsp;◦<u>${subkeys[j]}</u>: [object Object]...` 
                  }
                }
              } else {
                text += `<br>•<u>${keys[i]}</u>: ${values[i]}`
              }
            }
            simulation.lastLogTime = 0	//clear console
            simulation.inGameConsole(text, 1200)*/
            simulation.inGameConsole(`powerUps<span class='color-symbol'>.</span>directSpawn<span class='color-symbol'>(</span>
            	m<span class='color-symbol'>.</span>pos<span class='color-symbol'>.</span>x<span class='color-symbol'>, </span>
                m<span class='color-symbol'>.</span>pos<span class='color-symbol'>.</span>y<span class='color-symbol'>, </span>
                "settings"<span class='color-symbol'>)</span>
                &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑↓ ← → ↑↓ ← →</em>`)
            powerUps.directSpawn(m.pos.x + 100 * (Math.random() - 0.5), m.pos.y + 100 * (Math.random() - 0.5), "settings")
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.hold = function () {
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
            if (m.energy > m.minEnergyToDeflect) {
              m.drawField();
              m.pushMobsFacing();
            }
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          m.drawRegenEnergy()
        }
      }
    },
    {
      name: "standing wave",
      //<strong>deflecting</strong> protects you in every <strong>direction</strong>
      description: `<strong>3</strong> oscillating <strong>shields</strong> are permanently active
              <br><strong>+150</strong> max <strong class='color-f'>energy</strong>
              <br><strong>6</strong> <strong class='color-f'>energy</strong> per second
              <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">←←↓→→↓</em>`,
      keyLog: [null, null, null, null, null, null],
      energyHealthRatio: 1,
      drainCD: 0,
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[m.fieldMode].keyLog.shift() //remove first element
          m.fieldUpgrades[m.fieldMode].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowRight", "ArrowDown"]
          const patternB = [input.key.left, input.key.left, input.key.down, input.key.right, input.key.right, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternA) || arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternB)) {


            // m.maxHealth = m.health = 1//10000000
            // m.displayHealth();
            // m.immuneCycle = Infinity //you can't take damage
            // m.maxEnergy = m.energy = 10000000

            if (m.fieldUpgrades[1].energyHealthRatio === 1) {
              m.fieldUpgrades[1].energyHealthRatio = 2
            } else if (m.fieldUpgrades[1].energyHealthRatio === 2) {
              m.fieldUpgrades[1].energyHealthRatio = 0.5
            } else {
              m.fieldUpgrades[1].energyHealthRatio = 1

            }
            m.setMaxEnergy()
            m.setMaxHealth()
            m.displayHealth()
            simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldUpgrades<span class='color-symbol'>[1]</span>energyHealthRatio <span class='color-symbol'>=</span> ${m.fieldUpgrades[1].energyHealthRatio} &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #fff;">←←↓→→↓</em>`);
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldBlockCD = 0;
        m.blockingRecoil = 1 //4 is normal
        m.fieldRange = 185
        m.fieldShieldingScale = 1.6 * Math.pow(0.5, (tech.harmonics - 2))
        // m.fieldHarmReduction = 0.66; //33% reduction

        m.harmonic3Phase = () => { //normal standard 3 different 2-d circles
          const fieldRange1 = (0.75 + 0.3 * Math.sin(m.cycle / 23)) * m.fieldRange * m.harmonicRadius
          const fieldRange2 = (0.68 + 0.37 * Math.sin(m.cycle / 37)) * m.fieldRange * m.harmonicRadius
          const fieldRange3 = (0.7 + 0.35 * Math.sin(m.cycle / 47)) * m.fieldRange * m.harmonicRadius
          const netFieldRange = Math.max(fieldRange1, fieldRange2, fieldRange3)
          ctx.fillStyle = "rgba(110,170,200," + Math.min(0.6, (0.04 + 0.7 * m.energy * (0.1 + 0.11 * Math.random()))) + ")";
          ctx.beginPath();
          ctx.arc(m.pos.x, m.pos.y, fieldRange1, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(m.pos.x, m.pos.y, fieldRange2, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(m.pos.x, m.pos.y, fieldRange3, 0, 2 * Math.PI);
          ctx.fill();
          //360 block
          for (let i = 0, len = mob.length; i < len; ++i) {
            if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < netFieldRange && !mob[i].isUnblockable) { // && Matter.Query.ray(map, mob[i].position, m.pos).length === 0
              mob[i].locatePlayer();
              if (this.drainCD > m.cycle) {
                m.pushMass(mob[i], 0);
              } else {
                m.pushMass(mob[i]);
                this.drainCD = m.cycle + 15
              }
            }
          }
        }
        m.harmonicRadius = 1 //for smoothing function when player holds mouse (for harmonicAtomic)
        m.harmonicAtomic = () => { //several ellipses spinning about different axises
          const rotation = simulation.cycle * 0.0031
          const phase = simulation.cycle * 0.023
          const radius = m.fieldRange * m.harmonicRadius
          ctx.lineWidth = 1;
          ctx.strokeStyle = "rgba(110,170,200,0.8)"
          ctx.fillStyle = "rgba(110,170,200," + Math.min(0.6, 0.7 * m.energy * (0.11 + 0.1 * Math.random()) * (3 / tech.harmonics)) + ")";
          // ctx.fillStyle = "rgba(110,170,200," + Math.min(0.7, m.energy * (0.22 - 0.01 * tech.harmonics) * (0.5 + 0.5 * Math.random())) + ")";
          for (let i = 0; i < tech.harmonics; i++) {
            ctx.beginPath();
            ctx.ellipse(m.pos.x, m.pos.y, radius * Math.abs(Math.sin(phase + i / tech.harmonics * Math.PI)), radius, rotation + i / tech.harmonics * Math.PI, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
          }
          //360 block
          for (let i = 0, len = mob.length; i < len; ++i) {
            if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) - mob[i].radius < radius && !mob[i].isUnblockable) { // && Matter.Query.ray(map, mob[i].position, m.pos).length === 0
              mob[i].locatePlayer();
              if (this.drainCD > m.cycle) {
                m.pushMass(mob[i], 0);
              } else {
                m.pushMass(mob[i]);
                this.drainCD = m.cycle + 15
              }
            }
          }
        }
        if (tech.harmonics === 2) {
          m.harmonicShield = m.harmonic3Phase
        } else {
          m.harmonicShield = m.harmonicAtomic
        }
        m.hold = function () {
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if ((input.field) && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          if (m.energy > m.minEnergyToDeflect && m.fieldCDcycle < m.cycle) {
            if (tech.isStandingWaveExpand) {
              if (input.field) {
                // const oldHarmonicRadius = m.harmonicRadius
                m.harmonicRadius = 0.99 * m.harmonicRadius + 0.01 * 4
                // m.energy -= 0.1 * (m.harmonicRadius - oldHarmonicRadius)
              } else {
                m.harmonicRadius = 0.994 * m.harmonicRadius + 0.006
              }
            }
            if (!simulation.isTimeSkipping) m.harmonicShield()
          }
          m.drawRegenEnergy()
        }
      }
    },
    {
      name: "perfect diamagnetism",
      description: `<strong>deflecting</strong> does not drain <strong class='color-f'>energy</strong>
      				<br><strong>shield</strong> maintains <strong>functionality</strong> while inactive
                    <br><strong>5</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">← → ← → ↧</em>`,
      keyLog: [null, null, null, null, null],
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[m.fieldMode].keyLog.shift() //remove first element
          m.fieldUpgrades[m.fieldMode].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "ArrowDown"]
          const patternB = [input.key.left, input.key.right, input.key.left, input.key.right, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternA) || arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternB)) {
            simulation.ephemera.push({
              name: "perfect field push",
              do() {
                //check if touching map
                const a = 0.5  //reduces arc to put collision line in middle of field
                const upper = {
                  x: m.fieldPosition.x + m.fieldRange * Math.cos(m.fieldAngle + a * Math.PI * m.fieldArc),
                  y: m.fieldPosition.y + m.fieldRange * Math.sin(m.fieldAngle + a * Math.PI * m.fieldArc)
                }
                const lower = {
                  x: m.fieldPosition.x + m.fieldRange * Math.cos(m.fieldAngle - a * Math.PI * m.fieldArc),
                  y: m.fieldPosition.y + m.fieldRange * Math.sin(m.fieldAngle - a * Math.PI * m.fieldArc)
                }
                // ctx.beginPath();
                // ctx.moveTo(upper.x, upper.y);
                // ctx.lineTo(lower.x, lower.y);
                // ctx.lineWidth = 1;
                // ctx.strokeStyle = "#f0f";
                // ctx.stroke();
                const rayResults = Matter.Query.ray(map, upper, lower, 35);
                if (!input.down || rayResults.length) simulation.removeEphemera(this.name)
                const unit = { x: Math.cos(m.fieldAngle), y: Math.sin(m.fieldAngle) }
                m.fieldPosition = Vector.add(m.fieldPosition, Vector.mult(unit, 10))
              },
            })


          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#48f" //"#0c5"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldShieldingScale = 0;
        m.fieldBlockCD = 3;
        m.grabPowerUpRange2 = 10000000
        m.fieldPosition = { x: m.pos.x, y: m.pos.y }
        m.fieldAngle = m.angle
        m.perfectPush = (isFree = false) => {
          if (m.fieldCDcycle < m.cycle) {
            for (let i = 0, len = mob.length; i < len; ++i) {
              if (
                Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) - mob[i].radius < m.fieldRange &&
                !mob[i].isUnblockable &&
                Vector.dot({ x: Math.cos(m.fieldAngle), y: Math.sin(m.fieldAngle) }, Vector.normalise(Vector.sub(mob[i].position, m.fieldPosition))) > m.fieldThreshold &&
                Matter.Query.ray(map, mob[i].position, m.fieldPosition).length === 0
              ) {
                mob[i].locatePlayer();
                const unit = Vector.normalise(Vector.sub(m.fieldPosition, mob[i].position))
                m.fieldCDcycle = m.cycle + m.fieldBlockCD + (mob[i].isShielded ? 10 : 0);
                if (!mob[i].isInvulnerable && bullet.length < 250) {
                  for (let i = 0; i < m.coupling; i++) {
                    if (0.1 * m.coupling - i > Math.random()) {
                      const angle = m.fieldAngle + 4 * m.fieldArc * (Math.random() - 0.5)
                      const radius = m.fieldRange * (0.6 + 0.3 * Math.random())
                      b.iceIX(6 + 6 * Math.random(), angle, Vector.add(m.fieldPosition, {
                        x: radius * Math.cos(angle),
                        y: radius * Math.sin(angle)
                      }))
                    }
                  }
                }
                if (tech.blockDmg) { //electricity
                  Matter.Body.setVelocity(mob[i], { x: 0.5 * mob[i].velocity.x, y: 0.5 * mob[i].velocity.y });
                  if (mob[i].isShielded) {
                    for (let j = 0, len = mob.length; j < len; j++) {
                      if (mob[j].id === mob[i].shieldID) mob[j].damage(tech.blockDmg * (tech.isBlockRadiation ? 6 : 2), true)
                    }
                  } else if (tech.isBlockRadiation) {
                    if (mob[i].isMobBullet) {
                      mob[i].damage(tech.blockDmg * 3, true)
                    } else {
                      mobs.statusDoT(mob[i], tech.blockDmg * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                    }
                  } else {
                    mob[i].damage(tech.blockDmg, true)
                  }
                  const step = 40
                  ctx.beginPath();
                  for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
                    let x = m.fieldPosition.x - 20 * unit.x;
                    let y = m.fieldPosition.y - 20 * unit.y;
                    ctx.moveTo(x, y);
                    for (let i = 0; i < 8; i++) {
                      x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
                      y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
                      ctx.lineTo(x, y);
                    }
                  }
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "#f0f";
                  ctx.stroke();
                } else if (isFree) {
                  ctx.lineWidth = 2; //when blocking draw this graphic
                  ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                  ctx.strokeStyle = "#000";
                  const len = mob[i].vertices.length - 1;
                  const mag = mob[i].radius
                  ctx.beginPath();
                  ctx.moveTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                  for (let j = 0; j < len; j++) {
                    ctx.lineTo(mob[i].vertices[j].x + mag * (Math.random() - 0.5), mob[i].vertices[j].y + mag * (Math.random() - 0.5));
                  }
                  ctx.lineTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                  ctx.fill();
                  ctx.stroke();
                } else {

                  const eye = 15 * player.scale; //when blocking draw this graphic
                  const len = mob[i].vertices.length - 1;
                  ctx.lineWidth = 1;
                  ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                  ctx.strokeStyle = "#000";
                  ctx.beginPath();
                  ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                  ctx.lineTo(mob[i].vertices[len].x, mob[i].vertices[len].y);
                  ctx.lineTo(mob[i].vertices[0].x, mob[i].vertices[0].y);
                  ctx.fill();
                  ctx.stroke();
                  for (let j = 0; j < len; j++) {
                    ctx.beginPath();
                    ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                    ctx.lineTo(mob[i].vertices[j].x, mob[i].vertices[j].y);
                    ctx.lineTo(mob[i].vertices[j + 1].x, mob[i].vertices[j + 1].y);
                    ctx.fill();
                    ctx.stroke();
                  }
                }
                m.bulletsToBlocks(mob[i])
                if (tech.isStunField) mobs.statusStun(mob[i], tech.isStunField)
                //mob knock backs
                const massRoot = Math.sqrt(Math.max(1, mob[i].mass));
                Matter.Body.setVelocity(mob[i], {
                  x: player.velocity.x - (30 * unit.x) / massRoot,
                  y: player.velocity.y - (30 * unit.y) / massRoot
                });
                if (mob[i].isUnstable) {
                  if (m.fieldCDcycle < m.cycle + 10) m.fieldCDcycle = m.cycle + 6
                  mob[i].death();
                }
                if (!isFree) { //player knock backs
                  if (mob[i].isDropPowerUp && player.speed < 12) {
                    const massRootCap = Math.sqrt(Math.min(10, Math.max(0.2, mob[i].mass)));
                    Matter.Body.setVelocity(player, {
                      x: 0.9 * player.velocity.x + 0.6 * unit.x * massRootCap,
                      y: 0.9 * player.velocity.y + 0.6 * unit.y * massRootCap
                    });
                  }
                }
              }
            }
          }
        }
        m.hold = function () {
          const wave = Math.sin(m.cycle * 0.022);
          m.fieldRange = 180 + 12 * wave + 100 * tech.isBigField
          m.fieldArc = 0.35 + 0.045 * wave + 0.065 * tech.isBigField //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
          m.calculateFieldThreshold();
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (input.field) { //not hold but field button is pressed
            //float while field is on
            const angleReduction = 0.5 + 0.7 * (Math.PI / 2 - Math.min(Math.PI / 2, Math.abs(m.angle + Math.PI / 2)))
            // console.log(angleReduction)
            if (player.velocity.y > 1) {
              player.force.y -= angleReduction * (tech.isBigField ? 0.95 : 0.5) * player.mass * simulation.g;

              const pushX = 0.0007 * angleReduction * player.mass
              if (player.velocity.x > 0.5) {
                player.force.x += pushX
              } else if (player.velocity.x < -0.5) {
                player.force.x -= pushX
              }

              Matter.Body.setVelocity(player, {
                x: player.velocity.x,
                y: 0.98 * player.velocity.y
              });

              //set velocity to cap, but keep the direction
              // capX = 28
              // Matter.Body.setVelocity(player, {
              //     x: Math.abs(player.velocity.x) < capX ? Math.max(-capX, Math.min(1.0155 * player.velocity.x, capX)) : player.velocity.x,
              //     y: 0.98 * player.velocity.y
              // }); 
            }

            // go invulnerable while field is active, but also drain energy
            // if (true && m.energy > 2 * m.fieldRegen && m.immuneCycle < m.cycle + tech.cyclicImmunity) {
            //     m.immuneCycle = m.cycle + 1; //player is immune to damage for 60 cycles
            //     m.energy -= 2 * m.fieldRegen
            //     if (m.energy < m.fieldRegen) m.fieldCDcycle = m.cycle + 90;
            // }

            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
            m.fieldPosition = { x: m.pos.x, y: m.pos.y }
            m.fieldAngle = m.angle
            //draw field attached to player
            if (m.holdingTarget) {
              ctx.fillStyle = `rgba(110,150,220, ${0.06 + 0.03 * Math.random()})`
              ctx.strokeStyle = `rgba(110,150,220, ${0.35 + 0.05 * Math.random()})`
            } else {
              ctx.fillStyle = `rgba(110,150,220, ${0.27 + 0.2 * Math.random() - 0.1 * wave})`
              ctx.strokeStyle = `rgba(110,150,220, ${0.4 + 0.5 * Math.random()})`
            }
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, m.fieldRange, m.angle - Math.PI * m.fieldArc, m.angle + Math.PI * m.fieldArc, false);
            ctx.lineWidth = 2.5 - 1.5 * wave;
            ctx.stroke();
            const curve = 0.57 + 0.04 * wave
            const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
            let a = m.angle + aMag
            let cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
            let cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
            const r = 30 * player.scale
            ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + r * Math.cos(m.angle), m.pos.y + r * Math.sin(m.angle))
            a = m.angle - aMag
            cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
            cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
            ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 1 * m.fieldRange * Math.cos(m.angle - Math.PI * m.fieldArc), m.pos.y + 1 * m.fieldRange * Math.sin(m.angle - Math.PI * m.fieldArc))
            ctx.fill();
            m.perfectPush();
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            if (!input.field) { //&& tech.isFieldFree
              //draw field free of player
              ctx.fillStyle = `rgba(110,150,220, ${0.27 + 0.2 * Math.random() - 0.1 * wave})`
              ctx.strokeStyle = `rgba(110,180,255, ${0.4 + 0.5 * Math.random()})`
              ctx.beginPath();
              ctx.arc(m.fieldPosition.x, m.fieldPosition.y, m.fieldRange, m.fieldAngle - Math.PI * m.fieldArc, m.fieldAngle + Math.PI * m.fieldArc, false);
              ctx.lineWidth = 2.5 - 1.5 * wave;
              ctx.stroke();
              const curve = 0.8 + 0.06 * wave
              const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
              let a = m.fieldAngle + aMag
              ctx.quadraticCurveTo(m.fieldPosition.x + curve * m.fieldRange * Math.cos(a), m.fieldPosition.y + curve * m.fieldRange * Math.sin(a), m.fieldPosition.x + 1 * m.fieldRange * Math.cos(m.fieldAngle - Math.PI * m.fieldArc), m.fieldPosition.y + 1 * m.fieldRange * Math.sin(m.fieldAngle - Math.PI * m.fieldArc))
              ctx.fill();
              m.perfectPush(true);
            }
          }
          // m.drawRegenEnergy()
          m.drawRegenEnergy("rgba(0,0,0,0.2)")
          if (tech.isPerfectBrake) { //cap mob speed around player
            const range = 200 + 140 * wave + 150 * m.energy
            for (let i = 0; i < mob.length; i++) {
              const distance = Vector.magnitude(Vector.sub(m.pos, mob[i].position))
              if (distance < range) {
                const cap = mob[i].isShielded ? 8 : 4
                if (mob[i].speed > cap && Vector.dot(mob[i].velocity, Vector.sub(m.pos, mob[i].position)) > 0) { // if velocity is directed towards player
                  Matter.Body.setVelocity(mob[i], Vector.mult(Vector.normalise(mob[i].velocity), cap)); //set velocity to cap, but keep the direction
                }
              }
            }
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, range, 0, 2 * Math.PI);
            ctx.fillStyle = "hsla(200,50%,61%,0.08)";
            ctx.fill();
          }
        }
      }
    },
    {
      name: "negative mass",
      //<br>hold <strong class='color-block'>blocks</strong> as if they have a lower <strong>mass</strong>
      description: `use <strong class='color-f'>energy</strong> to nullify &nbsp;<strong style='letter-spacing: 7px;'>gravity</strong>
      				<br><strong>0.5x</strong> <strong class='color-defense'>damage taken</strong>
                    <br><strong>6</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">←↑→↑↑</em>`,
      fieldDrawRadius: 0,
      keyLog: [null, null, null, null, null],
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[3].keyLog.shift() //remove first element
          m.fieldUpgrades[3].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowUp", "ArrowUp"]
          const patternB = [input.key.left, input.key.up, input.key.right, input.key.up, input.key.up]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          const drain = tech.negativeMassCost ? 0.13 : 0
          if (input.field && m.energy > drain && (arraysEqual(m.fieldUpgrades[3].keyLog, patternA) || arraysEqual(m.fieldUpgrades[3].keyLog, patternB))) {
            m.energy -= drain
            simulation.ephemera.push({
              name: "negative masses",
              count: 60,
              range: 1700,
              do() {
                this.count--
                if (this.count < 0) simulation.removeEphemera(this.name)
                // if (this.count < 0) {
                //     this.count = 20
                //     this.do = this.pushDo
                // }
                for (let i = 0, len = body.length; i < len; ++i) {
                  sub = Vector.sub(body[i].position, m.pos);
                  dist = Vector.magnitude(sub);
                  if (dist < this.range) {
                    const push = Vector.mult(Vector.normalise(sub), 0.012 * dist / 1000 * body[i].mass)
                    body[i].force.x -= push.x
                    body[i].force.y -= push.y + 1.1 * body[i].mass * simulation.g

                    Matter.Body.setVelocity(body[i], { x: body[i].velocity.x * 0.9, y: body[i].velocity.y * 0.9 });

                  }
                }

              },
              // pushDo() {
              //     this.count--
              //     if (this.count < 0) simulation.removeEphemera(this)
              //     for (let i = 0, len = body.length; i < len; ++i) {
              //         sub = Vector.sub(body[i].position, m.pos);
              //         dist = Vector.magnitude(sub);
              //         if (dist < this.range) {
              //             const push = Vector.mult(Vector.normalise(sub), 0.01 * body[i].mass)
              //             body[i].force.x += push.x
              //             body[i].force.y += push.y - 1.1 * body[i].mass * simulation.g

              //             Matter.Body.setVelocity(body[i], { x: body[i].velocity.x * 0.99, y: body[i].velocity.y * 0.99 });

              //         }
              //     }
              // },
            })
            simulation.inGameConsole(`body<span class='color-symbol'>[i].</span>force <span class='color-symbol'>=</span> push &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">←↑→↑↑</em>`);
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldFire = true;
        m.holdingMassScale = 0.01; //can hold heavier blocks with lower cost to jumping
        m.fieldMeterColor = "#333"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldHarmReduction = 0.5;
        m.fieldDrawRadius = 0;

        m.hold = function () {
          m.airSpeedLimit = 125 //5 * player.mass * player.mass
          m.FxAir = 0.016
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (input.field) { //push away
            if (m.energy > m.fieldRegen && tech.negativeMassCost > 0) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
            if (m.energy >= tech.negativeMassCost && m.fieldCDcycle < m.cycle) {
              if (tech.isFlyFaster) {
                //look for nearby objects to make zero-g
                function moveThis(who, range, mag = 1.06) {
                  for (let i = 0, len = who.length; i < len; ++i) {
                    sub = Vector.sub(who[i].position, m.pos);
                    dist = Vector.magnitude(sub);
                    if (dist < range) {
                      who[i].force.y -= who[i].mass * (simulation.g * mag); //add a bit more then standard gravity
                      if (input.left) { //blocks move horizontally with the same force as the player
                        who[i].force.x -= m.FxAir * who[i].mass / 10; // move player   left / a
                      } else if (input.right) {
                        who[i].force.x += m.FxAir * who[i].mass / 10; //move player  right / d
                      }
                      //loose attraction to player
                      // const sub = Vector.sub(m.pos, body[i].position)
                      // const unit = Vector.mult(Vector.normalise(sub), who[i].mass * 0.0000002 * Vector.magnitude(sub))
                      // body[i].force.x += unit.x
                      // body[i].force.y += unit.y
                    }
                  }
                }
                //control horizontal acceleration
                m.airSpeedLimit = 1000 // 7* player.mass * player.mass
                m.FxAir = 0.01
                //control vertical acceleration
                if (input.down) { //down
                  player.force.y += 0.5 * player.mass * simulation.g;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 500 * 0.03;
                  moveThis(powerUp, this.fieldDrawRadius, 0);
                  moveThis(body, this.fieldDrawRadius, 0);
                } else if (input.up) { //up
                  m.energy -= 5 * tech.negativeMassCost;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 1100 * 0.03;
                  player.force.y -= 2.25 * player.mass * simulation.g;
                  moveThis(powerUp, this.fieldDrawRadius, 1.8);
                  moveThis(body, this.fieldDrawRadius, 1.8);
                } else {
                  m.energy -= tech.negativeMassCost;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 800 * 0.03;
                  player.force.y -= 1.07 * player.mass * simulation.g; // slow upward drift
                  moveThis(powerUp, this.fieldDrawRadius);
                  moveThis(body, this.fieldDrawRadius);
                }
              } else {
                //look for nearby objects to make zero-g
                function verticalForce(who, range, mag = 1.06) {
                  for (let i = 0, len = who.length; i < len; ++i) {
                    sub = Vector.sub(who[i].position, m.pos);
                    dist = Vector.magnitude(sub);
                    if (dist < range) {
                      who[i].force.y -= who[i].mass * (simulation.g * mag); //add a bit more then standard gravity
                      if (input.left) { //blocks move horizontally with the same force as the player
                        who[i].force.x -= m.FxAir * who[i].mass / 10; // move player   left / a
                      } else if (input.right) {
                        who[i].force.x += m.FxAir * who[i].mass / 10; //move player  right / d
                      }
                    }



                    // sub = Vector.sub(who[i].position, m.pos);
                    // dist = Vector.magnitude(sub);
                    // if (dist < range) who[i].force.y -= who[i].mass * (simulation.g * mag);
                  }
                }
                //control horizontal acceleration
                m.airSpeedLimit = 400 // 7* player.mass * player.mass
                m.FxAir = 0.005
                //control vertical acceleration
                if (input.down) { //down
                  player.force.y -= 0.5 * player.mass * simulation.g;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 400 * 0.03;
                  verticalForce(powerUp, this.fieldDrawRadius, 0.7);
                  verticalForce(body, this.fieldDrawRadius, 0.7);
                } else if (input.up) { //up
                  m.energy -= 5 * tech.negativeMassCost;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 850 * 0.03;
                  player.force.y -= 1.45 * player.mass * simulation.g;
                  verticalForce(powerUp, this.fieldDrawRadius, 1.38);
                  verticalForce(body, this.fieldDrawRadius, 1.38);
                } else {
                  m.energy -= tech.negativeMassCost;
                  this.fieldDrawRadius = this.fieldDrawRadius * 0.97 + 650 * 0.03;
                  player.force.y -= 1.07 * player.mass * simulation.g; // slow upward drift
                  verticalForce(powerUp, this.fieldDrawRadius);
                  verticalForce(body, this.fieldDrawRadius);
                }
              }

              if (m.energy < 0) {
                m.fieldCDcycle = m.cycle + 120;
                m.energy = 0;
              }
              //add extra friction for horizontal motion
              if (input.down || input.up || input.left || input.right) {
                Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.98 });
              } else { //slow rise and fall
                Matter.Body.setVelocity(player, { x: player.velocity.x * 0.99, y: player.velocity.y * 0.98 });
              }
              // if (tech.isFreezeMobs) {
              //     const ICE_DRAIN = 0.0005
              //     for (let i = 0, len = mob.length; i < len; i++) {
              //         if (!mob[i].isMobBullet && !mob[i].shield && !mob[i].isShielded && ((mob[i].distanceToPlayer() + mob[i].radius) < this.fieldDrawRadius)) {
              //             if (m.energy > ICE_DRAIN * 2) {
              //                 m.energy -= ICE_DRAIN;
              //                 this.fieldDrawRadius -= 2;
              //                 mobs.statusSlow(mob[i], 60)
              //             } else {
              //                 break;
              //             }
              //         }
              //     }
              // }
              //draw zero-G range
              if (!simulation.isTimeSkipping) {
                ctx.beginPath();
                ctx.arc(m.pos.x, m.pos.y, this.fieldDrawRadius, 0, 2 * Math.PI);
                ctx.fillStyle = "#f5f5ff";
                ctx.globalCompositeOperation = "difference";
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
              }
            }
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
            this.fieldDrawRadius = 0
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            this.fieldDrawRadius = 0
          }
          m.drawRegenEnergy("rgba(0,0,0,0.2)")

        }
      }
    },
    {
      name: "molecular assembler",
      modeText() {
        return `${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<strong>missiles" : simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" : "<strong>drones"}</strong>`
      },
      description: `use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs
      				<br>excess <strong class='color-f'>energy</strong> used to <strong class='color-print'>print</strong> ${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" :
          simulation.molecularMode === 1 ? "<strong>missiles" :
            simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" :
              "<strong>drones"
        }</strong>
                    <br><strong>12</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓→↓←↑↑↓</em>`,
      setDescription() {
        return `use <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs<br>excess <strong class='color-f'>energy</strong> used to <strong class='color-print'>print</strong> ${simulation.molecularMode === 0 ? "<strong class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<strong>missiles" : simulation.molecularMode === 2 ? "<strong class='color-s'>ice IX" : "<strong>drones"}</strong><br><strong>12</strong> <strong class='color-f'>energy</strong> per second <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓→↓←↑↑↓</em>`
      },
      endoThermic(drain) {
        if (tech.isEndothermic) {
          const len = 10 * drain
          if (Math.random() < len) {
            for (let i = 0; i < len; i++) {
              b.iceIX(1)
            }
          }
        }
      },
      keyLog: [null, null, null, null, null, null, null],
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[4].keyLog.shift() //remove first element
          m.fieldUpgrades[4].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "ArrowUp", "ArrowDown"]
          const patternB = [input.key.down, input.key.right, input.key.down, input.key.left, input.key.up, input.key.up, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[4].keyLog, patternA) || arraysEqual(m.fieldUpgrades[4].keyLog, patternB)) {
            //cycle to next molecular mode
            simulation.molecularMode = simulation.molecularMode < 3 ? simulation.molecularMode + 1 : 0
            m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
            const name = `${simulation.molecularMode === 0 ? "<em class='color-p' style='letter-spacing: 2px;'>spores" : simulation.molecularMode === 1 ? "<em>missiles" : simulation.molecularMode === 2 ? "<em class='color-s'>ice IX" : "<em>drones"}</em>`
            simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>molecularMode <span class='color-symbol'>=</span> ${simulation.molecularMode} // ${name} &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #055;">↓→↓←↑↑↓</em>`);
          }
          // console.log(event.code, m.fieldUpgrades[4].keyLog)
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#ff0"
        m.eyeFillColor = m.fieldMeterColor
        m.hold = function () {
          if (m.energy > m.maxEnergy - 0.02 && m.fieldCDcycle < m.cycle && !input.field && bullet.length < 300 && (m.cycle % 2)) {
            if (simulation.molecularMode === 0) {
              if (tech.isSporeFlea) {
                const drain = 0.2 //0.18 + (Math.max(bullet.length, 130) - 130) * 0.02
                if (m.energy > drain) {
                  m.energy -= drain
                  const speed = m.crouch ? 20 + 8 * Math.random() : 10 + 3 * Math.random()
                  const r = 35 * player.scale
                  b.flea({
                      x: m.pos.x + r * Math.cos(m.angle),
                      y: m.pos.y + r * Math.sin(m.angle)
                  }, {
                    x: speed * Math.cos(m.angle),
                    y: speed * Math.sin(m.angle)
                  })
                  m.fieldUpgrades[4].endoThermic(drain)
                }
              } else if (tech.isSporeWorm) {
                const drain = 0.2 //0.18 + (Math.max(bullet.length, 130) - 130) * 0.02
                if (m.energy > drain) {
                  m.energy -= drain
                  const r = 35 * player.scale
                  b.worm({
                    x: m.pos.x + r * Math.cos(m.angle),
                    y: m.pos.y + r * Math.sin(m.angle)
                  })
                  const SPEED = 2 + 1 * Math.random();
                  Matter.Body.setVelocity(bullet[bullet.length - 1], {
                    x: SPEED * Math.cos(m.angle),
                    y: SPEED * Math.sin(m.angle)
                  });
                  m.fieldUpgrades[4].endoThermic(drain)
                }
              } else {
                const drain = 0.1 //0.095 + (Math.max(bullet.length, 130) - 130) * 0.01
                for (let i = 0, len = 5; i < len; i++) {
                  if (m.energy > 3 * drain) {
                    m.energy -= drain
                    const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
                    b.spore(Vector.add(m.pos, Vector.mult(unit, 25)), Vector.mult(unit, 10))
                  } else {
                    break
                  }
                }
                m.fieldUpgrades[4].endoThermic(drain)
              }
            } else if (simulation.molecularMode === 1) {
              const drain = 0.33
              m.energy -= drain;
              const direction = { x: Math.cos(m.angle), y: Math.sin(m.angle) }
              const push = Vector.mult(Vector.perp(direction), 0.08)
              const r = 30 * player.scale
              if (tech.isMissileSide) {
                let d = Vector.rotate({ 
                  x: Math.cos(m.angle), y: Math.sin(m.angle) 
                }, Math.PI / 2)
                b.missile({ 
                  x: m.pos.x + r * d.x, 
                  y: m.pos.y + r * d.y }, m.angle + Math.PI / 2, 15)
                d = Vector.rotate(d, Math.PI)
                b.missile({ 
                  x: m.pos.x + r * d.x, 
                  y: m.pos.y + r * d.y }, m.angle - Math.PI / 2, 15)
              } else {
                b.missile({ 
                  x: m.pos.x + r * direction.x,
                  y: m.pos.y + r * direction.y 
                }, m.angle, -15)
              }
              // b.missile({ x: m.pos.x, y: m.pos.y - 40 }, -Math.PI / 2 + 0.5 * (Math.random() - 0.5), 0, 1)
              m.fieldUpgrades[4].endoThermic(drain)
            } else if (simulation.molecularMode === 2) {
              const drain = 0.044;
              m.energy -= drain;
              b.iceIX(1)
              m.fieldUpgrades[4].endoThermic(drain)
            } else if (simulation.molecularMode === 3) {
              if (tech.isDroneRadioactive) {
                const drain = 0.9 //0.8 + (Math.max(bullet.length, 50) - 50) * 0.01
                if (m.energy > drain) {
                  m.energy -= drain
                  const r = 30 * player.scale
                  b.droneRadioactive({
                    x: m.pos.x + r * Math.cos(m.angle) + 10 * (Math.random() - 0.5),
                    y: m.pos.y + r * Math.sin(m.angle) + 10 * (Math.random() - 0.5)
                  }, 25)
                  m.fieldUpgrades[4].endoThermic(drain)
                }
              } else {
                //every bullet above 100 adds 0.005 to the energy cost per drone
                //at 200 bullets the energy cost is 0.45 + 100*0.006 = 1.05
                const drain = 0.5 * tech.droneEnergyReduction //(0.45 + (Math.max(bullet.length, 100) - 100) * 0.006) * tech.droneEnergyReduction
                if (m.energy > drain) {
                  m.energy -= drain
                  b.drone()
                  m.fieldUpgrades[4].endoThermic(drain)
                }
              }
            }
          }
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            if (tech.isPrinter && m.holdingTarget.isPrinted && input.field) {
              // if (Math.random() < 0.004 && m.holdingTarget.vertices.length < 12) m.holdingTarget.vertices.push({ x: 0, y: 0 }) //small chance to increase the number of vertices
              m.holdingTarget.radius += Math.min(1.1, 1.3 / m.holdingTarget.mass) //grow up to a limit
              const r1 = m.holdingTarget.radius * (1 + 0.12 * Math.sin(m.cycle * 0.11))
              const r2 = m.holdingTarget.radius * (1 + 0.12 * Math.cos(m.cycle * 0.11))
              let angle = (m.cycle * 0.01) % (2 * Math.PI) //rotate the object 
              let vertices = []
              for (let i = 0, len = m.holdingTarget.vertices.length; i < len; i++) {
                angle += 2 * Math.PI / len
                vertices.push({ x: m.holdingTarget.position.x + r1 * Math.cos(angle), y: m.holdingTarget.position.y + r2 * Math.sin(angle) })
              }
              Matter.Body.setVertices(m.holdingTarget, vertices)
              m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
            }
            m.throwBlock();
          } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
            if (tech.isPrinter && input.down) {
              m.printBlock();
            } else if (m.energy > m.minEnergyToDeflect) {
              m.drawField();
              m.pushMobsFacing();
            }
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          m.drawRegenEnergy()
        }
      }
    },
    {
      name: "plasma torch",
      description: `use <strong class='color-f'>energy</strong> to emit short range <strong class='color-plasma'>plasma</strong>
      				<br><strong>1.5x</strong> <strong class='color-d'>damage</strong>
                    <br><strong>10</strong> <strong class='color-f'>energy</strong> per second
                    <em style="float: right;font-family: monospace;font-size: 1rem;color: #fff;">←↓→→↧</em>`,
      keyLog: [null, null, null, null, null],
      set() {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[5].keyLog.shift() //remove first element
          m.fieldUpgrades[5].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowRight", "ArrowDown"]
          const patternB = [input.key.left, input.key.down, input.key.right, input.key.right, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[5].keyLog, patternA) || arraysEqual(m.fieldUpgrades[5].keyLog, patternB)) {
            simulation.ephemera.push({
              name: "plasma zap combo",
              range: 800,
              do() {
                if (!input.down || input.field || input.fire) {
                  simulation.removeEphemera(this.name);
                } else {
                  if (!(simulation.cycle % 6)) {
                    //look for closest mob in player's LoS
                    const closest = { distance: this.range + 300, target: null }
                    if (tech.isPlasmaRange > 1) {
                      closest.distance *= tech.isPlasmaRange
                    }
                    const dir = { x: Math.cos(m.angle), y: Math.sin(m.angle) };
                    for (let i = 0, len = mob.length; i < len; ++i) {
                      if (!mob[i].isInvulnerable && mob[i].alive && Matter.Query.ray(map, m.pos, mob[i].position).length === 0) { //&& !mob[i].isDarkMatter
                        const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                        const dist = Vector.magnitude(Vector.sub(m.pos, mob[i].position))
                        if (dist < closest.distance && dot > 0.65) { //target closest mob that player is looking at and isn't too close to target
                          closest.distance = dist
                          if (closest.target === null || Math.random() < 0.5) closest.target = mob[i]
                        }
                      }
                    }

                    let where
                    if (closest.target) {
                      where = closest.target.vertices[Math.floor(closest.target.vertices.length * Math.random())]
                    } else {
                      // where = Vector.add(m.pos, Vector.rotate(Vector.mult(dir, Math.floor(300 + 800 * Math.random())), 2 * Math.PI * Math.random()))
                      where = Vector.add(m.pos, Vector.rotate(Vector.mult(dir, Math.floor(300 + this.range * Math.random())), (Math.random() - 0.5)))
                    }
                    simulation.ephemera.push({
                      name: "plasma zap streak",
                      count: 50,
                      who: closest.target,
                      where: where,
                      isReady: true,
                      path: [where],
                      do() {
                        this.count--
                        if (this.count < 0) {
                          simulation.removeEphemera(this.name)
                        } else {
                          if (this.isReady) {
                            for (let i = 0; i < 1; i++) {
                              if (Vector.magnitudeSquared(Vector.sub(m.pos, this.where)) > 1000) {
                                const v = Vector.mult(Vector.normalise(Vector.sub(m.pos, this.where)), 20 + Math.floor(60 * Math.random()))
                                this.path.push(this.where)
                                this.where = Vector.add(this.where, Vector.rotate(v, 1 * (Math.random() - 0.5)))
                              } else if (this.who) {
                                this.isReady = false
                                // requestAnimationFrame(() => {
                                m.energy += 0.08
                                let dmg = 0.45
                                if (this.who.isShielded) dmg *= 8
                                this.who.damage(dmg);

                                //mob vertex
                                simulation.drawList.push({
                                  x: this.path[0].x,
                                  y: this.path[0].y,
                                  radius: 8,
                                  color: "rgba(136,136,255,0.9)",
                                  time: simulation.drawTime
                                });
                                //near player
                                simulation.drawList.push({
                                  x: this.path[this.path.length - 1].x,
                                  y: this.path[this.path.length - 1].y,
                                  radius: 6 + Math.floor(5 * Math.random()),
                                  color: "rgba(136,136,255,0.9)",
                                  time: simulation.drawTime
                                });

                                if (this.who.speed > 1) {
                                  Matter.Body.setVelocity(this.who, { x: this.who.velocity.x * 0.1, y: this.who.velocity.y * 0.1 });
                                } else {
                                  Matter.Body.setVelocity(this.who, { x: this.who.velocity.x * 0.3, y: this.who.velocity.y * 0.3 });
                                }
                                // });
                                break
                              }
                            }
                          }
                          ctx.beginPath();
                          ctx.moveTo(this.path[0].x, this.path[0].y);
                          for (let i = 0, len = this.path.length; i < len; i++) ctx.lineTo(this.path[i].x, this.path[i].y);
                          ctx.strokeStyle = "#ff7fff";
                          ctx.lineWidth = 1 + 1 * Math.random();
                          ctx.stroke();
                          ctx.strokeStyle = "rgba(127,95,255,0.15)";
                          ctx.lineWidth = 15 + 10 * Math.random();
                          ctx.stroke();
                        }
                      },
                    })
                  }
                }
              },
            })
            simulation.inGameConsole(`m<span class='color-symbol'>.</span>energy <span class='color-symbol'>+=</span> 0.05 &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #fff;">←↓→→↧</em>`);
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        b.isExtruderOn = false
        m.fieldDamage = 1.5
        if (m.plasmaBall) {
          m.plasmaBall.reset()
          Matter.Composite.remove(engine.world, m.plasmaBall);
        }
        if (tech.isPlasmaBall) {
          m.plasmaBall = Bodies.circle(m.pos.x + 10 * Math.cos(m.angle), m.pos.y + 10 * Math.sin(m.angle), 1, {
            isSensor: true,
            frictionAir: 0,
            alpha: 0.7,
            isAttached: false,
            isOn: false,
            drain: 0.0018,
            radiusLimit: 10,
            damage: 0.7,
            effectRadius: 10,
            setPositionToNose() {
              const r = 27 * player.scale;
              const nose = { x: m.pos.x + r * Math.cos(m.angle), y: m.pos.y + r * Math.sin(m.angle) }
              m.plasmaBall.effectRadius = 2 * m.plasmaBall.circleRadius
              Matter.Body.setPosition(this, Vector.add(nose, Vector.mult(Vector.normalise(Vector.sub(nose, m.pos)), this.effectRadius)));
            },
            fire() {
              let drain = 0.06
              if (tech.isPlasmaBotUpgrade) {
                let pBotUp = null;
                pBotUp = tech.tech.find((t) => t.name === "plasma-bot upgrade");
                drain *= 0.5 ** pBotUp.count; //exponentially reduce drain with each level of plasma-bot upgrade
              }
              if (m.energy > drain) m.energy -= drain
              this.isAttached = false;
              const speed = 5 + Math.min(15, 80 / this.mass) //scale speed with mass
              Matter.Body.setVelocity(this, {
                x: player.velocity.x * 0.4 + speed * Math.cos(m.angle),
                y: speed * Math.sin(m.angle)
              });
              m.plasmaBall.setPositionToNose()
            },
            scale(scale) {
              if (this.circleRadius > this.radiusLimit) Matter.Body.scale(m.plasmaBall, scale, scale); //shrink fast
            },
            reset() {
              const scale = 1 / this.circleRadius
              Matter.Body.scale(this, scale, scale); //grow
              this.alpha = 0.7
              this.isOn = false
              // this.isAttached = true;
            },
            do() {
              if (this.isOn) {
                this.effectRadius = 2 * m.plasmaBall.circleRadius * (0.6 + 0.4 * tech.isPlasmaRange)

                if (Matter.Query.collides(this, map).length > 0) {
                  if (this.isAttached) {
                    this.scale(Math.max(0.9, 0.99 - 0.1 / this.circleRadius))
                  } else {
                    m.plasmaBall.explode()
                    Matter.Body.setVelocity(this, { x: 0, y: 0 });
                    this.reset()
                  }
                }

                //damage nearby mobs
                const dmg = this.damage * ((tech.isControlPlasma && !this.isAttached) ? 2 : 1)
                const arcList = []
                const dischargeRange = 150 + 1600 * tech.plasmaDischarge + 1.3 * this.effectRadius
                for (let i = 0, len = mob.length; i < len; i++) {
                  if (mob[i].alive && (!mob[i].isBadTarget || mob[i].isMobBullet) && !mob[i].isInvulnerable) {
                    const sub = Vector.magnitude(Vector.sub(this.position, mob[i].position))
                    if (sub < this.effectRadius + mob[i].radius) {
                      mob[i].damage(dmg);
                      if (mob[i].speed > 5) {
                        Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.6, y: mob[i].velocity.y * 0.6 });
                      } else {
                        Matter.Body.setVelocity(mob[i], { x: mob[i].velocity.x * 0.93, y: mob[i].velocity.y * 0.93 });
                      }
                    } else if (sub < dischargeRange + mob[i].radius && Matter.Query.ray(map, mob[i].position, this.position).length === 0) {
                      arcList.push(mob[i]) //populate electrical arc list
                    }
                  }
                }
                for (let i = 0; i < arcList.length; i++) {
                  if (tech.plasmaDischarge > Math.random()) {
                    const who = arcList[Math.floor(Math.random() * arcList.length)]
                    who.damage(dmg * 4);
                    //draw arcs
                    const sub = Vector.sub(who.position, this.position)
                    const unit = Vector.normalise(sub)
                    let len = 12
                    const step = Vector.magnitude(sub) / (len + 2)
                    let x = this.position.x
                    let y = this.position.y
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    for (let i = 0; i < len; i++) {
                      x += step * (unit.x + (Math.random() - 0.5))
                      y += step * (unit.y + (Math.random() - 0.5))
                      ctx.lineTo(x, y);
                    }
                    ctx.lineTo(who.position.x, who.position.y);
                    ctx.strokeStyle = "#88f";
                    ctx.lineWidth = 6 + 3 * Math.random();
                    ctx.stroke();
                    if (who.damageReduction) {
                      simulation.drawList.push({
                        x: who.position.x,
                        y: who.position.y,
                        radius: 15,
                        color: "rgba(150,150,255,0.4)",
                        time: 15
                      });
                    }
                  }
                }

                //graphics
                const radius = this.effectRadius * (0.99 + 0.02 * Math.random()) + 3 * Math.random()
                const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, radius);
                const alpha = this.alpha + 0.15 * Math.random()
                const stop = 0.75 + 0.1 * Math.random()
                gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
                gradient.addColorStop(stop, `rgba(255,245,255,${alpha})`);
                gradient.addColorStop(stop + 0.1, `rgba(255,200,255,${alpha})`);
                gradient.addColorStop(1, `rgba(255,75,255,${alpha})`);
                // gradient.addColorStop(1, `rgba(255,150,255,${alpha})`);
                ctx.fillStyle = gradient
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
                ctx.fill();
                if (tech.isControlPlasma) {
                  if (!this.isAttached) {
                    //extra stroke to show 2x damage
                    ctx.strokeStyle = "rgb(255, 0, 212)";
                    ctx.lineWidth = Math.max(2, 0.04 * this.effectRadius);
                    ctx.stroke();
                  }
                  //mouse control
                  const mouseUnit = Vector.normalise(Vector.sub(simulation.mouseInGame, this.position))
                  const speed = Vector.magnitude(this.velocity) //save current speed
                  const push = Vector.mult(mouseUnit, 0.008 * Math.pow(speed, 1.8)) //roughly optimized to produce similar turing radius for different sizes
                  Matter.Body.setVelocity(this, Vector.add(push, this.velocity));
                  Matter.Body.setVelocity(this, Vector.mult(Vector.normalise(this.velocity), speed)); //keep speed constant
                }

                //draw arc from radius inward in a random walk
                ctx.beginPath();
                const unit = Vector.rotate({ x: 1, y: 0 }, Math.random() * 6.28)
                let where = Vector.add(this.position, Vector.mult(unit, 0.98 * radius))
                ctx.moveTo(where.x, where.y)
                const sub = Vector.normalise(Vector.sub(this.position, where))
                for (let i = 0, len = 7; i < len; i++) {
                  const step = Vector.rotate(Vector.mult(sub, 17 * Math.random()), 2 * (Math.random() - 0.5))
                  where = Vector.add(where, step)
                  ctx.lineTo(where.x, where.y)
                }
                ctx.strokeStyle = "#88f";
                ctx.lineWidth = 0.5 + 2 * Math.random();
                ctx.stroke();
              }
            },
            explode() {
              simulation.ephemera.push({
                name: "plasma ball",
                vertices: this.vertices,
                position: {
                  x: m.plasmaBall.position.x,
                  y: m.plasmaBall.position.y
                },
                radius: m.plasmaBall.effectRadius,
                alpha: 1,
                do() {
                  // console.log(this.radius)
                  //grow and fade
                  this.radius *= 1.05
                  this.alpha -= 0.05
                  if (this.alpha < 0) simulation.removeEphemera(this.name)
                  //graphics
                  const radius = this.radius * (0.99 + 0.02 * Math.random()) + 3 * Math.random()
                  const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, radius);
                  const alpha = this.alpha + 0.15 * Math.random()
                  const stop = 0.75 + 0.1 * Math.random()
                  gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
                  gradient.addColorStop(stop, `rgba(255,245,255,${alpha})`);
                  gradient.addColorStop(stop + 0.1, `rgba(255,200,255,${alpha})`);
                  gradient.addColorStop(1, `rgba(255,75,255,${alpha})`);
                  // gradient.addColorStop(1, `rgba(255,150,255,${alpha})`);
                  ctx.fillStyle = gradient
                  ctx.beginPath();
                  ctx.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI);
                  ctx.fill();

                  //damage nearby mobs
                  const dmg = m.plasmaBall.damage
                  for (let i = 0, len = mob.length; i < len; i++) {
                    if (mob[i].alive && (!mob[i].isBadTarget || mob[i].isMobBullet) && !mob[i].isInvulnerable) {
                      const sub = Vector.magnitude(Vector.sub(this.position, mob[i].position))
                      if (sub < this.radius + mob[i].radius) {
                        mob[i].damage(dmg);
                      }
                    }
                  }

                },
              })
            }
          });

          Composite.add(engine.world, m.plasmaBall);
          m.hold = function () {
            if (m.isHolding) {
              m.drawHold(m.holdingTarget);
              m.holding();
              m.throwBlock();
            } else if (input.field) { //not hold but field button is pressed
              if (tech.isPlasmaBoost && powerUps.boost.endCycle < simulation.cycle + 60) powerUps.boost.endCycle = simulation.cycle + 60

              if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
              m.grabPowerUp();
              m.lookForBlock();
              if (m.fieldCDcycle < m.cycle) {
                //field is active
                if (!m.plasmaBall.isAttached) { //return ball to player
                  if (m.plasmaBall.isOn) {
                    m.plasmaBall.explode()
                    m.plasmaBall.reset()
                  } else {
                    m.plasmaBall.isAttached = true
                    m.plasmaBall.isOn = true
                    m.plasmaBall.alpha = 0.7
                    m.plasmaBall.setPositionToNose()

                  }
                } else if (m.energy > m.plasmaBall.drain) { //charge up when attached
                  if (tech.isCapacitor) {
                    m.energy -= m.plasmaBall.drain * 2;
                    const scale = 1 + 48 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                    Matter.Body.scale(m.plasmaBall, scale, scale); //grow
                  } else {
                    m.energy -= m.plasmaBall.drain;
                    const scale = 1 + 16 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                    Matter.Body.scale(m.plasmaBall, scale, scale); //grow    
                  }
                  if (m.energy > m.maxEnergy) {
                    m.energy -= m.plasmaBall.drain * 2;
                    const scale = 1 + 16 * Math.pow(Math.max(1, m.plasmaBall.circleRadius), -1.8)
                    Matter.Body.scale(m.plasmaBall, scale, scale); //grow    
                  }
                  m.plasmaBall.setPositionToNose()

                  //float
                  const slowY = (player.velocity.y > 0) ? Math.max(0.5, 1 - 0.006 * player.velocity.y * player.velocity.y) : Math.max(0.997, 1 - 0.001 * Math.abs(player.velocity.y)) //down : up
                  Matter.Body.setVelocity(player, {
                    x: Math.max(0.95, 1 - 0.002 * Math.abs(player.velocity.x)) * player.velocity.x,
                    y: slowY * player.velocity.y
                  });
                  if (player.velocity.y > 5) {
                    player.force.y -= 0.9 * player.mass * simulation.g //less gravity when falling fast
                  } else {
                    player.force.y -= 0.5 * player.mass * simulation.g;
                  }
                } else {
                  // m.fieldCDcycle = m.cycle + 60;
                  m.plasmaBall.fire()
                }
              }
            } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
              m.pickUp();
              if (m.plasmaBall.isAttached) {
                // m.fieldCDcycle = m.cycle;
                m.plasmaBall.fire()
              }
            } else {
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
              if (m.plasmaBall.isAttached) {
                // m.fieldCDcycle = m.cycle;
                m.plasmaBall.fire()
              }
            }
            m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
            m.plasmaBall.do()
          }
        } else if (tech.isExtruder) {
          m.hold = function () {
            b.isExtruderOn = false
            if (m.isHolding) {
              m.drawHold(m.holdingTarget);
              m.holding();
              m.throwBlock();
            } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
              if (tech.isPlasmaBoost && powerUps.boost.endCycle < simulation.cycle + 60) powerUps.boost.endCycle = simulation.cycle + 60

              if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
              m.grabPowerUp();
              m.lookForBlock();
              b.extruder();
            } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
              m.pickUp();
            } else {
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            }
            m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
            if (input.field) {
              b.wasExtruderOn = true
            } else {
              b.wasExtruderOn = false
              b.canExtruderFire = true
            }
            ctx.beginPath(); //draw all the wave bullets
            for (let i = 1, len = bullet.length; i < len; i++) { //skip the first bullet (which is is oldest bullet)
              if (bullet[i].isWave) {
                if (bullet[i].isBranch || bullet[i - 1].isBranch) {
                  ctx.moveTo(bullet[i].position.x, bullet[i].position.y)
                } else {
                  ctx.lineTo(bullet[i].position.x, bullet[i].position.y)
                }
              }
            }
            const r = 15 * player.scale
            if (b.wasExtruderOn && b.isExtruderOn) ctx.lineTo(m.pos.x + r * Math.cos(m.angle), m.pos.y + r * Math.sin(m.angle))
            ctx.lineWidth = 4;
            ctx.strokeStyle = "#f07"
            ctx.stroke();
            ctx.lineWidth = tech.extruderRange;
            ctx.strokeStyle = "rgba(255,0,110,0.06)"
            ctx.stroke();
          }
        } else {
          m.hold = function () {
            if (m.isHolding) {
              m.drawHold(m.holdingTarget);
              m.holding();
              m.throwBlock();
            } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
              if (tech.isPlasmaBoost && powerUps.boost.endCycle < simulation.cycle + 60) powerUps.boost.endCycle = simulation.cycle + 60

              if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
              m.grabPowerUp();
              m.lookForBlock();
              b.plasma();
            } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
              m.pickUp();
            } else {
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            }
            m.drawRegenEnergy("rgba(0, 0, 0, 0.2)")
          }
        }
      },
      effect() {
        m.fieldMeterColor = "#f0f"
        m.eyeFillColor = m.fieldMeterColor
        this.set();
      }
    },
    {
      name: "time dilation",
      description: `use <strong class='color-f'>energy</strong> to <strong style='letter-spacing: 2px;'>stop time</strong>
      				<br><strong>1.2x</strong> <strong class='color-speed'>movement</strong> and <em>fire rate</em></strong>
                    <br><strong>12</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:0.8rem;color:#fff;">←↓→↑←↓→↑</em>`,
      keyLog: [null, null, null, null, null, null, null, null],
      isRewindMode: false, //m.fieldUpgrades[6].isRewindMode
      isRewinding: false,
      set() {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[6].keyLog.shift() //remove first element
          m.fieldUpgrades[6].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp",]
          const patternB = [input.key.left, input.key.down, input.key.right, input.key.up, input.key.left, input.key.down, input.key.right, input.key.up]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[6].keyLog, patternA) || arraysEqual(m.fieldUpgrades[6].keyLog, patternB)) {
            const drain = 0.1
            if (m.energy > drain) {
              m.energy -= drain

              if (m.fieldUpgrades[6].isRewindMode) {
                m.fieldUpgrades[6].isRewindMode = false
                window.removeEventListener("keydown", m.fieldEvent);
                m.fieldUpgrades[6].set()
                m.wakeCheck();
              } else {
                m.fieldUpgrades[6].isRewindMode = true
                window.removeEventListener("keydown", m.fieldEvent);
                m.fieldUpgrades[6].set()
                m.wakeCheck();
              }
            }
            simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldUpgrades[6]<span class='color-symbol'>.</span>isRewindMode <span class='color-symbol'>=</span> ${m.fieldUpgrades[6].isRewindMode} 
            &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 0.9rem;color: #fff;">←↓→↑←↓→↑</em>`);
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        // m.fieldMeterColor = "#0fc"
        // m.fieldMeterColor = "#ff0"
        m.fieldMeterColor = "#3fe"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldFx = 1.25
        // m.fieldJump = 1.09
        m.setMovement();
        b.setFireCD()
        const timeStop = () => {
          m.immuneCycle = m.cycle + 10; //invulnerable to harm while time is stopped,  this also disables regen
          //draw field everywhere
          ctx.globalCompositeOperation = "saturation"
          ctx.fillStyle = "#ccc";
          ctx.fillRect(-50000, -50000, 100000, 100000)
          ctx.globalCompositeOperation = "source-over"
          //stop time
          m.isTimeDilated = true;

          function sleep(who) {
            for (let i = 0, len = who.length; i < len; ++i) {
              if (!who[i].isSleeping) {
                who[i].storeVelocity = who[i].velocity
                who[i].storeAngularVelocity = who[i].angularVelocity
              }
              Matter.Sleeping.set(who[i], true)
            }
          }
          sleep(mob);
          sleep(body);
          sleep(bullet);
          simulation.cycle--; //pause all functions that depend on game cycle increasing
        }

        if (m.fieldUpgrades[6].isRewindMode) {
          this.rewindCount = 0
          m.grabPowerUpRange2 = 600000
          m.fieldUpgrades[6].rewindDrain = 1
          m.hold = function () {
            if (input.field) m.grabPowerUp();
            if (m.isHolding) {
              m.drawHold(m.holdingTarget);
              m.holding();
              m.throwBlock();
              m.wakeCheck();
            } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
              // const drain = 0.0015 / (1 + 0.05 * m.coupling)
              // const DRAIN = 0.003
              const rwDrain = m.fieldUpgrades[6].rewindDrain * 0.002 / (1 + 0.04 * m.coupling)
              m.fieldUpgrades[6].rewindDrain *= 1.0015
              // const drainFlat = 0.2
              // if (m.energy > drain) m.energy -= drain
              if (this.rewindCount === 0) m.lookForBlock();

              if (!m.holdingTarget) {
                if (m.energy > rwDrain) {
                  timeStop();
                } else { //holding, but field button is released
                  m.fieldCDcycle = m.cycle + 120;
                  m.energy = 0;
                  m.wakeCheck();
                  m.wakeCheck();
                }

                // if (this.rewindCount === 0) { //large upfront energy cost to enter rewind mode
                //     if (m.energy > drainFlat + 10 * drain) {
                //         m.energy -= drainFlat
                //     } else {
                //         this.rewindCount = 0;
                //         m.resetHistory();
                //         if (m.fireCDcycle < m.cycle + 60) m.fieldCDcycle = m.cycle + 60
                //         m.immuneCycle = m.cycle //if you reach the end of the history disable harm immunity
                //     }
                // }
                this.isRewinding = true
                this.rewindCount += 2;

                let history = m.history[(simulation.cycle - this.rewindCount) % 600]
                if (this.rewindCount > 599 || m.energy < rwDrain) {
                  this.rewindCount = 0;
                  m.resetHistory();
                  if (m.fireCDcycle < m.cycle + 60) m.fieldCDcycle = m.cycle + 60
                  m.immuneCycle = m.cycle //if you reach the end of the history disable harm immunity
                } else {
                  //draw field everywhere
                  ctx.globalCompositeOperation = "saturation"
                  ctx.fillStyle = "#ccc";
                  ctx.fillRect(-100000, -100000, 200000, 200000)
                  ctx.globalCompositeOperation = "source-over"
                  m.energy -= rwDrain
                  if (m.immuneCycle < m.cycle + 5) m.immuneCycle = m.cycle + 5; //player is immune to damage for 5 cycles
                  Matter.Body.setPosition(player, history.position);
                  Matter.Body.setVelocity(player, { x: history.velocity.x, y: history.velocity.y });

                  if (m.health < history.health) {
                    m.health = history.health
                    if (m.health > m.maxHealth) m.health = m.maxHealth
                    m.displayHealth();
                  }

                  m.yOff = history.yOff
                  if (m.yOff < 48) {
                    m.doCrouch()
                  } else {
                    m.undoCrouch()
                  }

                  ctx.beginPath();
                  ctx.moveTo(m.pos.x, m.pos.y)
                  const percentLeft = this.rewindCount / 600
                  ctx.arc(m.pos.x, m.pos.y, 30, 3 * Math.PI / 2, 2 * Math.PI * (1 - percentLeft) + 3 * Math.PI / 2);
                  ctx.lineTo(m.pos.x, m.pos.y)
                  ctx.fillStyle = `rgba(0,150,150,${percentLeft})`;
                  ctx.fill()
                  m.grabPowerUpEasy();
                }
              }
              // m.wakeCheck();
            } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
              m.pickUp();
              this.rewindCount = 0;
              m.wakeCheck();
            } else if (tech.isTimeStop && player.speed < 1 && m.onGround && !input.fire) {
              timeStop();
              this.rewindCount = 0;
            } else {
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
              this.rewindCount = 0;
              m.wakeCheck();
            }
            m.drawRegenEnergy() // this calls  m.regenEnergy(); also
            if (!(input.field && m.fieldCDcycle < m.cycle)) {
              if (m.fieldUpgrades[6].rewindDrain > 1) m.fieldUpgrades[6].rewindDrain /= 1.0005
              if (this.isRewinding) {
                this.isRewinding = false
                m.resetHistory()
              }
              // for (let i = 0; i < bullet.length; i++) {
              //     if (bullet[i].botType) {
              //         if (Vector.magnitudeSquared(Vector.sub(bullet[i].position, player.position)) > 1000000) { //far away bots teleport to player
              //             Matter.Body.setPosition(bullet[i], Vector.add(player.position, { x: 250 * (Math.random() - 0.5), y: 250 * (Math.random() - 0.5) }));
              //             Matter.Body.setVelocity(bullet[i], { x: 0, y: 0 });
              //         } else { //close bots maintain relative distance to player on teleport
              //             Matter.Body.setPosition(bullet[i], Vector.sub(bullet[i].position, change));
              //         }
              //     }
              // }
            }
          }
        } else {
          m.grabPowerUpRange2 = 200000
          m.fieldFire = true;
          m.isTimeDilated = false;
          m.hold = function () {
            if (m.isHolding) {
              m.wakeCheck();
              m.drawHold(m.holdingTarget);
              m.holding();
              m.throwBlock();
            } else if (input.field && m.fieldCDcycle < m.cycle) {
              const drain = 0.0026 / (1 + 0.03 * m.coupling)
              if (m.energy > drain) m.energy -= drain
              m.grabPowerUp();
              m.lookForBlock(); //this drains energy 0.001
              if (m.energy > drain) {
                timeStop();
              } else { //holding, but field button is released
                m.fieldCDcycle = m.cycle + 120;
                m.energy = 0;
                m.wakeCheck();
                m.wakeCheck();
              }
            } else if (tech.isTimeStop && player.speed < 1 && m.onGround && m.fireCDcycle < m.cycle && !input.fire) {
              timeStop();
              //makes things move at 1/5 time rate, but has an annoying flicker for mob graphics, and other minor bugs
              // if (!(m.cycle % 4)) {
              //     // requestAnimationFrame(() => {
              //     m.wakeCheck();
              //     // simulation.timePlayerSkip(1)
              //     // }); //wrapping in animation frame prevents errors, probably          
              //     ctx.globalCompositeOperation = "saturation"
              //     ctx.fillStyle = "#ccc";
              //     ctx.fillRect(-100000, -100000, 200000, 200000)
              //     ctx.globalCompositeOperation = "source-over"
              // } else {
              //     timeStop();
              // }
            } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
              m.wakeCheck();
              m.pickUp();
            } else {
              m.wakeCheck();
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            }
            m.drawRegenEnergy()
          }
        }
      },
      effect() {
        if (tech.isTimeStop) {
          m.fieldHarmReduction = 0.6;
        } else {
          m.fieldHarmReduction = 1;
        }
        this.set();
      }
    },
    {
      name: "metamaterial cloaking",
      description: `<strong>0.4x</strong> <strong class='color-defense'>damage taken</strong> while <strong class='color-cloaked'>cloaked</strong>
      				<br>after <strong class='color-cloaked'>decloaking</strong> <strong>4.5x</strong> <strong class='color-d'>damage</strong> for <strong>2</strong> s
                    <br><strong>6</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↑↓←↓→</em>`,
      keyLog: [null, null, null, null, null],
      smallFieldRadius: 130,
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[7].keyLog.shift() //remove first element
          m.fieldUpgrades[7].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowDown", "ArrowRight"]
          const patternB = [input.key.up, input.key.down, input.key.left, input.key.down, input.key.right]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[7].keyLog, patternA) || arraysEqual(m.fieldUpgrades[7].keyLog, patternB)) {
            if (m.fieldUpgrades[7].smallFieldRadius === 130) {
              m.fieldUpgrades[7].smallFieldRadius = 70
              simulation.inGameConsole(`<strong>4.5</strong><span class='color-symbol'>→</span><strong>6x</strong> <strong class='color-cloaked'>decloaking</strong> <strong class='color-d'>damage</strong> &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #fff;">↑↓←↓→</em>`);
            } else {
              m.fieldUpgrades[7].smallFieldRadius = 130
              simulation.inGameConsole(`<strong>6</strong><span class='color-symbol'>→</span><strong>4.5x</strong> <strong class='color-cloaked'>decloaking</strong> <strong class='color-d'>damage</strong> &nbsp; &nbsp; <em style="float: right;font-family: monospace;font-size: 1rem;color: #fff;">↑↓←↓→</em>`);
            }
          }
        }
        window.addEventListener("keydown", m.fieldEvent);


        m.fieldFire = true;
        m.fieldMeterColor = "#333";
        m.eyeFillColor = m.fieldMeterColor
        m.fieldPhase = 0;
        m.isCloak = false
        m.fieldDrawRadius = 0
        m.isSneakAttack = true;
        m.sneakAttackCycle = 0;
        m.enterCloakCycle = 0;
        m.drawCloakedM = function () {
          m.walk_cycle -= m.flipLegs * m.Vx;
          m.pos.x += 4
          m.draw();
        }
        m.drawCloak = function () {
          m.fieldPhase += 0.007
          const wiggle = 0.15 * Math.sin(m.fieldPhase * 0.5)
          ctx.beginPath();
          ctx.ellipse(m.pos.x, m.pos.y, m.fieldDrawRadius * (1 - wiggle), m.fieldDrawRadius * (1 + wiggle), m.fieldPhase, 0, 2 * Math.PI);
          ctx.fillStyle = "#fff"
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#000"
          // ctx.stroke()
          ctx.globalCompositeOperation = "destination-in";
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          ctx.clip();
        }
        m.hold = function () {
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (input.field && m.fieldCDcycle < m.cycle) { //not hold and field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            m.lookForBlock();
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding target exists, and field button is not pressed
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          //not shooting (or using field) enable cloak
          if (m.energy < 0.05 && m.fireCDcycle < m.cycle && !input.fire) m.fireCDcycle = m.cycle
          if (m.fireCDcycle + 10 < m.cycle && !input.fire) { //automatically cloak if not firing
            // const drain = 0.02
            if (!m.isCloak) { //&& m.energy > drain + 0.03
              // m.energy -= drain
              m.isCloak = true //enter cloak
              m.fieldHarmReduction = 0.4;
              m.enterCloakCycle = m.cycle
              if (tech.isCloakHealLastHit && m.lastHit > 0) {
                const heal = Math.min(0.75 * m.lastHit, m.energy)
                m.addHealth(heal); //heal from last hit
                m.lastHit = 0
                simulation.drawList.push({ //add dmg to draw queue
                  x: m.pos.x,
                  y: m.pos.y,
                  radius: Math.sqrt(heal) * 200,
                  color: "rgba(0,255,200,0.6)",
                  time: 16
                });
              }
              if (tech.isIntangible) {
                for (let i = 0; i < bullet.length; i++) {
                  if (bullet[i].botType && bullet[i].botType !== "orbit") bullet[i].collisionFilter.mask = cat.map | cat.bullet | cat.mobBullet | cat.mobShield
                }
              }
            }
          } else if (m.isCloak) { //exit cloak
            m.sneakAttackCycle = m.cycle
            m.isCloak = false
            m.fieldHarmReduction = 1

            if (tech.isIntangible) {
              for (let i = 0; i < bullet.length; i++) {
                if (bullet[i].botType && bullet[i].botType !== "orbit") bullet[i].collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.mobShield
              }
            }
            if (tech.isCloakStun) { //stun nearby mobs after exiting cloak
              // let isMobsAround = false
              const stunRange = m.fieldDrawRadius * 1.25
              // const drain = 0.01
              // if (m.energy > drain) {
              for (let i = 0, len = mob.length; i < len; ++i) {
                if (Vector.magnitude(Vector.sub(mob[i].position, m.pos)) < stunRange && Matter.Query.ray(map, mob[i].position, m.pos).length === 0 && !mob[i].isBadTarget) {
                  isMobsAround = true
                  mobs.statusStun(mob[i], 120)
                }
              }
              // if (isMobsAround) {
              //     m.energy -= drain
              //     simulation.drawList.push({
              //         x: m.pos.x,
              //         y: m.pos.y,
              //         radius: stunRange,
              //         color: "hsla(0,50%,100%,0.7)",
              //         time: 7
              //     });
              // }
              // }
            }
          }

          if (m.isCloak) {
            m.fieldRange = m.fieldRange * 0.85 + m.fieldUpgrades[7].smallFieldRadius
            m.fieldDrawRadius = m.fieldRange * 1.1 //* 0.88 //* Math.min(1, 0.3 + 0.5 * Math.min(1, energy * energy));
            m.drawCloak()
            // ctx.globalCompositeOperation = "lighter";
            // m.drawCloakedM()
            // ctx.globalCompositeOperation = "source-over";

            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, 35 * player.scale, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(255,255,255,0.25)";//"rgba(0,0,0,0.7)";//"rgba(255,255,255,0.7)";//"rgba(255,0,100,0.7)";
            ctx.lineWidth = 10
            ctx.stroke();

          } else if (m.fieldRange < 4000) {
            m.fieldRange += 90
            m.fieldDrawRadius = m.fieldRange //* Math.min(1, 0.3 + 0.5 * Math.min(1, energy * energy));
            m.drawCloak()
          }
          if (tech.isIntangible) {
            if (m.isCloak) {
              player.collisionFilter.mask = cat.map
              let inPlayer = Matter.Query.region(mob, player.bounds)
              if (inPlayer.length > 0) {
                for (let i = 0; i < inPlayer.length; i++) {
                  if (m.energy > 0) {
                    if (!inPlayer[i].isUnblockable) m.energy -= 0.004 + 0.0005 * simulation.difficultyMode;
                    if (inPlayer[i].shield) m.energy -= 0.015 + 0.001 * simulation.difficultyMode;
                  }
                }
              }
            } else {
              player.collisionFilter.mask = cat.body | cat.map | cat.mob | cat.mobBullet | cat.mobShield //normal collisions
            }
          }
          this.drawRegenEnergyCloaking()
          if (m.isSneakAttack && m.sneakAttackCycle + Math.min(100, 0.66 * (m.cycle - m.enterCloakCycle)) > m.cycle) { //show sneak attack status
            m.fieldDamage = (4.5 + (m.fieldUpgrades[7].smallFieldRadius === 130 ? 0 : 1.5)) * (1 + 0.05 * m.coupling)
            const timeLeft = (m.sneakAttackCycle + Math.min(100, 0.66 * (m.cycle - m.enterCloakCycle)) - m.cycle) * 0.5
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, 32 * player.scale, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(180,30,70,0.5)";//"rgba(0,0,0,0.7)";//"rgba(255,255,255,0.7)";//"rgba(255,0,100,0.7)";
            ctx.lineWidth = Math.max(Math.min(10, timeLeft), 3);
            ctx.stroke();
            // ctx.globalCompositeOperation = "multiply";
            // m.drawCloakedM()
            // ctx.globalCompositeOperation = "source-over";
          } else {
            m.fieldDamage = 1
          }
        }
      }
    },
    {
      name: "pilot wave",
      description: `use <strong class='color-f'>energy</strong> to guide <strong class='color-block'>blocks</strong>
      				<em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↓→↓←↓↓</em>
                    <br><div class="circle-grid tech"></div>, <div class="circle-grid gun"></div>, and <div class="circle-grid field"></div> have <strong>+3</strong> <strong class='color-choice'><span>ch</span><span>oi</span><span>ces</span></strong>
                    <br><strong>10</strong> <strong class='color-f'>energy</strong> per second`,
      keyLog: [null, null, null, null, null, null, null],
      collider: null,
      fieldMass: 1,
      drain: 1,
      effect: () => {
        m.fieldUpgrades[8].collider = Matter.Bodies.polygon(m.pos.x, m.pos.y, 8, 35, {
          friction: 0,
          frictionAir: 0.12,
          collisionFilter: { category: cat.player, mask: (tech.isPilotMapIgnore ? 0 : cat.map) }, //no collision because player is holding
          classType: "field",
          lastSpeed: 0,
        });
        Composite.add(engine.world, m.fieldUpgrades[8].collider); //add to world

        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[4].keyLog.shift() //remove first element
          m.fieldUpgrades[4].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowDown", "ArrowDown", "ArrowRight", "ArrowDown", "ArrowLeft", "ArrowDown", "ArrowDown"]
          const patternB = [input.key.down, input.key.down, input.key.right, input.key.down, input.key.left, input.key.down, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

          const width = 90 + Math.floor(30 * Math.random())
          const height = 11 + Math.floor(7 * Math.random())
          const yOff = 60
          const blockRegion = {
            min: {
              x: m.pos.x - width,
              y: m.pos.y + yOff - height
            },
            max: {
              x: m.pos.x + width,
              y: m.pos.y + yOff + height
            }
          }
          if (
            (arraysEqual(m.fieldUpgrades[4].keyLog, patternA) || arraysEqual(m.fieldUpgrades[4].keyLog, patternB))
            && (tech.isPilotMapIgnore || !Matter.Query.region(map, blockRegion).length)
            && !m.crouch
          ) {
            //move player up away from block
            Matter.Body.setPosition(player, { x: player.position.x, y: player.position.y - height })

            //spawn a block
            body[body.length] = Matter.Bodies.rectangle(m.pos.x, blockRegion.max.y, width * 2, height * 2, {
              friction: 0.05,
              frictionAir: 0.001,
              collisionFilter: {
                category: cat.body,
                mask: cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet
              },
              classType: "body",
              isPilotWave: true,
            });
            Composite.add(engine.world, body[body.length - 1]); //add to world
            simulation.inGameConsole(`Composite<span class='color-symbol'>.</span>add<span class='color-symbol'>(</span>engine.world<span class='color-symbol'>,</span> block<span class='color-symbol'>)</span> &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">//↓↓→↓←↓↓</em>`);
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#333"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldPhase = 0;
        m.fieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
        m.lastFieldPosition = { x: simulation.mouseInGame.x, y: simulation.mouseInGame.y }
        m.fieldOn = false;
        if (tech.isNoPilotCost) m.fieldFire = true;

        m.fieldRadius = 0;
        m.drop();
        m.hold = function () {
          let isOn = (tech.isNoPilotCost ? !input.field : input.field)
          if (tech.isPrinter) {
            //spawn blocks if field and crouch
            if (input.field && m.fieldCDcycle < m.cycle && input.down && !m.isHolding) {
              m.printBlock()
            }
            //if holding block grow it
            if (m.isHolding) {
              m.drawHold(m.holdingTarget);
              m.holding();
              if (tech.isPrinter && m.holdingTarget.isPrinted && input.field) {
                // if (Math.random() < 0.004 && m.holdingTarget.vertices.length < 12) m.holdingTarget.vertices.push({ x: 0, y: 0 }) //small chance to increase the number of vertices
                m.holdingTarget.radius += Math.min(1.1, 1.3 / m.holdingTarget.mass) //grow up to a limit
                const r1 = m.holdingTarget.radius * (1 + 0.12 * Math.sin(m.cycle * 0.11))
                const r2 = m.holdingTarget.radius * (1 + 0.12 * Math.cos(m.cycle * 0.11))
                let angle = (m.cycle * 0.01) % (2 * Math.PI) //rotate the object 
                let vertices = []
                for (let i = 0, len = m.holdingTarget.vertices.length; i < len; i++) {
                  angle += 2 * Math.PI / len
                  vertices.push({ x: m.holdingTarget.position.x + r1 * Math.cos(angle), y: m.holdingTarget.position.y + r2 * Math.sin(angle) })
                }
                Matter.Body.setVertices(m.holdingTarget, vertices)
                m.definePlayerMass(m.defaultMass + m.holdingTarget.mass * m.holdingMassScale)
              }
              m.throwBlock()
            } else {
              m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            }
            //if releasing field throw it

          }
          if (isOn) {
            if (tech.isPilotMapIgnore && !simulation.testing) {
              level.customTopLayer();
              simulation.draw.drawMapPath();
            } //draw map before drawing field if player has de Broglie–Bohm theory
            if (m.fieldCDcycle < m.cycle) {
              if (!m.fieldOn) { // if field was off, teleport to player
                m.fieldOn = true;
                Matter.Body.setPosition(m.fieldUpgrades[8].collider, m.pos);
                m.fieldPosition.x = m.pos.x
                m.fieldPosition.y = m.pos.y
              }
              const graphicScale = 1.2 //the draw range is a bit bigger then the interaction range
              //when field is on it smoothly moves towards the mouse
              const sub = Vector.sub(simulation.mouseInGame, m.fieldUpgrades[8].collider.position)
              const mag = Vector.magnitude(sub)

              //adjust speed of field here, and with friction and mass above where the collier is spawned
              const fieldMassScale = Math.max(1.5, Math.pow(m.fieldUpgrades[8].fieldMass, 0.3)) //how much mass inside the field slows the push and cap
              const scaledMag = 0.00000017 / fieldMassScale * Math.pow(mag, 2) //having the mag squared makes the effect weaker in close for fine movement
              let push = Vector.mult(Vector.normalise(sub), scaledMag)
              const cap = 0.17 / fieldMassScale //acts like a "speed limit"
              if (Vector.magnitude(push) > cap) push = Vector.mult(Vector.normalise(push), cap)
              m.fieldUpgrades[8].collider.force = push

              //check for map collisions
              if (Matter.Query.ray(map, m.fieldPosition, m.fieldUpgrades[8].collider.position).length) {
                if (!tech.isPilotMapIgnore) {
                  Matter.Body.setVelocity(m.fieldUpgrades[8].collider, Vector.mult(m.fieldUpgrades[8].collider.velocity, 0.6))
                  m.fieldRadius *= 0.6
                }
              }
              m.fieldPosition.x = m.fieldUpgrades[8].collider.position.x
              m.fieldPosition.y = m.fieldUpgrades[8].collider.position.y

              //grab power ups into the field
              for (let i = 0, len = powerUp.length; i < len; ++i) {
                if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue

                const dxP = m.fieldPosition.x - powerUp[i].position.x;
                const dyP = m.fieldPosition.y - powerUp[i].position.y;
                const dist2 = dxP * dxP + dyP * dyP + 200;
                const graphicRange = graphicScale * m.fieldRadius
                // float towards field  if looking at and in range  or  if very close to player
                // if (
                //     dist2 < graphicRange * graphicRange &&
                //     (m.lookingAt(powerUp[i]) || dist2 < 16000)
                // ) {
                //     powerUp[i].force.x += 0.05 * (dxP / Math.sqrt(dist2)) * powerUp[i].mass;
                //     powerUp[i].force.y += 0.05 * (dyP / Math.sqrt(dist2)) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                //     Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.11, y: powerUp[i].velocity.y * 0.11 }); //extra friction
                if (
                  dist2 < graphicRange * graphicRange &&
                  !simulation.isChoosing &&
                  (tech.isOverHeal || powerUp[i].name !== "heal" || m.maxHealth - m.health > 0.01)
                  // (powerUp[i].name !== "heal" || m.health < 0.94 * m.maxHealth)
                  // (powerUp[i].name !== "ammo" || b.guns[b.activeGun].ammo !== Infinity)
                ) { //use power up if it is close enough

                  simulation.ephemera.push({
                    name: "pilot grab",
                    count: 5, //cycles before it self removes
                    PposX: powerUp[i].position.x,
                    PposY: powerUp[i].position.y,
                    size: powerUp[i].size,
                    color: powerUp[i].color,
                    do() {
                      this.count--
                      if (this.count < 0) simulation.removeEphemera(this.name)
                      ctx.beginPath();
                      ctx.arc(this.PposX, this.PposY, this.size * (this.count + 2) / 7, 0, 2 * Math.PI);
                      ctx.fillStyle = this.color
                      ctx.fill();
                    },
                  })

                  powerUps.onPickUp(powerUp[i]);
                  powerUp[i].effect();
                  Matter.Composite.remove(engine.world, powerUp[i]);
                  powerUp.splice(i, 1);
                  // m.fieldRadius += 50
                  break; //because the array order is messed up after splice
                }
                // }
              }

              let radiusGoal, radiusSmooth, drainPassive
              if (Matter.Query.ray(map, m.fieldPosition, player.position).length) { //is there something blocking the player's view of the field
                drainPassive = 1.5 * m.fieldRegen * m.fieldUpgrades[8].drain
                if (tech.isPilotMapIgnore) {
                  drainPassive *= 2;
                  radiusGoal = Math.max(50, 250 - 2 * m.fieldUpgrades[8].collider.speed)
                  radiusSmooth = 0.97
                } else {
                  radiusGoal = 0
                  radiusSmooth = 0.995
                }
              } else {
                radiusGoal = Math.max(50, 250 - 2 * m.fieldUpgrades[8].collider.speed)
                radiusSmooth = 0.97
                drainPassive = m.fieldRegen * m.fieldUpgrades[8].drain
              }
              if (tech.isNoPilotCost) drainPassive = 0
              m.fieldRadius = m.fieldRadius * radiusSmooth + radiusGoal * (1 - radiusSmooth)

              //track velocity change for calculating block energy drain
              const speedChange = Math.max(0, m.fieldUpgrades[8].collider.speed - m.fieldUpgrades[8].collider.lastSpeed)
              m.fieldUpgrades[8].collider.lastSpeed = m.fieldUpgrades[8].collider.speed

              if (m.energy >= drainPassive) {
                m.energy -= drainPassive;
                m.fieldUpgrades[8].fieldMass = 1
                for (let i = 0, len = body.length; i < len; ++i) {
                  if (Vector.magnitude(Vector.sub(body[i].position, m.fieldPosition)) < m.fieldRadius && !body[i].isNotHoldable) {
                    // const drainBlock = m.fieldUpgrades[8].collider.speed * body[i].mass * 0.0000013
                    const drainBlock = m.fieldUpgrades[8].drain * speedChange * body[i].mass * 0.000095
                    if (m.energy > drainBlock) {
                      m.energy -= drainBlock;
                      Matter.Body.setVelocity(body[i], m.fieldUpgrades[8].collider.velocity); //give block mouse velocity
                      Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0.8)
                      m.fieldUpgrades[8].fieldMass += body[i].mass
                      //blocks drift towards center of pilot wave
                      const sub = Vector.sub(m.fieldPosition, body[i].position)
                      const push = Vector.mult(Vector.normalise(sub), 0.0001 * body[i].mass * Vector.magnitude(sub))
                      body[i].force.x += push.x
                      body[i].force.y += push.y - body[i].mass * simulation.g //remove gravity effects

                      if (m.standingOn === body[i] && m.onGround) {
                        //try to stop the walk animation
                        m.walk_cycle -= m.flipLegs * m.Vx / player.scale
                        m.stepSize *= 0
                        //extra stability
                        Matter.Body.setAngularVelocity(body[i], body[i].angularVelocity * 0)
                        //match velocity upto a change of 10 per cycle
                        const limit = 10
                        const deltaV = Math.max(-limit, Math.min((m.fieldUpgrades[8].collider.velocity.x - player.velocity.x), limit))
                        Matter.Body.setVelocity(player, { x: player.velocity.x + deltaV, y: player.velocity.y });
                      }

                    } else {
                      m.fieldCDcycle = m.cycle + 60;
                      m.fieldOn = false
                      m.fieldRadius = 0
                      break
                    }
                  }
                }

                // if (tech.isFreezeMobs) {
                //     for (let i = 0, len = mob.length; i < len; ++i) {
                //         if (!mob[i].isMobBullet && !mob[i].shield && !mob[i].isShielded && Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) < m.fieldRadius + mob[i].radius) {
                //             const ICE_DRAIN = 0.0005
                //             if (m.energy > ICE_DRAIN) m.energy -= ICE_DRAIN;
                //             mobs.statusSlow(mob[i], 180)
                //         }
                //     }
                // }
                ctx.beginPath();
                const rotate = m.cycle * 0.008;
                m.fieldPhase += 0.2 // - 0.5 * Math.sqrt(Math.min(m.energy, 1));
                const off1 = 1 + 0.06 * Math.sin(m.fieldPhase);
                const off2 = 1 - 0.06 * Math.sin(m.fieldPhase);
                ctx.beginPath();
                ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, graphicScale * m.fieldRadius * off1, graphicScale * m.fieldRadius * off2, rotate, 0, 2 * Math.PI);
                ctx.globalCompositeOperation = "exclusion";
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                ctx.beginPath();
                ctx.ellipse(m.fieldPosition.x, m.fieldPosition.y, graphicScale * m.fieldRadius * off1, graphicScale * m.fieldRadius * off2, rotate, 0, 2 * Math.PI * m.energy / m.maxEnergy);
                if (radiusGoal || m.cycle % 5) {
                  ctx.strokeStyle = "#000";
                } else {
                  ctx.strokeStyle = "#fff";
                }
                ctx.lineWidth = 4;
                ctx.stroke();
              } else {
                m.fieldCDcycle = m.cycle + 60;
                m.fieldOn = false
                m.fieldRadius = 0
              }

            } else {
              m.grabPowerUp();
            }
          } else {
            m.fieldOn = false
            m.fieldRadius = 0
          }
          //grab power ups normally at player too
          if (input.field) m.grabPowerUp();
          m.drawRegenEnergy("rgba(0,0,0,0.2)")

          // //draw physics collider
          // ctx.beginPath();
          // const vertices = m.fieldUpgrades[8].collider.vertices;
          // ctx.moveTo(vertices[0].x, vertices[0].y);
          // for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
          // ctx.lineTo(vertices[0].x, vertices[0].y);
          // ctx.strokeStyle = "#000";
          // ctx.lineWidth = 2;
          // ctx.stroke();
        }
      }
    },
    {
      name: "wormhole",
      // setDescription() {
      //     return `use <strong>${tech.isFreeWormHole ? 2 : 16}</strong> <strong class='color-f'>energy</strong> to <strong>tunnel</strong> through a <strong class='color-worm'>wormhole</strong><br><strong>+8%</strong> chance to <strong class='color-dup'>duplicate</strong> spawned <strong>power ups</strong><br><strong>8</strong> <strong class='color-f'>energy</strong> per second`
      // },
      description: `use <strong>16</strong> <strong class='color-f'>energy</strong> to <strong>tunnel</strong> through a <strong class='color-worm'>wormhole</strong>
      				<br><strong>+8%</strong> chance to <strong class='color-dup'>duplicate</strong> <strong>power ups</strong>
                    <br><strong>8</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↓↓↑↓</em>`,
      keyLog: [null, null, null, null, null],
      drain: 0,
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[9].keyLog.shift() //remove first element
          m.fieldUpgrades[9].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowDown", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowDown"]
          const patternB = [input.key.down, input.key.down, input.key.down, input.key.up, input.key.down,]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          const drain = tech.isFreeWormHole ? 0.02 : 0.16
          if (m.energy > drain && arraysEqual(m.fieldUpgrades[9].keyLog, patternA) || arraysEqual(m.fieldUpgrades[9].keyLog, patternB)) {
            m.energy -= drain
            const rayResults = Matter.Query.ray(map, m.pos, { x: m.pos.x, y: m.pos.y - 10000 }, 50)
            let hasTeleported = false
            if (rayResults.length) {
              rayResults.sort((a, b) => {
                const yA = a.body.position.y;
                const yB = b.body.position.y;
                return yB - yA;
              });

              for (let i = 0, len = Math.min(10, rayResults.length); i < len; i++) {
                const h = rayResults[i].body.bounds.min.y
                if (Matter.Query.ray(map, { x: m.pos.x, y: h }, { x: m.pos.x, y: h - 150 }, 50).length === 0) {
                  simulation.translatePlayerAndCamera({ x: m.pos.x, y: h - 90 }) //too jerky 
                  // Matter.Body.setPosition(player, { x: m.pos.x, y: h - 90 });
                  requestAnimationFrame(() => {
                    Matter.Body.setVelocity(player, { x: 0, y: 0 });
                    // requestAnimationFrame(() => { Matter.Body.setVelocity(player, { x: 0, y: 0 }); });
                  });

                  // simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>({</span> x<span class='color-symbol'>:</span> 0<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> 0 <span class='color-symbol'>})</span> &nbsp; <em style="font-family:monospace;font-size:1rem;color:#055;">//↓↓↓↑↓</em>`);
                  hasTeleported = true
                  break
                }
              }
            } else {
              const rayResultsDown = Matter.Query.ray(map, m.pos, { x: m.pos.x, y: m.pos.y + 10000 }, 50)
              if (rayResultsDown.length) {
                rayResultsDown.sort((a, b) => {
                  const yA = a.body.position.y;
                  const yB = b.body.position.y;
                  return yB - yA;
                });
                for (let i = 0, len = Math.min(10, rayResultsDown.length); i < len; i++) {
                  const h = rayResultsDown[i].body.bounds.min.y
                  if (Matter.Query.ray(map, { x: m.pos.x, y: h }, { x: m.pos.x, y: h - 150 }, 50).length === 0) {
                    simulation.translatePlayerAndCamera({ x: m.pos.x, y: h - 90 }) //too jerky 
                    Matter.Body.setVelocity(player, { x: 0, y: 0 });
                    // simulation.inGameConsole(`simulation<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>({</span> x<span class='color-symbol'>:</span> 0<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> 0 <span class='color-symbol'>})</span> &nbsp; <em style ="font-family: monospace;font-size:1rem;color:#055;">//↓↓↓↑↓</em>`);
                    hasTeleported = true
                    break
                  }
                }
              }
            }
            if (!hasTeleported) { //show failure as a short teleport
              simulation.translatePlayerAndCamera({ x: m.pos.x, y: player.position.y - 20 }) //too jerky 
              // Matter.Body.setPosition(player, { x: m.pos.x, y: m.pos.y - 20 });
              // Matter.Body.setVelocity(player, { x: 0, y: 0 });
            }
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#bbf" //"#0c5"
        m.eyeFillColor = m.fieldMeterColor

        m.duplicateChance = 0.08
        m.fieldRange = 0
        powerUps.setPowerUpMode(); //needed after adjusting duplication chance

        m.hold = function () {
          // m.hole = {  //this is reset with each new field, but I'm leaving it here for reference
          //   isOn: false,
          //   isReady: true,
          //   pos1: {x: 0,y: 0},
          //   pos2: {x: 0,y: 0},
          //   angle: 0,
          //   unit:{x:0,y:0},
          // }
          if (m.hole.isOn) {
            // draw holes
            m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
            const semiMajorAxis = m.fieldRange + 30
            const edge1a = Vector.add(Vector.mult(m.hole.unit, semiMajorAxis), m.hole.pos1)
            const edge1b = Vector.add(Vector.mult(m.hole.unit, -semiMajorAxis), m.hole.pos1)
            const edge2a = Vector.add(Vector.mult(m.hole.unit, semiMajorAxis), m.hole.pos2)
            const edge2b = Vector.add(Vector.mult(m.hole.unit, -semiMajorAxis), m.hole.pos2)
            ctx.beginPath();
            ctx.moveTo(edge1a.x, edge1a.y)
            ctx.bezierCurveTo(m.hole.pos1.x, m.hole.pos1.y, m.hole.pos2.x, m.hole.pos2.y, edge2a.x, edge2a.y);
            ctx.lineTo(edge2b.x, edge2b.y)
            ctx.bezierCurveTo(m.hole.pos2.x, m.hole.pos2.y, m.hole.pos1.x, m.hole.pos1.y, edge1b.x, edge1b.y);
            ctx.fillStyle = `rgba(255,255,255,${200 / m.fieldRange / m.fieldRange})` //"rgba(0,0,0,0.1)"
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(m.hole.pos1.x, m.hole.pos1.y, m.fieldRange, semiMajorAxis, m.hole.angle, 0, 2 * Math.PI)
            ctx.ellipse(m.hole.pos2.x, m.hole.pos2.y, m.fieldRange, semiMajorAxis, m.hole.angle, 0, 2 * Math.PI)
            ctx.fillStyle = `rgba(255,255,255,${32 / m.fieldRange})`
            ctx.fill();

            //suck power ups
            for (let i = 0, len = powerUp.length; i < len; ++i) {
              if (tech.isEnergyNoAmmo && powerUp[i].name === "ammo") continue
              //which hole is closer
              const dxP1 = m.hole.pos1.x - powerUp[i].position.x;
              const dyP1 = m.hole.pos1.y - powerUp[i].position.y;
              const dxP2 = m.hole.pos2.x - powerUp[i].position.x;
              const dyP2 = m.hole.pos2.y - powerUp[i].position.y;
              let dxP, dyP, dist2
              if (dxP1 * dxP1 + dyP1 * dyP1 < dxP2 * dxP2 + dyP2 * dyP2) {
                dxP = dxP1
                dyP = dyP1
              } else {
                dxP = dxP2
                dyP = dyP2
              }
              dist2 = dxP * dxP + dyP * dyP;
              if (dist2 < 600000) { //&& !(m.health === m.maxHealth && powerUp[i].name === "heal")
                powerUp[i].force.x += 4 * (dxP / dist2) * powerUp[i].mass; // float towards hole
                powerUp[i].force.y += 4 * (dyP / dist2) * powerUp[i].mass - powerUp[i].mass * simulation.g; //negate gravity
                Matter.Body.setVelocity(powerUp[i], { x: powerUp[i].velocity.x * 0.05, y: powerUp[i].velocity.y * 0.05 });
                if (dist2 < 1000 && !simulation.isChoosing) { //use power up if it is close enough

                  simulation.ephemera.push({
                    name: "womrhole grab",
                    count: 5, //cycles before it self removes
                    PposX: powerUp[i].position.x,
                    PposY: powerUp[i].position.y,
                    size: powerUp[i].size,
                    color: powerUp[i].color,
                    do() {
                      this.count--
                      if (this.count < 0) simulation.removeEphemera(this.name)
                      ctx.beginPath();
                      ctx.arc(this.PposX, this.PposY, Math.max(1, this.size * (this.count + 1) / 7), 0, 2 * Math.PI);
                      ctx.fillStyle = this.color
                      ctx.fill();
                    },
                  })

                  m.fieldRange *= 0.8
                  powerUps.onPickUp(powerUp[i]);
                  powerUp[i].effect();
                  Matter.Composite.remove(engine.world, powerUp[i]);
                  powerUp.splice(i, 1);
                  break; //because the array order is messed up after splice
                }
              }
            }
            //suck and shrink blocks
            const suckRange = 500
            const shrinkRange = 100
            const shrinkScale = 0.97;
            const slowScale = 0.9
            for (let i = 0, len = body.length; i < len; i++) {
              if (!body[i].isNotHoldable) {
                const dist1 = Vector.magnitude(Vector.sub(m.hole.pos1, body[i].position))
                const dist2 = Vector.magnitude(Vector.sub(m.hole.pos2, body[i].position))
                if (dist1 < dist2) {
                  if (dist1 < suckRange) {
                    const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos1, body[i].position)), 1)
                    const slow = Vector.mult(body[i].velocity, slowScale)
                    Matter.Body.setVelocity(body[i], Vector.add(slow, pull));
                    //shrink
                    if (Vector.magnitude(Vector.sub(m.hole.pos1, body[i].position)) < shrinkRange) {
                      Matter.Body.scale(body[i], shrinkScale, shrinkScale);
                      if (body[i].mass < 0.05) {
                        Matter.Composite.remove(engine.world, body[i]);
                        body.splice(i, 1);
                        m.fieldRange *= 0.8
                        if ((m.fieldMode === 0 || m.fieldMode === 9) && m.immuneCycle < m.cycle) m.energy += 0.02 * m.coupling * level.isReducedRegen
                        if (tech.isWormholeWorms) { //pandimensional spermia
                          for (let i = 0, len = 1 + Math.floor(4 * Math.random()); i < len; i++) {
                            b.worm(Vector.add(m.hole.pos2, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                            Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), -10));
                          }
                        }
                        if (tech.isBlockDup) {
                          if (tech.blockDupCount < 0.4) {
                            tech.blockDupCount += 0.02
                            simulation.inGameConsole(`<span class='color-var'>duplicationChance</span><span class='color-symbol'>++</span> <em>//${(tech.blockDupCount * 100).toFixed(0)}% for anyon</em>`);
                          } else {
                            simulation.inGameConsole(`//<em><span class='color-var'>duplicationChance</span> limit reached for this level</em>`);
                          }
                        }
                        break
                      }
                    }
                  }
                } else if (dist2 < suckRange) {
                  const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos2, body[i].position)), 1)
                  const slow = Vector.mult(body[i].velocity, slowScale)
                  Matter.Body.setVelocity(body[i], Vector.add(slow, pull));
                  //shrink
                  if (Vector.magnitude(Vector.sub(m.hole.pos2, body[i].position)) < shrinkRange) {
                    Matter.Body.scale(body[i], shrinkScale, shrinkScale);
                    if (body[i].mass < 0.05) {
                      Matter.Composite.remove(engine.world, body[i]);
                      body.splice(i, 1);
                      m.fieldRange *= 0.8
                      if ((m.fieldMode === 0 || m.fieldMode === 9) && m.immuneCycle < m.cycle) m.energy += 0.02 * m.coupling * level.isReducedRegen
                      if (m.fieldMode === 0 || m.fieldMode === 9) m.energy += 0.02 * m.coupling * level.isReducedRegen
                      if (tech.isWormholeWorms) { //pandimensional spermia
                        for (let i = 0, len = 1 + Math.floor(4 * Math.random()); i < len; i++) {
                          b.worm(Vector.add(m.hole.pos2, Vector.rotate({ x: m.fieldRange * 0.4, y: 0 }, 2 * Math.PI * Math.random())))
                          Matter.Body.setVelocity(bullet[bullet.length - 1], Vector.mult(Vector.rotate(m.hole.unit, Math.PI / 2), -10));
                        }
                      }
                      if (tech.isBlockDup) {
                        if (tech.blockDupCount < 0.4) {
                          tech.blockDupCount += 0.02
                          simulation.inGameConsole(`<span class='color-var'>duplicationChance</span><span class='color-symbol'>++</span> <em>//${(tech.blockDupCount * 100).toFixed(0)}% for anyon</em>`);
                        } else {
                          simulation.inGameConsole(`//<em><span class='color-var'>duplicationChance</span> limit reached for this level</em>`);
                        }
                      }
                      break
                    }
                  }
                }
              }
            }
            if (tech.isWormHoleBullets) {
              //teleport bullets
              for (let i = 0, len = bullet.length; i < len; ++i) { //teleport bullets from hole1 to hole2
                if (!bullet[i].botType && !bullet[i].isInHole) { //don't teleport bots
                  if (Vector.magnitude(Vector.sub(m.hole.pos1, bullet[i].position)) < m.fieldRange) { //find if bullet is touching hole1
                    Matter.Body.setPosition(bullet[i], Vector.add(m.hole.pos2, Vector.sub(m.hole.pos1, bullet[i].position)));
                    m.fieldRange += 5
                    bullet[i].isInHole = true
                  } else if (Vector.magnitude(Vector.sub(m.hole.pos2, bullet[i].position)) < m.fieldRange) { //find if bullet is touching hole1
                    Matter.Body.setPosition(bullet[i], Vector.add(m.hole.pos1, Vector.sub(m.hole.pos2, bullet[i].position)));
                    m.fieldRange += 5
                    bullet[i].isInHole = true
                  }
                }
              }
              // mobs get pushed away
              for (let i = 0, len = mob.length; i < len; i++) {
                if (Vector.magnitude(Vector.sub(m.hole.pos1, mob[i].position)) < 200) {
                  const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos1, mob[i].position)), -0.07)
                  Matter.Body.setVelocity(mob[i], Vector.add(mob[i].velocity, pull));
                }
                if (Vector.magnitude(Vector.sub(m.hole.pos2, mob[i].position)) < 200) {
                  const pull = Vector.mult(Vector.normalise(Vector.sub(m.hole.pos2, mob[i].position)), -0.07)
                  Matter.Body.setVelocity(mob[i], Vector.add(mob[i].velocity, pull));
                }
              }
            }
          }

          if (m.fieldCDcycle < m.cycle) {
            const scale = 40
            const justPastMouse = Vector.add(Vector.mult(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)), 25), simulation.mouseInGame) //used to see if the wormhole will collide with wall
            const sub = Vector.sub(simulation.mouseInGame, m.pos)
            // const mag = Vector.magnitude(sub)

            if (input.field) {
              if (tech.isWormHolePause) {
                // const drain = m.fieldRegen + 0.000035
                // if (m.energy > drain) {
                // m.energy -= drain
                if (m.immuneCycle < m.cycle + 1) m.immuneCycle = m.cycle + 1; //player is immune to damage for 1 cycle
                m.isTimeDilated = true;

                function sleep(who) {
                  for (let i = 0, len = who.length; i < len; ++i) {
                    if (!who[i].isSleeping) {
                      who[i].storeVelocity = who[i].velocity
                      who[i].storeAngularVelocity = who[i].angularVelocity
                    }
                    Matter.Sleeping.set(who[i], true)
                  }
                }
                sleep(mob);
                sleep(body);
                sleep(bullet);
                simulation.cycle--; //pause all functions that depend on game cycle increasing
                Matter.Body.setVelocity(player, { //keep player frozen
                  x: 0,
                  y: -55 * player.mass * simulation.g //undo gravity before it is added
                });
                player.force.x = 0
                player.force.y = 0
                // } else {
                //     m.wakeCheck();
                //     m.energy = 0;
                // }
              }

              m.grabPowerUp();
              //scale drain with distance
              // if (tech.isWormholeMapIgnore && Matter.Query.ray(map, m.pos, justPastMouse).length !== 0) {
              //     this.drain = (0.05 + 0.005 * Math.sqrt(mag)) * 2
              // } else {
              //     this.drain = tech.isFreeWormHole ? 0 : 0.05 + 0.005 * Math.sqrt(mag)
              // }
              // if (tech.isWormholeMapIgnore && Matter.Query.ray(map, m.pos, justPastMouse).length !== 0) {
              //     this.drain = tech.isFreeWormHole ? 0 : 0.25
              // } else {
              //     this.drain = tech.isFreeWormHole ? 0 : 0.15
              // }
              this.drain = tech.isFreeWormHole ? 0.02 : 0.16
              const unit = Vector.perp(Vector.normalise(sub))
              const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle) }
              m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
              const edge2a = Vector.add(Vector.mult(unit, 1.5 * m.fieldRange), simulation.mouseInGame)
              const edge2b = Vector.add(Vector.mult(unit, -1.5 * m.fieldRange), simulation.mouseInGame)
              //draw possible wormhole
              ctx.beginPath();
              ctx.moveTo(where.x, where.y)
              ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2a.x, edge2a.y);
              ctx.moveTo(where.x, where.y)
              ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2b.x, edge2b.y);
              if (
                m.energy > this.drain &&
                (tech.isWormholeMapIgnore || Matter.Query.ray(map, m.pos, justPastMouse).length === 0) &&
                Matter.Query.region(map, {
                  min: { x: simulation.mouseInGame.x - scale, y: simulation.mouseInGame.y - scale },
                  max: { x: simulation.mouseInGame.x + scale, y: simulation.mouseInGame.y + scale }
                }).length === 0
              ) {
                m.hole.isReady = true;
                // ctx.fillStyle = "rgba(255,255,255,0.5)"
                // ctx.fill();
                ctx.lineWidth = 1
                ctx.strokeStyle = "#000"
                ctx.stroke();
              } else {
                m.hole.isReady = false;
                ctx.lineWidth = 1
                ctx.strokeStyle = "#000"
                ctx.lineDashOffset = 30 * Math.random()
                ctx.setLineDash([20, 40]);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            } else {
              if (tech.isWormHolePause && m.isTimeDilated) m.wakeCheck();
              //make new wormhole
              if (
                m.hole.isReady && m.energy > this.drain &&
                (tech.isWormholeMapIgnore || Matter.Query.ray(map, m.pos, justPastMouse).length === 0) &&
                Matter.Query.region(map, {
                  min: { x: simulation.mouseInGame.x - scale, y: simulation.mouseInGame.y - scale },
                  max: { x: simulation.mouseInGame.x + scale, y: simulation.mouseInGame.y + scale }
                }).length === 0
              ) {
                m.energy -= this.drain
                m.hole.isReady = false;
                m.fieldRange = 0
                if (tech.isWormholeMapIgnore) {
                  simulation.translatePlayerAndCamera(simulation.mouseInGame) //too jerky
                } else {
                  Matter.Body.setPosition(player, simulation.mouseInGame);
                }
                m.buttonCD_jump = 0 //this might fix a bug with jumping

                const velocity = Vector.mult(Vector.normalise(sub), 15)
                Matter.Body.setVelocity(player, { x: velocity.x, y: velocity.y - 5 }); //an extra vertical kick so the player hangs in place longer

                if (m.immuneCycle < m.cycle + 5) m.immuneCycle = m.cycle + 5; //player is immune to damage for 1/4 seconds 
                // move bots to player
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

                //set holes
                m.hole.isOn = true;
                m.hole.pos1.x = m.pos.x
                m.hole.pos1.y = m.pos.y
                m.hole.pos2.x = player.position.x
                m.hole.pos2.y = player.position.y
                m.hole.angle = Math.atan2(sub.y, sub.x)
                m.hole.unit = Vector.perp(Vector.normalise(sub))

                if (tech.isWormholeDamage) {
                  who = Matter.Query.ray(mob, m.pos, simulation.mouseInGame, 100)
                  for (let i = 0; i < who.length; i++) {
                    if (who[i].body.alive) {
                      mobs.statusDoT(who[i].body, 1, 420)
                      mobs.statusStun(who[i].body, 360)
                    }
                  }
                }
                if (tech.isNewWormHoleDamage) {
                  const dmg = 1.5
                  m.damageDone *= dmg
                  simulation.ephemera.push({
                    name: `wormholeDamage${m.cycle}`,
                    count: 300, //cycles before it self removes
                    do() {
                      this.count--
                      if (this.count < 0) {
                        simulation.removeEphemera(this.name)
                        m.damageDone /= dmg
                      }
                    },
                  })
                }
              }
            }

            // if (true && m.energy > 0.5) { //teleport away low mass mobs
            //     // && !(m.cycle % 1)
            //     const hit = Matter.Query.region(mob, {
            //         min: {
            //             x: m.pos.x - 80,
            //             y: m.pos.y - 80
            //         },
            //         max: {
            //             x: m.pos.x + 80,
            //             y: m.pos.y + 160
            //         }
            //     })

            //     // find incoming mob with low mass
            //     for (let i = 0; i < hit.length; i++) {
            //         if (hit[i].mass < 4 && m.energy > hit[i].mass * 0.06) {
            //             //is the mob moving towards the player?

            //             // console.log('found one', hit[i].mass)
            //             const unit = Vector.normalise(hit[i].velocity)
            //             const jump = Vector.mult(unit, 200)
            //             const where = Vector.add(hit[i].position, jump)
            //             if (Matter.Query.ray(map, hit[i].position, where).length === 0) { // check if space 180 from mob is clear of body and map
            //                 // m.energy -= hit[i].mass * 0.06
            //                 // m.fieldCDcycle = m.cycle + 30;
            //                 simulation.drawList.push({ x: hit[i].position.x, y: hit[i].position.y, radius: 20, color: "#fff", time: 16 });
            //                 Matter.Body.setPosition(hit[i], where);
            //                 simulation.drawList.push({ x: hit[i].position.x, y: hit[i].position.y, radius: 20, color: "#fff", time: 16 });
            //             }
            //             // break
            //         }
            //     }
            // }
          }
          // if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
          //     const justPastMouse = Vector.add(Vector.mult(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)), 50), simulation.mouseInGame)
          //     const scale = 60
          //     const sub = Vector.sub(simulation.mouseInGame, m.pos)
          //     const mag = Vector.magnitude(sub)
          //     const drain = tech.isFreeWormHole ? 0 : 0.06 + 0.006 * Math.sqrt(mag)
          //     if (m.hole.isReady && mag > 250 && m.energy > drain) {
          //         if (
          //             Matter.Query.region(map, {
          //                 min: {
          //                     x: simulation.mouseInGame.x - scale,
          //                     y: simulation.mouseInGame.y - scale
          //                 },
          //                 max: {
          //                     x: simulation.mouseInGame.x + scale,
          //                     y: simulation.mouseInGame.y + scale
          //                 }
          //             }).length === 0 &&
          //             Matter.Query.ray(map, m.pos, justPastMouse).length === 0
          //             // Matter.Query.ray(map, m.pos, simulation.mouseInGame).length === 0 &&
          //             // Matter.Query.ray(map, player.position, simulation.mouseInGame).length === 0 &&
          //             // Matter.Query.ray(map, player.position, justPastMouse).length === 0
          //         ) {
          //             m.energy -= drain
          //             m.hole.isReady = false;
          //             m.fieldRange = 0
          //             Matter.Body.setPosition(player, simulation.mouseInGame);
          //             m.buttonCD_jump = 0 //this might fix a bug with jumping
          //             const velocity = Vector.mult(Vector.normalise(sub), 20)
          //             Matter.Body.setVelocity(player, {
          //                 x: velocity.x,
          //                 y: velocity.y - 4 //an extra vertical kick so the player hangs in place longer
          //             });
          //             if (m.immuneCycle < m.cycle + 15) m.immuneCycle = m.cycle + 15; //player is immune to damage for 1/4 seconds 
          //             // move bots to player
          //             for (let i = 0; i < bullet.length; i++) {
          //                 if (bullet[i].botType) {
          //                     Matter.Body.setPosition(bullet[i], Vector.add(player.position, {
          //                         x: 250 * (Math.random() - 0.5),
          //                         y: 250 * (Math.random() - 0.5)
          //                     }));
          //                     Matter.Body.setVelocity(bullet[i], {
          //                         x: 0,
          //                         y: 0
          //                     });
          //                 }
          //             }

          //             //set holes
          //             m.hole.isOn = true;
          //             m.hole.pos1.x = m.pos.x
          //             m.hole.pos1.y = m.pos.y
          //             m.hole.pos2.x = player.position.x
          //             m.hole.pos2.y = player.position.y
          //             m.hole.angle = Math.atan2(sub.y, sub.x)
          //             m.hole.unit = Vector.perp(Vector.normalise(sub))

          //             if (tech.isWormholeDamage) {
          //                 who = Matter.Query.ray(mob, m.pos, simulation.mouseInGame, 100)
          //                 for (let i = 0; i < who.length; i++) {
          //                     if (who[i].body.alive) {
          //                         mobs.statusDoT(who[i].body, 1, 420)
          //                         mobs.statusStun(who[i].body, 360)
          //                     }
          //                 }
          //             }
          //         } else {
          //             //draw failed wormhole
          //             const unit = Vector.perp(Vector.normalise(Vector.sub(simulation.mouseInGame, m.pos)))
          //             const where = { x: m.pos.x + 30 * Math.cos(m.angle), y: m.pos.y + 30 * Math.sin(m.angle), }
          //             m.fieldRange = 0.97 * m.fieldRange + 0.03 * (50 + 10 * Math.sin(simulation.cycle * 0.025))
          //             const edge2a = Vector.add(Vector.mult(unit, 1.5 * m.fieldRange), simulation.mouseInGame)
          //             const edge2b = Vector.add(Vector.mult(unit, -1.5 * m.fieldRange), simulation.mouseInGame)
          //             ctx.beginPath();
          //             ctx.moveTo(where.x, where.y)
          //             ctx.bezierCurveTo(where.x, where.y, simulation.mouseInGame.x, simulation.mouseInGame.y, edge2a.x, edge2a.y);
          //             ctx.lineTo(edge2b.x, edge2b.y)
          //             ctx.bezierCurveTo(simulation.mouseInGame.x, simulation.mouseInGame.y, where.x, where.y, where.x, where.y);
          //             // ctx.fillStyle = "rgba(255,255,255,0.5)"
          //             // ctx.fill();
          //             ctx.lineWidth = 1
          //             ctx.strokeStyle = "#000"
          //             ctx.lineDashOffset = 30 * Math.random()
          //             ctx.setLineDash([20, 40]);
          //             ctx.stroke();
          //             ctx.setLineDash([]);
          //         }
          //     }
          //     m.grabPowerUp();
          // } else {
          //     m.hole.isReady = true;
          // }
          m.drawRegenEnergy()
        }
      },

      // rewind: function() {
      //     if (input.down) {
      //         if (input.field && m.fieldCDcycle < m.cycle) { //not hold but field button is pressed
      //             const DRAIN = 0.01
      //             if (this.rewindCount < 289 && m.energy > DRAIN) {
      //                 m.energy -= DRAIN


      //                 if (this.rewindCount === 0) {
      //                     const shortPause = function() {
      //                         if (m.defaultFPSCycle < m.cycle) { //back to default values
      //                             simulation.fpsCap = simulation.fpsCapDefault
      //                             simulation.fpsInterval = 1000 / simulation.fpsCap;
      //                             // document.getElementById("dmg").style.transition = "opacity 1s";
      //                             // document.getElementById("dmg").style.opacity = "0";
      //                         } else {
      //                             requestAnimationFrame(shortPause);
      //                         }
      //                     };
      //                     if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
      //                     simulation.fpsCap = 4 //1 is longest pause, 4 is standard
      //                     simulation.fpsInterval = 1000 / simulation.fpsCap;
      //                     m.defaultFPSCycle = m.cycle
      //                 }


      //                 this.rewindCount += 10;
      //                 simulation.wipe = function() { //set wipe to have trails
      //                     // ctx.fillStyle = "rgba(255,255,255,0)";
      //                     ctx.fillStyle = `rgba(221,221,221,${0.004})`;
      //                     ctx.fillRect(0, 0, canvas.width, canvas.height);
      //                 }
      //                 let history = m.history[(m.cycle - this.rewindCount) % 300]
      //                 Matter.Body.setPosition(player, history.position);
      //                 Matter.Body.setVelocity(player, { x: history.velocity.x, y: history.velocity.y });
      //                 if (history.health > m.health) {
      //                     m.health = history.health
      //                     m.displayHealth();
      //                 }
      //                 //grab power ups
      //                 for (let i = 0, len = powerUp.length; i < len; ++i) {
      //                     const dxP = player.position.x - powerUp[i].position.x;
      //                     const dyP = player.position.y - powerUp[i].position.y;
      //                     if (dxP * dxP + dyP * dyP < 50000 && !simulation.isChoosing && !(m.health === m.maxHealth && powerUp[i].name === "heal")) {
      //                         powerUps.onPickUp(player.position);
      //                         powerUp[i].effect();
      //                         Matter.Composite.remove(engine.world, powerUp[i]);
      //                         powerUp.splice(i, 1);
      //                         const shortPause = function() {
      //                             if (m.defaultFPSCycle < m.cycle) { //back to default values
      //                                 simulation.fpsCap = simulation.fpsCapDefault
      //                                 simulation.fpsInterval = 1000 / simulation.fpsCap;
      //                                 // document.getElementById("dmg").style.transition = "opacity 1s";
      //                                 // document.getElementById("dmg").style.opacity = "0";
      //                             } else {
      //                                 requestAnimationFrame(shortPause);
      //                             }
      //                         };
      //                         if (m.defaultFPSCycle < m.cycle) requestAnimationFrame(shortPause);
      //                         simulation.fpsCap = 3 //1 is longest pause, 4 is standard
      //                         simulation.fpsInterval = 1000 / simulation.fpsCap;
      //                         m.defaultFPSCycle = m.cycle
      //                         break; //because the array order is messed up after splice
      //                     }
      //                 }
      //                 m.immuneCycle = m.cycle + 5; //player is immune to damage for 30 cycles
      //             } else {
      //                 m.fieldCDcycle = m.cycle + 30;
      //                 // m.resetHistory();
      //             }
      //         } else {
      //             if (this.rewindCount !== 0) {
      //                 m.fieldCDcycle = m.cycle + 30;
      //                 m.resetHistory();
      //                 this.rewindCount = 0;
      //                 simulation.wipe = function() { //set wipe to normal
      //                     ctx.clearRect(0, 0, canvas.width, canvas.height);
      //                 }
      //             }
      //             m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
      //         }
      //     }
      //     m.drawRegenEnergy()
      // },
    },
    {
      name: "grappling hook",
      description: `use <strong class='color-f'>energy</strong> to fire a hook that <strong>pulls</strong> you
      				<br><strong>0.5x</strong> <strong class='color-defense'>damage taken</strong>
                    <br><strong>9</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↑↑↓↓</em>`,
      keyLog: [null, null, null, null],
      effect: () => {
        //store event function so it can be found and removed in m.setField()
        m.fieldEvent = function (event) {
          m.fieldUpgrades[10].keyLog.shift() //remove first element
          m.fieldUpgrades[10].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"]
          const patternB = [input.key.up, input.key.up, input.key.down, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          const drain = 0.13
          if (m.energy > drain && arraysEqual(m.fieldUpgrades[10].keyLog, patternA) || arraysEqual(m.fieldUpgrades[10].keyLog, patternB)) {
            // const rayResults = Matter.Query.ray(map, m.pos, { x: m.pos.x, y: m.pos.y + 5000 }, 50)
            const combinedElements = [...map, ...body];
            const rayResults = Matter.Query.ray(combinedElements, m.pos, { x: m.pos.x, y: m.pos.y + 5000 }, 40);

            if (rayResults.length) {
              rayResults.sort((a, b) => {
                const yA = a.body.position.y;
                const yB = b.body.position.y;
                return yA - yB;
              });
              const h = rayResults[0].body.bounds.min.y
              if (h - m.pos.y > 400) { //check if at least 500 above the ground
                m.energy -= drain
                const hLast = player.position.y
                const range = 0.05 * Math.min(h - hLast, 1500)
                const range2 = Math.min(h - hLast, 1500) * Math.min(h - hLast, 1500)
                simulation.ephemera.push({
                  name: "grapple ground smash",
                  count: 0, //cycles before it self removes
                  do() {
                    this.count++
                    if (this.count > 6) simulation.removeEphemera(this.name)

                    ctx.fillStyle = 'rgba(255,255,255,0.5)'
                    ctx.beginPath();

                    ctx.arc(m.pos.x, m.pos.y, range * this.count, 0, 2 * Math.PI);
                    ctx.lineWidth = 10;
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(m.pos.x, hLast);
                    ctx.lineTo(m.pos.x, h - 90);
                    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
                    ctx.lineWidth = 40;
                    ctx.stroke();
                  },
                })
                Matter.Body.setPosition(player, { x: m.pos.x, y: h - 90 });
                Matter.Body.setVelocity(player, { x: player.velocity.x, y: 0 });
                input.field = false //force release grapple
                const immunity = Math.min(Math.floor(0.06 * (h - hLast)), 180)
                if (m.immuneCycle < m.cycle + immunity) m.immuneCycle = m.cycle + immunity; //player is immune to damage for 30 cycles

                m.doCrouch()
                m.yOff = m.yOffWhen.jump;
                m.hardLandCD = m.cycle + m.hardLandCDScale * Math.min(2 * m.hardLanding / 6.5 - 6, 40)

                //push away blocks, mobs
                const magX = 0.0015 * range
                const magY = 0.001 * range
                for (let i = 0, len = body.length; i < len; ++i) {
                  if (Vector.magnitudeSquared(Vector.sub(body[i].position, player.position)) < range2) {
                    body[i].force.x += magX * body[i].mass * (body[i].position.x > player.position.x ? 1 : -1)
                    body[i].force.y -= magY * body[i].mass
                  }
                }
                for (let i = 0, len = mob.length; i < len; ++i) {
                  if (Vector.magnitudeSquared(Vector.sub(mob[i].position, player.position)) < range2) {
                    mob[i].force.x += magX * mob[i].mass * (mob[i].position.x > player.position.x ? 1 : -1)
                    mob[i].force.y -= magY * mob[i].mass
                  }
                }
                //pull power ups in
                for (let i = 0, len = powerUp.length; i < len; ++i) {
                  if (Vector.magnitudeSquared(Vector.sub(powerUp[i].position, player.position)) < range2) {
                    powerUp[i].force.x -= magX * powerUp[i].mass * (powerUp[i].position.x > player.position.x ? 1 : -1)
                    powerUp[i].force.y += magY * powerUp[i].mass
                  }
                }
                // simulation.inGameConsole(`Matter<span class='color-symbol'>.</span>Body<span class='color-symbol'>.</span>setPosition<span class='color-symbol'>(</span>player<span class='color-symbol'>, {</span> x<span class='color-symbol'>:</span> 0<span class='color-symbol'>,</span> y<span class='color-symbol'>:</span> 0 <span class='color-symbol'>})</span> &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑↑↓↓</em>`);
              }
            }
            //  AoE stun mobs?
            //  damage mobs?
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldFire = true;
        // m.holdingMassScale = 0.01; //can hold heavier blocks with lower cost to jumping
        // m.fieldMeterColor = "#789"//"#456"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldHarmReduction = 0.5; //40% reduction
        m.grabPowerUpRange2 = 300000 //m.grabPowerUpRange2 = 200000;

        m.hold = function () {
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (input.field) {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            if (m.fieldCDcycle < m.cycle) {
              if (m.energy > 0.02) m.energy -= 0.02
              const r = 40// * player.scale
              b.grapple({ x: m.pos.x + r * Math.cos(m.angle), y: m.pos.y + r * Math.sin(m.angle) }, m.angle)
              if (m.fieldCDcycle < m.cycle + 20) m.fieldCDcycle = m.cycle + 20
            }
            m.grabPowerUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            if (tech.isHookDefense && m.energy > 0.15 && m.fieldCDcycle < m.cycle) {
              const range = 300
              for (let i = 0; i < mob.length; i++) {
                if (!mob[i].isBadTarget &&
                  !mob[i].isInvulnerable &&
                  Vector.magnitude(Vector.sub(m.pos, mob[i].position)) < range &&
                  Matter.Query.ray(map, m.pos, mob[i].position).length === 0
                ) {
                  m.energy -= 0.1
                  if (m.fieldCDcycle < m.cycle + 20) m.fieldCDcycle = m.cycle + 20
                  const angle = Math.atan2(mob[i].position.y - player.position.y, mob[i].position.x - player.position.x);
                  b.harpoon(m.pos, mob[i], angle, 0.75, true, 20) // harpoon(where, target, angle = m.angle, harpoonSize = 1, isReturn = false, totalCycles = 35, isReturnAmmo = true, thrust = 0.1) {
                  bullet[bullet.length - 1].drain = 0
                  const maxCount = 6
                  for (let j = maxCount - 1; j > 0; j--) {
                    b.harpoon(m.pos, mob[i], angle + j * 2 * Math.PI / maxCount, 0.75, true, 10)
                    bullet[bullet.length - 1].drain = 0
                  }
                  break
                }
              }
              ctx.beginPath();
              ctx.arc(m.pos.x, m.pos.y, range, 0, 2 * Math.PI);
              ctx.strokeStyle = "#000";
              ctx.lineWidth = 0.25;
              ctx.setLineDash([10, 30]);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
          m.drawRegenEnergy()
          //look for nearby mobs and fire harpoons at them
        }
      }
    },
    {
      name: "tachyonic field",
      description: `use <strong class="color-f">energy</strong> to gain a <strong>burst</strong> of <strong class='color-speed'>speed</strong>
              <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">←↑→↓↓</em>
      				<br>multiply <strong class='color-speed'>momentum</strong> <strong>exponentially</strong>
                    <br>16 <strong class="color-f">energy</strong> per second`,
      canMove: false,
      keyLog: [null, null, null, null, null],
      haveEphemera: false,
      effect() {
        m.fieldEvent = function (event) {
          m.fieldUpgrades[m.fieldMode].keyLog.shift() //remove first element
          m.fieldUpgrades[m.fieldMode].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowDown"]
          const patternB = [input.key.left, input.key.up, input.key.right, input.key.down, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternA) || arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternB)) {
            m.fieldUpgrades[m.fieldMode].canMove = true;
            if (m.energy < m.maxEnergy) {
              m.energy = m.maxEnergy;
              m.drawRegenEnergy();
              simulation.inGameConsole(`<span class='color-var'>m</span>.<strong class='color-f'>energy</strong> <span class='color-symbol'>=</span> 
              	<span class='color-var'>m</span>.<strong class='color-f'>maxEnergy</strong>
              	<em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//←↑→↓↓</em>`)
            }
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#D12";
        m.hold = () => {
          m.fieldFx = 1 + Math.abs(Math.log(m.coupling + 1)) / 5;
          m.setMovement();
          m.hardLandCDScale = 0.5;
          m.hardLanding = 16000;
          const dist = Vector.sub(simulation.mouseInGame, player.position);
          const distMag = Vector.magnitude(dist);
          const radius = 400;
          if (distMag < radius || m.isHolding) {
            this.canMove = false;
          } else {
            this.canMove = true;
          }
          ctx.beginPath();
          ctx.moveTo(player.position.x + radius, player.position.y);
          ctx.lineWidth = 2;
          // ctx.setLineDash([Math.PI * 200 + Math.sin(simulation.cycle / 200) * Math.PI * 200, Math.PI * 200 - Math.sin(simulation.cycle / 200) * Math.PI * 200]); //cool, but not necessary
          ctx.arc(player.position.x, player.position.y, radius, 0, 2 * Math.PI);
          ctx.strokeStyle = "#909090";
          ctx.fillStyle = !this.canMove ? "rgba(220, 20, 60, 0.05)" : "transparent";
          ctx.stroke();
          ctx.fill();
          // ctx.setLineDash([]);
          ctx.beginPath();
          ctx.fillStyle = !this.canMove ? "rgba(220, 20, 60, 0.02)" : "transparent";
          ctx.moveTo(player.position.x, player.position.y - radius);
          ctx.lineTo(player.position.x + radius, player.position.y);
          ctx.lineTo(player.position.x, player.position.y + radius);
          ctx.lineTo(player.position.x - radius, player.position.y);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = !this.canMove ? "rgba(220, 20, 60, 0.06)" : "transparent";
          ctx.lineWidth = 75;
          ctx.moveTo(player.position.x, player.position.y - 200);
          ctx.lineTo(player.position.x, player.position.y + 100);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(player.position.x + 5, player.position.y + 200);
          ctx.arc(player.position.x, player.position.y + 200, 5, 0, 2 * Math.PI);
          ctx.stroke();
          // m.energy = Math.max(0, Math.min(m.maxEnergy, m.energy));
          if (tech.tachCondensation) {
            for (let i = 0; i < mob.length; i++) {
              if (Matter.Query.collides(player, [mob[i]]).length > 0) {
                const dmg = Math.sqrt((m.damageDone ? m.damageDone : m.dmgScale) * Math.sqrt(player.speed));
                mob[i].damage(dmg, true);
                simulation.drawList.push({
                  x: mob[i].position.x,
                  y: mob[i].position.y,
                  radius: Math.abs(Math.log(dmg * player.speed) * 40 * mob[i].damageReduction + 3),
                  color: simulation.mobDmgColor,
                  time: simulation.drawTime
                });
                break
              }
            }
          }
          if (input.field && m.fieldCDcycle < m.cycle && this.canMove && m.energy > 0.1 && (player.velocity.x || player.velocity.y) && !this.haveEphemera) {
            this.haveEphemera = true;
            simulation.ephemera.push({
              name: "speedBoost",
              oldPosition: { x: player.position.x, y: player.position.y },
              drain: 0.02,
              do() {
                if (m.energy > 0.1 && input.field) {
                  Matter.Body.setVelocity(player, { x: player.velocity.x * 1.08, y: player.velocity.y * 1.08 });
                  m.energy -= this.drain;
                  // this.lightning((m.pos.x + this.oldPosition.x) / 2, (m.pos.y + this.oldPosition.y) / 2, m.pos.x + Math.random() * 20 - Math.random() * 20, m.pos.y + Math.random() * 20 - Math.random() * 20, "rgb(220, 20, 60)", 3);
                  this.drawLightningArc(m.pos, 50);
                  simulation.drawList.push({
                    x: player.position.x + Math.random() * 20 - Math.random() * 20,
                    y: player.position.y + Math.random() * 20 - Math.random() * 20,
                    radius: 15,
                    color: "rgba(220,20,60,0.4)",
                    time: 15
                  });
                  if (!(simulation.cycle % 100)) {
                    this.oldPosition = { x: (m.pos.x + this.oldPosition.x) / 2, y: (m.pos.y + this.oldPosition.y) / 2 };
                  }
                } else {
                  for (let i = 0; i < m.fieldUpgrades.length; i++) {
                    if (m.fieldUpgrades[i].name === "tachyonic field") {
                      m.fieldUpgrades[i].haveEphemera = false;
                    }
                  }
                  simulation.removeEphemera(this.name);
                }
              },
              // lightning(x1, y1, x2, y2, strokeColor = 'rgba(220, 20, 60, 0.5)', lineWidth = 5) {
              // ctx.strokeStyle = strokeColor;
              // ctx.lineWidth = lineWidth;
              // const dx = x2 - x1;
              // const dy = y2 - y1;
              // const distance = Math.sqrt(dx * dx + dy * dy);
              // const angle = Math.atan2(dy, dx);
              // const boltCount = Math.floor(Math.random() * 3) + 1;
              // let currentX = x1;
              // let currentY = y1;
              // ctx.beginPath();
              // ctx.moveTo(currentX, currentY);
              // while (Math.hypot(currentX - x1, currentY - y1) < distance) {
              // const segmentLength = Math.random() * 10 + 10;
              // const offsetAngle = angle + (Math.random() - 0.5) * 0.4;
              // const nextX = currentX + Math.cos(offsetAngle) * segmentLength;
              // const nextY = currentY + Math.sin(offsetAngle) * segmentLength;
              // if (Math.hypot(nextX - x1, nextY - y1) >= distance) break;
              // ctx.lineTo(nextX, nextY);
              // currentX = nextX;
              // currentY = nextY;
              // }
              // ctx.lineTo(x2, y2);
              // ctx.stroke();
              // },
              drawLightningArc(where, radius, lineWidth = 10, isCoolColors = true, strokeColor = null, shadowColor = null, shadowBlur = null) {
                const numPoints = 16;
                const slice = (2 * Math.PI) / numPoints;
                ctx.save()
                ctx.beginPath();
                //ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                ctx.lineWidth = lineWidth;
                //ctx.arc(where.x, where.y, radius, 0, 2 * Math.PI);
                ctx.lineJoin = "miter"
                ctx.miterLimit = 100;
                if (isCoolColors) {
                  ctx.strokeStyle = "white";
                  ctx.shadowColor = "rgba(220, 20, 60, 0.9)";
                  ctx.shadowBlur = 5;
                } else {
                  ctx.strokeStyle = strokeColor;
                  ctx.shadowColor = shadowColor;
                  ctx.shadowBlur = shadowBlur;
                }
                for (let i = 0; i < numPoints; i++) {
                  const angle = i * slice;
                  const dx = Math.cos(angle) * radius * 0.8;
                  const dy = Math.sin(angle) * radius * 0.8;
                  const newX = where.x + dx + Math.random() * radius * 0.4 - radius * 0.2;
                  const newY = where.y + dy + Math.random() * radius * 0.4 - radius * 0.2;
                  ctx.lineTo(newX, newY);
                }
                ctx.closePath();
                ctx.stroke();
                //ctx.setLineDash([]);
                ctx.restore()
              }
            })
          }
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if ((input.field && m.fieldCDcycle < m.cycle)) {
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            if (typeof m.lookForPickUp == 'function') { //lookForPickUp is changed in newer versions to lookForBlock
              m.lookForPickUp();
            } else {
              m.lookForBlock();
            }
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) {
            m.pickUp();
          } else {
            m.holdingTarget = null;
          }
          m.drawRegenEnergy()
        }
      }
    },
    {
      name: "energy condenser",
      //<br>hold <strong class='color-block'>blocks</strong> as if they have a lower <strong>mass</strong>
      description: `use <strong class='color-f'>energy</strong> to recover <strong class='color-h'>health</strong>
      				<em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">→↓←↓↓</em>
      				<br>must be <strong>crouching</strong> to use this effect
            		<br><strong>6</strong> <strong class='color-f'>energy</strong> per second`,
      keyLog: [null, null, null, null, null],
      loggingCDcycle: 0,
      effect() {
        m.fieldEvent = function (event) {
          m.fieldUpgrades[12].keyLog.shift() //remove first element
          m.fieldUpgrades[12].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowDown", "ArrowDown"],
            patternB = [input.key.right, input.key.down, input.key.left, input.key.down, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[12].keyLog, patternA) ||
            arraysEqual(m.fieldUpgrades[12].keyLog, patternB)) {
            if (m.energy > m.maxEnergy * 0.9) {
              simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health <span class='color-symbol'>=</span> 
              	<span class='color-var'>m</span>.maxHealth
              	<em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//→↓←↓↓</em>`)
              m.energy = 0.01
              m.health = m.maxHealth
              m.displayHealth();
            } else {
              simulation.inGameConsole(`<strong style='color:red'>Uncaught Error:</strong> <u>not enough <span class='color-f'>energy</span></u>`/*
              	<br>m<span class='color-symbol'>.</span><span class='color-f'>energy</span> <span class='color-symbol'>&lt;</span> 
              	m<span class='color-symbol'>.</span><span class='color-f'>maxEnergy</span>`*/)
            }
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#4c4";
        m.hold = () => {
          let DRAIN = 0.005, HEAL = 0.0025;
          HEAL *= 1 + 0.05 * m.coupling
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            if (typeof m.lookForPickUp == 'function') { //lookForPickUp is changed in newer versions to lookForBlock
              m.lookForPickUp();
            } else {
              m.lookForBlock();
            }
            if (m.energy > m.minEnergyToDeflect) {
              m.drawField();
              m.pushMobsFacing();
            }
            if (m.crouch && m.energy > DRAIN && !tech.isEnergyHealth) { //won't work with mass-energy
              if (m.health < m.maxHealth) {
                m.energy -= DRAIN;
                m.addHealth(HEAL);
              }
              if ((this.loggingCDcycle || 0) < m.cycle) {
                if (m.health < m.maxHealth) {
                  simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health <span class='color-symbol'>=</span> ${m.health.toFixed(2)}`);
                } else {
                  simulation.inGameConsole(`<div class="circle-grid heal"></div> &nbsp; <span class='color-var'>m</span>.health is <strong>full</strong>!`);
                }
                if (simulation.isTimeSkipping) {
                  this.loggingCDcycle = m.cycle + 30;
                } else {
                  this.loggingCDcycle = m.cycle + 60;
                }
              }
            }
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          m.drawRegenEnergy()
        }
      }
    },
    {
      name: "Einsteins shield",
      description: `<strong>shield</strong> maintains <strong>functionality</strong> while inactive
        			<br>allows <strong>slow fall</strong>
            		<br><strong>4</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↑←↓→↧</em>`,
      keyLog: [null, null, null, null, null],
      effect: () => {
        m.fieldEvent = function (event) {
          m.fieldUpgrades[m.fieldMode].keyLog.shift() //remove first element
          m.fieldUpgrades[m.fieldMode].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "ArrowDown"]
          const patternB = [input.key.up, input.key.left, input.key.down, input.key.right, input.key.down]
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          if (arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternA) || arraysEqual(m.fieldUpgrades[m.fieldMode].keyLog, patternB)) {
            let diffAngle = Vector.angle(m.pos, m.fieldPosition),
              speedDir = Math.sign(diffAngle - m.angle),
              fieldDist = Vector.magnitude(Vector.sub(m.pos, m.fieldPosition))
            simulation.inGameConsole(`m<span class='color-symbol'>.</span>fieldAngle <span class='color-symbol'>±=</span>
            ${Math.sqrt(4 / Vector.magnitude(Vector.sub(m.pos, m.fieldPosition))).toFixed(3)} &nbsp; &nbsp; <em style ="float: right; font-family: monospace;font-size:1rem;color:#055;">//↑←↓→↧`)
            simulation.ephemera.push({
              name: "Einstein shield orbit",
              speedCalc: Matter.Bodies.circle(m.fieldPosition.x, m.fieldPosition.y, m.fieldRange),
              dist: fieldDist,
              speed: 0,
              angle: diffAngle,
              dir: speedDir,
              do() {
                if (input.field || !input.down) simulation.removeEphemera(this.name)
                this.speed = Math.sqrt(4 / this.dist)
                this.angle += this.speed * this.dir
                let mult = Vector.mult({ x: Math.cos(this.angle), y: Math.sin(this.angle) }, this.dist)
                Matter.Body.setPosition(this.speedCalc, Vector.add(m.pos, mult))
                m.fieldPosition = this.speedCalc.position
              }
            })
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#48f" //"#0c5"
        m.eyeFillColor = m.fieldMeterColor
        m.fieldShieldingScale = 0;
        m.fieldBlockCD = 3;
        m.grabPowerUpRange2 = 10000000
        m.fieldPosition = { x: simulation.mouse.x, y: simulation.mouse.y }
        m.fieldAngle = m.angle
        m.perfectPush = (isFree = false) => {
          if (m.fieldCDcycle < m.cycle) {
            for (let i = 0, len = mob.length; i < len; ++i) {
              if (
                Vector.magnitude(Vector.sub(mob[i].position, m.fieldPosition)) - mob[i].radius < m.fieldRange &&
                !mob[i].isUnblockable &&
                Vector.dot({ x: Math.cos(m.fieldAngle), y: Math.sin(m.fieldAngle) }, Vector.normalise(Vector.sub(mob[i].position, m.fieldPosition))) > m.fieldThreshold &&
                Matter.Query.ray(map, mob[i].position, m.fieldPosition).length === 0
              ) {
                mob[i].locatePlayer();
                const unit = Vector.normalise(Vector.sub(m.fieldPosition, mob[i].position))
                m.fieldCDcycle = m.cycle + m.fieldBlockCD + (mob[i].isShielded ? 10 : 0);
                if (tech.blockDmg) { //electricity
                  Matter.Body.setVelocity(mob[i], { x: 0.5 * mob[i].velocity.x, y: 0.5 * mob[i].velocity.y });
                  if (mob[i].isShielded) {
                    for (let j = 0, len = mob.length; j < len; j++) {
                      if (mob[j].id === mob[i].shieldID) mob[j].damage(tech.blockDmg * m.dmgScale * (tech.isBlockRadiation ? 6 : 2), true)
                    }
                  } else if (tech.isBlockRadiation) {
                    if (mob[i].isMobBullet) {
                      mob[i].damage(tech.blockDmg * m.dmgScale * 3, true)
                    } else {
                      mobs.statusDoT(mob[i], tech.blockDmg * m.dmgScale * 0.42, 180) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                    }
                  } else {
                    mob[i].damage(tech.blockDmg * m.dmgScale, true)
                  }
                  // if (mob[i].isShielded) {
                  //     for (let j = 0, len = mob.length; j < len; j++) {
                  //         if (mob[j].id === mob[i].shieldID) mob[j].damage(tech.blockDmg * m.dmgScale * (tech.isBlockRadiation ? 3 : 1), true)
                  //     }
                  // } else {
                  //     if (tech.isBlockRadiation && !mob[i].isMobBullet) {
                  //         mobs.statusDoT(mob[i], tech.blockDmg * m.dmgScale * 4 / 12, 360) //200% increase -> x (1+2) //over 7s -> 360/30 = 12 half seconds -> 3/12
                  //     } else {
                  //         mob[i].damage(tech.blockDmg * m.dmgScale)
                  //     }
                  // }
                  const step = 40
                  ctx.beginPath();
                  for (let i = 0, len = 0.5 * tech.blockDmg; i < len; i++) {
                    let x = m.fieldPosition.x - 20 * unit.x;
                    let y = m.fieldPosition.y - 20 * unit.y;
                    ctx.moveTo(x, y);
                    for (let i = 0; i < 8; i++) {
                      x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
                      y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
                      ctx.lineTo(x, y);
                    }
                  }
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "#f0f";
                  ctx.stroke();
                } else if (isFree) {
                  ctx.lineWidth = 20; //when blocking draw this graphic
                  ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                  ctx.strokeStyle = "#000";
                  const len = mob[i].vertices.length - 1;
                  const mag = mob[i].radius
                  ctx.beginPath();
                  ctx.moveTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                  for (let j = 0; j < len; j++) {
                    ctx.lineTo(mob[i].vertices[j].x + mag * (Math.random() - 0.5), mob[i].vertices[j].y + mag * (Math.random() - 0.5));
                  }
                  ctx.lineTo(mob[i].vertices[len].x + mag * (Math.random() - 0.5), mob[i].vertices[len].y + mag * (Math.random() - 0.5))
                  ctx.fill();
                  ctx.stroke();
                } else {

                  const eye = 15 * player.scale; //when blocking draw this graphic
                  const len = mob[i].vertices.length - 1;
                  ctx.lineWidth = 1;
                  ctx.fillStyle = `rgba(110,150,220, ${0.2 + 0.4 * Math.random()})`
                  ctx.strokeStyle = "#000";
                  ctx.beginPath();
                  ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                  ctx.lineTo(mob[i].vertices[len].x, mob[i].vertices[len].y);
                  ctx.lineTo(mob[i].vertices[0].x, mob[i].vertices[0].y);
                  ctx.fill();
                  ctx.stroke();
                  for (let j = 0; j < len; j++) {
                    ctx.beginPath();
                    ctx.moveTo(m.fieldPosition.x + eye * Math.cos(m.fieldAngle), m.fieldPosition.y + eye * Math.sin(m.fieldAngle));
                    ctx.lineTo(mob[i].vertices[j].x, mob[i].vertices[j].y);
                    ctx.lineTo(mob[i].vertices[j + 1].x, mob[i].vertices[j + 1].y);
                    ctx.fill();
                    ctx.stroke();
                  }
                }
                m.bulletsToBlocks(mob[i])
                let coupleStun = ((m.coupling > 0) ? 60 * Math.pow(1.25, m.coupling / 16) : 0)
                if (tech.isStunField) {
                  mobs.statusStun(mob[i], tech.isStunField + coupleStun)
                } else if (m.coupling > 0) {
                  mobs.statusStun(mob[i], coupleStun)
                }
                //mob knock backs
                const massRoot = Math.sqrt(Math.max(1, mob[i].mass));
                Matter.Body.setVelocity(mob[i], {
                  x: player.velocity.x - (30 * unit.x) / massRoot,
                  y: player.velocity.y - (30 * unit.y) / massRoot
                });
                if (mob[i].isUnstable) {
                  if (m.fieldCDcycle < m.cycle + 10) m.fieldCDcycle = m.cycle + 6
                  mob[i].death();
                }
                if (!isFree) { //player knock backs
                  if (mob[i].isDropPowerUp && player.speed < 12) {
                    const massRootCap = Math.sqrt(Math.min(10, Math.max(0.2, mob[i].mass)));
                    Matter.Body.setVelocity(player, {
                      x: 0.9 * player.velocity.x + 0.6 * unit.x * massRootCap,
                      y: 0.9 * player.velocity.y + 0.6 * unit.y * massRootCap
                    });
                  }
                }
              }
            }
          }
        }
        m.hold = () => {
          const wave = Math.sin(m.cycle * 0.022);
          m.fieldRange = 360 + 12 + 10 * tech.isBigField
          m.fieldArc = 1 + 0.1 + 0.1 * tech.isBigField //run calculateFieldThreshold after setting fieldArc, used for powerUp grab and mobPush with lookingAt(mob)
          m.calculateFieldThreshold();
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (input.field) { //not hold but field button is pressed
            //float while field is on
            const angleReduction = 0.5 + 0.7 * (Math.PI / 2 - Math.min(Math.PI / 2, Math.abs(m.angle + Math.PI / 2)))
            // console.log(angleReduction)
            if (player.velocity.y > 1) {
              player.force.y -= angleReduction * (tech.isBigField ? 0.95 : 0.5) * player.mass * simulation.g;
              Matter.Body.setVelocity(player, {
                x: player.velocity.x,
                y: 0.98 * player.velocity.y
              }); //set velocity to cap, but keep the direction
            }

            // go invulnerable while field is active, but also drain energy
            // if (true && m.energy > 2 * m.fieldRegen && m.immuneCycle < m.cycle + tech.cyclicImmunity) {
            //     m.immuneCycle = m.cycle + 1; //player is immune to damage for 60 cycles
            //     m.energy -= 2 * m.fieldRegen
            //     if (m.energy < m.fieldRegen) m.fieldCDcycle = m.cycle + 90;
            // }

            if (m.energy > m.fieldRegen) {
              m.energy -= m.fieldRegen
              m.grabPowerUp();
              if (typeof m.lookForPickUp == 'function') { //lookForPickUp is changed in newer versions to lookForBlock
                m.lookForPickUp();
              } else {
                m.lookForBlock();
              }
            }
            m.fieldPosition = { x: m.pos.x, y: m.pos.y }
            m.fieldAngle = m.angle
            //draw field attached to player
            if (m.holdingTarget) {
              ctx.fillStyle = `rgba(210,150,220, ${0.1 + 0.03 * Math.random()})`
              ctx.strokeStyle = `rgba(210,110,10, ${0.15 + 0.05 * Math.random()})`
            } else {
              ctx.fillStyle = `rgba(210,150,220, ${0.1 + 0.2 * Math.random() - 0.1 * wave})`
              ctx.strokeStyle = `rgba(210,110,10, ${0.15 + 0.5 * Math.random()})`
            }
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, m.fieldRange, m.angle - Math.PI * m.fieldArc, m.angle + Math.PI * m.fieldArc, false);
            ctx.lineWidth = 10 - 1.5 * wave;
            ctx.stroke();
            const curve = 1 + 0.04 * wave
            const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
            let a = m.angle + aMag
            let cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
            let cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
            ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 30 * Math.cos(m.angle), m.pos.y + 30 * Math.sin(m.angle))
            a = m.angle - aMag
            cp1x = m.pos.x + curve * m.fieldRange * Math.cos(a)
            cp1y = m.pos.y + curve * m.fieldRange * Math.sin(a)
            ctx.quadraticCurveTo(cp1x, cp1y, m.pos.x + 1 * m.fieldRange * Math.cos(m.angle - Math.PI * m.fieldArc), m.pos.y + 1 * m.fieldRange * Math.sin(m.angle - Math.PI * m.fieldArc))
            ctx.fill();
            m.perfectPush();
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
            if (!input.field) { //&& tech.isFieldFree
              //draw field free of player
              ctx.fillStyle = `rgba(210,150,220, ${0.1 + 0.2 * Math.random() - 0.1 * wave})`
              ctx.strokeStyle = `rgba(210,110,10, ${0.15 + 0.5 * Math.random()})`
              ctx.beginPath();
              ctx.arc(m.fieldPosition.x, m.fieldPosition.y, m.fieldRange, m.fieldAngle - Math.PI * m.fieldArc, m.fieldAngle + Math.PI * m.fieldArc, false);
              ctx.lineWidth = 10 - 1.5 * wave;
              ctx.stroke();
              const curve = 0.8 + 0.06 * wave;
              const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
              let a = m.fieldAngle + aMag
              ctx.quadraticCurveTo(m.fieldPosition.x + curve * m.fieldRange * Math.cos(a), m.fieldPosition.y + curve * m.fieldRange * Math.sin(a), m.fieldPosition.x + 1 * m.fieldRange * Math.cos(m.fieldAngle - Math.PI * m.fieldArc), m.fieldPosition.y + 1 * m.fieldRange * Math.sin(m.fieldAngle - Math.PI * m.fieldArc))
              ctx.fill();
              m.perfectPush(true);

            }
          }
          // m.drawRegenEnergy()
          m.drawRegenEnergy("rgba(100,200,0,0.2)")
          if (tech.isPerfectBrake) { //cap mob speed around player
            const range = 200 + 140 * wave + 150 * m.energy
            for (let i = 0; i < mob.length; i++) {
              const distance = Vector.magnitude(Vector.sub(m.pos, mob[i].position))
              if (distance < range) {
                const cap = mob[i].isShielded ? 8 : 4
                if (mob[i].speed > cap && Vector.dot(mob[i].velocity, Vector.sub(m.pos, mob[i].position)) > 0) { // if velocity is directed towards player
                  Matter.Body.setVelocity(mob[i], Vector.mult(Vector.normalise(mob[i].velocity), cap)); //set velocity to cap, but keep the direction
                }
              }
            }
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, range, 0, 2 * Math.PI);
            ctx.fillStyle = "hsla(200,50%,61%,0.08)";
            ctx.fill();
          }
        }
      },
    },
    {
      name: "matter displacement",
      description: `use <strong class='color-f'>energy</strong> to <strong>teleport</strong> to mouse position
      				<br>use excess <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs
                    <br><strong>6</strong> <strong class='color-f'>energy</strong> per second
                    <em style ="float: right; font-family: monospace;font-size:1rem;color:#fff;">↓↓↑↑↓</em>`,
      keyLog: [null, null, null, null, null],
      teleportCDcycle: 0,
      effect: () => {
        m.fieldEvent = function (event) {
          m.fieldUpgrades[14].keyLog.shift() //remove first element
          m.fieldUpgrades[14].keyLog.push(event.code) //add new key to end
          const patternA = ["ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp", "ArrowDown"],
            patternB = [input.key.down, input.key.down, input.key.up, input.key.up, input.key.down,],
            scanResults = []
          const arraysEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
          const drain = 0.16, maxRange = 10000, scannerYrange = m.height * 10
          const scanner = Matter.Bodies.rectangle(m.pos.x, m.pos.y + m.height, m.width * 3 - 1, 10);
          if (m.energy > drain && arraysEqual(m.fieldUpgrades[14].keyLog, patternA) || arraysEqual(m.fieldUpgrades[14].keyLog, patternB)) {
            try {
              m.energy -= drain
              Composite.add(engine.world, scanner);
              Matter.Body.setPosition(scanner, {
                x: m.pos.x,
                y: m.pos.y + m.height
              })
              for (let i = 0, dist = maxRange / m.width; i < dist; i += 3) {
                Matter.Body.setPosition(scanner, {
                  x: scanner.position.x - m.width * 3,
                  y: scanner.position.y
                });
                //simulation.inGameConsole(scanner.position.y);
                if (
                  (Matter.Query.ray(map, scanner.position,
                    {
                      x: scanner.position.x,
                      y: scanner.position.y + scannerYrange
                    }, m.width * 1.5).length > 0 && Matter.Query.collides(scanner, map).length === 0) ||
                  (Matter.Query.ray(body, scanner.position,
                    {
                      x: scanner.position.x,
                      y: scanner.position.y + scannerYrange
                    }, m.width * 1.5).length > 0 && Matter.Query.collides(scanner, body).length === 0)
                ) {
                  scanResults.push(scanner.position.x)
                }
              }
              ///simulation.inGameConsole("Reset scanner to M's x position.");
              Matter.Body.setPosition(scanner, {
                x: m.pos.x,
                y: m.pos.y + m.height
              })
              for (let i = 0, dist = maxRange / m.width; i < dist; i += 3) {
                Matter.Body.setPosition(scanner, {
                  x: scanner.position.x + m.width * 3,
                  y: scanner.position.y
                });
                ///simulation.inGameConsole(scanner.position.y);
                if (
                  (Matter.Query.ray(map, scanner.position,
                    {
                      x: scanner.position.x,
                      y: scanner.position.y + scannerYrange
                    }, m.width * 1.5).length > 0 && Matter.Query.collides(scanner, map).length === 0) ||
                  (Matter.Query.ray(body, scanner.position,
                    {
                      x: scanner.position.x,
                      y: scanner.position.y + scannerYrange
                    }, m.width * 1.5).length > 0 && Matter.Query.collides(scanner, body).length === 0)
                ) {
                  scanResults.push(scanner.position.x)
                }
              }
              Composite.remove(engine.world, scanner)
              if (scanResults.length > 0) {
                let idx = Math.floor(Math.random() * scanResults.length), h = scanResults[idx]
                simulation.translatePlayerAndCamera({ x: h - 150, y: m.pos.y - 30 }) //too jerky 
                //Matter.Body.setPosition(player, { x: m.pos.x, y: h - 90 });
                requestAnimationFrame(() => {
                  Matter.Body.setVelocity(player, { x: 0, y: 0 });
                });
              } else {
                simulation.translatePlayerAndCamera({ x: m.pos.x - 20, y: player.position.y }) //too jerky 
                simulation.inGameConsole(`Failed to teleport.`)
              }
            } catch (err) {
              simulation.inGameConsole(`<strong style='color:red'>ERROR:</strong> Script Error. <u>${err}</u>`)
            }
          }
        }
        window.addEventListener("keydown", m.fieldEvent);

        m.fieldMeterColor = "#ff0"
        m.eyeFillColor = m.fieldMeterColor
        m.hold = function () {
          if (m.isHolding) {
            m.drawHold(m.holdingTarget);
            m.holding();
            m.throwBlock();
          } else if (m.crouch && input.field && (m.energy > 0.25) && ((this.teleportCDcycle || 0) < m.cycle)) {
            m.energy -= 0.25
            m.resetHistory();
            Matter.Body.setPosition(player, simulation.mouseInGame);
            Matter.Body.setVelocity(player, { x: 0, y: 0 });
            this.teleportCDcycle = m.cycle + 15;
            if (tech.isSounds) {
              audioPlayer.requestSound('Teleport');
            }
          } else if (input.field && (m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
            if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
            m.grabPowerUp();
            if (typeof m.lookForPickUp == 'function') { //lookForPickUp is changed in newer versions to lookForBlock
              m.lookForPickUp();
            } else {
              m.lookForBlock();
            }
            m.drawField();
            m.pushMobsFacing();
          } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
            m.pickUp();
          } else {
            m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
          }
          m.drawRegenEnergy()
        }
      }
    },
  ],
  //************************************************************************************
  //************************************************************************************
  //*************************************  SHIP  ***************************************
  //************************************************************************************
  //************************************************************************************
  isShipMode: false,
  shipMode(thrust = 0.03, drag = 0.99, torque = 1.15, rotationDrag = 0.92) { //  m.shipMode() //thrust = 0.03, drag = 0.99, torque = 1.15, rotationDrag = 0.92
    if (!m.isShipMode) {
      //if wires remove them
      for (let i = 0; i < mob.length; i++) {
        if (!mob[i].freeOfWires) mob[i].freeOfWires = true
      }
      m.isShipMode = true
      // simulation.isCheating = true
      const points = [{
        x: 29.979168754143455,
        y: 4.748337243898336
      },
      {
        x: 27.04503734408824,
        y: 13.7801138209198
      },
      {
        x: 21.462582474874278,
        y: 21.462582475257523
      },
      {
        x: 13.780113820536943,
        y: 27.045037344471485
      },
      {
        x: 4.74833724351507,
        y: 29.979168754526473
      },
      {
        x: -4.748337245049098,
        y: 29.979168754526473
      },
      {
        x: -13.780113822071026,
        y: 27.045037344471485
      },
      {
        x: -21.46258247640829,
        y: 21.462582475257523
      },
      {
        x: -27.045037345621797,
        y: 13.7801138209198
      },
      {
        x: -29.979168755677012,
        y: 4.748337243898336
      },
      {
        x: -29.979168755677012,
        y: -4.7483372446656045
      },
      {
        x: -27.045037345621797,
        y: -13.78011382168726
      },
      {
        x: -21.46258247640829,
        y: -21.462582476024817
      },
      {
        x: -13.780113822071026,
        y: -27.045037345239006
      },
      {
        x: -4.748337245049098,
        y: -29.97916875529422
      },
      {
        x: 4.74833724351507,
        y: -29.97916875529422
      },
      {
        x: 13.780113820536943,
        y: -27.045037345239006
      },
      {
        x: 21.462582474874278,
        y: -21.462582476024817
      },
      {
        x: 27.04503734408824,
        y: -13.78011382168726
      },
      {
        x: 29.979168754143455,
        y: -4.7483372446656045
      }
      ]
      // 
      Matter.Body.setVertices(player, Matter.Vertices.create(points, player))
      player.parts.pop()
      player.parts.pop()
      player.parts.pop()
      player.parts.pop()
      // Matter.Body.setDensity(player, 0.01); //extra dense //normal is 0.001 //makes effective life much larger
      m.defaultMass = 30
      Matter.Body.setMass(player, m.defaultMass);
      player.friction = 0.01
      player.restitution = 0.2
      // player.frictionStatic = 0.1
      // Matter.Body.setInertia(player, Infinity); //disable rotation

      // const circle = Bodies.polygon(player.position.x, player.position.x, 30, 30)
      // player.parts[0] = circle
      // Matter.Body.setVertices(player.parts[0], Matter.Vertices.create(points, player.parts[0]))
      m.spin = 0
      // m.groundControl = () => {}         //disable entering ground
      m.onGround = false
      m.lastOnGroundCycle = 0
      // playerOnGroundCheck = () => {}
      m.airControl = () => { //tank controls
        player.force.y -= (simulation.isChatMenuOpen ? 0 : player.mass * simulation.g); //undo gravity
        Matter.Body.setVelocity(player, {
          x: (simulation.isChatMenuOpen ? 0 : drag * player.velocity.x),
          y: (simulation.isChatMenuOpen ? 0 : drag * player.velocity.y)
        });
        if (input.up) { //forward thrust
          player.force.x += (simulation.isChatMenuOpen ? 0 : thrust * Math.cos(m.angle) * m.jumpForce)
          player.force.y += (simulation.isChatMenuOpen ? 0 : thrust * Math.sin(m.angle) * m.jumpForce)
        } else if (input.down) {
          player.force.x -= (simulation.isChatMenuOpen ? 0 : 0.6 * thrust * Math.cos(m.angle))
          player.force.y -= (simulation.isChatMenuOpen ? 0 : 0.6 * thrust * Math.sin(m.angle))
        }
        //rotation
        Matter.Body.setAngularVelocity(player, player.angularVelocity * rotationDrag)
        if (input.right) {
          player.torque += torque
        } else if (input.left) {
          player.torque -= torque
        }
        m.angle += m.spin
        m.angle = player.angle
      }

      // level.exit.drawAndCheck = () => { //fix this
      //     if (
      //         player.position.x > level.exit.x &&
      //         player.position.x < level.exit.x + 100 &&
      //         player.position.y > level.exit.y - 150 &&
      //         player.position.y < level.exit.y + 40
      //     ) {
      //         level.nextLevel()
      //     }
      // }
      m.move = () => {
        m.pos.x = player.position.x;
        m.pos.y = player.position.y;
        m.Vx = (simulation.isChatMenuOpen ? 0 : player.velocity.x);
        m.Vy = (simulation.isChatMenuOpen ? 0 : player.velocity.y);

        //tracks the last 10s of player information
        m.history.splice(m.cycle % 600, 1, {
          position: {
            x: player.position.x,
            y: player.position.y,
          },
          velocity: {
            x: player.velocity.x,
            y: player.velocity.y
          },
          yOff: m.yOff,
          angle: m.angle,
          health: m.health,
          energy: m.energy,
          activeGun: b.activeGun
        });
      }

      m.look = () => { //disable mouse aiming
        const scale = 0.8;
        m.transSmoothX = canvas.width2 - m.pos.x - (simulation.mouse.x - canvas.width2) * scale;
        m.transSmoothY = canvas.height2 - m.pos.y - (simulation.mouse.y - canvas.height2) * scale;

        m.transX += (m.transSmoothX - m.transX) * 0.07;
        m.transY += (m.transSmoothY - m.transY) * 0.07;
      }

      simulation.camera = () => {
        const dx = simulation.mouse.x / window.innerWidth - 0.5 //x distance from mouse to window center scaled by window width
        const dy = simulation.mouse.y / window.innerHeight - 0.5 //y distance from mouse to window center scaled by window height
        const d = Math.max(dx * dx, dy * dy)
        simulation.edgeZoomOutSmooth = (1 + 4 * d * d) * 0.04 + simulation.edgeZoomOutSmooth * 0.96

        ctx.save();
        ctx.translate(canvas.width2, canvas.height2); //center
        ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth); //zoom in once centered
        ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY); //translate
        //calculate in game mouse position by undoing the zoom and translations
        simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
        simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
      }

      m.draw = () => { //just draw the circle
        ctx.save();
        ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : m.cycle % 3 ? 0.1 : 0.65 + 0.1 * Math.random()
        ctx.translate(player.position.x, player.position.y);
        ctx.rotate(player.angle);

        //thrust
        if (input.up) {
          var grd2 = ctx.createLinearGradient(0, 0, -150, 0);
          // grd2.addColorStop(0, 'rgba(255, 255, 155, 0.8)');
          // grd2.addColorStop(1, 'rgba(255, 200, 0, 0.1)');
          grd2.addColorStop(0, 'rgba(150, 200, 255, 0.7)');
          grd2.addColorStop(1, 'rgba(150, 200, 255, 0)');
          ctx.fillStyle = grd2;
          ctx.beginPath();
          ctx.moveTo(-18, -25);
          //10 * (Math.random() - 0.5), 10 * (Math.random() - 0.5)
          ctx.lineTo(-18, 25);
          ctx.lineTo(-50 - 100 * Math.random(), 0);
          ctx.fill();
        } else if (input.down) {
          var grd2 = ctx.createLinearGradient(0, 0, 80, 0);
          grd2.addColorStop(0, 'rgba(150, 200, 255, 0.7)');
          grd2.addColorStop(1, 'rgba(150, 200, 255, 0)');
          ctx.fillStyle = grd2;
          ctx.beginPath();
          ctx.moveTo(20, -16);
          //10 * (Math.random() - 0.5), 10 * (Math.random() - 0.5)
          ctx.lineTo(20, 16);
          ctx.lineTo(35 + 43 * Math.random(), 0);
          ctx.fill();
        }

        //body
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

      //fix collisions
      collisionChecks = function (event) {
        const pairs = event.pairs;
        for (let i = 0, j = pairs.length; i != j; i++) {
          //mob + (player,bullet,body) collisions
          for (let k = 0; k < mob.length; k++) {
            if (mob[k].alive && m.alive) {
              if (pairs[i].bodyA === mob[k]) {
                collideMob(pairs[i].bodyB);
                break;
              } else if (pairs[i].bodyB === mob[k]) {
                collideMob(pairs[i].bodyA);
                break;
              }

              function collideMob(obj) {
                //player + mob collision
                if (
                  m.immuneCycle < m.cycle + m.collisionImmuneCycles &&
                  // (obj === playerBody || obj === playerHead) &&
                  (obj === player) &&
                  !mob[k].isSlowed && !mob[k].isStunned
                ) {
                  mob[k].foundPlayer();
                  let dmg = Math.min(Math.max(0.025 * Math.sqrt(mob[k].mass), 0.05), 0.3) * mob[k].damageScale();
                  if (tech.isRewindAvoidDeath && (m.energy + 0.05) > Math.min(0.95, m.maxEnergy) && dmg > 0.01) { //CPT reversal runs in m.damage, but it stops the rest of the collision code here too
                    m.takeDamage(dmg);
                    return
                  }
                  m.takeDamage(dmg);
                  if (tech.isPiezo) m.energy += 20.48 * level.isReducedRegen;
                  if (tech.isStimulatedEmission) powerUps.ejectTech()
                  if (mob[k].onHit) mob[k].onHit();
                  if (m.immuneCycle < m.cycle + m.collisionImmuneCycles) m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                  //extra kick between player and mob              //this section would be better with forces but they don't work...
                  let angle = Math.atan2(player.position.y - mob[k].position.y, player.position.x - mob[k].position.x);
                  Matter.Body.setVelocity(player, {
                    x: player.velocity.x + 8 * Math.cos(angle),
                    y: player.velocity.y + 8 * Math.sin(angle)
                  });
                  Matter.Body.setVelocity(mob[k], {
                    x: mob[k].velocity.x - 8 * Math.cos(angle),
                    y: mob[k].velocity.y - 8 * Math.sin(angle)
                  });

                  if (tech.isAnnihilation && !mob[k].shield && !mob[k].isShielded && !mob[k].isBoss && mob[k].isDropPowerUp && m.energy > 0.08) {
                    m.energy -= 0.08 //* Math.max(m.maxEnergy, m.energy) //0.33 * m.energy
                    m.immuneCycle = 0; //player doesn't go immune to collision damage
                    mob[k].death();
                    simulation.drawList.push({ //add dmg to draw queue
                      x: pairs[i].activeContacts[0].vertex.x,
                      y: pairs[i].activeContacts[0].vertex.y,
                      radius: dmg * 1000,
                      color: "rgba(255,0,255,0.2)",
                      time: simulation.drawTime
                    });
                  } else {
                    simulation.drawList.push({ //add dmg to draw queue
                      x: pairs[i].activeContacts[0].vertex.x,
                      y: pairs[i].activeContacts[0].vertex.y,
                      radius: dmg * 500,
                      color: simulation.mobDmgColor,
                      time: simulation.drawTime
                    });
                  }
                  return;
                  // }
                }
                //mob + bullet collisions
                if (obj.classType === "bullet" && obj.speed > obj.minDmgSpeed) {
                  obj.beforeDmg(mob[k]); //some bullets do actions when they hits things, like despawn //forces don't seem to work here
                  let dmg = (obj.dmg + 0.15 * obj.mass * Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity)))
                  if (tech.isCrit && mob[k].isStunned) dmg *= 4
                  mob[k].damage(dmg);
                  if (mob[k].alive) mob[k].foundPlayer();
                  if (mob[k].damageReduction) {
                    simulation.drawList.push({ //add dmg to draw queue
                      x: pairs[i].activeContacts[0].vertex.x,
                      y: pairs[i].activeContacts[0].vertex.y,
                      radius: Math.log(dmg + 1.1) * 40 * mob[k].damageReduction + 3,
                      color: simulation.playerDmgColor,
                      time: simulation.drawTime
                    });
                  }
                  return;
                }
                //mob + body collisions
                if (obj.classType === "body" && obj.speed > 6) {
                  const v = Vector.magnitude(Vector.sub(mob[k].velocity, obj.velocity));
                  if (v > 9) {
                    let dmg = tech.blockDamage * v * obj.mass * (tech.isMobBlockFling ? 2 : 1);
                    if (mob[k].isShielded) dmg *= 0.7
                    mob[k].damage(dmg, true);
                    if (tech.isBlockPowerUps && !mob[k].alive && mob[k].isDropPowerUp && Math.random() < 0.5) {
                      let type = "ammo"
                      if (Math.random() < 0.4) {
                        type = "heal"
                      } else if (Math.random() < 0.4 && !tech.isSuperDeterminism) {
                        type = "research"
                      }
                      powerUps.spawn(mob[k].position.x, mob[k].position.y, type);
                      // for (let i = 0, len = Math.ceil(2 * Math.random()); i < len; i++) {}
                    }

                    const stunTime = dmg / Math.sqrt(obj.mass)
                    if (stunTime > 0.5) mobs.statusStun(mob[k], 30 + 60 * Math.sqrt(stunTime))
                    if (mob[k].alive && mob[k].distanceToPlayer2() < 1000000 && !m.isCloak) mob[k].foundPlayer();
                    if (tech.fragments && obj.speed > 10 && !obj.hasFragmented) {
                      obj.hasFragmented = true;
                      b.targetedNail(obj.position, tech.fragments * 4)
                    }
                    if (mob[k].damageReduction) {
                      simulation.drawList.push({
                        x: pairs[i].activeContacts[0].vertex.x,
                        y: pairs[i].activeContacts[0].vertex.y,
                        radius: Math.log(dmg + 1.1) * 40 * mob[k].damageReduction + 3,
                        color: simulation.playerDmgColor,
                        time: simulation.drawTime
                      });
                    }
                    return;
                  }
                }
              }
            }
          }
        }
      }
    }
  },
};