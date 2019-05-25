# Unauthorised API Calls Detection in AWS #

This repository delivers an AWS Solution that alerts/notifies when any AccessDenied or UnauthorisedAccess API call is detected in CloudTrail.

The way are notified is by using Slack. In order to achieve this, you will need the following prerequisites in place: 

  - Slack Channel
  - Slack WebHook Url

## Repository Information ##

  - Author(s)
    - Able

  - Date Created: 
    - 24/05/2019

## AWS Resources this Repo will Deploy ##

When deployed, this repository will create/provisions AWS resources in the AWS account deployed. To that end, please be aware that you will be charged by AWS for any resources services that you use. 

  - CloudTrail
  - IAM Roles
  - S3 Bucket
  - Lambda Functions
  - CloudWatch Log Group
  - CloudWatch Alarm
  - CloudWatch Metric Filter
  - Cloudwatch Log Group Subscription
  - Lambda Functions
  - Lambda Permissions
  - SNS Topic

## Instructions ##

In order to deploy this solution, there are prerequisites that you need to have completed as when you run the deploy.sh script, it will ask you to input some values from these prerequisites.

*Prerequisites*

  1. Create a Slack channel - (https://get.slack.help/hc/en-gb/articles/201402297-Create-a-channel)
  2. Create a Web Hook for the Slack Channel - (https://get.slack.help/hc/en-gb/articles/115005265063-Incoming-webhooks-for-Slack)
  3. You must already have an AWS Account
  4. Create an S3 Bucket (where you will be storing the template and Lambda Function code) - (https://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html)
  5. You must have the AWSCLI installed and configured on your local machine - (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

*To Deploy*

  1. cd into working directory
  2. Run the deploy.sh script (./deploy.sh)
  3. Enter relevant information when prompted

  ![Alt text](deploy-script.png?raw=true "Running the deploy.sh script")

  **Do Not Forget to Subscribe to the SNS Topic in your Emails**

  ![Alt text](confirm-sns-subscription-email.png?raw=true "Subscribing to the SNS Topic")

##  Architecure Diagram ##

Below is an overview of the architecure that will be deployed. 

![Alt text](Unauthorised-API-Calls-Architecture-Overview.png?raw=true "Architecture Overview")

## Why This Way? ##

  **Why not use CloudWatch Events**

  1. I wanted the ability to capture all unauthorised API calls within CloudTrail but did not want to have to constantly poll CloudTrail. Initially, I was going to use CloudWatch events to detect "$.errorCode = AccessDenied || $.errorCode = UnauthorisedAction", however after trialling this and doing some research, I found that CloudWatch Events when used to build custom event patterns for CloudTrail "AWS API Call via CloudTrail" there were limitations. 
  
  It turns out that CloudWatch events can only detect read/write events and not Read-Only events (eg. Any $.eventName in CloudTrail logs that has Get, List or Describe).

  https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/EventTypes.html#events-for-services-not-listed

  _"Only the read/write events from the following services are supported. Read-only operations—such as those that begin with List, Get, or Describe—aren't supported. In addition, AWS API call events that are larger than 256 KB in size are not supported."_

  **Why not just use CloudWatch Alarms and also alert to Slack as well as an SNS Topic/Email Subscriber?**

  2. This was my natural next step and while this solution is achievable, the one issue I found is that when the alarm is triggered, it doesn't tell what event triggered the alarm in the first place other than that the metric filter used by the CloudWatch Alarm had crossed the threshold. This doesn't help me, as when I get notified, I want to know the short and snappy summary of who, what and when occurred, with then a link supplied to take me to view the full event in more detail.

  **Why stream CloudWatch Logs to Lambda**

  3. It occurred to me that the majority of all the CloudTrail events are being sent to a CloudWatch Log Group, so by filter this Log Group, I could as a relatively low cost solution, stream these selected events to a Lambda Function, do the processing and then pass on a custom payload that will give me all the details I want when any Unauthorised API Call is detected within CloudTrail

  **What are the trade off's?**

  4. There is a deinitive lag/delay in this process/solution. It is not realtime by any means, as CloudTrail takes approx 5 mins to process and deliver events to CloudWatch Logs in batches. Also, for cost reasons, I have decided not to use detailed montioring/high resolution metrics for this solution as the need to be alerted when any access denied events are created is due to compliance reasons and to evidence that measures to detect _malicious activity_ is in place. 

