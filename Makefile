start: dev

stop:
	docker-compose stop

kill:
	docker-compose kill

build:
	NODE_ENV=development docker-compose build

rebuild:
	NODE_ENV=development docker-compose build --no-cache

dev:
	make kill && NODE_ENV=development docker-compose up -d && make logs-back

prod:
	NODE_ENV=production docker-compose -f docker-compose.production.yml -p studio --compatibility up -d

logs-back:
	docker logs studio-backend -f

logs-db:
	docker logs studio-db -f

logs:
	make logs-back && make logs-db

ps:
	docker-compose ps

stats:
	docker stats
