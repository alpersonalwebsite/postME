import React, { Component } from 'react';

class Post extends Component {

  render() {

    const { onChangeScore, onDeletePost, onEditPost } = this.props;
    const thePostToShow = this.props.onPassingPost;

    function timeStampToDate(timestamp) {
      const re = /([\w\s\d]+[:\d]+)/;
      let dateIs = new Date(timestamp).toString().split(re);
      return dateIs[1];
    }

    return (
      <div>

        {thePostToShow && (
          <div className="particular-post">
            <div className="view-response">Post details...</div>
            <div>This is the extended view of post # {thePostToShow.id }</div>
            <br />
            <span>{ thePostToShow.title }</span>
            <span> by <i>{ thePostToShow.author }</i></span>
            <span> at { timeStampToDate(thePostToShow.timestamp) }</span>
            <span> on { thePostToShow.category }</span>
            <div className="scoring">
              Score: { thePostToShow.voteScore }
              <span className="click-element" onClick={ () => onChangeScore(thePostToShow.id, 'upVote', 'post') }><i className="fa fa-plus-square"></i></span>
              <span className="click-element" onClick={ () => onChangeScore(thePostToShow.id, 'downVote', 'post') }><i className="fa fa-minus-square"></i></span>
            </div>
            <span className="click-element" style={{ marginLeft: 0 }} onClick={ () => onDeletePost(thePostToShow.id) }>Delete <i className="fa fa-trash"></i></span>
            <span className="click-element" onClick={ () => onEditPost(thePostToShow, 'editPost') }>Edit <i className="fa fa-edit"></i></span>
            <br /><br />
            <div>{ thePostToShow.body }</div>
          </div>
        )}

      </div>
    );
  }
}

export default Post;
