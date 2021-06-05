FROM python:3

ENV PYTHONUNBUFFERED 1

# From build arg
ARG DB_SOURCE="localhost"
ARG DB_PASSWD="null"
ARG DJANGO_SECRET="django-insecure"
ARG DJANGO_DEBUG="True"

ENV DB_SOURCE ${DB_SOURCE}
ENV DB_PASSWD ${DB_PASSWD}
ENV DJANGO_SECRET ${DJANGO_SECRET}
ENV DJANGO_DEBUG ${DJANGO_DEBUG}

WORKDIR /backend
ADD ./WMIAdventure_backend /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt
RUN python manage.py migrate
COPY . /backend

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
