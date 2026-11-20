const SUSPECTS = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank'] as const;
const ROOMS = ['Living Room', 'Dining Room', 'Kitchen', 'Study', 'Bedroom'] as const;
const WEAPONS = ['Knife', 'Pistol', 'Rope', 'Candlestick'] as const;

type SuspectId = (typeof SUSPECTS)[number];
type RoomId = (typeof ROOMS)[number];
type WeaponId = (typeof WEAPONS)[number];

type Clue = SuspectId | RoomId | WeaponId;

interface SuspectData {
    name: SuspectId;
    room: RoomId;
    intel: Clue[];
}

interface Speculation {
    suspect: SuspectId;
    room: RoomId;
    weapon: WeaponId;
}

class Suspect {
    constructor(
        readonly name: SuspectId,
        readonly room: RoomId,
        readonly intel: Clue[]
    ) {}
}


function getSuspectsInRoom(room: RoomId, suspects: Suspect[]): Suspect[] {
    return suspects.filter(s => s.room === room);
}

function getSuspectsWithIntel(speculation: Speculation, suspects: Suspect[]): { suspect: Suspect; matches: Clue[] }[] {
    const specValues: [SuspectId, RoomId, WeaponId] = [speculation.suspect, speculation.room, speculation.weapon];
    return suspects
        .map(s => ({ suspect: s, matches: s.intel.filter(i => specValues.includes(i)) }))
        .filter(r => r.matches.length > 0 );
}

const suspectData: SuspectData[] = [
    { name: 'Alice', room: 'Living Room', intel: ['Bob', 'Study'] },
    { name: 'Bob', room: 'Dining Room', intel: ['Knife', 'Carol'] },
    { name: 'Carol', room: 'Kitchen', intel: ['Living Room', 'Pistol'] },
    { name: 'David', room: 'Study', intel: ['Alice', 'Dining Room'] },
];

const allSuspects = suspectData.map(s => new Suspect(s.name, s.room, s.intel));
const refuted: Speculation = { suspect: 'Bob', room: 'Study', weapon: 'Candlestick' };
const unrefuted: Speculation = { suspect: 'Frank', room: 'Bedroom', weapon: 'Rope' }

console.log(getSuspectsInRoom('Dining Room', allSuspects));
console.log(getSuspectsWithIntel(refuted, allSuspects));
console.log(getSuspectsWithIntel(unrefuted, allSuspects));