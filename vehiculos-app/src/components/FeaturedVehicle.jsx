function FeaturedVehicle({ vehicle }) {
  if (!vehicle) return null;

  return (
    <section className="featured-vehicle">
      <h2>Vehículo Destacado</h2>
      <div className="featured-card">
        <div className="featured-content">
          <h3>{vehicle.name}</h3>
          <p><strong>Tipo:</strong> {vehicle.type}</p>
          <p><strong>Tarifa:</strong> ${vehicle.price}/hora</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVehicle;
