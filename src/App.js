import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from './Environment';
import TextInput from './components/TextInput/TextInput';
import ListMessage from './components/ListMessage/ListMessage';
import './App.css';

const AppAllMessageQuery = graphql`
  query AppAllMessageQuery {
    viewer {
      ...ListMessage_viewer
    }
  }
`;

const AppTextInputQuery = graphql`
  query AppTextInputQuery {
    viewer {
      id
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <h3>Add Some Notes</h3>
        </div>
        <div className="App-container">
          <QueryRenderer
            environment={environment}
            query={AppAllMessageQuery}
            render={({ error, props }) => {
              if (error) {
                return <div>{error.message}</div>;
              } else if (props) {
                return <ListMessage viewer={props.viewer} />;
              }
              return <i className="fa fa-spinner" />;
            }}
          />
          <QueryRenderer
            environment={environment}
            query={AppTextInputQuery}
            render={({ error, props }) => {
              if (error) {
                return <div>{error.message}</div>;
              } else if (props) {
                return <TextInput viewer={props.viewer} />;
              }
              return <i className="fa fa-spinner" />;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
