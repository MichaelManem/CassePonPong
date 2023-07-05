import { PreScene } from "../preScene.ts";

export abstract class AbstractMenu extends PreScene {
	protected buttons!: Phaser.GameObjects.Text[];
	protected selectedIndex!: number;
	protected menuTitle!: string;
	protected titleFont: string = "Arial";
	protected titleSizeFont: number = 8;
	protected buttonFont: string = "Arial";
	protected fontProperty: string = "";

	protected readonly buttonSizeFontBig: number = 6;
	protected readonly buttonSizeFontMedium: number = 4;
	protected readonly buttonSizeFontLittle: number = 3;
	protected readonly color: string = "#fff";
	protected readonly stroke: string = "#00000";
	protected readonly strokeThickness: number = 30;
	protected readonly alphaNotSelected = 0.8;
	protected readonly colorSelected = "gold";

	//#region [Phaser Methods]
	create() {
		super.create();
		this.createMenuTitle(this.menuTitle);
		this.buttons = this.createMenuItems();
		this.selectedIndex = 0;
		this.highlightMenuItem(this.buttons[this.selectedIndex]);
		this.input?.keyboard?.on("keydown", this.handleKeyboardInput, this);
	}
	//#endregion

	protected createMenuTitle(title: string): void {
		this.add.text(
			this.WIDTH_WORLD * 0.5,
			this.HEIGHT_WORLD * 0.125,
			title,
			{
				font: `${this.fontProperty} ${this.titleSizeFont}rem ${this.titleFont}`,
				color: this.color,
				stroke: this.stroke,
				strokeThickness: this.strokeThickness,
			}
		)
			// setOrigin c'est pour définir dans quel partie de l'objet tu admet qu'il commence.
			// O.5 il est au milieux de l'objet, 0 tout à gauche et 1 toute à droite
			.setOrigin(0.5);
	}

	//#region [Abstract Methods]
	protected abstract createMenuItems(): Phaser.GameObjects.Text[];
	protected abstract onMenuItemSelect(button: Phaser.GameObjects.Text): void;
	//#endregion

	//#region [Buttons Management]
	protected createButton(index: number, nameButton: string, fontSize: number): Phaser.GameObjects.Text {
		let heightButton = this.getHeightButton(index);
		let button: Phaser.GameObjects.Text = this.add
			.text(this.WIDTH_WORLD * 0.5, heightButton, nameButton, {
				font: `bold ${fontSize}rem ${this.buttonFont}`,
				color: this.color,
				stroke: this.stroke,
				strokeThickness: this.strokeThickness,
			})
			.setData({ index: index })
			.setName(nameButton)
			.setOrigin(0.5)
			.setInteractive({ cursor: "pointer", cursorDelay: 50 })
			.on("pointerover", () => {
				this.highlightMenuItem(button);
			})
			.on("pointerdown", () => {
				this.onMenuItemSelect(button);
			})
			.setAlpha(this.alphaNotSelected);

		return button;
	}

	protected getHeightButton(order: number) {
		let heightButton = this.HEIGHT_WORLD * 0.5;

		if (order === 0) {
			heightButton = this.HEIGHT_WORLD * 0.33;
		}
		if (order === 1) {
			heightButton = this.HEIGHT_WORLD * 0.5;
		}
		if (order == 2) {
			heightButton = this.HEIGHT_WORLD * 0.66;
		}

		// * This is the back button
		if (order == 999) {
			heightButton = this.HEIGHT_WORLD * 0.9;
		}

		return heightButton;
	}

	protected highlightMenuItem(buttonToHighlight: Phaser.GameObjects.Text) {
		if (buttonToHighlight) {
			this.selectedIndex = buttonToHighlight.getData("index");
			buttonToHighlight.setAlpha(1).setColor(this.colorSelected);
			const otherButtons: Phaser.GameObjects.Text[] = this.buttons.filter((button) => button !== buttonToHighlight);
			otherButtons.forEach((otherButton) => {
				otherButton.setAlpha(this.alphaNotSelected).setColor(this.color);
			});
		}
	}

	//#endregion

	//#region [Keyboard selection]
	private handleKeyboardInput(event: KeyboardEvent) {
		switch (event.code) {
			case "ArrowUp":
				this.moveSelectionUp();
				break;
			case "ArrowDown":
				this.moveSelectionDown();
				break;
			case "Enter":
				this.selectCurrentButton();
				break;
		}
	}

	private moveSelectionUp() {
		this.selectButton(this.selectedIndex - 1);
	}

	private moveSelectionDown() {
		this.selectButton(this.selectedIndex + 1);
	}

	private selectButton(index: number) {
		// Vérifiez les limites de l'index pour la navigation circulaire
		if (index < 0) {
			index = this.buttons.length - 1;
		} else if (index >= this.buttons.length) {
			index = 0;
		}

		// Désélectionnez le bouton précédent
		this.buttons[this.selectedIndex].setAlpha(this.alphaNotSelected).setColor(this.color);

		// Sélectionnez le nouveau bouton
		this.buttons[index].setAlpha(1).setColor(this.colorSelected);

		this.selectedIndex = index;
	}

	private selectCurrentButton() {
		// Exécutez l'action liée au bouton sélectionné (par exemple, démarrer un niveau, ouvrir une option, etc.)
		let currentButton = this.buttons[this.selectedIndex];
		this.onMenuItemSelect(currentButton);
	}
	//#endregion

	//#region Les trucs oubliés

	// private createExitButton(): Phaser.GameObjects.Text {
	// 	let exitButton: Phaser.GameObjects.Text = this.scene.add.text(this.scene.WIDTH_WORLD * 0.5, this.scene.HEIGHT_WORLD * 0.83,
	// 	  this.nameButtons.Exit, { font: "bold 4rem Arial", color: "#fff", stroke: '#00000', strokeThickness: 30 }
	// 	)
	// 	  .setData({ "index": this.buttons.length }) // Key in array
	// 	  .setName(this.nameButtons.Exit)
	// 	  .setOrigin(0.5)
	// 	  .setInteractive({ cursor: 'pointer', cursorDelay: 0 })
	// 	  .on("pointerover", () => {
	// 		this.highlight(exitButton);
	// 	  })
	// 	  .on("pointerdown", () => {
	// 		  this.doExit();
	// 	  })
	// 	  .setAlpha(this.alphaNotSelected);

	// 	return exitButton;
	//   }

	//#endregion
}
