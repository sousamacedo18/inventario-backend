const express = require('express');
const app = express();

app.use("/listausuarios",(req,res,next)=>{
 
      res.status(200).send({
        mensagem:"aqui é a lista de usuários!!!!",
        nome:"carlos"
      })
});
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