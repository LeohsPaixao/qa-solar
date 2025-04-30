import { check } from "k6";
import { makeRequest } from "../src/utils/http.js";

export function loginUser(email, password) {
  return makeRequest("post", "/auth/login", { email, password });
}

export function testLoginSuccess() {
  const email = "generic@example.com";
  const password = "123456";
  const res = loginUser(email, password);

  check(res, {
    "login bem-sucedido (status 200)": (r) => r.status === 200,
    "tempo de resposta entre 50ms e 200ms": (r) =>
      r.timings.duration >= 50 && r.timings.duration <= 200,
  });
}

export function testLoginInvalid() {
  const email = "inexistente@example.com";
  const password = "senhaErrada";
  const res = loginUser(email, password);

  check(res, {
    "login inválido (status 400 ou 402)": (r) => r.status === 400 || r.status === 402,
  });
}

export function testLoginConcurrent() {
  const email = "generic@example.com";
  const password = "123456";
  const res = loginUser(email, password);

  check(res, {
    "status esperado": (r) => r.status === 200,
  });
} 