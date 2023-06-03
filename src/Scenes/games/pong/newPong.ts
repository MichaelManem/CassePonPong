import { Ball } from "../../../gameObjects/ball.ts";
import { AbstractPong } from "../abstractPong.ts";

export class NewPong extends AbstractPong {
	private player1Speed: number = 1300;
	private player2Speed: number = 1300;
	private readonly PLAYER_WIDTH_POSITION: number = 0.02;

	constructor() {
		super({ key: "NewPong" });
		this.setSceneName("NewPong");
		this.setPlayer1Speed(this.player1Speed);
		this.setPlayer2Speed(this.player2Speed);
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

	//#region - abstract method implemented
	//-------------------------------------

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

	protected createPlayer1(): void {
		this.player1 = this.physics.add
			.sprite(this.calculatePlayerWidth(this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "player")
			.setCollideWorldBounds(true);
		this.player1.flipX = true;
	}

	protected createPlayer2(): void {
		this.player2 = this.physics.add
			.sprite(this.calculatePlayerWidth(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeight(), "player2")
			.setCollideWorldBounds(true);
		this.player2.flipX = true;
	}

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
	//----------------------------------------
	//#endregion - abstract method implemented
}
