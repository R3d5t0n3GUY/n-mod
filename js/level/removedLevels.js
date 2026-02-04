setTimeout(() => {
    fileLoads.isRemovedLevelsJS = true; //for file handling in fileTester.js
}, 10);

const removedLevels = {
    run() {
        simulation.inGameConsole(`<strong>run</strong> by <span class='color-var'>iNoobBoi</span>`);
        addPartToMap = (len) => { //adds new map elements to the level while the level is already running  //don't forget to run simulation.draw.setPaths() after you all the the elements so they show up visually
            map[len].collisionFilter.category = cat.map;
            map[len].collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            Matter.Body.setStatic(map[len], true); //make static
            Composite.add(engine.world, map[len]);
        }

        anotherBoss = (x, y) => {
            if (tech.isDuplicateMobs && Math.random() < tech.duplicationChance()) {
                spawn.randomLevelBoss(x, y, ["historyBoss"]);
            }
        }

        const climbPad = level.boost(8200, -200, 500);
        var climbTime = false;
        var climbGroup = 0;
        var initialSpawn = false;
        var endTime = false;

        let runMobList = [
            "hopper",
            "slasher",
            "striker",
            "stabber",
            "springer",
            "pulsar",
            "sneaker",
            "spinner",
            "grower",
            "focuser",
            "spawner",
        ];

        let removeList = [];

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();

            climbPad.query();

            if (m.pos.x > 8000 && climbTime === false) {
                spawn.mapRect(7800, -900, 200, 900);
                addPartToMap(map.length - 1);
                simulation.draw.setPaths();

                simulation.inGameConsole(`<strong>UNKNOWN</strong>: "Well done. Now climb."`, 600);
                simulation.inGameConsole(`<strong>UNKNOWN</strong>: "I left a gift at the top."`, 600);

                climbTime = true;
            } //toggles on a mapRect when player passes a certain area

            if (m.pos.x > 9000 && endTime === false) {
                simulation.inGameConsole("<strong>UNKNOWN</strong>: \"Good luck. I hope you get out of here.\"", 600);
                endTime = true;
            }

            for (i in mob) {
                try {
                    mob[i].damageReduction = 0;
                    Matter.Body.setVelocity(mob[i], {
                        x: mob[i].velocity.x * 0.97,
                        y: mob[i].velocity.y * 0.97
                    });
                } catch (e) {}
            } //makes everything slow and immune
        };

        level.customTopLayer = () => {
            ctx.fillStyle = "#888";

            if (climbGroup === 0) {
                //toggle on fillRect: 1
                ctx.fillRect(8000, -900, 300, 100);
                ctx.fillRect(8500, -1800, 300, 100);
                ctx.fillRect(8300, -2700, 300, 100);
                ctx.fillRect(8000, -3600, 300, 100);
                ctx.fillRect(8200, -4500, 300, 100);
            } else if (climbGroup === 1) {
                //toggle on fillRect: 2
                ctx.fillRect(8300, -1200, 300, 100);
                ctx.fillRect(8500, -2100, 300, 100);
                ctx.fillRect(8100, -3000, 300, 100);
                ctx.fillRect(8000, -3900, 300, 100);
                ctx.fillRect(8200, -4800, 300, 100);
            } else if (climbGroup === 2) {
                //toggle on fillRect: 0
                ctx.fillRect(8500, -600, 300, 100);
                ctx.fillRect(8100, -1500, 300, 100);
                ctx.fillRect(8000, -2400, 300, 100);
                ctx.fillRect(8500, -3300, 300, 100);
                ctx.fillRect(8500, -4200, 300, 100);
            }

            if ((simulation.cycle % 120) === 0) {
                for (var i = 0; i < map.length; i++) {
                    if (map[i].isRemove) {
                        Matter.Composite.remove(engine.world, map[i]);
                        map.splice(i, 1);
                    }
                }

                if (climbGroup === 0) {
                    //toggle on platforms: 0
                    spawn.mapRect(8000, -900, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8500, -1800, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8300, -2700, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8000, -3600, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8200, -4500, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;

                    climbGroup = 1;
                } else if (climbGroup === 1) {
                    //toggle on platforms: 1
                    spawn.mapRect(8300, -1200, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8500, -2100, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8100, -3000, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8000, -3900, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8200, -4800, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;

                    climbGroup = 2;
                } else if (climbGroup === 2) {
                    //toggle on platforms: 2
                    spawn.mapRect(8500, -600, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8100, -1500, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8000, -2400, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8500, -3300, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;
                    spawn.mapRect(8500, -4200, 300, 100);
                    addPartToMap(map.length - 1);
                    map[map.length - 1].isRemove = true;

                    climbGroup = 0;
                }

                simulation.draw.setPaths(); //update map graphics
            } //every 120 cycles, first deletes previous group, then cycles through one of 3 toggle groups
        };

        if (!initialSpawn) {
            level.defaultZoom = 1300 //was 800 I changed this
            simulation.zoomTransition(level.defaultZoom)
            document.body.style.backgroundColor = "#dcdcde";
            //Level
            level.setPosToSpawn(-100, -1450);
            spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);

            level.exit.x = 9300;
            level.exit.y = -5130;
            spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);

            //Map
            spawn.mapRect(-1400, -2200, 1700, 200);
            spawn.mapRect(100, -2200, 200, 1000);
            spawn.mapRect(-600, -1400, 8600, 200);
            spawn.mapRect(-1400, -2200, 200, 1000);
            spawn.mapRect(-2800, -1400, 1600, 200);
            spawn.mapRect(-2800, -1400, 200, 1400);
            spawn.mapRect(-2800, -200, 11800, 200);
            spawn.mapRect(-900, -600, 600, 600);
            spawn.mapRect(200, -800, 500, 100);
            spawn.mapRect(1300, -1400, 200, 900);
            spawn.mapRect(1300, -600, 500, 100);
            spawn.mapRect(2300, -800, 200, 200);
            spawn.mapRect(2900, -400, 100, 400);
            spawn.mapRect(3200, -600, 100, 600);
            spawn.mapRect(3500, -800, 100, 800);
            spawn.mapRect(4400, -900, 500, 100);
            spawn.mapRect(4400, -600, 500, 100);
            spawn.mapRect(4800, -900, 100, 400);
            spawn.mapRect(5300, -550, 600, 550);
            spawn.mapRect(5600, -900, 300, 800);
            spawn.mapRect(6300, -300, 1100, 300);
            spawn.mapRect(6600, -400, 500, 200);
            spawn.mapRect(6600, -800, 500, 100);
            spawn.mapRect(7000, -1400, 100, 700);
            spawn.mapRect(7800, -5900, 200, 5100);
            spawn.mapRect(7800, -5900, 1900, 200);
            spawn.mapRect(9500, -5900, 200, 1000);
            spawn.mapRect(8800, -5100, 900, 200);
            spawn.mapRect(8800, -5100, 200, 5100);

            //Text
            spawn.mapRect(400, -1600, 100, 10);
            spawn.mapRect(400, -1600, 10, 100);
            spawn.mapRect(490, -1600, 10, 40);
            spawn.mapRect(400, -1570, 100, 10);
            spawn.mapRect(400, -1540, 100, 10);
            spawn.mapRect(490, -1540, 10, 40);

            spawn.mapRect(600, -1600, 10, 100);
            spawn.mapRect(600, -1510, 100, 10);
            spawn.mapRect(690, -1600, 10, 100);

            spawn.mapRect(800, -1600, 100, 10);
            spawn.mapRect(800, -1600, 10, 100);
            spawn.mapRect(890, -1600, 10, 100);

            spawn.mapRect(0, 0, 1, 1); //dont ask why i have these
            spawn.mapRect(1, 0, 1, 1); //dont ask why i have these
            spawn.mapRect(0, 1, 1, 1); //dont ask why i have these
            spawn.mapRect(1, 1, 1, 1); //dont ask why i have these
            spawn.mapRect(-1, 0, 1, 1); //dont ask why i have these
            spawn.mapRect(0, -1, 1, 1); //dont ask why i have these
            spawn.mapRect(-1, -1, 1, 1); //dont ask why i have these
            spawn.mapRect(1, -1, 1, 1); //dont ask why i have these
            spawn.mapRect(-1, 1, 1, 1); //dont ask why i have these

            //Mob Spawning
            setTimeout(() => {
                simulation.inGameConsole("<strong>UNKNOWN</strong>: \"You cannot kill them.\"", 600);
            }, 2000);

            setTimeout(() => {
                simulation.inGameConsole("<strong>UNKNOWN</strong>: \"But I have slowed them down for you.\"", 600);
            }, 6000);


            spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](200, -400);
            spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](1800, -1000);
            spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](3200, -1000);
            spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](6200, -400);

            if (simulation.difficulty > 10) {
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](1000, -400);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](2400, -400);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](4000, -400);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](6600, -1000);

                setTimeout(() => {
                    simulation.inGameConsole("<strong>UNKNOWN</strong>: \"Run.\"", 600);
                }, 10000);
            } //some of the mobs
            if (simulation.difficulty > 20) {
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](1000, -1000);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](3100, -300);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](4200, -1000);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](7400, -800);

                setTimeout(() => {
                    simulation.inGameConsole("<strong>UNKNOWN</strong>: \"RUN!\"", 600);
                }, 11000);
            } //most of the mobs
            if (simulation.difficulty > 30) {
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](200, -1000);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](3400, -300);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](5200, -800);
                spawn[runMobList[Math.floor(Math.random() * runMobList.length)]](7500, -300);

                setTimeout(() => {
                    simulation.inGameConsole("<strong>UNKNOWN</strong>: \"GET OUT OF HERE.\"", 600);
                }, 12000);
            } //all the mobs

            //Boss Spawning 
            if (simulation.difficulty > 5) {
                spawn.randomLevelBoss(-2200, -700, ["powerUpBossBaby", "blockBoss", "revolutionBoss"]);

                setTimeout(() => {
                    simulation.inGameConsole("<strong>UNKNOWN</strong>: \"They are coming for you.\"", 600);
                }, 14000);
            }
            anotherBoss(-1800, -700); //custom second boss spawn

            //Blocks
            spawn.bodyRect(1300, -500, 200, 100);
            spawn.bodyRect(1400, -500, 200, 100);
            spawn.bodyRect(1500, -500, 200, 100);

            spawn.bodyRect(5700, -1200, 100, 100);
            spawn.bodyRect(5700, -1100, 100, 100);
            spawn.bodyRect(5700, -1000, 100, 100);

            spawn.bodyRect(6800, -700, 100, 100);
            spawn.bodyRect(6800, -600, 100, 100);
            spawn.bodyRect(6800, -500, 100, 100);

            spawn.debris(4400, -300, 500, 16);
            spawn.debris(3300, -600, 200, 6);
            spawn.debris(3000, -500, 20, 6);
            spawn.debris(2300, -300, 200, 6);
            spawn.debris(200, -300, 500, 16);

            //Powerups
            if (simulation.difficulty > 10) {
                powerUps.spawn(1600, -700, "tech");
            }
            powerUps.spawnRandomPowerUp(1700, -700);

            // if (simulation.difficulty > 20) {
            //     powerUps.spawn(4600, -700, "tech");
            // }
            powerUps.spawnRandomPowerUp(4700, -700);

            // if (simulation.difficulty > 30) {
            //     powerUps.spawn(6800, -1000, "tech");
            // }
            powerUps.spawnRandomPowerUp(6900, -1000);

            powerUps.spawn(9200, -5400, "tech");

            if (simulation.difficulty > 10) {
                powerUps.spawn(9200, -5500, "tech");
            }
            // if (simulation.difficulty > 20) {
            //     powerUps.spawn(9200, -5600, "tech");
            // }
            // if (simulation.difficulty > 30) {
            //     powerUps.spawn(9200, -5700, "tech");
            // }
            powerUps.addResearchToLevel() //needs to run after mobs are spawned
            initialSpawn == true;
        }
    },
    biohazard() {
        // MAP BY INOOBBOI AND THESHWARMA
        simulation.inGameConsole(`<strong>biohazard</strong> by <span class='color-var'>INOOBBOI</span> and <span class='color-var'>THESHWARMA</span>`);

        // set here for the cutscene later
        level.setPosToSpawn(-2800, -150)

        // set up cutscenes
        simulation.cutscene = (locations, speed, stay, xPos = m.pos.x, yPos = m.pos.y) => {
            // locations: an array of location vectors, reversed for the pop ahead
            locations.reverse()
            // speed: the speed of the cutscene transition (0 to 1)
            // stay: how much to stay in the destination (ticks)
            // xPos & yPos: the initial location, also used as the current location

            // start by disabling the default camera draw. Don't worry, it's backed up
            const camera = simulation.camera
            // create a new camera function
            simulation.camera = () => {
                ctx.save()
                ctx.translate(canvas.width2, canvas.height2) //center
                ctx.scale(simulation.zoom, simulation.zoom)
                const xScaled = canvas.width2 - xPos
                const yScaled = canvas.height2 - yPos
                ctx.translate(-canvas.width2 + xScaled, -canvas.height2 + yScaled) //translate
            }

            // and set a restoring function
            const restore = () => (simulation.camera = camera)

            // then choose the next destination. There should be always at least one destination,
            // if there isn't there's no point checking, the game should and will crash
            let dest = locations.pop()
            // animate the camera
            const lerp = (first, second, percent) => first * (1 - percent) + second * percent
            const speedDelta = speed / 5
            // wait timer
            let wait = 0
            // polls the animation, should be called every tick
            const poll = () => {
                // update position
                xPos = lerp(xPos, dest.x, speedDelta)
                yPos = lerp(yPos, dest.y, speedDelta)
                // if position is close enough, wait and go to the next position
                const TOO_CLOSE = 100
                if (Math.abs(dest.x - xPos) < TOO_CLOSE && Math.abs(dest.y - yPos) < TOO_CLOSE) {
                    // wait for a bit
                    if (++wait > stay) {
                        // if there is another target, reset the wait timer and go there
                        // otherwise end the cutscene
                        wait = 0
                        if (!(dest = locations.pop())) {
                            // no more locations! End
                            restore()
                            return true
                        }
                    }
                }
                // early return if the player skips by fielding
                if (input.field) {
                    restore()
                    return true
                }
                return false
            }
            return poll
        }

        const boost1 = level.boost(-1400, -100, 900)
        const boost2 = level.boost(500, -900, 2500)
        const boost3 = level.boost(4200, -100, 900)
        const boost4 = level.boost(2200, -900, 2500)

        const toggle = level.toggle(1340, -600, false, true)

        let bossInit = false

        const cutscenePoll = simulation.cutscene([{
            x: 230,
            y: -2700
        }, {
            x: 3500,
            y: -1400
        }, {
            x: 1450,
            y: -1150
        }, m.pos], 0.1, 10)
        let hasEnded = false

        // ** PROPS ** 
        // create some drips
        const rndInRange = (min, max) => Math.random() * (max - min) + min

        const amount = Math.round(5 + 20 * Math.random())
        const drips = []
        for (let i = 0; i < amount; i++) {
            const locX = rndInRange(-2000, 4800)
            drips.push(level.drip(locX, -3100, 1500, 200 + Math.random() * 500))
        }

        // a barrel of radioactive waste, which can drop ammo and heals
        const barrelMob = (x, y, dirVector) => {
            const MAX_WIDTH = 150
            const personalWidth = MAX_WIDTH / 2
            mobs.spawn(x, y, 4, personalWidth, 'rgb(232, 191, 40)')
            const me = mob[mob.length - 1]
            // steal some vertices
            const betterVertices = Matter.Bodies.rectangle(x, y, personalWidth, personalWidth * 1.7).vertices
            me.vertices = betterVertices
            me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.mob | cat.bullet
            me.g = simulation.g
            me.leaveBody = me.isDropPowerUp = false
            me.do = function () {
                this.gravity()
                // apply shock damage when touching the map, if it's fast
                if (this.speed > 5) {
                    const collision = Matter.Query.collides(this, map)
                    if (collision.length > 0) {
                        // on collision reduce health
                        this.health = this.health - this.speed / 250
                        // die when it's too low, doesn't register for some reason
                    }
                }
                // becomes more radioactive as it gets damaged!
                this.fill = `rgb(${232 * this.health}, 191, 40)`
            }

            me.onDeath = function () {
                const END = Math.floor(input.down ? 10 : 7)
                const totalBullets = 10
                const angleStep = (input.down ? 0.4 : 1.3) / totalBullets
                let dir = m.angle - (angleStep * totalBullets) / 2
                for (let i = 0; i < totalBullets; i++) {
                    //5 -> 7
                    dir += angleStep
                    const me = bullet.length
                    bullet[me] = Bodies.rectangle(
                        this.position.x + 50 * Math.cos(this.angle),
                        this.position.y + 50 * Math.sin(this.angle),
                        17,
                        4,
                        b.fireAttributes(dir)
                    )
                    const end = END + Math.random() * 4
                    bullet[me].endCycle = 2 * end + simulation.cycle
                    const speed = (25 * end) / END
                    const dirOff = dir + (Math.random() - 0.5) * 3
                    Matter.Body.setVelocity(bullet[me], {
                        x: speed * Math.cos(dirOff),
                        y: speed * Math.sin(dirOff)
                    })
                    bullet[me].onEnd = function () {
                        b.explosion(
                            this.position,
                            150 + (Math.random() - 0.5) * 40
                        ) //makes bullet do explosive damage at end
                    }
                    bullet[me].beforeDmg = function () {
                        this.endCycle = 0 //bullet ends cycle after hitting a mob and triggers explosion
                    }
                    bullet[me].do = function () { }
                    Composite.add(engine.world, bullet[me]) //add bullet to world
                }
                // barrels drop a ton of ammo and some heals, scales up with difficulty because I have mercy
                const amount = ~~(5 * Math.random() * simulation.difficulty / 10)
                for (let i = 0; i < amount; i++) {
                    powerUps.spawn(this.position.x, this.position.y, 'ammo', true)
                    if (Math.random() > 0.7) {
                        powerUps.spawn(this.position.x, this.position.y, 'heal', true)
                    }
                }
            }
            Matter.Body.rotate(me, Math.random() * Math.PI)
            Matter.Body.setVelocity(me, dirVector)
        }

        // creates a platform with shadow
        const platformShadow = (x, y, width, height, shadowList) => {
            // faster than making manual shadows... Why not just calculate them semi-realsitically?
            // the shadows are calculated on the object creation, so if you add map blocks it won't update.
            // shadowList is an array of shadows that'll be rendered. When the platform shadow is ready,
            // it is added to the list.
            // some helper functions first
            const perpCollision = point => {
                // takes a point, and finds a collision with the map downwards
                // the end of the ray, 3000 units down
                const lowerPoint = Vector.add(point, {
                    x: 0,
                    y: 3000
                })
                // the destination point. If a collision was not found, then it defaults to some
                // arbiterary point 3000 units down.
                let dest = lowerPoint
                for (const mapBody of map) {
                    const check = simulation.checkLineIntersection(point, lowerPoint, mapBody.vertices[0], mapBody.vertices[1])
                    // a collision was found
                    if (check.onLine1 && check.onLine2) {
                        dest = {
                            x: check.x,
                            y: check.y
                        }
                        break
                    }
                }
                return dest
            }
            const boundsToRectangle = (firstBound, secondBound) => {
                // takes two bounds and returns an (x, y, width, height) rectangle. The first one
                // must be the top left, and the second one must be the bottom right
                // sub to find the width and height
                const width = Math.abs(firstBound.x - secondBound.x)
                const height = Math.abs(firstBound.y - secondBound.y)
                // compile to an object
                return {
                    x: firstBound.x,
                    y: firstBound.y,
                    width,
                    height
                }
            }
            // create the actual platform
            spawn.mapRect(x, y, width, height)
            const me = map[map.length - 1]
            // the bottom vertices are the third and fourth ones
            const first = me.vertices[3]
            const second = me.vertices[2]
            // cast shadows to find the last shadow location.
            // iterate over all map objects, and check for collisions between a perpendicular ray
            // cast from the vertex down to the map object's top panel
            // const firstDown = perpCollision(first) // not needed in a rectangle settings
            const secondDown = perpCollision(second)
            // possible TODO: make it multirect for efficiency
            // create a single rectangle and return
            shadowList.push(boundsToRectangle(first, secondDown))
        }

        // cages with mobs, One of them holds the boss pre mutation
        const cage = (x, y, maxChainLength, drawList, mobType = null, isTheBoss = false) => {
            // the drawList is an array that the drawing function is added to
            // if the cage containing the boss it has a 50% chance to just not spawn. Spices things a bit
            if (!isTheBoss && Math.random() > 0.5) {
                return
            }
            if (!mobType) {
                // if mob type is null, then it picks a random mob
                mobType = spawn.fullPickList[~~(Math.random() * spawn.fullPickList.length)]
            }
            // create the chain length, must take into account the radius of the mob.
            // therefore, it'll create a pseudo mob of that type, take it radius and instantly kill it
            const chainLength = maxChainLength / 5 + maxChainLength * Math.random()

            // spawn and insantly kill a mob of the same type to get the radius.
            // this is used to prevent spawning the mob too short, it's a horrible
            // solution but it works
            spawn[mobType](0, 0)
            mob[mob.length - 1].leaveBody = mob[mob.length - 1].isDropPowerUp = false
            const radius = mob[mob.length - 1].radius
            mob[mob.length - 1].alive = false
            // spawn the mob. Disable shields first
            spawn.allowShields = false
            spawn[mobType](x, y + chainLength + radius * 2)
            const trappedMob = mob[mob.length - 1]
            // destroy its mind so it won't attack
            trappedMob.do = () => { }
            // spawn the cage
            mobs.spawn(x, y + chainLength + radius * 2, 4, trappedMob.radius + 50, 'rgba(150, 255, 150, 0.3)')
            const cage = mob[mob.length - 1]
            cage.g = simulation.g
            cage.do = function () {
                this.gravity()
            }
            // label it
            cage.label = 'Cage'
            // a special orb when hit
            let damageTick = 0
            cage.onDamage = (dmg) => {
                // add some damage ticks, if the trapped mob is still alive.
                // activating the boss by this method is almost impossible, since you need 10x damage
                if (trappedMob.alive) damageTick += ~~(isTheBoss ? 5 * dmg : 50 * dmg)
            }
            // collision filter
            trappedMob.collisionFilter.mask = cage.collisionFilter.mask = cat.player | cat.map | cat.bullet
            // constrain together
            spawn.constrain2AdjacentMobs(2, 0.05, false)
            // move them to be together
            trappedMob.position = Vector.clone(cage.position) // make sure you clone... Otherwise........
            // invincibility, make homing bullets not hit these, remove health bar
            trappedMob.health = cage.health = Infinity
            trappedMob.isBadTarget = cage.isBadTarget = true
            trappedMob.showHealthBar = cage.showHealthBar = false
            trappedMob.leaveBody = trappedMob.isDropPowerUp = cage.leaveBody = cage.isDropPowerUp = false
            // cross all edges of the cage with the rope, and see where it collides. Attach the rope there
            const verts = cage.vertices
            // the crossing location, doesn't stay null
            let cross = null
            for (let i = 0; i < verts.length; i++) {
                // iterate over all vertices to form lines
                const v1 = verts[i]
                const v2 = verts[(i + 1) % verts.length]
                const result = simulation.checkLineIntersection(cage.position, {
                    x,
                    y
                }, v1, v2)
                if (result.onLine1 && result.onLine2) {
                    // both lines cross!
                    cross = result
                    break
                }
            }

            if (!cross) {
                // for some odd reason, sometimes it never finds a collision. I have no idea why
                // just default to the center then
                console.error("Couldn't find a cross... Origin: ", {
                    x,
                    y
                }, " center: ", cage.position, ' vertices: ', cage.vertices)
                cross = cage.position
            }
            // create the rope
            const rope = Constraint.create({
                pointA: {
                    x,
                    y
                },
                // offset the point be in the attachment point
                pointB: Vector.sub(cross, cage.position),
                bodyB: cage,
                // the longer the rope, the looser it is
                stiffness: Math.max(0.0005 - chainLength / 10000000, 0.00000001),
                length: chainLength
            })
            Matter.Composite.add(engine.world, rope)
            // create and return a function for drawing the rope
            const draw = () => {
                // draw a little recantagle at the base
                ctx.fillStyle = color.map
                ctx.fillRect(x - 20, y - 5, 40, 25)
                // if the cage was destroyed... Do nothing beyond
                if (!cage.alive) {
                    return
                }
                // draw the rope
                ctx.beginPath()
                ctx.moveTo(x, y)
                // line to the crossing point
                // ctx.lineTo(cons[i].bodyB.position.x, cons[i].bodyB.position.y);
                ctx.lineTo(cage.position.x + rope.pointB.x, cage.position.y + rope.pointB.y);
                ctx.lineWidth = 7
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
                ctx.stroke()
                // now draw a mystic hit orb if touched
                if (damageTick) damageTick-- // reduce the ticks
                ctx.beginPath()
                ctx.arc(cage.position.x, cage.position.y, cage.radius + 30, 0, Math.PI * 2)
                ctx.lineWidth = 10
                ctx.fillStyle = `rgba(255, 0, 0, ${Math.min(1, damageTick / 2000)})`
                ctx.strokeStyle = `rgba(255, 100, 0, ${Math.min(1, damageTick / 1000)})`
                ctx.setLineDash([125 * Math.random(), 125 * Math.random()])
                ctx.stroke()
                ctx.setLineDash([])
                ctx.fill()
                // if it's the boss, draw sucking arcs
                if (isTheBoss && bossInit) {
                    for (const entity of mob) {
                        // suck the health of all mobs
                        // I hate string manipulation in control flow but heh
                        if (entity.alive) {
                            ctx.beginPath()
                            ctx.moveTo(entity.position.x, entity.position.y)
                            ctx.lineTo(trappedMob.position.x, trappedMob.position.y)
                            ctx.lineWidth = 10
                            ctx.strokeStyle = 'rgba(38, 0, 255, 0.67)'
                            ctx.stroke()
                            // damage the mob
                            entity.damage(1)
                            // damage itself bonus
                            cage.damage(1)
                        }
                    }
                    cage.damage(5)
                }

                // ok if it's too much, explode
                if (damageTick > 2000) {
                    b.explosion(cage.position, cage.radius * 10)
                    // die a silent death
                    trappedMob.alive = cage.alive = false
                    damageTick = 0
                    if (isTheBoss) {
                        // become the real boss
                        geneticBoss(trappedMob.position.x, trappedMob.position.y)
                    }
                }
            }
            // restore the shields
            spawn.allowShields = true
            // add the drawing function
            drawList.push(draw)
        }

        // platform shadows
        const shadows = []
        // cages
        const cages = []

        level.custom = () => {
            level.exit.drawAndCheck() //draws the exit
            level.enter.draw() //draws the entrance

            player.force.y -= player.mass * simulation.g * 0.25 //this gets rid of some gravity on player

            // if the cutscene is yet to end, continue polling
            if (!hasEnded) {
                hasEnded = cutscenePoll()
            }

            for (const drip of drips) drip.draw()
            // throw some barrels after the boss spawns
            if (Math.random() > 0.999 && bossInit && !hasEnded) {
                const spawnLocs = [-1415, -30, 1345, 2815, 4285]
                // const randVec = Vector.mult({ x: Math.cos(randAngle), y: Math.sin(randAngle) }, Math.random() * 15)
                barrelMob(spawnLocs[~~(spawnLocs.length * Math.random())], -4200, {
                    x: 0,
                    y: 0
                })
            }

            // platform shadow
            ctx.beginPath()
            for (const shadow of shadows) {
                ctx.rect(shadow.x, shadow.y, shadow.width, shadow.height)
            }
            ctx.fillStyle = 'rgba(0,10,30,0.1)'
            ctx.fill()

            // player pressed lever
            if (toggle.isOn && !bossInit) {
                bossInit = true
            }
            // draw the cage
        } //for dynamic stuff that updates while playing that is one Z layer below the player

        level.customTopLayer = () => {
            boost1.query()
            boost2.query()
            boost3.query()
            boost4.query()
            toggle.query()

            // shadow holes
            ctx.fillStyle = 'rgba(68, 68, 68,0.95)'
            ctx.fillRect(-1450 - 10, -4350, 150 + 20, 1250)
            ctx.fillRect(-50 - 10, -4350, 150 + 20, 1250)
            ctx.fillRect(1325 - 10, -4350, 150 + 20, 1250)
            ctx.fillRect(2800 - 10, -4350, 150 + 20, 1250)
            ctx.fillRect(4275 - 10, -4350, 150 + 20, 1250)

            for (const drawCage of cages) {
                drawCage()
            }
        } //for dynamic stuff that updates while playing that is one Z layer above the player

        const anotherBoss = (x, y) => {
            if (tech.isDuplicateMobs && Math.random() < tech.duplicationChance()) {
                spawn.historyBoss(x, y)
            }
        }

        //GENETICBOSS
        function drawEnergyBar(mob) {
            if (mob.seePlayer.recall && mob.energy > 0) {
                const h = mob.radius * 0.3
                const w = mob.radius * 2
                const x = mob.position.x - w / 2
                const y = mob.position.y - w * 0.9
                ctx.fillStyle = 'rgba(100, 100, 100, 0.3)'
                ctx.fillRect(x, y, w, h)
                ctx.fillStyle = '#0cf'
                ctx.fillRect(x, y, w * mob.energy, h)
            }
        }

        function generateGenome() {
            // creates a random genome and returns it
            const genome = {
                density: Math.random() * 0.001,
                size: 15 + Math.random() * 15,
                speed: Math.random() * 0.1,
                // color and vertex properties are "trash" genes as they don't really contribute to the orb
                color: [Math.random() * 255, Math.random() * 255, Math.random() * 255, 50 + Math.random() * 205],
                vertexCount: Math.floor(Math.random() * 5) + 3,
                // TODO fix possible concaving
                vertexOffset: null // placeholder
            }
            // initialized here as it depends on vertexCount. I could use `new function()` but nah.
            genome.vertexOffset = Array(genome.vertexCount)
                .fill()
                .map(() => ({
                    x: Math.random() - 0.5,
                    y: Math.random() - 0.5
                }))
            return genome
        }

        function mutateGenome(genome) {
            // takes an existing genome and applies tiny changes
            const randomInRange = (min, max) => Math.random() * (max - min) + min
            const tinyChange = x => randomInRange(-x, x)

            const vertexMutator = x => ({
                x: x.x + tinyChange(0.5),
                y: x.y + tinyChange(0.5)
            })
            // mutates a genome and returns the mutated version.
            const newGenome = {
                density: genome.density + tinyChange(0.0005),
                size: genome.size + tinyChange(5),
                speed: genome.speed + tinyChange(0.05),
                color: genome.color.map(x => (x + tinyChange(10)) % 255), // wrap around
                vertexCount: Math.max(genome.vertexCount + Math.round(tinyChange(1)), 3),
                vertexOffset: genome.vertexOffset.map(vertexMutator)
            }
            if (genome.vertexOffset.length < newGenome.vertexCount) {
                const vo = newGenome.vertexOffset
                vo.push(vertexMutator(vo[~~(vo.length * Math.random())]))
            } else if (genome.vertexOffset.length > newGenome.vertexCount) {
                newGenome.vertexOffset.pop()
            }

            return newGenome
        }

        function calculateGenomeCost(genome) {
            // calculates the cost of a genome and returns it. The cost is used to
            // determine how "costly" the genome is to make, and after the orb's life ends it
            // is used together with the orb success score to determine the fittest orb.
            const score = (1 / (genome.density * genome.size * genome.speed)) * 0.000001
            return score
        }
        // distance functions
        const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2
        const dist = (a, b) => Math.sqrt(dist2(a, b))

        // ** MAP SPECIFIC MOBS **
        function energyTransferBall(origin, target, boss, charge) {
            // transports energy to the boss
            // when the boss is hit by it, how much of the energy stored the boss actually recives
            const ENERGY_TRANSFER_RATE = 80 /*%*/
            // add 1 to the active ball list
            boss.activeBalls++
            const color = `rgba(${150 + 105 * charge}, 81, 50, 0.6)`
            mobs.spawn(origin.x, origin.y, 12, 20 + 20 * charge, color)
            const me = mob[mob.length - 1]
            me.end = function () {
                simulation.drawList.push({
                    // some nice graphics
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.radius,
                    color: '#f3571d',
                    time: ~~(Math.random() * 20 + 10)
                })
                // on death spawn and explode a bomb
                if (Math.random() > 0.95) {
                    spawn.bomb(this.position.x, this.position.y, this.radius, this.vertices.length)
                    mob[mob.length - 1].death()
                }
                // remove 1 from the active ball list
                boss.activeBalls--
                this.death()
            }
            me.collisionFilter.mask = cat.player | cat.map
            // me.onHit = this.end
            me.life = 0
            me.isDropPowerUp = false
            me.leaveBody = false
            me.do = function () {
                // die on collision with the map
                if (Matter.Query.collides(this, map).length > 0) {
                    this.end()
                }
                // die if too much time passes. Stronger bullets explode earlier
                if (++this.life > 200 - charge * 100) {
                    this.end()
                }
                // if the orb collides with the boss, die but give energy to the boss
                if (Matter.Query.collides(this, [boss]).length > 0) {
                    boss.energy = Math.min(charge * (ENERGY_TRANSFER_RATE / 100) + boss.energy, 1)
                    // also make the boss fire once regardless of energy
                    boss.spawnOrbs()
                    this.end()
                }
                const movement = Vector.normalise(Vector.sub(target, origin))
                Matter.Body.setVelocity(this, {
                    x: this.velocity.x + movement.x,
                    y: this.velocity.y + movement.y
                })
                // nice graphics
                simulation.drawList.push({
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.radius,
                    color: '#e81e1e',
                    time: 3
                })
                simulation.drawList.push({
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.radius,
                    color: '#e87f1e',
                    time: 6
                })
                simulation.drawList.push({
                    x: this.position.x,
                    y: this.position.y,
                    radius: this.radius,
                    color: '#e8e41e',
                    time: 9
                })
            }
            me.onDamage = me.end
        }

        function energyBeacon(x, y, parentBoss) {
            // an unmoving beacon that charges the genetic boss with energy either stolen
            // from the player or generated. That energy is used to create stronger mobs.
            mobs.spawn(x, y, 3, 50, '') // default color, changed an instant later
            const me = mob[mob.length - 1]
            me.laserRange = 500
            me.leaveBody = false
            me.isDropPowerUp = false
            // custom variables
            // max energy is 1
            me.energy = 0
            me.seed = simulation.cycle // seed to make sure this mob is unique render wise
            me.chargeTicks = 0 // used to time charging the boss
            me.bossPos = null // the position that the mob remembers when charging
            me.density = me.density * 2
            Matter.Body.setDensity(me, 0.0022 * 3 + 0.0002 * Math.sqrt(simulation.difficulty)) //extra dense
            me.do = function () {
                // if the boss is dead, die
                if (!parentBoss.alive) {
                    this.death()
                }
                // slowly rotate
                Matter.Body.setAngularVelocity(this, 0.01)
                this.fill = `rgba(${this.energy * 255}, 29, 136, 0.80)`
                this.seePlayerCheck()
                // steal energy from player
                // this.harmZone() // regular harmZone
                // custom effects on top of that
                if (this.distanceToPlayer() < this.laserRange) {
                    if (m.immuneCycle < m.cycle) {
                        // suck extra energy from the player if it's in range
                        if (m.energy > 0.1 && this.energy < 1 - 0.012) {
                            m.energy -= 0.012
                            this.energy += 0.012
                        }
                        // special "sucking" graphics
                        ctx.beginPath()
                        ctx.moveTo(this.position.x, this.position.y)
                        ctx.lineTo(m.pos.x, m.pos.y)
                        ctx.lineWidth = 3 + Math.abs(Math.sin((simulation.cycle + this.seed) / 100)) * 2
                        ctx.strokeStyle = `rgb(${(
                            Math.abs(Math.sin((simulation.cycle + this.seed + 100) / 100)) * 255
                        ).toFixed(3)}, 204, 255)`
                        ctx.setLineDash([125 * Math.random(), 125 * Math.random()])
                        ctx.stroke()
                        ctx.setLineDash([])
                    }
                }
                // if the mob's energy is at least 50% full, try to send that energy to the boss.
                // don't send that energy yet if more than 5 other transfer balls are active
                if (this.energy > 0.5 && parentBoss.energy < 1 && parentBoss.activeBalls <= 5 && this.chargeTicks === 0) {
                    const seesBoss = Matter.Query.ray(map, this.position, parentBoss.position).length === 0
                    if (seesBoss) {
                        this.chargeTicks = 100
                        this.bossPos = Vector.clone(parentBoss.position)
                    }
                }
                if (this.chargeTicks > 0) {
                    if (--this.chargeTicks === 0) {
                        // spawn the orb
                        const location = Vector.add(
                            Vector.mult(Vector.normalise(Vector.sub(this.bossPos, this.position)), this.radius * 3),
                            this.position
                        )
                        energyTransferBall(location, this.bossPos, parentBoss, this.energy)
                        this.energy = 0
                    }
                    // create a beam and aim it at the bossPos
                    ctx.beginPath()
                    ctx.moveTo(this.position.x, this.position.y)
                    ctx.lineTo(this.bossPos.x, this.bossPos.y)
                    ctx.lineWidth = 10 + Math.abs(Math.sin((simulation.cycle + this.seed) / 100)) * 5
                    ctx.strokeStyle = `rgb(${(
                        Math.abs(Math.sin((simulation.cycle + this.seed + 100) / 100)) * 255
                    ).toFixed(3)}, 204, 255)`
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()])
                    ctx.stroke()
                    ctx.setLineDash([])
                }
                // generate (0.15 * difficulty / 4)% energy per tick
                if (this.energy < 1) this.energy += 0.0015 * (simulation.difficulty / 4)
                // draw energy bar
                drawEnergyBar(this)
            }
            me.onDeath = function () {
                // remove itself from the list
                const beacons = parentBoss.energyBeacons
                beacons.splice(beacons.indexOf(this), 1)
                // explode with the strength of its energy!
                this.alive = false // to prevent retriggering infinitly
                b.explosion(this.position, this.energy * this.radius * 15)
                // when it dies, it reduces some of the boss' energy
                parentBoss.energy -= 0.025
                // and stuns it
                mobs.statusStun(parentBoss, 70 + ~~(100 / simulation.difficulty))
            }
        }

        function geneticSeeker(x, y, genome, parentBoss) {
            // special bullets that get score based on their performance.
            mobs.spawn(x, y, genome.vertexCount, genome.size, '#' + genome.color.map(it => (~~it).toString(16)).join(''))
            const me = mob[mob.length - 1]
            // apply genome
            Matter.Body.setDensity(me, genome.density)
            me.accelMag = genome.speed
            // apply vertex offset
            for (let i = 0; i < me.vertices.length; i++) {
                const vertex = me.vertices[i]
                const offset = genome.vertexOffset[i]
                if (!offset) console.log(genome, me)
                vertex.x += offset.x
                vertex.y += offset.y
            }

            me.stroke = 'transparent'
            Matter.Body.setDensity(me, 0.00001) //normal is 0.001
            // increased if the orb done things that are deemed successful
            me.score = 30
            me.timeLeft = 9001 / 9
            me.accelMag = 0.00017 * simulation.accelScale //* (0.8 + 0.4 * Math.random())
            me.frictionAir = 0.01
            me.restitution = 0.5
            me.leaveBody = false
            me.isDropPowerUp = false
            me.isBadTarget = true
            me.isMobBullet = true
            me.showHealthBar = false
            me.collisionFilter.category = cat.mobBullet
            me.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet
            me.do = function () {
                this.alwaysSeePlayer()
                this.attraction()
                this.timeLimit()

                if (Matter.Query.collides(this, map).length > 0) {
                    // colliding with the map gives a score reduction, 0.5 per tick
                    this.score -= 0.5
                }
                // default score is slowly reduced every tick to give mobs that reached the player faster a benefit
                this.score -= 0.05
                if (this.score < 0) {
                    this.alive = false // no point continuing if this orb is that bad! Silent death
                }
                // give a bonus if some projectile is nearby or the mouse position is close (like laser pointing)
                // if a mob survives this for long, then it gets a score benefit.
                const bulletCloseToOrb = bullet.some(it => dist2(this.position, it.position) < 10000 /* 100 ^ 2 */)
                // player shoots and aims close
                const mouseCloseToOrb = dist2(this.position, simulation.mouseInGame) < 10000 && input.fire
                if (bulletCloseToOrb || mouseCloseToOrb) {
                    this.score += 1
                }
                // die if too far from the boss... It would be incredibly difficult to dodge otherwise
                if (dist2(this.position, parentBoss.position) > 2000 * 2000) {
                    this.alive = false
                }
                // DEBUG score printer
                // ctx.font = '48px sans-serif'
                // ctx.fillStyle = 'rgba(252, 0, 143, 1)'
                // ctx.fillText(~~this.score, this.position.x - this.radius, this.position.y - this.radius)
            }
            me.onHit = function () {
                // hitting the player gives a 50 points score bonus
                this.score += 50
                this.score += this.mass * 2 // bigger mass = bigger damage, add that too
                // a marker for later
                this.hitPlayer = true
                this.explode(this.mass)
            }
            me.onDeath = function () {
                if (!this.hitPlayer) {
                    // if it didn't hit the player, give it a score based on its distance
                    this.score += 10000 / this.distanceToPlayer()
                }
                // 3% chance to drop ammo
                if (Math.random() > 0.97) {
                    powerUps.spawn(this.position.x, this.position.y, 'ammo', true)
                }
                parentBoss.deadOrbs.push({
                    genome: genome,
                    score: this.score
                })
            }
        }

        function geneticBoss(x, y, radius = 130, spawnBossPowerUp = true) {
            // a modified orb shooting boss that evolves its orbs.
            // the way this boss works is different from the regular orb shooting boss,
            // because the orbs have evolving properties via a "machine learning" scoring algorithm.
            const MAX_BEACONS = Math.round(3 + Math.random() * simulation.difficulty / 3)
            mobs.spawn(x, y, 8, radius, 'rgb(83, 32, 58)')
            let me = mob[mob.length - 1]
            me.isBoss = true

            me.accelMag = 0.0001 * simulation.accelScale
            me.fireFreq = Math.floor((330 * simulation.CDScale) / simulation.difficulty)
            me.frictionStatic = 0
            me.friction = 0
            me.frictionAir = 0.02
            me.memory = (420 / 69) * 42 // 🧌
            me.repulsionRange = 1000000
            me.energyBeacons = []
            me.activeBalls = 0
            // starts by random, or by the stored genomes if they exist
            const init = () => ({
                genome: generateGenome(),
                score: 0
            })
            me.fittestOrbs = (localStorage && localStorage.genome) ? JSON.parse(localStorage.genome) : [init(), init(), init()] // best genomes so far. Size of three
            // when an orb died it's moved here. When a new spawn cycle starts, their scores get calculated
            // and they get put in the fittest orbs array, if they are better than the old ones.
            me.deadOrbs = []
            me.energy = 1
            // this boss has no orbitals, because it's not meant to ever attack on its own
            me.damageReduction = 0.25
            // has a shield and sustains that shield
            spawn.shield(me, x, y, Infinity)
            me.fireFreq = 30
            me.ionizeFreq = 20
            me.ionized = []
            me.laserRange = radius * 4

            Matter.Body.setDensity(me, 0.0022 * 4 + 0.0002 * Math.sqrt(simulation.difficulty)) //extra dense //normal is 0.001 //makes effective life much larger
            me.onDeath = function () {
                if (spawnBossPowerUp) {
                    powerUps.spawnBossPowerUp(this.position.x, this.position.y)
                    const amount = ~~(5 * Math.random() * simulation.difficulty / 10) * 2
                    for (let i = 0; i < amount; i++) {
                        powerUps.spawn(this.position.x, this.position.y, 'ammo', true)
                        if (Math.random() > 0.7) {
                            powerUps.spawn(this.position.x, this.position.y, 'heal', true)
                        }
                    }
                }
                // keep the best genome and use it next fight...
                if (localStorage) {
                    localStorage.setItem("genome", JSON.stringify(this.fittestOrbs))
                }

                // stop spawning barrels
                bossInit = false
            }
            me.onDamage = function () { }
            me.spawnBeacon = function () {
                // the vertex to spawn the beacon from
                const vert = this.vertices[~~(Math.random() * this.vertices.length)]
                // the position should be a little to the side to prevent crashing into the boss
                // TODO check for collisions with the wall
                const spawnPos = Vector.add(vert, Vector.mult(Vector.normalise(Vector.sub(this.position, vert)), -60))
                // some velocity
                const velocity = Vector.mult(Vector.normalise(Vector.sub(this.position, vert)), -5)
                energyBeacon(spawnPos.x, spawnPos.y, this) // spawn the beacon, a bit ahead
                const beacon = mob[mob.length - 1]
                this.energyBeacons.push(beacon)
                Matter.Body.setVelocity(beacon, {
                    x: this.velocity.x + velocity.x,
                    y: this.velocity.y + velocity.y
                })
            }
            me.spawnOrbs = function () {
                Matter.Body.setAngularVelocity(this, 0.11)
                // sort the vertices by the distance to the player
                const sorted = [...this.vertices].sort(dist2)
                // spawn the bullets based on how close they are to the player.
                // the way it works is it picks the fittest three orbs and clones them.
                // but start by taking old mobs and checking if they are better than the new ones
                let next
                while ((next = this.deadOrbs.pop())) {
                    // material costs are calculated as a contra to the score
                    const cost = calculateGenomeCost(next.genome) * 500 // normalize via multiplication
                    const totalScore = next.score - cost
                    // try to insert itself into the best orbs, if it can
                    for (let i = 0; i < this.fittestOrbs.length; i++) {
                        const fitEntry = this.fittestOrbs[i]
                        if (fitEntry.score < totalScore) {
                            this.fittestOrbs[i] = next
                            break
                        }
                    }
                }
                // finally sort them using their score
                this.fittestOrbs.sort((a, b) => a.score - b.score)
                // only take the genome, the score doesn't matter here
                const bestOrbs = this.fittestOrbs.map(it => it.genome)
                for (let vertex of sorted) {
                    // pick a random fit orb and try to spawn it. If the cost is too high, it'll attempt
                    // to generate a new random orb instead. If that orb is too expensive too, just ignore this vertex.
                    // the evolution part comes here, as the genome is mutated first.
                    let randGenome = mutateGenome(bestOrbs[~~(Math.random() * bestOrbs.length)])
                    const cost = calculateGenomeCost(randGenome) * 2
                    if (this.energy - cost < 0) {
                        // okay this orb is too expensive for the boss to spawn,
                        // make a new orb from scratch
                        randGenome = generateGenome()
                        const secondCost = calculateGenomeCost(randGenome)
                        if (this.energy - secondCost < 0) {
                            // that was too expensive too, heh
                            continue
                        }
                    } else {
                        // alright the boss can afford that
                        this.energy -= Math.abs(cost) // TODO: Fix this, why the heck can it even be negative??
                    }

                    geneticSeeker(vertex.x, vertex.y, randGenome, this)
                    // give the bullet a rotational velocity as if they were attached to a vertex
                    const velocity = Vector.mult(
                        Vector.perp(Vector.normalise(Vector.sub(this.position, vertex))),
                        -10
                    )
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + velocity.x,
                        y: this.velocity.y + velocity.y
                    })
                }
            }
            me.do = function () {
                this.seePlayerCheck()
                this.checkStatus()
                this.attraction()
                this.repulsion()
                // draw laser arcs if it sees the player
                this.harmZone()
                // 
                const regularChance = Math.random() > 0.99
                const biggerChance = Math.random() > 0.95 && this.energy > 0.25
                // start by making sure there is always at least one beacon
                if (this.energyBeacons.length === 0) {
                    this.spawnBeacon()
                }
                // then, spawn some energy beacons if there are less than the maximum.
                // small chance if there's no energy, bigger chance if there is at least 10% (which is drained)
                if ((this.energyBeacons.length < MAX_BEACONS && biggerChance) || regularChance) {
                    if (biggerChance) {
                        // if the spawn was a selection of bigger chance, reduce 10% energy
                        this.energy -= 0.10
                    }
                    this.spawnBeacon()
                }
                // then, spawn genetic seekers
                if (this.seePlayer.recall && !(simulation.cycle % this.fireFreq)) {
                    // fire a bullet from each vertex if there's enough energy
                    if (this.energy > 0.15) {
                        this.spawnOrbs()
                    }
                }

                if (this.energy > 1) {
                    // clean excess energy
                    this.energy -= 0.003
                } else {
                    // or slowly generate energy
                    this.energy += 0.001
                }
                // the boss will ionize every bullet in its radius, but that will cause its energy to deplete
                if (!(simulation.cycle % this.ionizeFreq)) {
                    for (let i = 0; i < bullet.length; i++) {
                        const it = bullet[i]
                        // if it's not a bot and it's close
                        if (!it.botType && dist(this.position, it.position) < this.laserRange) {
                            // add it to the ionized list
                            this.ionized.push({
                                target: it,
                                ticks: 0
                            })
                        }
                    }
                }

                for (let i = 0; i < this.ionized.length; i++) {
                    const entry = this.ionized[i]

                    // skip if there's not enough energy
                    if (this.energy <= 0) break

                    // terminate if it's no longer in the radius
                    if (dist(this.position, entry.target.position) > this.laserRange) {
                        this.ionized.splice(i, 1)
                        continue
                    }
                    // terminate after some ticks
                    if (++entry.ticks === 10) {
                        entry.target.endCycle = 0
                        // draw nice popping graphics
                        simulation.drawList.push({
                            x: entry.target.position.x,
                            y: entry.target.position.y,
                            radius: 5,
                            color: '#f24',
                            time: ~~(Math.random() * 20 + 10)
                        })
                        // and remove
                        this.ionized.splice(i, 1)
                        continue
                    }
                    // draw line
                    ctx.beginPath()
                    ctx.moveTo(this.position.x, this.position.y)
                    ctx.lineTo(entry.target.position.x, entry.target.position.y)
                    ctx.lineWidth = 7
                    ctx.strokeStyle = `rgb(${60 - entry.ticks * 2}, 50, 50)`
                    ctx.stroke()
                    // reduce energy, as it's hard to ionize
                    this.energy -= entry.target.mass / 25
                }

                // if it has energy, shield itself and drain energy
                if (!this.isShielded && this.energy > 0.5) {
                    spawn.shield(this, this.position.x, this.position.y, Infinity)
                    this.energy -= 0.25
                }
                drawEnergyBar(this)
                // change fill color
                this.fill = `rgb(${((Math.sin(simulation.cycle / 100) + 1) / 2) * 100}, 32, 58)`
            }
            // start by spawning several beacons to gain initial energy
            const amount = Math.ceil(2 + Math.random() * simulation.difficulty / 5)
            for (let i = 0; i < amount; i++)
                me.spawnBeacon()
        }

        // LEVEL SETUP
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20) //don't change this

        level.exit.x = 5700 //you exit at x
        level.exit.y = -130 //you exit at y
        spawn.mapRect(5800, -110, -100, 10)

        level.defaultZoom = 2000 //how far out you want the image to be zoomed at (lower = zoom in, higher = zoom out)
        simulation.zoomTransition(level.defaultZoom) //makes the level transition to have the zoom at the start of a level
        document.body.style.backgroundColor = 'hsl(138, 3%, 74%)' //sets background color

        //LEVEL STRUCTURE
        spawn.mapRect(-3100, -100, 9200, 100)
        spawn.mapRect(-3100, -600, 100, 500)
        spawn.mapRect(-3100, -600, 1100, 100)
        spawn.mapRect(-2100, -3100, 100, 2700)
        spawn.mapRect(4800, -3100, 100, 2600)
        spawn.mapRect(4800, -600, 1300, 100)
        spawn.mapRect(6000, -600, 100, 600)

        spawn.mapRect(400, -200, 2000, 100)
        spawn.mapRect(600, -300, 1600, 100)
        spawn.mapRect(800, -400, 1200, 100)
        spawn.mapRect(1000, -500, 800, 100)
        spawn.mapRect(1200, -600, 400, 100)
        // roof
        spawn.mapRect(-2100, -4350, 650, 1250)
        spawn.mapRect(-1300, -4350, 1250, 1250)
        spawn.mapRect(100, -4350, 1225, 1250)
        spawn.mapRect(1475, -4350, 1325, 1250)
        spawn.mapRect(2950, -4350, 1325, 1250)
        spawn.mapRect(4425, -4350, 475, 1250)

        // arc
        // spawn.mapVertex(1400, -892, '700, -800, 700, -900, 1000, -1000, 1800, -1000, 2100, -900, 2100, -800')


        //PLATFORMS
        platformShadow(-1200, -500, 300, 100, shadows)
        platformShadow(-400, -700, 300, 100, shadows)
        platformShadow(400, -900, 300, 100, shadows)
        platformShadow(-2000, -800, 300, 100, shadows)
        platformShadow(-1000, -1000, 300, 100, shadows)
        platformShadow(-400, -1300, 300, 100, shadows)
        platformShadow(-1600, -1300, 300, 100, shadows)
        platformShadow(-1300, -1600, 300, 100, shadows)
        platformShadow(-2000, -1700, 300, 100, shadows)
        platformShadow(-700, -1800, 300, 100, shadows)
        platformShadow(-1500, -2100, 300, 100, shadows)
        platformShadow(-600, -2200, 300, 100, shadows)
        platformShadow(-2000, -2500, 300, 100, shadows)
        platformShadow(-1100, -2400, 300, 100, shadows)
        platformShadow(-500, -2700, 300, 100, shadows)
        platformShadow(100, -2400, 300, 100, shadows)
        platformShadow(700, -2700, 300, 100, shadows)

        platformShadow(3700, -500, 300, 100, shadows)
        platformShadow(2900, -700, 300, 100, shadows)
        platformShadow(2100, -900, 300, 100, shadows)
        platformShadow(4500, -800, 300, 100, shadows)
        platformShadow(3500, -1000, 300, 100, shadows)
        platformShadow(4100, -1300, 300, 100, shadows)
        platformShadow(2900, -1300, 300, 100, shadows)
        platformShadow(3800, -1600, 300, 100, shadows)
        platformShadow(4500, -1700, 300, 100, shadows)
        platformShadow(3200, -1800, 300, 100, shadows)
        platformShadow(4000, -2100, 300, 100, shadows)
        platformShadow(3100, -2200, 300, 100, shadows)
        platformShadow(4500, -2500, 300, 100, shadows)
        platformShadow(3600, -2400, 300, 100, shadows)
        platformShadow(3000, -2700, 300, 100, shadows)
        platformShadow(2400, -2400, 300, 100, shadows)
        platformShadow(1800, -2700, 300, 100, shadows)

        // cages
        cage(-1492, -1200, 100, cages)
        cage(-875, -2300, 300, cages)
        cage(-1600, -3100, 1000, cages)
        cage(225, -2300, 1000, cages)
        cage(-750, -3100, 700, cages)
        cage(-625, -1700, 1200, cages)
        cage(2200, -3100, 500, cages)
        cage(3275, -1700, 500, cages)
        cage(3650, -900, 300, cages)
        cage(2500, -2300, 300, cages)
        cage(3625, -2300, 300, cages)
        cage(3875, -1500, 300, cages)
        cage(4025, -3100, 300, cages)

        // boss cage
        platformShadow(1275, -2150, 250, 100, shadows)
        cage(1400, -2050, 500, cages, 'starter', true)
        map[map.length] = Bodies.trapezoid(1400, -2193, 250, 100, 0.5)
        //DEBRIS
        //idk just put the debris wherever you want
        spawn.debris(-550, -225, 100)
        spawn.debris(-1150, -1725, 75)
        spawn.debris(-275, -1400, 50)
        spawn.debris(2850, -2075, 150)
        spawn.debris(4250, -2250, 150)
        //BOSS
        // geneticBoss(1400, -3800)
        anotherBoss(0, 0) //will only spawn historyBoss if there is an additional boss
    },
    stereoMadness() {
        simulation.inGameConsole(`<strong>stereoMadness</strong> by <span class='color-var'>Richard0820</span>`);
        let totalCoin = 0;
        const hunter = function (x, y, radius = 30) { //doesn't stop chasing until past 105000
            mobs.spawn(x, y, 6, radius, "black");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.collisionFilter.mask = cat.player | cat.bullet;
            me.accelMag = 0.0006 * Math.min(simulation.difficulty + 1, 4);
            me.showHealthBar = false;
            me.isUnblockable = true;
            me.isShielded = true;
            me.memory = Infinity;
            me.seeAtDistance2 = Infinity;
            Matter.Body.setDensity(me, 1)
            simulation.inGameConsole(`<b style="color: #3498DB;">Ω:</b><em style="color: #141414;"><b> Intruder Detected</b></em>`);
            me.boost = 10;
            me.do = function () {
                if (me.boost == 1 && m.fieldMode == 3 || m.fieldMode == 9 && me.boost == 1) {
                    me.accelMag *= 1.5;
                    me.boost--;
                }
                this.attraction();
                this.checkStatus();
                this.repelBullets();
                this.locatePlayer();
                this.alwaysSeePlayer()
                if (player.position.x > 105000) {
                    this.death()
                }
            };
            me.onHit = function () {
                for (let i = 0; i < 10; i++) {
                    spawn.spawns(this.position.x + Math.random() * 1000 - Math.random() * 1000, this.position.y - Math.random() * 1000, 1)
                }
            }
        }
        const coin = function (x, y, radius = 50) {
            mobs.spawn(x, y, 40, radius, "yellow");
            let me = mob[mob.length - 1];
            me.stroke = "#00000055"
            me.isShielded = true;
            me.leaveBody = false;
            me.isBadTarget = true;
            me.isUnblockable = true;
            me.isDropPowerUp = false;
            me.showHealthBar = false;
            me.collisionFilter.category = 0;
            Matter.Body.setDensity(me, 0.0045);
            me.onDeath = function () {
                totalCoin++;
            };
            me.damageReduction = 0.35
            me.do = function () {
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.PI / 2 + 0.5)
                ctx.strokeStyle = "#000000";
                ctx.beginPath()
                ctx.arc(0, 0, 30, -1, Math.PI, false)
                ctx.moveTo(20, -5)
                ctx.arc(0, 0, 20, -1, Math.PI, false)
                ctx.lineWidth = 5;
                ctx.stroke()
                ctx.restore()
                if (!simulation.isTimeSkipping) {
                    const sine = Math.sin(simulation.cycle * 0.015)
                    this.radius = 50 * (1 + 0.1 * sine)
                    const sub = Vector.sub(player.position, this.position)
                    const mag = Vector.magnitude(sub)
                    const force = Vector.mult(Vector.normalise(sub), 0.000000003)
                    if (mag < this.radius) { //heal player when inside radius
                        if (m.health < 0.7) {
                            m.takeDamage(-0.001);
                        } else if (m.health == 0.7 || m.health > 0.7) {
                            this.death()
                        }
                        ctx.strokeStyle = "#00FFDD55";
                        ctx.beginPath();
                        ctx.arc(m.pos.x, m.pos.y, 34, 0, 2 * Math.PI);
                        ctx.lineWidth = 6;
                        ctx.stroke();
                    }
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, this.radius + 15, 0, 2 * Math.PI);
                    ctx.strokeStyle = "#000"
                    ctx.lineWidth = 1;
                    ctx.stroke();
                };
            }
        }
        const spike = function (x, y, angle = Math.PI * 0.5, radius = 50) {
            mobs.spawn(x, y, 3, radius, "#454545");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.isDropPowerUp = false;
            me.showHealthBar = false;
            Matter.Body.setDensity(me, 50)
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
                if (this.health < 1) {
                    this.health += 0.001; //regen
                    simulation.drawList.push({
                        x: this.position.x,
                        y: this.position.y,
                        radius: this.radius / 1.5,
                        color: `rgba(0, 255, 20, ${Math.random() * 0.1})`,
                        time: simulation.drawTime
                    });
                }
                this.checkStatus();
                Matter.Body.setAngle(me, angle);
            };
            me.onHit = function () {
                m.takeDamage(0.01) //extra damage
                me.collisionFilter.mask = 0;
                setTimeout(() => {
                    me.collisionFilter.mask = cat.player | cat.mob | cat.bullet;
                }, 1000);
            }
            Composite.add(engine.world, me.constraint);
        }

        function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
            outerRadius *= (1 + 0.1 * Math.sin(simulation.cycle * 0.15));
            innerRadius *= (1 + 0.1 * Math.sin(simulation.cycle * 0.15));
            var rot = Math.PI / 2 * 3;
            var xs = cx;
            var y = cy;
            var step = Math.PI / spikes;

            ctx.strokeSyle = "#000";
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius)
            for (i = 0; i < spikes; i++) {
                xs = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(xs, y)
                rot += step

                xs = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(xs, y)
                rot += step
            }
            ctx.lineTo(cx, cy - outerRadius)
            ctx.closePath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.fillStyle = 'darkred';
            ctx.fill();

        }
        const slimePit1 = level.hazard(7475, -75, 475, 100, 0.01)
        const slimePit2 = level.hazard(11275, -75, 1450, 100, 0.01)
        const slimePit3 = level.hazard(13400, -150, 3500, 200, 0.1)
        const slimePit4 = level.hazard(20275, -400, 3475, 450, 0.01)
        const slimePit5 = level.hazard(25300, -800, 20000, 650, 0.003)
        const slimePit6 = level.hazard(47725, -425, 2500, 475, 0.01)
        const slimePit7 = level.hazard(50975, -575, 4050, 650, 0.01)
        const slimePit8 = level.hazard(54950, -950, 6650, 1050, 0.01)
        const slimePit9 = level.hazard(63550, -75, 2150, 100, 0.01)
        const slimePit10 = level.hazard(70875, -75, 1200, 100, 0.01)
        const slimePit11 = level.hazard(72075, -50, 900, 75, 1)
        const slimePit12 = level.hazard(75900, -75, 2575, 100, 0.01)
        const slimePit13 = level.hazard(78475, -35, 2300, 70, 0.01)
        const slimePit14 = level.hazard(82875, -75, 5100, 100, 0.1)

        const drip1 = level.drip(32474, -2165, -800, 100);
        const drip2 = level.drip(37750, -2165, -800, 100);
        const drip3 = level.drip(43525, -2165, -800, 100);
        const drip4 = level.drip(20475, -830, -375, 100);
        const drip5 = level.drip(49960, -2315, -423, 200)
        let textlogOne = 0;
        let textlogTwo = 0;
        let barThere = true;
        let bar = document.createElement("div");
        bar.style.cssText = `position: absolute; top: 80px; background-color: black; width: 80vw; z-index: 1; border-radius: 10px; height: 20px; left: 5em; right: 5em;`;
        bar.innerHTML += `<div id="innerBar" style="height: 12px; border-radius: 10px; margin-top: 3px; margin-left: 4px; border: 1px solid gray;"></div>`
        document.body.appendChild(bar);
        let innerBar = document.getElementById("innerBar");
        level.custom = () => {
            level.exit.drawAndCheck();
            if (barThere == true) {
                innerBar.style.width = "calc(" + `${Math.max(0, Math.min(player.position.x / 1310, 80))}` + "vw - 10px)";
                innerBar.style.backgroundColor = m.eyeFillColor;
            }
            if (m.pos.x > 25360 && textlogOne == 0) {
                simulation.inGameConsole(`<div><em>A stong force pushes you forward...</em></div>`)
                textlogOne++;
            }
            if (m.pos.x < -3000) {
                Matter.Body.setVelocity(player, {
                    x: 99,
                    y: 19
                });

                if (textlogTwo == 0)
                    simulation.inGameConsole(`<div><em>A strong force pushes you away...</em></div>`);
                textlogTwo++;
            }
            if (m.pos.y > 1055) {
                Matter.Body.setPosition(player, { x: 0, y: -150 });
                simulation.inGameConsole(`<div><em>There is nowhere to run...</em></div>`);
                m.takeDamage(0.1 * simulation.difficultyMode);
            }
            if (m.alive == false && barThere == true) {
                document.body.removeChild(bar);
                barThere = false;
            }
            ctx.beginPath()
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(40, -1000)
            ctx.arc(0, -1000, 40, 0, 2 * Math.PI)
            ctx.stroke()
            ctx.fillStyle = "#FF00FF55"
            ctx.fillRect(89750, -1300, 800, 200)
            ctx.fillRect(89750, -200, 800, 200)
            ctx.fillRect(92050, -200, 800, 200)
            ctx.fillRect(92050, -1675, 800, 575)
            ctx.fillRect(93950, -350, 200, 350);
            ctx.fillRect(95100, -1350, 150, 375);
            ctx.fillRect(100900, -1325, 1175, 250);
            ctx.fillRect(100900, -225, 1200, 250);
            ctx.fillRect(98725, -1325, 450, 150);
            ctx.fillRect(98725, -125, 450, 150);
            ctx.beginPath()
            //lines!
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(7462.5, -250)
            ctx.lineTo(7462.5, -170)
            ctx.moveTo(7710, -330)
            ctx.lineTo(7710, -250)
            ctx.moveTo(7960, -420)
            ctx.lineTo(7960, -320)
            ctx.moveTo(13725, -250)
            ctx.lineTo(13725, -180)
            ctx.moveTo(14025, -350)
            ctx.lineTo(14025, -280)
            ctx.moveTo(14325, -450)
            ctx.lineTo(14325, -380)
            ctx.moveTo(14625, -550)
            ctx.lineTo(14625, -480)
            ctx.moveTo(14925, -650)
            ctx.lineTo(14925, -580)
            ctx.moveTo(15225, -750)
            ctx.lineTo(15225, -680)
            ctx.moveTo(15525, -850)
            ctx.lineTo(15525, -780)
            ctx.moveTo(15825, -950)
            ctx.lineTo(15825, -880)
            ctx.moveTo(16125, -1050)
            ctx.lineTo(16125, -980)
            ctx.moveTo(16425, -1150)
            ctx.lineTo(16425, -1080)
            ctx.moveTo(22600, -650)
            ctx.lineTo(22600, -580)
            ctx.moveTo(22800, -750)
            ctx.lineTo(22800, -680)
            ctx.moveTo(23000, -850)
            ctx.lineTo(23000, -780)
            ctx.moveTo(23200, -950)
            ctx.lineTo(23200, -880)
            ctx.moveTo(23400, -1050)
            ctx.lineTo(23400, -980)
            ctx.moveTo(23600, -1150)
            ctx.lineTo(23600, -1080)
            ctx.moveTo(29550, -1625)
            ctx.lineTo(29550, -1425)
            ctx.moveTo(32275, -2125)
            ctx.lineTo(32275, -1925)
            ctx.moveTo(33775, -2125)
            ctx.lineTo(33775, -1925)
            ctx.moveTo(32275, -350)
            ctx.lineTo(32275, -550)
            ctx.moveTo(33775, -350)
            ctx.lineTo(33775, -550)
            ctx.moveTo(35475, -650)
            ctx.lineTo(35475, -450)
            ctx.moveTo(37650, -2000)
            ctx.lineTo(37650, -1800)
            ctx.moveTo(39675, -400)
            ctx.lineTo(39675, -600)
            ctx.moveTo(40375, -500)
            ctx.lineTo(40375, -700)
            ctx.moveTo(41075, -600)
            ctx.lineTo(41075, -800)
            ctx.moveTo(43625, -1925)
            ctx.lineTo(43625, -1725)
            ctx.moveTo(50975, -1125)
            ctx.lineTo(50975, -925)
            ctx.moveTo(51387.5, -1325)
            ctx.lineTo(51387.5, -1125)
            ctx.moveTo(51787.5, -1525)
            ctx.lineTo(51787.5, -1325)
            ctx.moveTo(52187.5, -1725)
            ctx.lineTo(52187.5, -1525)
            ctx.moveTo(52587.5, -1725)
            ctx.lineTo(52587.5, -1925)
            ctx.moveTo(52987.5, -2125)
            ctx.lineTo(52987.5, -1925)
            ctx.moveTo(53387.5, -2325)
            ctx.lineTo(53387.5, -2125)
            ctx.moveTo(53787.5, -2525)
            ctx.lineTo(53787.5, -2325)
            ctx.moveTo(54187.5, -2725)
            ctx.lineTo(54187.5, -2525)
            ctx.moveTo(54587.5, -2925)
            ctx.lineTo(54587.5, -2725)
            ctx.moveTo(54987.5, -3125)
            ctx.lineTo(54987.5, -2925)
            ctx.moveTo(57500, -1925)
            ctx.lineTo(57650, -1925)
            ctx.moveTo(57520, -1845)
            ctx.lineTo(57650, -1845)
            ctx.moveTo(57500, -1925)
            ctx.lineTo(57895 + 300, -1925)
            ctx.moveTo(57520, -1845)
            ctx.lineTo(57895 + 300, -1845)
            ctx.moveTo(58525, -1725)
            ctx.lineTo(58525 + 125, -1725)
            ctx.moveTo(58525, -1625)
            ctx.lineTo(58525 + 125, -1625)
            ctx.moveTo(59000, -1725)
            ctx.lineTo(59150, -1725)
            ctx.moveTo(59150, -1625)
            ctx.lineTo(59000, -1625)
            ctx.moveTo(70875, -200)
            ctx.lineTo(70875, -100)
            ctx.moveTo(63700, -200)
            ctx.lineTo(63800, -200)
            ctx.moveTo(64000, -200)
            ctx.lineTo(64100, -200)
            ctx.moveTo(64675, -200)
            ctx.lineTo(64575, -200)
            ctx.moveTo(64875, -200)
            ctx.lineTo(64975, -200)
            ctx.moveTo(65025, -300)
            ctx.lineTo(64925, -300)
            ctx.moveTo(65225, -300)
            ctx.lineTo(65325, -300)
            ctx.moveTo(71275, -200)
            ctx.lineTo(71275, -300)
            ctx.moveTo(71675, -300)
            ctx.lineTo(71675, -400)
            ctx.moveTo(72075, -400)
            ctx.lineTo(72075, -500)
            ctx.moveTo(72425, -325)
            ctx.lineTo(72425, -425)
            ctx.moveTo(72675, -200)
            ctx.lineTo(72675, -300)
            ctx.moveTo(72925, -75)
            ctx.lineTo(72925, -175)
            ctx.moveTo(75225, -100)
            ctx.lineTo(75225, -200)
            ctx.moveTo(76600, -125)
            ctx.lineTo(76600, -225)
            ctx.moveTo(76900, -200)
            ctx.lineTo(76900, -300)
            ctx.moveTo(77175, -275)
            ctx.lineTo(77175, -375)
            ctx.moveTo(77475, -350)
            ctx.lineTo(77475, -450)
            ctx.moveTo(85575, -275)
            ctx.lineTo(85575, -375)
            ctx.moveTo(86000, -275)
            ctx.lineTo(86000, -375)
            ctx.moveTo(86275, -275)
            ctx.lineTo(86275, -375)
            ctx.moveTo(86950, -425)
            ctx.lineTo(86950, -525)
            ctx.moveTo(89700, -175)
            ctx.lineTo(89700, -75)
            ctx.moveTo(89700, -1125)
            ctx.lineTo(89700, -1225)
            ctx.moveTo(90600, -1225)
            ctx.lineTo(90600, -1125)
            ctx.moveTo(90600, -100)
            ctx.lineTo(90600, -175)
            ctx.moveTo(92000, -100)
            ctx.lineTo(92000, -175)
            ctx.moveTo(92900, -100)
            ctx.lineTo(92900, -175)
            ctx.moveTo(92900, -1225)
            ctx.lineTo(92900, -1125)
            ctx.moveTo(94500, -1475)
            ctx.lineTo(94500, -1575)
            ctx.moveTo(94700, -1475)
            ctx.lineTo(94700, -1575)
            ctx.moveTo(94900, -1475)
            ctx.lineTo(94900, -1575)
            ctx.moveTo(96125, -1500)
            ctx.lineTo(96125, -1575)
            ctx.moveTo(96550, -1575)
            ctx.lineTo(96550, -1500)
            ctx.moveTo(97000, -1475)
            ctx.lineTo(97000, -1575)

            ctx.stroke()
            ctx.beginPath()
            ctx.strokeStyle = "#FFFFFF";
            ctx.fillStyle = document.body.style.backgroundColor;
            let cycles = Math.sin(simulation.cycle * 0.15)
            ctx.moveTo(7482.5, -270)
            ctx.arc(7462.5, -270, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI);
            ctx.moveTo(7730, -350)
            ctx.arc(7710, -350, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI);
            ctx.moveTo(7980, -420)
            ctx.arc(7960, -420, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(13745, -180)
            ctx.arc(13725, -180, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(14045, -280)
            ctx.arc(14025, -280, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(14345, -380)
            ctx.arc(14325, -380, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(14645, -480)
            ctx.arc(14625, -480, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(14945, -580)
            ctx.arc(14925, -580, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(15245, -680)
            ctx.arc(15225, -680, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(15545, -780)
            ctx.arc(15525, -780, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(15845, -880)
            ctx.arc(15825, -880, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(16145, -980)
            ctx.arc(16125, -980, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(16445, -1080)
            ctx.arc(16425, -1080, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(22620, -580);
            ctx.arc(22600, -580, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(22820, -680);
            ctx.arc(22800, -680, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(23020, -780);
            ctx.arc(23000, -780, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(23220, -880);
            ctx.arc(23200, -880, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(23420, -980);
            ctx.arc(23400, -980, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(23620, -1080);
            ctx.arc(23600, -1080, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(29570, -1425)
            ctx.arc(29550, -1425, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(32295, -1925)
            ctx.arc(32275, -1925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(33795, -1925)
            ctx.arc(33775, -1925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(32295, -550)
            ctx.arc(32275, -550, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(33795, -550)
            ctx.arc(33775, -550, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(35495, -650)
            ctx.arc(35475, -650, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(37670, -1800)
            ctx.arc(37650, -1800, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(39695, -600)
            ctx.arc(39675, -600, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(40395, -700)
            ctx.arc(40375, -700, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(41095, -800)
            ctx.arc(41075, -800, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(43645, -1725)
            ctx.arc(43625, -1725, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(50995, -1125)
            ctx.arc(50975, -1125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(51407.5, -1325)
            ctx.arc(51387.5, -1325, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(51807.5, -1525)
            ctx.arc(51787.5, -1525, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(52207.5, -1725)
            ctx.arc(52187.5, -1725, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(52607.5, -1925)
            ctx.arc(52587.5, -1925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(53007.5, -2125)
            ctx.arc(52987.5, -2125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(53407.5, -2325)
            ctx.arc(53387.5, -2325, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(53807.5, -2525)
            ctx.arc(53787.5, -2525, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(54207.5, -2725)
            ctx.arc(54187.5, -2725, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(54607.5, -2925)
            ctx.arc(54587.5, -2925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(55007.5, -3125)
            ctx.arc(54987.5, -3125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(57520, -1925)
            ctx.arc(57500, -1925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(57520, -1845)
            ctx.arc(57500, -1845, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(58525, -1725)
            ctx.arc(58505, -1725, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(57895 + 300, -1925)
            ctx.arc(57875 + 300, -1925, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(57895 + 300, -1845)
            ctx.arc(57875 + 300, -1845, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(58525, -1625)
            ctx.arc(58505, -1625, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(58690 + 375 + 125, -1625)
            ctx.arc(58670 + 375 + 125, -1625, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(59190, -1725)
            ctx.arc(59170, -1725, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(70895, -200)
            ctx.arc(70875, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(63720, -200)
            ctx.arc(63700, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(64120, -200)
            ctx.arc(64100, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(64595, -200)
            ctx.arc(64575, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(64995, -200)
            ctx.arc(64975, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(64945, -300)
            ctx.arc(64925, -300, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(65345, -300)
            ctx.arc(65325, -300, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(71295, -300)
            ctx.arc(71275, -300, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(71695, -400)
            ctx.arc(71675, -400, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(72095, -500)
            ctx.arc(72075, -500, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(72445, -425)
            ctx.arc(72425, -425, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(72695, -300)
            ctx.arc(72675, -300, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(72945, -175)
            ctx.arc(72925, -175, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(75245, -200)
            ctx.arc(75225, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(76620, -125)
            ctx.arc(76600, -125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(76920, -200)
            ctx.arc(76900, -200, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(77195, -275)
            ctx.arc(77175, -275, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(77495, -350)
            ctx.arc(77475, -350, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(85595, -375)
            ctx.arc(85575, -375, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(86020, -375)
            ctx.arc(86000, -375, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(86295, -375)
            ctx.arc(86275, -375, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(86970, -525)
            ctx.arc(86950, -525, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(89720, -175)
            ctx.arc(89700, -175, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(89720, -1125)
            ctx.arc(89700, -1125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(90620, -1125)
            ctx.arc(90600, -1125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(90620, -175)
            ctx.arc(90600, -175, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(92020, -175)
            ctx.arc(92000, -175, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(92920, -175)
            ctx.arc(92900, -175, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(92920, -1125)
            ctx.arc(92900, -1125, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(94520, -1575)
            ctx.arc(94500, -1575, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(94720, -1575)
            ctx.arc(94700, -1575, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(94920, -1575)
            ctx.arc(94900, -1575, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(96145, -1575)
            ctx.arc(96125, -1575, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(96570, -1500)
            ctx.arc(96550, -1500, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.moveTo(97020, -1575)
            ctx.arc(97000, -1575, 20 * (1 + 0.1 * cycles), 0, 2 * Math.PI)
            ctx.fill()
            ctx.stroke()
            slimePit1.query()
            slimePit2.query()
            slimePit3.query()
            slimePit4.query()
            slimePit5.query()
            slimePit5.query()
            slimePit6.query()
            slimePit7.query()
            slimePit8.query()
            slimePit9.query()
            slimePit10.query()
            slimePit11.query()
            slimePit12.query()
            slimePit13.query()
            slimePit14.query()
            drip1.draw()
            drip2.draw()
            drip3.draw()
            drip4.draw()
            drip5.draw()

            ctx.fillStyle = "rgba(0,255,255,0.9)"
            ctx.fillRect(25325, -1375, 75, 400)
            ctx.fillRect(46425, -1350, 100, 500)
            ctx.fillRect(87925, -725, 75, 450)

            /*
                if (player.position.x < 46470) {
                    document.body.style.backgroundColor = "#DD00DD";
                }
            */
            if (player.position.x > 25360 && player.position.x < 46470) {
                Matter.Body.setVelocity(player, {
                    x: player.velocity.x, //+ 0.2,
                    y: player.velocity.y,
                });
                if (input.up) {
                    Matter.Body.setVelocity(player, {
                        x: player.velocity.x,
                        y: player.velocity.y, //- 1,
                    });
                }
                document.body.style.backgroundColor = "#fb3310"
            } else if (player.position.x > 46470 && player.position.x < 61675) {
                document.body.style.backgroundColor = "#7704FF"
            } else if (player.position.x > 9700 && player.position.x < 46470) {
                document.body.style.backgroundColor = "#7704FF"
            } else if (player.position.x > 61675 && player.position.x < 87950) {
                document.body.style.backgroundColor = "#DD1111"
            } else if (player.position.x > 87950) {
                document.body.style.backgroundColor = "#7704FF"
            }

            if (m.pos.y > -200 && 20350 < m.pos.x && m.pos.x < 23635) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 20250,
                    y: -1000
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
            if (m.pos.y > -150 && m.pos.x > 47770 && m.pos.x < 50130) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 47640,
                    y: -900
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
            if (m.pos.y > -150 && 50975 < m.pos.x && m.pos.x < 54925) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 50965,
                    y: -1100
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
            if (m.pos.y > -150 && 55025 < m.pos.x && m.pos.x < 57675) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 55148,
                    y: -3072
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
            if (m.pos.y > -150 && 57875 < m.pos.x && m.pos.x < 58700) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 57800,
                    y: -2200

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
            if (m.pos.y > -150 && 58875 < m.pos.x && m.pos.x < 61650) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 58850,
                    y: -2025

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
            if (m.pos.y > -1677 && 104650 < m.pos.x && m.pos.x < 105000 && barThere == true) {
                Matter.Body.setVelocity(player, {
                    x: 0,
                    y: 0
                });
                Matter.Body.setPosition(player, {
                    x: 132577,
                    y: -300

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
                document.body.style.transitionDuration = "0ms";
                document.body.style.backgroundColor = "#696969";
                simulation.inGameConsole(`<div><em>You have earned: </em><b>` + Math.min(3, totalCoin) + `</b><em> tech</em></div>`)
                if (barThere == true) { //only runs once
                    document.body.removeChild(bar);
                    for (let i = 0, len = Math.min(3, totalCoin); i < len; i++) powerUps.directSpawn(player.position.x, player.position.y, "tech");
                    barThere = false;


                }
            }
            ctx.fillStyle = "#FFFFFF53"
            ctx.fillRect(57645, -2055, 385, 85)
            ctx.fillRect(58645, -1880, 385, 85)
            //chains	
            ctx.strokeStyle = "#FF0000"
            ctx.strokeRect(66975, -725, 25, 50)
            ctx.strokeRect(67050, -725, 25, 50)
            ctx.strokeRect(66975 + 1150, -725, 25, 50)
            ctx.strokeRect(67050 + 1250, -725, 25, 50)
            ctx.strokeRect(69162, -725, 25, 50)
            ctx.strokeRect(69862, -725, 25, 50)
            ctx.strokeRect(74412.5, -412.5, 25, 50)
            ctx.strokeRect(74612.5, -412.5, 25, 50)
            ctx.strokeRect(77962.5, -900, 25, 50)
            ctx.strokeRect(78212.5, -775, 25, 50)
            ctx.strokeRect(78462.5, -650, 25, 50)
            ctx.strokeRect(81587.5, -725, 25, 50)
            ctx.strokeRect(81687.5, -725, 25, 50)
            ctx.strokeRect(81787.5, -725, 25, 50)
            ctx.strokeRect(83037.5, -215, 25, 50)
            ctx.strokeRect(83362.5, -215, 25, 50)
            ctx.strokeRect(83687.5, -215, 25, 50)
            ctx.strokeRect(84187.5, -315, 25, 50)
            ctx.strokeStyle = "#FF000088"
            ctx.strokeRect(66975, -850, 25, 50)
            ctx.strokeRect(67050, -850, 25, 50)
            ctx.strokeRect(66975 + 1150, -850, 25, 50)
            ctx.strokeRect(67050 + 1250, -850, 25, 50)
            ctx.strokeRect(69162, -850, 25, 50)
            ctx.strokeRect(69862, -850, 25, 50)
            ctx.strokeRect(74412.5, -525, 25, 50)
            ctx.strokeRect(74612.5, -525, 25, 50)
            ctx.strokeRect(77962.5, -985, 25, 50)
            ctx.strokeRect(78212.5, -860, 25, 50)
            ctx.strokeRect(78462.5, -735, 25, 50)
            ctx.strokeRect(81587.5, -850, 25, 50)
            ctx.strokeRect(81687.5, -850, 25, 50)
            ctx.strokeRect(81787.5, -850, 25, 50)
            ctx.strokeRect(83037.5, -315, 25, 50)
            ctx.strokeRect(83362.5, -315, 25, 50)
            ctx.strokeRect(83687.5, -315, 25, 50)
            ctx.strokeRect(84187.5, -415, 25, 50)
            ctx.strokeStyle = "#FF000044"
            ctx.strokeRect(66975, -975, 25, 50)
            ctx.strokeRect(67050, -975, 25, 50)
            ctx.strokeRect(66975 + 1150, -975, 25, 50)
            ctx.strokeRect(67050 + 1250, -975, 25, 50)
            ctx.strokeRect(69162, -975, 25, 50)
            ctx.strokeRect(69862, -975, 25, 50)
            ctx.strokeRect(74412.5, -633, 25, 50)
            ctx.strokeRect(74612.5, -633, 25, 50)
            ctx.strokeRect(77962.5, -1075, 25, 50)
            ctx.strokeRect(78212.5, -950, 25, 50)
            ctx.strokeRect(78462.5, -825, 25, 50)
            ctx.strokeRect(81587.5, -975, 25, 50)
            ctx.strokeRect(81687.5, -975, 25, 50)
            ctx.strokeRect(81787.5, -975, 25, 50)
            ctx.strokeRect(83037.5, -415, 25, 50)
            ctx.strokeRect(83362.5, -415, 25, 50)
            ctx.strokeRect(83687.5, -415, 25, 50)
            ctx.strokeRect(84187.5, -515, 25, 50)
            ctx.strokeStyle = "#FF000011"
            ctx.strokeRect(66975, -1100, 25, 50)
            ctx.strokeRect(67050, -1100, 25, 50)
            ctx.strokeRect(66975 + 1150, -1100, 25, 50)
            ctx.strokeRect(67050 + 1250, -1100, 25, 50)
            ctx.strokeRect(69162, -1100, 25, 50)
            ctx.strokeRect(69862, -1100, 25, 50)
            ctx.strokeRect(74412.5, -741, 25, 50)
            ctx.strokeRect(74612.5, -741, 25, 50)
            ctx.strokeRect(77962.5, -1165, 25, 50)
            ctx.strokeRect(78212.5, -1040, 25, 50)
            ctx.strokeRect(78462.5, -915, 25, 50)
            ctx.strokeRect(81587.5, -1100, 25, 50)
            ctx.strokeRect(81687.5, -1100, 25, 50)
            ctx.strokeRect(81787.5, -1100, 25, 50)
            ctx.strokeRect(83037.5, -515, 25, 50)
            ctx.strokeRect(83362.5, -515, 25, 50)
            ctx.strokeRect(83687.5, -515, 25, 50)
            ctx.strokeRect(84187.5, -615, 25, 50)
            ctx.stroke()
            ctx.beginPath()
            ctx.strokeStyle = "#FF0000"
            ctx.moveTo(66987.5, -680)
            ctx.lineTo(66987.5, -625)
            ctx.moveTo(67062.5, -680)
            ctx.lineTo(67062.5, -625)
            ctx.moveTo(66987.5 + 1150, -680)
            ctx.lineTo(66987.5 + 1150, -625)
            ctx.moveTo(67062.5 + 1250, -680)
            ctx.lineTo(67062.5 + 1250, -625)
            ctx.moveTo(69175, -680)
            ctx.lineTo(69175, -625)
            ctx.moveTo(69875, -680)
            ctx.lineTo(69875, -625)
            ctx.moveTo(74425, -290)
            ctx.lineTo(74425, -370)
            ctx.moveTo(74625, -290)
            ctx.lineTo(74625, -370)
            ctx.moveTo(77975, -790)
            ctx.lineTo(77975, -855)
            ctx.moveTo(78225, -665)
            ctx.lineTo(78225, -730)
            ctx.moveTo(78475, -540)
            ctx.lineTo(78475, -605)
            ctx.moveTo(81600, -680)
            ctx.lineTo(81600, -625)
            ctx.moveTo(81700, -680)
            ctx.lineTo(81700, -625)
            ctx.moveTo(81800, -680)
            ctx.lineTo(81800, -625)
            ctx.moveTo(83050, -100)
            ctx.lineTo(83050, -170)
            ctx.moveTo(83375, -100)
            ctx.lineTo(83375, -170)
            ctx.moveTo(83700, -100)
            ctx.lineTo(83700, -170)
            ctx.moveTo(84200, -200)
            ctx.lineTo(84200, -270)
            ctx.stroke()
            ctx.strokeStyle = "#FF000099"
            ctx.moveTo(66987.5, -810)
            ctx.lineTo(66987.5, -715)
            ctx.moveTo(67062.5, -810)
            ctx.lineTo(67062.5, -715)
            ctx.moveTo(66987.5 + 1150, -810)
            ctx.lineTo(66987.5 + 1150, -715)
            ctx.moveTo(67062.5 + 1250, -810)
            ctx.lineTo(67062.5 + 1250, -715)
            ctx.moveTo(69175, -810)
            ctx.lineTo(69175, -715)
            ctx.moveTo(69875, -810)
            ctx.lineTo(69875, -715)
            ctx.moveTo(74425, -405)
            ctx.lineTo(74425, -480)
            ctx.moveTo(74625, -405)
            ctx.lineTo(74625, -480)
            ctx.moveTo(77975, -890)
            ctx.lineTo(77975, -940)
            ctx.moveTo(78225, -765)
            ctx.lineTo(78225, -815)
            ctx.moveTo(78475, -640)
            ctx.lineTo(78475, -690)
            ctx.moveTo(81600, -810)
            ctx.lineTo(81600, -715)
            ctx.moveTo(81700, -810)
            ctx.lineTo(81700, -715)
            ctx.moveTo(81800, -810)
            ctx.lineTo(81800, -715)
            ctx.moveTo(83050, -210)
            ctx.lineTo(83050, -270)
            ctx.moveTo(83375, -210)
            ctx.lineTo(83375, -270)
            ctx.moveTo(83700, -210)
            ctx.lineTo(83700, -270)
            ctx.moveTo(84200, -310)
            ctx.lineTo(84200, -370)
            ctx.stroke()
            ctx.strokeStyle = "#FF000044"
            ctx.moveTo(66987.5, -930)
            ctx.lineTo(66987.5, -845)
            ctx.moveTo(67062.5, -930)
            ctx.lineTo(67062.5, -845)
            ctx.moveTo(66987.5 + 1150, -930)
            ctx.lineTo(66987.5 + 1150, -845)
            ctx.moveTo(67062.5 + 1250, -930)
            ctx.lineTo(67062.5 + 1250, -845)
            ctx.moveTo(69175, -930)
            ctx.lineTo(69175, -845)
            ctx.moveTo(69875, -930)
            ctx.lineTo(69875, -845)
            ctx.moveTo(74425, -515)
            ctx.lineTo(74425, -590)
            ctx.moveTo(74625, -515)
            ctx.lineTo(74625, -590)
            ctx.moveTo(77975, -975)
            ctx.lineTo(77975, -1040)
            ctx.moveTo(78225, -850)
            ctx.lineTo(78225, -915)
            ctx.moveTo(78475, -725)
            ctx.lineTo(78475, -790)
            ctx.moveTo(81600, -930)
            ctx.lineTo(81600, -845)
            ctx.moveTo(81700, -930)
            ctx.lineTo(81700, -845)
            ctx.moveTo(81800, -930)
            ctx.lineTo(81800, -845)
            ctx.moveTo(83050, -305)
            ctx.lineTo(83050, -370)
            ctx.moveTo(83375, -305)
            ctx.lineTo(83375, -370)
            ctx.moveTo(83700, -305)
            ctx.lineTo(83700, -370)
            ctx.moveTo(84200, -405)
            ctx.lineTo(84200, -470)
            ctx.stroke()
            ctx.strokeStyle = "#FF000022"
            ctx.moveTo(66987.5, -1060)
            ctx.lineTo(66987.5, -965)
            ctx.moveTo(67062.5, -1060)
            ctx.lineTo(67062.5, -965)
            ctx.moveTo(66987.5 + 1150, -1060)
            ctx.lineTo(66987.5 + 1150, -965)
            ctx.moveTo(67062.5 + 1250, -1060)
            ctx.lineTo(67062.5 + 1250, -965)
            ctx.moveTo(69175, -1060)
            ctx.lineTo(69175, -965)
            ctx.moveTo(69875, -1060)
            ctx.lineTo(69875, -965)
            ctx.moveTo(74425, -620)
            ctx.lineTo(74425, -712.5)
            ctx.moveTo(74625, -620)
            ctx.lineTo(74625, -712.5)
            ctx.moveTo(77975, -1075)
            ctx.lineTo(77975, -1120)
            ctx.moveTo(78225, -950)
            ctx.lineTo(78225, -995)
            ctx.moveTo(78475, -825)
            ctx.lineTo(78475, -870)
            ctx.moveTo(81600, -1060)
            ctx.lineTo(81600, -965)
            ctx.moveTo(81700, -1060)
            ctx.lineTo(81700, -965)
            ctx.moveTo(81800, -1060)
            ctx.lineTo(81800, -965)
            ctx.moveTo(83050, -405)
            ctx.lineTo(83050, -470)
            ctx.moveTo(83375, -405)
            ctx.lineTo(83375, -470)
            ctx.moveTo(83700, -405)
            ctx.lineTo(83700, -470)
            ctx.moveTo(84200, -505)
            ctx.lineTo(84200, -570)
            ctx.stroke()
            let star = 95525;
            for (let i = 0; i < 3; i++) {
                drawStar(star, -1540, 5, 40, 15);
                star += 200;
            }
            drawStar(97375, -1540, 5, 25, 10)
            drawStar(97675, -1540, 5, 25, 10)
            drawStar(97975, -1540, 5, 25, 10)
            drawStar(98275, -1540, 5, 25, 10)
            drawStar(98575, -1540, 5, 25, 10)

        };
        var gradient = ctx.createLinearGradient(0, 0, 175, 0);
        gradient.addColorStop(0, "#7704FF00");
        gradient.addColorStop(1, "#00FFFF");
        level.customTopLayer = () => {
            if (player.position.x > 25360 && player.position.x < 46470 && player.position.y > -2348 || player.position.x > 87995 && player.position.x < 103950 && player.position.y > -1350) {
                player.force.x += 0.0045
                m.airControl = () => {
                    if (input.up) {
                        player.force.y -= 0.02
                    }
                }
                m.draw = () => {
                    ctx.save();
                    ctx.globalAlpha = (m.immuneCycle < m.cycle) ? 1 : 0.5
                    ctx.translate(player.position.x, player.position.y);
                    ctx.rotate(player.angle);
                    if (input.up) { //forward thrust drawing
                        ctx.rotate(`${Math.max(-0.5, Math.min(m.angle, 0.5))}`)
                    } else {
                        ctx.rotate(`${Math.max(0.5, Math.min(m.angle, -0.5))}`)
                    }
                    ctx.beginPath();
                    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                    ctx.fillStyle = m.bodyGradient
                    ctx.fill();
                    ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                    ctx.strokeStyle = "#333";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.beginPath()
                    ctx.moveTo(30, 0)
                    ctx.lineTo(60, 10)
                    ctx.lineTo(60, 30)
                    ctx.lineTo(20, 40)
                    ctx.lineTo(0, 40)
                    ctx.lineTo(-50, 60)
                    ctx.lineTo(-50, 0)
                    ctx.lineTo(-40, -40)
                    ctx.lineTo(-40, -40)
                    ctx.lineTo(-30, 10)
                    ctx.lineTo(30, 10)
                    ctx.lineTo(30, 0)
                    ctx.fill();
                    ctx.moveTo(-50, 30)
                    ctx.lineTo(-60, 30)
                    ctx.lineTo(-60, 0)
                    ctx.lineTo(-50, 0)
                    ctx.fill()
                    ctx.stroke()
                    ctx.restore();
                }
            } else {
                m.resetSkin()
                m.airControl = () => {
                    if (input.up && m.buttonCD_jump + 20 < m.cycle && m.yOffWhen.stand > 23 && m.lastOnGroundCycle + 5 > m.cycle) m.jump()
                    if (m.buttonCD_jump + 60 > m.cycle && !(input.up) && m.Vy < 0) {
                        Matter.Body.setVelocity(player, {
                            x: player.velocity.x,
                            y: player.velocity.y * 0.94
                        });
                    }
                    if (input.left) {
                        if (player.velocity.x > -m.airSpeedLimit / player.mass / player.mass) player.force.x -= m.FxAir; // move player   left / a
                    } else if (input.right) {
                        if (player.velocity.x < m.airSpeedLimit / player.mass / player.mass) player.force.x += m.FxAir; //move player  right / d
                    }
                }
            }
            ctx.fillStyle = `rgba(68, 68, 68, ${Math.max(0.1, Math.min((-1400 - m.pos.y) / -100, 0.99))})`;
            ctx.fillRect(91900, -1675, 12050, 375)
            ctx.save()
            ctx.translate(104700, -1675);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 175, 1675)
            ctx.restore()
        };
        level.setPosToSpawn(0, -150); //spawn     
        level.defaultZoom = 1800 //default I think
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#0150FF";
        document.body.style.transitionDuration = "1500ms"; //smoother transitions, so that people don't complain
        level.exit.x = 133150;
        level.exit.y = -260;
        spawn.mapRect(level.exit.x, level.exit.y + 25, 100, 20);
        //ground? I forgot
        spawn.mapRect(-5000, 0, 110000, 1000);
        //*mountains to prevent player from running away*
        spawn.mapVertex(-5775, -1330, "0 0 1000 7000 -1000 7000");
        spawn.mapVertex(-7000, -330, "0 0 1000 4000 -1000 4000");
        spawn.mapVertex(-10000, -330, "0 0 1000 4000 -1000 4000");
        spawn.mapVertex(-9000, -330, "0 0 1000 4000 -1000 4000");
        spawn.mapVertex(-7500, -330, "0 0 1000 4000 -1000 4000");
        spawn.mapRect(-10000, 0, 3500, 1000);
        //spawn.mapRect(-10000, -10000, 1000, 11000);
        //hunter(-600, -150) 
        //stage one --> 0%
        //spikes
        spike(3000, -30);
        spike(5000, -30);
        spike(4925, 0);
        spike(7275, -30);
        spike(7375, -30);
        spike(9806, -30);
        spike(9900, -30);
        spike(12000, -130);
        spike(13050, -255);
        spike(17300, -1105);
        spike(17400, -1105);
        spike(17200, -1105);
        spike(17500, -1105);
        spike(18200, -1105);
        spike(18100, -1105);
        spike(18300, -1105);
        spike(18400, -1105);
        spike(19875, -1108);
        spike(19975, -930);
        spike(21000, -930);
        spike(21725, -780);
        spike(23600, -1230);
        spawn.mapVertex(62000, -300, "0 1000 1000 1000 0 0");
        //upside down spikes
        let u = Math.PI * 1.5;
        spike(18825, -1170, u);
        spike(18925, -1170, u);
        spike(19025, -1170, u);
        spike(19125, -1170, u);
        spike(19225, -1170, u);
        spike(19325, -1170, u);
        spike(49962.5, -2370, u);
        spike(50062.5, -2370, u);
        spike(50162.5, -2370, u);
        spike(50262.5, -2370, u);
        spike(50362.5, -2370, u);
        //bottom of the flying part
        spike(32375, -280);
        spike(32475, -280);
        spike(32575, -280);
        spike(32675, -280);
        spike(32775, -280);
        spike(32875, -280);
        spike(32975, -280);
        spike(33075, -280);
        spike(33175, -280);
        spike(33275, -280);
        spike(33375, -280);
        spike(33475, -280);
        spike(33575, -280);
        spike(33675, -280);
        spike(35575, -280);
        spike(35675, -280);
        spike(35775, -280);
        spike(35875, -280);
        spike(39775, -280);
        spike(39875, -280);
        spike(39975, -280);
        spike(40075, -280);
        spike(40175, -280);
        spike(40275, -280);
        spike(40475, -280);
        spike(40575, -280);
        spike(40675, -280);
        spike(40775, -280);
        spike(40875, -280);
        spike(40975, -280);
        //top of the flying part
        spike(32375, -2193, u);
        spike(32475, -2193, u);
        spike(32575, -2193, u);
        spike(32675, -2193, u);
        spike(32775, -2193, u);
        spike(32875, -2193, u);
        spike(32975, -2193, u);
        spike(33075, -2193, u);
        spike(33175, -2193, u);
        spike(33275, -2193, u);
        spike(33375, -2193, u);
        spike(33475, -2193, u);
        spike(33575, -2193, u);
        spike(33675, -2193, u);
        spike(37750, -2193, u);
        spike(37850, -2193, u);
        spike(37950, -2193, u);
        spike(38050, -2193, u);
        spike(43025, -2193, u);
        spike(43125, -2193, u);
        spike(43225, -2193, u);
        spike(43325, -2193, u);
        spike(43425, -2193, u);
        spike(43525, -2193, u);
        spike(43725, -2193, u);
        spike(43825, -2193, u);
        spike(43925, -2193, u);
        spike(44025, -2193, u);
        spike(44125, -2193, u);
        spike(44225, -2193, u);
        spike(44325, -2193, u);
        spike(44425, -2193, u);
        spike(44525, -2193, u);
        spike(44625, -2193, u);
        spike(44725, -2193, u);
        spike(44825, -2193, u);
        //about 55% of the map 
        spike(63375, -30);
        spike(63475, -30);
        spike(65775, -30);
        spike(65875, -30);
        spike(66975, -30);
        spike(67075, -30);
        spike(66975, -500, u);
        spike(67075, -500, u);
        spike(68125, -30);
        spike(68225, -30);
        spike(68325, -30);
        spike(68125, -500, u);
        spike(68225, -500, u);
        spike(68325, -500, u);
        spike(69175, -500, u);
        spike(69175, -30);
        spike(69875, -500, u);
        spike(69875, -30);
        spike(70675, -30);
        spike(70775, -30);
        spike(73725, -30);
        spike(73825, -30);
        spike(74425, -195, u);
        spike(74525, -195, u);
        spike(74625, -195, u);
        spike(75125, -30);
        spawn.mapVertex(78725, -466, "0 50 100 50 50 0"); //ocd still triggers from -467
        spike(79300, -180);
        spike(80800, -30);
        spike(80900, -30);
        spike(81600, -30);
        spike(81700, -30);
        spike(81800, -30);
        spike(81600, -500, u);
        spike(81700, -500, u);
        spike(81800, -500, u);
        spike(93425, -1430);
        spike(93525, -1430);
        spike(85800, -305);
        spike(86475, -305);
        spike(87150, -455);
        spike(94025, -1570, u);
        spike(94125, -1570, u);
        spike(94500, -1430);
        spike(94700, -1430);
        spike(94900, -1430);
        spike(94600, -1400);
        spike(94800, -1400);
        spike(94212.5, -1675, u);
        spike(94287.5, -1675, u);
        //even more 90%
        spike(95525, -1400)
        spike(95525, -1675, u)
        spike(95625, -1400)
        spike(95625, -1675, u)
        spike(95725, -1400)
        spike(95725, -1675, u)
        spike(95825, -1400)
        spike(95825, -1675, u)
        spike(95925, -1400)
        spike(95925, -1675, u)
        spike(96025, -1400)
        spike(96225, -1400)
        spike(96650, -1675, u)
        spike(96900, -1400)
        spike(97150, -1675, u)
        spike(98900, -1400)
        spike(96975, -155)
        spike(97075, -155)
        spike(97175, -155)
        spike(97275, -155)
        spike(97375, -155)
        spike(97475, -155)
        spike(96975, -1170, u)
        spike(97075, -1170, u)
        spike(97175, -1170, u)
        spike(97275, -1170, u)
        spike(97375, -1170, u)
        spike(97475, -1170, u)
        spike(98700, -1070, u)
        spike(98800, -1070, u)
        spike(98900, -1070, u)
        spike(99000, -1070, u)
        spike(99100, -1070, u)
        spike(99200, -1070, u)
        spike(98700, -230)
        spike(98800, -230)
        spike(98900, -230)
        spike(99000, -230)
        spike(99100, -230)
        spike(99200, -230)
        spike(98975, -1400)
        spike(99375, -1675, u)
        spike(99300, -1675, u)
        spike(99575, -1675, u)
        spike(100000, -1400)
        //actual stuff
        spawn.mapRect(7425, -175, 75, 175);
        spawn.mapRect(7675, -250, 75, 250);
        spawn.mapRect(7925, -325, 75, 325);
        spawn.mapRect(10625, -100, 725, 100);
        spawn.mapRect(11625, -100, 725, 100);
        spawn.mapRect(12650, -225, 800, 225);
        spawn.mapRect(13675, -300, 100, 50);
        spawn.mapRect(13975, -400, 100, 50);
        spawn.mapRect(14275, -500, 100, 50);
        spawn.mapRect(14575, -600, 100, 50);
        spawn.mapRect(14875, -700, 100, 50);
        spawn.mapRect(15175, -800, 100, 50);
        spawn.mapRect(15475, -900, 100, 50);
        spawn.mapRect(15775, -1000, 100, 50);
        spawn.mapRect(16075, -1100, 100, 50);
        spawn.mapRect(16375, -1200, 100, 50);
        spawn.mapRect(16625, -1075, 350, 100);
        spawn.mapRect(16800, -1075, 1825, 1125);
        spawn.mapRect(17250, -1225, 200, 50);
        spawn.mapRect(18150, -1225, 200, 50);
        spawn.mapRect(18550, -975, 1050, 1025);
        spawn.mapRect(19525, -1075, 400, 1125);
        spawn.mapRect(18775, -1275, 600, 75);
        spawn.mapRect(19825, -900, 500, 950);
        spawn.mapRect(20150, -900, 375, 125);
        spawn.mapRect(20750, -900, 300, 50);
        spawn.mapRect(21225, -750, 550, 50);
        spawn.mapRect(21950, -625, 450, 50);
        spawn.mapRect(22550, -700, 100, 50);
        spawn.mapRect(22750, -800, 100, 50);
        spawn.mapRect(22950, -900, 100, 50);
        spawn.mapRect(23150, -1000, 100, 50);
        spawn.mapRect(23350, -1100, 100, 50);
        spawn.mapRect(23550, -1200, 100, 50);
        spawn.mapRect(23525, -975, 400, 100);
        spawn.mapRect(23650, -975, 1825, 1025);
        spawn.mapRect(23750, -2500, 625, 1125);
        spawn.mapRect(24000, -2500, 1200, 1300);
        spawn.mapRect(24900, -2500, 575, 1125);
        spawn.mapRect(25425, -2500, 20000, 275);
        spawn.mapRect(25425, -250, 20000, 300);
        spawn.mapRect(29450, -2300, 200, 675);
        spawn.mapRect(32225, -2225, 100, 100);
        spawn.mapRect(33725, -2225, 100, 100);
        spawn.mapRect(32225, -350, 100, 100);
        spawn.mapRect(33725, -350, 100, 100);
        spawn.mapRect(37600, -2225, 100, 225);
        spawn.mapRect(35425, -475, 100, 225);
        spawn.mapRect(39625, -400, 100, 150);
        spawn.mapRect(40325, -500, 100, 250);
        spawn.mapRect(41025, -600, 100, 350);
        spawn.mapRect(43575, -2225, 100, 300);
        spawn.mapRect(44875, -2500, 1675, 1225);
        spawn.mapRect(44875, -950, 1675, 1000);
        spawn.mapRect(46425, -825, 1400, 875);
        spawn.mapRect(48075, -1100, 175, 1150);
        spawn.mapRect(48575, -1300, 175, 1375);
        spawn.mapRect(49075, -1500, 175, 1550);
        spawn.mapRect(49575, -1700, 175, 975);
        spawn.mapRect(49575, -500, 175, 550);
        spawn.mapRect(50075, -1900, 175, 700);
        spawn.mapRect(50075, -1000, 1000, 1000);
        spawn.mapRect(49912.5, -2525, 500, 125);
        spawn.mapRect(51300, -1200, 175, 1225);
        spawn.mapRect(51700, -1400, 175, 1425);
        spawn.mapRect(52100, -1600, 175, 1625);
        spawn.mapRect(52500, -1800, 175, 1825);
        spawn.mapRect(52900, -2000, 175, 2025);
        spawn.mapRect(53300, -2200, 175, 2225);
        spawn.mapRect(53700, -2400, 175, 2425);
        spawn.mapRect(54100, -2600, 175, 2625);
        spawn.mapRect(54500, -2800, 175, 2825);
        spawn.mapRect(54900, -3000, 175, 3025);
        spawn.mapRect(55050, -3000, 175, 75);
        spawn.mapRect(55475, -2875, 250, 75);
        spawn.mapRect(55900, -2625, 250, 75);
        spawn.mapRect(56500, -2400, 375, 75);
        spawn.mapRect(57200, -2200, 250, 75);
        spawn.mapRect(57650, -2050, 375, 75);
        spawn.mapRect(57650, -1970, 375, 1975);
        spawn.mapRect(58650, -1875, 375, 75);
        spawn.mapRect(58650, -1795, 375, 1975);
        spawn.mapRect(59525, -1750, 175, 75);
        spawn.mapRect(60125, -1600, 175, 75);
        spawn.mapRect(60750, -1425, 175, 75);
        spawn.mapRect(61250, -1225, 175, 75);
        spawn.mapRect(61550, -1025, 225, 1125);
        spawn.mapRect(63525, -100, 100, 100);
        spawn.mapRect(63800, -225, 200, 50);
        spawn.mapRect(64175, -100, 100, 100);
        spawn.mapRect(64275, -100, 100, 100);
        spawn.mapRect(64375, -100, 100, 100);
        spawn.mapRect(64675, -225, 200, 50);
        spawn.mapRect(65025, -325, 200, 50);
        spawn.mapRect(65425, -100, 300, 100);
        spawn.mapRect(66925, -650, 200, 120);
        spawn.mapRect(68075, -650, 300, 120);
        spawn.mapRect(69125, -650, 100, 120);
        spawn.mapRect(69825, -650, 100, 120);
        spawn.mapRect(70825, -100, 100, 100);
        spawn.mapRect(71225, -200, 100, 200);
        spawn.mapRect(71625, -300, 100, 300);
        spawn.mapRect(72025, -400, 100, 400);
        spawn.mapRect(72125, -400, 100, 50);
        spawn.mapRect(72375, -325, 100, 50);
        spawn.mapRect(72625, -200, 100, 50);
        spawn.mapRect(72875, -75, 100, 50);
        spawn.mapRect(74375, -300, 300, 75);
        spawn.mapRect(75175, -100, 100, 100);
        spawn.mapRect(75900, -150, 400, 50);
        spawn.mapRect(76550, -250, 100, 50);
        spawn.mapRect(76850, -325, 100, 50);
        spawn.mapRect(77125, -400, 100, 50);
        spawn.mapRect(77425, -475, 300, 50);
        spawn.mapRect(77925, -400, 100, 100);
        spawn.mapRect(78175, -275, 100, 100);
        spawn.mapRect(78425, -150, 100, 100);
        spawn.mapRect(78675, -50, 100, 100);
        spawn.mapRect(77925, -800, 100, 100);
        spawn.mapRect(78175, -675, 100, 100);
        spawn.mapRect(78425, -550, 100, 100);
        spawn.mapRect(78675, -450, 100, 100);
        spawn.mapRect(78450, -100, 50, 125);
        spawn.mapRect(79025, -150, 100, 50);
        spawn.mapRect(79250, -150, 100, 50);
        spawn.mapRect(79475, -150, 100, 50);
        spawn.mapRect(79800, -225, 300, 50);
        spawn.mapRect(80250, -150, 100, 50);
        spawn.mapRect(80450, -100, 300, 50);
        spawn.mapRect(81550, -650, 300, 120);
        spawn.mapRect(82800, -100, 100, 100);
        spawn.mapRect(82900, -100, 200, 50);
        spawn.mapRect(83325, -100, 100, 50);
        spawn.mapRect(83650, -100, 200, 50);
        spawn.mapRect(83850, -100, 100, 100);
        spawn.mapRect(83950, -200, 100, 200);
        spawn.mapRect(84050, -200, 200, 50);
        spawn.mapRect(84500, -350, 100, 50);
        spawn.mapRect(84725, -250, 100, 50);
        spawn.mapRect(84950, -150, 300, 50);
        spawn.mapRect(85525, -275, 100, 50);
        spawn.mapRect(85750, -275, 100, 50);
        spawn.mapRect(85950, -275, 375, 50);
        spawn.mapRect(86425, -275, 100, 50);
        spawn.mapRect(86625, -275, 100, 50);
        spawn.mapRect(86900, -425, 300, 50);
        spawn.mapRect(87375, -275, 300, 50);
        spawn.mapRect(87900, -300, 125, 300);
        spawn.mapRect(87900, -1850, 125, 1150);
        spawn.mapRect(87900, -1850, 17000, 175);
        spawn.mapRect(104875, -1850, 125, 2850); //Last part
        spawn.mapRect(87900, -1850, 4000, 550);
        spawn.mapRect(89650, -100, 100, 100);
        spawn.mapRect(89750, -200, 100, 100);
        spawn.mapRect(89850, -300, 600, 100);
        spawn.mapRect(90450, -200, 100, 100);
        spawn.mapRect(90550, -100, 100, 100);
        spawn.mapRect(89650, -1300, 100, 100);
        spawn.mapRect(89750, -1200, 100, 100);
        spawn.mapRect(89850, -1100, 600, 100);
        spawn.mapRect(90450, -1200, 100, 100);
        spawn.mapRect(90550, -1300, 100, 100);
        spawn.mapRect(91950, -100, 100, 100);
        spawn.mapRect(92050, -200, 100, 100);
        spawn.mapRect(92150, -300, 600, 100);
        spawn.mapRect(92750, -200, 100, 100);
        spawn.mapRect(92850, -100, 100, 100);
        spawn.mapRect(92050, -1200, 100, 100);
        spawn.mapRect(92150, -1100, 600, 100);
        spawn.mapRect(92750, -1200, 100, 100);
        spawn.mapRect(92850, -1300, 100, 100);
        spawn.mapRect(92950, -1400, 11000, 100);
        spawn.mapRect(93975, -1700, 200, 100);
        spawn.mapRect(96075, -1500, 100, 100);
        spawn.mapRect(96500, -1675, 100, 100);
        spawn.mapRect(96950, -1490, 1900, 100);
        spawn.mapRect(97200, -1685, 1650, 100);
        spawn.mapRect(93900, -300, 100, 300);
        spawn.mapRect(93900, -400, 300, 100);
        spawn.mapRect(94100, -300, 100, 300);
        spawn.mapRect(95025, -1300, 100, 300);
        spawn.mapRect(95025, -1000, 300, 100);
        spawn.mapRect(95225, -1300, 100, 300);
        spawn.mapRect(96925, -1300, 600, 100);
        spawn.mapRect(96925, -125, 600, 125);
        spawn.mapRect(98650, -1300, 100, 200);
        spawn.mapRect(98650, -1200, 600, 100);
        spawn.mapRect(99150, -1300, 100, 200);
        spawn.mapRect(98650, -200, 100, 200);
        spawn.mapRect(99150, -200, 100, 200);
        spawn.mapRect(98650, -200, 600, 100);
        spawn.mapRect(100825, -1300, 100, 300);
        spawn.mapRect(100825, -1100, 1325, 100);
        spawn.mapRect(102050, -1300, 100, 300);
        spawn.mapRect(100825, -300, 100, 300);
        spawn.mapRect(100825, -300, 1350, 100);
        spawn.mapRect(102075, -300, 100, 300);
        spawn.mapRect(99425, -1675, 100, 125);
        spawn.mapRect(100050, -1525, 100, 125);

        spawn.mapRect(132025, -225, 2325, 525);
        spawn.mapRect(132025, -1450, 500, 1750);
        spawn.mapRect(133875, -1475, 475, 1775);
        spawn.mapRect(132025, -1925, 2325, 475);

        // simulation.enableConstructMode() //also remove when done
        coin(50165.9, -1090)
        coin(78725.4, -600)
        coin(103830.0, -1473)
        hunter(0, -1000)
    },
    yingYang() {
        simulation.inGameConsole(`<strong>yingYang</strong> by <span class='color-var'>Richard0820</span>`);

        let destroyed = false;
        const lock = level.door(425, -1400, 50, 300, 300);
        const core = function (x, y, radius = 100 + Math.ceil(Math.random() * 25)) {
            radius = 9 + radius / 8; //extra small
            mobs.spawn(x, y, 6, radius, "transparent");
            let me = mob[mob.length - 1];
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
            me.stroke = "transparent"; //used for drawSneaker
            me.eventHorizon = radius * 40;
            me.seeAtDistance2 = (me.eventHorizon + 400) * (me.eventHorizon + 400); //vision limit is event horizon
            me.accelMag = 0.00012 * simulation.accelScale;
            me.frictionAir = 0.025;
            me.collisionFilter.mask = cat.player | cat.bullet //| cat.body
            me.showHealthBar = false;
            me.memory = Infinity;
            me.isBoss = true;
            Matter.Body.setDensity(me, 1); //extra dense //normal is 0.001 //makes effective life much larger
            me.onDeath = function () {
                destroyed = true;
                powerUps.spawnBossPowerUp(this.position.x, this.position.y);
            }
            me.do = function () {
                if (this.health < 1) {
                    this.health += 0.001; //regen
                    simulation.drawList.push({
                        x: this.position.x,
                        y: this.position.y,
                        radius: this.radius / 1.5,
                        color: `rgba(0, 255, 20, ${Math.random() * 0.1})`,
                        time: simulation.drawTime
                    });
                }
                this.curl()
                this.repelBullets()
                this.seePlayerCheckByDistance()
                this.checkStatus();
                const eventHorizon = this.eventHorizon * (0.93 + 0.17 * Math.sin(simulation.cycle * 0.011))
                //draw darkness
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.25, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(250,250,250,0.9)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon * 0.55, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(250,250,250,0.5)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, eventHorizon, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(250,250,250,0.1)";
                ctx.fill();
                //when player is inside event horizon
                if (Vector.magnitude(Vector.sub(this.position, player.position)) < eventHorizon) {
                    if (m.immuneCycle < m.cycle) {
                        if (m.energy > 0) m.energy -= 0.005
                        if (m.energy < 0.1) m.takeDamage(0.0001 * spawn.dmgToPlayerByLevelsCleared());
                    }
                    const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                    player.force.x += 0.00125 * player.mass * Math.cos(angle) * (m.onGround ? 1.8 : 1);
                    player.force.y += 0.0001 * player.mass * Math.sin(angle);
                    //draw line to player
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    ctx.lineTo(m.pos.x, m.pos.y);
                    ctx.lineWidth = Math.min(60, this.radius * 2);
                    ctx.strokeStyle = "rgba(250,250,250,0.5)";
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(m.pos.x, m.pos.y, 40, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(250,250,250,0.3)";
                    ctx.fill();
                }
            }
        }
        const sniper = function (x, y, radius = 35 + Math.ceil(Math.random() * 30)) { //same, just white so that we can seen
            mobs.spawn(x, y, 3, radius, "transparent"); //"rgb(25,0,50)")
            let me = mob[mob.length - 1];
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
            me.isVerticesChange = true
            // Matter.Body.rotate(me, Math.PI)
            me.stroke = "transparent"; //used for drawSneaker
            me.alpha = 1; //used in drawSneaker
            me.showHealthBar = false;
            me.frictionStatic = 0;
            me.friction = 0;
            me.canTouchPlayer = false; //used in drawSneaker
            me.isBadTarget = true;
            me.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player

            me.memory = 30 //140;
            me.fireFreq = 0.005 + Math.random() * 0.002 + 0.0005 * simulation.difficulty; //larger = fire more often
            me.noseLength = 0;
            me.fireAngle = 0;
            me.accelMag = 0.0005 * simulation.accelScale;
            me.frictionAir = 0.05;
            me.torque = 0.0001 * me.inertia;
            me.fireDir = {
                x: 0,
                y: 0
            };
            me.onDeath = function () { //helps collisions functions work better after vertex have been changed
                // this.vertices = Matter.Vertices.hull(Matter.Vertices.clockwiseSort(this.vertices))
            }
            // spawn.shield(me, x, y);
            me.do = function () {
                // this.seePlayerByLookingAt();
                this.seePlayerCheck();
                this.checkStatus();

                const setNoseShape = () => {
                    const mag = this.radius + this.radius * this.noseLength;
                    this.vertices[1].x = this.position.x + Math.cos(this.angle) * mag;
                    this.vertices[1].y = this.position.y + Math.sin(this.angle) * mag;
                };
                //throw a mob/bullet at player
                if (this.seePlayer.recall) {
                    //set direction to turn to fire
                    if (!(simulation.cycle % this.seePlayerFreq)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        // this.fireDir.y -= Math.abs(this.seePlayer.position.x - this.position.x) / 1600; //gives the bullet an arc
                    }
                    //rotate towards fireAngle
                    const angle = this.angle + Math.PI / 2;
                    // c = Math.cos(angle) * this.fireDir.x + Math.sin(angle) * this.fireDir.y;
                    //rotate towards fireAngle
                    const dot = Vector.dot({
                        x: Math.cos(angle),
                        y: Math.sin(angle)
                    }, this.fireDir)
                    const threshold = 0.03;
                    if (dot > threshold) {
                        this.torque += 0.000004 * this.inertia;
                    } else if (dot < -threshold) {
                        this.torque -= 0.000004 * this.inertia;
                    } else if (this.noseLength > 1.5 && dot > -0.2 && dot < 0.2) {
                        //fire
                        spawn.sniperBullet(this.vertices[1].x, this.vertices[1].y, 7 + Math.ceil(this.radius / 15), 5);
                        const v = 10 + 8 * simulation.accelScale;
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v + Math.random(),
                            y: this.velocity.y + this.fireDir.y * v + Math.random()
                        });
                        this.noseLength = 0;
                        // recoil
                        this.force.x -= 0.005 * this.fireDir.x * this.mass;
                        this.force.y -= 0.005 * this.fireDir.y * this.mass;
                    }
                    if (this.noseLength < 1.5) this.noseLength += this.fireFreq;
                    setNoseShape();
                } else if (this.noseLength > 0.1) {
                    this.noseLength -= this.fireFreq / 2;
                    setNoseShape();
                }
                // else if (this.noseLength < -0.1) {
                //   this.noseLength += this.fireFreq / 4;
                //   setNoseShape();
                // }

                if (this.seePlayer.recall) {
                    if (this.alpha < 1) this.alpha += 0.01;
                } else {
                    if (this.alpha > 0) this.alpha -= 0.03;
                }
                //draw
                if (this.alpha > 0) {
                    if (this.alpha > 0.95) {
                        if (this.seePlayer.recall) this.healthBar1()
                        if (!this.canTouchPlayer) {
                            this.canTouchPlayer = true;
                            this.isBadTarget = false;
                            this.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob; //can touch player
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
                    ctx.fillStyle = `rgba(250,250,250,${this.alpha * this.alpha})`;
                    ctx.fill();
                } else if (this.canTouchPlayer) {
                    this.canTouchPlayer = false;
                    this.isBadTarget = true
                    this.collisionFilter.mask = cat.map | cat.body | cat.bullet | cat.mob //can't touch player
                }
            };
        }
        const portal = level.portal({
            x: 650,
            y: -1000
        }, Math.PI * 1.5, {
            x: 525,
            y: 2625
        }, -Math.PI)
        document.body.style.transition = '0ms'
        document.body.style.backgroundColor = "#061026" //"#061026";

        var yy = new Image();
        yy.src = 'https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/Hotpot6.png';
        color.map = "#FFFFFF11";
        color.bullet = "#FFFFFF";
        let hasAttemptedDraw = false
        level.custom = () => {
            level.enter.draw();
            level.exit.drawAndCheck();
            if (!hasAttemptedDraw) {
                try {
                    ctx.drawImage(yy, 0 - 500, 0 - 500, 1000, 1000)
                } catch (err) {
                    simulation.inGameConsole(`<strong style='color:red'>ERROR:</strong> ${err.name}.
                        <em>${err.message.replace(/\n/g, "<br>")}</em>`)
                } finally {
                    hasAttemptedDraw = true
                }
            }
            portal[0].draw();
            portal[1].draw();
            portal[2].query();
            portal[3].query();
            if (destroyed == false) {
                lock.isClosing = true;
            } else {
                lock.isClosing = false;
            }
            lock.openClose();

        };
        level.customTopLayer = () => {
            lock.draw()
            /*
            ctx.beginPath()
            ctx.strokeStyle = "transparent";
            ctx.fillStyle = "#FFFFFF22"
            ctx.arc(m.pos.x, m.pos.y, 500, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = "#FFFFFF55"
            ctx.arc(m.pos.x, m.pos.y, 1000, 0, Math.PI * 2)
            ctx.fill();
            ctx.stroke(); */
            ctx.beginPath();
            ctx.moveTo(m.pos.x, m.pos.y)
            const arc = Math.PI / 4
            ctx.arc(m.pos.x, m.pos.y, 100, m.angle + arc, m.angle - arc)
            ctx.arc(m.pos.x, m.pos.y, 4000, m.angle - arc, m.angle + arc)
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.globalCompositeOperation = "destination-in";
            ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            ctx.clip();
        };
        level.setPosToSpawn(0, -50);
        level.exit.x = -275;
        level.exit.y = 2900;
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        //map
        spawn.mapRect(-125, -325, 225, 25);
        spawn.mapRect(300, -150, 25, 325);
        spawn.mapRect(-325, -125, 25, 300);
        spawn.mapRect(-150, 300, 275, 25);
        spawn.mapRect(125, -300, 25, 25);
        spawn.mapRect(175, -275, 25, 25);
        spawn.mapRect(225, -250, 25, 25);
        spawn.mapRect(250, -200, 25, 25);
        spawn.mapRect(-175, -300, 25, 25);
        spawn.mapRect(-225, -275, 25, 25);
        spawn.mapRect(-300, -200, 25, 25);
        spawn.mapRect(150, 275, 25, 25);
        spawn.mapRect(200, 225, 25, 25);
        spawn.mapRect(250, 200, 25, 25);
        spawn.mapRect(250, -225, 25, 25);
        spawn.mapRect(275, -175, 25, 25);
        spawn.mapRect(200, -275, 25, 25);
        spawn.mapRect(150, -300, 25, 25);
        spawn.mapRect(100, -325, 25, 25);
        spawn.mapRect(-150, -300, 25, 25);
        spawn.mapRect(-200, -300, 25, 25);
        spawn.mapRect(-250, -250, 25, 25);
        spawn.mapRect(-275, -225, 25, 25);
        spawn.mapRect(-300, -175, 25, 50);
        spawn.mapRect(275, 175, 25, 25);
        spawn.mapRect(250, 200, 25, 25);
        spawn.mapRect(225, 225, 25, 25);
        spawn.mapRect(175, 250, 25, 25);
        spawn.mapRect(125, 300, 25, 25);
        spawn.mapRect(-300, 325, 200, 150);
        spawn.mapRect(-400, 425, 225, 150);
        spawn.mapRect(-4450, 2900, 1550, 150);
        spawn.mapRect(-4500, 2525, 150, 525);
        spawn.mapRect(-4800, 2150, 150, 400);
        spawn.mapRect(-4400, 2025, 650, 150);
        spawn.mapRect(-2425, 50, 2125, 150);
        spawn.mapRect(-2425, 50, 150, 1300);
        spawn.mapRect(-4600, 1175, 2325, 175);
        spawn.mapRect(-5075, 1650, 450, 150);
        spawn.mapRect(-4650, 1225, 75, 125);
        spawn.mapRect(-4700, 1275, 75, 75);
        spawn.mapRect(-425, 2925, 425, 125);
        spawn.mapRect(-450, 2375, 450, 100);
        spawn.mapRect(-3050, 550, 150, 450);
        spawn.mapRect(-2925, 825, 100, 175);
        spawn.mapRect(-2650, 375, 275, 125);
        spawn.mapRect(-75, 2950, 300, 100);
        spawn.mapRect(-625, -500, 125, 575);
        spawn.mapRect(-1050, -325, 275, 100);
        spawn.mapRect(-1075, -775, 100, 550);
        spawn.mapRect(-1075, -775, 300, 100);
        spawn.mapRect(-525, -1100, 1025, 625);
        spawn.mapRect(450, -1000, 450, 1500);
        spawn.mapRect(-300, 500, 1200, 75);
        spawn.mapRect(-200, 425, 725, 100);
        spawn.mapRect(525, 2450, 275, 600);
        spawn.mapRect(-25, 2375, 825, 125);
        spawn.mapRect(400, -1500, 500, 100);
        spawn.mapRect(800, -1500, 100, 525);
        spawn.mapRect(-400, 500, 1250, 1900);
        spawn.mapRect(-300, 2910, 150, 25);
        spawn.mapRect(-625, -1000, 125, 175);
        spawn.spawnStairs(-400, 3000, 25, 2500, 2500, 250);
        spawn.spawnStairs(500, 3000, 5, 250, 250, 250);
        spawn.debris(-1550, -250, 100);
        spawn.debris(-1100, 850, 100);
        spawn.debris(-3700, 1025, 100);
        spawn.debris(-3525, 2725, 100);
        spawn.debris(-4750, 2050, 100);
        spawn.debris(-4000, 1900, 100);
        spawn.debris(225, -1225, 100);

        //mobs
        spawn.sneaker(-1350, 1350);
        spawn.sneaker(-2275, 2275);
        sniper(-3050 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100), 1475 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100));
        sniper(-2925 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100), 1775 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100));
        sniper(-3075 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100), 1600 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100));
        sniper(-3100 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100), 1975 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100));
        sniper(-3075 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100), 1750 + Math.floor(Math.random() * 100) - Math.floor(Math.random() * 100));
        sniper(-3350, 425);
        sniper(-3550, 600);
        sniper(-3325, 775);
        sniper(-5525, 1975);
        sniper(-50, -1300);
        for (let i = 0; i < 10 + simulation.difficulty; i++) {
            spawn.ghoster(0 + Math.floor(Math.random() * 5000) - Math.floor(Math.random() * 5000), 0 + Math.floor(Math.random() * 5000) - Math.floor(Math.random() * 5000))
        }
        core(-2000, -1000);
        powerUps.spawnStartingPowerUps(0, 0)
        powerUps.addResearchToLevel()
    },
    staircase() {
        simulation.inGameConsole(`<strong>staircase</strong> by <span class='color-var'>ryanbear</span>`);

        level.custom = () => {
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            aaa.query();
            bbb.query();
            ccc.query();
            ddd.move();
            eee.query();
            fff.query();
            ggg.query();
            hhh.query();
            iii.query();
            jjj.query();
            kk.query();
            lll.query();
            mmm.query();
            nnn.query();
            ooo.query();
            ppp.query();
        };
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 7300;
        level.exit.y = -5154;
        //        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";
        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level

        spawn.mapRect(-100, 0, 2100, 100);
        spawn.mapRect(1984, 17, 100, 500);
        spawn.mapRect(2013, 522, 1618, 100);
        spawn.bodyRect(2090, 328, 100, 100);

        spawn.mapRect(3619, 14, 100, 500)
        var aaa = level.hazard(1999, 10, 1618, 500);
        var bbb = level.vanish(2320, -345, 234, 20);
        var ccc = level.vanish(2862, -324, 234, 20);
        var eee = level.vanish(3002, -1100, 234, 20);
        var ddd = level.elevator(3399, -420, 200, 200, -950, 0.003, { up: 0.1, down: 0.2 }) //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        var fff = level.vanish(3359, -1300, 234, 20);
        var ggg = level.boost(3020, -1600, 700);
        var hhh = level.vanish(2700, -1940, 1147, 20);
        var iii = level.boost(5038, -2000, 700);
        var jjj = level.vanish(5092, -3498, 100, 100);
        var kk = level.boost(5092, -3772, 700);
        var lll = level.boost(5372, -2824, 700);
        var mmm = level.vanish(5112, -3000, 100, 100);
        var nnn = level.vanish(5367, -3000, 100, 100);
        var ooo = level.boost(4810, -3161, 700);
        var ppp = level.vanish(5383, -3485, 100, 100);
        spawn.mapRect(5377, -4198, 1000, 100);
        spawn.mapRect(6390, -4359, 200, 200);
        spawn.mapRect(6605, -4563, 200, 200);
        spawn.mapRect(6809, -4758, 200, 200);
        spawn.mapRect(7014, -4962, 200, 200);
        spawn.mapRect(7212, -5158, 200, 200);



        spawn.mapRect(4156, -1898, 1000, 100);
        // spawn.bodyRect(1540, -1110, 300, 25, 0.9); 
        // spawn.randomSmallMob(1300, -70);
        spawn.randomMob(590, -315);
        spawn.randomMob(1343, -757);
        spawn.randomMob(4037, -926);
        spawn.randomMob(3621, -2376);
        spawn.randomMob(5026, -2441);
        spawn.randomMob(4253, -2863);
        spawn.randomMob(4355, -2430);
        spawn.randomMob(5316, -3265);
        spawn.randomMob(5885, -4427);
        spawn.randomMob(6666, -4979);



        spawn.laserBoss(6128, -4905);

        // spawn.randomGroup(1700, -900, 0.4);
        // if (simulation.difficulty > 1) spawn.randomLevelBoss(2200, -1300);
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    buttonbutton() {
        simulation.inGameConsole(`<strong>buttonbutton</strong> by <span class='color-var'>||Destabilized E||</span>`);
        const mover = level.mover(1425, -1949, 600, 25); //x,y,width.height,VxGoal,force

        let portal
        portal = level.portal({
            x: -146,
            y: 131
        }, 2 * Math.PI, {
            x: 1805,
            y: -2295
        }, 90)

        const button = level.button(-456, -1320)
        spawn.bodyRect(-400, -1475, 75, 75);
        const button2 = level.button(1781, -61)
        spawn.bodyRect(1781, (-61) - 100, 75, 75);
        const boost1 = level.boost(1366, -1942, 1300)

        button.isUp = true
        button2.isUp = true

        const train = level.transport(-250, 1151, 400, 50, 8 + simulation.difficultyMode)
        level.custom = () => {
            if (train.position.x < -244) {
                train.changeDirection(true) //go right
            } else if (train.position.x > 1700) {
                train.changeDirection(false) //go left
            }
            if (button.isUp && button2.isUp) train.move();
            mover.push();
            ctx.fillStyle = "rgba(0,255,255,0.1)";
            ctx.fillRect(6400, -550, 300, 350);
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            button.query();
            button.draw();
            button2.query();
            button2.draw();
            boost1.query();
            train.draw()
            portal[2].query()
            portal[3].query()
            portal[0].draw();
            portal[1].draw();
            mover.draw();
            ctx.fillStyle = "rgba(0,0,0,0.1)"
            ctx.fillRect(-150, -650, 900, 250)
        };
        level.setPosToSpawn(0, -450); //normal spawn
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.exit.x = -525;
        level.exit.y = 1128;
        level.defaultZoom = 1500
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#ddd";
        spawn.mapRect(-725, -1325, 575, 1900);
        spawn.mapRect(1425, -1925, 600, 1550);
        spawn.mapRect(1450, -50, 500, 425);
        spawn.mapRect(1950, 75, 325, 300);
        spawn.mapRect(2275, 200, 200, 175);
        spawn.mapRect(-150, -400, 900, 250);
        spawn.mapRect(-150, 300, 900, 275);
        spawn.mapRect(1700, 900, 450, 275);
        spawn.mapRect(1800, 1600, 450, 250);
        spawn.mapRect(1675, 1675, 275, 175);
        spawn.mapRect(1575, 1675, 275, 175);
        spawn.mapRect(-550, 1150, 150, 100);
        spawn.bodyRect(-1475, -225, 50, 50);
        spawn.bodyRect(2450, 1525, 925, 850);
        spawn.mapRect(2275, 1400, 300, 150);
        spawn.mapRect(2125, 1025, 125, 150);
        spawn.mapRect(2250, 1175, 175, 75);
        spawn.mapRect(2150, 1175, 175, 75);
        spawn.mapRect(1725, 1150, 475, 100);
        spawn.mapRect(2225, 675, 650, 50);
        spawn.bodyRect(2400, 500, 150, 175);
        spawn.nodeGroup(326, 85, "grenadier", 6)
        spawn.mapRect(-225, -1325, 625, 225);

        spawn.randomMob(151, -1500)
        spawn.randomMob(-88, -1829)
        spawn.randomMob(2339, 896)


        spawn.randomMob(1907, 1381)
        spawn.randomMob(2398, 1301)
        spawn.randomMob(1839, 811)


        spawn.randomMob(2282, 1103)
        spawn.randomMob(8, 124)
        spawn.randomMob(629, 111)

        spawn.randomMob(43, 831)
        spawn.randomMob(168, 1002)
        spawn.randomMob(2956, 1006)

        spawn.randomMob(2713, 535)
        spawn.randomMob(2396, 117)
        spawn.randomMob(1498, -121)

        spawn.nodeGroup(2030, -16, "grower", 6)
        spawn.randomLevelBoss(1840, 675)
    },
    movers() {
        simulation.inGameConsole(`<strong>movers</strong> by <span class='color-var'>ryanbear</span>`);
        level.custom = () => {
            level.exit.drawAndCheck();
            level.enter.draw();
            for (var i = 0; i < trains.length; i++) {
                //oscillate back and forth
                if (trains[i].position.x < 5075) {
                    trains[i].changeDirection(true) //go right
                } else if (trains[i].position.x > 7875) {
                    trains[i].changeDirection(false) //go left
                }
                trains[i].draw();
                trains[i].move();
            }
            for (var j = 0; j < zzz.length; j++) {
                zzz[j][0].query();
            }
            mvr.push();
            v3.query();
            ctx.fillStyle = "rgba(68,68,68,1)";
            ctx.fillRect(1725, -2400, 1000, 150);
            ctx.fillRect(2175, -2775, 250, 450);
            ctx.fillRect(2200, -2825, 225, 200);
            ctx.fillRect(2075, -2575, 150, 200);
            ctx.fillRect(2075, -2700, 150, 150);
            ctx.fillRect(1875, -2525, 300, 125);
            ctx.fillRect(1975, -2575, 150, 75);
            ctx.fillRect(1800, -2475, 175, 100);
            ctx.fillRect(2150, -2725, 350, 375);
            ctx.fillRect(2475, -2575, 175, 200);
            ctx.fillRect(2675, -2550, 25, 175);
            ctx.fillRect(2625, -2550, 75, 200);
            ctx.fillRect(2025, -2600, 200, 175);
            ctx.fillRect(2025, -2675, 225, 225);
            ctx.fillRect(2125, -2800, 250, 375);
            ctx.fillRect(2400, -2625, 175, 175);
            ctx.fillRect(2450, -2700, 100, 225);
            ctx.fillRect(1950, -2600, 150, 200);
            ctx.fillRect(1675, -2325, 250, 75);
            ctx.fillRect(2700, -2525, 25, 150);
        };
        // simulation.enableConstructMode()
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 23885;
        level.exit.y = 800;
        spawn.mapRect(-98, -8, 1000, 20); //bump for level entrance
        spawn.mapRect(972, -287, 200, 20); //x, y, width, height, maxHeight, force = 0.003, friction = { up: 0.01, down: 0.2 }) {
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        var trains = [];
        var zzz = [];
        spawn.mapRect(9850, 475, 200, 75);
        for (var i = 0; i < 6; i++) {
            trains.push(level.transport(6275, -2100 + 525 * i, 600, 50, (2 * i % 2 - 1) * 4 * Math.min(simulation.difficulty / 2, 2) * (1 + Math.random())))
            zzz.push([level.boost(6275, -2100 + 525 * i, 100), 6275]);
        }
        document.body.style.backgroundColor = "#d8dadf";

        const portal1 = level.portal({
            x: 3984,
            y: 1293
        }, -2 * Math.PI, { //right
            x: 23863,
            y: 82
        }, 2 * Math.PI) //right

        spawn.mapRect(1825, -2250, 3300, 300); spawn.mapRect(3250, -2875, 150, 625);
        spawn.mapRect(3250, -2875, 425, 125);
        spawn.mapRect(3425, -2725, 150, 300);
        spawn.mapRect(3400, -2750, 175, 350);
        spawn.mapRect(3575, -2625, 150, 375);
        spawn.mapRect(3175, -2750, 75, 300);
        spawn.mapRect(3100, -2750, 275, 300);
        spawn.mapRect(3675, -2875, 75, 125);
        spawn.mapRect(3675, -2625, 75, 400);
        spawn.mapRect(3350, -2425, 100, 175);
        spawn.mapRect(8350, 825, 1825, 250);
        spawn.mapRect(3950, 800, 800, 375);
        var hzd = level.hazard(3750, -2625, 1375, 375);
        // spawn.mapRect(3750, -2625, 1375, 375);
        var v1 = level.vanish(3975, -2600, 225, 25);
        var v2 = level.vanish(4275, -2975, 225, 25);
        var mvr = level.mover(2585, 1928, 2375, 100);
        //spawn.mapRect(4925, 1725, 300, 25);
        var v3 = level.vanish(4925, 1725, 100, 25);
        for (var i = 0; i < 16; i++) {
            if (i < 10) {
                level.boost(1600 + 62 * i, -2307 - 62 * i, 100);
            }
            else {
                level.boost(1600 + 62 * i, -2307 - 62 * 20 + 62 * i, 100);
            }
        }


        for (var i = -1; i < 10; i++) {
            level.boost(3847 - 62 * i, 879 + 62 * i, 100);
        }
        spawn.mapRect(3050, 1500, 1600, 200);
        spawn.mapRect(1850, -1950, 3275, 1275); spawn.mapRect(1850, -675, 3275, 1300);

        spawn.mapRect(2700, -2525, 25, 175);
        spawn.mapRect(3825, 925, 125, 575); spawn.mapRect(3600, 1100, 350, 400); spawn.mapRect(3375, 1350, 275, 150); spawn.mapRect(3550, 1300, 100, 50); spawn.mapRect(3800, 1000, 100, 150); spawn.mapRect(3725, 1075, 150, 125); spawn.mapRect(3725, 1025, 150, 125); spawn.mapRect(3550, 1225, 150, 125); spawn.mapRect(3500, 1275, 175, 125);
        // color.map = "#444" //custom map color
        bosses = ["laserBoss", "blinkBoss", "shooterBoss", "launcherBoss", "pulsarBoss", "beetleBoss", "bladeBoss", "revolutionBoss", "dragonFlyBoss", "spiderBoss"];
        let randomBoss = Math.floor(Math.random() * bosses.length);
        spawn[bosses[randomBoss]](2240, -2499, 100, false);
        var btn = level.button(9889, 747);
        btn.isUp = true;
        spawn.randomMob(475, -725, 0.7); spawn.randomMob(825, -1825, 0.7); spawn.randomMob(3275, -3475, 0.7); spawn.randomMob(8550, 350, 0.7); spawn.randomMob(9350, -175, 0.7); spawn.randomMob(1575, 225, 0.7); spawn.randomMob(22825, 250, 0.7);
        spawn.mapRect(-100, 0, 1000, 100);
        var ddd = level.elevator(1326, -447, 200, 200, -2131, 0.003, { up: 0.1, down: 0.2 });
        ///  transport(x, y, width, height, VxGoal = -6, force = VxGoal > 0 ? 0.0005 : -0.0005) {
        spawn.mapRect(9500, 750, 675, 75);
        spawn.mapRect(22350, 825, 3000, 150);
        powerUps.spawn(4246, 1335, "tech")
        powerUps.spawn(4246.8, 1335, "heal")
        powerUps.spawn(4246.8, 1335.4, "ammo")
        spawn.bodyRect(9200, 725, 50, 25); spawn.mapRect(12200, 675, 125, 50); spawn.mapRect(12925, 675, 100, 100); spawn.mapRect(13675, 650, 150, 150); spawn.mapRect(14200, 750, 25, 25); spawn.mapRect(14200, 675, 25, 75); spawn.mapRect(14550, 675, 125, 50); spawn.mapRect(15850, 675, 125, 100); spawn.mapRect(17175, 600, 25, 200); spawn.mapRect(17725, 700, 175, 50); spawn.mapRect(18775, 675, 175, 75);
        spawn.bodyRect(8975, 700, 25, 25); spawn.bodyRect(8850, 575, 50, 50); spawn.bodyRect(9050, 650, 50, 50); spawn.bodyRect(8625, 575, 100, 75); spawn.bodyRect(8475, 675, 75, 25);
        var train1 = level.transport(10250 - 700, 775, Math.max(1200 / simulation.difficulty, 200), 1350, 8);
        level.customTopLayer = () => {
            ddd.move();
            hzd.query();
            v1.query();
            v2.query();
            btn.draw();
            portal1[2].query();
            portal1[2].draw();
            portal1[3].query();
            portal1[3].draw();
            btn.query();
            if (!btn.isUp) {
                spawn.mapRect(4050, 1175, 600, 325);
            }
            if (!btn.isUp && train1.position.x < 23785) {
                train1.draw();
                train1.move();
            }
            //                if (trains[i].position.x < 5075) {
            //                trains[i].changeDirection(true) //go right
        };
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
    downpour() {
        simulation.inGameConsole(`<strong>Downpour</strong> by <span class='color-var'>DesBoot</span>`);

        /* NEW CHANGES:
        Added lights in the buildings
            activate when lever is flicked
        Changed lightning:
            now has a chance to strike twice in a row
        Small map changes
        Slight rework of the start
        Added sounds:
            thunder
            buzz from lights
        */


        //BUILD EVERYTHING
        const laser = level.hazard(7492, -2612, 10, 500, 0.3) //laserintro
        spawn.mapRect(340, -2032.5, 20, 25); //laser nose //laserintro
        const laserbutton = level.button(5485, -2510)
        const doorbutton = level.button(7618, -3204)
        const doortoggle = level.toggle(5088.4, 1226.7)
        const mutetoggle = level.toggle(100, 0)
        const door = level.door(6500, -1200, 100, 350, 100)
        const bunkerdoor = level.door(10700, -2500, 100, 500, 200)
        const boost1 = level.boost(7300, 1209, 2200)
        const boost2 = level.boost(6232.6, -832.8, 1400)
        const portal = level.portal({ x: 4886.4, y: 1050.7 }, 2 * Math.PI, { x: 7686, y: -2121 }, 2 * Math.PI)
        const slime = level.hazard(-1800, 10, 4200, 400);
        const slime2 = level.hazard(2400, -2100, 200, 2100);
        const slime3 = level.hazard(2600, -2100, 3600, 200);
        const slime4 = level.hazard(6400, -2100, 3600, 200);
        const slime5 = level.hazard(-2000, 10, 200, 3000);
        const drip1 = level.drip(1750, -700, 0, 70)
        const oldOnLevel = level.levelsCleared;

        let whereToDrip = Math.random() * 2;

        const mainDropRange = (min, max) => Math.random() * (max - min) + min
        const amount = Math.round(15 + 20 * Math.random())
        const drips = []
        for (let i = 0; i < amount; i++) {
            if (whereToDrip < 1.25) {
                const locX = mainDropRange(3800, 6000)//2200, 2300
                drips.push(level.drip(locX, -1700, -800, 200 + Math.random() * 500))
            } else {
                const locX = mainDropRange(4900, 7100)//2200, 2300
                drips.push(level.drip(locX, 200, 1200, 200 + Math.random() * 500))
            }
            whereToDrip = Math.random() * 2;
        }


        //ADD MORE


        // simulation.enableConstructMode()
        //LEVEL SETUP AND VARIABLES
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 13130.3;
        level.exit.y = -370;
        level.defaultZoom = 1800
        let rainCount = 1
        let hasDoubleFlashed = false;
        let lightningTime = 0;
        let canBePushed = false;
        let rainXtemp1 = 0;
        let rainXtemp2 = 0;
        let stopcycle = 0
        let flashcycle = Math.round(Math.random() * 25 + 260)
        let mobsspawned = 0
        let distanceToLight1 = 0;
        let distanceToLight2 = 0;
        let customExitTimer = 0;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#2e416e";//d8dadf
        // color.map = "#444" //custom map color



        //SOUNDS
        let thunder1 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/thunder1.mp3?raw=true');
        let chemicalLove = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/Chemical%20Love%20thunder.mp3?raw=true');
        chemicalLove.play();
        let thunder2 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/thunder2.mp3?raw=true');
        let thunder3 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/thunder3.wav?raw=true');
        let thunder4 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/thunder4.wav?raw=true');
        let ambiance1 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/buzz%20(1).wav?raw=true');
        let rain1 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/light-rain-109591.mp3?raw=true');
        let rain3 = new Audio('https://github.com/des-boot/n-gon-downpour-sound-effects/blob/main/8mb.video-ggm-Jd62jXAH.m4a?raw=true');
        rain1.volume = 0.125;
        rain3.volume = 0.125;
        thunder1.volume = 0.25;
        thunder2.volume = 0.25;
        thunder3.volume = 0.25;
        thunder4.volume = 0.25;




        //simulation.inGameConsole(stopcycle)
        level.custom = () => {
            for (const drip of drips) drip.draw()
            drip1.draw();
            // drip1.x = Math.random() * 500 + 1630
            // if (false) {
            //     rain1.pause();
            //     rain2.pause();
            //     rain3.pause();
            //     thunder1.pause();
            //     thunder2.pause();
            //     thunder3.pause();
            //     thunder4.pause();
            //     ambiance1.pause();
            // }

            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.beginPath()
            ctx.moveTo(10800, -2400)//slope of -1/3
            ctx.lineTo(10800, -340)
            ctx.lineTo(12980, -340)
            ctx.lineTo(12980, -700)
            ctx.lineTo(13465, -700)
            ctx.lineTo(13541, -1737)
            ctx.lineTo(11864.6, -1967.0)
            ctx.lineTo(11003, -2400)
            ctx.fill()
            ctx.fillRect(6100, -2000, 400, 50)
            // do {
            if (simulation.paused) {
                rain1.pause();
                // rain2.pause();
                rain3.pause();
                thunder1.pause();
                thunder2.pause();
                thunder3.pause();
                thunder4.pause();
            } else {
                // if (!mutetoggle.isOn)
                rain3.play();
                if (player.position.x > 3100 && player.position.y > -1700) {
                    rain1.pause();
                    // rain2.pause();
                    rain3.volume = 0.025;
                } else {
                    if (player.position.x > 2600 && player.position.x < 3200) {
                        rain1.volume = (3200 - player.position.x) / 4000
                        // rain2.volume = (3100 - player.position.x) / 2000
                        rain3.volume = (3200 - player.position.x) / 4000
                    }
                    if (player.position.y > -2000 && player.position.y < -1700) {
                        // rain1.volume = -1 * (1700 + player.position.y) / 3000
                        rain1.volume = (-3 * player.position.y) / 68000 - 0.05
                        // rain2.volume = (3100 - player.position.x) / 2000
                        rain3.volume = -1 * (1700 + player.position.y) / 3000
                    }
                    // if (!mutetoggle.isOn)
                    rain1.play();
                    // rain2.play();
                }
            }
            distanceToLight1 = Math.sqrt((player.position.x - 6300) * (player.position.x - 6300) + (player.position.y - 212) * (player.position.y - 212))
            distanceToLight2 = Math.sqrt((player.position.x - 4877) * (player.position.x - 4877) + (player.position.y + 1690) * (player.position.y + 1690))

            if (doortoggle.isOn) {
                if (simulation.paused) { //is it paused
                    ambiance1.pause();
                } else {
                    if (distanceToLight1 < 2000 || distanceToLight2 < 2000) { // is M close enough
                        // if (!mutetoggle.isOn)
                        ambiance1.play();
                        if (distanceToLight2 < distanceToLight1) { // check for distance and set volume
                            ambiance1.volume = (1 - ((distanceToLight2) / 2000))
                        } else {
                            ambiance1.volume = (1 - ((distanceToLight1) / 2000))

                        }
                    } else {
                        ambiance1.pause();
                    }
                }


            }

            if (mutetoggle.isOn) {
                // simulation.inGameConsole(isMuted)
                muteAll();

            } else {
                // simulation.inGameConsole(isMuted)
                rain1.muted = false
                ambiance1.muted = false
                rain3.muted = false
                thunder1.muted = false
                thunder2.muted = false
                thunder3.muted = false
                thunder4.muted = false

            }

            //mute volumes
            // rain1.volume = rain1.volume * ismuted;
            // // simulation.inGameConsole(ismuted)
            // ambiance1.volume = ambiance1.volume * ismuted;
            // rain3.volume = rain3.volume * ismuted;
            // thunder1.volume = thunder1.volume * ismuted;
            // thunder2.volume = thunder2.volume * ismuted;
            // thunder3.volume = thunder3.volume * ismuted;
            // thunder4.volume = thunder4.volume * ismuted;
            do {



                ctx.fillStyle = "rgba(242, 255, 0, 0.3})"
                ctx.fillStyle = `rgba(242,255,0,${(Math.round(Math.random + 0.3)) / 3})`
                ctx.fillStyle = "rgba(242,255,0,0.3)"

                if (doortoggle.isOn) {
                    ctx.beginPath()
                    ctx.moveTo(6325, 212)
                    ctx.lineTo(6325 - 75, 212)
                    ctx.lineTo((6325 - 75) - 338, 212 + 338)
                    ctx.lineTo(6325 + 10, 212 + 338)
                    ctx.lineTo(6325 + 29.97, 212 + 1018)
                    ctx.lineTo(6325 + 597.4443, 212 + 1018) //at an angle to the right platform
                    ctx.lineTo((6325 + 75) + 375, 212 + 763)
                    ctx.lineTo((6325 + 75) + 375, 212 + 688)
                    ctx.lineTo((6325 + 75) + 688, 212 + 688)
                    ctx.lineTo((6325 + 75) + 100, 212 + 100)
                    ctx.lineTo(6325 + 75, 212)
                    ctx.fill()
                    //4875, -1688
                    ctx.beginPath()
                    ctx.moveTo(4875, -1688)//middle
                    ctx.lineTo(4875 - 75, -1688)//right side
                    ctx.lineTo((4875 - 75) - 638, -1688 + 638)//middle of left platform
                    ctx.lineTo((4875 - 75) - 638 + 150, -1688 + 638)
                    ctx.lineTo((4875 - 75) - 315, -1688 + 448)
                    ctx.lineTo(4875 + 75 + 135, -1688 + 445)//right side of right platofrm
                    ctx.lineTo(4875 + 75 + 135 + 445, -1688 + 445 + 445)
                    ctx.lineTo(5460, -880)
                    ctx.lineTo(4875 + 75 + 538, -1688 + 538)
                    ctx.lineTo(4875 + 75, -1688)//left side
                    ctx.fill()
                }

                //rain
                // if (!mutetoggle.isOn) {
                ctx.beginPath()
                ctx.fillStyle = "rgba(30,150,117,255)"
                ctx.rect(Math.random() * 4500 - 2000, -5000, 3 + 2.5, 5030)
                ctx.rect(Math.random() * 4500 - 2000, -5000, 3 + 2.5, 5030)
                ctx.rect(Math.random() * 4500 - 2000, -5000, 3 + 2.5, 5030)
                ctx.rect(Math.random() * 2000 + 2500, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 2000 + 2500, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1300 + 4500, -5000, 3 + 2.5, 2500)
                ctx.rect(Math.random() * 1300 + 7500, -5000, 3 + 2.5, 1800)
                ctx.rect(Math.random() * 1800 + 5700, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1800 + 5700, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1800 + 8400, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1800 + 8400, -5000, 3 + 2.5, 3000)
                ctx.rect(Math.random() * 4500 - 2000, -5000, 3 + 2.5, 5030)
                ctx.fillStyle = "rgba(30,150,117,255)"
                ctx.fill()
                //rain on shed
                rainXtemp1 = Math.random() * 900 + 11100
                rainXtemp2 = Math.random() * 900 + 10200
                if (rainXtemp2 < 10800) {
                    ctx.rect(rainXtemp2, -5000, Math.random() * 3 + 2.5, 3000)
                } else {
                    ctx.rect(rainXtemp2, -5000, Math.random() * 3 + 2.5, 2600)
                }
                ctx.rect(rainXtemp1, -5000, Math.random() * 3 + 2.5, 5000 + 0.5468 * rainXtemp1 - 8507)

                // ctx.rect(Math.random() * 900 + 10200, -5000, Math.random() * 3 + 2.5, 3000)
                // ctx.rect(Math.random() * 900 + 11100, -5000, Math.random() * 3 + 2.5, 5000 + 0.5468 * this.x - 8507)
                ctx.rect(Math.random() * 1800 + 12000, -5000, Math.random() * 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1800 + 12000, -5000, Math.random() * 3 + 2.5, 3000)
                ctx.rect(Math.random() * 1500 - 3500, -5000, Math.random() * 3 + 2.5, 10030)
                ctx.fillStyle = "rgba(30,150,117,255)"
                ctx.fill()


                // }

            } while (Math.random() < 0.5); //this is really important, keep it



            //simulation.inGameConsole(stopcycle)
            //simulation.inGameConsole(m.cycle)
            // ctx.fillStyle = "rgba(228,255,0,0.8)"
            // //simulation.inGameConsole(stopcycle)
            // ctx.fillRect(50.4, -1210.0, 100, 100)
            // stopcycle = m.cycle + Math.random * 600;
            //stopcycle = m.cycles + Math.random * 600


            //LIGHTNING
            //flash cycle gets set to a random number 260-295
            //stop cycle increases until it is bigger than flash cycle
            //lightning effect starts
            //stop cycle continues increasing until it reaches 300
            //repeat
            // simulation.inGameConsole(stopcycle)
            if (stopcycle > 300) { //reset
                if (Math.random() > 0.8 && hasDoubleFlashed == false) {
                    flashcycle = Math.round(Math.random() * 10 + 275)
                    stopcycle = flashcycle - 20
                    hasDoubleFlashed = true
                } else {
                    flashcycle = Math.round(Math.random() * 25 + 260)
                    stopcycle = Math.random() * -100
                    hasDoubleFlashed = false
                }
                document.body.style.backgroundColor = "#2e416e";
                playRandomThunder()
            } else {
                if (stopcycle > flashcycle) {
                    document.body.style.backgroundColor = "#7391ff";
                    for (let i = 0; i < mob.length; i++) mobs.statusStun(mob[i], 300 - flashcycle)//Math.random() * 20 + 20
                    lightningTime = flashcycle - 300

                }
                stopcycle = stopcycle + 1
            }


            //mute button
            ctx.textAlign = "start"
            ctx.fillStyle = "#00ffff";
            // ctx.fillText("Waste Discharge Interruption:", 2910, -3870);
            // ctx.fillText("Owner 'Scarlet' not found", 2910, -3830);
            // ctx.fillText("Detected user: 'm'", 2910, -3790);
            ctx.font = "27px monospace";
            ctx.fillText("Audio:", 150, -270);
            ctx.font = "54px monospace";
            ctx.textAlign = "right";
            ctx.fillText(mutetoggle.isOn ? "Muted" : "Unmuted", 250, -210);

            //mute symbol
            if (mutetoggle.isOn) {
                ctx.strokeStyle = "#ff0400";
            } else {
                ctx.strokeStyle = "#00ff00";
            }

            // ctx.beginPath();
            // ctx.rect(80 + 50, -187.5, 20, 25)
            // ctx.stroke();
            ctx.lineWidth = 10;

            ctx.beginPath();
            ctx.moveTo(130, -167.5) //top left
            ctx.lineTo(130 + 15 * 2, -167.5) //top mid
            ctx.lineTo(130 + 30 * 2, -167.5 - 10 * 2) //top right
            ctx.lineTo(130 + 30 * 2, -167.5 + 35 * 2) //bottom right
            ctx.lineTo(130 + 15 * 2, -167.5 + 22 * 2) //bottom mid
            ctx.lineTo(130, -167.5 + 22 * 2) // bottom left
            ctx.lineTo(130, -167.5) //top left
            ctx.stroke();

            // canvas.width += 5
            // ctx.strokeSyle()
            if (mutetoggle.isOn) {
                ctx.lineWidth = 9;
                ctx.moveTo(230, -185)
                ctx.lineTo(140, -95)
                ctx.stroke();
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(170, -145, 45, 1.75 * Math.PI, 0.25 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(170, -145, 60, 1.75 * Math.PI, 0.25 * Math.PI);
                ctx.stroke();
            } else {
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(170, -145, 45, 1.75 * Math.PI, 0.25 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(170, -145, 60, 1.75 * Math.PI, 0.25 * Math.PI);
                ctx.stroke();
            }


            // ctx.arc(130, -175, 8, 0, 2 * Math.PI);
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.textAlign = "center";
            ctx.fillStyle = "#00ffff";
            // if (isMuted = 0) {
            //     ctx.fillText("Muted", 360, -230);
            // } else {
            //     ctx.fillText("Unmuted", 360, -190);
            // }

            // ctx.strokeStyle = "#00ff00";
            // ctx.beginPath();
            // ctx.arc(3300, -3730, 60, 0, 2 * Math.PI);
            // ctx.stroke();
            // ctx.arc(3330, -3730, 8, 0, 2 * Math.PI);
            // ctx.lineWidth = 4;
            // ctx.stroke();
            // ctx.textAlign = "center";
            // ctx.fillStyle = "#00ffff";
            // ctx.font = "30px monospace";
            // ctx.fillText("n-gon inc", 3300, -3630);

            ctx.font = "25px Arial";


            ctx.fillStyle = "#d4f4f4"
            ctx.fillRect(12984, -704, 420, 450)
            //windows

            //scrapped, but i might work on this again
            // if (stopcycle > flashcycle) {
            //     ctx.fillStyle = "rgba(255, 255, 255, 1)"
            //     ctx.fillRect(4703, -2362, 100, 100)
            //     ctx.fillRect(5053, -2362, 100, 100)
            //     ctx.fillRect(5403, -2362, 100, 100)
            //     ctx.fillRect(4703, -2062, 100, 100)
            //     ctx.fillRect(5053, -2062, 100, 100)
            //     ctx.fillRect(5403, -2062, 100, 100)
            // } else {
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(4703, -2362, 100, 100)
            ctx.fillRect(5053, -2362, 100, 100)
            ctx.fillRect(5403, -2362, 100, 100)
            ctx.fillRect(4703, -2062, 100, 100)
            ctx.fillRect(5053, -2062, 100, 100)
            ctx.fillRect(5403, -2062, 100, 100)
            // }

            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(4523, -2512, 1150, 800)
            ctx.fillRect(4735, -1233, 100, 500)//tree
            ctx.beginPath()

            ctx.moveTo(4487, -1195)//slope of -1/3
            ctx.lineTo(4736, -792)
            ctx.lineTo(4736, -852)
            ctx.lineTo(4527, -1195)

            ctx.moveTo(5087, -1195)//slope of -1/3
            ctx.lineTo(4836, -792)
            ctx.lineTo(4836, -852)
            ctx.lineTo(5047, -1195)
            ctx.fill()

            ctx.moveTo(5252.4, -2483.5)
            ctx.lineTo(5141.2, -2507.8)
            ctx.lineTo(5209.2, -2625.2)
            ctx.lineTo(5290.2, -2626.6)
            ctx.lineTo(5361.2, -2697.9)
            ctx.lineTo(5410.6, -2717.0)
            ctx.lineTo(5680.2, -2648.7)
            ctx.lineTo(5687.7, -2471.5)
            ctx.fill()



            //building 2        spawn.mapRect(8473, -2513, 50, 50);
            ctx.fillRect(8673, -2137, 50, 175)
            ctx.fillRect(7630, -2540, 100, 100)
            ctx.fillRect(7930, -2540, 100, 100)
            ctx.fillRect(8230, -2540, 100, 100)
            ctx.fillRect(8530, -2765, 100, 100)
            ctx.fillRect(7630, -2990, 100, 100)
            ctx.fillRect(7930, -2990, 100, 100)
            ctx.fillRect(8230, -2990, 100, 100)


            ctx.beginPath()
            ctx.moveTo(7475, -3213)
            ctx.lineTo(8100, -3213)
            ctx.lineTo(8191.2, -3334.7)
            ctx.lineTo(8318.0, -3388.3)
            ctx.lineTo(8348.5, -3496.9)
            ctx.lineTo(8480.0, -3512.6)
            ctx.lineTo(8670, -3482)
            ctx.lineTo(8725, -3213)
            ctx.lineTo(8725, -1463)
            ctx.lineTo(7475, -1463)
            ctx.fill()



            //stairs
            ctx.fillRect(8523, -2563, 50, 50)
            ctx.fillRect(8473, -2613, 50, 50)
            ctx.fillRect(8423, -2663, 50, 50)
            ctx.fillRect(8373, -2713, 50, 50)
            ctx.fillRect(8323, -2763, 50, 50)

            ctx.fillRect(8323, -2813, 50, 50)
            ctx.fillRect(8373, -2863, 50, 50)
            ctx.fillRect(8423, -2913, 50, 50)
            ctx.fillRect(8473, -2963, 50, 50)

            ctx.fillRect(8523, -3013, 50, 50)//make block
            ctx.fillRect(8473, -3063, 50, 50)//make block
            ctx.fillRect(8423, -3113, 50, 50)//make block
            ctx.fillRect(8373, -3163, 50, 50)
            ctx.fillRect(8323, -3213, 50, 50)

            //caves

            ctx.fillStyle = "rgba(30,150,117,255)"//fake slime
            //87,189,146,255
            ctx.fillRect(6100, -1900, 100, 1050)
            ctx.fillRect(6400, -1900, 100, 1050)
            ctx.fillRect(2600, -850, 4700, 200)
            ctx.fillRect(7200, -650, 100, 1900)
            ctx.fillRect(2399, -1, 200, 400)

            //bunker
            ctx.fillStyle = "rgba(0,0,0,0.5)"

            // ctx.beginPath()
            // ctx.moveTo(10800, -2400)//slope of -1/3
            // ctx.lineTo(10800, -340)
            // ctx.lineTo(12980, -340)
            // ctx.lineTo(12980, -700)
            // ctx.lineTo(13465, -700)
            // ctx.lineTo(13541, -1737)
            // ctx.lineTo(11864.6, -1967.0)
            // ctx.lineTo(11003, -2400)
            // ctx.fill()
            // ctx.fillRect(6100, -2000, 400, 50)

            // -2000 -> 2500
            // Math.random() * 5000 -2500
            ctx.fillStyle = "rgba(0,0,0,0.6)"
            ctx.beginPath()
            ctx.moveTo(6100, -1700)
            ctx.lineTo(5799.5, -800)
            ctx.lineTo(2600, -800)
            ctx.lineTo(2600, -1700)
            ctx.lineTo(5799.5, -1700)

            ctx.moveTo(6500, -1200)
            ctx.lineTo(7600, -1200)
            ctx.lineTo(8000, 1400)
            ctx.lineTo(4600, 1500)
            ctx.lineTo(4500.5, 0)
            ctx.lineTo(6500, -200)
            ctx.lineTo(6500, -1200)
            ctx.fill()

            //rocks in river
            ctx.fillStyle = "rgba(50,50,50,0.6)"

            ctx.beginPath()
            ctx.moveTo(-2050, 0)
            ctx.lineTo(1725, 0)
            ctx.lineTo(1980, 88)
            ctx.lineTo(2118, 257)
            ctx.lineTo(2167, 491)
            ctx.lineTo(-1800, 3000)

            ctx.lineTo(-2050, 3000)

            // ctx.moveTo(6500, -1200)
            // ctx.lineTo(7600, -1200)
            // ctx.lineTo(8000, 1400)
            // ctx.lineTo(4600, 1500)
            // ctx.lineTo(4500.5, 0)
            // ctx.lineTo(6500, -200)
            // ctx.lineTo(6500, -1200)
            ctx.fill()



            portal[2].query()
            portal[3].query()
            if (laserbutton.isUp) {
                laser.isOn = true;
            } else {
                laser.isOn = false;
            }


            ctx.fillStyle = "rgba(0,0,0,0.6)"
            ctx.fillRect(2013, -791, 600, 75)
            ctx.fillRect(1766, -1091, 250, 310)
            ctx.beginPath()
            ctx.moveTo(1816, -781)
            ctx.lineTo(1816, 32)
            ctx.lineTo(1966, 84)
            ctx.lineTo(1966, -781)
            ctx.fill()
            // ctx.fillRect(1816, -781, 150, 2000)

            ctx.fillRect(4473, -2912, 50, 1000)
            ctx.fillRect(5673, -2712, 50, 800)
            ctx.fillStyle = "rgba(0,0,0,0.2)"

            ctx.fillRect(4523, -2512, 350, 75)
            ctx.fillRect(5273, -2212, 400, 75)


            // if (level.levelsCleared > oldOnLevel) {
            // simulation.inGameConsole("muted bc next level");
            // console.log("muted bc next level");
            // rain1.muted = true
            // ambiance1.muted = true
            // rain3.muted = true
            // thunder1.muted = true
            // thunder2.muted = true
            // thunder3.muted = true
            // thunder4.muted = true
            // }
            if (player.position.x > level.exit.x && player.position.x < level.exit.x + 100 && player.position.y > level.exit.y - 150 && player.position.y < level.exit.y - 0 && player.velocity.y < 0.15) {
                // level.exitCount += input.down ? 8 : 2
                customExitTimer += 3
            } else if (customExitTimer > 0) {
                customExitTimer -= 3
            }
            // simulation.inGameConsole(customExitTimer);

            if (customExitTimer > 80) {
                // simulation.inGameConsole("muted bc next level");
                // console.log("muted bc next level");
                muteAll();
            }
            level.exit.drawAndCheck();

            addEventListener("keydown", function (event) {
                if (event.key == "u") {
                    muteAll();
                }
            })

            // if (simulation.testing) {
            //     if (key.toLowerCase = "o") {
            //         rain1.muted = true
            //         ambiance1.muted = true
            //         rain3.muted = true
            //         thunder1.muted = true
            //         thunder2.muted = true
            //         thunder3.muted = true
            //         thunder4.muted = true
            //     }
            // }
            slime.query();
            slime2.query();
            slime3.query();
            slime4.query();
            slime5.query();


            // spawn.mapRect(4873, -2512, 800, 75);
            // spawn.mapRect(4473, -2212, 800, 75);
            //setTimeout(function(){/*YourCode*/},1000);





            //water falling/flowing effect
            ctx.fillStyle = `hsla(160, 100%, 26%,${0.5 + 0.07 * Math.random()})`//lower river
            ctx.fillRect(-1800 + Math.random() * 100, 10 + 400 * Math.random(), 3900, 5)
            ctx.fillRect(-1800, 10 + 400 * Math.random(), 4400, 5)

            ctx.fillRect(2400 + 200 * Math.random(), Math.random() * - 100 - 2000, 5, 2000)//first waterfall
            ctx.fillRect(6100 + 100 * Math.random(), Math.random() * - 100 - 1900, 5, 1050)//twin waterfalls
            ctx.fillRect(6400 + 100 * Math.random(), Math.random() * - 100 - 1900, 5, 1050)
            ctx.fillRect(-2000 + 200 * Math.random(), Math.random() * 100, 5, 2000)//far left waterfall

            ctx.fillRect(7200 + 100 * Math.random(), -800 - 50 * Math.random(), 5, 2032)
            level.enter.draw();
            laserbutton.query();
            laserbutton.draw();
            doortoggle.query();
            mutetoggle.query();
            if (!doortoggle.isOn) {
                door.isClosing = true
                bunkerdoor.isClosing = true

            } else {
                door.isClosing = false
                bunkerdoor.isClosing = false
                if (mobsspawned == 0) {
                    spawn.randomSmallMob(6128.0, 822.6);
                    spawn.randomSmallMob(6854.8, 560.2);
                    spawn.randomSmallMob(8320.7, -3402.4);
                    spawn.randomMob(6629.0, 711.3, 0.8);
                    spawn.randomMob(8199.2, -2545.5, 0.8);
                    spawn.randomMob(8067.7, -2957.2, 0.8);
                    spawn.randomMob(5149.6, -1444.1, 0.8);

                    mobsspawned = 1

                }

            }
            door.openClose();
            bunkerdoor.openClose();

        };
        level.customTopLayer = () => {
            door.draw();
            bunkerdoor.draw();

            //lights in basement

            // if (doortoggle.isOn) {
            //     ctx.beginPath()
            //     ctx.moveTo(6325, 212)
            //     ctx.lineTo(6325 - 75, 212)
            //     ctx.lineTo((6325 - 75) - 338, 212 + 338)
            //     ctx.lineTo(6325 + 10, 212 + 338)
            //     ctx.lineTo(6325 + 29.97, 212 + 1018)
            //     ctx.lineTo(6325 + 597.4443, 212 + 1018) //at an angle to the right platform
            //     ctx.lineTo((6325 + 75) + 375, 212 + 763)
            //     ctx.lineTo((6325 + 75) + 375, 212 + 688)
            //     ctx.lineTo((6325 + 75) + 688, 212 + 688)
            //     ctx.lineTo((6325 + 75) + 100, 212 + 100)
            //     ctx.lineTo(6325 + 75, 212)
            //     ctx.fillStyle = `rgba(242, 255, 0, 0.3})`

            //     ctx.fill()
            // }
            spawn.mapRect(6250, 200, 150, 12);


            laser.opticalQuery();
            if (checkForPush(m.pos.x, m.pos.y)) {
                Matter.Body.setVelocity(player, {
                    x: player.velocity.x + checkForWaterXSpeed(m.pos.x, m.pos.y),
                    y: player.velocity.y + checkForWaterYSpeed(m.pos.x, m.pos.y)
                });
            }



            //push stuff
            for (let i = 0, len = body.length; i < len; ++i) { //push blocks away
                if (checkForPush(body[i].position.x, body[i].position.y)) {
                    if (checkForWaterYSpeed(body[i].position.x, body[i].position.y) == 0) {
                        body[i].force.x += checkForWaterXSpeed(body[i].position.x, body[i].position.y) / 300;
                        body[i].force.y += checkForWaterYSpeed(body[i].position.x, body[i].position.y) / 1000 - 0.001;
                    } else {
                        body[i].force.x += checkForWaterXSpeed(body[i].position.x, body[i].position.y) / 300;
                        body[i].force.y += checkForWaterYSpeed(body[i].position.x, body[i].position.y) / 1000;
                    }
                }
                for (let i = 0, len = powerUp.length; i < len; ++i) { //push blocks away
                    if (checkForPush(powerUp[i].position.x, powerUp[i].position.y - 50)) {
                        powerUp[i].force.x += checkForWaterXSpeed(powerUp[i].position.x, powerUp[i].position.y) / 800;
                        powerUp[i].force.y += checkForWaterYSpeed(powerUp[i].position.x, powerUp[i].position.y) / 800;
                        powerUp[i].position.x -= 0.1;
                    }
                }
            }
            // for (let i = 0, len = powerUp.length; i < len; ++i) { //push blocks away
            //     if (checkForPush(powerUp[i].position.x, powerUp[i].position.y)) {
            //         powerUp[i].force.x += checkForWaterXSpeed(powerUp[i].position.x, powerUp[i].position.y) / 1000;
            //         powerUp[i].force.y += checkForWaterYSpeed(powerUp[i].position.x, powerUp[i].position.y) / 1000;
            //     }
            // }
            for (let i = 0, len = mob.length; i < len; ++i) { //push blocks away
                if (checkForPush(mob[i].position.x, mob[i].position.y)) {
                    mob[i].force.x += checkForWaterXSpeed(mob[i].position.x, mob[i].position.y) / 2000;
                    mob[i].force.y += checkForWaterYSpeed(mob[i].position.x, mob[i].position.y) / 2000;
                }
            }
            for (let i = 0, len = bullet.length; i < len; ++i) { //push blocks away
                if (checkForPush(bullet[i].position.x, bullet[i].position.y)) {
                    if (b.activeGun == 0 || b.activeGun == 1 || b.activeGun == 2 || b.activeGun == 4 || b.activeGun == 7) {
                        bullet[i].velocity.x += checkForWaterXSpeed(bullet[i].position.x, bullet[i].position.y) * 100;
                        bullet[i].velocity.y += checkForWaterYSpeed(bullet[i].position.x, bullet[i].position.y) * 100;
                    }
                }
            }
            // for (let i = 0, len = bullet.length; i < len; ++i) { //push bullets away vertically
            //     if (bullet[i].position.x > -7625 && bullet[i].position.x < -7075 && bullet[i].position.y > -2975 - 100 && bullet[i].position.y < -625) {
            //         bullet[i].force.y -= simulation.g * bullet[i].mass;
            //     }
            // }
            // for (let i = 0, len = powerUp.length; i < len; ++i) { //push powerups away
            //     if (powerUp[i].position.x > -7625 && powerUp[i].position.x < -7075 && powerUp[i].position.y > -2975 - 100 && powerUp[i].position.y < -625) {
            //         powerUp[i].force.y -= simulation.g * powerUp[i].mass + 0.12;
            //     }
            // }

            // for (let i = 0, len = mob.length; i < len; ++i) { //push mobs away
            //     if (mob[i].position.x > -7625 && mob[i].position.x < -7075 && mob[i].position.y > -2975 - 100 && mob[i].position.y < -625) {
            //         mob[i].force.y -= simulation.g * mob[i].mass + 0.0012;
            //     }
            // }





            boost1.query();
            boost2.query();

            //            ctx.fillRect(7200, -650, 100, 1900)
            portal[0].draw();
            portal[1].draw();
            portal[2].draw();
            portal[3].draw();
        };

        //little block to stop push
        spawn.mapRect(50, -10, 250, 20)

        spawn.mapRect(4800, -1700, 150, 12);


        spawn.mapRect(-100, 0, 1000, 100);
        spawn.mapRect(-1800, 400, 4400, 1300);
        // spawn.mapRect(-1800, 0, 100, 400);
        spawn.mapRect(2600, -2000, 3500, 300);
        spawn.mapRect(2600, -2000, 500, 800);
        spawn.mapRect(2955, -1779, 800, 300);
        spawn.mapRect(2600, -800, 2300, 2500);
        spawn.mapRect(-460, 100, 1570, 400);
        spawn.mapVertex(965, 67, "0 -100   220 0   0 0");
        spawn.mapVertex(-185, 67, "0 -100   -420 0   0 0");
        spawn.mapVertex(1210, 365, "0 -400   300 0   0 0");
        spawn.mapRect(257.5, -358.5, 50, 360);
        spawn.mapRect(-83, -358.5, 350, 50);

        //blocks in river/waterfall
        spawn.mapRect(1275, 0, 450, 75);
        spawn.mapRect(2027, -388, 600, 75);
        spawn.mapRect(1726, -791, 330, 19);
        spawn.mapRect(1696, -772, 390, 19);
        spawn.mapRect(1666, -753, 450, 19);
        spawn.mapRect(1636, -734, 510, 19);

        spawn.mapRect(1666, -1091, 450, 75);

        //buildings
        spawn.mapRect(4873, -2512, 800, 75);
        spawn.mapRect(4473, -2212, 800, 75);
        spawn.mapRect(4473, -2912, 50, 800);
        spawn.mapRect(5673, -2712, 50, 575);
        spawn.mapRect(6671.5, -2401.4, 500, 50);
        spawn.mapRect(6105.1, -2354.1, 400, 50);
        spawn.mapRect(4473, -2952, 8, 75);//1,3,2
        spawn.mapRect(4493, -3032, 15, 150);
        spawn.mapRect(4513, -2982, 7, 75);
        spawn.mapRect(5673, -2742, 12, 50);
        spawn.mapRect(5703, -2772, 8, 100);


        //building 2
        spawn.mapRect(7473, -3412, 50, 800);
        spawn.mapRect(7473, -2312, 50, 500);
        spawn.mapRect(8673, -3212, 50, 1075);
        spawn.mapRect(7523, -2313, 800, 75);
        spawn.mapRect(7523, -2763, 800, 75);
        spawn.mapRect(7523, -3213, 800, 75);
        spawn.mapRect(8725, -2340, 400, 50);
        spawn.mapRect(8925, -2640, 200, 50);
        spawn.mapRect(8725, -2940, 200, 50);

        //stairs
        spawn.mapRect(8323, -2363, 50, 50);
        spawn.mapRect(8373, -2413, 50, 50);
        spawn.mapRect(8423, -2463, 50, 50);
        spawn.mapRect(8473, -2513, 250, 50);

        //stairs 2
        spawn.mapRect(8523, -3013, 50, 50)//make block
        spawn.mapRect(8473, -3063, 50, 50)//make block
        spawn.mapRect(8423, -3113, 50, 50)//make block

        //trees in tunnel
        spawn.mapRect(4485, -1243, 600, 50)
        spawn.mapRect(3967, -1056, 400, 50)
        spawn.mapRect(5453, -1150, 50, 300)
        spawn.mapRect(5453, -1700, 50, 300)


        //tunnels and boss
        spawn.mapRect(6500, -2000, 3100, 800);
        spawn.mapRect(7500, -2000, 3300, 3700);
        spawn.mapRect(4900, -800, 2300, 1000);
        spawn.mapRect(4354, 1230, 4000, 470);
        spawn.mapRect(5388, 863, 100, 500);
        spawn.mapRect(5388, 63, 100, 500);
        spawn.mapRect(5834, 549, 500, 80);
        spawn.mapRect(6756, 897, 400, 80);

        //light
        spawn.mapRect(6250, 200, 150, 12);



        //extra boss
        spawn.mapRect(9196, -11492, 500, 100);
        spawn.mapRect(9196, -11492, 500, 100);

        //bunker
        spawn.mapRect(11500, -2000, 1900, 500);
        spawn.mapRect(10800, -900, 800, 2600);
        spawn.mapRect(11600, -340, 1800, 2600);
        spawn.mapRect(13400, -2000, 1800, 3600);
        spawn.mapRect(10800, -2500, 200, 100);
        spawn.mapVertex(11400, -2233, "0 10  900 510  800 510  750 510  0 110");

        spawn.mapVertex(10100, -2000, "0 0  0 -250  400 0");
        spawn.mapRect(12945.0, -741.9, 600, 50);
        spawn.mapRect(12945.0, -741.9, 50, 250);
        //stairs
        spawn.mapRect(11600, -850, 50, 550);
        spawn.mapRect(11650, -800, 50, 500);
        spawn.mapRect(11700, -750, 50, 450);
        spawn.mapRect(11750, -700, 50, 400);
        spawn.mapRect(11800, -650, 50, 350);
        spawn.mapRect(11850, -600, 50, 300);
        spawn.mapRect(11900, -550, 50, 250);
        spawn.mapRect(11950, -500, 50, 200);
        spawn.mapRect(12000, -450, 50, 150);
        spawn.mapRect(12050, -400, 50, 100);
        spawn.mapRect(12100, -350, 50, 50);


        //mobs
        //spawn.tetherBoss(6480, 992, { x: 6480, y: 210 })

        if (Math.random() < 0.15) {
            spawn.tetherBoss(6480, 992, { x: 6480, y: 210 })
        } else {
            spawn.randomLevelBoss(5977, 992)
        }


        //mobs for waterfall and first cavern
        //spawn.randomSmallMob(1999.2, -487.4);
        spawn.randomMob(1999.2, -487.4, 0.8);
        //spawn.randomSmallMob(2080.0, -1206.4);
        spawn.randomMob(2080.0, -1206.4, 0.8);
        spawn.randomSmallMob(3287.5, -1021.1);
        //spawn.randomSmallMob(3992.2, -1223.9);
        spawn.randomSmallMob(5018.1, -1483.5);
        spawn.randomGroup(6776.2, -3054.5, 0.4);
        spawn.randomGroup(4217.4, -1403.6, 0.4);


        //surface area mobs
        spawn.randomSmallMob(5089.0, -2284.1);
        spawn.randomSmallMob(6988.3, -2580.2);
        spawn.randomSmallMob(7975.0, -2920.3);
        spawn.randomMob(5132.0, -2646.2, 0.8);
        spawn.randomMob(6365.2, -2459.2, 0.8);
        spawn.randomMob(8129.0, -2406.7, 0.8);
        spawn.randomMob(8129.0, -2406.7, 0.8);
        spawn.randomGroup(2225.3, -1543.2, 0.4);


        spawn.debris(4426.9, -1433.8, 700, 1); //16 debris per level
        spawn.debris(4651.2, -2597.3, 700, 1); //16 debris per level
        spawn.debris(9920.9, -2378.3, 700, 2); //16 debris per level
        spawn.debris(8298.5, -2883.8, 700, 1); //16 debris per level
        spawn.debris(6779.2, -2662.9, 700, 1); //16 debris per level
        spawn.debris(6371.5, 442.3, 700, 2); //16 debris per level
        spawn.debris(1873.5, -1297.5, 700, 1); //16 debris per level

        spawn.bodyRect(6457.9, -2541.5, 300, 25, 0.9);
        //spawn.bodyRect(5685, -2140, 25, 140, 0.9); 
        spawn.bodyRect(4473, -2110, 50, 110, 1, 1);
        //spawn.bodyRect(5292.1, -2617.2, 50, 50, 0.9); 
        spawn.bodyRect(6370.1, -2408.4, 50, 50, 0.9);
        //spawn.bodyRect(5467, -1400, 25, 250, 0.9); 

        spawn.bodyRect(4509.0, -1425.7, 30 + 45 * Math.random(), 30 + 45 * Math.random(), 0.9);
        //spawn.bodyRect(8082.9, -2488.1, 30 + 45 * Math.random(), 30 + 45 * Math.random(), 0.9); 
        spawn.bodyRect(7859.6, -2883.6, 30 + 45 * Math.random(), 30 + 45 * Math.random(), 0.9);
        //spawn.bodyRect(5609.5, 948.5, 30 + 45 * Math.random(), 30 + 45 * Math.random(), 0.9); 
        spawn.bodyRect(5803.7, 1125.5, 30 + 45 * Math.random(), 30 + 45 * Math.random(), 0.9);
        //spawn.bodyRect(5492.1, 1061.7, 90, 169, 0.9); 
        spawn.bodyRect(5582.1, 1061.7, 110, 70, 0.9);
        //spawn.bodyRect(5582.1, 961.7, 50, 30, 0.9); 

        //button block
        spawn.bodyRect(4900 + Math.random() * 400, -2600, 70, 70, 1);



        // spawn.randomSmallMob(1300, -70);
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomSmallMob(1300, -70);

        // powerUps.spawnStartingPowerUps(1475, -1175);
        // spawn.debris(750, -2200, 3700, 16); //16 debris per level
        // spawn.bodyRect(1540, -1110, 300, 25, 0.9); 
        // spawn.randomSmallMob(1300, -70);
        // spawn.randomMob(2650, -975, 0.8);
        // spawn.randomGroup(1700, -900, 0.4);
        // if (simulation.difficulty > 1) spawn.randomLevelBoss(2200, -1300);
        // spawn.secondaryBossChance(100, -1500)
        powerUps.addResearchToLevel() //needs to run after mobs are spawned

        function muteAll() {
            rain1.muted = true
            ambiance1.muted = true
            rain3.muted = true
            thunder1.muted = true
            thunder2.muted = true
            thunder3.muted = true
            thunder4.muted = true
        }


        function checkForWaterXSpeed(objectX, objectY) {
            let waterXForce = 0;

            if (objectY > -70 && objectX < 2785) {
                waterXForce = -1 * (2 + objectY / 150)
            }
            if (objectX > 2600 && objectX < 4500 && objectY < -1900 && objectY > -2121.3) {
                waterXForce = -2
            }
            if (objectX > 4500 && objectX < 6000 && objectY < -1900 && objectY > -2121.3) {
                waterXForce = 0.4
            }
            if (objectX > 6500 && objectX < 10000 && objectY < -1900 && objectY > -2121.3) {
                waterXForce = -1
            }
            if (objectX > 2600 && objectX < 6100 && objectY < -650 && objectY > -920) {
                waterXForce = -0.4
            }
            if (objectX > 6500 && objectX < 7300 && objectY < -650 && objectY > -920 && m.onGround) {
                waterXForce = 0.2
            }
            return waterXForce;
        }

        function checkForWaterYSpeed(objectX, objectY) {
            let waterYForce = 0;
            if (objectX > 2400 && objectX < 2600) {
                waterYForce = 4
            }
            if (player.position.x > 7200 && player.position.x < 7350 && player.position.y > -950 && player.position.y < 1250) {
                waterYForce = 0.8
            }
            if (player.position.x > 6100 && player.position.x < 6200 && player.position.y < -800 && player.position.y > -2000) {
                waterYForce = 0.3
            }
            if (player.position.x > 6400 && player.position.x < 6500 && player.position.y < -800 && player.position.y > -2000) {
                waterYForce = 0.3
            }
            return waterYForce;
        }

        function checkForPush(objectX, objectY) {
            return (objectY > -70 && objectX < 2785 || objectX > 2400 && objectX < 2600 || objectX > 2600 && objectX < 6000 && objectY < -1900 && objectY > -2121.3 || objectX > 6500 && objectX < 10000 && objectY < -1900 && objectY > -2121.3 || objectX > 2600 && objectX < 6100 && objectY < -650 && objectY > -920 || objectX > 6500 && objectX < 7300 && objectY < -650 && objectY > -920 || objectX > 7200 && objectX < 7350 && objectY > -950 && objectY < 1250 || objectX > 6100 && objectX < 6200 && objectY < -800 && objectY > -2000 || objectX > 6400 && objectX < 6500 && objectY < -800 && objectY > -2000);
        }

        function playRandomThunder() {
            let tempRandom = Math.floor(4 * Math.random())
            switch (tempRandom) {
                case 1:
                    // simulation.inGameConsole(`thunder1`)
                    thunder1.play();
                    break;
                case 2:
                    // simulation.inGameConsole(`thunder2`)
                    thunder2.play();
                    break;
                case 3:
                    // simulation.inGameConsole(`thunder3`)
                    thunder3.play();
                    break;
                case 4:
                    // simulation.inGameConsole(`thunder4`)
                    thunder4.play();
                    break;
                default:
                    // simulation.inGameConsole(`thunder5`)
                    thunder4.play();
                    break;

            }
        }
    },
    underpass() {
        simulation.inGameConsole(`<strong>underpass</strong> by <span class='color-var'>Richard0820</span>`);

        let key = false;
        const door = level.door(2650, -825, 50, 250, 250, 10);
        const elevator = level.elevator(-11050, -650, 450, 75, -2975, 0.003, { up: 0.1, down: 0.1 })
        const slimePit = level.hazard(-4775, -350, 1975, 175);
        const boost = level.boost(137.5, -600, 75);

        let base = Matter.Bodies.rectangle(-4375, -1000, 100, 100, {
            density: 0.05,
            isNotHoldable: true,
            restitution: 1.05,
            isStatic: false
        }, true, [true], 0);
        let left = Matter.Bodies.rectangle(-4375 + 50, -1000 - 50, 50, 50, {//not actually left/right
            density: 0.05,
            isNotHoldable: true,
            isStatic: false
        });
        let right = Matter.Bodies.rectangle(-4375 - 50, -1000 - 50, 50, 50, {
            density: 0.05,
            isNotHoldable: true,
            isStatic: false
        });
        let left2 = Matter.Bodies.rectangle(-4375 - 50, -1000 + 50, 50, 50, {
            density: 0.05,
            isNotHoldable: true,
            isStatic: false
        });
        let right2 = Matter.Bodies.rectangle(-4375 + 50, -1000 + 50, 50, 50, {
            density: 0.05,
            isNotHoldable: true,
            isStatic: false
        });
        dong = Matter.Body.create({
            parts: [base, left, right, left2, right2]
        });
        body[body.length] = base;
        body[body.length] = left;
        body[body.length] = right;
        body[body.length] = left2;
        body[body.length] = right2;
        Matter.Composite.add(engine.world, dong)
        Matter.Composite.add(engine.world, Constraint.create({
            pointA: { x: -3825, y: -975 },
            bodyB: dong,
            stiffness: 0.2,
            damping: 0.1
        }));
        composite[composite.length] = dong;
        setTimeout(function () {
            dong.collisionFilter.category = cat.body;
            dong.collisionFilter.mask = cat.body | cat.player | cat.bullet | cat.mobBullet | cat.mob //| cat.map 
        }, 1000);
        level.custom = () => {
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = "#80808077";
            ctx.strokeStyle = "#80808022";
            ctx.fillRect(225, -1025, 2400, 450);
            ctx.fillRect(-2950, -1025, 3100, 450);
            ctx.fillRect(-7050, -1025, 2400, 450);
            ctx.fillRect(-10575, -3975, 4525, 1025);
            ctx.fillRect(-4650, -1700, 1700, 1100);
            ctx.fillRect(-11150, -3575, 575, 3050);
            ctx.fillRect(-11900, -1000, 750, 475);
            ctx.fill()
            ctx.stroke()
            ctx.restore()
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = "#d8dadf";
            ctx.strokeStyle = "#d8dadf";
            ctx.moveTo(-2950, -600);
            ctx.lineTo(-3730, -1725);
            ctx.lineTo(-3730, -600);

            ctx.moveTo(-4650, -600);
            ctx.lineTo(-3925, -1725);
            ctx.lineTo(-3925, -575);

            ctx.moveTo(-10575, -3425); //NE section
            ctx.lineTo(-10100, -2975);
            ctx.lineTo(-10575, -2975);

            // ctx.moveTo(-7625, -3800);
            // ctx.lineTo(-6750, -2975);
            // ctx.lineTo(-7625, -2975);

            ctx.moveTo(-7975, -2975);
            ctx.lineTo(-7625, -3800);
            ctx.lineTo(-7350, -2950);

            ctx.moveTo(-6750, -2975);
            ctx.lineTo(-7075, -3800);
            ctx.lineTo(-7350, -2950);

            // ctx.moveTo(-7975, -2975);
            // ctx.lineTo(-7075, -3800);
            // ctx.lineTo(-7075, -2975);

            ctx.moveTo(-11900, -950);
            ctx.lineTo(-11900, -550);
            ctx.lineTo(-11500, -550);

            ctx.fillRect(-3925, -1675, 200, 1075);
            ctx.fillRect(-7625, -3800, 550, 875);
            ctx.clearRect(-10600, -4000, 525, 475);
            ctx.clearRect(-10100, -4000, 500, 300);
            ctx.clearRect(-9625, -4000, 500, 175);
            ctx.fillRect(-11125, -3600, 550, 50);
            ctx.fillRect(-10600, -3400, 50, 425);
            ctx.fillRect(-11925, -925, 45, 375);
            ctx.fillRect(-3950, -1675, 75, 1100);
            ctx.fillRect(-3925, -625, 950, 50);
            ctx.fillRect(-4650, -600, 1700, 375);
            ctx.fillRect(-14550, -2400, 2650, 2050);
            //ctx.clearRect(-11050, -3000, 475, 50);

            ctx.moveTo(-11150, -3575);
            ctx.lineTo(-10575, -2150);
            ctx.lineTo(-10575, -3575);

            ctx.stroke()
            ctx.fill()
            ctx.restore()
            boost.query()
            slimePit.query()
            if (Matter.Query.collides(dong, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                const dmg = 0.05 * spawn.dmgToPlayerByLevelsCleared()
                m.takeDamage(dmg);
                simulation.drawList.push({ //add dmg to draw queue
                    x: dong.position.x,
                    y: dong.position.y,
                    radius: Math.sqrt(dmg) * 200,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                });
            }
            for (let i = 0; i < mob.length; i++) {
                if (Matter.Query.collides(dong, [mob[i]]).length > 0) {
                    const dmg = 1;
                    mob[i].damage(dmg, true);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: dong.position.x,
                        y: dong.position.y,
                        radius: Math.sqrt(dmg) * 50,
                        color: simulation.mobDmgColor,
                        time: simulation.drawTime
                    });
                    break
                }
            }
            level.exit.drawAndCheck();
            ctx.beginPath()
            ctx.fillStyle = '#68686822';
            ctx.fillRect(-25, -2175, 100, 200);
            ctx.fill()
            ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
            ctx.moveTo(-3825, -975)
            ctx.lineTo(dong.position.x, dong.position.y)
            ctx.stroke();
            ctx.setLineDash([]);
            simulation.drawList.push({ //add dmg to draw queue
                x: dong.position.x,
                y: dong.position.y,
                radius: 10,
                color: color.block,
                time: 20
            });
            ctx.beginPath()
            ctx.fillStyle = `rgba(68,68,68, ${3 * Math.sin(simulation.cycle * 0.015)})`
            ctx.fillRect(-3000, -2175, 175, 25);
            ctx.fillRect(-2850, -2300, 25, 150);
            ctx.fillRect(-3000, -2300, 175, 25);
            ctx.fillRect(-3000, -2425, 25, 150);
            ctx.fillRect(-3000, -2425, 175, 25);
            ctx.fill()
            ctx.fillStyle = `rgba(68,68,68, ${5 * Math.sin(simulation.cycle * 0.015)})`
            ctx.fillRect(-2725, -2425, 25, 275);
            ctx.fillRect(-2725, -2425, 175, 25);
            ctx.fillRect(-2575, -2425, 25, 275);
            ctx.fillRect(-2725, -2300, 175, 25);
            ctx.fill()
            ctx.fillStyle = `rgba(68,68,68, ${7 * Math.sin(simulation.cycle * 0.015)})`
            ctx.fillRect(-2450, -2425, 25, 275);
            ctx.fillRect(-2450, -2175, 175, 25);
            ctx.fill()
            ctx.stroke();
            ctx.fillStyle = `#00FFFF22`;
            ctx.fillRect(-7650, -2975 - 100, 600, 2375 + 100)
            ctx.fill()
            ctx.fillStyle = `#00FFFF66`
            ctx.fillRect(-7650 + Math.floor(Math.random() * 600), -2975 - 100, 5, 2375 + 100)
            ctx.fillRect(-7650 + Math.floor(Math.random() * 600), -2975 - 100, 5, 2375 + 100)
            ctx.fillStyle = `rgba(68, 68, 68)`
            ctx.fillRect(-7675, -3075, 50, 125);
            ctx.fillRect(-7075, -3075, 50, 125);
            ctx.fillRect(-7725, -3025, 75, 75);
            ctx.fillRect(-7050, -3025, 75, 75);
            ctx.fill()
            for (let i = 0, len = body.length; i < len; ++i) { //push blocks away vertically
                if (body[i].position.x > -7625 && body[i].position.x < -7075 && body[i].position.y > -2975 - 100 && body[i].position.y < -625) {
                    body[i].force.y -= simulation.g * body[i].mass + 0.012;
                }
            }
            for (let i = 0, len = bullet.length; i < len; ++i) { //push bullets away vertically
                if (bullet[i].position.x > -7625 && bullet[i].position.x < -7075 && bullet[i].position.y > -2975 - 100 && bullet[i].position.y < -625) {
                    bullet[i].force.y -= simulation.g * bullet[i].mass;
                }
            }
            for (let i = 0, len = powerUp.length; i < len; ++i) { //push powerups away vertically
                if (powerUp[i].position.x > -7625 && powerUp[i].position.x < -7075 && powerUp[i].position.y > -2975 - 100 && powerUp[i].position.y < -625) {
                    powerUp[i].force.y -= simulation.g * powerUp[i].mass + 0.12;
                }
            }
            for (let i = 0, len = mob.length; i < len; ++i) { //push mobs away vertically
                if (mob[i].position.x > -7625 && mob[i].position.x < -7075 && mob[i].position.y > -2975 - 100 && mob[i].position.y < -625) {
                    mob[i].force.y -= simulation.g * mob[i].mass + 0.0012;
                }
            }
            if (m.pos.x > -7625 && m.pos.x < -7075 && m.pos.y > -2975 - 100 && m.pos.y < -625) {
                player.force.y -= m.mass * simulation.g + (input.down ? 0 : 0.012 * 2);

            }
            ctx.save()
            ctx.beginPath();
            ctx.fillStyle = `rgba(0,250,250, 0.05)`;
            ctx.fillRect(2625, -1000, 350, 450);
            ctx.fill()
            ctx.restore()
            elevator.move()
            if (mob.length <= 5) {
                key = true;
            }
            if (key) {
                level.exit.x = 2775;
                level.exit.y = -650;
            } else {

                ctx.save()
                ctx.beginPath();
                ctx.moveTo(2775, -650 + 30);
                ctx.lineTo(2775, -650 - 80);
                ctx.bezierCurveTo(2775, -650 - 170, 2775 + 100, -650 - 170, 2775 + 100, -650 - 80);
                ctx.lineTo(2775 + 100, -650 + 30);
                ctx.lineTo(2775, -650 + 30);
                ctx.fillStyle = "#00ffff";
                ctx.fill();
                ctx.restore()

                const omega = new Image(); //the seal hehe
                let width = Math.random() * 40; //Math.max(Math.sin(m.cycle * 0.05), Math.cos(m.cycle * 0.05)) * 
                let length = Math.random() * 40; //Math.max(Math.sin(m.cycle * 0.05), Math.cos(m.cycle * 0.05)) * 
                omega.src = "https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/MOSHED-2023-4-20-12-55-58-removebg-preview.png"; //"https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/omegafr.png";
                ctx.drawImage(omega, 2775 + 50 - width, -650 - 50 - length, width * 2, length * 2)
                ctx.save()
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.beginPath()
                // ctx.font = "80px monospace";
                // ctx.fillText("Ω", 2775 + 50, -650 - 50);
                ctx.strokeStyle = "gray";
                ctx.arc(2775 + 50, -650 - 50, 100 * Math.abs(Math.sin(m.cycle * 0.07)) + 10, 0 + Math.sin(m.cycle * 0.1 * Math.PI), 0 + Math.cos(m.cycle * 0.1 + Math.PI))
                ctx.shadowBlur = 10;
                ctx.shadowColor = "black";
                ctx.stroke()
                //ctx.fill()
                ctx.restore()
                ctx.save()
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.beginPath()
                // ctx.font = "80px monospace";
                // ctx.fillText("Ω", 2775 + 50, -650 - 50);
                ctx.strokeStyle = "gray";
                ctx.arc(2775 + 50, -650 - 50, 90 * Math.abs(Math.sin(m.cycle * 0.08)) + 10, 0 + Math.cos(m.cycle * 0.1 * Math.PI), 0 + Math.sin(m.cycle * 0.1 + Math.PI))
                ctx.shadowBlur = 10;
                ctx.shadowColor = "black";
                ctx.stroke()
                //ctx.fill()
                ctx.restore()
                ctx.save()
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.beginPath()
                // ctx.font = "80px monospace";
                // ctx.fillText("Ω", 2775 + 50, -650 - 50);
                ctx.strokeStyle = "gray";
                ctx.arc(2775 + 50, -650 - 50, 80 * Math.abs(Math.sin(m.cycle * 0.09)) + 10, 0 + Math.tan(m.cycle * 0.1 * Math.PI), 0 + Math.tan(m.cycle * 0.1 + Math.PI))
                ctx.shadowBlur = 10;
                ctx.shadowColor = "black";
                ctx.stroke()
                //ctx.fill()
                ctx.setLineDash([]);
                ctx.restore()
            }
        };
        level.setPosToSpawn(30, -2000); //normal spawn
        level.exit.x = 1375;
        level.exit.y = -1500;
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom + 800)
        document.body.style.backgroundColor = "#d8dadf";
        spawn.mapRect(-225, -1950, 350, 75);
        spawn.mapRect(225, -1950, 50, 75);
        spawn.mapRect(-250, -2025, 50, 150);
        spawn.mapRect(250, -2025, 50, 150);
        spawn.mapRect(-250, -2250, 50, 125);
        spawn.mapRect(-225, -2325, 500, 100);
        spawn.mapRect(250, -2250, 50, 125);
        spawn.mapRect(-100, -2400, 250, 100);
        spawn.mapRect(-25, -2475, 100, 100);
        spawn.mapRect(125, -2350, 50, 50);
        spawn.mapRect(-125, -2350, 50, 50);
        spawn.mapRect(-50, -2425, 50, 50);
        spawn.mapRect(50, -2425, 50, 50);
        spawn.mapRect(-250, -2350, 50, 50);
        spawn.mapRect(250, -2350, 50, 50);
        spawn.mapRect(-75, -1975, 200, 50);
        spawn.mapRect(-50, -2000, 150, 50);
        spawn.mapRect(100, -1950, 50, 75);
        spawn.mapRect(-75, -2250, 200, 50);
        spawn.mapRect(-50, -2225, 150, 50);
        spawn.mapRect(-2950, -1900, 3100, 900);
        spawn.mapRect(225, -1900, 2875, 900);
        spawn.mapRect(-2950, -600, 6050, 450);
        spawn.mapRect(-3050, -500, 200, 350);
        spawn.mapRect(-3150, -400, 200, 250);
        spawn.mapRect(-3250, -300, 200, 150);
        spawn.mapRect(2950, -1050, 150, 500);
        spawn.mapRect(-4675, -1900, 1825, 200);
        spawn.mapRect(-5325, -1900, 675, 900);
        spawn.mapRect(-5325, -250, 2100, 100);
        spawn.mapRect(-5325, -600, 675, 450); // -
        spawn.mapRect(-4700, -500, 150, 350);
        spawn.mapRect(-4650, -400, 200, 250);
        spawn.mapRect(-4550, -300, 200, 150);
        spawn.mapRect(-3875, -1025, 100, 100);
        spawn.mapRect(-3800, -1050, 50, 50);
        spawn.mapRect(-3900, -1050, 50, 50);
        spawn.mapRect(-3800, -950, 50, 50);
        spawn.mapRect(-3900, -950, 50, 50);
        spawn.mapRect(-6925, -1175, 1700, 175);
        spawn.mapRect(-6925, -600, 1725, 175);
        spawn.mapRect(-7700, -600, 800, 425);// -
        spawn.mapRect(-7800, -2950, 175, 2775);
        spawn.mapRect(-7075, -2950, 175, 1950);
        spawn.mapRect(-9150, -2975, 1525, 175);
        spawn.mapRect(-7075, -2975, 1150, 175);
        spawn.mapRect(-6100, -3900, 175, 1100);
        spawn.mapRect(-9150, -3975, 3225, 175);
        spawn.mapRect(-9175, -3850, 75, 75);
        spawn.mapRect(-9625, -3825, 500, 150);
        spawn.mapRect(-9650, -3725, 75, 75);
        spawn.mapRect(-10100, -3700, 500, 150);
        spawn.mapRect(-10100, -2975, 975, 175);
        spawn.mapRect(-10125, -3600, 75, 75);
        spawn.mapRect(-10575, -3575, 500, 150);
        spawn.mapRect(-10575, -2975, 500, 175);
        spawn.mapRect(-11325, -2975, 250, 175);
        spawn.mapRect(-11325, -3575, 175, 775);
        // spawn.mapRect(-11325, -3575, 800, 150);
        spawn.mapRect(-11225, -2975, 150, 2000);
        spawn.mapRect(-10575, -2975, 150, 2500);
        spawn.mapRect(-11650, -550, 1225, 150);
        spawn.mapRect(-11650, -1100, 575, 150);
        spawn.mapRect(-14675, -2525, 2925, 150);
        spawn.mapRect(-11900, -2525, 150, 1575);
        spawn.mapRect(-11850, -1100, 250, 150);
        spawn.mapRect(-11875, -550, 275, 150);
        spawn.mapRect(-11900, -550, 150, 350);
        spawn.mapRect(-14675, -2525, 150, 2300);
        spawn.mapRect(-14675, -375, 2925, 175);
        spawn.mapRect(2725, -625, 250, 50);
        spawn.mapRect(2625, -1025, 100, 225);
        spawn.mapRect(2700, -1025, 300, 125);
        spawn.mapRect(2625, -612.5, 125, 50);
        spawn.mapRect(-3950, -1725, 250, 50);
        spawn.mapRect(-7650, -3825, 600, 50);
        spawn.mapRect(-13900, -2400, 200, 50);
        spawn.mapVertex(-11957, -430, '-175 175 0 175 0 0');
        spawn.mapVertex(-14470, -430, '175 175 0 175 0 0');
        spawn.mapVertex(-11957, -2319, '-175 -175 0 -175 0 0');
        spawn.mapVertex(-14470, -2319, '0 0 0 -175 175 -175');
        //spawn.mapRect(-13900, -2150, 1375, 125);
        // const sword = function() { //the ultimate blade of las destruction // NO SWORD NO DROPS >:(
        // mobs.spawn(player.position.x, player.position.y, 5, 30, "transparent");
        // let me = mob[mob.length - 1];
        // Matter.Body.setDensity(me, 1);
        // me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position);
        // me.collisionFilter.category = cat.bullet;
        // me.collisionFilter.mask = cat.mob | cat.mobBullet;
        // me.isDropPowerUp = false;
        // me.isShielded = true;
        // me.showHealthBar = false;
        // me.isUnblockable = true;
        // me.leaveBody = false;
        // me.isBadTarget = true;
        // me.stroke = "transparent";
        // me.isSword = true;
        // let index = 0;
        // let radius = 50;
        // // const len = cons.length;
        // // cons[len] = Constraint.create({
        // // pointA: player.position,
        // // bodyB: me,
        // // stiffness: 0.14,
        // // damping: 0.5
        // // });
        // // setTimeout(function(){
        // // Composite.add(engine.world, cons[cons.length - 1]);
        // // }, 1)
        // // cons[len].length = 100 + 1.5 * radius;
        // me.do = function() {
        // // this.health = Infinity;//just in case
        // // for(let i = 0; i < mob.length; i++) {
        // // if(Matter.Query.collides(this, [mob[i]]).length > 0 && !mob[i].isSword) {
        // // const dmg = 0.25;//do not nerf
        // // mob[i].damage(dmg, true);
        // // simulation.drawList.push({ //add dmg to draw queue
        // // x: mob[i].position.x,
        // // y: mob[i].position.y,
        // // radius: Math.sqrt(dmg) * 50,
        // // color: simulation.mobDmgColor,
        // // time: simulation.drawTime
        // // });
        // // break
        // // }
        // // }
        // Matter.Body.setPosition(this, {
        // x: player.position.x + Math.cos(m.angle) * 100,
        // y: player.position.y - (input.down ? 0 : 30) + Math.sin(m.angle) * 100
        // })
        // // this.force.x = Math.cos(m.angle) * 350;
        // // this.force.y = Math.sin(m.angle) * 350;
        // Matter.Body.setAngle(this, m.angle + Math.PI * 2);
        // const setNoseShape = () => {
        // const mag = radius + radius * 10;
        // this.vertices[2].x = this.position.x + Math.cos(this.angle) * mag;
        // this.vertices[2].y = this.position.y + Math.sin(this.angle) * mag;							
        // this.vertices[4].x = this.position.x + Math.cos(this.angle) * mag;
        // this.vertices[4].y = this.position.y + Math.sin(this.angle) * mag;							
        // this.vertices[0].x = this.position.x + Math.cos(this.angle) * mag;
        // this.vertices[0].y = this.position.y + Math.sin(this.angle) * mag;
        // };
        // const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[2], this.position)), radius * 100)
        // const spike2 = Vector.mult(Vector.normalise(Vector.sub(this.vertices[4], this.position)), radius * 500)
        // const spike3 = Vector.mult(Vector.normalise(Vector.sub(this.vertices[0], this.position)), radius * 500)
        // this.vertices[2].x = this.position.x + spike.x / 100
        // this.vertices[2].y = this.position.y + spike.y / 100							
        // this.vertices[4].x = this.position.x + spike2.x / 75
        // this.vertices[4].y = this.position.y + spike2.y / 75							
        // this.vertices[0].x = this.position.x + spike3.x / 75
        // this.vertices[0].y = this.position.y + spike3.y / 75						
        // if(index == 0) {
        // setNoseShape();
        // index++;
        // }
        // ctx.save()
        // ctx.beginPath();
        // const vertices = this.vertices;
        // ctx.lineWidth = 100;
        // ctx.moveTo(vertices[0].x, vertices[0].y);
        // for (let j = 1, len = vertices.length; j < len; ++j) ctx.lineTo(vertices[j].x, vertices[j].y);
        // ctx.lineTo(vertices[0].x, vertices[0].y);
        // const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 15, this.position.x, this.position.y, Math.abs(275 * Math.sin(simulation.cycle / 50)) + 15);
        // // Add three color stops
        // gradient.addColorStop(0, m.eyeFillColor);
        // gradient.addColorStop(0.9, "white");
        // gradient.addColorStop(1, "darkgray");
        // ctx.fillStyle = gradient;
        // ctx.strokeStyle = "transparent";
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = m.eyeFillColor;
        // ctx.fill();
        // ctx.stroke();
        // ctx.restore()

        // const Dx = Math.cos(m.angle);
        // const Dy = Math.sin(m.angle);
        // let xElec = this.position.x + 10 * Dx;
        // let yElec = this.position.y + 10 * Dy;
        // ctx.beginPath();
        // ctx.moveTo(xElec, yElec);
        // const step = 40
        // for (let i = 0; i < 6; i++) {
        // xElec += step * (Dx + 1.5 * (Math.random() - 0.5))
        // yElec += step * (Dy + 1.5 * (Math.random() - 0.5))
        // ctx.lineTo(xElec, yElec);
        // }
        // ctx.strokeStyle = m.eyeFillColor;
        // ctx.lineWidth = 1.5;
        // ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
        // ctx.stroke(); // Draw it
        // ctx.setLineDash([]);
        // if(this.alive && m.energy > 0) {
        // const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 0, this.position.x, this.position.y, Math.abs(20 * Math.cos(simulation.cycle / 50)));
        // // Add three color stops
        // gradient.addColorStop(0, m.eyeFillColor);
        // gradient.addColorStop(0.9, "white");
        // gradient.addColorStop(1, "gray");
        // ctx.save()
        // ctx.beginPath()
        // ctx.moveTo(this.position.x, this.position.y)
        // ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI)
        // ctx.fillStyle = gradient;
        // ctx.strokeStyle = "transparent";
        // ctx.shadowBlur = 10;
        // ctx.shadowColor = m.eyeFillColor;
        // ctx.fill()
        // ctx.stroke()
        // ctx.restore()
        // m.energy -= 0.002;

        // ctx.save()
        // ctx.translate(this.vertices[2].x, this.vertices[2].y)
        // ctx.rotate(m.angle + Math.PI / 2)
        // ctx.beginPath()
        // ctx.font = "16px Arial";
        // ctx.fillStyle = "black";
        // ctx.strokeStyle = "black";
        // // ctx.fillText("Θ", 0,0 - 110)
        // // ctx.fillText("ά", 0,15 - 110)
        // // ctx.fillText("ν", 0,30 - 110)
        // // ctx.fillText("α", 0,45 - 110)
        // // ctx.fillText("τ", 0,60 - 110)
        // // ctx.fillText("ο", 0,75 - 110)
        // // ctx.fillText("ς", 0,90 - 110)
        // ctx.fillText("Ω", 0,55)
        // ctx.fill()
        // ctx.stroke()
        // ctx.restore()

        // simulation.drawList.push({
        // x: this.position.x + Math.floor(Math.random() * 300 - Math.random() * 300),
        // y: this.position.y + Math.floor(Math.random() * 300 - Math.random() * 300),
        // radius: 2,
        // color: m.eyeFillColor,
        // time: simulation.drawTime
        // });
        // } else {
        // this.death()
        // powerUps.activated = false
        // }
        // // me.onDeath = function() {
        // // this.removeCons();
        // // };					
        // }
        // }
        //setTimeout(function() {sword();}, 100);
        const wire = function () {
            const breakingPoint = -1600;
            const spawnx = -13800 + Math.floor(Math.random() * 100 - Math.random() * 100);
            mobs.spawn(spawnx, -2375, 0, 2, "transparent");
            let me = mob[mob.length - 1];
            let boss = mob[0];
            me.collisionFilter.category = cat.body;
            me.collisionFilter.mask = cat.map;
            me.g = 0.0003; //required for gravity
            me.restitution = 0;
            me.stroke = "transparent"
            me.freeOfWires = false;
            me.frictionAir = 0.01;
            me.isDropPowerUp = false;
            me.showHealthBar = false;
            me.isBadTarget = true;
            me.isUnblockable = true;
            const wireX = spawnx;
            const wireY = -2375;
            //const randomw = Math.floor(Math.random() * 100 - Math.random() * 100);
            const width = Math.abs(10 + Math.floor(Math.random() * 10 - Math.random() * 10));
            const randomx = Math.floor(30 * Math.random() - 30 * Math.random());
            const randomy = Math.floor(10 * Math.random() - 10 * Math.random())
            me.do = function () {
                if (this.freeOfWires) {
                    this.gravity();
                } else {
                    if (boss.position.y > breakingPoint) {
                        this.freeOfWires = true;
                        this.force.y -= -0.0006;
                        this.force.x += Math.random() * boss.velocity.x / 10000;
                        this.fill = "#111";
                    }
                    //move mob to mob
                    Matter.Body.setPosition(this, {
                        x: boss.position.x + randomx,
                        y: boss.position.y + randomy
                    })
                }
                //draw wire
                ctx.beginPath();
                ctx.moveTo(wireX, wireY);
                ctx.quadraticCurveTo(wireX, -100, this.position.x, this.position.y);
                ctx.lineWidth = width;
                ctx.lineCap = "butt";
                ctx.strokeStyle = "#111";
                ctx.stroke();
                ctx.lineCap = "round";
            };
        }

        const ball = function (x, y, radius = 11 * tech.bulletSize, sides = 70) {//superball //also, why is it called superballs?
            mobs.spawn(x, y, sides, radius, "rgba(0,0,0)");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.onHit = function () {
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: 20,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                });
            };
            Matter.Body.setDensity(me, 0.00001); //normal is 0.001
            me.timeLeft = 500;
            me.friction = 0;
            me.restitution = 1;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            //me.inertia = Infinity;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.bullet | cat.player | cat.map | cat.body;
            let index = 0;
            me.do = function () {
                this.timeLimit();
                this.alwaysSeePlayer()
                this.force.y += this.mass * 0.0012;
            }
        }
        const normalBullet = function (x, y, radius = 9, sides = 3) {
            //bullets
            mobs.spawn(x, y, sides, radius, "rgba(0,0,0)");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position);
            me.onHit = function () {
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: 20,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                });
            };
            Matter.Body.setDensity(me, 0.00004); //normal is 0.001
            me.timeLeft = 220;
            me.frictionAir = -0.01;
            me.restitution = -1;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            //me.inertia = Infinity;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = null;
            me.boss = null;
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].restoreBoss) {
                    me.boss = mob[i];
                }
            }
            let index = 0;
            me.do = function () {
                this.timeLimit();
                this.alwaysSeePlayer()
                const setNoseShape = () => {
                    const mag = this.radius + this.radius * 10;
                    this.vertices[1].x = this.position.x + Math.cos(this.angle) * mag;
                    this.vertices[1].y = this.position.y + Math.sin(this.angle) * mag;
                    const angle = Math.atan2(this.position.y - me.boss.position.y, this.position.x - me.boss.position.x);
                    Matter.Body.setAngle(this, angle);
                };
                const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[1], this.position)), radius * 1000)
                this.vertices[1].x = this.position.x + spike.x / 100
                this.vertices[1].y = this.position.y + spike.y / 100
                if (index == 0) {
                    setNoseShape();
                    index++;
                }
                if (Matter.Query.collides(this, map).length > 0 || Matter.Query.collides(this, body).length > 0) {
                    const slow = 0.69 //im sorry it looks cool though
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * slow,
                        y: this.velocity.y * slow
                    });
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: 10,
                        color: '#000000',
                        time: simulation.drawTime
                    });
                    if (this.velocity.x == 0 && this.velocity.y == 0) {
                        this.death();
                    }
                    this.frictionAir += 0.0001;
                    Matter.Body.setAngularVelocity(this, 0)
                }
                if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles // I wasnt gonna add this but since ya'll would have killed me if I didn't I added this
                    const dmg = 0.013 * spawn.dmgToPlayerByLevelsCleared();
                    m.takeDamage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: Math.sqrt(dmg) * 200,
                        color: '#000000',
                        time: simulation.drawTime
                    });
                }
            };
        }
        const foamBullet = function (x, y, radius = 9, sides = 70) { //bullets
            mobs.spawn(x, y, sides, radius, "rgb(0,0,0)");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            Matter.Body.setDensity(me, 0.00005); //normal is 0.001
            me.timeLeft = 120;
            // me.g = 0.0005; //required if using this.gravity
            me.accelMag = 0.00006;
            me.isVerticesChange = true
            me.delay = 360 * simulation.CDScale;
            me.spikeVertex = 0;
            me.spikeLength = 0;
            me.isSpikeGrowing = false;
            me.spikeGrowth = 0;
            me.isSpikeReset = false;
            me.frictionAir = 0;
            me.restitution = 0;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.showHealthBar = false;
            me.isUnblockable = true;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.body //| cat.bullet;// | cat.player;
            me.do = function () {
                if (this.distanceToPlayer2() < 40000) {
                    this.force = Vector.mult(Vector.normalise(Vector.sub(player.position, this.position)), this.mass * 0.004)
                    const slow = 0.99999999999999999;
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * slow,
                        y: this.velocity.y * slow
                    });
                }
                // this.gravity();
                this.timeLimit();
                // for (let i = 0, len = this.vertices.length; i < len; i++) {
                // const dist = Vector.sub(this.seePlayer.position, this.vertices[i]);
                // const distMag = Vector.magnitude(dist);
                // const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[i], this.position)), radius * distMag)
                // this.vertices[i].x = this.position.x + spike.x / 100
                // this.vertices[i].y = this.position.y + spike.y / 100
                // }
                if (this.radius < 50) {
                    const scale = 1.05;
                    Matter.Body.scale(this, scale, scale);
                    this.radius *= scale;
                }
                if (Matter.Query.collides(this, map).length > 0 || Matter.Query.collides(this, body).length > 0 && this.speed < 10) {
                    const slow = 0.97
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * slow,
                        y: this.velocity.y * slow
                    });
                    const SCALE = 0.9
                    Matter.Body.scale(this, SCALE, SCALE);
                    this.radius *= SCALE;
                    if (this.radius < 1) {
                        this.death()
                    }
                } else {
                    this.attach();
                }

            };
            me.attach = function () {
                if (Matter.Query.collides(this, [player]).length > 0) {
                    Matter.Body.setPosition(this, player.position)
                    if (player.speed > 2.5) Matter.Body.setVelocity(player, Vector.mult(player.velocity, 0.94))
                    Matter.Body.setAngularVelocity(player, player.angularVelocity * 0.9);
                    m.takeDamage(0.00003); //balanced? not sure
                }
            }
        };

        const orbital = function (who, radius, phase, speed, radius2) {//basically orbitBot
            mobs.spawn(who.position.x, who.position.y, 8, 12, "rgba(0,0,0, 1)");
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            Matter.Body.setDensity(me, 0.01); //normal is 0.001
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.isBadTarget = true;
            me.showHealthBar = false;
            me.isOrbital = true;
            me.isShielded = true
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
                Matter.Body.setPosition(this, Vector.add(Vector.add(who.position, who.velocity), Vector.mult(orbit, radius + radius2)))
                //damage player
                if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles
                    const dmg = 0.013 * spawn.dmgToPlayerByLevelsCleared()
                    m.takeDamage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: this.position.x,
                        y: this.position.y,
                        radius: Math.sqrt(dmg) * 200,
                        color: simulation.mobDmgColor,
                        time: simulation.drawTime
                    });
                    //this.death();
                }
            };
        }
        const missile = function (where, speed = 0.007, size = 1) {
            mobs.spawn(where.x, where.y, 3, 20, '#000000');
            let me = mob[mob.length - 1];
            me.accelMag = speed;
            Matter.Body.setDensity(me, 0.0000000000001);
            me.stroke = 'transparent';
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.bullet | cat.player | cat.map | cat.body;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.onHit = function () {
                b.explosion(this.position, (tech.isMissileBig ? 230 : 180) + 60 * Math.random())
                this.death()
            }
            me.do = function () {
                this.seePlayerByHistory();
                this.alwaysSeePlayer();
                this.attraction();
                const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                Matter.Body.setAngle(this, angle);
                // ctx.beginPath()
                // ctx.strokeStyle = "rgba(255,155,0,0.5)";
                // ctx.lineWidth = 15;
                // ctx.arc(this.vertices[0].x, this.vertices[0].x, 15, 0, 2 * Math.PI);
                // ctx.stroke()
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: 10,
                    color: `rgba(255,155,0,${Math.random()})`,
                    time: simulation.drawTime
                });
            }
        }
        const railBullet = function (x, y) {
            mobs.spawn(x, y, 5, 20, "black");
            let me = mob[mob.length - 1];
            me.stroke = "black";
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position);
            me.onHit = function () {
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: 20,
                    color: simulation.mobDmgColor,
                    time: simulation.drawTime
                });
            };
            Matter.Body.setDensity(me, 0.00004); //normal is 0.001
            me.timeLeft = 220;
            me.frictionAir = -0.01;
            me.restitution = -1;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            //me.inertia = Infinity;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.player;
            const radius = 30;
            let index = 0;
            me.do = function () {
                this.timeLimit();
                this.alwaysSeePlayer()
                const setNoseShape = () => {
                    const mag = me.radius + me.radius * 10;
                    const angle = Math.atan2(me.seePlayer.position.y - this.position.y, me.seePlayer.position.x - this.position.x);
                    me.vertices[2].x = this.position.x + Math.cos(this.angle) * mag;
                    me.vertices[2].y = this.position.y + Math.sin(this.angle) * mag;
                    me.vertices[4].x = this.position.x + Math.cos(this.angle) * mag;
                    me.vertices[4].y = this.position.y + Math.sin(this.angle) * mag;
                    me.vertices[0].x = this.position.x + Math.cos(this.angle) * mag;
                    me.vertices[0].y = this.position.y + Math.sin(this.angle) * mag;
                    Matter.Body.setAngle(this, angle);
                };
                const spike = Vector.mult(Vector.normalise(Vector.sub(this.vertices[2], me.position)), radius * 1000)
                const spike2 = Vector.mult(Vector.normalise(Vector.sub(this.vertices[4], me.position)), radius * 1000)
                const spike3 = Vector.mult(Vector.normalise(Vector.sub(this.vertices[0], me.position)), radius * 1000)
                me.vertices[2].x = this.position.x + spike.x / 100
                me.vertices[2].y = this.position.y + spike.y / 100
                me.vertices[4].x = this.position.x + spike2.x / 75
                me.vertices[4].y = this.position.y + spike2.y / 75
                me.vertices[0].x = this.position.x + spike3.x / 75
                me.vertices[0].y = this.position.y + spike3.y / 75
                if (index == 0) {
                    setNoseShape();
                    index++;
                }
                if (Matter.Query.collides(this, map).length > 0 || Matter.Query.collides(this, body).length > 0) {
                    const slow = 0.69 //im sorry it looks cool though
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * slow,
                        y: this.velocity.y * slow
                    });
                    // simulation.drawList.push({ //add dmg to draw queue
                    // x: this.position.x,
                    // y: this.position.y,
                    // radius: 10,
                    // color: '#000000',
                    // time: simulation.drawTime
                    // });					
                    if (this.velocity.x == 0 && this.velocity.y == 0) {
                        this.death();
                    }
                    this.frictionAir += 0.0001;
                    Matter.Body.setAngularVelocity(this, 0)
                }
                if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for 30 cycles // I wasnt gonna add this but since ya'll would have killed me if I didn't I added this
                    const dmg = 0.013 * spawn.dmgToPlayerByLevelsCleared();
                    m.takeDamage(dmg);
                    // simulation.drawList.push({ //add dmg to draw queue
                    // x: this.position.x,
                    // y: this.position.y,
                    // radius: Math.sqrt(dmg) * 200,
                    // color: '#000000',
                    // time: simulation.drawTime
                    // });
                }
            };
        }
        const grenade = function (x, y, lifeSpan = 90 + Math.ceil(60 / simulation.accelScale), pulseRadius = Math.min(550, 250 + simulation.difficulty * 3), size = 3) {
            mobs.spawn(x, y, 4, size, "rgb(0,0,0)"); //rgb(215,80,190)
            let me = mob[mob.length - 1];
            me.stroke = "transparent";
            me.onHit = function () {
                this.explode(this.mass);
            };
            Matter.Body.setDensity(me, 0.00004); //normal is 0.001

            me.lifeSpan = lifeSpan;
            me.timeLeft = me.lifeSpan;
            // me.g = 0.0002; //required if using this.gravity 
            me.frictionAir = 0;
            me.restitution = 0.8;
            me.leaveBody = false;
            me.isDropPowerUp = false;
            me.isBadTarget = true;
            me.isMobBullet = true;
            me.onDeath = function () {
                //damage player if in range
                if (Vector.magnitude(Vector.sub(player.position, this.position)) < pulseRadius && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage
                    m.takeDamage(0.015 * spawn.dmgToPlayerByLevelsCleared());
                }
                simulation.drawList.push({ //add dmg to draw queue
                    x: this.position.x,
                    y: this.position.y,
                    radius: pulseRadius,
                    color: "rgba(0,0,0,0.3)",
                    time: simulation.drawTime
                });
            };
            me.showHealthBar = false;
            me.collisionFilter.category = cat.mobBullet;
            me.collisionFilter.mask = cat.map | cat.body | cat.player
            // me.collisionFilter.mask = 0
            me.do = function () {
                this.timeLimit();
                ctx.save()
                ctx.beginPath(); //draw explosion outline
                ctx.arc(this.position.x, this.position.y, pulseRadius * (1.01 - this.timeLeft / this.lifeSpan), 0, 2 * Math.PI); //* this.fireCycle / this.fireDelay
                ctx.fillStyle = "rgba(0,0,0,0.05)";
                ctx.fill();
                ctx.restore()
            };
        }
        const sniper = function (x, y, radius = 30) {
            mobs.spawn(x, y, 8, radius, '#00000000');
            let me = mob[mob.length - 1];
            me.accelMag = 0.0003
            me.stroke = 'transparent';
            //me.isBoss = true;
            me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position;
            me.frictionStatic = 0;
            me.friction = 0;
            me.seeAtDistance2 = 20000000 //14000 vision range
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position);
            Matter.Body.rotate(me, Math.random() * Math.PI * 2);
            me.showHealthBar = false
            Matter.Body.setDensity(me, 0.01)
            me.fireDir = { x: 0, y: 0 }
            me.seePlayerFreq = 0
            me.repulsionRange = 400000 + radius * radius;
            me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob | cat.mobBullet
            me.do = function () {
                this.seePlayerCheck();
                this.attraction();
                this.repulsion();
                this.search()
                if (this.seePlayer.recall) {
                    const h = this.radius * 0.3;
                    const w = this.radius * 2;
                    const x = this.position.x - w / 2;
                    const y = this.position.y - w * 0.7;
                    ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                    ctx.fillRect(x, y, w, h);
                    ctx.fillStyle = "rgba(0,255,255,0.7)";
                    ctx.fillRect(x, y, w * this.health, h);
                }
                if (this.health < 1) {
                    this.health += 0.0005; //regen
                }
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                if (this.seePlayer.recall > 0 && this.distanceToPlayer2() > this.repulsionRange) {
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
                } else if (this.distanceToPlayer2() < this.repulsionRange) {
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
                ctx.restore()
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.beginPath(); //eye
                ctx.arc(15, 0, 3.5, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 0, 0, ${this.health * this.health})`;
                ctx.fill()
                ctx.restore()
                //set direction to turn to fire
                if (this.seePlayer.recall && !(simulation.cycle % 30)) {
                    this.seePlayer.recall -= 10;
                    this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                    spawn.sniperBullet(this.position.x, this.position.y, 7 + Math.ceil(this.radius / 15), 5);
                    const v = 10 + 8 * simulation.accelScale;
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: this.velocity.x + this.fireDir.x * v,
                        y: this.velocity.y + this.fireDir.y * v
                    });
                }
            };
        }
        const laserEM = function (x, y, radius = 30) {
            mobs.spawn(x, y, 8, radius, '#00000000');
            let me = mob[mob.length - 1];
            me.accelMag = 0.0003
            me.stroke = 'transparent';
            //me.isBoss = true;
            me.frictionStatic = 0;
            me.friction = 0;
            me.seeAtDistance2 = 20000000 //14000 vision range
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position);
            Matter.Body.rotate(me, Math.random() * Math.PI * 2);
            me.showHealthBar = false
            Matter.Body.setDensity(me, 0.01)
            me.seePlayerFreq = 0
            me.searchTarget = map[Math.floor(Math.random() * (map.length - 1))].position;
            me.swordDamage = 0.025 * spawn.dmgToPlayerByLevelsCleared()
            me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob | cat.mobBullet
            me.repulsionRange = 50000;
            me.do = function () {
                this.repulsion();
                this.search()
                if (this.seePlayer.recall) {
                    const h = this.radius * 0.3;
                    const w = this.radius * 2;
                    const x = this.position.x - w / 2;
                    const y = this.position.y - w * 0.7;
                    ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                    ctx.fillRect(x, y, w, h);
                    ctx.fillStyle = "rgba(0,255,255,0.7)";
                    ctx.fillRect(x, y, w * this.health, h);
                }
                if (this.health < 1) {
                    this.health += 0.0005; //regen
                }
                if (this.seePlayer.recall) {
                    this.laserSword(this.position, Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x), 500 * Math.random());
                }
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                if (this.seePlayer.recall > 0 && this.distanceToPlayer2() > this.repulsionRange) {
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
                } else if (this.distanceToPlayer2() < this.repulsionRange) {
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
                ctx.restore()
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.fillStyle = m.bodyGradient
                ctx.fill();
                ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.beginPath(); //eye
                ctx.arc(15, 0, 3.5, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(255, 0, 0, ${this.health * this.health})`;
                ctx.fill()
                ctx.restore()
                this.seePlayerCheck();
                this.attraction();
            }
            me.laserSword = function (where, angle, length) {
                const sub = Vector.sub(this.seePlayer.position, this.position)
                const unit = Vector.normalise(sub)
                const path = [{
                    x: this.position.x + 20 * Math.cos(this.angle),
                    y: this.position.y + 20 * Math.sin(this.angle)
                },
                {
                    x: this.position.x + (120 + 400) * Math.sqrt(Math.random()) * Math.cos(this.angle),
                    y: this.position.y + (120 + 400) * Math.sqrt(Math.random()) * Math.sin(this.angle)
                }
                ];
                this.seePlayer.recall -= 3;
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
                                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: vertices[j], v2: vertices[j + 1] };
                            }
                        }
                        results = simulation.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
                        if (results.onLine1 && results.onLine2) {
                            const dx = v1.x - results.x;
                            const dy = v1.y - results.y;
                            const dist2 = dx * dx + dy * dy;
                            if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: vertices[0], v2: vertices[len] };
                        }
                    }
                };
                best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                const look = { x: where.x + length * Math.cos(angle), y: where.y + length * Math.sin(angle) };
                // vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                vertexCollision(where, look, map);
                if (!m.isCloak) vertexCollision(where, look, [player]);
                if (best.who && (best.who === player) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for an extra second
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
                ctx.strokeStyle = "#50f";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
                ctx.lineWidth = 20;
                ctx.strokeStyle = "rgba(80,0,255,0.07)";
                ctx.stroke(); // Draw it

                const Dx = Math.cos(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x));
                const Dy = Math.sin(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x));
                let xElec = this.position.x + 40 * Dx;
                let yElec = this.position.y + 40 * Dy;
                ctx.beginPath();
                ctx.moveTo(xElec, yElec);
                const step = 40
                for (let i = 0; i < 6; i++) {
                    xElec += step * (Dx + 1.5 * (Math.random() - 0.5))
                    yElec += step * (Dy + 1.5 * (Math.random() - 0.5))
                    ctx.lineTo(xElec, yElec);
                }
                ctx.strokeStyle = "#50f";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
            }
        };
        const restoreBoss = function (x, y, radius = 30) { //ATTENTION LANDGREEN: RESTOREBOSS WILL NOT DROP ANY TECH, NOR WILL THERE BE ANY IN THE MAP. DO NOT ADD ANY TECH TO MY MAP
            mobs.spawn(x, y, 8, radius, 'transparent');
            let me = mob[mob.length - 1];
            me.stroke = 'transparent';
            let aim = '#FFFFFF';
            me.accelMag = 0.0006
            me.isBoss = true;
            me.restoreBoss = true;
            me.frictionStatic = 0;
            me.friction = 0;
            me.seeAtDistance2 = 20000000 //14000 vision range
            me.vertices = Matter.Vertices.rotate(me.vertices, Math.PI, me.position); //make the pointy side of triangle the front
            Matter.Body.rotate(me, Math.random() * Math.PI * 2);
            me.showHealthBar = false
            Matter.Body.setDensity(me, m.maxHealth / (simulation.difficulty < 5 ? 0.5 : simulation.difficulty / simulation.difficultyMode))
            me.seePlayerFreq = 0
            me.swordDamage = 0.025 * spawn.dmgToPlayerByLevelsCleared()
            me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob | cat.mobBullet
            me.repulsionRange = 500000;
            me.isDropPowerUp = false;
            //Matter.Body.setVelocity(me, { x: 10 * (Math.random() - 0.5), y: 10 * (Math.random() - 0.5) });
            let index = 0;
            me.curlRange = 10000; //xd
            me.fieldPhase = 0;
            me.energy = 1;
            me.maxEnergy = 1;
            me.immuneCycle = 0;
            me.cycle = 0;
            // me.onDeath = function() {
            // powerUps.spawn(this.position.x, this.position.y, "loadOut");
            // }
            for (let i = 0; i < b.totalBots(); i++) { //normal orbitals look too boring, so...
                orbital(me, 190 + 130 * tech.isOrbitBotUpgrade, (index / b.totalBots()) * 2 * Math.PI, 0.05, Math.floor(Math.sin(simulation.cycle / 10) * 100)); //who, radius, phase, speed
                index++;
            }
            me.do = function () {
                if (this.position.x > -11500 && this.position.x < 10510) {// doesn't get one tapped by the elevator
                    me.collisionFilter.mask = cat.bullet | cat.player | cat.map | cat.mob | cat.mobBullet;
                } else {
                    me.collisionFilter.mask = cat.bullet | cat.player | cat.body | cat.map | cat.mob | cat.mobBullet;
                }
                this.cycle++;
                if ((Matter.Query.ray(map, player.position, this.position).length === 0) == false) {
                    this.seePlayer.recall = null;
                }
                if (this.seePlayer.recall) { //fields
                    if (m.fieldMode == 0 && this.distanceToPlayer2() < 200000) {
                        if (Vector.magnitude(Vector.sub(m.pos, this.position)) - this.radius < m.fieldRange) {
                            this.pushM();
                        }
                        this.drawField();
                        // this.repel(); 
                    }
                    if (m.fieldMode == 2) {
                        if (this.distanceToPlayer2() < 200000) {
                            if (Vector.magnitude(Vector.sub(m.pos, this.position)) - this.radius < m.fieldRange) {
                                this.pushM();
                            }
                            this.drawField()
                        }
                        if (tech.isPerfectBrake) { //cap player and bullet speed around restoreBoss //mobs basically can't hit you when you have this, so to make it fair...
                            const wave = Math.cos(m.cycle * 0.022);
                            const range = 200 + 140 * wave + 150 * m.energy
                            const distance = Vector.magnitude(Vector.sub(this.position, m.pos))
                            const cap = this.immuneCycle > this.cycle ? 8 : 4
                            if (distance < range) {
                                if (player.speed > cap && Vector.dot(player.velocity, Vector.sub(this.position, m.pos)) > 0) { // if velocity is directed towards player
                                    Matter.Body.setVelocity(player, Vector.mult(Vector.normalise(player.velocity), cap)); //set velocity to cap, but keep the direction
                                }
                            }
                            for (let i = 0; i < bullet.length; i++) {
                                const distance2 = Vector.magnitude(Vector.sub(this.position, bullet[i].position))
                                if (distance2 < range) {
                                    if (bullet[i].speed > cap && Vector.dot(bullet[i].velocity, Vector.sub(this.position, bullet[i].position)) > 0) { // if velocity is directed towards player
                                        Matter.Body.setVelocity(bullet[i], Vector.mult(Vector.normalise(bullet[i].velocity), cap)); //set velocity to cap, but keep the direction
                                    }
                                }
                            }
                            ctx.beginPath();
                            ctx.arc(this.position.x, this.position.y, range, 0, 2 * Math.PI);
                            ctx.fillStyle = "rgba(0,0,0,0.08)";
                            ctx.fill();
                        }
                    }
                    if (m.fieldMode == 5 && this.distanceToPlayer2() < 200000) {
                        this.laserSword(this.position, Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x), 500 * Math.random());
                    }
                    if (m.fieldMode == 9) {
                        if (this.distanceToPlayer2() < 300000) {
                            this.teleportAway() //blink but reversed 
                        }
                    }
                }
                if (m.immuneCycle > m.cycle) {
                    me.damageReduction = 0;
                } else {
                    me.damageReduction = 1;
                }
                this.repulsion();
                this.seePlayerCheck();
                this.attraction();
                this.lostPlayer();
                if (this.speed > 10) { // speed cap
                    Matter.Body.setVelocity(this, {
                        x: this.velocity.x * 0.99,
                        y: this.velocity.y * 0.99
                    });
                }
                if (this.seePlayer.recall) {
                    const angle = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x);
                    let positionR = { x: 500 * Math.cos(angle) + mob[0].position.x, y: 500 * Math.sin(angle) + mob[0].position.y };
                    let isWall = (Matter.Query.ray(map, mob[0].position, positionR).length === 0);
                    let isBlock = (Matter.Query.ray(body, mob[0].position, positionR).length === 0);
                    if (isWall == false || isBlock == false) {
                        this.force.x -= Math.cos(angle) * 10;
                        this.force.y -= Math.sin(angle) * 10;
                    }
                }
                if (this.seePlayer.recall) {
                    const angle = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x) - Math.PI * 1.5;
                    let positionR = { x: 5000 * Math.cos(angle) + mob[0].position.x, y: 5000 * Math.sin(angle) + mob[0].position.y };
                    let isBullet = (Matter.Query.ray(bullet, mob[0].position, positionR).length === 0);
                    if (isBullet == false) {
                        this.force.x -= Math.cos(angle) * 30;
                        this.force.y -= Math.sin(angle) * 30;
                    }
                }
                if (this.seePlayer.recall) {
                    const angle = Math.atan2(this.position.y - player.position.y, this.position.x - player.position.x) - Math.PI * 2.5;
                    let positionR = { x: 5000 * Math.cos(angle) + mob[0].position.x, y: 5000 * Math.sin(angle) + mob[0].position.y };
                    let isBullet = (Matter.Query.ray(bullet, mob[0].position, positionR).length === 0);
                    if (isBullet == false) {
                        this.force.x -= Math.cos(angle) * 30;
                        this.force.y -= Math.sin(angle) * 30;
                    }
                }
                if (this.seePlayer.recall) {
                    const h = this.radius * 0.3;
                    const w = this.radius * 2;
                    const x = this.position.x - w / 2;
                    const y = this.position.y - w * 0.7;
                    ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
                    ctx.fillRect(x, y, w, h);
                    ctx.fillStyle = "rgba(0,0,0,0.7)";
                    ctx.fillRect(x, y, w * this.energy, h);
                }
                if (this.health < 1) {
                    this.health += 0.0001; //regen
                } else if (this.health < 1) {
                    this.health += 0.00005; //reduced regen
                }
                if (this.energy < 0) {//energy thingy
                    this.energy = 0;
                } else if (this.energy > this.maxEnergy) {
                    this.energy = this.maxEnergy;
                } else if (this.energy < this.maxEnergy) {
                    this.energy += 0.001;
                }
                ctx.save()
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                if (this.seePlayer.recall > 0 && this.distanceToPlayer2() > this.repulsionRange) {
                    ctx.globalAlpha = (this.immuneCycle < this.cycle) ? 1 : 0.5
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
                } else if (this.distanceToPlayer2() < this.repulsionRange) {
                    ctx.globalAlpha = (this.immuneCycle < this.cycle) ? 1 : 0.5
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
                ctx.restore()
                ctx.save()
                ctx.globalAlpha = (this.immuneCycle < this.cycle) ? 1 : 0.5
                ctx.translate(this.position.x, this.position.y)
                ctx.rotate(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                if (this.health > 0.5) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                    ctx.fillStyle = m.bodyGradient
                    ctx.fill();
                    ctx.arc(15, 0, 4, 0, 2 * Math.PI);
                    ctx.strokeStyle = "#333";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.beginPath(); //eye
                    ctx.arc(15, 0, 3.5, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(255, 0, 0, ${this.health * this.health})`;
                    ctx.fill()
                    ctx.restore()
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                    ctx.fillStyle = m.bodyGradient
                    ctx.fill();
                    ctx.strokeStyle = "#333";
                    ctx.lineWidth = 2;
                    if (!(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x) > -Math.PI / 2 && Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x) < Math.PI / 2)) ctx.scale(1, -1); //here is the flip
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
                }
                if (m.fieldMode == 1) { //render over I think
                    if (this.energy > 0.1) {
                        this.harmonic3Phase();
                    }
                }
                if (m.fieldMode == 7) {
                    this.locatePlayer();
                }
                if (m.fieldMode == 8) {
                    me.pilotWave()
                }
                if (m.fieldMode == 3) {
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                    me.damageReduction = 0.5;
                    me.accelMag = 0.0012;
                    if (!(simulation.cycle % Math.floor(100 + 90 * Math.random() * simulation.CDScale))) {
                        this.diveAttack()
                    }
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, 1000, 0, 2 * Math.PI);
                    ctx.fillStyle = "#f5f5ff";
                    ctx.strokeStyle = "#f5f5ff55";
                    ctx.setLineDash([125 * Math.random(), 125 * Math.random()]);
                    ctx.globalCompositeOperation = "difference";
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";
                    ctx.stroke()
                    ctx.setLineDash([]);
                } else {
                    me.accelMag = 0.0006;
                }
                if (this.immuneCycle > this.cycle) {
                    this.damageReduction = 0;
                } else {
                    if (m.fieldMode == 3) {
                        this.damageReduction = 0.5;
                    } else {
                        this.damageReduction = 1;
                    }
                }
                if (m.fieldMode == 6) {
                    this.timeAttack();
                    ctx.globalCompositeOperation = "saturation"
                    ctx.fillStyle = "#ccc";
                    ctx.fillRect(-50000, -50000, 100000, 100000)
                    ctx.globalCompositeOperation = "source-over"
                }
                if (this.seePlayer.recall) { //fields
                    this.gun()
                }
            }
            me.laserSword = function (where, angle, length) {
                const sub = Vector.sub(this.seePlayer.position, this.position)
                const unit = Vector.normalise(sub)
                const path = [{
                    x: this.position.x + 20 * Math.cos(this.angle),
                    y: this.position.y + 20 * Math.sin(this.angle)
                },
                {
                    x: this.position.x + (120 + 400) * Math.sqrt(Math.random()) * Math.cos(this.angle),
                    y: this.position.y + (120 + 400) * Math.sqrt(Math.random()) * Math.sin(this.angle)
                }
                ];
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
                                if (dist2 < best.dist2 && (!domain[i].mob || domain[i].alive)) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: vertices[j], v2: vertices[j + 1] };
                            }
                        }
                        results = simulation.checkLineIntersection(v1, v1End, vertices[0], vertices[len]);
                        if (results.onLine1 && results.onLine2) {
                            const dx = v1.x - results.x;
                            const dy = v1.y - results.y;
                            const dist2 = dx * dx + dy * dy;
                            if (dist2 < best.dist2) best = { x: results.x, y: results.y, dist2: dist2, who: domain[i], v1: vertices[0], v2: vertices[len] };
                        }
                    }
                };
                best = { x: null, y: null, dist2: Infinity, who: null, v1: null, v2: null };
                const look = { x: where.x + length * Math.cos(angle), y: where.y + length * Math.sin(angle) };
                // vertexCollision(where, look, body); // vertexCollision(where, look, mob);
                vertexCollision(where, look, map);
                if (!m.isCloak) vertexCollision(where, look, [player]);
                if (best.who && (best.who === player) && m.immuneCycle < m.cycle) {
                    m.immuneCycle = m.cycle + m.collisionImmuneCycles; //player is immune to damage for an extra second
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
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
                ctx.lineWidth = 20;
                ctx.strokeStyle = "rgba(0,0,0,0.07)";
                ctx.stroke(); // Draw it

                const Dx = Math.cos(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x));
                const Dy = Math.sin(Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x));
                let xElec = this.position.x + 40 * Dx;
                let yElec = this.position.y + 40 * Dy;
                ctx.beginPath();
                ctx.moveTo(xElec, yElec);
                const step = 40
                for (let i = 0; i < 6; i++) {
                    xElec += step * (Dx + 1.5 * (Math.random() - 0.5))
                    yElec += step * (Dy + 1.5 * (Math.random() - 0.5))
                    ctx.lineTo(xElec, yElec);
                }
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                ctx.stroke(); // Draw it
                ctx.setLineDash([]);
            }
            me.drawField = function () {
                if (m.fieldMode != 2) {
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x)
                    const range = m.fieldRange;
                    ctx.save()
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0,0,0," + Math.min(0.6, (0.04 + m.energy * (0.1 + 0.11 * Math.random()))) + ")";
                    ctx.arc(this.position.x, this.position.y, range, angle - Math.PI * m.fieldArc, angle + Math.PI * m.fieldArc, false);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    let eye = 13;
                    if (m.fieldMode == 2) {
                        eye = 30
                    }
                    let aMag = 0.75 * Math.PI * m.fieldArc
                    let a = angle + aMag
                    let cp1x = this.position.x + 0.6 * range * Math.cos(a)
                    let cp1y = this.position.y + 0.6 * range * Math.sin(a)
                    ctx.quadraticCurveTo(cp1x, cp1y, this.position.x + eye * Math.cos(angle), this.position.y + eye * Math.sin(angle))
                    a = angle - aMag
                    cp1x = this.position.x + 0.6 * range * Math.cos(a)
                    cp1y = this.position.y + 0.6 * range * Math.sin(a)
                    ctx.quadraticCurveTo(cp1x, cp1y, this.position.x + 1 * range * Math.cos(angle - Math.PI * m.fieldArc), this.position.y + 1 * range * Math.sin(angle - Math.PI * m.fieldArc))
                    ctx.fill();
                    // ctx.lineTo(this.position.x + eye * Math.cos(angle), this.position.y + eye * Math.sin(angle));

                    //draw random lines in field for cool effect
                    let offAngle = angle + 1.7 * Math.PI * m.fieldArc * (Math.random() - 0.5);
                    ctx.beginPath();
                    eye = 15;
                    ctx.moveTo(this.position.x + eye * Math.cos(angle), this.position.y + eye * Math.sin(angle));
                    ctx.lineTo(this.position.x + range * Math.cos(offAngle), this.position.y + range * Math.sin(offAngle));
                    ctx.strokeStyle = "rgba(0,0,0,0.6)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.restore()
                } else {
                    ctx.save()
                    ctx.beginPath();
                    const wave = Math.cos(m.cycle * 0.022);
                    const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x)
                    ctx.arc(this.position.x, this.position.y, m.fieldRange, angle - Math.PI * m.fieldArc, angle + Math.PI * m.fieldArc, false);
                    ctx.lineWidth = 2.5 - 1.5 * wave;
                    ctx.stroke();
                    const curve = 0.57 + 0.04 * wave
                    const aMag = (1 - curve * 1.2) * Math.PI * m.fieldArc
                    let a = angle + aMag
                    let cp1x = this.position.x + curve * m.fieldRange * Math.cos(a)
                    let cp1y = this.position.y + curve * m.fieldRange * Math.sin(a)
                    ctx.quadraticCurveTo(cp1x, cp1y, this.position.x + 30 * Math.cos(angle), this.position.y + 30 * Math.sin(angle))
                    a = angle - aMag
                    cp1x = this.position.x + curve * m.fieldRange * Math.cos(a)
                    cp1y = this.position.y + curve * m.fieldRange * Math.sin(a)
                    ctx.quadraticCurveTo(cp1x, cp1y, this.position.x + 1 * m.fieldRange * Math.cos(angle - Math.PI * m.fieldArc), this.position.y + 1 * m.fieldRange * Math.sin(angle - Math.PI * m.fieldArc))
                    ctx.fill();
                    ctx.restore()
                }
            }
            me.pushM = function () {
                const unit = Vector.normalise(Vector.sub(this.position, player.position))
                if (tech.blockDmg) {
                    Matter.Body.setVelocity(player, { x: 0.5 * player.velocity.x, y: 0.5 * player.velocity.y });
                    //draw electricity
                    const step = 40
                    ctx.beginPath();
                    for (let i = 0, len = 0.8 * tech.blockDmg; i < len; i++) {
                        let x = this.position.x - 20 * unit.x;
                        let y = this.position.y - 20 * unit.y;
                        ctx.moveTo(x, y);
                        for (let i = 0; i < 8; i++) {
                            x += step * (-unit.x + 1.5 * (Math.random() - 0.5))
                            y += step * (-unit.y + 1.5 * (Math.random() - 0.5))
                            ctx.lineTo(x, y);
                        }
                    }
                    if (m.immuneCycle < m.cycle) {
                        m.immuneCycle = m.cycle + m.collisionImmuneCycles
                        m.takeDamage(0.025 * spawn.dmgToPlayerByLevelsCleared())
                    }
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#000";
                    ctx.stroke();
                }
                const massRoot = Math.sqrt(Math.min(12, Math.max(0.15, player.mass))); // masses above 12 can start to overcome the push back //idk
                Matter.Body.setVelocity(player, {
                    x: this.velocity.x - (15 * unit.x) / massRoot,
                    y: this.velocity.y - (15 * unit.y) / massRoot
                });
            }
            me.diveAttack = function () {
                const forceMag = this.accelMag * this.mass;
                const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                this.force.x += 150 * forceMag * Math.cos(angle);
                this.force.y += 150 * forceMag * Math.sin(angle);
                ctx.beginPath()
                ctx.moveTo(this.position.x + Math.sin(angle), this.position.y + Math.cos(angle))
                ctx.lineTo(this.seePlayer.position.x, this.seePlayer.position.y)
                aim = '#000000';
                ctx.stroke()
            }
            me.phase = 2 * Math.PI * Math.random();
            me.index2 = 0;
            me.pilotWave = function () {
                const rotate = this.cycle * 0.008;
                this.fieldPhase += 0.002;
                const off1 = 1 + 0.01 * Math.sin(this.fieldPhase);
                const off2 = 1 - 0.01 * Math.cos(this.fieldPhase);
                ctx.save()
                ctx.beginPath();
                ctx.ellipse(player.position.x, player.position.y, 1.2 * 200 * off1, 1.2 * 150 * off2, rotate, 0, 2 * Math.PI);
                ctx.globalCompositeOperation = "exclusion"; //"exclusion" "difference";
                ctx.fillStyle = "#ffffff"; //"#eef";
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                ctx.beginPath();
                ctx.ellipse(player.position.x, player.position.y, 1.2 * 200 * off1, 1.2 * 150 * off2, rotate, 0, 2 * Math.PI * m.energy / m.maxEnergy);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.restore()
                const range = this.curlRange / 15, mag = -50;
                const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                const applyCurl = function (center, array, isAntiGravity = true) {
                    for (let i = 0; i < array.length; ++i) {
                        if (!array[i].isNotHoldable) {
                            const sub = Vector.sub(center, array[i].position)
                            const radius2 = Vector.magnitudeSquared(sub);

                            //if too close, like center mob or shield, don't curl   // if too far don't curl
                            if (radius2 < range * range && radius2 > 10000) {
                                const curlVector = Vector.mult(Vector.perp(Vector.normalise(sub)), mag)
                                //apply curl force
                                if (array[i].isMobBullet) {
                                    Matter.Body.setVelocity(array[i], {
                                        x: array[i].velocity.x * 0.97 + curlVector.x * 0.06 - (Math.cos(angle) * 5),
                                        y: array[i].velocity.y * 0.97 + curlVector.y * 0.06 - (Math.sin(angle) * 5)
                                    })
                                } else {
                                    Matter.Body.setVelocity(array[i], {
                                        x: array[i].velocity.x * 0.94 + curlVector.x * 0.06 - (Math.cos(angle) * 5),
                                        y: array[i].velocity.y * 0.94 + curlVector.y * 0.06 - (Math.sin(angle) * 5)
                                    })
                                }
                                if (isAntiGravity) array[i].force.y -= 0.8 * simulation.g * array[i].mass
                            }
                        }
                    }
                }
                applyCurl(this.position, [player]);
            }
            me.teleportAway = function () {//hehe
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                if (this.seePlayer.recall && !(simulation.cycle % 17)) {
                    const dist = Vector.sub(this.position, this.seePlayer.position);
                    const distMag = Vector.magnitude(dist);
                    const unitVector = Vector.normalise(dist);
                    const rando = (Math.random() - 0.5) * 50;
                    if (distMag < 20000) {
                        Matter.Body.translate(this, Vector.mult(unitVector, distMag + rando));
                    } else {
                        Matter.Body.translate(this, Vector.mult(unitVector, 20000 + rando));
                    }
                }
                ctx.lineTo(this.position.x, this.position.y);
                ctx.lineWidth = radius * 2;
                ctx.strokeStyle = "rgba(0,0,0,0.08)";
                ctx.stroke();
                if (!this.seePlayer.yes) {
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y);
                    if (this.seePlayer.recall && !(simulation.cycle % 17)) {
                        const dist = Vector.sub(this.seePlayer.position, this.position);
                        const distMag = Vector.magnitude(dist);
                        const unitVector = Vector.normalise(dist);
                        const rando = (Math.random() - 0.5) * 50;
                        if (distMag < 200000) {
                            Matter.Body.translate(this, Vector.mult(unitVector, distMag + rando));
                        } else {
                            Matter.Body.translate(this, Vector.mult(unitVector, 200000 + rando));
                        }
                    }
                    ctx.lineTo(this.position.x, this.position.y);
                    ctx.lineWidth = radius * 2;
                    ctx.strokeStyle = "rgba(0,0,0,0.08)";
                    ctx.stroke();
                }
            }
            me.timeAttack = function () {
                if (this.seePlayer.recall && !(simulation.cycle % 30) || this.distanceToPlayer2() < 300) {
                    requestAnimationFrame(() => {
                        simulation.timePlayerSkip(45)
                        simulation.loop(); //ending with a wipe and normal loop fixes some very minor graphical issues where things are draw in the wrong locations
                    }); //wrapping in animation frame prevents errors, probably
                }
            }
            me.harmonic3Phase = function () { //normal standard 3 different 2-d circles
                if (tech.harmonics === 2) {
                    const fieldRange1 = (0.75 + 0.3 * Math.cos(m.cycle / 23)) * m.fieldRange * m.harmonicRadius
                    const fieldRange2 = (0.68 + 0.37 * Math.cos(m.cycle / 37)) * m.fieldRange * m.harmonicRadius
                    const fieldRange3 = (0.7 + 0.35 * Math.cos(m.cycle / 47)) * m.fieldRange * m.harmonicRadius
                    const netfieldRange = Math.max(fieldRange1, fieldRange2, fieldRange3)
                    ctx.fillStyle = "rgba(0,0,0," + Math.min(0.6, (0.04 + m.energy * (0.1 + 0.11 * Math.random()))) + ")";
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, fieldRange1, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, fieldRange2, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(this.position.x, this.position.y, fieldRange3, 0, 2 * Math.PI);
                    ctx.fill();
                    //360 block
                    if (Vector.magnitude(Vector.sub(player.position, this.position)) - this.radius < netfieldRange) {
                        me.pushM();
                    }
                    for (let i = 0; i < bullet.length; i++) {
                        if (Vector.magnitude(Vector.sub(bullet[i].position, this.position)) - this.radius < netfieldRange) {
                            const dx = bullet[i].position.x - this.position.x;
                            const dy = bullet[i].position.y - this.position.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < m.fieldRange) {
                                const angle = Math.atan2(dy, dx);
                                const mag = (1500 * bullet[i].mass * simulation.g) / dist;
                                bullet[i].force.x += mag * Math.cos(angle);
                                bullet[i].force.y += mag * Math.sin(angle);
                            }
                            this.energy -= 0.0012;
                        }
                    }
                } else {
                    const rotation = simulation.cycle * 0.0031
                    const phase = simulation.cycle * 0.023
                    const radius = m.fieldRange * m.harmonicRadius
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "rgba(0,0,0,0.5)"
                    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.6, m.energy * (0.11 + 0.1 * Math.random()) * (3 / tech.harmonics))})`;
                    // ctx.fillStyle = "rgba(0,0,0," + Math.min(0.7, m.energy * (0.22 - 0.01 * tech.harmonics) * (0.5 + 0.5 * Math.random())) + ")";
                    for (let i = 0; i < tech.harmonics; i++) {
                        ctx.beginPath();
                        ctx.ellipse(this.position.x, this.position.y, radius * Math.abs(Math.sin(phase + i / tech.harmonics * Math.PI)), radius, rotation + i / tech.harmonics * Math.PI, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }
                    //360 block
                    if (Vector.magnitude(Vector.sub(player.position, this.position)) - this.radius < radius) {
                        me.pushM();
                    }
                    for (let i = 0; i < bullet.length; i++) {
                        if (Vector.magnitude(Vector.sub(bullet[i].position, this.position)) - this.radius < radius) {
                            const dx = bullet[i].position.x - this.position.x;
                            const dy = bullet[i].position.y - this.position.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < m.fieldRange) {
                                const angle = Math.atan2(dy, dx);
                                const mag = (1500 * bullet[i].mass * simulation.g) / dist;
                                bullet[i].force.x += mag * Math.cos(angle);
                                bullet[i].force.y += mag * Math.sin(angle);
                            }
                            this.energy -= 0.0012;
                        }
                    }
                }
            }
            me.railGun = function () {
                const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                const X = this.position.x
                const Y = this.position.y
                const unitVector = { x: Math.cos(angle), y: Math.sin(angle) }
                const unitVectorPerp = Vector.perp(unitVector)

                function magField(mag, arc) {
                    ctx.moveTo(X, Y);
                    ctx.bezierCurveTo(
                        X + unitVector.x * mag, Y + unitVector.y * mag,
                        X + unitVector.x * mag + unitVectorPerp.x * arc, Y + unitVector.y * mag + unitVectorPerp.y * arc,
                        X + unitVectorPerp.x * arc, Y + unitVectorPerp.y * arc)
                    ctx.bezierCurveTo(
                        X - unitVector.x * mag + unitVectorPerp.x * arc, Y - unitVector.y * mag + unitVectorPerp.y * arc,
                        X - unitVector.x * mag, Y - unitVector.y * mag,
                        X, Y)
                }
                ctx.fillStyle = `rgba(50,20,100,0.05)`;
                const magSize = 8 * c * tech.railChargeRate ** 3
                const arcSize = 6 * c * tech.railChargeRate ** 3
                for (let i = 3; i < 7; i++) {
                    const MAG = magSize * i * i * (0.93 + 0.07 * Math.random())
                    const ARC = arcSize * i * i * (0.93 + 0.07 * Math.random())
                    ctx.beginPath();
                    magField(MAG, ARC)
                    magField(MAG, -ARC)
                    ctx.fill();
                }
            }
            me.waves = [];
            me.doLongitudinal = function () {
                if (!m.isTimeDilated) {
                    ctx.strokeStyle = "rgba(0,0,0,0.6)" //"000";
                    ctx.lineWidth = 2 * tech.wavePacketDamage
                    ctx.beginPath();
                    // const end = 1100 * tech.bulletsLastLonger / Math.sqrt(tech.waveReflections * 0.5) //should equal about  1767
                    const end = 1100 * tech.bulletsLastLonger * Math.pow(0.93, tech.waveReflections) //should equal about  1767
                    const damage = 0.0005 * spawn.dmgToPlayerByLevelsCleared()//normal damage for m basically shreds m, so had to nerf this
                    for (let i = this.waves.length - 1; i > -1; i--) {
                        const v1 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit1, this.waves[i].radius))
                        const v2 = Vector.add(this.waves[i].position, Vector.mult(this.waves[i].unit2, this.waves[i].radius))
                        //draw wave
                        ctx.moveTo(v1.x, v1.y)
                        ctx.arc(this.waves[i].position.x, this.waves[i].position.y, this.waves[i].radius, this.waves[i].angle, this.waves[i].angle + this.waves[i].arc);
                        //using small angle linear approximation of circle arc, this will not work if the arc gets large   // https://stackoverflow.com/questions/13652518/efficiently-find-points-inside-a-circle-sector
                        let hits = Matter.Query.ray([player], v1, v2, 50) //Matter.Query.ray(bodies, startPoint, endPoint, [rayWidth])
                        for (let j = 0, len = Math.min(30, hits.length); j < len; j++) {
                            player.force.x += 0.01 * (Math.random() - 0.5) * player.mass
                            player.force.y += (0.01 * (Math.random() - 0.5) - simulation.g * 0.25) * player.mass //remove force of gravity
                            Matter.Body.setVelocity(player, { //friction
                                x: player.velocity.x * 0.95,
                                y: player.velocity.y * 0.95
                            });
                            m.takeDamage(damage)
                        }
                        hits = Matter.Query.ray(body, v1, v2, 50)
                        for (let j = 0, len = Math.min(30, hits.length); j < len; j++) {
                            const who = hits[j].body
                            //make them shake around
                            who.force.x += 0.01 * (Math.random() - 0.5) * who.mass
                            who.force.y += (0.01 * (Math.random() - 0.5) - simulation.g * 0.25) * who.mass //remove force of gravity

                            let vertices = who.vertices;
                            const vibe = 25
                            ctx.moveTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));
                            for (let j = 1; j < vertices.length; j++) {
                                ctx.lineTo(vertices[j].x + vibe * (Math.random() - 0.5), vertices[j].y + vibe * (Math.random() - 0.5));
                            }
                            ctx.lineTo(vertices[0].x + vibe * (Math.random() - 0.5), vertices[0].y + vibe * (Math.random() - 0.5));

                            if (tech.isPhononBlock && !who.isNotHoldable && who.speed < 5 && who.angularSpeed < 0.1) {
                                if (Math.random() < 0.5) b.targetedBlock(who, 50 - Math.min(25, who.mass * 3)) //    targetedBlock(who, speed = 50 - Math.min(20, who.mass * 2), range = 1600) {
                                // Matter.Body.setAngularVelocity(who, (0.25 + 0.12 * Math.random()) * (Math.random() < 0.5 ? -1 : 1));
                                who.torque += who.inertia * 0.001 * (Math.random() - 0.5)
                            }
                        }
                        // ctx.stroke(); //draw vibes
                        this.waves[i].radius += tech.waveBeamSpeed * 1.8 * this.waves[i].expanding //expand / move
                        if (this.waves[i].radius > end - 30) {
                            this.waves[i].expanding = -1
                            if (this.waves[i].reflection < 1) this.waves.splice(i, 1) //end
                        } else if (this.waves[i].radius < 25) {
                            this.waves[i].expanding = 1
                            if (this.waves[i].reflection < 1) this.waves.splice(i, 1) //end
                        }
                    }
                    ctx.stroke();
                }
            }
            me.lasers = function (where, angle) {
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
                if (!m.isCloak) vertexCollision(where, look, [player]);
                if (best.who && (best.who === player) && m.immuneCycle < m.cycle) {
                    const dmg = 0.0011 * spawn.dmgToPlayerByLevelsCleared();
                    m.takeDamage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: best.x,
                        y: best.y,
                        radius: dmg * 1500,
                        color: "rgba(80,0,255,0.5)",
                        time: 20
                    });
                }
                //draw beam
                if (best.dist2 === Infinity) best = look;
                ctx.moveTo(where.x, where.y);
                ctx.lineTo(best.x, best.y);
                ctx.lineWidth = 10;
                ctx.stroke();
            }
            me.pulse = function (charge, angle, where = this.position) {
                let best;
                angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x)
                let explosionRadius = 5.5 * charge
                let range = 5000
                const path = [{
                    x: where.x + 20 * Math.cos(angle),
                    y: where.y + 20 * Math.sin(angle)
                },
                {
                    x: where.x + range * Math.cos(angle),
                    y: where.y + range * Math.sin(angle)
                }
                ];
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
                //check for collisions
                best = {
                    x: null,
                    y: null,
                    dist2: Infinity,
                    who: null,
                    v1: null,
                    v2: null
                };
                if (!best.who) {
                    vertexCollision(path[0], path[1], body);
                    vertexCollision(path[0], path[1], [player]);
                    vertexCollision(path[0], path[1], map);
                    if (best.dist2 != Infinity) { //if hitting something
                        path[path.length - 1] = {
                            x: best.x,
                            y: best.y
                        };
                    }
                }
                if (best.who) {
                    b.explosion(path[1], explosionRadius, "rgba(0,0,0,0)")
                    const off = explosionRadius * 1.2
                    b.explosion({ x: path[1].x + off * (Math.random() - 0.5), y: path[1].y + off * (Math.random() - 0.5) }, explosionRadius, "rgba(0,0,0,0.7)")
                    b.explosion({ x: path[1].x + off * (Math.random() - 0.5), y: path[1].y + off * (Math.random() - 0.5) }, explosionRadius, "rgba(0,0,0,0.7)")
                }
                //draw laser beam
                ctx.beginPath();
                ctx.moveTo(path[0].x, path[0].y);
                ctx.lineTo(path[1].x, path[1].y);
                if (charge > 50) {
                    ctx.strokeStyle = "rgba(0,0,0,0.10)"
                    ctx.lineWidth = 70
                    ctx.stroke();
                }
                ctx.strokeStyle = "rgba(0,0,0,0.25)"
                ctx.lineWidth = 20
                ctx.stroke();
                ctx.strokeStyle = "#f00";
                ctx.lineWidth = 4
                ctx.stroke();

                //draw little dots along the laser path
                const sub = Vector.sub(path[1], path[0])
                const mag = Vector.magnitude(sub)
                for (let i = 0, len = Math.floor(mag * 0.0005 * charge); i < len; i++) {
                    const dist = Math.random()
                    simulation.drawList.push({
                        x: path[0].x + sub.x * dist + 10 * (Math.random() - 0.5),
                        y: path[0].y + sub.y * dist + 10 * (Math.random() - 0.5),
                        radius: 1.5 + 5 * Math.random(),
                        color: "rgba(0,0,0,0.5)",
                        time: Math.floor(9 + 25 * Math.random() * Math.random())
                    });
                }
            }
            let c = 0
            me.gun = function () {
                if (b.activeGun == 0) {// nailgun
                    if (this.seePlayer.recall && !(simulation.cycle % 20)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        const dist = Vector.magnitudeSquared(Vector.sub(this.position, player.position));
                        const unit = Vector.normalise(Vector.sub(Vector.add(player.position, Vector.mult(player.velocity, Math.sqrt(dist) / 60)), this.position))
                        normalBullet(this.position.x, this.position.y);
                        const v = 10 + 8 * simulation.accelScale;
                        Matter.Body.setVelocity(mob[mob.length - 1], Vector.mult(unit, 0.009 * this.mass))
                        // Matter.Body.setVelocity(mob[mob.length - 1], {
                        // x: this.velocity.x + this.fireDir.x * v,
                        // y: this.velocity.y + this.fireDir.y * v
                        // });
                    }
                }
                if (b.activeGun == 1) {// shotgun
                    if (this.seePlayer.recall && !(simulation.cycle % 90)) {
                        const side = 22
                        for (let i = 0; i < 12; i++) {
                            const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                            const dir = angle + (Math.random() - 0.5) * 1
                            const SPEED = 52 + Math.random() * 8
                            normalBullet(this.position.x + 35 * Math.cos(angle) + 15 * (Math.random() - 0.5), this.position.y + 35 * Math.sin(angle) + 15 * (Math.random() - 0.5))
                            Matter.Body.setVelocity(mob[mob.length - 1], {
                                x: SPEED * Math.cos(dir),
                                y: SPEED * Math.sin(dir)
                            });
                        }
                    }
                } else if (b.activeGun == 2) { // super balls
                    if (this.seePlayer.recall && !(simulation.cycle % 20)) {
                        const num = 3;
                        const SPREAD = 0.13;
                        const angle = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                        let dir = angle - SPREAD * (num - 1) / 2;
                        const SPEED = 33
                        for (let i = 0; i < num; i++) {
                            ball(this.position.x + 30 * Math.cos(angle), this.position.y + 30 * Math.sin(angle))
                            Matter.Body.setVelocity(mob[mob.length - 1], {
                                x: SPEED * Math.cos(dir),
                                y: SPEED * Math.sin(dir)
                            });
                            dir += SPREAD
                        }
                    }
                } else if (b.activeGun == 3) { // wave
                    this.doLongitudinal()
                    const halfArc = 0.275
                    const anglex = Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x);
                    const angle = anglex + 0.3 * (Math.random() - 0.5)
                    this.waves.push({
                        position: {
                            x: this.position.x + 25 * Math.cos(anglex),
                            y: this.position.y + 25 * Math.sin(anglex),
                        },
                        angle: angle - halfArc, //used in drawing ctx.arc
                        unit1: { x: Math.cos(angle - halfArc), y: Math.sin(angle - halfArc) }, //used for collision
                        unit2: { x: Math.cos(angle + halfArc), y: Math.sin(angle + halfArc) }, //used for collision
                        arc: halfArc * 2,
                        radius: 25,
                        reflection: 0,
                        expanding: 1,
                        resonanceCount: 0
                    })
                } else if (b.activeGun == 4) { // missiles
                    if (this.seePlayer.recall && !(simulation.cycle % 30)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        missile(this.position);
                        const v = 10 + 8 * simulation.accelScale + (Math.random() * 20 - Math.random() * 20);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                    }
                } else if (b.activeGun == 5) { // grenades
                    if (this.seePlayer.recall && !(simulation.cycle % 30)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        grenade(this.position.x, this.position.y)
                        const v = 10 + 8 * simulation.accelScale + (Math.random() * 20 - Math.random() * 20);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                    }
                } else if (b.activeGun == 6) { // spores
                    if (this.seePlayer.recall && !(simulation.cycle % 30)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        me.drop(this.position.x, this.position.y)
                        const v = 10 + 8 * simulation.accelScale + (Math.random() * 20 - Math.random() * 20);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                    }
                } else if (b.activeGun == 7) { // drones
                    ctx.save()
                    ctx.lineWidth = "8";
                    ctx.strokeStyle = "rgba(100, 0, 150, 0.1)";
                    ctx.beginPath();
                    for (let i = 0, len = bullet.length; i < len; ++i) {
                        const dx = bullet[i].position.x - this.position.x;
                        const dy = bullet[i].position.y - this.position.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 500) {
                            ctx.moveTo(this.position.x + dist, this.position.y);
                            ctx.arc(this.position.x, this.position.y, dist, 0, 2 * Math.PI)
                            //ctx.lineTo(bullet[i].position.x, bullet[i].position.y);
                            const angle = Math.atan2(dy, dx);
                            const mag = (1500 * bullet[i].mass * simulation.g) / (dist * 0.05);
                            bullet[i].force.x += mag * Math.cos(angle);
                            bullet[i].force.y += mag * Math.sin(angle);
                        }
                    }
                    ctx.stroke();
                    ctx.restore()
                } else if (b.activeGun == 8) { // foam
                    if (this.seePlayer.recall && !(simulation.cycle % 1)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        foamBullet(this.position.x, this.position.y, 7 + Math.ceil(this.radius / 15), 69);
                        const v = 10 + 8 * simulation.accelScale + (Math.random() * 20 - Math.random() * 20);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                    }
                } else if (b.activeGun == 9) { // harpoon - railgun
                    if (c > 1) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        railBullet(this.position.x, this.position.y);
                        const v = 10 + 80 * simulation.accelScale;
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                        c = 0;
                    } else {
                        c += 0.02;
                        this.railGun();
                    }
                } else if (b.activeGun == 10) { // laserMines
                    if (this.seePlayer.recall && !(simulation.cycle % 100)) {
                        this.fireDir = Vector.normalise(Vector.sub(this.seePlayer.position, this.position));
                        me.laserMine(this.position.x, this.position.y)
                        const v = 10 + 8 * simulation.accelScale + (Math.random() * 20 - Math.random() * 20);
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: this.velocity.x + this.fireDir.x * v,
                            y: this.velocity.y + this.fireDir.y * v
                        });
                    }
                } else if (b.activeGun == 11) { // laser - pulse
                    //this.lasers(this.position, Math.atan2(this.seePlayer.position.y - this.position.y, this.seePlayer.position.x - this.position.x))
                    //if (this.seePlayer.recall && !(simulation.cycle % 20)) {
                    if (c > 1) {
                        this.pulse(c * 100)
                        c = 0;
                    } else {
                        if (this.energy < 1 || this.energy > 0.5) {
                            c += 0.01;
                            ctx.beginPath();
                            const mag = Math.sqrt(c)
                            ctx.arc(this.position.x, this.position.y, c * 30, 0, 2 * Math.PI)
                            ctx.fillStyle = '#000000'
                            ctx.strokeStyle = 'transparent'
                            ctx.fill();
                            ctx.stroke();
                            this.energy -= 0.01;
                            ctx.strokeStyle = "#000000";
                            ctx.lineWidth = 1.5
                            // ctx.globalAlpha = 1;
                        } else {
                            c = 0;
                            this.energy += 0.1
                        }
                    }
                    //}
                }
            }
            me.laserMine = function (x, y) {
                mobs.spawn(x, y, 3, 20, "#000000");
                let xx = mob[mob.length - 1];
                xx.stroke = "#00000000";
                Matter.Body.setDensity(xx, 0.000005) //one tap
                xx.isUnstable = true;
                xx.timeLeft = 40 + Math.floor(180 * Math.random())
                xx.leaveBody = false;
                xx.isDropPowerUp = false;
                xx.collisionFilter.mask = cat.bullet | cat.player | cat.map
                xx.showHealthBar = false;
                //xx.vertices = Matter.Vertices.rotate(xx.vertices, Math.PI, xx.position);
                me.onHit = function () {
                    this.death();
                };
                xx.do = function () {
                    this.timeLimit();
                    Matter.Body.setAngularVelocity(this, 0.01)
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "#00000000"
                    for (let i = 0; i < this.vertices.length; i++) {
                        const where = this.vertices[i]
                        const endPoint = Vector.add(where, Vector.mult(Vector.normalise(Vector.sub(where, this.position)), 2500))
                        me.lasers(this.vertices[0], this.angle + Math.PI / 3);
                        me.lasers(this.vertices[1], this.angle + Math.PI);
                        me.lasers(this.vertices[2], this.angle - Math.PI / 3);
                    }
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.save()
                    ctx.beginPath();
                    ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
                    ctx.lineTo(this.vertices[1].x, this.vertices[1].y);
                    ctx.lineTo(this.vertices[2].x, this.vertices[2].y);
                    ctx.fillStyle = "#000000";
                    ctx.strokeStyle = "transparent";
                    ctx.fill();
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore()
                }
            }
            me.seeker = function (x, y) {
                mobs.spawn(x, y, sides = 5, radius = 5, "rgb(0,0,0)");
                let yy = mob[mob.length - 1];
                yy.stroke = "transparent";
                yy.onHit = function () {
                    this.explode(this.mass * 20);
                };
                Matter.Body.setDensity(yy, 0.000015); //normal is 0.001
                yy.timeLeft = 420 //* (0.8 + 0.4 * Math.random());
                yy.accelMag = 0.00017 * simulation.accelScale; //* (0.8 + 0.4 * Math.random())
                yy.frictionAir = 0.01 //* (0.8 + 0.4 * Math.random());
                yy.restitution = 0.5;
                yy.leaveBody = false;
                yy.isDropPowerUp = false;
                yy.isBadTarget = true;
                yy.isMobBullet = true;
                yy.showHealthBar = false;
                yy.collisionFilter.category = cat.mobBullet;
                yy.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet;
                let index = 0;
                yy.do = function () {
                    this.alwaysSeePlayer()
                    this.timeLimit();
                    this.attraction();
                };
            }
            me.drop = function (x, y) {
                mobs.spawn(x, y, sides = 90, radius = 30, "rgb(0,255,100,0.7)");
                let yyy = mob[mob.length - 1];
                yyy.stroke = "transparent";
                yyy.onDeath = function () {
                    for (let i = 0, len = 5; i < len; i++) {
                        me.seeker(this.position.x, this.position.y)
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: Math.random() * 30 - Math.random() * 30,
                            y: Math.random() * 30 - Math.random() * 30
                        });
                    }
                };
                Matter.Body.setDensity(yyy, 0.000015); //normal is 0.001
                yyy.timeLeft = 60 //* (0.8 + 0.4 * Math.random());
                yyy.frictionAir = 0.01 //* (0.8 + 0.4 * Math.random());
                yyy.restitution = 0.5;
                yyy.leaveBody = false;
                yyy.isDropPowerUp = false;
                yyy.isBadTarget = true;
                yyy.isMobBullet = true;
                yyy.showHealthBar = false;
                yyy.collisionFilter.category = cat.mobBullet;
                yyy.collisionFilter.mask = null;
                yyy.maxRadius = 30;
                let index = 0;
                yyy.do = function () {
                    if (Matter.Query.collides(this, [player]).length > 0 && !(m.isCloak && tech.isIntangible) && m.immuneCycle < m.cycle) {
                        Matter.Body.setPosition(this, player.position)
                        if (player.speed > 2.5) Matter.Body.setVelocity(player, Vector.mult(player.velocity, 0.94))
                    }
                    if (Matter.Query.collides(this, map).length > 0) {
                        Matter.Body.setVelocity(this, Vector.mult(this.velocity, 0.1))
                    }
                    this.alwaysSeePlayer()
                    this.timeLimit();
                    ctx.save()
                    ctx.beginPath();
                    ctx.moveTo(this.position.x, this.position.y)
                    ctx.fillStyle = "black";
                    ctx.arc(this.position.x, this.position.y, this.maxRadius, 0, 2 * Math.PI)
                    ctx.stroke()
                    ctx.fill()
                    ctx.restore()
                    if (this.maxRadius > 0) {
                        this.maxRadius -= 0.5;
                    }
                };
            }
        };
        restoreBoss(-13350, -1800);
        laserEM(-6500 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200), -3400 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200));
        sniper(-9275 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200), -3325 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200));
        laserEM(-5750 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200), -850 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200));
        sniper(-3600 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200), -1325 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200));
        laserEM(1425 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200), -800 + Math.floor(Math.random() * 200) - Math.floor(Math.random() * 200));
        //restoreBoss(-350, -3225);
        wire();
        wire();
        wire();
        wire();
        wire();
        color.map = '#00000000';
        level.customTopLayer = () => {
            if (dong.position.x > -3825) {
                dong.force.y -= dong.mass * simulation.g;
            } else {
                dong.force.y += dong.mass * simulation.g;
            }
            Matter.Body.setAngularVelocity(dong, -0.5)
            if (key == true) {
                door.isClosing = false;
            } else {
                door.isClosing = true;
            }
            door.openClose();
            door.draw()
            for (let i = 0, len = map.length; i < len; i++) { //so boss bar renders over the map
                ctx.beginPath();
                ctx.moveTo(map[i].vertices[0].x, map[i].vertices[0].y);
                for (let j = 0, length = map[i].vertices.length; j < length; j++) {
                    ctx.lineTo(map[i].vertices[j].x, map[i].vertices[j].y);
                }
                ctx.lineTo(map[i].vertices[0].x, map[i].vertices[0].y);
                ctx.fillStyle = "rgba(68,68,68)";
                ctx.strokeStyle = "transparent";
                ctx.fill();
                ctx.stroke();
                // ctx.setLineDash([]);
            }
            for (let i = 0, len = mob.length; i < len; i++) {
                if (mob[i].restoreBoss) {
                    ctx.save();
                    ctx.setTransform(1, 0, 0.5, 1, 0, 0); //slanted
                    ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
                    ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2, 30);
                    ctx.fillStyle = "rgba(0,0,0,0.7)";
                    ctx.fillRect(canvas.width2 / 2, canvas.height2 / 10, canvas.width2 * mob[i].health, 30);
                    ctx.restore();
                }
            }
        };
        const obj = { restoreBoss };
        Object.assign(spawn, obj); //for next map, gonna be a rpg-like thingy I think
    },
    cantilever() { // made by Eclipse#7932 on discord, (TheSpudguy)(@PurpleSunsetGames on github)
        // simulation.enableConstructMode();
        simulation.inGameConsole(`<strong>underpass</strong> by <span class='color-var'>Eclipse#7932</span>`);

        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 5500;
        level.exit.y = 950;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        spawn.mapRect(level.exit.x - 50, level.exit.y + 30, 200, 100); // exit platform
        spawn.mapRect(level.exit.x - 50, level.exit.y - 300, 200, 100); // exit platform roof
        const endElevator = level.elevator(level.exit.x - 150, level.exit.y - 300, 100, 425, level.exit.y - 300); // end access door

        spawn.randomMob(-200, 350, Infinity); // random mob at the beginning

        spawn.mapRect(-100, 0, 600, 100); // main platform at start
        spawn.bodyRect(0, 300, 50, 50); // little squares at start (one of these should be taken while crossing the cantilever to complete the level more easily)
        spawn.bodyRect(100, 200, 50, 50);
        spawn.bodyRect(50, 250, 50, 50);
        spawn.mapRect(450, -20, 50, 20); // main platform ledge
        spawn.mapRect(-200, 500, 2200, 100); // lower platform
        spawn.mapRect(1850, 380, 100, 50); // cantilever block
        spawn.bodyRect(80, -1300, 70, 1300, 1, { friction: .03, frictionAir: .001 }); // cantilever

        spawn.mapRect(3400, 500, 300, 100); // lever platform
        spawn.mapRect(3650, 500, 100, 800); // pit
        spawn.mapRect(3650, 1300, 2600, 100);
        spawn.mapRect(6150, 600, 100, 800);
        spawn.mapRect(5650, 600, 100, 650);
        spawn.randomMob(4700, 550, Infinity);
        spawn.randomMob(4700, 450, Infinity);
        spawn.randomMob(4600, 550, Infinity);

        const toggle = level.toggle(3500, 500, false); // first lever
        const button = level.button(5900, 1300);
        const slidingWall = level.elevator(3750, -1200, 100, 1800, -1200); // first sliding wall

        level.defaultZoom = 1500;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#d8badf";
        // color.map = "#444" //custom map color

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };

        level.customTopLayer = () => {
            toggle.query();
            button.query();
            button.draw();

            if (toggle.isOn) {
                slidingWall.force.y -= 400;
            }
            if (!button.isUp) {
                endElevator.force.y -= 100;
            }
            slidingWall.move();
            endElevator.move()
        };
        powerUps.addResearchToLevel(); //needs to run after mobs are spawned
    },
    shipwreck() {
        simulation.inGameConsole(`<strong>shipwreck</strong> by <span class='color-var'>3xionDev</span>`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 1500;
        level.exit.y = -1875;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#05001C";
        // color.map = "#444" //custom map color
        spawn.mapRect(-325, 0, 650, 300);
        spawn.mapRect(-275, -675, 50, 700);
        spawn.mapRect(-325, -1025, 650, 300);
        spawn.mapRect(-275, -750, 50, 75);
        spawn.mapRect(300, 50, 675, 200);
        spawn.mapRect(925, 50, 450, 150);
        spawn.mapRect(275, -750, 50, 275);
        spawn.mapRect(275, -325, 50, 325);
        spawn.bodyRect(150, -175, 100, 100);
        spawn.bodyRect(-200, -450, 100, 400);
        spawn.bodyRect(-150, -650, 25, 50);
        spawn.bodyRect(-200, -700, 25, 25);
        spawn.bodyRect(175, -250, 75, 100);
        spawn.mapRect(875, -50, 100, 100);
        spawn.mapRect(350, -175, 25, 25);
        spawn.mapRect(325, -175, 175, 225);
        spawn.bodyRect(375, -225, 50, 50);
        spawn.bodyRect(700, -450, 125, 125);
        spawn.mapRect(1375, 25, 400, 100);
        spawn.mapRect(1675, -175, 100, 200);
        spawn.mapRect(1775, -175, 225, 100);
        spawn.mapRect(1575, -75, 100, 100);
        spawn.mapRect(1775, -75, 175, 100);
        spawn.mapRect(1300, 125, 250, 25);
        spawn.mapRect(850, 200, 225, 25);
        spawn.mapRect(1100, 200, 50, 100);
        spawn.mapRect(1250, 175, 50, 125);
        spawn.mapRect(1950, -150, 275, 50);
        spawn.mapRect(2125, -150, 25, 25);
        spawn.mapRect(2125, -175, 1025, 100);
        spawn.mapRect(2625, -350, 25, 25);
        spawn.mapRect(2650, -325, 25, 150);
        spawn.mapRect(2625, -400, 50, 250);
        spawn.bodyRect(1900, -200, 325, 25);
        spawn.bodyRect(2525, -275, 100, 100);
        spawn.bodyRect(2575, -325, 50, 50);
        spawn.mapRect(425, -75, 150, 125);
        spawn.bodyRect(350, -250, 75, 75);
        spawn.bodyRect(1250, -200, 25, 25);
        spawn.bodyRect(1150, -350, 100, 175);
        spawn.bodyRect(1375, -375, 25, 25);
        spawn.bodyRect(1375, -400, 50, 100);
        spawn.mapRect(2650, -400, 500, 50);
        spawn.mapRect(3100, -175, 300, 50);
        spawn.bodyRect(2700, -250, 75, 25);
        spawn.bodyRect(2725, -275, 25, 25);
        spawn.bodyRect(2750, -250, 25, 25);
        spawn.bodyRect(2825, -275, 75, 100);
        spawn.randomMob(3650, -250, 0);
        spawn.bodyRect(2925, -225, 50, 50);
        spawn.mapRect(325, -950, 25, 25);
        spawn.mapRect(325, -975, 650, 200);
        spawn.mapRect(975, -900, 200, 100);
        spawn.mapRect(1175, -850, 100, 100);
        spawn.mapRect(1275, -800, 75, 125);
        spawn.mapRect(1350, -725, 25, 125);
        spawn.mapRect(1225, -800, 25, 25);
        spawn.mapRect(950, -925, 100, 25);
        spawn.mapRect(1150, -875, 100, 25);
        spawn.mapRect(1250, -825, 75, 50);
        spawn.mapRect(1125, -825, 75, 50);
        spawn.mapRect(1250, -775, 50, 50);
        spawn.mapRect(1400, -225, 100, 200);
        spawn.mapRect(1550, -150, 125, 75);
        spawn.mapRect(1500, -100, 75, 75);
        spawn.mapRect(1175, -225, 225, 100);
        spawn.mapRect(1475, -200, 100, 100);
        spawn.mapRect(1300, -175, 125, 100);
        spawn.mapRect(1250, -150, 50, 200);
        spawn.mapRect(1600, -275, 50, 150);
        spawn.mapRect(1300, -275, 75, 75);
        spawn.mapRect(1475, -375, 50, 225);
        spawn.mapRect(1575, -225, 25, 100);
        spawn.mapRect(1500, -325, 50, 125);
        spawn.bodyRect(1400, -350, 25, 50);
        spawn.bodyRect(1650, -425, 50, 50);
        spawn.bodyRect(1750, -475, 25, 125);
        spawn.bodyRect(1725, -575, 150, 50);
        spawn.bodyRect(1625, -425, 25, 50);
        spawn.bodyRect(1175, -425, 75, 75);
        spawn.mapRect(325, -625, 175, 50);
        spawn.mapRect(425, -800, 25, 175);
        spawn.mapRect(375, -800, 25, 200);
        spawn.mapRect(500, -800, 25, 225);
        spawn.mapRect(475, -800, 50, 225);
        spawn.mapRect(675, -875, 50, 575);
        spawn.mapRect(675, -150, 25, 175);
        spawn.mapRect(700, -150, 25, 75);
        spawn.mapRect(675, -125, 25, 200);
        spawn.bodyRect(675, -300, 50, 150);
        spawn.mapRect(2125, -1025, 1025, 100);
        spawn.mapRect(3050, -975, 325, 50);
        spawn.mapRect(3300, -925, 75, 600);
        spawn.bodyRect(3300, -325, 75, 125);
        spawn.bodyRect(3325, -325, 25, 25);
        spawn.mapRect(3300, -325, 75, 25);
        spawn.mapRect(3325, -175, 1100, 25);
        spawn.mapRect(3325, -950, 1100, 25);
        spawn.mapRect(3350, -725, 225, 25);
        spawn.mapRect(3500, -925, 75, 200);
        spawn.mapRect(3350, -850, 175, 25);
        spawn.bodyRect(4075, -625, 125, 125);
        spawn.bodyRect(3850, -825, 75, 50);
        spawn.bodyRect(4050, -800, 25, 50);
        spawn.bodyRect(4150, -825, 75, 100);
        spawn.bodyRect(3900, -800, 50, 75);
        spawn.bodyRect(3575, -375, 100, 75);
        spawn.bodyRect(3800, -675, 75, 100);
        spawn.bodyRect(3950, -875, 250, 150);
        spawn.bodyRect(3975, -700, 50, 100);
        spawn.bodyRect(4150, -775, 200, 125);
        spawn.bodyRect(3825, -700, 50, 125);
        spawn.bodyRect(3575, -550, 125, 50);
        spawn.bodyRect(3750, -550, 25, 25);
        spawn.bodyRect(3600, -625, 75, 50);
        spawn.bodyRect(3550, -500, 75, 50);
        spawn.bodyRect(4200, -675, 75, 75);
        spawn.bodyRect(4400, -600, 50, 125);
        spawn.mapRect(4375, -175, 350, 25);
        spawn.mapRect(4475, -200, 475, 50);
        spawn.mapRect(4450, -925, 25, 25);
        spawn.mapRect(4475, -950, 475, 50);
        spawn.mapRect(4350, -950, 225, 25);
        spawn.mapRect(4450, -925, 100, 750);
        spawn.mapRect(4650, -900, 825, 700);
        spawn.mapRect(5250, -825, 475, 550);
        spawn.mapRect(5550, -725, 700, 350);
        spawn.mapRect(6100, -625, 550, 150);
        spawn.mapRect(6600, -575, 225, 50);
        spawn.mapRect(1325, -875, 50, 200);
        spawn.mapRect(1275, -825, 50, 25);
        spawn.mapRect(1275, -875, 25, 50);
        spawn.mapRect(1225, -900, 75, 25);
        spawn.mapRect(1325, -900, 50, 75);
        spawn.mapRect(1075, -925, 200, 75);
        spawn.mapRect(1275, -975, 75, 150);
        spawn.mapRect(1300, -800, 100, 150);
        spawn.mapRect(1375, -725, 50, 150);
        spawn.mapRect(-325, -1525, 650, 300);
        spawn.mapRect(150, -1275, 50, 375);
        spawn.mapRect(-100, -1350, 50, 450);
        spawn.mapRect(-325, -2600, 650, 300);
        spawn.mapRect(-275, -2400, 25, 50);
        spawn.mapRect(-275, -2325, 50, 825);
        spawn.mapRect(300, -1475, 675, 200);
        spawn.bodyRect(375, -1250, 75, 75);
        spawn.bodyRect(800, -1275, 25, 300);
        spawn.mapRect(1950, -1000, 175, 100);
        spawn.mapRect(1850, -950, 125, 125);
        spawn.mapRect(1825, -875, 75, 125);
        spawn.mapRect(1825, -800, 25, 125);
        spawn.mapRect(1800, -750, 25, 150);
        spawn.mapRect(1775, -625, 50, 150);
        spawn.mapRect(2000, -900, 25, 225);
        spawn.mapRect(2075, -925, 50, 400);
        spawn.mapRect(1000, -825, 25, 300);
        spawn.mapRect(1050, -900, 50, 25);
        spawn.mapRect(1050, -925, 50, 25);
        spawn.mapRect(2475, -100, 50, 350);
        spawn.mapRect(2650, -100, 25, 725);
        spawn.mapRect(2350, -950, 50, 350);
        spawn.mapRect(775, -825, 25, 375);
        spawn.mapRect(3750, -950, 25, 175);
        spawn.mapRect(3625, -925, 25, 275);
        spawn.mapRect(4225, -925, 50, 200);
        spawn.mapRect(950, -1425, 200, 100);
        spawn.mapRect(1150, -1400, 150, 75);
        spawn.mapRect(1300, -1350, 25, 100);
        spawn.mapRect(1275, -1350, 25, 50);
        spawn.bodyRect(1300, -1250, 25, 275);
        spawn.bodyRect(2600, -1575, 375, 550);
        spawn.bodyRect(2625, -1300, 75, 150);
        spawn.bodyRect(2700, -1475, 100, 275);
        spawn.bodyRect(2525, -1200, 75, 150);
        spawn.mapRect(1675, -1400, 200, 75);
        spawn.mapRect(1825, -1425, 225, 100);
        spawn.mapRect(1650, -1350, 75, 100);
        spawn.mapRect(1700, -1275, 25, 125);
        spawn.bodyRect(1225, -1425, 550, 25);
        spawn.bodyRect(1300, -1650, 100, 150);
        spawn.bodyRect(1600, -1675, 100, 200);
        spawn.bodyRect(1575, -1525, 25, 25);
        spawn.bodyRect(1450, -1575, 25, 125);
        spawn.bodyRect(1500, -1650, 75, 50);
        spawn.mapRect(2325, -1225, 50, 200);
        spawn.mapRect(2375, -1300, 100, 275);
        spawn.mapRect(2225, -1125, 125, 100);
        spawn.mapRect(2300, -1150, 50, 50);
        spawn.bodyRect(2250, -850, 75, 100);
        spawn.mapRect(150, -2550, 800, 200);
        spawn.mapRect(875, -2500, 275, 100);
        spawn.mapRect(325, -2400, 75, 375);
        spawn.mapRect(325, -1800, 75, 350);
        spawn.bodyRect(325, -2025, 75, 225);
        spawn.mapRect(-150, -2375, 25, 375);
        spawn.mapRect(25, -2400, 50, 500);
        spawn.mapRect(-100, -2375, 25, 225);
        spawn.mapRect(200, -2350, 50, 250);
        spawn.bodyRect(250, -1875, 25, 75);
        spawn.bodyRect(-50, -2050, 50, 50);
        spawn.mapRect(1050, -1350, 50, 150);
        spawn.mapRect(575, -1325, 25, 100);
        spawn.mapRect(400, -1300, 25, 75);
        spawn.mapRect(525, -1300, 50, 125);
        spawn.mapRect(575, -2400, 75, 275);
        spawn.mapRect(650, -2325, 25, 325);
        spawn.mapRect(625, -2150, 50, 75);
        spawn.mapRect(625, -2375, 50, 100);
        spawn.mapRect(600, -2125, 25, 25);
        spawn.mapRect(650, -2075, 25, 150);
        spawn.mapRect(675, -2375, 50, 200);
        spawn.mapRect(650, -2200, 50, 75);
        spawn.mapRect(625, -2100, 50, 75);
        spawn.mapRect(1100, -2475, 950, 50);
        spawn.mapRect(1325, -1825, 450, 25);
        spawn.mapRect(1475, -1850, 150, 50);
        spawn.mapRect(1725, -2425, 50, 600);
        spawn.mapRect(1325, -2450, 50, 450);
        spawn.mapRect(1475, -2425, 25, 150);
        spawn.mapRect(1675, -2425, 25, 600);
        spawn.bodyRect(1450, -2175, 50, 75);
        spawn.bodyRect(1650, -2200, 50, 50);
        spawn.mapRect(950, -1550, 75, 125);
        spawn.mapRect(900, -1500, 50, 50);
        spawn.mapRect(2000, -2475, 125, 50);
        spawn.mapRect(2100, -2475, 1050, 100);
        spawn.mapRect(3050, -2425, 300, 50);
        spawn.mapRect(3225, -2400, 1350, 25);
        spawn.mapRect(4475, -2400, 475, 50);
        spawn.mapRect(4900, -2375, 1125, 50);
        spawn.mapRect(3950, -1350, 2075, 50);
        spawn.mapRect(4075, -1325, 75, 400);
        spawn.mapRect(4775, -1325, 75, 425);
        spawn.mapRect(6000, -2350, 1075, 1025);
        spawn.mapRect(6675, -2250, 950, 825);
        spawn.mapRect(7375, -2050, 700, 425);
        spawn.mapRect(7850, -1900, 425, 125);
        spawn.mapRect(8200, -1850, 275, 25);
        spawn.mapRect(5000, -2350, 75, 400);
        spawn.mapRect(5200, -2350, 25, 600);
        spawn.mapRect(5600, -2325, 25, 475);
        spawn.mapRect(5750, -2350, 50, 300);
        spawn.mapRect(5800, -2325, 25, 400);
        spawn.mapRect(5775, -2075, 25, 50);
        spawn.bodyRect(5325, -2250, 75, 125);
        spawn.bodyRect(5925, -1800, 75, 125);
        spawn.bodyRect(5475, -1800, 75, 225);
        spawn.bodyRect(5350, -2050, 175, 100);
        spawn.bodyRect(5475, -2125, 75, 125);
        spawn.bodyRect(5750, -1750, 100, 100);
        spawn.bodyRect(5900, -1950, 175, 150);
        spawn.bodyRect(4600, -1950, 150, 275);
        spawn.bodyRect(4875, -1875, 150, 100);
        spawn.mapRect(5675, -1600, 350, 50);
        spawn.mapRect(4325, -1300, 25, 200);
        spawn.mapRect(3975, -2375, 75, 350);
        spawn.mapRect(4250, -2375, 25, 550);
        spawn.mapRect(2875, -2400, 75, 400);
        spawn.mapRect(3050, -2425, 25, 700);
        spawn.mapRect(2450, -2425, 75, 550);
        spawn.mapRect(3375, -2375, 25, 525);
        spawn.mapRect(3325, -1125, 75, 225);
        spawn.mapRect(3125, -1200, 25, 200);
        spawn.mapRect(2975, -1225, 75, 225);
        spawn.mapRect(1875, -2425, 50, 550);
        spawn.mapRect(1900, -1925, 475, 50);
        spawn.mapRect(2300, -2400, 75, 475);
        spawn.bodyRect(2025, -2325, 50, 50);
        spawn.bodyRect(2150, -2300, 100, 100);
        spawn.bodyRect(2025, -2325, 25, 100);
        spawn.bodyRect(2125, -2275, 75, 75);
        spawn.bodyRect(2250, -2250, 25, 50);
        spawn.bodyRect(2000, -2325, 75, 100);
        spawn.bodyRect(2150, -2300, 75, 100);
        spawn.bodyRect(1975, -2300, 75, 75);
        spawn.bodyRect(2150, -2300, 75, 75);
        spawn.bodyRect(2025, -2350, 50, 125);
        spawn.bodyRect(2250, -2325, 50, 75);
        spawn.randomMob(2625, -750, 0);
        spawn.randomMob(3200, -725, 0);
        spawn.randomMob(2900, -575, 0);
        spawn.randomMob(700, -1100, 0);
        spawn.randomMob(3275, -1575, 0);
        spawn.randomMob(3950, -1500, 0);
        spawn.randomMob(3725, -1300, 0);
        spawn.randomMob(3625, -1700, 0);
        spawn.randomMob(2250, -1675, 0);
        spawn.randomMob(550, -1875, 0);
        spawn.randomMob(1600, -700, 0);
        spawn.randomMob(1050, -400, 0);
        spawn.randomSmallMob(1085, -1591);
        spawn.randomSmallMob(1516, -532);
        spawn.randomGroup(1551, -466, 0.4);
        if (simulation.difficulty > 1) spawn.randomLevelBoss(3928, -655);
        spawn.secondaryBossChance(4088, -1744)

        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => { };
    },
    unchartedCave() {
        simulation.inGameConsole(`<strong>unchartedCave</strong> by <span class='color-var'>3xionDev</span>`);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 20985;
        level.exit.y = 2816;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1900
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#979797";

        spawn.randomMob(1000, -975, 0);
        spawn.randomMob(2550, -575, 0);
        spawn.randomMob(2050, -325, 0);
        spawn.randomMob(2475, -1350, 0);
        spawn.randomMob(2800, -1100, 0);
        spawn.randomMob(3400, -1250, 0);
        spawn.randomMob(3375, -425, 0);
        spawn.randomMob(4575, -775, 0);
        spawn.randomMob(5750, -750, 0);
        spawn.randomMob(5475, -325, 0);
        spawn.randomMob(7625, -250, 0);
        spawn.randomMob(9675, 525, 0);
        spawn.randomMob(12150, 1200, 0);
        spawn.randomMob(12825, 1275, 0);
        spawn.randomMob(13175, 1725, 0);
        spawn.randomMob(13725, 1375, 0);
        spawn.randomMob(15550, 2375, 0);
        spawn.randomMob(17625, 3550, 0);
        spawn.randomMob(18850, 3500, 0);
        spawn.mapRect(-150, 0, 300, 75);
        spawn.mapRect(-375, 25, 2550, 75);
        spawn.mapRect(-400, -950, 75, 1025);
        spawn.mapRect(-400, 75, 50, 25);
        spawn.mapRect(-400, -1750, 100, 800);
        spawn.mapRect(-350, -1050, 50, 1125);
        spawn.mapRect(-400, -1950, 100, 275);
        spawn.mapRect(1875, 25, 2075, 75);
        spawn.mapRect(-400, 50, 4350, 1175);
        spawn.mapRect(-400, 650, 4350, 1175);
        spawn.mapRect(2975, 25, 3575, 1800);
        spawn.mapRect(-375, -1925, 1725, 800);
        spawn.mapRect(-400, -2275, 5625, 725);
        spawn.mapRect(1075, -1725, 500, 425);
        spawn.mapRect(1275, -1325, 200, 125);
        spawn.mapRect(1525, -1325, 25, 75);
        spawn.mapRect(1400, -1425, 125, 200);
        spawn.mapRect(1400, -1725, 325, 275);
        spawn.mapRect(1675, -1600, 125, 100);
        spawn.mapRect(-350, -1200, 250, 250);
        spawn.mapRect(-175, -1225, 250, 175);
        spawn.mapRect(-50, -1150, 275, 50);
        spawn.bodyRect(-275, -475, 75, 175);
        spawn.bodyRect(325, -750, 50, 50);
        spawn.mapRect(2075, -1575, 75, 725);
        spawn.mapRect(1900, -1600, 50, 325);
        spawn.mapRect(2600, -1675, 25, 850);
        spawn.mapRect(2125, -1625, 125, 425);
        spawn.mapRect(2125, -1200, 50, 75);
        spawn.mapRect(2075, -875, 25, 150);
        spawn.mapRect(2025, -1625, 50, 250);
        spawn.mapRect(4700, -2275, 2175, 1275);
        spawn.mapRect(3975, -1725, 1125, 400);
        spawn.mapRect(4300, -1400, 650, 200);
        spawn.mapRect(4600, -1225, 175, 125);
        spawn.mapRect(3925, -1600, 175, 150);
        spawn.mapRect(3950, -1450, 50, 75);
        spawn.mapRect(4225, -1350, 150, 100);
        spawn.mapRect(3875, -1600, 175, 175);
        spawn.mapRect(4450, -1275, 200, 125);
        spawn.mapRect(4850, -1125, 50, 550);
        spawn.mapRect(5225, -1175, 25, 400);
        spawn.mapRect(3250, -1725, 25, 1200);
        spawn.mapRect(3600, -1750, 75, 550);
        spawn.mapRect(2850, -1700, 325, 325);
        spawn.mapRect(2900, -1525, 175, 750);
        spawn.mapRect(2975, -900, 75, 450);
        spawn.mapRect(550, -175, 150, 500);
        spawn.mapRect(625, -300, 125, 450);
        spawn.mapRect(725, -175, 50, 475);
        spawn.mapRect(675, -400, 25, 200);
        spawn.mapRect(450, -25, 150, 150);
        spawn.mapRect(275, -1200, 75, 625);
        spawn.mapRect(300, -1300, 150, 600);
        spawn.mapRect(425, -1250, 25, 800);
        spawn.mapRect(425, -1225, 125, 425);
        spawn.mapRect(525, -1175, 100, 250);
        spawn.mapRect(175, -1200, 175, 375);
        spawn.mapRect(1600, -375, 50, 650);
        spawn.mapRect(1650, -525, 75, 725);
        spawn.mapRect(1450, -225, 150, 475);
        spawn.mapRect(1400, -125, 100, 275);
        spawn.mapRect(1500, -325, 125, 150);
        spawn.mapRect(1750, -225, 100, 350);
        spawn.mapRect(1700, -300, 75, 275);
        spawn.mapRect(1850, -150, 25, 325);
        spawn.mapRect(1750, -50, 75, 225);
        spawn.mapRect(1600, -50, 200, 250);
        spawn.mapRect(1700, -600, 25, 125);
        spawn.bodyRect(1275, -250, 50, 125);
        spawn.mapRect(6450, 50, 675, 2000);
        spawn.mapRect(6925, 175, 675, 300);
        spawn.mapRect(7450, 300, 675, 775);
        spawn.mapRect(6925, 325, 1275, 1850);
        spawn.mapRect(7025, 125, 375, 100);
        spawn.mapRect(7500, 275, 425, 100);
        spawn.mapRect(6700, -2275, 1975, 1575);
        spawn.mapRect(6475, -1175, 400, 300);
        spawn.mapRect(6550, -925, 250, 150);
        spawn.mapRect(6600, -825, 175, 75);
        spawn.mapRect(6300, -1050, 325, 100);
        spawn.mapRect(8050, 400, 450, 1675);
        spawn.mapRect(8275, 475, 800, 1550);
        spawn.mapRect(8600, 575, 925, 1475);
        spawn.mapRect(8400, 425, 300, 100);
        spawn.mapRect(8975, 550, 300, 100);
        spawn.mapRect(6900, -775, 2375, 200);
        spawn.mapRect(7350, -725, 2125, 275);
        spawn.mapRect(7725, -550, 1800, 225);
        spawn.mapRect(8300, -400, 1750, 125);
        spawn.mapRect(8725, -350, 1350, 225);
        spawn.mapRect(8525, -375, 400, 150);
        spawn.mapRect(8650, -250, 150, 50);
        spawn.mapRect(8200, -350, 175, 50);
        spawn.mapRect(7600, -475, 275, 100);
        spawn.mapRect(7475, -500, 175, 75);
        spawn.mapRect(7200, -600, 300, 75);
        spawn.mapRect(7075, -600, 150, 25);
        spawn.mapRect(7125, -575, 100, 25);
        spawn.mapRect(7275, -525, 100, 25);
        spawn.mapRect(7500, 225, 275, 125);
        spawn.mapRect(5800, -1175, 675, 100);
        spawn.mapRect(9400, 625, 500, 1725);
        spawn.mapRect(9750, 775, 575, 1500);
        spawn.mapRect(10050, 1075, 675, 1300);
        spawn.mapRect(9725, -250, 975, 350);
        spawn.mapRect(10275, -100, 1000, 625);
        spawn.mapRect(10125, 25, 375, 350);
        spawn.mapRect(9900, 25, 375, 225);
        spawn.mapRect(10075, 250, 200, 50);
        spawn.mapRect(10275, 425, 75, 75);
        spawn.mapRect(10150, 325, 200, 75);
        spawn.mapRect(10200, 375, 125, 100);
        spawn.mapRect(9600, -175, 225, 200);
        spawn.mapRect(9650, -25, 125, 100);
        spawn.mapRect(9450, -200, 225, 175);
        spawn.mapRect(10000, 200, 50, 25);
        spawn.mapRect(9800, 50, 200, 125);
        spawn.mapRect(9875, 725, 150, 75);
        spawn.mapRect(10300, 900, 100, 325);
        spawn.mapRect(10375, 950, 75, 225);
        spawn.mapRect(10425, 1000, 75, 175);
        spawn.mapRect(9100, -150, 375, 75);
        spawn.mapRect(3525, 0, 1850, 100);
        spawn.mapRect(3650, -25, 1475, 175);
        spawn.mapRect(4000, -100, 950, 225);
        spawn.mapRect(4450, -175, 300, 175);
        spawn.mapRect(1825, -25, 775, 100);
        spawn.mapRect(4150, -1375, 175, 75);
        spawn.mapRect(3800, -1600, 125, 100);
        spawn.mapRect(2700, 0, 175, 100);
        spawn.mapRect(2750, -50, 75, 150);
        spawn.mapRect(2775, -25, 75, 75);
        spawn.bodyRect(3775, -575, 50, 75);
        spawn.mapRect(8050, -2300, 4650, 1750);
        spawn.mapRect(9300, -975, 2450, 575);
        spawn.mapRect(9925, -775, 2350, 700);
        spawn.mapRect(10675, -600, 2025, 1175);
        spawn.mapRect(10300, 825, 50, 125);
        spawn.mapRect(10000, 750, 100, 25);
        spawn.mapRect(9875, 700, 75, 75);
        spawn.mapRect(9850, 675, 75, 50);
        spawn.mapRect(8975, 525, 225, 50);
        spawn.mapRect(8625, 450, 225, 50);
        spawn.mapRect(8925, -150, 175, 50);
        spawn.mapRect(-500, 1775, 10800, 1800);
        spawn.mapRect(10075, 2200, 625, 1850);
        spawn.mapRect(10525, 475, 250, 75);
        spawn.mapRect(10450, 1025, 25, 25);
        spawn.mapRect(10450, 1050, 150, 25);
        spawn.mapRect(10675, 1125, 175, 1700);
        spawn.mapRect(10725, 1225, 400, 725);
        spawn.mapRect(10975, 1425, 300, 1300);
        spawn.mapRect(11225, 1550, 700, 1275);
        spawn.mapRect(11725, 1625, 1150, 1150);
        spawn.mapRect(11050, 1275, 125, 350);
        spawn.mapRect(11150, 1350, 75, 175);
        spawn.mapRect(10825, 1200, 125, 75);
        spawn.mapRect(10325, 1750, 1275, 1150);
        spawn.mapRect(11250, 1500, 325, 100);
        spawn.mapRect(11225, 1475, 200, 75);
        spawn.mapRect(11525, 1525, 350, 75);
        spawn.mapRect(11875, 1575, 425, 100);
        spawn.mapRect(12200, 1625, 25, 25);
        spawn.mapRect(12200, 1600, 250, 75);
        spawn.randomMob(11250, 675, 0);
        spawn.bodyRect(10900, 575, 50, 625);
        spawn.mapRect(11050, 575, 1725, 200);
        spawn.mapRect(11275, 750, 1650, 125);
        spawn.mapRect(11575, 875, 1525, 150);
        spawn.mapRect(11450, 850, 250, 125);
        spawn.mapRect(11325, 850, 225, 50);
        spawn.mapRect(11400, 875, 100, 75);
        spawn.mapRect(11175, 750, 200, 75);
        spawn.mapRect(11125, 775, 100, 25);
        spawn.mapRect(11250, 825, 50, 25);
        spawn.mapRect(11675, 1025, 400, 50);
        spawn.mapRect(12175, 1025, 50, 150);
        spawn.mapRect(11625, 1000, 75, 50);
        spawn.mapRect(12200, 1175, 25, 25);
        spawn.mapRect(12400, 950, 100, 275);
        spawn.mapRect(12450, 1200, 50, 100);
        spawn.mapRect(12425, 1225, 50, 125);
        spawn.mapRect(12425, 1325, 25, 75);
        spawn.mapRect(12325, 1025, 25, 100);
        spawn.mapRect(12625, 1000, 625, 150);
        spawn.mapRect(12775, 1150, 600, 50);
        spawn.bodyRect(12075, 1325, 100, 50);
        spawn.mapRect(12825, 2000, 800, 975);
        spawn.mapRect(13475, 1625, 150, 475);
        spawn.mapRect(12850, 1750, 50, 275);
        spawn.mapRect(12875, 1850, 75, 225);
        spawn.mapRect(12950, 1925, 75, 125);
        spawn.mapRect(13450, 1700, 50, 350);
        spawn.mapRect(13400, 1750, 75, 350);
        spawn.mapRect(13325, 1875, 100, 200);
        spawn.mapRect(13350, 1800, 75, 100);
        spawn.mapRect(13300, 1950, 25, 75);
        spawn.mapRect(12925, 1900, 75, 25);
        spawn.mapRect(12900, 1800, 25, 75);
        spawn.mapRect(13000, 1975, 150, 25);
        spawn.mapRect(12475, 100, 1150, 925);
        spawn.mapRect(13200, 100, 925, 1100);
        spawn.mapRect(13525, 1150, 400, 75);
        spawn.mapRect(13875, 1200, 175, 125);
        spawn.mapRect(13975, 1300, 75, 225);
        spawn.mapRect(14025, 1425, 25, 225);
        spawn.mapRect(13600, 1700, 100, 1250);
        spawn.mapRect(13675, 1775, 150, 1200);
        spawn.mapRect(13775, 1825, 75, 1150);
        spawn.mapRect(13825, 1900, 50, 1075);
        spawn.mapRect(13850, 1950, 75, 1025);
        spawn.mapRect(13875, 2025, 75, 950);
        spawn.mapRect(13925, 2100, 50, 1025);
        spawn.mapRect(13900, 2125, 100, 1000);
        spawn.mapRect(13975, 2225, 75, 900);
        spawn.mapRect(14000, 2375, 100, 750);
        spawn.mapRect(14050, 1200, 75, 525);
        spawn.mapRect(14075, 1625, 100, 150);
        spawn.mapRect(14175, 1750, 50, 175);
        spawn.mapRect(14150, 1750, 50, 75);
        spawn.mapRect(14225, 1875, 50, 150);
        spawn.mapRect(14250, 2000, 50, 150);
        spawn.mapRect(14100, 300, 300, 1450);
        spawn.mapRect(14225, 1675, 150, 250);
        spawn.mapRect(14300, 1700, 100, 675);
        spawn.mapRect(14275, 1925, 50, 175);
        spawn.mapRect(14025, 2300, 50, 200);
        spawn.mapRect(14075, 2600, 275, 700);
        spawn.mapRect(14050, 2425, 75, 475);
        spawn.mapRect(14100, 2525, 50, 150);
        spawn.mapRect(14150, 2575, 50, 100);
        spawn.mapRect(14325, 2650, 800, 1300);
        spawn.mapRect(15000, 2600, 1075, 1275);
        spawn.mapRect(15100, 2550, 1200, 1400);
        spawn.mapRect(14375, 1075, 1400, 1175);
        spawn.mapRect(14375, 2225, 200, 50);
        spawn.mapRect(14375, 2275, 75, 75);
        spawn.mapRect(14425, 2275, 75, 25);
        spawn.mapRect(14775, 2200, 50, 125);
        spawn.mapRect(14725, 2250, 25, 125);
        spawn.bodyRect(14300, 2375, 50, 225);
        spawn.mapRect(15075, 2600, 50, 25);
        spawn.mapRect(15075, 2575, 50, 50);
        spawn.mapRect(14950, 2625, 50, 25);
        spawn.mapRect(15525, 2525, 300, 50);
        spawn.mapRect(15550, 2500, 175, 100);
        spawn.mapRect(14975, 2250, 200, 25);
        spawn.mapRect(14400, 1000, 1900, 1250);
        spawn.mapRect(15925, 2250, 275, 25);
        spawn.mapRect(15975, 2275, 150, 25);
        spawn.mapRect(16075, 2300, 25, 75);
        spawn.mapRect(16250, 2575, 275, 1275);
        spawn.mapRect(16400, 2600, 250, 1300);
        spawn.mapRect(16525, 2675, 300, 1150);
        spawn.mapRect(16650, 2725, 300, 1175);
        spawn.mapRect(16200, 1050, 600, 1225);
        spawn.mapRect(16525, 1025, 500, 1300);
        spawn.mapRect(16725, 1150, 525, 1225);
        spawn.mapRect(16900, 1425, 550, 1000);
        spawn.mapRect(16375, 2250, 250, 50);
        spawn.mapRect(16675, 2325, 75, 25);
        spawn.mapRect(16850, 2400, 25, 25);
        spawn.mapRect(16850, 2375, 100, 50);
        spawn.mapRect(16800, 2375, 50, 25);
        spawn.mapRect(16575, 2650, 150, 75);
        spawn.mapRect(16625, 2625, 50, 50);
        spawn.mapRect(16800, 2700, 50, 50);
        spawn.mapRect(16950, 2900, 450, 1175);
        spawn.mapRect(16900, 2825, 100, 275);
        spawn.mapRect(16900, 2775, 75, 150);
        spawn.mapRect(16950, 2850, 100, 125);
        spawn.mapRect(17600, 3000, 350, 25);
        spawn.mapRect(17650, 3025, 200, 50);
        spawn.mapRect(17750, 3050, 100, 1200);
        spawn.mapRect(17850, 3025, 25, 425);
        spawn.mapRect(18200, 3100, 450, 25);
        spawn.mapRect(18250, 3125, 150, 100);
        spawn.mapRect(18400, 3125, 200, 50);
        spawn.mapRect(18400, 3150, 75, 900);
        spawn.mapRect(18400, 3950, 75, 375);
        spawn.mapRect(17750, 4000, 100, 325);
        spawn.mapRect(18200, 3075, 525, 50);
        spawn.mapRect(18450, 3175, 50, 275);
        spawn.mapRect(18575, 3125, 50, 50);
        spawn.mapRect(18600, 3100, 50, 50);
        spawn.mapRect(18325, 3200, 100, 175);
        spawn.mapRect(18350, 3350, 75, 100);
        spawn.mapRect(18375, 3450, 25, 75);
        spawn.mapRect(18500, 3175, 25, 150);
        spawn.mapRect(17725, 3075, 50, 175);
        spawn.mapRect(17700, 3075, 25, 50);
        spawn.mapRect(18550, 3150, 50, 1275);
        spawn.mapRect(18975, 2975, 525, 25);
        spawn.mapRect(19025, 2975, 400, 75);
        spawn.mapRect(19150, 3025, 150, 1400);
        spawn.mapRect(19250, 3025, 100, 325);
        spawn.mapRect(19100, 3050, 75, 225);
        spawn.mapRect(19125, 3275, 50, 75);
        spawn.mapRect(19275, 3325, 50, 200);
        spawn.mapRect(19700, 3000, 525, 50);
        spawn.mapRect(19750, 3050, 175, 1275);
        spawn.mapRect(19925, 3025, 100, 225);
        spawn.mapRect(19900, 3200, 75, 250);
        spawn.mapRect(20025, 3050, 50, 100);
        spawn.mapRect(20000, 3150, 50, 75);
        spawn.mapRect(19900, 3450, 50, 125);
        spawn.mapRect(19725, 3050, 75, 150);
        spawn.mapRect(19650, 3025, 25, 25);
        spawn.mapRect(19650, 3000, 625, 25);
        spawn.mapRect(17375, 1450, 3525, 250);
        spawn.mapRect(17400, 1675, 100, 400);
        spawn.mapRect(17475, 1675, 75, 150);
        spawn.mapRect(17525, 1650, 125, 75);
        spawn.mapRect(17475, 1775, 50, 175);
        spawn.mapRect(17425, 2025, 50, 200);
        spawn.mapRect(17825, 1650, 375, 75);
        spawn.mapRect(17975, 1700, 100, 125);
        spawn.mapRect(18050, 1800, 50, 150);
        spawn.mapRect(18025, 1675, 100, 150);
        spawn.mapRect(18075, 1900, 25, 175);
        spawn.mapRect(20550, 2825, 825, 1525);
        spawn.mapRect(20825, 1450, 550, 250);
        spawn.mapRect(21350, 1450, 300, 2700);
        spawn.mapRect(21100, 1650, 275, 425);
        spawn.mapRect(21225, 2025, 175, 275);
        spawn.mapRect(21175, 2025, 75, 150);
        spawn.mapRect(21300, 2275, 75, 150);
        spawn.mapRect(21000, 1675, 100, 300);
        spawn.mapRect(21050, 1950, 50, 100);
        spawn.mapRect(20700, 1700, 200, 50);
        spawn.mapRect(20750, 1725, 50, 225);
        spawn.mapRect(20800, 1725, 50, 175);
        spawn.mapRect(20750, 1925, 25, 150);
        spawn.mapRect(20975, 1675, 50, 225);
        spawn.mapRect(21275, 2300, 50, 50);
        spawn.mapRect(20550, 1700, 150, 50);
        spawn.mapRect(20550, 1725, 50, 825);
        spawn.mapRect(20575, 1725, 50, 300);
        spawn.mapRect(20600, 1725, 50, 75);
        spawn.mapRect(20600, 1875, 25, 350);
        spawn.mapRect(20675, 1750, 25, 400);
        spawn.bodyRect(20550, 2550, 50, 275);
        spawn.mapRect(20500, 2850, 75, 1500);
        spawn.mapRect(20475, 2900, 50, 1425);
        spawn.bodyRect(21200, 2550, 50, 75);
        spawn.bodyRect(20775, 2225, 75, 75);

        spawn.mapRect(19525, 1700, 550, 25);
        spawn.mapRect(19650, 1725, 100, 275);
        spawn.mapRect(19725, 1700, 50, 525);
        spawn.mapRect(19750, 1725, 250, 150);
        spawn.mapRect(19775, 1850, 100, 225);
        spawn.mapRect(19850, 1875, 100, 75);
        spawn.mapRect(19600, 1675, 125, 175);
        spawn.mapRect(18425, 1700, 1050, 50);
        spawn.mapRect(18475, 1750, 800, 25);
        spawn.randomMob(12000, 2850, 0);
        spawn.mapRect(10550, 2725, 5275, 1775);
        spawn.mapRect(15700, 3850, 5950, 1050);
        spawn.mapRect(8225, 2975, 4050, 1500);
        spawn.mapRect(12100, -2300, 9350, 2925);
        spawn.mapRect(14175, 350, 8725, 1075);
        spawn.mapRect(20825, -2325, 3700, 2650);
        spawn.mapRect(21450, 50, 4450, 5925);
        spawn.mapRect(16325, 1125, 7175, 400);
        spawn.mapRect(-875, -3775, 27375, 1625);
        spawn.mapRect(-3250, -4000, 2925, 8075);
        spawn.mapRect(8125, 4475, 18250, 7300);
        spawn.mapRect(7125, 3975, 8775, 2800);
        spawn.mapRect(-4300, -4475, 2300, 11350);
        spawn.randomGroup(5835, -532, 0.4);
        if (simulation.difficulty > 1) spawn.randomLevelBoss(18823, 2191);
        spawn.secondaryBossChance(20217, 1913)
        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();
        };
        level.customTopLayer = () => { };
    },
    dojo() { // By weird_pusheen
        simulation.inGameConsole(`<strong>dojo</strong> by <span class='color-var'>werid_pusheen</span>, fixed by <span class='color-var'>Cornbread 2100</span>`)
        const vanishes = [];
        const smoofes = [];
        const leftRotor = level.rotor(-550, 900, 950, 25);
        leftRotor.frictionAir = 0.01;
        var leftSchwoof = level.boost(-20, -60, -2000);
        var rightSchwoof = level.button(2550, -50);
        var rightSchwoofState = false;
        var rightSchwoofLive = true;
        spawn.mapRect(2513, -39, 200, 100);
        var pathPoints = [
            [0, 0], // Index 0 is owned by M and is set to M's position during play
            // this means that occasionally the boss will bonk M on the way to somewhere else, which gives it a chance to hurt M and gives the player a chance to hurt it
            [250, -750], /* Left bases */
            [250, -2500],
            [350, -1500],  // Left doorway
            [1150, -1500], // Home base
            [1150, -2750], // Upper base
            [1950, -1500], // Right doorway
            [2050, -750], /* Right bases */
            [2050, -2500],
            [-150, -250], // Left porthole
        ];
        function isntIn(point, array) {
            for (var x = 0; x < array.length; x++) {
                if (point[0] == array[x][0] && point[1] == array[x][1]) {
                    return false;
                }
            }
            return true;
        }
        function isObstructed(v1, v2) {
            var ret = Matter.Query.ray(map,
                {
                    x: v1[0],
                    y: v1[1],
                },
                {
                    x: v2[0],
                    y: v2[1]
                }).length != 0;
            return ret; // Kinda-ish stolen from mob.js
        }
        function pythag(p1, p2) {
            var dx = p1[0] - p2[0];
            var dy = p1[1] - p2[1];
            return Math.sqrt(dx * dx + dy * dy);
        }
        var path = undefined; // This is a stupid way to go about pathfinding code. I might even clean it up!
        function pathFind(goalPoint, startPoint, curPath = []) {
            var myPoint = startPoint;
            if (curPath.length) {
                myPoint = curPath[curPath.length - 1];
            }
            if (path && (curPath.length >= path.length)) { // If we've already found a shorter or equal path, no reason to continue and waste CPU time
                return; // Minimizes for HOP COUNT, not PATH LENGTH - path length was buggy
            }
            if (!isObstructed(myPoint, goalPoint)) { // If the line to the goal point ain't blocked by a map object, we've arrived!
                path = [...curPath];
                path.push(goalPoint);
                return;
            }
            pathPoints.forEach(testPoint => {
                if (isntIn(testPoint, curPath)) { // If it's reusing points, there's clearly something wrong
                    if (!isObstructed(myPoint, testPoint)) { // If the line to the test point ain't blocked by a map object
                        var thing = [...curPath];
                        thing.push(testPoint);
                        pathFind(goalPoint, startPoint, thing); // Branch to a valid test point
                    }
                }
            });
        }
        level.setPosToSpawn(1200, 500);
        level.exit.x = 51500;
        level.exit.y = -1875;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20);
        level.defaultZoom = 1500;
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#d8dadf";

        spawn.mapRect(-500, 0, 3300, 300); // Floor
        spawn.mapRect(-100, -3000, 2500, 100); // Ceiling
        spawn.mapRect(-200, -3000, 100, 2600); // Left wall
        spawn.mapRect(2400, -3000, 100, 3000); // Right wall

        spawn.mapRect(500, -1000, 100, 500); /* obstruction blocks */
        smoofes.push(map[map.length - 1]);
        spawn.mapRect(500, -2500, 100, 500);
        smoofes.push(map[map.length - 1]);
        spawn.mapRect(1700, -1000, 100, 500);
        smoofes.push(map[map.length - 1]);
        spawn.mapRect(1700, -2500, 100, 500);
        smoofes.push(map[map.length - 1]);

        spawn.mapRect(-1000, 550, 200, 50); // Left chonky stepppp low
        spawn.mapRect(-800, 300, 200, 50); // Left chonky stepppp high
        spawn.mapVertex(-1000, 1200, "0 0  100 0  700 500  700 700  0 700"); // Left chonky
        spawn.mapRect(3100, 550, 200, 50); // Right chonky stepppp low
        spawn.mapRect(2900, 300, 200, 50); // Right chonky stepppp high
        spawn.mapVertex(3300, 1200, "0 0  -100 0  -700 500  -700 700  0 700"); // Right chonky
        const leftElevator = level.elevator(-1400 - 300, 1450, 300, 100, 500);
        const rightElevator = level.elevator(-1400 + 5100, 1450, 300, 100, 500);

        spawn.mapRect(-150, -1700, 200, 50);
        spawn.mapRect(400, -2050, 200, 50);
        spawn.mapRect(1600, -1000, 200, 50);

        spawn.randomMob(1200, 700);
        spawn.randomMob(600, 1000);
        spawn.randomMob(1800, 1000);
        spawn.randomMob(3200, 400);
        spawn.randomMob(3000, 200);
        spawn.randomMob(-900, 400);
        spawn.randomMob(-700, 200);
        spawn.randomMob(1200, 1000);
        for (var i = 0; i < 4; i++) {
            spawn.randomSmallMob(Math.random() * 600 - 600, Math.random() * 3000 - 400);
        }
        spawn.grenadier(-300, -1000);
        spawn.grenadier(2600, -1000);

        spawn.mapRect(-1400, 1450, 5100, 100); // The True Floor

        const slime = level.hazard(-1250, 1400, 4800, 50);
        slime.maxHeight = 600;
        simulation.draw.body = function () {
            ctx.beginPath();
            for (let i = 0, len = body.length; i < len; ++i) {
                if (!body[i].hidden) {
                    let vertices = body[i].vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) {
                        ctx.lineTo(vertices[j].x, vertices[j].y);
                    }
                    ctx.lineTo(vertices[0].x, vertices[0].y);
                }
            }
            ctx.lineWidth = 2;
            ctx.fillStyle = color.block;
            ctx.fill();
            ctx.strokeStyle = color.blockS;
            ctx.stroke();
        } // Override the old draw code to allow intelligent hiding of blocks - preferably this becomes official code because it's just a single added if statement and makes a lot of things cleaner and more intelligent

        const vanish = function (x, y, width, height) { // normal vanishes don't work well on my map for some reason, so I rewrote
            x += width / 2;
            y += height / 2;
            const getVertices = function (bX, bY, bW, bH) { return [{ x: bX, y: bY, index: 0, isInternal: false }, { x: bX + bW, y: bY, index: 1, isInternal: false }, { x: bX + bW, y: bY + bH, index: 4, isInternal: false }, { x: bX, y: bY + bH, index: 3, isInternal: false }] };
            const cMask = cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet;
            const vertices = getVertices(x, y, width, height);
            const block = body[body.length] = Bodies.fromVertices(x, y, vertices, {
                collisionFilter: {
                    category: cat.map,
                    mask: cMask
                },
                isNoSetCollision: true,
                inertia: Infinity, //prevents rotation
                isNotHoldable: true,
                isNonStick: true, //this keep sporangium from sticking
                isTouched: false,
                cWidth: width,
                hiddenCycle: 0,
                isStatic: true,
                query() {
                    if (this.cWidth <= 0) {
                        if (this.cWidth > -100) {
                            this.cWidth = -100;
                            Matter.Body.setVertices(this, vertices);
                        }
                        this.isTouched = false;
                        this.collisionFilter.mask = undefined;
                        this.hidden = true;
                        this.hiddenCycle++;
                        if (this.hiddenCycle > 100) {
                            if (Matter.Query.collides(this, [player]).length) {
                                this.hiddenCycle = 50;
                            }
                            else {
                                this.hiddenCycle = 0;
                                this.cWidth = width;
                                this.collisionFilter.mask = cMask;
                                this.hidden = false;
                            }
                        }
                    }
                    else if (this.isTouched) {
                        Matter.Body.setVertices(this, getVertices(x, y, this.cWidth, height * (this.cWidth / width)));
                        this.cWidth -= 3;
                    }
                    else if (Matter.Query.collides(this, [player]).length) { // Elseif short circuit avoids expensive collision detection
                        this.isTouched = true;
                    }
                }
            });
            return block;
        };

        vanishes.push(vanish(800, 800, 800, 50));
        vanishes.push(vanish(400, 1100, 400, 50));
        vanishes.push(vanish(1600, 1100, 400, 50));
        for (const vanishBlock of vanishes) Composite.add(engine.world, vanishBlock);
        spawn.bodyRect(1700, 812, 300, 25, 1, {
            collisionFilter: {
                category: cat.body,
                mask: cat.player | cat.body | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet | cat.map
            },
            isNoSetCollision: true,
            isNotHoldable: true,
            isNonStick: true, //this keep sporangium from sticking
            restitution: 1,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            query() {
                Matter.Body.setAngularVelocity(this, 0);
                Matter.Body.applyForce(this, this.position, {
                    x: 0,
                    y: -(this.position.y - 812) * 0.002
                });
            }
        });
        const zigzag = body[body.length - 1];
        Matter.Body.applyForce(zigzag, zigzag.position, {
            x: 0.1,
            y: 0
        });
        var buttonWasDown = false;
        level.customTopLayer = () => {

        }
        level.custom = () => {
            rightSchwoof.isUp = false;
            level.exit.drawAndCheck();
            leftSchwoof.query();
            level.enter.draw();
            pathPoints[0][0] = m.pos.x;
            pathPoints[0][1] = m.pos.y;
            leftElevator.move();
            rightElevator.move();
            slime.query();
            zigzag.query();
            slime.levelRise(0.2);
            for (var i = 0; i < vanishes.length; i++) {
                vanishes[i].query();
            }
            if (!rightSchwoofState) {
                var math = m.pos.y < leftRotor.position.y;
                Matter.Body.setAngularVelocity(leftRotor, (math ? 1 : -1) * Math.PI / 45);
            }
            if (rightSchwoofLive) {
                rightSchwoof.query();
                rightSchwoof.draw();
                if (rightSchwoofState) {
                    ctx.fillStyle = "lightgreen";
                }
                else {
                    ctx.fillStyle = "red";
                }
                ctx.beginPath();
                ctx.arc(2615, -220, 40, 0, Math.PI * 2);
                ctx.fill();
            }
            if (rightSchwoof.isUp) {
                buttonWasDown = true;
            }
            else if (buttonWasDown) {
                buttonWasDown = false;
                rightSchwoofState = !rightSchwoofState;
            }
            if (Matter.Query.collides(player, smoofes).length) {
                Matter.Body.applyForce(player, player.position, {
                    x: 0,
                    y: -0.015
                });
            }
        };

        mobs.spawn(500, -500, 10, 100, "yellow"); /* TacticalBoss
            Modes:
                Spawn:
                    Pathfinds to a point above M and starts dropping mobs. Learns which mobs to drop to cause the most damage, of course.
                    Occasionally strikes at M.
                Hide:
                    Pathfinds to the point furthest from M
                Strike:
                    Pathfind really, really fast to M
                Recharge:
                    Stop moving for a bit to "recharge" (this is so the player has a chance to hit it)

            It must always Hide or Recharge after Spawning or Striking. Which one it does is based on some factor I'll figure out.
            Pathfinding is a hypersimplified algorithm with hard-coded "points" that it can travel between. M is one of these.
        */
        var boss = mob[mob.length - 1];
        boss.isBoss = true;
        boss.damageReduction = 0.2
        boss.onDeath = function () {
            powerUps.spawnBossPowerUp(this.position.x, this.position.y);
            level.exit.x = 2560;
            level.exit.y = -90;
            rightSchwoofLive = false;
        };
        var spawnables = {};
        ["hopper", "stabber", "springer", "striker", "sneaker", "grower"].forEach((m) => { /* Used to be spawn.fullPickList, but some of those mobs don't do collision-only damage and would thus never be properly selected for */
            if (spawn[m]) {
                spawnables[m] = {
                    fun: spawn[m],
                    name: m,
                    weight: 1
                }
            }
        });
        boss.stabCycle = 0;
        boss.spawnCycle = 0;
        function spawny() {
            var totalWeight = 0;
            Object.keys(spawnables).forEach(key => {
                totalWeight += spawnables[key].weight;
            });
            var cursorWeight = 0;
            var choice = Math.random();
            var mC = undefined;
            Object.values(spawnables).forEach((thing) => {
                var lower = cursorWeight / totalWeight;
                cursorWeight += thing.weight;
                var upper = cursorWeight / totalWeight;
                if ((choice > lower && choice <= upper) || !mC) {
                    mC = thing;
                }
            });
            mC.fun(boss.position.x, boss.position.y);
            var sp = mob[mob.length - 1];
            sp.typeName = mC.name;
            sp.onHit = () => {
                spawnables[sp.typeName].weight += 1;
            };
            var oldFun = sp.onDeath;
            sp.onDeath = () => { /* Mobs that die are worth less */
                oldFun.call(sp);
                spawnables[sp.typeName].weight -= 0.3; /* But not too much less */
            };
        }
        boss.spawnDelay = 40;
        boss.mode = "hide";
        boss.modeSwitch = -1; // Randomize mode immediately
        boss.damageReduction = 0.1;
        var oldOnHit = boss.onHit;
        boss.onHit = () => {
            boss.modeSwitch = -1; // After striking the player, always switch modes
            oldOnHit.call(boss);  //this is the line that is bugging <-----
        };
        boss.do = () => {
            path = undefined;
            var pfGoal = [0, 0];
            boss.modeSwitch--;
            if (boss.modeSwitch < 0) {
                if (!boss.isShielded) {
                    spawn.shield(boss, boss.position.x, boss.position.y, 0.75); // Every time the mode switches, have a 75% chance to gain a new shield
                }
                if (boss.mode == "hide" || boss.mode == "recharge") {
                    if (Math.random() > 0.5) {
                        boss.mode = "spawn";
                    }
                    else {
                        boss.mode = "strike";
                    }
                    boss.modeSwitch = 600;
                }
                else {
                    if (boss.mode == "strike") {
                        boss.mode = "hide"; // Always hides after striking
                    }
                    else {
                        if (Math.random() > 0.5) {
                            boss.mode = "hide";
                        }
                        else {
                            boss.mode = "recharge"; // same when it goes into recharge mode
                            spawn.shield(boss, boss.position.x, boss.position.y, 1);
                        }
                    }
                    boss.modeSwitch = 200;
                }
            }
            if (boss.mode == "hide") { /* Find the furthest point from M and get to it */
                var longest = 0;
                pathPoints.forEach(item => {
                    if (item[0] == 1150) {
                        return;
                    }
                    var iL = pythag(item, [m.pos.x, m.pos.y]);
                    if (iL > longest) {
                        longest = iL;
                        pfGoal = item;
                    }
                });
            }
            else if (boss.mode == "strike") {
                pfGoal = pathPoints[0]; // Target M
            }
            else if (boss.mode == "spawn") {
                pfGoal = pathPoints[4]; // Go to Home Base to spawn
            }
            if (boss.mode != "recharge") {
                if (m.pos.x > 2350 || m.pos.x < -150 || m.pos.y > 50) {
                    boss.mode = "hide";
                }
                pathFind(pfGoal, [boss.position.x, boss.position.y]);
                if (!path) {
                    return; // If it couldn't pathfind, just drift
                }
                var goalX = path[0][0];
                var goalY = path[0][1];

                var dX = goalX - boss.position.x;
                var dY = goalY - boss.position.y;
                var hyp = Math.sqrt(dX * dX + dY * dY);
                Matter.Body.applyForce(boss, {
                    x: goalX,
                    y: goalY
                }, {
                    x: dX / hyp * 0.04 * (boss.mode == "strike" ? 2 : 1),
                    y: dY / hyp * 0.04 * (boss.mode == "strike" ? 2 : 1)// - 0.005
                });
            }
            if (boss.mode == "spawn") {
                boss.stabCycle++;
                if (boss.stabCycle > 25) {
                    if (Math.abs(dX) < 200 && dY > 0) {
                        Matter.Body.applyForce(boss, {
                            x: player.position.x,
                            y: player.position.y
                        }, {
                            x: 0,
                            y: 5
                        });
                    }
                    boss.stabCycle = 0;
                }
                boss.spawnCycle++;
                if (boss.spawnCycle > boss.spawnDelay) {
                    spawny();
                    boss.spawnDelay += 4;
                    boss.spawnCycle = 0;
                }
            }
        };
        boss.showHealthBar = true;
        powerUps.addResearchToLevel() //needs to run after mobs are spawned
    },
    arena() {
        simulation.inGameConsole(`<strong>arena</strong> by <span class='color-var'>Whyisthisnotavalable</span>`)
        let genisis, genisisJumpSensor, genisisBody, genisisHead, genisisHeadSensor, genisisBodySensor;
        let control = { left: false, right: false, up: false, down: false };
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
            look() { }, //set to lookDefault()
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
            draw() { },
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

                                    const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
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
                descriptionFunction() { return `swing a <b>sword</b> that <b style="color: indigo;">lifesteals</b> <strong class='color-h'>health</strong><br>drains <strong class='color-h'>health</strong> instead of ammunition<br>doesn't use <b>ammo</b>` },
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
                fire() { },
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
                            ({ sword: this.sword, bladeSegments: this.bladeSegments } = this.createAndSwingSword());
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
                                    pointB: { x: -9, y: ((handle.position.y - this.sword.position.y)) },
                                    stiffness: (tech.infinityEdge ? 0.05 : 0.1),
                                    damping: 0.001815,
                                    length: 0,

                                });
                                Composite.add(engine.world, this.constraint);
                            } else if (!this.constraint) {
                                this.constraint = Constraint.create({
                                    pointA: player.position,
                                    bodyB: this.sword,
                                    pointB: { x: 9, y: ((handle.position.y - this.sword.position.y)) },
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
                    bullet[bullet.length - 1].do = () => { };
                    const pommelWidth = 30;
                    const pommelHeight = 40;
                    const pommelVertices = [
                        { x: x, y: y + handleHeight / 2 + pommelHeight / 2 },
                        { x: x + pommelWidth / 2, y: y + handleHeight / 2 },
                        { x: x, y: y + handleHeight / 2 - pommelHeight / 2 },
                        { x: x - pommelWidth / 2, y: y + handleHeight / 2 },
                    ];
                    const pommel = Bodies.fromVertices(x, y + handleHeight / 2, pommelVertices, spawn.propsIsNotHoldable);
                    bullet[bullet.length] = pommel;
                    bullet[bullet.length - 1].do = () => { };
                    if (tech.soundSword) {
                        bullet[bullet.length - 1].draw = () => { };
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

                            const vertices = [
                                { x: bladeX, y: bladeY - bladeHeight / 2 },
                                { x: bladeX + bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                                { x: bladeX - bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                                { x: bladeX, y: bladeY - bladeHeight / 2 + 10 },
                            ];

                            const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
                            bullet[bullet.length] = blade;
                            bullet[bullet.length - 1].do = () => { };
                            if (tech.soundSword) {
                                bullet[bullet.length - 1].draw = () => { };
                            }
                            Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 270) * 15));
                            bladeSegments.push(blade);
                        }
                    } else {
                        for (let i = 0; i < numBlades; i++) {
                            const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
                            const mirroredBladeX = x - i * (bladeWidth / 20);
                            const mirroredBladeY = y - handleHeight / 2 - i * (bladeHeight / 4.5) * extensionFactor;
                            const mirroredVertices = [
                                { x: mirroredBladeX, y: mirroredBladeY - bladeHeight / 2 },
                                { x: mirroredBladeX + bladeWidth / 2, y: mirroredBladeY + bladeHeight / 2 },
                                { x: mirroredBladeX - bladeWidth / 2, y: mirroredBladeY + bladeHeight / 2 },
                                { x: mirroredBladeX, y: mirroredBladeY - bladeHeight / 2 + 10 },
                            ];
                            const mirroredBlade = Bodies.fromVertices(mirroredBladeX, mirroredBladeY, mirroredVertices, spawn.propsIsNotHoldable);
                            bullet[bullet.length] = mirroredBlade;
                            bullet[bullet.length - 1].do = () => { };
                            if (tech.soundSword) {
                                bullet[bullet.length - 1].draw = () => { };
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
                    Matter.Body.setPosition(sword, { x, y });

                    sword.collisionFilter.category = cat.bullet;
                    sword.collisionFilter.mask = cat.mobBullet | cat.powerup | cat.mob;
                    Body.scale(sword, -1, 1, { x, y });

                    return { sword, bladeSegments };
                },
                renderDefault() {
                    if (this.sword) {
                        for (let i = 0; i < this.bladeSegments.length; i++) {
                            const blade = this.bladeSegments[i];
                            const trail = this.bladeTrails[i] || [];
                            const vertices = blade.vertices.map(vertex => ({ x: vertex.x, y: vertex.y }));
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
        } else {/*
            simulation.inGameConsole(`Thank you for using my sword mod<br>I'll save you the trouble of killing genisis<br><div style="font-family: monospace;">g.<span style="color: crimson;">damage</span>(Infinity)</div>`);
            g.damage(Infinity);*/
        }
        simulation.inGameConsole(`<strong>ALSO</strong> made by <span class='color-var'>Richard0820</span>`);
        let index = 0;
        let index2 = 0;
        let { sword: sword, bladeSegments: bladeSegments } = createSword();
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
            Matter.Body.setPosition(sword, { x: -3950, y: -275 - (Math.sin(simulation.cycle / 100) * 50) });
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
                setTimeout(() => { simulation.inGameConsole(`If you want to keep this sword, visit <a href="https://github.com/Whyisthisnotavalable/n-scythe">https://github.com/Whyisthisnotavalable/n-scythe</a>. The sword is there.`) }, 1000)
            }
            for (let i = 0; i < bladeSegments.length; i++) {
                const blade = bladeSegments[i];
                const trail = bladeTrails[i] || [];
                const vertices = blade.vertices.map(vertex => ({ x: vertex.x, y: vertex.y }));
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
        level.customTopLayer = () => { };
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

                Events.on(engine, "collisionStart", function (event) {
                    g.genisisOnGroundCheck(event);
                    GenisisCollisionChecks(event);
                });
                Events.on(engine, "collisionActive", function (event) {
                    g.genisisOnGroundCheck(event);
                });
                Events.on(engine, "collisionEnd", function (event) {
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
                            ({ scythe: this.scythe, bladeSegments: this.bladeSegments } = this.createAndSwingScythe());
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
                            const vertices = blade.vertices.map(vertex => ({ x: vertex.x, y: vertex.y }));
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
                bullet[bullet.length - 1].do = () => { };
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

                        const vertices = [
                            { x: bladeX, y: bladeY - bladeHeight / 2 },
                            { x: bladeX + bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX - bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX, y: bladeY - bladeHeight / 2 + 10 },
                        ];

                        const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
                        bullet[bullet.length] = blade;
                        bullet[bullet.length - 1].do = () => { };
                        Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5));
                        bladeSegments.push(blade);
                    }
                } else {
                    for (let i = 0; i < numBlades; i++) {
                        const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
                        const bladeX = x - handleWidth / 2 + i * (bladeWidth / 2) - extensionFactorFraction * (bladeWidth / 2);
                        const bladeY = y + handleHeight / 2 - i * (bladeHeight / (3 ** i));

                        const vertices = [
                            { x: bladeX, y: bladeY - bladeHeight / 2 },
                            { x: bladeX + bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX - bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX, y: bladeY - bladeHeight / 2 + 10 },
                        ];

                        const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
                        bullet[bullet.length] = blade;
                        bullet[bullet.length - 1].do = () => { };
                        Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5));
                        bladeSegments.push(blade);
                    }

                    for (let i = 0; i < numBlades; i++) {
                        const extensionFactorFraction = (i / (numBlades - 1)) * extensionFactor;
                        const bladeX = x + handleWidth / 2 - i * (bladeWidth / 2) + extensionFactorFraction * (bladeWidth / 2);
                        const bladeY = y - handleHeight / 2 - i * (bladeHeight / (3 ** i));

                        const vertices = [
                            { x: bladeX, y: bladeY - bladeHeight / 2 },
                            { x: bladeX + bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX - bladeWidth / 2, y: bladeY + bladeHeight / 2 },
                            { x: bladeX, y: bladeY - bladeHeight / 2 + 10 },
                        ];

                        const blade = Bodies.fromVertices(bladeX, bladeY, vertices, spawn.propsIsNotHoldable);
                        bullet[bullet.length] = blade;
                        bullet[bullet.length - 1].do = () => { };
                        Matter.Body.rotate(blade, -Math.sin(i * (Math.PI / 180) * 5) + Math.PI);
                        bladeSegments.push(blade);
                    }
                }
                const scythe = Body.create({
                    parts: [handle, ...bladeSegments],
                });
                Composite.add(engine.world, scythe);
                Matter.Body.setPosition(scythe, { x, y });

                scythe.collisionFilter.category = cat.body;
                scythe.collisionFilter.mask = cat.mobBullet | cat.player;
                if (!evo.isMeleeScythe) {
                    setTimeout(() => {
                        scythe.collisionFilter.mask = cat.mobBullet | cat.mob | cat.player;
                    }, 1000)
                }
                if ((angle > -Math.PI / 2 && angle < Math.PI / 2)) {
                    Body.scale(scythe, -1, 1, { x, y });
                }

                scythe.frictionAir -= 0.01;

                return { scythe, bladeSegments };
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
            bullet[bullet.length - 1].do = () => { };
            const pommelWidth = 30;
            const pommelHeight = 40;
            const pommelVertices = [
                { x: x, y: y + handleHeight / 2 + pommelHeight / 2 },
                { x: x + pommelWidth / 2, y: y + handleHeight / 2 },
                { x: x, y: y + handleHeight / 2 - pommelHeight / 2 },
                { x: x - pommelWidth / 2, y: y + handleHeight / 2 },
            ];
            const pommel = Bodies.fromVertices(x, y + handleHeight / 2, pommelVertices, spawn.propsIsNotHoldable);
            bullet[bullet.length] = pommel;
            bullet[bullet.length - 1].do = () => { };
            if (tech.soundSword) {
                bullet[bullet.length - 1].draw = () => { };
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
                const mirroredVertices = [
                    { x: mirroredBladeX, y: mirroredBladeY - bladeHeight / 2 },
                    { x: mirroredBladeX + bladeWidth / 2, y: mirroredBladeY + bladeHeight / 2 },
                    { x: mirroredBladeX - bladeWidth / 2, y: mirroredBladeY + bladeHeight / 2 },
                    { x: mirroredBladeX, y: mirroredBladeY - bladeHeight / 2 + 10 },
                ];
                const mirroredBlade = Bodies.fromVertices(mirroredBladeX, mirroredBladeY, mirroredVertices, spawn.propsIsNotHoldable);
                bullet[bullet.length] = mirroredBlade;
                bullet[bullet.length - 1].do = () => { };
                if (tech.soundSword) {
                    bullet[bullet.length - 1].draw = () => { };
                }
                Matter.Body.rotate(mirroredBlade, Math.sin(i * (Math.PI / 270) * 15));
                bladeSegments.push(mirroredBlade);
            }
            bladeSegments.push(pommel);
            const sword = Body.create({
                parts: [handle, ...bladeSegments],
            });

            Composite.add(engine.world, sword);
            Matter.Body.setPosition(sword, { x, y });

            sword.collisionFilter.category = cat.bullet;
            sword.collisionFilter.mask = cat.mobBullet | cat.powerup | cat.mob;
            Body.scale(sword, -1, 1, { x, y });
            Body.rotate(sword, Math.PI + Math.PI / 15)

            return { sword, bladeSegments };
        }
    },
    flappyGon() { //community map by digin
        level.announceMobTypes();
        simulation.inGameConsole(`<strong>flappy n-gon</strong> by <span style="font-weight: bold;color: purple;">Digin</span>`);
        setTimeout(() => { simulation.inGameConsole("<b>gravity</b> is a <b>choice</b>"); }, 1000);
        setTimeout(() => { simulation.inGameConsole("everyone will fly"); }, 2000);
        setTimeout(() => { simulation.inGameConsole("<b>jump from the post and find out</b>"); }, 3000);
        level.setPosToSpawn(0, -50); //normal spawn
        level.exit.x = 8600;
        level.exit.y = -1100;
        level.defaultZoom = 1800;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#55FF55";

        var slimey = level.hazard(-200, -10, 9000, 10);

        // allow "flight"

        const old_playerOffGroundCheck = playerOffGroundCheck;

        playerOffGroundCheck = (event) => {
            old_playerOffGroundCheck(event);
            if (player.position.y < -300) {
                m.onGround = true;
            }
        };

        const oldNextLevel = level.nextLevel;
        level.nextLevel = () => { // clear the flappy effects, because apparently there's no established api for this
            playerOffGroundCheck = old_playerOffGroundCheck;

            level.nextLevel = oldNextLevel;
            oldNextLevel();
        };

        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); // standard bumps
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20);
        spawn.mapRect(level.exit.x - 100, level.exit.y + 40, 200, 100);

        // room basis
        spawn.mapRect(-200, 0, 9000, 100);
        spawn.mapRect(-200, -1500, 9000, 100);
        spawn.mapRect(-200, -1500, 100, 1500);
        spawn.mapRect(8700, -1500, 100, 1500);

        // somewhat randomized flappy pylons
        const pylon = 1500; // height of the entire pylon assembly
        for (var i = 0; i < 10; i++) {
            var xbasis = 700 + i * 750;
            var window = 300 + (10 - i) * 50;
            var toph = pylon - window - 400 + (Math.random() - 0.5) * 400 - i * 50;
            if (i == 0) { // on the first one, the lower pile will always have a height of 300
                toph = pylon - window - 300;
            }
            spawn.mapRect(xbasis, -1500, 100, toph);
            spawn.mapRect(xbasis, toph + window - pylon, 100, pylon - toph - window);
            if (i < 9) {
                spawn.randomMob(xbasis + 300, Math.random() * -1400);
            }
            else {
                spawn.randomLevelBoss(xbasis + 300, Math.random() * -1400);
            }
            if (i == 5) {
                spawn.secondaryBossChance(xbasis + 300, Math.random() * -1400);
            }
        }

        level.custom = () => {
            level.exit.drawAndCheck();
            player.onGround = true;
            level.enter.draw();
        };
        const slimeRise = 0.15;
        level.customTopLayer = () => {
            slimey.height += slimeRise;
            slimey.min.y -= slimeRise;
            slimey.query();
        };
        powerUps.addResearchToLevel();
    },
    rings() {
        level.announceMobTypes();
        simulation.inGameConsole(`<strong>rings</strong> by <span style="font-weight: bold;color: purple;">ThatLittleFrog</span>`);
        setTimeout(() => {
            simulation.inGameConsole("<b>go up</b>");
        }, 2000);
        level.setPosToSpawn(0, -2000); // spawn high up so you can go to the bottom of the lowest ring without tripping the too-low reset
        level.exit.x = 0;
        level.exit.y = -6400;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#d8dadf";

        function mkrect(x, y, w, h) {
            let who = body[body.length] = Bodies.rectangle(x, y, w, h, {
                collisionFilter: {
                    category: cat.map,
                    mask: cat.body | cat.player | cat.bullet | cat.powerUp | cat.mob | cat.mobBullet
                },
                inertia: Infinity, //prevents rotation
                isNotHoldable: true,
                friction: 1,
                frictionStatic: 1,
                restitution: 0,
                frictionAir: 1,
                isStatic: true
            });
            Composite.add(engine.world, who);
            who.classType = "body";
            return body[body.length - 1];
        }

        function makeRing(x, y, linegth, thicc = 200) { // I don't feel like doing trigonometry, so linegth is slightly different from the radius
            var _shape = [undefined, undefined, undefined, undefined];
            _shape[0] = mkrect(x - linegth / 2 - thicc, y - linegth / 2 - thicc, linegth, thicc);
            _shape[1] = mkrect(x - linegth / 2 - thicc, y - linegth / 2, thicc, linegth);
            _shape[2] = mkrect(x - linegth / 2, y + linegth / 2 - thicc, linegth, thicc);
            _shape[3] = mkrect(x + linegth / 2 - thicc, y - linegth / 2 - thicc, thicc, linegth - thicc * 2);
            let ret = {
                shape: _shape,
                x: x,
                y: y,
                r: 0,
                rot(ang) {
                    this.r = ang;
                    let offs = 0;
                    for (let shape of this.shape) {
                        offs += Math.PI / 2;
                        Matter.Body.setAngle(shape, ang);
                        if (shape == this.shape[3]) {
                            Matter.Body.setPosition(shape, {
                                x: this.x + Math.cos(ang + offs) * (linegth / 2 - thicc / 2) - Math.cos(ang + offs + Math.PI / 2) * thicc,
                                y: this.y + Math.sin(ang + offs) * (linegth / 2 - thicc / 2) - Math.sin(ang + offs + Math.PI / 2) * thicc
                            });
                        }
                        else {
                            Matter.Body.setPosition(shape, {
                                x: this.x + Math.cos(ang + offs) * (linegth / 2 - thicc / 2),
                                y: this.y + Math.sin(ang + offs) * (linegth / 2 - thicc / 2)
                            });
                        }
                    }
                },
                rotBy(ang) {
                    this.rot(this.r + ang);
                }
            };
            ret.rot(0);
            return ret;
        }

        var inner = makeRing(level.enter.x, level.enter.y, 1000);
        var mid = makeRing(level.enter.x, level.enter.y, 2500);
        var mid2 = makeRing(level.enter.x, level.enter.y, 4000);
        var out = makeRing(level.enter.x, level.enter.y, 6000);

        spawn.randomMob(level.enter.x + 250, level.enter.y);

        spawn.randomMob(level.enter.x + 1250, level.enter.y);
        spawn.randomMob(level.enter.x - 1250, level.enter.y);
        spawn.randomMob(level.enter.x, level.enter.y + 1250);
        spawn.randomMob(level.enter.x, level.enter.y - 1250);
        spawn.randomMob(level.enter.x + 1250, level.enter.y + 500);
        spawn.randomMob(level.enter.x - 1250, level.enter.y + 500);
        spawn.randomMob(level.enter.x + 500, level.enter.y + 1250);
        spawn.randomMob(level.enter.x + 500, level.enter.y - 1250);

        spawn.randomMob(level.enter.x + 2750, level.enter.y);
        spawn.randomMob(level.enter.x - 2750, level.enter.y);
        spawn.randomMob(level.enter.x, level.enter.y + 2750);
        spawn.randomMob(level.enter.x, level.enter.y - 2750);
        spawn.randomMob(level.enter.x + 2750, level.enter.y + 500);
        spawn.randomMob(level.enter.x - 2750, level.enter.y + 500);
        spawn.randomMob(level.enter.x + 500, level.enter.y + 2750);
        spawn.randomMob(level.enter.x + 500, level.enter.y - 2750);

        spawn.randomLevelBoss(level.enter.x, level.enter.y - 4250);
        spawn.secondaryBossChance(level.enter.x, level.enter.y + 4250);

        level.custom = () => {
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            inner.rotBy(0.01);
            mid.rotBy(-0.005);
            mid2.rotBy(0.003);
            out.rotBy(-0.002);
        };

        powerUps.addResearchToLevel();
    },
    trial() { // trial, collab between Cirryn and Tarantula Hawk
        simulation.inGameConsole(`<strong>trial</strong> by <span class='color-var'>Cirryn and Tarantula Hawk</span>`);
        level.setPosToSpawn(0, -50);
        level.exit.x = 4150;
        level.exit.y = -30;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800;
        simulation.zoomTransition(level.defaultZoom);
        document.body.style.backgroundColor = "#d8dadf";
        const button = level.button(2000, 0);
        const door = level.door(3930, -300, 40, 300, 300, 10);
        door.isClosing = false;
        var didTrialBegin = false;

        const customMob = {
            assassin(x, y) { // modified slasher
                mobs.spawn(x, y, 3, 30, "black");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.0008 * simulation.accelScale;
                me.torqueMagnitude = 0.00002 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
                me.frictionStatic = 0;
                me.frictionAir = 0.08;
                me.delay = 120 * simulation.CDScale;
                me.cd = 0;
                spawn.shield(me, x, y);
                me.damageReduction = 0;
                const start = window.performance.now(); // they only last ~ten seconds
                const lifespan = 15000 + 700 * (Math.random() - 0.5);
                me.onDamage = function () {
                    Matter.Body.setAngularVelocity(me, me.angularVelocity + 1);
                };
                me.do = function () {
                    this.checkStatus();
                    this.alwaysSeePlayer();
                    this.attraction();
                    this.health = 1 - (window.performance.now() - start) / lifespan;
                    if (this.health < 0) {
                        this.death();
                    }
                    Matter.Body.setAngularVelocity(me, me.angularVelocity + 0.05);
                };
            },
            mercenary(x, y) { // fast boi
                mobs.spawn(x, y, 3, 60, "white");
                let me = mob[mob.length - 1];
                Matter.Body.rotate(me, 2 * Math.PI * Math.random());
                me.accelMag = 0.001 * simulation.accelScale;
                me.torqueMagnitude = 0.00001 * me.inertia * (Math.random() > 0.5 ? -1 : 1);
                me.frictionStatic = 0;
                me.frictionAir = 0.03;
                me.delay = 120 * simulation.CDScale;
                me.cd = 0;
                spawn.shield(me, x, y);
                me.damageReduction = 0;
                const start = window.performance.now(); // they only last ~ten seconds
                const lifespan = 25000 + 700 * (Math.random() - 0.5);
                me.onDamage = function () {
                    Matter.Body.setAngularVelocity(me, me.angularVelocity + 1);
                };
                me.do = function () {
                    this.checkStatus();
                    this.attraction();
                    this.health = 1 - (window.performance.now() - start) / lifespan;
                    if (this.health < 0) {
                        this.death();
                    }
                    this.alwaysSeePlayer();
                };
            }
            // eventually maybe add more custom mob types
        };

        function randomWave(count, source) { // generates a wave list from a source
            // checks in spawn first, then customMob, for the sources
            var ret = [];
            for (var i = 0; i < count; i++) {
                var pick = source[Math.floor(Math.random() * source.length)];
                if (spawn[pick]) {
                    ret.push(spawn[pick]);
                }
                else if (customMob[pick]) {
                    ret.push(customMob[pick]);
                }
            }
            return ret;
        }

        function wave(mobs) { // takes a list of functions that accept x,y coordinates to spawn a mob and spawns them in the ceiling
            for (var i = 0; i < mobs.length; i++) {
                var x = 1000 + 2400 * i / mobs.length + 200 * (Math.random() - 0.5);
                var y = -950 - 100 * Math.random();
                mobs[i](x, y);
            }
            const ammoCount = Math.random() * (10 - simulation.difficulty / 4);
            for (var i = 0; i < ammoCount; i++) {
                powerUps.spawn(3300, -1000, "ammo");
            }
        }

        level.custom = () => {
            door.openClose();
            level.exit.drawAndCheck();
            level.enter.draw();
        };
        level.customTopLayer = () => {
            button.query();
            button.draw();
            door.draw();
            if (!button.isUp && !didTrialBegin) {
                didTrialBegin = true;
                simulation.inGameConsole('<strong>The Trial has begun.</strong>');

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">first wave (domitable)</span>');
                    wave(randomWave(2 + simulation.difficulty * 0.1, spawn.fullPickList));
                }, 3000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">second wave (domitable)</span>');
                    wave(randomWave(2 + simulation.difficulty * 0.1, spawn.fullPickList));
                }, 13000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">third wave <strong>(indomitable)</strong></span>');
                    wave(randomWave(4, ["assassin"]));
                }, 23000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">fourth wave (domitable)</span>');
                    wave(randomWave(4 + simulation.difficulty / 2, spawn.fullPickList));
                }, 39000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">fifth wave (domitable)</span>');
                    wave(randomWave(4 + simulation.difficulty / 2, spawn.fullPickList));
                }, 49000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: purple;">sixth wave <strong>(indomitable)</strong></span>');
                    wave(randomWave(7, ["mercenary"]));
                }, 59000);

                setTimeout(() => {
                    simulation.inGameConsole('<span style="color: red;">seventh wave <strong>(boss)</strong></span>');
                    spawn.randomLevelBoss(700, -1000);
                    var mainBoss = mob[mob.length - 1];
                    mainBoss.oldOnDeath = mainBoss.onDeath;
                    mainBoss.onDeath = () => {
                        door.isClosing = false;
                        powerUps.spawn(4150, -30, "tech");
                        powerUps.spawn(4150, -30, "tech");
                        mainBoss.oldOnDeath();
                    }
                    spawn.secondaryBossChance(3500, -1000);
                }, 86000);

                door.isClosing = true;
            }
        };

        spawn.mapRect(-100, 0, 10000, 10000); // the left half of the room
        spawn.mapRect(-10000, -300, 9900, 10000);
        spawn.mapRect(-100, -300, 400, 100);
        spawn.mapRect(200, -800, 100, 500);
        spawn.mapRect(200, -800, 500, 100);
        spawn.mapRect(600, -1000, 100, 200);

        spawn.mapRect(600, -1100, 3000, 100); // the ceiling

        spawn.mapRect(3500, -1000, 100, 200); // the right half of the room
        spawn.mapRect(3500, -800, 500, 100);
        spawn.mapRect(3900, -800, 100, 500);
        spawn.mapRect(3900, -300, 400, 100);
        spawn.mapRect(4300, -300, 10000, 10000);

        for (var i = 0; i < 4; i++) { // "door" at the entrance
            spawn.bodyRect(200, -200 + i * 50, 20, 50);
        }

        for (var i = 0; i < 5; i++) { // some random rubble in the first half of the room
            spawn.bodyRect(400 + Math.random() * 1000, -200, 40 + Math.random() * 40, 40 + Math.random() * 40);
        }

        powerUps.addResearchToLevel(); //needs to run after mobs are spawneds
    },
    soft() {
        simulation.inGameConsole(`<img src="https://raw.githubusercontent.com/Whyisthisnotavalable/image-yy/main/Hotpot-removed.png" width="100" height="100" style="background-image: radial-gradient(circle, gray, black, transparent)">`);
        simulation.inGameConsole(`<strong>soft</strong> by <span class='color-var'>Richard0820</span>`);
        simulation.inGameConsole("<em>The lasers deal less damage the higher level you are</em>")
        const portals = [];
        portals.push(level.portal({
            x: -1525,
            y: -250
        }, Math.PI / 2, {
            x: 1100,
            y: -1025
        }, Math.PI / 2))
        const soft = {
            createCloth(x, y, radius, width, height, attachToPlayer = false, stayStill = false, options, touchPlayer = true, constrictionStrength = 0.001) {
                const bodies = [];
                const constraints = [];
                const otherCons = [];
                const bodyWidth = radius;
                const bodyHeight = radius;
                const numRows = Math.ceil(height / bodyHeight);
                const numCols = Math.ceil(width / bodyWidth);

                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        const posX = x + j * bodyWidth + bodyWidth / 2;
                        const posY = y + i * bodyHeight + bodyHeight / 2;

                        const rect = Matter.Bodies.circle(posX, posY, (bodyWidth + bodyHeight) / 4, options);
                        rect.collisionFilter.category = cat.body;
                        rect.collisionFilter.mask = (touchPlayer ? cat.player | cat.body | cat.bullet | cat.mob | cat.mobBullet : cat.body | cat.bullet | cat.mob | cat.mobBullet);
                        rect.classType = "body";

                        Composite.add(engine.world, rect);

                        bodies.push(rect);
                    }
                }

                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        const bodyIndexA = i * numCols + j;
                        if (j < numCols - 1) {
                            const bodyIndexB = i * numCols + (j + 1);
                            const constraint = Constraint.create({
                                bodyA: bodies[bodyIndexA],
                                bodyB: bodies[bodyIndexB],
                                stiffness: 0.06,
                                damping: 0.001
                            });
                            Composite.add(engine.world, constraint);
                            constraints.push(constraint);
                        }
                        if (i < numRows - 1) {
                            const bodyIndexB = (i + 1) * numCols + j;
                            const constraint = Constraint.create({
                                bodyA: bodies[bodyIndexA],
                                bodyB: bodies[bodyIndexB],
                                stiffness: 0.06,
                                damping: 0.001
                            });
                            Composite.add(engine.world, constraint);
                            constraints.push(constraint);
                        }
                    }
                }

                for (let i = 0; i < numRows - 1; i++) {
                    for (let j = 0; j < numCols - 1; j++) {
                        const bodyA = bodies[i * numCols + j];
                        const bodyB = bodies[(i + 1) * numCols + j + 1];
                        const constraint = Constraint.create({
                            bodyA: bodyA,
                            bodyB: bodyB,
                            stiffness: 0.02
                        });
                        constraints.push(constraint);
                    }
                }

                for (let i = 0; i < numRows - 1; i++) {
                    for (let j = 1; j < numCols; j++) {
                        const bodyA = bodies[i * numCols + j];
                        const bodyB = bodies[(i + 1) * numCols + j - 1];
                        const constraint = Constraint.create({
                            bodyA: bodyA,
                            bodyB: bodyB,
                            stiffness: 0.02
                        });
                        constraints.push(constraint);
                    }
                }
                if (stayStill) {
                    for (let i = 0; i < bodies.length; i++) {
                        const by = bodies[i];
                        const spawnX = by.position.x + bodyWidth / 2;
                        const spawnY = by.position.y + bodyHeight / 2;
                        const isLastColumn = (i + 1) % numCols === 0;
                        const isFirstColumn = i % numCols === 0;
                        const stiffness = constrictionStrength * (isLastColumn || isFirstColumn ? 100 : 1); // Apply extra stiffness to first and last columns

                        const cost = Constraint.create({
                            bodyA: by,
                            pointB: { x: spawnX, y: spawnY },
                            stiffness: stiffness,
                            length: 0
                        });

                        Composite.add(engine.world, cost);
                        otherCons.push(cost);
                    }
                }
                if (attachToPlayer) {
                    for (let i = 0; i < bodies.length; i++) {
                        const cost = Constraint.create({
                            bodyA: bodies[i],
                            pointB: player.position,
                            stiffness: 0.0005,
                            length: 0
                        });
                        Composite.add(engine.world, cost);
                    }
                }

                return { bodies, constraints, otherCons };
            },
            clothOptions: {
                frictionAir: 0.005,
            },
            isOuter(body, bodies) { //unused
                const neighbors = [
                    { x: body.position.x + 1, y: body.position.y },
                    { x: body.position.x - 1, y: body.position.y },
                    { x: body.position.x, y: body.position.y + 1 },
                    { x: body.position.x, y: body.position.y - 1 }
                ];

                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const isNeighbor = bodies.some(b => b.position.x === neighbor.x && b.position.y === neighbor.y);
                    if (!isNeighbor) {
                        return true;
                    }
                }
                return false;
            },
            draw(cloth) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(0,0,0,0.3)";
                ctx.fillStyle = "black";
                for (let i = 0, len = cloth.constraints.length; i < len; ++i) {
                    const constraint = cloth.constraints[i];
                    ctx.moveTo(constraint.bodyA.position.x, constraint.bodyA.position.y);
                    ctx.lineTo(constraint.bodyB.position.x, constraint.bodyB.position.y);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            },
            addGravity(bodies, magnitude) {
                for (var i = 0; i < bodies.length; i++) {
                    bodies[i].force.y += bodies[i].mass * magnitude;
                }
            },
            gravity(cloth) {
                this.addGravity(cloth.bodies, simulation.g);
            },
            breaker(cloth, percentage = 0.5) {
                const totalConstraints = cloth.constraints.length;
                const constraintsToRemove = Math.ceil(totalConstraints * percentage);

                for (let i = 0; i < constraintsToRemove; i++) {
                    const randomIndex = Math.floor(Math.random() * cloth.constraints.length);

                    let removedConstraint = cloth.constraints.splice(randomIndex, 1)[0];
                    Composite.remove(engine.world, removedConstraint);
                }
            },
            destroyer(cloth, percentage = 0.99999) {
                const otherCons = cloth.otherCons.length;
                const otherCons2Remove = Math.ceil(otherCons * percentage);

                for (let i = 0; i < otherCons2Remove; i++) {
                    const randomIndex = Math.floor(Math.random() * cloth.otherCons.length);

                    let removedConstraint = cloth.otherCons.splice(randomIndex, 1)[0];
                    Composite.remove(engine.world, removedConstraint);
                }
            },
            annihilate(cloth) {
                const totalBodies = cloth.bodies.length;
                for (let i = 0; i < totalBodies; i++) {
                    const removeBody = cloth.bodies[i];
                    Composite.remove(engine.world, removeBody);
                }
                cloth.bodies.length = 0; // Clear the bodies array after removal
            }
        }
        const clothArray = [];
        clothArray.push(soft.createCloth(-100, 0, 50, 1000, 300, false, true, soft.clothOptions, true))
        clothArray.push(soft.createCloth(-2000, 2375, 50, 1525, 200, false, true, soft.clothOptions, true))
        clothArray.push(soft.createCloth(-3950, 125, 50, 1800, 125, false, true, soft.clothOptions, true))
        const annoyingStuff = {
            lasers(where, angle) {
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
                    const dmg = 0.5 / spawn.dmgToPlayerByLevelsCleared();
                    m.takeDamage(dmg);
                    simulation.drawList.push({ //add dmg to draw queue
                        x: best.x,
                        y: best.y,
                        radius: dmg * 1500,
                        color: "rgba(80,0,255,0.5)",
                        time: 20
                    });
                }
                //draw beam
                if (best.dist2 === Infinity) best = look;
                ctx.moveTo(where.x, where.y);
                ctx.lineTo(best.x, best.y);
            },
            laserBoss(x, y, radius = 30) {
                mobs.spawn(x, y, 6, radius, "#f00");
                let me = mob[mob.length - 1];

                setTimeout(() => { //fix mob in place, but allow rotation
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
                }, 2000); //add in a delay in case the level gets flipped left right
                me.count = 0;
                me.frictionAir = 0.03;
                // me.torque -= me.inertia * 0.002
                spawn.spawnOrbitals(me, radius + 50 + 200 * Math.random())
                Matter.Body.setDensity(me, 0.03); //extra dense //normal is 0.001 //makes effective life much larger
                me.damageReduction = 0.25
                me.isBoss = true;
                // spawn.shield(me, x, y, 1);  //not working, not sure why
                me.onDeath = function () {
                    powerUps.spawnBossPowerUp(this.position.x, this.position.y)
                };
                me.rotateVelocity = -Math.min(0.0045, 0.0015 * simulation.accelScale * simulation.accelScale) * (level.levelsCleared > 8 ? 1 : -1)
                me.do = function () {
                    this.fill = '#' + Math.random().toString(16).substr(-6); //flash colors
                    this.checkStatus();

                    if (!this.isStunned) {
                        //check if slowed
                        let slowed = false
                        for (let i = 0; i < this.status.length; i++) {
                            if (this.status[i].type === "slow") {
                                slowed = true
                                break
                            }
                        }
                        if (!slowed) {
                            this.count++
                            Matter.Body.setAngle(this, this.count * this.rotateVelocity)
                            Matter.Body.setAngularVelocity(this, 0)
                        }

                        ctx.beginPath();
                        for (let i = 0; i < this.vertices.length; i++) {
                            if (Math.sin((2 * Math.PI * simulation.cycle) / (50 + i)) > 0) {
                                this.lasers(this.vertices[i], Math.atan2(this.vertices[i].y - this.position.y, this.vertices[i].x - this.position.x));
                            }
                        }
                        ctx.strokeStyle = "#50f";
                        ctx.lineWidth = 1.5;
                        ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
                        ctx.stroke(); // Draw it
                        ctx.setLineDash([]);
                        ctx.lineWidth = 20;
                        ctx.strokeStyle = "rgba(80,0,255,0.07)";
                        ctx.stroke(); // Draw it
                    }
                };
                me.lasers = function (where, angle) {
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
                        const dmg = 0.5 / spawn.dmgToPlayerByLevelsCleared();
                        m.takeDamage(dmg);
                        simulation.drawList.push({ //add dmg to draw queue
                            x: best.x,
                            y: best.y,
                            radius: dmg * 1500,
                            color: "rgba(80,0,255,0.5)",
                            time: 20
                        });
                    }
                    //draw beam
                    if (best.dist2 === Infinity) best = look;
                    ctx.moveTo(where.x, where.y);
                    ctx.lineTo(best.x, best.y);
                }
            }
        }
        level.setPosToSpawn(-350, 0);
        level.exit.x = 1075;
        level.exit.y = 20;
        spawn.mapRect(level.enter.x, level.enter.y + 20, 100, 20); //bump for level entrance
        spawn.mapRect(level.exit.x, level.exit.y + 20, 100, 20); //bump for level exit
        level.defaultZoom = 1800
        simulation.zoomTransition(level.defaultZoom)
        document.body.style.backgroundColor = "#aaFFFF55";
        spawn.mapRect(900, 50, 425, 250);
        // spawn.mapRect(900, -1050, 0.1, 1350);
        spawn.mapRect(-475, 2375, 1800, 250);
        spawn.mapRect(-4400, 2375, 2475, 250);
        spawn.mapRect(-4400, -450, 250, 3075);
        spawn.mapRect(-4400, -450, 2225, 250);
        spawn.mapRect(-2425, -1300, 250, 1100);
        spawn.mapRect(-2425, -1300, 3825, 250);
        spawn.mapRect(1325, -1300, 250, 3925);
        spawn.mapRect(-875, -1300, 250, 1375);
        spawn.mapRect(-725, 50, 675, 250);
        spawn.mapRect(-875, 175, 175, 125);
        for (let i = 0; i < 6; i++) {
            spawn.mapRect(-4175, 2000 - i * 375, 50, 125);
        }
        spawn.mapRect(-3925, 162.5, 50, 125);
        spawn.mapRect(-2175, 162.5, 50, 125);
        spawn.mapRect(300, 2025, 250, 600);
        spawn.mapRect(-2150, 175, 50, 25);
        spawn.mapRect(-2150, 250, 50, 25);
        spawn.mapRect(-900, 175, 50, 25);
        spawn.mapRect(-900, 250, 50, 25);
        spawn.mapRect(-1600, 175, 50, 25);
        spawn.mapRect(-1500, 175, 50, 25);
        spawn.mapRect(-1600, 250, 50, 25);
        spawn.mapRect(-1500, 250, 50, 25);
        spawn.mapRect(-1925, 175, 50, 25);
        spawn.mapRect(-1925, 250, 50, 25);
        spawn.mapRect(-1200, 175, 50, 25);
        spawn.mapRect(-1200, 250, 50, 25);
        spawn.bodyRect(-2125, 200, 1250, 50);
        spawn.debris(425, 200, 50);
        spawn.debris(-650, 2100, 50);
        spawn.debris(-3000, 1925, 50);
        spawn.debris(-3825, 1550, 50);
        spawn.debris(-2475, -50, 50);

        const bouncyBody = body[body.length - 1];
        bouncyBody.restitution = 0.9;
        spawn.mapVertex(-2175 + 1300 / 2, -1050 + 1225 / 2, "0 -400 -100 -300 -100 0 100 0 100 -300");

        spawn.mapVertex(-4150 + 1975 / 2, -200 + 2575 / 2, "0 -800 -200 -600 -200 0 0 200 200 0 200 -600 0 200");
        const mapWithVertex = map[map.length - 1];
        let index1 = 0;
        level.custom = () => {
            level.exit.drawAndCheck();

            level.enter.draw();

            if (player.position.x > 425 && index1 === 0) {
                soft.breaker(clothArray[0], 0.7);
                soft.destroyer(clothArray[0]);
                index1++;
            }
            if (player.position.y > 1300 && index1 === 1) {
                setTimeout(() => {
                    soft.breaker(clothArray[0], 1);
                    soft.annihilate(clothArray[0]);
                    clothArray.splice(0, 1);
                }, 1000); //prevents bugs
                simulation.inGameConsole("Couldn't be so simple, could it?", 2000 * Math.random());
                index1++;
            }
        };
        level.customTopLayer = () => {
            for (let i = 0; i < portals.length; i++) {
                portals[i][2].query();
                portals[i][3].query();
                portals[i][0].draw();
                portals[i][1].draw();
                portals[i][2].draw();
                portals[i][3].draw();
            }
            ctx.beginPath();
            if (Math.sin((2 * Math.PI * simulation.cycle) / (50)) > 0) {
                annoyingStuff.lasers(mapWithVertex.vertices[0], Math.atan2(mapWithVertex.vertices[0].y - mapWithVertex.position.y, mapWithVertex.vertices[0].x - mapWithVertex.position.x));
                annoyingStuff.lasers(mapWithVertex.vertices[3], Math.atan2(mapWithVertex.vertices[3].y - mapWithVertex.position.y, mapWithVertex.vertices[3].x - mapWithVertex.position.x));
            }
            if (Math.sin((2 * Math.PI * simulation.cycle) / (51)) > 0) {
                annoyingStuff.lasers(mapWithVertex.vertices[1], Math.atan2(mapWithVertex.vertices[1].y - mapWithVertex.position.y, mapWithVertex.vertices[1].x - mapWithVertex.position.x));
                annoyingStuff.lasers(mapWithVertex.vertices[4], Math.atan2(mapWithVertex.vertices[4].y - mapWithVertex.position.y, mapWithVertex.vertices[4].x - mapWithVertex.position.x));
            }
            if (Math.sin((2 * Math.PI * simulation.cycle) / (52)) > 0) {
                annoyingStuff.lasers(mapWithVertex.vertices[2], Math.atan2(mapWithVertex.vertices[2].y - mapWithVertex.position.y, mapWithVertex.vertices[2].x - mapWithVertex.position.x));
                annoyingStuff.lasers(mapWithVertex.vertices[5], Math.atan2(mapWithVertex.vertices[5].y - mapWithVertex.position.y, mapWithVertex.vertices[5].x - mapWithVertex.position.x));
            }

            ctx.strokeStyle = "#000";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([70 + 300 * Math.random(), 55 * Math.random()]);
            ctx.stroke(); // Draw it
            ctx.setLineDash([]);
            ctx.lineWidth = 20;
            ctx.strokeStyle = "rgba(0,0,0,0.07)";
            ctx.stroke(); // Draw it

            for (let i = 0; i < clothArray.length; i++) {
                soft.draw(clothArray[i]);
                soft.gravity(clothArray[i]);
            }

            ctx.beginPath();
            ctx.fillStyle = "rgba(69, 69, 69, 0.1)";
            ctx.rect(-475, 175, 425, 2300);
            ctx.rect(900, 175, 425, 2300);
            ctx.rect(-875, 175, 400, 10000);
            ctx.rect(-4200, -250, 2025, 2775);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = (m.pos.x < -725 && m.pos.y < 175) ? `rgba(68, 68, 68, ${Math.max(0.3, Math.min((-775 - m.pos.x) / 100, 0.99))})` : color.map;
            ctx.rect(-875, 50, 175, 150);
            ctx.fill();

        };
        annoyingStuff.laserBoss(-1525, 1025);
        spawn.pulsar(-1525, -850);
        spawn.pulsar(1125, 1600);
        spawn.pulsar(-250, 1600);
        spawn.pulsar(-1450, 1600);
        spawn.pulsar(-2950, 1750);
        spawn.pulsar(-3375, 1750);
        spawn.pulsar(-3825, 1300);
        spawn.pulsar(-3825, 850);
        spawn.pulsar(-3450, 50);
        spawn.pulsar(-2925, 50);
        spawn.pulsar(-1900, -400);
        spawn.pulsar(-1200, -400);

        powerUps.addResearchToLevel()
        powerUps.directSpawn(-775, 125, "tech");
        if (!level.isNextLevelPowerUps && powerUp[powerUp.length - 1]) powerUp[powerUp.length - 1].collisionFilter.mask = cat.map | cat.body | cat.powerUp
        spawn.bodyRect(-875, 75, 25, 100);
        let hardBody = body[body.length - 1];
        hardBody.collisionFilter.mask = cat.player | cat.map | cat.body | cat.bullet | cat.mob | cat.mobBullet | cat.powerUp
    },
}