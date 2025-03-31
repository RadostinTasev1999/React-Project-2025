import Header from './components/header/Header'
import './App.css'
import { Routes,Route } from 'react-router'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import UserProvider from './providers/UserProvider'
import Create from './components/create/Create'
import Catalog from './components/catalog/Catalog'
import PostDetails from './components/details/PostDetails'
import EditPost from './components/edit/EditPost'

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
              <Route path='/create' element={<Create />} />
              <Route path='/posts' element={<Catalog />} />
              <Route path='/posts/:postId/details' element={<PostDetails />} />
              <Route path='/posts/:postId/edit' element={<EditPost />} />
            </Routes>
          </main>

        </div>
  </UserProvider>
      
    </>
  )
}

export default App
