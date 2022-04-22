import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnePayment } from "../../../store/payment";
import { useParams } from "react-router-dom";
import { getComments ,postComment, updatingComment, deleteComment } from "../../../store/comment";

import './OnePayment.css';

const OnePayment = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState('');
  const [content, setContent] = useState('');
  const { paymentId } = useParams();

  const payment = useSelector(state => state.paymentState?.entries[0]);
  const sessionUser = useSelector(state => state.session.user);
  const owner_id = sessionUser?.id;
  const payment_id = payment?.id;
  const commentsObj = payment?.comments?.comments;
  // const commentState = useSelector(state => state.commentState?.entries)
    // console.log(commentState)
  useEffect(() => {
    (async() => {
      await dispatch(getOnePayment(paymentId));
      await dispatch(getComments(paymentId));
      setLoaded(true);
    })();
  }, [dispatch, paymentId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData?.users);
    }
    fetchData();
  }, []);

  const handlePost = (e) => {
    e.preventDefault();

    if (content.length >= 1) {
      const data = dispatch(postComment({ content, owner_id, payment_id }));
      setContent('');

      if (data) {
        setErrors(data);
      }
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    if (content.length >= 1) {
      const data = dispatch(updatingComment({ id, content, owner_id, payment_id }));
      setContent('');
      if (data) {
        setErrors(data);
      }
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteComment(id));
  }
  
  if (!loaded) {
    return null;
  };

  return (
    <div>
      <div className="payments">
        <div className='sender-receiver'>
          {(payment?.sender_id === sessionUser?.id) ?
            "You"
            :
            users[payment?.sender_id - 1].name}
          {` paid `}
          {(payment.receiver_id === sessionUser.id) ?
            "You"
            :
            users[payment?.receiver_id - 1]?.name}
        </div>
        {payment.sender_id === sessionUser.id ||
          payment.receiver_id === sessionUser.id ?
          <div className='amount'>
            {`$ ${payment.amount}`}
          </div>
          :
          <></>
        }
        <div className="payment-title">
        {payment.title}
        </div>
        <div className="payment-btns">

        </div>
        <div className="comments-container">
          {commentsObj?.map((comment, i) =>
            <div key={i} className="comment">
              <div className="comment-content">
                {comment.content}
              </div>
                {comment.owner_id === sessionUser.id ?
                  <div className="comments-btns">
                    <button>edit</button>
                    <button onClick={e => handleDelete(e, comment.id)}>delete</button>
                  </div>
                  :
                  <></>
                }
            </div>
          )}
        </div>
      </div>
      {errors.length > 0 && (
        <div className="errors-container">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
      <div className="post-comment">
        <form>
          <input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write a comment..."
          ></input>
          <button
            type="submit"
            className="submit-btn"
            onClick={handlePost}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default OnePayment;
