import { MainScene } from "./mainScene";

export class GameScene extends MainScene {
  private player1!: Phaser.Physics.Arcade.Sprite;
  private player2!: Phaser.Physics.Arcade.Sprite;
  private worldBounds!: Phaser.GameObjects.TileSprite;
  private backgroundMusic!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private baseSpeedMovePlayer1: number = 400;
  private currentSpeedMovePlayer1: number = this.baseSpeedMovePlayer1;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image(
      "background",
      "assets/images/vecteezy_city-game-background_16138962.jpg"
    );
    this.load.image("player", "assets/images/Player.png");
    this.load.image("enemy", "assets/images/Computer.png");
    this.load.audio(
      "music",
      "assets/musics/Line Noise - Magenta Moon (Part II).mp3"
    );
  }

  create() {
    super.create();

    // Créer un evenement qui va etre appelé lors du 'resume' de cette scene
    this.resumeMusicWhenSceneResume();

    // TODO - Séparer les bordures du jeu qui doivent etre invisible du background du jeu
    //Les bordures du jeu
    this.worldBounds = this.add.tileSprite(
      this.WIDTH / 2,
      this.HEIGHT / 2,
      this.WIDTH,
      this.HEIGHT,
      "background"
    );

    this.createPlayer1();
    this.createPlayer2();

    // MUSIC !
    this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
    this.backgroundMusic.play();

    const escapeKey = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
    escapeKey?.on("down", () => {
      if (!this.scene.isPaused()) {
        let dataPauseScene = { sceneBeforePause: "GameScene" };
        this.scene.launch("PauseScene", dataPauseScene);
        this.scene.pause();
        this.backgroundMusic.pause();
      }
    });
  }


  update() {
    this.handlePlayer1Movement();
  }

  //#region - private functions
  private createPlayer2() {
    this.player2 = this.physics.add.sprite(this.WIDTH / 30, this.HEIGHT / 2, "enemy").setScale(this.scaleRatio);
    this.player2.setCollideWorldBounds(true);
    this.physics.add.collider(this.player2, this.worldBounds);
  }

  private createPlayer1() {
    this.player1 = this.physics.add.sprite(this.WIDTH / 50, this.HEIGHT / 2, "player").setScale(this.scaleRatio);
    this.player1.flipX = true;
    this.player1.setCollideWorldBounds(true);
    this.physics.add.collider(this.player1, this.worldBounds);
  }
  
  private handlePlayer1Movement() {
    const cursors = this.input.keyboard?.createCursorKeys();
    const playerBody = this.player1.body as Phaser.Physics.Arcade.Body;

    playerBody.setVelocity(0);

    if (cursors?.up.isDown) {
      playerBody.setVelocityY(-this.applyScale(this.currentSpeedMovePlayer1));
    }

    if (cursors?.down.isDown) {
      playerBody.setVelocityY(this.applyScale(this.currentSpeedMovePlayer1));
    }
  }

  private resumeMusicWhenSceneResume() {
    this.events.on("resume", () => {
      if (this.backgroundMusic.isPaused) {
        this.backgroundMusic.resume();
      }
    });
  }
  //#endregion
}
