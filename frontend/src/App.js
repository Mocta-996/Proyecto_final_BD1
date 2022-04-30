import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/main/Login";
import  Home from "./pages/main/home";
import  Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter> 
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/Login/:rol" element={<Login/>} />
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