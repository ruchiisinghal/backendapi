const AWS=required('aws-sdk');
AWS.config.update({
    accessKeyId: 'YAKIAXYFUA64FH6EOM2U2',
    secretAccessKey: 'v0jK6qEL/t5nMBZH6Zgnp6MGx7fZozF2cWUeXK38',
    region: 'us-east-1'
  });
  
  const sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  
  module.exports = {
    aws: {
      accessKeyId: '<your-access-key-id>',
      secretAccessKey: '<your-secret-access-key>',
      region: 'us-east-1' // replace with your preferred region
    }
  };
  


  