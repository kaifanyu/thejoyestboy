import React from 'react';

function Confirmation({ phoneNumber, driversLicense, poNumber, accountNumber, volume, handleSubmit }) {
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
      <h2 className="heading">提交</h2>
      <h2 className="heading">सबमिट</h2>
      <h2 className="heading">Confirmación</h2>
      <h2 className="heading">Confirmation</h2>
      <div className="confirmation-summary">
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Driver's License:</strong> {driversLicense}</p>
        <p><strong>PO Number:</strong> {poNumber}</p>
        <p><strong>Account Number:</strong> {accountNumber}</p>
        <p><strong>Volume:</strong> {volume ? "Full" : "Empty"}</p>
      </div>

      <div className="button-group">
        <button className="button" onClick={handleSubmit}>
          Submit / Enviar / सबमिट / 提交
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
