import { PreScene } from "../scenes/preScene";
import { MathUtils } from "../utils/mathUtils";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private readonly SPEED_START: number = 500;
    private positionStartX: number;
    private positionStartY: number;
    public speedX: number = this.SPEED_START;
    public speedY: number = this.SPEED_START / 2;

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
        this.scene.physics.add.collider(object, this, callback);
    }
    
    public resetBallPosition(): void {
        this.x = this.positionStartX;
        this.y = this.positionStartY;

        // Reset random ball velocity
        const startY: number = MathUtils.getRandomArbitrary(-this.speedY, this.speedY);
        // 'Math.random() < 0.5' return a random boolean
        const startX: number = Math.random() < 0.5 ? -this.speedX : this.speedX;
        this.setVelocity(startX, startY);
    }

    // Override method to recalibrate velocity in limit of speedY
    public setVelocity(speedX: number, speedY?: number | undefined): this {
        super.setVelocity(speedX, speedY);
      
        if (this.body && this.body.velocity) {
            const velocityX = this.body.velocity.x;
            const velocityY = this.body.velocity.y;
      
            if (velocityX < 0) {
                this.body.velocity.x = Math.max(-this.speedX, velocityX);
            } else if (velocityX > 0) {
                this.body.velocity.x = Math.min(this.speedX, velocityX);
            } else {
                this.body.velocity.x = 0;
            }
      
            if (velocityY < 0) {
                this.body.velocity.y = Math.max(-this.speedY, velocityY);
            } else if (velocityY > 0) {
                this.body.velocity.y = Math.min(this.speedY, velocityY);
            } else {
                this.body.velocity.y = 0;
            }
        }
      
        return this;
    }
}
