import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRequests, deleteRequest } from "../../../store/request";
//updatingRequest,

import './Incomplete.css';

const Incomplete = (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const users = props.users;
  // console.log('users from incomplete',users)
  // const [content, setContent] = useState('');

  const allRequests = props.allRequests;
  const sessionUser = props.sessionUser;

  useEffect(() => {
    (async() => {
      await dispatch(getAllRequests());
      setLoaded(true);
    })();
  }, [dispatch]);

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
          {(request?.sender_id  === sessionUser?.id) ?
            <div>
              <div className="requesting">
                {`Request to ${users[request?.receiver_id - 1]?.[request?.receiver_id]}`}
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
