import React, { useState } from 'react';
import Step1 from './Steps/Phone';
import Step2 from './Steps/DriversLiscence';
import Step3 from './Steps/PO';
import Confirmation from './Confirmation';
import './App.css'; // Import the CSS file

function App() {
  const [step, setStep] = useState(1);

  // Form data states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [poNumber, setPONumber] = useState('');

  // Response data states
  const [imageData, setImageData] = useState('');
  const [dockNumber, setDockNumber] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const handleSubmit = () => {
    const payload = {
      phoneNumber,
      driversLicense,
      poNumber,
    };

    fetch('http://api.kaifany.com/submit-data'aaaa, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.image);
        setDockNumber(data.dockNumber);
        setGoogleMapsLink(data.googleMapsLink);
        setStep(5); // Move to the final display step
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        alert('Failed to submit data');
      });
  };

  return (
    <div className="container">
      {step === 1 && (
        <Step1
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2
          driversLicense={driversLicense}
          setDriversLicense={setDriversLicense}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <Step3
          poNumber={poNumber}
          setPONumber={setPONumber}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <Confirmation
          phoneNumber={phoneNumber}
          driversLicense={driversLicense}
          poNumber={poNumber}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 5 && (
        <div>
          <h2 className="heading">Submission Successful</h2>
          <h2 className="heading">Dock Number: {dockNumber}</h2>
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            View on Google Maps
          </a>
          <br />
          <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
            <img
              src={`data:image/jpeg;base64,${imageData}`}
              alt="Result"
              style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto', marginTop: '10px' }}
            />
          </a>
        </div>
      )}


    </div>
  );
}

export default App;
