import type { ObservationType } from './types/types'

const observations: ObservationType[] = [
  {
    id: 1,
    common_name: '',
    scientific_name: '',
    description: 'A small, typically furry carnivorous mammal.',
    date: '2025-10-05',
    location: 'Home',
    images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: false,
    category: 'fauna',
    discovery: 'wildlife'
  },
  {
    id: 2,
    common_name: 'Dog',
    scientific_name: 'Canis lupus familiaris',
    description: 'A domesticated descendant of the wolf.',
    date: '2025-10-04',
    location: 'Park',
    coordinates: {
      lat: 60.18550539741858, 
      lng: 24.829856762142057
    },
    images: ['https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: true,
    category: 'fauna',
    discovery: 'domestic'
  },
   {
    id: 3,
    common_name: 'Elephant',
    scientific_name: 'Loxodonta africana',
    description: 'The largest existing land animal.',
    date: '2025-10-03',
    location: 'Safari',
    coordinates: {
      lat: -25.134405,
      lng: 31.193704
    },
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: true,
    category: 'fauna',
    discovery: 'wildlife'
  },
  {
    id: 4,
    common_name: '',
    scientific_name: '',
    description: 'Some elephant, smaller than its African cousin.',
    date: '2025-10-02',
    location: 'Zoo',
    images: ['https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: false,
    category: 'fauna',
    discovery: 'wildlife'
  },
  {
    id: 5,
    common_name: 'Palm tree',
    scientific_name: 'Arecaceae',
    description: 'A family of perennial flowering plants.',
    date: '2025-10-01',
    location: 'Forest',
    images: ['https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: true,
    category: 'flora',
    discovery: 'wildlife'
  },
  {
    id: 6,
    common_name: 'Elephant',
    scientific_name: 'Loxodonta africana',
    description: 'The largest existing land animal.',
    date: '2025-10-03',
    location: 'Safari',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: true,
    category: 'fauna',
    discovery: 'wildlife'
  },
  {
    id: 7,
    common_name: 'Cat',
    scientific_name: 'Felix Gatus',
    description: 'The largest existing land animal.',
    date: '2025-10-03',
    location: 'Safari',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'],
    public: true,
    identified: true,
    category: 'fauna',
    discovery: 'domestic'
  },
]

export default observations