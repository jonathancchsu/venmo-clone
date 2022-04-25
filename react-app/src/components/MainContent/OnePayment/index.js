import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePayment } from "../../../store/payment";
import { useParams } from "react-router-dom";
import { getComments ,postComment,  deleteComment } from "../../../store/comment";
//updatingComment,
import { getUsers } from "../../../store/session";
import './OnePayment.css';


const OnePayment = (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  // const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState([]);

  // const [edit, setEdit] = useState('');
  const [content, setContent] = useState('');
  const { paymentId } = useParams();

  const payment = useSelector(state => state.paymentState)[paymentId];
  // console.log('payment from one payment', payment)
  const sessionUser = props.sessionUser;
  const owner_id = sessionUser?.id;
  const payment_id = payment?.id;
  // const commentsObj = payment?.comments?.comments;
  const commentsObj = Object.values(useSelector(state => state.commentState))
  const users = Object.values(useSelector(state => state.session))
  // console.log('users from one playment',users)
  useEffect(() => {
    (async() => {
      await dispatch(getOnePayment(paymentId));
      await dispatch(getComments(paymentId));
      await dispatch(getUsers());
      return setLoaded(true);
    })();
  }, [dispatch, paymentId]);

  const handlePost = async (e) => {
    e.preventDefault();

    if (content.length >= 1) {
      const data = await dispatch(postComment({ content, owner_id, payment_id }))
        dispatch(getOnePayment(paymentId))
        .then(() => setContent(''))
      if (data) {
        setErrors(data);
      }
    }
  };

  // const handleEdit = (e, id) => {
  //   e.preventDefault();

  //   if (content.length >= 1) {
  //     const data = dispatch(updatingComment({ id, content, owner_id, payment_id }));
  //     setContent('');
  //     if (data) {
  //       setErrors(data);
  //     }
  //   }
  // };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteComment(id));
    dispatch(getOnePayment(paymentId))
  }

  const getDate = ((string) => {
    let data = string.split(' ');
    let date = [];
    for (let i = 2; i > 0; i--) {
      date.push(data[i]);
    };
    let monthDay = date.join(' ');
    // let md = monthDay.split(',');
    // let d = md.join(' ');
    // return d;
    return monthDay;
  })

  if (!loaded) {
    return null;
  };

  return (
    <div className="one-payment-page">
    <div className='payments-container'>
      <div className='all-content'>
        <div className='payment-content payment-one'>
          <div className='sender-receiver'>
            {(payment?.sender_id === sessionUser?.id) ?
              "You"
              :
              users[payment.sender_id - 1]?.name}
            {<div className='paid'>paid</div>}
            {(payment.receiver_id === sessionUser.id) ?
              "You"
              :
              users[payment.receiver_id - 1]?.name}
          </div>
          <div className='date'>
              {`${getDate(payment.created_at)}`}
          </div>
          <div className='payment-title'>
            {payment.title}
          </div>
          <div className='comment-icon'>
            {(payment.comments.comments.length > 0) ?
              <div className='comment-length'>
                <i className="fas fa-comment blue"></i>
                <p className='num'>{payment.comments.comments.length}</p>
              </div>
              :
              <i className="fas fa-comment black"></i>
            }
          </div>
        </div>
        <div className='amount-container'>
        {payment.sender_id === sessionUser.id ||
          (payment.receiver_id === sessionUser.id) ?
            ((payment.sender_id === sessionUser.id) ?
              <div className='amount red'>
                {` - $${payment.amount}`}
              </div>
            :
              <div className='amount green'>
                {` + $${payment.amount}`}
              </div>
            )
          :
          <></>
        }
        </div>
      </div>
        <div className="comments-container">
          {commentsObj?.map((comment, i) =>
            <div key={i} className="comment">
              <div className='comment-owner sender-receiver'>
                {users[comment.owner_id - 1]?.name}
              </div>
              <div className='comment-date date'>
                {getDate(comment.created_at)}
              </div>
              <div className="comment-content request-title">
                {comment.content}
              </div>
                {comment.owner_id === sessionUser.id ?
                  <div className="comments-btns">
                    <button className="comments-btn"><i className="fas fa-edit"></i></button>
                    <button onClick={e => handleDelete(e, comment.id)} className="comments-btn">
                    <i className="fas fa-trash-alt fa-edit"></i>
                    </button>
                  </div>
                  :
                  <></>
                }
            </div>
          )}
        </div>
        <div className="post-comment">
        <form>
          <input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="comment-input"
          ></input>
          <button
            type="submit"
            className="submit-btn"
            onClick={handlePost}
          >
            <i className="fas fa-arrow-circle-up"></i>
          </button>
        </form>
      </div>
      </div>
      {errors.length > 0 && (
        <div className="errors-container">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      )}
    </div>
    )
}

export default OnePayment;
