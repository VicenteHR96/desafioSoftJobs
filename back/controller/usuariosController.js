const {
  registrarUsuarioModel,
  retornarUsuario,
} = require("../models/usuariosModel.js");
const jwt = require("jsonwebtoken");

const registrarUsuarioController = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    await registrarUsuarioModel(email, password, rol, lenguage);
    res.send("Post agregado con éxito");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar al usuario", error: error.message });
  }
};

const autorizarUsuario = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    console.log(`Autorization:${Authorization}`);
    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      throw {
        code: 401,
        message: "Token de autorización no válido",
      };
    }
    const token = Authorization.split("Bearer ")[1];
    console.log(`Token:${token}`);
    if (!token) {
      throw {
        code: 401,
        message: "Token de autorización no válido",
      };
    }
    //Verificar y decodificar el token
    const decodedToken = jwt.verify(token, "az_AZ");
    const { email } = decodedToken;
    // Realizar otras acciones después de verificar el token, como buscar el usuario en la base de datos
    const user = await retornarUsuario(email);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = { registrarUsuarioController, autorizarUsuario };
