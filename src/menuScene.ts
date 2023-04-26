export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'menu-background').setOrigin(0);
    
        // Add title text
        let title = this.add.text(this.cameras.main.width / 2, 100, 'My Game', { fontSize: '64px', color: '#fff' });
        title.setOrigin(0.5);
    
        // Add play button
        let playButton = this.add.text(this.cameras.main.width / 2, 300, 'Play', { fontSize: '32px', color: '#fff' });
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}