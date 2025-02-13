import './App.css';
import Top from './components/cabeca';
import Footer from './components/footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/index';
import Busca from './pages/busca';
import Receitas from './pages/receitas';
import Criar from './pages/criar';
import Usuario from './pages/usuario';
import Editar from './pages/editarUsu';
import EditarReceitas from './pages/editar';
import LoginPage from './pages/login';
import CadastrarPage from './pages/cadastrar';
import { useTokenExpirationCheck } from './components/expiration';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  useTokenExpirationCheck();
  
  return (
    <div>
      <Top />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/busca' element={<Busca />} />
        <Route path='/receitas' element={<Receitas />} />
        <Route path='/criar' element={<Criar />} />
        <Route path='/usuario' element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        } />
        <Route path='/editar' element={<Editar />} />
        <Route path="/editarReceita/:id" element={<EditarReceitas />} />
        <Route path='/login' element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path='/cadastrar' element={
          <PublicRoute>
            <CadastrarPage />
          </PublicRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
