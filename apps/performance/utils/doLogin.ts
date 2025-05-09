import http from "k6/http";
import { baseUrl } from '../config/base';
import { LoginResult } from '../types/types';

export default function doLogin(): LoginResult {
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

  const token = JSON.parse(res.body).token;

  return { token };
}