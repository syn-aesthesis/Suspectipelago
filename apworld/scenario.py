from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .world import SuspectipelagoWorld

from .data import SUSPECTS, ROOMS, WEAPONS, LOCATIONS, SCENE_REGIONS, SCENE_CONNECTIONS

@dataclass
class Scenario:
    crime: tuple[str, str, str]
    intel: list[str]
    suspect_locations: list[tuple[str, str]]
    intel_locations: list[tuple[str, str]]

    @property
    def region_connections(self) -> list[tuple[str, str]]:
        return (SCENE_CONNECTIONS + self.
                suspect_locations)

def generate_scenario(world: SuspectipelagoWorld) -> Scenario:
    crime = (
        world.random.choice(SUSPECTS),
        world.random.choice(ROOMS),
        world.random.choice(WEAPONS),
    )

    intel = [
        *[s for s in SUSPECTS if s != crime[0]],
        *[r for r in ROOMS if r != crime[1]],
        *[w for w in WEAPONS if w != crime[2]],
    ]
    world.random.shuffle(intel)

    suspects = list(SUSPECTS)
    world.random.shuffle(suspects)
    suspect_locations = [
        (SCENE_REGIONS[1 + n], suspects[n]) for n in range(len(suspects))
    ]
    intel_locations = [
        (LOCATIONS[30001 + n], intel[n]) for n in range(len(intel))
    ]

    return Scenario(crime, intel, suspect_locations, intel_locations)