const { Conta, Instituicao } = require('../models');

exports.getSaldoTotal = async (req, res) => {
  try {
    const { id } = req.params;
    const { instituicao } = req.query;

    const filtro = { where: { usuarioId: id } };

    if (instituicao) {
      filtro.include = [{
        model: Instituicao,
        where: { nome: instituicao }
      }];
    }

    const contas = await Conta.findAll(filtro);

    const saldoTotal = contas.reduce((soma, conta) => soma + conta.saldo, 0);

    res.json({ saldoTotal });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};

const { Transacao, Usuario } = require('../models');

exports.getExtrato = async (req, res) => {
  try {
    const { id } = req.params;
    const { instituicao } = req.query;

    const where = instituicao
      ? { usuarioId: id, '$Conta.Instituicao.nome$': instituicao }
      : { usuarioId: id };

    const transacoes = await Transacao.findAll({
      include: [{
        model: Conta,
        where: { usuarioId: id },
        include: [{ model: Instituicao }]
      }]
    });

    res.json({ transacoes });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};