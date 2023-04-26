export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private gameBorders!: Phaser.Physics.Arcade.StaticGroup;
  private worldBounds!: Phaser.GameObjects.TileSprite;
  private backButton!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/vecteezy_city-game-background_16138962.jpg');
    this.load.image('player', 'assets/images/Player.png');
    this.load.image('enemy', 'assets/images/Computer.png');
    this.load.audio('music', 'assets/musics/Line Noise - Magenta Moon (Part II).mp3');
  }

  create() {
    this.worldBounds = this.add.tileSprite(800, 350, 1600, 700, 'background');
    this.player = this.physics.add.sprite(100, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.worldBounds);

    const enemy = this.physics.add.sprite(700, 300, 'enemy');
    const music = this.sound.add('music');
    music.play();

    this.physics.add.collider(this.player, enemy, () => {
      console.log('Collision detected!');
    });

    this.createBackButton();
  }

  update() {
    this.handlePlayerMovement();
  
    const escapeKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escapeKey?.on('down', () => {
      if (!this.scene.isPaused()) {
        this.scene.pause();
        this.showBackButton();
      }
    });
  }

  private handlePlayerMovement() {
    const cursors = this.input.keyboard?.createCursorKeys();
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
  
    playerBody.setVelocity(0);
  
    if (cursors?.up.isDown) {
      playerBody.setVelocityY(-300);
    }
  
    if (cursors?.down.isDown) {
      playerBody.setVelocityY(300);
    }
  
    if (cursors?.left.isDown) {
      playerBody.setVelocityX(-300);
    }
  
    if (cursors?.right.isDown) {
      playerBody.setVelocityX(300);
    }
  }

  private createBackButton() {
    this.backButton = this.add.text(this.cameras.main.width / 2, 500, 'Back to Menu', { fontSize: '32px', color: '#fff' });
    this.backButton.setOrigin(0.5);
    this.backButton.visible = false;
  }

  private showBackButton() {
    this.backButton.setVisible(true);
    this.backButton.setInteractive();
    this.backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
