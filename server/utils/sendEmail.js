const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };

  try {
    const res = await sgMail.send(msg);
    console.log("✅ Email sent:", res[0].statusCode);
  } catch (err) {
    console.error("❌ Email error FULL:", err.response?.body || err.message);
  }
};

module.exports = sendEmail;