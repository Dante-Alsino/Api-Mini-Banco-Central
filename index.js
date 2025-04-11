require("dotenv").config();
const express = require("express");
const pool = require('./bd')
const rotas = require('./rotas');

const app = express();
app.use(express.json());

app.use('/', rotas)


const port = 3000;
app.listen(port, ()=>{
    console.log(`rodando em localhost:${port}`);
})
