import React, { Component, PropTypes } from 'react';
import './QueueMenu.css';

import { Button, ButtonGroup, ButtonToolbar, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

class QueueMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.setState({ playing: !this.state.playing });
  }

  render() {
    const resetTooltip = <Tooltip id="reset">Reset</Tooltip>;
    const repeatTooltip = <Tooltip id="repeat">Repeat</Tooltip>;

    return (
      <div className="queueMenu">
        <ButtonGroup>
          { this.state.playing ? 
            <Button onClick={this.togglePlay}><Glyphicon glyph="pause" /></Button> :
            <Button onClick={this.togglePlay}><Glyphicon glyph="play" /></Button> }
          <Button disabled><Glyphicon glyph="stop" /></Button>
          <OverlayTrigger placement="bottom" overlay={repeatTooltip}>
            <Button><Glyphicon glyph="retweet" /></Button>
          </OverlayTrigger>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
        <OverlayTrigger placement="bottom" overlay={resetTooltip}>
          <Button onClick={this.props.clearQueue}><Glyphicon glyph="repeat" /></Button>
        </OverlayTrigger>
        </ButtonGroup>
      </div>
    );
  }
}

QueueMenu.PropTypes = {
  clearQueue: PropTypes.func.isRequired
};

export default QueueMenu;