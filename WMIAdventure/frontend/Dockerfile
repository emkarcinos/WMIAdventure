### Installs dependencies
FROM node:15 as builder

WORKDIR /frontend
ADD ./package*.json ./

RUN npm install

### Copy installed dependencies with node ownership
FROM node:15
COPY --from=builder --chown=node /frontend /frontend

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL=${API_URL}

WORKDIR /frontend

ADD . .
ENV PATH /frontend/node_modules/.bin:$PATH
EXPOSE 80
ENTRYPOINT ["npm", "start", "PORT=80"]
