import type { Emitter } from '../core/emitter.ts';

export interface ConnectOptions { 
    url: string;
    slot: string;
    password: string;
};

export interface InitialSync {
    items: string[];  // names of every item received so far
    checkedLocations: string[];  // names of every location already checked
}

export type ApEvents = {
    items: [names: string[]];
    checked: [names: string[]];
    disconnected: [];
};

export interface ApService {
    readonly kind: 'archipelago' | 'offline';
    readonly events: Emitter<ApEvents>;
    connect(options: ConnectOptions): Promise<InitialSync>;
    checkLocation(name: string): boolean;  // never throws; return false if check could not be sent
    missingLocations(): string[];
    disconnect(): void;
}