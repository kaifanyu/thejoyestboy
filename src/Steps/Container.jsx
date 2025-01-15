import React from 'react';

function Container({ volume, setVolume, nextStep }) {
  const handleSelect = (value) => {
    setVolume(value);
    console.log("Selected Value: ", value); // Directly log the value
    nextStep();
  };

  return (
    <div>
      <h2 className="heading">您的卡车是满载还是空载？</h2>
      {/* <h2 className="heading">क्या आपका ट्रक भरा हुआ है या खाली है?</h2> */}
      <h2 className="heading">¿Su camión está cargado o vacío?</h2>
      <h2 className="heading">Is your truck Full or Empty Load?</h2>

      <div className="button-group">
        <button className="button skip-button" onClick={() => handleSelect(1)}>
          Full
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#000000" d="M8 0a8 8 0 100 16A8 8 0 008 0z"></path>
          </svg>
        </button>

        <button className="button" onClick={() => handleSelect(0)}>
          Empty
          <svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M960 1807.059c-467.125 0-847.059-379.934-847.059-847.059 0-467.125 379.934-847.059 847.059-847.059 467.125 0 847.059 379.934 847.059 847.059 0 467.125-379.934 847.059-847.059 847.059M960 0C430.645 0 0 430.645 0 960s430.645 960 960 960 960-430.645 960-960S1489.355 0 960 0" fillRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Container;
