
const conf = require("../env_config");
const nodemailer = require('nodemailer');

async function sendEmail(mailOptions) {

  var transporter = nodemailer.createTransport(conf.SMTPGoogle);
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (err) {
    console.log(err);
  } finally {
  }

}

async function fetchAWSfiles(params) {
  const AWS = require('aws-sdk');
  // Create S3 service object
  const s3 = new AWS.S3();
  // Set the region 
  AWS.config.update({ region: 'ap-south-1' });
  // **DO THIS**:
  //   Replace BUCKET_NAME with the name of the bucket,  FILE_NAME with the name of the file you want to upload (including relative page), and EXPIRATION with the duration in validaty in seconds (e.g 60 *5)
  const myBucket = 'cctecbuckt'
  const myKey = params
  const signedUrlExpireSeconds = 3600

  const presignedURL = s3.getSignedUrlPromise('getObject', {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds
  })
  console.log(presignedURL)
  return presignedURL;

}


module.exports = {
  sendEmail: sendEmail,
  fetchAWSfiles: fetchAWSfiles,
};
