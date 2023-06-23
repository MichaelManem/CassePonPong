import { NewPong } from "../../scenes/games/pong/newPong";
import { Ball } from "../ball";
import { Brick } from "./brick";

export class BrickImmortal extends Brick {
    private readonly NAME_TEXTURE_BRICK_IMMORTAL: string = "textureBrickImmortal";

    constructor(scene: NewPong, x: number, y: number, width: number, height: number) {
        super(scene, x, y, width, height);
        this.type = "immortal";
        this.createTextureBrickImmortal(width, height);
        this.setTexture(this.NAME_TEXTURE_BRICK_IMMORTAL);
    }

    public addColliderWith(ball: Ball): void {
        this.scene.physics.add.overlap(ball, this, function (ball, brick) {
            let yTopBrick = brick.y - (brick.height / 2);
            let yBottomBrick = brick.y + (brick.height / 2);
            // Gère le rebond audessus et endessous de la brique
            if((ball.y <= yTopBrick && ball.body.velocity.y > 0) || (ball.y >= yBottomBrick && ball.body.velocity.y < 0)) {
                ball.setVelocity(ball.body.velocity.x, -1 * ball.body.velocity.y);
            } else {
                ball.setVelocity(-1 * ball.body.velocity.x, ball.body.velocity.y);
            }
        });
	}

    private createTextureBrickImmortal(width: number, height: number) {
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0x727A7A);
        graphics.fillRect(0, 0, width, height);
        graphics.lineStyle(15, 0x000000);
        graphics.strokeRect(0, 0, width, height);
        graphics.generateTexture(this.NAME_TEXTURE_BRICK_IMMORTAL, width, height);
        graphics.destroy();
    }

    public copyBrick(scene: NewPong) {
        let copyBrick = new Brick(scene, this.x, this.y, this.width, this.height);
        copyBrick.maxHealth = this.maxHealth;
        copyBrick.health = this.health;
        copyBrick.type = this.type;
        copyBrick.setTexture(this.texture.key);
        return copyBrick;
    }
}
