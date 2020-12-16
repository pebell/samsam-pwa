cd dist/samsam-pwa
../../node_modules/.bin/ws --spa index.html --rewrite '/api/(.*) -> http://localhost:3333/$1' --https -z -v --port 443