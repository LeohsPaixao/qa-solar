export const baseConfig = {
  discardResponseBodies: true,
  thresholds: {
    "iterations": ["rate>0.99"],
    "http_req_failed": ["rate<0.10"],
  },
};

export const baseUrl = "http://localhost:3001"; 