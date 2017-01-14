import React, { Component, PropTypes } from 'react';
import Person from './Person';
import './Library.css';

import LibraryMenu from './LibraryMenu';

import { Panel } from 'react-bootstrap';

const Library = (props) => {
  const { clips, persons, name } = props;
  return (
    <Panel className="library">
    <LibraryMenu />
      { persons.map(person => <Person key={person.id} person={person} name={name}/>)}
    </Panel>
  );
};

Library.propTypes = {
  clips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired
};

export default Library;
