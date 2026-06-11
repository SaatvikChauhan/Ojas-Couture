const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM, // verified sender
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error("Email error:", err.message);
  }
};

module.exports = sendEmail;