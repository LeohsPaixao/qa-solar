#!/bin/bash

# Atualiza os pacotes disponíveis
sudo apt-get update

# Instala dependências necessárias para o Playwright e bibliotecas extras
sudo apt-get install -y \
    wget \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    libwoff1 \
    libopus0 \
    libwebp6 \
    libwebpdemux2 \
    libenchant1c2a \
    libgudev-1.0-0 \
    libsecret-1-0 \
    libhyphen0 \
    libgles2-mesa \
    libegl1 \
    libfreetype6 \
    libwoff2-1 \
    fonts-liberation \
    libx264-155 \
    libflite1