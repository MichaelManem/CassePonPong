import { AbstractPong } from "../abstractPong.ts";
import { Player } from "../../../gameObjects/player.ts";

export class NewPong extends AbstractPong {
	private readonly PLAYER_WIDTH_POSITION: number = 0.02;

	constructor() {
		super({ key: "NewPong" });
		this.setSceneName("NewPong");
	}

	preload() {
		this.load.image("player", "assets/images/Player.png");
		this.load.image("player2", "assets/images/Player2.png");
		this.load.image("background", "assets/images/backgrounds/rock_lunar.avif");
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	//#region - abstract method implemented
	//-------------------------------------

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
	
	protected createTexturePlayer(): void {
		// Create a Graphics object
		const graphics = this.add.graphics();

		// Set the fill style to white
		graphics.fillStyle(0xffffff);

		// Draw a rectangle shape
		graphics.fillRect(0, 0, 10, 60);

		// Generate a texture from the Graphics object
		graphics.generateTexture(this.NAME_TEXTURE_PLAYER, 10, 60);

		// Destroy the Graphics object
		graphics.destroy();
	}

	protected createPlayer1(): void {
		this.player1 = new Player(this, this.calculatePlayerWidthPosition(this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeightPosition(), this.NAME_TEXTURE_PLAYER, 'Z', 'S');
	}

	protected createPlayer2(): void {
		this.player2 = new Player(this, this.calculatePlayerWidthPosition(1 - this.PLAYER_WIDTH_POSITION), this.calculatePlayerHeightPosition(), this.NAME_TEXTURE_PLAYER, 'Up', 'Down');
	}

  //----------------------------------------
  //#endregion - abstract method implemented
}
