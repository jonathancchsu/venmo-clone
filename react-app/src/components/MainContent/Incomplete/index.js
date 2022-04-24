import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRequests, updatingRequest, deleteRequest } from "../../../store/request";

import './Incomplete.css';

const Incomplete = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const users = [];
  const [usersObj, setUsersObj] = useState([]);
  const [content, setContent] = useState('');

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
      setUsersObj(responseData?.users.reverse());
    }
    fetchData();
  }, []);

  usersObj.forEach((user, i) => {
    let userObj = {};
    userObj[i] = user.name;
    users.push(userObj);
  })

  // const handleEdit = async (e, id, owner_id, payment_id) => {
  //   e.preventDefault();

  //   if(content.length >= 1) {
  //     const data = await dispatch(updatingRequest({id, content, owner_id, payment_id}));
  //     setContent('');
  //   }
  //   if (data) {
  //     setErrors(data);
  //   }
  // }

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
          {(request.sender_id  === sessionUser.id) ?
            <div>
              <div className="requesting">
                {`Request to ${users[request.receiver_id]?.[request.receiver_id]}`}
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
