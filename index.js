const express = require("express");
const routes = require("./routes")

const app = express();
const PORT = 8080;
const http = require("http").Server(app);

let server;
server = http.listen(PORT, () =>
  console.log(`Servidor HTTP escuando en el puerto ${PORT}`)
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes)

