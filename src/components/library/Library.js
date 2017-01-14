import React, { Component, PropTypes } from 'react';
import Person from './Person';
import './Library.css';

import { Panel } from 'react-bootstrap';

const Library = (props) => {
  const { clips, persons } = props;
  return (
    <Panel className="library">
      { persons.map(person => <Person key={person.id} person={person}/>)}
    </Panel>
  );
};

Library.propTypes = {
  clips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired
};

export default Library;
