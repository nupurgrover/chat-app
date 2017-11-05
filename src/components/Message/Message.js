import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DeleteMessageMutation from '../../mutations/DeleteMessageMutation';
import UpdateMessageMutation from '../../mutations/UpdateMessageMutation';

import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.message.message,
      isEditMode: false,
    };
  }

  handleDelete = () => {
    DeleteMessageMutation(this.props.message.id, this.props.viewer.id);
  };

  switchToEditMode = isEditMode => {
    this.setState({
      isEditMode,
    });
  };

  changeText = evt => {
    this.setState({
      text: evt.target.value,
    });
  };

  handleEdit = () => {
    UpdateMessageMutation(this.props.message.id, this.state.text, this.props.viewer.id);
    this.switchToEditMode(false);
  };

  render() {
    return (
      <div className="message">
        {!this.state.isEditMode ? (
          <div>
            {this.state.text}&nbsp;
            <button onClick={this.handleDelete}>Delete</button>
            <button onClick={() => this.switchToEditMode(true)}>Edit</button>
          </div>
        ) : (
          <div>
            <input value={this.state.text} onChange={this.changeText} />
            <button onClick={this.handleEdit}>Post</button>
          </div>
        )}
      </div>
    );
  }
}

export default createFragmentContainer(
  Message,
  graphql`
    fragment Message_viewer on Viewer {
      id
    }

    fragment Message_message on Message {
      id
      message
    }
  `
);
