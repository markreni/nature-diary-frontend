import { useState } from 'react'
import Home from './pages/Home.tsx'
import AdditionForm from './pages/AdditionForm.tsx'
import QuestionForm from './pages/QuestionForm.tsx'
import Observations from './pages/Observations.tsx'
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

          <div className="routes-margin">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/observations" element={<Observations observations={observations}/>} />
              <Route path="/questions" element={<QuestionForm />}  />
              <Route path="/add" element={<AdditionForm />}  />
            </Routes>
          </div>
      </div>
     </ThemeProvider>
  )
}

export default App
