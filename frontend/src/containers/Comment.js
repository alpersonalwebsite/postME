import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComment } from '../actions/index';
import { editComment } from '../actions/index';
import { deleteComment } from '../actions/index';
import { fetchPost } from '../actions/index';

class Comment extends Component {

  state = {
    author: '',
    body: '',
    parentPost: '',
    editingCommentOn: false,
    editingCommentObj: null,
    editingBody: ''
  }

  componentDidMount() {
    this.setState({ parentPost: this.props.onPassingPost.id });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.onPassingPost) {
      this.setState({ parentPost: nextProps.onPassingPost.id });
    }
  }

  addingComment = (commentAuthor, commentBody, postId) => {
    this.props.addComment(commentAuthor, commentBody, postId);
    this.setState({ author: '', body: '' });
    this.props.fetchPost(postId);
  }

  onDeletingComment = (commentId, postId) => {
    this.props.deleteComment(commentId);

    this.props.fetchPost(postId);
  }

  onEditingComment = (theComment) => {
    this.setState({ editingCommentOn: true, editingCommentObj: theComment, editingBody: theComment.body });
  }

  cancelEditComment = () => {
    this.setState({ editingCommentOn: false });
  }

  saveEditComment = (commentId, commentBody) => {
    this.props.editComment(commentId, commentBody);
    this.setState({ editingCommentOn: false });
  }

  updateFormElStates = (element, value) => {
    this.setState({
      [element]: value
    });
  }

  render() {

    const { comments, onChangeScore } = this.props;

    return (
      <div>

        {comments.length > 0 && (
          <div>
            <br />
            <span>Great! This post has { comments.length } { comments.length > 1 ? 'comments' : 'comment' }!</span>

            {comments.map((eachComment) =>
              <div key={ eachComment.id } className="comments">
                <div>
                  <i>{ eachComment.author }</i> said:
                  <br />
                  { eachComment.body }
                  <br />
                  <div className="scoring">
                    Score: { eachComment.voteScore }
                    <span className="click-element" onClick={ () => onChangeScore(eachComment.id, 'upVote', 'comment') }><i className="fa fa-plus-square"></i></span>
                    <span className="click-element" onClick={ () => onChangeScore(eachComment.id, 'downVote', 'comment') }><i className="fa fa-minus-square"></i></span>
                  </div>
                  <span className="click-element" style={{ marginLeft: 0 }}  onClick={ () => this.onDeletingComment(eachComment.id, eachComment.parentId) }>Delete <i className="fa fa-trash"></i></span>
                  <span className="click-element" onClick={ () => this.onEditingComment(eachComment) }>Edit <i className="fa fa-edit"></i></span>
                </div>
              </div>
            )}
          </div>
        )}

        {this.state.editingCommentOn === true  ? (
          <div>
            <input type="hidden" name="commentId" defaultValue={ this.state.editingCommentOn.commentId } />
            <div>
              <label>Edit Body:</label>
              <textarea name="body" onChange={ (event) => this.updateFormElStates('editingBody',event.target.value) } value={ this.state.editingBody } required>
              </textarea>
            </div>
            <button onClick={ () => this.saveEditComment(this.state.editingCommentObj.id, this.state.editingBody) }>Save</button>
            <button onClick={ () => this.cancelEditComment() }>Cancel</button>
          </div>
        ) : (
          <div className="comment-form">
            <div>
              <label>Comment Author:</label>
              <input type="text" name="author" onChange={ (event) => this.updateFormElStates('author',event.target.value) } value={ this.state.author } required />
            </div>
            <div>
              <label>Comment Body:</label>
              <textarea name="body" onChange={ (event) => this.updateFormElStates('body',event.target.value) } value={ this.state.body } required>
              </textarea>
            </div>
            <button onClick={ () => this.addingComment(this.state.author, this.state.body, this.state.parentPost) }>Add</button>
          </div>
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addComment, editComment, deleteComment, fetchPost }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment);
