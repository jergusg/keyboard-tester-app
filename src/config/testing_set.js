import React from 'react';

export const testingSets = {
  controlEN: {
    name: 'controlEN',
    introduction: <ul><li>Prepnite si na <strong>anglické</strong> rozloženie klávesnice.</li><li>Sada obsahuje slovenské slová bez diakritky.</li></ul>,
    set: [['controlEN','dva']]
  },
  controlSW: {
    name: 'controlSW',
    introduction: <ul><li>Nastavte si <strong>slovenské</strong> rozloženie klávesnice.</li><li>Nasledujúca sada obsahuje slovenské slová z predchádzajúcej časti, tentokrát s diakritikou.</li></ul>,
    set: [['controlSW','dva']]
  },
  experimentEN: {
    name: 'experimentEN',
    introduction: 'Slovenské rozloženie',
    set: []
  },
  experimentSW: {
    name: 'experimentSW',
    introduction: 'Slovenské rozloženie',
    set: []
  },
  intro: {
    name: 'intro',
    introduction: <ul><li>Na začiatok sa oboznámite s testovačom. Prepíšete pár ukážkových viet.</li></ul>,
    set: [['intro','dva']]
  },

  slovak1: {
    name: 'slovak1',
    introduction: 'Slovenské rozloženie',
    set: [[
  'job-mud plastic-responsibility',
  'few+extreme section-currency',
  'husband+ruin news "foundation"',
  'hour? scratch/slip bit;',
  'supermarket transition; conversation-inspector',
  '"length" understanding; "context" (inspection)',
  '"cow" pay-comment nature?',
  '(background) afternoon/jump outcome:',
      ],
      [
  'finance (presentation) repeat-policy',
  'recognition+emphasis bus+serve',
  'friendship+fire historian_assumption',
  'psychology; reach; sign/request',
  'place/ladder government_video',
  'possibility/pattern "clue" tax?',
  'question=egg finish: (black)',
  'language? (lead) father? (high)'
    ]]
  },

  english1: {
    name: 'english1',
    introduction: 'Anglické rozloženie',
    set: [[
    '"affair" miss-guess spread?',
    'resident_paint "reference" sweet!',
    'forever-wish association "leg"',
    'combine; (mud) emphasis? fat',
    'college_community nothing "problem"',
    'cap_suggestion selection-vast',
    'habit+source (buy) boot!',
    'simple: (tomorrow) rest! lab!'
    ],
    [
    'light_station cancer; "dance"',
    'advertising: competition affair: second',
    'wheel! proof; "recognition" bill:',
    '(wonder) pattern! many/spirit',
    '"bath" music; (routine) shake:',
    'client=regular (contract) "atmosphere"',
    'tourist! daughter/efficiency replacement:',
    'protection! private_football (dead)'
    ]]
  },

  alternating1: {
    name: 'alternating1',
    introduction: 'Strieda sa slovenské a anglické rozloženie',
    set: [
['(departure) "beautiful" (board) oven!', 'test: friend/actor boring?'],
['limit! representative: passenger_diamond', 'designer/chocolate housing: (swing)'],
['"board" page? mud: strength', 'result; signal_dimension model?'],
['dump: drop: side+proof', 'friend! major=swing flight!'],
['theme_angle suggestion; maximum:', '(price) pass_standard (substance)'],
['honey: singer! "death" steak', 'disaster=relationship black? (specialist)'],
['still_gap hurry! start?', 'enthusiasm_calendar sell case'],
['scheme/cake gain=switch', '(table) stuff: analysis: extreme'],
['remove_prize remove! feel!', 'drive-towel nation-clock'],
['replacement_tour tap-shame', 'drawer! improvement_street tie:'],
    ]
  },
};