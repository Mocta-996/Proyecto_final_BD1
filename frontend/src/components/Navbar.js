import React,{useState, useEffect} from 'react';
import {Container,FormControl, Navbar,Nav,NavDropdown,Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import logo from './image.png'


function NavBar(props){
   // logg={props.logg} islog={props.islog}
   const navigate = useNavigate();
   function handleLogout () {
        props.logg(false);
        navigate("/");
  }

    return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/">
                        <img
                        alt=""
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        />{'  '}
                        Escuela Virtual
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 d-flex"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                        </Nav>
                        <Nav>
                         
                        {props.islog ? 
                        <Button variant="dark" onClick={() => handleLogout()}>
                            Cerrar Sesión {' '}
                            <ion-icon name="log-out-sharp"></ion-icon>
                        </Button>:
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
                            </NavDropdown> 
                        }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
};

export default NavBar;