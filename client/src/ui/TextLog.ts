import type * as Phaser from 'phaser';
import { wrapText } from '../core/wrap.ts';
import { textStyle } from './theme.ts';

const TICK_MS = 12;
const CHARS_PER_TICK = 3;

export class TextLog {
    private readonly text: Phaser.GameObjects.Text;
    private readonly cols: number;
    private readonly maxLines: number;
    private lines: string[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        // Measure the monospace font once: 40 Ms, then divide.
        const probe = scene.add.text(0, 0, 'M'.repeat(40), textStyle());
        const charWidth = probe.width / 40;
        const lineHeight = probe.height;
        probe.destroy();

        this.cols = Math.max(10, Math.floor(width / charWidth) - 1);
        this.maxLines = Math.max(1, Math.floor(height / lineHeight));
        this.text = scene.add.text(x, y, '', textStyle());
    }

    push(newLines: string[]): void {
        if (this.lines.length > 0) this.lines.push('');  // a blank line between entries
        this.lines.push(...newLines.flatMap((line) => wrapText(line, this.cols)));
        this.text.setText(this.lines.slice(-this.maxLines).join('\n'));  // show only what fits
    }

    destroy(): void {
        this.text.destroy();
    }
}
