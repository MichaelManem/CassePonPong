import { PreScene } from "../scenes/preScene";
import { Ball } from "./ball";
import { Player } from "./player";
import { timeStamp } from "console";

export interface ScoreStyle extends Phaser.Types.GameObjects.Text.TextStyle {
    [key: string]: any;
}

export class Meteo extends Phaser.GameObjects.Text {
    public MAX_SCORE: number = 7;
    public readonly SCORE_ZONE_MULTIPLIER: number = 0.3;
    private timedBeginEvent!: Phaser.Time.TimerEvent;
    private timedEndEvent!: Phaser.Time.TimerEvent;
    private readonly TIME_METEO_TO_BEGIN: number = 20000;
    private readonly TIME_METEO_TO_STOP: number = 20000;
    private willStartMeteo = false;
    private willEndMeteo = false;
    private isActive: boolean = false;

    public scoreValue: number = 0;

    constructor(scene: PreScene, isActive: boolean) {
        super(scene, 0, 0, '0', {});
        this.isActive = isActive;
        if(!this.isActive) {
            return
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
        console.log(this.isActive);
        if(!this.isActive) {
            return
        }
		if(this.willStartMeteo) {
			this.setText(`Meteo start in : ${this.timedBeginEvent.getRemainingSeconds().toString().substr(0, 4)}`);
		} else if(this.willEndMeteo) {
			this.setText(`Meteo last in : ${this.timedEndEvent.getRemainingSeconds().toString().substr(0, 4)}`);
		}
    }

    public startEvent() {
        if(!this.isActive) {
            return
        }
        this.willStartMeteo = true;
        this.timedBeginEvent = this.scene.time.delayedCall(this.TIME_METEO_TO_BEGIN, this.getRandomEvent, [], this);
    }

    private getRandomEvent() {
        if(!this.isActive) {
            return
        }
        this.ballEventStart();
    }

    private ballEventStart() {
        if(!this.isActive) {
            return
        }
        if (this.scene.dataScene.meteo.ball) {
            this.scene.ballManager.balls.forEach(ball => {
                ball.setDisplaySize(100, 100);
            });
        }
        this.willEndMeteo = true;
        this.willStartMeteo = false;
        this.timedEndEvent = this.scene.time.delayedCall(this.TIME_METEO_TO_STOP, this.ballEventEnd, [], this);
    }

    private ballEventEnd() {
        if(!this.isActive) {
            return
        }
        if (this.scene.dataScene.meteo.ball) {
            this.scene.ballManager.balls.forEach(ball => {
                ball.setDisplaySize(this.scene.ballManager.BALL_DIAMETER, this.scene.ballManager.BALL_DIAMETER);
            });
        }
        this.willEndMeteo = false;
        this.willStartMeteo = true;
        this.timedBeginEvent = this.scene.time.delayedCall(this.TIME_METEO_TO_BEGIN, this.startEvent, [], this);
    }
}