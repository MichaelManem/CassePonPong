import Phaser from "phaser";
import { Pong } from "./Scenes/Game/pong";
import { Menu } from "./Scenes/menu";
import { Option } from "./Scenes/option";
import { Pause } from "./Scenes/pause";
import { PreScene } from "./Scenes/preScene";

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
	scene: [Menu, Option, Pong, Pause]
};

var game = new Phaser.Game(config);