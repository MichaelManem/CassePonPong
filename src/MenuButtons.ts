import Phaser from "phaser";
import { Menu } from "./Scenes/menu";
import { GameChoice } from "./Scenes/gameChoice";
import { Option } from "./Scenes/option";
import { Pause } from "./Scenes/Game/pause";
type ScenesWithButtons = Menu | Option | Pause | GameChoice;

export class MenuButtons {
    protected buttons: Phaser.GameObjects.Text[];
    protected scene: ScenesWithButtons;
    private selectedButtonIndex: number;
    private readonly nameButtons = {
      "Play" : "[ Play ]",
      "Option" : "[ Option ]",
      "PlayOldPong" : "[ Original Pong ]",
      "PlayNewPong" : "[ Fun Pong ]",
      "Resume" : "[ Resume ]",
      "BackToMenu" : "[ Back To Menu ]",
      "Exit" : "[ Exit Game ]",
    };
    private readonly alphaNotSelected = 0.8;
    private readonly colorNotSelected = "#fff";
    private readonly colorSelected = "gold";
    
    constructor(scene: ScenesWithButtons, buttons: string[]) {
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
        buttons.forEach((nameButton: string, order: number) => {
            switch (nameButton) {
                case "Play":
                    this.buttons.push(this.createMenuPlayButton());
                    break;
                case "Option":
                    this.buttons.push(this.createOptionButton());
                    break;
                case "PlayNewPong":
                    this.buttons.push(this.createPlayButton(order, this.nameButtons.PlayNewPong));
                    break;
                case "PlayOldPong":
                    this.buttons.push(this.createPlayButton(order, this.nameButtons.PlayOldPong));
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
    private createMenuPlayButton(): Phaser.GameObjects.Text {
        let playButton: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 3,
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
            this.doMenuPlay();
        })
        .setAlpha(this.alphaNotSelected);

        return playButton;
    }

    /**
     * Créer un bouton play
     * @returns Le bouton Play
     */
    private createPlayButton(order: number, nameButton: string): Phaser.GameObjects.Text {
        let heightButton = this.getHeightButton(order);
        let playButton: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD / 2, heightButton,
            nameButton, { font: "bold 6rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
        )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(nameButton)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer', cursorDelay: 100 })
        .on("pointerover", () => {
          this.highlight(playButton);
        })
        .on("pointerdown", () => {
            if(nameButton === this.nameButtons.PlayNewPong) {
                this.doPlayNewPong();
            } else if(nameButton === this.nameButtons.PlayOldPong) {
                this.doPlayOldPong();
            }
        })
        .setAlpha(this.alphaNotSelected);
    
        return playButton;
    }

    private getHeightButton(order: number) {
        let heightButton = this.scene.HEIGHT_WORLD / 2;

        if(order === 0) {
            heightButton = this.scene.HEIGHT_WORLD / 3;
        }
        if(order === 1) {
            heightButton = this.scene.HEIGHT_WORLD / 2;
        }
        if(order == 2) {
            heightButton = this.scene.HEIGHT_WORLD / 1.5;
        }

        return heightButton;
    }

    private createOptionButton(): Phaser.GameObjects.Text {
      let optionButton: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 2,
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
            this.doOption();
        })
        .setAlpha(this.alphaNotSelected);
  
      return optionButton;
    }

    private createExitButton(): Phaser.GameObjects.Text {
      let exitButton: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 1.2,
        this.nameButtons.Exit, { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
      )
        .setData({ "index": this.buttons.length }) // Key in array
        .setName(this.nameButtons.Exit)
        .setOrigin(0.5)
        .setInteractive({ cursor: 'pointer', cursorDelay: 0 })
        .on("pointerover", () => {
          this.highlight(exitButton);
        })
        .on("pointerdown", () => {
            this.doExit();
        })
        .setAlpha(this.alphaNotSelected);
  
      return exitButton;
    }

    private createResumeButton(): Phaser.GameObjects.Text {
        let resumeButton: Phaser.GameObjects.Text = this.scene.add.text(
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
            this.doResume();
        })
        .setAlpha(this.alphaNotSelected);

        return resumeButton;
    }
    
    private createBackToMenuButton(): Phaser.GameObjects.Text {
        let backToMenu: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD / 2, this.scene.HEIGHT_WORLD / 1.2,
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
            this.doBackToMenu();
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
    this.buttons[this.selectedButtonIndex].setAlpha(this.alphaNotSelected).setColor(this.colorNotSelected);

    // Sélectionnez le nouveau bouton
    this.buttons[index].setAlpha(1).setColor(this.colorSelected);

    this.selectedButtonIndex = index;
    }

    private selectCurrentButton() {
    // Exécutez l'action liée au bouton sélectionné (par exemple, démarrer un niveau, ouvrir une option, etc.)
    let currentButton = this.buttons[this.selectedButtonIndex];
        switch (currentButton.name) {
            case this.nameButtons.Play:
                this.doMenuPlay();
                break;
            case this.nameButtons.Option:
                this.doOption();
                break;
            case this.nameButtons.PlayNewPong:
                this.doPlayNewPong();
                break;
            case this.nameButtons.PlayOldPong:
                this.doPlayOldPong();
                break;
            case this.nameButtons.Resume:
                this.doResume();
                break;
            case this.nameButtons.BackToMenu:
                this.doBackToMenu();
                break;
            case this.nameButtons.Exit:
                this.doExit();
                break;
            // Ajoutez des cas supplémentaires pour d'autres boutons
        }
    }

    //#region - method "do" for each button

    private doMenuPlay() {
        this.scene.scene.start("GameChoice");
    }

    private doOption() {
        this.scene.scene.start("OptionScene");
    }

    private doPlayNewPong() {
        this.scene.scene.start("NewPong");
    }

    private doPlayOldPong() {
        this.scene.scene.start("OldPong");
    }

    private doResume() {
        this.scene.scene.resume(this.scene.dataScene?.sceneBeforePause);
        this.scene.scene.stop();
    }

    private doBackToMenu() {
        this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
            scene.scene.stop();
        });
        this.scene.scene.start("MenuScene");
    }

    private doExit() {
        this.scene.scene.manager.scenes.forEach((scene: Phaser.Scene) => {
            scene.scene.stop();
        });
    }

    //#endregion - method "do" for each button

    private highlight(buttonToHighlight: Phaser.GameObjects.Text) {
        if (buttonToHighlight) {
            this.selectedButtonIndex = buttonToHighlight.getData("index");
            buttonToHighlight.setAlpha(1).setColor(this.colorSelected);
            const otherButtons: Phaser.GameObjects.Text[] = this.buttons.filter(button => button !== buttonToHighlight);
            otherButtons.forEach(otherButton => {
                otherButton.setAlpha(this.alphaNotSelected).setColor(this.colorNotSelected);
            });
        }
    }
}