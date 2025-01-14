import React from 'react';

function Step3({ poNumber, setPONumber, nextStep }) {
  const handleNext = () => {
    // Validation if needed
    nextStep();
  };

  const handleSkip = () => {
    setPONumber('');
    nextStep();
  };

  const handleHelp = () => {
    alert('Help message for PO Number entry.');
  };

  return (
    <div>
      

      <h2 className="heading">第三步：输入采购订单号 (PO) </h2>
      <h2 className="heading">चरण 3: पीओ नंबर दर्ज करें</h2>
      <h2 className="heading">Paso 3: Ingrese el número de orden de compra (PO) </h2>
      <h2 className="heading">Step 3: Enter PO Number</h2>
      <label htmlFor="poNumber">PO Number</label>
      <input
        id="poNumber"
        type="text"
        value={poNumber}
        onChange={(e) => setPONumber(e.target.value)}
        placeholder="PO Number"
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

export default Step3;
