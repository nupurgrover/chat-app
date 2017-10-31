import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DeleteMessageMutation from '../../mutations/DeleteMessageMutation';

class Message extends React.Component {
  handleDelete = () => {
    DeleteMessageMutation(this.props.message.id, this.props.viewer.id);
  };

  render() {
    return (
      <div>
        {this.props.message.message}&nbsp;
        <button onClick={this.handleDelete}>Delete</button>
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
