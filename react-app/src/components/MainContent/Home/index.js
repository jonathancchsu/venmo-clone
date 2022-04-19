import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../store/payment'

import './Home.css'

function Home () {
  const dispatch = useDispatch();
  const allPayments = useSelector(state => state.paymentState.entries);

  useEffect(() => {
    dispatch(getAllPayments())
  }, [dispatch])

  return (
    <div>
      {}
    </div>
  )
}

export default Home;
