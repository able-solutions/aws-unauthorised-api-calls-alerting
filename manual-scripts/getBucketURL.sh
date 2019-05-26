#!/bin/bash
stack_name="api-alerter"
bucket_name="CloudTrailBucketName"
region="eu-west-2"
aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].Outputs[?OutputKey=='${bucket_name}'].OutputValue" --region $region --output text