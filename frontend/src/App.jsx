import React from 'react'
import AppRoutes from './routes/AppRoutes'
import ThemeToggle from './components/ThemeToggle'
import StarBackground from './components/StarBackground'
import Logo from './components/Logo'

const App = () => {
  return (
    <div className='h-screen w-screen'>      
      <ThemeToggle/>
      <Logo/>
      <StarBackground/>
      <AppRoutes/>
    </div>
  )
}

export default App
