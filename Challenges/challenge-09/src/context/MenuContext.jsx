import React, { createContext, useState } from 'react';
import { createInitialMenu } from '../data/menuData';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems] = useState(() => createInitialMenu());
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [activeItem, setActiveItem] = useState('profile');

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isExpanded = (itemId) => expandedItems.has(itemId);

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        expandedItems,
        activeItem,
        setActiveItem,
        toggleExpanded,
        isExpanded,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
