import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequests } from "../../../store/request";

import './Incomplete.css';

const Incomplete = () => {
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
      setUsers(responseData?.users);
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
                {`Request to ${users[request.receiver_id - 1]?.name}`}
              </div>
              <div className="requesting-amount">
                {`$${request.amount}`}
              </div>
              <div className="request-title">
                {request.title}
              </div>
              <div className="request-btn">
                <button className="edit-btn">
                  edit
                </button>
                <button className="cancel-btn">
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
