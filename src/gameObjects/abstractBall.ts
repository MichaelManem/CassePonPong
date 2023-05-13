import { PreScene } from "../scenes/preScene";

export abstract class AbstractBall {
    protected scene: PreScene;
    protected positionHeight: number = 0;
    protected positionWidth: number = 0;
    protected texture: any; //todo définir le type de variable
    protected velocity: number = 0;
    
    protected abstract createTextureBall(): void;

    protected setVelocity(newVelocity: number): void {
        this.velocity = newVelocity;
    }

    protected setPosition(newPositionHeight: number, newPositionWidth: number): void {
        this.positionHeight = newPositionHeight;
        this.positionWidth = newPositionWidth;
    }

}
