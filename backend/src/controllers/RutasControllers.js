const RutaCrtl = {}

//importamos el modelo de la base de datos mongodb
import Schema from '../models/RutasModels.js'



//obtener rutas
RutaCrtl.obtenerRutas = async (req,res) => {
    const Rutas= await Schema.find()
    res.json(Rutas)
}

//insertar rutas
RutaCrtl.insertarRutas = async (req,res) => {
    const {punto,region,user} = req.body;
    console.log("punto inicio",punto);
    console.log("punto llegada",region);
    console.log("usuario",user.user.email);

    //aqui refinamos el codigo
    console.log("punto inicioLatitude",punto.latitude);
    console.log("punto inicioLongitude",punto.longitude);
    console.log("punto llegadaLatitude",region.latitud);
    console.log("punto llegadaLongitude",region.longitud);
    console.log("punto llegadaLatitudeDelta",region.latitudeDelta);
    console.log("punto llegadaLongitudeDelta",region.longitudeDelta);
    
    var iniLatitude = punto.latitude.toString();
    var iniLongitude = punto.longitude.toString();
    var llegaLatitude = region.latitud.toString();
    var llegaLongitude = region.longitud.toString();
    var llegaLatitudeDelta = "0.09"
    var llegaLongitudeDelta = "0.04"

    //relizamos la insercion obteniendo el modelo creando este objeto 
    const nuevaRuta =  new Schema({
        email:user.user.email,
        inicioLatitude:iniLatitude,
        inicioLongitude:iniLongitude,
        llegadaLatitude:llegaLatitude,
        llegadaLongitude:llegaLongitude,
        llegadaLatitudeDelta:llegaLatitudeDelta,
        llegadaLongitudeDelta:llegaLongitudeDelta
    })
    //aqui terminamos de guardar una localizacion y los datos actuales
    console.log("MOSTRANDO LO QUE SE INSERTARA ==>",nuevaRuta)
    nuevaRuta.save();
    res.send("insertar una ruta")
}

//obtener una ruta
RutaCrtl.obtenerUnaRuta = async (req,res) => {
    res.send("obteniendo una ruta")
}

//actualizar una ruta
RutaCrtl.actualizarUnaRuta = async (req,res) =>{
    res.send("actualizar una Ruta")
}

//eliminar una ruta
RutaCrtl.eliminarUnaRuta = async (req,res) =>{
    res.send("eliminar una Ruta")
}


export default RutaCrtl




