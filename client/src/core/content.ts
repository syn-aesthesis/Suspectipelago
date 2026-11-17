// Core lists (must match apworld data)
export const SUSPECTS = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank'] as const;
export const WEAPONS = ['Knife', 'Pistol', 'Rope', 'Candlestick'] as const;
export const ROOMS = ['Living Room', 'Dining Room', 'Kitchen', 'Study', 'Bedroom'] as const;

export const ENTRANCE = 'Entrance';
export const FOYER = 'Foyer';
export const PLACES = [ENTRANCE, FOYER, ...ROOMS] as const;

export type SuspectId = (typeof SUSPECTS)[number];
export type WeaponId = (typeof WEAPONS)[number];
export type RoomId = (typeof ROOMS)[number];
export type PlaceId = (typeof PLACES)[number];

// Text descriptions of game entities
// Compilation fails if any entity defined in the core lists does not have a description
export const PLACE_INFO: Record<PlaceId, string> = {
    'Entrance':     'Rain hammers the front steps of the manor. The door stands open.',
    'Foyer':        'A cold marble hall. Doors lead off in every direction.',
    'Living Room':  'Sagging sofas face a cold fireplace. A clock ticks too loudly.',
    'Dining Room':  'A long table set for a dinner nobody finished.',
    'Kitchen':      'Copper pans hang over a scrubbed table. Something smells off.',
    'Study':        'Leather chairs, a dead fire, and a desk covered in letters.',
    'Bedroom':      'A four-poster bed, drawn curtains, and a drawer left half open.',
};
export const SUSPECT_INFO: Record<SuspectId, string> = {
    'Alice':    'The nervous niece.',
    'Bob':      'The butler who sees everything.',
    'Carol':    'The family doctor.',
    'David':    'The business partner.',
    'Eve':      'The estranged daughter.',
    'Frank':    'The gardener.',
};
export const WEAPON_INFO: Record<WeaponId, string> = {
    'Knife':        'A carving knife with a worn handle.',
    'Pistol':       'A small revolver, one chamber empty.',
    'Rope':         'Frayed hemp.',
    'Candlestick':  'Heavy brass.',
}

// World map: Entrance <-> Foyer <-> each of the five rooms
export function exitsOf(place: PlaceId): PlaceId[] {
    if (place === ENTRANCE) return [FOYER];
    if (place === FOYER) return [ENTRANCE, ...ROOMS];
    return [FOYER];
}

