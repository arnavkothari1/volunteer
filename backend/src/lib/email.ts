import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendApplicationStatusEmail(
  to: string,
  status: string,
  internshipTitle: string
) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: `Application Status Update: ${internshipTitle}`,
    html: `
      <h1>Your application status has been updated</h1>
      <p>Your application for ${internshipTitle} has been ${status.toLowerCase()}.</p>
    `,
  })
} 