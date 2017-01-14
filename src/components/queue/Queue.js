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
    this.state = { items: props.items };
    this.clearQueue = this.clearQueue.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  pushItem(clip) {
    this.setState(update(this.state, {
      items: {
        $push: [ clip ]
      }
    }));
  }

  removeItem(index) {
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

  render() {
    const { items } = this.state;
    const { canDrop, isOver, connectDropTarget } = this.props;
    
    return connectDropTarget(
      <div>
        <Panel className="queue"> 
        <QueueMenu clearQueue={this.clearQueue} />  
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

// TODOS:
// Check "ITEM" const 
// Check sourceObj in const itemTarget