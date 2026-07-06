// A1 German syllabus restructured into 10 spoon-fed modules.
// Designed to drop into the existing a1Data/a2Data content model.
// Generated vocabulary is flagged with [GENERATED] in comments for review.

const a1SpoonfedModules = {
  level: 'A1',
  title: 'A1 — Beginner (Spoon-fed)',
  subtitle: 'Deutsch Anfänger',
  description: 'Ten bite-sized modules that turn raw A1 content into usable, immediately rewarding lessons.',
  color: '#C8442A',
  weeks: [
    // ------------------------------------------------------------------
    // Module 1 — Greetings & Introducing Yourself
    // ------------------------------------------------------------------
    {
      id: 1,
      title: 'Hallo! Begrüßungen & Sich Vorstellen — Greetings & Introducing Yourself',
      icon: '👋',
      theme: 'Say hello, say your name, ask how someone is',
      unlocked: true,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 1: Hallo!' },
      ],
      days: [
        {
          day: 1,
          title: 'Greetings & Introducing Yourself',
          tasks: [
            {
              id: 'a1m1d1t1', type: 'grammar', title: 'Your First German Sentences', description: 'Start talking in German right away',
              xp: 15, content: {
                rule: 'You do not need grammar terms to start speaking. Use these four building blocks: say hello, say your name, ask a name, and answer "How are you?".',
                steps: [
                  'Say hello any time: "Hallo!"',
                  'Say your name: "Ich heiße ..." (I am called ...) or "Ich bin ..." (I am ...).',
                  'Ask a friend their name: "Wie heißt du?" To be polite, ask "Wie heißen Sie?"',
                  'Answer "Wie geht\'s?" with "Gut, danke. Und dir?" (Fine, thanks. And you?)'
                ],
                examples: [
                  { german: 'Hallo, ich heiße Lea.', english: 'Hello, I\'m Lea.' },
                  { german: 'Ich bin Tom.', english: 'I\'m Tom.' },
                  { german: 'Wie heißt du?', english: 'What\'s your name?' },
                  { german: 'Gut, danke. Und dir?', english: 'Fine, thanks. And you?' }
                ],
                note: 'Mnemonic: Hallo is hello with an "a" — the easiest possible start. When in doubt, smile and say "Hallo".'
              }
            },
            {
              id: 'a1m1d1t2', type: 'vocabulary', title: 'Essential Greetings', description: 'Words you can use today',
              xp: 15, content: { items: [
                { german: 'Hallo', english: 'Hello', pronunciation: 'HAH-loh' },
                { german: 'Guten Morgen', english: 'Good morning', pronunciation: 'GOO-ten MOR-gen' },
                { german: 'Guten Tag', english: 'Good day / Hello', pronunciation: 'GOO-ten TAHK' },
                { german: 'Guten Abend', english: 'Good evening', pronunciation: 'GOO-ten AH-bent' },
                { german: 'Tschüss', english: 'Bye', pronunciation: 'choos' },
                { german: 'Auf Wiedersehen', english: 'Goodbye', pronunciation: 'owf VEE-der-zayn' },
                { german: 'Wie geht\'s?', english: 'How are you?', pronunciation: 'vee gayts' },
                { german: 'Gut, danke', english: 'Fine, thanks', pronunciation: 'goot DAHN-keh' }
              ]}
            },
            {
              id: 'a1m1d1t3', type: 'listening', title: 'Listen to a Friendly Hello', description: 'Hear the new phrases in a short dialogue',
              xp: 10, content: {
                clip: { title: 'Meeting on the street', source: 'TTS dialogue', text: 'Hallo! Ich heiße Lea. Wie heißt du? Ich bin Tom. Wie geht\'s? Gut, danke. Und dir? Auch gut, danke. Tschüss!' },
                questions: [
                  { question: 'What does Lea say first?', options: ['Tschüss', 'Hallo', 'Guten Abend', 'Auf Wiedersehen'], correct: 1 },
                  { question: 'How does Tom say his name?', options: ['Ich heiße Tom.', 'Ich bin Tom.', 'Wie heißt du?', 'Gut, danke.'], correct: 1 }
                ]
              }
            },
            {
              id: 'a1m1d1t4', type: 'quiz', title: 'Greetings Quiz', description: 'Five quick questions',
              xp: 10, content: { questions: [
                { question: 'How do you say "My name is Anna"?', options: ['Du bist Anna.', 'Ich bin Anna.', 'Sie ist Anna.', 'Ich heiße Anna.'], correct: 3 },
                { question: '"Tschüss" means...', options: ['Hello', 'Goodbye', 'Please', 'Thanks'], correct: 1 },
                { question: 'Which phrase means "Good morning"?', options: ['Guten Morgen', 'Guten Abend', 'Guten Tag', 'Gute Nacht'], correct: 0 },
                { question: '"Wie heißt du?" asks for someone\'s...', options: ['name', 'age', 'country', 'mood'], correct: 0 },
                { question: 'You meet a friend. What do you say first?', options: ['Auf Wiedersehen', 'Entschuldigung', 'Hallo', 'Guten Morgen'], correct: 2 }
              ]}
            },
            {
              id: 'a1m1d1t5', type: 'speaking', title: 'Say It Out Loud', description: 'Practice the mini dialogue',
              xp: 10, content: {
                prompt: 'Hallo! Ich heiße ... Wie heißt du? Ich bin ... Wie geht\'s? Gut, danke. Tschüss!',
                tips: ['Replace the dots with your own name.', 'Say each phrase clearly.', 'Record yourself and listen back.']
              }
            },
            {
              id: 'a1m1d1t6', type: 'quickwin', title: 'Quick Win: First German Conversation', description: 'You can now greet someone and introduce yourself!',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 2 — The Alphabet
    // ------------------------------------------------------------------
    {
      id: 2,
      title: 'Das Alphabet — The Alphabet',
      icon: '🔤',
      theme: 'Spell your name in German',
      unlocked: false,
      resources: [
        { name: 'German Alphabet Song', url: 'https://www.youtube.com/results?search_query=german+alphabet+song', description: 'A fun way to memorize letter names' }
      ],
      days: [
        {
          day: 1,
          title: 'The German Alphabet',
          tasks: [
            {
              id: 'a1m2d1t1', type: 'grammar', title: 'Spell Your Name', description: 'Learn letters by spelling words you already know',
              xp: 15, content: {
                rule: 'German letter names sound different from English. Do not memorize the whole alphabet at once — start by spelling your own name.',
                steps: [
                  'A sounds like "ah", B like "beh", C like "tseh".',
                  'W is "veh", V is "fow", J is "yot", Z is "tsett".',
                  'Ä sounds like "eh" with your mouth open. Ö sounds like "eh" with rounded lips. Ü sounds like "ee" with rounded lips.',
                  'ß is called Eszett and sounds like a sharp "s".'
                ],
                examples: [
                  { german: 'Anna = A-N-N-A', english: 'ah – enn – enn – ah' },
                  { german: 'Tom = T-O-M', english: 'teh – oh – emm' },
                  { german: 'Lea = L-E-A', english: 'ell – eh – ah' },
                  { german: 'Maus = M-A-U-S', english: 'emm – ah – oo – ess' }
                ],
                note: 'Mnemonic: Say your name in slow motion, letter by letter. That turns the alphabet into something personal.'
              }
            },
            {
              id: 'a1m2d1t2', type: 'flashcards', title: 'Tricky Letters', description: 'Focus on the letters that differ most from English',
              xp: 15, content: { cards: [
                { front: 'W', back: 'veh', example: 'Wasser (water)' },
                { front: 'V', back: 'fow', example: 'Vater (father)' },
                { front: 'J', back: 'yot', example: 'Ja (yes)' },
                { front: 'Z', back: 'tsett', example: 'Zeit (time)' },
                { front: 'Ä', back: 'eh', example: 'Äpfel (apples)' },
                { front: 'Ö', back: 'round lips, eh', example: 'schön (beautiful)' },
                { front: 'Ü', back: 'round lips, ee', example: 'über (over)' },
                { front: 'ß', back: 'sharp s', example: 'Straße (street)' },
                { front: 'CH', back: 'kh after a/o/u; sh after e/i/ä/ö/ü', example: 'Bach / ich' }
              ]}
            },
            {
              id: 'a1m2d1t3', type: 'listening', title: 'Hear the Alphabet', description: 'Listen and repeat',
              xp: 10, content: {
                clip: { title: 'German alphabet', source: 'TTS', text: 'A, B, C, D, E, F, G. H, I, J, K, L, M, N. O, P, Q, R, S, T, U. V, W, X, Y, Z. Ä, Ö, Ü, ß.' },
                questions: [
                  { question: 'Which letter is pronounced "veh"?', options: ['V', 'W', 'F', 'Y'], correct: 1 },
                  { question: 'Which letter is pronounced "yot"?', options: ['J', 'G', 'Y', 'I'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m2d1t4', type: 'quiz', title: 'Alphabet Quiz', description: 'Test your letter names',
              xp: 10, content: { questions: [
                { question: 'How do you say the letter "W" in German?', options: ['way', 'veh', 'double-u', 'vay'], correct: 1 },
                { question: 'How do you say the letter "J"?', options: ['jay', 'jot', 'yot', 'zhee'], correct: 2 },
                { question: 'Which letter is the "sharp s"?', options: ['ss', 'ß', 'z', 'sz'], correct: 1 },
                { question: 'Spell "Tom" in German letters.', options: ['T-A-M', 'T-U-M', 'T-O-M', 'T-E-M'], correct: 2 },
                { question: 'Which letter sounds like "ee with rounded lips"?', options: ['Ä', 'Ö', 'Ü', 'ß'], correct: 2 }
              ]}
            },
            {
              id: 'a1m2d1t5', type: 'speaking', title: 'Spell Your Name', description: 'Use the German letter names',
              xp: 10, content: {
                prompt: 'Spell your first name out loud using German letter names. Then spell these words: MAUS, WASSER, ZEIT, STRAßE.',
                tips: ['Take your time.', 'Round your lips for Ö and Ü.', 'Make ß sound like a sharp "s".']
              }
            },
            {
              id: 'a1m2d1t6', type: 'quickwin', title: 'Quick Win: You Can Spell', description: 'You now know the German letter names',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 3 — Numbers 0–12
    // ------------------------------------------------------------------
    {
      id: 3,
      title: 'Zahlen 0–12 — Numbers 0–12',
      icon: '🔢',
      theme: 'Count on your fingers',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Numbers 0–12',
          tasks: [
            {
              id: 'a1m3d1t1', type: 'grammar', title: 'Count to Twelve', description: 'The small numbers you will use every day',
              xp: 15, content: {
                rule: 'Numbers are useful for time, prices, and age. Zero to twelve are special — learn them like a short song.',
                steps: [
                  'Hold up your fingers as you say eins, zwei, drei.',
                  'A clock face helps: zwölf is at the top.',
                  'A die has one to six dots: eins through sechs.'
                ],
                examples: [
                  { german: 'null, eins, zwei, drei', english: '0, 1, 2, 3' },
                  { german: 'vier, fünf, sechs', english: '4, 5, 6' },
                  { german: 'sieben, acht, neun, zehn', english: '7, 8, 9, 10' },
                  { german: 'elf, zwölf', english: '11, 12' }
                ],
                note: 'Visual hint: Use your fingers for 1–10, two hands for 11–12, and imagine a clock for 12 at the top.'
              }
            },
            {
              id: 'a1m3d1t2', type: 'vocabulary', title: 'Numbers 0–12', description: 'Memorize the small set',
              xp: 15, content: { items: [
                { german: 'null', english: '0', pronunciation: 'nool' },
                { german: 'eins', english: '1', pronunciation: 'eyens' },
                { german: 'zwei', english: '2', pronunciation: 'tsveye' },
                { german: 'drei', english: '3', pronunciation: 'drye' },
                { german: 'vier', english: '4', pronunciation: 'feer' },
                { german: 'fünf', english: '5', pronunciation: 'foonf' },
                { german: 'sechs', english: '6', pronunciation: 'zekhs' },
                { german: 'sieben', english: '7', pronunciation: 'ZEE-ben' },
                { german: 'acht', english: '8', pronunciation: 'ahkht' },
                { german: 'neun', english: '9', pronunciation: 'noyn' },
                { german: 'zehn', english: '10', pronunciation: 'tsayn' },
                { german: 'elf', english: '11', pronunciation: 'elf' },
                { german: 'zwölf', english: '12', pronunciation: 'tsvoolf' }
              ]}
            },
            {
              id: 'a1m3d1t3', type: 'listening', title: 'Count Out Loud', description: 'Hear the numbers 0–12',
              xp: 10, content: {
                clip: { title: 'Numbers 0–12', source: 'TTS', text: 'null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.' },
                questions: [
                  { question: 'Which number comes after "neun"?', options: ['elf', 'zehn', 'acht', 'zwölf'], correct: 1 },
                  { question: '"zwölf" is the number...', options: ['10', '11', '12', '2'], correct: 2 }
                ]
              }
            },
            {
              id: 'a1m3d1t4', type: 'quiz', title: 'Numbers Quiz', description: 'Test 0–12',
              xp: 10, content: { questions: [
                { question: 'How do you say 5?', options: ['vier', 'fünf', 'sechs', 'fünfzig'], correct: 1 },
                { question: 'Which number is "zwölf"?', options: ['11', '12', '2', '20'], correct: 1 },
                { question: 'What is 0 in German?', options: ['null', 'zero', 'neun', 'nichts'], correct: 0 },
                { question: 'How do you say 3?', options: ['drei', 'dreizehn', 'zwei', 'vier'], correct: 0 },
                { question: 'Which number is between "sieben" and "neun"?', options: ['acht', 'sechs', 'zehn', 'fünf'], correct: 0 }
              ]}
            },
            {
              id: 'a1m3d1t5', type: 'speaking', title: 'Say the Numbers', description: 'Practice pronunciation',
              xp: 10, content: {
                prompt: 'Count from 0 to 12 out loud. Then say your age if it is 12 or under.',
                tips: ['Pay attention to "zwölf" (tsvoolf).', '"fünf" has an oo sound inside.']
              }
            },
            {
              id: 'a1m3d1t6', type: 'quickwin', title: 'Quick Win: You Can Count', description: 'Numbers 0–12 are yours',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 4 — Numbers 13–19
    // ------------------------------------------------------------------
    {
      id: 4,
      title: 'Zahlen 13–19 — Numbers 13–19',
      icon: '🔟',
      theme: 'The +zehn pattern',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Numbers 13–19',
          tasks: [
            {
              id: 'a1m4d1t1', type: 'grammar', title: 'The Teen Pattern', description: 'Build 13–19 from numbers you already know',
              xp: 15, content: {
                rule: 'From 13 to 19, take the small number and add "zehn". Watch out for two exceptions.',
                steps: [
                  'drei + zehn = dreizehn',
                  'vier + zehn = vierzehn',
                  'fünf + zehn = fünfzehn',
                  'sechs + zehn is NOT sechszehn → it is sechzehn',
                  'sieben + zehn is NOT siebenzehn → it is siebzehn'
                ],
                examples: [
                  { german: '13 = dreizehn', english: 'three + ten' },
                  { german: '16 = sechzehn', english: 'exception: drops the -s' },
                  { german: '17 = siebzehn', english: 'exception: drops the -en' },
                  { german: '19 = neunzehn', english: 'nine + ten' }
                ],
                note: 'Mnemonic: The teen numbers hide the small number inside. Only sechzehn and siebzehn are sneaky — they lose a sound.'
              }
            },
            {
              id: 'a1m4d1t2', type: 'vocabulary', title: 'Numbers 13–19', description: 'The teen set',
              xp: 15, content: { items: [
                { german: 'dreizehn', english: '13', pronunciation: 'DRY-tsayn' },
                { german: 'vierzehn', english: '14', pronunciation: 'FEER-tsayn' },
                { german: 'fünfzehn', english: '15', pronunciation: 'FOONF-tsayn' },
                { german: 'sechzehn', english: '16', pronunciation: 'ZEKH-tsayn' },
                { german: 'siebzehn', english: '17', pronunciation: 'ZEEP-tsayn' },
                { german: 'achtzehn', english: '18', pronunciation: 'AHKHT-tsayn' },
                { german: 'neunzehn', english: '19', pronunciation: 'NOYN-tsayn' }
              ]}
            },
            {
              id: 'a1m4d1t3', type: 'fillblank', title: 'Build the Teens', description: 'Fill in the missing number',
              xp: 10, content: { sentences: [
                { text: 'drei + zehn = ___', answer: 'dreizehn', hint: 'three-ten' },
                { text: 'fünf + zehn = ___', answer: 'fünfzehn', hint: 'five-ten' },
                { text: '___ + zehn = sechzehn', answer: 'sechs', hint: 'exception' },
                { text: '___ + zehn = siebzehn', answer: 'sieben', hint: 'exception' },
                { text: 'neun + zehn = ___', answer: 'neunzehn', hint: 'nine-ten' }
              ]}
            },
            {
              id: 'a1m4d1t4', type: 'listening', title: 'Hear the Teens', description: 'Listen and repeat',
              xp: 10, content: {
                clip: { title: 'Numbers 13–19', source: 'TTS', text: 'dreizehn, vierzehn, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn.' },
                questions: [
                  { question: 'Which number sounds like "sekh-tsayn"?', options: ['16', '17', '13', '19'], correct: 0 },
                  { question: 'Which is the exception pair?', options: ['dreizehn/vierzehn', 'sechzehn/siebzehn', 'achtzehn/neunzehn', 'fünfzehn/sechzehn'], correct: 1 }
                ]
              }
            },
            {
              id: 'a1m4d1t5', type: 'quiz', title: 'Teen Numbers Quiz', description: 'Test 13–19',
              xp: 10, content: { questions: [
                { question: '14 in German is...', options: ['vierzehn', 'fünfzehn', 'dreizehn', 'achtzehn'], correct: 0 },
                { question: 'Which two are exceptions?', options: ['sechzehn and siebzehn', 'dreizehn and vierzehn', 'achtzehn and neunzehn', 'fünfzehn and sechzehn'], correct: 0 },
                { question: '17 is...', options: ['siebzehn', 'sechzehn', 'siebenzehn', 'siebzig'], correct: 0 },
                { question: 'What is the pattern for 13–19?', options: ['small number + zehn', 'zehn + small number', 'small number x zehn', 'zehn - small number'], correct: 0 },
                { question: '19 is...', options: ['neunzehn', 'neunzig', 'neun', 'neundzehn'], correct: 0 }
              ]}
            },
            {
              id: 'a1m4d1t6', type: 'quickwin', title: 'Quick Win: Teens Done', description: '13–19 are now part of your German',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 5 — Numbers 20–100
    // ------------------------------------------------------------------
    {
      id: 5,
      title: 'Zahlen 20–100 — Numbers 20–100',
      icon: '💯',
      theme: 'Flip the numbers',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Numbers 20–100',
          tasks: [
            {
              id: 'a1m5d1t1', type: 'grammar', title: 'Flip the Numbers', description: 'German counts backwards from English',
              xp: 15, content: {
                rule: 'In German, you say the small number first, then "und", then the tens. This is the biggest counting surprise — once you know it, the rest is easy.',
                steps: [
                  'Learn the tens: zwanzig (20), dreißig (30), vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert (100).',
                  'For 21–99, say: ones + und + tens.',
                  'Use "ein" not "eins" in the middle: 21 = einundzwanzig.'
                ],
                examples: [
                  { german: '21 = einundzwanzig', english: 'one-and-twenty' },
                  { german: '32 = zweiunddreißig', english: 'two-and-thirty' },
                  { german: '43 = dreiundvierzig', english: 'three-and-forty' }
                ],
                note: 'Mnemonic: German numbers flip. Think "one-and-twenty" like old-fashioned English.'
              }
            },
            {
              id: 'a1m5d1t2', type: 'vocabulary', title: 'Tens & Examples', description: 'The tens and a few compounds',
              xp: 15, content: { items: [
                { german: 'zwanzig', english: '20', pronunciation: 'TSVAHN-tsikh' },
                { german: 'dreißig', english: '30', pronunciation: 'DRY-sikh' },
                { german: 'vierzig', english: '40', pronunciation: 'FEER-tsikh' },
                { german: 'fünfzig', english: '50', pronunciation: 'FOONF-tsikh' },
                { german: 'sechzig', english: '60', pronunciation: 'ZEKH-tsikh' },
                { german: 'siebzig', english: '70', pronunciation: 'ZEEP-tsikh' },
                { german: 'achtzig', english: '80', pronunciation: 'AHKH-tsikh' },
                { german: 'neunzig', english: '90', pronunciation: 'NOYN-tsikh' },
                { german: 'hundert', english: '100', pronunciation: 'HOON-dert' },
                { german: 'einundzwanzig', english: '21', pronunciation: 'eyen-oont-TSVAHN-tsikh' },
                { german: 'zweiunddreißig', english: '32', pronunciation: 'tsveye-oont-DRY-sikh' },
                { german: 'dreiundvierzig', english: '43', pronunciation: 'drye-oont-FEER-tsikh' }
              ]}
            },
            {
              id: 'a1m5d1t3', type: 'fillblank', title: 'Flip Practice', description: 'Write the flipped number',
              xp: 10, content: { sentences: [
                { text: '21 = ___undzwanzig', answer: 'ein', hint: 'use ein, not eins' },
                { text: '32 = zweiund___', answer: 'dreißig', hint: 'thirty' },
                { text: '100 = ___', answer: 'hundert', hint: 'one hundred' },
                { text: '54 = ___undfünfzig', answer: 'vier', hint: 'four' },
                { text: '65 = fünfund___', answer: 'sechzig', hint: 'sixty' }
              ]}
            },
            {
              id: 'a1m5d1t4', type: 'listening', title: 'Hear Big Numbers', description: 'Listen to the tens and compounds',
              xp: 10, content: {
                clip: { title: 'Numbers 20–100', source: 'TTS', text: 'zwanzig, dreißig, vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig, hundert. einundzwanzig, zweiunddreißig, dreiundvierzig.' },
                questions: [
                  { question: 'Which number is 30?', options: ['dreißig', 'dreizehn', 'dreizig', 'zwanzig'], correct: 0 },
                  { question: 'Which compound is 21?', options: ['einundzwanzig', 'zweiundzwanzig', 'einsundzwanzig', 'zwanzigeins'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m5d1t5', type: 'quiz', title: 'Numbers 20–100 Quiz', description: 'Test the flip',
              xp: 10, content: { questions: [
                { question: '30 in German is...', options: ['dreißig', 'dreizehn', 'dreizig', 'zwanzig'], correct: 0 },
                { question: '21 = ?', options: ['einundzwanzig', 'einsundzwanzig', 'zwanzigeins', 'zwanzigein'], correct: 0 },
                { question: 'In 43, which part comes first?', options: ['drei', 'vierzig', 'und', 'vier'], correct: 0 },
                { question: '100 is...', options: ['hundert', 'einhundert', 'hundertund', 'ein'], correct: 0 },
                { question: '65 = ?', options: ['fünfundsechzig', 'sechzigfünf', 'fünfsechzig', 'fünfzigundsechs'], correct: 0 }
              ]}
            },
            {
              id: 'a1m5d1t6', type: 'quickwin', title: 'Quick Win: You Can Count to 100', description: 'That flip trick is now second nature',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 6 — Family Vocabulary
    // ------------------------------------------------------------------
    {
      id: 6,
      title: 'Meine Familie — My Family',
      icon: '👨‍👩‍👧',
      theme: 'Talk about the people around you',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Family Members',
          tasks: [
            {
              id: 'a1m6d1t1', type: 'grammar', title: 'der and die for Family', description: 'Every family word comes with its "the" word',
              xp: 15, content: {
                rule: 'In German, every person-word comes with a little label: der for most male family members and die for most female family members. Learn them as a pair.',
                steps: [
                  'der Vater = the father',
                  'die Mutter = the mother',
                  'der Bruder = the brother',
                  'die Schwester = the sister'
                ],
                examples: [
                  { german: 'das ist mein Vater', english: 'this is my father' },
                  { german: 'das ist meine Mutter', english: 'this is my mother' },
                  { german: 'mein Bruder heißt Tom', english: 'my brother is called Tom' },
                  { german: 'meine Schwester ist zwölf', english: 'my sister is twelve' }
                ],
                note: 'Mnemonic: der goes with dad/son/brother; die goes with mom/daughter/sister. Think "der = he" and "die = she".'
              }
            },
            {
              id: 'a1m6d1t2', type: 'vocabulary', title: 'Family Words', description: 'Core family vocabulary',
              xp: 15, content: { items: [
                { german: 'die Mutter', english: 'mother', pronunciation: 'dee MOO-ter' },
                { german: 'der Vater', english: 'father', pronunciation: 'der FAH-ter' },
                { german: 'die Schwester', english: 'sister', pronunciation: 'dee SHVES-ter' },
                { german: 'der Bruder', english: 'brother', pronunciation: 'der BROO-der' },
                { german: 'die Tochter', english: 'daughter', pronunciation: 'dee TOKH-ter' },
                { german: 'der Sohn', english: 'son', pronunciation: 'der zohn' },
                { german: 'die Tante', english: 'aunt', pronunciation: 'dee TAHN-teh' },
                { german: 'der Onkel', english: 'uncle', pronunciation: 'der ONG-kel' },
                { german: 'die Cousine', english: 'cousin (female)', pronunciation: 'dee koo-ZEE-neh' },
                { german: 'der Cousin', english: 'cousin (male)', pronunciation: 'der koo-ZANH' },
                { german: 'die Großmutter / Oma', english: 'grandmother / grandma', pronunciation: 'dee GROHSS-moo-ter / OH-mah' },
                { german: 'der Großvater / Opa', english: 'grandfather / grandpa', pronunciation: 'der GROHSS-fah-ter / OH-pah' }
              ]}
            },
            {
              id: 'a1m6d1t3', type: 'matching', title: 'Match Family Words', description: 'Match German and English',
              xp: 10, content: { pairs: [
                { german: 'die Mutter', english: 'mother' },
                { german: 'der Vater', english: 'father' },
                { german: 'die Schwester', english: 'sister' },
                { german: 'der Bruder', english: 'brother' },
                { german: 'die Tante', english: 'aunt' },
                { german: 'der Onkel', english: 'uncle' }
              ]}
            },
            {
              id: 'a1m6d1t4', type: 'listening', title: 'My Family', description: 'Listen to a short family description',
              xp: 10, content: {
                clip: { title: 'A small family', source: 'TTS', text: 'Das ist meine Mutter. Das ist mein Vater. Meine Schwester heißt Lea. Mein Bruder ist zehn. Ich habe eine Tante und einen Onkel.' },
                questions: [
                  { question: 'Who is "meine Mutter"?', options: ['mother', 'father', 'sister', 'aunt'], correct: 0 },
                  { question: 'How old is the brother?', options: ['nine', 'ten', 'eleven', 'twelve'], correct: 1 }
                ]
              }
            },
            {
              id: 'a1m6d1t5', type: 'quiz', title: 'Family Quiz', description: 'Test the family words',
              xp: 10, content: { questions: [
                { question: '"die Mutter" means...', options: ['mother', 'father', 'sister', 'brother'], correct: 0 },
                { question: '"der Bruder" is...', options: ['brother', 'sister', 'father', 'uncle'], correct: 0 },
                { question: 'Which article goes with "Vater"?', options: ['der', 'die', 'das'], correct: 0 },
                { question: '"die Schwester" = ?', options: ['sister', 'grandmother', 'aunt', 'daughter'], correct: 0 },
                { question: '"der Onkel" = ?', options: ['uncle', 'aunt', 'cousin', 'father'], correct: 0 }
              ]}
            },
            {
              id: 'a1m6d1t6', type: 'quickwin', title: 'Quick Win: Talk About Family', description: 'You can name family members in German',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 7 — Colors
    // ------------------------------------------------------------------
    {
      id: 7,
      title: 'Die Farben — Colors',
      icon: '🎨',
      theme: 'Describe the world around you',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Basic Colors',
          tasks: [
            {
              id: 'a1m7d1t1', type: 'grammar', title: 'Color Words', description: 'Start with the colors you see every day',
              xp: 15, content: {
                rule: 'Colors are describing words. For now, learn the color by itself. Later you can put it after a thing, like "ein rotes Auto" (a red car).',
                steps: [
                  'Traffic lights are rot, gelb, grün.',
                  'Day and night give us schwarz and weiß.',
                  'Braun is the color of chocolate.'
                ],
                examples: [
                  { german: 'rot', english: 'red' },
                  { german: 'blau', english: 'blue' },
                  { german: 'gelb', english: 'yellow' },
                  { german: 'grün', english: 'green' }
                ],
                note: 'Visual hint: Picture a traffic light — rot, gelb, grün. That gives you the three most common colors in order.'
              }
            },
            {
              id: 'a1m7d1t2', type: 'vocabulary', title: 'Basic Colors', description: 'The eight most useful colors',
              xp: 15, content: { items: [
                { german: 'rot', english: 'red', pronunciation: 'roht' },
                { german: 'blau', english: 'blue', pronunciation: 'blow' },
                { german: 'gelb', english: 'yellow', pronunciation: 'gelp' },
                { german: 'grün', english: 'green', pronunciation: 'groon' },
                { german: 'schwarz', english: 'black', pronunciation: 'shvarts' },
                { german: 'weiß', english: 'white', pronunciation: 'veys' },
                { german: 'braun', english: 'brown', pronunciation: 'brown' },
                { german: 'grau', english: 'grey', pronunciation: 'grow' }
              ]}
            },
            {
              id: 'a1m7d1t3', type: 'quiz', title: 'Basic Colors Quiz', description: 'Match the colors',
              xp: 10, content: { questions: [
                { question: '"rot" is...', options: ['red', 'blue', 'green', 'yellow'], correct: 0 },
                { question: '"grün" is...', options: ['green', 'grey', 'brown', 'blue'], correct: 0 },
                { question: '"schwarz" is...', options: ['black', 'white', 'red', 'grey'], correct: 0 },
                { question: '"gelb" is...', options: ['yellow', 'green', 'blue', 'brown'], correct: 0 },
                { question: '"weiß" is...', options: ['white', 'blue', 'grey', 'black'], correct: 0 }
              ]}
            },
            {
              id: 'a1m7d1t4', type: 'quickwin', title: 'Quick Win: You See in Color', description: 'You can name eight colors',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 2,
          title: 'More Colors',
          tasks: [
            {
              id: 'a1m7d2t1', type: 'grammar', title: 'Light, Dark, and Extra Colors', description: 'Expand your color palette',
              xp: 15, content: {
                rule: 'You can make a color lighter or darker by adding hell- or dunkel-. For example, hellblau is light blue and dunkelblau is dark blue.',
                steps: [
                  'hell + color = light color',
                  'dunkel + color = dark color',
                  'Some colors do not need light/dark to be useful: orange, rosa, lila.'
                ],
                examples: [
                  { german: 'hellblau', english: 'light blue' },
                  { german: 'dunkelblau', english: 'dark blue' },
                  { german: 'orange', english: 'orange' },
                  { german: 'rosa', english: 'pink' }
                ],
                note: 'Visual hint: Hold up something orange, pink, or purple. Those colors brighten any sentence.'
              }
            },
            {
              id: 'a1m7d2t2', type: 'vocabulary', title: 'More Colors', description: 'Extra colors and shades',
              xp: 15, content: { items: [
                { german: 'orange', english: 'orange', pronunciation: 'oh-RAHN-zheh' },
                { german: 'rosa', english: 'pink', pronunciation: 'ROH-zah' },
                { german: 'lila', english: 'purple', pronunciation: 'LEE-lah' },
                { german: 'violett', english: 'violet', pronunciation: 'vee-oh-LET' },
                { german: 'türkis', english: 'turquoise', pronunciation: 'tuer-KEES' },
                { german: 'hellblau', english: 'light blue', pronunciation: 'HEL-blow' },
                { german: 'dunkelblau', english: 'dark blue', pronunciation: 'DOON-kel-blow' }
              ]}
            },
            {
              id: 'a1m7d2t3', type: 'listening', title: 'Hear the Colors', description: 'TTS review of all colors',
              xp: 10, content: {
                clip: { title: 'All colors', source: 'TTS', text: 'rot, blau, gelb, grün, schwarz, weiß, braun, grau, orange, rosa, lila, violett, türkis, hellblau, dunkelblau.' },
                questions: [
                  { question: 'Which color is "ROH-zah"?', options: ['orange', 'rosa', 'lila', 'rot'], correct: 1 },
                  { question: '"dunkelblau" means...', options: ['light blue', 'dark blue', 'blue', 'turquoise'], correct: 1 }
                ]
              }
            },
            {
              id: 'a1m7d2t4', type: 'quiz', title: 'More Colors Quiz', description: 'Test the extra colors',
              xp: 10, content: { questions: [
                { question: '"rosa" is...', options: ['pink', 'red', 'orange', 'purple'], correct: 0 },
                { question: '"lila" is...', options: ['purple', 'blue', 'pink', 'orange'], correct: 0 },
                { question: '"dunkelblau" means...', options: ['dark blue', 'light blue', 'black blue', 'blue'], correct: 0 },
                { question: '"orange" is...', options: ['orange', 'red', 'yellow', 'brown'], correct: 0 },
                { question: '"türkis" is...', options: ['turquoise', 'green', 'blue', 'grey'], correct: 0 }
              ]}
            },
            {
              id: 'a1m7d2t5', type: 'quickwin', title: 'Quick Win: Full Palette', description: 'You can describe colors in German',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 8 — Days & Months
    // ------------------------------------------------------------------
    {
      id: 8,
      title: 'Tage & Monate — Days & Months',
      icon: '📅',
      theme: 'Say today\'s date',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Days of the Week',
          tasks: [
            {
              id: 'a1m8d1t1', type: 'grammar', title: 'The Seven Days', description: 'Talk about today and tomorrow',
              xp: 15, content: {
                rule: 'German days of the week are easy to recognize. They all start with a capital letter.',
                steps: [
                  'Montag = Monday',
                  'Dienstag = Tuesday',
                  'Mittwoch = Wednesday (think: mid-week)',
                  'Donnerstag = Thursday',
                  'Freitag = Friday',
                  'Samstag = Saturday',
                  'Sonntag = Sunday'
                ],
                examples: [
                  { german: 'Heute ist Montag.', english: 'Today is Monday.' },
                  { german: 'Morgen ist Dienstag.', english: 'Tomorrow is Tuesday.' },
                  { german: 'Am Wochenende.', english: 'On the weekend.' }
                ],
                note: 'Mnemonic: Mittwoch sounds like "mid-week" — it is Wednesday.'
              }
            },
            {
              id: 'a1m8d1t2', type: 'vocabulary', title: 'Days of the Week', description: 'Monday to Sunday',
              xp: 15, content: { items: [
                { german: 'Montag', english: 'Monday', pronunciation: 'MON-tahk' },
                { german: 'Dienstag', english: 'Tuesday', pronunciation: 'DEEN-stahk' },
                { german: 'Mittwoch', english: 'Wednesday', pronunciation: 'MIT-vokh' },
                { german: 'Donnerstag', english: 'Thursday', pronunciation: 'DON-ers-tahk' },
                { german: 'Freitag', english: 'Friday', pronunciation: 'FRYE-tahk' },
                { german: 'Samstag', english: 'Saturday', pronunciation: 'ZAHMS-tahk' },
                { german: 'Sonntag', english: 'Sunday', pronunciation: 'ZON-tahk' }
              ]}
            },
            {
              id: 'a1m8d1t3', type: 'quiz', title: 'Days Quiz', description: 'Test the days',
              xp: 10, content: { questions: [
                { question: '"Montag" is...', options: ['Monday', 'Tuesday', 'Sunday', 'Friday'], correct: 0 },
                { question: '"Mittwoch" is...', options: ['Wednesday', 'Monday', 'Thursday', 'Saturday'], correct: 0 },
                { question: '"Sonntag" is...', options: ['Sunday', 'Saturday', 'Monday', 'Friday'], correct: 0 },
                { question: 'Which day comes after Freitag?', options: ['Samstag', 'Sonntag', 'Donnerstag', 'Mittwoch'], correct: 0 },
                { question: '"Heute ist Montag" means...', options: ['Today is Monday.', 'Tomorrow is Monday.', 'Monday is today.', 'It is Monday.'], correct: 0 }
              ]}
            },
            {
              id: 'a1m8d1t4', type: 'listening', title: 'Hear the Days', description: 'TTS days of the week',
              xp: 10, content: {
                clip: { title: 'Days of the week', source: 'TTS', text: 'Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag.' },
                questions: [
                  { question: 'Which day comes after Dienstag?', options: ['Mittwoch', 'Donnerstag', 'Montag', 'Freitag'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m8d1t5', type: 'quickwin', title: 'Quick Win: You Know the Week', description: 'Seven days, seven words',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 2,
          title: 'Months of the Year',
          tasks: [
            {
              id: 'a1m8d2t1', type: 'grammar', title: 'The Twelve Months', description: 'Many look almost like English',
              xp: 15, content: {
                rule: 'German month names are very close to English. Capitalize them, just like days.',
                steps: [
                  'Januar, Februar, März, April, Mai, Juni, Juli',
                  'August, September, Oktober, November, Dezember'
                ],
                examples: [
                  { german: 'Mein Geburtstag ist im Juli.', english: 'My birthday is in July.' },
                  { german: 'Wir sind im Januar.', english: 'We are in January.' },
                  { german: 'Der August ist heiß.', english: 'August is hot.' }
                ],
                note: 'Mnemonic: Look for the English month hiding inside — Januar, Februar, März, April...'
              }
            },
            {
              id: 'a1m8d2t2', type: 'vocabulary', title: 'Months', description: 'January to December',
              xp: 15, content: { items: [
                { german: 'Januar', english: 'January', pronunciation: 'YAH-noo-ahr' },
                { german: 'Februar', english: 'February', pronunciation: 'FAY-broo-ahr' },
                { german: 'März', english: 'March', pronunciation: 'mehrts' },
                { german: 'April', english: 'April', pronunciation: 'ah-PRIL' },
                { german: 'Mai', english: 'May', pronunciation: 'mye' },
                { german: 'Juni', english: 'June', pronunciation: 'YOO-nee' },
                { german: 'Juli', english: 'July', pronunciation: 'YOO-lee' },
                { german: 'August', english: 'August', pronunciation: 'OW-goost' },
                { german: 'September', english: 'September', pronunciation: 'zep-TEM-ber' },
                { german: 'Oktober', english: 'October', pronunciation: 'ok-TOH-ber' },
                { german: 'November', english: 'November', pronunciation: 'no-VEM-ber' },
                { german: 'Dezember', english: 'December', pronunciation: 'day-TSEM-ber' }
              ]}
            },
            {
              id: 'a1m8d2t3', type: 'quiz', title: 'Months Quiz', description: 'Test the months',
              xp: 10, content: { questions: [
                { question: '"Januar" is...', options: ['January', 'June', 'July', 'March'], correct: 0 },
                { question: '"März" is...', options: ['March', 'May', 'March? wait', 'April'], correct: 0 },
                { question: 'Which month is "Juli"?', options: ['July', 'June', 'January', 'August'], correct: 0 },
                { question: '"Dezember" is...', options: ['December', 'October', 'November', 'September'], correct: 0 },
                { question: 'Which month comes after Oktober?', options: ['November', 'September', 'Dezember', 'August'], correct: 0 }
              ]}
            },
            {
              id: 'a1m8d2t4', type: 'listening', title: 'Hear the Months', description: 'TTS months of the year',
              xp: 10, content: {
                clip: { title: 'Months of the year', source: 'TTS', text: 'Januar, Februar, März, April, Mai, Juni, Juli, August, September, Oktober, November, Dezember.' },
                questions: [
                  { question: 'Which month comes after Juni?', options: ['Juli', 'August', 'Mai', 'April'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m8d2t5', type: 'quickwin', title: 'Quick Win: Calendar Ready', description: 'You can say any day or month',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 9 — Hobbies & Professions
    // [GENERATED] hobbies and professions vocab was created because the
    // source slides were empty or image-only.
    // ------------------------------------------------------------------
    {
      id: 9,
      title: 'Hobbys & Berufe — Hobbies & Professions',
      icon: '🎸',
      theme: 'Talk about what you do',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Hobbies',
          tasks: [
            {
              id: 'a1m9d1t1', type: 'grammar', title: 'Talk About Free Time', description: 'Say what you like to do',
              xp: 15, content: {
                rule: 'To say you like an activity, use "Ich ... gern" or just "Ich ...". Keep it simple.',
                steps: [
                  'Ich spiele Fußball. = I play soccer.',
                  'Ich lese. = I read.',
                  'Ich höre Musik. = I listen to music.',
                  'Ich koche gern. = I like to cook.'
                ],
                examples: [
                  { german: 'Ich spiele Fußball.', english: 'I play soccer.' },
                  { german: 'Ich lese Bücher.', english: 'I read books.' },
                  { german: 'Ich höre Musik.', english: 'I listen to music.' },
                  { german: 'Ich tanze gern.', english: 'I like to dance.' }
                ],
                note: 'Mnemonic: Add "gern" after the action to show you enjoy it. It is like saying "gladly".'
              }
            },
            {
              id: 'a1m9d1t2', type: 'vocabulary', title: 'Common Hobbies', description: '[GENERATED] A1-level free-time activities',
              xp: 15, content: { items: [
                { german: 'Fußball spielen', english: 'to play soccer', pronunciation: 'FOOS-bahl SHPEE-len' },
                { german: 'lesen', english: 'to read', pronunciation: 'LAY-zen' },
                { german: 'Musik hören', english: 'to listen to music', pronunciation: 'moo-ZEEK HUR-en' },
                { german: 'kochen', english: 'to cook', pronunciation: 'KOKH-en' },
                { german: 'schwimmen', english: 'to swim', pronunciation: 'SHVIM-en' },
                { german: 'Fahrrad fahren', english: 'to ride a bike', pronunciation: 'FAHR-raht FAH-ren' },
                { german: 'zeichnen', english: 'to draw', pronunciation: 'TSYKH-nen' },
                { german: 'tanzen', english: 'to dance', pronunciation: 'TAHN-tsen' },
                { german: 'Computerspiele spielen', english: 'to play video games', pronunciation: 'kom-PYOO-ter-shpee-leh SHPEE-len' },
                { german: 'wandern', english: 'to hike', pronunciation: 'VAHN-dern' }
              ]}
            },
            {
              id: 'a1m9d1t3', type: 'matching', title: 'Match Hobbies', description: 'Match activity and meaning',
              xp: 10, content: { pairs: [
                { german: 'Fußball spielen', english: 'to play soccer' },
                { german: 'lesen', english: 'to read' },
                { german: 'Musik hören', english: 'to listen to music' },
                { german: 'kochen', english: 'to cook' },
                { german: 'schwimmen', english: 'to swim' },
                { german: 'Fahrrad fahren', english: 'to ride a bike' }
              ]}
            },
            {
              id: 'a1m9d1t4', type: 'quiz', title: 'Hobbies Quiz', description: 'Test the activities',
              xp: 10, content: { questions: [
                { question: '"Fußball spielen" means...', options: ['to play soccer', 'to play music', 'to play cards', 'to play chess'], correct: 0 },
                { question: '"lesen" means...', options: ['to read', 'to write', 'to listen', 'to speak'], correct: 0 },
                { question: '"Musik hören" means...', options: ['to listen to music', 'to play music', 'to make music', 'to sing'], correct: 0 },
                { question: '"Fahrrad fahren" means...', options: ['to ride a bike', 'to drive a car', 'to run', 'to walk'], correct: 0 },
                { question: '"Ich tanze gern" means...', options: ['I like to dance.', 'I dance badly.', 'I do not dance.', 'I dance today.'], correct: 0 }
              ]}
            },
            {
              id: 'a1m9d1t5', type: 'speaking', title: 'Say Your Hobby', description: 'TTS phrase practice',
              xp: 10, content: {
                prompt: 'Ich spiele Fußball. Ich lese. Ich höre Musik. Ich koche gern. Ich fahre Fahrrad.',
                tips: ['Choose the hobbies that are true for you.', 'Add "gern" to show you enjoy it.']
              }
            },
            {
              id: 'a1m9d1t6', type: 'quickwin', title: 'Quick Win: Talk About Free Time', description: 'You can describe your hobbies',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 2,
          title: 'Professions',
          tasks: [
            {
              id: 'a1m9d2t1', type: 'grammar', title: 'Say What You Do', description: 'Use "Ich bin ..." for jobs',
              xp: 15, content: {
                rule: 'To say your job, use "Ich bin ..." or "Er/Sie ist ...". Many jobs have a male form (with der) and a female form (with die).',
                steps: [
                  'Ich bin Lehrer. = I am a teacher (male speaker).',
                  'Ich bin Lehrerin. = I am a teacher (female speaker).',
                  'Er ist Arzt. = He is a doctor.',
                  'Sie ist Ärztin. = She is a doctor.'
                ],
                examples: [
                  { german: 'Ich bin Lehrer.', english: 'I am a teacher.' },
                  { german: 'Sie ist Ärztin.', english: 'She is a doctor.' },
                  { german: 'Er ist Kellner.', english: 'He is a waiter.' }
                ],
                note: 'Mnemonic: Many female jobs add -in: Lehrer → Lehrerin. Just like English "actor" → "actress".'
              }
            },
            {
              id: 'a1m9d2t2', type: 'vocabulary', title: 'Common Professions', description: '[GENERATED] A1-level jobs with male/female forms',
              xp: 15, content: { items: [
                { german: 'der Lehrer / die Lehrerin', english: 'teacher', pronunciation: 'der LAY-rer / dee LAY-rer-in' },
                { german: 'der Arzt / die Ärztin', english: 'doctor', pronunciation: 'der ahrtst / dee EHRST-in' },
                { german: 'der Kellner / die Kellnerin', english: 'waiter / waitress', pronunciation: 'der KEL-ner / dee KEL-ner-in' },
                { german: 'der Schüler / die Schülerin', english: 'student (school)', pronunciation: 'der SHUE-ler / dee SHUE-ler-in' },
                { german: 'der Koch / die Köchin', english: 'cook / chef', pronunciation: 'der kokh / dee KURKH-in' },
                { german: 'der Polizist / die Polizistin', english: 'police officer', pronunciation: 'der po-li-TSIST / dee po-li-TSIST-in' },
                { german: 'der Fahrer / die Fahrerin', english: 'driver', pronunciation: 'der FAHR-er / dee FAHR-er-in' },
                { german: 'der Verkäufer / die Verkäuferin', english: 'salesperson', pronunciation: 'der fer-KOY-fer / dee fer-KOY-fer-in' },
                { german: 'der Student / die Studentin', english: 'university student', pronunciation: 'der shtoo-DENT / dee shtoo-DENT-in' },
                { german: 'der Arbeiter / die Arbeiterin', english: 'worker', pronunciation: 'der AR-beye-ter / dee AR-beye-ter-in' }
              ]}
            },
            {
              id: 'a1m9d2t3', type: 'matching', title: 'Match Professions', description: 'Match job and meaning',
              xp: 10, content: { pairs: [
                { german: 'der Lehrer / die Lehrerin', english: 'teacher' },
                { german: 'der Arzt / die Ärztin', english: 'doctor' },
                { german: 'der Kellner / die Kellnerin', english: 'waiter / waitress' },
                { german: 'der Koch / die Köchin', english: 'cook / chef' },
                { german: 'der Student / die Studentin', english: 'university student' },
                { german: 'der Verkäufer / die Verkäuferin', english: 'salesperson' }
              ]}
            },
            {
              id: 'a1m9d2t4', type: 'quiz', title: 'Professions Quiz', description: 'Test the jobs',
              xp: 10, content: { questions: [
                { question: '"der Lehrer / die Lehrerin" is a...', options: ['teacher', 'doctor', 'driver', 'student'], correct: 0 },
                { question: '"der Arzt / die Ärztin" is a...', options: ['doctor', 'teacher', 'cook', 'worker'], correct: 0 },
                { question: '"der Kellner / die Kellnerin" works in a...', options: ['restaurant', 'hospital', 'school', 'office'], correct: 0 },
                { question: 'To say "She is a doctor" you say...', options: ['Sie ist Ärztin.', 'Sie ist Arzt.', 'Er ist Ärztin.', 'Ich bin Ärztin.'], correct: 0 },
                { question: 'The female form of "Lehrer" is...', options: ['Lehrerin', 'Lehrer', 'Lehrern', 'Lehrerinnen'], correct: 0 }
              ]}
            },
            {
              id: 'a1m9d2t5', type: 'speaking', title: 'Say Your Job', description: 'TTS profession practice',
              xp: 10, content: {
                prompt: 'Ich bin Lehrer. Ich bin Lehrerin. Er ist Arzt. Sie ist Ärztin. Ich bin Student. Ich bin Studentin.',
                tips: ['Pick the sentence that matches you.', 'Use "Ich bin" for yourself, "Er ist" for he, "Sie ist" for she.']
              }
            },
            {
              id: 'a1m9d2t6', type: 'quickwin', title: 'Quick Win: You Can Talk About Work', description: 'You can name common jobs',
              xp: 5, content: {}
            }
          ]
        }
      ]
    },

    // ------------------------------------------------------------------
    // Module 10 — Pronunciation Deep-Dive
    // ------------------------------------------------------------------
    {
      id: 10,
      title: 'Aussprache — Pronunciation Deep-Dive',
      icon: '🗣️',
      theme: 'Sound like you know what you\'re doing',
      unlocked: false,
      resources: [],
      days: [
        {
          day: 1,
          title: 'Vowel Combinations',
          tasks: [
            {
              id: 'a1m10d1t1', type: 'grammar', title: 'Vowel Teams', description: 'Letters that team up to make a new sound',
              xp: 15, content: {
                rule: 'When two vowels sit together, they often make one sound. Learn the sound, not the grammar name.',
                steps: [
                  'ie = long "ee" sound: sie, lieben, vier, sieben.',
                  'ei = "eye" sound: zwei, mein, klein, Eis.',
                  'au = "ow" sound: Auto, laut, Haus, auch.',
                  'eu / äu = "oy" sound: neu, teuer, Freund, Bäume.',
                  'vowel + h = hold the vowel longer: gehen, fahren, sehen, zahlen.',
                  'double vowels = hold longer: Haare, leer, Boot.',
                  'double consonants = short sound: kommen, offen, Wasser.'
                ],
                examples: [
                  { german: 'ie → sie, vier, sieben', english: 'long "ee"' },
                  { german: 'ei → zwei, mein, Eis', english: '"eye"' },
                  { german: 'au → Auto, Haus, laut', english: '"ow"' },
                  { german: 'eu/äu → neu, Freund, teuer', english: '"oy"' }
                ],
                note: 'Mnemonic: When i and e hold hands (ie), they say "ee". When e and i switch places (ei), they say "eye".'
              }
            },
            {
              id: 'a1m10d1t2', type: 'vocabulary', title: 'Vowel Team Words', description: 'Words you already know from earlier modules',
              xp: 15, content: { items: [
                { german: 'sie', english: 'she/they', pronunciation: 'zee' },
                { german: 'vier', english: 'four', pronunciation: 'feer' },
                { german: 'zwei', english: 'two', pronunciation: 'tsveye' },
                { german: 'mein', english: 'my', pronunciation: 'meyen' },
                { german: 'Auto', english: 'car', pronunciation: 'OW-toh' },
                { german: 'Haus', english: 'house', pronunciation: 'howss' },
                { german: 'neu', english: 'new', pronunciation: 'noy' },
                { german: 'Freund', english: 'friend', pronunciation: 'froynt' }
              ]}
            },
            {
              id: 'a1m10d1t3', type: 'listening', title: 'Hear Vowel Teams', description: 'TTS pronunciation of vowel pairs',
              xp: 10, content: {
                clip: { title: 'Vowel combinations', source: 'TTS', text: 'sie, vier, sieben, zwei, mein, Eis, Auto, Haus, laut, neu, Freund, teuer.' },
                questions: [
                  { question: 'Which sound does "ei" make?', options: ['eye', 'ee', 'oy', 'ow'], correct: 0 },
                  { question: '"eu" sounds like...', options: ['oy', 'ee', 'ow', 'eye'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m10d1t4', type: 'quiz', title: 'Vowel Teams Quiz', description: 'Test the pairs',
              xp: 10, content: { questions: [
                { question: '"ie" sounds like...', options: ['ee', 'eye', 'oy', 'ow'], correct: 0 },
                { question: '"zwei" has which vowel team?', options: ['ei', 'ie', 'au', 'eu'], correct: 0 },
                { question: '"Auto" has which sound?', options: ['ow', 'eye', 'ee', 'oy'], correct: 0 },
                { question: '"Freund" has which sound?', options: ['oy', 'ow', 'ee', 'eye'], correct: 0 },
                { question: 'In "gehen", the "h" makes the "e"...', options: ['longer', 'silent', 'shorter', 'sharp'], correct: 0 }
              ]}
            },
            {
              id: 'a1m10d1t5', type: 'quickwin', title: 'Quick Win: Vowel Teams Mastered', description: 'You can read German vowel pairs',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 2,
          title: 'Consonant Combinations',
          tasks: [
            {
              id: 'a1m10d2t1', type: 'grammar', title: 'Tricky Consonant Teams', description: 'Groups of consonants that change sound',
              xp: 15, content: {
                rule: 'Some consonant groups have a special sound. Learn them as teams, not as separate letters.',
                steps: [
                  'sch = "sh": Schule, schreiben, deutsch.',
                  'ch after a/o/u = "kh": acht, kochen, Buch.',
                  'ch after e/i/ä/ö/ü = "sh": ich, nicht, Bücher.',
                  'ck = hard "k": backen.',
                  'sp at the start = "shp": Sport, sprechen, spielen.',
                  'st at the start = "sht": stehen, Student.',
                  'ig at the end = "ich": richtig, zwanzig.',
                  'tion = "tsion": Kombination.',
                  'pf = "pf": Pferd.',
                  'chs = "x": sechs, wachsen.'
                ],
                examples: [
                  { german: 'sch → Schule, deutsch', english: 'sh sound' },
                  { german: 'ch (a/o/u) → acht, Buch', english: 'kh sound' },
                  { german: 'ch (e/i) → ich, nicht', english: 'sh sound' },
                  { german: 'sp/st → Sport, Student', english: 'shp / sht at start' }
                ],
                note: 'Mnemonic: "sch" is always the friendly "sh" sound you already know from English.'
              }
            },
            {
              id: 'a1m10d2t2', type: 'vocabulary', title: 'Consonant Team Words', description: 'Words from earlier modules',
              xp: 15, content: { items: [
                { german: 'Schule', english: 'school', pronunciation: 'SHOO-leh' },
                { german: 'deutsch', english: 'German', pronunciation: 'doytsh' },
                { german: 'acht', english: 'eight', pronunciation: 'ahkht' },
                { german: 'Buch', english: 'book', pronunciation: 'bookh' },
                { german: 'ich', english: 'I', pronunciation: 'ikh' },
                { german: 'nicht', english: 'not', pronunciation: 'nikht' },
                { german: 'Sport', english: 'sports', pronunciation: 'shport' },
                { german: 'Student', english: 'student', pronunciation: 'shtoo-DENT' },
                { german: 'sechs', english: 'six', pronunciation: 'zekhs' },
                { german: 'Pferd', english: 'horse', pronunciation: 'pfehrt' }
              ]}
            },
            {
              id: 'a1m10d2t3', type: 'listening', title: 'Hear Consonant Teams', description: 'TTS pronunciation of consonant groups',
              xp: 10, content: {
                clip: { title: 'Consonant combinations', source: 'TTS', text: 'Schule, deutsch, acht, Buch, ich, nicht, Sport, Student, richtig, zwanzig, sechs, Pferd.' },
                questions: [
                  { question: '"sch" sounds like...', options: ['sh', 'sk', 'ch', 's'], correct: 0 },
                  { question: '"sechs" ends with which sound?', options: ['x', 'ks', 'khs', 's'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m10d2t4', type: 'quiz', title: 'Consonant Teams Quiz', description: 'Test the teams',
              xp: 10, content: { questions: [
                { question: '"sch" is pronounced...', options: ['sh', 'sk', 'ch', 's'], correct: 0 },
                { question: '"Buch" has the "kh" sound because ch comes after...', options: ['a/o/u', 'e/i', 'any letter', 'no reason'], correct: 0 },
                { question: '"ich" has the "sh" sound because ch comes after...', options: ['e/i/ä/ö/ü', 'a/o/u', 's', 'p'], correct: 0 },
                { question: '"Sport" starts with...', options: ['shport', 'sport', 'sphort', 'sportz'], correct: 0 },
                { question: '"sechs" sounds like...', options: ['zekhs', 'seks', 'ses', 'zekss'], correct: 0 }
              ]}
            },
            {
              id: 'a1m10d2t5', type: 'quickwin', title: 'Quick Win: Pronunciation Hero', description: 'You can tackle the trickiest German sounds',
              xp: 5, content: {}
            }
          ]
        }
      ]
    }
  ]
};

export default a1SpoonfedModules;
