#!/bin/bash

# Usage: ./path/to/script.sh [Project_Root]

if [ $# -gt 0 ]; then
    PROJECT_ROOT=$1
else
    PROJECT_ROOT="."
fi

CONTAINER_ID_FILE="$PROJECT_ROOT/test/integration/container_id.txt"

rm -f $CONTAINER_ID_FILE > /dev/null

docker run -d -p 8080:5432 \
-e "POSTGRES_PASSWORD=123" \
-e "POSTGRES_DB=test" \
postgres:14-alpine \
> $CONTAINER_ID_FILE

ENV_VAR="$(grep 'DATABASE_URL' $PROJECT_ROOT/.env.test)"
echo Exporting $ENV_VAR
export $ENV_VAR
echo Wait 3s for postgres container to initialize
sleep 3
cd $PROJECT_ROOT && npx prisma migrate deploy