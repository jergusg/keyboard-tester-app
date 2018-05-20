import React from 'react';


const TEXT_intro = <div>
  <p style={{textAlign: 'center'}}>Nasleduje praktické testovanie písania na klávesnici. Prvá sada je ukážková, po nej budú nasledovať 4 testovacie sady. Testovanie spočíva v prepisovaní skupín slov podľa predlohy.</p>
  <ul>
    <li>Na začiatok sa oboznámite s testovačom a prepíšete pár ukážkových viet.</li>
    <li>Ak spravíte chybu, opravte sa. Predloha sa musí zhodovať s napísaným textom.</li>
    <li>Podľa potreby prepínajte medzi rozloženiami klávesnice.</li>
  </ul>
</div>
const TEXT_diacCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritky</li>
</ul>
const TEXT_diacExpr = <ul>
  <li><strong>Nastavte si slovenské rozloženie klávesnice</strong></li>
  <li>Nasledujúca sada obsahuje slovenské slová z predchádzajúcej časti, tentokrát s diakritikou</li>
</ul>
const TEXT_codeCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li></li>
</ul>
const TEXT_codeExpr = <ul>
  <li><strong>V poslednej sade budete rozloženia podľa potreby prepínať</strong></li>
  <li></li>
</ul>

export const testingSets = {
  controlEN: {
    name: 'controlEN',
    introduction: <ul><li><strong>Prepnite si na anglické rozloženie klávesnice.</strong></li><li>Sada obsahuje slovenské slová bez diakritky.</li></ul>,
    set: [['controlEN','dva']]
  },
  controlSW: {
    name: 'controlSW',
    introduction: <ul><li><strong>Nastavte si slovenské rozloženie klávesnice.</strong></li><li>Nasledujúca sada obsahuje slovenské slová z predchádzajúcej časti, tentokrát s diakritikou.</li></ul>,
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
    title: 'Testovanie',
    introduction: TEXT_intro,
    set: [['intro','dva']]
  },
  diacCtrl: {
    name: 'diacCtrl',
    title: '1. Sada',
    introduction: TEXT_diacCtrl,
    set: [['Vyrobca Internet Zena metoda',
    'dieta realita Fyzika recept',
    'Zbierka bahno rieka cigareta',
    'Vedomosti mesiac vyber Jazero']]
  },
  diacExpr: {
    name: 'diacExpr',
    title: '2. Sada',
    introduction: TEXT_diacExpr,
    set: [['Výrobca Internet Žena metóda',
    'dieťa realita Fyzika recept',
    'Zbierka bahno rieka cigareta',
    'Vedomosti mesiac výber Jazero']]
  },
  codeCtrl: {
    name: 'codeCtrl',
    title: '3. Sada',
    introduction: TEXT_codeCtrl,
    set: [["[Zena] recept: &Vedomosti 'dieta'",
    '+Vyrobca $cigareta (Jazero) @vyber',
    'realita* _bahno_ \\rieka Fyzika/',
    '-metoda {Zbierka} <Internet> #mesiac']]
  },
  codeExpr: {
    name: TEXT_codeExpr,
    title: '4. Sada',
    introduction: 'Slovenské rozloženie',
    set: [["[Žena] recept: &Vedomosti 'dieťa'",
    '+Výrobca $cigareta (Jazero) @výber',
    'realita* _bahno_ \\rieka Fyzika/',
    '-metóda {Zbierka} <Internet> #mesiac']]
  },

};