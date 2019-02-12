const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const args = process.argv.slice(2);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/mail', (req, res) => {
    async function main() {
    
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: String(args[0]),
                pass: String(args[1])
            }
        });
    
        let mailOptions = {
            from: req.body.firstname + " " + req.body.lastname,
            to: "Aaronjlilla@gmail.com",
            subject: "Website Submission (v2)",
            html: "<b>First Name:</b> " + req.body.firstname + " <br/><b>Last Name:</b> " + req.body.lastname + " <br/><b>E-Mail:</b> " + req.body.email + " <br/><b>Phone Number:</b> " + req.body.phone + " <br/><b>Message:</b> " + req.body.message
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error);
  });

const server = app.listen(3001, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });