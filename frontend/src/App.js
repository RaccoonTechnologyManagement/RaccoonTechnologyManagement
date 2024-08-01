import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Container from './components/layout/Container';
import Sidebar from './components/layout/Sidebar';
import Ativos from './components/pages/Ativos';
import Chamados from './components/layout/Chamados';
import Monitorar from './components/pages/Monitorar';
import Dashboard from './components/pages/Dashboard';
import Usuarios from './components/pages/Usuarios';
import User from './components/pages/User';
import ChamadosAbertos from './components/pages/ChamadosAbertos';
import ChamadosSemTecnico from './components/pages/ChamadosSemTecnico';
import ChamadosPrioridadeAlta from './components/pages/ChamadosPrioridadeAlta';
import ChamadosPrazoVencendo from './components/pages/ChamadosPrazoVencendo';
import ChamadosVencidos from './components/pages/ChamadosVencidos';

function App() {
  return (
    <div className="App">
      <Router>
      <Sidebar/>
        <Routes>
          <Route path="/" element={<User/>}/>
          <Route path="/ativos" element={<Ativos/>}/>
          <Route path="/chamados" element={<Chamados/>}/>
          <Route path="/chamados/abertos" element={<ChamadosAbertos/>}/>
          <Route path="/chamados/sem-tecnico" element={<ChamadosSemTecnico/>}/>
          <Route path="/chamados/prioridade-alta" element={<ChamadosPrioridadeAlta/>}/>
          <Route path="/chamados/prazo-vencendo" element={<ChamadosPrazoVencendo/>}/>
          <Route path="/chamados/vencidos" element={<ChamadosVencidos/>}/>
          <Route path="/monitorar" element={<Monitorar/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/user" element={<User/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
