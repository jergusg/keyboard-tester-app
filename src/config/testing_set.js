import React from 'react';


const TEXT_intro = <div>
  <p style={{textAlign: 'center'}}>Nasleduje praktické testovanie písania na klávesnici. Prvá sada je ukážková, po nej budú nasledovať 4 testovacie sady. Testovanie spočíva v prepisovaní skupín slov podľa predlohy.</p>
  <ul>
    <li>Na začiatok sa oboznámite s testovačom a prepíšete pár ukážkových viet.</li>
    <li>Ak spravíte chybu, opravte sa. Napísaný text sa musí zhodovať s predlohou.</li>
    <li>Podľa potreby prepínajte medzi rozloženiami klávesnice.</li>
  </ul>
</div>
const TEXT_diacCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky</li>
</ul>
const TEXT_diacExpr = <ul>
  <li><strong>Prepnite si na slovenské rozloženie klávesnice</strong></li>
  <li>Nasledujúca sada obsahuje slovenské slová s diakritikou</li>
</ul>
const TEXT_codeCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky a symboly z programovacích jazykov</li>
</ul>
const TEXT_codeExpr = <ul>
  <li><strong>V poslednej sade budete rozloženia klávesnice podľa potreby prepínať</strong></li>
  <li>Sada obsahuje slovenské slová s diakritikou a symboly z programovacích jazykov</li>
</ul>

export const testingSets = {

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
    'Vedomosti mesiac vyber Jazero']]
  },
  diacExpr: {
    name: 'diacExpr',
    title: '2. Sada',
    introduction: TEXT_diacExpr,
    set: [['Výrobca Internet Žena metóda',
    'dieťa realita Fyzika recept',
    'Vedomosti mesiac výber Jazero']]
  },
  codeCtrl: {
    name: 'codeCtrl',
    title: '3. Sada',
    introduction: TEXT_codeCtrl,
    set: [["[Zena] recept: &Vedomosti 'dieta'",
    '+Vyrobca $cigareta (Jazero) @vyber',
    '-metoda {Zbierka} <Internet> #mesiac']]
  },
  codeExpr: {
    name: 'codeExpr',
    title: '4. Sada',
    introduction: TEXT_codeExpr,
    set: [["[Žena] recept: &Vedomosti 'dieťa'",
    '+Výrobca $cigareta (Jazero) @výber',
    '-metóda {Zbierka} <Internet> #mesiac']]
  },

};