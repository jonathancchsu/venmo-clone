import { csrfFetch } from "./csrf"
//create, read, update, delete

//------------------------------create comments---------------------------------
const ADD_COMMENT = "Comments/AddComment"
export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const postComment = (comment) => async (dispatch) => {
  const res = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(comment)
  });
  const new_comment = await res.json();

  dispatch(addComment(new_comment));

  return new_comment;
}

//------------------------------read comments---------------------------------
const LOAD_COMMENTS = "Comments/LoadComments";
export const loadComments = () => ({
  type: LOAD_COMMENTS,
  comments
})


export const readComment = () => async(dispatch) => {
  const res = await csrfFetch("/api/comments", {
    method: "GET",
  });

  return res;
}
