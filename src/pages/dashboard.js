import React from 'react';
import aboutImage from '../images/nb7.jpg';

function Dashboard() {
  return (
    <div style={styles.container}>
      <img src={aboutImage} alt="About Us" style={styles.image} />
      <div style={styles.content}>
        {/* Your content goes here */}
        <h1>Welcome to Our Dashboard!</h1>
        <p>This is a work in progress...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 100px)', // Adjust according to your header and footer height
  },
  image: {
    width: '100%',
    maxWidth: '600px', // Adjust the maximum width as needed
    marginBottom: '20px', // Add space between image and content
  },
  content: {
    textAlign: 'center',
  },
};

export default Dashboard;
