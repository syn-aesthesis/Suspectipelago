// import { greet } from './greet.ts';
// document.querySelector('#game')!.textContent = greet('browser');

import * as Phaser from 'phaser';

class HelloScene extends Phaser.Scene {
    constructor() { super('Hello'); }
    create(): void {
        this.add.text(320, 200, 'Hello, world', { fontFamily: 'monospace', fontSize: '24px' }).setOrigin(0.5);
    }
}

new Phaser.Game(
    {
        type: Phaser.AUTO,
        parent: 'game',
        width: 640, height: 400,
        backgroundColor: '#000aa',
        pixelArt: true,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        scene: [HelloScene],
    }
);