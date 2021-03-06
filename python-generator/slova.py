# -*- coding: utf-8 -*-
from unidecode import unidecode
import numpy as np

slova = ['ľudia',
 'história',
 'spôsob',
 'umenie',
 'svet',
 'informácie',
 'mapa',
 'dva',
 'rodina',
 'vláda',
 'zdravie',
 'systém',
 'počítač',
 'mäso',
 'rok',
 'vďaka',
 'hudba',
 'človek',
 'čítanie',
 'metóda',
 'dáta',
 'jedlo',
 'porozumenie',
 'teória',
 'zákon',
 'vták',
 'literatúra',
 'problém',
 'softvér',
 'ovládanie',
 'vedomosti',
 'moc',
 'schopnosť',
 'ekonómie',
 'milovať',
 'internet',
 'televízia',
 'veda',
 'knižnica',
 'príroda',
 'skutočnosť',
 'výrobok',
 'nápad',
 'teplota',
 'investície',
 'rozloha',
 'spoločnosť',
 'aktivita',
 'príbeh',
 'priemysel',
 'médiá',
 'vec',
 'rúra',
 'spoločenstvo',
 'definícia',
 'bezpečnosť',
 'kvalita',
 'vývoj',
 'jazyk',
 'management',
 'prehrávač',
 'odroda',
 'video',
 'týždeň',
 'zabezpečenia',
 'krajina',
 'skúška',
 'film',
 'organizácie',
 'zariadenie',
 'fyzika',
 'analýza',
 'politika',
 'séria',
 'myšlienka',
 'základ',
 'priateľ',
 'smer',
 'stratégia',
 'technológie',
 'armáda',
 'fotoaparát',
 'sloboda',
 'papier',
 'prostredie',
 'dieťa',
 'inštancie',
 'mesiac',
 'pravda',
 'marketing',
 'univerzita',
 'písanie',
 'článok',
 'oddelenie',
 'rozdiel',
 'cieľ',
 'správy',
 'publikum',
 'rybárčenie',
 'rast',
 'príjem',
 'manželstvo',
 'užívateľ',
 'kombinácie',
 'zlyhanie',
 'zmysel',
 'lekárstvo',
 'filozofia',
 'učiteľ',
 'komunikácia',
 'nočné',
 'chémia',
 'choroba',
 'disk',
 'energia',
 'národ',
 'cesta',
 'role',
 'polievka',
 'reklama',
 'umiestnenia',
 'úspech',
 'pridanie',
 'byt',
 'vzdelanie',
 'matematika',
 'moment',
 'maľba',
 'politika',
 'pozornosť',
 'rozhodnutie',
 'udalosť',
 'vlastnosť',
 'nakupovanie',
 'študent',
 'drevo',
 'súťaž',
 'distribúcia',
 'zábava',
 'kancelária',
 'populácia',
 'prezident',
 'jednotka',
 'kategórie',
 'cigareta',
 'kontext',
 'úvod',
 'príležitosť',
 'výkon',
 'vodič',
 'let',
 'dĺžka',
 'časopis',
 'noviny',
 'súvislosť',
 'vyučovanie',
 'bunka',
 'predajca',
 'rozprava',
 'nález',
 'jazero',
 'člen',
 'správa',
 'telefón',
 'scéna',
 'vzhľad',
 'združenie',
 'pojem',
 'zákazník',
 'úmrtia',
 'diskusia',
 'bývanie',
 'inflácie',
 'poistenie',
 'nálada',
 'žena',
 'rada',
 'krvný',
 'snaha',
 'vyjadrenie',
 'dôležitosť',
 'mienky',
 'platba',
 'realita',
 'zodpovednosť',
 'situácia',
 'zručnosť',
 'výkaz',
 'bohatstvo',
 'prihláška',
 'veľkomesto',
 'grófstva',
 'hĺbka',
 'hodnosť',
 'nadácie',
 'babička',
 'srdce',
 'perspektíva',
 'fotografie',
 'recept',
 'štúdio',
 'téma',
 'zbierka',
 'depresia',
 'predstavivosť',
 'vášeň',
 'percento',
 'prostriedky',
 'nastavenie',
 'reklama',
 'kancelária',
 'koľaj',
 'prípojka',
 'kritika',
 'dlh',
 'popis',
 'pamäť',
 'trpezlivosť',
 'sekretárka',
 'riešenie',
 'podávanie',
 'aspekt',
 'postoj',
 'riaditeľ',
 'osobnosť',
 'psychológia',
 'odporúčanie',
 'odpoveď',
 'výber',
 'skladovanie',
 'verzia',
 'alkohol',
 'argument',
 'sťažnosť',
 'zmluva',
 'dôraz',
 'diaľnice',
 'strata',
 'členstva',
 'vlastníctvo',
 'príprava',
 'steak',
 'zväz',
 'dohoda',
 'rakovina',
 'mena',
 'zamestnanosť',
 'strojárstvo',
 'vstup',
 'interakcia',
 'limit',
 'zmes',
 'prednosť',
 'kraj',
 'republika',
 'sedlo',
 'tradícia',
 'vírus',
 'herec',
 'trieda',
 'dodávka',
 'zariadenie',
 'obtiažnosť',
 'dráma',
 'volebný',
 'motor',
 'futbal',
 'vedenie',
 'hotel',
 'zápas',
 'vlastník',
 'priorita',
 'ochrana',
 'náznak',
 'napätie',
 'zmena',
 'úzkosť',
 'atmosféra',
 'povedomie',
 'chlieb',
 'podnebie',
 'porovnanie',
 'zmätok',
 'výstavba',
 'výťah',
 'emócia',
 'zamestnanec',
 'zamestnávateľ',
 'hosť',
 'výška',
 'vodcovstva',
 'nákupné centrum',
 'manažér',
 'operácie',
 'záznam',
 'rešpekt',
 'vzorka',
 'preprava',
 'nudný',
 'dobročinnosť',
 'bratranec',
 'katastrofa',
 'editor',
 'efektívnosť',
 'vzrušenie',
 'rozsah',
 'spätná väzba',
 'gitara',
 'domáca úloha',
 'vodca',
 'mamička',
 'výsledok',
 'dovolenia',
 'predstavenie',
 'povýšenie',
 'odraz',
 'chladnička',
 'rezolúcia',
 'príjem',
 'zasadania',
 'spevák',
 'tenis',
 'košík',
 'prémia',
 'skrinka',
 'detstva',
 'cirkevné',
 'oblečenie',
 'káva',
 'večera',
 'kreslenie',
 'vlasy',
 'sluch',
 'iniciatíva',
 'súd',
 'laboratórium',
 'meranie',
 'režim',
 'bahno',
 'oranžový',
 'poézie',
 'polícia',
 'možnosť',
 'procedúra',
 'kráľovná',
 'pomer',
 'vzťah',
 'reštaurácia',
 'uspokojenie',
 'sektor',
 'podpis',
 'význam',
 'pieseň',
 'zub',
 'mesto',
 'vozidlo',
 'objem',
 'žena',
 'nehoda',
 'letisko',
 'vymenovanie',
 'prílet',
 'predpoklad',
 'baseball',
 'kapitola',
 'výbor',
 'konverzácia',
 'databázy',
 'nadšenie',
 'chyba',
 'vysvetlenie',
 'poľnohospodár',
 'brána',
 'dievča',
 'hala',
 'historik',
 'nemocnica',
 'zranenia',
 'inštrukcia',
 'údržba',
 'výrobca',
 'jedlo',
 'vnímanie',
 'koláč',
 'báseň',
 'prítomnosť',
 'návrh',
 'recepcia',
 'výmena',
 'revolúcia',
 'rieka',
 'syn',
 'reč',
 'čaj',
 'obec',
 'výstraha',
 'víťaz',
 'robotník',
 'spisovateľ',
 'pomoc']


def kolko(slova):
    n = 0
    for slovo in slova:
        if slovo != unidecode(slovo):
            n+=1
    return n

def kolko2(slova):
    n = 0
    for slovo in slova:
        if slovo[0].isupper():
            n+=1
    return n

