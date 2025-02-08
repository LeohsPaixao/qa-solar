import { check, sleep } from "k6";
import http from "k6/http";
import { generateHtmlReport } from "../utils/generatedReportHtml.js";

const SERVER_URL = "http://localhost:3001";

export let options = {
  scenarios: {
    login_scenario: {
      executor: "per-vu-iterations",
      vus: 100,
      iterations: 1,
      maxDuration: "2m",
    },
  },
  thresholds: {
    "http_req_duration": ["p(99)<200"],
    "http_req_duration": ["p(99)<500"],
    "http_req_duration": ["p(99)>500"],
    "http_req_failed": ["rate<0.01"],
  },
};

function loginUser(email, password) {
  const payload = JSON.stringify({ email, password });
  return http.post(`${SERVER_URL}/login`, payload, {
    headers: { "Content-Type": "application/json" },
  });
}

export default function () {
  const email = "generic@example.com";
  const password = "123456";
  const res = loginUser(email, password);

  check(res, {
    "login bem-sucedido (status 200)": (r) => r.status === 200,
    "login mal-sucedido (status 400)": (r) => r.status === 400,
    "tempo de resposta abaixo de 200ms": (r) => r.timings.duration < 200,
    "tempo de resposta entre 200ms e 500ms": (r) =>
      r.timings.duration >= 200 && r.timings.duration <= 500,
    "tempo de resposta acima de 500ms": (r) => r.timings.duration > 500,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/performance-report.html": generateHtmlReport(data),
  };
}