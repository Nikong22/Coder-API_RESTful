const express = require("express");
const productos = require("./productos.js");

const { Router } = express;

let router = new Router();

class Funciones {
  getSiguienteId = (productos) => {
    let ultimoId = 0;
    productos.forEach((producto) => {
      if (producto.id > ultimoId) {
        ultimoId = producto.id;
      }
    });
    return ++ultimoId;
  };
  inicializar = (productos) => {
    let id = 1
    productos.forEach((producto) => {
      if (!producto.id) {
        producto.id = id++
      }
    });
  }
}
const funciones = new Funciones();
funciones.inicializar(productos)

router.get("/", (req, res) => {
  res.sendFile("/public/index.html")
});

router.get("/productos", (req, res) => {
  if (productos.length == 0) {
    return res.status(404).json({ error: "No hay productos cargados" });
  }
  res.json(productos);
});

router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  const producto = productos.find((producto) => producto.id == id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(producto);
});

router.post("/productos", (req, res) => {
  let { title, price, thumbnail } = req.body;
  let productoNuevo = {
    id: funciones.getSiguienteId(productos),
    title,
    price,
    thumbnail,
  };
  productos.push(productoNuevo);
  res.send("Producto Guardado");
});

router.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  let { title, price, thumbnail } = req.body;
  let producto = productos.find((producto) => producto.id == id);
  if (!producto) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  }
  (producto.title = title), (producto.price = price), (producto.thumbnail = thumbnail)
  res.send("Producto Actualizado");
});

router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
 
  let producto = productos.find((producto) => producto.id == id);
  if (!producto) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  }
  const index = productos.findIndex((producto) => producto.id == id);
  productos.splice(index, 1);
  res.send("Producto Borrado");
});

module.exports = router;
