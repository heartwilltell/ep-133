# EP-133 Deployment Guide

This document describes the deployment infrastructure for the EP-133 project.

## Architecture Overview

The EP-133 project consists of two main components:

1. **Frontend (Astro)**: Static site deployed to Cloudflare Workers
2. **Backend (Payload CMS)**: Containerized Next.js app deployed to Kubernetes via Helm

## Prerequisites

### For Cloudflare Workers (Frontend)
- Cloudflare account
- Cloudflare API token with Workers permissions
- Domain configured in Cloudflare

### For Kubernetes (Backend)
- Kubernetes cluster (v1.24+)
- Helm 3.x installed
- kubectl configured
- PostgreSQL database (external or in-cluster)
- Persistent storage provisioner (for media files)

### For CI/CD
- GitHub repository with Actions enabled
- Docker registry access (GitHub Container Registry)

## Frontend Deployment (Cloudflare Workers)

### Local Development

```bash
# Install Wrangler CLI
bun add -g wrangler

# Build the frontend
bun run build

# Deploy to Cloudflare
wrangler deploy
```

### Configuration

Edit `wrangler.toml` to configure:
- `name`: Your worker name
- `routes`: Custom domain routing
- `vars.PAYLOAD_URL`: Your CMS API endpoint

### GitHub Actions Deployment

The frontend deploys automatically on push to `main` branch.

Required secrets:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `PAYLOAD_URL`: Production CMS URL
- `PUBLIC_SITE_URL`: Production frontend URL

## Backend Deployment (Kubernetes + Helm)

### Building the Docker Image

```bash
cd cms
docker build -t ep-133-cms:latest .
```

### Local Testing with Docker

```bash
docker run -p 3001:3001 \
  -e DATABASE_URI=postgresql://user:pass@host/db \
  -e PAYLOAD_SECRET=your-secret \
  -e PAYLOAD_URL=http://localhost:3001 \
  -e PUBLIC_SITE_URL=http://localhost:4321 \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=secure-password \
  ep-133-cms:latest
```

### Helm Deployment

#### 1. Configure Values

Create a `values-production.yaml` file:

```yaml
image:
  repository: ghcr.io/your-org/ep-133-cms
  tag: "v1.0.0"

replicaCount: 3

ingress:
  enabled: true
  className: "nginx"
  hosts:
    - host: cms.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: ep-133-cms-tls
      hosts:
        - cms.yourdomain.com

persistence:
  enabled: true
  size: 20Gi
  storageClass: "fast-ssd"

env:
  DATABASE_URI: "postgresql://user:pass@postgres.svc/ep133"
  PAYLOAD_SECRET: "your-super-secret-key-min-32-chars"
  PAYLOAD_URL: "https://cms.yourdomain.com"
  PUBLIC_SITE_URL: "https://yourdomain.com"
  ADMIN_EMAIL: "admin@yourdomain.com"
  ADMIN_PASSWORD: "secure-admin-password"

resources:
  limits:
    cpu: 2000m
    memory: 2Gi
  requests:
    cpu: 1000m
    memory: 1Gi
```

#### 2. Install/Upgrade with Helm

```bash
# Install
helm install ep-133-cms ./helm/ep-133-cms \
  -f values-production.yaml \
  --namespace production \
  --create-namespace

# Upgrade
helm upgrade ep-133-cms ./helm/ep-133-cms \
  -f values-production.yaml \
  --namespace production
```

#### 3. Verify Deployment

```bash
# Check pods
kubectl get pods -n production

# Check service
kubectl get svc -n production

# Check ingress
kubectl get ingress -n production

# View logs
kubectl logs -f deployment/ep-133-cms -n production
```

## Database Setup

### PostgreSQL Requirements

- PostgreSQL 14+ recommended
- Database with proper permissions
- Connection string format: `postgresql://username:password@host:port/database`

### Initial Setup

```bash
# Create database
CREATE DATABASE ep133;
CREATE USER payload WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE ep133 TO payload;

# Payload will auto-migrate on first start
```

## GitHub Actions CI/CD

### CI Pipeline (`ci.yml`)

Runs on every push and PR:
- ✅ Linting with oxlint
- ✅ Type checking
- ✅ Frontend build
- ✅ CMS build
- ✅ Docker build test
- ✅ Helm chart validation

