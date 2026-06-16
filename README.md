🚀 CI/CD + Auto Rollback Reliability System (Helm + GitHub Actions)

A production-style DevOps project demonstrating CI/CD automation, Kubernetes deployments via Helm, and automated rollback mechanisms using release history and health checks.

This project simulates real-world SRE (Site Reliability Engineering) practices used in modern cloud-native systems.

🏗️ Architecture Overview
GitHub Push
   ↓
GitHub Actions CI Pipeline
   ↓
npm test + Gitleaks scan
   ↓
Docker Build & Push
   ↓
Helm Deploy (Kubernetes)
   ↓
Health Check (/health)
   ↓
If failure → Helm Rollback to previous stable release
🛠️ Tech Stack
Node.js (ES Modules)
Express.js
Docker (Multi-stage build)
Kubernetes
Helm (Release management + rollback)
GitHub Actions (CI/CD automation)
Gitleaks (Security scanning)
curl (Health checks)
📦 Project Structure
.
├── app/                     # Node.js application
│   ├── server.js
│   ├── package.json
│
├── demo-app/                # Helm chart
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│
├── Dockerfile
├── .github/workflows/
│   └── cicd.yml
└── README.md
🧠 Key Features
✅ CI/CD Pipeline
Automated build on every push to main
Runs unit tests before deployment
Security scan using Gitleaks
Docker image build & push
Helm-based deployment to Kubernetes
🐳 Dockerization
Multi-stage Docker build for optimized image size
Images pushed to Docker Hub using GitHub Secrets
☸️ Kubernetes Deployment (via Helm)
Helm manages application releases
Versioned deployments enable rollback capability
Supports environment-based configuration via values.yaml
🔁 Rollback Strategy (Important Clarification)

This project supports two rollback approaches:

✔ Option 1 (Recommended - Helm Native Rollback)
helm upgrade --install demo-app ./chart \
  --atomic \
  --wait \
  --timeout 5m

If deployment fails:

Helm automatically rolls back to the previous stable release
No manual intervention required
✔ Option 2 (Manual Rollback via History)
helm history demo-app
helm rollback demo-app <revision> --wait

Used when:

You want to demonstrate custom rollback logic in CI/CD pipelines
You are not using --atomic
❤️ Health Monitoring
/health endpoint validates application status
External verification using curl
Used to detect deployment failures
⚙️ CI/CD Pipeline Workflow
GitHub Actions Steps
Checkout code
Install dependencies
Run unit tests
Run Gitleaks security scan
Build Docker image
Push image to registry
Deploy using Helm
Validate health endpoint
Rollback automatically if failure occurs
🧪 Application Endpoints
GET /

Returns application metadata.

{
  "message": "Node.js CI/CD Demo App",
  "version": "v1"
}
GET /health

Used for deployment validation and rollback decision.

{
  "status": "ok"
}

If failure simulation is enabled:

{
  "status": "unhealthy"
}
🔐 Required GitHub Secrets
DOCKERHUB_USER
DOCKERHUB_TOKEN
KUBE_CONFIG
APP_URL

Example:

APP_URL=http://<EC2_PUBLIC_IP>:30010
🚀 How to Run Locally
1. Install dependencies
cd app
npm install
2. Run application
npm start
3. Build Docker image
docker build -t demo-app .
☸️ Deploy with Helm
helm upgrade --install demo-app ./demo-app \
  --set image.repository=<dockerhub-user>/demo-app \
  --set image.tag=latest
📊 What This Project Demonstrates

This project showcases real-world DevOps & SRE skills:

CI/CD automation using GitHub Actions
Secure pipelines with vulnerability scanning
Containerization using Docker
Kubernetes deployments using Helm
Versioned release management
Automatic rollback strategies
Production-style health validation
🔥 Future Improvements
Prometheus + Grafana monitoring
Argo Rollouts (canary deployments)
Slack/Discord failure alerts
Blue-Green deployment strategy
Error-budget based deployment gating
Observability with OpenTelemetry
📌 Author

A DevOps/SRE learning project focused on production-grade CI/CD reliability patterns, automation, and rollback strategies used in real cloud environments.