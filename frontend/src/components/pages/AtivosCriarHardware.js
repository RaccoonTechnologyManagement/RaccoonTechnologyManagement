import CriarAtivo from '../layout/CriarAtivo';
import styles from '../pages/AtivosCriar.module.css';
import CriarHardwareComp from './CriarHardwareComp';

function AtivosCriarHardware () {
    return (
        <CriarAtivo>
            <CriarHardwareComp/>
        </CriarAtivo>
    )
}

export default AtivosCriarHardware