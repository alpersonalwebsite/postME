import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { scoreUporDownPost, deletePost, fetchPost, editPost, scoreUporDownComment, fetchComments, addComment, editComment, deleteComment } from '../actions/index';

class PostDetail extends Component {

  constructor() {
    super();
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  state = {
    editingPost: false,
    editingComment: false,
    author: '',
    body: '',
    parentPost: '',
    editingCommentOn: false,
    editingCommentObj: null,
    editingBody: '',
    postTitle: '',
    postBody: '',
    postId: ''
  }

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.id);
    this.setState({ parentPost: this.props.match.params.id });
  }

  changeScore = (theElement, upOrDown, postOrComment) => {
    if (postOrComment === 'post') {
      this.props.scoreUporDownPost(theElement, upOrDown);
    } else {
      this.props.scoreUporDownComment(theElement, upOrDown);
    }
  }

  deletePost = (thePostId) => {
    this.props.comments.map((eachObj) => this.props.deleteComment(eachObj.id))
    this.props.deletePost(thePostId);
  }

  updateFormElStates = (element, value) => {
    this.setState({
      [element]: value
    });
  }

  addingComment = (commentAuthor, commentBody, postId) => {
    this.props.addComment(commentAuthor, commentBody, postId);
    this.setState({ author: '', body: '' });
    this.props.fetchPost(postId);
  }

  editingComment = (theComment) => {
    this.setState({ editingCommentOn: true, editingCommentObj: theComment, editingBody: theComment.body });
  }

  cancelEditComment = () => {
    this.setState({ editingCommentOn: false });
  }

  saveEditComment = (commentId, commentBody) => {
    this.props.editComment(commentId, commentBody);
    this.setState({ editingCommentOn: false });
  }

  deletingComment = (commentId, postId) => {
    this.props.deleteComment(commentId);
    this.props.fetchPost(postId);
  }

  editPost = (postTitle, postBody, postId) => {
    this.setState({ editingPost: true, postTitle, postBody, postId });
  }

  onSubmitForm(event) {
    event.preventDefault();
    this.setState({ editingPost: false });
    this.props.editPost(this.state.postTitle, this.state.postBody, this.state.postId);
  }

  cancelEditPost = () => {
    this.setState({ editingPost: false });
  }

  render() {

    const { posts, comments } = this.props;

    const { editingPost } = this.state;

    const thePostToShow = posts.filter(post => post.id === this.props.match.params.id && post.category === this.props.match.params.category)[0];

    function timeStampToDate(timestamp) {
      const re = /([\w\s\d]+[:\d]+)/;
      let dateIs = new Date(timestamp).toString().split(re);
      return dateIs[1];
    }


    return (
      <div className="cotainer-element post-details">

        {thePostToShow ? (
          <div className="particular-post">
            <h1 style={{ marginBottom: 0, paddingBottom: 0 }}> Post details...</h1>
            <div style={{ textAlign: 'center' }} >
              <Link className="body-links-home"  to="/">Go Home!</Link>
            </div>
            <div>This is the extended view of post #{ thePostToShow.id }</div>
            <br />
            <span>{ thePostToShow.title }</span>
            <span> by <i>{ thePostToShow.author }</i></span>
            <span> at { timeStampToDate(thePostToShow.timestamp) }</span>
            <span> on { thePostToShow.category }</span>
            <div className="scoring">
              Score: { thePostToShow.voteScore }
              <span className="click-element" onClick={ () => this.changeScore(thePostToShow.id, 'upVote', 'post') }><i className="fa fa-plus-square"></i></span>
              <span className="click-element" onClick={ () => this.changeScore(thePostToShow.id, 'downVote', 'post') }><i className="fa fa-minus-square"></i></span>
            </div>
            <span className="click-element" style={{ marginLeft: 0 }} onClick={ () => this.deletePost(thePostToShow.id) }>Delete <i className="fa fa-trash"></i></span>
            <span className="click-element" onClick={ () => this.editPost(thePostToShow.title, thePostToShow.body, thePostToShow.id) }>Edit <i className="fa fa-edit"></i></span>
            <br /><br />
            <div>{ thePostToShow.body }</div>
          </div>
        ) : (
          <div>
            <h1 style={{ marginBottom: 0, paddingBottom: 0 }}>Nothing here!</h1>
            <div style={{ textAlign: 'center' }} >
              <Link className="body-links-home"  to="/">Go Home!</Link>
            </div>
          </div>
        )}

        {editingPost && (
          <div>
            <form onSubmit={ this.onSubmitForm } style={{ marginTop: 10 }}>
              <input type="hidden" defaultValue="{onEditingPost.id}" />
              <div>
                <label>Post title:</label>
                <input type="text" name="title" onChange={ (event) => this.updateFormElStates('postTitle',event.target.value) } value={ this.state.postTitle } required  />
              </div>
              <div>
                <label>Body:</label>
                <textarea name="body" onChange={ (event) => this.updateFormElStates('postBody',event.target.value) } value={ this.state.postBody } required>
                </textarea>
              </div>
              <button>Save</button>
              <button onClick={ () => this.cancelEditPost() }>Cancel</button>
            </form>
          </div>
        )}

        {comments.length > 0 && (
          <div className="particular-post">
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
                    <span className="click-element" onClick={ () => this.changeScore(eachComment.id, 'upVote', 'comment') }><i className="fa fa-plus-square"></i></span>
                    <span className="click-element" onClick={ () => this.changeScore(eachComment.id, 'downVote', 'comment') }><i className="fa fa-minus-square"></i></span>
                  </div>
                  <span className="click-element" style={{ marginLeft: 0 }}  onClick={ () => this.deletingComment(eachComment.id, eachComment.parentId) }>Delete <i className="fa fa-trash"></i></span>
                  <span className="click-element" onClick={ () => this.editingComment(eachComment) }>Edit <i className="fa fa-edit"></i></span>
                </div>
              </div>
            )}
          </div>
        )}

        {thePostToShow && (
          this.state.editingCommentOn === true  ? (
            <div className="particular-post">
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
            <div className="comment-form particular-post">
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
          )
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
  return bindActionCreators({ scoreUporDownPost, deletePost, fetchPost, editPost, scoreUporDownComment, fetchComments, addComment, editComment, deleteComment }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);
