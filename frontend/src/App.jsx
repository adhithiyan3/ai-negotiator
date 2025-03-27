import { useState } from 'react'
import NegotiationForm from './Home'
import AuthForm from './pages/Auth'

function App() {

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <AuthForm />
      </div>
    </>
  )
}

export default App
