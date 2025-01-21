import React from 'react';
import trailerImage from './trailer.jpg';

function Trailer({ trailerNumber, setTrailerNumber, nextStep }) {
  const handleNext = () => {
    // Validation if needed
    nextStep();
  };

  const handleSkip = () => {
    setTrailerNumber('');
    nextStep();
  };

  return (
    <div>

      <h2 className="heading">请输入挂车号码</h2>
      {/* <h2 className="heading">खाता नाम दर्ज करें</h2> */}
      <h2 className="heading">Ingrese el número del remolque</h2>
      <h2 className="heading">↓ Enter Trailer Number ↓</h2>
      
      <img src={trailerImage}   style={{     display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '20px',
    height: '250px',
    width: 'auto', }} alt="Trailer num" />
      

      <input
        id="trailerNumber"
        type="text"
        value={trailerNumber}
        onChange={(e) => setTrailerNumber(e.target.value)}
        placeholder="1234.."
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

export default Trailer;
