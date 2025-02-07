import logo from './logo.svg';
import './App.css';
import Top from './components/cabeca';
import Footer from './components/footer';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/index';
import Busca from './pages/busca';
import Receitas from './pages/receitas';
import Criar from './pages/criar';
import Usuario from './pages/usuario';
import Editar from './pages/editarUsu';
import EditarReceitas from './pages/editar';
import LoginPage from './pages/login';
function App() {
  return (

    <div>
      <Top></Top>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/busca' element={<Busca/>}/>
        <Route path='/receitas' element={<Receitas/>}/>
        <Route path='/criar' element={<Criar/>}/>
        <Route path='/usuario' element={<Usuario/>}/>
        <Route path='/editar' element={<Editar/>}/>
        <Route path="/editarReceita/:id" element={<EditarReceitas/>} />
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
   
    </div>
    
  );
}

export default App;
