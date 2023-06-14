import { PreScene } from "../scenes/preScene";
import { MathUtils } from "../utils/mathUtils";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private MAX_SPEED_TOTAL: number = 2500;
    private SPEED_START: number = 1200;
    private speedStartX: number = this.SPEED_START;
    private speedStartY: number = this.SPEED_START / 1.5;
    private positionStartX: number;
    private positionStartY: number;
    private readonly waitTimeSendBall: number = 1500;

    constructor(scene: PreScene, x: number, y: number, nameTexturePlayer: string) {
        super(scene, x, y, nameTexturePlayer);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.positionStartX = scene.WIDTH_WORLD * 0.5;
        this.positionStartY = scene.HEIGHT_WORLD * 0.5;
        this.setCollideWorldBounds(true);
        this.resetBallPosition();
        this.setBounce(1);
    }

    public addColliderWith(object: Phaser.GameObjects.GameObject, callback: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback) {
        this.scene.physics.add.overlap(object, this, callback);
    }
    
    public resetBallPosition(): void {
        this.x = this.positionStartX;
        this.y = this.positionStartY;
        this.setVelocity(0, 0);
        this.scene.time.delayedCall(this.waitTimeSendBall, this.sendBall, [], this);
    }

    protected sendBall(): void {
        const startY: number = MathUtils.getRandomArbitrary(-this.speedStartY, this.speedStartY);
        // 'Math.random() < 0.5' return a random boolean
        const startX: number = MathUtils.getRandomBoolean() ? -this.speedStartX : this.speedStartX;
        this.setVelocity(startX, startY);
        this.setBounce(1);
    }

    // Override method to recalibrate velocity in limit of speedY
    public setVelocity(speedX: number, speedY: number): this {
        if (speedX < 0) {
            speedX = Math.max(-this.MAX_SPEED_TOTAL, speedX);
        } else if (speedX > 0) {
            speedX = Math.min(this.MAX_SPEED_TOTAL, speedX);
        } else {
            speedX = 0;
        }

        if (speedY < 0) {
            speedY = Math.max(-this.MAX_SPEED_TOTAL/1.5, speedY);
        } else if (speedY > 0) {
            speedY = Math.min(this.MAX_SPEED_TOTAL/1.5, speedY);
        } else {
            speedY = 0;
        }
      
        return super.setVelocity(speedX, speedY);;
    }
}
