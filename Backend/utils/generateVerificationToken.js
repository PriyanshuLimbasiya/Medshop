const generateVerificationToken = () => {    
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};

module.exports = { generateVerificationToken }; // ✅ Correct CommonJS export
