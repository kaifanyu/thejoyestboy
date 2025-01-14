import React from 'react';

function Step2({ driversLicense, setDriversLicense, nextStep }) {
  const handleNext = () => {
    // Validation if needed
    nextStep();
  };

  const handleSkip = () => {
    setDriversLicense('');
    nextStep();
  };

  const handleHelp = () => {
    alert('Help message for Driver’s License entry.');
  };

  return (
    <div>
      
      <h2 className="heading">第二步：输入驾驶执照</h2>
      <h2 className="heading">Step 2: चरण 2: ड्राइवर का लाइसेंस दर्ज करें</h2>
      <h2 className="heading">Paso 2: Ingrese la licencia de conducir</h2>
      <h2 className="heading">Step 2: Enter Driver's License</h2>
      
      <label htmlFor="driversLicense">Driver's License</label>
      <input
        id="driversLicense"
        type="text"
        value={driversLicense}
        onChange={(e) => setDriversLicense(e.target.value)}
        placeholder="Driver's License Number"
      />

      <div className="button-group">
        <button className="button" onClick={handleNext}>
          Next
        </button>
        <button className="button skip-button" onClick={handleSkip}>
          Skip
        </button>
        <button className="button help-button" onClick={handleHelp}>
          Help
        </button>
      </div>
    </div>
  );
}

export default Step2;
