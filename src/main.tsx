import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormContextProvider } from './FormContext.tsx'

const queryClient = new QueryClient();


import { BrowserRouter as Router } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <FormContextProvider> 
          <App />
        </FormContextProvider> 
      </QueryClientProvider>
    </Router>
  </StrictMode>
)
