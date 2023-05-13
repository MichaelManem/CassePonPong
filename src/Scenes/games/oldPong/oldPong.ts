import { AbstractPong } from "../abstractPong.ts";

export class OldPong extends AbstractPong {
	private player1Speed: number = 1000;
	private player2Speed: number = 1000;
	private readonly PLAYER_WIDTH_POSITION: number = 0.17;
	private ball: Phaser.Physics.Arcade.Sprite;

	constructor() {
		super({ key: "OldPong" });
		this.setSceneName("OldPong");
		this.setPlayer1Speed(this.player1Speed);
		this.setPlayer2Speed(this.player2Speed);
	}

	// #region preload
	preload() {
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	create() {
		super.create();
		this.createBall();
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

	protected createPlayer1(): void {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player1 = this.physics.add
			.sprite(this.calculatePlayerWidth(this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "whiteRect")
			.setCollideWorldBounds(true);
	}

	protected createPlayer2(): void {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player2 = this.physics.add
			.sprite(this.calculatePlayerWidth(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "whiteRect")
			.setCollideWorldBounds(true);
	}

	private createTexturePlayer(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0xffffff);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, 10, 60);

		// Generate a texture from the Graphics object
		graphics.generateTexture("whiteRect", 10, 60);

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
		console.log(startY);
		

		this.ball.setVelocity(startX, startY);
		this.ball.setBounce(1);

		this.physics.add.collider(this.player1, this.ball, function (player, ball) {
			ball.setVelocity(ball.body.velocity.x, ball.body.velocity.y);
		});
		
		this.physics.add.collider(this.player2, this.ball, function (player, ball) {
			ball.setVelocity(-ball.body.velocity.x, ball.body.velocity.y);
		});
	}

	getRandomArbitrary(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}
}
