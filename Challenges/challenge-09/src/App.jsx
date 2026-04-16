import React, { useContext } from 'react';
import { MenuContext } from './context/MenuContext';
import Sidebar from './components/Sidebar';
import './styles/global.css';

const App = () => {
  const { activeItem } = useContext(MenuContext);

  const getPageContent = () => {
    const contentMap = {
      profile: {
        title: '👤 Perfil',
        description: 'Administra tu información de perfil y configuración personal.',
      },
      messages: {
        title: '💬 Mensajes',
        description: 'Visualiza y administra tus mensajes.',
      },
      settings: {
        title: '⚙️ Configuración',
        description: 'Configura los ajustes y preferencias de tu cuenta.',
      },
      help: {
        title: '❓ Ayuda',
        description: 'Obtén ayuda y soporte técnico.',
      },
      logout: {
        title: '🚪 Cerrar Sesión',
        description: 'Has cerrado sesión exosamente.',
      },
      account: {
        title: 'Configuración de Cuenta',
        description: 'Administra la información de tu cuenta.',
      },
      'account-profile': {
        title: 'Sección de Perfil',
        description: 'Edita los detalles de tu perfil.',
      },
      'security-privacy': {
        title: 'Seguridad y Privacidad',
        description: 'Mejora la seguridad de tu cuenta y configuración de privacidad.',
      },
      password: {
        title: 'Contraseña',
        description: 'Cambia tu contraseña de forma segura.',
      },
      notification: {
        title: 'Notificaciones',
        description: 'Administra las preferencias de notificaciones.',
      },
      faqs: {
        title: "Preguntas Frecuentes",
        description: 'Encuentra respuestas a preguntas comunes.',
      },
      'submit-ticket': {
        title: 'Crear Ticket de Soporte',
        description: 'Crea un ticket de soporte para obtener ayuda.',
      },
      'network-status': {
        title: 'Estado de Red',
        description: 'Verifica el estado actual de la red.',
      },
    };

    const content = contentMap[activeItem] || {
      title: 'Bienvenido',
      description: 'Selecciona una opción del menú.',
    };

    return content;
  };

  const currentPage = getPageContent();

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="content-header">
          <h1>{currentPage.title}</h1>
        </div>
        <div className="content-body">
          <p>{currentPage.description}</p>
        </div>
      </main>
    </div>
  );
};

export default App;
