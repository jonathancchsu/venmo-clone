import { csrfFetch } from "./csrf"
//create, read, update, delete

//------------------------------create comments---------------------------------
const ADD_COMMENT = "comments/ADD"
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const postComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${paymentId}`, {
    method: "POST",
    body: JSON.stringify(comment)
  });
  const new_comment = await res.json();

  dispatch(addComment(new_comment));
}

//------------------------------read comments---------------------------------
const LOAD_COMMENTS = "comments/LOAD";
export const loadComments = () => ({
  type: LOAD_COMMENTS,
  comments
})

export const getComments = () => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/payments/${paymentId}`, {
    method: "GET",
  });

  return res;
}
