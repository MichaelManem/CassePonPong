import { AbstractMenu } from "./abstractMenu.ts";

export class VictoryMenu extends AbstractMenu {
    
    private dataScene: any;
    private readonly BUTTON_NAME_RESTART: string = "Restart";
    private readonly VICTORY_MUSIC: string = "VictoryMusic";
    private readonly BUTTON_NAME_MAIN_MENU: string = "Go to Main Menu";
    private winner: string ;
    private scores: number;

    constructor() {
        super({ key: "VictoryMenu" });
        this.winner = "";
        this.scores = 0;
    }

    init(data: any) {
		this.dataScene = data;
        this.winner = this.dataScene?.winnerName;
	}

    preload() {
        this.load.audio(this.VICTORY_MUSIC, "assets/musics/Victory Music Old Pong.mp3");
    }
   
    create() {
        this.menuTitle = `Victoire de ${this.winner}`;
        this.createBlackRectangle();
        this.sound.add(this.VICTORY_MUSIC, { loop: false, volume: 0.5 }).play();
        super.create();
    }

    // Implémenter les méthodes abstraites
    protected createMenuItems(): Phaser.GameObjects.Text[] {
        const menuItems: Phaser.GameObjects.Text[] = [];
        menuItems.push(this.createButton(0, this.BUTTON_NAME_RESTART, this.buttonSizeFontMedium));
        menuItems.push(this.createButton(1, this.BUTTON_NAME_MAIN_MENU, this.buttonSizeFontMedium));
        return menuItems;
    }

    protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_RESTART:
                this.scene.start(this.dataScene?.sceneToRestart);
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
            this.cameras.main.width * 0.5,
            this.cameras.main.height * 0.5,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000
        );
    }
}
