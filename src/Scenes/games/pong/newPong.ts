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

	// #region [phaser methods]
	preload() {
		this.load.image("player", "assets/images/Player.png");
		this.load.image("player2", "assets/images/Player2.png");
		this.load.image("background", "assets/images/backgrounds/rock_lunar.avif");
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	create() {
		super.create();
		this.createPlayers();
	}
	// #endregion

	// #region [private methods]
	private createPlayers(): void {
		this.player1 = this.createPlayer(this.PLAYER_WIDTH_POSITION, "player");
		this.player1.flipX = true;
		this.player2 = this.createPlayer(1 - this.PLAYER_WIDTH_POSITION, "player2");
		this.player2.flipX = true;
	}
	// #endregion

	// #region [abstract method implemented]
	/**
	 * Creation de l'image du fond
	 */
	protected createBackground(): void {
		const background = this.add.image(0, 0, "background").setOrigin(0, 0);
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
	// #endregion
}
