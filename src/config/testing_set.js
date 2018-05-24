import React from 'react';


const TEXT_intro = <div>
  <p style={{textAlign: 'center'}}>Nasleduje praktické testovanie písania na klávesnici. Prvá sada je ukážková, po nej budú nasledovať 4 testovacie sady. Testovanie spočíva v prepisovaní skupín slov podľa predlohy.</p>
  <ul>
    <li>Na začiatok sa oboznámite s testovačom a prepíšete pár ukážkových viet.</li>
    <li>Ak spravíte chybu, opravte sa. Napísaný text sa musí zhodovať s predlohou.</li>
    <li>Podľa potreby prepínajte medzi rozloženiami klávesnice.</li>
    <li>Píšte vaším prirodzene rýchlym tempom (nie pomaly, ale ani nie neprirodzene rýchlo)</li>
  </ul>
</div>
const TEXT_diacCtrl = <ul>
  <li>Nasleduje merané testovanie</li>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky</li>
  <li>Píšte vaším prirodzene rýchlym tempom (nie pomaly, ale ani nie neprirodzene rýchlo)</li>
</ul>
const TEXT_diacExpr = <ul>
  <li><strong>Prepnite si na slovenské rozloženie klávesnice</strong></li>
  <li>Nasledujúca sada obsahuje slovenské slová s diakritikou</li>
  <li>Píšte vaším prirodzene rýchlym tempom (nie pomaly, ale ani nie neprirodzene rýchlo)</li>
</ul>
const TEXT_codeCtrl = <ul>
  <li><strong>Prepnite si na anglické rozloženie klávesnice</strong></li>
  <li>Sada obsahuje slovenské slová bez diakritiky a symboly z programovacích jazykov</li>
  <li>Píšte vaším prirodzene rýchlym tempom (nie pomaly, ale ani nie neprirodzene rýchlo)</li>
</ul>
const TEXT_codeExpr = <ul>
  <li><strong>V poslednej sade budete rozloženia klávesnice podľa potreby prepínať</strong></li>
  <li>Sada obsahuje slovenské slová s diakritikou a symboly z programovacích jazykov</li>
  <li>Píšte vaším prirodzene rýchlym tempom (nie pomaly, ale ani nie neprirodzene rýchlo)</li>
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
    set: [['Recept vyznam suvislost casopis',
    'Dievca instrukcia Aktivita byvanie',
    'Zmatok kapitola riaditel teoria',
    'Piesen filozofia rozloha matematika',
    'schopnost manazer Jednotka Spolocnost',
    'pamat Aspekt Sposob pribeh',
    'chlieb sloboda Rozhodnutie Univerzita',
    'vysledok rieka atmosfera noviny']]
  },
  diacExpr: {
    name: 'diacExpr',
    title: '2. Sada',
    introduction: TEXT_diacExpr,
    set: [['bývanie inštrukcia Spoločnosť rieka',
    'noviny sloboda riaditeľ matematika',
    'Aspekt Recept pamäť filozofia',
    'Dievča Rozhodnutie súvislosť Jednotka',
    'Pieseň Zmätok Univerzita manažér',
    'atmosféra kapitola príbeh výsledok',
    'chlieb schopnosť teória rozloha',
    'Aktivita význam časopis Spôsob']]
  },
  codeCtrl: {
    name: 'codeCtrl',
    title: '3. Sada',
    introduction: TEXT_codeCtrl,
    set: [["'byvanie' &instrukcia -Spolocnost rieka/",
    '<noviny> $sloboda riaditel: "matematika"',
    '_Aspekt_ Recept* pamat= (filozofia)',
    '!Dievca Rozhodnutie: @suvislost {Jednotka}',
    '-Piesen #Zmatok {Univerzita} $manazer',
    '"atmosfera" <kapitola> @pribeh \\vysledok',
    '+chlieb [schopnost] +teoria rozloha/',
    '_Aktivita_ vyznam; #casopis !Sposob']]
  },
  codeExpr: {
    name: 'codeExpr',
    title: '4. Sada',
    introduction: TEXT_codeExpr,
    set: [['#Zmätok význam; "atmosféra" +chlieb',
    'rieka/ pamäť= _Aktivita_ +teória',
    '-Spoločnosť &inštrukcia <noviny> [schopnosť]',
    '#časopis Recept* rozloha/ @príbeh',
    '(filozofia) @súvislosť !Spôsob riaditeľ:',
    '-Pieseň {Jednotka} "matematika" $manažér',
    "'bývanie' $sloboda Rozhodnutie: {Univerzita}",
    '\\výsledok <kapitola> !Dievča _Aspekt_']]
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