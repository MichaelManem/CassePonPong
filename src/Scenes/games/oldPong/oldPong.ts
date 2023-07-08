import { AbstractPong } from "../abstractPong.ts";
import { Player } from "../../../gameObjects/player.ts";
import { BallManager } from "../../../gameObjects/ballManager.ts";

export class OldPong extends AbstractPong {

	constructor() {
		super({ key: "OldPong" });
		this.setSceneName("OldPong");
		this.PLAYER_WIDTH_POSITION = 0.17;
	}

	// #region preload
	preload() {
		this.PLAYER_HEIGHT = 80;
		this.PLAYER_WIDTH = 10;
		super.preload();
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
		this.load.audio("hitPaddle", "assets/musics/Pong Old Pong.mp3");
		this.load.audio("hitWall", "assets/musics/Hall Old Pong.mp3");
		this.load.audio("scorePoint", "assets/musics/Point Old Pong.mp3");
		
		this.createMiddleLinePart();
	}

	create() {
		super.create();
		this.createBalls(["ball"]);
		this.createMiddleLine();
		this.scorePlayer1.MAX_SCORE = 7;
		this.scorePlayer2.MAX_SCORE = 7;
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

	protected createBalls(typeBalls: string[]): void {
		this.ballManager = new BallManager(this);
		this.ballManager.createTextureBallOldPong();
        this.ballManager.createBalls(typeBalls);
        this.ballManager.resetBallsPosition();
        this.ballManager.addOverlapWith(this.player1, this.player2);
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

	protected doEndGame(): void {
		this.scene.launch("OldVictoryMenu", { sceneToRestart: this.sceneName, winnerName: this.getNameWinner(), displayScorePlayer1: this.scorePlayer1, displayScorePlayer2: this.scorePlayer2 });
		this.scene.stop();

		if (this.backgroundMusic) {
			this.backgroundMusic.pause();
		}
	}
	//----------------------------
	//#endregion - private method
}
