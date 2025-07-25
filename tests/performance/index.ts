import { Options } from 'k6/options';
import login from './tests/login.test';
import registerUser from './tests/registerUser.test';
import removeUser from './tests/removeUser.test';
import updateUser from './tests/updateUser.test';
import visualizeUser from './tests/visualizeUser.test';

export const options: Options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function main() {
  login();
  registerUser();
  updateUser();
  visualizeUser();
  removeUser();
}

interface K6SummaryData {
  metrics: {
    [key: string]: {
      values: {
        count?: number;
        rate?: number;
        avg?: number;
        min?: number;
        med?: number;
        max?: number;
        'p(90)'?: number;
        'p(95)'?: number;
      };
    };
  };
}

export function handleSummary(data: K6SummaryData) {
  return {
    'reports/summary.html': htmlReport(data),
    'reports/summary.json': JSON.stringify(data, null, 2),
  };
}

function htmlReport(data: K6SummaryData): string {
  const metrics = data.metrics;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>K6 Performance Test Report</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>Performance Test Results</h1>
        <table>
            <tr>
                <th>Metric</th>
                <th>Count</th>
                <th>Rate</th>
                <th>Average</th>
                <th>Min</th>
                <th>Max</th>
                <th>P(95)</th>
            </tr>
            ${Object.entries(metrics)
              .map(
                ([name, metric]) => `
                <tr>
                    <td>${name}</td>
                    <td>${metric.values.count || 'N/A'}</td>
                    <td>${metric.values.rate || 'N/A'}</td>
                    <td>${metric.values.avg || 'N/A'}</td>
                    <td>${metric.values.min || 'N/A'}</td>
                    <td>${metric.values.max || 'N/A'}</td>
                    <td>${metric.values['p(95)'] || 'N/A'}</td>
                </tr>
            `,
              )
              .join('')}
        </table>
    </body>
    </html>
  `;
}