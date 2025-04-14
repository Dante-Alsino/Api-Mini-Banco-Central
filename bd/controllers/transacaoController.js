const { Transacao, Conta } = require('../models');

exports.criarTransacao = async (req, res) => {
  try {
    const { id: usuarioId } = req.params;
    const { contaId, tipo, valor, descricao } = req.body;

    const conta = await Conta.findOne({ where: { id: contaId, usuarioId } });
    if (!conta) return res.status(404).json({ erro: 'Conta não encontrada' });

    const novaTransacao = await Transacao.create({
      contaId,
      tipo,
      valor,
      descricao
    });

    // Atualiza saldo
    conta.saldo += tipo === 'credito' ? valor : -valor;
    await conta.save();

    res.status(201).json(novaTransacao);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
};