FROM python:3

ENV PYTHONUNBUFFERED 1

# From build arg
ARG DB_ADDRESS="localhost"
ARG DB_PASSWD="null"
ARG DJANGO_SECRET="django-insecure"
ARG DJANGO_DEBUG="True"
ARG DB_PORT
ARG DB_USER
ARG DB_NAME


ENV DB_ADDRESS ${DB_ADDRESS}
ENV DB_PASSWD ${DB_PASSWD}
ENV DJANGO_SECRET ${DJANGO_SECRET}
ENV DJANGO_DEBUG ${DJANGO_DEBUG}
ENV DB_PORT ${DB_PORT}
ENV DB_USER	${DB_USER}
ENV DB_NAME	${DB_NAME}

WORKDIR /backend
ADD ./requirements.txt .

RUN pip install -r requirements.txt

ADD ./WMIAdventure_backend/ ./

RUN python manage.py migrate
EXPOSE 8000

CMD ["python3", "manage.py", "migrate", "&&", "python3", "manage.py", "runserver", "0.0.0.0:8000"]
