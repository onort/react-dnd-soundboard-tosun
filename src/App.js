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
    this.createRandomQueue = this.createRandomQueue.bind(this);
  }

  createRandomQueue() {
    const allClips = []; 
    const items = [];
    persons.forEach(person => person.clips.forEach(clip => allClips.push(clip)));
    while(items.length < 10) {
      let randomIndex = Math.floor(Math.random() * allClips.length);
      let itemToPush = allClips[randomIndex];
      if (items.includes(itemToPush)) continue;
      items.push(itemToPush);
    }
    this.setState({ items });
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={6} md={4} mdOffset={1} >
            <Queue name="Queue" items={this.state.items} />
          </Col>
          <Col xs={6} md={4} mdOffset={2} >
            <Library name="Library" persons={this.state.persons} createRandomQueue={this.createRandomQueue} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
