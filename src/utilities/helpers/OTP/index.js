const gpc = require('generate-pincode')

class OTP 
{
  static url = 'https://capi.inforu.co.il/api/v2/SMS/SendSms';

  static OTPGenerate(digits) {
    return gpc(digits);
  }

  static OTPMsg(code) {
    return `رمز تأكيد حسابك في وافل لاب هو : ${code}`
  }

  static async sendSMS({phone, code, sender}){
    const data = {
      Data: {
        Message: this.OTPMsg(code),
        Recipients: [
          {
            Phone: phone
          }
        ],
        Settings: {
          Sender: sender
        }
      }
    };
    const headers = {
      'Authorization': process.env.SMS_SECRET_KEY,
      'Content-Type': 'application/json'
    };
  
    return await fetch(this.url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
  }
}

module.exports = OTP;