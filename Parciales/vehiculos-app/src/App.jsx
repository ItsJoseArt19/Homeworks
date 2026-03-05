import { useState, useEffect, useCallback } from 'react';
import { VehicleManagementSystem } from './structures/VehicleManagementSystem';
import AvailableVehicles from './components/AvailableVehicles';
import FeaturedVehicle from './components/FeaturedVehicle';
import RentalHistory from './components/RentalHistory';
import Investors from './components/Investors';
import './App.css';

function App() {
  const [system] = useState(() => new VehicleManagementSystem());
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [featuredVehicle, setFeaturedVehicle] = useState(null);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [renterName, setRenterName] = useState('');

  const updateUI = useCallback(() => {
    setAvailableVehicles(system.getAvailableVehicles());
    setFeaturedVehicle(system.getFeaturedVehicle());
    setRentalHistory(system.getRentalHistory());
    setInvestors(system.getInvestors());
  }, [system]);

  // Inicializar datos
  useEffect(() => {
    
    const currentVehicles = system.getAvailableVehicles();
    
    // Si ya hay vehículos, no agregar más
    if (currentVehicles.length > 0) {
      return;
    }

    const initialVehicles = [
      // Gama alta (2)
      { id: '1', name: 'BMW i3', type: 'Eléctrico Premium', price: 80 },
      { id: '2', name: 'Tesla Model 3', type: 'Eléctrico Premium', price: 70 },
      // Gama media (2)
      { id: '3', name: 'Chevrolet Spark', type: 'Gasolina', price: 40 },
      { id: '4', name: 'Hyundai i10', type: 'Gasolina', price: 30 },
      // Normal (1)
      { id: '5', name: 'Renault Kwid', type: 'Gasolina', price: 20 }
    ];

    initialVehicles.forEach(v => system.addAvailableVehicle(v));

    // Agregar inversionistas iniciales
    const initialInvestors = [
      { id: 'inv1', name: 'Juan Guevara', investment: 50000, type: 'Socio' },
      { id: 'inv2', name: 'Benito', investment: 35000, type: 'Inversor' },
      { id: 'inv3', name: 'Pepito perez', investment: 25000, type: 'Asesor' }
    ];

    initialInvestors.forEach(inv => system.addInvestor(inv));

    updateUI();
  }, [system, updateUI]);

  
  useEffect(() => {
    // Hacer la primera rotación immediatamente
    const featured = system.rotateFeaturedVehicle();
    setFeaturedVehicle(featured);

    // Luego rotar cada 5 segundos
    const interval = setInterval(() => {
      const featured = system.rotateFeaturedVehicle();
      setFeaturedVehicle(featured);
    }, 5000);

    return () => clearInterval(interval);
  }, [system]);

  const handleRentVehicle = (vehicleId) => {
    if (!renterName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    const result = system.rentVehicle(vehicleId, renterName);
    
    if (result.success) {
      alert('Vehículo alquilado exitosamente');
      updateUI();
      setRenterName('');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Sistema de Gestión de Movilidad Urbana</h1>
      </header>

      <main className="main-content">
        <div className="container">
          <FeaturedVehicle vehicle={featuredVehicle} />
          
          <section className="section">
            <h2>Alquilar Vehículo</h2>
            <div className="rental-form">
              <input
                type="text"
                placeholder="Tu nombre"
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                className="input"
              />
            </div>
            <AvailableVehicles
              vehicles={availableVehicles}
              onRent={handleRentVehicle}
              renterName={renterName}
            />
          </section>

          <RentalHistory history={rentalHistory} />
        </div>

        <Investors investors={investors} />
      </main>
    </div>
  );
}

export default App;
