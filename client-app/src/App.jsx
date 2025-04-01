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
import CommentsEdit from './components/comments-edit/CommentEdit'
import AuthGuard from './components/guards/AuthGuard'
import GuestGuard from './components/guards/GuestGuard'

import { Suspense, lazy } from 'react'

const Admin = lazy(() => import('./components/admin/Admin'))

// dynamic import that loads the Admin component 
// const Admin - this stores the dynamically imported component in the Admin constant
//



function App() {
 

  return (
    <>
  <UserProvider>
        <div id="box">
          <Header />

          <main id="main-content">
            <Routes>
              <Route index element={<Home />} />
              <Route path='/posts' element={<Catalog />} />
              <Route path='/posts/:postId/details' element={<PostDetails />} />
              
            <Route element={<AuthGuard />} >
                <Route path='/create' element={<Create />} />
                <Route path='/posts/:postId/edit' element={<EditPost />} />
                <Route path='/posts/:postId/comment/:commentId' element={<CommentsEdit />} />
            </Route>
              
              <Route element={<GuestGuard />} >
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>

              <Route path='/admin' element={
                
                  <Suspense fallback={<p>Loading...</p>}>
                      <Admin />
                  </Suspense>
              }/>
             
            </Routes>
          </main>

        </div>
  </UserProvider>
      
    </>
  )
}

export default App
