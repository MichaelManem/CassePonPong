import { AbstractPong } from "../abstractPong.ts";
import { Player } from "../../../gameObjects/player.ts";

export class OldPong extends AbstractPong {
	private readonly PLAYER_WIDTH_POSITION: number = 0.17;

	constructor() {
		super({ key: "OldPong" });
		this.setSceneName("OldPong");
	}

	// #region preload
	preload() {
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	create() {
		super.create();
		this.createBall();
		this.createMiddleLine();
	}
	// #endregion

	//#region private method

	/**
	 * Creation de l'image du fond
	 */
	protected createBackground(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0x00000);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);

		// Generate a texture from the Graphics object
		graphics.generateTexture("blackRect", this.WIDTH_WORLD, this.HEIGHT_WORLD);

		// Destroy the Graphics object
		graphics.destroy();

		const background = this.add.image(0, 0, "blackRect").setOrigin(0, 0);
		background.displayWidth = this.game.canvas.width;
		background.displayHeight = this.game.canvas.height;
	}

	/**
	 * Créer la music en fond
	 */
	protected createMusic(): void {
		this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
		this.backgroundMusic.play();

		// Créer un evenement qui va etre appelé lors du 'resume' de cette scene
		this.resumeMusicWhenSceneResume();
	}
	
	protected createTexturePlayer(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0xffffff);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, 10, 60);

		// Generate a texture from the Graphics object
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER, 10, 60);

		// Destroy the Graphics object
		graphics.destroy();
	}

	protected createPlayer1(): void {
		this.player1 = new Player(this, this.calculatePlayerWidthPosition(this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeightPosition(), this.NAME_TEXTURE_PLAYER, 'Z', 'S');
	}

	protected createPlayer2(): void {
		this.player2 = new Player(this, this.calculatePlayerWidthPosition(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeightPosition(), this.NAME_TEXTURE_PLAYER, 'Up', 'Down');
	}

	private createMiddleLine(): void {
		this.createMiddleLinePart();

		for (let i = 0; i <= 1.05; i += 0.05) {
			this.physics.add.sprite(this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * i, "middleLinePart");
		}
	}

	private createMiddleLinePart(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0xffffff);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, 5, 25);

		// Generate a texture from the Graphics object
		graphics.generateTexture("middleLinePart", 5, 25);

		// Destroy the Graphics object
		graphics.destroy();
	}
	//----------------------------
	//#endregion - private method

	private createBall(): void {
		const graphics = this.add.graphics();
		graphics.fillStyle(0xffffff);
		graphics.fillRect(0, 0, 10, 10);
		graphics.generateTexture("whiteCube", 10, 10);
		graphics.destroy();

		this.ball = this.physics.add
			.sprite(this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, "whiteCube")
			.setCollideWorldBounds(true);

		const startY: number = this.getRandomArbitrary(-250, 250);
		const startX: number = 500;

		this.ball.setVelocity(startX, startY);
		this.ball.setBounce(1);

		this.physics.add.collider(this.player1, this.ball, function (player, ball) {
			ball.setVelocity(startX, ball.body.velocity.y);
		});

		this.physics.add.collider(this.player2, this.ball, function (player, ball) {
			ball.setVelocity(-startX, ball.body.velocity.y);
		});
	}

}
