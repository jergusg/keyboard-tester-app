# -*- coding: utf-8 -*-

import random
from unidecode import unidecode

def nodia(sentences):
    return [unidecode(s) for s in sentences]

def make_capital(wordlist):
    random.seed(6)
    cap_numbers = random.sample(range(len(wordlist)), round(len(wordlist)*0.4))
    for x in cap_numbers:
        wordlist[x] = wordlist[x].capitalize()
        
