import mongoose from "mongoose";
const LaMismaConexion='mongodb://localhost/rutas-app'
const db=process.env.DB_MONGO
const URI = process.env.DB_MONGO? db:LaMismaConexion;

mongoose.connect(URI,{
    useNewUrlParser:true,
   /*  useCreateIndex:true,
    useFindAndModify:true, */
    useUnifiedTopology:true
})

const conexion = mongoose.connection;

conexion.once('open',()=> {
console.log("LA BASE DE DATOS MONGO_DB SE HA CONECTADO!");
})