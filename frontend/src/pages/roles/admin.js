import React,{useState} from 'react';
import {Col, Container,Row,Image,ListGroup,ListGroupItem } from "react-bootstrap";
import {useLocation} from 'react-router-dom';
import userImage from './users.png'
import ModalUser from '../../modal/crearUsuario.js';
import ModalEliminarUser from '../../modal/eliminarUsuario.js';
import ModalData from '../../modal/loadData.js';
import ModalCarrera from '../../modal/crearCarrera.js';

function Login(props) {
    const { state } = useLocation();
    console.log(state);
    const [showUser, setShowUser] = useState(false);
    const [eliminarUser, setEliminarUser] = useState(false);
    const [load, setLoad] = useState(false);
    const [showCarrera, setShowCarrera] = useState(false);
    function handleCarrera() {
        setShowCarrera(showCarrera? false:true);
    }
    function handleShow() {
        setShowUser(showUser? false:true);
    }
    function eliminar() {
        setEliminarUser(eliminarUser? false:true);
    }

    function cargar() {
        setLoad(load? false:true);
    }
    return (
        <>
            <style type="text/css">
                {`
                .btn-flat {
                background-color: #154360;
                color: white;
                }
                .h1-titulo{
                    color:#154360;
                }
                `}
            </style>
            <Container>
                <Row>
                <Col>
                    <h1 className="shadow-sm  mt-5 p-3 text-center rounded" variant ="titulo">
                        Administrador
                        <Image src={userImage} rounded width="125" className="p-3"/>
                    </h1>
                </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={10}  md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg" >
                    <ListGroup>
                        <ListGroupItem action onClick={() => handleShow()} >Crear Usuario</ListGroupItem>
                        <ListGroupItem action onClick={() => eliminar()}>Eliminar /Editar Usuario</ListGroupItem>
                        <ListGroupItem action onClick={() => cargar()}>Cargar Archivo</ListGroupItem>
                        <ListGroupItem action onClick={() => handleCarrera()}>Crear Carrera </ListGroupItem>
                        <ListGroupItem action>Asignar Estudiante</ListGroupItem>
                    </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <ModalUser show={showUser} v = {setShowUser}/>
                    <ModalEliminarUser show={eliminarUser} v = {setEliminarUser}/>
                    <ModalData show={load} v = {setLoad}/>
                    <ModalCarrera show={showCarrera} v = {setShowCarrera}/>
                </Row>
            </Container>
        </>
    );
};

export default Login;
