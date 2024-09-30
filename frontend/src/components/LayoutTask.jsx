import React from 'react'
import Header from './header'
import MiniSidebar from './Sidebar'

const LayoutTask = () => {
  return (
    <div>
      <div className='h-full flex overflow-hidden'>
        <MiniSidebar/>
        <div className='flex-1 flex flex-col'>
          <Header/>

        </div>

      </div>
    </div>
  )
}

export default LayoutTask