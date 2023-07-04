import { PreScene } from "../scenes/preScene";
import { MathUtils } from "../utils/mathUtils";
import { Player } from "./player";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    public id!: number;
    private SPEED_START: number;
    public speedX: number;
    public speedY: number;

    constructor(scene: PreScene, x: number, y: number, nameTexture: string, speedBall: number = 800) {
        super(scene, x, y, nameTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.SPEED_START = speedBall;
        this.speedX = this.SPEED_START;
        this.speedY = this.SPEED_START / 1.5;
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
      
            this.body.velocity.y = 0;
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

    public setMaxSpeed(speed: number): void {
        this.SPEED_START = speed;
    }

    public addColliderWithPlayerLeft(player: Player) {
		this.scene.physics.add.overlap(player, this, (player, ball) => {
            // Le y = 0 est en haut de l'écran
            //Pong 		  => 	 Top   		milieu   	   bot
            //Pourcentage =>	 100     	  0     	   100
            //SpeedAxeY   => -MaxSpeedY       0         MaxSpeedY
            let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
            let ballDirection = 1; // 1 vers le bas et -1 vers le haut
            if (ball.y < player.y) {
                ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
                ballDirection = -1;
            }
            let signOfSpeedX = 1;
            let ballSpeedX = signOfSpeedX * ball.speedX;
            ball.setVelocity(ballSpeedX, ballDirection * ball.speedY * ballPosPercentPlayer);
        });
    }

    public addColliderWithPlayerRight(player: Player) {
        this.scene.physics.add.overlap(player, this, (player, ball) => {
            // Le y = 0 est en haut de l'écran
            //Pong 		  => 	 Top   		milieu   	   bot
            //Pourcentage =>	 100     	  0     	   100
            //SpeedAxeY   => -MaxSpeedY       0         MaxSpeedY
            let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
            let ballDirection = 1; // 1 vers le bas et -1 vers le haut
            if (ball.y < player.y) {
                ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
                ballDirection = -1;
            }
            let signOfSpeedX = -1;
            let ballSpeedX = signOfSpeedX * ball.speedX;
            ball.setVelocity(ballSpeedX, ballDirection * ball.speedY * ballPosPercentPlayer);
        });
    }
}
