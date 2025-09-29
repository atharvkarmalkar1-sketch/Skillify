const nodemailer = require('nodemailer');

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

module.exports = { sendResetEmail }; 