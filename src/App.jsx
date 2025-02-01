import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Phone from './Steps/Phone';
import DriversLicence from './Steps/DriversLicence';
import PickUpNumber from './Steps/PO';
import Trailer from './Steps/Trailer';
import Verify from './Verify';
import './App.css'; // Import the CSS file

function FormSteps() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form data states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [poNumber, setPONumber] = useState('');
  const [trailerNumber, setTrailerNumber] = useState('');

  // Response data states
  const [imageData, setImageData] = useState('');
  const [dockNumber, setDockNumber] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const handleSubmit = () => {
    const payload = { driversLicense, phoneNumber, poNumber, trailerNumber };

    fetch('https://api.kaifany.com/submit-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.image || '');
        setDockNumber(data.dockNumber || '');
        setGoogleMapsLink(data.googleMapsLink || '');
        setStep(5);
      })
      .catch(() => alert('Failed to submit data'));
  };

  const renderProgressBar = () => (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
    </div>
  );

  return (
    <div className="container">
      {renderProgressBar()}
      {step === 1 && <DriversLicence driversLicense={driversLicense} setDriversLicense={setDriversLicense} nextStep={nextStep} />}
      {step === 2 && <Trailer trailerNumber={trailerNumber} setTrailerNumber={setTrailerNumber} nextStep={nextStep} />}
      {step === 3 && <PickUpNumber poNumber={poNumber} setPONumber={setPONumber} nextStep={nextStep} />}
      {step === 4 && <Phone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} handleSubmit={handleSubmit} />}
      {step === 5 && <h2 className="heading">Submission Successful</h2>}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormSteps />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;
