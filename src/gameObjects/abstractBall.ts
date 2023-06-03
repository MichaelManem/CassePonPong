export abstract class AbstractBall {
    protected positionHeight: number = 0;
    protected positionWidth: number = 0;
    protected velocity: number = 0;
    
    constructor() {
    }
    
    public createBall(scene: Phaser.Scene, x: number, y: number, textureName: string): Phaser.Physics.Arcade.Sprite {
        this.addGraphicInScene(scene, textureName);
        return this.generateSprite(scene, x, y, textureName);
    }

    protected abstract addGraphicInScene(scene: Phaser.Scene, textureName: string): void;
    protected abstract generateSprite(scene: Phaser.Scene, x: number, y: number, textureName: string): Phaser.Physics.Arcade.Sprite;
}
