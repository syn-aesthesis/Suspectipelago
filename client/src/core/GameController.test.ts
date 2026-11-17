import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { GameController } from './GameController.ts';

let game: GameController;
beforeEach(() => { 
    game = new GameController();  // a fresh game for every test
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