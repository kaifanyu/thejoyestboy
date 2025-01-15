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

      <div className="button-group">
      <button className="button" onClick={handleNext}>
        Next / Siguiente
        <svg width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
              <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1087.000000)" fill="#000000">
                  <path d="M324,1117 C316.268,1117 310,1110.73 310,1103 C310,1095.27 316.268,1089 324,1089 C331.732,1089 338,1095.27 338,1103 C338,1110.73 331.732,1117 324,1117 L324,1117 Z M324,1087 C315.163,1087 308,1094.16 308,1103 C308,1111.84 315.163,1119 324,1119 C332.837,1119 340,1111.84 340,1103 C340,1094.16 332.837,1087 324,1087 L324,1087 Z M330.535,1102.12 L324.879,1096.46 C324.488,1096.07 323.855,1096.07 323.465,1096.46 C323.074,1096.86 323.074,1097.49 323.465,1097.88 L327.586,1102 L317,1102 C316.447,1102 316,1102.45 316,1103 C316,1103.55 316.447,1104 317,1104 L327.586,1104 L323.465,1108.12 C323.074,1108.51 323.074,1109.15 323.465,1109.54 C323.855,1109.93 324.488,1109.93 324.879,1109.54 L330.535,1103.88 C330.775,1103.64 330.85,1103.31 330.795,1103 C330.85,1102.69 330.775,1102.36 330.535,1102.12 L330.535,1102.12 Z" id="arrow-right-circle" sketch:type="MSShapeGroup">

      </path>
              </g>
          </g>
      </svg>

      </button>

        <button className="button skip-button" onClick={handleSkip}>
          Skip / Saltar
          <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#000000" fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 0110.535-5.096l-9.131 9.131A6.472 6.472 0 011.5 8zm2.465 5.096a6.5 6.5 0 009.131-9.131l-9.131 9.131z" clipRule="evenodd"/></svg>
        </button>
        <button className="button help-button" onClick={handleHelp}>
          Help
          <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 5.5C5.5 4.11929 6.61929 3 8 3C9.38071 3 10.5 4.11929 10.5 5.5C10.5 6.88071 9.38071 8 8 8H7V11H8C11.0376 11 13.5 8.53757 13.5 5.5C13.5 2.46243 11.0376 0 8 0C4.96243 0 2.5 2.46243 2.5 5.5H5.5Z" fill="#000000"/>
          <path d="M10 13H7V16H10V13Z" fill="#000000"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Phone;
