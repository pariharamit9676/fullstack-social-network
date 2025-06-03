import React from 'react'
import Message from '../components/Message'

const Inbox = () => {

  return (
    <div className='w-full h-[80vh] flex justify-center items-center border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-900'>
      <Message />
    </div>
  )
}

export default Inbox
