const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'LeStudio',
    year: new Date().getFullYear(),
    style: process.env.NODE_ENV === 'production' ? 'style.min' : 'style',
    script: process.env.NODE_ENV === 'production' ? 'script.min' : 'script',
  });
});

router.post('/contact', function (req, res, next) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.zoho.eu',
      auth: {
        user: 'anthony@tarlao.fr',
        pass: process.env.EMAIL_PASS,
      },
    secure: true,
  });

  let content = `Un nouveau message de la part de <b>${req.body.email}</b>`
  if (req.body.message) {
    const message = (req.body.message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>');
    content += ` :<br>${message}`;
  }

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
