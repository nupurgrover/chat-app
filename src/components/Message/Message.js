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

  setEditMode = isEditMode => {
    this.setState({
      isEditMode,
    });
  };

  changeText = evt => {
    this.setState({
      text: evt.target.value,
    });
  };

  handleEdit = evt => {
    if ([13, 14].includes(evt.keyCode)) {
      evt.preventDefault();
      UpdateMessageMutation(this.props.message.id, this.state.text, this.props.viewer.id);
      this.setEditMode(false);
    }
  };

  render() {
    console.log('rendering', this.props.message);
    const timestamp = this.props.message.updatedAt ? this.props.message.updatedAt : this.props.message.createdAt;
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
                  <i className="fa fa-pencil message-icon" onClick={() => this.setEditMode(true)} />
                  <i className="fa fa-times message-icon" onClick={this.handleDelete} />
                </div>
              </div>
            ) : (
              <input
                className="message-text-input"
                value={this.state.text}
                onChange={this.changeText}
                onKeyDown={this.handleEdit}
              />
            )}
          </div>
        </div>
        <div className="timestamp">
          <span>{moment(timestamp).format('DD/MM/YYYY, H:mm')}</span>
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
      updatedAt
    }
  `
);
