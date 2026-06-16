import express from "express";

const app = express();

const VERSION = process.env.VERSION || "v1";
const FAIL_MODE = process.env.FAIL_MODE === "true";
const LATENCY_SPIKE = process.env.LATENCY_SPIKE === "true";

app.get("/", (req, res) => {
  res.json({
    message: "Node.js CI/CD Demo App",
    version: VERSION
  });
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