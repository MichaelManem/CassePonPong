/** @format */

import { AbstractPong } from "../abstractPong.ts";

export class OldPong extends AbstractPong {
	private player1Speed: number = 2000;
	private player2Speed: number = 2000;
	private readonly MULTIPLIER_POSITION_WIDTH_PLAYER1: number = 0.17;
	private readonly MULTIPLIER_POSITION_WIDTH_PLAYER2: number = 0.83;

	constructor() {
		super({ key: "OldPong" });
		this.setSceneName("OldPong");
		this.setPlayer1Speed(this.player1Speed);
		this.setPlayer2Speed(this.player2Speed);
		this.multiplierPositionWidthPlayer1 = this.MULTIPLIER_POSITION_WIDTH_PLAYER1;
		this.multiplierPositionWidthPlayer2 = this.MULTIPLIER_POSITION_WIDTH_PLAYER2;
	}

	preload() {
		this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
	}

	//#region - private method
	//----------------------------

	/**
	 * Creation de l'image du fond
	 */
	protected createBackground() {
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
	protected createMusic() {
		this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
		this.backgroundMusic.play();

		// Créer un evenement qui va etre appelé lors du 'resume' de cette scene
		this.resumeMusicWhenSceneResume();
	}

	protected createPlayer1() {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player1 = this.physics.add
			.sprite(this.positionWidthPlayer(this.multiplierPositionWidthPlayer1), this.positionHeightPlayer(), "whiteRect")
			.setCollideWorldBounds(true);
	}

	protected createPlayer2() {
		this.createTexturePlayer();

		// Create the sprite using the generated texture
		this.player2 = this.physics.add
			.sprite(this.positionWidthPlayer(this.multiplierPositionWidthPlayer2), this.positionHeightPlayer(), "whiteRect")
			.setCollideWorldBounds(true);	
	}

	private createTexturePlayer() {
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
	//----------------------------
	//#endregion - private method
}
