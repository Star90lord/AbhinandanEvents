import { client, sender } from "./mailtrap.config.js";
import {
  verificationTemplate,
  resetPasswordTemplate,
  resetSuccessTemplate,
} from "./emailTemplates.js";

const sendEmail = async (to, subject, html) => {
  if (!process.env.MAILTRAP_TOKEN) {
    console.warn("MAILTRAP_TOKEN not set; skipping email send.");
    return;
  }

  try {
    await client.send({
      from: sender,
      to: [{ email: to }],
      subject,
      html,
      category: "transactional",
    });
    console.log(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
  }
};

export const sendVerificationEmail = async (email, name, token) => {
  const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, ""); // remove trailing slash
  const verifyUrl = `${clientUrl}/verify/${token}`;
  const html = verificationTemplate(verifyUrl, name);
  await sendEmail(email, "Verify your Abhinandan Events account", html);
};

export const sendPasswordResetEmail = async (email, name, token) => {
  const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");
  const resetUrl = `${clientUrl}/reset-password/${token}`;
  const html = resetPasswordTemplate(resetUrl, name);
  await sendEmail(email, "Reset your Abhinandan Events password", html);
};

export const sendPasswordResetSuccessEmail = async (email, name) => {
  const html = resetSuccessTemplate(name);
  await sendEmail(email, "Your Abhinandan Events password was updated", html);
};