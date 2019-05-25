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

### AWS Resources this Repo will Deploy ###

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

### Instructions ###

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