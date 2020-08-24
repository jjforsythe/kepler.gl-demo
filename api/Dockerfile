FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install python3-pip

RUN pip3 install django
RUN pip3 install djangorestframework
RUN pip3 install django-cors-headers

WORKDIR /app
