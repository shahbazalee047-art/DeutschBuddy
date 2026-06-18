function makeWeek(id, title, icon, theme, resources, daysData) {
  return { id, title, icon, theme, unlocked: false, resources, days: daysData };
}

function makeDay(day, title, tasks) {
  return { day, title, tasks };
}

function makeTask(id, type, title, description, xp, content) {
  return { id, type, title, description, xp, content };
}

function makePlaceholderTasks(weekNum, dayNum, grammarTopic, vocabTopic) {
  return [
    makeTask(`a2w${weekNum}d${dayNum}t1`, 'flashcards', 'Warm Up', 'Review previous vocabulary', 5, { cards: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t2`, 'grammar', `Grammar: ${grammarTopic}`, 'Learn new grammar', 15, { rule: '', examples: [], note: '' }),
    makeTask(`a2w${weekNum}d${dayNum}t3`, 'vocabulary', `Vocabulary: ${vocabTopic}`, 'New words', 15, { items: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t4`, dayNum === 7 ? 'review' : 'quiz', dayNum === 7 ? 'Week Review' : 'Practice Quiz', 'Test knowledge', 10, { questions: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t5`, 'listening', 'Listening Practice', 'Listen and answer', 10, { clip: {}, questions: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t6`, 'speaking', 'Speaking Practice', 'Practice pronunciation', 10, { prompt: '', tips: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t7`, 'quickwin', 'Quick Win', 'End on a fun note!', 5, {}),
  ];
}

function makeExamTasks(weekNum, dayNum) {
  const examTitles = ['Lesen', 'Hören', 'Schreiben', 'Sprechen', 'Grammar', 'Full Mock', 'Complete'];
  const isSkill = dayNum <= 4;
  return [
    makeTask(`a2w${weekNum}d${dayNum}t1`, isSkill ? 'quiz' : 'review', isSkill ? `${examTitles[dayNum-1]} Practice` : 'Final Review', 'Exam-style practice', 20, { questions: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t2`, 'quiz', 'Grammar Review', 'Review all A2 grammar', 15, { questions: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t3`, 'speaking', 'Speaking Practice', 'Practice exam speaking', 10, { prompt: '', tips: [] }),
    makeTask(`a2w${weekNum}d${dayNum}t4`, 'quickwin', dayNum === 7 ? '🎉 Course Complete!' : 'Quick Win', 'Celebrate your progress!', 5, {}),
  ];
}

const grammarTopics = ['family modal verbs', 'comparatives', 'dative prepositions', 'complex sentences', 'weil clauses', 'exam grammar'];
const vocabTopics = ['family', 'food', 'work', 'travel', 'health', 'exam'];
const weekTitles = [
  'Familie & Soziales — Family & Social Life',
  'Essen & Restaurant — Food & Dining',
  'Arbeit & Beruf — Work & Professions',
  'Verkehr & Reisen — Transportation & Travel',
  'Wetter & Natur — Weather, Nature & Health',
  'Prüfung — A2 Mock Exam',
];
const weekIcons = ['👨\u200D👩\u200D👧\u200D👦', '🍽️', '💼', '✈️', '🌤️', '📝'];
const weekThemes = [
  'Family vocabulary, expanded modal verbs',
  'Dining out, comparative/superlative forms',
  'Workplace language, dative prepositions',
  'Travel vocabulary, complex sentences',
  'Weather, health, weil clauses, opinions',
  'Full A2 mock exam: Lesen, Hören, Schreiben, Sprechen',
];

function makeWeeks3to8() {
  const weeks = [];
  for (let i = 0; i < 6; i++) {
    const weekNum = i + 3;
    const isExam = i === 5;
    const days = [];
    for (let d = 0; d < 7; d++) {
      const dayNum = d + 1;
      let title;
      if (isExam) {
        title = `A2 Exam: ${['Lesen', 'Hören', 'Schreiben', 'Sprechen', 'Grammar', 'Full Mock', 'Complete'][d]}`;
      } else {
        title = d === 6 ? `Mini Challenge: Week ${weekNum} Review` : `Week ${weekNum} — Day ${dayNum}`;
      }
      const tasks = isExam ? makeExamTasks(weekNum, dayNum) : makePlaceholderTasks(weekNum, dayNum, grammarTopics[i], vocabTopics[i]);
      days.push(makeDay(dayNum, title, tasks));
    }
    weeks.push(makeWeek(weekNum, weekTitles[i], weekIcons[i], weekThemes[i], [
      { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: `Lesson ${weekNum} resources` },
      { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Real-life conversations' },
    ], days));
  }
  return weeks;
}

const a2Data = {
  level: 'A2',
  title: 'A2 — Elementary',
  subtitle: 'Deutsch Grundstufe',
  description: 'Build on A1 basics: past tenses, complex sentences, travel vocabulary, and expressing opinions.',
  color: '#ef4444',
  weeks: [
    {
      id: 1,
      title: 'Vergangenheit — Past Tenses',
      icon: '⏰',
      theme: 'Perfekt tense with haben and sein, past tense basics',
      unlocked: true,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 1: Perfekt tense' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Past tense street interviews' },
        { name: 'Jenny\'s German Lessons', url: 'https://www.youtube.com/@JennysGermanLessons', description: 'Perfekt tense explanation' },
      ],
      days: [
        makeDay(1, 'Perfekt with "haben"', [
          makeTask('a2w1d1t1', 'flashcards', 'Warm Up: A1 Review', 'Quick review of present tense', 5, { cards: [
            { front: 'Ich lerne Deutsch.', back: 'I learn German. (present)' },
            { front: 'Er wohnt in Berlin.', back: 'He lives in Berlin.' },
            { front: 'Wir haben Zeit.', back: 'We have time.' },
            { front: 'Sie ist nett.', back: 'She is nice.' },
          ]}),
          makeTask('a2w1d1t2', 'grammar', 'Perfekt Tense Formation', 'How to form Perfekt with "haben"', 15, {
            rule: 'Perfekt = Subject + haben/sein (conjugated) + Past Participle (at the end). Most verbs use "haben".',
            examples: [
              { german: 'Ich habe Deutsch gelernt.', english: 'I learned German.' },
              { german: 'Wir haben Pizza gegessen.', english: 'We ate pizza.' },
              { german: 'Er hat einen Brief geschrieben.', english: 'He wrote a letter.' },
            ],
            note: 'Regular past participle: ge- + stem + -t.'
          }),
          makeTask('a2w1d1t3', 'vocabulary', 'Common Past Participles', 'Irregular and regular past participles', 15, { items: [
            { german: 'gemacht', english: 'done (machen)', pronunciation: 'geh-MAKHT' },
            { german: 'gelernt', english: 'learned (lernen)', pronunciation: 'geh-LERNT' },
            { german: 'gegessen', english: 'eaten (essen)', pronunciation: 'geh-ES-en' },
            { german: 'geschrieben', english: 'written (schreiben)', pronunciation: 'geh-SHREE-ben' },
            { german: 'gehört', english: 'heard (hören)', pronunciation: 'geh-HERT' },
            { german: 'gespielt', english: 'played (spielen)', pronunciation: 'geh-SHPEELT' },
            { german: 'gearbeitet', english: 'worked (arbeiten)', pronunciation: 'geh-AR-bye-tet' },
            { german: 'gekauft', english: 'bought (kaufen)', pronunciation: 'geh-KOWFT' },
            { german: 'getrunken', english: 'drunk (trinken)', pronunciation: 'geh-TRUN-ken' },
            { german: 'geschlafen', english: 'slept (schlafen)', pronunciation: 'geh-SHLA-fen' },
          ]}),
          makeTask('a2w1d1t4', 'fillblank', 'Past Tense Practice', 'Complete with past participle', 10, { sentences: [
            { text: 'Ich habe ein Buch ___. (lesen)', answer: 'gelesen', hint: 'gelesen' },
            { text: 'Wir haben Pizza ___. (essen)', answer: 'gegessen', hint: 'gegessen' },
            { text: 'Sie hat Musik ___. (hören)', answer: 'gehört', hint: 'gehört' },
          ]}),
          makeTask('a2w1d1t5', 'listening', 'Weekend Recap', 'Listen to weekend activities', 10, {
            clip: { title: 'Weekend activities', source: 'Easy German style', text: '"Am Samstag habe ich Tennis gespielt. Am Sonntag habe ich Pizza gegessen."' },
            questions: [
              { question: 'What did they do on Saturday?', options: ['played tennis', 'ate pizza', 'went shopping', 'watched TV'], correct: 0 },
              { question: 'What did they eat on Sunday?', options: ['pasta', 'pizza', 'salad', 'soup'], correct: 1 },
            ]
          }),
          makeTask('a2w1d1t6', 'writing', 'Write About Your Weekend', 'Write 5 sentences about your last weekend', 10, {
            prompt: 'Write about what you did last weekend using Perfekt tense.',
            example: 'Am Samstag habe ich Tennis gespielt. Am Sonntag habe ich Pizza gegessen.',
            tips: ['Start with "Am Samstag/Am Sonntag"', 'Put past participle at the end', 'Use "haben" + past participle']
          }),
          makeTask('a2w1d1t7', 'quickwin', 'Quick Win: German Past', 'A fun fact about past tense', 5, {}),
        ]),
        makeDay(2, 'Perfekt with "sein"', [
          makeTask('a2w1d2t1', 'flashcards', 'Warm Up: Perfekt Review', 'Review past participles', 5, { cards: [
            { front: 'gemacht', back: 'done (machen)' },
            { front: 'gegessen', back: 'eaten (essen)' },
            { front: 'geschrieben', back: 'written (schreiben)' },
            { front: 'gehört', back: 'heard (hören)' },
          ]}),
          makeTask('a2w1d2t2', 'grammar', 'When to Use "sein"', 'Movement and state change verbs', 15, {
            rule: 'Use "sein" with: movement verbs (gehen, fahren, kommen), state changes, and sein/werden.',
            examples: [
              { german: 'Ich bin gegangen.', english: 'I went.' },
              { german: 'Wir sind nach Berlin gefahren.', english: 'We drove to Berlin.' },
              { german: 'Sie ist angekommen.', english: 'She arrived.' },
            ],
            note: 'If the verb implies movement from A to B, use "sein".'
          }),
          makeTask('a2w1d2t3', 'vocabulary', 'Movement Verbs', 'Verbs that use "sein"', 15, { items: [
            { german: 'gegangen', english: 'gone (gehen)', pronunciation: 'geh-GEN-gen' },
            { german: 'gefahren', english: 'driven (fahren)', pronunciation: 'geh-FA-ren' },
            { german: 'gekommen', english: 'come (kommen)', pronunciation: 'geh-KO-men' },
            { german: 'geflogen', english: 'flown (fliegen)', pronunciation: 'geh-FLO-gen' },
            { german: 'gelaufen', english: 'walked (laufen)', pronunciation: 'geh-LOW-fen' },
            { german: 'geworden', english: 'become (werden)', pronunciation: 'geh-VOR-den' },
          ]}),
          makeTask('a2w1d2t4', 'quiz', 'Haben or Sein?', 'Choose the correct auxiliary', 10, { questions: [
            { question: 'Ich ___ nach Hause ___ (gehen).', options: ['habe...gegangen', 'bin...gegangen', 'bin...gehend', 'habe...gehend'], correct: 1 },
            { question: 'Wir ___ ins Kino ___ (fahren).', options: ['haben...gefahren', 'sind...gefahren', 'sind...fahrend', 'haben...fahrend'], correct: 1 },
            { question: 'Er ___ gestern ___ (ankommen).', options: ['hat...ankommen', 'ist...angekommen', 'hat...angekommen', 'ist...ankommen'], correct: 1 },
          ]}),
          makeTask('a2w1d2t5', 'listening', 'Travel Story', 'Listen to a travel experience', 10, {
            clip: { title: 'Trip to Munich', source: 'Nicos Weg style', text: '"Ich bin letzte Woche nach München gefahren. Ich bin mit dem Zug gefahren."' },
            questions: [
              { question: 'How did they travel?', options: ['by car', 'by train', 'by plane', 'by bus'], correct: 1 },
            ]
          }),
          makeTask('a2w1d2t6', 'speaking', 'Tell a Travel Story', 'Practice telling about a past trip', 10, {
            prompt: 'Tell a short story about a trip using "sein" verbs.',
            tips: ['Use "sein" with movement verbs', 'Put past participle at the end']
          }),
          makeTask('a2w1d2t7', 'quickwin', 'Quick Win: Travel Word', 'Learn a travel word', 5, {}),
        ]),
        makeDay(3, 'Past Tense Practice', [
          makeTask('a2w1d3t1', 'flashcards', 'Warm Up: Sein Verbs', 'Review movement verbs', 5, { cards: [
            { front: 'gegangen', back: 'gone (gehen) - sein' },
            { front: 'gefahren', back: 'driven (fahren) - sein' },
            { front: 'gekommen', back: 'come (kommen) - sein' },
          ]}),
          makeTask('a2w1d3t2', 'grammar', 'Negation in Past Tense', 'How to make past tense negative', 15, {
            rule: 'Add "nicht" before the past participle.',
            examples: [
              { german: 'Ich habe nicht Tennis gespielt.', english: 'I didn\'t play tennis.' },
              { german: 'Wir sind nicht nach Berlin gefahren.', english: 'We didn\'t go to Berlin.' },
            ],
            note: '"nicht" goes before the past participle.'
          }),
          makeTask('a2w1d3t3', 'vocabulary', 'Time Expressions for Past', 'Words for when things happened', 15, { items: [
            { german: 'gestern', english: 'yesterday', pronunciation: 'ge-SHTERN' },
            { german: 'letzte Woche', english: 'last week', pronunciation: 'LETS-te VO-khe' },
            { german: 'letztes Jahr', english: 'last year', pronunciation: 'LETS-tes yahr' },
            { german: 'vorgestern', english: 'day before yesterday', pronunciation: 'FOR-ge-shtern' },
            { german: 'am Montag', english: 'on Monday', pronunciation: 'ahm MOHN-tahk' },
            { german: 'danach', english: 'after that', pronunciation: 'DAH-nakh' },
          ]}),
          makeTask('a2w1d3t4', 'fillblank', 'Past Tense Drill', 'Complete the sentences', 10, { sentences: [
            { text: 'Ich ___ gestern Tennis ___. (spielen)', answer: 'habe...gespielt', hint: 'haben + past participle' },
            { text: 'Sie ___ nach München ___. (fahren)', answer: 'ist...gefahren', hint: 'sein + past participle' },
          ]}),
          makeTask('a2w1d3t5', 'listening', 'Yesterday\'s Activities', 'Listen to daily activities', 10, {
            clip: { title: 'Yesterday', source: 'Real-life', text: '"Gestern habe ich früh aufgestanden. Ich habe gefrühstückt und dann gearbeitet."' },
            questions: [
              { question: 'What did they do first?', options: ['ate breakfast', 'got up early', 'went to work', 'exercised'], correct: 1 },
            ]
          }),
          makeTask('a2w1d3t6', 'writing', 'Yesterday\'s Diary', 'Write about yesterday', 10, {
            prompt: 'Write 5 sentences about what you did yesterday.',
            example: 'Gestern bin ich früh aufgestanden. Ich habe um 7 Uhr gefrühstückt.',
            tips: ['Start with "Gestern..."', 'Use "dann" to connect events']
          }),
          makeTask('a2w1d3t7', 'quickwin', 'Quick Win: Past Fun', 'Did you know?', 5, {}),
        ]),
        makeDay(4, 'Präteritum Basics', [
          makeTask('a2w1d4t1', 'flashcards', 'Warm Up: Past Tense', 'Quick Perfekt review', 5, { cards: [
            { front: 'habe...gemacht', back: 'did (machen)' },
            { front: 'bin...gegangen', back: 'went (gehen)' },
            { front: 'hat...geschrieben', back: 'wrote (schreiben)' },
          ]}),
          makeTask('a2w1d4t2', 'grammar', 'Präteritum of Key Verbs', 'Past tense for auxiliary/modal verbs', 15, {
            rule: 'Präteritum is used mainly in writing and with auxiliary/modal verbs.',
            examples: [
              { german: 'ich war (sein)', english: 'I was' },
              { german: 'ich hatte (haben)', english: 'I had' },
              { german: 'ich konnte (können)', english: 'I could' },
              { german: 'ich musste (müssen)', english: 'I had to' },
              { german: 'ich wollte (wollen)', english: 'I wanted' },
            ],
            note: 'In spoken German, use Perfekt instead of Präteritum for regular verbs.'
          }),
          makeTask('a2w1d4t3', 'vocabulary', 'Modal Verbs in Präteritum', 'Past forms of modal verbs', 15, { items: [
            { german: 'konnte', english: 'could (können)', pronunciation: 'KOHN-te' },
            { german: 'musste', english: 'had to (müssen)', pronunciation: 'MOOS-te' },
            { german: 'wollte', english: 'wanted (wollen)', pronunciation: 'VOL-te' },
            { german: 'sollte', english: 'should (sollen)', pronunciation: 'ZOL-te' },
            { german: 'durfte', english: 'allowed (dürfen)', pronunciation: 'DOORF-te' },
          ]}),
          makeTask('a2w1d4t4', 'quiz', 'Perfekt vs Präteritum', 'When to use each', 10, { questions: [
            { question: 'In spoken German, which is more common?', options: ['Präteritum', 'Perfekt', 'Plusquamperfekt', 'Futur I'], correct: 1 },
            { question: '"Ich war müde" uses...', options: ['Perfekt', 'Präteritum', 'Präsens', 'Futur'], correct: 1 },
          ]}),
          makeTask('a2w1d4t5', 'speaking', 'Tell a Story', 'Practice using Präteritum', 10, {
            prompt: 'Tell a short story using "war", "hatte", "konnte", "wollte".',
            tips: ['Use "war" for "was"', 'Use "konnte" for "could"']
          }),
          makeTask('a2w1d4t6', 'writing', 'Write a Short Story', 'Write 5 sentences using Präteritum', 10, {
            prompt: 'Write a short story using Präteritum verbs.',
            example: 'Es war Montag. Ich hatte keine Zeit. Ich musste früh aufstehen.',
            tips: ['Start with "Es war..."', 'Use Präteritum for modal verbs']
          }),
          makeTask('a2w1d4t7', 'quickwin', 'Quick Win: Grammar Tip', 'When to use which past tense', 5, {}),
        ]),
        makeDay(5, 'Past Tense in Context', [
          makeTask('a2w1d5t1', 'flashcards', 'Warm Up: Präteritum', 'Review past tense forms', 5, { cards: [
            { front: 'war', back: 'was (sein)' },
            { front: 'hatte', back: 'had (haben)' },
            { front: 'konnte', back: 'could (können)' },
            { front: 'wollte', back: 'wanted (wollen)' },
          ]}),
          makeTask('a2w1d5t2', 'grammar', 'Time Connectors', 'Words to sequence past events', 15, {
            rule: 'Use time connectors: dann, danach, vorher, zuerst, schließlich.',
            examples: [
              { german: 'Zuerst habe ich gefrühstückt.', english: 'First I had breakfast.' },
              { german: 'Dann bin ich zur Arbeit gegangen.', english: 'Then I went to work.' },
              { german: 'Danach habe ich Sport getrieben.', english: 'After that I did sports.' },
            ],
            note: 'Time connectors make your stories flow better.'
          }),
          makeTask('a2w1d5t3', 'vocabulary', 'Activity Vocabulary', 'Things you might do on a weekend', 15, { items: [
            { german: 'einkaufen gehen', english: 'go shopping' },
            { german: 'Spazierengehen', english: 'go for a walk' },
            { german: 'kochen', english: 'cook' },
            { german: 'fernsehen', english: 'watch TV' },
            { german: 'Sport treiben', english: 'do sports' },
            { german: 'Freunde treffen', english: 'meet friends' },
          ]}),
          makeTask('a2w1d5t4', 'fillblank', 'Story Building', 'Complete the weekend story', 10, { sentences: [
            { text: 'Am Samstag ___ ich früh ___. (aufstehen)', answer: 'bin...aufgestanden', hint: 'sein + past participle' },
            { text: 'Zuerst ___ ich Frühstück ___. (machen)', answer: 'habe...gemacht', hint: 'haben + past participle' },
          ]}),
          makeTask('a2w1d5t5', 'listening', 'Weekend Stories', 'Listen to weekend activities', 10, {
            clip: { title: 'Weekend chat', source: 'Easy German', text: '"Was hast du am Wochenende gemacht?" "Ich habe Sport getrieben."' },
            questions: [
              { question: 'What did they do?', options: ['went shopping', 'did sports', 'visited friends', 'cooked'], correct: 1 },
            ]
          }),
          makeTask('a2w1d5t6', 'roleplay', 'Weekend Talk', 'Practice talking about your weekend', 10, {
            scenario: 'A colleague asks about your weekend.',
            steps: ['Greet: "Hallo!"', 'Describe Saturday: "Am Samstag habe ich ___ gemacht."', 'Describe Sunday: "Am Sonntag bin ich ___ gefahren."']
          }),
          makeTask('a2w1d5t7', 'quickwin', 'Quick Win: Weekend Word', 'Learn a weekend word', 5, {}),
        ]),
        makeDay(6, 'Past Tense Mastery', [
          makeTask('a2w1d6t1', 'flashcards', 'Warm Up: Connectors', 'Review time connectors', 5, { cards: [
            { front: 'zuerst', back: 'first' },
            { front: 'dann', back: 'then' },
            { front: 'danach', back: 'after that' },
            { front: 'schließlich', back: 'finally' },
          ]}),
          makeTask('a2w1d6t2', 'grammar', 'Questions in Past Tense', 'How to ask about the past', 15, {
            rule: 'Form past tense questions: "Was hast du gemacht?" or "Bist du gegangen?"',
            examples: [
              { german: 'Was hast du gemacht?', english: 'What did you do?' },
              { german: 'Bist du ins Kino gegangen?', english: 'Did you go to the cinema?' },
              { german: 'Hast du gut geschlafen?', english: 'Did you sleep well?' },
            ],
            note: 'Question word + haben/sein + subject + past participle.'
          }),
          makeTask('a2w1d6t3', 'vocabulary', 'Question Words for Past', 'Questions about past events', 15, { items: [
            { german: 'Was hast du gemacht?', english: 'What did you do?' },
            { german: 'Wo bist du gewesen?', english: 'Where have you been?' },
            { german: 'Wann bist du angekommen?', english: 'When did you arrive?' },
            { german: 'Wer hat dir geholfen?', english: 'Who helped you?' },
            { german: 'Warum bist du gegangen?', english: 'Why did you leave?' },
          ]}),
          makeTask('a2w1d6t4', 'quiz', 'Past Tense Quiz', 'Comprehensive test', 10, { questions: [
            { question: 'Was ___ du gemacht?', options: ['habe', 'hast', 'hat', 'haben'], correct: 1 },
            { question: 'Wo ___ du gewesen?', options: ['bin', 'bist', 'ist', 'sind'], correct: 1 },
            { question: 'Ich ___ gestern Tennis gespielt.', options: ['habe', 'hast', 'hat', 'bin'], correct: 0 },
          ]}),
          makeTask('a2w1d6t5', 'speaking', 'Interview About Past', 'Practice asking past tense questions', 10, {
            prompt: 'Ask yourself: "Was habe ich gestern gemacht? Wo bin ich gewesen?"',
            tips: ['Use "hast du" for haben verbs', 'Use "bist du" for sein verbs']
          }),
          makeTask('a2w1d6t6', 'writing', 'Email About Your Trip', 'Write a short email about a past trip', 10, {
            prompt: 'Write 5-6 sentences about a trip you took.',
            example: 'Hallo Maria! Letzte Woche bin ich nach Berlin gefahren.',
            tips: ['Start with "Hallo [Name]!"', 'Use past tense verbs', 'End with "Viele Grüße!"']
          }),
          makeTask('a2w1d6t7', 'quickwin', 'Quick Win: Email Tip', 'German email etiquette', 5, {}),
        ]),
        makeDay(7, 'Mini Challenge: Week 1 Review', [
          makeTask('a2w1d7t1', 'review', 'Week 1 Review Quiz', 'Test all past tense knowledge', 25, { questions: [
            { question: 'Perfekt = Subject + haben/sein + ?', options: ['present participle', 'past participle', 'infinitive', 'adjective'], correct: 1 },
            { question: 'Which verb uses "sein"?', options: ['spielen', 'arbeiten', 'fahren', 'lernen'], correct: 2 },
            { question: '"Ich ___ nicht kommen ___ (können)."', options: ['habe gekonnt', 'konnte', 'bin gekonnt', 'werde können'], correct: 1 },
            { question: 'Was ___ du am Wochenende ___ (machen)?', options: ['hast...gemacht', 'hat...gemacht', 'bist...gemacht', 'haben...gemacht'], correct: 0 },
            { question: 'She ___ ins Kino ___ (fahren).', options: ['hat...gefahren', 'ist...gefahren', 'bin...gefahren', 'sind...gefahren'], correct: 1 },
          ]}),
          makeTask('a2w1d7t2', 'fun', '🎉 Week 1 Complete!', 'Bonus content!', 5, {
            facts: [
              '⏰ Perfekt is the most common past tense in spoken German!',
              '🚂 "Ich bin mit dem Zug gefahren" is a very common sentence.',
              '📚 German has two past tenses because of its mixed Latin and Germanic roots.',
              '🎓 Mastering Perfekt is the biggest step from A1 to A2.',
            ]
          }),
        ]),
      ]
    },
    {
      id: 2,
      title: 'Präteritum & Weekend Talk',
      icon: '📅',
      theme: 'Präteritum basics, talking about the past, weekend recap',
      unlocked: false,
      resources: [
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Weekend stories in German' },
        { name: 'Slow German', url: 'https://slowgerman.com', description: 'Podcast for past tense listening' },
        { name: 'Goethe-Institut', url: 'https://www.goethesprachportal.de/en', description: 'Präteritum exercises' },
      ],
      days: [
        makeDay(1, 'Präteritum of Common Verbs', [
          makeTask('a2w2d1t1', 'flashcards', 'Warm Up: Perfekt Review', 'Quick past tense review', 5, { cards: [
            { front: 'habe...gemacht', back: 'did (machen)' },
            { front: 'bin...gegangen', back: 'went (gehen)' },
            { front: 'hatte', back: 'had (haben, Prät.)' },
            { front: 'war', back: 'was (sein, Prät.)' },
          ]}),
          makeTask('a2w2d1t2', 'grammar', 'Präteritum of Regular Verbs', 'How regular verbs form Präteritum', 15, {
            rule: 'Regular Präteritum: remove -en, add -te for all persons.',
            examples: [
              { german: 'ich machte, du machtest', english: 'I made, you made' },
              { german: 'er/sie machte, wir machten', english: 'he/she made, we made' },
            ],
            note: 'Regular Präteritum is mainly used in writing.'
          }),
          makeTask('a2w2d1t3', 'vocabulary', 'Common Präteritum Forms', 'Past forms of frequently used verbs', 15, { items: [
            { german: 'machte', english: 'made (machen)', pronunciation: 'MAKH-te' },
            { german: 'lernte', english: 'learned (lernen)', pronunciation: 'LERN-te' },
            { german: 'spielte', english: 'played (spielen)', pronunciation: 'SHPEEL-te' },
            { german: 'arbeitete', english: 'worked (arbeiten)', pronunciation: 'AR-bye-te-te' },
            { german: 'wohnte', english: 'lived (wohnen)', pronunciation: 'VON-te' },
            { german: 'sagte', english: 'said (sagen)', pronunciation: 'ZAHG-te' },
          ]}),
          makeTask('a2w2d1t4', 'quiz', 'Präteritum Quiz', 'Form Präteritum correctly', 10, { questions: [
            { question: '"lernen" in Präteritum is...', options: ['lernte', 'lernte', 'gelernt', 'lernen'], correct: 0 },
            { question: '"spielen" in Präteritum is...', options: ['spielte', 'spielte', 'gespielt', 'spielen'], correct: 0 },
            { question: '"sagen" in Präteritum (du) is...', options: ['sagte', 'sagtest', 'gesagt', 'sagen'], correct: 1 },
          ]}),
          makeTask('a2w2d1t5', 'fillblank', 'Präteritum Drill', 'Fill in the correct form', 10, { sentences: [
            { text: 'Ich ___ gestern Deutsch. (lernen)', answer: 'lernte', hint: 'Präteritum' },
            { text: 'Er ___ Fußball. (spielen)', answer: 'spielte', hint: 'Präteritum' },
            { text: 'Wir ___ in Berlin. (wohnen)', answer: 'wohnten', hint: 'Präteritum' },
          ]}),
          makeTask('a2w2d1t6', 'speaking', 'Story Time', 'Tell a story using Präteritum', 10, {
            prompt: 'Tell a short story about last summer using Präteritum.',
            tips: ['Use Präteritum for regular verbs', 'Keep sentences simple']
          }),
          makeTask('a2w2d1t7', 'quickwin', 'Quick Win: Grammar Tip', 'Präteritum in context', 5, {}),
        ]),
        makeDay(2, 'Talking About the Past', [
          makeTask('a2w2d2t1', 'flashcards', 'Warm Up: Präteritum', 'Review past forms', 5, { cards: [
            { front: 'machte', back: 'made (machen)' },
            { front: 'lernte', back: 'learned (lernen)' },
            { front: 'spielte', back: 'played (spielen)' },
            { front: 'sagte', back: 'said (sagen)' },
          ]}),
          makeTask('a2w2d2t2', 'grammar', 'Irregular Präteritum', 'Stem-changing verbs', 15, {
            rule: 'Irregular verbs change their stem vowel: ei->ie, e->a, i->u.',
            examples: [
              { german: 'fahren -> fuhr', english: 'drove' },
              { german: 'schreiben -> schrieb', english: 'wrote' },
              { german: 'trinken -> trank', english: 'drank' },
              { german: 'finden -> fand', english: 'found' },
            ],
            note: 'Similar to English: drive/drove, write/wrote.'
          }),
          makeTask('a2w2d2t3', 'vocabulary', 'Irregular Past Forms', 'Memorize these common forms', 15, { items: [
            { german: 'fuhr', english: 'drove (fahren)', pronunciation: 'foor' },
            { german: 'schrieb', english: 'wrote (schreiben)', pronunciation: 'shreeb' },
            { german: 'trank', english: 'drank (trinken)', pronunciation: 'trahnk' },
            { german: 'fand', english: 'found (finden)', pronunciation: 'fahnd' },
            { german: 'sprach', english: 'spoke (sprechen)', pronunciation: 'shprakh' },
            { german: 'las', english: 'read (lesen)', pronunciation: 'lahs' },
          ]}),
          makeTask('a2w2d2t4', 'quiz', 'Irregular Verbs Quiz', 'Match verbs to Präteritum', 10, { questions: [
            { question: '"fahren" in Präteritum is...', options: ['fahrt', 'fuhr', 'gefahren', 'fährt'], correct: 1 },
            { question: '"schreiben" in Präteritum is...', options: ['schreibt', 'schrieb', 'geschrieben', 'schreibe'], correct: 1 },
          ]}),
          makeTask('a2w2d2t5', 'fillblank', 'Irregular Verb Drill', 'Fill in irregular Präteritum', 10, { sentences: [
            { text: 'Er ___ mit dem Zug nach Berlin. (fahren)', answer: 'fuhr', hint: 'irregular' },
            { text: 'Sie ___ einen Brief. (schreiben)', answer: 'schrieb', hint: 'irregular' },
          ]}),
          makeTask('a2w2d2t6', 'writing', 'Past Experience Story', 'Write about a past experience', 10, {
            prompt: 'Write about a memorable experience using irregular Präteritum.',
            example: 'Letzten Sommer fuhr ich nach München. Ich sprach mit vielen Leuten.',
            tips: ['Use irregular Präteritum verbs', 'Add details with adjectives']
          }),
          makeTask('a2w2d2t7', 'quickwin', 'Quick Win: Memory Trick', 'Tips for irregular forms', 5, {}),
        ]),
        makeDay(3, 'Weekend Recap Practice', [
          makeTask('a2w2d3t1', 'flashcards', 'Warm Up: Irregular Verbs', 'Review irregular past forms', 5, { cards: [
            { front: 'fuhr', back: 'drove (fahren)' },
            { front: 'schrieb', back: 'wrote (schreiben)' },
            { front: 'trank', back: 'drank (trinken)' },
            { front: 'fand', back: 'found (finden)' },
          ]}),
          makeTask('a2w2d3t2', 'grammar', 'Weekend Vocabulary', 'Words for weekend activities', 15, {
            rule: 'Common weekend phrases in Perfekt tense.',
            examples: [
              { german: 'Am Samstag habe ich Sport getrieben.', english: 'On Saturday I did sports.' },
              { german: 'Am Sonntag habe ich Kaffee getrunken.', english: 'On Sunday I drank coffee.' },
              { german: 'Wir haben einen Spaziergang gemacht.', english: 'We went for a walk.' },
            ],
            note: '"Sport treiben" uses "haben" even though it sounds like movement.'
          }),
          makeTask('a2w2d3t3', 'vocabulary', 'Weekend Activities', 'Vocabulary for weekend talk', 15, { items: [
            { german: 'das Wochenende', english: 'the weekend', pronunciation: 'VO-khen-en-de' },
            { german: 'der Spaziergang', english: 'the walk', pronunciation: 'shpah-TSEER-gahng' },
            { german: 'das Museum', english: 'the museum', pronunciation: 'moo-ZAY-oom' },
            { german: 'der Markt', english: 'the market', pronunciation: 'mahrkt' },
            { german: 'das Kino', english: 'the cinema', pronunciation: 'KEE-no' },
          ]}),
          makeTask('a2w2d3t4', 'matching', 'Weekend Match', 'Match activities to German', 10, { pairs: [
            { german: 'Sport treiben', english: 'do sports' },
            { german: 'Spaziergang machen', english: 'go for a walk' },
            { german: 'ins Kino gehen', english: 'go to cinema' },
            { german: 'Kaffee trinken', english: 'drink coffee' },
            { german: 'ein Buch lesen', english: 'read a book' },
          ]}),
          makeTask('a2w2d3t5', 'listening', 'Weekend Chat', 'Listen to weekend conversation', 10, {
            clip: { title: 'Weekend chat', source: 'Easy German', text: '"Was hast du am Wochenende gemacht?" "Ich habe Sport getrieben."' },
            questions: [
              { question: 'What did they do?', options: ['cleaned', 'did sports', 'went to cinema', 'met friends'], correct: 1 },
            ]
          }),
          makeTask('a2w2d3t6', 'roleplay', 'Weekend Chat', 'Practice talking about your weekend', 10, {
            scenario: 'A friend asks about your weekend.',
            steps: ['Answer: "Am Samstag habe ich ___ gemacht."', 'Add details: "Ich bin mit ___ gegangen."', 'End: "Es war ein schönes Wochenende!"']
          }),
          makeTask('a2w2d3t7', 'quickwin', 'Quick Win: Weekend Phrase', 'A useful weekend phrase', 5, {}),
        ]),
        makeDay(4, 'Past Tense Review', [
          makeTask('a2w2d4t1', 'flashcards', 'Warm Up: All Past Forms', 'Review all past tense forms', 5, { cards: [
            { front: 'gemacht', back: 'done (machen)' },
            { front: 'gegangen', back: 'gone (gehen) - sein' },
            { front: 'fuhr', back: 'drove (fahren) - Prät.' },
            { front: 'machte', back: 'made (machen) - Prät.' },
          ]}),
          makeTask('a2w2d4t2', 'grammar', 'When to Use Each Past', 'Perfekt vs Präteritum usage', 15, {
            rule: 'Use Perfekt in spoken German. Use Präteritum for haben, sein, and modal verbs.',
            examples: [
              { german: 'Ich habe Tennis gespielt. (Perfekt, spoken)', english: 'I played tennis.' },
              { german: 'Ich war müde. (Präteritum, modal)', english: 'I was tired.' },
              { german: 'Ich hatte keine Zeit. (Präteritum, modal)', english: 'I had no time.' },
            ],
            note: 'In conversation, always prefer Perfekt over Präteritum for regular verbs.'
          }),
          makeTask('a2w2d4t3', 'vocabulary', 'Mixed Practice Words', 'Review vocabulary from this week', 15, { items: [
            { german: 'getrunken', english: 'drunk (trinken)', pronunciation: 'geh-TRUN-ken' },
            { german: 'getroffen', english: 'met (treffen)', pronunciation: 'geh-TROF-en' },
            { german: 'gewusst', english: 'known (wissen)', pronunciation: 'geh-VUST' },
            { german: 'geglaubt', english: 'believed (glauben)', pronunciation: 'geh-GLOWBT' },
          ]}),
          makeTask('a2w2d4t4', 'fillblank', 'Mixed Drill', 'Choose Perfekt or Präteritum', 10, { sentences: [
            { text: 'Ich ___ gestern ___. (gehen, Perfekt)', answer: 'bin...gegangen', hint: 'sein' },
            { text: 'Er ___ müde. (sein, Präteritum)', answer: 'war', hint: 'war' },
            { text: 'Wir ___ Pizza ___. (essen)', answer: 'haben...gegessen', hint: 'haben' },
          ]}),
          makeTask('a2w2d4t5', 'listening', 'Mixed Past Tenses', 'Listen for both Perfekt and Präteritum', 10, {
            clip: { title: 'Past tense mix', source: 'Real-life', text: '"Ich war gestern müde. Ich habe früh geschlafen."' },
            questions: [
              { question: '"war" is which tense?', options: ['Perfekt', 'Präteritum', 'Präsens', 'Futur'], correct: 1 },
              { question: 'What did they do?', options: ['went out', 'slept early', 'worked late', 'ate dinner'], correct: 1 },
            ]
          }),
          makeTask('a2w2d4t6', 'speaking', 'Past Tense Story', 'Tell a story using both tenses', 10, {
            prompt: 'Tell a story mixing Perfekt and Präteritum.',
            tips: ['Use "war" and "hatte" in Präteritum', 'Use "habe...gemacht" in Perfekt']
          }),
          makeTask('a2w2d4t7', 'quickwin', 'Quick Win: Achievement', 'You\'re getting good at this!', 5, {}),
        ]),
        makeDay(5, 'Grammar Deep Dive', [
          makeTask('a2w2d5t1', 'flashcards', 'Warm Up: Grammar Terms', 'Review grammar vocabulary', 5, { cards: [
            { front: 'Perfekt', back: 'compound past tense (have + past participle)' },
            { front: 'Präteritum', back: 'simple past tense' },
            { front: 'Partizip II', back: 'past participle' },
            { front: 'Hilfsverb', back: 'auxiliary verb (haben/sein)' },
          ]}),
          makeTask('a2w2d5t2', 'grammar', 'Irregular Verbs Patterns', 'Common patterns in irregular verbs', 15, {
            rule: 'Many irregular verbs follow patterns: ei->ie, e->a, i->u, e->o.',
            examples: [
              { german: 'ei -> ie: schreiben -> schrieb', english: 'write -> wrote' },
              { german: 'e -> a: sprechen -> sprach', english: 'speak -> spoke' },
              { german: 'i -> u: trinken -> trank', english: 'drink -> drank' },
              { german: 'e -> o: helfen -> half', english: 'help -> helped' },
            ],
            note: 'Learning patterns helps you predict irregular forms.'
          }),
          makeTask('a2w2d5t3', 'vocabulary', 'Verbs with Patterns', 'Practice pattern-based verbs', 15, { items: [
            { german: 'half', english: 'helped (helfen)', pronunciation: 'hahlf' },
            { german: 'lief', english: 'walked (laufen)', pronunciation: 'leef' },
            { german: 'nahm', english: 'took (nehmen)', pronunciation: 'nahm' },
            { german: 'bot', english: 'offered (bieten)', pronunciation: 'boht' },
            { german: 'sah', english: 'saw (sehen)', pronunciation: 'zah' },
            { german: 'schlief', english: 'slept (schlafen)', pronunciation: 'shleef' },
          ]}),
          makeTask('a2w2d5t4', 'quiz', 'Pattern Recognition', 'Identify the pattern', 10, { questions: [
            { question: '"helfen -> half" follows which pattern?', options: ['ei->ie', 'e->a', 'i->u', 'e->o'], correct: 3 },
            { question: '"trinken -> trank" follows which pattern?', options: ['ei->ie', 'e->a', 'i->u', 'e->o'], correct: 2 },
            { question: '"schreiben -> schrieb" follows which pattern?', options: ['ei->ie', 'e->a', 'i->u', 'e->o'], correct: 0 },
          ]}),
          makeTask('a2w2d5t5', 'writing', 'Creative Writing', 'Write a story using irregular verbs', 10, {
            prompt: 'Write a short story using at least 5 irregular Präteritum verbs.',
            example: 'Ich fuhr nach Berlin. Ich sprach mit einem Mann. Er gab mir ein Buch.',
            tips: ['Use pattern-based verbs', 'Keep the story simple and clear']
          }),
          makeTask('a2w2d5t6', 'speaking', 'Verb Drill', 'Say the Präteritum form', 10, {
            prompt: 'Say the Präteritum: fahren, schreiben, trinken, finden, sprechen, lesen.',
            tips: ['Remember: fuhr, schrieb, trank, fand, sprach, las']
          }),
          makeTask('a2w2d5t7', 'quickwin', 'Quick Win: Pattern Tip', 'A memory trick for patterns', 5, {}),
        ]),
        makeDay(6, 'Real Life Practice', [
          makeTask('a2w2d6t1', 'flashcards', 'Warm Up: All Forms', 'Quick comprehensive review', 5, { cards: [
            { front: 'habe...gemacht', back: 'did (machen) - Perfekt' },
            { front: 'fuhr', back: 'drove (fahren) - Prät.' },
            { front: 'konnte', back: 'could (können) - Prät.' },
            { front: 'gegangen', back: 'gone (gehen) - Perfekt sein' },
          ]}),
          makeTask('a2w2d6t2', 'grammar', 'Everyday Past Tense', 'Using past tense in daily conversations', 15, {
            rule: 'In daily conversation, Perfekt is the go-to past tense.',
            examples: [
              { german: 'Was hast du gemacht? Ich habe gearbeitet.', english: 'What did you do? I worked.' },
              { german: 'Wo warst du? Ich war im Kino.', english: 'Where were you? I was at the cinema.' },
              { german: 'Hast du gut geschlafen? Ja, danke!', english: 'Did you sleep well? Yes, thanks!' },
            ],
            note: 'Mix Perfekt (for actions) and Präteritum (for being/having) naturally.'
          }),
          makeTask('a2w2d6t3', 'vocabulary', 'Daily Life Phrases', 'Common past tense phrases', 15, { items: [
            { german: 'Ich habe heute früh aufgestanden.', english: 'I got up early today.' },
            { german: 'Wir haben zusammen gegessen.', english: 'We ate together.' },
            { german: 'Er hat mir geholfen.', english: 'He helped me.' },
            { german: 'Sie hat mir das Buch gegeben.', english: 'She gave me the book.' },
          ]}),
          makeTask('a2w2d6t4', 'roleplay', 'Daily Conversation', 'Practice everyday past tense', 10, {
            scenario: 'A friend asks what you did today.',
            steps: ['Answer: "Heute habe ich ___ gemacht."', 'Add details: "Dann bin ich ___ gefahren."', 'Respond to questions: "Ja, ich war ___."']
          }),
          makeTask('a2w2d6t5', 'listening', 'Daily Conversation', 'Listen to past tense in context', 10, {
            clip: { title: 'Daily chat', source: 'Easy German', text: '"Heute habe ich früh aufgestanden. Ich habe gefrühstückt und dann gearbeitet."' },
            questions: [
              { question: 'What did they do first?', options: ['worked', 'ate breakfast', 'got up early', 'exercised'], correct: 2 },
              { question: 'What auxilary verb is used?', options: ['haben', 'sein', 'werden', 'können'], correct: 0 },
            ]
          }),
          makeTask('a2w2d6t6', 'writing', 'Personal Experience', 'Write about a personal experience', 10, {
            prompt: 'Write about something interesting that happened to you recently.',
            example: 'Letzte Woche habe ich ein neues Restaurant entdeckt. Das Essen war lecker!',
            tips: ['Use Perfekt for actions', 'Use Präteritum for descriptions']
          }),
          makeTask('a2w2d6t7', 'quickwin', 'Quick Win: Daily Phrase', 'A phrase you\'ll use every day', 5, {}),
        ]),
        makeDay(7, 'Mini Challenge: Week 2 Review', [
          makeTask('a2w2d7t1', 'review', 'Week 2 Review Quiz', 'Comprehensive review', 25, { questions: [
            { question: '"lernen" in Präteritum is...', options: ['lernte', 'lernte', 'gelernt', 'lernen'], correct: 0 },
            { question: '"fahren" in Präteritum is...', options: ['fahrt', 'fuhr', 'gefahren', 'fährt'], correct: 1 },
            { question: 'In spoken German, which past tense is more common?', options: ['Präteritum', 'Perfekt', 'Plusquamperfekt', 'Futur'], correct: 1 },
            { question: '"Am Samstag habe ich Sport ___ (treiben)."', options: ['getrieben', 'getrieben', 'trieb', 'treibe'], correct: 0 },
            { question: '"Er ___ gestern ___ (ankommen)."', options: ['hat...ankommen', 'ist...angekommen', 'hat...angekommen', 'ist...ankommen'], correct: 1 },
          ]}),
          makeTask('a2w2d7t2', 'fun', '🎉 Week 2 Complete!', 'Bonus content!', 5, {
            facts: [
              '📚 German has about 5,300 irregular verbs!',
              '🎯 Most irregular verbs follow just a few patterns.',
              '🗣️ In casual speech, Germans almost never use Präteritum for regular verbs.',
              '🎓 You\'re now building a solid foundation for A2!',
            ]
          }),
        ]),
      ]
    },
    {
      id: 3,
      title: 'Familie & Soziales — Family & Social Life',
      icon: '👨‍👩‍👧‍👦',
      theme: 'Family vocabulary, expanded modal verbs',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 3: Familie & Soziales' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Family vocabulary, expanded modal verbs' },
      ],
      days: [
        { day: 1, title: 'Family Members', tasks: [
          {"id": "a2w3d1t1", "type": "flashcards", "title": "Warm Up: Family Vocab", "description": "Review basic family terms", "xp": 5, "content": {"cards": [{"front": "der Vater", "back": "father"}, {"front": "die Mutter", "back": "mother"}, {"front": "der Bruder", "back": "brother"}]}},
          {"id": "a2w3d1t2", "type": "grammar", "title": "Family Nouns & Gender", "description": "Gender patterns for family", "xp": 15, "content": {"rule": "Family nouns have gender: der Vater (m), die Mutter (f).", "examples": [{"german": "der Vater", "english": "father"}, {"german": "die Mutter", "english": "mother"}, {"german": "das Kind", "english": "child"}], "note": "Add Gross- for grand: der Grossvater."}},
          {"id": "a2w3d1t3", "type": "vocabulary", "title": "Extended Family", "description": "Extended family terms", "xp": 15, "content": {"items": [{"german": "der Grossvater", "english": "grandfather"}, {"german": "die Grossmutter", "english": "grandmother"}, {"german": "der Onkel", "english": "uncle"}, {"german": "die Tante", "english": "aunt"}, {"german": "der Cousin", "english": "cousin (m)"}, {"german": "die Cousine", "english": "cousin (f)"}]}},
          {"id": "a2w3d1t4", "type": "matching", "title": "Family Match", "description": "Match to English", "xp": 10, "content": {"pairs": [{"german": "der Onkel", "english": "uncle"}, {"german": "die Tante", "english": "aunt"}]}},
          {"id": "a2w3d1t5", "type": "listening", "title": "Family Introduction", "description": "Listen to a family intro", "xp": 10, "content": {"clip": {"title": "My Family", "source": "Nicos Weg", "text": "Hallo! Ich heisse Anna. Das ist meine Familie."}, "questions": [{"question": "What is the girls name?", "options": ["Maria", "Anna", "Thomas"], "correct": 1}]}},
          {"id": "a2w3d1t6", "type": "speaking", "title": "Introduce Your Family", "description": "Practice introductions", "xp": 10, "content": {"prompt": "Say: Mein Vater heisst ___ and meine Mutter heisst ___.", "tips": ["Use mein for masculine", "Use meine for feminine"]}},
          {"id": "a2w3d1t7", "type": "quickwin", "title": "Quick Win: Family Word", "description": "Learn a family word", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'Possessive Articles with Family', tasks: [
          {"id": "a2w3d2t1", "type": "flashcards", "title": "Warm Up", "description": "Review family", "xp": 5, "content": {"cards": [{"front": "der Grossvater", "back": "grandfather"}, {"front": "die Grossmutter", "back": "grandmother"}]}},
          {"id": "a2w3d2t2", "type": "grammar", "title": "Possessive Articles", "description": "mein, dein, sein, ihr, unser, euer", "xp": 15, "content": {"rule": "Possessives match gender: mein Vater (m), meine Mutter (f).", "examples": [{"german": "Mein Vater ist Arzt.", "english": "My father is a doctor."}, {"german": "Deine Mutter ist Lehrerin.", "english": "Your mother is a teacher."}], "note": "Unser loses -er: unser Vater, unsere Mutter."}},
          {"id": "a2w3d2t3", "type": "vocabulary", "title": "Professions in Family", "description": "Professions vocab", "xp": 15, "content": {"items": [{"german": "der Arzt / die Aerztin", "english": "doctor"}, {"german": "der Lehrer / die Lehrerin", "english": "teacher"}, {"german": "der Ingenieur", "english": "engineer"}, {"german": "der Student / die Studentin", "english": "student"}]}},
          {"id": "a2w3d2t4", "type": "fillblank", "title": "Possessive Fill-in", "description": "Complete with possessive", "xp": 10, "content": {"sentences": [{"text": "___ Vater heisst Klaus. (my)", "answer": "Mein", "hint": "masculine nom."}, {"text": "___ Mutter arbeitet hier. (your)", "answer": "Deine", "hint": "feminine nom."}]}},
          {"id": "a2w3d2t5", "type": "listening", "title": "Family Descriptions", "description": "Listen to descriptions", "xp": 10, "content": {"clip": {"title": "Descriptions", "source": "Easy German", "text": "Mein Vater ist Ingenieur."}, "questions": [{"question": "What does father do?", "options": ["doctor", "engineer", "teacher"], "correct": 1}]}},
          {"id": "a2w3d2t6", "type": "writing", "title": "Describe Your Family", "description": "Write 5 sentences", "xp": 10, "content": {"prompt": "Write about your family with possessive articles.", "tips": ["Use mein/meine", "Add a profession"]}},
          {"id": "a2w3d2t7", "type": "quickwin", "title": "Quick Win: Possessive", "description": "Remember mein vs meine", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'Modal Verbs for Family', tasks: [
          {"id": "a2w3d3t1", "type": "flashcards", "title": "Warm Up", "description": "Review possessives", "xp": 5, "content": {"cards": [{"front": "mein", "back": "my (m/n)"}, {"front": "meine", "back": "my (f/pl)"}]}},
          {"id": "a2w3d3t2", "type": "grammar", "title": "Modal Verbs Review", "description": "koennen, muessen, duerfen, sollen, wollen", "xp": 15, "content": {"rule": "Modal verbs push main verb to end in infinitive.", "examples": [{"german": "Ich muss mein Zimmer aufraeumen.", "english": "I must clean my room."}, {"german": "Du kannst deinen Bruder fragen.", "english": "You can ask your brother."}], "note": "In Perfekt: Ich habe aufraeumen muessen."}},
          {"id": "a2w3d3t3", "type": "vocabulary", "title": "Household Chores", "description": "Chore vocabulary", "xp": 15, "content": {"items": [{"german": "das Zimmer aufraeumen", "english": "clean the room"}, {"german": "den Tisch decken", "english": "set the table"}, {"german": "abwaschen", "english": "do dishes"}, {"german": "staubsaugen", "english": "vacuum"}]}},
          {"id": "a2w3d3t4", "type": "quiz", "title": "Modal Verbs Quiz", "description": "Choose the correct modal", "xp": 10, "content": {"questions": [{"question": "Ich ___ mein Zimmer aufraeumen. (must)", "options": ["kann", "muss", "darf"], "correct": 1}, {"question": "Du ___ mir helfen. (should)", "options": ["kannst", "musst", "sollst"], "correct": 2}]}},
          {"id": "a2w3d3t5", "type": "listening", "title": "Family Chores", "description": "Listen to chores", "xp": 10, "content": {"clip": {"title": "Chores", "source": "Easy German", "text": "Am Samstag muss ich aufraeumen."}, "questions": [{"question": "What must speaker do?", "options": ["cook", "clean up", "do dishes"], "correct": 1}]}},
          {"id": "a2w3d3t6", "type": "speaking", "title": "Talk About Chores", "description": "Practice chores", "xp": 10, "content": {"prompt": "Say: Ich muss ___ and Mein Bruder muss ___.", "tips": ["Use muss for must", "Verb goes to end"]}},
          {"id": "a2w3d3t7", "type": "quickwin", "title": "Quick Win: Chore Word", "description": "A household word", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Family Relationships', tasks: [
          {"id": "a2w3d4t1", "type": "flashcards", "title": "Warm Up", "description": "Review chores", "xp": 5, "content": {"cards": [{"front": "aufraeumen", "back": "clean up"}, {"front": "abwaschen", "back": "do dishes"}]}},
          {"id": "a2w3d4t2", "type": "grammar", "title": "Describing People", "description": "Adjectives for family", "xp": 15, "content": {"rule": "Before noun: adjective + ending. After ist: no ending.", "examples": [{"german": "Mein Vater ist sehr nett.", "english": "My father is very nice."}, {"german": "Meine Mutter ist eine freundliche Frau.", "english": "My mother is a friendly woman."}], "note": "Adjectives before nouns get endings."}},
          {"id": "a2w3d4t3", "type": "vocabulary", "title": "Personality Adjectives", "description": "Personality words", "xp": 15, "content": {"items": [{"german": "nett", "english": "nice"}, {"german": "freundlich", "english": "friendly"}, {"german": "geduldig", "english": "patient"}, {"german": "lustig", "english": "funny"}, {"german": "fleissig", "english": "hardworking"}]}},
          {"id": "a2w3d4t4", "type": "fillblank", "title": "Description Drill", "description": "Complete descriptions", "xp": 10, "content": {"sentences": [{"text": "Mein Vater ist sehr ___. (patient)", "answer": "geduldig"}, {"text": "Meine Mutter ist eine ___ Frau. (friendly)", "answer": "freundliche"}]}},
          {"id": "a2w3d4t5", "type": "listening", "title": "Personality Descriptions", "description": "Listen to descriptions", "xp": 10, "content": {"clip": {"title": "Personalities", "source": "Easy German", "text": "Mein Vater ist geduldig."}, "questions": [{"question": "How is the father?", "options": ["patient", "friendly", "funny"], "correct": 0}]}},
          {"id": "a2w3d4t6", "type": "writing", "title": "Describe Family Member", "description": "Write paragraph", "xp": 10, "content": {"prompt": "Write 4-5 sentences about a family member.", "tips": ["Start with name", "Add profession", "Describe personality"]}},
          {"id": "a2w3d4t7", "type": "quickwin", "title": "Quick Win: Adjective", "description": "A describing word", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Family Events & Celebrations', tasks: [
          {"id": "a2w3d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review adjectives", "xp": 5, "content": {"cards": [{"front": "nett", "back": "nice"}, {"front": "freundlich", "back": "friendly"}]}},
          {"id": "a2w3d5t2", "type": "grammar", "title": "Family Gatherings", "description": "Talking about events", "xp": 15, "content": {"rule": "Use feiern (celebrate) + acc. einladen (invite) + acc.", "examples": [{"german": "Wir feiern Weihnachten mit der Familie.", "english": "We celebrate Christmas with family."}, {"german": "Ich lade meine Freunde zur Party ein.", "english": "I invite friends to the party."}], "note": "einladen separates: ich lade...ein."}},
          {"id": "a2w3d5t3", "type": "vocabulary", "title": "Celebrations", "description": "Event vocabulary", "xp": 15, "content": {"items": [{"german": "der Geburtstag", "english": "birthday"}, {"german": "die Hochzeit", "english": "wedding"}, {"german": "das Fest", "english": "celebration"}, {"german": "das Geschenk", "english": "gift"}, {"german": "die Einladung", "english": "invitation"}]}},
          {"id": "a2w3d5t4", "type": "quiz", "title": "Events Quiz", "description": "Test vocab", "xp": 10, "content": {"questions": [{"question": "Geburtstag means...", "options": ["wedding", "birthday", "gift"], "correct": 1}]}},
          {"id": "a2w3d5t5", "type": "roleplay", "title": "Inviting to Party", "description": "Practice inviting", "xp": 10, "content": {"scenario": "Your birthday is next week.", "steps": ["Greet", "Invite: Am Samstag habe ich Geburtstag", "Add details"]}},
          {"id": "a2w3d5t6", "type": "listening", "title": "Birthday Plan", "description": "Listen to plans", "xp": 10, "content": {"clip": {"title": "Birthday", "source": "Easy German", "text": "Am Samstag feiere ich Geburtstag."}, "questions": [{"question": "What day?", "options": ["Friday", "Saturday", "Sunday"], "correct": 1}]}},
          {"id": "a2w3d5t7", "type": "quickwin", "title": "Quick Win: Party Word", "description": "A party word", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'Family History', tasks: [
          {"id": "a2w3d6t1", "type": "flashcards", "title": "Warm Up", "description": "Review events", "xp": 5, "content": {"cards": [{"front": "der Geburtstag", "back": "birthday"}, {"front": "das Fest", "back": "celebration"}]}},
          {"id": "a2w3d6t2", "type": "grammar", "title": "Past Tense Stories", "description": "Perfekt with family", "xp": 15, "content": {"rule": "Combine Perfekt with family vocab.", "examples": [{"german": "Letztes Jahr habe ich mit der Familie gefeiert.", "english": "Last year I celebrated with family."}, {"german": "Mein Grossvater ist nach Berlin gezogen.", "english": "My grandfather moved to Berlin."}], "note": "Use Perfekt for spoken stories."}},
          {"id": "a2w3d6t3", "type": "vocabulary", "title": "Time Expressions", "description": "Words for stories", "xp": 15, "content": {"items": [{"german": "frueher", "english": "in the past"}, {"german": "damals", "english": "back then"}, {"german": "als Kind", "english": "as a child"}, {"german": "jedes Jahr", "english": "every year"}]}},
          {"id": "a2w3d6t4", "type": "fillblank", "title": "Story Drill", "description": "Complete family story", "xp": 10, "content": {"sentences": [{"text": "Früher ___ ich in Berlin ___. (wohnen)", "answer": "habe...gewohnt"}]}},
          {"id": "a2w3d6t5", "type": "speaking", "title": "Tell a Family Story", "description": "Share a memory", "xp": 10, "content": {"prompt": "Tell a childhood memory.", "tips": ["Start with Als Kind...", "Use Perfekt"]}},
          {"id": "a2w3d6t6", "type": "writing", "title": "Family Tradition", "description": "Write about tradition", "xp": 10, "content": {"prompt": "Write about a family tradition.", "tips": ["Start with time expression", "Use present for traditions"]}},
          {"id": "a2w3d6t7", "type": "quickwin", "title": "Quick Win: Story", "description": "A storytelling word", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'Mini Challenge: Week 3 Review', tasks: [
          {"id": "a2w3d7t1", "type": "review", "title": "Week 3 Review", "description": "Comprehensive", "xp": 25, "content": {"questions": [{"question": "Grossmutter means...", "options": ["grandmother", "great-grandmother", "mother-in-law"], "correct": 0}, {"question": "Mein is used with which gender?", "options": ["feminine", "masculine/neuter", "plural"], "correct": 1}, {"question": "Ich ___ mein Zimmer aufraeumen. (must)", "options": ["kann", "muss", "darf"], "correct": 1}]}},
          {"id": "a2w3d7t2", "type": "fun", "title": "Week 3 Complete!", "description": "Bonus!", "xp": 5, "content": {"facts": ["German has 20+ family relationship words!", "Family vocab is key for A2 speaking exams."]}}
        ]}
      ]
    },
    {
      id: 4,
      title: 'Essen & Restaurant — Food & Dining',
      icon: '🍽️',
      theme: 'Dining out, comparative/superlative forms',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 4: Essen & Restaurant' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Dining out, comparative/superlative forms' },
      ],
      days: [
        { day: 1, title: 'Food & Meals', tasks: [
          {"id": "a2w4d1t1", "type": "flashcards", "title": "Warm Up", "description": "Basic foods", "xp": 5, "content": {"cards": [{"front": "das Brot", "back": "bread"}, {"front": "die Milch", "back": "milk"}, {"front": "der Kaese", "back": "cheese"}]}},
          {"id": "a2w4d1t2", "type": "grammar", "title": "Food Articles", "description": "Der/die/das patterns", "xp": 15, "content": {"rule": "-e often feminine, -er often masculine.", "examples": [{"german": "der Kaffee, der Tee", "english": "coffee, tea (m)"}, {"german": "die Milch, die Butter", "english": "milk, butter (f)"}, {"german": "das Wasser, das Bier", "english": "water, beer (n)"}], "note": "Exceptions exist!"}},
          {"id": "a2w4d1t3", "type": "vocabulary", "title": "Food & Drinks", "description": "Essential food words", "xp": 15, "content": {"items": [{"german": "das Fruehstueck", "english": "breakfast"}, {"german": "das Mittagessen", "english": "lunch"}, {"german": "das Abendessen", "english": "dinner"}, {"german": "das Fleisch", "english": "meat"}, {"german": "das Gemuese", "english": "vegetables"}]}},
          {"id": "a2w4d1t4", "type": "matching", "title": "Food Match", "description": "Match to English", "xp": 10, "content": {"pairs": [{"german": "der Kaffee", "english": "coffee"}, {"german": "das Wasser", "english": "water"}, {"german": "das Bier", "english": "beer"}]}},
          {"id": "a2w4d1t5", "type": "listening", "title": "Ordering Drinks", "description": "Listen to an order", "xp": 10, "content": {"clip": {"title": "Cafe", "source": "Easy German", "text": "Ich moechte einen Kaffee, bitte."}, "questions": [{"question": "What is ordered?", "options": ["tea", "coffee", "water"], "correct": 1}]}},
          {"id": "a2w4d1t6", "type": "speaking", "title": "Order a Drink", "description": "Practice ordering", "xp": 10, "content": {"prompt": "Say: Ich moechte einen Kaffee, bitte.", "tips": ["Use moechte", "Use einen for masculine"]}},
          {"id": "a2w4d1t7", "type": "quickwin", "title": "Quick Win: Food", "description": "A food word", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'At the Restaurant', tasks: [
          {"id": "a2w4d2t1", "type": "flashcards", "title": "Warm Up", "description": "Review food", "xp": 5, "content": {"cards": [{"front": "das Fruehstueck", "back": "breakfast"}, {"front": "das Mittagessen", "back": "lunch"}]}},
          {"id": "a2w4d2t2", "type": "grammar", "title": "Restaurant Phrases", "description": "Key dining phrases", "xp": 15, "content": {"rule": "Ich moechte... is polite. Ich haette gern... is more polite.", "examples": [{"german": "Ich moechte einen Tisch fuer zwei.", "english": "A table for two."}, {"german": "Die Rechnung, bitte!", "english": "The bill, please!"}], "note": "moechte is subjunctive of moegen."}},
          {"id": "a2w4d2t3", "type": "vocabulary", "title": "Restaurant Words", "description": "Dining vocab", "xp": 15, "content": {"items": [{"german": "die Speisekarte", "english": "menu"}, {"german": "der Kellner", "english": "waiter"}, {"german": "die Rechnung", "english": "bill"}, {"german": "das Trinkgeld", "english": "tip"}, {"german": "die Vorspeise", "english": "starter"}, {"german": "die Hauptspeise", "english": "main course"}]}},
          {"id": "a2w4d2t4", "type": "roleplay", "title": "At Restaurant", "description": "Practice dining", "xp": 10, "content": {"scenario": "At a restaurant.", "steps": ["Greet", "Request table", "Order", "Pay"]}},
          {"id": "a2w4d2t5", "type": "listening", "title": "Restaurant Dialogue", "description": "Listen to conversation", "xp": 10, "content": {"clip": {"title": "Restaurant", "source": "Nicos Weg", "text": "Guten Abend! Haben Sie einen Tisch fuer zwei?"}, "questions": [{"question": "How many people?", "options": ["one", "two", "three"], "correct": 1}]}},
          {"id": "a2w4d2t6", "type": "writing", "title": "Restaurant Review", "description": "Write a review", "xp": 10, "content": {"prompt": "Write 3-4 sentences about a restaurant.", "tips": ["Use lecker", "Describe service"]}},
          {"id": "a2w4d2t7", "type": "quickwin", "title": "Quick Win: Dining", "description": "A dining word", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'Comparative Adjectives', tasks: [
          {"id": "a2w4d3t1", "type": "flashcards", "title": "Warm Up", "description": "Review restaurant", "xp": 5, "content": {"cards": [{"front": "die Speisekarte", "back": "menu"}, {"front": "der Kellner", "back": "waiter"}]}},
          {"id": "a2w4d3t2", "type": "grammar", "title": "Comparative Forms", "description": "Add -er + als", "xp": 15, "content": {"rule": "Add -er + als: gross -> groesser als.", "examples": [{"german": "Die Pizza ist besser als der Salat.", "english": "Pizza is better than salad."}, {"german": "Das Restaurant ist teurer als das Cafe.", "english": "More expensive than the cafe."}], "note": "Umlaut: gross->groesser, kalt->kaelter."}},
          {"id": "a2w4d3t3", "type": "vocabulary", "title": "Food Comparisons", "description": "Comparison adjectives", "xp": 15, "content": {"items": [{"german": "lecker / leckerer", "english": "delicious / more delicious"}, {"german": "suess / suesser", "english": "sweet / sweeter"}, {"german": "teuer / teurer", "english": "expensive / more expensive"}]}},
          {"id": "a2w4d3t4", "type": "fillblank", "title": "Comparative Drill", "description": "Fill in comparative", "xp": 10, "content": {"sentences": [{"text": "Der Kaffee ist ___ als der Tee. (strong)", "answer": "staerker"}, {"text": "Pizza ist ___ als Salat. (good)", "answer": "besser"}]}},
          {"id": "a2w4d3t5", "type": "listening", "title": "Comparing Foods", "description": "Listen to comparisons", "xp": 10, "content": {"clip": {"title": "Comparisons", "source": "Easy German", "text": "Die Pizza ist besser."}, "questions": [{"question": "Which is better?", "options": ["salad", "pizza", "both"], "correct": 1}]}},
          {"id": "a2w4d3t6", "type": "speaking", "title": "Compare Foods", "description": "Practice comparisons", "xp": 10, "content": {"prompt": "Say: Food A ist adjective+er als Food B.", "tips": ["Use -er + als", "Try umlaut changes"]}},
          {"id": "a2w4d3t7", "type": "quickwin", "title": "Quick Win: Comparison", "description": "A comparison word", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Superlative Forms', tasks: [
          {"id": "a2w4d4t1", "type": "flashcards", "title": "Warm Up", "description": "Review comparatives", "xp": 5, "content": {"cards": [{"front": "besser als", "back": "better than"}, {"front": "teurer als", "back": "more expensive than"}]}},
          {"id": "a2w4d4t2", "type": "grammar", "title": "Superlative Forms", "description": "am + -sten", "xp": 15, "content": {"rule": "am + adj + -sten: am besten, am teuersten.", "examples": [{"german": "Die Pizza ist am leckersten.", "english": "Pizza is most delicious."}, {"german": "Dieses Restaurant ist am teuersten.", "english": "This is the most expensive."}], "note": "Exceptions: am besten, am meisten."}},
          {"id": "a2w4d4t3", "type": "vocabulary", "title": "Superlative Examples", "description": "Common superlatives", "xp": 15, "content": {"items": [{"german": "am besten", "english": "best"}, {"german": "am meisten", "english": "most"}, {"german": "am teuersten", "english": "most expensive"}, {"german": "am guenstigsten", "english": "most affordable"}]}},
          {"id": "a2w4d4t4", "type": "quiz", "title": "Superlative Quiz", "description": "Choose correct form", "xp": 10, "content": {"questions": [{"question": "am besten is superlative of...", "options": ["gut", "besser", "gueter"], "correct": 0}, {"question": "am teuersten means...", "options": ["cheapest", "most expensive", "best"], "correct": 1}]}},
          {"id": "a2w4d4t5", "type": "fillblank", "title": "Superlative Drill", "description": "Fill in superlative", "xp": 10, "content": {"sentences": [{"text": "Die Pizza schmeckt ___. (good)", "answer": "am besten"}, {"text": "Dieses Cafe ist ___. (expensive)", "answer": "am teuersten"}]}},
          {"id": "a2w4d4t6", "type": "writing", "title": "Food Comparison", "description": "Compare three foods", "xp": 10, "content": {"prompt": "Compare three foods using comparatives and superlatives.", "tips": ["Use comp + als", "Use super am...sten"]}},
          {"id": "a2w4d4t7", "type": "quickwin", "title": "Quick Win: Superlative", "description": "A superlative word", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Grocery Shopping', tasks: [
          {"id": "a2w4d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review superlatives", "xp": 5, "content": {"cards": [{"front": "am besten", "back": "best"}, {"front": "am teuersten", "back": "most expensive"}]}},
          {"id": "a2w4d5t2", "type": "grammar", "title": "Prices & Quantities", "description": "Talking about costs", "xp": 15, "content": {"rule": "Wie viel kostet? for singular, Wie viel kosten? for plural.", "examples": [{"german": "Was kostet das Brot?", "english": "How much is bread?"}, {"german": "Das kostet 2 Euro 50.", "english": "That costs 2.50."}], "note": "guenstig = affordable, billig = cheap (neg connotation)."}},
          {"id": "a2w4d5t3", "type": "vocabulary", "title": "Shopping Words", "description": "Grocery vocab", "xp": 15, "content": {"items": [{"german": "der Supermarkt", "english": "supermarket"}, {"german": "die Kasse", "english": "checkout"}, {"german": "der Einkaufswagen", "english": "shopping cart"}, {"german": "der Kassenbon", "english": "receipt"}]}},
          {"id": "a2w4d5t4", "type": "roleplay", "title": "At Supermarket", "description": "Practice shopping", "xp": 10, "content": {"scenario": "At a German supermarket.", "steps": ["Find items", "Ask price", "Pay"]}},
          {"id": "a2w4d5t5", "type": "listening", "title": "Shopping", "description": "Listen to shopping", "xp": 10, "content": {"clip": {"title": "Shopping", "source": "Easy German", "text": "Was kostet der Kaese?"}, "questions": [{"question": "What item?", "options": ["bread", "cheese", "milk"], "correct": 1}]}},
          {"id": "a2w4d5t6", "type": "speaking", "title": "Buy Something", "description": "Practice purchase", "xp": 10, "content": {"prompt": "Say: Ich haette gern [amount] [item], bitte.", "tips": ["Use Ich haette gern", "Say danke"]}},
          {"id": "a2w4d5t7", "type": "quickwin", "title": "Quick Win: Shopping", "description": "A shopping word", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'Cooking & Recipes', tasks: [
          {"id": "a2w4d6t1", "type": "flashcards", "title": "Warm Up", "description": "Review shopping", "xp": 5, "content": {"cards": [{"front": "der Supermarkt", "back": "supermarket"}, {"front": "die Kasse", "back": "checkout"}]}},
          {"id": "a2w4d6t2", "type": "grammar", "title": "Cooking Imperatives", "description": "Giving cooking instructions", "xp": 15, "content": {"rule": "du-Form: verb stem + -e. Sie-Form: infinitive + Sie.", "examples": [{"german": "Nimm das Mehl und die Eier!", "english": "Take flour and eggs!"}, {"german": "Mische alle Zutaten!", "english": "Mix all ingredients!"}], "note": "Use Sie imperative for formal recipes."}},
          {"id": "a2w4d6t3", "type": "vocabulary", "title": "Cooking Verbs", "description": "Essential cooking verbs", "xp": 15, "content": {"items": [{"german": "kochen", "english": "to cook/boil"}, {"german": "braten", "english": "to fry"}, {"german": "backen", "english": "to bake"}, {"german": "schneiden", "english": "to cut"}, {"german": "mischen", "english": "to mix"}]}},
          {"id": "a2w4d6t4", "type": "scramble", "title": "Cooking Scramble", "description": "Unscramble verbs", "xp": 10, "content": {"words": [{"scrambled": "nccheo", "answer": "kochen", "hint": "to cook"}, {"scrambled": "teanbr", "answer": "braten", "hint": "to fry"}]}},
          {"id": "a2w4d6t5", "type": "listening", "title": "Recipe", "description": "Listen to a recipe", "xp": 10, "content": {"clip": {"title": "Recipe", "source": "Easy German", "text": "Nimm drei Eier, Mehl und Zucker."}, "questions": [{"question": "How many ingredients?", "options": ["two", "three", "four"], "correct": 1}]}},
          {"id": "a2w4d6t6", "type": "writing", "title": "Write a Recipe", "description": "Write a simple recipe", "xp": 10, "content": {"prompt": "Write a 4-step recipe.", "tips": ["Use imperatives", "List ingredients"]}},
          {"id": "a2w4d6t7", "type": "quickwin", "title": "Quick Win: Cooking", "description": "A kitchen word", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'Mini Challenge: Week 4 Review', tasks: [
          {"id": "a2w4d7t1", "type": "review", "title": "Week 4 Review", "description": "Comprehensive", "xp": 25, "content": {"questions": [{"question": "die Speisekarte means...", "options": ["menu", "recipe", "grocery list"], "correct": 0}, {"question": "Comparative of gross?", "options": ["groesser", "groesser", "am groessten"], "correct": 1}, {"question": "am besten is superlative of...", "options": ["gut", "schlecht", "viel"], "correct": 0}]}},
          {"id": "a2w4d7t2", "type": "fun", "title": "Week 4 Complete!", "description": "Bonus!", "xp": 5, "content": {"facts": ["Germany has 1,500+ beer types!", "Pretzel is 1,000+ years old.", "Tipping 5-10% is customary."]}}
        ]}
      ]
    },
    {
      id: 5,
      title: 'Arbeit & Beruf — Work & Professions',
      icon: '💼',
      theme: 'Workplace language, dative prepositions',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 5: Arbeit & Beruf' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Workplace language, dative prepositions' },
      ],
      days: [
        { day: 1, title: 'Professions & Jobs', tasks: [
          {"id": "a2w5d1t1", "type": "flashcards", "title": "Warm Up", "description": "Review job words", "xp": 5, "content": {"cards": [{"front": "der Arzt", "back": "doctor"}, {"front": "die Lehrerin", "back": "teacher (f)"}, {"front": "der Ingenieur", "back": "engineer"}]}},
          {"id": "a2w5d1t2", "type": "grammar", "title": "Masc & Fem Jobs", "description": "Job gender changes", "xp": 15, "content": {"rule": "Add -in for feminine: der Lehrer -> die Lehrerin.", "examples": [{"german": "der Arzt / die Aerztin", "english": "doctor (m/f)"}, {"german": "der Kaufmann / die Kauffrau", "english": "businessperson (m/f)"}], "note": "Some have unique forms."}},
          {"id": "a2w5d1t3", "type": "vocabulary", "title": "Common Professions", "description": "More job words", "xp": 15, "content": {"items": [{"german": "der Programmierer", "english": "programmer"}, {"german": "der Manager", "english": "manager"}, {"german": "der Anwalt / die Anwaeltin", "english": "lawyer"}, {"german": "der Journalist / die Journalistin", "english": "journalist"}]}},
          {"id": "a2w5d1t4", "type": "matching", "title": "Profession Match", "description": "Match to English", "xp": 10, "content": {"pairs": [{"german": "der Arzt", "english": "doctor"}, {"german": "der Lehrer", "english": "teacher"}, {"german": "der Anwalt", "english": "lawyer"}]}},
          {"id": "a2w5d1t5", "type": "listening", "title": "Job Introductions", "description": "Listen to intros", "xp": 10, "content": {"clip": {"title": "Jobs", "source": "Easy German", "text": "Ich heisse Markus und bin Ingenieur."}, "questions": [{"question": "What does Markus do?", "options": ["doctor", "engineer", "teacher"], "correct": 1}]}},
          {"id": "a2w5d1t6", "type": "speaking", "title": "Introduce Your Job", "description": "Say what you do", "xp": 10, "content": {"prompt": "Say: Ich bin [profession].", "tips": ["Use Ich bin for job"]}},
          {"id": "a2w5d1t7", "type": "quickwin", "title": "Quick Win: Job", "description": "A job word", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'Dative Prepositions', tasks: [
          {"id": "a2w5d2t1", "type": "flashcards", "title": "Warm Up", "description": "Review professions", "xp": 5, "content": {"cards": [{"front": "der Programmierer", "back": "programmer"}, {"front": "der Anwalt", "back": "lawyer"}]}},
          {"id": "a2w5d2t2", "type": "grammar", "title": "Dative Prepositions", "description": "aus, bei, mit, nach, seit, von, zu", "xp": 15, "content": {"rule": "These always take dative: aus, bei, mit, nach, seit, von, zu.", "examples": [{"german": "Ich komme aus der Tuerkei.", "english": "I come from Turkey."}, {"german": "Er arbeitet bei einer grossen Firma.", "english": "He works at a big company."}], "note": "Dative: der->dem, die->der, das->dem, die->den+n."}},
          {"id": "a2w5d2t3", "type": "vocabulary", "title": "Workplace Words", "description": "Office vocab", "xp": 15, "content": {"items": [{"german": "das Buro", "english": "office"}, {"german": "die Firma", "english": "company"}, {"german": "der Kollege / die Kollegin", "english": "colleague"}, {"german": "der Chef / die Chefin", "english": "boss"}, {"german": "die Besprechung", "english": "meeting"}]}},
          {"id": "a2w5d2t4", "type": "fillblank", "title": "Dative Practice", "description": "Correct dative form", "xp": 10, "content": {"sentences": [{"text": "Ich arbeite bei ___ Firma. (einer/eine)", "answer": "einer"}, {"text": "Er faehrt mit ___ Zug.", "answer": "dem"}, {"text": "Nach ___ Arbeit gehe ich heim.", "answer": "der"}]}},
          {"id": "a2w5d2t5", "type": "listening", "title": "Workplace Talk", "description": "Listen to work talk", "xp": 10, "content": {"clip": {"title": "Work", "source": "Easy German", "text": "Ich arbeite bei einer Firma."}, "questions": [{"question": "Where does he work?", "options": ["for a company", "for a bank", "for a school"], "correct": 0}]}},
          {"id": "a2w5d2t6", "type": "writing", "title": "Describe Workplace", "description": "Write about work", "xp": 10, "content": {"prompt": "Write 4-5 sentences about workplace.", "tips": ["Use dative preps: bei, mit, nach"]}},
          {"id": "a2w5d2t7", "type": "quickwin", "title": "Quick Win: Dative", "description": "A dative preposition", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'Daily Work Routine', tasks: [
          {"id": "a2w5d3t1", "type": "flashcards", "title": "Warm Up", "description": "Review dative", "xp": 5, "content": {"cards": [{"front": "aus", "back": "from (dat)"}, {"front": "bei", "back": "at (dat)"}, {"front": "mit", "back": "with (dat)"}]}},
          {"id": "a2w5d3t2", "type": "grammar", "title": "Daily Work Talk", "description": "Describing routine", "xp": 15, "content": {"rule": "Time expressions: um, von...bis, am Morgen.", "examples": [{"german": "Ich stehe um 7 Uhr auf.", "english": "I get up at 7."}, {"german": "Von 9 bis 17 Uhr arbeite ich.", "english": "I work 9-5."}], "note": "Use zur Arbeit (zu+der Arbeit)."}},
          {"id": "a2w5d3t3", "type": "vocabulary", "title": "Work Routine Words", "description": "Daily work vocabulary", "xp": 15, "content": {"items": [{"german": "aufstehen", "english": "get up"}, {"german": "fruehstuecken", "english": "have breakfast"}, {"german": "zur Arbeit fahren", "english": "go to work"}, {"german": "die Mittagspause", "english": "lunch break"}, {"german": "Feierabend", "english": "end of work"}]}},
          {"id": "a2w5d3t4", "type": "quiz", "title": "Work Routine Quiz", "description": "Test vocab", "xp": 10, "content": {"questions": [{"question": "aufstehen means...", "options": ["sit down", "get up", "stand up"], "correct": 1}, {"question": "Feierabend is...", "options": ["holiday", "end of work", "party"], "correct": 1}]}},
          {"id": "a2w5d3t5", "type": "roleplay", "title": "Morning Routine", "description": "Describe morning", "xp": 10, "content": {"scenario": "A colleague asks about morning.", "steps": ["Get up: Ich stehe um 7 auf", "Breakfast", "Commute"]}},
          {"id": "a2w5d3t6", "type": "listening", "title": "Work Day", "description": "Listen to work day", "xp": 10, "content": {"clip": {"title": "Work day", "source": "Easy German", "text": "Ich stehe um 6 Uhr auf."}, "questions": [{"question": "When does he get up?", "options": ["6:00", "7:00", "8:00"], "correct": 0}]}},
          {"id": "a2w5d3t7", "type": "quickwin", "title": "Quick Win: Work Phrase", "description": "A useful work phrase", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Workplace Communication', tasks: [
          {"id": "a2w5d4t1", "type": "flashcards", "title": "Warm Up", "description": "Review routine", "xp": 5, "content": {"cards": [{"front": "aufstehen", "back": "get up"}, {"front": "Feierabend", "back": "end of work"}]}},
          {"id": "a2w5d4t2", "type": "grammar", "title": "Polite Requests", "description": "Konjunktiv II for politeness", "xp": 15, "content": {"rule": "Use koennte, wuerde for polite requests.", "examples": [{"german": "Koennten Sie mir helfen?", "english": "Could you help me?"}, {"german": "Ich wuerde gern einen Termin machen.", "english": "I want to make an appointment."}], "note": "Konjunktiv II sounds professional."}},
          {"id": "a2w5d4t3", "type": "vocabulary", "title": "Business Communication", "description": "Professional vocab", "xp": 15, "content": {"items": [{"german": "die E-Mail", "english": "email"}, {"german": "der Anruf", "english": "phone call"}, {"german": "der Termin", "english": "appointment"}, {"german": "die Besprechung", "english": "meeting"}]}},
          {"id": "a2w5d4t4", "type": "fillblank", "title": "Polite Requests", "description": "Complete the request", "xp": 10, "content": {"sentences": [{"text": "___ Sie mir helfen? (could)", "answer": "Koennten"}, {"text": "Ich ___ gern einen Termin. (would like)", "answer": "wuerde"}]}},
          {"id": "a2w5d4t5", "type": "roleplay", "title": "Business Call", "description": "Practice professional call", "xp": 10, "content": {"scenario": "Call to schedule a meeting.", "steps": ["Greet", "Request appointment", "Set time"]}},
          {"id": "a2w5d4t6", "type": "writing", "title": "Professional Email", "description": "Write an email", "xp": 10, "content": {"prompt": "Write an email requesting a meeting.", "tips": ["Use Sehr geehrte...", "Use polite Konjunktiv II", "End with Mit freundlichen Gruessen"]}},
          {"id": "a2w5d4t7", "type": "quickwin", "title": "Quick Win: Business Word", "description": "A professional word", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Job Interviews', tasks: [
          {"id": "a2w5d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review business words", "xp": 5, "content": {"cards": [{"front": "die E-Mail", "back": "email"}, {"front": "der Termin", "back": "appointment"}]}},
          {"id": "a2w5d5t2", "type": "grammar", "title": "Interview Questions", "description": "Common Qs in interviews", "xp": 15, "content": {"rule": "Ich habe Erfahrung in + dat. Ich kann + inf.", "examples": [{"german": "Ich habe Erfahrung in der Softwareentwicklung.", "english": "I have experience in dev."}, {"german": "Ich kann gut im Team arbeiten.", "english": "I work well in teams."}], "note": "Use in + dative for fields."}},
          {"id": "a2w5d5t3", "type": "vocabulary", "title": "Interview Words", "description": "Interview vocab", "xp": 15, "content": {"items": [{"german": "die Erfahrung", "english": "experience"}, {"german": "die Staerke", "english": "strength"}, {"german": "die Schwaeche", "english": "weakness"}, {"german": "die Ausbildung", "english": "education"}, {"german": "das Praktikum", "english": "internship"}]}},
          {"id": "a2w5d5t4", "type": "roleplay", "title": "Mock Interview", "description": "Practice interview", "xp": 10, "content": {"scenario": "In a job interview.", "steps": ["Introduce yourself", "Mention experience", "Talk about strengths"]}},
          {"id": "a2w5d5t5", "type": "listening", "title": "Job Interview", "description": "Listen to an interview", "xp": 10, "content": {"clip": {"title": "Interview", "source": "Easy German", "text": "Warum moechten Sie bei uns arbeiten?"}, "questions": [{"question": "What is asked?", "options": ["Experience", "Why work here", "Strengths"], "correct": 1}]}},
          {"id": "a2w5d5t6", "type": "writing", "title": "Cover Letter", "description": "Write a short cover letter", "xp": 10, "content": {"prompt": "Write 5 sentences for a job application.", "tips": ["Use Sehr geehrte...", "Mention experience", "End with Gruessen"]}},
          {"id": "a2w5d5t7", "type": "quickwin", "title": "Quick Win: Interview Word", "description": "A key interview word", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'German Work Culture', tasks: [
          {"id": "a2w5d6t1", "type": "flashcards", "title": "Warm Up", "description": "Review interview words", "xp": 5, "content": {"cards": [{"front": "die Erfahrung", "back": "experience"}, {"front": "die Staerke", "back": "strength"}]}},
          {"id": "a2w5d6t2", "type": "grammar", "title": "Discussing Work Culture", "description": "Using man for general statements", "xp": 15, "content": {"rule": "man + 3rd person verb form.", "examples": [{"german": "In Deutschland sagt man Sie.", "english": "You say Sie in Germany."}, {"german": "Man muss puenktlich sein.", "english": "You must be punctual."}], "note": "man is always singular."}},
          {"id": "a2w5d6t3", "type": "vocabulary", "title": "Work Culture Words", "description": "Work culture vocab", "xp": 15, "content": {"items": [{"german": "puenktlich", "english": "punctual"}, {"german": "die Probezeit", "english": "probation period"}, {"german": "der Urlaub", "english": "vacation"}, {"german": "die Krankschreibung", "english": "sick note"}]}},
          {"id": "a2w5d6t4", "type": "quiz", "title": "Work Culture Quiz", "description": "Test your knowledge", "xp": 10, "content": {"questions": [{"question": "Colleagues address each other with...", "options": ["du", "Sie", "first name"], "correct": 1}, {"question": "Punctuality is...", "options": ["optional", "very important", "not important"], "correct": 1}]}},
          {"id": "a2w5d6t5", "type": "listening", "title": "Workplace Norms", "description": "Listen about norms", "xp": 10, "content": {"clip": {"title": "Norms", "source": "Easy German", "text": "Puenktlichkeit ist sehr wichtig."}, "questions": [{"question": "What is important?", "options": ["punctuality", "formality", "overtime"], "correct": 0}]}},
          {"id": "a2w5d6t6", "type": "speaking", "title": "Compare Cultures", "description": "Compare work cultures", "xp": 10, "content": {"prompt": "Compare your country vs Germany.", "tips": ["Use In Deutschland... aber in meinem Land..."]}},
          {"id": "a2w5d6t7", "type": "quickwin", "title": "Quick Win: Culture", "description": "A German work culture word", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'Mini Challenge: Week 5 Review', tasks: [
          {"id": "a2w5d7t1", "type": "review", "title": "Week 5 Review", "description": "Comprehensive", "xp": 25, "content": {"questions": [{"question": "der Anwalt means...", "options": ["teacher", "doctor", "lawyer"], "correct": 2}, {"question": "bei takes which case?", "options": ["nom", "acc", "dat"], "correct": 2}, {"question": "puenktlich means...", "options": ["polite", "punctual", "prepared"], "correct": 1}]}},
          {"id": "a2w5d7t2", "type": "fun", "title": "Week 5 Complete!", "description": "Bonus!", "xp": 5, "content": {"facts": ["Germany has the shortest avg work week (34.2h)!", "German employees get 20+ vacation days."]}}
        ]}
      ]
    },
    {
      id: 6,
      title: 'Verkehr & Reisen — Transportation & Travel',
      icon: '✈️',
      theme: 'Travel vocabulary, complex sentences',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 6: Verkehr & Reisen' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Travel vocabulary, complex sentences' },
      ],
      days: [
        { day: 1, title: 'Transport Vocabulary', tasks: [
          {"id": "a2w6d1t1", "type": "flashcards", "title": "Warm Up", "description": "Basic transport", "xp": 5, "content": {"cards": [{"front": "das Auto", "back": "car"}, {"front": "der Bus", "back": "bus"}, {"front": "der Zug", "back": "train"}]}},
          {"id": "a2w6d1t2", "type": "grammar", "title": "Travel Prepositions", "description": "Two-way prepositions", "xp": 15, "content": {"rule": "Wo? (loc) -> dative. Wohin? (mov) -> accusative.", "examples": [{"german": "Ich fahre in die Stadt. (acc)", "english": "I go into the city."}, {"german": "Ich bin in der Stadt. (dat)", "english": "I am in the city."}], "note": "Accusative = movement, dative = location."}},
          {"id": "a2w6d1t3", "type": "vocabulary", "title": "Transport Modes", "description": "Transport vocab", "xp": 15, "content": {"items": [{"german": "der Flughafen", "english": "airport"}, {"german": "der Bahnhof", "english": "train station"}, {"german": "die U-Bahn", "english": "subway"}, {"german": "die Strassenbahn", "english": "tram"}]}},
          {"id": "a2w6d1t4", "type": "matching", "title": "Transport Match", "description": "Match to English", "xp": 10, "content": {"pairs": [{"german": "der Flughafen", "english": "airport"}, {"german": "der Bahnhof", "english": "train station"}, {"german": "die U-Bahn", "english": "subway"}]}},
          {"id": "a2w6d1t5", "type": "listening", "title": "Asking Directions", "description": "Listen for directions", "xp": 10, "content": {"clip": {"title": "Directions", "source": "Easy German", "text": "Entschuldigung, wo ist der Bahnhof?"}, "questions": [{"question": "What is sought?", "options": ["airport", "train station", "bus stop"], "correct": 1}]}},
          {"id": "a2w6d1t6", "type": "speaking", "title": "Ask Directions", "description": "Practice asking", "xp": 10, "content": {"prompt": "Say: Entschuldigung, wo ist der Bahnhof?", "tips": ["Start with Entschuldigung"]}},
          {"id": "a2w6d1t7", "type": "quickwin", "title": "Quick Win: Travel", "description": "A travel word", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'Buying Tickets', tasks: [
          {"id": "a2w6d2t1", "type": "flashcards", "title": "Warm Up", "description": "Review transport", "xp": 5, "content": {"cards": [{"front": "der Flughafen", "back": "airport"}, {"front": "der Bahnhof", "back": "train station"}]}},
          {"id": "a2w6d2t2", "type": "grammar", "title": "Ticket Phrases", "description": "Buying tickets", "xp": 15, "content": {"rule": "Ich moechte... Einmal... Hin und zurueck.", "examples": [{"german": "Ich moechte eine Fahrkarte nach Berlin.", "english": "A ticket to Berlin."}, {"german": "Einmal Berlin und zurueck, bitte.", "english": "Round trip to Berlin."}], "note": "Hin und zurueck = round trip. Einfach = one way."}},
          {"id": "a2w6d2t3", "type": "vocabulary", "title": "Ticket Words", "description": "Ticket vocab", "xp": 15, "content": {"items": [{"german": "die Fahrkarte", "english": "ticket"}, {"german": "einfach", "english": "one way"}, {"german": "hin und zurueck", "english": "round trip"}, {"german": "der Fahrplan", "english": "timetable"}, {"german": "der Schalter", "english": "ticket counter"}]}},
          {"id": "a2w6d2t4", "type": "roleplay", "title": "Buying a Ticket", "description": "Practice buying ticket", "xp": 10, "content": {"scenario": "At train station.", "steps": ["Greet", "Request ticket to destination", "Type: Einfach or Hin und zurueck", "Pay"]}},
          {"id": "a2w6d2t5", "type": "listening", "title": "Ticket Counter", "description": "Listen to purchase", "xp": 10, "content": {"clip": {"title": "Ticket", "source": "Nicos Weg", "text": "Ich moechte eine Fahrkarte nach Hamburg."}, "questions": [{"question": "Where going?", "options": ["Berlin", "Munich", "Hamburg"], "correct": 2}]}},
          {"id": "a2w6d2t6", "type": "writing", "title": "Travel Plan", "description": "Write a travel plan", "xp": 10, "content": {"prompt": "Write 4-5 sentences about a trip.", "tips": ["Use moechte", "Mention transport mode"]}},
          {"id": "a2w6d2t7", "type": "quickwin", "title": "Quick Win: Ticket Word", "description": "A ticket word", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'At the Hotel', tasks: [
          {"id": "a2w6d3t1", "type": "flashcards", "title": "Warm Up", "description": "Review ticket words", "xp": 5, "content": {"cards": [{"front": "die Fahrkarte", "back": "ticket"}, {"front": "einfach", "back": "one way"}]}},
          {"id": "a2w6d3t2", "type": "grammar", "title": "Hotel Booking", "description": "Making reservations", "xp": 15, "content": {"rule": "Ich moechte ein Zimmer reservieren + fuer Naechte + mit features.", "examples": [{"german": "Ich moechte ein Einzelzimmer.", "english": "A single room."}, {"german": "Haben Sie ein Doppelzimmer frei?", "english": "A double room available?"}], "note": "Einzelzimmer = single, Doppelzimmer = double."}},
          {"id": "a2w6d3t3", "type": "vocabulary", "title": "Hotel Words", "description": "Hotel vocab", "xp": 15, "content": {"items": [{"german": "die Rezeption", "english": "reception"}, {"german": "der Schluessel", "english": "key"}, {"german": "der Zimmerservice", "english": "room service"}, {"german": "das Fruehstuecksbuffet", "english": "breakfast buffet"}]}},
          {"id": "a2w6d3t4", "type": "fillblank", "title": "Hotel Booking", "description": "Complete phrases", "xp": 10, "content": {"sentences": [{"text": "Ich moechte ein ___ reservieren. (single)", "answer": "Einzelzimmer"}, {"text": "Haben Sie ein ___ frei? (double)", "answer": "Doppelzimmer"}]}},
          {"id": "a2w6d3t5", "type": "roleplay", "title": "Hotel Check-in", "description": "Practice check-in", "xp": 10, "content": {"scenario": "Arrive at hotel.", "steps": ["Greet", "I have a reservation", "Name", "Ask for key"]}},
          {"id": "a2w6d3t6", "type": "listening", "title": "Hotel Check-in", "description": "Listen to check-in", "xp": 10, "content": {"clip": {"title": "Check-in", "source": "Easy German", "text": "Ich habe ein Doppelzimmer reserviert."}, "questions": [{"question": "What room type?", "options": ["single", "double", "suite"], "correct": 1}]}},
          {"id": "a2w6d3t7", "type": "quickwin", "title": "Quick Win: Hotel", "description": "A hotel word", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Complex Sentences', tasks: [
          {"id": "a2w6d4t1", "type": "flashcards", "title": "Warm Up", "description": "Review hotel words", "xp": 5, "content": {"cards": [{"front": "die Rezeption", "back": "reception"}, {"front": "der Schluessel", "back": "key"}]}},
          {"id": "a2w6d4t2", "type": "grammar", "title": "Complex Sentences", "description": "weil, wenn, dass push verb to end", "xp": 15, "content": {"rule": "Subordinating conjunctions push verb to end.", "examples": [{"german": "Ich nehme den Bus, weil es billiger ist.", "english": "I take the bus because it is cheaper."}, {"german": "Wenn ich in Berlin bin, besuche ich den Zoo.", "english": "When I am in Berlin, I visit the zoo."}], "note": "Verb goes to END after weil/dass/wenn."}},
          {"id": "a2w6d4t3", "type": "vocabulary", "title": "Public Transport Signs", "description": "Sign vocabulary", "xp": 15, "content": {"items": [{"german": "Abfahrt", "english": "departure"}, {"german": "Ankunft", "english": "arrival"}, {"german": "Gleis", "english": "platform"}, {"german": "Verspaetung", "english": "delay"}, {"german": "Ausgang", "english": "exit"}]}},
          {"id": "a2w6d4t4", "type": "quiz", "title": "Complex Sentences Quiz", "description": "Correct word order", "xp": 10, "content": {"questions": [{"question": "Ich nehme den Bus, weil es ___ billiger.", "options": ["ist", "es billiger ist", "ist billiger"], "correct": 1}]}},
          {"id": "a2w6d4t5", "type": "listening", "title": "Train Announcement", "description": "Listen to announcement", "xp": 10, "content": {"clip": {"title": "DB Announcement", "source": "Deutsche Bahn", "text": "Der ICE nach Muenchen hat Verspaetung."}, "questions": [{"question": "What is delayed?", "options": ["bus", "train", "plane"], "correct": 1}]}},
          {"id": "a2w6d4t6", "type": "speaking", "title": "Explain Delay", "description": "Practice explaining", "xp": 10, "content": {"prompt": "Say: Der Zug hat Verspaetung, weil...", "tips": ["Use weil + verb at end"]}},
          {"id": "a2w6d4t7", "type": "quickwin", "title": "Quick Win: Sign", "description": "A useful sign word", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Travel Experiences', tasks: [
          {"id": "a2w6d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review sign words", "xp": 5, "content": {"cards": [{"front": "Abfahrt", "back": "departure"}, {"front": "Verspaetung", "back": "delay"}]}},
          {"id": "a2w6d5t2", "type": "grammar", "title": "Travel Stories", "description": "Perfekt + complex sentences", "xp": 15, "content": {"rule": "Combine Perfekt + weil/wenn/dass.", "examples": [{"german": "Ich bin nach Berlin gefahren, weil ich die Stadt besuchen wollte.", "english": "I went to Berlin because I wanted to visit."}], "note": "Perfekt + modal: habe + inf + muessen."}},
          {"id": "a2w6d5t3", "type": "vocabulary", "title": "Travel Stories", "description": "Words for travel stories", "xp": 15, "content": {"items": [{"german": "die Reise", "english": "trip"}, {"german": "der Koffer", "english": "suitcase"}, {"german": "die Sehenswuerdigkeit", "english": "sight/landmark"}, {"german": "der Ausflug", "english": "excursion"}]}},
          {"id": "a2w6d5t4", "type": "fillblank", "title": "Travel Story", "description": "Complete story", "xp": 10, "content": {"sentences": [{"text": "Ich ___ nach Berlin ___. (fahren)", "answer": "bin...gefahren"}]}},
          {"id": "a2w6d5t5", "type": "listening", "title": "Travel Story", "description": "Listen to a story", "xp": 10, "content": {"clip": {"title": "Travel", "source": "Easy German", "text": "Letztes Jahr bin ich nach Hamburg gefahren."}, "questions": [{"question": "Where?", "options": ["Berlin", "Hamburg", "Munich"], "correct": 1}]}},
          {"id": "a2w6d5t6", "type": "writing", "title": "Travel Story", "description": "Write about a trip", "xp": 10, "content": {"prompt": "Write 6 sentences about a memorable trip.", "tips": ["Use Perfekt", "Use weil/dass for complex sentences"]}},
          {"id": "a2w6d5t7", "type": "quickwin", "title": "Quick Win: Story Word", "description": "A storytelling word", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'Air Travel', tasks: [
          {"id": "a2w6d6t1", "type": "flashcards", "title": "Warm Up", "description": "Review travel words", "xp": 5, "content": {"cards": [{"front": "die Reise", "back": "trip"}, {"front": "der Koffer", "back": "suitcase"}]}},
          {"id": "a2w6d6t2", "type": "grammar", "title": "Airport Phrases", "description": "Flying vocabulary", "xp": 15, "content": {"rule": "Ich moechte einchecken + fuer Flug + nach destination.", "examples": [{"german": "Ich moechte fuer Flug LH123 einchecken.", "english": "Check in for flight LH123."}, {"german": "Wo ist das Gate?", "english": "Where is the gate?"}], "note": "das Gepaeck is uncountable."}},
          {"id": "a2w6d6t3", "type": "vocabulary", "title": "Airport Words", "description": "Airport vocab", "xp": 15, "content": {"items": [{"german": "der Flug", "english": "flight"}, {"german": "das Gate", "english": "gate"}, {"german": "die Bordkarte", "english": "boarding pass"}, {"german": "das Handgepaeck", "english": "carry-on"}, {"german": "die Sicherheitskontrolle", "english": "security"}]}},
          {"id": "a2w6d6t4", "type": "roleplay", "title": "At the Airport", "description": "Practice airport", "xp": 10, "content": {"scenario": "Checking in for a flight.", "steps": ["Check-in", "Luggage info", "Find gate"]}},
          {"id": "a2w6d6t5", "type": "listening", "title": "Airport Announcement", "description": "Listen to announcement", "xp": 10, "content": {"clip": {"title": "Airport", "source": "Berlin Airport", "text": "Flug LH 123 nach Berlin. Boarding Gate 22."}, "questions": [{"question": "Which gate?", "options": ["12", "20", "22"], "correct": 2}]}},
          {"id": "a2w6d6t6", "type": "speaking", "title": "Make Announcement", "description": "Practice announcing", "xp": 10, "content": {"prompt": "Say: Flug LH 123 nach Berlin. Boarding ab Gate 22.", "tips": ["State flight clearly", "Say gate number"]}},
          {"id": "a2w6d6t7", "type": "quickwin", "title": "Quick Win: Airport", "description": "An airport word", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'Mini Challenge: Week 6 Review', tasks: [
          {"id": "a2w6d7t1", "type": "review", "title": "Week 6 Review", "description": "Comprehensive", "xp": 25, "content": {"questions": [{"question": "der Bahnhof means...", "options": ["bus station", "airport", "train station"], "correct": 2}, {"question": "With weil, verb goes...", "options": ["second", "to end", "to start"], "correct": 1}, {"question": "Verspaetung means...", "options": ["delay", "departure", "arrival"], "correct": 0}]}},
          {"id": "a2w6d7t2", "type": "fun", "title": "Week 6 Complete!", "description": "Bonus!", "xp": 5, "content": {"facts": ["ICE train reaches 330 km/h!", "Berlin U-Bahn has 175 stations."]}}
        ]}
      ]
    },
    {
      id: 7,
      title: 'Wetter & Natur — Weather, Nature & Health',
      icon: '🌤️',
      theme: 'Weather, health, weil clauses, opinions',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 7: Wetter & Natur' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Weather, health, weil clauses, opinions' },
      ],
      days: [
        { day: 1, title: 'Weather Vocabulary', tasks: [
          {"id": "a2w7d1t1", "type": "flashcards", "title": "Warm Up", "description": "Basic weather", "xp": 5, "content": {"cards": [{"front": "die Sonne", "back": "sun"}, {"front": "der Regen", "back": "rain"}, {"front": "der Schnee", "back": "snow"}]}},
          {"id": "a2w7d1t2", "type": "grammar", "title": "Weather Expressions", "description": "Using es for weather", "xp": 15, "content": {"rule": "es + weather verb: es regnet, es schneit.", "examples": [{"german": "Es regnet heute.", "english": "It is raining today."}, {"german": "Es ist sonnig und warm.", "english": "It is sunny and warm."}], "note": "Weather verbs: regnen, schneien, hageln."}},
          {"id": "a2w7d1t3", "type": "vocabulary", "title": "Weather Words", "description": "Weather vocab", "xp": 15, "content": {"items": [{"german": "sonnig", "english": "sunny"}, {"german": "bewoelkt", "english": "cloudy"}, {"german": "regnerisch", "english": "rainy"}, {"german": "windig", "english": "windy"}, {"german": "die Temperatur", "english": "temperature"}]}},
          {"id": "a2w7d1t4", "type": "matching", "title": "Weather Match", "description": "Match to English", "xp": 10, "content": {"pairs": [{"german": "sonnig", "english": "sunny"}, {"german": "bewoelkt", "english": "cloudy"}, {"german": "regnerisch", "english": "rainy"}]}},
          {"id": "a2w7d1t5", "type": "listening", "title": "Weather Forecast", "description": "Listen to forecast", "xp": 10, "content": {"clip": {"title": "Forecast", "source": "German news", "text": "Es wird sonnig und warm. Temperaturen bis 25 Grad."}, "questions": [{"question": "What weather?", "options": ["rainy", "sunny/warm", "cold/snowy"], "correct": 1}]}},
          {"id": "a2w7d1t6", "type": "speaking", "title": "Describe Weather", "description": "Practice weather", "xp": 10, "content": {"prompt": "Say: Heute ist es sonnig.", "tips": ["Use Heute ist es + adj", "Use Es regnet for verbs"]}},
          {"id": "a2w7d1t7", "type": "quickwin", "title": "Quick Win: Weather", "description": "A weather word", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'Seasons & Nature', tasks: [
          {"id": "a2w7d2t1", "type": "flashcards", "title": "Warm Up", "description": "Review weather", "xp": 5, "content": {"cards": [{"front": "sonnig", "back": "sunny"}, {"front": "bewoelkt", "back": "cloudy"}]}},
          {"id": "a2w7d2t2", "type": "grammar", "title": "Seasons", "description": "im + season", "xp": 15, "content": {"rule": "Use im: im Fruehling, im Sommer, im Herbst, im Winter.", "examples": [{"german": "Im Fruehling wird es waermer.", "english": "In spring it gets warmer."}, {"german": "Im Winter schneit es oft.", "english": "In winter it often snows."}], "note": "Fruehling/Sommer/Herbst/Winter."}},
          {"id": "a2w7d2t3", "type": "vocabulary", "title": "Nature", "description": "Nature words", "xp": 15, "content": {"items": [{"german": "der Wald", "english": "forest"}, {"german": "der Berg", "english": "mountain"}, {"german": "der Fluss", "english": "river"}, {"german": "der See", "english": "lake"}, {"german": "der Baum", "english": "tree"}, {"german": "die Blume", "english": "flower"}]}},
          {"id": "a2w7d2t4", "type": "quiz", "title": "Seasons Quiz", "description": "Test seasons", "xp": 10, "content": {"questions": [{"question": "der Fruehling is...", "options": ["spring", "summer", "fall", "winter"], "correct": 0}]}},
          {"id": "a2w7d2t5", "type": "listening", "title": "Nature Description", "description": "Listen to nature", "xp": 10, "content": {"clip": {"title": "Nature", "source": "Easy German", "text": "Im Sommer gehe ich gern in den Wald."}, "questions": [{"question": "Where does speaker go?", "options": ["mountains", "forest", "lake"], "correct": 1}]}},
          {"id": "a2w7d2t6", "type": "writing", "title": "Favorite Season", "description": "Describe favorite season", "xp": 10, "content": {"prompt": "Write 5 sentences about your favorite season.", "tips": ["Use im + season", "Describe weather", "Use weil for reasons"]}},
          {"id": "a2w7d2t7", "type": "quickwin", "title": "Quick Win: Nature", "description": "A nature word", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'Health & Body', tasks: [
          {"id": "a2w7d3t1", "type": "flashcards", "title": "Warm Up", "description": "Review seasons", "xp": 5, "content": {"cards": [{"front": "der Fruehling", "back": "spring"}, {"front": "der Winter", "back": "winter"}]}},
          {"id": "a2w7d3t2", "type": "grammar", "title": "Body + weh tun", "description": "Describing pain", "xp": 15, "content": {"rule": "[body] tut mir weh / tun mir weh.", "examples": [{"german": "Mein Kopf tut mir weh.", "english": "My head hurts."}, {"german": "Die Augen tun mir weh.", "english": "My eyes hurt."}], "note": "weh tun separates: Der Kopf tut mir weh."}},
          {"id": "a2w7d3t3", "type": "vocabulary", "title": "Body Parts", "description": "Body vocabulary", "xp": 15, "content": {"items": [{"german": "der Kopf", "english": "head"}, {"german": "der Arm", "english": "arm"}, {"german": "das Bein", "english": "leg"}, {"german": "der Fuss", "english": "foot"}, {"german": "die Hand", "english": "hand"}, {"german": "der Ruecken", "english": "back"}]}},
          {"id": "a2w7d3t4", "type": "fillblank", "title": "Body Drill", "description": "Body part drill", "xp": 10, "content": {"sentences": [{"text": "Mein ___ tut weh. (head)", "answer": "Kopf"}, {"text": "Der ___ tut weh. (back)", "answer": "Ruecken"}]}},
          {"id": "a2w7d3t5", "type": "roleplay", "title": "At the Doctor", "description": "Practice symptoms", "xp": 10, "content": {"scenario": "At the doctor.", "steps": ["Greet", "Say what hurts", "Duration", "Ask for help"]}},
          {"id": "a2w7d3t6", "type": "listening", "title": "Doctor Visit", "description": "Listen to doctor", "xp": 10, "content": {"clip": {"title": "Doctor", "source": "Easy German", "text": "Mein Kopf tut mir weh und ich habe Fieber."}, "questions": [{"question": "What symptoms?", "options": ["headache only", "headache+fever", "fever only"], "correct": 1}]}},
          {"id": "a2w7d3t7", "type": "quickwin", "title": "Quick Win: Health", "description": "A health word", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Weil Clauses & Opinions', tasks: [
          {"id": "a2w7d4t1", "type": "flashcards", "title": "Warm Up", "description": "Review body", "xp": 5, "content": {"cards": [{"front": "der Kopf", "back": "head"}, {"front": "der Arm", "back": "arm"}]}},
          {"id": "a2w7d4t2", "type": "grammar", "title": "Opinions with weil", "description": "Giving reasons", "xp": 15, "content": {"rule": "Opinion + , + weil + reason (verb at end).", "examples": [{"german": "Ich mag den Sommer, weil die Sonne scheint.", "english": "I like summer because the sun shines."}, {"german": "Ich hasse Regen, weil ich nass werde.", "english": "I hate rain because I get wet."}], "note": "Verb goes to END after weil."}},
          {"id": "a2w7d4t3", "type": "vocabulary", "title": "Opinion Words", "description": "Expressing likes/dislikes", "xp": 15, "content": {"items": [{"german": "Ich mag...", "english": "I like..."}, {"german": "Ich finde...", "english": "I think..."}, {"german": "Ich liebe...", "english": "I love..."}, {"german": "Ich hasse...", "english": "I hate..."}, {"german": "Ich mag lieber...", "english": "I prefer..."}]}},
          {"id": "a2w7d4t4", "type": "quiz", "title": "Weil Clauses Quiz", "description": "Correct word order", "xp": 10, "content": {"questions": [{"question": "Ich mag Sommer, weil die Sonne ___.", "options": ["scheint", "schien", "scheinen"], "correct": 0}]}},
          {"id": "a2w7d4t5", "type": "speaking", "title": "Express Opinion", "description": "Give opinion", "xp": 10, "content": {"prompt": "Say: Ich mag [weather], weil [reason].", "tips": ["Use weil + verb at end"]}},
          {"id": "a2w7d4t6", "type": "writing", "title": "Your Opinion", "description": "Write your opinion", "xp": 10, "content": {"prompt": "Write 5 sentences about weather you like/dislike.", "tips": ["Use Ich mag / Ich mag nicht", "Use weil clauses"]}},
          {"id": "a2w7d4t7", "type": "quickwin", "title": "Quick Win: Opinion", "description": "An opinion word", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Fitness & Exercise', tasks: [
          {"id": "a2w7d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review opinions", "xp": 5, "content": {"cards": [{"front": "Ich mag...", "back": "I like..."}, {"front": "Ich finde...", "back": "I think..."}]}},
          {"id": "a2w7d5t2", "type": "grammar", "title": "Fitness Phrases", "description": "Talking about exercise", "xp": 15, "content": {"rule": "Ich mache + Sport. Ich treibe Sport.", "examples": [{"german": "Ich mache dreimal Sport.", "english": "I exercise thrice weekly."}, {"german": "Man sollte viel Wasser trinken.", "english": "One should drink lots of water."}], "note": "Sport treiben is more formal."}},
          {"id": "a2w7d5t3", "type": "vocabulary", "title": "Exercise Words", "description": "Fitness vocab", "xp": 15, "content": {"items": [{"german": "Joggen", "english": "jogging"}, {"german": "Schwimmen", "english": "swimming"}, {"german": "Radfahren", "english": "cycling"}, {"german": "Krafttraining", "english": "strength training"}]}},
          {"id": "a2w7d5t4", "type": "scramble", "title": "Fitness Scramble", "description": "Unscramble fitness", "xp": 10, "content": {"words": [{"scrambled": "gjogen", "answer": "Joggen", "hint": "running"}, {"scrambled": "hisemwcmn", "answer": "Schwimmen", "hint": "water"}]}},
          {"id": "a2w7d5t5", "type": "listening", "title": "Fitness Routine", "description": "Listen to routine", "xp": 10, "content": {"clip": {"title": "Fitness", "source": "Easy German", "text": "Ich mache dreimal pro Woche Sport."}, "questions": [{"question": "How often?", "options": ["once", "twice", "three times"], "correct": 2}]}},
          {"id": "a2w7d5t6", "type": "speaking", "title": "Describe Fitness", "description": "Talk about exercise", "xp": 10, "content": {"prompt": "Say: Ich mache [freq] Sport.", "tips": ["Use mal pro Woche"]}},
          {"id": "a2w7d5t7", "type": "quickwin", "title": "Quick Win: Fitness", "description": "A fitness word", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'Healthy Lifestyle', tasks: [
          {"id": "a2w7d6t1", "type": "flashcards", "title": "Warm Up", "description": "Review fitness", "xp": 5, "content": {"cards": [{"front": "Joggen", "back": "jogging"}, {"front": "Schwimmen", "back": "swimming"}]}},
          {"id": "a2w7d6t2", "type": "grammar", "title": "Health Advice", "description": "sollte, muss, kann", "xp": 15, "content": {"rule": "sollte for advice, muss for strong advice.", "examples": [{"german": "Du solltest mehr Wasser trinken.", "english": "Drink more water."}, {"german": "Du musst zum Arzt gehen.", "english": "Go to the doctor."}], "note": "sollte is milder than muss."}},
          {"id": "a2w7d6t3", "type": "vocabulary", "title": "Healthy Living", "description": "Health vocab", "xp": 15, "content": {"items": [{"german": "gesund", "english": "healthy"}, {"german": "ungesund", "english": "unhealthy"}, {"german": "frisch", "english": "fresh"}, {"german": "die Bewegung", "english": "exercise"}]}},
          {"id": "a2w7d6t4", "type": "fillblank", "title": "Health Advice", "description": "Give advice", "xp": 10, "content": {"sentences": [{"text": "Du ___ mehr Wasser trinken. (should)", "answer": "solltest"}, {"text": "Du ___ zum Arzt gehen. (must)", "answer": "musst"}]}},
          {"id": "a2w7d6t5", "type": "roleplay", "title": "Health Advice", "description": "Give health advice", "xp": 10, "content": {"scenario": "Friend has headache.", "steps": ["Sympathize", "Give advice with solltest", "Offer help"]}},
          {"id": "a2w7d6t6", "type": "listening", "title": "Health Tips", "description": "Listen to tips", "xp": 10, "content": {"clip": {"title": "Tips", "source": "Easy German", "text": "Du solltest viel Wasser trinken."}, "questions": [{"question": "What advice?", "options": ["exercise", "drink water", "sleep more"], "correct": 1}]}},
          {"id": "a2w7d6t7", "type": "quickwin", "title": "Quick Win: Health", "description": "A healthy word", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'Mini Challenge: Week 7 Review', tasks: [
          {"id": "a2w7d7t1", "type": "review", "title": "Week 7 Review", "description": "Comprehensive", "xp": 25, "content": {"questions": [{"question": "Es regnet means...", "options": ["snowing", "raining", "sunny"], "correct": 1}, {"question": "im Fruehling means...", "options": ["in winter", "in spring", "in summer"], "correct": 1}, {"question": "With weil, verb goes...", "options": ["second", "to end", "to start"], "correct": 1}]}},
          {"id": "a2w7d7t2", "type": "fun", "title": "Week 7 Complete!", "description": "Bonus!", "xp": 5, "content": {"facts": ["Germany has 40+ words for rain!", "25% of Germans are in sports clubs."]}}
        ]}
      ]
    },
    {
      id: 8,
      title: 'Pruefung — A2 Mock Exam',
      icon: '📝',
      theme: 'Full A2 mock exam: Lesen, Hoeren, Schreiben, Sprechen',
      unlocked: false,
      resources: [
        { name: 'Nicos Weg', url: 'https://learngerman.dw.com/en/overview', description: 'Lesson 8: Pruefung' },
        { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', description: 'Full A2 mock exam: Lesen, Hoeren, Schreiben, Sprechen' },
      ],
      days: [
        { day: 1, title: 'Reading (Lesen)', tasks: [
          {"id": "a2w8d1t1", "type": "flashcards", "title": "Warm Up", "description": "Exam prep vocab", "xp": 5, "content": {"cards": [{"front": "die Pruefung", "back": "exam"}, {"front": "die Aufgabe", "back": "task"}, {"front": "die Antwort", "back": "answer"}]}},
          {"id": "a2w8d1t2", "type": "quiz", "title": "Reading Comp 1", "description": "Read and answer", "xp": 15, "content": {"questions": [{"question": "Text: Lisa kommt aus Berlin. Ihr Bruder studiert Medizin. What does her brother study?", "options": ["Engineering", "Medicine", "Law"], "correct": 1}]}},
          {"id": "a2w8d1t3", "type": "vocabulary", "title": "Reading Vocab", "description": "Key reading vocab", "xp": 15, "content": {"items": [{"german": "der Text", "english": "text"}, {"german": "der Satz", "english": "sentence"}, {"german": "die Bedeutung", "english": "meaning"}, {"german": "verstehen", "english": "to understand"}]}},
          {"id": "a2w8d1t4", "type": "matching", "title": "Reading Match", "description": "Q&A match", "xp": 10, "content": {"pairs": [{"german": "Wie heisst du?", "english": "What is your name?"}, {"german": "Wo wohnst du?", "english": "Where do you live?"}]}},
          {"id": "a2w8d1t5", "type": "fillblank", "title": "Reading Comp 2", "description": "Context fill-in", "xp": 10, "content": {"sentences": [{"text": "Lisa ___ aus Berlin. (come)", "answer": "kommt"}]}},
          {"id": "a2w8d1t6", "type": "writing", "title": "Write About You", "description": "40-50 word self-intro", "xp": 10, "content": {"prompt": "Write a short text about yourself.", "tips": ["Keep simple", "Present tense", "Name, location, profession"]}},
          {"id": "a2w8d1t7", "type": "quickwin", "title": "Quick Win: Study Tip", "description": "Reading tip", "xp": 5, "content": {}}
        ]},
        { day: 2, title: 'Listening (Hoeren)', tasks: [
          {"id": "a2w8d2t1", "type": "flashcards", "title": "Warm Up", "description": "Listening prep", "xp": 5, "content": {"cards": [{"front": "hoeren", "back": "to listen"}, {"front": "der Dialog", "back": "dialogue"}]}},
          {"id": "a2w8d2t2", "type": "grammar", "title": "Listening Strategies", "description": "Key info focus", "xp": 15, "content": {"rule": "Focus on question words, numbers, names.", "examples": [{"german": "Wann? Um 14:30 Uhr.", "english": "When? At 2:30pm."}, {"german": "Was kostet das? 5 Euro.", "english": "How much? 5 euros."}], "note": "Numbers are common test questions."}},
          {"id": "a2w8d2t3", "type": "vocabulary", "title": "Listening Vocab", "description": "Test listening words", "xp": 15, "content": {"items": [{"german": "die Durchsage", "english": "announcement"}, {"german": "die Uhrzeit", "english": "time"}, {"german": "der Preis", "english": "price"}, {"german": "die Nummer", "english": "number"}]}},
          {"id": "a2w8d2t4", "type": "quiz", "title": "Listening Quiz", "description": "Comprehension", "xp": 10, "content": {"questions": [{"question": "Der Zug kommt um 14:30. When?", "options": ["14:00", "14:30", "15:00"], "correct": 1}]}},
          {"id": "a2w8d2t5", "type": "listening", "title": "Mock Listening", "description": "Listen and answer", "xp": 10, "content": {"clip": {"title": "Mock", "source": "Exam style", "text": "Ich bin Anna aus Oesterreich. Ich wohne in Berlin und bin Aerztin."}, "questions": [{"question": "Where from?", "options": ["Germany", "Austria", "Switzerland"], "correct": 1}, {"question": "Profession?", "options": ["teacher", "doctor", "engineer"], "correct": 1}]}},
          {"id": "a2w8d2t6", "type": "speaking", "title": "Respond", "description": "Listen and respond", "xp": 10, "content": {"prompt": "Answer: Wie heissen Sie? Woher kommen Sie?", "tips": ["Answer clearly", "Use complete sentences"]}},
          {"id": "a2w8d2t7", "type": "quickwin", "title": "Quick Win: Listening", "description": "A listening tip", "xp": 5, "content": {}}
        ]},
        { day: 3, title: 'Writing (Schreiben)', tasks: [
          {"id": "a2w8d3t1", "type": "flashcards", "title": "Warm Up", "description": "Writing prep", "xp": 5, "content": {"cards": [{"front": "schreiben", "back": "to write"}, {"front": "der Brief", "back": "letter"}]}},
          {"id": "a2w8d3t2", "type": "grammar", "title": "Formal Letter", "description": "Structure for formal writing", "xp": 15, "content": {"rule": "Sehr geehrte/r... -> body -> Mit freundlichen Gruessen.", "examples": [{"german": "Betreff: Kursanmeldung", "english": "Subject: Course reg"}, {"german": "Sehr geehrte Damen und Herren,", "english": "Dear Sir/Madam,"}], "note": "Sehr geehrte for formal, Liebe/r for informal."}},
          {"id": "a2w8d3t3", "type": "vocabulary", "title": "Writing Vocab", "description": "Letter/email words", "xp": 15, "content": {"items": [{"german": "der Betreff", "english": "subject line"}, {"german": "die Anrede", "english": "salutation"}, {"german": "die Bitte", "english": "request"}, {"german": "der Vorschlag", "english": "suggestion"}]}},
          {"id": "a2w8d3t4", "type": "fillblank", "title": "Formal Letter", "description": "Complete the letter", "xp": 10, "content": {"sentences": [{"text": "___ geehrte Damen und Herren,", "answer": "Sehr"}]}},
          {"id": "a2w8d3t5", "type": "roleplay", "title": "Write a Letter", "description": "Practice formal writing", "xp": 10, "content": {"scenario": "Write a letter to register for a course.", "steps": ["Subject line", "Salutation", "State purpose", "Close"]}},
          {"id": "a2w8d3t6", "type": "writing", "title": "Formal Email", "description": "Write a formal email", "xp": 10, "content": {"prompt": "Write an email registering for a German course.", "tips": ["Use Sehr geehrte...", "State your purpose", "End with Gruessen"]}},
          {"id": "a2w8d3t7", "type": "quickwin", "title": "Quick Win: Writing", "description": "A writing tip", "xp": 5, "content": {}}
        ]},
        { day: 4, title: 'Speaking (Sprechen)', tasks: [
          {"id": "a2w8d4t1", "type": "flashcards", "title": "Warm Up", "description": "Speaking prep", "xp": 5, "content": {"cards": [{"front": "sprechen", "back": "to speak"}, {"front": "die Aussprache", "back": "pronunciation"}]}},
          {"id": "a2w8d4t2", "type": "grammar", "title": "Self-Introduction", "description": "How to introduce yourself", "xp": 15, "content": {"rule": "Name + Age + From + Live + Job + Hobby.", "examples": [{"german": "Ich heisse... Ich komme aus...", "english": "I am... I come from..."}], "note": "A2 speaking test asks 3-4 personal questions."}},
          {"id": "a2w8d4t3", "type": "vocabulary", "title": "Speaking Vocab", "description": "Key speaking words", "xp": 15, "content": {"items": [{"german": "die Vorstellung", "english": "introduction"}, {"german": "das Hobby", "english": "hobby"}, {"german": "der Wohnort", "english": "residence"}, {"german": "die Familie", "english": "family"}]}},
          {"id": "a2w8d4t4", "type": "roleplay", "title": "Self Intro", "description": "Practice introduction", "xp": 10, "content": {"scenario": "First day of German class.", "steps": ["Name: Ich heisse...", "Origin: Ich komme aus...", "Live: Ich wohne in...", "Hobby: Mein Hobby ist..."]}},
          {"id": "a2w8d4t5", "type": "speaking", "title": "Picture Description", "description": "Describe a picture", "xp": 10, "content": {"prompt": "Describe: Was sehen Sie auf dem Bild?", "tips": ["Use Es gibt...", "Use im Vordergrund/Hintergrund"]}},
          {"id": "a2w8d4t6", "type": "writing", "title": "Speaking Notes", "description": "Prepare speaking notes", "xp": 10, "content": {"prompt": "Write notes for a 2-minute self-introduction.", "tips": ["Cover: name, age, country, job, hobbies", "Practice out loud"]}},
          {"id": "a2w8d4t7", "type": "quickwin", "title": "Quick Win: Speaking", "description": "A speaking tip", "xp": 5, "content": {}}
        ]},
        { day: 5, title: 'Grammar & Vocab Review', tasks: [
          {"id": "a2w8d5t1", "type": "flashcards", "title": "Warm Up", "description": "Review key grammar", "xp": 5, "content": {"cards": [{"front": "Perfekt", "back": "haben/sein + past part."}, {"front": "Praeteritum", "back": "simple past"}]}},
          {"id": "a2w8d5t2", "type": "grammar", "title": "Final Grammar Review", "description": "All A2 grammar points", "xp": 15, "content": {"rule": "Review: Perfekt, Praeteritum, dative prepositions, comparatives, superlatives, weil clauses.", "examples": [{"german": "Ich bin nach Berlin gefahren.", "english": "I went to Berlin."}, {"german": "Die Pizza ist besser als der Salat.", "english": "Pizza is better than salad."}], "note": "Focus on your weak areas."}},
          {"id": "a2w8d5t3", "type": "vocabulary", "title": "Final Vocab Review", "description": "All A2 vocab themes", "xp": 15, "content": {"items": [{"german": "die Familie", "english": "family"}, {"german": "das Essen", "english": "food"}, {"german": "die Arbeit", "english": "work"}, {"german": "die Reise", "english": "travel"}, {"german": "das Wetter", "english": "weather"}]}},
          {"id": "a2w8d5t4", "type": "quiz", "title": "Grammar Final Quiz", "description": "All grammar points", "xp": 10, "content": {"questions": [{"question": "Perfekt mit sein is for...", "options": ["movement/change", "all verbs", "modal verbs", "regular verbs"], "correct": 0}, {"question": "Which preposition takes dative?", "options": ["fuer", "mit", "durch", "ohne"], "correct": 1}]}},
          {"id": "a2w8d5t5", "type": "fillblank", "title": "Quick Review", "description": "Fill-in review", "xp": 10, "content": {"sentences": [{"text": "Ich ___ nach Berlin ___. (fahren, Perfekt)", "answer": "bin...gefahren"}, {"text": "Die Pizza ist ___ als der Salat. (good)", "answer": "besser"}]}},
          {"id": "a2w8d5t6", "type": "speaking", "title": "Final Speaking", "description": "Practice all speaking", "xp": 10, "content": {"prompt": "Introduce yourself, describe your weekend, give an opinion.", "tips": ["Mix Perfekt + Praeteritum", "Use weil for reasons"]}},
          {"id": "a2w8d5t7", "type": "quickwin", "title": "Quick Win: Final Tip", "description": "A final study tip", "xp": 5, "content": {}}
        ]},
        { day: 6, title: 'Full Mock Exam', tasks: [
          {"id": "a2w8d6t1", "type": "quiz", "title": "Mock: Reading", "description": "Full reading section", "xp": 20, "content": {"questions": [{"question": "Text: Ich heisse Paul. Ich wohne in Berlin und arbeite als Programmierer. Mein Hobby ist Fussball. What does Paul do?", "options": ["doctor", "programmer", "teacher", "engineer"], "correct": 1}, {"question": "Where does Paul live?", "options": ["Munich", "Berlin", "Hamburg", "Cologne"], "correct": 1}, {"question": "What is his hobby?", "options": ["tennis", "football", "swimming", "running"], "correct": 1}]}},
          {"id": "a2w8d6t2", "type": "quiz", "title": "Mock: Grammar", "description": "Full grammar section", "xp": 15, "content": {"questions": [{"question": "Ich ___ gestern Tennis ___. (spielen)", "options": ["habe...gespielt", "bin...gespielt", "habe...gespielt", "bin...gespielt"], "correct": 0}, {"question": "Comparative of gut?", "options": ["guter", "besser", "am besten", "gutest"], "correct": 1}, {"question": "___ Sie mir helfen? (polite)", "options": ["Koennen", "Koennten", "Kann", "Kannst"], "correct": 1}]}},
          {"id": "a2w8d6t3", "type": "speaking", "title": "Mock: Speaking", "description": "Full speaking section", "xp": 10, "content": {"prompt": "1) Introduce yourself. 2) Describe your weekend. 3) Give an opinion about a topic.", "tips": ["Speak for 2 minutes total", "Use full sentences"]}},
          {"id": "a2w8d6t4", "type": "quickwin", "title": "Mock Complete!", "description": "Well done!", "xp": 5, "content": {}}
        ]},
        { day: 7, title: 'A2 Complete!', tasks: [
          {"id": "a2w8d7t1", "type": "review", "title": "A2 Final Review", "description": "All A2 knowledge", "xp": 25, "content": {"questions": [{"question": "Which tense is most common in spoken German?", "options": ["Praeteritum", "Perfekt", "Plusquamperfekt"], "correct": 1}, {"question": "bei + dative: Ich arbeite bei ___ Firma.", "options": ["ein", "eine", "einer", "eines"], "correct": 2}, {"question": "Comparative: gross -> ___", "options": ["groesser", "groesser", "am groessten", "grossest"], "correct": 1}, {"question": "Superlative: gut -> ___", "options": ["guter", "besser", "am besten", "gutest"], "correct": 2}, {"question": "weil pushes verb to...", "options": ["second position", "the end", "the start", "no change"], "correct": 1}]}},
          {"id": "a2w8d7t2", "type": "fun", "title": "A2 Complete!", "description": "Congratulations!", "xp": 10, "content": {"facts": ["You have completed the A2 course!", "You can now understand familiar everyday expressions.", "You are ready to start B1 level!", "Continue practicing daily to maintain your skills."]}}
        ]}
      ]
    }
  ]
};

export default a2Data;
