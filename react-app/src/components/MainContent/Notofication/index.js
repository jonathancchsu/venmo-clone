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
  // console.log('users from notification',users)
  const allRequests = Object.values(useSelector(state => state.requestState))
  const sessionUser = useSelector(state => state.session.user);
  // console.log('all request from notification',allRequests)
  useEffect(() => {
    (async() => {
      await dispatch(getAllRequests());
      await dispatch(getUsers());
      setLoaded(true);
    })();
  }, [dispatch]);

  const onCreatePayment = async(e, amount, receiverName, sender_id, title, privacy) => {
    e.preventDefault();

    if (title.length >= 1 && amount > 0) {
      // console.log('payment obj',{ amount, receiverName, sender_id, title, privacy })
      await dispatch(postPayment({ amount, receiverName, sender_id, title, privacy }))
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
    <div>
      <h3 className="notification-title">
        Notifications
      </h3>
      {allRequests?.map((request, i) =>
        <div key={i} className="requests">
          {(request.receiver_id === sessionUser.id) ?
            <div>
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
                <button className="edit-btn" onClick={e => {
                  onCreatePayment(e,
                                  request.amount,
                                  users[request.sender_id - 1]?.name,
                                  request.receiver_id,
                                  request.title,
                                  request.privacy)
                  handleDelete(e, request.id)
                  }
                }>
                  send
                </button>
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
export default Notification;
