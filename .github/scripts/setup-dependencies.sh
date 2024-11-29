#!/bin/bash

# Atualiza os pacotes disponíveis
sudo apt-get update

# Instala dependências necessárias para o Playwright e navegadores
sudo apt-get install -y \
    wget \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    libwoff1 \
    libopus0 \
    libwebp-dev \
    libenchant-2-2 \
    libsecret-1-0 \
    libhyphen0 \
    libgles2-mesa \
    libegl1 \
    libfreetype6 \
    fonts-liberation \
    libflite1