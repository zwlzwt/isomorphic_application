BIN ?= node_modules/.bin

run:
	@API_HOST=http://127.0.0.1:4000 nodemon server.js
.PHONY: run
