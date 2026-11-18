import * as Phaser from 'phaser';
import type { GameController } from './core/GameController';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { COLOR, HEIGHT, WIDTH, css } from './ui/theme.ts';

export function startPhaser(controller: GameController): Phaser.Game {
    const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'game',  // id of the <div> in index.html
        width: WIDTH, 
        height: HEIGHT,
        backgroundColor: css(COLOR.bg),
        pixelArt: true,
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
        scene: [BootScene, GameScene],  // the first one starts automatically
        callbacks: {
            // Runs before any scene is created, so scenes can rely on the registry
            preBoot: (game: Phaser.Game) => { game.registry.set('controller', controller); },
        },
    });
    // Development only: inspect the game from the browser console
    if (import.meta.env.DEV) Object.assign(window, { game, controller });
    return game;
}