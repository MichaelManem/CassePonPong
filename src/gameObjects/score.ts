import { Ball } from './Ball';
import { Player } from './Player';
import { PreScene } from './PreScene';

export interface ScoreStyle extends Phaser.Types.GameObjects.Text.TextStyle {
  [key: string]: any;
}

export class Score extends Phaser.GameObjects.Text {
  public MAX_SCORE: number = 7;
  public readonly SCORE_ZONE_MULTIPLIER: number = 0.3;

  public scoreValue: number = 0;
  private scoreZoneWidth: number;
  private playerWidthPosition: number;

  constructor(
    scene: PreScene,
    playerWidthPosition: number,
    multiplierPositionX: number,
    multiplierPositionY: number,
    text: string,
    style: ScoreStyle
  ) {
    super(scene, 0, 0, text, style);
    this.playerWidthPosition = playerWidthPosition;

    this.setOrigin(0.5);
    this.setPosition(
      scene.WIDTH_WORLD * multiplierPositionX,
      scene.HEIGHT_WORLD * multiplierPositionY
    );
    this.scoreZoneWidth = scene.WIDTH_WORLD * this.getScoreZoneWidth();
    scene.add.existing(this);
  }

  private getScoreZoneWidth(): number {
    return this.SCORE_ZONE_MULTIPLIER * this.playerWidthPosition;
  }

  public handleScoring(ball: Ball, player: Player): void {
    if (!ball) {
      console.error('Ball does not exist');
      return;
    }

    if (!player) {
      console.error('Player does not exist');
      return;
    }

    const isInLeftHalfWorld = player.x < this.scene.WIDTH_WORLD / 2;
    const scoreZoneLimit = isInLeftHalfWorld
      ? player.x - this.scoreZoneWidth
      : player.x + this.scoreZoneWidth;
    const hasScored = isInLeftHalfWorld
      ? ball.x < scoreZoneLimit
      : ball.x > scoreZoneLimit;

    if (hasScored && this.scoreValue < this.MAX_SCORE) {
      this.scene.sound.add("scorePoint", { loop: false, volume: 1 }).play();
      this.scoreValue += 1;
      this.setText(this.scoreValue.toString());
      ball.resetBallPosition();
    }
  }
}