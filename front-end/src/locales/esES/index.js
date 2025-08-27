import React from "react";

export const ES_ES = {
  'menu': {
    'header': {
      'button': {
        'login': 'Acceso',
        'language': 'Idioma',
      },
    },
  },
  'items': {
    'armour': [
      /* 00 */ 'Coleto de Cuero',
      /* 01 */ 'Jubón de Cuero',
      /* 02 */ 'Camisote de Malla',
      /* 03 */ 'Cota de Malla',
    ],
    'helms': [
      /* 00 */ 'Casco',
    ],
    'shields': [
      /* 00 */ 'Rodela',
      /* 01 */ 'Escudo',
      /* 02 */ 'Escudo Pavés',
    ],
    'weapons': [
      /* 00 */ 'Daga',
      /* 01 */ 'Porra',
      /* 02 */ 'Clava',
      /* 03 */ 'Espada Corta',
      /* 04 */ 'Espada',
      /* 05 */ 'Espada Larga',
      /* 06 */ 'Lanza Corta',
      /* 07 */ 'Lanza',
      /* 08 */ 'Lanza Larga',
      /* 09 */ 'Hacha',
      /* 10 */ 'Hacha de Mango Largo',
      /* 11 */ 'Gran Hacha',
      /* 12 */ 'Piqueta',
      /* 13 */ 'Arco',
      /* 14 */ 'Arco Largo',
    ],
    'travelling_gear': [
      /* 00 */ 'Cuchillo para desollar conejos',
      /* 01 */ 'Cajita de sal para cocinar',
      /* 02 */ 'Cuerda con gancho para escalar',
      /* 03 */ 'Farol a prueba de viento',
      /* 04 */ 'Instrumento musical exótico',
      /* 05 */ 'Bálsamo para aliviar el dolor',
      /* 06 */ 'Traje de ropa cara',
      /* 07 */ 'Pendientes de perlas',
      /* 08 */ 'Licor para dar fuerza',
      /* 09 */ 'Piedra solar para navegar con mal tiempo',
      /* 10 */ 'Pipa elegante para conseguir bienestar',
      /* 11 */ 'Juego de mapas detallados',
      /* 12 */ 'Juego de instrumentos para tallar piedra',
      /* 13 */ 'Pedernal y antorcha',
      /* 14 */ 'Red de pesca',
      /* 15 */ 'Libro de poesía',
      /* 16 */ 'Pergaminos de la biblioteca de Gondor',
      /* 17 */ 'Athelas, las hojas de reyes',
      /* 18 */ 'Flauta dulce',
      /* 19 */ 'Pétalos de lavanda',
      /* 20 */ 'Aguja e hilo de coser',
      /* 21 */ 'Herramientas para trabajar la madera',
      /* 22 */ 'Anillo con un sello personalizado',
      /* 23 */ 'Capa élfica',
      /* 24 */ 'Cuerno de batalla',
    ],
  },
  'ponies_and_horses': [
    /* 00 */ 'Caballo Viejo',
    /* 01 */ 'Poni medio muerto de hambre',
    /* 02 */ 'Caballo Decente',
    /* 03 */ 'Poni Decente',
    /* 04 */ 'Buen Caballo',
    /* 05 */ 'Buen Poni',
  ],
  'sheet': {
    'character-sheet': {
      'name': 'nombre',
      'heroic-culture': 'Cultura Heroica',
      'heroic-cultures': [
        'Hombres de Bardo',
        'Enanos del Pueblo de Durin',
        'Elfos de Lindon',
        'Hobbits de la Comarca',
        'Hombres de Bree',
        'Montaraces del Norte',
        'Altos Elfos de Rivendel',
        'Beórnidas',
        'Elfos del Bosque Negro',
        'Hombres del Bosque de las Tierras Ásperas',
        'Enanos de Nogrod y Belegost',
        'Elfos del Lórien',
      ],
      'calling': 'Ocupación',
      'callings': [
        'Capitán',
        'Campeón',
        'Mensajero',
        'Erudito',
        'Buscador de Tesoros',
        'Guardián',
      ],
      'cultural-blessing': 'Bendición Cultural',
      'cultural-blessing-rules': 'Reglas de Bendición Cultural',
      'standard-of-living': 'Nivel de vida',
      'starting_treasure_rating': 'Calificación de Riqueza inicial',
      'treasure': 'Riqueza',
      'age': 'Edad',
      'age-suggestion': 'Sugerencia',
      'standards-of-living': [
        'Pobre',
        'Frugal',
        'Común',
        'Próspero',
        'Rico',
        'Muy Rico',
      ],
    },
  },

  'heroic-cultures': [
    /* 0 - Bardings */
    {
      'cultural-blessing-name': 'Valiente de corazón',
      'cultural-blessing-rules': 'Tus tiradas de VALOR son favorecidas.',
    },
    /* 1 - Dwarves of Durin's Folk */
    {
      'cultural-blessing-name': 'Temible',
      'cultural-blessing-rules': 'Reduces a la mitad la capacidad de Carga de cualquier armadura que lleves puesta (redondeando las fracciones hacia arriba), incluidos los cascos (pero no los escudos).',
    },
    /* 2 - Elves of Lindon */
    {
      'cultural-blessing-name': 'Habilidad élfica',
      'cultural-blessing-rules': 'Si no eres Desanimado, puedes gastar 1 punto de Esperanza para lograr un Éxito Mágico en una tirada cuando uses una Habilidad en la que poseas al menos un punto.',
    },
    /* 3 - Hobbits of the Shire */
    {
      'cultural-blessing-name': 'Sentido hobbit',
      'cultural-blessing-rules': 'Tus tiradas de SABIDURÍA son favorecidas y ganas +1d en todas Pruebas de Sombra realizadas para resistir los efectos de la Avaricia.',
    },
    /* 4 - Men of Bree */
    {
      'cultural-blessing-name': 'Sangre de Bree',
      'cultural-blessing-rules': 'Cada Hombre de Bree en la Comunidad aumenta la Puntuación de Comunidad en 1 punto.',
    },
    /* 5 - Rangers of the North */
    {
      'cultural-blessing-name': 'Reyes de los hombres',
      'cultural-blessing-rules': 'Añade 1 punto a un Atributo de tu elección.',
    },
    /* 6 - High Elves of Rivendell */
    {
      'cultural-blessing-name': 'Sabio élfico',
      'cultural-blessing-rules': 'Si no eres Desanimado, puedes gastar 1 punto de Esperanza para lograr un Éxito Mágico en una tirada de habilidad. Además, suma 1 punto a un Atributo de tu elección.',
    },
    /* 7 - Beornings */
    {
      'cultural-blessing-name': 'Furioso',
      'cultural-blessing-rules': 'Cuando estás Herido, todas tus tiradas de Ataque y de PROTECCIÓN son Favorecidas.',
    },
    /* 8 - Elves of Mirkwood */
    {
      'cultural-blessing-name': 'Gente del anochecer',
      'cultural-blessing-rules': 'Cuando estás en un bosque, o de noche, puedes gastar 1 punto de Esperanza para lograr un Éxito Mágico en una tirada de habilidad.',
    },
    /* 9 - Woodmen of Wilderland */
    {
      'cultural-blessing-name': 'Asistente de madera',
      'cultural-blessing-rules': 'Añade +2 a tu puntuación de Parada cuando luches en un bosque.',
    },
    /* 10 - Dwarves of Nogrod and Belegost */
    {
      'cultural-blessing-name': 'Temible',
      'cultural-blessing-rules': 'Reduces a la mitad la capacidad de Carga de cualquier armadura que lleves puesta (redondeando las fracciones hacia arriba), incluidos los cascos (pero no los escudos).',
    },
    /* 11 - Elves of Lórien */
    {
      'cultural-blessing-name': 'Gente de los árboles',
      'cultural-blessing-rules': 'Cuando estés en un bosque o uses una habilidad asociada a un objet utile, puedes gastar 1 punto de Esperanza para lograr un Éxito Mágico. Además, comienzas la partida con 1 objet utile más.',
    },
  ],
};
