import { NewPong } from "../scenes/games/pong/newPong";
import { MathUtils } from "../utils/mathUtils";
import { Ball } from "./ball";
import { Player } from "./player";
import { timeStamp } from "console";

export class Meteo extends Phaser.GameObjects.Text {
    public MAX_SCORE: number = 7;
    public readonly SCORE_ZONE_MULTIPLIER: number = 0.3;
    private timedEvent!: Phaser.Time.TimerEvent;
    private readonly TIME_METEO_TO_BEGIN: number = 5000;
    private readonly TIME_METEO_TO_STOP: number = 15000;
    private readonly TIME_BALL_SPEED_TO_STOP: number = 10000;
    private isActive: boolean = false;
    private textMeteo: string = "";
    private ballSpeedBeforeEvent: number = 800;
    private pongSpeedBeforeEvent: number = 1750;
    private nbBallsBeforeMeteo: number = 1;

    public scoreValue: number = 0;

    constructor(scene: NewPong, isActive: boolean) {
        super(scene, 0, 0, '0', {});
        this.isActive = isActive;
        if(!this.isActive) {
            return;
        }
        this.scene = scene;
        this.setOrigin(0.5);
        this.setPosition(
            scene.WIDTH_WORLD * 0.5,
            scene.HEIGHT_WORLD * 0.035
        );
        this.setFont(`6rem Courier New`);
        this.setColor("#fff");
        this.setStroke("#00000", 30);
        scene.add.existing(this);
    }

    public handleText(): void {
        if(!this.isActive) {
            return;
        }
		this.setText(this.textMeteo + `${this.timedEvent.getRemainingSeconds().toString().substr(0, 4)}`);
    }

