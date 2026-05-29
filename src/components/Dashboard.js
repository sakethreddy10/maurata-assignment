import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Employees from './Employees';

const Dashboard = ({ user, setUser }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [backgroundMedia, setBackgroundMedia] = useState(null);

  return (
    <div className="dashboard">
      <Header user={user} setUser={setUser} />
      <div className="main-layout">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="content">
          {activeSection === 'home' && (
            <Home 
              user={user} 
              backgroundMedia={backgroundMedia}
              setBackgroundMedia={setBackgroundMedia}
            />
          )}
          {activeSection === 'employees' && (
            <Employees backgroundMedia={backgroundMedia} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;