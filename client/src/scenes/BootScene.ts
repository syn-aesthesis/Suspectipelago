import * as Phaser from 'phaser';
import { COLOR, WIDTH, css, textStyle } from '../ui/theme.ts';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create(): void {
        this.cameras.main.setBackgroundColor(css(COLOR.bg));
        this.add.text(WIDTH / 2, 110, 'SUSPECTIPELAGO', textStyle(COLOR.accent, 36)).setOrigin(0.5);
        const prompt = this.add.text(WIDTH / 2, 300, 'Click or press any key to begin', textStyle(COLOR.bright)).setOrigin(0.5);
        this.tweens.add({ targets: prompt, alpha: 0.2, duration: 700, yoyo: true, repeat: -1 });
    
        const start = (): void => {
            this.scene.start('Game');
        }
        this.input.once('pointerdown', start);
        this.input.keyboard?.once('keydown', start);
    }
}