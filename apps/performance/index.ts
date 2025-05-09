import { scenarios } from './config/scenarios';
import login from './tests/login.test';

const { SCENARIO } = __ENV;

export const options = {
  scenarios: SCENARIO && SCENARIO in scenarios ? { [SCENARIO]: scenarios[SCENARIO as keyof typeof scenarios] } : scenarios,
  discardResponseBodies: true,
  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
    http_req_failed: ['rate<0.10'],
    iterations: ['rate>0.99'],
    vus: ['value>0'],
  }
};

export default function main() {
  const scenarioHandlers = {
    smoke: () => {
      login();
    },
    load: () => {
      login();
    },
    stress: () => {
      login();
    },
    spike: () => {
      login();
    }
  };

  const handler = scenarioHandlers[SCENARIO as keyof typeof scenarioHandlers];

  if (handler) {
    handler();
  }
}

export function handleSummary(data: any) {
  return {
    "reports/performance-result.json": JSON.stringify(data, null, 2),
  };
}