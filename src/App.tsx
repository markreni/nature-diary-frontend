import { useState } from 'react'
import Home from './pages/Home.tsx'
import { getObservations, createObservation } from './services/requests.ts'
import AdditionForm from './pages/AdditionForm.tsx'
import QuestionForm from './pages/QuestionForm.tsx'
import Observations from './pages/Observations.tsx'
import Unidentified from './pages/Unidentified.tsx'
import NavBar from './components/NavBar.tsx'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Routes,
  Route,
  //Link,
  //Navigate,
  //useParams,
  //useNavigate,
  //useMatch
} from "react-router-dom"
import type { ObservationType } from './types/types.ts'



const App = () => {
  //const [observations, setObservations] = useState(observation_data)
  const queryClient = useQueryClient()

  const newObservationMutation = useMutation<ObservationType, Error, ObservationType>({
    mutationFn: createObservation,
    onSuccess: (newObservation) => {
      const observations: ObservationType[] = queryClient.getQueryData(['observations'])!

      queryClient.setQueryData(['observations'], observations.concat(newObservation))
  
    },
    onError: () => {
    
    },
    onSettled: () => {
   
    }
  })
    
  const addObservation = async (observation: ObservationType) => {
    newObservationMutation.mutate(observation)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['observations'],
    queryFn: getObservations,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <div>Loading...</div>
  if(error) return <div>nature diary is not available due to problems in server</div>
  
  const identified = data!.filter(obs => obs.identified === true)
  const unidentified = data!.filter(obs => obs.identified === false)

  return (
    <ThemeProvider>  
        <div>
          <NavBar />
            <div className="routes-margin">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/observations" element={<Observations observations={identified} />} />
                <Route path="/unidentified" element={<Unidentified observations={unidentified} />} />
                <Route path="/map" element={<div></div>} />
                <Route path="/questions" element={<QuestionForm />}  />
                <Route path="/add" element={<AdditionForm addObservation={addObservation} />}  />
              </Routes>
            </div>
        </div>
     </ThemeProvider>
  )
}

export default App
