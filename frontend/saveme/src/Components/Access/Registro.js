import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBInput}from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom'

//ahora para poder comunicarnos con nuestro backend hacemos lo siguiente
import axios from 'axios'

const Registro = () => {

                const redirigir = useNavigate()

                const [nombre,setNombre] = useState()
                const [email,setEmail] = useState()
                const [contrasena,setContrasena] = useState()
                const [contrasenaDos,setContrasenaDos] = useState()


const registroUsuario = async () => {

  const nombreUsuario = await axios.get('http://localhost:4000/NombreUsuario/'+nombre)      
  const respuesta = await axios.get('http://localhost:4000/Registro/'+email)
  if(contrasena===contrasenaDos){
              if(nombre== '' || email == '' || contrasena == ''|| contrasenaDos == ''){
                alert("Existen campos vacios")
              }
              if(nombreUsuario.data.length){
                alert("!Ingrese otro nombre de usuario")
              }else if(respuesta.data.length){
                alert("!Ingrese otro email de usuario")
              }else{
              redirigir("/login")
              alert("!Se ha registrado correctamente")
              await axios.post('http://localhost:4000/Registro',{nombre,email,contrasena})  
              
          
              }
             
  }else{
          alert("Las contraseñas no coinciden")
  }
  
  
  
  
  }



  return (
    <div>

    <html lang="es">  
    <head>    
        <title>Registro Saveme</title>    
        <meta charSet='UTF-8'></meta>
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
                <h2>Registro</h2>
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

      <MDBInput wrapperClass='mb-0' label='Username' id='form1' type='text' name='usuario' onChange={(escrito)=>{setNombre(escrito.target.value)}}></MDBInput>
      <MDBInput wrapperClass='mb-0' label='Email address' id='form1' type='email' name='email' onChange={(escrito)=>setEmail(escrito.target.value)}></MDBInput>
      <MDBInput wrapperClass='mb-0' label='Password' id='form2' type='password' name='contra' onChange={(escrito)=>setContrasena(escrito.target.value)}></MDBInput>
      <MDBInput wrapperClass='mb-0' label='Repeat Password' id='form2' type='password' name='contrados' onChange={(escrito)=>setContrasenaDos(escrito.target.value)}></MDBInput>


      <div className="text-center pt-1 mb-5 pb-1">
        <Button  className="mb-4 w-100 gradient-custom-2 bg-dark" onClick={()=> registroUsuario()}>Sign up</Button>
        <a className="text-muted" href="#!">Forgot password?</a>
      </div>

    </div>

  </MDBCol>

  <MDBCol col='6' className="mb-0" style={{backgroundColor:"#0a0a0c",borderRadius:10,opacity:0.9}}>
    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
        <h4 className="small mb-0">DIRIGIDO NETAMENTE AL BIEN ESTAR DE LAS PERSONAS.</h4>
        <p className='small mb-0'>capacidad para obtener la ubicación geográfica real de un objeto, como un radar, un teléfono móvil o un ordenador conectado a Internet. Uso personal de dispositivo. 
        </p>
      </div>

    </div>

  </MDBCol>
</MDBRow>

</MDBContainer>
        </section>
        <aside style={{backgroundColor:"#030a16c7",height:150}}>
            
        </aside>
        <p className='text-white' style={{background:"#030a16c7"}}>&copy; 2022 DevArs</p>
    </body>  
    
    </html>
    </div>
  )
}

export default Registro