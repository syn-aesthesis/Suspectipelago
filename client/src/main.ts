import * as Phaser from 'phaser';
import { TextLog } from './ui/TextLog.ts';
import { Menu } from './ui/Menu.ts'

class HelloScene extends Phaser.Scene {
    constructor() { super('Hello'); }
    create(): void {
        const log = new TextLog(this, 10, 32, 620, 228);
        log.push(['Hello', 'a much longer line '.repeat(8)]);
        
        const m = new Menu(this, 4, 266, 632, 130);
        m.show('Test', Array.from({ length: 7 }, (_, i) => ({ label: `Row ${i}`, action: () => console.log(i) })));
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