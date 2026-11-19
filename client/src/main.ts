import { OfflineApService } from './ap/OfflineApService.ts';
import { GameController } from './core/GameController.ts';
import { startPhaser } from './game.ts';

async function main(): Promise<void> {
    const ap = new OfflineApService();
    const sync = await ap.connect({ url: '', slot: '', password: '' });
    const controller = new GameController(ap);
    controller.start(sync);  // no `await` between connect() and start(): no event can slip in between
    document.querySelector<HTMLElement>('#connect')!.hidden = true;
    startPhaser(controller);
}

void main();