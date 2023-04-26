export class GameScene extends Phaser.Scene {

  player: Phaser.Physics.Arcade.Sprite | undefined;
  gameBorders: Phaser.Physics.Arcade.StaticGroup | undefined;
  worldBounds: Phaser.GameObjects.TileSprite | undefined;
  backButton: Phaser.GameObjects.Text | undefined;
  
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Load assets
    this.load.image('background', 'assets/vecteezy_city-game-background_16138962.jpg');
    this.load.image('player', 'assets/Player.png');
    this.load.image('enemy', 'assets/Computer.png');
    this.load.audio('music', 'assets/Line Noise - Magenta Moon (Part II).mp3');
  }

  create() {
      // Create game objects
      //this.add.image(800, 450, 'background');
      this.worldBounds = this.add.tileSprite(800, 350, 1600, 700, 'background');
      this.player = this.physics.add.sprite(100, 300, 'player');
      //this.player = this.add.rectangle(50, 200, 10, 80, 0xffffff);
      this.player.setCollideWorldBounds(true);
      //this.player.setCollideWorldBounds(true, 0, 0.5);
      this.physics.add.collider(this.player, this.worldBounds);
      const enemy = this.physics.add.sprite(700, 300, 'enemy');
      const music = this.sound.add('music');
      music.play();

      // Add collision between player and enemy
      this.physics.add.collider(this.player, enemy, () => {
          console.log('Collision detected!');
      });

      // Add back to menu button
      this.backButton = this.add.text(this.cameras.main.width / 2, 500, 'Back to Menu', { fontSize: '32px', color: '#fff' });
      this.backButton.setOrigin(0.5);
      this.backButton.visible = false;

  }

  update() {
    // Update game state
    const cursors = this.input?.keyboard?.createCursorKeys();
    const playerBody = this.player?.body as Phaser.Physics.Arcade.Body;

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
    
    // Set up escape key listener
    let escapeKey = this.input?.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    console.log(escapeKey)
    escapeKey?.on('down', () => this.scene.pause);

    if (this.scene.isPaused()) {
      this.backButton?.setVisible(true);
      this.backButton?.setInteractive();
      this.backButton?.on('pointerdown', () => {
          this.scene.start('MenuScene');
      });
    }
  }
}