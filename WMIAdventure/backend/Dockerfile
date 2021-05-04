FROM python:3

ENV PYTHONUNBUFFERED 1

# From build arg
ARG DB_SOURCE="localhost"
ARG DB_PASSWD="null"

ENV DB_SOURCE ${DB_SOURCE}
ENV DB_PASSWD ${DB_PASSWD}

WORKDIR /backend
ADD ./WMIAdventure_backend /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt
RUN python manage.py migrate
COPY . /backend

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
