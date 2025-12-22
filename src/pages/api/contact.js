import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Rate limiting: Store submission timestamps in-memory (basic protection)
const submissions = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // 3 submissions per minute per email

function checkRateLimit(identifier) {
  const now = Date.now();
  const userSubmissions = submissions.get(identifier) || [];

  // Clean old submissions
  const recentSubmissions = userSubmissions.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    return false;
  }

  recentSubmissions.push(now);
  submissions.set(identifier, recentSubmissions);
  return true;
}

export async function POST({ request }) {
  try {
    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type debe ser application/json' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, company, message, honeypot } = body;

    // Honeypot field - if filled, it's a bot
    if (honeypot) {
      // Return success to fool bots, but don't send email
      return new Response(
        JSON.stringify({ success: true, message: 'Mensaje enviado exitosamente' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Faltan campos requeridos: nombre, email y mensaje son obligatorios'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email format validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Formato de email inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting (use email as identifier)
    const identifier = email.toLowerCase();
    if (!checkRateLimit(identifier)) {
      return new Response(
        JSON.stringify({
          error: 'Demasiadas solicitudes. Por favor espera un minuto.'
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const emailData = await resend.emails.send({
      from: import.meta.env.CONTACT_FORM_FROM_EMAIL || 'noreply@updates.pixory.cl',
      to: import.meta.env.CONTACT_FORM_TO_EMAIL || 'contacto@pixory.cl',
      replyTo: email,
      subject: `Nuevo contacto desde pixory.cl - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #1e293b; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #1e293b; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f8fafc; padding: 30px; border-radius: 8px; margin-top: 20px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #475569; margin-bottom: 5px; }
              .value { background-color: white; padding: 10px; border-radius: 4px; }
              .footer { margin-top: 20px; text-align: center; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nuevo Mensaje de Contacto</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nombre:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${company ? `
                <div class="field">
                  <div class="label">Empresa:</div>
                  <div class="value">${company}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Mensaje:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Este mensaje fue enviado desde el formulario de contacto en pixory.cl</p>
                <p>Puedes responder directamente a este email para contactar a ${name}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        error: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Return 405 for non-POST requests
export function GET() {
  return new Response(
    JSON.stringify({ error: 'Método no permitido' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  );
}
