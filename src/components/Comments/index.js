import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
const initialCommentList = []

class Comments extends Component {
  state = {
    commentsCount: 0,
    commentList: initialCommentList,
    username: '',
    comment: '',
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  toggleLikeBtn = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state
    const initialBackgroundColorClassName = `col-2 ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsCount: prevState.commentsCount + 1,
      commentList: [...prevState.commentList, newComment],
      username: '',
      comment: '',
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsCount, username, comment, commentList} = this.state

    return (
      <div className="comments-app">
        <div className="app-content">
          <h1 className="heading">Comments</h1>
          <div className="comments-form-container">
            <div className="img-container">
              <img
                className="comments-img"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
            <div className="comments-form">
              <form className="form-container">
                <p className="form-label" htmlFor="formLabel">
                  Say Something about 4.0 Technologies
                </p>
                <input
                  className="user-name"
                  type="text"
                  placeholder="Your Name"
                  value={username}
                  onChange={this.onChangeUsername}
                />
                <textarea
                  className="user-contact"
                  type="text"
                  placeholder="Your Comment"
                  value={comment}
                  onChange={this.onChangeComment}
                />
                <button
                  className="add-btn"
                  type="button"
                  onClick={this.onAddComment}
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>

          <div className="comment-item">
            <p className="comments-count">
              <span className="count">{commentsCount}</span> Comments
              <ul className="comments-list">
                {commentList.map(eachItem => (
                  <CommentItem
                    commentDetails={eachItem}
                    key={eachItem.id}
                    toggleLikeBtn={this.toggleLikeBtn}
                    onDeleteComment={this.onDeleteComment}
                  />
                ))}
              </ul>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
