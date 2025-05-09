// sendSms.mjs or in a project with "type": "module" in package.json

// import twilio from 'twilio';

// const accountSid = 'AC3c103405912e4ed8d6f5804c91ed8d85';
// const authToken = 'd60b651d9033ed1f1845b7191daecaad';

// const client = twilio(accountSid, authToken);

// client.messages
//   .create({
//     body: 'Congrats Tasmiya Khan your Order has been booked',
//     from: '+16016171255',  // Your Twilio trial number
//     to: '+919643423183'    // Your verified number
//   })
//   .then(message => console.log('Message sent with SID:', message.sid))
//   .catch(error => console.error('Error sending SMS:', error));



// sendWhatsapp.mjs or use "type": "module" in package.json

// sendWhatsapp.mjs or use "type": "module" in package.json

import twilio from 'twilio';

const accountSid = process.env.ACCOUNT_SID_TWILIO
const authToken = process.env.AUTH_TOKEN_TWILIO;

const client = twilio(accountSid, authToken);

client.messages
.create({
    from: 'whatsapp:+14155238886',
contentSid: process.env.CONTENT_SID,
contentVariables: '{"1":"12/1","2":"3pm"}',
to: 'whatsapp:+919643423183'
})
  .then(message => console.log('WhatsApp Message SID:', message.sid))
  .catch(error => console.error('Error sending WhatsApp message:', error));
