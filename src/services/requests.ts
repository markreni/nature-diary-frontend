 import observation_data from '../observations.ts'
import type { ObservationType } from '../types/types.ts'
 
 const getObservations = () => {
  
    return observation_data
  }

  const createObservation = async (): Promise<ObservationType> => {

    setTimeout(() => {
        console.log('This can be cancelled');
    }, 1000);

    const newObservation = {
      id: 10,
      common_name: 'Cat',
      scientific_name: 'Felis catus',
      description: 'A small, typically furry carnivorous mammal.',
      date: '2025-10-05',
      location: 'Home',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80'
  }
  
    return newObservation
  }

  export { getObservations, createObservation }