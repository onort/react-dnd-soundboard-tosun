import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Library from './components/library/Library';
import Queue from './components/queue/Queue';
import { persons } from './audio';

import { Grid, Row, Col } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      persons
    };
  }

  render() {
    const { items, persons } = this.state;
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={4} mdOffset={1} >
            <Queue name="Queue" items={items} persons={persons} />
          </Col>
          <Col xs={6} md={4} mdOffset={2} >
            <Library name="Library" persons={persons} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
