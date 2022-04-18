import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllPayments } from '../../../../store/payment'

import './Home.css'

function Home () {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.sesion.user);
  const allPayments = useSelector(state => state.payments.entries);

  useEffect(() => {
    dispatch(getAllPayments())
  }, [dispatch])

  return (
    <div>
      {}
    </div>
  )
}
