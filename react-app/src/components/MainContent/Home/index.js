import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../store/payment'

import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  // const [payments, setPayments] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch('/api/payments');
  //     const payments = await res.json();
  //     setPayments(payments)
  //   })();
  // }, []);
  const allPayments = useSelector(state => state.paymentState?.entries[0]?.payments )
  // console.log(allPayments[0]?.title)

  useEffect(() => {
    (async() => {
      await dispatch(getAllPayments());
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
}

  // console.log(payments.payments)

  // console.log(allPayments)
  // const paymentsObj = allPayments[0].payments;
  // console.log(paymentsObj)
  // console.log(useSelector(state => state))

  return (
    // loaded && (
      <div>
        {allPayments.map((payment, i) =>
          <div key={i} className='payments'>
            {payment.title}
          </div>)}
      </div>
    )
  // )
}

export default Home;
