/** @format */

import { AbstractMenu } from "./abstractMenu.ts";

export class SettingsMenu extends AbstractMenu {
	private readonly BUTTON_NAME_2K: string = "2560x1440";
	private readonly BUTTON_NAME_FULLHD: string = "1920x1080";
	private readonly BUTTON_NAME_HD: string = "1280x720";
	private readonly BUTTON_NAME_BACK: string = "<- Back";

	constructor() {
		super({ key: "SettingsMenu" });
	}

	preload() {
		this.load.image("background1", "assets/images/backgrounds/menu.jpg");
		this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
		this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
		this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
	}

	create() {
		this.createRandomBackground("SettingsMenu");
		this.menuTitle = "Settings :";
		super.create();
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];

		menuItems.push(this.createButton(0, this.BUTTON_NAME_2K, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, this.BUTTON_NAME_FULLHD, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(2, this.BUTTON_NAME_HD, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(999, this.BUTTON_NAME_BACK, this.buttonSizeFontLittle));

		return menuItems;
	}

	protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_2K:
				this.scene.get("OptionScene").scale.setGameSize(this.MAX_SIZE_WIDTH_SCREEN, this.MAX_SIZE_HEIGHT_SCREEN);
				this.scene.restart();
				break;
			case this.BUTTON_NAME_FULLHD:
				this.scene.get("OptionScene").scale.setGameSize(this.SIZE_WIDTH_SCREEN, this.SIZE_HEIGHT_SCREEN);
				this.scene.restart();
				break;
			case this.BUTTON_NAME_HD:
				// Update the game configuration with the new dimensions
				this.scene.get("OptionScene").scale.setGameSize(this.MIN_SIZE_WIDTH_SCREEN, this.MIN_SIZE_HEIGHT_SCREEN);
				this.scene.restart();
				break;
			case this.BUTTON_NAME_BACK:
				this.scene.start("MainMenuScene");
				break;
		}
	}
}
