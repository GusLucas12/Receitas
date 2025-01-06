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
      </Routes>
   
    </div>
    
  );
}

export default App;
