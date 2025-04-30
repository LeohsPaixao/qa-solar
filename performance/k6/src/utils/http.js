import http from "k6/http";
import { baseUrl } from "../config/base.js";

export function makeRequest(method, endpoint, payload = null, headers = {}) {
  const url = `${baseUrl}${endpoint}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  switch (method.toLowerCase()) {
    case "get":
      return http.get(url, params);
    case "post":
      return http.post(url, JSON.stringify(payload), params);
    case "put":
      return http.put(url, JSON.stringify(payload), params);
    case "delete":
      return http.del(url, params);
    default:
      throw new Error(`Método HTTP não suportado: ${method}`);
  }
} 