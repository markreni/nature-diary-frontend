 import observation_data from '../observations.ts'
import type { ObservationType } from '../types/types.ts'
 
 const getObservations = (): ObservationType[] => {
  
    return observation_data
  }

  const createObservation = async (newObservation: ObservationType): Promise<ObservationType> => {

    setTimeout(() => {
        console.log('This can be cancelled');
    }, 1000);
  
    return newObservation
  }

  export { getObservations, createObservation }