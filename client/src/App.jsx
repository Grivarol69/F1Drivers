import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import NotFound from './components/notFound/NotFound'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/drivers" element={ <Home/> }/>
        <Route path="/detail/:id" element={ <Detail/> }/>
        <Route path="/newDriver" element={ <Form/> }/>
        <Route path="*" element={ <NotFound/> }/>
      </Routes>      
    </>
  )
}

export default App
