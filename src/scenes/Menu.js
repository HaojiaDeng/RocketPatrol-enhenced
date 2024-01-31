class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }

    preload() {
      // load images/tile sprites
      this.load.image('rocket', './assets/rocket.png')
      this.load.image('spaceship', './assets/spaceship.png')
      this.load.image('eliteship', './assets/eliteship.png')
      this.load.image('starfield', './assets/starfield.png')
      this.load.image('background','./assets/background.png')
      // load spritesheet
      this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9
      })
      this.load.spritesheet('tailflame', './assets/tailflame.png', {
        frameWidth: 64,
        frameHeight: 32,
        startFrame: 0,
        endFrame: 5
        })
      // load audio
      this.load.audio('sfx-select', './assets/sfx-select.wav')
      this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
      this.load.audio('sfx-shot', './assets/sfx-shot.wav')
      this.load.audio('BGM2','./assets/BGM2.wav')
      this.load.audio('explosion', './assets/explosion.wav')
      this.load.audio('explosion2', './assets/explosion2.wav')
      this.load.audio('explosion3', './assets/explosion3.wav')
      this.load.audio('explosion4', './assets/explosion4.wav')
    
    }

    create() {
        this.background = this.add.tileSprite(0,0, 640, 480, 'background').setOrigin(0, 0)
      // animation configuration
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        })

        this.anims.create({
        key: 'tailflame_anime',
        frames: this.anims.generateFrameNumbers('tailflame', { start: 0, end: 5, first: 0}),
        frameRate: 30
        })




        let menuConfig = {
          fontFamily: 'Verdana', 
          fontSize: '28px', 
      }
      
      // Display the menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
      
      

      menuConfig.color = '#000'; 
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
      
      
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      
      this.add.text(this.cameras.main.centerX, 50, `High Score: ${globalScore}`, {fontFamily: 'Courier',fontSize: '28px',color: '#FFFFFF'}).setOrigin(0.5);
      }   

    update(){
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
          game.settings = {
          spaceshipSpeed: 5,
          gameTimer: 60000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
          game.settings = {
          spaceshipSpeed: 7,
          gameTimer: 45000    
        }
        this.sound.play('sfx-select')
        this.scene.start('playScene')   
      }
    }
  
  }