from __future__ import annotations
from typing import TYPE_CHECKING
from BaseClasses import ItemClassification, Location, Region
from . import items
if TYPE_CHECKING:
    from .world import SuspectipelagoWorld

from .data import LOCATION_NAME_TO_ID, REGION_LOCATIONS

class SuspectipelagoLocation(Location):
    game = "Suspectipelago"

def get_location_names_with_ids(location_names: list[str]):
    return {location_name: LOCATION_NAME_TO_ID[location_name]
            for location_name in location_names}

def create_all_locations(world: SuspectipelagoWorld) -> None:
    create_regular_locations(world)
    create_events(world)

def create_regular_locations(world: SuspectipelagoWorld) -> None:
    regions: dict[str, Region] = {}
    for region_name, location_names in REGION_LOCATIONS.items():
        regions[region_name] = world.get_region(region_name)
        regions[region_name].add_locations(
            get_location_names_with_ids(location_names),
            SuspectipelagoLocation
        )

def create_events(world: SuspectipelagoLocation) -> None:
    start_region = world.get_region(world.origin_region_name)
    start_region.add_event("Goal Condition", "Goal",
                          location_type=SuspectipelagoLocation,
                          item_type=items.SuspectipelagoItem)