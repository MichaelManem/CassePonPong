export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private worldBounds!: Phaser.GameObjects.TileSprite;
  private music!: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: any) {
    if(data.musicOn && this.music && this.music.isPaused) {
      this.music.play();
    } else if (data.musicOn && this.music && !this.music.isPaused) {
      this.music.stop();
    }
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
    this.music = this.sound.add('music');
    this.music.setLoop(true);
    this.music.play();

    this.physics.add.collider(this.player, enemy, () => {
      console.log('Collision detected!');
    });
  
    const escapeKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    escapeKey?.on('down', () => {
      if (!this.scene.isPaused()) {
        let dataPauseScene = { sceneBeforePause: 'GameScene', music: this.music };
        this.scene.launch('PauseScene', dataPauseScene);
        this.scene.pause();
        this.music.pause();
      }
    });
  }

  update() {
    this.handlePlayerMovement();
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

  destroy() {
    this.music.stop();
  }

  stop() {
    this.music.stop();
  }
}
