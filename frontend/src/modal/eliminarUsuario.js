import React,{useState,useEffect} from 'react';
import {Modal,Form,Col,Row,Button,Table } from "react-bootstrap";
import Swal from 'sweetalert2';
import ModalEditarUsuario from './EditarUsuario';

async function listarUsuario(rol) {
    //console.log(rol)
    return fetch("http://localhost:3001/admin/listarUsuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rol),
    }).then((data) => data.json());
}

async function eliminarUsuario(data) {
    //console.log(data)
    return fetch("http://localhost:3001/admin/elimiarUsuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((data) => data.json());
}

function ModalEliminarUser(props) {
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
                    <Modal.Title>{rol ==0 ? "Listar Usuarios": rol ==1? "Listar Maestros":"Listar Estudiantes"}</Modal.Title>
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
                    <ListarMaestros fun={reset}/> 
                    :
                    <ListarEstudiantes fun={reset}/> 
                }
                </Modal.Body>
            </Modal>
        </>
    );
}


function ListarMaestros(props) {
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [showEditer, setShowEditer] = useState(false);
    const [dataUs, setDataUs] = useState();

    const handleUser =async () => {
        const token = await listarUsuario({rol:1});
        const {state} = token;
        if(state){
            const {data} = token;
            //console.log(data);
            setUsuarios(data);
            setTablaUsuarios(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setUsuarios(resultadosBusqueda);
    }

    const eliminar =async (e) => {
        const token = await eliminarUsuario({rol:1,id:e});
        const {state} = token;
        if(state){
            Swal.fire(
                'Elimiando!',
                'El usuario se ha eliminado correctamente',
                'success'
            )
            handleUser();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al Eliminar Usuario, intente más tarde!'
            })
        }
    }

    const preguntar =(e) =>{
        Swal.fire({
            title: 'Eliminar Usuario',
            text: "¿Estas seguro de elimiar este usuario?",
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

    function showEdit(data){
        setDataUs(data);
        setShowEditer(showEditer? false:true);
        
        //show={showUser} v = {setShowUser}
    }
    useEffect(() => {
        handleUser();
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
                    value={busqueda}
                    placeholder="Búsqueda por Nombre"
                    onChange={handleChange}
                />
                </Col>
                <Col xs lg="2">
                <Button variant="secondary">
                    <ion-icon name="search-sharp" ></ion-icon>
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
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Acción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios &&
                            usuarios.map((usuario) => (
                                <tr key={usuario.id_maestro}>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>
                                    <Button variant="secondary" onClick={() => preguntar(usuario.id_maestro)}>
                                        <ion-icon name="trash"></ion-icon>
                                    </Button>
                                    </td>
                                    <td>
                                        <Button variant="secondary" onClick={() => showEdit(usuario)}>
                                            <ion-icon name="create-sharp"></ion-icon>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Row>
            </Col>
            <Col xs lg="2">
            </Col>
            </Row>
            <Row>
            <ModalEditarUsuario show={showEditer} setShow={setShowEditer} rol={1} data={dataUs} update = {handleUser}/>
            </Row>
        </>
    );
};

function ListarEstudiantes(props) {
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    
    const [showEditer, setShowEditer] = useState(false);
    const [dataUs, setDataUs] = useState();

    const handleUser =async () => {
        const token = await listarUsuario({rol:2});
        const {state} = token;
        if(state){
            const {data} = token;
            //console.log(data);
            setUsuarios(data);
            setTablaUsuarios(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al agregar, intente más tarde!'
            })
        }
    }

    const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
          if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setUsuarios(resultadosBusqueda);
    }

    const eliminar =async (e) => {
        const token = await eliminarUsuario({rol:2,id:e});
        const {state} = token;
        if(state){
            Swal.fire(
                'Elimiando!',
                'El usuario se ha eliminado correctamente',
                'success'
            )
            handleUser();
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al Eliminar Usuario, intente más tarde!'
            })
        }
    }

    const preguntar =(e) =>{
        Swal.fire({
            title: 'Eliminar Usuario',
            text: "¿Estas seguro de elimiar este usuario?",
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

    function showEdit(data){
        setDataUs(data);
        setShowEditer(showEditer? false:true);
        
        //show={showUser} v = {setShowUser}
    }

    useEffect(() => {
        handleUser();
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
                    value={busqueda}
                    placeholder="Búsqueda por Nombre"
                    onChange={handleChange}
                />
                </Col>
                <Col xs lg="2">
                <Button variant="secondary">
                    <ion-icon name="search-sharp" ></ion-icon>
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
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Acción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios &&
                            usuarios.map((usuario) => (
                                <tr key={usuario.id_estudiante}>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>
                                    <Button variant="secondary" onClick={() => preguntar(usuario.id_estudiante)}>
                                        <ion-icon name="trash"></ion-icon>
                                    </Button>
                                    </td>
                                    <td>
                                        <Button variant="secondary" onClick={() => showEdit(usuario)}>
                                            <ion-icon name="create-sharp"></ion-icon>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Row>
            </Col>
            <Col xs lg="2">
            </Col>
            </Row>
            <Row>
            <ModalEditarUsuario show={showEditer} setShow={setShowEditer} rol={2} data={dataUs} update = {handleUser}/>
            </Row>
        </>
    );
};

export default ModalEliminarUser;
  