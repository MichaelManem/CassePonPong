import { Ball } from "../../../gameObjects/ball.ts";
import { AbstractPong } from "../abstractPong.ts";

export class OldPong extends AbstractPong {
	private player1Speed: number = 1000;
	private player2Speed: number = 1000;
	private readonly PLAYER_WIDTH_POSITION: number = 0.17;


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
			.setCollideWorldBounds(true);
	}

	protected createPlayer2(): void {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player2 = this.physics.add
			.sprite(this.calculatePlayerWidth(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "whiteRect")
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
		graphics.fillRect(0, 0, 10, 60);

		// Generate a texture from the Graphics object
		graphics.generateTexture("whiteRect", 10, 60);

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

	protected createBall(): void {
        // Create a new instance of the Ball class
		const ballInstance: Ball = new Ball(this, this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, "whiteCube"); 
        this.ball = ballInstance.getSprite();

        const startX: number = 500;
        
        // Add collider with player1
        ballInstance.addColliderWith(this.player1, function (player, ball) {
            if (ball instanceof Phaser.Physics.Arcade.Sprite && ball.body) {
                ball.setVelocity(startX, ball.body.velocity.y);
            }
        });

        // Add collider with player2
        ballInstance.addColliderWith(this.player2, function (player, ball) {
            if (ball instanceof Phaser.Physics.Arcade.Sprite && ball.body) {
                ball.setVelocity(-startX, ball.body.velocity.y);
            }
        });
	}
}
