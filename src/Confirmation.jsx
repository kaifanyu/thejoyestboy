import React from 'react';

function Confirmation({ phoneNumber, driversLicense, poNumber, handleSubmit }) {
  const handleSkip = () => {
    // If "skip" is pressed here, do you want to skip submission altogether?
    // This is up to you. Example: Just call handleSubmit anyway or do nothing.
    handleSubmit();
  };

  const handleHelp = () => {
    alert('This is help for the confirmation page.');
  };

  return (
    <div>
      <h2 className="heading">Confirmation</h2>
      <div className="confirmation-summary">
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Driver's License:</strong> {driversLicense}</p>
        <p><strong>PO Number:</strong> {poNumber}</p>
      </div>

      <div className="button-group">
        <button className="button" onClick={handleSubmit}>
          Submit
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

export default Confirmation;
