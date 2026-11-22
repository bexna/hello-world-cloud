# Hello World Cloud

A small full-stack Hello World app kept in one repository with the frontend and backend separated into their own folders.

## Project structure

- `frontend/` contains the HTML, CSS, and browser JavaScript.
- `backend/` contains the Node.js HTTP server and its `package.json`.
- `Dockerfile` packages both folders into one deployable web service.
- `oci-cloud-init.sh` installs the app from this public repository on an OCI Linux VM.

The backend serves the frontend files and responds to `GET /api/hello`, so the browser can call the API with the relative URL `fetch("/api/hello")`.

## Run locally

```sh
cd backend
npm start
```

Open `http://localhost:3000`. Set `PORT` to use a different port.

## Run with Docker

Run these commands from the repository root:

```sh
docker build -t hello-world-cloud .
docker run --rm -p 3000:3000 hello-world-cloud
```

## OCI

Use `oci-cloud-init.sh` as the instance cloud-init script. It installs Node.js and Git, downloads this public repository, and starts the backend with systemd on port 3000.
