import React from 'react';
import './SiteHeader.css';

const SiteHeader = (props) => {
  const { title } = props;

  return (
    <div className="siteHeaderDiv">
      <img src="/images/fes.png" />
      <h3>{title}</h3>
    </div>
  );
};

SiteHeader.propTypes = {
  title: React.PropTypes.string
};

export default SiteHeader;