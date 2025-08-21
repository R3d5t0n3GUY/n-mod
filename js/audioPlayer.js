const files = [
    {
        name: 'Death Prevented',
        src: 'SFX/DeathAvoid.ogg',
        playCDcycle: m.cycle,
        loadAttempt: 0
    },
    {
        name: 'Explosion',
        src: null,
        playCDcycle: m.cycle,
        loadAttempt: 0
    },
    {
        name: 'Step',
        src: null,
        playCDcycle: m.cycle,
        loadAttempt: 0
    },
    {
        name: 'FallDamage',
        src: 'SFX/FallDamage.mp3',
        playCDcycle: m.cycle,
        loadAttempt: 0
    },
    {
        name: 'Fire in the hole',
        src: 'SFX/fire.mp3',
        playCDcycle: m.cycle,
        loadAttempt: 0
    },
];
let activeSoundCount = 0;
const maxSoundCount = 4095;
const audioPlayer = {
    requestSound(name, sourcePosition = null) {
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
                            volume = Math.max(0, 1 - (distance / maxDistance));
                            
                            /*
                            simulation.inGameConsole(`<span class='color-var'>Volume</span> <span class='color-symbol'>=</span> 
                                <span class='color-symbol'>=</span> ${soundFile.volume.toFixed(5)}</span>`);
                            */
                        } catch (err) {
                            /*
                            simulation.inGameConsole(`<span style='color:red;'<strong>ERROR CALCULATING VOLUME:</strong>
                                <br>${err}`)
                            */
                            console.error("Error calculating sound volume:", err);
                            volume = 1; // Fallback to full volume if there's an error
                            listItem.playCDcycle = 0; // Reset cooldown if there's an error
                        }
                        if (name === 'FallDamage' || name === 'Fire in the hole' || name === 'Step'){ 
                            volume = 0.1; // Fixed volume for these sounds, as they play at the player's position
                        }
                    }
                    if (activeSoundCount < maxSoundCount && listItem.playCDcycle < m.cycle && distance !== null &&
                        maxDistance !== null && distance < maxDistance)
                    {
                        if (name === 'Explosion') {
                            let explodeSounds = ['SFX/Explosion1.ogg', 'SFX/Explosion2.ogg',
                                'SFX/Explosion3.ogg', 'SFX/Explosion4.ogg'
                            ], soundIDX = Math.floor(Math.random() * explodeSounds.length);
                            listItem.src = explodeSounds[soundIDX];
                        } else if (name === 'Step') {
                            let stepSounds = ['SFX/Footstep1.mp3', 'SFX/Footstep2.mp3', 'SFX/Footstep3.mp3',
                                'SFX/Footstep4.mp3', 'SFX/Footstep5.mp3', 'SFX/Footstep6.mp3'
                            ], soundIDX = Math.floor(Math.random() * stepSounds.length);
                            listItem.src = stepSounds[soundIDX];
                        }
                        try {
                            //simulation.inGameConsole(listItem.src);
                            let soundFile = new Audio(listItem.src);
                            soundFile.load();
                            let soundDuration = soundFile.duration * 1000;
                            if (distance < maxDistance) {
                                if (soundFile.volume > 0.01) {
                                    setTimeout(() => {
                                        activeSoundCount--;
                                        soundFile.volume = 1;
                                    }, soundDuration);
                                    listItem.playCDcycle = m.cycle + 3.75; // Cooldown period of 7.5 cycles (60 cycles = 1 second)
                                    activeSoundCount++;
                                    soundFile.play();
                                    setTimeout(() => {
                                        soundFile.volume = volume;
                                    }, 10);
                                }
                            } else {
                                listItem.playCDcycle = m.cycle;
                            }
                        } catch (error) {
                            listItem.playCDcycle = 0; // Reset cooldown on error
                            if (listItem.loadAttempt < 3){
                                listItem.loadAttempt++;
                                setTimeout(() => {
                                    this.requestSound(name);
                                }, 1000);
                                break;
                            } else {
                                listItem.playCDcycle = m.cycle;
                                simulation.inGameConsole(`<span style='color:red;'<strong>ERROR PLAYING SOUND FILE:</strong>
                                    <br>${error}`)
                                console.error("ERROR PLAYING SOUND FILE: ", error);
                            }
                        }
                        break;
                    }
                }
            }
        } catch (err) {
            simulation.inGameConsole(`<span style='color:red;'<strong>ERROR REQUESTING AUDIO:</strong>
                 <br>${err}</strong></span>`);
        }
    }
};