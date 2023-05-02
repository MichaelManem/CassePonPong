import { MenuButtons } from "../MenuButtons";
import { PreScene } from "./preScene";

export class GameChoice extends PreScene {

  constructor() {
    super({ key: "GameChoice" });
  }

  preload() {
    this.load.image("background1", "assets/images/backgrounds/menu.jpg");
    this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
    this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
    this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
  }

  create() {
    super.create();
    this.createRandomBackground("GameChoice");
    this.createTitle();
    new MenuButtons(this, [ "PlayNewPong", "PlayOldPong" ]);
  }

  //#region - private method
  
  private createTitle() {
    this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 8,
      "Select Game", { font: "bold 8rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
    )
      // setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence. 
      // O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
      .setOrigin(0.5);
  }
}
