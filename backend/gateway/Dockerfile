FROM node:20-alpine

WORKDIR /app

# copy shared folder (used by gateway auth middleware)
COPY shared/ ./shared/

# copy gateway source
COPY gateway/package*.json ./gateway/
RUN npm install --prefix ./gateway

COPY gateway/ ./gateway/

ENV PORT=10000
EXPOSE 10000

CMD ["node", "gateway/index.js"]
