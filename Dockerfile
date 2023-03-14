FROM node:16-alpine

WORKDIR /app

COPY /package.json /package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate && npm run build

CMD ["npm", "run", "start"]