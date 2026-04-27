# Déploiement NawaQare Backend — Serveur 54.219.14.133

## Prérequis sur le serveur
- Docker + Docker Compose installés
- Git installé
- Port 80 disponible (ou l'ancien Nginx arrêté)

---

## Étape 1 — Cloner le repo

```bash
cd /home/ubuntu   # ou ton dossier préféré
git clone https://github.com/OusmaneSokhona/nawaqare_DoctorWeb.git
cd nawaqare_DoctorWeb/nawaqare_backend
```

---

## Étape 2 — Créer le fichier .env.prod

```bash
nano .env.prod
```

Coller le contenu suivant (mode test, tout est préconfigéré) :

```env
NODE_ENV=production
PORT=3000

POSTGRES_USER=nawaqare
POSTGRES_PASSWORD=e38a830bceb42051aea6c206af4af583
POSTGRES_DB=nawaqare_db
DATABASE_URL=postgresql://nawaqare:e38a830bceb42051aea6c206af4af583@postgres:5432/nawaqare_db

REDIS_PASSWORD=99dc0a89c182bf40162fc725
REDIS_URL=redis://:99dc0a89c182bf40162fc725@redis:6379

JWT_SECRET=dnVA383vewVKM/3Ma9qk2qZIU89B6T5dSbSFLkKlqyHckXGpcYBYIW6h3joZVJTr
JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=604800

MINIO_ACCESS_KEY=nawaqare_minio_b28094ed
MINIO_SECRET_KEY=8889ddb2d8ef274b337d0cd8799e53a310c6e7b5
S3_ENDPOINT=http://minio:9000
S3_BUCKET=nawaqare-documents
S3_ACCESS_KEY=nawaqare_minio_b28094ed
S3_SECRET_KEY=8889ddb2d8ef274b337d0cd8799e53a310c6e7b5

SMS_API_KEY=test_mode_no_sms_sent
SMS_SENDER=NawaQare

PAYMENT_WEBHOOK_SECRET=test_webhook_secret_nawaqare_2026
APIX_API_KEY=test_api_key_mode_demo
APIX_BASE_URL=https://payment.apix.sn

AGORA_APP_ID=test_agora_app_id_demo
AGORA_APP_CERTIFICATE=test_agora_certificate_demo

FRONTEND_URL=http://54.219.14.133
CORS_ORIGINS=http://54.219.14.133,https://nawacaredoctor.netlify.app
SOCKET_CORS_ORIGINS=http://54.219.14.133,https://nawacaredoctor.netlify.app

ADMIN_PHONE=+221700000000
SUPER_ADMIN_PHONE=+221700000001

OTP_MAX_ATTEMPTS=10
OTP_TTL_SECONDS=300
LOGIN_LOCKOUT_ATTEMPTS=10
LOG_LEVEL=debug
```

Sauvegarder : `Ctrl+O` puis `Ctrl+X`

---

## Étape 3 — Vérifier le port de l'ancien backend

```bash
# Trouver sur quel port tourne l'ancien backend Express
sudo netstat -tlnp | grep node
# ou
sudo lsof -i -P -n | grep LISTEN | grep node
```

> Si l'ancien backend tourne sur un port **différent de 5000**, éditer `docker/nginx.conf` :
> ```bash
> nano docker/nginx.conf
> # Chercher "server host.docker.internal:5000" et remplacer 5000 par le bon port
> ```

---

## Étape 4 — Démarrer tous les services

```bash
# Construire et démarrer
docker compose -f docker-compose.prod.yml up -d --build

# Vérifier que tout est up
docker compose -f docker-compose.prod.yml ps
```

---

## Étape 5 — Vérifier le déploiement

```bash
# Santé de l'API NestJS
curl http://localhost:3000/api/v1/health

# Depuis l'extérieur
curl http://54.219.14.133/api/v1/health

# Logs en temps réel
docker compose -f docker-compose.prod.yml logs -f api
```

---

## Comportement en mode test

| Service | Comportement |
|---------|-------------|
| **SMS / OTP** | L'OTP est retourné directement dans la réponse JSON (pas envoyé par SMS) |
| **Paiement APIX** | Le paiement est stubé, il passe automatiquement en `completed` |
| **Téléconsultation Agora** | Le token vidéo est généré mais la session Agora ne fonctionnera pas (clé factice) |
| **Stockage MinIO** | Fonctionne normalement (stockage local sur le serveur) |

---

## Commandes utiles

```bash
# Arrêter
docker compose -f docker-compose.prod.yml down

# Voir les logs d'un service spécifique
docker compose -f docker-compose.prod.yml logs -f api
docker compose -f docker-compose.prod.yml logs -f postgres

# Relancer uniquement l'API après une mise à jour
git pull
docker compose -f docker-compose.prod.yml up -d --build api

# Accéder à la console MinIO (stockage documents)
# http://54.219.14.133:9001
# Login : nawaqare_minio_b28094ed / 8889ddb2d8ef274b337d0cd8799e53a310c6e7b5
```
