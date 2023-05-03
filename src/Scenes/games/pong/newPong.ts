import { AbstractPong } from "../abstractPong";

export class NewPong extends AbstractPong {
  private player1Speed: number = 1300;

  constructor() {
    super({ key: "NewPong" });
    this.setSceneName("NewPong");
    this.setPlayer1Speed(this.player1Speed);
  }

  preload() {
    this.load.image("player", "assets/images/Player.png");
    this.load.image("background", "assets/images/backgrounds/rock_lunar.avif");
    this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
  }

  //#region - abstract method implemented
  //-------------------------------------

  /**
   * Creation de l'image du fond
   */
  protected createBackground() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.displayWidth = this.game.canvas.width;
    background.displayHeight = this.game.canvas.height;
  }

  /**
   * Créer la music en fond
   */
  protected createMusic() {
    this.backgroundMusic = this.sound.add("music", { loop: true, volume: 0.5 });
    this.backgroundMusic.play();

    // Créer un evenement qui va etre appelé lors du 'resume' de cette scene
    this.resumeMusicWhenSceneResume();
  }

  /**
   * Creation du joueur 1
   */
  protected createPlayer1(): void {
    this.player1 = this.physics.add.sprite(this.WIDTH_WORLD / 50, this.HEIGHT_WORLD / 2, "player")
      .setCollideWorldBounds(true);
    this.player1.flipX = true;
  }

  //----------------------------------------
  //#endregion - abstract method implemented
}
