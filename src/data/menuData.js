// MenuItem estructura para el árbol N-ario
export class MenuItem {
  constructor(id, title, link = '#', icon = null) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.icon = icon;
    this.children = [];
  }

  addChild(child) {
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  removeChild(childId) {
    this.children = this.children.filter(child => child.id !== childId);
  }

  getChild(childId) {
    return this.children.find(child => child.id === childId);
  }

  hasChildren() {
    return this.children.length > 0;
  }
}

// Menú inicial con estructura jerárquica
export const createInitialMenu = () => {
  // Crear items
  const profile = new MenuItem('profile', 'Perfil', '/profile', '👤');
  const messages = new MenuItem('messages', 'Mensajes', '/messages', '💬');
  const settings = new MenuItem('settings', 'Configuración', '/settings', '⚙️');
  const help = new MenuItem('help', 'Ayuda', '/help', '❓');
  const logout = new MenuItem('logout', 'Cerrar Sesión', '/logout', '🚪');

  // Subitems de Configuración
  const account = new MenuItem('account', 'Cuenta', '/settings/account');
  const accountProfile = new MenuItem('account-profile', 'Perfil', '/settings/account/profile');
  const securityPrivacy = new MenuItem('security-privacy', 'Seguridad y Privacidad', '/settings/security');
  const password = new MenuItem('password', 'Contraseña', '/settings/password');
  const notification = new MenuItem('notification', 'Notificaciones', '/settings/notification');

  // Subitems de Ayuda
  const faqs = new MenuItem('faqs', "Preguntas Frecuentes", '/help/faqs');
  const submitTicket = new MenuItem('submit-ticket', 'Crear Ticket', '/help/submit-ticket');
  const networkStatus = new MenuItem('network-status', 'Estado de Red', '/help/network-status');

  // Construir árbol
  account.addChild(accountProfile);
  account.addChild(securityPrivacy);
  account.addChild(password);
  account.addChild(notification);

  settings.addChild(account);

  help.addChild(faqs);
  help.addChild(submitTicket);
  help.addChild(networkStatus);

  // Menu raíz
  const rootMenu = [profile, messages, settings, help, logout];

  return rootMenu;
};
