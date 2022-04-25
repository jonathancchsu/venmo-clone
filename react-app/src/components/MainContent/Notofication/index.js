import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllRequests, deleteRequest } from "../../../store/request";
import { postPayment } from "../../../store/payment";
import { getUsers, getOneUser } from "../../../store/session";

import './Notification.css';

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const users = Object.values(useSelector(state => state.session))
  const allRequests = Object.values(useSelector(state => state.requestState))
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(getAllRequests());
      await dispatch(getUsers());
      setLoaded(true);
    })();
  }, [dispatch]);

  const onCreatePayment = async(e, amount, receiver_id, sender_id, title, privacy) => {
    e.preventDefault();

    if (title.length >= 1 && amount > 0) {
      await dispatch(postPayment({ amount, receiver_id, sender_id, title, privacy }))
      await dispatch(getOneUser(sessionUser.id))
        .then(() => {
          history.push('/')
        });
    }

  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteRequest(id));
  }

  if (!loaded) {
    return null;
  };

  return (
    <div className="notification-page">
      <h3 className="notification-title">
        <i className="far fa-bell"></i> Notifications
      </h3>
      {allRequests?.map((request, i) =>
        <div key={i} className="requests-container">
          {(request.receiver_id === sessionUser.id) ?
            <div className="requests">
              <div className="requesting">
                {`${users[request.sender_id - 1]?.name} requests`}
              </div>
              <div className="requesting-amount">
                {`$${request.amount}`}
              </div>
              <div className="request-title">
                {request.title}
              </div>
              <div className="request-btn">
                <button className="edit-btn login-btn" onClick={e => {
                  onCreatePayment(e,
                                  request.amount,
                                  users[request.sender_id - 1]?.id,
                                  request.receiver_id,
                                  request.title,
                                  request.privacy)
                  handleDelete(e, request.id)
                  }
                }>
                  Send
                </button>
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
export default Notification;
