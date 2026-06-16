const a1Data = {
  level: 'A1',
  title: 'A1 — Beginner',
  subtitle: 'Deutsch Anfänger',
  description: 'Master the basics of German: pronunciation, greetings, numbers, simple conversations, and everyday topics.',
  color: '#2c3e6b',
  weeks: [
    {
      id: 1,
      title: 'Hallo! Greetings & Basics',
      icon: '👋',
      theme: 'Alphabet, Pronunciation, Greetings, Numbers 0-20',
      unlocked: true,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 1: Hallo!' },
        { name: 'Jenny\'s German Lessons', url: 'https://www.youtube.com/@JennysGermanLessons', description: 'Alphabet pronunciation guide' },
        { name: 'Goethe-Institut', url: 'https://www.goethesprachportal.de/en', description: 'Free alphabet exercises' },
      ],
      days: [
        {
          day: 1,
          title: 'The German Alphabet',
          tasks: [
            {
              id: 'a1w1d1t1', type: 'flashcards', title: 'Warm Up: German Letters', description: 'Review key letter sounds',
              xp: 5, content: { cards: [
                { front: 'W', back: 'Pronounced like English "V"', example: 'Wasser (water)' },
                { front: 'V', back: 'Pronounced like English "F"', example: 'Vater (father)' },
                { front: 'J', back: 'Pronounced like English "Y"', example: 'Ja (yes)' },
                { front: 'Z', back: 'Pronounced like "TS"', example: 'Zeit (time)' },
                { front: 'CH', back: 'Soft throat sound, like "Bach"', example: 'Nacht (night)' },
              ]}
            },
            {
              id: 'a1w1d1t2', type: 'grammar', title: 'German Alphabet Overview', description: 'Learn the 26 letters and 4 special characters',
              xp: 15, content: {
                rule: 'German has 26 letters plus 4 special characters: Ä, Ö, Ü, and ß (Eszett). The alphabet sounds similar to English but with key differences.',
                examples: [
                  { german: 'A, B, C, D, E, F, G', english: 'ah, beh, tseh, deh, eh, eff, geh' },
                  { german: 'H, I, J, K, L, M, N', english: 'hah, eeh, yot, kah, ell, emm, enn' },
                  { german: 'O, P, Q, R, S, T, U', english: 'oh, peh, koo, err, ess, teh, ooh' },
                  { german: 'V, W, X, Y, Z', english: 'fow, veh, iks, üpilon, tsett' },
                ],
                note: 'Ä sounds like "e" in "bed", Ö rounds lips and says "e", Ü rounds lips and says "ee".'
              }
            },
            {
              id: 'a1w1d1t3', type: 'vocabulary', title: 'Special Characters', description: 'Ä, Ö, Ü, and ß with example words',
              xp: 15, content: { items: [
                { german: 'Äpfel', english: 'apples', pronunciation: 'EH-pfel' },
                { german: 'schön', english: 'beautiful', pronunciation: 'shern' },
                { german: 'über', english: 'over', pronunciation: 'OO-ber' },
                { german: 'Straße', english: 'street', pronunciation: 'SHTRAH-se' },
                { german: 'möglich', english: 'possible', pronunciation: 'MURG-lich' },
                { german: 'öffnen', english: 'to open', pronunciation: 'URF-nen' },
                { german: 'Mädchen', english: 'girl', pronunciation: 'MAID-chen' },
                { german: 'Spaß', english: 'fun', pronunciation: 'SHPAHS' },
                { german: 'groß', english: 'big', pronunciation: 'grohss' },
                { german: 'heißen', english: 'to be called', pronunciation: 'HY-sen' },
              ]}
            },
            {
              id: 'a1w1d1t4', type: 'quiz', title: 'Letter Sounds Quiz', description: 'Test your alphabet knowledge',
              xp: 10, content: { questions: [
                { question: 'How do you pronounce "W" in German?', options: ['double-u', 'veh', 'vay', 'way'], correct: 1 },
                { question: 'What sound does "J" make in German?', options: ['jay', 'yot', 'jot', 'yeh'], correct: 1 },
                { question: 'The letter "V" is pronounced like...', options: ['English V', 'English F', 'English W', 'English Z'], correct: 1 },
                { question: '"ß" (Eszett) sounds like...', options: ['sharp S', 'B', 'TS', 'Z'], correct: 0 },
                { question: '"Ä" sounds like the "e" in...', options: ['bed', 'bee', 'boot', 'bad'], correct: 0 },
              ]}
            },
            {
              id: 'a1w1d1t5', type: 'listening', title: 'Listen to the Alphabet', description: 'Hear German letters pronounced',
              xp: 10, content: {
                clip: { title: 'German Alphabet Song', source: 'Listen and follow along', text: 'A B C D E F G, H I J K L M N, O P Q R S T U, V W X Y Z' },
                questions: [
                  { question: 'Which letter comes after "L" in the German alphabet?', options: ['M', 'N', 'K', 'O'], correct: 0 },
                  { question: 'The German alphabet has how many special characters?', options: ['2', '3', '4', '5'], correct: 2 },
                ]
              }
            },
            {
              id: 'a1w1d1t6', type: 'speaking', title: 'Practice Pronunciation', description: 'Say the special characters out loud',
              xp: 10, content: {
                prompt: 'Repeat these words: Äpfel, schön, über, Straße, Spaß. Pay attention to the special sounds.',
                tips: ['Ä: Open mouth, say "eh"', 'Ö: Round lips, say "e"', 'Ü: Round lips, say "ee"', 'ß: Like a sharp "s"']
              }
            },
            {
              id: 'a1w1d1t7', type: 'quickwin', title: 'Quick Win: German Word', description: 'Learn a fun German word',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 2,
          title: 'Greetings & Introductions',
          tasks: [
            {
              id: 'a1w1d2t1', type: 'flashcards', title: 'Warm Up: Yesterday\'s Letters', description: 'Quick review of special characters',
              xp: 5, content: { cards: [
                { front: 'Ä', back: 'Like "e" in "bed"', example: 'Käse (cheese)' },
                { front: 'Ö', back: 'Round lips, say "e"', example: 'schön (beautiful)' },
                { front: 'Ü', back: 'Round lips, say "ee"', example: 'über (over)' },
                { front: 'ß', back: 'Sharp "s" sound', example: 'Straße (street)' },
              ]}
            },
            {
              id: 'a1w1d2t2', type: 'grammar', title: 'Formal vs Informal', description: 'When to use "du" vs "Sie"',
              xp: 15, content: {
                rule: 'German distinguishes between informal "du" (friends, family, children) and formal "Sie" (strangers, elders, professionals).',
                examples: [
                  { german: 'Hallo, wie geht es dir?', english: 'Hello, how are you? (informal)' },
                  { german: 'Guten Tag, wie geht es Ihnen?', english: 'Good day, how are you? (formal)' },
                  { german: 'Tschüss!', english: 'Bye! (informal)' },
                  { german: 'Auf Wiedersehen!', english: 'Goodbye! (formal)' },
                ],
                note: 'When in doubt, start formal. Germans will tell you when to switch to "du".'
              }
            },
            {
              id: 'a1w1d2t3', type: 'vocabulary', title: 'Essential Greetings', description: 'Greetings for every time of day',
              xp: 15, content: { items: [
                { german: 'Guten Morgen!', english: 'Good morning!', pronunciation: 'GOO-ten MOR-gen' },
                { german: 'Guten Tag!', english: 'Good day! (formal)', pronunciation: 'GOO-ten tahk' },
                { german: 'Guten Abend!', english: 'Good evening!', pronunciation: 'GOO-ten AH-bent' },
                { german: 'Gute Nacht!', english: 'Good night!', pronunciation: 'GOO-te nakht' },
                { german: 'Hallo!', english: 'Hello! (informal)', pronunciation: 'HAH-lo' },
                { german: 'Tschüss!', english: 'Bye! (informal)', pronunciation: 'choos' },
                { german: 'Auf Wiedersehen!', english: 'Goodbye! (formal)', pronunciation: 'owf VEE-der-zay-en' },
                { german: 'Bis morgen!', english: 'See you tomorrow!', pronunciation: 'bis MOR-gen' },
                { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)', pronunciation: 'vee gayt es EE-nen' },
                { german: 'Mir geht es gut.', english: 'I\'m doing well.', pronunciation: 'meer gayt es goot' },
              ]}
            },
            {
              id: 'a1w1d2t4', type: 'matching', title: 'Match the Greetings', description: 'Match German and English greetings',
              xp: 10, content: { pairs: [
                { german: 'Guten Morgen!', english: 'Good morning!' },
                { german: 'Guten Abend!', english: 'Good evening!' },
                { german: 'Tschüss!', english: 'Bye!' },
                { german: 'Auf Wiedersehen!', english: 'Goodbye!' },
                { german: 'Wie geht es Ihnen?', english: 'How are you?' },
                { german: 'Mir geht es gut.', english: 'I\'m doing well.' },
              ]}
            },
            {
              id: 'a1w1d2t5', type: 'listening', title: 'Greetings in Action', description: 'Listen to people greeting each other',
              xp: 10, content: {
                clip: { title: 'Two people meeting on the street', source: 'Easy German style dialogue', text: '"Guten Tag! Wie geht es Ihnen?" "Danke, gut. Und Ihnen?" "Auch gut, danke!"' },
                questions: [
                  { question: 'What time of day are they greeting each other?', options: ['morning', 'afternoon/evening', 'night', 'not specified'], correct: 1 },
                  { question: 'How does the second person respond?', options: ['Schlecht (bad)', 'Gut (well)', 'Müde (tired)', 'Hunger (hungry)'], correct: 1 },
                ]
              }
            },
            {
              id: 'a1w1d2t6', type: 'roleplay', title: 'Introduce Yourself', description: 'Practice introducing yourself',
              xp: 10, content: {
                scenario: 'You meet a German colleague at work for the first time.',
                steps: ['Greet: "Guten Tag!"', 'Introduce: "Ich heiße [name]."', 'Ask: "Wie heißen Sie?"', 'Respond: "Freut mich!"', 'Ask: "Wie geht es Ihnen?"']
              }
            },
            {
              id: 'a1w1d2t7', type: 'quickwin', title: 'Quick Win: German Joke', description: 'End on a fun note!',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 3,
          title: 'Introducing Yourself',
          tasks: [
            {
              id: 'a1w1d3t1', type: 'flashcards', title: 'Warm Up: Greetings Review', description: 'Quick flashcard review',
              xp: 5, content: { cards: [
                { front: 'Wie geht es Ihnen?', back: 'How are you? (formal)' },
                { front: 'Mir geht es gut.', back: 'I\'m doing well.' },
                { front: 'Freut mich!', back: 'Nice to meet you!' },
                { front: 'Tschüss!', back: 'Bye!' },
              ]}
            },
            {
              id: 'a1w1d3t2', type: 'grammar', title: 'Basic Sentence Structure', description: 'Subject + Verb + Object',
              xp: 15, content: {
                rule: 'German sentences follow Subject-Verb-Object order. The verb is always in position 2 in main clauses.',
                examples: [
                  { german: 'Ich heiße Anna.', english: 'My name is Anna. (I am called Anna.)' },
                  { german: 'Ich komme aus Indien.', english: 'I come from India.' },
                  { german: 'Ich wohne in Berlin.', english: 'I live in Berlin.' },
                  { german: 'Ich spreche Deutsch.', english: 'I speak German.' },
                ],
                note: 'The verb "heißen" means "to be called", not "to be".'
              }
            },
            {
              id: 'a1w1d3t3', type: 'vocabulary', title: 'Self-Introduction Words', description: 'Words for introducing yourself',
              xp: 15, content: { items: [
                { german: 'Ich heiße...', english: 'My name is...', pronunciation: 'ikh HY-se' },
                { german: 'Ich komme aus...', english: 'I come from...', pronunciation: 'ikh KO-meh ows' },
                { german: 'Ich wohne in...', english: 'I live in...', pronunciation: 'ikh VO-neh in' },
                { german: 'Ich bin... Jahre alt.', english: 'I am... years old.', pronunciation: 'ikh bin YA-reh alt' },
                { german: 'Ich spreche...', english: 'I speak...', pronunciation: 'ikh SHPRE-kheh' },
                { german: 'Ich lerne Deutsch.', english: 'I\'m learning German.', pronunciation: 'ikh LER-neh doych' },
                { german: 'Ich arbeite als...', english: 'I work as...', pronunciation: 'ikh AR-bye-teh als' },
                { german: 'Freut mich!', english: 'Nice to meet you!', pronunciation: 'froyt mikh' },
                { german: 'Wie heißen Sie?', english: 'What is your name? (formal)', pronunciation: 'vee HY-sen ZEE' },
                { german: 'Woher kommen Sie?', english: 'Where are you from? (formal)', pronunciation: 'vo-HAIR KO-men ZEE' },
              ]}
            },
            {
              id: 'a1w1d3t4', type: 'fillblank', title: 'Complete the Introduction', description: 'Fill in the blanks',
              xp: 10, content: { sentences: [
                { text: 'Ich ___ Anna.', answer: 'heiße', hint: 'name verb' },
                { text: 'Ich ___ aus Indien.', answer: 'komme', hint: 'come from' },
                { text: 'Ich ___ in Berlin.', answer: 'wohne', hint: 'live' },
                { text: 'Ich ___ Deutsch.', answer: 'spreche', hint: 'speak' },
                { text: '___ mich!', answer: 'Freut', hint: 'Nice to...!' },
              ]}
            },
            {
              id: 'a1w1d3t5', type: 'listening', title: 'Listen to Introductions', description: 'Hear people introducing themselves',
              xp: 10, content: {
                clip: { title: 'Three people introducing themselves', source: 'Nicos Weg style', text: '"Ich heiße Tom. Ich komme aus England. Ich wohne in München."' },
                questions: [
                  { question: 'Where does Tom come from?', options: ['Germany', 'England', 'Austria', 'Switzerland'], correct: 1 },
                  { question: 'Where does Tom live?', options: ['Berlin', 'Hamburg', 'München', 'Köln'], correct: 2 },
                ]
              }
            },
            {
              id: 'a1w1d3t6', type: 'writing', title: 'Write Your Introduction', description: 'Write 4 sentences about yourself',
              xp: 10, content: {
                prompt: 'Write a short self-introduction in German (4 sentences): your name, where you are from, where you live, and what language you speak.',
                example: 'Ich heiße Maria. Ich komme aus Spanien. Ich wohne in Frankfurt. Ich spreche Spanisch und Englisch.',
                tips: ['Use "Ich heiße..." for your name', 'Use "Ich komme aus..." for your country', 'End with "Freut mich!"']
              }
            },
            {
              id: 'a1w1d3t7', type: 'quickwin', title: 'Quick Win: Fun Fact', description: 'Learn something fun about Germany',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 4,
          title: 'Numbers 0-20',
          tasks: [
            {
              id: 'a1w1d4t1', type: 'flashcards', title: 'Warm Up: Introductions', description: 'Review self-introduction phrases',
              xp: 5, content: { cards: [
                { front: 'Ich heiße...', back: 'My name is...' },
                { front: 'Ich komme aus...', back: 'I come from...' },
                { front: 'Ich wohne in...', back: 'I live in...' },
                { front: 'Freut mich!', back: 'Nice to meet you!' },
              ]}
            },
            {
              id: 'a1w1d4t2', type: 'grammar', title: 'Numbers Pattern', description: 'How German numbers work',
              xp: 15, content: {
                rule: 'German numbers 13-19 follow the pattern: unit + "zehn" (ten). For example: dreizehn = drei + zehn = thirteen.',
                examples: [
                  { german: 'eins, zwei, drei, vier, fünf', english: '1, 2, 3, 4, 5' },
                  { german: 'sechs, sieben, acht, neun, zehn', english: '6, 7, 8, 9, 10' },
                  { german: 'elf, zwölf', english: '11, 12 (irregular)' },
                  { german: 'dreizehn, vierzehn, fünfzehn', english: '13, 14, 15' },
                ],
                note: '11 (elf) and 12 (zwölf) are irregular. After that, the pattern is consistent.'
              }
            },
            {
              id: 'a1w1d4t3', type: 'vocabulary', title: 'Numbers 0-20', description: 'Learn all numbers from 0 to 20',
              xp: 15, content: { items: [
                { german: 'null', english: '0', pronunciation: 'noohl' },
                { german: 'eins', english: '1', pronunciation: 'ayns' },
                { german: 'zwei', english: '2', pronunciation: 'tsvy' },
                { german: 'drei', english: '3', pronunciation: 'dry' },
                { german: 'vier', english: '4', pronunciation: 'feer' },
                { german: 'fünf', english: '5', pronunciation: 'fuenf' },
                { german: 'sechs', english: '6', pronunciation: 'zeks' },
                { german: 'sieben', english: '7', pronunciation: 'ZEE-ben' },
                { german: 'acht', english: '8', pronunciation: 'akht' },
                { german: 'neun', english: '9', pronunciation: 'noyn' },
                { german: 'zehn', english: '10', pronunciation: 'tsayn' },
                { german: 'elf', english: '11', pronunciation: 'elf' },
                { german: 'zwölf', english: '12', pronunciation: 'tsverlf' },
                { german: 'dreizehn', english: '13', pronunciation: 'DRY-tsayn' },
                { german: 'vierzehn', english: '14', pronunciation: 'FEER-tsayn' },
                { german: 'fünfzehn', english: '15', pronunciation: 'FUEMF-tsayn' },
                { german: 'sechzehn', english: '16', pronunciation: 'ZEKH-tsayn' },
                { german: 'siebzehn', english: '17', pronunciation: 'ZEEP-tsayn' },
                { german: 'achtzehn', english: '18', pronunciation: 'AKHT-tsayn' },
                { german: 'neunzehn', english: '19', pronunciation: 'NOYN-tsayn' },
                { german: 'zwanzig', english: '20', pronunciation: 'TSAHN-tsikh' },
              ]}
            },
            {
              id: 'a1w1d4t4', type: 'quiz', title: 'Numbers Quiz', description: 'Test your number knowledge',
              xp: 10, content: { questions: [
                { question: 'How do you say "five" in German?', options: ['vier', 'fünf', 'sechs', 'fünfzig'], correct: 1 },
                { question: 'What is "zwölf" in English?', options: ['11', '12', '13', '20'], correct: 1 },
                { question: '"dreizehn" means...', options: ['30', '13', '3', '300'], correct: 1 },
                { question: 'Which number is irregular?', options: ['15', '16', '11', '18'], correct: 2 },
                { question: '"neunzehn" is the number...', options: ['90', '19', '9', '900'], correct: 1 },
              ]}
            },
            {
              id: 'a1w1d4t5', type: 'scramble', title: 'Unscramble Numbers', description: 'Put the letters in order',
              xp: 10, content: { words: [
                { scrambled: 'Fnüf', answer: 'Fünf' },
                { scrambled: 'Zwaicn', answer: 'Zwanzig' },
                { scrambled: 'Sebsch', answer: 'Sechs' },
                { scrambled: 'Dre', answer: 'Drei' },
                { scrambled: 'Eisn', answer: 'Eins' },
              ]}
            },
            {
              id: 'a1w1d4t6', type: 'speaking', title: 'Count Out Loud', description: 'Say numbers 0-20 out loud',
              xp: 10, content: {
                prompt: 'Count from 0 to 20 out loud in German. Focus on pronunciation of zwölf, dreizehn, and zwanzig.',
                tips: ['Take your time with "zwölf" (12)', 'dreizehn rhymes with "say"', 'zwanzig has a soft "ch" at the end']
              }
            },
            {
              id: 'a1w1d4t7', type: 'quickwin', title: 'Quick Win: German Number Fun', description: 'Did you know?',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 5,
          title: 'Numbers 21-100 & Phone Numbers',
          tasks: [
            {
              id: 'a1w1d5t1', type: 'flashcards', title: 'Warm Up: Numbers 0-20', description: 'Quick number review',
              xp: 5, content: { cards: [
                { front: 'fünf', back: '5' },
                { front: 'zwölf', back: '12' },
                { front: 'dreizehn', back: '13' },
                { front: 'zwanzig', back: '20' },
              ]}
            },
            {
              id: 'a1w1d5t2', type: 'grammar', title: 'The 21-99 Pattern', description: 'Units come BEFORE tens in German',
              xp: 15, content: {
                rule: 'For numbers 21-99, German puts the unit BEFORE the tens, connected with "und" (and). Example: 25 = fünfundzwanzig (five-and-twenty).',
                examples: [
                  { german: 'einundzwanzig', english: '21 (one-and-twenty)' },
                  { german: 'fünfundzwanzig', english: '25 (five-and-twenty)' },
                  { german: 'dreißig', english: '30' },
                  { german: 'vierzig', english: '40' },
                  { german: 'fünfzig', english: '50' },
                ],
                note: 'Pattern: unit + "und" + ten. The unit always comes first!'
              }
            },
            {
              id: 'a1w1d5t3', type: 'vocabulary', title: 'Tens and Hundreds', description: 'Learn tens and key hundreds',
              xp: 15, content: { items: [
                { german: 'dreißig', english: '30', pronunciation: 'DRY-sikh' },
                { german: 'vierzig', english: '40', pronunciation: 'FEER-tsikh' },
                { german: 'fünfzig', english: '50', pronunciation: 'FUEMF-tsikh' },
                { german: 'sechzig', english: '60', pronunciation: 'ZEKH-tsikh' },
                { german: 'siebzig', english: '70', pronunciation: 'ZEEP-tsikh' },
                { german: 'achtzig', english: '80', pronunciation: 'AKH-tsikh' },
                { german: 'neunzig', english: '90', pronunciation: 'NOYN-tsikh' },
                { german: 'hundert', english: '100', pronunciation: 'HOON-dert' },
              ]}
            },
            {
              id: 'a1w1d5t4', type: 'fillblank', title: 'Number Fill-in', description: 'Write numbers in German',
              xp: 10, content: { sentences: [
                { text: '25 = fünfund___', answer: 'zwanzig', hint: 'twenty' },
                { text: '40 = ___', answer: 'vierzig', hint: 'four-ty' },
                { text: '100 = ___', answer: 'hundert', hint: 'hundred' },
                { text: '60 = ___', answer: 'sechzig', hint: 'six-ty' },
              ]}
            },
            {
              id: 'a1w1d5t5', type: 'listening', title: 'Phone Numbers', description: 'Listen to phone numbers in German',
              xp: 10, content: {
                clip: { title: 'Reading a phone number', source: 'Real-life dialogue', text: '"Meine Nummer ist: null-drei-null, eins-zwei-drei-vier-fünf."' },
                questions: [
                  { question: 'What is the phone number?', options: ['030 12345', '031 54321', '301 2345', '030 54321'], correct: 0 },
                  { question: 'How is "0" pronounced in phone numbers?', options: ['null', 'nichts', 'zero', 'leer'], correct: 0 },
                ]
              }
            },
            {
              id: 'a1w1d5t6', type: 'writing', title: 'Write Your Phone Number', description: 'Write a phone number in German',
              xp: 10, content: {
                prompt: 'Write your phone number (or a fake one) in German using words, not digits.',
                example: 'Meine Nummer ist: null-drei-null, eins-zwei-drei, vier-fünf-sechs-sieben.',
                tips: ['Say each digit separately', 'Use "null" for 0', 'Add "meine Nummer ist" before the number']
              }
            },
            {
              id: 'a1w1d5t7', type: 'quickwin', title: 'Quick Win: Number Joke', description: 'A math joke in German!',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 6,
          title: 'Polite Expressions & Practice',
          tasks: [
            {
              id: 'a1w1d6t1', type: 'flashcards', title: 'Warm Up: Numbers Review', description: 'Quick number flashcards',
              xp: 5, content: { cards: [
                { front: 'fünfundzwanzig', back: '25' },
                { front: 'vierzig', back: '40' },
                { front: 'hundert', back: '100' },
                { front: 'dreißig', back: '30' },
              ]}
            },
            {
              id: 'a1w1d6t2', type: 'grammar', title: 'Polite Phrases Grammar', description: 'Using "bitte" and "danke" in context',
              xp: 15, content: {
                rule: '"Bitte" can mean "please", "you\'re welcome", or "here you go" depending on context. "Danke" always means "thank you".',
                examples: [
                  { german: 'Ein Kaffee, bitte.', english: 'A coffee, please.' },
                  { german: 'Danke schön!', english: 'Thank you very much!' },
                  { german: 'Bitte schön!', english: 'You\'re welcome!' },
                  { german: 'Bitte sehr!', english: 'Here you go!' },
                ],
                note: '"Bitte" is one of the most versatile words in German.'
              }
            },
            {
              id: 'a1w1d6t3', type: 'vocabulary', title: 'Essential Polite Words', description: 'Must-know polite expressions',
              xp: 15, content: { items: [
                { german: 'Bitte', english: 'Please / You\'re welcome', pronunciation: 'BIT-teh' },
                { german: 'Danke', english: 'Thank you', pronunciation: 'DAHN-keh' },
                { german: 'Danke schön!', english: 'Thank you very much!', pronunciation: 'DAHN-keh shern' },
                { german: 'Entschuldigung!', english: 'Excuse me! / Sorry!', pronunciation: 'ent-SHOOL-dee-goong' },
                { german: 'Es tut mir leid.', english: 'I\'m sorry.', pronunciation: 'es toot meer lyte' },
                { german: 'Ja', english: 'Yes', pronunciation: 'yah' },
                { german: 'Nein', english: 'No', pronunciation: 'nyn' },
                { german: 'Genau!', english: 'Exactly!', pronunciation: 'geh-NOW' },
                { german: 'Kein Problem!', english: 'No problem!', pronunciation: 'kyn pro-BLEM' },
                { german: 'Verstanden?', english: 'Understood?', pronunciation: 'fer-SHTAH-den' },
              ]}
            },
            {
              id: 'a1w1d6t4', type: 'matching', title: 'Polite Expressions Match', description: 'Match German and English',
              xp: 10, content: { pairs: [
                { german: 'Bitte', english: 'Please / You\'re welcome' },
                { german: 'Danke schön', english: 'Thank you very much' },
                { german: 'Entschuldigung', english: 'Excuse me' },
                { german: 'Es tut mir leid', english: 'I\'m sorry' },
                { german: 'Genau', english: 'Exactly' },
                { german: 'Kein Problem', english: 'No problem' },
              ]}
            },
            {
              id: 'a1w1d6t5', type: 'listening', title: 'Polite Dialogue', description: 'Listen to a polite conversation',
              xp: 10, content: {
                clip: { title: 'At a bakery', source: 'Real-life scenario', text: '"Guten Tag! Ein Brötchen, bitte." "Bitte sehr!" "Danke schön!" "Schönen Tag noch!"' },
                questions: [
                  { question: 'What is the customer buying?', options: ['coffee', 'bread roll (Brötchen)', 'cake', 'water'], correct: 1 },
                  { question: 'How does the baker respond to "Danke schön"?', options: ['Bitte', 'Bitte schön', 'Gern geschehen', 'Tschüss'], correct: 1 },
                ]
              }
            },
            {
              id: 'a1w1d6t6', type: 'roleplay', title: 'Polite Conversation', description: 'Practice being polite in German',
              xp: 10, content: {
                scenario: 'You are at a café. Order something and be polite.',
                steps: ['Greet: "Guten Tag!"', 'Order: "Ein Kaffee, bitte."', 'Respond to "Bitte sehr": "Danke schön!"', 'When leaving: "Auf Wiedersehen!"']
              }
            },
            {
              id: 'a1w1d6t7', type: 'quickwin', title: 'Quick Win: German Phrase', description: 'A useful phrase to remember',
              xp: 5, content: {}
            },
          ]
        },
        {
          day: 7,
          title: 'Mini Challenge: Week 1 Review',
          tasks: [
            {
              id: 'a1w1d7t1', type: 'review', title: 'Week 1 Review Quiz', description: 'Test everything you learned this week',
              xp: 25, content: { questions: [
                { question: 'How do you say "Hello!" in German?', options: ['Tschüss!', 'Hallo!', 'Danke!', 'Bitte!'], correct: 1 },
                { question: 'What does "Guten Morgen" mean?', options: ['Good night', 'Goodbye', 'Good morning', 'Good evening'], correct: 2 },
                { question: '"Ich komme aus..." means...', options: ['I live in...', 'I speak...', 'I come from...', 'My name is...'], correct: 2 },
                { question: 'How do you say "five" in German?', options: ['vier', 'fünf', 'sechs', 'fünfzig'], correct: 1 },
                { question: '35 in German is...', options: ['fünfunddreißig', 'dreißigfünf', 'fünfzigdrei', 'dreiundfünfzig'], correct: 0 },
                { question: '"Danke schön" means...', options: ['No problem', 'Excuse me', 'Thank you very much', 'You\'re welcome'], correct: 2 },
                { question: 'How do you ask someone\'s name formally?', options: ['Wie heißt du?', 'Wie heißen Sie?', 'Was ist dein Name?', 'Wer bist du?'], correct: 1 },
                { question: '"Entschuldigung" means...', options: ['Thank you', 'Please', 'Excuse me', 'Exactly'], correct: 2 },
                { question: 'The letter "W" is pronounced like...', options: ['English W', 'English V', 'English F', 'English Z'], correct: 1 },
                { question: '"zwölf" is the number...', options: ['11', '12', '13', '20'], correct: 1 },
              ]}
            },
            {
              id: 'a1w1d7t2', type: 'fun', title: '🎉 Week 1 Complete!', description: 'You earned bonus content!',
              xp: 5, content: {
                facts: [
                  '🍔 The word "Kindergarten" is actually German! It means "children\'s garden."',
                  '🚗 Germans love cars. The Autobahn is famous for having no speed limit in some sections!',
                  '📚 The longest German word in common use is "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz" (63 letters!)',
                  '🍺 Germany has over 1,500 types of beer and 1,300 breweries!',
                  '🎵 "Wanderlust" is a German word meaning "desire to travel."',
                ]
              }
            },
          ]
        },
      ]
    },
    {
      id: 2,
      title: 'Ich bin... Personal Pronouns & Verbs',
      icon: '✍️',
      theme: 'Personal pronouns, present tense, articles, sentence structure',
      unlocked: false,
      resources: [
        { name: 'Jenny\'s German Lessons', url: 'https://www.youtube.com/@JennysGermanLessons', description: 'Present tense conjugation video' },
        { name: 'Goethe-Institut', url: 'https://www.goethesprachportal.de/en', description: 'Free verb conjugation exercises' },
        { name: 'GradGermany', url: 'https://www.gradgermany.com', description: 'Quiz bank for verb practice' },
      ],
      days: [
        {
          day: 1,
          title: 'Personal Pronouns',
          tasks: [
            { id: 'a1w2d1t1', type: 'flashcards', title: 'Warm Up: Week 1 Review', description: 'Quick review of key phrases', xp: 5, content: { cards: [
              { front: 'Ich heiße...', back: 'My name is...' },
              { front: 'Wie heißen Sie?', back: 'What is your name?' },
              { front: 'Danke schön', back: 'Thank you very much' },
              { front: 'fünfundzwanzig', back: '25' },
            ]}},
            { id: 'a1w2d1t2', type: 'grammar', title: 'Personal Pronouns', description: 'I, you, he, she, it, we, they', xp: 15, content: {
              rule: 'German personal pronouns are the building blocks of every sentence.',
              examples: [
                { german: 'ich = I', english: 'Ich bin Student. (I am a student.)' },
                { german: 'du = you (informal)', english: 'Du bist nett. (You are nice.)' },
                { german: 'er = he, sie = she, es = it', english: 'Er kommt aus Berlin.' },
                { german: 'wir = we, ihr = you (plural), sie/Sie = they/you (formal)', english: 'Wir lernen Deutsch.' },
              ],
              note: '"Sie" (capitalized) is formal "you". "sie" (lowercase) is "she" or "they".'
            }},
            { id: 'a1w2d1t3', type: 'vocabulary', title: 'Pronouns in Action', description: 'See pronouns used in sentences', xp: 15, content: { items: [
              { german: 'Ich', english: 'I', pronunciation: 'ikh' },
              { german: 'du', english: 'you (informal)', pronunciation: 'doo' },
              { german: 'er', english: 'he', pronunciation: 'air' },
              { german: 'sie', english: 'she', pronunciation: 'zee' },
              { german: 'es', english: 'it', pronunciation: 'es' },
              { german: 'wir', english: 'we', pronunciation: 'veer' },
              { german: 'ihr', english: 'you all (informal)', pronunciation: 'eer' },
              { german: 'sie', english: 'they', pronunciation: 'zee' },
              { german: 'Sie', english: 'you (formal)', pronunciation: 'zee' },
            ]}},
            { id: 'a1w2d1t4', type: 'fillblank', title: 'Pronoun Practice', description: 'Fill in the correct pronoun', xp: 10, content: { sentences: [
              { text: '___ bin Student. (I)', answer: 'Ich', hint: 'I' },
              { text: '___ bist nett. (you, informal)', answer: 'Du', hint: 'you' },
              { text: '___ kommt aus Berlin. (he)', answer: 'Er', hint: 'he' },
              { text: '___ lernen Deutsch. (we)', answer: 'Wir', hint: 'we' },
            ]}},
            { id: 'a1w2d1t5', type: 'listening', title: 'Pronouns in Dialogue', description: 'Listen and identify pronouns', xp: 10, content: {
              clip: { title: 'People talking about themselves', source: 'Nicos Weg style', text: '"Ich bin Tom. Ich komme aus England. Du bist Maria, oder? Sie kommt aus Spanien."' },
              questions: [
                { question: 'How many people are being discussed?', options: ['1', '2', '3', '4'], correct: 2 },
                { question: 'Where does Maria come from?', options: ['England', 'Germany', 'Spain', 'France'], correct: 2 },
              ]
            }},
            { id: 'a1w2d1t6', type: 'speaking', title: 'Talk About Yourself', description: 'Use pronouns in speech', xp: 10, content: {
              prompt: 'Say 3 sentences about yourself using "ich": "Ich heiße... Ich komme aus... Ich wohne in..."',
              tips: ['Use "ich" for all three sentences', 'Speak slowly and clearly', 'Pronounce "ch" softly']
            }},
            { id: 'a1w2d1t7', type: 'quickwin', title: 'Quick Win: Fun Fact', description: 'Did you know?', xp: 5, content: {} },
          ]
        },
        {
          day: 2,
          title: 'Present Tense Conjugation',
          tasks: [
            { id: 'a1w2d2t1', type: 'flashcards', title: 'Warm Up: Pronouns', description: 'Review personal pronouns', xp: 5, content: { cards: [
              { front: 'ich', back: 'I' },
              { front: 'du', back: 'you (informal)' },
              { front: 'er/sie/es', back: 'he/she/it' },
              { front: 'wir', back: 'we' },
            ]}},
            { id: 'a1w2d2t2', type: 'grammar', title: 'Regular Verb Conjugation', description: 'How to conjugate regular verbs', xp: 15, content: {
              rule: 'Remove the -en ending from the verb, then add personal endings: -e, -st, -t, -en, -t, -en.',
              examples: [
                { german: 'lernen (to learn)', english: 'ich lern-e, du lern-st, er/sie lern-t' },
                { german: 'machen (to make/do)', english: 'ich mach-e, du mach-st, er/sie mach-t' },
                { german: 'spielen (to play)', english: 'ich spiel-e, du spiel-st, er/sie spiel-t' },
                { german: 'wohnen (to live)', english: 'ich wohn-e, du wohn-st, er/sie wohn-t' },
              ],
              note: 'Regular verbs are predictable. Once you know the pattern, you can conjugate any regular verb!'
            }},
            { id: 'a1w2d2t3', type: 'vocabulary', title: 'Common Regular Verbs', description: '10 verbs you\'ll use every day', xp: 15, content: { items: [
              { german: 'lernen', english: 'to learn', pronunciation: 'LERN-en' },
              { german: 'machen', english: 'to make/do', pronunciation: 'MA-khen' },
              { german: 'spielen', english: 'to play', pronunciation: 'SHPEE-len' },
              { german: 'wohnen', english: 'to live', pronunciation: 'VO-nen' },
              { german: 'arbeiten', english: 'to work', pronunciation: 'AR-bye-ten' },
              { german: 'kommen', english: 'to come', pronunciation: 'KO-men' },
              { german: 'fahren', english: 'to drive/go', pronunciation: 'FA-ren' },
              { german: 'essen', english: 'to eat', pronunciation: 'ES-en' },
              { german: 'trinken', english: 'to drink', pronunciation: 'TRIN-ken' },
              { german: 'lesen', english: 'to read', pronunciation: 'LAY-zen' },
            ]}},
            { id: 'a1w2d2t4', type: 'quiz', title: 'Conjugation Quiz', description: 'Test your conjugation skills', xp: 10, content: { questions: [
              { question: '"Ich ___ Deutsch." (lernen)', options: ['lerne', 'lernst', 'lernt', 'lernen'], correct: 0 },
              { question: '"Du ___ Fußball." (spielen)', options: ['spiele', 'spielst', 'spielt', 'spielen'], correct: 1 },
              { question: '"Er ___ in Berlin." (wohnen)', options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], correct: 2 },
              { question: '"Wir ___ Kaffee." (trinken)', options: ['trinke', 'trinkst', 'trinkt', 'trinken'], correct: 3 },
              { question: '"Sie ___ gerne." (arbeiten, she)', options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'], correct: 2 },
            ]}},
            { id: 'a1w2d2t5', type: 'fillblank', title: 'Verb Drill', description: 'Conjugate correctly', xp: 10, content: { sentences: [
              { text: 'Ich ___ jeden Tag. (lernen)', answer: 'lerne', hint: 'I learn' },
              { text: 'Du ___ viel. (arbeiten)', answer: 'arbeitest', hint: 'you work' },
              { text: 'Er ___ gern Fußball. (spielen)', answer: 'spielt', hint: 'he plays' },
              { text: 'Wir ___ in München. (wohnen)', answer: 'wohnen', hint: 'we live' },
            ]}},
            { id: 'a1w2d2t6', type: 'writing', title: 'Write About Your Day', description: 'Write 5 sentences using different verbs', xp: 10, content: {
              prompt: 'Write about what you do every day using at least 3 different verbs.',
              example: 'Ich wohne in Hamburg. Ich arbeite als Lehrer. Ich lerne Deutsch. Ich lese gern. Ich esse Pizza.',
              tips: ['Use "ich" with the correct verb ending', 'Mix different verbs', 'Keep sentences simple']
            }},
            { id: 'a1w2d2t7', type: 'quickwin', title: 'Quick Win: Verb Joke', description: 'A joke about verbs!', xp: 5, content: {} },
          ]
        },
        {
          day: 3,
          title: 'Articles: der, die, das',
          tasks: [
            { id: 'a1w2d3t1', type: 'flashcards', title: 'Warm Up: Verbs', description: 'Review verb conjugations', xp: 5, content: { cards: [
              { front: 'ich lerne', back: 'I learn' },
              { front: 'du spielst', back: 'you play' },
              { front: 'er wohnt', back: 'he lives' },
              { front: 'wir trinken', back: 'we drink' },
            ]}},
            { id: 'a1w2d3t2', type: 'grammar', title: 'German Articles', description: 'der (masc), die (fem), das (neut)', xp: 15, content: {
              rule: 'Every German noun has a gender: masculine (der), feminine (die), or neuter (das). You must learn the article WITH the noun.',
              examples: [
                { german: 'der Mann (blue) = the man', english: 'Masculine: der' },
                { german: 'die Frau (red) = the woman', english: 'Feminine: die' },
                { german: 'das Kind (green) = the child', english: 'Neuter: das' },
                { german: 'die Kinder = the children', english: 'Plural always uses "die"' },
              ],
              note: 'Color coding: blue = der, red = die, green = das. Always learn nouns with their article!'
            }},
            { id: 'a1w2d3t3', type: 'vocabulary', title: 'Common Nouns with Articles', description: 'Learn nouns with their gender', xp: 15, content: { items: [
              { german: 'der Mann', english: 'the man', gender: 'der' },
              { german: 'die Frau', english: 'the woman', gender: 'die' },
              { german: 'das Kind', english: 'the child', gender: 'das' },
              { german: 'der Tisch', english: 'the table', gender: 'der' },
              { german: 'die Lampe', english: 'the lamp', gender: 'die' },
              { german: 'das Buch', english: 'the book', gender: 'das' },
              { german: 'der Stuhl', english: 'the chair', gender: 'der' },
              { german: 'die Tür', english: 'the door', gender: 'die' },
              { german: 'das Fenster', english: 'the window', gender: 'das' },
              { german: 'der Hund', english: 'the dog', gender: 'der' },
              { german: 'die Katze', english: 'the cat', gender: 'die' },
              { german: 'das Auto', english: 'the car', gender: 'das' },
            ]}},
            { id: 'a1w2d3t4', type: 'quiz', title: 'Article Quiz', description: 'Choose the correct article', xp: 10, content: { questions: [
              { question: '___ Frau ist nett.', options: ['Der', 'Die', 'Das', 'Den'], correct: 1 },
              { question: '___ Kind spielt.', options: ['Der', 'Die', 'Das', 'Den'], correct: 2 },
              { question: '___ Mann kommt.', options: ['Der', 'Die', 'Das', 'Den'], correct: 0 },
              { question: '___ Auto ist rot.', options: ['Der', 'Die', 'Das', 'Den'], correct: 2 },
              { question: '___ Tisch ist groß.', options: ['Der', 'Die', 'Das', 'Den'], correct: 0 },
            ]}},
            { id: 'a1w2d3t5', type: 'matching', title: 'Match Articles', description: 'Match nouns to their articles', xp: 10, content: { pairs: [
              { german: 'der Mann', english: 'masculine (blue)' },
              { german: 'die Frau', english: 'feminine (red)' },
              { german: 'das Kind', english: 'neuter (green)' },
              { german: 'der Hund', english: 'masculine (blue)' },
              { german: 'die Katze', english: 'feminine (red)' },
              { german: 'das Auto', english: 'neuter (green)' },
            ]}},
            { id: 'a1w2d3t6', type: 'speaking', title: 'Name the Article', description: 'Say the article for each noun', xp: 10, content: {
              prompt: 'Look at these words and say the article: Mann, Frau, Kind, Buch, Hund, Katze, Auto, Tisch.',
              tips: ['Remember: der (blue), die (red), das (green)', 'Say the article and noun together', 'Practice makes perfect!']
            }},
            { id: 'a1w2d3t7', type: 'quickwin', title: 'Quick Win: Gender Trick', description: 'A memory trick for articles', xp: 5, content: {} },
          ]
        },
        {
          day: 4,
          title: 'Present Tense Practice',
          tasks: [
            { id: 'a1w2d4t1', type: 'flashcards', title: 'Warm Up: Articles', description: 'Review noun genders', xp: 5, content: { cards: [
              { front: 'der Mann', back: 'the man (masculine)' },
              { front: 'die Frau', back: 'the woman (feminine)' },
              { front: 'das Kind', back: 'the child (neuter)' },
              { front: 'das Buch', back: 'the book (neuter)' },
            ]}},
            { id: 'a1w2d4t2', type: 'grammar', title: 'Using "sein" and "haben"', description: 'The two most important irregular verbs', xp: 15, content: {
              rule: '"sein" (to be) and "haben" (to have) are irregular but essential. Memorize them!',
              examples: [
                { german: 'ich bin, du bist, er/sie ist', english: 'I am, you are, he/she is' },
                { german: 'wir sind, ihr seid, sie/Sie sind', english: 'we are, you all are, they/you (formal) are' },
                { german: 'ich habe, du hast, er/sie hat', english: 'I have, you have, he/she has' },
                { german: 'wir haben, ihr habt, sie/Sie haben', english: 'we have, you all have, they/you (formal) have' },
              ],
              note: '"sein" is the most irregular verb in German. Practice it daily!'
            }},
            { id: 'a1w2d4t3', type: 'vocabulary', title: 'Adjectives', description: 'Basic describing words', xp: 15, content: { items: [
              { german: 'groß', english: 'big/tall', pronunciation: 'grohss' },
              { german: 'klein', english: 'small', pronunciation: 'klyn' },
              { german: 'gut', english: 'good', pronunciation: 'goot' },
              { german: 'schlecht', english: 'bad', pronunciation: 'SHLEKHT' },
              { german: 'schön', english: 'beautiful', pronunciation: 'shern' },
              { german: 'nett', english: 'nice', pronunciation: 'net' },
              { german: 'alt', english: 'old', pronunciation: 'alt' },
              { german: 'neu', english: 'new', pronunciation: 'noy' },
              { german: 'schnell', english: 'fast', pronunciation: 'shnel' },
              { german: 'langsam', english: 'slow', pronunciation: 'LAHNG-zahm' },
            ]}},
            { id: 'a1w2d4t4', type: 'fillblank', title: 'Complete the Sentences', description: 'Fill in sein, haben, or a regular verb', xp: 10, content: { sentences: [
              { text: 'Ich ___ Student. (sein)', answer: 'bin', hint: 'I am' },
              { text: 'Du ___ ein Buch. (haben)', answer: 'hast', hint: 'you have' },
              { text: 'Er ___ in Berlin. (wohnen)', answer: 'wohnt', hint: 'he lives' },
              { text: 'Wir ___ Deutsch. (lernen)', answer: 'lernen', hint: 'we learn' },
              { text: 'Sie ___ groß. (sein, she)', answer: 'ist', hint: 'she is' },
            ]}},
            { id: 'a1w2d4t5', type: 'listening', title: 'Describe People', description: 'Listen to descriptions', xp: 10, content: {
              clip: { title: 'Describing family members', source: 'Nicos Weg style', text: '"Mein Vater ist groß. Meine Mutter ist nett. Das Kind ist klein."' },
              questions: [
                { question: 'What is the father like?', options: ['small', 'big/tall', 'fast', 'young'], correct: 1 },
                { question: 'What article is used for "Vater"?', options: ['der', 'die', 'das', 'den'], correct: 0 },
              ]
            }},
            { id: 'a1w2d4t6', type: 'writing', title: 'Describe Your Family', description: 'Write 4 sentences about family', xp: 10, content: {
              prompt: 'Write 4 sentences describing your family members using adjectives and "sein".',
              example: 'Mein Vater ist groß. Meine Mutter ist nett. Mein Bruder ist alt. Ich bin klein.',
              tips: ['Use "mein/meine" before family words', 'Add an adjective after "ist"', 'Remember: der (masc), die (fem), das (neut)']
            }},
            { id: 'a1w2d4t7', type: 'quickwin', title: 'Quick Win: German Saying', description: 'A popular German saying', xp: 5, content: {} },
          ]
        },
        {
          day: 5,
          title: 'Sentence Building Practice',
          tasks: [
            { id: 'a1w2d5t1', type: 'flashcards', title: 'Warm Up: Adjectives', description: 'Review describing words', xp: 5, content: { cards: [
              { front: 'groß', back: 'big/tall' },
              { front: 'klein', back: 'small' },
              { front: 'schön', back: 'beautiful' },
              { front: 'schnell', back: 'fast' },
            ]}},
            { id: 'a1w2d5t2', type: 'grammar', title: 'Yes/No Questions', description: 'How to ask questions in German', xp: 15, content: {
              rule: 'Yes/No questions start with the verb. The intonation goes up at the end.',
              examples: [
                { german: 'Bist du Student?', english: 'Are you a student?' },
                { german: 'Hast du Geschwister?', english: 'Do you have siblings?' },
                { german: 'Wohnst du in Berlin?', english: 'Do you live in Berlin?' },
                { german: 'Sprechen Sie Deutsch?', english: 'Do you speak German? (formal)' },
              ],
              note: 'In questions, the verb moves to position 1.'
            }},
            { id: 'a1w2d5t3', type: 'vocabulary', title: 'Question Words', description: 'W-words for asking questions', xp: 15, content: { items: [
              { german: 'Wer?', english: 'Who?', pronunciation: 'vair' },
              { german: 'Was?', english: 'What?', pronunciation: 'vahs' },
              { german: 'Wo?', english: 'Where?', pronunciation: 'vo' },
              { german: 'Wann?', english: 'When?', pronunciation: 'vahn' },
              { german: 'Wie?', english: 'How?', pronunciation: 'vee' },
              { german: 'Warum?', english: 'Why?', pronunciation: 'va-ROOM' },
              { german: 'Wie viel?', english: 'How much?', pronunciation: 'vee feel' },
              { german: 'Woher?', english: 'Where from?', pronunciation: 'vo-HAIR' },
            ]}},
            { id: 'a1w2d5t4', type: 'quiz', title: 'Question Quiz', description: 'Form and answer questions', xp: 10, content: { questions: [
              { question: '"___ heißt du?" (What is your name?)', options: ['Wer', 'Was', 'Wie', 'Wo'], correct: 1 },
              { question: '"___ kommst du?" (Where are you from?)', options: ['Wo', 'Woher', 'Wann', 'Warum'], correct: 1 },
              { question: '"___ wohnst du?" (Where do you live?)', options: ['Wer', 'Was', 'Wo', 'Wie'], correct: 2 },
              { question: '"Bist du Student?" is a...', options: ['W-question', 'Yes/No question', 'Command', 'Statement'], correct: 1 },
            ]}},
            { id: 'a1w2d5t5', type: 'roleplay', title: 'Interview a Friend', description: 'Practice asking and answering', xp: 10, content: {
              scenario: 'You are interviewing a new friend. Ask them questions about themselves.',
              steps: ['Ask name: "Wie heißt du?"', 'Ask origin: "Woher kommst du?"', 'Ask residence: "Wo wohnst du?"', 'Ask language: "Sprichst du Deutsch?"', 'Ask job: "Was machst du beruflich?"']
            }},
            { id: 'a1w2d5t6', type: 'speaking', title: 'Ask and Answer', description: 'Practice questions out loud', xp: 10, content: {
              prompt: 'Ask yourself these questions and answer: "Wer bin ich? Was mache ich? Wo wohne ich?"',
              tips: ['Answer each question in a full sentence', 'Use the correct verb form', 'Speak naturally']
            }},
            { id: 'a1w2d5t7', type: 'quickwin', title: 'Quick Win: German Question', description: 'A fun question to ask friends', xp: 5, content: {} },
          ]
        },
        {
          day: 6,
          title: 'Putting It All Together',
          tasks: [
            { id: 'a1w2d6t1', type: 'flashcards', title: 'Warm Up: Question Words', description: 'Review W-words', xp: 5, content: { cards: [
              { front: 'Wer?', back: 'Who?' },
              { front: 'Was?', back: 'What?' },
              { front: 'Wo?', back: 'Where?' },
              { front: 'Wie?', back: 'How?' },
            ]}},
            { id: 'a1w2d6t2', type: 'grammar', title: 'Negation with "nicht" and "kein"', description: 'How to say no in German', xp: 15, content: {
              rule: 'Use "nicht" for verbs/adjectives, "kein" for nouns (replaces ein/one).',
              examples: [
                { german: 'Ich spreche nicht Deutsch.', english: 'I don\'t speak German.' },
                { german: 'Er kommt nicht.', english: 'He doesn\'t come.' },
                { german: 'Ich habe kein Auto.', english: 'I don\'t have a car. (kein replaces ein)' },
                { german: 'Das ist nicht gut.', english: 'That is not good.' },
              ],
              note: '"kein" is used like "ein" but negates: kein/einem/einer/eines.'
            }},
            { id: 'a1w2d6t3', type: 'vocabulary', title: 'Common Expressions', description: 'Everyday phrases to know', xp: 15, content: { items: [
              { german: 'Ich verstehe nicht.', english: 'I don\'t understand.' },
              { german: 'Können Sie das bitte wiederholen?', english: 'Can you repeat that, please?' },
              { german: 'Sprechen Sie Englisch?', english: 'Do you speak English?' },
              { german: 'Ich verstehe ein bisschen.', english: 'I understand a little.' },
              { german: 'Können Sie mir helfen?', english: 'Can you help me?' },
              { german: 'Wo ist die Toilette?', english: 'Where is the restroom?' },
              { german: 'Was bedeutet das?', english: 'What does that mean?' },
              { german: 'Ich brauche Hilfe.', english: 'I need help.' },
            ]}},
            { id: 'a1w2d6t4', type: 'fillblank', title: 'Negation Practice', description: 'Make sentences negative', xp: 10, content: { sentences: [
              { text: 'Ich spreche ___ Englisch. (not)', answer: 'nicht', hint: 'not' },
              { text: 'Er hat ___ Geschwister. (no)', answer: 'keine', hint: 'kein (feminine plural)' },
              { text: 'Das ist ___ gut. (not)', answer: 'nicht', hint: 'not' },
              { text: 'Ich habe ___ Zeit. (no)', answer: 'keine', hint: 'kein (feminine)' },
            ]}},
            { id: 'a1w2d6t5', type: 'listening', title: 'Understanding Help Requests', description: 'Listen to people asking for help', xp: 10, content: {
              clip: { title: 'Tourist asking for directions', source: 'Real-life scenario', text: '"Entschuldigung, ich verstehe nicht. Können Sie das bitte wiederholen? Wo ist der Bahnhof?"' },
              questions: [
                { question: 'What does the tourist need?', options: ['food', 'directions to the train station', 'a doctor', 'money'], correct: 1 },
                { question: 'What phrase does the tourist use to ask for repetition?', options: ['Was bedeutet das?', 'Können Sie das bitte wiederholen?', 'Sprechen Sie Englisch?', 'Wo ist das?'], correct: 1 },
              ]
            }},
            { id: 'a1w2d6t6', type: 'roleplay', title: 'Help a Tourist', description: 'Practice helping someone in German', xp: 10, content: {
              scenario: 'A tourist is lost and asks you for help. Respond in German.',
              steps: ['Tourist: "Entschuldigung, wo ist der Bahnhof?"', 'You: "Gehen Sie geradeaus und dann links."', 'Tourist: "Danke!"', 'You: "Bitte schön! Schönen Tag noch!"']
            }},
            { id: 'a1w2d6t7', type: 'quickwin', title: 'Quick Win: Achievement', description: 'You\'re doing great!', xp: 5, content: {} },
          ]
        },
        {
          day: 7,
          title: 'Mini Challenge: Week 2 Review',
          tasks: [
            { id: 'a1w2d7t1', type: 'review', title: 'Week 2 Review Quiz', description: 'Comprehensive review', xp: 25, content: { questions: [
              { question: '"Ich ___ Student." (sein)', options: ['bin', 'bist', 'ist', 'sind'], correct: 0 },
              { question: 'Which article is feminine?', options: ['der', 'die', 'das', 'den'], correct: 1 },
              { question: '"Du ___ Deutsch." (sprechen)', options: ['spreche', 'sprichst', 'spricht', 'sprechen'], correct: 1 },
              { question: '"Wo ___ du?" (wohnen)', options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], correct: 1 },
              { question: '"Was ___ das?" (bedeuten)', options: ['bedeute', 'bedeutest', 'bedeutet', 'bedeuten'], correct: 2 },
              { question: '"Ich habe ___ Auto." (kein)', options: ['kein', 'keine', 'keinen', 'keiner'], correct: 0 },
              { question: '"___ heißt du?" (What)', options: ['Wer', 'Was', 'Wo', 'Wie'], correct: 1 },
              { question: '"Er ___ in Berlin." (wohnen)', options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], correct: 2 },
              { question: 'Which is irregular?', options: ['lernen', 'haben', 'spielen', 'machen'], correct: 1 },
              { question: '"___ ist das?" (Where)', options: ['Wer', 'Was', 'Wo', 'Wie'], correct: 2 },
            ]}},
            { id: 'a1w2d7t2', type: 'fun', title: '🎉 Week 2 Complete!', description: 'You earned bonus content!', xp: 5, content: {
              facts: [
                '📚 Germans love reading. There are over 90,000 new books published in Germany every year!',
                '🚂 Germany has one of the best train networks in Europe. The ICE can reach 300 km/h!',
                '🎄 Many Christmas traditions come from Germany: Christmas trees, gingerbread, and Advent calendars.',
                '⚽ Football (soccer) is the national sport. The Bundesliga is one of the top leagues in the world!',
                '🎓 Education is free in Germany, even for international students at public universities!',
              ]
            }},
          ]
        },
      ]
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      id: i + 3,
      title: [
        'Tagesablauf — Daily Routines',
        'Familie & Freunde — Family & Friends',
        'Einkaufen — Shopping & Dining',
        'Unterwegs — Travel & Directions',
        'Modal & Trennbare Verben — Modal & Separable Verbs',
        'Prüfung — A1 Mock Exam',
      ][i],
      icon: ['⏰', '👨‍👩‍👧‍👦', '🛒', '🗺️', '🔧', '📝'][i],
      theme: [
        'Daily routines, eating, working, leisure, expressing likes with mögen',
        'Family members, describing relationships, possessive pronouns',
        'Grocery, clothing, restaurant vocabulary, polite requests',
        'Transportation, directions, maps, accusative case introduction',
        'Modal verbs, separable verbs, dative case, time expressions',
        'Full A1 mock exam: Lesen, Hören, Schreiben, Sprechen',
      ][i],
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: `Lesson ${i + 3} resources` },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Listening practice videos' },
      ],
      days: Array.from({ length: 7 }, (_, d) => ({
        day: d + 1,
        title: d === 6 ? `Mini Challenge: Week ${i + 3} Review` : `Week ${i + 3} — Day ${d + 1}`,
        tasks: [
          { id: `a1w${i+3}d${d+1}t1`, type: 'flashcards', title: 'Warm Up', description: 'Review previous vocabulary', xp: 5, content: { cards: [] } },
          { id: `a1w${i+3}d${d+1}t2`, type: 'grammar', title: `Grammar: ${['routines', 'possessives', 'polite requests', 'accusative', 'modal verbs', 'exam prep'][i]}`, description: 'Learn new grammar concept', xp: 15, content: { rule: '', examples: [], note: '' } },
          { id: `a1w${i+3}d${d+1}t3`, type: 'vocabulary', title: `Vocabulary: ${['daily life', 'family', 'shopping', 'travel', 'verbs', 'exam'][i]}`, description: 'New words and phrases', xp: 15, content: { items: [] } },
          { id: `a1w${i+3}d${d+1}t4`, type: d === 6 ? 'review' : 'quiz', title: d === 6 ? 'Week Review Quiz' : 'Practice Quiz', description: 'Test your knowledge', xp: 10, content: { questions: [] } },
          { id: `a1w${i+3}d${d+1}t5`, type: 'listening', title: 'Listening Practice', description: 'Listen and answer questions', xp: 10, content: { clip: {}, questions: [] } },
          { id: `a1w${i+3}d${d+1}t6`, type: 'speaking', title: 'Speaking Practice', description: 'Practice pronunciation and phrases', xp: 10, content: { prompt: '', tips: [] } },
          { id: `a1w${i+3}d${d+1}t7`, type: 'quickwin', title: 'Quick Win', description: 'End on a fun note!', xp: 5, content: {} },
        ]
      }))
    }))
  ]
};

export default a1Data;
