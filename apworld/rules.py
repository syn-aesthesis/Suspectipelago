from __future__ import annotations
from typing import TYPE_CHECKING
from rule_builder.rules import (
    Has, CanReachRegion, AtLeast, And
)
if TYPE_CHECKING:
    from .world import SuspectipelagoWorld

from .data import (ENTRANCE_KEYS, CLUE_ITEMS, PROFILE_ITEMS, KEY_ITEMS,
                   REPORT_ITEMS, SUSPECT_REGIONS)

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
    for location, clue in world.scenario.intel_placements:
        world.set_rule(
            world.get_location(location),
            And(
                AtLeast(1, *[Has(i) for i in PROFILE_ITEMS]),
                AtLeast(1, *[Has(i) for i in KEY_ITEMS]),
                AtLeast(1, *[Has(i) for i in REPORT_ITEMS]),
                Has(CLUE_ITEMS[clue])
            )
        )

    # set location rules for goal
    world.set_rule(
        world.get_location("Goal Condition"),
        And(
            *[Has(CLUE_ITEMS[c]) for c in world.scenario.crime],
            *[CanReachRegion(s) for s in SUSPECT_REGIONS]
        )
    )

def set_completion_condition(world: SuspectipelagoWorld) -> None:
    world.set_completion_rule(Has("Goal"))
