FROM node:18-alpine

WORKDIR /app

# Perbaiki pattern glob untuk package*.json
COPY package*.json ./

RUN npm install

# Perbaiki perintah COPY untuk menyalin semua file
COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "docker"]
