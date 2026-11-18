// import { greet } from './greet.ts';
// document.querySelector('#game')!.textContent = greet('browser');

import * as Phaser from 'phaser';
import { TextLog } from './ui/TextLog';

class HelloScene extends Phaser.Scene {
    constructor() { super('Hello'); }
    create(): void {
        // this.add.text(320, 200, 'Hello, world', { fontFamily: 'monospace', fontSize: '24px' }).setOrigin(0.5);
        const log = new TextLog(this, 10, 32, 620, 228);
        log.push(['Hello', 'a much longer line'.repeat(8)]);
    }
}

new Phaser.Game(
    {
        type: Phaser.AUTO,
        parent: 'game',
        width: 640, height: 400,
        backgroundColor: '#0000aa',
        pixelArt: true,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        scene: [HelloScene],
    }
);