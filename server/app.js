var express = require('express');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
const { Client } = require('pg');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use('/assets', express.static(path.join(__dirname, 'client', 'dist', 'assets')));
app.use(express.static(__dirname + '/client/dist'));

app.get('/',function(req,res) {
  // Sending our HTML file to browser.
  res.sendFile(__dirname + '/client/dist/index.html');
});

app.post('/submit',function(req,res){
  var capchaResponse = req.body['g-recaptcha-response'];

  if(!capchaResponse) {
    return res.json({
      "responseCode" : 1,
      "responseDesc" : "Capcha wasn't provided"
    });
  }
  //var secretKey = "6Lc3gsMUAAAAANeSWIhAIss7lpC-vhMlwUxGgqQ6";
  var secretKey = "6Lev8sYUAAAAANhau7uJ1HiBMKnoJ4IUkWVeBiee";
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + capchaResponse + "&remoteip=" + req.connection.remoteAddress;

  request(verificationUrl, async function (error, response, body) {
    body = JSON.parse(body);

    if (!body.success) {
      return res.json({
        "responseCode": 1,
        "responseDesc": "Failed captcha verification"
      });
    }

    let transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
          // should be replaced with real sender's account
          user: 'email242342@gmail.com',
          pass: '8veB89n52ux7UDM'
      }
    });

  const mailOptions = {
      // should be replaced with real recipient's account
      from: 'email242342@gmail.com', // sender address
      to: 'alex-wd@yandex.ru, business@upsaleslab.com', // list of receivers
      subject: 'New user registration', // Subject line
      html: `New user registration<br> ${req.body.email} - ${req.body.name}`// plain text body

  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });

  //res.writeHead(301, { Location: 'index.html' });
  return res.json({
    "responseCode": 0,
    "responseDesc": "Success"
  });
  res.end();

  });
});

app.use("*",function(req,res) {
  res.status(404).send("404");
});

app.listen(3000);
