import React, { Component, PropTypes } from 'react';
import Person from './Person';
import './Library.css';

import LibraryMenu from './LibraryMenu';

import { Panel, Row, Col } from 'react-bootstrap';

const Library = (props) => {
  const { name, persons } = props;
  // TODO: Remove LibraryMenu component
  return (
    <Panel className="library">
    <Row>
      { persons.map(person => {
        return (
          <Col xs={12} sm={6} key={person.id}>
            <Person key={person.id} person={person} name={name} />
          </Col>
        );
      })
    }
    </Row>
    </Panel>
  );
};

Library.propTypes = {
  name: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired
};

export default Library;
