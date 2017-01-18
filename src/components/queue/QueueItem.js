/* eslint-disable no-console, react/jsx-no-bind */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import './QueueItem.css';

import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';

class QueueItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleClick() {
    this._audioTag.currentTime = 0.0;
    this._audioTag.play().catch(err => console.log('Catched in handleClick', err));
  }

	handleRemove() {
		const { index, removeItem} = this.props;
		this._audioTag.pause();
		this._audioTag.currentTime = 0.0;
		removeItem(index);
	}

  render() {
    const { active, item, isDragging, connectDragSource, connectDropTarget, playing, removeItem } = this.props;
    let classes = isDragging ? 'clip queueItem dragging' : 'clip queueItem'; 
		classes = active ? classes + ' playing' : classes;
		const src = `/audio/${item.src}`;
		// <Glyphicon className="pull-right removeItem" glyph="remove" onClick={this.handleRemove}/>
    return connectDragSource(connectDropTarget(
			<div>
			<ListGroupItem className={classes} onClick={this.handleClick} >
        {item.name}
				{playing ? 
					null : 
					<span className="pull-right removeItem" onClick={this.handleRemove}>X</span>
					}
				<audio src={src} ref={(tag) => { this._audioTag = tag; }} />
			</ListGroupItem>
			</div>
    ));
  }
}

QueueItem.propTypes = {
	active: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	isDragging: PropTypes.bool.isRequired,
	playing: PropTypes.bool.isRequired,
	removeItem: PropTypes.func.isRequired
};

const qItemSource = {
 
	beginDrag(props) {		
		return {			
			index: props.index,
      listName: props.listName,
			item: props.item
		};
	}
};

const qItemTarget = {
  hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListName = monitor.getItem().listName;

    // Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

    // Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
		const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
 
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
 
		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

    // Time to actually perform the action
		if ( props.listName === sourceListName ) {
			props.moveItem(dragIndex, hoverIndex);
 
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}		
	}
};

export default flow(
  DropTarget("CLIP", qItemTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
  DragSource("CLIP", qItemSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(QueueItem);

// _.flow: Creates a function that returns the result of invoking the given functions with the this binding of the created function, where each successive invocation is supplied the return value of the previous.