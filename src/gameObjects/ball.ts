import { MathUtils } from "../utils/mathUtils";

export class Ball extends Phaser.Physics.Arcade.Sprite {


    constructor(scene: Phaser.Scene, x: number, y: number, textureName: string) {
        super(scene, x, y, textureName);
        this.scene = scene;

        this.addGraphicInScene(scene, textureName);

        this.createBall(scene, x, y, textureName);
    }

    protected addGraphicInScene(scene: Phaser.Scene, textureName: string) {
        const graphics: Phaser.GameObjects.Graphics = scene.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, 10, 10);
        graphics.generateTexture(textureName, 10, 10);
        graphics.destroy();
    }

    protected generateSprite(scene: Phaser.Scene, x: number, y: number, textureName: string): Phaser.Physics.Arcade.Sprite {
        const sprite = scene.physics.add.sprite(x, y, textureName)
            .setCollideWorldBounds(true);

        const startY: number = MathUtils.getRandomArbitrary(-250, 250);
        const startX: number = 500;

        sprite.setVelocity(startX, startY);
        sprite.setBounce(1);

        return sprite;
    }

    public addColliderWith(object: Phaser.GameObjects.GameObject, callback: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) {
        this.scene.physics.add.collider(object, this, callback);
    }

    public createBall(scene: Phaser.Scene, x: number, y: number, textureName: string): Phaser.Physics.Arcade.Sprite {
        return this.generateSprite(scene, x, y, textureName);
    }
}
