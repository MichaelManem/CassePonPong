import { NewPong } from "../../scenes/games/pong/newPong";
import { Ball } from "../ball";

export class Brick extends Phaser.Physics.Arcade.Sprite {
    public readonly NAME_TEXTURE_BRICK_HEALTHY: string = "textureBrickHealthy";
    public readonly NAME_TEXTURE_BRICK_WARNING: string = "textureBrickWarning";
    public readonly NAME_TEXTURE_BRICK_DANGER: string = "textureBrickDanger";
    public maxHealth: number;
    public health: number;
    public type: string = "normal";

    constructor(scene: NewPong, x: number, y: number, width: number, height: number, maxHealth: number = 3) {
        super(scene, x, y, "normal");
        this.maxHealth = maxHealth;
        this.health = maxHealth;

        this.setTexture("greenBrick");

        this.setDisplaySize(width, height);
        this.height = height;
        this.width = width;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
    }

    public addColliderWith(ball: Ball): void {
        this.scene.physics.add.overlap(ball, this, function (ball, brick) {
            if(brick.isNormal() && brick.health > 0) {
                brick.health--;
                if(brick.health <= brick.maxHealth * 0.334) {
                    brick.setTexture("redBrick");

                } else if(brick.health <= brick.maxHealth * 0.667) {
                    brick.setTexture("orangeBrick");
                }
            }
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
    
    private createTextureBrickHealthy(width: number, height: number) {
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0x41D700);
        graphics.fillRect(0, 0, width, height);
        graphics.lineStyle(15, 0x000000);
        graphics.strokeRect(0, 0, width, height);
        graphics.generateTexture(this.NAME_TEXTURE_BRICK_HEALTHY, width, height);
        graphics.destroy();
    }

    private createTextureBrickWarning(width: number, height: number) {
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0xFF9700);
        graphics.fillRect(0, 0, width, height);
        graphics.lineStyle(15, 0x000000);
        graphics.strokeRect(0, 0, width, height);
        graphics.generateTexture(this.NAME_TEXTURE_BRICK_WARNING, width, height);
        graphics.destroy();
    }

    private createTextureBrickDanger(width: number, height: number) {
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0xD70000);
        graphics.fillRect(0, 0, width, height);
        graphics.lineStyle(15, 0x000000);
        graphics.strokeRect(0, 0, width, height);
        graphics.generateTexture(this.NAME_TEXTURE_BRICK_DANGER, width, height);
        graphics.destroy();
    }

    public isNormal(): boolean {
        return this.type === "normal";
    }

    public isImmortal(): boolean {
        return this.type === "immortal";
    }

    public isGhost(): boolean {
        return this.type === "ghost";
    }

    public isDead() {
        return this.health <= 0 && this.isNormal();
    }

    public copyBrick(scene: NewPong) {
        let copyBrick = new Brick(scene, this.x, this.y, this.width, this.height);
        copyBrick.maxHealth = this.maxHealth;
        copyBrick.health = this.health;
        copyBrick.type = this.type;
        copyBrick.setTexture(this.texture.key);
        copyBrick.setDisplaySize(this.width, this.height);
        copyBrick.height = this.height;
        copyBrick.width = this.width;
        return copyBrick;
    }
}
