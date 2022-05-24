#!/bin/sh

curl 127.0.0.1:8080 -I 2>/dev/null|egrep ' [23][0-9][0-9] ' > /dev/null

if [ $? != 0 ];then
  exit 1
fi
