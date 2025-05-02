import { testLoginConcurrent, testLoginInvalid, testLoginSuccess } from "../tests/login.test.js";
import { baseConfig } from "./config/base.js";
import { scenarios } from "./config/scenarios.js";

const { SCENARIO } = __ENV;

export const options = {
  ...baseConfig,
  scenarios: SCENARIO ? { [SCENARIO]: scenarios[SCENARIO] } : scenarios,
};

export default function () {
  if (__ENV.SCENARIO === 'login_success') {
    testLoginSuccess();
  }

  if (__ENV.SCENARIO === 'login_invalid') {
    testLoginInvalid();
  }

  if (__ENV.SCENARIO === 'login_concurrent' || __ENV.SCENARIO === 'login_ramp') {
    testLoginConcurrent();
  }
}

export function handleSummary(data) {
  return {
    "reports/performance-result.json": JSON.stringify(data, null, 2),
  };
}