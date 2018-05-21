import React from 'react';


const TEXT_intro = <div>
  <p style={{textAlign: 'center'}}>Nasleduje praktické testovanie písania na klávesnici. Prvá sada je ukážková, po nej budú nasledovať 4 testovacie sady. Testovanie spočíva v prepisovaní skupín slov podľa predlohy.</p>
  <ul>
    <li>Na začiatok sa oboznámite s testovačom a prepíšete pár ukážkových viet.</li>
    <li>Ak spravíte chybu, opravte sa. Napísaný text sa musí zhodovať s predlohou.</li>
    <li>Podľa potreby prepínajte medzi rozloženiami klávesnice.</li>
    <li>Píšte vaším prirodzene rýchlym tempom. Nie pomaly, ale ani nie prehnane rýchlo.</li>
  </ul>
</div>
const TEXT_diacCtrl = <ul>
  <li>Nasleduje merané testovanie</li>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky</li>
  <li>Píšte vaším prirodzene rýchlym tempom. Nie pomaly, ale ani nie prehnane rýchlo.</li>
</ul>
const TEXT_diacExpr = <ul>
  <li><strong>Prepnite si na slovenské rozloženie klávesnice</strong></li>
  <li>Nasledujúca sada obsahuje slovenské slová s diakritikou</li>
  <li>Píšte vaším prirodzene rýchlym tempom. Nie pomaly, ale ani nie prehnane rýchlo.</li>
</ul>
const TEXT_codeCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky a symboly z programovacích jazykov</li>
  <li>Píšte vaším prirodzene rýchlym tempom. Nie pomaly, ale ani nie prehnane rýchlo.</li>
</ul>
const TEXT_codeExpr = <ul>
  <li><strong>V poslednej sade budete rozloženia klávesnice podľa potreby prepínať</strong></li>
  <li>Sada obsahuje slovenské slová s diakritikou a symboly z programovacích jazykov</li>
  <li>Píšte vaším prirodzene rýchlym tempom. Nie pomaly, ale ani nie prehnane rýchlo.</li>
</ul>

export const testingSets = {

  intro: {
    name: 'intro',
    title: 'Testovanie',
    introduction: TEXT_intro,
    set: [['vedomosti Internet Jazero dieťa',
    'Preprava <fotografie> futbal !literatura',
    'Video #Bezpecnost "zranenia" Odpoveď',
    '\\editor Čítanie= vnímanie udrzba']]
  },
  diacCtrl: {
    name: 'diacCtrl',
    title: '1. Sada',
    introduction: TEXT_diacCtrl,
    set: [['iniciativa univerzita efektivnost Rieka',
    'chlieb Riaditel Matematika Kosik',
    'Vyznam Pamat Byvanie prehravac',
    'vysledok organizacia vysvetlenie recept',
    'Kapitola Kreslenie aspekt aktivita',
    'suvislost Jednotka casopis filozofia',
    'sposob teoria zmatok spolocnost',
    'system noviny manazer piesen',
    'sloboda instrukcia Dievca rozloha',
    'schopnost Pribeh Rozhodnutie atmosfera']]
  },
  diacExpr: {
    name: 'diacExpr',
    title: '2. Sada',
    introduction: TEXT_diacExpr,
    set: [['prehrávač inštrukcia spoločnosť atmosféra',
    'filozofia Kapitola Rieka recept',
    'Rozhodnutie Jednotka zmätok rozloha',
    'Dievča systém vysvetlenie univerzita',
    'časopis Príbeh pieseň aspekt',
    'Význam iniciatíva schopnosť organizácia',
    'spôsob chlieb Matematika Bývanie',
    'Pamäť Košík Riaditeľ súvislosť',
    'sloboda manažér výsledok noviny',
    'teória aktivita efektívnosť Kreslenie']]
  },
  codeCtrl: {
    name: 'codeCtrl',
    title: '3. Sada',
    introduction: TEXT_codeCtrl,
    set: [['{Matematika} [suvislost] manazer/ \\aktivita',
    "(Dievca) -vysvetlenie Pribeh/ 'spolocnost'",
    '-Kosik +system Kapitola= #Pamat',
    "$instrukcia 'prehravac' <aspekt> _sloboda_",
    '+efektivnost &Rozhodnutie "piesen" _Riaditel_',
    'schopnost: &noviny univerzita= @teoria',
    '[organizacia] {recept} iniciativa* rozloha*',
    '#vysledok casopis; <Kreslenie> !Vyznam',
    '\\filozofia (Byvanie) "zmatok" $sposob',
    '!Rieka atmosfera: @chlieb Jednotka;']]
  },
  codeExpr: {
    name: 'codeExpr',
    title: '4. Sada',
    introduction: TEXT_codeExpr,
    set: [['-Košík "pieseň" časopis; $spôsob',
    '_sloboda_ !Význam [organizácia] atmosféra:',
    '\\aktivita iniciatíva* +systém #Pamäť',
    '<aspekt> univerzita= Kapitola= @chlieb',
    '\'spoločnosť\' rozloha* "zmätok" {Matematika}',
    '+efektívnosť @teória Príbeh/ $inštrukcia',
    "\\filozofia Jednotka; 'prehrávač' <Kreslenie>",
    '[súvislosť] {recept} schopnosť: _Riaditeľ_',
    '!Rieka &noviny #výsledok -vysvetlenie',
    'manažér/ (Bývanie) &Rozhodnutie (Dievča)']]
  },


  T_diacCtrl: {
    name: 'diacCtrl',
    title: '1. Sada',
    introduction: TEXT_diacCtrl,
    set: [['Vyrobca Internet Zena metoda',
    'dieta realita Fyzika recept',
    'Vedomosti mesiac vyber Jazero']]
  },
  T_diacExpr: {
    name: 'diacExpr',
    title: '2. Sada',
    introduction: TEXT_diacExpr,
    set: [['Výrobca Internet Žena metóda',
    'dieťa realita Fyzika recept',
    'Vedomosti mesiac výber Jazero']]
  },
  T_codeCtrl: {
    name: 'codeCtrl',
    title: '3. Sada',
    introduction: TEXT_codeCtrl,
    set: [["[Zena] recept: &Vedomosti 'dieta'",
    '+Vyrobca $cigareta (Jazero) @vyber',
    '-metoda {Zbierka} <Internet> #mesiac']]
  },
  T_codeExpr: {
    name: 'codeExpr',
    title: '4. Sada',
    introduction: TEXT_codeExpr,
    set: [["[Žena] recept: &Vedomosti 'dieťa'",
    '+Výrobca $cigareta (Jazero) @výber',
    '-metóda {Zbierka} <Internet> #mesiac']]
  },

};