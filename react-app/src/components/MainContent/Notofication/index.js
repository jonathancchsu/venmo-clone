import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequests } from "../../../store/request";

import './Notification.css';

const Notification = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);

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
      setUsers(responseData?.users.reverse());
    }
    fetchData();
  }, []);

  if (!loaded) {
    return null;
  };

  return (
    <div>
      {allRequests?.map((request, i) =>
        <div key={i} className="requests">
          {(request.sender_id === sessionUser.id) ?
            <div>
              <div className="requesting">
                {`${users[request.receiver_id - 1]?.name} requests`}
              </div>
              <div className="requesting-amount">
                {`$${request.amount}`} {`${request.receiver_id}`}
              </div>
              <div className="request-title">
                {request.title}
              </div>
              <div className="request-btn">
                <button className="edit-btn">
                  send
                </button>
                <button className="cancel-btn">
                  cancel
                </button>
              </div>
            </div>
            :
            <div>
              <div>
                Nontifications
              </div>
              <div>
                You can find things that require your attention here.
              </div>
            </div>
          }
        </div>
      )}
    </div>
  )
}
export default Notification;
