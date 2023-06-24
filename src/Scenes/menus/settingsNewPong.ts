import { BrickMaps } from "../../gameObjects/brick/brickMaps.ts";
import { AbstractMenu } from "./abstractMenu.ts";

export class SettingsNewPong extends AbstractMenu {
	private readonly BUTTON_NAME_PLAY: string = "Begin Game";
	private readonly BUTTON_NAME_BACK: string = "<- Back";
	private buttonChooseMap!: Phaser.GameObjects.Text;
	private nbBrickToMapRandom: number = 0;

	constructor() {
		super({ key: "SettingsNewPong" });
	}

	create() {
		this.createRandomBackground("SettingsNewPong");
		this.menuTitle = "Option du jeu";
		super.create();
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];
		this.buttonChooseMap = this.createButton(0, 0, BrickMaps.names['MAP_1'], BrickMaps.names['MAP_1'], this.buttonSizeFontMedium);

		menuItems.push(this.buttonChooseMap);
		menuItems.push(this.createButton(1, 0, this.BUTTON_NAME_PLAY, this.BUTTON_NAME_PLAY, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 999, this.BUTTON_NAME_BACK, this.BUTTON_NAME_BACK, this.buttonSizeFontLittle));

		return menuItems;
	}

	protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_PLAY:
				this.scene.start("NewPong", { buttonMap: this.buttonChooseMap, nbBrickToMapRandom: this.nbBrickToMapRandom });
				break;
			case BrickMaps.names['MAP_1']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_2'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_2'];
				break;
			case BrickMaps.names['MAP_2']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_3'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_3'];
				break;
			case BrickMaps.names['MAP_3']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_4'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_4'];
				break;
			case BrickMaps.names['MAP_4']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_RANDOM'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
				break;
			case BrickMaps.names['MAP_RANDOM']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_1'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_1'];
				break;
			case this.BUTTON_NAME_BACK:
				this.scene.start("MainMenuScene");
				break;
		}
	}

	protected decreaseSelection() {
		if (this.currentButton.name === BrickMaps.names['MAP_RANDOM']) {
			if(this.nbBrickToMapRandom > 0) {
				this.nbBrickToMapRandom--;
				this.nbBrickToMapRandom--;
			}
			this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
		}
	}

	protected increaseSelection() {
		if (this.currentButton.name === BrickMaps.names['MAP_RANDOM']) {
			if(this.nbBrickToMapRandom < 160) {
				this.nbBrickToMapRandom++;
				this.nbBrickToMapRandom++;
			}
			this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
		}
	}
}
