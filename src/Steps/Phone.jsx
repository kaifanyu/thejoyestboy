import React from 'react';

function Step1({ phoneNumber, setPhoneNumber, nextStep }) {
  const handleNext = () => {
    // Validation if needed
    nextStep();
  };

  const handleSkip = () => {
    setPhoneNumber('');
    nextStep();
  };

  const handleHelp = () => {
    alert('Help message for entering your phone number.');
  };

  return (
    <div>
      <h2 className="heading"> 第一步：输入电话号码</h2>
      <h2 className="heading"> चरण 1: फोन नंबर दर्ज करें</h2>
      <h2 className="heading"> Paso 1: Ingrese el número de teléfono</h2>
      <h2 className="heading">Step 1: Enter Phone Number</h2>
      
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        id="phoneNumber"
        type='number'
        inputMode='numeric'
        pattern="[0-9]*" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
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

export default Step1;
