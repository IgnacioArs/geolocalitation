const encriptacion = {} //creamos un objeto helspers
/* const bcrypt = require('bcryptjs') */
import bcrypt from 'bcryptjs'
//y aqui definiremos los metodo para encriptar la contraseña
encriptacion.encriptarContra = async (contra) => {
const saltos = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(contra,saltos); //aqui empezara a realizar la encriptacion de la contraseña y mas los santos 
return hash;
}

//y aqui para decifrar la contraseña
encriptacion.decifrarContra = async (contra,contrasenaEnMysql) => {
            try {
                return await bcrypt.compare(contra,contrasenaEnMysql);
            } catch (error) {
                console.log(error)
            }
}

/* module.exports = encriptacion; */
export default encriptacion;