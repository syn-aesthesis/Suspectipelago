import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { makeTestService } from '../ap/OfflineApService.ts';
import type { OfflineApService } from '../ap/OfflineApService.ts';
import { GameController } from './GameController.ts';
import { locationNames } from './names.ts';

let ap: OfflineApService;
let game: GameController;

// Let the offline service's queued "server replies" arrive
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

beforeEach(async () => { 
    ap = makeTestService(7);  // seeded fake server, no saving
    game = new GameController(ap);  // a fresh game for every test
    game.start(await ap.connect({ url: '', slot: '', password: '' }));
});

it('checks "Enter <place>" the first time only, and reports it to the server', async () => {
  game.move('Foyer');
  assert.equal(game.state.hasVisited('Foyer'), true);
  await flush();
  assert.equal(ap.missingLocations().includes(locationNames.enter('Foyer')), false);
});

it('delivers items back through the service events', async () => {
  game.move('Foyer');  // first check -> first queued item (a key)
  await flush();
  assert.equal([...game.state.items].filter((n) => n.startsWith('Room Key: ')).length, 1);
});

describe('movement', () => {
    it("starts in the Entrance", () => {
        assert.equal(game.state.place, 'Entrance');
    });

    it("can walk from the Entrance to the Foyer", () => {
        const result = game.move('Foyer');
        assert.equal(result.ok, true);
        assert.equal(game.state.place, 'Foyer');
        assert.match(result.lines.join('\n'), /Exits:/);
    });

    it("can't skip the Foyer", () => {
        assert.equal(game.move('Study').ok, false);
        assert.equal(game.state.place, 'Entrance');
    });

    it("rooms lead only back to the Foyer", () => {
        game.move('Foyer');
        game.move('Study');
        assert.equal(game.move('Kitchen').ok, false);
        assert.equal(game.move('Foyer').ok, true);
    });
});

describe('checks and items', () => {
    it('checks "Enter <place>" the first time only, and reports it to the server', async () => {
        game.move('Foyer');
        assert.equal(game.state.hasVisited('Foyer'), true);
        await flush();
        assert.equal(ap.missingLocations().includes(locationNames.enter('Foyer')), false);
    });

    it('delivers items back through the service events', async () => {
        game.move('Foyer'); // first check -> first queued item (a key)
        await flush();
        assert.equal([...game.state.items].filter((n) => n.startsWith('Room Key: ')).length, 1);
    });
});