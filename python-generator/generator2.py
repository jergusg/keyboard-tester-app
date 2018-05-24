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

# Final words

words = [
 #'organizácia',   
 'schopnosť',
 'rozhodnutie',
 #'prehrávač',
 #'efektívnosť',
 'inštrukcia',
 'bývanie',
 'chlieb',
# 'iniciatíva',
 'sloboda',
 'filozofia',
 'príbeh',
 #'vysvetlenie',
 'recept',
 'aspekt',
 'výsledok',
 'rieka',
 'pieseň',
 'jednotka', 
 'kapitola',
 #'systém',
 'zmätok',
 'spôsob',
 'atmosféra',
 'význam',
 'pamäť',
# 'kreslenie',
 'teória',
 'matematika',
 'manažér',
 #'košík',
 'riaditeľ',
 'dievča',
 'časopis',
 'noviny',
 'súvislosť',
 'univerzita',
 'rozloha',
 'spoločnosť',
 'aktivita',
]


def only_text(wlist, no_diac=True):
    WPS = 4
    W = len(wlist)
    sentences = [' '.join(wlist[x:x+WPS]) for x in range(0, W, WPS)]
    if not no_diac:
        return [unidecode(s) for s in sentences]
    return sentences

def gen_code(wlist):
    D = len(decorators)
    W = len(wlist)
    d_indices = []
    random.seed(5)
    while len(d_indices) < W:
        d_indices += random.sample(range(D), min(D, W-len(d_indices)))
    new_words = []
    for i in range(W):
        new_words.append(decorators[d_indices[i]](wlist[i]))
    return new_words



def nodia(sentences):
    return [unidecode(s) for s in sentences]

def make_capital(wordlist):
    cap_numbers = random.sample(range(len(wordlist)), round(len(wordlist)*0.33))
    for x in cap_numbers:
        wordlist[x] = wordlist[x].capitalize()

def sample(slova, n):
    return random.sample(slova, n)

def kolko(slova):
    n = 0
    for slovo in slova:
        if slovo != unidecode(slovo):
            n+=1
    return n


random.seed(0)
make_capital(words)

random.seed(1)
words1 = random.sample(words, len(words))

random.seed(2)
words2 = random.sample(words, len(words))



s1 = only_text(words1, 0)
s2 = only_text(words2, 1)

words3 = gen_code(words)
random.seed(2)
s3 = only_text(random.sample(words3, len(words)), 0)

random.seed(3)
s4 = only_text(random.sample(words3, len(words)), 1)
