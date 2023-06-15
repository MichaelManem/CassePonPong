import { PreScene } from "../scenes/preScene";
import { MathUtils } from "../utils/mathUtils";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private SPEED_START: number = 1200;
    public speedStartX: number = this.SPEED_START;
    private readonly MULTIPLIER_SPEED_Y: number = 0.667;
    public speedStartY: number = this.SPEED_START * this.MULTIPLIER_SPEED_Y;
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
            speedX = Math.max(-this.speedStartX, speedX);
        } else if (speedX > 0) {
            speedX = Math.min(this.speedStartX, speedX);
        } else {
            speedX = 0;
        }

        if (speedY < 0) {
            speedY = Math.max(-this.speedStartY, speedY);
        } else if (speedY > 0) {
            speedY = Math.min(this.speedStartY, speedY);
        } else {
            speedY = 0;
        }
      
        return super.setVelocity(speedX, speedY);;
    }
}
