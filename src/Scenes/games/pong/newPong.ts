
import { Ball } from "../../../gameObjects/ball";
import { BallManager } from "../../../gameObjects/ballManager";
import { BrickManager } from "../../../gameObjects/brick/brickManager";
import { BrickMaps } from "../../../gameObjects/brick/brickMaps";
import { Player } from "../../../gameObjects/player";
import { AbstractPong } from "../abstractPong";
import { Meteo } from "../../../gameObjects/meteo";
import { Chao } from "../../../gameObjects/chao";
type AllBalls = Ball;

export class NewPong extends AbstractPong {
	protected brickManager!: BrickManager;
	private meteo!: Meteo;
	private chao!: Chao;

	constructor() {
		super({ key: "NewPong" });
		this.setSceneName("NewPong");
		this.PLAYER_WIDTH_POSITION = 0.05;
	}

	init(data: any) {
		super.init(data);
		this.PLAYER_HEIGHT = this.dataScene.heightPong;
		this.PLAYER_WIDTH = this.dataScene.widthPong;
	}

	preload() {
		super.preload();
		this.load.image("paddle", "assets/images/Paddle.png");
		this.load.image("greenBall", "assets/images/GreenBall.png");
		this.load.image("gameBackground", "assets/images/backgrounds/BackgroundInGameNeon.png");
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
		this.load.audio("hitPaddle", "assets/musics/Pong Old Pong.mp3");
		this.load.audio("hitWall", "assets/musics/Hall Old Pong.mp3");
		this.load.audio("scorePoint", "assets/musics/Point Old Pong.mp3");
	}

	create() {
		super.create();

		this.player1.setSpeed(this.dataScene.speedPong);
		this.player2.setSpeed(this.dataScene.speedPong);

		this.scorePlayer1.MAX_SCORE = this.dataScene.scoreToWin;
		this.scorePlayer2.MAX_SCORE = this.dataScene.scoreToWin;

		this.createBalls(this.getTypeBalls());

		this.brickManager = new BrickManager(this);
		this.createBricks();

		this.chao = new Chao(this, this.dataScene.chao);
		this.chao.startEvent();

		this.dataScene.meteo.chao = this.dataScene.chao;

		this.meteo = new Meteo(this, this.dataScene.meteo);
		this.meteo.startEvent();
	}

	update() {
		super.update();
		this.brickManager.handleBricks();
		this.meteo.handleText();
		this.chao.handleText();
    }

	//#region - method
	//----------------

	// private meteoBeginEvent() {
	// 	this.meteoBallBegin();
	// }

	// private meteoBallBegin() {
	// 	if(this.dataScene.meteo.ball) {
	// 		this.ballManager.balls.forEach(ball => {
	// 			ball.setDisplaySize(100, 100);
	// 		});
	// 	}
	// 	this.willEndMeteo = true;
	// 	this.willStartMeteo = false;
	// 	this.timedEndEvent = this.time.delayedCall(this.TIME_METEO_TO_STOP, this.meteoBallEnd, [], this);
	// }

	// private meteoBallEnd() {
	// 	if(this.dataScene.meteo.ball){
	// 		this.ballManager.balls.forEach(ball => {
	// 			ball.setDisplaySize(this.ballManager.BALL_DIAMETER, this.ballManager.BALL_DIAMETER);
	// 		});
	// 	}
	// 	this.willEndMeteo = false;
	// 	this.willStartMeteo = true;
	// 	this.timedBeginEvent = this.time.delayedCall(this.TIME_METEO_TO_BEGIN, this.meteoBeginEvent, [], this);
	// }

	private getTypeBalls(): string[] {
		let typeBalls: string[] = [];
		for (let i = 0; i < this.dataScene.nbBall; i++) {
			typeBalls.push("ball");
		}
		return typeBalls;
	}

	protected createBackground(): void {
		const background = this.add.image(0, 0, "gameBackground").setOrigin(0, 0);
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
		return;
	}

	protected createPlayer1(): Player {
		let player1: Player = new Player(this, this.PLAYER_WIDTH_POSITION, this.MULTIPLIER_POSITION_HEIGHT_PLAYER, "paddle", 'Z', 'S');
		player1.flipX = true;

		player1.setDisplaySize(this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		player1.height = this.PLAYER_HEIGHT;
		player1.width = this.PLAYER_WIDTH;

		return player1;
	}

	protected createPlayer2(): Player {
		let player2: Player = new Player(this, (1 - this.PLAYER_WIDTH_POSITION), this.MULTIPLIER_POSITION_HEIGHT_PLAYER, "paddle", 'Up', 'Down');

		player2.setDisplaySize(this.PLAYER_WIDTH, this.PLAYER_HEIGHT);
		player2.height = this.PLAYER_HEIGHT;
		player2.width = this.PLAYER_WIDTH;

		return player2;
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
