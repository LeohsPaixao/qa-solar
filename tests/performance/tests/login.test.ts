import { check } from 'k6';
import http from "k6/http";
import { baseUrl } from '../config/base';

export default function login(): void {
  const url = `${baseUrl}/auth/login`;

  const payload = JSON.stringify({
    email: "generic@example.com",
    password: "123456"
  });

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  const params = {
    headers: headers,
    responseType: "text" as const
  }

  const res = http.post(url, payload, params);

  const body = JSON.parse(res.body);

  check(res, {
    'Status é 200': () => res.status === 200,
    'Duração da requisição é menor que 2s': () => res.timings.duration < 2000,
    'A mensagem de sucesso está correta': () => {
      return body.message === "Login realizado com sucesso!"
    },
    'Token de acesso está presente': () => {
      return body.token !== undefined && body.token.length > 0;
    }
  });
}