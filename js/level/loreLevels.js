setTimeout(() => {
  fileLoads.isLoreLevelsJS = true; //for file handling in fileTester.js
}, 10);

const loreLevels = {
  template() {
    // level.announceMobTypes()
    simulation.enableConstructMode()
    level.setPosToSpawn(0, -50); //normal spawn
    level.exit.x = 1500;
    level.exit.y = -1875;
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

    spawn.mapRect(-100, 0, 1000, 100);
    powerUps.addResearchToLevel() //needs to run after mobs are spawned
  },
  testing() {
    // simulation.enableConstructMode() //tech.giveTech('motion sickness')  //used to build maps in testing mode

    document.body.style.backgroundColor = "#ddd";
    // color.map = "#444" //custom map color
    level.defaultZoom = 1500
    simulation.zoomTransition(level.defaultZoom)

    const mover = level.mover(2800, -300, 1000, 25); //x,y,width.height,VxGoal,force

    const train = level.transport(2900, -500, 500, 25, 8); //x,y,width.height,VxGoal,force
    spawn.bodyRect(500, -500, 50, 50);
    const button = level.button(2535, -200)
    // spawn.bodyRect(250, -450, 50, 50); //block on button

    level.custom = () => {

      //oscillate back and forth
      if (train.position.x < 2000) {
        train.changeDirection(true) //go right
      } else if (train.position.x > 4000) {
        train.changeDirection(false) //go left
      }
      if (!button.isUp) train.move();

      mover.push();
      ctx.fillStyle = "#d4d4d4"
      ctx.fillRect(2500, -475, 200, 300)

      // ctx.fillStyle = "#ddd"
      // ctx.fillRect(-150, -1000, 6875, 1000);
      ctx.fillStyle = "rgba(0,255,255,0.1)";
      ctx.fillRect(6400, -550, 300, 350);
      level.exit.drawAndCheck();
      level.enter.draw();
    };
    level.customTopLayer = () => {
      train.draw()
      mover.draw();
      button.query();
      button.draw();
      ctx.fillStyle = "rgba(0,0,0,0.1)"
      ctx.fillRect(-150, -650, 900, 250)
    };
    level.setPosToSpawn(0, -450); //normal spawn
    spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
    level.exit.x = 6500;
    level.exit.y = -230;

    spawn.mapRect(-950, 0, 8200, 800); //ground
    spawn.mapRect(-950, -1200, 800, 1400); //left wall
    spawn.mapRect(-950, -1800, 8200, 800); //roof
    spawn.mapRect(-250, -400, 1000, 600); // shelf
    spawn.mapRect(-250, -1200, 1000, 550); // shelf roof
    // for (let i = 0; i < 10; ++i) powerUps.spawn(550, -800, "ammo", false);

    function blockDoor(x, y, blockSize = 58) {
      spawn.mapRect(x, y - 290, 40, 60); // door lip
      spawn.mapRect(x, y, 40, 50); // door lip
      for (let i = 0; i < 4; ++i) spawn.bodyRect(x + 5, y - 260 + i * blockSize, 30, blockSize);
    }

    spawn.mapRect(2500, -1200, 200, 750); //right wall
    spawn.mapRect(2500, -200, 200, 300); //right wall
    spawn.mapRect(4500, -1200, 200, 650); //right wall
    blockDoor(4585, -310)
    spawn.mapRect(4500, -300, 200, 400); //right wall
    spawn.mapRect(6400, -1200, 400, 750); //right wall
    spawn.mapRect(6400, -200, 400, 300); //right wall
    spawn.mapRect(6700, -1800, 800, 2600); //right wall
    spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 100); //exit bump
    //place to hide
    spawn.mapRect(4650, -300, 1150, 50);
    spawn.mapRect(5750, -300, 50, 200);
    spawn.mapRect(5575, -100, 50, 125);
    spawn.mapRect(5300, -275, 50, 175);
    spawn.mapRect(5050, -100, 50, 150);
    spawn.mapRect(4850, -275, 50, 175);
    spawn.mapRect(-950, -3250, 850, 1750);
    //roof
    spawn.mapRect(-175, -2975, 300, 1425);
    spawn.mapRect(75, -2650, 325, 1150);
    spawn.mapRect(375, -2225, 250, 650);
    spawn.mapRect(4075, -2125, 700, 800);
    spawn.mapRect(4450, -2950, 675, 1550);
    spawn.mapRect(4875, -3625, 725, 2225);
    spawn.mapRect(5525, -4350, 1725, 2925);
    spawn.mapRect(7200, -5125, 300, 3900);
  },
  unknown() {
    level.levels.pop(); //remove lore level from rotation
    // level.onLevel--
    // console.log(level.onLevel, level.levels)
    //start a conversation based on the number of conversations seen
    if (localSettings.loreCount > lore.conversation.length - 1) localSettings.loreCount = lore.conversation.length - 1; //repeat final conversation if lore count is too high
    if (!simulation.isCheating && localSettings.loreCount < lore.conversation.length) {
      lore.testSpeechAPI() //see if speech is working
      lore.chapter = localSettings.loreCount //set the chapter to listen to to be the lore level (you can't use the lore level because it changes during conversations)
      lore.sentence = 0 //what part of the conversation to start on
      lore.conversation[lore.chapter][lore.sentence]()
      localSettings.loreCount++ //hear the next conversation next time you win
      if (localSettings.isAllowed) localStorage.setItem("localSettings", JSON.stringify(localSettings)); //update local storage
    }
    // const hazardSlime = level.hazard(-1800, 150, 3600, 650, 0.004, "hsla(160, 100%, 35%,0.75)")
    level.isHazardRise = false //this is set to true to make the slime rise up
    const hazardSlime = level.hazard(-1800, -800, 3600, 1600, 0.004)
    hazardSlime.height -= 950
    hazardSlime.min.y += 950
    hazardSlime.max.y = hazardSlime.min.y + hazardSlime.height
    const circle = {
      x: 0,
      y: -500,
      radius: 50
    }
    level.custom = () => {
      //draw wide line
      ctx.beginPath();
      ctx.moveTo(circle.x, -800)
      ctx.lineTo(circle.x, circle.y)
      ctx.lineWidth = 40;
      ctx.strokeStyle = lore.talkingColor //"#d5dddd" //"#bcc";
      ctx.globalAlpha = 0.03;
      ctx.stroke();
      ctx.globalAlpha = 1;
      //support pillar
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(-25, 0, 50, 1000);

      //draw circles
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#bcc"
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#abb";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius / 8, 0, 2 * Math.PI);
      ctx.fillStyle = lore.talkingColor //"#dff"
      ctx.fill();

      // level.enter.draw();
    };
    let sway = {
      x: 0,
      y: 0
    }
    let phase = -Math.PI / 2
    level.customTopLayer = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(-1950, -950, 3900, 1900);
      //draw center circle lines
      ctx.beginPath();
      const step = Math.PI / 20
      const horizontalStep = 85
      if (simulation.isCheating) phase += 0.3 * Math.random() * Math.random() //(m.pos.x - circle.x) * 0.0005 //0.05 * Math.sin(simulation.cycle * 0.030)
      // const sway = 5 * Math.cos(simulation.cycle * 0.007)
      sway.x = sway.x * 0.995 + 0.005 * (m.pos.x - circle.x) * 0.05 //+ 0.04 * Math.cos(simulation.cycle * 0.01)
      sway.y = 2.5 * Math.sin(simulation.cycle * 0.015)
      for (let i = -19.5; i < 20; i++) {
        const where = {
          x: circle.x + circle.radius * Math.cos(i * step + phase),
          y: circle.y + circle.radius * Math.sin(i * step + phase)
        }
        ctx.moveTo(where.x, where.y);
        ctx.bezierCurveTo(sway.x * Math.abs(i) + where.x, where.y + 25 * Math.abs(i) + 60 + sway.y * Math.sqrt(Math.abs(i)),
          sway.x * Math.abs(i) + where.x + horizontalStep * i, where.y + 25 * Math.abs(i) + 60 + sway.y * Math.sqrt(Math.abs(i)),
          horizontalStep * i, -800);
      }
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#899";
      ctx.stroke();
      hazardSlime.query();
      if (level.isHazardRise) hazardSlime.level(true)
      //draw wires
      // ctx.beginPath();
      // ctx.moveTo(-500, -800);
      // ctx.quadraticCurveTo(-800, -100, -1800, -375);
      // ctx.moveTo(-600, -800);
      // ctx.quadraticCurveTo(-800, -200, -1800, -325);
      // ctx.lineWidth = 1;
      // ctx.strokeStyle = "#9aa";
      // ctx.stroke();
    };
    level.setPosToSpawn(0, -50); //normal spawn
    spawn.mapRect(level.enter.x, level.enter.y + 25, 100, 10);
    level.exit.x = 0;
    level.exit.y = 40000;
    level.defaultZoom = 1000
    simulation.zoomTransition(level.defaultZoom)
    // document.body.style.backgroundColor = "#aaa";
    document.body.style.backgroundColor = "#ddd";
    color.map = "#586363" //808f8f"

    spawn.mapRect(-3000, 800, 5000, 1200); //bottom
    spawn.mapRect(-2000, -2000, 5000, 1200); //ceiling
    spawn.mapRect(-3000, -2000, 1200, 3400); //left
    spawn.mapRect(1800, -1400, 1200, 3400); //right

    spawn.mapRect(-500, 0, 1000, 50); //center platform
    spawn.mapRect(-500, -25, 25, 50); //edge shelf
    spawn.mapRect(475, -25, 25, 50); //edge shelf
  }
}