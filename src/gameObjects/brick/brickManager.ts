import { NewPong } from "../../scenes/games/pong/newPong";
import { MathUtils } from "../../utils/mathUtils";
import { Ball } from "../ball";
import { Brick } from "./brick";
import { BrickImmortal } from "./brickImmortal";
import { BrickMaps } from "./brickMaps";
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

    private factoryBricks(dataBricks: any[], needToCopyUpToBottom: boolean, needToCopyLeftToRight: boolean): void {
        dataBricks.forEach(dataBrick => {
            let posX = this.scene.WIDTH_WORLD * dataBrick.x;
            let posY = this.scene.HEIGHT_WORLD * dataBrick.y;
            let width = this.BRICK_WIDTH * dataBrick.width;
            let height = this.BRICK_HEIGHT * dataBrick.height;
            switch (dataBrick.type) {
                case "normal":
                    this.bricks.push(new Brick(this.scene, posX, posY, width, height, dataBrick.maxHealth));
                    break;
                case "immortal":
                    this.bricks.push(new BrickImmortal(this.scene, posX, posY, width, height));
                    break;
                default:
                    break;
            }
        });

        if (needToCopyUpToBottom) {
            this.copyBricksUpToBottom();
        }
        if (needToCopyLeftToRight) {
            this.copyBricksLeftToRight();
        }
    }

    public setupBrickMap1(): void {
        this.factoryBricks(BrickMaps.MAP_1, true, true);
    }

    public setupBrickMap2(): void {
        this.factoryBricks(BrickMaps.MAP_2_P1, true, false);
        this.factoryBricks(BrickMaps.MAP_2_P2, false, true);
    }

    public setupBrickMap3(): void {
        this.factoryBricks(BrickMaps.MAP_3_P1, true, false);
        this.factoryBricks(BrickMaps.MAP_3_P2, false, true);
    }

    public setupBrickMap4(): void {
        this.factoryBricks(BrickMaps.MAP_4, true, true);
    }

    public setupBrickMapRandom(nbTotalBricks: number): void {
        let nbBricksInTopLeft: number = Math.round(nbTotalBricks / 2);
        let brickXs: number[] = [];
        let brickYs: number[] = [];
        for (let index = 0; index < nbBricksInTopLeft; index++) {
            let hasIntersection: boolean = true;
            let isOnSpwanBall = false;
            let newBrickX = MathUtils.getRandomArbitrary(this.scene.WIDTH_WORLD * 0.15, this.scene.WIDTH_WORLD * 0.50);
            let newBrickY = MathUtils.getRandomArbitrary(this.scene.HEIGHT_WORLD * 0.20, this.scene.HEIGHT_WORLD * 0.95);
            while (hasIntersection || isOnSpwanBall) {
                hasIntersection = false;
                isOnSpwanBall = newBrickX > (this.scene.WIDTH_WORLD * 0.50 - this.BRICK_WIDTH) && 
                                newBrickY > (this.scene.HEIGHT_WORLD * 0.50 - this.BRICK_HEIGHT);
                for (let iBrickXs = 0; iBrickXs < brickXs.length; iBrickXs++) {
                    let rectA = new Phaser.Geom.Rectangle(brickXs[iBrickXs], brickYs[iBrickXs], this.BRICK_WIDTH, this.BRICK_HEIGHT);
                    let rectB = new Phaser.Geom.Rectangle(newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT);
                    hasIntersection = Phaser.Geom.Intersects.RectangleToRectangle(rectA, rectB);
                    if (hasIntersection) {
                        break;
                    }
                }
                if (!hasIntersection && !isOnSpwanBall) {
                    brickXs.push(newBrickX);
                    brickYs.push(newBrickY);
                } else {
                    newBrickX = MathUtils.getRandomArbitrary(this.scene.WIDTH_WORLD * 0.15, this.scene.WIDTH_WORLD * 0.50);
                    newBrickY = MathUtils.getRandomArbitrary(this.scene.HEIGHT_WORLD * 0.20, this.scene.HEIGHT_WORLD * 0.95);
                }
            }
            let isBrickImmortal = MathUtils.getRandomBoolean(0.2);
            if (isBrickImmortal) {
                this.bricks.push(new BrickImmortal(this.scene, newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT));
            } else {
                this.bricks.push(new Brick(this.scene, newBrickX, newBrickY, this.BRICK_WIDTH, this.BRICK_HEIGHT));
            }
        }

        this.copyBricksLeftToRight();
    }
}
