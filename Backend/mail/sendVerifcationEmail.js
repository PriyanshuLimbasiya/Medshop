
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailDesign");
const transporter = require("./mailcode");


const sender = {
  email: "MEDICAL",
  name: "=Priyanshu",
};

const sendVerificationEmail = async (email, verificationToken) => {
  if (!VERIFICATION_EMAIL_TEMPLATE) {
    console.error("Verification email template is undefined.");
    throw new Error("Verification email template is not defined.");
  }

  const mailOptions = {
    from: "your-email@example.com", // Replace with actual sender email
    to: email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

const sendForgotPasswordEmail = async (email, resetURL) => {
  const recipient = email;


  const mailOptions = {
    from: sender.email,
    to: recipient,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

}

const sendResetSuccessEmail = async (email) => {
  const recipient = email

  const mailOptions = {
    from: sender.email, // Sender's email address
    to: recipient, // Recipient's email address
    subject: "Success Password changed",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.response);
    

  } catch (error) {
    console.error("Reset Password Error", error);
    throw new Error(`Failed to Reset Password:${error.message}`);


  }

}


module.exports = { sendVerificationEmail, sendForgotPasswordEmail, sendResetSuccessEmail };
