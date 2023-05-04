import { PreScene } from "../preScene.ts";

export abstract class AbstractPong extends PreScene {
    protected player1!: Phaser.Physics.Arcade.Sprite;
    protected player2!: Phaser.Physics.Arcade.Sprite;
    protected sceneName!: string; 
    protected backgroundMusic!:
        Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound;
    private baseSpeedMovePlayer1!: number;

    //#region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.createPlayer1();
        this.createWorldBounds();
        this.createPauseKey();
    }

    update() {
        // For player1 => sprite
        this.handlePlayer1Movement();
    }
    //#endregion

    //#region [Abstract Methods]
    protected abstract createMusic(): void;
    protected abstract createPlayer1(): void;
    protected abstract createPlayer2(): void;
    protected abstract createBackground(): void;
    //#endregion

    //#region [Protected Methods]
    protected setSceneName(sceneName: string): void {
        this.sceneName = sceneName;
    }

    protected setPlayer1Speed(speed: number): void {
        this.baseSpeedMovePlayer1 = speed;
    }

    /**
     * Move player
     */
    protected handlePlayer1Movement() {
        const cursors = this.input.keyboard?.createCursorKeys();
        const playerBody = this.player1.body as Phaser.Physics.Arcade.Body;

        playerBody.setVelocity(0);
        let speedPlayerHeight = this.baseSpeedMovePlayer1;
        let speedPlayerWidth = this.baseSpeedMovePlayer1;

        if (cursors?.up.isDown) {
            playerBody.setVelocityY(-speedPlayerHeight);
        }

        if (cursors?.down.isDown) {
            playerBody.setVelocityY(speedPlayerHeight);
        }

        // Todo - Les controles gauche et droite servent à debuger - a supprimer
        if (cursors?.left.isDown) {
            playerBody.setVelocityX(-speedPlayerWidth);
        }
        if (cursors?.right.isDown) {
            playerBody.setVelocityX(speedPlayerWidth);
        }
    }

    /**
     * Reprend la music lorsque cette scene reprend
     */
    protected resumeMusicWhenSceneResume() {
        this.events.on("resume", () => {
            if (this.backgroundMusic.isPaused) {
                this.backgroundMusic.resume();
            }
        });
    }

    protected createWorldBounds() {
        // Set up the game bounds
        this.physics.world.setBounds(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);

        // Create a rectangle graphic with black line color
        // const boundsGraphic = this.add.graphics();
        // boundsGraphic.lineStyle(20, 0xFFFFFF);
        // boundsGraphic.strokeRect(this.physics.world.bounds.x, this.physics.world.bounds.y, this.physics.world.bounds.width, this.physics.world.bounds.height);
    }

    protected createPauseKey() {
        const escapeKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
        escapeKey?.on("down", () => {
            if (!this.scene.isPaused()) {
                this.scene.launch("PauseMenu", { sceneBeforePause: this.sceneName });
                this.scene.pause();
                if(this.backgroundMusic) {
                    this.backgroundMusic.pause();
                }
            }
        });
    }
    
    //#endregion
}
