import React from "react";

export const FR_FR = {
  'menu': {
    'header': {
      'button': {
        'login': 'Se connecter',
        'language': 'Langue',
      },
    },
  },
  'items': {
    'armour': [
      /* 00 */ 'Chemise de Cuir',
      /* 01 */ 'Corselet à Manches Longues',
      /* 02 */ 'Chemise de Mailles',
      /* 03 */ 'Cotte de Mailles',
    ],
    'helms': [
      /* 00 */ 'Heaume',
    ],
    'shields': [
      /* 00 */ 'Rondache',
      /* 01 */ 'Bouclier',
      /* 02 */ 'Grand Bouclier',
    ],
    'weapons': [
      /* 00 */ 'Dague',
      /* 01 */ 'Gourdin',
      /* 02 */ 'Massue',
      /* 03 */ 'Epée Courte',
      /* 04 */ 'Epée',
      /* 05 */ 'Epée Longue',
      /* 06 */ 'Lance Courte',
      /* 07 */ 'Lance',
      /* 08 */ 'Grande Lance',
      /* 09 */ 'Hache',
      /* 10 */ 'Hache à Long Manche',
      /* 11 */ 'Grande Hache',
      /* 12 */ 'Bigot',
      /* 13 */ 'Arc',
      /* 14 */ 'Grand Arc',
    ],
    'travelling_gear': [
      /* 00 */ 'Un couteau de chasse pour écorcher les lapins',
      /* 01 */ 'Une petite boîte contenant du sel de cuisine',
      /* 02 */ 'Quelques mètres de corde et un grappin',
      /* 03 */ 'Une lanterne à l’épreuve du vent',
      /* 04 */ 'Un instrument de musique exotique',
      /* 05 */ 'Un baume apaisant',
      /* 06 */ 'Des vêtements coûteux',
      /* 07 */ 'Des boucles d’oreille en perles',
      /* 08 */ 'Une boisson qui donne des forces',
      /* 09 */ 'Une héliolite, pour naviguer par mauvais temps',
      /* 10 */ 'Une pipe de bonne qualité pour se détendre',
      /* 11 */ 'Des cartes détaillées d’une région',
      /* 12 */ 'Des instruments pour tailler la pierre',
      /* 13 */ 'Des torches et un briquet',
      /* 14 */ 'Un filet de pêche',
      /* 15 */ 'Un livre de poésie',
      /* 16 */ 'Des parchemins de la bibliothèque du Gondor',
      /* 17 */ 'Des feuilles d\'Athelas',
      /* 18 */ 'Une flûte',
      /* 19 */ 'Des pétales de lavande',
      /* 20 */ 'Un nécessaire de couture',
      /* 21 */ 'Des outils pour travailler le bois',
      /* 22 */ 'Un anneau avec un sceau personnel',
      /* 23 */ 'Une cape elfique',
      /* 24 */ 'Un cor de bataille',
    ],
  },
  'ponies_and_horses': [
    /* 00 */ 'Vieux Cheval',
    /* 01 */ 'Poney Affamé',
    /* 02 */ 'Monture Décente',
    /* 03 */ 'Poney Décent',
    /* 04 */ 'Monture Puissante',
    /* 05 */ 'Poney Puissant',
  ],
  'sheet': {
    'character-sheet': {
      'name': 'nom',
      'heroic-culture': 'Culture Héroïque',
      'heroic-cultures': [
        'Bardides',
        'Nains du Peuple de Durin',
        'Elfes du Lindon',
        'Hobbits de la Comté',
        'Hommes de Bree',
        'Rôdeurs du Nord',
        'Hauts-elfes de Fondcombe',
        'Béornides',
        'Elfes de la Forêt Noire',
        'Hommes des Bois des Terres Sauvages',
        'Nains de Nogrod et Belegost',
        'Elfes de Lórien',
      ],
      'calling': 'Vocation',
      'callings': [
        'Capitaine',
        'Champion',
        'Messager',
        'Erudit',
        'Chasseur de Trésors',
        'Protecteur',
      ],
      'cultural-blessing': 'Avantage Culturel',
      'cultural-blessing-rules': 'Règles de Avantage Culturel',
      'standard-of-living': 'Niveau de vie',
      'treasure': 'Trésor',
      'starting_treasure_rating': 'Démarrage du classement au trésor',
      'age': 'Âge',
      'age-suggestion': 'Suggestion',
      'standards-of-living': [
        'Pauvre',
        'Modeste',
        'Courant',
        'Prospère',
        'Riche',
        'Très Riche',
      ],
    },
  },

  'heroic-cultures': [
    /* 0 - Bardings */
    {
      'cultural-blessing-name': 'Vaillant',
      'cultural-blessing-rules': 'Tests de VAILLANCE sont Favorisés.',
    },
    /* 1 - Dwarves of Durin's Folk */
    {
      'cultural-blessing-name': 'Redoutable',
      'cultural-blessing-rules': 'Vous divisez par deux la capacité de Charge de toute armure que vous portez (en arrondissant les fractions à l\'entier supérieur), y compris les casques (mais pas les boucliers).',
    },
    /* 2 - Elves of Lindon */
    {
      'cultural-blessing-name': 'Compétence elfique',
      'cultural-blessing-rules': 'Si vous n\'êtes pas Mélancolique, vous pouvez dépenser 1 point d\'Espoir pour obtenir un succès magique sur un tests lorsque vous utilisez une Compétence dans laquelle vous possédez au moins un point.',
    },
    /* 3 - Hobbits of the Shire ZZZ */
    {
      'cultural-blessing-name': 'Sens du hobbit',
      'cultural-blessing-rules': 'Vos tests de SAGESSE sont favorisés, et vous gagnez (1d) sur tous les tests d\'Ombre effectués pour résister aux effets de la Cupidité.',
    },
    /* 4 - Men of Bree */
    {
      'cultural-blessing-name': 'Sang-Bree',
      'cultural-blessing-rules': 'Chaque Homme de Bree dans la compagnie augmente le niveau de Communauté de 1 point.',
    },
    /* 5 - Rangers of the North */
    {
      'cultural-blessing-name': 'Rois des hommes',
      'cultural-blessing-rules': 'Ajoutez 1 point à un Attribut de votre choix.',
    },
    /* 6 - High Elves of Rivendell */
    {
      'cultural-blessing-name': 'Sage elfique',
      'cultural-blessing-rules': 'Si vous n\'êtes pas Mélancolique, vous pouvez dépenser 1 point d\'Espoir pour obtenir un succès magique sur un jet de compétence. De plus, ajoutez 1 point à un attribut de votre choix.',
    },
    /* 7 - Beornings */
    {
      'cultural-blessing-name': 'Furieux',
      'cultural-blessing-rules': 'Lorsque vous êtes Blessé, tous vos jets d\'attaque et de PROTECTION sont favorisés.',
    },
    /* 8 - Elves of Mirkwood */
    {
      'cultural-blessing-name': 'Les gens du crépuscule',
      'cultural-blessing-rules': 'Lorsque vous êtes dans une forêt, ou la nuit, vous pouvez dépenser 1 point d\'Espoir pour obtenir un succès magique sur un test de compétence.',
    },
    /* 9 - Woodmen of Wilderland */
    {
      'cultural-blessing-name': 'Amateur de bois',
      'cultural-blessing-rules': 'Ajoutez +2 à votre score de Parade lorsque vous combattez dans une forêt.',
    },
    /* 10 - Dwarves of Nogrod and Belegost */
    {
      'cultural-blessing-name': 'Redoutable',
      'cultural-blessing-rules': 'Vous divisez par deux la capacité de Charge de toute armure que vous portez (en arrondissant les fractions à l\'entier supérieur), y compris les casques (mais pas les boucliers).',
    },
    /* 11 - Elves of Lórien */
    {
      'cultural-blessing-name': 'Les hommes-arbres',
      'cultural-blessing-rules': 'Lorsque vous êtes en forêt ou que vous utilisez une Compétence associée à un objet utile, vous pouvez dépenser 1 point d\'Espoir pour obtenir un succès magique. De plus, vous commencez la partie avec 1 objet utile supplémentaire.',
    },
  ],
};
