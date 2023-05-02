import Phaser from "phaser";
import { NewPong } from "./Scenes/Game/Pong/newPong";
import { OldPong } from "./Scenes/Game/OldPong/oldPong";
import { Menu } from "./Scenes/menu";
import { Option } from "./Scenes/option";
import { GameChoice } from "./Scenes/gameChoice";
import { Pause } from "./Scenes/Game/pause";

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
	scene: [Menu, Option, GameChoice, NewPong, OldPong, Pause]
};

var game = new Phaser.Game(config);