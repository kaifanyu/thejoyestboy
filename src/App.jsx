import React, { useState } from 'react';
import Step1 from './Steps/Phone';
import Step2 from './Steps/DriversLiscence';
import Step3 from './Steps/PO';
import Step4 from './Steps/Account';
import Step5 from './Steps/Container';
import Confirmation from './Confirmation';
import './App.css'; // Import the CSS file

function App() {
  const [step, setStep] = useState(1);
  // Form data states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [poNumber, setPONumber] = useState('');
  const [volume, setVolume] = useState('');
  const [accountName, setAccountName] = useState('');
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
      accountName,
      volume,
    };

    fetch('https://api.kaifany.com/submit-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('API response:', data); // Debug response
        setImageData(data.image || '');
        setDockNumber(data.dockNumber || '');
        setGoogleMapsLink(data.googleMapsLink || '');
        setStep(7); // Move to the final display step
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
        <Step4
          accountName={accountName}
          setAccountName={setAccountName}
          nextStep={nextStep}
        />
      )}
      {step === 5 && (
        <Step5
          volume={volume}
          setVolume={setVolume}
          nextStep={nextStep}
        />
      )}
      {step === 6 && (
        <Confirmation
          phoneNumber={phoneNumber}
          driversLicense={driversLicense}
          poNumber={poNumber}
          volume={volume}
          account={accountName}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 7 && (
        <div>
          <h2 className="heading">Submission Successful</h2>
          {dockNumber && <h2 className="heading">Dock Number: {dockNumber}</h2>}
          {googleMapsLink && (
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              View on Google Maps
            </a>
          )}
          {imageData ? (
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt="Result"
                style={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  height: 'auto',
                  marginTop: '10px',
                }}
              />
            </a>
          ) : (
            <p>No image available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
