import React from 'react';

function PickUpNumber({ poNumber, setPONumber, nextStep }) {
  const handleNext = () => {
    // Validation if needed
    nextStep();
  };

  const handleSkip = () => {
    setPONumber('');
    nextStep('');
  };

  const handleHelp = () => {
    alert('Help message for PO Number entry.');
  };

  return (
    <div>
      <h2 className="heading">输入提货号码 / 装载号码</h2>
      <h2 className="heading">Ingrese el número de recogida / número de carga</h2>
      <h2 className="heading">↓ Enter Pick Up Number / Load Number ↓</h2>  

      <input
        id="poNumber"
        type="text"
        value={poNumber}
        onChange={(e) => setPONumber(e.target.value)}
        placeholder="Pick up number: 1223..."
      />
      
      <div className="button-group"><button 
        className="button next-button" 
        onClick={handleNext}
        style={{ backgroundColor: 'green', color: 'white', padding: '10px 15px', fontSize: '1rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
            Next / Siguiente
          </button>

        <button className="button skip-button" onClick={handleSkip}
        style={{ backgroundColor: 'red', color: 'white', padding: '10px 15px', fontSize: '1rem', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
          Skip / Saltar
        </button>
      </div>

        </div>
  );
}

export default PickUpNumber;
