import {React,Fragment, useState, useEffect} from 'react'
import {Navbar,Container,Nav,NavDropdown,Dropdown,DropdownButton} from 'react-bootstrap'
import {Link,Outlet, useNavigate} from 'react-router-dom'


const NavbarRoutes = () => {


const desconectarse = useNavigate();
  const [session,setSession] = useState();

const guardandoUsuario = () => {
    return JSON.parse(localStorage.getItem('usuario'))
}

const cerrarSession =()=> {
  localStorage.clear();
  desconectarse('/login');
  window.location.reload();  
}

  useEffect(() => {
    setSession(guardandoUsuario());
  },[])

  
  return (
    <>    
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand as={Link} to={"/"}>Saveme</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="me-auto">
      {session?(<div></div>):(<div className='row'>
    <tr><td><Nav.Link as={Link} to={"/home"}>Home</Nav.Link></td><td><Nav.Link as={Link} to={"/about"}>About</Nav.Link> 
    </td><td>    <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link></td></tr>
      </div>)} 
     {/*  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
      {session?(<div className='row'><tr><td><p className='text-white'>{session[0].nombre}</p></td><td>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1" active>
            Action
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=> cerrarSession()}>Cerrar Session</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </td></tr></div>):(<div className='row'>
    <tr><td><Nav.Link as={Link} to={"/login"}>Login</Nav.Link></td><td><Nav.Link as={Link} to={"/registro"}>Registro</Nav.Link>
    </td></tr>
      </div>
  )}
      
    </Nav>

  </Navbar.Collapse>
  </Container>
</Navbar>  

        <section>
            <Outlet></Outlet>
        </section> 
       </> 
  )
}

export default NavbarRoutes
