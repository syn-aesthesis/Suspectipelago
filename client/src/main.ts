import * as Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    private visitCounter: number;
    private perVisitCounter!: number;
    private perVisitText!: Phaser.GameObjects.Text;
    private firstUpdateLogged!: boolean;

    constructor() {
        super('Boot');
        console.log('constructed');
        this.visitCounter = 0;
    }

    init(): void {
        console.log('initialised');
        this.perVisitCounter = 0;
        this.firstUpdateLogged = false;
    }

    preload(): void {
        console.log('preloaded');
    }

    create(): void {
        console.log('created');
        this.visitCounter++;

        this.input.keyboard?.on('keydown-W', () => {
            this.perVisitCounter++;
            this.perVisitText.setText(`perVisitCounter: ${this.perVisitCounter}`);
        });
        this.input.keyboard?.on('keydown-R', () => {
            this.scene.restart();
        });
        console.log(this.input.keyboard?.listenerCount('keydown-R'));
    
        this.add.text(100, 100, `visitCounter: ${this.visitCounter}`, {color: '#ffffff'});
        this.perVisitText = this.add.text(100, 150, `perVisitCounter: ${this.perVisitCounter}`, {color: '#ffffff'});
    }

    update(): void {
        if (!this.firstUpdateLogged) {
            console.log('first update');
            this.firstUpdateLogged = true;
        }
    }
}

declare global {
    interface Window {
        game?: Phaser.Game;
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 640,
    height: 400,
    backgroundColor: "#000000",
    scene: [BootScene],
};

const game = new Phaser.Game(config);

if (import.meta.env.DEV) {
    window.game = game;
}
