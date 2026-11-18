import * as Phaser from 'phaser';
import type { GameController } from '../core/GameController.ts';
import { Menu } from '../ui/Menu.ts';
import type { MenuItem } from '../ui/Menu.ts';
import { TextLog } from '../ui/TextLog.ts';
import { COLOR, LAYOUT, css, textStyle } from '../ui/theme.ts';

export class GameScene extends Phaser.Scene {
    private controller!: GameController;
    private header!: Phaser.GameObjects.Text;
    private log!: TextLog;
    private menu!: Menu;

    constructor() {
        super('Game'); // the key other scenes use: this.scene.start('Game')
    }

    create(): void {
        this.controller = this.registry.get('controller') as GameController;
        this.cameras.main.setBackgroundColor(css(COLOR.bg));
        this.header = this.add.text(10, LAYOUT.header.y, '', textStyle(COLOR.accent, 16));
        this.log = new TextLog(this, LAYOUT.log.x, LAYOUT.log.y, LAYOUT.log.width, LAYOUT.log.height);
        this.menu = new Menu(this, LAYOUT.menu.x, LAYOUT.menu.y, LAYOUT.menu.width, LAYOUT.menu.height);

        this.refreshHud();
        this.log.push(this.controller.describeHere());
        this.mainMenu();    
    }

    private refreshHud(): void {
        this.header.setText(this.controller.state.place);
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
                this.mainMenu;
            }
        }));
        items.push({ label: 'Back', action: () => this.mainMenu() });
        this.menu.show('Go where?', items);
    }
}