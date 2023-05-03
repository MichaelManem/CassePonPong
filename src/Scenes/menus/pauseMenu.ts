/** @format */

import { AbstractMenu } from "./abstractMenu.ts";

export class PauseMenu extends AbstractMenu {
	private dataScene: any;
	private readonly BUTTON_NAME_RESUME: string = "Resume";
	private readonly BUTTON_NAME_MAIN_MENU: string = "Go to Main Menu";

	constructor() {
		super({ key: "PauseMenu" });
	}

	init(data: any) {
		this.dataScene = data;
	}
	
	create() {
		this.menuTitle = "Pause";

		// * Créer un fond d'écran légèrement transparent pour le menu de pause
		const background: Phaser.GameObjects.Rectangle = this.createBlackRectangle();
		background.setAlpha(0.4);

		super.create();

		// * On s'assure que la scene de pause soit bien au premier plan
		this.scene.bringToTop();
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];

		menuItems.push(this.createButton(0, this.BUTTON_NAME_RESUME, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, this.BUTTON_NAME_MAIN_MENU, this.buttonSizeFontMedium));

		return menuItems;
	}

	protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_RESUME:
				this.scene.resume(this.dataScene?.sceneBeforePause);
				this.scene.stop();
				break;
			case this.BUTTON_NAME_MAIN_MENU:
				this.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
					scene.scene.stop();
				});
				this.scene.start("MainMenuScene");
				break;
		}
	}

	private createBlackRectangle(): Phaser.GameObjects.Rectangle {
		return this.add.rectangle(
			this.cameras.main.width / 2,
			this.cameras.main.height / 2,
			this.cameras.main.width,
			this.cameras.main.height,
			0x000000
		);
	}
}
