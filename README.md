# Hello World Cloud

A small full-stack Hello World app. The `public/` directory contains the frontend, and `server.js` serves the page and the `/api/hello` backend endpoint.

## Run locally

```sh
npm start
```

Open `http://localhost:3000` in a browser. The server reads the `PORT` environment variable and defaults to port `3000`.

## Container

Build and run with Docker:

```sh
docker build -t hello-world-cloud .
docker run --rm -p 3000:3000 hello-world-cloud
```
