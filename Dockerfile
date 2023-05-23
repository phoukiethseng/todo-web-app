FROM node:16-alpine

RUN apk update

WORKDIR /app

COPY /package.json /package-lock.json ./prisma/schema.prisma ./

RUN npm ci && npx prisma generate && rm -f schema.prisma

CMD ["npm", "run", "dev"]