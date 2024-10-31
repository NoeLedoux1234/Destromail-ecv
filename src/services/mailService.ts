import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendMail = async (subject: string, text: string, to: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log('Email envoyé:', info.messageId);
        console.log('URL de prévisualisation:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
};
