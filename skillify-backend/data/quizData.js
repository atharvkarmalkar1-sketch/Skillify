const questions = [
  {
    question: 'Which number should come next in the series: 2, 4, 8, 16, ?',
    options: ['18', '24', '32', '34'],
    answer: '32',
    mapping: ['Commerce', 'Arts', 'Science', 'Engineering']
  },
  {
    question: 'If ALL PENCILS are PENS and SOME PENS are ERASERS, which of the following is true?',
    options: [
      'All pencils are erasers',
      'Some pencils are erasers',
      'All erasers are pencils',
      'None of the above'
    ],
    answer: 'None of the above',
    mapping: ['Arts', 'Commerce', 'Engineering', 'Science']
  },
  {
    question: 'What is the next letter in the sequence: A, C, F, J, O, ?',
    options: ['Q', 'U', 'V', 'W'],
    answer: 'U',
    mapping: ['Arts', 'Science', 'Engineering', 'Commerce']
  },
  {
    question: 'If it takes 5 machines 5 minutes to make 5 gadgets, how long would it take 100 machines to make 100 gadgets?',
    options: ['5 minutes', '100 minutes', '20 minutes', '1 minute'],
    answer: '5 minutes',
    mapping: ['Engineering', 'Arts', 'Commerce', 'Science']
  },
  {
    question: 'Which shape does not belong in the following group: Triangle, Square, Rectangle, Circle?',
    options: ['Triangle', 'Square', 'Rectangle', 'Circle'],
    answer: 'Circle',
    mapping: ['Engineering', 'Commerce', 'Science', 'Arts']
  },
  // New questions
  {
    question: 'Which activity do you enjoy the most?',
    options: ['Designing posters or videos', 'Solving math/logic puzzles', 'Analyzing markets and money', 'Building or fixing gadgets'],
    answer: null,
    mapping: ['Arts', 'Science', 'Commerce', 'Engineering']
  },
  {
    question: 'Pick a preferred subject area:',
    options: ['Physics & Experimentation', 'Accounting & Business', 'Literature & Philosophy', 'Coding & Algorithms'],
    answer: null,
    mapping: ['Science', 'Commerce', 'Arts', 'Engineering']
  },
  {
    question: 'You are given a group project. Which role do you naturally take?',
    options: ['Coordinator who manages resources and budget', 'Researcher who verifies facts and data', 'Creator who crafts presentations and visuals', 'Technician who sets up tools and tech'],
    answer: null,
    mapping: ['Commerce', 'Science', 'Arts', 'Engineering']
  },
  {
    question: 'Which real-world problem would you love to solve?',
    options: ['Efficient transportation systems', 'Sustainable business for small shops', 'Promoting culture through media', 'Discovering a new scientific insight'],
    answer: null,
    mapping: ['Engineering', 'Commerce', 'Arts', 'Science']
  },
  {
    question: 'How do you prefer learning?',
    options: ['Hands-on labs/workshops', 'Case studies with numbers', 'Open-ended discussions/essays', 'Building apps or prototypes'],
    answer: null,
    mapping: ['Science', 'Commerce', 'Arts', 'Engineering']
  }
];

function recommendResult(answers) {
  const streams = ['Science', 'Commerce', 'Arts', 'Engineering'];
  const scores = { Science: 0, Commerce: 0, Arts: 0, Engineering: 0 };

  answers.forEach((answer, idx) => {
    const q = questions[idx];
    if (!q) return;
    const optionIdx = q.options.indexOf(answer);
    if (optionIdx !== -1) {
      const stream = q.mapping[optionIdx];
      if (stream) scores[stream]++;
    }
  });

  const ranking = streams
    .map(name => ({ stream: name, score: scores[name] }))
    .sort((a, b) => b.score - a.score);

  const recommended = ranking[0]?.stream || 'Science';

  return { recommended, scores, ranking };
}

// Backward compatible helper
function recommendStream(answers) {
  return recommendResult(answers).recommended;
}

module.exports = { questions, recommendStream, recommendResult }; 