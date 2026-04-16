import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import '../styles/tree.css';

const VisualizacionArbol = ({ arbol }) => {
  const [datosArbol, setDatosArbol] = useState(null);
  const [dimensiones, setDimensiones] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const datos = arbol.obtenerDatos();
    setDatosArbol(datos);
  }, [arbol]);

  useEffect(() => {
    const handleResize = () => {
      const contenedor = document.getElementById('arbol-contenedor');
      if (contenedor) {
        setDimensiones({
          width: contenedor.clientWidth,
          height: contenedor.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="arbol-contenedor" className="arbol-contenedor">
      {datosArbol && Object.keys(datosArbol).length > 0 ? (
        <Tree
          data={datosArbol}
          translate={{ x: dimensiones.width / 2, y: 50 }}
          nodeSize={{ x: 100, y: 100 }}
          separation={{ siblings: 2, nonSiblings: 3 }}
          pathFunc="diagonal"
        />
      ) : (
        <div className="arbol-vacio">
          <p>Inserta números para ver el árbol</p>
        </div>
      )}
    </div>
  );
};

export default VisualizacionArbol;
