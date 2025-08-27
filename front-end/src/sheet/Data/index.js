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
  flaws: '',
  patron: '',
  favoured_skills: [],
  ponies_and_horses: '',
  skills: {},
  combat_proficiencies: {
    'Axes': 0,
    'Bows': 0,
    'Spears': 0,
    'Swords': 0
  },
  initial_combat_proficiencies: {},
  favorite_weapon: '',
  distinctive_features: [],
  shadow_path: '',
  war_gear: [],
  armour: null,
  helm: null,
  shield: null,
  can_use_shield: true,
  rewards_list: {},
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
