const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".jpg")
  }
});

const upload = multer({ storage: storage });
//para consultar todos os dados
router.get('/',(req,res,next)=>{
     mysql.getConnection((error,conn)=>{
        conn.query(
          "SELECT * FROM `register` ",
          (error,resultado,field)=>{
            conn.release();
            if(error){
             return res.status(500).send({
                error:error,
                response:null
              })
            }
            res.status(200).send({
              mensagem:"aqui é a lista de Registros!!!!",
              register:resultado
            
            })
          }
          )
     })  

})

router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
      conn.query(
        "SELECT * FROM `register` where id=?",[id],
        (error,resultado,field)=>{
          conn.release();
          if(error){
           return res.status(500).send({
              error:error,
              response:null
            })
          }
          res.status(200).send({
            mensagem:"aqui é a lista de registros!!!!",
            register:resultado
          
          })
        }
        )
   })  

});



router.post('/', upload.fields([{ name: 'primeiraFoto', maxCount: 1 }, { name: 'segundaFoto', maxCount: 1 }]), (req, res, next) => {
  const dados = req.body;

  const primeiraFoto = req.files.primeiraFoto;
  const segundaFoto = req.files.segundaFoto;
 
  mysql.getConnection((error, conn) => {
    if (error) {
       return res.status(500).send({
        error: error,
        response: null
      });
    }
    
    const sql = 'INSERT INTO register (conservacao, uso, acesso, primeiraFoto, segundaFoto, latitude, longitude, redesocial, id_user, locale, email, name, picture) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    const values = [
      dados.conservacao,
      dados.uso,
      dados.acesso,
      primeiraFoto[0].filename,
      segundaFoto[0].filename,
      dados.latitude,
      dados.longitude,
      dados.redesocial,
      dados.id,
      dados.locale,
      dados.email,
      dados.name,
      dados.picture
    ];
  
    conn.query(sql, values, (error, resultado, fields) => {
      conn.release();
      if (error) {
       console.log(error);
       
        return res.status(500).send({
          error: error,
          response: null
        });
      }
      
      // Mover os arquivos de imagem para a pasta assets/img
      const imgDir = path.join(__dirname, '../assets/img');
      fs.mkdirSync(imgDir, { recursive: true });

      const primeiraFotoPath = path.join(imgDir, primeiraFoto[0].filename);
      const segundaFotoPath = path.join(imgDir, segundaFoto[0].filename);

      fs.renameSync(primeiraFoto[0].path, primeiraFotoPath);
      fs.renameSync(segundaFoto[0].path, segundaFotoPath);
      
      res.status(201).send({
        mensagem: "Success!!!!",
        register: resultado.insertId
      });
    });
  });
});


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

