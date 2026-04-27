.PHONY: help up down dev migrate seed reset logs ps build

# ─── Couleurs ─────────────────────────────────────────────────────────────────
GREEN  := \033[0;32m
YELLOW := \033[1;33m
CYAN   := \033[0;36m
RESET  := \033[0m

help: ## Affiche cette aide
	@echo "$(CYAN)NawaQare Backend$(RESET)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(RESET) %s\n", $$1, $$2}'

# ─── Infrastructure ──────────────────────────────────────────────────────────
up: ## Démarrer PostgreSQL + Redis + MinIO
	@echo "$(YELLOW)▶ Démarrage des services...$(RESET)"
	docker compose up -d
	@echo "$(GREEN)✅ Services démarrés$(RESET)"
	@echo "   PostgreSQL : localhost:5432"
	@echo "   Redis      : localhost:6379"
	@echo "   MinIO API  : http://localhost:9000"
	@echo "   MinIO UI   : http://localhost:9001  (nawaqare_minio / nawaqare_minio_secret)"

down: ## Arrêter les services
	docker compose down

ps: ## Statut des services
	docker compose ps

logs: ## Logs des services (Ctrl+C pour quitter)
	docker compose logs -f

# ─── Base de données ─────────────────────────────────────────────────────────
migrate: ## Appliquer les migrations Prisma
	@echo "$(YELLOW)▶ Application des migrations...$(RESET)"
	npx prisma migrate deploy
	@echo "$(GREEN)✅ Migrations appliquées$(RESET)"

migrate-dev: ## Créer et appliquer une nouvelle migration (dev)
	npx prisma migrate dev

migrate-reset: ## Réinitialiser la base de données (ATTENTION: supprime toutes les données)
	@echo "$(YELLOW)⚠️  Réinitialisation de la base de données...$(RESET)"
	npx prisma migrate reset --force
	@echo "$(GREEN)✅ Base réinitialisée$(RESET)"

seed: ## Insérer les données de test
	@echo "$(YELLOW)▶ Insertion des données de test...$(RESET)"
	npx ts-node prisma/seed.ts
	@echo "$(GREEN)✅ Seed terminé$(RESET)"

studio: ## Ouvrir Prisma Studio (UI base de données)
	npx prisma studio

# ─── Application ─────────────────────────────────────────────────────────────
install: ## Installer les dépendances
	npm install

generate: ## Régénérer le client Prisma
	npx prisma generate

build: ## Builder l'application
	npm run build

dev: ## Démarrer en mode développement (hot-reload)
	@echo "$(YELLOW)▶ Démarrage en mode développement...$(RESET)"
	npm run start:dev

start: ## Démarrer en mode production
	npm run start:prod

# ─── Raccourcis ──────────────────────────────────────────────────────────────
setup: install up ## Installation complète (deps + services)
	@echo "$(YELLOW)▶ Attente démarrage PostgreSQL (5s)...$(RESET)"
	@sleep 5
	@$(MAKE) migrate
	@$(MAKE) seed
	@echo ""
	@echo "$(GREEN)🎉 NawaQare prêt!$(RESET)"
	@echo "   Démarrer l'API: make dev"
	@echo "   Swagger UI:     http://localhost:3000/api/docs"

reset: down ## Reset complet (services + données)
	docker compose down -v
	@$(MAKE) up
	@sleep 5
	@$(MAKE) migrate
	@$(MAKE) seed

lint: ## Linter le code
	npm run lint

test: ## Lancer les tests
	npm test
