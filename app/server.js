import express from "express";

const app = express();

const VERSION = process.env.VERSION || "v1";
const FAIL_MODE = process.env.FAIL_MODE === "true";
const LATENCY_SPIKE = process.env.LATENCY_SPIKE === "true";

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Node CI/CD App</title>

    <style>
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        text-align: center;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
      }

      .card {
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        margin-bottom: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      }

      .buttons a {
        display: inline-block;
        margin: 10px;
        padding: 10px 20px;
        background: #3b82f6;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: 0.3s;
      }

      .buttons a:hover {
        background: #2563eb;
        transform: scale(1.05);
      }
    </style>

  </head>

  <body>
    <div class="container">
      <h1>🚀 Node.js CI/CD Demo App</h1>

      <div class="card">
        <p><b>Version:</b> "v2"}</p>
        <p><b>Status:</b> Running</p>
      </div>

      <div class="buttons">
        <a href="/health">Health</a>
        <a href="/metrics">Metrics</a>
      </div>
    </div>
  </body>
  </html>
  `);
});

// Health endpoint for Prometheus / K8s
app.get("/health", async (req, res) => {
  if (LATENCY_SPIKE) {
    await new Promise(r => setTimeout(r, 3000)); // simulate latency issue
  }

  if (FAIL_MODE) {
    return res.status(500).json({ status: "unhealthy" });
  }

  res.json({ status: "ok", version: VERSION });
});

// Metrics-like endpoint (simple simulation)
app.get("/metrics", (req, res) => {
  res.type("text/plain");
  res.send(`
app_requests_total 1024
app_errors_total ${FAIL_MODE ? 100 : 2}
`);
});

app.listen(3000, () => {
  console.log(`App running on port 3000 | version=${VERSION}`);
});