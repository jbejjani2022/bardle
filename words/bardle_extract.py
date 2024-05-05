new_file = open('complete_bard_words.txt', 'w')

with open('complete_shakespeare.txt', 'r') as f:
    words = []

    for line in f:
        stripped_line = line.strip()
        line_words = stripped_line.split()

        for i in line_words:
            word = i.strip(" -\'\".?:;,/!()[]").lower()
            if len(word) == 5 and word not in words:
                words.append(word)
                new_file.write(word + "\n")

    print(words)

new_file.close()
