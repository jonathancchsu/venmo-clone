// import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { getAllPayments } from '../../../store/payment'

import './Home.css'

const Home = () => {
  // const allPayments = useSelector(state => state.paymentState.entries[0].payments);
  // console.log(useSelector(state => state.paymentState.entries[0].payments ))
  // const paymentsObj = allPayments[0].payments;
  // console.log(paymentsObj)
  console.log(useSelector(state => state))

  return (

    <div>
      {/* {allPayments.map(payment => {

      })} */}
    </div>

  )
}

export default Home;
