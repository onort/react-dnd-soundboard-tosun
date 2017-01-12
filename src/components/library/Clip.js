/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import './Clip.css';


class Clip extends Component {
  render() {
    const { clip, isDragging, connectDragSource } = this.props;
    
    return connectDragSource(
      <div className="clip">
        {clip.name}
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
    // try props alone
    console.log('Beginnig Dragging');	
		return {			
			clip: props.clip,
      listName: props.listName
		};
	},

  endDrag(props, monitor) {
    // console.log('Ending Dragging. Logging props: ', props);
    console.log('Ending Dragging. Logging monitor', monitor);
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();	
    // console.log('Item', item);
    console.log('Drop Result', dropResult);
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