export const scenarios = {
  smoke: {
    executor: 'constant-vus',
    vus: 1,
    duration: '5s',
    tags: { test_type: 'smoke' },
  },
  load: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '2m', target: 10 },  // Rampa de subida
      { duration: '5m', target: 10 },  // Manter carga
      { duration: '2m', target: 0 },   // Rampa de descida
    ],
    tags: { test_type: 'load' },
  },
  stress: {
    executor: 'ramping-arrival-rate',
    startRate: 1,
    timeUnit: '1m',
    preAllocatedVUs: 50,
    maxVUs: 100,
    stages: [
      { duration: '2m', target: 10 },  // Aumentar taxa de chegada
      { duration: '5m', target: 10 },  // Manter taxa
      { duration: '2m', target: 0 },   // Diminuir taxa
    ],
    tags: { test_type: 'stress' },
  },
  spike: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '10s', target: 50 },  // Pico rápido
      { duration: '1m', target: 50 },   // Manter pico
      { duration: '10s', target: 0 },   // Voltar ao normal
    ],
    tags: { test_type: 'spike' },
  },
};
