
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import Index from './Pages/Index/Index'
import Send from './Pages/Send/Send'
import Report from './Pages/Report/Report'
import CreateSection from './Components/CreateSection/CreateSection'
import PrivetRout from './Components/PrivetRout/PrivetRout'
import Preview from './Pages/Preview/Preview'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Index />}>
          <Route path=':action/:type' element={<CreateSection />} />
        </Route>
        <Route path='/send' element={<PrivetRout><Send /></PrivetRout>} />
        <Route path='/report' element={<Report />} />
        <Route path='/preview' element={<PrivetRout><Preview /></PrivetRout>} />
      </Routes>
    </>
  )
}

export default App
