import { csrfFetch } from "./csrf"
//create, read, update, delete

//------------------------------create comments---------------------------------
const ADD_COMMENT = "comments/ADD"
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const postComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${comment.payment_id}`, {
    method: "POST",
    body: JSON.stringify(comment)
  });
  const new_comment = await res.json();

  dispatch(addComment(new_comment));
}

//------------------------------read comments---------------------------------
const LOAD_COMMENTS = "comments/LOAD";
export const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
})

export const getComments = (payment_id) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${payment_id}`, {
    method: "GET",
  });

  if (res.ok) {
    const comments = await res.json();
    dispatch(loadComments(comments))
  }
}

//------------------------------update comments---------------------------------
const UPDATE_COMMENT = "comments/UPDATE";
export const updateComment = updatedComment => ({
  type:UPDATE_COMMENT,
  updatedComment
})

export const updatingComment = comment => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const updatedComment = await res.json();
    console.log('updated comment from reducer',updatedComment)
    dispatch(updateComment(updatedComment));
    return updatedComment;
  }
}

//------------------------------delete comment---------------------------------
const DELETE_COMMENT = "comments/DELETE";
export const removeComment = removedComment => ({
  type: DELETE_COMMENT,
  removedComment
})

export const deleteComment = comment_id => async(dispatch) => {
  const res = await fetch(`/api/comments/${comment_id}`, {
    method: 'DELETE'
  });
  const commentNum = await res.json();

  dispatch(removeComment(commentNum));
}

//------------------------------comments reducer---------------------------------
const commentReducer = (state = {}, action) => {
  let newState = { ...state };

  switch(action.type) {
    case LOAD_COMMENTS:
      if (action.comments) {
        action.comments.comments.forEach(
          (comment) => (newState[comment.id] = comment)
        );
      } else {
        newState = {}
      }
      return newState;
    case ADD_COMMENT: {
      newState[action.comment.id] = action.comment;

      return newState;
    }
    case UPDATE_COMMENT: {
      newState[action.updatedComment.id] = action.updatedComment;

      return newState;
    }
    case DELETE_COMMENT:
      delete newState[action.removedComment.comment_id];

      return newState;
    default:
      return state;
  }
}

export default commentReducer;
