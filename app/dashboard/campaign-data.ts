import { Campaign } from '../../types/campaign';

export const campaigns: Campaign[] = [
  {
    title: 'ConstelAR: A New Way to Explore the Cosmos',
    description: 'Join us in creating an immersive augmented reality experience that brings the constellations to life. Explore the stars and learn about the myths and science behind them.',
    total_goal: 50000,
    amount_donated: 12500,
    number_of_donors: 234,
    milestones: [
      {
        title: 'Phase 1: Core App Development',
        description: 'Develop the main application with basic AR features and a few constellations.',
      },
      {
        title: 'Phase 2: Expanded Constellation Library',
        description: 'Add more constellations, including those from the southern hemisphere.',
      },
    ],
    status: 'Pending',
  },
  {
    title: 'Project Nebula: 3D Galaxy Explorer',
    description: 'Embark on a journey through a procedurally generated galaxy. Discover new planets, stars, and civilizations.',
    total_goal: 75000,
    amount_donated: 45000,
    number_of_donors: 512,
    milestones: [
      {
        title: 'Alpha Release',
        description: 'Initial release with core gameplay mechanics.',
      },
      {
        title: 'Beta Release',
        description: 'Expanded content and bug fixes.',
      },
    ],
    status: 'Approved',
  },
  {
    title: 'Starlight Symphony: A Musical Space Adventure',
    description: 'A rhythm game where you compose music inspired by the cosmos. Features a full orchestral soundtrack.',
    total_goal: 30000,
    amount_donated: 25000,
    number_of_donors: 342,
    milestones: [
      {
        title: 'Soundtrack Composition',
        description: 'Compose and record the full game soundtrack.',
      },
      {
        title: 'Game Development',
        description: 'Develop the core gameplay mechanics and story.',
      },
    ],
    status: 'Approved',
  },
  {
    title: 'Cosmic Cuisine: A Zero-Gravity Cooking Game',
    description: 'Cook delicious meals for astronauts in a zero-gravity environment. Master the art of space cooking!',
    total_goal: 20000,
    amount_donated: 5000,
    number_of_donors: 112,
    milestones: [
      {
        title: 'Recipe Development',
        description: 'Create a variety of fun and challenging space-themed recipes.',
      },
      {
        title: 'Physics Engine',
        description: 'Develop a realistic zero-gravity physics engine for the cooking simulation.',
      },
    ],
    status: 'Pending',
  },
];
