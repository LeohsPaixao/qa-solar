import { check } from "k6";
import http from "k6/http";
import { generateHtmlReport } from "../utils/generatedReportHtml.js";

const scenarios = {
  // Cenário 1: Login bem-sucedido (fluxo ideal)
  login_success: {
    executor: "per-vu-iterations",
    vus: 1,
    iterations: 100,
    maxDuration: "2m",
  },
  // Cenário 2: Login com credenciais inválidas
  login_invalid: {
    executor: "per-vu-iterations",
    vus: 1,
    iterations: 50,
    maxDuration: "1m",
  },
  // Cenário 3: Login sob carga concorrente (usuários simultâneos)
  login_concurrent: {
      executor: "per-vu-iterations",
      vus: 100,
      iterations: 1,
      maxDuration: "2m",
    },
  // Cenário 4: Aumento progressivo (ramp-up/down)
  login_ramp: {
    executor: "ramping-vus",
    startVUs: 0,
    stages: [
      { duration: "30s", target: 20 },
      { duration: "30s", target: 50 },
      { duration: "30s", target: 0 },
    ],
    gracefulRampDown: "30s",
  },
};

const { SCENARIO } = __ENV;

export const options = {
  scenarios: SCENARIO ? { [SCENARIO]: scenarios[SCENARIO] } : scenarios,
  discardResponseBodies: true,
  thresholds: {
    "iterations": ["rate>0.99"],
    "http_req_failed": ["rate<0.01"],
  },
};

function loginUser(email, password) {
  const payload = JSON.stringify({ email, password });
  const params = { headers: { "Content-Type": "application/json" } };
  return http.post(`${__ENV.SERVER_URL || "http://localhost:3001"}/login`, payload, params);
}

export default function () {
  if (__ENV.SCENARIO === 'login_success') {
    const email = "generic@example.com";
    const password = "123456";
    let res = loginUser(email, password);
    check(res, {
      "login bem-sucedido (status 200)": (r) => r.status === 200,
      "tempo de resposta entre 200ms e 500ms": (r) =>
        r.timings.duration >= 200 && r.timings.duration <= 500,
    });
  }

  if (__ENV.SCENARIO === 'login_invalid') {
    const email = "inexistente@example.com";
    const password = "senhaErrada";
    let res = loginUser(email, password);
    check(res, {
      "login inválido (status 400 ou 402)": (r) => r.status === 400 || r.status === 402,
    });
  }

  if (__ENV.SCENARIO === 'login_concurrent' || __ENV.SCENARIO === 'login_ramp') {
    const email = "generic@example.com";
    const password = "123456";
    let res = loginUser(email, password);
    check(res, {
      "status esperado": (r) => r.status === 200,
    });
  }
}

export function handleSummary(data) {
  return {
    "reports/performance-report.html": generateHtmlReport(data),
  };
}