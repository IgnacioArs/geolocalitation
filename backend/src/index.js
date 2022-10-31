//requerimos los modulos
/* const express = require("express") */
import express  from "express";
/* const morgan = require("morgan") */
import morgan from "morgan"
/* const cors = require("cors") */
import cors from "cors"
//requerimos tambien dotenv la cual nos ayudara con la variable de entorno 
import dotenv from 'dotenv'



//importamos las rutas
import AutenticationRoutes from './routes/authentication.js'
import SavemeRoutes from './routes/saveme.js'
//importamos la base de datos mongo
import "./mongoDatabase.js"


//inicializacion
const app = express()

//configuraciones
dotenv.config({path: './.env'})
app.set('port',process.env.PUERTO);



//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

//variables globales 
/* app.use((req,res,next) => {

}) */


/* archivos publico staticos */
/* app.use(express.static(path.join(__dirname,'public'))) */

//routes o  rutas
/* app.use(require("./routes/authentication.js"))
app.use('/saveme',require("./routes/saveme.js")) */
app.use(AutenticationRoutes)
app.use('/saveme',SavemeRoutes)

//arranca el servidor
app.listen(app.get('port'),()=> {
console.log("PUERTO CORRIENDO EN EL SERVIDOR",app.get('port'))
})

