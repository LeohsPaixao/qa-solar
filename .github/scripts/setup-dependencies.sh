#!/bin/bash

# Atualiza os pacotes disponíveis
sudo apt update

# Instala dependências necessárias para o Playwright e navegadores
sudo apt install -y \
    wget \
    unzip \
    xvfb \
    libxi6 \
    libwoff1 \
    libopus0 \
    libwebp-dev \
    libenchant-2-2 \
    libsecret-1-0 \
    libhyphen0 \
    libegl1 \
    libfreetype6 \
    fonts-liberation \
    libflite1