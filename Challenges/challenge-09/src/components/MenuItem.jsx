import React, { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import '../styles/sidebar.css';

const MenuItem = ({ item, level = 0 }) => {
  const { isExpanded, toggleExpanded, activeItem, setActiveItem } = useContext(MenuContext);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeItem === item.id;

  const handleClick = () => {
    setActiveItem(item.id);
    if (hasChildren) {
      toggleExpanded(item.id);
    }
  };

  return (
    <div className="menu-item-container" style={{ paddingLeft: `${level * 20}px` }}>
      <div
        className={`menu-item ${isActive ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className={`toggle-arrow ${isExpanded(item.id) ? 'expanded' : ''}`}>
            ▶
          </span>
        )}
        {!hasChildren && <span className="toggle-arrow empty"></span>}
        
        {item.icon && <span className="menu-icon">{item.icon}</span>}
        <span className="menu-title">{item.title}</span>
      </div>

      {hasChildren && isExpanded(item.id) && (
        <div className="menu-children">
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
