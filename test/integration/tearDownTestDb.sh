#!/bin/bash

# Usage: ./path/to/script.sh [Project_Root]

if [ $# -gt 0 ]; then
    PROJECT_ROOT=$1
else 
    PROJECT_ROOT="."
fi

CONTAINER_ID_FILE="$PROJECT_ROOT/test/integration/container_id.txt"

if [ -e $CONTAINER_ID_FILE ]; then
    echo Attempting to shutdown postgres container...
    docker rm -f $(cat $CONTAINER_ID_FILE)
    rm -f $CONTAINER_ID_FILE > /dev/null
    echo Success
fi
