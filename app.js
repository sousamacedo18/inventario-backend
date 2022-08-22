const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
const rotaUsuarios = require('./routes/rotaUsuario');
app.use("/usuario",rotaUsuarios);

app.use((req,res,next)=>{
      const erro = new Error("Não encontrado!");
      erro.status(404);
      next(erro);
});
app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        return res.json({
            erro:{
                 mensagem:error.message
            }
        })
})

module.exports = app