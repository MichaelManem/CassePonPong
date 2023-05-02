import Phaser from "phaser";
import { Menu } from "./Scenes/menu";
import { Option } from "./Scenes/option";
import { Pause } from "./Scenes/pause";

export class MenuButtons {
    protected buttons: Phaser.GameObjects.Text[];
    protected scene: Menu | Option | Pause;
    private selectedButtonIndex: number;
    private readonly nameButtons = {
      "Play" : "[ Play ]",
      "Option" : "[ Option ]",
      "Resume" : "[ Resume ]",
      "BackToMenu" : "[ Back To Menu ]",
      "Exit" : "[ Exit Game ]",
    };
    private readonly alphaNotSelected = 0.8;
    
    constructor(scene: Menu | Option | Pause, buttons: string[]) {
        this.scene = scene;
        this.buttons = [];
        this.createButtons(buttons);
        this.selectedButtonIndex = 0;

        // Mettez en surbrillance le premier bouton
        this.selectButton(this.selectedButtonIndex);
    
        // Ajoutez les écouteurs d'événements pour la navigation et la sélection
        this.scene.input?.keyboard?.on('keydown', this.handleKeyboardInput, this);
    }

    private createButtons(buttons: string[]) {
        buttons.forEach(nameButton => {
            switch (nameButton) {
                case "Play":
                    this.buttons.push(this.createPlayButton());
                    break;
                case "Option":
                    this.buttons.push(this.createOptionButton());
                    break;
                case "Resume":
                    this.buttons.push(this.createResumeButton());
                    break;
                case "Exit":
                    this.buttons.push(this.createExitButton());
                    break;
            }
        });
        if(this.scene.scene.key !== "MenuScene") {
            this.buttons.push(this.createBackToMenuButton());
        }
        console.log(this.buttons);
    }

    /**
     * Créer un bouton play
     * @returns Le bouton Play
     */
    private createPlayButton() {
        let playButton = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 3,
            this.nameButtons.Play, { font: "bold 6rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.Play)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer', cursorDelay: 100 })
        .on("pointerover", () => {
          this.highlight(playButton);
        })
        .on("pointerdown", () => {
          this.scene.scene.start("GameScene");
        })
        .setAlpha(this.alphaNotSelected);
    
        return playButton;
    }

    private createOptionButton() {
      let optionButton = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 2,
        this.nameButtons.Option, { font: "bold 3rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
      )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.Option)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer', cursorDelay: 0 })
        .on("pointerover", () => {
          this.highlight(optionButton);
        })
        .on("pointerdown", () => {
          this.scene.scene.start("OptionScene");
        })
        .setAlpha(this.alphaNotSelected);
  
      return optionButton;
    }

    private createExitButton() {
      let exitButton = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 1.2,
        this.nameButtons.Exit, { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
      )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.Option)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer', cursorDelay: 0 })
        .on("pointerover", () => {
          this.highlight(exitButton);
        })
        .on("pointerdown", () => {
            this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
                scene.scene.stop();
            });
        })
        .setAlpha(this.alphaNotSelected);
  
      return exitButton;
    }

    private createResumeButton() {
        let resumeButton = this.scene.add.text(
            this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 1.8,
            this.nameButtons.Resume, { font: "bold 6rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.Resume)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerover", () => {
          this.highlight(resumeButton);
        })
        .on("pointerdown", () => {
            this.scene.scene.resume(this.scene.dataScene?.sceneBeforePause);
            this.scene.scene.stop();
        })
        .setAlpha(this.alphaNotSelected);

        return resumeButton;
    }
    
    private createBackToMenuButton() {
        let backToMenu = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 1.2,
        this.nameButtons.BackToMenu, { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.BackToMenu)
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerover", () => {
          this.highlight(backToMenu);
        })
        .on("pointerdown", () => {
            this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
                scene.scene.stop();
            });
            this.scene.scene.start("MenuScene");
        })
        .setAlpha(this.alphaNotSelected);

        return backToMenu;
    }
    
    private handleKeyboardInput(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowUp':
                this.moveSelectionUp();
                break;
            case 'ArrowDown':
                this.moveSelectionDown();
                break;
            case 'Enter':
                this.selectCurrentButton();
                break;
        }
    }

    private moveSelectionUp() {
    this.selectButton(this.selectedButtonIndex - 1);
    }

    private moveSelectionDown() {
    this.selectButton(this.selectedButtonIndex + 1);
    }

    private selectButton(index: number) {
    // Vérifiez les limites de l'index pour la navigation circulaire
    if (index < 0) {
        index = this.buttons.length - 1;
    } else if (index >= this.buttons.length) {
        index = 0;
    }

    // Désélectionnez le bouton précédent
    this.buttons[this.selectedButtonIndex].setAlpha(this.alphaNotSelected);

    // Sélectionnez le nouveau bouton
    this.buttons[index].setAlpha(1);

    this.selectedButtonIndex = index;
    }

    private selectCurrentButton() {
    // Exécutez l'action liée au bouton sélectionné (par exemple, démarrer un niveau, ouvrir une option, etc.)
    let currentButton = this.buttons[this.selectedButtonIndex];
        switch (currentButton.name) {
            case this.nameButtons.Play:
                this.scene.scene.start("GameScene");
                break;
            case this.nameButtons.Option:
                this.scene.scene.start("OptionScene");
                break;
            case this.nameButtons.Resume:
                this.scene.scene.resume(this.scene.dataScene?.sceneBeforePause);
                this.scene.scene.stop();
                break;
            case this.nameButtons.BackToMenu:
                this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
                    scene.scene.stop();
                });
                this.scene.scene.start("MenuScene");
                break;
            case this.nameButtons.Exit:
                this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
                    scene.scene.stop();
                });
                break;
            // Ajoutez des cas supplémentaires pour d'autres boutons
        }
    }

    private highlight(buttonToHighlight: Phaser.GameObjects.Text) {
        console.log("hl avant - this.selectedButtonInde", this.selectedButtonIndex);
        if (buttonToHighlight) {
            this.selectedButtonIndex = buttonToHighlight.getData("index");
            buttonToHighlight.setAlpha(1);
            const otherButtons: Phaser.GameObjects.Text[] = this.buttons.filter(button => button !== buttonToHighlight);
            otherButtons.forEach(otherButton => {
                otherButton.setAlpha(this.alphaNotSelected);
            });
        }
        console.log("hl après - this.selectedButtonInde", this.selectedButtonIndex);
    }

    // private showButtonWhenSceneResume() {
    //     console.log("this.scene.constructor.name", this.scene.constructor.name)
    //     if(this.scene.constructor.name === "Menu") {
    //         this.scene.events.on("resume", () => {
    //             this.buttons.find(button => button.name === this.nameButtons.Play)?.setVisible(true);
    //             this.buttons.find(button => button.name === this.nameButtons.Option)?.setVisible(true);
    //         });
    //     }
    // }
}