#!/bin/bash

wait_until() {
  local target=$1
  local max_retries=${2:-30}
  local interval=${3:-2}

  if [[ -z "$target" ]]; then
    echo "Uso: wait_until <host:porta> [max_retries] [interval]"
    return 1
  fi

  echo "Aguardando o processo em $target ficar disponível..."
  local retries=0

  while [[ $retries -lt $max_retries ]]; do
    if curl -s --head "http://${target}" | grep "200 OK" > /dev/null; then
      echo "O processo em $target está disponível!"
      return 0
    fi

    retries=$((retries + 1))
    echo "Tentativa $retries de $max_retries... Aguardando $interval segundos."
    sleep $interval
  done

  echo "Erro: O processo em $target não ficou disponível após $max_retries tentativas."
  return 1
}