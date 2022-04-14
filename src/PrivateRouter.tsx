import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element,
  role: number,
}

const PrivateRouter = (props: Props) => {
  if (props.role != 1) {
    return <Navigate to="/" replace />
  }
  return (
    props.children
  )
}

export default PrivateRouter