import { PreScene } from "../preScene";

export class Pong extends PreScene {
  private player1!: Phaser.Physics.Arcade.Sprite;
  private player2!: Phaser.Physics.Arcade.Sprite;
  private worldBounds!: Phaser.Physics.Arcade.World;
  private backgroundMusic!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;
  private baseSpeedMovePlayer1: number = 1300;
  private currentSpeedMovePlayer1: number = this.baseSpeedMovePlayer1;

  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("player1", "assets/images/Player.png");
    this.load.image("player2", "assets/images/Computer.png");
    this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
  }

  create() {
    super.create();
    this.createMusic();
    this.createBackground(this.scene.get("GameScene"));
    this.createPlayer1();
    this.createPlayer2();
    this.createWorldBounds();
    this.createPauseKey();
  }

  update() {
    this.handlePlayer1Movement();
  }

  //#region - private method
  //----------------------------

  /**
   * Créer la music en fond
   */
  private createMusic() {
    this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
    this.backgroundMusic.play();

    // Créer un evenement qui va etre appelé lors du 'resume' de cette scene
    this.resumeMusicWhenSceneResume();
  }

  /**
   * Reprend la music lorsque cette scene reprend
   */
  private resumeMusicWhenSceneResume() {
    this.events.on("resume", () => {
      if (this.backgroundMusic.isPaused) {
        this.backgroundMusic.resume();
      }
    });
  }

  /**
   * Creation du joueur 1
   */
  private createPlayer1() {
    this.player1 = this.physics.add.sprite(this.WIDTH_WORLD / 50, this.HEIGHT_WORLD / 2, "player1")
      .setCollideWorldBounds(true);
    this.player1.flipX = true;
    this.player1.setCollideWorldBounds(true);  
  }

  private createPlayer2() {
    console.log("posX", this.WIDTH_WORLD/10);
    this.player2 = this.physics.add.sprite(this.WIDTH_WORLD, this.HEIGHT_WORLD / 2, "player2")
      .setCollideWorldBounds(true);
    this.player2.flipX = true;
    this.player2.setCollideWorldBounds(true);  
  }

  private createWorldBounds() {
    //Calcul x, y, width an d height for worldBounds
    const gapBetweenBackgroundAndWorldHeight = 50;
    const heightWorldBounds = this.HEIGHT_WORLD - (gapBetweenBackgroundAndWorldHeight * 2);
    const gapBetweenBackgroundAndWorldWidth = 50;
    const widthWorldBounds = this.WIDTH_WORLD - (gapBetweenBackgroundAndWorldWidth * 2);

    // Set up the game bounds
    this.worldBounds = this.physics.world.setBounds(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);

    // Create a rectangle graphic with black line color
    const boundsGraphic = this.add.graphics();
    boundsGraphic.lineStyle(5, 0xFFFFFF);
    boundsGraphic.strokeRect(this.worldBounds.bounds.x, this.worldBounds.bounds.y, this.worldBounds.bounds.width, this.worldBounds.bounds.height);
  }
  
  private handlePlayer1Movement() {
    const cursors = this.input.keyboard?.createCursorKeys();
    const playerBody = this.player1.body as Phaser.Physics.Arcade.Body;

    playerBody.setVelocity(0);
    let speedPlayerHeight = this.currentSpeedMovePlayer1;
    let speedPlayerWidth = this.currentSpeedMovePlayer1;

    if (cursors?.up.isDown) {
      playerBody.setVelocityY(-speedPlayerHeight);
    }

    if (cursors?.down.isDown) {
      playerBody.setVelocityY(speedPlayerHeight);
    }

    // Todo - Les controles gauche et droite servent à debuger - a supprimer
    if (cursors?.left.isDown) {
      playerBody.setVelocityX(-speedPlayerWidth);
    }
    if (cursors?.right.isDown) {
      playerBody.setVelocityX(speedPlayerWidth);
    }
  }
  
  private createPauseKey() {
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
  //----------------------------
  //#endregion - private method
}
