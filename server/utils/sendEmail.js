const sgMail = require('@sendgrid/mail');

// Protect against invalid or missing SendGrid key at startup (avoid crashing the server)
if (process.env.SENDGRID_API_KEY) {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  } catch (e) {
    console.warn('SendGrid API key not applied (invalid or misconfigured):', e.message);
  }
} else {
  console.log('SendGrid not configured — skipping email setup');
}

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