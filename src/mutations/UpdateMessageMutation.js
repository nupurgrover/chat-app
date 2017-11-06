import { commitMutation, graphql } from 'react-relay';
import environment from '../Environment';

const mutation = graphql`
  mutation UpdateMessageMutation($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      message {
        id
        message
        updatedAt
      }
    }
  }
`;

export default (messageId, message) => {
  const variables = {
    input: {
      id: messageId,
      message,
      clientMutationId: '',
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    onError: error => console.error(error),
    optimisticResponse: {
      updateMessage: {
        message: {
          id: messageId,
          message: message,
        },
      },
    },
  });
};
