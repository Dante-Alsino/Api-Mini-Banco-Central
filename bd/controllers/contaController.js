const { Conta } = require('../models');

exports.criarConta = async (req, res) => {
  try {
    const { id } = req.params; // ID do usuário
    const { instituicaoId, saldo } = req.body;

    const conta = await Conta.create({
      usuarioId: id,
      instituicaoId,
      saldo: saldo || 0,
    });

    res.status(201).json(conta);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};