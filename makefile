start:
	npx concurrently \
		"npx @hocuspocus/cli --sqlite" \
		"npx lerna run dev --scope=@docs.plus/demo"


upgrade_dependencies:
	./scripts/update-packages.sh
	@read -p "Do you want to proceed with reinstalling packages? (y/N) " answer; \
	if [ "$$answer" = "y" ] || [ "$$answer" = "Y" ]; then \
		./scripts/reinstall-packages.sh && \
		echo "Running lerna repair..." && \
		npx lerna repair; \
	else \
		echo "Skipping package reinstallation"; \
	fi

