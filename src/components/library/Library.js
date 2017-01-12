import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import Clip from './Clip';
import './Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { clips: props.clips };
  }

  render() {
    const { clips } = this.state;
    return (
      <div className="library">
        {clips.map(clip => {
          return <Clip key={clip.id} clip={clip} listName={this.props.name} />;
        })}
      </div>
    );
  }
}

Library.propTypes = {
  clips: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default Library;
