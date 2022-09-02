const express = require('express');
const router = express.Router();
const empresa=
[
  {
      "id":1,
      "nome":"Inovare",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":2,
      "nome":"Best Place",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":3,
      "nome":"Cultura Store",
      "responsavel":"joao",
      "contato":"9999-0000"
  },
  {
      "id":4,
      "nome":"Iarly Software S/A",
      "responsavel":"iarly@gmail.com",
      "contato"    :"123"
  },
  {
      "id":5,
      "nome":"Requint",
      "email":"mariaeduarda@gmail.com",
      "contato":"123"
  },
  {
      "id":6,
      "nome":"Digimund",
      "responsavel":"filipe@gmail.com",
      "contato":"123"
  },
  {
      "id":7,
      "nome":"RaInfo",
      "responsavel":"ray@gmail.com",
      "contato":"123"
  },
  {
      "id":8,
      "nome":"MaxHand",
      "responsavel":"max@gmail.com",
      "contato":"123"
  },
  {
      "id":9,
      "nome":"King & Queen",
      "responsavel":"gabriela@gmail.com",
      "contato":"123"
  }
  
]

//para consultar todos os dados
router.get('/',(req,res,next)=>{
       
    res.status(200).send({
        mensagem:"aqui é a lista de empresas!!!!",
        empresa:empresa

      })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    let listaempresas=empresa.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`aqui é a lista de um empresa com id:${id}`,
        usuario:listaempresas
      })
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const empresa={
            nome : req.body.nome,
             responsavel : req.body.responsavel,
             contato : req.body.contato
          }
          if(empresa.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            }

            if(empresa.contato.length==0){
              msg.push({mensagem:"contato invalido!"})
              i++;                
            }  
        if(i==0){
                    res.status(201).send({
                    mensagem:"Dados Inseridos!",
                    empresaCriada:empresa 
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
     const {id,nome,responsavel,contato}=req.body;
    let lista= usuario.map(item=> {
      
        return(
                item.nome=nome,
                item.responsavel=responsavel,
                item.contato=contato
              )
      
     
    });


     if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
    }

    if(contato.length==0){
      msg.push({mensagem:"contato invalido!"})
      i++;                
    }  
if(i==0){
            res.status(201).send({
            mensagem:"Dados Alterados!",
            dados:lista
           
             });        
}else{
            res.status(400).send({
            mensagem:msg,  
      }) 
}
    

})
router.delete('/:id',(req,res,next)=>{
  const {id} = req.params;
  let dadosdeletados=usuario.filter(value=>value.id==id);
  let listaempresas=usuario.filter(value=>value.id!=id);
  res.status(201).send({
    mensagem:"Dados deletados com sucesso",
    dadosnovos:listaempresas,
    deletados:dadosdeletados
  })
})
module.exports = router;

