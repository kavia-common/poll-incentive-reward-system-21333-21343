#!/bin/bash
cd /home/kavia/workspace/code-generation/poll-incentive-reward-system-21333-21343/reward_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

