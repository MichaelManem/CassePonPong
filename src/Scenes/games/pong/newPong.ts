import { Ball } from "../../../gameObjects/ball.ts";
import { AbstractPong } from "../abstractPong.ts";
import { Player } from "../../../gameObjects/player.ts";

export class NewPong extends AbstractPong {

	constructor() {
		super({ key: "NewPong" });
		this.setSceneName("NewPong");
		this.PLAYER_WIDTH_POSITION = 0.02;
	}

	preload() {
		this.load.image("player", "assets/images/Player.png");
		this.load.image("player2", "assets/images/Player2.png");
		this.load.image("background", "assets/images/backgrounds/rock_lunar.avif");
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	create() {
		super.create();
		this.createBall();
	}

	//#region - method
	//----------------

	protected createBackground(): void {
		const background = this.add.image(0, 0, "background").setOrigin(0, 0);
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
		graphics.fillRect(0, 0, 10, 60);

		// Generate a texture from the Graphics object
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER1, 10, 60);
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER2, 10, 60);

		// Destroy the Graphics object
		graphics.destroy();
	}

	protected createPlayer1(): void {
		this.player1 = new Player(this, this.PLAYER_WIDTH_POSITION, this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER1, 'Z', 'S');
		this.player1.flipX = true;
	}

	protected createPlayer2(): void {
		this.player2 = new Player(this, (1 - this.PLAYER_WIDTH_POSITION), this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER2, 'Up', 'Down');
	}
	
    protected createTextureBall() {
        const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, 10, 10);
        graphics.generateTexture(this.NAME_TEXTURE_BALL, 10, 10);
        graphics.destroy();
    }

	protected createBall(): void {
        // Create a new instance of the Ball class
		this.ball = new Ball(this, this.WIDTH_WORLD * 0.5, this.HEIGHT_WORLD * 0.5, this.NAME_TEXTURE_BALL); 
        
        // Add collider with player1
        this.ball.addColliderWith(this.player1, function (player, ball) {
            if (ball instanceof Ball && ball.body) {
                ball.setVelocity(ball.speedX, ball.body.velocity.y);
            }
        });

        // Add collider with player2
        this.ball.addColliderWith(this.player2, function (player, ball) {
            if (ball instanceof Ball && ball.body) {
				let velocityY = ball.body.velocity.y;
				velocityY = velocityY <= ball.speedY ? velocityY : ball.speedY;
                ball.setVelocity(-ball.speedX, ball.body.velocity.y);
            }
        });
	}
	//-------------------
	//#endregion - method
}
