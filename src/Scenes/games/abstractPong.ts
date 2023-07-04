import { Ball } from "../../gameObjects/ball";
import { BallManager } from "../../gameObjects/ballManager";
import { Player } from "../../gameObjects/player";
import { Score } from "../../gameObjects/score";
import { PreScene } from "../preScene";
type AllBalls = Ball;

export abstract class AbstractPong extends PreScene {
	protected readonly NAME_TEXTURE_PLAYER1: string = "texturePlayer1";
	protected readonly NAME_TEXTURE_PLAYER2: string = "texturePlayer2";
	protected readonly NAME_TEXTURE_BALL: string = "textureBall";

    protected readonly MULTIPLIER_POSITION_HEIGHT_PLAYER: number = 0.5;
    private readonly MULTIPLIER_POSITION_WIDTH_SCORE1: number = 0.35;
    private readonly MULTIPLIER_POSITION_WIDTH_SCORE2: number = 0.65;
    private readonly MULTIPLIER_POSITION_HEIGHT_SCORE: number = 0.125;

	protected PLAYER_WIDTH: number = 20;
	protected PLAYER_HEIGHT: number = 120;
	protected COLOR_PLAYER1: number = 0xffffff;
	protected COLOR_PLAYER2: number = 0xffffff;
	protected BALL_DIAMETER: number = 20;
	protected COLOR_BALL: number = 0xffffff;
    protected PLAYER_WIDTH_POSITION!: number;

    protected sceneName!: string;
    protected dataScene!: any;
    protected backgroundMusic!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    
    protected player1!: Player;
    protected player2!: Player;
    protected ballManager!: BallManager;
    private scorePlayer1!: Score;
    private scorePlayer2!: Score;

	init(data: any) {
		this.dataScene = data;
	}

    preload(): void {
        super.preload();
        this.createTexturePlayer();
    }

    //#region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.player1 = this.createPlayer1();
        this.player2 = this.createPlayer2();
        this.createWorldBounds();
        this.createPauseKey();
        this.scorePlayer1 = this.createScore(this.MULTIPLIER_POSITION_WIDTH_SCORE1, this.MULTIPLIER_POSITION_HEIGHT_SCORE);
        this.scorePlayer2 = this.createScore(this.MULTIPLIER_POSITION_WIDTH_SCORE2, this.MULTIPLIER_POSITION_HEIGHT_SCORE);
        this.events.on("resume", (scene: this, data: any) => {
            if (data !== undefined && data.resetBall) {
                this.ballManager.resetBallsPosition();
            }
        });
    }

    update() {
        this.player1.move();
        this.player2.move();
        this.handleScores();
    }

    private handleScores() {
        this.ballManager.balls.forEach(ball => {
            if (this.scorePlayer1.handleScoring(ball, this.player2)) {
                this.ballManager.resetBallPosition(ball);
            } else if (this.scorePlayer2.handleScoring(ball, this.player1)) {
                this.ballManager.resetBallPosition(ball);
            }
        });
    }

    //#endregion

    //#region [Abstract Methods]
    protected abstract createMusic(): void;
    protected abstract createTexturePlayer(): void;
    protected abstract createPlayer1(): Player;
    protected abstract createPlayer2(): Player;
    protected abstract createBalls(typeBalls: string[]): void;
    protected abstract createBackground(): void;
    //#endregion

    //#region [Protected Methods]
    protected setSceneName(sceneName: string): void {
        this.sceneName = sceneName;
    }

    /**
     * Reprend la music lorsque cette scene reprend
     */
    protected resumeMusicWhenSceneResume(): void {
        this.events.on("resume", () => {
            if (this.backgroundMusic.isPaused) {
                this.backgroundMusic.resume();
            }
        });
    }

    protected createWorldBounds(): void {
        // Set up the game bounds
        this.physics.world.setBounds(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);
    }

    protected createPauseKey(): void {
        const escapeKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        escapeKey?.on("down", () => {
            if (!this.scene.isPaused()) {
                this.scene.launch("PauseMenu", { sceneBeforePause: this.sceneName });
                this.scene.pause();
                if (this.backgroundMusic) {
                    this.backgroundMusic.pause();
                }
            }
        });
    }

    private createScore(widthPositionMultiplier: number, heightPositionMultiplier: number): Score {
        return new Score(this, this.PLAYER_WIDTH_POSITION, widthPositionMultiplier, heightPositionMultiplier, "0", {
            font: `6rem Arial`,
            color: "#fff",
            stroke: "#00000",
            strokeThickness: 30,
        });
    }
    //#endregion
}
