import React,{useState,useEffect} from 'react';
import {Modal,Form,Col,Row,Button,Table } from "react-bootstrap";
import Swal from 'sweetalert2';

async function listarCursos(tipo) {
    return fetch("http://localhost:3001/admin/listarCarreras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tipo),
    }).then((data) => data.json());
}
async function addCursos(data) {
    //console.log(rol)
    return fetch("http://localhost:3001/admin/agregarCarrera", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((data) => data.json());
}
async function eliminarCarreras(data) {
    //console.log(rol)
    return fetch("http://localhost:3001/admin/eliminarCarreras", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((data) => data.json());
}

function ModalCarrera(props) {
    const [rol,setRol]= useState(0);
    
    useEffect(() => {
        console.log(rol);
    });
    function reset() {
        props.v(false);
        setRol(0);
    }
    return (
        <>
            <Modal show={props.show} fullscreen="xxl-down" onHide={reset} >
                <Modal.Header closeButton>
                    <Col>
                    <Modal.Title>{rol ==0 ? "Agregar": rol ==1? "Agregar Carrera":"Agregar Seccion"}</Modal.Title>
                    </Col>
                </Modal.Header>
                <Modal.Body>
                {rol==0
                    ?
                    <div>
                    <Row>
                        <h1 className="shadow-sm  mt-5 p-3 text-center rounded">
                            Seleccione una opción
                        </h1> 
                    </Row>
                    <Row>
                    <Col>
                    </Col>
                    <Col className="mb-3" md="auto">
                        <Form.Check
                            inline
                            label="Carrera"
                            name="group1"
                            type= 'radio'
                            id= 'radio1'
                            value = "1"
                            onChange={e => setRol(e.target.value )}
                        />
                        <Form.Check
                            inline
                            label="Seccion"
                            name="Seccion"
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
                    <AgregarCarrera fun={reset}/> 
                    :
                    <AgregarSeccion fun={reset}/>
                }
                </Modal.Body>
            </Modal>
        </>
    );
}


function AgregarCarrera(props) {
    const [carreras, setCarreras]= useState([]);
    const [nuevaCarrera, setNuevaCarrera]= useState([]);

    const handleCarrera=async () => {
        const token = await listarCursos({tipo:1});
        const {state} = token;
        if(state){
            const {data} = token;
            //console.log(data);
            setCarreras(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }
    const handleChange=e=>{
        setNuevaCarrera(e.target.value);
    }

    const agregar=async () => {
        const token = await addCursos({tipo:1, name:nuevaCarrera});
        const {state} = token;
        if(state){
            Swal.fire(
                'Agregado!',
                'La carrera se ha agregado Correctamente',
                'success'
            )
            handleCarrera();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }

    const eliminar =async (e) => {
        const token = await eliminarCarreras({tipo:1,id:e});
        const {state} = token;
        if(state){
            Swal.fire(
                'Elimiando!',
                'La Carrera se ha eliminado',
                'success'
            )
            handleCarrera();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al Eliminar Carrera, intente más tarde!'
            })
        }
    }

    const preguntar =(e) =>{
        Swal.fire({
            title: 'Eliminar Carrera',
            text: "¿Estas seguro de elimiar esta Carrera?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminar(e);
            }
          })
    }
    useEffect(() => {
        handleCarrera();
    },[]);
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
            
            <Row>
                <Col xs lg="2">
                </Col>
                <Col >
                <input
                    className="form-control"
                    placeholder="Ingrese el nombre de la Carrera"
                    onChange={handleChange}
                />
                </Col>
                <Col xs lg="2">
                <Button variant="secondary" onClick={() =>agregar()} >
                    <ion-icon name="add-circle-sharp"></ion-icon>
                </Button>
                </Col>
            </Row>

            <Row >
            <Col xs lg="2">
            </Col>
            <Col >
            <Row className="mt-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Carrera</th>
                            <th>Acción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carreras &&
                            carreras.map((carrera) => (
                                <tr key={carrera.id_carrera}>
                                    <td>{carrera.id_carrera}</td>
                                    <td>{carrera.nombre}</td>
                                    <td>
                                    <Button variant="secondary" onClick={() => preguntar(carrera.id_carrera)} >
                                        <ion-icon name="trash"></ion-icon>
                                    </Button>
                                    </td>
                                    <td>
                                        <Button variant="secondary" /*onClick={() => showEdit(carrera.id_carrera)}*/>
                                            <ion-icon name="create-sharp"></ion-icon>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Row>
            </Col>
            <Col xs lg="2">
            </Col>
            </Row>
         
        </>
    );
};


function AgregarSeccion(props) {
    const [carreras, setCarreras]= useState([]);
    const [nuevaCarrera, setNuevaCarrera]= useState([]);

    const handleCarrera=async () => {
        const token = await listarCursos({tipo:2});
        const {state} = token;
        if(state){
            const {data} = token;
            //console.log(data);
            setCarreras(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }
    const handleChange=e=>{
        setNuevaCarrera(e.target.value);
    }

    const agregar=async () => {
        const token = await addCursos({tipo:2, name:nuevaCarrera});
        const {state} = token;
        if(state){
            Swal.fire(
                'Agregado!',
                'La Seccion se ha agregado Correctamente',
                'success'
            )
            handleCarrera();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }
    
    const eliminar =async (e) => {
        const token = await eliminarCarreras({tipo:2,id:e});
        const {state} = token;
        if(state){
            Swal.fire(
                'Elimiando!',
                'La Seccion se ha eliminado',
                'success'
            )
            handleCarrera();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al Eliminar Seccion, intente más tarde!'
            })
        }
    }

    const preguntar =(e) =>{
        Swal.fire({
            title: 'Eliminar Seccion',
            text: "¿Estas seguro de elimiar esta Seccion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminar(e);
            }
          })
    }
       
    useEffect(() => {
        handleCarrera();
    },[]);
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
            
            <Row>
                <Col xs lg="2">
                </Col>
                <Col >
                <input
                    className="form-control"
                    placeholder="Ingrese la Sección"
                    onChange={handleChange}
                />
                </Col>
                <Col xs lg="2">
                <Button variant="secondary" onClick={() =>agregar()} >
                    <ion-icon name="add-circle-sharp"></ion-icon>
                </Button>
                </Col>
            </Row>

            <Row >
            <Col xs lg="2">
            </Col>
            <Col >
            <Row className="mt-5">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Carrera</th>
                            <th>Acción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carreras &&
                            carreras.map((carrera) => (
                                <tr key={carrera.id_seccion}>
                                    <td>{carrera.id_seccion}</td>
                                    <td>{carrera.seccion}</td>
                                    <td>
                                    <Button variant="secondary" onClick={() => preguntar(carrera.id_seccion)}>
                                        <ion-icon name="trash"></ion-icon>
                                    </Button>
                                    </td>
                                    <td>
                                        <Button variant="secondary" /*onClick={() => showEdit(carrera.id_carrera)}*/>
                                            <ion-icon name="create-sharp"></ion-icon>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Row>
            </Col>
            <Col xs lg="2">
            </Col>
            </Row>
         
        </>
    );
};

export default ModalCarrera;
  