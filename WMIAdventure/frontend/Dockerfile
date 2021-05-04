FROM node:15

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL=${API_URL}

WORKDIR /frontend
ADD ./ /frontend

COPY . /frontend

RUN npm install
EXPOSE 80

CMD ["npm", "run", "start", "PORT=80"]
