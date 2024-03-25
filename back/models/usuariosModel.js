const format = require("pg-format");
const bcrypt = require("bcryptjs");
const { pool } = require("../database/connection.js");

const registrarUsuarioModel = async (email, password, rol, lenguage) => {
  const passwordEncriptada = bcrypt.hashSync(password);
  const consulta = format(
    "INSERT INTO usuarios values (DEFAULT, %L, %L, %L, %L)",
    email,
    passwordEncriptada,
    rol,
    lenguage
  );

  const { rows: softjobs } = await pool.query(consulta);
  console.log("Usuario agregado");
};

const retornarUsuario = async (email) => {
  const usuario = format(
    "SELECT email, rol, lenguage FROM usuarios WHERE email=%L",
    email
  );

  const { rows } = await pool.query(usuario);

  return rows;
};

module.exports = { registrarUsuarioModel, retornarUsuario };
