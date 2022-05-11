import { csrfFetch } from "./csrf";
//create, delete

//------------------------------create like---------------------------------
const ADD_LIKE = "likes/ADD"
export const addLike = (like) => ({
  type: ADD_LIKE,
  like
});

export const postLike = (like) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes/`, {
    method: "POST",
    body: JSON.stringify(like)
  });
  const new_like = await res.json();

  dispatch(addLike(new_like));
}

//------------------------------delete like---------------------------------
const DELETE_LIKE = "likes/DELETE";
export const removeLike = removedLike => ({
  type: DELETE_LIKE,
  removedLike
})

export const deleteLike = like_id => async (dispatch) => {
  const res = await fetch(`api/comments/${like_id}`, {
    method: 'DELETE'
  });
  const likeNum = await res.json();

  dispatch(removeLike(likeNum));
}

//------------------------------delete like---------------------------------
const likeReducer = (state = {}, action) => {
  let newState = { ...state };

  switch(action.type) {
    case ADD_LIKE: {
      newState[action.like.id] = action.like;

      return newState;
    }
    case DELETE_LIKE:
      delete newState[action.removedLike.like_id]

      return newState;
    default:
      return state;
  }
}

export default likeReducer;
