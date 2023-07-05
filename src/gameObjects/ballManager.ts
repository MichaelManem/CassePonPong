import { OldPong } from "../scenes/games/oldPong/oldPong";
import { NewPong } from "../scenes/games/pong/newPong";
import { MathUtils } from "../utils/mathUtils";
import { Ball } from "./ball";
import { Player } from "./player";
type AllBalls = Ball;
type AllPongs = OldPong | NewPong;

export class BallManager {
    private BALL_DIAMETER: number = 10;
    public balls: AllBalls[] = [];
    private scene: AllPongs;
    private SPEED_START: number = 800;
    private positionStartX: number;
    private positionStartY: number;
    private readonly waitTimeSendBall: number = 1500;
    public NAME_TEXTURE_BALL: string = "ball";
    public NAME_TEXTURE_BALL_GHOST: string = "ball_ghost";
    private indexBall: number = 0;
    private readonly MULTIPLIER_SPEED_Y: number = 0.667;

    constructor(scene: AllPongs, speedStart: number = 800, sizeBall: number = 10) {
        this.scene = scene;
        this.SPEED_START = speedStart;
        this.BALL_DIAMETER = sizeBall;
        this.positionStartX = scene.WIDTH_WORLD * 0.5;
        this.positionStartY = scene.HEIGHT_WORLD * 0.5;
    }

    public createTextureBallOldPong(): void {
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.generateTexture(this.NAME_TEXTURE_BALL, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.destroy();
    }

    public createTextureBallNewPong(): void {
        // TODO - Implémenter la texture de la balle spécifique à New Pong
        this.createTextureBallOldPong();
    }

    public createTextureBallGhost(): void {
        // TODO - Implémenter la texture de la balle spécifique au balle fantome
        const graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.generateTexture(this.NAME_TEXTURE_BALL, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.setAlpha(0.5);
        graphics.destroy();
    }

    public createBalls(typeBalls: string[]): void {
        typeBalls.forEach(typeBall => {
            let ball: AllBalls;
            switch (typeBall) {
                case "ball":
                    ball = new Ball(this.scene, this.scene.WIDTH_WORLD * 0.5, this.scene.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL, this.SPEED_START);
                    break;
                case "ballGhost":
                    ball = new Ball(this.scene, this.scene.WIDTH_WORLD * 0.5, this.scene.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL, this.SPEED_START);
                    break;
                default:
                    ball = new Ball(this.scene, this.scene.WIDTH_WORLD * 0.5, this.scene.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL, this.SPEED_START);
                    break;
            }
            ball.id = this.indexBall;
            ball.setDisplaySize(this.BALL_DIAMETER, this.BALL_DIAMETER);
            this.indexBall++;
            this.balls.push(ball);
        });
        this.resetBallsPosition();
    }

    public resetBallsPosition(): void {
        this.balls.forEach(ball => {
            this.resetBallPosition(ball);
        });
    }

    public findBall(ball: AllBalls) {
        return this.balls.find(currentBall => currentBall.id == ball.id);
    }

    public resetBallPosition(ball: AllBalls, positionStartX: number = this.positionStartX, positionStartY: number = this.positionStartY): AllBalls {
        let ballFinded: AllBalls | undefined = this.findBall(ball);
        if(ballFinded !== undefined) {
            ballFinded.x = positionStartX;
            ballFinded.y = positionStartY;
            ballFinded.setVelocity(0, 0);
            this.scene.time.delayedCall(this.waitTimeSendBall, this.sendBall, [ballFinded], this);
        }
        return ball;
    }

    protected sendBall(ball: AllBalls): void {
        ball.speedY = this.SPEED_START * this.MULTIPLIER_SPEED_Y;
        ball.speedX = this.SPEED_START;
        let startY: number = MathUtils.getRandomArbitrary(-ball.speedY, ball.speedY);
        while(startY < ball.speedY * 0.20 && startY > -ball.speedY * 0.20) {
            startY = MathUtils.getRandomArbitrary(-ball.speedY, ball.speedY);
        }
        // 'Math.random() < 0.5' return a random boolean
        const startX: number = MathUtils.getRandomBoolean() ? -ball.speedX : ball.speedX;
        ball.setVelocity(startX, startY);
        ball.setBounce(1);
    }

    public setMaxSpeed(speed: number): void {
        this.SPEED_START = speed;
    }

    public addOverlapWith(player1: Player, player2: Player): void {
        this.balls.forEach(ball => {
            ball.addColliderWithPlayerLeft(player1);
            ball.addColliderWithPlayerRight(player2);
        });
    }

    public setSpeedStart(speed: number): void {
        this.SPEED_START = speed;
    }

    public setDiameter(diameter: number): void {
        this.BALL_DIAMETER = diameter;
    }
}
