import nodemailer from 'nodemailer'

const sendEmail = async (options: {
  email: string
  subject: string
  message: string
}) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // 2) Define the email options
  const mailOptions = {
    from: 'othmane kahtal <contact@othmanekahtal.me>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}

export default sendEmail
