from __future__ import annotations
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .world import SuspectipelagoWorld

from .data import SUSPECTS, ROOMS, WEAPONS, INTERIOR, INTEL_LOCATIONS, SCENE_CONNECTIONS

@dataclass
class Scenario:
    crime: tuple[str, str, str]
    intel: list[str]
    suspect_placements: list[tuple[str, str]]
    intel_placements: list[tuple[str, str]]

    @property
    def region_connections(self) -> list[tuple[str, str]]:
        return (SCENE_CONNECTIONS + self.
                suspect_placements)

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

    suspect_placements = list(zip(INTERIOR, suspects))
    intel_placements = list(zip(INTEL_LOCATIONS, intel))

    return Scenario(crime, intel, suspect_placements, intel_placements)
