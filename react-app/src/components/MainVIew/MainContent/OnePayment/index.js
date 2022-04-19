import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnePayment } from "../../../../store/payment";
import { postComment, getComments, updatingComment, deleteComment } from "../../../../store/comment";

import './OnePayment.css';
import { useParams } from "react-router-dom";

const OnePayment = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState();
  const [content, setContent] = useState();
  const { payment_id } = useParams();
  const owner_id = useSelector(state => state.session.user.id);
  const payment = useSelector(state => state.paymentState.entries);

  useEffect(() => {
    dispatch(getOnePayment(payment_id));
    dispatch(getComments(payment_id));
  }, [dispatch, payment_id]);

  const handlePost = (e) => {
    e.preventDefault();
    if (content.length >= 1) {
      dispatch(postComment({ content, owner_id, payment_id }));
      if (data) {
        setErrors(data);
      }
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    if (content.length >= 1) {
      dispatch(updatingComment({ id, content, owner_id, payment_id }));
      if (data) {
        setErrors(data);
      }
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteComment(id));
  }

  return (
    <div>

    </div>
  )
}

export default OnePayment;
