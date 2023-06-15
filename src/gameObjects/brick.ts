import { PreScene } from "../scenes/preScene";
import { Ball } from "./ball";

export class Brick extends Phaser.Physics.Arcade.Sprite {
    public health: number = 3;
    public isImmortal: boolean = false;

    constructor(scene: PreScene, x: number, y: number, nameTexture: string, health: number = 3, isImmortal = false) {
        super(scene, x, y, nameTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.health = health;
        this.isImmortal = isImmortal;
    }

    public addColliderWith(ball: Ball): void {
        this.scene.physics.add.overlap(ball, this, function (ball, brick) {
            if(!brick.isImmortal) {
                brick.health--;
            }
            ball.setVelocity(-1 * ball.body.velocity.x, ball.body.velocity.y);
        });
	}
}
