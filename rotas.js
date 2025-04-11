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

module.exports = router;