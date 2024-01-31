class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }



    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.bgm = this.sound.add('BGM2', 0.2, true);
        this.bgm.setLoop(true)
        this.bgm.play();
        // place tile sprite

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)




        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width, borderUISize*10, 'spaceship', 0, 10).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship04 = new eliteship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'eliteship', 0, 50).setOrigin(0,0)

        this.fCounter = 0;
        // initialize score
        this.p1Score = 0
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }


        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)

        // GAME OVER flag
        this.gameOver = false
        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)


        this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed = game.settings.spaceshipSpeed + 2;
            this.ship02.moveSpeed = game.settings.spaceshipSpeed + 2;
            this.ship03.moveSpeed = game.settings.spaceshipSpeed + 2;
            let partyMessage = this.add.text(game.config.width / 2, game.config.height / 2, 'Here comes more fun!', {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#FFFF00'
            }).setOrigin(0.5);


            this.time.delayedCall(3000, () => {
                partyMessage.destroy();
            });
        });
        //create timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#ea1d1d'
        };
        this.timeLeft = game.settings.gameTimer / 1000; // 
        this.timerText = this.add.text(game.config.width - 200, borderUISize + borderPadding * 2, `Time: ${this.timeLeft}`, timerConfig);

        // time update
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                    this.timerText.setText(`Time: ${this.timeLeft}`);
                }
            },
            callbackScope: this,
            loop: true
        });
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)




    }

    update() {
        if (!this.gameOver) {
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()

        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
            this.ship03.reset()
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
            this.ship02.reset()
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            this.ship01.reset()
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
            this.ship04.reset()
        }

        if (this.ship01.x + 31 < borderUISize || this.ship01.x + 31 > game.config.width - borderUISize) {
            this.ship01.alpha = 0;
        }
        else {
            this.ship01.alpha = 1;
        }
        if (this.ship02.x + 31 < borderUISize || this.ship02.x + 31 > game.config.width - borderUISize) {
            this.ship02.alpha = 0;
        }
        else {
            this.ship02.alpha = 1;
        }
        if (this.ship03.x + 31 < borderUISize || this.ship03.x + 31 > game.config.width - borderUISize) {
            this.ship03.alpha = 0;
        }
        else {
            this.ship03.alpha = 1;
        }
        if (this.ship03.x + 61 < borderUISize || this.ship03.x + 61 > game.config.width - borderUISize) {
            this.ship04.alpha = 0;
        }
        else {
            this.ship04.alpha = 1;
        }

        this.fCounter += 1;

        if (this.fCounter == 6) {

            this.effect1 = this.add.sprite(this.ship01.x + 50, this.ship01.y, 'tailflame').setOrigin(0, 0);
            this.effect2 = this.add.sprite(this.ship02.x + 50, this.ship02.y, 'tailflame').setOrigin(0, 0);
            this.effect3 = this.add.sprite(this.ship03.x + 50, this.ship03.y, 'tailflame').setOrigin(0, 0);
            this.effect4 = this.add.sprite(this.ship04.x + 20, this.ship04.y -5 , 'tailflame').setOrigin(0, 0);
            this.effect1.alpha = this.ship01.alpha;
            this.effect2.alpha = this.ship02.alpha;
            this.effect3.alpha = this.ship03.alpha;
            this.effect4.alpha = this.ship04.alpha;
            if (this.effect1.x >= game.config.width - borderUISize - 31) {
                this.effect1.alpha = 0;
            }
            if (this.effect2.x >= game.config.width - borderUISize - 31) {
                this.effect2.alpha = 0;
            }
            if (this.effect3.x >= game.config.width - borderUISize - 31) {
                this.effect3.alpha = 0;
            }
            if (this.effect4.x >= game.config.width - borderUISize - 11) {
                this.effect4.alpha = 0;
            }
            this.effect1.anims.play('tailflame_anime')
            this.effect2.anims.play('tailflame_anime')
            this.effect3.anims.play('tailflame_anime')
            this.effect4.anims.play('tailflame_anime')
            this.effect1.on('animationcomplete', () => {   // callback after anim completes
                this.effect1.alpha = 0;
                this.effect1.destroy()
            })
            this.effect2.on('animationcomplete', () => {   // callback after anim completes
                this.effect2.alpha = 0;
                this.effect2.destroy()
            })
            this.effect3.on('animationcomplete', () => {   // callback after anim completes
                this.effect3.alpha = 0;
                this.effect3.destroy()
                this.fCounter = 0;
            })
            this.effect4.on('animationcomplete', () => {   // callback after anim completes
                this.effect4.alpha = 0;
                this.effect4.destroy()
                this.fCounter = 0;
            })

        }

        if (this.gameOver) {
            this.bgm.pause()
        }
        this.starfield.tilePositionX -= 0.1
        // check key input for restart

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        if (this.p1Score > globalScore) {
            globalScore = this.p1Score;
        }


    }




    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            this.gameTimer += 500
            return true
        } else {
            this.gameTimer -= 500
            return false

        }
    }



    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset()                         // reset ship position
            ship.alpha = 1                       // make ship visible again
            boom.destroy()
            // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        globalScore = this.p1Score;
        var sounds = ['sfx-explosion', 'explosion', 'explosion2', 'explosion3', 'explosion4'];
        var randomSound = Phaser.Utils.Array.GetRandom(sounds);
        this.sound.play(randomSound);
    }









}


