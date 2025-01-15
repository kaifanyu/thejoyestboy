import React, { useState } from 'react';
import Phone from './Steps/Phone';
import DriversLicence from './Steps/DriversLicence';
import PickUpNumber from './Steps/PO';
import Container from './Steps/Container';
import './App.css'; // Import the CSS file

function App() {
  const [step, setStep] = useState(1);

  const totalSteps = 5;

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

  const handleSubmit = (val) => {
    console.log("dl: ", driversLicense);
    console.log("phone: ", phoneNumber);
    console.log("vol: ", volume);
    console.log("po: ", val);
    const payload = {
      driversLicense,
      phoneNumber,
      volume,
      poNumber: val,
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
        console.log('API response:', data);
        setImageData(data.image || '');
        setDockNumber(data.dockNumber || '');
        setGoogleMapsLink(data.googleMapsLink || '');
        setStep(5); // Move to the final display step
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        alert('Failed to submit data');
      });
  };

  const renderProgressBar = () => {
    const progressPercentage = (step / totalSteps) * 100;

    return (
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="container">
      {renderProgressBar()}
      {step === 1 && (
        <DriversLicence
          driversLicense={driversLicense}
          setDriversLicense={setDriversLicense}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Container
          volume={volume}
          setVolume={setVolume}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <PickUpNumber
          poNumber={poNumber}
          setPONumber={setPONumber}
          nextStep={nextStep}
        />
      )}
      {step === 4 && (
        <Phone
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSubmit={handleSubmit}
        />
      )}
      {step === 5 && (
        <div>
          <h2 className="heading">Submission Successful</h2>
        </div>
      )}
    </div>
  );
}

export default App;
