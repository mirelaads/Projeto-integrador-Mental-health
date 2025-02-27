import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const MAILERSEND_URL = process.env.MAILERSEND_URL || '';
const API_KEY = process.env.API_KEY || '';
const EMAIL_USER = process.env.EMAIL_USER || 'no-reply@projetopsicofaculdade.com';


export async function sendMail(to: string, subject: string, content: any) {
  const data = {
    from: { email: EMAIL_USER },
    to: [{ email: to }],
    subject: subject,
    text: content
    
  };

  try {
    const response = await axios.post(
      `${MAILERSEND_URL}email`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    );

    console.log(`Email sent to ${to}. Status:`, response.status);

  } catch (error: any) {
    console.error('Error sending email:', error?.response?.data || error.message);
    throw error; 
  }
}




