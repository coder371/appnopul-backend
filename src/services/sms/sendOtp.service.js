const { OTP } = require("../../utilities/helpers");

const sendOtp = async ({phone, code}) => {

  const url = 'https://capi.inforu.co.il/api/v2/SMS/SendSms';
  const data = {
    Data: {
      Message: OTP.OTPMsg(code),
      Recipients: [
        {
          Phone: phone
        }
      ],
      Settings: {
        Sender: 'wafflelab'
      }
    }
  };
  const headers = {
    'Authorization': process.env.SMS_SECRET_KEY,
    'Content-Type': 'application/json'
  };

  return await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
};

module.exports = sendOtp
