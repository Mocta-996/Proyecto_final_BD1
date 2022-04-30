import React,{useState} from 'react';
import {Container,FormControl, Navbar,Nav,NavDropdown} from "react-bootstrap";


function Home() {
    return (
           <div>hola </div>
    );
}

export default Home;

/**
 * const Home = () => {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('3')
    const radios = [
        { name: 'Administrador ', value: '1' },
        { name: 'Maestro', value: '2' },
        { name: 'Estudiante', value: '3' },
      ];
    return (
        <>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
                    Iniciar Sesión{" "}
                </h1>
                <Row className="mt-5">
                    <Col lg={5} md={6}  sm={12}  className="p-5 m-auto shadow-sm rounded-lg"  >
                        <Form>
                            <ButtonGroup className="mb-2">
                            {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant= 'outline-success'
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
                            </ButtonGroup>

                            <Form.Group controlId="formLogin">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button variant="success btn-block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
 */