import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { LangProvider } from './context/LangContext'
import LoadingSpinner from './ui/LoadingSpinner'

function App () {
  return (
    <LangProvider>
      <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
    </LangProvider>
  )
}

export default App
