import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
// import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../store/payment'

import './Home.css'

function Home () {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true)
    dispatch(getAllPayments())
  }, [dispatch]);

  // const allPayments = useSelector(state => state.paymentState.entries[0].payments);
  const allPayments = useSelector(state => state.paymentState.entries)
  console.log(allPayments)
  // const paymentsObj = allPayments[0].payments;
  // console.log(paymentsObj)

  return (
    loaded && (
      <div>
        {allPayments.map(payment => {

        })}
      </div>
    )
  )
}

export default Home;
