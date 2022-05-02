import React,{useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useParams, Link,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';



async function loginUser(credentials) {

    return fetch('http://localhost:3001/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

function Login(props) {
    const {rol} = useParams();
    const [user, setUserName] = useState();
    const [pass, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          user,
          pass,
          rol
        });
        const {state} = token;
        
        if(state && rol ==1){
            const {DataUser} = token;
            props.logg(true);
            //console.log(DataUser);
            navigate("/admin",{ state: {userData:DataUser} });
        }else{
             
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error de Autenticacion, Credenciales no coinciden!',
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
                .h1-titulo{
                    color:#154360;
                }
                `}
            </style>
            <Container>
                <h1 className="shadow-sm  mt-5 p-3 text-center rounded" variant ="titulo">
                    Iniciar Sesión{" "}
                </h1>
                <Row className="mt-5">
                    <Col
                        lg={5}
                        md={6}
                        sm={12}
                        className="p-5 m-auto shadow-sm rounded-lg"
                    >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formLogin">
                                <Form.Label>Usuario </Form.Label>
                                <Form.Control
                                    type={rol === "1" ? "text" : "number"}
                                    placeholder="User"
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br />
                            <Col className="trans text-center">
                                <Button variant="flat" type="submit">
                                    Iniciar Sesión
                                </Button>
                                <br />
                                <Link to="/">Regresar</Link>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
