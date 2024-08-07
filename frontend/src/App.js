import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {Login} from './components/pages/Login'
import AtivosInicial from './components/pages/AtivosInicial';
import Chamados from './components/layout/Chamados';
import Monitorar from './components/pages/Monitorar';
import Dashboard from './components/pages/Dashboard';
import Usuarios from './components/pages/Usuarios';
import EditarUsuarios from './components/pages/EditarUsuario';
import User from './components/pages/User';
import ChamadosAbertos from './components/pages/ChamadosAbertos';
import ChamadosSemTecnico from './components/pages/ChamadosSemTecnico';
import ChamadosPrioridadeAlta from './components/pages/ChamadosPrioridadeAlta';
import ChamadosPrazoVencendo from './components/pages/ChamadosPrazoVencendo';
import ChamadosVencidos from './components/pages/ChamadosVencidos';
import AtivosHardware from './components/pages/AtivosHardware';
import AtivosServidores from './components/pages/AtivosServidores';
import AtivosSoftware from './components/pages/AtivosSoftware';
import AtivosLicencas from './components/pages/AtivosLicencas';
import AtivosExcluidos from './components/pages/AtivosExcluidos';
import AtivosLt from './components/layout/AtivosLt';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/ativos/" element={<AtivosLt/>}/>
          <Route path="/ativos/todos" element={<AtivosInicial/>}/>
          <Route path="/ativos/hardware" element={<AtivosHardware/>}/>
          <Route path="/ativos/servidores" element={<AtivosServidores/>}/>
          <Route path="/ativos/software" element={<AtivosSoftware/>}/>
          <Route path="/ativos/licencas" element={<AtivosLicencas/>}/>
          <Route path="/ativos/excluidos" element={<AtivosExcluidos/>}/>
          <Route path="/chamados" element={<Navigate to="/chamados/abertos" replace />} />
          <Route path="/chamados/abertos" element={<ChamadosAbertos/>}/>
          <Route path="/chamados/sem-tecnico" element={<ChamadosSemTecnico/>}/>
          <Route path="/chamados/prioridade-alta" element={<ChamadosPrioridadeAlta/>}/>
          <Route path="/chamados/prazo-vencendo" element={<ChamadosPrazoVencendo/>}/>
          <Route path="/editar-usuario" element={<EditarUsuarios />} />
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
