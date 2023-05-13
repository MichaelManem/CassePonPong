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
    private baseSpeedMovePlayer2!: number;
	private readonly MULTIPLIER_POSITION_HEIGHT_PLAYER: number = 0.5;
    
    //#region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.createPlayer1();
        this.createPlayer2();
        this.createWorldBounds();
        this.createPauseKey();
    }

    update() {
        // For player1 => sprite
        this.handlePlayer1Movement();
        this.handlePlayer2Movement();
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

    protected setPlayer2Speed(speed: number): void {
        this.baseSpeedMovePlayer2 = speed;
    }


    /**
     * Move player
     */
    protected handlePlayer1Movement(): void {
        const cursors = this.input.keyboard?.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.Z, 'down': Phaser.Input.Keyboard.KeyCodes.S});
        const playerBody = this.player1.body as Phaser.Physics.Arcade.Body;

        playerBody.setVelocity(0);
        let speedPlayerHeight = this.baseSpeedMovePlayer1;

        if (cursors?.up.isDown) {
            playerBody.setVelocityY(-speedPlayerHeight);
        }

        if (cursors?.down.isDown) {
            playerBody.setVelocityY(speedPlayerHeight);
        }
    }

    protected handlePlayer2Movement(): void {
        const cursors = this.input.keyboard?.createCursorKeys();
        const playerBody = this.player2.body as Phaser.Physics.Arcade.Body;

        playerBody.setVelocity(0);
        let speedPlayerHeight = this.baseSpeedMovePlayer2;
        
        if (cursors?.up.isDown) {
            playerBody.setVelocityY(-speedPlayerHeight);
        }

        if (cursors?.down.isDown) {
            playerBody.setVelocityY(speedPlayerHeight);
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

        // Create a rectangle graphic with black line color
        // const boundsGraphic = this.add.graphics();
        // boundsGraphic.lineStyle(20, 0xFFFFFF);
        // boundsGraphic.strokeRect(this.physics.world.bounds.x, this.physics.world.bounds.y, this.physics.world.bounds.width, this.physics.world.bounds.height);
    }

    protected createPauseKey(): void {
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

    protected calculatePlayerHeight(): number {
        return this.HEIGHT_WORLD * this.MULTIPLIER_POSITION_HEIGHT_PLAYER;
    }

    protected calculatePlayerWidth(multiplier: number): number {
        return this.WIDTH_WORLD * multiplier;
    }
    
    //#endregion
}
