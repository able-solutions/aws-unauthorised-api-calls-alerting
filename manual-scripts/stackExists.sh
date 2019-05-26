#!/bin/bash
stack_name="api-alerter"
region="eu-west-2"
## aws cloudformation describe-stacks --stack-name $stack_name --region $region --output json
## aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].StackName" --region $region --output text
if aws cloudformation describe-stacks --stack-name $stack_name --query "Stacks[0].StackName" --region $region --output text 2>&1 | grep -q 'api-alerter does not exist'
then
    echo false
else
    echo true
fi