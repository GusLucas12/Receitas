import logo from './logo.svg';
import './App.css';
import Top from './components/cabeca';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/index';
function App() {
  return (

    <div className="App">
      <Top></Top>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
   
    </div>
  );
}

export default App;
