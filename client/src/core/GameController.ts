// Defines the core game rules.
// Scenes call methods defined here and print the returned lines.

import { 
    PLACE_INFO,
    exitsOf 
} from './content.ts';
import type { PlaceId } from './content.ts';
import { GameState } from './state.ts';

export interface ActionResult { ok: boolean; lines: string[]; }
const fail = (message: string): ActionResult => ({ ok: false, lines: [message] });

export class GameController{
    readonly state = new GameState();

    /** Prints the description for the current place */
    describeHere(): string[] {
        const place = this.state.place;
        return [`== ${place} ==`, PLACE_INFO[place], `Exits: ${exitsOf(place).join(', ')}.`];
    }

    move(dest: PlaceId): ActionResult {
        if (!exitsOf(this.state.place).includes(dest)) return fail(`You can't get to the ${dest} from here.`);
        this.state.place = dest;
        return { ok: true, lines: this.describeHere() };
    }
}