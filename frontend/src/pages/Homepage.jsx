import React from 'react'
import Layout from '../components/Layout'
import { UserProvider } from '../context/userContext'


const Homepage = () => {
  return (
    <div>
      <UserProvider>
        <Layout/>
        </UserProvider>

    </div>
  )
}

export default Homepage