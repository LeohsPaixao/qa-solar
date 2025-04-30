export const scenarios = {
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