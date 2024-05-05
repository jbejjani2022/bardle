import random

words_file = open('bard_words_edited.txt', 'r')
lines = words_file.readlines()
word_list = []
words_dict = {}
month = 3
day = 24
year = 2022

for line in lines:
    word = line.strip().lower()
    if word not in word_list and len(word) == 5:
        word_list.append(word)

random.shuffle(word_list)

days_in_month = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

for word in word_list:
    words_dict[f'{month}/{day}/{year}'] = word
    day += 1
    if (day > days_in_month[month]):
        day = 1
        month += 1
    if (month > 12):
        month = 1
        year += 1

print(words_dict)
words_file.close()
