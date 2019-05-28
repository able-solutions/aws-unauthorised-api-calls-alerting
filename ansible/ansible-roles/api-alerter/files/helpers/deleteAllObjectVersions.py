import boto3
import sys
print ("This is the name of the script: ", sys.argv[0])
print ("The arguments are: " , str(sys.argv))
print ("Number of arguments: ", len(sys.argv))
bucket_name=sys.argv[1]


s3 = boto3.resource('s3')
bucket = s3.Bucket(bucket_name)
bucket.object_versions.delete()