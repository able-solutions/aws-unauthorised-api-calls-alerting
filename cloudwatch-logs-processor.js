const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const zlib = require('zlib');

const cloudwatchAlerter = process.env.CloudWatchAlerterLambdaArn;

exports.handler = async (event, context) => {

  let initialised = false;

  console.log(JSON.stringify(event));
  
  if (!initialised) {
    
    initialised = true;
    
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    const subscription = parsed.subscriptionFilters[0];
    const rule = (subscription.split('-')[4]).replace('LogSubscription','');
    const logData = parsed.logEvents;
    
    const newPayload = JSON.stringify({
      Rule: rule,
      LogEvents: logData
    });
    
    var invokelambdaParams = {
      FunctionName: cloudwatchAlerter,
      LogType: 'Tail',
      InvocationType: "Event",
      Payload: newPayload
    };
    
    await lambda.invoke(invokelambdaParams).promise();
    
    initialised = false;
    return;
    
  } else {
    
    console.log('No Log Events to Process');
    
  }

};