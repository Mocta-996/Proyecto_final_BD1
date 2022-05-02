import React,{useState} from 'react';
import {Modal,Form,Col,Row,Button } from "react-bootstrap";
import Swal from 'sweetalert2';

function ModalEditarUsuario(props) {
    //const [rol,setRol]= useState(0);
    const [editando,setEditando] =useState(false);
    function reset() {
        if(editando){
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
                    //props.v(false);
                    //setRol(0);
                }
            })
        }else{
            console.log(props.data)
            props.update();
            props.setShow(false);
            //setRol(0);
        }
       
    }

    return (
        <>
            <Modal show={props.show} fullscreen="xl-down" onHide={reset} >
                <Modal.Header closeButton>
                    <Col>
                    <Modal.Title>Editar Usuario</Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                {props.rol==1
                    ?
                    <EditarMaestro fun={reset} data={props.data} />              
                    :
                    <EditarEstudiante fun={reset} data={props.data}/>
                }

                </Modal.Body>
            </Modal>
        </>
    );
}

async function agregarUsuario(dataUser) {
    return fetch("http://localhost:3001/admin/updateUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
    }).then((data) => data.json());
}

function EditarMaestro(props) {
    let auxdate = props.data.fecha_nacimiento;
    let auxdate2 = auxdate.split('T',1)
    console.log(auxdate2);
    const [user, setUser] = useState({
        rol:1,
        id:props.data.id_maestro,
        nombres:props.data.nombre,
        apellidos:props.data.apellido,
        registro:props.data.no_registro?props.data.no_registro:-1,
        telefono:props.data.telefono,
        direccion:props.data.direccion,
        correo:props.data.correo,
        fecha:auxdate2[0],
        dpi:props.data.dpi,
        fotografia:props.data.foto,
        contrasenia:props.data.contrasenia
    });

    const handleUser =async e => {
        e.preventDefault();
        const token = await agregarUsuario(user);
        const {state} = token;
        if(state){
            Swal.fire(
                'Editado!',
                'Cambios realizados correctamente',
                'success'
            )
            props.fun();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error editar información, intente más tarde!'
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
                            value ={user.nombres}
                            //placeholder={user.nombres}
                            // required
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
                            value={user.apellidos}
                            //required
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
                            value={user.registro}
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
                            type="text"
                            value={user.telefono}
                            //required
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
                            value={user.correo}
                            //required
                            onChange={e =>setUser({
                                ...user,
                                correo: e.target.value
                            })}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formfecha">
                        <Form.Label>Fecha de Nacimiento: {user.fecha}</Form.Label>
                        <Form.Control
                            type="date"
                            //value = {user.fecha}
                            //placeholder={user.fecha}
                            //required
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
                            value= {user.dpi}
                            //required
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
                            placeholder="*******"
                            //required
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
                            value ={user.direccion}
                            //required
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

function EditarEstudiante(props) {
    const [user, setUser] = useState({
        rol:2,
        id:props.data.id_estudiante,
        nombres:props.data.nombre,
        apellidos:props.data.apellido,
        carnet:props.data.carnet,
        telefono:props.data.telefono,
        direccion:props.data.direccion,
        correo:props.data.correo,
        contrasenia:props.data.contrasenia
    });

   
    const handleUser =async e => {
        e.preventDefault();
        const token = await agregarUsuario(user);
        const {state} = token;
        if(state){
            Swal.fire(
                'Editado!',
                'Cambios realizados correctamente',
                'success'
            )
            props.fun();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error editar información, intente más tarde!'
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
                            //placeholder="Nombres"
                            //required
                            value ={user.nombres}
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
                            //placeholder="Apellidos"
                            //required
                            value ={user.apellidos}
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
                            //placeholder="Carnet"
                            value ={user.carnet}
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
                            type="text"
                            //placeholder="No. Teléfono"
                            //required
                            value ={user.telefono}
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
                            //placeholder="correo@extension.com"
                            //required
                            value ={user.correo}
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
                            placeholder="******"
                            //required
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
                            //placeholder="Dirección"
                            //required
                            value ={user.direccion}
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

export default ModalEditarUsuario;
  