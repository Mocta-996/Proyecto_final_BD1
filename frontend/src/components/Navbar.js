import React,{useState, useEffect} from 'react';
import {Container,FormControl, Navbar,Nav,NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';



function NavBar(props){
    const [isLogged, setisLogged] = useState();
    useEffect(() => {
        setisLogged(true);
      });
    return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">Uedi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 d-flex"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                        </Nav>
                        <Nav>
                        {isLogged ? 
                        <Link to="/">Cerrar Sesión</Link>:
                        <NavDropdown
                                title="Iniciar Sesion"
                                id="login"
                            >
                                <NavDropdown.Item href="/Login/3">
                                    Estudiante
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/Login/2">
                                    Profesor
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/Login/1">
                                    Administrador
                                </NavDropdown.Item>
                            </NavDropdown> }
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
};

export default NavBar;