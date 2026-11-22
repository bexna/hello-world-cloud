const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const frontendDirectory = path.join(__dirname, "..", "frontend");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, "http://" + request.headers.host).pathname;
  if (pathname === "/api/hello") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Hello from the backend!", source: "server" }));
    return;
  }
  const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = path.resolve(frontendDirectory, requestedPath);
  if (!filePath.startsWith(frontendDirectory + path.sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(content);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Hello World app listening on port " + port);
});
