import { AbstractVictoryMenu } from "./abstractVictoryMenu.ts"

export class NewVictoryMenu extends AbstractVictoryMenu {

    constructor() {
        super({ key: "NewVictoryMenu" });
    }

    preload() {
        this.load.audio(this.VICTORY_MUSIC, "assets/musics/Victory Music Old Pong.mp3");
    }

    create() {
        super.create();
    }

}