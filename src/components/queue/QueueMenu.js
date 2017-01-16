import React, { Component, PropTypes } from 'react';
import './QueueMenu.css';

import { Button, ButtonGroup, ButtonToolbar, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

class QueueMenu extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const randomQueueToolTip = <Tooltip id="random">Create Random</Tooltip>;
    const repeatTooltip = <Tooltip id="repeat">Repeat</Tooltip>;
    const resetTooltip = <Tooltip id="reset">Reset</Tooltip>;
    const { clearQueue, createRandomQueue, pause, play, playing, repeat, toggleRepeat, stop } = this.props;
    const repeatClass = repeat ? '' : 'faded';

    return (
      <div className="queueMenu">
        <ButtonGroup>
          { playing ? 
            <Button onClick={pause}><Glyphicon glyph="pause" /></Button> :
            <Button onClick={play}><Glyphicon glyph="play" /></Button> }
          <Button onClick={stop}><Glyphicon className={playing ? '': 'faded'} glyph="stop" /></Button>
          <OverlayTrigger placement="bottom" overlay={repeatTooltip}>
            <Button onClick={toggleRepeat}><Glyphicon className={repeatClass} glyph="retweet" /></Button>
          </OverlayTrigger>
        </ButtonGroup>
        <ButtonGroup className="pull-right">
        <OverlayTrigger placement="bottom" overlay={randomQueueToolTip}>
          <Button onClick={createRandomQueue}><Glyphicon glyph="random" /></Button>
        </OverlayTrigger>
        <OverlayTrigger placement="bottom" overlay={resetTooltip}>
          <Button onClick={clearQueue}><Glyphicon glyph="repeat" /></Button>
        </OverlayTrigger>
        </ButtonGroup>
      </div>
    );
  }
}

QueueMenu.propTypes = {
  clearQueue: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
  repeat: PropTypes.bool.isRequired,
  stop: PropTypes.func.isRequired,
  toggleRepeat: PropTypes.func.isRequired
};

export default QueueMenu;