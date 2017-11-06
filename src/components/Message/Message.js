import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import DeleteMessageMutation from '../../mutations/DeleteMessageMutation';
import UpdateMessageMutation from '../../mutations/UpdateMessageMutation';
import './Message.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.message.message,
      isEditMode: false,
    };
  }

  handleDelete = () => {
    DeleteMessageMutation(this.props.message.id, this.props.viewer.id);
  };

  switchToEditMode = isEditMode => {
    this.setState({
      isEditMode,
    });
  };

  changeText = evt => {
    this.setState({
      text: evt.target.value,
    });
  };

  handleEdit = () => {
    UpdateMessageMutation(this.props.message.id, this.state.text, this.props.viewer.id);
    this.switchToEditMode(false);
  };

  render() {
    return (
      <div className="row">
        <div className="message-row">
          <span className="avatar">
            <i className="fa fa-user-circle fa-2x" />
          </span>
          <div className="arrow" />
          <div className="message-container">
            {!this.state.isEditMode ? (
              <div className="message">
                <p className="message-content"> {this.state.text}&nbsp;</p>
                <div className="message-actions">
                  <i className="fa fa-pencil message-icon" onClick={() => this.switchToEditMode(true)} />
                  <i className="fa fa-times message-icon" onClick={this.handleDelete} />
                </div>
              </div>
            ) : (
              <div>
                <input value={this.state.text} onChange={this.changeText} />
                <button onClick={this.handleEdit}>Post</button>
              </div>
            )}
          </div>
        </div>
        <div className="timestamp">
          <span>{moment(this.props.message.createdAt).format('DD/MM/YYYY, HH:mm')}</span>
        </div>
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
      createdAt
    }
  `
);
