import * as React from 'react';
import CreateMessageMutation from '../../mutations/CreateMessageMutation';
import './TextInput.css';

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

  clearInput = () => {
    this.setState({
      message: '',
    });
  };

  handlePost = viewerId => {
    CreateMessageMutation(this.state.message, viewerId, this.clearInput);
  };

  render() {
    return (
      <div className="text-input-container">
        <input type="text" placeholder="Enter your message" onChange={this.changeMessage} value={this.state.message} />
        <button onClick={() => this.handlePost(this.props.viewer.id)}>Post</button>
      </div>
    );
  }
}

export default TextInput;
