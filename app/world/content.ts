export const profile = {
  name: 'Steven Abdalla',
  email: 'stevenmarcos1010@gmail.com',
  github: 'https://github.com/Stevenma05',
  linkedin: 'https://www.linkedin.com/in/steven-abdalla-2b0727309/',
  resume: '/Steven-Abdalla-Resume.pdf'
};
export type Project = {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  summary: string;
  problem: string;
  stack: string[];
  features: string[];
  challenge: string;
  result: string;
  flow: {
    name: string;
    detail: string;
  }[];
  color: string;
  repo?: string;
  demo?: string;
  demoLabel?: string;
  image?: string;
  imageAlt?: string;
  gallery?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
};
export const projects: Project[] = [{
  id: 'glycotwin',
  name: 'GlycoTwin',
  kicker: 'AI + MOBILE / HACKATHON MVP',
  tagline: 'A little more intelligence on your plate.',
  summary: 'A mobile wellness prototype that turns a photo of a menu or meal into personalized food suggestions.',
  problem: 'A menu tells you what a dish is, but rarely connects its nutrition to your sleep, activity, and preferences. GlycoTwin explores that missing context.',
  stack: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'USDA API'],
  features: ['Menu and meal photo analysis with Gemini', 'Nutrition lookup through USDA FoodData Central', 'Personalized, transparent rule-based scoring', 'Meal history and an optional Apple Health provider'],
  challenge: 'Keeping the entire demo usable when APIs, the database, or the backend are unavailable. The app uses explicit mock fallbacks and a local copy of its scoring rules.',
  result: 'An end-to-end hackathon MVP with mobile screens, API integrations, and a documented demo. Wellness and education only: scores are rule based, glucose curves are simulated, and clinical accuracy is not claimed.',
  flow: [{
    name: 'Menu photo',
    detail: 'The Expo app captures a menu or meal image.'
  }, {
    name: 'Gemini vision',
    detail: 'Gemini extracts structured menu items or meal information. A mock response is used if the service is unavailable.'
  }, {
    name: 'Nutrition + context',
    detail: 'USDA macronutrients are combined with the user profile, sleep and activity context.'
  }, {
    name: 'Wellness score',
    detail: 'A transparent rule-based function ranks items. This step is not a trained medical model.'
  }, {
    name: 'Meal history',
    detail: 'Express stores meal logs in MongoDB, with an in-memory fallback for demos.'
  }],
  color: 'green',
  repo: 'GlycoTwin',
  demo: 'https://www.youtube.com/watch?v=XjRowrTPk24',
  demoLabel: 'Watch demo'
}, {
  id: 'robotics',
  name: 'Soccer Robotics',
  kicker: '1ST PLACE / USF E-COUNCIL / MARCH 2026',
  tagline: 'Built to play. Engineered to win.',
  summary: 'A soccer-playing robot that brings hardware design, control logic, and real-time decision making onto a miniature pitch. First place in the USF E-Council Soccer Robotics Competition.',
  problem: 'Robot soccer turns a familiar game into an engineering challenge: move around the pitch, control the ball, and respond as play changes.',
  stack: ['Hardware design', 'Control logic', 'Real-time decision making'],
  features: ['A wheeled robot built for soccer competition', 'Handheld controller for directing play', 'Integrated hardware and control logic', 'Real-time decisions during matches'],
  challenge: 'Bringing the physical robot and its control logic together so it can maneuver and play soccer in a live competition.',
  result: '1st Place — Soccer Robotics Competition, hosted by E-Council at the University of South Florida in March 2026. Awarded by the Dean of Engineering.',
  flow: [{
    name: 'Player input',
    detail: 'The handheld controller lets the player direct the robot during a match.'
  }, {
    name: 'Control logic',
    detail: 'Control logic connects player input with the robot’s movement.'
  }, {
    name: 'Robot movement',
    detail: 'The wheeled hardware moves across the miniature soccer pitch to engage the ball.'
  }, {
    name: 'Live play',
    detail: 'The player responds to the ball and changing play with real-time decisions.'
  }],
  color: 'blue',
  gallery: [{
    src: '/robotics-robot.jpg',
    alt: 'Soccer robot with its wheeled chassis, onboard electronics, and handheld controller.',
    caption: 'The soccer robot and its controller.',
    width: 1152,
    height: 2048
  }, {
    src: '/robotics-competition.jpg',
    alt: 'Players and spectators gathered around a miniature soccer pitch during the robotics competition.',
    caption: 'In action at the USF E-Council Soccer Robotics Competition.',
    width: 1320,
    height: 865
  }]
}, {
  id: 'asl',
  name: 'ASL Recognition',
  kicker: 'COMPUTER VISION / TRANSFER LEARNING',
  tagline: 'Teaching a model to read the signs.',
  summary: 'A TensorFlow image classifier built with MobileNetV2 to recognize American Sign Language alphabet classes.',
  problem: 'Recognizing hand shapes is an interesting visual classification problem. This project explores transfer learning on a labeled ASL alphabet dataset.',
  stack: ['Python', 'TensorFlow', 'MobileNetV2', 'Transfer learning'],
  features: ['29 classes: A–Z, space, delete and nothing', '87,000 images in the source training dataset', '80/20 training and validation split', 'Up to 15 epochs with early stopping'],
  challenge: 'Adapting a pretrained image model and monitoring validation performance. Training stops after two epochs without improvement to limit overfitting.',
  result: 'The project README reports 97.45% validation accuracy and 0.0769 validation loss. These are validation results, not a claim of accuracy in real-world signing or on an independent test set.',
  flow: [{
    name: 'ASL dataset',
    detail: 'The source dataset contains 87,000 training images across 29 alphabet and control classes.'
  }, {
    name: '80 / 20 split',
    detail: 'The training set is split into training and validation portions.'
  }, {
    name: 'MobileNetV2',
    detail: 'A pretrained TensorFlow model learns the ASL classification task through transfer learning.'
  }, {
    name: 'Validation',
    detail: 'Early stopping monitors validation accuracy. The README reports 97.45% validation accuracy.'
  }, {
    name: 'Class prediction',
    detail: 'The resulting model predicts one of the 29 supported image classes.'
  }],
  color: 'blue',
  repo: 'ASL-Machine-Learning-',
  image: '/asl-training.png',
  imageAlt: 'Training and validation accuracy and loss curves from the ASL project repository'
}, {
  id: 'canvamon',
  name: 'CANVAMON',
  kicker: 'HACKUSF / MULTI-SURFACE APPLICATION',
  tagline: 'Your assignments. Your companion.',
  summary: 'A virtual pet experience that connects Canvas assignment progress to pet moods, streaks, schedules and reminders.',
  problem: 'Assignment tracking can feel like a list of obligations. CANVAMON makes progress more tangible through a companion that reacts to your coursework.',
  stack: ['React', 'TypeScript', 'Vite', 'Expo', 'React Native', 'Node.js', 'Express', 'node-cron'],
  features: ['Browser extension with animated cat and dog companions', 'Mobile dashboard and weekly assignment schedule', 'Assignment-driven pet moods and streaks', 'Local scheduled assignment reminders'],
  challenge: 'Supporting a browser extension and a native mobile app around the same product idea. Their rendering layers are separate, while the backend handles assignments, sync and pet state.',
  result: 'Built as part of HackUSF. The repository documents working mobile, extension and backend surfaces. Notifications are local; remote push and persistent accounts are listed as future improvements.',
  flow: [{
    name: 'Assignments',
    detail: 'Assignment data feeds the backend sync workflow.'
  }, {
    name: 'Sync server',
    detail: 'Node, Express and scheduled jobs manage assignment state and API endpoints.'
  }, {
    name: 'Pet state',
    detail: 'Assignment status is connected to companion mood and progress.'
  }, {
    name: 'Extension + mobile',
    detail: 'React runs the extension, while Expo and React Native power the mobile experience.'
  }, {
    name: 'Local reminders',
    detail: 'Expo schedules on-device notifications for assignments due that day.'
  }],
  color: 'orange',
  repo: 'HackUSF2026'
}, {
  id: 'chat',
  name: 'Real-Time Chat',
  kicker: 'FULL STACK / LIVE COMMUNICATION',
  tagline: 'From a message to a conversation.',
  summary: 'A full-stack messaging application with live delivery, user authentication and presence updates.',
  problem: 'Messaging needs more than storage: people expect messages and online status to update immediately.',
  stack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Axios'],
  features: ['Instant messaging with Socket.io', 'User authentication and protected access', 'Live presence and status updates', 'MongoDB-backed application data'],
  challenge: 'Coordinating persistent application data with real-time events and authenticated sessions.',
  result: 'The public portfolio links to a hosted application and the source repository. Performance figures in the résumé are self-reported, so the focus here is the implemented architecture.',
  flow: [{
    name: 'React client',
    detail: 'The user composes a message in the React interface.'
  }, {
    name: 'Authenticated API',
    detail: 'The backend handles authenticated application requests.'
  }, {
    name: 'Socket.io',
    detail: 'Real-time events carry messages and presence updates between connected clients.'
  }, {
    name: 'MongoDB',
    detail: 'Application data is stored in MongoDB.'
  }],
  color: 'blue',
  repo: 'chat-app',
  demo: 'https://chat-app-h2l8.onrender.com',
  demoLabel: 'Open live app'
}, {
  id: 'diabetes',
  name: 'Diabetes Prediction',
  kicker: 'APPLIED MACHINE LEARNING',
  tagline: 'Exploring patterns in health data.',
  summary: 'A Python classification prototype with a Tkinter interface for entering health metrics and viewing a model prediction.',
  problem: 'Structured health data provides a practical setting for learning classification and building an accessible interface around a model.',
  stack: ['Python', 'scikit-learn', 'Tkinter'],
  features: ['Desktop input interface built with Tkinter', 'Classification from health metrics including glucose and BMI', 'A trained scikit-learn model', 'A published video walkthrough'],
  challenge: 'Connecting an ML workflow to a usable desktop application while keeping model outputs understandable.',
  result: 'The portfolio and résumé report 77% accuracy. The evaluation procedure is not documented in those sources. This is a learning prototype, not a clinically validated diagnostic tool.',
  flow: [{
    name: 'Health inputs',
    detail: 'The Tkinter interface collects structured health metrics.'
  }, {
    name: 'Python pipeline',
    detail: 'Inputs are passed to the application’s prediction workflow.'
  }, {
    name: 'scikit-learn',
    detail: 'The trained classifier generates a prediction.'
  }, {
    name: 'Desktop result',
    detail: 'The interface presents the model output; no clinical validity is claimed.'
  }],
  color: 'green',
  repo: 'Diabetes-ML',
  demo: 'https://drive.google.com/file/d/1L6mwxDuxpsM2zjmK3Xh8zuzbFhAaqW6L/view',
  demoLabel: 'Watch demo'
}, {
  id: 'stocks',
  name: 'Market Simulator',
  kicker: 'DESKTOP / ALGORITHMS',
  tagline: 'Make the historical data move.',
  summary: 'A C# and Windows Forms tool for exploring historical stock prices, technical indicators and market simulations.',
  problem: 'Static historical prices are easier to investigate when charts and algorithmic signals can be explored interactively.',
  stack: ['C#', '.NET', 'Windows Forms', 'Algorithms'],
  features: ['Historical stock-price simulation and backtesting', 'Fibonacci retracement calculations', 'Interactive rubber-banding tools', 'Peak and valley selection on gap-free charts'],
  challenge: 'Combining chart interaction with algorithmic validation of technical price patterns.',
  result: 'The résumé describes a simulation engine using approximately 1,500 stock datasets. A case study is linked on the existing portfolio; no public repository was found.',
  flow: [{
    name: 'Historical data',
    detail: 'Historical stock datasets provide price sequences.'
  }, {
    name: 'Simulation',
    detail: 'The C# engine animates and backtests historical prices.'
  }, {
    name: 'Indicators',
    detail: 'Algorithms calculate Fibonacci retracements and technical confirmations.'
  }, {
    name: 'Interactive charts',
    detail: 'Windows Forms controls support selection of valid price peaks and valleys.'
  }],
  color: 'orange',
  demo: 'https://docs.google.com/document/d/1BKWnvKBV-ZIex-XT-vK3w1zQ_AmnHLiD/edit',
  demoLabel: 'Read case study'
}];
export const missions = [{
  year: '2021',
  date: 'MAY — JUN 2021',
  title: 'Make code click.',
  role: 'Youth Coding Mentor',
  org: 'St. Mark Church · Dubai',
  status: 'COMPLETED',
  body: 'Introduced JavaScript fundamentals to sixth graders through Code.org and hands-on projects.',
  details: ['Taught 20+ students variables, loops and other core concepts.', 'Guided final projects and made programming concepts approachable.'],
  stack: 'JavaScript · Code.org · Mentoring'
}, {
  year: '2024',
  date: 'JAN 2024 — PRESENT IN PUBLIC RÉSUMÉ',
  title: 'Lead beyond the screen.',
  role: 'Sports Programs Supervisor',
  org: 'USF Recreation & Wellness · Tampa',
  status: 'RÉSUMÉ-LISTED',
  body: 'Supported sports programs through team leadership, clear communication and safe operations.',
  details: ['Promoted sportsmanship and integrity among 20+ team members.', 'Handled challenging situations and coordinated medical assistance when needed.'],
  stack: 'Leadership · Team operations · Communication'
}, {
  year: '2025',
  date: 'MAY — JUL 2025',
  title: 'Build for the real world.',
  role: 'Software Developer Intern',
  org: 'Cisco Systems, Inc. / Emircom LLC · Dubai',
  status: 'COMPLETED',
  body: 'Contributed to software supporting Emircom’s services and systems, from client-specific features to post-deployment support.',
  details: ['Worked alongside network, security and data-center engineers.', 'Supported an agile team of 10–15 developers with implementation and system enhancements.'],
  stack: 'Software development · Agile · Client solutions'
}];
export const skillBranches = [{
  name: 'AI & machine learning',
  skills: [{
    name: 'Python',
    detail: 'Classification prototypes and model training.',
    used: ['asl', 'diabetes']
  }, {
    name: 'TensorFlow',
    detail: 'MobileNetV2 transfer learning for ASL image classification.',
    used: ['asl']
  }, {
    name: 'scikit-learn',
    detail: 'Model training for the diabetes prediction prototype.',
    used: ['diabetes']
  }, {
    name: 'Gemini API',
    detail: 'Structured menu and meal extraction from photos.',
    used: ['glycotwin']
  }]
}, {
  name: 'Frontend & mobile',
  skills: [{
    name: 'React',
    detail: 'Interactive clients for messaging and the CANVAMON extension.',
    used: ['chat', 'canvamon']
  }, {
    name: 'React Native',
    detail: 'Native mobile interfaces built with Expo.',
    used: ['glycotwin', 'canvamon']
  }, {
    name: 'TypeScript',
    detail: 'Typed mobile and extension application code.',
    used: ['glycotwin', 'canvamon']
  }, {
    name: 'HTML / CSS',
    detail: 'Web interfaces and personal portfolio development.',
    used: ['chat']
  }]
}, {
  name: 'Backend & data',
  skills: [{
    name: 'Node.js / Express',
    detail: 'APIs, application services and synchronization.',
    used: ['glycotwin', 'canvamon', 'chat']
  }, {
    name: 'MongoDB',
    detail: 'Application data and optional meal-log persistence.',
    used: ['glycotwin', 'chat']
  }, {
    name: 'Socket.io',
    detail: 'Live messaging and presence events.',
    used: ['chat']
  }, {
    name: 'REST APIs',
    detail: 'Connections to Gemini and USDA nutrition services.',
    used: ['glycotwin']
  }]
}, {
  name: 'Systems & tools',
  skills: [{
    name: 'C# / .NET',
    detail: 'Historical price simulation and interactive desktop charts.',
    used: ['stocks']
  }, {
    name: 'C / C++',
    detail: 'Listed in the public résumé alongside program design and systems coursework.',
    used: []
  }, {
    name: 'RISC-V',
    detail: 'Listed in the public résumé alongside computer organization coursework.',
    used: []
  }, {
    name: 'Git / GitHub',
    detail: 'Version control and public project repositories.',
    used: ['glycotwin', 'asl', 'canvamon']
  }]
}];
export const sectorNames: Record<string, string> = {
  projects: 'Project lab',
  ai: 'AI lab',
  experience: 'Mission log',
  skills: 'Skill tree',
  about: 'The builder',
  contact: 'Comms',
  hackathons: 'Hackathons / Competitions',
  github: 'GitHub station'
};
export function track(action: string, label: string) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('portfolio:interaction', {
    detail: {
      action,
      label
    }
  }));
}
