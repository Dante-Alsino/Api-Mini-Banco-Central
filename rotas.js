require("dotenv").config();
const express = require('express');
const router = express.Router();
const pool = require('./bd')

router.get('/', (req,res)=>{
    res.statusCodetus=200;
    res.json({mensage:"funcionando"})
})

router.get('/bd', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log(result.rows)
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao executar query:', error);
      res.status(500).send('Erro no servidor');
    }
  });
  


const testeController = require('./bd/controllers/testeController');
router.get('/teste', testeController.cadastrarUsuarioTeste);

const instituicaoController = require('./bd/controllers/instituicaoController');
router.post('/instituicoes', instituicaoController.criarInstituicao);

const contaController = require('./bd/controllers/contaController');
router.post('/usuarios/:id/contas', contaController.criarConta);

const transacaoController = require('./bd/controllers/transacaoController');
router.post('/usuarios/:id/transacoes', transacaoController.criarTransacao);


const usuarioController = require('./bd/controllers/usuarioController');
router.get('/usuarios/:id/saldo', usuarioController.getSaldoTotal);

router.get('/usuarios/:id/extrato', usuarioController.getExtrato);

module.exports = router;