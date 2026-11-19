import * as Phaser from 'phaser';
import type { GameController } from '../core/GameController.ts';
import { COLOR, WIDTH, css, textStyle } from '../ui/theme.ts';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create(): void {
        this.cameras.main.setBackgroundColor(css(COLOR.bg));
        this.add.text(WIDTH / 2, 110, 'SUSPECTIPELAGO', textStyle(COLOR.accent, 36)).setOrigin(0.5);
        const controller = this.registry.get('controller') as GameController;
        const mode = controller.ap.kind === 'offline' ? 'Offline sandbox (no server)' : 'Connected to Archipelago';
        this.add.text(WIDTH / 2, 215, mode, textStyle(COLOR.text)).setOrigin(0.5);
        const prompt = this.add.text(WIDTH / 2, 300, 'Click or press any key to begin', textStyle(COLOR.bright)).setOrigin(0.5);
        this.tweens.add({ targets: prompt, alpha: 0.2, duration: 700, yoyo: true, repeat: -1 });
    
        const start = (): void => {
            this.scene.start('Game');
        }
        this.input.once('pointerdown', start);
        this.input.keyboard?.once('keydown', start);
    }
}