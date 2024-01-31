/*
Haojia Deng
RocketPatrol-enhenced
The approximate time:
Mods I chose: 
Track a high score that persists across scenes and display it in the UI (1)
Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
Implement the speed increase that happens after 30 seconds in the original game (1)
Create a new scrolling tile sprite for the background (1)
Create 4 new explosion sound effects and randomize which one plays on impact (3)
Display the time remaining (in seconds) on the screen (3)
Create a new title screen (e.g., new artwork, typography, layout) (3)
Using a texture atlas, create a new animated sprite (three frames minimum) for the enemy spaceships (3)
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)


This assignment took me about 11 hours.


credits: all background images are created by AI.
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

let globalScore = 0;



// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


