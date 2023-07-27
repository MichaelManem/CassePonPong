import { PreScene } from "../scenes/preScene";
import { Player } from "./player";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    public id!: number;
    public SPEED_START: number;
    public speedX: number;
    public speedY: number;
    public readonly MULTIPLIER_SPEED_Y: number = 0.667;
    private addSpeed: number = 0;
    private addSpeedX: number = 0;
    private addSpeedY: number = 0;

    constructor(scene: PreScene, id: number, x: number, y: number, nameTexture: string, speedBall: number = 800) {
        super(scene, x, y, nameTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.SPEED_START = speedBall;
        this.speedX = this.SPEED_START;
        this.speedY = this.SPEED_START * this.MULTIPLIER_SPEED_Y;
        this.id = id;
    }

    // Override method to recalibrate velocity in limit of speedY
    public setVelocity(speedX: number, speedY?: number | undefined): this {
        if (speedX < 0) {
            speedX = Math.max(-this.speedX, speedX);
        } else if (speedX > 0) {
            speedX = Math.min(this.speedX, speedX);
        } else {
            speedX = 0;
        }
        
        if(speedY === undefined) {
            speedY = speedY;
        } else if (speedY < 0) {
            speedY = Math.max(-this.speedY, speedY);
        } else if (speedY > 0) {
            speedY = Math.min(this.speedY, speedY);
        } else {
            speedY = 0;
        }

        return super.setVelocity(speedX, speedY);
    }

    public setMaxSpeed(speed: number): void {
        this.SPEED_START = speed;
    }

    public addColliderWithPlayerLeft(player: Player) {
		this.scene.physics.add.overlap(player, this, (player, ball) => {
            ball.speedX += ball.addSpeedX;
            ball.speedY += ball.addSpeedY;
            // Le y = 0 est en haut de l'écran
            //Pong 		  => 	 Top   		milieu   	   bot
            //Pourcentage =>	 100     	  0     	   100
            //SpeedAxeY   => -MaxSpeedY       0         MaxSpeedY
            const currentBallSpeedX = ball.body.velocity.x;
			let ballDistPercentFromCenterPlayer = (ball.y - player.y) / (player.height / 2);
            let ballDirection = 1; // 1 vers le bas et -1 vers le haut
            if (ball.y < player.y) {
                ballDistPercentFromCenterPlayer = (player.y - ball.y) / (player.height / 2);
                ballDirection = -1;
            }
            ballDistPercentFromCenterPlayer = ballDistPercentFromCenterPlayer > 1 ? 1 : ballDistPercentFromCenterPlayer < 0 ? 0 : ballDistPercentFromCenterPlayer;
            let newBallSpeedY = ballDirection * ball.speedY * ballDistPercentFromCenterPlayer;
			ball.setVelocity(ball.speedX, newBallSpeedY);
            this.playCollideSound();
        });
    }

    public addColliderWithPlayerRight(player: Player) {
        this.scene.physics.add.overlap(player, this, (player, ball) => {
            ball.speedX += ball.addSpeedX;
            ball.speedY += ball.addSpeedY;
            // Le y = 0 est en haut de l'écran
            //Pong 		  => 	 Top   		milieu   	   bot
            //Pourcentage =>	 100     	  0     	   100
            //SpeedAxeY   => -MaxSpeedY       0         MaxSpeedY
            const currentBallSpeedX = ball.body.velocity.x;
            let ballDistPercentFromCenterPlayer  = (ball.y - player.y) / (player.height / 2);
            let ballDirection = 1; // 1 vers le bas et -1 vers le haut
            if (ball.y < player.y) {
                ballDistPercentFromCenterPlayer = (player.y - ball.y) / (player.height / 2);
                ballDirection = -1;
            }
            ballDistPercentFromCenterPlayer = ballDistPercentFromCenterPlayer > 1 ? 1 : ballDistPercentFromCenterPlayer < 0 ? 0 : ballDistPercentFromCenterPlayer;
            let newBallSpeedX = -1 * ball.speedX;
            let newBallSpeedY = ballDirection * ball.speedY * ballDistPercentFromCenterPlayer;
			ball.setVelocity(newBallSpeedX, newBallSpeedY);
            this.playCollideSound();
        });
    }

    public playCollideSound(): void {
        this.scene.sound.add("hitPaddle", { loop: false, volume: 1 }).play();
    };

    public playCollideSoundWall(): void {
        this.scene.sound.add("hitWall", { loop: false, volume: 1 }).play();
    };

    

    public setAddSpeed(addSpeed: number): void {
        this.addSpeed = addSpeed;
        this.addSpeedX = this.addSpeed;
        this.addSpeedY = this.addSpeed * this.MULTIPLIER_SPEED_Y;
    }
}
