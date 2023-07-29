import { AbstractMenu } from "./abstractMenu.ts";

export class MainMenu extends AbstractMenu {

    private readonly BUTTON_NAME_PLAY: string = "Play";
    //private readonly BUTTON_NAME_OPTION: string = "Options";
	
	// ! Commented because exit button isn't used
    // private readonly BUTTON_NAME_EXIT: string = "Exit";

	constructor() {
		super({ key: "MainMenuScene" });
	}

    create() {
		this.menuTitle = "CassePonPong";
        super.create();
    }

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];

		menuItems.push(this.createButton(1, 0, this.BUTTON_NAME_PLAY, this.BUTTON_NAME_PLAY, this.buttonSizeFontBig));
		//menuItems.push(this.createButton(1, 1, this.BUTTON_NAME_OPTION, this.BUTTON_NAME_OPTION, this.buttonSizeFontLittle));

		// ! I think this button shouldn't exist until the game is not packaged for local usage
		// menuItems.push(this.createButton(1, 2, this.BUTTON_NAME_EXIT, this.BUTTON_NAME_EXIT, this.buttonSizeFontMedium));
		
		return menuItems;
	}
	
    protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_PLAY:
				this.scene.start("GameMenu");
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
