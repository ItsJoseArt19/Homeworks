import React, { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import MenuItem from './MenuItem';
import '../styles/sidebar.css';

const Sidebar = () => {
  const { menuItems } = useContext(MenuContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Menú</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} level={0} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
