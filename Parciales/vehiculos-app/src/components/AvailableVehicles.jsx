function AvailableVehicles({ vehicles, onRent, renterName }) {
  if (vehicles.length === 0) {
    return (
      <div className="vehicles-list">
        <p className="empty-message">No hay vehículos disponibles en este momento</p>
      </div>
    );
  }

  return (
    <div className="vehicles-list">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="vehicle-card">
          <div className="vehicle-info">
            <h3>{vehicle.name}</h3>
            <p><strong>Tipo:</strong> {vehicle.type}</p>
            <p><strong>Tarifa:</strong> ${vehicle.price}/hora</p>
          </div>
          <button
            className="btn-rent"
            onClick={() => onRent(vehicle.id)}
            disabled={!renterName.trim()}
          >
            Alquilar
          </button>
        </div>
      ))}
    </div>
  );
}

export default AvailableVehicles;
