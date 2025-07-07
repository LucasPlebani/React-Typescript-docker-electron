# sudo apt install make terminal wsl. 
# make commande

docker-build:
	@docker-compose up --build

docker-down:
	@docker-compose down

docker-logs:
	@docker-compose logs

docker-stop:
	@docker-compose stop

docker-start:
	@docker-compose start

docker-restart:
	@docker-compose restart

install-electron:
	@cd electron && npm install

run-electron:
	@cd electron && npm run start
