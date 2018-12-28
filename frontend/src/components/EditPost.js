import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editPost } from '../actions/index';

class EditPost extends Component {

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  state = {
    title: '',
    body: '',
    status: ''
  }

  componentDidMount() {
    this.setState({
      title: this.props.onEditingPost.title,
      body: this.props.onEditingPost.body
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onEditingPost.title !== this.props.onEditingPost.title && nextProps.onEditingPost.body !== this.props.onEditingPost.body) {
      this.setState({
        title: nextProps.onEditingPost.title,
        body: nextProps.onEditingPost.body
      });
    }
  }

  updateFormElStates = (element, value) => {
    this.setState({
      [element]: value
    })
  }

  onSubmitForm(event) {
    event.preventDefault();
    this.setState({ status: 'edited' });
    this.props.editPost(this.state.title, this.state.body, this.props.onEditingPost.id);
  }

  render() {

    const { onEditingPost, onUpdateRightSidebar } = this.props;
    const { status } = this.state;

    return (

      <div>

        { status === '' ? (
          <div>
            <div>
              <h2>You are editing: <i>{ onEditingPost.title }</i></h2>
            </div>
            <form onSubmit={ this.onSubmitForm } className="particular-post">
              <input type="hidden" defaultValue="{onEditingPost.id}" />
              <div>
                <label>Post title:</label>
                <input type="text" name="title" onChange={ (event) => this.updateFormElStates('title',event.target.value) } value={ this.state.title } required  />
              </div>
              <div>
                <label>Body:</label>
                <textarea name="body" onChange={ (event) => this.updateFormElStates('body',event.target.value) } value={ this.state.body } required>
                </textarea>
              </div>
              <div className="center-helper">
                <button>Save</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="view-response">Thanks for editing the post!</div>
            <div style={{textAlign: 'center'}}>Im going to be refreshed in 2s...!</div>
            { onUpdateRightSidebar() }
          </div>
        )}

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editPost }, dispatch);
}

export default connect(null,mapDispatchToProps)(EditPost);
