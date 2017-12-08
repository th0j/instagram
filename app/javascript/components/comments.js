import * as React from "react";
import axios from 'axios';
import CommentForm from "./_comment_form"
import Api from './api'

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: props.post.comments
    }
  }

  loadComments() {
    let URL = Api.getPost(this.props.post.id);

    axios.get(URL)
      .then((response) => {
        this.setState({
          comments: response.data.comments
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCommentSubmit(message) {
    let url = Api.createComment(this.props.post.id);
    let params = { 'comment':
                      { 'message': message }
                  }
    axios.post(url, params)
      .then((response) => {
        this.loadComments()
      })
  }

  _getUsername(comment) {
    return comment.user.first_name + " " + comment.user.last_name
  }

  render() {
    return <div>
              <CommentForm onCommentSubmit={(message) => this.handleCommentSubmit(message)} />
              <div className="comments">
                {
                  this.state.comments.map((comment) => {
                    return (
                      <div key={comment.id} className=" row comment">
                        <div className="commenter">{ this._getUsername(comment) }</div>
                        <div className="message"> {comment.message} </div>
                      </div>)
                  })
                }
              </div>
            </div>
  }
}

export default Comments;
