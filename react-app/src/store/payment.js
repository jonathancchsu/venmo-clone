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
const LOAD_PAYMENTS = "payments/LOAD"
export const loadPayments = payments => ({
    type: LOAD_PAYMENTS,
    payments
});

export const getAllPayments = () => async(dispatch) => {
  const res = await csrfFetch(`/api/payments`, {
    method: 'GET'
  });

  if (res.ok) {
    const payments = await res.json()
    dispatch(loadPayments(payments))
  }
}
//------------------------------update payments---------------------------------
const UPDATE_PAYMENT = "payments/UPDATE"
export const updatePayment = updatedPayment => ({
  type: UPDATE_PAYMENT,
  updatedPayment
})

export const updatingPayment = payment => async(dispatch) => {
  const res = await csrfFetch(`/api/payments/${payment.id}`, {
    method: 'PUT',
    body: JSON.stringify(payment)
  });

  if (res.ok) {
    const updatedPayment = await res.json()
    dispatch(updatePayment(updatedPayment))
    return updatedPayment
  }
}

//------------------------------payments reducer---------------------------------
const initialState = { entries: [] }

const paymentReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_PAYMENTS:
      return {...state, entries: [...action.payments]}
    case ADD_PAYMENT:
      return {...state, entries: [...state.entries, action.payment]}
    case UPDATE_PAYMENT:
      return {...state, [action.updatedPayment.id]: action.id}
    default:
      return state;
  }
}

export default paymentReducer;
