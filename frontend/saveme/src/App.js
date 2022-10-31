import logo from './logo.svg';
import './App.css';
//importamos react-router-dom
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
//IMPORTAMOS LOS COMPONENTES
import NavbarRoutes from './Layouts/NavbarRoutes';
import Contact from './Components/Contact';
import About from './Components/About';
import Home from './Components/Home';
//componentes de acceso
import Login from './Components/Access/Login';
import Registro from './Components/Access/Registro';
import Perfil from './Components/Access/Perfil';
import { useEffect, useState } from 'react';





function App() {

  const [session,setSession] = useState();


  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem('usuario')));

  },[])

  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            {session?(<>         
          <Route path='/' element={<NavbarRoutes/>}>
          {/*   session realizada */}
          <Route path='/perfil/:token' element={<Perfil/>} />
            {/*  RUTAS DE ACCESO */}
     {/*        <Route path='registro' element={<Registro/>} />
            <Route path='login' element={<Login/>} /> */}
             {/*  LAS OTRAS RUTAS */}
          {/*   <Route path='about' element={<About/>} />
            <Route path='home' element={<Home/>} />
            <Route path='contact' element={<Contact/>}/> */}
            {/*   RUTAS QUE NO EXISTEN */}
            <Route path='*' element={<Navigate replace to={"/perfil/"+`${session[0].nombre}`}/>}/>
            </Route></>):(<>         
          <Route path='/' element={<NavbarRoutes/>}>
          {/*   session realizada */}
          <Route path='/perfil/:token' element={<Perfil/>} />
            {/*  RUTAS DE ACCESO */}
            <Route path='registro' element={<Registro/>} />
            <Route path='login' element={<Login/>} />
             {/*  LAS OTRAS RUTAS */}
            <Route path='about' element={<About/>} />
            <Route path='home' element={<Home/>} />
            <Route path='contact' element={<Contact/>}/>
            {/*   RUTAS QUE NO EXISTEN */}
            <Route path='*' element={<Navigate replace to={"/login"}/>}/>
            </Route></>)}
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
