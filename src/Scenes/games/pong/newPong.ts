import { Ball } from "../../../gameObjects/ball";
import { BallManager } from "../../../gameObjects/ballManager";
import { BrickManager } from "../../../gameObjects/brick/brickManager";
import { BrickMaps } from "../../../gameObjects/brick/brickMaps";
import { Player } from "../../../gameObjects/player";
import { AbstractPong } from "../abstractPong";
type AllBalls = Ball;

export class NewPong extends AbstractPong {
	protected brickManager!: BrickManager;

	constructor() {
		super({ key: "NewPong" });
		this.setSceneName("NewPong");
		this.PLAYER_WIDTH_POSITION = 0.05;
	}

	preload() {
		super.preload();
		this.load.image("player", "assets/images/Player.png");
		this.load.image("player2", "assets/images/Player2.png");
		this.load.image("background", "assets/images/backgrounds/bleu_rose.webp");
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
		this.load.audio("hitPaddle", "assets/musics/Pong Old Pong.mp3");
		this.load.audio("hitWall", "assets/musics/Hall Old Pong.mp3");
		this.load.audio("scorePoint", "assets/musics/Point Old Pong.mp3");
	}

	create() {
		super.create();
		let typeBalls = ["ball", "ball", "ball", "ball"];
		this.createBalls(typeBalls);

		this.brickManager = new BrickManager(this);
		this.createBricks();
	}

	update() {
		super.update();
		this.brickManager.handleBricks();
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
		graphics.fillRect(0, 0, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Generate a texture from the Graphics object
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER1, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER2, this.PLAYER_WIDTH, this.PLAYER_HEIGHT);

		// Destroy the Graphics object
		graphics.destroy();
	}

	protected createPlayer1(): Player {
		let player1: Player = new Player(this, this.PLAYER_WIDTH_POSITION, this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER1, 'Z', 'S');
		player1.flipX = true;
		return player1;
	}

	protected createPlayer2(): Player {
		return new Player(this, (1 - this.PLAYER_WIDTH_POSITION), this.MULTIPLIER_POSITION_HEIGHT_PLAYER, this.NAME_TEXTURE_PLAYER2, 'Up', 'Down');
	}

	protected createBalls(typeBalls: string[]): void {
		this.ballManager = new BallManager(this);
		this.ballManager.createTextureBallNewPong();
		this.ballManager.setDiameter(this.dataScene.sizeBall);
		this.ballManager.setSpeedStart(this.dataScene.speedBall);
		this.ballManager.setAddSpeed(this.dataScene.addSpeedBall);
        this.ballManager.createBalls(typeBalls);
        this.ballManager.resetBallsPosition();
        this.ballManager.addOverlapWith(this.player1, this.player2);
    }

	private createBricks(): void {
		switch (this.dataScene.buttonMap.name) {
			case BrickMaps.names['MAP_1']:
				this.brickManager.setupBrickMap1();
				break;
			case BrickMaps.names['MAP_2']:
				this.brickManager.setupBrickMap2();
				break;
			case BrickMaps.names['MAP_3']:
				this.brickManager.setupBrickMap3();
				break;
			case BrickMaps.names['MAP_4']:
				this.brickManager.setupBrickMap4();
				break;
			case BrickMaps.names['MAP_RANDOM']:
				this.brickManager.setupBrickMapRandom(this.dataScene.nbBrickToMapRandom);
				break;
			default:
				this.brickManager.setupBrickMapRandom(10);
				break;
		}
		this.ballManager.balls.forEach(ball => {
			this.brickManager.addOverlapWith(ball);
		});
	}

	protected doEndGame(): void {
		this.scene.launch("NewVictoryMenu", { sceneToRestart: this.sceneName, winnerName: this.getNameWinner(), displayScorePlayer1: this.scorePlayer1, displayScorePlayer2: this.scorePlayer2 });
		this.scene.stop();

		if (this.backgroundMusic) {
			this.backgroundMusic.pause();
		}
	}
	//-------------------
	//#endregion - method
}
