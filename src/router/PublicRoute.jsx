import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, useNavigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
const navigate = useNavigate()
const token = useAuthStore((state) => (state.token))
  console.log(token)
  if (token){
    navigate("/srs-dashboard")
  }

  return children
}

export default PublicRoute