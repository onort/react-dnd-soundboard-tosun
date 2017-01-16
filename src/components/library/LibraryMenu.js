import React, { Component, PropTypes } from 'react';
import './LibraryMenu.css';

import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

class LibraryMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="libraryMenu">
        <ButtonGroup className="pull-right">
          <Button disabled><Glyphicon glyph="share" /></Button>
        </ButtonGroup>
      </div>
    );
  }
}

LibraryMenu.propTypes = {
};

export default LibraryMenu;

