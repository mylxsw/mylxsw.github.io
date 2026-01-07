run:
	npm run dev

build:
	npm run build

push:
	npm run build
	git add --all
	git commit -m "publish"
	git push
