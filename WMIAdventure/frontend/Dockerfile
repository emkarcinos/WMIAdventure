FROM node:15

WORKDIR /frontend
ADD ./ /frontend

COPY . /frontend

RUN npm install
EXPOSE 80

CMD ["npm", "run", "start", "PORT=80"]
