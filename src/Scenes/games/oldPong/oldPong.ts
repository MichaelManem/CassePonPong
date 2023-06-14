import { Ball } from "../../../gameObjects/ball.ts";
import { AbstractPong } from "../abstractPong.ts";
import { Player } from "../../../gameObjects/player.ts";

export class OldPong extends AbstractPong {

	constructor() {
		super({ key: "OldPong" });
		this.setSceneName("OldPong");
		this.PLAYER_WIDTH_POSITION = 0.17;
	}

	// #region preload
	preload() {
		super.preload();
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
        this.createMiddleLinePart();
	}

	create() {
		super.create();
		this.createMiddleLine();
		this.scorePlayer1.MAX_SCORE = 1;
		this.scorePlayer2.MAX_SCORE = 1;
	}
	// #endregion

	//#region private method

	protected createBackground(): void {
		const graphics = this.add.graphics();
		graphics.fillStyle(0x00000);
		graphics.fillRect(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);
		graphics.generateTexture("blackRect", this.WIDTH_WORLD, this.HEIGHT_WORLD);
		graphics.destroy();
		const background = this.add.image(0, 0, "blackRect").setOrigin(0, 0);
		background.displayWidth = this.game.canvas.width;
		background.displayHeight = this.game.canvas.height;
	}

	protected createMusic(): void {
		this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
		this.backgroundMusic.play();

		// Créer un evenement qui va etre appelé lors du 'resume' de cette scene
		this.resumeMusicWhenSceneResume();
	}
	
	protected createTexturePlayer(): void {
		const graphics = this.add.graphics();
		graphics.fillStyle(0xffffff);
		graphics.fillRect(0, 0, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER1, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER2, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		graphics.destroy();
	}

	protected createPlayer1(): Player {
		return new Player(
			this, 
			this.PLAYER_WIDTH_POSITION, 
			this.MULTIPLIER_POSITION_HEIGHT_PLAYER, 
			this.NAME_TEXTURE_PLAYER1, 
			'Z', 
			'S'
		);
	}

	protected createPlayer2(): Player {
		return new Player(
			this, 
			(1 - this.PLAYER_WIDTH_POSITION), 
			this.MULTIPLIER_POSITION_HEIGHT_PLAYER, 
			this.NAME_TEXTURE_PLAYER2, 
			'Up', 
			'Down'
		);
	}
	
    protected createTextureBall() {
        const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.generateTexture(this.NAME_TEXTURE_BALL, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.destroy();
    }

	protected createBall(): Ball {
		return new Ball(this, this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL);
	}

	private createMiddleLine(): void {
		this.createMiddleLinePart();

		for (let i = 0; i <= 1.05; i += 0.05) {
			this.physics.add.sprite(this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * i, "middleLinePart");
		}
	}

	private createMiddleLinePart(): void {
		const graphics = this.add.graphics();
		graphics.fillStyle(0xffffff, 0.25);
		graphics.fillRect(0, 0, 5, 25);
		graphics.generateTexture("middleLinePart", 5, 25);
		graphics.destroy();
	}
	//----------------------------
	//#endregion - private method
}
