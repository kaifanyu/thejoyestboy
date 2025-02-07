import React from 'react';

function Phone({ phoneNumber, setPhoneNumber, handleSubmit }) {
  const handleNext = () => {
    // Validation if needed
    handleSubmit(phoneNumber);
  };

  const handleSkip = () => {
    setPhoneNumber('');
    handleSubmit('');
  };

  const handleHelp = () => {
    alert('Help message for entering your phone number.');
  };

  return (
    <div>
      <h2 className="heading">输入电话号码</h2>
      {/* <h2 className="heading">फोन नंबर दर्ज करें</h2> */}
      <h2 className="heading">Ingrese el número de teléfono</h2>
      <h2 className="heading">↓ Enter Phone Number: ↓</h2>
      
      <input
        id="phoneNumber"
        type='number'
        inputMode='numeric'
        pattern="[0-9]*" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="(626)..."
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

export default Phone;
