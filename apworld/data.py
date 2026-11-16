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

SCENE_REGIONS = ["Entrance", "Foyer"] + ROOMS
SUSPECT_REGIONS = SUSPECTS
REGIONS = SCENE_REGIONS + SUSPECT_REGIONS

SCENE_CONNECTIONS = [
    ("Entrance", "Foyer"),
    ("Foyer", "Living Room"),
    ("Foyer", "Dining Room"),
    ("Foyer", "Kitchen"),
    ("Foyer", "Study"),
    ("Foyer", "Bedroom")
]

ITEMS = {
    1001: "Suspect Profile: Alice",
    1002: "Suspect Profile: Bob",
    1003: "Suspect Profile: Carol",
    1004: "Suspect Profile: David",
    1005: "Suspect Profile: Eve",
    1006: "Suspect Profile: Frank",
    2001: "Room Key: Living Room",
    2002: "Room Key: Dining Room",
    2003: "Room Key: Kitchen",
    2004: "Room Key: Study",
    2005: "Room Key: Bedroom",
    3001: "Weapon Report: Knife",
    3002: "Weapon Report: Pistol",
    3003: "Weapon Report: Rope",
    3004: "Weapon Report: Candlestick",
}
FILLER = {
    101: "Filler"
}
ITEM_NAME_TO_ID = {name: i for i, name in (ITEMS | FILLER).items()}

LOCATIONS = {
    10001: "Enter Foyer",
    10002: "Enter Living Room",
    10003: "Enter Dining Room",
    10004: "Enter Kitchen",
    10005: "Enter Study",
    10006: "Enter Bedroom",
    20001: "Question Alice",
    20002: "Question Bob",
    20003: "Question Carol",
    20004: "Question David",
    20005: "Question Eve",
    20006: "Question Frank",
    30001: "Receive intel (Alice 1)",
    30002: "Receive intel (Alice 2)",
    30003: "Receive intel (Bob 1)",
    30004: "Receive intel (Bob 2)",
    30005: "Receive intel (Carol 1)",
    30006: "Receive intel (Carol 2)",
    30007: "Receive intel (David 1)",
    30008: "Receive intel (David 2)",
    30009: "Receive intel (Eve 1)",
    30010: "Receive intel (Eve 2)",
    30011: "Receive intel (Frank 1)",
    30012: "Receive intel (Frank 2)",
}
LOCATION_NAME_TO_ID = {name: i for i, name in LOCATIONS.items()}

REGION_LOCATIONS = {
    "Foyer":        ["Enter Foyer"],
    "Living Room":  ["Enter Living Room"],
    "Dining Room":  ["Enter Dining Room"],
    "Kitchen":      ["Enter Kitchen"],
    "Study":        ["Enter Study"],
    "Bedroom":      ["Enter Bedroom"],
    "Alice":    ["Question Alice", "Receive intel (Alice 1)", "Receive intel (Alice 2)"],
    "Bob":      ["Question Bob", "Receive intel (Bob 1)", "Receive intel (Bob 2)"],
    "Carol":    ["Question Carol", "Receive intel (Carol 1)", "Receive intel (Carol 2)"],
    "David":    ["Question David", "Receive intel (David 1)", "Receive intel (David 2)"],
    "Eve":      ["Question Eve", "Receive intel (Eve 1)", "Receive intel (Eve 2)"],
    "Frank":    ["Question Frank", "Receive intel (Frank 1)", "Receive intel (Frank 2)"],
}

ENTRANCE_KEYS = {
    "Foyer to Living Room": "Room Key: Living Room",
    "Foyer to Dining Room": "Room Key: Dining Room",
    "Foyer to Kitchen":     "Room Key: Kitchen",
    "Foyer to Study":       "Room Key: Study",
    "Foyer to Bedroom":     "Room Key: Bedroom",
}

INTEL_ITEMS = dict(zip(SUSPECTS + ROOMS + WEAPONS, ITEMS.values()))