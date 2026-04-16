# 🚗 Sistema de Gestión de Movilidad Urbana

Un sistema completo para gestionar vehículos, alquileres, inversionistas y rotación de vehículos destacados utilizando diferentes tipos de estructuras de datos enlazadas.

## 📋 Requisitos del Proyecto

El sistema implementa las siguientes estructuras de datos:

1. **Lista Enlazada Simple** - Para gestionar vehículos disponibles
2. **Lista Doblemente Enlazada** - Para registrar historial de alquileres
3. **Lista Circular** - Para rotar vehículos destacados automáticamente cada 5 segundos
4. **Lista Circular Doblemente Enlazada** - Para administrar inversionistas activos

## 🎯 Características Principales

### Gestión de Vehículos
- ✅ Agregar vehículos disponibles
- ✅ Alquilar vehículos (se eliminan de disponibles automáticamente)
- ✅ Devolver vehículos (se restauran a disponibles)
- ✅ Ver lista completa de vehículos disponibles

### Historial de Alquileres
- ✅ Registro automático de cada alquiler en la lista doblemente enlazada
- ✅ Ver historial de alquileres en orden cronológico
- ✅ Marcar alquileres como completados al devolverse
- ✅ Navegación hacia adelante y atrás en el historial

### Vehículos Destacados
- ✅ Rotación automática cada 5 segundos
- ✅ Lista circular para la rotación continua
- ✅ Vehículo destacado se muestra en la sección principal con animación

### Inversionistas
- ✅ Gestión de inversionistas activos
- ✅ Navegación circular hacia adelante y atrás
- ✅ Visualización de montos invertidos y tipo de inversionista

### Estadísticas en Tiempo Real
- ✅ Número de vehículos disponibles
- ✅ Número de vehículos actualmente alquilados
- ✅ Total de alquileres registrados
- ✅ Número de inversionistas activos

## 🚀 Cómo Ejecutar

### Desarrollo
```bash
cd vehiculos-app
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Build para Producción
```bash
npm run build
```

## 💻 Estructura del Proyecto

```
src/
├── components/              
│   ├── AvailableVehicles.jsx
│   ├── FeaturedVehicle.jsx
│   ├── RentalHistory.jsx
│   ├── Investors.jsx
│   └── Statistics.jsx
├── structures/              
│   ├── LinkedList.js        # Lista Enlazada
│   ├── DoublyLinkedList.js  # Lista Doblemente Enlazada
│   ├── CircularList.js      # Lista Circular
│   ├── DoublyCircularList.js # Lista Circular Doblemente Enlazada
│   └── VehicleManagementSystem.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## 🔧 Guía de Uso

1. **Alquilar vehículos** - Ingresa tu nombre y selecciona un vehículo
2. **Ver vehículo destacado** - Se rota automáticamente cada 5 segundos
3. **Devolver vehículos** - Haz clic en "Devolver" en el historial
4. **Ver inversionistas** - Tabla de inversionistas activos

## 🎨 Próximos Pasos

Puedes mejorar la interfaz visual con:
- Diseño visual más atractivo
- Más animaciones
- Filtros y búsqueda
- Gráficos de estadísticas
- Base de datos persistente
