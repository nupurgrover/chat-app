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

  handlePost = evt => {
    evt.preventDefault();
    CreateMessageMutation(this.state.message, this.props.viewer.id, this.clearInput);
  };

  render() {
    return (
      <form className="text-input-container" onSubmit={this.handlePost}>
        <input
          autoFocus
          type="text"
          placeholder="Enter your message"
          onChange={this.changeMessage}
          value={this.state.message}
        />
      </form>
    );
  }
}

export default TextInput;
