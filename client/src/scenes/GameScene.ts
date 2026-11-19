import * as Phaser from 'phaser';
import { ROOMS } from '../core/content.ts';
import type { GameController } from '../core/GameController.ts';
import { Menu } from '../ui/Menu.ts';
import type { MenuItem } from '../ui/Menu.ts';
import { TextLog } from '../ui/TextLog.ts';
import { COLOR, LAYOUT, WIDTH, css, textStyle } from '../ui/theme.ts';

export class GameScene extends Phaser.Scene {
    private controller!: GameController;
    private header!: Phaser.GameObjects.Text;
    private stats!: Phaser.GameObjects.Text;
    private log!: TextLog;
    private menu!: Menu;

    constructor() {
        super('Game'); // the key other scenes use: this.scene.start('Game')
    }

    create(): void {
        this.controller = this.registry.get('controller') as GameController;
        this.cameras.main.setBackgroundColor(css(COLOR.bg));
        this.header = this.add.text(10, LAYOUT.header.y, '', textStyle(COLOR.accent, 16));
        this.stats = this.add.text(WIDTH - 10, LAYOUT.header.y + 2, '', textStyle(COLOR.bright, 12)).setOrigin(1, 0);
        this.log = new TextLog(this, LAYOUT.log.x, LAYOUT.log.y, LAYOUT.log.width, LAYOUT.log.height);
        this.menu = new Menu(this, LAYOUT.menu.x, LAYOUT.menu.y, LAYOUT.menu.width, LAYOUT.menu.height);

         // React to events outside player actions (AP items arriving)
        const offLog = this.controller.events.on('log', (lines) => this.log.push(lines));
        const offChanged = this.controller.events.on('changed', () => this.refreshHud());

        // Scenes can be started again later: undo every subscription when this one ends
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            offLog();
            offChanged();
            this.menu.destroy();
            this.log.destroy();
        });

        this.refreshHud();
        this.log.push(this.controller.describeHere());
        this.mainMenu();    
    }

    private refreshHud(): void {
        const state = this.controller.state;
        this.header.setText(state.place);
        this.stats.setText(`Keys ${state.keyCount()}/${ROOMS.length}`);
    }

    private mainMenu(): void {
        this.menu.show('What do you do?', [{ label: 'Move', action: () => this.moveMenu() }]);
    }

    private moveMenu(): void {
        const items: MenuItem[] = this.controller.exits().map((dest) => ({
            label: dest,
            action: () => {
                const result = this.controller.move(dest);
                this.log.push(result.lines);
                this.refreshHud();
                this.mainMenu();
            }
        }));
        items.push({ label: 'Back', action: () => this.mainMenu() });
        this.menu.show('Go where?', items);
    }
}