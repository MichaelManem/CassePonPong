// Todo - A regarder absolument pour gérer la resize de la fenetre ou le scaling
// https://stackoverflow.com/questions/66191191/how-to-create-a-responsive-game-for-any-screen-size-with-phaser-3
// https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html#:~:text=Place%20the%20scale%20config%20object,canvas%20pixels%20to%20game%20size.

export class PreScene extends Phaser.Scene {
  protected WIDTH_WORLD!: number;
  protected HEIGHT_WORLD!: number;

  // Aspect Ratio 16:9 - Portrait
  protected readonly MAX_SIZE_WIDTH_SCREEN = 2560;
  protected readonly MAX_SIZE_HEIGHT_SCREEN = 1440;
  protected readonly MIN_SIZE_WIDTH_SCREEN = 1280;
  protected readonly MIN_SIZE_HEIGHT_SCREEN = 720;
  protected readonly SIZE_WIDTH_SCREEN = 1920;
  protected readonly SIZE_HEIGHT_SCREEN = 1080;

  preload() {
    this.load.image("background1", "assets/images/backgrounds/menu.jpg");
    this.load.image("background2", "assets/images/backgrounds/bleu_rose.webp");
    this.load.image("background3", "assets/images/backgrounds/background_vicity.png");
    this.load.image("background4", "assets/images/backgrounds/rock_lunar.avif");
  }
  
  create() {
    this.WIDTH_WORLD = this.game.config.width as number;
    this.HEIGHT_WORLD = this.game.config.height as number;
    console.log("this.WIDTH_WORLD", this.WIDTH_WORLD);
    console.log("this.HEIGHT_WORLD", this.HEIGHT_WORLD);
  }

  /**
   * Creation de l'image du fond
   */
  protected createBackground(scene: Phaser.Scene) {
    // Generate a random number between 1 and the total number of background options
    const randomBackgroundIndex = Phaser.Math.Between(1, 4);
    console.log(randomBackgroundIndex)
    // Add the selected background image to the scene
    const background = scene.add.image(0, 0, `background${randomBackgroundIndex}`).setOrigin(0, 0);
    background.displayWidth = this.game.canvas.width;
    background.displayHeight = this.game.canvas.height;
  }
}
