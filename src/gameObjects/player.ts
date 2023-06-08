export class Player extends Phaser.Physics.Arcade.Sprite {
    private readonly SPEED_START: number = 1000;
    private speed: number = this.SPEED_START;
    private cursors!: object;
    private keyCodes: { [key: string]: any} = {
        'Z': Phaser.Input.Keyboard.KeyCodes.Z,
        'S': Phaser.Input.Keyboard.KeyCodes.S,
        'Up': Phaser.Input.Keyboard.KeyCodes.UP,
        'Down': Phaser.Input.Keyboard.KeyCodes.DOWN,
    }

    constructor(scene: Phaser.Scene, x: number, y: number, nameTexturePlayer: string, keyUp: string, keyDown: string) {
      super(scene, x, y, nameTexturePlayer);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);
      this.setMovementKey(keyUp, keyDown);
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speedP1: number) {
        this.speed = speedP1;
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
        this.setVelocity(0);
        
        let multiplicatorUpDown: number = 0;
        if (this.cursors && this.cursors.up.isDown) {
            multiplicatorUpDown = -1;
        } else if (this.cursors && this.cursors.down.isDown) {
            multiplicatorUpDown = 1;
        }

        this.setVelocityY(this.speed * multiplicatorUpDown);
    }
}
