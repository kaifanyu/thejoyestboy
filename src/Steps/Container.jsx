import React from 'react';
import full from './full.jpg'; // Ensure the image is in the correct directory.
import empty from './empty.jpg'; // Ensure the image is in the correct directory.
function Container({ volume, setVolume, nextStep }) {
  const handleSelect = (value) => {
    setVolume(value);
    console.log("Selected Value: ", value); // Directly log the value
    nextStep();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>您的卡车是满载还是空载？</h2>
      <h2 style={styles.heading}>¿Su camión está cargado o vacío?</h2>
      <h2 style={styles.heading}>Is your truck Full or Empty Load?</h2>

      <div style={styles.imageButtonContainer}>
        <div style={styles.imageContainer}>
          <img src={full} alt="Full Load" style={styles.image} />
          <button
            style={{ ...styles.button, ...styles.fullButton }}
            onClick={() => handleSelect(1)}
          >
            Full
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={styles.icon}
            >
              <path
                fill="#fff"
                d="M8 0a8 8 0 100 16A8 8 0 008 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div style={styles.imageContainer}>
          <img src={empty} alt="Empty Load" style={styles.image} />
          <button
            style={{ ...styles.button, ...styles.emptyButton }}
            onClick={() => handleSelect(0)}
          >
            Empty
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={styles.icon}
            >
              <path
                d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0"
                fillRule="evenodd"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '1.4rem',
    color: '#333',
    margin: '10px 0',
  },
  imageButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '20px',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    height: '150px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  button: {
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    maxWidth: '250px',
    transition: 'background-color 0.3s ease',
  },
  fullButton: {
    backgroundColor: '#dc3545', // Red
  },
  emptyButton: {
    backgroundColor: '#28a745', // Green
  },
  icon: {
    marginLeft: '8px',
  },
};

export default Container;
