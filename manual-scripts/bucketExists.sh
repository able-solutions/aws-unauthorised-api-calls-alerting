#!/bin/bash
bucket_name="api-alerter-s3bucket-1pt19tbka5pfy"
region="eu-west-2"

if aws s3 ls "s3://$bucket_name" 2>&1 | grep -q 'NoSuchBucket'
then
    echo false
else
    echo true
fi