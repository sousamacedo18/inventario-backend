const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
let usuario=
[
  {
      "id":1,
      "nome":"Carlos",
      "email":"sousamacedo18@gmail.com",
      "senha":"123"
  },
  {
      "id":2,
      "nome":"Pedro",
      "email":"pedro@gmail.com",
      "senha":"321"
  },
  {
      "id":3,
      "nome":"João Neto",
      "email":"joaoneto@gmail.com",
      "senha":"123"
  },
  {
      "id":4,
      "nome":"Iarly",
      "email":"iarly@gmail.com",
      "senha":"123"
  },
  {
      "id":5,
      "nome":"Maria Eduarda",
      "email":"mariaeduarda@gmail.com",
      "senha":"123"
  },
  {
      "id":6,
      "nome":"Filipe",
      "email":"filipe@gmail.com",
      "senha":"123"
  },
  {
      "id":7,
      "nome":"Ray",
      "email":"ray@gmail.com",
      "senha":"123"
  },
  {
      "id":8,
      "nome":"Max",
      "email":"max@gmail.com",
      "senha":"123"
  },
  {
      "id":9,
      "nome":"Gabriela",
      "email":"gabriela@gmail.com",
      "senha":"123"
  }
  
]
function validacaoEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//para consultar todos os dados
router.get('/',(req,res,next)=>{
     mysql.getConnection((error,conn)=>{
        conn.query(
          "SELECT * FROM `usuario` ",
          (error,resultado,field)=>{
            conn.release();
            if(error){
             return res.status(500).send({
                error:error,
                response:null
              })
            }
            res.status(200).send({
              mensagem:"aqui é a lista de usuários!!!!",
              usuario:resultado
            
            })
          }
          )
     })  

})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
      conn.query(
        "SELECT * FROM `usuario` where id=?",[id],
        (error,resultado,field)=>{
          conn.release();
          if(error){
           return res.status(500).send({
              error:error,
              response:null
            })
          }
          res.status(200).send({
            mensagem:"aqui é a lista de usuários!!!!",
            usuario:resultado
          
          })
        }
        )
   })  

})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
      let msg=[];
      let i=0;
          
          const usuario={
            nome : req.body.nome,
             email : req.body.email,
             senha : req.body.senha
          }
          if(usuario.nome.length<3){
              msg.push(
                {mensagem:"campo com menos de 3 caracteres!"}
                )
              i++;
            }
            if(validacaoEmail(usuario.email)==false){
            msg.push({mensagem:"E-mail invalido!"})
              i++;   
            }
            if(usuario.senha.length==0){
              msg.push({mensagem:"senha invalida!"})
              i++;                
            }  
        if(i==0){
          mysql.getConnection((error,conn)=>{
            conn.query(
              "INSERT INTO `usuario`(nome,email,senha) values(?,?,?)",
              [usuario.nome,usuario.email,usuario.senha],
              (error,resultado,field)=>{
                conn.release();
                if(error){
                 return res.status(500).send({
                    error:error,
                    response:null
                  })
                }
                res.status(201).send({
                  mensagem:"Cadastro criado sucesso!!!!",
                  usuario:resultado.insertId
                
                })
               }
              )
            }) 
          }    
       }    
     );

router.patch('/',(req,res,next)=>{
     let msg=[];
     let i=0;
     const {id,nome,email,senha}=req.body;
     const array_alterar = [{
           id:id,
           nome:nome,
           email:email,
           senha:senha
     }]
      for(let i=0; i<usuario.length; i++){
          if(usuario.indexOf(usuario[i])===id){
             usuario[i]=array_alterar;
             console.log(array_alterar);
          }
      }

     if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
    }
    if(validacaoEmail(email)==false){
    msg.push({mensagem:"E-mail invalido!"})
      i++;   
    }
    if(senha.length==0){
      msg.push({mensagem:"senha invalida!"})
      i++;                
    }  
if(i==0){
  mysql.getConnection((error,conn)=>{
    conn.query(
      "update usuario set nome=?,email=?,senha=? where id=?",
      [nome,email,senha,id],
      (error,resultado,field)=>{
        conn.release();
        if(error){
         return res.status(500).send({
            error:error,
            response:null
          })
        }
        res.status(201).send({
          mensagem:"Cadastro alterado com sucesso!!!!",
        
        })
       }
      )
    })        
}else{
            res.status(400).send({
            mensagem:msg,  
      }) 
}
    

})
router.delete('/:id',(req,res,next)=>{
  const {id} = req.params;
  // let dadosdeletados=usuario.filter(value=>value.id==id);
  // let listausuario=usuario.filter(value=>value.id!=id);
  mysql.getConnection((error,conn)=>{
    conn.query(
      `DELETE FROM usuario WHERE id=${id}`,
      (error,resultado,field)=>{
        conn.release();
        if(error){
         return res.status(500).send({
            error:error,
            response:null
          })
        }
        res.status(200).send({
          mensagem:"cadastro deletado com sucesso!!!!",
      
        
        })
      }
      )
 }) 
})
module.exports = router;

