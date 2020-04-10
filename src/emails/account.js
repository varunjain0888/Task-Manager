const sgMail = require('@sendgrid/mail');
const sendGridApiKey = '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'
sgMail.setApiKey(sendGridApiKey);


const sendWelcomeMail = (email, name) => {
    //sgMail.send(msg);
sgMail
.send({
    to : email,
    from: 'varunjain0888@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'Welcome ${name}, to Task Managment Application, we are happy to manage your tasks.',
    html: '<h1>Task Management App</h1>'
})
.then(() => {}, error => {
  console.error(error);

  if (error.response) {
    console.error(error.response.body)
  }
});
}

module.exports = {sendWelcomeMail}
