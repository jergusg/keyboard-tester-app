# -*- coding: utf-8 -*-

from nouns import nouns
from random import random, randrange

decorators =  [
    lambda x: x,
    lambda x: x + ':',
    lambda x: x + ';',
    lambda x: x + '?',
    lambda x: x + '!',
    lambda x: '('+x+')',
    lambda x: '"'+x+'"',
    lambda a,b: a+'-'+b,
    lambda a,b: a+'='+b,
    lambda a,b: a+'/'+b,
    lambda a,b: a+'_'+b,
    lambda a,b: a+'+'+b,
]

UNARY = 7
DD = len(decorators)


def generate_sentence():
    words = [nouns[randrange(0, len(nouns))] for i in range(4)]
    sentence = ''
    while len(words) > 0:
        n = randrange(0, DD)
        if n < UNARY:
            sentence = ' '.join([sentence, decorators[n](words.pop())])
        elif len(words) >= 2:
            sentence = ' '.join([sentence, decorators[n](words.pop(), words.pop())])
    return sentence[1:]

def gen(n):
    return [generate_sentence() for i in range(n)]