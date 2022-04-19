import { csrfFetch } from "./csrf"
//create, read, update

//------------------------------create payments---------------------------------
const ADD_PAYMENT = "payments/ADD"
export const addPayment = (payment) => ({
  type: ADD_PAYMENT,
  payment
});

export const postPayment = (payment) => async(dispatch) => {
  const res = await csrfFetch("/api/payments", {
    method: "POST",
    body: JSON.stringify(payment)
  });
  const new_payment = await res.json();

  dispatch(addPayment(new_payment));

  return new_payment;
};

//------------------------------load payments---------------------------------
const LOADALL_PAYMENTS = "payments/LOADALL"
export const loadPayments = payments => ({
    type: LOADALL_PAYMENTS,
    payments
});

export const getAllPayments = () => async (dispatch) => {
  const res = await fetch("/api/payments", {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const payments = await res.json();
  dispatch(loadPayments(payments));
}
//------------------------------get one payments---------------------------------
const LOADONE_PAYMENT = "payments/LAODONE"
export const loadOnePayment = payment => ({
  type: LOADONE_PAYMENT,
  payment
});

export const getOnePayment = paymentId => async(dispatch) => {
  const res = await csrfFetch(`/api/payments/${paymentId}`);
  if (res.ok) {
    const payment = await res.json();
    dispatch(loadOnePayment(payment));
  }
}

//------------------------------payments reducer---------------------------------
const initialState = { entries: [] }

const paymentReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADALL_PAYMENTS:
      return {entries: [action.payments]}
    case LOADONE_PAYMENT:
      return {...state, entries: [...action.payment]}
    case ADD_PAYMENT:
      return {...state, entries: [...state.entries, action.payment]}
    default:
      return state;
  }
}

export default paymentReducer;
