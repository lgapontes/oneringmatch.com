import React from "react";

export const DE_DE = {
  'menu': {
    'header': {
      'button': {
        'login': 'Login',
        'language': 'Sprache',
      },
    },
  },
  'items': {
    'armour': [
      /* 00 */ 'Lederwams',
      /* 01 */ 'Lederrüstung',
      /* 02 */ 'Kettenhemd',
      /* 03 */ 'Kettenrüstung',
    ],
    'helms': [
      /* 00 */ 'Helm',
    ],
    'shields': [
      /* 00 */ 'Faustschild',
      /* 01 */ 'Schild',
      /* 02 */ 'Großer Schild',
    ],
    'weapons': [
      /* 00 */ 'Dolch',
      /* 01 */ 'Knüppel',
      /* 02 */ 'Keule',
      /* 03 */ 'Kurzschwert',
      /* 04 */ 'Schwert',
      /* 05 */ 'Langschwert',
      /* 06 */ 'Kurzspeer',
      /* 07 */ 'Speer',
      /* 08 */ 'Langspeer',
      /* 09 */ 'Axt',
      /* 10 */ 'Langaxt',
      /* 11 */ 'Zweihandaxt',
      /* 12 */ 'Zweihandhacke',
      /* 13 */ 'Bogen',
      /* 14 */ 'Langbogen',
    ],
    'travelling_gear': [
      /* 00 */ 'Messer zum Häuten von Kaninchen',
      /* 01 */ 'Kästchen Salz zum Kochen',
      /* 02 */ 'Seil mit Greifhaken zum Klettern',
      /* 03 */ 'Windgeschützte Laterne',
      /* 04 */ 'Fremdländisches Musikinstrument',
      /* 05 */ 'Schmerzstillende Salbe',
      /* 06 */ 'Satz teurer Kleidung',
      /* 07 */ 'Perlenohrringe',
      /* 08 */ 'Krafteinflößender Trank',
      /* 09 */ 'Sonnenstein für die Wegfindung bei schlechtem Wetter',
      /* 10 */ 'Schöne Pfeife für die Behaglichkeit',
      /* 11 */ 'Satz ausführlicher Landkarten',
      /* 12 */ 'Werkzeugsatz zur Steinbearbeitung',
      /* 13 */ 'Feuerstein und Fackel',
      /* 14 */ 'Fischernetz',
      /* 15 */ 'Gedichtband',
      /* 16 */ 'Schriftrollen aus der Bibliothek in Gondor',
      /* 17 */ 'Athelas, das Königskraut',
      /* 18 */ 'Liebliche Flöte',
      /* 19 */ 'Lavendel-Blütenblätter',
      /* 20 */ 'Nähnadel und -faden',
      /* 21 */ 'Werkzeuge für Holzbearbeitung',
      /* 22 */ 'Ring mit personalisiertem Siegel',
      /* 23 */ 'Elbenumhang',
      /* 24 */ 'Kriegshorn',
    ],
  },
  'ponies_and_horses': [
    /* 00 */ 'Altes Pferd',
    /* 01 */ 'Halbverhungertes Pony',
    /* 02 */ 'Annehmbares Pferd',
    /* 03 */ 'Annehmbares Pony',
    /* 04 */ 'Herrliches Pferd',
    /* 05 */ 'Herrliches Pony',
  ],
  'sheet': {
    'character-sheet': {
      'name': 'name',
      'heroic-culture': 'Heldenhafte Kultur',
      'heroic-cultures': [
        'Bardinger',
        'Zwerge aus Durins Volk',
        'Elben aus Lindon',
        'Hobbits aus dem Auenland',
        'Menschen aus Bree',
        'Waldläufer des Nordens',
        'Hochelben aus Bruchtal',
        'Beorninger',
        'Elben aus dem Düsterwald',
        'Waldmenschen aus Wilderland',
        'Zwerge de Nogrod et Belegost',
        'Elben von Lórien',
      ],
      'calling': 'Berufung',
      'callings': [
        'Befehlshaber',
        'Streiter',
        'Bote',
        'Gelehrter',
        'Schatzsucher',
        'Hüter',
      ],
      'cultural-blessing': 'Kulturelle Gabe',
      'cultural-blessing-rules': 'Regeln des Kulturelle Gabe',
      'standard-of-living': 'Lebensstandard',
      'starting_treasure_rating': 'Beginn der Schatzbewertung',
      'treasure': 'Schatz',
      'age': 'Alter',
      'age-suggestion': 'Vorschlag',
      'standards-of-living': [
        'Arm',
        'Bescheiden',
        'Gewöhnlich',
        'Wohlhabend',
        'Reich',
        'Sehr Reich',
      ],
    },
  },

  'heroic-cultures': [
    /* 0 - Bardings */
    {
      'cultural-blessing-name': 'Beherzt',
      'cultural-blessing-rules': 'Würfe auf TAPFERKEIT sind Bevorzugt.',
    },
    /* 1 - Dwarves of Durin's Folk */
    {
      'cultural-blessing-name': 'Zweifellos',
      'cultural-blessing-rules': 'Sie halbieren die Belastung aller Rüstungen, die Sie tragen (Bruchteile werden aufgerundet), einschließlich Helme (aber nicht Schilde).',
    },
    /* 2 - Elves of Lindon */
    {
      'cultural-blessing-name': 'Elfen-Fähigkeit',
      'cultural-blessing-rules': 'Wenn Sie nicht Verzweifelt sind, können Sie 1 Punkt Hoffnung ausgeben, um bei einem Wurf einen Magischen Erfolg zu erzielen, wenn Sie eine Fertigkeit verwenden, in der Sie mindestens einen Punkt besitzen.',
    },
    /* 3 - Hobbits of the Shire */
    {
      'cultural-blessing-name': 'Hobbit scythe',
      'cultural-blessing-rules': 'Ihre Würfe auf WEISHEIT sind Bevorzugt und Sie erhalten +1W bei allen Schattentests, die Sie durchführen, um den Auswirkungen von Gier zu widerstehen.',
    },
    /* 4 - Men of Bree */
    {
      'cultural-blessing-name': 'Bree-Blut',
      'cultural-blessing-rules': 'Jeder Mann aus Bree in der Kompanie erhöht die Gefährtenpunkt um 1 Punkt.',
    },
    /* 5 - Rangers of the North */
    {
      'cultural-blessing-name': 'Könige der Menschen',
      'cultural-blessing-rules': 'Fügen Sie einem Attribut Ihrer Wahl 1 Punkt hinzu.',
    },
    /* 6 - High Elves of Rivendell */
    {
      'cultural-blessing-name': 'Elfisch',
      'cultural-blessing-rules': 'Wenn Sie nicht Verzweifelt sind, können Sie 1 Punkt Hoffnung ausgeben, um einen Magischen Erfolg bei einem Fertigkeitswurf zu erzielen. Zusätzlich kannst du 1 Punkt zu einem Attribut deiner Wahl hinzufügen.',
    },
    /* 7 - Beornings */
    {
      'cultural-blessing-name': 'Wütend',
      'cultural-blessing-rules': 'Wenn Sie Verwundet sind, werden alle Ihre Angriffs- und SCHUTZ-Würfe Bevorzugt.',
    },
    /* 8 - Elves of Mirkwood */
    {
      'cultural-blessing-name': 'Volk der Dämmerung',
      'cultural-blessing-rules': 'Wenn Sie sich in einem Wald oder nachts befinden, können Sie 1 Punkt Hoffnung ausgeben, um bei einem Fertigkeitswurf einen Magischen Erfolg zu erzielen.',
    },
    /* 9 - Woodmen of Wilderland */
    {
      'cultural-blessing-name': 'Waldgänger',
      'cultural-blessing-rules': 'Fügen Sie Ihrer Parade +2 hinzu, wenn Sie in einem Wald kämpfen.',
    },
    /* 10 - Dwarves of Nogrod and Belegost */
    {
      'cultural-blessing-name': 'Zweifellos',
      'cultural-blessing-rules': 'Sie halbieren die Belastung aller Rüstungen, die Sie tragen (Bruchteile werden aufgerundet), einschließlich Helme (aber nicht Schilde).',
    },
    /* 11 - Elves of Lórien */
    {
      'cultural-blessing-name': 'Baummenschen',
      'cultural-blessing-rules': 'Wenn du im Wald bist oder eine Fertigkeit verwendest, die mit einem nützlichen Gegenstand verbunden ist, gib 1 Hoffnung auf magischen Erfolg aus. Außerdem beginnst du das Spiel mit einem weiteren nützlichen Gegenstand.',
    },
  ],
};
