import { LinkedList } from './LinkedList';
import { DoublyLinkedList } from './DoublyLinkedList';
import { CircularList } from './CircularList';
import { DoublyCircularList } from './DoublyCircularList';

export class VehicleManagementSystem {
  constructor() {
    // Vehículos disponibles - Lista Enlazada
    this.availableVehicles = new LinkedList();
    
    // Historial de alquileres - Lista Doblemente Enlazada
    this.rentalHistory = new DoublyLinkedList();
    
    // Vehículos destacados (rotación) - Lista Circular
    this.featuredVehicles = new CircularList();
    
    // Inversionistas activos - Lista Circular Doblemente Enlazada
    this.activeInvestors = new DoublyCircularList();
    
    // Vehículos alquilados para referencia rápida
    this.rentedVehicles = new Map();
  }

  // ==================== VEHÍCULOS DISPONIBLES ====================
  addAvailableVehicle(vehicle) {
    this.availableVehicles.insert(vehicle);
    // Agregar TODOS los vehículos a la lista circular de destacados
    this.featuredVehicles.insert(vehicle);
  }

  getAvailableVehicles() {
    return this.availableVehicles.toArray();
  }

  removeAvailableVehicle(vehicleId) {
    return this.availableVehicles.delete(vehicleId);
  }

  // ==================== ALQUILERES ====================
  rentVehicle(vehicleId, renterName) {
    const vehicle = this.availableVehicles.findById(vehicleId);
    if (!vehicle) {
      return { success: false, message: 'Vehículo no disponible' };
    }

    // Crear registro de alquiler
    const rentalRecord = {
      id: `rental_${Date.now()}`,
      vehicleId: vehicleId,
      vehicleName: vehicle.name,
      renterName: renterName,
      rentalDate: new Date().toLocaleString('es-ES'),
      status: 'Activo'
    };

    // Agregar al historial
    this.rentalHistory.insert(rentalRecord);

    // Eliminar de disponibles
    this.availableVehicles.delete(vehicleId);
    this.rentedVehicles.set(vehicleId, rentalRecord);

    // Eliminar de destacados si estaba allí
    this.featuredVehicles.delete(vehicleId);

    return { success: true, message: 'Vehículo alquilado exitosamente', record: rentalRecord };
  }

  returnVehicle(vehicleId, vehicle) {
    const rental = this.rentedVehicles.get(vehicleId);
    if (!rental) {
      return { success: false, message: 'Alquiler no encontrado' };
    }

    // Actualizar estado del alquiler
    rental.returnDate = new Date().toLocaleString('es-ES');
    rental.status = 'Completado';

    // Agregar vehículo de vuelta a disponibles
    this.availableVehicles.insert(vehicle);
    this.featuredVehicles.insert(vehicle);

    this.rentedVehicles.delete(vehicleId);

    return { success: true, message: 'Vehículo devuelto exitosamente' };
  }

  getRentalHistory() {
    return this.rentalHistory.toArray();
  }

  getRentalHistoryReverse() {
    return this.rentalHistory.toArrayReverse();
  }

  // ==================== VEHÍCULOS DESTACADOS ====================
  rotateFeaturedVehicle() {
    return this.featuredVehicles.rotate();
  }

  getFeaturedVehicle() {
    return this.featuredVehicles.getCurrentItem();
  }

  getFeaturedVehicles() {
    return this.featuredVehicles.toArray();
  }

  // ==================== INVERSIONISTAS ====================
  addInvestor(investor) {
    this.activeInvestors.insert(investor);
  }

  removeInvestor(investorId) {
    return this.activeInvestors.delete(investorId);
  }

  getInvestors() {
    return this.activeInvestors.toArrayForward();
  }

  getInvestorsReverse() {
    return this.activeInvestors.toArrayBackward();
  }

  // ==================== ESTADÍSTICAS ====================
  getStatistics() {
    return {
      availableVehicles: this.availableVehicles.getSize(),
      rentedVehicles: this.rentedVehicles.size,
      totalRentals: this.rentalHistory.getSize(),
      totalVehicles: this.availableVehicles.getSize() + this.rentedVehicles.size,
      activeInvestors: this.activeInvestors.getSize()
    };
  }
}
