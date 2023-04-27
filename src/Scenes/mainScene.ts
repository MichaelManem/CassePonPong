export class MainScene extends Phaser.Scene {
  protected readonly INITIAL_WIDTH = 1600;
  protected readonly INITIAL_HEIGHT = 900;
  protected WIDTH = this.INITIAL_WIDTH;
  protected HEIGHT = this.INITIAL_HEIGHT;
  protected scaleRatio = 1;
  

  create() {
    this.WIDTH = this.game.config.width as number;
    this.HEIGHT = this.game.config.height as number;
    // Ajuster le scaling en fonction de la taille du jeu
    this.scaleRatio = this.HEIGHT / this.INITIAL_HEIGHT;
  }

  applyScale(number: number) {
    return number * this.scaleRatio;
  }
}
