import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLikeBtn, onDeleteComment} = props
  const {
    id,
    username,
    comment,
    isLiked,
    initialClassName,
    date,
  } = commentDetails
  const userIcon = username[0]
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeBtnClassName = isLiked ? 'likeBtnColor' : ''
  const postedTime = formatDistanceToNow(date)

  const onClickLikeBtn = () => {
    toggleLikeBtn(id)
  }

  const onClickDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-list-item">
      <div className="row">
        <div className={initialClassName}>
          <p className="user-icon">{userIcon}</p>
        </div>
        <div className="col-10">
          <h1 className="comment-username">
            {username}
            <span className="time">{postedTime}</span>
          </h1>
          <p className="user-comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <button
          className={`button like-btn ${likeBtnClassName}`}
          type="button"
          onClick={onClickLikeBtn}
        >
          <img className="like-img" src={likeImgUrl} alt="like" />
          Like
        </button>
        <button
          className="button delete-btn"
          type="button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
