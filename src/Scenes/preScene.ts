/** @format */

import Phaser from "phaser";

/**
 * Classe PreScene pour le chargement initial et la création de la scène.
 */
export class PreScene extends Phaser.Scene {
	public WIDTH_WORLD!: number;
	public HEIGHT_WORLD!: number;

	// Ratio d'aspect 16:9 - Portrait
	protected readonly MAX_SIZE_WIDTH_SCREEN = 2560;
	protected readonly MAX_SIZE_HEIGHT_SCREEN = 1440;
	protected readonly MIN_SIZE_WIDTH_SCREEN = 1280;
	protected readonly MIN_SIZE_HEIGHT_SCREEN = 720;
	protected readonly SIZE_WIDTH_SCREEN = 1920;
	protected readonly SIZE_HEIGHT_SCREEN = 1080;

	preload() {
		// Préchargement des ressources ici
	}

	create() {
		// Récupérer la largeur et la hauteur de la configuration du jeu
		this.WIDTH_WORLD = this.game.config.width as number;
		this.HEIGHT_WORLD = this.game.config.height as number;
	}

	/**
	 * Crée une image de fond aléatoire pour la scène.
	 *
	 * @param nameScene - Le nom de la scène à laquelle ajouter le fond d'écran.
	 */
	protected createRandomBackground() {
		// Générer un nombre aléatoire entre 1 et le nombre total d'options de fond d'écran
		const randomBackgroundIndex = Phaser.Math.Between(1, 4);
		// Ajouter l'image de fond sélectionnée à la scène
		const background = this.add.image(0, 0, `background${randomBackgroundIndex}`).setOrigin(0, 0);
		background.displayWidth = this.game.canvas.width;
		background.displayHeight = this.game.canvas.height;
	}
}
