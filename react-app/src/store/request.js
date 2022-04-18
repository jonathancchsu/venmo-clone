import { csrfFetch } from "./csrf"
//create, read, update, delete

//------------------------------create requests---------------------------------
const ADD_REQUEST = "requests/ADD"
export const addRequest = (request) => ({
  type: ADD_REQUEST,
  request
});

export const postRequest = (request) => async(dispatch) => {
  const res = await csrfFetch("/api/requests", {
    method: "POST",
    body: JSON.stringify(request)
  });
  const new_request = await res.json();

  dispatch(addRequest(new_request));

  return new_request;
};

//------------------------------load requests---------------------------------
const LOADALL_REQUESTS = "requests/LOADALL"
export const loadRequests = requests => ({
    type: LOADALL_REQUESTS,
    requests
});

export const getAllRequests = () => async(dispatch) => {
  const res = await csrfFetch(`/api/requests`, {
    method: 'GET'
  });

  if (res.ok) {
    const requests = await res.json();
    dispatch(loadRequests(requests));
  }
}

//------------------------------update requests---------------------------------
const UPDATE_REQUEST = "requests/UPDATE"
export const updaterequest = updatedRequest => ({
  type: UPDATE_REQUEST,
  updatedRequest
})

export const updatingRequest = request => async(dispatch) => {
  const res = await csrfFetch(`/api/requests/${request.id}`, {
    method: 'PUT',
    body: JSON.stringify(request)
  });

  if (res.ok) {
    const updatedRequest = await res.json()
    dispatch(updaterequest(updatedRequest))
    return updatedRequest
  }
}

//------------------------------requests reducer---------------------------------
const initialState = { entries: [] }

const requestReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADALL_REQUESTS:
      return {...state, entries: [...action.requests]}
    case LOADONE_REQUEST:
      return {...state, entries: [...action.request]}
    case ADD_REQUEST:
      return {...state, entries: [...state.entries, action.request]}
    case UPDATE_REQUEST:
      return {...state, [action.updatedRequest.id]: action.id}
    default:
      return state;
  }
}

export default requestReducer;
