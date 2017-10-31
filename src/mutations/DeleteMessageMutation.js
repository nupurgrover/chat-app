import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '../Environment';

const mutation = graphql`
  mutation DeleteMessageMutation($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
      deletedId
    }
  }
`;

export default (messageId, viewerId) => {
  const variables = {
    input: {
      id: messageId,
      clientMutationId: '',
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    onError: error => console.error(error),
    optimisticUpdater: proxyStore => {
      const viewerProxy = proxyStore.get(viewerId);
      const connection = ConnectionHandler.getConnection(viewerProxy, 'ListMessage_allMessages');
      if (connection) {
        ConnectionHandler.deleteNode(connection, messageId);
      }
    },
    updater: proxyStore => {
      const deleteMessageField = proxyStore.getRootField('deleteMessage');
      const deletedId = deleteMessageField.getValue('deletedId');
      const viewerProxy = proxyStore.get(viewerId);
      const connection = ConnectionHandler.getConnection(viewerProxy, 'ListMessage_allMessages');
      if (connection) {
        ConnectionHandler.deleteNode(connection, deletedId);
      }
    },
  });
};
