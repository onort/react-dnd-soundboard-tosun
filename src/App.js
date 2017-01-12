import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';

import Library from './components/library/Library';
import Queue from './components/queue/Queue';

const clips = [
  { id: 1, name: "Clip 1" },
  { id: 2, name: "Clip 2" },
  { id: 3, name: "Clip 3" }
];

const items = [];

class App extends Component {
  render() {
    return (
      <div className="mainDiv">
        <Queue name="Queue" items={items} />
        <Library name="Library" clips={clips} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);