### Installs dependencies
FROM node:15

WORKDIR /frontend
ADD ./package*.json ./

RUN npm install

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL=${API_URL}

ADD . .

EXPOSE 80
ENTRYPOINT ["npm", "start", "PORT=80"]
