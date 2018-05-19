# -*- coding: utf-8 -*-
import random
from unidecode import unidecode

decorators_0 =  [
    lambda x: x,
    lambda x: x + '?',
    lambda a,b: a+'_'+b,
    lambda a,b: a+'-'+b,
    lambda a,b: a+'='+b,
    lambda a,b: a+'/'+b,    
    lambda a,b: a+'+'+b,
    lambda a,b: a+'%'+b,
]

decorators = [
    lambda x: '+' + x,
    lambda x: '-' + x,
    lambda x: x + '/',
    lambda x: x + '*',
    lambda x: x + '=',
    lambda x: '!' + x,
    lambda x: '"' + x + '"',
    lambda x: '(' + x + ')',
    lambda x: x + ':',
    lambda x: x + ';',
    lambda x: '_' + x + '_',
    lambda x: '&' + x,
    lambda x: '@' + x,
    lambda x: '$' + x,
    lambda x: '#' + x,
    lambda x: '\\' + x,
    lambda x: "'" + x + "'",
    lambda x: "<" + x + ">",
    lambda x: "{" + x + "}",
    lambda x: "[" + x + "]",        
]

wordlist = ['Výrobca',
 'Internet',
 'Žena',
 'metóda',
 'dieťa',
 'realita',
 'Fyzika',
 'recept',
 'Zbierka',
 'bahno',
 'rieka',
 'cigareta',
 'Vedomosti',
 'mesiac',
 'výber',
 'Jazero'
]

random.seed(6)
wordlist2 = random.sample(wordlist, k=len(wordlist))


def only_text(wlist, no_diac=True):
    WPS = 4
    W = len(wordlist)
    sentences = [' '.join(wlist[x:x+WPS]) for x in range(0, W, WPS)]
    if not no_diac:
        return [unidecode(s) for s in sentences]
    return sentences

def gen_code(wlist, no_diac=True):
    WPS = 4
    D = len(decorators)
    W = len(wlist)
    d_indices = []
    random.seed(5)
    while len(d_indices) < W:
        d_indices += random.sample(range(D), min(D, W-len(d_indices)))
    new_words = []
    for i in range(W):
        new_words.append(decorators[d_indices[i]](wlist[i]))
    sentences = [' '.join(new_words[x:x+WPS]) for x in range(0, W, WPS)]
    if not no_diac:
        return [unidecode(s) for s in sentences]
    return sentences
    
only_text(wordlist)
gen_text(wordlist2)