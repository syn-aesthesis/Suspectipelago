// Defines the core game rules.
// Scenes call methods defined here and print the returned lines.

import type { ApService, InitialSync } from '../ap/ApService.ts';
import { ENTRANCE, PLACE_INFO, exitsOf } from './content.ts';
import type { PlaceId } from './content.ts';
import { Emitter } from './emitter.ts';
import { locationNames } from './names.ts';
import { GameState } from './state.ts';

export interface ActionResult { 
    ok: boolean; 
    lines: string[]; 
}

const fail = (message: string): ActionResult => ({ 
    ok: false, 
    lines: [message] 
});

export type ControllerEvents = {
    log: [lines: string[]];  // events other than player actions (e.g. AP events)
    changed: [];  // refresh HUD on state changed
};

export class GameController{
    readonly events = new Emitter<ControllerEvents>();
    readonly state = new GameState();
    readonly ap: ApService;
    private readonly unsubscribers: Array<() => void> = [];

    constructor(ap: ApService) {
        this.ap = ap;
    }

    /** Load the server's state and start listening; call right after `await ap.connect()` */
    start(sync: InitialSync): void {
        this.state.addItems(sync.items);
        this.state.addChecked(sync.checkedLocations);

        this.unsubscribers.push(
            this.ap.events.on('items', (names) => {
                const fresh = this.state.addItems(names);
                if (fresh.length > 0) this.events.emit('log', fresh.map((n) => `** You received: ${n} **`));
                this.events.emit('changed');
            }),
            this.ap.events.on('checked', (names) => {
                this.state.addChecked(names);
                this.events.emit('changed');
            }),
        );
    }

    dispose(): void {
        for (const off of this.unsubscribers) off();
        this.unsubscribers.length = 0;
    }

    exits(): PlaceId[] {
        return exitsOf(this.state.place);
    }

    describeHere(): string[] {
        const place = this.state.place;
        return [`== ${place} ==`, PLACE_INFO[place], `Exits: ${exitsOf(place).join(', ')}.`];
    }

    move(dest: PlaceId): ActionResult {
        if (!exitsOf(this.state.place).includes(dest)) return fail(`You can't get to the ${dest} from here.`);
        this.state.place = dest;
        if (dest !== ENTRANCE) this.checkLocal(locationNames.enter(dest));
        this.events.emit('changed');
        return { ok: true, lines: this.describeHere() };
    }

    /** Mark a location checked locally at once (optimistic), then tell the server. */
    private checkLocal(name: string): void {
        if (this.state.checked.has(name)) return;
        this.state.addChecked([name]);
        this.ap.checkLocation(name);
    }
}