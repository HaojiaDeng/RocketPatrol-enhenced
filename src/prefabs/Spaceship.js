class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;

        //this.effect = Phaser.Scene.add.sprite(this.x, this.y, 'tailflame').setOrigin(0, 0);
    }

    update() {
        this.x -= this.moveSpeed;
        
        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
            //this.x = game.config.width - borderUISize;
        }
    }

    reset() {
        this.x = game.config.width;
    }
    

}
