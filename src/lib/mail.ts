import nodemailer from "nodemailer";

// ─── Core Send ─────────────────────────────────────────────────────────────

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASSWORD || "",
      },
    });

    const info = await transporter.sendMail({
      from: `"Sugam Child & Gastro Clinic" <${process.env.SMTP_USER || "noreply@sugamclinic.com"}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return { success: false, error };
  }
}

// ─── Shared Layout Wrapper ─────────────────────────────────────────────────

function emailWrapper(content: string, previewText = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sugam Clinic</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0b1a35;font-family:'Segoe UI',Arial,sans-serif;">
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;">${previewText}</div>` : ""}

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="max-width:600px;width:100%;background-color:#0f2147;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.5);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a56db 0%,#0ea5e9 100%);padding:36px 40px;text-align:center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50%;padding:12px;margin-bottom:16px;">
                      <img src="https://img.icons8.com/color/96/medical-cross.png" width="48" height="48" alt="Sugam Clinic" style="display:block;" />
                    </div>
                    <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                      Sugam Child &amp; Gastro Care
                    </h1>
                    <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);font-weight:400;">
                      Premium Paediatric &amp; Gastroenterology Care
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#091530;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.4);">
                Sugam Child &amp; Gastro Care Clinic &nbsp;|&nbsp; Chennai, Tamil Nadu
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);">
                This is an automated message. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─── Shared helpers ────────────────────────────────────────────────────────

