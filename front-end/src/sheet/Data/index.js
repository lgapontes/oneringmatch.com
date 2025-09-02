import React from "react";

const defaultFunction = (character,callback) => {
  callback();
};

export const NEW_CHARACTER = {
  language: 'English',
  randomPointChoiceProficiences: false,
  heroic_culture: '',
  heroic_culture_index: '',
  calling: '',
  calling_index: '',
  attributes: {
    strength: 0,
    heart: 0,
    wits: 0,
    endurance: 0,
    hope: 0,
    parry: 0,
    TN_strength: 0,
    TN_heart: 0,
    TN_wits: 0
  },
  cultural_blessing_name: '',
  cultural_blessing: '',
  standard_of_living: '',
  standard_of_living_index: '',
  starting_treasure_rating: 0,
  age: 0,
  range_ages: {min: 14, max: 30},
  name: '',
  family_name: '',
  genre: '',
  imagem_path: '',
  treasure: 0,
  flaws: [],
  patron: '',
  patron_fellowship_bonus: 0,
  patron_advantage: '',
  favoured_skills: [],
  ponies_and_horses: '',
  skills: {
    'Awe': 0,
    'Athletics': 0,
    'Awareness': 0,
    'Hunting': 0,
    'Song': 0,
    'Craft': 0,
    'Enhearten': 0,
    'Travel': 0,
    'Insight': 0,
    'Healing': 0,
    'Courtesy': 0,
    'Battle': 0,
    'Persuade': 0,
    'Stealth': 0,
    'Scan': 0,
    'Explore': 0,
    'Riddle': 0,
    'Lore': 0,
  },
  combat_proficiencies: {
    'Axes': 0,
    'Bows': 0,
    'Spears': 0,
    'Swords': 0,
    'Brawling': 0,
  },
  initial_combat_proficiencies: {},
  favorite_weapon: '',
  distinctive_features: [],
  shadow_path: '',
  shadow_path_index: '',
  war_gear: [],
  armour: null,
  helm: null,
  shield: null,
  can_use_shield: true,
  useful_items: [],
  extra_notes: '',
  current_stats: {
    adventure_points: 0,
    skill_points: 0,
    fellowship_score: 0,
    current_endurance: 0,
    load: 0,
    fatigue: 0,
    current_hope: 0,
    shadow: 0,
    shadow_scars: 0,
    weary: false,
    miserable: false,
    wounded: false,
    injury: ''
  },
  rewards_list: {},
  rewards: {
    name: '',
    notes: '',
    item: ''
  },
  virtues: {
    name: '',
    notes: ''
  },
  wisdow: 1,
  valour: 1
};

export const STANDARDS_OF_LIVING = [
  /* 0 - Poor */
  {
    starting_treasure_rating: 0,
    armour: [0,1],
    shields: [0],
    useful_items: 0,
    ponies_and_horses: []
  },

  /* 1 - Frugal */
  {
    starting_treasure_rating: 0,
    armour: [0,1],
    shields: [0],
    useful_items: 1,
    ponies_and_horses: []
  },

  /* 2 - Common */
  {
    starting_treasure_rating: 30,
    armour: [0,1,2],
    shields: [0,1],
    useful_items: 2,
    ponies_and_horses: [0,1]
  },

  /* 3 - Prosperous */
  {
    starting_treasure_rating: 90,
    armour: [0,1,2,3],
    shields: [0,1,2],
    useful_items: 3,
    ponies_and_horses: [2,3]
  },

  /* 4 - Rich */
  {
    starting_treasure_rating: 180,
    armour: [0,1,2,3],
    shields: [0,1,2],
    useful_items: 4,
    ponies_and_horses: [4,5]
  },

  /* 5 - Very Rich */
  {
    starting_treasure_rating: 300,
    armour: [0,1,2,3],
    shields: [0,1,2],
    useful_items: 4,
    ponies_and_horses: [4,5]
  },
];

export const SKILLS = {
  'Awe': 0,
  'Athletics': 1,
  'Awareness': 2,
  'Hunting': 3,
  'Song': 4,
  'Craft': 5,
  'Enhearten': 6,
  'Travel': 7,
  'Insight': 8,
  'Healing': 9,
  'Courtesy': 10,
  'Battle': 11,
  'Persuade': 12,
  'Stealth': 13,
  'Scan': 14,
  'Explore': 15,
  'Riddle': 16,
  'Lore': 17,
};