    public startEvent() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "Event start in : ";
        this.timedEvent = this.scene.time.delayedCall(this.TIME_METEO_TO_BEGIN, this.getRandomEvent, [], this);
    }

    private getRandomEvent() {
        if(!this.isActive) {
            return;
        }
        let randomNumer: number = MathUtils.randomInteger(1, 4);
        switch (randomNumer) {
            case 1:
                this.addBallEventStart();
                break;
            case 2:
                this.addBallEventStart();
                break;
            case 3:
                this.addBallEventStart();
                break;
            case 4:
                this.addBallEventStart();
                break;
        }
    }

    // -------------------------------------------------------------------------------------------

    private ballSizeEventStart() {
        if(!this.isActive) {
            return;
        }
        this.scene.ballManager.balls.forEach(ball => {
            ball.setDisplaySize(100, 100);
        });
        this.textMeteo = "Size ball end in : ";
        this.timedEvent = this.scene.time.delayedCall(this.TIME_METEO_TO_STOP, this.ballSizeEventEnd, [], this);
    }

    private ballSizeEventEnd() {
        if(!this.isActive) {
            return;
        }
        this.scene.ballManager.balls.forEach(ball => {
            ball.setDisplaySize(this.scene.ballManager.BALL_DIAMETER, this.scene.ballManager.BALL_DIAMETER);
        });
        this.startEvent();
    }

    // -------------------------------------------------------------------------------------------

    private ballSpeedEventStart() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "SPEED BALL end in : ";
        let newSpeed = 1600;
        this.ballSpeedBeforeEvent = this.scene.ballManager.getSpeedStart();
        this.scene.ballManager.setSpeedStart(newSpeed);
        this.scene.ballManager.balls.forEach(ball => {
            let signVelocityX = Math.sign(ball.body.velocity.x);
            let velocityX = signVelocityX * newSpeed;
            let signVelocityY = Math.sign(ball.body.velocity.y);
            let velocityY = signVelocityY * (newSpeed * this.scene.ballManager.MULTIPLIER_SPEED_Y);
            ball.setVelocity(velocityX, velocityY);
        });
        this.scene.ballManager.addOverlapWith(this.scene.player1, this.scene.player2);
        this.timedEvent = this.scene.time.delayedCall(this.TIME_BALL_SPEED_TO_STOP, this.ballSpeedEventEnd, [], this);
    }

    private ballSpeedEventEnd() {
        if(!this.isActive) {
            return;
        }
        this.scene.ballManager.setSpeedStart(this.ballSpeedBeforeEvent);
        this.scene.ballManager.balls.forEach(ball => {
            let signVelocityX = Math.sign(ball.body.velocity.x);
            let velocityX = signVelocityX * this.ballSpeedBeforeEvent;
            let signVelocityY = Math.sign(ball.body.velocity.y);
            let velocityY = signVelocityY * (this.ballSpeedBeforeEvent * this.scene.ballManager.MULTIPLIER_SPEED_Y);
            ball.setVelocity(velocityX, velocityY);
        });
        this.scene.getScene("NewPong").ballManager.addOverlapWith(this.scene.player1, this.scene.player2);
        this.startEvent();
    }
    
    // -------------------------------------------------------------------------------------------

    private pongSpeedEventStart() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "SPEED PONG end in : ";
        this.pongSpeedBeforeEvent = this.scene.player1.getMaxSpeed();
        let pongSpeedMeteo = 7000;
        this.scene.player1.setSpeed(pongSpeedMeteo);
        this.scene.player2.setSpeed(pongSpeedMeteo);
        this.timedEvent = this.scene.time.delayedCall(this.TIME_BALL_SPEED_TO_STOP, this.pongSpeedEventEnd, [], this);
    }

    private pongSpeedEventEnd() {
        if(!this.isActive) {
            return;
        }
        this.scene.player1.setSpeed(this.pongSpeedBeforeEvent);
        this.scene.player2.setSpeed(this.pongSpeedBeforeEvent);
        this.startEvent();
    }
    
    // -------------------------------------------------------------------------------------------

    private addBallEventStart() {
        if(!this.isActive) {
            return;
        }
        let nbBallsToAdd = MathUtils.randomInteger(3, 5);
        this.textMeteo = `MULTI BALL +${nbBallsToAdd} : `;
        let balls = [];
        for (let index = 0; index < nbBallsToAdd; index++) {
            balls.push("ball");
        }
        this.nbBallsBeforeMeteo = this.scene.ballManager.balls.length;
        this.scene.ballManager.createBalls(balls);
        this.scene.ballManager.addOverlapWith(this.scene.player1, this.scene.player2);
        this.scene.ballManager.balls.forEach(ball => {
			this.scene.brickManager.addOverlapWith(ball);
		});
        this.timedEvent = this.scene.time.delayedCall(this.TIME_BALL_SPEED_TO_STOP, this.addBallEventEnd, [], this);
    }

    private addBallEventEnd() {
        if(!this.isActive) {
            return;
        }
        console.log("nbBallsBeforeMeteo", this.nbBallsBeforeMeteo);
        this.scene.ballManager.balls.forEach(ball => {
            console.log(ball.id);
            if(ball.id > this.nbBallsBeforeMeteo - 1) {
                this.scene.ballManager.balls.splice(this.scene.ballManager.balls.indexOf(ball), 1);
                ball.destroy();
                this.scene.ballManager.idBall--;
            }
        });
        console.log(this.scene.ballManager.balls);
        this.startEvent();
    }
    
    // -------------------------------------------------------------------------------------------
    
    private pongSizeEventStart() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "SIZE PONG end in : ";
        this.pongSpeedBeforeEvent = this.scene.player1.get();
        let pongSpeedMeteo = 7000;
        this.scene.player1.setDisplaySize(100, 100);
        this.scene.player1.setSpeed(pongSpeedMeteo);
        this.scene.player2.setSpeed(pongSpeedMeteo);
        this.timedEvent = this.scene.time.delayedCall(this.TIME_BALL_SPEED_TO_STOP, this.pongSizeEventEnd, [], this);
    }

    private pongSizeEventEnd() {
        if(!this.isActive) {
            return;
        }
        this.scene.player1.setSpeed(this.pongSpeedBeforeEvent);
        this.scene.player2.setSpeed(this.pongSpeedBeforeEvent);
        this.startEvent();
    }
}