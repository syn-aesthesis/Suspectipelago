# --- Core lists ---
SUSPECTS =  [
    "Alice",
    "Bob",
    "Carol",
    "David",
    "Eve",
    "Frank",
]
ROOMS = [
    "Living Room",
    "Dining Room",
    "Kitchen",
    "Study",
    "Bedroom",
]
WEAPONS = [
    "Knife",
    "Pistol",
    "Rope",
    "Candlestick"
]

ENTRANCE = "Entrance"
FOYER = "Foyer"
INTERIOR = [FOYER, *ROOMS]
INTEL_SLOTS = (1, 2)

# --- Name helpers ---
def entrance_name(src, dst):    return f"{src} to {dst}"
def enter_location(place):      return f"Enter {place}"
def question_location(s):       return f"Question {s}"
def intel_location(s, slot):    return f"Receive intel ({s} {slot})"

# --- Regions ---
SCENE_REGIONS = [ENTRANCE, *INTERIOR]
SUSPECT_REGIONS = list(SUSPECTS)
REGIONS = SCENE_REGIONS + SUSPECT_REGIONS
SCENE_CONNECTIONS = [(ENTRANCE, FOYER)] + [(FOYER, r) for r in ROOMS]

# --- Items ---
CLUE_ITEMS = (
    {s: f"Suspect Profile: {s}" for s in SUSPECTS}
    | {r: f"Room Key: {r}" for r in ROOMS}
    | {w: f"Weapon Report: {w}" for w in WEAPONS}
)
ITEMS = {
    **{1001 + i: CLUE_ITEMS[s] for i, s in enumerate(SUSPECTS)},
    **{2001 + i: CLUE_ITEMS[r] for i, r in enumerate(ROOMS)},
    **{3001 + i: CLUE_ITEMS[w] for i, w in enumerate(WEAPONS)},
}
FILLER = {101: "Filler"}
ITEM_NAME_TO_ID = {name: i for i, name in (ITEMS | FILLER).items()}

PROFILE_ITEMS   = [CLUE_ITEMS[s] for s in SUSPECTS]
KEY_ITEMS       = [CLUE_ITEMS[r] for r in ROOMS]
REPORT_ITEMS    = [CLUE_ITEMS[w] for w in WEAPONS]
ENTRANCE_KEYS   = {entrance_name(FOYER, r): CLUE_ITEMS[r] for r in ROOMS}

# --- Locations ---
ENTER_LOCATIONS     = [enter_location(p) for p in INTERIOR]
QUESTION_LOCATIONS  = [question_location(s) for s in SUSPECTS]
INTEL_LOCATIONS     = [intel_location(s, n) for s in SUSPECTS for n in INTEL_SLOTS]

LOCATIONS = {
    **{10001 + i: name for i, name in enumerate(ENTER_LOCATIONS)},
    **{20001 + i: name for i, name in enumerate(QUESTION_LOCATIONS)},
    **{30001 + i: name for i, name in enumerate(INTEL_LOCATIONS)},
}
LOCATION_NAME_TO_ID = {name: i for i, name in LOCATIONS.items()}

REGION_LOCATIONS = {
    **{p: [enter_location(p)] for p in INTERIOR},
    **{s: [question_location(s), *[intel_location
                                   (s, n) for n in INTEL_SLOTS]] for s in SUSPECTS},
}

# --- Invariants ---

assert len(CLUE_ITEMS) == len(SUSPECTS) + len(ROOMS) + len(WEAPONS), \
    "suspect, room, and weapon names must be unique across all three lists"
assert len(INTEL_LOCATIONS) == len(CLUE_ITEMS) - 3, \
    "intel pieces must equal the wrong clues: every clue except the 3 in the crime"
assert len(INTERIOR) == len(SUSPECTS), \
    "scenario.py places exactly one suspect per place"
assert len(ITEM_NAME_TO_ID) == len(ITEMS) + len(FILLER)
assert len(LOCATION_NAME_TO_ID) == len(LOCATIONS)

