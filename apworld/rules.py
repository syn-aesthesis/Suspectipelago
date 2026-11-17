from __future__ import annotations
from typing import TYPE_CHECKING
from rule_builder.rules import (
    Has, CanReachRegion, AtLeast, And
)
if TYPE_CHECKING:
    from .world import SuspectipelagoWorld

from .data import ENTRANCE_KEYS, ITEMS, INTEL_ITEMS, SUSPECT_REGIONS

def set_all_rules(world: SuspectipelagoWorld) -> None:
    set_all_entrance_rules(world)
    set_all_location_rules(world)
    set_completion_condition(world)

def set_all_entrance_rules(world: SuspectipelagoWorld) -> None:
    # set entrance rules for rooms
    for entrance, key in ENTRANCE_KEYS.items():
        world.set_rule(
            world.get_entrance(entrance),
            Has(key)
        )

def set_all_location_rules(world: SuspectipelagoWorld) -> None:
    # set location rules for intel
    for location, intel in world.scenario.intel_placements:
        world.set_rule(
            world.get_location(location),
            And(
                AtLeast(1, *[Has(item) for item in ITEMS.values() if "Suspect Profile" in item]),
                AtLeast(1, *[Has(item) for item in ITEMS.values() if "Room Key" in item]),
                AtLeast(1, *[Has(item) for item in ITEMS.values() if "Weapon Report" in item]),
                Has(INTEL_ITEMS[intel])
            )
        )

    # set location rules for goal
    world.set_rule(
        world.get_location("Goal Condition"),
        And(
            *[Has(INTEL_ITEMS[c]) for c in world.scenario.crime],
            *[CanReachRegion(suspect) for suspect in SUSPECT_REGIONS]
        )
    )

def set_completion_condition(world: SuspectipelagoWorld) -> None:
    world.set_completion_rule(Has("Goal"))
