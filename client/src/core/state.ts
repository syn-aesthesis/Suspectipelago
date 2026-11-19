import { ENTRANCE, ROOMS } from './content.ts';
import type { PlaceId, RoomId } from './content.ts';
import { itemNames, locationNames } from './names.ts';

/** Describes the game state (current scene, received items, checked locations) */
export class GameState {
    place: PlaceId = ENTRANCE;

    readonly items = new Set<string>();  // names of AP items received
    readonly checked = new Set<string>();  // names of AP locations checked

    /** Adds items; returns a list of items that were new */
    addItems(names: readonly string[]): string[] {
        const fresh: string[] = [];
        for (const n of names) {
            if (!this.items.has(n)) {
                this.items.add(n);
                fresh.push(n);
            }
        }
        return fresh;
    }

    addChecked(names: readonly string[]): void {
        for (const n of names) this.checked.add(n);
    }

    hasKey(r: RoomId): boolean {
        return this.items.has(itemNames.key(r));
    }

    hasVisited(p: PlaceId): boolean {
        return p === ENTRANCE || this.checked.has(locationNames.enter(p));
    }

    keyCount(): number {
        return ROOMS.filter((r) => this.hasKey(r)).length;
    }
}