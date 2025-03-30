import Header from './components/header/Header'
import './App.css'
import { Routes,Route } from 'react-router'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import UserProvider from './providers/UserProvider'

function App() {
 

  return (
    <>
  <UserProvider>
        <div id="box">
          <Header />

          <main id="main-content">
            <Routes>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </main>

        </div>
  </UserProvider>
      
    </>
  )
}

export default App
