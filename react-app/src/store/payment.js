import { csrfFetch } from "./csrf";
//create, read, update

//------------------------------create payments---------------------------------
const ADD_PAYMENT = "payments/ADD"
export const addPayment = (payment) => ({
  type: ADD_PAYMENT,
  payment
});

export const postPayment = (payment) => async(dispatch) => {
  const res = await csrfFetch("/api/payments/", {
    method: "POST",
    body: JSON.stringify(payment),
  });

  const new_payment = await res.json();

  dispatch(addPayment(new_payment));
};

//------------------------------load payments---------------------------------
const LOADALL_PAYMENTS = "payments/LOADALL"
export const loadPayments = payments => ({
    type: LOADALL_PAYMENTS,
    payments
});

export const getAllPayments = () => async (dispatch) => {
  const res = await csrfFetch("/api/payments/", {
    headers: {
      'Content-Type': 'application/json'
    }
  });

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
const paymentReducer = (state ={}, action) => {
let newState = {...state};

  switch(action.type) {
    case LOADALL_PAYMENTS:
      if (action.payments) {
        action.payments.payments.forEach(
          (payment) => (newState[payment.id] = payment)
        )
      }else {
        newState ={}
      }
      return newState;
    case LOADONE_PAYMENT:
      newState[action.payment.id] = action.payment;

      return newState
    case ADD_PAYMENT:{
      newState[action.payment.id] = action.payment;
      return newState;
    }
    default:
      return state;
  }
}

export default paymentReducer;
