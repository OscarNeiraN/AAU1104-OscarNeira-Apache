const http = require("http");

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/") {
    sendJson(res, 200, {
      message: "API sencilla con Node.js",
      endpoints: ["/", "/health", "/api/saludo"],
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/saludo") {
    sendJson(res, 200, {
      message: "Hola desde Kubernetes",
      service: "apache-demo-api",
    });
    return;
  }

  sendJson(res, 404, {
    error: "Ruta no encontrada",
  });
});

server.listen(PORT, HOST, () => {
  console.log(`API escuchando en http://${HOST}:${PORT}`);
});
