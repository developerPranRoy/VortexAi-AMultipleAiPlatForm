FROM node:20-alpine

WORKDIR /app

# copy shared folder (used by agent controller and memory)
COPY shared/ ./shared/

# copy agent service source
COPY services/agent/package*.json ./services/agent/
RUN npm install --prefix ./services/agent

COPY services/agent/ ./services/agent/

ENV PORT=10000
EXPOSE 10000

CMD ["node", "services/agent/index.js"]
