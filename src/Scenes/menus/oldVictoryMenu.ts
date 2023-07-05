import { AbstractVictoryMenu } from "./abstractVictoryMenu.ts"

export class OldVictoryMenu extends AbstractVictoryMenu {

    constructor() {
        super({ key: "OldVictoryMenu" });
    }

    preload() {
        this.load.audio(this.VICTORY_MUSIC, "assets/musics/Victory Music Old Pong.mp3");
    }

    create() {
        this.titleFont = "Courier New"
        this.buttonFont = "Courier New"
        super.create();
    }

}
