import Phaser from "phaser";
import { GameScene } from "./Scenes/gameScene";
import { MenuScene } from "./Scenes/menuScene";
import { PauseScene } from "./Scenes/pauseScene";
import { MainScene } from "./Scenes/mainScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: "app",
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
		},
	},
	// First
	scene: [MenuScene, MainScene, GameScene, PauseScene],
};

export default new Phaser.Game(config);