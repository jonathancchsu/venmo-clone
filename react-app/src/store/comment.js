import { csrfFetch } from "./csrf"
//create, read, update, delete

//------------------------------create comments---------------------------------
const ADD_COMMENT = "comments/ADD"
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const postComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${comment.paymentId}`, {
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

export const getComments = (paymentId) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${paymentId}`, {
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
const initialState = { entries: [] }

const commentReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch(action.type) {
    case LOAD_COMMENTS:
      return { ...state, entries: [...action.comments]}
    case ADD_COMMENT:
      return { ...state, entries: [...state.entries, action.comment]}
    case UPDATE_COMMENT:
      return {...state, [action.updatedComment.id]: action.id}
    case DELETE_COMMENT:
      delete newState.entries[action.removedComment]
      return newState
    default:
      return state;
  }
}

export default commentReducer;
