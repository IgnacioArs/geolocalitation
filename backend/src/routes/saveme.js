/* const express = require("express") */
import {Router} from 'express'

//importando los controlladores
import RutaCrtl from '../controllers/RutasControllers.js';

/* const router = express.Router(); */
const router = Router();

//obtener rutas
router.get("/obtenerRutas",RutaCrtl.obtenerRutas)

//insertar ruta
router.post("/insertarRutas",RutaCrtl.insertarRutas)

//obtener una ruta
router.get("/obtenerUnaRuta/:id",RutaCrtl.obtenerUnaRuta)

//actualizar una ruta
router.put("/actualizarUnaRuta/:id",RutaCrtl.actualizarUnaRuta)

//eliminar una ruta
router.delete("/eliminarUnaRuta/:id",RutaCrtl.eliminarUnaRuta)


export default router;