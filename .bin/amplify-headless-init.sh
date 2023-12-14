#!/usr/bin/env sh
set -e
IFS='|'

AMPLIFY="{\"envName\":\"$1\"}"

AUTHCONFIG="{\
    \"userPoolId\":\"$AMPLIFY_USERPOOL_ID\",\
    \"webClientId\":\"$AMPLIFY_WEBCLIENT_ID\",\
    \"nativeClientId\":\"$AMPLIFY_NATIVECLIENT_ID\"\
    \"identityPoolId\":\"$AMPLIFY_IDENTITYPOOL_ID\"\
    }"

AWSCLOUDFORMATION="{\
    \"configLevel\":\"project\",\
    \"useProfile\":false,\
    \"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
    \"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
    \"region\":\"$AWS_DEFAULT_REGION\"\
    }"

PROVIDERS="{
    \"awscloudformation\":$AWSCLOUDFORMATION
    }"
CATEGORIES="{\
    \"auth\":$AUTHCONFIG\
    }"

amplify init \
  --amplify $AMPLIFY \
  --providers $PROVIDERS \
  --categories $CATEGORIES \
  --yes
