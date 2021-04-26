FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /backend
ADD ./WMIAdventure_backend /backend

COPY ./requirements.txt /backend/requirements.txt

RUN pip install -r requirements.txt
RUN python manage.py migrate
COPY . /backend

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
