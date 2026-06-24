const a1FastTrackData = {
  level: 'A1',
  title: 'A1 — Beginner (Fast Track)',
  subtitle: 'Deutsch Anfänger — Schnellkurs',
  description: 'Master A1 German in 6 weeks. This track compresses review days and merges related topics for faster progress.',
  color: '#5C8AC4',
  weeks: [
    {
      id: 1,
      title: 'Hallo! Greetings & Basics',
      icon: '👋',
      theme: 'Pronunciation, Alphabet, Greetings & Numbers',
      unlocked: true,
      days: [
        {
          day: 1,
          title: 'German Alphabet & Pronunciation',
          tasks: [
            {
              id: 'ftw1d1t1',
              type: 'vocabulary',
              title: 'German Alphabet',
              description: 'Learn the 26 letters and 4 special characters (ä, ö, ü, ß)',
              xp: 15,
              content: {
                items: [
                  { german: 'A', english: 'ah', pronunciation: 'ah (like "father")' },
                  { german: 'B', english: 'beh', pronunciation: 'beh (softer than English)' },
                  { german: 'C', english: 'tsgeh', pronunciation: 'tsgeh' },
                  { german: 'D', english: 'deh', pronunciation: 'deh' },
                  { german: 'E', english: 'eh', pronunciation: 'eh (like "bed")' },
                  { german: 'F', english: 'eff', pronunciation: 'eff' },
                  { german: 'G', english: 'geh', pronunciation: 'geh (hard g)' },
                  { german: 'H', english: 'hah', pronunciation: 'hah' },
                  { german: 'I', english: 'eeh', pronunciation: 'eeh (like "see")' },
                  { german: 'J', english: 'yot', pronunciation: 'yot (like "yes")' },
                  { german: 'K', english: 'kah', pronunciation: 'kah' },
                  { german: 'L', english: 'ell', pronunciation: 'ell' },
                  { german: 'M', english: 'emm', pronunciation: 'emm' },
                  { german: 'N', english: 'enn', pronunciation: 'enn' },
                  { german: 'O', english: 'oh', pronunciation: 'oh' },
                  { german: 'P', english: 'peh', pronunciation: 'peh' },
                  { german: 'Q', english: 'koo', pronunciation: 'koo' },
                  { german: 'R', english: 'err', pronunciation: 'err (rolled)' },
                  { german: 'S', english: 'ess', pronunciation: 'ess' },
                  { german: 'T', english: 'teh', pronunciation: 'teh' },
                  { german: 'U', english: 'ooh', pronunciation: 'ooh' },
                  { german: 'V', english: 'fow', pronunciation: 'fow (like "f")' },
                  { german: 'W', english: 'veh', pronunciation: 'veh (like "v")' },
                  { german: 'X', english: 'iks', pronunciation: 'iks' },
                  { german: 'Y', english: 'üpsilon', pronunciation: 'üpsilon' },
                  { german: 'Z', english: 'tsett', pronunciation: 'tsett' },
                  { german: 'Ä', english: 'eh', pronunciation: 'like "e" in "bed"' },
                  { german: 'Ö', english: 'ö', pronunciation: 'round lips, say "e"' },
                  { german: 'Ü', english: 'ü', pronunciation: 'round lips, say "ee"' },
                  { german: 'ß', english: 'Eszett', pronunciation: 'sharp "s" sound' },
                ]
              }
            },
            {
              id: 'ftw1d1t2',
              type: 'quiz',
              title: 'Letter Sound Match',
              description: 'Match German letters to their sounds',
              xp: 10,
              content: {
                questions: [
                  { question: 'How do you pronounce "W" in German?', options: ['vay', 'veh', 'double-u', 'way'], correct: 1 },
                  { question: 'What sound does "J" make in German?', options: ['jay', 'yot', 'jot', 'yeh'], correct: 1 },
                  { question: 'How is "V" pronounced in German?', options: ['vee', 'fow', 'vuh', 'veh'], correct: 1 },
                  { question: '"ß" is called?', options: ['sharp S', 'Eszett', 'beta', 'ss'], correct: 1 },
                  { question: 'How do you pronounce "CH" in "Bach"?', options: ['ch (like check)', 'sh', 'k', 'ach (throat)'], correct: 3 },
                ]
              }
            },
          ]
        },
        {
          day: 2,
          title: 'Greetings, Introductions & Numbers',
          tasks: [
            {
              id: 'ftw1d2t1',
              type: 'vocabulary',
              title: 'Greetings & Introductions',
              description: 'Essential greetings and self-introduction phrases',
              xp: 15,
              content: {
                items: [
                  { german: 'Hallo!', english: 'Hello!' },
                  { german: 'Guten Morgen!', english: 'Good morning!' },
                  { german: 'Guten Tag!', english: 'Good day!' },
                  { german: 'Guten Abend!', english: 'Good evening!' },
                  { german: 'Tschüss!', english: 'Bye!' },
                  { german: 'Auf Wiedersehen!', english: 'Goodbye!' },
                  { german: 'Wie geht es Ihnen?', english: 'How are you? (formal)' },
                  { german: 'Mir geht es gut.', english: 'I\'m doing well.' },
                  { german: 'Ich heiße...', english: 'My name is...' },
                  { german: 'Wie heißt du?', english: 'What is your name? (informal)' },
                  { german: 'Ich komme aus...', english: 'I come from...' },
                  { german: 'Freut mich!', english: 'Nice to meet you!' },
                  { german: 'Bitte', english: 'Please / You\'re welcome' },
                  { german: 'Danke', english: 'Thank you' },
                  { german: 'Entschuldigung', english: 'Excuse me' },
                ]
              }
            },
            {
              id: 'ftw1d2t2',
              type: 'vocabulary',
              title: 'Numbers 0-20',
              description: 'Learn German numbers from 0 to 20',
              xp: 15,
              content: {
                items: [
                  { german: 'null', english: '0' },
                  { german: 'eins', english: '1' },
                  { german: 'zwei', english: '2' },
                  { german: 'drei', english: '3' },
                  { german: 'vier', english: '4' },
                  { german: 'fünf', english: '5' },
                  { german: 'sechs', english: '6' },
                  { german: 'sieben', english: '7' },
                  { german: 'acht', english: '8' },
                  { german: 'neun', english: '9' },
                  { german: 'zehn', english: '10' },
                  { german: 'elf', english: '11' },
                  { german: 'zwölf', english: '12' },
                  { german: 'dreizehn', english: '13' },
                  { german: 'vierzehn', english: '14' },
                  { german: 'fünfzehn', english: '15' },
                  { german: 'sechzehn', english: '16' },
                  { german: 'siebzehn', english: '17' },
                  { german: 'achtzehn', english: '18' },
                  { german: 'neunzehn', english: '19' },
                  { german: 'zwanzig', english: '20' },
                ]
              }
            },
            {
              id: 'ftw1d2t3',
              type: 'quiz',
              title: 'Greetings & Numbers Quiz',
              description: 'Test your basics',
              xp: 10,
              content: {
                questions: [
                  { question: 'Which greeting is used in the morning?', options: ['Guten Abend', 'Guten Morgen', 'Gute Nacht', 'Tschüss'], correct: 1 },
                  { question: 'What is "fünf" in English?', options: ['four', 'five', 'six', 'fifteen'], correct: 1 },
                  { question: '"Wie heißt du?" means...', options: ['Where are you?', 'What is your name?', 'How are you?', 'Who are you?'], correct: 1 },
                  { question: 'How do you say "twelve" in German?', options: ['zwoelf', 'zwölf', 'zwolf', 'zwanzig'], correct: 1 },
                  { question: '"Danke schön" means...', options: ['No problem', 'Excuse me', 'Thank you very much', 'You\'re welcome'], correct: 2 },
                ]
              }
            },
          ]
        },
        {
          day: 3,
          title: 'Numbers 21-100 & Polite Expressions',
          tasks: [
            {
              id: 'ftw1d3t1',
              type: 'vocabulary',
              title: 'Numbers 21-100',
              description: 'Learn the pattern for German numbers 21-100',
              xp: 15,
              content: {
                items: [
                  { german: 'einundzwanzig', english: '21 (one-and-twenty)' },
                  { german: 'zweiundzwanzig', english: '22' },
                  { german: 'dreißig', english: '30' },
                  { german: 'vierzig', english: '40' },
                  { german: 'fünfzig', english: '50' },
                  { german: 'sechzig', english: '60' },
                  { german: 'siebzig', english: '70' },
                  { german: 'achtzig', english: '80' },
                  { german: 'neunzig', english: '90' },
                  { german: 'hundert', english: '100' },
                ],
                note: 'Pattern: units + "und" + tens (e.g., 25 = fünfundzwanzig)'
              }
            },
            {
              id: 'ftw1d3t2',
              type: 'matching',
              title: 'Polite Expressions Match',
              description: 'Match German polite phrases',
              xp: 10,
              content: {
                pairs: [
                  { german: 'Bitte', english: 'Please / You\'re welcome' },
                  { german: 'Danke', english: 'Thank you' },
                  { german: 'Entschuldigung', english: 'Excuse me' },
                  { german: 'Genau', english: 'Exactly' },
                  { german: 'Ja', english: 'Yes' },
                  { german: 'Nein', english: 'No' },
                ]
              }
            },
            {
              id: 'ftw1d3t3',
              type: 'speaking',
              title: 'Introduce Yourself',
              description: 'Practice speaking: introduce yourself in German',
              xp: 20,
              content: {
                prompt: 'Say: "Hallo! Ich heiße [your name]. Ich komme aus [your country]. Ich bin [number] Jahre alt. Freut mich!"',
                tips: ['Speak slowly and clearly', 'Roll the "r" slightly', 'Pronounce "ch" softly like in "Bach"']
              }
            },
          ]
        },
        {
          day: 4,
          title: 'Week 1 Review',
          tasks: [
            {
              id: 'ftw1d4t1',
              type: 'review',
              title: 'Week 1 Review Quiz',
              description: 'Comprehensive review of alphabet, greetings, numbers',
              xp: 25,
              content: {
                questions: [
                  { question: 'How do you say "Hello!" in German?', options: ['Tschüss!', 'Hallo!', 'Danke!', 'Bitte!'], correct: 1 },
                  { question: 'What does "Guten Morgen" mean?', options: ['Good night', 'Goodbye', 'Good morning', 'Good evening'], correct: 2 },
                  { question: '"Ich komme aus..." means...', options: ['I live in...', 'I speak...', 'I come from...', 'My name is...'], correct: 2 },
                  { question: 'How do you say "five" in German?', options: ['vier', 'fünf', 'sechs', 'fünfzig'], correct: 1 },
                  { question: '35 in German is...', options: ['fünfunddreißig', 'dreißigfünf', 'fünfzigdrei', 'dreiundfünfzig'], correct: 0 },
                  { question: '"Danke schön" means...', options: ['No problem', 'Excuse me', 'Thank you very much', 'You\'re welcome'], correct: 2 },
                  { question: 'How do you ask someone\'s name informally?', options: ['Wie heißen Sie?', 'Wie heißt du?', 'Was ist dein Name?', 'Wer bist du?'], correct: 1 },
                  { question: '"Entschuldigung" means...', options: ['Thank you', 'Please', 'Excuse me', 'Exactly'], correct: 2 },
                ]
              }
            },
            {
              id: 'ftw1d4t2',
              type: 'fun',
              title: '🎉 Bonus: German Fun Facts',
              description: 'You earned some fun content!',
              xp: 5,
              content: {
                facts: [
                  '🍔 The word "Kindergarten" is actually German! It means "children\'s garden."',
                  '🚗 Germans love cars — "Autobahn" is famous for having no speed limit in some sections!',
                  '📚 The longest German word in the Duden is: "Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz" (63 letters!)',
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
      title: 'Familie & Farben — Family & Colors',
      icon: '👨‍👩‍👧‍👦',
      theme: 'Family members, possessive pronouns, colors, numbers 100-1000',
      unlocked: false,
      days: [
        {
          day: 1,
          title: 'Family Members',
          tasks: [
            { id: 'ftw2d1t1', type: 'vocabulary', title: 'Family Vocabulary', description: 'Learn family member words in German', xp: 15, content: { items: [
              { german: 'die Mutter', english: 'mother', gender: 'die' },
              { german: 'der Vater', english: 'father', gender: 'der' },
              { german: 'die Eltern', english: 'parents', gender: 'die' },
              { german: 'der Bruder', english: 'brother', gender: 'der' },
              { german: 'die Schwester', english: 'sister', gender: 'die' },
              { german: 'die Geschwister', english: 'siblings', gender: 'die' },
              { german: 'die Großmutter / Oma', english: 'grandmother', gender: 'die' },
              { german: 'der Großvater / Opa', english: 'grandfather', gender: 'der' },
              { german: 'das Kind', english: 'child', gender: 'das' },
              { german: 'der Sohn', english: 'son', gender: 'der' },
              { german: 'die Tochter', english: 'daughter', gender: 'die' },
            ]}},
            { id: 'ftw2d1t2', type: 'grammar', title: 'Possessive Pronouns', description: 'Learn mein, dein, sein, ihr', xp: 20, content: {
              rule: 'Possessive pronouns match the gender of the noun they modify.',
              examples: [
                { german: 'Mein Name ist Anna.', english: 'My name is Anna.' },
                { german: 'Das ist mein Bruder.', english: 'That is my brother.' },
                { german: 'Ist das deine Schwester?', english: 'Is that your sister?' },
              ],
              note: 'mein (my), dein (your informal), sein (his), ihr (her/their informal)'
            }},
            { id: 'ftw2d1t3', type: 'quiz', title: 'Family Quiz', description: 'Test family vocabulary', xp: 10, content: { questions: [
              { question: '"Die Mutter" means...', options: ['father', 'mother', 'sister', 'brother'], correct: 1 },
              { question: 'How do you say "my" before a masculine noun?', options: ['dein', 'mein', 'sein', 'ihr'], correct: 1 },
              { question: '"Geschwister" means...', parents: ['parents', 'grandparents', 'siblings', 'children'], correct: 2 },
              { question: '"Die Tochter" means...', options: ['son', 'daughter', 'mother', 'sister'], correct: 1 },
            ]}},
          ]
        },
        {
          day: 2,
          title: 'Colors & Numbers 100-1000',
          tasks: [
            { id: 'ftw2d2t1', type: 'vocabulary', title: 'Colors', description: 'Learn German colors', xp: 15, content: { items: [
              { german: 'rot', english: 'red' },
              { german: 'blau', english: 'blue' },
              { german: 'grün', english: 'green' },
              { german: 'gelb', english: 'yellow' },
              { german: 'schwarz', english: 'black' },
              { german: 'weiß', english: 'white' },
              { german: 'orange', english: 'orange' },
              { german: 'lila / violett', english: 'purple' },
              { german: 'braun', english: 'brown' },
              { german: 'grau', english: 'gray' },
              { german: 'rosa / pink', english: 'pink' },
            ]}},
            { id: 'ftw2d2t2', type: 'vocabulary', title: 'Numbers 100-1000', description: 'Learn hundreds in German', xp: 15, content: { items: [
              { german: 'hundert', english: '100' },
              { german: 'zweihundert', english: '200' },
              { german: 'dreihundert', english: '300' },
              { german: 'vierhundert', english: '400' },
              { german: 'fünfhundert', english: '500' },
              { german: 'sechshundert', english: '600' },
              { german: 'siebenhundert', english: '700' },
              { german: 'achthundert', english: '800' },
              { german: 'neunhundert', english: '900' },
              { german: 'tausend', english: '1000' },
            ]}},
            { id: 'ftw2d2t3', type: 'matching', title: 'Color Match', description: 'Match colors in German', xp: 10, content: { pairs: [
              { german: 'rot', english: 'red' },
              { german: 'blau', english: 'blue' },
              { german: 'grün', english: 'green' },
              { german: 'gelb', english: 'yellow' },
              { german: 'schwarz', english: 'black' },
              { german: 'weiß', english: 'white' },
            ]}},
          ]
        },
        {
          day: 3,
          title: 'Adjective Basics & Verb Conjugation',
          tasks: [
            { id: 'ftw2d3t1', type: 'grammar', title: 'Present Tense Conjugation', description: 'Regular verb conjugation (lernen, machen, spielen)', xp: 20, content: {
              rule: 'Remove -en from the verb, add the personal ending.',
              examples: [
                { german: 'ich lern-e', english: 'I learn' },
                { german: 'du lern-st', english: 'you learn (informal)' },
                { german: 'er/sie lern-t', english: 'he/she learns' },
                { german: 'wir lern-en', english: 'we learn' },
                { german: 'ihr lern-t', english: 'you all learn' },
                { german: 'sie/Sie lern-en', english: 'they/you (formal) learn' },
              ],
              note: 'Regular verbs follow this pattern. Irregular verbs have stem changes.'
            }},
            { id: 'ftw2d3t2', type: 'fillblank', title: 'Conjugation Drill', description: 'Fill in the correct verb form', xp: 15, content: { sentences: [
              { text: 'Ich ___ Deutsch. (lernen)', answer: 'lerne', hint: 'I learn' },
              { text: 'Du ___ Fußball. (spielen)', answer: 'spielst', hint: 'you play' },
              { text: 'Er ___ einen Kaffee. (trinken)', answer: 'trinkt', hint: 'he drinks' },
              { text: 'Wir ___ in Berlin. (wohnen)', answer: 'wohnen', hint: 'we live' },
            ]}},
            { id: 'ftw2d3t3', type: 'quiz', title: 'Grammar Quiz', description: 'Test conjugation knowledge', xp: 10, content: { questions: [
              { question: '"Ich ___ Deutsch." (lernen)', options: ['lerne', 'lernst', 'lernt', 'lernen'], correct: 0 },
              { question: '"Du ___ Sport." (spielen)', options: ['spiele', 'spielst', 'spielt', 'spielen'], correct: 1 },
              { question: '"Sie ___ Kaffee." (trinken, she)', options: ['trinke', 'trinkst', 'trinkt', 'trinken'], correct: 2 },
            ]}},
          ]
        },
        {
          day: 4,
          title: 'Week 2 Review',
          tasks: [
            { id: 'ftw2d4t1', type: 'review', title: 'Week 2 Review', description: 'Review family, colors, numbers, and grammar', xp: 25, content: { questions: [
              { question: '"Die Mutter" means...', options: ['father', 'mother', 'sister', 'brother'], correct: 1 },
              { question: '"Grün" means...', options: ['red', 'blue', 'green', 'yellow'], correct: 2 },
              { question: '"Ich ___ Deutsch." (lernen)', options: ['lerne', 'lernst', 'lernt', 'lernen'], correct: 0 },
              { question: '"Tausend" is the number...', options: ['100', '500', '1000', '10000'], correct: 2 },
              { question: '"Mein Bruder" means...', options: ['my sister', 'my brother', 'my father', 'my mother'], correct: 1 },
            ]}},
          ]
        },
      ]
    },
    {
      id: 3,
      title: 'Essen & Alltag — Food & Daily Life',
      icon: '🍕',
      theme: 'Food vocabulary, ordering, daily routines, telling time',
      unlocked: false,
      days: [
        {
          day: 1,
          title: 'Food & Drinks',
          tasks: [
            { id: 'ftw3d1t1', type: 'vocabulary', title: 'Food Vocabulary', description: 'Common food and drink words', xp: 15, content: { items: [
              { german: 'das Brot', english: 'bread', gender: 'das' },
              { german: 'der Käse', english: 'cheese', gender: 'der' },
              { german: 'das Wasser', english: 'water', gender: 'das' },
              { german: 'der Kaffee', english: 'coffee', gender: 'der' },
              { german: 'der Tee', english: 'tea', gender: 'der' },
              { german: 'der Apfel', english: 'apple', gender: 'der' },
              { german: 'die Milch', english: 'milk', gender: 'die' },
              { german: 'das Ei', english: 'egg', gender: 'das' },
              { german: 'das Fleisch', english: 'meat', gender: 'das' },
              { german: 'der Fisch', english: 'fish', gender: 'der' },
              { german: 'die Suppe', english: 'soup', gender: 'die' },
              { german: 'der Salat', english: 'salad', gender: 'der' },
            ]}},
            { id: 'ftw3d1t2', type: 'roleplay', title: 'Ordering at a Restaurant', description: 'Practice ordering food in German', xp: 20, content: {
              scenario: 'You are at a German restaurant and want to order food and drinks.',
              steps: ['Greet: "Guten Tag!"', 'Ask for menu: "Die Speisekarte, bitte."', 'Order: "Ich möchte ein Brot, bitte." (I would like...)', 'Drink: "Ein Wasser, bitte."', 'Say thanks: "Danke schön!"', 'Pay: "Zahlen, bitte." (The bill, please)']
            }},
            { id: 'ftw3d1t3', type: 'quiz', title: 'Food Quiz', description: 'Test food vocabulary', xp: 10, content: { questions: [
              { question: '"Das Brot" means...', options: ['cheese', 'bread', 'water', 'milk'], correct: 1 },
              { question: '"Ich möchte..." means...', options: ['I have', 'I want', 'I know', 'I can'], correct: 1 },
              { question: '"Zahlen, bitte" means...', options: ['No thanks', 'The bill, please', 'More water', 'Goodbye'], correct: 1 },
            ]}},
          ]
        },
        {
          day: 2,
          title: 'Daily Routine & Telling Time',
          tasks: [
            { id: 'ftw3d2t1', type: 'vocabulary', title: 'Daily Activities', description: 'Common daily routine verbs', xp: 15, content: { items: [
              { german: 'aufstehen', english: 'to get up' },
              { german: 'frühstücken', english: 'to have breakfast' },
              { german: 'arbeiten', english: 'to work' },
              { german: 'lernen', english: 'to learn/study' },
              { german: 'kochen', english: 'to cook' },
              { german: 'essen', english: 'to eat' },
              { german: 'schlafen', english: 'to sleep' },
              { german: 'fernsehen', english: 'to watch TV' },
              { german: 'einkaufen', english: 'to shop' },
              { german: 'sport treiben', english: 'to do sports' },
            ]}},
            { id: 'ftw3d2t2', type: 'vocabulary', title: 'Telling Time', description: 'How to tell time in German', xp: 15, content: { items: [
              { german: ' Wie spät ist es?', english: 'What time is it?' },
              { german: 'Es ist eins.', english: 'It is one o\'clock.' },
              { german: 'Es ist halb drei.', english: 'It is half past two (2:30).' },
              { german: 'Es ist Viertel nach vier.', english: 'It is quarter past four (4:15).' },
              { german: 'Es ist Viertel vor fünf.', english: 'It is quarter to five (4:45).' },
              { german: 'am Morgen', english: 'in the morning' },
              { german: 'am Nachmittag', english: 'in the afternoon' },
              { german: 'am Abend', english: 'in the evening' },
            ]}},
            { id: 'ftw3d2t3', type: 'fillblank', title: 'Daily Routine Fill-in', description: 'Complete the sentences', xp: 15, content: { sentences: [
              { text: 'Ich ___ um 7 Uhr. (get up)', answer: 'stehe auf', hint: 'aufstehen (separable)' },
              { text: 'Ich ___ um 12 Uhr. (eat)', answer: 'esse', hint: 'essen' },
              { text: 'Um 22 Uhr ___. (sleep)', answer: 'schlafe ich', hint: 'schlafen (verb at end)' },
            ]}},
          ]
        },
        {
          day: 3,
          title: 'Accusative Case & Separable Verbs',
          tasks: [
            { id: 'ftw3d3t1', type: 'grammar', title: 'Accusative Case', description: 'Direct objects in the accusative', xp: 20, content: {
              rule: 'The accusative case is used for direct objects. Only masculine articles change (der -> den).',
              examples: [
                { german: 'Ich sehe den Mann.', english: 'I see the man. (der -> den)' },
                { german: 'Ich habe ein Buch.', english: 'I have a book. (no change for ein)' },
                { german: 'Er trinkt den Kaffee.', english: 'He drinks the coffee. (der -> den)' },
              ],
              note: 'der -> den, ein -> einen (masculine only). Everything else stays the same.'
            }},
            { id: 'ftw3d3t2', type: 'grammar', title: 'Separable Verbs', description: 'Verbs that split in main clauses', xp: 20, content: {
              rule: 'The prefix goes to the end of the main clause.',
              examples: [
                { german: 'Ich stehe um 7 Uhr auf.', english: 'I get up at 7. (aufstehen -> auf...)' },
                { german: 'Wir fahren nach Berlin.', english: 'We drive to Berlin. (fahren -> no split)' },
                { german: 'Er ruft seine Mutter an.', english: 'He calls his mother. (anrufen -> an...)' },
              ],
              note: 'Common separable prefixes: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-'
            }},
            { id: 'ftw3d3t3', type: 'quiz', title: 'Grammar Quiz', description: 'Test accusative and separable verbs', xp: 10, content: { questions: [
              { question: '"Ich sehe ___ Mann." (the man, accusative)', options: ['der', 'den', 'dem', 'des'], correct: 1 },
              { question: '"Ich ___ um 7 Uhr ___." (aufstehen)', options: ['aufstehe', 'stehe auf', 'aufstehen', 'stehe'], correct: 1 },
              { question: 'Which article changes in accusative?', options: ['die', 'das', 'der', 'die (all)'], correct: 2 },
            ]}},
          ]
        },
        {
          day: 4,
          title: 'Week 3 Review',
          tasks: [
            { id: 'ftw3d4t1', type: 'review', title: 'Week 3 Review', description: 'Food, daily life, time, grammar', xp: 25, content: { questions: [
              { question: '"Das Brot" means...', options: ['cheese', 'bread', 'water', 'milk'], correct: 1 },
              { question: '"Es ist halb drei" means...', options: ['2:30', '3:00', '3:30', '2:00'], correct: 0 },
              { question: 'In accusative, "der" becomes...', options: ['dem', 'den', 'des', 'die'], correct: 1 },
              { question: '"Ich stehe um 7 Uhr auf" — the verb prefix goes...', options: ['to the front', 'to the end', 'nowhere', 'to the middle'], correct: 1 },
              { question: '"Ich möchte ein Wasser" means...', options: ['I have water', 'I want a water', 'I drink water', 'I like water'], correct: 1 },
            ]}},
          ]
        },
      ]
    },
    {
      id: 4,
      title: 'Hobbys & Unterwegs — Hobbies & Getting Around',
      icon: '⚽',
      theme: 'Hobby vocabulary, modal verbs, directions, transportation',
      unlocked: false,
      days: [
        {
          day: 1,
          title: 'Hobbies & Modal Verbs',
          tasks: [
            { id: 'ftw4d1t1', type: 'vocabulary', title: 'Hobby Vocabulary', description: 'Common hobby words', xp: 15, content: { items: [
              { german: 'lesen', english: 'to read' },
              { german: 'schwimmen', english: 'to swim' },
              { german: 'reisen', english: 'to travel' },
              { german: 'musizieren', english: 'to play music' },
              { german: 'fotografieren', english: 'to take photos' },
              { german: 'wandern', english: 'to hike' },
              { german: 'kochen', english: 'to cook' },
              { german: 'tanzen', english: 'to dance' },
              { german: 'malen', english: 'to paint' },
              { german: 'programmieren', english: 'to program' },
            ]}},
            { id: 'ftw4d1t2', type: 'grammar', title: 'Modal Verbs', description: 'können, möchten, müssen, wollen, dürfen', xp: 20, content: {
              rule: 'Modal verbs go to position 2, the main verb goes to the end in infinitive form.',
              examples: [
                { german: 'Ich kann gut schwimmen.', english: 'I can swim well.' },
                { german: 'Ich möchte Deutsch lernen.', english: 'I would like to learn German.' },
                { german: 'Ich muss arbeiten.', english: 'I have to work.' },
                { german: 'Ich will nach Berlin fahren.', english: 'I want to go to Berlin.' },
                { german: 'Ich darf hier nicht rauchen.', english: 'I am not allowed to smoke here.' },
              ],
              note: 'Remember: the main verb stays at the end as an infinitive!'
            }},
            { id: 'ftw4d1t3', type: 'fillblank', title: 'Modal Verb Drill', description: 'Complete with correct modal verb', xp: 15, content: { sentences: [
              { text: 'Ich ___ gut Deutsch. (can)', answer: 'kann', hint: 'können' },
              { text: 'Ich ___ nach Hause fahren. (want to)', answer: 'will', hint: 'wollen' },
              { text: 'Ich ___ früh aufstehen. (have to)', answer: 'muss', hint: 'müssen' },
            ]}},
          ]
        },
        {
          day: 2,
          title: 'Directions & Transportation',
          tasks: [
            { id: 'ftw4d2t1', type: 'vocabulary', title: 'Directions', description: 'Direction and navigation words', xp: 15, content: { items: [
              { german: 'links', english: 'left' },
              { german: 'rechts', english: 'right' },
              { german: 'geradeaus', english: 'straight ahead' },
              { german: 'zurück', english: 'back' },
              { german: 'die Straße', english: 'street', gender: 'die' },
              { german: 'die Kreuzung', english: 'intersection', gender: 'die' },
              { german: 'die Ampel', english: 'traffic light', gender: 'die' },
              { german: 'der Bahnhof', english: 'train station', gender: 'der' },
              { german: 'der Flughafen', english: 'airport', gender: 'der' },
              { german: 'die Haltestelle', english: 'bus stop', gender: 'die' },
            ]}},
            { id: 'ftw4d2t2', type: 'vocabulary', title: 'Transportation', description: 'Ways to get around', xp: 15, content: { items: [
              { german: 'das Auto', english: 'car', gender: 'das' },
              { german: 'der Zug', english: 'train', gender: 'der' },
              { german: 'der Bus', english: 'bus', gender: 'der' },
              { german: 'das Fahrrad', english: 'bicycle', gender: 'das' },
              { german: 'das Flugzeug', english: 'airplane', gender: 'das' },
              { german: 'die U-Bahn', english: 'subway', gender: 'die' },
              { german: 'zu Fuß gehen', english: 'to walk' },
              { german: 'mit dem Zug fahren', english: 'to take the train' },
            ]}},
            { id: 'ftw4d2t3', type: 'roleplay', title: 'Asking for Directions', description: 'Practice asking for and giving directions', xp: 20, content: {
              scenario: 'You are lost in a German city and need to find the train station.',
              steps: ['Excuse: "Entschuldigung, wo ist der Bahnhof?"', 'Listen: "Gehen Sie geradeaus, dann links."', 'Confirm: "Danke! Nur zu Fuß?"', 'Thank: "Vielen Dank!"']
            }},
          ]
        },
        {
          day: 3,
          title: 'Dative Case Introduction',
          tasks: [
            { id: 'ftw4d3t1', type: 'grammar', title: 'Dative Case Basics', description: 'Indirect objects and dative articles', xp: 20, content: {
              rule: 'The dative case is used for indirect objects and after certain prepositions.',
              examples: [
                { german: 'Ich gebe dem Mann das Buch.', english: 'I give the man the book. (der -> dem)' },
                { german: 'Die Frau gibt der Kinder Geld.', english: 'The woman gives the children money. (die -> der)' },
                { german: 'Ich fahre mit dem Zug.', english: 'I travel by train. (mit + dative)' },
              ],
              note: 'der -> dem, die -> der, das -> dem, ein -> einem'
            }},
            { id: 'ftw4d3t2', type: 'fillblank', title: 'Dative Drill', description: 'Fill in the correct dative article', xp: 15, content: { sentences: [
              { text: 'Ich gebe ___ Mann das Buch. (the, m.)', answer: 'dem', hint: 'dative of der' },
              { text: 'Ich fahre mit ___ Zug. (the, m.)', answer: 'dem', hint: 'mit + dative' },
              { text: 'Das Geschenk ist für ___ Frau. (the, f.)', answer: 'die', hint: 'für + accusative (no change)' },
            ]}},
            { id: 'ftw4d3t3', type: 'quiz', title: 'Dative Quiz', description: 'Test dative knowledge', xp: 10, content: { questions: [
              { question: '"der" in dative becomes...', options: ['den', 'dem', 'des', 'die'], correct: 1 },
              { question: '"die" in dative becomes...', options: ['den', 'dem', 'der', 'die'], correct: 2 },
              { question: '"Ich fahre mit ___ Zug."', options: ['der', 'den', 'dem', 'die'], correct: 2 },
            ]}},
          ]
        },
        {
          day: 4,
          title: 'Week 4 Review',
          tasks: [
            { id: 'ftw4d4t1', type: 'review', title: 'Week 4 Review', description: 'Hobbies, modal verbs, directions, dative', xp: 25, content: { questions: [
              { question: '"Ich kann gut schwimmen" — "kann" is a...', options: ['noun', 'adjective', 'modal verb', 'preposition'], correct: 2 },
              { question: '"Links" means...', options: ['right', 'left', 'straight', 'back'], correct: 1 },
              { question: '"der" in dative becomes...', options: ['den', 'dem', 'des', 'die'], correct: 1 },
              { question: '"Ich möchte Deutsch lernen" — where is "lernen"?', options: ['position 1', 'position 2', 'at the end', 'position 3'], correct: 2 },
              { question: '"Der Bahnhof" means...', options: ['airport', 'bus stop', 'train station', 'street'], correct: 2 },
            ]}},
          ]
        },
      ]
    },
    {
      id: 5,
      title: 'Intensiv — Grammar Intensive',
      icon: '📝',
      theme: 'Noun genders review, verb conjugation deep dive, cases practice',
      unlocked: false,
      days: [
        {
          day: 1,
          title: 'Noun Genders & Articles',
          tasks: [
            { id: 'ftw5d1t1', type: 'vocabulary', title: 'Gender Patterns', description: 'Common patterns for predicting noun gender', xp: 15, content: { items: [
              { german: '-ung (die)', english: 'die Zeitung (newspaper), die Wohnung (apartment)', note: 'Always feminine' },
              { german: '-keit (die)', english: 'die Schönheit (beauty), die Gesundheit (health)', note: 'Always feminine' },
              { german: '-heit (die)', english: 'die Freiheit (freedom), die Gesundheit (health)', note: 'Always feminine' },
              { german: '-chen (das)', english: 'das Mädchen (girl), das Häuschen (little house)', note: 'Always neuter' },
              { german: '-lein (das)', english: 'das Fräulein (miss), das Büchlein (booklet)', note: 'Always neuter' },
              { german: '-ling (der)', english: 'der Frühling (spring), der Schmetterling (butterfly)', note: 'Always masculine' },
              { german: '-ismus (der)', english: 'der Kapitalismus, der Tourismus', note: 'Always masculine' },
            ]}},
            { id: 'ftw5d1t2', type: 'quiz', title: 'Gender Quiz', description: 'Test your gender knowledge', xp: 15, content: { questions: [
              { question: 'Words ending in "-ung" are always...', options: ['masculine', 'feminine', 'neuter', 'plural'], correct: 1 },
              { question: 'Words ending in "-chen" are always...', options: ['masculine', 'feminine', 'neuter', 'plural'], correct: 2 },
              { question: '"Die Zeitung" — the article tells us it is...', options: ['masculine', 'feminine', 'neuter', 'unknown'], correct: 1 },
            ]}},
            { id: 'ftw5d1t3', type: 'flashcards', title: 'Irregular Verb Forms', description: 'Memorize common irregular past forms', xp: 15, content: { cards: [
              { front: 'sein (to be)', back: 'ich war, du warst', example: 'Ich war müde. (I was tired.)' },
              { front: 'haben (to have)', back: 'ich hatte, du hattest', example: 'Ich hatte Hunger. (I was hungry.)' },
              { front: 'werden (to become)', back: 'ich wurde, du wurdest', example: 'Ich wurde Arzt. (I became a doctor.)' },
              { front: 'können (can)', back: 'ich konnte, du konntest', example: 'Ich konnte nicht kommen. (I couldn\'t come.)' },
            ]}},
          ]
        },
        {
          day: 2,
          title: 'Cases Review: Akkusativ & Dativ',
          tasks: [
            { id: 'ftw5d2t1', type: 'grammar', title: 'Akkusativ vs Dativ', description: 'When to use each case', xp: 20, content: {
              rule: 'Akkusativ = direct object. Dativ = indirect object or after certain prepositions.',
              examples: [
                { german: 'Ich sehe den Mann. (Akk.)', english: 'I see the man. (who/what?)' },
                { german: 'Ich gebe dem Mann das Buch. (Dat.)', english: 'I give the man the book. (to whom?)' },
                { german: 'Ich fahre mit dem Zug. (Dat.)', english: 'I travel by train. (with what?)' },
                { german: 'Ich habe einen Hund. (Akk.)', english: 'I have a dog. (what?)' },
              ],
              note: 'Ask "wen?" for accusative (who/what), "wem?" for dative (to whom/for whom).'
            }},
            { id: 'ftw5d2t2', type: 'fillblank', title: 'Case Drill', description: 'Choose the correct case', xp: 15, content: { sentences: [
              { text: 'Ich sehe ___ Frau. (the woman, direct object)', answer: 'die', hint: 'accusative, feminine' },
              { text: 'Ich gebe ___ Frau das Buch. (to the woman)', answer: 'der', hint: 'dative, feminine' },
              { text: 'Ich fahre mit ___ Auto. (the car)', answer: 'dem', hint: 'dative, neuter' },
            ]}},
            { id: 'ftw5d2t3', type: 'quiz', title: 'Cases Quiz', description: 'Test case knowledge', xp: 10, content: { questions: [
              { question: '"Ich sehe ___ Mann." (direct object)', options: ['der', 'den', 'dem', 'des'], correct: 1 },
              { question: '"Ich gebe ___ Kind das Buch." (indirect)', options: ['das', 'dem', 'den', 'des'], correct: 1 },
              { question: 'Which preposition always takes dative?', options: ['in', 'mit', 'auf', 'an'], correct: 1 },
            ]}},
          ]
        },
        {
          day: 3,
          title: 'Verb Drills & Sentence Building',
          tasks: [
            { id: 'ftw5d3t1', type: 'fillblank', title: 'Mixed Verb Drill', description: 'Conjugate and fill in', xp: 20, content: { sentences: [
              { text: 'Ich ___ jeden Tag Deutsch. (lernen)', answer: 'lerne', hint: 'I learn' },
              { text: 'Sie ___ viel. (arbeiten)', answer: 'arbeitet', hint: 'she works' },
              { text: 'Wir ___ gern Fußball. (spielen)', answer: 'spielen', hint: 'we play' },
              { text: '___ du Kaffee? (möchten)', answer: 'Möchtest', hint: 'formal question' },
            ]}},
            { id: 'ftw5d3t2', type: 'writing', title: 'Write About Your Day', description: 'Write 5 sentences about your daily routine', xp: 20, content: {
              prompt: 'Write about your daily routine in German using at least 3 different verbs.',
              example: 'Ich stehe um 7 Uhr auf. Ich frühstücke um 7:30. Dann gehe ich zur Arbeit.',
              tips: ['Use separable verbs correctly', 'Include time expressions', 'Use modal verbs if you can']
            }},
            { id: 'ftw5d3t3', type: 'speaking', title: 'Describe Your Hobbies', description: 'Practice speaking about your hobbies', xp: 15, content: {
              prompt: 'Say: "In meiner Freizeit lese ich gerne. Ich spiele auch gerne Fußball. Manchmal koche ich."',
              tips: ['Use "gern(e)" to say you enjoy something', 'Use "auch" for "also"', 'Use "manchmal" for "sometimes"']
            }},
          ]
        },
        {
          day: 4,
          title: 'Week 5 Review',
          tasks: [
            { id: 'ftw5d4t1', type: 'review', title: 'Grammar Intensive Review', description: 'Comprehensive grammar review', xp: 25, content: { questions: [
              { question: '"-ung" words are always...', options: ['masculine', 'feminine', 'neuter', 'unknown'], correct: 1 },
              { question: '"Ich sehe ___ Mann." (accusative)', options: ['der', 'den', 'dem', 'des'], correct: 1 },
              { question: '"Ich gebe ___ Frau das Buch." (dative)', options: ['die', 'der', 'den', 'dem'], correct: 1 },
              { question: '"Ich ___ gern." (lesen)', options: ['lese', 'liest', 'lesen', 'las'], correct: 0 },
              { question: 'Which is a separable verb?', options: ['lernen', 'aufstehen', 'fahren', 'schlafen'], correct: 1 },
            ]}},
          ]
        },
      ]
    },
    {
      id: 6,
      title: 'Prüfung — A1 Mock Exam',
      icon: '📝',
      theme: 'Full A1 mock exam: Lesen, Hören, Schreiben, Sprechen',
      unlocked: false,
      days: [
        {
          day: 1,
          title: 'Lesen (Reading) Practice',
          tasks: [
            { id: 'ftw6d1t1', type: 'quiz', title: 'Lesen Teil 1', description: 'Match short texts to descriptions', xp: 20, content: { questions: [
              { question: 'A notice says "Zug fährt ab um 14:30". What does "abfahren" mean?', options: ['to arrive', 'to depart', 'to cancel', 'to delay'], correct: 1 },
              { question: 'You read: "Das Café ist geschlossen." This means...', options: ['The café is open', 'The café is closed', 'The café is new', 'The café is big'], correct: 1 },
              { question: 'An email starts "Sehr geehrte Damen und Herren". This is...', options: ['informal', 'formal', 'angry', 'funny'], correct: 1 },
            ]}},
            { id: 'ftw6d1t2', type: 'quiz', title: 'Lesen Teil 2', description: 'Read and answer questions', xp: 20, content: { questions: [
              { question: '"Mein Lieblingsessen ist Pizza." What is their favorite food?', options: ['Pasta', 'Pizza', 'Salad', 'Soup'], correct: 1 },
              { question: '"Ich wohne in einer kleinen Wohnung." The apartment is...', options: ['big', 'new', 'small', 'expensive'], correct: 2 },
              { question: '"Wir fahren nächste Woche nach München." They are going to...', options: ['Berlin', 'Hamburg', 'München', 'Köln'], correct: 2 },
            ]}},
            { id: 'ftw6d1t3', type: 'quiz', title: 'Lesen Teil 3', description: 'Understand notices and signs', xp: 15, content: { questions: [
              { question: '"Ausgang" means...', options: ['entrance', 'exit', 'elevator', 'restroom'], correct: 1 },
              { question: '"Verboten" means...', options: ['allowed', 'forbidden', 'free', 'open'], correct: 1 },
              { question: '"Bitte leise sprechen" means...', options: ['Speak loudly', 'Speak quietly', 'Don\'t speak', 'Speak German'], correct: 1 },
            ]}},
          ]
        },
        {
          day: 2,
          title: 'Hören (Listening) Practice',
          tasks: [
            { id: 'ftw6d2t1', type: 'speaking', title: 'Listen and Repeat', description: 'Listen to common phrases and practice pronunciation', xp: 20, content: {
              prompt: 'Listen to these phrases and repeat: "Guten Morgen! Wie geht es Ihnen? Ich komme aus Indien. Ich lerne Deutsch. Das ist sehr gut!"',
              tips: ['Pay attention to the "ch" sound', 'Roll the "r" slightly', 'The "ß" sounds like a sharp "s"']
            }},
            { id: 'ftw6d2t2', type: 'quiz', title: 'Hören Teil 1', description: 'Understand short conversations', xp: 15, content: { questions: [
              { question: 'If someone says "Wie spät ist es?", they want to know...', options: ['the weather', 'the time', 'the price', 'the date'], correct: 1 },
              { question: '"Entschuldigung, wo ist der Bahnhof?" is asking for...', options: ['a restaurant', 'directions to the train station', 'the time', 'a doctor'], correct: 1 },
              { question: '"Ich hätte gern einen Kaffee" is...', options: ['a greeting', 'ordering coffee', 'a question', 'a complaint'], correct: 1 },
            ]}},
            { id: 'ftw6d2t3', type: 'quiz', title: 'Hören Teil 2', description: 'Understand numbers and details', xp: 15, content: { questions: [
              { question: 'How would you hear "3:45" in German?', options: ['drei vierzigfünf', 'Viertel vor vier', 'vier Uhr dreißig', 'drei Uhr fünfzehn'], correct: 1 },
              { question: '"Fünfundzwanzig Euro" is...', options: ['25 cents', '25 euros', '52 euros', '5 euros'], correct: 1 },
            ]}},
          ]
        },
        {
          day: 3,
          title: 'Schreiben (Writing) Practice',
          tasks: [
            { id: 'ftw6d3t1', type: 'writing', title: 'Write a Short Message', description: 'Write a message to a friend', xp: 25, content: {
              prompt: 'Write a short message (5-7 sentences) to a friend. Introduce yourself, say where you are from, what you do, and what your hobbies are.',
              example: 'Hallo Maria! Wie geht es dir? Ich heiße Tom und ich komme aus England. Ich wohne in Berlin und arbeite als Lehrer. In meiner Freizeit lese ich gerne und schwimme.',
              tips: ['Use informal "du" form', 'Include greetings and goodbye', 'Use simple sentence structure']
            }},
            { id: 'ftw6d3t2', type: 'writing', title: 'Fill in a Form', description: 'Practice filling in German forms', xp: 15, content: {
              prompt: 'Imagine you are filling in a registration form. Write your details in German: name, address, phone number, nationality, date of birth.',
              example: 'Name: Max Mustermann, Straße: Hauptstraße 42, PLZ: 10115 Berlin, Telefon: 030 12345678',
              tips: ['German address format: Street + Number', 'PLZ = postal code', 'Telefon = phone number']
            }},
            { id: 'ftw6d3t3', type: 'speaking', title: 'Practice Speaking', description: 'Practice answering common exam questions', xp: 20, content: {
              prompt: 'Practice saying: "Ich heiße [name]. Ich komme aus [country]. Ich wohne in [city]. Ich arbeite als [job]. In meiner Freizeit [hobby]."',
              tips: ['Speak clearly and slowly', 'It\'s okay to pause and think', 'Use simple sentences']
            }},
          ]
        },
        {
          day: 4,
          title: 'Sprechen (Speaking) & Final Review',
          tasks: [
            { id: 'ftw6d4t1', type: 'roleplay', title: 'A1 Speaking Exam Practice', description: 'Practice the speaking exam format', xp: 25, content: {
              scenario: 'The examiner asks you about yourself. Introduce yourself and answer their questions.',
              steps: ['Examiner: "Wie heißen Sie?" -> "Ich heiße..."', 'Examiner: "Woher kommen Sie?" -> "Ich komme aus..."', 'Examiner: "Wo wohnen Sie?" -> "Ich wohne in..."', 'Examiner: "Was machen Sie beruflich?" -> "Ich arbeite als..."', 'Examiner: "Was machen Sie gern in Ihrer Freizeit?" -> "Ich lese gern..."']
            }},
            { id: 'ftw6d4t2', type: 'review', title: 'Final A1 Mock Exam', description: 'Complete A1 exam simulation', xp: 30, content: { questions: [
              { question: 'How do you say "Goodbye" formally?', options: ['Tschüss!', 'Auf Wiedersehen!', 'Bis morgen!', 'Ciao!'], correct: 1 },
              { question: '"Ich ___ Deutsch." (lernen)', options: ['lerne', 'lernst', 'lernt', 'lernen'], correct: 0 },
              { question: '"Der Mann" in accusative is...', options: ['der Mann', 'den Mann', 'dem Mann', 'des Mannes'], correct: 1 },
              { question: '"Wo ist der Bahnhof?" is asking for...', options: ['the time', 'directions', 'food', 'help'], correct: 1 },
              { question: '"Ich hätte gern einen Kaffee" means...', options: ['I have coffee', 'I want a coffee', 'I like coffee', 'I made coffee'], correct: 1 },
              { question: 'Which is feminine (die)?', options: ['der Mann', 'die Frau', 'das Kind', 'der Tisch'], correct: 1 },
              { question: '"Es ist Viertel vor fünf" means...', options: ['5:15', '4:45', '5:45', '4:15'], correct: 1 },
              { question: '"Möchten" means...', options: ['can', 'must', 'would like', 'want'], correct: 2 },
            ]}},
            {
              id: 'ftw6d4t3',
              type: 'fun',
              title: '🎉 A1 Complete!',
              description: 'Congratulations on completing A1!',
              xp: 10,
              content: {
                facts: [
                  '🎉 Herzlichen Glückwunsch! You completed A1 German!',
                  '📚 You now know about 500-800 German words.',
                  '🗣️ You can introduce yourself, order food, ask for directions, and have simple conversations.',
                  '🚀 Ready for A2? Click the A2 tab to continue your journey!',
                  '🇩🇪 "Übung macht den Meister" (Practice makes perfect)!',
                ]
              }
            },
          ]
        },
      ]
    },
  ]
};

export default a1FastTrackData;
