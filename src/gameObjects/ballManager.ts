import { OldPong } from "../scenes/games/oldPong/oldPong";
import { NewPong } from "../scenes/games/pong/newPong";
import { MathUtils } from "../utils/mathUtils";
import { Ball } from "./ball";
type AllBalls = Ball;
type AllPongs = OldPong | NewPong;

export class BallManager {
    private readonly BALL_DIAMETER: number = 10;
    public balls: AllBalls[] = [];
    private scene: AllPongs;
    private SPEED_START: number = 800;
    private positionStartX: number;
    private positionStartY: number;
    private readonly waitTimeSendBall: number = 1500;
    public NAME_TEXTURE_BALL: string = "ball";
    public NAME_TEXTURE_BALL_GHOST: string = "ball_ghost";
    private indexBall: number = 0;

    constructor(scene: AllPongs, speedStart: number = 800) {
        this.scene = scene;
        this.SPEED_START = speedStart;
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
            this.indexBall++;
            this.balls.push(ball);
        });
    }
    
    public resetAllBallsPosition(): void {
        this.balls.forEach(ball => {
            this.resetBallPosition(ball);
        });
    }
    
    public resetBallPosition(ball: AllBalls, positionStartX: number = this.positionStartX, positionStartY: number = this.positionStartY): void {
        let ballFinded: AllBalls | undefined = this.balls.find(currentBall => currentBall.id == ball.id);
        ball.x = positionStartX;
        ball.y = positionStartY;
        ball.setVelocity(0);
        this.scene.time.delayedCall(this.waitTimeSendBall, this.sendBall, [ball], this);
    }

    protected sendBall(ball: AllBalls): void {
        let startY: number = MathUtils.getRandomArbitrary(-this.ball.speedY, this.ball.speedY);
        while(startY < this.speedY * 0.20 && startY > -this.speedY * 0.20) {
            startY = MathUtils.getRandomArbitrary(-this.speedY, this.speedY);
        }
        // 'Math.random() < 0.5' return a random boolean
        const startX: number = MathUtils.getRandomBoolean() ? -this.speedX : this.speedX;
        this.ball.setVelocity(startX, startY);
        this.ball.setBounce(1);
    }

    public setMaxSpeed(speed: number): void {
        this.SPEED_START = speed;
    }
}
