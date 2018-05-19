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

  diacCtrl: {
    name: 'diacCtrl',
    introduction: <ul><li>Prepnite si na <strong>anglické</strong> rozloženie klávesnice.</li><li>Sada obsahuje slovenské slová bez diakritky.</li></ul>,
    set: [['Vyrobca Internet Zena metoda',
    'dieta realita Fyzika recept',
    'Zbierka bahno rieka cigareta',
    'Vedomosti mesiac vyber Jazero']]
  },
  diacExpr: {
    name: 'diacExpr',
    introduction: <ul><li>Nastavte si <strong>slovenské</strong> rozloženie klávesnice.</li><li>Nasledujúca sada obsahuje slovenské slová z predchádzajúcej časti, tentokrát s diakritikou.</li></ul>,
    set: [['Výrobca Internet Žena metóda',
    'dieťa realita Fyzika recept',
    'Zbierka bahno rieka cigareta',
    'Vedomosti mesiac výber Jazero']]
  },
  codeCtrl: {
    name: 'codeCtrl',
    introduction: 'Slovenské rozloženie',
    set: [["[Zena] recept: &Vedomosti 'dieta'",
    '+Vyrobca $cigareta (Jazero) @vyber',
    'realita* _bahno_ \\rieka Fyzika/',
    '-metoda {Zbierka} <Internet> #mesiac']]
  },
  codeExpr: {
    name: 'codeExpr',
    introduction: 'Slovenské rozloženie',
    set: [["[Žena] recept: &Vedomosti 'dieťa'",
    '+Výrobca $cigareta (Jazero) @výber',
    'realita* _bahno_ \\rieka Fyzika/',
    '-metóda {Zbierka} <Internet> #mesiac']]
  },

};