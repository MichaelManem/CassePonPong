import { Ball } from "../../gameObjects/ball.ts";
import { BrickMaps } from "../../gameObjects/brick/brickMaps.ts";
import { AbstractMenu } from "./abstractMenu.ts";

export class SettingsNewPong extends AbstractMenu {
	private readonly BUTTON_NAME_PLAY: string = "Start Game";
	private readonly BUTTON_NAME_SIZE_BALL: string = "Size Ball";
	private readonly BUTTON_NAME_BACK: string = "<- Back";
	private buttonChooseMap!: Phaser.GameObjects.Text;
	private readonly MAX_NB_BRICK_RANDOM: number = 170;
	private readonly MIN_NB_BRICK_RANDOM: number = 0;
	private readonly STEP_NB_BRICK_RANDOM: number = 2;
	private nbBrickToMapRandom: number = 0;
	private readonly BUTTON_NAME_SPEED_BALL: string = "Speed Ball";
	private readonly MAX_SPEED_BALL: number = 1600;
	private readonly MIN_SPEED_BALL: number = 100;
	private readonly STEP_SPEED_BALL: number = 50;
	private speedBall: number = 800;
	private readonly BUTTON_NAME_ADD_SPEED_BALL: string = "Added Speed Ball On Player";
	private readonly MAX_ADD_SPEED_BALL: number = 200;
	private readonly MIN_ADD_SPEED_BALL: number = 0;
	private readonly STEP_ADD_SPEED_BALL: number = 1;
	private addSpeedBall: number = 0;
	private readonly MAX_SIZE_BALL: number = 100;
	private readonly MIN_SIZE_BALL: number = 2;
	private readonly STEP_SIZE_BALL: number = 1;
	private sizeBall: number = 10;
	private ballForShow!: Ball;
	private readonly NAME_TEXTURE_BALL: string = "ballForShow";

	constructor() {
		super({ key: "SettingsNewPong" });
	}

	create() {
		this.createRandomBackground("SettingsNewPong");
		this.menuTitle = "Pre-Setttings";
		super.create();
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];
		this.buttonChooseMap = this.createButton(0, 0, BrickMaps.names['MAP_1'], BrickMaps.names['MAP_1'], this.buttonSizeFontMedium);
		let textButtonSpeedBall = this.BUTTON_NAME_SPEED_BALL + " :	" + this.speedBall;
		let textButtonSizeBall = this.BUTTON_NAME_SIZE_BALL + " :	" + this.sizeBall;
		let textButtonAddSpeedBall = this.BUTTON_NAME_ADD_SPEED_BALL + " :	" + this.addSpeedBall;

		menuItems.push(this.buttonChooseMap);
		menuItems.push(this.createButton(0, 1, this.BUTTON_NAME_SPEED_BALL, textButtonSpeedBall, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(0, 2, this.BUTTON_NAME_SIZE_BALL, textButtonSizeBall, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(0, 3, this.BUTTON_NAME_ADD_SPEED_BALL, textButtonAddSpeedBall, this.buttonSizeFontMedium));
		this.createTextureBall();
		this.ballForShow = new Ball(this, this.WIDTH_WORLD * 0.32, this.HEIGHT_WORLD * 0.66, this.NAME_TEXTURE_BALL, 0);
		this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);
		menuItems.push(this.createButton(1, 0, this.BUTTON_NAME_PLAY, this.BUTTON_NAME_PLAY, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 999, this.BUTTON_NAME_BACK, this.BUTTON_NAME_BACK, this.buttonSizeFontLittle));

		return menuItems;
	}
	
