function RentalHistory({ history }) {
  if (history.length === 0) {
    return (
      <section className="section">
        <h2>Historial de Alquileres</h2>
        <p className="empty-message">No hay alquileres registrados aún</p>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Historial de Alquileres</h2>
      <div className="rental-history">
        {history.map((rental) => (
          <div key={rental.id} className="rental-record">
            <div className="rental-details">
              <h4>{rental.vehicleName}</h4>
              <p><strong>Arrendatario:</strong> {rental.renterName}</p>
              <p><strong>Fecha:</strong> {rental.rentalDate}</p>
              <p><strong>Estado:</strong> <span className={`status ${rental.status.toLowerCase()}`}>{rental.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RentalHistory;
