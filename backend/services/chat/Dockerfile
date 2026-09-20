FROM node:20-alpine

WORKDIR /app

# copy chat service source (no shared dependency)
COPY services/chat/package*.json ./services/chat/
RUN npm install --prefix ./services/chat

COPY services/chat/ ./services/chat/

ENV PORT=10000
EXPOSE 10000

CMD ["node", "services/chat/index.js"]
