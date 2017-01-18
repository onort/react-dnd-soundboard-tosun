import React from 'react';
import './PortraitModeWarning.css';

const PortraitModeWarning = () => {
  return (
    <div id="portraitWarning">
      <div className="warningContainer">
        <img src="/images/landscape.png" />
        <h3>Please switch to Landscape mode!</h3>
      </div>
    </div>
  );
};

export default PortraitModeWarning;