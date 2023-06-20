import { NewPong } from "../scenes/games/pong/newPong";
import { MathUtils } from "../utils/mathUtils";
import { Ball } from "./ball";
import { Brick } from "./brick";
import { BrickImmortal } from "./brickImmortal";
type AllBricks = Brick | BrickImmortal;

export class BrickManager {
    private readonly BRICK_WIDTH: number = 60;
    private readonly BRICK_HEIGHT: number = 100;
    public bricks: AllBricks[] = [];
    public isImmortal: boolean = false;
    private scene: NewPong;

    constructor(scene: NewPong) {
        this.scene = scene;
    }

    public addOverlapWith(ball: Ball): void {
        this.bricks.forEach(brick => {
            brick.addColliderWith(ball);
        });
	}

    public handleBricks() {
        this.bricks.forEach(brick => {
            if (brick.isDead()) {
                brick.destroy();
                this.bricks.splice(this.bricks.indexOf(brick), 1);
            }
        });
    }

    public setupBricksVerySmallMapButTough(): void {
        let brick1 = new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT);
        brick1.maxHealth = 6;
        brick1.health = 6;
        this.bricks.push(brick1);

        let brick2 = new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT);
        brick2.maxHealth = 6;
        brick2.health = 6;
        this.bricks.push(brick2);

        let brick3 = new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT);
        brick3.maxHealth = 6;
        brick3.health = 6;
        this.bricks.push(brick3);

        this.copyBricksUpToBottom();
        this.copyBricksLeftToRight();
    }

    public setupBricksSmallMap(): void {
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksUpToBottom();
        this.copyBricksLeftToRight();
    }

    public setupBricksMap1(): void {
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksUpToBottom();

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksLeftToRight();
    }

    public setupBricksMap1SomeImmune(): void {
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksUpToBottom();

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksLeftToRight();
    }

    public setupBricksMap1AllImmune(): void {
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.20, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.30, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.40, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new BrickImmortal(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.50, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksUpToBottom();

        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.30, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.35, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.40, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.45, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));
        this.bricks.push(new Brick(this.scene, this.scene.WIDTH_WORLD * 0.50, this.scene.HEIGHT_WORLD * 0.90, this.BRICK_WIDTH, this.BRICK_HEIGHT));

        this.copyBricksLeftToRight();
    }

    public setupBricksRandom(nbBricks: number): void {
        let nbBricksInTopLeft: number = Math.round(nbBricks / 2);
        let brickXs: number[] = [];
        let brickYs: number[] = [];
        for (let index = 0; index < nbBricksInTopLeft; index++) {
            let hasIntersection: boolean = true;
            let newBrickX = MathUtils.getRandomArbitrary(this.scene.WIDTH_WORLD * 0.15, this.scene.WIDTH_WORLD * 0.45);
            let newBrickY = MathUtils.getRandomArbitrary(this.scene.HEIGHT_WORLD * 0.20, this.scene.HEIGHT_WORLD * 0.95);
            while(hasIntersection) {
                hasIntersection = false;
                for (let iBrickXs = 0; iBrickXs < brickXs.length; iBrickXs++) {
                    let rectA = new Phaser.Geom.Rectangle(brickXs[iBrickXs], brickYs[iBrickXs], this.BRICK_WIDTH, this.BRICK_HEIGHT);
                    let rectB = new Phaser.Geom.Rectangle(newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT);
                    hasIntersection = Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB);
                    if(hasIntersection) {
                        break;
                    }
                }
                if(!hasIntersection) {
                    brickXs.push(newBrickX);
                    brickYs.push(newBrickY);
                } else {
                    newBrickX = MathUtils.getRandomArbitrary(this.scene.WIDTH_WORLD * 0.15, this.scene.WIDTH_WORLD * 0.45);
                    newBrickY = MathUtils.getRandomArbitrary(this.scene.HEIGHT_WORLD * 0.20, this.scene.HEIGHT_WORLD * 0.95);
                }
            }
            let isBrickImmortal = MathUtils.getRandomBoolean(0.2);
            if(isBrickImmortal) {
                this.bricks.push(new BrickImmortal(this.scene, newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT));
            } else {
                this.bricks.push(new Brick(this.scene, newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT));
            }
        }

        this.copyBricksLeftToRight();
    }

    private copyBricksUpToBottom(): void {
        let newBricks: AllBricks[] = [];
        for (let brick of this.bricks) {
            if (brick.y < this.scene.HEIGHT_WORLD * 0.50) {
                let copyBrick: AllBricks = brick.copyBrick(this.scene);
                brick.y = this.scene.HEIGHT_WORLD - brick.y;
                newBricks.push(copyBrick);
            }
        }
        this.bricks = this.bricks.concat(newBricks);
    }

    private copyBricksLeftToRight(): void {
        let newBricks: AllBricks[] = [];
        for (let brick of this.bricks) {
            if (brick.x < this.scene.WIDTH_WORLD * 0.50) {
                let copyBrick: AllBricks = brick.copyBrick(this.scene);
                brick.x = this.scene.WIDTH_WORLD - brick.x;
                newBricks.push(copyBrick);
            }
        }
        this.bricks = this.bricks.concat(newBricks);
    }
}
