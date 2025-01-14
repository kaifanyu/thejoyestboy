import React from 'react';

function Step5({ volume, setVolume, nextStep }) {
  const handleSelect = (value) => {
    setVolume(value);
    nextStep();
  };

  const handleSkip = () => {
    setVolume('');
    nextStep();
  };

  const handleHelp = () => {
    alert('Help message for selecting full or empty load.');
  };

  return (
    <div>
      <h2 className="heading">满载或空载?</h2>
      <h2 className="heading">पूर्ण या खाली लोड?</h2>
      <h2 className="heading">Carga completa o vacía?</h2>
      <h2 className="heading">Full or Empty Load?</h2>

      <div className="button-group">
        <button className="button" onClick={() => handleSelect(1)}>
          Full
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" d="M8 0a8 8 0 100 16A8 8 0 008 0z"></path>
          </svg>
        </button>

        <button className="button" onClick={() => handleSelect(0)}>
          Empty
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" d="M8 0a8 8 0 100 16A8 8 0 008 0z"></path>
          </svg>
        </button>
      </div>

      <div className="button-group">
        <button className="button skip-button" onClick={handleSkip}>
          Skip
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" d="M8 0a8 8 0 100 16A8 8 0 008 0z"></path>
          </svg>
        </button>

        <button className="button help-button" onClick={handleHelp}>
          Help
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5C5.5 4.11929 6.61929 3 8 3C9.38071 3 10.5 4.11929 10.5 5.5C10.5 6.88071 9.38071 8 8 8H7V11H8C11.0376 11 13.5 8.53757 13.5 5.5C13.5 2.46243 11.0376 0 8 0C4.96243 0 2.5 2.46243 2.5 5.5H5.5Z" fill="#000000"></path>
            <path d="M10 13H7V16H10V13Z" fill="#000000"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Step5;
