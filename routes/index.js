const fs = require('fs');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const launder = require('launder')();

router.get('/', function (req, res, next) {
  let style = 'style.css';
  let script = 'script.js';

  if (process.env.NODE_ENV === 'production') {
    const releaseIds = fs.readFileSync('release-ids', 'utf8');
    if (releaseIds) {
      const [cssId, jsId] = releaseIds.split('\n');
      style = cssId;
      script = jsId;
    }
  }
  res.render('index', {
    title: 'LeStudio',
    year: new Date().getFullYear(),
    style,
    script,
  });
});

router.post('/contact', async function (req, res, next) {
  const email = launder.string(req.body.email);
  const message = launder.string((req.body.message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>'));
  const token = launder.string(req.body.token);

  if (!message || !email || message.includes('<') || message.includes('http') || message.includes('href') || message.includes('src') || message.length < 20 || message.length > 500) {
    return;
  }

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: JSON.stringify({
      secret: process.env.CLOUDFLARE_SECRET_KEY,
      response: token,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const outcome = await result.json();
  if (!outcome.success) {
    console.log('cloudflare verify outcome ====> ', outcome)
    return;
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.zoho.eu',
      auth: {
        user: 'anthony@tarlao.fr',
        pass: process.env.EMAIL_PASS,
      },
    secure: true,
  });

  let content = `Un nouveau message de la part de <b>${email}</b>`
  content += ` :<br>${message}`;

  const mailData = {
  from: 'anthony@tarlao.fr',
    to: 'anthony.tarlao@gmail.com',
    subject: 'LeStudio - Nouveau contact',
    html: content,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.error('Error when sending mail', err);
      return res.status(500).json({ success: false });
    }
    console.log('Email sent', info.response);
    res.json({ success: true });
  });
});

module.exports = router;
