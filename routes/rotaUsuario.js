const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"aqui é a lista de usuários!!!!",
        nome:"carlos"
      })
})
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        mensagem:`aqui é a lista de um usuário com id:${id}`,
        nome:"carlos"
      })
})
router.post('/',(req,res,next)=>{
    
})

module.exports = router;

