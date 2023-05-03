import Phaser from "phaser";
import { NewPong } from "./Scenes/games/pong/newPong.ts";
import { OldPong } from "./Scenes/games/oldPong/oldPong.ts";
import { MainMenu } from "./Scenes/menus/mainMenu.ts";
import { GameMenu } from "./Scenes/menus/gameMenu.ts";
import { PauseMenu } from "./Scenes/menus/pauseMenu.ts";
import { SettingsMenu } from "./Scenes/menus/settingsMenu.ts";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
    // Game size
    width: 2560,
    height: 1440,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        zoom: 1,  // Size of game canvas = game size * zoom
    },
    autoRound: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
		},
	},
	// When game is launch, he play the first scene of this array
	scene: [
        MainMenu, 
        GameMenu, 
        PauseMenu,
        SettingsMenu, 
        NewPong, 
        OldPong, 
    ]
};

var game = new Phaser.Game(config);