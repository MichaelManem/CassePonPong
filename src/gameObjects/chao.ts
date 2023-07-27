import { NewPong } from "../scenes/games/pong/newPong";
import { MathUtils } from "../utils/mathUtils";

export class Chao extends Phaser.GameObjects.Text {
    public MAX_SCORE: number = 7;
    public readonly SCORE_ZONE_MULTIPLIER: number = 0.3;
    private timedEvent!: Phaser.Time.TimerEvent;
    private readonly TIME_CHAO_TO_START: number = 5000;
    private readonly TIME_CHAO_NEXT: number = 5000;
    private isActive: boolean = false;
    private textMeteo: string = "";
    private pongSpeedBeforeEvent: number = 1750;

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
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_TO_START, this.getRandomEvent, [], this);
        this.textMeteo = "Chao will begin in : ";
    }

    private getRandomEvent() {
        if(!this.isActive) {
            return;
        }
        let randomNumer: number = MathUtils.randomInteger(1, 12);
        switch (randomNumer) {
            case 1:
                this.ballSizeUpEvent();
                break;
            case 2:
                this.ballSizeDownEvent();
                break;
            case 3:
                this.pongSizeUpEvent();
                break;
            case 4:
                this.pongSizeDownEvent();
                break;
            case 5:
                this.pongSpeedUpEvent();
                break;
            case 6:
                this.ballSizeRandomEvent();
                break;
            case 7:
                this.addBallEvent();
                break;
            case 8:
                this.pongSizeRandomEvent();
                break;
            case 9:
                this.pongSpeedNormalEvent();
                break;
            case 10:
                this.addBallEvent();
                break;
            case 11:
                this.addBallEvent();
                break;
            case 12:
                this.addBallEvent();
                break;
        }
    }

    // -------------------------------------------------------------------------------------------

    private ballSizeRandomEvent() {
        if(!this.isActive) {
            return;
        }
        let randomNumer: number = MathUtils.randomInteger(2, 100);
        this.scene.ballManager.BALL_DIAMETER = randomNumer;
        this.scene.ballManager.balls.forEach(ball => {
            ball.setDisplaySize(randomNumer, randomNumer);
        });
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE BALL RANDOM / Next CHAO in : ";
    }

    // -------------------------------------------------------------------------------------------

    private ballSizeUpEvent() {
        if(!this.isActive) {
            return;
        }
        this.scene.ballManager.balls.forEach(ball => {
            ball.setDisplaySize(100, 100);
            this.scene.ballManager.BALL_DIAMETER = 100;
        });
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE BALL UP / Next Chao in : ";
    }

    // -------------------------------------------------------------------------------------------

    private ballSizeDownEvent() {
        if(!this.isActive) {
            return;
        }
        this.scene.ballManager.balls.forEach(ball => {
            ball.setDisplaySize(2, 2);
        });
        this.scene.ballManager.BALL_DIAMETER = 2;
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE BALL DOWN / Next CHAO in : ";
    }

    // -------------------------------------------------------------------------------------------

    private pongSpeedUpEvent() {
        if(!this.isActive) {
            return;
        }
        this.pongSpeedBeforeEvent = this.scene.player1.getMaxSpeed();
        let pongSpeedMeteo = 7000;
        this.scene.player1.setSpeed(pongSpeedMeteo);
        this.scene.player2.setSpeed(pongSpeedMeteo);
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SPEED PONG UP / Next CHAO in : ";
    }
    
    // -------------------------------------------------------------------------------------------

    private pongSpeedNormalEvent() {
        if(!this.isActive) {
            return;
        }
        this.scene.player1.setSpeed(this.pongSpeedBeforeEvent);
        this.scene.player2.setSpeed(this.pongSpeedBeforeEvent);
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SPEED PONG NORMAL / Next CHAO in : ";
    }
    
    // -------------------------------------------------------------------------------------------

    private addBallEvent() {
        if(!this.isActive) {
            return;
        }
        let nbBallsToAdd = MathUtils.randomInteger(3, 5);
        this.textMeteo = `MULTI BALL +${nbBallsToAdd} : `;
        let balls = [];
        for (let index = 0;index < nbBallsToAdd;index++) {
            balls.push("ball");
        }
        this.scene.ballManager.createBalls(balls);
        this.scene.ballManager.addOverlapWith(this.scene.player1, this.scene.player2);
        this.scene.ballManager.balls.forEach((ball, index) => {
            if(index >= this.scene.ballManager.balls.length - nbBallsToAdd) {
                this.scene.brickManager.addOverlapWith(ball);
            }
		});
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = `MULTI BALL +${nbBallsToAdd} ` + " / Next CHAO in : ";
    }
    
    // -------------------------------------------------------------------------------------------
    
    private pongSizeUpEvent() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "SIZE UP PONG end in : ";
        this.scene.player1.setDisplaySize(100, 600);
        this.scene.player2.setDisplaySize(100, 600);
        this.scene.PLAYER_WIDTH = 100;
        this.scene.PLAYER_HEIGHT = 600;
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE PONG UP / Next CHAO in : ";
    }
    
    // -------------------------------------------------------------------------------------------
    
    private pongSizeDownEvent() {
        if(!this.isActive) {
            return;
        }
        this.textMeteo = "SIZE DOWN PONG end in : ";
        this.scene.player1.setDisplaySize(40, 40);
        this.scene.player2.setDisplaySize(40, 40);
        this.scene.PLAYER_WIDTH = 40;
        this.scene.PLAYER_HEIGHT = 40;
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE PONG UP / Next CHAO in : ";
    }
    
    // -------------------------------------------------------------------------------------------
    
    private pongSizeRandomEvent() {
        if(!this.isActive) {
            return;
        }
        let randomWidth: number = MathUtils.randomInteger(40, 100);
        let randomHeight: number = MathUtils.randomInteger(40, 600);
        this.scene.player1.setDisplaySize(randomWidth, randomHeight);
        this.scene.player2.setDisplaySize(randomWidth, randomHeight);
        this.scene.PLAYER_WIDTH = randomWidth;
        this.scene.PLAYER_HEIGHT = randomHeight;
        this.timedEvent = this.scene.time.delayedCall(this.TIME_CHAO_NEXT, this.getRandomEvent, [], this);
        this.textMeteo = "SIZE PONG RANDOM / Next CHAO in : ";
    }
}