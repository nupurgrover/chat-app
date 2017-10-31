import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../Environment';

let tempId = 0;

const mutation = graphql`
  mutation CreateMessageMutation($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message {
        id
        message
      }
    }
  }
`;

export default (message, viewerId, callback) => {
  const variables = {
    input: {
      message,
      clientMutationId: '',
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    optimisticUpdater: proxyStore => {
      const id = 'client:newMessage' + tempId++;
      const newMessage = proxyStore.create(id, 'Message');
      newMessage.setValue(id, 'id');
      newMessage.setValue(message, 'message');
      console.log('optimisticUpdater', newMessage);

      const newEdge = proxyStore.create('client:newEdge:' + tempId++, 'MessageEdge');
      newEdge.setLinkedRecord(newMessage, 'node');

      const viewerProxy = proxyStore.get(viewerId);
      const connection = ConnectionHandler.getConnection(viewerProxy, 'ListMessage_allMessages');

      if (connection) {
        ConnectionHandler.insertEdgeAfter(connection, newEdge);
      }
    },
    updater: proxyStore => {
      const createMessageField = proxyStore.getRootField('createMessage');
      const newMessage = createMessageField.getLinkedRecord('message');

      const viewerProxy = proxyStore.get(viewerId);
      const connection = ConnectionHandler.getConnection(viewerProxy, 'ListMessage_allMessages');

      if (connection) {
        const newEdge = ConnectionHandler.createEdge(proxyStore, connection, newMessage, 'MessageEdge');
        ConnectionHandler.insertEdgeAfter(connection, newEdge);
      }
    },
    onCompleted: (response, errors) => {
      callback();
    },
    onError: err => console.error(err),
  });
};
