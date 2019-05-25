'use strict';

//const AWS = require('aws-sdk');
const https = require('https');

//Global Slack Variables
var slackHook = process.env.SlackHook;
var slackUsername = process.env.SlackUsername;
var slackChannel = process.env.SlackChannel;
var logGroupName = process.env.LogGroupName;
var emoji = ":no_entry_sign:";
var color = "#C70039";

//wait Function
async function wait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 200);
  });
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

  let initialised = false;
  
  if (!initialised) {
    
    initialised = true;
    const rule = event.Rule;
    const logEvents = event.LogEvents;
    
    for (var each of logEvents) {
      
      let message = JSON.parse(each.message);
      let userIdentity = message.userIdentity;
      let principal = userIdentity.arn;
      let eventName = message.eventName;
      let eventTime = message.eventTime;
      let errorCode = message.errorCode;
      let errorMessage = message.errorMessage;
      let eventSource = message.eventSource;
      let region = message.awsRegion;
      let accountNumber = userIdentity.accountId;
      let eventID = message.eventID;
      
      if(rule.includes('UnauthorisedAPICall')) {
        
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
                  "url": `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logEventViewer:group=${logGroupName};stream=${accountNumber}_CloudTrail_${region};filter=%257B%2520%2524.eventID%2520%253D%2520${eventID}%2520%257D`
                }
              ]
            },
            {
              "color": "#32CD32",
              "title": "Retention",
              "footer": "The data for this finding will be retained within Amazon CloudWatch Logs as per the log group retention set."
            }
          ]
        };

        try {

          await postMessage(UnauthorisedAPICallMessage);
          await wait();

        } catch(e) {

          console.error(e);

        }
        
      }
      
    }
    
  } else {
    
    console.log('Already Initialised or Rules Detected');
    
  }

};