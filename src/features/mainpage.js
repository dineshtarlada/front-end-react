import React from 'react';
import LogIn from './auth/login';
import backgroundImg from '../images/mainbackground.jpg'; // Replace with the actual path

function MainComponent() {
  return (
    <div
      className="row"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="col-md-3" style={{ textAlign: 'left', paddingLeft: '30px' }}>
        <h1
          style={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '4rem',
            letterSpacing: '6px',
            margin: 0,
            color: 'white',
          }}
        >
          HEXAREWARDS
        </h1>
        <h4 style={{ color: 'white', fontSize: '1.2rem', marginTop: '10px', fontWeight: 'bold', textAlign: 'left' }}>
  Empowering employees through a rewarding and innovative rewards system.
</h4>
      </div>
      <div className="col-md-5">
        <LogIn />
      </div>
    </div>
  );
}

export default MainComponent;
