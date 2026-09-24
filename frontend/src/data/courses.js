/**
 * Courses page content.
 */
const ADMISSION_BASE =
  'https://checkout.englishtherapy.com.bd/edu-pro/online-admission/4e99f0c9-c4bc-4755-b2ea-1de6cad88711';

export const COURSES = [
  {
    number: '01',
    image: '/images/courses/residential.png',
    title: 'Residential Course',
    tag: 'Immersive learning',
    description: 'A focused residential journey for learners ready to build confident everyday English.',
    enroll: `${ADMISSION_BASE}?Course=Foundation%20English&Type=Residential&Year=2026`,
    price: '40,000 Taka',
    duration: '3 month',
    detail:
      'একটি পূর্ণাঙ্গ residential programme যেখানে শিক্ষার্থীরা ২৪ ঘণ্টার ইংলিশ পরিবেশে থেকে প্রতিদিন নিয়মিত practice, pronunciation, grammar এবং conversation-এর মাধ্যমে foundation তৈরি করে।',
    bullets: [
      '100% ETM Method',
      '80/20 practical English method',
      'Daily indoor and outdoor practice',
      'Completion certificate and progress record',
    ],
    video: 'https://www.youtube.com/embed/M9CLg8bm01E',
    cover: ['RESIDENTIAL', 'FOUNDATION ENGLISH'],
  },
  {
    number: '02',
    image: '/images/courses/non-residential.png',
    title: 'NON Residential Course',
    tag: 'Build a strong base',
    description: 'The same practical foundation with a flexible schedule for learners who return home each day.',
    enroll: `${ADMISSION_BASE}?Course=Foundation%20English&Type=Non%20Residential&Year=2026`,
    price: '30,000 Taka',
    duration: '3 month',
    detail:
      'যারা প্রতিদিন campus-এ এসে শিখতে চান, তাদের জন্য এই foundation course। নিয়মিত guided practice, teacher supervision এবং outdoor conversation-এর মাধ্যমে শেখা হয়।',
    bullets: [
      '100% ETM Method',
      '80/20 practical English method',
      'Daily indoor, Out Door Practice & Listening class',
      'Completion Certification After Complete the Course',
    ],
    video: 'https://www.youtube.com/embed/apizYgtvlwg',
    cover: ['NON-RESIDENTIAL', 'FOUNDATION ENGLISH'],
  },
  {
    number: '03',
    image: '/images/courses/online-spoken.png',
    title: 'Online Course',
    tag: 'Learn from anywhere',
    description: 'A live, supportive route to speaking with more clarity, ease and consistency.',
    enroll: `${ADMISSION_BASE}?Course=Online%20Spoken%20English&Type=Online&Year=2026`,
    price: '10,000 Taka',
    duration: '3 ',
    detail:
      'ঘরে বসে live class, practical speaking এবং guided assignment-এর মাধ্যমে ইংলিশে স্বচ্ছন্দ হওয়ার জন্য একটি structured online course।',
    bullets: [
      'Live practical classes',
      '100% ETM Method',
      '80/20 Practical English Method',
      'Daily Practical class , OutDoor Practice in Zoom Class',
      'Completion Certification After Complete the Course',
    ],
    video: 'https://www.youtube.com/embed/i5uSI8n7A4E',
    cover: ['ONLINE', 'SPOKEN ENGLISH'],
  },
  {
    number: '04',
    image: '/images/courses/friday-special.png',
    title: 'Friday Special Course',
    tag: 'For busy learners',
    description: 'A concentrated weekly format for job holders and learners with limited weekday time.',
    enroll: `${ADMISSION_BASE}?Course=Special%20Friday%20Batch&Type=Non%20Residential&Year=2026`,
    price: '20,000 Taka',
    duration: '16 Weeks',
    detail:
      'চাকরিজীবী ও ব্যস্ত শিক্ষার্থীদের জন্য তৈরি এই batch-এ প্রতি শুক্রবার সরাসরি practical class এবং সপ্তাহজুড়ে online practice support দেওয়া হয়।',
    bullets: [
      '100% ETM Method',
      '80/20 Practical English Method',
      'Weekly Saturday to wednesday online practical class',
      'Only Friday will be OutDoor Practice Class and Listening class',
      'Completion Certification After Complete the Course',
    ],
    video: 'https://www.youtube.com/embed/x0Hf3zSi40k',
    cover: ['FRIDAY', 'SPECIAL BATCH'],
  },
];

export const COURSE_FEATURES = [
  'A warm, practical English learning environment',
  'The 80/20 practical English learning method',
  'ETM-led practice and daily conversation',
  'Teacher guidance and feedback throughout',
  'Course completion certificate and progress tracking',
  'Coursebooks, practice books and IELTS tips included',
  'Recognition for consistent attendance and effort',
];

export const FACILITIES = [
  {
    icon: '/images/icons/icon-building.svg',
    title: 'A place to stay focused',
    description: 'Residential facilities that make practice part of everyday life.',
    chips: ['Comfortable stay', '24-hour English environment', 'Daily guided routine'],
  },
  {
    icon: '/images/icons/icon-class-lesson.svg',
    title: 'Learn beyond the classroom',
    description: 'Outdoor classes that turn English into a lived experience.',
    chips: ['Daily outdoor class', 'Real-life conversation', 'Confidence through practice'],
  },
  {
    icon: '/images/icons/icon-mentoring.svg',
    title: 'Guidance when you need it',
    description: 'Teacher supervision that keeps your progress moving.',
    chips: ['Personal feedback', 'Always-on supervision', 'Clear next steps'],
  },
  {
    icon: '/images/icons/icon-games.svg',
    title: 'Practice with personality',
    description: 'Learner-friendly activities that make speaking feel natural.',
    chips: ['Speaking games', 'Team activities', 'Learn without pressure'],
  },
  {
    icon: '/images/icons/icon-comment.svg',
    title: 'Support for every learner',
    description: 'Extra care for anyone who needs a little more time.',
    chips: ['Beginner-friendly support', 'Extra practice time', 'Patient guidance'],
  },
  {
    icon: '/images/icons/icon-comment.svg',
    title: 'See how far you have come',
    description: 'Regular evaluation and feedback, without the guesswork.',
    chips: ['Regular evaluation', 'Progress feedback', 'Completion recognition'],
  },
];

export const LIFETIME_BENEFITS = [
  ['IBN SINA (ALL BRANCHES)', '35%'],
  ['CREATIVE IT INSTITUTE', '35%'],
  ['FARAZI HOSPITAL', '35%'],
  ['BEYOND BUFFET', '15%'],
  ['HERMIZON (SHOE BRAND)', '15%'],
  ['AIR TICKETS (MUSKAN HOLIDAYS)', '10%'],
  ['ROKOMARI', '5%'],
  ['CheeryB', '15%'],
  ['BFC', 'Corporate package'],
  ['ET MERCHANDISE', '50%'],
  ['IELTS THERAPY', '50%'],
  ['ENGLISH THERAPY BOOKS', '25%'],
];
