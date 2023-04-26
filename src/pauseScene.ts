export class PauseScene extends Phaser.Scene {
    private backButton!: Phaser.GameObjects.Text;
    private dataScene: any;

    constructor() {
        super({ key: 'PauseScene' });
    }

    init(data: any) {
        this.dataScene = data;
    }

    create() {
        this.createBackButton();

        const escapeKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        escapeKey?.on('down', () => {
            // TODO - Besoin de rendre dynamique la scene qu'on doit retourner si on a plusieurs mode de jeu (donc plusieurs scenes contenant une pause)
            this.scene.resume(this.dataScene.sceneBeforePause, { musicOn: true });
            this.scene.stop();
        });
    }

    update() {

    }

    private createBackButton() {
        this.backButton = this.add.text(this.cameras.main.width / 2, 500, 'Back to Menu', { fontSize: '32px', color: '#fff' });
        this.backButton.setOrigin(0.5);
        this.backButton.setInteractive();
        this.backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
            this.scene.stop('GameScene', { musicOn: false });
            this.scene.stop('PauseScene');
        });
        this.backButton.setVisible(true);
    }
}