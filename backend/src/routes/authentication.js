/* const express = require("express"); */
import { Router } from "express";
import pool from "../database.js";
import jwt from 'jsonwebtoken'

/* 
import mysql from 'mysql'
import {promisify} from 'util'
import encriptacion from "../lib/encriptarContra.js";

 */

/* const data = database: {
    connectionLimit:99,
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'saveme'
} */

/* const pool = mysql.createPool({connectionLimit:99,
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'saveme'});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('LA CONEXION A LA BASE DE DATOS FUE CERRADA');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('LA BASE DE DATOS TIENE A MUCHAS CONEXIONES.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('SE HA PERDIDO LA CONEXION A LA BASE DE DATOS');
    }
  }

  if (connection) connection.release();
  console.log('BASE DE DATOS CONECTADA CON EXITO!');

  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query); */


//aqui requiremos la encriptacion de los usuarios 
/* const {decifrarContra,encriptarContra} = require("../lib/encriptarContra") */
/* import {decifrarContra,encriptarContra} from '../lib/encriptarContra.js' */
//mandamos a buscar a la base de datos 
/* const db = require("../database") */
/* import {pool} from '../database.js' */
import encriptacion from "../lib/encriptarContra.js";
/* const router = express.Router(); */

const router = Router();

//aqui vamos a realizar el logeo de nuestra aplicacion 


router.get("/usuarios",async (req,res) =>{
  const usuario = await pool.query('select * from usuario')
  res.send(usuario)
  console.log(usuario)
})



router.post("/Registro", async (req,res) =>{

//obtendremos los datos del formulario
//params es para 
const {nombre,email,contrasena}  =req.body
const NuevoUsuario = {
    nombre,
    email,
    contrasena
}


NuevoUsuario.contrasena = await encriptacion.encriptarContra(contrasena);

console.log("MOSTRANDO CONTRASEÑA ENCRIPTADA",contrasena,"MOSTRANDO TODOS LOS DATOS OBTENIDOS",NuevoUsuario)

pool.query('insert into usuario set ?',[NuevoUsuario])

})

//verificamos el email si existe
router.get("/Registro/:email", async (req,res) =>{

   const email = req.params.email

   console.log("RECIBIENDO EL EMAIL",email)

const usuarioEmail = await pool.query('select * from usuario WHERE email = ?',[email])
res.send(usuarioEmail)
console.log(usuarioEmail)
   
})

//verificamos si el nombre existe
router.get("/NombreUsuario/:nombre", async (req,res) =>{

  const nombre = req.params.nombre

  console.log("RECIBIENDO EL NOMBRE",nombre)

const usuarioNombre = await pool.query('select * from usuario WHERE nombre = ?',[nombre])
res.send(usuarioNombre)
console.log(usuarioNombre)
  
})

//AQUI VALIDAMOS EL LOGIN COMPLETO AQUI
router.get("/RegistroPassword/:email/:contrasena", async (req,res) =>{

  const email = req.params.email
  const contrasena = req.params.contrasena
  console.log("RECIBIENDO EL EMAIL",email,"RECIBIENDO CONTRASENA",contrasena);

const row = await pool.query('select * from usuario WHERE email = ?',[email])

try {
      if(row.length >0){
          const user = row[0];
          console.log("usuario encontrado","ahora viendo la contrasena del administrador",user.contrasena);
          const validandoContrasena = await encriptacion.decifrarContra(contrasena,user.contrasena);
          if(validandoContrasena){
              console.log("Las contrasena son correctas");
            
              jwt.sign({ElUsuario:user}, 'secretKey' ,{expiresIn: 60 * 60 * 24}, (err,token) =>{
                       
                /* console.log("EL TOQUEN ES",token); */
            return res.json({state:"OK",user,token});
             // OK + JWT + TRUE
             /* res.send({state:"OK",user,token}); */
     
            

            });
          }else{
              console.log("Las contrasena no coinciden");
              res.send('error');
          }
        }else{
        console.log("usuario no encontrado");
      }
} catch (error) {
  console.log("ERROR==>",error)
}

  
})






export default router;