require("dotenv").config();
const express = require("express");
const pool = require('./bd')

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.status = 200;
    res.json({
        mensage: "Funcionando"
    })
});


app.get('/bd', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      console.log(result.rows)
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao executar query:', error);
      res.status(500).send('Erro no servidor');
    }
  });


const port = 3000;
app.listen(port, ()=>{
    console.log(`rodando em localhost:${port}`);
})


// Criar instituição
// POST /instituicoes

// Criar conta
// POST /usuarios/:id/contas

// Adicionar transação
// POST /usuarios/:id/transacoes

// Ver saldos
// GET /usuarios/:id/saldo → mostra o total consolidado
// GET /usuarios/:id/saldo?instituicao=Itau → mostra saldo só do Itaú

// Ver extrato
// GET /usuarios/:id/extrato → mostra todas as transações
// GET /usuarios/:id/extrato?instituicao=BB → filtra por banco