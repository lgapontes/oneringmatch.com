import React from "react";

export const PT_BR = {
  'menu': {
    'header': {
      'button': {
        'login': 'Entrar',
        'language': 'Idioma',
      },
    },
  },
  'items': {
    'armour': [
      /* 00 */ 'Camisa de Couro',
      /* 01 */ 'Colete de Couro',
      /* 02 */ 'Camisa de Malha',
      /* 03 */ 'Cota de Malha',
    ],
    'helms': [
      /* 00 */ 'Elmo',
    ],
    'shields': [
      /* 00 */ 'Broquel',
      /* 01 */ 'Escudo',
      /* 02 */ 'Escudo Grande',
    ],
    'weapons': [
      /* 00 */ 'Adaga',
      /* 01 */ 'Bordão',
      /* 02 */ 'Tacape',
      /* 03 */ 'Espada Curta',
      /* 04 */ 'Espada',
      /* 05 */ 'Espada Longa',
      /* 06 */ 'Lança Curta',
      /* 07 */ 'Lança',
      /* 08 */ 'Lança Longa',
      /* 09 */ 'Machado',
      /* 10 */ 'Machado de Haste Longa',
      /* 11 */ 'Machado Grande',
      /* 12 */ 'Picareta',
      /* 13 */ 'Arco',
      /* 14 */ 'Arco Grande',
    ],
    'travelling_gear': [
      /* 00 */ 'Faca para esfolar coelhos',
      /* 01 */ 'Sal para cozinhar',
      /* 02 */ 'Corda com gancho para escalar',
      /* 03 */ 'Lanterna à prova de vento',
      /* 04 */ 'Instrumento musical exótico',
      /* 05 */ 'Bálsamo para aliviar a dor',
      /* 06 */ 'Terno de roupas caras',
      /* 07 */ 'Brincos de pérola',
      /* 08 */ 'Licor para infundir força',
      /* 09 */ 'Pedra do Sol para navegar com mau tempo',
      /* 10 */ 'Cachimbo fino para encontrar conforto',
      /* 11 */ 'Conjunto detalhado de mapas',
      /* 12 */ 'Ferramentas para esculpir pedra',
      /* 13 */ 'Pederneira e tocha',
      /* 14 */ 'Rede de pesca',
      /* 15 */ 'Livro de poesias',
      /* 16 */ 'Pergaminhos da biblioteca de Gondor',
      /* 17 */ 'Athelas, a Folha-do-Rei',
      /* 18 */ 'Flauta doce',
      /* 19 */ 'Pétalas de lavanda',
      /* 20 */ 'Linha e agulha de costura',
      /* 21 */ 'Ferramentas de marcenaria',
      /* 22 */ 'Anel com selo personalizado',
      /* 23 */ 'Manto élfico',
      /* 24 */ 'Corneta de Batalha',
    ],
  },
  'ponies_and_horses': [
    /* 00 */ 'Cavalo velho',
    /* 01 */ 'Pônei desnutrido',
    /* 02 */ 'Um bom cavalo',
    /* 03 */ 'Um bom pônei',
    /* 04 */ 'Um ótimo cavalo',
    /* 05 */ 'Um ótimo pônei',
  ],
  'sheet': {
    'character-sheet': {
      'name': 'nome',
      'heroic-culture': 'Cultura Heróica',
      'heroic-cultures': [
        'Bardings',
        'Anãos do Povo de Durin',
        'Elfos de Lindon',
        'Hobbits do Condado',
        'Homens de Bri',
        'Guardiões do Norte',
        'Altos Elfos de Valfenda',
        'Beornings',
        'Elfos da Floresta das Trevas',
        'Lenhadores de Wilderland',
        'Anãos de Nogrod e Belegost',
        'Elfos de Lórien',
      ],
      'calling': 'Vocação',
      'callings': [
        'Capitão',
        'Campeão',
        'Mensageiro',
        'Estudioso',
        'Caçador de Tesouros',
        'Guardião',
      ],
      'cultural-blessing': 'Bênção Cultural',
      'cultural-blessing-rules': 'Regras da Bênção Cultural',
      'standard-of-living': 'Padrão de Vida',
      'starting_treasure_rating': 'Padrão de Vida Inicial',
      'treasure': 'Tesouro',
      'age': 'Idade',
      'age-suggestion': 'Sugestão',
      'standards-of-living': [
        'Pobre',
        'Frugal',
        'Comum',
        'Próspero',
        'Rico',
        'Muito Rico',
      ],
    },
  },

  'heroic-cultures': [
    /* 0 - Bardings */
    {
      'cultural-blessing-name': 'Coração Forte',
      'cultural-blessing-rules': 'Suas jogadas de VALOR são Favorecidas.',
    },
    /* 1 - Dwarves of Durin's Folk */
    {
      'cultural-blessing-name': 'Formidável',
      'cultural-blessing-rules': 'Você reduz pela metade a capacidade de Carga de qualquer armadura que estiver usando (arredondando as frações para cima), incluindo elmos (mas não escudos).',
    },
    /* 2 - Elves of Lindon */
    {
      'cultural-blessing-name': 'Perícia Élfica',
      'cultural-blessing-rules': 'Se você não estiver Arrasado, você pode gastar 1 ponto de Esperança para obter um Sucesso Mágico em uma jogada ao usar uma Habilidade na qual você possua pelo menos um ponto.',
    },
    /* 3 - Hobbits of the Shire */
    {
      'cultural-blessing-name': 'Bom-senso Hobbit',
      'cultural-blessing-rules': 'Suas jogadas de SABEDORIA são Favorecidas, e você ganha (1d) em todas jogadas de Sombra feitos para resistir aos efeitos da Ganância.',
    },
    /* 4 - Men of Bree */
    {
      'cultural-blessing-name': 'Sangue de Bri',
      'cultural-blessing-rules': 'Cada Homem de Bree na Companhia aumenta a Nível da Sociedade em 1 ponto.',
    },
    /* 5 - Rangers of the North */
    {
      'cultural-blessing-name': 'Reis dos Homens',
      'cultural-blessing-rules': 'Adicione 1 ponto a um Atributo de sua escolha.',
    },
    /* 6 - High Elves of Rivendell */
    {
      'cultural-blessing-name': 'Elfo Sábio',
      'cultural-blessing-rules': 'Se você não estiver Arrasado, pode gastar 1 ponto de Esperança para obter um Sucesso Mágico em um teste de perícia. Além disso, adicione 1 ponto a um Atributo de sua escolha.',
    },
    /* 7 - Beornings */
    {
      'cultural-blessing-name': 'Furioso',
      'cultural-blessing-rules': 'Quando você estiver Ferido, todos os seus testes de Ataque e PROTEÇÃO serão Favorecidos.',
    },
    /* 8 - Elves of Mirkwood */
    {
      'cultural-blessing-name': 'Povo do Crepúsculo',
      'cultural-blessing-rules': 'Quando estiver em uma floresta ou à noite, você pode gastar 1 ponto de Esperança para obter um Sucesso Mágico em uma jogada de Perícia.',
    },
    /* 9 - Woodmen of Wilderland */
    {
      'cultural-blessing-name': 'Lenhador',
      'cultural-blessing-rules': 'Adicione +2 à pontuação de Bloqueio ao lutar em uma floresta.',
    },
    /* 10 - Dwarves of Nogrod and Belegost */
    {
      'cultural-blessing-name': 'Formidável',
      'cultural-blessing-rules': 'Você reduz pela metade a capacidade de Carga de qualquer armadura que estiver usando (arredondando as frações para cima), incluindo elmos (mas não escudos).',
    },
    /* 11 - Elves of Lórien */
    {
      'cultural-blessing-name': 'Pessoas das Árvores',
      'cultural-blessing-rules': 'Quando estiver em uma floresta, ou ao usar uma Habilidade associada a um Item Útil, você pode gastar 1 ponto de Esperança para obter um Sucesso Mágico. Além disso, você começa o jogo com mais 1 Item Útil.',
    },
  ],
};
