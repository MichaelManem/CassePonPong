import { Score } from "../../gameObjects/score.ts";
import { AbstractMenu } from "./abstractMenu.ts";

export class AbstractVictoryMenu extends AbstractMenu {

    private dataScene: any;
    private readonly BUTTON_NAME_RESTART: string = "Restart";
    private readonly BUTTON_NAME_MAIN_MENU: string = "Go to Main Menu";
    protected readonly VICTORY_MUSIC: string = "VictoryMusic";
    protected scoreSizeFont: number = 5;
    private winner: string = "";
    private scorePlayer1!: Score;
    private scorePlayer2!: Score;

    init(data: any) {
        this.dataScene = data;
        this.winner = this.dataScene?.winnerName;
        this.scorePlayer1 = this.dataScene?.displayScorePlayer1;
        this.scorePlayer2 = this.dataScene?.displayScorePlayer2;
    }

    create() {
        this.menuTitle = `Victoire de ${this.winner}`;
        this.createBlackRectangle();
        this.sound.add(this.VICTORY_MUSIC, { loop: false, volume: 0.5 }).play();
        super.create();
        this.displayScoresText();
    }

    // Implémenter les méthodes abstraites
    protected createMenuItems(): Phaser.GameObjects.Text[] {
        const menuItems: Phaser.GameObjects.Text[] = [];
        menuItems.push(this.createButton(1, 1, this.BUTTON_NAME_RESTART, this.BUTTON_NAME_RESTART, this.buttonSizeFontMedium));
        menuItems.push(this.createButton(1, 2, this.BUTTON_NAME_MAIN_MENU, this.BUTTON_NAME_MAIN_MENU, this.buttonSizeFontMedium));
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

    private displayScoresText(): void {
        this.add.text(
            this.WIDTH_WORLD * 0.50,
            this.HEIGHT_WORLD * 0.25,
            this.scorePlayer1.text + "    -    " + this.scorePlayer2.text, 
            {
                font: `${this.fontProperty} ${this.scoreSizeFont}rem ${this.titleFont}`,
                color: this.color,
                stroke: this.stroke,
                strokeThickness: this.strokeThickness,
            })
            .setOrigin(0.5);

    }
}
