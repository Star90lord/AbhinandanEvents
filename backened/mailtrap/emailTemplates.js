const baseLayout = (title, body) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; background:#f8fafc; color:#0f172a; margin:0; padding:0; }
      .card { max-width:600px; margin:20px auto; background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:24px; }
      .btn { display:inline-block; background:#f97316; color:#fff; padding:12px 18px; border-radius:8px; text-decoration:none; font-weight:600; }
      p { line-height:1.6; }
    </style>
  </head>
  <body>
    <div class="card">
      ${body}
    </div>
  </body>
</html>
`;

const verificationTemplate = (verifyUrl, name = "there") =>
  baseLayout(
    "Verify your email",
    `
      <h2>Hi ${name},</h2>
      <p>Thanks for creating an account with Abhinandan Events. Please confirm your email to get started.</p>
      <p><a class="btn" href="${verifyUrl}">Verify email</a></p>
      <p>If the button doesn't work, paste this link into your browser:</p>
      <p>${verifyUrl}</p>
    `
  );

const resetPasswordTemplate = (resetUrl, name = "there") =>
  baseLayout(
    "Reset your password",
    `
      <h2>Hi ${name},</h2>
      <p>We received a request to reset your password. Click the button below to set a new one.</p>
      <p><a class="btn" href="${resetUrl}">Reset password</a></p>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>${resetUrl}</p>
    `
  );

const resetSuccessTemplate = (name = "there") =>
  baseLayout(
    "Password updated",
    `
      <h2>Hi ${name},</h2>
      <p>Your password was changed successfully. If you did not do this, please reset your password immediately.</p>
    `
  );

export { verificationTemplate, resetPasswordTemplate, resetSuccessTemplate };