export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }
    
    preload() {
        this.load.image('menu-background', 'assets/images/menu-background.jpg');
    }

    create() {
        // Add background image
        this.add.image(800, 350, 'menu-background').setDisplaySize(1600, 700);
    
        // Add title text
        let title = this.add.text(this.cameras.main.width / 2, 100, 'CassePonPong', { fontSize: '64px', color: '#fff' });
        title.setOrigin(0.5);
    
        // Add play button
        let playButton = this.add.text(this.cameras.main.width / 2, 270, 'Play', { fontSize: '32px', color: '#fff' });
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene', { musicOn: true });
        });
    }
}