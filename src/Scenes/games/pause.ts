import { MenuButtons } from "../../MenuButtons.ts";
import { PreScene } from "../preScene.ts";

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
        this.createEscapeKey();
        new MenuButtons(this, [ "Resume" ]);
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
    //---------------------------
    //#endregion - private method
}
