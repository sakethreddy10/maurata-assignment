import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        Murata Business Enterprises
      </div>
      <div className="user-info">
        <span>{user.name}</span>
        <div className="user-icon">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <button 
          onClick={handleLogout}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;