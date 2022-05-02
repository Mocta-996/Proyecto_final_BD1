import React,{useState} from 'react';
import {Modal,Form,Col,Row,Button } from "react-bootstrap";
import Swal from 'sweetalert2';

function ModalUser(props) {
    const [rol,setRol]= useState(0);
    function reset() {
        Swal.fire({
            title: '¿Cancelar?',
            text: "No se guardaran los Cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#154360',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                props.v(false);
                setRol(0);
            }
        })
    }

    function ok() {
        props.v(false);
        setRol(0);
    }

    return (
        <>
            <Modal show={props.show} fullscreen="xxl-down" onHide={reset} >
                <Modal.Header closeButton>
                    <Col>
                    <Modal.Title>Agregar Usuario</Modal.Title>
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
                    <AgregarMaestro fun={reset} ok={ok} />
                    :
                    <AgregarEstudiante fun={reset} ok={ok}/>
                }

                </Modal.Body>
            </Modal>
        </>
    );
}

async function agregarUsuario(dataUser) {
    return fetch("http://localhost:3001/admin/agregarUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
    }).then((data) => data.json());
}

function AgregarMaestro(props) {
    const [user, setUser] = useState({
        rol:1,
        nombres:"",
        apellidos:"",
        registro:-1,
        telefono:"",
        direccion:"",
        correo:"",
        fecha:"",
        dpi:-1,
        fotografia:"",
        contrasenia:""
    });

    const handleUser =async e => {
        e.preventDefault();
        const token = await agregarUsuario(user);
        const {state} = token;
        if(state){
            Swal.fire(
                'Agregado!',
                'El usuario se ha agregado correctamente',
                'success'
            )
            props.ok();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
      }

    function cancel() {
        props.fun();
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
        <Col className="p-5 m-auto shadow-sm rounded-lg" >
            <Form onSubmit={handleUser}>
                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formUser" className="md-6 sm=-12">
                        <Form.Label>Nombre </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombres"
                            required
                            onChange={e =>setUser({
                                ...user,
                               nombres: e.target.value
                          })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formapellido">
                        <Form.Label>Apellidos </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Apellidos"
                            required
                            onChange={e =>setUser({
                                ...user,
                                apellidos: e.target.value
                          })}
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formregistro" className="md-6 sm=-12">
                        <Form.Label>No. Registro </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="No. Registro"
                            onChange={e =>setUser({
                                ...user,
                                registro: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formtel">
                        <Form.Label>No. Telefono </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="No. Teléfono"
                            required
                            onChange={e =>setUser({
                                ...user,
                                telefono: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formcorreo" className="md-6 sm=-12">
                        <Form.Label>Correo </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="correo@extension.com"
                            required
                            onChange={e =>setUser({
                                ...user,
                                correo: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formfecha">
                        <Form.Label>Fecha de Nacimiento </Form.Label>
                        <Form.Control
                            type="date"
                            //placeholder="No. Teléfono"
                            required
                            onChange={e =>setUser({
                                ...user,
                                fecha: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formdpi" className="md-6 sm=-12">
                        <Form.Label>DPI </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="123456789"
                            required
                            onChange={e =>setUser({
                                ...user,
                                dpi: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formpasss">
                        <Form.Label>Constraseña </Form.Label>
                        <Form.Control
                            type="password"
                            //placeholder="No. Teléfono"
                            required
                            onChange={e =>setUser({
                                ...user,
                                contrasenia: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formdire" className="md-6 sm=-12">
                        <Form.Label>Dirección </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            required
                            onChange={e =>setUser({
                                ...user,
                                direccion: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className="trans text-center">
                        <Button variant="flat" type="submit" >
                            Guardar Registro 
                        </Button>
                    </Col>
                    <Col className="trans text-center">
                        <Button variant="danger"  onClick={cancel}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Col>
    </Row>
    </>
    );
};

function AgregarEstudiante(props) {
    const [user, setUser] = useState({
        rol:2,
        nombres:"",
        apellidos:"",
        carnet:-1,
        telefono:"",
        direccion:"",
        correo:"",
        contrasenia:""
    });

    const handleUser =async e => {
        e.preventDefault();
        const token = await agregarUsuario(user);
        const {state} = token;
        console.log(token);
        debugger;
        if(state){
            Swal.fire(
                'Agregado!',
                'El usuario se ha agregado correctamente',
                'success'
            )
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
      }

    function cancel() {
        props.fun();
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
        <Col className="p-5 m-auto shadow-sm rounded-lg" >
            <Form onSubmit={handleUser}>
                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formUser" className="md-6 sm=-12">
                        <Form.Label>Nombre </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nombres"
                            required
                            onChange={e =>setUser({
                                ...user,
                               nombres: e.target.value
                          })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formapellido">
                        <Form.Label>Apellidos </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Apellidos"
                            required
                            onChange={e =>setUser({
                                ...user,
                                apellidos: e.target.value
                          })}
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formregistro" className="md-6 sm=-12">
                        <Form.Label>Carnet </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Carnet"
                            onChange={e =>setUser({
                                ...user,
                                carnet: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formtel">
                        <Form.Label>No. Telefono </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="No. Teléfono"
                            required
                            onChange={e =>setUser({
                                ...user,
                                telefono: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formcorreo" className="md-6 sm=-12">
                        <Form.Label>Correo </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="correo@extension.com"
                            required
                            onChange={e =>setUser({
                                ...user,
                                correo: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formpasss">
                        <Form.Label>Constraseña </Form.Label>
                        <Form.Control
                            type="password"
                            //placeholder="No. Teléfono"
                            required
                            onChange={e =>setUser({
                                ...user,
                                contrasenia: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                   
                </Row>

                <Row className="mt-2">
                    <Col> 
                        <Form.Group controlId="formdire" className="md-6 sm=-12">
                        <Form.Label>Dirección </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            required
                            onChange={e =>setUser({
                                ...user,
                                direccion: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className="trans text-center">
                        <Button variant="flat" type="submit" >
                            Guardar Registro 
                        </Button>
                    </Col>
                    <Col className="trans text-center">
                        <Button variant="danger"  onClick={cancel}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Col>
    </Row>
    </>
    );
};

export default ModalUser;
  