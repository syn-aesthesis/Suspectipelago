import { ENTRANCE } from './content.ts';
import type { PlaceId } from './content.ts';

/** Describes the game state (current scene, received items, checked locations) */
export class GameState {
    place: PlaceId = ENTRANCE;
}