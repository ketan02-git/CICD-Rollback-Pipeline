# CI/CD + Auto Rollback Reliability System (Helm + GitHub Actions)

A production-style DevOps project demonstrating **CI/CD automation, Helm-based deployments, and automated rollback using release history**. This project simulates real-world SRE practices used in modern cloud platforms.

---

## 🚀 Architecture Overview

```text
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
Health Check
   ↓
If failure → Helm Rollback (previous stable release)
```

---

## 🛠️ Tech Stack

* Node.js (ES Modules)
* Express.js
* Docker (Multi-stage build)
* Kubernetes
* Helm (Release management + rollback)
* GitHub Actions (CI/CD)
* Gitleaks (Security scanning)
* curl (Health checks)

---

## 📦 Project Structure

```text
.
├── app/                    # Node.js application
│   ├── server.js
│   ├── package.json
│
├── demo-app/         # Helm chart
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
```

---

## 🧠 Key Features

### ✅ CI/CD Pipeline

* Automated build on every push to `main`
* Runs unit tests before deployment
* Security scan using **Gitleaks**

### 🐳 Dockerization

* Multi-stage Docker build for optimized image size
* Pushed to Docker Hub using GitHub Secrets

### ☸️ Kubernetes Deployment (via Helm)

* Helm manages application deployment
* Versioned releases for rollback capability

### 🔁 Auto Rollback System

* If health check fails:

  * Fetch previous Helm release revision
  * Automatically rollback to stable version

### ❤️ Health Monitoring

* Simple `/health` endpoint validation
* External service verification via `curl`

---

## ⚙️ CI/CD Pipeline Workflow

### GitHub Actions Steps

1. Checkout code
2. Install dependencies
3. Run tests
4. Run Gitleaks scan
5. Build Docker image
6. Push Docker image to registry
7. Deploy using Helm
8. Run health check
9. If failure → Helm rollback

---

## 🧪 Application Endpoints

### GET `/`

Returns app info.

```json
{
  "message": "Node.js CI/CD Demo App",
  "version": "v1"
}
```

---

### GET `/health`

Used for deployment validation.

```json
{
  "status": "ok"
}
```

---

## 🔁 Helm Rollback Strategy

Rollback is handled using Helm release history:

```bash
helm history demo-app
helm rollback demo-app <revision> --wait
```

If health check fails after deployment, pipeline automatically:

* Detects failure
* Finds previous stable revision
* Rolls back safely

---

## 🔐 Required GitHub Secrets

```text
DOCKERHUB_USER
DOCKERHUB_TOKEN
KUBE_CONFIG
APP_URL
```

Example:

```text
APP_URL=http://<EC2_PUBLIC_IP>:30010
```

---

## 🚀 How to Run Locally

### 1. Install dependencies

```bash
cd app
npm install
```

### 2. Run app

```bash
npm start
```

### 3. Build Docker image

```bash
docker build -t demo-app .
```

---

## ☸️ Deploy with Helm

```bash
helm upgrade --install demo-app ./helm/demo-app \
  --set image.repository=<dockerhub-user>/demo-app \
  --set image.tag=latest
```

---

## 📊 What This Project Demonstrates

This project showcases real-world DevOps & SRE skills:

* CI/CD automation with GitHub Actions
* Secure software delivery (Gitleaks)
* Containerization with Docker
* Kubernetes deployment with Helm
* Release versioning
* Automated rollback system
* Production-style health validation

---

## 🔥 Future Improvements

* Prometheus + Grafana monitoring
* Canary deployments (Argo Rollouts)
* Slack/Discord alerts on failure
* Blue-Green deployment strategy
* Error-budget based deployment gating

---

## 📌 Author

DevOps / SRE Learning Project
Focused on production-grade CI/CD reliability patterns