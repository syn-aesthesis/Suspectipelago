import type * as Phaser from 'phaser';
import { COLOR, css, textStyle } from './theme.ts';

export interface MenuItem {
    label: string;
    action: () => void;
    enabled?: boolean;  // true by default
    note?: string;      // shown after a disabled item's label, e.g. "nobody here"
}

const ROW_HEIGHT = 17;
const TOP = 28;

export class Menu {
    private readonly scene: Phaser.Scene;
    private readonly x: number;
    private readonly y: number;
    private readonly width: number;
    private readonly rowsPerColumn: number;
    private readonly title: Phaser.GameObjects.Text;
    private readonly frame: Phaser.GameObjects.Rectangle;
    private rows: Phaser.GameObjects.Text[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.rowsPerColumn = Math.max(1, Math.floor((height - TOP) / ROW_HEIGHT));
        this.frame = scene.add.rectangle(x, y, width, height, COLOR.panel).setOrigin(0, 0).setStrokeStyle(2, COLOR.text);
        this.title = scene.add.text(x + 10, y + 6, '', textStyle(COLOR.accent));
    }

    show(title: string, items: MenuItem[]): void {
        for (const row of this.rows) row.destroy(); // throw away the previous list
        this.rows = [];
        this.title.setText(title);

        const columns = Math.ceil(items.length / this.rowsPerColumn);
        const columnWidth = (this.width - 18) / Math.max(1, columns);
        items.forEach((item, i) => {
            const enabled = item.enabled !== false;
            const suffix = !enabled && item.note ? `(${item.note})` : '';
            const x = this.x + 18 + Math.floor(i / this.rowsPerColumn) * columnWidth;
            const y = this.y + TOP + (i % this.rowsPerColumn) * ROW_HEIGHT;
            const row = this.scene.add.text(x, y, `${i + 1}. ${item.label}${suffix}`, textStyle(enabled ? COLOR.bright : COLOR.dim));
            if (enabled) {
                row
                    .setInteractive({ useHandCursor: true })
                    .on('pointerover', () => row.setColor(css(COLOR.accent)))
                    .on('pointerout', () => row.setColor(css(COLOR.bright)))
                    .on('pointerdown', () => item.action());
            }
            this.rows.push(row);
        });
    }

    destroy(): void {
        for (const row of this.rows) row.destroy();
        this.title.destroy();
        this.frame.destroy();
    }
}