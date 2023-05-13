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
    private cursorsPlayer1!: any;
    private cursorsPlayer2!: any;
    
    // #region [Phaser Methods]
    create() {
        super.create();
        this.createMusic();
        this.createBackground();
        this.createWorldBounds();
        this.createPauseKey();
        this.cursorsPlayer1 = this.input.keyboard?.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.Z, 'down': Phaser.Input.Keyboard.KeyCodes.S});
        this.cursorsPlayer2 = this.input.keyboard?.createCursorKeys();
    }

    update() {
        // For player1 => sprite
        this.handlePlayerMovement(this.player1, this.cursorsPlayer1, this.baseSpeedMovePlayer1);
        this.handlePlayerMovement(this.player2, this.cursorsPlayer2, this.baseSpeedMovePlayer2);
    }
    // #endregion

    //#region [Abstract Methods]
    protected abstract createMusic(): void;
    protected abstract createBackground(): void;
    // #endregion

    // #region [Protected Methods]
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
    protected handlePlayerMovement(player: Phaser.Physics.Arcade.Sprite, cursors: any, speed: number): void {
        const playerBody = player.body as Phaser.Physics.Arcade.Body;

        playerBody.setVelocity(0);
        
        if (cursors?.up.isDown) {
            playerBody.setVelocityY(-speed);
        }

        if (cursors?.down.isDown) {
            playerBody.setVelocityY(speed);
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

	protected createPlayer(playerWidthPosition: number, textureName: string): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
		return this.physics.add
			.sprite(this.calculatePlayerWidth(playerWidthPosition), this.calculatePlayerHeight(), textureName)
			.setCollideWorldBounds(true);
	}

    // #endregion
}
