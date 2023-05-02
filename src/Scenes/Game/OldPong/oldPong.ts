import { AbstractPong } from "../abstractPong";

export class OldPong extends AbstractPong {
  private player1Speed: number = 1500;

  constructor() {
    super({ key: "OldPong" });
    this.setSceneName("OldPong");
    console.log("this.speedPlayer1", this.player1Speed);
    this.setPlayer1Speed(this.player1Speed);
  }

  preload() {
    this.load.audio("music", "assets/musics/Line Noise - Magenta Moon (Part II).mp3");
  }

  //#region - private method
  //----------------------------

  /**
   * Creation de l'image du fond
   */
  protected createBackground() {
    // Create a Graphics object
    const graphics = this.add.graphics();

    // Set the fill style to white
    graphics.fillStyle(0x00000);

    // Draw a rectangle shape
    graphics.fillRect(0, 0, this.WIDTH_WORLD, this.HEIGHT_WORLD);

    // Generate a texture from the Graphics object
    graphics.generateTexture('blackRect', this.WIDTH_WORLD, this.HEIGHT_WORLD);

    // Destroy the Graphics object
    graphics.destroy();

    const background = this.add.image(0, 0, 'blackRect').setOrigin(0, 0);
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

  protected createPlayer1() {
    // Create a Graphics object
    const graphics = this.add.graphics();

    // Set the fill style to white
    graphics.fillStyle(0xffffff);

    // Draw a rectangle shape
    graphics.fillRect(0, 0, 10, 60);

    // Generate a texture from the Graphics object
    graphics.generateTexture('whiteRect', 10, 60);

    // Destroy the Graphics object
    graphics.destroy();

    // Create the sprite using the generated texture
    this.player1 = this.physics.add.sprite(this.WIDTH_WORLD / 6, this.HEIGHT_WORLD / 2, 'whiteRect').setCollideWorldBounds(true);
  }
  //----------------------------
  //#endregion - private method
}
