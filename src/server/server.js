const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));

const dataPath = path.join(__dirname, "../../data/canciones.json");

const readData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

app.get("/canciones", (req, res) => {
  const canciones = readData();
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const canciones = readData();
  const nuevaCancion = req.body;
  canciones.push(nuevaCancion);
  writeData(canciones);
  res.status(201).json(nuevaCancion);
});

app.delete("/canciones/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  let canciones = readData();
  canciones = canciones.filter((c) => c.id !== id);
  writeData(canciones);
  res.status(204).end();
});

app.put("/canciones/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cancionActualizada = req.body;
  let canciones = readData();
  canciones = canciones.map((c) => (c.id === id ? cancionActualizada : c));
  writeData(canciones);
  res.json(cancionActualizada);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

module.exports = { app, port };
