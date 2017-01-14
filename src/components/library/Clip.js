/* eslint-disable no-console, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import './Clip.css';

import { ListGroupItem } from 'react-bootstrap';

class Clip extends Component {
  handleClick() {
    this._audioTag.currentTime = 0.0;
    this._audioTag.play();
  }

  render() {
    const { clip, isDragging, connectDragSource } = this.props;
    const src = `/audio/${clip.src}`;

    return connectDragSource(
      <div onClick={this.handleClick.bind(this)}>
        <ListGroupItem className="personClip">
          {clip.name}
        </ListGroupItem>
        <audio src={src} ref={(tag) => { this._audioTag = tag; }} />
      </div>
    );
  }
}

Clip.propTypes = {
  clip: PropTypes.object.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};


const cardSource = {
 
	beginDrag(props) {
		return {			
			clip: props.clip,
      listName: props.listName
		};
	},

  endDrag(props, monitor) {

		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	
		// if ( dropResult && dropResult.listId !== item.listId ) {
		// 	// props.removeCard(item.index);
		// }
	}
};

function collect(connect, monitor) {
  // log this as well
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource('CLIP', cardSource, collect)(Clip);