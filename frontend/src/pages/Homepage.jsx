import React from 'react'
import Layout from '../components/Layout'
import UserContextProvider from '../providers/UserContextProvider'

const Homepage = () => {
  return (
    <div>
        <UserContextProvider>
        <Layout/>
        </UserContextProvider>
    </div>
  )
}

export default Homepage