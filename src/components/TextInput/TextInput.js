import * as React from 'react';
import CreateMessageMutation from '../../mutations/CreateMessageMutation';

class TextInput extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  changeMessage = evt => {
    this.setState({
      message: evt.target.value,
    });
  };

  handlePost = viewerId => {
    CreateMessageMutation(this.state.message, viewerId);
  };

  render() {
    return (
      <div>
        <input type="text" placeholder="Enter your message" onChange={this.changeMessage} />
        <button onClick={() => this.handlePost(this.props.viewer.id)}>Post</button>
      </div>
    );
  }
}

export default TextInput;
