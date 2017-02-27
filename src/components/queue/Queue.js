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
    this.createRandomQueue = this.createRandomQueue.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.stop = this.stop.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
    this._next = this._next.bind(this);
  }

  createRandomQueue() {
    // TODO: optimize this
    const allClips = []; 
    const items = [];
    const persons = this.props.persons;
    persons.forEach(person => person.clips.forEach(clip => allClips.push(clip)));
    while(items.length < 10) {
      const randomIndex = Math.floor(Math.random() * allClips.length);
      const itemToPush = allClips[randomIndex];
      if (items.includes(itemToPush)) continue;
      items.push(itemToPush);
    }
    this.setState({ items, current: 0, playing: false });
  }

  pushItem(clip) {
    if (clip) {
      this.setState(update(this.state, {
        items: {
          $push: [ clip ]
        }
      }));
    }
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
    const { items, current, playing, repeat } = this.state;
    if ( current < items.length) {
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
    const { items, playing, repeat, current } = this.state;
    const { canDrop, isOver, connectDropTarget, name } = this.props;
    const panalClass = playing ? 'queue queuePlaying' : 'queue';
    
    return connectDropTarget(
      <div className="rtl">
        <Panel className={panalClass}> 
        <QueueMenu 
          itemsEmpty={items.length > 0 ? false: true}
          play={this.play}
          playing={playing}
          pause={this.pause}
          stop={this.stop}
          clearQueue={this.clearQueue} 
          toggleRepeat={this.toggleRepeat} 
          repeat={repeat}
          createRandomQueue={this.createRandomQueue} />
          <ListGroup>
          {items.map((item, i) => {
            return item ?  (
              <QueueItem key={item.id.concat(i)} index={i} listName={name} item={item}
                removeItem={this.removeItem}
                moveItem={this.moveItem}
                pushItem={this.pushItem}
                playing={playing}
                active={playing && current === i ? true : false} /> 
            ): null;
          })}
          </ListGroup>
          {items.length == 0 ? <Well className="noQueueItem">Drag and Drop Clips Here</Well> : null}
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
  persons: PropTypes.array.isRequired
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
    canDrop: monitor.canDrop(),
  };
}

export default DropTarget('CLIP', itemTarget, collect)(Queue);
