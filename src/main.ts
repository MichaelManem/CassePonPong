import Phaser from 'phaser'
import { GameScene } from './gameScene';
import { MenuScene } from './menuScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1600,
	height: 700,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [MenuScene, GameScene],
}

export default new Phaser.Game(config)