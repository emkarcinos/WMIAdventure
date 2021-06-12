FROM python:3

ENV PYTHONUNBUFFERED 1

# From build arg
ARG API_URL="localhost:8000"
ENV API_URL	${API_URL}

WORKDIR /admin
ADD ./ /admin

COPY ./requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt
COPY . /admin

EXPOSE 8001

