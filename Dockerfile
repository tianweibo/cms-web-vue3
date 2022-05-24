FROM dockerhub.enbrands.com/devops/nginx:1.16.0
ADD health.sh /health.sh
ADD dist /data/html
