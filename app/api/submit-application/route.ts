import { NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

// Initialize Airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID || '');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, businessName, city, website, revenue, email, phone } = data;

    // Validate required fields
    if (!name || !businessName || !city || !revenue || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in Airtable
    const table = base(process.env.AIRTABLE_TABLE_NAME || 'Applications');
    const airtableRecord = await table.create([
      {
        fields: {
          Name: name,
          BusinessName: businessName,
          City: city,
          Website: website || '',
          Revenue: revenue,
          Email: email,
          Phone: phone
        }
      }
    ]);

    // Send email notification via Resend
    let emailId = null;
    let emailError = null;

    try {
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.NOTIFICATION_EMAIL || '',
        subject: `New Application: ${businessName} - ${name}`,
        html: `
          <h2>New DetailerStack Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Website:</strong> ${website || 'Not provided'}</p>
          <p><strong>Monthly Revenue:</strong> ${revenue}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
          <hr />
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `
      });

      if (emailResult.error) {
        console.error('Resend error:', emailResult.error);
        emailError = emailResult.error.message;
      } else {
        emailId = emailResult.data?.id;
      }
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
      emailError = emailErr instanceof Error ? emailErr.message : 'Email failed';
    }

    return NextResponse.json({
      success: true,
      airtableId: airtableRecord[0].id,
      emailId,
      emailError
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
