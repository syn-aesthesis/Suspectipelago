// A fake Archipelago server: no network, just enough behaviour to build against.
// The Nth location you check hands you the Nth item in a shuffled queue.

import { Emitter } from '../core/emitter.ts';
import { allItemNames, allLocationNames } from '../core/names.ts';
import { mulberry32, shuffle } from '../core/rng.ts';
import type { ApEvents, ApService, ConnectOptions, InitialSync } from './ApService.ts';

export interface OfflineOptions {
    /** Random source for shuffling the queue. Default Math.random. */
    rng?: () => number;
}

export class OfflineApService implements ApService {
    readonly kind = 'offline' as const;
    readonly events = new Emitter<ApEvents>();

    private readonly queue: string[];
    private readonly checkedOrder: string[] = [];
    private readonly validLocations = new Set(allLocationNames());

    constructor(options: OfflineOptions = {}) {
        this.queue = shuffle(allItemNames(), options.rng ?? Math.random);
    }

    async connect(_options?: ConnectOptions): Promise<InitialSync> {
        return { items: [], checkedLocations: [] };
    }

    checkLocation(name: string): boolean {
        if (!this.validLocations.has(name)) return false;
        if (this.checkedOrder.includes(name)) return true;
        this.checkedOrder.push(name);
        const item = this.queue[this.checkedOrder.length - 1];
        queueMicrotask(() => {
            this.events.emit('checked', [name]);
            if (item !== undefined) this.events.emit('items', [item]);
        });
        return true;
    }

    missingLocations(): string[] {
        return [...this.validLocations].filter((n) => !this.checkedOrder.includes(n));
    }

    disconnect(): void {}
}

export function makeTestService(seed = 1): OfflineApService {
    return new OfflineApService({ rng: mulberry32(seed) });
}