import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL || 'your-default-recipient@example.com';
const FROM_EMAIL = process.env.CONTACT_FORM_FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: Request) {
  if (!resend) {
    console.error('Resend API key is not configured. Set RESEND_API_KEY environment variable.');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: `TheoForge Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      html: `
        <p>You received a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p> 
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    console.log('Email sent successfully via Resend:', data);
   
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    if (error instanceof SyntaxError) { 
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
