#!/bin/bash

# bash script that will zip up a deployment package, upload a lambda function
# to a specified s3 bucket. The script will then deploy the function to lambda (node version)

echo -n "Enter the name of the awscli profile you want to use: "
read AWSProfile
#echo -n "Enter the name of the files you wish to zip (eg. lambdaFunction.js node_modules): "
#read FilesToBeZipped
#echo -n "Enter the name of the output zip file (eg. lambdaFunction): "
#read ZipFileName
#echo -n "Enter the name of the cloudformation template you want to uplaod to s3 (eg. cloudformation.template): "
#read CloudFormationTemplate
echo -n "Enter the name of the s3 bucket you wish to upload to: "
read BucketName
#echo -n "Enter the name of your lambda function: "
#read FunctionName
#echo -n "Enter a description of your function: "
#read Description
#echo -n "Enter the ARN of the role you wish to implement: "
#read Role

#echo "Getting the AWS Region for the S3 Bucket..."

#aws s3api get-bucket-location --bucket $BucketName --profile $AWSProfile

#zip -r "$ZipFileName.zip" $FilesToBeZipped
git archive -o "lambdaCode.zip" HEAD cloudwatch-alerter.js cloudwatch-logs-processor.js 

echo "Uploading files into S3..."

aws s3api put-object --bucket $BucketName --key "lambdaCode.zip" --body "lambdaCode.zip" --profile $AWSProfile

rm -Rf lambdaCode.zip .zip

aws s3api put-object --bucket $BucketName --key "cloudformation.template" --body "cloudformation.template" --profile $AWSProfile

echo "Creating CloudFormation Stack...."

#echo -n "Enter the name of your cloudformation stack: "
#read StackName
#echo -n "Enter the AWS Region of the S3 Bucket: "
#read Region
echo -n "Enter an email address that will receive alerts: "
read EmailAddress
echo -n "Enter a project name (Lowercase Only): "
read Project
#echo -n "Enter a name for the CloudTrail Log Group to be created in CloudWatch: "
#read LogGroup
echo -n "Enter the Slack channel you would like to post alerts to. Must start with #: "
read SlackChannel
echo -n "Copy the URL for the Webhook created for the Slack channel just specified: "
read SlackWebHook
#echo -n "Enter a username that you would like to be displayed, when messages are posted to Slack: "
#read SlackUsername

aws cloudformation create-stack \
--stack-name able-solutions-unauthorised-api-calls \
--template-body file://cloudformation.template \
--parameters ParameterKey=EmailAddress,ParameterValue=$EmailAddress ParameterKey=S3LambdaBucket,ParameterValue=$BucketName ParameterKey=S3BucketName,ParameterValue=$Project-cloudtrail-logs ParameterKey=CloudTrailLogGroupName,ParameterValue=$Project-cloudtrail-logs ParameterKey=SlackChannel,ParameterValue=$SlackChannel ParameterKey=SlackWebHook,ParameterValue=$SlackWebHook ParameterKey=SlackUsername,ParameterValue=Project-$Project 

#aws lambda create-function --function-name $FunctionName --runtime nodejs \
#--role $Role --handler "$ZipFileName.handler" \
#--code S3Bucket="$BucketName",S3Key="./$ZipFileName.zip" \
#--description "$Description"

# echo -n "Enter the object version (eg. 111111): "
# read ObjectVersion

# add default values to variables
# check whether the version already exists
# role precreated or have to create them
# permission denied, you have to make it an executable