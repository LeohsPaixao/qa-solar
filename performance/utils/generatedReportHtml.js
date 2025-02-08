export function generateHtmlReport(data) {
  function formatMetric(value) {
    return typeof value === "number" ? value.toFixed(2) : "N/A";
  }

  function formatDurationInSeconds(value) {
    return typeof value === "number" ? (value / 1000).toFixed(2) : "N/A";
  }

  function getMetric(metric, key) {
    if (metric && typeof metric[key] === "number") {
      return metric[key];
    } else if (metric && metric.values && typeof metric.values[key] === "number") {
      return metric.values[key];
    }
    return undefined;
  }

  let html = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>Relatório de Teste de Performance K6</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; }
        h1, h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
        details { margin-top: 20px; background-color: #fff; border: 1px solid #ccc; padding: 10px; }
        pre { background-color: #eef; padding: 10px; border: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h1>Relatório de Teste de Performance K6</h1>
      
      <h2>Resumo Geral</h2>
      <table>
        <tr>
          <th>Métrica</th>
          <th>Valor</th>
        </tr>`;

  if (data.metrics) {
    const metrics = data.metrics;
    if (metrics.http_req_duration) {
      html += `<tr>
                  <td>Duração Média das Requisições (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.http_req_duration, "avg"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Duração Mínima das Requisições (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.http_req_duration, "min"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Duração Máxima das Requisições (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.http_req_duration, "max"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Percentil 95 das Requisições (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.http_req_duration, "p(95)"))}</td>
                </tr>`;
    } else {
      html += `<tr><td colspan="2">Nenhum dado de duração de requisições encontrado.</td></tr>`;
    }
    if (metrics.checks) {
      const rate =
        typeof getMetric(metrics.checks, "rate") === "number"
          ? (getMetric(metrics.checks, "rate") * 100).toFixed(2)
          : "N/A";
      html += `<tr>
                  <td>Taxa de Checks Bem-Sucedidos (%)</td>
                  <td>${rate}%</td>
                </tr>`;
    } else {
      html += `<tr><td colspan="2">Nenhum dado de checks encontrado.</td></tr>`;
    }
    if (metrics.iterations) {
      html += `<tr>
                  <td>Total de Iterações</td>
                  <td>${getMetric(metrics.iterations, "count") || "N/A"}</td>
                </tr>`;
    } else {
      html += `<tr><td colspan="2">Nenhum dado de iterações encontrado.</td></tr>`;
    }
    if (metrics.iteration_duration) {
      html += `<tr>
                  <td>Duração Média das Iterações (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.iteration_duration, "avg"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Duração Mínima das Iterações (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.iteration_duration, "min"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Duração Máxima das Iterações (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.iteration_duration, "max"))}</td>
                </tr>`;
      html += `<tr>
                  <td>Percentil 95 das Iterações (s)</td>
                  <td>${formatDurationInSeconds(getMetric(metrics.iteration_duration, "p(95)"))}</td>
                </tr>`;
    } else {
      html += `<tr><td colspan="2">Nenhum dado de duração de iterações encontrado.</td></tr>`;
    }
    if (metrics.http_reqs) {
      html += `<tr>
                  <td>Total de Requisições HTTP</td>
                  <td>${getMetric(metrics.http_reqs, "count") || "N/A"}</td>
                </tr>`;
    }
    if (metrics.vus) {
      html += `<tr>
                  <td>Quantidade de VUs</td>
                  <td>${getMetric(metrics.vus, "value") || "N/A"}</td>
                </tr>`;
    }
  } else {
    html += `<tr><td colspan="2">Nenhum dado de métricas encontrado.</td></tr>`;
  }

  html += `
      </table>
      
      <h2>Detalhes Adicionais</h2>
      <p>A seguir, estão os detalhes completos das métricas. Você pode expandir para visualizar toda a estrutura dos dados:</p>
      <details>
        <summary>Clique aqui para ver os detalhes</summary>
        <pre>${JSON.stringify(data.metrics || {}, null, 2)}</pre>
      </details>
      
      <h2>Informações Complementares</h2>
      <p><strong>Data do Relatório:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Versão do k6:</strong> ${data.version || "N/A"}</p>
      <p><strong>Opções de Execução:</strong></p>
      <pre>${data.options ? JSON.stringify(data.options, null, 2) : "N/A"}</pre>
      
    </body>
  </html>`;

  return html;
}