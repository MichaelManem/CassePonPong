import { MenuButtons } from "../MenuButtons";
import { PreScene } from "./preScene";

export class Option extends PreScene {
    private sizeMinButton!: Phaser.GameObjects.Text;
    private sizeMaxButton!: Phaser.GameObjects.Text;
    private sizeDefaultButton!: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "OptionScene" });
    }

    preload() {}

    create() {
        super.create();
        this.createBackground("OptionScene");
        this.createTitle();
        new MenuButtons(this, []);
    }
    private createTitle() {
      this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 8,
        "CassePonPong", { font: "bold 8rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
      )
        // setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence. 
        // O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
        .setOrigin(0.5);
    }

    private createSizesButton() {
        this.sizeMaxButton = this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 3,
            "2560x1440", { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive();
        this.sizeMaxButton.on("pointerdown", () => {
            // Update the game configuration with the new dimensions
            this.scene.get("OptionScene").scale.setGameSize(this.MAX_SIZE_WIDTH_SCREEN, this.MAX_SIZE_HEIGHT_SCREEN);
            this.scene.restart();
        });

        this.sizeMinButton = this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 2,
            "1920x1080", { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive();
        this.sizeMinButton.on("pointerdown", () => {
            // Update the game configuration with the new dimensions
            this.scene.get("OptionScene").scale.setGameSize(this.SIZE_WIDTH_SCREEN, this.SIZE_HEIGHT_SCREEN);
            this.scene.restart();
        });

        this.sizeDefaultButton = this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 1.5,
            "1280x720", { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive();
        this.sizeDefaultButton.on("pointerdown", () => {
            // Update the game configuration with the new dimensions
            this.scene.get("OptionScene").scale.setGameSize(this.MIN_SIZE_WIDTH_SCREEN, this.MIN_SIZE_HEIGHT_SCREEN);
        });
    }
}
