import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Message from '../Message/Message';

import './ListMessage.css';

class ListMessage extends React.Component {
  handleDelete = () => {};

  render() {
    return (
      <div className="list-message-container">
        {this.props.viewer.allMessages.edges.map(({ node }) => (
          <Message key={node.__id} message={node} viewer={this.props.viewer} />
        ))}
      </div>
    );
  }
}

export default createFragmentContainer(
  ListMessage,
  graphql`
    fragment ListMessage_viewer on Viewer {
      ...Message_viewer
      allMessages(last: 100) @connection(key: "ListMessage_allMessages", filters: []) {
        edges {
          node {
            ...Message_message
          }
        }
      }
    }
  `
);
