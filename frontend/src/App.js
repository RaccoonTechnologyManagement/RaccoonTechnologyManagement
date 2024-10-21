import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {Login} from './components/pages/Login'
import AtivosInicial from './components/pages/AtivosInicial';
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
import AtivosCriar from './components/pages/AtivosCriar';
import AtivosCriarHardware from './components/pages/AtivosCriarHardware';
import AtivosCriarServidores from './components/pages/AtivosCriarServidores';
import AtivosCriarSoftwares from './components/pages/AtivosCriarSoftwares';
import AtivosCriarLicencas from './components/pages/AtivosCriarLicencas';
import RedefinirSenha from './components/pages/RedefinirSenha';
import ChamadosEdit from './components/pages/ChamadosEdit';
import ChamadosCriar from './components/pages/ChamadosCriar';
import ChamadosHistorico from './components/pages/ChamadosHistorico';

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
          <Route path="/ativos/criar" element={<AtivosCriar/>}/>
          <Route path="/ativos/criar/hardware" element={<AtivosCriarHardware/>}/>
          <Route path="/ativos/criar/servidor" element={<AtivosCriarServidores/>}/>
          <Route path="/ativos/criar/software" element={<AtivosCriarSoftwares/>}/>
          <Route path="/ativos/criar/licenca" element={<AtivosCriarLicencas/>}/>
          <Route path="/chamados" element={<Navigate to="/chamados/abertos" replace />} />
          <Route path="/chamados/abertos" element={<ChamadosAbertos/>}/>
          <Route path="/chamados/sem-tecnico" element={<ChamadosSemTecnico/>}/>
          <Route path="/chamados/prioridade-alta" element={<ChamadosPrioridadeAlta/>}/>
          <Route path="/chamados/prazo-vencendo" element={<ChamadosPrazoVencendo/>}/>
          <Route path="/chamados/criar" element={<ChamadosCriar/>}/>
          <Route path="/chamados/edit" element={<ChamadosEdit/>}/>
          <Route path="/chamados/historico" element={<ChamadosHistorico/>}/>
          <Route path="/editar-usuario" element={<EditarUsuarios />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />         
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
