# Nuggets, and Tips

create a new ansible role using a scaffold

``bash
ansible-galaxy init api-alerter
```

Run a plybook, that will run locally, and do the work required. This example is create an s3 bucket, and some folders to store the CF template in.

if my repo was located at: Users/stever/local-repos/github/aws-unauthorised-api-calls-alerting/ansible

then 

cd Users/stever/local-repos/github/aws-unauthorised-api-calls-alerting/ansible


```bash
ansible-playbook create-siliconmaze-s3-bucket.yml
```

Result:

```bash
stever@Stevens-iMac:~/local-repos/github/aws-unauthorised-api-calls-alerting/ansible$ ansible-playbook create-siliconmaze-s3-bucket.yml
 [WARNING]: Unable to parse /etc/ansible/hosts as an inventory source

 [WARNING]: No inventory was parsed, only implicit localhost is available

 [WARNING]: provided hosts list is empty, only localhost is available. Note that the implicit localhost does not match 'all'


PLAY [localhost] *************************************************************************************************************************************************************************************************************************

TASK [Gathering Facts] *******************************************************************************************************************************************************************************************************************
ok: [localhost]

TASK [s3-bucket : Create a bucket with key as directory, in the EU region] ***************************************************************************************************************************************************************
changed: [localhost]

PLAY RECAP *******************************************************************************************************************************************************************************************************************************
localhost                  : ok=2    changed=1    unreachable=0    failed=0

```
