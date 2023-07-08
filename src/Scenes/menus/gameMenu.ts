import { AbstractMenu } from "./abstractMenu.ts";

export class GameMenu extends AbstractMenu {
	private readonly BUTTON_NAME_NEW_PONG: string = "New Pong";
	private readonly BUTTON_NAME_OLD_PONG: string = "Old Pong";
	private readonly BUTTON_NAME_BACK: string = "<- Back";

	constructor() {
		super({ key: "GameMenu" });
	}

	preload() {
		this.load.image("background1", "assets/images/backgrounds/menu.jpg");
		this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
		this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
		this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
	}

	create() {
		this.createRandomBackground("GameMenu");
		this.menuTitle = "Choose a game :";
		super.create();
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];

		menuItems.push(this.createButton(1, 0, this.BUTTON_NAME_NEW_PONG, this.BUTTON_NAME_NEW_PONG, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 1, this.BUTTON_NAME_OLD_PONG, this.BUTTON_NAME_OLD_PONG, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 999, this.BUTTON_NAME_BACK, this.BUTTON_NAME_BACK, this.buttonSizeFontLittle));

		return menuItems;
	}

	protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_NEW_PONG:
				this.scene.start("SettingsNewPong");
				break;
			case this.BUTTON_NAME_OLD_PONG:
				this.scene.start("OldPong");
				break;
			case this.BUTTON_NAME_BACK:
				this.scene.stop();
				this.scene.start("MainMenuScene");
				break;
		}
	}
}
