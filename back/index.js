const express = require("express");
const cors = require("cors");
const {
  registrarUsuarioController,
  autorizarUsuario,
} = require("./controller/usuariosController.js");
const {
  verificarCredencialesController,
} = require("./controller/loginController.js");
const app = express();

// <--- Habilitamos CORS
app.use(cors());

app.use(express.json());

//Register

////POST
app.post("/usuarios", registrarUsuarioController);
app.post("/login", verificarCredencialesController);

//GET - VERIFICAR
app.get("/usuarios", autorizarUsuario);

//Listen
app.listen(3000, console.log("Servidor arriba"));
