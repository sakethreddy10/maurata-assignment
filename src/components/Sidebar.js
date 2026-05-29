import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'employees', label: 'Employees' }
  ];

  return (
    <nav className="sidebar">
      <ul>
        {menuItems.map(item => (
          <li
            key={item.id}
            className={activeSection === item.id ? 'active' : ''}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;