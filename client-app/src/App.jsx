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
import Footer from './components/footer/Footer'

import { Suspense, lazy } from 'react'
import PrivacyPolicy from './components/policy/PrivacyPolicy'

const Admin = lazy(() => import('./components/admin/Admin'))
// this expression will be invoked asynchronously, when compiler gets to this row.

function App() {
 

  return (
    <>
      <UserProvider>
        <div id="box" className='flex flex-col min-h-screen'>
          <Header />

          <main id="main-content" className='flex-grow'>
            <Routes>

              <Route index element={<Home />} />
              <Route path='/posts' element={<Catalog />} />
              <Route path='/posts/:postId/details' element={<PostDetails />} />
              <Route path='/policy' element={<PrivacyPolicy />} />

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

                <Suspense fallback={
                  <div className='flex items-center justify-center h-screen'>
                    <p className='text-xl font-semibold text-blue-500 animate-pulse'>Loading...</p>
                  </div>
                }>
                  <Admin />
                </Suspense>
              } />

            </Routes>
          </main>
            <Footer />
        </div>
      </UserProvider>     
    </>
  )
}

export default App
