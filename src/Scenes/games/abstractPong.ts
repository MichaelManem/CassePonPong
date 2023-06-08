import { Ball } from "../../gameObjects/ball.ts";
import { Player } from "../../gameObjects/player.ts";
import { PreScene } from "../preScene.ts";
export abstract class AbstractPong extends PreScene {
    protected readonly MULTIPLIER_POSITION_HEIGHT_PLAYER: number = 0.5;
	protected readonly NAME_TEXTURE_PLAYER1: string = "texturePlayer1";
	protected readonly NAME_TEXTURE_PLAYER2: string = "texturePlayer2";
	protected readonly NAME_TEXTURE_BALL: string = "textureBall";
    protected player1!: Player;
    protected player2!: Player;
    protected ball!: Ball;
    protected sceneName!: string;
    protected backgroundMusic!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    private scorePlayer1!: number;
    private scorePlayer2!: number;
    private scoreTextPlayer1!: Phaser.GameObjects.Text;
    private scoreTextPlayer2!: Phaser.GameObjects.Text;
    private readonly SCORE_MAX: number = 7;
	private readonly MULTIPLIUER_POSITION_SCORE_TO_PLAYER: number = 0.3;
    protected PLAYER_WIDTH_POSITION!: number;

    //#region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.createTexturePlayer();
        this.createPlayer1();
        this.createPlayer2();
        this.createTextureBall();
        this.createWorldBounds();
        this.createPauseKey();
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.scoreTextPlayer1 = this.createScore(0.35);
        this.scoreTextPlayer2 = this.createScore(0.65);
    }

    update() {
        this.player1.move();
        this.player2.move();
        this.handleScoring();
    }

    //#endregion

    //#region [Abstract Methods]
    protected abstract createMusic(): void;
    protected abstract createTexturePlayer(): void;
    protected abstract createPlayer1(): void;
    protected abstract createPlayer2(): void;
    protected abstract createTextureBall(): void;
    protected abstract createBall(): void;
    protected abstract createBackground(): void;
    //#endregion

    //#region [Protected Methods]
    protected setSceneName(sceneName: string): void {
        this.sceneName = sceneName;
    }

	protected getMultiplierPositionXForLimitToScore() {
		return (this.MULTIPLIUER_POSITION_SCORE_TO_PLAYER) * this.PLAYER_WIDTH_POSITION;
	}

    private handleScoring(): void {
        let worldWidthSmallPart: number = this.WIDTH_WORLD * this.getMultiplierPositionXForLimitToScore();

        if (!this.ball) {
            console.error("Ball doesn't exist");
            return;
        }
        if (!this.player1) {
            console.error("Player1 doesn't exist");
            return;
        }
        if (!this.player2) {
            console.error("Player2 doesn't exist");
            return;
        }

        if (this.ball.x < this.player1.x - worldWidthSmallPart) {
            this.scorePlayer2 += 1;
            this.scoreTextPlayer2.setText(this.scorePlayer2.toString());
            this.ball.resetBallPosition();

        } else if (this.ball.x > this.player2.x + worldWidthSmallPart) {
            this.scorePlayer1 += 1;
            this.scoreTextPlayer1.setText(this.scorePlayer1.toString());
            this.ball.resetBallPosition();

        } else if (this.scorePlayer1 >= this.SCORE_MAX || this.scorePlayer2 >= this.SCORE_MAX) {
            this.scene.launch("PauseMenu", { sceneBeforePause: this.sceneName });
            this.scene.pause();
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
            }
        }
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


    private createScore(widthPositionMultiplier: number): Phaser.GameObjects.Text {
        return this.add.text(
            this.WIDTH_WORLD * widthPositionMultiplier,
            this.HEIGHT_WORLD * 0.125,
            "0",
            {
                font: `6rem Arial`,
                color: "#fff",
                stroke: "#00000",
                strokeThickness: 30,
            })
            // setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence.
            // O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
            .setOrigin(0.5);

    }
    //#endregion
}
