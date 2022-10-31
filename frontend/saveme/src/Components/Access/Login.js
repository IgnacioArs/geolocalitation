import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBInput}from 'mdb-react-ui-kit';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';


const Login = () => {


  const perfil = useNavigate();
 
   const [email,setEmail] = useState();
   const [contrasena,setContrasena] = useState();
   const [session,setSession] = useState();








const IniciarSesion = async ()=> {
/* console.log(email,contrasena); */
/* 
const respuesta = await axios.get('http://localhost:4000/Registro/'+email) */

if(email === '' || contrasena === ''){
  alert("Existen campos vacios")
}


const respuesta = await axios.get('http://localhost:4000/Registro/'+email)
if(respuesta.data.length){
  const respuestaContra = await axios.get('http://localhost:4000/RegistroPassword/'+email+'/'+contrasena);
  if(respuestaContra.data == 'error'){
    alert("!Error ne la contrasena")
  }else{
    alert("!Se ha logueado correctamente");
    console.log(respuestaContra.data);
    localStorage.setItem('usuario',JSON.stringify(respuesta.data));
    console.log("viendo session");
     perfil('/perfil/'+respuesta.data[0].nombre); 
    window.location.reload(); 
  }
}else{
  alert("!Email no encontrado")
}

}


  return (
    <div>

    <html lang="es">  
    <head>    
        <title>Login Saveme</title>    
        <meta charset="UTF-8"></meta>
        <meta name="title" content="Título de la WEB"></meta>
        <meta name="description" content="Descripción de la WEB"></meta>    
    </head>  
    <body>    
     {/*    <header style={{backgroundColor:"#030a16c7"}}>
            <h1>Título de la WEB</h1>      
        </header>  */}   
        <nav style={{backgroundColor:"#030a16c7"}}>
          {/*   <a href="#">IR SECCIÓN 2</a>
            <a href="#">IR SECCIÓN 3</a> */}
        </nav>
        <section>      
            <article>
                <h2>Acceso  Saveme</h2>
                <p>Ingrese sus datos</p>      
            </article>      
            <MDBContainer className="my-5 gradient-form">

<MDBRow>

  <MDBCol col='6' className="mb-0 bg-dark" style={{borderRadius:20,borderColor:"#000000",border:1}}>
    <div className="d-flex flex-column ms-5 mt-3" >

      <div className="text-center">
        <img src="https://ajhsurveyors.com/wp-content/uploads/2020/11/1-6.jpg"
          style={{width: '185px',borderRadius:20}} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">We are The Lotus DevArs</h4>
      </div>

      <p>Please login to your account</p>


      <MDBInput onChange={(valor) => {setEmail(valor.target.value)}} wrapperClass='mb-0' label='Email address' id='form1' type='email'/>
      <MDBInput onChange={(valor) => {setContrasena(valor.target.value)}} wrapperClass='mb-0' label='Password' id='form2' type='password'/>


      <div className="text-center pt-1 mb-5 pb-1">
        <Button onClick={()=> IniciarSesion()} className="mb-4 w-100 gradient-custom-2 bg-dark">Sign in</Button>
        <a className="text-muted" href="#!">Forgot password?</a>
      </div>

    </div>

  </MDBCol>

  <MDBCol col='6' className="mb-0" style={{backgroundColor:"#0a0a0c",borderRadius:10,opacity:0.9}}>
    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
        <h4 class="mb-4">DIRIGIDO NETAMENTE AL BIEN ESTAR DE LAS PERSONAS.</h4>
        <p class="small mb-0">capacidad para obtener la ubicación geográfica real de un objeto, como un radar, un teléfono móvil o un ordenador conectado a Internet. Uso personal de dispositivo. 
        </p>
      </div>

    </div>

  </MDBCol>
</MDBRow>

</MDBContainer>
        </section>
        <aside style={{backgroundColor:"#030a16c7",height:120}}>
        </aside>
        <p className='text-white' style={{backgroundColor:"#030a16c7"}}>&copy; 2022 DevArs</p>
    </body>  
    </html>
    </div>
  )
}

export default Login
