import { useState } from 'react'
import Home from './components/Home.tsx'
import AdditionForm from './components/AdditionForm.tsx'
import Observations from './components/Observations.tsx'
import NavBar from './components/NavBar.tsx'
import observation_data from './observations.js'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import {
  Routes,
  Route,
  //Link,
  //Navigate,
  //useParams,
  //useNavigate,
  //useMatch
} from "react-router-dom"


const App = () => {
  const [observations, setObservations] = useState(observation_data)

  return (
    <ThemeProvider>  
      <div>
        <NavBar />

          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/observations" element={<Observations observations={observations}/>} />
              <Route path="/add" element={<AdditionForm />}  />
            </Routes>
          </div>
      </div>
     </ThemeProvider>
  )
}

export default App
