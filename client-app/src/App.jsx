import Header from './components/header/Header'
import './App.css'
import { Routes,Route } from 'react-router'
import Home from './components/home/Home'

function App() {
 

  return (
    <>
      <div id="box">
        <Header/>

    <main id="main-content">
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    </main>

      </div>
    </>
  )
}

export default App
