import React,{useState} from 'react';
import {Modal,Form,Col,Row,Button } from "react-bootstrap";
import Swal from 'sweetalert2';

function ModalData(props) {
    const [rol,setRol]= useState(0);
    function reset() {
        props.v(false);
        setRol(0);
    }
    return (
        <>
            <Modal show={props.show} fullscreen="'xl-down'" onHide={reset} >
                <Modal.Header closeButton>
                    <Col>
                    <Modal.Title>{rol ==0? "Cargar datos": rol==1? "Cargar datos Maestros" : "Cargar datos Estudiantes"} </Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                {rol==0
                    ?
                    <div>
                    <Row>
                        <h1 className="shadow-sm  mt-5 p-3 text-center rounded">
                            Seleccione un Rol
                        </h1> 
                    </Row>
                    <Row>
                    <Col>
                    </Col>
                    <Col className="mb-3" md="auto">
                        <Form.Check
                            inline
                            label="Maestro"
                            name="group1"
                            type= 'radio'
                            id= 'radio1'
                            value = "1"
                            onChange={e => setRol(e.target.value )}
                        />
                        <Form.Check
                            inline
                            label="Estudiante"
                            name="group1"
                            type= 'radio'
                            id= 'radio2'
                            value = "2"
                            onChange={e => setRol(e.target.value )}
                        />
                     </Col>
                     <Col>
                    </Col>
                    </Row>
                    </div>
                    
                    
                    : 
                    rol ==1 ? 
                    <CargarMaestro   />
                    :
                    <CargarEstudiante  />
                }

                </Modal.Body>
            </Modal>
        </>
    );
}

async function cargarDatos(data) {
    if (data.rol == 1) {
        return fetch("http://localhost:3001/admin/loadsteacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((data) => data.json());
    } else {
        return fetch("http://localhost:3001/admin/loadstudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((data) => data.json());
    }
    
}

function CargarMaestro(props) {
    const [file, setFile] = useState("");
    const handleUser =async e => {
        console.log(file);
        const token = await cargarDatos({file:file.replaceAll('\\','/'),rol:1});
        const {state} = token;
        if(state){
            Swal.fire(
                'Agregado!',
                'El archivo se ha cargado con éxito',
                'success'
            )
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cargar archivo, Revise la dirección!'
            })
        }
      }

    return (
        <>
            <style type="text/css">
                {`
                .btn-flat {
                background-color: #154360;
                color: white;
                }
                `}
            </style>
            <Row className="mt-5">
                <Col className="p-5 m-auto shadow-sm rounded-lg">
                    <Col >
                    <Form.Label>Ingrese la ruta del archivo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="c:/files.csv"
                        onChange={(e) => setFile(e.target.value)}
                    />
                     </Col>
                    <Col className="p-1">
                    <Button variant="secondary" onClick={() => handleUser()}>
                        <ion-icon name="cloud-upload-sharp"></ion-icon>
                    </Button>
                    </Col>
                </Col>
            </Row>
        </>
    );
};

function CargarEstudiante(props) {
    const [file, setFile] = useState("");
    const handleUser =async e => {
        //console.log(file);
        const token = await cargarDatos({file:file.replaceAll('\\','/'),rol:2});
        const {state} = token;
        if(state){
            Swal.fire(
                'Agregado!',
                'El archivo se ha cargado con éxito',
                'success'
            )
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cargar archivo, Revise la dirección!'
            })
        }
      }

    return (
        <>
            <style type="text/css">
                {`
                .btn-flat {
                background-color: #154360;
                color: white;
                }
                `}
            </style>
            <Row className="mt-5">
                <Col className="p-5 m-auto shadow-sm rounded-lg">
                    <Col >
                    <Form.Label>Ingrese la ruta del archivo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="c:/files.csv"
                        onChange={(e) => setFile(e.target.value)}
                    />
                     </Col>
                    <Col className="p-1">
                    <Button variant="secondary" onClick={() => handleUser()}>
                        <ion-icon name="cloud-upload-sharp"></ion-icon>
                    </Button>
                    </Col>
                </Col>
            </Row>
        </>
    );
};


export default ModalData;
  