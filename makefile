BIN_DIR ?= node_modules/.bin
P="\\033[32m[+]\\033[0m"

help:
	@echo "\033[33mmake dev\033[0m - start dev servers"
	@echo "\033[33mmake build\033[0m - build distribution package files"

# build webpacks client side needed
build: clean 
	@echo "Check dependencies of the project"
	yarn
	@echo "$(P) Build distribution package files"
	NODE_ENV=production $(BIN_DIR)/babel src --out-dir dist

clean:
	@echo $(P) Clean dist
	$(BIN_DIR)/rimraf dist/

publish: build
	npm publish

.PHONY: help build
