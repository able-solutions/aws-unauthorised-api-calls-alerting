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

When deployed, this repository will create/provisions AWS resources in the AWS account deployed. To that end, please be aware that you will be charged by AWS for any resources/services that you use. 

  - CloudTrail
  - IAM Roles
  - Lambda Functions
  - CloudWatch Log Group
  - CloudWatch Alarm
  - CloudWatch Metric Filter
  - Cloudwatch Log Group Subscription
  - Lambda Functions
  - Lambda Permissions
