import { MainScene } from "./mainScene";

export class MenuScene extends MainScene {
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.image("menu-background", "assets/images/menu-background.jpg");
    }

    create() {
        super.create();
        // Add background image
        this.add.image(this.WIDTH / 2, this.HEIGHT / 2, "menu-background").setDisplaySize(this.WIDTH, this.HEIGHT);

        // Add title text
        let title = this.add.text(
            this.WIDTH / 2,
            100,
            "CassePonPong",
            { fontSize: "64px", color: "#fff" }
        );
        title.setOrigin(0.5);

        // Add play button
        let playButton = this.add.text(this.WIDTH / 2, 270, "Play", {
            fontSize: "32px",
            color: "#fff",
        });
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}
