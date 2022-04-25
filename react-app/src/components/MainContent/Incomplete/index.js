import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests, updatingRequest, deleteRequest } from "../../../store/request";

import { getUsers } from "../../../store/session";

import './Incomplete.css';

const Incomplete = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  // const users = props.users;
  // console.log('users from incomplete',users)


  const allRequests = Object.values(useSelector(state => state.requestState))
  // console.log('all requests from incomplete',allRequests)
  const sessionUser = useSelector((state) => state.session.user)
  const users = Object.values(useSelector(state => state.session))
  // console.log('users from incomplete', users)
  useEffect(() => {
    (async() => {
      await dispatch(getAllRequests());
      await dispatch(getUsers());
      setLoaded(true);
    })();
  }, [dispatch]);

  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');

  function validateDecimal(decimalValue) {

    var rx = /^\d+(?:\.\d{1,2})?$/

    if(rx.test(decimalValue)) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleEditAmount = async (e, id, privacy) => {
    e.preventDefault();
    // console.log({id, title, amount, privacy})
    if(amount > 0) {
      await dispatch(updatingRequest({id, title, amount, privacy}));
      setEditAmount('');
    }
    if (amount <= 0) {
      alert('Please provide a valid number!');
    }
    if (isNaN(amount)) {
      alert('Please provide a valid number!');
    }
    if (!validateDecimal(amount)) {
      alert('Please provide a valid number!');
    }
  }

  const handleEditTitle = async (e, id, privacy) => {
    e.preventDefault();
    console.log({id, title, amount, privacy})
    if(title.length > 0) {
      await dispatch(updatingRequest({id, title, amount, privacy}));
      setEditTitle('');
    }
    if (title.length <= 0) {
      alert("Please input a title for your request!");
    }
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteRequest(id));
  }

  if (!loaded) {
    return null;
  };

  return (
    <div className="incomplete-container">
      <h3 className="notification-title">
        <i className="fas fa-spinner"></i> Incomplete
      </h3>
      {allRequests?.map((request, i) =>
        <div key={i}>
          {(request?.sender_id  === sessionUser?.id) ?
            <div className="requests">
              <div className="requesting">
                {`Request to ${users[request?.receiver_id - 1]?.name}`}
              </div>
              {editAmount === request.id ?
                <div className="requesting-amount">
                  $<input
                    type='string'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder='0.00'
                    className="incomplete-input-amount"
                  ></input>
                  <button className='editing-btn' onClick={e => {setTitle(request.title);
                  handleEditAmount(
                    e, request.id, request.privacy
                  );}}>
                    <i className="far fa-check-circle"></i>
                  </button>
                  <button className='editing-btn' onClick={() => setEditAmount('')}>
                    <i className="fas fa-ban"></i>
                  </button>
                </div>
                :
                <div className='amount-container hide-show'>
                  <div className="requesting-amount incomplete-amount">
                    {`$${request.amount}`}
                  </div>
                  {sessionUser.id === request.sender_id &&
                    <div className="edit-icon hide" onClick={(e) => {setEditAmount(request.id); setAmount(request.amount)}}>
                      <i className="fas fa-edit"></i>
                    </div>
                  }
                </div>
              }
              {editTitle === request.id ?
                <div className="amount-container">
                  <input
                    type='string'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='notes'
                    className="incomplete-input-title"
                  ></input>
                  <button className='editing-btn' onClick={e => {setAmount(request.amount);
                    handleEditTitle(
                    e, request.id, request.privacy
                  )}}>
                    <i className="far fa-check-circle"></i>
                  </button>
                  <button className='editing-btn' onClick={() => setEditTitle('')}>
                    <i className="fas fa-ban"></i>
                  </button>
                </div>
                :
                <div className='amount-container hide-show'>
                  <div className="request-title">
                    {`${request.title}`}
                  </div>
                  {sessionUser.id === request.sender_id &&
                    <div className="edit-icon hide" onClick={(e) => {setEditTitle(request.id); setTitle(request.title)}}>
                      <i className="fas fa-edit"></i>
                    </div>
                  }
                </div>
              }
              <div className="request-btn">
                <button className="edit-btn login-btn cancel-btn" onClick={e => handleDelete(e, request.id)}>
                  Cancel
                </button>
              </div>
            </div>
            :
            <></>
          }
        </div>
      )}
    </div>
  )
}
export default Incomplete;
