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
    ...makeWeeks3to8(),
  ]
};

export default a2Data;
