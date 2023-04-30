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
        this.createBackButton();
        this.createSizesButton();
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
            console.log("this.scene.get(OptionScene)", this.scene.get("OptionScene"));
            console.log("this.scene.get(OptionScene).scale", this.scene.get("OptionScene").scale);
            console.log("this.game.config.minWidth", this.game.config.minWidth);
            console.log("this.game.config.minHeight", this.game.config.minHeight);
            // Update the game configuration with the new dimensions
            this.scene.get("OptionScene").scale.setGameSize(this.MIN_SIZE_WIDTH_SCREEN, this.MIN_SIZE_HEIGHT_SCREEN);
        });
    }

    private createBackButton() {
        this.add.text(
            this.WIDTH_WORLD / 2,
            this.HEIGHT_WORLD / 1.2,
            "Back to Menu",
            { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.resume("MenuScene");
            this.scene.stop();
        });
    }
}
