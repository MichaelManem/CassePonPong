import { PreScene } from "../preScene";

export abstract class AbstractPong extends PreScene {
    protected player1!: Phaser.Physics.Arcade.Sprite;
    protected player2!: Phaser.Physics.Arcade.Sprite;
    protected backgroundMusic!:
        | Phaser.Sound.NoAudioSound
        | Phaser.Sound.HTML5AudioSound
        | Phaser.Sound.WebAudioSound;
    private baseSpeedMovePlayer1!: number;
    protected sceneName!: string;

    //#region - phaser method

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

    //#endregion - phaser method

    //--------------------------

    //#region - abstract method

    protected abstract createMusic(): void;
    protected abstract createPlayer1(): void;
    protected abstract createPlayer2(): void;
    protected abstract createBackground(): void;

    //#endregion - abstract method

    //--------------------------

    //#region - protected method

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
                let dataPauseScene = { sceneBeforePause: this.sceneName };
                console.log("this.sceneName", this.sceneName);
                console.log("dataPauseScene", dataPauseScene);
                this.scene.launch("PauseScene", dataPauseScene);
                this.scene.pause();
                if(this.backgroundMusic) {
                    this.backgroundMusic.pause();
                }
            }
        });
    }
    
    //#endregion - protected method
}
