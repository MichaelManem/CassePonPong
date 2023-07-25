import { Ball } from "../../gameObjects/ball.ts";
import { BrickMaps } from "../../gameObjects/brick/brickMaps.ts";
import { Player } from "../../gameObjects/player.ts";
import { AbstractMenu } from "./abstractMenu.ts";

export class SettingsNewPong extends AbstractMenu {
	private readonly BUTTON_NAME_PLAY: string = "Start Game";
	private readonly BUTTON_NAME_BACK: string = "<- Back";
	private buttonChooseMap!: Phaser.GameObjects.Text;
	private readonly MAX_NB_BRICK_RANDOM: number = 170;
	private readonly MIN_NB_BRICK_RANDOM: number = 0;
	private readonly STEP_NB_BRICK_RANDOM: number = 2;
	private nbBrickToMapRandom: number = 0;
	private readonly BUTTON_NAME_SPEED_BALL: string = "Ball -> I am fast AF boy";
	private readonly MAX_SPEED_BALL: number = 1600;
	private readonly MIN_SPEED_BALL: number = 100;
	private readonly STEP_SPEED_BALL: number = 50;
	private speedBall: number = 800;
	private readonly BUTTON_NAME_ADD_SPEED_BALL: string = "Faster Stronger";
	private readonly MAX_ADD_SPEED_BALL: number = 200;
	private readonly MIN_ADD_SPEED_BALL: number = 0;
	private readonly STEP_ADD_SPEED_BALL: number = 1;
	private addSpeedBall: number = 0;
	private readonly BUTTON_NAME_SIZE_BALL: string = "Bigger Better";
	private readonly MAX_SIZE_BALL: number = 100;
	private readonly MIN_SIZE_BALL: number = 2;
	private readonly STEP_SIZE_BALL: number = 2;
	private sizeBall: number = 10;
	private readonly NAME_TEXTURE_BALL: string = "ballForShow";
	private ballForShow!: Ball;
	private readonly BUTTON_NAME_NB_BALL: string = "more ... BALLS";
	private readonly MAX_NB_BALL: number = 100;
	private readonly MIN_NB_BALL: number = 1;
	private readonly STEP_NB_BALL: number = 1;
	private nbBall: number = 1;
	private readonly BUTTON_NAME_HEIGHT_PONG: string = "Pong height";
	private readonly MAX_HEIGHT_PONG: number = 500;
	private readonly MIN_HEIGHT_PONG: number = 10;
	private readonly STEP_HEIGHT_PONG: number = 5;
	private heightPong: number = 150;
	private readonly BUTTON_NAME_WIDTH_PONG: string = "Pong width";
	private readonly MAX_WIDTH_PONG: number = 200;
	private readonly MIN_WIDTH_PONG: number = 10;
	private readonly STEP_WIDTH_PONG: number = 5;
	private widthPong: number = 25;
	private readonly NAME_TEXTURE_PONG: string = "pongForShow";
	private pongForShow!: Player;
	private readonly BUTTON_NAME_SPEED_PONG: string = "Pong -> I am fast AF boy";
	private readonly MAX_SPEED_PONG: number = 5000;
	private readonly MIN_SPEED_PONG: number = 1000;
	private readonly STEP_SPEED_PONG: number = 200;
	private speedPong: number = 1600;
	private readonly BUTTON_NAME_SCORE_TO_WIN: string = "Score Max";
	private readonly MAX_SCORE_TO_WIN: number = 100;
	private readonly MIN_SCORE_TO_WIN: number = 1;
	private readonly STEP_SCORE_TO_WIN: number = 1;
	private scoreToWin: number = 7;

	private meteoBallSizeRandom: boolean = false;
	private meteoBallSizeUp: boolean = false;
	private meteoBallSizeDown: boolean = false;
	private meteoPongSizeUp: boolean = false;
	private meteoPongSizeDown: boolean = false;
	private meteoPongSpeedUp: boolean = false;

	private chao: boolean = false;

	constructor() {
		super({ key: "SettingsNewPong" });
	}

