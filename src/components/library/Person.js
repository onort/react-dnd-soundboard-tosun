import React, { Component, PropTypes } from 'react';
import Clip from './Clip';
import './Person.css';

import { Collapse, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.togglePerson = this.togglePerson.bind(this);
  }

  togglePerson() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { person } = this.props;
    const imageSrc = `/images/${person.img}`;
    return (
      <ListGroup>
        <div onClick={this.togglePerson} className="personHeader">
          <Image src={imageSrc} className="personImage" circle responsive/>
          <span className="personName">{person.name}</span>
        </div>
        <Collapse in={this.state.collapsed}>
          <div>
            {person.clips.map(clip => {
              return (
                <Clip key={clip.id} clip={clip} listName={this.props.name} />
              );
            })}
          </div>
        </Collapse>
      </ListGroup>
    );
  }
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  person: PropTypes.object.isRequired
};

export default Person;