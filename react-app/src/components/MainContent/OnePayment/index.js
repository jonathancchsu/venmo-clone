import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePayment } from "../../../store/payment";
import { useParams } from "react-router-dom";
import { postComment, updatingComment, deleteComment } from "../../../store/comment";

import { getUsers } from "../../../store/session";
import './OnePayment.css';


const OnePayment = (props) => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editContent, setEditContent] = useState('');
  const { paymentId } = useParams();

  const payment = useSelector(state => state.paymentState)[paymentId];
  console.log(payment)
  const sessionUser = props.sessionUser;
  const owner_id = sessionUser?.id;
  const payment_id = payment?.id;
  // console.log('paymentId',payment_id)

  // const commentsObj = Object.values(useSelector(state => state.commentState))
  // console.log(commentsObj)
  const commentsObj = payment?.comments.comments
  const users = Object.values(useSelector(state => state.session))

  useEffect(() => {
    (async() => {
      await dispatch(getOnePayment(paymentId));
      // await dispatch(getComments(paymentId));
      await dispatch(getUsers());
      return setLoaded(true);
    })();
  }, [dispatch, paymentId]);

  const handlePost = async (e) => {
    e.preventDefault();

    if (newContent.length >= 1) {
      const data = await dispatch(postComment({ newContent, owner_id, payment_id }))
        dispatch(getOnePayment(paymentId))
        .then(() => setNewContent(''))
      console.log(data)
      if (data) {
        setErrors(data);
      }
    } else {
      alert('Please input a comment!');
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    if (content.length > 0) {
      const data = dispatch(updatingComment({ id, content, owner_id, payment_id }));
      setContent('');
      setEditContent('');
      if (data) {
        setErrors(data);
      }
    }
    if (content.length < 1) {
      alert('Please input a comment!');
    }
  };

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
              {editContent === comment.id ?
                <div className="comment-content request-title">
                  <input
                    type='string'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Write a comment...'
                    className="comment-input"
                    required
                  ></input>
                  <button className='editing-btn' onClick={e => handleEdit(e, comment.id)}>
                    <i className="far fa-check-circle"></i>
                  </button>
                  <button className='editing-btn' onClick={() => setEditContent('')}>
                    <i className="fas fa-ban"></i>
                  </button>
                </div>
                :
                <div className="comment-content request-title">
                {comment.content}
              </div>
              }
              {comment.owner_id === sessionUser.id && editContent !== comment.id ?
                <div className="comments-btns">
                  <button className="comments-btn" onClick={e => {setEditContent(comment.id); setContent(comment.content)}}>
                    <i className="fas fa-edit"></i>
                  </button>
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
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="Write a comment..."
            className="comment-input"
            required
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
