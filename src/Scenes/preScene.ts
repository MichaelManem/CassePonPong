export class PreScene extends Phaser.Scene {
	public WIDTH_WORLD!: number;
	public HEIGHT_WORLD!: number;

	// Aspect Ratio 16:9 - Portrait
	protected readonly MAX_SIZE_WIDTH_SCREEN = 2560;
	protected readonly MAX_SIZE_HEIGHT_SCREEN = 1440;
	protected readonly MIN_SIZE_WIDTH_SCREEN = 1280;
	protected readonly MIN_SIZE_HEIGHT_SCREEN = 720;
	protected readonly SIZE_WIDTH_SCREEN = 1920;
	protected readonly SIZE_HEIGHT_SCREEN = 1080;

	preload() {}

	create() {
		this.WIDTH_WORLD = this.game.config.width as number;
		this.HEIGHT_WORLD = this.game.config.height as number;
	}

	/**
	 * Creation de l'image du fond
	 */
	protected createRandomBackground(nameScene: string) {
		// Generate a random number between 1 and the total number of background options
		const randomBackgroundIndex = Phaser.Math.Between(1, 4);
		// Add the selected background image to the scene
		const background = this.scene.get(nameScene).add.image(0, 0, `background${randomBackgroundIndex}`).setOrigin(0, 0);
		background.displayWidth = this.game.canvas.width;
		background.displayHeight = this.game.canvas.height;
	}
}
