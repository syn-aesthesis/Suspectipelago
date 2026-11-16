from BaseClasses import Tutorial
from worlds.AutoWorld import WebWorld

class SuspectipelagoWebWorld(WebWorld):
    game = "Suspectipelago"

    theme = "ice"

    setup_en = Tutorial(
        "Multiworld Setup Guide",
        "A guide to setting up Suspectipelago for Multiworld.",
        "English",
        "setup_en.md",
        "setup/en",
        ["synaesthesis"]
    )

    tutorials = [setup_en]