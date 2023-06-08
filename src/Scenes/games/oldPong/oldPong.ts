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
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	create() {
		super.create();
		this.createBall();
		this.createMiddleLine();
	}
	// #endregion

	//#region private method

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
		graphics.fillRect(0, 0, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Generate a texture from the Graphics object
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER1, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER2, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Destroy the Graphics object
		graphics.destroy();
	}

	protected createPlayer1(): void {
		this.player1 = new Player(this, this.PLAYER_WIDTH_POSITION, this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER1, 'Z', 'S');
	}

	protected createPlayer2(): void {
		this.player2 = new Player(this, (1 - this.PLAYER_WIDTH_POSITION), this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER2, 'Up', 'Down');
	}
	
    protected createTextureBall() {
        const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.generateTexture(this.NAME_TEXTURE_BALL, this.BALL_DIAMETER, this.BALL_DIAMETER);
        graphics.destroy();
    }

	protected createBall(): void {
        // Create a new instance of the Ball class
		this.ball = new Ball(this, this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL); 
        
		// TODO - Il faudrait que l'addition des velocité X et y reste constante peu importe l'angle que prend la balle
        this.ball.addColliderWith(this.player1, function (player, ball) {
			// Le y = 0 est en haut de l'écran
			//        35° - 90° - 35°
			//Pong => Top   milieu  bot
			//   	  100     0    100
            if (ball instanceof Ball && ball.body) {
				let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
				let ballDirection = 1; // 1 vers le bas et -1 vers le haut
				if(ball.y < player.y) {
					ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
					ballDirection = -1;
				}
				ball.setVelocity(ball.speedX, ballDirection * ball.speedY * ballPosPercentPlayer);
			}
        });

		this.ball.addColliderWith(this.player2, function (player, ball) {
			// Le y = 0 est en haut de l'écran
			//        35° - 90° - 35°
			//Pong => Top   milieu  bot
			//   	  100     0    100
            if (ball instanceof Ball && ball.body) {
				let ballPosPercentPlayer = (ball.y - player.y) / (player.height / 2);
				let ballDirection = 1; // 1 vers le bas et -1 vers le haut
				if(ball.y < player.y) {
					ballPosPercentPlayer = (player.y - ball.y) / (player.height / 2);
					ballDirection = -1;
				}
				ball.setVelocity(-ball.speedX, ballDirection * ball.speedY * ballPosPercentPlayer);
			}
        });
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
}
