import React from 'react';

const Home = ({ user, backgroundMedia, setBackgroundMedia }) => {
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundMedia({
          url: event.target.result,
          type: file.type.startsWith('image/') ? 'image' : 'video'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultBackground = 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="home-section">
      {backgroundMedia ? (
        backgroundMedia.type === 'image' ? (
          <img 
            src={backgroundMedia.url} 
            alt="Background" 
            className="background-media"
          />
        ) : (
          <video 
            src={backgroundMedia.url} 
            className="background-media"
            autoPlay 
            loop 
            muted
          />
        )
      ) : (
        <img 
          src={defaultBackground} 
          alt="Default Background" 
          className="background-media"
        />
      )}
      
      <div className="welcome-overlay">
        <h1>Welcome to {user.name}</h1>
        <p>Have a great day ahead!</p>
        
        <div className="media-upload">
          <label htmlFor="media-input" style={{ 
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: '#667eea',
            color: 'white',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Upload Background Media
          </label>
          <input
            id="media-input"
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            style={{ display: 'none' }}
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Upload an image or video to replace the background
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;