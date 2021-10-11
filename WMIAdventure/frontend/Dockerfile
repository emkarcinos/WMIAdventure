### Installs dependencies
FROM node:15 as frontend-builder

WORKDIR /frontend
COPY . .

RUN npm install

### Runs frontend
FROM node:15 as frontend

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL=${API_URL}

VOLUME ["/frontend"]
COPY --from=frontend-builder /frontend /frontend

WORKDIR /frontend
EXPOSE 80
ENTRYPOINT ["npm", "start", "PORT=80"]
