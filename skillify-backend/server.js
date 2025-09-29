const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const { questions, recommendStream } = require('./data/quizData');
const courses = require('./data/coursesData');
const institutes = require('./data/institutesData');
const scholarships = require('./data/scholarshipsData');
const alerts = require('./data/alertsData');
const qa = require('./data/qaData');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// No database required - using in-memory data stores

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

function sendResetEmail(to, token) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@example.com';
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    // Fallback for dev/testing
    return Promise.resolve({ dev: true });
  }
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465, // true for 465, false for other ports
    auth: { user: smtpUser, pass: smtpPass }
  });
  const resetUrl = process.env.RESET_URL_BASE || 'http://localhost:3000/reset-password';
  const mailOptions = {
    from: fromEmail,
    to,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Use the following link to reset your password: ${resetUrl}?token=${token}\n\nIf you did not request this, please ignore this email.`
  };
  return transporter.sendMail(mailOptions);
}

// Placeholder routes
app.get('/api/courses', async (req, res, next) => {
  try {
    const allCourses = await courses.getAllCourses();
    res.json(allCourses);
  } catch (err) {
    next(err);
  }
});

app.post('/api/courses', async (req, res, next) => {
  try {
    const course = req.body;
    if (!course || typeof course !== 'object' || !course.id || !course.name || !course.description) {
      return res.status(400).json({ error: 'Invalid course data' });
    }
    const newCourse = await courses.addCourse(course);
    res.status(201).json(newCourse);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Course with this id already exists' });
    } else {
      next(err);
    }
  }
});

app.put('/api/courses/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    const updatedCourse = await courses.updateCourse(id, update);
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/courses/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courses.deleteCourse(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
});
app.get('/api/institutes', async (req, res, next) => {
  try {
    const allInstitutes = await institutes.getAllInstitutes();
    res.json(allInstitutes);
  } catch (err) {
    next(err);
  }
});

app.post('/api/institutes', async (req, res, next) => {
  try {
    const institute = req.body;
    if (!institute || typeof institute !== 'object' || !institute.id || !institute.name || !institute.type || !institute.address) {
      return res.status(400).json({ error: 'Invalid institute data' });
    }
    const newInstitute = await institutes.addInstitute(institute);
    res.status(201).json(newInstitute);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Institute with this id already exists' });
    } else {
      next(err);
    }
  }
});

app.put('/api/institutes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    const updatedInstitute = await institutes.updateInstitute(Number(id), update);
    if (!updatedInstitute) {
      return res.status(404).json({ error: 'Institute not found' });
    }
    res.json(updatedInstitute);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/institutes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInstitute = await institutes.deleteInstitute(Number(id));
    if (!deletedInstitute) {
      return res.status(404).json({ error: 'Institute not found' });
    }
    res.json({ message: 'Institute deleted' });
  } catch (err) {
    next(err);
  }
});

app.get('/api/scholarships', async (req, res, next) => {
  try {
    const allScholarships = await scholarships.getAllScholarships();
    res.json(allScholarships);
  } catch (err) {
    next(err);
  }
});

app.post('/api/scholarships', async (req, res, next) => {
  try {
    const scholarship = req.body;
    if (!scholarship || typeof scholarship !== 'object' || !scholarship.id || !scholarship.name || !scholarship.amount || !scholarship.deadline) {
      return res.status(400).json({ error: 'Invalid scholarship data' });
    }
    const newScholarship = await scholarships.addScholarship(scholarship);
    res.status(201).json(newScholarship);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Scholarship with this id already exists' });
    } else {
      next(err);
    }
  }
});

app.put('/api/scholarships/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    const updatedScholarship = await scholarships.updateScholarship(Number(id), update);
    if (!updatedScholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.json(updatedScholarship);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/scholarships/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedScholarship = await scholarships.deleteScholarship(Number(id));
    if (!deletedScholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    next(err);
  }
});
app.get('/api/alerts', async (req, res, next) => {
  try {
    const allAlerts = await alerts.getAllAlerts();
    res.json(allAlerts);
  } catch (err) {
    next(err);
  }
});

app.post('/api/alerts', async (req, res, next) => {
  try {
    const alert = req.body;
    if (!alert || typeof alert !== 'object' || !alert.id || !alert.message || !alert.priority || !alert.date) {
      return res.status(400).json({ error: 'Invalid alert data' });
    }
    const newAlert = await alerts.addAlert(alert);
    res.status(201).json(newAlert);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Alert with this id already exists' });
    } else {
      next(err);
    }
  }
});

app.put('/api/alerts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (!update || typeof update !== 'object') {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    const updatedAlert = await alerts.updateAlert(Number(id), update);
    if (!updatedAlert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json(updatedAlert);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/alerts/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAlert = await alerts.deleteAlert(Number(id));
    if (!deletedAlert) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    res.json({ message: 'Alert deleted' });
  } catch (err) {
    next(err);
  }
});
app.get('/api/qa', async (req, res, next) => {
  try {
    const posts = await qa.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});
app.post('/api/qa', async (req, res, next) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid question' });
    }
    const newPost = await qa.addPost(question);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

app.put('/api/qa/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if (!update || (typeof update !== 'object')) {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    const updatedPost = await qa.updatePost(id, update);
    if (!updatedPost) {
      return res.status(404).json({ error: 'Q&A post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/qa/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await qa.deletePost(id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Q&A post not found' });
    }
    res.json({ message: 'Q&A post deleted' });
  } catch (err) {
    next(err);
  }
});

app.get('/api/quiz', (req, res) => {
  res.json(questions);
});

app.post('/api/quiz/submit', (req, res, next) => {
  try {
    const { answers } = req.body; // expects array of values
    if (!Array.isArray(answers) || answers.length !== questions.length) {
      return res.status(400).json({ error: 'Invalid answers' });
    }
    // Use detailed recommender if available
    const { recommendResult } = require('./data/quizData');
    const result = recommendResult ? recommendResult(answers) : { recommended: recommendStream(answers) };
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 