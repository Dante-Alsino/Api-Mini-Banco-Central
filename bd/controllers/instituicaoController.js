const { Instituicao } = require('../models');

exports.criarInstituicao = async (req, res) => {
  try {
    const { nome } = req.body;
    const instituicao = await Instituicao.create({ nome });
    res.status(201).json(instituicao);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};