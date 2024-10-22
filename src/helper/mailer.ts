import userModel from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export async function sendEmail(email: string, emailType: string, userId: string) {
    try {
        // Hash the userId to create a token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the database depending on the type of email (Verify or Reset)
        if (emailType == 'VERIFY') {
            await userModel.findOneAndUpdate({ _id: userId }, {
                verifytoken: hashedToken,
                verifytokenexpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        } else if (emailType === 'RESET') {
            await userModel.findOneAndUpdate({ _id: userId }, {
                forgotpaswordtoken: hashedToken,
                forgotpaswordtokenexpiry: Date.now() + 3600000, // Token valid for 1 hour
            });
        }

        // Create a transporter object for email service
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            }
          });

        // Construct the reset or verification link
        const resetLink = `${process.env.DOMAIN!}/verifytoken?token=${hashedToken}`;

        // Prepare the email content
        const info = await transport.sendMail({
            from: 'Floki07@ethereal.email', // Sender address
            to: email, // Receiver email address
            subject: "Authentication App", // Subject line
            text: `Click here : ${resetLink}`, // Plain text body
            html: `<p>Click <a href="${resetLink}">here</a> to ${emailType == 'RESET' ? 'reset your password' : 'verify your account'}</p>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId); // Log the message ID

    } catch (error: any) {
        throw new Error(error.message); // Catch and throw errors
    }
}
