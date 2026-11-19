// The naming contract with the apworld.
// Every string built here must match the apworld exactly.

import { FOYER, ROOMS, SUSPECTS, WEAPONS } from './content.ts';
import type { PlaceId, RoomId, SuspectId, WeaponId } from './content.ts';

/** Must equal the `game` name declared by your World class. */
export const GAME_NAME = 'Suspectipelago';

export const itemNames = {
  profile: (s: SuspectId): string => `Suspect Profile: ${s}`,
  key: (r: RoomId): string => `Room Key: ${r}`,
  report: (w: WeaponId): string => `Weapon Report: ${w}`,
};

export const locationNames = {
  enter: (p: PlaceId): string => `Enter ${p}`,
  question: (s: SuspectId): string => `Question ${s}`,
  intel: (s: SuspectId, slot: 1 | 2): string => `Receive intel (${s} ${slot})`,
};

export const INTERIOR = [FOYER, ...ROOMS] as const;

export function allItemNames(): string[] {
  return [
    ...SUSPECTS.map(itemNames.profile),
    ...ROOMS.map(itemNames.key),
    ...WEAPONS.map(itemNames.report),
  ];
}

export function allLocationNames(): string[] {
  return [
    ...INTERIOR.map(locationNames.enter),
    ...SUSPECTS.map(locationNames.question),
    ...SUSPECTS.flatMap((s) => [locationNames.intel(s, 1), locationNames.intel(s, 2)]),
  ];
}