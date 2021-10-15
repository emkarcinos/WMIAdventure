### Installs dependencies
FROM node:15

ARG USER

USER $USER
WORKDIR /frontend
ADD ./package*.json ./

RUN npm install
RUN chown -R node:node node_modules

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL=${API_URL}

ADD . .
ENV PATH /frontend/node_modules/.bin:$PATH
EXPOSE 80
ENTRYPOINT ["npm", "start", "PORT=80"]
