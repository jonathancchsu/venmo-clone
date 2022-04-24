import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllRequests, deleteRequest } from "../../../store/request";
import { postPayment } from "../../../store/payment";

import './Notification.css';

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const users = [];
  const [usersObj, setUsersObj] = useState([]);

  const allRequests = useSelector(state => state.requestState?.entries[0]?.requests)
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(getAllRequests());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsersObj(responseData?.users);
    }
    fetchData();
  }, []);

  usersObj.forEach((user) => {
    let userObj = {};
    userObj[user.id] = user.name;
    users.push(userObj);
  })

  const onCreatePayment = async(e, amount, receiverName, sender_id, title, privacy) => {
    e.preventDefault();

    if (title.length >= 1 && amount > 0) {
      await dispatch(postPayment({ amount, receiverName, sender_id, title, privacy }))
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
      <h3>
        Notifications
      </h3>
      {allRequests?.map((request, i) =>
        <div key={i} className="requests">
          {(request.receiver_id === sessionUser.id) ?
            <div>
              <div className="requesting">
                {`${users[request.sender_id - 1]?.[request.sender_id ]} requests`}
              </div>
              <div className="requesting-amount">
                {`$${request.amount}`}
              </div>
              <div className="request-title">
                {request.title}
              </div>
              <div className="request-btn">
                <button className="edit-btn" onClick={e =>
                  onCreatePayment(e,
                                  request.amount,
                                  users[request.sender_id ]?.[request.sender_id],
                                  request.receiver_id,
                                  request.title,
                                  request.privacy)}>
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