export const SKILLS_PER_ATTRIBUTE = {
  'strength': [
    'Awe',
    'Athletics',
    'Awareness',
    'Hunting',
    'Song',
    'Craft',
  ],
  'heart': [
    'Enhearten',
    'Travel',
    'Insight',
    'Healing',
    'Courtesy',
    'Battle',
  ],
  'wits': [
    'Persuade',
    'Stealth',
    'Scan',
    'Explore',
    'Riddle',
    'Lore',
  ],
};

export const DISTINCTIVE_FEATURES = {
  'Bold': 0,
  'Cunning': 1,
  'Eager': 2,
  'Faithful': 3,
  'Fair': 4,
  'Fair-Spoken': 5,
  'Fierce': 6,
  'Generous': 7,
  'Honourable': 8,
  'Inquisitive': 9,
  'Keen-Eyed': 10,
  'Lordly': 11,
  'Merry': 12,
  'Patient': 13,
  'Proud': 14,
  'Rustic': 15,
  'Secretive': 16,
  'Stern': 17,
  'Subtle': 18,
  'Swift': 19,
  'Tall': 20,
  'True-Hearted': 21,
  'Wary': 22,
  'Wilful': 23,
};

export const ADDITIONAL_DISTINCTIVE_FEATURES = {
  'Leadership': 0,
  'Enemy-Lore: Evil Men': 1,
  'Enemy-Lore: Orcs': 2,
  'Enemy-Lore: Spiders': 3,
  'Enemy-Lore: Trolls': 4,
  'Enemy-Lore: Wargs': 5,
  'Enemy-Lore: Undead': 6,
  'Folk-Lore': 7,
  'Rhymes of Lore': 8,
  'Burglary': 9,
  'Shadow-Lore': 10,
};

export const COMBAT_PROFICIENCIES = {
  'Axes': ['Axe','Long-hafted Axe','Great Axe','Mattock'],
  'Bows': ['Bow','Great Bow'],
  'Spears': ['Short Spear','Spear','Great Spear'],
  'Swords': ['Short Sword','Sword','Long Sword'],
  'Brawling': ['Dagger','Cudgel','Club'],
};

export const CALLINGS = [
  /* Captain */
  {
    two_favoured_skills: ['Battle','Enhearten','Persuade'],
    additional_distinctive_feature: ['Leadership'],
    shadow_path: 0
  },

  /* Champion */
  {
    two_favoured_skills: ['Athletics', 'Awe', 'Hunting'],
    additional_distinctive_feature: ['Enemy-Lore: Evil Men','Enemy-Lore: Orcs','Enemy-Lore: Spiders','Enemy-Lore: Trolls','Enemy-Lore: Wargs','Enemy-Lore: Undead'],
    shadow_path: 1
  },

  /* Messenger */
  {
    two_favoured_skills: ['Courtesy', 'Song', 'Travel'],
    additional_distinctive_feature: ['Folk-Lore'],
    shadow_path: 2
  },

  /* Scholar */
  {
    two_favoured_skills: ['Craft', 'Lore', 'Riddle'],
    additional_distinctive_feature: ['Rhymes of Lore'],
    shadow_path: 3
  },

  /* Treasure Hunter */
  {
    two_favoured_skills: ['Explore', 'Scan', 'Stealth'],
    additional_distinctive_feature: ['Burglary'],
    shadow_path: 4
  },

  /* Warden */
  {
    two_favoured_skills: ['Awareness', 'Healing', 'Insight'],
    additional_distinctive_feature: ['Shadow-Lore'],
    shadow_path: 5
  },
];

