import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './contexts/AuthContext';
import { ProveedorTareas } from './contexts/TaskContext';
import { PaginaLogin } from './pages/PaginaLogin';
import { PaginaRegistro } from './pages/PaginaRegistro';
import { PaginaTareas } from './pages/PaginaTareas';
import { RutaProtegida } from './components/RutaProtegida';
import './styles/global.css';

function App() {
  return (
    <Router>
      <ProveedorAutenticacion>
        <ProveedorTareas>
          <Routes>
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/registrar" element={<PaginaRegistro />} />
            <Route
              path="/tareas"
              element={
                <RutaProtegida>
                  <PaginaTareas />
                </RutaProtegida>
              }
            />
            <Route path="/" element={<Navigate to="/tareas" replace />} />
            <Route path="*" element={<Navigate to="/tareas" replace />} />
          </Routes>
        </ProveedorTareas>
      </ProveedorAutenticacion>
    </Router>
  );
}

export default App;
