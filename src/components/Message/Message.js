import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class Message extends React.Component {
  handleDelete = () => {};

  render() {
    return (
      <div>
        {this.props.message.message}&nbsp;
        <span onClick={this.handleDelete}>Delete</span>
      </div>
    );
  }
}

export default createFragmentContainer(
  Message,
  graphql`
    fragment Message_message on Message {
      id
      message
    }
  `
);