function badge(text: string, color = "#1a56db") {
  return `<span style="display:inline-block;background:${color};color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:0.5px;">${text}</span>`;
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td width="160" style="font-size:12px;color:rgba(255,255,255,0.45);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding-right:16px;vertical-align:top;">
              ${label}
            </td>
            <td style="font-size:14px;color:#e2eeff;font-weight:500;">${value}</td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function sectionHeading(icon: string, title: string) {
  return `
    <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#ffffff;display:flex;align-items:center;gap:8px;">
      ${icon}&nbsp; ${title}
    </p>`;
}

function alertBox(text: string, accent = "#1a56db") {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;">
      <tr>
        <td style="background:${accent}22;border-left:4px solid ${accent};border-radius:8px;padding:16px 20px;">
          <p style="margin:0;font-size:13px;color:#c8ddff;line-height:1.6;">${text}</p>
        </td>
      </tr>
    </table>`;
}

function ctaButton(text: string, href: string) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0 0;">
      <tr>
        <td align="center" style="border-radius:999px;background:linear-gradient(135deg,#1a56db,#0ea5e9);">
          <a href="${href}" target="_blank"
            style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.3px;">
            ${text} &rarr;
          </a>
        </td>
      </tr>
    </table>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// BOOKING EMAILS
// ═══════════════════════════════════════════════════════════════════════════

export function buildAdminBookingEmail(appt: {
  name: string; phone: string; email: string;
  date: string; time: string; doctorName: string; message?: string;
}) {
  const body = `
    ${sectionHeading("📅", "New Appointment Request")}
    ${badge("Action Required", "#dc2626")}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
      ${infoRow("Patient Name", appt.name)}
      ${infoRow("Phone", appt.phone)}
      ${infoRow("Email", appt.email)}
      ${infoRow("Preferred Date", appt.date)}
      ${infoRow("Preferred Time", appt.time)}
      ${infoRow("Doctor Requested", appt.doctorName)}
      ${appt.message ? infoRow("Patient Note", appt.message) : ""}
    </table>

    ${alertBox("A new patient has booked an appointment. Please review and confirm the slot in the admin dashboard.")}

    ${ctaButton("Open Admin Dashboard", `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/appointments`)}
  `;
  return emailWrapper(body, `New appointment request from ${appt.name}`);
}

export function buildPatientBookingConfirmEmail(appt: {
  name: string; date: string; time: string; doctorName: string;
}) {
  const body = `
    ${sectionHeading("✅", "Booking Request Received!")}

    <p style="margin:0 0 24px;font-size:15px;color:#c8ddff;line-height:1.7;">
      Dear <strong style="color:#fff;">${appt.name}</strong>,<br/><br/>
      Thank you for choosing <strong style="color:#60a5fa;">Sugam Child &amp; Gastro Care Clinic</strong>.
      We have successfully received your appointment request and our team will confirm your slot shortly.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${infoRow("Doctor", appt.doctorName)}
      ${infoRow("Requested Date", appt.date)}
      ${infoRow("Requested Time", appt.time)}
      ${infoRow("Status", "⏳ Pending Confirmation")}
    </table>

    ${alertBox("Our team will call or WhatsApp you within 2 hours to confirm your appointment. Please keep your phone reachable.", "#0ea5e9")}

    <p style="margin:24px 0 0;font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">
      Need immediate help? Call us at <strong style="color:#60a5fa;">${process.env.CLINIC_PHONE || "+91 94444 56789"}</strong>
    </p>
  `;
  return emailWrapper(body, `Your appointment request has been received`);
}

export function buildPatientBookingConfirmedEmail(appt: {
  name: string; date: string; time: string; doctorName: string;
}) {
  const body = `
    ${sectionHeading("🎉", "Appointment Confirmed!")}

    <p style="margin:0 0 24px;font-size:15px;color:#c8ddff;line-height:1.7;">
      Dear <strong style="color:#fff;">${appt.name}</strong>,<br/><br/>
      We are delighted to confirm your appointment at Sugam Clinic. We look forward to seeing you!
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${infoRow("Doctor", appt.doctorName)}
      ${infoRow("Confirmed Date", appt.date)}
      ${infoRow("Confirmed Time", appt.time)}
      ${infoRow("Status", "✅ Confirmed")}
    </table>

    ${alertBox("Please arrive <strong>10 minutes early</strong> with any previous medical records. Our staff will be ready to assist you.", "#16a34a")}

    <p style="margin:24px 0 0;font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">
      To reschedule, call <strong style="color:#60a5fa;">${process.env.CLINIC_PHONE || "+91 94444 56789"}</strong>
    </p>
  `;
  return emailWrapper(body, `Your appointment is confirmed – Sugam Clinic`);
}

// ═══════════════════════════════════════════════════════════════════════════
// REVIEW EMAILS
// ═══════════════════════════════════════════════════════════════════════════

export function buildAdminReviewEmail(review: {
  name: string; rating: number; reviewText: string;
}) {
  const stars = "⭐".repeat(review.rating) + "☆".repeat(5 - review.rating);
  const body = `
    ${sectionHeading("💬", "New Patient Review Submitted")}
    ${badge("Pending Approval", "#d97706")}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
      ${infoRow("Patient Name", review.name)}
      ${infoRow("Rating", `${stars} (${review.rating}/5)`)}
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;">
      <tr>
        <td style="background:rgba(255,255,255,0.04);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 8px;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.5px;">Review</p>
          <p style="margin:0;font-size:14px;color:#e2eeff;line-height:1.7;font-style:italic;">"${review.reviewText}"</p>
        </td>
      </tr>
    </table>

    ${alertBox("This review is pending your approval. Visit the admin panel to approve or reject it.")}
    ${ctaButton("Review in Dashboard", `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/reviews`)}
  `;
  return emailWrapper(body, `New ${review.rating}-star review from ${review.name}`);
}

export function buildPatientReviewThankYouEmail(name: string) {
  const body = `
    ${sectionHeading("🙏", "Thank You for Your Review!")}

    <p style="margin:0 0 24px;font-size:15px;color:#c8ddff;line-height:1.7;">
      Dear <strong style="color:#fff;">${name}</strong>,<br/><br/>
      Thank you for taking the time to share your experience at
      <strong style="color:#60a5fa;">Sugam Child &amp; Gastro Care Clinic</strong>.
      Your feedback helps us improve and helps other families make informed decisions.
    </p>

    ${alertBox("Your review has been submitted and will appear on our website once it is approved by our team. This usually takes less than 24 hours.", "#0ea5e9")}

    <p style="margin:24px 0 0;font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">
      We truly appreciate your trust and look forward to serving you again.
    </p>
  `;
  return emailWrapper(body, `We received your review – thank you!`);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT MESSAGE EMAILS
// ═══════════════════════════════════════════════════════════════════════════

export function buildAdminContactEmail(msg: {
  name: string; email: string; phone?: string; message: string; subject?: string;
}) {
  const body = `
    ${sectionHeading("📨", "New Contact Form Message")}
    ${badge("New Message", "#7c3aed")}

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;">
      ${infoRow("Name", msg.name)}
      ${infoRow("Email", msg.email)}
      ${msg.phone ? infoRow("Phone", msg.phone) : ""}
      ${msg.subject ? infoRow("Subject", msg.subject) : ""}
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;">
      <tr>
        <td style="background:rgba(255,255,255,0.04);border-radius:12px;padding:20px 24px;border:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0 0 8px;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.5px;">Message</p>
          <p style="margin:0;font-size:14px;color:#e2eeff;line-height:1.7;">${msg.message}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);">
      Reply directly to: <a href="mailto:${msg.email}" style="color:#60a5fa;">${msg.email}</a>
      ${msg.phone ? `&nbsp;|&nbsp; Call: <strong style="color:#60a5fa;">${msg.phone}</strong>` : ""}
    </p>

    ${ctaButton("View in Dashboard", `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/appointments`)}
  `;
  return emailWrapper(body, `New contact message from ${msg.name}`);
}

export function buildPatientContactAutoReplyEmail(name: string) {
  const body = `
    ${sectionHeading("✉️", "We Got Your Message!")}

    <p style="margin:0 0 24px;font-size:15px;color:#c8ddff;line-height:1.7;">
      Dear <strong style="color:#fff;">${name}</strong>,<br/><br/>
      Thank you for reaching out to <strong style="color:#60a5fa;">Sugam Child &amp; Gastro Care Clinic</strong>.
      We have received your message and our team will get back to you as soon as possible.
    </p>

    ${alertBox("We typically respond within <strong>2–4 business hours</strong>. For urgent matters, please call us directly.", "#7c3aed")}

    <p style="margin:24px 0 0;font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;">
      📞 Emergency / Urgent: <strong style="color:#60a5fa;">${process.env.CLINIC_PHONE || "+91 94444 56789"}</strong><br/>
      🕒 Clinic Hours: Monday – Saturday, 9:00 AM – 8:00 PM
    </p>
  `;
  return emailWrapper(body, `We received your message – Sugam Clinic`);
}
