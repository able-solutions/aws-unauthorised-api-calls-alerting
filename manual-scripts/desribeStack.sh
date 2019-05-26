#!/bin/bash
stack_name="api-alerter"
region="eu-west-2"
aws cloudformation describe-stacks --stack-name $stack_name --region $region --output json