    private createTextureBall() {
        const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, 0, this.sizeBall, this.sizeBall);
        graphics.generateTexture("ballForShow", this.sizeBall, this.sizeBall);
        graphics.destroy();
    }

	protected onMenuItemSelect(button: Phaser.GameObjects.Text): void {
		switch (button.name) {
			case this.BUTTON_NAME_PLAY:
				this.scene.start("NewPong", 
					{ 
						buttonMap: this.buttonChooseMap,
						nbBrickToMapRandom: this.nbBrickToMapRandom,
						speedBall: this.speedBall,
						sizeBall: this.sizeBall,
						addSpeedBall: this.addSpeedBall
					}
				);
				break;
			case BrickMaps.names['MAP_1']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_2'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_2'];
				break;
			case BrickMaps.names['MAP_2']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_3'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_3'];
				break;
			case BrickMaps.names['MAP_3']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_4'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_4'];
				break;
			case BrickMaps.names['MAP_4']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_RANDOM'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
				break;
			case BrickMaps.names['MAP_RANDOM']:
				this.buttonChooseMap.name = BrickMaps.names['MAP_1'];
				this.buttonChooseMap.text = BrickMaps.names['MAP_1'];
				break;
			case this.BUTTON_NAME_BACK:
				this.scene.start("MainMenuScene");
				break;
		}
	}

	protected decreaseSelection() {
		if (this.currentButton.name === BrickMaps.names['MAP_RANDOM']) {
			if(this.nbBrickToMapRandom > this.MIN_NB_BRICK_RANDOM) {
				this.nbBrickToMapRandom = this.nbBrickToMapRandom - this.STEP_NB_BRICK_RANDOM;
			}
			this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
		} else if (this.currentButton.name === this.BUTTON_NAME_SPEED_BALL) {
			if(this.speedBall > this.MIN_SPEED_BALL) {
				this.speedBall = this.speedBall - this.STEP_SPEED_BALL;
			}
			this.currentButton.text = this.BUTTON_NAME_SPEED_BALL + " :	" + this.speedBall;
		} else if (this.currentButton.name === this.BUTTON_NAME_SIZE_BALL) {
			if(this.sizeBall > this.MIN_SIZE_BALL) {
				this.sizeBall = this.sizeBall - this.STEP_SIZE_BALL;
				this.ballForShow.setSize(this.sizeBall, this.sizeBall);
				this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);
			}
			this.currentButton.text = this.BUTTON_NAME_SIZE_BALL + " :	" + this.sizeBall;
		} else if (this.currentButton.name === this.BUTTON_NAME_ADD_SPEED_BALL) {
			if(this.addSpeedBall > this.MIN_ADD_SPEED_BALL) {
				this.addSpeedBall = this.addSpeedBall - this.STEP_ADD_SPEED_BALL;
			}
			this.currentButton.text = this.BUTTON_NAME_ADD_SPEED_BALL + " :	" + this.addSpeedBall;
		}
	}

	protected increaseSelection() {
		if (this.currentButton.name === BrickMaps.names['MAP_RANDOM']) {
			if(this.nbBrickToMapRandom < this.MAX_NB_BRICK_RANDOM) {
				this.nbBrickToMapRandom = this.nbBrickToMapRandom + this.STEP_NB_BRICK_RANDOM;
			}
			this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
		} else if (this.currentButton.name === this.BUTTON_NAME_SPEED_BALL) {
			if(this.speedBall < this.MAX_SPEED_BALL) {
				this.speedBall = this.speedBall + this.STEP_SPEED_BALL;
			}
			this.currentButton.text = this.BUTTON_NAME_SPEED_BALL + " :	" + this.speedBall;
		} else if (this.currentButton.name === this.BUTTON_NAME_SIZE_BALL) {
			if(this.sizeBall < this.MAX_SIZE_BALL) {
				this.sizeBall = this.sizeBall + this.STEP_SIZE_BALL;
				this.ballForShow.setSize(this.sizeBall, this.sizeBall);
				this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);
			}
			this.currentButton.text = this.BUTTON_NAME_SIZE_BALL + " :	" + this.sizeBall;
		} else if (this.currentButton.name === this.BUTTON_NAME_ADD_SPEED_BALL) {
			if(this.addSpeedBall < this.MAX_ADD_SPEED_BALL) {
				this.addSpeedBall = this.addSpeedBall + this.STEP_ADD_SPEED_BALL;
			}
			this.currentButton.text = this.BUTTON_NAME_ADD_SPEED_BALL + " :	" + this.addSpeedBall;
		}
	}
}