### Deploy Pipeline (`deploy.yml`)

Runs on push to `main` or version tags:
1. Builds and pushes Docker image to GHCR
2. Deploys frontend to Cloudflare Workers
3. Deploys backend to Kubernetes via Helm

### Required GitHub Secrets

```
# Cloudflare
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID

# Kubernetes
KUBE_CONFIG              # Base64 encoded kubeconfig

# Application
DATABASE_URI             # PostgreSQL connection string
PAYLOAD_SECRET           # Min 32 characters
PAYLOAD_URL              # https://cms.yourdomain.com
PUBLIC_SITE_URL          # https://yourdomain.com
ADMIN_EMAIL              # Admin user email
ADMIN_PASSWORD           # Admin user password
CMS_DOMAIN               # cms.yourdomain.com
```

### Setting Up Secrets

```bash
# Encode kubeconfig for GitHub
cat ~/.kube/config | base64 -w 0

# Generate secure payload secret
openssl rand -base64 32
```

## Monitoring and Maintenance

### Health Checks

- Frontend: Cloudflare Workers dashboard
- Backend: `https://cms.yourdomain.com/api/access/verify`

### Logs

```bash
# Kubernetes logs
kubectl logs -f -l app.kubernetes.io/name=ep-133-cms -n production

# Cloudflare logs
wrangler tail
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment ep-133-cms --replicas=5 -n production

# Auto-scaling is enabled by default via HPA
# Scales between 2-10 pods based on CPU/memory
```

### Backups

**Database:**
```bash
pg_dump -h host -U payload ep133 > backup.sql
```

**Media Files:**
```bash
kubectl exec deployment/ep-133-cms -n production -- tar czf - /app/media > media-backup.tar.gz
```

## Troubleshooting

### Frontend Issues

```bash
# Check worker logs
wrangler tail

# Test worker locally
wrangler dev
```

### Backend Issues

```bash
# Check pod status
kubectl describe pod <pod-name> -n production

# Check logs
kubectl logs <pod-name> -n production

# Connect to pod
kubectl exec -it <pod-name> -n production -- /bin/sh

# Check database connectivity
kubectl exec -it <pod-name> -n production -- bun run -e "fetch(process.env.DATABASE_URI)"
```

### Common Issues

**Pod not starting:**
- Check database connection
- Verify environment variables in secret
- Check persistent volume availability

**Media uploads failing:**
- Verify PVC is bound
- Check storage quota
- Verify file permissions (user 1001)

**Performance issues:**
- Increase resource limits
- Check database query performance
- Review HPA settings

## Security Best Practices

1. **Use strong secrets**: Minimum 32 characters for PAYLOAD_SECRET
2. **Enable TLS**: Configure cert-manager for automatic certificates
3. **Network policies**: Restrict pod-to-pod communication
4. **RBAC**: Use minimal service account permissions
5. **Image scanning**: Enable vulnerability scanning in CI
6. **Secret management**: Consider using sealed-secrets or external-secrets
7. **Regular updates**: Keep dependencies and base images updated

## Rollback

### Frontend
```bash
# Cloudflare automatically keeps previous versions
wrangler rollback
```

### Backend
```bash
# Helm rollback
helm rollback ep-133-cms -n production

# Kubernetes rollback
kubectl rollout undo deployment/ep-133-cms -n production
```

## Cost Optimization

1. **Cloudflare Workers**: Generous free tier, scales automatically
2. **Kubernetes**: Use cluster autoscaler and right-size resources
3. **Database**: Use managed PostgreSQL with automatic backups
4. **Storage**: Use appropriate storage class for media files
5. **Container Registry**: GHCR is free for public repos

## Next Steps

1. Configure custom domains in Cloudflare and Kubernetes
2. Set up monitoring (Prometheus, Grafana)
3. Configure log aggregation (Loki, ELK)
4. Set up alerting (AlertManager, PagerDuty)
5. Implement backup automation
6. Configure CDN for media assets
7. Set up staging environment

## Support

For issues and questions:
- GitHub Issues: https://github.com/your-org/ep-133/issues
- Documentation: https://payloadcms.com/docs
- Cloudflare Docs: https://developers.cloudflare.com/workers
