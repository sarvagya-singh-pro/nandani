import nodemailer from 'nodemailer'
export default function handler(req, res) {
  const transporter = nodemailer.createTransport({});
  console.log(req.body)
}