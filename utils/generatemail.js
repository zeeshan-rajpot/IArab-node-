const { Resend } = require('resend');

const resend = new Resend('re_BgVUmfJU_AtDEYgErV7oRMwFSBtvQLKwW');

async function sendVerificationEmail(email, code)  {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code',
            html: `<p>Thank you for choosing. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p> <h1>${code}</h1>`
        });
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};


module.exports = { sendVerificationEmail };