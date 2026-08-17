export const users = [
  { id: '1', name: 'John Doe', email: 'citizen@example.com', password: 'password123', role: 'citizen', phone: '1234567890' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'citizen', phone: '0987654321' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin' },
  { id: '4', name: 'Staff Member 1', email: 'staff1@example.com', password: 'password123', role: 'staff', department: 'Water Supply' },
  { id: '5', name: 'Staff Member 2', email: 'staff2@example.com', password: 'password123', role: 'staff', department: 'Roads & Transport' },
];

export const staff = users.filter(u => u.role === 'staff');

export const categories = [
  'Water Supply',
  'Roads & Transport',
  'Electricity',
  'Waste Management',
  'Public Safety',
  'Parks & Recreation'
];

export const departments = [
  { id: 'd1', name: 'Water Supply', head: 'Alice Johnson' },
  { id: 'd2', name: 'Roads & Transport', head: 'Bob Williams' },
  { id: 'd3', name: 'Electricity', head: 'Charlie Brown' },
  { id: 'd4', name: 'Waste Management', head: 'Diana Prince' },
];

export const complaints = [
  {
    id: 'C-1001',
    title: 'No water supply for 2 days',
    category: 'Water Supply',
    description: 'There has been no water supply in Sector 4 for the last 48 hours. Please look into this urgently.',
    location: 'Sector 4, Main Street',
    priority: 'High',
    status: 'Pending',
    dateSubmitted: '2023-10-25T08:30:00Z',
    submittedBy: '1',
    assignedTo: null,
    timeline: [
      { status: 'Pending', date: '2023-10-25T08:30:00Z', note: 'Complaint submitted.' }
    ]
  },
  {
    id: 'C-1002',
    title: 'Pothole on Central Avenue',
    category: 'Roads & Transport',
    description: 'Large pothole on Central Avenue near the traffic light, causing major traffic jams.',
    location: 'Central Avenue',
    priority: 'Medium',
    status: 'In Progress',
    dateSubmitted: '2023-10-24T14:15:00Z',
    submittedBy: '1',
    assignedTo: '5',
    timeline: [
      { status: 'Pending', date: '2023-10-24T14:15:00Z', note: 'Complaint submitted.' },
      { status: 'In Review', date: '2023-10-25T09:00:00Z', note: 'Reviewed by admin.' },
      { status: 'In Progress', date: '2023-10-25T10:30:00Z', note: 'Team dispatched to location.' }
    ]
  },
  {
    id: 'C-1003',
    title: 'Streetlight not working',
    category: 'Electricity',
    description: 'The streetlight outside my house has been broken for a week.',
    location: 'Elm Street, House 42',
    priority: 'Low',
    status: 'Resolved',
    dateSubmitted: '2023-10-20T10:00:00Z',
    submittedBy: '2',
    assignedTo: null,
    timeline: [
      { status: 'Pending', date: '2023-10-20T10:00:00Z', note: 'Complaint submitted.' },
      { status: 'Resolved', date: '2023-10-22T16:00:00Z', note: 'Bulb replaced.' }
    ]
  },
  {
    id: 'C-1004',
    title: 'Garbage not collected',
    category: 'Waste Management',
    description: 'Garbage truck missed our lane this week.',
    location: 'Oak Lane',
    priority: 'Medium',
    status: 'Pending',
    dateSubmitted: '2023-10-26T09:20:00Z',
    submittedBy: '2',
    assignedTo: null,
    timeline: [
      { status: 'Pending', date: '2023-10-26T09:20:00Z', note: 'Complaint submitted.' }
    ]
  },
  {
    id: 'C-1005',
    title: 'Water pipe leak',
    category: 'Water Supply',
    description: 'Major leak on the main road, wasting lots of water.',
    location: 'Downtown Square',
    priority: 'High',
    status: 'In Review',
    dateSubmitted: '2023-10-26T11:00:00Z',
    submittedBy: '1',
    assignedTo: null,
    timeline: [
      { status: 'Pending', date: '2023-10-26T11:00:00Z', note: 'Complaint submitted.' },
      { status: 'In Review', date: '2023-10-26T12:00:00Z', note: 'Assigned to water dept.' }
    ]
  },
  {
    id: 'C-1006',
    title: 'Traffic signal malfunction',
    category: 'Roads & Transport',
    description: 'Red light is stuck at the 5th Avenue intersection.',
    location: '5th Avenue Intersection',
    priority: 'High',
    status: 'Rejected',
    dateSubmitted: '2023-10-25T15:45:00Z',
    submittedBy: '2',
    assignedTo: '5',
    timeline: [
      { status: 'Pending', date: '2023-10-25T15:45:00Z', note: 'Complaint submitted.' },
      { status: 'Rejected', date: '2023-10-25T16:00:00Z', note: 'Duplicate complaint, already being handled under C-0998.' }
    ]
  }
];
