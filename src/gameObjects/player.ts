import { PreScene } from "../scenes/preScene";

export class Player extends Phaser.Physics.Arcade.Sprite {
    private readonly MAX_SPEED: number = 1750;
    private readonly ACCELERATION: number = this.MAX_SPEED * 0.05;
    private readonly DECELERATION: number = this.MAX_SPEED * 0.5;

    private speed: number = this.MAX_SPEED;
    private cursors!: object;
    private keyCodes: { [key: string]: any } = {
        'Z': Phaser.Input.Keyboard.KeyCodes.Z,
        'S': Phaser.Input.Keyboard.KeyCodes.S,
        'Up': Phaser.Input.Keyboard.KeyCodes.UP,
        'Down': Phaser.Input.Keyboard.KeyCodes.DOWN,
    }

    constructor(scene: PreScene, multiplierPositionX: number, multiplierPositionY: number, nameTexture: string, keyUp: string = "", keyDown: string = "") {
        super(scene, 0, 0, nameTexture);
        this.setPositionXWithMultiplier(multiplierPositionX);
        this.setPositionYWithMultiplier(multiplierPositionY);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        if (keyUp !== "" && keyDown !== "") {
            this.setMovementKey(keyUp, keyDown);
        }
    }

    protected setPositionXWithMultiplier(multiplierX: number): void {
        this.x = this.scene.WIDTH_WORLD * multiplierX;
    }

    protected setPositionYWithMultiplier(multiplierY: number): void {
        this.y = this.scene.HEIGHT_WORLD * multiplierY;
    }

    public setMovementKey(keyUp: string, keyDown: string) {
        if (!this.scene.input.keyboard) {
            return;
        }

        this.cursors = this.scene.input.keyboard.addKeys(
            {
                'up': this.keyCodes[keyUp],
                'down': this.keyCodes[keyDown]
            }
        );
    }

    public move(): void {
        let multiplicatorUpDown: number = 0;

        this.setVelocity(0);
        if (this.cursors) {
            if (this.cursors.up.isDown) {
                multiplicatorUpDown = -1;
                this.accelerate();
            } else if (this.cursors.down.isDown) {
                multiplicatorUpDown = 1;
                this.accelerate();
            } else {
                this.decelerate();
            }
        }

        this.setVelocityY(this.speed * multiplicatorUpDown);
    }

    private accelerate() {
        if (this.speed < 0) {
            this.speed = 0; // If player was previously moving in the opposite direction, reset speed to 0
        }
        this.speed += this.ACCELERATION;
        if (this.speed > this.MAX_SPEED) {
            this.speed = this.MAX_SPEED;
        }
    }

    private decelerate() {
        if (this.speed > 0) {
            this.speed -= this.DECELERATION;
            if (this.speed < 0) {
                this.speed = 0;
            }
        } else if (this.speed < 0) {
            this.speed += this.DECELERATION;
            if (this.speed > 0) {
                this.speed = 0;
            }
        }
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }
}
