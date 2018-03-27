export const testingSet = {
  warmup: [
    [
      "Jako hrom, jejž pravice Perounova",
      "Na giganty vymerštila zlé,",
      "Tak pádi pryč časové a zas nová",
      "Uhne času tvář, jde v stánky tvé.",
    ],
    [
      '<ul><li class="Done">Hrušky</li>',
      '<li class="Todo">Petržlenová vňať</li>',
      '<li class="Deleted">Šošovica, Sója, Fazuľa</li>',
      '<li class="Done">Šalát</li></ul>',
    ],
    [
      '### Zvieratá a rastliny ###',
      '+ Medveď hnedý - *Brown bear*',
      '+ Ďateľ veľký - *Great spotted woodpecker*',
      '+ Vŕba biela - *White willow*',
      '+ Pŕhľava dvojdomá - *Common Nettle*',
    ]
  ],
  real: [
    [
      "Zakvitlé vŕby milo dýchajú",
      "vône večernej čerstvoty,",
      "blízke obloky dnu ich volajú",
      "do devy peknej samoty;",
      "tam ona stojí nad tichou strunou,",
      "hľadí do svetlých nebies čalúnov",
      "cez biele okna záclony:",
      // "Vtom pekné údy k sedadlu skloní,",
      // "ľúbezná struna čisto zazvoní,",
      // "hlas jej sa hne medzi tóny:",
    ],
    [
      '<ul><li class="Done">Hrušky</li>',
      '<li class="Todo">Petržlenová vňať</li>',
      // '<li class="Deleted">Šošovica</li>',
      // '<li class="Done">Šalát</li></ul>',
    ],
    [
      '### Zvieratá a rastliny ###',
      '+ Medveď hnedý - *Brown bear*',
      // '+ Ďateľ veľký - *Great spotted woodpecker*',
      // '+ Vŕba biela - *White willow*',
      // '+ Pŕhľava dvojdomá - *Common Nettle*',
    ]
  ]
};

export const WARMUP_ROUNDS_NUM = testingSet.warmup.length;
export const REAL_ROUNDS_NUM = testingSet.real.length;