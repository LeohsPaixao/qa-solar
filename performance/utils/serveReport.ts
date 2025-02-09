import express from "express";
import open from "open";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, "../reports")));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  open(`http://localhost:${port}/performance-report.html`);
}); 