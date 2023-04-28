import { PreScene } from "./preScene";

export class Pause extends PreScene {
    private dataScene: any;

    constructor() {
        super({ key: "PauseScene" });
    }

    init(data: any) {
        this.dataScene = data;
    }

    create() {
        super.create();
        this.createTitle();
        this.createBackButton();
        this.createEscapeKey();
        this.createResumeButton();
    }

    //#region - private method
    //------------------------

    private createEscapeKey() {
        const escapeKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
        escapeKey?.on("down", () => {
            // TODO - Besoin de rendre dynamique la scene qu'on doit retourner si on a plusieurs mode de jeu (donc plusieurs scenes contenant une pause)
            this.scene.resume(this.dataScene.sceneBeforePause);
            this.scene.stop();
        });
    }

    private createTitle() {
        this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 3,
            "!!! PAUSE !!!", { font: "bold 8rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        // setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence. 
        // O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
        .setOrigin(0.5);
    }

    private createResumeButton() {
        this.add.text(
            this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 1.8,
            "Resume", { font: "bold 6rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.resume(this.dataScene.sceneBeforePause);
            this.scene.stop();
        });
    }

    private createBackButton() {
        this.add.text(
            this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 1.2,
            "Back to Menu", { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => {
            this.scene.stop("GameScene");
            this.scene.start("MenuScene");
        });
    }
    //---------------------------
    //#endregion - private method
}
