// src/components/LoadingSpinner.jsx
import React from 'react'
import newLogo from '../assets/logo.png' // غيّر الامتداد حسب الصورة

export default function LoadingSpinner () {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white z-[99999] fixed inset-0'>
      <div className='relative flex items-center justify-center'>
        <div className='absolute animate-spin rounded-full h-20 w-20 border-4 border-t-primary border-b-primary border-l-transparent border-r-transparent'></div>
        <img
          loading='lazy'
          src={newLogo}
          alt='loading'
          className='w-20 h-20 object-contain'
          width='64'
          height='64'
          decoding='async'
        />
      </div>
    </div>
  )
}
