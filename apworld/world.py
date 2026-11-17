from collections.abc import Mapping
from typing import Any

from worlds.AutoWorld import World

from . import items, locations, regions, rules, scenario, web_world
# from . import options as suspectipelago_options
class SuspectipelagoWorld(World):
    """
    Suspectipelago is a murder mystery game inspired by the Cluedo franchise.
    Question witnesses, make speculations, and solve the case!
    """

    game = "Suspectipelago"

    web = web_world.SuspectipelagoWebWorld()

    # options_dataclass = suspectipelago_options.SuspectipelagoOptions
    # options: suspectipelago_options.SuspectipelagoOptions

    location_name_to_id = locations.LOCATION_NAME_TO_ID
    item_name_to_id = items.ITEM_NAME_TO_ID

    origin_region_name = "Entrance"
    scenario: scenario.Scenario

    def generate_early(self) -> None:
        self.scenario = scenario.generate_scenario(self)

    def create_regions(self) -> None:
        regions.create_and_connect_regions(self)
        locations.create_all_locations(self)

    def set_rules(self) -> None:
        rules.set_all_rules(self)

    def create_items(self) -> None:
        items.create_all_items(self)

    def create_item(self, name: str) -> items.SuspectipelagoItem:
        return items.create_item_with_correct_classification(self, name)

    def get_filler_item_name(self) -> str:
        return items.get_random_filler_item_name(self)

    def fill_slot_data(self) -> Mapping[str, Any]:
        slot_data = {
            "crime": list(self.scenario.crime),
            "suspect_placements": dict(self.scenario.suspect_placements),
            "intel_placements": dict(self.scenario.intel_placements)
        }
        return slot_data