	create() {
		this.menuTitle = "Game Parameters";
		super.create();
		this.createCheckBoxMeteo();
		this.startGame();
		this.createCheckBoxChao();
	}

	public startGame(): void {
		const start = this.add.dom(this.WIDTH_WORLD * 0.80, this.HEIGHT_WORLD * 0.70).createFromHTML(`
			<div>
				<button type="button" id="startGame">Start Game</button>
			</div>
	  	`);

		// Add a click event listener to the save button
		start.addListener('click');

		start.on('click', (event: any) => {
			this.scene.start("NewPong",
				{
					buttonMap: this.buttonChooseMap,
					nbBrickToMapRandom: this.nbBrickToMapRandom,
					speedBall: this.speedBall,
					sizeBall: this.sizeBall,
					addSpeedBall: this.addSpeedBall,
					nbBall: this.nbBall,
					heightPong: this.heightPong,
					widthPong: this.widthPong,
					speedPong: this.speedPong,
					scoreToWin: this.scoreToWin,
					meteo: {
						ballSizeUp: this.meteoBallSizeUp,
						ballSizeDown: this.meteoBallSizeDown,
						pongSizeUp: this.meteoPongSizeUp,
						pongSizeDown: this.meteoPongSizeDown,
						pongSpeedUp: this.meteoPongSpeedUp,
						ballSizeRandom: this.meteoBallSizeRandom
					},
					chao: this.chao
				}
			);
		});
	}

	public pongSize(): void {
		const checkBoxMeteo = this.add.dom(this.WIDTH_WORLD * 0.80, this.HEIGHT_WORLD * 0.80).createFromHTML(`
			<fieldset>
				<legend>Size of the pong:</legend>

				<input type="number" step="10" min="10" max="100" id="meteo_pong_size_up">
			</fieldset>
	  	`);

		// Add a click event listener to the save button
		checkBoxMeteo.addListener('click');

		checkBoxMeteo.on('click', (event: any) => {
			// if (event.target.id === 'meteo_pong_size_up') {
			// 	this.meteoPongSizeUp = event.target.checked;
			// }
		});
	}

	public createCheckBoxChao(): void {
		const chaos = this.add.dom(this.WIDTH_WORLD * 0.80, this.HEIGHT_WORLD * 0.88).createFromHTML(`
			<fieldset>
				<legend>ARE YOU READY FOR CHAOS ???</legend>

				<div>
					<input type="checkbox" id="chao" name="chao">
					<label for="chao">Yes ??</label>
				</div>
			</fieldset>
	  	`);

		// Add a click event listener to the save button
		chaos.addListener('click');

		chaos.on('click', (event: any) => {
			if (event.target.id === 'chao') {
				this.chao = event.target.checked;
			}
		});
	}

	public createCheckBoxMeteo(): void {
		const checkBoxMeteo = this.add.dom(this.WIDTH_WORLD * 0.80, this.HEIGHT_WORLD * 0.80).createFromHTML(`
			<fieldset>
				<legend>Choose your random modification in game:</legend>

				<div>
					<input type="checkbox" id="meteo_ball_size_random" name="meteo_ball_size_random">
					<label for="meteo_ball_size_random">Ball Size Random</label>
				</div>

				<div>
					<input type="checkbox" id="meteo_ball_size_up" name="meteo_ball_size_up">
					<label for="meteo_ball_size_up">Ball Size Up</label>
				</div>

				<div>
					<input type="checkbox" id="meteo_ball_size_down" name="meteo_ball_size_down">
					<label for="meteo_ball_size_down">Ball Size Down</label>
				</div>

				<div>
					<input type="checkbox" id="meteo_pong_size_up" name="meteo_pong_size_up">
					<label for="meteo_pong_size_up">Pong Size Up</label>
				</div>

				<div>
					<input type="checkbox" id="meteo_pong_size_down" name="meteo_pong_size_down">
					<label for="meteo_pong_size_down">Pong Size Down</label>
				</div>

				<div>
					<input type="checkbox" id="meteo_pong_speed_up" name="meteo_pong_speed_up">
					<label for="meteo_pong_speed_up">Pong Speed Up</label>
				</div>
			</fieldset>
	  	`);

		// Add a click event listener to the save button
		checkBoxMeteo.addListener('click');

		checkBoxMeteo.on('click', (event: any) => {
			if (event.target.id === 'meteo_pong_size_up') {
				this.meteoPongSizeUp = event.target.checked;
			}
			if (event.target.id === 'meteo_pong_size_down') {
				this.meteoPongSizeDown = event.target.checked;
			}
			if (event.target.id === 'meteo_ball_size_up') {
				this.meteoBallSizeUp = event.target.checked;
			}
			if (event.target.id === 'meteo_ball_size_down') {
				this.meteoBallSizeDown = event.target.checked;
			}
			if (event.target.id === 'meteo_pong_speed_up') {
				this.meteoPongSpeedUp = event.target.checked;
			}
		});
	}

