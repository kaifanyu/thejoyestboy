import React from 'react';
import driversImage from '../assets/drivers.jpg';

function DriversLicense({ driversLicense, setDriversLicense, nextStep }) {
  const handleNext = () => nextStep();
  const handleSkip = () => {
    setDriversLicense('');
    nextStep();
  };

  return (
    <div>
      <h2 className="heading">输入驾驶执照</h2>
      {/* <h2 className="heading">ड्राइवर का लाइसेंस दर्ज करें</h2> */}
      <h2 className="heading">Ingrese la licencia de conducir</h2>
      <h2 className="heading">↓ Enter Driver's License ↓</h2>
      <img src={driversImage} alt="Driver's License Example" className="example-image" />
      <input
        id="driversLicense"
        type="text"
        value={driversLicense}
        onChange={(e) => setDriversLicense(e.target.value)}
        placeholder="Enter Driver's License"
      />
      <div className="button-group">
        <button className="button next-button" onClick={handleNext}>
          Next / Siguiente
        </button>
        <button className="button skip-button" onClick={handleSkip}>
          Skip / Saltar
        </button>
      </div>
    </div>
  );
}

export default DriversLicense;
