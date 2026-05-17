FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
COPY src ./src

EXPOSE 3000

USER node

CMD ["npm", "start"]
