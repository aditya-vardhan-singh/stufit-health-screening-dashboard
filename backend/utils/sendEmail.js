import nodemailer from "nodemailer";

// 📬 Styled OTP email with Stufit logo
const sendEmail = async (to, subject, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Stufit Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc5UPrGMD_e2PCVvrU6f18deKwCn2XCtZVKQ&s" alt="Stufit Logo" style="max-height: 60px;" />
        </div>
        <h2 style="color: #2c3e50;">OTP Verification</h2>
        <p>Hello Admin,</p>
        <p>Use the following OTP to complete your login:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; letter-spacing: 4px; background: #f2f2f2; padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p>This OTP will expire in 5 minutes. If you didn’t request this, you can safely ignore this email.</p>
        <br/>
        <p style="font-size: 14px; color: #888;">– Team Stufit</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
