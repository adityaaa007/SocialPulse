import React from 'react'
import Sidebar from '../components/Sidebar'

function Settings() {
  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7] items-center flex-col md:flex-row">
      <Sidebar initialPage={'settings'}></Sidebar>
      <div className="flex-1 h-screen flex overflow-y-auto w-full md:w-full">
        
      </div>
    </div>
  )
}

export default Settings