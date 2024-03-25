const jwt = require("jsonwebtoken");
const { verificarCredenciales } = require("../models/loginModel");

const verificarCredencialesController = async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = { verificarCredencialesController };
