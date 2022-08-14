function send_mail() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'jamison.funk48@ethereal.email',
          pass: 'Sc9VEj8BnUxr6jfDfp'
      }
    });

    const mailOptions = {
      from: 'jamison.funk48@ethereal.email',
      to: 'jatinalwar2001@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
  }

if(document.getElementById('btn-send').clicked == true)
{
    send_mail()
}