	// Implémenter les méthodes abstraites
	protected createMenuItems(): Phaser.GameObjects.Text[] {
		const menuItems: Phaser.GameObjects.Text[] = [];
		this.buttonChooseMap = this.createButton(0, 0, BrickMaps.names['MAP_1'], BrickMaps.names['MAP_1'], this.buttonSizeFontMedium);
		let textButtonSpeedBall = this.BUTTON_NAME_SPEED_BALL + " :	" + this.speedBall;
		let textButtonSizeBall = this.BUTTON_NAME_SIZE_BALL + " :	" + this.sizeBall;
		let textButtonAddSpeedBall = this.BUTTON_NAME_ADD_SPEED_BALL + " :	" + this.addSpeedBall;
		let textButtonNbBall = this.BUTTON_NAME_NB_BALL + " :	" + this.nbBall;
		let textButtonHeightPong = this.BUTTON_NAME_HEIGHT_PONG + " :	" + this.heightPong;
		let textButtonWidthPong = this.BUTTON_NAME_WIDTH_PONG + " :	" + this.widthPong;
		let textButtonSpeedPong = this.BUTTON_NAME_SPEED_PONG + " :	" + this.speedPong;
		let textButtonScoreToWin = this.BUTTON_NAME_SCORE_TO_WIN + " :	" + this.scoreToWin;

		this.createTextureBall();
		this.ballForShow = new Ball(this, 0, this.WIDTH_WORLD * 0.335, this.HEIGHT_WORLD * 0.66, this.NAME_TEXTURE_BALL, 0);
		this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);

		menuItems.push(this.buttonChooseMap);
		menuItems.push(this.createButton(0, 1, this.BUTTON_NAME_SPEED_BALL, textButtonSpeedBall, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(0, 2, this.BUTTON_NAME_SIZE_BALL, textButtonSizeBall, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(0, 3, this.BUTTON_NAME_ADD_SPEED_BALL, textButtonAddSpeedBall, this.buttonSizeFontMedium));

		menuItems.push(this.createButton(1, 0, this.BUTTON_NAME_PLAY, this.BUTTON_NAME_PLAY, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 1, this.BUTTON_NAME_NB_BALL, textButtonNbBall, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 2, this.BUTTON_NAME_HEIGHT_PONG, textButtonHeightPong, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 3, this.BUTTON_NAME_WIDTH_PONG, textButtonWidthPong, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(1, 999, this.BUTTON_NAME_BACK, this.BUTTON_NAME_BACK, this.buttonSizeFontLittle));

		menuItems.push(this.createButton(2, 0, this.BUTTON_NAME_SPEED_PONG, textButtonSpeedPong, this.buttonSizeFontMedium));
		menuItems.push(this.createButton(2, 1, this.BUTTON_NAME_SCORE_TO_WIN, textButtonScoreToWin, this.buttonSizeFontMedium));

		this.createTexturePong();
		this.pongForShow = new Player(this, 0.66, 0.66, this.NAME_TEXTURE_PONG);
		this.pongForShow.setDisplaySize(this.widthPong, this.heightPong);

		return menuItems;
	}

	private createTextureBall() {
		const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
		graphics.fillStyle(0xffffff);
		graphics.fillRect(0, 0, this.MAX_SIZE_BALL, this.MAX_SIZE_BALL);
		graphics.generateTexture("ballForShow", this.MAX_SIZE_BALL, this.MAX_SIZE_BALL);
		graphics.destroy();
	}

	private createTexturePong() {
		const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
		graphics.fillStyle(0xffffff);
		graphics.fillRect(0, 0, this.MAX_WIDTH_PONG, this.MAX_HEIGHT_PONG);
		graphics.generateTexture("pongForShow", this.MAX_WIDTH_PONG, this.MAX_HEIGHT_PONG);
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
						addSpeedBall: this.addSpeedBall,
						nbBall: this.nbBall,
						heightPong: this.heightPong,
						widthPong: this.widthPong,
						speedPong: this.speedPong,
						scoreToWin: this.scoreToWin,
						meteo: {
							ballSizeUp: this.meteoBallSizeUp,
							ballSizeDown: this.meteoBallSizeDown,
							pongSizeUp: this.meteoPongSizeUp,
							pongSizeDown: this.meteoPongSizeDown,
							pongSpeedUp: this.meteoPongSpeedUp
						},
						chao: this.chao
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
		switch (this.currentButton.name) {
			case BrickMaps.names['MAP_RANDOM']:
				if (this.nbBrickToMapRandom > this.MIN_NB_BRICK_RANDOM) {
					this.nbBrickToMapRandom = this.nbBrickToMapRandom - this.STEP_NB_BRICK_RANDOM;
				}
				this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
				break;

			case this.BUTTON_NAME_SPEED_BALL:
				if (this.speedBall > this.MIN_SPEED_BALL) {
					this.speedBall = this.speedBall - this.STEP_SPEED_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_SPEED_BALL + " : " + this.speedBall;
				break;

			case this.BUTTON_NAME_SIZE_BALL:
				if (this.sizeBall > this.MIN_SIZE_BALL) {
					this.sizeBall = this.sizeBall - this.STEP_SIZE_BALL;
					this.ballForShow.setSize(this.sizeBall, this.sizeBall);
					this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);
				}
				this.currentButton.text = this.BUTTON_NAME_SIZE_BALL + " : " + this.sizeBall;
				break;

			case this.BUTTON_NAME_ADD_SPEED_BALL:
				if (this.addSpeedBall > this.MIN_ADD_SPEED_BALL) {
					this.addSpeedBall = this.addSpeedBall - this.STEP_ADD_SPEED_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_ADD_SPEED_BALL + " : " + this.addSpeedBall;
				break;

			case this.BUTTON_NAME_NB_BALL:
				if (this.nbBall > this.MIN_NB_BALL) {
					this.nbBall = this.nbBall - this.STEP_NB_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_NB_BALL + " : " + this.nbBall;
				break;

			case this.BUTTON_NAME_HEIGHT_PONG:
				if (this.heightPong > this.MIN_HEIGHT_PONG) {
					this.heightPong = this.heightPong - this.STEP_HEIGHT_PONG;
					this.pongForShow.setSize(this.widthPong, this.heightPong);
					this.pongForShow.setDisplaySize(this.widthPong, this.heightPong);
				}
				this.currentButton.text = this.BUTTON_NAME_HEIGHT_PONG + " : " + this.heightPong;
				break;

			case this.BUTTON_NAME_WIDTH_PONG:
				if (this.widthPong > this.MIN_WIDTH_PONG) {
					this.widthPong = this.widthPong - this.STEP_WIDTH_PONG;
					this.pongForShow.setSize(this.widthPong, this.heightPong);
					this.pongForShow.setDisplaySize(this.widthPong, this.heightPong);
				}
				this.currentButton.text = this.BUTTON_NAME_HEIGHT_PONG + " : " + this.widthPong;
				break;

			case this.BUTTON_NAME_SPEED_PONG:
				if (this.speedPong > this.MIN_SPEED_PONG) {
					this.speedPong = this.speedPong - this.STEP_SPEED_PONG;
				}
				this.currentButton.text = this.BUTTON_NAME_SPEED_PONG + " : " + this.speedPong;
				break;

			case this.BUTTON_NAME_SCORE_TO_WIN:
				if (this.scoreToWin > this.MIN_SCORE_TO_WIN) {
					this.scoreToWin = this.scoreToWin - this.STEP_SCORE_TO_WIN;
				}
				this.currentButton.text = this.BUTTON_NAME_SCORE_TO_WIN + " : " + this.scoreToWin;
				break;

			default:
				break;
		}
	}

	protected increaseSelection() {
		switch (this.currentButton.name) {
			case BrickMaps.names['MAP_RANDOM']:
				if (this.nbBrickToMapRandom < this.MAX_NB_BRICK_RANDOM) {
					this.nbBrickToMapRandom = this.nbBrickToMapRandom + this.STEP_NB_BRICK_RANDOM;
				}
				this.currentButton.text = BrickMaps.names['MAP_RANDOM'] + " " + this.nbBrickToMapRandom;
				break;

			case this.BUTTON_NAME_SPEED_BALL:
				if (this.speedBall < this.MAX_SPEED_BALL) {
					this.speedBall = this.speedBall + this.STEP_SPEED_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_SPEED_BALL + " :	" + this.speedBall;
				break;

			case this.BUTTON_NAME_SIZE_BALL:
				if (this.sizeBall < this.MAX_SIZE_BALL) {
					this.sizeBall = this.sizeBall + this.STEP_SIZE_BALL;
					this.ballForShow.setSize(this.sizeBall, this.sizeBall);
					this.ballForShow.setDisplaySize(this.sizeBall, this.sizeBall);
				}
				this.currentButton.text = this.BUTTON_NAME_SIZE_BALL + " : " + this.sizeBall;
				break;

			case this.BUTTON_NAME_ADD_SPEED_BALL:
				if (this.addSpeedBall < this.MAX_ADD_SPEED_BALL) {
					this.addSpeedBall = this.addSpeedBall + this.STEP_ADD_SPEED_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_ADD_SPEED_BALL + " :	" + this.addSpeedBall;
				break;

			case this.BUTTON_NAME_NB_BALL:
				if (this.nbBall < this.MAX_NB_BALL) {
					this.nbBall = this.nbBall + this.STEP_NB_BALL;
				}
				this.currentButton.text = this.BUTTON_NAME_NB_BALL + " : " + this.nbBall;
				break;

			case this.BUTTON_NAME_HEIGHT_PONG:
				if (this.heightPong < this.MAX_HEIGHT_PONG) {
					this.heightPong = this.heightPong + this.STEP_HEIGHT_PONG;
					this.pongForShow.setSize(this.widthPong, this.heightPong);
					this.pongForShow.setDisplaySize(this.widthPong, this.heightPong);
				}
				this.currentButton.text = this.BUTTON_NAME_HEIGHT_PONG + " : " + this.heightPong;
				break;

			case this.BUTTON_NAME_WIDTH_PONG:
				if (this.widthPong < this.MAX_WIDTH_PONG) {
					this.widthPong = this.widthPong + this.STEP_WIDTH_PONG;
					this.pongForShow.setSize(this.widthPong, this.heightPong);
					this.pongForShow.setDisplaySize(this.widthPong, this.heightPong);
				}
				this.currentButton.text = this.BUTTON_NAME_WIDTH_PONG + " : " + this.widthPong;
				break;

			case this.BUTTON_NAME_SPEED_PONG:
				if (this.speedPong < this.MAX_SPEED_PONG) {
					this.speedPong = this.speedPong + this.STEP_SPEED_PONG;
				}
				this.currentButton.text = this.BUTTON_NAME_SPEED_PONG + " :	" + this.speedPong;
				break;

			case this.BUTTON_NAME_SCORE_TO_WIN:
				if (this.scoreToWin < this.MAX_SCORE_TO_WIN) {
					this.scoreToWin = this.scoreToWin + this.STEP_SCORE_TO_WIN;
				}
				this.currentButton.text = this.BUTTON_NAME_SCORE_TO_WIN + " :	" + this.scoreToWin;
				break;

			default:
				break;
		}
	}
}
