// Auto-generated A1 curriculum content for weeks 3-8.
// Each week follows the same 7-day shape used in weeks 1-2.

const makeFlashcards = (cards) => ({ cards });
const makeGrammar = (rule, examples, note) => ({ rule, examples, note });
const makeVocab = (items) => ({ items });
const makeQuiz = (questions) => ({ questions });
const makeMatching = (pairs) => ({ pairs });
const makeFillBlank = (sentences) => ({ sentences });
const makeScramble = (words) => ({ words });
const makeListening = (title, text, questions) => ({ clip: { title, source: 'Listen and answer', text }, questions });
const makeSpeaking = (prompt, tips) => ({ prompt, tips });
const makeWriting = (prompt, example, tips) => ({ prompt, example, tips });
const makeRoleplay = (scenario, steps) => ({ scenario, steps });
const makeQuickWin = () => ({});

function dayReviewQuestions(weekIndex) {
  const banks = [
    [
      { q: 'What does "um acht Uhr" mean?', options: ['at 8 o\'clock', 'after 8 hours', '8 hours long', 'before 8'], correct: 0 },
      { q: '"Ich stehe ___" means "I get up".', options: ['auf', 'an', 'ein', 'zu'], correct: 0 },
      { q: 'How do you say "breakfast"?', options: ['Mittagessen', 'Abendessen', 'Frühstück', 'Brot'], correct: 2 },
      { q: '"Wie spät ist es?" means...', options: ['How old are you?', 'What time is it?', 'How long is it?', 'How much is it?'], correct: 1 },
      { q: '"Ich esse ___ Brot." (a piece of bread)', options: ['eine', 'einen', 'ein', 'der'], correct: 2 },
      { q: 'What is "die Uhr"?', options: ['the door', 'the clock/watch', 'the hour', 'the house'], correct: 1 },
      { q: '"Ich gehe ins Bett" means...', options: ['I go to bed', 'I get up', 'I eat', 'I work'], correct: 0 },
      { q: 'Which meal comes in the evening?', options: ['Frühstück', 'Mittagessen', 'Abendessen', 'Zwischenmahlzeit'], correct: 2 },
      { q: '"Jeden Tag" means...', options: ['yesterday', 'every day', 'today', 'tomorrow'], correct: 1 },
      { q: '"Ich mache Sport" means...', options: ['I do sports', 'I watch TV', 'I read', 'I cook'], correct: 0 },
    ],
    [
      { q: 'What does "die Mutter" mean?', options: ['mother', 'father', 'sister', 'aunt'], correct: 0 },
      { q: 'What does "der Bruder" mean?', options: ['brother', 'father', 'son', 'uncle'], correct: 0 },
      { q: '"Mein" is used with...', options: ['masculine and neuter nouns', 'only feminine nouns', 'only plural nouns', 'only verbs'], correct: 0 },
      { q: '"Deine Schwester" means...', options: ['your sister', 'my sister', 'his sister', 'her sister'], correct: 0 },
      { q: '"Das ist ___ Vater." (my)', options: ['mein', 'meine', 'meinen', 'meiner'], correct: 0 },
      { q: '"Das ist ___ Mutter." (my)', options: ['mein', 'meine', 'meinen', 'meiner'], correct: 1 },
      { q: 'What does "die Familie" mean?', options: ['family', 'friend', 'father', 'woman'], correct: 0 },
      { q: '"Der Sohn" means...', options: ['the son', 'the daughter', 'the father', 'the brother'], correct: 0 },
      { q: '"Die Tochter" means...', options: ['the daughter', 'the son', 'the mother', 'the sister'], correct: 0 },
      { q: '"Wir sind ___ Familie." (a)', options: ['ein', 'eine', 'einen', 'einer'], correct: 1 },
    ],
    [
      { q: 'What does "der Supermarkt" mean?', options: ['supermarket', 'market', 'shop', 'mall'], correct: 0 },
      { q: 'How do you ask "How much does it cost?"', options: ['Wie viel kostet das?', 'Was kostet das?', 'Wo ist das?', 'Wie ist das?'], correct: 0 },
      { q: '"Ich möchte ___ Kaffee, bitte."', options: ['ein', 'eine', 'einen', 'der'], correct: 0 },
      { q: '"Ich hätte gern ___ Brötchen."', options: ['ein', 'eine', 'einen', 'der'], correct: 0 },
      { q: 'What does "die Rechnung" mean?', options: ['the bill', 'the menu', 'the receipt', 'the tip'], correct: 0 },
      { q: '"Zahlen, bitte!" means...', options: ['Please pay!', 'The bill, please!', 'Please count!', 'Please wait!'], correct: 1 },
      { q: 'What does "das Brot" mean?', options: ['bread', 'cake', 'meat', 'cheese'], correct: 0 },
      { q: '"Ich nehme ___ Wasser."', options: ['ein', 'eine', 'einen', 'das'], correct: 0 },
      { q: '"Das macht ___ Euro." (5)', options: ['fünf', 'fünfzehn', 'fünfzig', 'fünfundzwanzig'], correct: 0 },
      { q: '"Wo kann ich bezahlen?" means...', options: ['Where can I pay?', 'What can I buy?', 'How much is it?', 'Can I help you?'], correct: 0 },
    ],
    [
      { q: 'What does "der Bahnhof" mean?', options: ['train station', 'bus stop', 'airport', 'harbor'], correct: 0 },
      { q: 'What does "die Straße" mean?', options: ['street', 'train', 'map', 'city'], correct: 0 },
      { q: '"Wo ist ___ Bahnhof?"', options: ['der', 'die', 'das', 'den'], correct: 0 },
      { q: '"Geradeaus" means...', options: ['straight ahead', 'to the left', 'to the right', 'around'], correct: 0 },
      { q: '"Links" means...', options: ['left', 'right', 'straight', 'behind'], correct: 0 },
      { q: '"Rechts" means...', options: ['right', 'left', 'straight', 'in front'], correct: 0 },
      { q: '"Die nächste Haltestelle" means...', options: ['the next stop', 'the last stop', 'the first stop', 'the wrong stop'], correct: 0 },
      { q: '"Ich möchte nach Berlin ___" (travel)', options: ['fahren', 'gehen', 'wohnen', 'arbeiten'], correct: 0 },
      { q: 'What does "das Ticket" mean?', options: ['ticket', 'map', 'train', 'seat'], correct: 0 },
      { q: '"Entschuldigung, ___ ist der Bahnhof?"', options: ['wer', 'was', 'wo', 'wann'], correct: 2 },
    ],
    [
      { q: '"Können" means...', options: ['can/to be able to', 'must', 'may', 'want'], correct: 0 },
      { q: '"Müssen" means...', options: ['must/to have to', 'can', 'want', 'may'], correct: 0 },
      { q: '"Möchten" means...', options: ['would like', 'must', 'can', 'should'], correct: 0 },
      { q: '"Ich ___ Deutsch sprechen." (can)', options: ['kann', 'kannst', 'können', 'konnte'], correct: 0 },
      { q: '"Du ___ jetzt gehen." (must)', options: ['musst', 'muss', 'müssen', 'müsst'], correct: 0 },
      { q: 'In "Ich stehe auf", the "auf" is...', options: ['a separable verb prefix', 'a preposition', 'an article', 'an adjective'], correct: 0 },
      { q: '"Ich ___ um 8 Uhr auf." (get up)', options: ['stehe', 'stehst', 'steht', 'stehen'], correct: 0 },
      { q: '"Wir ___ ins Kino ein." (go in)', options: ['gehen', 'geht', 'gehen ... ein', 'gehen ein'], correct: 2 },
      { q: 'What does "Ich möchte schlafen" mean?', options: ['I would like to sleep', 'I must sleep', 'I can sleep', 'I sleep'], correct: 0 },
      { q: '"Sie ___ Deutsch lernen." (must, she)', options: ['muss', 'musst', 'müssen', 'müsst'], correct: 0 },
    ],
    [
      { q: 'In the A1 exam, "Lesen" tests...', options: ['reading', 'listening', 'writing', 'speaking'], correct: 0 },
      { q: '"Hören" tests...', options: ['listening', 'reading', 'writing', 'speaking'], correct: 0 },
      { q: '"Schreiben" tests...', options: ['writing', 'reading', 'listening', 'speaking'], correct: 0 },
      { q: '"Sprechen" tests...', options: ['speaking', 'reading', 'writing', 'listening'], correct: 0 },
      { q: 'For a formal email, you should start with...', options: ['Sehr geehrte Damen und Herren,', 'Hey,', 'Tschüss,', 'Lieber Freund,'], correct: 0 },
      { q: 'Which phrase is useful for asking someone to repeat?', options: ['Können Sie das bitte wiederholen?', 'Was bedeutet das?', 'Ich verstehe.', 'Danke schön!'], correct: 0 },
      { q: 'To introduce yourself formally, say...', options: ['Ich heiße...', 'Was geht?', 'Tschüss!', 'Keine Ahnung!'], correct: 0 },
      { q: '"Wie schreibt man das?" means...', options: ['How do you write that?', 'What does that mean?', 'Where is that?', 'Who is that?'], correct: 0 },
      { q: 'In the speaking exam, it helps to...', options: ['speak loudly and clearly', 'whisper', 'answer with one word only', 'ignore the examiner'], correct: 0 },
      { q: 'Before the exam, you should...', options: ['sleep well and stay calm', 'study all night', 'skip breakfast', 'arrive late'], correct: 0 },
    ],
  ];
  return banks[weekIndex];
}

