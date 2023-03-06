const AWS = require('aws-sdk');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');
AWS.config.update(config.aws);
const sns = new AWS.SNS({ region: 'us-east-1' });

const sendOTP = (otp, phone) => {
  const params = {
    Message: `Your OTP for authentication is ${otp}`,
    PhoneNumber: phone,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    }
  };
  return sns.publish(params).promise();
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const otp = generateOTP();
      const data = await sendOTP(otp, req.body.phone);
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  signup: async(req,res)=>{
    const otp = generateOTP();
    sendOTP(phoneNumber, otp)
      .then(() => {
        // store the generated OTP in the session for verification
        req.session.phoneNumber = phoneNumber;
        req.session.otp = otp;
        res.json({ success: true, message: 'OTP sent to phone number' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
      });
  },

  verifyOTP: async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.otp !== req.body.otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
      }
      const token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
      user.otp = undefined;
      await user.save();
      res.status(200).json({ message: 'OTP verified', token });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
