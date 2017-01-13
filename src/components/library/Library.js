import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Clip from './Clip';
import './Library.css';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { clips: props.clips, persons: props.persons };
  }

  render() {
    const { clips, persons } = this.state;
    const personRender = persons.map(person => {
      return (
        <ListGroup key={person.id}>
        <h3>{person.name}</h3>
          <ListGroupItem>
            {person.clips.map(clip => <Clip key={clip.id} clip={clip} listName={this.props.name} />)}
          </ListGroupItem>
        </ListGroup>
      );
    });

    return (
      <div className="library">
        {personRender}
      </div>
    );
  }
}

Library.propTypes = {
  clips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired
};

export default Library;
