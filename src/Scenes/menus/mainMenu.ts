import { AbstractMenu } from "./abstractMenu.ts";

export class MainMenu extends AbstractMenu {

    private readonly BUTTON_NAME_PLAY: string = "Play";
    private readonly BUTTON_NAME_OPTION: string = "Options";
	
	// ! Commented because exit button isn't used
    // private readonly BUTTON_NAME_EXIT: string = "Exit";

	constructor() {
		super({ key: "MainMenuScene" });
	}

	preload() {
		this.load.image("background1", "assets/images/backgrounds/menu.jpg");
		this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
		this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
		this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
	}

    create() {
		this.createRandomBackground("MainMenuScene");
		this.menuTitle = "CassePonPong";
        super.create();
    }

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];

		menuItems.push(this.createButton(0, this.BUTTON_NAME_PLAY, this.buttonSizeFontBig));
		menuItems.push(this.createButton(1, this.BUTTON_NAME_OPTION, this.buttonSizeFontLittle));

		// ! I think this button shouldn't exist until the game is not packaged for local usage
		// menuItems.push(this.createButton(2, this.BUTTON_NAME_EXIT, this.buttonSizeFontMedium));
		
		return menuItems;
	}
	
    protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_PLAY:
				this.scene.start("GameMenu");
				break;
			case this.BUTTON_NAME_OPTION:
				this.scene.start("SettingsMenu");
				break;
			// ! Commented because exit button isn't used
			// case this.BUTTON_NAME_EXIT:
			//     this.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
			//         scene.scene.stop();
			//     });
			// 	break;
		}
	}
}
