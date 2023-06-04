import { AbstractPong } from "../abstractPong.ts";

export class OldPong extends AbstractPong {
	private player1Speed: number = 1500;
	private player2Speed: number = 1500;
	private readonly PLAYER_WIDTH_POSITION: number = 0.17;
	private readonly PLAYER_WIDTH: number = 20;
	private readonly PLAYER_HEIGHT: number = 150;
	private readonly BALL_DIAMETER: number = 20;

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

	protected createPlayer1(): void {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player1 = this.physics.add
			.sprite(this.calculatePlayerWidth(this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "whiteRect")
			.setImmovable(true)
			.setCollideWorldBounds(true);
	}

	protected createPlayer2(): void {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player2 = this.physics.add
			.sprite(this.calculatePlayerWidth(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "whiteRect")
			.setImmovable(true)
			.setCollideWorldBounds(true);
	}

	private createMiddleLine(): void {
		this.createMiddleLinePart();

		for (let i = 0; i <= 1.05; i += 0.05) {
			this.physics.add.sprite(this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * i, "middleLinePart");
		}
	}

	private createTexturePlayer(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0xffffff);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Generate a texture from the Graphics object
		graphics.generateTexture("whiteRect", this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Destroy the Graphics object
		graphics.destroy();
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
		graphics.fillRect(0, 0, this.BALL_DIAMETER, this.BALL_DIAMETER);
		graphics.generateTexture("whiteCube", this.BALL_DIAMETER, this.BALL_DIAMETER);
		graphics.destroy();

		this.ball = this.physics.add
			.sprite(this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, "whiteCube")
			.setCollideWorldBounds(true);

		this.resetBallPosition();
		let ballSpeedX = this.ballSpeed;
		let ballSpeedY = this.ballSpeed / 2;

		this.physics.add.overlap(this.player1, this.ball, (player, ball) => {
			// Le y = 0 est en haut de l'écran
			//        35° - 90° - 35°
			//Pong => Top   milieu  bot
			//   	  100     0    100
			let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
			let ballDirection = 1; // 1 vers le bas et -1 vers le haut
			if(ball.y < player.y) {
				ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
				ballDirection = -1;
			}
			ball.setVelocity(ballSpeedX, ballDirection * ballSpeedY * ballPosPercentPlayer);
		});

		this.physics.add.overlap(this.player2, this.ball, function (player, ball) {
			// Le y = 0 est en haut de l'écran
			//        35° - 90° - 35°
			//Pong => Top   milieu  bot
			//   	  100     0    100
			let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
			let ballDirection = 1; // 1 vers le bas et -1 vers le haut
			if(ball.y < player.y) {
				ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
				ballDirection = -1;
			}
			ball.setVelocity(-ballSpeedX, ballDirection * ballSpeedY * ballPosPercentPlayer);
		});
	}

}
