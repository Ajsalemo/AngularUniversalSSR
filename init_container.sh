#!/bin/sh

# Start SSH
/usr/sbin/sshd

# Start the application with PM2
pm2 start /app/dist/AngularUniversalSSR/server/main.js --no-daemon -i 0