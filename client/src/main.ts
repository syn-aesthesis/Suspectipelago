import { GameController } from './core/GameController.ts';
import { startPhaser } from './game.ts';

document.querySelector<HTMLElement>('#connect')!.hidden = true; // hide the HTML form for now
startPhaser(new GameController());