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
    // Module 1 — Your First Week: Meeting People
    // ------------------------------------------------------------------
    {
      id: 1,
      title: 'Deine Erste Woche — Your First Week: Meeting People',
      icon: '👋',
      theme: 'Say hello, say where you are from, and have your first real conversations',
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
        },
        {
          day: 2,
          title: 'Where You Are From: Ich komme aus…',
          tasks: [
            {
              id: 'a1m1d2t1', type: 'grammar', title: 'Say Where You Are From', description: 'One sentence that starts every conversation',
              xp: 15, content: {
                rule: '"Ich komme aus ..." means "I come from ...". Copy this shape and you can name any country or city. The question is "Woher kommst du?" (Where are you from?) — notice "kommst" is the same word with a "t" when you ask someone else.',
                steps: [
                  'Say your country: "Ich komme aus Deutschland."',
                  'Say your city: "Ich komme aus Berlin."',
                  'Ask a friend: "Woher kommst du?"',
                  'Answer "aus" the same way both times — you never change this word.'
                ],
                examples: [
                  { german: 'Ich komme aus Indien.', english: 'I\'m from India.' },
                  { german: 'Ich komme aus Spanien.', english: 'I\'m from Spain.' },
                  { german: 'Woher kommst du?', english: 'Where are you from?' },
                  { german: 'Ich komme aus der Türkei.', english: 'I\'m from Turkey.' }
                ],
                note: 'Remember the shape: Ich komme aus + place. Once you have this, "Woher kommst du?" is the only question you need to keep the talk going.'
              }
            },
            {
              id: 'a1m1d2t2', type: 'vocabulary', title: 'Countries & Cities', description: 'Where you — and your new friends — come from',
              xp: 15, content: { items: [
                { german: 'ich komme aus', english: 'I come from', pronunciation: 'ikh KOH-muh ows' },
                { german: 'Deutschland', english: 'Germany', pronunciation: 'DOYTSH-lahnt' },
                { german: 'Indien', english: 'India', pronunciation: 'IN-dee-en' },
                { german: 'Spanien', english: 'Spain', pronunciation: 'SHPAH-nee-en' },
                { german: 'Italien', english: 'Italy', pronunciation: 'ee-TAH-lee-en' },
                { german: 'die Türkei', english: 'Turkey', pronunciation: 'dee toor-KAY' },
                { german: 'England', english: 'England', pronunciation: 'ENG-lahnt' },
                { german: 'China', english: 'China', pronunciation: 'KHEE-nah' }
              ]}
            },
            {
              id: 'a1m1d2t3', type: 'listening', title: 'Where Are You From?', description: 'Hear the pattern in a real conversation',
              xp: 10, content: {
                clip: { title: 'Getting to know each other', source: 'TTS dialogue', text: 'Hallo! Ich heiße Lena. Woher kommst du? Ich komme aus Indien. Und du? Ich komme aus Spanien. Schön! Tschüss!' },
                questions: [
                  { question: 'Where is the speaker from first?', options: ['India', 'Spain', 'Germany', 'Turkey'], correct: 0 },
                  { question: 'What does "Und du?" mean here?', options: ['And you?', 'Who are you?', 'Good-bye', 'Thanks'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m1d2t4', type: 'matching', title: 'Match Country Pairs', description: 'German country names vs English',
              xp: 10, content: { pairs: [
                { german: 'Deutschland', english: 'Germany' },
                { german: 'Indien', english: 'India' },
                { german: 'Spanien', english: 'Spain' },
                { german: 'Italien', english: 'Italy' },
                { german: 'England', english: 'England' },
                { german: 'die Türkei', english: 'Turkey' }
              ]}
            },
            {
              id: 'a1m1d2t5', type: 'speaking', title: 'Say Where You Are From', description: 'Give your first two-sentence introduction',
              xp: 10, content: {
                prompt: 'Ich heiße ... Ich komme aus ... Then ask back: Und du? Woher kommst du?',
                tips: ['Start with your name, then "Ich komme aus ...".', 'Say "aus" without stress — the place name is the star.', 'Keep "Woher kommst du?" ready for the other person.']
              }
            },
            {
              id: 'a1m1d2t6', type: 'quickwin', title: 'Quick Win: You Can Say Where You\'re From', description: 'Name your country and ask someone theirs',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 3,
          title: 'Your Family: Meine Familie',
          tasks: [
            {
              id: 'a1m1d3t1', type: 'grammar', title: 'Name the People in Your Life', description: 'Talk about your family without stopping',
              xp: 15, content: {
                rule: 'Copy these phrases: "Das ist meine Mutter" (this is my mother) and "Das ist mein Vater" (this is my father). Notice the little word before the person: "meine" for women like Mutter and Schwester, "mein" for men like Vater and Bruder. Do not memorize a rule yet — just notice it when you hear it.',
                steps: [
                  'Point and name: "Das ist meine Mutter."',
                  'Name your father: "Das ist mein Vater."',
                  'Say your sister\'s name: "Meine Schwester heißt ..."',
                  'Notice the pattern: women take "meine", men take "mein".'
                ],
                examples: [
                  { german: 'Das ist meine Mutter.', english: 'This is my mother.' },
                  { german: 'Das ist mein Vater.', english: 'This is my father.' },
                  { german: 'Meine Schwester heißt Lea.', english: 'My sister is called Lea.' },
                  { german: 'Mein Bruder ist zehn.', english: 'My brother is ten.' }
                ],
                note: 'Reference card (no need to memorize yet): "meine" goes with women, "mein" with men. You will use both every day from now on.'
              }
            },
            {
              id: 'a1m1d3t2', type: 'vocabulary', title: 'Family Words', description: 'The six you will actually use this week',
              xp: 15, content: { items: [
                { german: 'die Mutter', english: 'mother', pronunciation: 'dee MOO-ter' },
                { german: 'der Vater', english: 'father', pronunciation: 'der FAH-ter' },
                { german: 'die Schwester', english: 'sister', pronunciation: 'dee SHVES-ter' },
                { german: 'der Bruder', english: 'brother', pronunciation: 'der BROO-der' },
                { german: 'die Oma', english: 'grandma', pronunciation: 'dee OH-mah' },
                { german: 'der Opa', english: 'grandpa', pronunciation: 'der OH-pah' }
              ]}
            },
            {
              id: 'a1m1d3t3', type: 'matching', title: 'Match Family Words', description: 'German and English, side by side',
              xp: 10, content: { pairs: [
                { german: 'die Mutter', english: 'mother' },
                { german: 'der Vater', english: 'father' },
                { german: 'die Schwester', english: 'sister' },
                { german: 'der Bruder', english: 'brother' },
                { german: 'die Oma', english: 'grandma' },
                { german: 'der Opa', english: 'grandpa' }
              ]}
            },
            {
              id: 'a1m1d3t4', type: 'fillblank', title: 'Meine or Mein?', description: 'Pick the little word, like you heard it',
              xp: 10, content: { sentences: [
                { text: 'Das ist ___ Mutter.', answer: 'meine', hint: 'mother is a woman → meine' },
                { text: 'Das ist ___ Vater.', answer: 'mein', hint: 'father is a man → mein' },
                { text: '___ Schwester heißt Lea.', answer: 'Meine', hint: 'sister is a woman' },
                { text: '___ Bruder ist zehn.', answer: 'Mein', hint: 'brother is a man' }
              ]}
            },
            {
              id: 'a1m1d3t5', type: 'quiz', title: 'Family Quiz', description: 'Check the family words',
              xp: 10, content: { questions: [
                { question: '"die Mutter" means...', options: ['mother', 'father', 'sister', 'grandma'], correct: 0 },
                { question: '"der Bruder" means...', options: ['brother', 'father', 'uncle', 'grandpa'], correct: 0 },
                { question: 'Which word is for grandma?', options: ['die Oma', 'der Opa', 'die Mutter', 'die Schwester'], correct: 0 },
                { question: '"Meine Schwester" — Schwester is a...', options: ['woman', 'man', 'sibling group', 'child'], correct: 0 },
                { question: 'Which phrase names your father?', options: ['Das ist mein Vater.', 'Das ist meine Mutter.', 'Mein Bruder ist zehn.', 'Ich heiße Lea.'], correct: 0 }
              ]}
            },
            {
              id: 'a1m1d3t6', type: 'quickwin', title: 'Quick Win: Talk About Family', description: 'You can name the people you care about in German',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 4,
          title: 'Things Around You: Was ist das?',
          tasks: [
            {
              id: 'a1m1d4t1', type: 'grammar', title: 'Name Things Around You', description: 'Ask what something is and say it back',
              xp: 15, content: {
                rule: 'Every thing in German comes with a little word: "der", "die", or "das". Do not try to learn the rule — learn each new thing together with its little word, like one piece (der Tisch, die Lampe, das Buch). To ask what something is, say "Was ist das?" and answer "Das ist ...".',
                steps: [
                  'Point at something and ask: "Was ist das?"',
                  'Answer for the things you know: "Das ist ein Tisch."',
                  '"ein" is used with der/das things, "eine" with die things.',
                  'Learn every new thing with its little word from day one.'
                ],
                examples: [
                  { german: 'Was ist das?', english: 'What is that?' },
                  { german: 'Das ist ein Tisch.', english: 'That is a table.' },
                  { german: 'Das ist eine Lampe.', english: 'That is a lamp.' },
                  { german: 'Das ist ein Buch.', english: 'That is a book.' }
                ],
                note: 'Reference card: things never come alone — each one brings der, die or das. "ein/eine" means "a/an" and follows the same little word pattern.'
              }
            },
            {
              id: 'a1m1d4t2', type: 'vocabulary', title: 'Everyday Objects', description: 'Eight things in the room with you',
              xp: 15, content: { items: [
                { german: 'der Tisch', english: 'table', pronunciation: 'der tish' },
                { german: 'der Stuhl', english: 'chair', pronunciation: 'der shtool' },
                { german: 'die Lampe', english: 'lamp', pronunciation: 'dee LAHM-peh' },
                { german: 'das Buch', english: 'book', pronunciation: 'das booKH' },
                { german: 'das Handy', english: 'mobile phone', pronunciation: 'das HEN-dee' },
                { german: 'die Uhr', english: 'clock / watch', pronunciation: 'dee oor' },
                { german: 'die Tür', english: 'door', pronunciation: 'dee toor' },
                { german: 'das Fenster', english: 'window', pronunciation: 'das FEN-ster' }
              ]}
            },
            {
              id: 'a1m1d4t3', type: 'flashcards', title: 'Things with Their Little Word', description: 'Learn the thing and its der/die/das together',
              xp: 15, content: { cards: [
                { front: 'der Tisch', back: 'table', example: 'Das ist ein Tisch.' },
                { front: 'der Stuhl', back: 'chair', example: 'Das ist ein Stuhl.' },
                { front: 'die Lampe', back: 'lamp', example: 'Das ist eine Lampe.' },
                { front: 'das Buch', back: 'book', example: 'Das ist ein Buch.' },
                { front: 'das Handy', back: 'mobile phone', example: 'Das ist ein Handy.' },
                { front: 'die Tür', back: 'door', example: 'Das ist eine Tür.' },
                { front: 'das Fenster', back: 'window', example: 'Das ist ein Fenster.' }
              ]}
            },
            {
              id: 'a1m1d4t4', type: 'fillblank', title: 'Ein or Eine?', description: 'Match the little word to the thing',
              xp: 10, content: { sentences: [
                { text: 'Das ist ___ Tisch.', answer: 'ein', hint: 'der Tisch → ein' },
                { text: 'Das ist ___ Lampe.', answer: 'eine', hint: 'die Lampe → eine' },
                { text: 'Das ist ___ Buch.', answer: 'ein', hint: 'das Buch → ein' },
                { text: 'Das ist ___ Tür.', answer: 'eine', hint: 'die Tür → eine' },
                { text: 'Das ist ___ Fenster.', answer: 'ein', hint: 'das Fenster → ein' }
              ]}
            },
            {
              id: 'a1m1d4t5', type: 'quiz', title: 'Objects Quiz', description: 'Show what the things around you are called',
              xp: 10, content: { questions: [
                { question: '"das Buch" means...', options: ['book', 'table', 'door', 'clock'], correct: 0 },
                { question: 'Which little word goes with "Lampe"?', options: ['die', 'der', 'das', 'ein'], correct: 0 },
                { question: '"Das ist eine Tür" — you would say this pointing at a...', options: ['door', 'table', 'book', 'phone'], correct: 0 },
                { question: '"Was ist das?" asks...', options: ['what something is', 'where someone is from', 'how old someone is', 'someone\'s name'], correct: 0 },
                { question: 'How do you answer "Was ist das?" for a lamp?', options: ['Das ist eine Lampe.', 'Das ist ein Lampe.', 'Das ist der Lampe.', 'Lampe ein das.'], correct: 0 }
              ]}
            },
            {
              id: 'a1m1d4t6', type: 'quickwin', title: 'Quick Win: Name the Things Around You', description: 'Point, ask, and answer — you\'ve got it',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 5,
          title: 'What You Do: Ich heiße, ich wohne, ich spreche',
          tasks: [
            {
              id: 'a1m1d5t1', type: 'grammar', title: 'Say What You Do', description: 'Action words that show up in every chat',
              xp: 15, content: {
                rule: 'Action words are easy once you meet them in phrases. Notice how the ending changes when you switch from "I" to "you": "Ich heiße" (I\'m called) becomes "Du heißt"; "Ich wohne" (I live) becomes "Du wohnst"; "Ich komme" becomes "Du kommst". Do not learn a table — learn each pair as you use it.',
                steps: [
                  'Introduce yourself with an action: "Ich wohne in Berlin."',
                  'Ask the other person: "Wo wohnst du?"',
                  'Talk about languages: "Ich spreche Englisch und Deutsch."',
                  'Notice: ich ends in "-e/or nothing", du ends in "-st/-t".'
                ],
                examples: [
                  { german: 'Ich wohne in Berlin.', english: 'I live in Berlin.' },
                  { german: 'Wo wohnst du?', english: 'Where do you live?' },
                  { german: 'Ich spreche Deutsch.', english: 'I speak German.' },
                  { german: 'Sprichst du Englisch?', english: 'Do you speak English?' }
                ],
                note: 'Reference card: "ich" → "du" usually means changing the ending to "-st" or "-t". You will pick up the exceptions (like heiße → heißt) by hearing them.'
              }
            },
            {
              id: 'a1m1d5t2', type: 'vocabulary', title: 'Your Action Words', description: 'Verbs you can put to work right now',
              xp: 15, content: { items: [
                { german: 'wohnen', english: 'to live', pronunciation: 'VOH-nen' },
                { german: 'sprechen', english: 'to speak', pronunciation: 'SHPREH-khen' },
                { german: 'lernen', english: 'to learn', pronunciation: 'LER-nen' },
                { german: 'kommen', english: 'to come', pronunciation: 'KOH-men' },
                { german: 'spielen', english: 'to play', pronunciation: 'SHPEEL-en' },
                { german: 'essen', english: 'to eat', pronunciation: 'ES-en' }
              ]}
            },
            {
              id: 'a1m1d5t3', type: 'fillblank', title: 'Ich or Du?', description: 'Choose the right ending for the sentence',
              xp: 10, content: { sentences: [
                { text: 'Ich ___ in Berlin.', answer: 'wohne', hint: 'ich → wohne' },
                { text: 'Wo ___ du?', answer: 'wohnst', hint: 'du → wohnst' },
                { text: 'Ich ___ Deutsch.', answer: 'spreche', hint: 'ich → spreche' },
                { text: 'Ich ___ aus Indien.', answer: 'komme', hint: 'ich → komme' },
                { text: 'Ich ___ Deutsch. (to learn)', answer: 'lerne', hint: 'lernen with ich' }
              ]}
            },
            {
              id: 'a1m1d5t4', type: 'scramble', title: 'Unscramble the Actions', description: 'Put the letters back into a verb',
              xp: 10, content: { words: [
                { scrambled: 'nenwoh', answer: 'wohnen', hint: 'to live' },
                { scrambled: 'cheprens', answer: 'sprechen', hint: 'to speak' },
                { scrambled: 'nenler', answer: 'lernen', hint: 'to learn' },
                { scrambled: 'menkom', answer: 'kommen', hint: 'to come' }
              ]}
            },
            {
              id: 'a1m1d5t5', type: 'quiz', title: 'Action Words Quiz', description: 'The verbs from this day',
              xp: 10, content: { questions: [
                { question: '"ich wohne" means...', options: ['I live', 'I speak', 'I play', 'I eat'], correct: 0 },
                { question: 'Which is the right "du" form of "wohnen"?', options: ['wohnst', 'wohne', 'wohnt', 'wohnen'], correct: 0 },
                { question: '"sprechen" means...', options: ['to speak', 'to live', 'to learn', 'to come'], correct: 0 },
                { question: '"Du heißt Anna" means...', options: ['You are called Anna', 'I am called Anna', 'Anna is coming', 'Anna lives here'], correct: 0 },
                { question: '"Ich lerne Deutsch" means...', options: ['I am learning German', 'I am speaking German', 'I live in Germany', 'I eat in German'], correct: 0 }
              ]}
            },
            {
              id: 'a1m1d5t6', type: 'quickwin', title: 'Quick Win: Talk About What You Do', description: 'Introduce yourself with action words',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 6,
          title: 'Your Age: Zahlen & Wie alt bist du?',
          tasks: [
            {
              id: 'a1m1d6t1', type: 'grammar', title: 'Say How Old You Are', description: 'Numbers 1–12 and the question that uses them',
              xp: 15, content: {
                rule: 'To say your age: "Ich bin ___ Jahre alt" (I am ___ years old). To ask: "Wie alt bist du?" (How old are you?). You only need the numbers from one to twelve for this, so start there — eleven (elf) and twelve (zwölf) are the only two that do not follow any pattern.',
                steps: [
                  'Count on your fingers: eins, zwei, drei, vier, fünf, sechs.',
                  'Continue: sieben, acht, neun, zehn, elf, zwölf.',
                  'Say your age: "Ich bin zehn Jahre alt."',
                  'Ask back: "Und du? Wie alt bist du?"'
                ],
                examples: [
                  { german: 'Ich bin zehn Jahre alt.', english: 'I am ten years old.' },
                  { german: 'Wie alt bist du?', english: 'How old are you?' },
                  { german: 'eins, zwei, drei', english: '1, 2, 3' },
                  { german: 'elf, zwölf', english: '11, 12' }
                ],
                note: 'Reference card: age uses "bin" (I am) + number + "Jahre alt". The numbers 1–12 are special — learn them as one song.'
              }
            },
            {
              id: 'a1m1d6t2', type: 'vocabulary', title: 'Numbers 1–12', description: 'The golden dozen',
              xp: 15, content: { items: [
                { german: 'eins', english: '1', pronunciation: 'eyns' },
                { german: 'zwei', english: '2', pronunciation: 'tsvay' },
                { german: 'drei', english: '3', pronunciation: 'dry' },
                { german: 'vier', english: '4', pronunciation: 'feer' },
                { german: 'fünf', english: '5', pronunciation: 'foonf' },
                { german: 'sechs', english: '6', pronunciation: 'zeks' },
                { german: 'sieben', english: '7', pronunciation: 'ZEE-ben' },
                { german: 'acht', english: '8', pronunciation: 'ahkht' },
                { german: 'neun', english: '9', pronunciation: 'noyn' },
                { german: 'zehn', english: '10', pronunciation: 'tsayn' },
                { german: 'elf', english: '11', pronunciation: 'elf' },
                { german: 'zwölf', english: '12', pronunciation: 'tsvoelf' }
              ]}
            },
            {
              id: 'a1m1d6t3', type: 'listening', title: 'How Old Are You?', description: 'Hear ages in a chat',
              xp: 10, content: {
                clip: { title: 'Ages in a chat', source: 'TTS dialogue', text: 'Hallo, ich bin Paul. Wie alt bist du? Ich bin zwölf. Und mein Bruder ist zehn. Schön! Mein Bruder ist auch zehn.' },
                questions: [
                  { question: 'How old is the speaker?', options: ['twelve', 'ten', 'eleven', 'nine'], correct: 0 },
                  { question: 'How old is Paul\'s brother?', options: ['ten', 'twelve', 'eight', 'eleven'], correct: 0 }
                ]
              }
            },
            {
              id: 'a1m1d6t4', type: 'fillblank', title: 'Your Age Sentence', description: 'Fill in the number',
              xp: 10, content: { sentences: [
                { text: 'Ich bin ____ Jahre alt. (5)', answer: 'fünf', hint: '5 → fünf' },
                { text: 'Ich bin ____ Jahre alt. (10)', answer: 'zehn', hint: '10 → zehn' },
                { text: 'Ich bin ____ Jahre alt. (12)', answer: 'zwölf', hint: '12 → zwölf' },
                { text: 'Mein Bruder ist ____. (3)', answer: 'drei', hint: '3 → drei' },
                { text: 'Meine Schwester ist ____. (7)', answer: 'sieben', hint: '7 → sieben' }
              ]}
            },
            {
              id: 'a1m1d6t5', type: 'quiz', title: 'Numbers & Age Quiz', description: 'The golden dozen and how to use it',
              xp: 10, content: { questions: [
                { question: '"Wie alt bist du?" asks your...', options: ['age', 'name', 'country', 'occupation'], correct: 0 },
                { question: 'In German, you say your age with "Ich bin ___ Jahre ___".', options: ['alt', 'neu', 'groß', 'jung'], correct: 0 },
                { question: '11 in German is...', options: ['elf', 'zehn', 'zwölf', 'neun'], correct: 0 },
                { question: '"zwölf" is...', options: ['12', '11', '2', '10'], correct: 0 },
                { question: '"drei" is...', options: ['3', '4', '5', '2'], correct: 0 }
              ]}
            },
            {
              id: 'a1m1d6t6', type: 'quickwin', title: 'Quick Win: Say Your Age', description: 'Numbers are in — and so is your age',
              xp: 5, content: {}
            }
          ]
        },
        {
          day: 7,
          title: 'Your First Conversation: Review & Roleplay',
          tasks: [
            {
              id: 'a1m1d7t1', type: 'flashcards', title: 'Week One Review', description: 'All the words from your first week, one card at a time',
              xp: 15, content: { cards: [
                { front: 'Hallo', back: 'Hello', example: 'Hallo, ich heiße Lea!' },
                { front: 'Guten Morgen', back: 'Good morning', example: 'Guten Morgen! Wie geht\'s?' },
                { front: 'Ich komme aus', back: 'I come from', example: 'Ich komme aus Indien.' },
                { front: 'Woher kommst du?', back: 'Where are you from?', example: 'Woher kommst du? — Ich komme aus Spanien.' },
                { front: 'die Mutter', back: 'mother', example: 'Das ist meine Mutter.' },
                { front: 'der Vater', back: 'father', example: 'Das ist mein Vater.' },
                { front: 'das Buch', back: 'book', example: 'Was ist das? Das ist ein Buch.' },
                { front: 'wohnen', back: 'to live', example: 'Ich wohne in Berlin.' },
                { front: 'sprechen', back: 'to speak', example: 'Ich spreche Deutsch.' },
                { front: 'zwölf', back: '12', example: 'Mein Bruder ist zwölf.' }
              ]}
            },
            {
              id: 'a1m1d7t2', type: 'quiz', title: 'Week One Quiz', description: 'Everything from this week in five questions',
              xp: 10, content: { questions: [
                { question: 'Answer "Wie geht\'s?" with...', options: ['Gut, danke', 'Tschüss', 'Ich komme aus', 'Was ist das?'], correct: 0 },
                { question: 'Which tells someone you are from Germany?', options: ['Ich komme aus Deutschland.', 'Ich wohne in Berlin.', 'Ich spreche Deutsch.', 'Ich bin zwölf.'], correct: 0 },
                { question: '"Das ist meine Schwester" introduces...', options: ['your sister', 'your brother', 'your father', 'your mother'], correct: 0 },
                { question: 'Which little word goes with "Lampe"?', options: ['die', 'der', 'das', 'zwei'], correct: 0 },
                { question: '"Wo wohnst du?" asks where you...', options: ['live', 'are from', 'work', 'go'], correct: 0 }
              ]}
            },
            {
              id: 'a1m1d7t3', type: 'matching', title: 'Week One Word Match', description: 'Pairs from all six days',
              xp: 10, content: { pairs: [
                { german: 'Hallo', english: 'Hello' },
                { german: 'Ich komme aus', english: 'I come from' },
                { german: 'die Schwester', english: 'sister' },
                { german: 'das Handy', english: 'mobile phone' },
                { german: 'lernen', english: 'to learn' },
                { german: 'fünf', english: '5' }
              ]}
            },
            {
              id: 'a1m1d7t4', type: 'roleplay', title: 'Meeting Someone New', description: 'Put your first week to work',
              xp: 10, content: {
                scenario: 'You meet someone new at a German course. They want to get to know you.',
                steps: [
                  'Greet them and say your name: "Hallo, ich heiße ..."',
                  'Ask their name: "Wie heißt du?"',
                  'Say where you are from: "Ich komme aus ..." and ask "Woher kommst du?"',
                  'Practice once more: ask something you learned this week, like their age ("Wie alt bist du?").',
                  'End the chat: "Tschüss! Schönen Tag!"'
                ]
              }
            },
            {
              id: 'a1m1d7t5', type: 'quickwin', title: 'Quick Win: Your First Real Conversation', description: 'A whole short conversation in German — you built it yourself',
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
