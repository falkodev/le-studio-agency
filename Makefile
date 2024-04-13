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
	make kill && NODE_ENV=development docker-compose up -d && make logs

prod:
	NODE_ENV=production docker-compose -f docker-compose.production.yml -p studio --compatibility up -d --build

logs:
	docker logs studio-backend -f

ps:
	docker-compose ps

stats:
	docker stats
