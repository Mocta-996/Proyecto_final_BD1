import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import background from "./img.jpg";
import img2 from "./img2.jpg";

var sectionStyle = {
    width: "100%",
    height: "600px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${background})`,
};

function Home() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <>
            <div style={sectionStyle}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h2>Bienvenido</h2>
                            <p>
                                © 2022 Sistemas de Base de Datos
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>                  
                </Carousel>
            </div>
           
        </>
    );
}

export default Home;
/*
 <footer class="fixed-bottom bg-dark">
                <div class="footer-copyright text-center py-3 text-white">
                    © 2022 Sistemas de Base de Datos
                </div>
            </footer>
*/
