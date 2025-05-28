import { Profile } from '../types';

// Mock data for profiles
export const profilesData: Profile[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    description: 'Software engineer with a passion for building user-friendly applications.',
    address: '123 Tech Street, San Francisco, CA',
    position: {
      lat: 37.7749,
      lng: -122.4194
    },
    email: 'alex@example.com',
    phone: '(555) 123-4567',
    interests: ['Coding', 'Hiking', 'Photography'],
    socials: {
      twitter: 'alexj',
      linkedin: 'alexjohnson',
      github: 'alexcode'
    }
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    description: 'UX designer focused on creating intuitive and accessible experiences.',
    address: '456 Design Ave, New York, NY',
    position: {
      lat: 40.7128,
      lng: -74.0060
    },
    email: 'sarah@example.com',
    phone: '(555) 234-5678',
    interests: ['UX Design', 'Art', 'Travel'],
    socials: {
      twitter: 'sarahm',
      linkedin: 'sarahmartinez'
    }
  },
  {
    id: 3,
    name: 'David Wilson',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    description: 'Product manager with experience in tech and healthcare industries.',
    address: '789 Market St, Chicago, IL',
    position: {
      lat: 41.8781,
      lng: -87.6298
    },
    email: 'david@example.com',
    phone: '(555) 345-6789',
    interests: ['Product Strategy', 'Basketball', 'Reading'],
    socials: {
      linkedin: 'davidwilson',
      github: 'davidw'
    }
  },
  {
    id: 4,
    name: 'Emily Chen',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    description: 'Data scientist specializing in machine learning and predictive analytics.',
    address: '101 Data Lane, Seattle, WA',
    position: {
      lat: 47.6062,
      lng: -122.3321
    },
    email: 'emily@example.com',
    phone: '(555) 456-7890',
    interests: ['Data Science', 'Violin', 'Rock Climbing'],
    socials: {
      twitter: 'emilyc',
      linkedin: 'emilychen',
      github: 'emilycodes'
    }
  },
  {
    id: 5,
    name: 'Michael Brown',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    description: 'Marketing specialist with a focus on digital strategies and brand development.',
    address: '234 Brand Blvd, Austin, TX',
    position: {
      lat: 30.2672,
      lng: -97.7431
    },
    email: 'michael@example.com',
    phone: '(555) 567-8901',
    interests: ['Digital Marketing', 'Guitar', 'Cooking'],
    socials: {
      twitter: 'mikeb',
      linkedin: 'michaelbrown'
    }
  },
  {
    id: 6,
    name: 'Jessica Lee',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    description: 'Frontend developer specializing in React and modern web technologies.',
    address: '567 Web Circle, Portland, OR',
    position: {
      lat: 45.5152,
      lng: -122.6784
    },
    email: 'jessica@example.com',
    phone: '(555) 678-9012',
    interests: ['Frontend Development', 'Yoga', 'Painting'],
    socials: {
      twitter: 'jessical',
      linkedin: 'jessicalee',
      github: 'jessdev'
    }
  }
];