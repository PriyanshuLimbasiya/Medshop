const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    /* Reset styles for email clients */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      margin: 0;
      padding: 0;
      background-color: #f7fafc;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Container with responsive padding */
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: linear-gradient(145deg, #ffffff 0%, #f8faff 100%);
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    /* Responsive logo */
    .logo {
      text-align: center;
      padding: 15px 0;
    }

    .logo-icon {
      font-size: clamp(36px, 5vw, 48px);
      color: #4299e1;
    }

    /* Responsive header */
    .header {
      background: linear-gradient(135deg, #4299e1 0%, #667eea 100%);
      padding: clamp(20px, 4vw, 30px);
      border-radius: 12px;
      color: white;
      text-align: center;
      position: relative;
      overflow: hidden;
      margin: 0 10px;
    }

    .header h1 {
      font-size: clamp(24px, 5vw, 32px);
      font-weight: 800;
      margin: 0;
      padding: 0;
      line-height: 1.2;
    }

    /* Content area with responsive spacing */
    .content {
      margin: 20px 10px;
      padding: clamp(15px, 3vw, 25px);
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }

    .content p {
      margin: 15px 0;
      font-size: clamp(14px, 3.5vw, 16px);
      line-height: 1.6;
    }

    /* Verification code container */
    .code-container {
      margin: 25px 0;
      text-align: center;
    }

    .code {
      font-size: clamp(28px, 6vw, 42px);
      font-weight: 700;
      color: #4299e1;
      letter-spacing: clamp(4px, 1vw, 8px);
      padding: clamp(15px, 3vw, 25px);
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f6fe 100%);
      border: 2px dashed #93c5fd;
      border-radius: 12px;
      display: inline-block;
      word-break: break-all;
      max-width: 100%;
    }

    /* Timer with responsive font size */
    .timer {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #e53e3e;
      font-weight: 600;
      margin: 15px 0;
      font-size: clamp(12px, 3vw, 14px);
      width: 100%;
    }

    /* Responsive button */
    .button-container {
      text-align: center;
      margin: 25px 0;
    }

    .button {
      display: inline-block;
      padding: clamp(12px, 3vw, 15px) clamp(25px, 5vw, 35px);
      background: linear-gradient(135deg, #4299e1 0%, #667eea 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: clamp(14px, 3.5vw, 16px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(66, 153, 225, 0.2);
      width: 90%;
      max-width: 300px;
      text-align: center;
    }

    /* Security badge responsive styling */
    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: #f7fafc;
      border-radius: 6px;
      margin: 20px auto;
      font-size: clamp(12px, 3vw, 14px);
      color: #718096;
      width: fit-content;
    }

    /* Footer responsive styling */
    .footer {
      margin-top: 30px;
      color: #718096;
      font-size: clamp(12px, 3vw, 14px);
      text-align: center;
      padding: 20px 10px;
      border-top: 1px solid #e2e8f0;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: clamp(10px, 2vw, 20px);
      margin: 15px 0;
    }

    .footer a {
      color: #4299e1;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
      font-size: clamp(12px, 3vw, 14px);
    }

    /* Mobile-specific optimizations */
    @media screen and (max-width: 480px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .header {
        margin: 0 5px;
      }

      .content {
        margin: 15px 5px;
        padding: 15px;
      }

      .footer-links {
        flex-direction: column;
        gap: 15px;
      }

      .code {
        padding: 15px;
        letter-spacing: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <i class="fas fa-heartbeat logo-icon"></i>
    </div>
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello 👋</p>
      <p>Welcome to our medical service! We're excited to have you on board. To ensure the security of your account, please verify your email address using the code below:</p>
      <div class="code-container">
        <div class="code">{verificationCode}</div>
        <div class="timer">
          <i class="far fa-clock"></i>
          <span>Expires in 15 minutes</span>
        </div>
      </div>
      <p>Simply enter this code in the verification window to complete your registration.</p>
      <p>If you didn't create an account with us, please ignore this email or contact our support team immediately.</p>
      <div class="button-container">
        <a href="#" class="button">Verify Now</a>
      </div>
      <div class="security-badge">
        <i class="fas fa-shield-alt"></i>
        <span>Secured by SSL encryption</span>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from our secure notification system.</p>
      <div class="footer-links">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact Support</a>
      </div>
      <p style="margin-top: 15px;">© 2025 Medical Service. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      margin: 0;
      padding: 0;
      background-color: #f7fafc;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: linear-gradient(145deg, #ffffff 0%, #f8faff 100%);
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    .logo {
      text-align: center;
      padding: 15px 0;
    }

    .logo-icon {
      font-size: clamp(36px, 5vw, 48px);
      color: #48bb78;
    }

    .header {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      padding: clamp(20px, 4vw, 30px);
      border-radius: 12px;
      color: white;
      text-align: center;
      position: relative;
      overflow: hidden;
      margin: 0 10px;
    }

    .header::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
      background-size: 20px 20px;
      opacity: 0.1;
    }

    .header h1 {
      font-size: clamp(24px, 5vw, 32px);
      font-weight: 800;
      margin: 0;
      padding: 0;
      line-height: 1.2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .content {
      margin: 20px 10px;
      padding: clamp(15px, 3vw, 25px);
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }

    .content p {
      margin: 15px 0;
      font-size: clamp(14px, 3.5vw, 16px);
      line-height: 1.6;
      color: #4a5568;
    }

    .success-icon {
      text-align: center;
      margin: 30px 0;
      animation: scaleIn 0.5s ease-out;
    }

    @keyframes scaleIn {
      0% { transform: scale(0.8); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    .success-circle {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      width: clamp(80px, 15vw, 100px);
      height: clamp(80px, 15vw, 100px);
      line-height: clamp(80px, 15vw, 100px);
      border-radius: 50%;
      display: inline-block;
      font-size: clamp(36px, 7vw, 48px);
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.2);
      position: relative;
    }

    .success-circle::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: 50%;
      border: 3px solid #48bb78;
      opacity: 0.5;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.25; }
      100% { transform: scale(1); opacity: 0.5; }
    }

    .security-tips {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-radius: 10px;
      padding: clamp(15px, 3vw, 25px);
      margin: 20px 0;
      border-left: 4px solid #48bb78;
    }

    .security-tips h2 {
      color: #166534;
      font-size: clamp(16px, 4vw, 18px);
      margin-bottom: 15px;
    }

    .security-tips ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .security-tips li {
      margin: 10px 0;
      padding-left: 25px;
      position: relative;
      font-size: clamp(14px, 3.5vw, 16px);
      color: #166534;
    }

    .security-tips li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #48bb78;
      font-weight: bold;
    }

    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: #f7fafc;
      border-radius: 6px;
      margin: 20px auto;
      font-size: clamp(12px, 3vw, 14px);
      color: #718096;
      width: fit-content;
    }

    .footer {
      margin-top: 30px;
      color: #718096;
      font-size: clamp(12px, 3vw, 14px);
      text-align: center;
      padding: 20px 10px;
      border-top: 1px solid #e2e8f0;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: clamp(10px, 2vw, 20px);
      margin: 15px 0;
    }

    .footer a {
      color: #48bb78;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
      font-size: clamp(12px, 3vw, 14px);
      position: relative;
    }

    .footer a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #48bb78, #38a169);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .footer a:hover::after {
      transform: scaleX(1);
    }

    @media screen and (max-width: 480px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .header {
        margin: 0 5px;
      }

      .content {
        margin: 15px 5px;
        padding: 15px;
      }

      .footer-links {
        flex-direction: column;
        gap: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <i class="fas fa-shield-check logo-icon"></i>
    </div>
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hello 👋</p>
      <p>Great news! Your password has been successfully reset for your medical service account.</p>
      
      <div class="success-icon">
        <div class="success-circle">✓</div>
      </div>

      <div class="security-tips">
        <h2>🔒 Security Recommendations</h2>
        <ul>
          <li>Use a strong, unique password with a mix of letters, numbers, and symbols</li>
          <li>Enable two-factor authentication for an extra layer of security</li>
          <li>Never use the same password across multiple accounts</li>
          <li>Regularly update your password every 3-6 months</li>
        </ul>
      </div>

      <p><strong>Important:</strong> If you did not initiate this password reset, please contact our support team immediately as your account may have been compromised.</p>

      <div class="security-badge">
        <i class="fas fa-shield-alt"></i>
        <span>Your account is now secure</span>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from our secure notification system.</p>
      <div class="footer-links">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact Support</a>
      </div>
      <p style="margin-top: 15px;">© 2025 Medical Service. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #2d3748;
      margin: 0;
      padding: 0;
      background-color: #f7fafc;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: linear-gradient(145deg, #ffffff 0%, #f8faff 100%);
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    }

    .logo {
      text-align: center;
      padding: 15px 0;
    }

    .logo-icon {
      font-size: clamp(36px, 5vw, 48px);
      color: #48bb78;
    }

    .header {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      padding: clamp(20px, 4vw, 30px);
      border-radius: 12px;
      color: white;
      text-align: center;
      position: relative;
      overflow: hidden;
      margin: 0 10px;
    }

    .header::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent);
      background-size: 20px 20px;
      opacity: 0.1;
    }

    .header h1 {
      font-size: clamp(24px, 5vw, 32px);
      font-weight: 800;
      margin: 0;
      padding: 0;
      line-height: 1.2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .content {
      margin: 20px 10px;
      padding: clamp(15px, 3vw, 25px);
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    }

    .content p {
      margin: 15px 0;
      font-size: clamp(14px, 3.5vw, 16px);
      line-height: 1.6;
      color: #4a5568;
    }

    .button-container {
      text-align: center;
      margin: 25px 0;
    }

    .button {
      display: inline-block;
      padding: clamp(12px, 3vw, 15px) clamp(25px, 5vw, 35px);
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: clamp(14px, 3.5vw, 16px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.2);
      width: 90%;
      max-width: 300px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .button::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
      transform: rotate(45deg);
      animation: shimmer 3s infinite;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }

    .timer {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #e53e3e;
      font-weight: 600;
      margin: 15px 0;
      font-size: clamp(12px, 3vw, 14px);
      width: 100%;
    }

    .security-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: #f7fafc;
      border-radius: 6px;
      margin: 20px auto;
      font-size: clamp(12px, 3vw, 14px);
      color: #718096;
      width: fit-content;
    }

    .footer {
      margin-top: 30px;
      color: #718096;
      font-size: clamp(12px, 3vw, 14px);
      text-align: center;
      padding: 20px 10px;
      border-top: 1px solid #e2e8f0;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: clamp(10px, 2vw, 20px);
      margin: 15px 0;
    }

    .footer a {
      color: #48bb78;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
      font-size: clamp(12px, 3vw, 14px);
      position: relative;
    }

    .footer a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #48bb78, #38a169);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    .footer a:hover::after {
      transform: scaleX(1);
    }

    @media screen and (max-width: 480px) {
      .container {
        margin: 10px;
        padding: 15px;
      }

      .header {
        margin: 0 5px;
      }

      .content {
        margin: 15px 5px;
        padding: 15px;
      }

      .footer-links {
        flex-direction: column;
        gap: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <i class="fas fa-lock logo-icon"></i>
    </div>
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello 👋</p>
      <p>We received a request to reset your password for your medical service account. Don't worry, we're here to help you regain access.</p>
      <p>Click the button below to securely reset your password:</p>
      <div class="button-container">
        <a href="{resetURL}" class="button">Reset Password</a>
      </div>
      <div class="timer">
        <i class="far fa-clock"></i>
        <span>Link expires in 1 hour</span>
      </div>
      <p><strong>Important:</strong> If you didn't request a password reset, please ignore this email or contact our support team immediately. Your account security is our top priority.</p>
      <div class="security-badge">
        <i class="fas fa-shield-alt"></i>
        <span>Secured by SSL encryption</span>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from our secure notification system.</p>
      <div class="footer-links">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact Support</a>
      </div>
      <p style="margin-top: 15px;">© 2025 Medical Service. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE }