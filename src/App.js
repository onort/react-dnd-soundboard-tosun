import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Grid, Row, Col } from 'react-bootstrap';

import Library from './components/library/Library';
import Queue from './components/queue/Queue';
import { audioFiles, persons } from './audio';

const items = [];

class App extends Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={4} mdOffset={1} >
            <Queue name="Queue" items={items} />
          </Col>
          <Col xs={6} md={4} mdOffset={2} >
            <Library name="Library" clips={audioFiles} persons={persons} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);