/**
 * A tiny typed event emitter. We use it instead of Phaser's own emitter so the
 * game logic stays free of Phaser and can run under plain Node in tests.
 *
 *   type Events = { changed: []; log: [lines: string[]] };
 *   const e = new Emitter<Events>();
 *   const off = e.on('log', (lines) => console.log(lines));
 *   e.emit('log', ['hello']);
 *   off();   // unsubscribe
 */
export class Emitter<E extends Record<string, unknown[]>> {
    private readonly handlers: { [K in keyof E]?: Set<(...args: E[K]) => void> } = {};

    /** Subscribe. Returns a function that unsubscribes. */
    on<K extends keyof E>(event: K, fn: (...args: E[K]) => void): () => void {
        let set = this.handlers[event];
        if (!set) {
            set = new Set();
            this.handlers[event] = set;
        }
        set.add(fn);
        return () => {
            set.delete(fn);
        };
    }

    emit<K extends keyof E>(event: K, ...args: E[K]): void {
        const set = this.handlers[event];
        if (!set) return;
        for (const fn of [...set]) fn(...args);
    }
}
