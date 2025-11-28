import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

interface EmailTemplate {
  subject: string
  html: string
}

function getAdminNotificationEmail(data: ContactEmailData): EmailTemplate {
  return {
    subject: `New Contact Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">New Contact Submission</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 20px;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  }
}

function getUserConfirmationEmail(data: ContactEmailData): EmailTemplate {
  return {
    subject: "We received your message",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Thank you for contacting us!</h2>
        <p>Hi <strong>${data.name}</strong>,</p>
        <p>We have received your message and appreciate you reaching out. Our team will review your inquiry and get back to you as soon as possible.</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <p>Best regards,<br>Our Team</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
        <p style="color: #999; font-size: 12px;">This is an automated email. Please do not reply directly to this email.</p>
      </div>
    `,
  }
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.warn("[v0] Email configuration missing, skipping email send")
      return true
    }

    const adminEmail = getAdminNotificationEmail(data)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: adminEmail.subject,
      html: adminEmail.html,
    })

    const userEmail = getUserConfirmationEmail(data)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: userEmail.subject,
      html: userEmail.html,
    })

    return true
  } catch (error) {
    console.error("[v0] Email error:", error)
    return false
  }
}

export async function verifyEmailConfig(): Promise<boolean> {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      return false
    }
    await transporter.verify()
    return true
  } catch (error) {
    console.error("[v0] Email verification failed:", error)
    return false
  }
}
