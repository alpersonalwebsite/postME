import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPost } from '../actions/index';

class AddPost extends Component {

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  state = {
    author: '',
    title: '',
    category: 'react',
    body: '',
    status: ''
  }

  renderCatList() {
    return this.props.categories.map((category) => {
      return (
        <option key={ category.name } value={ category.name }>{ category.name }</option>
      );
    });
  }

  updateFormElStates = (element, value) => {
    this.setState({
      [element]: value
    });
  }

  onSubmitForm(event) {
    event.preventDefault();
    this.setState({ status: 'created' });
    this.props.addPost(this.state.author, this.state.title, this.state.category, this.state.body);
  }

  render() {

    const { onUpdateRightSidebar } = this.props;
    const { status } = this.state;

    return (

      <div>

        {status === '' ? (
          <form onSubmit={ this.onSubmitForm }>
            <h2>Add a Post</h2>
            <div>
              <label>Post title:</label>
              <input type="text" name="title" onChange={ (event) => this.updateFormElStates('title',event.target.value) } value={ this.state.title } required  />
            </div>
            <div>
              <label>Body:</label>
              <textarea name="body" onChange={ (event) => this.updateFormElStates('body',event.target.value) } value={ this.state.body } required>
              </textarea>
            </div>
            <div>
              <div>
                <label>Author:</label>
                <input type="text" name="author" onChange={ (event) => this.updateFormElStates('author',event.target.value) } value={ this.state.author } required />
              </div>
              <div>
                <label>Category:</label>
                <select name="category" onChange={ (event) => this.updateFormElStates('category',event.target.value) } value={ this.state.category } >
                  <option value="none" disabled>Select category...</option>
                  { this.renderCatList() }
                </select>
              </div>
            </div>
            <div className="center-helper">
              <button>Add</button>
            </div>
          </form>
        ) : (
          <div>
            <div className="view-response">Thanks for adding a post!</div>
            <div style={{ textAlign: 'center' }}>Im going to be refreshed in 2s...!</div>
            { onUpdateRightSidebar() }
          </div>
        )}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPost }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPost);
