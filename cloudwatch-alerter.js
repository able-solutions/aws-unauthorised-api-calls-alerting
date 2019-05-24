'use strict';

//const AWS = require('aws-sdk');
const https = require('https');

let initialised = false;

//Global Slack Variables
var slackHook = process.env.SlackHook;
var slackUsername = process.env.SlackUsername;
var slackChannel = process.env.SlackChannel;
var emoji = ":awssecurity:";
var color = "#C70039";

//wait Function
async function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 200);
  })
}

//POST Function
var postMessage = async function(slackMessage, callback) {
  return new Promise((resolve, reject) => {
    var body = JSON.stringify(slackMessage);
    var options = {
      hostname: 'hooks.slack.com',
      path: slackHook,
      method: 'POST',
    };

    var postReq = https.request(options, function(res) {
        var chunks = [];
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            return chunks.push(chunk);
        });
        res.on('end', function() {
        var body = chunks.join('');
            if (callback) {
                callback({
                    body: body,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                });
            }
        });
        resolve(res);
    });
    postReq.write(body);
    postReq.end();
  });  
};

exports.handler = async (event, context) => {
  
  console.log(event);
  
  if (!initialised) {
    
    initialised = true;
    const rule = event.Rule;
    const logEvents = event.LogEvent;
    
    for (var each of logEvents) {
      
      let message = JSON.parse(each.message);
      let userIdentity = message.userIdentity;
      let requestParameters = message.requestParameters;
      let principal = userIdentity.arn;
      let eventName = message.eventName;
      let eventTime = message.eventTime;
      let errorCode = message.errorCode;
      let errorMessage = message.errorMessage;
      let eventSource = message.eventSource;
      let region = message.awsRegion;
      let accountNumber = userIdentity.accountId;
      let eventID = message.eventID;
      
      if(eventSource === 's3.amazonaws.com') {
        let host = requestParameters.host;
      }
      
      if(rule === 'UnauthorisedAPICalls') {
        
        //UnauthorisedAPICallMessage
        var UnauthorisedAPICallMessage = {
          channel: slackChannel,
          username: slackUsername,
          icon_emoji: emoji,
          attachments: [
            {
              "color": "#32CD32",
              "author_name": `Rule Triggered: ${rule}`,
              "text": ""
            },
            {
              "color": color,
              "fields": [
                { "title": `Event Time`, "value": `${eventTime}`, "short": false },
                { "title": `Event Source`, "value": `${eventSource}`, "short": true },
                { "title": `Event Name`, "value": `${eventName}`, "short": true },
              ]
            },
            {
              "color": color,
              "fields": [
                { "title": `Principal`, "value": `${principal}`, "short": false },
                { "title": `Error Code`, "value": `${errorCode}`, "short": false },
                { "title": `Error Message`, "value": `${errorMessage}`, "short": false }
              ]
            },
            {
              "color": color,
              "fallback": "Would you like to do anything regarding this finding?",
              "title": "Would you like to do anything regarding this finding?",
              "callback_id": `${eventID}`,
              "attachment_type": "default",
              "actions": [
                {
                  "name": "ViewLog",
                  "text": "View Event Log",
                  "type": "button",
                  "style": "primary",
                  "url": `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logEventViewer:group=aws-management-cloudtrail-logs;stream=${accountNumber}_CloudTrail_${region};filter=%257B%2520%2524.eventID%2520%253D%2520${eventID}%2520%257D`
                },
                {
                  "name": "ISF16B",
                  "text": "Raise ISF16B",
                  "type": "button",
                  "style": "danger",
                  "url": "https://contactpartnersdev.atlassian.net/servicedesk/customer/portal/6/group/24"
                }
              ]
            },
            {
              "color": "#32CD32",
              "title": "Retention",
              "footer": "The data for this finding will be retained within Amazon CloudWatch Logs for 1 year."
            }
          ]
        };

        try {

          await postMessage(UnauthorisedAPICallMessage);
          await wait();

        } catch(error) {

          console.log(error);

        }
        
      }
      
    }
    
  } else {
    
    console.log('Already Initialised');
    
  }

};