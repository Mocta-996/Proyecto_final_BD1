import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/main/Login";
import  Home from "./pages/main/home";
import  Admin from "./pages/roles/admin";
import  Layout from "./components/Layout";

function App() {
    const [isLogged, setIsLogged] = useState(false);
    console.log(isLogged);
    return (
        <BrowserRouter>
            <Layout logg={setIsLogged} islog={isLogged}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/Login/:rol" element={<Login logg={setIsLogged} />} />
                    <Route exact path="/admin" element={<Admin />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
/*


<Layout>
        <Route path="/" element={<Home/>} />
        <Route exact path="/Login" component={Badges} />
        <Route exact path="/badges/new" component={BadgeNew} />
        <Route component={NotFound} />
        </Layout>
        */