const WEEK_THEMES = [
  {
    title: 'Tagesablauf — Daily Routines',
    icon: '⏰',
    theme: 'Daily routines, eating, working, leisure, expressing likes with mögen',
    grammar: makeGrammar(
      'Reflexive verbs and time expressions describe daily routines. Separable verbs like "aufstehen" split: the prefix goes to the end.',
      [
        { german: 'Ich stehe um sieben Uhr auf.', english: 'I get up at seven o\'clock.' },
        { german: 'Ich frühstücke um acht Uhr.', english: 'I have breakfast at eight o\'clock.' },
        { german: 'Ich gehe um zehn Uhr ins Bett.', english: 'I go to bed at ten o\'clock.' },
        { german: 'Ich mache mich fertig.', english: 'I get ready.' },
      ],
      'Use "um" + time for "at". Separable verbs: prefix (auf-, an-, ein-) goes to the end of the sentence.'
    ),
    vocab: [
      { german: 'aufstehen', english: 'to get up', pronunciation: 'OWF-shtay-en' },
      { german: 'frühstücken', english: 'to have breakfast', pronunciation: 'FROO-shtook-en' },
      { german: 'das Frühstück', english: 'breakfast', gender: 'das' },
      { german: 'das Mittagessen', english: 'lunch', gender: 'das' },
      { german: 'das Abendessen', english: 'dinner', gender: 'das' },
      { german: 'die Uhr', english: 'clock/watch', gender: 'die' },
      { german: 'die Zeit', english: 'time', gender: 'die' },
      { german: 'spät', english: 'late', pronunciation: 'shpayt' },
      { german: 'früh', english: 'early', pronunciation: 'froe' },
      { german: 'pünktlich', english: 'on time', pronunciation: 'PUNKH-tlish' },
    ],
    quiz: [
      { question: '"Ich stehe um 7 Uhr auf." What does "auf" belong to?', options: ['aufstehen', 'aufhören', 'aufmachen', 'aufessen'], correct: 0 },
      { question: 'How do you say "I have breakfast"?', options: ['Ich frühstücke', 'Ich esse Früh', 'Ich trinke Kaffee', 'Ich stehe auf'], correct: 0 },
      { question: '"Um 12 Uhr esse ich ___"', options: ['Frühstück', 'Mittagessen', 'Abendessen', 'Zwischenmahlzeit'], correct: 1 },
      { question: 'Which is a separable verb?', options: ['lernen', 'machen', 'aufstehen', 'spielen'], correct: 2 },
      { question: '"Ich ___ mich fertig." (get ready)', options: ['mache', 'mache ... mich', 'fertige', 'werde'], correct: 0 },
    ],
    fillblank: [
      { text: 'Ich stehe um 7 Uhr ___ . (get up)', answer: 'auf', hint: 'separable prefix' },
      { text: 'Ich ___ um 8 Uhr. (have breakfast)', answer: 'frühstücke', hint: 'I breakfast' },
      { text: 'Ich gehe um 22 Uhr ins ___ .', answer: 'Bett', hint: 'bed' },
      { text: 'Ich esse ___ Mittagessen. (the)', answer: 'das', hint: 'neuter article' },
    ],
    listening: makeListening(
      'Daily routine',
      'Ich stehe um halb sieben auf. Dann frühstücke ich. Um acht Uhr fahre ich mit dem Bus zur Arbeit.',
      [
        { question: 'When does the person get up?', options: ['6:30', '7:00', '7:30', '8:00'], correct: 0 },
        { question: 'How do they get to work?', options: ['by car', 'by bus', 'by train', 'on foot'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Describe your daily routine in 4-5 sentences. Use time expressions and separable verbs.',
      ['Start with "Ich stehe um ... Uhr auf."', 'Say when you eat breakfast, lunch, and dinner.', 'End with "Ich gehe um ... Uhr ins Bett."']
    ),
    writing: makeWriting(
      'Write 5 sentences about your typical day.',
      'Ich stehe um sieben Uhr auf. Ich frühstücke um acht Uhr. Ich arbeite von neun bis fünf. Ich esse um zwölf Uhr zu Mittag. Ich gehe um elf Uhr ins Bett.',
      ['Use "um" + time', 'Use separable verbs', 'Write in the present tense']
    ),
  },
  {
    title: 'Familie & Freunde — Family & Friends',
    icon: '👨‍👩‍👧‍👦',
    theme: 'Family members, describing relationships, possessive pronouns',
    grammar: makeGrammar(
      'Possessive articles (mein, dein, sein, ihr, unser, euer) change endings like "ein".',
      [
        { german: 'Das ist mein Bruder.', english: 'This is my brother.' },
        { german: 'Das ist meine Schwester.', english: 'This is my sister.' },
        { german: 'Das ist sein Auto.', english: 'This is his car.' },
        { german: 'Das ist ihre Mutter.', english: 'This is her mother.' },
      ],
      'Possessives agree with the noun that follows: mein Vater (masc), meine Mutter (fem), mein Kind (neut).'
    ),
    vocab: [
      { german: 'die Familie', english: 'family', gender: 'die' },
      { german: 'der Vater', english: 'father', gender: 'der' },
      { german: 'die Mutter', english: 'mother', gender: 'die' },
      { german: 'der Bruder', english: 'brother', gender: 'der' },
      { german: 'die Schwester', english: 'sister', gender: 'die' },
      { german: 'der Sohn', english: 'son', gender: 'der' },
      { german: 'die Tochter', english: 'daughter', gender: 'die' },
      { german: 'die Eltern', english: 'parents', gender: 'die' },
      { german: 'die Großeltern', english: 'grandparents', gender: 'die' },
      { german: 'der Freund', english: 'friend (male)', gender: 'der' },
      { german: 'die Freundin', english: 'friend (female)', gender: 'die' },
    ],
    quiz: [
      { question: '"Das ist ___ Vater." (my)', options: ['mein', 'meine', 'meinen', 'meiner'], correct: 0 },
      { question: '"Das ist ___ Mutter." (my)', options: ['mein', 'meine', 'meinen', 'meiner'], correct: 1 },
      { question: '"Das ist ___ Auto." (his)', options: ['sein', 'seine', 'seinen', 'seiner'], correct: 0 },
      { question: 'What does "die Schwester" mean?', options: ['sister', 'brother', 'mother', 'aunt'], correct: 0 },
      { question: '"Die Eltern" means...', options: ['the parents', 'the children', 'the siblings', 'the grandparents'], correct: 0 },
    ],
    fillblank: [
      { text: 'Das ist ___ Bruder. (my)', answer: 'mein', hint: 'masculine possessive' },
      { text: 'Das ist ___ Schwester. (my)', answer: 'meine', hint: 'feminine possessive' },
      { text: 'Das ist ___ Auto. (her)', answer: 'ihr', hint: 'neuter possessive' },
      { text: 'Das sind ___ Eltern. (our)', answer: 'unsere', hint: 'plural possessive' },
    ],
    listening: makeListening(
      'Family introduction',
      'Das ist meine Familie. Mein Vater ist Lehrer. Meine Mutter ist Ärztin. Ich habe einen Bruder und eine Schwester.',
      [
        { question: 'What does the father do?', options: ['doctor', 'teacher', 'driver', 'cook'], correct: 1 },
        { question: 'How many siblings does the speaker have?', options: ['one', 'two', 'three', 'none'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Introduce your family. Say who they are, their names, and one thing about each person.',
      ['Use "mein/meine"', 'Use family vocabulary', 'Add an adjective or job']
    ),
    writing: makeWriting(
      'Write a short text (4-5 sentences) about your family.',
      'Das ist meine Familie. Mein Vater heißt Thomas. Meine Mutter heißt Anna. Mein Bruder ist 20 Jahre alt. Meine Schwester lernt Deutsch.',
      ['Use possessive articles', 'Use family nouns with articles', 'Add ages or jobs']
    ),
  },
  {
    title: 'Einkaufen — Shopping & Dining',
    icon: '🛒',
    theme: 'Grocery, clothing, restaurant vocabulary, polite requests',
    grammar: makeGrammar(
      'Use "ich möchte" or "ich hätte gern" for polite requests. The accusative case is used for direct objects after many verbs.',
      [
        { german: 'Ich möchte ein Brot, bitte.', english: 'I would like a bread, please.' },
        { german: 'Ich hätte gern einen Kaffee.', english: 'I would like a coffee.' },
        { german: 'Was kostet das?', english: 'How much does it cost?' },
        { german: 'Zahlen, bitte!', english: 'The bill, please!' },
      ],
      '"Möchten" is the polite form of "wollen" (to want). Use it in shops and restaurants.'
    ),
    vocab: [
      { german: 'der Supermarkt', english: 'supermarket', gender: 'der' },
      { german: 'das Geschäft', english: 'shop', gender: 'das' },
      { german: 'der Laden', english: 'store', gender: 'der' },
      { german: 'das Brot', english: 'bread', gender: 'das' },
      { german: 'die Milch', english: 'milk', gender: 'die' },
      { german: 'der Käse', english: 'cheese', gender: 'der' },
      { german: 'das Wasser', english: 'water', gender: 'das' },
      { german: 'der Kaffee', english: 'coffee', gender: 'der' },
      { german: 'die Rechnung', english: 'bill', gender: 'die' },
      { german: 'bezahlen', english: 'to pay', pronunciation: 'be-TSAH-len' },
      { german: 'kosten', english: 'to cost', pronunciation: 'KOS-ten' },
    ],
    quiz: [
      { question: 'How do you politely order coffee?', options: ['Ich will Kaffee.', 'Ich möchte einen Kaffee, bitte.', 'Gib mir Kaffee!', 'Kaffee jetzt!'], correct: 1 },
      { question: '"Was kostet das?" means...', options: ['What is that?', 'How much is it?', 'Where is it?', 'What does it mean?'], correct: 1 },
      { question: '"Zahlen, bitte!" is used...', options: ['to order', 'to ask for the bill', 'to greet', 'to say goodbye'], correct: 1 },
      { question: '"Ich hätte gern ___ Brötchen."', options: ['ein', 'eine', 'einen', 'der'], correct: 0 },
      { question: 'What does "bezahlen" mean?', options: ['to buy', 'to pay', 'to sell', 'to order'], correct: 1 },
    ],
    fillblank: [
      { text: 'Ich möchte ___ Brot, bitte. (a)', answer: 'ein', hint: 'neuter article' },
      { text: 'Ich hätte gern ___ Kaffee. (a)', answer: 'einen', hint: 'masculine accusative' },
      { text: 'Was ___ das? (cost)', answer: 'kostet', hint: 'costs' },
      { text: '___ , bitte! (the bill)', answer: 'Zahlen', hint: 'pay' },
    ],
    listening: makeListening(
      'At the bakery',
      'Guten Tag! Ich möchte zwei Brötchen und ein Croissant, bitte. Das macht 3 Euro 50. Zahlen, bitte!',
      [
        { question: 'What does the customer order?', options: ['bread and cheese', 'two rolls and a croissant', 'coffee and cake', 'milk and eggs'], correct: 1 },
        { question: 'How much does it cost?', options: ['2.50', '3.50', '4.00', '5.00'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Role-play ordering at a café. Use polite phrases and ask for the bill.',
      ['Greet the server', 'Use "Ich möchte..." or "Ich hätte gern..."', 'End with "Zahlen, bitte!"']
    ),
    writing: makeWriting(
      'Write a short dialogue at a restaurant (4-6 lines).',
      'Kellner: Guten Tag! Was möchten Sie trinken?\nIch: Ich möchte einen Kaffee, bitte.\nKellner: Möchten Sie auch etwas essen?\nIch: Ja, ein Croissant, bitte.\nIch: Zahlen, bitte!\nKellner: Das macht 5 Euro.',
      ['Use polite requests', 'Include prices', 'Ask for the bill']
    ),
  },
  {
    title: 'Unterwegs — Travel & Directions',
    icon: '🗺️',
    theme: 'Transportation, directions, maps, accusative case introduction',
    grammar: makeGrammar(
      'Prepositions like "in", "auf", "an" take the accusative when indicating direction (movement to a place).',
      [
        { german: 'Ich fahre in die Stadt.', english: 'I drive into the city.' },
        { german: 'Ich gehe auf den Bahnhof.', english: 'I walk to the station.' },
        { german: 'Ich bin in der Stadt.', english: 'I am in the city.' },
        { german: 'Ich bin auf dem Bahnhof.', english: 'I am at the station.' },
      ],
      'Accusative = movement to (Wohin?). Dative = location (Wo?).'
    ),
    vocab: [
      { german: 'der Bahnhof', english: 'train station', gender: 'der' },
      { german: 'der Bus', english: 'bus', gender: 'der' },
      { german: 'die U-Bahn', english: 'subway', gender: 'die' },
      { german: 'das Taxi', english: 'taxi', gender: 'das' },
      { german: 'das Flugzeug', english: 'airplane', gender: 'das' },
      { german: 'die Straße', english: 'street', gender: 'die' },
      { german: 'geradeaus', english: 'straight ahead', pronunciation: 'ge-RAH-de-ows' },
      { german: 'links', english: 'left', pronunciation: 'links' },
      { german: 'rechts', english: 'right', pronunciation: 'rekhts' },
      { german: 'die Haltestelle', english: 'stop/station', gender: 'die' },
      { german: 'das Ticket', english: 'ticket', gender: 'das' },
    ],
    quiz: [
      { question: '"Ich fahre ___ die Stadt." (into)', options: ['in', 'auf', 'an', 'bei'], correct: 0 },
      { question: '"Ich bin ___ der Stadt." (in)', options: ['in', 'in der', 'in die', 'in den'], correct: 1 },
      { question: '"Geradeaus" means...', options: ['left', 'right', 'straight ahead', 'behind'], correct: 2 },
      { question: 'What does "der Bahnhof" mean?', options: ['bus', 'train station', 'airport', 'street'], correct: 1 },
      { question: '"Die nächste Haltestelle" is...', options: ['the next stop', 'the last stop', 'the wrong stop', 'the first stop'], correct: 0 },
    ],
    fillblank: [
      { text: 'Ich fahre ___ die Stadt. (into, feminine)', answer: 'in', hint: 'accusative' },
      { text: 'Gehen Sie ___ und dann links. (straight)', answer: 'geradeaus', hint: 'straight ahead' },
      { text: 'Der Bahnhof ist ___ . (right)', answer: 'rechts', hint: 'right' },
      { text: 'Ich möchte ein ___ , bitte. (ticket)', answer: 'Ticket', hint: 'ticket' },
    ],
    listening: makeListening(
      'Giving directions',
      'Entschuldigung, wo ist der Bahnhof? Gehen Sie geradeaus, dann die zweite Straße links. Der Bahnhof ist auf der rechten Seite.',
      [
        { question: 'Where is the person asking to go?', options: ['the bank', 'the train station', 'the supermarket', 'the hotel'], correct: 1 },
        { question: 'Which direction comes after "straight ahead"?', options: ['first right', 'second left', 'first left', 'second right'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Ask for and give directions to a place in your city. Use "Geradeaus", "links", and "rechts".',
      ['Start with "Entschuldigung, wo ist ...?"', 'Give directions with sequence words', 'Confirm understanding']
    ),
    writing: makeWriting(
      'Write 4-5 sentences giving directions from your home to a nearby place.',
      'Gehen Sie geradeaus. Dann biegen Sie links ab. Die Schule ist auf der rechten Seite. Es ist neben dem Supermarkt.',
      ['Use direction words', 'Use "dann" (then)', 'Use "auf der rechten/linken Seite"']
    ),
  },
  {
    title: 'Modal & Trennbare Verben — Modal & Separable Verbs',
    icon: '🔧',
    theme: 'Modal verbs, separable verbs, dative case, time expressions',
    grammar: makeGrammar(
      'Modal verbs (können, müssen, möchten, dürfen) send the main verb to the end of the sentence in its infinitive form.',
      [
        { german: 'Ich kann Deutsch sprechen.', english: 'I can speak German.' },
        { german: 'Du musst jetzt gehen.', english: 'You have to go now.' },
        { german: 'Wir möchten Pizza essen.', english: 'We would like to eat pizza.' },
        { german: 'Ich stehe früh auf.', english: 'I get up early.' },
      ],
      'Modal verb is conjugated in position 2; main infinitive goes to the end. Separable prefixes also go to the end.'
    ),
    vocab: [
      { german: 'können', english: 'can/to be able to', pronunciation: 'KER-nen' },
      { german: 'müssen', english: 'must/to have to', pronunciation: 'MUE-sen' },
      { german: 'möchten', english: 'would like', pronunciation: 'MERKH-ten' },
      { german: 'dürfen', english: 'may/be allowed to', pronunciation: 'DOOR-fen' },
      { german: 'sollen', english: 'should/ought to', pronunciation: 'ZOL-en' },
      { german: 'aufstehen', english: 'to get up', pronunciation: 'OWF-shtay-en' },
      { german: 'einkaufen', english: 'to shop', pronunciation: 'YN-kow-fen' },
      { german: 'fernsehen', english: 'to watch TV', pronunciation: 'FAIRN-zay-en' },
      { german: 'ankommen', english: 'to arrive', pronunciation: 'AHN-ko-men' },
      { german: 'mitkommen', english: 'to come along', pronunciation: 'MIT-ko-men' },
    ],
    quiz: [
      { question: '"Ich ___ Deutsch sprechen." (can)', options: ['kann', 'kannst', 'können', 'konnte'], correct: 0 },
      { question: '"Du ___ jetzt gehen." (must)', options: ['musst', 'muss', 'müssen', 'müsst'], correct: 0 },
      { question: 'In modal verb sentences, the main verb goes...', options: ['to position 1', 'to position 2', 'to the end', 'before the modal'], correct: 2 },
      { question: '"Ich stehe früh ___ ." (get up)', options: ['auf', 'an', 'ein', 'zu'], correct: 0 },
      { question: '"Wir ___ Pizza essen." (would like)', options: ['möchten', 'müssen', 'können', 'dürfen'], correct: 0 },
    ],
    fillblank: [
      { text: 'Ich ___ Deutsch sprechen. (can)', answer: 'kann', hint: 'I can' },
      { text: 'Du ___ jetzt gehen. (must)', answer: 'musst', hint: 'you must' },
      { text: 'Wir ___ ins Kino ___ . (go in)', answer: 'gehen ein', hint: 'separable verb' },
      { text: 'Ich ___ gern Kaffee trinken. (would like)', answer: 'möchte', hint: 'would like' },
    ],
    listening: makeListening(
      'Plans for the weekend',
      'Ich möchte am Samstag einkaufen gehen. Am Sonntag kann ich lange schlafen. Mein Bruder muss arbeiten.',
      [
        { question: 'What does the speaker want to do on Saturday?', options: ['work', 'shop', 'sleep', 'travel'], correct: 1 },
        { question: 'What does the brother have to do?', options: ['study', 'work', 'sleep', 'play'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Say what you can, must, and would like to do this week. Use at least two modal verbs.',
      ['Use "ich kann"', 'Use "ich muss"', 'Use "ich möchte"']
    ),
    writing: makeWriting(
      'Write 4-5 sentences about your plans using modal verbs.',
      'Ich möchte am Wochenende ins Kino gehen. Ich kann gut Deutsch sprechen. Ich muss am Montag arbeiten. Ich darf am Samstag ausschlafen.',
      ['Use 2-3 modal verbs', 'Put the main infinitive at the end', 'Use time expressions']
    ),
  },
  {
    title: 'Prüfung — A1 Mock Exam',
    icon: '📝',
    theme: 'Full A1 mock exam: Lesen, Hören, Schreiben, Sprechen',
    grammar: makeGrammar(
      'The A1 exam tests reading, listening, writing, and speaking. Review key phrases for each section.',
      [
        { german: 'Lesen: lesen Sie den Text und beantworten Sie die Fragen.', english: 'Read the text and answer the questions.' },
        { german: 'Hören: hören Sie den Dialog und wählen Sie die richtige Antwort.', english: 'Listen to the dialogue and choose the correct answer.' },
        { german: 'Schreiben: schreiben Sie eine kurze E-Mail.', english: 'Write a short email.' },
        { german: 'Sprechen: stellen Sie sich vor.', english: 'Introduce yourself.' },
      ],
      'Stay calm, read instructions carefully, and use simple sentences you know well.'
    ),
    vocab: [
      { german: 'die Prüfung', english: 'exam', gender: 'die' },
      { german: 'das Lesen', english: 'reading', gender: 'das' },
      { german: 'das Hören', english: 'listening', gender: 'das' },
      { german: 'das Schreiben', english: 'writing', gender: 'das' },
      { german: 'das Sprechen', english: 'speaking', gender: 'das' },
      { german: 'die Antwort', english: 'answer', gender: 'die' },
      { german: 'die Frage', english: 'question', gender: 'die' },
      { german: 'der Text', english: 'text', gender: 'der' },
      { german: 'der Dialog', english: 'dialogue', gender: 'der' },
      { german: 'die E-Mail', english: 'email', gender: 'die' },
    ],
    quiz: [
      { question: 'Which exam part tests reading?', options: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'], correct: 0 },
      { question: '"Stellen Sie sich vor" is for...', options: ['reading', 'listening', 'writing', 'speaking'], correct: 3 },
      { question: 'A formal email usually starts with...', options: ['Hey,', 'Liebe Grüße,', 'Sehr geehrte Damen und Herren,', 'Tschüss,'], correct: 2 },
      { question: '"Können Sie das bitte wiederholen?" is useful for...', options: ['reading', 'listening', 'writing', 'speaking'], correct: 1 },
      { question: 'Which phrase asks for clarification?', options: ['Was bedeutet das?', 'Danke schön!', 'Guten Tag!', 'Bitte schön!'], correct: 0 },
    ],
    fillblank: [
      { text: 'Ich schreibe eine ___ . (email)', answer: 'E-Mail', hint: 'email' },
      { text: 'In der Prüfung ___ ich mich vor. (introduce)', answer: 'stelle', hint: 'I introduce' },
      { text: 'Sehr ___ Damen und Herren, (honored)', answer: 'geehrte', hint: 'honored' },
      { text: 'Ich verstehe das nicht. Können Sie das bitte ___ ? (repeat)', answer: 'wiederholen', hint: 'repeat' },
    ],
    listening: makeListening(
      'Mock listening dialogue',
      'Guten Tag! Ich heiße Lisa Müller. Ich komme aus Österreich. Ich wohne in Wien und lerne Deutsch.',
      [
        { question: 'What is the speaker\'s name?', options: ['Lisa Müller', 'Anna Schmidt', 'Maria Weber', 'Sophie Meyer'], correct: 0 },
        { question: 'Where does she live?', options: ['Berlin', 'Wien', 'Zürich', 'Hamburg'], correct: 1 },
      ]
    ),
    speaking: makeSpeaking(
      'Introduce yourself as if in the A1 speaking exam. Say your name, where you come from, where you live, and what you do.',
      ['Use "Ich heiße..."', 'Use "Ich komme aus..."', 'Use "Ich wohne in..."', 'Speak clearly and slowly']
    ),
    writing: makeWriting(
      'Write a short email (5-6 sentences) to a new German friend.',
      'Liebe Maria,\n\nich heiße Tom und ich komme aus England. Ich wohne in Berlin. Ich lerne Deutsch. Ich möchte dich kennenlernen. Schreib mir bald!\n\nLiebe Grüße\nTom',
      ['Use a greeting and closing', 'Introduce yourself', 'Use simple present tense']
    ),
  },
];

const FUN_FACTS = [
  ['🥨 Pretzels are called "Brezeln" and are a popular German snack.', '🏰 Germany has over 25,000 castles.', '🎓 University education at public universities is free in Germany.', '🚲 Many Germans ride bicycles to work.'],
  ['🎄 The Christmas tree tradition started in Germany.', '🍫 Germany is famous for high-quality chocolate.', '🏞️ The Black Forest is a real place in Germany.', '🎵 Beethoven was German.'],
  ['🥐 "Brötchen" are small bread rolls eaten for breakfast.', '🍺 Germany has a beer purity law from 1516.', '🛣️ The Autobahn has sections with no speed limit.', '📚 The first printed book was in German.'],
  ['🚂 Germany has an excellent train network called the Bahn.', '🏔️ The Zugspitze is Germany\'s highest mountain.', '🎭 Berlin has more than 150 theaters.', '🌳 About one-third of Germany is covered by forests.'],
  ['⚽ Football is the most popular sport in Germany.', '🍰 The Black Forest cake is named after the region.', '🎡 Oktoberfest is held annually in Munich.', '📖 The Brothers Grimm collected German fairy tales.'],
  ['🎓 The Abitur is the German high school diploma.', '🗣️ German is spoken by over 100 million people.', '🏛️ The Brandenburg Gate is in Berlin.', '📮 Germany has the world\'s oldest universal health care system.'],
];

export function buildA1Weeks3to8() {
  return WEEK_THEMES.map((week, i) => {
    const weekId = i + 3;
    const baseTaskId = (d, t) => `a1w${weekId}d${d}t${t}`;

    const days = Array.from({ length: 7 }, (_, d) => {
      const day = d + 1;
      const isReviewDay = day === 7;
      const dayTitle = isReviewDay ? `Mini Challenge: Week ${weekId} Review` : `${week.title} — Day ${day}`;

      const quizQuestions = day === 1 || day === 4 || day === 6 ? week.quiz : null;
      const fillblankQuestions = day === 2 || day === 5 ? week.fillblank : null;
      const matchingPairs = day === 3 ? week.vocab.slice(0, 6).map(v => ({ german: v.german, english: v.english })) : null;
      const scrambleWords = day === 4 ? [
        { scrambled: week.vocab[0].german.split('').sort(() => Math.random() - 0.5).join(''), answer: week.vocab[0].german },
        { scrambled: week.vocab[1].german.split('').sort(() => Math.random() - 0.5).join(''), answer: week.vocab[1].german },
        { scrambled: week.vocab[2].german.split('').sort(() => Math.random() - 0.5).join(''), answer: week.vocab[2].german },
        { scrambled: week.vocab[3].german.split('').sort(() => Math.random() - 0.5).join(''), answer: week.vocab[3].german },
      ] : null;

      const warmCards = [
        { front: week.vocab[0].german, back: week.vocab[0].english },
        { front: week.vocab[1].german, back: week.vocab[1].english },
        { front: week.vocab[2].german, back: week.vocab[2].english },
        { front: week.vocab[3].german, back: week.vocab[3].english },
      ];

      const tasks = [
        { id: baseTaskId(day, 1), type: 'flashcards', title: 'Warm Up', description: 'Review key vocabulary', xp: 5, content: makeFlashcards(warmCards) },
        { id: baseTaskId(day, 2), type: 'grammar', title: `Grammar: ${week.title.split(' — ')[1] || week.title}`, description: 'Learn the grammar concept', xp: 15, content: week.grammar },
        { id: baseTaskId(day, 3), type: 'vocabulary', title: `Vocabulary: ${week.title.split(' — ')[0]}`, description: 'New words and phrases', xp: 15, content: makeVocab(week.vocab) },
      ];

      if (isReviewDay) {
        tasks.push({
          id: baseTaskId(day, 4),
          type: 'review',
          title: `Week ${weekId} Review Quiz`,
          description: 'Test everything you learned this week',
          xp: 25,
          content: makeQuiz(dayReviewQuestions(i)),
        });
      } else if (quizQuestions) {
        tasks.push({ id: baseTaskId(day, 4), type: 'quiz', title: 'Practice Quiz', description: 'Test your knowledge', xp: 10, content: makeQuiz(quizQuestions) });
      } else if (fillblankQuestions) {
        tasks.push({ id: baseTaskId(day, 4), type: 'fillblank', title: 'Fill in the Blanks', description: 'Complete the sentences', xp: 10, content: makeFillBlank(fillblankQuestions) });
      } else if (matchingPairs) {
        tasks.push({ id: baseTaskId(day, 4), type: 'matching', title: 'Match the Words', description: 'Match German and English', xp: 10, content: makeMatching(matchingPairs) });
      } else if (scrambleWords) {
        tasks.push({ id: baseTaskId(day, 4), type: 'scramble', title: 'Unscramble', description: 'Put the letters in order', xp: 10, content: makeScramble(scrambleWords) });
      }

      const listeningContent = isReviewDay
        ? makeListening('Week review listening', 'Hören Sie den Dialog und beantworten Sie die Fragen.', [
            { question: 'What is the dialogue about?', options: ['family', 'daily life', 'travel', 'shopping'], correct: i % 4 },
            { question: 'How many people are speaking?', options: ['one', 'two', 'three', 'four'], correct: 1 },
          ])
        : week.listening;

      tasks.push({ id: baseTaskId(day, 5), type: 'listening', title: 'Listening Practice', description: 'Listen and answer questions', xp: 10, content: listeningContent });

      const productionTask = isReviewDay
        ? { type: 'speaking', content: week.speaking }
        : day % 3 === 0
          ? { type: 'writing', content: week.writing }
          : day % 3 === 1
            ? { type: 'speaking', content: week.speaking }
            : { type: 'roleplay', content: makeRoleplay(`Practice a ${week.title.split(' — ')[0]} scenario`, week.speaking.tips) };

      tasks.push({
        id: baseTaskId(day, 6),
        type: productionTask.type,
        title: productionTask.type === 'writing' ? 'Writing Practice' : productionTask.type === 'roleplay' ? 'Roleplay Practice' : 'Speaking Practice',
        description: 'Practice using what you learned',
        xp: 10,
        content: productionTask.content,
      });

      tasks.push({ id: baseTaskId(day, 7), type: 'quickwin', title: 'Quick Win', description: 'End on a fun note!', xp: 5, content: makeQuickWin() });

      if (isReviewDay) {
        tasks.push({
          id: baseTaskId(day, 8),
          type: 'fun',
          title: `🎉 Week ${weekId} Complete!`,
          description: 'You earned bonus content!',
          xp: 5,
          content: { facts: FUN_FACTS[i] },
        });
      }

      return { day, title: dayTitle, tasks };
    });

    return {
      id: weekId,
      title: week.title,
      icon: week.icon,
      theme: week.theme,
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: `Lesson ${weekId} resources` },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Listening practice videos' },
      ],
      days,
    };
  });
}

export default buildA1Weeks3to8;
