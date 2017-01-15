/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import QueueMenu from './QueueMenu';
import QueueItem from './QueueItem';
import './Queue.css';

import { ListGroup, ListGroupItem, Panel, Well } from 'react-bootstrap';

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      playing: false,
      current: 0,
      items: props.items, 
      repeat: false
    };
    this.audio;

    this.clearQueue = this.clearQueue.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.stop = this.stop.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
    this._next = this._next.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  pushItem(clip) {
    this.setState(update(this.state, {
      items: {
        $push: [ clip ]
      }
    }));
  }

  removeItem(index) {
    this.setState({ current: 0, playing: false });
    this.setState(update(this.state, {
      items: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  moveItem(dragIndex, hoverIndex) {
    const { items } = this.state;
    const dragItem = items[dragIndex];

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    }));
  }

  clearQueue() {
    this.setState({ items: [] });
  }

  play() {
    const { items, current, repeat } = this.state;
    if ( current < items.length ) {
      this.audio = new Audio(`/audio/${items[current].src}`);
      this.audio.addEventListener('ended', this._next);
      this.setState({ playing: true });
      this.audio.play();
    } else if ( current == items.length && repeat ) {
      this.setState({ current: 0 });
      this.play();
    } else {
      console.log('No item to play, perhaps show an alert?');
      this.setState({ playing: false, current: 0 });
    }
  }

  _next() {
    const current = this.state.current + 1;
    this.setState({ current });
    this.play();
  }

  pause() {
    this.audio.pause();
    this.setState({ playing: false });
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0.0;
    this.setState({ playing: false, current: 0 });
  }

  toggleRepeat() {
    this.setState({ repeat: !this.state.repeat });
  }

  render() {
    const { items } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    
    return connectDropTarget(
      <div>
        <Panel className="queue"> 
        <QueueMenu 
          play={this.play}
          playing={this.state.playing}
          pause={this.pause}
          stop={this.stop}
          clearQueue={this.clearQueue} 
          toggleRepeat={this.toggleRepeat} 
          repeat={this.state.repeat} />  
          <ListGroup>
          {items.map((item, i) => {
            return item ?  (
              <QueueItem key={item.id} index={i} listName={this.props.name} item={item}
                removeItem={this.removeItem}
                moveItem={this.moveItem}
                pushItem={this.pushItem} /> 
            ): null;
          })}
          </ListGroup>
          {items.length == 0 ? <Well className="noQueueItem">Drag Clips Here</Well> : null}
        </Panel>
      </div>
      );
  }
}

Queue.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  items: PropTypes.array,
  name: PropTypes.string.isRequired,
};

const itemTarget = {
  drop(props, monitor, component) {
    const { name } = props;
    const sourceObj = monitor.getItem();
    // check sourceObj props if they match
    if (name !== sourceObj.name) component.pushItem(sourceObj.clip);
    return {
      name: name
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()  
  };
}

export default DropTarget('CLIP', itemTarget, collect)(Queue);
