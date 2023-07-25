const express = require('express');
const router = express.Router();
let setor=
[
  {
      "id":1,
      "nome":"Financeiro"
  },
  {
      "id":2,
      "nome":"Gerência"
  },
  {
      "id":3,
      "nome":"Depto Pessoal"
  },
  {
      "id":4,
      "nome":"Tesouraria"
  }

]

//para consultar todos os dados
router.get('/',(req,res,next)=>{
       
    res.status(200).send({
        mensagem:"aqui é a lista de setor!!!!",
        setor:setor
      })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    let listasetor=setor.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`aqui é a lista de um setor com id:${id}`,
        setor:listasetor
      })
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const setor={
            nome : req.body.nome
          }
          if(usuario.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            } 
        if(i==0){
                    res.status(201).send({
                    mensagem:"Dados Inseridos!",
                    setorCriado:setor 
                     });        
        }else{
                    res.status(400).send({
                    mensagem:msg,  
              }) 
        }
            
        }
      
      
);

router.patch('/',(req,res,next)=>{
     let msg=[];
     let i=0;
     const {id,nome}=req.body;
     const array_alterar = [{
           id:id,
           nome:nome
     }]


     if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
    }

if(i==0){
            res.status(201).send({
            mensagem:"Dados Alterados!",
            dados:usuario
           
             });        
}else{
            res.status(400).send({
            mensagem:msg,  
      }) 
}
    

})
router.delete('/:id',(req,res,next)=>{
  const {id} = req.params;
  let dadosdeletados=setor.filter(value=>value.id==id);
  let listasetor=setor.filter(value=>value.id!=id);
  res.status(201).send({
    mensagem:"Dados deletados com sucesso",
    dadosnovos:listasetor,
    deletados:dadosdeletados
  })
})
module.exports = router;

