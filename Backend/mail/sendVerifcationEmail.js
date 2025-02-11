
const transporter=require("./mailcode");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = require("./emailDesign");


const sender = {
  email: "MEDICAL", 
  name: "=Priyanshu",
};

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email; 

  const mailOptions = {
    from: sender.email, // Sender's email address
    to: recipient, // Recipient's email address
    subject: "Verify your email", // Email subject
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // Email body (with replaced verification code)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

const sendForgotPasswordEmail=async(email,resetURL)=>{
  const recipient=email;

  
    const mailOptions={
      from:sender.email,
      to:recipient,
      subject:"Reset Your Password",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
    };
  
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send verification email: ${error.message}`);
    }

}

const sendResetSuccessEmail=async(email,token)=>{
  const recipient=email

  const mailOptions = {
    from: sender.email, // Sender's email address
    to: recipient, // Recipient's email address
    subject: "Verify your email", // Email subject
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{verificationCode}", verificationToken), // Email body (with replaced verification code)
  };

  try {
    const info=await transporter.sendMail(mailOptions);
    console.log("Email Sent:",info.response);

    
  } catch (error) {
    console.error("Reset Password Error",error);
    throw new Error(`Failed to Reset Password:${error.message}`);
    
    
  }

}


module.exports = { sendVerificationEmail,sendForgotPasswordEmail };
