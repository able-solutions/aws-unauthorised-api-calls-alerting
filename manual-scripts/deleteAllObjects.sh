#!/bin/bash
stack_name="api-alerter"
bucket_name="api-alerter-s3bucket-1ol2628pcqmeq"
region="eu-west-2"

python deleteallObjects.py ${bucket_name}