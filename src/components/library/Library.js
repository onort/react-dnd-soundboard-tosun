import React, { Component, PropTypes } from 'react';
import Person from './Person';
import './Library.css';

import LibraryMenu from './LibraryMenu';

import { Panel, Row, Col } from 'react-bootstrap';

const Library = (props) => {
  const { name, persons } = props;
  // TODO: Remove LibraryMenu component
  return (
    <div className="libraryScroll">
      <Panel className="library">
      <Row>
        { persons.map(person => {
          return (
            <Col xs={12} key={person.id} className="personCol">
              <Person key={person.id} person={person} name={name} />
            </Col>
          );
        })
      }
      </Row>
      </Panel>
    </div>
  );
};

Library.propTypes = {
  name: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired
};

export default Library;
