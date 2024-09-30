import { useState } from 'react'
import { BackgroundBeamsWithCollisionDemo } from './components/Bg'
import { Route,Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './components/Register'
import LayoutTask from './components/LayoutTask'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div >
      <Routes>
        <Route path="/" element={<BackgroundBeamsWithCollisionDemo />} />
        <Route path='/login'  element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<LayoutTask/>}/>
      </Routes>
    </div>
  )
}

export default App
