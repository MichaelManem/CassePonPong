import { PreScene } from "../preScene.ts";
export abstract class AbstractPong extends PreScene {
    protected player1!: Phaser.Physics.Arcade.Sprite;
    protected player2!: Phaser.Physics.Arcade.Sprite;
    protected sceneName!: string;
    protected backgroundMusic!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    private scorePlayer1!: number;
    private scorePlayer2!: number;
    private scoreTextPlayer1!: Phaser.GameObjects.Text;
    private scoreTextPlayer2!: Phaser.GameObjects.Text;
    private baseSpeedMovePlayer1!: number;
    private baseSpeedMovePlayer2!: number;
    private readonly MULTIPLIER_POSITION_HEIGHT_PLAYER: number = 0.5;
    private readonly SCORE_MAX: number = 7;
    protected ball!: Phaser.Physics.Arcade.Sprite;

    //#region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.createPlayer1();
        this.createPlayer2();
        this.createWorldBounds();
        this.createPauseKey();
        this.scorePlayer1 = 0;
        this.scorePlayer2 = 0;
        this.scoreTextPlayer1 = this.createScore(0.35);
        this.scoreTextPlayer2 = this.createScore(0.65);
    }

    update() {
        // For player1 => sprite
        this.handlePlayer1Movement();
        this.handlePlayer2Movement();
        this.handleScoring();
    }

    //#endregion

    //#region [Abstract Methods]
    protected abstract createMusic(): void;
    protected abstract createPlayer1(): void;
    protected abstract createPlayer2(): void;
    protected abstract createBall(): void;
    protected abstract createBackground(): void;
    //#endregion

    //#region [Protected Methods]
    protected setSceneName(sceneName: string): void {
        this.sceneName = sceneName;
    }

    protected setPlayer1Speed(speed: number): void {
        this.baseSpeedMovePlayer1 = speed;
    }

    protected setPlayer2Speed(speed: number): void {
        this.baseSpeedMovePlayer2 = speed;
    }

    /**
     * Move player
     */
    protected handlePlayer1Movement(): void {
        const cursors = this.input.keyboard?.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
        }) as Phaser.Types.Input.Keyboard.CursorKeys | undefined;

        if (!cursors) return;

        const playerBody = this.player1;
        playerBody.setVelocity(0);
        let speedPlayerHeight = this.baseSpeedMovePlayer1;

        if (cursors.up.isDown) {
            playerBody.setVelocityY(-speedPlayerHeight);
        }

        if (cursors.down.isDown) {
            playerBody.setVelocityY(speedPlayerHeight);
        }
    }

    protected handlePlayer2Movement(): void {
        const cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys | undefined;

        if (!cursors) return;

        const playerBody = this.player2;
        playerBody.setVelocity(0);
        let speedPlayerHeight = this.baseSpeedMovePlayer2;

        if (cursors.up.isDown) {
            playerBody.setVelocityY(-speedPlayerHeight);
        }

        if (cursors.down.isDown) {
            playerBody.setVelocityY(speedPlayerHeight);
        }
    }



    private handleScoring(): void {
        let worldWidthSmallPart: number = this.WIDTH_WORLD * 0.05; // TODO : Handle newPong, 0.05 is too high

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
            this.resetBallPosition();

        } else if (this.ball.x > this.player2.x + worldWidthSmallPart) {
            this.scorePlayer1 += 1;
            this.scoreTextPlayer1.setText(this.scorePlayer1.toString());
            this.resetBallPosition();

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

    protected calculatePlayerHeight(): number {
        return this.HEIGHT_WORLD * this.MULTIPLIER_POSITION_HEIGHT_PLAYER;
    }

    protected calculatePlayerWidth(multiplier: number): number {
        return this.WIDTH_WORLD * multiplier;
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

    private resetBallPosition(): void {
        this.ball.x = this.WIDTH_WORLD * 0.5;
        this.ball.y = this.HEIGHT_WORLD * 0.5;

        // Reset random ball velocity
        const startY: number = this.getRandomArbitrary(-250, 250);
        const startX: number = 500;
        this.ball.setVelocity(startX, startY);
    }

    protected getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    //#endregion
}