export const HEROIC_CULTURES = [
  /* 0 - Bardings */
  {
    images: {
      'm': ['img/characters/bardings/m0.jpg','img/characters/bardings/m1.jpg'],
      'f': ['img/characters/bardings/f0.jpg','img/characters/bardings/f1.jpg']
    },
    standard_of_living: 3,
    range_ages: {min: 18, max: 40},
  },

  /* 1 - Dwarves of Durin's Folk */
  {
    images: {
      'm': ['img/characters/dwarves_of_durins_folk/m0.jpg','img/characters/dwarves_of_durins_folk/m1.jpg','img/characters/dwarves_of_durins_folk/m2.jpg'],
      'f': ['img/characters/dwarves_of_durins_folk/f0.jpg','img/characters/dwarves_of_durins_folk/f1.jpg']
    },
    standard_of_living: 3,
    range_ages: {min: 50, max: 90},
  },

  /* 2 - Elves of Lindon */
  {
    images: {
      'm': ['img/characters/elves_of_lindon/m0.jpg','img/characters/elves_of_lindon/m1.jpg'],
      'f': ['img/characters/elves_of_lindon/f0.jpg','img/characters/elves_of_lindon/f1.jpg']
    },
    standard_of_living: 1,
    range_ages: {min: 100, max: 300},
  },

  /* 3 - Hobbits of the Shire */
  {
    images: {
      'm': ['img/characters/hobbits_of_the_shire/m0.jpg','img/characters/hobbits_of_the_shire/m1.jpg'],
      'f': ['img/characters/hobbits_of_the_shire/f0.jpg','img/characters/hobbits_of_the_shire/f1.jpg']
    },
    standard_of_living: 2,
    range_ages: {min: 33, max: 50},
  },

  /* 4 - Men of Bree */
  {
    images: {
      'm': ['img/characters/men_of_bree/m0.jpg','img/characters/men_of_bree/m1.jpg'],
      'f': ['img/characters/men_of_bree/f0.jpg','img/characters/men_of_bree/f1.jpg']
    },
    standard_of_living: 2,
    range_ages: {min: 18, max: 40},
  },

  /* 5 - Rangers of the North */
  {
    images: {
      'm': ['img/characters/rangers_of_the_north/m0.jpg','img/characters/rangers_of_the_north/m1.jpg','img/characters/rangers_of_the_north/m2.jpg'],
      'f': ['img/characters/rangers_of_the_north/f0.jpg','img/characters/rangers_of_the_north/f1.jpg']
    },
    standard_of_living: 1,
    range_ages: {min: 20, max: 50},
  },

  /* 6 - High Elves of Rivendell */
  {
    images: {
      'm': ['img/characters/high_elves_of_rivendell/m0.jpg','img/characters/high_elves_of_rivendell/m1.jpg'],
      'f': ['img/characters/high_elves_of_rivendell/f0.jpg','img/characters/high_elves_of_rivendell/f1.jpg']
    },
    standard_of_living: 3,
    range_ages: {min: 100, max: 300},
  },

  /* 7 - Beornings */
  {
    images: {
      'm': ['img/characters/beornings/m0.jpg','img/characters/beornings/m1.jpg'],
      'f': ['img/characters/beornings/f0.jpg','img/characters/beornings/f1.jpg']
    },
    standard_of_living: 2,
    range_ages: {min: 14, max: 40},
  },

  /* 8 - Elves of Mirkwood */
  {
    images: {
      'm': ['img/characters/elves_of_mirkwood/m0.jpg','img/characters/elves_of_mirkwood/m1.jpg'],
      'f': ['img/characters/elves_of_mirkwood/f0.jpg','img/characters/elves_of_mirkwood/f1.jpg']
    },
    standard_of_living: 1,
    range_ages: {min: 300, max: 700},
  },

  /* 9 - Woodmen of Wilderland */
  {
    images: {
      'm': ['img/characters/woodmen_of_wilderland/m0.jpg','img/characters/woodmen_of_wilderland/m1.jpg'],
      'f': ['img/characters/woodmen_of_wilderland/f0.jpg','img/characters/woodmen_of_wilderland/f1.jpg']
    },
    standard_of_living: 1,
    range_ages: {min: 16, max: 55},
  },

  /* 10 - Dwarves of Nogrod and Belegost */
  {
    images: {
      'm': ['img/characters/dwarves_of_nogrod_and_belegost/m0.jpg','img/characters/dwarves_of_nogrod_and_belegost/m1.jpg'],
      'f': ['img/characters/dwarves_of_nogrod_and_belegost/f0.jpg','img/characters/dwarves_of_nogrod_and_belegost/f1.jpg']
    },
    standard_of_living: 2,
    range_ages: {min: 50, max: 90},
  },

  /* 11 - Elves of Lórien */
  {
    images: {
      'm': ['img/characters/realms_of_the_three_rings/m0.jpg','img/characters/realms_of_the_three_rings/m1.jpg','img/characters/realms_of_the_three_rings/m2.jpg'],
      'f': ['img/characters/realms_of_the_three_rings/f0.jpg','img/characters/realms_of_the_three_rings/f1.jpg']
    },
    standard_of_living: 1,
    range_ages: {min: 300, max: 700},
  },
];
