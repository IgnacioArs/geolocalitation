import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Perfil = () => {
  
  const parametro = useParams();

const noConexion = useNavigate();  
const [session,setSession] = useState();

  const guardandoUsuario = () => {
    return JSON.parse(localStorage.getItem('usuario'))
}

  useEffect(() => {
    setSession(guardandoUsuario());


  },[])


  return (
    <div>
      <h1>Este es el perfil</h1>
     
    </div>
  )
}

export default Perfil