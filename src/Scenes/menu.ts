import { PreScene } from "./preScene";

export class Menu extends PreScene {
  private playButton!: Phaser.GameObjects.Text;
  private optionButton!: Phaser.GameObjects.Text;
  private buttons: Phaser.GameObjects.Text[];

  constructor() {
    super({ key: "MenuScene" });
    this.buttons = [];
  }

  preload() {
    this.load.image("background1", "assets/images/backgrounds/menu.jpg");
    this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
    this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
    this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
  }

  create() {
    super.create();
    this.createBackground(this.scene.get("MenuScene"));
    this.createTitle();
    this.createPlayButton();
    this.createOptionButton();
    //this.createButtons();
    this.showButtonWhenSceneResume();
  }

  //#region - private method

  private showButtonWhenSceneResume() {
    this.events.on("resume", () => {
      this.playButton.setVisible(true);
      this.optionButton.setVisible(true);
    });
  }
  
  private createTitle() {
    this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 8,
      "CassePonPong", { font: "bold 8rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
    )
      // setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence. 
      // O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
      .setOrigin(0.5);
  }

  private createPlayButton() {
    // Add play button
    this.playButton = this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 3,
      "Play", { font: "bold 6rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
    )
      .setOrigin(0.5)
      .setInteractive({ cursor: 'pointer', cursorDelay: 100 })
      .on("pointerover", () => {
        this.highlight(this.playButton);
      })
      .on("pointerout", () => {
        this.highlight();
      })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });

    this.buttons.push(this.playButton);
  }

  private createOptionButton() {
    this.optionButton = this.add.text(this.WIDTH_WORLD / 2, this.HEIGHT_WORLD / 2,
      "Option", { font: "bold 3rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
    )
      .setOrigin(0.5)
      .setInteractive({ cursor: 'pointer', cursorDelay: 0 })
      .on("pointerover", () => {
        this.highlight(this.optionButton);
      })
      .on("pointerout", () => {
        this.highlight();
      })
      .on("pointerdown", () => {
        this.scene.pause();
        this.scene.launch("OptionScene");
        this.playButton.setVisible(false);
        this.optionButton.setVisible(false);
      });
    this.buttons.push(this.optionButton);
  }

  private highlight(buttonToHighlight?: Phaser.GameObjects.Text) {
    if (buttonToHighlight) {
      buttonToHighlight.setAlpha(1);
      const otherButtons: Phaser.GameObjects.Text[] = this.buttons.filter(button => button !== buttonToHighlight);
      otherButtons.forEach(otherButton => {
        otherButton.setAlpha(0.5);
      });
    } else {
      // If not button is given, so no button need to be highlighted
      this.buttons.forEach(button => {
        button.setAlpha(1);
      })
    }
  }
}
