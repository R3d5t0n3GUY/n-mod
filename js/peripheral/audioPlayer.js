setTimeout(() =>{
  fileLoads.isAudioPlayer = true; //for file handling in fileTester.js
}, 10);

const files = [
  {
    name: 'Death Prevented',
    src: 'SFX/DeathAvoid.ogg',
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'Explosion',
    src: null, /* ["SFX/Explosions/Explosion1.ogg", "SFX/Explosions/Explosion2.ogg", "SFX/Explosions/Explosion3.ogg",
      "SFX/Explosions/Explosion4.ogg"], */
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'Step',
    src: null, /* ["SFX/Footsteps/Footstep1.mp3", "SFX/Footsteps/Footstep2.mp3", "SFX/Footsteps/Footstep3.mp3", 
      "SFX/Footsteps/Footstep4.mp3", "SFX/Footsteps/Footstep5.mp3", "SFX/Footsteps/Footstep6.mp3"], */
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'Jump',
    src: null, /* ["SFX/Jumps/Jump1.mp3", "SFX/Jumps/Jump2.mp3", "SFX/Jumps/Jump3.mp3", "SFX/Jumps/Jump4.mp3"], */
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'NailGun',
    src: null, /* ["SFX/Nail Gun/NailGun1.ogg", "SFX/Nail Gun/NailGun2.ogg", "SFX/Nail Gun/NailGun3.ogg"], */
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'FallDamage',
    src: 'SFX/Joke/FallDamage.mp3',
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'Fire in the hole',
    src: 'SFX/Joke/fire.mp3',
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'Teleport',
    src: null, /* ['SFX/Teleports/Teleport1.mp3', 'SFX/Teleports/Teleport2.mp3'], */
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: 'finalBossDeath',
    src: "SFX/finalBossDeath.mp3",
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: "SpearUse",
    src: "SFX/Spear/SpearUse.ogg",
    playCDcycle: 0,
    loadAttempt: 0
  },
  {
    name: "SpearHit",
    src: null, /* ["SFX/Spear/SpearHit1.ogg", "SFX/Spear/SpearHit2.ogg", "SFX/Spear/SpearHit3.ogg"], */
    playCDcycle: 0,
    loadAttempt: 0
  }
];
const today = new Date(), currentMonth = today.getMonth(), currentDay = today.getDate();
let activeSoundCount = 0;
const maxSoundCount = 255;
const audioPlayer = {
  requestSound(name, sourcePosition = null, sourceRadius = 0) {
    try {
      for (let i = 0; i < files.length; i++) {
        if (files[i].name === name) {
          let listItem = files[i];
          let volume = null, sub = null, distance = null, maxDistance = null;
          if (sourcePosition === null){
            volume = 1;
            listItem.playCDcycle = 0; // Reset cooldown if no source position is provided
          } else {
            try {
              sub = Vector.sub(sourcePosition, m.pos);
              distance = Vector.magnitude(sub);
              maxDistance = 3000; // Adjust this value as needed
              if (distance <= sourceRadius) {
                volume = 1;
              } else {
                distance -= sourceRadius;
                volume = Math.max(0, 1 - (distance / maxDistance));
              }
            } catch (err) {
              console.warn("Error calculating sound volume:", err);
              volume = 1; // Fallback to full volume if there's an error
              listItem.playCDcycle = 0; // Reset cooldown if there's an error
            }
            if (name === 'FallDamage' || name === 'Fire in the hole' || name === 'Step' || name === 'Jump') { 
              volume = 0.5; // Fixed volume for these sounds, as they play at the player's position
            }
          }
          if (activeSoundCount < maxSoundCount && listItem.playCDcycle < m.cycle && volume >= 0.01)
          {
            if (currentMonth === 3 && currentDay === 1 &&
              ["Explosion", "Teleport"].includes(name)) { //Every April 1st
              if (name === "Explosion") {
                listItem.src = "SFX/Joke/ExplosionFools.mp3"
              } else if (name === "Teleport") {
                listItem.src = "SFX/Joke/Teleport3.mp3"
              }
            } else {
              if (name === 'Explosion') {
                listItem.src = `SFX/Explosions/Explosion${Math.ceil(Math.random() * 4)}.ogg`
              } else if (name === 'Step') {
                listItem.src = `SFX/Footsteps/Footstep${Math.ceil(Math.random() * 6)}.mp3`
              } else if (name === 'Jump') {
                listItem.src = `SFX/Jumps/Jump${Math.ceil(Math.random() * 4)}.mp3`
              } else if (name === "SpearHit") {
                listItem.src = `SFX/Spear/SpearHit${Math.ceil(Math.random() * 3)}.ogg`
              } else if (name === "nailGun") {
                listItem.src = `SFX/Nail Gun/nailGun${Math.ceil(Math.random() * 3)}.ogg`
                volume *= 0.5
              } else if (name === 'Teleport') {
                listItem.src = `SFX/Teleports/Teleport${Math.ceil(Math.random() * 2)}.mp3`
              }
            }
            try {
              //simulation.inGameConsole(listItem.src);
              let source = listItem.src
              if (Array.isArray(source)) source = source.flat()[Math.floor(Math.random() * source.length)] 
              let soundFile = new Audio(source);
              soundFile.load();
              //let soundDuration = soundFile.duration * 1000;
              if (soundFile.volume > 0.01) {
                soundFile.onended = function() {
                  activeSoundCount--;
                  soundFile.volume = 1;
                  /*simulation.inGameConsole(`<strong class='color-var'>Sound Count</strong>:
                  	${activeSoundCount}`);*/
                };
                listItem.playCDcycle = m.cycle + 3.75; // Cooldown period
                activeSoundCount++;
                /*simulation.inGameConsole(`<strong class='color-var'>Sound Count</strong>:
                	${activeSoundCount}`);*/
                soundFile.play();
                setTimeout(() => {
                  soundFile.volume = volume;
                }, 10);
              } else {
                listItem.playCDcycle = m.cycle;
              }
            } catch (error) {
              listItem.playCDcycle = 0; // Reset cooldown on error
              if (listItem.loadAttempt < 3){
                listItem.loadAttempt++;
                setTimeout(() => {
                  this.requestSound(name, sourcePosition);
                }, 1000);
                break;
              } else {
                listItem.playCDcycle = m.cycle;
                simulation.inGameConsole(`<span style='color:red;'<strong>Uncaught ${error.name} playing sound file:</strong>
                                    <br>${error.message}`)
                console.error("ERROR PLAYING SOUND FILE: ", error);
              }
            }
            break;
          }
        }
      }
    } catch (err) {
      simulation.inGameConsole(`<span style='color:red;'<strong>Uncaught ${err.name} requesting audio:</strong>
      	<br>${err.message}</strong></span>`);
    }
  }
};