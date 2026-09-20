FROM node:20-alpine

WORKDIR /app

# copy shared folder (used by auth controller)
COPY shared/ ./shared/

# copy auth service source
COPY services/auth/package*.json ./services/auth/
RUN npm install --prefix ./services/auth

COPY services/auth/ ./services/auth/

ENV PORT=10000
EXPOSE 10000

CMD ["node", "services/auth/index.js"]
