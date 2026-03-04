import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { domain, name, email, phone, company, address, notes } = req.body;

  if (!domain || !name || !email || !phone || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Admin notification
    await transporter.sendMail({
      from: `"DotMac Domain Requests" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_TO,
      subject: `Domain Registration Request: ${domain}`,
      html: `
        <h2>New Domain Registration Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Domain:</td><td style="padding:8px">${domain}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Name:</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Phone:</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Company:</td><td style="padding:8px">${company || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Address:</td><td style="padding:8px">${address}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Notes:</td><td style="padding:8px">${notes || 'None'}</td></tr>
        </table>
      `,
    });

    // User confirmation
    await transporter.sendMail({
      from: `"DotMac Technologies" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Domain Registration Request Received: ${domain}`,
      html: `
        <h2>Thank you for your domain registration request!</h2>
        <p>Hi ${name},</p>
        <p>We've received your request to register <strong>${domain}</strong>.</p>
        <p>Our team will review your request and get back to you within 24 hours with pricing and next steps.</p>
        <hr />
        <p><strong>Request Summary:</strong></p>
        <ul>
          <li><strong>Domain:</strong> ${domain}</li>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <br />
        <p>Best regards,<br/>DotMac Technologies</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Domain request email error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
