function Investors({ investors }) {
  if (investors.length === 0) {
    return (
      <section className="section">
        <h2>Inversionistas Activos</h2>
        <p className="empty-message">No hay inversionistas registrados</p>
      </section>
    );
  }

  return (
    <section className="section investors-section">
      <h2>Inversionistas Activos</h2>
      <div className="investors-grid">
        {investors.map((investor) => (
          <div key={investor.id} className="investor-card">
            <h3>{investor.name}</h3>
            <p><strong>Tipo:</strong> {investor.type}</p>
            <p><strong>Inversión:</strong> ${investor.investment.toLocaleString('es-ES')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Investors;
