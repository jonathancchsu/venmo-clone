import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../store/payment'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllPayments());
    setLoaded(true);
  }, [dispatch]);
  const allPayments = useSelector(state => state.paymentState.entries[0]);
  console.log(useSelector(state => state.paymentState.entries[0] ))
  // const paymentsObj = allPayments[0].payments;
  // console.log(paymentsObj)
  // console.log(useSelector(state => state))

  return (
    loaded && (
      <div>
        {/* {allPayments.map(payment => {

        })} */}
      </div>
    )
  )
}

export default Home;
