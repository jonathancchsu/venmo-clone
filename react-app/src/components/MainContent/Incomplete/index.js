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

  const handleEditAmount = async (e, id, privacy) => {
    e.preventDefault();
    console.log({id, title, amount, privacy})
    if(amount > 0) {
      await dispatch(updatingRequest({id, title, amount, privacy}));
      setEditAmount('');

    }
  }

  const handleEditTitle = async (e, id, privacy) => {
    e.preventDefault();
    console.log({id, title, amount, privacy})
    if(title.length >= 1) {
      await dispatch(updatingRequest({id, title, amount, privacy}));
      setEditTitle('');

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
    <div>
      <h3>
        Incomplete
      </h3>
      {allRequests?.map((request, i) =>
        <div key={i} className="requests">
          {(request?.sender_id  === sessionUser?.id) ?
            <div>
              <div className="requesting">
                {`Request to ${users[request?.receiver_id - 1]?.name}`}
              </div>
              {editAmount === request.id ?
                <div className="amount-container">
                  <input
                    type='string'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder='0.00'
                  ></input>
                  <button className='edit-btn' onClick={e => {setTitle(request.title);
                  handleEditAmount(
                    e, request.id, request.privacy
                  );}}>
                    Save Edit
                  </button>
                  <button className='edit-btn' onClick={() => setEditAmount('')}>
                    Cancel Edit
                  </button>
                </div>
                :
                <div className='amount-container'>
                  <div className="amount">
                    {`$${request.amount}`}
                  </div>
                  {sessionUser.id === request.sender_id &&
                    <div className="edit-btn" onClick={(e) => {setEditAmount(request.id)}}>
                      Edit Request
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
                  ></input>
                  <button className='edit-btn' onClick={e => {setAmount(request.amount);
                    handleEditTitle(
                    e, request.id, request.privacy
                  )}}>
                    Save Edit
                  </button>
                  <button className='edit-btn' onClick={() => setEditTitle('')}>
                    Cancel Edit
                  </button>
                </div>
                :
                <div className='amount-container'>
                  <div className="amount">
                    {`${request.title}`}
                  </div>
                  {sessionUser.id === request.sender_id &&
                    <div className="edit-btn" onClick={(e) => {setEditTitle(request.id)}}>
                      Edit Request
                    </div>
                  }
                </div>
              }
              <div className="request-btn">
                <button className="cancel-btn" onClick={e => handleDelete(e, request.id)}>
                  cancel
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
