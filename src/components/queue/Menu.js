import React, { Component, PropTypes } from 'react';
import './Menu.css';

import { Button, ButtonGroup, ButtonToolbar, Glyphicon } from 'react-bootstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          { this.state.playing ? 
            <Button><Glyphicon glyph="pause" /></Button> :
            <Button><Glyphicon glyph="play" /></Button> }
          <Button><Glyphicon glyph="stop" /></Button>
          <Button><Glyphicon glyph="random" /></Button>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
          <Button><Glyphicon glyph="remove-sign" /></Button>
          <Button><Glyphicon glyph="share" /></Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Menu;

// play, pause, stop, random, remove-sign, share

